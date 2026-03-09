"use client";

import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function Designed() {
    const sectionRef = useRef<HTMLElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
            },
        });

        tl.from(titleRef.current, {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out",
        }).from(
            descRef.current,
            {
                y: 25,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            },
            "-=0.7"
        );
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-20 md:py-28 overflow-hidden bg-[var(--color-background)]"

        >
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-4xl mx-auto flex flex-col items-center">
                    <h2
                        ref={titleRef}
                        className="font-serif text-primary uppercase text-xl md:text-[25px] font-normal mb-6"
                    >
                        Designed for a Life of Harmony and Luxury
                    </h2>
                    <p
                        ref={descRef}
                        className="text-paragraph font-serif text-sm md:text-base leading-relaxed"
                    >
                        At TDI City Kundli, every amenity is crafted with precision to enrich the everyday experience. From lush green spaces to world-class recreational facilities, the township is designed to nurture both mind and body. Each element, from wellness zones to social hubs, is thoughtfully placed to promote balance, connection, and tranquility, ensuring a lifestyle that is as seamless as it is luxurious.
                    </p>
                </div>
            </div>
        </section>
    );
}
