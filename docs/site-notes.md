# Notes about the site

## Decisions

- **No client-side JavaScript.** Light and dark follow `prefers-color-scheme`; there is no theme toggle, because it would need a script.
- **Illustrations are HTML and CSS**, not images. They show the Inbox, a run with its evidence, the decision matrix and a playbook's stages, using the product's own words. They are labelled as illustrations in their captions.
- **One accent colour**: teal (`--accent`), `#0f766e` in light and `#2dd4bf` in dark. Everything else is neutral.
- **Type**: Source Sans 3 (humanist sans) for text, JetBrains Mono for code and identifiers. Both self-hosted, latin subset, in `src/assets/fonts/` with their licences.
- **Markdown, not MDX.** No MDX release supports Astro 7 yet, and the content does not need components. Links inside Markdown are relative (`../model/`) so they work under any `base`.
- **Sitemap and robots** are small endpoints in `src/pages/`, which gives `sitemap.xml` at the address the standards name.
- **Open Graph images** are generated at build time by `src/pages/og/[slug].png.ts` (satori and resvg), one per page.
- **The 404 page** carries `noindex` and no canonical link.

## Quality gates

- `build` workflow: install, `astro check`, `astro build`, `scripts/check-links.mjs` over `dist/` (every internal `href`, `src` and fragment must resolve).
- `quality` workflow: `biome ci`, `tsc --noEmit`.
- `deploy` workflow: the same build, then `upload-pages-artifact` and `deploy-pages`, on `main` only.

## Lighthouse

Home page, local production build, Lighthouse 12: 100 for performance, accessibility, best practices and SEO, on both the mobile and desktop presets.
