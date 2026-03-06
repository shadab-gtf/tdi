"use client";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import footerBg from "@/public/assets/images/footer.png";
import logo from "@/public/assets/images/logo.png";

const Footer = () => {
    const pathname = usePathname();

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const getLinkClassName = (href: string) => {
        const isActive = pathname === href;
        return `transition-colors hover:text-[var(--color-accent)] ${isActive ? "text-[var(--color-accent)] font-medium" : "text-white/80"
            }`;
    };

    return (
        <footer className="relative  w-full bg-[#2D3565] pt-16 md:pt-20 pb-7 text-white overflow-hidden">
            <div className="absolute inset-0 z-0">
                <Image
                    src={footerBg}
                    alt="Footer Background"
                    fill
                    className="object-contain object-top opacity-5"
                />
            </div>

            <div className="relative z-10 containers mx-auto" >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 mb-10 md:mb-20 px-2 md:px-12">
                    <div className="lg:col-span-2 flex justify-center lg:justify-start items-start">
                        <div className="relative w-20 md:w-28 lg:w-28 aspect-[132/177]">
                            <Image
                                src={logo}
                                alt="TDI Logo"
                                fill
                                className="object-contain"
                                priority
                            />
                        </div>
                    </div>

                    <div className="lg:col-span-10 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                        {/* Links Column */}
                        <div className="space-y-6">
                            <h4 className="font-serif text-lg md:text-xl mb-4 text-white!">Our Profile</h4>
                            <ul className="space-y-4 text-sm font-light text-white! font-serif">

                                <li><Link href="/" className={getLinkClassName("/")}>Home</Link></li>
                                <li><Link href="/about" className={getLinkClassName("/about")}>Township Overview</Link></li>
                                <li><Link href="/amenities" className={getLinkClassName("/amenities")}>Amenities</Link></li>
                                <li><Link href="/about-tdi" className={getLinkClassName("/about-tdi")}>About TDI</Link></li>
                                <li><Link href="/contact" className={getLinkClassName("/contact")}>Contact Us</Link></li>
                                {/* <li><Link href="/profile" className={getLinkClassName("/profile")}>Our Profile</Link></li>
                               
                                <li><Link href="/leadership" className={getLinkClassName("/leadership")}>Leadership</Link></li>
                               
                                <li><Link href="/partners" className={getLinkClassName("/partners")}>Partners</Link></li> */}
                            </ul>
                        </div>

                        {/* Featured Column */}
                        {/* <div className="space-y-6">
                            <h4 className="font-serif text-lg md:text-xl mb-4 text-white!">Featured</h4>
                            <ul className="space-y-4 text-sm font-light text-white! font-serif">
                                <li><Link href="/media" className={getLinkClassName("/media")}>Media Center</Link></li>
                                <li><Link href="/testimonials" className={getLinkClassName("/testimonials")}>Testimonial</Link></li>
                               
                            </ul>
                        </div> */}
                        <div className="space-y-6">
                            <h4 className="font-serif text-lg md:text-xl mb-4 text-white!">Our Projects</h4>
                            <ul className="space-y-4 text-sm font-light text-white! font-serif">
                                <li><Link href="/residential" className={getLinkClassName("/residential")}>Residential</Link></li>
                                <li><Link href="/commercial" className={getLinkClassName("/commercial")}>Commercial</Link></li>
                                <li><Link href="/educational" className={getLinkClassName("/educational")}>Educational</Link></li>
                                <li><Link href="/healthcare" className={getLinkClassName("/healthcare")}>Healthcare</Link></li>
                                <li><Link href="/new-launch" className={getLinkClassName("/new-launch")}>New Launch</Link></li>
                            </ul>
                        </div>
                        <div className="space-y-6">
                            <h4 className="font-serif text-lg md:text-xl mb-4 text-white!">Newsroom</h4>
                            <ul className="space-y-4 text-sm font-light text-white! font-serif">
                                <li><Link href="/press" className={getLinkClassName("/press")}>Media Center</Link></li>
                                <li><Link href="/blogs" className={getLinkClassName("/blogs")}>Blogs</Link></li>
                                <li><Link href="/csr" className={getLinkClassName("/csr")}>CSR</Link></li>
                                <li><Link href="/awards" className={getLinkClassName("/awards")}>Awards</Link></li>
                                <li><Link href="/gallery" className={getLinkClassName("/gallery")}>Gallery</Link></li>
                                <li><Link href="/faq" className={getLinkClassName("/faq")}>FAQ's</Link></li>
                                {/* <li><Link href="/news" className={getLinkClassName("/news")}>News</Link></li> */}
                                {/* <li><Link href="/press-release" className={getLinkClassName("/press-release")}>Press Release</Link></li>
                                <li><Link href="/contact" className={getLinkClassName("/contact")}>Contact</Link></li> */}
                            </ul>
                        </div>

                        <div className="space-y-6">
                            <h4 className="font-serif text-lg md:text-xl mb-4 text-white!">Policies</h4>
                            <ul className="space-y-4 text-sm font-light text-white! font-serif">
                                <li><Link href="/disclaimer" className={getLinkClassName("/disclaimer")}>Disclaimer</Link></li>
                                <li><Link href="/privacy" className={getLinkClassName("/privacy")}>Privacy Policy</Link></li>
                                <li><Link href="/terms" className={getLinkClassName("/terms")}>Terms & Conditions</Link></li>
                            </ul>
                        </div>


                    </div>
                </div>

                {/* Bottom Section */}
                <div className="border-b border-white/10 py-5 mb-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center relative z-10">
                    <div className="flex md:flex-col flex-row justify-between items-center">
                        <h4 className="font-serif text-lg md:text-xl mb-4 text-white!">Address</h4>
                        <p className="text-base font-light text-white! font-serif">Delhi, India</p>
                    </div>

                    <div className="flex md:flex-col flex-row justify-between items-center border-t md:border-t-0 md:border-l border-white/20 md:border-r py-2 md:py-0">
                        <h4 className="font-serif text-lg md:text-xl mb-4 text-white!">Contact</h4>
                        <p className="text-base font-light text-white! font-serif">+1 234 567 890</p>
                    </div>

                    <div className="flex flex-col items-center">
                        <h4 className="font-serif text-lg md:text-xl mb-4 text-white!">Social Media</h4>
                        <div className="flex gap-6 mt-1">
                            {/* Social links usually use external URLs, so active state is rare, but logic remains same */}
                            <Link href="https://www.instagram.com/tdiinfrastructureltd/" className="hover:text-[var(--color-accent)] font-light  transition-colors">Instagram</Link>
                            <Link href="https://www.facebook.com/TdiInfrastructureLimited" className="hover:text-[var(--color-accent)] font-light  transition-colors">Facebook</Link>
                            <Link href="https://www.youtube.com/@TDIInfrastructure" className="hover:text-[var(--color-accent)]  font-light transition-colors">Youtube</Link>
                            <Link href="https://www.linkedin.com/company/tdi-infrastructure/?viewAsMember=true" className="hover:text-[var(--color-accent)] font-light  transition-colors">Linkedin</Link>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row justify-between items-center text-xs font-serif px-2 md:px-12">
                    <p className="md:text-base text-xs font-light text-white! font-serif">©2026 All Rights Reserved By GTF Technologies</p>
                    <button
                        onClick={scrollToTop}
                        className="flex md:justify-center justify-end items-center gap-2 hover:text-[var(--color-accent)] cursor-pointer text-xs md:text-base transition-colors mt-4 md:mt-0 group"
                    >
                        Back To Top
                    </button>
                </div>
            </div>
        </footer>
    );
};

export default Footer;