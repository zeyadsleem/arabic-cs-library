---
title: "Caret and Accent Color"
lang: en
source: "https://stevekinney.com/courses/tailwind/caret-and-accent-color"
---

Tailwind 4.0 provides utilities to control `caret-color` (text input cursor) and `accent-color` (form controls like checkboxes, radio buttons) directly in your HTML.

## Caret Color

`caret-color` styles the blinking cursor in inputs and textareas. Tailwind utilities map to this CSS property, using your theme’s colors or custom values.

### Setting Caret Color with Utilities

Use `caret-*` utilities (e.g., `caret-blue-600`, `caret-sky-400`) to set the cursor color.

Example:

*Setting Caret Color with Utilities — Example 1 — [Open example](https://stevekinney.com/generated/playgrounds/ff00a2cc124d342cb26afc3391c6e27d4810a0cccf07baffe9f7e738185be8ac.html)*

```html
<input type="text" class="border caret-rose-500" />
```

This generates CSS like `caret-color: var(--color-rose-500);`. Utilities like `caret-inherit`, `caret-current`, and `caret-transparent` are also available.

### Using Custom Values

For specific colors not in your theme, use arbitrary value syntax: `caret-[<value>]`.

```css
:root {
  --custom-cursor-color: #db2777;
  --brand-color: #2563eb;
}
```

Example:

*Using Custom Values — Example 2 — [Open example](https://stevekinney.com/generated/playgrounds/2b8a51608e058a33fc019f2c9bcfa7432d9a7462bef80c3f84cc9d164b612194.html)[CSS](#playground-css-caret-vars)*

```html
<input type="text" class="border caret-[#123456]" />
<input type="text" class="border caret-[var(--custom-cursor-color)]" />
```

### Responsive Caret Color

Apply `caret-*` utilities conditionally at different breakpoints using responsive prefixes (e.g., `md:caret-lime-600`).

Example:

*Responsive Caret Color — Example 3 — [Open example](https://stevekinney.com/generated/playgrounds/d6665cfeaf8e0f4bdb3bcc0a702cd56b0fc84a419e2cb5a4324b7e20753693be.html)*

```html
<input type="text" class="border caret-rose-500 md:caret-lime-600" />
```

### Customizing the Caret Color Scale

Extend or override the default color scale in your main CSS file using the `@theme` directive and `--color-*` namespace.

```css
@import 'tailwindcss';

@theme {
  --color-midnight: #1a1a2e;
  --color-tahiti: #3b82f6; /* Overrides blue-500 */
}
```

This makes `caret-midnight` and `caret-tahiti` available. These become CSS variables (e.g., `--color-midnight: #1a1a2e;`).
To replace the default scale, use `--color-*: initial;` before defining custom values.

## Accent Color

`accent-color` customizes the color of browser-generated form controls.

### Setting Accent Color with Utilities

Use `accent-*` utilities (e.g., `accent-indigo-500`) derived from your theme’s color palette.

Example:

*Setting Accent Color with Utilities — Example 4 — [Open example](https://stevekinney.com/generated/playgrounds/0c931f71bfdfc4ba1ae08b7f4f8877f1a9054da952c791e651bbe3bd52f30348.html)*

```html
<input type="checkbox" class="accent-rose-500" />
```

This generates `accent-color: var(--color-rose-500);`. `accent-inherit`, `accent-current`, and `accent-transparent` are also available.

### Changing Opacity

Adjust accent color opacity with `/<number>` (e.g., `accent-blue-500/50`). Browser support for accent color opacity is limited (mainly Firefox).

*Changing Opacity — Example 5 — [Open example](https://stevekinney.com/generated/playgrounds/2aa6856ca6e056663346258a8d5887b8beccdb9125b9e1eeff0f3cf42b63af8d.html)*

```html
<input type="checkbox" class="accent-blue-500/50" />
```

### Using Custom Values

Use arbitrary value syntax `accent-[<value>]` for custom accent colors.

*Using Custom Values — Example 6 — [Open example](https://stevekinney.com/generated/playgrounds/a4bc8565d8676d670451894942469eb4e43316835a145efb71abb15d05507d84.html)[CSS](#playground-css-caret-vars)*

```html
<input type="checkbox" class="accent-[#abcdef]" />
<input type="checkbox" class="accent-[var(--brand-color)]" />
```

### Responsive Accent Color

Apply `accent-*` utilities conditionally at different breakpoints (e.g., `lg:accent-pink-500`).

*Responsive Accent Color — Example 7 — [Open example](https://stevekinney.com/generated/playgrounds/f73f6a474403f6c58cc3c307aab422716ef44c7d4a125c8b712c99896875752c.html)*

```html
<input type="checkbox" class="accent-blue-500 lg:accent-pink-500" />
```

### Customizing the Accent Color Scale

Customize your color scale for accent colors using `@theme` and the `--color-*` namespace in your CSS.

```css
@import 'tailwindcss';

@theme {
  --color-primary-brand: oklch(70% 0.15 150);
}
```

Defining `--color-primary-brand` makes `accent-primary-brand` available. The CSS variable `--color-primary-brand: oklch(70% 0.15 150);` is generated.
Override defaults or clear the namespace (`--color-*: initial;`) as needed.
