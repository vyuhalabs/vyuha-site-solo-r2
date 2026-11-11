// @ts-check
import { defineConfig } from "astro/config";

// SITE_URL is the full public address, path included. The workflow sets it;
// the default matches the GitHub Pages address so local builds are correct too.
const siteUrl = new URL(process.env.SITE_URL ?? "https://vyuhalabs.github.io/vyuha-site-solo-r2");
const base = siteUrl.pathname.replace(/\/$/, "") || "/";

export default defineConfig({
  output: "static",
  site: siteUrl.origin,
  base,
  trailingSlash: "always",
  build: {
    format: "directory",
    inlineStylesheets: "always",
  },
  devToolbar: { enabled: false },
});
