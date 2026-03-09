"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

type HeroMediaProps = {
    type: "image" | "video";
    src: string;
    poster?: string;
    overlay?: boolean;
};

const HeroMedia: React.FC<HeroMediaProps> = ({
    type,
    src,
    poster,
}) => {
    const heroRef = useRef<HTMLDivElement>(null);
    const mediaRef = useRef<HTMLDivElement>(null);

    useGSAP(
        () => {
            gsap.fromTo(
                mediaRef.current,
                {
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
                },
                {
                    clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                    duration: 1.5,
                    ease: "power4.inOut",
                }
            );
        },
        { scope: heroRef }
    );

    return (
        <section
            ref={heroRef}
            className="relative w-full h-screen  overflow-hidden bg-black"
        >
            <div
                ref={mediaRef}
                className="absolute inset-0 w-full h-full "
            >
                {type === "image" ? (
                    <Image
                        src={src}
                        alt="Hero Media"
                        fill
                        className="object-cover h-full w-full quality-100"
                        priority
                    />
                ) : (
                    <video
                        src={src}
                        poster={poster}
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full h-full mt-10 object-cover"
                    />
                )}
            </div>
        </section>
    );
};

export default HeroMedia;
