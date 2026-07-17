import { createReader } from "@keystatic/core/reader";
import { createGitHubReader } from "@keystatic/core/reader/github";
import keystaticConfig from "../../../keystatic.config";

/**
 * Reusable Keystatic content reader.
 * Uses local filesystem in development and GitHub when configured for production.
 */
export function getReader() {
  const githubRepo = process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_REPO;
  const githubToken =
    process.env.KEYSTATIC_GITHUB_TOKEN || process.env.GITHUB_PAT;
  const useGitHubReader =
    process.env.KEYSTATIC_READER_MODE === "github" ||
    (process.env.NODE_ENV === "production" &&
      Boolean(githubRepo) &&
      Boolean(githubToken));

  if (useGitHubReader && githubRepo && githubToken) {
    return createGitHubReader(keystaticConfig, {
      repo: githubRepo as `${string}/${string}`,
      token: githubToken,
    });
  }

  return createReader(process.cwd(), keystaticConfig);
}

export type KeystaticReader = ReturnType<typeof getReader>;
