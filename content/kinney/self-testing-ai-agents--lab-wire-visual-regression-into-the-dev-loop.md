---
title: "مختبر"
lang: ar
source: "https://stevekinney.com/courses/self-testing-ai-agents/lab-wire-visual-regression-into-the-dev-loop"
---

مختبر قصير. شطران. يربط الشطر الأول بوابة لقطات الشاشة بـ Shelf. ويكسر الشطر الثاني مكوّنًا عمدًا ويراقب الحلقة تنطلق.

> **المتطلّبات المسبقة**
>
> أكمل [الانحدار البصري كحلقة تغذية راجعة](https://stevekinney.com/courses/self-testing-ai-agents/visual-regression-as-a-feedback-loop) أولًا. يفترض هذا المختبر إرشادات الحجب والحالة الثابتة وإعداد اللقطات من ذلك الدرس.

## الإعداد

تأكّد أنك على نسخة Shelf المحصّنة من [مختبر: تحصين اختبار Rate-Book المتقلّب](https://stevekinney.com/courses/self-testing-ai-agents/lab-harden-the-flaky-rate-book-test). ستحتاج إلى مصادقة حالة التخزين والزرع مهيّأين في مكانهما. والانحدار البصري بلا هذين كابوس.

لا تشحن نسخة Shelf الأولية مواصفات انحدار بصري ولا ربط المشاريع. هذا المختبر هو حيث تضيفها. إن كان مستودعك ما يزال يحمل إعداد الدخان العام الأدنى فقط، فابدأ باللقطة العامة أولًا، ثم وجّه اللقطة الموثّقة عبر مشروع `authenticated` الذي بنيته في مختبر Rate-Book.

## الجزء الأول: ربط بوابة اللقطات

وزّع الفحوص البصرية على ملفين كي يعمل كل منها في مشروع Playwright الذي تتطابق مصادقته وزرعه مع الصفحة تحت الاختبار:

- `tests/visual.spec.ts` — عام، بلا حالة تخزين، ويلتقط `/design-system` (معرض المكوّنات المنسّق).
- `tests/visual-authenticated.spec.ts` — يعمل تحت مشروع `authenticated`، ويعيد زرع محتوى الرفّ قبل كل اختبار، ويلتقط `/shelf`.

```typescript
// tests/visual.spec.ts
import { expect, test } from '@playwright/test';

test('design system matches the starter visual baseline', async ({ page }) => {
  await page.goto('/design-system');
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page).toHaveScreenshot('design-system.png', {
    fullPage: true,
  });
});
```

```typescript
// tests/visual-authenticated.spec.ts
import { expect, test } from '@playwright/test';
import { resetShelfContent } from './helpers/seed';

test.beforeEach(async () => {
  await resetShelfContent();
});

test('shelf page matches the seeded visual baseline', async ({ page }) => {
  await page.goto('/shelf');

  await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
  await expect(page.getByRole('article', { name: /Station Eleven/ })).toBeVisible();

  await expect(page).toHaveScreenshot('shelf-page.png', { fullPage: true });
});
```

وجّه الملف الجديد عبر مشروع `authenticated` في `playwright.config.ts`:

```typescript
{
  name: 'authenticated',
  testMatch: /(rate-book|accessibility|visual-authenticated|performance)\.spec\.ts/,
  use: {
    ...devices['Desktop Chrome'],
    storageState: storageStatePath,
  },
  dependencies: ['setup'],
},
```

وتأكّد أن `expect.toHaveScreenshot` مهيّأ عالميًا:

```typescript
expect: {
  toHaveScreenshot: {
    animations: 'disabled',
    caret: 'hide',
    scale: 'css',
    maxDiffPixelRatio: 0.01,
  },
},
```

ولّد الأساسات:

```bash
npm run test -- --update-snapshots
```

أودِع ملفات PNG للأساسات في `tests/visual.spec.ts-snapshots/` و`tests/visual-authenticated.spec.ts-snapshots/`. نعم، تودع ملفات PNG في git. هذا هو الاتفاق.

## معايير قبول الجزء الأول

- أن يوجد كل من `visual.spec.ts` (العام) و`visual-authenticated.spec.ts` (الموثّق)، ويحتوي كل منهما على تأكيد `toHaveScreenshot` واحد على الأقل.
- أن يضبط `playwright.config.ts` القيم `animations: 'disabled'` و`caret: 'hide'` و`scale: 'css'` و`maxDiffPixelRatio: 0.01` تحت `expect.toHaveScreenshot`.
- أن ينجح `npm run test` في تشغيل نظيف (بلا فروق) — بما في ذلك كلا الاختبارين البصريين.
- أن ينتج تشغيل المجموعة خمس مرات متتالية صفر إيجابيات كاذبة في أي من اختبارَي اللقطات: `for i in {1..5}; do npm run test || break; done` يخرج بصفر في كل تكرار.
- أن يوجد كلا ملفَي اللقطات الأساسية (`ls tests/visual.spec.ts-snapshots/ tests/visual-authenticated.spec.ts-snapshots/` يطبع ملفات PNG المودعة).
- أن لا يتجاهل `.gitignore` ملفات PNG للقطات.

## هدف اللقطة في Shelf

بمجرد أن تُربط المجموعة بشكل صحيح، ينبغي أن يبدو أساس صفحة Shelf شيئًا كهذا:

![الأساس البصري لـ Shelf مرسومًا من لقطة Playwright المودعة](/images/kinney/5931137c35aa95e1.webp)

## الجزء الثاني: اكسر شيئًا، وراقبها تنطلق

الآن سنحاكي الحلقة. افتح `src/lib/components/button.svelte`. اعثر على التعبير المشتق `classes` وغيّر الحشوة الأساسية:

```svelte
<!-- before -->
'inline-flex items-center justify-center rounded-(--radius-control) px-4 py-2 text-sm font-semibold ...',
<!-- after -->
'inline-flex items-center justify-center rounded-(--radius-control) px-6 py-3 text-sm font-semibold ...',
```

أعِد تشغيل المواصفات البصرية:

```bash
npm run test -- --grep visual
```

سيفشل. افتح تقرير HTML:

```bash
npx playwright show-report playwright-report/html
```

اعثر على الاختبار الفاشل، وانظر إلى العرض ثلاثي الألواح (الأساس، والفعلي، والفرق). ينبغي أن تُظهر صورة الفرق بوضوح أن حجم الأزرار في اللقطتين قد تغيّر.

الآن حاكِ حلقة الوكيل. أمامك خياران بحسب إعدادك:

**الخيار أ—يدوي.** انسخ مسار صورة الفرق إلى محادثة Claude Code واسأل: *«فشل اختبار الانحدار البصري. هذا هو الفرق. ما الذي تغيّر، وهل التغيير مقصود؟»* ودع الوكيل ينظر إلى الصورة ويصف ما يراه.

**الخيار ب—بخطّاف.** إن كنت تستخدم Claude Code مع خطّاف يرفق إخفاقات الاختبارات تلقائيًا، فشغّل الاختبار فقط ودع الخطّاف ينطلق. (سنربط هذا النوع من الخطّافات بشكل صحيح في [خطّافات Git مع Lefthook](https://stevekinney.com/courses/self-testing-ai-agents/git-hooks-with-lefthook). أما اليوم، فاليدوي كافٍ.)

في الحالتين، لاحظ ما يقوله الوكيل. ينبغي أن يحدّد أن الأزرار كبرت، ويخمّن بشكل صحيح إن كان التغيير قد تسلسل إلى تخطيط آخر (على Shelf، على الأرجح وسّع بعض البطاقات)، ويقترح إمّا التراجع عن التغيير أو تحديث الأساس.

عندما تنجح تجربة الحشوة على النحو الصحيح، ينبغي أن يبدو فرق صفحة Shelf كتغيير من نوع «كل شيء صار أفسح»:

![الفرق البصري لصفحة Shelf بعد توسيع حشوة الزر](/images/kinney/02499d1258b63ca0.webp)

## معايير قبول الجزء الثاني

- أن ينتج تغيير حشوة الزر تأكيد `toHaveScreenshot` فاشلًا.
- أن يحتوي `playwright-report/` صورة فرق للاختبار الفاشل.
- أن تكون قد عرضت الفرق على وكيلك وحصلت على رد يحدّد بدقة ما تغيّر بصريًا.
- أن تكون إمّا (أ) تراجعت عن تغيير الزر وأعدت التشغيل حتى الأخضر، أو (ب) شغّلت `--update-snapshots` كتحديث أساس مقصود وأودعت الأساسات الجديدة في التزام منفصل.
- أن يُظهر سجل git لديك التجربة كالتزامات منفصلة كي يبقى التسلسل مقروءًا لاحقًا.

## أهداف إضافية

- أضف مسار `design-system` يمرّن كل مكوّن في كل حالة، إن لم يكن لدى Shelf واحد بالفعل. وأضف اختبار لقطة واحدًا للمسار كله. اعتبر هذا [Chromatic](https://www.chromatic.com/) نسخة الفقراء.
- أعدّ مشروع Playwright ثانيًا لحجم عرض مختلف (مثلًا `iPhone 13` من إعدادات أجهزة Playwright) وأعد توليد الأساسات له. الآن يغطّي انحدارك البصري الهاتف المحمول أيضًا.
- جرّب التدفّق نفسه مع [Chromatic](https://www.chromatic.com/) بدلًا من اللقطات المدمجة، فقط لترى الفرق في تجربة المراجعة. لا تودع إعداد Chromatic بشكل دائم ما لم يكن الفريق كله موافقًا—فالمدمج هو النمط طويل الأمد لهذه الورشة.
- أدخل تغييرًا دقيقًا عمدًا (مثلًا تغيير وزن خط من 500 إلى 600) وانظر إن كان هامش التفاوت `maxDiffPixelRatio: 0.01` يلتقطه. اضبط التفاوت إن لزم.

## الشيء الوحيد الذي يجب تذكّره

اختبار اللقطة الفاشل بادرة حوار. وصورة الفرق هي الرسالة. وبمجرد أن يستطيع الوكيل قراءة الفرق، تُغلق الحلقة نفسها.

## قراءات إضافية

- [الحل](https://stevekinney.com/courses/self-testing-ai-agents/wire-visual-regression-into-the-dev-loop-solution)
- [الانحدار البصري كحلقة تغذية راجعة](https://stevekinney.com/courses/self-testing-ai-agents/visual-regression-as-a-feedback-loop)
- [مسابر وقت التشغيل في حلقة التطوير](https://stevekinney.com/courses/self-testing-ai-agents/runtime-probes-in-the-development-loop)
