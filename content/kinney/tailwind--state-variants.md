---
title: "State Variants"
lang: en
source: "https://stevekinney.com/courses/tailwind/state-variants"
---

State variants apply utility classes conditionally based on element state or context. Prefix any utility with a variant name and colon: `hover:bg-blue-500`, `md:text-lg`.

Key difference from CSS: Tailwind uses separate classes for each state rather than bundling multiple states in one class. The variant class only applies during that specific state.

## Types of State Variants

### Pseudo-classes

**Interactive:** `hover`, `focus`, `active`, `visited`, `focus-within`, `focus-visible`

**Structural:** `first`, `last`, `odd`, `even`, `only-child`, `first-of-type`, `last-of-type`, `only-of-type`, `nth-of-type()`

**Form:** `required`, `disabled`, `invalid`, `read-only`, `indeterminate`, `checked`

**Special:** `target`, `placeholder-shown`, `details-content`, `autofill`

### Pseudo-elements

- `before` and `after`
- `placeholder` (form inputs)
- `file` (file input buttons)
- `marker` (list items)
- `selection` (selected text)
- `first-line` and `first-letter`
- `backdrop` (dialogs)

### Media and Feature Queries

**Responsive:** `sm`, `md`, `lg`, `xl`, `2xl` (viewport widths)

**Container Queries:** `@sm`, `@md`, `@max-sm`, `@max-md` (parent container size)

- Named containers: `@sm/{name}`

**User Preferences:**

- `dark` (dark mode)
- `motion-reduce`, `motion-safe`
- `contrast-more`, `contrast-less`
- `forced-colors`, `not-forced-colors`
- `inverted-colors`
- `portrait`, `landscape`
- `print`

**Pointer:** `pointer-fine`, `pointer-coarse`, `pointer-none`

**Feature Detection:** `supports-[...]`, `not-supports-[...]`

### Attribute Selectors

- **ARIA:** `aria-*` (e.g., `aria-checked`)
- **Data:** `data-*` (e.g., `data-active`)
- **Direction:** `rtl`, `ltr`
- **State:** `open` (details/dialog), `inert`

### Child Selectors

- `*` - Direct children only
- `**` - All descendants

## Special Variant Patterns

**`group-*`** - Style based on parent state (parent needs `group` class)

*Special Variant Patterns — Example 1 — [Open example](https://stevekinney.com/generated/playgrounds/638abe229a95cd6344e7fa25e60ea71ae27d7ec97c6526f18a9109927e41f077.html)*

```html
<div class="group">
  <button class="group-hover:bg-blue-500">...</button>
</div>
```

**`peer-*`** - Style based on previous sibling state (sibling needs `peer` class)

*Special Variant Patterns — Example 2 — [Open example](https://stevekinney.com/generated/playgrounds/7ac62de32231009240c8f6b744f36497f07bfb74e59fbd2a6f0a3000b42a9ba3.html)*

```html
<input class="peer" /> <span class="peer-invalid:block">Error</span>
```

**`has-*`** - Style based on descendant state

*Special Variant Patterns — Example 3 — [Open example](https://stevekinney.com/generated/playgrounds/67896f0a32fd3cd54eeb152ae0b7adc1d760b36518e829d789f2305e2d9ac148.html)*

```html
<div class="has-[:focus]:ring">...</div>
```

**`in-*`** - Style based on any parent state (no class needed)

## Stacking Variants

Combine multiple conditions: `dark:md:hover:bg-blue-500`

**v4 change:** Stacking order is now left-to-right (was right-to-left in v3)

## Custom Variants

**Arbitrary:** `[&.is-dragging]:cursor-grabbing`

**Reusable:** Define with `@custom-variant` in CSS

##Tailwind 4 Changes

- `hover` only applies when device supports hover
- `nth-*` variants accept any number by default
- Boolean `data-*` attributes don’t need brackets
