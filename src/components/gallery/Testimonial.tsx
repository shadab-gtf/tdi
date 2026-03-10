"use client";
import { useState, useRef, useEffect, useCallback, useMemo } from "react";
import { motion, useMotionValue, animate, PanInfo } from "framer-motion";

// ─── Data ────────────────────────────────────────────────────────────────────

interface TestimonialItem {
    id: number;
    title: string;
    thumbnail: string;
    videoId: string;
}

const testimonials: TestimonialItem[] = [
    {
        id: 1,
        title: "The Indian Element: D Vishwanathan, Design Consultant At RSP On Golden",
        thumbnail: "https://img.youtube.com/vi/GzFIAmVnqMU/maxresdefault.jpg",
        videoId: "GzFIAmVnqMU",
    },
    {
        id: 2,
        title: "Building Dreams: Arvind Sharma, Homeowner At TDI City Kundli Phase II",
        thumbnail: "https://img.youtube.com/vi/GzFIAmVnqMU/maxresdefault.jpg",
        videoId: "GzFIAmVnqMU",
    },
    {
        id: 3,
        title: "Investment Vision: Priya Kapoor, Real Estate Investor On Long-Term Value",
        thumbnail: "https://img.youtube.com/vi/GzFIAmVnqMU/maxresdefault.jpg",
        videoId: "GzFIAmVnqMU",
    },
    {
        id: 4,
        title: "Community Living: Rajan Mehta, Resident At TDI City On Lifestyle Experience",
        thumbnail: "https://img.youtube.com/vi/GzFIAmVnqMU/maxresdefault.jpg",
        videoId: "GzFIAmVnqMU",
    },
    {
        id: 5,
        title: "Architectural Excellence: Neha Gupta, Interior Designer On TDI Developments",
        thumbnail: "https://img.youtube.com/vi/GzFIAmVnqMU/maxresdefault.jpg",
        videoId: "GzFIAmVnqMU",
    },
];

// ─── Icons ───

const PlayIcon = ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white"><path d="M8 5v14l11-7z" /></svg>
);

const PauseIcon = ({ size = 18 }: { size?: number }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="white"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" /></svg>
);

const NextIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z" /></svg>
);

const VolumeIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" /></svg>
);

const VolumeMuteIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" /></svg>
);

const FullscreenIcon = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" /></svg>
);

const HDIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <rect x="2" y="6" width="20" height="12" rx="2" fill="#cc0000" />
        <text x="12" y="15" textAnchor="middle" fill="white" fontSize="8" fontWeight="bold">HD</text>
    </svg>
);

const CloseIcon = () => (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round"><path d="M18 6L6 18M6 6l12 12" /></svg>
);

const ExpandIcon = () => (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="white"><path d="M21 11V3h-8l3.29 3.29-10 10L3 13v8h8l-3.29-3.29 10-10L21 11z" /></svg>
);

// ─── Keyframe styles ──

const GLOBAL_STYLES = `
  @keyframes testimonial-fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes testimonial-eq1 {
    0%, 100% { height: 30%; }
    50% { height: 100%; }
  }
  @keyframes testimonial-eq2 {
    0%, 100% { height: 100%; }
    50% { height: 20%; }
  }
  @keyframes testimonial-eq3 {
    0%, 100% { height: 50%; }
    50% { height: 80%; }
  }
`;

function useGlobalStyles() {
    useEffect(() => {
        const id = "testimonial-carousel-styles";
        if (document.getElementById(id)) return;
        const style = document.createElement("style");
        style.id = id;
        style.textContent = GLOBAL_STYLES;
        document.head.appendChild(style);
    }, []);
}

// ─── Video Popup Modal ────────

function VideoModal({ item, onClose }: { item: TestimonialItem; onClose: () => void }) {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        requestAnimationFrame(() => requestAnimationFrame(() => setVisible(true)));
        const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
        window.addEventListener("keydown", onKey);
        document.body.style.overflow = "hidden";
        return () => {
            window.removeEventListener("keydown", onKey);
            document.body.style.overflow = "";
        };
    }, []);

    const close = () => {
        setVisible(false);
        setTimeout(onClose, 350);
    };

    return (
        <div
            className="fixed inset-0 z-[999] flex items-center justify-center pointer-events-auto"
            onClick={close}
            style={{
                backgroundColor: visible ? "rgba(0,0,0,0.92)" : "rgba(0,0,0,0)",
                transition: "background-color 0.35s ease",
                padding: "clamp(16px, 4vw, 48px)",
            }}
        >
            <button
                onClick={(e) => { e.stopPropagation(); close(); }}
                className="absolute top-3 right-3 sm:top-5 sm:right-5 z-20 w-11 h-11 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center border-none cursor-pointer transition-all duration-200 hover:rotate-90"
                aria-label="Close video"
            >
                <CloseIcon />
            </button>

            <div
                className="w-full max-w-[1100px]"
                onClick={(e) => e.stopPropagation()}
                style={{
                    transform: visible ? "scale(1) translateY(0)" : "scale(0.6) translateY(30px)",
                    opacity: visible ? 1 : 0,
                    transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.35s ease",
                }}
            >
                <div
                    className="relative w-full overflow-hidden"
                    style={{
                        aspectRatio: "16/9",
                        boxShadow: "0 25px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.05)",
                    }}
                >
                    <iframe
                        className="absolute inset-0 w-full h-full border-0"
                        src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&rel=0&modestbranding=1&playsinline=1`}
                        title={item.title}
                        frameBorder="0"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        referrerPolicy="strict-origin-when-cross-origin"
                        allowFullScreen
                    />
                </div>
                <p className="text-white/90 text-sm sm:text-base lg:text-lg font-medium mt-4 text-center px-4 leading-relaxed">
                    {item.title}
                </p>
            </div>
        </div>
    );
}

// ─── Video Card ────

function VideoCard({
    item,
    isCenter,
    onPlay,
    onClick,
    onHoverStart,
    onHoverEnd,
}: {
    item: TestimonialItem;
    isCenter: boolean;
    onPlay: () => void;
    onClick: () => void;
    onHoverStart: () => void;
    onHoverEnd: () => void;
}) {
    const [hovered, setHovered] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const hoverTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const clearHoverTimer = () => {
        if (hoverTimer.current) { clearTimeout(hoverTimer.current); hoverTimer.current = null; }
    };

    const handleMouseEnter = () => {
        setHovered(true);
        if (!isCenter) return;
        onHoverStart();
        hoverTimer.current = setTimeout(() => setShowPreview(true), 450);
    };

    const handleMouseLeave = () => {
        setHovered(false);
        setShowPreview(false);
        setIsMuted(true);
        clearHoverTimer();
        if (isCenter) onHoverEnd();
    };

    useEffect(() => {
        if (!isCenter) {
            setShowPreview(false);
            setHovered(false);
            setIsMuted(true);
            clearHoverTimer();
        }
    }, [isCenter]);

    const handleCardClick = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (isCenter) { setShowPreview(false); onPlay(); }
        else onClick();
    };

    const toggleMute = (e: React.MouseEvent) => { e.stopPropagation(); setIsMuted((m) => !m); };
    const openFull = (e: React.MouseEvent) => { e.stopPropagation(); setShowPreview(false); onPlay(); };

    return (
        <div
            onClick={handleCardClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="cursor-pointer transition-all duration-700 ease-out"
            style={{
                transform: isCenter ? "scale(1)" : "scale(1)",
                opacity: isCenter ? 1 : 0.4,
                filter: isCenter ? "none" : "grayscale(50%)",
            }}
        >
            <div
                className={`relative w-full overflow-hidden bg-neutral-900 ${isCenter ? "shadow-2xl" : "shadow-lg"}`}
                style={{ aspectRatio: "16/10" }}
            >
                <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="absolute inset-0 w-full h-full object-cover block"
                    draggable={false}
                />
                {showPreview && isCenter && (
                    <div className="absolute inset-0 z-[5]" style={{ animation: "testimonial-fadeIn 0.5s ease forwards" }}>
                        <iframe
                            className="absolute inset-0 w-full h-full border-0"
                            src={`https://www.youtube.com/embed/${item.videoId}?autoplay=1&mute=${isMuted ? 1 : 0}&rel=0&modestbranding=1&controls=0&showinfo=0&playsinline=1`}
                            title={`Preview: ${item.title}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                            referrerPolicy="strict-origin-when-cross-origin"
                            style={{ pointerEvents: "none" }}
                        />
                    </div>
                )}

                {showPreview && isCenter && (
                    <div className="absolute top-3 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 px-3 py-1.5 rounded-full backdrop-blur-md" style={{ backgroundColor: "rgba(0,0,0,0.6)" }}>
                        <div className="flex items-end gap-[2px] h-3">
                            <span className="w-[3px] bg-red-500 rounded-full" style={{ animation: "testimonial-eq1 0.8s ease-in-out infinite", height: "60%" }} />
                            <span className="w-[3px] bg-red-500 rounded-full" style={{ animation: "testimonial-eq2 0.6s ease-in-out infinite", height: "100%" }} />
                            <span className="w-[3px] bg-red-500 rounded-full" style={{ animation: "testimonial-eq3 0.7s ease-in-out infinite", height: "40%" }} />
                        </div>
                    </div>
                )}
                {!showPreview && (
                    <div
                        className={`absolute inset-0 flex items-center justify-center z-10 transition-opacity duration-300 ${hovered && isCenter ? "opacity-100" : "opacity-0"}`}
                        style={{ background: "rgba(0,0,0,0.25)" }}
                    >
                        <div
                            className="w-16 h-16 rounded-full flex items-center justify-center border-2 border-white/30 backdrop-blur-lg hover:scale-110 transition-transform"
                            style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
                        >
                            <PlayIcon size={28} />
                        </div>
                    </div>
                )}

                <div className="absolute bottom-0 left-0 right-0 z-20">
                    <div className="w-full h-[3px] bg-white/20">
                        <div
                            className="h-full bg-red-600 rounded-r-sm"
                            style={{
                                width: showPreview ? "100%" : "1%",
                                transition: showPreview ? "width 30s linear" : "none",
                            }}
                        />
                    </div>
                    <div
                        className="flex items-center justify-between px-2.5 py-1.5"
                        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.88), rgba(0,0,0,0.3))" }}
                    >
                        <div className="flex items-center gap-2">
                            {showPreview ? (
                                <button onClick={openFull} className="bg-transparent border-none cursor-pointer p-0.5 flex"><PauseIcon /></button>
                            ) : (
                                <button className="bg-transparent border-none cursor-pointer p-0.5 flex"><PlayIcon /></button>
                            )}
                            <button className="bg-transparent border-none cursor-pointer p-0.5 flex"><NextIcon /></button>
                            <button onClick={toggleMute} className="bg-transparent border-none cursor-pointer p-0.5 flex">
                                {isMuted ? <VolumeMuteIcon /> : <VolumeIcon />}
                            </button>
                        </div>
                        <div className="flex items-center gap-1.5">
                            {showPreview && (
                                <button onClick={openFull} className="bg-transparent border-none cursor-pointer p-0.5 flex hover:scale-110 transition-transform" title="Open full video">
                                    <ExpandIcon />
                                </button>
                            )}
                            <button className="bg-transparent border-none cursor-pointer p-0.5 flex"><HDIcon /></button>
                            <button className="bg-transparent border-none cursor-pointer p-0.5 flex"><FullscreenIcon /></button>
                        </div>
                    </div>
                </div>
            </div>

            <p
                className={`text-lg font-normal font-serif leading-relaxed mt-3.5 text-center px-2 transition-all duration-500 ${isCenter ? "opacity-100 scale-100" : "opacity-30 scale-95"}`}
                style={{ color: "#070707" }}
            >
                {item.title}
            </p>
        </div>
    );
}

// ─── Main Carousel ───

export default function Testimonial() {
    useGlobalStyles();

    const [cardWidth, setCardWidth] = useState(700);
    const [gap, setGap] = useState(30);
    const [playingItem, setPlayingItem] = useState<TestimonialItem | null>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [index, setIndex] = useState(0);

    const x = useMotionValue(0);
    const containerRef = useRef<HTMLDivElement>(null);

    // Cloning for infinite loop (3 sets)
    const items = useMemo(() => [...testimonials, ...testimonials, ...testimonials], []);
    const totalCount = testimonials.length;

    const itemWidth = cardWidth + gap;
    const baseOffset = totalCount * itemWidth;

    const [containerWidth, setContainerWidth] = useState(0);

    useEffect(() => {
        const update = () => {
            const w = window.innerWidth;
            setContainerWidth(w);
            if (w < 640) { setCardWidth(w - 60); setGap(16); }
            else if (w < 1024) { setCardWidth(Math.min(520, w - 120)); setGap(24); }
            else { setCardWidth(Math.min(700, w * 0.45)); setGap(30); }
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const centerOffset = containerWidth / 2 - cardWidth / 2;

    // Sync index with x position for centering effects
    useEffect(() => {
        const unsubscribe = x.on("change", (latest) => {
            const relativeX = latest - centerOffset;
            const newIndex = Math.round(-relativeX / itemWidth);
            setIndex(newIndex);
        });
        return () => unsubscribe();
    }, [x, centerOffset, itemWidth]);

    // Initial position: center of the second set
    useEffect(() => {
        if (containerWidth === 0) return;
        x.set(-baseOffset + centerOffset);
        setIndex(totalCount);
    }, [baseOffset, centerOffset, containerWidth, totalCount, x]);

    const scrollToIndex = useCallback((targetIndex: number, fast = false) => {
        const targetX = -targetIndex * itemWidth + centerOffset;

        animate(x, targetX, {
            type: "spring",
            stiffness: fast ? 400 : 300,
            damping: 35,
            mass: 1,
            onComplete: () => {
                // Infinite Loop Seamless Snap
                let finalIndex = targetIndex;
                if (targetIndex >= totalCount * 2) {
                    finalIndex = targetIndex - totalCount;
                } else if (targetIndex < totalCount) {
                    finalIndex = targetIndex + totalCount;
                }

                if (finalIndex !== targetIndex) {
                    x.set(-finalIndex * itemWidth + centerOffset);
                    setIndex(finalIndex);
                }
            }
        });
    }, [itemWidth, centerOffset, totalCount, x]);

    const handleDragEnd = (_: any, info: PanInfo) => {
        const velocity = info.velocity.x;
        const offset = info.offset.x;

        const swipeThreshold = 50;
        let targetIndex = index;

        if (offset < -swipeThreshold || velocity < -500) {
            targetIndex = index + 1;
        } else if (offset > swipeThreshold || velocity > 500) {
            targetIndex = index - 1;
        }

        scrollToIndex(targetIndex);
    };

    const next = useCallback(() => scrollToIndex(index + 1), [index, scrollToIndex]);
    const prev = useCallback(() => scrollToIndex(index - 1), [index, scrollToIndex]);

    // Auto-play
    useEffect(() => {
        if (playingItem || isHovering) return;
        const id = setInterval(next, 5000);
        return () => clearInterval(id);
    }, [next, playingItem, isHovering]);

    // Keyboard
    useEffect(() => {
        const h = (e: KeyboardEvent) => {
            if (playingItem) return;
            if (e.key === "ArrowLeft") prev();
            if (e.key === "ArrowRight") next();
        };
        window.addEventListener("keydown", h);
        return () => window.removeEventListener("keydown", h);
    }, [prev, next, playingItem]);

    return (
        <>
            <section className="bg-white py-6 sm:py-10 lg:py-16 overflow-hidden select-none relative">
                <h2 className="text-center font-normal text-[18px] md:text-[20px] lg:text-[22px] mb-5 tracking-tight font-serif text-[--var(--color-primary)]">
                    Testimonials
                </h2>

                <p className="text-center text-gray-500 max-w-4xl font-serif mx-auto mb-12 lg:mb-14 leading-relaxed text-sm sm:text-base">
                    Hear from homeowners, investors, and partners who have experienced the
                    growth and planning of TDI City Kundli firsthand. Their stories reflect
                    the trust, confidence, and long-term value built into every development.
                </p>

                <div
                    ref={containerRef}
                    className="relative w-full cursor-grab active:cursor-grabbing"
                    style={{ touchAction: "pan-y" }}
                >
                    <motion.div
                        className="flex will-change-transform"
                        style={{ x }}
                        drag="x"
                        onDragEnd={handleDragEnd}
                        dragConstraints={{ left: -10000, right: 10000 }}
                    >
                        {items.map((item, i) => (
                            <div
                                key={`${item.id}-${i}`}
                                className="flex-none"
                                style={{
                                    width: `${cardWidth}px`,
                                    marginRight: `${gap}px`,
                                }}
                            >
                                <VideoCard
                                    item={item}
                                    isCenter={i === index}
                                    onPlay={() => setPlayingItem(item)}
                                    onClick={() => i !== index && scrollToIndex(i)}
                                    onHoverStart={() => setIsHovering(true)}
                                    onHoverEnd={() => setIsHovering(false)}
                                />
                            </div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {playingItem && <VideoModal item={playingItem} onClose={() => setPlayingItem(null)} />}
        </>
    );
}