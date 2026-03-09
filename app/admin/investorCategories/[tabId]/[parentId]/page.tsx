"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import DynamicForm from "@/admin/components/form/DynamicForm";
import TableContainer from "@/admin/components/table/TableContainer";
import Card from "@/admin/components/card/Card";
import CardHeading from "@/admin/components/card/CardHeading";

import {
  fetchInvestorCategories,
  addInvestorCategory,
  updateInvestorCategory,
  deleteInvestorCategory,
} from "@/features/slices/investorCategoriesSlice";

import { normalizeListResponse } from "@/admin/utils/helper";
import { toast } from "react-toastify";
import Link from "next/link";

const InvestorCategoriesPage: React.FC = () => {
  
  const { tabId, parentId} = useParams<{
    tabId: string;
    parentId: string; 
  }>();

  const getListingUrl = () => {
  if (!tabId || !parentId) return "";

  const isOverview =
    tabId === "eipl_overview" || tabId === "ehil_overview";

  return isOverview
    ? `/investor-categories/${parentId}/list`
    : `/investor-categories/${tabId}/${parentId}/list`;
};

  const isOverviewTab =
  tabId === "eipl_overview" || tabId === "ehil_overview";

const realTabId = isOverviewTab ? parentId : tabId;
const realParentId = isOverviewTab ? null : parentId;

const listingId = realParentId ?? realTabId;
  
  const dispatch = useAppDispatch();
  const { list, loading } = useAppSelector(
    (state) => state.investorCategories,
  );

  const [editingData, setEditingData] =
    useState<Record<string, any> | null>(null);

  const LIMIT = 10;

useEffect(() => {
  const url = getListingUrl();
  if (!url) return;

  dispatch(
    fetchInvestorCategories({
      url,
      params: { page: 1, limit: LIMIT },
    }),
  );
}, [tabId, parentId, dispatch]);


 const flattenCategories = (categories: any[]): any[] => {
  let result: any[] = [];

  categories.forEach((cat) => {
    result.push({
      value: cat.id,
      label: cat.title,
    });

    if (cat.children?.length) {
      result = result.concat(flattenCategories(cat.children));
    }
  });

  return result;
};

  const categoryOptions = useMemo(() => {
    if (!list?.data) return [];
    return flattenCategories(list.data);
  }, [list]);


  const fields = [
   
    {
      type: "text",
      name: "title",
      label: "Title",
      col: "md:col-span-12",
    },
    {
      type: "dropdown",
      name: "isDocument",
      label: "Is Document",
      options: [
        { label: "Yes", value: true },
        { label: "No", value: false },
      ],
      col: "md:col-span-12",
    },
  ];

  const { rows: rawRows, pagination } = normalizeListResponse(
    list || { data: [], items: [], pagination: {} },
    LIMIT,
  );


  const handleSubmit = async (
    formData: Record<string, any>,
  ): Promise<boolean> => {
    try {
      const payload = {
        ...formData,
        tabId: isOverviewTab ? parentId : tabId,
       parentId: isOverviewTab ? undefined : parentId ,
      };

      if (editingData?.id) {
        await dispatch(
          updateInvestorCategory({
            id: editingData.id,
            data: payload,
          }),
        ).unwrap();
      } else {
        await dispatch(
          addInvestorCategory({
            data: payload,
          }),
        ).unwrap();
      }

      dispatch(
      fetchInvestorCategories({
        url: getListingUrl(),
        params: {
          page: pagination.page,
          limit: pagination.limit,
        },
      }),
    );

      setEditingData(null);
      return true;
    } catch {
      toast.error("Something went wrong");
      return false;
    }
  };


  const handleDelete = async (item: any) => {
    await dispatch(deleteInvestorCategory({ id: item.id })).unwrap();

     dispatch(
      fetchInvestorCategories({
        url: getListingUrl(),
        params: {
          page: pagination.page,
          limit: pagination.limit,
        },
      }),
    );  
  };

  const handleSearch = (term: string) => {
    dispatch(
  fetchInvestorCategories({
    url: getListingUrl(),
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
  fetchInvestorCategories({
    url: getListingUrl(),
    params: {
      page: page,
      limit: pagination.limit,
    },
  }),
);
  };

  // if (
  //   devSection !== "eipl_overview" &&
  //   devSection !== "ehil_overview"
  // ) {
  //   return <div className="p-6">Invalid Section</div>;
  // }

  return (
    <section className="p-6 grid grid-cols-12 gap-6">
      <div className="col-span-12">
        <DynamicForm
          title={editingData ? "Edit Category" : "Add Category"}
          fields={fields as any[]}
          defaultValues={editingData || undefined}
          onSubmit={handleSubmit}
          loading={loading}
        />
      </div>
 
      <div className="col-span-12">
        <Card>
          <CardHeading>Investor Categories</CardHeading>
          <TableContainer
            head={[
              { key: "title", label: "Title" },
              
            ]}
            data={rawRows}
            pagination={pagination}
            currentPage={pagination.page}
            handlePageChange={handlePageChange}
            onEdit={setEditingData}
            onDelete={handleDelete}
            onSearch={handleSearch}
          customActions={[
                         {
                           label: "ADD Category",
                           render: (item) => (
                             <Link
                               href={`/admin/investorCategories/${realTabId}/${item.id}`}
                               className="text-blue-500 underline"
                             >
                               Add Category
                             </Link>
                           ),
                         },
                          {
                            label: "Add Document",
                            render: (item) =>
                              item.isDocument ? (
                                <Link
                                  href={`/admin/investorDocument/${item.id}`}
                                  className="text-green-600 underline"
                                >
                                  Add Document
                                </Link>
                              ) : null,
                          },
                       ]}
          />
        </Card>
      </div>
    </section>
  );
};

export default InvestorCategoriesPage;