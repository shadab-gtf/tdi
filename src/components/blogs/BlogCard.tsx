"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";
import { Blog } from "@/lib/types/blog";

interface BlogCardProps {
    blog: Blog;
    index?: number;
}

const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.97 },
    visible: (i: number) => ({
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            delay: i * 0.1,
            duration: 0.7,
            ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
        },
    }),
};

const BlogCard: React.FC<BlogCardProps> = ({ blog, index = 0 }) => {
    return (
        <motion.article
            className="flex flex-col bg-white shadow-[0_2px_16px_rgba(0,0,0,0.06)] hover:shadow-[0_12px_40px_rgba(35,46,90,0.12)] hover:-translate-y-1 overflow-hidden transition-all duration-400 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            custom={index}
        >
            <div className="relative w-full aspect-[360/250] overflow-hidden p-2 group">
                <Link href={`/blogs/${blog.slug}`}>
                    <div className="relative w-full h-full">
                        <Image
                            src={blog.thumbnail}
                            alt={blog.title}
                            fill
                            className="object-cover transition-transform duration-600 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:scale-105"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    </div>
                </Link>
            </div>

            <div className="flex flex-col flex-grow p-4 px-5 pb-6 font-serif">
                <Link href={`/blogs/${blog.slug}`} className="flex-grow">
                    <p className="text-sm text-black text-center mb-2 font-serif opacity-80">{blog.date}</p>
                    <h3 className="text-lg font-normal text-[#1a2b56] text-center leading-tight line-clamp-2 min-h-[3rem] mb-3">
                        {blog.title}
                    </h3>
                    <div className="w-full h-px bg-[#d9991f]/45 mb-4" />
                    <p className="text-xs text-black text-center font-light leading-relaxed line-clamp-2 mb-4">
                        {blog.excerpt}
                    </p>
                </Link>

                <Link
                    href={`/blogs/${blog.slug}`}
                    className="flex justify-between items-center text-[0.85rem] text-black pt-3 group"
                >
                    <span className="group-hover:text-[#d9991f] transition-colors duration-300">Read Article</span>
                    <MoveRight
                        size={18}
                        strokeWidth={1.5}
                        className="group-hover:translate-x-1.5 group-hover:text-[#d9991f] transition-all duration-300"
                    />
                </Link>
            </div>
        </motion.article>
    );
};

export default BlogCard;

