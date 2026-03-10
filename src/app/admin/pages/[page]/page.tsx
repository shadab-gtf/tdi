"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import {
  addSection,
  deleteSection,
  fetchSectionsByPage,
  updateSection,
  fetchSectionById,
} from "@/features/slices/sectionSlice";

import { sectionsConfig } from "@/admin/fields/sectionConfig";
import {
  buildFormDataFromObject,
  extractFileFieldNames,
  normalizeListResponse,
} from "@/admin/utils/helper";

import Card from "@/admin/components/card/Card";
import CardHeading from "@/admin/components/card/CardHeading";
import TableContainer from "@/admin/components/table/TableContainer";
import DynamicForm from "@/admin/components/form/DynamicForm";
import { toast } from "react-toastify";
import { RouteParams } from "@/types/common";
import { SectionRow } from "@/types/page";
import { DynamicField } from "@/types/form";

const PageSections: React.FC = () => {
  const { page } = useParams<RouteParams>();
  const dispatch = useAppDispatch();

  const { sections, loading } = useAppSelector((state) => state.sections);

  const [editingData, setEditingData] =
    useState<Record<string, any> | null>(null);
  const [selectedType, setSelectedType] = useState<string>("");


  const getSectionFields = (
    pageSlug: string,
    sectionType: string
  ): DynamicField[] => {
    const defaultFields =
      (sectionsConfig.defaultFields as DynamicField[]) || [];

    const sectionFields = (sectionsConfig as any)?.[pageSlug]?.[sectionType];

    if (Array.isArray(sectionFields) && sectionFields.length > 0) {
      return [...defaultFields, ...sectionFields];
    }

    return defaultFields;
  };

  const formFields = useMemo<DynamicField[]>(() => {
    if (!selectedType)
      return sectionsConfig.defaultFields as DynamicField[];
    return getSectionFields(page, selectedType);
  }, [page, selectedType]);

  const { rows: sectionRows, pagination: sectionPagination } =
    normalizeListResponse<SectionRow>(sections, 10);

  const rawTypes = useMemo<string[]>(() => {
    return (sectionsConfig as any)?.[page]
      ? Object.keys((sectionsConfig as any)[page])
      : [];
  }, [page]);

  const availableTypes = useMemo<string[]>(() => {
    const existingTypes = new Set(
      sectionRows
        .map((r) => r.sectionType || r.type)
        .filter(Boolean)
    );

    return rawTypes.filter((t) => {
      if (selectedType && t === selectedType) return true;
      return !existingTypes.has(t);
    });
  }, [rawTypes, sectionRows, selectedType]);

  const formFieldsWithType = useMemo<DynamicField[]>(() => {
    const options = availableTypes.map((t) => ({
      value: t,
      label: t,
    }));

    return [
      {
        type: "dropdown",
        name: "type",
        label: "Section Type",
        options,
        col: "md:col-span-6",
      },
      ...formFields,
    ];
  }, [availableTypes, formFields]);

  useEffect(() => {
    if (!page) return;

    dispatch(fetchSectionsByPage({ page }));
    setEditingData(null);
    setSelectedType("");
  }, [page, dispatch]);


  const handleSearch = (term: string) => {
    dispatch(
      fetchSectionsByPage({
        page,
        params: { search: term || undefined },
      })
    );
  };

  const handleFormSubmit = async (
    formData: Record<string, any>
  ): Promise<boolean> => {
    const dataObj: Record<string, any> = {
      ...formData,
      type: selectedType,
      pageSlug: page,
    };

    if (editingData?.id) dataObj.id = editingData.id;

    //   const fileFieldNames = formFields
    // .filter((f) =>
    //   ["image", "file", "largefile"].includes(
    //     String(f.type).toLowerCase()
    //   )
    // )
    // .map((f) => f.name)
    // .filter((name): name is string => Boolean(name));
    const fileFieldNames = extractFileFieldNames(formFields);
    const payload = buildFormDataFromObject(dataObj, fileFieldNames);

    try {
      if (editingData?.id) {
        await dispatch(
          updateSection({ id: editingData.id, data: payload })
        ).unwrap();
      } else {
        await dispatch(addSection({ data: payload })).unwrap();
      }

      dispatch(fetchSectionsByPage({ page }));
      setEditingData(null);
      setSelectedType("");
      return true;
    } catch (err) {
      console.error("Save failed:", err);
      return false;
    }
  };

  const handleEdit = async (item: SectionRow) => {
    if (!item?.id) return;

    try {
      const raw = await dispatch(fetchSectionById({ id: item.id })).unwrap();
      const resObj = raw;

      if (!resObj) {
        toast.error("No data returned");
        return;
      }

      const sectionTypeFromApi = resObj.type || item.type;

      const fieldsForType = getSectionFields(page, sectionTypeFromApi);
      const mapped: Record<string, any> = {};

      fieldsForType.forEach((f) => {
        if (!f.name) return;

        const key = f.name;
        const value = resObj[key];

        if (f.type === "array" && Array.isArray(value)) {
          mapped[key] = value;
        } else if (value !== undefined) {
          mapped[key] = value;
        } else if (resObj.files && resObj.files[key] !== undefined) {
          mapped[key] = resObj.files[key];
        }
      });

      mapped.type = sectionTypeFromApi;
      mapped.id = resObj.id;

      setSelectedType(sectionTypeFromApi);
      setEditingData(mapped);

      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      toast.error("Failed to load section");
    }
  };

  const handleDelete = async (item: SectionRow) => {
    try {
      await dispatch(deleteSection({ id: item.id })).unwrap();
      dispatch(fetchSectionsByPage({ page }));
    } catch {
      toast.error("Delete failed");
    }
  };

  const defaultValues = useMemo<Record<string, any> | undefined>(() => {
    if (editingData) return editingData;
    if (selectedType) return { type: selectedType };
    return undefined;
  }, [editingData, selectedType]);

  console.log("FINAL DEFAULT VALUES SENT TO FORM:", defaultValues);

  const SectionTable = TableContainer<SectionRow>;

  return (
    <section className="p-6">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <DynamicForm
            title={editingData ? "Edit Section" : "Create New Section"}
            fields={formFieldsWithType as any[]}
            defaultValues={defaultValues}
            onFieldChange={(name, value) => {
              if (name === "type") setSelectedType(value);
            }}
            onSubmit={handleFormSubmit}
            col={12}
            loading={loading}
          />
        </div>

        <div className="col-span-12">
          <Card>
            <CardHeading>Sections for: {page}</CardHeading>

            <SectionTable
              head={[
                { key: "type", label: "Section Type" },

                {
                  key: "title",
                  label: "Heading",
                  render: (row: any) => row?.title?.heading || "-"
                },


                {
                  key: "description",
                  label: "Description",
                  render: (row: any) => row?.description?.description || "-"
                },
              ]}

              data={sectionRows}
              pagination={sectionPagination}
              currentPage={sectionPagination.page}

              handlePageChange={(p) =>
                dispatch(
                  fetchSectionsByPage({
                    page,
                    params: {
                      page: p,
                      limit: sectionPagination.limit,
                    },
                  })
                )
              }

              onEdit={handleEdit}
              onDelete={handleDelete}
              onSearch={handleSearch}
              searchPlaceholder="Search sections..."

              customActions={[
                {
                  label: "Section Details",
                  render: (item) => {
                    if (item.type === "home_livings") {
                      return (
                        <a href={`/admin/livings?prev=pages`} className="text-blue-500 underline">
                          More Details
                        </a>
                      );
                    } else if (item.type === "home_awards") {
                      return (
                        <a href={`/admin/awards?prev=pages`} className="text-blue-500 underline">
                          More Details
                        </a>
                      );
                    } else if (item.type === "home_why_kundli") {
                      return (
                        <a href={`/admin/why-kundli?prev=pages`} className="text-blue-500 underline">
                          More Details
                        </a>
                      );
                    } else if (item.type === "home_brands") {
                      return (
                        <a href={`/admin/our-partners?prev=pages`} className="text-blue-500 underline">
                          More Details
                        </a>
                      );
                    } else {

                      //      const link =
                      //   item.type === "instagram_feed"
                      //     ? `/admin/instagram`
                      //     : `/admin/pages/${page}/${item.type}`;

                      // return (
                      //   <a href={link} className="text-blue-500 underline">
                      //     More Details
                      //   </a>
                      // );
                    }

                  },
                },
              ]}
            />

          </Card>
        </div>
      </div>
    </section>
  );
};

export default PageSections;
