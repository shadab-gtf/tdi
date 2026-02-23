"use client";

import React, { useRef } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ChevronDown } from "lucide-react";
import { categories } from "@/lib/projectsData";

interface CategoryNavProps {
    activeCategory: string;
    propertyType: "Plot" | "Built up";
    onCategoryChange: (category: string) => void;
    onPropertyTypeChange: (type: "Plot" | "Built up") => void;
}

const CategoryNav: React.FC<CategoryNavProps> = ({
    activeCategory,
    propertyType,
    onCategoryChange,
    onPropertyTypeChange,
}) => {
    const navRef = useRef<HTMLDivElement>(null);

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

    return (
        <div
            ref={navRef}
            className="w-full flex flex-wrap items-center justify-between gap-4 py-4"
        >
            {/* Category Tabs */}
            <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto scrollbar-hide">
                {categories.map((cat) => (
                    <button
                        key={cat.value}
                        onClick={() => onCategoryChange(cat.value)}
                        className={`nav-item flex items-center gap-1.5 px-8 py-2.5 font-serif text-lg font-normal tracking-wide whitespace-nowrap transition-all duration-300 cursor-pointer
                          ${activeCategory === cat.value
                                ? "bg-[var(--color-primary)] text-white"
                                : "text-[var(--color-primary)] hover:bg-[var(--color-primary)]/5"
                            }`}
                    >
                        {cat.label}
                        {cat.hasDropdown && (
                            <ChevronDown
                                size={14}
                                strokeWidth={2}
                                className={`transition-colors ${activeCategory === cat.value
                                    ? "text-white"
                                    : "text-[var(--color-primary)]"
                                    }`}
                            />
                        )}
                    </button>
                ))}
            </div>


            <div className="nav-item flex items-center gap-3">
                <button
                    onClick={() => onPropertyTypeChange("Plot")}
                    className={`px-7 py-2.5 text-lg font-normal font-serif transition-all duration-300 cursor-pointer 
                             ${propertyType === "Plot"
                            ? "bg-[var(--color-primary)] text-white"
                            : "bg-white text-[#424242] hover:bg-[var(--color-primary)]/5"
                        }`}
                >
                    Plot
                </button>

                <button
                    onClick={() => onPropertyTypeChange("Built up")}
                    className={`px-7 py-2.5 text-lg font-normal font-serif transition-all duration-300 cursor-pointer 
                            ${propertyType === "Built up"
                            ? "bg-[var(--color-primary)] text-white"
                            : "bg-white text-[#424242] hover:bg-[var(--color-primary)]/5"
                        }`}
                >
                    Built up
                </button>
            </div>
        </div>
    );
};

export default CategoryNav;
