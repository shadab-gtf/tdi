import { Metadata } from "next";
import { getBlogs } from "@/lib/services/blogService";
import HeroMedia from "@/components/Hero";
import BlogList from "@/components/blogs/BlogList";
import Pagination from "@/components/blogs/Pagination";
import GlobalAnimation from "@/components/GlobalAnimation/GlobalAnimation";

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
    const page = Math.max(1, parseInt(resolvedParams.page || "1", 8));
    const { blogs, totalPages } = await getBlogs(page, 8);

    return (
        <main className="relative min-h-screen w-full bg-white">
            <GlobalAnimation />
            <HeroMedia type="image" src="/assets/blog/hero.jpg" />
            <section className="py-20 md:py-24 bg-white">
                <div className="max-w-[1440px] mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-5xl font-serif text-[#1a2b56] mb-5">
                            Insights &amp; Articles
                        </h2>
                        <p className="max-w-[900px] mx-auto text-gray-600 text-lg leading-relaxed font-serif">
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
