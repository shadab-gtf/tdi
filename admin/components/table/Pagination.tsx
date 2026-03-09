import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages?: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages = 1,
  onPageChange,
}) => {
  const handlePrev = () => {
    if (currentPage > 1) onPageChange(currentPage - 1);
  };

  const handleNext = () => {
    if (currentPage < totalPages) onPageChange(currentPage + 1);
  };

  return (
    <ul className="flex justify-end items-center mt-[20px]">
      <li
        className={`text-[14px] text-white border border-[#45464f] border-r-0 rounded-tl-[4px] rounded-bl-[4px] px-[10px] py-[5px] cursor-pointer ${
          currentPage === 1 ? "opacity-50 pointer-events-none" : ""
        }`}
        onClick={handlePrev}
      >
        Prev
      </li>

      <li className="text-[14px] border border-[#45464f] text-white px-[10px] py-[5px]">
        Page {totalPages > 0 ? currentPage : 0} of {totalPages}
      </li>

      <li
        className={`text-[14px] text-white border border-[#45464f] border-l-0 rounded-tr-[4px] rounded-br-[4px] px-[10px] py-[5px] cursor-pointer ${
          currentPage === totalPages || totalPages === 0
            ? "opacity-50 pointer-events-none"
            : ""
        }`}
        onClick={handleNext}
      >
        Next
      </li>
    </ul>
  );
};

export default Pagination;
