"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { toast } from "react-toastify";

import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import {
  fetchPages,
  addPage,
  updatePage,
  deletePage,
  fetchPageById,
} from "@/features/slices/pagesSlice";

import Card from "@/admin/components/card/Card";
import CardHeading from "@/admin/components/card/CardHeading";
import TableContainer from "@/admin/components/table/TableContainer";
import DynamicForm from "@/admin/components/form/DynamicForm";
import {
  buildFormDataFromObject,
  extractFieldNames,
  extractFileFieldNames,
  normalizeListResponse,
} from "@/admin/utils/helper";
import { Page } from "@/types/page";

const Pages: React.FC = () => {
  const dispatch = useAppDispatch();
  const { pagesData, loading } = useAppSelector((state) => state.pages);

  const [editingData, setEditingData] = useState<Page | null>(null);

  const PAGE_LIMIT = 10;

  const { rows, pagination } = normalizeListResponse<Page>(
    pagesData,
    PAGE_LIMIT
  );

  const fields = [
    { type: "text", name: "pageName", label: "Page Name", required: true, col: "md:col-span-12" },
    // {
    //     type: "array",
    //     name: "title",
    //     label: "Title",
    //     col:"md:col-span-12",
    //     multiple:false,
    //     fields: [
    //       { type: "text", name: "heading", label: "Heading" },
    //     ]
    //   },
    // {
    //     type: "array",
    //     name: "description",
    //     label: "Description",
    //     col:"md:col-span-12",
    //     multiple:false,
    //     fields: [
    //       { type: "text", name: "description", label: "Description" },
    //     ]
    //   },
    {
      type: "dropdown", name: "type", label: "Type", col: "md:col-span-12", options: [
        { label: "image", value: "image" },
        { label: "video", value: "video" },
      ]
    },
    { type: "media", name: "mobile_file", label: "Mobile Image", col: "md:col-span-12" },
    { type: "media", name: "desktop_file", label: "Desktop Image", col: "md:col-span-12" },
    { type: "image", name: "thumbnail", label: "Thumbnail Image", col: "md:col-span-12", showIf: (data: any) => data.type === "video" },
    {
      type: "array",
      name: "seoTags",
      label: "seoTags",
      col: "md:col-span-12",
      multiple: false,
      fields: [
        { type: "text", name: "meta_title", label: "meta_title" },
        { type: "text", name: "meta_keyword", label: "Meta Keywords" },
        { type: "text", name: "meta_description", label: "Meta Description" },
        { type: "textarea", name: "headData", label: "Head Data" },
        { type: "textarea", name: "bodyData", label: "Body Data" },
      ]
    }
  ];


  useEffect(() => {
    dispatch(
      fetchPages({
        params: {
          page: pagination.page,
          limit: pagination.limit,
        },
      })
    );
  }, [dispatch, pagination.page, pagination.limit]);

  const handleEdit = async (item: Page) => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    if (!item?.id) {
      setEditingData(item);
      return;
    }

    try {
      const full = await dispatch(
        fetchPageById({ id: item.id })
      ).unwrap();

      const normalizedData = {
        ...full,
        mobile_file: full.files?.mobile_file
          ? `${process.env.NEXT_PUBLIC_API_URL}/${full.files.mobile_file}`
          : undefined,
        desktop_file: full.files?.desktop_file
          ? `${process.env.NEXT_PUBLIC_API_URL}/${full.files.desktop_file}`
          : undefined,
      };

      setEditingData(normalizedData);
      toast.success("Data loaded for edit");
    } catch {
      setEditingData(item);
      toast.error("Failed to load full data");
    }
  };

  const handleDelete = async (item: Page) => {
    await dispatch(deletePage({ id: item.id }));

    dispatch(
      fetchPages({
        params: {
          page: pagination.page,
          limit: pagination.limit,
        },
      })
    );
  };

  const handleSearch = (term: string) => {
    dispatch(
      fetchPages({
        params: {
          page: 1,
          limit: pagination.limit,
          search: term || undefined,
        },
      })
    );
  };

  const handleFormSubmit = async (
    formData: Record<string, any>
  ): Promise<boolean> => {

    const cleanedData: Record<string, any> = { ...formData };

    if (!(cleanedData.mobile_file instanceof File)) {
      delete cleanedData.mobile_file;
    }

    if (!(cleanedData.mobile_file instanceof File)) {
      delete cleanedData.mobile_file;
    }

    // ["title", "description", "seoTags"].forEach((key) => {
    //   if (cleanedData[key]) {
    //     cleanedData[key] = JSON.stringify(cleanedData[key]);
    //   }
    // });

    // const allowed = [
    //   "pageName",
    //   "heading",
    //   "description",
    //   "title",
    //   "mobile_file",
    //   "desktop_file",
    //   "seoTags",
    // ];
    const allowed = extractFieldNames(fields);
    const finalPayload: Record<string, any> = {};
    allowed.forEach((key) => {
      if (cleanedData[key] !== undefined) {
        finalPayload[key] = cleanedData[key];
      }
    });

    const fileFieldNames = extractFileFieldNames(fields);
    const payload = buildFormDataFromObject(finalPayload, fileFieldNames);

    try {
      if (editingData?.id) {
        await dispatch(
          updatePage({ id: editingData.id, data: payload })
        ).unwrap();
      } else {
        await dispatch(addPage({ data: payload })).unwrap();
      }

      dispatch(
        fetchPages({
          params: {
            page: pagination.page,
            limit: pagination.limit,
          },
        })
      );

      return true;
    } catch (err: any) {
      toast.error(err?.message ?? "Failed to save page");
      return false;
    } finally {
      setEditingData(null);
    }
  };

  const handlePageChange = (page: number) => {
    dispatch(
      fetchPages({
        params: {
          page,
          limit: pagination.limit,
        },
      })
    );
  };


  console.log(rows, "rows")

  return (
    <section className="p-6">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <DynamicForm
            title={editingData ? "Edit Page" : "Create New Page"}
            fields={fields as any[]}
            defaultValues={editingData ?? undefined}
            onSubmit={handleFormSubmit}
            col={12}
            loading={loading}
          />
        </div>

        <div className="col-span-12">
          <Card>
            <CardHeading>Pages List</CardHeading>

            <TableContainer
              head={[
                { key: "pageName", label: "Page Name" },
                { key: "slug", label: "Slug" },
                // {
                //   key: "title",
                //   label: "Title",
                //   render: (row) => row.title?.[0]?.heading || row.title?.heading || "-"
                // },
              ]}
              data={rows}
              pagination={pagination}
              currentPage={pagination.page}
              handlePageChange={handlePageChange}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSearch={handleSearch}
              searchPlaceholder="Search pages..."
              customActions={[
                {
                  label: "Sections",
                  render: (item: Page) => (
                    <Link
                      href={
                        item.slug === "investor"
                          ? "/admin/investors"
                          : `/admin/pages/${item.slug}`
                      }
                      className="text-blue-500 underline"
                    >
                      Sections
                    </Link>
                  ),
                },
              ]}
            />
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Pages;
