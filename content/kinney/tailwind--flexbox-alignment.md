---
title: "Alignment"
lang: en
source: "https://stevekinney.com/courses/tailwind/flexbox-alignment"
---

Flexbox provides powerful alignment options along both the main and cross axes.

## Main Axis Alignment

Control distribution along the main axis with `justify-*` utilities:

- `justify-start` - Pack items at start (default)
- `justify-end` - Pack items at end
- `justify-center` - Center items
- `justify-between` - Equal space between items
- `justify-around` - Equal space around items
- `justify-evenly` - Equal space between items and edges

*Main Axis Alignment — Example 1 — [Open example](https://stevekinney.com/generated/playgrounds/f36a0f6b28818f4f69ffb94f6e5680d462948522bc7d02437e15617b740371a3.html)*

```html
<!-- Center navigation items -->
<nav class="flex justify-center gap-4">
  <a href="#" class="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">Home</a>
  <a href="#" class="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">About</a>
  <a href="#" class="rounded-lg bg-blue-500 px-4 py-2 text-white hover:bg-blue-600">Contact</a>
</nav>

<!-- Space between items -->
<div class="flex justify-between rounded-lg bg-gray-100 p-4">
  <button class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">Previous</button>
  <span class="self-center font-medium text-gray-700">Page 1 of 10</span>
  <button class="rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600">Next</button>
</div>
```

## Cross Axis Alignment

Align items perpendicular to the main axis:

- `items-start` - Align to start of cross axis
- `items-end` - Align to end of cross axis
- `items-center` - Center on cross axis
- `items-baseline` - Align text baselines
- `items-stretch` - Stretch to fill (default)

*Cross Axis Alignment — Example 2 — [Open example](https://stevekinney.com/generated/playgrounds/2c5a1069aa947db4bd498c6fd6297cc03ff59bf8997b13edbd48a0f610aa0014.html)*

```html
<!-- Vertically center items -->
<div class="flex h-20 items-center gap-3 rounded-lg bg-gray-100 px-4">
  <div class="h-8 w-8 flex-shrink-0 rounded-full bg-blue-500"></div>
  <span class="font-medium text-gray-700">Centered content</span>
</div>
```

## Individual Alignment

Override container alignment for specific items:

- `self-auto` - Use container’s alignment
- `self-start` - Align item to start
- `self-end` - Align item to end
- `self-center` - Center item
- `self-stretch` - Stretch item

*Individual Alignment — Example 3 — [Open example](https://stevekinney.com/generated/playgrounds/1fd4665b46d42e404e5e48bd7f1566bedfdc62b055472d26f21e6f126ca68542.html)*

```html
<div class="flex h-32 items-start gap-4 rounded-lg bg-gray-100 p-4">
  <div class="rounded bg-red-500 p-3 text-white">Top aligned</div>
  <div class="self-center rounded bg-green-500 p-3 text-white">Centered</div>
  <div class="self-end rounded bg-blue-500 p-3 text-white">Bottom aligned</div>
</div>
```

## Multi-line Alignment

For wrapped flex items, align entire lines:

- `content-start` - Pack lines at start
- `content-end` - Pack lines at end
- `content-center` - Center lines
- `content-between` - Space between lines
- `content-around` - Space around lines
- `content-evenly` - Even spacing

*Multi-line Alignment — Example 4 — [Open example](https://stevekinney.com/generated/playgrounds/134b2ae712f7c4bd0790cb7dbc3d51e3b4a45dd404f5b6829227f04c057e87e2.html)*

```html
<div class="flex h-64 flex-wrap content-center gap-4 rounded-lg bg-gray-100 p-4">
  <div class="h-20 w-32 rounded bg-purple-500 p-4 text-white">Item 1</div>
  <div class="h-20 w-32 rounded bg-pink-500 p-4 text-white">Item 2</div>
  <div class="h-20 w-32 rounded bg-indigo-500 p-4 text-white">Item 3</div>
  <div class="h-20 w-32 rounded bg-blue-500 p-4 text-white">Item 4</div>
  <div class="h-20 w-32 rounded bg-green-500 p-4 text-white">Item 5</div>
</div>
```
