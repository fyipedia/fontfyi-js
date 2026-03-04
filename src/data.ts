/**
 * Google Fonts metadata -- lazy-loaded from bundled JSON.
 *
 * Provides access to 50 popular Google Fonts with full metadata including
 * family name, category, variants, subsets, designer, and popularity rank.
 *
 * @see https://fontfyi.com/fonts/
 */

import type { FontInfo } from "./types.js";
import rawFonts from "./fonts.json" with { type: "json" };

// Re-map snake_case JSON keys to camelCase FontInfo
const fonts: FontInfo[] = (rawFonts as Record<string, unknown>[]).map((f) => ({
  slug: f.slug as string,
  family: f.family as string,
  category: f.category as string,
  subcategory: (f.subcategory as string) || "",
  variants: f.variants as string[],
  subsets: f.subsets as string[],
  version: f.version as string,
  lastModified: f.last_modified as string,
  designer: f.designer as string,
  popularityRank: f.popularity_rank as number,
  bestFor: f.best_for as string[],
  similarFonts: f.similar_fonts as string[],
}));

const bySlug = new Map<string, FontInfo>(fonts.map((f) => [f.slug, f]));

/**
 * Look up a font by its slug.
 *
 * @example
 * ```ts
 * const font = getFont("inter");
 * console.log(font?.family); // "Inter"
 * ```
 *
 * @see https://fontfyi.com/font/inter/
 */
export function getFont(slug: string): FontInfo | null {
  return bySlug.get(slug) ?? null;
}

/**
 * Search fonts by family name (case-insensitive substring match).
 *
 * @example
 * ```ts
 * const results = search("mono");
 * // Roboto Mono, Fira Code, Source Code Pro, ...
 * ```
 *
 * @see https://fontfyi.com/fonts/
 */
export function search(query: string, limit: number = 20): FontInfo[] {
  const q = query.toLowerCase();
  const results: FontInfo[] = [];
  for (const font of fonts) {
    if (font.family.toLowerCase().includes(q)) {
      results.push(font);
      if (results.length >= limit) break;
    }
  }
  return results;
}

/**
 * Get fonts by CSS category.
 *
 * @param category - One of: "sans-serif", "serif", "monospace", "display", "handwriting"
 *
 * @see https://fontfyi.com/fonts/
 */
export function byCategory(category: string): FontInfo[] {
  return fonts.filter((f) => f.category === category);
}

/**
 * Get the most popular fonts sorted by popularity rank.
 *
 * @example
 * ```ts
 * const top5 = popular(5);
 * console.log(top5[0].family); // "Roboto"
 * ```
 *
 * @see https://fontfyi.com/fonts/
 */
export function popular(limit: number = 20): FontInfo[] {
  return [...fonts].sort((a, b) => a.popularityRank - b.popularityRank).slice(0, limit);
}

/**
 * Get all 50 bundled fonts.
 *
 * @see https://fontfyi.com/fonts/
 */
export function allFonts(): FontInfo[] {
  return [...fonts];
}

/**
 * Get total number of bundled fonts.
 */
export function fontCount(): number {
  return fonts.length;
}
