"use client";
import Image from 'next/image';
import { motion } from 'framer-motion';

const CompanyLogoData = [
    { src: '/assets/images/brand-logo/1.png', alt: 'Brand 1' },
    { src: '/assets/images/brand-logo/wow.png', alt: 'Brand 1' },
    { src: '/assets/images/brand-logo/3.png', alt: 'Brand 3' },
    { src: '/assets/images/brand-logo/4.png', alt: 'Brand 4' },
    { src: '/assets/images/brand-logo/5.png', alt: 'Brand 5' },
    { src: '/assets/images/brand-logo/7.png', alt: 'Brand 7' },
];

const InfiniteScrollingLogosAnimation = () => {
    return (
        <section className="overflow-hidden" data-aos="fade-up" data-aos-delay="400">

            <div className="relative flex w-full">
                <div className="absolute left-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
                <div className="absolute right-0 top-0 bottom-0 w-12 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

                <motion.div
                    className="flex flex-nowrap gap-6 md:gap-6 items-center"
                    animate={{
                        x: ["0%", "-50%"],
                    }}
                    transition={{
                        duration: 30,
                        ease: "linear",
                        repeat: Infinity,
                    }}
                    style={{ width: "fit-content" }}
                >
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex gap-6 md:gap-6 items-center shrink-0">
                            {CompanyLogoData.map((logo, index) => (
                                <div
                                    key={`${i}-${index}`}
                                    className="relative md:w-48 w-24 md:h-16 h-12"
                                >
                                    <Image
                                        src={logo.src}
                                        alt={logo.alt}
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            ))}
                        </div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
};

export default InfiniteScrollingLogosAnimation;
