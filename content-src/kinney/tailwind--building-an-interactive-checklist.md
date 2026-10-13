---
title: "Building an Interactive Checklist"
lang: "en"
chapter: "tailwind"
slug: "building-an-interactive-checklist"
order: 18
source: "https://stevekinney.com/courses/tailwind/building-an-interactive-checklist"
---

Let’s start with our basic HTML structure for a simple checklist item.

*Example 1 — [Open example](https://stevekinney.com/generated/playgrounds/9629ba9390300e7ba99cc08ad4ed9efdc0aaeff3084c929575062c9d9e494078.html)*

```html
<div>
  <input type="checkbox" id="task-1" />
  <label for="task-1">Complete the project documentation</label>
</div>
```

It’s a basic checkbox and label, but there’s no visual feedback when the task is completed. Let’s transform it into a smart checklist item that automatically strikes through the text when the checkbox is checked.

## Adding Structure and Layout

First, let’s establish proper layout and spacing using flexbox to align our checkbox and text.

*Adding Structure and Layout — Example 2 — [Open example](https://stevekinney.com/generated/playgrounds/202e6c85f38973e7566e0f47848e6ccd21d1d062e43d5ed6373fc747e4b7c3d1.html)*

```html
<div class="flex items-center gap-3 p-3">
  <input type="checkbox" id="task-1" class="h-4 w-4 rounded border-slate-300" />
  <label for="task-1" class="text-slate-900">Complete the project documentation</label>
</div>
```

Layout improvements:

- `flex items-center gap-3`: Aligns checkbox and label horizontally with 12px spacing
- `p-3`: Adds 12px padding around the entire item for comfortable touch targets
- `h-4 w-4`: Sets checkbox to 16px square for proper proportions
- `rounded border-slate-300`: Softens checkbox corners and adds subtle border
- `text-slate-900`: High contrast text color for readability

This creates a clean, accessible foundation with proper spacing and alignment.

## Introducing the :has() Selector

Now comes the magic—let’s use Tailwind’s `:has()` selector to automatically strike through the text when the checkbox is checked.

*Introducing the :has() Selector — Example 3 — [Open example](https://stevekinney.com/generated/playgrounds/a7bb3247e0673b75fed4173cd4369530874674b9da0547cea0c4cee11081dac9.html)*

```html
<div
  class="flex items-center gap-3 p-3 has-[input:checked]:text-slate-500 has-[input:checked]:line-through"
>
  <input type="checkbox" id="task-1" class="h-4 w-4 rounded border-slate-300" />
  <label for="task-1" class="text-slate-900">Complete the project documentation</label>
</div>
```

The `:has()` selector magic:

- `has-[input:checked]:text-slate-500`: Changes text color to muted gray when the container has a checked input child
- `has-[input:checked]:line-through`: Adds strikethrough decoration when the container has a checked input child

The `has-[input:checked]:*` utilities are Tailwind’s way of using CSS’s `:has()` pseudo-class. This means “apply these styles to the container when it contains a checked input element.” No JavaScript needed!

## Adding Smooth Transitions

Let’s add transitions to make the completion state feel polished and satisfying.

*Adding Smooth Transitions — Example 4 — [Open example](https://stevekinney.com/generated/playgrounds/1a7a65e2ba728d0dcc83ac659f4cf4ded69996f5731687b0b105d56c18cc56f6.html)*

```html
<div
  class="flex items-center gap-3 p-3 transition-all duration-300 has-[input:checked]:text-slate-500 has-[input:checked]:line-through"
>
  <input type="checkbox" id="task-1" class="h-4 w-4 rounded border-slate-300" />
  <label for="task-1" class="text-slate-900">Complete the project documentation</label>
</div>
```

Animation improvements:

- `transition-all duration-300`: Smoothly animates both color and text-decoration changes over 300ms
- The transition makes checking/unchecking feel more responsive and delightful

The 300ms duration provides a nice balance—fast enough to feel immediate but slow enough to see the visual change happen.

## Enhanced Styling and Polish

Finally, let’s add some refinements to make our checklist item feel more premium and interactive.

*Enhanced Styling and Polish — Example 5 — [Open example](https://stevekinney.com/generated/playgrounds/e4a2a2e0da4e73677765ca57d723f3d61366a1a721a5de38b5678656bcaa7e05.html)*

```html
<div
  class="flex items-center gap-3 rounded-md p-3 transition-all duration-300 hover:bg-slate-50 has-[input:checked]:text-slate-500 has-[input:checked]:line-through"
>
  <input type="checkbox" id="task-1" class="h-4 w-4 rounded border-slate-300 text-blue-600" />
  <label for="task-1" class="cursor-pointer text-slate-900"
    >Complete the project documentation</label
  >
</div>
```

Polish improvements:

- `rounded-md`: Soft corners make the item feel more modern
- `hover:bg-slate-50`: Subtle background change on hover provides interactive feedback
- `text-blue-600` on checkbox: Brand color when checked (browser-dependent support)
- `cursor-pointer` on label: Makes it clear the text is clickable
- The `transition-all` now also animates the background color change

These small touches transform a basic form control into a polished interface element that feels cohesive and professional.

## Why the :has() Selector is Powerful

The `:has()` selector represents a fundamental shift in CSS—it allows parent elements to style themselves based on their children’s state. This creates more intuitive component behavior where the entire checklist item responds to the checkbox state, not just the checkbox itself.

**Traditional approach**: You’d need JavaScript to add/remove classes when the checkbox changes.

**With :has()**: The styling happens automatically through pure CSS, making the component more performant and easier to maintain.

**Accessibility**: Since we’re using a real checkbox and label, screen readers and keyboard navigation work perfectly—the visual enhancements don’t compromise the semantic foundation.

## Challenges

Try building these variations:

1. **Multi-item Checklist**: Create a vertical list of 3-4 checklist items using the patterns above, with proper spacing between items
2. **Priority Indicators**: Add colored dots or badges before the text that also fade out when the item is completed using `has-[input:checked]:opacity-30`
