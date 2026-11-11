# vyuha website

The public site for vyuha, live at <https://vyuhalabs.github.io/vyuha-site-solo-r2/>. Astro, static output.

1. Use Node 22 (`nvm use`) and pnpm (`corepack enable`).
2. Install: `pnpm install`.
3. Run locally: `pnpm dev`, then open the address it prints.
4. Build: `pnpm build` writes the site to `dist/`; `pnpm preview` serves it.
5. Check like CI does: `pnpm check`, `pnpm links` (after a build), `pnpm lint`, `pnpm typecheck`.
6. Content: the guide and the model are in `src/content/docs/`, the FAQ in `src/content/faq/`.
7. Deploy: push to `main`. The `deploy` workflow builds and publishes to GitHub Pages.
8. `SITE_URL` (full address, path included) sets the canonical URLs, the sitemap and the Astro `base`.
9. Releases: tag a commit on `main` and add a note to `CHANGELOG.md`.
10. Notes about the site itself are in `docs/`.
