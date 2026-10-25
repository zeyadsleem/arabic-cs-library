---
title: "تسجيل ملفات HAR لعزل الشبكة"
lang: ar
source: "https://stevekinney.com/courses/self-testing-ai-agents/recording-hars-for-network-isolation"
---

يتحدّث Shelf إلى [واجهة Open Library البرمجية](https://openlibrary.org/developers/api) للبحث عن الكتب. إنها خدمة مجانية رائعة — وهي أيضًا ليست شيئًا أريد أن تعتمد عليه مجموعة اختباراتي من طرف إلى طرف.

وها هي المشكلة. يشغّل خط CI اختبارًا يبحث عن «Station Eleven» عبر واجهة Open Library الحقيقية. في معظم الأيام ينجح. وفي بعض الأيام يكونون بطيئين، أو يغيّرون شكل الاستجابة، أو يحدّون من معدّل طلباتك. فيتحوّل فرع `main` إلى الأحمر ويقضي فريقك عشرين دقيقة ليكتشف أن العطل ليس في شيفرتك — بل في خادم شخص آخر.

الحل هو التوقّف عن مخاطبة الخادم الحقيقي في الاختبارات وإعادة تشغيل تسجيل بدلًا من ذلك. لدى Playwright أداة مدمجة لهذا — تسجيل HAR — وهي واحدة من أكثر ميزات الإطار إهمالًا.

## ما هو ملف HAR

HAR اختصار HTTP Archive. وهو صيغة JSON — معيارية، وإن كان كل أداة يضيف نكهته الخاصة (يضمّن Chrome توقيتات الصفحة، وتخزّن Playwright أجسام الاستجابات مفكوكة الترميز) — تسجّل جلسة HTTP كاملة. والبنية الجوهرية واحدة في كل مكان: `log.entries[]`، حيث تحمل كل مدخلة زوج طلب/استجابة واحدًا مع الـ URL والطريقة والترويسات والجسم والتوقيت. يستطيع Chrome DevTools تصدير واحد. وتستطيع Playwright تسجيلها وإعادة تشغيلها معًا.

الـ HAR المسجّل هو لقطة لما *فعلته* الشبكة فعلًا خلال جلسة متصفح واحدة. وحين تعيد تشغيله، تعترض Playwright الطلبات الصادرة وتقدّم الاستجابة المسجّلة المطابقة بدلًا من ترك الطلب يصل إلى الشبكة الحقيقية. ولا يستطيع المتصفح التمييز بين الاثنين.

## التسجيل

تسجّل ملف HAR بتشغيل اختبار (أو سكربت) في وضع التسجيل. الواجهة المفضّلة في Playwright هي [`page.routeFromHAR`](https://playwright.dev/docs/mock#mocking-with-har-files) مع `update: true`. ومسار `tests/fixtures/` أدناه هو الاصطلاح الذي تتبنّاه هذه الدورة لملفات HAR الثابتة؛ وهو ليس مجلدًا يأتي مع نسخة Shelf الانطلاقية، لذا ستنشئه أول مرة تسجّل فيها.

```typescript
test('search for books', async ({ page }) => {
  await page.routeFromHAR('tests/fixtures/open-library-search.har', {
    url: '**/openlibrary.org/**',
    update: true, // <-- record mode
  });

  await page.goto('/search');
  await page.getByLabel('Search').fill('Station Eleven');
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page.getByText('Emily St. John Mandel')).toBeVisible();
});
```

يأخذ خيار `url` [نمط glob](https://playwright.dev/docs/network#glob-url-patterns) (`*` يطابق أي شيء عدا `/`، و`**` يطابق أي شيء بما فيه `/`، ويجب أن يطابق الـ glob الـ URL الكامل). وتقبل Playwright أيضًا `RegExp` هنا. أما خيار `update` فهو قيمة منطقية افتراضها `false` (وضع إعادة التشغيل).

شغّل هذا مرة واحدة، مع `update: true`، موجّهًا إلى الـ API الحقيقي. تسجّل Playwright كل طلب مطابق وتكتب ملف HAR إلى `tests/fixtures/open-library-search.har`. افتحه في محرّرك — إنه JSON، وهو ضخم، وعليك أن تقاوم تحريره يدويًا.

وثمّة تفصيل من توثيق [واجهة Page](https://playwright.dev/docs/api/class-page) يهمّ هنا: حين تسجّل مع `update: true`، تكتب Playwright الـ HAR المحدّث عند إغلاق الصفحة أو سياق المتصفح. وإذا قتلت التشغيل مبكرًا، فقد تجد نفسك تتساءل إلى أين ذهب التحديث. والجواب عادة «لم تدع السياق يُغلق بنظافة أبدًا».

وهذا يهمّ أكثر حين تنشئ السياقات يدويًا. أغلق السياق صراحةً قبل أن تغلق المتصفح أو تعلن انتهاء المهمة.

```typescript
const context = await browser.newContext();
const page = await context.newPage();

await page.routeFromHAR('tests/fixtures/open-library-search.har', {
  url: '**/openlibrary.org/**',
  update: true,
});

await page.goto('/search');
// ... drive the recording flow ...

await context.close();
await browser.close();
```

استخدم هذه القاعدة حين «ينجح» تحديث HAR لكن الملف على القرص لا يتغيّر أبدًا، أو حين ينشئ مساعد إضافي سياقات إضافية للنوافذ المنبثقة أو الأدوار البديلة ثم يغلق المتصفح فقط. فـ Playwright تُفرغ تحديث الـ HAR عند تفكيك السياق، لا حسب المزاج.

> **تحذير**
>
> ملفات HAR ثابتة يولّدها الآلة، ببيانات طلب/استجابة متداخلة وملفات أجسام مرفقة اختيارية. والتعديلات اليدوية العابرة هشّة — فمن السهل كسر جسم استجابة أو إبطال مطابقة دون أن تدرك. أتمت التغييرات بسكربت وتحقق دائمًا من إعادة التشغيل بعدها.

أودِع ملف HAR في المستودع. هذا ليس اختياريًا — فالفكرة كلها أن يقرأ الاختبار الـ HAR من القرص في التشغيل التالي ولا يمسّ الشبكة الحقيقية.

> **نصيحة**
>
> ملفات HAR ثابتة اختبارية ومكانها نظام التحكّم بالإصدارات، لكن راجعها قبل الإيداع. فبيانات الاعتماد وكوكيز الجلسة والبيانات الشخصية يمكن أن تختبئ في أجسام الاستجابات والترويسات. راجع [مقاربات تسجيل HAR](https://stevekinney.com/courses/self-testing-ai-agents/approaches-to-har-recording) لإرشادات التنقية، واستخدم مستخدم اختبار مخصصًا (انظر [مصادقة حالة التخزين](https://stevekinney.com/courses/self-testing-ai-agents/storage-state-authentication)) لتقليل ما يحتاج إلى تنقية.

## إعادة التشغيل

احذف الآن سطر `update: true` (أو اضبطه على `false`):

```typescript
test('search for books', async ({ page }) => {
  await page.routeFromHAR('tests/fixtures/open-library-search.har', {
    url: '**/openlibrary.org/**',
    // update omitted—replay mode
  });

  await page.goto('/search');
  await page.getByLabel('Search').fill('Station Eleven');
  await page.getByRole('button', { name: 'Search' }).click();
  await expect(page.getByText('Emily St. John Mandel')).toBeVisible();
});
```

شغّل الاختبار. يعمل في أجزاء من الثانية بدلًا من ثوانٍ. يعمل على متن طائرة. يعمل حين تكون Open Library متوقفة. ويعمل بالطريقة نفسها في كل تشغيل، لأن الاستجابة حرفيًا ملف على القرص.

هذه هي الحتمية كملف — لا حتمية مستمدّة من منطق محاكاة تصونه في الشيفرة، بل من أثر مسجّل على القرص. وهذه هي الخدعة السحرية بأكملها.

## قواعد المطابقة، ولماذا تلدغ

الجزء الذي يُوقِع الناس في الخطأ هو كيف تقرّر Playwright أي استجابة مسجّلة تقدّم. فمطابقة إعادة تشغيل HAR تعتمد على الـ URL وطريقة HTTP اعتمادًا صارمًا. وللطلبات `POST` تطابق أيضًا الحمولة. وإذا طابقت مدخلات متعددة، تختار Playwright المدخلة ذات أكبر عدد من الترويسات المطابقة. ونادرًا ما يهمّ هذا الفاصل في نداءات API — فالـ URL مع الطريقة ينتجان عادة مطابقة واحدة — لكنه يظهر في الطلبات التي يبدأها المتصفح حيث تتشارك المدخلات URL واحدًا وتختلف بـ `Accept` أو `Referer`.

إذا أرسل اختبارك طلبًا إلى `https://openlibrary.org/search.json?q=Station+Eleven` وكان في الـ HAR فقط `...q=Station%20Eleven&limit=10`، فهذا طلب مختلف بقدر ما يخصّ طبقة إعادة التشغيل. وهذا ليس خاصًا بـ Playwright — فـ HTTP يعامل `?a=1&b=2` و`?b=2&a=1` كعنوانين مختلفين.

وهذا ميزة وفخّ في آن واحد.

- إنه ميزة لأن إعادة التشغيل دقيقة — فاختباران يسجّلان استعلامي بحث مختلفين ينتجان مدخلات HAR لا تتصادم أبدًا.
- وإنه فخّ لأن عميل HTTP في تطبيقك قد يرسل طلبات تشبه بعضها ظاهريًا لكنها تختلف في ترويسة أو معامل استعلام ما، فلا يطابقها الـ HAR.

وفيما يلي بضع طرق لجعله أقل حدّة:

**اجعل شكل الطلب حتميًا.** إذا كان غلاف fetch لديك يسلسل معاملات الاستعلام بترتيب مختلف بين تشغيل وآخر، فستخطئ إعادة تشغيلك. أصلح توليد الطلب أولًا — فالـ HAR ليس المكان لتغطية مستدعين غير حتميين.

**أبقِ `notFound: 'abort'` هو الافتراضي.** الخيار `'abort'` (وهو الافتراضي) يقتل الطلبات غير المطابقة فورًا — فيرى المتصفح خطأ شبكة، ويفشل اختبارك بصوت عالٍ. أما `'fallback'` فيتيح للطلبات غير المطابقة المرور إلى معالجات مسارات أخرى ثم إلى الشبكة الحقيقية في النهاية. استخدم `'fallback'` فقط حين تريد أن تكون *بعض* الطلبات حيّة بينما تعيد تشغيل حركة الـ API وحدها.

خيار `'fallback'` ذاك ليس افتراضيًا نظريًا. إنه الطريقة النظيفة لبناء إعداد هجين حيّ ومعاد التشغيل: أعد تشغيل الـ API الذي يهمّك، ودع كل شيء آخر يكمل عبر سلسلة المسارات العادية، وأبقِ الاختبار صريحًا بشأن موضع الحدّ الحيّ.

**سجّل سيناريو واحدًا في المرة.** ملف HAR واحد لكل ملف اختبار، محصور في سيناريو واحد، أسهل في إعادة التوليد والتنقيح حين ينكسر.

**حين ترى «request not found in HAR».** ترمي Playwright هذا الخطأ حين يطابق طلب ما glob الـ `url` لكن لا تطابق أي مدخلة HAR الـ URL الكامل + الطريقة + الحمولة. والأسباب الشائعة: تغيّر ترتيب معامل استعلام، أو ظهرت ترويسة جديدة، أو جسم الطلب مختلف قليلًا. **افحص الفرق أولًا** — قارن ما يرسله الاختبار بما في الـ HAR. شغّل مع `DEBUG=pw:api` لترى الطلب المحدد الذي حاولت Playwright مطابقته. ولا تعد التسجيل إلا بعد أن تفهم *لماذا* تغيّر الطلب.

حين يطلق تطبيقك طلبات متزامنة إلى نقطة النهاية نفسها (مثلًا ثلاثة عمليات fetch متوازية إلى `/api/books/:id`)، تختار Playwright عمومًا مدخلة غير مستخدمة حين تطابق عدة مدخلات HAR الـ URL والطريقة نفسيهما، فيحصل كل طلب متزامن على استجابة مميزة.

> **ملاحظة**
>
> إذا سلسل تطبيقك نداءات API — باستخدام URL من الاستجابة A لإصدار الطلب B — فقد يختلف الـ URL الثاني بين تسجيل وآخر. فالـ URLs الموقّعة، وإعادات التوجيه الحاملة لـ nonce، ومؤشرات ترقيم الصفحات لن تطابق عند إعادة التشغيل. في هذه الحالات، يكون [`page.route`](https://playwright.dev/docs/mock) مع معالج مخصص أداة أفضل من إعادة تشغيل HAR.

> **ملاحظة**
>
> إعادة تشغيل HAR عديمة الحالة — كل طلب يحصل على الاستجابة المسجّلة نفسها بصرف النظر عمّا حدث سابقًا في الاختبار. وإذا كان اختبارك يتوقع أن *تتغيّر* استجابة بناءً على إجراء سابق (أضف كتابًا، ثم اسرد الكتب متوقعًا الكتاب الجديد)، فلن يعكس الـ HAR هذا التطور. وللتدفقات المعتمدة على الحالة، ازرع الحالة المتوقعة قبل الاختبار وسجّل الـ HAR مقابل تلك البذرة المعروفة.

> **تحذير**
>
> تعترض Service Workers طلبات الشبكة *قبل* أن يراها معالج المسار في Playwright. فإذا سجّل تطبيقك Service Worker (شائع في تطبيقات PWA أو حين تثبّت مكتبة واحدًا للتخزين المؤقت)، فإن تلك الطلبات تتجاوز `routeFromHAR` كليًا — إذ تُقدَّم من ذاكرة Service Worker المؤقتة، لا من الـ HAR. اضبط `serviceWorkers: 'block'` في إعداد Playwright حين تعتمد على إعادة تشغيل HAR.

وثمّة تجعيدة أخرى في طبقة المسارات: إذا فتح اختبارك نافذة منبثقة، فإن معالجًا محصورًا بالصفحة (بما فيه `page.routeFromHAR()`) لا يعترض أول طلب في النافذة المنبثقة. فتلك الملاحة الأولى تنتمي إلى سياق المتصفح. وإذا كانت حركة النوافذ المنبثقة جزءًا من التدفق، فسجّل إعادة تشغيل HAR على طبقة `browserContext` بدلًا من طبقة الصفحة.

## تحديث ملفات HAR

تشيخ ملفات HAR. يضيف فريق Open Library حقلًا إلى استجابة البحث، أو يلغي حقلًا كان تطبيقك يقرأه، ولا يعرف الـ HAR القديم بذلك. فينجح الاختبار مقابل التسجيل بينما التطبيق الحقيقي مكسور.

قاعدتي: **أعد التوليد وفق جدول، في CI، في مهمة ليلية.** لا في كل تشغيل — فذلك يهدم الحتمية. المهمة الليلية تستهدف اختبارات HAR وحدها، وتعيد التسجيل مع تعطيل إعادة المحاولات وبمستخدم اختبار مخصص، وتقارن النتائج، وتفتح PR إذا تغيّر أي شيء. ويراجع إنسان الفرق. والإشارة النمطية: حقل جديد أو محذوف في جسم استجابة.

هذه إعادة توليد *مجدولة* لالتقاط انحراف المنبع — لا إعادة تسجيل عند الطلب لإسكات اختبار فاشل. وحين يفشل اختبار لأن الـ HAR لا يطابق، فالسؤال الأول هو *لماذا* تغيّر شكل الطلب. إذا كانت شيفرتك قد غيّرت الطلب، فأصلح الشيفرة أو أعد التسجيل عن قصد. وإذا تغيّرت واجهة API في المنبع، فالمهمة الليلية وُجدت لذلك. فإعادة التسجيل الأعمى تخفي الأخطاء والانحراف معًا.

يعرض [درس التحقّق الليلي](https://stevekinney.com/courses/self-testing-ai-agents/nightly-verification-loops) سير عمل CI لهذا، بما فيه مهمة `har-refresh` النائبة.

## ما ينبغي للوكيل فعله وما لا ينبغي

تسجيل HAR ليس أداة أريد أن يمدّ الوكلاء أيديهم إليها دون طلب. فالتسجيل يتضمن نداءات شبكة حقيقية، وقد تحتوي ملفات HAR على بيانات اعتماد في عدة مواضع: ترويسات الطلب `Authorization` و`Cookie`، وترويسات الاستجابة `Set-Cookie`، وأجسام الطلب أو الاستجابة (تبادلات OAuth، ومعاملات مفاتيح API). عليك تنقيتها.

قاعدة ملف تعليماتي بشأن ملفات HAR:

```markdown
## HAR recording

- HAR files live in `tests/fixtures/` and are replayed via
  `page.routeFromHAR`.
- Never commit a new HAR file without a human reviewing it. HARs can
  contain credentials, session tokens, and private data from third-party
  APIs. Review in the Git diff before committing.
- Do not re-record a HAR to "fix" a failing test. If the HAR no longer
  matches the application's requests, the application changed in a way
  that deserves investigation, not a blind rerecording.
- When a HAR must be regenerated (e.g., because the upstream API
  legitimately changed), regenerate it in a standalone commit so the
  diff is clear.
- If a helper or script creates a manual browser context for HAR
  recording, close that context explicitly so the updated HAR is
  flushed to disk.
- Approved HAR refresh (the nightly CI job or a human-initiated
  re-recording workflow) is different from ad-hoc re-recording to
  silence a failing test. The refresh workflow is expected to change
  HARs; an agent fixing a red test is not.
```

قاعدة «لا تعد التسجيل لإصلاح اختبار فاشل» هي التي ستشكرني عليها. فالوكلاء يعشقون جعل الاختبارات الفاشلة تنجح بإعادة التسجيل. وغالبًا ما يكون ذلك تغطية على خطأ حقيقي.

## حين تكون `page.route` هي الأداة الأفضل

إذا كنت تحتاج فقط إلى محاكاة نقطة نهاية أو نقطتين باستجابات مكتوبة يدويًا، فإعادة تشغيل HAR عادة مبالغة. استخدم [`page.route`](https://playwright.dev/docs/mock) بدلًا من ذلك وأبقِ المحاكاة في الشيفرة.

يغطي الدرس المخصص، [اعتراض الشبكة القائم على المسارات](https://stevekinney.com/courses/self-testing-ai-agents/route-based-network-interception)، متى تستخدم `route.fulfill` و`route.abort` و`route.continue`؛ وكيف يعمل ترتيب المسارات حين يتعايش `page.route` و`page.routeFromHAR`؛ ومتى تكون محاكاة صغيرة صريحة أنظف من HAR مسجّل.

والنسخة القصيرة هي:

- استخدم ملفات HAR حين تريد التقاط شريحة أكبر من الحركة الحقيقية وإعادة تشغيلها.
- استخدم المسارات حين تريد محاكاة صغيرة صريحة أو فشلًا محاكى.
- استخدم [حالة التخزين](https://stevekinney.com/courses/self-testing-ai-agents/storage-state-authentication) للمصادقة، لا إعادة تشغيل HAR.

## الشيء الوحيد الذي يجب تذكّره

يجب ألّا تعتمد مجموعة اختباراتك من طرف إلى طرف على أي خادم لا تتحكم به. فملفات HAR تتيح لك تسجيل الواقع مرة واحدة وإعادة تشغيله إلى الأبد، وهكذا تحصل على اختبارات تنجح على متن طائرة. والثمن مهمة تحديث أسبوعية وقاعدة بأن التسجيل ليس طريقتك في إصلاح الاختبارات الفاشلة. وكلاهما رخيص.

وللتنظيم، أبقِ ملف HAR واحدًا لكل ملف اختبار في `tests/fixtures/`، مسمّى باسم ملف الاختبار الذي يخدمه. وإذا تجاوز حجم الـ HAR بضع مئات من الكيلوبايتات، فقسّم ملف الاختبار كي يغطي كل HAR سيناريو أضيق. ويمكن أن تنمو ملفات HAR الكبيرة (الصور، والبيانات المرقّمة) إلى ميغابايتات — وهي تُضغط جيدًا في git، لكن ذلك إشارة إلى تضييق glob الـ `url`.

## قراءات إضافية

- [مقاربات تسجيل HAR](https://stevekinney.com/courses/self-testing-ai-agents/approaches-to-har-recording)
- [اعتراض الشبكة القائم على المسارات](https://stevekinney.com/courses/self-testing-ai-agents/route-based-network-interception)
- [مصادقة حالة التخزين](https://stevekinney.com/courses/self-testing-ai-agents/storage-state-authentication)
- [الحالة الحتمية وعزل الاختبار](https://stevekinney.com/courses/self-testing-ai-agents/deterministic-state-and-test-isolation)
