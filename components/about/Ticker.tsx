"use client";

import React, { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";

const AnimatedCounter = ({ value, suffix = "" }: { value: number; suffix?: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        stiffness: 50,
        damping: 20,
        duration: 2
    });
    const isInView = useInView(ref, { once: true, margin: "-50px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    useEffect(() => {
        springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Math.floor(latest).toString() + suffix;
            }
        });
    }, [springValue, suffix]);

    return <span ref={ref} />;
};

const Ticker = () => {
    return (
        <section className="relative w-full py-16 md:py-24 overflow-hidden bg-white">
            <div className="w-full mx-auto px-4">
                {/* Top Section */}
                <div className="flex flex-col md:flex-row items-baseline justify-center gap-4 mb-20 md:mb-28 text-center">
                    <h2 className="text-[50px] leading-none text-[#D9991F]! font-secondary">
                        <AnimatedCounter value={30} />
                    </h2>
                    <span className="text-primary text-[25px] font-serif">
                        Years Of Trust
                    </span>
                </div>

                {/* Bottom Section - Stats Grid */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-y-12 md:gap-0 relative max-w-8xl mx-auto">
                    {/* Item 1: States */}
                    <div className="flex flex-row items-end justify-center gap-4 md:border-r border-[#D9991F]/30 last:border-r-0">
                        <div className="text-[50px] text-[#D9991F] font-secondary leading-none w-[60px] md:w-[70px] text-right">
                            <AnimatedCounter value={5} />
                        </div>
                        <span className="text-sm  text-[#232E5A] font-serif  text-left">
                            States
                        </span>
                    </div>

                    {/* Item 2: Cities */}
                    <div className="flex flex-row items-end justify-center gap-4 md:border-r border-[#D9991F]/30 last:border-r-0">
                        <div className="text-[50px] text-[#D9991F] font-secondary leading-none w-[60px] md:w-[70px] text-right">
                            <AnimatedCounter value={10} />
                        </div>
                        <span className="text-sm  text-[#232E5A] font-serif   text-left">
                            Cities
                        </span>
                    </div>

                    {/* Item 3: Project Delivered */}
                    <div className="flex flex-row items-end justify-start ml-10 gap-4 md:border-r border-[#D9991F]/30 last:border-r-0">
                        <div className="text-[50px]  text-[#D9991F] font-secondary leading-none min-w-[120px] text-right">
                            <AnimatedCounter value={100} suffix="+" />
                        </div>
                        <span className="text-sm text-[#232E5A] font-serif  text-nowrap text-left w-24">
                            Project Delivered
                        </span>
                    </div>

                    {/* Item 4: Acres */}
                    <div className="flex flex-row items-end justify-start ml-10 gap-4">
                        <div className="text-[50px]  text-[#D9991F] font-secondary leading-none min-w-[130px] text-right">
                            <AnimatedCounter value={2000} suffix="+" />
                        </div>
                        <span className="text-sm  text-[#232E5A] font-serif  text-left">
                            Acres
                        </span>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Ticker;