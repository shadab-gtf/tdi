"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

export default function OurStory() {
    const containerRef = useRef<HTMLElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLImageElement>(null);

    useGSAP(() => {
        // Text Animations
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: textRef.current,
                start: "top 85%",
                toggleActions: "play none none reverse",
            }
        });

        tl.from(".story-sub", {
            y: 30,
            opacity: 0,
            duration: 1,
            ease: "power3.out"
        })
            .from(".story-title", {
                y: 40,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=0.8")
            .from(".story-desc", {
                y: 30,
                opacity: 0,
                duration: 1,
                ease: "power3.out"
            }, "-=0.8");

        // Image Reveal Animation
        const imageTl = gsap.timeline({
            scrollTrigger: {
                trigger: imageContainerRef.current,
                start: "top 80%",
                end: "bottom 20%",
                toggleActions: "play none none reverse",
                scrub: 1
            }
        });

        // Parallax Effect
        gsap.fromTo(imageRef.current,
            {
                scale: 1.1,
                y: -20
            },
            {
                scale: 1,
                y: 20,
                ease: "none",
                scrollTrigger: {
                    trigger: imageContainerRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: true,
                }
            }
        );

        // Clip Path Reveal for Container
        gsap.fromTo(imageContainerRef.current,
            {
                clipPath: "inset(10% 2% 10% 2%)",
                opacity: 0.8
            },
            {
                clipPath: "inset(0% 0% 0% 0%)",
                opacity: 1,
                duration: 1.5,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: imageContainerRef.current,
                    start: "top 85%",
                    toggleActions: "play none none reverse",
                }
            }
        );

    }, { scope: containerRef });

    return (
        <section ref={containerRef} className="relative w-full py-20 md:py-32 overflow-hidden bg-white">
            <div className="w-full max-w-[1140px] mx-auto px-4">
                {/* Text Content */}
                <div ref={textRef} className="text-center max-w-6xl mx-auto mb-16 md:mb-24 flex flex-col items-center">
                    <span className="story-sub block text-[var(--color-accent)] font-serif  text-xs md:text-base uppercase mb-6 ">
                        Our Story
                    </span>
                    <h2 className="story-title md:text-[25px] text-lg font-serif text-primary mb-6 md:mb-8 leading-tight">
                        The Journey Behind TDI City Kundli
                    </h2>
                    <p className="story-desc text-paragraph md:text-base text-sm  font-serif leading-relaxed ">
                        TDI City Kundli was planned to bring organised, long-term urban development to the Northern Delhi NCR corridor. Conceived as an integrated township, it brings together residences, infrastructure, institutions, and open spaces within a cohesive master plan. Its planning focuses on connectivity, functionality, and sustainability—supporting present needs while preparing for the region’s future growth.
                    </p>
                </div>

                {/* Hero Image */}
                <div
                    ref={imageContainerRef}
                    className="relative w-full aspect-[16/9] md:aspect-[21/9] overflow-hidden shadow-2xl"
                >
                    <Image
                        ref={imageRef}
                        src="/assets/images/about/story.png"
                        alt="TDI City Kundli Entrance"
                        fill
                        className="object-cover"
                        priority
                        sizes="(max-width: 768px) 100vw, 90vw"
                    />
                </div>
            </div>
        </section>
    );
}