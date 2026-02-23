"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, SplitText);
}

interface ClubHouseItem {
    title: string;
    image: string;
}

const CLUBHOUSE_ITEMS: ClubHouseItem[] = [
    { title: "Banquet Hall", image: "/assets/images/clubhouse/banquethall.png" },
    { title: "Lounge", image: "/assets/images/clubhouse/lounge.png" },
    { title: "Spa", image: "/assets/images/clubhouse/spa.png" },
    { title: "Café", image: "/assets/images/clubhouse/cafe.png" },
    { title: "Co-Working", image: "/assets/images/clubhouse/coworking.png" },
    { title: "Meeting Room", image: "/assets/images/clubhouse/meeting-room.png" },
    { title: "Sauna", image: "/assets/images/clubhouse/sauna.png" },
];

export default function ClubHouse() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
        });

        // Heading animation
        tl.add(() => {
            if (!headingRef.current) return;
            try {
                const split = new SplitText(headingRef.current, { type: "words" });
                gsap.from(split.words, {
                    y: "100%",
                    opacity: 0,
                    duration: 1,
                    ease: "power4.out",
                    stagger: 0.05,
                });
            } catch {
                gsap.from(headingRef.current, {
                    y: 30,
                    opacity: 0,
                    duration: 1,
                    ease: "power3.out",
                });
            }
        });
        tl.from(
            descRef.current,
            {
                y: 20,
                opacity: 0,
                duration: 0.9,
                ease: "power3.out",
            },
            "-=0.6"
        );

        tl.from(
            trackRef.current,
            {
                y: 60,
                opacity: 0,
                duration: 1,
                ease: "power3.out",
            },
            "-=0.5"
        );
    }, { scope: sectionRef });

    const marqueeItems = [...CLUBHOUSE_ITEMS, ...CLUBHOUSE_ITEMS];

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-20 md:py-28 overflow-hidden"
            style={{ backgroundColor: "var(--color-background, #F8FBFF)" }}
        >
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-14 md:mb-20">
                <div className="text-center max-w-4xl mx-auto">
                    <h2
                        ref={headingRef}
                        className="font-serif text-primary  text-xl md:text-[25px] font-normal mb-5 overflow-hidden"
                        style={{ perspective: "600px" }}
                    >
                        Clubhouse Amenities
                    </h2>
                    <p
                        ref={descRef}
                        className="text-paragraph font-serif text-sm md:text-base"
                    >
                        At TDI City Kundli, amenities are not add-ons but an integral part of
                        township planning. From wellness and recreation to safety and
                        convenience, every facility contributes to a lifestyle that feels
                        thoughtful, complete, and enduring.
                    </p>
                </div>
            </div>

            <div
                className="relative w-full overflow-hidden"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
            >
                <div
                    ref={trackRef}
                    className="clubhouse-marquee-track"
                    style={{
                        animationPlayState: isPaused ? "paused" : "running",
                    }}
                >
                    {marqueeItems.map((item, i) => (
                        <ClubHouseCard key={`${item.title}-${i}`} item={item} />
                    ))}
                </div>
            </div>

            <style jsx>{`
                .clubhouse-marquee-track {
                    display: flex;
                    gap: 16px;
                    width: max-content;
                    animation: clubhouse-scroll 40s linear infinite;
                    will-change: transform;
                }

                @keyframes clubhouse-scroll {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                @media (min-width: 768px) {
                    .clubhouse-marquee-track {
                        gap: 6px;
                    }
                }
            `}</style>
        </section>
    );
}

function ClubHouseCard({ item }: { item: ClubHouseItem }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    const handleMouseEnter = () => {
        gsap.to(imgRef.current, {
            scale: 1.08,
            duration: 0.8,
            ease: "power3.out",
        });
        gsap.to(overlayRef.current, {
            opacity: 0.5,
            duration: 0.5,
            ease: "power2.out",
        });
        gsap.to(textRef.current, {
            scale: 1.05,
            letterSpacing: "0.12em",
            duration: 0.5,
            ease: "power3.out",
        });
    };

    const handleMouseLeave = () => {
        gsap.to(imgRef.current, {
            scale: 1,
            duration: 0.8,
            ease: "power3.out",
        });
        gsap.to(overlayRef.current, {
            opacity: 0.3,
            duration: 0.5,
            ease: "power2.out",
        });
        gsap.to(textRef.current, {
            scale: 1,
            letterSpacing: "0.08em",
            duration: 0.5,
            ease: "power3.out",
        });
    };

    return (
        <div
            ref={cardRef}
            className="relative flex-shrink-0 cursor-pointer overflow-hidden group"
            style={{
                width: "clamp(280px, 28vw, 420px)",
                aspectRatio: "3 / 4",
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Image */}
            <div ref={imgRef} className="absolute inset-0 will-change-transform">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 75vw, (max-width: 1024px) 35vw, 28vw"
                    quality={90}
                />
            </div>

            <div
                ref={overlayRef}
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.3) 100%)",
                    opacity: 0.3,
                }}
            />

            <div className="absolute inset-x-0 top-0 flex justify-center pt-6 md:pt-12 z-10">
                <span
                    ref={textRef}
                    className="font-serif text-white text-base md:text-lg lg:text-xl font-normal select-none"
                    style={{
                        textShadow: "0 2px 12px rgba(0,0,0,0.35)",
                    }}
                >
                    {item.title}
                </span>
            </div>
        </div>
    );
}
