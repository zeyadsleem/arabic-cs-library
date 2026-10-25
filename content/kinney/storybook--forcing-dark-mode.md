---
title: "فرض الوضع الداكن"
lang: ar
source: "https://stevekinney.com/courses/storybook/forcing-dark-mode"
---

مثلما لا أريد تعيين الوسائط افتراضيًا، أريد أحيانًا فرض قصة في الوضع الداكن. ويُفعل ذلك بسهولة بميزة في Storybook تُسمّى **المعاملات (parameters)**.

```typescript
export const Dark: Story = {
  parameters: {
    themes: {
      themeOverride: 'dark',
    },
  },
};
```

وطالما نحن في الموضوع، يمكنك أيضًا فرض إطار عرض (viewport):

```typescript
export const Mobile: Story = {
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
```
