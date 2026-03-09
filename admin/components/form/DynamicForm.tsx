"use client";

import React, { useState, useEffect, FormEvent } from "react";
import CardHeading from "../card/CardHeading";
import Card from "../card/Card";
import TextInput from "./TextInput";
import LargeFileUploadField from "./LargeFileUploader";
import InfiniteDropdown from "./InfiniteDropDown";
import TextDropdown from "./TextDropdown";
import ImageUpload from "./ImageUpload";
import TextArea from "./TextArea";
import MultiValDropdown from "./MultiDropDown";
import MultiFieldGenerator from "./MultiFieldGenerator";
import RichTextEditor from "./RichTextEditor";
import FileUpload from "./FileUpload";
import VideoUpload from "./VideoUpload";
import ArrayField from "./ArrayField";
import {
  DynamicFormProps,
  FieldConfig,
  AllowedDynamicField,
  MultiFieldConfig,
  ArrayFieldConfig,
  LabelFieldConfig,
} from "@/types/form";
import MediaUpload from "./MediaUpload";
import { resolveFileUploads } from "@/admin/utils/chunkuploads";

// Type guard functions
const isMultiFieldConfig = (field: FieldConfig): field is MultiFieldConfig => {
  return field.type === "multi-field";
};

const isArrayFieldConfig = (field: FieldConfig): field is ArrayFieldConfig => {
  return field.type === "array";
};

const normalizeDynamicFields = (
  formData: Record<string, any>,
  allowedFields: AllowedDynamicField[],
) => {
  const cleaned: Record<string, any> = {};
  const counters: Record<string, number> = {};

  Object.entries(formData).forEach(([key, value]) => {
    if (value === undefined || value === null || value === "") return;

    const config = allowedFields.find((f) => key.startsWith(f.baseName));
    if (!config) {
      cleaned[key] = value;
      return;
    }

    counters[config.baseName] = (counters[config.baseName] || 0) + 1;
    const newKey = `${config.baseName}${counters[config.baseName]}`;

    cleaned[newKey] = value;
  });

  return cleaned;
};

const DynamicForm: React.FC<DynamicFormProps> = ({
  title,
  fields = [],
  defaultValues = {},
  onSubmit,
  onFieldChange,
  col = 12,
  loading = false,
  className,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [resetCounter, setResetCounter] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  useEffect(() => {
    if (!defaultValues || Object.keys(defaultValues).length === 0) return;
    setFormData(defaultValues);
  }, [defaultValues]);

  const handleChange = (name: string, value: any) => {
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (typeof onFieldChange === "function") {
      Promise.resolve().then(() => {
        try {
          onFieldChange(name, value);
        } catch {}
      });
    }
  };

  const resetForm = () => {
    setFormData({});
    setResetCounter((prev) => prev + 1);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const isEmpty = (val: any) => {
      if (val === undefined || val === null) return true;
      if (typeof val === "string") return val.trim() === "";
      if (Array.isArray(val)) return val.length === 0;
      if (typeof File !== "undefined") {
        if (val instanceof File) return false;
        if (typeof FileList !== "undefined" && val instanceof FileList) {
          return val.length === 0;
        }
      }
      return false;
    };

    const missing = fields
      .filter((f) => f.required)
      .map((f) => ({ name: f.name, label: f.label || f.name }))
      .filter(({ name }) => name && isEmpty(formData[name]));

    if (missing.length) {
      alert(
        `${missing.map((m) => m.label).join(", ")} ${
          missing.length === 1 ? "is" : "are"
        } required`,
      );
      return;
    }

    let finalData = { ...formData };

    fields.forEach((field) => {
      if (field.type !== "multi-field") return;

      const multiField = field as MultiFieldConfig;
      if (!multiField.allowedFields) return;

      // Fixed: Explicitly type the parameter
      multiField.allowedFields.forEach((fieldItem: AllowedDynamicField) => {
        Object.keys(finalData).forEach((key) => {
          if (key.startsWith(fieldItem.baseName)) delete finalData[key];
        });
      });

      const normalized = normalizeDynamicFields(
        formData,
        multiField.allowedFields,
      );
      finalData = { ...finalData, ...normalized };
    });

    setIsSubmitting(true);
    try {
       const hasChunkField = fields.some((f) => f.isChunk);

    if (hasChunkField) {
      finalData = await resolveFileUploads(finalData, fields);
    }

      const success = await onSubmit(finalData);
      if (success === true) resetForm();
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: FieldConfig) => {
    const name = field.name ?? "";
    const value = formData[name] ?? "";

    // Now all fields have these optional properties
    const commonProps = {
      name,
      label: field.label ?? "",
      value,
      required: field.required ?? false,
      col: field.col ?? "md:col-span-6",
      rows: field.rows ?? 3,
    };

    switch (field.type) {
      case "text":
      case "hidden":
      case "number":
      case "date":
        return (
          <TextInput
            {...commonProps}
            type={field.type}
            onChange={(e: any) => handleChange(name, e.target.value)}
          />
        );

      case "textarea":
        return (
          <TextArea
            {...commonProps}
            onChange={(e: any) => handleChange(name, e.target.value)}
          />
        );

      case "richtext":
        return (
          <RichTextEditor
            {...commonProps}
            onChange={(val: any) => handleChange(name, val)}
          />
        );

      case "file":
        return (
          <FileUpload
            {...commonProps}
            reset={resetCounter}
            onChange={(fieldName: string, file: File) =>
              handleChange(fieldName, file)
            }
          />
        );

      case "image":
        return (
          <ImageUpload
            {...commonProps}
            reset={resetCounter}
            onChange={(fieldName: string, file: File) =>
              handleChange(fieldName, file)
            }
          />
        );

      case "largeFile":
        return (
          <LargeFileUploadField
            key={name}
            field={field}
            value={value}
            onChange={(url: string) => handleChange(name, url)}
          />
        );

      case "dropdown":
          const defaultOption = field.options?.find(
            (opt: any) => opt.default === true
          );
          if (!value && defaultOption) {
            handleChange(name, defaultOption.value);
          }

        if (field.fetchOptions) {
          return (
            <InfiniteDropdown
              {...commonProps}
              defaultOptions={field.fetchOptions}
              onChange={(fieldName: string, val: any) =>
                handleChange(fieldName, val)
              }
              pageSize={field.limit}
              end_point={field.end_point}
            />
          );
        }
        return (
          <TextDropdown
            {...commonProps}
            options={field.options || []}
            onChange={(fieldName: string, val: any) =>
              handleChange(fieldName, val)
            }
          />
        );

      case "multival-dropdown":
        return (
          <MultiValDropdown
            {...commonProps}
            values={value || []}
            options={field.options || []}
            onChange={(fieldName: string, vals: any[]) =>
              handleChange(fieldName, vals)
            }
          />
        );

      case "multi-field":
        const multiField = field as MultiFieldConfig;
        return (
          <MultiFieldGenerator
            field={multiField}
            formData={formData}
            onChange={(updated: Record<string, any>) =>
              setFormData((prev) => ({ ...prev, ...updated }))
            }
          />
        );

      case "array":
        const arrayField = field as ArrayFieldConfig;
        return (
          <ArrayField
            field={arrayField}
            value={value}
            setFormData={setFormData}
          />
        );

      case "video":
        return (
          <VideoUpload
            {...commonProps}
            reset={resetCounter}
            onChange={(fieldName: string, file: File) =>
              handleChange(fieldName, file)
            }
          />
        );
      case "media":
        return (
          <MediaUpload
            {...commonProps}
            reset={resetCounter}
            onChange={(fieldName: string, file: File) =>
              handleChange(fieldName, file)
            }
          />
        );

      case "label":
        const labelField = field as LabelFieldConfig;
        return (
          <div className={`col-span-${col}`}>
            <h3 className="text-[var(--admin-yellow)] my-3">
              {labelField.content || labelField.label || ""}
            </h3>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Card className={className}>
      <CardHeading>{title}</CardHeading>

      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-12 gap-x-[20px] gap-y-[30px]">
          {fields
            .filter((f) => !f.showIf || f.showIf(formData))
            .map((field, idx) => (
              <div
                key={idx}
                className={`col-span-12 ${field.col || "md:col-span-6"}`}
              >
                {renderField(field)}
              </div>
            ))}
        </div>

        <div className="text-end mt-[20px]">
          <button
            type="submit"
            disabled={loading || isSubmitting}
            className="bg-[var(--admin-secondary)] border-none rounded-[5px] text-[#eee] mt-0 font-roboto tracking-[0.4px] px-[25px] py-[7px]"
          >
            {loading || isSubmitting ? "Saving..." : "Save"}
          </button>
        </div>
      </form>
    </Card>
  );
};

export default DynamicForm;
