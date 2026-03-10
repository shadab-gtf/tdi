import React, { ReactNode } from "react";

interface TableDataProps {
  children: ReactNode;
  className?: string;
  colSpan?: number;
}

const TableData: React.FC<TableDataProps> = ({
  children,
  className = "",
  colSpan,
}) => {
  return (
    <td
      colSpan={colSpan}
      className={`text-[#eee] font-robotoLight tracking-[1px] p-[10px] text-[14px] text-center ${className}`}
    >
      {children}
    </td>
  );
};

export default TableData;
