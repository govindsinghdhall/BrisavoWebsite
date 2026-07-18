import { config, fields, collection } from "@keystatic/core";

const githubRepo = process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO;
const useGitHub =
  process.env.KEYSTATIC_STORAGE_KIND === "github" ||
  (process.env.NODE_ENV === "production" && Boolean(githubRepo));

export default config({
  storage: useGitHub
    ? {
        kind: "github" as const,
        repo: githubRepo as `${string}/${string}`,
        ...(process.env.KEYSTATIC_BRANCH_PREFIX
          ? { branchPrefix: process.env.KEYSTATIC_BRANCH_PREFIX }
          : {}),
      }
    : {
        kind: "local" as const,
      },
  collections: {
    posts: collection({
      label: "Blog Posts",
      slugField: "title",
      path: "content/posts/*",
      format: { contentField: "content" },
      entryLayout: "content",
      schema: {
        title: fields.slug({
          name: {
            label: "Title",
            validation: { isRequired: true, length: { min: 3 } },
          },
        }),
        excerpt: fields.text({
          label: "Excerpt",
          description: "Short summary shown on cards and listings",
          multiline: true,
          validation: { isRequired: true, length: { min: 20, max: 280 } },
        }),
        description: fields.text({
          label: "Description",
          description: "Longer description used for SEO fallbacks",
          multiline: true,
          validation: { isRequired: true, length: { min: 40, max: 500 } },
        }),
        coverImage: fields.image({
          label: "Cover Image",
          directory: "public/blog",
          publicPath: "/blog",
          validation: {
            isRequired: false,
          },
        }),
        author: fields.object(
          {
            name: fields.text({
              label: "Author Name",
              validation: { isRequired: true },
            }),
            role: fields.text({
              label: "Author Role",
              validation: { isRequired: true },
            }),
            avatar: fields.image({
              label: "Author Avatar",
              directory: "public/blog/authors",
              publicPath: "/blog/authors/",
            }),
          },
          { label: "Author" }
        ),
        publishedDate: fields.date({
          label: "Published Date",
          validation: { isRequired: true },
        }),
        category: fields.select({
          label: "Category",
          options: [
            { label: "AI & Automation", value: "ai-automation" },
            { label: "Cloud & Infrastructure", value: "cloud-infrastructure" },
            { label: "Product Engineering", value: "product-engineering" },
            { label: "Real Estate Tech", value: "real-estate-tech" },
            { label: "Company News", value: "company-news" },
            { label: "Engineering", value: "engineering" },
          ],
          defaultValue: "engineering",
        }),
        tags: fields.array(fields.text({ label: "Tag" }), {
          label: "Tags",
          itemLabel: (props) => props.value || "Tag",
        }),
        featured: fields.checkbox({
          label: "Featured Post",
          defaultValue: false,
        }),
        readingTime: fields.integer({
          label: "Reading Time (minutes)",
          description: "Leave empty to auto-calculate from content",
          validation: { min: 1, max: 60 },
        }),
        draft: fields.checkbox({
          label: "Draft",
          description: "Draft posts are hidden from the public blog",
          defaultValue: false,
        }),
        metaTitle: fields.text({
          label: "Meta Title",
          description: "Overrides the page title for SEO",
        }),
        metaDescription: fields.text({
          label: "Meta Description",
          multiline: true,
          validation: { length: { max: 160 } },
        }),
        canonicalUrl: fields.url({
          label: "Canonical URL",
          description: "Optional absolute canonical URL",
        }),
        ogImage: fields.image({
          label: "Open Graph Image",
          directory: "public/blog",
          publicPath: "/blog/",
        }),
        faqs: fields.array(
          fields.object({
            question: fields.text({
              label: "Question",
              validation: { isRequired: true },
            }),
            answer: fields.text({
              label: "Answer",
              multiline: true,
              validation: { isRequired: true },
            }),
          }),
          {
            label: "FAQs",
            description: "Optional FAQs for FAQ structured data",
            itemLabel: (props) => props.fields.question.value || "FAQ",
          }
        ),
        content: fields.mdx({
          label: "Content",
          options: {
            image: {
              directory: "public/blog",
              publicPath: "/blog/",
            },
          },
        }),
      },
    }),
  },
});
