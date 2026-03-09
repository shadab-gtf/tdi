import React, { ReactNode } from "react";

interface TableHeadingProps {
  children: ReactNode;
}

const TableHeading: React.FC<TableHeadingProps> = ({ children }) => {
  return (
    <th className="text-[14px] text-[var(--admin-primary)] border-b-0 font-roboto tracking-[1px] py-[10px]">
      {children}
    </th>
  );
};

export default TableHeading;
