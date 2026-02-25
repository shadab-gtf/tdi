"use client";

import React, { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Search, ArrowRight, Menu, X, Command } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import MegaMenu, { menuData } from "./MegaMenu";
import { usePathname } from "next/navigation";
import SearchModal from "./SearchModal";

gsap.registerPlugin(ScrollTrigger);

const Header = () => {
    const [isMegaMenuOpen, setIsMegaMenuOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isMenuLocked, setIsMenuLocked] = useState(false);
    const [isProjectsExpanded, setIsProjectsExpanded] = useState(false);
    const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const headerRef = useRef<HTMLElement>(null);
    const pathname = usePathname();
    const isActive = isMegaMenuOpen || isMobileMenuOpen;

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setIsSearchModalOpen((prev) => !prev);
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    useEffect(() => {
        if (!headerRef.current) return;
        const VELOCITY_THRESHOLD = 800;
        let isHidden = false;

        const ctx = gsap.context(() => {
            ScrollTrigger.create({
                start: 0,
                end: "max",
                onUpdate: (self) => {
                    const velocity = self.getVelocity();
                    if (isActive) {
                        gsap.to(headerRef.current, {
                            yPercent: 0,
                            duration: 0.3,
                            ease: "power3.out",
                        });
                        isHidden = false;
                        return;
                    }
                    if (velocity > VELOCITY_THRESHOLD && !isHidden) {
                        isHidden = true;
                        gsap.to(headerRef.current, {
                            yPercent: -100,
                            duration: 0.55,
                            ease: "power4.out",
                        });
                    }
                    if (velocity < -200 && isHidden) {
                        isHidden = false;
                        gsap.to(headerRef.current, {
                            yPercent: 0,
                            duration: 0.45,
                            ease: "power3.out",
                        });
                    }
                },
            });
        }, headerRef);
        return () => ctx.revert();
    }, [isActive]);

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsMegaMenuOpen(true);
    };

    const handleMouseLeave = () => {
        if (!isMenuLocked) {
            timeoutRef.current = setTimeout(() => {
                setIsMegaMenuOpen(false);
            }, 200);
        }
    };

    const handleToggleMenu = (e: React.MouseEvent) => {
        e.preventDefault();
        if (isMenuLocked) {
            setIsMenuLocked(false);
            setIsMegaMenuOpen(false);
        } else {
            setIsMenuLocked(true);
            setIsMegaMenuOpen(true);
        }
    };

    const handleCloseMenu = () => {
        setIsMenuLocked(false);
        setIsMegaMenuOpen(false);
    };

    const navLinks = [
        { name: "TOWNSHIP OVERVIEW", href: "/about" },
        { name: "OUR PROJECTS", href: "/our-projects", hasMegaMenu: true },
        { name: "AMENITIES", href: "/amenities" },
        { name: "ABOUT TDI", href: "/about-tdi" },
    ];

    return (
        <>
            <header
                ref={headerRef}
                className="fixed w-full top-0 z-[60] bg-[#232E5A] text-white shadow-md transition-all duration-300 md:h-24 h-20 flex items-center"
            >
                <div className="containers mx-auto px-6 flex items-center font-serif justify-between h-full">
                    <div className="flex justify-evenly items-center gap-14">

                        <Link href="/" className="relative z-50 block h-16 w-auto ">
                            <Image
                                src="/assets/images/logo.png"
                                alt="TDI City Logo"
                                width={58}
                                height={78}
                                className="h-14 md:h-full w-auto object-contain"
                                priority
                            />
                        </Link>

                        <nav className="hidden lg:flex items-center gap-16 xl:gap-16 h-full">
                            {navLinks.map((link, index) => (
                                <div
                                    key={index}
                                    className="relative h-full flex items-center"
                                >
                                    {link.hasMegaMenu ? (
                                        <div className="flex items-center gap-1">
                                            <Link
                                                href={link.href}
                                                className={`text-xs xl:text-sm font-light tracking-wide transition-colors
                                                  ${pathname === link.href
                                                        ? "text-[var(--color-accent)]"
                                                        : "text-white hover:text-[var(--color-accent)]"}`}
                                            >
                                                {link.name}
                                            </Link>
                                            <button
                                                className={`p-1 hover:bg-white/10 cursor-pointer rounded-full transition-all duration-300 ${isMegaMenuOpen ? "text-[#D9991F] rotate-180" : "text-white"}`}
                                                onClick={handleToggleMenu}
                                                onMouseEnter={handleMouseEnter}
                                                onMouseLeave={handleMouseLeave}
                                            >
                                                <ChevronDown className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <Link
                                            href={link.href}
                                            className={`text-xs xl:text-sm font-light tracking-wide transition-colors
                                                   ${pathname === link.href
                                                    ? "text-[var(--color-accent)]"
                                                    : "text-white hover:text-[var(--color-accent)]"}`}
                                        >
                                            {link.name}
                                        </Link>
                                    )}
                                </div>
                            ))}
                        </nav>
                    </div>

                    <div className="hidden lg:flex items-center gap-4 xl:gap-8">
                        <div className="relative group" onClick={() => setIsSearchModalOpen(true)}>
                            <input
                                type="text"
                                placeholder="Search here"
                                // className="bg-transparent border-b border-white/30 text-white placeholder-white/70 py-1 w-32 xl:w-48 focus:outline-none focus:border-[#D9991F] focus:w-48 xl:focus:w-64 transition-all duration-300 text-sm "
                                className="bg-transparent border-b border-white/30 text-white placeholder-white/70 py-1 w-32 xl:w-48 focus:outline-none focus:border-[#D9991F] transition-all duration-300 text-sm "
                            />
                            <Search className="w-4 h-4 text-white absolute right-0 top-2 pointer-events-none" />
                        </div>

                        <Link
                            href="/enquire"
                            className={`flex items-center gap-2 text-xs xl:text-sm font-light tracking-wide transition-colors uppercase whitespace-nowrap
                                   ${pathname === "/enquire"
                                    ? "text-[var(--color-accent)]"
                                    : "text-white hover:text-[var(--color-accent)]"}`}
                        >
                            ENQUIRE NOW
                            <ArrowRight className="w-4 h-4" />
                        </Link>
                    </div>
                    {/* Mobile Menu Button */}
                    <div className="flex items-center gap-4 lg:hidden z-50">
                        <div className="relative group" onClick={() => setIsSearchModalOpen(true)}>
                            <input
                                type="text"
                                placeholder="Search here"
                                className="bg-transparent border-b border-white/30 text-white placeholder-white/70 py-1 w-32 xl:w-48 focus:outline-none focus:border-[#D9991F]  transition-all duration-300 text-sm "
                            />
                            <Search className="w-4 h-4 text-white absolute right-0 top-2 pointer-events-none" />
                        </div>
                        <button
                            className="p-1 text-white"
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        >
                            {isMobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>
            </header>

            <MegaMenu
                isOpen={isMegaMenuOpen}
                onClose={handleCloseMenu}
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            />

            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ y: "-100%" }}
                        animate={{ y: 0 }}
                        exit={{ y: "-100%" }}
                        transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
                        className="fixed top-20 md:top-24 left-0 w-full h-[calc(100vh-5rem)] md:h-[calc(100vh-6rem)] z-40 bg-[#232E5A] overflow-y-auto lg:hidden flex flex-col pt-10"
                    >
                        <div className="flex-1 px-6 pb-10">
                            <div className="flex flex-col gap-6">
                                {navLinks.map((link, index) => (
                                    <div key={index}>
                                        {link.hasMegaMenu ? (
                                            <div className="flex flex-col">
                                                <div className="flex items-center justify-between text-xl font-serif text-white border-b border-white/10 pb-4">
                                                    <Link
                                                        href={link.href}
                                                        onClick={() => setIsMobileMenuOpen(false)}
                                                    >
                                                        {link.name}
                                                    </Link>
                                                    <div
                                                        className="cursor-pointer p-1"
                                                        onClick={(e) => {
                                                            e.preventDefault();
                                                            setIsProjectsExpanded(!isProjectsExpanded);
                                                        }}
                                                    >
                                                        <ChevronDown
                                                            className={`w-5 h-5 transition-transform duration-300 ${isProjectsExpanded ? "rotate-180 text-[#D9991F]" : ""}`}
                                                        />
                                                    </div>
                                                </div>
                                                <AnimatePresence>
                                                    {isProjectsExpanded && (
                                                        <motion.div
                                                            initial={{ height: 0, opacity: 0 }}
                                                            animate={{ height: "auto", opacity: 1 }}
                                                            exit={{ height: 0, opacity: 0 }}
                                                            className="overflow-hidden"
                                                        >
                                                            <div className="pl-4 py-2 flex flex-col gap-4">
                                                                {menuData.map((category, idx) => (
                                                                    <div key={idx} className="flex flex-col gap-2">
                                                                        <h4 className="md:text-[#D9991F] text-white! font-serif font-light text-sm uppercase tracking-wider">
                                                                            {category.title}
                                                                        </h4>
                                                                        {category.items.map((item, i) => (
                                                                            <Link
                                                                                key={i}
                                                                                href={item.href}
                                                                                className="text-white/80 font-serif text-sm hover:text-white py-1"
                                                                                onClick={() => setIsMobileMenuOpen(false)}
                                                                            >
                                                                                {item.name}
                                                                            </Link>
                                                                        ))}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>
                                            </div>
                                        ) : (
                                            <Link
                                                href={link.href}
                                                className="text-xl font-serif block text-white border-b border-white/10 pb-4"
                                                onClick={() => setIsMobileMenuOpen(false)}
                                            >
                                                {link.name}
                                            </Link>
                                        )}
                                    </div>
                                ))}
                                <Link
                                    href="/enquire"
                                    className="text-xl font-serif text-[#D9991F] border-b border-white/10 pb-4 flex items-center gap-2"
                                    onClick={() => setIsMobileMenuOpen(false)}
                                >
                                    ENQUIRE NOW <ArrowRight size={20} />
                                </Link>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
            <SearchModal
                isOpen={isSearchModalOpen}
                onClose={() => setIsSearchModalOpen(false)}
            />
        </>
    );
};

export default Header;