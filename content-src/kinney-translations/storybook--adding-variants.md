---
title: "إضافة متغيّرات إلى قصة"
---

لنصبح فلسفيين قليلًا. هناك *الكثير* من أنواع الأزرار في العالم. ولمقاصدنا، سنسمّي هذه **المتغيّرات (variants)**. ومن أكثر المتغيّرات شيوعًا التي نراها في الميدان فكرة وجود أزرار أساسية وأزرار ثانوية. ومن الأمثلة الإضافية الأزرار المدمِّرة والأزرار المعطّلة، وما إلى ذلك.

## استخدام خاصية لتعيين المتغيّر

إذا راجعنا مجموعة مختارة من تطبيقات أنظمة التصميم القائمة، سنرى أن الطريقة الأكثر شيوعًا بفارق كبير للسماح لمستهلكي مكتبة مكوّناتك بتعيين متغيّر هي توفير خاصية (prop). أما ما تختار أن تسمّي به تلك الخاصية بالضبط وما القيم التي تقبلها فمتروك لك. وكما سترى، فإن `variant` خيار شائع إلى حد كبير، لكن `appearance` و`kind` تُستخدمان أيضًا.

- [نظام Fluent التصميمي من Microsoft](https://react.fluentui.dev/?path=/docs/components-button-button--default) يستخدم خاصية `appearance` تكون إحدى المتغيّرات التالية: `primary`، و`secondary`، و`subtle`، و`outline`، و`transparent`.
- [نظام التصميم من Atlassian](https://atlassian.design/components/button/examples#appearance) يستخدم أيضًا خاصية `appearance` التي يمكن أن تكون `primary` أو `subtle` أو `link` أو `subtle-link` أو `warning` أو `danger`.
- [نظام Carbon التصميمي من IBM](https://react.carbondesignsystem.com/?path=/story/components-button--default) يستخدم خاصية `kind` التي يمكن تعيينها إلى `primary` أو `secondary` أو `danger` أو `ghost` أو `tertiary` أو `danger--primary` أو `danger--ghost` أو `danger--tertiary`.
- [نظام Primer التصميمي من GitHub](https://primer.style/components/button/react/alpha) يستخدم خاصية `variant` التي يمكن أن تكون `default` أو `primary` أو `danger` أو `invisible`.
- [نظام Paste التصميمي من Twilio](https://paste.twilio.design/components/button) يستخدم خاصية `variant` أيضًا مع المتغيّرات التالية: `primary`، و`primary_icon`، و`secondary`، و`secondary_icon`، و`destructive`، و`destructive_icon`، و`destructive_link`، و`destructive_secondary`، و`link`، و`inverse_link`، و`inverse`.
- [نظام Polaris التصميمي من Shopify](https://polaris.shopify.com/components/actions/button) يستخدم خاصية `variant` تتكوّن من `plain`، و`primary`، و`secondary`، و`tertiary`، و`monochromePlain`.
- [نظام Pajamas التصميمي من GitLab](https://design.gitlab.com/components/button/code) يستخدم أيضًا خاصية `variant` تكون إحدى ما يلي: `default`، و`confirm`، و`info`، و`success`، و`danger`، و`dashed`، و`link`، و`reset`.
- [نظام Spectrum التصميمي من Adobe](https://react-spectrum.adobe.com/react-spectrum/Button.html) يستخدم أيضًا خاصية `variant` التي يمكن أن تكون `primary` أو `secondary` أو `negative`. وفي نظامهم، `negative` مشابه لـ `destructive` أو `danger` في بعض الأنظمة الأخرى. ولديهم *أيضًا* نمطان: `fill` و`outline`، وهما أقرب إلى `primary` و`secondary` في الأنظمة الأخرى.

والنتيجة النهائية شيء يشبه هذا:

```typescript
<Button variant="primary">Button</Button>
<Button kind="primary">Button</Button>
<Button appearance="primary">Button</Button>
```

## استخدام الخصائص المنطقية (Boolean Props)

[نظام Acorn التصميمي من Mozilla](https://firefoxux.github.io/firefox-desktop-components/?path=/story/ui-widgets-button--regular-button) يستخدم خاصية `primary` وخاصية `disabled`، وكلٌّ منهما قيمة منطقية. وسيبدو هذا الأسلوب شيئًا كهذا:

```typescript
<Button primary>Button</Button>
<Button secondary>Button</Button>
```

هذه الصيغة جميلة فعلًا، لكنك تخاطر بأن ينتهي بك الأمر إلى شخص يمرّر مجموعة متغيّرات متعارضة.

```typescript
<Button primary secondary>
  Button
</Button>
```

نستطيع *أن* نحتمي من هذا السلوك بأمان الأنواع وفحوص زمن التشغيل معًا، لكنه بالتأكيد أكثر تعقيدًا. وبما أن الأسلوب الأول أكثر شيوعًا، فلننظر في تنفيذه أولًا.

## تنفيذ خاصية متغيّر

لنستخدم `variant` كخاصيتنا، فهذا يبدو أسلوبًا مجرَّبًا وموثوقًا، وربما الأكثر شيوعًا استنادًا إلى بحثي العابر جدًا أعلاه. وكبداية، ستكون لدينا المتغيّرات التالية:

- `primary`
- `secondary`
- `destructive`

سنبدأ بمكوّن الزر البسيط جدًا من [الفصل السابق](https://stevekinney.com/courses/storybook/writing-stories).

```typescript
import { ComponentProps } from 'react';

type ButtonProps = ComponentProps<'button'>;

export const Button = (props: ButtonProps) => {
  return <button {...props} />;
};
```

أولًا، سنضيف خاصيتنا الجديدة وقيمها المقبولة إلى النوع `ButtonProps`.

```typescript
type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary' | 'destructive';
};
```

### تصميم الزر

> **كلمة مختصرة عن التصميم**
>
> سنبدأ الآن باستخدام CSS العادي ووحدات CSS. ولاحقًا، سنستخدم [Tailwind](https://tailwindcss.com/) في محاولة لتسهيل حياتنا والتركيز على تفاصيل Storybook نفسها بدلًا من CSS. لكن لك أن تستخدم أي أدوات تصميم تُسعدك أكثر. وليس لـ Storybook حصان في هذا السباق.

لنبدأ بتصميم الزر. لم ننفّذ أي من هذه المتغيّرات بعد، لذا سنعمل على تصميم الزر الأساسي أولًا ثم نمضي من هناك. وفي `button.module.css`، لدي الأنماط التالية في انتظارك.

```css
.button {
  align-items: center;
  background-color: #4f46e5;
  border-color: transparent;
  border-radius: 0.25rem;
  border-width: 1px;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  color: white;
  cursor: pointer;
  display: inline-flex;
  font-weight: 600;
  gap: 0.375rem;
  padding: 0.375rem 0.75rem;
  transition: background-color 0.2s;
}

/* Focus visible styles */
.button:focus-visible {
  outline: 2px solid;
  outline-offset: 2px;
}

/* Disabled styles */
.button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.button:hover {
  background-color: #4338ca;
}

.button:active {
  background-color: #3730a3;
}

/* Variant: secondary */
.secondary {
  background-color: white;
  color: #1f2937;
  border-color: #94a3b8;
}

.secondary:hover {
  background-color: #f1f5f9;
}

.secondary:active {
  background-color: #e2e8f0;
}

/* Variant: destructive */
.destructive {
  background-color: #dc2626;
  color: white;
  border-color: transparent;
}

.destructive:hover {
  background-color: #b91c1c;
}

.destructive:active {
  background-color: #991b1b;
}

/* Variant: ghost */
.ghost {
  background-color: transparent;
  color: #4f46e5;
  border-color: transparent;
  box-shadow: none;
}

.ghost:hover {
  background-color: #f1f5f9;
}

.ghost:active {
  background-color: #e2e8f0;
}
```

سنضيف النمط إلى مكوّننا ثم نستمتع بثمار عملنا.

```typescript
import styles from './button.module.css';

export const Button = (props: ButtonProps) => {
  return <button className={styles.button} {...props} />;
};
```

صار زرنا الآن أجمل قليلًا.

![إضافة متغيّرات إلى مكوّن الزر](/images/kinney/9539156f5cfd5695.webp)

حتى الآن، أجرينا التغييرات التالية على شيفرتنا.

```diff
diff --git a/src/components/button/button.tsx b/src/components/button/button.tsx
index 578f1d2..a6632c5 100644
--- a/src/components/button/button.tsx
+++ b/src/components/button/button.tsx
@@ -1,9 +1,11 @@
 import { ComponentProps } from 'react';

+import styles from './button.module.css';
+
 type ButtonProps = ComponentProps<'button'> & {
   variant?: 'primary' | 'secondary' | 'destructive';
 };

 export const Button = (props: ButtonProps) => {
-  return <button {…props} />;
+  return <button className={styles.button} {…props} />;
 };
```

### تصميم متغيّراتنا

لقد وفّرت بالفعل بعض الأصناف لمتغيّراتنا، لكننا نحتاج إلى إضافتها ديناميكيًا إلى مكوّننا. وإحدى الطرق البسيطة—والمُمِلّة—لفعل ذلك هي إلحاقها بسلسلة `className` فحسب. وقد يبدو هذا شيئًا كهذا:

```typescript
export const Button = ({ variant = 'primary', ...props }: ButtonProps) => {
  let className = styles.button;
  if (variant === 'secondary') className += ` ${styles.secondary}`;
  if (variant === 'destructive') className += ` ${styles.destructive}`;

  return <button className={className} {...props} />;
};
```

#### إضافة قصص لمتغيّراتنا

إذا أردنا أن نرى كلًّا من هذه المتغيّرات بسهولة في Storybook، فسنحتاج إلى إضافة قصص إضافية لكل متغيّر.

```typescript
export const Primary: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Button',
    variant: 'secondary',
  },
};

export const Destructive: Story = {
  args: {
    children: 'Button',
    variant: 'destructive',
  },
};
```

سنرى الآن كل متغيّر في Storybook لدينا، إضافة إلى أداة تحكم إضافية للتبديل بين المتغيّرات.

![زر أساسي مع المتغيّرات](/images/kinney/7d48f6d7198d8b75.webp)

### استخدام `clsx` لتركيب أسماء الأصناف

> **تثبيت `clsx`**
>
> قد تحتاج إلى تثبيت `clsx` كاعتماد باستخدام `npm install clsx`. وإذا كنت تتابع مع المستودع المثال، فقد أدرجته بالفعل في `package.json`.

في مثالنا البسيط جدًا، نجح إلحاق السلسلة لتركيب قائمة الأصناف التي نريد تطبيقها على زرنا، لكنه سيصبح مُمِلًّا مع نمو تعقيد زرنا. ويمكننا استخدام [`clsx`](https://www.npmjs.com/package/clsx)، وهي أداة مفيدة لتطبيق الأصناف ديناميكيًا، لجعل حياتنا المستقبلية أسهل قليلًا.

```typescript
import { ComponentProps } from 'react';
import clsx from 'clsx';

import styles from './button.module.css';

type ButtonProps = ComponentProps<'button'> & {
  variant?: 'primary' | 'secondary' | 'destructive';
};

export const Button = ({ variant = 'primary', ...props }: ButtonProps) => {
  return (
    <button
      className={clsx(
        styles.button,
        variant === 'secondary' && styles.secondary,
        variant === 'destructive' && styles.destructive,
      )}
      {...props}
    />
  );
};
```

يدعم `clsx` أيضًا صيغة الكائن التي يمكنك استخدامها إن فضّلت.

```typescript
export const Button = ({ variant = 'primary', ...props }: ButtonProps) => {
  return (
    <button
      className={clsx(styles.button, {
        [styles.secondary]: variant === 'secondary',
        [styles.destructive]: variant === 'destructive',
      })}
      {...props}
    />
  );
};
```

`clsx` مفيد بعض الشيء في هذا المثال، لكنه يصبح *أكثر* فائدة بكثير عندما يكون لدينا منطق أكثر تعقيدًا ولو قليلًا.

وبعد أن صارت متغيّراتنا الأولية في مكانها، لنعبث قليلًا بـ [أدوات التحكم](https://stevekinney.com/courses/storybook/controls).
