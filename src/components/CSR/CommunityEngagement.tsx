"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FsLightbox from "fslightbox-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
}

interface Initiative {
    image: string;
    caption: string;
}

const initiatives: Initiative[] = [
    {
        image: "/assets/csr/covid.jpg",
        caption: "Shot of hope – free COVID-19 vaccination drive",
    },
    {
        image: "/assets/csr/checkup.jpg",
        caption: "All is well – health checkup camp",
    },
    {
        image: "/assets/csr/srimant.jpg",
        caption:
            "Srimant Narain Dass Taneja charitable dispensary – free medical consultations",
    },
    {
        image: "/assets/csr/contri.jpg",
        caption: "₹51 lakh contribution to punjab cm flood relief fund",
    },
    {
        image: "/assets/csr/skyline.jpg",
        caption: "Smiles & Skylines – blood donation camp",
    },
    {
        image: "/assets/csr/rise.png",
        caption: "TDI × RoundGlass flood relief initiative",
    },
    {
        image: "/assets/csr/mahakal.jpg",
        caption:
            "Supporting construction of Atithi Nivas at Mahakal Temple, Ujjain",
    },
    {
        image: "/assets/csr/building.jpg",
        caption: "Building communities, beyond infrastructure.",
    },
];

const COLS = 4;

export default function CommunityEngagement() {
    const sectionRef = useRef<HTMLElement>(null);
    const [lightboxToggler, setLightboxToggler] = useState(false);
    const [lightboxSlide, setLightboxSlide] = useState(1);

    const lightboxImages = initiatives.map((item) => item.image);

    const openLightbox = (index: number) => {
        setLightboxSlide(index + 1);
        setLightboxToggler((prev) => !prev);
    };

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 75%",
                    toggleActions: "play none none reverse",
                },
            });

            tl.from(".ce-heading", {
                y: 40,
                opacity: 0,
                duration: 1,
                ease: "power4.out",
            })
                .from(
                    ".ce-subtitle",
                    {
                        y: 20,
                        opacity: 0,
                        duration: 0.8,
                        ease: "power3.out",
                    },
                    "-=0.6"
                )
                .from(
                    ".ce-card",
                    {
                        y: 60,
                        opacity: 0,
                        clipPath: "inset(0 0 100% 0)",
                        duration: 0.9,
                        ease: "expo.out",
                        stagger: { amount: 0.6, from: "start" },
                    },
                    "-=0.4"
                );
        },
        { scope: sectionRef }
    );

    return (
        <section
            ref={sectionRef}
            className="relative w-full py-16 md:py-28 overflow-hidden"
            style={{ backgroundColor: "var(--color-secondary-bg)" }}
        >
            <div className="containers mx-auto">
                {/* ── Heading ── */}
                <h2
                    className="ce-heading text-center font-serif text-xl md:text-[25px] leading-[1.3] mb-4"
                    style={{ color: "var(--color-primary)" }}
                >
                    CSR & Community Engagement
                </h2>
                <p
                    className="ce-subtitle text-center font-serif text-sm md:text-base leading-relaxed max-w-3xl mx-auto mb-10 md:mb-14"
                    style={{ color: "var(--color-paragraph)" }}
                >
                    TDI Infrastructure extends its impact beyond development
                    through structured social initiatives:
                </p>

                {/* ── Grid ── */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-y-10 gap-x-0">
                    {initiatives.map((item, i) => {
                        const isLastInRow = (i + 1) % COLS === 0;
                        const isLastInMobileRow = (i + 1) % 2 === 0;

                        return (
                            <div
                                key={i}
                                className="ce-card flex flex-col group relative px-3 md:px-4"
                            >
                                {/* Image – 297 × 360 */}
                                <div
                                    className="relative w-full overflow-visible cursor-pointer"
                                    style={{ aspectRatio: "297 / 360" }}
                                    onClick={() => openLightbox(i)}
                                >
                                    {/* Vertical divider – hidden on last column, height = image */}
                                    {!isLastInRow && (
                                        <div
                                            className="hidden md:block absolute top-0 -right-4 h-full w-px z-10"
                                            style={{
                                                backgroundColor: "#d0d0d0",
                                            }}
                                        />
                                    )}
                                    {/* Mobile vertical divider */}
                                    {!isLastInMobileRow && (
                                        <div
                                            className="md:hidden absolute top-0 -right-3 h-full w-px z-10"
                                            style={{
                                                backgroundColor: "#d0d0d0",
                                            }}
                                        />
                                    )}
                                    <Image
                                        src={item.image}
                                        alt={item.caption}
                                        fill
                                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.02]"
                                        sizes="(max-width: 768px) 50vw, 25vw"
                                    />
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                        style={{
                                            background:
                                                "linear-gradient(to top, rgba(0,0,0,0.12) 0%, transparent 50%)",
                                        }}
                                    />
                                </div>

                                {/* Caption */}
                                <p
                                    className="mt-3 font-serif text-xs md:text-sm text-center leading-snug px-1"
                                    style={{ color: "var(--color-primary)" }}
                                >
                                    {item.caption}
                                </p>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* ── Lightbox ── */}
            <FsLightbox
                toggler={lightboxToggler}
                slide={lightboxSlide}
                sources={lightboxImages}
            />
        </section>
    );
}
