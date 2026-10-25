---
title: "إنشاء المتغيّرات باستخدام Class Variance Authority"
lang: ar
source: "https://stevekinney.com/courses/storybook/class-variance-authority"
---

[Class Variance Authority](https://cva.style/) أداة مستقلة عن إطار العمل، تُنشئ بها متغيّرات لمكوّن بأصناف مختلفة. وهي بسيطة جدًا، وربما *تستطيع* كتابتها بنفسك لو اضطررت—لكنك لا تحتاج إلى ذلك لأنها موجودة بالفعل.

تتيح لك CVA ما يلي:

1. تعريف مجموعة من الأنماط الأساسية للمكوّن.
2. تعريف الأنماط الخاصة بكل متغيّر.
3. تعريف متغيّرات افتراضية عندما لا يُحدَّد أحدها صراحةً.
4. إنشاء متغيّرات مركّبة.

وهي تعمل *بشكل ممتاز* مع Tailwind، لكنك لا تحتاج إلى استخدام Tailwind لاستخدام CVA. ويمكنك استخدام أي أصناف مساعدة تريدها، أو حتى أصناف وحدات CSS فقط كما فعلنا سابقًا.

> **استخدام IntelliSense الخاص بـ Tailwind مع مكتبة Class Variance Authority**
>
> إذا كنت تستخدم Tailwind وVisual Studio Code وCVA و[إضافة Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)، فقد ترغب في إجراء [هذا](https://cva.style/docs/getting-started/installation#tailwind-css) التعديل في `settings.json` في مشروعك.

لننظر في مثال نُعيد فيه تهيئة [مكوّن الزر](https://stevekinney.com/courses/storybook/adding-variants) من قبل لاستخدام CVA.

## إعادة تهيئة خاصية variant

أنا نادم على بعض خياراتي السابقة في التسمية، لكننا هنا. لننظر في بعض الشيفرة ونتحدث عنها.

```typescript
import { cva, type VariantProps } from 'class-variance-authority';

export const variants = cva(
  [
    'font-semibold',
    'border',
    'rounded',
    'shadow-sm',
    'inline-flex',
    'items-center',
    'cursor-pointer',
    'gap-1.5',
    'focus-visible:outline',
    'focus-visible:outline-2',
    'focus-visible:outline-offset-2',
    'transition-colors',
    'disabled:opacity-50',
    'disabled:cursor-not-allowed',
    'disabled:pointer-events-none',
  ],
  {
    variants: {
      variant: {
        primary: [
          'bg-primary-600',
          'text-white',
          'border-transparent',
          'hover:bg-primary-500',
          'active:bg-primary-400',
        ],
        secondary: [
          'bg-white',
          'text-slate-900',
          'border-slate-300',
          'hover:bg-slate-50',
          'active:bg-slate-100',
        ],
        destructive: [
          'bg-danger-600',
          'text-white',
          'border-transparent',
          'hover:bg-danger-500',
          'active:bg-danger-400',
        ],
      },
    },
    defaultVariants: {
      variant: 'secondary',
    },
  },
);
```

من الأمور التي ستلاحظها أن هذا مجرّد كائن JavaScript. ويمكنك استخدامه مع Svelte بالسهولة نفسها التي تستخدمه بها مع React أو أي شيء آخر.

## توليد الأنواع تلقائيًا

يمكننا أيضًا إضافة ما يلي:

```typescript
type ButtonVariants = VariantProps<typeof variants>;
```

ينظر `VariantProps` في الكائن الذي تعيده CVA وينشئ نوعًا يمكنك استخدامه كخاصية مع أي إطار عمل تقريبًا—ما دمت تستخدم TypeScript بالطبع. وهذا يمنحك القدرة على مشاركة تصميم مكوّنك (أي لغتك التصميمية) عبر مشاريع متعددة—حتى لو كانت تستخدم أطر عمل مختلفة.

الآن، يمكننا تحديث المكوّن لاستخدام نوع مبني على المتغيّرات.

```typescript
type ButtonProps = ComponentProps<'button'> & {
  variant?: ButtonVariants['variant'];
  size?: 'small' | 'medium' | 'large';
};
```

> **تمرين**
>
> هل يمكنك إضافة متغيّر إضافي للخاصية `size`؟ سنطّلع على حل [هنا](https://stevekinney.com/courses/storybook/adding-a-size-variant).
