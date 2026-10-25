---
title: "محدِّدات المواقع والتسلسل الهرمي لإمكانية الوصول"
lang: ar
source: "https://stevekinney.com/courses/self-testing-ai-agents/locators-and-the-accessibility-hierarchy"
---

إن كنت ستصلح شيئًا واحدًا فقط في مجموعة اختبارات Playwright قبل أن تدع وكيلًا يلمسها، فأصلح طريقة تحديدك لمواضع العناصر.

أقول هذا لأن محدِّد الموقع هو سطح التلامس بين اختبارك وواجهتك — وكل ما يتفرع عن ذلك (التقلب، والانتظار، وتكلفة الصيانة، وقدرة الوكيل على كتابة اختبارات جديدة دون كسر القائم منها) يعتمد على متانة ذلك السطح. محدِّد الموقع الهشّ يسمّم الحلقة بأكملها. أما محدِّد الموقع الذي يعتمد على إمكانية الوصول فيجعل بقية [Playwright](https://playwright.dev/) تبدو سهلة تقريبًا.

## التسلسل الهرمي

تأتي Playwright مع مجموعة من [واجهات تحديد المواقع](https://playwright.dev/docs/locators). وهي ليست متكافئة، والترتيب الذي تمدّ يدك إليها به مهم. هذا هو الترتيب الذي أريد أن يكون في ذهنك وفي قواعد الوكيل لديك بنهاية هذا الدرس:

1. `page.getByRole('button', { name: 'Add book' })`—حسب الدور الدلالي والاسم المتاح
2. `page.getByLabel('Book title')`—حسب تسمية حقل النموذج
3. `page.getByPlaceholder('Search books...')`—حسب نص العنصر النائب
4. `page.getByText('Added to your shelf')`—حسب النص المرئي
5. `page.getByTestId('add-book-button')`—حسب السمة `data-testid`
6. `page.locator('.btn-primary')`—CSS خام

القواعد من الأولى إلى الرابعة هي ما أريد أن يمدّ الوكيل يده إليه أولًا. والقاعدة الخامسة هي مخرج الطوارئ حين لا تكون للواجهة فعلًا تسمية متاحة يمكن المطابقة عليها. أما القاعدة السادسة فهي نمط مضاد — وهي في القائمة حتى أستطيع أن أخبرك ألا تستخدمها.

## لماذا هذا الترتيب وليس ترتيبًا آخر

لأن الترتيب محاذٍ *لما يراه المستخدم*.

مستخدم قارئ الشاشة الذي يتنقل في Shelf لا يرى `.btn-primary` ولا `.css-3f7g8h`. إنه يرى «Add book، زر». فإن كان اختبارك يستهدف الشيء نفسه الذي يستهدفه قارئ الشاشة، فسيحدث أمران تلقائيًا. الأول أن اختبارك يظل يعمل عبر عمليات إعادة الهيكلة، لأن الأدوار والأسماء المتاحة مستقرة على نحو لا تكون فيه أصناف CSS مستقرة. والثاني أنك تحصل على تدقيق تقريبي لإمكانية الوصول مجانًا — فإن لم تستطع العثور على العنصر بدوره، *فهو لا يملك دورًا*، وذلك خطأ حقيقي في المنتج، لا مشكلة في Playwright.

هذه هي أفضل حجة واحدة لضبط محدِّدات المواقع: **الاختبار المحصّن ضد إعادة الهيكلة والمكوّن القابل للوصول هما المكوّن نفسه.** لا يمكنك كتابة اختبار `getByRole` ضد زر غير قابل للوصول. محدِّد الموقع يجبرك على إصلاح المكوّن، والمكوّن المُصلَح يساعد مستخدمين حقيقيين. لا توجد مكاسب مجانية أكثر من هذه تقريبًا.

لكن لا تُفرط في قراءة ذلك الادعاء. مجموعة اختبارات `getByRole` الجيدة تمنحك ضغطًا في المنبع نحو ترميز قابل للوصول. وهي *لا* تمنحك بوابة مخصصة لإمكانية الوصول. نحن نوضّح هذا الفرق في [إمكانية الوصول كبوابة جودة](https://stevekinney.com/courses/self-testing-ai-agents/accessibility-as-a-quality-gate)، لأن «قابل للوصول على الأرجح» ليس معيار جودة.

إن أردت تمارين بدلًا من النظرية، فـ Shelf يشحن ملعبًا مخصصًا في `src/routes/playground/+page.svelte`، والمختبر المرافق يطلب منك إنشاء `tests/playground.spec.ts`. شغّل التطبيق محليًا أثناء عملك، وأبقِ `npm run typecheck` و`npm run build` قريبين أيضًا. الملعب يتضمن عمدًا بعض تحذيرات إمكانية الوصول حتى ترى أين يتوقف التسلسل الهرمي لمحدِّدات المواقع عن المساعدة ولماذا يوجد قسم الاحتياط.

## ما يفعله الوكيل افتراضيًا، ولماذا هو خطأ

إذا تُرك الوكيل لشأنه وهو يكتب اختبار Playwright، فسيفعل هذا:

```typescript
await page.locator('.book-card button.primary').click();
```

أفهم السبب. نظر الوكيل إلى DOM المرسوم، ورأى زرًا داخل بطاقة كتاب، واستخرج محدِّد CSS الذي كان موجودًا هناك. وهو صحيح تقنيًا — ينجح الاختبار في اليوم الذي كُتب فيه. ثم في الغد يعيد شخص تسمية `.book-card` إلى `.shelf-entry` لأن هذا هو اسمها الفعلي في نموذج البيانات الآن، فينفجر الاختبار، ويلوم الوكيل «مجموعة الاختبارات المتقلبة».

لم يكن الاختبار متقلبًا. كان محدِّد الموقع مقترنًا بتفصيل تنفيذي لا شأن له بأن يكون جزءًا من اختبار.

النسخة التي *ينبغي* أن يكتبها الوكيل أقرب إلى هذا:

```typescript
await page
  .getByRole('article', { name: /Station Eleven/ })
  .getByRole('button', { name: 'Rate this book' })
  .click();
```

أطول. أقل ذكاءً في المظهر. محصّن ضد إعادة تسمية الصنف، وإعادة كتابة ورقة الأنماط، والانتقال من CSS-in-JS إلى Tailwind. إنه يستهدف ما يراه المستخدم: كتاب باسم محدد، وزر بداخله بإجراء محدد.

## تحديد النطاق بمحدِّدات المواقع، لا بالمُحدِّدات

لاحظ استدعاءات `getByRole` المتسلسلة في النسخة الجيدة. هذه هي العادة الأخرى التي أريد ترسيخها: استخدم تسلسل محدِّدات المواقع لتضييق بحثك، لا دمج النصوص أو CSS المعقد.

```typescript
// Don't do this
await page.locator('.shelf-entry[data-title="Station Eleven"] button.rate').click();

// Do this
const book = page.getByRole('article', { name: /Station Eleven/ });
await book.getByRole('button', { name: 'Rate this book' }).click();
```

النسخة المتسلسلة تُقرأ بالترتيب نفسه الذي يفكر به الإنسان: اعثر على الكتاب، ثم اعثر على زر التقييم داخله. و`book` هو `Locator` قابل لإعادة الاستخدام — يمكنك التأكيد عليه، والمرور فوقه بالمؤشر، وإعادة تحديد النطاق انطلاقًا منه، وتمريره إلى دالة مساعدة أخرى. أما نسخة CSS فهي نص واحد يفعل شيئًا واحدًا ثم ترميه.

## التركيب يتفوق على `nth()`

تمنحك [واجهة Locator](https://playwright.dev/docs/api/class-locator) الأحدث أدوات تركيب أفضل من «حسنًا، سأستخدم `.nth(2)` على ما أظن وأتمنى ألا يعيد أحد ترتيب DOM».

ثلاثة منها تستحق الحفظ:

- **`locator.and(...)`** يتقاطع بين محدِّدَي موقع. استخدمه عندما يكون للهدف هويتان ذواتا معنى وتريد كلتيهما في المحدِّد.
- **`locator.filter({ has, hasText, hasNot })`** يضيّق مجموعة حسب محتوى فرعي أو نص مرئي. هذا هو حصان العمل للبطاقات والصفوف وعناصر القوائم المتكررة.
- **`locator.or(...)`** يعبّر عن «إما هذه الواجهة أو تلك». عمليًا، أضف `.first()` عندما يكون الفرعان موجودين معًا في الوقت نفسه، لأن محدِّدات المواقع الصارمة ليست في مجال تخمين أيّهما قصدت.

```typescript
const composeButton = page.getByRole('button').and(page.getByTitle('Compose'));

const securityDialog = page.getByText('Confirm security settings');

await expect(composeButton.or(securityDialog).first()).toBeVisible();

if (await securityDialog.isVisible()) {
  await page.getByRole('button', { name: 'Dismiss' }).click();
}

await composeButton.click();
```

النمط نفسه ممتاز للمحتوى المتكرر:

```typescript
const stationEleven = page
  .getByRole('article')
  .filter({ has: page.getByRole('heading', { name: 'Station Eleven' }) })
  .describe('Station Eleven shelf card');

await stationEleven.getByRole('button', { name: 'Rate this book' }).click();
```

هذا ما تعنيه [إرشادات أفضل الممارسات](https://playwright.dev/docs/best-practices) في Playwright بشأن التسلسل والتصفية. استخدم المعنى الموجود أصلًا في الواجهة. توقف عن الفهرسة حسب ترتيب DOM إلا إذا لم يكن لديك حقًا أي شيء آخر.

## سمِّ محدِّد الموقع عندما يهم ذلك

[`locator.describe()`](https://playwright.dev/docs/api/class-locator) هو واحد من تلك الواجهات الصغيرة التي تدفع أجرها في كل مرة تفشل فيها مجموعة الاختبارات في CI. فهو يمنح محدِّد الموقع تسمية مقروءة للبشر في التتبعات والتقارير.

وهذا ليس زخرفة. فإن قال تتبّعك «بانتظار `Station Eleven shelf card`» بدلًا من «بانتظار `getByRole('article')`»، فإن الوكيل يقضي وقته في تشخيص الفشل بدلًا من هندسة عكسية لسلسلة المحدِّدات التي كتبتها.

استخدمه مع محدِّدات المواقع التي:

- تظهر في تأكيدات متعددة
- تمثل كائنًا مهمًا في الواجهة
- كان من شأنها أن تُقرأ كسباكة مجهولة في التتبّع

## `all()` ليس انتظارًا

`locator.all()` يبدو ودودًا ويتصرف كفخ في الواجهات الديناميكية. إنه يعيد كل ما يطابق *الآن*. لا انتظار، ولا إعادة محاولة، ولا رحمة.

وهذا يجعله مقبولًا للمحتوى الثابت المستقر أصلًا، وخيارًا افتراضيًا سيئًا لرسم القوائم ونتائج البحث والواجهات المتأخرة. فإن كان ما تريده حقًا هو «اجمع النصوص من العناصر المطابقة بمجرد أن تصبح القائمة جاهزة»، فإن `expect(locator).toHaveCount(...)` مع `locator.evaluateAll(...)` يكون عادةً أدق:

```typescript
const results = page.getByRole('listitem');

await expect(results).toHaveCount(3);

const titles = await results.evaluateAll((nodes) =>
  nodes.map((node) => node.textContent?.trim() ?? ''),
);
```

قفزة واحدة إلى سياق الصفحة أفضل من التنقل ذهابًا وإيابًا عبر البروتوكول مقابل كل صف.

## الإطارات المدمجة صارمة أيضًا

الإطارات هي المكان الذي تنسى فيه الفرق فجأة كل قواعد محدِّدات المواقع التي كانت لديها قبل خمس دقائق. النمط الحديث لا يزال «ابدأ بمحدِّد موقع عادي، وضيّقه حتى يصبح فريدًا، ثم ادخل إلى الإطار».

```typescript
const analyticsFrame = page.getByTitle('Quarterly dashboard').contentFrame();

await analyticsFrame.getByRole('button', { name: 'Refresh' }).click();
```

تشير [وثائق FrameLocator](https://playwright.dev/docs/api/class-framelocator) إلى هذه الصرامة لسبب ما: إن طابق أكثر من إطار، فإن Playwright يرمي خطأ. هذا جيد. فهو أفضل من النقر داخل أي لوحة معلومات تصادف أنها رُسمت أولًا.

## متى يكون `data-testid` مقبولًا

لا أريد أن أخبرك أن `data-testid` خطأ دائمًا. أحيانًا يكون الإجابة الصحيحة. تحديدًا:

- لديك ثلاثة أزرار بالاسم المتاح نفسه بالضبط في الصفحة لأسباب منتج حقيقية.
- أنت تستهدف عنصر تغليف ليس له دور دلالي (عنصر `div` للتخطيط يحتاج الاختبار إلى التحقق من ظهوره).
- أنت تتحايل على مكتبة مكوّنات لا تعرض اسمًا متاحًا، والإصلاح ليس في مستودعك.

في تلك الحالات، أضف `data-testid` وامضِ قدمًا. لكن القاعدة في تعليمات الوكيل لديك ينبغي أن تكون أن `data-testid` هو إجابة *الخيار الثالث*، لا الأول، وأن على الوكيل أن يكتب جملة في رسالة الإيداع تشرح لماذا لم ينجح الدور والتسمية. (تلك الجملة لا تحتاج إلى فرض آلي — إنها تحتاج إلى الوجود كحاجز يبطئ الوكيل حتى لا يمدّ يده إلى `data-testid` افتراضيًا.)

## قواعد الوكيل

أضف هذا إلى ملف التعليمات، أو شيئًا مثله:

```markdown
## Playwright locators

Order of preference when locating elements:

1. `page.getByRole(role, { name })`—try this first. Always.
2. `page.getByLabel(labelText)`—for form inputs with visible labels.
3. `page.getByPlaceholder(text)`—for inputs without labels (and fix the missing label if you can).
4. `page.getByText(text)`—for static visible text and confirmation messages.
5. `page.getByTestId(id)`—only when 1–4 genuinely do not work. If you use this, add a line to the commit message explaining why.
6. `page.locator(cssSelector)`—never. If you find yourself here, the component needs an accessible name.

For nested elements, scope with chained locators, `filter({ has, hasText })`,
`and()`, and `or().first()` before reaching for `nth()`.
Use `locator.describe()` on important reusable locators so traces read like
English instead of plumbing.
```

هذه تسعة أسطر. وهي أثمن تسعة أسطر في ملف تعليماتك للشهر القادم. ستمنع اختبارات متقلبة أكثر من أي إعداد إعادة محاولة يمكنك كتابته.

## توصيله بالحلقة

هناك قطعتان من التغذية الراجعة تتصلان مباشرة بضبط محدِّدات المواقع، وكلتاهما ستظهر مرة أخرى في وقت لاحق اليوم.

**قاعدة ESLint لـ `page.locator`.** لاحقًا، في [التحقق النصي والأنواع كحواجز](https://stevekinney.com/courses/self-testing-ai-agents/lint-and-types-as-guardrails)، سنُعدّ قاعدة ESLint تحذّر (أو تخطئ) كلما ظهر `page.locator` في ملف تحت `tests/`. يحصل الوكيل على خط متعرج أحمر في اللحظة التي يمدّ يده إلى مخرج الطوارئ، وهذه أسرع تغذية راجعة ممكنة.

**تصحيح أخطاء إمكانية الوصول المدمج في Playwright.** عندما يفشل استعلام `getByRole`، تطبع رسالة خطأ Playwright شجرة إمكانية الوصول للصفحة عند نقطة الفشل. تلك الشجرة ذهب للوكيل — فهي تظهر بالضبط ما هي الأدوار والأسماء *المتاحة*، فيستطيع الوكيل تصحيح استعلامه دون تخمين. سنعتمد على هذا عندما نتحدث عن ملفات الفشل.

وثمة نتيجة طبيعية واحدة: المحتوى الديناميكي ليس رخصة لمدّ اليد إلى `page.waitForTimeout`. إن توسّعت لوحة، أو حُمّلت قائمة، أو انفتح مربع حوار، فانتظر الإشارة المرئية للمستخدم التي تتوقع أن تتغير، وأبقِ محدِّد الموقع مضيَّقًا على ذلك العنصر.

## الشيء الوحيد الذي يجب تذكّره

حدّد المواضع بالدور والاسم المتاح أولًا. كل ما عدا ذلك مخرج طوارئ، ومخارج الطوارئ ينبغي أن تكون غير مريحة قليلًا في استخدامها. فإن كان وكيلك يمدّ يده إلى محدِّدات CSS، فملف تعليماتك لا يؤدي وظيفته بعد.

## قراءات إضافية

- [وضع واجهة Playwright](https://stevekinney.com/courses/self-testing-ai-agents/playwright-ui-mode)
- [مولّد أكواد Playwright](https://stevekinney.com/courses/self-testing-ai-agents/playwright-codegen)
- [واجهة Locator](https://playwright.dev/docs/api/class-locator)
- [مختبر: تحديات محدِّدات المواقع](https://stevekinney.com/courses/self-testing-ai-agents/lab-locator-challenges)
- [إمكانية الوصول كبوابة جودة](https://stevekinney.com/courses/self-testing-ai-agents/accessibility-as-a-quality-gate)
- [حكاية الانتظار](https://stevekinney.com/courses/self-testing-ai-agents/the-waiting-story)
- [هرم الاختبارات كهرمية للتغذية الراجعة](https://stevekinney.com/courses/self-testing-ai-agents/the-testing-pyramid-as-a-feedback-hierarchy)
