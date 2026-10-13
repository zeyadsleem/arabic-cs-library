---
title: "Borders, Outlines, and Rings"
lang: "en"
chapter: "tailwind"
slug: "border-outline-ring"
order: 10
source: "https://stevekinney.com/courses/tailwind/border-outline-ring"
---

There are *different* ways to draw lines around elements, and they all behave completely *differently*. (Of course they do, right?) Let’s build some examples to see how `border`, `outline`, and `ring` actually work in practice.

## Starting with a Simple Button

Let’s start with a basic button to see how each approach affects the layout.

*Starting with a Simple Button — Example 1 — [Open example](https://stevekinney.com/generated/playgrounds/b4d66028b22562890b7528af6237e16f6918d5292f34c937a61963dca2dabbe6.html)*

```html
<button class="rounded-md bg-blue-600 px-3 py-2 text-white">Button</button>
```

Nothing fancy here—just a blue button with some padding and rounded-md corners. Now let’s see what happens when we add different types of “borders” to it.

## Borders: Shifty Business

Let’s add a border using Tailwind’s `border` utilities:

*Borders: Shifty Business — Example 2 — [Open example](https://stevekinney.com/generated/playgrounds/ffd7c7b15847cec6a1382dd5fd856e0930c0c89d565a0ed98184a762f68430aa.html)*

```html
<button class="rounded-md border-4 border-pink-400 bg-blue-600 px-3 py-2 text-white">
  Click me!
</button>
```

The `border-4` class adds a 4px border all around the button. But here’s the thing—that border actually makes the button bigger. The button now takes up more space on the page because borders are part of the CSS box model.

If we want to see this in action, let’s put two buttons side by side:

*Borders: Shifty Business — Example 3 — [Open example](https://stevekinney.com/generated/playgrounds/e856511e1d9624d98934f0628ea53c0bad9f0f72d24a0c38a067f95720436931.html)*

```html
<div class="space-x-4 p-4">
  <button class="rounded-md bg-blue-600 px-3 py-2 text-white">No border</button>
  <button class="rounded-md border-4 border-pink-400 bg-blue-600 px-3 py-2 text-white">
    With border
  </button>
</div>
```

You’ll notice the second button is visibly larger—that’s the border adding to the element’s total size. This gets even worse if we use a `hover:` to add the border.

## The Layout Shift Problem

This size difference becomes a real problem when you want to add borders on hover or focus. Watch what happens:

*The Layout Shift Problem — Example 4 — [Open example](https://stevekinney.com/generated/playgrounds/1e957c2d1ca880977fac1adc68e4781bdc1b72395d4f1e63d3ec120ff623da6d.html)*

```html
<div class="space-x-4 p-4">
  <button class="rounded-md bg-blue-600 px-3 py-2 text-white">No border</button>
  <button class="rounded-md border-pink-400 bg-blue-600 px-3 py-2 text-white hover:border-4">
    With border
  </button>
</div>
```

When you hover over this button, it suddenly gets bigger and pushes everything around it. Not great for user experience—it feels janky and unprofessional.

## Outlines: A Respectable Alternative

This is where `outline` comes in handy. Outlines draw outside the element without affecting its size:

*Outlines: A Respectable Alternative — Example 5 — [Open example](https://stevekinney.com/generated/playgrounds/7cbd02d5c0e9d184c0f80b5b4a76d9de8186ef7ad0b3b06c127be8e65daa51ba.html)*

```html
<div class="space-x-4 p-4">
  <button class="rounded-md bg-blue-600 px-3 py-2 text-white">No border</button>
  <button class="rounded-md bg-blue-600 px-3 py-2 text-white outline-pink-400 hover:outline-4">
    With border
  </button>
</div>
```

Now when you hover, you get the visual feedback without any layout jumping around. Much better! The `outline-4` class creates a 4px outline that floats outside the button.

## Outlines for Focus States

Outlines are perfect for accessibility because screen readers and keyboard users rely on focus indicators:

*Outlines for Focus States — Example 6 — [Open example](https://stevekinney.com/generated/playgrounds/c5da3222ad628fc2d90d8d847da33c701a951f0131fc1d37b6c252ac216ebffc.html)*

```html
<button
  class="rounded-md bg-blue-600 px-3 py-2 text-white focus:outline-2 focus:outline-offset-2 focus:outline-pink-400"
>
  Accessible button
</button>
```

The `focus:outline-offset-2` class adds a 2px gap between the button and the outline, which makes it easier to see. This is exactly the kind of thing that makes your site more usable for everyone.

## The Outline Limitation

> **This will look totally fine in modern browsers.**
>
> The issue below was actually fixed in around mid-2023 across all of the major browers. So, you’re unlikely to see anything off here.
>
> That said, if you still need to support older browsers, then let’s just pretend we see something wrong here.

But outlines have one annoying limitation—they don’t respect `border-radius` in older browsers. If you have a circular element, the outline will still be square.

*The Outline Limitation — Example 7 — [Open example](https://stevekinney.com/generated/playgrounds/65af5962b22520d945e6e5f16f331201b03e9863857af0e663ba46fcae21cb30.html)*

```html
<div class="h-16 w-16 rounded-full bg-green-500 outline-4 outline-green-700">
  <!-- Square outline on round element -->
</div>
```

## Rings: Do They *Really* Exist?

Borders and outlines are Real Things™ in CSS. But, `ring`… isn’t. It’s *technically* just a box shadow that *looks* like an outline.

*Rings: Do They Really Exist? — Example 8 — [Open example](https://stevekinney.com/generated/playgrounds/48b87d71b1a79c0f9aef95126e15703893018d10f40a788f2c3749035712b39c.html)*

```html
<div class="h-16 w-16 rounded-full bg-green-500 ring-4 ring-green-700">
  <!-- Perfect circular ring -->
</div>
```

`ring` offers more customization options for size, color, and opacity. You can also set a `ring` to render inside the element using `ring-inset`.

- Use `outline` for straightforward effects, especially for focus indicators.
- Use `ring` when you need more control over the appearance of the boundary, such as opacity, size, color, and whether it’s inset or outset.

## How They Differ from Outlines

**Outline utilities** use the native CSS `outline` property, creating a direct mapping to browser rendering engines. When you apply `outline-2 outline-blue-500`, Tailwind generates straightforward CSS: `outline-width: 2px; outline-color: var(--color-blue-500)`. This native approach offers simplicity and performance benefits.

**Ring utilities**, conversely, implement a sophisticated multi-layer box-shadow system. A class like `ring-2 ring-blue-500` creates CSS custom properties that stack multiple shadows: `--tw-ring-shadow: 0 0 0 2px` combined with color variables. This architecture enables features like ring offsets and inset rings, but adds complexity. The ring offset effect is achieved by layering multiple box-shadows—one solid shadow matching the background color to create the appearance of a gap, followed by the actual ring shadow.

**Modern browsers now support border-radius for outlines**, resolving the long-standing issue where outlines appeared square around rounded elements. Firefox implemented this in April 2021, Chrome in September 2021, and Safari (finally) caught up in March 2023. This advancement removes one of the primary reasons developers historically preferred box-shadow for focus states.

> **A word on High Contrast Mode**
>
> The most critical browser compatibility difference emerges in **Windows High Contrast Mode**. Box-shadow (and thus ring utilities) becomes completely invisible in this accessibility mode, while outline properties are preserved and automatically adjusted to system colors. This distinction has profound implications for accessibility compliance.

> **TL;DR**
>
> **Outline utilities are the clear winner for accessibility-critical use cases**, particularly focus indicators. They automatically work with Windows High Contrast Mode, respect user preferences for custom focus styles, and align with WCAG 2.4.7 requirements for visible focus indicators.
>
> Use rings for decorative purposes only.

## Stacking Multiple Rings

Here’s something cool—you can stack multiple rings for more complex effects:

*Stacking Multiple Rings — Example 9 — [Open example](https://stevekinney.com/generated/playgrounds/6b48e0465ab7b8540aa7b6514345b23f073c781618afeb20ff312e7e4d59ecab.html)*

```html
<button
  class="rounded-md bg-purple-500 px-3 py-2 text-white ring-4 ring-purple-300 ring-offset-4 ring-offset-green-300"
>
  Fancy button
</button>
```

The `ring-offset-2` creates space between the element and the ring, and `ring-offset-purple-100` sets the color of that space. This creates a layered effect that looks really polished.

Rings give you precise control over colors and opacity:

*Stacking Multiple Rings — Example 10 — [Open example](https://stevekinney.com/generated/playgrounds/6139bc4b1b3ddfd2077ce2eab65322662bd1948bbae1840daea16c5d01fa04a8.html)*

```html
<button class="rounded-md bg-red-500 px-3 py-2 text-white ring-4 ring-red-500/30">
  Semi-transparent ring
</button>
```

The `/30` at the end of `ring-red-500/30` makes the ring 30% opacity, creating a subtle glow effect.

## When to Use Each

After building all these examples, here’s when to reach for each approach:

### Use `border` when…

- You need actual structural borders (like table cells or card edges).
- The border is part of the design, not just an interaction state.
- You’re okay with the element taking up more space.

### Use `outline` when…

- You need quick debugging (slap `outline` on everything to see layouts).
- You’re building focus states for non-`rounded-md` elements—and you’re targeting browsers prior to mid-2023.
- You want something that definitely won’t affect layout.

### Use `ring` when…

- You need to stack multiple visual effects.
