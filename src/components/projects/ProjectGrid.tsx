"use client";

import React, { useRef, useEffect } from "react";
import { gsap } from "gsap";
import ProjectCard from "./ProjectCard";
import type { Project } from "@/lib/projectsData";
import Image from "next/image";

interface ProjectGridProps {
    projects: Project[];
}

const ProjectGrid: React.FC<ProjectGridProps> = ({ projects }) => {
    const gridRef = useRef<HTMLDivElement>(null);
    const prevLenRef = useRef(projects.length);
    useEffect(() => {
        if (!gridRef.current) return;
        if (prevLenRef.current === projects.length && prevLenRef.current !== 0) return;
        prevLenRef.current = projects.length;

        const cards = gridRef.current.querySelectorAll(".project-card-wrapper");
        if (cards.length === 0) return;

        gsap.fromTo(
            cards,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                stagger: 0.07,
                ease: "power3.out",
                clearProps: "transform",
            }
        );
    }, [projects]);

    if (projects.length === 0) {
        return (
            <div className="flex-1 flex items-center justify-center min-h-[400px]">
                <div className="text-center">
                    <Image
                        src="/assets/icons/Empty1.png"
                        alt="No projects"
                        width={96}
                        height={96}
                        className="mx-auto mb-4 opacity-30"
                    />
                    <h3 className="text-xl font-serif text-[var(--color-primary)] mb-2">
                        No projects found
                    </h3>
                    <p className="text-sm text-[var(--color-paragraph)]">
                        Try adjusting your filters to see more results.
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex-1 min-w-0 ">
            <div
                ref={gridRef}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3  gap-6"
            >
                {projects.map((project, index) => (
                    <div
                        key={project.id}
                        className={`project-card-wrapper  
            sm:[&:nth-child(2n)]:show-vertical-line-none 
            lg:[&:nth-child(3n)]:show-vertical-line-none 
            sm:show-vertical-line
        `}
                    >
                        <ProjectCard project={project} index={index} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProjectGrid;
