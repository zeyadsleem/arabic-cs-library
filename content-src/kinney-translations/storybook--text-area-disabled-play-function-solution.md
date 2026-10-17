---
title: "الحل: التحقق من منطقة نص معطّلة"
---

<!-- ملاحظة مترجم: لا يحتوي هذا المقطع على نصّ ظاهر سوى الشيفرة أدناه؛ وعنوان الصفحة العربي مُدرج في ترويسة الملف. -->

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
