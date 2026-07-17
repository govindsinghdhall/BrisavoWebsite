import { getAllPosts } from "@/lib/blog/posts";
import { getReader } from "@/lib/blog/reader";

export {
  getAllPosts,
  getFeaturedPosts,
  getRecentPosts,
  getPostBySlug,
  getCategories,
  getTags,
  getRelatedPosts,
  getAdjacentPosts,
  getFilteredPosts,
  getAllPostSlugs,
} from "@/lib/blog/posts";

export { getReader } from "@/lib/blog/reader";
export type {
  BlogPost,
  BlogPostMeta,
  TocHeading,
  BlogFilters,
  PaginatedPosts,
} from "@/lib/blog/types";

export async function getBlogStats() {
  const [posts, reader] = await Promise.all([
    getAllPosts(),
    Promise.resolve(getReader()),
  ]);
  const slugs = await reader.collections.posts.list();

  return {
    published: posts.length,
    totalInCms: slugs.length,
    featured: posts.filter((post) => post.featured).length,
  };
}
