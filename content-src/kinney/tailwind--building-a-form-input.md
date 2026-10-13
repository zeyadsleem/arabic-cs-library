---
title: "Building a Form Input"
lang: "en"
chapter: "tailwind"
slug: "building-a-form-input"
order: 12
source: "https://stevekinney.com/courses/tailwind/building-a-form-input"
---

Let’s start with our basic HTML structure.

*Example 1 — [Open example](https://stevekinney.com/generated/playgrounds/ac25455cfbe3bfe687727ae48f19ae9088037eed1da233eefef4f85e3c0b8230.html)*

```html
<div>
  <label for="username">Username</label>
  <input type="text" name="username" id="username" placeholder="Your Name Here" />
</div>
```

It’s a basic form field, but it looks quite plain. Let’s transform it into something that belongs in a modern web application.

## Adding Structure and Layout

First, let’s establish proper visual hierarchy by styling the label and adding some basic spacing.

*Adding Structure and Layout — Example 2 — [Open example](https://stevekinney.com/generated/playgrounds/d0177f83fc99bbf9ac128a1927951591a1a42f2ea483ad4e1a1d692b9f4861b3.html)*

```html
<div>
  <label for="username" class="block font-medium text-slate-900">Username</label>
  <input type="text" name="username" id="username" placeholder="Your Name Here" />
</div>
```

- `block`: Makes the label take full width and sit above the input
- `font-medium`: Adds medium font weight (500) for better hierarchy
- `text-slate-900`: Near-black color for excellent readability

## Creating Visual Separation

Now let’s add some breathing room between the label and input field.

*Creating Visual Separation — Example 3 — [Open example](https://stevekinney.com/generated/playgrounds/c06f4f73ffe2a453bbb9c5730a8ad85b7aa1b214cb3823fd404dc15288cdbf97.html)*

```html
<div class="space-y-2">
  <label for="username" class="block font-medium text-slate-900">Username</label>
  <input type="text" name="username" id="username" placeholder="Your Name Here" />
</div>
```

You could add a margin to one or both elements, but you can also use the [spacing utilties](https://stevekinney.com/courses/tailwind/spacing-and-dividing-utilities) as well.

## Styling the Input Field

Time to make the input field look professional with proper dimensions, colors, and borders.

*Styling the Input Field — Example 4 — [Open example](https://stevekinney.com/generated/playgrounds/6338221d34a938aa47381d4b1741dd0beaf4f249d4b509c7f6b5863822968171.html)*

```html
<div class="space-y-2">
  <label for="username" class="block font-medium text-slate-900">Username</label>
  <input
    type="text"
    name="username"
    id="username"
    class="block w-full rounded-md bg-white px-3 py-1.5 text-slate-900"
    placeholder="Your Name Here"
  />
</div>
```

- `block`: Makes the input a block element for full control
- `w-full`: Input takes the full width of its container
- `rounded-md`: Adds 6px border radius for modern, friendly appearance
- `bg-white`: Explicit white background (important for consistency)
- `px-3`: 12px horizontal padding for comfortable text spacing
- `py-1.5`: 6px vertical padding for proper touch targets
- `text-slate-900`: Dark text color for high contrast

## Adding Borders and Outlines

Now let’s add a proper border and focus states using Tailwind’s outline utilities.

*Adding Borders and Outlines — Example 5 — [Open example](https://stevekinney.com/generated/playgrounds/18f0c15d6c1405e3ed91db6cbba08671655bf08619f29f8a47de732481f88ded.html)*

```html
<div class="space-y-2">
  <label for="username" class="block font-medium text-slate-900">Username</label>
  <input
    type="text"
    name="username"
    id="username"
    class="block w-full rounded-md bg-white px-3 py-1.5 text-slate-900 outline-1 -outline-offset-1 outline-slate-400"
    placeholder="Your Name Here"
  />
</div>
```

- `outline-1`: 1px outline width (more reliable than borders for form fields)
- `-outline-offset-1`: Negative offset puts the outline inside the element
- `outline-slate-400`: Light-ish color for subtle, non-distracting border

Using `outline` instead of `border` prevents layout shifts and provides better consistency across browsers.

## Adding Focus States

Let’s add an interactive focus state that provides clear visual feedback.

*Adding Focus States — Example 6 — [Open example](https://stevekinney.com/generated/playgrounds/6981638b50b9113b3df2454a2cf5429000298a4b1a4d99d7294948937c9bdb20.html)*

```html
<div class="space-y-2">
  <label for="username" class="block font-medium text-slate-900">Username</label>
  <input
    type="text"
    name="username"
    id="username"
    class="block w-full rounded-md bg-white px-3 py-1.5 text-slate-900 outline-1 -outline-offset-1 outline-slate-300 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
    placeholder="Your Name Here"
  />
</div>
```

- `focus:outline-2`: Thicker 2px outline when focused
- `focus:-outline-offset-2`: Negative offset creates an inset ring effect
- `focus:outline-indigo-600`: Brand color (indigo) for focus state

The focus state uses a thicker outline with the same negative offset technique, creating a clear visual indicator without changing the input’s dimensions.

We’ll talk more about [focus states](https://stevekinney.com/courses/tailwind/focus-states) in a hot minute.

## Typography Refinements

Let’s improve the typography for both the label and input text, including placeholder styling.

*Typography Refinements — Example 7 — [Open example](https://stevekinney.com/generated/playgrounds/dc7c2981968074add4ce824a79d5cacac6cb68c7ce23002c69ac9185246cb05e.html)*

```html
<div class="space-y-2">
  <label for="username" class="block text-sm font-medium text-slate-900">Username</label>
  <input
    type="text"
    name="username"
    id="username"
    class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-slate-900 outline-1 -outline-offset-1 outline-slate-300 placeholder:text-slate-400 focus:outline-2 focus:-outline-offset-2 focus:outline-indigo-600"
    placeholder="Your Name Here"
  />
</div>
```

- `text-sm` on label: 14px font size, appropriate for form labels
- `text-base` on input: 16px font size prevents zoom on mobile devices
- `placeholder:text-slate-400`: Lighter slate for placeholder text, creating clear hierarchy
