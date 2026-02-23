"use client";

import React, { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowRight, MoveLeft, MoveRight } from "lucide-react";
import Link from "next/link";

const propertiesData = [
    {
        id: 1,
        title: "Tuscan City",
        image: "/assets/images/properties/tuscan.png",
        link: "/tuscan-city",
    },
    {
        id: 2,
        title: "Espania",
        image: "/assets/images/properties/espania.png",
        link: "/espania",
    },
    {
        id: 3,
        title: "Espania Royale",
        image: "/assets/images/properties/royale.png",
        link: "/espania-royale",
    },
    {
        id: 4,
        title: "Kingsbury",
        image: "/assets/images/properties/kingsburry.png",
        link: "/kingsbury",
    },
    {
        id: 5,
        title: "Tuscan City",
        image: "/assets/images/properties/tuscan.png",
        link: "/tuscan-city",
    },
    {
        id: 6,
        title: "Espania",
        image: "/assets/images/properties/espania.png",
        link: "/espania",
    },
    {
        id: 7,
        title: "Espania Royale",
        image: "/assets/images/properties/royale.png",
        link: "/espania-royale",
    },
    {
        id: 8,
        title: "Kingsbury",
        image: "/assets/images/properties/kingsburry.png",
        link: "/kingsbury",
    },
];

const CARD_WIDTH = 275;
const GAP = 41;
const ITEM_WIDTH = CARD_WIDTH + GAP;

const Properties = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const sliderRef = useRef<HTMLDivElement>(null);


    const [maxIndex, setMaxIndex] = useState(0);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth >= 768) {
                setMaxIndex(Math.max(0, propertiesData.length - 4));
            } else {
                setMaxIndex(Math.max(0, propertiesData.length - 1));
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const slide = (direction: "left" | "right") => {
        if (direction === "right") {
            if (currentIndex < maxIndex) {
                setCurrentIndex(prev => prev + 1);
            }
        } else {
            if (currentIndex > 0) {
                setCurrentIndex(prev => prev - 1);
            }
        }
    };



    return (
        <section className="w-full bg-[var(--background)] py-20 overflow-hidden relative">
            <div className="containers mx-auto px-4">
                {/* Header */}
                <div className="text-center mb-12">
                    <h2 className="text-xl md:text-2xl font-serif text-[var(--color-accent)]! uppercase tracking-wider">
                        Iconic Properties
                    </h2>
                </div>

                {/* Slider Container */}
                <div
                    className="relative flex items-center max-w-[1238px] mx-auto group/slider"
                >
                    {/* Navigation Buttons - Desktop */}
                    <button
                        onClick={() => slide("left")}
                        disabled={currentIndex === 0}
                        className={`hidden md:flex absolute left-0 z-20 border border-[var(--primary)] bg-[var(--background)]/80 backdrop-blur-sm p-3 rounded-full shadow-lg transition-all duration-300 -ml-4 lg:-ml-16
                            ${currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "hover:bg-[var(--primary)] hover:text-[var(--color-accent)] hover:scale-110 active:scale-95 text-[var(--primary)] cursor-pointer"}
                        `}
                        aria-label="Previous Property"
                    >
                        <MoveLeft size={24} />
                    </button>

                    <div
                        ref={sliderRef}
                        className="overflow-hidden w-full relative py-4"
                    >


                        <motion.div
                            drag="x"
                            dragElastic={0.1}
                            onDragEnd={(e, { offset, velocity }) => {
                                const swipe = offset.x;
                                if (swipe < -50 || velocity.x < -500) {
                                    slide("right");
                                } else if (swipe > 50 || velocity.x > 500) {
                                    slide("left");
                                }
                            }}
                            dragConstraints={{ left: 0, right: 0 }}
                            animate={{ x: -currentIndex * ITEM_WIDTH }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            className="flex items-start pl-1"
                        >
                            {propertiesData.map((property, index) => (
                                <React.Fragment key={index}>
                                    <motion.div
                                        className="shrink-0 flex flex-col items-center gap-4 group/card cursor-pointer relative"
                                        style={{ width: CARD_WIDTH }}
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.3 }}
                                        onClick={() => {
                                            // Optional: make tapping card slide it if partly visible?
                                            // Currently card is link/action?
                                        }}
                                    >
                                        <div className="relative w-full h-[405px] shadow-lg overflow-hidden group-hover/card:shadow-2xl transition-all duration-500">
                                            <Image
                                                src={property.image}
                                                alt={property.title}
                                                fill
                                                className="object-cover transition-transform duration-700 group-hover/card:scale-110"
                                            />
                                            {/* Overlay gradient on hover */}
                                            <div className="absolute inset-0 bg-black/10 opacity-0 group-hover/card:opacity-100 transition-opacity duration-500" />
                                        </div>
                                        <Link href={property.link}>
                                            <h3 className="text-[22px] font-serif text-[var(--foreground)] text-center group-hover/card:text-[var(--color-accent)] transition-colors">
                                                {property.title}
                                            </h3>
                                        </Link>
                                    </motion.div>

                                    {/* Divider */}
                                    {index !== propertiesData.length - 1 && (
                                        <div className="h-[405px] w-[1px] bg-[#D3D3D3] mx-[20px] shrink-0" />
                                    )}
                                </React.Fragment>
                            ))}
                        </motion.div>
                    </div>

                    {/* Navigation Buttons - Desktop */}
                    <button
                        onClick={() => slide("right")}
                        disabled={currentIndex === maxIndex}
                        className={`hidden md:flex absolute right-0 z-20 border border-[var(--primary)] bg-[var(--background)]/80 backdrop-blur-sm p-3 rounded-full shadow-lg transition-all duration-300 -mr-4 lg:-mr-16
                             ${currentIndex === maxIndex ? "opacity-30 cursor-not-allowed" : "hover:bg-[var(--primary)] hover:text-[var(--color-accent)] hover:scale-110 active:scale-95 text-[var(--primary)] cursor-pointer"}
                        `}
                        aria-label="Next Property"
                    >
                        <MoveRight size={24} />
                    </button>
                </div>

                {/* Mobile Navigation Controls */}
                <div className="flex md:hidden justify-between w-full px-4 mt-8">
                    <button
                        onClick={() => slide("left")}
                        disabled={currentIndex === 0}
                        className={`p-3 border border-[var(--primary)] rounded-full text-[var(--primary)] transition-opacity active:scale-90 ${currentIndex === 0 ? "opacity-30" : ""}`}
                    >
                        <MoveLeft size={20} />
                    </button>
                    <button
                        onClick={() => slide("right")}
                        disabled={currentIndex >= propertiesData.length - 1}
                        className={`p-3 border border-[var(--primary)] rounded-full text-[var(--primary)] transition-opacity active:scale-90 ${currentIndex >= propertiesData.length - 1 ? "opacity-30" : ""}`}
                    >
                        <MoveRight size={20} />
                    </button>
                </div>

                {/* View All */}
                <div className="mt-16 text-center">
                    <Link
                        href="/projects"
                        className="text-[var(--color-accent)] hover:text-[var(--primary)] transition-colors border-b border-[var(--color-accent)] hover:border-[var(--primary)] inline-flex items-center gap-2 font-serif text-lg tracking-wide duration-300"
                    >
                        View All Projects <ArrowRight size={18} />
                    </Link>
                </div>
            </div>
        </section>
    );
};

export default Properties;
