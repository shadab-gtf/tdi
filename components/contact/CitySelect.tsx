"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, Check } from "lucide-react";
import { gsap } from "gsap";
import { cn } from "@/lib/utils";

interface CitySelectProps {
    value: string;
    onChange: (value: string) => void;
    error?: string;
}

const cities = [
    "New York",
    "London",
    "Dubai",
    "Mumbai",
    "Singapore",
    "Sydney",
];

export default function CitySelect({ value, onChange, error }: CitySelectProps) {
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    useEffect(() => {
        if (isOpen && listRef.current) {
            gsap.fromTo(
                listRef.current,
                { opacity: 0, y: -10 },
                { opacity: 1, y: 0, duration: 0.3, ease: "power2.out" }
            );
        }
    }, [isOpen]);

    // Close click outside
    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target as Node)
            ) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <div className="relative w-full" ref={dropdownRef}>
            <div
                className={cn(
                    "w-full border-b border-gray-300 py-4 flex items-center justify-between cursor-pointer transition-all duration-300 group",
                    error ? "border-red-500" : "hover:border-primary",
                    isOpen ? "border-primary" : ""
                )}
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className={cn("text-lg transition-colors duration-300", value ? "text-[#767676]" : "text-gray-400 group-hover:text-gray-500")}>
                    {value || "Select City*"}
                </span>
                <ChevronDown
                    className={cn(
                        "w-5 h-5 text-gray-400 transition-transform duration-500 ease-out group-hover:text-primary",
                        isOpen ? "rotate-180 text-primary" : ""
                    )}
                />
            </div>
            <span className={cn("absolute bottom-0 left-0 h-[1px] bg-primary transition-all duration-500", isOpen ? "w-full" : "w-0")}></span>

            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            {isOpen && (
                <ul
                    ref={listRef}
                    className="absolute z-50 w-full bg-white shadow-2xl mt-2 py-2 max-h-64 overflow-auto rounded-none border border-gray-100 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent"
                >
                    {cities.map((city) => (
                        <li
                            key={city}
                            className={cn(
                                "px-6 py-3 hover:bg-[#232E5A0A] cursor-pointer flex items-center justify-between text-[#767676] transition-colors duration-200",
                                value === city ? "bg-[#232E5A1A] text-primary font-medium" : ""
                            )}
                            onClick={() => {
                                onChange(city);
                                setIsOpen(false);
                            }}
                        >
                            <span>{city}</span>
                            {value === city && <Check className="w-4 h-4 text-primary" />}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
