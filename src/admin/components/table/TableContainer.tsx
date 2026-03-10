"use client";

import React, { useState, useEffect } from "react";
import { MdEdit, MdDelete } from "react-icons/md";

import CustomTable from "./CustomTable";
import TableHead from "./TableHead";
import TableHeading from "./TableHeading";
import TableBody from "./TableBody";
import TableData from "./TableData";
import TableRow from "./TableRow";
import Pagination from "./Pagination";
import SearchInput from "./SearchInput";


export interface TableColumn<T> {
  key: keyof T & string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

export interface PaginationInfo {
  page: number;
  limit: number;
  totalPages?: number;
}

interface CustomAction<T> {
  label: string;
  render: (row: T) => React.ReactNode;
}

interface TableContainerProps<T extends { id?: string }> {
  head: TableColumn<T>[];
  data: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  customActions?: CustomAction<T>[];
  pagination: PaginationInfo;
  currentPage: number;
  handlePageChange: (page: number) => void;
  showAction?: boolean;
  onSearch?: (term: string) => void;
  searchPlaceholder?: string;
}


const TableContainer = <T extends { id?: string }>({
  head,
  data,
  onEdit,
  onDelete,
  customActions = [],
  pagination,
  currentPage,
  handlePageChange,
  showAction = true,
  onSearch,
  searchPlaceholder = "Search...",
}: TableContainerProps<T>) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [toDeleteItem, setToDeleteItem] = useState<T | null>(null);

  useEffect(() => {
    const isMissing = data.length > 0 && !data.some((d) => d.id === toDeleteItem?.id);
    if (confirmOpen && toDeleteItem && isMissing) {
      setConfirmOpen(false);
      setToDeleteItem(null);
    }
  }, [data, confirmOpen, toDeleteItem]);

  const openConfirm = (item: T) => {
    setToDeleteItem(item);
    setConfirmOpen(true);
  };

  const closeConfirm = () => {
    setConfirmOpen(false);
    setToDeleteItem(null);
  };

  const handleConfirmDelete = () => {
    if (onDelete && toDeleteItem) onDelete(toDeleteItem);
    closeConfirm();
  };

  const truncate = (val: any) =>
    typeof val === "string" && val.length > 40
      ? val.slice(0, 40) + "..."
      : val ?? "-";


  // const isImageUrl = (value: any) =>
  // typeof value === "string" &&
  // (value.startsWith("http") || value.startsWith("/")) &&
  // /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(value);
  const isImageUrl = (value: any) =>
    typeof value === "string" &&
    (value.startsWith("http") || value.startsWith("/")) &&
    /\.(jpg|jpeg|png|webp|gif|svg)(\?|$)/i.test(value);



  const isVideoUrl = (value: any) =>
    typeof value === "string" &&
    (value.startsWith("http") || value.startsWith("/")) &&
    /\.(mp4|webm|ogg)(\?|$)/i.test(value);

  const renderValue = (value: any) => {
    if (isImageUrl(value)) {
      return (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={value}
          alt="preview"
          className="w-16 h-16 object-fill rounded border justify-self-center"
        />
      );
    }

    if (isVideoUrl(value)) {
      return (
        <video
          src={value}
          className="w-16 h-16 rounded border justify-self-center object-fill"
          controls
        />
      );
    }

    return truncate(value);
  };


  return (
    <div>
      {onSearch && (
        <div className="mb-4">
          <SearchInput onSearch={onSearch} placeholder={searchPlaceholder} />
        </div>
      )}

      <CustomTable>
        <TableHead>
          <TableRow>
            <TableHeading>S. No.</TableHeading>
            {head.map((h, i) => (
              <TableHeading key={i}>{h.label}</TableHeading>
            ))}
            {showAction && <TableHeading>Actions</TableHeading>}
            {customActions.length > 0 && (
              <TableHeading>Custom Actions</TableHeading>
            )}
          </TableRow>
        </TableHead>

        <TableBody>
          {data.length === 0 && (
            <TableRow>
              <TableData colSpan={head.length + 2}>
                No records found
              </TableData>
            </TableRow>
          )}

          {data.map((row, rowIndex) => {
            const serial =
              (currentPage - 1) * (pagination.limit || data.length) +
              rowIndex +
              1;

            return (
              <TableRow key={rowIndex}>
                <TableData>{serial}</TableData>

                {/* {head.map((col, idx) => (
                  <TableData key={idx}>
                {col.render
                  ? col.render(row)
                  : renderValue(
                      (row as any)[col.key] ??
                      (row as any)?.files?.[col.key]
                    )}
                  </TableData>
                ))} */}
                {head.map((col, idx) => (
                  <TableData key={idx}>
                    {row
                      ? col.render
                        ? col.render(row)
                        : renderValue(
                          (row as any)?.[col.key] ??
                          (row as any)?.files?.[col.key]
                        )
                      : "-"}
                  </TableData>
                ))}
                {showAction && (
                  <TableData>
                    <div className="flex justify-center gap-3">
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="text-yellow-400 text-[20px]"
                        >
                          <MdEdit />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => openConfirm(row)}
                          className="text-red-500 text-[20px]"
                        >
                          <MdDelete />
                        </button>
                      )}
                    </div>
                  </TableData>
                )}

                {customActions.length > 0 && (
                  <TableData>
                    <div className="flex justify-center gap-3">
                      {customActions.map((a, i) => (
                        <div key={i}>{a.render(row)}</div>
                      ))}
                    </div>
                  </TableData>
                )}
              </TableRow>
            );
          })}
        </TableBody>
      </CustomTable>

      <Pagination
        currentPage={currentPage}
        totalPages={pagination.totalPages || 1}
        onPageChange={handlePageChange}
      />

      {confirmOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div className="absolute inset-0 bg-black/40" onClick={closeConfirm} />
          <div className="relative z-10 max-w-md rounded-lg bg-white p-6">
            <h3 className="mb-2 text-lg font-semibold">Confirm delete</h3>
            <p className="mb-4 text-sm text-gray-700">
              Are you sure you want to delete this item?
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={closeConfirm}
                className="rounded border px-4 py-2"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="rounded bg-red-600 px-4 py-2 text-white"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TableContainer;
