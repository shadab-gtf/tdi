"use client";

import React, { useRef } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, SplitText);
}

interface BuildingCard {
    title: string;
    description: string;
    image: string;
}

const CARDS: BuildingCard[] = [
    {
        title: "Our Commitment",
        description:
            "TDI City Kundli is dedicated to creating enduring spaces that deliver long-term value and quality for generations.",
        image:
            "/assets/images/amenities/commitment.png",
    },
    {
        title: "A Long-Term Vision",
        description:
            "With foresight and excellence, TDI City Kundli is designed to evolve with the future, while preserving its legacy of sophistication.",
        image:
            "/assets/images/amenities/vision.png",
    },
    {
        title: "Sustainable Living, Refined",
        description:
            "TDI City Kundli blends sustainability with luxury, offering eco-friendly living without compromising on comfort.",
        image:
            "/assets/images/amenities/living.png",
    },
];

export default function Building() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                toggleActions: "play none none reverse",
            },
        });

        // Heading — SplitText word reveal
        tl.add(() => {
            if (!headingRef.current) return;
            try {
                const split = new SplitText(headingRef.current, { type: "words" });
                gsap.from(split.words, {
                    y: "100%",
                    opacity: 0,
                    duration: 1,
                    ease: "power4.out",
                    stagger: 0.06,
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

        // Description fade
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

        // Cards — cinematic stagger entrance
        tl.from(
            ".building-card",
            {
                y: 70,
                opacity: 0,
                duration: 1.1,
                ease: "expo.out",
                stagger: { amount: 0.4, from: "start" },
            },
            "-=0.5"
        );
    }, { scope: sectionRef });

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-20 md:py-28 lg:py-32 overflow-hidden"
            style={{ backgroundColor: "var(--color-background, #F8FBFF)" }}
        >
            {/* ── Header ── */}
            <div className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 md:mb-16 lg:mb-20">
                <div className="text-center">
                    <h2
                        ref={headingRef}
                        className="font-serif text-primary text-xl md:text-[25px] font-normal mb-5 overflow-hidden"
                        style={{ perspective: "600px" }}
                    >
                        Crafting a Life of Harmony and Elegance
                    </h2>
                    <p
                        ref={descRef}
                        className="text-paragraph font-serif text-sm md:text-base max-w-4xl mx-auto"
                    >
                        TDI City Kundli is meticulously designed with expansive green spaces, pedestrian-friendly avenues, and architecture that resonates with refinement. Every element of the township is harmoniously integrated to foster balance, where nature, luxury, and daily living converge seamlessly to create an unparalleled lifestyle experience.
                    </p>
                </div>
            </div>

            {/* ── Cards Grid ── */}
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {CARDS.map((card, i) => (
                        <BuildingCardItem key={card.title} card={card} index={i} />
                    ))}
                </div>
            </div>
        </section>
    );
}

/* ── Individual Card ── */
function BuildingCardItem({
    card,
    index,
}: {
    card: BuildingCard;
    index: number;
}) {
    const cardRef = useRef<HTMLDivElement>(null);
    const imgWrapperRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLDivElement>(null);

    const handleMouseEnter = () => {
        gsap.to(imgRef.current, {
            scale: 1.06,
            duration: 0.9,
            ease: "power3.out",
        });
    };

    const handleMouseLeave = () => {
        gsap.to(imgRef.current, {
            scale: 1,
            duration: 0.9,
            ease: "power3.out",
        });
    };

    return (
        <div
            ref={cardRef}
            className="building-card group flex flex-col cursor-pointer"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Image */}
            <div
                ref={imgWrapperRef}
                className="relative w-full overflow-hidden"
                style={{ aspectRatio: "4 / 3" }}
            >
                <div ref={imgRef} className="absolute inset-0 will-change-transform">
                    <Image
                        src={card.image}
                        alt={card.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        quality={90}
                    />
                </div>
            </div>

            {/* Text Content — below image, centered */}
            <div className="pt-5 md:pt-6 text-center">
                <h3
                    className="font-serif text-primary text-base md:text-lg lg:text-[20px] font-medium mb-3"
                >
                    {card.title}
                </h3>
                <p
                    className="font-serif text-black text-xs md:text-base font-light"
                >
                    {card.description}
                </p>
            </div>
        </div>
    );
}