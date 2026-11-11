import { getCollection } from "astro:content";
import { SITE } from "../site";

export interface PageEntry {
  /** Path without the base, with a trailing slash. */
  path: string;
  title: string;
  description: string;
  /** Slug of the generated Open Graph image. */
  og: string;
  /** Listed in the sitemap. */
  indexed: boolean;
}

export const FAQ_DESCRIPTION =
  "Short answers to the first questions about vyuha: what it is, where agents run, what counts as evidence and which decisions need a person.";

export const DOCS_DESCRIPTION =
  "The getting-started guide and the model behind vyuha, written in plain words.";

/** Every page on the site, used for the sitemap and the Open Graph images. */
export async function allPages(): Promise<PageEntry[]> {
  const docs = (await getCollection("docs")).sort((a, b) => a.data.order - b.data.order);
  return [
    { path: "/", title: SITE.tagline, description: SITE.description, og: "home", indexed: true },
    {
      path: "/docs/",
      title: "Documentation",
      description: DOCS_DESCRIPTION,
      og: "docs",
      indexed: true,
    },
    ...docs.map((d) => ({
      path: `/docs/${d.id}/`,
      title: d.data.title,
      description: d.data.description,
      og: `docs-${d.id}`,
      indexed: true,
    })),
    { path: "/faq/", title: "FAQ", description: FAQ_DESCRIPTION, og: "faq", indexed: true },
    {
      path: "/404/",
      title: "Page not found",
      description: "This page does not exist.",
      og: "404",
      indexed: false,
    },
  ];
}
