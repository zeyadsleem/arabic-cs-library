---
title: "Creating a Color Palette from Your Tailwind Theme"
lang: "en"
chapter: "storybook"
slug: "color-palette-solution"
order: 36
source: "https://stevekinney.com/courses/storybook/color-palette-solution"
---

Instead of referencing Tailwind’s default theme, we can look our our Tailwind configuration file. Add the following to `src/colors.mdx`.

```mdx
import config from '../tailwind.config';

## Application Colors

<ColorPalette>
  {Object.entries(config.theme.extend.colors).map(([name, value]) => (
    <ColorItem key={name} title={name} colors={value} />
  ))}
</ColorPalette>
```
