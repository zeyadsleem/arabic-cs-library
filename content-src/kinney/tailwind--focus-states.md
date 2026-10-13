---
title: "Focus States"
lang: "en"
chapter: "tailwind"
slug: "focus-states"
order: 13
source: "https://stevekinney.com/courses/tailwind/focus-states"
---

## `focus`: Always Shows

`focus:` triggers on any focus event (mouse, keyboard, programmatic).

*focus: Always Shows — Example 1 — [Open example](https://stevekinney.com/generated/playgrounds/10f6729c08a6dcb5eb7a5946b73f8b3df00e2c6a0a59cdef7dba908aa3c4ce80.html)*

```html
<button class="bg-blue-200 px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none">
  Click or tab
</button>
```

**Always** use focus for form controls where users need clear feedback regardless of input method.

*focus: Always Shows — Example 2 — [Open example](https://stevekinney.com/generated/playgrounds/992d927ca393c6a59fb75b7aca3504408e0f6b13f1471c34ded2ce9693b20de0.html)*

```html
<input class="rounded-md bg-white px-3 py-1.5 outline-2 outline-slate-300 focus:outline-pink-400" />
```

For skip links, main navigation, or accessibility-critical elements. These elements should be immediately obvious when focused, regardless of how focus was achieved.

```html
<a href="#main-content" class="outline-offset-4 focus:outline-2 focus:outline-blue-500">
  Skip to main content
</a>
```

You also want it when you’re trying to show an error state.

*focus: Always Shows — Example 3 — [Open example](https://stevekinney.com/generated/playgrounds/bbe3237381722093ea7b2f4965a2884843bbabf44c20662e800189288fb4508c.html)*

```html
<input
  type="email"
  placeholder="Email"
  class="focus:-outline-2 block rounded-md border-2 border-slate-300 bg-white px-3 py-1.5 placeholder:text-slate-400 valid:outline-green-500 invalid:outline-red-500"
  required
/>
```

## `focus-visible`: Smart Detection

Shows focus only when needed (keyboard navigation, not mouse clicks).

*focus-visible: Smart Detection — Example 4 — [Open example](https://stevekinney.com/generated/playgrounds/a175b9f7bdfe40f1a1c7172b8f49bb74e4e59072014973ba267eca945e8bd1be.html)*

```html
<button
  class="bg-blue-200 px-3 py-2 hover:bg-blue-300 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:outline-none active:bg-blue-400"
>
  Smart Focus
</button>
```

Browser heuristics determine when to show focus—typically for keyboard users only.

## `focus-within`: Parent Styling

Styles parent when any child has focus.

*focus-within: Parent Styling — Example 5 — [Open example](https://stevekinney.com/generated/playgrounds/259b5bc78d350837318cf10940a41d8e0e0b70419f695b630e812310f79ff29e.html)*

```html
<div
  class="space-y-4 border-2 border-gray-300 p-4 focus-within:border-blue-500 focus-within:shadow-lg"
>
  <input
    type="email"
    placeholder="Email"
    class="block rounded-md bg-white px-3 py-1.5 outline-2 placeholder:text-slate-400 focus:outline-indigo-600"
  />
  <input
    type="password"
    placeholder="password"
    class="block rounded-md bg-white px-3 py-1.5 outline-2 placeholder:text-slate-400 focus:outline-indigo-600"
  />
</div>
```

Container highlights when either input is focused.

## Browser Support

`focus-visible` has good modern browser support. For fallbacks:

*Browser Support — Example 6 — [Open example](https://stevekinney.com/generated/playgrounds/b14e9b0490e3fcf75c954d58933a1e4e1d32a613aafa9b350f76c58691ea4e83.html)*

```html
<button class="focus:ring-2 focus-visible:ring-2">Fallback support</button>
```

## Quick Reference

- **`focus:`** - Always shows (mouse & keyboard)
- **`focus-visible:`** - Smart detection (keyboard only)
- **`focus-within:`** - Parent styling when children focused
