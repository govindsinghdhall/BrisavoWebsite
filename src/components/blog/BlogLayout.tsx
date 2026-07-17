import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogLayoutProps {
  children: React.ReactNode;
  className?: string;
  showBackLink?: boolean;
}

export function BlogLayout({
  children,
  className,
  showBackLink = true,
}: BlogLayoutProps) {
  return (
    <div className={cn("relative overflow-hidden", className)}>
      <div className="pointer-events-none absolute inset-0 mesh-gradient opacity-60" />
      <div className="container-wide relative section-padding !pt-28 sm:!pt-32">
        {showBackLink ? (
          <Link
            href="/blog"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Blog
          </Link>
        ) : null}
        {children}
      </div>
    </div>
  );
}
