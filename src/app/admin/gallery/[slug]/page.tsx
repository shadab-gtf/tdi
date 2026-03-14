"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import DynamicForm from "@/admin/components/form/DynamicForm";
import TableContainer from "@/admin/components/table/TableContainer";
import Card from "@/admin/components/card/Card";
import CardHeading from "@/admin/components/card/CardHeading";

import {
  fetchGallery,
  addGallery,
  updateGallery,
  deleteGallery,
} from "@/features/slices/gallerySlice";

import { buildFormDataFromObject, extractFileFieldNames, normalizeFilesForEdit, normalizeListResponse } from "@/admin/utils/helper";
import { toast } from "react-toastify";
import { RouteParams } from "@/types/common";

const BlogFaqPage: React.FC = () => {
  const { slug } = useParams<RouteParams>();

  const dispatch = useAppDispatch();

  const { list, loading } = useAppSelector((state) => state.Gallery);

  const [editingData, setEditingData] = useState<Record<string, any> | null>(
    null,
  );

  const LIMIT = 10;

  const fields = [
    { type: "image", name: "desktop_file", label: "Desktop image" },
    { type: "image", name: "mobile_file", label: "Mobile image" },
    { type: "text", name: "alt", label: "Alt" },
    { type: "number", name: "seq", value: "0", label: "Seq" },
    { type: "dropdown", name: "status", label: "Status", options: [{ label: "Active", value: "true" }, { label: "Inactive", value: "false" }] },


  ];

  const { rows: rawRows, pagination } = normalizeListResponse(
    list || { data: [], items: [], pagination: {} },
    LIMIT,
  );


  const rows = rawRows.map((item: any) =>
    normalizeFilesForEdit(item, fields, "")
  );
  useEffect(() => {
    if (!slug) return;


    dispatch(
      fetchGallery({
        url: `/gallery?galleryCategoryId=${slug}`,
        params: {
          page: pagination.page,
          limit: pagination.limit,
        },
      }),
    );
  }, [slug, pagination.page, pagination.limit, dispatch]);
  console.log('rows', rows);
  const handleFormSubmit = async (
    formData: Record<string, any>,
  ): Promise<boolean> => {
    try {
      const fileFields = extractFileFieldNames(fields);

      const formPayload = buildFormDataFromObject(
        {
          ...formData,
          galleryCategoryId: Array.isArray(slug) ? slug[0] : slug!,
        },
        fileFields,
      );

      if (editingData?.id) {
        await dispatch(
          updateGallery({
            id: editingData.id,
            data: formPayload,
          }),
        ).unwrap();
      } else {
        await dispatch(
          addGallery({
            data: formPayload,
          }),
        ).unwrap();
      }

      dispatch(
        fetchGallery({
          url: `/gallery?galleryCategoryId=${slug}`,
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
      await dispatch(deleteGallery({ id: item.id })).unwrap();

      dispatch(
        fetchGallery({
          url: `/gallery?galleryCategoryId=${slug}`,
          params: {
            page: pagination.page,
            limit: pagination.limit,
          },
        }),
      );
    } catch (err) {
      toast.error("Failed to delete FAQ");
    }
  };

  const handleSearch = (term: string) => {
    dispatch(
      fetchGallery({
        url: `/gallery?galleryCategoryId=${slug}`,
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
      fetchGallery({
        url: `/gallery?galleryCategoryId=${slug}`,
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
            title={editingData ? "Edit Gallery" : "Add Gallery"}
            fields={fields as any[]}
            defaultValues={editingData || undefined}
            onSubmit={handleFormSubmit}
            col={12}
            loading={loading}
          />
        </div>

        <div className="col-span-12">
          <Card>
            <CardHeading>Award Gallery</CardHeading>

            <TableContainer
              head={[
                { key: "desktop_file", label: "desktop_image" },
                { key: "mobile_file", label: "mobile_image" },
                { key: "alt", label: "Alt" },
              ]}
              data={rows}
              pagination={pagination}
              currentPage={pagination.page}
              handlePageChange={handlePageChange}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSearch={handleSearch}
              searchPlaceholder="Search Gallery..."
            />
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BlogFaqPage;
