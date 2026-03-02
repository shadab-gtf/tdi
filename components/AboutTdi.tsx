"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";
import { initGlobalPAnimation } from "@/lib/gsapGlobal";

const AboutTdi = () => {

    const sectionRef = useRef<HTMLElement | null>(null);

    useEffect(() => {
        if (sectionRef.current) {
            initGlobalPAnimation(sectionRef.current);
        }
    }, []);
    return (
        <section ref={sectionRef} className="relative w-full bg-[var(--color-secondary-bg)] py-20 md:py-32 px-4 md:px-0 overflow-hidden">
            <div className="absolute md:top-1/2 -translate-y-1/2 left-10 w-24 h-24 md:w-40 md:h-40  pointer-events-none select-none">
                <Image src="/assets/images/leftbird.png" alt="Decorative Bird Left" fill className="object-contain" />
            </div>
            <div className="relative z-10 max-w-4xl mx-auto text-center flex flex-col max-w-4xl items-center gap-3 md:gap-6 md:px-0 ">
                <h2 className="text-xl md:text-2xl font-serif text-[var(--foreground)]">
                    Tdi City Kundli
                </h2>
                <p className="text-sm md:text-base text-[var(--paragraph)] font-serif leading-relaxed ">
                    TDI City Kundli stands at the confluence of connectivity, opportunity, and refined modern living. Spanning over 1100+ acres, this distinguished township is strategically located along NH44 and UER 2, soon to be seamlessly connected by the Kundli Metro Station at Nathupur and the RRTS corridor. With the IGI Airport in proximity and the Maruti Suzuki Manufacturing Plant driving industrial growth, Kundli offers unparalleled convenience. Truly embodying The New New Delhi, it is a prestigious destination where progress and luxurious living converge in perfect harmony.
                </p>
            </div>
            <div className="absolute -bottom-6 md:top-1/2 -translate-y-1/2 right-10 w-24 h-24 md:w-40 md:h-40   pointer-events-none select-none">
                <Image src="/assets/images/rightbird.png" alt="Decorative Bird Right" fill className="object-contain" />
            </div>
        </section>
    );
};

export default AboutTdi;
