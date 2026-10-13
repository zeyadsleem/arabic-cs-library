---
title: "Breakpoint Utilities"
lang: en
source: "https://stevekinney.com/courses/tailwind/breakpoint-utilities"
---

Tailwind uses a mobile-first approach: un-prefixed utilities apply to all sizes, prefixed utilities apply from that breakpoint up.

## Default Breakpoints

- `sm`: 640px and up
- `md`: 768px and up
- `lg`: 1024px and up
- `xl`: 1280px and up
- `2xl`: 1536px and up

## Basic Usage

*Basic Usage — Example 1 — [Open example](https://stevekinney.com/generated/playgrounds/a6c7ba15ac0f1fb23100cf9b826687f4d73c8c64a73c68430d69ac460e6b6e92.html)*

```html
<!-- Mobile-first design -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
  <!-- 1 column on mobile, 2 on medium, 3 on large -->
</div>

<!-- Show/hide at breakpoints -->
<div class="hidden lg:block">Only visible on large screens</div>
<div class="block lg:hidden">Hidden on large screens</div>
```

## Targeting Ranges

### Maximum Width Variants

Use `max-*` to apply styles below a breakpoint:

*Maximum Width Variants — Example 2 — [Open example](https://stevekinney.com/generated/playgrounds/7c688b6a5bfcad03184b34e10cc0e9c6d5431765f56cf9926afe17f2441647e4.html)*

```html
<!-- Only on mobile -->
<div class="block max-sm:hidden">Hidden on mobile only</div>

<!-- Medium screens only -->
<div class="hidden max-lg:hidden md:block">Visible between 768px-1024px</div>
```

### Stacking for Ranges

*Stacking for Ranges — Example 3 — [Open example](https://stevekinney.com/generated/playgrounds/a71b4079ae617b7def170a51956da3a391c2b2538b6959259b811c1f917469ad.html)*

```html
<!-- Apply only between md and lg -->
<div class="md:max-lg:bg-blue-500">Blue background on medium screens only</div>
```

## Arbitrary Breakpoints

One-off custom breakpoints:

*Arbitrary Breakpoints — Example 4 — [Open example](https://stevekinney.com/generated/playgrounds/cc56ebb0bce5b4f74c352a2aa0d7286606b37dec342d9c645859df6f4f86f8a1.html)*

```html
<!-- Min width -->
<div class="min-[850px]:flex">Flex at 850px+</div>

<!-- Max width -->
<div class="max-[1200px]:hidden">Hidden below 1200px</div>

<!-- Range -->
<div class="min-[600px]:max-[900px]:bg-gray-100">Gray between 600-900px</div>
```

## Customizing Breakpoints

Define custom breakpoints in `@theme`:

```css
@import 'tailwindcss';

@theme {
  /* Add new breakpoints */
  --breakpoint-xs: 475px;
  --breakpoint-3xl: 1920px;

  /* Override defaults */
  --breakpoint-md: 850px;

  /* Remove a default */
  --breakpoint-2xl: initial;
}
```

## Container Queries

Style based on parent container size, not viewport:

### Basic Container Queries

*Basic Container Queries — Example 5 — [Open example](https://stevekinney.com/generated/playgrounds/0764db1c435470de16ea36bce5c4a4cbeefcffc1ad213cf9d332d462ab4ea66f.html)*

```html
<!-- Mark parent as container -->
<div class="@container">
  <!-- Style children based on container size -->
  <div class="grid @md:grid-cols-2 @lg:grid-cols-3">
    <!-- Responsive to container, not viewport -->
  </div>
</div>
```

### Named Containers

*Named Containers — Example 6 — [Open example](https://stevekinney.com/generated/playgrounds/77a4fc681bf6d3b786b9366f569db29c848cb325c365acddca7f879f1e8468dd.html)*

```html
<!-- Named container -->
<div class="@container/sidebar">
  <nav class="@sm/sidebar:flex">...</nav>
</div>

<!-- Another named container -->
<div class="@container/main">
  <article class="@lg/main:prose-lg">...</article>
</div>
```

### Container Sizes

Default container breakpoints match viewport ones:

- `@sm`: 640px container
- `@md`: 768px container
- etc.

Customize in `@theme`:

```css
@theme {
  --container-xs: 320px;
  --container-3xl: 1600px;
}
```

### Arbitrary Container Queries

*Arbitrary Container Queries — Example 7 — [Open example](https://stevekinney.com/generated/playgrounds/7b2008710754ff6269158c4af09ac0c6680ee80343055acbb6a1f25e4f518efb.html)*

```html
<div class="@container">
  <div class="@max-[600px]:block @min-[400px]:flex">Custom container breakpoints</div>
</div>
```

## Complex Responsive Patterns

### Combining with Other Variants

*Combining with Other Variants — Example 8 — [Open example](https://stevekinney.com/generated/playgrounds/7a2b468ecff5d64542dc0d8d1e130934f22c329515c01ea17a92fdc6834d2504.html)*

```html
<!-- Dark mode + responsive + hover -->
<button
  class="bg-gray-100 hover:bg-gray-200 md:bg-white md:hover:bg-gray-50 dark:bg-gray-900 dark:hover:bg-gray-800 dark:md:bg-gray-950 dark:md:hover:bg-gray-900"
>
  Complex responsive button
</button>
```

### Responsive Typography

*Responsive Typography — Example 9 — [Open example](https://stevekinney.com/generated/playgrounds/0dd673cd2806f56d6da2f3a3a019524643de28fe03a4d84dbdafdea6f2db1a30.html)*

```html
<h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">Scales with viewport</h1>

<div class="@container">
  <h2 class="text-xl @sm:text-2xl @md:text-3xl">Scales with container</h2>
</div>
```

## Best Practices

1. **Start mobile-first** - Build for small screens, enhance for larger
2. **Use semantic breakpoints** - Match your design’s natural break points
3. **Container queries for components** - More portable than viewport queries
4. **Test at all sizes** - Don’t just test at exact breakpoints
5. **Avoid too many breakpoints** - Usually 3-4 is enough
