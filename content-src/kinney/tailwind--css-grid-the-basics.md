---
title: "CSS Grid: The Basics"
lang: "en"
chapter: "tailwind"
slug: "css-grid-the-basics"
order: 40
source: "https://stevekinney.com/courses/tailwind/css-grid-the-basics"
---

CSS Grid with Tailwind offers precise control over two-dimensional layouts. Flexbox is powerful for one-dimensional alignment, but Grid excels in two dimensions. Tailwind 4, with its utility-first approach, makes building complex grid layouts intuitive and fast. Compose layouts directly in HTML with clear, semantic classes, reducing the need for custom CSS.

## Setting Up a Grid Container

To create a grid layout, first define a grid container. In standard CSS, this is `display: grid;`. Tailwind uses the `grid` utility class.

Applying `grid` to an element makes it a grid container, establishing a block-level grid formatting context for its contents. This container dictates how its direct children (grid items) are laid out.

*Setting Up a Grid Container — Example 1 — [Open example](https://stevekinney.com/generated/playgrounds/94dd431e6b34104ec19e113bb405fd419ce2da9b5bf85a1a3aaaff279ab5c402.html)*

```html
<div class="grid gap-4 rounded-lg bg-gray-100 p-4">
  <!-- Grid items go here -->
  <div class="rounded bg-blue-200 p-4">Item 1</div>
  <div class="rounded bg-red-200 p-4">Item 2</div>
  <div class="rounded bg-green-200 p-4">Item 3</div>
</div>
```

This class is the foundation for all grid layout capabilities.

## Defining Explicit Grid Tracks

Once you have a grid container, define the grid by specifying columns and rows, known as explicit grid tracks.

### Grid Columns

Define explicit grid columns using utilities that map to the `grid-template-columns` CSS property. The primary Tailwind utility is `grid-cols-<number>`.

`grid-cols-<number>` creates a grid with a specified number of equally sized columns. For example, `grid-cols-3` creates three columns, each taking an equal fraction of the available space, using `repeat(<number>, minmax(0, 1fr))` CSS. The `fr` unit represents a fraction of the available space in the grid container.

*Grid Columns — Example 2 — [Open example](https://stevekinney.com/generated/playgrounds/8ff16d7507bbdb36dc7042d55cdcd616a4e3dea839fd34c4f6a22f58a1d26fcc.html)*

```html
<div class="grid grid-cols-3 gap-4 rounded-lg bg-gray-100 p-4">
  <div class="flex min-h-[80px] items-center justify-center rounded bg-blue-200 p-4">1</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-red-200 p-4">2</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-green-200 p-4">3</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-yellow-200 p-4">4</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-purple-200 p-4">5</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-pink-200 p-4">6</div>
</div>
```

This creates a 3-column grid where each column is one-third the container’s width (minus the gap).

Remove explicitly defined columns with `grid-cols-none` (`grid-template-columns: none;`).

For complex column definitions, use arbitrary values with `grid-cols-[<value>]`. This allows any valid CSS value for `grid-template-columns`, like specific widths, `repeat` with different units, or `fit-content`.

*Grid Columns — Example 3 — [Open example](https://stevekinney.com/generated/playgrounds/2fae09d065c0b1a5fd05639c9b637e9fbe7e05ab98ab3d143d0792493237859e.html)*

```html
<div class="grid grid-cols-[200px_1fr_200px] gap-4 rounded-lg bg-gray-100 p-4">
  <div class="min-h-[80px] rounded bg-blue-200 p-4">Fixed 200px</div>
  <div class="min-h-[80px] rounded bg-red-200 p-4">Flexible 1fr</div>
  <div class="min-h-[80px] rounded bg-green-200 p-4">Fixed 200px</div>
</div>
```

Reference CSS variables for column definitions with `grid-cols-(<custom-property>)`, like `grid-cols-(--my-column-layout)`.

### Grid Rows

Similarly, define explicit grid rows using utilities that map to `grid-template-rows`. The primary utility is `grid-rows-<number>`.

`grid-rows-<number>` creates a grid with a specified number of equally sized rows, using `repeat(<number>, minmax(0, 1fr))` CSS.

*Grid Rows — Example 4 — [Open example](https://stevekinney.com/generated/playgrounds/1466756b937632dcad1b7555ba663c20158a522e13aa44dbb80aa34730d1451d.html)*

```html
<div class="grid grid-flow-col grid-rows-3 gap-4 rounded-lg bg-gray-100 p-4">
  <div class="flex min-h-[80px] items-center justify-center rounded bg-blue-200 p-4">1</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-red-200 p-4">2</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-green-200 p-4">3</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-yellow-200 p-4">4</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-purple-200 p-4">5</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-pink-200 p-4">6</div>
</div>
```

This creates a grid with three rows. Items flow into columns (`grid-flow-col`) after filling rows. Each row takes an equal fraction of the available height.

Remove explicitly defined rows with `grid-rows-none`.

For custom row definitions, `grid-rows-[<value>]` allows arbitrary values.

*Grid Rows — Example 5 — [Open example](https://stevekinney.com/generated/playgrounds/766455f4c457b5c83855968a2b0ec9ef16d8bc5960185c18326f6e7556ab5756.html)*

```html
<div class="grid grid-rows-[100px_auto_100px] gap-4 rounded-lg bg-gray-100 p-4">
  <div class="rounded bg-blue-200 p-4">Header (100px)</div>
  <div class="rounded bg-red-200 p-4">Content (auto)</div>
  <div class="rounded bg-green-200 p-4">Footer (100px)</div>
</div>
```

CSS variables can also be used for row definitions with `grid-rows-(<custom-property>)`.

### Subgrid

Tailwind supports `subgrid` for `grid-template-columns` and `grid-template-rows` via `grid-cols-subgrid` and `grid-rows-subgrid` utilities.

A subgrid allows a nested grid to align its tracks with its parent grid, inheriting the parent’s column or row sizing and positioning.

*Subgrid — Example 6 — [Open example](https://stevekinney.com/generated/playgrounds/5754075c0d4b71bf733ac5bdf0fdb216dbc2d836824e344c1e3eacfbeb5c8305.html)*

```html
<div class="grid grid-cols-3 gap-4 rounded-lg bg-gray-100 p-4">
  <div class="min-h-[80px] rounded bg-blue-200 p-4">Item 1</div>
  <div class="col-span-2 grid grid-cols-subgrid gap-4">
    <!-- This item spans parent columns 2 and 3; its children align to columns 2 and 3 -->
    <div class="min-h-[80px] rounded bg-red-200 p-4">Nested Item 1</div>
    <div class="min-h-[80px] rounded bg-green-200 p-4">Nested Item 2</div>
  </div>
  <div class="min-h-[80px] rounded bg-yellow-200 p-4">Item 3</div>
</div>
```

This feature maintains complex grid alignments across nested elements.

## Controlling Auto-Placement

Grid items are automatically placed into defined grid cells. The `grid-auto-flow` property controls this auto-placement.

Tailwind utilities for auto-placement:

- `grid-flow-row`: Items fill each row, adding new rows as needed (default).
- `grid-flow-col`: Items fill each column, adding new columns as needed.
- `grid-flow-dense`: Uses a “dense” packing algorithm to fill holes earlier in the grid, potentially reordering items. Combine with `row` or `col`.
- `grid-flow-row-dense`: Dense packing, flowing items by row.
- `grid-flow-col-dense`: Dense packing, flowing items by column.

*Controlling Auto-Placement — Example 7 — [Open example](https://stevekinney.com/generated/playgrounds/2eb2fa902b2e9501e486a4cc25386ef12893f13b71d97a5e65a036129272f169.html)*

```html
<div class="grid grid-flow-col grid-cols-3 gap-4 rounded-lg bg-gray-100 p-4">
  <div class="flex min-h-[80px] items-center justify-center rounded bg-blue-200 p-4">1</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-red-200 p-4">2</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-green-200 p-4">3</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-yellow-200 p-4">4</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-purple-200 p-4">5</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-pink-200 p-4">6</div>
</div>
```

Here, `grid-flow-col` makes items 1, 2, and 3 fill the first column’s rows before moving to the second.

## Sizing Implicit Grid Tracks

If there are more grid items than explicit cells, the grid creates *implicit* tracks (columns or rows). Their size is controlled by `grid-auto-columns` and `grid-auto-rows`.

Tailwind utilities for these properties:

- `auto-cols-auto`, `auto-rows-auto`: Implicit tracks size automatically based on content.
- `auto-cols-min`, `auto-rows-min`: Implicit tracks size to the minimum content size of items within them.
- `auto-cols-max`, `auto-rows-max`: Implicit tracks size to the maximum content size of items within them.
- `auto-cols-fr`, `auto-rows-fr`: Implicit tracks size as fractions of available space.

*Sizing Implicit Grid Tracks — Example 8 — [Open example](https://stevekinney.com/generated/playgrounds/7ea5774ac1391ed3234454347bcd30ee0aec09dcfa853e74bd1c2fd583e6496a.html)*

```html
<div class="grid auto-cols-max grid-cols-2 gap-4 rounded-lg bg-gray-100 p-4">
  <div class="min-h-[80px] rounded bg-blue-200 p-4">Item 1</div>
  <div class="min-h-[80px] rounded bg-red-200 p-4">Item 2</div>
  <div class="min-h-[80px] rounded bg-green-200 p-4">Item 3 that's much wider</div>
  <div class="min-h-[80px] rounded bg-yellow-200 p-4">Item 4</div>
</div>
```

This grid has 2 explicit columns. Items 3 and 4 go into an *implicit* third column. `auto-cols-max` ensures this column is wide enough for the widest item (Item 3).

Arbitrary values are supported for `auto-cols-[<value>]` and `auto-rows-[<value>]`.

## Controlling Gaps

Layouts often need space between grid items. Grid provides `gap`, `row-gap`, and `column-gap`.

Tailwind uses its spacing scale and arbitrary values for gap utilities:

- `gap-<number>`: Sets gap for rows and columns (e.g., `gap-4` for 1rem).
- `gap-x-<number>`: Sets column gap.
- `gap-y-<number>`: Sets row gap.

*Controlling Gaps — Example 9 — [Open example](https://stevekinney.com/generated/playgrounds/7fec7c5de16fdee6edc85221225ed68480a9039d6a3d4643c847831296316777.html)*

```html
<div class="grid grid-cols-4 gap-4 rounded-lg bg-gray-100 p-4">
  <div class="min-h-[80px] rounded bg-blue-200 p-4">Item 1</div>
  <div class="min-h-[80px] rounded bg-red-200 p-4">Item 2</div>
  <div class="min-h-[80px] rounded bg-green-200 p-4">Item 3</div>
  <div class="min-h-[80px] rounded bg-yellow-200 p-4">Item 4</div>
</div>

<div class="mt-4 grid grid-cols-3 gap-x-8 gap-y-4 rounded-lg bg-gray-100 p-4">
  <div class="min-h-[80px] rounded bg-purple-200 p-4">Item 1</div>
  <div class="min-h-[80px] rounded bg-pink-200 p-4">Item 2</div>
  <div class="min-h-[80px] rounded bg-indigo-200 p-4">Item 3</div>
  <div class="min-h-[80px] rounded bg-teal-200 p-4">Item 4</div>
  <div class="min-h-[80px] rounded bg-orange-200 p-4">Item 5</div>
  <div class="min-h-[80px] rounded bg-lime-200 p-4">Item 6</div>
</div>
```

These utilities apply consistent spacing. Arbitrary values like `gap-[10px]` or `gap-x-[5%]` are also usable.

## Placing Grid Items

Grid allows precise placement of items, overriding auto-placement.

### Spanning Tracks

To make an item span multiple columns or rows, use `grid-column` or `grid-row` with `span`.

- `col-span-<number>`: Item spans specified number of columns.
- `row-span-<number>`: Item spans specified number of rows.

*Spanning Tracks — Example 10 — [Open example](https://stevekinney.com/generated/playgrounds/d3e0318a2fc5354baa19881b796d46886166afa59a9af5464a2e662494b67e24.html)*

```html
<div class="grid grid-cols-6 gap-4 rounded-lg bg-gray-100 p-4">
  <div class="col-span-4 min-h-[80px] rounded bg-blue-200 p-4">Item 1 spans 4 columns</div>
  <div class="col-span-2 min-h-[80px] rounded bg-red-200 p-4">Item 2 spans 2 columns</div>
  <div class="col-span-2 min-h-[80px] rounded bg-green-200 p-4">Item 3 spans 2 columns</div>
  <div class="col-span-4 min-h-[80px] rounded bg-yellow-200 p-4">Item 4 spans 4 columns</div>
</div>
```

This 6-column grid has the first item spanning 4 columns and the second 2 columns on the first row. The third and fourth items do likewise on the second row.

`col-span-full` makes an item span all columns (`grid-column: 1 / -1;`). `row-span-full` does the same for rows.

Arbitrary values are supported for `col-span-[<value>]` and `row-span-[<value>]`.

### Starting and Ending at Specific Lines

Position an item by specifying its start and end grid lines using `grid-column-start`, `grid-column-end`, `grid-row-start`, and `grid-row-end`.

- `col-start-<number>`: Item starts at specified column line.
- `col-end-<number>`: Item ends at specified column line.
- `row-start-<number>`: Item starts at specified row line.
- `row-end-<number>`: Item ends at specified row line.

*Starting and Ending at Specific Lines — Example 11 — [Open example](https://stevekinney.com/generated/playgrounds/6406e8bbfe7cbd4a9cecd222306291a3525eb902058b4ccdf6e0619d65af2491.html)*

```html
<div class="grid h-64 grid-cols-3 grid-rows-3 gap-4 rounded-lg bg-gray-100 p-4">
  <div class="col-start-2 col-end-3 row-start-1 row-end-3 rounded bg-blue-200 p-4">
    Item 1 (Col 2, Row 1-2)
  </div>
  <div class="col-start-1 col-end-2 row-start-2 row-end-4 rounded bg-red-200 p-4">
    Item 2 (Col 1, Row 2-3)
  </div>
</div>
```

The first item starts at column line 2, ends at column line 3, and spans rows 1 to 3. The second item is placed similarly.

`col-auto`, `row-auto`, `col-start-auto`, `col-end-auto`, `row-start-auto`, `row-end-auto` utilities are available.

Arbitrary values and negative numbers (e.g., `col-start-[-1]`) are supported.

## Alignment and Justification

Grid offers control over item alignment within grid areas and track positioning within the container.

### Aligning Content (`align-content`)

`align-content` controls grid *track* alignment along the container’s *cross axis* (typically vertical) when there’s extra space. Applied to the grid container.

Tailwind `content-*` utilities: `content-normal`, `content-center`, `content-start`, `content-end`, `content-between`, `content-around`, `content-evenly`, `content-baseline`, `content-stretch`.

*Aligning Content (align-content) — Example 12 — [Open example](https://stevekinney.com/generated/playgrounds/b7aec59f620dcb6d294bc95c820ec18fdb8adee016855f4252a0f75f8e64cda4.html)*

```html
<div class="grid h-48 grid-rows-3 content-center gap-4 rounded-lg bg-gray-100 p-4">
  <div class="rounded bg-blue-200 p-4">Item 1</div>
  <div class="rounded bg-red-200 p-4">Item 2</div>
  <div class="rounded bg-green-200 p-4">Item 3</div>
</div>
```

Rows are centered vertically due to `content-center`.

### Aligning Items (`align-items`)

`align-items` controls individual grid *item* alignment within their *cells* along the container’s *cross axis*. Applied to the grid container.

Tailwind `items-*` utilities: `items-start`, `items-end`, `items-center`, `items-baseline`, `items-stretch` (default).

*Aligning Items (align-items) — Example 13 — [Open example](https://stevekinney.com/generated/playgrounds/3b56acf6e8bc61cc7ef27bb6d039491def90cba0d061bf5e3710dca8184edfb0.html)*

```html
<div class="grid h-32 grid-cols-2 items-center gap-4 rounded-lg bg-gray-100 p-4">
  <div class="rounded bg-blue-200 p-4">Item 1</div>
  <div class="rounded bg-red-200 p-4">Item 2</div>
</div>
```

Both items are centered vertically in their cells due to `items-center`.

`-safe` suffix utilities (e.g., `items-end-safe`) prevent items from moving outside their container.

### Aligning Self (`align-self`)

`align-self` overrides `align-items` for a *single* grid item. Applied to a grid item.

Tailwind `self-*` utilities: `self-auto` (uses `align-items`), `self-start`, `self-end`, `self-center`, `self-stretch`, `self-baseline`.

*Aligning Self (align-self) — Example 14 — [Open example](https://stevekinney.com/generated/playgrounds/36baea3f7048f7736fe607f7b8aea8f6c4cb00b085d26714c931c28aeea82b72.html)*

```html
<div class="grid h-32 grid-cols-2 items-start gap-4 rounded-lg bg-gray-100 p-4">
  <div class="rounded bg-blue-200 p-4">Item 1</div>
  <div class="self-center rounded bg-red-200 p-4">Item 2 (centered)</div>
</div>
```

`items-start` aligns items to the top, but `self-center` overrides this for Item 2.

`-safe` suffix utilities are available.

### Justifying Content (`justify-content`)

`justify-content` controls grid *track* alignment along the container’s *main axis* (typically horizontal) when there’s extra space. Applied to the grid container.

Tailwind `justify-*` utilities: `justify-start`, `justify-end`, `justify-center`, `justify-between`, `justify-around`, `justify-evenly`, `justify-stretch`, `justify-normal`.

*Justifying Content (justify-content) — Example 15 — [Open example](https://stevekinney.com/generated/playgrounds/98187fc11a9cdeecc6dbdffcc831bb8f13435a7cd897912ea9190a10bc508ee8.html)*

```html
<div class="grid h-96 grid-cols-[4rem_4rem_4rem] justify-center gap-4 rounded-lg bg-green-100 p-4">
  <div class="flex h-12 w-12 items-center justify-center rounded bg-blue-200">1</div>
  <div class="flex h-12 w-12 items-center justify-center rounded bg-red-200">2</div>
</div>
```

Implicit columns are centered within the container due to `justify-center`.

### Justifying Items (`justify-items`)

`justify-items` controls individual grid *item* alignment within their *cells* along the container’s *inline axis* (typically horizontal). Applied to the grid container.

Tailwind `justify-items-*` utilities: `justify-items-start`, `justify-items-end`, `justify-items-center`, `justify-items-stretch` (default), `justify-items-normal`.

*Justifying Items (justify-items) — Example 16 — [Open example](https://stevekinney.com/generated/playgrounds/8de9c4ed54af705b78389549cc35350e4737c7d3beb4e2cb86902c7807f42814.html)*

```html
<div class="grid h-96 grid-cols-3 justify-items-center gap-4 rounded-lg bg-green-100 p-4">
  <div class="h-24 w-24 rounded bg-blue-200 p-4">Item 1</div>
  <div class="h-24 w-24 rounded bg-red-200 p-4">Item 2</div>
</div>
```

Items are centered horizontally in their cells due to `justify-items-center`.

`-safe` suffix utilities are available.

### Justifying Self (`justify-self`)

`justify-self` overrides `justify-items` for a *single* grid item. Applied to a grid item.

Tailwind `justify-self-*` utilities: `justify-self-auto` (uses `justify-items`), `justify-self-start`, `justify-self-end`, `justify-self-center`, `justify-self-stretch`.

*Justifying Self (justify-self) — Example 17 — [Open example](https://stevekinney.com/generated/playgrounds/7f610afd0a3d42136154dbc764ed5a73996017ffda0558a68b21b1a5b392207a.html)*

```html
<div class="grid grid-cols-2 justify-items-start gap-4 rounded-lg bg-gray-100 p-4">
  <div class="min-h-[80px] rounded bg-blue-200 p-4">Item 1 (start)</div>
  <div class="min-h-[80px] justify-self-center rounded bg-red-200 p-4">Item 2 (centered)</div>
</div>
```

`justify-items-start` aligns items left, but `self-center` overrides this for Item 2.

`-safe` suffix utilities are available.

### Placing Content and Items (`place-content`, `place-items`, `place-self`)

Grid offers shorthands for setting alignment and justification simultaneously.

- `place-content-*`: Sets `align-content` and `justify-content`. Applied to container.
- `place-items-*`: Sets `align-items` and `justify-items`. Applied to container.
- `place-self-*`: Sets `align-self` and `justify-self`. Applied to item.

*Placing Content and Items (place-content, place-items, place-self) — Example 18 — [Open example](https://stevekinney.com/generated/playgrounds/5521e2ffc6f903df71c3d7ac624c342f7ac028ffb76bc825ef447c25ab4862f2.html)*

```html
<div
  class="grid h-48 w-48 grid-cols-2 grid-rows-2 place-items-center gap-4 rounded-lg bg-gray-100 p-4"
>
  <div class="rounded bg-blue-200 p-3">Item 1</div>
  <div class="rounded bg-red-200 p-3">Item 2</div>
  <div class="rounded bg-green-200 p-3">Item 3</div>
  <div class="rounded bg-yellow-200 p-3">Item 4</div>
</div>
```

`place-items-center` centers all items horizontally and vertically in their cells.

`place-content-center` centers the grid tracks within the container. `place-self-center` centers a single item in its cell.

`-safe` suffix utilities are available.

## Responsive Grid Layouts

Tailwind supports responsive design. Grid utilities can be applied conditionally at breakpoints (`sm:`, `md:`, `lg:`, `xl:`, `2xl:`).

*Responsive Grid Layouts — Example 19 — [Open example](https://stevekinney.com/generated/playgrounds/3c750e723c88076f1176bfdedb1d45824bf514223227feebb086405d4627dc97.html)*

```html
<div class="grid grid-cols-1 gap-4 rounded-lg bg-gray-100 p-4 md:grid-cols-2 lg:grid-cols-3">
  <div class="min-h-[80px] rounded bg-blue-200 p-4">Item 1</div>
  <div class="min-h-[80px] rounded bg-red-200 p-4">Item 2</div>
  <div class="min-h-[80px] rounded bg-green-200 p-4">Item 3</div>
  <div class="min-h-[80px] rounded bg-yellow-200 p-4">Item 4</div>
  <div class="min-h-[80px] rounded bg-purple-200 p-4">Item 5</div>
  <div class="min-h-[80px] rounded bg-pink-200 p-4">Item 6</div>
</div>
```

This grid is 1-column on small screens, 2-column on medium (`md`), and 3-column on large (`lg`) screens.

Tailwind is mobile-first: unprefixed styles apply to all sizes; prefixed styles override at their breakpoint and above.

Tailwind supports container queries. Mark an element with `@container`, then use variants like `@sm:` on its children to style them based on the container’s width.

*Responsive Grid Layouts — Example 20 — [Open example](https://stevekinney.com/generated/playgrounds/1f3847b11ba384acbfa954fe9d1b6c4d0827387c7b3f275347504229cbb4609c.html)*

```html
<div class="@container">
  <div class="grid grid-cols-1 gap-4 rounded-lg bg-gray-100 p-4 @md:grid-cols-2">
    <div class="min-h-[80px] rounded bg-blue-200 p-4">Item 1</div>
    <div class="min-h-[80px] rounded bg-red-200 p-4">Item 2</div>
    <div class="min-h-[80px] rounded bg-green-200 p-4">Item 3</div>
    <div class="min-h-[80px] rounded bg-yellow-200 p-4">Item 4</div>
  </div>
</div>
```

The child grid is 1-column by default, but 2-column when the `@container` element reaches medium size.

## Customizing Grid Settings

Customize grid columns, rows, and gaps using the `@theme` directive in your main CSS.

Define custom grid templates with `--grid-template-columns-*` and `--grid-template-rows-*` theme variables.

```css
@import 'tailwindcss';

@theme {
  --grid-template-columns-layout: 1fr 2fr 1fr;
  --grid-template-rows-header: auto;
  --grid-template-rows-content: 1fr;
  --grid-template-rows-footer: auto;
}
```

Use these as utility classes:

*Customizing Grid Settings — Example 21 — [Open example](https://stevekinney.com/generated/playgrounds/e5d877da7d925822d525195ee805d45cc19a075b52104edca7514495c2cc755f.html)*

```html
<div
  class="grid-cols-layout grid-rows-header grid-rows-content grid-rows-footer grid gap-4 rounded-lg bg-gray-100 p-4"
>
  <div class="rounded bg-blue-200 p-4">Header</div>
  <div class="rounded bg-red-200 p-4">Content Area</div>
  <div class="rounded bg-green-200 p-4">Footer</div>
</div>
```

This integrates complex grid definitions into your design system. Customize gap spacing with `--spacing`.

## Using Arbitrary Values with Grid Utilities

Many Tailwind grid utilities support arbitrary values via `[<value>]` syntax, allowing any valid CSS value.

*Using Arbitrary Values with Grid Utilities — Example 22 — [Open example](https://stevekinney.com/generated/playgrounds/49b7638cfb15df62580a5065567b9391e463ac5852b22fcfb3b03a26d759505a.html)*

```html
<div
  class="grid grid-cols-[repeat(auto-fit,_minmax(250px,_1fr))] gap-[2rem] rounded-lg bg-gray-100 p-4"
>
  <div class="min-h-[120px] rounded bg-blue-200 p-4">Item 1</div>
  <div class="min-h-[120px] rounded bg-red-200 p-4">Item 2</div>
  <div class="min-h-[120px] rounded bg-green-200 p-4">Item 3</div>
  <div class="min-h-[120px] rounded bg-yellow-200 p-4">Item 4</div>
</div>
```

Arbitrary values create a responsive grid with auto-fitting columns and a custom gap. Use CSS variables within arbitrary values, like `w-[var(--sidebar-width)]`.
