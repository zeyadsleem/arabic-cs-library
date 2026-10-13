---
title: "Multi-Directional Layouts"
lang: en
source: "https://stevekinney.com/courses/tailwind/flexbox-multi-directional-layouts"
---

Adapting layouts for multiple text directions (LTR and RTL) is crucial for global web applications. Traditional CSS, using physical properties like `left` and `right`, makes this complex. Tailwind 4 uses modern CSS logical properties and directional variants for more intuitive multi-directional layouts. While Flexbox arranges items, Tailwind’s directionality handling relies on these logical properties and variants, applicable within any layout, including Flexbox.

## The Challenge of Directionality

Traditional CSS properties like `margin-left` are physical. For LTR, `margin-left` adds space. For RTL, you’d need `margin-right` and reset `margin-left`, leading to duplicated and complex code.

## Embracing Logical Properties

Modern CSS logical properties adapt to writing mode and text direction. Instead of `margin-left` and `margin-right`, use `margin-inline-start` and `margin-inline-end`. `margin-inline-start` is where inline content begins (left in LTR, right in RTL), and `margin-inline-end` is where it ends. Similar logical properties include `padding-inline-start`, `border-inline-end`, `float: inline-start`, and `clear: inline-end`.

Tailwind CSS uses these logical properties for utilities that automatically adapt to text direction.

## Tailwind’s Directional Utilities and Variants

Tailwind manages directionality via:

1. Specific variants (`ltr:`, `rtl:`) for conditional styling.
2. Utilities mapping to logical properties.

### Directional Variants: `ltr:` and `rtl:`

Apply any utility conditionally based on text direction using `ltr:` and `rtl:` variants, similar to responsive (`md:`) or state (`hover:`) variants.

*Directional Variants: ltr: and rtl: — Example 1 — [Open example](https://stevekinney.com/generated/playgrounds/13ef50714bfcb92fa53b3665639210879e18b4651cfefcecf5eac148afc3b109.html)*

```html
<div dir="ltr" class="mb-4 rounded-lg bg-gray-100 p-6">
  <div class="rounded-lg bg-blue-500 p-4 text-left text-white rtl:text-right">Item 1</div>
</div>

<div dir="rtl" class="rounded-lg bg-gray-100 p-6">
  <div class="rounded-lg bg-green-500 p-4 text-left text-white rtl:text-right">Item 2</div>
</div>
```

`text-left` applies by default. If `dir="rtl"`, `rtl:text-right` overrides it.

### Logical Property Utilities

Tailwind utilities corresponding to CSS logical properties automatically render the correct physical property based on text direction (often from the `dir` attribute).

Common mappings:

- **Inline Margin:** `ms-*` (`margin-inline-start`), `me-*` (`margin-inline-end`). `mx-*` maps to `margin-inline` (both sides). `ms-4`: `margin-left` in LTR, `margin-right` in RTL. `me-4`: `margin-right` in LTR, `margin-left` in RTL.
  - `ms-4`: `margin-left` in LTR, `margin-right` in RTL.
  - `me-4`: `margin-right` in LTR, `margin-left` in RTL.
- **Space Between Children:** `space-x-*` utilities use `margin-inline-start` and `margin-inline-end` for horizontal spacing, adapting to direction. `space-x-reverse` reverses this.
- **Inline Padding:** `ps-*` (`padding-inline-start`), `pe-*` (`padding-inline-end`). `px-*` maps to `padding-inline`. `ps-4`: `padding-left` in LTR, `padding-right` in RTL. `pe-4`: `padding-right` in LTR, `padding-left` in RTL.
  - `ps-4`: `padding-left` in LTR, `padding-right` in RTL.
  - `pe-4`: `padding-right` in LTR, `padding-left` in RTL.
- **Float:** `float-start` (`float: inline-start`), `float-end` (`float: inline-end`).
- **Clear:** `clear-start` (`clear: inline-start`), `clear-end` (`clear: inline-end`).
- **Text Alignment:** `text-start` (`text-align: start`), `text-end` (`text-align: end`).
- **Border Radius:** `rounded-s-*`, `rounded-e-*`, etc., use logical properties.
- **Border Width/Color/Style:** `border-s-*`, `border-e-*`, `divide-s-*`, `divide-e-*` use logical properties for inline borders. `divide-x-*` also uses logical properties. `divide-x-reverse` reverses horizontal dividers.
- **Inset (Positioning):** `start-*` (`inset-inline-start`), `end-*` (`inset-inline-end`) for positioned elements. `start-0`: Positions at the start edge (left in LTR, right in RTL). `end-0`: Positions at the end edge (right in LTR, left in RTL).
  - `start-0`: Positions at the start edge (left in LTR, right in RTL).
  - `end-0`: Positions at the end edge (right in LTR, left in RTL).

(Block margin/padding utilities like `my-*` and `py-*` map to `margin-block` and `padding-block` respectively, which are not typically affected by LTR/RTL text direction but by vertical writing modes.)

### Combining with Flexbox

Flexbox’s main and cross axes adapt to `flex-direction` and text direction. For `flex-direction: row` (`flex-row`), the main axis is left-to-right in LTR, and right-to-left in RTL. `justify-content: flex-start` aligns items to the main axis start (left in LTR `flex-row`, right in RTL `flex-row`).

Tailwind’s core Flexbox utilities (`flex`, `flex-row`, `justify-start`, etc.) work within this adaptive model.

For specific directional overrides within Flexbox not handled by axis logic, use `rtl:`/`ltr:` variants or logical property utilities.

Example: Overriding default alignment in RTL.

*Combining with Flexbox — Example 2 — [Open example](https://stevekinney.com/generated/playgrounds/90bcad8b5d2ccf9c3ea03d0a87f06c9d844c4a8213516467e14478d501e7d3f5.html)*

```html
<div class="flex justify-start gap-4 rounded-lg bg-gray-100 p-6 rtl:justify-end">
  <div class="rounded-lg bg-blue-500 p-4 text-white">Item 1</div>
  <div class="rounded-lg bg-green-500 p-4 text-white">Item 2</div>
</div>
```

Items align `start` by default. In RTL, `rtl:justify-end` aligns them to `end`.

Example: Individual item alignment.

*Combining with Flexbox — Example 3 — [Open example](https://stevekinney.com/generated/playgrounds/989f928757cc2f3c44a837144609724bd3a7f44609f50b95613d87d3becfee37.html)*

```html
<div class="flex min-h-[200px] items-center gap-4 rounded-lg bg-gray-100 p-6">
  <div class="self-start rounded-lg bg-blue-500 p-4 text-white rtl:self-end">Item 1</div>
  <div class="self-center rounded-lg bg-green-500 p-4 text-white">Item 2</div>
  <div class="self-end rounded-lg bg-purple-500 p-4 text-white rtl:self-start">Item 3</div>
</div>
```

Item 1 is `self-start` (RTL: `self-end`). Item 3 is `self-end` (RTL: `self-start`). Item 2 is `self-center`.

Logical property utilities like `ms-*` and `ps-*` are useful for direction-dependent spacing:

*Combining with Flexbox — Example 4 — [Open example](https://stevekinney.com/generated/playgrounds/70a8de37c3cc878ac74898e0947be5be7ebbbb0c37dc6d9a8a2fd7cea1c1449e.html)*

```html
<div class="flex items-center gap-2 rounded-lg bg-gray-100 p-4">
  <svg class="me-2 size-6 text-blue-500">
    <rect width="24" height="24" fill="currentColor" />
  </svg>
  <span class="text-gray-800">Button Text</span>
</div>
```

`me-2` adds margin to the icon’s “end” side (right in LTR, left in RTL), creating space between icon and text. (The `rtl:ms-2` in the original example might be for specific overrides if `me-2` isn’t sufficient, but `me-*` often handles this.)

## Responsive and Container-Aware Directionality

`rtl:`/`ltr:` variants and logical property utilities combine with responsive (`sm:`, `md:`) and container query (`@md:`) variants.

*Responsive and Container-Aware Directionality — Example 5 — [Open example](https://stevekinney.com/generated/playgrounds/eef75105c67deb56989369c3ec51a6cbbece6fb9b42ac12c701e9a65e0407374.html)*

```html
<div
  class="@container flex flex-col gap-4 rounded-lg bg-gray-100 p-6 @md:flex-row rtl:@md:flex-row-reverse"
>
  <div
    class="size-full min-h-[150px] rounded-lg bg-blue-500 p-4 pe-4 text-white @md:size-1/2 rtl:pe-0 rtl:@md:ps-4"
  >
    Left/Start Column
  </div>
  <div
    class="size-full min-h-[150px] rounded-lg bg-green-500 p-4 ps-4 text-white @md:size-1/2 rtl:ps-0 rtl:@md:pe-4"
  >
    Right/End Column
  </div>
</div>
```

This layout stacks columns by default. At `@md` container size, it becomes a row (`@md:flex-row`). In RTL at `@md` or larger, the row reverses (`rtl:@md:flex-row-reverse`). Padding adjusts using logical properties and directional variants.

## Conclusion

For multi-directional Flexbox layouts, Tailwind relies on CSS logical properties (`ms-*`, `pe-*`, etc.) and `rtl:`/`ltr:` variants. These create layouts that adapt to text direction, simplifying internationalization. Combined with responsive design, this enables truly adaptive UIs.
