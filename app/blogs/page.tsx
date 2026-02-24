import { Metadata } from "next";
import { getBlogs } from "@/lib/services/blogService";
import HeroMedia from "@/components/Hero";
import BlogList from "@/components/blogs/BlogList";
import Pagination from "@/components/blogs/Pagination";
import GlobalAnimation from "@/components/GlobalAnimation/GlobalAnimation";
import "./blogs.css";

export const metadata: Metadata = {
    title: "Insights & Articles | TDI City Kundli",
    description:
        "Stay informed with articles on township living, real estate trends, connectivity developments, and the evolving growth story of TDI City Kundli and the surrounding region.",
    openGraph: {
        title: "Insights & Articles | TDI City Kundli",
        description:
            "Stay informed with articles on township living, real estate trends, and TDI City Kundli.",
        type: "website",
    },
};


interface BlogsPageProps {
    searchParams: Promise<{ page?: string }>;
}

export default async function BlogsPage({ searchParams }: BlogsPageProps) {
    const resolvedParams = await searchParams;
    const page = Math.max(1, parseInt(resolvedParams.page || "1", 10));
    const { blogs, totalPages } = await getBlogs(page, 6);

    return (
        <main className="relative min-h-screen w-full bg-white">
            <GlobalAnimation />
            <HeroMedia type="image" src="/assets/blog/hero.jpg" />
            <section className="blog-section">
                <div className="containers mx-auto">
                    <div className="blog-section__header">
                        <h2 className="blog-section__title font-serif">
                            Insights &amp; Articles
                        </h2>
                        <p className="blog-section__subtitle font-serif">
                            Stay informed with articles on township living, real estate trends,
                            connectivity developments, and the evolving growth story of TDI
                            City Kundli and the surrounding region.
                        </p>
                    </div>
                    <BlogList blogs={blogs} />
                    <Pagination currentPage={page} totalPages={totalPages} />
                </div>
            </section>
        </main>
    );
}