---
title: "CSS Variable Integration"
lang: "en"
chapter: "tailwind"
slug: "colors-and-css-variables"
order: 30
source: "https://stevekinney.com/courses/tailwind/colors-and-css-variables"
---

Tailwind moves configuration from JavaScript to CSS using the `@theme` directive and CSS variables.

## Defining Custom Colors

Add colors in your CSS file using `@theme`:

```css
@import 'tailwindcss';

@theme {
  --color-brand: #5b21b6;
  --color-neon-pink: oklch(71.7% 0.25 360);
  --color-neon-lime: oklch(91.5% 0.258 129);
}
```

This generates utilities like `bg-brand`, `text-neon-pink`, etc.

## Overriding Default Colors

Replace specific colors:

```css
@theme {
  --color-blue-500: #1e40af; /* Override default blue-500 */
}
```

Clear entire color groups:

```css
@theme {
  --color-gray-*: initial; /* Remove all default grays */
  --color-gray-50: #f8fafc;
  --color-gray-100: #f1f5f9;
  /* Define your custom grays */
}
```

Start from scratch:

```css
@import 'tailwindcss/preflight';
@import 'tailwindcss/utilities';

@theme {
  --color-*: initial; /* Remove ALL defaults */
  /* Define your entire palette */
}
```

## Using Colors as CSS Variables

Theme colors are exposed as CSS variables:

### In Custom CSS

```css
.custom-element {
  background: var(--color-brand);
  border-color: var(--color-neon-pink);
}
```

### In Arbitrary Values

*In Arbitrary Values — Example 1 — [Open example](https://stevekinney.com/generated/playgrounds/d5c13ff05aa9a0a53809fa2fd70f3d8548a7e37e8a84cff1345d2d296c587de9.html)[CSS](#playground-css-brand)*

```html
<!-- Long form -->
<div class="bg-[var(--color-neon-pink)]">...</div>

<!-- Shorthand (v4) -->
<div class="text-(--color-brand)">...</div>
```

## Opacity Modifiers

Works with all color definitions:

*Opacity Modifiers — Example 2 — [Open example](https://stevekinney.com/generated/playgrounds/68bb03605d4c610f22189796c340538dbfd9cbe782c4ec90b0918c4a75ad39c7.html)[CSS](#playground-css-brand)*

```html
<div class="bg-brand/50">50% opacity</div>
<div class="text-neon-pink/75">75% opacity</div>
<div class="border-[var(--color-custom)]/20">20% opacity</div>
```

## Important Tailwind 4 Changes

### Border Color Default

*Border Color Default — Example 3 — [Open example](https://stevekinney.com/generated/playgrounds/490c65ef2eef35486a26c95676aef108baa6213f3cde7b19cf99e61108c459d7.html)*

```html
<!-- v3: defaulted to gray-200 -->
<div class="border">...</div>

<!--Tailwind 4: defaults to currentColor -->
<div class="border border-gray-200">Explicit color needed</div>
```

### Ring Color Default

*Ring Color Default — Example 4 — [Open example](https://stevekinney.com/generated/playgrounds/26d74d233c1e5ef322cdc70c1bdb5a19b2d56a2afae372964d6f4064c1f06a04.html)*

```html
<!-- v3: 3px blue ring -->
<div class="ring">...</div>

<!--Tailwind 4: 1px currentColor -->
<div class="ring-3 ring-blue-500">Explicit width and color</div>
```

## Dynamic Theming

CSS variables enable runtime theme switching:

```css
@theme {
  --color-surface: white;
  --color-text: black;
}

[data-theme='dark'] {
  --color-surface: #1a1a1a;
  --color-text: white;
}
```

```css
@theme {
  --color-brand: #5b21b6;
  --color-neon-pink: oklch(71.7% 0.25 360);
  --color-custom: #7c3aed;
  --color-surface: white;
  --color-text: black;
}

[data-theme='dark'] {
  --color-surface: #1a1a1a;
  --color-text: white;
}
```

*Dynamic Theming — Example 5 — [Open example](https://stevekinney.com/generated/playgrounds/6e0c04076282d461c8b93f19216dacf1d924b00bba8f656686e4a89524cbb60e.html)[CSS](#playground-css-brand)*

```html
<body data-theme="dark">
  <div class="bg-surface text-text">Automatically themed</div>
</body>
```

## Best Practices

1. **Use semantic names** for brand colors: `--color-primary`, `--color-accent`
2. **Group related colors**: `--color-gray-*`, `--color-brand-*`
3. **Leverage OKLCH** for consistent palettes
4. **Document your colors** with comments in `@theme`
5. **Test opacity modifiers** with your custom colors
