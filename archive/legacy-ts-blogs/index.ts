import type { Blog } from "@/types/blog";
import { sampleBlog } from "@/content/blogs/sample-blog";
import { bestCrmForRealtorsCanada } from "@/content/blogs/best-crm-for-realtors";
import { bestCrmForRealEstateAgents } from "@/content/blogs/best-crm-for-realtor-estate-agents";

/**
 * Registry of every blog post.
 *
 * To add a new post:
 *   1. Import it here (e.g. `import { myNewPost } from "@/content/blogs/my-new-post";`)
 *   2. Add it to the `blogs` array below.
 *
 * The helper functions in `src/lib/blogs.ts` read from this array, so anything
 * registered here is automatically available across the app.
 */
export const blogs: Blog[] = [bestCrmForRealEstateAgents, bestCrmForRealtorsCanada, sampleBlog];
