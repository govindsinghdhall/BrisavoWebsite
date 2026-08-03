import type { MetadataRoute } from "next";
import { getAllBlogs } from "@/lib/blogs";
import { SITE_URL } from "@/lib/site";

const ROUTES = [
  "",
  "/services",
  "/technology",
  "/products",
  "/pricing",
  "/global",
  "/why-us",
  "/team",
  "/founders-office",
  "/contact",
  "/blog",
  "/terms",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  const staticEntries: MetadataRoute.Sitemap = ROUTES.map((route) => ({
    url: `${SITE_URL}${route}`,
    lastModified,
    changeFrequency: route === "" || route === "/blog" ? "weekly" : "monthly",
    priority: route === "" ? 1 : route === "/blog" ? 0.9 : 0.8,
  }));

  const blogEntries: MetadataRoute.Sitemap = getAllBlogs().map((blog) => ({
    url: `${SITE_URL}/blog/${blog.slug}`,
    lastModified: new Date(blog.date),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticEntries, ...blogEntries];
}
