/**
 * Core type definitions for the fontfyi package.
 *
 * @see https://fontfyi.com/developers/
 */

/** Metadata for a single Google Font. */
export interface FontInfo {
  /** URL-friendly identifier (e.g. "inter", "roboto-mono"). */
  slug: string;
  /** Official font family name (e.g. "Inter", "Roboto Mono"). */
  family: string;
  /** CSS category: sans-serif, serif, monospace, display, handwriting. */
  category: string;
  /** Design subcategory (e.g. "neo-grotesque", "coding-mono"). */
  subcategory: string;
  /** Available weight/style variants (e.g. ["regular", "700", "italic"]). */
  variants: string[];
  /** Supported character subsets (e.g. ["latin", "cyrillic"]). */
  subsets: string[];
  /** Font file version on Google Fonts. */
  version: string;
  /** Last modification date (ISO format). */
  lastModified: string;
  /** Font designer or foundry name. */
  designer: string;
  /** Popularity rank (1 = most popular). */
  popularityRank: number;
  /** Recommended use cases (e.g. ["code", "terminal", "data"]). */
  bestFor: string[];
  /** Slugs of visually similar fonts. */
  similarFonts: string[];
}

/** A CSS web-safe font stack preset. */
export interface FontStack {
  /** URL-friendly identifier (e.g. "system-ui", "monospace-code"). */
  slug: string;
  /** Human-readable name (e.g. "System UI"). */
  name: string;
  /** Brief description of the stack's character. */
  description: string;
  /** Complete CSS font-family value with platform fallbacks. */
  stack: string;
}

/** A curated heading + body font pairing recommendation. */
export interface FontPairing {
  /** Font slug for headings. */
  heading: string;
  /** Font slug for body text. */
  body: string;
  /** Why this pairing works -- design rationale. */
  rationale: string;
  /** Quality score (1--10, higher is better). */
  score: number;
  /** Recommended use cases (e.g. ["blog", "saas", "landing-page"]). */
  useCases: string[];
  /** Mood classification (e.g. "professional-modern", "bold-clean"). */
  mood: string;
}
