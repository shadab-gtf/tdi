"use client";

import React, { useState, useEffect } from "react";

interface DeleteFileModalProps {
  isOpen: boolean;
  loading?: boolean;
  title?: string;
  onClose: () => void;
  onConfirm: (fileType: string) => void;
}

const DeleteFileModal: React.FC<DeleteFileModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading = false,
  title = "Delete File",
}) => {
  const [fileType, setFileType] = useState("image");

  useEffect(() => {
    if (isOpen) setFileType("image");
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg p-6 w-[400px]">
        <h2 className="text-lg font-semibold mb-4">{title}</h2>

        <p className="mb-4">
          Do you want to delete file for this section?
        </p>

        <select
          value={fileType}
          onChange={(e) => setFileType(e.target.value)}
          className="w-full border rounded px-3 py-2 mb-6"
        >
          <option value="image">Image</option>
          <option value="video">Video</option>
        </select>

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
            disabled={loading}
          >
            Cancel
          </button>

          <button
            onClick={() => onConfirm(fileType)}
            className="px-4 py-2 bg-red-600 text-white rounded"
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFileModal;
