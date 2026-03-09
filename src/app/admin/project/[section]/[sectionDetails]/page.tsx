"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import DynamicForm from "@/admin/components/form/DynamicForm";
import TableContainer from "@/admin/components/table/TableContainer";
import Card from "@/admin/components/card/Card";
import CardHeading from "@/admin/components/card/CardHeading";

import { lookupThunks } from "@/features/slices/commonSlice";
import { projectSectionList } from "@/admin/fields/projectFields";
import {
  fetchSectionList,
  create,
  update,
  remove,
  fetchSectionById,
} from "@/features/slices/projectDetailsSlice";

import {
  buildFormDataFromObject,
  extractFieldNames,
  extractFileFieldNames,
  normalizeFilesForEdit,
  normalizeListResponse,
} from "@/admin/utils/helper";

import { toast } from "react-toastify";
import { updateBannerSeq , chooseBanner } from "@/features/slices/projectSectionSlice";


interface RouteParams {
  [key: string]: string;
  section: string;
  sectionDetails: keyof typeof projectSectionList;
}

interface TableRow {
  id: string;
  seq?: number;
  [key: string]: any;
}

const PAGE_LIMIT = 10;

const ProjectSectionDetails: React.FC = () => {
  const { section: projectId, sectionDetails: sectionType } =
    useParams<RouteParams>();

  const dispatch = useAppDispatch();

  const { list, loading } = useAppSelector((state) => state.projectList);
  const { amenities } = useAppSelector((state) => state.lookups);
  const [editingItem, setEditingItem] = useState<Record<string, any> | null>(
    null,
  );
  const [seqDrafts, setSeqDrafts] = useState<Record<string, number>>({});
  const [bannerDrafts, setBannerDrafts] = useState<Record<string, boolean>>({});

  const detailsConfig = projectSectionList?.[sectionType];
 const isBanner = (sectionType as string) === "banner";
 const isAmenities = sectionType === "amenities";

  useEffect(() => {
    if (sectionType !== "amenities") return;
    dispatch(lookupThunks.amenities.fetchList());
  }, [dispatch]);

  const { rows, pagination } = useMemo(() => {
    if (!list) {
      return {
        rows: [],
        pagination: {
          total: 0,
          page: 1,
          limit: PAGE_LIMIT,
          totalPages: 1,
        },
      };
    }
    return normalizeListResponse(list, PAGE_LIMIT);
  }, [list]);



const dropdownOptions = useMemo<Record<string, any[]>>(() => {
  if (!isAmenities) {
    return { amenitiesId: [] };
  }
  const usedAmenityIds = new Set(
    Array.isArray(rows)
      ? rows
          .map((row: any) => row?.amenitiesId)
          .filter(Boolean)
      : []
  );
const amenityList =
    (amenities?.list as unknown as { data?: any[] })?.data ??
    (amenities?.list as any[]) ??
    [];

  return {
    amenitiesId: amenityList
      .filter((item: any) => !usedAmenityIds.has(item.id))
      .map((item: any) => ({
        label: item.title,
        value: item.id,
      })),
  };
}, [isAmenities, amenities?.list, rows]);



  const injectOptions = (
    fields: any[],
    optionsMap: Record<string, any[]>,
  ) =>
    fields.map((field) =>
      field.type === "dropdown" && optionsMap[field.name]
        ? { ...field, fetchOptions: optionsMap[field.name],end_point: field.end_point, }
        : field,
    );

  const fields = useMemo(() => {
    if (!detailsConfig) return [];
    return injectOptions(detailsConfig.fields, dropdownOptions);
  }, [detailsConfig, dropdownOptions]);

  const { table, endpoint } = detailsConfig ?? {};


  useEffect(() => {
    if (!endpoint || !projectId) return;

   dispatch(
  fetchSectionList({
    url: endpoint,
    params: {
      projectId,
      page: pagination.page,
      limit: pagination.limit,
    },
  })
);
  }, [dispatch, endpoint, projectId, pagination.page, pagination.limit]);


  const handleSeqUpdate = async (row: TableRow) => {

    const seq = Number(seqDrafts[row.id]);
    if (Number.isNaN(seq) || seq === row.seq) return;

    await dispatch(
      updateBannerSeq({
        endpoint:detailsConfig.endpoint,
        itemId: row.id,
        seq,
      }),
    );
    toast.success("Sequence updated successfully");
  };
  

  const handleBannerChange = async (
  row: TableRow,
  value: boolean
   ) => {
  try {
    await dispatch(
      chooseBanner({
        itemId: row.id,
        banner: value,
      })
    ).unwrap();

    toast.success("Banner status updated");

    setBannerDrafts((prev) => ({
      ...prev,
      [row.id]: value,
    }));
  } catch (err) {
    toast.error("Failed to update banner status");
  }
};


const handleEdit = async (item: any) => {
  try {
    const full = await dispatch(
        fetchSectionById({
        url: endpoint!,
        id: item.id,
      })
    ).unwrap();

    const normalizedData = {
  ...full,
  ...normalizeFilesForEdit(
    full,
    detailsConfig.fields,
    process.env.NEXT_PUBLIC_API_URL || ""
  ),
};
    setEditingItem(normalizedData);
  } catch (err) {
    toast.error("Failed to load data");
  }
};


  const handleSubmit = async (
    formData: Record<string, any>,
  ): Promise<boolean> => {
    try {
      const allowed = extractFieldNames(detailsConfig.fields);
      const cleanedData: Record<string, any> = {};

      allowed.forEach((key: string) => {
        if (formData[key] !== undefined) {
          cleanedData[key] = formData[key];
        }
      });

      if (cleanedData.logoId && typeof cleanedData.logoId === "object") {
        cleanedData.logoId = cleanedData.logoId.value;
      }

      const payloadObj = {
        ...cleanedData,
        projectId,
      };

      const fileFieldNames = extractFileFieldNames(detailsConfig.fields);

      const payload = buildFormDataFromObject(
        payloadObj,
        fileFieldNames
      );


      if (editingItem?.id) {
        await dispatch(
          update({
            url: endpoint!,
            id: editingItem.id,
            data: payload,
          }),
        ).unwrap();
      } else {
        await dispatch(
          create({
            url: endpoint!,
            data: payload,
          }),
        ).unwrap();
      }

      setEditingItem(null);
      await dispatch(
          fetchSectionList({
            url: endpoint!,
            params: {
              projectId,
              page: pagination.page,
              limit: pagination.limit,
            },
          })
        );
          

      return true;
   } catch (err: any) {
  console.log("UNWRAP ERROR ", err);
  return false;
}
  };


  const handleDelete = async (row: TableRow) => {
    try {
      await dispatch(
        remove({
          url: endpoint!,
          id: row.id,
        }),
      ).unwrap();

  dispatch(
  fetchSectionList({
    url: endpoint,
    params: {
      projectId,
      page: pagination.page,
      limit: pagination.limit,
    },
  })
);


    } catch (err: any){
       console.log("UNWRAP ERROR ", err);

    }
  };

  const handleSearch = (term: string) => {
    dispatch(
  fetchSectionList({
    url: endpoint,
    params: {
      projectId,
      search: term || undefined,
    },
  })
);
  };

  const handlePageChange = (page: number) => {
    dispatch(
  fetchSectionList({
    url: endpoint,
    params: {
      projectId,
      page,
      limit: pagination.limit,
    },
  })
);

  };


  const tableColumns = useMemo(() => {
    if (!table?.columns) return [];
    const columns = [...table.columns,
      {
        key: "seq",
        label: "Sequence",
        render: (row: TableRow) => (
          <input
            type="number"
            value={seqDrafts[row.id] ?? row.seq ?? 0}
            onChange={(e) =>
              setSeqDrafts((prev) => ({
                ...prev,
                [row.id]: Number(e.target.value),
              }))
            }
            onKeyDown={(e) => {
              if (e.key === "Enter") handleSeqUpdate(row);
            }}
            className="w-16 border rounded px-2 py-1 text-sm text-center"
          />
        ),
      }
    ];
    if (isBanner) {
      columns.push({
          key: "banner",
          label: "Banner",
          render: (row: TableRow) => {
            const currentValue =
              bannerDrafts[row.id] ?? row.isBanner ?? false;

            return (
              <select
                value={String(currentValue)}
                onChange={(e) =>
                  handleBannerChange(row, e.target.value === "true")
                }
                className="border rounded px-5 py-1 text-smfont-bold bg-gray-900"
              >
                <option value="true">True</option>
                <option value="false">False</option>
              </select>
            );
          },
          },)
    }
return columns;
  }, [table, isBanner, seqDrafts,bannerDrafts]);

  if (!detailsConfig) {
    return <div className="p-6 text-gray-500">No Data Found</div>;
  }


  return (
    <section className="p-6 grid grid-cols-12 gap-6">
      <div className="col-span-12">
        <DynamicForm
          key={editingItem?.id || "create"} 
          title={editingItem ? "Edit Item" : "Add Item"}
          fields={fields}
          defaultValues={editingItem || undefined}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>

      <div className="col-span-12">
        <Card>
          <CardHeading>{sectionType} Items</CardHeading>

          <TableContainer
            head={tableColumns}
            data={rows}
            pagination={pagination}
            currentPage={pagination.page}
            handlePageChange={handlePageChange}
            onSearch={handleSearch}
            searchPlaceholder="Search list..."
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        </Card>
      </div>
    </section>
  );
};

export default ProjectSectionDetails;
