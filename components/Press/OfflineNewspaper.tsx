"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import Pagination from "./Pagination";

// ── Types (API-ready) ──
export interface OfflineNewspaperItem {
    id: number;
    image: string;
    title?: string;
    year: string;
    month: string;
}

// ── Static data ──
const NEWSPAPER_DATA: OfflineNewspaperItem[] = [
    {
        id: 1,
        image: "/assets/media/offline-newspaper-1.png",
        title: "Dainik Jagran Coverage",
        year: "2025",
        month: "June - Sep",
    },
    {
        id: 2,
        image: "/assets/media/offline-newspaper-2.png",
        title: "Hindustan Times Feature",
        year: "2025",
        month: "June - Sep",
    },
    {
        id: 3,
        image: "/assets/media/offline-newspaper-3.png",
        title: "Financial Express Coverage",
        year: "2025",
        month: "June - Sep",
    },
    {
        id: 4,
        image: "/assets/media/offline-newspaper-1.png",
        title: "Rising Realty Hub Article",
        year: "2025",
        month: "June - Sep",
    },
    {
        id: 5,
        image: "/assets/media/offline-newspaper-2.png",
        title: "TDI Infrastructure Investment",
        year: "2025",
        month: "June - Sep",
    },
];

const YEARS = ["2025", "2024", "2023"];
const MONTHS = ["June - Sep", "Jan - May", "Oct - Dec"];

const ITEMS_PER_PAGE = 6;

export default function OfflineNewspaper() {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedYear, setSelectedYear] = useState("2025");
    const [selectedMonth, setSelectedMonth] = useState("June - Sep");
    const [yearOpen, setYearOpen] = useState(false);
    const [monthOpen, setMonthOpen] = useState(false);

    // Filter by selected year and month
    const filteredItems = NEWSPAPER_DATA.filter(
        (item) => item.year === selectedYear && item.month === selectedMonth
    );
    const totalPages = Math.ceil(filteredItems.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = filteredItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className="press-tab-content">
            {/* ── Filter Bar ── */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8 md:mb-10">
                <h3
                    className="font-serif text-base md:text-lg font-medium"
                    style={{ color: "var(--color-primary)" }}
                >
                    Select Filter
                </h3>

                <div className="flex items-center gap-4 md:gap-6">
                    {/* Year Dropdown */}
                    <div className="flex items-center gap-2">
                        <span
                            className="font-serif text-sm md:text-base"
                            style={{ color: "var(--color-paragraph)" }}
                        >
                            Year:
                        </span>
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setYearOpen(!yearOpen);
                                    setMonthOpen(false);
                                }}
                                className="flex items-center gap-1 px-3 py-1.5 border rounded font-serif text-sm md:text-base cursor-pointer transition-colors duration-200 min-w-[80px] justify-between"
                                style={{
                                    borderColor: "#d1d5db",
                                    color: "var(--color-primary)",
                                }}
                            >
                                {selectedYear}
                                <ChevronDown size={14} className={`transition-transform duration-200 ${yearOpen ? "rotate-180" : ""}`} />
                            </button>
                            {yearOpen && (
                                <div
                                    className="absolute top-full left-0 mt-1 w-full bg-white border rounded shadow-lg z-20"
                                    style={{ borderColor: "#d1d5db" }}
                                >
                                    {YEARS.map((year) => (
                                        <button
                                            key={year}
                                            onClick={() => {
                                                setSelectedYear(year);
                                                setYearOpen(false);
                                                setCurrentPage(1);
                                            }}
                                            className="block w-full text-left px-3 py-2 font-serif text-sm hover:bg-gray-50 transition-colors cursor-pointer"
                                            style={{
                                                color: selectedYear === year ? "var(--color-accent)" : "var(--color-primary)",
                                            }}
                                        >
                                            {year}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Month Dropdown */}
                    <div className="flex items-center gap-2">
                        <span
                            className="font-serif text-sm md:text-base"
                            style={{ color: "var(--color-paragraph)" }}
                        >
                            Month:
                        </span>
                        <div className="relative">
                            <button
                                onClick={() => {
                                    setMonthOpen(!monthOpen);
                                    setYearOpen(false);
                                }}
                                className="flex items-center gap-1 px-3 py-1.5 border rounded font-serif text-sm md:text-base cursor-pointer transition-colors duration-200 min-w-[120px] justify-between"
                                style={{
                                    borderColor: "#d1d5db",
                                    color: "var(--color-primary)",
                                }}
                            >
                                {selectedMonth}
                                <ChevronDown size={14} className={`transition-transform duration-200 ${monthOpen ? "rotate-180" : ""}`} />
                            </button>
                            {monthOpen && (
                                <div
                                    className="absolute top-full left-0 mt-1 w-full bg-white border rounded shadow-lg z-20"
                                    style={{ borderColor: "#d1d5db" }}
                                >
                                    {MONTHS.map((month) => (
                                        <button
                                            key={month}
                                            onClick={() => {
                                                setSelectedMonth(month);
                                                setMonthOpen(false);
                                                setCurrentPage(1);
                                            }}
                                            className="block w-full text-left px-3 py-2 font-serif text-sm hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                                            style={{
                                                color: selectedMonth === month ? "var(--color-accent)" : "var(--color-primary)",
                                            }}
                                        >
                                            {month}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Newspaper Grid ── */}
            {currentItems.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {currentItems.map((item) => (
                        <article
                            key={item.id}
                            className="press-card group cursor-pointer mx-auto w-full max-w-[380px]"
                        >
                            <div className="relative w-full h-[436px] sm:h-[380px] md:h-[436px] overflow-hidden bg-gray-50">
                                <Image
                                    src={item.image}
                                    alt={item.title || "Newspaper clipping"}
                                    fill
                                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 380px"
                                />
                                {/* Subtle hover overlay */}
                                <div
                                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                    style={{
                                        background: "linear-gradient(to top, rgba(35,46,90,0.08) 0%, transparent 50%)",
                                    }}
                                />
                            </div>
                        </article>
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center py-16">
                    <p
                        className="font-serif text-base md:text-lg"
                        style={{ color: "var(--color-paragraph)" }}
                    >
                        No newspaper clippings found for the selected filters.
                    </p>
                </div>
            )}

            {/* ── Pagination ── */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}
