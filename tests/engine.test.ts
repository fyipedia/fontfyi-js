import { describe, it, expect } from "vitest";
import {
  // Engine (high-level API)
  fontInfo,
  fontSearch,
  fontCSS,
  fontPairings,
  fontStacks,
  popularFonts,
  // Data
  getFont,
  search,
  byCategory,
  popular,
  allFonts,
  fontCount,
  // Stacks
  getStack,
  FONT_STACKS,
  // Pairings
  PAIRINGS,
  getPairingsFor,
  featuredPairings,
  // Utils
  parseVariants,
  weightName,
  cssFamily,
  googleFontsUrl,
  googleFontsLink,
  googleDownloadUrl,
  WEIGHT_NAMES,
  CATEGORY_FALLBACKS,
} from "../src/index.js";

// ---------------------------------------------------------------------------
// Engine: fontInfo
// ---------------------------------------------------------------------------
describe("fontInfo", () => {
  it("returns font metadata by slug", () => {
    const font = fontInfo("inter");
    expect(font).not.toBeNull();
    expect(font!.family).toBe("Inter");
    expect(font!.category).toBe("sans-serif");
  });

  it("returns null for unknown slug", () => {
    expect(fontInfo("nonexistent")).toBeNull();
  });
});

// ---------------------------------------------------------------------------
// Engine: fontSearch
// ---------------------------------------------------------------------------
describe("fontSearch", () => {
  it("finds fonts by name", () => {
    const results = fontSearch("mono");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((f) => f.slug === "roboto-mono")).toBe(true);
  });

  it("respects limit", () => {
    const results = fontSearch("r", 2);
    expect(results.length).toBeLessThanOrEqual(2);
  });
});

// ---------------------------------------------------------------------------
// Engine: fontCSS
// ---------------------------------------------------------------------------
describe("fontCSS", () => {
  it("generates CSS for a font with specific weights", () => {
    const css = fontCSS("inter", [400, 700]);
    expect(css).not.toBeNull();
    expect(css!.importUrl).toBe(
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap",
    );
    expect(css!.linkTag).toContain("<link");
    expect(css!.linkTag).toContain("Inter");
    expect(css!.fontFamily).toBe("'Inter', sans-serif");
  });

  it("uses all available weights when none specified", () => {
    const css = fontCSS("inter");
    expect(css).not.toBeNull();
    expect(css!.importUrl).toContain("wght@");
    // Inter has weights 100-900
    expect(css!.importUrl).toContain("100");
    expect(css!.importUrl).toContain("900");
  });

  it("returns null for unknown slug", () => {
    expect(fontCSS("nonexistent")).toBeNull();
  });

  it("generates correct fallback for monospace", () => {
    const css = fontCSS("fira-code", [400]);
    expect(css).not.toBeNull();
    expect(css!.fontFamily).toBe("'Fira Code', monospace");
  });
});

// ---------------------------------------------------------------------------
// Engine: fontPairings
// ---------------------------------------------------------------------------
describe("fontPairings", () => {
  it("returns pairings for a font", () => {
    const pairs = fontPairings("inter");
    expect(pairs.length).toBeGreaterThanOrEqual(3);
    expect(pairs.every((p) => p.heading === "inter" || p.body === "inter")).toBe(true);
  });

  it("returns empty for font with no pairings", () => {
    expect(fontPairings("nonexistent")).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// Engine: fontStacks
// ---------------------------------------------------------------------------
describe("fontStacks", () => {
  it("returns all 10 stacks", () => {
    const stacks = fontStacks();
    expect(stacks).toHaveLength(10);
  });

  it("returns a copy (not the internal array)", () => {
    const a = fontStacks();
    const b = fontStacks();
    expect(a).not.toBe(b);
    expect(a).toEqual(b);
  });

  it("includes system-ui stack", () => {
    const stacks = fontStacks();
    const systemUi = stacks.find((s) => s.slug === "system-ui");
    expect(systemUi).toBeDefined();
    expect(systemUi!.stack).toContain("system-ui");
  });
});

// ---------------------------------------------------------------------------
// Engine: popularFonts
// ---------------------------------------------------------------------------
describe("popularFonts", () => {
  it("returns fonts sorted by popularity", () => {
    const top5 = popularFonts(5);
    expect(top5).toHaveLength(5);
    expect(top5[0].slug).toBe("roboto");
  });

  it("defaults to 20", () => {
    const fonts = popularFonts();
    expect(fonts).toHaveLength(20);
  });
});

// ---------------------------------------------------------------------------
// Data: getFont
// ---------------------------------------------------------------------------
describe("getFont", () => {
  it("finds Inter by slug", () => {
    const font = getFont("inter");
    expect(font).not.toBeNull();
    expect(font!.family).toBe("Inter");
    expect(font!.category).toBe("sans-serif");
    expect(font!.designer).toBe("Rasmus Andersson");
  });

  it("finds Roboto as most popular", () => {
    const font = getFont("roboto");
    expect(font).not.toBeNull();
    expect(font!.popularityRank).toBe(1);
  });

  it("returns null for unknown slug", () => {
    expect(getFont("nonexistent-font")).toBeNull();
  });

  it("includes all expected fields", () => {
    const font = getFont("fira-code");
    expect(font).not.toBeNull();
    expect(font!.slug).toBe("fira-code");
    expect(font!.category).toBe("monospace");
    expect(font!.variants).toContain("regular");
    expect(font!.subsets).toContain("latin");
    expect(font!.version).toBeTruthy();
    expect(font!.lastModified).toBeTruthy();
    expect(font!.bestFor).toContain("code");
    expect(font!.similarFonts.length).toBeGreaterThan(0);
  });
});

// ---------------------------------------------------------------------------
// Data: search
// ---------------------------------------------------------------------------
describe("search", () => {
  it("finds mono fonts", () => {
    const results = search("mono");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((f) => f.slug === "roboto-mono")).toBe(true);
  });

  it("is case-insensitive", () => {
    const upper = search("INTER");
    const lower = search("inter");
    expect(upper.length).toBe(lower.length);
  });

  it("respects limit", () => {
    const results = search("r", 3);
    expect(results.length).toBeLessThanOrEqual(3);
  });

  it("returns empty for no match", () => {
    expect(search("zzzznotafont")).toEqual([]);
  });
});

// ---------------------------------------------------------------------------
// Data: byCategory
// ---------------------------------------------------------------------------
describe("byCategory", () => {
  it("finds sans-serif fonts", () => {
    const results = byCategory("sans-serif");
    expect(results.length).toBeGreaterThan(10);
    expect(results.every((f) => f.category === "sans-serif")).toBe(true);
  });

  it("finds monospace fonts", () => {
    const results = byCategory("monospace");
    expect(results.length).toBeGreaterThan(0);
    expect(results.some((f) => f.slug === "fira-code")).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Data: popular
// ---------------------------------------------------------------------------
describe("popular", () => {
  it("returns fonts sorted by popularity", () => {
    const top5 = popular(5);
    expect(top5).toHaveLength(5);
    expect(top5[0].slug).toBe("roboto");
    for (let i = 1; i < top5.length; i++) {
      expect(top5[i].popularityRank).toBeGreaterThan(top5[i - 1].popularityRank);
    }
  });
});

// ---------------------------------------------------------------------------
// Data: allFonts & fontCount
// ---------------------------------------------------------------------------
describe("allFonts & fontCount", () => {
  it("returns all 50 fonts", () => {
    expect(allFonts()).toHaveLength(50);
    expect(fontCount()).toBe(50);
  });

  it("returns a copy (not the internal array)", () => {
    const a = allFonts();
    const b = allFonts();
    expect(a).not.toBe(b);
    expect(a).toEqual(b);
  });
});

// ---------------------------------------------------------------------------
// Stacks
// ---------------------------------------------------------------------------
describe("getStack", () => {
  it("finds system-ui stack", () => {
    const stack = getStack("system-ui");
    expect(stack).not.toBeNull();
    expect(stack!.name).toBe("System UI");
    expect(stack!.stack).toContain("system-ui");
    expect(stack!.stack).toContain("-apple-system");
  });

  it("finds monospace-code stack", () => {
    const stack = getStack("monospace-code");
    expect(stack).not.toBeNull();
    expect(stack!.stack).toContain("ui-monospace");
  });

  it("returns null for unknown slug", () => {
    expect(getStack("nonexistent")).toBeNull();
  });
});

describe("FONT_STACKS", () => {
  it("has 10 stacks", () => {
    expect(FONT_STACKS).toHaveLength(10);
  });

  it("all stacks have required fields", () => {
    for (const stack of FONT_STACKS) {
      expect(stack.slug).toBeTruthy();
      expect(stack.name).toBeTruthy();
      expect(stack.description).toBeTruthy();
      expect(stack.stack).toBeTruthy();
    }
  });
});

// ---------------------------------------------------------------------------
// Pairings
// ---------------------------------------------------------------------------
describe("PAIRINGS", () => {
  it("has 15 pairings", () => {
    expect(PAIRINGS).toHaveLength(15);
  });

  it("all pairings have required fields", () => {
    for (const p of PAIRINGS) {
      expect(p.heading).toBeTruthy();
      expect(p.body).toBeTruthy();
      expect(p.rationale).toBeTruthy();
      expect(p.score).toBeGreaterThanOrEqual(1);
      expect(p.score).toBeLessThanOrEqual(10);
      expect(p.useCases.length).toBeGreaterThan(0);
      expect(p.mood).toBeTruthy();
    }
  });
});

describe("getPairingsFor", () => {
  it("finds pairings for Inter", () => {
    const pairings = getPairingsFor("inter");
    expect(pairings.length).toBeGreaterThanOrEqual(3);
    expect(pairings.every((p) => p.heading === "inter" || p.body === "inter")).toBe(true);
  });

  it("returns empty for font with no pairings", () => {
    expect(getPairingsFor("nonexistent")).toEqual([]);
  });
});

describe("featuredPairings", () => {
  it("returns only score >= 8", () => {
    const featured = featuredPairings();
    expect(featured.length).toBeGreaterThan(5);
    expect(featured.every((p) => p.score >= 8)).toBe(true);
  });
});

// ---------------------------------------------------------------------------
// Utils: parseVariants
// ---------------------------------------------------------------------------
describe("parseVariants", () => {
  it("parses mixed variants", () => {
    const [weights, hasItalic] = parseVariants([
      "100",
      "regular",
      "700",
      "italic",
      "700italic",
    ]);
    expect(weights).toEqual([100, 400, 700]);
    expect(hasItalic).toBe(true);
  });

  it("handles no italic", () => {
    const [weights, hasItalic] = parseVariants(["300", "regular", "700"]);
    expect(weights).toEqual([300, 400, 700]);
    expect(hasItalic).toBe(false);
  });

  it("handles only italic", () => {
    const [weights, hasItalic] = parseVariants(["italic"]);
    expect(weights).toEqual([400]);
    expect(hasItalic).toBe(true);
  });

  it("handles empty array", () => {
    const [weights, hasItalic] = parseVariants([]);
    expect(weights).toEqual([]);
    expect(hasItalic).toBe(false);
  });
});

// ---------------------------------------------------------------------------
// Utils: weightName
// ---------------------------------------------------------------------------
describe("weightName", () => {
  it("maps standard weights", () => {
    expect(weightName(400)).toBe("Regular");
    expect(weightName(700)).toBe("Bold");
    expect(weightName(100)).toBe("Thin");
    expect(weightName(900)).toBe("Black");
  });

  it("returns string for unknown weight", () => {
    expect(weightName(450)).toBe("450");
  });
});

// ---------------------------------------------------------------------------
// Utils: cssFamily
// ---------------------------------------------------------------------------
describe("cssFamily", () => {
  it("generates sans-serif family", () => {
    expect(cssFamily("Inter", "sans-serif")).toBe("'Inter', sans-serif");
  });

  it("generates monospace family", () => {
    expect(cssFamily("Roboto Mono", "monospace")).toBe("'Roboto Mono', monospace");
  });

  it("falls back to sans-serif for unknown category", () => {
    expect(cssFamily("Custom", "unknown")).toBe("'Custom', sans-serif");
  });
});

// ---------------------------------------------------------------------------
// Utils: googleFontsUrl
// ---------------------------------------------------------------------------
describe("googleFontsUrl", () => {
  it("generates URL with weights", () => {
    const url = googleFontsUrl("Inter", [400, 700]);
    expect(url).toBe(
      "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap",
    );
  });

  it("generates URL without weights", () => {
    const url = googleFontsUrl("Roboto");
    expect(url).toBe("https://fonts.googleapis.com/css2?family=Roboto&display=swap");
  });

  it("handles multi-word font names", () => {
    const url = googleFontsUrl("Open Sans", [400]);
    expect(url).toContain("family=Open+Sans");
  });

  it("sorts weights", () => {
    const url = googleFontsUrl("Inter", [700, 400, 300]);
    expect(url).toContain("wght@300;400;700");
  });
});

// ---------------------------------------------------------------------------
// Utils: googleFontsLink
// ---------------------------------------------------------------------------
describe("googleFontsLink", () => {
  it("generates HTML link tag", () => {
    const link = googleFontsLink("Inter", [400, 700]);
    expect(link).toContain("<link");
    expect(link).toContain('rel="stylesheet"');
    expect(link).toContain("fonts.googleapis.com");
    expect(link).toContain("Inter");
  });
});

// ---------------------------------------------------------------------------
// Utils: googleDownloadUrl
// ---------------------------------------------------------------------------
describe("googleDownloadUrl", () => {
  it("generates download URL", () => {
    expect(googleDownloadUrl("Inter")).toBe(
      "https://fonts.google.com/download?family=Inter",
    );
  });
});

// ---------------------------------------------------------------------------
// Constants
// ---------------------------------------------------------------------------
describe("WEIGHT_NAMES", () => {
  it("has 9 standard weights", () => {
    expect(Object.keys(WEIGHT_NAMES)).toHaveLength(9);
  });
});

describe("CATEGORY_FALLBACKS", () => {
  it("covers all 5 categories", () => {
    expect(Object.keys(CATEGORY_FALLBACKS)).toHaveLength(5);
    expect(CATEGORY_FALLBACKS["sans-serif"]).toBe("sans-serif");
    expect(CATEGORY_FALLBACKS["monospace"]).toBe("monospace");
  });
});
