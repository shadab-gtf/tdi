"use client";

import React, { useEffect, useState } from "react";
import Label from "./Label";
import { FaUpload } from "react-icons/fa";

interface VideoUploadProps {
  label?: string;
  name: string;
  value?: string;
  required?: boolean;
  reset?: number;
  onChange: (name: string, file: File) => void;
}

const VideoUpload: React.FC<VideoUploadProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
  reset,
}) => {
  const [preview, setPreview] = useState<string>("");
  const [fileName, setFileName] = useState<string>("");

  useEffect(() => {
    setPreview("");
    setFileName("");
  }, [reset]);

  useEffect(() => {
    if (value) setPreview(value);
  }, [value]);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setPreview(URL.createObjectURL(file));
    setFileName(file.name);
    onChange(name, file);
  };

  return (
    <div>
      {label && (
        <Label name={name} label={label} required={required} />
      )}

      <label className="flex items-center gap-3 cursor-pointer border border-[#45464f] rounded px-4 py-2">
        <FaUpload className="text-[#ccc]" />
        <span className="truncate max-w-[200px]">
          {fileName || preview || "Upload Video"}
        </span>
        <input
          type="file"
          accept="video/*"
          hidden
          onChange={handleFileChange}
        />
      </label>

      {preview && (
        <video
          src={preview}
          controls
          className="mt-3 w-[150px] h-[100px] rounded border"
        />
      )}
    </div>
  );
};

export default VideoUpload;
