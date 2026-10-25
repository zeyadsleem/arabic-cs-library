---
title: "اعتراض الشبكة القائم على المسارات"
---

غطّت [دروس HAR](https://stevekinney.com/courses/self-testing-ai-agents/recording-hars-for-network-isolation) نهج «سجّل كل شيء، وأعِد تشغيله إلى الأبد» في عزل الشبكة. هذه هي الأداة الصحيحة عندما تحاكي سطح API واسعًا—عشرات من نقاط النهاية، واستجابات متداخلة، ورموز ترقيم صفحات. لكنك لا تحتاج دائمًا إلى تسجيل كامل. تحتاج إلى محاكاة نقطة نهاية *واحدة*، أو حجب الصور، أو محاكاة استجابة 500 من الخادم، أو إزالة ترويسة قبل أن تصل إلى تطبيقك. هنا يأتي دور [`page.route`](https://playwright.dev/docs/mock) ويستحق مكانه.

الاعتراض القائم على المسارات هو واجهة Playwright البرمجية لاعتراض طلبات الشبكة الفردية وتقرير ما يجب فعله بها: تقديم استجابة مزيفة، أو تعديل الاستجابة الحقيقية، أو إلغاء الطلب بالكامل. إنه أكثر صراحة من إعادة تشغيل HAR، وأكثر مرونة، وللمحاكاة الصغيرة أقل تكلفة بكثير.

## الأساسيات: اعتراض طلب

يأخذ [`page.route`](https://playwright.dev/docs/api/class-page#page-route) نمط URL ودالة معالج. كل طلب يطابق النمط يمر عبر معالجك بدلًا من الشبكة الحقيقية:

```typescript
await page.route('**/api/shelf', async (route) => {
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ books: [{ title: 'Station Eleven' }] }),
  });
});
```

هذا كل شيء. أي طلب إلى URL ينتهي بـ `/api/shelf` يحصل على استجابتك الجاهزة بدلًا من الوصول إلى الخادم. الاختبار حتمي وسريع، ويمكنك قراءة المحاكاة مباشرة في ملف الاختبار.

يمكنك أيضًا حصر الاعتراض في سياق متصفح كامل باستخدام [`context.route`](https://playwright.dev/docs/api/class-browsercontext#browser-context-route)، وهو ينطبق على كل صفحة في السياق—بما في ذلك النوافذ المنبثقة والروابط المفتوحة:

```typescript
test.beforeEach(async ({ context }) => {
  await context.route('**/api/analytics/**', (route) => route.abort());
});
```

الفرق مهم. `page.route` يعترض فقط الطلبات الصادرة من تلك الصفحة تحديدًا. أما `context.route` فيعترض الطلبات من كل صفحة يفتحها السياق. في معظم سيناريوهات الاختبار، `page.route` هو ما تريده. والجأ إلى `context.route` عندما تحتاج إلى حجب شيء على المستوى العام—التحليلات، ووحدات تتبع البكسل، ونصوص الأطراف الثالثة—عبر كل الصفحات في الاختبار.

القاعدة السريعة هي:

- استخدم `page.route()` عندما تنتمي المحاكاة إلى صفحة واحدة وسيناريو واحد
- استخدم `browserContext.route()` عندما تكون المحاكاة جزءًا من بيئة الاختبار بأكمله

أمثلة ملموسة:

- **استخدم `page.route()`** في حالات مثل «يجب أن ترى صفحة الرف هذه استجابة 500 من `/api/shelf`» أو «يجب أن يحصل مسار الدفع هذا على استجابة ضريبية مزيفة». المسار محلي بالنسبة للصفحة قيد الاختبار، وعندما تختفي الصفحة ينتهي العمر المفيد للمحاكاة أيضًا.
- **استخدم `browserContext.route()`** لحجب التحليلات في كل صفحة، أو لاعتراض حركة النوافذ المنبثقة من أول طلب، أو لضبط استجابة خلفية مزيفة واحدة تصطدم بها كل من الصفحة الرئيسية والنافذة المنبثقة أثناء الاختبار نفسه.
- **استخدم `browserContext.route()`** كلما لم تكن تملك كائن الصفحة الهدف بعد. أول طلب من نافذة منبثقة هو الحالة الكلاسيكية. بحلول الوقت الذي تحصل فيه على مقبض `Page` للنافذة المنبثقة، يكون ذلك الطلب قد حدث بالفعل.
- **فضّل `page.route()`** عندما يجعل النطاق الأوسع المحاكاة خفية جدًا. المسار على مستوى السياق هو في الواقع بنية اختبار محيطة؛ وهذا جيد عندما يكون بنية حقيقية وسيئًا عندما يغيّر صفحات غير ذات صلة بهدوء.

من القواعد الجديرة بالتذكر أيضًا قاعدة الأسبقية الواردة في التوثيق: إذا تطابق الاثنان، يفوز `page.route()` على `browserContext.route()` بالنسبة للطلبات القادمة من تلك الصفحة. يتيح لك ذلك الاحتفاظ بافتراضي واسع على مستوى السياق وتجاوز نقطة نهاية واحدة بدقة على الصفحة التي تحتاج إلى سلوك مختلف.

وثمة تفصيل آخر من توثيق [واجهة Page](https://playwright.dev/docs/api/class-page) يسهل تفويته: تفعيل التوجيه يعطّل ذاكرة التخزين المؤقت لـ HTTP في المتصفح لتلك الصفحة أو السياق. هذا غالبًا ما تريده في الاختبارات. ويعني أيضًا أن «تطبيقي أصبح أبطأ بعد إضافة المسارات» ليس من نسج خيالك.

## استعادة المسارات

إضافة المسار نصف العمل فقط. إذا ثبّتت مسارًا في منتصف اختبار طويل، أو داخل دالة مساعدة قابلة لإعادة الاستخدام تُنفّذ أكثر من مرة، فأنت تحتاج أيضًا إلى معرفة كيفية التخلص منه.

في Playwright Test العادي، غالبًا ما يكون أرخص تنظيف هو حد الاختبار نفسه: كل اختبار يحصل على سياق متصفح جديد، لذا لا تتسرب المسارات التي تضيفها في اختبار إلى الاختبار التالي. لكن داخل اختبار واحد أو دالة مساعدة واحدة، تنظيف المسارات مسؤوليتك.

هناك ثلاثة أنماط جديرة بالمعرفة.

### 1. اجعل المسار ينتهي تلقائيًا

إذا كان ينبغي تطبيق المحاكاة مرة واحدة فقط، فاستخدم خيار `times` في المسار ودع Playwright يزيله بعد هذا العدد من المطابقات:

```typescript
await page.route(
  '**/api/shelf',
  async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({ books: [] }),
    });
  },
  { times: 1 },
);
```

هذا هو الخيار الأنظف عندما تعترض طلب تهيئة واحدًا ثم تريد أن تعود الصفحة إلى الشبكة الحقيقية.

### 2. إزالة مسار محدد واحد

استخدم [`page.unroute()`](https://playwright.dev/docs/api/class-page#page-unroute) أو [`browserContext.unroute()`](https://playwright.dev/docs/api/class-browsercontext#browser-context-unroute) عندما تريد إزالة معالج محدد:

```typescript
const mockShelf = async (route) => {
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ books: [{ title: 'Station Eleven' }] }),
  });
};

await page.route('**/api/shelf', mockShelf);

try {
  await page.goto('/shelf');
  await expect(page.getByText('Station Eleven')).toBeVisible();
} finally {
  await page.unroute('**/api/shelf', mockShelf);
}
```

تمرير المعالج مهم عندما يكون لديك أكثر من مسار واحد على نمط URL نفسه. إذا حذفته، يزيل Playwright **كل** المسارات لذلك الـ URL على تلك الصفحة أو السياق.

`try` / `finally` هو الشكل الصحيح في الدوال المساعدة. الاختبارات تفشل. والتنظيف يجب أن يحدث رغم ذلك.

### 3. مسح كل شيء

إذا كانت دالة مساعدة تثبّت عدة مسارات، أو تخلط المسارات اليدوية مع إعادة تشغيل HAR، فاستخدم [`page.unrouteAll()`](https://playwright.dev/docs/api/class-page#page-unroute-all) أو [`browserContext.unrouteAll()`](https://playwright.dev/docs/api/class-browsercontext#browser-context-unroute-all). هذه تزيل المسارات التي سجلتها بواسطة `route()` ومعالجات HAR التي سجلتها بواسطة `routeFromHAR()` معًا:

```typescript
await page.route('**/api/shelf', async (route) => {
  await route.fulfill({ status: 500, body: 'boom' });
});

await page.routeFromHAR('tests/fixtures/open-library.har', {
  notFound: 'fallback',
});

// ... run the scenario ...

await page.unrouteAll({ behavior: 'wait' });
```

خيار `behavior` ليس زينة.

- `'wait'` ينتظر انتهاء المعالجات الجارية حاليًا قبل إزالتها.
- `'ignoreErrors'` يزيل فورًا ويبتلع أخطاء المعالجات اللاحقة.
- `'default'` يزيل فورًا ويمكنه مع ذلك إظهار أخطاء غير معالجة من معالج كان يعمل بالفعل.

استخدم `'wait'` ما لم يكن لديك سبب محدد لخلاف ذلك. إنها نسخة التفكيك التي تتصرّف بنضج.

## التوجيه برمجية وسيطة، وليس سحرًا

سلسلة التوجيه في Playwright لها دلالات برمجية وسيطة حقيقية.

- تُنفّذ المسارات بترتيب **عكسي لترتيب التسجيل**. أحدث مسار مطابق مسجّل هو الذي يحصل على الفرصة الأولى.
- معالج `page.route(...)` يتغلب على معالج `browserContext.route(...)` المطابق بالنسبة للطلبات القادمة من تلك الصفحة.
- [`route.fallback()`](https://playwright.dev/docs/api/class-route#route-fallback) يمرر الطلب إلى المعالج المطابق التالي، مع إمكانية تجاوزات على الطلب.
- [`route.continue()`](https://playwright.dev/docs/api/class-route#route-continue) يرسل الطلب مباشرة إلى الشبكة ويوقف السلسلة.

هذا التمييز مهم جدًا عندما يكون لديك أكثر من معالج واحد:

```typescript
await page.route('**/*', async (route, request) => {
  if (request.method() !== 'POST') return route.fallback();

  return route.fallback({
    headers: {
      ...request.headers(),
      'x-test-mode': '1',
    },
  });
});

await page.route('**/api/**', async (route) => {
  const response = await route.fetch({ maxRetries: 2 });
  const json = await response.json();
  json.debug = true;
  await route.fulfill({ response, json });
});
```

بالتسجيل بهذا الترتيب، يعمل معالج `**/api/**` أولًا، ويعمل المعالج الواسع `**/*` لاحقًا فقط إذا تراجع الأول. إذا استخدمت `continue()` في المعالج الواسع، فلن يحصل المعالج الأضيق على دوره أبدًا.

## ثلاثة أشياء يمكنك فعلها بمسار

كل معالج مسار ينتهي باستدعاء واحدة من ثلاث طرق على كائن `route`. كل واحدة منها تجيب على سؤال مختلف.

### fulfill: تقديم استجابة مزيفة

[`route.fulfill`](https://playwright.dev/docs/api/class-route#route-fulfill) يستبدل الاستجابة الحقيقية بالكامل. الطلب لا يغادر المتصفح أبدًا:

```typescript
await page.route('**/api/shelf', async (route) => {
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify({ books: [] }),
  });
});
```

هذا هو الخيار الذي ستلجأ إليه أكثر من غيره في الاختبارات. حاكِ نقطة النهاية، وتحكم في الاستجابة، وتحقق من الواجهة التي تعرضها. لا شبكة، ولا تقلّب، ولا اعتماد على خادم شخص آخر.

يمكنك التقديم بأكثر من مجرد جسم. المجموعة الكاملة من الخيارات تشمل `status` و`headers` و`contentType` و`body` و`path` (تقديم ملف من القرص). على سبيل المثال، تقديم ملف JSON ثابت:

```typescript
await route.fulfill({
  status: 200,
  path: 'tests/fixtures/shelf-response.json',
});
```

### abort: إلغاء الطلب

[`route.abort`](https://playwright.dev/docs/api/class-route#route-abort) يوقف الطلب تمامًا. يحصل المتصفح على خطأ شبكة، كما لو كان الخادم غير قابل للوصول:

```typescript
// Block all image requests.
await page.route('**/*.{png,jpg,jpeg,webp}', (route) => route.abort());
```

هذا مفيد لشيئين. أولًا، تسريع الاختبارات التي لا تهتم بالصور أو الخطوط أو نصوص الأطراف الثالثة—فحجبها يقتطع وقتًا من كل تحميل صفحة. ثانيًا، اختبار كيفية تعامل تطبيقك مع أعطال الشبكة. إذا أردت التحقق من أن صفحة الرف تعرض حالة خطأ عندما يكون الـ API معطلًا، فألغِ مسار الـ API وتحقق من واجهة الخطأ:

```typescript
await page.route('**/api/shelf', (route) => route.abort());
await page.goto('/shelf');
await expect(page.getByText('Unable to load your shelf')).toBeVisible();
```

يمكنك أيضًا الإلغاء بشكل انتقائي حسب نوع المورد بدلًا من الـ URL:

```typescript
await page.route('**/*', (route) => {
  return route.request().resourceType() === 'image' ? route.abort() : route.continue();
});
```

### continue: دعه يمر، ربما معدلًا

[`route.continue`](https://playwright.dev/docs/api/class-route#route-continue) يرسل الطلب إلى الخادم الحقيقي، لكنه يتيح لك تعديله في طريقه. يمكنك تغيير الطريقة أو الـ URL أو الترويسات أو بيانات ما بعد الإرسال:

```typescript
// Strip a custom header before the request reaches the server.
await page.route('**/*', async (route) => {
  const headers = route.request().headers();
  delete headers['X-Debug-Token'];
  await route.continue({ headers });
});
```

هذا هو الأقل شيوعًا من الثلاثة في كود الاختبار، لكنه يظهر عندما تحتاج إلى محاكاة بيئة عميل محددة (تغيير `User-Agent` على سبيل المثال) أو عندما تحتاج إلى إزالة ترويسات تضيفها بنية اختبارك لكن الخادم لا يتوقعها.

هناك تحذير مزعج واحد من [واجهة Route](https://playwright.dev/docs/api/class-route): لا يمكنك تجاوز ترويسة `Cookie` بهذه الطريقة. يملأ المتصفح ملف تعريف الارتباط من جرار الكوكيز الخاص به، لا من تجاوزك المصنوع يدويًا. إذا كانت حالة الكوكيز مهمة، فاستخدم `browserContext.addCookies()` أو `storageState` بدلًا من محاولة تهريبها عبر `continue()`.

## تعديل الاستجابات

أحيانًا تريد الاستجابة *الحقيقية* من الخادم، لكن مع تغيير شيء واحد—حقل مضاف، أو حقل محذوف، أو رمز حالة مبدل. النمط هو: اجلب الاستجابة الأصلية عبر المسار، وعدّلها، ثم قدّم النسخة المعدلة.

```typescript
await page.route('**/api/shelf', async (route) => {
  // Fetch the real response.
  const response = await route.fetch();
  const json = await response.json();

  // Add a field the test needs.
  json.books.forEach((book) => {
    book.testId = `book-${book.id}`;
  });

  await route.fulfill({
    response,
    body: JSON.stringify(json),
    headers: {
      ...response.headers(),
      'content-type': 'application/json',
    },
  });
});
```

[`route.fetch`](https://playwright.dev/docs/api/class-route#route-fetch) يرسل الطلب إلى الخادم الحقيقي ويعطيك كائن الاستجابة. تعدّل ما تحتاجه، ثم تستدعي `route.fulfill` بالنسخة المعدلة. يرى المتصفح الاستجابة المعدلة كما لو جاءت من الخادم مباشرة.

يأخذ `route.fetch()` أيضًا بعض خيارات الضبط المفيدة الخاصة به. وأهم اثنين في كود الاختبار هما `maxRedirects` و`maxRetries`. تدفقات المصادقة المليئة بإعادة التوجيه، أو إعادة الضبط العابرة أحيانًا في استدعاء خلفي، أسهل بكثير في النمذجة هناك من أغلفة إعادة المحاولة المكتوبة يدويًا حول معالج المسار.

هذا قوي لاختبار الحالات الحدية دون بناء خادم اختبار منفصل. أتريد اختبار ما يحدث عندما يعيد الـ API استجابة 500؟ اجلب الاستجابة الحقيقية، وتجاهلها، وقدّم استجابة 500. أتريد اختبار ما يحدث عند غياب حقل واحد؟ اجلب الاستجابة الحقيقية، واحذف الحقل، وقدّمها. الخادم الحقيقي يوفر خط الأساس؛ وأنت توفر التباين.

> **نصيحة**
>
> إذا وجدت نفسك تعدّل الاستجابات لأكثر من مسارين أو ثلاثة في الاختبار نفسه، فمن المحتمل أنك تجاوزت حدود الاعتراض القائم على المسارات. انتقل إلى إعادة تشغيل HAR بملف HAR محرّر مسبقًا، أو ابنِ نظام تجهيزات مناسبًا. معالجات المسارات رائعة للمحاكاة الجراحية؛ لكنها تصبح ثقيلة عندما تحاكي سطح API بأكمله.

## أنماط URL العامة (Glob)

يستخدم Playwright صيغة glob المبسطة الخاصة به لمطابقة الـ URL في `page.route` و`page.waitForResponse` وفي كل مكان آخر يقبل نمط URL. وفيما يلي بعض القواعد الجديرة بالاستيعاب:

- `*` المفردة تطابق أي أحرف *عدا* `/`. لذا `https://example.com/*.js` يطابق `https://example.com/app.js` لكنه لا يطابق `https://example.com/scripts/app.js`.
- `**` المزدوجة تطابق أي أحرف *بما في ذلك* `/`. لذا `**/*.js` يطابق كليهما.
- `?` يطابق علامة استفهام حرفية، وليس «أي حرف واحد». هذا يختلف عن أنماط shell العامة. إذا أردت مطابقة أي حرف، فاستخدم `*`.
- الأقواس المعقوفة `{}` تطابق قائمة بدائل مفصولة بفواصل: `**/*.{png,jpg,jpeg}` يطابق أنواع الصور الثلاثة.
- يجب أن يطابق النمط الـ URL *بالكامل*، لا مجرد سلسلة فرعية. `*.js` لن يطابق شيئًا لأن عناوين URL تبدأ بـ `https://`.

عندما لا تكون أنماط glob معبّرة بما يكفي، مرّر تعبيرًا نمطيًا بدلًا منها:

```typescript
await page.route(/openlibrary\.org\/search\.json/, async (route) => {
  // ...
});
```

تطابق أنماط regex سلسلة الـ URL الكاملة، لذا لا تحتاج إلى مطابقة البروتوكول والنطاق إن لم تكن تهتم بهما—المطابقة الجزئية كافية.

## مراقبة أحداث الشبكة

أحيانًا لا تريد اعتراض الطلبات—بل تريد مراقبتها. يعرّض Playwright حدثي `request` و`response` على كل من الصفحة والسياق:

```typescript
page.on('request', (request) => console.log('>>', request.method(), request.url()));
page.on('response', (response) => console.log('<<', response.status(), response.url()));
```

يُشغَّل هذان الحدثان مع *كل* طلب، بما في ذلك الطلبات التي وجّهتها. إنهما مفيدان لتصحيح الأخطاء—إذا لم يكن هناك مسار مطابق، فإن حدث `request` يريك بالضبط أي URL يطلبه المتصفح كي تصحح نمط glob الخاص بك.

في كود الاختبار، نادرًا ما تحتاج إلى مستمعي أحداث خام. `page.waitForResponse` (المغطى في [قصة الانتظار](https://stevekinney.com/courses/self-testing-ai-agents/the-waiting-story)) هو الأداة الصحيحة لـ «انتظر حتى ينتهي هذا الطلب، ثم تحقق». مستمعو الأحداث مفيدون عندما تحتاج إلى جمع *كل* حركة الشبكة لتقرير اختبار أو ملف أدلة فشل.

## مأزق الـ service worker

إذا سجّل تطبيقك [service worker](https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API)، فإن هذا العامل يجلس بين المتصفح والشبكة—ويعترض الطلبات *قبل* أن تراها معالجات المسارات في Playwright. هذا يعني أن استدعاءات `page.route` الخاصة بك قد لا تُنفّذ أبدًا، لأن الـ service worker يقدم استجابات مخزنة مؤقتًا بدلًا من تمرير الطلبات إلى طبقة الشبكة.

الإصلاح واضح ومباشر:

```typescript
const context = await browser.newContext({
  serviceWorkers: 'block',
});
```

أو في `playwright.config.ts`:

```typescript
export default defineConfig({
  use: {
    serviceWorkers: 'block',
  },
});
```

هذا يعطّل عمال الخدمة بالكامل لسياق الاختبار. تعمل مساراتك كما هو متوقع، ولا تخسر شيئًا—فالتخزين المؤقت لعامل الخدمة مسألة إنتاج، لا مسألة اختبار.

> **تحذير**
>
> إذا كنت تستخدم [Mock Service Worker (MSW)](https://mswjs.io/) لمحاكاة الـ API في تطبيقك، فهو يسجّل عامل خدمة خاصًا به. سيعترض هذا العامل الطلبات قبل معالجات مسارات Playwright، مما يجعل مساراتك غير مرئية. إذا أردت اعتراض المسارات على مستوى Playwright، فإما أن تعطّل MSW في بيئة الاختبار أو تستخدم التوجيه المدمج في Playwright بدلًا من MSW.

## للنوافذ المنبثقة وWebSockets حالات حدية خاصة

هناك مأزقان في المسارات يستحقان التدوين لأنهما يبدوان كأن «Playwright معطوب» حتى تعرف القاعدة.

أولًا: `page.route()` **لا** يلتقط أول طلب لصفحة منبثقة. يحدث ذلك الطلب قبل أن يكون لديك مقبض على كائن الصفحة المنبثقة. إذا كنت تحتاج إلى اعتراض حركة النوافذ المنبثقة من البداية، فسجّل المعالج على سياق المتصفح باستخدام `browserContext.route()`.

ثانيًا: التطبيقات المثقلة بمقابس الاتصال لديها الآن [`browserContext.routeWebSocket()`](https://playwright.dev/docs/api/class-browsercontext#browser-context-route-web-socket) عندما تحتاج إلى مراقبة حركة WebSocket أو تعديلها. قاعدة التوقيت صارمة: فقط المقابس المنشأة **بعد** تسجيل التوجيه يتم اعتراضها. أعدّ التوجيه قبل أن تنشئ الصفحة الاتصال، أو لا تتظاهر بأن المسار سيراها.

## متى تستخدم المسارات مقابل HAR

القرار عادة واضح بمجرد أن تصوغ السؤال بوضوح:

- **نقطة نهاية أو نقطتان باستجابات معروفة:** استخدم `page.route` مع `route.fulfill`. المحاكاة تعيش في الاختبار، وهي مقروءة وصريحة.
- **محاكاة الأخطاء أو الحالات الحدية:** استخدم `page.route` مع `route.abort` أو `route.fulfill` مخصص برمز حالة غير 200. تُسجّل ملفات HAR الجلسات *الناجحة*—وهي ليست مصممة لمحاكاة الأخطاء.
- **سطح API واسع بنقاط نهاية كثيرة:** استخدم إعادة تشغيل HAR. تسجيل عشر نقاط نهاية أسهل من كتابة عشرة معالجات مسارات.
- **تعديل الاستجابة:** استخدم `route.fetch` + `route.fulfill` عندما تريد الاستجابة الحقيقية مع تغيير شيء واحد. واستخدم HAR معدلًا عندما تحتاج إلى ذلك عبر اختبارات كثيرة.

الأداتان تتعايشان. يمكنك إعادة تشغيل HAR لمعظم نقاط النهاية وإضافة `page.route` فوقها لنقطة النهاية الوحيدة التي تحتاج إلى محاكاة فشلها. معالج المسار له الأولوية على إعادة تشغيل HAR بالنسبة للطلبات المطابقة.

## قواعد الوكيل

```markdown
## Route-based network mocking

- Use `page.route` with `route.fulfill` for mocking one or two endpoints
  with known responses. Use HAR replay for larger API surfaces.
- Treat routing as middleware. Use `route.fallback()` when later handlers
  still need to run; use `route.continue()` only when the chain should end.
- Use `route.abort` to simulate network failures and to block non-essential
  resources (images, fonts, analytics) that slow down tests.
- Never use `route.continue` to silently modify request headers without
  documenting why in a comment. Header manipulation is invisible in the
  test output and easy to forget about.
- Do not try to override cookies through `route.continue()`. Use
  `addCookies()` or storage state for cookie setup.
- If routes aren't intercepting as expected, check for service workers.
  Set `serviceWorkers: 'block'` in the test context when using route-based
  interception or HAR replay.
- If popup traffic or WebSockets are involved, move the interception to
  the browser context layer before debugging anything else.
- If a helper installs temporary routes, clean them up with `times`,
  `unroute()`, or `unrouteAll({ behavior: 'wait' })` before returning.
```

## الشيء الوحيد الذي يجب تذكره

`page.route` هو الأداة الجراحية. وإعادة تشغيل HAR هي المطرقة الثقيلة. استخدم `route.fulfill` عندما تعرف بالضبط الاستجابة التي تريدها، و`route.abort` عندما تريد محاكاة الفشل، و`route.continue` عندما تريد الاستجابة الحقيقية مع تعديل طفيف. وعندما تصبح المحاكاة كبيرة لدرجة أن معالجات المسارات تزدحم بها ملف الاختبار، فانتقل إلى HAR.

## قراءة إضافية

- [تسجيل HAR لعزل الشبكة](https://stevekinney.com/courses/self-testing-ai-agents/recording-hars-for-network-isolation)
- [مقاربات في تسجيل HAR](https://stevekinney.com/courses/self-testing-ai-agents/approaches-to-har-recording)
- [قصة الانتظار](https://stevekinney.com/courses/self-testing-ai-agents/the-waiting-story)
- [الحالة الحتمية وعزل الاختبار](https://stevekinney.com/courses/self-testing-ai-agents/deterministic-state-and-test-isolation)
