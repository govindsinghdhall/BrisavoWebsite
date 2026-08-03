import Image from "next/image";
import Link from "next/link";
import type { AuthorProfile } from "@/lib/authors";

interface AuthorCardProps {
  author: AuthorProfile;
}

export function AuthorCard({ author }: AuthorCardProps) {
  return (
    <section
      aria-label={`About ${author.name}`}
      className="rounded-2xl border border-border bg-surface/80 p-6 sm:p-8"
    >
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start">
        <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-full border border-border">
          <Image
            src={author.avatar}
            alt={author.name}
            fill
            sizes="64px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted">
            Written by
          </p>
          <h2 className="mt-1 text-xl font-semibold tracking-tight text-foreground">
            {author.name}
          </h2>
          <p className="mt-1 text-sm text-accent-blue">{author.role}</p>
          <p className="mt-3 text-sm leading-7 text-foreground/75">{author.bio}</p>

          <div className="mt-4 flex flex-wrap gap-4 text-sm">
            {author.linkedin ? (
              <Link
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent-blue transition-opacity hover:opacity-80"
              >
                LinkedIn
              </Link>
            ) : null}
            {author.website ? (
              <Link
                href={author.website}
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-accent-blue transition-opacity hover:opacity-80"
              >
                Website
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
