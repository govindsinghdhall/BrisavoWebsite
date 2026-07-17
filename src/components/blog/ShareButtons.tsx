"use client";

import { useState } from "react";
import { Check, Link2, Share2, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface ShareButtonsProps {
  title: string;
  url: string;
  className?: string;
}

export function ShareButtons({ title, url, className }: ShareButtonsProps) {
  const [copied, setCopied] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  async function copyLink() {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  const buttonClass =
    "inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-surface text-foreground/70 transition-colors hover:bg-surface-hover hover:text-foreground";

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedTitle}`}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        aria-label="Share on X"
      >
        <X className="h-4 w-4" />
      </a>
      <a
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
        target="_blank"
        rel="noopener noreferrer"
        className={buttonClass}
        aria-label="Share on LinkedIn"
      >
        <Share2 className="h-4 w-4" />
      </a>
      <button
        type="button"
        onClick={copyLink}
        className={buttonClass}
        aria-label="Copy link"
      >
        {copied ? (
          <Check className="h-4 w-4 text-accent-cyan" />
        ) : (
          <Link2 className="h-4 w-4" />
        )}
      </button>
    </div>
  );
}
