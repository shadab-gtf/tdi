import React from "react";


export interface LabelProps {
  name: string;
  label?: string;
  required?: boolean;
}

const Label: React.FC<LabelProps> = ({ name, label, required }) => {
  return (
    <label
      htmlFor={name}
      className="block text-[15px] text-[var(--admin-primary)] mb-[5px] tracking-[0.8px] font-roboto"
    >
      {label}
      {required && (
        <span className="text-[var(--admin-secondary)]"> *</span>
      )}
    </label>
  );
};

export default Label;
