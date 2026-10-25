---
title: "الحل"
---

هذا مسار معقول واحد من الحالة الابتدائية للملفّين `rate-book.spec.ts` و`smoke.spec.ts` إلى نسخة أفضل تجهيزًا بالأدوات. وكما هو الحال مع بقية الحلول في هذه الدورة، قد تتخذ نسختك قرارات مختلفة — تسميات خطوات مختلفة، واختيارات وسوم مختلفة، ومواضع مختلفة لإسقاط تعليق توضيحي. أما المبادئ التي تُقيَّم على أساسها فهي في الدرس؛ وهذا سردها.

> **متطلبات المختبرات المسبقة**
>
> يحرّر هذا الحل الملف `tests/rate-book.spec.ts`، وهو الملف الذي ينتجه [مختبر تقوية اختبار تقييم الكتاب المتذبذب](https://stevekinney.com/courses/self-testing-ai-agents/lab-harden-the-flaky-rate-book-test). ويستدعي أيضًا `resetShelfContent` من `tests/helpers/seed.ts`، وهو موصول عبر [مختبر إعادة هيكلة التجهيزات](https://stevekinney.com/courses/self-testing-ai-agents/lab-refactor-shelf-fixtures)؛ ويشحن البادئ بديلًا يرمي استثناءً. فإن لم تكن قد أنجزت هذين المختبرين بعد، فتعامل مع الشيفرة أدناه كهدف طموح لا كشيء تلصقه مباشرةً فوق البادئ الحالي.

## الإيداع 1: خطوات في اختبار تقييم الكتاب

أربع مراحل طبيعية في التدفق: الوصول إلى الرف، وفتح النافذة الحوارية، وإرسال التقييم، والتحقق من بقاء التقييم. كل واحدة منها تصبح `test.step`.

```typescript
import { expect, test } from '@playwright/test';
import { resetShelfContent } from './helpers/seed';

test.describe('rate a book on your shelf', () => {
  test.beforeEach(async () => {
    await resetShelfContent();
  });

  test('user can rate Station Eleven', { tag: ['@critical'] }, async ({ page, request }) => {
    await test.step('open the shelf page', async () => {
      await page.goto('/shelf');
    });

    const stationEleven = page.getByRole('article', { name: /Station Eleven/ });

    await test.step('open the rate-book dialog for Station Eleven', async () => {
      await expect(stationEleven).toBeVisible();
      await stationEleven.getByRole('button', { name: 'Rate this book' }).click();
    });

    await test.step('submit 4 stars', async () => {
      const dialog = page.getByRole('dialog', { name: /Rate Station Eleven/ });
      await expect(dialog).toBeVisible();
      await dialog.getByRole('radio', { name: '4 stars' }).check();

      // The `/api/shelf/*` PATCH endpoint is built out in the rate-book
      // hardening lab; the current Shelf starter intentionally does not ship
      // persisted-rating routes. Treat this block as future-state until
      // that lab has landed.
      const ratingResponse = page.waitForResponse(
        (response) =>
          /\/api\/shelf\/.+/.test(response.url()) && response.request().method() === 'PATCH',
      );
      await dialog.getByRole('button', { name: 'Save rating' }).click();
      const savedResponse = await ratingResponse;
      expect(savedResponse.ok()).toBe(true);
    });

    await test.step('verify the rating persists on the shelf and via API', async () => {
      await expect(page.getByRole('status')).toHaveText(/Thanks/);
      await expect(stationEleven.getByText('Rated: 4/5')).toBeVisible();

      const shelfResponse = await request.get('/api/shelf');
      expect(shelfResponse.ok()).toBe(true);
      const body = (await shelfResponse.json()) as {
        entries: Array<{ book: { title: string }; rating: number | null }>;
      };
      const entry = body.entries.find((e) => e.book.title === 'Station Eleven');
      expect(entry?.rating).toBe(4);
    });
  });
});
```

لاحظ ما لم أغيّره: كل تحقّق ما زال يفحص الشيء نفسه بالترتيب نفسه. والشيء الوحيد الذي تضيفه الخطوات هو تسمية تحيط بالمجموعات. شغّل `npm run test`، وأكّد الخضرة، وأودِع.

## الإيداع 2: وسّم اختبارات الدخان ووثّق خطواتها

اختبارا الدخان في البادئ كلاهما `@critical`. أحدهما الوجه العام للبادئ؛ والآخر يُثبت أن المسارات المحمية ما زالت تعيد التوجيه على نحو صحيح حين يكون القارئ مجهولًا. وكلاهما يستحق البقاء في البوابة السريعة.

```typescript
test(
  'home page introduces Shelf and exposes the public starter navigation',
  { tag: ['@critical'] },
  async ({ page }) => {
    await test.step('open the home page', async () => {
      await page.goto('/');
    });

    await test.step('verify the hero message and primary navigation', async () => {
      await expect(
        page.getByRole('heading', { name: /Build a shelf that remembers what you actually read/i }),
      ).toBeVisible();

      const primaryNavigation = page.getByRole('navigation', { name: 'Primary' });

      await expect
        .soft(primaryNavigation.getByRole('link', { name: 'Search' }))
        .toHaveAttribute('href', '/search');
      await expect
        .soft(primaryNavigation.getByRole('link', { name: 'Design system' }))
        .toHaveAttribute('href', '/design-system');
      await expect
        .soft(primaryNavigation.getByRole('link', { name: 'Playground' }))
        .toHaveAttribute('href', '/playground');
      await expect
        .soft(page.getByRole('banner').getByRole('link', { name: 'Sign in' }))
        .toHaveAttribute('href', '/login');
    });
  },
);
```

حدثت ثلاثة أشياء هنا:

1. صار اختبار الدخان الآن `@critical` — سطر واحد على التوقيع.
2. صار لاختبار الصفحة الرئيسية تسميات خطوات صريحة تحيط بالمراحل المرئية للمستخدم.
3. صارت فحوص روابط التنقل الآن `expect.soft`، فلا يخفي رابط مكسور واحد بقية حالة الترويسة.

ويتبع اختبار الدخان الخاص بإعادة التوجيه النمط نفسه:

```typescript
test(
  'protected routes redirect unauthenticated readers to login',
  { tag: ['@critical'] },
  async ({ page }) => {
    await test.step('verify search redirects to login', async () => {
      await page.goto('/search');
      await expect(page).toHaveURL(/\/login\?returnTo=%2Fsearch$/);
    });

    await test.step('verify shelf redirects to login', async () => {
      await page.goto('/shelf');
      await expect(page).toHaveURL(/\/login\?returnTo=%2Fshelf$/);
    });
  },
);
```

ويحتفظ اختبار تقييم الكتاب بتعليق المسألة التوضيحي:

```typescript
test('user can rate Station Eleven', { tag: ['@critical'] }, async ({ page, request }) => {
  test.info().annotations.push({
    type: 'issue',
    description: 'https://github.com/stevekinney/shelf-life/issues/TBD',
  });

  // ...the stepped rate-book flow from Commit 1...
});
```

شغّل المجموعة كاملة. خضراء. أودِع.

## الإيداع 3: تحقّق من عمل مرشّح الوسوم

```bash
npx playwright test --grep @critical
```

ينبغي أن يعرض ثلاثة اختبارات (اختبار تقييم الكتاب، مع اختباري الدخان). فإن ظهر شيء لم توسمه، فعندك تسريب في التعبير النمطي. وإن لم يظهر شيء *وسمته*، فمصفوفة الوسوم خطأ.

## كيف يبدو الفشل الآن

اكسر اختبار تقييم الكتاب عمدًا — غيّر `4` إلى `5` في التحقّق — وشغّله. يقرأ تقرير الفشل الآن:

```
1) [authenticated] › rate-book.spec.ts:10 › user can rate Station Eleven
   Error in step: verify the rating persists on the shelf and via API
   expected 5 but received 4
```

(تظهر بادئة المشروع `[authenticated]` بمجرد أن يضيف مختبر حالة التخزين مشروع `authenticated` إلى `playwright.config.ts`. وإن كنت تشغّل هذا قبل أن يُنجَز ذلك المختبر، فستبدو بادئة مشروعك مختلفة.)

قارن ذلك بما كان قبل، حين كان يقول:

```
1) [authenticated] › rate-book.spec.ts:42
   expected 5 but received 4
```

التباين نفسه، لكن الحكاية مختلفة جذريًا. فالوكيل الذي يقرأ ملف الأدلة يعرف أن الفشل في مرحلة «التحقق من بقاء التقييم»، ما يعني أن طلب PATCH قد مرّ (وإلا لانفجرت خطوة أبكر)، ما يعني أن المشكلة إما في تحليل الاستجابة أو في أي شيء أعاده الخادم. فتلك ثلاثة أسباب محتملة من فضاء ابتدائي هو «أي واحد من الأشياء الاثني عشر التي يفعلها هذا الاختبار».

أزل الكسر عن الاختبار. شغّل المجموعة كاملة. أودِع الفرق.

## إضافي: المُبلِّغ الخاص بالخطوات فقط

المُبلِّغ المخصّص في المختبر نحو 30 سطرًا. ألقِه في `tests/reporters/step-reporter.ts`، وأضفه إلى إعداد Playwright مؤقت خاص بالمختبر أو إلى إعدادك الرئيسي أثناء تجريبك، وسيطبع تشغيل المختبر الفاشل التالي أسماء الخطوات ومددها للاختبارات الفاشلة بالضبط — لا شيء غير ذلك. وتلك المخرجات هي أنظف مدخل ممكن لـ[ملخِّص ملف أدلة الفشل](https://stevekinney.com/courses/self-testing-ai-agents/failure-dossiers-what-agents-actually-need-from-a-red-build)، الذي عليه الآن أن يحلّل مخرجات مُبلِّغ JSON كاملة ليستخرج المعلومة نفسها.

والأرجح أنك لن تشحن المُبلِّغ الخاص بالخطوات فقط إلى الإنتاج. ستستخدمه محليًا حين تنقّح سلسلة طويلة.

## قراءات إضافية

- [test.step والوسوم والتعليقات التوضيحية](https://stevekinney.com/courses/self-testing-ai-agents/test-step-tags-annotations) — الدرس الذي يمشي عليه هذا الحل.
- [ملفات أدلة الفشل: ما يحتاجه الوكلاء فعلًا من بناء أحمر](https://stevekinney.com/courses/self-testing-ai-agents/failure-dossiers-what-agents-actually-need-from-a-red-build) — ملف الأدلة الذي صار يُقرأ أفضل الآن لأن لكل خطوة تسمية.
- [مختبر: إعادة هيكلة تجهيزات Shelf](https://stevekinney.com/courses/self-testing-ai-agents/lab-refactor-shelf-fixtures) — نوع مختلف من إعادة الهيكلة، والروح نفسها.
