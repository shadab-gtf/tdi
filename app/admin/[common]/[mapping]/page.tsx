"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import DynamicForm from "@/admin/components/form/DynamicForm";
import Card from "@/admin/components/card/Card";
import CardHeading from "@/admin/components/card/CardHeading";
import TableContainer from "@/admin/components/table/TableContainer";

import {
  fetchUnassignedSubtypes,
  fetchAssignedSubtypes,
  addMapping,
  deleteMapping,
  setPagination,
} from "@/features/slices/typologyMappingSlice";

interface Subtypology {
  id: string;
  name: string;
}

const SubtypologyMappingPage: React.FC = () => {
  const params = useParams();
  const typologyId = Array.isArray(params.mapping) 
    ? params.mapping[0] 
    : params.mapping || "";
  
  const dispatch = useAppDispatch();

  const {
    unassignedSubtypes = [],
    assignedSubtypes = [],
    loading,
    error,
    pagination,
  } = useAppSelector((state) => state.typologyMapping);

  console.log(unassignedSubtypes, "unassignedSubtypes");

  const PAGE_LIMIT = 10;
  
  const tablePagination = {
    page: pagination.page,
    limit: pagination.limit,
    total: pagination.total,
    totalPages: pagination.totalPages,
  };

  const [currentPage, setCurrentPage] = useState<number>(
    pagination.page || 1
  );
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!typologyId) return;

    dispatch(fetchUnassignedSubtypes({ typologyId }));
    dispatch(
      fetchAssignedSubtypes({
        typologyId,
        params: {
          page: currentPage,
          limit: PAGE_LIMIT,
        },
      })
    );
  }, [dispatch, typologyId, currentPage]);

  useEffect(() => {
    dispatch(setPagination({ page: currentPage }));
  }, [currentPage, dispatch]);

  const fields = useMemo(
    () => [
      {
        type: "dropdown" as const,
        name: "subTypologyId",
        label: "Add Subtypology",
        required: true,
        options: unassignedSubtypes.map((s: Subtypology) => ({
          label: s.name,
          value: s.id,
        })),
      },
    ],
    [unassignedSubtypes]
  );

  const handleSubmit = async (
    formData: Record<string, any>
  ): Promise<boolean> => {
    if (!formData.subTypologyId) return false;

    setSubmitting(true);
    try {
      await dispatch(
        addMapping({
          typologyId,
          subTypologyId: formData.subTypologyId,
        })
      ).unwrap();

      await dispatch(fetchUnassignedSubtypes({ typologyId })).unwrap();
      await dispatch(
        fetchAssignedSubtypes({
          typologyId,
          params: {
            page: currentPage,
            limit: PAGE_LIMIT,
          },
        })
      ).unwrap();

      return true;
    } catch {
      return false;
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (item: Subtypology) => {
    try {
      await dispatch(
        deleteMapping({
          subTypologyId: item.id,
          typologyId,
        })
      ).unwrap();

      await dispatch(fetchUnassignedSubtypes({ typologyId })).unwrap();
      await dispatch(
        fetchAssignedSubtypes({
          typologyId,
          params: {
            page: currentPage,
            limit: PAGE_LIMIT,
          },
        })
      ).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  const handleSearch = (term: string) => {
    dispatch(
      fetchAssignedSubtypes({
        typologyId,
        params: {
          page: 1,
          limit: PAGE_LIMIT,
          search: term || undefined,
        },
      })
    );
    setCurrentPage(1);
  };

  const MappingTable = TableContainer<Subtypology>;

  return (
    <section className="p-6">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <DynamicForm
            title="Add Subtypology"
            fields={fields}
            onSubmit={handleSubmit}
            col={12}
            loading={submitting || loading}
          />

          {error && (
            <p className="mt-2 text-red-500 text-sm">{error}</p>
          )}
        </div>

        <div className="col-span-12">
          <Card>
            <CardHeading>Assigned Subtypologies</CardHeading>

            <MappingTable
              head={[{ key: "name", label: "Subtypology" }]}
              data={assignedSubtypes} // Use the raw array, not normalized
              pagination={tablePagination}
              currentPage={currentPage}
              handlePageChange={handlePageChange}
              onDelete={handleDelete}
              onSearch={handleSearch}
              showAction={true}
              searchPlaceholder="Search subtypologies..."
            />
          </Card>
        </div>
      </div>
    </section>
  );
};

export default SubtypologyMappingPage;