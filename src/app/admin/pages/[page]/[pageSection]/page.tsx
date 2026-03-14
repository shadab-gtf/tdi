"use client";

import React, { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";

import DynamicForm from "@/admin/components/form/DynamicForm";
import TableContainer from "@/admin/components/table/TableContainer";
import Card from "@/admin/components/card/Card";
import CardHeading from "@/admin/components/card/CardHeading";
import { BaseEntity, lookupThunks } from "@/features/slices/commonSlice";
import { sectionListConfig } from "@/admin/fields/sectionListConfig";
import {
  fetchList,
  create,
  update,
  remove,
  updateIsHome,
} from "@/features/slices/sectionListSlice";

import {
  buildFormDataFromObject,
  extractFileFieldNames,
  formatDateForInput,
  normalizeListResponse,
} from "@/admin/utils/helper";
import { toast } from "react-toastify";
import { DynamicField } from "@/types/form";
import { RouteParams } from "@/types/common";
import { RootState } from "@/redux/store";
import { SectionListConfig, SectionConfig, SectionItem } from "@/types/section";
import {
  DropdownOptions,
  SectionDetailsConfig,
  TableColumn,
} from "@/types/admin";
import Link from "next/link";
import Image from "next/image";



const developerSlugMap: Record<string, string> = {
  eipl_overview: "eldeco-infrastructure-and-properties-ltd",
  ehil_overview: "eldeco-housing-and-industries-ltd",
};

const getEntityDisplayName = (entity: BaseEntity): string => {
  const displayProperties = ["title", "name", "label", "description"];

  for (const prop of displayProperties) {
    const value = entity[prop];
    if (value !== undefined && value !== null && value !== "") {
      return String(value);
    }
  }

  return String(entity.id);
};

const typedSectionListConfig = sectionListConfig as SectionListConfig;

const SectionDetailsPage: React.FC = () => {
  const { page, pageSection } = useParams<RouteParams>();
  const dispatch = useAppDispatch();

  const { listResponse, loading } = useAppSelector(
    (state: RootState) => state.sectionList,
  );

  const { mediaPressTypes, platter } = useAppSelector(
    (state: RootState) => state.lookups,
  );

  const [editingItem, setEditingItem] = useState<Record<string, any> | null>(
    null,
  );
  const [developerId, setDeveloperId] = useState<string | null>(null);

  console.log(developerId, "developerId")
  useEffect(() => {
    if (pageSection === "testimonial") {
      dispatch(lookupThunks.platter.fetchList());
    }
  }, [pageSection, dispatch]);

  useEffect(() => {
    if (!pageSection) return;
    const section =
      typeof pageSection === "string"
        ? pageSection
        : pageSection[0]; // handle string[]

    if (!section) return;

    const prefix = section.split("_")[0]?.toLowerCase();
    if (!prefix) return;


    const developerNameMap: Record<string, string[]> = {
      eipl: ["infrastructure", "properties"],
      ehil: ["housing", "industries"],
    };

    dispatch(lookupThunks.developer.fetchList())
      .then((res: any) => {
        const developerList = res?.payload?.data ?? [];

        let matchedDeveloper;

        // 🔹 1️⃣ First Priority: Match using short_description
        matchedDeveloper = developerList.find(
          (dev: any) =>
            dev.description?.short_description?.toLowerCase() === prefix
        );

        // 🔹 2️⃣ Fallback: Match using fullName keywords
        if (!matchedDeveloper) {
          const keywords = developerNameMap[prefix];

          if (keywords) {
            matchedDeveloper = developerList.find((dev: any) => {
              const name = dev.fullName?.toLowerCase() || "";

              return keywords.every((keyword) =>
                name.includes(keyword)
              );
            });
          }
        }

        // 🔹 3️⃣ Set ID if found
        if (matchedDeveloper?.id) {
          setDeveloperId(String(matchedDeveloper.id));
        }
      });

  }, [pageSection, dispatch]);


  const { rows: sectionRows, pagination: sectionPagination } = useMemo(() => {
    return listResponse
      ? normalizeListResponse(listResponse, 10)
      : {
        rows: [],
        pagination: { totalPages: 1, total: 0, page: 1, limit: 10 },
      };
  }, [listResponse]);

  const detailsConfig = useMemo((): SectionDetailsConfig | null => {
    if (!pageSection) return null;

    const sectionKey = pageSection as keyof typeof typedSectionListConfig;

    if (!typedSectionListConfig[sectionKey]) return null;

    const sectionConfig = typedSectionListConfig[sectionKey];
    const entries = Object.entries(sectionConfig);

    if (!entries.length) return null;

    const [, config] = entries[0] as [string, SectionConfig];

    return {
      fields: Array.isArray(config.fields) ? config.fields : [],
      table: config.table || undefined,
      endpoint: config.endpoint || undefined,
      fetchendpoint: config.fetchendpoint || undefined,
      appendPayload: config.appendPayload || {},
      tableOnly: config.tableOnly || false,
    };
  }, [pageSection]);

  const { fields, table, endpoint, fetchendpoint, appendPayload, tableOnly } =
    detailsConfig || {};

  useEffect(() => {
    if (!endpoint) return;

    if (endpoint === "/investor-tabs") {
      if (!developerId) return;
    }


    let baseFetchUrl = fetchendpoint || endpoint;

    if (endpoint === "/investor-tabs" && developerId) {
      baseFetchUrl = `/investor-tabs/${developerId}/list`;
    }

    if (endpoint === "/why-kundli") {
      baseFetchUrl += '?kundli_type=city_kundli'
    }

    dispatch(
      fetchList({
        url: baseFetchUrl,
        params: {
          page: sectionPagination.page,
          limit: sectionPagination.limit,
        },
      }),
    );
  }, [
    endpoint,
    fetchendpoint,
    developerId,
    dispatch,
    sectionPagination.page,
    sectionPagination.limit,
  ]);

  if (!detailsConfig || !detailsConfig.endpoint || !detailsConfig.table) {
    return (
      <div className="p-6 text-gray-500">
        No additional details configured for this section
      </div>
    );
  }

  const dropdownOptions = useMemo<DropdownOptions>(
    () => ({
      pressId: (mediaPressTypes?.list || []).map((item: BaseEntity) => ({
        label: getEntityDisplayName(item),
        value: String(item.id),
      })),

      platterId: ((platter?.list as any)?.data ?? platter?.list ?? []).map(
        (item: BaseEntity) => ({
          label: item.name,
          value: String(item.id),
        }),
      ),
    }),
    [mediaPressTypes, platter],
  );

  const injectOptions = (
    fields: DynamicField[],
    optionsMap: DropdownOptions,
  ): DynamicField[] =>
    fields.map((field) =>
      field.type === "dropdown" && optionsMap[field.name as string]
        ? { ...field, options: optionsMap[field.name as string] }
        : field,
    );
  const resolveFetchUrl = (
    endpoint?: string,
    fetchendpoint?: string,
    developerId?: string | null
  ) => {
    if (!endpoint) return "";

    if (endpoint === "/investor-tabs") {
      if (!developerId) return "";
      return `/investor-tabs/${developerId}/list`;
    }

    return fetchendpoint || endpoint;
  };
  // const enhancedFields = useMemo(() => {
  //   if (!fields) return [];

  //   return injectOptions(fields, dropdownOptions).map((field) => {
  //     if (field.type === "dropdown" && field.options?.length === 1) {
  //       return {
  //         ...field,
  //         defaultValue: field.options[0].value,
  //       };
  //     }

  //     return field;
  //   });
  // }, [fields, dropdownOptions]);
  const enhancedFields = useMemo(() => {
    if (!fields) return [];

    return injectOptions(fields, dropdownOptions).map((field) => {
      if (field.name === "developerId" && developerId) {
        return {
          ...field,
          defaultValue: developerId,
          options: [{ label: "Selected Developer", value: developerId }],
        };
      }

      return field;
    });
  }, [fields, dropdownOptions, developerId]);

  useEffect(() => {
    if (pageSection === "media_press") {
      dispatch(lookupThunks.mediaPressTypes.fetchList());
    }
  }, [pageSection, dispatch]);

  const handleSubmit = async (
    formData: Record<string, any>,
  ): Promise<boolean> => {
    try {
      const finalData: Record<string, any> = {
        ...formData,
        ...(developerId ? { developerId } : {}),
        ...(appendPayload || {}),
      };

      enhancedFields.forEach((field) => {
        if (field.type === "image" && typeof field.name === "string") {
          const key = field.name;
          const val = finalData[key];

          if (val && !(typeof File !== "undefined" && val instanceof File)) {
            delete finalData[key];
          }
        }

        if (
          field.type === "array" &&
          !field.stringArray &&
          typeof field.name === "string" &&
          Array.isArray(finalData[field.name])
        ) {
          const arrayKey = field.name;

          finalData[arrayKey] = finalData[arrayKey].map((item: any) => {
            const cleanedItem = { ...item };

            field.fields?.forEach((subField: any) => {
              if (
                subField.type === "image" &&
                typeof subField.name === "string"
              ) {
                const imgKey = subField.name;
                const imgVal = cleanedItem[imgKey];

                if (
                  imgVal &&
                  !(typeof File !== "undefined" && imgVal instanceof File)
                ) {
                  delete cleanedItem[imgKey];
                }
              }
            });

            return cleanedItem;
          });
        }
      });

      // const fileFieldNames = enhancedFields
      //   .filter((f) => f.type === "image" && typeof f.name === "string")
      //   .map((f) => f.name as string);
      const fileFieldNames = extractFileFieldNames(enhancedFields);
      const payload = buildFormDataFromObject(finalData, fileFieldNames);

      if (editingItem?.id) {
        await dispatch(
          update({
            url: endpoint!,
            id: editingItem.id,
            data: payload,
          }),
        ).unwrap();
      } else {
        await dispatch(
          create({
            url: endpoint!,
            data: payload,
          }),
        ).unwrap();
      }

      setEditingItem(null);
      const refetchUrl = resolveFetchUrl(
        endpoint,
        fetchendpoint,
        developerId,
      );

      if (refetchUrl) {
        dispatch(
          fetchList({
            url: refetchUrl,
            params: {
              page: sectionPagination.page,
              limit: sectionPagination.limit,
            },
          }),
        );
      }
      return true;
    } catch (err) {
      toast.error("Save failed");
      return false;
    }
  };
  const handleEdit = (row: any) => {
    if (!detailsConfig?.fields) {
      setEditingItem(row);
      return;
    }
    console.log("ROW RECEIVED FOR EDIT:", row);

    const mapped: Record<string, any> = { id: row.id };

    detailsConfig.fields.forEach((field) => {
      const key = field.name;

      if (typeof key !== "string") return;
      if (
        field.type === "array" &&
        field.stringArray &&
        Array.isArray(row[key])
      ) {
        mapped[key] = row[key];
        return;
      }
      if (field.type === "array" && Array.isArray(row[key])) {
        mapped[key] = row[key].map((item: any) => {
          const newItem: any = {};

          field.fields?.forEach((subField: any) => {
            const subKey = subField.name;

            if (!subKey) return;

            if (subField.type === "image") {
              const imgValue = item[subKey];
              newItem[subKey] = typeof imgValue === "string" ? imgValue : "";
            } else {
              newItem[subKey] = item[subKey] ?? "";
            }
          });

          return newItem;
        });

        return;
      }
      if (field.type === "date") {
        mapped[key] = formatDateForInput(row[key]);
        return;
      }
      if (field.type === "date" && row[key]) {
        mapped[key] = row[key].split("T")[0];
        return;
      }

      if (row[key] !== undefined) {
        mapped[key] = row[key];
        return;
      }

      if (
        (field.type === "image" ||
          field.type === "file" ||
          field.type === "largeFile") &&
        row.files &&
        row.files[key]
      ) {
        mapped[key] = row.files[key];
        return;
      }

      if (field.type === "array") {
        const apiVal = row[key];

        if (Array.isArray(apiVal)) {
          mapped[key] = apiVal;
        } else if (apiVal && typeof apiVal === "object") {
          mapped[key] = [apiVal];
        }
      }
    });
    console.log("FINAL MAPPED FOR FORM:", mapped);
    setEditingItem(mapped);
  };

  const handleFeatureToggle = async (row: Record<string, any>) => {
    try {
      const formData = new FormData();
      formData.append("feature", row.isFeature ? "0" : "1");

      await dispatch(
        update({
          url: `${endpoint}/${row.id}/feature`,
          id: row.id,
          data: formData,
        }),
      ).unwrap();

      dispatch(
        fetchList({
          url: fetchendpoint || endpoint!,
          params: {
            page: sectionPagination.page,
            limit: sectionPagination.limit,
          },
        }),
      );
    } catch (err) {
      toast.error("Failed to update feature");
    }
  };

  const handleSearch = (term: string) => {
    const baseFetchUrl = fetchendpoint || endpoint!;
    dispatch(
      fetchList({
        url: baseFetchUrl,
        params: {
          search: term || undefined,
        },
      }),
    );
  };

  const handleDelete = async (row: Record<string, any>) => {
    try {
      await dispatch(
        remove({ url: endpoint!, id: row.id }),
      ).unwrap();

      const url = resolveFetchUrl(
        endpoint,
        fetchendpoint,
        developerId,
      );

      if (url) dispatch(fetchList({ url }));
    } catch {
      toast.error("Delete failed");
    }
  };

  const handleIsHomeChange = async (
    id: string | number,
    value: boolean
  ) => {
    try {
      await dispatch(
        updateIsHome({ id, is_home: value })
      ).unwrap();

      toast.success("Updated successfully");
    } catch (err) {
      toast.error("Failed to update");
    }
  };

  const handlePageChange = (page: number) => {
    const url = resolveFetchUrl(
      endpoint,
      fetchendpoint,
      developerId,
    );

    if (!url) return;

    dispatch(
      fetchList({
        url,
        params: { page, limit: sectionPagination.limit },
      }),
    );
  };

  const tableColumns = useMemo<TableColumn[]>(() => {
    if (!table?.columns) return [];

    return table.columns.map((col) => {
      const field = fields?.find((f) => f.name === col.key);
      if (field?.type === "image" && !col.render) {
        return {
          ...col,
          render: (row: Record<string, any>) => {
            const val = row[col.key] || row.files?.[col.key];
            if (!val) return "-";
            return (
              <div className="flex justify-center">
                <Image
                  src={typeof val === "string" ? val : ""}
                  alt={row.alt || "preview"}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-cover rounded shadow-sm border border-gray-700/50"
                />
              </div>
            );
          },
        };
      }


      if (col.key === "dateAt") {
        return {
          ...col,
          render: (row: Record<string, any>) => formatDateForInput(row.dateAt),
        };
      }
      if (col.key === "is_home" && endpoint === "/media-coverage") {
        return {
          ...col,
          render: (row: Record<string, any>) => (
            <select
              value={row.is_home ? "true" : "false"}
              onChange={(e) =>
                handleIsHomeChange(row.id, e.target.value === "true")
              }
              className="border rounded px-5 py-1 text-smfont-bold bg-gray-900"
            >
              <option value="true">True</option>
              <option value="false">False</option>
            </select>
          ),
        };
      }


      return col;
    });
  }, [table, fields]);

  return (
    <section className="p-6 grid grid-cols-12 gap-6">
      {!tableOnly && (
        <div className="col-span-12">
          <DynamicForm
            title={editingItem ? "Edit Item" : "Add Item"}
            fields={enhancedFields as any[]}
            defaultValues={editingItem || undefined}
            onSubmit={handleSubmit}
            loading={loading}
          />
        </div>
      )}

      <div className="col-span-12">
        <Card>
          <CardHeading>Items</CardHeading>
          <TableContainer
            head={tableColumns}
            data={sectionRows}
            pagination={sectionPagination}
            currentPage={sectionPagination.page}
            handlePageChange={handlePageChange}
            onSearch={handleSearch}
            searchPlaceholder="Search list..."
            onEdit={!tableOnly ? handleEdit : undefined}
            onDelete={!tableOnly ? handleDelete : undefined}
            showAction={!tableOnly}
            customActions={
              pageSection === "blogs"
                ? [
                  {
                    label: "Add Faq",
                    render: (item) => (
                      <Link
                        href={`/admin/blogfaq/${item.id}`}
                        className="text-blue-500 underline"
                      >
                        Add Faq
                      </Link>
                    ),
                  },
                ]



                : pageSection === "gallery"
                  ? [
                    {
                      label: "Add Gallery",
                      render: (item) => (
                        <Link
                          href={`/admin/gallery/${item.id}`}
                          className="text-blue-500 underline"
                        >
                          Add Gallery
                        </Link>
                      ),
                    },
                  ]
                  : undefined
            }
          />
        </Card>
      </div>
    </section>
  );
};

export default SectionDetailsPage;
