"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import DynamicForm from "@/admin/components/form/DynamicForm";
import TableContainer from "@/admin/components/table/TableContainer";
import Card from "@/admin/components/card/Card";
import CardHeading from "@/admin/components/card/CardHeading";

import {
  fetchawardGallery,
  addawardGallery,
  updateawardGallery,
  deleteawardGallery,
} from "@/features/slices/awardGallerySlice";

import { buildFormDataFromObject, extractFileFieldNames, normalizeFilesForEdit, normalizeListResponse } from "@/admin/utils/helper";
import { toast } from "react-toastify";
import { RouteParams } from "@/types/common";

const BlogFaqPage: React.FC = () => {
  const { slug } = useParams<RouteParams>();

  const dispatch = useAppDispatch();

  const { list, loading } = useAppSelector((state) => state.awardGallery);

  const [editingData, setEditingData] = useState<Record<string, any> | null>(
    null,
  );

  const LIMIT = 10;

  const fields = [
    { type: "image", name: "desktop_image", label: "Desktop image" },
    { type: "image", name: "mobile_image", label: "Mobile image" },
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
    if (!slug) return;

    dispatch(
      fetchawardGallery({
        url: `/awards-gallery/${slug}/list`,
        params: {
          page: pagination.page,
          limit: pagination.limit,
        },
      }),
    );
  }, [slug, pagination.page, pagination.limit, dispatch]);

  const handleFormSubmit = async (
    formData: Record<string, any>,
  ): Promise<boolean> => {
    try {
         const fileFields = extractFileFieldNames(fields);

    const formPayload = buildFormDataFromObject(
      {
        ...formData,
        awardId: Array.isArray(slug) ? slug[0] : slug!,
      },
      fileFields,
    );

    if (editingData?.id) {
      await dispatch(
        updateawardGallery({
          id: editingData.id,
          data: formPayload,
        }),
      ).unwrap();
    } else {
      await dispatch(
        addawardGallery({
          data: formPayload,
        }),
      ).unwrap();
    }

      dispatch(
        fetchawardGallery({
          url: `/awards-gallery/${slug}/list`,
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
      await dispatch(deleteawardGallery({ id: item.id })).unwrap();

      dispatch(
        fetchawardGallery({
          url: `/awards-gallery/${slug}/list`,
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
      fetchawardGallery({
        url: `/awards-gallery/${slug}/list`,
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
      fetchawardGallery({
        url: `/awards-gallery/${slug}/list`,
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
                { key: "desktop_image", label: "desktop_image" },
                { key: "mobile_image", label: "mobile_image" },
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
