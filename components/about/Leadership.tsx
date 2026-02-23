"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";

const LEADERS = [
    {
        id: 1,
        name: "Mr. Akshay Taneja",
        role: "Managing Director",
        caption: "MR. AKSHAY TANEJA",
        image: "/assets/images/team/4.png",
        description: "Is Managing Director of TDI Infrastructure, drives the group’s strategic vision and long-term growth. An alumnus of the University of Manchester and Modern School, New Delhi, he champions sustainable, future-ready developments while expanding TDI across real estate, hospitality, F&B, and education."
    },
    {
        id: 2,
        name: "Sh. DN Taneja",
        role: "Founder and Chairman",
        caption: "SH. DN TANEJA",
        image: "/assets/images/team/1.png",
        description: " Is Founder and Chairman of TDI Infrastructure, is the guiding force behind the group's legacy in real estate development. With decades of industry experience, his vision has shaped TDI's commitment to quality, trust, and long-term value creation across residential, commercial, and integrated developments."
    },
    {
        id: 3,
        name: "Sh. Ravinder Taneja",
        role: "Director",
        caption: "SH. RAVINDER TANEJA",
        image: "/assets/images/team/2.png",
        description: "Is Director at TDI Infrastructure, plays a key role in strengthening the group's operations and project execution. With deep industry experience, he supports TDI's focus on disciplined development, quality delivery, and sustainable growth across its portfolio."
    },
    {
        id: 4,
        name: "Mr. Kamal Taneja",
        role: "Director",
        caption: "MR. KAMAL TANEJA",
        image: "/assets/images/team/3.png",
        description: "Is Director at TDI Infrastructure, contributes to the group's strategic planning and business development initiatives. With a strong understanding of real estate operations, he supports TDI's growth through focused execution, market insight, and long-term value creation."
    }
];

export default function Leadership() {
    return (
        <section className="relative w-full py-16 md:py-24 overflow-hidden bg-[var(--color-secondary-bg)]">
            <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-16 md:mb-24"
                >
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-serif text-[#2e3e5c] mb-4">
                        Our Leadership
                    </h2>
                </motion.div>

                <div className="flex flex-col gap-20">
                    {LEADERS.map((leader, index) => (
                        <motion.div
                            key={leader.id}
                            initial={{ opacity: 0, y: 40 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-100px" }}
                            transition={{ duration: 0.8, delay: 0.1 }}
                            className={`flex flex-col justify-between ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-8 md:gap-16 lg:gap-24`}
                        >
                            {/* Image Side */}
                            <div className="w-full md:w-1/3 shadow-[0_10px_20px_-10px_rgb(0_0_0_/_0.1)] flex flex-col items-center  ">

                                <div className="relative w-full max-w-xs   aspect-[4/3] md:aspect-[3/2] lg:aspect-[4/3] overflow-hidden   duration-500">
                                    {/* <div className="relative w-full max-w-md aspect-[4/3] md:aspect-[3/2] lg:aspect-[4/3] overflow-hidden   duration-500"> */}
                                    <Image
                                        src={leader.image}
                                        alt={leader.name}
                                        fill
                                        className="object-cover object-top hover:scale-105 transition-transform duration-700"
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />
                                </div>
                                <div className="px-6 py-3 font-serif  uppercase text-primary text-sm md:text-base text-center min-w-[200px]">
                                    {leader.caption}
                                </div>
                            </div>

                            {/* Text Side */}
                            <div className="w-full md:w-1/2 text-center md:text-left">

                                <p className="text-[#2e3e5c]/80 text-center font-serif leading-relaxed font-light">
                                    <span className="text-primary  text-lg font-serif font-semibold">{leader.name}</span>  {leader.description}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}