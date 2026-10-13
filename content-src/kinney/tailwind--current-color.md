---
title: "currentColor"
lang: "en"
chapter: "tailwind"
slug: "current-color"
order: 28
source: "https://stevekinney.com/courses/tailwind/current-color"
---

`currentColor` is a CSS keyword that just means “use the element’s text color.” Tailwind provides utilities to apply this adaptive coloring across various properties.

## Available Utilities

All `currentColor` utilities use the `-current` suffix:

- `bg-current` - Background color
- `border-current` - Border color (all sides)
- `border-{side}-current` - Individual border sides
- `divide-current` - Divider between children
- `outline-current` - Outline color
- `decoration-current` - Text decoration color
- `fill-current` - SVG fill color
- `stroke-current` - SVG stroke color
- `caret-current` - Input cursor color
- `shadow-current` - Box shadow color
- `ring-current` - Ring (focus) color
- `text-shadow-current` - Text shadow color
- `accent-current` - Form control accent

## Basic Usage

*Basic Usage — Example 1 — [Open example](https://stevekinney.com/generated/playgrounds/750d58cf81ac992e08be1b529468d2e0c485a7c1bbe11db0092b0ed98100b34b.html)*

```html
<!-- Border inherits text color -->
<div class="border-2 border-current text-blue-500">Blue text with blue border</div>

<!-- SVG icon matches text -->
<button class="text-green-600">
  <svg class="h-4 w-4 fill-current">...</svg>
  Green text with green icon
</button>
```

## Tailwind 4 Default Changes

Tailwind 4 embraces `currentColor` for several defaults:

### Border Color

*Border Color — Example 2 — [Open example](https://stevekinney.com/generated/playgrounds/cdaefe9e64a8126a718878417f3f97858b19a5b601e5dc0efff45828e6af88d2.html)*

```html
<!-- v3: gray-200 by default -->
<div class="border"></div>

<!--Tailwind 4: currentColor by default -->
<div class="border border-gray-200">Explicit color needed</div>
```

### Ring Color

*Ring Color — Example 3 — [Open example](https://stevekinney.com/generated/playgrounds/e52d60af97eb935579a16befcb589fc8c35923003f0ccc256d37f1b69ce84538.html)*

```html
<!-- v3: 3px blue ring -->
<div class="ring"></div>

<!--Tailwind 4: 1px currentColor -->
<div class="ring-3 ring-blue-500">Explicit width/color</div>
```

### Placeholder Text

```css
/* v3: gray-400 */
/*Tailwind 4: currentColor at 50% opacity */
```

## Practical Patterns

### Adaptive Components

*Adaptive Components — Example 4 — [Open example](https://stevekinney.com/generated/playgrounds/58c4c601264f5734ed830187e3ce32e02a8b36e78028e7330a0b4c67679203ee.html)*

```html
<!-- Button adapts to parent context -->
<div class="text-indigo-600">
  <button class="border-2 border-current px-4 py-2">Indigo bordered button</button>
</div>

<div class="text-red-600">
  <button class="border-2 border-current px-4 py-2">Red bordered button</button>
</div>
```

### Icon Libraries

*Icon Libraries — Example 5 — [Open example](https://stevekinney.com/generated/playgrounds/0cab9e848fde02e6c995811def9de04e13a5cc8f844fcc8d0fdcc5e6d2f79f78.html)*

```html
<!-- Icons automatically match text color -->
<span class="text-gray-600">
  <svg class="inline h-5 w-5 fill-current">...</svg>
  Gray icon matches text
</span>
```

### Focus States

*Focus States — Example 6 — [Open example](https://stevekinney.com/generated/playgrounds/cb92b86b974eecefd8e49564cf2d43035adffa3df8bce6f5a8d736ecb1ababe4.html)*

```html
<input class="text-blue-600 focus:ring-2 focus:ring-current focus:outline-current" />
```

## With Opacity

Combine with opacity modifiers:

*With Opacity — Example 7 — [Open example](https://stevekinney.com/generated/playgrounds/ef4a3b2a3dae19b50bdba0a33a4d9d99333037ad6652db26e47e99fe6a6cdf5c.html)*

```html
<div class="border-2 border-current/50 text-purple-600">50% opacity purple border</div>
```

## In Custom CSS

Use in your own styles:

```css
.custom-quote {
  border-left: 4px solid currentColor;
  color: var(--color-gray-700);
}
```

## Arbitrary Values

Use `currentColor` in arbitrary value syntax:

*Arbitrary Values — Example 8 — [Open example](https://stevekinney.com/generated/playgrounds/ca006e03274208788d4ddb9f8f5ab3e4f945cd4bed1e0a99147b4f681a8fc87e.html)*

```html
<div class="shadow-[0_2px_8px_currentColor/20]">Shadow using text color at 20% opacity</div>
```

## Best Practices

1. **Use for contextual adaptation** - Let components inherit color from context
2. **Great for icons** - SVGs that should match surrounding text
3. **Reduce repetition** - Set text color once, apply everywhere
4. **Mind the defaults** -Tailwind 4 uses currentColor more extensively
5. **Test inheritance** - Ensure color cascades as expected
