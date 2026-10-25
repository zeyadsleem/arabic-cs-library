---
title: "تنفيذ مكوّن Callout"
lang: ar
source: "https://stevekinney.com/courses/storybook/callout-component-solution"
---

> **هذا حل تمرين سابق**
>
> يمكنك رؤية إعداد هذا التمرين [هنا](https://stevekinney.com/courses/storybook/callout-component-exercise)—أو يمكنك ببساطة المتابعة.

## تهيئة المتغيّرات

أول شيء سأفعله هو ملء المتغيّرات، فهذا سهل جدًا.

```typescript
const variants = cva(['p-4', 'rounded', 'border', 'shadow-md', 'space-y-4'], {
  variants: {
    type: {
      default: ['bg-slate-200', 'border-slate-500', 'text-slate-900'],
      primary: ['bg-primary-200', 'border-primary-500', 'text-primary-900'],
      information: ['bg-information-200', 'border-information-500', 'text-information-900'],
      success: ['bg-success-200', 'border-success-500', 'text-success-900'],
      warning: ['bg-warning-200', 'border-warning-500', 'text-warning-900'],
      danger: ['bg-danger-200', 'border-danger-500', 'text-danger-900'],
    },
  },
  defaultVariants: {
    type: 'default',
  },
});
```

أحتاج إلى تمرير تلك المعلومة إلى المكوّن.

```typescript
export const Callout = ({ title, children, type }: CalloutProps) => (
  <div className={variants({ type })}>
    <h2 className="font-semibold">{title}</h2>
    <p>{children}</p>
  </div>
);
```

## إضافة أصناف الوضع الداكن

يمكن القول إن هذا تكرار لِما سبق، لكني أردت إجراء فحص سريع على الجزء الأول قبل الغوص بعيدًا. فالأمر حقًا مجرّد لعبة إضافة أصناف أكثر.

```typescript
const variants = cva(['p-4', 'rounded', 'border', 'shadow-md', 'space-y-4'], {
  variants: {
    type: {
      default: [
        'bg-slate-200',
        'border-slate-500',
        'text-slate-900',
        'dark:bg-slate-800',
        'dark:border-slate-900',
        'dark:text-slate-50',
      ],
      primary: [
        'bg-primary-200',
        'border-primary-500',
        'text-primary-900',
        'dark:bg-primary-800',
        'dark:border-primary-900',
        'dark:text-primary-50',
      ],
      information: [
        'bg-information-200',
        'border-information-500',
        'text-information-900',
        'dark:bg-information-800',
        'dark:border-information-900',
        'dark:text-information-50',
      ],
      success: [
        'bg-success-200',
        'border-success-500',
        'text-success-900',
        'dark:bg-success-800',
        'dark:border-success-900',
        'dark:text-success-50',
      ],
      warning: [
        'bg-warning-200',
        'border-warning-500',
        'text-warning-900',
        'dark:bg-warning-800',
        'dark:border-warning-900',
        'dark:text-warning-50',
      ],
      danger: [
        'bg-danger-200',
        'border-danger-500',
        'text-danger-900',
        'dark:bg-danger-800',
        'dark:border-danger-900',
        'dark:text-danger-50',
      ],
    },
  },
  defaultVariants: {
    type: 'default',
  },
});
```

يُفترض أنني الآن أدعم الوضع الداكن جاهزًا.

## إضافة قصص أكثر

أريد قصة لكل واحد من هذه.

```typescript
export const Default: Story = {};

export const Primary: Story = {
  args: {
    type: 'primary',
  },
};

export const Information: Story = {
  args: {
    type: 'information',
  },
};

export const Success: Story = {
  args: {
    type: 'success',
  },
};

export const Warning: Story = {
  args: {
    type: 'warning',
  },
};

export const Danger: Story = {
  args: {
    type: 'danger',
  },
};
```

## تحسين القصص

يمكنني العبث بـ [`argTypes`](https://stevekinney.com/courses/storybook/arg-types) لإنشاء تجربة أجمل.

```typescript
const meta = {
  title: 'Components/Callout',
  component: Callout,
  args: {
    title: 'An Important Message',
    children: 'This is a message that you should read.',
  },
  argTypes: {
    title: {
      name: 'Title',
      control: 'text',
      description: 'Title of the callout',
    },
    children: {
      name: 'Content',
      control: 'text',
      description: 'Content of the callout',
    },
    type: {
      name: 'Type',
      control: 'select',
      options: ['default', 'primary', 'information', 'success', 'warning', 'danger'],
      description: 'Type of callout',
      table: {
        defaultValue: {
          summary: 'default',
        },
      },
    },
  },
} satisfies Meta<typeof Callout>;
```

## جولة إضافية: إضافة صفحة توثيق

في `src/components/callout/callout.mdx`:

```typescript
import {Meta, Stories, Story, Controls} from '@storybook/blocks';
import CalloutStories from './callout.stories';

<Meta of={CalloutStories} />

<Stories />
<Controls />
```
