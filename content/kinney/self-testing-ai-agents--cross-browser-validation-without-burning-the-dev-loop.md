---
title: "التحقّق عبر المتصفّحات دون إحراق حلقة التطوير"
lang: ar
source: "https://stevekinney.com/courses/self-testing-ai-agents/cross-browser-validation-without-burning-the-dev-loop"
---

الاختبار عبر المتصفّحات من تلك الأفكار التي يوافق عليها الجميع من حيث المبدأ ويتجنّبها الجميع بهدوء في الممارسة، لأنها تهدّد بتحويل كل طلب سحب إلى حالة رهينة.

وهذا لا يحدث إلا إذا استخدمت النطاق الخاطئ.

والعلاج ليس «تجاهل المتصفّحات الأخرى». العلاج هو «أن تقرّر أي الفحوص تنتمي إلى Chromium، وأيّها ينتمي إلى مجموعة دخان صغيرة متعدّدة المتصفّحات، وأيّها ينتمي إلى تغطية ليلية». و[مشاريع Playwright](https://playwright.dev/docs/test-projects) تجعل هذا التقسيم عمليًا.

> **المتطلّبات المسبقة**
>
> يفترض هذا الملحق أن حلقة CI الأساسية قائمة بالفعل. ويبقى Chromium المتصفّح الافتراضي السريع في المسار الرئيسي للورشة. والمتصفّحات الإضافية تنتمي إلى هنا لأنها قيّمة وأغلى كلفةً.

## لماذا تظلّ المتصفّحات الأخرى مهمة

بعض الأخطاء خاصّة بمتصفّح بعينه على نحو رائع:

- اختلاف في معالجة التركيز
- حقول التاريخ وعناصر التحكّم في النماذج تُصيَّر بشكل مختلف
- تخطيط CSS أو التجاوز (overflow) يتصرّف بشكل مختلف قليلًا
- ميزة تعمل في Chromium وتصير غريبة في Firefox
- تشغيل WebKit يكشف المشكلة التي كان مستخدمك على Mac يشتكي منها طوال الوقت

وإن كان جوابك على كل ذلك هو «حسنًا، اختبار Chromium نجح»، فجوابك ليس نافعًا كثيرًا.

## لماذا لا أريد المصفوفة الكاملة عند كل تعديل

لأن معظم التعديلات لا تستحقّها.

فإن كان الوكيل يغيّر إصلاحًا لنصّ واجهة أو إعادة هيكلة صغيرة في الخادم، فانتظار Chromium وFirefox وWebKit معًا وقت مهدور. وينبغي أن تبقى حلقة التطوير رخيصة افتراضيًا.

وتقسيمي الافتراضي:

- **حلقة محلية سريعة لطلبات السحب**: Chromium
- **حلقة دخان صغيرة متعدّدة المتصفّحات**: Firefox وWebKit على مجموعة ضيّقة من المسارات
- **حلقة ليلية أوسع**: المصفوفة الأكمل، أو على الأقل أكثر المسارات عرضة للفشل

هذا هو التوازن الذي رأيت فرقًا تحافظ عليه فعلًا.

## مشاريع Playwright التي تقسّم العمل

مشاريع Playwright هي الآلية التي تجعل «Chromium عند كل تعديل، وFirefox وWebKit على مجموعة دخان فرعية» تعمل فعلًا. فكل مشروع كتلة تهيئة مسمّاة داخل `playwright.config.ts`، ويمكنها أن تشير إلى متصفّح مختلف، و`testMatch` مختلف، ومجموعة خيارات مختلفة. والشكل النهائي — لا ما يُشحن في النسخة الابتدائية اليوم، بل ما سيبدو عليه Shelf بعد أن تكون مختبرات المصادقة والتصوّر البصري والأداء والمتصفّحات قد استقرّت كلها — يبدو تقريبًا هكذا:

```typescript
projects: [
  {
    name: 'setup',
    testMatch: /authentication\.setup\.ts/,
  },
  {
    name: 'public',
    testMatch: /(smoke|visual|playground)\.spec\.ts/,
    use: {
      ...devices['Desktop Chrome'],
    },
  },
  {
    name: 'authenticated',
    testMatch: /(rate-book|accessibility|visual-authenticated|performance)\.spec\.ts/,
    use: {
      ...devices['Desktop Chrome'],
      storageState: storageStatePath,
    },
    dependencies: ['setup'],
  },
  // Cross-browser smoke projects. They run only the `smoke.spec.ts` file
  // against Firefox and WebKit. Skip them by default — invoke via
  // `npm run test:cross-browser` when you specifically want the
  // expanded matrix.
  {
    name: 'firefox-smoke',
    testMatch: /smoke\.spec\.ts/,
    use: { ...devices['Desktop Firefox'] },
  },
  {
    name: 'webkit-smoke',
    testMatch: /smoke\.spec\.ts/,
    use: { ...devices['Desktop Safari'] },
  },
];
```

مرة أخرى: هذا هو المقصد النهائي، لا ملف Shelf الحالي. فالنسخة الابتدائية تشحن `playwright.config.ts` أصغر بكثير، وأنت تبني نحو هذا في منتصف الدورة. والتقسيم المهم في هذا الدرس أبسط: أبقِ Chromium الحلقة السريعة الافتراضية، واجعل Firefox وWebKit مشروعي دخان اختياريين. وحينها يستطيع سكربت `npm run test` الافتراضي أن يثبّت المشروع السريع كي لا يتسرّب Firefox وWebKit إلى الحلقة اليومية:

```json
{
  "scripts": {
    "test": "playwright test --project=chromium",
    "test:cross-browser": "playwright test --grep @cross-browser --project=chromium --project=firefox-smoke --project=webkit-smoke"
  }
}
```

> **ثبّت المتصفّحات الإضافية أولًا**
>
> لا يثبّت Playwright إلا Chromium حين تُهيّئ الحلقة السريعة. وقبل تشغيل `npm run test:cross-browser` للمرة الأولى — محليًا أو في مشغّل CI جديد — ثبّت ثنائيات المتصفّحات المتعدّدة صريحًا:
>
> ```bash
> npx playwright install --with-deps firefox webkit
> ```
>
> تخطَّ هذا وستفشل مشاريع المتصفّحات البديلة بخطأ «browser not installed» لا علاقة له بشيفرة اختبارك. وسير العمل الليلي الذي تبنيه في المختبر التالي ينبغي أن يشغّل سطر التثبيت نفسه في مهمّته `cross-browser-smoke` للسبب نفسه.

## وسم الاختبارات الصحيحة، لا كل الاختبارات

الخطأ الذي يقع فيه الناس هو محاولة تشغيل المجموعة كلها في كل مكان.

لا تفعل.

وسم الاختبارات التي تستحقّ تغطية متعدّدة المتصفّحات:

- تسجيل الدخول
- التنقّل
- الحوارات والقوائم
- نموذجان أو ثلاثة عالية القيمة
- المسارات التي تؤذي فيها أخطاء التخطيط أكثر من غيرها

هذا يمنحك مجموعة صغيرة مستقرة تجيب عن «هل يعمل المنتج أساسًا في هذه المحرّكات؟». أما البقية فتبقى Chromium أولًا إلى أن يخبرك التاريخ بغير ذلك.

المشاريع طريقة واحدة للتصفية. وأوسمة الاختبار المدمجة في Playwright هي الأخرى، والاثنتان متكاملتان. وسِم اختبارًا بـ`@cross-browser` لتعلّمه جزءًا من مجموعة الدخان متعدّدة المتصفّحات، ثم شغّله صريحًا بـ`--grep`:

```typescript
// tests/rate-book.spec.ts
test('user can rate Station Eleven', { tag: '@cross-browser' }, async ({ page }) => {
  // ...
});
```

```bash
# Run every @cross-browser-tagged test in both alternate engines:
npx playwright test --project=firefox-smoke --project=webkit-smoke --grep @cross-browser
```

المشاريع تقول «أي متصفّح + أي نمط مطابقة ملفات». والأوسمة تقول «أي اختبارات بعينها داخل ذلك النمط». استخدم المشاريع حين يكون التقسيم بحسب *الملف* (كل اختبارات الدخان تذهب إلى Firefox، ولا واحدة من اختبارات تقييم الكتب تفعل)، والأوسمة حين يكون التقسيم بحسب *اختبار داخل ملف* (فملف تقييم الكتب فيه عشرة اختبارات، لكن اثنين فقط يستحقّان تغطية متعدّدة المتصفّحات).

وإن كنت تدمج تقارير من مهمّات متصفّحات متعدّدة لاحقًا، فأرفق `metadata` لكل مشروع — مثل `metadata: { lane: 'firefox-smoke' }` على مشروع Firefox — كي يستطيع التقرير المدمج أن يخبرك «هذا جاء من مهمّة دخان Firefox» بدلًا من تسطيح كل شيء في كتلة أدلّة واحدة بلا وسم.

وإن كبرت مجموعة الدخان بما يكفي لتحتاج تقسيمًا (sharding)، فـ`fullyParallel: true` هو الإعداد الذي يُبقي الأجزاء متوازنة على مستوى الاختبار لا على مستوى الملف. وإن كان تقرير HTML المدمج يخدم المرفقات من دلو خارجي بدلًا من مجلد المخرجات المستخرج، فـ[`attachmentsBaseURL`](https://playwright.dev/docs/test-reporters) هو ما يمنع روابط الآثار ولقطات الشاشة تلك من أن تصير صمتًا ميتًا.

## WebKit إشارة قوية، لا ضمانة قانونية

يمنحك Playwright Chromium وFirefox وWebKit. وهذا بالضبط ما تريده لتغطية الأتمتة. ويجدر أيضًا أن نكون صادقين في الفرق الدقيق: WebKit أفضل إشارة آلية لديك عن سلوك عائلة Safari، لا ضمانة سحرية عن كل خصوصية Safari على جهاز حقيقي في العالم.

وهذا مع ذلك قيّم للغاية. فقط لا تُبالغ في بيعه.

## أبقِ مخرجات الفشل مقروءة

تصير إخفاقات المتصفّحات المتعدّدة صاخبة سريعًا إن لم تفصلها بنظافة.

أنا أريد:

- اسم المتصفّح في اسم المهمّة أو الأثر
- آثارًا ولقطات شاشة محفوظة لكل متصفّح
- تقارير blob لكل متصفّح حين يكون التشغيل مقسّمًا أو موزّعًا على مهمّات
- مجموعة اختبارات صغيرة بما يكفي ليكون المتصفّح الفاشل واضحًا

فحين يفشل Firefox وينجح Chromium، لا ينبغي للوكيل أن يحتاج رواية بوليسية. ينبغي أن يحصل على أثر نظيف وأمر إعادة إنتاج نظيف.

## قواعد الوكيل

```markdown
## Cross-browser checks

- Chromium is the default fast browser for local iteration.
- Cross-browser coverage runs on a tagged smoke subset, not the entire
  suite by default.
- If a bug is reported as browser-specific, reproduce it in the relevant
  browser project before proposing a fix.
- Treat browser-specific failures as real failures, not as flaky noise,
  unless you can point to a known infrastructure issue.
```

## كيف تعرف أن التقسيم صحّي

تكون لديك حلقة متعدّدة المتصفّحات نافعة حين:

- يبقى Chromium الافتراضي السريع
- يعمل Firefox وWebKit على مجموعة دخان صغيرة عن قصد
- تجعل الآثار واضحًا أي متصفّح فشل ولماذا

## الشيء الوحيد الذي يجب تذكّره

لا يتعلّق التحقّق عبر المتصفّحات بتشغيل كل شيء في كل مكان. بل بتشغيل المجموعة الصغيرة *الصحيحة* في المتصفّحات الأرجح أن تختلف، دون إبطاء كل تعديل حتى يصير مأساة صغيرة.

## قراءات إضافية

- [CI بوصفه حلقة الملاذ الأخير](https://stevekinney.com/courses/self-testing-ai-agents/ci-as-the-loop-of-last-resort)
- [مختبر: أضف تغطية عبر المتصفّحات](https://stevekinney.com/courses/self-testing-ai-agents/lab-add-cross-browser-coverage)
