"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import DynamicForm from "@/admin/components/form/DynamicForm";
import TableContainer from "@/admin/components/table/TableContainer";
import Card from "@/admin/components/card/Card";
import CardHeading from "@/admin/components/card/CardHeading";

import {
  fetchBlogFaqs,
  addBlogFaq,
  updateBlogFaq,
  deleteBlogFaq,
} from "@/features/slices/blogFaqSlice";

import { normalizeListResponse } from "@/admin/utils/helper";
import { toast } from "react-toastify";
import { RouteParams } from "@/types/common";

const BlogFaqPage: React.FC = () => {
  const { slug } = useParams<RouteParams>();

  const dispatch = useAppDispatch();

  const { list, loading } = useAppSelector((state) => state.blogFaq);

  const [editingData, setEditingData] = useState<Record<string, any> | null>(
    null
  );

  const FAQ_LIMIT = 10;

  const { rows, pagination } = normalizeListResponse(
  list || { data: [], items: [], pagination: {} },
  FAQ_LIMIT
);

  const fields = [
    { type: "text", name: "question", label: "Question", required: true },
    {
      type: "textarea",
      name: "answer",
      label: "Answer",
      required: true,
      col: "md:col-span-12",
    },
  ];

  // Fetch FAQs for this blog
  useEffect(() => {
    if (!slug) return;

    dispatch(
      fetchBlogFaqs({
        url: `/blog-faqs?blogId=${slug}`,
        params: {
          page: pagination.page,
          limit: pagination.limit,
        },
      })
    );
  }, [slug, pagination.page, pagination.limit, dispatch]);

const handleFormSubmit = async (
  formData: Record<string, any>
): Promise<boolean> => {
  try {
    const payload = {
      ...formData,
      blogId: Array.isArray(slug) ? slug[0] : slug,
    };

    if (editingData?.id) {
      await dispatch(
        updateBlogFaq({
          id: editingData.id,
          data: payload,
        })
      ).unwrap();
    } else {
      await dispatch(
        addBlogFaq({
          data: payload,
        })
      ).unwrap();
    }

    dispatch(
      fetchBlogFaqs({
        url: `/blog-faqs?blogId=${slug}`,
        params: {
          page: pagination.page,
          limit: pagination.limit,
        },
      })
    );

    setEditingData(null);
    return true;
  } catch {
    return false;
  }
};


  const handleEdit = (item: any) => {
    setEditingData(item);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (item: any) => {
    try {
      await dispatch(deleteBlogFaq({ id: item.id })).unwrap();

      dispatch(
        fetchBlogFaqs({
          url: `/blog-faqs?blogId=${slug}`,
          params: {
            page: pagination.page,
            limit: pagination.limit,
          },
        })
      );
    } catch (err) {
      toast.error("Failed to delete FAQ");
    }
  };

  const handleSearch = (term: string) => {
    dispatch(
      fetchBlogFaqs({
        url: `/blog-faqs?blogId=${slug}`,
        params: {
          page: 1,
          limit: pagination.limit,
          search: term || undefined,
        },
      })
    );
  };

  const handlePageChange = (page: number) => {
    dispatch(
      fetchBlogFaqs({
        url: `/blog-faqs?blogId=${slug}`,
        params: {
          page,
          limit: pagination.limit,
        },
      })
    );
  };

  return (
    <section className="p-6">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <DynamicForm
            title={editingData ? "Edit Blog FAQ" : "Add Blog FAQ"}
            fields={fields as any[]}
            defaultValues={editingData || undefined}
            onSubmit={handleFormSubmit}
            col={12}
            loading={loading}
          />
        </div>

        <div className="col-span-12">
          <Card>
            <CardHeading>Blog FAQs</CardHeading>

            <TableContainer
              head={[
                { key: "question", label: "Question" },
                { key: "answer", label: "Answer" },
              ]}
              data={rows}
              pagination={pagination}
              currentPage={pagination.page}
              handlePageChange={handlePageChange}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSearch={handleSearch}
              searchPlaceholder="Search FAQs..."
            />
          </Card>
        </div>
      </div>
    </section>
  );
};

export default BlogFaqPage;
