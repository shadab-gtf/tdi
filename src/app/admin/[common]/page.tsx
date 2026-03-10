"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import DynamicForm from "@/admin/components/form/DynamicForm";
import Card from "@/admin/components/card/Card";
import CardHeading from "@/admin/components/card/CardHeading";
import TableContainer from "@/admin/components/table/TableContainer";

import { lookupThunks, updatePlatterSeq } from "@/features/slices/commonSlice";
import {
  buildFormDataFromObject,
  normalizeListResponse,
} from "@/admin/utils/helper";
import { toast } from "react-toastify";
import { RouteParams } from "@/types/common";
import { COMMON_ENTITY_CONFIG, TableRow } from "@/admin/fields/commonEntityConfig";

import {
  extractFieldNames,
  extractFileFieldNames,
} from "@/admin/utils/helper";





const CommonPage: React.FC = () => {
  const  params  = useParams<RouteParams>();
  const dispatch = useAppDispatch();

  const [editingItem, setEditingItem] = useState<TableRow | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const [seqDrafts, setSeqDrafts] = useState<Record<string, number>>({});
  const ENTITY_KEY = Array.isArray(params.common)
  ? params.common[0]
  : params.common;

  const isTypology = params.common === "typology";

  const entityConfig =
    COMMON_ENTITY_CONFIG[ENTITY_KEY] || COMMON_ENTITY_CONFIG.default;

  const entity = lookupThunks?.[ENTITY_KEY];

  const { list = [], error } = useAppSelector(
    (state) => state.lookups?.[ENTITY_KEY] || {}
  );

  if (!entity) {
    return <p className="text-red-500 p-6">Invalid entity</p>;
  }

  const { fetchList, create, update, remove } = entity;

  const PAGE_LIMIT = 10;
  const { rows, pagination } = normalizeListResponse<TableRow>(
    list,
    PAGE_LIMIT
  );

  const [currentPage, setCurrentPage] = useState<number>(
    pagination.page || 1
  );

  useEffect(() => {
  dispatch(
    fetchList({
      params: {
        page: currentPage,
        limit: PAGE_LIMIT,
      },
    })
  );
}, [dispatch, fetchList, currentPage]);

  const handleSearch = (term: string) => {
    dispatch(
      fetchList({
        params: {
          page: 1,
          limit: pagination.limit,
          search: term || undefined,
        },
      })
    );
  };

 const handleEdit = (item: TableRow) => {
  window.scrollTo({ top: 0, behavior: "smooth" });

  const fileFields = entityConfig.fields
    .filter((f) => f.type === "image" || f.type === "file")
    .map((f) => f.name);

  const normalized: any = { ...item };

  fileFields.forEach((fieldName) => {
    let value = item[fieldName];

    if (typeof value === "string") {
      normalized[fieldName] = `${process.env.NEXT_PUBLIC_API_URL}/${value}`;
    }

    else if (value && typeof value === "object" && value.url) {
      normalized[fieldName] = `${process.env.NEXT_PUBLIC_API_URL}/${value.url}`;
    }

    else if (item.files?.[fieldName]) {
      normalized[fieldName] = `${process.env.NEXT_PUBLIC_API_URL}/${item.files[fieldName]}`;
    }
  });

  setEditingItem(normalized);
};

  const handleDelete = async (item: TableRow) => {
    try {
        const deleteResult = await dispatch(remove({ id: item.id })).unwrap();
    console.log("Delete successful, result:", deleteResult);
      await dispatch(
      fetchList({
        params: {
          page: currentPage,
          limit: PAGE_LIMIT,
        },
      })
    ).unwrap();
     console.log("List refreshed after delete");
    }catch (err: any) {
    console.log("Catch block triggered");
    console.log("Error object:", err);
    console.log("Error type:", typeof err);
    console.log("Error keys:", Object.keys(err || {}));
    
    if (err?.payload) {
      console.log("Error payload:", err.payload);
      toast.error(err.payload.message || "Delete failed");
    } else if (err?.message) {
      console.log("Error message:", err.message);
      toast.error(err.message);
    } else {
      console.log("Generic error");
      toast.error("Delete failed");
    }
  }
};

  // const handleSubmit = async (
  //   data: Record<string, any>
  // ): Promise<boolean> => {
  //   setSubmitting(true);
  //   try {
  //     const fileFields = entityConfig.fields
  //       .filter((f) => f.type === "image" || f.type === "file")
  //       .map((f) => f.name);

  //     const payload =
  //       fileFields.length > 0
  //         ? buildFormDataFromObject(data, fileFields)
  //         : data;

  //     if (editingItem?.id) {
  //       await dispatch(
  //         update({ id: editingItem.id, data: payload })
  //       ).unwrap();
  //     } else {
  //       await dispatch(create({ data: payload })).unwrap();
  //     }

  //        await dispatch(
  //     fetchList({
  //       params: {
  //         page: currentPage,
  //         limit: PAGE_LIMIT,
  //       },
  //     })
  //   ).unwrap();
  //     setEditingItem(undefined);
  //     return true;
  //   } catch {
  //     return false;
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };
const handleSubmit = async (
  data: Record<string, any>
): Promise<boolean> => {
  setSubmitting(true);

  try {
    const allowedFields = extractFieldNames(
      entityConfig.fields as any
    );

    const filteredData: Record<string, any> = {};

    allowedFields.forEach((key) => {
      if (data[key] !== undefined) {
        filteredData[key] = data[key];
      }
    });

    const fileFields = extractFileFieldNames(
      entityConfig.fields as any
    );

    const payload =
      fileFields.length > 0
        ? buildFormDataFromObject(filteredData, fileFields)
        : filteredData;

    if (editingItem?.id) {
      await dispatch(
        update({ id: editingItem.id, data: payload })
      ).unwrap();
    } else {
      await dispatch(create({ data: payload })).unwrap();
    }

    await dispatch(
      fetchList({
        params: {
          page: currentPage,
          limit: PAGE_LIMIT,
        },
      })
    ).unwrap();

    setEditingItem(undefined);
    return true;
  } catch {
    return false;
  } finally {
    setSubmitting(false);
  }
};
 
  const CommonTable = TableContainer<TableRow>;

 const tableHead = useMemo(() => {
  if (ENTITY_KEY !== "platter") {
    return entityConfig.tableHead;
  }

  return entityConfig.tableHead.map((col) => {
    if (col.key !== "seq") return col;

    return {
      ...col,
      render: (row: TableRow) => {
        const currentValue =
          seqDrafts[row.id] ?? row.seq ?? 0;

        return (
          <input
            type="number"
            value={currentValue}
            onChange={(e) => {
              const value = Number(e.target.value);

              setSeqDrafts((prev) => ({
                ...prev,
                [row.id]: value,
              }));
            }}
            onKeyDown={async (e) => {
              if (e.key !== "Enter") return;

              const value =
                seqDrafts[row.id] ?? row.seq ?? 0;

              if (value === row.seq) return;

              try {
                await dispatch(
                  updatePlatterSeq({
                    itemId: row.id,
                    seq: value,
                  })
                ).unwrap();

                toast.success("Sequence updated");
              } catch {
                toast.error("Failed to update sequence");
              }
            }}
            className="border rounded px-2 py-1 w-20 text-sm"
          />
        );
      },
    };
  });
}, [ENTITY_KEY, entityConfig.tableHead, seqDrafts, dispatch]);

  return (
    <section className="p-6">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <DynamicForm
            key={editingItem?.id ?? "create"}
            title={
              editingItem
                ? `Edit ${ENTITY_KEY}`
                : `Create ${ENTITY_KEY}`
            }
            fields={entityConfig.fields as any[]}
            defaultValues={editingItem}
            onSubmit={handleSubmit}
            col={12}
            loading={submitting}
          />

          {error && (
            <p className="mt-2 text-red-500 text-sm">{error}</p>
          )}
        </div>

        <div className="col-span-12">
          <Card>
            <CardHeading>List</CardHeading>

            <CommonTable
              head={tableHead}
              data={rows}
              pagination={pagination}
              currentPage={currentPage}
              handlePageChange={setCurrentPage}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSearch={handleSearch}
              searchPlaceholder="Search..."
              customActions={
                isTypology
                  ? [
                      {
                        label: "Sections",
                        render: (item) => (
                          <a
                            href={`/admin/typology/${item.id}`}
                            className="text-blue-500 underline"
                          >
                            Add Sub Typology
                          </a>
                        ),
                      },
                    ]
                  : []
              }
            />
          </Card>
        </div>
      </div>
    </section>
  );
};

export default CommonPage;
