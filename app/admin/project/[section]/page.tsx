"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import {
  fetchSections,
  fetchSectionByProjectAndType,
  addSection,
  fetchSectionsByProject,
  deleteSection,
  deleteProjectSectionFile,
} from "@/features/slices/projectSectionSlice";
import DeleteFileModal from "@/admin/components/common/DeleteFileModal";
import Card from "@/admin/components/card/Card";
import CardHeading from "@/admin/components/card/CardHeading";
import TableContainer from "@/admin/components/table/TableContainer";
import DynamicForm from "@/admin/components/form/DynamicForm";
import { toast } from "react-toastify";

import {
  buildFormDataFromObject,
  extractFieldNames,
  extractFileFieldNames,
  getSectionFields,
  normalizeFilesForEdit,
  normalizeListResponse,
} from "@/admin/utils/helper";

import { projectSectionsConfig } from "@/admin/fields/projectFields";
import {
  SectionListItem,
  ProjectSection,
  DropdownOption,
} from "@/types/project";
import { updateProjectSeq } from "@/features/slices/projectsSlice";

const PAGE_LIMIT = 10;

const ProjectSections: React.FC = () => {
  const params = useParams<{ section: string }>();
  const projectId = params.section;
const [selectedType, setSelectedType] = useState<string | null>(null);
  const [seqDrafts, setSeqDrafts] = useState<Record<string, number>>({});

  const dispatch = useAppDispatch();

  const { masterSections, projectSections, loading } = useAppSelector(
  (state) => state.projectSections,
);
const sections: SectionListItem[] = masterSections;

  const [editingData, setEditingData] = useState<ProjectSection | null>(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
const [selectedSectionId, setSelectedSectionId] = useState<string | null>(null);
const [deleteLoading, setDeleteLoading] = useState(false);
  useEffect(() => {
    dispatch(fetchSections());
  }, [dispatch]);

useEffect(() => {
  if (projectId) {
    dispatch(fetchSectionsByProject(projectId));
  }
}, [dispatch, projectId]);

  const injectOptions = (
    fields: any[],
    optionsMap: Record<string, DropdownOption[]>,
  ) =>
    fields.map((field) =>
      field.type === "dropdown" && optionsMap[field.name]
        ? { ...field, options: optionsMap[field.name] }
        : field,
    );

    
useEffect(() => {
  if (editingData?.type) {
    setSelectedType(editingData.type);
  }
}, [editingData]);

const dropdownOptions: Record<string, DropdownOption[]> = useMemo(() => {
  const usedTypes = projectSections.map((s: any) => s.type);
  
  const availableSections = sections.filter((s) => {
    const isUsed = usedTypes.includes(s.type);
    const isCurrentType = editingData?.type && s.type === editingData.type;
    return !isUsed || isCurrentType;
  });
  
  
  return {
    type: availableSections.map((s) => ({
      label: s.name,
      value: s.type,
    })),
  };
}, [sections, projectSections, editingData]);

const fields = useMemo(() => {
  let baseFields:any[] = projectSectionsConfig.defaultFields;
  
  if (selectedType === "locationadvantage" ) {
    baseFields = projectSectionsConfig.locationadvantage;
  }
  if (selectedType === "amenities" ) {
    baseFields = projectSectionsConfig.amenities;
  }

  return injectOptions(baseFields, dropdownOptions);
}, [dropdownOptions, selectedType]);


  const { rows, pagination } = normalizeListResponse(
    projectSections,
    PAGE_LIMIT,
  );

  const handleFileDelete = async (fileType: string) => {
  if (!selectedSectionId) return;

  try {
    setDeleteLoading(true);

    await dispatch(
      deleteProjectSectionFile({
        projectSectionId: selectedSectionId,
        key: fileType,
      })
    ).unwrap();

    toast.success("File deleted successfully");
    
    setDeleteModalOpen(false);
    dispatch(fetchSectionsByProject(projectId));
  } catch (error) {
    toast.error("Failed to delete file");
  } finally {
    setDeleteLoading(false);
  }
};


  const handleEdit = async (item: SectionListItem) => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      if (!item.type) return;
      const full = await dispatch(
        fetchSectionByProjectAndType({
          projectId,
          type: item.type,
        }),
      ).unwrap();
      

      const pageSection = full ;

       const correctFields = injectOptions(
      getSectionFields(item.type),
      dropdownOptions
    );

      const normalizedData: ProjectSection = {
  ...normalizeFilesForEdit(
        pageSection,
        correctFields,
        process.env.NEXT_PUBLIC_API_URL || ""
  ),
  type: item.type,
};
      setSelectedType(item.type);
      setEditingData(normalizedData);
    } catch {
      toast.error("Failed to load section");
    }
  };
  const handleSeqUpdate = async (row: any) => {
  
      const seq = Number(seqDrafts[row.id]);
      if (Number.isNaN(seq) || seq === row.seq) return;
  
      await dispatch(
        updateProjectSeq({
          itemId: row.id,
          seq,
        }),
      );
      toast.success("Sequence updated successfully");
    };
const handleDelete = async (item: ProjectSection) => {
  try {
      if (!item.id) return;
    await dispatch(deleteSection({ id: item.id })).unwrap();

    dispatch(fetchSectionsByProject(projectId));
  } catch (error) {
  }
};

  const handleFormSubmit = async (
    formData: Record<string, any>,
  ): Promise<boolean> => {
      const allowed = extractFieldNames(fields);

  const cleaned: Record<string, any> = {};
  allowed.forEach((key) => {
    if (formData[key] !== undefined) {
      cleaned[key] = formData[key];
    }
  });

    const payloadObj = {
    projectId,
    ...cleaned,
  };

  const fileFields = extractFileFieldNames(fields);

  const payload = buildFormDataFromObject(
    payloadObj,
    fileFields,
  );


    try {
      await dispatch(addSection({ data: payload })).unwrap();
      dispatch(fetchSectionsByProject(projectId));
      setEditingData(null);
      return true;
    } catch {
      toast.error("Save failed");
      return false;
    }
  };

  return (
    <section className="p-6">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <DynamicForm
            key={editingData?.id || "create"}   
            title={editingData ? "Edit Section" : "Create New Section"}
            fields={fields}
            defaultValues={editingData || undefined}
            onSubmit={handleFormSubmit}
            col={12}
             onFieldChange={(name:any, value:any) => {
                if (name === "type") {
                  setSelectedType(value);
                }
              }}
            loading={loading}
          />
        </div>

        <div className="col-span-12">
          <Card>
            <CardHeading>Sections</CardHeading>

            <TableContainer
              head={[
                { key: "type", label: "Section Name" },
                { key: "title", label: "Heading", render: (row: any) => {
                  const text = row.title.heading || "-";
                  if (text.length <= 50) return text;
                  return text.substring(0, 50) + "...";
                }},

                      
                  {
                         key: "seq",
                         label: "Sequence",
                         render: (row) => (
                           <input
                             type="number"
                             value={seqDrafts[row.id] ?? row.seq ?? 0}
                             onChange={(e) =>
                               setSeqDrafts((prev) => ({
                                 ...prev,
                                 [row.id]: Number(e.target.value),
                               }))
                             }
                             onKeyDown={(e) => {
                               if (e.key === "Enter") handleSeqUpdate(row);
                             }}
                             className="w-16 border rounded px-2 py-1 text-sm text-center"
                           />
                         ),
                       },
              ]}
              data={rows}
              pagination={pagination}
              handlePageChange={() => {}} 
              currentPage={pagination.page}
              onEdit={handleEdit}
              onDelete={handleDelete}
              customActions={[
                {
                  label: "Section Details",
                  render: (item: SectionListItem) =>
                    item?.type !== "overview" ? (
                      <a
                        href={`/admin/project/${projectId}/${item.type}`}
                        className="text-blue-500 underline"
                      >
                        More Details
                      </a>
                    ) : null,
                },
                // {
                //   label: "Delete File",
                //   render: (item: SectionListItem) => (
                //     <p
                //       onClick={() => {
                //         setSelectedSectionId(item.id);
                //         setDeleteModalOpen(true);
                //       }}
                //       className="text-red-500 underline cursor-pointer"
                //     >
                //       Delete File
                //     </p>
                //   ),
                // }

              ]}
            />
          </Card>
        </div>
      </div>
      <DeleteFileModal
  isOpen={deleteModalOpen}
  loading={deleteLoading}
  onClose={() => setDeleteModalOpen(false)}
  onConfirm={handleFileDelete}
/>
    </section>
  );
};

export default ProjectSections;
