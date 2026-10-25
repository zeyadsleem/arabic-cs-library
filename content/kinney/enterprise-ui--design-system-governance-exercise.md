---
title: "التمرين السابع: حوكمة نظام التصميم"
lang: ar
source: "https://stevekinney.com/courses/enterprise-ui/design-system-governance-exercise"
---

## ما الذي ستفعله

تحتوي حزمة `@pulse/ui` على ملف `tokens.ts` يصدّر ثوابت الألوان والتباعد وأنصاف الأقطار — لكن لا يستخدمها أي مكوّن فعليًا. فمكوّن `Button` يثبّت أصناف Tailwind مباشرةً مثل `bg-gray-900`. ومكوّن `StatCard` يثبّت ألوان حدوده ونصه بنفسه. ملف الـ tokens موجود، لكنه زينة لا أكثر. ستربط نظام الـ tokens بالمكوّنات عبر خصائص CSS المخصّصة، ثم تضيف اختبارات انحدار بصري تلتقط التغييرات غير المقصودة عند تعديل الـ tokens.

## لماذا يهم هذا

نظام التصميم الذي لا تُفرَض قواعده ليس سوى ملف PDF لدليل أنماط لا يقرأه أحد. إن الـ tokens الموجودة في ملف دون أن تشير إليها المكوّنات تزرع ثقة زائفة: يعتقد الفريق أن لديه مصدرًا واحدًا للحقيقة، بينما يتخذ كل مكوّن في الواقع قراراته اللونية الخاصة. وتحل خصائص CSS المخصّصة هذه المشكلة بإنشاء صلة وقت التشغيل بين تعريفات الـ tokens وعرض المكوّنات. فعندما تغيّر `--color-primary`، يتحدّث تلقائيًا كل مكوّن يشير إليه. وتُغلق اختبارات الانحدار البصري الحلقة: فهي تُثبّت كيف *ينبغي* أن تبدو الواجهة، بحيث يظهر أي تغيير في الـ tokens يؤثر على التخطيط أو اللون بشكل غير متوقع كفروق في لقطة شاشة قبل أن يصل إلى الإنتاج.

## المتطلبات المسبقة {#prerequisites}

- Node.js 20 أو أحدث
- pnpm 9 أو أحدث

## الإعداد

يفترض أنك تتابع من حيث توقّف التمرين السادس. وإذا احتجت إلى اللحاق بالركب:

```bash
git checkout 06-design-system-start
pnpm install
```

## افحص نظام الـ tokens المنفصل

قبل أن تغيّر أي شيء، افهم الفجوة بين تعريفات الـ tokens والمكوّنات التي ينبغي أن تستخدمها.

افتح `packages/ui/src/tokens.ts`:

*packages/ui/src/tokens.ts*

```typescript
export const colors = {
  primary: '#2563eb',
  primaryHover: '#1d4ed8',
  secondary: '#64748b',
  success: '#22c55e',
  danger: '#ef4444',
  warning: '#f59e0b',
  background: '#ffffff',
  surface: '#f8fafc',
  border: '#e2e8f0',
  text: '#0f172a',
  textMuted: '#64748b',
} as const;

export const spacing = {
  xs: '0.25rem',
  sm: '0.5rem',
  md: '1rem',
  lg: '1.5rem',
  xl: '2rem',
} as const;

export const radii = {
  sm: '0.25rem',
  md: '0.5rem',
  lg: '0.75rem',
  full: '9999px',
} as const;
```

الآن افتح `packages/ui/src/button.tsx`. تستخدم أنماط المتغيّرات قيمًا مثبّتة — مثل `bg-gray-900` و`text-white` وما شابهها من أصناف Tailwind المساعدة — بدلًا من الإشارة إلى أي شيء من `tokens.ts`.

افتح `packages/ui/src/stat-card.tsx`. النمط نفسه: ألوان حدود وألوان نص مثبّتة دون أي صلة بملف الـ tokens.

ابحث في قاعدة الشيفرة عن أي استيراد لـ `tokens.ts`:

```bash
grep -r "from.*tokens" packages/ui/src/
```

لا يستورد أي مكوّن ملف الـ tokens. فالـ tokens يتيمة.

> **النمط المضاد: tokens منفصلة**
>
> هذا أسوأ من ألّا تكون لديك tokens على الإطلاق. فحين لا يوجد ملف tokens، يعرف الفريق أنه لا يوجد مصدر واحد للحقيقة ويتخذ قراراته على هذا الأساس. أما حين يوجد ملف tokens لا يشير إليه شيء، فإن الفريق *يعتقد* أن لديه مصدرًا واحدًا للحقيقة. فيغيّر أحدهم `colors.primary` في `tokens.ts`، ويفترض أن الواجهة تحدّثت، ثم يُطلق الإصدار. لكن شيئًا لم يتغيّر. فملف الـ tokens يصنع ثقة زائفة.

### نقطة تحقق

لقد تأكدت من الفجوة: يعرّف `tokens.ts` لغة التصميم، لكن `button.tsx` و`stat-card.tsx` يتجاهلانه تمامًا. وتغيير قيمة في `tokens.ts` لن يكون له أي أثر على الواجهة المعروضة.

## أنشئ خصائص CSS مخصّصة

لا تستطيع ثوابت JavaScript أن تتوارث عبر DOM، ولا أن تُتجاوَز لكل مكوّن على حدة، ولا أن تُستبدل وقت التشغيل لأجل السمات. أما خصائص CSS المخصّصة فتستطيع ذلك. أنشئ ملف CSS يربط قيم الـ tokens بمحرّك العرض في المتصفح.

أنشئ `packages/ui/src/tokens.css`:

*packages/ui/src/tokens.css*

```css
:root {
  /* Colors */
  --color-primary: #2563eb;
  --color-primary-hover: #1d4ed8;
  --color-secondary: #64748b;
  --color-success: #22c55e;
  --color-danger: #ef4444;
  --color-warning: #f59e0b;
  --color-background: #ffffff;
  --color-surface: #f8fafc;
  --color-border: #e2e8f0;
  --color-text: #0f172a;
  --color-text-muted: #64748b;

  /* Spacing */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2rem;

  /* Radii */
  --radius-sm: 0.25rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-full: 9999px;
}
```

استورد ملف CSS الخاص بالـ tokens في ورقة الأنماط العامة للتطبيق. افتح `apps/dashboard/src/global.css` وأضف الاستيراد:

*apps/dashboard/src/global.css*

```css
@import 'tailwindcss';
@import '@pulse/ui/src/tokens.css';
@source '../../../packages';
```

> **لماذا خصائص CSS المخصّصة بدلًا من ثوابت JavaScript**
>
> ثلاثة أسباب. أولًا، تتوارث خصائص CSS المخصّصة عبر DOM: يمكن للعنصر الأب أن يتجاوز `--color-primary`، فيلتقط كل مكوّن فرعي يشير إليه القيمة الجديدة دون أي تمرير props أو مزوّدات سياق. ثانيًا، تتيح السمات عبر خصائص `data-theme`: يمكنك تعريف `[data-theme="dark"] { --color-background: #0f172a; }` وتبديل السمات بتغيير خاصية واحدة على العنصر الجذري. ثالثًا، تعمل مع أي أسلوب تنسيق — أصناف Tailwind المساعدة، أو الأنماط المضمّنة، أو وحدات CSS، أو CSS العادي — لأنها تعيش في محرّك أنماط المتصفح لا في JavaScript.

### نقطة تحقق

افتح أدوات المطوّر في المتصفح على التطبيق العامل (`pnpm dev` من جذر مساحة العمل) وافحص العنصر `:root`. ينبغي أن ترى كل الخصائص المخصّصة `--color-*` و`--space-*` و`--radius-*` مدرجة ضمن الأنماط المحسوبة للعنصر.

## اربط المكوّنات بالـ tokens

حدّث الآن المكوّنات لتشير إلى خصائص CSS المخصّصة بدلًا من القيم المثبّتة.

افتح `packages/ui/src/button.tsx` واستبدله بما يلي:

*packages/ui/src/button.tsx*

```typescript
import React from 'react';

type ButtonVariant = 'primary' | 'secondary' | 'ghost';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  children: React.ReactNode;
}

const variantStyles: Record<ButtonVariant, React.CSSProperties> = {
  primary: {
    backgroundColor: 'var(--color-primary)',
    color: 'var(--color-background)',
  },
  secondary: {
    backgroundColor: 'var(--color-background)',
    color: 'var(--color-text)',
    border: '1px solid var(--color-border)',
  },
  ghost: {
    backgroundColor: 'transparent',
    color: 'var(--color-text-muted)',
  },
};

export function Button({
  variant = 'primary',
  className = '',
  children,
  style,
  ...props
}: ButtonProps): React.ReactElement {
  return (
    <button
      className={`rounded-md px-4 py-2 text-sm font-medium transition-colors ${className}`}
      style={{ ...variantStyles[variant], ...style }}
      {...props}
    >
      {children}
    </button>
  );
}
```

تشير أنماط المتغيّرات الآن إلى خصائص CSS المخصّصة عبر `var()`. يستخدم المتغيّر `primary` الخاصية `--color-primary` لخلفيته والخاصية `--color-background` للون نصه. ويستخدم المتغيّر `secondary` الخاصية `--color-border` لحدوده. ولم تبقَ أي قيم سداسية عشرية مثبّتة في تعريفات المتغيّرات.

افتح `packages/ui/src/stat-card.tsx` واستبدله بما يلي:

*packages/ui/src/stat-card.tsx*

```typescript
import React from 'react';

interface StatCardProps {
  label: string;
  value: string;
}

export function StatCard({ label, value }: StatCardProps): React.ReactElement {
  return (
    <div
      className="rounded-lg border p-5"
      style={{
        borderColor: 'var(--color-border)',
        backgroundColor: 'var(--color-background)',
      }}
    >
      <p className="text-sm" style={{ color: 'var(--color-text-muted)' }}>
        {label}
      </p>
      <p
        className="mt-1 text-2xl font-semibold"
        style={{ color: 'var(--color-text)' }}
      >
        {value}
      </p>
    </div>
  );
}
```

تحقّق من أن الصلة تعمل. افتح `packages/ui/src/tokens.css` وغيّر `--color-primary` مؤقتًا إلى قيمة واضحة:

```css
--color-primary: #ff0000;
```

أعد تحميل لوحة المعلومات. ينبغي أن يصبح كل زر رئيسي أحمر الآن. ثم أعد القيمة إلى `#2563eb`.

> **هذه هي آلية الحوكمة**
>
> قبل هذه الخطوة، كان تغيير اللون الرئيسي يتطلّب العثور على كل مكوّن يثبّته وتحديث كل واحد منها على حدة. أما الآن، فتغيير `--color-primary` في ملف واحد يتوارث عبر كل مكوّن يشير إليه. ولم يعد ملف الـ tokens زينة — بل صار المصدر الوحيد للحقيقة في قيم الألوان، تفرضه آلية CSS في المتصفح.

### نقطة تحقق

تُعرض لوحة المعلومات كما كانت تمامًا — الألوان نفسها والتخطيط نفسه. الفرق بنيوي: فالألوان تتدفّق الآن من `tokens.css` عبر خصائص CSS المخصّصة إلى أنماط المكوّنات. وتغيير قيمة token واحدة في `tokens.css` يؤثر تأثيرًا مرئيًا في كل مكوّن يستخدمها.

## أضف اختبارات الانحدار البصري

يحل ربط الـ tokens بالمكوّنات مشكلة الاتساق، لكنه يُدخل خطرًا جديدًا: تغيير token واحدة صار يؤثر في الواجهة كلها. تحتاج إلى وسيلة تتحقّق من أن تغييرات الـ tokens تُنتج النتيجة البصرية *المقصودة* ولا شيء غيرها. وتفعل مقارنة لقطات الشاشة في Playwright ذلك تلقائيًا.

أنشئ `tests/e2e/visual.spec.ts`:

*tests/e2e/visual.spec.ts*

```typescript
import { test, expect } from '@playwright/test';

test.describe('Visual regression', () => {
  test('analytics dashboard matches baseline', async ({ page }) => {
    await page.goto('/');

    // Wait for all data to load
    await expect(page.getByText('Total Users')).toBeVisible();
    await expect(page.getByText('12,847')).toBeVisible();
    await expect(page.getByRole('img', { name: 'Analytics activity chart' })).toBeVisible();
    await expect(page.getByText('Recent Activity')).toBeVisible();

    await expect(page).toHaveScreenshot('analytics-dashboard.png', {
      fullPage: true,
    });
  });

  test('settings page matches baseline', async ({ page }) => {
    await page.goto('/settings');

    await expect(page.getByText('Pulse Inc.')).toBeVisible();

    await expect(page).toHaveScreenshot('settings-page.png', {
      fullPage: true,
    });
  });
});
```

> **كيف تعمل `toHaveScreenshot()`**
>
> في أول مرة تشغّل فيها هذا الاختبار، يلتقط Playwright لقطة شاشة مرجعية ويحفظها في دليل `visual.spec.ts-snapshots`. وفي التشغيلات اللاحقة، يلتقط لقطة جديدة ويقارنها بالمرجع بكسلًا بكسلًا. وإذا اختلفت الصور بما يتجاوز حدًا قابلًا للضبط، يفشل الاختبار ويُنتج صورة فروق تُبرز بالضبط البكسلات التي تغيّرت. وهذا حتمي لأن MSW يوفّر بيانات API ثابتة — فالطلبات نفسها تعيد الأرقام نفسها في كل مرة.

شغّل الاختبارات لتوليد لقطات الشاشة الأساسية:

```bash
pnpm exec playwright test tests/e2e/visual.spec.ts --update-snapshots
```

يُنشئ هذا لقطات شاشة مرجعية في دليل اللقطات. وهذه هي الصور «المتوقّعة» التي ستقارن بها تشغيلات الاختبار المستقبلية.

شغّل الاختبارات مرة أخرى دون `--update-snapshots`:

```bash
pnpm exec playwright test tests/e2e/visual.spec.ts
```

ينبغي أن تنجح الاختبارات لأن العرض الحالي يطابق اللقطات الأساسية التي التقطتها للتوّ.

اختبر الآن شبكة الأمان. افتح `packages/ui/src/tokens.css` وغيّر لون الحدود:

```css
--color-border: #ff0000;
```

شغّل الاختبارات البصرية مرة أخرى:

```bash
pnpm exec playwright test tests/e2e/visual.spec.ts
```

ينبغي أن تفشل الاختبارات بفروق في لقطة الشاشة تُظهر حدودًا حمراء حيث كانت تُتوقّع حدود رمادية. هذه هي طبقة الحوكمة: فالاختبارات البصرية تُثبّت كيف ينبغي أن تبدو الواجهة، وأي تغيير في الـ tokens يخرج عن الأساس يُنتج فروقًا مرئية قابلة للمراجعة.

أعِد لون الحدود إلى `#e2e8f0`.

> **الانحدار البصري كحوكمة**
>
> يفرض التدقيق المعماري (التمرين السادس) حدود الحزم — من يحق له استيراد ماذا. وتفرض design tokens الاتساق البصري — أي الألوان والتباعد مسموح. وتُغلق اختبارات الانحدار البصري حلقة التغذية الراجعة بتثبيت *النتيجة المعروضة* لتلك القرارات. فالمطوّر الذي يغيّر `--color-border` يرى بالضبط أي الصفحات تأثّرت في فروق لقطة الشاشة. ويستطيع المراجع على طلب السحب أن يوافق على التغيير البصري أو يرفضه صراحةً، بدلًا من اكتشافه في الإنتاج.

> **علم `--update-snapshots` يدوي عن قصد**
>
> يتطلّب تحديث اللقطات الأساسية قرارًا متعمّدًا: «نعم، هكذا ينبغي أن تبدو الواجهة الآن». وهذا يمنع الانحراف العرَضي للأساس. وفي CI، تُشغَّل الاختبارات *دون* `--update-snapshots`، لذا يفشل البناء عند أي تغيير بصري حتى يحدّث أحدهم الأساس صراحةً ويُودع لقطات الشاشة المرجعية الجديدة.

### نقطة تحقق

اختبارات الانحدار البصري أصبحت جاهزة. تغيير قيمة token في `tokens.css` يُسبّب فشل اختبار مع فروق لقطة شاشة. وتحديث اللقطات الأساسية يتطلّب علم `--update-snapshots` صريحًا. ونظام التصميم الآن محوكَم على ثلاثة مستويات: الـ tokens تعرّف القيم، والمكوّنات تشير إليها، واختبارات لقطات الشاشة تتحقّق من الناتج المعروض.

## الحل

إذا احتجت إلى اللحاق بالركب، فالحالة المكتملة لهذا التمرين متاحة على الفرع `07-cicd-start`:

```bash
git checkout 07-cicd-start
pnpm install
```

## أهداف إضافية

- **سمة داكنة عبر `data-theme`:** أضف كتلة `[data-theme="dark"]` إلى `tokens.css` تتجاوز متغيّرات الألوان بقيم داكنة. وأضف زر تبديل للسمة في لوحة المعلومات يضبط `document.documentElement.dataset.theme = "dark"`. ولا حاجة إلى أي تغييرات في المكوّنات — فخصائص CSS المخصّصة تتوارث تلقائيًا.
- **تدقيق الـ tokens باستخدام stylelint:** اكتب قاعدة stylelint (أو استخدم `stylelint-declaration-strict-value`) للإبلاغ عن الألوان السداسية العشرية المثبّتة في ملفات المكوّنات. فإذا استخدم مكوّن ما `#2563eb` مباشرةً بدلًا من `var(--color-primary)`، ينبغي أن ينبّه المدقّق. وهذا يمنع العودة إلى القيم المثبّتة بعد الترحيل.
- **توثيق الـ tokens:** ولّد صفحة مرجعية بصرية للـ tokens تعرض كل قيمة لون وتباعد ونصف قطر من `tokens.css` في شبكة. وهذا يمنح المصمّمين والمطوّرين مرجعًا مشتركًا يبقى متزامنًا مع الشيفرة.

## ما التالي

أصبح لديك نظام تصميم مترابط مع اختبارات انحدار بصري تلتقط التغييرات غير المقصودة. لكن لا شيء من هذا يعمل تلقائيًا على طلبات السحب. في التمرين التالي، ستبني خط CI على GitHub Actions يستخدم Turborepo للتخزين المؤقت ويشغّل فحص الأنواع والتدقيق والاختبار والبناء عند كل دفعة — محوّلًا هذه الفحوص المحلية إلى بوابة جودة آلية.
