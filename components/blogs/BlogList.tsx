"use client";

import React from "react";
import { Blog } from "@/lib/types/blog";
import BlogCard from "./BlogCard";

interface BlogListProps {
    blogs: Blog[];
}

const BlogList: React.FC<BlogListProps> = ({ blogs }) => {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {blogs.map((blog, i) => (
                <BlogCard key={blog.slug} blog={blog} index={i} />
            ))}
        </div>
    );
};

export default BlogList;

