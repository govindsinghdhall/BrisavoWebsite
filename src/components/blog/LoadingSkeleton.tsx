import { cn } from "@/lib/utils";

interface LoadingSkeletonProps {
  count?: number;
  className?: string;
}

function SkeletonCard() {
  return (
    <div className="glass overflow-hidden rounded-3xl">
      <div className="aspect-[16/10] animate-pulse bg-surface" />
      <div className="space-y-3 p-6">
        <div className="h-4 w-24 animate-pulse rounded-full bg-surface" />
        <div className="h-6 w-4/5 animate-pulse rounded-full bg-surface" />
        <div className="h-4 w-full animate-pulse rounded-full bg-surface" />
        <div className="h-4 w-3/4 animate-pulse rounded-full bg-surface" />
        <div className="mt-4 flex items-center gap-3">
          <div className="h-10 w-10 animate-pulse rounded-full bg-surface" />
          <div className="h-4 w-32 animate-pulse rounded-full bg-surface" />
        </div>
      </div>
    </div>
  );
}

export function LoadingSkeleton({ count = 6, className }: LoadingSkeletonProps) {
  return (
    <div
      className={cn(
        "grid gap-6 sm:grid-cols-2 xl:grid-cols-3",
        className
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
}
