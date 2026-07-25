/**
 * Commit a new markdown blog file to GitHub via the Contents API.
 */

export class GitHubPublishError extends Error {
  status: number;

  constructor(message: string, status = 400) {
    super(message);
    this.name = "GitHubPublishError";
    this.status = status;
  }
}

function getGitHubConfig() {
  const token = process.env.GITHUB_TOKEN;
  const owner = process.env.GITHUB_OWNER;
  const repo = process.env.GITHUB_REPO;
  const branch = process.env.GITHUB_BRANCH || "main";

  if (!token || !owner || !repo) {
    throw new GitHubPublishError(
      "GitHub is not configured. Set GITHUB_TOKEN, GITHUB_OWNER, and GITHUB_REPO.",
      500
    );
  }

  return { token, owner, repo, branch };
}

export async function publishBlogToGitHub(input: {
  slug: string;
  title: string;
  markdown: string;
}): Promise<{ path: string; commitSha?: string }> {
  const { token, owner, repo, branch } = getGitHubConfig();
  const path = `content/blogs/${input.slug}.md`;
  const apiBase = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;

  const headers = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${token}`,
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "brisavo-blog-publisher",
  };

  const existing = await fetch(`${apiBase}?ref=${encodeURIComponent(branch)}`, {
    headers,
    cache: "no-store",
  });

  if (existing.status === 200) {
    throw new GitHubPublishError(
      `A blog with slug "${input.slug}" already exists in the repository.`,
      409
    );
  }

  if (existing.status !== 404) {
    const detail = await existing.text();
    throw new GitHubPublishError(
      `Unable to verify slug uniqueness on GitHub (${existing.status}): ${detail}`,
      502
    );
  }

  const content = Buffer.from(input.markdown, "utf8").toString("base64");

  const response = await fetch(apiBase, {
    method: "PUT",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      message: `Add blog: ${input.title}`,
      content,
      branch,
    }),
  });

  if (!response.ok) {
    const detail = await response.text();
    throw new GitHubPublishError(
      `GitHub commit failed (${response.status}): ${detail}`,
      502
    );
  }

  const payload = (await response.json()) as {
    commit?: { sha?: string };
  };

  return {
    path,
    commitSha: payload.commit?.sha,
  };
}
