import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import type { ComponentPropsWithoutRef } from "react";

function Anchor(props: ComponentPropsWithoutRef<"a">) {
  const href = props.href ?? "";
  const isExternal = href.startsWith("http");
  if (isExternal) {
    return (
      <a
        {...props}
        target="_blank"
        rel="noopener noreferrer"
        className="text-accent-blue underline-offset-4 hover:underline"
      />
    );
  }
  return (
    <Link
      href={href}
      className="text-accent-blue underline-offset-4 hover:underline"
    >
      {props.children}
    </Link>
  );
}

function MDXImage(props: ComponentPropsWithoutRef<"img">) {
  const src = typeof props.src === "string" ? props.src : "";
  const alt = props.alt || "";
  if (!src) return null;

  return (
    <span className="relative my-8 block overflow-hidden rounded-2xl border border-border">
      <Image
        src={src}
        alt={alt}
        width={1200}
        height={675}
        className="h-auto w-full object-cover"
        sizes="(max-width: 768px) 100vw, 720px"
      />
    </span>
  );
}

const components = {
  a: Anchor,
  img: MDXImage,
  h2: (props: ComponentPropsWithoutRef<"h2">) => (
    <h2
      {...props}
      className="mt-12 mb-4 scroll-mt-28 text-2xl font-bold tracking-tight text-foreground"
    />
  ),
  h3: (props: ComponentPropsWithoutRef<"h3">) => (
    <h3
      {...props}
      className="mt-8 mb-3 scroll-mt-28 text-xl font-semibold tracking-tight text-foreground"
    />
  ),
  p: (props: ComponentPropsWithoutRef<"p">) => (
    <p {...props} className="mb-5 text-base leading-8 text-foreground/80" />
  ),
  ul: (props: ComponentPropsWithoutRef<"ul">) => (
    <ul {...props} className="mb-5 list-disc space-y-2 pl-6 text-foreground/80" />
  ),
  ol: (props: ComponentPropsWithoutRef<"ol">) => (
    <ol
      {...props}
      className="mb-5 list-decimal space-y-2 pl-6 text-foreground/80"
    />
  ),
  li: (props: ComponentPropsWithoutRef<"li">) => (
    <li {...props} className="leading-7" />
  ),
  blockquote: (props: ComponentPropsWithoutRef<"blockquote">) => (
    <blockquote
      {...props}
      className="my-6 border-l-2 border-accent-blue/50 bg-surface px-5 py-4 text-foreground/80"
    />
  ),
  code: (props: ComponentPropsWithoutRef<"code">) => (
    <code
      {...props}
      className="rounded-md bg-surface px-1.5 py-0.5 font-mono text-[0.9em] text-accent-cyan"
    />
  ),
  pre: (props: ComponentPropsWithoutRef<"pre">) => (
    <pre
      {...props}
      className="mb-6 overflow-x-auto rounded-2xl border border-border bg-[#0b1020] p-4 text-sm text-foreground"
    />
  ),
  hr: () => <hr className="my-10 border-border" />,
  strong: (props: ComponentPropsWithoutRef<"strong">) => (
    <strong {...props} className="font-semibold text-foreground" />
  ),
};

interface MDXContentProps {
  source: string;
}

export async function MDXContent({ source }: MDXContentProps) {
  return (
    <MDXRemote
      source={source}
      components={components}
      options={{
        mdxOptions: {
          remarkPlugins: [remarkGfm],
          rehypePlugins: [
            rehypeSlug,
            [
              rehypeAutolinkHeadings,
              {
                behavior: "wrap",
                properties: {
                  className: ["no-underline"],
                },
              },
            ],
          ],
        },
      }}
    />
  );
}
