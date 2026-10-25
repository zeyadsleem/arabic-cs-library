---
title: "اختبارات API والواجهة المدمجة"
---

هذا نمط لم أكن أعرفه في أول سنتين من استخدامي Playwright، وما زلت منزعجًا منه قليلًا.

تحصل اختبارات Playwright على [`request` fixture](https://playwright.dev/docs/api-testing) إلى جانب `page`. وهو عميل HTTP كامل، له عنوان القاعدة وسياق المصادقة نفسيهما اللذين للمتصفح، ويمكنك استخدامه لتهيئة الحالة أو التأكيد عليها حين كان ذلك يتطلّب خلاف ذلك النقر عبر ست صفحات من الواجهة. والتوليفة — التهيئة عبر API، والفعل والتأكيد عبر الواجهة — هي ما أسمّيه اختبارًا مدمجًا، وهي الافتراضي الصحيح لـ80% من اختبارات الطرف إلى الطرف متى رأيتها.

ولننظر في السبب.

## الاختبار الذي يفعل أكثر من اللازم

كثيرًا ما يبدأ اختبار طرف إلى طرف كلاسيكي لـ«يستطيع المستخدم رؤية إحصاءات رفّه» على هذا النحو:

```typescript
test('shelf stats show total books read', async ({ page }) => {
  // Add five books through the UI
  for (const title of ['A', 'B', 'C', 'D', 'E']) {
    await page.goto('/search?q=' + title);
    await page.getByRole('button', { name: 'Add to shelf' }).click();
    await page.getByRole('button', { name: 'Mark as read' }).click();
  }

  // Now check the stats page
  await page.goto('/stats');
  await expect(page.getByText('Books read: 5')).toBeVisible();
});
```

هذا الاختبار عن صفحة الإحصاءات، لكن معظمه تهيئة للكتب. فكل تكرار في الحلقة رحلة ذهاب وعودة كاملة في المتصفح. والاختبار بطيء، وهو يغطّي سلوكًا مُختبَرًا بالفعل في اختبارات *أخرى* (إضافة الكتب، والوسم كمنتهٍ)، وإن تغيّر أي من تلك الواجهة انكسر هذا الاختبار لأسباب لا علاقة لها بالإحصاءات.

هذا نمط مضاد شائع: اختبار الطرف إلى الطرف الذي يصبح، على غير قصد، اختبار تكامل لكل ميزة يمسّها أثناء التهيئة.

## النسخة المدمجة

```typescript
test('shelf stats show total books read', async ({ page, request }) => {
  // Seed five finished books via the API
  for (const openLibraryId of ['OL1', 'OL2', 'OL3', 'OL4', 'OL5']) {
    await request.post('/api/shelf', {
      data: { openLibraryId, status: 'finished' },
    });
  }

  // Now check the stats page
  await page.goto('/stats');
  await expect(page.getByText('Books read: 5')).toBeVisible();
});
```

التهيئة هنا استدعاءات API. أما التأكيد فما زال متصفحًا حقيقيًا يتنقّل في صفحة حقيقية. والاختبار الآن أسرع بثلاث مرات، وأنصف طولًا، و— وهذا الأهم — لا يختبر *إلا* صفحة الإحصاءات. فإن انكسرت واجهة «إضافة كتاب»، بقي هذا الاختبار ناجحًا، لأن هذا الاختبار ليس عن إضافة الكتب. والاختبار الخاص بإضافة الكتب هو الذي ينكسر، كما ينبغي.

يُصادِق `request` fixture تلقائيًا بحالة التخزين التي يستخدمها مشروع الاختبار، فلا تحتاج إلى إرفاق كوكيز أو رموز. وهذا هو مغزى الـ fixture كلّه مقابل استخدام `fetch` الخام.

وهو يرث أيضًا تهيئة Playwright التي كتبتها بالفعل. وتشير [وثائق اختبار API](https://playwright.dev/docs/api-testing) إلى أن `request` fixture المدمج يحترم أشياء مثل `baseURL` والترويسات الإضافية من التهيئة. فإذا كان مشروع اختبارك يعرف أين يعيش التطبيق وأي حالة مصادقة يحملها، فعميل API يعرف ذلك أيضًا. ولا تُعِد بناء تلك التهيئة بيدك إلا إذا كنت تنشئ فاعلًا ثانيًا عن قصد.

في Shelf، تصل النسخة الملموسة من هذا النمط في مسار مختبر تقييم الكتاب. فتضيف `tests/authentication.setup.ts`، وتبني دالة الزرع الحتمية في `tests/helpers/seed.ts`، ثم تنشئ `tests/rate-book.spec.ts` تحت المشروع الموثّق بالمصادقة. ومغزى المختبر المرافق هو نفسه الذي يقرّره هذا الدرس: انتظر إشارة الشبكة الحقيقية بـ `page.waitForResponse`، لا مهلة تأمل أن تكون طويلة بما يكفي.

## متى تستخدم API ومتى تستخدم الواجهة

الدليل الاستدلالي الذي أستخدمه:

- **التهيئة**: API. فأنت تبني سيناريو، والمتصفح هنا مبالغة.
- **الفعل موضوع الاختبار**: الواجهة. فأنت تختبر حرفيًا أن الزر يعمل.
- **التفكيك**: API أو لا شيء (اعتمد على الزرع/العزل من الدرس السابق).
- **التحقّق من الأثر الجانبي**: أيّهما. فإن احتجت أن تعرف أن قاعدة البيانات سجّلت كتابة فعلًا، فطلب GET عبر API أرخص وأدقّ من الانتقال إلى صفحة وقراءة نص. وإن احتجت أن تعرف أن مستخدمًا حقيقيًا سيرى التغيير، فالواجهة.

الفخّ هو أن تمتدّ يدك إلى الواجهة حين تكفي API. ونادرًا ما رأيت الخطأ المعاكس — فالوكلاء يمتدّون إلى الواجهة افتراضيًا لأن هكذا «تبدو» اختبارات Playwright في الأمثلة. وملف تعليماتك عليه أن يخبرهم صراحةً أن هناك خيارًا آخر.

وثمة طريقة جيدة أخرى للتفكير في الانقسام:

- **شروط API المسبقة** تخلق العالم الذي يحتاجه الاختبار
- **أفعال الواجهة** تُمارس السلوك الذي يملكه المستخدم
- **شروط API اللاحقة** تتحقّق من الأثر الجانبي إن كان ذلك أرخص أو أدقّ من قراءة صفحة أخرى

هذا النمط يمنحك تهيئة سريعة، وسلوكًا حقيقيًا، وفحصًا مزدوجًا رخيصًا للحفظ الدائم، دون أن تحوّل كل اختبار إلى تمثيل صامت في المتصفح.

## مثال أعقد: هيّئ السيناريو، وأكّد النتيجة

في Shelf ميزة أن إنهاء كتاب يحدّث عدّاد «قيد القراءة حاليًا» في صفحة الرفّ. ولنختبر ذلك.

```typescript
test('finishing a book updates the currently-reading counter', async ({ page, request }) => {
  // Set up: alice has two books currently reading
  await request.post('/api/shelf', {
    data: { openLibraryId: 'OL1', status: 'reading' },
  });
  await request.post('/api/shelf', {
    data: { openLibraryId: 'OL2', status: 'reading' },
  });

  // Check the counter
  await page.goto('/shelf');
  await expect(page.getByText('Currently reading: 2')).toBeVisible();

  // Finish one via the UI—this is the actual action under test
  await page.goto('/shelf');
  await page
    .getByRole('article', { name: /Station Eleven/ })
    .getByRole('button', { name: 'Mark as read' })
    .click();

  // Counter should decrement
  await page.goto('/shelf');
  await expect(page.getByText('Currently reading: 1')).toBeVisible();
});
```

الشكل هو: تهيئة عبر API، وفعل عبر الواجهة، وتأكيد عبر الواجهة. التهيئة رخيصة وحتمية. والفعل هو ما يهمّنا فعلًا. والتأكيد هو ما سيراه المستخدم. ولا شيء يضيع هباءً.

قارن هذا بالنسخة القائمة على الواجهة بالكامل، حيث إضافة كتابين عبر صفحة البحث، والنقر على «ابدأ القراءة» في كل منهما، والعودة إلى الصفحة الرئيسية، كانت ستستغرق ثانيتين إضافيتين من الزمن الحقيقي وعشرات الأسطر الإضافية من الشيفرة. وفي اختبار ليس عن البحث ولا عن بدء القراءة، لا شيء من تلك التهيئة يستحقّ كلفته.

## استخدام `request` كاختبار دخان لـ API نفسه

ثمة أثر جانبي لطيف: يمكنك استخدام `request` fixture لكتابة اختبارات API سريعة لنقاط النهاية التي ليس لها اختبار وحدة مخصّص. وهذا ليس نمطًا مدمجًا بالمعنى الدقيق — إنه API خالص — لكنه يعيش في الملف نفسه ويستخدم سياق المصادقة نفسه:

```typescript
test('POST /api/shelf creates an entry', async ({ request }) => {
  const response = await request.post('/api/shelf', {
    data: { openLibraryId: 'OL1', status: 'reading' },
  });
  expect(response.status()).toBe(201);

  const body = await response.json();
  expect(body.status).toBe('reading');
});
```

بلا متصفح، وبلا واجهة، مجرّد تأكيد HTTP. وهذه تعمل في حدود عشرات الميلي ثانية وتملأ فجوة التغطية بين اختبارات الوحدة واختبارات الطرف إلى الطرف الكاملة. وهي أيضًا اختبارات دخان ممتازة في أعلى ملف الاختبار — فإن كان عقد API مكسورًا، أفشِل سريعًا قبل أن تحاول بقية الاختبارات تهيئة الحالة عبره.

## كوكيز المتصفح يمكن أن تسري عبر عميل API أيضًا

عندما تنشئ سياقات بيدك، ثمة نمط آخر يجدر معرفته من الوثائق: [`browserContext.request`](https://playwright.dev/docs/api-testing) يشارك الكوكيز مع سياق المتصفح. فسجّل الدخول عبر الصفحة، واستدعِ API عبر `browserContext.request`، فتسري الجلسة في الاتجاهين.

وهذا أنظف من نسخ ترويسات الكوكيز يدويًا، وأصدق من التظاهر بأن المتصفح وعميل API فاعلان غير مرتبطين وهما في الحقيقة المستخدم نفسه.

## المأزق: المخطّطات المنزاحة

من مخاطر التهيئة عبر API أن الاختبار يتجاوز أي تحقّق تجريه الواجهة. فإن كان للنموذج الحقيقي فحص من نوع «لا يمكنك إضافة كتاب إلا إذا كنت مسجّل الدخول ولم تتجاوز حدّ 500 كتاب»، فقد يتجاوز استدعاء API فحص الـ500 كتاب ويضع اختبارك في حالة مستحيلة. وهذا عادةً ميزة — فهو يتيح لك تهيئة حالات حدّية لا تستطيع الواجهة الوصول إليها — لكنه يخفي أحيانًا خطأً حقيقيًا.

والضمانة أن يكون في API التحقّق نفسه الذي في النموذج. وهذا تصميم خادم جيد على أي حال. فإن كان API يتيح للاختبار فعل أشياء لا تفعلها الواجهة، فلديك مشكلة أكبر من مجموعة اختباراتك.

## قواعد الوكيل

```markdown
## Hybrid API+UI tests

- Use the `request` fixture for scenario setup whenever the UI for that
  setup is already tested elsewhere. Don't click through "add book" in
  a test whose subject is the stats page.
- Treat API setup as preconditions and API reads as postconditions. Use
  them to make the test smaller, not to dodge the UI you are claiming to test.
- The action under test is always performed through the UI. If the
  test's purpose is "clicking X causes Y," do not short-circuit the
  click with an API call.
- Both `page` and `request` share the same authentication context from
  `storageState`. You do not need to attach tokens manually.
- The built-in `request` fixture already inherits Playwright config such
  as `baseURL` and default headers. Do not reconfigure it by hand unless
  you are intentionally creating a second actor.
- If you need pure API tests for an endpoint, put them in the same test
  file as the UI tests for that endpoint, using the same `request`
  fixture and no `page`.
```

## الشيء الوحيد الذي يجب تذكّره

أسرع اختبار هو الذي يتخطّى العمل الذي لا يقيسه. استخدم API للتهيئة، والواجهة للشيء الذي تختبره فعلًا، ولا تخلط بينهما. فمعظم اختبارات الطرف إلى الطرف في معظم قواعد الشيفرة أبطأ وأكثر تذبذبًا مما ينبغي، لأن التهيئة تتنكّر في هيئة موضوع الاختبار.

## قراءات إضافية

- [الحالة الحتمية وعزل الاختبارات](https://stevekinney.com/courses/self-testing-ai-agents/deterministic-state-and-test-isolation)
- [مختبر: حصّن اختبار تقييم الكتاب المتذبذب](https://stevekinney.com/courses/self-testing-ai-agents/lab-harden-the-flaky-rate-book-test)
