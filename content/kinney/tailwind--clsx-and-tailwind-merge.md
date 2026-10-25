---
title: "دمج أسماء الأصناف وإزالة التكرار منها"
lang: ar
source: "https://stevekinney.com/courses/tailwind/clsx-and-tailwind-merge"
---

كثيرًا ما تحتاج، أثناء بناء مكوّنات، إلى السماح للمكوّن بأن يُوسَّع بأصناف إضافية، لكن كيف تمنع هذه الأصناف من التعارض مع الأصناف التي عرّفتها بالفعل؟

الحمد لله، هذه مشكلة شائعة جدًا، وهناك مكتبتان تساعداننا في ذلك. الأولى مكتبة عامة الغرض للعمل مع أسماء أصناف CSS، والثانية خاصة بـ Tailwind:

- [`clsx`](https://npm.im/clsx) يتولّى منطق `className` الشرطي (مثل `clsx('base', { 'active': isActive })`)
- [`tailwind-merge`](https://npm.im/tailwind-merge) يحلّ التعارضات بين أصناف Tailwind المساعدة

## `clsx`

بدون أيٍّ منهما، قد تجد نفسك تفعل شيئًا كهذا:

```typescript
import type { ComponentProps } from 'preact';

export type ButtonProps = ComponentProps<'button'>;

export const Button = ({ className, ...props }: ButtonProps) => {
  return (
    <button
      class={`rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500 ${className || ''}`}
      {...props}
    />
  );
};
```

هناك بعض المشكلات هنا:

- قد ينتهي بك المطاف إلى صنفين مساعدين مختلفين يفعلان الشيء نفسه على الأرجح.
- يصبح الأمر أكثر سوءًا إذا أردت تنفيذ أي منطق شرطي.

تتفوّق مكتبة `clsx` في مثال مكوّن Button هذا بتنظيف دمج النصوص اليدوي والمنطق الشرطي الذي تتعامل معه حاليًا عبر القوالب النصية (template literals). بدلًا من `${className || ''}` والقلق بشأن المسافات الزائدة، يمكنك كتابة `clsx('rounded-md bg-blue-600 px-3 py-2 text-sm font-semibold text-white shadow-xs hover:bg-blue-500', className)` الذي يتعامل تلقائيًا مع قيم undefined/null ومع المسافات الصحيحة. والأهم من ذلك، إن احتجت لاحقًا إلى أصناف شرطية — مثل `disabled:opacity-50` عندما تكون خاصية `disabled` صحيحة، أو أحجام مختلفة بناءً على خاصية `size` — تجعل `clsx` هذا الأمر تافهًا عبر صيغة الكائن التي توفّرها: `clsx('base-classes', { 'disabled:opacity-50': disabled, 'px-6 py-3': size === 'large' }, className)`. هذا يُبقي مكوّنك نظيفًا ومقروءًا مع التخلص من التلاعب اليدوي بالنصوص الذي يصبح مرهقًا كلما ازدادت المكوّنات تعقيدًا.

```typescript
import type { ComponentProps } from 'preact';
import { clsx } from 'clsx';

export type ButtonProps = ComponentProps<'button'> & {
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
};

export const Button = ({ className, size = 'md', disabled = false, ...props }: ButtonProps) => {
  return (
    <button
      class={clsx(
        'rounded-md bg-blue-600 text-sm font-semibold text-white shadow-xs hover:bg-blue-500',
        {
          'px-2 py-1 text-xs': size === 'sm',
          'px-3 py-2 text-sm': size === 'md',
          'px-4 py-3 text-base': size === 'lg',
        },
        {
          'cursor-not-allowed opacity-50 hover:bg-blue-600': disabled,
        },
        className,
      )}
      disabled={disabled}
      {...props}
    />
  );
};
```

## `clsx` و`tailwind-merge`

بدون هذه التركيبة، قد تكتب شيئًا كالتالي:

```javascript
const className = clsx('px-2 py-1', { 'px-4': isLarge });
// Result when isLarge=true: "px-2 py-1 px-4"
// Problem: Both px-2 and px-4 are applied!
```

مع `tailwind-merge`:

```javascript
import { twMerge } from 'tailwind-merge';

const className = twMerge(clsx('px-2 py-1', { 'px-4': isLarge }));
// Result when isLarge=true: "py-1 px-4"
// px-2 is intelligently removed since px-4 overrides it
```

لذلك، قد يبدو مثالنا السابق الآن شيئًا كهذا:

```typescript
export const Button = ({ className, size = 'md', disabled = false, ...props }: ButtonProps) => {
  return (
    <button
      class={twMerge(
        clsx(
          // Base styles
          'rounded-md bg-blue-600 text-sm font-semibold text-white shadow-xs hover:bg-blue-500',
          // Size variants
          {
            'px-2 py-1 text-xs': size === 'sm',
            'px-3 py-2 text-sm': size === 'md',
            'px-4 py-3 text-base': size === 'lg',
          },
          // Conditional styles
          {
            'cursor-not-allowed opacity-50 hover:bg-blue-600': disabled,
          },
          // User-provided classes (will override conflicts)
          className,
        ),
      )}
      disabled={disabled}
      {...props}
    />
  );
};
```

تُظهر هذه النسخة المحسّنة المرونة الحقيقية في الجمع بين المكتبتين. الآن، عندما يستخدم أحدهم مكوّن `<Button />` الخاص بك هكذا `<Button className="px-8 bg-red-500">Click me</Button>`، تضمن غلاف `tailwind-merge` أن تستبدل `px-8` حشوة المكوّن المعتمدة على الحجم استبدالًا كاملًا (بدلًا من تطبيق الاثنتين)، وأن تستبدل `bg-red-500` القيمة الافتراضية `bg-blue-600`. وبدون `tailwind-merge`، كنت ستنتهي إلى أصناف متعارضة تُطبَّق فيها أصناف المكوّن وأصناف المستخدم معًا في الحشوة والخلفية، ما يؤدّي إلى نتائج تنسيق غير متوقّعة. يجعل هذا النمط مكوّناتك قابلة للتخصيص حقًا ويمنع لحظات الإحباط من نوع «لماذا لا يعمل التجاوز الذي أجريته؟».

## الجمع بينهما

كثيرًا ما أصنع أداة مساعدة بسيطة أسّمّيها `cn`.

```typescript
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

## هل هو ضروري حقًا؟

في الحالات البسيطة، على الأرجح لا. لكنه يصير قيّمًا عندما:

- تبني مكوّنات قابلة لإعادة الاستخدام تقبل خصائص className
- تتعامل مع أنظمة تنسيق تعتمد على التنويعات
- تعمل مع مكتبات المكوّنات حيث تكون تعارضات الأصناف شائعة

## بدائل

- [Class Variance Authority](https://stevekinney.com/courses/tailwind/cva-tailwind): يجمع `cva` المفهومين معًا
- `clsx` وحده إن كنت حذرًا بشأن تعارضات الأصناف
- اكتب المنطق الشرطي يدويًا ببساطة في الحالات البسيطة
