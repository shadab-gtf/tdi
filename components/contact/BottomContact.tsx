"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import Link from "next/link";

gsap.registerPlugin(ScrollTrigger);

const contactData = [
    { title: "LEASING", email: "democity@group.com" },
    { title: "VENDOR HELPDESK", email: "democity@group.com" },
    { title: "MEDIA RELATIONS", email: "democity@group.com" },
    { title: "HUMAN RESOURCES", email: "democity@group.com" },
    { title: "LEASING", email: "democity@group.com" },
    { title: "SALES", email: "democity@group.com" },
];

export default function BottomContact() {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            // Sunburst Rotation
            gsap.to(".sunburst-bottom", {
                rotation: 360,
                duration: 60,
                repeat: -1,
                ease: "linear",
            });

            // Fade in animation for items
            gsap.from(".contact-item", {
                y: 30,
                opacity: 0,
                duration: 0.8,
                stagger: 0.1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: containerRef.current,
                    start: "top 80%",
                }
            });
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <section ref={containerRef} className="relative w-full py-20 overflow-hidden bg-white">
            {/* Sunburst Background */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-0 w-[376px] h-[376px] flex items-center justify-center">
                <Image
                    src="/assets/images/sunburst.png"
                    alt="Sunburst"
                    width={1000}
                    height={1000}
                    className="sunburst-bottom w-full h-full object-contain"
                />
            </div>

            <div className="containers mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Top Row (4 items) */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-b border-[#EAE0D5]">
                    {contactData.slice(0, 4).map((item, index) => (
                        <div
                            key={index}
                            className={cn(
                                "contact-item flex flex-col items-center justify-center py-12 px-4 text-center",
                                index !== 3 && "lg:border-r border-[#EAE0D5]",
                                index % 2 === 0 && "md:border-r lg:border-r-0 border-[#EAE0D5]",
                                index !== 3 ? "lg:border-r border-[#EAE0D5]" : "lg:border-r-0"
                            )}
                        >
                            <h3 className="text-[#232E5A] font-serif uppercase text-[25px] mb-4 ">
                                {item.title}
                            </h3>
                            <Link href={`mailto:${item.email}`} className="text-[#424242] font-serif hover:text-[#232E5A] transition-colors duration-300">
                                {item.email}
                            </Link>
                        </div>
                    ))}
                    {/* Fix Borders for Tablet separately if needed, but grid gap/divide might be easier. 
                        Let's stick to explicit classes for the specific "border right" request.
                        The logic above:
                        - Mobile: No right borders assumed (stacked).
                        - MD: 2 cols. So 0, 2 should have right borders.
                        - LG: 4 cols. 0, 1, 2 have right borders.
                    */}
                </div>

                {/* Bottom Row (2 items) */}
                <div className="flex flex-col md:flex-row justify-center items-center">
                    {contactData.slice(4, 6).map((item, index) => (
                        <div
                            key={index + 4}
                            className={cn(
                                "contact-item flex flex-col items-center justify-center py-12 px-12 md:px-24 text-center w-full md:w-auto",
                                // Item 5 (index 0 here) has right border.
                                index === 0 && "md:border-r border-[#EAE0D5]"
                            )}
                        >
                            <h3 className="text-[#232E5A] font-serif uppercase tracking-widest text-sm mb-4 font-semibold">
                                {item.title}
                            </h3>
                            <a href={`mailto:${item.email}`} className="text-[#767676] font-sans text-sm hover:text-[#232E5A] transition-colors duration-300">
                                {item.email}
                            </a>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
