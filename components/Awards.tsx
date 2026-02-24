"use client";
import React, { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MoveLeft, MoveRight } from "lucide-react";

const awardsData = [
    {
        id: 1,
        year: "2025",
        title: "Excellent Township",
        subtitle: "Of The Year",
        image: "/assets/images/awward/1.png",
    },
    {
        id: 2,
        year: "2025",
        title: "Leadership Excellence",
        subtitle: "Award North",
        image: "/assets/images/awward/2.png",
    },
    {
        id: 3,
        year: "2025",
        title: "Excellent Township",
        subtitle: "Of The Year Award",
        image: "/assets/images/awward/3.png",
    },
    {
        id: 4,
        year: "2025",
        title: "Young Industry",
        subtitle: "Leader Award",
        image: "/assets/images/awward/4.png",
    },
    {
        id: 5,
        year: "2025",
        title: "Excellent Township",
        subtitle: "Of The Year",
        image: "/assets/images/awward/1.png",
    },
    {
        id: 6,
        year: "2025",
        title: "Leadership Excellence",
        subtitle: "Award North",
        image: "/assets/images/awward/2.png",
    },
];

const Awards = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleCount, setVisibleCount] = useState(4);
    const [isDragging, setIsDragging] = useState(false);
    const dragStartX = useRef(0);
    const dragStartIndex = useRef(0);

    const maxIndex = Math.max(0, awardsData.length - visibleCount);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            let visible = 2;
            if (width >= 1024) visible = 4;
            else if (width >= 768) visible = 3;
            else if (width >= 480) visible = 2;
            else visible = 1;
            setVisibleCount(visible);
            setCurrentIndex((prev) => Math.min(prev, Math.max(0, awardsData.length - visible)));
        };
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const slide = useCallback(
        (direction: "left" | "right") => {
            setCurrentIndex((prev) => {
                if (direction === "right") return Math.min(prev + 1, maxIndex);
                return Math.max(prev - 1, 0);
            });
        },
        [maxIndex]
    );

    // Touch/drag handlers
    const handleDragStart = (clientX: number) => {
        setIsDragging(true);
        dragStartX.current = clientX;
        dragStartIndex.current = currentIndex;
    };
    const handleDragEnd = (clientX: number) => {
        if (!isDragging) return;
        setIsDragging(false);
        const diff = dragStartX.current - clientX;
        if (Math.abs(diff) > 50) {
            if (diff > 0) slide("right");
            else slide("left");
        }
    };

    // percentage offset per item
    const itemWidthPercent = 100 / visibleCount;
    const translateX = -(currentIndex * itemWidthPercent);

    return (
        <section className="w-full bg-[#F0F4FA] py-16 px-4 overflow-hidden">
            <div className="containers mx-auto">
                {/* Header */}
                <div className="text-center mb-12 max-w-4xl mx-auto">
                    <h2
                        className="text-[25px] font-serif my-4"

                    >
                        Awards &amp; Recognition
                    </h2>
                    <p className="text-[var(--color-secondary)] font-serif text-sm md:text-base ">
                        Honouring industry accolades and milestones that reflect our commitment to quality, design
                        excellence, and trusted development across residential, commercial, and institutional
                        projects.
                    </p>
                </div>

                {/* Slider Wrapper */}
                <div className="relative max-w-7xl mx-auto ">
                    {/* Prev Button */}
                    <button
                        onClick={() => slide("left")}
                        disabled={currentIndex === 0}
                        aria-label="Previous"
                        className={`hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full border border-[#D4AF37] text-black bg-transparent hover:bg-[#D4AF37] hover:text-white transition-all duration-300 -translate-x-14 ${currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "cursor-pointer hover:shadow-lg active:scale-95"
                            }`}
                    >
                        <MoveLeft size={18} />
                    </button>

                    {/* Viewport */}
                    <div
                        className="overflow-hidden w-full"
                        onMouseDown={(e) => handleDragStart(e.clientX)}
                        onMouseUp={(e) => handleDragEnd(e.clientX)}
                        onMouseLeave={(e) => handleDragEnd(e.clientX)}
                        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
                        onTouchEnd={(e) => handleDragEnd(e.changedTouches[0].clientX)}
                    >
                        {/* Track */}
                        <motion.div
                            className="flex"
                            animate={{ x: `${translateX}%` }}
                            transition={{ type: "spring", stiffness: 300, damping: 35, mass: 0.8 }}
                            style={{ width: `${(awardsData.length / visibleCount) * 100}%` }}
                        >
                            {awardsData.map((item, index) => {
                                const isLast = index === awardsData.length - 1;
                                return (
                                    <div
                                        key={item.id}
                                        className="flex items-stretch "
                                        style={{ width: `${100 / awardsData.length}%` }}
                                    >
                                        {/* Card */}
                                        <div className="flex-1 flex flex-col items-center px-16 py-4">
                                            {/* Image */}
                                            <div
                                                className="relative w-[200px] h-[200px] overflow-hidden shadow-md"
                                                style={{ aspectRatio: "1/1" }}
                                            >
                                                <Image
                                                    src={item.image}
                                                    alt={`${item.title} ${item.subtitle}`}
                                                    fill
                                                    className="object-cover"
                                                    draggable={false}
                                                />
                                            </div>

                                            {/* Text */}
                                            <div className="text-center mt-4 space-y-1">
                                                <h4
                                                    className="text-[30px] font-serif text-[var(--color-accent)]! font-semibold"
                                                >
                                                    {item.year}
                                                </h4>
                                                <p className="text-sm md:text-base font-regular text-black! font-serif text-gray-800 leading-snug">
                                                    {item.title}
                                                    <br />
                                                    {item.subtitle}
                                                </p>
                                            </div>
                                        </div>

                                        {/* Vertical Separator */}
                                        {!isLast && (
                                            <div className="flex items-center self-stretch py-4">
                                                <div
                                                    className="w-px bg-gradient-to-b from-transparent via-[#C9A227]/40 to-transparent"
                                                    style={{ height: "100%" }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                );
                            })}
                        </motion.div>
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={() => slide("right")}
                        disabled={currentIndex === maxIndex}
                        aria-label="Next"
                        className={`hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full border border-[#D4AF37] text-black bg-transparent hover:bg-[#D4AF37] hover:text-white transition-all duration-300 translate-x-14 ${currentIndex === maxIndex ? "opacity-30 cursor-not-allowed" : "cursor-pointer hover:shadow-lg active:scale-95"
                            }`}
                    >
                        <MoveRight size={18} />
                    </button>

                    {/* Mobile Controls */}
                    <div className="flex md:hidden justify-center gap-4 mt-6">
                        <button
                            onClick={() => slide("left")}
                            disabled={currentIndex === 0}
                            className={`p-2 rounded-full border border-[#D4AF37] text-[#D4AF37] bg-white/80 backdrop-blur-sm shadow-md transition-opacity ${currentIndex === 0 ? "opacity-30" : "opacity-100"
                                }`}
                        >
                            <MoveLeft size={18} />
                        </button>
                        <button
                            onClick={() => slide("right")}
                            disabled={currentIndex === maxIndex}
                            className={`p-2 rounded-full border border-[#D4AF37] text-[#D4AF37] bg-white/80 backdrop-blur-sm shadow-md transition-opacity ${currentIndex === maxIndex ? "opacity-30" : "opacity-100"
                                }`}
                        >
                            <MoveRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Awards; 