"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";


const faqs = [
    {
        question: "What Is TDI City Kundli?",
        answer:
            "TDI City Kundli is a thoughtfully designed integrated township spread across 1100+ acres, seamlessly blending residential, commercial, and recreational spaces into a unified urban ecosystem. It offers a lifestyle that harmoniously balances convenience, luxury, and sustainability.",
    },
    {
        question: "Where Is TDI City Kundli Located?",
        answer:
            "Strategically located along NH44 and UER 2, TDI City Kundli enjoys unmatched connectivity to Delhi, IGI Airport, and key industrial hubs, ensuring easy access to essential destinations and services.",
    },
    {
        question: "What Types Of Developments Are Part Of The Township?",
        answer:
            "TDI City Kundli includes a mix of luxurious residential enclaves, sophisticated commercial spaces, and community-driven recreational areas, designed to offer a complete and well-rounded living experience.",
    },
    {
        question: "Who Manages The Township?",
        answer:
            "TDI City Kundli is managed by TDI Infrastructure, a renowned leader in urban development, committed to delivering excellence and ensuring long-term growth through sustainable and visionary planning.",
    },
    {
        question: "What Makes TDI City Kundli a Premium Destination for Living?",
        answer:
            "TDI City Kundli is designed with a vision for the future, blending luxury, sustainability, and connectivity within a thoughtfully planned 1100+ acre township. The integration of modern residential spaces, commercial hubs, and green retreats creates a harmonious environment that elevates everyday living.",
    },
    {
        question: "How Does TDI City Kundli Ensure Seamless Connectivity?",
        answer:
            "Strategically located along NH44 and UER 2, with direct access to the Kundli Metro Station and the upcoming RRTS corridor, TDI City Kundli offers unmatched connectivity to Delhi, IGI Airport, and key commercial and industrial hubs, ensuring both convenience and accessibility.",
    },
    {
        question: "What Are the Key Features of the Residential Offerings in TDI City Kundli?",
        answer:
            "The residential offerings at TDI City Kundli feature expansive homes designed with light, openness, and privacy in mind. Surrounded by landscaped greenery and supported by wide internal roads, the residences are crafted to offer both peaceful solitude and community connection.",
    },
    {
        question: "What Types of Commercial Spaces Are Available in TDI City Kundli?",
        answer:
            "TDI City Kundli includes strategically placed commercial zones that bring services, offices, and retail outlets closer to home. These spaces are designed to foster business growth while maintaining the township’s serene living environment, offering both convenience and vibrancy.",
    },
    {
        question: "How Does TDI City Kundli Promote Sustainable Living?",
        answer:
            "TDI City Kundli is designed with sustainability at its core, integrating green spaces, eco-friendly infrastructure, and energy-efficient solutions. The township encourages a sustainable lifestyle through its meticulously planned layout, which blends nature with modern living.",
    },
    {
        question: "Who Can Benefit from Living in TDI City Kundli?",
        answer:
            "TDI City Kundli caters to those who seek a perfect blend of luxury, convenience, and sustainability. It is an ideal environment for families, professionals, and investors, offering a vibrant, well-rounded lifestyle supported by exceptional amenities and unmatched connectivity.",
    },
];
const FaqSection = () => {
    const [activeIndex, setActiveIndex] = useState<number | null>(0);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <section className="bg-[#f8fbff] px-4 sm:px-6 md:px-10 lg:px-16 py-16 md:py-14 font-serif">
            <div className="max-w-[1300px] mx-auto">
                <h2 className="text-xl md:text-2xl font-serif text-[var(--foreground)] text-center pb-10">
                    Frequently Asked Questions
                </h2>

                <div className="space-y-4  mx-auto">
                    {faqs.map((faq, index) => {
                        const isOpen = activeIndex === index;

                        return (
                            <div
                                key={index}
                                className="bg-white overflow-hidden  duration-300 "
                            >
                                <button
                                    type="button"
                                    onClick={() => toggleAccordion(index)}
                                    className="w-full px-6 md:px-8 py-5 md:py-6 cursor-pointer  text-center flex items-center justify-center group "
                                    aria-expanded={isOpen}
                                    aria-controls={`faq-answer-${index}`}
                                >
                                    <span className="text-primary text-base md:text-xl font-normal group-hover:text-primary transition-colors">
                                        {faq.question}
                                    </span>
                                    {/* 
                                    <motion.span
                                        animate={{ rotate: isOpen ? 180 : 0 }}
                                        transition={{ duration: 0.4 }}
                                        className="text-gray-500 group-hover:text-blue-600 flex-shrink-0 ml-4"
                                    >
                                        <ChevronDown size={24} />
                                    </motion.span> */}
                                </button>

                                <motion.div
                                    id={`faq-answer-${index}`}
                                    initial={false}
                                    animate={{ height: isOpen ? "auto" : 0 }}
                                    transition={{
                                        duration: 0.4,
                                        ease: [0.4, 0, 0.2, 1],
                                    }}
                                    className="overflow-hidden"
                                >
                                    <div className="px-6 md:px-8 pb-10 pt-1 text-black text-center leading-relaxed text-sm md:text-base">
                                        {faq.answer}
                                    </div>
                                </motion.div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FaqSection;