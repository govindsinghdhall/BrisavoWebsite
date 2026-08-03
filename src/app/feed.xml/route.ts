import { getAllBlogs } from "@/lib/blogs";
import { SITE_NAME, SITE_URL } from "@/lib/site";

export const revalidate = 60;

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&apos;");
}

export function GET() {
  const blogs = getAllBlogs();

  const items = blogs
    .map((blog) => {
      const url = `${SITE_URL}/blog/${blog.slug}`;
      return `
      <item>
        <title>${escapeXml(blog.title)}</title>
        <link>${escapeXml(url)}</link>
        <guid>${escapeXml(url)}</guid>
        <pubDate>${new Date(blog.date).toUTCString()}</pubDate>
        <description>${escapeXml(blog.description)}</description>
        <author>${escapeXml(blog.author)}</author>
        <category>${escapeXml(blog.category)}</category>
      </item>`;
    })
    .join("");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${escapeXml(`${SITE_NAME} Blog`)}</title>
    <link>${SITE_URL}/blog</link>
    <description>Guides and research on real estate CRM, AI workflows, and agency growth from Brosavo.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${SITE_URL}/feed.xml" rel="self" type="application/rss+xml" />
    ${items}
  </channel>
</rss>`;

  return new Response(xml, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "s-maxage=60, stale-while-revalidate",
    },
  });
}
