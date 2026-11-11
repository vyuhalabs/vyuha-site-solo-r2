import { readFile } from "node:fs/promises";
import { createRequire } from "node:module";
import { Resvg } from "@resvg/resvg-js";
import type { APIRoute, GetStaticPaths } from "astro";
import satori from "satori";
import { allPages, type PageEntry } from "../../lib/pages";

const require = createRequire(import.meta.url);

async function font(path: string): Promise<Buffer> {
  return readFile(require.resolve(path));
}

export const getStaticPaths = (async () => {
  const pages = await allPages();
  return pages.map((page) => ({ params: { slug: page.og }, props: { page } }));
}) satisfies GetStaticPaths;

// A small element tree in the shape satori expects, without JSX.
type Node = { type: string; props: Record<string, unknown> };
const h = (type: string, style: Record<string, unknown>, children?: unknown): Node => ({
  type,
  props: { style, children },
});

function dots(): Node {
  const points: [number, number, number, string][] = [
    [12, 5, 2.2, "#0f766e"],
    [8, 10, 2, "#16171a"],
    [16, 10, 2, "#16171a"],
    [4.5, 15, 1.8, "#55585e"],
    [19.5, 15, 1.8, "#55585e"],
    [1.8, 19.8, 1.5, "#9a9da3"],
    [22.2, 19.8, 1.5, "#9a9da3"],
  ];
  return {
    type: "svg",
    props: {
      width: 44,
      height: 44,
      viewBox: "0 0 24 24",
      children: points.map(([cx, cy, r, fill]) => ({
        type: "circle",
        props: { cx, cy, r, fill },
      })),
    },
  };
}

export const GET: APIRoute = async ({ props }) => {
  const { page } = props as { page: PageEntry };
  const [regular, bold, mono] = await Promise.all([
    font("@fontsource/source-sans-3/files/source-sans-3-latin-400-normal.woff"),
    font("@fontsource/source-sans-3/files/source-sans-3-latin-700-normal.woff"),
    font("@fontsource/jetbrains-mono/files/jetbrains-mono-latin-400-normal.woff"),
  ]);

  const label = page.path === "/" ? "vyuha" : `vyuha${page.path.replace(/\/$/, "")}`;

  const tree = h(
    "div",
    {
      width: "100%",
      height: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "72px 80px",
      background: "#ffffff",
      backgroundImage: "radial-gradient(circle at 92% 0%, #d7efeb 0%, #ffffff 55%)",
      fontFamily: "Source Sans 3",
      color: "#16171a",
    },
    [
      h("div", { display: "flex", alignItems: "center", gap: "18px" }, [
        dots(),
        h("div", { fontSize: 40, fontWeight: 700, letterSpacing: "-0.01em" }, "vyuha"),
      ]),
      h("div", { display: "flex", flexDirection: "column", gap: "24px" }, [
        h(
          "div",
          {
            fontSize: page.title.length > 40 ? 64 : 76,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: "-0.025em",
            maxWidth: "980px",
          },
          page.title,
        ),
        h(
          "div",
          { fontSize: 30, color: "#565a61", lineHeight: 1.35, maxWidth: "980px" },
          page.description,
        ),
      ]),
      h(
        "div",
        {
          display: "flex",
          alignItems: "center",
          gap: "12px",
          fontFamily: "JetBrains Mono",
          fontSize: 22,
          color: "#0b5f58",
        },
        [h("div", { width: 10, height: 10, borderRadius: 5, background: "#0f766e" }), label],
      ),
    ],
  );

  const svg = await satori(tree as unknown as Parameters<typeof satori>[0], {
    width: 1200,
    height: 630,
    fonts: [
      { name: "Source Sans 3", data: regular, weight: 400, style: "normal" },
      { name: "Source Sans 3", data: bold, weight: 700, style: "normal" },
      { name: "JetBrains Mono", data: mono, weight: 400, style: "normal" },
    ],
  });
  const png = new Resvg(svg, { fitTo: { mode: "width", value: 1200 } }).render().asPng();
  return new Response(new Uint8Array(png), { headers: { "Content-Type": "image/png" } });
};
