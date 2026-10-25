---
title: "التمرين 8: استراتيجيات الاختبار"
lang: ar
source: "https://stevekinney.com/courses/enterprise-ui/testing-strategies-exercise"
---

## ما الذي تفعله

تحتاج إلى اختبارات من الطرف إلى الطرف تمرّن التطبيق المُركَّب كما يعيشه المستخدم — التنقل بين المسارات، ورؤية البيانات تُحمَّل، والتفاعل مع واجهة المستخدم. وأنت ستكتب اختبارات E2E بـPlaywright للتنقل عبر المسارات، وتحاكي استجابات الواجهة البرمجية بـMSW، وتسجّل ملفات HAR لبدائل إعادة تشغيل حتمية، وتناقش أين يسدّ اختبار العقود الثغرات التي تتركها هذه الاختبارات.

## لماذا يهمّ

في معمارية المستودع الأحادي، تتحقق اختبارات الوحدة من أن المكوّنات الفردية تعمل بمعزل، لكنها تفوّت مفاصل التكامل: هل يُحمَّل المسار كسولًا بشكل صحيح؟ هل تُصيّر لوحة التحليلات بيانات حقيقية من الواجهة البرمجية؟ هل تنجو حالة التنقل عبر انتقالات الصفحات؟ تلتقط اختبارات E2E هذه الأعطال على مستوى التكامل. وتمنحك محاكاة MSW تحكمًا في استجابات الواجهة البرمجية دون خادم خلفي حقيقي. ويمنحك تسجيل HAR لقطات حتمية لتفاعلات واجهة برمجية حقيقية. ومعًا، تتيح لك هذه التقنيات اختبار التطبيق المُركَّب بثقة.

## المتطلبات المسبقة {#prerequisites}

- Node.js 20+
- pnpm 9+

## الإعداد

ينبغي أن تكون مكملًا من حيث انتهى التمرين 8 (خط أنابيب CI/CD). وإن احتجت إلى اللحاق بالركب:

```bash
git checkout 08-testing-start
pnpm install
```

تحقّق من تثبيت Playwright:

```bash
npx playwright install chromium
```

افتح `tests/e2e/cross-remote.spec.ts` — فهو يحتوي بدائل TODO.

## افهم بنية الاختبار

قبل كتابة الاختبارات، انظر كيف تُهيّأ بيئة الاختبار.

افتح `tests/e2e/playwright.config.ts`:

*tests/e2e/playwright.config.ts*

```typescript
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: '.',
  timeout: 30000,
  use: {
    baseURL: 'http://localhost:5173',
  },
  webServer: {
    command: 'pnpm --filter @pulse/dashboard dev',
    url: 'http://localhost:5173',
    reuseExistingServer: !process.env.CI,
  },
});
```

*ملاحظة:* يعيد استخدام خادم تطوير قائم محليًا، لكنه يبدأ خادمًا جديدًا دائمًا في CI.

> **تهيئة `webServer`**
>
> يستطيع Playwright تشغيل خادم تطويرك تلقائيًا قبل تشغيل الاختبارات وإيقافه بعدها. ويشغّل `command` خادم تطوير لوحة المعلومات، و`url` هو فحص الصحة — يستطلع Playwright هذا العنوان حتى يستجيب قبل تشغيل أي اختبار. ويعني `reuseExistingServer: !process.env.CI` أنه في التطوير المحلي، إن كان خادم التطوير يعمل لديك سابقًا، سيستخدمه Playwright بدل بدء خادم جديد. أما في CI فيبدأ خادمًا جديدًا دائمًا.

> **Mock Service Worker**
>
> يعترض MSW طلبات الشبكة على مستوى Service Worker، لا بتعديل `fetch` أو `XMLHttpRequest` يدويًا. فيسجّل MSW عامل خدمة في المتصفح (أو يستخدم مكتبة اعتراض طلبات في Node.js) يقف بين شيفرة تطبيقك والشبكة. وعندما ينادي مكوّنك `fetch("/api/analytics/summary")`، يعترض عامل الخدمة الطلب قبل أن يغادر المتصفح أصلًا، وتعيد معالجات MSW استجابة مُحاكاة كأن خادمًا حقيقيًا قد استجاب. ولأن الاعتراض يحدث على مستوى الشبكة، فشيفرة تطبيقك لا تدرك إطلاقًا أن الاستجابة مُحاكاة — فنداء `fetch`، وحلّ الوعد، وتحليل الاستجابة، كلها تتصرف تمامًا كطلب شبكة حقيقي. وهذه ميزة جوهرية على محاكاة `fetch` مباشرةً: فأنت تختبر مسار شيفرة الشبكة الفعلي الذي يستخدمه تطبيقك في الإنتاج، بما في ذلك ترويسات الطلب، ورموز حالة الاستجابة، ومعالجة الأخطاء، دون تشغيل خادم خلفي حقيقي.

ويوضّح المخطط التالي كيف يعترض MSW طلبات الشبكة على مستوى Service Worker — فتُلتقط نداءات `fetch` في تطبيقك قبل وصولها إلى الشبكة، وتُعاد استجابات مُحاكاة كأن خادمًا حقيقيًا قد استجاب.

```
sequenceDiagram
    participant Component as React Component
    participant Fetch as fetch()
    participant SW as MSW Service Worker
    participant Handler as MSW Handler
    participant Network as Network

    Component->>Fetch: fetch("/api/analytics/summary")
    Fetch->>SW: Request intercepted
    SW->>Handler: Match against handlers
    Handler-->>SW: Mock response (200ms delay)
    SW-->>Fetch: Response object
    Fetch-->>Component: JSON data
    Note over Network: Request never reaches the network
```

ثم افتح `mocks/src/handlers.ts` — تعمل معالجات MSW هذه أثناء التطوير وتكون سلوك الواجهة البرمجية الأساسي أثناء الاختبارات. وتعيد المعالجات بيانات حتمية بتأخيرات ثابتة.

ثم افتح `tests/e2e/cross-remote.spec.ts` — ملف البدائل الذي ستكتب فيه الاختبارات:

*tests/e2e/cross-remote.spec.ts*

```typescript
import { test, expect } from '@playwright/test';

// TODO: Add cross-route navigation tests
// TODO: Add error handling tests
// TODO: Add loading state tests
```

### نقطة تحقّق

Playwright مثبَّت ومهيّأ. ويبدأ خادم التطوير تلقائيًا عند تشغيلك الاختبارات. وتوفّر معالجات MSW استجابات واجهة برمجية حتمية.

## اكتب اختبارات التنقل عبر المسارات

استبدل البديل في `tests/e2e/cross-remote.spec.ts` باختبارات حقيقية:

*tests/e2e/cross-remote.spec.ts*

```typescript
import { test, expect } from '@playwright/test';

test.describe('Cross-route navigation', () => {
  test('navigates from analytics to users and back', async ({ page }) => {
    // Start at the analytics page
    await page.goto('/');

    // Wait for the stats bar to render (fastest API response at 200ms)
    await expect(page.getByText('Total Users')).toBeVisible();
    await expect(page.getByText('12,847')).toBeVisible();

    // Navigate to users
    await page.getByRole('link', { name: 'Users' }).click();

    // Wait for the user list to render (use Alan Turing to avoid matching the
    // auth bar's "Viewing as: Grace Hopper" which causes a strict mode violation)
    await expect(page.getByText('Alan Turing')).toBeVisible();

    // Navigate back to analytics
    await page.getByRole('link', { name: 'Analytics' }).click();

    // Verify analytics data is still present
    await expect(page.getByText('Total Users')).toBeVisible();
    await expect(page.getByText('12,847')).toBeVisible();
  });

  test('users page shows user data with roles', async ({ page }) => {
    await page.goto('/');

    // Navigate to users
    await page.getByRole('link', { name: 'Users' }).click();

    // Wait for user list to load
    await expect(page.getByText('Alan Turing')).toBeVisible();

    // Verify user data is visible in the table (email is unique to the users page)
    await expect(page.getByText('grace@pulse.dev')).toBeVisible();

    // Verify we can navigate back
    await expect(page.getByRole('link', { name: 'Analytics' })).toBeVisible();
  });

  test('settings page loads with organization data', async ({ page }) => {
    await page.goto('/settings');

    // Wait for settings data to load
    await expect(page.getByText('Pulse Inc.')).toBeVisible();
    await expect(page.getByText('pro')).toBeVisible();
  });
});
```

*ملاحظة:* يتحقق من أن البيانات تنجو من رحلة تنقل كاملة ذهابًا وإيابًا بين المسارات.

شغّل الاختبارات:

```bash
npx playwright test tests/e2e/cross-remote.spec.ts --config tests/e2e/playwright.config.ts
```

> **لماذا نختبر التنقل، لا تصيير المكوّنات**
>
> تتحقق اختبارات الوحدة بـVitest وTesting Library من أن المكوّنات الفردية تُصيّر بشكل صحيح بخصائص محددة. أما اختبارات E2E فتتحقق من *التكامل* — أن الموجّه يحمّل المسار الكسول الصحيح، وأن MSW يعترض نداء الواجهة البرمجية، وأن المكوّن يجلب البيانات ويعرضها بشكل صحيح، وأن التنقل بعيدًا وعودة لا يكسر الحالة. فهذه هي المفاصل بين الحزم، وهي بالضبط المفاصل التي تنكسر في مستودع أحادي عندما يغيّر أحدهم نوعًا مشتركًا أو يعيد هيكلة الواجهة البرمجية العامة لحزمة.

### نقطة تحقّق

تنجح ثلاثة اختبارات E2E على الأقل. وهي تغطّي التنقل بين التحليلات والمستخدمين والإعدادات، وتتحقق من تحميل البيانات بشكل صحيح عبر انتقالات المسارات.

![نتائج اختبارات Playwright تعرض اختبارات ناجحة](/images/kinney/69c930130eec1050.webp)

## اكتب اختبارات مع التحقق من بيانات MSW

تستخدم لوحة المعلومات `setupWorker` من MSW، الذي يسجّل عامل خدمة في المتصفح. وموارد Suspense من التمرين 2 تُطلق نداءات الجلب وقت استيراد الوحدة — قبل أن يستطيع `page.route()` في Playwright اعتراضها. وهذا يعني أن تجاوزات الواجهة البرمجية لكل اختبار عبر `page.route()` لن تعمل مع تحميل البيانات الأولي. وبدلًا من ذلك، اكتب اختبارات تتحقق من أن بيانات MSW المُحاكاة تُصيّر بشكل صحيح، وأن الميزات التفاعلية تعمل.

> **لماذا لا يعمل `page.route()` هنا**
>
> تنشئ نداءات `createSuspenseResource` في `stats-bar.tsx` و`chart.tsx` و`big-table.tsx` وعود جلبها في نطاق الوحدة — فبمجرد استيراد الوحدة، يُطلق الجلب. ويعترض عامل الخدمة في MSW هذه الجلب قبل وصولها إلى طبقة الشبكة. وبحلول الوقت الذي تستطيع فيه إعداد تجاوزات `page.route()`، تكون البيانات قد جُلبت وخُزّنت مؤقتًا. وهذه مقايضة موارد Suspense على مستوى الوحدة: إنها سريعة (بلا شلال طلبات) لكنها ليست قابلة للمحاكاة بسهولة لكل اختبار. أما إعادة تشغيل HAR (الخطوة 4) فتعمل لأن `routeFromHAR` يُعدّ قبل التنقل.

أنشئ ملف اختبار جديدًا `tests/e2e/analytics.spec.ts`:

*tests/e2e/analytics.spec.ts*

```typescript
import { test, expect } from '@playwright/test';

test.describe('Analytics with mocked API', () => {
  test('renders analytics data from MSW handlers', async ({ page }) => {
    await page.goto('/');

    // Verify the MSW mock data renders
    await expect(page.getByText('Total Users')).toBeVisible();
    await expect(page.getByText('12,847')).toBeVisible();
    await expect(page.getByText('3,291')).toBeVisible();
    await expect(page.getByText('$284,100')).toBeVisible();
    await expect(page.getByText('3.2%')).toBeVisible();
  });

  test('chart time range toggles work', async ({ page }) => {
    await page.goto('/');

    // Wait for chart to load
    await expect(page.getByRole('img', { name: 'Analytics activity chart' })).toBeVisible();

    // Click 7d toggle
    await page.getByRole('button', { name: '7d' }).click();

    // Chart should still be visible after toggle
    await expect(page.getByRole('img', { name: 'Analytics activity chart' })).toBeVisible();
  });
});
```

*ملاحظة:* يعترض MSW هذه الجلب على مستوى Service Worker، فيعيد بيانات حتمية.

شغّل الاختبارات الجديدة:

```bash
npx playwright test tests/e2e/analytics.spec.ts --config tests/e2e/playwright.config.ts
```

### نقطة تحقّق

تنجح اختبارات التحليلات. وهي تتحقق من أن بيانات MSW المُحاكاة تُصيّر بشكل صحيح، وأن عناصر التحكم التفاعلية في المخطط تعمل.

## سجّل ملفات HAR وأعد تشغيلها

تلتقط ملفات HAR (أرشيف HTTP) تفاعلات شبكة حقيقية بصيغة JSON. ويستطيع Playwright تسجيلها أثناء تشغيل الاختبار وإعادة تشغيلها لاحقًا لنتائج حتمية.

> **HAR (أرشيف HTTP)**
>
> يلتقط ملف HAR كل تفصيل في دورة طلب-استجابة شبكية: عنوان الطلب، والتابع (method)، والترويسات، والجسم؛ ورمز حالة الاستجابة، وترويساتها، وجسمها؛ ومعلومات التوقيت بما فيها بحث DNS، والاتصال، ومصافحة TLS، وزمن أول بايت. وقد صُمّمت الصيغة أصلًا لأدوات مطوّري المتصفح (فيمكنك تصدير ملفات HAR من تبويب الشبكة في Chrome DevTools) وتدعمها فعليًا كل أداة تنقيح HTTP. ويقرأ تابع `routeFromHAR` في Playwright هذه الملفات ويعيد تشغيل الاستجابات المسجّلة عند اكتشاف طلبات مطابقة، ما يجعل اختباراتك مستقلة تمامًا عن أي خادم يعمل. والميزة الجوهرية على المحاكاة المكتوبة يدويًا هي الأمانة: فيلتقط ملف HAR شكل الاستجابة الدقيق، وترويساتها، ورموز حالتها، كما أنتجها خادم حقيقي، فأنت تختبر ببيانات واقعية دون صيانة تعريفات محاكاة يدويًا.

ابدأ بتسجيل ملف HAR. أضف اختبار تسجيل إلى `tests/e2e/analytics.spec.ts`:

*tests/e2e/analytics.spec.ts*

```typescript
test('record HAR fixture', async ({ page }) => {
  // Start recording all API calls
  await page.routeFromHAR('tests/fixtures/analytics-summary.har', {
    update: true,
    url: '**/api/analytics/**',
  });

  await page.goto('/');

  // Wait for all analytics data to load
  await expect(page.getByText('Total Users')).toBeVisible();
  await expect(page.getByText('12,847')).toBeVisible();

  // Close the page to flush the HAR file
  await page.close();
});
```

*ملاحظة:* ضبط update على true يسجّل استجابات حيّة في ملف HAR.

شغّل هذا الاختبار لإنشاء ملف HAR:

```bash
npx playwright test tests/e2e/analytics.spec.ts -g "record HAR" --config tests/e2e/playwright.config.ts
```

تحقّق من إنشاء الملف:

```bash
ls tests/fixtures/analytics-summary.har
```

يحتوي ملف HAR على دورة الطلب والاستجابة كاملة لكل نداء واجهة برمجية طابق نمط العنوان. افتحه — إنه JSON فيه ترويسات الطلب، وترويسات الاستجابة، وجسم الاستجابة، ومعلومات التوقيت.

والآن أضف إلى `tests/e2e/analytics.spec.ts` اختبارًا يعيد تشغيل HAR بدل ضرب الواجهة البرمجية الحيّة:

*tests/e2e/analytics.spec.ts*

```typescript
test('renders analytics from HAR fixture', async ({ page }) => {
  // Replay recorded responses instead of hitting the live API
  await page.routeFromHAR('tests/fixtures/analytics-summary.har', {
    update: false,
    url: '**/api/analytics/**',
  });

  await page.goto('/');

  // These values come from the recorded HAR, not the live MSW handlers
  await expect(page.getByText('Total Users')).toBeVisible();
  await expect(page.getByText('12,847')).toBeVisible();
});
```

*ملاحظة:* ضبط update على false يعيد تشغيل الاستجابات المسجّلة لنتائج حتمية.

وأخيرًا، احذف اختبار التسجيل من `tests/e2e/analytics.spec.ts` (أو تخطّه) — فلن تحتاجه إلا عند إعادة توليد البدائل:

*tests/e2e/analytics.spec.ts*

```typescript
test.skip('record HAR fixture', async ({ page }) => {
  // ...
});
```

> **إعادة تشغيل HAR مقابل المحاكاة بـ`page.route()`**
>
> إعادة تشغيل HAR مفيدة عندما تريد التقاط الشكل الدقيق لاستجابات واجهة برمجية حقيقية — بما فيها الترويسات، ورموز الحالة، وتوقيت الاستجابة — دون بناء بيانات محاكاة يدويًا. وهي قيّمة خصوصًا للواجهات المعقّدة بأجسام استجابات متداخلة بعمق. والعيب أن ملفات HAR تتقادم عندما تتغيّر الواجهة البرمجية. أما المحاكاة بـ`page.route()` فهي أفضل عندما تحتاج تحكمًا دقيقًا في سيناريوهات محددة (حالات الأخطاء، والحالات الحدّية، وبيانات مخصّصة). استخدم HAR لاختبارات «المسار الذهبي» و`page.route()` لاختبارات الحالات الحدّية.

### نقطة تحقّق

يوجد ملف HAR في `tests/fixtures/`. ويعيد اختبار تشغيل HAR لنتائج حتمية دون ضرب معالجات MSW الحيّة. وينجح الاختبار بالتأكيدات نفسها.

## اختبار العقود

شغّل كل الاختبارات مرة أخرى:

```bash
npx playwright test --config tests/e2e/playwright.config.ts
```

ينبغي أن تنجح كل الاختبارات. لكن تأمّل هذا السيناريو: يغيّر فريق الخادم استجابة `/api/analytics/summary` من `{ totalUsers: number }` إلى `{ total_users: number }`. وما زالت ملفات HAR لديك بالصيغة القديمة. وما زالت محاكاة `page.route()` لديك تعيد الصيغة القديمة. وما زالت معالجات MSW لديك تعيد الصيغة القديمة. وكل اختبار ينجح. وينكسر تطبيق الإنتاج.

> **الثغرة التي يسدّها اختبار العقود**
>
> تتحقق اختبارات E2E بواجهات برمجية مُحاكاة من أن واجهتك الأمامية تُصيّر بشكل صحيح بمعطى شكل استجابة محدد. لكنها لا تتحقق من أن الواجهة البرمجية تعيد ذلك الشكل فعلًا. وتسدّ أدوات اختبار العقود مثل Pact هذه الثغرة: فتعلن الواجهة الأمامية «أتوقع أن يعيد `GET /api/analytics/summary` القيمة `{ totalUsers: number }`» ويتحقق الخادم من أنه يحقق ذلك العقد. وعندما يغيّر الخادم `totalUsers` إلى `total_users`، يفشل اختبار العقد على جانب الخادم — قبل شحن التغيير. وهذا يلتقط انحراف الواجهة البرمجية دون أن يتطلب من الأمام والخلف النشر والاختبار معًا.

هذه نقطة نقاش، لا تمرين عملي. فكّر أين سيعمل اختبار العقود في خط أنابيب CI لديك، وما الذي سيلتقطه وتفوّته اختباراتك الحالية.

### نقطة تحقّق

تنجح كل اختبارات Playwright. وتستطيع أن تبيّن هرم الاختبارات في مستودع أحادي: اختبارات الوحدة (Vitest) لمنطق المكوّنات، واختبارات E2E (Playwright) لسلوك التكامل، واختبارات العقود (Pact) لتوافق الواجهة البرمجية.

![تقرير HTML من Playwright مع ملخّص الاختبارات](/images/kinney/8eb6a24cdf17e4e4.webp)

## الحل

إن احتجت إلى اللحاق بالركب، فالحالة المكتملة لهذا التمرين متاحة في فرع `09-migration-start`:

```bash
git checkout 09-migration-start
pnpm install
```

## أهداف إضافية

- **اختبار الانحدار البصري:** أضف `expect(page).toHaveScreenshot()` لالتقاط لقطة شاشة للوحة التحليلات ومقارنتها بخط أساس. شغّل الاختبار مرتين — فالتشغيلة الثانية تقارن بالأولى. وغيّر صنف CSS وراقب فشل الاختبار.
- **اختبار إمكانية الوصول:** ثبّت `@axe-core/playwright` وأضف تدقيق إمكانية وصول إلى اختبارك. وتأكّد من أن لوحة التحليلات بلا مخالفات حرجة لإمكانية الوصول.
- **تنفيذ الاختبارات بالتوازي:** هيّئ Playwright لتشغيل الاختبارات بـ`workers: 4` وتحقّق من أنها ما زالت تنجح. وافحص مشكلات الحالة المشتركة — فالاختبارات التي تنجح بمعزل عن غيرها وتفشل عند تشغيلها بالتوازي تكون عادةً تقرأ حالة مشتركة أو تكتبها.

## ما التالي

لديك الآن مستودع أحادي مختَبر ومفحوص بـlint ومفحوص الأنواع ومفروض في CI. لكن ماذا يحدث عندما يحتاج تطبيق قديم إلى التعايش مع معماريتك الحديثة؟ في التمرين التالي، ستُعدّ نمط الشجرة الخانقة للترحيل التدريجي — بتوجيه بعض المسارات إلى التطبيق القديم وأخرى إلى التطبيق الحديث — وستكتب codemods بـjscodeshift لأتمتة إعادات كتابة الاستيرادات المضجرة.
