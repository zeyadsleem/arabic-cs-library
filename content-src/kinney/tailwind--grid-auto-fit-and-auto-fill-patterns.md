---
title: "Auto-Fit and Auto-Fill Patterns"
lang: "en"
chapter: "tailwind"
slug: "grid-auto-fit-and-auto-fill-patterns"
order: 51
source: "https://stevekinney.com/courses/tailwind/grid-auto-fit-and-auto-fill-patterns"
---

Tailwind CSS enables fine-grained control over grid layouts. While fixed column counts (`grid-cols-4`) and subgrids (`grid-cols-subgrid`) are useful, some designs need grids that automatically adjust column numbers based on available space and content size. This is where CSS Grid’s `auto-fit` and `auto-fill` patterns are used.

## Dynamic Grid Track Sizing with `auto-fill` and `auto-fit`

CSS Grid’s `repeat()` function, with `auto-fill` and `auto-fit` keywords, defines dynamic track lists. Unlike fixed column counts (e.g., `repeat(4, 1fr)`), these keywords create as many columns as fit in the container, based on a specified track size.

### Understanding `auto-fill` and `auto-fit`

- **`auto-fill`**: Fills the row with as many columns as fit. Leftover space remains empty, but tracks are created, potentially resulting in empty columns if items don’t fill them.
- **`auto-fit`**: Similar to `auto-fill`, but after placing items, it collapses empty tracks if there’s remaining space. This allows items to expand and fill the container width, even with fewer items than the maximum possible tracks.

Both are often used with `minmax(<min>, <max>)` to define track sizes. A common pattern is `minmax(<min-width>, 1fr)`, creating tracks at least `<min-width>` wide, growing to share remaining space equally (`1fr`).

## Implementing Auto-fit and Auto-fill in Tailwind CSS

Tailwind lacks dedicated `grid-cols-auto-fit` or `grid-cols-auto-fill` utilities. However, it supports custom CSS values via arbitrary value syntax: `grid-cols-[<value>]` and `grid-rows-[<value>]`.

```css
@theme {
  --min-col-width: 200px;
  --auto-grid-cols: repeat(auto-fit, minmax(250px, 1fr));
}
```

This syntax allows using native CSS `repeat()` with `auto-fill` or `auto-fit`.

### Using `auto-fill`

To create a grid that fills space with items, potentially leaving empty space:

*Using auto-fill — Example 1 — [Open example](https://stevekinney.com/generated/playgrounds/ec1556997fec643c62c42dcdb6bd10350dd5b9a63280d7efd68e6beeded64896.html)*

```html
<div
  class="grid grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))] gap-4 rounded-lg bg-gray-100 p-4"
>
  <div class="rounded bg-blue-200 p-4">Item 1</div>
  <div class="rounded bg-red-200 p-4">Item 2</div>
  <div class="rounded bg-green-200 p-4">Item 3</div>
  <div class="rounded bg-yellow-200 p-4">Item 4</div>
  <div class="rounded bg-purple-200 p-4">Item 5</div>
</div>
```

`grid-cols-[repeat(auto-fill,_minmax(200px,_1fr))]` becomes `grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));`. Columns are at least `200px` wide, growing to fill space. Fewer items than fitting columns may leave visual gaps.

### Using `auto-fit`

For grids where items expand to fill container width by collapsing empty tracks:

*Using auto-fit — Example 2 — [Open example](https://stevekinney.com/generated/playgrounds/9ffc3c243e73418cc2a55e0e25101abc7aa2ee4c1a541fd7cf093d16dbe70ddf.html)*

```html
<div class="grid grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))] gap-4 rounded-lg bg-gray-100 p-4">
  <div class="rounded bg-blue-200 p-4">Item 1</div>
  <div class="rounded bg-red-200 p-4">Item 2</div>
  <div class="rounded bg-green-200 p-4">Item 3</div>
  <!-- If fewer items, they may span full width -->
</div>
```

`grid-cols-[repeat(auto-fit,_minmax(200px,_1fr))]` becomes `grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));`. If fewer items fit at minimum width, `auto-fit` collapses unused tracks, letting existing items grow. Useful for responsive cards or galleries.

### Flexibility with Arbitrary Values

Define `minmax` values with any CSS unit or CSS variables.

*Flexibility with Arbitrary Values — Example 3 — [Open example](https://stevekinney.com/generated/playgrounds/b95e3ff4811bb0c88e936daa0f7ec74ac93810346a0d17c3ddd3f1e346d404ac.html)[CSS](#playground-css-grid-vars)*

```html
<div
  class="grid grid-cols-[repeat(auto-fit,_minmax(var(--min-col-width),_1fr))] gap-4 rounded-lg bg-gray-100 p-4"
>
  <div class="rounded bg-blue-200 p-4">Dynamic Item 1</div>
  <div class="rounded bg-red-200 p-4">Dynamic Item 2</div>
  <div class="rounded bg-green-200 p-4">Dynamic Item 3</div>
</div>
```

This allows dynamic control of minimum column width via CSS variables (set by CSS or Tailwind 4+‘s `@theme`).

### Arbitrary Values and CSS Variables Shorthand

Tailwind offers `grid-cols-(<custom-property>)` for arbitrary values that are solely CSS variables. If a CSS variable holds the entire `repeat()` function, this shorthand can be used.

```css
/* In main CSS, potentially within @theme */
@theme {
  --auto-grid-cols: repeat(auto-fit, minmax(250px, 1fr));
}
```

*Arbitrary Values and CSS Variables Shorthand — Example 4 — [Open example](https://stevekinney.com/generated/playgrounds/9c81b8417b82f54365c20909b494c5e336d708732f5c989b7df9ac005ab275ab.html)[CSS](#playground-css-grid-vars)*

```html
<div class="grid grid-cols-(--auto-grid-cols) gap-4 rounded-lg bg-gray-100 p-4">
  <div class="rounded bg-blue-200 p-4">CSS Variable Item 1</div>
  <div class="rounded bg-red-200 p-4">CSS Variable Item 2</div>
  <div class="rounded bg-green-200 p-4">CSS Variable Item 3</div>
</div>
```

This relies on `--auto-grid-cols` being defined, possibly in your Tailwind theme via `@theme`. Theme variables become regular CSS variables.

### Editor Support

The Tailwind CSS IntelliSense extension for VS Code helps with complex arbitrary grid definitions, offering autocomplete, syntax highlighting, and hover previews.

In summary, while Tailwind has no explicit `auto-fit` or `auto-fill` classes, its arbitrary value syntax for `grid-cols` and `grid-rows` enables using these native CSS Grid patterns for dynamic, responsive layouts.
