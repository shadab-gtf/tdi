"use client";

import React, { useRef, useState, useCallback } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import OnlineNews from "./OnlineNews";
import OfflineNewspaper from "./OfflineNewspaper";
import ProjectUpdates from "./ProjectUpdates";
import PressKit from "./PressKit";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface TabConfig {
    label: string;
    component: React.ComponentType;
}

const TABS: TabConfig[] = [
    { label: "Online News", component: OnlineNews },
    { label: "Offline Newspaper", component: OfflineNewspaper },
    { label: "Project Updates", component: ProjectUpdates },
    { label: "Press Kit", component: PressKit },
];

export default function PressSection() {
    const [activeTab, setActiveTab] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const tabsRef = useRef<HTMLDivElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);

    // ── Scroll-triggered entrance ──
    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
        });

        tl.from(headingRef.current, {
            y: 30,
            opacity: 0,
            duration: 0.8,
            ease: "power3.out",
        })
            .from(
                tabsRef.current,
                {
                    y: 24,
                    opacity: 0,
                    duration: 0.7,
                    ease: "power3.out",
                },
                "-=0.4"
            )
            .from(
                contentRef.current,
                {
                    y: 40,
                    opacity: 0,
                    duration: 0.8,
                    ease: "power3.out",
                },
                "-=0.3"
            );
    }, { scope: sectionRef });

    // ── Tab switch animation (same pattern as AmenitiesSection) ──
    const handleTabChange = useCallback(
        (index: number) => {
            if (index === activeTab || isAnimating) return;
            setIsAnimating(true);

            const container = contentRef.current;
            if (!container) {
                setActiveTab(index);
                setIsAnimating(false);
                return;
            }

            const cards = container.querySelectorAll(".press-card, .press-tab-content");

            // Exit animation: fade-and-slide up with clip
            gsap.to(cards, {
                y: -30,
                opacity: 0,
                duration: 0.35,
                ease: "power3.in",
                stagger: { amount: 0.12, from: "end" },
                onComplete: () => {
                    setActiveTab(index);

                    // Enter animation: slide up and fade in
                    requestAnimationFrame(() => {
                        const newContent = container.querySelectorAll(
                            ".press-card, .press-tab-content"
                        );
                        gsap.set(newContent, { y: 50, opacity: 0 });
                        gsap.to(newContent, {
                            y: 0,
                            opacity: 1,
                            duration: 0.6,
                            ease: "expo.out",
                            stagger: { amount: 0.25, from: "start" },
                            onComplete: () => setIsAnimating(false),
                        });
                    });
                },
            });
        },
        [activeTab, isAnimating]
    );

    const ActiveComponent = TABS[activeTab].component;

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-16 md:py-24 overflow-hidden bg-white"
        >
            <div className="containers mx-auto px-4 sm:px-6 lg:px-8">
                {/* ── Heading ── */}
                <h2
                    ref={headingRef}
                    className="font-serif text-xl md:text-[25px] leading-snug text-center mb-10 md:mb-14"
                    style={{ color: "var(--color-primary)" }}
                >
                    News, Announcements &amp; Media Coverage
                </h2>

                {/* ── Tabs (Desktop) ── */}
                <div ref={tabsRef} className="mb-10 md:mb-14">
                    <div className="hidden md:flex justify-center items-stretch gap-10 lg:gap-14">
                        {TABS.map((tab, i) => (
                            <button
                                key={tab.label}
                                onClick={() => handleTabChange(i)}
                                className="relative pb-3 font-serif text-base lg:text-lg transition-colors duration-300 cursor-pointer group whitespace-nowrap"
                                style={{
                                    color:
                                        activeTab === i
                                            ? "var(--color-primary)"
                                            : "var(--color-paragraph)",
                                }}
                            >
                                {tab.label}

                                {/* Active underline */}
                                <span
                                    className="absolute bottom-0 left-0 h-[2px] transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
                                    style={{
                                        width: activeTab === i ? "100%" : "0%",
                                        backgroundColor: "var(--color-accent)",
                                    }}
                                />
                                {/* Hover underline */}
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

                    {/* ── Tabs (Mobile) ── */}
                    <div className="md:hidden -mx-4 px-4 overflow-x-auto scrollbar-hide">
                        <div className="flex gap-3 pb-2 min-w-max">
                            {TABS.map((tab, i) => (
                                <button
                                    key={tab.label}
                                    onClick={() => handleTabChange(i)}
                                    className="relative px-4 py-2.5 font-serif text-xs whitespace-nowrap transition-all duration-300 cursor-pointer border"
                                    style={{
                                        color:
                                            activeTab === i
                                                ? "#fff"
                                                : "var(--color-paragraph)",
                                        backgroundColor:
                                            activeTab === i
                                                ? "var(--color-primary)"
                                                : "transparent",
                                        borderColor:
                                            activeTab === i
                                                ? "var(--color-primary)"
                                                : "#e0e0e0",
                                    }}
                                >
                                    {tab.label}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {/* ── Tab Content ── */}
                <div ref={contentRef}>
                    <ActiveComponent />
                </div>
            </div>
        </section>
    );
}
