import React from "react";
import Label from "./Label";

interface Option {
  label: string;
  value: string;
}

interface TextDropdownProps {
  name: string;
  label?: string;
  value: string;
  options: Option[];
  required?: boolean;
  onChange: (name: string, value: string) => void;
}

const TextDropdown: React.FC<TextDropdownProps> = ({
  name,
  label,
  value,
  options,
  required,
  onChange,
}) => {
  return (
    <div>
      {label && (
        <Label name={name} label={label} required={required} />
      )}
      <select
        value={value}
        onChange={(e) => onChange(name, e.target.value)}
        className="w-full h-[50px] px-3 border border-[#45464f] rounded bg-transparent text-[#eee]"
      >
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.value} value={opt.value} className="text-black">
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default TextDropdown;
