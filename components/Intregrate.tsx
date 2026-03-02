"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import { integrateData } from "@/lib/integrateData";
import AOS from "aos";
import "aos/dist/aos.css";

const Intregrate = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false, // Set to true if you want it only to play once
            mirror: true, // Whether elements should animate out while scrolling past them
        });
    }, []);

    return (
        <section className="w-full bg-[var(--background)] px-4 md:px-0 md:py-20 py-10 overflow-hidden">
            <div
                className="text-center max-w-[888px] w-full mx-auto mb-16 md:mb-24"
                data-aos="fade-up"
            >
                <h2 className="text-lg md:text-[25px] font-serif text-[var(--foreground)] mb-6">
                    Living, Working & Leisure Perfectly Harmonized
                </h2>
                <p className="md:text-base text-sm text-[var(--paragraph)] font-serif leading-[25px]">
                    At TDI City Kundli, the fusion of residential luxury, dynamic commercial spaces, and enriching lifestyle amenities creates an all-encompassing living experience. This thoughtfully crafted township brings together all aspects of modern life, providing residents with an integrated community that offers unparalleled convenience, tranquility, and vibrancy.
                </p>
            </div>
            <div className="max-w-[1140px] w-full mx-auto">
                {/* Header with AOS */}

                {/* Rows */}
                <div className="flex flex-col gap-12 md:gap-24">
                    {integrateData.map((item) => (
                        <div
                            key={item.id}
                            className={`flex flex-col md:flex-row items-center gap-8 md:gap-16 ${item.direction === "right" ? "md:flex-row-reverse" : ""
                                }`}
                        >
                            {/* Image Side - Slides in from its respective side */}
                            <div
                                className="w-full md:w-1/2 relative h-[375px] overflow-hidden"
                                //    data-aos="reveal-clip"
                                data-aos={item.direction === "right" ? "reveal-left" : "reveal-right"}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover object-bottom imgAnimation"
                                />
                            </div>

                            {/* Content Side - Fades up */}
                            <div
                                className="w-full md:w-1/2 flex flex-col items-center justify-center text-center md:text-left"
                                data-aos="fade-up"
                                data-aos-delay="200"
                            >
                                <h3 className="text-lg md:text-xl text-center font-serif text-[var(--foreground)] mb-4 md:mb-6 w-full">
                                    {item.title}
                                </h3>
                                <p className="text-sm md:text-base max-w-[555px] text-[var(--paragraph)] text-center font-serif leading-[24px]">
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