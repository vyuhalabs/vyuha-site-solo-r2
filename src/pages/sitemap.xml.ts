import type { APIRoute } from "astro";
import { allPages } from "../lib/pages";

export const GET: APIRoute = async ({ site }) => {
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  const origin = site ?? new URL("https://vyuhalabs.github.io");
  const urls = (await allPages())
    .filter((p) => p.indexed)
    .map((p) => `  <url><loc>${new URL(`${base}${p.path}`, origin).href}</loc></url>`)
    .join("\n");
  const body = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(body, { headers: { "Content-Type": "application/xml" } });
};
