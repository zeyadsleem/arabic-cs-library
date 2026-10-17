---
title: "الحل: إضافة متغيّرات أحجام الأزرار وأدوات التحكم"
---

يجدر بنا على الأرجح أن نحدّث المكوّن أيضًا، أليس كذلك؟

```typescript
import { ComponentProps } from 'react';
import clsx from 'clsx';

import styles from './button.module.css';

type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary' | 'destructive';
  size?: 'small' | 'medium' | 'large';
};

export const Button = ({ variant = 'primary', size = 'medium', ...props }: ButtonProps) => {
  return <button className={clsx(styles.button, styles[variant], styles[size])} {...props} />;
};
```

وأخيرًا، نحتاج إلى إضافة قصص إضافية لأحجام أزرارنا.

```typescript
export const Small: Story = {
  args: {
    children: 'Button',
    size: 'small',
  },
};

export const Medium: Story = {
  args: {
    children: 'Button',
    size: 'medium',
  },
};

export const Large: Story = {
  args: {
    children: 'Button',
    size: 'large',
  },
};
```

كما وعدنا، حان وقت الحديث عن [الوسائط الافتراضية](https://stevekinney.com/courses/storybook/default-args).
