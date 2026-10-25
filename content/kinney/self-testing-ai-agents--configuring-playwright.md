---
title: "تهيئة Playwright"
lang: ar
source: "https://stevekinney.com/courses/self-testing-ai-agents/configuring-playwright"
---

كل مجموعة اختبارات Playwright تبدأ بملف إعداد، ومعظمها مخطئ بالطرق الثلاث نفسها: خادم التطوير يعمل بدلًا من المعاينة، أو خيارات المشغّل مدفونة داخل `use` حيث يتجاهلها Playwright بصمت، أو أن الإعداد يحاول تعليم كل الحيل المتقدّمة من البداية. أما مشروع Shelf الابتدائي الحالي فيفعل العكس عن قصد: يُبقي الإعداد ضئيلًا.

وهذا جيد. ينبغي أن يستطيع الطلاب النظر إلى `playwright.config.ts` وفهمه من مرور واحد.

سنمرّ أولًا على ما يوفّره المشروع الابتدائي فعلًا، ثم ننظر في بضعة طرق واقعية قد توسّع بها الإعداد عندما تكبر المجموعة.

## `testDir` و`testIgnore`

```typescript
testDir: 'tests',
testIgnore: ['**/labs/fixtures/**', '**/labs/broken-traces/**'],
```

`testDir` هو المكان الذي يبحث فيه Playwright عن المواصفات. وفي مشروع Shelf الابتدائي هو `tests` فقط.

أما `testIgnore` فيفعل شيئًا أكثر تشويقًا قليلًا: يُبقي تمارين المختبر المكسورة عن قصد خارج التشغيل الأخضر الافتراضي. فتلك الملفات تبقى في المستودع، لكنها لا تُفسد تجربة المشروع الابتدائي قبل أن تعلّم الدرس المتعلّق بها.

هذا استخدام جيد لـ `testIgnore`: استثناء عناصر تعليمية معروفة أو ملفات مولّدة. واستخدامه السيئ أن تُخفي به اختبارات حقيقية متذبذبة. فإن كانت مواصفة عادية غير مستقرة، فأصلح المواصفة.

## `webServer`

```typescript
webServer: {
  command: 'npm run build && npm run preview -- --host 127.0.0.1 --port 4173',
  url: 'http://127.0.0.1:4173',
},
```

هكذا يبدأ Playwright تطبيقك قبل تشغيل أي اختبار.

يبني Shelf ويعاين بدلًا من تشغيل خادم التطوير. ولماذا: لأن وضع المعاينة أقرب إلى الإنتاج. فلا HMR، ولا تحويلات Vite وقت التشغيل، ولا وسيط خاص بالتطوير يغيّر السلوك بطرق لا يفعلها الإنتاج أبدًا. وإن نجح اختبار على المعاينة، فمن المرجّح جدًا أن ينجح في CI والإنتاج.

ومن الإضافات الشائعة عندما تبدأ الحلقة المحلية بالتباطؤ `reuseExistingServer: true`. فإن كان التطبيق يعمل لديك بالفعل على المنفذ `4173`، يعيد Playwright استخدامه بدلًا من محاولة إقلاع نسخة ثانية.

ولاحقًا، ثمّة صيغة شائعة ملائمة لـ CI:

```typescript
reuseExistingServer: !process.env.CI,
```

وهذا التفريق مفيد بمجرد أن تهتم بحتمية CI. محليًا، أعد استخدام الخادم العامل. وفي CI، اقلع خادمًا جديدًا دائمًا.

وإن احتجت يومًا تجاوزات لمتغيّرات البيئة في الاختبارات، فـ `webServer` هو المكان الصحيح لها أيضًا:

```typescript
webServer: {
  command: 'npm run build && npm run preview -- --host 127.0.0.1 --port 4173',
  url: 'http://127.0.0.1:4173',
  env: {
    NODE_ENV: 'test',
    ANALYTICS_DISABLED: '1',
  },
},
```

## كتلة `use`

```typescript
use: {
  baseURL: 'http://127.0.0.1:4173',
},
```

كل ما في `use` ينطبق على سياق المتصفح في كل اختبار.

`baseURL` هو الشيء الوحيد الذي يريده المشروع الابتدائي قطعًا. فهو يعني أنك تكتب `page.goto('/playground')` بدلًا من `page.goto('http://127.0.0.1:4173/playground')`. أمر صغير، لكنه يُبقي الاختبارات قابلة للنقل ويمنع تسرّب أسماء المضيفين في أرجاء المجموعة.

وما **لا** يوفّره المشروع الابتدائي بعد هو التتبّعات ولقطات الشاشة والفيديو. وهي مفيدة، لكنها ليست مفاهيم تحتاجها فورًا. وحين تصبح جاهزًا لها، يبدو الإعداد هكذا:

```typescript
use: {
  baseURL: 'http://127.0.0.1:4173',
  trace: 'retain-on-failure',
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
},
```

هذه التركيبة تتبع الفلسفة الصحيحة: احتفظ بأدلّة الفشل، واطرح ضجيج النجاح.

## خيارات المشغّل التي قد تضيفها لاحقًا

يترك مشروع Shelf الابتدائي الكثير من خيارات المشغّل في المستوى الأعلى دون مساس عن قصد. وهذا يُبقي الإعداد الافتراضي صغيرًا ويدع إعدادات Playwright الافتراضية تؤدّي عملها.

وبمجرد أن تكبر مجموعتك، تكون أول خيارات المشغّل التي تضيفها معظم الفرق:

```typescript
fullyParallel: true,
workers: process.env.CI ? 1 : undefined,
forbidOnly: !!process.env.CI,
retries: process.env.CI ? 2 : 0,
```

وهذا ما يفعله كل منها:

- `fullyParallel` يسمح بتشغيل الاختبارات في الملف نفسه على التوازي.
- `workers` يتحكّم في عدد عمليات العمال التي يستطيع Playwright استخدامها. وتثبيت `workers: 1` في CI مناسب لبعض الإعدادات فقط (موارد خارجية مشتركة، بنية تحتية متذبذبة)، وسيُبطل `fullyParallel` عند ضبط الاثنين. فإن كان لديك `fullyParallel: true` وأردت التوازي، فاترك `workers` غير معرّف في CI كي يتوسّع Playwright حسب الأنوية المتاحة.
- `forbidOnly` يُفشل CI إن أودع أحدهم `test.only` بالخطأ.
- `retries` يمنح CI قدرًا من المرونة أمام التذبذبات العارضة.

لاحظ أن هذه **خيارات مشغّل**، لا خيارات سياق متصفح. فهي تنتمي إلى المستوى الأعلى من `defineConfig`، لا إلى داخل `use`.

## مُبلِّغات اختيارية

يعتمد المشروع الابتدائي على مُبلِّغ Playwright الافتراضي للطرفية. وهذا يكفي لمجموعة صغيرة.

وحين تريد مخرجات أغنى، فالخطوة التالية الشائعة هي:

```typescript
reporter: [
  ['html', { open: 'never', outputFolder: 'playwright-report/html' }],
  ['json', { outputFile: 'playwright-report/report.json' }],
  ['list'],
],
```

- `list` يمنحك مخرجات الطرفية التي تتوقعها.
- `html` يمنحك تقريرًا قابلًا للتصفّح فيه الإخفاقات ولقطات الشاشة والتتبّعات والخطوات.
- `json` يمنح CI والأتمتة شيئًا قابلًا للقراءة آليًا لتحليله.

هذا مفيد لاحقًا في الدورة. ولا حاجة لأن يكون جزءًا من التطبيق الابتدائي.

## إعدادات لقطات الشاشة الافتراضية الاختيارية

إن أضفت اختبارات انحدار بصري، فمن المجدي ضبط إعدادات لقطات الشاشة افتراضيًا على المستوى العام:

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

- `animations: 'disabled'` يجمّد الحركة للحصول على لقطات حتمية.
- `caret: 'hide'` يزيل ضجيج المؤشّر الوامض.
- `scale: 'css'` يساعد على تطبيع اللقطات عبر كثافات عرض مختلفة.
- `maxDiffPixelRatio: 0.01` يمنحك قدرًا صغيرًا من التجاوز لفروق التصيير الدقيقة.

ومرة أخرى: مفيد لاحقًا، وليس ضروريًا في إعداد ابتدائي.

## المشروعات

المشروع الابتدائي الحالي لـ Shelf **لا** يعرّف مشروعات Playwright مخصّصة. وذلك مقصود.

فمشروع افتراضي واحد يُبقي حلقة المبتدئ واضحة:

- ملف إعداد واحد
- تشغيل افتراضي واحد
- مكان واحد تنظر فيه عندما ينكسر شيء

والمشروعات أداة رائعة مع ذلك. لكنها شيء تضيفه عندما يكون لديك سبب ملموس، لا لأن ملف الإعداد يبدو أكثر إبهارًا مع مصفوفة `projects` ضخمة.

### المثال 1: تهيئة المصادقة مع مجموعة التطبيق الحقيقية

هذا هو النمط الكلاسيكي عندما تريد مواصفة تهيئة تسجّل الدخول مرة واحدة وتحفظ حالة التخزين للاختبارات الأخرى.

```typescript
projects: [
  {
    name: 'setup',
    testMatch: /authentication\.setup\.ts/,
  },
  {
    name: 'app',
    testIgnore: /authentication\.setup\.ts/,
    use: {
      storageState: 'playwright/.authentication/reader.json',
    },
    dependencies: ['setup'],
  },
],
```

الفكرة المهمة هي `dependencies`: يشغّل Playwright مشروع `setup` أولًا، ثم يستطيع المشروع المعتمد إعادة استخدام الجلسة المحفوظة.

### المثال 2: مواصفات عامة مقابل مواصفات موثّقة

هذا مفيد عندما ينبغي أن يبقى جزء من مجموعتك مجهولًا وأن يفترض جزء آخر مستخدمًا مسجّل الدخول.

```typescript
projects: [
  {
    name: 'setup',
    testMatch: /authentication\.setup\.ts/,
  },
  {
    name: 'public',
    testMatch: /(smoke|playground)\.spec\.ts/,
  },
  {
    name: 'authenticated',
    testMatch: /(search|rate-book|goals)\.spec\.ts/,
    use: {
      storageState: 'playwright/.authentication/reader.json',
    },
    dependencies: ['setup'],
  },
],
```

يُبقي هذا الاختبارات العامة بسيطة بينما يسمح للاختبارات الموثّقة بمشاركة تهيئة تسجيل الدخول.

### المثال 3: تدقيق عبر المتصفحات فقط

التغطية الكاملة عبر المتصفحات مكلفة. والتغطية عبر المتصفحات بالتدقيق فقط غالبًا هي المقايضة الأفضل.

```typescript
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: 'tests',
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
      },
    },
    {
      name: 'firefox-smoke',
      testMatch: /smoke\.spec\.ts/,
      use: {
        ...devices['Desktop Firefox'],
      },
    },
    {
      name: 'webkit-smoke',
      testMatch: /smoke\.spec\.ts/,
      use: {
        ...devices['Desktop Safari'],
      },
    },
  ],
});
```

يمنحك هذا النمط ثقة سريعة في مسار المستخدم الجوهري دون مضاعفة زمن تشغيل المجموعة بأكملها ثلاث مرات.

### المثال 4: مشروع مخصّص للانحدار البصري

إن قرّرت إضافة اختبارات لقطات الشاشة، فعزلها في مشروع خاص بها يمكن أن يُبقي التوقّعات والمخرجات مرتّبة.

```typescript
projects: [
  {
    name: 'functional',
    testIgnore: /visual\.spec\.ts/,
  },
  {
    name: 'visual',
    testMatch: /visual\.spec\.ts/,
    use: {
      viewport: { width: 1440, height: 900 },
      colorScheme: 'light',
    },
  },
],
```

يتيح لك ذلك إبقاء الافتراضات البصرية منفصلة عن الافتراضات الوظيفية.

والقاعدة الأساسية: أضف المشروعات عندما تقلّل الالتباس، لا عندما تخلقه.

## النمط المضاد: خيارات المشغّل داخل `use`

هذا ما يزال أشهر خطأ في إعداد Playwright، ولن ينقذك Playwright منه.

`testDir` و`timeout` و`retries` و`workers` و`projects` هي **خيارات مشغّل**. وتوضع في المستوى الأعلى من `defineConfig`.

و`baseURL` و`trace` و`screenshot` و`storageState` و`viewport` هي **خيارات سياق**. وتوضع داخل `use`.

فإن وضعت `timeout` داخل `use`، فلن يُخطئ Playwright. ولن ينبّهك. بل سيتجاهله فقط.

```typescript
// Wrong — silently ignored:
use: {
  timeout: 60_000,
},

// Right — actually changes the test timeout:
timeout: 60_000,
```

والنموذج الذهني بسيط:

- `use` يضبط سياق المتصفح
- وكل ما عداه يضبط المشغّل

## الشيء الواحد الذي يجب تذكّره

ملف الإعداد هو العقد بين مجموعتك وبيئتك. وينبغي أن يُبقي المشروع الابتدائي ذلك العقد سهل القراءة. وأضف الطبقة التالية من الإعداد عندما تستحقّها:

- أولًا `webServer`
- ثم `baseURL`
- ثم ربما التتبّعات ولقطات الشاشة
- ثم ربما المشروعات

فإن كان ملف إعداد يحاول تعليم تهيئة المصادقة، والتغطية عبر المتصفحات، والانحدار البصري، وإعادات المحاولة في CI، والإبلاغ عن الإخفاقات دفعة واحدة، فهو على الأرجح يفعل أكثر من اللازم لمستودع مبتدئ.

## قراءات إضافية

- [مشروعات Playwright](https://stevekinney.com/courses/self-testing-ai-agents/playwright-projects)
- [وضع واجهة Playwright](https://stevekinney.com/courses/self-testing-ai-agents/playwright-ui-mode)
- [المصادقة بحالة التخزين](https://stevekinney.com/courses/self-testing-ai-agents/storage-state-authentication)
