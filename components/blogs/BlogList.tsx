"use client";

import React from "react";
import { Blog } from "@/lib/types/blog";
import BlogCard from "./BlogCard";

interface BlogListProps {
    blogs: Blog[];
}

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
    return (
        <div className="blog-grid">
            {blogs.map((blog, i) => (
                <BlogCard key={blog.slug} blog={blog} index={i} />
            ))}
        </div>
    );
};

export default BlogList;
