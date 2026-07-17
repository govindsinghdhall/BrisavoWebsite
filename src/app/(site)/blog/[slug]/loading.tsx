import { BlogLayout } from "@/components/blog";

export default function BlogPostLoading() {
  return (
    <BlogLayout>
      <div className="mb-6 h-6 w-28 animate-pulse rounded-full bg-surface" />
      <div className="mb-4 h-14 w-full max-w-3xl animate-pulse rounded-2xl bg-surface" />
      <div className="mb-8 h-20 w-full max-w-2xl animate-pulse rounded-2xl bg-surface" />
      <div className="aspect-[16/9] animate-pulse rounded-[2rem] bg-surface" />
    </BlogLayout>
  );
}
