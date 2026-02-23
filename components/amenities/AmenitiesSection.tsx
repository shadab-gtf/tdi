"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, SplitText);
}

interface AmenityCard {
    title: string;
    image: string;
}

interface TabData {
    label: string;
    cards: AmenityCard[];
}

const TABS: TabData[] = [
    {
        label: "Wellness & Green Living",
        cards: [
            { title: "Landscaped Parks & Open Green Spaces", image: "/assets/images/amenities/landscap.png" },
            { title: "Walking And Jogging Tracks", image: "/assets/images/amenities/walk.png" },
            { title: "Yoga And Meditation Zones", image: "/assets/images/amenities/yoga.png" },
            { title: "Open-Air Seating And Shaded Courts", image: "/assets/images/amenities/sitting.png" },
        ],
    },
    {
        label: "Clubhouse & Recreation",
        cards: [
            { title: "Multi-Sport Clubhouse", image: "/assets/images/amenities/landscap.png" },
            { title: "Swimming Pool & Deck", image: "/assets/images/amenities/walk.png" },
            { title: "Indoor Games & Lounge", image: "/assets/images/amenities/yoga.png" },
            { title: "Badminton & Tennis Courts", image: "/assets/images/amenities/sitting.png" },
        ],
    },
    {
        label: "Family & Community Spaces",
        cards: [
            { title: "Children's Play Area", image: "/assets/images/amenities/landscap.png" },
            { title: "Community Hall & Events", image: "/assets/images/amenities/walk.png" },
            { title: "Senior Citizen Zone", image: "/assets/images/amenities/yoga.png" },
            { title: "Amphitheatre & Open Lawns", image: "/assets/images/amenities/sitting.png" },
        ],
    },
    {
        label: "Safety & Convenience",
        cards: [
            { title: "24/7 Gated Security", image: "/assets/images/amenities/landscap.png" },
            { title: "CCTV Surveillance Network", image: "/assets/images/amenities/walk.png" },
            { title: "Power Backup & Water Supply", image: "/assets/images/amenities/yoga.png" },
            { title: "Dedicated Parking Zones", image: "/assets/images/amenities/sitting.png" },
        ],
    },
];

export default function AmenitiesSection() {
    const [activeTab, setActiveTab] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const subtitleRef = useRef<HTMLSpanElement>(null);
    const lineRef = useRef<HTMLDivElement>(null);
    const tabsRef = useRef<HTMLDivElement>(null);
    const counterRef = useRef<HTMLSpanElement>(null);

    useGSAP(() => {
        // Decorative line draw
        gsap.set(lineRef.current, { scaleX: 0, transformOrigin: "left center" });

        // Subtitle: letter reveal with clip
        if (subtitleRef.current) {
            gsap.set(subtitleRef.current, { clipPath: "inset(0 100% 0 0)", opacity: 1 });
        }

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 75%",
                toggleActions: "play none none reverse",
            },
        });

        // Decorative top line
        tl.to(lineRef.current, {
            scaleX: 1,
            duration: 1.2,
            ease: "power4.inOut",
        })

            // Subtitle clip reveal
            .to(subtitleRef.current, {
                clipPath: "inset(0 0% 0 0)",
                duration: 0.9,
                ease: "power3.out",
            }, "-=0.8")

            // Heading: split by chars
            .add(() => {
                if (!headingRef.current) return;
                try {
                    const split = new SplitText(headingRef.current, { type: "lines,words" });
                    gsap.from(split.words, {
                        y: "110%",
                        opacity: 0,
                        rotateX: -40,
                        transformOrigin: "top center",
                        duration: 1,
                        ease: "power4.out",
                        stagger: 0.04,
                    });
                } catch {
                    gsap.from(headingRef.current, { y: 40, opacity: 0, duration: 1, ease: "power4.out" });
                }
            }, "-=0.5")

            // Tab bar slide in
            .from(tabsRef.current, {
                y: 24,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
            }, "-=0.6")

            // Cards: cinematic stagger entrance
            .from(".amenity-card", {
                y: 80,
                opacity: 0,
                clipPath: "inset(0 0 100% 0)",
                duration: 1.1,
                ease: "expo.out",
                stagger: { amount: 0.5, from: "start" },
            }, "-=0.4");

    }, { scope: sectionRef });

    const handleTabChange = useCallback((index: number) => {
        if (index === activeTab || isAnimating) return;
        setIsAnimating(true);

        const container = cardsContainerRef.current;
        const cards = container?.querySelectorAll(".amenity-card");

        if (!container || !cards) {
            setActiveTab(index);
            setIsAnimating(false);
            return;
        }

        // Exit: stagger cards upward with clip
        gsap.to(cards, {
            y: -40,
            opacity: 0,
            clipPath: "inset(0 0 100% 0)",
            duration: 0.4,
            ease: "power3.in",
            stagger: { amount: 0.18, from: "end" },
            onComplete: () => {
                setActiveTab(index);
                // Reset and enter
                requestAnimationFrame(() => {
                    const newCards = container.querySelectorAll(".amenity-card");
                    gsap.set(newCards, { y: 60, opacity: 0, clipPath: "inset(0 0 100% 0)" });
                    gsap.to(newCards, {
                        y: 0,
                        opacity: 1,
                        clipPath: "inset(0 0 0% 0)",
                        duration: 0.75,
                        ease: "expo.out",
                        stagger: { amount: 0.35, from: "start" },
                        onComplete: () => setIsAnimating(false),
                    });
                });
            },
        });

        // Also animate counter if visible
        if (counterRef.current) {
            gsap.to(counterRef.current, {
                innerText: String(index + 1).padStart(2, "0"),
                snap: { innerText: 1 },
                duration: 0.4,
                ease: "power2.out",
            });
        }
    }, [activeTab, isAnimating]);

    const currentCards = TABS[activeTab].cards;

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-20 md:py-32 overflow-hidden bg-[var(--white)]"
        >
            <div
                className="pointer-events-none absolute -top-1/4 -right-1/4 w-[60vw] h-[60vw] rounded-full opacity-[0.035]"
                style={{
                    background: "radial-gradient(circle, var(--color-accent, #b9a06e) 0%, transparent 70%)",
                    filter: "blur(60px)",
                }}
            />

            <div className="containers mx-auto px-4 sm:px-6 lg:px-8">

                {/* ── Header ── */}
                <div className="mb-12 md:mb-20 mx-auto max-w-5xl">

                    <div className="flex flex-col md:flex-row md:items-end md:justify-center gap-6">
                        <div className="text-center">
                            <span
                                ref={subtitleRef}
                                className="block font-serif uppercase text-center text-xs md:text-sm mb-4"
                                style={{ color: "var(--color-accent, #b9a06e)", opacity: 1 }}
                            >
                                Amenities
                            </span>
                            <h2
                                ref={headingRef}
                                className="font-serif text-[clamp(1.35rem,3.5vw,1.7rem)] leading-[1.3] max-w-5xl overflow-hidden"
                                style={{
                                    color: "var(--color-primary, #1a1a1a)",
                                    perspective: "600px",
                                }}
                            >
                                A balanced mix of recreation, wellness, and open spaces for everyday living.
                            </h2>

                        </div>
                    </div>
                </div>

                {/* ── Tabs ── */}
                <div ref={tabsRef} className="mb-12 md:mb-16">
                    <div className="hidden md:flex md:justify-around items-stretch gap-0 " style={{ borderColor: "#e8e8e8" }}>
                        {TABS.map((tab, i) => (
                            <button
                                key={tab.label}
                                onClick={() => handleTabChange(i)}
                                className="relative pb-4 pr-8 font-serif text-lg lg:text-[22px] transition-colors duration-300 cursor-pointer text-left group"
                                style={{
                                    color: activeTab === i
                                        ? "var(--color-primary, #1a1a1a)"
                                        : "var(--color-paragraph, #aaa)",
                                }}
                            >
                                <span
                                    className="block font-serif text-xs tracking-widest mb-1 transition-colors duration-300"
                                    style={{
                                        color: activeTab === i
                                            ? "var(--color-accent, #b9a06e)"
                                            : "transparent",
                                    }}
                                >
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                {tab.label}

                                <span
                                    className="absolute bottom-0 left-0 h-[2px] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
                                    style={{
                                        width: activeTab === i ? "calc(100% - 2rem)" : "0%",
                                        backgroundColor: "var(--color-accent, #b9a06e)",
                                    }}
                                />
                                <span
                                    className="absolute bottom-0 left-0 h-px transition-all duration-300 ease-out opacity-0 group-hover:opacity-100"
                                    style={{
                                        width: activeTab !== i ? "calc(100% - 2rem)" : "0%",
                                        backgroundColor: "var(--color-paragraph, #ccc)",
                                    }}
                                />
                            </button>
                        ))}
                    </div>

                    <div className="md:hidden -mx-4 px-4 overflow-x-auto scrollbar-hide">
                        <div className="flex gap-3 pb-2 min-w-max">
                            {TABS.map((tab, i) => (
                                <button
                                    key={tab.label}
                                    onClick={() => handleTabChange(i)}
                                    className="relative px-4 py-2.5 rounded-full font-serif text-xs whitespace-nowrap transition-all duration-300 cursor-pointer border"
                                    style={{
                                        color: activeTab === i
                                            ? "#fff"
                                            : "var(--color-paragraph, #888)",
                                        backgroundColor: activeTab === i
                                            ? "var(--color-primary, #1a1a1a)"
                                            : "transparent",
                                        borderColor: activeTab === i
                                            ? "var(--color-primary, #1a1a1a)"
                                            : "#e0e0e0",
                                    }}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                <div
                    ref={cardsContainerRef}
                    className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 lg:gap-8"
                >
                    {currentCards.map((card, i) => (
                        <AmenityCardItem
                            key={`${activeTab}-${i}`}
                            card={card}
                            index={i}
                            total={currentCards.length}
                            isLast={i === currentCards.length - 1}
                        />
                    ))}
                </div>

                <div className="mt-8 flex justify-center gap-2 md:hidden">
                    {TABS.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => handleTabChange(i)}
                            className="transition-all duration-300 rounded-full"
                            style={{
                                width: activeTab === i ? "24px" : "6px",
                                height: "6px",
                                backgroundColor: activeTab === i
                                    ? "var(--color-accent, #b9a06e)"
                                    : "#ddd",
                            }}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}

function AmenityCardItem({
    card,
    index,
    total,
    isLast,
}: {
    card: AmenityCard;
    index: number;
    total: number;
    isLast: boolean;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        if (!cardRef.current) return;
        gsap.to(imgRef.current, {
            scale: 1.07,
            duration: 0.9,
            ease: "power3.out",
        });
        gsap.to(overlayRef.current, {
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
        });
    };

    const handleMouseLeave = () => {
        gsap.to(imgRef.current, {
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
        });
        gsap.to(overlayRef.current, {
            opacity: 0,
            duration: 0.5,
            ease: "power2.out",
        });
    };

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(cardRef.current, {
            rotateY: x * 6,
            rotateX: -y * 6,
            duration: 0.5,
            ease: "power2.out",
            transformPerspective: 800,
        });
    };

    const handleMouseLeaveCard = () => {
        gsap.to(cardRef.current, {
            rotateY: 0,
            rotateX: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.5)",
        });
        handleMouseLeave();
    };

    return (
        <div
            ref={cardRef}
            className="amenity-card group flex flex-col cursor-pointer"
            style={{ willChange: "transform" }}
            onMouseEnter={handleMouseEnter}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeaveCard}
        >
            <div className="relative">
                <div className="relative aspect-[3/4] w-full overflow-hidden">
                    <div ref={imgRef} className="absolute inset-0">
                        <Image
                            src={card.image}
                            alt={card.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
                        />
                    </div>

                    <div
                        ref={overlayRef}
                        className="absolute inset-0 opacity-0"
                        style={{
                            background: "linear-gradient(135deg, rgba(255,255,255,0.08) 0%, rgba(185,160,110,0.15) 50%, transparent 100%)",
                            mixBlendMode: "overlay",
                        }}
                    />

                    <div
                        className="absolute bottom-0 left-0 right-0 h-1/3"
                        style={{
                            background: "linear-gradient(to top, rgba(0,0,0,0.18) 0%, transparent 100%)",
                        }}
                    />
                </div>
                {!isLast && (
                    <div
                        className="hidden lg:block absolute -right-4 z-50 top-0 h-full w-px translate-x-1/2"
                        style={{ backgroundColor: "#909090" }}
                    />
                )}

                <span
                    className="absolute top-3 right-3 font-serif text-[10px] tracking-widest px-2 py-1 rounded-full"
                    style={{
                        color: "rgba(255,255,255,0.8)",
                        backgroundColor: "rgba(0,0,0,0.25)",
                        backdropFilter: "blur(6px)",
                    }}
                >
                    {String(index + 1).padStart(2, "0")}
                </span>
            </div>

            <div className="mt-3 md:mt-4 flex items-start justify-between gap-2">
                <p
                    className="font-serif text-sm md:text-[15px] leading-snug flex-1"
                    style={{ color: "var(--color-primary, #1a1a1a)" }}
                >
                    {card.title}
                </p>
            </div>


        </div>
    );
}