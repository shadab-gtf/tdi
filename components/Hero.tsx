"use client";

import React, { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const Hero = () => {
    const heroRef = useRef<HTMLDivElement>(null);
    const imageContainerRef = useRef<HTMLDivElement>(null);

    useGSAP(() => {
        const tl = gsap.timeline();

        tl.fromTo(
            imageContainerRef.current,
            {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            },
            {
                clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
                duration: 1.5,
                ease: "power4.inOut",
            }
        );
    }, { scope: heroRef });

    return (
        <section
            ref={heroRef}
            className="relative w-full overflow-hidden bg-black h-screen"
        >
            <div
                ref={imageContainerRef}
                className="absolute inset-0 h-full w-full"
            >
                <Image
                    src="/assets/images/hero.png"
                    alt="Hero Background"
                    fill
                    className="object-cover"
                    priority
                />
                <div className="absolute inset-0 bg-black/20" />
            </div>
        </section>
    );
};

export default Hero;
