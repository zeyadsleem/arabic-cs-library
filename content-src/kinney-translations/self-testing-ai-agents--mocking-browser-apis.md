---
title: "محاكاة واجهات المتصفح البرمجية"
---

تحظى محاكاة الشبكة بكل الاهتمام لأنها صاخبة. أما محاكاة واجهات المتصفح البرمجية فأهدأ، لكنها تعضّ بقوة مماثلة. يقرأ تطبيقك `matchMedia` أو `navigator.clipboard` أو `Notification.permission` أو `ResizeObserver` أو واجهة تجريبية لامعة ما. ويعيش مشغّل الاختبار في متصفح لا يتصرف تمامًا كما تتصرف متصفحات مستخدميك. وفجأة لم يعد الاختبار عن ميزتك. بل صار عن الفجوة بين «متصفح حقيقي بما يكفي» و«سطح المتصفح المحدد الذي يفترضه هذا المكوّن».

لدى [Playwright](https://playwright.dev/) دليل رسمي هو [Mock browser APIs](https://playwright.dev/docs/mock-browser-apis)، والفكرة الكبرى فيه بسيطة للغاية: إن كان Playwright يمنحك أصلًا مقبضًا من الدرجة الأولى، فاستخدمه. وإن لم يفعل، فثبّت البديل المُحاكى *قبل تحميل الصفحة* واجعل سلوكه شبيهًا بالواجهة الحقيقية بما يكفي كي لا يكون تطبيقك تحت الاختبار في مواجهة خيال.

## استخدم المقبض الحقيقي أولًا

قبل أن تكتب بديلًا مُحاكى، تحقّق مما إذا كان Playwright يمثّل الشيء مباشرة بالفعل.

أمثلة جيدة:

- [`geolocation`](https://playwright.dev/docs/emulation#geolocation) مع [`grantPermissions`](https://playwright.dev/docs/api/class-browsercontext#browser-context-grant-permissions) بدلًا من محاكاة واجهات الموقع يدويًا
- [`locale`](https://playwright.dev/docs/emulation#locale--timezone) و`timezoneId` و`colorScheme` وخيارات منفذ العرض بدلًا من متغيرات عامة مرتجلة
- [`Clock`](https://playwright.dev/docs/clock) بدلًا من تجاوز `Date.now()` برقعة هشة لمرة واحدة
- [`storageState`](https://playwright.dev/docs/auth) بدلًا من حشو حالة المصادقة يدويًا في `localStorage`

القاعدة ليست «لا تحاكِ أبدًا». القاعدة هي «فضّل نموذج المتصفح الذي يعرف Playwright كيف يقوده بالفعل». فالواجهة من الدرجة الأولى تشتري لك شيفرة أقل، وأكاذيب أقل، وسلوكًا أفضل عبر المتصفحات.

## التحكم في الساعة أغنى من «تجميد الوقت»

يستحق [دليل Clock](https://playwright.dev/docs/clock) أن تقرأه كاملًا مرة واحدة، لأن هناك مستويين هنا في الحقيقة.

استخدم `clock.setFixedTime()` حين لا تحتاج إلا إلى قراءات حتمية لساعة الحائط:

```typescript
await page.clock.setFixedTime(new Date('2026-04-14T09:00:00-05:00'));
await page.goto('/dashboard');
```

واستخدم `clock.install()` حين يعتمد التطبيق على مؤقتات أو إطارات حركة أو وقت منقضٍ:

```typescript
await page.clock.install();
await page.clock.pauseAt(new Date('2026-04-14T09:00:00-05:00'));

await page.goto('/dashboard');
await page.clock.fastForward(5000);
await page.clock.runFor(10_000);
await page.clock.resume();
```

`install()` هي النسخة الثقيلة. إنها تتجاوز المؤقتات و`Date` وواجهات إطارات الحركة و`performance` وبقية سطح الوقت. أما `setFixedTime()` فهي النسخة الأخف: «اجعل `Date.now()` حتميًا فقط».

اقرن هذا بخيار `timezoneId` في سياق المتصفح حين تكون الميزة تحت الاختبار حساسة للتواريخ. فتجميد الساعة وترك المنطقة الزمنية طليقة هو الطريق الذي تنتهي به الفرق إلى تصحيح هراء «يعمل في شيكاغو ويفشل في UTC» الذي كتبته بنفسها.

## ثبّت البدائل المُحاكاة قبل التنقّل

يشدد الدليل الرسمي على هذه النقطة لسبب: إن كانت الصفحة تنادي الواجهة أثناء الإقلاع، فيجب أن يوجد بديلك المُحاكى *قبل* أن تبدأ الصفحة التحميل. وهذا يعني [`page.addInitScript()`](https://playwright.dev/docs/api/class-page#page-add-init-script) أو [`browserContext.addInitScript()`](https://playwright.dev/docs/api/class-browsercontext#browser-context-add-init-script)، لا `page.evaluate()` بعد `goto`.

هذا هو النمط الأدنى:

```typescript
import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.addInitScript(() => {
    window.matchMedia = (query: string) => ({
      media: query,
      matches: query === '(prefers-reduced-motion: reduce)',
      onchange: null,
      addEventListener: () => {},
      removeEventListener: () => {},
      addListener: () => {},
      removeListener: () => {},
      dispatchEvent: () => false,
    });
  });
});

test('respects reduced motion preference', async ({ page }) => {
  await page.goto('/settings');
  await expect(page.getByText('Animations reduced')).toBeVisible();
});
```

التوقيت هو الجزء المهم. فإن نقلت البديل المُحاكى إلى ما بعد `goto`، فقد قرأ التطبيق نتيجة `matchMedia` الحقيقية بالفعل، واختبارك الآن يثبت شيئًا عن توقيت رقعتك، لا عن واجهتك.

وإن خلطت بين `browserContext.addInitScript()` و`page.addInitScript()`، فلا تبنِ اختبارًا يعتمد على ترتيبهما النسبي. أبقِ المنطق المرتبط بوقت الإقلاع في مكان واحد، إلا إذا كنت تختبر الطبقات عن قصد.

> **هذا البديل المُحاكى أدنى عمدًا**
>
> إن كانت شيفرتك تشترك عبر `addEventListener` أو `addListener` أو تتوقع تحديثات حية لاستعلامات الوسائط، فهذه القصاصة لا تكفي. استخدم نسخة قادرة على الأحداث في تجهيزة مشتركة كي يمارس الاختبار العقد نفسه الذي يستخدمه مكوّنك في الإنتاج.

## الواجهات للقراءة فقط تحتاج حركة مختلفة

بعض واجهات المتصفح البرمجية قابلة للكتابة. وبعضها ليس كذلك. يستخدم دليل Playwright المثال `navigator.cookieEnabled`، وهو مثال جيد: الإسناد إليه مباشرة لا يفعل شيئًا. فإن كانت الخاصية قابلة للتهيئة، فاستخدم [`Object.defineProperty`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty) على النموذج الأولي الصحيح بدلًا من ذلك.

```typescript
await page.addInitScript(() => {
  Object.defineProperty(Object.getPrototypeOf(navigator), 'cookieEnabled', {
    value: false,
  });
});
```

هذا هو الجزء الذي يفاجئ الناس. الاختبار «عيّن» الخاصية. والتطبيق ما زال يرى القيمة الأصلية. ولم يكن العيب في الميزة. كان العيب في البديل المُحاكى.

## مثّل الأحداث، لا القيم فقط

هذا أكبر خطأ في محاكاة واجهات المتصفح بفارق كبير.

النسخة الأولى من البديل المُحاكى تعيد قيمة. فيُصيّر التطبيق بشكل صحيح عند أول رسم. ويشعر الجميع بالرضا. ثم تتعطل الميزة الحقيقية لأن التطبيق كان يستمع إلى تحديثات ولم يصدرها البديل المُحاكى قط.

إن كان مكوّنك يشترك في التغييرات، فيجب أن يدعم بديلك المُحاكى التغييرات.

[مثال البطارية في دليل Playwright](https://playwright.dev/docs/mock-browser-apis) يستحق الدراسة لهذا السبب بالضبط: إنه يخزّن المستمعين، ويحدّث الحالة الداخلية، ويطلق الأحداث نفسها التي يطلقها التنفيذ الحقيقي. هذا هو السقف. لا دقة متصفح مثالية. بل سلوك يكفي لأن يُختبر المكوّن مقابل العقد نفسه الذي يستخدمه في الإنتاج.

أستخدم هذا النموذج الذهني:

- إن كانت الصفحة تقرأ مرة واحدة فقط، فقد تكفي قيمة إرجاع بسيطة.
- وإن كانت تشترك، فيجب أن يدعم البديل المُحاكى المستمعين.
- وإن كانت تتفرّع على حالة الإذن، فيجب أن يتفق الإذن وسطح الواجهة معًا.

## تحقّق من النداءات حين يكون العقد مهمًا

أحيانًا لا يكون الجزء المثير مجرد «تغيّرت الواجهة». أحيانًا تريد أن تثبت أن الصفحة طلبت من المتصفح الشيء الذي كان ينبغي أن تطلبه. ويوصي دليل Playwright بـ[`page.exposeFunction()`](https://playwright.dev/docs/api/class-page#page-expose-function) لهذا، وهي حيلة لطيفة.

اعرض مسجّلًا من الاختبار، ودع البديل المُحاكى يناديه، ثم أكّد على تسلسل النداءات. هذا يحوّل «أظن أن التطبيق استعلم الواجهة على الأرجح» إلى عقد حقيقي.

وهذا مهم جدًا في:

- واجهات الاشتراك
- طلبات الإذن
- قراءات الحافظة وكتاباتها
- فروع كشف الميزات مثل `if ('share' in navigator)`

إن اكتفيت بالتأكيد على الواجهة النهائية، فقد تجعل قيمة مخزّنة مؤقتًا قديمة الاختبار ينجح للسبب الخطأ.

## حالات الاستخدام الشائعة

هذا هو الجزء الذي كنت أتمنى أن تدوّنه مزيد من الفرق. محاكاة واجهات المتصفح البرمجية ليست غريبة. إنها تظهر باستمرار.

### واجهات الوسائط والتفضيلات

[`matchMedia`](https://developer.mozilla.org/en-US/docs/Web/API/Window/matchMedia) من أجل:

- `prefers-reduced-motion`
- `prefers-color-scheme`
- فروع الواجهة المدفوعة بنقاط التوقف

إن كان التطبيق يغيّر التخطيط أو سلوك الحركة بناءً على تفضيلات المتصفح، فالبديل المُحاكى هو غالبًا أبسط طريق حتمي.

### الحافظة

دعم [`Clipboard API`](https://developer.mozilla.org/en-US/docs/Web/API/Clipboard_API) مثال كلاسيكي. أزرار «انسخ رابط الدعوة» يسهل اختبارها بمجرد أن تستبدل `navigator.clipboard.writeText` ببديل يسجّل القيمة المكتوبة.

### واجهات المراقب

تظهر [`IntersectionObserver`](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) و[`ResizeObserver`](https://developer.mozilla.org/en-US/docs/Web/API/ResizeObserver) في التحميل الكسول والترويسات اللاصقة والتجزيء والمكوّنات المتجاوبة. وهي أيضًا المكان الذي تموت فيه البدائل المُحاكاة الناقصة. فإن كان إطارك يتوقع `observe` و`unobserve` ودلالات توقيت النداء الراجع، فعلى البديل المُحاكى أن يوفرها.

### الأذونات وقدرات المتصفح

`Notification.permission` و`navigator.share` و`navigator.permissions.query()` كلها مواضع يمكن أن يتفرّع فيها التطبيق بناءً على دعم المتصفح أو حالة الإذن. وهذه الاختبارات ليست عادة عن ميزة المتصفح نفسها. بل عن واجهتك البديلة، أو تدفق التمكين لديك، أو معالجة الأخطاء لديك.

### الواجهات التجريبية أو غير المدعومة بالكامل

هذا هو الدلو الذي يستهدفه دليل Playwright الرسمي فعلًا. حالة البطارية. ذاكرة الجهاز. بعض الواجهات القريبة من العتاد. الميزة موجودة في منتجك. وسطح الأتمتة ليس من الدرجة الأولى في كل مكان. والمحاكاة هي الحركة العملية.

## أين تساعد التجهيزات

شجرة القرار الكاملة بين الدوال المساعدة والتجهيزات موجودة في [أين تساعد التجهيزات فعلًا](https://stevekinney.com/courses/self-testing-ai-agents/where-fixtures-actually-help). وهنا القاعدة في سطر واحد أبسط: إن كانت اختبارات عدة تحتاج عقد المتصفح نفسه، فاجعلها تجهيزة.

مرشحات جيدة للتجهيزات:

- `reducedMotionPage` تُستخدم في ملف مواصفات كامل يركّز على الوصول
- تجهيزة `clipboardRecorder` تثبّت البديل المُحاكى وتكشف الكتابات الملتقطة
- `batteryAwarePage` أو `offlineCapablePage` تُستخدم في سيناريوهات متعددة
- تجهيزة `context` مشتركة تحجب عمّال الخدمة وتثبّت طبقات محاكاة المتصفح وقت الإقلاع

هذا يبقي الجزء المثير في المواصفة ظاهرًا:

```typescript
test('copies the invite link', async ({ clipboardRecorder, page }) => {
  await page.goto('/settings/team');
  await page.getByRole('button', { name: 'Copy invite link' }).click();
  expect(clipboardRecorder.writes).toEqual(['https://shelf.test/invite/abc123']);
});
```

(تدفق `/settings/team` هذا مثال مُركَّب للتوضيح؛ Shelf لا يشحن صفحة رابط دعوة اليوم.)

فيُقرأ ذلك كسلوك، لا كإعداد.

## المزالق

### المحاكاة في وقت متأخر جدًا

إن كان التطبيق يُقلع قبل وجود البديل المُحاكى، فأنت مخطئ بالفعل.

### استخدام بديل مُحاكى بينما يملك Playwright دعمًا حقيقيًا

إن كان الشيء هو الموقع الجغرافي أو الأذونات أو الساعة أو اللغة أو منفذ العرض أو حالة التخزين، فابدأ بميزة Playwright من الدرجة الأولى. فالبديل المكتوب يدويًا تراجع عادة في هذه الحالات.

### إعادة القيمة بلا الشكل

غالبًا ما تتوقع شيفرة الأطر وجود توابع ونقاط تسجيل أحداث حتى لو لم يهتم الاختبار المعني بها. «إنها تعيد القيمة المنطقية الصحيحة» لا يكفي إن كان المكوّن ينادي `addEventListener` أيضًا.

### محاكاة المصادقة عبر `localStorage`

إن كان التطبيق الحقيقي يصادق عبر حالة المتصفح، فاستخدم `storageState` أو تدفق تسجيل الدخول الحقيقي في التطبيق. محاكاة تخزين المصادقة يدويًا طريقة رائعة لصنع مجموعة اختبارات تنجح بينما مسار تسجيل الدخول الفعلي معطل.

### نسيان فروق المتصفحات

كلما صار بديلك المُحاكى أكثر تخصيصًا، صار أسهل أن تثبّت سلوك [Chromium](https://www.chromium.org/chromium-projects/) بالخطأ داخل اختبار تحسبه محمولًا. وهذا أحد المواضع التي تستحق فيها جولة دخان صغيرة في [Firefox](https://www.mozilla.org/firefox/) أو [WebKit](https://webkit.org/) عناءها.

## قواعد الوكيل

```markdown
## Mocking browser APIs

- Use Playwright's first-class emulation and browser options before writing a
  custom browser API mock.
- Install custom browser API mocks with `page.addInitScript()` or
  `browserContext.addInitScript()` before navigation.
- If the app listens for browser API updates, the mock must fire the same
  events the real API would fire.
- Keep one-off mocks in the test. Move shared browser-environment contracts
  into fixtures.
- Do not fake authentication with ad-hoc `localStorage` writes when
  `storageState` or the real login flow exists.
```

## الشيء الذي يجب تذكّره

البدائل المُحاكاة لواجهات المتصفح لا تكون مفيدة إلا حين تحفظ العقد الذي يستخدمه تطبيقك فعلًا. وهذا يعني التثبيت المبكر، وشكل الكائن الصحيح، وسلوك الأحداث الحقيقي حين يشترك المكوّن. وأي شيء أقل من ذلك طريق سريع لتثبت أن بديلك المُحاكى يعمل.

## قراءات إضافية

- [اعتراض الشبكة عبر المسارات](https://stevekinney.com/courses/self-testing-ai-agents/route-based-network-interception)
- [المصادقة بحالة التخزين](https://stevekinney.com/courses/self-testing-ai-agents/storage-state-authentication)
- [أين تساعد التجهيزات فعلًا](https://stevekinney.com/courses/self-testing-ai-agents/where-fixtures-actually-help)
- [التحقق عبر المتصفحات دون حرق حلقة التطوير](https://stevekinney.com/courses/self-testing-ai-agents/cross-browser-validation-without-burning-the-dev-loop)
