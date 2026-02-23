"use client";

import React, { useState, useRef } from "react";
import { gsap } from "gsap";

const faqs = [
    {
        question: "What Is TDI City Kundli?",
        answer:
            "TDI City Kundli is an integrated township in the Northern Delhi NCR region, planned to bring together residential, commercial, and institutional developments within a well-structured urban environment.",
    },
    {
        question: "Where Is TDI City Kundli Located?",
        answer:
            "It is strategically located in the Kundli region, offering excellent connectivity to Delhi and other parts of the NCR via major highways and upcoming infrastructure projects.",
    },
    {
        question: "What Types Of Developments Are Part Of The Township?",
        answer:
            "The township features a mix of luxury residential plots, high-rise apartments, commercial office spaces, retail malls, and institutional areas like schools and hospitals.",
    },
    {
        question: "Who Manages The Township?",
        answer:
            "The township is developed and managed by TDI Infratech, a leading real estate developer known for creating large-scale integrated townships across North India.",
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