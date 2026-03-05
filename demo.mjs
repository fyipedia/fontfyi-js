import { fontInfo, fontCSS, fontPairings } from './dist/index.js'

const C = { r: '\x1b[0m', b: '\x1b[1m', d: '\x1b[2m', y: '\x1b[33m', g: '\x1b[32m', c: '\x1b[36m' }

// 1. Font metadata
const inter = fontInfo('inter')
console.log(`${C.b}${C.y}Font: ${inter.family}${C.r}`)
console.log(`  ${C.c}Category  ${C.r} ${C.g}${inter.category}${C.r} ${C.d}(${inter.subcategory})${C.r}`)
console.log(`  ${C.c}Designer  ${C.r} ${C.g}${inter.designer}${C.r}`)
console.log(`  ${C.c}Popularity${C.r} ${C.g}#${inter.popularityRank}${C.r}`)
console.log(`  ${C.c}Weights   ${C.r} ${C.g}${inter.variants.join(', ')}${C.r}`)
console.log(`  ${C.c}Best for  ${C.r} ${C.g}${inter.bestFor.join(', ')}${C.r}`)

console.log()

// 2. CSS integration
const css = fontCSS('roboto', [400, 700])
console.log(`${C.b}${C.y}CSS: Roboto (400, 700)${C.r}`)
console.log(`  ${C.c}Link tag   ${C.r} ${C.g}${css.linkTag}${C.r}`)
console.log(`  ${C.c}font-family${C.r} ${C.g}${css.fontFamily}${C.r}`)

console.log()

// 3. Pairings
const pairings = fontPairings('inter')
console.log(`${C.b}${C.y}Pairings for Inter${C.r}`)
for (const p of pairings.slice(0, 3)) {
  const pair = p.heading === 'inter' ? `${p.body}` : `${p.heading}`
  console.log(`  ${C.g}${pair}${C.r}  ${C.c}${p.score}/10${C.r}  ${C.d}${p.mood} — ${p.useCases.join(', ')}${C.r}`)
}
