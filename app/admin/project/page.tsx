"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toast } from "react-toastify";


import {
  fetchProject,
  fetchProjectById,
  addProject,
  updateProject,
  deleteProject,
  featureProject,
  updateProjectSeq,
  developerProject
} from "@/features/slices/projectsSlice";


import Card from "@/admin/components/card/Card";
import CardHeading from "@/admin/components/card/CardHeading";
import TableContainer from "@/admin/components/table/TableContainer";
import DynamicForm from "@/admin/components/form/DynamicForm";


import {
  buildFormDataFromObject,
  extractFieldNames,
  extractFileFieldNames,
  normalizeFilesForEdit,
  normalizeListResponse,
} from "@/admin/utils/helper";

import { projectFields } from "@/admin/fields/projectFields";
import { lookupThunks } from "@/features/slices/commonSlice";
import { Project } from "@/types/project";


interface DropdownOption {
  label: string;
  value: string;
}

const PAGE_LIMIT = 10;

const Projects: React.FC = () => {
  const dispatch = useAppDispatch();
const [featuredDrafts, setFeaturedDrafts] = useState<Record<string, boolean>>({});
const [developerDrafts, setDeveloperDrafts] = useState<Record<string, boolean>>({});


  const { projectsData, loading } = useAppSelector(
    (state) => state.projects
  );

  const { platter, projectStatus ,typology ,cities,developer} =
    useAppSelector((state) => state.lookups);
 
  const [editingData, setEditingData] = useState<Project | null>(null);
const [selectedTypologyId, setSelectedTypologyId] = useState<
  string | number | undefined
>();
const [subTypology, setsubTypology] = useState<any>(null);

  const { rows, pagination } = normalizeListResponse(
    projectsData,
    PAGE_LIMIT
  );
  

  useEffect(() => {
    dispatch(lookupThunks.platter.fetchList());
    dispatch(lookupThunks.projectStatus.fetchList());
    dispatch(lookupThunks.typology.fetchList());
    dispatch(lookupThunks.cities.fetchList());
    dispatch(lookupThunks.developer.fetchList());
    
  }, [dispatch]);

  useEffect(() => {
  const typologyId = editingData?.typologyId;

  if (!typologyId) return;

  dispatch(
    lookupThunks.subtypology.fetchList({
      url: `/typologymapping/${typologyId}/subtypes`,
    })
  );
}, [editingData?.typologyId, dispatch]);

useEffect(() => {
  if (!selectedTypologyId) return;

  dispatch(
    lookupThunks.subtypology.fetchList({
      url: `/typologymapping/${selectedTypologyId}/subtypes`,
    })
  )
    .unwrap()
    .then((res:any) => {
      setsubTypology(res?.data);
    })
    .catch((err) => {
      console.error(err);
    });
}, [selectedTypologyId, dispatch]);




  useEffect(() => {
    dispatch(
      fetchProject({
        params: {
          page: pagination.page,
          limit: pagination.limit,
        },
      })
    );
  }, [dispatch]);

  
const handleFeaturedChange = async (
  row: Project,
  value: boolean
) => {
  try {
    await dispatch(
      featureProject({
        itemId: row.id,
        feature: value,
      })
    ).unwrap();

    toast.success("Featured status updated");

    setFeaturedDrafts((prev) => ({
      ...prev,
      [row.id]: value,
    }));
  } catch (err) {
    toast.error("Failed to update featured status");
  }
};
const handleDeveloperChange = async (
  row: Project,
  value: boolean
) => {
  try {
    await dispatch(
      developerProject({
        itemId: row.id,
        developer: value,
      })
    ).unwrap();

    toast.success("Developer status updated");

    setDeveloperDrafts((prev) => ({
      ...prev,
      [row.id]: value,
    }));
  } catch (err) {
    toast.error("Failed to update developer status");
  }
};

    
  const toOptions = (list?: any[]): DropdownOption[] =>
    Array.isArray(list)
      ? list.map((i) => ({
          label: i.name || i.fullName,
          value: i.id,
        }))
      : [];

      
  const injectOptions = (fields: any[], optionsMap: Record<string, DropdownOption[]>,typologyId?: string | number) =>
    fields.map((field) =>
      
      field.type === "dropdown" && optionsMap[field.name]
        ? { ...field, fetchOptions: optionsMap[field.name] , 
          key: field.name === "subTypologyId"
              ? `sub-${typologyId || "empty"}`
              : field.name,}
        : field
    );


 const dropdownOptions = useMemo(
  () => ({
    
    platterId: toOptions(
      (platter?.list as any)?.data ?? platter?.list
    ),
    projectStatusId: toOptions(
      (projectStatus?.list as any)?.data ?? projectStatus?.list
    ),
    typologyId: toOptions(
      (typology?.list as any)?.data ?? typology?.list
    ),
    cityId: toOptions(
      (cities?.list as any)?.data ?? cities?.list
    ),
    developerId: toOptions(
      (developer?.list as any)?.data ?? developer?.list
    ),
    
   subTypologyId: toOptions(
  Array.isArray(subTypology)
    ? subTypology
    : Array.isArray((subTypology?.list as any)?.data)
      ? (subTypology.list as any).data
      : []
),
  }),
  [platter, projectStatus,subTypology,typology ,cities,developer]
);



 const fields = useMemo(
  () =>
    injectOptions(
      projectFields.basicDetails,
      dropdownOptions,
        selectedTypologyId ?? editingData?.typologyId
    ),
  [dropdownOptions, selectedTypologyId,editingData?.typologyId]
);

  const handleEdit = async (item: Project) => {
    window.scrollTo({ top: 0, behavior: "smooth" });

    try {
      const full = await dispatch(
        fetchProjectById({ id: item.id })
      ).unwrap();
   const normalizedData: Project = {
  ...full,
  ...normalizeFilesForEdit(
    full,
    projectFields.basicDetails,
    process.env.NEXT_PUBLIC_API_URL || ""
  ),
};

      setEditingData(normalizedData);
      setSelectedTypologyId(full.typologyId);
      toast.success("Project loaded");
    } catch {
      toast.error("Failed to load project");
    }
  };

  const handleDelete = async (item: Project) => {
    try {
      await dispatch(deleteProject({ id: item.id })).unwrap();
      toast.success("Project deleted");
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleSearch = (term: string) => {
    dispatch(
      fetchProject({
        params: {
          page: 1,
          limit: pagination.limit,
          search: term || undefined,
        },
      })
    );
  };

  
  const handleFormSubmit = async (formData: Record<string, any>) => {
    const allowed = extractFieldNames(projectFields.basicDetails);

const cleaned: Record<string, any> = {};
allowed.forEach((key) => {
  if (formData[key] !== undefined) {
    cleaned[key] = formData[key];
  }
});

const fileFields = extractFileFieldNames(projectFields.basicDetails);

const payload = buildFormDataFromObject(cleaned, fileFields);

//     const payload = buildFormDataFromObject(formData, [
//   "logo",
//   "mobile_image",
//   "desktop_image",
//   "brochure"
// ]);

    try {
      if (editingData?.id) {
         await dispatch(
          updateProject({
            id: editingData.id,
            data: payload,
          })
        ).unwrap();
      } else {
     await dispatch(addProject({ data: payload })).unwrap();

      }

      setEditingData(null);
      toast.success("Project saved");

      dispatch(
        fetchProject({
          params: {
            page: pagination.page,
            limit: pagination.limit,
          },
        })
      );

      return true;
    } catch (error) {
  console.error("Caught error AFTER add success:", error);
  return false;
}
  };

  

  return (
    <section className="p-6">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12">
          <DynamicForm
            title={editingData ? "Edit Project" : "Create New Project"}
            fields={fields}
            defaultValues={editingData || undefined}
            onSubmit={handleFormSubmit}
            col={12}
            loading={loading}
             onFieldChange={(name, value) => {
              if (name === "typologyId") {
                setSelectedTypologyId(value);

              }
            }}
          />
        </div>

        <div className="col-span-12">
          <Card>
            <CardHeading>Projects List</CardHeading>

            <TableContainer
              head={[
                { key: "projectName", label: "Project Name" },
                { key: "location", label: "Location" },
                { key: "logo", label: "Logo" },
                {
                  key: "feature",
                  label: "Featured",
                  render: (row: Project) => {
                    const currentValue =
                      featuredDrafts[row.id] ?? row.is_featured ?? false;

                    return (
                      <select
                        value={String(currentValue)}
                        onChange={(e) =>
                          handleFeaturedChange(row, e.target.value === "true")
                        }
                        className="border rounded px-5 py-1 text-smfont-bold bg-gray-900"
                      >
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </select>
                    );
                  },
                },
                {
                  key: "developer",
                  label: "Developer",
                  render: (row: Project) => {
                    const currentValue =
                      developerDrafts[row.id] ?? row.is_developer ?? false;

                    return (
                      <select
                        value={String(currentValue)}
                        onChange={(e) =>
                          handleDeveloperChange(row, e.target.value === "true")
                        }
                        className="border rounded px-5 py-1 text-smfont-bold bg-gray-900"
                      >
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </select>
                    );
                  },
                },
                
              ]}
              data={rows}
              pagination={pagination}
              currentPage={pagination.page}
              handlePageChange={(page: number) =>
                dispatch(
                  fetchProject({
                    params: {
                      page,
                      limit: pagination.limit,
                    },
                  })
                )
              }
              customActions={[
                {
                  label: "Sections",
                  render: (item: Project) => (
                    <a
                      href={`/admin/project/${item.id}`}
                      className="text-blue-500 underline"
                    >
                      Sections
                    </a>
                  ),
                },
              ]}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onSearch={handleSearch}
              searchPlaceholder="Search projects..."
            />
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Projects;
