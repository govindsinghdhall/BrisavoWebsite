"use client";

import { FormEvent, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Lock } from "lucide-react";

export default function AuthenticationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      const data = (await response.json()) as { error?: string };

      if (!response.ok) {
        setError(data.error || "Invalid password");
        return;
      }

      const next = searchParams.get("next") || "/admin/blog/new";
      router.replace(next.startsWith("/") ? next : "/admin/blog/new");
      router.refresh();
    } catch {
      setError("Unable to sign in. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center px-6 py-16">
      <div className="pointer-events-none absolute inset-0 mesh-gradient opacity-70" />
      <form
        onSubmit={onSubmit}
        className="glass relative w-full max-w-md rounded-[2rem] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
      >
        <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-accent-blue/15 text-accent-blue">
          <Lock className="h-5 w-5" />
        </div>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">
          Blog Admin Login
        </h1>
        <p className="mt-2 text-sm text-muted">
          Enter the admin password to publish new blog posts.
        </p>

        <label className="mt-8 block text-sm font-medium text-foreground">
          Password
          <input
            type="password"
            name="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter Password"
            autoComplete="current-password"
            required
            className="mt-2 w-full rounded-2xl border border-border bg-background/70 px-4 py-3 text-sm outline-none ring-accent-blue/30 placeholder:text-muted focus:ring-2"
          />
        </label>

        {error ? (
          <p className="mt-3 text-sm text-red-500" role="alert">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-2xl bg-linear-to-r from-accent-blue to-accent-violet px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {loading ? "Signing in..." : "Login"}
        </button>
      </form>
    </main>
  );
}
