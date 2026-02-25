"use client";

import React, { useState, useEffect, useRef, useMemo } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import {
    Search,
    X,
    FolderSearch,
    Command,
    Undo2,
    ExternalLink,
    MoreVertical,
    ChevronDown,
    ArrowRight,
    Loader2
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { mockProjects, type Project, categories } from "@/lib/projectsData";

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
}

const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [activeCategory, setActiveCategory] = useState<string>("all");
    const [isLoading, setIsLoading] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);

    // Prevent scroll when open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
            // Smooth focus
            const timer = setTimeout(() => inputRef.current?.focus(), 300);
            return () => clearTimeout(timer);
        } else {
            document.body.style.overflow = "unset";
            setSearchQuery("");
            setActiveCategory("all");
        }
    }, [isOpen]);

    // Simulate API loading state
    useEffect(() => {
        if (searchQuery) {
            setIsLoading(true);
            const timer = setTimeout(() => setIsLoading(false), 300);
            return () => clearTimeout(timer);
        } else {
            setIsLoading(false);
        }
    }, [searchQuery, activeCategory]);

    const filteredResults = useMemo(() => {
        return mockProjects.filter((project) => {
            const matchesSearch = project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                project.category.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesCategory = activeCategory === "all" || project.category === activeCategory;
            return matchesSearch && matchesCategory;
        });
    }, [searchQuery, activeCategory]);

    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", handleEsc);
        return () => window.removeEventListener("keydown", handleEsc);
    }, [onClose]);

    const containerVariants: Variants = {
        hidden: { opacity: 0, scale: 0.98, y: 10 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 300,
                staggerChildren: 0.05
            }
        },
        exit: {
            opacity: 0,
            scale: 0.98,
            y: 10,
            transition: { duration: 0.2 }
        }
    };

    const itemVariants: Variants = {
        hidden: { opacity: 0, x: -10 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -10 }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-start justify-center pt-[10vh] md:pt-[15vh] px-4 sm:px-6">
                    {/* Rich Backdrop Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-[#0a0f20]/60 backdrop-blur-[12px] transition-all duration-500"
                    />

                    {/* Modal Content */}
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        className="relative w-full max-w-2xl bg-[#FFFFFF] rounded-2xl shadow-[0_32px_64px_-16px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col max-h-[75vh] border border-white/10"
                    >
                        {/* Header / Input */}
                        <div className="flex items-center px-5 py-5 border-b border-gray-100 flex-shrink-0">
                            <div className="relative flex items-center flex-1">
                                {isLoading ? (
                                    <Loader2 className="w-5 h-5 text-[var(--color-accent)] animate-spin mr-3 flex-shrink-0" />
                                ) : (
                                    <Search className="w-5 h-5 text-gray-400 mr-3 flex-shrink-0" />
                                )}
                                <input
                                    ref={inputRef}
                                    type="text"
                                    placeholder="Find a project..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="flex-1 bg-transparent text-[var(--color-primary)] placeholder-gray-400 focus:outline-none text-xl font-light"
                                />
                            </div>

                            <div className="flex items-center gap-3 ml-4">
                                <span className="hidden sm:flex items-center gap-1 text-[11px] font-semibold text-gray-400 px-2 py-1 bg-gray-50 border border-gray-200 rounded-md uppercase tracking-wider select-none shadow-sm">
                                    <Command className="w-3 h-3" /> K
                                </span>
                                <button
                                    onClick={onClose}
                                    className="p-1.5 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-600 sm:hidden"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Premium Category Filters */}
                        <div className="flex items-center gap-2 px-5 py-3 bg-gray-50/80 border-b border-gray-100 overflow-x-auto no-scrollbar flex-shrink-0">
                            <button
                                onClick={() => setActiveCategory("all")}
                                className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 whitespace-nowrap
                  ${activeCategory === "all"
                                        ? "bg-[var(--color-primary)] text-white shadow-lg shadow-[#232E5A]/20"
                                        : "text-gray-500 hover:bg-white hover:text-[#232E5A] border border-transparent hover:border-gray-200"}`}
                            >
                                Show All
                            </button>
                            {categories.map((cat) => (
                                <button
                                    key={cat.value}
                                    onClick={() => setActiveCategory(cat.value)}
                                    className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 whitespace-nowrap
                    ${activeCategory === cat.value
                                            ? "bg-[var(--color-primary)] text-white shadow-lg shadow-[#232E5A]/20"
                                            : "text-gray-500 hover:bg-white hover:text-[#232E5A] border border-transparent hover:border-gray-200"}`}
                                >
                                    {cat.label}
                                </button>
                            ))}
                        </div>

                        {/* Dynamic Content Area */}
                        <div className="flex-1 overflow-y-auto scrollbar-hide min-h-[350px] bg-white">
                            {filteredResults.length > 0 ? (
                                <div className="py-4">
                                    <p className="px-6 py-2 text-[11px] font-bold text-gray-400/80 uppercase tracking-[0.15em] mb-1">
                                        {searchQuery ? `Found ${filteredResults.length} Results` : "Latest Projects"}
                                    </p>
                                    <div className="flex flex-col">
                                        {filteredResults.map((project) => (
                                            <motion.div key={project.id} variants={itemVariants}>
                                                <Link
                                                    href="/our-projects"
                                                    onClick={onClose}
                                                    className="group flex items-center px-6 py-4 hover:bg-[var(--color-secondary)] transition-all duration-300 relative border-l-4 border-transparent hover:border-[var(--color-accent)]"
                                                >
                                                    <div className="relative w-14 h-14 rounded-xl overflow-hidden bg-gray-50 flex-shrink-0 border border-gray-100 group-hover:shadow-md transition-shadow">
                                                        <Image
                                                            src={project.image}
                                                            alt={project.title}
                                                            fill
                                                            className="object-contain p-2 group-hover:scale-110 transition-transform duration-500"
                                                        />
                                                    </div>
                                                    <div className="ml-5 flex-1 min-w-0">
                                                        <h4 className="text-[17px] font-medium text-[var(--color-primary)] truncate group-hover:text-[var(--color-accent)] transition-colors">
                                                            {project.title}
                                                        </h4>
                                                        <div className="flex items-center gap-3 mt-1 overflow-hidden">
                                                            <span className="text-[12px] text-gray-500 font-medium uppercase tracking-wide flex-shrink-0">
                                                                {project.category}
                                                            </span>
                                                            <span className="text-gray-300 flex-shrink-0">•</span>
                                                            <span className="text-[12px] text-gray-500 truncate italic">
                                                                {project.status}
                                                            </span>
                                                        </div>
                                                    </div>
                                                    <div className="flex flex-col items-end gap-1 ml-4 flex-shrink-0">
                                                        <ArrowRight className="w-5 h-5 text-gray-300 group-hover:text-[var(--color-accent)] group-hover:translate-x-1 transition-all duration-300" />
                                                    </div>
                                                </Link>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex flex-col items-center justify-center py-20 px-8 text-center"
                                >
                                    <div className="w-20 h-20 bg-[var(--color-secondary)] text-[var(--color-primary)] rounded-[32px] flex items-center justify-center mb-8 relative">
                                        <FolderSearch className="w-10 h-10 opacity-40" />
                                        <motion.div
                                            animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.3, 0.1] }}
                                            transition={{ duration: 2, repeat: Infinity }}
                                            className="absolute inset-0 bg-[var(--color-accent)] rounded-[32px]"
                                        />
                                    </div>
                                    <h3 className="text-2xl font-serif text-[var(--color-primary)] mb-3">Project not found</h3>
                                    <p className="text-[15px] text-gray-500 max-w-[340px] mb-10 leading-relaxed">
                                        We couldn't find any results for <span className="text-[var(--color-primary)] font-semibold">"{searchQuery}"</span>. Try a different term or browse our top categories.
                                    </p>
                                    <div className="flex flex-col sm:flex-row items-center gap-4 w-full max-w-sm">
                                        <button
                                            onClick={() => setSearchQuery("")}
                                            className="w-full px-8 py-3.5 border border-gray-200 rounded-xl text-[14px] font-bold text-gray-600 hover:bg-gray-50 active:scale-95 transition-all shadow-sm"
                                        >
                                            Reset Search
                                        </button>
                                        <Link
                                            href="/our-projects"
                                            onClick={onClose}
                                            className="w-full px-8 py-3.5 bg-[var(--color-primary)] text-white rounded-xl text-[14px] font-bold hover:bg-[#1a2345] active:scale-95 transition-all shadow-xl shadow-[#232E5A]/20"
                                        >
                                            View All Projects
                                        </Link>
                                    </div>
                                </motion.div>
                            )}
                        </div>

                        {/* Modern Interactive Footer */}
                        <div className="flex items-center justify-between px-6 py-4 bg-gray-50/50 border-t border-gray-100 flex-shrink-0">
                            <div className="flex items-center gap-6 overflow-hidden">
                                <div className="flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest">
                                    <div className="flex items-center gap-1">
                                        <kbd className="min-w-[20px] h-5 flex items-center justify-center bg-white border border-gray-200 rounded text-[10px] shadow-xs">
                                            <ChevronDown className="w-3.2 h-3.2 rotate-180" />
                                        </kbd>
                                        <kbd className="min-w-[20px] h-5 flex items-center justify-center bg-white border border-gray-200 rounded text-[10px] shadow-xs">
                                            <ChevronDown className="w-3.2 h-3.2" />
                                        </kbd>
                                    </div>
                                    <span>Navigate</span>
                                </div>

                                <div className="hidden sm:flex items-center gap-2 text-[11px] font-bold text-gray-400 uppercase tracking-widest border-l border-gray-200 pl-6">
                                    <kbd className="px-1.5 h-5 flex items-center justify-center bg-white border border-gray-200 rounded text-[10px] shadow-xs">
                                        <Undo2 className="w-3.2 h-3.2" />
                                    </kbd>
                                    <span>Select</span>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 text-[11px] font-bold text-[var(--color-accent)] uppercase tracking-widest">
                                <kbd className="px-1.5 py-0.5 bg-white border border-[var(--color-accent)] rounded shadow-sm text-[10px]">
                                    ESC
                                </kbd>
                                <span className="hidden xs:inline">to close</span>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default SearchModal;
