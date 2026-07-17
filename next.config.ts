import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["three"],
  serverExternalPackages: ["@keystatic/core", "@keystatic/next"],
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
