"use client";

import React, { useState } from "react";
import LargeFileUploaderModal from "./LargeFileUploaderModal";
import { FaUpload } from "react-icons/fa";


export interface LargeFileFieldConfig {
  name?: string;
  label?: string;
}

export interface LargeFileUploadFieldProps {
  field: LargeFileFieldConfig;
  value?: string;
  onChange: (value: string) => void;
}


const LargeFileUploadField: React.FC<LargeFileUploadFieldProps> = ({
  field,
  value,
  onChange,
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const handleUploadSuccess = (url: string) => {
    onChange(url);
    setIsModalOpen(false);
  };

  // Simple video extension check
  const isVideo =
    typeof value === "string" &&
    /\.(mp4|mov|mkv|webm|avi)$/i.test(value);

  return (
    <div>
      <label className="block text-[#53c5cf]">
        {field?.label || "Upload Video"}
      </label>

      {value ? (
        <div className="flex flex-col gap-3 border p-3 rounded-md bg-gray-50">
          {isVideo ? (
            <video
              src={value}
              controls
              className="w-full rounded-md border border-gray-300"
            />
          ) : (
            <a
              href={value}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#f7ab5d] underline break-all"
            >
              {value}
            </a>
          )}

          <div className="flex justify-end items-center gap-2">
            <FaUpload className="text-[#53c5cf]" />
            <button
              type="button"
              onClick={() => setIsModalOpen(true)}
              className="border border-[#45464f] rounded-[10px] text-[#53c5cf] font-roboto tracking-[0.4px] px-[25px] py-[7px] text-[15px]"
            >
              Replace
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsModalOpen(true)}
          className="flex gap-3 items-center border border-[#45464f] w-full mt-[5px] rounded-[10px] font-roboto tracking-[0.4px] px-[14px] py-[13px] text-[15px] hover:border-[#666]"
        >
          <FaUpload className="text-[#ccc]" size={12} />
          <span className="text-[#53c5cf]">Upload Video</span>
        </button>
      )}

      {isModalOpen && (
        <LargeFileUploaderModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          onUploadSuccess={handleUploadSuccess}
        />
      )}
    </div>
  );
};

export default LargeFileUploadField;
