---
title: "Before & After Pseudo-Selectors"
lang: en
source: "https://stevekinney.com/courses/tailwind/before-and-after-pseudo-selectors"
---

## Basic Usage

Prefix any utility with `before:` or `after:` to style pseudo-elements:

*Basic Usage — Example 1 — [Open example](https://stevekinney.com/generated/playgrounds/d88733856070747c8ac6f8d7eaae139fd313ef75207a99a5670949e00087de2c.html)*

```html
<div class="before:block before:h-px before:bg-gray-300 before:content-['']">Decorated text</div>
```

### Automatic Empty Content

Tailwind adds `content: ''` by default when using these variants.

## Setting Content

### Text Content

*Text Content — Example 2 — [Open example](https://stevekinney.com/generated/playgrounds/40cdfd9e281afc7e6825f83edb3ba4ab1545c8d4d7bdf5073fcc83d35dc0277b.html)*

```html
<span class="before:mr-2 before:content-['→']">Next</span>
<span class="after:text-red-500 after:content-['*']">Required</span>
```

### Spaces

Use underscores (converted to spaces):

*Spaces — Example 3 — [Open example](https://stevekinney.com/generated/playgrounds/b0f36e83b4651d1d7336d7bdb9c7dfcce448eb41c078075094da9ab6b5c17976.html)*

```html
<div class="before:content-['Hello_world']"></div>
```

### Literal Underscore

Escape with backslash:

*Literal Underscore — Example 4 — [Open example](https://stevekinney.com/generated/playgrounds/ba1292ab4f720952473b021f1258a290595baeada8beb14689457325498213e8.html)*

```html
<div class="before:content-['snake\_case']"></div>
```

### Attribute Values

*Attribute Values — Example 5 — [Open example](https://stevekinney.com/generated/playgrounds/91ea86dded975987c1c3c4cf9ac7bb35405e64ebb908a7170d7f09cfc9d64907.html)*

```html
<div data-label="Status" class="before:content-[attr(data-label)]">...</div>
```

### CSS Variables

```css
:root {
  --label: 'Status';
}
```

*CSS Variables — Example 6 — [Open example](https://stevekinney.com/generated/playgrounds/2942481221914fbfcf5c237c08673f4b24c884740158050add17eb41ee0261ff.html)[CSS](#playground-css-label)*

```html
<div class="before:content-[var(--label)]">...</div>
```

## When to Use Pseudo-Elements

**Prefer real elements** for most cases:

*When to Use Pseudo-Elements — Example 7 — [Open example](https://stevekinney.com/generated/playgrounds/df0110a8a60b9f12f66a05b7392f80c7f6fcd9ce052ca22c988491bf4cbfca76.html)*

```html
<!-- Better -->
<span class="inline-block h-px w-full bg-gray-300"></span>

<!-- Only when semantic markup matters -->
<div class="before:block before:h-px before:bg-gray-300 before:content-['']">...</div>
```

Use pseudo-elements when:

- Content shouldn’t be selectable
- Content is purely decorative
- You need to avoid affecting document flow

## Composability

Stack with other variants:

*Composability — Example 8 — [Open example](https://stevekinney.com/generated/playgrounds/daf338bf755de10e80240e11538b14e5a6f5fda38356041389b52e49d4645352.html)*

```html
<button class="before:opacity-0 before:content-['→'] hover:before:opacity-100">Hover me</button>
```
