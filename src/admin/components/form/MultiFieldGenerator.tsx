"use client";

import React, { useState } from "react";
import TextInput from "./TextInput";
import ImageUpload from "./ImageUpload";
import RichTextEditor from "./RichTextEditor";
import { FiTrash2 } from "react-icons/fi";
import { AllowedDynamicField,MultiFieldConfig  } from "@/types/form";

interface MultiFieldGeneratorProps {
  field: MultiFieldConfig;  
  formData: Record<string, any>;
  onChange: (data: Record<string, any>, remove?: boolean) => void;
}

const MultiFieldGenerator: React.FC<MultiFieldGeneratorProps> = ({
  field,
  formData,
  onChange,
}) => {
  const [deletedKeys, setDeletedKeys] = useState<string[]>([]);

  const getNextIndex = (baseName: string): number => {
    const existing = Object.keys(formData)
      .filter((key) => key.startsWith(baseName))
      .map((key) => parseInt(key.replace(baseName, ""), 10))
      .filter((n) => !isNaN(n) && n > 0);

    return existing.length ? Math.max(...existing) + 1 : 1;
  };

  const addField = (type: AllowedDynamicField["type"]) => {
    const config = field?.allowedFields?.find((f) => f.type === type);
    if (!config) return;

    const index = getNextIndex(config.baseName);
    const key = `${config.baseName}${index}`;

    onChange({ [key]: type === "image" ? null : "" });
  };

  const removeField = (key: string) => {
    setDeletedKeys((prev) => [...prev, key]);
    onChange({ [key]: null }, true);
  };

  const renderField = (key: string) => {
    const value = formData[key];
    const config = field?.allowedFields?.find((f) =>
      key.startsWith(f.baseName)
    );

    if (!config) return null;

    const baseProps = {
      name: key,
      label: key,
    };

    return (
      <div className="relative border rounded p-3">
        <button
          type="button"
          onClick={() => removeField(key)}
          className="absolute top-2 right-2 text-red-500"
        >
          <FiTrash2 />
        </button>

        {config.type === "text" && (
          <TextInput
            {...baseProps}
            value={value || ""}
            onChange={(e: any) => onChange({ [key]: e.target.value })}
          />
        )}

        {config.type === "richtext" && (
          <RichTextEditor
            {...baseProps}
            value={value || ""}
            onChange={(html: string) => onChange({ [key]: html })}
          />
        )}

        {config.type === "image" && (
          <ImageUpload
            {...baseProps}
            onChange={(_, file: File) => onChange({ [key]: file })}
          />
        )}
      </div>
    );
  };

  return (
    <div className="col-span-12 border p-4 rounded">
      <h3 className="mb-4 text-[var(--admin-yellow)]">{field.label}</h3>

      <div className="flex gap-3 mb-4">
        <button
          type="button"
          onClick={() => addField("text")}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          + Add Text
        </button>

        <button
          type="button"
          onClick={() => addField("richtext")}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          + Add Richtext
        </button>

        <button
          type="button"
          onClick={() => addField("image")}
          className="bg-gray-700 text-white px-4 py-2 rounded"
        >
          + Add Image
        </button>
      </div>

      <div className="grid grid-cols-12 gap-4">
        {Object.keys(formData)
          .filter(
            (key) =>
              field?.allowedFields?.some((f) => key.startsWith(f.baseName)) &&
              !deletedKeys.includes(key)
          )
          .map((key) => {
            const config = field?.allowedFields?.find((f) =>
              key.startsWith(f.baseName)
            );

            return (
              <div
                key={key}
                className={
                  config?.type === "richtext"
                    ? "col-span-12"
                    : "col-span-12 md:col-span-6"
                }
              >
                {renderField(key)}
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default MultiFieldGenerator;