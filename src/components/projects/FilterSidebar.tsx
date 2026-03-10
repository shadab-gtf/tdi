"use client";

import React, { useRef, useState, useCallback, useEffect } from "react";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { X, SlidersHorizontal } from "lucide-react";
import {
    apartmentOptions,
    buildingOptions,
    statusOptions,
    blockOptions,
    commercialTypeOptions,
    institutionTypeOptions,
    educationLevelOptions,
    specialisationOptions,
    type FilterState,
} from "@/lib/projectsData";
import AreaSizeSlider from "./Areasizeslider";

interface FilterSidebarProps {
    filters: FilterState;
    onFilterChange: (filters: FilterState) => void;
}

const getActiveFilterTags = (filters: FilterState): string[] => {
    const tags: string[] = [];
    filters.apartmentTypes.forEach((t) => tags.push(t));
    filters.buildingTypes.forEach((b) => tags.push(b));
    filters.commercialTypes.forEach((t) => tags.push(t));
    filters.institutionTypes.forEach((t) => tags.push(t));
    filters.educationLevels.forEach((t) => tags.push(t));
    filters.specialisations.forEach((t) => tags.push(t));
    filters.statuses.forEach((s) => tags.push(s));
    filters.blocks.forEach((b) => tags.push(b));
    return tags;
};

const BARS = [3, 5, 6, 8, 9, 11, 13, 15, 17, 18, 20, 21, 23, 24, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36];
const BAR_MAX = 36;

const AreaBarChart: React.FC<{
    minVal: number;
    maxVal: number;
    rangeMin: number;
    rangeMax: number;
}> = ({ minVal, maxVal, rangeMin, rangeMax }) => {
    const total = rangeMax - rangeMin;
    const n = BARS.length;
    return (
        <div className="flex items-end gap-[2.5px] h-[52px] w-full">
            {BARS.map((h, i) => {
                const bMin = rangeMin + (i / n) * total;
                const bMax = rangeMin + ((i + 1) / n) * total;
                const active = bMax > minVal && bMin < maxVal;
                return (
                    <div
                        key={i}
                        className={`flex-1 rounded-t-[2px] transition-colors duration-150 ${active ? "bg-[#D9991F]" : "bg-gray-200"
                            }`}
                        style={{ height: `${Math.round((h / BAR_MAX) * 52)}px` }}
                    />
                );
            })}
        </div>
    );
};

const THUMB_CLASSES = `
    appearance-none bg-transparent
    pointer-events-none
    absolute inset-0 w-full h-full
    [&::-webkit-slider-runnable-track]:bg-transparent
    [&::-moz-range-track]:bg-transparent
    [&::-webkit-slider-thumb]:pointer-events-auto
    [&::-webkit-slider-thumb]:appearance-none
    [&::-webkit-slider-thumb]:w-4
    [&::-webkit-slider-thumb]:h-4
    [&::-webkit-slider-thumb]:rounded-full
    [&::-webkit-slider-thumb]:bg-white
    [&::-webkit-slider-thumb]:border-2
    [&::-webkit-slider-thumb]:border-[#D9991F]
    [&::-webkit-slider-thumb]:shadow-[0_1px_4px_rgba(0,0,0,0.20)]
    [&::-webkit-slider-thumb]:cursor-grab
    [&::-webkit-slider-thumb:active]:cursor-grabbing
    [&::-webkit-slider-thumb:active]:shadow-[0_0_0_5px_rgba(180,83,9,0.16)]
    [&::-moz-range-thumb]:pointer-events-auto
    [&::-moz-range-thumb]:w-4
    [&::-moz-range-thumb]:h-4
    [&::-moz-range-thumb]:rounded-full
    [&::-moz-range-thumb]:bg-white
    [&::-moz-range-thumb]:border-2
    [&::-moz-range-thumb]:border-[#D9991F]
    [&::-moz-range-thumb]:shadow-[0_1px_4px_rgba(0,0,0,0.20)]
    [&::-moz-range-thumb]:cursor-grab
    [&::-moz-range-thumb]:border-none
`;

const DualRangeSlider: React.FC<{
    min: number;
    max: number;
    step: number;
    values: [number, number];
    onChange: (v: [number, number]) => void;
    showBarChart?: boolean;
    unit: "crore" | "sqft";
}> = ({ min, max, step, values, onChange, showBarChart, unit }) => {
    const pct = (v: number) => ((v - min) / (max - min)) * 100;

    return (
        <div className="w-full">
            {showBarChart && (
                <AreaBarChart
                    minVal={values[0]}
                    maxVal={values[1]}
                    rangeMin={min}
                    rangeMax={max}
                />
            )}
            <div className="relative h-[16px] my-4">
                <div className="absolute inset-0 rounded-full bg-gray-200 pointer-events-none" />
                <div
                    className="absolute top-0 bottom-0 rounded-full bg-[#D9991F] pointer-events-none"
                    style={{ left: `${pct(values[0])}%`, right: `${100 - pct(values[1])}%` }}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={values[0]}
                    onChange={(e) => {
                        const v = Number(e.target.value);
                        if (v < values[1]) onChange([v, values[1]]);
                    }}
                    className={`${THUMB_CLASSES} z-30`}
                />
                <input
                    type="range"
                    min={min}
                    max={max}
                    step={step}
                    value={values[1]}
                    onChange={(e) => {
                        const v = Number(e.target.value);
                        if (v > values[0]) onChange([values[0], v]);
                    }}
                    className={`${THUMB_CLASSES} z-20`}
                />
            </div>

            {unit === "crore" && (
                <div className="flex items-center gap-3 mt-1">
                    <div className="flex-1">
                        <span className="text-base font-normal font-serif text-[var(--color-primary)] block mb-1.5">
                            Min
                        </span>
                        <div className="px-3 text-base font-serif py-[9px] border border-[#D58C004D] rounded-[6px] text-[13px] font-normal text-[var(--color-primary)] bg-white">
                            {values[0]} Crore
                        </div>
                    </div>
                    <div className="flex-shrink-0 w-5 h-px bg-[var(--color-primary)]/40 mt-[30px]" />
                    <div className="flex-1">
                        <span className="text-base font-normal font-serif text-[var(--color-primary)] block mb-1.5">
                            Max
                        </span>
                        <div className="px-3 text-base font-serif py-[9px] border border-[#D58C004D] rounded-[6px] text-[13px] font-normal text-[var(--color-primary)] bg-white">
                            {values[1]} Crore
                        </div>
                    </div>
                </div>
            )}

            {unit === "sqft" && (
                <div className="flex justify-between text-[12px] text-[var(--color-paragraph)] mt-1">
                    <span className="font-serif">{values[0].toLocaleString()} sq.yd</span>
                    <span className="font-serif">{values[1].toLocaleString()} sq.yd</span>
                </div>
            )}
        </div>
    );
};

const FilterPill: React.FC<{
    label: string;
    active: boolean;
    onClick: () => void;
    square?: boolean;
}> = ({ label, active, onClick, square }) =>
        square ? (
            <button
                onClick={onClick}
                className={`
                w-8 h-8 flex items-center  justify-center text-sm font-normal
                 transition-all duration-200 cursor-pointer
                ${active
                        ? "border font-serif border-[#D9991F] bg-[#D58C001A] text-[var(--color-primary)]"
                        : "text-[var(--color-primary)] bg-[#F8FBFF] px-2 py-[4px] font-serif hover:text-[#D9991F]"
                    }
            `}
            >
                {label}
            </button>
        ) : (
            <button
                onClick={onClick}
                className={`
                text-[13px] font-normal transition-all duration-200 cursor-pointer
                ${active
                        ? "px-3 py-[4px] border font-serif border-[#D9991F] bg-[#D58C001A]  rounded-[3px] text-[var(--color-primary)]"
                        : "text-[var(--color-primary)] font-serif bg-[#F8FBFF] px-2 py-[4px] hover:text-[#D9991F]"
                    }
            `}
            >
                {label}
            </button>
        );

const Divider = () => <div className="border-t border-[#D58C00]/30 mx-6" />;

const FilterSidebar: React.FC<FilterSidebarProps> = ({ filters, onFilterChange }) => {
    const sidebarRef = useRef<HTMLDivElement>(null);
    const drawerRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    const activeCategory = filters.category;


    useEffect(() => { setMounted(true); }, []);

    useGSAP(() => {
        if (!sidebarRef.current) return;
        gsap.fromTo(
            sidebarRef.current.querySelectorAll(".filter-section"),
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.5, stagger: 0.08, ease: "power3.out", delay: 0.3 }
        );
    }, { scope: sidebarRef });

    useEffect(() => {
        const drawer = drawerRef.current;
        const overlay = overlayRef.current;
        if (!drawer || !overlay) return;

        if (mobileOpen) {
            document.body.style.overflow = "hidden";
            gsap.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.28, ease: "power2.out" });
            gsap.fromTo(drawer, { y: "100%" }, { y: "0%", duration: 0.46, ease: "power4.out" });
        } else if (mounted) {
            document.body.style.overflow = "";
            gsap.to(drawer, { y: "100%", duration: 0.36, ease: "power3.in" });
            gsap.to(overlay, { opacity: 0, duration: 0.28, ease: "power2.in" });
        }
    }, [mobileOpen, mounted]);

    useEffect(() => () => { document.body.style.overflow = ""; }, []);

    const update = useCallback(
        (partial: Partial<FilterState>) => onFilterChange({ ...filters, ...partial }),
        [filters, onFilterChange]
    );

    const toggleArrayItem = useCallback(
        (key: keyof FilterState, value: string) => {
            const arr = filters[key] as string[];
            const next = arr.includes(value) ? arr.filter((v) => v !== value) : [...arr, value];
            update({ [key]: next });
        },
        [filters, update]
    );

    const clearAll = useCallback(() =>
        update({
            apartmentTypes: [],
            buildingTypes: [],
            commercialTypes: [],
            institutionTypes: [],
            educationLevels: [],
            specialisations: [],
            statuses: [],
            blocks: [],
            priceRange: [2, 8],
            areaRange: [1200, 25000]
        }),
        [update]
    );

    const removeTag = useCallback((tag: string) => {
        if (filters.apartmentTypes.includes(tag)) update({ apartmentTypes: filters.apartmentTypes.filter((t) => t !== tag) });
        else if (filters.buildingTypes.includes(tag)) update({ buildingTypes: filters.buildingTypes.filter((b) => b !== tag) });
        else if (filters.commercialTypes.includes(tag)) update({ commercialTypes: filters.commercialTypes.filter((t) => t !== tag) });
        else if (filters.institutionTypes.includes(tag)) update({ institutionTypes: filters.institutionTypes.filter((t) => t !== tag) });
        else if (filters.educationLevels.includes(tag)) update({ educationLevels: filters.educationLevels.filter((t) => t !== tag) });
        else if (filters.specialisations.includes(tag)) update({ specialisations: filters.specialisations.filter((t) => t !== tag) });
        else if (filters.statuses.includes(tag)) update({ statuses: filters.statuses.filter((s) => s !== tag) });
        else if (filters.blocks.includes(tag)) update({ blocks: filters.blocks.filter((b) => b !== tag) });
    }, [filters, update]);

    const activeTags = getActiveFilterTags(filters);

    const content = (
        <div>
            {/* Active Tags Section */}
            <div className="filter-section px-6 pt-6 pb-5">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-normal font-serif text-[var(--color-accent)]">Filters</h3>
                    {activeTags.length > 0 && (
                        <button
                            onClick={clearAll}
                            className="text-lg font-normal font-serif text-[var(--color-primary)] hover:text-[#D9991F] transition-colors cursor-pointer"
                        >
                            Clear All
                        </button>
                    )}
                </div>
                {activeTags.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {activeTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => removeTag(tag)}
                                className="px-2 py-0.5 text-sm font-normal font-serif border border-[#D58C00] text-[#424242] bg-[#FDF5E6] hover:bg-[#D9991F]/10 transition-colors cursor-pointer"
                            >
                                {tag}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            <Divider />

            {/* Residential & Commercial Shared Filters: Price & Area */}
            {(activeCategory === "residential" || activeCategory === "commercial") && (
                <>
                    <div className="filter-section px-6 py-5">
                        <h4 className="text-lg font-normal font-serif text-[var(--color-primary)] mb-4">Price Range</h4>
                        <DualRangeSlider
                            min={2} max={8} step={0.5}
                            values={filters.priceRange as [number, number]}
                            onChange={(v) => update({ priceRange: v })}
                            unit="crore"
                        />
                    </div>
                    <Divider />
                    <div className="filter-section px-6 py-5">
                        <h4 className="text-lg font-normal font-serif text-[var(--color-primary)] mb-3">Area Size</h4>
                        <AreaSizeSlider
                            min={0} max={25000} step={100}
                            values={filters.areaRange as [number, number]}
                            onChange={(v) => update({ areaRange: v })}
                            unit={activeCategory === "commercial" ? "sq.yd" : "sq.ft"}
                        />
                    </div>
                    <Divider />
                </>
            )}

            {/* Residential Specific Filters */}
            {activeCategory === "residential" && (
                <>
                    <div className="filter-section px-6 py-5">
                        <h4 className="text-[15px] font-normal font-serif text-[var(--color-primary)] mb-4">Apartment Type</h4>
                        <div className="flex flex-wrap items-center gap-4">
                            {apartmentOptions.map((opt) => (
                                <FilterPill key={opt} label={opt}
                                    active={filters.apartmentTypes.includes(opt)}
                                    onClick={() => toggleArrayItem("apartmentTypes", opt)}
                                />
                            ))}
                        </div>
                    </div>
                    <Divider />
                    <div className="filter-section px-6 py-5">
                        <h4 className="text-[15px] font-normal font-serif text-[var(--color-accent)] mb-4">Building Type</h4>
                        <div className="flex flex-wrap items-center gap-5">
                            {buildingOptions.map((opt) => (
                                <FilterPill key={opt} label={opt}
                                    active={filters.buildingTypes.includes(opt)}
                                    onClick={() => toggleArrayItem("buildingTypes", opt)}
                                />
                            ))}
                        </div>
                    </div>
                    <Divider />
                </>
            )}

            {/* Commercial Specific Filters */}
            {activeCategory === "commercial" && (
                <>
                    <div className="filter-section px-6 py-5">
                        <h4 className="text-[15px] font-normal font-serif text-[var(--color-primary)] mb-4">Property Type</h4>
                        <div className="flex flex-wrap items-center gap-4">
                            {commercialTypeOptions.map((opt) => (
                                <FilterPill key={opt} label={opt}
                                    active={filters.commercialTypes.includes(opt)}
                                    onClick={() => toggleArrayItem("commercialTypes", opt)}
                                />
                            ))}
                        </div>
                    </div>
                    <Divider />
                </>
            )}

            {/* Educational Specific Filters */}
            {activeCategory === "educational" && (
                <>
                    <div className="filter-section px-6 py-5">
                        <h4 className="text-[15px] font-normal font-serif text-[var(--color-primary)] mb-4">Institution Type</h4>
                        <div className="flex flex-wrap items-center gap-4">
                            {institutionTypeOptions.map((opt) => (
                                <FilterPill key={opt} label={opt}
                                    active={filters.institutionTypes.includes(opt)}
                                    onClick={() => toggleArrayItem("institutionTypes", opt)}
                                />
                            ))}
                        </div>
                    </div>
                    <Divider />
                    <div className="filter-section px-6 py-5">
                        <h4 className="text-[15px] font-normal font-serif text-[var(--color-primary)] mb-4">Education Level</h4>
                        <div className="flex flex-wrap items-center gap-4">
                            {educationLevelOptions.map((opt) => (
                                <FilterPill key={opt} label={opt}
                                    active={filters.educationLevels.includes(opt)}
                                    onClick={() => toggleArrayItem("educationLevels", opt)}
                                />
                            ))}
                        </div>
                    </div>
                    <Divider />
                </>
            )}

            {/* Healthcare Specific Filters */}
            {activeCategory === "healthcare" && (
                <>
                    <div className="filter-section px-6 py-5">
                        <h4 className="text-[15px] font-normal font-serif text-[var(--color-primary)] mb-4">Specialisation</h4>
                        <div className="flex flex-wrap items-center gap-4">
                            {specialisationOptions.map((opt) => (
                                <FilterPill key={opt} label={opt}
                                    active={filters.specialisations.includes(opt)}
                                    onClick={() => toggleArrayItem("specialisations", opt)}
                                />
                            ))}
                        </div>
                    </div>
                    <Divider />
                </>
            )}



            {(activeCategory === "residential" || activeCategory === "commercial") && (
                <>
                    <div className="filter-section px-6 py-5">
                        <h4 className="text-[15px] font-normal font-serif text-[var(--color-accent)] mb-4">Status</h4>
                        <div className="flex flex-wrap items-center gap-3">
                            {statusOptions.map((opt) => (
                                <FilterPill key={opt} label={opt}
                                    active={filters.statuses.includes(opt)}
                                    onClick={() => toggleArrayItem("statuses", opt)}
                                />
                            ))}
                        </div>
                    </div>
                    <Divider />
                    <div className="filter-section px-6 py-5 pb-8">
                        <h4 className="text-[15px] font-normal font-serif text-[var(--color-accent)] mb-4">Block</h4>
                        <div className="grid grid-cols-6 gap-x-5 gap-y-3">
                            {blockOptions.map((opt) => (
                                <FilterPill key={opt} label={opt} square
                                    active={filters.blocks.includes(opt)}
                                    onClick={() => toggleArrayItem("blocks", opt)}
                                />
                            ))}
                        </div>
                    </div>
                </>
            )}
        </div>
    );


    return (
        <>
            <button
                onClick={() => setMobileOpen(true)}
                className="lg:hidden fixed bottom-6 left-6 z-50 bg-[var(--color-primary)] text-white p-4 rounded-full shadow-2xl hover:scale-105 active:scale-95 transition-transform cursor-pointer"
                aria-label="Open Filters"
            >
                <SlidersHorizontal size={22} />
            </button>

            <div
                ref={overlayRef}
                onClick={() => setMobileOpen(false)}
                className="lg:hidden fixed inset-0 bg-black/40 z-40"
                style={{ opacity: 0, pointerEvents: mobileOpen ? "auto" : "none" }}
            />

            <div
                ref={drawerRef}
                role="dialog"
                aria-modal="true"
                aria-label="Filters"
                className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-[20px] shadow-[0_-8px_40px_rgba(0,0,0,0.14)]"
                style={{ transform: "translateY(100%)", maxHeight: "90dvh", willChange: "transform" }}
            >
                <div className="flex justify-center pt-3">
                    <div className="w-10 h-[5px] rounded-full bg-gray-300" />
                </div>
                <div className="flex justify-end px-4 pt-1.5">
                    <button
                        onClick={() => setMobileOpen(false)}
                        className="p-1.5 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
                        aria-label="Close filters"
                    >
                        <X size={20} className="text-[var(--color-primary)]" />
                    </button>
                </div>
                <div className="overflow-y-auto overscroll-contain" style={{ maxHeight: "calc(90dvh - 60px)" }}>
                    {content}
                </div>
            </div>
            <aside
                ref={sidebarRef}
                className="hidden lg:block bg-white border border-[#D58C00]/30  w-[328px] shrink-0 sticky top-24 self-start overflow-hidden"
            >
                {content}
            </aside>
        </>
    );
};

export default FilterSidebar;