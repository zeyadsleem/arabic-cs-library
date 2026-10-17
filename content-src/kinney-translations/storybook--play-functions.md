---
title: "دوال التشغيل (Play Functions)"
---

تأمّل منطقة النص هذه لحظة.

مكوّن منطقة النص

إذا مُرِّرت خاصية `maxLength`، فعندئذ نعرض عدد الأحرف في الأسفل. بل إن لديها ميزة إضافية: سنضيف تنسيقًا إلى منطقة النص في حال تجاوز المستخدم عدد الأحرف.

منطقة نص غير صالحة

وما نودّ فعله هو التحقق من هذه الحالة. أفترض أنه يمكننا الغش بأن تكون لدينا قصص تضعها في كل حالة، لكن هذا يعيبه أننا نحتاج إلى التأكد من النظر إلى القصة في كل مرة نعدّل فيها المكوّن.

بدلًا من ذلك، يمكننا استخدام دالة **Play** لمحاكاة تفاعل مستخدم.

لنبدأ بكتابة قصة تتحقق مما إذا كان عدّ الطول يعمل أصلًا.

```typescript
export const MaxLength: Story = {
  args: {
    maxLength: 140,
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const textArea = canvas.getByRole('textbox');
    const count = canvas.getByTestId('length');

    const inputValue = 'Hello, world!';

    userEvent.type(textArea, inputValue);
    expect(count).toHaveTextContent(inputValue.length.toString());
  },
};
```

## الوصول إلى الوسائط

بل إن لدينا وصولًا إلى `args`.

```typescript
export const LengthTooLong: Story = {
  args: {
    maxLength: 140,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const textArea = canvas.getByRole('textbox');
    const count = canvas.getByTestId('length');

    const inputValue = 'H' + 'e'.repeat(140) + 'y!';

    await userEvent.type(textArea, inputValue);
    expect(count).toHaveTextContent(inputValue.length.toString());
  },
};
```

يمكننا حتى توسيع هذا للتحقق من أشياء مثل الأصناف أو الأنماط أو خصائص إمكانية الوصول.

```typescript
export const LengthTooLong: Story = {
  args: {
    maxLength: 140,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);
    const textArea = canvas.getByRole('textbox');
    const count = canvas.getByTestId('length');

    const inputValue = 'H' + 'e'.repeat(args.maxLength || 140) + 'y!';

    await userEvent.type(textArea, inputValue);

    expect(count).toHaveTextContent(inputValue.length.toString());
    expect(textArea).toHaveClass('ring-danger-500');
    expect(count).toHaveStyle({ color: 'rgb(237, 70, 86)' });
    expect(textArea).toHaveAttribute('aria-invalid', 'true');
  },
};
```

> **تمرين سريع**
>
> هل يمكنك كتابة اختبار يتحقق مما يلي:
>
> - منطقة نص معطّلة هي—في الحقيقة—معطّلة.
> - الكتابة في منطقة النص لا تغيّر قيمة منطقة النص.
>
> ويمكن العثور على حل محتمل [هنا](https://stevekinney.com/courses/storybook/text-area-disabled-play-function-solution).
