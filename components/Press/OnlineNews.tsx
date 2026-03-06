"use client";

import React, { useState } from "react";
import Image from "next/image";
import Pagination from "./Pagination";

// ── Types (API-ready) ──
export interface OnlineNewsItem {
    id: number;
    image: string;
    title: string;
    description: string;
    source: string;
    date: string;
    link?: string;
}

// ── Static data (replace with API call later) ──
const NEWS_DATA: OnlineNewsItem[] = [
    {
        id: 1,
        image: "/assets/media/online-news-1.png",
        title: "TDI Infrastructure Honoured At ET Industry Changemakers 2026",
        description:
            "Akshay Taneja of TDI Infrastructure was recognised as Developer of the Year at the ET Industry Changemakers 2026 ceremony held in New Delhi.",
        source: "The Economic Times",
        date: "Jan 30, 2026",
        link: "#",
    },
    {
        id: 2,
        image: "/assets/media/online-news-2.png",
        title: "TDI Infrastructure Shares Budget Outlook With Finance Outlook India",
        description:
            "Akshay Taneja, CEO of TDI Infrastructure, shared insights on the Union Budget 2026–27 in Finance Outlook India.",
        source: "Finance Outlook India",
        date: "Feb 02, 2026",
        link: "#",
    },
    {
        id: 3,
        image: "/assets/media/online-news-3.png",
        title: "Kundli's Growth Story Featured In The Property Times",
        description:
            "In The Property Times, Akshay Taneja, CEO of TDI Infrastructure, shared insights on why NCR homebuyers are increasingly exploring Kundli as a strategic alternative to Gurugram.",
        source: "Property Times.In",
        date: "Dec 24, 2025",
        link: "#",
    },
    {
        id: 4,
        image: "/assets/media/online-news-4.png",
        title: "How To (Purposefully) Mismatch Furniture",
        description:
            "I enjoy getting to know my patients and building meaningful relationships. I understand that...",
        source: "Torbit Reality",
        date: "Jan 22, 2026",
        link: "#",
    },

];

const ITEMS_PER_PAGE = 4;

export default function OnlineNews() {
    const [currentPage, setCurrentPage] = useState(1);

    // In the future, replace with API fetch
    const allItems = NEWS_DATA;
    const totalPages = Math.ceil(allItems.length / ITEMS_PER_PAGE);
    const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
    const currentItems = allItems.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className="press-tab-content">
            {/* ── News Cards ── */}
            <div className="flex flex-col">
                {currentItems.map((item, index) => (
                    <article
                        key={item.id}
                        className="press-card group"
                        style={{
                            borderBottom:
                                index < currentItems.length - 1
                                    ? "1px solid #e5e7eb"
                                    : "none",
                        }}
                    >
                        <div className="flex flex-col md:flex-row gap-6 md:gap-10 py-8 md:py-10">
                            {/* Image */}
                            <div className="relative w-full md:w-[300px] flex-shrink-0 overflow-hidden">
                                <div className="relative aspect-square md:w-[300px] md:h-[300px] w-full">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.03]"
                                        sizes="(max-width: 768px) 100vw, 300px"
                                    />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="flex flex-col justify-center flex-1 text-center md:text-left">
                                <h3
                                    className="font-serif text-lg md:text-xl lg:text-[22px] leading-snug mb-3 transition-colors duration-300 group-hover:text-[var(--color-accent)]"
                                    style={{ color: "var(--color-primary)" }}
                                >
                                    {item.link ? (
                                        <a href={item.link} className="hover:underline underline-offset-4 decoration-[var(--color-accent)]">
                                            {item.title}
                                        </a>
                                    ) : (
                                        item.title
                                    )}
                                </h3>

                                <p
                                    className="font-serif text-sm md:text-[15px] leading-relaxed mb-4 max-w-2xl"
                                    style={{ color: "var(--color-paragraph)" }}
                                >
                                    {item.description}
                                </p>

                                <div className="flex items-center justify-center md:justify-start gap-2 font-serif text-sm">
                                    <span style={{ color: "var(--color-paragraph)" }}>
                                        By
                                    </span>
                                    <span
                                        className="font-medium"
                                        style={{ color: "var(--color-primary)" }}
                                    >
                                        {item.source}
                                    </span>
                                    <span
                                        className="ml-2 font-medium"
                                        style={{ color: "var(--color-accent)" }}
                                    >
                                        {item.date}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </article>
                ))}
            </div>

            {/* ── Pagination ── */}
            <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
            />
        </div>
    );
}
