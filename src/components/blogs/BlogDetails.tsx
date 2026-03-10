"use client";

import React from "react";
import { motion } from "framer-motion";
import { Blog } from "@/lib/types/blog";

interface BlogDetailsProps {
    blog: Blog;
}

const EASE: [number, number, number, number] = [0.25, 0.46, 0.45, 0.94];

const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: (d: number) => ({
        opacity: 1,
        y: 0,
        transition: { delay: d, duration: 0.7, ease: EASE },
    }),
};

const BlogDetails: React.FC<BlogDetailsProps> = ({ blog }) => {
    return (
        <section className="py-20 bg-white">
            <div className="max-w-[1440px] mx-auto px-4">
                <div className="w-full mx-auto">
                    {/* <motion.div
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0}
                        className="mb-12"
                    >
                        <Link
                            href="/blogs"
                            className="inline-flex items-center gap-2 text-[#d9991f] hover:gap-3 transition-all duration-300 font-serif"
                        >
                            <MoveLeft size={18} strokeWidth={1.5} />
                            <span>Back to Insights</span>
                        </Link>
                    </motion.div>

                    <motion.div
                        className="flex items-center justify-center gap-5 mb-8 flex-wrap"
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.1}
                    >
                        <span className="px-4 py-1.5 bg-[#d9991f]/10 text-[#d9991f] text-[13px] font-semibold uppercase tracking-wider rounded-full font-serif">
                            {blog.category}
                        </span>
                        <div className="flex items-center gap-3 text-gray-500 text-sm font-serif">
                            <span>{blog.date}</span>
                            <span className="w-1 h-1 bg-gray-300 rounded-full" />
                            <span>{blog.readTime}</span>
                        </div>
                    </motion.div> */}

                    <motion.h1
                        className="text-lg md:text-[25px] font-normal text-[var(--color-primary)] font-serif leading-[1.2] text-center mb-8 md:mb-16"
                        variants={fadeUp}
                        initial="hidden"
                        animate="visible"
                        custom={0.2}
                    >
                        {blog.title}
                    </motion.h1>

                    <motion.div
                        className="prose prose-lg max-w-none text-gray-700 space-y-8"
                        variants={fadeUp}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        custom={0.1}
                    >

                        <div
                            className="blog-content-wrapper [&>p]:text-lg [&>p]:leading-relaxed [&>p]:text-center [&>p]:mb-8 [&>h2]:text-2xl [&>h2]:md:text-3xl [&>h2]:font-bold [&>h2]:text-[#1a2b56] [&>h2]:text-center [&>h2]:mt-16 [&>h2]:mb-8 [&>h3]:text-xl [&>h3]:font-bold [&>h3]:text-[#1a2b56] [&>h3]:mt-12 [&>h3]:mb-6 [&>img]:w-full [&>img]:rounded-xl [&>img]:my-12 [&>ol]:list-decimal [&>ol]:pl-6 [&>ol]:space-y-4 [&>ul]:list-disc [&>ul]:pl-6 [&>ul]:space-y-4 [&>li]:text-lg [&>li]:leading-relaxed [&>strong]:text-[#1a2b56] [&>strong]:font-semibold"
                            dangerouslySetInnerHTML={{ __html: blog.content }}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default BlogDetails;

