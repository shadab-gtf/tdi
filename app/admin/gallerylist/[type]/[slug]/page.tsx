"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import DynamicForm from "@/admin/components/form/DynamicForm";
import TableContainer from "@/admin/components/table/TableContainer";
import Card from "@/admin/components/card/Card";
import CardHeading from "@/admin/components/card/CardHeading";

import {
  fetchcsrGallery,
  addcsrGallery,
  updatecsrGallery,
  deletecsrGallery,
} from "@/features/slices/csrGallerySlice";

import { normalizeListResponse } from "@/admin/utils/helper";
import { toast } from "react-toastify";

const BlogFaqPage: React.FC = () => {
  const { slug, type } = useParams<{ slug: string; type: string }>();

  const dispatch = useAppDispatch();

  const { list, loading } = useAppSelector((state) => state.csrGallery);

  const [editingData, setEditingData] = useState<Record<string, any> | null>(
	null
  );
const baseEndpoint =
  type === "mediaevent"
    ? "/media-event-gallery"
    : "/event-gallery";
  const LIMIT = 10;

  const { rows, pagination } = normalizeListResponse(
  list || { data: [], items: [], pagination: {} },
  LIMIT
);

  const fields = [
	{ type: "image", name: "desktop_image", label: "Desktop image"},
	{ type: "image", name: "mobile_image", label: "Mobile image"},
	{type: "text", name: "alt", label: "Alt"},
  ];

  useEffect(() => {
	if (!slug) return;

	dispatch(
	  fetchcsrGallery({
		url: `${baseEndpoint}/${slug}/list`,
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
    const formPayload = new FormData();

    formPayload.append("alt", formData.alt || "");
    formPayload.append(
      "eventId",
      Array.isArray(slug) ? slug[0] : slug!
    );

    if (
      formData.desktop_image &&
      typeof formData.desktop_image !== "string" &&
      formData.desktop_image instanceof File
    ) {
      formPayload.append("desktop_image", formData.desktop_image);
    }

    if (
      formData.mobile_image &&
      typeof formData.mobile_image !== "string" &&
      formData.mobile_image instanceof File
    ) {
      formPayload.append("mobile_image", formData.mobile_image);
    }

    if (editingData?.id) {
      await dispatch(
        updatecsrGallery({
          url: `${baseEndpoint}`,
          id: editingData.id,
          data: formPayload,
        })
      ).unwrap();
    } else {
      await dispatch(
        addcsrGallery({
          url: `${baseEndpoint}`,
          data: formPayload,
        })
      ).unwrap();
    }

    dispatch(
      fetchcsrGallery({
        url: `${baseEndpoint}/${slug}/list`,
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
  const formattedItem = {
    ...item,
    desktop_image: item.files?.desktop_image || "",
    mobile_image: item.files?.mobile_image || "",
  };

  setEditingData(formattedItem);

  window.scrollTo({ top: 0, behavior: "smooth" });
};


  const handleDelete = async (item: any) => {
	try {
	  await dispatch(deletecsrGallery({ id: item.id })).unwrap();

	  dispatch(
		fetchcsrGallery({
		  url: `${baseEndpoint}/${slug}/list`,
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
	  fetchcsrGallery({
		url: `${baseEndpoint}/${slug}/list`,
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
	  fetchcsrGallery({
		url: `${baseEndpoint}/${slug}/list`,
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
			<CardHeading>Csr Gallery</CardHeading>

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
