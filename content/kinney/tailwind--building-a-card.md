---
title: "Building a Card Component"
lang: en
source: "https://stevekinney.com/courses/tailwind/building-a-card"
---

Let’s start with our basic HTML structure.

*Example 1 — [Open example](https://stevekinney.com/generated/playgrounds/4237ee4e875d7a422bbf9ecbc5d4554ef04a4628db957194e930625b9ca8f3d0.html)*

```html
<div>
  <img src="https://picsum.photos/seed/picsum/600/400" alt="Product" />
  <div>
    <h3>Product Name</h3>
    <p>Product description goes here.</p>
    <button>$29.99</button>
  </div>
</div>
```

It’s obviously not much to look at, but let’s start adding to it.

## Applying What We’ve Learned

We saw this before when we were [building a button](https://stevekinney.com/courses/tailwind/building-a-button), but it doesn’t hurt to get some more practice in. Let’s add the following classes to the container: `bg-white`, `rounded-lg`, and `shadow-md`.

*Applying What We've Learned — Example 2 — [Open example](https://stevekinney.com/generated/playgrounds/71f625ed22f27861d5734eb6fd3882a11737316b8fc9b7c69bf43f8e84e3c256.html)*

```html
<div class="rounded-lg bg-white shadow-md">
  <img src="https://picsum.photos/seed/picsum/600/400" alt="Product" />
  <div>
    <h3>Product Name</h3>
    <p>Product description goes here.</p>
    <button>$29.99</button>
  </div>
</div>
```

It’s still not looking that good, but we’re making progress—I guess. We’re using `shadow-md` instead of `shadow-xs` (like we used for the button) because cards need more prominence as larger content containers. The shadow helps establish visual hierarchy—cards should feel more substantial than buttons.

## Giving It Some Space

We also saw this with button, but we also adding padding super easily with the `p-6` class.

*Giving It Some Space — Example 3 — [Open example](https://stevekinney.com/generated/playgrounds/7fa20b8b66e72e3bce57153b487fb654bf071aae2fef795200a587afdf4eb7d4.html)*

```html
<div class="rounded-lg bg-white shadow-md">
  <img src="https://picsum.photos/seed/picsum/600/400" alt="Product" />
  <div class="p-6">
    <h3>Product Name</h3>
    <p>Product description goes here.</p>
    <button>$29.99</button>
  </div>
</div>
```

The `p-6` utility class adds 24px of padding on all sides.

## Getting the Image to Behave

*Getting the Image to Behave — Example 4 — [Open example](https://stevekinney.com/generated/playgrounds/c1460915b080f5711eac1a0aaff9d067e8b8df6061fd5f903d7dab3ba1163d62.html)*

```html
<div class="overflow-hidden rounded-lg bg-white shadow-md">
  <img
    src="https://picsum.photos/seed/picsum/600/400"
    alt="Product"
    class="h-48 w-full object-cover"
  />
  <div class="p-6">
    <h3>Product Name</h3>
    <p>Product description goes here.</p>
    <button>$29.99</button>
  </div>
</div>
```

Changes to the image:

- `w-full`: Makes the image fill the card’s width.
- `h-48`: Sets a fixed height of 192px for consistent card proportions.
- `object-cover`: Crops the image to fill the space while maintaining aspect ratio.

Container changes:

`overflow-hidden`: Ensures the image respects the card’s rounded corners.

## Typography

*Typography — Example 5 — [Open example](https://stevekinney.com/generated/playgrounds/9deb228b2331811db396274728cc725b62d750b1aae54f9ef3377fe7ed492bc6.html)*

```html
<div class="overflow-hidden rounded-lg bg-white shadow-md">
  <img
    src="https://picsum.photos/seed/picsum/600/400"
    alt="Product"
    class="h-48 w-full object-cover"
  />
  <div class="p-6">
    <h3 class="text-lg leading-tight font-semibold text-slate-900">Product Name</h3>
    <p class="text-sm leading-relaxed text-slate-600">Product description goes here.</p>
    <div class="text-xl font-bold text-slate-900">$29.99</div>
  </div>
</div>
```

I made the following tweaks to the typography:

### Heading Styles

- `text-lg`: 18px font size for prominence without overwhelming
- `font-semibold`: 600 weight for clear hierarchy
- `text-slate-900`: Near-black for maximum readability

### Description Styles

- `text-slate-600`: Medium gray for secondary information
- Default text size (`text-base`) provides good readability

### Price Styles

- `text-xl`: 20px size makes the price prominent—it’s often the key decision factor
- `font-bold`: 700 weight emphasizes the price more than the product name
- `text-slate-900`: High contrast for clarity

## Spacing

We can add some spacing betweent the text by using `space-y-4` on the container surrounded the prose.

*Spacing — Example 6 — [Open example](https://stevekinney.com/generated/playgrounds/51bdb56d0a9c5316a8d4eaff8720a9b8128c259dd460cb4c6aa1679371b01838.html)*

```html
<div class="overflow-hidden rounded-lg bg-white shadow-md">
  <img
    src="https://picsum.photos/seed/picsum/600/400"
    alt="Product"
    class="h-48 w-full object-cover"
  />
  <div class="space-y-4 p-6">
    <h3 class="text-lg leading-tight font-semibold text-slate-900">Product Name</h3>
    <p class="text-sm leading-relaxed text-slate-600">Product description goes here.</p>
    <div class="text-xl font-bold text-slate-900">$29.99</div>
  </div>
</div>
```

`space-y-4` adds `margin-top: 1rem (16px)` to all child elements *except* the first one. It’s a clean way to create consistent vertical spacing without manually adding margins to each element. This also makes it easier to adjust the spacing between all of the elements as opposed to trying to get fancy with margins and whatnot.

## Adding Hover Interactions

*Adding Hover Interactions — Example 7 — [Open example](https://stevekinney.com/generated/playgrounds/ad166de7bd7f38bfcf20be15f4312ae5c44eca17334afbd5ecb71667df96272f.html)*

```html
<div
  class="overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-200 hover:shadow-lg"
>
  <img
    src="https://picsum.photos/seed/picsum/600/400"
    alt="Product"
    class="h-48 w-full object-cover"
  />
  <div class="space-y-4 p-6">
    <h3 class="text-lg leading-tight font-semibold text-slate-900">Product Name</h3>
    <p class="text-sm leading-relaxed text-slate-600">Product description goes here.</p>
    <div class="text-xl font-bold text-slate-900">$29.99</div>
  </div>
</div>
```

We added the following classes to the container:

- `hover:shadow-lg`: Increases shadow on hover, making the card feel elevated
- `transition-shadow`: Animates shadow changes smoothly
- `duration-200`: Sets a fast (200ms) transition for responsive feel

## Constraining the Width

It’s still a little too wide for my tastes. Let’s set a maximum with for the card using `max-w-sm` on the container.

*Constraining the Width — Example 8 — [Open example](https://stevekinney.com/generated/playgrounds/599b22793a1c743b5b51904bdcc66b398daefc279053fdfddeeb68fd47867df6.html)*

```html
<div
  class="max-w-sm overflow-hidden rounded-lg bg-white shadow-md transition-shadow duration-200 hover:shadow-lg"
>
  <img
    src="https://picsum.photos/seed/picsum/600/400"
    alt="Product"
    class="h-48 w-full object-cover"
  />
  <div class="space-y-4 p-6">
    <h3 class="text-lg font-semibold text-slate-900">Product Name</h3>
    <p class="text-slate-600">Product description goes here.</p>
    <div class="text-xl font-bold text-slate-900">$29.99</div>
  </div>
</div>
```
