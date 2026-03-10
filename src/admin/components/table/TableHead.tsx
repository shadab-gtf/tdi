import React, { ReactNode } from "react";

interface TableHeadProps {
  children: ReactNode;
}

const TableHead: React.FC<TableHeadProps> = ({ children }) => {
  return <thead>{children}</thead>;
};

export default TableHead;
