"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { integrateData } from "@/lib/integrateData";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const Intregrate = () => {
    const containerRef = useRef<HTMLElement>(null);

    useGSAP(() => {
        const sections = gsap.utils.toArray<HTMLElement>(".integrate-row");

        sections.forEach((section) => {
            gsap.fromTo(
                section.children,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    stagger: 0.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: section,
                        start: "top 80%",
                        toggleActions: "play none none reverse",
                    },
                }
            );
        });
    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="w-full bg-[var(--background)] py-20 overflow-hidden">
            <div className="max-w-7xl mx-auto">
                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
                    <h2 className="text-2xl md:text-[25px] font-serif text-[var(--foreground)] mb-6">
                        Living, Working & Leisure — Thoughtfully Integrated
                    </h2>
                    <p className="text-base text-[var(--paragraph)] font-serif leading-[24px]">
                        At TDI City Kundli, residential comfort, commercial vitality, and lifestyle amenities come together within a carefully planned township, creating a balanced environment for everyday living.
                    </p>
                </div>

                {/* Rows */}
                <div className="flex flex-col gap-12 md:gap-24">
                    {integrateData.map((item) => (
                        <div
                            key={item.id}
                            className={`integrate-row flex flex-col md:flex-row items-center gap-8 md:gap-16 ${item.direction === "right" ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Image Side */}
                            <div className="w-full md:w-1/2 relative h-[375px] overflow-hidden">
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover object-bottom w-[537px] h-[375px]"
                                />
                            </div>

                            {/* Content Side */}
                            <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center md:text-left">
                                <h3 className="text-xl text-center font-serif text-[var(--foreground)] mb-4 md:mb-6 w-full">
                                    {item.title}
                                </h3>
                                <p className="text-base max-w-[555px] text-[var(--paragraph)] text-center font-serif  leading-[24px]">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Intregrate;
