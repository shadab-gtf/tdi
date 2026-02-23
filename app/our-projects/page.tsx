"use client";

import React, { useState, useMemo } from "react";
import GlobalAnimation from "@/components/GlobalAnimation/GlobalAnimation";
import HeroMedia from "@/components/Hero";
import CategoryNav from "@/components/projects/CategoryNav";
import FilterSidebar from "@/components/projects/FilterSidebar";
import ProjectGrid from "@/components/projects/ProjectGrid";
import {
    mockProjects,
    filterProjects,
    defaultFilters,
    type FilterState,
} from "@/lib/projectsData";

export default function OurProjects() {
    const [filters, setFilters] = useState<FilterState>(defaultFilters);

    const filteredProjects = useMemo(
        () => filterProjects(mockProjects, filters),
        [filters]
    );

    const handleFilterChange = (newFilters: FilterState) => {
        setFilters(newFilters);
    };

    const handleCategoryChange = (category: string) => {
        setFilters((prev) => ({ ...prev, category }));
    };

    const handlePropertyTypeChange = (type: "Plot" | "Built up") => {
        setFilters((prev) => ({ ...prev, propertyType: type }));
    };

    return (
        <main className="relative min-h-screen w-full bg-[var(--background)]">
            <GlobalAnimation />
            <HeroMedia type="image" src="/assets/images/hero.png" />

            {/* Projects Section */}
            <section className="w-full pb-20">
                <div className="containers mx-auto px-4 lg:px-8">
                    <CategoryNav
                        activeCategory={filters.category}
                        propertyType={filters.propertyType}
                        onCategoryChange={handleCategoryChange}
                        onPropertyTypeChange={handlePropertyTypeChange}
                    />
                    <div className="flex gap-4 mt-6 items-start">
                        <FilterSidebar
                            filters={filters}
                            onFilterChange={handleFilterChange}
                        />
                        <ProjectGrid projects={filteredProjects} />
                    </div>
                </div>
            </section>
        </main>
    );
}