"use client";

import React, { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import DynamicForm from "@/admin/components/form/DynamicForm";
import TableContainer from "@/admin/components/table/TableContainer";
import Card from "@/admin/components/card/Card";
import CardHeading from "@/admin/components/card/CardHeading";

import {
  fetchInvestorDocuments,
  addInvestorDocument,
  updateInvestorDocument,
  deleteInvestorDocument,
} from "@/features/slices/investorDocumentSlice";

import { buildFormDataFromObject, extractFieldNames, extractFileFieldNames, normalizeFilesForEdit, normalizeListResponse } from "@/admin/utils/helper";
import { toast } from "react-toastify";

const InvestorDocumentPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector(
    (state) => state.investorDocument
  );

  const [editingData, setEditingData] = useState<any | null>(null);

  const LIMIT = 10;

  const { rows, pagination } = normalizeListResponse(
    list || { data: [], items: [], pagination: {} },
    LIMIT
  );

  const fields = [
	  {
		type: "dropdown",
		name: "docType",
		label: "Document Type",
		options: [
			{ label: "Pdf", value: "pdf" },
			{ label: "Contact Details", value: "contact_details" },
			{ label: "Video", value: "video" },
			{ label: "Link", value: "link" },
			{ label: "Image", value: "image" },
		],
	  },
    {
      type: "text",
      name: "title",
      label: "Title",
      col: "md:col-span-12",
	 
    },
    {
      type: "image",
      name: "desktop_image",
      label: "Desktop Image",
	  showIf: (data: any) => data.docType === "image",
    },
    {
      type: "image",
      name: "mobile_image",
      label: "Mobile Image",
	  showIf: (data: any) => data.docType === "image",
    },
    {
      type: "video",
      name: "desktop_video",
      label: "Desktop video",
	  showIf: (data: any) => data.docType === "video",
    },
    {
      type: "video",
      name: "mobile_video",
      label: "Mobile video",
	  showIf: (data: any) => data.docType === "video",
    },
    {
      type: "file",
      name: "file",
      label: "Document File",
	  showIf: (data: any) => data.docType === "pdf",
    },
    {
      type: "image",
      name: "thumbnail",
      label: "Thumbnail",
	  showIf: (data: any) => data.docType === "pdf" || data.docType === "video" || data.docType === "link",
    },
    {
      type: "text",
      name: "alt",
      label: "Alt",
	  showIf: (data: any) => data.docType === "image",
    },
     {
        type: "text",
        name: "link",
        label: "Link",
        col: "md:col-span-12",
		showIf: (data: any) => data.docType === "link",
      },
     {
        type: "array",
        name: "list",
        label: "List",
        col: "md:col-span-12",
        multiple: false,
        fields: [
          { type: "richtext", name: "address", label: "Address" },
          { type: "richtext", name: "contact", label: "Contact" },
          { type: "richtext", name: "fax", label: "Fax" },
          { type: "richtext", name: "email", label: "Email" },
        ],
		  showIf: (data: any) => data.docType === "contact_details",
      },
      
  ];

  useEffect(() => {
    if (!id) return;

    dispatch(
      fetchInvestorDocuments({
        url: `/investor-documents/${id}/list`,
        params: {
          page: pagination.page,
          limit: pagination.limit,
        },
      })
    );
  }, [id, pagination.page, pagination.limit, dispatch]);



  const handleSubmit = async (
    formData: Record<string, any>
  ): Promise<boolean> => {
    try {
          const allowedFields = extractFieldNames(fields);
    const fileFields = extractFileFieldNames(fields);

    const filteredData = Object.fromEntries(
      Object.entries(formData).filter(([key]) =>
        allowedFields.includes(key)
      )
    );
      const payload = {
        ...formData,
        categoryId: id,
      };


    const fd = buildFormDataFromObject(payload, fileFields);

      if (editingData?.id) {
        await dispatch(
          updateInvestorDocument({
            id: editingData.id,
            data: fd,
          })
        ).unwrap();
      } else {
        await dispatch(
          addInvestorDocument({
            data: fd,
          })
        ).unwrap();
      }

      dispatch(
        fetchInvestorDocuments({
          url: `/investor-documents/${id}/list`,
          params: {
            page: pagination.page,
            limit: pagination.limit,
          },
        })
      );

      setEditingData(null);
      return true;
    } catch {
      toast.error("Save failed");
      return false;
    }
  };

 const handleEdit = (item: any) => {
  const normalized = normalizeFilesForEdit(
    item,
    fields,
    ""
  );

  setEditingData(normalized);
  window.scrollTo({ top: 0, behavior: "smooth" });
};
  const handleDelete = async (item: any) => {
    try {
      await dispatch(deleteInvestorDocument({ id: item.id })).unwrap();

      dispatch(
        fetchInvestorDocuments({
          url: `/investor-documents/${id}/list`,
          params: {
            page: pagination.page,
            limit: pagination.limit,
          },
        })
      );
    } catch {
      toast.error("Delete failed");
    }
  };

  const handlePageChange = (page: number) => {
    dispatch(
      fetchInvestorDocuments({
        url: `/investor-documents/${id}/list`,
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
            title={
              editingData ? "Edit Investor Document" : "Add Investor Document"
            }
            fields={fields as any[]}
            defaultValues={editingData || undefined}
            onSubmit={handleSubmit}
            col={12}
            loading={loading}
          />
        </div>

        <div className="col-span-12">
          <Card>
            <CardHeading>Investor Documents</CardHeading>

            <TableContainer
              head={[
                { key: "title", label: "Title" },
                { key: "docType", label: "Type" },
              ]}
              data={rows}
              pagination={pagination}
              currentPage={pagination.page}
              handlePageChange={handlePageChange}
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </Card>
        </div>
      </div>
    </section>
  );
};

export default InvestorDocumentPage;