"use client";

import React, { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const TownShip = () => {
    const containerRef = useRef<HTMLElement>(null);
    const numberRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
        });

        tl.fromTo(
            numberRef.current,
            { opacity: 0, y: 50, scale: 0.9 },
            { opacity: 1, y: 0, scale: 1, duration: 1, ease: "power3.out" }
        ).fromTo(
            textRef.current?.children || [],
            { opacity: 0, y: 30 },
            { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power2.out" },
            "-=0.5"
        );
    }, { scope: containerRef });

    return (
        <section
            ref={containerRef}
            className="w-full bg-[var(--white)] py-20 flex flex-col items-center justify-center text-center overflow-hidden"
        >
            {/* Statistic Container */}
            <div ref={numberRef} className="flex items-end justify-center leading-none select-none relative">
                <span className="font-secondary flex items-center gap-2 text-[var(--color-accent)] text-[60px] md:text-[80px] lg:text-[100px] font-normal">
                    1100+
                </span>

                <span className="text-[var(--foreground)] text-xs md:text-sm font-serif uppercase tracking-widest">
                    Acres
                </span>
            </div>

            {/* Text Content */}
            <div ref={textRef} className="mt-8 flex flex-col items-center gap-2">
                <h2 className="text-2xl md:text-4xl lg:text-5xl font-serif text-[var(--foreground)] tracking-wide">
                    One Of NCR’s Largest Integrated
                </h2>
                <h3 className="text-2xl md:text-4xl lg:text-5xl font-serif text-[var(--foreground)] tracking-wide">
                    Townships
                </h3>
            </div>
        </section>
    );
};

export default TownShip;
