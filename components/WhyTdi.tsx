"use client";
import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ArrowRight } from "lucide-react";

const reasons = [
    {
        id: 1,
        title: "Close Proximity To Delhi NCR",
        image: "/assets/images/long.png",
    },
    {
        id: 2,
        title: "The Next Gurugram Of The North",
        image: "/assets/projects/espania.png",
    },
    {
        id: 3,
        title: "Better Air Quality & Open Environments",
        image: "/assets/images/long.png",
    },
    {
        id: 4,
        title: "Reduced Traffic & Planned Movement",
        image: "/assets/projects/espania.png",
    },
    {
        id: 5,
        title: "Connectivity That Shapes The Future",
        image: "/assets/images/long.png",
    },
    {
        id: 6,
        title: "KMP Expressway (Kundli–Manesar–Palwal)",
        image: "/assets/projects/espania.png",
    },
    {
        id: 7,
        title: "KGP Expressway (Kundli–Ghaziabad–Palwal)",
        image: "/assets/images/long.png",
    },
    {
        id: 8,
        title: "RRTS & Metro Connectivity",
        image: "/assets/projects/espania.png",
    },
];

// Default active index
const DEFAULT_ACTIVE = 1;

const WhyTdi = () => {
    const [activeIndex, setActiveIndex] = useState(DEFAULT_ACTIVE);
    const imageRefs = useRef<(HTMLDivElement | null)[]>([]);
    const zIndexCounter = useRef(1);

    const handleHover = (index: number) => {
        if (index === activeIndex) return;

        const nextImage = imageRefs.current[index];
        const currentImage = imageRefs.current[activeIndex];

        if (nextImage) {
            // Bring next image to top
            zIndexCounter.current += 1;
            nextImage.style.zIndex = zIndexCounter.current.toString();

            // Animate Clip Path (Reveal from bottom)
            gsap.fromTo(
                nextImage,
                { clipPath: "inset(100% 0 0 0)" },
                {
                    clipPath: "inset(0% 0 0 0)",
                    duration: 1, // Slightly faster for responsiveness
                    ease: "power3.inOut", // Smooth but responsive
                    overwrite: true
                }
            );

            // Animate Inner Image (Scale down effect for premium feel)
            const innerImg = nextImage.querySelector("img");
            if (innerImg) {
                gsap.fromTo(
                    innerImg,
                    { scale: 1.3 },
                    {
                        scale: 1,
                        duration: 1.2,
                        ease: "power3.out",
                        overwrite: true
                    }
                );
            }
        }

        setActiveIndex(index);
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
                                onMouseEnter={() => handleHover(index)}
                                data-aos="fade-right"
                                data-aos-delay={100 + index * 50}
                            >
                                {/* Row content */}
                                <div className="flex items-center justify-between py-4 md:py-6 px-1 transition-all duration-300">
                                    <span
                                        className="text-sm lg:text-[20px] font-normal font-serif transition-colors duration-300 pr-4"
                                        style={{
                                            color: isActive ? "#D9991F" : "#232E5A99",
                                            fontFamily: "Georgia, serif",
                                        }}
                                    >
                                        {item.title}
                                    </span>
                                </div>

                                {/* Bottom border line */}
                                <div
                                    className="w-full h-px transition-colors duration-300"
                                    style={{ backgroundColor: isActive ? "#D9991F" : "#DBDBDB" }}
                                />
                            </div>
                        );
                    })}
                </div>




                {/* Right: Images */}
                <div className="hidden lg:block lg:w-1/2 lg:sticky lg:top-24 order-1 lg:order-2">

                    <div
                        className="relative w-full overflow-hidden"
                        style={{ aspectRatio: "1/1" }}
                    >
                        {reasons.map((item, index) => (
                            <div
                                key={item.id}
                                ref={(el) => {
                                    imageRefs.current[index] = el;
                                }}
                                className="absolute inset-0 w-full h-full"
                                style={{
                                    clipPath: index === activeIndex ? "inset(0% 0 0 0)" : "inset(100% 0 0 0)",
                                    zIndex: index === activeIndex ? 1 : 0
                                }}
                            >
                                <Image
                                    src={item.image}
                                    alt={item.title}
                                    fill
                                    className="object-cover"
                                    priority={index === DEFAULT_ACTIVE}
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section >
    );
};

export default WhyTdi;