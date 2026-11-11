export const SITE = {
  name: "vyuha",
  tagline: "Run a company of agents, with a person in charge.",
  description:
    "vyuha is the platform on which a small team runs a company of AI agents: tracked work, real coding harnesses on your machines, evidence for every step, and decisions that stay with a person.",
  repo: "https://github.com/vyuhalabs/vyuha-site-solo-r2",
} as const;

export const ACCESS_URL = `${SITE.repo}/issues/new?template=access-request.yml`;

/** Prefix an internal path with the configured base, keeping a trailing slash for pages. */
export function href(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${base}${clean}`;
}

export const NAV = [
  { label: "The model", path: "/docs/model/" },
  { label: "Guide", path: "/docs/getting-started/" },
  { label: "FAQ", path: "/faq/" },
] as const;
