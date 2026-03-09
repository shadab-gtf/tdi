"use client";
import { useRef } from "react";
import Image from "next/image";
import { MoveLeft, MoveRight } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import type { Swiper as SwiperType } from "swiper";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";

const awardsData = [
    {
        id: 1,
        year: "2026",
        title: "Excellent Township",
        subtitle: "Of The Year",
        image: "/assets/images/awward/4.png",
    },
    {
        id: 2,
        year: "2025",
        title: "Leadership Excellence",
        subtitle: "Award North",
        image: "/assets/images/awward/2.png",
    },
    {
        id: 3,
        year: "2025",
        title: "Excellent Township",
        subtitle: "Of The Year Award",
        image: "/assets/images/awward/3.png",
    },
    {
        id: 4,
        year: "2025",
        title: "Young Industry",
        subtitle: "Leader Award",
        image: "/assets/images/awward/1.png",
    },
    // {
    //     id: 5,
    //     year: "2025",
    //     title: "Excellent Township",
    //     subtitle: "Of The Year",
    //     image: "/assets/images/awward/1.png",
    // },
    // {
    //     id: 6,
    //     year: "2025",
    //     title: "Leadership Excellence",
    //     subtitle: "Award North",
    //     image: "/assets/images/awward/2.png",
    // },
];

interface AwardsProps {
    filterYear?: string;
    showHeader?: boolean;
    showFooterText?: boolean;
}

const Awards = ({ filterYear = "All", showHeader = true, showFooterText = false }: AwardsProps) => {
    const swiperRef = useRef<SwiperType | null>(null);

    const filteredAwards =
        filterYear === "All"
            ? awardsData
            : awardsData.filter((item) => item.year === filterYear);

    return (
        <section className="w-full bg-[#F0F4FA] py-10 md:py-16 px-4 overflow-hidden">
            <div className="containers mx-auto">
                {/* Header */}
                {showHeader && (
                    <div className="text-center mb-8 md:mb-12 max-w-4xl mx-auto" data-aos="reveal-top">
                        <h2 className="text-xl md:text-[25px] font-serif my-2 md:my-4">
                            Awards &amp; Recognition
                        </h2>
                        <p className="text-[var(--color-secondary)] font-serif text-sm md:text-base leading-relaxed">
                            Celebrating distinguished industry accolades and milestones that epitomize our unwavering commitment to superior quality, innovative design, and trusted development.
                        </p>
                    </div>
                )}


                {/* Slider Wrapper */}
                <div className="relative max-w-7xl mx-auto" data-aos="fade-up" data-aos-delay="200">
                    {/* Prev Button */}
                    <button
                        onClick={() => swiperRef.current?.slidePrev()}
                        aria-label="Previous"
                        className="hidden md:flex absolute left-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full border border-[#D4AF37] text-black bg-transparent hover:bg-[#D4AF37] hover:text-white transition-all duration-300 -translate-x-12 lg:-translate-x-14 cursor-pointer hover:shadow-lg active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <MoveLeft size={18} />
                    </button>

                    {/* Swiper Slider */}
                    <div className="w-full">
                        <Swiper
                            onSwiper={(swiper) => (swiperRef.current = swiper)}
                            modules={[Navigation]}
                            spaceBetween={0}
                            slidesPerView={1.2}
                            breakpoints={{
                                325: { slidesPerView: 1.2 },
                                360: { slidesPerView: 1.5 },
                                400: { slidesPerView: 2 },
                                480: { slidesPerView: 2 },
                                768: { slidesPerView: 3 },
                                1024: { slidesPerView: 4 },
                            }}
                            className="awards-swiper"
                        >
                            {filteredAwards.map((item, index) => {
                                const isLast = index === filteredAwards.length - 1;
                                return (
                                    <SwiperSlide key={item.id} className="md:w-[322px]!">
                                        <div className="flex gap-2 items-center h-full">
                                            {/* Card */}
                                            <div className="flex-1 flex flex-col items-center px-3 md:px-8 py-4">
                                                {/* Image */}
                                                <div
                                                    className="relative w-[140px] h-[140px] sm:w-[160px] sm:h-[160px] md:w-[180px] md:h-[180px] overflow-hidden shadow-md"
                                                >
                                                    <Image
                                                        src={item.image}
                                                        alt={`${item.title} ${item.subtitle}`}
                                                        fill
                                                        className="object-contain"
                                                        draggable={false}
                                                    />
                                                </div>

                                                {/* Text */}
                                                <div className="text-center mt-1 md:mt-2 space-y-1">
                                                    <h4 className="text-lg sm:text-xl md:text-2xl font-semibold font-serif text-[var(--color-accent)]! ">
                                                        {item.year}
                                                    </h4>
                                                    <p className="text-xs md:text-sm font-normal text-black! font-serif text-gray-800 leading-snug">
                                                        {item.title}
                                                        <br />
                                                        {item.subtitle}
                                                    </p>
                                                    {showFooterText && (
                                                        <p className="text-center text-[#232E5A]! font-serif text-[10px] md:text-[12px] leading-relaxed mb-6">
                                                            (By the times of india)
                                                        </p>
                                                    )}
                                                </div>
                                            </div>


                                            {/* Vertical Separator */}
                                            {!isLast && (
                                                <div className="flex items-center self-stretch py-4">
                                                    <div
                                                        className="w-px bg-gradient-to-b separator-line from-[#D58C004D] via-[#D58C0080] to-[#D58C004D]"
                                                        style={{ height: "100%" }}
                                                    />
                                                </div>
                                            )}
                                        </div>
                                    </SwiperSlide>
                                );
                            })}
                        </Swiper>
                    </div>

                    {/* Next Button */}
                    <button
                        onClick={() => swiperRef.current?.slideNext()}
                        aria-label="Next"
                        className="hidden md:flex absolute right-0 top-1/2 -translate-y-1/2 z-20 w-12 h-12 items-center justify-center rounded-full border border-[#D4AF37] text-black bg-transparent hover:bg-[#D4AF37] hover:text-white transition-all duration-300 translate-x-14 cursor-pointer hover:shadow-lg active:scale-95 disabled:opacity-30 disabled:cursor-not-allowed"
                    >
                        <MoveRight size={18} />
                    </button>

                    {/* Mobile Controls */}
                    <div className="flex md:hidden justify-center gap-4 mt-6">
                        <button
                            onClick={() => swiperRef.current?.slidePrev()}
                            className="p-2 rounded-full border border-[#D4AF37] text-[#D4AF37] bg-white/80 backdrop-blur-sm shadow-md transition-opacity active:scale-95"
                        >
                            <MoveLeft size={18} />
                        </button>
                        <button
                            onClick={() => swiperRef.current?.slideNext()}
                            className="p-2 rounded-full border border-[#D4AF37] text-[#D4AF37] bg-white/80 backdrop-blur-sm shadow-md transition-opacity active:scale-95"
                        >
                            <MoveRight size={18} />
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Awards;
