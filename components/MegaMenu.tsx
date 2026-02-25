"use client";

import React from "react";
import Link from "next/link";
import { X, Search } from "lucide-react";
import { motion, AnimatePresence, Variants } from "framer-motion";

interface MenuItem {
    name: string;
    href: string;
}

interface MenuCategory {
    title: string;
    items: MenuItem[];
}

export const menuData = [
    {
        title: "Residential",
        items: [
            { name: "Tuscan City", href: "/residential/tuscan-city" },
            { name: "Tuscan Floors", href: "/residential/tuscan-floors" },
            { name: "Tuscan Heights", href: "/residential/tuscan-heights" },
            { name: "TDI Espania-1", href: "/residential/tdi-espania-1" },
            { name: "Espania-1 Floors", href: "/residential/espania-1-floors" },
            { name: "Espania-1 Heights", href: "/residential/espania-1-heights" },
        ],
    },
    {
        title: "Commercial",
        items: [
            { name: "TDI Mall Kundli", href: "/commercial/tdi-mall-kundli" },
            { name: "Rodeo Drive Mall", href: "/commercial/rodeo-drive-mall" },
        ],
    },
    {
        title: "Healthcare",
        items: [
            { name: "Samarpan Cancer Hospital", href: "/healthcare/samarpan-cancer-hospital" },
            { name: "Noble Multispecialty Hospital", href: "/healthcare/noble-multispecialty-hospital" },
            { name: "Nulife Super Specialty Hospital", href: "/healthcare/nulife-super-specialty-hospital" },
        ],
    },
    {
        title: "Educational",
        items: [
            { name: "TDI International School", href: "/educational/tdi-international-school" },
            { name: "GD Goenka Pre School", href: "/educational/gd-goenka-pre-school" },
        ],
    },
];

interface MegaMenuProps {
    isOpen: boolean;
    onClose: () => void;
    onMouseEnter?: () => void;
    onMouseLeave?: () => void;
}

const backdropVariants: Variants = {
    initial: {
        opacity: 0,
    },
    enter: {
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: "easeOut",
        },
    },
    exit: {
        opacity: 0,
        transition: {
            duration: 0.3,
            ease: "easeIn",
            delay: 0.2,
        },
    },
};

const menuVariants: Variants = {
    initial: {
        y: "-100%",
    },
    enter: {
        y: "0%",
        transition: {
            duration: 1,
            ease: [0.76, 0, 0.24, 1],
        },
    },
    exit: {
        y: "-100%",
        transition: {
            duration: 0.7,
            ease: [0.76, 0, 0.24, 1],
        },
    },
};

const MegaMenu: React.FC<MegaMenuProps> = ({ isOpen, onClose, onMouseEnter, onMouseLeave }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    key="mega-menu-backdrop"
                    variants={backdropVariants}
                    initial="initial"
                    animate="enter"
                    exit="exit"
                    className="fixed inset-0 z-50 "
                    // className="fixed inset-0 z-50 bg-white/95 backdrop-blur-sm"
                    style={{ top: "96px" }}
                    onClick={onClose}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                >
                    <div className="w-full h-full relative">
                        <motion.div
                            variants={menuVariants}
                            initial="initial"
                            animate="enter"
                            exit="exit"
                            className="w-full bg-white pt-10 pb-20 shadow-xl border-t border-gray-100 absolute left-0 top-0"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="containers mx-auto px-6 md:px-10 font-serif">
                                <div className="flex justify-between items-start mb-16">
                                    <div className="flex-1"></div>

                                    <div className="flex items-center gap-8">
                                        <div className="relative group">
                                            <input
                                                type="text"
                                                placeholder="Search a project name"
                                                className="border-b border-gray-300 py-2 w-64 focus:outline-none focus:border-[#D9991F] text-gray-600 font-serif bg-transparent placeholder-gray-400 transition-colors"
                                            />
                                            <Search className="w-5 h-5 text-gray-400 absolute right-0 top-2" />
                                        </div>

                                        <button onClick={onClose} className="group">
                                            <div className="w-10 h-10 rounded-full border border-[#D9991F] flex items-center justify-center text-[#D9991F] hover:bg-[#D9991F] hover:text-white transition-all duration-300">
                                                <X size={20} />
                                            </div>
                                        </button>
                                    </div>
                                </div>

                                {/* Grid Content */}
                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                                    {menuData.map((category, index) => (
                                        <div key={index} className="space-y-8">
                                            <h3 className="text-3xl font-serif text-[#232E5A] tracking-tight">{category.title}</h3>
                                            <ul className="space-y-4">
                                                {category.items.map((item, idx) => (
                                                    <li key={idx}>
                                                        <Link
                                                            href={item.href}
                                                            className="text-[#424242] hover:text-[#D9991F] transition-colors  text-base block py-1"
                                                        >
                                                            {item.name}
                                                        </Link>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="pt-2">
                                                <Link
                                                    href={`/${category.title.toLowerCase()}`}
                                                    className="text-[#D9991F] text-base font-light hover:underline  inline-flex items-center gap-2 group"
                                                >
                                                    View All
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default MegaMenu;
