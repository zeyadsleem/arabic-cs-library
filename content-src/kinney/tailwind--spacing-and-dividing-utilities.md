---
title: "Spacing and Dividing Utilities"
lang: "en"
chapter: "tailwind"
slug: "spacing-and-dividing-utilities"
order: 9
source: "https://stevekinney.com/courses/tailwind/spacing-and-dividing-utilities"
---

## Space

The `space-` utility adds fixed margins between child elements.

> **It’s Just a Shorthand**
>
> `space` adds margins to all children except the last.

- **Direction**: `space-x-{n}` (horizontal), `space-y-{n}` (vertical)
- **No outer edges**: Doesn’t affect first/last element margins

### Vertical Spacing

*Vertical Spacing — Example 1 — [Open example](https://stevekinney.com/generated/playgrounds/7e0f2e5e6889514a9d1a2b1fa8748eab558f05c6840d7f0ebf7865a87e8fcbc3.html)*

```html
<div class="space-y-4 bg-sky-100 px-4">
  <div class="border-2 border-fuchsia-600 bg-fuchsia-500 text-center">First</div>
  <div class="border-2 border-fuchsia-600 bg-fuchsia-500 text-center">Second</div>
  <div class="border-2 border-fuchsia-600 bg-fuchsia-500 text-center">Third</div>
  <div class="border-2 border-fuchsia-600 bg-fuchsia-500 text-center">Fourth</div>
</div>
```

### Horizontal Spacing

*Horizontal Spacing — Example 2 — [Open example](https://stevekinney.com/generated/playgrounds/a94c30cee9d37fbb10d7bc364d9c499482f9a53727a290c017e62fffaef2821b.html)*

```html
<div class="space-x-8">
  <button class="rounded border-2 border-sky-700 bg-sky-500 px-4 py-2 text-white shadow-md">
    Button
  </button>
  <button class="rounded border-2 border-sky-700 bg-sky-500 px-4 py-2 text-white shadow-md">
    Button
  </button>
  <button class="rounded border-2 border-sky-700 bg-sky-500 px-4 py-2 text-white shadow-md">
    Button
  </button>
</div>
```

This is what it *really* does under the hood:

```css
.space-y-4 > * + * {
  margin-top: 1rem;
}
```

- **Use for:** Lists, row and column layouts with equal spacing.
- **Limitations:** Fixed spacing only, no outer margins.

> **Why not just use flexbox?**
>
> `space-y-*` maintains normal document flow while flexbox creates a flex formatting context. With Flexbox, everything becomes a flex item, which can affect how text flows, how lists behave, etc.
>
> But, honestly, it probably doesn’t matter.

## Divide

The `divide` utility adds borders between child elements as separators.

*Divide — Example 3 — [Open example](https://stevekinney.com/generated/playgrounds/acd410a0819dd82c39fd2cad8281f39da157d6fbdf047047eae9412509b0b77c.html)*

```html
<div class="divide-y-4 bg-sky-100 px-4">
  <div class="bg-fuchsia-500 text-center">First</div>
  <div class="bg-fuchsia-500 text-center">Second</div>
  <div class="bg-fuchsia-500 text-center">Third</div>
  <div class="bg-fuchsia-500 text-center">Fourth</div>
</div>
```

Customize thickness and color:

*Divide — Example 4 — [Open example](https://stevekinney.com/generated/playgrounds/c73cc306f1ab150e0a9911ce9888b1ad77fb29e430c7fb374559441939bbed8b.html)*

```html
<div class="divide-y-4 divide-cyan-400 bg-sky-100 px-4">
  <div class="bg-fuchsia-500 text-center">First</div>
  <div class="bg-fuchsia-500 text-center">Second</div>
  <div class="bg-fuchsia-500 text-center">Third</div>
  <div class="bg-fuchsia-500 text-center">Fourth</div>
</div>
```

## Compare and Contrast

### Both Space *and* Divide

- Manage spacing between children
- Support responsive variants
- Have `-x` and `-y` directions
- Customizable via `@theme`

### Space

- Adds **margins** between elements
- Affects all children (including first/last)
- Example: `space-x-4`

### Divide

- Adds **borders** as dividers
- Skips first/last edges automatically
- Customizable color and style
- Example: `divide-x-2 divide-gray-300`
