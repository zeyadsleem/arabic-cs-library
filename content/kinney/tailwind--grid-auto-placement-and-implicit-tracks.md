---
title: "Auto-Placement and Implicit Tracks"
lang: en
source: "https://stevekinney.com/courses/tailwind/grid-auto-placement-and-implicit-tracks"
---

Tailwind CSS provides utilities to control how grid items are automatically placed and how implicit tracks are sized when the grid needs to create new rows or columns.

## Auto-Placement Direction

Use `grid-flow-*` utilities to control how items are placed:

*Auto-Placement Direction — Example 1 — [Open example](https://stevekinney.com/generated/playgrounds/7670fecd565408d849f7c935b0e6e7621f0dbb9ad8794d985fe4e831c42ad255.html)*

```html
<!-- Default: fill rows first -->
<div class="grid grid-flow-row grid-cols-3 gap-4 rounded-lg bg-gray-100 p-4">
  <div class="flex min-h-[80px] items-center justify-center rounded bg-blue-200 p-4">Item 1</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-red-200 p-4">Item 2</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-green-200 p-4">Item 3</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-yellow-200 p-4">Item 4</div>
  <!-- Creates new row -->
</div>

<!-- Fill columns first -->
<div class="mt-4 grid grid-flow-col grid-rows-2 gap-4 rounded-lg bg-gray-100 p-4">
  <div class="flex min-h-[80px] items-center justify-center rounded bg-purple-200 p-4">Item 1</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-pink-200 p-4">Item 2</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-indigo-200 p-4">Item 3</div>
  <!-- Creates new column -->
</div>
```

Available utilities:

- `grid-flow-row` - Fill rows first (default)
- `grid-flow-col` - Fill columns first
- `grid-flow-dense` - Fill gaps with smaller items
- `grid-flow-row-dense` - Row flow with dense packing
- `grid-flow-col-dense` - Column flow with dense packing

## Implicit Row Sizing

Control the size of automatically created rows with `auto-rows-*`:

*Implicit Row Sizing — Example 2 — [Open example](https://stevekinney.com/generated/playgrounds/aaeb274785ae4979e0d008039941fe0550484a0b30322bc0081d7c4bb59c5e10.html)*

```html
<!-- New rows are 100px tall -->
<div class="grid auto-rows-[100px] grid-cols-3 gap-4 rounded-lg bg-gray-100 p-4">
  <div class="flex items-center justify-center rounded bg-blue-200 p-4">Item 1</div>
  <div class="flex items-center justify-center rounded bg-red-200 p-4">Item 2</div>
  <div class="flex items-center justify-center rounded bg-green-200 p-4">Item 3</div>
  <div class="flex items-center justify-center rounded bg-yellow-200 p-4">Item 4</div>
  <!-- In a 100px tall row -->
</div>

<!-- Responsive row sizing -->
<div class="mt-4 grid auto-rows-min grid-cols-2 gap-4 rounded-lg bg-gray-100 p-4 lg:auto-rows-max">
  <div class="rounded bg-purple-200 p-4">Content adapts to row sizing</div>
  <div class="rounded bg-pink-200 p-4">More content here</div>
</div>
```

Options:

- `auto-rows-auto` - Size based on content
- `auto-rows-min` - Minimum content size
- `auto-rows-max` - Maximum content size
- `auto-rows-fr` - Equal fraction of space
- `auto-rows-[200px]` - Custom size

## Implicit Column Sizing

Control the size of automatically created columns with `auto-cols-*`:

*Implicit Column Sizing — Example 3 — [Open example](https://stevekinney.com/generated/playgrounds/4855ec3595226ab06349664773adc6a405fc04a7ce99f61a7449cd1aec3c197a.html)*

```html
<!-- New columns are 200px wide -->
<div class="grid auto-cols-[200px] grid-flow-col grid-rows-2 gap-4 rounded-lg bg-gray-100 p-4">
  <div class="flex min-h-[80px] items-center justify-center rounded bg-blue-200 p-4">Item 1</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-red-200 p-4">Item 2</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-green-200 p-4">Item 3</div>
  <!-- In a 200px wide column -->
</div>
```

Options:

- `auto-cols-auto` - Size based on content
- `auto-cols-min` - Minimum content size
- `auto-cols-max` - Maximum content size
- `auto-cols-fr` - Equal fraction of space
- `auto-cols-[minmax(200px,1fr)]` - Custom sizing

## Dense Packing Example

*Dense Packing Example — Example 4 — [Open example](https://stevekinney.com/generated/playgrounds/442a4a84aa9ab6435fa2faa1297b1ebfee79e3877788e5cede6b8effad18cb6a.html)*

```html
<div class="grid grid-flow-row-dense grid-cols-3 gap-4 rounded-lg bg-gray-100 p-4">
  <div class="col-span-2 flex min-h-[80px] items-center justify-center rounded bg-blue-200 p-4">
    Large item
  </div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-red-200 p-4">Small 1</div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-green-200 p-4">Small 2</div>
  <div class="col-span-2 flex min-h-[80px] items-center justify-center rounded bg-blue-200 p-4">
    Large item
  </div>
  <div class="flex min-h-[80px] items-center justify-center rounded bg-yellow-200 p-4">Small 3</div>
  <!-- Dense packing fills gaps automatically -->
</div>
```

## Responsive Card Grid

*Responsive Card Grid — Example 5 — [Open example](https://stevekinney.com/generated/playgrounds/c1d09ad1ab0eb6437825792e64e413a53251aee75dcbd8480ea05e953270804f.html)*

```html
<div
  class="grid auto-rows-[minmax(200px,auto)] grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-4 rounded-lg bg-gray-100 p-4"
>
  <div class="flex items-center justify-center rounded bg-blue-200 p-4 lg:col-span-2">
    Featured card
  </div>
  <div class="flex items-center justify-center rounded bg-red-200 p-4">Regular card</div>
  <div class="flex items-center justify-center rounded bg-green-200 p-4">Regular card</div>
  <div class="flex items-center justify-center rounded bg-yellow-200 p-4">Regular card</div>
</div>
```

This creates a responsive layout where:

- Columns automatically adjust to screen size
- New rows are at least 200px tall
- Featured cards span 2 columns on large screens
- All items are auto-placed efficiently
