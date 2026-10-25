---
title: "الحل"
lang: ar
source: "https://stevekinney.com/courses/self-testing-ai-agents/harden-the-flaky-rate-book-test-solution"
---

كان في اختبار البداية ثماني مشكلات وصفر من العادات الجيدة. أما النسخة النهائية ففيها صفر مشكلات—وإن أمعنت النظر—تُقرأ كأنها مواصفة. وإليك كيف ننتقل من الأولى إلى الثانية، نمطًا واحدًا في كل مرة.

إن أردت تجاوز الشرح التفصيلي والاكتفاء برؤية الملف النهائي، فاقفز إلى [الشيفرة النهائية](#the-final-file). لكن الجزء المثير ليس الوجهة—بل تسلسل الإيداعات الذي أوصلنا إليها، لأن كل إيداع يعزل فئة واحدة بالضبط من الإصلاحات.

## الإصلاح 1: المصادقة بحالة التخزين

يبدأ الاختبار الأصلي بتسجيل دخول كامل عبر الواجهة:

```typescript
await page.goto('/login');
await page.fill('[name=email]', 'alice@example.com');
await page.fill('[name=password]', 'password123');
await page.click('button[type=submit]');
await page.waitForTimeout(1000);
```

خمسة أسطر، و`waitForTimeout` واحد، وكل اختبار في المجموعة يدفع ثمن ملء نموذج والانتظار من أجل إعادة توجيه. والأسوأ: إن غيّرت صفحة تسجيل الدخول ترميزها، انكسر كل ملف اختبار يسجّل الدخول بهذه الطريقة.

حالة التخزين تصلح كل هذا. يحدث تسجيل الدخول مرة واحدة في `tests/authentication.setup.ts`، وتُحفظ ملفات تعريف الارتباط الناتجة على القرص، ثم يعيد كل اختبار لاحق استخدامها. ولا يذكر ملف الاختبار `/login` إطلاقًا.

بعد هذا الإيداع، يبدأ الاختبار عند `page.goto('/shelf')`. وقد اختفت أسطر تسجيل الدخول الخمسة. واختفى معها أول `waitForTimeout`.

> **ملاحظة**
>
> تفرض كومة المصادقة في Shelf دلالات على طريقة CSRF، لذا يقود ملف الإعداد نموذج تسجيل الدخول الحقيقي عبر متصفح بدلًا من إرسال POST مباشرة إلى نقطة نهاية تسجيل الدخول. وهذا مقصود—فهو يخدم أيضًا كاختبار دخان ضمني على صفحة تسجيل الدخول.

## الإصلاح 2: الزرع الحتمي

الاختبار الأصلي بلا زرع. إنه يفترض أن «كل ما على الرف» يتضمن كتابًا فيه زر `.rate`. على قاعدة بيانات جديدة، قد يكون كذلك. وبعد أن يحذف اختبار آخر كتابًا، قد لا يكون. وهذا هو تعريف التذبذب.

الإصلاح هو `resetShelfContent` داخل `beforeEach`. وهذه تنادي دالة الزرع المساعدة التي تبنيها في `tests/helpers/seed.ts`، والتي تعيد الرف إلى حالة معلومة: مجموعة كتب محددة، بلا تقييمات، في كل مرة.

```typescript
test.beforeEach(async () => {
  await resetShelfContent();
});
```

سطر واحد. الآن يعرف الاختبار بالضبط ما في قاعدة البيانات قبل أن يبدأ. وكان نداءا `waitForTimeout` الثاني والثالث يعوّضان جزئيًا عن بيانات قديمة أو ناقصة—وحين يصير الزرع حتميًا، يختفي نصف مشكلات التوقيت من تلقاء نفسه.

لاحظ أننا نستخدم `resetShelfContent` لا `seedFreshDatabase`. والفرق مهم: `resetShelfContent` تعيد ضبط الكتب والتقييمات دون المساس بالمستخدمين. ولو محونا المستخدمين، لأبطلنا حالة التخزين التي أعددناها للتو في الإصلاح 1. وهذا نوع التفاعل الذي يحرق ساعة من وقتك إن لم تعرف أن تبحث عنه.

## الإصلاح 3: المحددات الدلالية

يستخدم الاختبار الأصلي محددات CSS خامًا في كل مكان:

```typescript
await page.locator('.book-card button.rate').first().click();
await page.locator('.rating-modal .star[data-value="4"]').click();
await page.locator('.rating-modal button.submit').click();
const toast = await page.locator('.toast').textContent();
```

كل واحد من هذه ينكسر حين تتغير أسماء الفئات. ونداء `.first()` سيئ على وجه الخصوص—فهو يلتقط أي كتاب تصادف أنه الأول في DOM، ما يعني أن الاختبار لا يتحقق فعلًا من كتاب بعينه.

يستخدم الإصلاح `getByRole` مع تسلسل محدّد النطاق:

```typescript
const stationEleven = page.getByRole('article', { name: /Station Eleven/ });
await stationEleven.getByRole('button', { name: 'Rate this book' }).click();
```

الآن نستهدف كتابًا بعينه باسمه المتاح للوصول، ثم نحدد النطاق داخل ذلك المقال للعثور على زر التقييم. إن أعاد أحد ترتيب الرف، فسيظل الاختبار يجد Station Eleven. وإن أعاد أحد تسمية فئة CSS من `.rate` إلى `.rating-trigger`، فلن يهتم الاختبار.

داخل النافذة، النمط نفسه:

```typescript
const dialog = page.getByRole('dialog', { name: /Rate Station Eleven/ });
await dialog.getByRole('radio', { name: '4 stars' }).check();
await dialog.getByRole('button', { name: 'Save rating' }).click();
```

النافذة محددة النطاق بالدور والاسم. وزر الاختيار يُعثر عليه بتسميته. وزر الإرسال يُعثر عليه بنصه الظاهر. لا CSS. ولا خصائص `data-value`. ولا محددات مركّبة.

يتغير تأكيد الإشعار أيضًا. كان الأصل يقرأ `textContent()` في متغيّر ويؤكد بـ`.toContain`—وهذا يتجاوز إعادة المحاولة التلقائية في Playwright بالكامل. فإن استغرق ظهور الإشعار 200ms، يفشل الاختبار. أما الإصلاح:

```typescript
await expect(page.getByRole('status')).toHaveText(/Thanks/);
```

يعيد `toHaveText` المحاولة تلقائيًا حتى يطابق نص العنصر أو تنتهي المهلة. ومحدد `role="status"` أكثر استقرارًا من `.toast`، وهو أيضًا فحص وصول—فإن أزال أحد دور ARIA من الإشعار، يفشل هذا الاختبار *و*يكون الإشعار معطلًا لمستخدمي قارئات الشاشة.

## الإصلاح 4: استبدال الانتظارات بإشارات حقيقية

في الأصل ثلاثة نداءات `waitForTimeout`: 1000ms بعد تسجيل الدخول، و2000ms بعد الانتقال إلى الرف، و1500ms بعد إرسال التقييم. مجموع ذلك 4.5 ثوانٍ من الزمن الميت—في يوم جيد.

الإصلاح 1 أزال الأول بالفعل. وكان الثاني يعوّض عن تحميل صفحة الرف—لكننا لا نحتاج مهلة لذلك. فتأكيد `await expect(stationEleven).toBeVisible()` يعيد المحاولة تلقائيًا حتى تظهر بطاقة الكتاب. هذا هو الانتظار. بلا رقم سحري.

والثالث هو الأكثر إثارة. ينتظر الأصل 1500ms بعد النقر على «submit» ويأمل أن التقييم قد حُفظ. أما الإصلاح فيستخدم `waitForResponse`:

```typescript
const ratingResponse = page.waitForResponse(
  (response) => /\/api\/shelf\/.+/.test(response.url()) && response.request().method() === 'PATCH',
);
await dialog.getByRole('button', { name: 'Save rating' }).click();
const savedResponse = await ratingResponse;
expect(savedResponse.ok()).toBe(true);
```

لاحظ الترتيب: تُعدّ مستمع الاستجابة *قبل* النقر، ثم تنتظره *بعده*. وإن فعلت العكس، فلديك حالة تسابق—قد تصل الاستجابة قبل أن تبدأ الاستماع. هذا هو النمط. احفظه.

الآن ينتظر الاختبار الإشارة الصحيحة بالضبط: طلب PATCH إلى API الرف عاد بـ200. لا «مرّت 1500ms وأرجو أن الأمور سارت على ما يرام». بل استجابة الشبكة الفعلية.

## الملف النهائي {#the-final-file}

هذا هو الاختبار النهائي بعد الإصلاحات الأربعة كلها. والتعليقات المضمّنة هي شروح تعليمية موضوعة فوق الشكل النهائي في `tests/rate-book.spec.ts`.

```typescript
import { expect, test } from '@playwright/test';
import { resetShelfContent } from './helpers/seed';

test.describe('rate a book on your shelf', () => {
  // Fix 2: deterministic seeding — every run starts from the same state
  test.beforeEach(async () => {
    await resetShelfContent();
  });

  // Fix 1: no login block — storage state authentication handles it
  test('user can rate Station Eleven', async ({ page, request }) => {
    await page.goto('/shelf');

    // Fix 3: semantic locator scoped to a specific book
    const stationEleven = page.getByRole('article', { name: /Station Eleven/ });
    await expect(stationEleven).toBeVisible(); // Fix 4: this IS the wait

    // Fix 3: scoped button inside the article
    await stationEleven.getByRole('button', { name: 'Rate this book' }).click();

    // Fix 3: dialog by role and name
    const dialog = page.getByRole('dialog', { name: /Rate Station Eleven/ });
    await expect(dialog).toBeVisible();

    // Fix 3: radio by label instead of .star[data-value="4"]
    await dialog.getByRole('radio', { name: '4 stars' }).check();

    // Fix 4: listen for the response BEFORE clicking
    const ratingResponse = page.waitForResponse(
      (response) =>
        /\/api\/shelf\/.+/.test(response.url()) && response.request().method() === 'PATCH',
    );

    // Fix 3: button by name instead of .submit
    await dialog.getByRole('button', { name: 'Save rating' }).click();

    // Fix 4: await the actual network response
    const savedResponse = await ratingResponse;
    expect(savedResponse.ok()).toBe(true);

    // Fix 3 + 4: auto-retrying assertion on a role-based locator
    await expect(page.getByRole('status')).toHaveText(/Thanks/);

    // Fix 3: verify the rating is visible in the UI
    await expect(stationEleven.getByText('Rated: 4/5')).toBeVisible();

    // Hybrid API assertion — verify the rating actually persisted in the database
    const shelfResponse = await request.get('/api/shelf');
    expect(shelfResponse.ok()).toBe(true);

    const body = (await shelfResponse.json()) as {
      entries: Array<{ book: { title: string }; rating: number | null }>;
    };
    const stationElevenEntry = body.entries.find((entry) => entry.book.title === 'Station Eleven');
    expect(stationElevenEntry?.rating).toBe(4);
  });
});
```

في هذه المرحلة من الدورة، ما زال الاختبار يستورد من `@playwright/test`. لاحقًا، في مختبر ملفات تعريف الأعطال، تضيف `tests/fixtures.ts` لتغليف `page` بتمرير وحدة التحكم والشبكة. وحين يوجد ذلك الملف، يصبح تبديل الاستيراد إلى `./fixtures` متابعة جيدة. وهو **ليس** شرطًا مسبقًا لهذا المختبر.

صفر `waitForTimeout`. صفر `page.locator()`. صفر `page.goto('/login')`. صفر `page.fill('[name=')`. كل محدد دلالي. وكل انتظار إشارة حقيقية.

## ما ما زلت بحاجة إلى تشغيله

تشترط معايير القبول عشر نجاحات متتالية. وهذه هي الحلقة:

```bash
for i in {1..10}; do npx playwright test --project=authenticated tests/rate-book.spec.ts || break; done
```

إن خرج أي تكرار بقيمة غير صفرية، فالاختبار ما زال متذبذبًا. والسبب الأكثر شيوعًا في هذه المرحلة مشكلة زرع—إما أن `resetShelfContent` لم تعِد الضبط كاملًا، أو أن عنوان الكتاب لا يطابق التعبير النمطي. افحص دالة الزرع المساعدة أولًا.

ولفحص الزمن الجداري:

```bash
time npx playwright test --project=authenticated tests/rate-book.spec.ts
```

الاختبار الأصلي، بما فيه من 4.5 ثوانٍ من نداءات `waitForTimeout`، يسجّل عادة نحو 8-10 ثوانٍ. أما النسخة المحصّنة فتنتهي عادة في أقل من 5 ثوانٍ، وأحيانًا في أقل من 3. وتعتمد الأرقام الدقيقة على آلتك، لكن الفرق ينبغي أن يكون واضحًا.

## تسلسل الإيداعات

ينبغي أن يُظهر سجل git لديك أربعة إيداعات على الأقل، يعالج كل واحد منها نمطًا واحدًا:

1. **مصادقة حالة التخزين** — احذف كتلة تسجيل الدخول، واربط `tests/authentication.setup.ts`، وتحقّق من أن الاختبار ما زال يصل إلى `/shelf`.
2. **الزرع الحتمي** — أضف `resetShelfContent` في `beforeEach`، وتحقّق من وجود الكتاب قبل التفاعل معه.
3. **المحددات الدلالية** — استبدل كل محدد CSS بـ`getByRole`/`getByLabel`/`getByText`، وحدد النطاق بعنوان الكتاب.
4. **انتظارات حقيقية** — استبدل كل `waitForTimeout` بـ`toBeVisible()` أو `waitForResponse`، وبدّل `textContent` + `toContain` بتأكيدات تعيد المحاولة تلقائيًا.

ينبغي أن يترك كل إيداع الاختبار ناجحًا. وإن كسر إيداعٌ الاختبار، فقد أخطأت الترتيب—حاولت على الأرجح إزالة `waitForTimeout` قبل إصلاح المحدد الذي كان يعوّض عنه. اعمل من الأعلى إلى الأسفل.

## أنماط تأخذها معك

- **المصادقة بنية تحتية، لا شيفرة اختبار.** حالة التخزين تعمل مرة واحدة، وتستفيد منها المجموعة كلها.
- **الزرع هو العقد بين اختبارك وقاعدة بياناتك.** إن لم تزرع، فأنت تختبر «أي شيء تصادف وجوده»، وهذا تعبير آخر عن «لا شيء بعينه».
- **المحددات الدلالية أكثر استقرارًا من محددات CSS *وهي* تأكيدات وصول مجانًا.** فإن توقف `getByRole('button', { name: 'Rate this book' })` عن العمل، فإما أن الزر فقد اسمه المتاح للوصول أو أن الاسم المتاح تغيّر. وكلاهما عيب يستحق الالتقاط.
- **التأكيد هو الانتظار.** لـ`toBeVisible()` و`toHaveText()` و`waitForResponse` منطق إعادة محاولة مدمج. وإضافة `waitForTimeout` فوقها دفع مرتين مقابل الشيء نفسه—إلا أن نسخة المهلة أبطأ *وأقل* موثوقية.

## قراءات إضافية

- [مختبر: تحصين اختبار تقييم الكتاب المتذبذب](https://stevekinney.com/courses/self-testing-ai-agents/lab-harden-the-flaky-rate-book-test)
- [حكاية الانتظار](https://stevekinney.com/courses/self-testing-ai-agents/the-waiting-story)
- [المصادقة بحالة التخزين](https://stevekinney.com/courses/self-testing-ai-agents/storage-state-authentication)
- [الحالة الحتمية وعزل الاختبار](https://stevekinney.com/courses/self-testing-ai-agents/deterministic-state-and-test-isolation)
- [اختبارات API وUI الهجينة](https://stevekinney.com/courses/self-testing-ai-agents/api-and-ui-hybrid-tests)
