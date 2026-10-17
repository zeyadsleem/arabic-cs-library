---
title: "تنفيذ مكوّن Callout"
---

حسنًا، جاء دورك لتجربة هذا. تأمّل [مكوّن Callout](https://www.figma.com/file/Qhb4PJucNK8bgvf4N65Jrm/Anthology?type=design&node-id=2-2372&mode=design). وتأمّل ما يلي. ويمكنك أن تختار تجاهل كونها بأيقونات مختلفة إن أردت.

تصميمات مكوّن Callout

## الألوان

يستخدم مكوّن Callout الألوان التالية من سمتنا.

| الاسم | الفاتح | الداكن |
| --- | --- | --- |
| **Callout / Primary** |  |  |
| الخلفية | Primary/200 | Primary/800 |
| الحد | Primary/500 | Primary/900 |
| النص | Primary/900 | Primary/50 |
| **Callout / Information** |  |  |
| الخلفية | Information/200 | Information/800 |
| الحد | Information/500 | Information/500 |
| النص | Information/900 | Information/50 |
| **Callout / Success** |  |  |
| الخلفية | Success/200 | Success/800 |
| الحد | Success/500 | Success/900 |
| النص | Success/900 | Success/50 |
| **Callout / Warning** |  |  |
| الخلفية | Warning/200 | Warning/800 |
| الحد | Warning/500 | Warning/900 |
| النص | Warning/900 | Warning/50 |
| **Callout / Danger** |  |  |
| الخلفية | Danger/200 | Danger/800 |
| الحد | Danger/500 | Danger/900 |
| النص | Danger/900 | Danger/50 |
| **Callout / Default** |  |  |
| الخلفية | Slate/200 | Slate/800 |
| الحد | Slate/500 | Slate/900 |
| النص | Slate/900 | Slate/50 |

### ملاحظات تذوّق أخرى

- الخطوط هي الخط الأساسي، لكن عنوان مكوّن Callout بوزن شبه عريض.
- الزوايا مستديرة باستخدام صنف `rounded` في Tailwind.

## بعض الشيفرة الابتدائية

إليك بعض الشيفرة لتبدأ إن كان ذلك مفيدًا. لنبدأ بالمكوّن.

```typescript
import type { PropsWithChildren } from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

type CalloutProps = PropsWithChildren<{ title: string }> & VariantProps<typeof variants>;

const variants = cva(['p-4', 'rounded', 'border', 'shadow-md', 'space-y-4']);

export const Callout = ({ title, children }: CalloutProps) => (
  <div className={variants({})}>
    <h2 className="font-semibold">{title}</h2>
    <p>{children}</p>
  </div>
);
```

والآن للقصة (يُفضّل في `src/components/callout/callout.stores.tsx`):

```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Callout } from './callout';

const meta = {
  title: 'Components/Callout',
  component: Callout,
  args: {
    title: 'An Important Message',
    children: 'This is a message that you should read.',
  },
} satisfies Meta<typeof Callout>;

export default meta;
type Story = StoryObj<typeof Callout>;

export const Default: Story = {};
```

> **الحل**
>
> بعد أن تسنح لك الفرصة لتنفيذ هذا المكوّن وكتابة قصة، سننظر في حل ممكن [هنا](https://stevekinney.com/courses/storybook/callout-component-solution).
