---
title: "Type Set"
lang: "en"
chapter: "storybook"
slug: "typeset"
order: 15
source: "https://stevekinney.com/courses/storybook/typeset"
---

Similar to the [color palettes](https://stevekinney.com/courses/storybook/color-palette) and [icon galleries](https://stevekinney.com/courses/storybook/icon-gallery), Storybook also provides a helpful set of components for rendering your design system’s typography.

```typescript
import { Meta, Typeset } from '@storybook/blocks';

<Meta title="Typography" />

<Typeset
  fontSizes={[
    12,
    14,
    16,
    18,
    20,
    24,
    30,
    36,
    48,
    60,
    72,
    96,
    128
  ]}
  fontWeight={400}
  sampleText={"The quick brown fox jumps over the lazy dog."}
  fontFamily={"system-ui, sans-serif"}
/>
```

You’ll see something along these lines.

Storybooks Typeset component rendering a our design system's typography
