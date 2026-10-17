---
title: "اختبار المكوّنات"
---

في كل تطبيق تقريبًا عملت عليه توجد فكرة أن الرابط قد يبدو كزرّ. وهناك نمط في React يمكننا فيه استخدام مكوّنات متعدّدة الأشكال (polymorphic). لقد تحدثنا كثيرًا عن كيفية فعل ذلك في دورة React وTypeScript، لكن دعنا الآن نتجاوز التفاصيل قليلًا.

سنحدّث النوع كما يلي:

```typescript
type ButtonProps = ComponentPropsWithoutRef<'button'> &
  ButtonVariants & {
    href?: never;
  };

type AnchorProps = ComponentPropsWithoutRef<'a'> &
  ButtonVariants & {
    href?: string;
  };

type ButtonOrLinkProps = ButtonProps | AnchorProps;
```

ثم سنُجري تعديلًا صغيرًا واحدًا على مكوّن `Button` لدينا.

```typescript
export const Button = ({ variant = 'primary', size = 'medium', ...props }: ButtonOrLinkProps) => {
  const className = clsx(variants({ variant, size }));

  if (props.href) {
    return <a className={className} {...(props as ComponentPropsWithoutRef<'a'>)} />;
  } else {
    return <button className={className} {...(props as ComponentPropsWithoutRef<'button'>)} />;
  }
};
```

من الأمور الرائعة حقًّا التي يمكنك فعلها مع Storybook و[دوال التشغيل (Play functions)](https://stevekinney.com/courses/storybook/play-functions) أنك تستطيع استخدامها لاختبار مكوّنك نيابةً عنك. لنفترض أن لديّ زرًّا يمكن أن يكون رابطًا أيضًا إذا مرّرنا خاصية `href` إلى الزرّ.

أريد الاختبار وفق الشروط التالية:

- إذا لم أمرّر `href`، فينبغي أن يُصيَّر المكوّن كـ `<button>`.
- إذا *مرّرت* `href`، فينبغي أن يُصيَّر المكوّن كـ `<a>`.

يمكنني تعزيز قصصي ببعض عمليات التحقّق السريعة.

```typescript
export const Primary: Story = {
  args: {
    variant: 'primary',
  },
  play: ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.getByRole('button');

    expect(button.tagName).toBe('BUTTON');
  },
};
```

ويمكنني فعل شيء مشابه مع الزرّ الذي ينبغي أن يُصيَّر كرابط أيضًا.

```typescript
export const ButtonAsLink: Story = {
  args: {
    href: 'https://example.com',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    const button = canvas.findByText('Button');

    expect(button.tagName).toBe('A');
    expect(button).toHaveRole('link');
    expect(button).toHaveAttribute('href', 'https://example.com');
  },
};
```

الآن، إن أعددت [مشغّل اختبارات Storybook](https://stevekinney.com/courses/storybook/test-runner)، يمكنني حتى تشغيل هذه الاختبارات كجزء من إعداد CI/CD لديّ أو إلى جانب اختباراتي الوحدية الأخرى.
