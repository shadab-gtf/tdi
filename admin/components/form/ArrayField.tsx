"use client";

import React from "react";
import Label from "./Label";
import ImageUpload from "./ImageUpload";
import FileUpload from "./FileUpload";
import { ArrayFieldConfig, FormDataState } from "@/types/form";
import RichTextEditor from "./RichTextEditor";

interface ArrayFieldProps {
  field: ArrayFieldConfig;
  value?: any;
  setFormData: React.Dispatch<React.SetStateAction<FormDataState>>;
}

const ArrayField: React.FC<ArrayFieldProps> = ({
  field,
  value,
  setFormData,
}) => {
  const isMultiple = field.multiple !== false;
  const isInvestorCard = field.investor_card === true;
  const isStringArray = field.stringArray === true;

  // Helper function to safely update form data
  const updateFormData = (fieldName: string | undefined, newValue: any) => {
    if (!fieldName) return; // Don't update if field name is undefined
    
    setFormData((prev) => ({
      ...prev,
      [fieldName]: newValue,
    }));
  };

  if (isStringArray) {
    const items: string[] = Array.isArray(value) ? value : [];

    const handleChange = (index: number, val: string) => {
      const updated = [...items];
      updated[index] = val;
      updateFormData(field.name, updated);
    };

    const handleAdd = () => {
      updateFormData(field.name, [...items, ""]);
    };

    const handleRemove = (index: number) => {
      const updated = [...items];
      updated.splice(index, 1);
      updateFormData(field.name, updated);
    };

    return (
      <div>
        <label className="block text-[15px] text-[var(--admin-primary)] mb-[5px]">
          {field.label}
        </label>

        <div className="space-y-3">
          {items.map((item, i) => (
            <div key={i} className="flex gap-2">

              <input
                className="w-full h-[50px] text-[12px] px-3 py-2 border border-[#45464f] rounded-[10px] bg-transparent text-[#eee]"
                placeholder={`${field.label} ${i + 1}`}
                value={item}
                onChange={(e) => handleChange(i, e.target.value)}
              />

              <button
                type="button"
                className="text-red-500 text-sm"
                onClick={() => handleRemove(i)}
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          className="bg-blue-500 text-white px-3 py-1 rounded mt-4"
          onClick={handleAdd}
        >
          Add {field.label}
        </button>
      </div>
    );
  }

  let itemsToRender: Record<string, any>[];

  if (isMultiple) {
    itemsToRender = Array.isArray(value) ? value : [];
  } else {
    if (Array.isArray(value)) {
      itemsToRender = value.length > 0 ? value : [{}];
    } else if (typeof value === "object" && value !== null) {
      itemsToRender = [value];
    } else {
      itemsToRender = [{}];
    }
  }

  const handleChange = (
    index: number,
    subName: string,
    subValue: any,
  ) => {
    const updated = [...itemsToRender];
    updated[index] = { ...updated[index], [subName]: subValue };

    updateFormData(field.name, isMultiple ? updated : updated[0]);
  };

  const handleAdd = () => {
    if (isMultiple) {
      updateFormData(field.name, [...(value || []), {}]);
    } else {
      updateFormData(field.name, {});
    }
  };

  const handleRemove = (index: number) => {
    if (isMultiple) {
      const updated = [...itemsToRender];
      updated.splice(index, 1);
      updateFormData(field.name, updated);
    } else {
      updateFormData(field.name, {});
    }
  };

  /* ================= RENDER ================= */

  return (
    <>
      {isInvestorCard && !isMultiple ? (
        <div className="grid grid-cols-12 gap-x-[20px] gap-y-[30px]">
          {itemsToRender.map((item, i) =>
            field.fields.map((subField, j) => (
              <div key={`${i}-${j}`} className="md:col-span-6">
                <Label
                  name={String(item[subField.name] ?? "")}
                  label={subField.label}
                />

                {subField.type === "image" ? (
                  <ImageUpload
                    name={`${field.name}[${i}].${subField.name}`}
                    label={subField.label}
                    value={item[subField.name] || ""}
                    onChange={(_, file) =>
                      handleChange(i, subField.name, file)
                    }
                  />
                ) : subField.type === "file" ? (
                  <FileUpload
                    name={`${field.name}[${i}].${subField.name}`}
                    value={item[subField.name]}
                    onChange={(_, file) =>
                      handleChange(i, subField.name, file)
                    }
                  />
                ): subField.type === "richtext" ? (
                    <RichTextEditor
                      name={`${field.name}[${i}].${subField.name}`}
                      label={subField.label}
                      value={item[subField.name] ?? ""}
                      onChange={(html) =>
                        handleChange(i, subField.name, html)
                      }
                    />
                  ) : subField.type === "textarea" ? (
                    <textarea
                      className="w-full min-h-[100px] text-[12px] px-3 py-2 border border-[#45464f] rounded bg-transparent text-[#eee]"
                      placeholder={subField.label}
                      value={String(item[subField.name] ?? "")}
                      rows={3}
                      onChange={(e) =>
                        handleChange(i, subField.name, e.target.value)
                      }
                    />
                  ): (
                  <>
                  <input
                    className="w-full h-[50px] block text-[12px] px-3 py-2 border border-[#45464f] rounded-[10px] bg-transparent text-[#eee]"
                    placeholder={subField.label}
                    value={String(item[subField.name] ?? "")}
                    onChange={(e) =>
                      handleChange(i, subField.name, e.target.value)
                    }
                  />
                </>
                )}
              </div>
            ))
          )}
        </div>
      ) : (
        <div>
          {isMultiple && (
            <label className="block text-[15px] text-[var(--admin-primary)] mb-[5px]">
              {field.label}
            </label>
          )}

          <div
            className={`grid ${
              isMultiple ? "grid-cols-2" : "grid-cols-1"
            } gap-4`}
          >
            {itemsToRender.map((item, i) =>
              isMultiple ? (
                <div
                  key={i}
                  className="border border-[#45464f] p-3 rounded"
                >
                  {field.fields.map((subField, j) => (
                    <div key={j} className="mb-2">
                      {subField.type === "image" ? (
                        <ImageUpload
                          name={`${field.name}[${i}].${subField.name}`}
                          label={subField.label}
                          value={item[subField.name] || ""}
                          onChange={(_, file) =>
                            handleChange(i, subField.name, file)
                          }
                        />
                      ) : subField.type === "file" ? (
                        <FileUpload
                          name={`${field.name}[${i}].${subField.name}`}
                          value={item[subField.name]}
                          onChange={(_, file) =>
                            handleChange(i, subField.name, file)
                          }
                        />
                      ) : subField.type === "richtext" ? (
                        <RichTextEditor
                          name={`${field.name}[${i}].${subField.name}`}
                          label={subField.label}
                          value={item[subField.name] ?? ""}
                          onChange={(html) =>
                            handleChange(i, subField.name, html)
                          }
                        />
                      ) : subField.type === "textarea" ? (
                          <textarea
                            className="w-full min-h-[100px] text-[12px] px-3 py-2 border border-[#45464f] rounded-[10px] bg-transparent text-[#eee]"
                            placeholder={subField.label}
                            value={String(item[subField.name] ?? "")}
                            rows={3}
                            onChange={(e) =>
                              handleChange(i, subField.name, e.target.value)
                            }
                          />
                        ) : (
                        <input
                          className="w-full h-[50px] text-[12px] px-3 py-2 border border-[#45464f] rounded bg-transparent text-[#eee]"
                          placeholder={subField.label}
                          value={String(item[subField.name] ?? "")}
                          onChange={(e) =>
                            handleChange(i, subField.name, e.target.value)
                          }
                        />
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    className="text-sm text-red-500 mt-2"
                    onClick={() => handleRemove(i)}
                  >
                    Remove {i + 1}
                  </button>
                </div>
              ) : (
                field.fields.map((subField, j) => (
                  <div key={`${i}-${j}`}>
                    {subField.type === "image" ? (
                      <ImageUpload
                        name={`${field.name}[${i}].${subField.name}`}
                        label={subField.label}
                        value={item[subField.name] || ""}
                        onChange={(_, file) =>
                          handleChange(i, subField.name, file)
                        }
                      />
                    ) : subField.type === "file" ? (
                      <FileUpload
                        name={`${field.name}[${i}].${subField.name}`}
                        value={item[subField.name]}
                        onChange={(_, file) =>
                          handleChange(i, subField.name, file)
                        }
                      />
                    ): subField.type === "richtext" ? (
                        <RichTextEditor
                          name={`${field.name}[${i}].${subField.name}`}
                          label={subField.label}
                          value={item[subField.name] ?? ""}
                          onChange={(html) =>
                            handleChange(i, subField.name, html)
                          }
                        />
                      )  :subField.type === "textarea" ? (
                      <>
                        <Label
                          name={String(item[subField.name] ?? "")}
                          label={subField.label}
                        />
                        <textarea
                          className="w-full min-h-[100px] text-[12px] px-3 py-2 border border-[#45464f] rounded bg-transparent text-[#eee]"
                          placeholder={subField.label}
                          value={String(item[subField.name] ?? "")}
                          rows={3}
                          onChange={(e) =>
                            handleChange(i, subField.name, e.target.value)
                          }
                        />
                        </>
                      ): (
                      <>
                   <Label
                  name={String(item[subField.name] ?? "")}
                  label={subField.label}
                />
                      <input
                        className="w-full h-[50px] text-[12px] px-3 py-2 border border-[#45464f] rounded bg-transparent text-[#eee]"
                        placeholder={subField.label}
                        value={String(item[subField.name] ?? "")}
                        onChange={(e) =>
                          handleChange(i, subField.name, e.target.value)
                        }
                      />
                      </>
                    )}
                  </div>
                ))
              )
            )}
          </div>

          {isMultiple && (
            <button
              type="button"
              className="bg-blue-500 text-white px-3 py-1 rounded mt-4"
              onClick={handleAdd}
            >
              Add {field.label}
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default ArrayField;