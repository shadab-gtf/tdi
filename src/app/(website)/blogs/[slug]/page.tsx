import { Metadata } from "next";
import { notFound } from "next/navigation";
import { getBlogBySlug, getAllBlogSlugs, getBlogs } from "@/lib/services/blogService";
import BlogDetails from "@/components/blogs/BlogDetails";
import RelatedBlogs from "@/components/blogs/RelatedBlogs";
import GlobalAnimation from "@/components/GlobalAnimation/GlobalAnimation";
import HeroMedia from "@/components/Hero";

// ── Static Params ──
export async function generateStaticParams() {
    const slugs = await getAllBlogSlugs();
    return slugs.map((slug) => ({ slug }));
}

// ── Dynamic SEO Metadata ──
interface MetadataProps {
    params: Promise<{ slug: string }>;
}

export async function generateMetadata({
    params,
}: MetadataProps): Promise<Metadata> {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog) {
        return { title: "Blog Not Found | TDI City Kundli" };
    }

    return {
        title: `${blog.title} | TDI City Kundli`,
        description: blog.excerpt,
        openGraph: {
            title: blog.title,
            description: blog.excerpt,
            type: "article",
            publishedTime: blog.isoDate,
            authors: [blog.author],
            images: [{ url: blog.coverImage, width: 1200, height: 630 }],
        },
    };
}

// ── Page Component ──
interface BlogDetailPageProps {
    params: Promise<{ slug: string }>;
}

export default async function BlogDetailPage({ params }: BlogDetailPageProps) {
    const { slug } = await params;
    const blog = await getBlogBySlug(slug);

    if (!blog) {
        notFound();
    }

    const { blogs: allBlogs } = await getBlogs(1, 100); // Fetch all for related selection

    return (
        <main className="relative min-h-screen w-full bg-white">
            <HeroMedia type="image" src={blog.coverImage} />
            <GlobalAnimation />
            <BlogDetails blog={blog} />
            {/* <RelatedBlogs currentBlog={blog} allBlogs={allBlogs} /> */}
        </main>
    );
}

