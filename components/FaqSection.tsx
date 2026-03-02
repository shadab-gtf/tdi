"use client";

import React, { useState, useRef } from "react";
import { gsap } from "gsap";

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
    const contentRefs = useRef<(HTMLDivElement | null)[]>([]);

    const toggleAccordion = (index: number) => {
        const isClosingSame = activeIndex === index;
        const nextIndex = isClosingSame ? null : index;

        if (activeIndex !== null && contentRefs.current[activeIndex]) {
            gsap.to(contentRefs.current[activeIndex], {
                height: 0,
                opacity: 0,
                duration: 0.4,
                ease: "power2.inOut",
            });
        }

        if (!isClosingSame && contentRefs.current[index]) {
            gsap.fromTo(
                contentRefs.current[index],
                { height: 0, opacity: 0 },
                {
                    height: "auto",
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.out",
                }
            );
        }

        setActiveIndex(nextIndex);
    };

    return (
        <section className="bg-[#f8fbff]  h-full px-4 sm:px-6 md:px-10 lg:px-16 font-serif">
            <div className="container mx-auto">
                <h2 className="text-[#2c3e50] text-[20px] md:text-[25px] text-center mb-12 font-normal">
                    Frequently Asked Questions
                </h2>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div
                            key={index}
                            className="bg-white overflow-hidden transition-all duration-300"
                        >
                            <button
                                onClick={() => toggleAccordion(index)}
                                className="w-full py-6 px-8 text-center cursor-pointer focus:outline-none group"
                            >
                                <span className={`text-[#232E5A] text-base md:text-lg font-normal transition-colors ${activeIndex === index ? 'font-medium' : ''}`}>
                                    {faq.question}
                                </span>
                            </button>

                            <div
                                ref={(el) => { contentRefs.current[index] = el; }}
                                className="overflow-hidden"
                                style={{
                                    height: index === 0 ? "auto" : 0,
                                    opacity: index === 0 ? 1 : 0
                                }}
                            >
                                <div className="px-8 pb-8 text-center">
                                    <p className="text-[#556677] leading-relaxed max-w-6xl mx-auto text-sm font-serif md:text-base">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default FaqSection;