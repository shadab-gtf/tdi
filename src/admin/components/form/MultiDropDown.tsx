"use client";

import React, { useEffect, useRef, useState } from "react";
import Label from "./Label";


export interface MultiSelectOption {
  value: string | number;
  label: string;
}

export interface MultiValDropdownProps {
  name: string;
  label?: string;
  values?: (string | number)[];
  options?: MultiSelectOption[];
  required?: boolean;
  onChange: (name: string, values: (string | number)[]) => void;
}


const MultiValDropdown: React.FC<MultiValDropdownProps> = ({
  name,
  label,
  values = [],
  onChange,
  required = false,
  options = [],
}) => {
  const [open, setOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const toggleValue = (val: string | number) => {
    const updated = values.includes(val)
      ? values.filter((v) => v !== val)
      : [...values, val];

    onChange(name, updated);
  };

  /* ---------- Outside click ---------- */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handler);
    return () =>
      document.removeEventListener("mousedown", handler);
  }, []);

  const selectedLabels =
    values
      .map((val) => options.find((o) => o.value === val)?.label)
      .filter(Boolean)
      .join(", ") || `Select ${label}`;

  /* ---------- Render ---------- */
  return (
    <div className="relative">
      {label && <Label name={name} label={label} required={required} />}

      <div
        className="w-full h-[50px] px-3 flex items-center border border-[#45464f] rounded bg-transparent text-white cursor-pointer"
        onClick={() => setOpen((prev) => !prev)}
      >
        {selectedLabels}
      </div>

      {open && (
        <div
          ref={dropdownRef}
          className="absolute w-full max-h-[300px] overflow-y-auto border border-[#45464f] rounded bg-white z-50 mt-1"
        >
          {options.map((opt) => (
            <div
              key={opt.value}
              className="px-3 py-2 flex items-center gap-2 cursor-pointer hover:bg-gray-200"
              onClick={() => toggleValue(opt.value)}
            >
              <input
                type="checkbox"
                checked={values.includes(opt.value)}
                readOnly
              />
              <span>{opt.label}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MultiValDropdown;
