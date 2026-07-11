import type { MetadataRoute } from "next";

const ROUTES = [
  "",
  "/services",
  "/technology",
  "/products",
  "/global",
  "/why-us",
  "/team",
  "/founders-office",
  "/contact",
  "/terms",
  "/privacy",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return ROUTES.map((route) => ({
    url: `https://BRISΛVO.com${route}`,
    lastModified,
    changeFrequency: route === "" ? "weekly" : "monthly",
    priority: route === "" ? 1 : 0.8,
  }));
}
