import { Blog, PaginatedBlogs } from "@/lib/types/blog";
import { blogData } from "@/lib/data/blogs";

const API_URL = process.env.NEXT_PUBLIC_API_URL; 

/**
 * Fetch a paginated list of blogs.
 * Uses local mock data when no API_URL is configured.
 */
export async function getBlogs(
  page: number = 1,
  limit: number = 6
): Promise<PaginatedBlogs> {
  // ── Remote API path (future-ready) ──
  if (API_URL) {
    const res = await fetch(`${API_URL}/blogs?page=${page}&limit=${limit}`, {
      next: { revalidate: 60 }, 
    });
    if (!res.ok) throw new Error("Failed to fetch blogs");
    return res.json();
  }

  // ── Local mock data path ──
  const total = blogData.length;
  const totalPages = Math.ceil(total / limit);
  const safePage = Math.max(1, Math.min(page, totalPages));
  const start = (safePage - 1) * limit;
  const blogs = blogData.slice(start, start + limit);

  return { blogs, total, page: safePage, limit, totalPages };
}

/**
 * Fetch a single blog by its slug.
 * Returns null when no match is found (triggers 404 at page level).
 */
export async function getBlogBySlug(slug: string): Promise<Blog | null> {
  // ── Remote API path (future-ready) ──
  if (API_URL) {
    const res = await fetch(`${API_URL}/blogs/${slug}`, {
      next: { revalidate: 60 },
    });
    if (res.status === 404) return null;
    if (!res.ok) throw new Error("Failed to fetch blog");
    return res.json();
  }

  // ── Local mock data path ──
  return blogData.find((b) => b.slug === slug) ?? null;
}

/**
 * Get all available slugs — useful for generateStaticParams.
 */
export async function getAllBlogSlugs(): Promise<string[]> {
  if (API_URL) {
    const res = await fetch(`${API_URL}/blogs/slugs`, {
      next: { revalidate: 300 },
    });
    if (!res.ok) throw new Error("Failed to fetch slugs");
    return res.json();
  }

  return blogData.map((b) => b.slug);
}
