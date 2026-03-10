"use client";

import React, { useRef, useState } from "react";
import { toast } from "react-toastify";


const CHUNK_SIZE = 10 * 1024 * 1024; 

interface UploadPart {
  ETag: string;
  PartNumber: number;
}

export interface LargeFileUploaderModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUploadSuccess: (url: string) => void;
}

const LargeFileUploaderModal: React.FC<LargeFileUploaderModalProps> = ({
  isOpen,
  onClose,
  onUploadSuccess,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [uploading, setUploading] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [status, setStatus] = useState<string>("");

  if (!isOpen) return null;

  const handleUpload = async (): Promise<void> => {
    const file = fileInputRef.current?.files?.[0];
    if (!file) {
      toast.warning("Please select a video file.");
      return;
    }

    try {
      setUploading(true);
      setProgress(0);
      setStatus("Starting upload...");

      const startRes = await fetch(
        "https://api.anantrajlimited.com/api/v1/website/start-upload",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            fileName: file.name,
            fileType: file.type,
          }),
        },
      );

      const startData: { uploadId: string; key: string } =
        await startRes.json();

      const { uploadId, key } = startData;

      const parts: UploadPart[] = [];
      let uploadedBytes = 0;
      let partNumber = 1;

      for (let start = 0; start < file.size; start += CHUNK_SIZE) {
        const chunk = file.slice(start, start + CHUNK_SIZE);
        setStatus(`Uploading chunk ${partNumber}...`);

        const res = await fetch(
          `https://api.anantrajlimited.com/api/v1/website/upload-part?uploadId=${uploadId}&partNumber=${partNumber}&key=${encodeURIComponent(
            key,
          )}`,
          {
            method: "PUT",
            body: chunk,
          },
        );

        const { ETag }: { ETag: string } = await res.json();
        parts.push({ ETag, PartNumber: partNumber });

        uploadedBytes += chunk.size;
        const percent = Math.round(
          (uploadedBytes / file.size) * 100,
        );
        setProgress(percent);
        setStatus(`${percent}% uploaded`);
        partNumber++;
      }

      setStatus("Finalizing upload...");
      const completeRes = await fetch(
        "https://api.anantrajlimited.com/api/v1/website/complete-upload",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ uploadId, key, parts }),
        },
      );

      const data: { location: string } = await completeRes.json();

      toast.success("Upload complete!");
      onUploadSuccess(data.location);
      onClose();
    } catch (error) {
      console.error("Upload failed:", error);
      toast.error("Upload failed. Please try again.");
      setStatus("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="bg-white w-[420px] rounded-lg shadow-lg p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Upload Large Video
        </h2>

        <input
          ref={fileInputRef}
          type="file"
          accept="video/*"
          className="w-full mb-4 border border-gray-300 rounded-md px-3 py-2 text-sm"
        />

        {uploading && (
          <div className="mb-4">
            <div className="w-full bg-gray-200 rounded h-2 relative">
              <div
                className="bg-[var(--admin-secondary)] h-2 rounded transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">{status}</p>
          </div>
        )}

        <div className="flex justify-end gap-3 mt-4">
          <button
            onClick={handleUpload}
            disabled={uploading}
            className="px-4 py-2 rounded bg-[#3fb9e9] text-white hover:bg-[#53a4ac]/90"
          >
            {uploading ? "Uploading..." : "Upload"}
          </button>

          <button
            onClick={onClose}
            disabled={uploading}
            className="px-4 py-2 rounded bg-gray-300 text-gray-700 hover:bg-gray-400"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default LargeFileUploaderModal;
