import React, { ReactNode } from "react";

interface TableBodyProps {
  children: ReactNode;
}

const TableBody: React.FC<TableBodyProps> = ({ children }) => {
  return <tbody>{children}</tbody>;
};

export default TableBody;
