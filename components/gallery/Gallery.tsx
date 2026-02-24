"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useInView } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const categories = [
    "Township Overview",
    "Amenities & Clubhouse",
    "Events & Milestones",
    "Infrastructure & Connectivity",
    "Institutional Zones",
    "Events",
];

const galleryImages = [
    { id: 1, src: "/assets/gallery/1.jpg", category: "Township Overview", alt: "Mall and Retail Space", className: "md:col-span-2 md:row-span-1" },
    { id: 2, src: "/assets/gallery/2.jpg", category: "Township Overview", alt: "Residential Modern Building", className: "md:col-span-1 md:row-span-1" },
    { id: 3, src: "/assets/gallery/3.jpg", category: "Township Overview", alt: "Tall Residential Tower", className: "md:col-span-1 md:row-span-2" },
    { id: 4, src: "/assets/gallery/4.jpg", category: "Township Overview", alt: "Modern Apartment Complex", className: "md:col-span-1 md:row-span-1" },
    { id: 5, src: "/assets/gallery/5.jpg", category: "Township Overview", alt: "Apartment Balconies", className: "md:col-span-2 md:row-span-1" },
    { id: 6, src: "/assets/gallery/6.jpg", category: "Township Overview", alt: "Commercial Street View", className: "md:col-span-1 md:row-span-1" },
    { id: 7, src: "/assets/gallery/7.jpg", category: "Township Overview", alt: "Modern Road and Building", className: "md:col-span-1 md:row-span-1" },
    { id: 8, src: "/assets/gallery/8.jpg", category: "Township Overview", alt: "Night View of Township", className: "md:col-span-2 md:row-span-1" },
    { id: 9, src: "/assets/gallery/1.jpg", category: "Amenities & Clubhouse", alt: "Amenities Overview", className: "md:col-span-2 md:row-span-1" },
    { id: 10, src: "/assets/gallery/3.jpg", category: "Amenities & Clubhouse", alt: "Clubhouse View", className: "md:col-span-1 md:row-span-1" },
    { id: 11, src: "/assets/gallery/2.jpg", category: "Events & Milestones", alt: "Special Event", className: "md:col-span-1 md:row-span-1" },
    { id: 12, src: "/assets/gallery/5.jpg", category: "Infrastructure & Connectivity", alt: "Infrastructure Roadway", className: "md:col-span-2 md:row-span-1" },
    { id: 13, src: "/assets/gallery/1.jpg", category: "Events", project: "Kundli", year: "2025", quarter: "Jan - Mar", alt: "Event 1", className: "md:col-span-2 md:row-span-1" },
    { id: 14, src: "/assets/gallery/2.jpg", category: "Events", project: "Sonipat", year: "2024", quarter: "June - Sep", alt: "Event 2", className: "md:col-span-1 md:row-span-1" },
    { id: 15, src: "/assets/gallery/3.jpg", category: "Events", project: "Kundli", year: "2025", quarter: "Jan - Mar", alt: "Event 3", className: "md:col-span-1 md:row-span-2" },
    { id: 16, src: "/assets/gallery/4.jpg", category: "Events", project: "Sonipat", year: "2023", quarter: "Oct - Dec", alt: "Event 4", className: "md:col-span-1 md:row-span-1" },
    { id: 17, src: "/assets/gallery/5.jpg", category: "Events", project: "Kundli", year: "2024", quarter: "April - June", alt: "Event 5", className: "md:col-span-2 md:row-span-1" },
    { id: 18, src: "/assets/gallery/6.jpg", category: "Events", project: "Sonipat", year: "2025", quarter: "Jan - Mar", alt: "Event 6", className: "md:col-span-1 md:row-span-1" },
    { id: 19, src: "/assets/gallery/7.jpg", category: "Events", project: "Kundli", year: "2024", quarter: "June - Sep", alt: "Event 7", className: "md:col-span-1 md:row-span-1" },
    { id: 20, src: "/assets/gallery/8.jpg", category: "Events", project: "Sonipat", year: "2025", quarter: "Jan - Mar", alt: "Event 8", className: "md:col-span-2 md:row-span-1" },
];

const clipRevealVariants = [
    // reveal from left
    {
        hidden: { clipPath: "inset(0 100% 0 0)", opacity: 1 },
        visible: { clipPath: "inset(0 0% 0 0)", opacity: 1 },
        exit: { clipPath: "inset(0 0% 0 100%)", opacity: 1 },
    },
    // reveal from bottom
    {
        hidden: { clipPath: "inset(100% 0 0 0)", opacity: 1 },
        visible: { clipPath: "inset(0% 0 0 0)", opacity: 1 },
        exit: { clipPath: "inset(0 0 100% 0)", opacity: 1 },
    },
    // reveal from right
    {
        hidden: { clipPath: "inset(0 0 0 100%)", opacity: 1 },
        visible: { clipPath: "inset(0 0 0 0%)", opacity: 1 },
        exit: { clipPath: "inset(0 100% 0 0)", opacity: 1 },
    },
    // reveal from top
    {
        hidden: { clipPath: "inset(0 0 100% 0)", opacity: 1 },
        visible: { clipPath: "inset(0 0 0% 0)", opacity: 1 },
        exit: { clipPath: "inset(100% 0 0 0)", opacity: 1 },
    },
    // diagonal — polygon reveal
    {
        hidden: { clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)", opacity: 1 },
        visible: { clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)", opacity: 1 },
        exit: { clipPath: "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)", opacity: 1 },
    },
];

interface LightboxProps {
    images: { src: string; alt: string }[];
    currentIndex: number;
    onClose: () => void;
    onPrev: () => void;
    onNext: () => void;
}

const Lightbox = ({ images, currentIndex, onClose, onPrev, onNext }: LightboxProps) => {
    useEffect(() => {
        const handleKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") onPrev();
            if (e.key === "ArrowRight") onNext();
        };
        window.addEventListener("keydown", handleKey);
        return () => window.removeEventListener("keydown", handleKey);
    }, [onClose, onPrev, onNext]);

    useEffect(() => {
        document.body.style.overflow = "hidden";
        return () => { document.body.style.overflow = ""; };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[9999] flex items-center justify-center"
            onClick={onClose}
            style={{ background: "rgba(5,5,5,0.96)" }}
        >
            {/* Decorative corner lines */}
            <div className="pointer-events-none absolute inset-6 border border-white/5" />
            <div className="pointer-events-none absolute inset-8 border border-white/[0.03]" />

            {/* Close */}
            <motion.button
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                onClick={onClose}
                className="absolute top-6 right-6 text-white cursor-pointer z-20 flex items-center gap-2 text-white/40 hover:text-white transition-colors duration-300 group"
                aria-label="Close"
            >
                <span className="text-xs tracking-[0.2em] font-light text-white uppercase  group-hover:opacity-100 transition-opacity duration-300">CLOSE</span>
                <div className="w-9 h-9 flex items-center justify-center border border-white group-hover:border-white/30 transition-colors duration-300">
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                        <line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" />
                    </svg>
                </div>
            </motion.button>

            {/* Prev */}
            {images.length > 1 && (
                <motion.button
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                    onClick={(e) => { e.stopPropagation(); onPrev(); }}
                    className="absolute left-6 z-20 text-white cursor-pointer flex flex-col items-center gap-2 text-white/30 hover:text-white transition-colors duration-300 group"
                    aria-label="Previous"
                >
                    <div className="w-9 h-9 text-white cursor-pointer flex items-center justify-center border border-white group-hover:border-white/30 transition-colors duration-300">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                            <polyline points="15 18 9 12 15 6" />
                        </svg>
                    </div>
                </motion.button>
            )}

            {/* Image container */}
            <motion.div
                key={currentIndex}
                initial={{ clipPath: "inset(0 100% 0 0)", scale: 1.02 }}
                animate={{ clipPath: "inset(0 0% 0 0)", scale: 1 }}
                exit={{ clipPath: "inset(0 0 0 100%)" }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="relative w-full max-w-5xl mx-24"
                style={{ aspectRatio: "16/10" }}
                onClick={(e) => e.stopPropagation()}
            >
                <Image
                    src={images[currentIndex].src}
                    alt={images[currentIndex].alt}
                    fill
                    className="object-contain"
                    sizes="90vw"
                    priority
                />
                {/* subtle vignette */}
                <div className="absolute inset-0 shadow-[inset_0_0_80px_rgba(0,0,0,0.4)] pointer-events-none" />
            </motion.div>

            {/* Next */}
            {images.length > 1 && (
                <motion.button
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                    onClick={(e) => { e.stopPropagation(); onNext(); }}
                    className="absolute right-6 text-white cursor-pointer z-20 flex flex-col items-center gap-2 text-white/30 hover:text-white transition-colors duration-300 group"
                    aria-label="Next"
                >
                    <div className="w-9 h-9 text-white cursor-pointer flex items-center justify-center border border-white group-hover:border-white/30 transition-colors duration-300">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
                            <polyline points="9 18 15 12 9 6" />
                        </svg>
                    </div>
                </motion.button>
            )}

            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-6"
            >
                <div className="h-[1px] w-12 bg-white/20" />
                <span className="text-white/30 text-xs tracking-[0.3em] font-light uppercase">
                    {String(currentIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
                </span>
                <div className="h-[1px] w-12 bg-white/20" />
            </motion.div>
        </motion.div>
    );
};

interface CardProps {
    image: typeof galleryImages[0];
    index: number;
    categoryKey: number;
    onClick: () => void;
}

const GalleryCard = ({ image, index, categoryKey, onClick }: CardProps) => {
    const variant = clipRevealVariants[index % clipRevealVariants.length];
    const delay = index * 0.07;

    return (
        <motion.div
            key={`${categoryKey}-${image.id}`}
            layout
            variants={variant}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{
                duration: 0.75,
                delay,
                ease: [0.16, 1, 0.3, 1],
            }}
            className={`relative group cursor-pointer overflow-hidden ${image.className}`}
            onClick={onClick}
            style={{ willChange: "clip-path" }}
        >
            <motion.div
                className="absolute inset-0"
                initial={{ scale: 1.15 }}
                animate={{ scale: 1 }}
                transition={{ duration: 1.1, delay, ease: [0.16, 1, 0.3, 1] }}
            >
                <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.07]"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
            </motion.div>

            <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/40 transition-opacity duration-500 group-hover:opacity-70 z-10" />

            <div className="absolute bottom-0 left-0 right-0 p-4 z-20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)]">
                <p className="text-white text-xs tracking-[0.2em] uppercase font-light opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                    {image.alt}
                </p>
            </div>

            <div className="absolute top-4 right-4 z-20 w-8 h-8 flex items-center justify-center border border-white/0 group-hover:border-white/40 bg-white/0 group-hover:bg-white/10 backdrop-blur-sm transition-all duration-400 ease-out opacity-0 group-hover:opacity-100">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3H21V9" /><path d="M9 21H3V15" />
                    <path d="M21 3L14 10" /><path d="M3 21L10 14" />
                </svg>
            </div>

            <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-colors duration-500 z-20 pointer-events-none" />
        </motion.div>
    );
};

const Gallery = () => {
    const [activeCategory, setActiveCategory] = useState("Township Overview");
    const [categoryKey, setCategoryKey] = useState(0); // increment to force remount
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const sectionRef = useRef<HTMLElement>(null);
    const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
    const [showFilter, setShowFilter] = useState(false);
    const [selectedProject, setSelectedProject] = useState("All");
    const [selectedYear, setSelectedYear] = useState("All");
    const [selectedQuarter, setSelectedQuarter] = useState("All");

    const filteredImages = galleryImages.filter((img) => {
        if (img.category !== activeCategory) return false;
        if (activeCategory === "Events") {
            if (selectedProject !== "All" && img.project !== selectedProject) return false;
            if (selectedYear !== "All" && img.year !== selectedYear) return false;
            if (selectedQuarter !== "All" && img.quarter !== selectedQuarter) return false;
        }
        return true;
    });

    useEffect(() => {
        setShowFilter(activeCategory === "Events");
    }, [activeCategory]);

    const handleTabChange = (cat: string) => {
        if (cat === activeCategory || isTransitioning) return;
        setIsTransitioning(true);
        setActiveCategory(cat);
        setCategoryKey((k) => k + 1);
        setLightboxIndex(null);
        // Reset filters when changing tabs to "Events" or leaving "Events"
        setSelectedProject("All");
        setSelectedYear("All");
        setSelectedQuarter("All");
        setTimeout(() => setIsTransitioning(false), 800);
    };

    const openLightbox = (index: number) => setLightboxIndex(index);
    const closeLightbox = useCallback(() => setLightboxIndex(null), []);
    const prevImage = useCallback(() => setLightboxIndex((p) => p === null ? null : (p - 1 + filteredImages.length) % filteredImages.length), [filteredImages.length]);
    const nextImage = useCallback(() => setLightboxIndex((p) => p === null ? null : (p + 1) % filteredImages.length), [filteredImages.length]);

    useEffect(() => {
        if (!isInView) return;
        gsap.fromTo(".gallery-eyebrow", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, ease: "power3.out" });
        gsap.fromTo(".gallery-title", { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1.1, delay: 0.1, ease: "power3.out" });
        gsap.fromTo(".gallery-line", { scaleX: 0 }, { scaleX: 1, duration: 1.2, delay: 0.3, ease: "power3.inOut", transformOrigin: "left" });
        gsap.fromTo(".gallery-desc", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.9, delay: 0.35, ease: "power3.out" });
    }, [isInView]);

    return (
        <>
            <section ref={sectionRef} className="gallery-section w-full py-12 bg-background overflow-hidden">
                <div className="containers mx-auto px-6 lg:px-12">
                    <div className="mb-16">
                        <div className="flex items-center gap-4 mb-5">
                            <div className="gallery-line h-[1px] w-16 bg-[var(--color-primary,#8B7355)] origin-left scale-x-0" />
                        </div>
                        <div className="flex flex-col justify-center items-center gap-6">
                            <h2 className="gallery-title text-[24px] text-[var(--color-primary,#2C2417)] font-serif leading-[1.08] tracking-[-0.02em] opacity-0">
                                Our Gallery
                            </h2>
                            <p className="gallery-desc max-w-[900px] text-base text-center text-[var(--color-paragraph)] font-normal font-serif opacity-0">
                                Over the years, TDI has earned recognition for its commitment to quality construction, ethical practices, and visionary township development. Each award reflects the trust of our customers and the strength of our long-standing legacy.
                            </p>
                        </div>
                    </div>

                    <div className="relative flex justify-between gap-0 mb-12">
                        {categories.map((cat, i) => (
                            <button
                                key={cat}
                                onClick={() => handleTabChange(cat)}
                                className={`relative py-3 text-md  md:text-lg cursor-pointer font-serif font-normal transition-colors duration-300 whitespace-nowrap ${activeCategory === cat
                                    ? "text-[var(--color-primary)]"
                                    : "text-[#070707] hover:text-[var(--color-primary)]"
                                    }`}
                            >


                                {cat}
                                {activeCategory === cat && (
                                    <motion.div
                                        layoutId="activeTabLine"
                                        className="absolute bottom-[-1px] left-0 right-0 h-[2px] bg-[var(--color-accent)]"
                                        transition={{ type: "spring", stiffness: 500, damping: 40 }}
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <AnimatePresence>
                        {showFilter && (
                            <motion.div
                                initial={{ opacity: 0, y: -30 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -30 }}
                                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                                className="flex justify-between items-center mb-10"
                            >
                                <h3 className="text-lg font-serif">Select Filter</h3>

                                <div className="flex gap-12">

                                    {/* Project */}
                                    <div className="flex items-center gap-3">
                                        <span>Project:</span>
                                        <select
                                            value={selectedProject}
                                            onChange={(e) => setSelectedProject(e.target.value)}
                                            className="border-b border-[#C5B9A5] bg-transparent outline-none cursor-pointer"
                                        >
                                            <option value="All">All Projects</option>
                                            <option value="Kundli">Kundli</option>
                                            <option value="Sonipat">Sonipat</option>
                                        </select>
                                    </div>

                                    {/* Year */}
                                    <div className="flex items-center gap-3">
                                        <span>Year:</span>
                                        <select
                                            value={selectedYear}
                                            onChange={(e) => setSelectedYear(e.target.value)}
                                            className="border-b border-[#C5B9A5] bg-transparent outline-none cursor-pointer"
                                        >
                                            <option value="All">All Years</option>
                                            <option value="2025">2025</option>
                                            <option value="2024">2024</option>
                                            <option value="2023">2023</option>
                                        </select>
                                    </div>

                                    {/* Quarter */}
                                    <div className="flex items-center gap-3">
                                        <span>Quarter:</span>
                                        <select
                                            value={selectedQuarter}
                                            onChange={(e) => setSelectedQuarter(e.target.value)}
                                            className="border-b border-[#C5B9A5] bg-transparent outline-none cursor-pointer"
                                        >
                                            <option value="All">All Quarters</option>
                                            <option value="Jan - Mar">Jan - Mar</option>
                                            <option value="April - June">April - June</option>
                                            <option value="June - Sep">June - Sep</option>
                                            <option value="Oct - Dec">Oct - Dec</option>
                                        </select>
                                    </div>

                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-3 auto-rows-[240px] md:auto-rows-[280px]">

                        <AnimatePresence mode="wait">
                            {filteredImages.map((image, index) => (
                                <GalleryCard
                                    key={`${categoryKey}-${image.id}`}
                                    image={image}
                                    index={index}
                                    categoryKey={categoryKey}
                                    onClick={() => openLightbox(index)}
                                />
                            ))}
                        </AnimatePresence>
                    </div>

                    <div className="mt-12 flex items-center justify-between">
                        <div className="h-[1px] flex-1 bg-[#D8D0C4]" />
                        <span className="mx-6 text-[10px] text-[#070707] font-serif uppercase">
                            {String(filteredImages.length).padStart(2, "0")} Images
                        </span>
                        <div className="h-[1px] flex-1 bg-[#D8D0C4]" />
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {lightboxIndex !== null && (
                    <Lightbox
                        images={filteredImages}
                        currentIndex={lightboxIndex}
                        onClose={closeLightbox}
                        onPrev={prevImage}
                        onNext={nextImage}
                    />
                )}
            </AnimatePresence>
        </>
    );
};

export default Gallery;