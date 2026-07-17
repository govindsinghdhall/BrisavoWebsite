import { BlogLayout, LoadingSkeleton } from "@/components/blog";

export default function BlogLoading() {
  return (
    <BlogLayout showBackLink={false}>
      <div className="mb-10 h-10 w-64 animate-pulse rounded-full bg-surface" />
      <div className="mb-8 h-14 w-full max-w-xl animate-pulse rounded-2xl bg-surface" />
      <LoadingSkeleton />
    </BlogLayout>
  );
}
