/**
 * fontfyi -- Pure TypeScript Google Fonts toolkit.
 *
 * Metadata for 50 popular Google Fonts, CSS helpers,
 * font pairing recommendations, and font stack presets.
 * Zero dependencies.
 *
 * @example
 * ```ts
 * import { fontInfo, fontCSS, fontPairings, fontStacks } from "fontfyi";
 *
 * // Look up a font
 * const font = fontInfo("inter");
 * console.log(font?.family);      // "Inter"
 * console.log(font?.category);    // "sans-serif"
 *
 * // Generate CSS import
 * const css = fontCSS("inter", [400, 700]);
 * console.log(css?.importUrl);
 * // "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
 *
 * // Font pairings
 * const pairs = fontPairings("inter");
 * // Inter + Merriweather, Poppins + Inter, ...
 *
 * // Font stacks
 * const stacks = fontStacks();
 * console.log(stacks[0].stack);
 * // "system-ui, -apple-system, BlinkMacSystemFont, ..."
 * ```
 *
 * @see https://fontfyi.com/
 * @packageDocumentation
 */

// Types
export type { FontInfo, FontStack, FontPairing } from "./types.js";
export type { FontCSSResult } from "./engine.js";

// Engine -- high-level API
export {
  fontInfo,
  fontSearch,
  fontCSS,
  fontPairings,
  fontStacks,
  popularFonts,
} from "./engine.js";

// Data -- font lookup and search
export { getFont, search, byCategory, popular, allFonts, fontCount } from "./data.js";

// Font stacks
export { FONT_STACKS, getStack } from "./stacks.js";

// Font pairings
export { PAIRINGS, getPairingsFor, featuredPairings } from "./pairings.js";

// CSS utilities
export {
  WEIGHT_NAMES,
  CATEGORY_FALLBACKS,
  parseVariants,
  weightName,
  cssFamily,
  googleFontsUrl,
  googleFontsLink,
  googleDownloadUrl,
} from "./utils.js";
