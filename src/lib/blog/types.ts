export interface BlogAuthor {
  name: string;
  role: string;
  avatar: string | null;
}

export interface BlogFaq {
  question: string;
  answer: string;
}

export interface BlogPostMeta {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  coverImage: string;
  author: BlogAuthor;
  publishedDate: string;
  category: string;
  tags: string[];
  featured: boolean;
  readingTime: number;
  draft: boolean;
  metaTitle: string | null;
  metaDescription: string | null;
  canonicalUrl: string | null;
  ogImage: string | null;
  faqs: BlogFaq[];
}

export interface BlogPost extends BlogPostMeta {
  content: string;
}

export interface TocHeading {
  id: string;
  text: string;
  level: number;
}

export interface PaginatedPosts {
  posts: BlogPostMeta[];
  page: number;
  totalPages: number;
  total: number;
  hasNext: boolean;
  hasPrev: boolean;
}

export interface BlogFilters {
  query?: string;
  category?: string;
  tag?: string;
  page?: number;
}
