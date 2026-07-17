"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils";

interface CoverImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  sizes?: string;
  fill?: boolean;
}

const FALLBACK = "/blog/ai-infrastructure.png";

export function CoverImage({
  src,
  alt,
  className,
  priority = false,
  sizes = "(max-width: 768px) 100vw, 50vw",
  fill = true,
}: CoverImageProps) {
  const [imageSrc, setImageSrc] = useState(src || FALLBACK);

  if (fill) {
    return (
      <Image
        src={imageSrc}
        alt={alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", className)}
        onError={() => {
          if (imageSrc !== FALLBACK) setImageSrc(FALLBACK);
        }}
      />
    );
  }

  return (
    <Image
      src={imageSrc}
      alt={alt}
      width={1200}
      height={675}
      priority={priority}
      sizes={sizes}
      className={cn("object-cover", className)}
      onError={() => {
        if (imageSrc !== FALLBACK) setImageSrc(FALLBACK);
      }}
    />
  );
}
