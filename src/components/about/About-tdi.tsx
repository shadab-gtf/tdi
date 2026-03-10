"use client";

import React, { useRef, useEffect } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowRight } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

/* ── Data ────────────────────────────────────────────────── */

interface BlockData {
    title: string;
    description: string;
    image: string;
    imageAlt: string;
    /** "left" = image on the LEFT, "right" = image on the RIGHT */
    imagePosition: "left" | "right";
    link: string;
    linkLabel: string;
}

const BLOCKS: BlockData[] = [
    {
        title: "TDI Infrastructure",
        description:
            "For over three decades, TDI Infrastructure has been at the forefront of transforming the urban landscape of North India. From expansive integrated townships to iconic lifestyle destinations and thriving commercial hubs, each project sets a new standard in scale, design, and visionary excellence.",
        image: "/assets/images/about/brand-logo.png",
        imageAlt: "TDI Infrastructure – Creating Landmarks",
        imagePosition: "left",
        link: "#",
        linkLabel: "Visit Website",
    },
    {
        title: "TDI Infratech",
        description:
            "TDI Infratech has been a visionary leader in redefining North India’s skyline. With a focus on creating iconic integrated townships, lifestyle destinations, and commercial hubs, each project exemplifies excellence in design, scale, and purpose, setting new benchmarks in urban development.",
        image: "/assets/images/about/tdi.png",
        imageAlt: "TDI Infratech – Rise Above",
        imagePosition: "right",
        link: "#",
        linkLabel: "Visit Website",
    },
    {
        title: "TDI Infracorp",
        description:
            "Since its inception 25 years ago, TDI Infra Corp has been a pioneering force in shaping integrated townships and commercial developments across North India. With over 15 million square feet delivered, TDI is renowned for its commitment to timely execution, superior craftsmanship, and building lasting customer trust.",
        image: "/assets/images/about/red-tdi.png",
        imageAlt: "TDI Infracorp – Shaping Memorable Storeys",
        imagePosition: "left",
        link: "#",
        linkLabel: "Visit Website",
    },
];



function AboutBlock({ data, index }: { data: BlockData; index: number }) {
    const blockRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    const titleRef = useRef<HTMLHeadingElement>(null);
    const descRef = useRef<HTMLParagraphElement>(null);
    const linkRef = useRef<HTMLAnchorElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const isLeft = data.imagePosition === "left";

            gsap.fromTo(
                imageRef.current,
                { x: isLeft ? -80 : 80, opacity: 0, scale: 0.88 },
                {
                    x: 0,
                    opacity: 1,
                    scale: 1,
                    duration: 1.2,
                    ease: "power3.out",
                    scrollTrigger: {
                        trigger: blockRef.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );

            const contentEls = [titleRef.current, descRef.current, linkRef.current].filter(Boolean);

            gsap.fromTo(
                contentEls,
                { y: 40, opacity: 0 },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.9,
                    ease: "power2.out",
                    stagger: 0.15,
                    scrollTrigger: {
                        trigger: blockRef.current,
                        start: "top 75%",
                        toggleActions: "play none none none",
                    },
                }
            );

            gsap.to(imageRef.current, {
                y: -6,
                duration: 3,
                ease: "sine.inOut",
                repeat: -1,
                yoyo: true,
                delay: 0.5 + index * 0.3,
            });
        }, blockRef);

        return () => ctx.revert();
    }, [data.imagePosition, index]);

    const isReverse = data.imagePosition === "right";

    return (
        <div
            ref={blockRef}
            className={`flex items-center justify-center gap-20 py-[4.5rem] px-4 max-w-[1140px] mx-auto
        ${isReverse ? "flex-row-reverse" : "flex-row"}
        max-[868px]:flex-col max-[868px]:gap-8 max-[868px]:py-12 max-[868px]:px-5
        max-[480px]:py-9 max-[480px]:gap-6`}
        >
            <div
                ref={imageRef}
                className="flex-[0_0_38%] max-w-[380px] flex items-center justify-center relative
          max-[868px]:flex-none max-[868px]:max-w-[280px] max-[868px]:w-[70%]
          max-[480px]:max-w-[220px] max-[480px]:w-[60%]"
            >
                <div className="relative w-full">
                    <div
                        className="absolute inset-[-8%] rounded-full pointer-events-none z-0"
                        style={{
                            background: "radial-gradient(circle, rgba(217,153,31,0.06) 0%, transparent 70%)",
                        }}
                    />
                    <Image
                        src={data.image}
                        alt={data.imageAlt}
                        width={420}
                        height={420}
                        className="w-full h-auto object-contain block relative z-10"
                        priority={index === 0}
                    />
                </div>
            </div>

            {/* Content */}
            <div className="flex-1 text-center ">
                <h2
                    ref={titleRef}
                    className="text-[25px] font-normal font-serif text-[var(--primary)] mb-[1.1rem] tracking-[0.01em] leading-[1.3]
            max-[868px]:text-[22px] max-[480px]:text-[20px]"
                >
                    {data.title}
                </h2>
                <p
                    ref={descRef}
                    className="text-base font-serif text-[var(--paragraph)]  mx-auto mb-6"
                >
                    {data.description}
                </p>
                <a
                    ref={linkRef}
                    href={data.link}
                    className="group inline-flex items-center gap-[0.35rem] text-[0.95rem] font-semibold text-[#d9991f]
            no-underline relative transition-all duration-300 hover:gap-[0.6rem]"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    <span className="relative font-serif">
                        {data.linkLabel}
                        <span
                            className="absolute left-0 -bottom-[3px] w-full h-[1.5px] bg-[#d9991f] transition-all duration-400 group-hover:w-full"
                            style={{ transitionTimingFunction: "cubic-bezier(0.25,1,0.5,1)" }}
                        />
                    </span>
                    <span className="inline-block transition-transform duration-300 text-[1.1rem] group-hover:translate-x-[3px]">
                        <ArrowRight />
                    </span>
                </a>
            </div>
        </div >
    );
}

export default function AboutTDI() {
    return (
        <section className="w-full bg-white overflow-hidden">

            {BLOCKS.map((block, i) => (
                <React.Fragment key={block.title}>
                    <AboutBlock data={block} index={i} />
                </React.Fragment>
            ))}
        </section>
    );
}