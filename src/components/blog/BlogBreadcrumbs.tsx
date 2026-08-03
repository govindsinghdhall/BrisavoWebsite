import Link from "next/link";

interface BlogBreadcrumbsProps {
  title: string;
}

export function BlogBreadcrumbs({ title }: BlogBreadcrumbsProps) {
  return (
    <nav aria-label="Breadcrumb" className="mb-8 text-sm text-muted">
      <ol className="flex flex-wrap items-center gap-2">
        <li>
          <Link href="/" className="transition-colors hover:text-foreground">
            Home
          </Link>
        </li>
        <li aria-hidden>/</li>
        <li>
          <Link href="/blog" className="transition-colors hover:text-foreground">
            Blog
          </Link>
        </li>
        <li aria-hidden>/</li>
        <li className="max-w-[18rem] truncate text-foreground/80 sm:max-w-md">
          {title}
        </li>
      </ol>
    </nav>
  );
}
