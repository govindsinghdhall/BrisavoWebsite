import { BlogCard } from "@/components/blog/BlogCard";
import { getRelatedBlogs } from "@/lib/blogs";

interface RelatedPostsProps {
  slug: string;
  limit?: number;
}

export function RelatedPosts({ slug, limit = 3 }: RelatedPostsProps) {
  const related = getRelatedBlogs(slug, limit);

  if (related.length === 0) return null;

  return (
    <section className="mt-16 border-t border-border pt-12">
      <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
        Related posts
      </h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {related.map((blog) => (
          <BlogCard key={blog.slug} blog={blog} />
        ))}
      </div>
    </section>
  );
}
