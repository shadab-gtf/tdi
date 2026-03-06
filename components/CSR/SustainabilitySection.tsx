"use client";

import React, { useRef, useState, useCallback } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface CardItem {
    title: string;
    description: string;
    image: string;
}

interface TabData {
    label: string;
    cards: CardItem[];
}

const TABS: TabData[] = [
    {
        label: "Environmental Commitment",
        cards: [
            {
                title: "Green & Open Landscapes",
                description:
                    "Extensive parks, tree-lined avenues, and landscaped greens improve air quality and create healthier living spaces for residents.",
                image: "/assets/csr/parks.png",
            },
            {
                title: "Water & Resource Management",
                description:
                    "Rainwater harvesting systems, efficient drainage planning, and sustainable water usage strategies support long-term ecological balance.",
                image: "/assets/csr/water.jpg",
            },
            {
                title: "Sustainable Urban Planning",
                description:
                    "Low-density layouts, improved traffic flow, and organized infrastructure reduce congestion and promote a cleaner environment.",
                image: "/assets/csr/urban.jpg",
            },
        ],
    },
    {
        label: "Community Development",
        cards: [
            {
                title: "Healthcare Initiatives",
                description:
                    "Free medical consultations, health checkup camps, and vaccination drives ensure community well-being and accessible healthcare for all.",
                image: "/assets/csr/checkup.jpg",
            },
            {
                title: "Disaster Relief Contributions",
                description:
                    "Active contributions to flood relief funds and partnering with organizations like RoundGlass for disaster relief initiatives.",
                image: "/assets/csr/contri.jpg",
            },
            {
                title: "Social Upliftment Programs",
                description:
                    "Blood donation camps, charitable dispensaries, and temple construction projects that strengthen community bonds.",
                image: "/assets/csr/skyline.jpg",
            },
        ],
    },
];

export default function SustainabilitySection() {
    const [activeTab, setActiveTab] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const cardsContainerRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const swiperRef = useRef<SwiperType | null>(null);
    const prevBtnRef = useRef<HTMLButtonElement>(null);
    const nextBtnRef = useRef<HTMLButtonElement>(null);

    const currentCards = TABS[activeTab].cards;
    const showArrows = currentCards.length > 3;

    // ── Entrance animation ──
    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                },
            });

            tl.from(headingRef.current, {
                y: 40,
                opacity: 0,
                duration: 1,
                ease: "power4.out",
            })
                .from(
                    ".sustainability-tab",
                    {
                        y: 20,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power3.out",
                        stagger: 0.1,
                    },
                    "-=0.5"
                )
                .from(
                    ".sustainability-card",
                    {
                        y: 80,
                        opacity: 0,
                        clipPath: "inset(0 0 100% 0)",
                        duration: 1.1,
                        ease: "expo.out",
                        stagger: { amount: 0.5, from: "start" },
                    },
                    "-=0.4"
                );
        },
        { scope: sectionRef }
    );

    // ── Tab switch animation ──
    const handleTabChange = useCallback(
        (index: number) => {
            if (index === activeTab || isAnimating) return;
            setIsAnimating(true);

            const container = cardsContainerRef.current;
            const cards = container?.querySelectorAll(".sustainability-card");

            if (!container || !cards) {
                setActiveTab(index);
                setIsAnimating(false);
                return;
            }

            gsap.to(cards, {
                y: -40,
                opacity: 0,
                clipPath: "inset(0 0 100% 0)",
                duration: 0.4,
                ease: "power3.in",
                stagger: { amount: 0.18, from: "end" },
                onComplete: () => {
                    setActiveTab(index);
                    if (swiperRef.current) {
                        swiperRef.current.slideTo(0, 0);
                    }
                    requestAnimationFrame(() => {
                        const newCards =
                            container.querySelectorAll(".sustainability-card");
                        gsap.set(newCards, {
                            y: 60,
                            opacity: 0,
                            clipPath: "inset(0 0 100% 0)",
                        });
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
        },
        [activeTab, isAnimating]
    );

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-16 md:py-28 overflow-hidden bg-white"
        >
            <div className="containers mx-auto">
                {/* ── Heading ── */}
                <h2
                    ref={headingRef}
                    className="text-center font-serif text-xl md:text-[25px] leading-[1.3] mb-10 md:mb-14"
                    style={{ color: "var(--color-primary)" }}
                >
                    Sustainability Rooted In Everyday Life
                </h2>

                {/* ── Tabs ── */}
                <div className="flex justify-center gap-8 md:gap-14 mb-10 md:mb-14">
                    {TABS.map((tab, i) => (
                        <button
                            key={tab.label}
                            onClick={() => handleTabChange(i)}
                            className="sustainability-tab relative pb-3 font-serif text-xs md:text-lg cursor-pointer transition-colors duration-300 group"
                            style={{
                                color:
                                    activeTab === i
                                        ? "var(--color-primary)"
                                        : "var(--color-paragraph)",
                            }}
                        >
                            {tab.label}
                            <span
                                className="absolute bottom-0 left-0 h-[2px] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
                                style={{
                                    width: activeTab === i ? "100%" : "0%",
                                    backgroundColor: "var(--color-accent)",
                                }}
                            />
                            <span
                                className="absolute bottom-0 left-0 h-px transition-all duration-300 ease-out opacity-0 group-hover:opacity-100"
                                style={{
                                    width: activeTab !== i ? "100%" : "0%",
                                    backgroundColor: "var(--color-paragraph)",
                                }}
                            />
                        </button>
                    ))}
                </div>

                {/* ── Swiper + Arrows ── */}
                <div className="relative" ref={cardsContainerRef}>
                    {/* Left Arrow – outside the swiper, vertically centered to image */}
                    {showArrows && (
                        <button
                            ref={prevBtnRef}
                            className="sustainability-nav-prev hidden md:flex absolute -left-5 lg:-left-12 top-[180px] -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full border border-[#bbb] text-[var(--color-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm"
                            aria-label="Previous"
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            >
                                <polyline points="15 18 9 12 15 6" />
                            </svg>
                        </button>
                    )}

                    <Swiper
                        modules={[Navigation]}
                        spaceBetween={24}
                        slidesPerView={1.15}
                        breakpoints={{
                            640: { slidesPerView: 2, spaceBetween: 24 },
                            1024: { slidesPerView: 3, spaceBetween: 32 },
                        }}
                        navigation={
                            showArrows
                                ? {
                                    prevEl: ".sustainability-nav-prev",
                                    nextEl: ".sustainability-nav-next",
                                }
                                : false
                        }
                        onSwiper={(swiper) => {
                            swiperRef.current = swiper;
                        }}
                        className="sustainability-swiper"
                    >
                        {currentCards.map((card, i) => (
                            <SwiperSlide key={`${activeTab}-${i}`}>
                                <div className="sustainability-card flex flex-col">
                                    {/* Image – 383 × 360 ratio */}
                                    <div
                                        className="relative w-full overflow-hidden group"
                                        style={{
                                            aspectRatio: "383 / 360",
                                        }}
                                    >
                                        <Image
                                            src={card.image}
                                            alt={card.title}
                                            fill
                                            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                                            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 383px"
                                        />
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                            style={{
                                                background:
                                                    "linear-gradient(to top, rgba(0,0,0,0.15) 0%, transparent 60%)",
                                            }}
                                        />
                                    </div>

                                    {/* Text */}
                                    <div className="mt-5 text-center px-2">
                                        <h3
                                            className="font-serif text-base md:text-lg mb-2"
                                            style={{
                                                color: "var(--color-primary)",
                                            }}
                                        >
                                            {card.title}
                                        </h3>
                                        <p
                                            className="font-serif text-xs md:text-sm leading-relaxed"
                                            style={{
                                                color: "var(--color-paragraph)",
                                            }}
                                        >
                                            {card.description}
                                        </p>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>

                    {/* Right Arrow – outside the swiper, vertically centered to image */}
                    {showArrows && (
                        <button
                            ref={nextBtnRef}
                            className="sustainability-nav-next hidden md:flex absolute -right-5 lg:-right-12 top-[180px] -translate-y-1/2 z-10 w-10 h-10 items-center justify-center rounded-full border border-[#bbb] text-[var(--color-primary)] hover:border-[var(--color-accent)] hover:text-[var(--color-accent)] transition-all duration-300 cursor-pointer bg-white/80 backdrop-blur-sm"
                            aria-label="Next"
                        >
                            <svg
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                            >
                                <polyline points="9 18 15 12 9 6" />
                            </svg>
                        </button>
                    )}
                </div>
            </div>
        </section>
    );
}
