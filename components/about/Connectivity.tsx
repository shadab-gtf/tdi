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
        title: "Close to Delhi, Yet Clearly Ahead",
        description: "Kundli’s proximity to North Delhi ensures seamless access to the capital while avoiding congestion, offering lower traffic density, better air quality, and a healthier, more balanced urban lifestyle.",
        image: "/assets/images/about/highway.png",
        direction: "left"
    },
    {
        id: 2,
        title: "Cleaner Air, Healthier Living",
        description: "Lower density development, open green buffers, and reduced traffic pressure contribute to comparatively better air quality in the region—supporting a healthier everyday environment away from inner-city pollution.",
        image: "/assets/images/about/women.jpg",
        direction: "right"
    },
    {
        id: 3,
        title: "Connectivity That Works Every Day",
        description: "Major corridors including UER-II, KMP, KGP, upcoming RRTS, and Metro links reduce travel time, ease congestion, and enable smoother, more efficient movement across Delhi NCR.",
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
                        City Shaped by Smart Connectivity
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
