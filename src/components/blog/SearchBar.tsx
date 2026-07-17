"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState, useTransition } from "react";
import { Search, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface SearchBarProps {
  className?: string;
  placeholder?: string;
}

export function SearchBar({
  className,
  placeholder = "Search articles...",
}: SearchBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();
  const [value, setValue] = useState(searchParams.get("q") ?? "");

  function updateQuery(nextValue: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (nextValue.trim()) {
      params.set("q", nextValue.trim());
    } else {
      params.delete("q");
    }
    params.delete("page");
    startTransition(() => {
      router.push(`/blog?${params.toString()}`);
    });
  }

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateQuery(value);
  }

  return (
    <form
      onSubmit={onSubmit}
      className={cn(
        "glass relative flex items-center rounded-2xl px-4 py-3",
        isPending && "opacity-80",
        className
      )}
    >
      <Search className="mr-3 h-4 w-4 shrink-0 text-muted" />
      <input
        type="search"
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted"
        aria-label="Search blog posts"
      />
      {value ? (
        <button
          type="button"
          onClick={() => {
            setValue("");
            updateQuery("");
          }}
          className="ml-2 rounded-full p-1 text-muted hover:text-foreground"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      ) : null}
    </form>
  );
}
