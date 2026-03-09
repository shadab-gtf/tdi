"use client";

import React from "react";
import { ArrowRight } from "lucide-react";

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
    if (totalPages <= 1) return null;

    const getVisiblePages = (): number[] => {
        const pages: number[] = [];
        const maxVisible = 3;

        let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
        const end = Math.min(totalPages, start + maxVisible - 1);

        if (end - start + 1 < maxVisible) {
            start = Math.max(1, end - maxVisible + 1);
        }

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }
        return pages;
    };

    const visiblePages = getVisiblePages();

    return (
        <div className="flex items-center justify-start gap-5 md:gap-2 mt-12 md:mt-16">
            {visiblePages.map((page) => (
                <button
                    key={page}
                    onClick={() => onPageChange(page)}
                    className="w-14 h-14 md:w-[68px] md:h-[68px] flex items-center justify-center rounded-full font-serif text-lg md:text-xl transition-all duration-300 cursor-pointer"
                    style={{
                        backgroundColor: currentPage === page ? "var(--color-accent)" : "transparent",
                        color: currentPage === page ? "#000" : "var(--color-primary)",
                        border: "1.5px solid var(--color-accent)",
                    }}
                >
                    {page}
                </button>
            ))}

            {currentPage < totalPages && (
                <button
                    onClick={() => onPageChange(currentPage + 1)}
                    className="w-14 h-14 md:w-[68px] md:h-[68px] flex items-center justify-center rounded-full font-serif transition-all duration-300 cursor-pointer"
                    style={{
                        backgroundColor: "transparent",
                        color: "var(--color-primary)",
                        border: "1.5px solid var(--color-accent)",
                    }}
                    aria-label="Next page"
                >
                    <ArrowRight size={22} />
                </button>
            )}
        </div>
    );
}
