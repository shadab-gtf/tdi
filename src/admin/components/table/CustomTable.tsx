import React, { ReactNode } from "react";

interface CustomTableProps {
  children: ReactNode;
}

const CustomTable: React.FC<CustomTableProps> = ({ children }) => {
  return <table className="w-full">{children}</table>;
};

export default CustomTable;
