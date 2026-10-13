---
title: "Solution: Checking a Disabled Text Area"
lang: en
source: "https://stevekinney.com/courses/storybook/text-area-disabled-play-function-solution"
---

```typescript
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textArea = canvas.getByRole('textbox');

    expect(textArea).toBeDisabled();
    await userEvent.type(textArea, 'Hello, world!');
    expect(textArea).toHaveValue('');
  },
};
```
