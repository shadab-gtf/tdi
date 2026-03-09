"use client";

import React, { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        stiffness: 50,
        damping: 20,
    });
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    useEffect(() => {
        const unsubscribe = springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent =
                    Math.floor(latest).toString() + suffix;
            }
        });

        return () => unsubscribe();
    }, [springValue, suffix]);

    return <span ref={ref} />;
};

const Ticker = () => {
    return (
        <section className="relative w-full py-16 md:py-24 overflow-hidden bg-white">
            <div className="w-full mx-auto px-4">

                {/* Top Section */}
                <div className="flex flex-col md:flex-row items-center md:items-baseline justify-center gap-3 md:gap-4 mb-16 md:mb-28 text-center">
                    <h2 className="text-[42px] sm:text-[48px] md:text-[50px] leading-none text-[#D9991F] font-secondary">
                        <AnimatedCounter value={30} />
                    </h2>
                    <span className="text-primary text-base sm:text-lg md:text-[25px] font-serif">
                        Years Of Trust
                    </span>
                </div>

                {/* Bottom Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-14 md:gap-0 max-w-7xl mx-auto">

                    {/* Item */}
                    {[
                        { value: 5, label: "States" },
                        { value: 10, label: "Cities" },
                        { value: 100, label: "Project Delivered", suffix: "+" },
                        { value: 2000, label: "Acres", suffix: "+" }
                    ].map((item, index) => (
                        <div
                            key={index}
                            className={`flex flex-col md:flex-row items-center md:items-end justify-center gap-2 md:gap-4
                            ${index !== 3 ? "md:border-r border-[#D9991F]/30" : ""}`}
                        >
                            <div className="text-[40px] sm:text-[46px] md:text-[50px] text-[#D9991F] font-secondary leading-none text-center md:text-right min-w-[80px] md:min-w-[100px]">
                                <AnimatedCounter value={item.value} suffix={item.suffix || ""} />
                            </div>

                            <span className="text-xs sm:text-sm text-[#232E5A] font-serif text-center md:text-left whitespace-nowrap">
                                {item.label}
                            </span>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default Ticker;