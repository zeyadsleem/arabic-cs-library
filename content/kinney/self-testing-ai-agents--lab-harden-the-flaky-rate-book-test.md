---
title: "مختبر: تحصين اختبار تقييم الكتاب المتذبذب"
lang: ar
source: "https://stevekinney.com/courses/self-testing-ai-agents/lab-harden-the-flaky-rate-book-test"
---

حان وقت صرف الشيكات من الدروس القليلة الماضية. فنسخة Shelf الانطلاقية لا تشحن `tests/rate-book.spec.ts`. ومهمتك في هذا المختبر أن *تبني* ذلك الملف بيدك من النسخة الخشنة عمدًا أدناه، وتربط فيه المصادقة وبيانات الزرع والمحددات وأنماط الانتظار أثناء تقدّمك، كي يستقرّ كل نمط من أنماط درع Playwright في أصابعك لا في عينيك فقط.

النسخة الخشنة تعمل. نوعًا ما. إنها تنجح إلى أن تصبح الآلة أبطأ، أو تنزاح المحددات، أو تتوقف حالة قاعدة البيانات عن مطابقة افتراضاتك. وهي تجمع كل نمط مضاد في Playwright في ملف قصير واحد، ما يجعلها مكانًا رائعًا لتحصين الحلقة كلها.

> **ما تمنحك إياه النسخة الانطلاقية الدنيا وما لا تمنحك إياه**
>
> تمنحك النسخة الانطلاقية الحالية ملف `playwright.config.ts` صغيرًا واحدًا، وحلقة الدخان العامة في `tests/smoke.spec.ts`، وملفات بيانات الزرع تحت `tests/data/`، والدوال المساعدة المنخفضة المستوى للإنشاء والحذف تحت `src/lib/server/`. وهي **لا** تشحن مصادقة حالة التخزين، ولا مشروع Playwright مُوثَّقًا، ولا ملف `tests/helpers/seed.ts` مكتملًا. هذا المختبر هو حيث تصبح تلك القطع حقيقية.

مهمتك إصلاحه. وكل نمط تعلّمناه في دروس Playwright ينطبق هنا.

## نقطة البداية

```typescript
import { test, expect } from '@playwright/test';

test('user can rate a book', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name=email]', 'alice@example.com');
  await page.fill('[name=password]', 'password123');
  await page.click('button[type=submit]');
  await page.waitForTimeout(1000);

  await page.goto('/shelf');
  await page.waitForTimeout(2000);
  await page.locator('.book-card button.rate').first().click();

  await page.locator('.rating-modal .star[data-value="4"]').click();
  await page.locator('.rating-modal button.submit').click();
  await page.waitForTimeout(1500);

  const toast = await page.locator('.toast').textContent();
  expect(toast).toContain('Thanks');
});
```

عُدّ المشكلات. أنا أعدّ ثمانيًا. انظر إن كان بوسعك إيجاد المزيد.

- تسجيل دخول عبر الواجهة في أعلى كل اختبار.
- ثلاثة نداءات `waitForTimeout` بثلاثة أرقام سحرية مختلفة.
- محددات CSS في كل مكان.
- `.locator(...)` متسلسلة بمحددات مركّبة ستنكسر حين يمسّ أي أحد أسماء الفئات.
- `.first()` للتعامل مع وجود أكثر من `.book-card`، بدلًا من تحديد نطاق كتاب معين.
- `textContent()` تُقرأ في متغيّر وتُؤكَّد بـ`.toContain`، متجاوزة إعادة المحاولة التلقائية في Playwright.
- لا زرع، فيعتمد الاختبار على ما تصادف أن تحتويه قاعدة البيانات.
- لا محاكاة شبكة، فيصيب طلب POST للتقييم نقطة نهاية API حقيقية وتكون الاستجابة بطيئة أحيانًا.

## المهمة

أعد كتابة الاختبار بحيث ينجح في كل تشغيل على حاسوب محمول سريع وآلة CI بطيئة معًا. وينبغي أن تنتهي بتطبيق ما يلي كحدّ أدنى:

1. المصادقة بحالة التخزين (بلا تسجيل دخول عبر الواجهة).
2. الزرع (الكتاب موجود في قاعدة البيانات قبل تشغيل الاختبار).
3. محددات `getByRole` مع تسلسل محدّد النطاق.
4. تأكيدات `expect` بإعادة محاولة تلقائية بدلًا من `textContent` + `toContain`.
5. `page.waitForResponse` لطلب POST الخاص بالتقييم، لا مهلة.
6. صفر نداءات `waitForTimeout` في أي مكان في الملف.

قد تريد أيضًا استخدام تجهيزة `request` للتحقّق من أن التقييم وصل فعلًا إلى قاعدة البيانات، كتأكيد ثانٍ فوق فحص الواجهة.

## الترتيب المقترح للهجوم

اعمل من الأعلى إلى الأسفل. أصلح نمطًا واحدًا، شغّل الاختبار، ثم امضِ.

ابدأ بإنشاء `tests/authentication.setup.ts` وربط `playwright.config.ts` ليستخدمه عبر مشروع `setup` زائد مشروع `authenticated`. واحذف كتلة تسجيل الدخول من الاختبار. في نسخة Shelf الانطلاقية الحالية، الإعداد المستقر تسجيل دخول يقوده المتصفح في مشروع setup: انتقل إلى `/login`، واملأ النموذج عبر الصفحة، واحفظ الحالة بـ`page.context().storageState(...)`. شغّل الإعداد مرة واحدة لتتأكد من أن المصادقة تعمل. ثم التزم. (راجع درس المصادقة بحالة التخزين للنمط الكامل.)

بعد ذلك، نفّذ `tests/helpers/seed.ts` كي يكون الكتاب الذي ستقيّمه في قاعدة البيانات قبل تشغيل الاختبار. ابنِه من `tests/data/*.json` زائد دوال الإنشاء والحذف الصغيرة في `src/lib/server` التي تشحنها النسخة الانطلاقية. واحذف أي اعتماد على «ما هو موجود على الرف أصلًا». ثم التزم.

ثم أنشئ `tests/rate-book.spec.ts` من النسخة الخشنة أدناه، لكن شغّله تحت مشروع `authenticated` الجديد بدلًا من تسجيل الدخول داخل الاختبار. وحين يوجد الملف، استبدل محددات CSS بسلاسل `getByRole`. حدّد النطاق بعنوان الكتاب، ثم باسم الزر داخل الكتاب. شغّل الاختبار محليًا بضع مرات. ثم التزم.

بعد ذلك، استبدل كل `waitForTimeout` إما بتأكيد `expect(locator).toBeVisible()` أو بـ`page.waitForResponse` على طلب POST للتقييم. احذف نمط `textContent` + `toContain` واستخدم `expect(toast).toHaveText(/Thanks/)` بدلًا منه. ثم التزم.

أخيرًا، أضف تأكيدًا ثانيًا باستخدام `request.get('/api/shelf/...')` للتحقّق من أن التقييم محفوظ فعلًا. هذا ليس مطلوبًا بصرامة، لكنه نوع الفحص الهجين الذي يلتقط أخطاء «الواجهة تقول نجاح لكن قاعدة البيانات تعترض». ثم التزم.

## معايير القبول

- `rg "waitForTimeout" tests/rate-book.spec.ts` لا يعيد شيئًا.
- `rg "page.locator\(" tests/rate-book.spec.ts` لا يعيد شيئًا.
- `rg "page.goto\('/login'\)" tests/rate-book.spec.ts` لا يعيد شيئًا.
- `rg "page.fill\(\[name=" tests/rate-book.spec.ts` لا يعيد شيئًا.
- ينجح الاختبار عشر مرات متتالية: `for i in {1..10}; do npx playwright test tests/rate-book.spec.ts --project=authenticated || break; done` ولا تخرج أي تكرار بقيمة غير صفرية.
- ينجح الاختبار مع رسم مشاريع Playwright الذي بنيته في هذا المختبر: setup ينشئ حالة التخزين، ومواصفات authenticated تعيد استخدامها، ولم يعد الاختبار يعتمد على تسجيل دخول عبر الواجهة.
- انخفض الزمن الجداري للمجموعة لـ`rate-book.spec.ts` مقارنة بالأساس. قِس بـ`time npx playwright test tests/rate-book.spec.ts --project=authenticated` قبل وبعد. وسجّل الرقمين في رسالة الالتزام.
- `npx playwright test tests/rate-book.spec.ts --project=authenticated --grep="can rate"` يكتمل في أقل من 5 ثوانٍ على آلتك حين تعيد Playwright استخدام خادم محلي قيد التشغيل أصلًا.
- يُظهر سجل الالتزامات تقسيم العمل إلى أربعة التزامات على الأقل، يعالج كل واحد منها نمطًا واحدًا (المصادقة، الزرع، المحددات، الانتظارات).

## أهداف إضافية

إن انتهيت مبكرًا، اختر واحدًا أو أكثر:

- أضف اختبارًا ثانيًا في الملف نفسه يتحقّق من أن المستخدم *لا يستطيع* تقييم كتاب لم يضفه إلى رفه بعد. استخدم تجهيزة `request` أو دوالك المساعدة على الخادم لإعداد السيناريو (الكتاب موجود، والمستخدم لم يضفه) وأكّد أن زر التقييم معطّل.
- استبدل فحص الحفظ الأخير بـ`expect.poll()` كي يُقرأ الاختبار كـ«انتظر حتى توافق الواجهة الخلفية»، لا «أطلق طلبًا واحدًا وارجُ أن الكتابة وصلت أصلًا». ثم أعد كتابة الفحص نفسه مرة بـ`expect(async () => { ... }).toPass({ timeout: ... })` كي تشعر بالفرق بين إعادة محاولة قيمة واحدة وإعادة محاولة كتلة تأكيد كاملة.
- كتجربة قصيرة، جرّب استبدال تسجيل الدخول الذي يقوده المتصفح في `authentication.setup.ts` باختصار مباشر من جانب الخادم إن كانت كومة المصادقة لديك تكشف واحدًا. تأكّد من أن الاختبارات ما زالت تنجح. ثم فكّر في المقايضة: الاختصار أسرع، لكنك تخسر اختبار الدخان الضمني على نموذج تسجيل الدخول.
- شغّل الاختبار بـ`--repeat-each=50` وانظر إن كان شيء يتذبذب تحت الحمل.
- أطفئ `fullyParallel` وانظر إن كان الاختبار ما زال ينجح. (ينبغي أن ينجح. وإن لم يفعل، فلديك تسرّب زرع — أصلحه.)
- أضف تجربة برمجية وسيطة للمسارات قبل النقر على التقييم: مسار عريض واحد ينادي `route.fallback()` لكل شيء عدا طلبات `POST` ويختم تلك بترويسة `x-test-mode: 1`، ثم مسار أضيق `**/api/**` يستخدم `route.fetch({ maxRetries: 2 })` ويستوفي استجابة JSON مرقّعة. تأكّد من أن ترتيب السلسلة يفعل ما تظنه.
- أضف مواصفة أخرى تمارس سير بحث مدعومًا بـOpen Library، ثم سجّل لها HAR باستخدام نمط متغيّر البيئة `UPDATE_HARS` من درس [مقاربات تسجيل HAR](https://stevekinney.com/courses/self-testing-ai-agents/approaches-to-har-recording). التزم بـHAR وتحقّق من أن الاختبار ينجح في وضع الإعادة على واي فاي الطائرة — أو على الأقل مع فصل كبل الشبكة.

## حالة نهاية ناجحة

تنتهي نسخة Shelf الانطلاقية المحصّنة بإشعار toast صريح وتقييم محفوظ بعد أن ينقر الاختبار عبر النافذة المنبثقة. قد يختلف تنسيقك الدقيق، لكن حالة النجاح ينبغي أن تبدو هكذا:

![تدفّق تقييم الكتاب المحصّن يعرض إشعار النجاح المحفوظ وملخّص الرف المحدّث](/images/kinney/1c9239e1fa5fda41.webp)

## كيف يبدو هذا أمام وكيل حقيقي

السؤال المثير ليس إن كنت تستطيع تحصين هذا الاختبار — فقد فعلته للتو. السؤال المثير هو إن كان وكيل يستطيع فعل ذلك مع السياق الصحيح. وإليك كيف يبدو ذلك مع `CLAUDE.md` المحمّل بالقواعد من [مختبر: أعد كتابة CLAUDE.md السيئ](https://stevekinney.com/courses/self-testing-ai-agents/lab-rewrite-the-bad-claude-md) في مكانه.

أعِد النسخة المكسورة من `tests/rate-book.spec.ts` — تلك التي فيها تسجيل دخول عبر الواجهة و`waitForTimeout` ومحددات CSS. وأعطِ Claude Code هذه المطالبة:

> `tests/rate-book.spec.ts` متذبذب. حصّنه باتباع القواعد في CLAUDE.md.

جلسة نموذجية:

```
Reading CLAUDE.md...

The Playwright locator rules and waiting rules are both explicit:
- getByRole first, data-testid only as a last resort
- no waitForTimeout, no waitForLoadState('networkidle')
- login runs in authentication.setup.ts, specs inherit storage state
- specs reset with resetShelfContent, not by hitting /login

Reading the current rate-book.spec.ts... counting violations:
  1. page.goto('/login') + page.fill('[name=email]') — forbidden per
     the auth rule, should use the setup/authenticated project flow
  2. page.waitForTimeout(1000) × 3 — forbidden per the waiting rule
  3. page.locator('.book-card button.rate') — raw CSS, forbidden per
     the locator rule
  4. page.locator('.rating-modal .star[data-value="4"]') — same
  5. textContent().toContain() — bypasses auto-retry; should be
     expect(toast).toHaveText(...)
  6. No seed call, so the test depends on whatever the database has

Fix 1: delete the login block. The authenticated project already
inherits storage state from authentication.setup.ts.

Fix 2: call resetShelfContent at the top of the test so Station Eleven
is guaranteed to be on the shelf.

Fix 3: replace the click chain with scoped role locators:
  const stationEleven = page.getByRole('article', { name: /Station Eleven/ });
  await stationEleven.getByRole('button', { name: /Rate this book/ }).click();

Fix 4: replace the star click with getByLabel:
  await page.getByLabel('4 stars').check();
  await page.getByRole('button', { name: 'Save rating' }).click();

Fix 5: replace the toast check with auto-retry:
  await expect(page.getByRole('status')).toHaveText(/Thanks/);

Fix 6: every waitForTimeout is now unnecessary because the assertions
above auto-retry. Delete all three.

Running npm run test --grep "rate a book"...
  → 1 passed (412ms). That's the whole suite.

Hardened. Every acceptance criterion from the lab hits zero.
```

قارن هذا بما يفعله *الوكيل نفسه* بـ`CLAUDE.md` فارغ: ما زال يصلح التذبذب، لكنه يصلح الأعراض واحدًا واحدًا — يلفّ `waitForTimeout` في إعادة محاولة، ويضيف `.first()` لفضّ التباس المحددات — دون أن يراجع أي مجموعة قواعد قط. والنتيجة اختبار ينجح معظم الوقت ويتذبذب أحيانًا، وهذا أسوأ بصرامة من النسخة التي بدأت بها لأن التذبذب صار مخفيًا.

الفرق بين الجلستين هو الفرق بين «اتبع دليل لعب» و«ارتجل من رسائل الخطأ». ودليل اللعب هو `CLAUDE.md`. إن استطعت قراءة النص أعلاه والتعرّف على كل قرار اتخذه الوكيل، فقد انتهيت — القواعد صارت في أصابعك.

## الشيء الوحيد الذي يجب تذكّره

كل نمط مضاد في ملف البداية قابل للإصلاح منفردًا في أقل من خمس دقائق بالنمط الصحيح. وما جعل الاختبار الأصلي سيئًا لم يكن خطأ واحدًا — بل غياب إطار للتفكير في الاختبارات. وكانت دروس Playwright ذلك الإطار. وهذا المختبر هو حيث يصبح ذاكرة عضلية.

## قراءات إضافية

- [الحل](https://stevekinney.com/courses/self-testing-ai-agents/harden-the-flaky-rate-book-test-solution)
- [حكاية الانتظار](https://stevekinney.com/courses/self-testing-ai-agents/the-waiting-story)
- [المصادقة بحالة التخزين](https://stevekinney.com/courses/self-testing-ai-agents/storage-state-authentication)
- [الحالة الحتمية وعزل الاختبار](https://stevekinney.com/courses/self-testing-ai-agents/deterministic-state-and-test-isolation)
- [اختبارات API وUI الهجينة](https://stevekinney.com/courses/self-testing-ai-agents/api-and-ui-hybrid-tests)
