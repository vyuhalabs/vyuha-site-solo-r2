// Internal link check over the built site.
// Every href/src in every HTML file that points inside the site must resolve to a
// file in dist/, and every #fragment must match an id on the target page.
// Usage: node scripts/check-links.mjs dist
import { existsSync, readdirSync, readFileSync, statSync } from "node:fs";
import { join, relative } from "node:path";

const root = process.argv[2] ?? "dist";
const siteUrl = new URL(process.env.SITE_URL ?? "https://vyuhalabs.github.io/vyuha-site-solo-r2");
const base = siteUrl.pathname.replace(/\/$/, "");

function walk(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    return statSync(path).isDirectory() ? walk(path) : [path];
  });
}

const htmlFiles = walk(root).filter((f) => f.endsWith(".html"));
const idCache = new Map();

function idsOf(file) {
  if (!idCache.has(file)) {
    const html = readFileSync(file, "utf8");
    const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
    idCache.set(file, ids);
  }
  return idCache.get(file);
}

/** Map a URL path (with base) to a file in dist, or null. */
function resolveFile(pathname) {
  if (base && !pathname.startsWith(`${base}/`) && pathname !== base) return null;
  const rel = decodeURIComponent(pathname.slice(base.length)) || "/";
  const candidates = rel.endsWith("/")
    ? [join(root, rel, "index.html")]
    : [join(root, rel), join(root, rel, "index.html"), join(root, `${rel}.html`)];
  return candidates.find((c) => existsSync(c) && statSync(c).isFile()) ?? null;
}

function pageUrl(file) {
  const rel = relative(root, file).split("\\").join("/");
  const path = rel.endsWith("index.html") ? rel.slice(0, -"index.html".length) : rel;
  return new URL(`${base}/${path}`, siteUrl.origin);
}

const errors = [];
let checked = 0;

for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  const from = pageUrl(file);
  for (const m of html.matchAll(/\s(?:href|src)="([^"]*)"/g)) {
    const raw = m[1].replaceAll("&amp;", "&");
    if (!raw || /^(mailto:|tel:|data:|javascript:)/.test(raw)) continue;
    const target = new URL(raw, from);
    if (target.origin !== siteUrl.origin) continue;
    if (!target.pathname.startsWith(base || "/")) {
      // Same origin but outside the site (another Pages site): not ours to check.
      continue;
    }
    checked++;
    const targetFile = resolveFile(target.pathname);
    if (!targetFile) {
      errors.push(`${relative(root, file)}: broken link ${raw}`);
      continue;
    }
    if (target.hash && targetFile.endsWith(".html")) {
      const id = decodeURIComponent(target.hash.slice(1));
      if (!idsOf(targetFile).has(id)) {
        errors.push(`${relative(root, file)}: missing anchor ${raw}`);
      }
    }
  }
}

// Absolute links to the site's own address (canonical, og:url) are checked too.
for (const file of htmlFiles) {
  const html = readFileSync(file, "utf8");
  for (const m of html.matchAll(/content="(https?:\/\/[^"]+)"/g)) {
    const target = new URL(m[1]);
    if (target.origin !== siteUrl.origin || !target.pathname.startsWith(base || "/")) continue;
    checked++;
    if (!resolveFile(target.pathname)) {
      errors.push(`${relative(root, file)}: broken meta link ${m[1]}`);
    }
  }
}

if (errors.length) {
  console.error(errors.join("\n"));
  console.error(
    `\n${errors.length} broken of ${checked} internal links in ${htmlFiles.length} pages.`,
  );
  process.exit(1);
}
console.log(`OK: ${checked} internal links in ${htmlFiles.length} pages, none broken.`);
