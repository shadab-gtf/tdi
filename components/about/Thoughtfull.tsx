"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import { MoveRight } from "lucide-react";

const Thoughtfull = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            once: false,
            mirror: true,
        });
    }, []);

    return (
        <section className="w-full bg-white py-16 overflow-hidden">
            <div className="max-w-[1140px] w-full px-4 mx-auto">
                <div className="flex flex-col flex-col-reverse  md:flex-row items-center gap-12 md:gap-20">
                    {/* Left Content Side */}
                    <div
                        className="w-full md:w-1/2 max-w-[555px] mx-auto relative flex flex-col items-center md:items-start text-center md:text-left py-10 md:py-20"
                        data-aos="fade-up"
                    >
                        {/* Sunburst Background */}
                        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                            <Image
                                src="/assets/images/sunburst.png"
                                alt="Background Pattern"
                                width={284}
                                height={284}
                                className="object-cover"
                            />
                        </div>

                        <h2 className="text-lg md:text-[25px] w-full md:px-6 mx-auto text-center font-serif text-[var(--foreground)] mb-6 md:mb-10 leading-tight">
                            A Thoughtfully Self-Sustained Township
                        </h2>

                        <p className="md:text-[14.8px] text-sm text-black text-center font-serif leading-[26px]  font-light mb-8 md:mb-12">
                            TDI City Kundli is professionally managed by Cannes Property Management Services Private Limited, ensuring the township's shared spaces, infrastructure, and day-to-day operations are maintained to consistent standards. With a focus on efficiency, upkeep, and resident experience, the management approach supports a well-organised, secure, and smoothly functioning living environment.
                        </p>

                        <Link
                            href="/know-more"
                            className="inline-flex  mx-auto group items-center justify-center gap-2 text-[var(--color-accent)] font-serif text-lg hover:gap-4 transition-all duration-300 group"
                        >
                            Know More
                            <MoveRight className=" group-hover:translate-x-2 w-5 h-5 transition-transform" />
                        </Link>
                    </div>

                    {/* Right Image Side */}
                    <div
                        className="w-full md:w-1/2 relative md:h-[380px] h-[400px] overflow-hidden "
                        data-aos="reveal-left"
                    >
                        <Image
                            src="/assets/images/about/thoughtfully.jpg"
                            alt="A Thoughtfully Self-Sustained Township"
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Thoughtfull;
