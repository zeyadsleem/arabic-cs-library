---
title: "Gradients"
lang: en
source: "https://stevekinney.com/courses/tailwind/gradients"
---

Tailwind 4 enhances gradients with OKLCH interpolation for smoother transitions and the ability to animate gradient stops.

## Linear Gradients

Direction-based gradients:

*Linear Gradients — Example 1 — [Open example](https://stevekinney.com/generated/playgrounds/6f985105b3c4960d9cab82d8f5542ac5f5fccf7745793834398ccc7d08c50941.html)*

```html
<!-- Cardinal directions -->
<div class="bg-linear-to-r from-purple-500 to-pink-500">Left to right</div>

<div class="bg-linear-to-br from-sky-400 to-blue-600">Top-left to bottom-right</div>

<!-- Custom angles -->
<div class="bg-linear-45 from-green-400 to-blue-500">45-degree angle</div>
```

Directions: `to-t`, `to-tr`, `to-r`, `to-br`, `to-b`, `to-bl`, `to-l`, `to-tl`

## Radial Gradients

Circular/elliptical gradients from center:

*Radial Gradients — Example 2 — [Open example](https://stevekinney.com/generated/playgrounds/81e7f49c52de16865c7cb3c5502408145f73bd796d88870b2388f4491d1192a0.html)*

```html
<!-- Basic radial -->
<div class="bg-radial from-yellow-400 to-orange-500">Center to edge</div>

<!-- Custom shape/position -->
<div class="bg-radial-[circle_at_top_left] from-pink-300 to-purple-400">Circle from top-left</div>
```

## Conic Gradients

Color sweep around center:

*Conic Gradients — Example 3 — [Open example](https://stevekinney.com/generated/playgrounds/d2b15c70cb4ba5895b85fea8a4fbd3256c84d9fd9960d1994a90c9fcce3210c8.html)*

```html
<!-- Basic conic -->
<div class="bg-conic from-red-500 via-yellow-500 to-green-500">Color wheel</div>

<!-- Starting angle -->
<div class="bg-conic-90 from-blue-500 to-purple-500">Start at 90 degrees</div>
```

## Gradient Stops

### Two-color gradients

*Two-color gradients — Example 4 — [Open example](https://stevekinney.com/generated/playgrounds/73c4d97f71ab12381c2db6cdcece05f54ce3ada3f6af3f603b7711b581c2a83f.html)*

```html
<div class="bg-linear-to-r from-indigo-500 to-purple-500">Simple gradient</div>
```

### Three-color with via

*Three-color with via — Example 5 — [Open example](https://stevekinney.com/generated/playgrounds/1077beba09ec412e8ecab72e5cf50ce9dfacf81a4a2d768a91bb12409058d1b1.html)*

```html
<div class="bg-linear-to-r from-red-500 via-yellow-500 to-green-500">Rainbow effect</div>
```

### Custom positions

*Custom positions — Example 6 — [Open example](https://stevekinney.com/generated/playgrounds/6ce2d58fe3d342f8f8324f86c2a1eff12eeebb216ddb7b2d36ccb54ee6c9b24f.html)*

```html
<div class="bg-linear-to-r from-blue-500 from-10% via-purple-500 via-30% to-pink-500 to-90%">
  Controlled color stops
</div>
```

## OKLCH Interpolation

v4 uses OKLCH by default for vibrant, smooth gradients:

*OKLCH Interpolation — Example 7 — [Open example](https://stevekinney.com/generated/playgrounds/b9112496e09ecaaf31c685113acfebf6185ed58d1abb9695a2d43242a3f647cd.html)*

```html
<!-- Smooth interpolation between complementary colors -->
<div class="bg-linear-to-r from-purple-500 to-yellow-500">No muddy middle colors</div>
```

Compare with explicit interpolation:

*OKLCH Interpolation — Example 8 — [Open example](https://stevekinney.com/generated/playgrounds/8ec8c48468532f04524822f0f1deaaf15e9aa3bd772de25bbaba14e2233283c1.html)*

```html
<!-- Force OKLCH -->
<div class="bg-linear-to-r/oklch from-red-500 to-blue-500">Vibrant purple middle</div>

<!-- Force sRGB (older behavior) -->
<div class="bg-linear-to-r/srgb from-red-500 to-blue-500">Duller purple middle</div>
```

## Animated Gradients

New in Tailwind 4 - animate gradient stops:

*Animated Gradients — Example 9 — [Open example](https://stevekinney.com/generated/playgrounds/47a0cf390e5ef16ae1214919333cc7f3524b16d7f44e37d7b3ce8d6cfe96f1aa.html)*

```html
<button
  class="bg-linear-to-r from-blue-500 to-purple-500 transition-all duration-300 hover:from-purple-500 hover:to-pink-500"
>
  Hover to animate
</button>
```

This works because Tailwind 4 uses `@property` to register gradient variables as animatable.

## Complex Examples

### Mesh gradient effect

*Mesh gradient effect — Example 10 — [Open example](https://stevekinney.com/generated/playgrounds/78939883f40b72c6449fe29b9c45774e4db0b04831ccb8743d65a53f4e43ae51.html)*

```html
<div class="relative bg-radial from-purple-500/30 via-transparent to-transparent">
  <div
    class="absolute inset-0 bg-radial-[at_bottom_right] from-pink-500/30 via-transparent to-transparent"
  ></div>
</div>
```

### Text gradients

*Text gradients — Example 11 — [Open example](https://stevekinney.com/generated/playgrounds/1af4fc830a1195012b89e1df055fb6c8fc4cfdaa325600cb19c3925aa089e885.html)*

```html
<h1 class="bg-linear-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
  Gradient Text
</h1>
```

### Gradient borders

*Gradient borders — Example 12 — [Open example](https://stevekinney.com/generated/playgrounds/7d431f9209dc1f5340df0d41a6fda0b96577fc1e381b1a290acc72ce5091d031.html)*

```html
<div class="rounded-lg bg-linear-to-r from-pink-500 to-violet-500 p-1">
  <div class="rounded-lg bg-white p-4">Gradient border effect</div>
</div>
```

## With Opacity

Combine with opacity modifiers:

*With Opacity — Example 13 — [Open example](https://stevekinney.com/generated/playgrounds/e56ed2b13c9d9dac43acac1f9b95abc0d531bbf8785734cfa2eb9885e1246111.html)*

```html
<div class="bg-linear-to-r from-red-500/50 to-blue-500/50">Semi-transparent gradient</div>
```

## Best Practices

1. **Use OKLCH interpolation** for vibrant gradients
2. **Limit color stops** - 2-3 colors usually work best
3. **Test on different screens** - P3 displays show more vibrant colors
4. **Consider performance** - Animated gradients use GPU
5. **Provide fallbacks** for older browsers if needed
