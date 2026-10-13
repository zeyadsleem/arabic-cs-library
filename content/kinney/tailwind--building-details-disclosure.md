---
title: "Building a Details Disclosure Card"
lang: en
source: "https://stevekinney.com/courses/tailwind/building-details-disclosure"
---

Let’s start with our basic HTML structure for a simple disclosure component.

*Example 1 — [Open example](https://stevekinney.com/generated/playgrounds/f5bffbbd5dee55f42bccc5dbc1a596cbbbcc55b3909ec86cdf9f6efdfe330c6c.html)*

```html
<details>
  <summary>What are your shipping options?</summary>
  <div>
    <p>
      We offer standard shipping (5-7 business days) and express shipping (2-3 business days). All
      orders over $50 qualify for free standard shipping within the continental United States.
    </p>
  </div>
</details>
```

It’s a semantic `<details>` element with a `<summary>` that users can click to reveal content. The browser provides basic functionality, but it looks quite plain. Let’s transform it into a polished disclosure component that provides clear visual feedback when expanded.

## Adding Structure and Layout

First, let’s establish proper spacing and visual hierarchy for our disclosure component.

*Adding Structure and Layout — Example 2 — [Open example](https://stevekinney.com/generated/playgrounds/e1815a305b148f0daa13391ed9ba9930368cb250ee5337c8f0fd2af16712343c.html)*

```html
<details class="rounded-lg border border-slate-200 p-4">
  <summary class="cursor-pointer font-medium text-slate-900">
    What are your shipping options?
  </summary>
  <div class="mt-3">
    <p class="text-slate-600">
      We offer standard shipping (5-7 business days) and express shipping (2-3 business days). All
      orders over $50 qualify for free standard shipping within the continental United States.
    </p>
  </div>
</details>
```

Layout improvements:

- `rounded-lg border border-slate-200`: Creates a subtle container with soft corners and light border
- `p-4`: Adds 16px padding around the entire component for comfortable spacing
- `cursor-pointer`: Makes it clear the summary is clickable
- `font-medium text-slate-900`: Medium weight and high contrast for the summary text
- `mt-3`: Adds 12px spacing between summary and content when expanded
- `text-slate-600`: Slightly muted color for the disclosure content

This creates a clean foundation with proper visual hierarchy between the summary and content.

## Introducing the in-open Pseudo-Class

Now comes the key feature—let’s use Tailwind’s `in-open:*` utilities to change the summary color when the details element is open.

*Introducing the in-open Pseudo-Class — Example 3 — [Open example](https://stevekinney.com/generated/playgrounds/68b0394583d23e0344e7a2382f32aabab56d7859c18f29cbda5cdb8ee9443dd5.html)*

```html
<details class="rounded-lg border border-slate-200 p-4">
  <summary class="cursor-pointer font-medium text-slate-900 in-open:text-blue-600">
    What are your shipping options?
  </summary>
  <div class="mt-3">
    <p class="text-slate-600">
      We offer standard shipping (5-7 business days) and express shipping (2-3 business days). All
      orders over $50 qualify for free standard shipping within the continental United States.
    </p>
  </div>
</details>
```

The `in-open:*` magic:

- `in-open:text-blue-600`: Changes the summary text to blue when the `<details>` element has the `open` attribute

The `in-open:*` utilities are Tailwind’s way of targeting the CSS `:open` pseudo-class, which automatically applies when a `<details>` element is expanded. This means “apply blue text color to this element when its containing details element is open.” No JavaScript needed!

## Adding Visual State Indicators

Let’s add a visual indicator that rotates when the disclosure is opened, making the state change even clearer.

*Adding Visual State Indicators — Example 4 — [Open example](https://stevekinney.com/generated/playgrounds/496538f0b37335037fb7749c513c2a351612e230501cb2e890384cac1389ecaa.html)*

```html
<details class="rounded-lg border border-slate-200 p-4">
  <summary
    class="flex cursor-pointer items-center justify-between font-medium text-slate-900 in-open:text-blue-600"
  >
    <span>What are your shipping options?</span>
    <svg
      class="h-5 w-5 text-slate-400 in-open:rotate-180 in-open:text-blue-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </summary>
  <div class="mt-3">
    <p class="text-slate-600">
      We offer standard shipping (5-7 business days) and express shipping (2-3 business days). All
      orders over $50 qualify for free standard shipping within the continental United States.
    </p>
  </div>
</details>
```

Visual indicator improvements:

- `flex items-center justify-between`: Spreads the text and icon across the full width
- `span` wrapper: Allows the text and icon to be positioned independently
- Chevron down SVG icon with `h-5 w-5` (20px) sizing
- `in-open:rotate-180`: Rotates the chevron 180 degrees when open, pointing up
- `in-open:text-blue-600` on icon: Matches the summary text color when expanded
- `text-slate-400`: Muted gray for the icon in closed state

Now both the text and icon change color together, and the icon rotates to indicate the expanded state.

## Adding Smooth Transitions

Let’s add transitions to make the state changes feel polished and professional.

*Adding Smooth Transitions — Example 5 — [Open example](https://stevekinney.com/generated/playgrounds/4a5b3664c91925bccb828923dc43106f902b1abc2dd6c8f12d00b7b3c6a5dc7e.html)*

```html
<details class="rounded-lg border border-slate-200 p-4">
  <summary
    class="flex cursor-pointer items-center justify-between font-medium text-slate-900 transition-colors in-open:text-blue-600"
  >
    <span>What are your shipping options?</span>
    <svg
      class="h-5 w-5 text-slate-400 transition-all in-open:rotate-180 in-open:text-blue-600"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </summary>
  <div class="mt-3">
    <p class="text-slate-600">
      We offer standard shipping (5-7 business days) and express shipping (2-3 business days). All
      orders over $50 qualify for free standard shipping within the continental United States.
    </p>
  </div>
</details>
```

Animation improvements:

- `transition-colors` on summary: Smoothly animates the text color change (200ms default)
- `transition-all` on icon: Smoothly animates both the rotation and color change

The transitions make expanding and collapsing feel responsive and delightful rather than jarring.

## Adding Hover States

Let’s add subtle hover feedback to make the component feel more interactive even before clicking.

*Adding Hover States — Example 6 — [Open example](https://stevekinney.com/generated/playgrounds/ecd0218739cc1340b0685247cf520c3437dbe3649c7decb0d75fbdbf9898524b.html)*

```html
<details class="rounded-lg border border-slate-200 p-4">
  <summary
    class="flex cursor-pointer items-center justify-between font-medium text-slate-900 transition-colors hover:text-slate-700 in-open:text-blue-600 in-open:hover:text-blue-700"
  >
    <span>What are your shipping options?</span>
    <svg
      class="h-5 w-5 text-slate-400 transition-all hover:text-slate-500 in-open:rotate-180 in-open:text-blue-600 in-open:hover:text-blue-700"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </summary>
  <div class="mt-3">
    <p class="text-slate-600">
      We offer standard shipping (5-7 business days) and express shipping (2-3 business days). All
      orders over $50 qualify for free standard shipping within the continental United States.
    </p>
  </div>
</details>
```

Hover state improvements:

- `hover:text-slate-700`: Slightly darker text on hover when closed
- `hover:text-slate-500`: Slightly darker icon on hover when closed
- `in-open:hover:text-blue-700`: Darker blue when hovering over the open state
- `in-open:hover:text-blue-700` on icon: Matches the text hover color

This creates sophisticated interaction feedback—the hover colors are contextual to whether the disclosure is open or closed.

## Enhanced Border States

Finally, let’s add a subtle border accent that also responds to the open state for complete visual cohesion.

*Enhanced Border States — Example 7 — [Open example](https://stevekinney.com/generated/playgrounds/c08a51ce86858f669507b494e9d3df8d977597f631efd96be10fb2f7181e91b5.html)*

```html
<details class="rounded-lg border border-slate-200 p-4 transition-colors open:border-blue-200">
  <summary
    class="flex cursor-pointer items-center justify-between font-medium text-slate-900 transition-colors hover:text-slate-700 in-open:text-blue-600 in-open:hover:text-blue-700"
  >
    <span>What are your shipping options?</span>
    <svg
      class="h-5 w-5 text-slate-400 transition-all hover:text-slate-500 in-open:rotate-180 in-open:text-blue-600 in-open:hover:text-blue-700"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
    </svg>
  </summary>
  <div class="mt-3">
    <p class="text-slate-600">
      We offer standard shipping (5-7 business days) and express shipping (2-3 business days). All
      orders over $50 qualify for free standard shipping within the continental United States.
    </p>
  </div>
</details>
```

Border state enhancements:

- `transition-colors` on details: Smoothly animates border color changes
- `open:border-blue-200`: Light blue border when expanded, creating subtle visual connection with the blue text and icon

Now the entire component—text, icon, and border—all shift to the blue accent color family when opened, creating a cohesive and polished experience.

## Why the in-open Pseudo-Class is Powerful

The `in-open:*` utilities leverage the native `:open` pseudo-class that browsers automatically apply to expanded `<details>` elements. This creates sophisticated state-based styling without any JavaScript:

**Semantic Foundation**: The `<details>` and `<summary>` elements provide built-in accessibility features—screen readers announce them properly, and keyboard navigation works automatically.

**Zero JavaScript**: All the interactive behavior (expanding, collapsing, state management) is handled by the browser, making the component lightweight and reliable.

**Progressive Enhancement**: The component works perfectly without CSS—users can still expand and collapse content even if styles fail to load.

**State Synchronization**: The visual styling automatically stays in sync with the actual element state since it’s driven by the browser’s native `:open` pseudo-class.

## Common Use Cases

This pattern works excellently for:

- FAQ sections with multiple disclosure items
- Settings panels with expandable option groups
- Documentation with collapsible code examples
- Product descriptions with detailed specifications
- Navigation menus with expandable sub-sections

## Challenges

Try building these variations:

1. **FAQ List**: Create 3-4 disclosure items in a vertical list, each with different questions and answers, using consistent spacing with `space-y-4`
2. **Icon Variations**: Replace the chevron with a plus/minus icon that changes symbol (not just rotation) when opened using `in-open:hidden` and `in-open:block` utilities
