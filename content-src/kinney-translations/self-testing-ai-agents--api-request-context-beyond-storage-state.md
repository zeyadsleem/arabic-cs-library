---
title: "APIRequestContext: ما هو أبعد من حالة التخزين"
---

حالة التخزين صورة فوتوغرافية لمتصفح مسجَّل الدخول. والصور الفوتوغرافية لا تتحدّث، ولا تسجّل الدخول بمستخدم ثانٍ في منتصف الاختبار، ولا تمنحك طلب API موثّقًا دون تشغيل سياق Playwright كامل أولًا. غطّى [درس مصادقة حالة التخزين](https://stevekinney.com/courses/self-testing-ai-agents/storage-state-authentication) الحالة التي تمثل 90%. وهذا الدرس عن الـ10% التي تُعثر الوكلاء في كل مرة.

الشيء الذي أريدك أن تخرج من هذا الدرس وأنت تفهمه هو أن تجهيزة `request` التي كنت تستدعيها على هامش اختباراتك هي في الحقيقة عميل HTTP كامل. يُسمى `APIRequestContext`، وله جرّة ملفات تعريف ارتباط خاصة به، ويمكنك بناء أكثر من واحد منه في اختبار واحد.

تذكر [وثائق اختبار API](https://playwright.dev/docs/api-testing) حقيقتين مفيدتين أخريين بوضوح:

- تجهيزة `request` المدمجة ترث أصلًا إعدادات مثل `baseURL` والترويسات الافتراضية
- `browserContext.request` يشارك ملفات تعريف الارتباط مع سياق المتصفح ذلك

هاتان التفصيلتان هما سبب كون هذا أكثر من «`fetch` أجمل قليلًا».

## ما هي حالة التخزين فعلًا

مشروع التهيئة في Shelf يسجّل الدخول مرة واحدة، ويكتب `playwright/.authentication/user.json`، وكل اختبار موثّق يرث ذلك الملف عبر خيار المشروع `storageState`. والملف نفسه كتلة JSON — ملفات تعريف ارتباط وإدخالات `localStorage` — يركّبها Playwright في سياق متصفح جديد قبل أن يبدأ اختبارك. هذه هي الآلية بأكملها.

هذا رائع للحالة الشائعة، وعديم الفائدة تمامًا في ثلاث حالات أخرى:

1. تحتاج إلى تسجيل الدخول بمستخدم *ثانٍ* في منتصف الاختبار (مدير + قارئ، فريقان، تدفّق تسليم).
2. تريد الوصول إلى نقطة نهاية API موثّقة دون تشغيل متصفح على الإطلاق — لأنك تزرع حالة، أو تتحقق من الاستمرارية، أو تريد فقط أن تكون أسرع مما تستطيع واجهة المستخدم.
3. تنتهي الجلسة أثناء الاختبار، وتحتاج إلى تحديثها وإعادة المحاولة.

هذه الحالات الثلاث كلها تقع خارج ما تستطيع حالة التخزين فعله لك. وكلها من اختصاص `APIRequestContext`.

## تجهيزة `request` عميل HTTP كامل

رأيت هذا بالفعل في [درس اختبارات API وواجهة المستخدم الهجينة](https://stevekinney.com/courses/self-testing-ai-agents/api-and-ui-hybrid-tests). ينتهي اختبار تقييم الكتاب باستدعاء `request.get('/api/shelf')` للتحقق من الاستمرارية بعد أن تنتهي الواجهة من الكتابة. ذلك `request` هو تجهيزة `APIRequestContext` لكل اختبار، وهو موثّق أصلًا لأن مشروع `authenticated` ركّب حالة تخزين القارئ على السياق.

وهنا الشيء الذي لم يخبرك به الدرس: `request` ليس غلافًا للتسهيل. إنه عميل HTTP كامل. له جرّة ملفات تعريف ارتباط خاصة به، ويستطيع تعيين ترويسات إضافية، و— *وهذا هو الجزء الذي يخطئ فيه الوكلاء باستمرار* — يمكنك إنشاء *أكثر من واحد* منه في اختبار واحد:

```typescript
import { request as playwrightRequest } from '@playwright/test';

test('two actors', async ({ page }) => {
  const adminApi = await playwrightRequest.newContext({
    storageState: 'playwright/.authentication/admin.json',
  });

  // ... use adminApi.get(...) alongside the test's authenticated `page`
  await adminApi.dispose();
});
```

لاحظ الشكل. `playwrightRequest.newContext(...)` — التصدير الأعلى مستوى `request` من `@playwright/test`، *وليس* طريقة تجهيزة `request` الخاصة بكل اختبار. يكتب الوكلاء `request.newContext(...)` في اختبار فيحصلون على خطأ نوعي، ثم يكتبون `this.request.newContext(...)` فيحصلون على خطأ مختلف، ثم يستسلمون ويدفعون المستخدم الثاني عبر الواجهة. لا تحتاج إلى أي من ذلك. تحتاج إلى الاستيراد الأعلى مستوى.

إن كنت **لا** تحتاج إلى فاعل ثانٍ، فلا تنشئ واحدًا. فالتجهيزة المدمجة تحمل أصلًا `baseURL` الخاص بالمشروع والترويسات وحالة المصادقة. قدر مدهش من شيفرة عميل API المكتوبة يدويًا في مجموعات الاختبارات ليس إلا طريقة أبطأ لإعادة إنشاء ما تعرفه التجهيزة أصلًا.

## النمط: تهيئة موثّقة بدون متصفح

رأيت بالفعل اختبار تقييم الكتاب الهجين يستخدم `request.get('/api/shelf')` للتحقق من الاستمرارية. وهذه هي النسخة المنهجية لما كنت تفعله أصلًا.

بدلًا من استدعاء نقطة النهاية على هامش اختبار واجهة مستخدم، يمكنك *تركيب* تجهيزة تمنح كل اختبار `APIRequestContext` مُهيأ مسبقًا ببيانات اعتماد المدير. مثال تركيب التجهيزات من [درس التجهيزات](https://stevekinney.com/courses/self-testing-ai-agents/fixtures-worker-scoped-test-scoped) هو الشكل؛ وهنا هو بمسارات Shelf الحقيقية:

```typescript
export const test = base.extend<{ adminRequest: APIRequestContext }>({
  adminRequest: async ({ playwright }, use) => {
    const context = await playwright.request.newContext({
      storageState: 'playwright/.authentication/admin.json',
    });
    await use(context);
    await context.dispose();
  },
});
```

أي اختبار يطلب `adminRequest` الآن يحصل على عميل HTTP يحمل ملف تعريف ارتباط جلسة المدير. لا متصفح. لا تدفّق تسجيل دخول. مشروع Shelf الأولي لا يشحن ملف تهيئة حالة تخزين المدير، لذا تنشئه كجزء من سير العمل هذا وتكتب `playwright/.authentication/admin.json` بنفسك. ستسجّل التهيئة دخول المدير المزروع عبر نموذج `/login` الموجود في Shelf (حقل `Display name` موجود فقط في وضع إنشاء الحساب، لذا يستخدم تسجيل الدخول العادي حقلي البريد الإلكتروني وكلمة المرور فقط):

```typescript
// tests/labs/admin.setup.ts
import path from 'node:path';
import { expect, test as setup } from '@playwright/test';
import { admin } from '../data';
import { resetShelfContent } from '../helpers/seed';

const adminStorageStatePath = path.resolve('playwright/.authentication/admin.json');

setup('authenticate the seeded admin', async ({ page }) => {
  await resetShelfContent();

  await page.goto('/login');
  await page.getByLabel('Email').fill(admin.email);
  await page.getByLabel('Password').fill(admin.password);
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page).toHaveURL(/\/shelf/);
  await page.context().storageState({ path: adminStorageStatePath });
});
```

مشروع Shelf الأولي لا يشحن ذلك الملف. تنشئه أثناء المختبر، ثم تشغّله مع تمكين المختبرات:

```bash
PLAYWRIGHT_INCLUDE_LABS=1 npx playwright test tests/labs/admin.setup.ts
```

ذلك التشغيل الواحد يكتب `playwright/.authentication/admin.json`، ويمكن لتجهيزة `adminRequest` إعادة استخدامه بعد ذلك.

وبوجود التجهيزة، يمكن لاختبار يحتاج إلى إنشاء كتاب كمدير والتحقق منه كقارئ أن يبقى بهذا الصغر:

```typescript
test('admin curates, reader sees', async ({ page, adminRequest }) => {
  await adminRequest.post('/api/admin/featured-books', {
    data: { openLibraryId: 'OL1W' },
  });

  await page.goto('/');
  await expect(page.getByRole('heading', { name: /featured/i })).toBeVisible();
});
```

فاعلان، اختبار واحد، بلا تسجيل دخول إضافي عبر الواجهة. هذا هو الجزء من تجهيزة API الذي يجعل الاختبارات أسرع بعشر مرات من تدفّق المتصفح المكافئ، لأنك تتخطى كل الرسم.

## النمط: مستخدم ثانٍ في منتصف الاختبار

عندما يكون الشيء الذي تختبره *هو* التفاعل بين فاعلين — المدير يرقّي كتابًا، والقارئ يراه يظهر — فأنت تحتاج إلى العميلين جنبًا إلى جنب. التجهيزة تتعامل مع جانب المدير؛ و`page` في الاختبار يتعامل مع جانب القارئ:

```typescript
test('promoted book appears on the reader home page', async ({ page, adminRequest }) => {
  const response = await adminRequest.post('/api/admin/featured-books', {
    data: { openLibraryId: 'OL1W' },
  });
  expect(response.ok()).toBe(true);

  await page.goto('/');
  await expect(page.getByRole('article', { name: /Station Eleven/ })).toBeVisible();
});
```

اختبار واحد، هويتان موثّقتان، صفر حالة مشتركة. هذا هو النمط الذي يستحق فيه `APIRequestContext` وجوده.

> **فاعل واحد لكل اختبار افتراضيًا**
>
> اختبارات تعدد الفاعلين قوية، وسوف تلسعك. اجعل الافتراضي فاعلًا واحدًا لكل اختبار. وامدّ يدك إلى اثنين عندما يكون السلوك قيد الاختبار *هو* التسليم بينهما. أما ثلاثة فاعلين في اختبار واحد فهي رائحة دائمًا تقريبًا.

## النمط: الفاعل نفسه، ملفات تعريف ارتباط مشتركة

أحيانًا لا تحتاج إلى فاعل ثانٍ على الإطلاق. تحتاج إلى أن يكون المتصفح وعميل API الفاعل نفسه بجلسة واحدة مشتركة. وذلك هو [`browserContext.request`](https://playwright.dev/docs/api-testing).

سجّل الدخول عبر الصفحة، واستدعِ نقطة نهاية عبر `browserContext.request`، فتبقى جرّة ملفات تعريف الارتباط متزامنة. هذا أنظف من نسخ ترويسات `Cookie` هنا وهناك، وأصدق من التظاهر بأن قراءة API والمتصفح مستخدمان غير مرتبطين.

## النمط: النجاة من تحديث الرمز

جلسة Shelf المكتوبة يدويًا (انظر `src/lib/server/session.ts`) طويلة العمر بما يكفي لأنك لن ترى هذا عمليًا، لكنه فخ شائع للوكلاء، لذا يستحق العرض. إن انتهت جلسة تطبيقك في منتصف الاختبار (فكّر: رموز مدتها 15 دقيقة مع تحديث)، فإن نمط تركيب التجهيزات يمنحك مكانًا واحدًا نظيفًا للتعامل مع إعادة المصادقة:

```typescript
refreshableAdmin: async ({ playwright }, use) => {
  let context = await playwright.request.newContext({
    storageState: 'playwright/.authentication/admin.json',
  });

  const withRetry: APIRequestContext = new Proxy(context, {
    get(target, prop) {
      const original = Reflect.get(target, prop);
      if (typeof original !== 'function') return original;
      return async (...args: unknown[]) => {
        const result = await original.apply(target, args);
        if (result?.status?.() === 401) {
          await context.dispose();
          context = await playwright.request.newContext({
            storageState: 'playwright/.authentication/admin.json',
          });
          return (Reflect.get(context, prop) as Function).apply(context, args);
        }
        return result;
      };
    },
  });

  await use(withRetry);
  await context.dispose();
};
```

هذا أطول مما تتوقع، وهذا هو المقصود. تحديث الجلسة من الأشياء التي تبدو سطرًا واحدًا ثم تتحول إلى أمسية كاملة عندما تخطئ فيها. ضعه في تجهيزة، وأحسنه مرة واحدة، فيرث كل اختبار في المجموعة الإصلاح.

إن كنت لا تحتاج إلى تحديث الرمز — وعلى الأرجح لا تحتاج اليوم — فلا تكتب هذا. لكن الشكل يستحق التعرّف عليه استعدادًا للحظة التي تحتاجه فيها.

## متى لا تستخدم `APIRequestContext`

الاختبار الذي أريدك أن تكتبه *هو* اختبار واجهة مستخدم. والشيء الذي تتحقق منه *هو* الواجهة. لا تتخطَّ الواجهة لأن API أسرع — فستكون تختبر الشيء الخطأ. `APIRequestContext` مخصص لـ *التهيئة* و*التحقق*، لا لاستبدال السلوك الذي تختبره فعلًا.

تحديدًا:

- التحقق من تدفّق تسجيل الدخول نفسه: استخدم المتصفح. فهذا هو ما تحت الاختبار.
- التحقق من تحقّق الواجهة من المدخلات وحالات الخطأ ودوّارات التحميل وتركيز لوحة المفاتيح: استخدم المتصفح.
- التحقق من أن إجراء خادم قد حُفظ فعلًا: استخدم `request.get(...)` على الهامش. هذا هو النمط الهجين من [درس اختبارات API وواجهة المستخدم الهجينة](https://stevekinney.com/courses/self-testing-ai-agents/api-and-ui-hybrid-tests).
- التحقق من أن API يرفض المدخلات السيئة: اكتب اختبار API خالصًا. فالمتصفح هنا مجرد مراسم.

القاعدة التي أطبّقها: إن كان في اختباري تأكيد `page.getByRole(...)` يمكنني إعادة كتابته كتأكيد `request.get(...)` *دون فقدان أي شيء*، فإني كنت أختبر API عبر الواجهة، وينبغي أن أقسم الاختبار إلى اثنين.

## قواعد الوكيل

```markdown
## APIRequestContext

- Prefer API setup for state (`resetShelfContent`, `seedFreshDatabase`, direct POSTs). Reserve the UI for the behavior actually under test.
- One test, one actor by default. Add a second actor only when the behavior under test _is_ the handoff.
- For multi-actor tests, build a fixture that exposes an authenticated `APIRequestContext` via `playwright.request.newContext({ storageState })`. Do not type `request.newContext(...)`—that is not a method on the per-test fixture.
- Use `browserContext.request` when the browser page and the API call are
  the same actor and should share cookies automatically.
- Worker-scope the fixture when the session is read-only (verifying, listing). Test-scope it when the actor mutates state.
- Dispose every `APIRequestContext` you construct yourself. The test's per-test `request` fixture disposes itself; hand-built ones don't.
```

## الشيء الذي يجب تذكّره

حالة التخزين صورة فوتوغرافية. و`APIRequestContext` كاميرا. الصورة مثالية للشخص الواحد الذي تسجّل الدخول باسمه وقت التهيئة. والكاميرا هي ما تمدّ يدك إليه عندما يحتاج الاختبار إلى شخص ثانٍ، أو جلسة ثانية، أو فرصة ثانية للمصادقة. معظم الاختبارات تكتفي بالصورة. أما التي لا تكتفي، فهي موضوع هذا الدرس.

## قراءات إضافية

- [مصادقة حالة التخزين](https://stevekinney.com/courses/self-testing-ai-agents/storage-state-authentication) — المتطلب السابق. يفترض هذا الدرس أنك تعرف أصلًا كيف تُكتب حالة التخزين وتُركَّب.
- [اختبارات API وواجهة المستخدم الهجينة](https://stevekinney.com/courses/self-testing-ai-agents/api-and-ui-hybrid-tests) — الدرس الذي ظهرت فيه تجهيزة `request` أول مرة، ومصدر نمط التحقق الهجين الذي يعمّمه هذا الدرس.
- [التجهيزات: على نطاق العامل وعلى نطاق الاختبار والفخ بينهما](https://stevekinney.com/courses/self-testing-ai-agents/fixtures-worker-scoped-test-scoped) — من أجل مثال التركيب الذي يجعل نمط الفاعل الثاني ممكنًا دون لصق استدعاء `newContext` في كل ملف اختبار.
