"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { initGlobalPAnimation } from "@/lib/gsapGlobal";

const AboutTdi = () => {

    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (sectionRef.current) {
            initGlobalPAnimation(sectionRef.current);
        }
    }, []);
    return (
        <section ref={sectionRef} className="relative w-full bg-[var(--color-secondary-bg)] py-20 md:py-32 px-4 md:px-0 overflow-hidden">
            <div className="absolute md:top-1/2 -translate-y-1/2 left-10 w-24 h-24 md:w-40 md:h-40  pointer-events-none select-none">
                <Image src="/assets/images/leftbird.png" alt="Decorative Bird Left" fill className="object-contain" />
            </div>
            <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col max-w-4xl items-center gap-3 md:gap-6 md:px-0 ">
                <h2 className="text-xl md:text-2xl font-serif text-[var(--foreground)]">
                    Tdi City Kundli
                </h2>
                <p className="text-sm md:text-base text-[var(--paragraph)] font-serif leading-relaxed ">
                    Spread across 1100+ acres, TDI City Kundli is a thoughtfully envisioned integrated township that redefines modern living. Designed as a self sustained urban ecosystem, it seamlessly brings together residential, commercial, and recreational spaces to offer a balanced lifestyle marked by comfort, convenience, and tranquility.
                </p>
            </div>
            <div className="absolute -bottom-6 md:top-1/2 -translate-y-1/2 right-10 w-24 h-24 md:w-40 md:h-40   pointer-events-none select-none">
                <Image src="/assets/images/rightbird.png" alt="Decorative Bird Right" fill className="object-contain" />
            </div>
        </section>
    );
};

export default AboutTdi;
