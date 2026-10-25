---
title: "أداة Class Variance Authority"
lang: ar
source: "https://stevekinney.com/courses/tailwind/cva-tailwind"
---

[Class Variance Authority](https://cva.style/) هي أداة محايدة تجاه الأطر لإنشاء تنويعات المكوّن بأصناف مختلفة. إنها بسيطة جدًا، ومن المرجّح أنك *تستطيع* كتابتها بنفسك إن اضطررت — لكنك لست مضطرًا لذلك لأنها موجودة بالفعل.

تتيح لك CVA أن:

1. تعرّف مجموعة من الأنماط الأساسية للمكوّن.
2. تعرّف الأنماط الفريدة لكل تنويع.
3. تتيح لك تعريف تنويعات افتراضية حين لا يُحدَّد أحدها صراحةً.
4. تتيح لك إنشاء تنويعات مركّبة.

تعمل *بشكل ممتاز* مع Tailwind، لكنك لا تحتاج إلى استخدام Tailwind لاستخدام CVA. يمكنك استخدام أي أصناف مساعدة تريدها، أو حتى مجرد الأصناف من وحدات CSS الخاصة بنا كما فعلنا في وقت سابق.

> **استخدام IntelliSense الخاص بـ Tailwind مع Class Variance Authority**
>
> إن كنت تستخدم Tailwind وVisual Studio Code وCVA و[امتداد Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)، فقد ترغب في إجراء [هذا](https://cva.style/docs/getting-started/installation#tailwind-css) التعديل على ملف `settings.json` في مشروعك.

## مثال

```typescript
import type { ComponentProps } from 'preact';
import { cva, type VariantProps } from 'class-variance-authority';
import { twMerge } from 'tailwind-merge';

const buttonVariants = cva(
  // Base classes
  'font-semibold shadow-xs focus-visible:outline-2 focus-visible:outline-offset-2',
  {
    variants: {
      variant: {
        primary: 'bg-indigo-600 text-white hover:bg-indigo-500 focus-visible:outline-indigo-600',
        secondary: 'bg-white text-slate-900 ring-1 ring-slate-300 ring-inset hover:bg-slate-50',
        danger: 'bg-red-600 text-white hover:bg-red-500 focus-visible:outline-red-600',
        ghost: 'bg-transparent text-slate-900 hover:bg-slate-50',
      },
      size: {
        'extra-small': 'rounded-sm px-2 py-1 text-xs',
        small: 'rounded-sm px-2 py-1 text-sm',
        medium: 'rounded-md px-2.5 py-1.5 text-sm',
        large: 'rounded-md px-3 py-2 text-sm',
        'extra-large': 'rounded-md px-3.5 py-2.5 text-sm',
      },
    },
    defaultVariants: {
      variant: 'primary',
      size: 'medium',
    },
  },
);

export type ButtonProps = ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    className?: string;
  };

export const Button = ({ className, variant, size, ...props }: ButtonProps) => {
  return <button class={twMerge(buttonVariants({ variant, size }), className)} {...props} />;
};
```
