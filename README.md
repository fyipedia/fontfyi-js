# fontfyi -- Google Fonts Metadata, CSS Generation & Font Pairing Toolkit

[![npm](https://img.shields.io/npm/v/fontfyi)](https://www.npmjs.com/package/fontfyi)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)

Pure TypeScript toolkit for working with **Google Fonts**. Access metadata for [50 popular fonts](https://fontfyi.com/fonts/), generate CSS import URLs and `<link>` tags, browse [15 curated font pairings](https://fontfyi.com/pairings/), and use [10 system font stack presets](https://fontfyi.com/font-stacks/).

**Zero runtime dependencies.** Works in Node.js, Deno, Bun, and browsers.

> Explore fonts interactively at [fontfyi.com](https://fontfyi.com) -- [font explorer](https://fontfyi.com/fonts/), [font pairings](https://fontfyi.com/pairings/), [font stacks](https://fontfyi.com/font-stacks/), and [developer API](https://fontfyi.com/developers/).

## Install

```bash
npm install fontfyi
```

## Quick Start

```ts
import { fontInfo, fontCSS, fontPairings, fontStacks } from "fontfyi";

// Look up a font
const font = fontInfo("inter");
console.log(font?.family);    // "Inter"
console.log(font?.category);  // "sans-serif"
console.log(font?.designer);  // "Rasmus Andersson"

// Generate CSS
const css = fontCSS("inter", [400, 700]);
console.log(css?.importUrl);
// "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"
console.log(css?.linkTag);
// '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap">'
console.log(css?.fontFamily);
// "'Inter', sans-serif"

// Font pairings
const pairs = fontPairings("inter");
for (const p of pairs) {
  console.log(`${p.heading} + ${p.body} (${p.mood})`);
}

// Font stacks
const stacks = fontStacks();
console.log(stacks[0].name);   // "System UI"
console.log(stacks[0].stack);  // "system-ui, -apple-system, ..."
```

## Features

### Font Metadata

Access detailed metadata for [50 popular Google Fonts](https://fontfyi.com/fonts/), including family name, category, weights, subsets, designer, popularity rank, recommended use cases, and similar fonts.

```ts
import { fontInfo, fontSearch, popularFonts, byCategory, allFonts } from "fontfyi";

// Look up by slug
const inter = fontInfo("inter");
console.log(inter?.variants);       // ["100", "200", ..., "900"]
console.log(inter?.subsets);        // ["cyrillic", "greek", "latin", ...]
console.log(inter?.bestFor);        // ["ui", "web-app", "dashboard", ...]
console.log(inter?.similarFonts);   // ["roboto", "dm-sans", ...]

// Search by name
const results = fontSearch("mono");
// Roboto Mono, IBM Plex Mono, JetBrains Mono, ...

// Top fonts by popularity
const top10 = popularFonts(10);
console.log(top10[0].family);  // "Roboto"

// Filter by category
const serifs = byCategory("serif");
const monos = byCategory("monospace");

// Get all 50 fonts
const all = allFonts();
```

### CSS Generation

Generate [Google Fonts import URLs](https://fontfyi.com/developers/), HTML `<link>` tags, and `font-family` declarations.

```ts
import { fontCSS, googleFontsUrl, googleFontsLink, cssFamily } from "fontfyi";

// High-level: get everything at once
const css = fontCSS("roboto-mono", [400, 700]);
console.log(css?.importUrl);   // Google Fonts CSS URL
console.log(css?.linkTag);     // <link rel="stylesheet" href="...">
console.log(css?.fontFamily);  // "'Roboto Mono', monospace"

// Low-level utilities
googleFontsUrl("Inter", [400, 700]);
// "https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap"

googleFontsLink("Inter", [400, 700]);
// '<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap">'

cssFamily("Inter", "sans-serif");  // "'Inter', sans-serif"
```

### Font Pairings

Browse [15 curated heading + body font pairings](https://fontfyi.com/pairings/) with design rationale, quality scores, use cases, and mood classification.

```ts
import { fontPairings, PAIRINGS, featuredPairings } from "fontfyi";

// Pairings for a specific font
const pairs = fontPairings("inter");
for (const p of pairs) {
  console.log(`${p.heading} + ${p.body}`);
  console.log(`  Score: ${p.score}/10`);
  console.log(`  Mood: ${p.mood}`);
  console.log(`  Use cases: ${p.useCases.join(", ")}`);
  console.log(`  ${p.rationale}`);
}

// All 15 pairings
console.log(PAIRINGS.length);  // 15

// Only high-quality pairings (score >= 8)
const best = featuredPairings();
```

### Font Stacks

Use [10 system font stack presets](https://fontfyi.com/font-stacks/) for CSS `font-family` declarations without loading external fonts.

```ts
import { fontStacks, getStack, FONT_STACKS } from "fontfyi";

// Get all stacks
const stacks = fontStacks();

// Look up by slug
const code = getStack("monospace-code");
console.log(code?.stack);
// "ui-monospace, 'Cascadia Code', 'Source Code Pro', Menlo, Consolas, 'DejaVu Sans Mono', monospace"

// Available stacks: system-ui, transitional, old-style, humanist,
// geometric-humanist, neo-grotesque, monospace-slab, monospace-code,
// industrial, rounded
```

### Weight Parsing

Parse Google Fonts variant strings into numeric weights.

```ts
import { parseVariants, weightName } from "fontfyi";

const [weights, hasItalic] = parseVariants(["100", "regular", "700", "italic", "700italic"]);
console.log(weights);    // [100, 400, 700]
console.log(hasItalic);  // true

weightName(400);  // "Regular"
weightName(700);  // "Bold"
```

## API Reference

### Engine Functions

| Function | Description |
|----------|-------------|
| [`fontInfo(slug)`](https://fontfyi.com/fonts/) | Get font metadata by slug |
| [`fontSearch(query, limit?)`](https://fontfyi.com/fonts/) | Search fonts by name |
| [`fontCSS(slug, weights?)`](https://fontfyi.com/fonts/inter/) | Generate CSS import snippet |
| [`fontPairings(slug)`](https://fontfyi.com/pairings/) | Get pairing recommendations |
| [`fontStacks()`](https://fontfyi.com/font-stacks/) | Get all 10 font stack presets |
| [`popularFonts(limit?)`](https://fontfyi.com/fonts/) | Get top fonts by popularity |

### Data Functions

| Function | Description |
|----------|-------------|
| [`getFont(slug)`](https://fontfyi.com/fonts/) | Look up font by slug |
| [`search(query, limit?)`](https://fontfyi.com/fonts/) | Search fonts by family name |
| [`byCategory(category)`](https://fontfyi.com/fonts/) | Filter fonts by CSS category |
| [`popular(limit?)`](https://fontfyi.com/fonts/) | Get fonts sorted by popularity |
| [`allFonts()`](https://fontfyi.com/fonts/) | Get all 50 fonts |
| `fontCount()` | Get total font count |

### CSS Utilities

| Function | Description |
|----------|-------------|
| [`googleFontsUrl(family, weights?)`](https://fontfyi.com/fonts/inter/) | Google Fonts CSS import URL |
| `googleFontsLink(family, weights?)` | HTML `<link>` tag |
| `googleDownloadUrl(family)` | Google Fonts download URL |
| `cssFamily(family, category)` | CSS `font-family` with fallback |
| `parseVariants(variants)` | Parse variant strings to weights |
| `weightName(weight)` | Numeric weight to name (e.g. `400` -> `"Regular"`) |

### Stack & Pairing Functions

| Function | Description |
|----------|-------------|
| [`getStack(slug)`](https://fontfyi.com/font-stacks/) | Look up font stack by slug |
| [`getPairingsFor(slug)`](https://fontfyi.com/pairings/) | Get pairings for a font |
| [`featuredPairings()`](https://fontfyi.com/pairings/) | Get pairings with score >= 8 |

### Constants

| Constant | Description |
|----------|-------------|
| [`FONT_STACKS`](https://fontfyi.com/font-stacks/) | Array of 10 font stack presets |
| [`PAIRINGS`](https://fontfyi.com/pairings/) | Array of 15 font pairings |
| `WEIGHT_NAMES` | Map of numeric weights to names |
| `CATEGORY_FALLBACKS` | Map of categories to CSS fallbacks |

## Types

```ts
interface FontInfo {
  slug: string;
  family: string;
  category: string;
  subcategory: string;
  variants: string[];
  subsets: string[];
  version: string;
  lastModified: string;
  designer: string;
  popularityRank: number;
  bestFor: string[];
  similarFonts: string[];
}

interface FontStack {
  slug: string;
  name: string;
  description: string;
  stack: string;
}

interface FontPairing {
  heading: string;
  body: string;
  rationale: string;
  score: number;
  useCases: string[];
  mood: string;
}

interface FontCSSResult {
  importUrl: string;
  linkTag: string;
  fontFamily: string;
}
```

## Data Coverage

- **50 Google Fonts** -- the most popular fonts by usage, spanning sans-serif, serif, monospace, display, and handwriting categories
- **15 Font Pairings** -- curated heading + body combinations with design rationale
- **10 Font Stacks** -- system font stack presets for every use case
- **Zero dependencies** -- pure TypeScript, ESM-only, full type declarations

Browse the full collection at [fontfyi.com/fonts/](https://fontfyi.com/fonts/).

## FYIPedia Developer Tools

Part of the [FYIPedia](https://fyipedia.com/) open-source developer tools ecosystem:

| Package | npm | Description |
|---------|-----|-------------|
| [colorfyi](https://colorfyi.com/) | `npm i colorfyi` | [Hex to RGB converter](https://colorfyi.com/tools/converter/), [WCAG contrast checker](https://colorfyi.com/tools/contrast-checker/), [color harmonies](https://colorfyi.com/tools/palette-generator/) |
| [emojifyi](https://emojifyi.com/) | `npm i emojifyi` | [Emoji encoding](https://emojifyi.com/developers/) & metadata for 3,781 Unicode emojis |
| [symbolfyi](https://symbolfyi.com/) | `npm i symbolfyi` | [Symbol encoder](https://symbolfyi.com/developers/) -- 11 encoding formats for any character |
| [unicodefyi](https://unicodefyi.com/) | `npm i unicodefyi` | [Unicode character lookup](https://unicodefyi.com/developers/) -- 17 encodings + character search |
| **fontfyi** | `npm i fontfyi` | [Google Fonts explorer](https://fontfyi.com/developers/) -- metadata, CSS helpers, font pairings |

## Links

- [Font Explorer](https://fontfyi.com/fonts/) -- Browse all Google Fonts
- [Font Pairings](https://fontfyi.com/pairings/) -- Curated heading + body combinations
- [Font Stacks](https://fontfyi.com/font-stacks/) -- CSS-ready font stack presets
- [REST API Documentation](https://fontfyi.com/developers/) -- Free API with OpenAPI spec
- [Python Package](https://pypi.org/project/fontfyi/) -- `pip install fontfyi`
- [Source Code](https://github.com/fyipedia/fontfyi-js) -- MIT licensed

## License

MIT
