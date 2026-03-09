"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { initGlobalPAnimation } from "@/lib/gsapGlobal";

interface SectionIntroProps {
    title: string;
    description: string;
    showBirds?: boolean;
    leftBirdSrc?: string;
    rightBirdSrc?: string;
    className?: string;
}

const SectionIntro = ({
    title,
    description,
    showBirds = true,
    leftBirdSrc = "/assets/images/leftbird.png",
    rightBirdSrc = "/assets/images/rightbird.png",
    className = "",
}: SectionIntroProps) => {
    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (sectionRef.current) {
            initGlobalPAnimation(sectionRef.current);
        }
    }, []);

    return (
        <section
            ref={sectionRef}
            className={`relative w-full bg-[var(--color-secondary-bg)] py-20 md:py-32 px-4 md:px-0 overflow-hidden ${className}`}
        >
            {showBirds && (
                <div className="absolute md:top-1/2 -translate-y-1/2 left-10 w-24 h-24 md:w-40 md:h-40 pointer-events-none select-none">
                    <Image src={leftBirdSrc} alt="" fill className="object-contain" />
                </div>
            )}

            <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col items-center gap-3 md:gap-6 md:px-0">
                <h2 className="text-xl md:text-2xl font-serif text-[var(--foreground)]">
                    {title}
                </h2>
                <p className="text-sm md:text-base text-[var(--paragraph)] font-serif leading-relaxed">
                    {description}
                </p>
            </div>

            {showBirds && (
                <div className="absolute -bottom-6 md:top-1/2 -translate-y-1/2 right-10 w-24 h-24 md:w-40 md:h-40 pointer-events-none select-none">
                    <Image src={rightBirdSrc} alt="" fill className="object-contain" />
                </div>
            )}
        </section>
    );
};

export default SectionIntro;