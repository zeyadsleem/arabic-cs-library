---
title: "الحل"
lang: ar
source: "https://stevekinney.com/courses/self-testing-ai-agents/build-a-failure-dossier-for-shelf-solution"
---

ملفّ الإخفاق (failure dossier) هو الفرق بين وكيل يقول «فشلت الاختبارات» ووكيل يقول «فشل اختبار نافذة تسجيل التقييم في السطر 47 لأن زر الحفظ لم يكن مرئيًا خلال 5 ثوانٍ — ها هي لقطة الشاشة، وها هو التتبّع، وها هو الأمر الدقيق لإعادة إنتاجه». فالاستجابة الأولى تبدأ محادثة، والثانية تبدأ إصلاحًا.

لا يوفّر مشروع Shelf الابتدائي هذه البنية التحتية. وهذا التمرين يعيد وصلها: إعداد Playwright يحتفظ بالمخرجات الصحيحة، وبديل (fixture) يمرّر ضجيج وحدة تحكّم المتصفح، وسكربت يقرأ تقرير JSON ويعرض ملف إخفاق منظّمًا بصيغة markdown.

## ما الذي تضيفه

### `playwright.config.ts` — إعدادات الاحتفاظ بالمخرجات

ثلاثة إعدادات في كتلة `use` تتحكّم في ما يحفظه Playwright عند فشل اختبار:

```typescript
use: {
  baseURL: 'http://127.0.0.1:4173',
  trace: 'retain-on-failure',
  screenshot: 'only-on-failure',
  video: 'retain-on-failure',
},
```

- يسجّل **`trace: 'retain-on-failure'`** تتبّعًا كاملًا لكل اختبار لكنه لا *يحتفظ* به إلا عندما يفشل الاختبار. تشمل التتبّعات لقطات DOM عند كل إجراء، وطلبات الشبكة، وسجلات وحدة التحكّم. وهي أكثر مخرجات التنقيح فائدةً من بين كل ما ينتجه Playwright.
- تلتقط **`screenshot: 'only-on-failure'`** لقطة شاشة في لحظة الفشل. وهذا هو الدليل على «كيف كانت الصفحة تبدو فعلًا؟».
- يسجّل **`video: 'retain-on-failure'`** فيديو، لكنه لا يحتفظ به إلا عند الفشل، مثل التتبّعات. والفيديو أثقل من التتبّعات، لكنه يُظهر أحيانًا مشكلات مرتبطة بالتوقيت تفوتها اللقطة.

إعداد المُبلِّغ (reporter) لا يقل أهمية:

```typescript
reporter: [
  ['html', { open: 'never', outputFolder: 'playwright-report/html' }],
  ['json', { outputFile: 'playwright-report/report.json' }],
  ['list'],
],
```

مُبلِّغ `json` هو ما يقرأه سكربت ملف الإخفاق. وبدونه لا يوجد تقرير قابل للقراءة آليًا لتلخيصه. أما مُبلِّغ `html` فللبشر الذين يريدون تصفّح الإخفاقات تفاعليًا. ومُبلِّغ `list` يطبع النتائج في الطرفية أثناء التشغيل.

### `tests/fixtures.ts` — تمرير مخرجات وحدة التحكّم

```typescript
export const test = base.extend({
  page: async ({ page }, use) => {
    page.on('console', (message) => {
      const messageType = message.type();
      if (messageType === 'error' || messageType === 'warning') {
        console.error(`[browser ${messageType}] ${message.text()}`);
      }
    });

    page.on('pageerror', (error) => {
      console.error(`[browser pageerror] ${error.message}`);
    });

    page.on('requestfailed', (request) => {
      const failureText = request.failure()?.errorText ?? 'unknown error';
      if (failureText.includes('ERR_ABORTED') || failureText.includes('NS_BINDING_ABORTED')) {
        return;
      }
      console.error(`[network failed] ${request.method()} ${request.url()} - ${failureText}`);
    });

    page.on('response', (response) => {
      if (response.status() >= 400) {
        console.error(
          `[network ${response.status()}] ${response.request().method()} ${response.url()}`,
        );
      }
    });

    await use(page);
  },
});
```

هذا البديل يلفّ `page` في كل اختبار ليمرّر ضجيج جانب المتصفح إلى stderr في Node. ولماذا يهمّ هذا في ملف الإخفاق؟ لأن الأسطر الممرَّرة تظهر في مخرجات مُبلِّغ Playwright، وفي تقرير HTML، وفي تقرير JSON. وبدون ذلك، فإن `console.error('Cannot read properties of undefined')` الذي يحدث في المتصفح سيبقى غير مرئي في ملف الإخفاق — سينتهي الاختبار بمهلة فقط، ولن تكون لديك أي فكرة عن السبب.

مرشّح `ERR_ABORTED` / `NS_BINDING_ABORTED` موجود لأن هذه إلغاءات تنقّل طبيعية. وتمريرها سيخلق ضجيجًا يحجب الإخفاقات الحقيقية.

### `scripts/summarize-failure-dossier.ts` — سكربت ملف الإخفاق

هذا هو جوهر التمرين. يقرأ `playwright-report/report.json`، ويمشي في شجرة مجموعات الاختبارات، ويجمع الإخفاقات، ويعرض ملف markdown.

تعريفات الأنواع تعكس بنية تقرير JSON في Playwright:

```typescript
type FailureSummary = {
  title: string;
  file: string;
  line: number | null;
  projectName: string;
  errorMessage: string;
  screenshotPath: string | null;
  tracePath: string | null;
  videoPath: string | null;
};
```

هذا هو المخطّط لكل مُدخل إخفاق. وكل ما يحتاجه الوكيل ليفهم الإخفاق ويعيد إنتاجه ويصلحه مُلتقَط هنا.

منطق المشي في المجموعات عودي لأن Playwright يُدخل المجموعات بعمق غير محدود (ملف ← describe ← describe ← اختبار):

```typescript
const collectSpecs = (suites: PlaywrightSuite[]): PlaywrightSpec[] => {
  return suites.flatMap((suite) => [...(suite.specs ?? []), ...collectSpecs(suite.suites ?? [])]);
};
```

اختيار لقطة الشاشة له رأي في أي صورة هي الأنفع:

```typescript
const pickFailureScreenshot = (attachments: PlaywrightAttachment[] | undefined): string | null => {
  const isImage = (attachment: PlaywrightAttachment): boolean =>
    attachment.contentType?.startsWith('image/') === true;
  const byNamePreference = (name: string) =>
    (attachments ?? []).find(
      (attachment) => isImage(attachment) && attachment.name?.includes(name) === true,
    );
  return (
    byNamePreference('diff')?.path ??
    byNamePreference('actual')?.path ??
    pickAttachment(attachments, isImage) ??
    null
  );
};
```

عندما يجري Playwright اختبار مقارنة بصرية، يولّد ثلاث صور: `expected` و`actual` و`diff`. وصورة `diff` تُبرز بالضبط ما تغيّر، لذا هي الأكثر قابلية للتنفيذ. وصورة `actual` تُظهر كيف كانت الصفحة تبدو. أما خط الأساس `expected` فهو الأقل فائدةً في تنقيح إخفاق. وتجرّب الدالة هذه الصور بهذا الترتيب، ثم ترجع إلى أي مرفق صورة في الإخفاقات غير البصرية التي تملك لقطة شاشة عامة فقط.

ملف الإخفاق المعروض لكل إخفاق يتضمّن أمر إعادة إنتاج:

```typescript
const projectFlag = failure.projectName ? `--project=${failure.projectName} ` : '';
const reproduceCommand = `npx playwright test ${projectFlag}${failure.file} -g ${JSON.stringify(failure.title)}`;
```

هذا هو السطر الذي يمكن للوكيل (أو لك) نسخه ولصقه لإعادة تشغيل الاختبار الفاشل وحده. فعلم `--project` يستهدف إعداد المتصفح الصحيح *عندما يعرّف المستودع مشروعات مسمّاة* (المشروع الابتدائي الأدنى لا يفعل ذلك بعد، لذا يُبقي الحارس هذا العلم خارج الأمر حتى تضيفها)، ومسار الملف يضيّق النطاق إلى المواصفة الصحيحة، و`-g` يرشّح الاختبار المحدّد بالعنوان. لا تخمين، ولا قراءة ملفات الاختبار لمعرفة أي اختبار فشل.

وعندما لا توجد إخفاقات، يقول ملف الإخفاق ذلك بصراحة:

```typescript
if (failures.length === 0) {
  return '# Playwright failure dossier\n\nNo failing tests.\n';
}
```

## ما يبقى عليك تشغيله

### ولّد ملف إخفاق أخضر أولًا

شغّل مجموعة الاختبارات الكاملة ثم ولّد ملف الإخفاق:

```bash
npx playwright test
npm run dossier
```

افتح `playwright-report/dossier.md`. ينبغي أن يعرض العبارة `No failing tests.` وهذا هو خط أساسك — دليل على أن السكربت يعمل وينتج مخرجات حتى عندما ينجح كل شيء.

### تجربة الكسر المتعمّد

اكسر شيئًا الآن بشكل متعمّد. وثمّة طريقة موثوقة: افتح `src/routes/+page.svelte` (الصفحة الرئيسية العامة التي يتحقّق منها `tests/smoke.spec.ts`) وغيّر نص عنوان `PageHeader` — مثلًا استبدل `Build a shelf that remembers what you actually read` بأي شيء آخر. حينها سيفشل التحقّق `getByRole('heading', { name: /Build a shelf that remembers what you actually read/i })` في مواصفة التدقيق. (تجنّب تحرير `/shelf` نفسها — فهي محجوبة خلف المصادقة وتعيد توجيه الطلبات غير الموثّقة إلى `/login`، لذا لا تتحقّق مواصفة التدقيق في المشروع الابتدائي إلا من إعادة التوجيه، لا من عنوان الصفحة.)

شغّل المجموعة مرة أخرى:

```bash
npx playwright test
```

ينبغي أن ترى إخفاقًا واحدًا على الأقل. ولّد ملف الإخفاق الآن:

```bash
npm run dossier
```

افتح `playwright-report/dossier.md`. ولكل إخفاق، ينبغي أن ترى:

- **عنوان الاختبار وموضع الملف** — أي اختبار انكسر وأين يوجد.
- **رسالة الخطأ** — ما أبلغ به Playwright فعليًا.
- **مسار لقطة شاشة** — كيف كانت الصفحة تبدو في لحظة الفشل.
- **مسار تتبّع** — مع الأمر اللازم لفتحه (`npx playwright show-trace <path>`).
- **أمر إعادة إنتاج** — استدعاء `npx playwright test` الدقيق لإعادة تشغيل ذلك الاختبار وحده.

افتح التتبّع لتتأكّد أنه حقيقي:

```bash
npx playwright show-trace playwright-report/test-results/<the-trace-file>.zip
```

يُظهر العارض الخط الزمني الكامل للإجراءات، ولقطات DOM عند كل خطوة، والنقطة الدقيقة التي فشل عندها التحقّق.

### تراجع وتأكّد من الاخضرار

ألغِ كسرك المتعمّد، وشغّل المجموعة مرة أخرى، وأعد توليد ملف الإخفاق، وتأكّد من عودته إلى `No failing tests.`

### حلقة الوكيل

هذه هي المكافأة. وبعد أن تصبح بنية ملف الإخفاق في مكانها، يصبح سير العمل:

1. تفشل الاختبارات (في CI أو محليًا).
2. شغّل `npm run dossier`.
3. سلّم ملف الإخفاق إلى الوكيل (أو دعه يقرأه مباشرةً — فقسم «عندما يفشل اختبار» في `CLAUDE.md` يطلب منه ذلك بالفعل).
4. يقرأ الوكيل الخطأ، ويفتح التتبّع، ويحدّد العلّة، ويصلحها، ويعيد تشغيل الاختبار المحدّد.

يستبدل ملف الإخفاق عبارة «مرحبًا، الاختبارات حمراء، هل يمكنك النظر؟» بموجز منظّم يمنح الوكيل كل ما يحتاجه ليبدأ العمل فورًا.

## أنماط تأخذها معك

- **المخرجات لا تُفيد إلا إذا احتُفظ بها.** `trace: 'retain-on-failure'` و`screenshot: 'only-on-failure'` هما الإعدادان اللذان يجعلان التنقيح ممكنًا. وبدونهما، لا يكون الإخفاق سوى رسالة خطأ بلا سياق.
- **مُبلِّغات JSON للآلات، ومُبلِّغات HTML للبشر.** يقرأ سكربت ملف الإخفاق تقرير JSON. وأنت تتصفّح تقرير HTML. وكلاهما يُولَّد من التشغيل نفسه. صِل الاثنين.
- **تمرير مخرجات وحدة التحكّم يسدّ فجوة الرؤية.** أخطاء جانب المتصفح غير مرئية لمشغّل الاختبارات ما لم تمرّرها صراحةً. والبديل يجسر تلك الفجوة، فتظهر المخرجات الممرَّرة داخل ملف الإخفاق.
- **تفضيل لقطة الشاشة مهم.** عندما تولّد الانحدارات البصرية صورًا متعددة، تكون صورة الفرق هي الأنفع. ويُضمّن سكربت ملف الإخفاق هذا التفضيل كي يرى الوكيل الصورة الأكثر قابلية للتنفيذ أولًا.
- **أوامر إعادة الإنتاج واجهة برمجية.** يستطيع الإنسان نسخ الأمر ولصقه. ويستطيع الوكيل تنفيذه مباشرةً. وفي الحالتين، الطريق من «تحديد الإخفاق» إلى «إعادة إنتاج الإخفاق» أمر واحد، لا مشروع بحث.

## قراءات إضافية

- [تمرين: بناء ملف إخفاق من أجل Shelf](https://stevekinney.com/courses/self-testing-ai-agents/lab-build-a-failure-dossier-for-shelf)
- [ملفات الإخفاق: ما يحتاجه الوكلاء فعلًا من بناء أحمر](https://stevekinney.com/courses/self-testing-ai-agents/failure-dossiers-what-agents-actually-need-from-a-red-build)
