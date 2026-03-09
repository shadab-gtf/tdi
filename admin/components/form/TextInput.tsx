import React from "react";
import Label from "./Label";

interface TextInputProps {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  type?: string;
}

const TextInput: React.FC<TextInputProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
  type = "text",
}) => {
  return (
    <div>
      {label && (
        <Label name={name} label={label} required={required} />
      )}
      <input
        type={type}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full h-[50px] text-[12px] px-3 py-2 border border-[#45464f] rounded-[10px] bg-transparent text-[#eee]"
      />
    </div>
  );
};

export default TextInput;
