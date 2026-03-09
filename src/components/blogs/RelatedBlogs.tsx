"use client";

import React from "react";
import { Blog } from "@/lib/types/blog";
import BlogCard from "./BlogCard";
import { motion } from "framer-motion";

interface RelatedBlogsProps {
    currentBlog: Blog;
    allBlogs: Blog[];
}

const RelatedBlogs: React.FC<RelatedBlogsProps> = ({ currentBlog, allBlogs }) => {
    const related = allBlogs
        .filter((b) => b.slug !== currentBlog.slug && b.category === currentBlog.category)
        .slice(0, 3);
    if (related.length < 3) {
        const others = allBlogs
            .filter((b) => b.slug !== currentBlog.slug && !related.find(r => r.slug === b.slug))
            .slice(0, 3 - related.length);
        related.push(...others);
    }

    if (related.length === 0) return null;

    return (
        <section className="py-20 bg-gray-50/50">
            <div className="max-w-[1280px] mx-auto px-4">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-center mb-12"
                >
                    <h2 className="second-heading font-normal font-serif">Related Insights</h2>
                    {/* <div className="w-20 h-1 bg-[#d9991f] mx-auto opacity-80" /> */}
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {related.map((blog, idx) => (
                        <motion.div
                            key={blog.slug}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.1 }}
                        >
                            <BlogCard blog={blog} />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default RelatedBlogs;
