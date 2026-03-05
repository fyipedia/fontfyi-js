# fontfyi

[![npm](https://img.shields.io/npm/v/fontfyi)](https://www.npmjs.com/package/fontfyi)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Zero Dependencies](https://img.shields.io/badge/dependencies-0-brightgreen)](https://www.npmjs.com/package/fontfyi)

Pure TypeScript toolkit for working with **Google Fonts**. Access metadata for [50 popular fonts](https://fontfyi.com/fonts/), generate CSS import URLs and `<link>` tags, browse [15 curated font pairings](https://fontfyi.com/pairings/), and use [10 system font stack presets](https://fontfyi.com/tools/font-stack/).

**Zero runtime dependencies.** Works in Node.js, Deno, Bun, and browsers.

> Explore fonts interactively at [fontfyi.com](https://fontfyi.com) -- [font explorer](https://fontfyi.com/fonts/), [font pairings](https://fontfyi.com/pairings/), [font stacks](https://fontfyi.com/tools/font-stack/), and [developer API](https://fontfyi.com/developers/).

<p align="center">
  <img src="demo.gif" alt="fontfyi demo — Google Fonts metadata and CSS generation" width="800">
</p>

## Table of Contents

- [Install](#install)
- [Quick Start](#quick-start)
- [What You Can Do](#what-you-can-do)
  - [Font Metadata](#font-metadata)
  - [CSS Generation](#css-generation)
  - [Font Pairings](#font-pairings)
  - [Font Stacks](#font-stacks)
  - [Weight Parsing](#weight-parsing)
- [API Reference](#api-reference)
- [Types](#types)
- [Data Coverage](#data-coverage)
- [Learn More About Fonts](#learn-more-about-fonts)
- [Also Available for Python](#also-available-for-python)
- [FYIPedia Developer Tools](#fyipedia-developer-tools)
- [License](#license)

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

## What You Can Do

### Font Metadata

[Google Fonts](https://fonts.google.com/) hosts over 1,600 font families, but choosing the right one for your project can be overwhelming. This package bundles curated metadata for the **50 most popular Google Fonts** -- the fonts that power the majority of the web.

Each font entry includes family name, CSS category (serif, sans-serif, monospace, display, handwriting), available weights, supported character subsets (Latin, Cyrillic, Greek, etc.), designer name, popularity rank, recommended use cases, and similar font suggestions.

| Category | Fonts | Examples |
|----------|-------|---------|
| **Sans-serif** | 20 | Inter, Roboto, Open Sans, Lato, Montserrat |
| **Serif** | 10 | Merriweather, Playfair Display, Lora, PT Serif |
| **Monospace** | 8 | Roboto Mono, JetBrains Mono, IBM Plex Mono, Fira Code |
| **Display** | 8 | Oswald, Bebas Neue, Abril Fatface, Righteous |
| **Handwriting** | 4 | Dancing Script, Pacifico, Caveat, Sacramento |

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

Learn more: [Font Explorer](https://fontfyi.com/fonts/) · [Font Categories](https://fontfyi.com/category/) · [REST API Docs](https://fontfyi.com/developers/)

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

Learn more: [CSS Generator Tool](https://fontfyi.com/tools/css/) · [Google Fonts API](https://developers.google.com/fonts/docs/css2)

### Font Pairings

Typography pairing is both an art and a science. A well-chosen heading + body font combination creates visual hierarchy, reinforces brand identity, and improves readability. Browse [15 curated heading + body font pairings](https://fontfyi.com/pairings/) with design rationale, quality scores, use cases, and mood classification.

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

Learn more: [Font Pairing Tool](https://fontfyi.com/pairings/) · [Typography Glossary](https://fontfyi.com/glossary/)

### Font Stacks

Use [10 system font stack presets](https://fontfyi.com/tools/font-stack/) for CSS `font-family` declarations without loading external fonts.

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

Learn more: [Font Stack Presets](https://fontfyi.com/tools/font-stack/) · [System Font Stacks](https://modernfontstacks.com/)

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
| [`fontCSS(slug, weights?)`](https://fontfyi.com/font/inter/) | Generate CSS import snippet |
| [`fontPairings(slug)`](https://fontfyi.com/pairings/) | Get pairing recommendations |
| [`fontStacks()`](https://fontfyi.com/tools/font-stack/) | Get all 10 font stack presets |
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
| [`googleFontsUrl(family, weights?)`](https://fontfyi.com/font/inter/) | Google Fonts CSS import URL |
| `googleFontsLink(family, weights?)` | HTML `<link>` tag |
| `googleDownloadUrl(family)` | Google Fonts download URL |
| `cssFamily(family, category)` | CSS `font-family` with fallback |
| `parseVariants(variants)` | Parse variant strings to weights |
| `weightName(weight)` | Numeric weight to name (e.g. `400` -> `"Regular"`) |

### Stack & Pairing Functions

| Function | Description |
|----------|-------------|
| [`getStack(slug)`](https://fontfyi.com/tools/font-stack/) | Look up font stack by slug |
| [`getPairingsFor(slug)`](https://fontfyi.com/pairings/) | Get pairings for a font |
| [`featuredPairings()`](https://fontfyi.com/pairings/) | Get pairings with score >= 8 |

### Constants

| Constant | Description |
|----------|-------------|
| [`FONT_STACKS`](https://fontfyi.com/tools/font-stack/) | Array of 10 font stack presets |
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

## Learn More About Fonts

- **Browse**: [Google Fonts](https://fontfyi.com/) · [Font Search](https://fontfyi.com/search/) · [Categories](https://fontfyi.com/category/)
- **Tools**: [Font Pairing](https://fontfyi.com/tools/pairing/) · [CSS Generator](https://fontfyi.com/tools/css/)
- **API**: [REST API Docs](https://fontfyi.com/developers/) · [OpenAPI Spec](https://fontfyi.com/api/openapi.json)
- **Python**: [PyPI Package](https://pypi.org/project/fontfyi/)

## Also Available for Python

```bash
pip install fontfyi
```

See the [Python package on PyPI](https://pypi.org/project/fontfyi/).

## FYIPedia Developer Tools

Part of the [FYIPedia](https://fyipedia.com) open-source developer tools ecosystem.

| Package | PyPI | npm | Description |
|---------|------|-----|-------------|
| colorfyi | [PyPI](https://pypi.org/project/colorfyi/) | [npm](https://www.npmjs.com/package/@fyipedia/colorfyi) | Color conversion, WCAG contrast, harmonies -- [colorfyi.com](https://colorfyi.com/) |
| emojifyi | [PyPI](https://pypi.org/project/emojifyi/) | [npm](https://www.npmjs.com/package/emojifyi) | Emoji encoding & metadata for 3,953 emojis -- [emojifyi.com](https://emojifyi.com/) |
| symbolfyi | [PyPI](https://pypi.org/project/symbolfyi/) | [npm](https://www.npmjs.com/package/symbolfyi) | Symbol encoding in 11 formats -- [symbolfyi.com](https://symbolfyi.com/) |
| unicodefyi | [PyPI](https://pypi.org/project/unicodefyi/) | [npm](https://www.npmjs.com/package/unicodefyi) | Unicode lookup with 17 encodings -- [unicodefyi.com](https://unicodefyi.com/) |
| **fontfyi** | [PyPI](https://pypi.org/project/fontfyi/) | [npm](https://www.npmjs.com/package/fontfyi) | Google Fonts metadata & CSS -- [fontfyi.com](https://fontfyi.com/) |
| distancefyi | [PyPI](https://pypi.org/project/distancefyi/) | [npm](https://www.npmjs.com/package/distancefyi) | Haversine distance & travel times -- [distancefyi.com](https://distancefyi.com/) |
| timefyi | [PyPI](https://pypi.org/project/timefyi/) | [npm](https://www.npmjs.com/package/timefyi) | Timezone ops & business hours -- [timefyi.com](https://timefyi.com/) |
| namefyi | [PyPI](https://pypi.org/project/namefyi/) | [npm](https://www.npmjs.com/package/namefyi) | Korean romanization & Five Elements -- [namefyi.com](https://namefyi.com/) |
| unitfyi | [PyPI](https://pypi.org/project/unitfyi/) | [npm](https://www.npmjs.com/package/unitfyi) | Unit conversion, 220 units -- [unitfyi.com](https://unitfyi.com/) |
| holidayfyi | [PyPI](https://pypi.org/project/holidayfyi/) | [npm](https://www.npmjs.com/package/holidayfyi) | Holiday dates & Easter calculation -- [holidayfyi.com](https://holidayfyi.com/) |
| cocktailfyi | [PyPI](https://pypi.org/project/cocktailfyi/) | -- | Cocktail ABV, calories, flavor -- [cocktailfyi.com](https://cocktailfyi.com/) |
| fyipedia | [PyPI](https://pypi.org/project/fyipedia/) | -- | Unified CLI: `fyi color info FF6B35` -- [fyipedia.com](https://fyipedia.com/) |
| fyipedia-mcp | [PyPI](https://pypi.org/project/fyipedia-mcp/) | -- | Unified MCP hub for AI assistants -- [fyipedia.com](https://fyipedia.com/) |

## License

MIT
