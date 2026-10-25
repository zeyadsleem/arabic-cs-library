---
title: "إضافة أدوات تحكم إلى قصة"
lang: ar
source: "https://stevekinney.com/courses/storybook/controls"
---

في القسم السابق، أضفنا أنماطًا للزر عندما يكون في الحالة `disabled`، لكن ليس لدينا طريقة جيدة بشكل خاص لتفعيل ذلك في قصصنا. *يمكننا* إضافة قصص إضافية للحالة المعطّلة لكل من متغيّرات أزرارنا، لكن هذا يبدو وكأنه قد يخرج عن السيطرة.

ولحسن حظنا، تتيح لنا Storybook إنشاء أدوات تحكم مخصّصة نستطيع التلاعب بها في قصصنا.

وكل ما نحتاج إلى فعله هو إضافة ما يلي إلى `Meta` في قصتنا.

```typescript
const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  argTypes: {
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
  },
};
```

الآن، ستلاحظ أن لدينا القدرة على تعيين تلك الخاصية في أدوات التحكم لدينا.

أداة تحكم إضافية لإظهار الحالة المعطّلة

علينا النقر عليها لتعيينها. وإن لم نرد فعل ذلك، يمكننا تعيين القيمة في كل من قصصنا.

```typescript
export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
    disabled: false,
  },
};

export const Destructive: Story = {
  args: {
    children: 'Button',
    variant: 'destructive',
    disabled: false,
  },
};
```

والآن، سنرى أنها معيَّنة ويمكننا توفير نقرة إضافية. وسأترك لك قرار ما إذا كان ذلك يستحق ذلك أم لا.

تعيين قيمة النوع صراحةً

## أسلوب بديل لتعيين قيمة افتراضية

من الأمور الرائعة في قصص Storybook أنها مجرّد وحدات ES. و*يمكنك* استخدام معامل النشر (spread) إن وجدت نفسك بحاجة إلى إجراء تغييرات واسعة النطاق كثيرًا. وهذا مفيد إذا أردنا استخدام جوانب من قصة في سياق قصة أخرى.

```typescript
export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
    disabled: false,
  },
};

export const Secondary: Story = {
  args: {
    ...Primary.args,
    variant: 'secondary',
  },
};

export const Destructive: Story = {
  args: {
    ...Primary.args,
    variant: 'destructive',
  },
};
```

ومع ذلك، توجد أيضًا طريقة لاستخدام [الوسائط الافتراضية](https://stevekinney.com/courses/storybook/default-args) التي تُمرَّر إلى كل قصة ثم تُتجاوَز عند الحاجة إليها. لكن أولًا، لنؤدِّ [تمرينًا](https://stevekinney.com/courses/storybook/adding-button-sizes-exercise) صغيرًا.
