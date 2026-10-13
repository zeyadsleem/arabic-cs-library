---
title: "Color Schemes"
lang: "en"
chapter: "tailwind"
slug: "tailwind-color-schemes"
order: 31
source: "https://stevekinney.com/courses/tailwind/tailwind-color-schemes"
---

Tailwind 4 uses CSS-first configuration with `@theme` for color management and the `color-scheme` property for native browser theming.

## The `color-scheme` Property

Controls how browsers render native UI elements (form controls, scrollbars, system colors):

*The color-scheme Property — Example 1 — [Open example](https://stevekinney.com/generated/playgrounds/3986b42760fe983571974aaa675ec496ec15bcfe29b214c3e8ce0b7a85f16566.html)*

```html
<!-- Apply to root for whole document -->
<html class="scheme-dark">
  <!-- Or specific elements -->
  <select class="scheme-light">
    <option>Light themed dropdown</option>
  </select>
</html>
```

### Available Utilities

- `scheme-normal` - Browser default
- `scheme-light` - Light color scheme
- `scheme-dark` - Dark color scheme
- `scheme-light-dark` - Supports both (browser chooses)
- `scheme-only-light` - Force light only
- `scheme-only-dark` - Force dark only

## Defining Color Palettes

Use `@theme` to define colors that generate utilities:

```css
@import 'tailwindcss';

@theme {
  /* Single colors */
  --color-primary: #007bff;
  --color-accent: oklch(71.7% 0.25 360);

  /* Color scales */
  --color-brand-50: oklch(0.97 0.01 250);
  --color-brand-500: oklch(0.56 0.18 250);
  --color-brand-900: oklch(0.28 0.09 250);
}
```

## Dark Mode Integration

### Default System Preference

*Default System Preference — Example 2 — [Open example](https://stevekinney.com/generated/playgrounds/22c30b0a6f5692e496716ee7f7f72ae3c0e1636b16e466bc4fe41574bba6de5b.html)*

```html
<!-- Automatic dark mode based on OS -->
<div class="bg-white dark:bg-gray-900">Adapts to system preference</div>
```

### Manual Theme Control

```css
/* Override dark variant to use class */
@custom-variant dark (&:where(.dark, .dark *));

@theme {
  --color-background: white;
  --color-text: black;
}

.dark {
  --color-background: #1a1a1a;
  --color-text: white;
}
```

## Complete Color System Example

```css
@import 'tailwindcss';

/* Define color scheme trigger */
@custom-variant dark (&:where([data-theme="dark"], [data-theme="dark"] *));

@theme {
  /* Semantic colors that change with theme */
  --color-surface: white;
  --color-surface-alt: #f5f5f5;
  --color-text: #1a1a1a;
  --color-text-muted: #666;

  /* Brand colors stay consistent */
  --color-brand: #5b21b6;
  --color-success: #10b981;
  --color-danger: #ef4444;
}

/* Dark theme overrides */
[data-theme='dark'] {
  --color-surface: #1a1a1a;
  --color-surface-alt: #2a2a2a;
  --color-text: #f5f5f5;
  --color-text-muted: #999;
}
```

```css
@custom-variant dark (&:where([data-theme='dark'], [data-theme='dark'] *));

@theme {
  --color-surface: white;
  --color-surface-alt: #f5f5f5;
  --color-text: #1a1a1a;
  --color-brand: #5b21b6;
}

[data-theme='dark'] {
  --color-surface: #1a1a1a;
  --color-surface-alt: #2a2a2a;
  --color-text: #f5f5f5;
}
```

## Using Theme Colors

### In Utilities

*In Utilities — Example 3 — [Open example](https://stevekinney.com/generated/playgrounds/4628227dd3fb8306b7eb72ac11709a834d3e11d1478bdf8ec0577567df85269b.html)[CSS](#playground-css-semantic-colors)*

```html
<div class="bg-surface text-text border-surface-alt">Automatically themed content</div>
```

### In Custom CSS

```css
.card {
  background: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-surface-alt);
}
```

### In Arbitrary Values

*In Arbitrary Values — Example 4 — [Open example](https://stevekinney.com/generated/playgrounds/ebb34efbc0bb013bc0991bc30b67de2b3ee9de0dd7e65b6bb7bd9da7a9eb3351.html)[CSS](#playground-css-semantic-colors)*

```html
<!-- Long form -->
<div class="shadow-[0_2px_8px_var(--color-text)/10]">...</div>

<!-- Shorthand -->
<div class="bg-(--color-brand)/20">...</div>
```

## Best Practices

1. **Use semantic color names** that describe purpose, not appearance
2. **Set `color-scheme` on root** for consistent native UI
3. **Test with forced colors** mode for accessibility
4. **Provide theme toggle** that respects system preference
5. **Use CSS variables** for runtime theme switching
