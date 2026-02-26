"use client";

import React from "react";
import Link from "next/link";
import { MoveRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages }) => {
    if (totalPages <= 1) return null;

    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    return (
        <nav className="flex items-center justify-center gap-3 mt-14" aria-label="Blog pagination">
            {pages.map((p) => (
                <Link
                    key={p}
                    href={`/blogs?page=${p}`}
                    className={`w-11 h-11 rounded-full border-[1.5px] border-[#d9991f] flex items-center justify-center text-[0.95rem] font-medium transition-all duration-300 ${p === currentPage
                            ? "bg-[#d9991f] text-white border-[#d9991f]"
                            : "bg-transparent text-[#1a2b56] hover:bg-[#d9991f] hover:text-white"
                        }`}
                    aria-current={p === currentPage ? "page" : undefined}
                >
                    {p}
                </Link>
            ))}

            {currentPage < totalPages && (
                <Link
                    href={`/blogs?page=${currentPage + 1}`}
                    className="w-11 h-11 rounded-full border-[1.5px] border-[#d9991f] flex items-center justify-center text-[#1a2b56] hover:bg-[#d9991f] hover:text-white transition-all duration-300"
                    aria-label="Next page"
                >
                    <MoveRight size={18} strokeWidth={1.5} />
                </Link>
            )}
        </nav>
    );
};

export default Pagination;

