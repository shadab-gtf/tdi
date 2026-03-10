"use client";

import React, { useState, useRef, useCallback } from "react";
import { ChevronDown, Play, Pause } from "lucide-react";

// ── Types (API-ready) ──
export interface ProjectUpdateItem {
    id: number;
    videoSrc: string;
    label: string;
    project: string;
    block: string;
    date: string;
}

// ── Static data ──
const UPDATES_DATA: ProjectUpdateItem[] = [
    {
        id: 1,
        videoSrc: "/assets/videos/contruction-1.mp4",
        label: "Block A",
        project: "Kundli",
        block: "A-B",
        date: "June 2024",
    },
    {
        id: 2,
        videoSrc: "/assets/videos/contruction-2.mp4",
        label: "Block B",
        project: "Kundli",
        block: "A-B",
        date: "June 2024",
    },
];

const PROJECTS = ["Kundli"];
const BLOCKS = ["A-B", "C-D", "E-F"];
const DATES = ["June 2024", "March 2024", "Dec 2023"];

/* ── Individual Video Card ── */
function VideoCard({ item }: { item: ProjectUpdateItem }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = useCallback(() => {
        const video = videoRef.current;
        if (!video) return;

        if (video.paused) {
            video.play();
            setIsPlaying(true);
        } else {
            video.pause();
            setIsPlaying(false);
        }
    }, []);

    // Sync state when video ends naturally
    const handleEnded = useCallback(() => {
        setIsPlaying(false);
    }, []);

    // Sync state if paused by browser (e.g. visibility change)
    const handlePause = useCallback(() => {
        setIsPlaying(false);
    }, []);

    const handlePlay = useCallback(() => {
        setIsPlaying(true);
    }, []);

    return (
        <article className="press-card">
            <div
                className="relative aspect-[16/10] w-full overflow-hidden rounded-sm cursor-pointer group"
                onClick={togglePlay}
            >
                {/* Video element */}
                <video
                    ref={videoRef}
                    src={item.videoSrc}
                    className="absolute inset-0 w-full h-full object-cover"
                    playsInline
                    preload="metadata"
                    onEnded={handleEnded}
                    onPause={handlePause}
                    onPlay={handlePlay}
                />

                {/* Play / Pause overlay — centered */}
                <div
                    className="absolute inset-0 flex items-center justify-center transition-opacity duration-300"
                    style={{
                        opacity: isPlaying ? 0 : 1,
                        pointerEvents: isPlaying ? "none" : "auto",
                        background: isPlaying
                            ? "transparent"
                            : "linear-gradient(to top, rgba(0,0,0,0.25) 0%, rgba(0,0,0,0.08) 50%, transparent 100%)",
                    }}
                >
                    <div
                        className="w-9 h-9 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300 group-hover:scale-110"
                        style={{
                            backgroundColor: "rgba(255,255,255,0.2)",
                            backdropFilter: "blur(8px)",
                            border: "2px solid rgba(255,255,255,0.5)",
                        }}
                    >
                        <Play
                            size={16}
                            className="ml-1"
                            style={{ color: "#fff" }}
                            fill="rgba(255,255,255,0.8)"
                        />
                    </div>
                </div>

                {/* Pause icon — visible only while playing, on hover */}
                {isPlaying && (
                    <div
                        className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    >
                        <div
                            className="w-9 h-9 md:w-12 md:h-12 rounded-full flex items-center justify-center transition-all duration-300"
                            style={{
                                backgroundColor: "rgba(0,0,0,0.35)",
                                backdropFilter: "blur(8px)",
                                border: "2px solid rgba(255,255,255,0.4)",
                            }}
                        >
                            <Pause
                                size={16}
                                style={{ color: "#fff" }}
                                fill="rgba(255,255,255,0.8)"
                            />
                        </div>
                    </div>
                )}
            </div>

            {/* Label */}
            <p
                className="mt-4 font-serif text-base md:text-lg text-center font-medium"
                style={{ color: "var(--color-accent)" }}
            >
                {item.label}
            </p>
        </article>
    );
}

/* ── Main Component ── */
export default function ProjectUpdates() {
    const [selectedProject, setSelectedProject] = useState("Kundli");
    const [selectedBlock, setSelectedBlock] = useState("A-B");
    const [selectedDate, setSelectedDate] = useState("June 2024");
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    // Filter by selected project, block, and date
    const filteredItems = UPDATES_DATA.filter(
        (item) =>
            item.project === selectedProject &&
            item.block === selectedBlock &&
            item.date === selectedDate
    );

    const toggleDropdown = (name: string) => {
        setOpenDropdown(openDropdown === name ? null : name);
    };

    const renderDropdown = (
        label: string,
        value: string,
        options: string[],
        onChange: (val: string) => void,
        name: string,
        minWidth = "100px"
    ) => (
        <div className="flex items-center gap-2">
            <span
                className="font-serif text-sm md:text-base whitespace-nowrap"
                style={{ color: "var(--color-paragraph)" }}
            >
                {label}:
            </span>
            <div className="relative">
                <button
                    onClick={() => toggleDropdown(name)}
                    className="flex items-center gap-1 px-3 py-1.5 border rounded font-serif text-sm md:text-base cursor-pointer transition-colors duration-200 justify-between"
                    style={{
                        borderColor: "#d1d5db",
                        color: "var(--color-primary)",
                        minWidth,
                    }}
                >
                    {value}
                    <ChevronDown
                        size={14}
                        className={`transition-transform duration-200 ${openDropdown === name ? "rotate-180" : ""}`}
                    />
                </button>
                {openDropdown === name && (
                    <div
                        className="absolute top-full left-0 mt-1 w-full bg-white border rounded shadow-lg z-20"
                        style={{ borderColor: "#d1d5db" }}
                    >
                        {options.map((opt) => (
                            <button
                                key={opt}
                                onClick={() => {
                                    onChange(opt);
                                    setOpenDropdown(null);
                                }}
                                className="block w-full text-left px-3 py-2 font-serif text-sm hover:bg-gray-50 transition-colors cursor-pointer whitespace-nowrap"
                                style={{
                                    color: value === opt ? "var(--color-accent)" : "var(--color-primary)",
                                }}
                            >
                                {opt}
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );

    return (
        <div className="press-tab-content">
            {/* ── Header + Filters ── */}
            <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 mb-8 md:mb-10">
                <h3
                    className="font-serif text-base md:text-lg font-medium underline underline-offset-4"
                    style={{
                        color: "var(--color-primary)",
                        textDecorationColor: "var(--color-accent)",
                    }}
                >
                    Latest Construction Update
                </h3>

                <div className="flex flex-wrap items-center gap-4 md:gap-6">
                    {renderDropdown("Project", selectedProject, PROJECTS, setSelectedProject, "project", "100px")}
                    {renderDropdown("Block", selectedBlock, BLOCKS, setSelectedBlock, "block", "80px")}
                    {renderDropdown("Date", selectedDate, DATES, setSelectedDate, "date", "120px")}
                </div>
            </div>

            {/* ── Video Grid ── */}
            {filteredItems.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                    {filteredItems.map((item) => (
                        <VideoCard key={item.id} item={item} />
                    ))}
                </div>
            ) : (
                <div className="flex items-center justify-center py-16">
                    <p
                        className="font-serif text-base md:text-lg"
                        style={{ color: "var(--color-paragraph)" }}
                    >
                        No project updates found for the selected filters.
                    </p>
                </div>
            )}
        </div>
    );
}
