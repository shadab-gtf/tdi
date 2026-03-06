

export type BlogCategory =
  | "Real Estate"
  | "Township Living"
  | "Connectivity"
  | "Commercial"
  | "Sustainability"
  | "Investment"
  | "Lifestyle";

export interface Blog {
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  coverImage: string;
  thumbnail: string;
  date: string;
  isoDate: string;
  category: BlogCategory;
  author: string;
  readTime: string;
}

export interface PaginatedBlogs {
  blogs: Blog[];
  total: number;
  page: number;
  limit: number;
  totalPages: number;
}
