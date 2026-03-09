import { DynamicField } from "@/types/form";
import { projectSectionsConfig } from "../fields/projectFields";

export const buildFormDataFromObject = (
  obj: Record<string, any>,
  fileFieldNames: string[] = [],
): FormData => {
  const fd = new FormData();

  Object.entries(obj).forEach(([key, value]) => {
    if (value === undefined || value === null) return;
    if (key === "files") return;

    if (typeof File !== "undefined" && value instanceof File) {
      fd.append(key, value);
      return;
    }

    if (fileFieldNames.includes(key) && typeof value === "string") {
      return;
    }

    if (
      Array.isArray(value) &&
      value.length > 0 &&
      typeof value[0] === "object" &&
      !Array.isArray(value[0]) &&
      !(typeof File !== "undefined" && value[0] instanceof File)
    ) {
      value.forEach((item, index) => {
        Object.entries(item).forEach(([subKey, subValue]) => {
          if (subValue === undefined || subValue === null) return;

          if (typeof File !== "undefined" && subValue instanceof File) {
            fd.append(`${key}[${index}][${subKey}]`, subValue);
          } else {
            fd.append(`${key}[${index}][${subKey}]`, String(subValue));
          }
        });
      });
      return;
    }
    if (Array.isArray(value)) {
      value.forEach((v) => fd.append(`${key}[]`, String(v)));
      return;
    }
    if (typeof value === "object") {
      Object.entries(value).forEach(([subKey, subValue]) => {
        if (subValue === undefined || subValue === null) return;

        if (typeof File !== "undefined" && subValue instanceof File) {
          fd.append(`${key}[${subKey}]`, subValue);
        } else {
          fd.append(`${key}[${subKey}]`, String(subValue));
        }
      });
      return;
    }

    fd.append(key, String(value));
  });

  return fd;
};

interface Pagination {
  totalPages: number;
  total: number;
  page: number;
  limit: number;
}

export function normalizeListResponse<T = any>(
  payload: any,
  defaultLimit = 10,
): { rows: T[]; pagination: Pagination } {
  const originalPayload = payload;

  const root =
    payload && typeof payload === "object" && (payload.data ?? payload)
      ? (payload.data ?? payload)
      : payload;

  const rows: T[] = Array.isArray(root)
    ? root
    : Array.isArray(root?.items)
      ? root.items
      : Array.isArray(root?.data)
        ? root.data
        : Array.isArray(root?.rows)
          ? root.rows
          : Array.isArray(root?.results)
            ? root.results
            : [];

  const paginationSource =
    typeof originalPayload === "object" ? originalPayload : {};

  const pagination: Pagination = {
    totalPages:
      paginationSource.pagination?.totalPages ??
      paginationSource.totalPages ??
      paginationSource.total ??
      1,
    total:
      paginationSource.pagination?.total ??
      paginationSource.total ??
      rows.length,
    page:
      paginationSource.pagination?.page ??
      paginationSource.page ??
      paginationSource.current ??
      1,
    limit:
      paginationSource.pagination?.limit ??
      paginationSource.limit ??
      paginationSource.pageSize ??
      defaultLimit,
  };

  return { rows, pagination };
}

export function buildFormData(obj: Record<string, any>): FormData {
  const fd = new FormData();

  if (!obj || typeof obj !== "object") return fd;

  Object.entries(obj).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    // Single file
    if (typeof File !== "undefined" && value instanceof File) {
      fd.append(key, value);
      return;
    }

    // Multiple files
    if (typeof FileList !== "undefined" && value instanceof FileList) {
      Array.from(value).forEach((file) => fd.append(key, file));
      return;
    }

    // Arrays
    if (Array.isArray(value)) {
      value.forEach((v) => {
        if (v !== undefined && v !== null) {
          fd.append(key, String(v));
        }
      });
      return;
    }

    fd.append(key, String(value));
  });

  return fd;
}

const FILE_TYPES = new Set(["image", "file", "largefile", "video", "media"]);

const isAbsoluteUrl = (value: string) =>
  value.startsWith("http://") || value.startsWith("https://");

export const normalizeFilesForEdit = (
  item: Record<string, any>,
  fields: any[],
  baseUrl: string,
): Record<string, any> => {
  if (!item || !item.files || !Array.isArray(fields)) return item;

  const result = { ...item };

  fields.forEach((field) => {
    // handle nested fields
    if (field.fields) {
      Object.assign(result, normalizeFilesForEdit(item, field.fields, baseUrl));
      return;
    }

    if (!FILE_TYPES.has(field.type)) return;

    const name = field.name;
    const fileValue = item.files?.[name];

    if (!fileValue) return;

    // ✅ already full URL (S3 signed URL etc.)
    if (typeof fileValue === "string" && isAbsoluteUrl(fileValue)) {
      result[name] = fileValue;
      return;
    }

    // ✅ relative path → prefix base URL
    result[name] = `${baseUrl}/${fileValue}`;
  });

  return result;
};

export const formatDateForInput = (value?: string | null): string => {
  if (!value) return "";

  try {
    return new Date(value).toISOString().slice(0, 10);
  } catch {
    return "";
  }
};

export const extractFieldNames = (fields: DynamicField[]): string[] => {
  const names: string[] = [];

  const collect = (fieldList: DynamicField[]) => {
    fieldList.forEach((field) => {
      if (field.name) {
        names.push(field.name);
      }

      // handle nested array fields
      if (field.fields) {
        collect(field.fields);
      }
    });
  };

  collect(fields);
  return names;
};

export const extractFileFieldNames = (fields: DynamicField[]): string[] => {
  return fields
    .filter((f) =>
      ["image", "file", "largefile", "media", "video"].includes(
        String(f.type).toLowerCase(),
      ),
    )
    .map((f) => f.name)
    .filter((name): name is string => Boolean(name));
};

export const getSectionFields = (type?: string) => {
  if (!type) return projectSectionsConfig.defaultFields;

  return (
    projectSectionsConfig[type as keyof typeof projectSectionsConfig] ||
    projectSectionsConfig.defaultFields
  );
};
