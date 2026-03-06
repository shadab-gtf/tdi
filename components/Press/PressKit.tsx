"use client";

import React from "react";
import Image from "next/image";
import { Download } from "lucide-react";

// ── Types (API-ready) ──
export interface PressKitItem {
    id: number;
    image: string;
    altText: string;
    formats: { label: string; url: string }[];
}

// ── Static data ──
const PRESS_KIT_DATA: PressKitItem[] = [
    {
        id: 1,
        image: "/assets/media/blue-logo.png",
        altText: "TDI City Kundli Logo - Light",
        formats: [
            { label: "PNG", url: "/assets/media/blue-logo.png" },
            { label: "JPG", url: "/assets/media/blue-logo.png" },
            { label: "WEBP", url: "/assets/media/blue-logo.png" },
        ],
    },
    {
        id: 2,
        image: "/assets/media/white-logo.png",
        altText: "TDI City Kundli Logo - Dark",
        formats: [
            { label: "PNG", url: "/assets/media/white-logo.png" },
            { label: "JPG", url: "/assets/media/white-logo.png" },
            { label: "WEBP", url: "/assets/media/white-logo.png" },
        ],
    },
];

export default function PressKit() {
    const handleDownload = async (imageUrl: string, fileName: string) => {
        try {
            const response = await fetch(imageUrl);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch {
            window.open(imageUrl, "_blank");
        }
    };

    return (
        <div className="press-tab-content max-w-[976px] w-full mx-auto">
            {/* ── Logo Cards Grid ── */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-0">
                {PRESS_KIT_DATA.map((item) => (
                    <div key={item.id} className="press-card flex flex-col items-center">

                        <div className="flex items-center gap-3 mb-5 font-serif text-base md:text-lg tracking-wide">
                            {item.formats.map((format, i) => (
                                <React.Fragment key={format.label}>
                                    <a
                                        href={format.url}
                                        download
                                        className="font-semibold transition-colors duration-300 hover:underline underline-offset-4 cursor-pointer"
                                        style={{ color: "var(--color-primary)" }}
                                    >
                                        {format.label}
                                    </a>
                                    {i < item.formats.length - 1 && (
                                        <span
                                            className="font-normal"
                                            style={{ color: "var(--color-primary)" }}
                                        >
                                            |
                                        </span>
                                    )}
                                </React.Fragment>
                            ))}
                        </div>

                        {/* Logo Card — clickable to download */}
                        <button
                            onClick={() =>
                                handleDownload(
                                    item.image,
                                    item.altText.replace(/\s+/g, "-").toLowerCase() + ".png"
                                )
                            }
                            className="relative w-[400px] h-[200px] overflow-hidden flex items-center justify-center cursor-pointer group border-0 transition-shadow duration-300"
                            aria-label={`Download ${item.altText}`}
                        >
                            <div className="relative w-full h-full">
                                <Image
                                    src={item.image}
                                    alt={item.altText}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 768px) 100vw, 45vw"
                                />
                            </div>

                            {/* Download hover overlay */}
                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div
                                    className="w-10 h-10 rounded-full flex items-center justify-center"
                                    style={{
                                        backgroundColor: "rgba(255,255,255,0.9)",
                                        boxShadow: "0 2px 12px rgba(0,0,0,0.12)",
                                    }}
                                >
                                    <Download size={18} style={{ color: "var(--color-primary)" }} />
                                </div>
                            </div>
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
