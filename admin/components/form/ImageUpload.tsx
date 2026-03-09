
"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import Label from "./Label";
import { FaUpload } from "react-icons/fa";
import { BASE_URL } from "../../../../config";


export interface ImageUploadProps {
  label?: string;
  name: string;
  value?: string | File | null;
  required?: boolean;
  reset?: number;
  onChange: (fieldName: string , file: File) => void;
}


const ImageUpload: React.FC<ImageUploadProps> = ({
  name,
  label,
  value,
  onChange,
  required = false,
  reset,
}) => {
  const [preview, setPreview] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /* ---------- Reset handling ---------- */
  useEffect(() => {
    setPreview("");
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [reset]);

  /* ---------- External value ---------- */
  useEffect(() => {
    if (typeof value === "string") {
      setPreview(value);
      setFileName(value.split("/").pop() ?? "");
    }
  }, [value]);

  /* ---------- File change ---------- */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      setFileName(file.name);
      onChange(name, file);
    };
    reader.readAsDataURL(file);
  };

 const previewUrl = useMemo(() => {
  if (!preview) return "";
  if (preview.startsWith("http") || preview.startsWith("blob:")) {
    return preview;
  }
  return `${BASE_URL}${preview.startsWith("/") ? preview : "/" + preview}`;
}, [preview]);

  return (
    <div>
      {label && (
        <Label name={name} label={label} required={required} />
      )}

      <label
        htmlFor={name}
        className="flex items-center gap-3 cursor-pointer w-full h-[50px] px-4 py-2 border border-[#45464f] rounded-[10px] bg-transparent text-[#eee] text-[12px] hover:border-[#666]"
      >
        <FaUpload className="text-[#ccc] text-[13px]" />

        <span className="block text-[15px] text-[var(--admin-primary)] tracking-[0.8px] font-roboto truncate max-w-[200px]">
          {fileName || "Upload File"}
        </span>

        <input
          type="file"
          accept="image/*"
          id={name}
          name={name}
          required={required}
          onChange={handleFileChange}
          ref={fileInputRef}
          className="hidden"
        />
      </label>

      {previewUrl && (
        <div className="mt-2">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-[50px] h-[50px] object-cover border border-gray-500 rounded"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
