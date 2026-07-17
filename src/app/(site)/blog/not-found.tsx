import Link from "next/link";
import { BlogLayout } from "@/components/blog";

export default function BlogNotFound() {
  return (
    <BlogLayout>
      <div className="glass mx-auto max-w-xl rounded-[2rem] px-8 py-16 text-center">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-blue">
          404
        </p>
        <h1 className="mt-4 text-3xl font-bold tracking-tight text-foreground">
          Post not found
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          The article you&apos;re looking for doesn&apos;t exist or may have been
          unpublished.
        </p>
        <Link
          href="/blog"
          className="mt-8 inline-flex rounded-full bg-linear-to-r from-accent-blue to-accent-violet px-6 py-3 text-sm font-medium text-white"
        >
          Back to Blog
        </Link>
      </div>
    </BlogLayout>
  );
}
