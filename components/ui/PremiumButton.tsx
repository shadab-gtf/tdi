"use client";

import Link from "next/link";
import { MoveRight } from "lucide-react";
import { ReactNode } from "react";
import clsx from "clsx";

interface PremiumButtonProps {
    children: ReactNode;
    href?: string;
    onClick?: () => void;
    className?: string;
    icon?: ReactNode;
}

export default function PremiumButton({
    children,
    href,
    onClick,
    className,
    icon,
}: PremiumButtonProps) {
    const content = (
        <>
            {/* Text */}
            <span className="relative block overflow-hidden">
                <span className="block transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:-translate-y-full">
                    {children}
                </span>

                <span className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-y-0 text-[var(--primary)]">
                    {children}
                </span>
            </span>

            {/* Icon */}
            <span className="transition-all duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:translate-x-1 ">
                {icon || <MoveRight size={18} />}
            </span>

            {/* Underline animation */}
            <span className="absolute bottom-0 left-0 h-[1px] w-full bg-[var(--color-accent)] origin-right scale-x-100 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:origin-left group-hover:scale-x-0"></span>

            <span className="absolute bottom-0 left-0 h-[1px] w-full bg-[var(--primary)] origin-left scale-x-0 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] group-hover:scale-x-100"></span>
        </>
    );

    const baseClass =
        "group relative inline-flex items-center gap-3 overflow-hidden font-serif text-base md:text-lg tracking-wide text-[var(--color-accent)] cursor-pointer";

    if (href) {
        return (
            <Link href={href} className={clsx(baseClass, className)}>
                {content}
            </Link>
        );
    }

    return (
        <button onClick={onClick} className={clsx(baseClass, className)}>
            {content}
        </button>
    );
}