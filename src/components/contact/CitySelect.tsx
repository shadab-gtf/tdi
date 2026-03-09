"use client";

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
    "Tokyo",
    "Paris",
    "Berlin",
];

export default function CitySelect({
    value,
    onChange,
    error,
}: CitySelectProps) {
    return (
        <div className="w-full">
            <div className="relative">
                <select
                    value={value}
                    onChange={(e) => onChange(e.target.value)}
                    className={cn(
                        "w-full appearance-none bg-transparent border-b border-gray-300 py-4 text-lg text-[#767676] outline-none placeholder:text-gray-400 transition-all duration-300 focus:border-primary",
                        error && "border-red-500 focus:ring-red-200"
                    )}
                >
                    <option value="" disabled>
                        Select City*
                    </option>

                    {cities.map((city) => (
                        <option key={city} value={city}>
                            {city}
                        </option>
                    ))}
                </select>

                {/* Custom Arrow */}
                <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-gray-500">
                    <svg
                        className="h-5 w-5"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M19 9l-7 7-7-7"
                        />
                    </svg>
                </div>
            </div>

            {error && (
                <p className="mt-2 text-sm text-red-600">{error}</p>
            )}
        </div>
    );
}