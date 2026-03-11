"use client";

import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import DynamicForm from "@/admin/components/form/DynamicForm";
import TableContainer from "@/admin/components/table/TableContainer";
import Card from "@/admin/components/card/Card";
import CardHeading from "@/admin/components/card/CardHeading";

import {
  getAll,
  storeRecord,
  updateRecord,
  deleteRecord,
} from "@/features/slices/whyKundliSlice";

import { buildFormDataFromObject, extractFileFieldNames, normalizeFilesForEdit, normalizeListResponse } from "@/admin/utils/helper";
import { toast } from "react-toastify";

const BlogFaqPage: React.FC = () => {

  const dispatch = useAppDispatch();

  const { list, loading } = useAppSelector((state) => state.whyKundli);

  const [editingData, setEditingData] = useState<Record<string, any> | null>(
    null,
  );

  const LIMIT = 10;

  const fields = [
    {
      type: "dropdown",
      name: "kundli_type",
      label: "Kundli Type",
      options: [
        { label: "Delhi", value: "delhi" },
      ],
    },

    { type: "text", name: "title", label: "Title" },
    { type: "image", name: "desktop_file", label: "Desktop image" },
    { type: "image", name: "mobile_file", label: "Mobile image" },
    { type: "text", name: "alt", label: "Alt" },


  ];

  const { rows: rawRows, pagination } = normalizeListResponse(
    list || { data: [], items: [], pagination: {} },
    LIMIT,
  );

  const rows = rawRows.map((item: any) =>
    normalizeFilesForEdit(item, fields, "")
  );

  useEffect(() => {

    dispatch(
      getAll({
        url: `/why-kundli`,
        params: {
          page: pagination.page,
          limit: pagination.limit,
        },
      }),
    );
  }, [pagination.page, pagination.limit, dispatch]);

  const handleFormSubmit = async (
    formData: Record<string, any>,
  ): Promise<boolean> => {
    try {
      const fileFields = extractFileFieldNames(fields);

      const formPayload = buildFormDataFromObject(
        {
          ...formData,
        },
        fileFields,
      );

      if (editingData?.id) {
        await dispatch(
          updateRecord({
            id: editingData.id,
            data: formPayload,
          }),
        ).unwrap();
      } else {
        await dispatch(
          storeRecord({
            data: formPayload,
          }),
        ).unwrap();
      }

      dispatch(
        getAll({
          url: `/why-kundli`,
          params: {
            page: pagination.page,
            limit: pagination.limit,
          },
        }),
      );

      setEditingData(null);
      return true;
    } catch {
      return false;
    }
  };

  const handleEdit = (item: any) => {
    const mapped: Record<string, any> = {};

    fields.forEach((field) => {
      const key = field.name;

      if (!key) return;

      if (item[key] !== undefined) {
        mapped[key] = item[key];
      } else if (item.files?.[key] !== undefined) {
        mapped[key] = item.files[key];
      }
    });

    mapped.id = item.id;

    setEditingData(mapped);

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (item: any) => {
    try {
      await dispatch(deleteRecord({ id: item.id })).unwrap();

      dispatch(
        getAll({
          url: `/why-kundli`,
          params: {
            page: pagination.page,
            limit: pagination.limit,
          },
        }),
      );
    } catch (err: any) {
      toast.error("Failed to delete FAQ");
    }
  };

  const handleSearch = (term: string) => {
    dispatch(
      getAll({
        url: `/why-kundli`,
        params: {
          page: 1,
          limit: pagination.limit,
          search: term || undefined,
        },
      }),
    );
  };

  const handlePageChange = (page: number) => {
    dispatch(
      getAll({
        url: `/why-kundli`,
        params: {
          page,
          limit: pagination.limit,
        },
      }),
    );
  };

  return (
    <section className="p-6">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <DynamicForm
            title={editingData ? "Edit Record" : "Add Record"}
            fields={fields as any[]}
            defaultValues={editingData || undefined}
            onSubmit={handleFormSubmit}
            col={12}
            loading={loading}
          />
        </div>

        <div className="col-span-12">
          <Card>
            <CardHeading>Why Kundli</CardHeading>

            <TableContainer
              head={[
                { key: "title", label: "Title" },
                { key: "kundli_type", label: "Kundli Type" },
                { key: "desktop_file", label: "desktop_image" },
                { key: "mobile_file", label: "mobile_image" },
              ]}
              data={rows}
              pagination={pagination}
              currentPage={pagination.page}
              handlePageChange={handlePageChange}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSearch={handleSearch}
              searchPlaceholder="Search ..."
            />
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BlogFaqPage;
