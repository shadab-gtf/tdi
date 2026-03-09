"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ChevronDown } from "lucide-react";
import { categories } from "@/lib/projectsData";

interface CategoryNavProps {
    activeCategory: string;
    propertyType: "Plot" | "Built up";
    selectedBlocks: string[];
    onCategoryChange: (category: string) => void;
    onPropertyTypeChange: (type: "Plot" | "Built up") => void;
    onBlockChange: (block: string) => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({
    activeCategory,
    propertyType,
    selectedBlocks,
    onCategoryChange,
    onPropertyTypeChange,
    onBlockChange,
}) => {
    const navRef = useRef<HTMLDivElement>(null);
    const [blockDropdownOpen, setBlockDropdownOpen] = React.useState(false);

    useGSAP(
        () => {
            if (!navRef.current) return;
            const items = navRef.current.querySelectorAll(".nav-item");
            gsap.fromTo(
                items,
                { opacity: 0, y: -20 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: "power3.out",
                }
            );
        },
        { scope: navRef }
    );

    const isResOrComm = activeCategory === "residential" || activeCategory === "commercial";

    return (
        <div
            ref={navRef}
            className="w-full flex flex-wrap items-center md:justify-between justify-end md:gap-4 gap-2 pt-8 pb-4"
        >
            {/* Category Tabs */}
            <div className="flex items-center gap-1 sm:gap-3 overflow-x-auto scrollbar-hide">
                {categories.map((cat) => (
                    <button
                        key={cat.value}
                        onClick={() => onCategoryChange(cat.value)}
                        className={`nav-item flex items-center gap-1.5 px-3 md:px-8 py-1.5 md:py-2.5 font-serif md:text-lg text-sm font-normal tracking-wide whitespace-nowrap transition-all duration-300 cursor-pointer
                          ${activeCategory === cat.value
                                ? "bg-[var(--color-primary)] text-white"
                                : "text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5"
                            }`}
                    >
                        {cat.label}
                    </button>
                ))}
            </div>


            <div className="nav-item flex items-center gap-3">
                {isResOrComm ? (
                    <>
                        <button
                            onClick={() => onPropertyTypeChange("Plot")}
                            className={`px-4 md:px-7 py-1.5 md:py-2.5 md:text-lg text-sm font-normal font-serif transition-all duration-300 cursor-pointer 
                                     ${propertyType === "Plot"
                                    ? "bg-[var(--color-primary)] text-white"
                                    : "bg-white text-[#424242] hover:bg-[var(--color-primary)]/5"
                                }`}
                        >
                            Plot
                        </button>

                        <button
                            onClick={() => onPropertyTypeChange("Built up")}
                            className={`px-7 md:px-7  py-1.5 md:py-2.5 md:text-lg text-sm font-normal font-serif transition-all duration-300 cursor-pointer 
                                    ${propertyType === "Built up"
                                    ? "bg-[var(--color-primary)] text-white"
                                    : "bg-white text-[#424242] hover:bg-[var(--color-primary)]/5"
                                }`}
                        >
                            Built up
                        </button>
                    </>
                ) : (
                    <div className="relative">
                        <button
                            onClick={() => setBlockDropdownOpen(!blockDropdownOpen)}
                            className="flex items-center gap-4 md:px-7 px-3 py-1.5 md:py-2.5 bg-white text-[#424242] border border-[#D58C00]/20 md:text-lg text-sm font-normal font-serif transition-all duration-300 cursor-pointer hover:bg-gray-50"
                        >
                            {selectedBlocks.length > 0 ? `Block ${selectedBlocks[0]}` : "Block"}
                            <ChevronDown size={18} className={`transition-transform duration-300 ${blockDropdownOpen ? "rotate-180" : ""}`} />
                        </button>

                        {blockDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-48 bg-white border border-[#D58C00]/20 shadow-xl z-50 py-2">
                                {["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"].map((block) => (
                                    <button
                                        key={block}
                                        onClick={() => {
                                            onBlockChange(block);
                                            setBlockDropdownOpen(false);
                                        }}
                                        className={`w-full text-left md:px-6 md:py-2.5 py-1.5 px-3 font-serif text-sm md:text-base hover:bg-[var(--color-primary)]/5 transition-colors
                                            ${selectedBlocks.includes(block) ? "text-[var(--color-primary)] font-semibold" : "text-[#424242]"}
                                        `}
                                    >
                                        Block {block}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};


export default CategoryNav;
