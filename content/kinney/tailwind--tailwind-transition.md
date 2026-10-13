---
title: "Transitions"
lang: en
source: "https://stevekinney.com/courses/tailwind/tailwind-transition"
---

CSS transitions animate changes to CSS properties over time, creating smooth effects like fading elements, color changes, or layout shifts. Tailwind provides utility classes for implementing transitions directly in HTML.

## Applying CSS Transitions

Apply transitions using the `transition` utility class. This tells the browser to animate property changes rather than change them instantly.

The base `transition` utility enables transitions for common properties: color, background color, border color, text decoration color, fill, stroke, gradient stops, opacity, box shadow, transform, translate, scale, rotate, and filter. It sets a default timing function (`cubic-bezier(0.4, 0, 0.2, 1)`) and duration (`150ms`).

Tailwind offers utilities for specific property groups:

- `transition-all`: Transitions all animatable properties
- `transition-colors`: Transitions color-related properties (`color`, `background-color`, `border-color`, etc.)
- `transition-opacity`: Transitions only `opacity`
- `transition-shadow`: Transitions only `box-shadow`
- `transition-transform`: Transitions transform properties (`transform`, `translate`, `scale`, `rotate`)
- `transition-none`: Prevents any transitions

Example:

*Applying CSS Transitions — Example 1 — [Open example](https://stevekinney.com/generated/playgrounds/db42a4e0a57cc4e7cc5718eba87df9530a1751e6adfa8536512f98ab9825f306.html)*

```html
<div class="bg-blue-500 transition hover:bg-red-500">Hover over me</div>
```

Here, `transition` animates property changes, and `hover:bg-red-500` specifies the target background color on hover.

## Controlling Transition Properties

For granular control, use `transition-*` utilities like `transition-colors` or `transition-transform` to target specific property sets.

For properties not in predefined sets, use arbitrary values with `transition-[<value>]` syntax:

*Controlling Transition Properties — Example 2 — [Open example](https://stevekinney.com/generated/playgrounds/db0dd92eaa3a1fda4cd80ae9ea619172baab49112ebe80603022339854725362.html)*

```html
<div class="h-10 w-10 transition-[width,height] hover:h-20 hover:w-20">Resize me</div>
```

Reference CSS variables using `transition-(<custom-property>)` syntax.

## Duration, Timing, and Delay

Control how long, how, and when transitions occur.

### Duration

Duration determines animation length:

- `duration-<number>`: Sets duration in milliseconds (`duration-150`, `duration-700`)
- `duration-initial`: Sets to initial value
- `duration-(<custom-property>)`: Uses CSS variable
- `duration-[<value>]`: Uses arbitrary CSS value

*Duration — Example 3 — [Open example](https://stevekinney.com/generated/playgrounds/d5f85d3c312db16e0d47e3285f57e2b2064939284ced8f00d0ac9ee8864b05fd.html)*

```html
<div class="bg-blue-500 transition duration-500 hover:bg-red-500">
  Hover over me (500ms transition)
</div>
```

### Timing Function (Easing)

Controls acceleration curve:

- `ease-linear`: Constant speed
- `ease-in`: Starts slowly, speeds up (`cubic-bezier(0.4, 0, 1, 1)`)
- `ease-out`: Starts quickly, slows down (`cubic-bezier(0, 0, 0.2, 1)`)
- `ease-in-out`: Starts slowly, speeds up, ends slowly (`cubic-bezier(0.4, 0, 0.2, 1)`) - default for `transition`
- `ease-initial`: Sets to initial value
- `ease-(<custom-property>)`: Uses CSS variable
- `ease-[<value>]`: Uses arbitrary value for custom `cubic-bezier` functions

*Timing Function (Easing) — Example 4 — [Open example](https://stevekinney.com/generated/playgrounds/5c01fe22540acf2564c485a7d62dfbb38385b9e12187c362331c1ab4955ea1b4.html)*

```html
<div class="bg-green-500 transition duration-300 ease-in-out hover:bg-yellow-500">
  Hover over me (ease-in-out)
</div>
```

### Delay

Specifies waiting period before transition begins:

- `delay-<number>`: Sets delay in milliseconds (`delay-150`, `delay-700`)
- `delay-(<custom-property>)`: Uses CSS variable
- `delay-[<value>]`: Uses arbitrary CSS value

*Delay — Example 5 — [Open example](https://stevekinney.com/generated/playgrounds/1e7693c5cae7fb6797c7593bced57d8fba9a6d72e1164e8e167d122416072f8d.html)*

```html
<div class="bg-purple-500 transition delay-150 duration-300 hover:bg-orange-500">
  Hover over me (150ms delay)
</div>
```

## Specific Properties and Features

Tailwind provides utilities for transitioning particular CSS features:

- **Transforms**: Use `transition-transform` for `rotate-*`, `scale-*`, `translate-*`, `skew-*`. Force hardware acceleration with `transform-gpu` or revert with `transform-cpu`. Set `transform-origin` and `transform-style` for 3D transforms.
- **Filters**: Transition filters like `blur-*`, `brightness-*`, `contrast-*`, `drop-shadow-*`, etc. The base `transition` includes filter properties. Remove with `filter-none`.
- **Box Shadows**: Handled by `transition-shadow` or base `transition`.
- **Gradients**: Supported in base `transition` and `transition-colors`. In Tailwind 4, gradients interpolate in `oklab` color space by default.
- **Discrete Properties**: Use `transition-discrete` for properties that normally change instantly (`display`, `visibility`).

## Styling Inert Elements

The HTML `inert` attribute marks elements as non-interactive. Use the `inert` variant to style these elements and transition their state changes.

*Styling Inert Elements — Example 6 — [Open example](https://stevekinney.com/generated/playgrounds/2a268adbcd5a58282bc5ef3d98fdce3a06da76a175a6f5a6995eff804f60ee91.html)*

```html
<div class="opacity-100 transition-opacity duration-300 inert:opacity-50" inert>
  Content that fades when inert
</div>
```

The transition smoothly animates opacity changes when the `inert` attribute is toggled.

*Styling Inert Elements — Example 7 — [Open example](https://stevekinney.com/generated/playgrounds/165e61978bff924a5a35ae2ebe03b7ef3be7ebb3b9f20f7cf1d5ef62efc0aaa5.html)*

```html
<button class="cursor-pointer transition-all duration-200 inert:cursor-not-allowed" inert>
  Inert Button
</button>
```

## Transitions with Other Variants

Combine transition utilities with state variants (`hover`, `focus`, `active`, `disabled`, `checked`, `group-hover`, `peer-focus`) and responsive variants (`sm:`, `md:`, `@container`).

Apply transition only on hover:

*Transitions with Other Variants — Example 8 — [Open example](https://stevekinney.com/generated/playgrounds/593bb2c21a204257321d8fb3373b5b8244b1118067b878e1c907af409546655b.html)*

```html
<div class="bg-blue-500 hover:bg-red-500 hover:transition-colors hover:duration-300">
  Transitions only on hover
</div>
```

More commonly, apply `transition` in default state for enter and exit animations:

*Transitions with Other Variants — Example 9 — [Open example](https://stevekinney.com/generated/playgrounds/b940969372352290865afcbc8c28e7447f1b7f17b340b07f5b23b109073b90f7.html)*

```html
<div class="bg-blue-500 transition-colors duration-300 hover:bg-red-500">
  Transitions on hover in and out
</div>
```

Stack variants for conditional transitions:

*Transitions with Other Variants — Example 10 — [Open example](https://stevekinney.com/generated/playgrounds/f582139e47d24c64c36149085e9ef0bf82fa14bcfa6c05eacd685184d6bf44e7.html)*

```html
<div class="transition-colors duration-300 md:hover:bg-red-500">
  Background changes on hover from medium screens up
</div>
```

## Performance Considerations

The `will-change` CSS property hints to browsers that an element will change, allowing optimization. Tailwind provides utilities:

- `will-change-auto`
- `will-change-scroll`
- `will-change-contents`
- `will-change-transform`
- `will-change-(<custom-property>)`
- `will-change-[<value>]`

Apply just before animation begins and remove after completion. Overuse can harm performance.

For transforms and opacity, hardware acceleration can improve performance. Use `transform-gpu` to force hardware acceleration or `transform-cpu` to revert.

## Customizing Transition Values

Customize transition values using CSS variables in the `@theme` directive:

```css
@import 'tailwindcss';

@theme {
  --duration-long: 1000ms;
  --ease-custom: cubic-bezier(0.25, 1, 0.5, 1);
}
```

This enables utilities like `duration-long` and `ease-custom`. Override defaults by redefining variables with the same name.

This CSS-first configuration approach aligns design tokens with their usage location, making Tailwind feel more native to CSS.
