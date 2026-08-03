import type { Metadata } from "next";
import { BlogCard } from "@/components/blog/BlogCard";
import { getAllBlogs } from "@/lib/blogs";
import {
  COMPANY_DESCRIPTION,
  DEFAULT_OG_IMAGE,
  SITE_NAME,
  SITE_URL,
} from "@/lib/site";

export const revalidate = 60;

export const metadata: Metadata = {
  title: `Blog | ${SITE_NAME}`,
  description: COMPANY_DESCRIPTION.slice(0, 158),
  alternates: {
    canonical: `${SITE_URL}/blog`,
  },
  openGraph: {
    title: `Blog | ${SITE_NAME}`,
    description: COMPANY_DESCRIPTION.slice(0, 158),
    url: `${SITE_URL}/blog`,
    siteName: SITE_NAME,
    type: "website",
    images: [
      {
        url: `${SITE_URL}${DEFAULT_OG_IMAGE}`,
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} Blog`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `Blog | ${SITE_NAME}`,
    description: COMPANY_DESCRIPTION.slice(0, 158),
    images: [`${SITE_URL}${DEFAULT_OG_IMAGE}`],
  },
};

export default function BlogPage() {
  const blogs = getAllBlogs();

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute inset-0 mesh-gradient opacity-60" />

      <div className="container-wide relative section-padding !pt-28 sm:!pt-32">
        <header className="mb-12 max-w-3xl">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.28em] text-accent-blue">
            Insights
          </p>
          <h1 className="text-4xl font-black tracking-tight text-foreground sm:text-5xl">
            Brosavo Blog
          </h1>
          <p className="mt-4 text-base leading-8 text-muted sm:text-lg">
            Guides, research, and best practices on real estate CRM, AI
            workflows, and the systems that help agencies grow.
          </p>
        </header>

        <section>
          <h2 className="mb-6 text-2xl font-bold tracking-tight text-foreground">
            Latest posts
          </h2>

          {blogs.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {blogs.map((blog, index) => (
                <BlogCard key={blog.slug} blog={blog} priority={index < 3} />
              ))}
            </div>
          ) : (
            <div className="glass flex flex-col items-center justify-center rounded-[2rem] px-8 py-16 text-center">
              <h3 className="text-lg font-semibold text-foreground">
                More posts coming soon
              </h3>
              <p className="mt-2 max-w-md text-sm text-muted">
                We&apos;re working on new articles. Check back shortly for more
                insights.
              </p>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
