/**
 * High-level engine functions for the fontfyi package.
 *
 * These functions provide a convenient, unified API surface on top of the
 * lower-level data, pairings, stacks, and utils modules.
 *
 * @see https://fontfyi.com/developers/
 */

import type { FontInfo, FontPairing, FontStack } from "./types.js";
import { getFont, search, popular } from "./data.js";
import { getPairingsFor } from "./pairings.js";
import { FONT_STACKS } from "./stacks.js";
import { googleFontsUrl, googleFontsLink, cssFamily, parseVariants } from "./utils.js";

/** CSS generation result for a font. */
export interface FontCSSResult {
  /** Google Fonts CSS import URL. */
  importUrl: string;
  /** HTML `<link>` tag for embedding the font. */
  linkTag: string;
  /** CSS `font-family` declaration with category fallback. */
  fontFamily: string;
}

/**
 * Get font metadata by slug.
 *
 * @example
 * ```ts
 * const info = fontInfo("inter");
 * console.log(info?.family);    // "Inter"
 * console.log(info?.category);  // "sans-serif"
 * ```
 *
 * @see https://fontfyi.com/fonts/inter/
 */
export function fontInfo(slug: string): FontInfo | null {
  return getFont(slug);
}

/**
 * Search fonts by name (case-insensitive substring match).
 *
 * @example
 * ```ts
 * const results = fontSearch("mono");
 * // Roboto Mono, Fira Code, Source Code Pro, ...
 * ```
 *
 * @see https://fontfyi.com/fonts/
 */
export function fontSearch(query: string, limit: number = 20): FontInfo[] {
  return search(query, limit);
}

/**
 * Generate CSS import snippet for a Google Font.
 *
 * Returns the Google Fonts import URL, an HTML `<link>` tag, and a
 * CSS `font-family` declaration with the appropriate category fallback.
 *
 * @param slug - Font slug (e.g. `"inter"`, `"roboto-mono"`).
 * @param weights - Optional specific weights to load (e.g. `[400, 700]`).
 *   If omitted, all available weights from the font metadata are used.
 *
 * @example
 * ```ts
 * const css = fontCSS("inter", [400, 700]);
 * console.log(css?.importUrl);
 * // "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
 * console.log(css?.fontFamily);
 * // "'Inter', sans-serif"
 * ```
 *
 * @see https://fontfyi.com/fonts/inter/
 */
export function fontCSS(slug: string, weights?: number[]): FontCSSResult | null {
  const font = getFont(slug);
  if (!font) return null;

  const resolvedWeights =
    weights ?? parseVariants(font.variants)[0];

  return {
    importUrl: googleFontsUrl(font.family, resolvedWeights),
    linkTag: googleFontsLink(font.family, resolvedWeights),
    fontFamily: cssFamily(font.family, font.category),
  };
}

/**
 * Get font pairing recommendations for a given font.
 *
 * Returns all curated pairings where the font appears as heading or body.
 *
 * @example
 * ```ts
 * const pairs = fontPairings("inter");
 * for (const p of pairs) {
 *   console.log(`${p.heading} + ${p.body} (${p.mood})`);
 * }
 * ```
 *
 * @see https://fontfyi.com/pairings/
 */
export function fontPairings(slug: string): FontPairing[] {
  return getPairingsFor(slug);
}

/**
 * Get all 10 CSS font stack presets.
 *
 * Returns system-ui, transitional, old-style, humanist, geometric-humanist,
 * neo-grotesque, monospace-slab, monospace-code, industrial, and rounded stacks.
 *
 * @example
 * ```ts
 * const stacks = fontStacks();
 * console.log(stacks[0].name);   // "System UI"
 * console.log(stacks[0].stack);  // "system-ui, -apple-system, ..."
 * ```
 *
 * @see https://fontfyi.com/font-stacks/
 */
export function fontStacks(): FontStack[] {
  return [...FONT_STACKS];
}

/**
 * Get the most popular Google Fonts by popularity rank.
 *
 * @example
 * ```ts
 * const top10 = popularFonts(10);
 * console.log(top10[0].family);  // "Roboto"
 * ```
 *
 * @see https://fontfyi.com/fonts/
 */
export function popularFonts(limit: number = 20): FontInfo[] {
  return popular(limit);
}
