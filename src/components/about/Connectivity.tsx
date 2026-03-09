"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import AOS from "aos";
import "aos/dist/aos.css";
gsap.registerPlugin(ScrollTrigger);
const integrateData = [
    {
        id: 1,
        title: "Unmatched Connectivity",
        description: "Strategically located along NH44 and UER 2, with proximity to the Kundli Metro Station and the upcoming RRTS corridor, TDI City Kundli ensures seamless connectivity to Delhi, IGI Airport, and key industrial hubs, making it a truly connected township.",
        image: "/assets/images/about/highway.png",
        direction: "left"
    },
    {
        id: 2,
        title: "A Harmonious Blend of Urban and Green Living",
        description: "Spanning over 1100+ acres, the township offers expansive green spaces alongside state-of-the-art infrastructure. TDI City Kundli’s design fosters a lifestyle that balances urban convenience with serene, green surroundings for a truly integrated living experience.",
        image: "/assets/images/about/women.jpg",
        direction: "right"
    },
    {
        id: 3,
        title: "A Future-Ready Township",
        description: "With modern residential, commercial, and recreational spaces, and close ties to major commercial developments like the Maruti Suzuki Plant, TDI City Kundli is not only ideal for today but also perfectly positioned for the region’s future growth, making it an investment in tomorrow’s lifestyle.",
        image: "/assets/images/about/flyover.png",
        direction: "left"
    }
];

const Connectivity = () => {
    const containerRef = useRef<HTMLElement>(null);
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
            mirror: true,
        });
    }, []);


    return (
        <section ref={containerRef} className="w-full bg-[var(--background)] py-20 overflow-hidden">
            <div className="max-w-[1140px] mx-auto px-4">
                {/* Header */}
                <div className="text-center max-w-4xl mx-auto mb-16 md:mb-24">
                    <h2 className="md:text-xl text-xs uppercase font-serif text-[#D9991F]! mb-2 md:mb-6">
                        why tdi city kundli
                    </h2>
                    <p className="md:text-[25px] text-lg text-primary! font-serif leading-[24px]">
                        A Legacy of Excellence, Where Tomorrow’s Vision Is Today’s Reality
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
                            <div className="w-full md:w-1/2 relative h-[375px] overflow-hidden"
                                data-aos={item.direction === "left" ? "reveal-right" : "reveal-left"}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover object-bottom w-[537px] h-[375px]"
                                />
                            </div>

                            {/* Content Side */}
                            <div className="w-full md:w-1/2 flex flex-col items-center justify-center text-center md:text-left"
                                data-aos={item.direction === "left" ? "reveal-bottom" : "reveal-bottom"}
                            >
                                <h3 className="md:text-xl text-lg text-center font-serif text-[var(--foreground)] mb-4 md:mb-6 w-full">
                                    {item.title}
                                </h3>
                                <p className="md:text-base text-sm max-w-[555px] text-[var(--paragraph)] text-center font-serif  leading-[24px]">
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

export default Connectivity;
