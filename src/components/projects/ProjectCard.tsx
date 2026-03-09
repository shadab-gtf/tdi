"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import type { Project } from "@/lib/projectsData";

interface ProjectCardProps {
    project: Project;
    index: number;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project, index }) => {
    const cardRef = useRef<HTMLDivElement>(null);
    const isLastInRowDesktop = (index + 1) % 3 === 0;
    const isLastInRowTablet = (index + 1) % 2 === 0;
    useGSAP(
        () => {
            if (!cardRef.current) return;
            gsap.fromTo(
                cardRef.current,
                { opacity: 0, y: 40, scale: 1 },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.7,
                    delay: index * 0.1,
                    ease: "power3.out",
                }
            );
        },
        { scope: cardRef, dependencies: [project.id] }
    );

    const handleMouseEnter = () => {
        if (!cardRef.current) return;
        gsap.to(cardRef.current, {
            y: -6,
            duration: 0.35,
            ease: "power2.out",
        });
        const img = cardRef.current.querySelector(".card-image");
        if (img) {
            gsap.to(img, { scale: 1, duration: 0.6, ease: "power2.out" });
        }
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        gsap.to(cardRef.current, {
            y: 0,
            duration: 0.35,
            ease: "power2.out",
        });
        const img = cardRef.current.querySelector(".card-image");
        if (img) {
            gsap.to(img, { scale: 1, duration: 0.6, ease: "power2.out" });
        }
    };

    return (
        <div
            ref={cardRef}
            className="group cursor-pointer mx-auto flex flex-col items-center"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            <div className="relative flex items-center h-[460px]  md:h-[292px] w-full">

                <div className="relative w-[490px] h-full">
                    <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        className="card-image w-full h-full object-cover will-change-transform"
                    />
                    {/* <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" /> */}
                </div>

                <div
                    className={`w-[1px] h-full bg-gray-300 absolute -right-3 transition-opacity z-10
                        ${isLastInRowDesktop ? 'lg:opacity-0' : 'lg:opacity-100'}
                        ${isLastInRowTablet ? 'sm:max-lg:opacity-0' : 'sm:max-lg:opacity-100'}
                        max-sm:hidden 
                    `}
                />
            </div>

            <div className="pt-4 pb-2 w-full text-center">
                <h3 className="text-base md:text-lg font-serif text-[var(--color-primary)] group-hover:text-[var(--color-accent)] transition-colors duration-300">
                    {project.title}
                </h3>
            </div>
        </div>
    );

};

export default ProjectCard;