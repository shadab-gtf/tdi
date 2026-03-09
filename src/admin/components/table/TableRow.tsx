import React, { ReactNode } from "react";

interface TableRowProps {
  children: ReactNode;
}

const TableRow: React.FC<TableRowProps> = ({ children }) => {
  return <tr>{children}</tr>;
};

export default TableRow;
