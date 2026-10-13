---
title: "In Utility"
lang: en
source: "https://stevekinney.com/courses/tailwind/in-utility"
---

The `in-*` variant (new in Tailwind 4) styles elements based on *any* ancestor’s state. No `group` class required!

## Basic Usage

*Basic Usage — Example 1 — [Open example](https://stevekinney.com/generated/playgrounds/626687c96f03213893ec6242ce64858f1228f399bfb3eb7680e8018fab709830.html)*

```html
<div>
  <!-- No group class needed -->
  <button>
    <span class="in-[:hover]:text-blue-500"> Changes when <em>any</em> ancestor is hovered</span>
  </button>
</div>
```

## Common Patterns

### Nested hover effects

*Nested hover effects — Example 2 — [Open example](https://stevekinney.com/generated/playgrounds/85103b389955a8491e59c55d0c6911443b635666e5406aa32420cad9acc4257b.html)*

```html
<article>
  <h2 class="in-[:hover]:underline">Title</h2>
  <p class="in-[:hover]:text-gray-600">Description</p>
</article>
```

## Form field focus states

*Form field focus states — Example 3 — [Open example](https://stevekinney.com/generated/playgrounds/686fc35f43b517b850ec9ec6c8fe9f00ab14792a39c5587faec0b473b7d47b3a.html)*

```html
<label>
  <span class="in-[:focus]:text-blue-600">Email</span>
  <input type="email" />
</label>
```

## Key Differences from `group`

| Feature | `group` | `in-*` |
| --- | --- | --- |
| Parent class needed | Yes | No |
| Target specific parent | Yes (with names) | No (any parent) |
| Fine control | More precise | Less precise |

## When to Use Each

Use `in-*` when:

- You want simple parent state reactions
- You don’t need to differentiate between parents
- You want cleaner markup

Use `group` when:

- You need to target a specific parent
- You have nested interactive elements
- You need named groups for clarity

## Composability

Combine with other variants:

*Composability — Example 4 — [Open example](https://stevekinney.com/generated/playgrounds/9f564618d5f7ddd0f249fc6dbcb74021d815a748f8b6054a5892f15d81ec52e7.html)*

```html
<div class="in-[:focus]:not-[:disabled]:ring-2">...</div>
```
