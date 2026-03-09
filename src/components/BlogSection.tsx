// "use client";
// import React, { useState, useEffect } from "react";
// import Image from "next/image";
// import { motion } from "framer-motion";
// import { MoveLeft, MoveRight } from "lucide-react";
// import Link from "next/link";
// import PremiumButton from "./ui/PremiumButton";

// const blogPosts = [
//     {
//         id: 1,
//         date: "19 Sep 2025",
//         title: "TDI Infratech Announces ₹100 Crore Commercial",
//         excerpt: "TDI Infratech strengthens its commercial real estate footprint with a ₹100 crore.......",
//         image: "/assets/images/blog/1.png",
//         link: "#"
//     },
//     {
//         id: 2,
//         date: "11 June 2025",
//         title: "Commercial Real Estate Emerges As A Strong Long-Term",
//         excerpt: "Industry experts highlight commercial real estate as a resilient investment avenue.....",
//         image: "/assets/images/blog/2.png",
//         link: "#"
//     },
//     {
//         id: 3,
//         date: "25 Jan 2025",
//         title: "Delhi NCR Realty Sees Shift Towards Planned, Future-Ready Developments",
//         excerpt: "With infrastructure expansion and policy support, developers are focusing on well....",
//         image: "/assets/images/blog/3.png",
//         link: "#"
//     },
//     {
//         id: 4,
//         date: "05 Aug 2025",
//         title: "Sustainable Living: The New Standard in Modern Townships",
//         excerpt: "TDI Infratech strengthens its commercial real estate footprint with a ₹100 crore.......",
//         image: "/assets/images/blog/1.png",
//         link: "#"
//     },
//     {
//         id: 5,
//         date: "19 Sep 2025",
//         title: "TDI Infratech Announces ₹100 Crore Commercial",
//         excerpt: "Industry experts highlight commercial real estate as a resilient investment avenue.....",
//         image: "/assets/images/blog/2.png",
//         link: "#"
//     },
//     {
//         id: 6,
//         date: "11 June 2025",
//         title: "Commercial Real Estate Emerges As A Strong Long-Term",
//         excerpt: "With infrastructure expansion and policy support, developers are focusing on well....",
//         image: "/assets/images/blog/3.png",
//         link: "#"
//     },
// ];

// const BlogSection = () => {
//     const [currentIndex, setCurrentIndex] = useState(0);
//     const [visibleItems, setVisibleItems] = useState(3);
//     const [gap, setGap] = useState(80);

//     // Constants
//     const CARD_WIDTH = 360;
//     const IMAGE_HEIGHT = 250;

//     useEffect(() => {
//         const handleResize = () => {
//             const width = window.innerWidth;
//             if (width >= 1280) {
//                 setVisibleItems(3);
//                 setGap(40);
//             } else if (width >= 1024) {
//                 setVisibleItems(3);
//                 setGap(32);
//             } else if (width >= 768) {
//                 setVisibleItems(2);
//                 setGap(24);
//             } else {
//                 setVisibleItems(1);
//                 setGap(16);
//             }
//         };

//         handleResize();
//         window.addEventListener("resize", handleResize);
//         return () => window.removeEventListener("resize", handleResize);
//     }, []);

//     const maxIndex = Math.max(0, blogPosts.length - visibleItems);

//     const slide = (direction: "left" | "right") => {
//         if (direction === "right") {
//             setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
//         } else {
//             setCurrentIndex(prev => Math.max(prev - 1, 0));
//         }
//     };

//     return (
//         <section className="bg-white py-20 overflow-hidden">
//             <div className="containers mx-auto">
//                 <div className="text-center mb-16">
//                     <h2 className="text-center text-lg md:text-[25px] font-regular font-serif tracking-tight ">
//                         Latest News Update
//                     </h2>
//                 </div>

//                 <div className="relative flex items-center justify-center max-w-[1440px] mx-auto">
//                     <button
//                         onClick={() => slide("left")}
//                         disabled={currentIndex === 0}
//                         className={`hidden lg:flex absolute left-0 z-10 w-12 h-12 items-center justify-center rounded-full border border-[#D9991F] text-[var(--color-primary)] bg-white hover:bg-[#D9991F] hover:text-[var(--color-secondary)] transition-all duration-300 shadow-sm
//                            ${currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
//                         `}
//                     >
//                         <MoveLeft size={24} strokeWidth={1.5} />
//                     </button>

//                     <div
//                         className="overflow-hidden w-full mx-auto p-3"
//                         style={{ maxWidth: '1240px' }}
//                     >
//                         <motion.div
//                             className="flex"
//                             style={{ gap: `${gap}px` }}
//                             animate={{
//                                 x: `calc(-${currentIndex} * (${visibleItems === 3 && gap === 80 ? '360px' : `((100% - ${(visibleItems - 1) * gap}px) / ${visibleItems})`} + ${gap}px))`
//                             }}
//                             transition={{ type: "spring", stiffness: 300, damping: 30 }}
//                         >
//                             {blogPosts.map((post) => (
//                                 <div
//                                     key={post.id}
//                                     className="shrink-0 flex flex-col shadow-lg hover:shadow-xl transition-shadow duration-300 overflow-hidden group h-full"
//                                     style={{
//                                         width: visibleItems === 3 && gap === 80 ? `${CARD_WIDTH}px` : `calc((100% - ${(visibleItems - 1) * gap}px) / ${visibleItems})`
//                                     }}
//                                 >
//                                     <div
//                                         className="relative w-full overflow-hidden p-2 "
//                                         style={{ height: `${IMAGE_HEIGHT}px` }}
//                                     >
//                                         <Link href={post.link}>
//                                             <div className="relative w-full h-full">
//                                                 <Image
//                                                     src={post.image}
//                                                     alt={post.title}
//                                                     fill
//                                                     className="object-contain"
//                                                 />
//                                             </div>
//                                         </Link>
//                                     </div>

//                                     <div className=" pt-2 pb-6 px-6 md:p-8 md:pt-4 md:pb-8 flex flex-col grow card-content">
//                                         <Link href={post.link}>
//                                             <p className="text-center text-xs md:text-sm  text-black font-serif mb-2 uppercase tracking-wider">
//                                                 {post.date}
//                                             </p>

//                                             <h3 className="text-center text-sm md:text-base  font-serif text-[#232E5A] leading-tight  line-clamp-2 min-h-[3.5rem]">
//                                                 {post.title}
//                                             </h3>
//                                             <div className="w-full h-[1px] bg-[#D58C00] mx-auto mb-6 opacity-50"></div>
//                                             <p className="text-center text-black text-base font-regular font-serif leading-relaxed mb-1 line-clamp-2 grow">
//                                                 {post.excerpt}
//                                             </p>
//                                         </Link>
//                                         <Link href={post.link} className="flex justify-between items-center text-xs  text-[#1A1A1A] group/btn cursor-pointer mt-auto pt-3">
//                                             <span className="font-serif  text-[#1A1A1A]">Read More</span>
//                                             <MoveRight size={18} strokeWidth={1.5} className="transition-transform duration-300 group-hover/btn:translate-x-2 text-[#1A1A1A]" />
//                                         </Link>
//                                     </div>
//                                 </div>
//                             ))}
//                         </motion.div>
//                     </div>

//                     <button
//                         onClick={() => slide("right")}
//                         disabled={currentIndex === maxIndex}
//                         className={`hidden lg:flex absolute right-0 z-10 w-12 h-12 items-center justify-center rounded-full border border-[#D9991F] text-[var(--color-primary)] bg-white hover:bg-[#D9991F] hover:text-[var(--color-secondary)] transition-all duration-300 shadow-sm
//                              ${currentIndex === maxIndex ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}
//                         `}
//                     >
//                         <MoveRight size={24} strokeWidth={1.5} />
//                     </button>
//                 </div>

//                 <div className="flex md:hidden justify-center gap-4 mt-8">
//                     <button
//                         onClick={() => slide("left")}
//                         disabled={currentIndex === 0}
//                         className={`p-3 rounded-full border border-[#D4AF37] text-[#D4AF37] bg-white shadow-sm ${currentIndex === 0 ? "opacity-30" : ""}`}
//                     >
//                         <MoveLeft size={20} />
//                     </button>
//                     <button
//                         onClick={() => slide("right")}
//                         disabled={currentIndex === maxIndex}
//                         className={`p-3 rounded-full border border-[#D4AF37] text-[#D4AF37] bg-white shadow-sm ${currentIndex === maxIndex ? "opacity-30" : ""}`}
//                     >
//                         <MoveRight size={20} />
//                     </button>
//                 </div>

//                 <div className="text-center mt-12 md:mt-16">
//                     <PremiumButton href="/blogs">
//                         View All News & Blog
//                     </PremiumButton>
//                 </div>

//             </div>
//         </section>
//     );
// };

// export default BlogSection;
"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MoveLeft, MoveRight } from "lucide-react";
import PremiumButton from "./ui/PremiumButton";
import BlogCard from "@/components/blogs/BlogCard";
import { blogData } from "@/lib/data/blogs";

const BlogSection = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [visibleItems, setVisibleItems] = useState(3);
    const [gap, setGap] = useState(80);

    const CARD_WIDTH = 360;
    const displayedBlogs = blogData.slice(-6);

    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width >= 1280) {
                setVisibleItems(3);
                setGap(40);
            } else if (width >= 1024) {
                setVisibleItems(3);
                setGap(32);
            } else if (width >= 768) {
                setVisibleItems(2);
                setGap(24);
            } else {
                setVisibleItems(1);
                setGap(16);
            }
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const maxIndex = Math.max(0, displayedBlogs.length - visibleItems);

    const slide = (direction: "left" | "right") => {
        if (direction === "right") {
            setCurrentIndex(prev => Math.min(prev + 1, maxIndex));
        } else {
            setCurrentIndex(prev => Math.max(prev - 1, 0));
        }
    };

    return (
        <section className="bg-white py-20 overflow-hidden">
            <div className="containers mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-center text-lg md:text-[25px] font-regular font-serif tracking-tight">
                        Latest News Update
                    </h2>
                </div>

                <div className="relative flex items-center justify-center max-w-[1440px] mx-auto">
                    <button
                        onClick={() => slide("left")}
                        disabled={currentIndex === 0}
                        className={`hidden lg:flex absolute left-0 z-10 w-12 h-12 items-center justify-center rounded-full border border-[#D9991F] text-[var(--color-primary)] bg-white hover:bg-[#D9991F] hover:text-[var(--color-secondary)] transition-all duration-300 shadow-sm
                           ${currentIndex === 0 ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                        <MoveLeft size={24} strokeWidth={1.5} />
                    </button>

                    <div
                        className="overflow-hidden w-full mx-auto p-3"
                        style={{ maxWidth: '1240px' }}
                    >
                        <motion.div
                            className="flex"
                            style={{ gap: `${gap}px` }}
                            animate={{
                                x: `calc(-${currentIndex} * (${visibleItems === 3 && gap === 80 ? '360px' : `((100% - ${(visibleItems - 1) * gap}px) / ${visibleItems})`} + ${gap}px))`
                            }}
                            transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        >
                            {displayedBlogs.map((blog, index) => (
                                <div
                                    key={blog.slug}
                                    className="shrink-0 h-full"
                                    style={{
                                        width: visibleItems === 3 && gap === 80
                                            ? `${CARD_WIDTH}px`
                                            : `calc((100% - ${(visibleItems - 1) * gap}px) / ${visibleItems})`
                                    }}
                                >
                                    <BlogCard blog={blog} index={index} />
                                </div>
                            ))}
                        </motion.div>
                    </div>

                    <button
                        onClick={() => slide("right")}
                        disabled={currentIndex === maxIndex}
                        className={`hidden lg:flex absolute right-0 z-10 w-12 h-12 items-center justify-center rounded-full border border-[#D9991F] text-[var(--color-primary)] bg-white hover:bg-[#D9991F] hover:text-[var(--color-secondary)] transition-all duration-300 shadow-sm
                             ${currentIndex === maxIndex ? "opacity-30 cursor-not-allowed" : "cursor-pointer"}`}
                    >
                        <MoveRight size={24} strokeWidth={1.5} />
                    </button>
                </div>

                <div className="flex md:hidden justify-center gap-4 mt-8">
                    <button
                        onClick={() => slide("left")}
                        disabled={currentIndex === 0}
                        className={`p-3 rounded-full border border-[#D4AF37] text-[#D4AF37] bg-white shadow-sm ${currentIndex === 0 ? "opacity-30" : ""}`}
                    >
                        <MoveLeft size={20} />
                    </button>
                    <button
                        onClick={() => slide("right")}
                        disabled={currentIndex === maxIndex}
                        className={`p-3 rounded-full border border-[#D4AF37] text-[#D4AF37] bg-white shadow-sm ${currentIndex === maxIndex ? "opacity-30" : ""}`}
                    >
                        <MoveRight size={20} />
                    </button>
                </div>

                <div className="text-center mt-12 md:mt-16">
                    <PremiumButton href="/blogs">
                        View All News & Blog
                    </PremiumButton>
                </div>
            </div>
        </section>
    );
};

export default BlogSection;