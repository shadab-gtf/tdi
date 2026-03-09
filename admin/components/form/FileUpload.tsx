"use client";

import React, { useEffect, useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";


export interface FileUploadProps {
  name: string;
  label?: string;
  value?: string | File | null;
  required?: boolean;
  reset?: number;
  accept?: string;
  onChange: (fieldName: string, file: File) => void;
}


const FileUpload: React.FC<FileUploadProps> = ({
  name,
  label,
  value,
  onChange,
  required = false,
  reset,
  accept = ".pdf,.doc,.docx,.txt",
}) => {
  const [fileName, setFileName] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /* ---------- Sync external value ---------- */
  useEffect(() => {
    if (typeof value === "string") {
      setFileName(value.split("/").pop() ?? "");
    } else if (value instanceof File) {
      setFileName(value.name);
    } else {
      setFileName("");
    }

    if (reset && fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [value, reset]);

  /* ---------- File change ---------- */
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);
    onChange(name, file);
  };

  /* ---------- Render ---------- */
  return (
    <div>
      {label && (
        <label className="block mb-1 text-sm font-medium text-[var(--admin-primary)]">
          {label}
        </label>
      )}

      <label
        htmlFor={name}
        className="flex items-center gap-3 cursor-pointer w-full h-[50px] px-4 py-2 border border-[#45464f] rounded-[10px] bg-transparent text-[#eee] text-[12px] hover:border-[#666]"
      >
        <FaUpload className="text-[#ccc] text-[13px]" />

        <span className="block text-[15px] text-gray-300 tracking-[0.8px] font-roboto truncate max-w-[200px]">
          {fileName || "Upload File"}
        </span>

        <input
          type="file"
          id={name}
          name={name}
          required={required}
          ref={fileInputRef}
          onChange={handleFileChange}
          accept={accept}
          className="hidden"
        />
      </label>
    </div>
  );
};

export default FileUpload;
