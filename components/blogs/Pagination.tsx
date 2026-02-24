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
        <nav className="blog-pagination" aria-label="Blog pagination">
            {pages.map((p) => (
                <Link
                    key={p}
                    href={`/blogs?page=${p}`}
                    className={`blog-pagination__btn ${p === currentPage ? "blog-pagination__btn--active" : ""
                        }`}
                    aria-current={p === currentPage ? "page" : undefined}
                >
                    {p}
                </Link>
            ))}

            {currentPage < totalPages && (
                <Link
                    href={`/blogs?page=${currentPage + 1}`}
                    className="blog-pagination__btn blog-pagination__btn--arrow"
                    aria-label="Next page"
                >
                    <MoveRight size={18} strokeWidth={1.5} />
                </Link>
            )}
        </nav>
    );
};

export default Pagination;
