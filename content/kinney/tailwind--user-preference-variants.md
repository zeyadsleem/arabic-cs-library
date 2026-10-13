---
title: "User Preference Variants"
lang: en
source: "https://stevekinney.com/courses/tailwind/user-preference-variants"
---

Tailwind provides variants for responding to user preferences and system settings, keeping adaptive styles right in your HTML.

## Dark Mode

**Basic usage:**

*Dark Mode — Example 1 — [Open example](https://stevekinney.com/generated/playgrounds/26ada99ff29a65a07ae4ad3cedb0b0d9fa092182397149d9dcbaa0ebe29b1768.html)*

```html
<div class="bg-white text-gray-900 dark:bg-gray-800 dark:text-white">Adapts to dark mode</div>
```

```css
@custom-variant dark (&:where([data-theme='dark'], [data-theme='dark'] *));
```

**Manual theme switching:** Configure dark mode to use a selector instead of system preference:

*Dark Mode — Example 2 — [Open example](https://stevekinney.com/generated/playgrounds/b9a2067bac77deaa8a280078ac50f67272408214c2c40f8cbd213b47f7d00377.html)[CSS](#playground-css-manual-dark)*

```html
<div data-theme="dark">
  <div class="dark:bg-gray-800 dark:text-white">Controlled by data-theme</div>
</div>
```

## Motion Preferences

**Reduce animations for accessibility:**

*Motion Preferences — Example 3 — [Open example](https://stevekinney.com/generated/playgrounds/b68a1cdbf73d8993b904c614e81a8203ca7507ea9234f8dc59ad01e7b355cea6.html)*

```html
<!-- Disable animation when reduced motion preferred -->
<div class="inline-block animate-spin motion-reduce:animate-none">Loading...</div>

<!-- Only animate when motion is safe -->
<button class="motion-safe:transition motion-safe:hover:scale-105">Hover me</button>
```

## Contrast and Colors

**High contrast modes:**

*Contrast and Colors — Example 4 — [Open example](https://stevekinney.com/generated/playgrounds/f4da54758b7f164ec12dea78aa0a521532e59d63feb3ac352296f5be27b5e2ee.html)*

```html
<button class="border-gray-300 contrast-more:border-black contrast-less:border-gray-200">
  Adapts to contrast preference
</button>
```

**Forced colors (Windows High Contrast):**

*Contrast and Colors — Example 5 — [Open example](https://stevekinney.com/generated/playgrounds/d0f4097ca47f6bc7b9af83f5cabdbeffcddc253d0f83d76fdd1dcff1d46a4cd9.html)*

```html
<div class="bg-blue-500 forced-colors:bg-[Highlight] forced-colors:text-[HighlightText]">
  Uses system colors in forced-colors mode
</div>
```

## Input Methods

**Adapt to pointing devices:**

*Input Methods — Example 6 — [Open example](https://stevekinney.com/generated/playgrounds/c80c50563aa0110addc39e7c898d636aecda4d8ce88b4670497b9d9164f27eb4.html)*

```html
<!-- Larger targets for touch -->
<button class="p-2 pointer-coarse:p-4">Touch-friendly button</button>

<!-- Fine interactions for mouse users -->
<div class="pointer-fine:hover:underline">Hover only with mouse</div>
```

**Note:** In Tailwind 4, `hover:` only applies when primary device supports hover.

## Other Preferences

**Orientation:**

*Other Preferences — Example 7 — [Open example](https://stevekinney.com/generated/playgrounds/012d1ac76a8ff4f3eb074564972622353661a24e8d1ecef26e58cac33c4b8a81.html)*

```html
<div class="grid grid-cols-1 gap-2 landscape:grid-cols-2">
  <div class="rounded bg-blue-100 p-2">First column</div>
  <div class="rounded bg-blue-100 p-2">Second column</div>
</div>
```

**Print styling:**

*Other Preferences — Example 8 — [Open example](https://stevekinney.com/generated/playgrounds/4ea314c616087d52037d946859f2277abdeaeb069953682eb34f9080818637cd.html)*

```html
<nav class="print:hidden">Navigation</nav>
<article class="print:bg-white print:text-black">Print-friendly content</article>
```

**JavaScript detection:**

*Other Preferences — Example 9 — [Open example](https://stevekinney.com/generated/playgrounds/da330565bff89e1fcb5c79b8cfe1678e8de9e2781e583dd87c5bac6818169b61.html)*

```html
<noscript class="hidden noscript:block"> Please enable JavaScript </noscript>
```

## Feature Detection

**CSS feature support:**

*Feature Detection — Example 10 — [Open example](https://stevekinney.com/generated/playgrounds/bf1b0bd98313856d2f5c2da5b512f0a3415c8cec11a686a0ef35262b4e30038e.html)*

```html
<!-- Basic support check -->
<div class="supports-[display:grid]:grid">Uses grid if supported</div>

<!-- Complex queries -->
<div class="supports-[(display:grid)_and_(gap:1rem)]:grid-flow-col">Advanced grid features</div>
```

**Custom feature shortcuts:**

```css
@theme {
  --supports-container-queries: [(container-type: inline-size)];
}
```

## Starting Styles (v4)

Animate elements when they first appear:

*Starting Styles (v4) — Example 11 — [Open example](https://stevekinney.com/generated/playgrounds/6ee258362bffa57e4a2e8b2704a2295807fbc3fe6193b2fd4ab841ba65558bf6.html)*

```html
<div class="transition-opacity duration-300 starting:opacity-0">Fades in on appearance</div>
```

## Best Practices

1. **Always provide fallbacks** - Don’t rely solely on preference variants
2. **Test all modes** - Check dark mode, reduced motion, etc.
3. **Use semantic system colors** for forced-colors mode
4. **Remember class detection** - Complete class names must exist in source
