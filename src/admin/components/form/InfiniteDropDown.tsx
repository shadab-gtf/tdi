"use client";

import React, { useEffect, useRef, useState } from "react";
import Label from "./Label";
import { BASE_ADMIN } from "config";
import { useApi } from "@/admin/hooks/useApi";

export interface DropdownOption {
  value: string | number;
  label: string;
}

interface ApiListResponse<T = any> {
  data?: {
    data?: T[];
  };
}

export interface InfiniteDropdownProps {
  name: string;
  label?: string;
  value?: string | number;
  required?: boolean;
  defaultOptions?: any[];
  pageSize?: number;
  end_point?: string;
  onChange: (name: string, value: string | number) => void;
}

/* ----------------------------------
 Component
-----------------------------------*/

const InfiniteDropdown: React.FC<InfiniteDropdownProps> = ({
  name,
  label,
  value,
  onChange,
  required = false,
  defaultOptions = [],
  pageSize = 10,
  end_point,
}) => {
  const api = useApi(BASE_ADMIN);

  const [options, setOptions] = useState<DropdownOption[]>([]);
  const [page, setPage] = useState<number>(2);
  const [hasMore, setHasMore] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [hasReachedMinSearch, setHasReachedMinSearch] = useState<boolean>(false);

  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const searchTimeout = useRef<NodeJS.Timeout | null>(null);

  /* ---------- Normalize ---------- */
  const normalizeOptions = (arr: any[]): DropdownOption[] =>
    Array.isArray(arr)
      ? arr.map((item) => ({
          value: item.value ?? item.id,
          label: item.label ?? item.name ?? item.title ,
        }))
      : [];

  /* ---------- Default options ---------- */
  // useEffect(() => {
  //   setOptions(normalizeOptions(defaultOptions));
  // }, [defaultOptions]);

  useEffect(() => {
  const normalized = normalizeOptions(defaultOptions);
  setOptions(normalized);

  if (normalized.length > 0) {
    setPage(2);        // ✅ next fetch should be page 2
    setHasMore(true);  // reset hasMore
  }
}, [defaultOptions]);
  /* ---------- Load more ---------- */
  const loadMore = async (reset = false) => {
    if (!hasMore || loading) return;
    if (!reset && !hasMore) return;
    setLoading(true);
    try {
      const currentPage = reset ? 1 : page;

    const res = (await api.get(
  `${end_point}?page=${currentPage}&limit=${pageSize}${
    searchTerm.length >= 3 ? `&search=${searchTerm}` : ""
  }`
)) as ApiListResponse;

      const raw = Array.isArray(res) ? res : res?.data?.data ?? [];
     

      if (!raw.length) {
        setHasMore(false);
        if (reset) setOptions([]);
        return;
      }

      const normalized = normalizeOptions(raw);
      setOptions((prev) => (reset ? normalized : [...prev, ...normalized]));
      setPage(currentPage + 1);

      if (raw.length < pageSize) setHasMore(false);
    } catch (err) {
      console.error("Error loading dropdown options", err);
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  };

  /* ---------- Scroll ---------- */
  const handleScroll = () => {
    const el = dropdownRef.current;
    if (!el) return;

    if (el.scrollTop + el.clientHeight >= el.scrollHeight - 5) {
      loadMore();
    }
  };

  /* ---------- Search debounce ---------- */
  useEffect(() => {
    if (searchTimeout.current) clearTimeout(searchTimeout.current);

    searchTimeout.current = setTimeout(() => {
      const length = searchTerm.length;

      // if (!length) {
      //   setOptions(normalizeOptions(defaultOptions));
      //   setPage(1);
      //   setHasMore(true);
      //   setHasReachedMinSearch(false);
      //   return;
      // }
      if (!length) {
  const normalized = normalizeOptions(defaultOptions);
  setOptions(normalized);

  setPage(2);          // ✅ start from page 2
  setHasMore(true);
  setHasReachedMinSearch(false);
  return;
}

      if (length >= 3 || hasReachedMinSearch) {
        setPage(1);
        setHasMore(true);
        loadMore(true);
        if (!hasReachedMinSearch && length >= 3) {
          setHasReachedMinSearch(true);
        }
      }
    }, 300);

    return () => {
      if (searchTimeout.current) clearTimeout(searchTimeout.current);
    };
  }, [searchTerm, defaultOptions]);

  /* ---------- Outside click ---------- */
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  /* ---------- Render ---------- */
  return (
    <div className="relative">
      {label && <Label name={name} label={label} required={required} />}

      <div
        className="w-full cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        <div className="w-full h-[50px] flex items-center px-3 border border-[#45464f] rounded bg-transparent text-white">
          {value
            ? options.find((o) => o.value === value)?.label
            : `Select ${label}`}
        </div>
      </div>

      {open && (
        <div
          ref={dropdownRef}
          onScroll={handleScroll}
          className="absolute w-full max-h-[300px] overflow-y-auto border border-[#45464f] rounded bg-white z-50 mt-1"
        >
          <div className="p-2 border-b">
            <input
              type="text"
              placeholder={`Search ${label}`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-3 py-2 border rounded focus:outline-none"
            />
          </div>

          {options.map((opt, idx) => (
            <div
              key={`${opt.value}-${idx}`}
              className={`px-3 py-2 cursor-pointer hover:bg-gray-200 ${
                value === opt.value ? "bg-gray-300" : ""
              }`}
              onClick={() => {
                onChange(name, opt.value);
                setOpen(false);
              }}
            >
              {opt.label}
            </div>
          ))}

          {loading && (
            <div className="px-3 py-2 text-gray-500">Loading...</div>
          )}

          {!hasMore && options.length > 0 && (
            <div className="px-3 py-2 text-gray-500">
              No more options
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default InfiniteDropdown;
