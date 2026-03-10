"use client";
import React, { useRef, useState, useCallback } from "react";
// import Image from "next/image";
import { gsap } from "gsap";

const reasons = [
    {
        id: 1,
        title: "Close Proximity To Delhi NCR",
        image: "/assets/images/why-tdi/6.png",
    },
    {
        id: 2,
        title: "The Next Gurugram Of The North",
        image: "/assets/images/why-tdi/7.0.png",
    },
    {
        id: 3,
        title: "Better Air Quality & Open Environments",
        image: "/assets/images/why-tdi/1.png",
    },
    {
        id: 4,
        title: "Reduced Traffic & Planned Movement",
        image: "/assets/images/why-tdi/8.png",
    },
    {
        id: 5,
        title: "Connectivity That Shapes The Future",
        image: "/assets/images/why-tdi/3.png",
    },
    {
        id: 6,
        title: "KMP Expressway (Kundli–Manesar–Palwal)",
        image: "/assets/images/why-tdi/4.png",
    },
    {
        id: 7,
        title: "KGP Expressway (Kundli–Ghaziabad–Palwal)",
        image: "/assets/images/why-tdi/5.png",
    },
    {
        id: 8,
        title: "RRTS & Metro Connectivity",
        image: "/assets/images/why-tdi/2.png",
    },
];

// Default active index
const DEFAULT_ACTIVE = 0;
const initialClipPaths = [
    "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
    "polygon(33.33% 0%, 33.33% 0%, 33.33% 0%, 33.33% 0%)",
    "polygon(66.66% 0%, 66.66% 0%, 66.66% 0%, 66.66% 0%)",
    "polygon(0% 33.33%, 0% 33.33%, 0% 33.33%, 0% 33.33%)",
    "polygon(33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%, 33.33% 33.33%)",
    "polygon(66.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%, 66.66% 33.33%)",
    "polygon(0% 66.66%, 0% 66.66%, 0% 66.66%, 0% 66.66%)",
    "polygon(33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%, 33.33% 66.66%)",
    "polygon(66.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%, 66.66% 66.66%)",
];

const finalClipPaths = [
    "polygon(0% 0%, 33.33% 0%, 33.33% 33.33%, 0% 33.33%)",
    "polygon(33.33% 0%, 66.66% 0%, 66.66% 33.33%, 33.33% 33.33%)",
    "polygon(66.66% 0%, 100% 0%, 100% 33.33%, 66.66% 33.33%)",
    "polygon(0% 33.33%, 33.33% 33.33%, 33.33% 66.66%, 0% 66.66%)",
    "polygon(33.33% 33.33%, 66.66% 33.33%, 66.66% 66.66%, 33.33% 66.66%)",
    "polygon(66.66% 33.33%, 100% 33.33%, 100% 66.66%, 66.66% 66.66%)",
    "polygon(0% 66.66%, 33.33% 66.66%, 33.33% 100%, 0% 100%)",
    "polygon(33.33% 66.66%, 66.66% 66.66%, 66.66% 100%, 33.33% 100%)",
    "polygon(66.66% 66.66%, 100% 66.66%, 100% 100%, 66.66% 100%)",
];
const revealOrder = [[0], [1, 3], [2, 4, 6], [5, 7], [8]];
const WhyTdi = () => {
    const [activeIndex, setActiveIndex] = useState(DEFAULT_ACTIVE);
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    // const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
    // const sectionRef = useRef<HTMLElement>(null);
    const visualWrapRef = useRef<HTMLDivElement>(null);
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    const handleHover = useCallback(
        (index: number) => {
            if (!visualWrapRef.current) return;

            // Kill any running timeline
            if (timelineRef.current) {
                timelineRef.current.kill();
            }

            const item = reasons[index];
            const masks = visualWrapRef.current.querySelectorAll<HTMLDivElement>(".mask");

            // Update background image on all masks
            masks.forEach((mask) => {
                mask.style.backgroundImage = `url(${item.image})`;
            });

            // Reset all masks to collapsed clip-paths
            masks.forEach((mask, i) => {
                gsap.set(mask, { clipPath: initialClipPaths[i] });
            });

            // Animate the diagonal reveal
            const tl = gsap.timeline();
            timelineRef.current = tl;

            revealOrder.forEach((group, groupIndex) => {
                tl.to(
                    group.map((idx) => masks[idx]),
                    {
                        clipPath: (_i: number, el: Element) => {
                            const maskIndex = Array.from(masks).indexOf(el as HTMLDivElement);
                            return finalClipPaths[maskIndex];
                        },
                        duration: 0.6,
                        ease: "power4.out",
                        stagger: 0.05,
                    },
                    groupIndex * 0.08
                );
            });

            setActiveIndex(index);
        },
        [] // remove activeIndex dependency since we no longer check it
    );

    const onHoverEnter = (index: number) => {
        setHoveredIndex(index);
        handleHover(index);
    };

    const onHoverLeave = () => {
        setHoveredIndex(null);
    };
    return (
        <section className="w-full bg-white py-16 md:py-20 px-4">
            {/* Heading */}
            <div className="text-center mb-12 md:mb-16">
                <h2
                    className="text-center text-lg md:text-[25px] font-normal font-serif tracking-tight"
                >
                    Why Kundli Is The New New Delhi
                </h2>
            </div>

            {/* Two-column layout */}
            <div className="containers w-full mx-auto flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">

                {/* Left: List */}
                <div className="w-full lg:w-1/2 flex flex-col order-2 lg:order-1">
                    {reasons.map((item, index) => {
                        const isActive = activeIndex === index;
                        return (
                            <div
                                key={item.id}
                                className="group relative cursor-pointer"
                                onMouseEnter={() => onHoverEnter(index)}
                                onMouseLeave={onHoverLeave}
                                data-aos="fade-right"
                                data-aos-delay={100 + index * 50}
                            >
                                {/* Row content */}
                                <div className="flex items-center justify-between py-4 md:py-6 px-1 transition-all duration-300">
                                    <span
                                        className="text-sm lg:text-[20px] font-normal font-serif transition-colors duration-300 pr-4"
                                        style={{
                                            color: hoveredIndex === index ? "#D9991F" : "#232E5A99",
                                            fontFamily: "Georgia, serif",
                                        }}
                                    >
                                        {item.title}
                                    </span>
                                </div>

                                {/* Bottom border line */}
                                <div
                                    className="w-full h-px transition-colors duration-300"
                                    style={{ backgroundColor: hoveredIndex === index ? "#D9991F" : "#DBDBDB" }}
                                />
                            </div>
                        );
                    })}
                </div>




                {/* Right: Images */}
                <div className="hidden lg:block lg:w-1/2 lg:sticky lg:top-24 order-1 lg:order-2">

                    <div
                        ref={visualWrapRef}
                        className="relative h-[360px] sm:h-[400px] w-[550px] sm:w-[560px] md:h-[650px] md:w-[650px] lg:h-[640px] lg:w-[650px] overflow-hidden"
                    >
                        {[...Array(9)].map((_, i) => (
                            <div
                                key={i}
                                className="mask absolute inset-0"
                                style={{
                                    backgroundImage: `url(${reasons[activeIndex].image})`,
                                    backgroundSize: "contain",
                                    backgroundPosition: "center",
                                    backgroundRepeat: "no-repeat",
                                    clipPath: finalClipPaths[i],
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </section >
    );
};

export default WhyTdi;