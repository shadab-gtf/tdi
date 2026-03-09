"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import FsLightbox from "fslightbox-react";

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger, SplitText);
}

interface ClubHouseItem {
    title: string;
    image: string;
}

const CLUBHOUSE_ITEMS: ClubHouseItem[] = [
    { title: "Premium Club Facilities", image: "/assets/images/clubhouse/1.jpg" },
    { title: "Pan Asian Restaurant", image: "/assets/images/clubhouse/2.jpg" },
    { title: "Crystal Bar", image: "/assets/images/clubhouse/3.jpg" },
    { title: "Gym", image: "/assets/images/clubhouse/testimage.webp" },
    { title: "Swimming Pool", image: "/assets/images/clubhouse/5.jpg" },
    { title: "Spa", image: "/assets/images/clubhouse/6.jpg" },
    { title: "Jacuzzi", image: "/assets/images/clubhouse/7.jpg" },
    { title: "Table Tennis", image: "/assets/images/clubhouse/8.jpg" },
    { title: "Badminton", image: "/assets/images/clubhouse/9.jpg" },
    { title: "Squash Courts", image: "/assets/images/clubhouse/10.jpg" },
    { title: "Conference Halls", image: "/assets/images/clubhouse/11.jpg" },
    { title: "Banquet Halls", image: "/assets/images/clubhouse/12.jpg" },
    { title: "24-hour Concierge", image: "/assets/images/clubhouse/13.jpg" },
    { title: "In-Room Dining", image: "/assets/images/clubhouse/14.jpg" },
    { title: "Laundry", image: "/assets/images/clubhouse/15.jpg" },
    { title: "Wi-Fi", image: "/assets/images/clubhouse/16.jpg" },
    { title: "Parking", image: "/assets/images/clubhouse/17.jpg" },
    { title: "Outdoor Catering", image: "/assets/images/clubhouse/18.jpg" },
];

export default function ClubHouse() {
    const sectionRef = useRef<HTMLElement>(null);
    const headingRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [isPaused, setIsPaused] = useState(false);

    // Lightbox state
    const [lightboxController, setLightboxController] = useState({
        toggler: false,
        slide: 1
    });

    const openLightboxOnSlide = (index: number) => {
        setLightboxController({
            toggler: !lightboxController.toggler,
            slide: index + 1
        });
    };

    const lightboxImages = CLUBHOUSE_ITEMS.map(item => item.image);

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
                        At TDI City Kundli, the clubhouse is the heart of a curated lifestyle, offering wellness, recreation, and luxury. Designed for comfort and connection, it seamlessly blends elegance with function for an elevated living experience.
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
                        <ClubHouseCard
                            key={`${item.title}-${i}`}
                            item={item}
                            onClick={() => openLightboxOnSlide(i % CLUBHOUSE_ITEMS.length)}
                        />
                    ))}
                </div>
            </div>

            <FsLightbox
                toggler={lightboxController.toggler}
                sources={lightboxImages}
                slide={lightboxController.slide}

            />

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

function ClubHouseCard({ item, onClick }: { item: ClubHouseItem; onClick: () => void }) {
    const cardRef = useRef<HTMLDivElement>(null);
    const imgRef = useRef<HTMLDivElement>(null);
    const overlayRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLSpanElement>(null);

    const handleMouseEnter = () => {
        gsap.to(imgRef.current, {
            scale: 1.05,
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
            opacity: 0.2,
            duration: 0.5,
            ease: "power2.out",
        });
        gsap.to(textRef.current, {
            scale: 1,
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
            onClick={onClick}
        >
            {/* Image */}
            <div ref={imgRef} className="absolute inset-0 will-change-transform">
                <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-contain"
                // sizes="(max-width: 640px) 75vw, (max-width: 1024px) 35vw, 28vw"
                // quality={90}
                />
            </div>

            <div
                ref={overlayRef}
                className="absolute inset-0 pointer-events-none"
                style={{
                    background:
                        "linear-gradient(180deg, rgba(0,0,0,0.35) 0%, rgba(0,0,0,0.05) 40%, rgba(0,0,0,0.05) 60%, rgba(0,0,0,0.3) 100%)",
                    // opacity: 0.3,
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
