---
title: "تعيين الوسائط الافتراضية"
---

الآن، هذا مثير للاهتمام. فإن نظرت عن قرب، سترى أنه ليس لدينا شيء محدَّد من ناحية `variant` لأي من أحجام الأزرار هذه. وهذا منطقي لأننا لم نضفه كوسيط، وإن ألقيت نظرة على شيفرة مكوّننا، سترى أننا عندما نتردّد نعود افتراضيًا إلى زر أساسي إلا إن قيل لنا غير ذلك—وبالمثل، نعود افتراضيًا إلى زر بمقاس متوسط إن لم تُمرَّر خاصية `size`.

أداة تحكم إضافية للحالة المعطّلة في Storybook

يمكننا تعيين بعض الوسائط الافتراضية التي ستعود إليها Storybook ما لم نتجاوزها في قصصنا.

```typescript
const meta: Meta<typeof Button> = {
  title: 'Button',
  component: Button,
  args: {
    children: 'Button',
    variant: 'primary',
    size: 'medium',
    disabled: false,
  },
  argTypes: {
    disabled: { control: 'boolean' },
  },
};
```

سترى الآن أن أزرار الاختيار الصحيحة محدَّدة، وحتى القيمة المنطقية `disabled` صارت معيَّنة بشكل صحيح. والآن، يمكننا إزالة الكثير من الشيفرة المتكرّرة ونشر الوسائط لنحصل على شيء أنظف قليلًا.

```diff
diff --git a/src/components/button/button.stories.tsx b/src/components/button/button.stories.tsx
index 58228bd..4a09a08 100644
--- a/src/components/button/button.stories.tsx
+++ b/src/components/button/button.stories.tsx
@@ -21,45 +21,36 @@ type Story = StoryObj<typeof Button>;

 export const Primary: Story = {
   args: {
-    children: 'Button',
     variant: 'primary',
-    disabled: false,
   },
 };

 export const Secondary: Story = {
   args: {
-    children: 'Button',
     variant: 'secondary',
-    disabled: false,
   },
 };

 export const Destructive: Story = {
   args: {
-    children: 'Button',
     variant: 'destructive',
-    disabled: false,
   },
 };

 export const Small: Story = {
   args: {
-    children: 'Button',
     size: 'small',
   },
 };

 export const Medium: Story = {
   args: {
-    children: 'Button',
     size: 'medium',
   },
 };

 export const Large: Story = {
   args: {
-    children: 'Button',
     size: 'large',
   },
 };
```

يمكنك أن تحتجّ بأنه يمكننا، بل ينبغي لنا على الأرجح، أن نتخلّص من قصة مخصّصة لكل مقاس، وأنا على الأرجح لن أقدّم حجة مضادة.
