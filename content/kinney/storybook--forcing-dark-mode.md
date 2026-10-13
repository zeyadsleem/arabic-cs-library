---
title: "Forcing Dark Mode"
lang: en
source: "https://stevekinney.com/courses/storybook/forcing-dark-mode"
---

Just like I don’t want to set arguments by default, sometimes, I want to force a story into dark mode. That’s easily done with a Storybook feature called **parameters**.

```typescript
export const Dark: Story = {
  parameters: {
    themes: {
      themeOverride: 'dark',
    },
  },
};
```

As long as we’re on the topic, you can also force a viewport:

```typescript
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
```
