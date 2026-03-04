/**
 * Font utility functions -- CSS generation, weight parsing, URL building.
 *
 * Pure TypeScript, zero dependencies.
 *
 * @see https://fontfyi.com/developers/
 */

/** CSS weight name mapping (standard numeric values to human-readable names). */
export const WEIGHT_NAMES: Record<number, string> = {
  100: "Thin",
  200: "Extra Light",
  300: "Light",
  400: "Regular",
  500: "Medium",
  600: "Semi Bold",
  700: "Bold",
  800: "Extra Bold",
  900: "Black",
};

/** CSS category fallback stacks for font-family declarations. */
export const CATEGORY_FALLBACKS: Record<string, string> = {
  "sans-serif": "sans-serif",
  serif: "serif",
  display: "system-ui",
  handwriting: "cursive",
  monospace: "monospace",
};

/**
 * Parse Google Fonts variant strings into numeric weights and italic flag.
 *
 * @returns A tuple of [sorted weights, hasItalic].
 *
 * @example
 * ```ts
 * const [weights, hasItalic] = parseVariants(["100", "regular", "700", "italic", "700italic"]);
 * // weights: [100, 400, 700], hasItalic: true
 * ```
 */
export function parseVariants(variants: string[]): [number[], boolean] {
  const weights = new Set<number>();
  let hasItalic = false;

  for (const v of variants) {
    if (v === "regular") {
      weights.add(400);
    } else if (v === "italic") {
      weights.add(400);
      hasItalic = true;
    } else if (v.endsWith("italic")) {
      hasItalic = true;
      const w = v.replace("italic", "");
      if (w) {
        weights.add(parseInt(w, 10));
      }
    } else if (/^\d+$/.test(v)) {
      weights.add(parseInt(v, 10));
    }
  }

  return [[...weights].sort((a, b) => a - b), hasItalic];
}

/**
 * Get the human-readable name for a CSS numeric weight.
 *
 * @example
 * ```ts
 * weightName(400); // "Regular"
 * weightName(700); // "Bold"
 * ```
 */
export function weightName(weight: number): string {
  return WEIGHT_NAMES[weight] ?? String(weight);
}

/**
 * Generate a CSS font-family declaration with category fallback.
 *
 * @example
 * ```ts
 * cssFamily("Inter", "sans-serif");       // "'Inter', sans-serif"
 * cssFamily("Roboto Mono", "monospace");  // "'Roboto Mono', monospace"
 * ```
 */
export function cssFamily(family: string, category: string): string {
  const fallback = CATEGORY_FALLBACKS[category] ?? "sans-serif";
  return `'${family}', ${fallback}`;
}

/**
 * Generate a Google Fonts CSS import URL.
 *
 * @example
 * ```ts
 * googleFontsUrl("Inter", [400, 700]);
 * // "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
 *
 * googleFontsUrl("Roboto");
 * // "https://fonts.googleapis.com/css2?family=Roboto&display=swap"
 * ```
 *
 * @see https://fontfyi.com/font/inter/
 */
export function googleFontsUrl(family: string, weights?: number[]): string {
  const encoded = family.replace(/ /g, "+");
  if (weights && weights.length > 0) {
    const weightStr = [...weights].sort((a, b) => a - b).join(";");
    return `https://fonts.googleapis.com/css2?family=${encoded}:wght@${weightStr}&display=swap`;
  }
  return `https://fonts.googleapis.com/css2?family=${encoded}&display=swap`;
}

/**
 * Generate an HTML `<link>` tag for loading a Google Font.
 *
 * @example
 * ```ts
 * googleFontsLink("Inter", [400, 700]);
 * // '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap">'
 * ```
 */
export function googleFontsLink(family: string, weights?: number[]): string {
  const url = googleFontsUrl(family, weights);
  return `<link rel="stylesheet" href="${url}">`;
}

/**
 * Generate a Google Fonts download URL for a font family.
 *
 * @example
 * ```ts
 * googleDownloadUrl("Inter");
 * // "https://fonts.google.com/download?family=Inter"
 * ```
 */
export function googleDownloadUrl(family: string): string {
  return `https://fonts.google.com/download?family=${family}`;
}
