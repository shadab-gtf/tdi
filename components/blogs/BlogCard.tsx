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
            className="blog-card"
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            custom={index}
        >
            <div className="blog-card__image-wrap">
                <Link href={`/blogs/${blog.slug}`}>
                    <div className="relative w-full h-full">
                        <Image
                            src={blog.thumbnail}
                            alt={blog.title}
                            fill
                            className="blog-card__image object-cover"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                    </div>
                </Link>
            </div>

            <div className="blog-card__body font-serif">
                <Link href={`/blogs/${blog.slug}`}>
                    <p className="blog-card__date">{blog.date}</p>
                    <h3 className="blog-card__title">{blog.title}</h3>
                    <div className="blog-card__divider" />
                    <p className="blog-card__excerpt">{blog.excerpt}</p>
                </Link>

                <Link href={`/blogs/${blog.slug}`} className="blog-card__link">
                    <span>Read Article</span>
                    <MoveRight size={18} strokeWidth={1.5} />
                </Link>
            </div>
        </motion.article>
    );
};

export default BlogCard;
