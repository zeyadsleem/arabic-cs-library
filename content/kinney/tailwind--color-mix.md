---
title: "color-mix()"
lang: en
source: "https://stevekinney.com/courses/tailwind/color-mix"
---

`color-mix()` is a CSS function for blending colors. Tailwind 4 uses it internally for all opacity modifiers.

## How It Works

Basic syntax:

```css
color-mix(in srgb, red 50%, blue 50%)
/* Results in purple */
```

## Tailwind’s Opacity Modifiers

When you use opacity syntax like `/50`:

*Tailwind's Opacity Modifiers — Example 1 — [Open example](https://stevekinney.com/generated/playgrounds/0c8f3eec48365071115d74618d544fa77f81ecc6280e8deaa72d9473dfd82112.html)*

```html
<div class="bg-blue-500/50"></div>
```

Tailwind generates:

```css
background-color: color-mix(in srgb, var(--color-blue-500) 50%, transparent);
```

- Works with any color value
- Supports CSS variables
- Handles `currentColor`
- Better performance

## All Color Properties Support It

*All Color Properties Support It — Example 2 — [Open example](https://stevekinney.com/generated/playgrounds/5ea2ab76cdf1d9dd86a80b3144d5981a76b85f6975d836d80f928e9dfcd87ba1.html)*

```html
<!-- Text with opacity -->
<p class="text-red-600/75">75% opacity text</p>

<!-- Border with opacity -->
<div class="border-2 border-green-500/30">30% opacity border</div>

<!-- Shadow with opacity -->
<div class="shadow-lg shadow-purple-500/40">40% opacity shadow</div>

<!-- CurrentColor with opacity -->
<div class="border border-current/50 text-blue-600">50% current color</div>
```

## Direct Usage in Custom CSS

Use `color-mix()` in your own styles:

```css
.custom-bg {
  /* Mix brand colors */
  background: color-mix(in oklch, var(--color-primary) 70%, var(--color-secondary) 30%);
}

.hover-state {
  /* Lighten on hover */
  background: color-mix(in srgb, var(--color-brand) 80%, white 20%);
}
```

## In Arbitrary Values

*In Arbitrary Values — Example 3 — [Open example](https://stevekinney.com/generated/playgrounds/8bb5ddd20f219abb76fcede0796c73e635e975bc564828f4134e750134b96aa1.html)*

```html
<!-- Custom color mixing -->
<div class="bg-[color-mix(in_srgb,theme(colors.blue.500)_60%,white)]">Custom mixed background</div>
```

## Color Spaces

`color-mix()` supports different color spaces:

```css
/* sRGB - Standard */
color-mix(in srgb, red, blue)

/* OKLCH - Perceptually uniform */
color-mix(in oklch, red, blue)

/* HSL - Hue based */
color-mix(in hsl, red, blue)
```

Tailwind uses `srgb` by default for compatibility.

## Practical Examples

### Tinted Backgrounds

*Tinted Backgrounds — Example 4 — [Open example](https://stevekinney.com/generated/playgrounds/2a3f2eb98ffe44a5f4e536b246ab9026742ba3dbe2e1b27167c820ac9f24c881.html)*

```html
<div class="bg-blue-500/10">Very light blue tint</div>
```

### Hover States

*Hover States — Example 5 — [Open example](https://stevekinney.com/generated/playgrounds/bf300387c3a3ecb2684b58a2b9c746c98294e64da342aa2d69b6a38fd76a593a.html)*

```html
<button class="bg-purple-600 hover:bg-purple-600/80">Hover for transparency</button>
```

### Layered Effects

*Layered Effects — Example 6 — [Open example](https://stevekinney.com/generated/playgrounds/2f0528a3106675f30d4099e670a024097047ee43c27016c6008c2a280a72685f.html)*

```html
<div class="bg-gradient-to-r from-red-500/50 to-blue-500/50">Semi-transparent gradient</div>
```

## Browser Support

- Chrome 111+
- Safari 16.4+
- Firefox 113+
