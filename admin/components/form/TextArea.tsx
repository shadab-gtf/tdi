import React from "react";
import Label from "./Label";

interface TextAreaProps {
  label?: string;
  name: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  required?: boolean;
  rows?: number;
}

const TextArea: React.FC<TextAreaProps> = ({
  label,
  name,
  value,
  onChange,
  required = false,
  rows = 10,
}) => {
  return (
    <div>
      {label && (
        <Label name={name} label={label} required={required} />
      )}
      <textarea
        id={name}
        name={name}
        value={value}
        rows={rows}
        required={required}
        onChange={onChange}
        className="w-full text-[12px] px-3 py-2 border border-[#45464f] rounded-[10px] bg-transparent text-[#eee]"
      />
    </div>
  );
};

export default TextArea;
