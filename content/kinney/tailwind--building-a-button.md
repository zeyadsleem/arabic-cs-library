---
title: "Building a Button"
lang: en
source: "https://stevekinney.com/courses/tailwind/building-a-button"
---

When last we spoke, we had a button that worked like this.

*Example 1 — [Open example](https://stevekinney.com/generated/playgrounds/139d3f7fc703e82e2ee00fc9e0c3b1a24a244d69a6ad4a11ce391c12105c9df5.html)*

```html
<button class="bg-blue-600 px-3 py-2 text-white">Button</button>
```

It definitely looks like a button now, but I suspect we can do a little better.

## Add Border Radius

*Add Border Radius — Example 2 — [Open example](https://stevekinney.com/generated/playgrounds/b70aae25fcf75c505d2e97af93c79773f38893ee641fcdae5fbd1815c9ba259a.html)*

```html
<button class="rounded-md bg-blue-600 px-3 py-2 text-white">Button</button>
```

Here we added a `rounded-md` class. That’s basically adding the following CSS to the element.

```css
border-radius: var(--radius-md); /* 0.375rem (6px) */
```

You can see all of the different options [here](https://tailwindcss.com/docs/border-radius). The `rounded-md` gives the button soft, rounded corners. This creates a more modern, approachable appearance compared to sharp rectangular edges. Unless you’re into that.

Some other options to try:

- `rounded-sm` (2px) for subtle rounding
- `rounded-lg` (8px) for more pronounced curves
- `rounded-full` for pill-shaped buttons

## Adjusting the Typography

*Adjusting the Typography — Example 3 — [Open example](https://stevekinney.com/generated/playgrounds/15c176b380a2d1e140c5b3f15cc624177296099b27796550c5fe44e1e45ae351.html)*

```html
<button class="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white">Button</button>
```

- `text-sm`: Sets font size to 14px with appropriate line height. Buttons typically use slightly smaller text than body copy for better proportions.
- `font-semibold`: Adds font weight of 600, making the text more prominent and easier to read against the colored background.

## Add Subtle Depth with a Shadow

We can also easily add a subtle shadow to the button using `shadow-xs`. This utility class is effectively the same as adding the following CSS.

```css
box-shadow: 0 1px rgb(0 0 0 / 0.05);
```

Maybe you’re a better person that me, but I can never remember the syntax for box shadows without looking it up. But, I *can* remember `shadow-xs`.

- `shadow-xs`: Most subtle, perfect for buttons
- `shadow-sm`: Slightly more pronounced
- `shadow-md`, `shadow-lg`: For cards and modals

## Adding Styles for Interactive States

Where things *really* start to get magical is when you see how easy it is to style psuedo-classes using **variants**. Let’s say we wanted to add a style for when the user hovers over the button—a completely reasonable thing to do—right?

*Adding Styles for Interactive States — Example 4 — [Open example](https://stevekinney.com/generated/playgrounds/ad26d3639666ce93933379f2130b82e9c352c3234895f265f993a6f06f21f602.html)*

```html
<button
  class="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500"
>
  Button
</button>
```

The `hover:` variant prefix means this style only applies when the user hovers over the button. We’re using `blue-500` (lighter than our default `blue-600`) to create a brightening effect.

Under the hood, it’s effectively generating this CSS class:

```css
.hover\:bg-blue-500:hover {
  background-color: var(--color-blue-500);
}
```

### Adding Focus Styles

We can also add styles for various [focus states](https://stevekinney.com/courses/tailwind/focus-states). These focus styles are crucial for:

- Keyboard navigation users
- Screen reader users
- Users with motor disabilities who rely on keyboard navigation
- Meeting WCAG accessibility guidelines

*Adding Focus Styles — Example 5 — [Open example](https://stevekinney.com/generated/playgrounds/7fd9427dc1f63a2cade5af3b5d4a3ef342e74777fdc1a91a01debab5000e4fea.html)*

```html
<button
  type="button"
  class="rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
>
  Button
</button>
```

- `focus-visible:outline-2`: Creates a 2px outline when focused via keyboard
- `focus-visible:outline-offset-2`: Adds 2px of space between the button and outline
- `focus-visible:outline-blue-600`: Makes the outline match the button’s blue color

We’ll talk a little bit more about this later, but here is the quick version of `focus:` vs. `focus-visible:`:

- `focus`: applies to both mouse clicks and keyboard navigation
- `focus-visible`: only applies to keyboard navigation, providing a better user experience

## Challenges

See if you create one or both of the following buttons:

- A secondary button.
- A button for destructive actions.

You can find some possible solutions [here](https://stevekinney.com/courses/tailwind/button-solutions).
