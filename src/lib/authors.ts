export interface AuthorProfile {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
  linkedin?: string;
  website?: string;
}

export const AUTHORS: Record<string, AuthorProfile> = {
  "govind-dhall": {
    id: "govind-dhall",
    name: "Govind Dhall",
    role: "Founder & Product Engineer at Brosavo",
    bio: "Govind Dhall is the Founder of Brosavo and a software engineer with 6+ years of experience building CRM platforms, SaaS products, and enterprise applications. He specializes in real estate technology, automation, AI-powered workflows, and scalable cloud infrastructure, helping agencies streamline operations and increase sales.",
    avatar: "/images/authors/govind-dhall.jpg",
    linkedin: "https://linkedin.com/in/govinddhall",
    website: "https://brosavo.com",
  },
  "brosavo-editorial": {
    id: "brosavo-editorial",
    name: "Brosavo Editorial Team",
    role: "Research & Content Team",
    bio: "The Brosavo Editorial Team publishes in-depth guides, industry research, software comparisons, and best practices for real estate professionals. Every article is reviewed for accuracy and updated regularly to reflect the latest trends in the real estate industry.",
    avatar: "/images/authors/editorial-team.jpg",
    website: "https://brosavo.com",
  },
};

export const DEFAULT_AUTHOR_ID = "govind-dhall";

const NAME_ALIASES: Record<string, string> = {
  "govind dhall": "govind-dhall",
  "govind singh dhall": "govind-dhall",
  "brosavo editorial": "brosavo-editorial",
  "brosavo editorial team": "brosavo-editorial",
  "editorial team": "brosavo-editorial",
  // Legacy Brisavo aliases (pre-rebrand)
  "brisavo editorial": "brosavo-editorial",
  "brisavo editorial team": "brosavo-editorial",
  "brisΛvo editorial": "brosavo-editorial",
  "brisavo-editorial": "brosavo-editorial",
};

export function getAuthorById(id?: string | null): AuthorProfile {
  if (id && AUTHORS[id]) return AUTHORS[id];
  return AUTHORS[DEFAULT_AUTHOR_ID];
}

export function resolveAuthor(authorNameOrId?: string | null): AuthorProfile {
  if (!authorNameOrId?.trim()) return AUTHORS[DEFAULT_AUTHOR_ID];

  const raw = authorNameOrId.trim();
  if (AUTHORS[raw]) return AUTHORS[raw];

  const alias = NAME_ALIASES[raw.toLowerCase()];
  if (alias && AUTHORS[alias]) return AUTHORS[alias];

  return {
    id: "custom",
    name: raw,
    role: "Contributor",
    bio: `${raw} contributes insights on real estate technology and CRM best practices for Brosavo.`,
    avatar: "/images/authors/editorial-team.jpg",
    website: "https://brosavo.com",
  };
}

export const AUTHOR_OPTIONS = Object.values(AUTHORS).map((author) => ({
  value: author.name,
  label: `${author.name} — ${author.role}`,
}));
