---
title: "كيف تكتب قصة (Story)"
lang: ar
source: "https://stevekinney.com/courses/storybook/writing-stories"
---

فكّر في هذا المكوّن البسيط جدًّا للزرّ. لنفترض أن هذا الملف موجود في `src/components/button.tsx`.

```typescript
import { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'>;

export const Button = (props: ButtonProps) => {
  return <button {...props} />;
};
```

ثم سننشئ أول قصة لنا تُسمّى — دون مفاجأة — `button.stories.tsx`.

أولًا، استورد النوعين `Meta` و`StoryObj` لتحصل على الإكمال التلقائي الرائع في قصص TypeScript وكذلك الأمان النوعي المسؤول.

```typescript
import type { Meta, StoryObj } from '@storybook/react';
```

ثم، لنستورد مكوّنًا. في هذه الحالة، مكوّن `Button`.

```typescript
import { Button } from './button';
```

يحتوي التصدير الافتراضي، `Meta`، على البيانات الوصفية الخاصة بقصص هذا المكوّن. ويتحكّم حقل العنوان في مكان ظهور القصص في الشريط الجانبي.

```typescript
const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
};

export default meta;
```

كل تصدير باسم هو قصة. وستحتاج إلى تصدير واحد على الأقل باسم إن أردت أن ترى أي شيء.

```typescript
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  render: () => <Button>Button</Button>,
};
```

في المجموع، ينبغي أن تبدو قصتك شيئًا كهذا:

```typescript
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';

type Story = StoryObj<typeof Button>;

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
};

export default meta;

export const Primary: Story = {
  render: () => <Button>Button</Button>,
};
```

إن شغّلت Storybook باستخدام `npm run storybook`، فسترى شيئًا مثل ما يلي:

قصة زرّ أساسية في Storybook. ليست شيئًا يُذكر للنظر إليه، لكنها أول قصة لنا، وأظن أننا كان علينا البدء من مكان ما، أليس كذلك؟

## استخدام `args`

بدلًا من تصيير المكوّن نفسه، يمكنك أن تختار استخدام كائن `args` سيُستخدم كخصائص (`props`) للمكوّن المصيَّر في القصة. وهذا يستفيد من [صيغة قصة المكوّن في Storybook](https://storybook.js.org/docs/api/csf).

```typescript
export const Primary: Story = {
  args: {
    children: 'Button',
  },
};
```

ستلاحظ أن بإمكانك ضبط الخصائص (`props`) في تبويب **التحكّم (Controls)**.

![تنفيذ أساسي للتحكّم في Storybook](/images/kinney/60d2c9b175606449.webp)

## زرّنا الأساسي

فيما يلي النتيجة النهائية لزرّنا في هذه المرحلة:

```typescript
import type { Meta, StoryObj } from '@storybook/react';

import { Button } from './button';

type Story = StoryObj<typeof Button>;

const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
};

export default meta;

export const Primary: Story = {
  args: {
    children: 'Button',
  },
};
```

في الوقت الحالي، لا يفعل مكوّن `Button` لدينا شيئًا يُذكر وشكله *قبيح حقًّا*. لنُضِف شيئًا إلى الزرّ. لنُضِف بعض [الأنماط (variants)](https://stevekinney.com/courses/storybook/adding-variants) إلى القصة.
