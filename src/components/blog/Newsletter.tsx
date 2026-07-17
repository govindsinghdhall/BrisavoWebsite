"use client";

import { FormEvent, useState } from "react";
import { Mail } from "lucide-react";
import { cn } from "@/lib/utils";

interface NewsletterProps {
  className?: string;
}

export function Newsletter({ className }: NewsletterProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "success">("idle");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!email.trim()) return;
    setStatus("success");
    setEmail("");
  }

  return (
    <section
      className={cn(
        "glass relative overflow-hidden rounded-[2rem] p-8 sm:p-10",
        className
      )}
    >
      <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent-blue/20 blur-3xl" />
      <div className="absolute -bottom-12 left-8 h-40 w-40 rounded-full bg-accent-violet/20 blur-3xl" />

      <div className="relative max-w-2xl">
        <div className="mb-4 inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-accent-blue/15 text-accent-blue">
          <Mail className="h-5 w-5" />
        </div>
        <h3 className="text-2xl font-bold tracking-tight text-foreground">
          Stay ahead of the stack
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-muted">
          Get BRISΛVO insights on AI, cloud, CRM, and product engineering —
          delivered occasionally, never spam.
        </p>

        <form
          onSubmit={onSubmit}
          className="mt-6 flex flex-col gap-3 sm:flex-row"
        >
          <input
            type="email"
            required
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              setStatus("idle");
            }}
            placeholder="you@company.com"
            className="w-full rounded-2xl border border-border bg-background/60 px-4 py-3 text-sm outline-none ring-accent-blue/30 placeholder:text-muted focus:ring-2"
          />
          <button
            type="submit"
            className="rounded-2xl bg-linear-to-r from-accent-blue to-accent-violet px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90"
          >
            Subscribe
          </button>
        </form>

        {status === "success" ? (
          <p className="mt-3 text-sm text-accent-cyan">
            Thanks — you&apos;re on the list.
          </p>
        ) : null}
      </div>
    </section>
  );
}
