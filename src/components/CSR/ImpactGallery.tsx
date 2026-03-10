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

const marqueeImages = [
    { src: "/assets/csr/skyline.jpg", alt: "Smiles & Skylines" },
    { src: "/assets/csr/covid.jpg", alt: "COVID-19 vaccination drive" },
    { src: "/assets/csr/rise.png", alt: "TDI Rise Above" },
    { src: "/assets/csr/contri.jpg", alt: "Flood relief contribution" },
    { src: "/assets/csr/srimant.jpg", alt: "Charitable dispensary" },
    { src: "/assets/csr/checkup.jpg", alt: "Health checkup camp" },
    { src: "/assets/csr/mahakal.jpg", alt: "Mahakal Temple" },
    { src: "/assets/csr/building.jpg", alt: "Building communities" },
];

const lightboxSources = marqueeImages.map((img) => img.src);

export default function ImpactGallery() {
    const sectionRef = useRef<HTMLElement>(null);
    const [lightboxToggler, setLightboxToggler] = useState(false);
    const [lightboxSlide, setLightboxSlide] = useState(1);

    const openLightbox = (index: number) => {
        setLightboxSlide(index + 1);
        setLightboxToggler((prev) => !prev);
    };

    useGSAP(
        () => {
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    toggleActions: "play none none reverse",
                },
            });

            tl.from(".impact-eyebrow", {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: "power3.out",
            })
                .from(
                    ".impact-heading",
                    {
                        y: 30,
                        opacity: 0,
                        duration: 0.9,
                        ease: "power4.out",
                    },
                    "-=0.5"
                )
                .from(
                    ".impact-marquee",
                    {
                        opacity: 0,
                        y: 40,
                        duration: 1,
                        ease: "power3.out",
                    },
                    "-=0.4"
                );
        },
        { scope: sectionRef }
    );

    return (
        <>
            <style jsx>{`
                @keyframes marqueeScroll {
                    0% {
                        transform: translateX(0%);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }
                .marquee-track {
                    animation: marqueeScroll 35s linear infinite;
                    width: fit-content;
                }
                .marquee-wrapper:hover .marquee-track {
                    animation-play-state: paused;
                }
            `}</style>

            <section
                ref={sectionRef}
                className="relative w-full py-16 md:py-24 overflow-hidden bg-white"
            >
                {/* ── Header ── */}
                <div className="containers mx-auto mb-10 md:mb-14">
                    <p
                        className="impact-eyebrow text-center font-serif text-xs md:text-sm uppercase tracking-[0.2em] mb-3"
                        style={{ color: "var(--color-accent)" }}
                    >
                        Impact Gallery
                    </p>
                    <h2
                        className="impact-heading text-center font-serif text-xl md:text-[25px] leading-[1.3]"
                        style={{ color: "var(--color-primary)" }}
                    >
                        Growth. Progress. Community.
                    </h2>
                </div>

                {/* ── Infinite Marquee ── */}
                <div className="impact-marquee marquee-wrapper relative w-full overflow-hidden">
                    <div className="marquee-track flex flex-nowrap items-center">
                        {[...Array(2)].map((_, setIndex) => (
                            <div
                                key={setIndex}
                                className="flex items-center gap-4 shrink-0"
                            >
                                {marqueeImages.map((img, i) => (
                                    <div
                                        key={`${setIndex}-${i}`}
                                        className="relative flex-shrink-0 overflow-hidden cursor-pointer"
                                        style={{
                                            width: "clamp(240px, 22vw, 350px)",
                                            aspectRatio: "350 / 405",
                                        }}
                                        onClick={() => openLightbox(i)}
                                    >
                                        <Image
                                            src={img.src}
                                            alt={img.alt}
                                            fill
                                            className="object-cover"
                                            sizes="(max-width: 768px) 240px, 350px"
                                        />
                                    </div>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ── Lightbox ── */}
            <FsLightbox
                toggler={lightboxToggler}
                slide={lightboxSlide}
                sources={lightboxSources}
            />
        </>
    );
}
