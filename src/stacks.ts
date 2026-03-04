/**
 * CSS web-safe font stack presets -- 10 curated stacks for common use cases.
 *
 * Each stack provides a complete CSS font-family value with
 * platform-specific fallbacks.
 *
 * @see https://fontfyi.com/tools/font-stack/
 */

import type { FontStack } from "./types.js";

/**
 * 10 curated font stack presets covering system UI, serif, sans-serif,
 * monospace, and specialty categories.
 *
 * @see https://fontfyi.com/tools/font-stack/
 */
export const FONT_STACKS: FontStack[] = [
  {
    slug: "system-ui",
    name: "System UI",
    description: "The native system font on each platform.",
    stack:
      "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
  },
  {
    slug: "transitional",
    name: "Transitional",
    description: "Classic serif stack for traditional body text.",
    stack: "Charter, 'Bitstream Charter', 'Sitka Text', Cambria, serif",
  },
  {
    slug: "old-style",
    name: "Old Style",
    description: "Elegant serif fonts with calligraphic origins.",
    stack: "'Iowan Old Style', 'Palatino Linotype', 'URW Palladio L', P052, serif",
  },
  {
    slug: "humanist",
    name: "Humanist Sans",
    description: "Organic, calligraphic-inspired sans serif.",
    stack:
      "Seravek, 'Gill Sans Nova', Ubuntu, Calibri, 'DejaVu Sans', source-sans-pro, sans-serif",
  },
  {
    slug: "geometric-humanist",
    name: "Geometric Humanist",
    description: "Clean, modern geometric sans.",
    stack: "Avenir, Montserrat, Corbel, 'URW Gothic', source-sans-pro, sans-serif",
  },
  {
    slug: "neo-grotesque",
    name: "Neo-grotesque",
    description: "Neutral, versatile sans-serif.",
    stack:
      "Inter, Roboto, 'Helvetica Neue', 'Arial Nova', 'Nimbus Sans', Arial, sans-serif",
  },
  {
    slug: "monospace-slab",
    name: "Monospace Slab",
    description: "Monospace with slab serif character.",
    stack: "'Nimbus Mono PS', 'Courier New', monospace",
  },
  {
    slug: "monospace-code",
    name: "Monospace Code",
    description: "Modern monospace optimized for code.",
    stack:
      "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace",
  },
  {
    slug: "industrial",
    name: "Industrial",
    description: "Bold, impactful sans serif.",
    stack:
      "Bahnschrift, 'DIN Alternate', 'Franklin Gothic Medium', 'Nimbus Sans Narrow', sans-serif-condensed, sans-serif",
  },
  {
    slug: "rounded",
    name: "Rounded Sans",
    description: "Friendly, rounded sans serif.",
    stack:
      "ui-rounded, 'Hiragino Maru Gothic ProN', Quicksand, Comfortaa, Manjari, 'Arial Rounded MT', 'Arial Rounded MT Bold', Calibri, source-sans-pro, sans-serif",
  },
];

const bySlug = new Map<string, FontStack>(FONT_STACKS.map((s) => [s.slug, s]));

/**
 * Look up a font stack by its slug.
 *
 * @example
 * ```ts
 * const stack = getStack("system-ui");
 * console.log(stack?.stack);
 * // system-ui, -apple-system, BlinkMacSystemFont, ...
 * ```
 *
 * @see https://fontfyi.com/tools/font-stack/
 */
export function getStack(slug: string): FontStack | null {
  return bySlug.get(slug) ?? null;
}
