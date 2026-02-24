"use client";

import React, { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { MoveLeft } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Blog } from "@/lib/types/blog";

gsap.registerPlugin(ScrollTrigger);

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
    const coverRef = useRef<HTMLDivElement>(null);
    const imageRef = useRef<HTMLDivElement>(null);
    useGSAP(() => {
        if (!coverRef.current || !imageRef.current) return;

        gsap.fromTo(
            imageRef.current,
            { y: "-8%" },
            {
                y: "8%",
                ease: "none",
                scrollTrigger: {
                    trigger: coverRef.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub: 1,
                },
            }
        );
    }, []);

    return (
        <section className="blog-detail">
            <div className="max-w-[1440px] mx-auto md:mt-20 mt-10 px-4">
                <motion.div
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0}
                >
                    <Link href="/blogs" className="blog-detail__back font-serif">
                        <MoveLeft size={18} strokeWidth={1.5} />
                        <span>Back to Insights</span>
                    </Link>
                </motion.div>
                <motion.div
                    className="blog-detail__meta"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.1}
                >
                    <span className="blog-detail__category font-serif">{blog.category}</span>
                    <span className="blog-detail__date font-serif">{blog.date}</span>
                    <span className="blog-detail__dot" />
                    <span className="blog-detail__readtime font-serif">{blog.readTime}</span>
                </motion.div>
                <motion.h1
                    className="blog-detail__title"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.2}
                >
                    {blog.title}
                </motion.h1>
                <motion.div
                    ref={coverRef}
                    className="blog-detail__cover-wrap font-serif"
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    custom={0.3}
                >
                    <div ref={imageRef} className="absolute w-full h-[132%]">
                        <Image
                            src={blog.coverImage}
                            alt={blog.title}
                            fill
                            className="object-cover"
                            priority
                            sizes="100vw"
                        />
                    </div>
                </motion.div>
                <motion.div
                    className="blog-detail__content"
                    variants={fadeUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    custom={0.1}
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                />
            </div>
        </section>
    );
};

export default BlogDetails;
