"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import slugify from "slugify";
import { CheckCircle2, Loader2, XCircle } from "lucide-react";
import {
  normalizeTagsInput,
  publishBlogFormSchema,
  type PublishBlogFormValues,
  type PublishBlogInput,
} from "@/lib/blog-schema";

type ToastState =
  | { type: "success"; message: string }
  | { type: "error"; message: string }
  | null;

export default function NewBlogAdminPage() {
  const [slugManual, setSlugManual] = useState(false);
  const [toast, setToast] = useState<ToastState>(null);
  const [publishing, setPublishing] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<PublishBlogFormValues>({
    resolver: zodResolver(publishBlogFormSchema),
    defaultValues: {
      title: "",
      slug: "",
      description: "",
      category: "Real Estate Tech",
      author: "BRISΛVO Editorial",
      tags: "",
      image: "/blog/sample-blog/cover.webp",
      seoTitle: "",
      seoDescription: "",
      markdown: "## Introduction\n\nWrite your blog content in Markdown...",
    },
  });

  const title = watch("title");

  useEffect(() => {
    if (!slugManual && title) {
      setValue(
        "slug",
        slugify(title, { lower: true, strict: true }),
        { shouldValidate: true }
      );
    }
  }, [title, slugManual, setValue]);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), 4500);
    return () => window.clearTimeout(timer);
  }, [toast]);

  async function onSubmit(values: PublishBlogFormValues) {
    setPublishing(true);
    setToast(null);

    try {
      const payload: PublishBlogInput = {
        ...values,
        tags: normalizeTagsInput(values.tags),
        seoTitle: values.seoTitle || values.title,
        seoDescription: values.seoDescription || values.description,
      };

      const response = await fetch("/api/blog/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as {
        error?: string;
        url?: string;
        slug?: string;
      };

      if (!response.ok) {
        setToast({
          type: "error",
          message: data.error || "Failed to publish blog",
        });
        return;
      }

      setToast({
        type: "success",
        message: `Published successfully${data.slug ? `: ${data.slug}` : ""}`,
      });
    } catch {
      setToast({
        type: "error",
        message: "Network error while publishing. Please try again.",
      });
    } finally {
      setPublishing(false);
    }
  }

  const fieldClass =
    "mt-2 w-full rounded-2xl border border-border bg-background/70 px-4 py-3 text-sm outline-none ring-accent-blue/30 placeholder:text-muted focus:ring-2";
  const labelClass = "block text-sm font-medium text-foreground";

  return (
    <main className="relative min-h-screen px-6 py-10 sm:px-10">
      <div className="pointer-events-none absolute inset-0 mesh-gradient opacity-50" />

      <div className="relative mx-auto max-w-5xl">
        <header className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent-blue">
            Admin CMS
          </p>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-foreground sm:text-4xl">
            Create New Blog
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted">
            Publish a markdown post directly to GitHub. It will appear on the
            site after the next deploy / ISR refresh.
          </p>
        </header>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="glass space-y-6 rounded-[2rem] p-6 sm:p-8"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <label className={labelClass}>
              Title
              <input
                {...register("title")}
                className={fieldClass}
                placeholder="How to Buy Property in Gurgaon"
              />
              {errors.title ? (
                <span className="mt-1 block text-xs text-red-500">
                  {errors.title.message}
                </span>
              ) : null}
            </label>

            <label className={labelClass}>
              Slug
              <input
                {...register("slug")}
                className={fieldClass}
                placeholder="how-to-buy-property"
                onChange={(event) => {
                  setSlugManual(true);
                  setValue("slug", event.target.value, { shouldValidate: true });
                }}
              />
              {errors.slug ? (
                <span className="mt-1 block text-xs text-red-500">
                  {errors.slug.message}
                </span>
              ) : null}
            </label>
          </div>

          <label className={labelClass}>
            Description
            <textarea
              {...register("description")}
              rows={3}
              className={fieldClass}
              placeholder="Short summary shown on cards and SEO"
            />
            {errors.description ? (
              <span className="mt-1 block text-xs text-red-500">
                {errors.description.message}
              </span>
            ) : null}
          </label>

          <div className="grid gap-6 md:grid-cols-2">
            <label className={labelClass}>
              Category
              <input
                {...register("category")}
                className={fieldClass}
                placeholder="Real Estate"
              />
              {errors.category ? (
                <span className="mt-1 block text-xs text-red-500">
                  {errors.category.message}
                </span>
              ) : null}
            </label>

            <label className={labelClass}>
              Author
              <input
                {...register("author")}
                className={fieldClass}
                placeholder="Govind Singh Dhall"
              />
              {errors.author ? (
                <span className="mt-1 block text-xs text-red-500">
                  {errors.author.message}
                </span>
              ) : null}
            </label>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <label className={labelClass}>
              Tags (comma separated)
              <input
                {...register("tags")}
                className={fieldClass}
                placeholder="Property, Investment, CRM"
              />
            </label>

            <label className={labelClass}>
              Image URL
              <input
                {...register("image")}
                className={fieldClass}
                placeholder="/blog/my-post/cover.webp"
              />
              {errors.image ? (
                <span className="mt-1 block text-xs text-red-500">
                  {errors.image.message}
                </span>
              ) : null}
            </label>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <label className={labelClass}>
              SEO Title
              <input
                {...register("seoTitle")}
                className={fieldClass}
                placeholder="Optional — defaults to Title"
              />
            </label>

            <label className={labelClass}>
              SEO Description
              <input
                {...register("seoDescription")}
                className={fieldClass}
                placeholder="Optional — defaults to Description"
              />
            </label>
          </div>

          <label className={labelClass}>
            Markdown Content
            <textarea
              {...register("markdown")}
              rows={18}
              className={`${fieldClass} font-mono text-[13px] leading-6`}
              placeholder="## Introduction&#10;&#10;Your content..."
            />
            {errors.markdown ? (
              <span className="mt-1 block text-xs text-red-500">
                {errors.markdown.message}
              </span>
            ) : null}
          </label>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <p className="text-xs text-muted">
              Commits to <code>content/blogs/{"{slug}"}.md</code> via GitHub.
            </p>
            <button
              type="submit"
              disabled={publishing}
              className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-accent-blue to-accent-violet px-8 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {publishing ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Publishing...
                </>
              ) : (
                "Publish"
              )}
            </button>
          </div>
        </form>
      </div>

      {toast ? (
        <div
          className={`fixed bottom-6 right-6 z-50 flex max-w-sm items-start gap-3 rounded-2xl border px-4 py-3 shadow-lg ${
            toast.type === "success"
              ? "border-emerald-500/30 bg-background text-foreground"
              : "border-red-500/30 bg-background text-foreground"
          }`}
          role="status"
        >
          {toast.type === "success" ? (
            <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-emerald-500" />
          ) : (
            <XCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-500" />
          )}
          <p className="text-sm leading-6">{toast.message}</p>
        </div>
      ) : null}
    </main>
  );
}
