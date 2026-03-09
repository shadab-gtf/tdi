"use client";

import React, { useEffect, useRef, useState } from "react";
import Label from "./Label";
import { FaUpload } from "react-icons/fa";

interface MediaUploadProps {
  label?: string;
  name: string;
  value?: string | File | null;
  required?: boolean;
  reset?: number;
  onChange: (name: string, file: File) => void;
}

const MediaUpload: React.FC<MediaUploadProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
  reset,
}) => {
  const [preview, setPreview] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  /* 🔁 RESET HANDLING (MOST IMPORTANT PART) */
  useEffect(() => {
    setPreview("");
    setFileName("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }, [reset]);

  /* 🧠 EXTERNAL VALUE (EDIT MODE) */
  useEffect(() => {
    if (!value) return;

    if (typeof value === "string") {
      setPreview(value);
      setFileName(value.split("/").pop() ?? "");
    }
  }, [value]);

  /* 📁 FILE CHANGE */
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setFileName(file.name);

    if (file.type.startsWith("image")) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPreview(URL.createObjectURL(file));
    }

    onChange(name, file);
  };

  const isVideo = preview && preview.includes("blob:");

  return (
    <div>
      {label && (
        <Label name={name} label={label} required={required} />
      )}

      <label className="flex items-center gap-3 cursor-pointer border border-[#45464f] rounded px-4 py-2">
        <FaUpload />
        <span className="truncate max-w-[200px]">
          {fileName || "Upload Image / Video"}
        </span>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*,video/*"
          hidden
          required={required}
          onChange={handleFileChange}
        />
      </label>

      {preview && (
        <div className="mt-3">
          {isVideo ? (
            <video
              src={preview}
              controls
              className="w-[150px] h-[100px] rounded border"
            />
          ) : (
            <img
              src={preview}
              className="w-[50px] h-[50px] object-cover rounded border"
              alt="preview"
            />
          )}
        </div>
      )}
    </div>
  );
};

export default MediaUpload;
