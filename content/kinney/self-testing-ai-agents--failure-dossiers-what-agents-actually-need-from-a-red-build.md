---
title: "ملفّات الفشل: ما يحتاجه الوكلاء فعلًا من بناء أحمر"
lang: ar
source: "https://stevekinney.com/courses/self-testing-ai-agents/failure-dossiers-what-agents-actually-need-from-a-red-build"
---

هناك شيء كنت أتمنّى أن أفهمه قبل عام تقريبًا ممّا فعلت: **حين يرى الوكيل فشل اختبار، فإن مخرجات الاختبار موجّه.** هذا هو تحوّل الإطار كله. علامة X الحمراء على البناء ليست حالة — إنها التعليمة التالية التي سيتصرّف الوكيل بناءً عليها، وكل ما يتعلّق بعلامة X الحمراء سياق لتلك التعليمة.

وهذا يعني أن جودة مخرجات اختبارك تحدّد مدى قدرة الوكيل على إصلاح الأمور. فالفشل الذي يقول `expect(received).toBe(expected)` مع تتبّع مكدّس من سطرين موجّه سيئ. أما الفشل الذي يقول ما كان متوقّعًا، وما حدث فعلًا، وكيف بدت الصفحة، وما قالته الطرفية، وما فعلته الشبكة، وأين تنظر أولًا — فذلك موجّه جيد. وسيصلح الوكيل الثاني دون مساعدتك نحو ثلاثة أضعاف ما يصلح الأول.

هذا الدرس عن جعل حالات الفشل موجّهات جيدة. أسمّي الحزمة «ملف الفشل»، لأنني ميّال إلى الدراما. سمّها ما شئت. الفكرة واحدة.

## ما الذي يحتويه ملف الفشل

أصغر ملف فشل صالح لاختبار Playwright فاشل:

- **اسم الاختبار ومسار الملف.** بديهي، وغالبًا ما يغيب عن خطأ منسوخ ولصوق.
- **التأكيد الذي فشل.** ماذا توقّع الاختبار؟ وماذا حصل؟ الطرفان معًا، لا رسالة الفشل وحدها.
- **لقطة شاشة للصفحة عند لحظة الفشل.** يلتقطها Playwright لك إن طلبت منه ذلك.
- **لقطة DOM كاملة عند لحظة الفشل.** يتضمّنها ملف التتبّع في Playwright.
- **سجلات الطرفية من المتصفّح أثناء تشغيل الاختبار.** وهي أيضًا في التتبّع.
- **طلبات الشبكة التي حدثت أثناء الاختبار.** وهي أيضًا في التتبّع.
- **أمر إعادة الإنتاج.** لا «الاختبار فشل» — بل أمر shell الحرفي الذي يعزل هذا الاختبار.

إن كان ملفك يحتوي كل هذه إضافةً إلى عنوان يقول «هذا ما فشل ولماذا»، فلدى الوكيل كل ما يحتاجه ليقترح إصلاحًا دون أن يسألك سؤالًا واحدًا.

الخبر الجيد: يلتقط Playwright معظم هذا لك سلفًا. كل ما عليك هو تفعيله وتوجيهه إلى مكان يستطيع الوكيل قراءته.

## تفعيل التتبّعات ولقطات الشاشة والفيديوهات

في `playwright.config.ts`، استخدم [خيارات تهيئة التتبّع](https://playwright.dev/docs/api/class-testoptions#test-options-trace):

```typescript
export default defineConfig({
  outputDir: 'playwright-report/test-results',
  use: {
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
  },
});
```

ثلاثة مقابض.

`trace: 'retain-on-failure'` يخبر Playwright بتسجيل ملف تتبّع (`trace.zip`) لكل اختبار يفشل، والتخلّص منه لكل اختبار ينجح. ويتضمّن التتبّع لقطات DOM، ولقطات شاشة، وسجلات شبكة، وسجلات طرفية، وسجل إجراءات Playwright الكامل. وهو أكثر أثر كثيف المعلومات في المنظومة كلها. يمكنك فتحه بـ`npx playwright show-trace trace.zip` والحصول على خط زمني تفاعلي كامل للاختبار عبر [عارض التتبّع](https://playwright.dev/docs/trace-viewer).

`screenshot: 'only-on-failure'` يكتب صورة PNG واحدة للصفحة في لحظة فشل التأكيد. هذه هي الصورة التي تطعمها للوكيل. إنها مكرّرة مع التتبّع لكنها أرخص وصولًا — ملف واحد يُفتح فورًا.

`video: 'retain-on-failure'` يسجّل الاختبار كله فيديو. أستخدم هذا أقل ممّا توقّعت. فالفيديو لاختبار صعب على الوكيل استهلاكه (معظم الوكلاء لا يستطيعون مشاهدة الفيديو)، ونادرًا ما يكون أنفع للبشر من التتبّع. أُبقيه مفعّلًا لأنه مجاني، لكنني لن أفتقده لو لم يكن.

## تقرير HTML هو الباب الأمامي لملف الفشل

`playwright.config.ts`:

```typescript
reporter: [
  ['html', { open: 'never', outputFolder: 'playwright-report/html' }],
  ['json', { outputFile: 'playwright-report/report.json' }],
  ['list'],
],
```

يكتب مُبلِّغ HTML الملف `playwright-report/html/index.html`، ويعرض لكل اختبار فاشل التأكيد، ولقطة الشاشة، ومكدّس الخطأ، ورابطًا لفتح التتبّع. افتحه في متصفّح فتحصل على ملف فشل بديع وسهل القراءة بلا أي جهد.

> **أسهل طريقة لترى هذا يعمل**
>
> إن أردت أن ترى خط أنابيب آثار Playwright من طرف إلى طرف دون أن تزرع علة مصطنعة في التطبيق، فانقل مؤقتًا أحد خطوط الأساس المُودَعة في المستودع للانحدار البصري وشغّل الاختبار البصري المطابق. ينتج عن ذلك `report.json`، ولقطة شاشة محفوظة، وفيديو محفوظ، وملف `trace.zip` تحت `playwright-report/test-results/` من فشل متعمّد واحد يمكنك التراجع عنه في التزام واحد. وحين تبني مُلخِّص ملف الفشل من المختبر المرافق، ينتج التشغيل نفسه أيضًا `playwright-report/dossier.md`.

![تقرير Playwright بصيغة HTML بعد فشل متعمّد في Shelf](/images/kinney/da9e47276d7154c2.webp)

يمنع العلم `open: 'never'` Playwright من فتح تبويب متصفّح تلقائيًا عند تشغيل الاختبارات، وهو أمر مزعج في التكامل المستمر ومشتّت محليًا.

في Shelf، أسهل كسر متعمّد هو تعديل عنوان الصفحة الرئيسية في `src/routes/+page.svelte` — غيّر `Build a shelf that remembers what you actually read` إلى أي شيء آخر فيصبح `tests/smoke.spec.ts` أحمر عند تأكيده `getByRole('heading', { ... })`. إنه تغيير واجهة صاخب لا يمسّ المصادقة ولا البيانات المزروعة. شغّل المجموعة عبر `npm run test` حين تريد مجموعة آثار Playwright الحقيقية، وأبقِ البوابات الأساسية الأخرى في الحلقة أيضًا كي يظلّ المستودع صادقًا وأنت تكرّر على الفشل.

## جعل ملفات الفشل قابلة لقراءة الوكيل

هنا يصبح الدرس مثيرًا. تقرير HTML رائع للبشر. وهو *مقبول* للوكلاء. يستطيع الوكيل قراءة نظام الملفات، فيمكنه تقنيًا العثور على رسائل الخطأ. لكنه أفضل بكثير إن استطاع الوكيل أن يطلب «ملف الفشل الخاص بآخر اختبار فاشل» ويحصل على ملخّص منظّم.

يستحقّ مُلخِّص ملف الفشل أن يُكتب. إنه سكربت من نحو 50 سطرًا يقوم بما يلي:

1. يقرأ `playwright-report/report.json` بعد تشغيل الاختبارات.
2. يعثر على الاختبارات الفاشلة.
3. يستخرج لكل واحد منها رسالة الخطأ، ومسار لقطة الشاشة، والتتبّع المحفوظ، وأمر إعادة الإنتاج.
4. يكتب ملف `dossier.md` واحدًا يحتوي كل ذلك، مرتبطًا بالمرفقات.

### كيف يبدو تقرير Playwright

قبل أن نسير في التقرير، يساعد أن ترى الشكل الذي تسير فيه. يكتب مُبلِّغ JSON شجرة متداخلة: `suites` في الأعلى، ولكل منها `suites` و`specs` خاصة بها، ولكل `spec` اختبارات `tests`، ولكل `test` نتائج `results`، ولكل `result` فاشل `error` إضافة إلى `attachments`. والشكل المختصر أدناه *توضيحي* — فمواصفة `tests/rate-book.spec.ts` ومشروع Playwright المسمّى `authenticated` المشار إليهما في المثال طموحان: يُضافان في مختبرات لاحقة (التجهيزات، والمشاريع، والحالة الحتمية). أما مع المشروع الانطلاقي البسيط الحالي، فالسير نفسه يمرّ على `tests/smoke.spec.ts` مع `projectName` فارغ. البنية هي المقصد:

```json
{
  "suites": [
    {
      "suites": [],
      "specs": [
        {
          "title": "user can rate Station Eleven",
          "file": "tests/rate-book.spec.ts",
          "line": 9,
          "tests": [
            {
              "projectName": "authenticated",
              "results": [
                {
                  "status": "failed",
                  "error": { "message": "expect(...).toHaveText failed ..." },
                  "attachments": [
                    {
                      "name": "screenshot",
                      "contentType": "image/png",
                      "path": "playwright-report/test-results/.../test-failed-1.png",
                    },
                    {
                      "name": "trace",
                      "contentType": "application/zip",
                      "path": "playwright-report/test-results/.../trace.zip",
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
  ],
}
```

الحقول المهمة، بالترتيب الذي سيصل إليه السائر:

- `suites[].suites[]` — المجموعات تتداخل، لذا فالسائر تعاودي.
- `specs[].title` و`specs[].file` و`specs[].line` — هذه هي الحقول التي تعرّف الاختبار.
- `tests[].projectName` — مشروع Playwright (مثل `authenticated` و`public`) الذي أنتج النتيجة. سنستخدمه لبناء أمر إعادة الإنتاج.
- `results[].status` — افحص هل هو `failed` أو `timedOut`.
- `results[].error.message` — سلسلة الخطأ الأساسية القابلة للقراءة البشرية.
- `results[].attachments[]` — لكل مرفق `name` و`contentType` و`path`. وتصل لقطات الشاشة بصيغة `image/png`، والتتبّعات بصيغة `application/zip` (وتُسمّى أيضًا `trace`)، والفيديوهات بصيغة `video/webm`.

الآن السكربت. إنه يسير في شجرة المجموعات، ويرشّح النتائج الفاشلة، ويعرض كل واحدة في قسم markdown.

```typescript
// scripts/summarize-failure-dossier.ts
import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';

const reportJson = JSON.parse(readFileSync('playwright-report/report.json', 'utf8'));

function collectSpecs(suites: any[]): any[] {
  return suites.flatMap((suite: any) => [
    ...(suite.specs ?? []),
    ...collectSpecs(suite.suites ?? []),
  ]);
}

const failures = collectSpecs(reportJson.suites ?? []).flatMap((spec: any) =>
  (spec.tests ?? []).flatMap((test: any) => {
    const failedResult = (test.results ?? []).find(
      (result: any) => result.status === 'failed' || result.status === 'timedOut',
    );
    return failedResult ? [{ spec, failedResult, projectName: test.projectName }] : [];
  }),
);

const screenshot = (attachments: any[]) => {
  const file = (attachments ?? []).find((a: any) => a.contentType?.startsWith('image/') && a.path);
  return file ? `**Screenshot**: [${path.basename(file.path)}](${file.path})\n` : '';
};

const trace = (attachments: any[]) => {
  const file = (attachments ?? []).find((a: any) => a.name === 'trace' && a.path);
  return file ? `**Trace**: \`npx playwright show-trace ${file.path}\`\n` : '';
};

const markdown = failures
  .map(
    ({ spec, failedResult, projectName }: any) => `
## ${spec.title}

**Project**: \`${projectName}\`

**File**: \`${spec.file}:${spec.line}\`

**Error**:
\`\`\`
${failedResult.error?.message ?? 'Unknown error'}
\`\`\`

${screenshot(failedResult.attachments)}${trace(failedResult.attachments)}
**Reproduce**:
\`\`\`sh
npx playwright test --project=${projectName} ${spec.file} -g ${JSON.stringify(spec.title)}
\`\`\`
`,
  )
  .join('\n---\n');

writeFileSync(
  'playwright-report/dossier.md',
  markdown || '# Playwright failure dossier\n\nNo failing tests.\n',
);
console.error(`Wrote dossier for ${failures.length} failures`);
```

> **حلّ الدورة يتضمّن النسخة الإنتاجية**
>
> لا يشحن المشروع الانطلاقي Shelf الملف `scripts/summarize-failure-dossier.ts`. أنت تضيفه في [مختبر: ابنِ ملف فشل من أجل Shelf](https://stevekinney.com/courses/self-testing-ai-agents/lab-build-a-failure-dossier-for-shelf). ونسخة المختبر المكتملة تنفيذ أطول ومكتوب بأنواع كاملة لهذا المخطّط، وهي تختار أيضًا مرفق `diff` قبل خط الأساس في حالات فشل الانحدار البصري، وتتحرّز من أن يكون `result.error` غير معرّف عبر `result.errors[0]`، وتجعل كل مسار مرفق نسبيًا إلى جذر المستودع. اقرأ المخطّط أعلاه لتفهم السير، ثم افتح حلّ المختبر أو تنفيذك الخاص لترى الشكل الإنتاجي.

### مقتطف تمثيلي من `dossier.md` لتشغيل فاشل

هكذا سيبدو ملف markdown المولّد بعد اختبار تقييم كتاب فاشل عمدًا في نسخة من Shelf مرّت سلفًا بمختبرات التجهيزات والمشاريع اللاحقة. (وفي المشروع الانطلاقي الحالي، ينتج السير نفسه مدخلًا لأي تأكيد تكسره في `tests/smoke.spec.ts`، مع `projectName` فارغ.)

```markdown
# Playwright failure dossier

## user can rate Station Eleven

**Project**: `authenticated`

**File**: `tests/rate-book.spec.ts:9`

**Error**:

\`\`\`
Error: expect(locator).toHaveText(expected) failed
Locator: getByRole('status')
Expected string: "Thanks"
Received string: ""
\`\`\`

**Screenshot**: [test-failed-1.png](./playwright-report/test-results/.../test-failed-1.png)

**Trace**: `npx playwright show-trace playwright-report/test-results/.../trace.zip`

**Reproduce**:

\`\`\`sh
npx playwright test --project=authenticated tests/rate-book.spec.ts -g "user can rate Station Eleven"
\`\`\`
```

هذا بالضبط ما تريده في يد الوكيل: عنوان الاختبار، والمشروع الذي عاش فيه، والملف والسطر، ورسالة الخطأ الكاملة، ورابط لقطة الشاشة، وسطر واحد لفتح التتبّع، وأمر إعادة إنتاج يعزل هذا الاختبار وحده. يقرأ الوكيل ملفًا واحدًا فيعرف ما يفعله بعد ذلك.

(عدّل أسماء الحقول لتطابق إصدار Playwright لديك إن لزم — فمخطّط JSON يتغيّر بين الإصدارات. المقصد هو البنية، لا الواجهة البرمجية الدقيقة.)

ولبديل يتخطّى السكربت المخصّص كليًا ويستخدم النموذج اللغوي نفسه لفرز ملف الفشل إلى JSON مكتوب بأنواع، راجع [مخرجات CLI المنظّمة كغراء للخط الأنابيب](https://stevekinney.com/courses/self-testing-ai-agents/structured-cli-output-as-pipeline-glue). يعلّمك ذلك الدرس `claude -p --json-schema` مع ملف الفشل كمدخل — البيانات نفسها، والمستهلك مختلف.

بعد أن تضيف المُلخِّص من مختبر ملف الفشل، يمكنك إضافة هذا القسم إلى تعليمات وكيلك:

```markdown
## When a test fails

1. Run `npm run dossier` to generate a summary at `playwright-report/dossier.md`.
2. Read the dossier. It contains the error, screenshot path, trace path, and reproduction command for every failing test.
3. Use the reproduction command to rerun just the failing test while iterating.
4. Do not "fix" a failing test by changing the assertion. Fix the underlying code.
5. Do not add `console.log` calls to test files to debug. The trace already has the DOM at every step; open it with `npx playwright show-trace <path>`.
```

صار لدى الوكيل الآن نقطة دخول واحدة منظّمة. أمر واحد، وملف واحد، ومحتوى قابل للتنفيذ في الداخل.

## كيف تسير الحلقة

```
graph LR
  A["Test fails<br/>Red build"] --> B["Trace + screenshots<br/>+ console + network"]
  B --> C["dossier.md generated<br/>structured summary"]
  C --> D["Agent reads dossier"]
  D --> E["Reproduces failure<br/>from command in dossier"]
  E --> F["Inspects screenshot<br/>and trace"]
  F --> G["Proposes fix"]
  G --> H["Rerun test"]
  H -->|Passes| I["✓ Done"]
  H -->|Still fails| D
```

## التقاط الطرفية والشبكة

حيلتان في Playwright تدفعان ثمنهما فورًا في ملف الفشل.

**تمرير طرفية المتصفّح إلى مخرجات الاختبار.** أضف هذا كتجهيز اختبار:

```typescript
// tests/fixtures.ts
export const test = base.extend({
  page: async ({ page }, use) => {
    page.on('console', (msg) => {
      if (msg.type() === 'error' || msg.type() === 'warning') {
        console.error(`[browser ${msg.type()}] ${msg.text()}`);
      }
    });
    page.on('pageerror', (error) => {
      console.error(`[browser pageerror] ${error.message}`);
    });
    await use(page);
  },
});
```

الآن يظهر أي خطأ في طرفية المتصفّح في مخرجات الاختبار. وحين يفشل اختبار، يستطيع الوكيل أن يبحث في المخرجات عن `[browser` ليرى ما كان التطبيق يشتكي منه في اللحظات السابقة للفشل. تبيّن أن نصف حالات الفشل «الغامضة» ليست إلا «آه، كان هناك TypeError في مكوّن ظننّا أنه لا يهم».

**تسجيل فشل الشبكة.** نمط مشابه:

```typescript
page.on('requestfailed', (request) => {
  const failureText = request.failure()?.errorText ?? 'unknown error';
  if (failureText.includes('ERR_ABORTED') || failureText.includes('NS_BINDING_ABORTED')) {
    return;
  }
  console.error(`[network failed] ${request.method()} ${request.url()} - ${failureText}`);
});
page.on('response', async (response) => {
  if (response.status() >= 400) {
    console.error(
      `[network ${response.status()}] ${response.request().method()} ${response.url()}`,
    );
  }
});
```

يظهر في المخرجات كل طلب فاشل، وكل 4xx، وكل 5xx. وحين يفشل اختبار لأن «الزر لم يفعل شيئًا»، يخبر السطر `[network 500]` في المخرجات الوكيل أن الزر *فعل* شيئًا — لكن استدعاء واجهة البرمجة فشل فقط.

## فخّ `console.log`

نصيحة مخالفة للحدس: كفّ عن السماح للوكيل بإضافة عبارات `console.log` إلى الاختبارات كأسلوب تنقيح. يفشل الاختبار، فيضيف الوكيل `console.log(await page.content())` ويعيد تشغيله. هذا يعمل، لكنه نسخة أسوأ ممّا يمنحك التتبّع سلفًا. فالتتبّع يحتوي DOM كاملًا عند كل خطوة، بطوابع زمنية، ومنظّمًا مسبقًا.

القاعدة:

```markdown
- Do not add `console.log` statements to test files to debug failures.
  Read the trace instead: `npx playwright show-trace <path>`. If the
  information you want is not in the trace, either add it as a
  permanent observation (network listener, console forwarder) or
  explain why it's missing.
```

سبب أهمية هذا أن عبارات `console.log` تتراكم. تصل إلى طلبات السحب. وتُشحن إلى التكامل المستمر. وتتجمّع. فملف اختبار فيه خمسة عشر استدعاءً لـ`console.log` هو ملف لا يريد أحد قراءته، وقد أُضيفت الخمسة عشر كلها واحدًا واحدًا بواسطة وكيل يحاول إصلاح فشل.

## ما يمنحك ملف الفشل على جانب الوكيل

هذه هي الحلقة التي تهمّني. يفشل اختبار. يُولَّد ملف الفشل. يشغّل الوكيل Claude Code ويقول:

> اقرأ `playwright-report/dossier.md`. اختر أول فشل. استخدم أمر إعادة الإنتاج لإعادة تشغيل الاختبار معزولًا. انظر إلى لقطة الشاشة. اقرأ التتبّع. اقترح إصلاحًا. طبّق الإصلاح. أعد تشغيل الاختبار. فإن ظلّ فاشلًا، فكرّر.

تلك حلقة تنقيح ذاتية القيادة بالكامل. لا يحتاج الوكيل منك لصق رسائل خطأ. ولا يحتاج منك تشغيل الاختبار. ولا يحتاج منك فتح تقرير HTML. إنه يقرأ ملف الفشل، ويعيد إنتاج الفشل، وينظر إلى الأدلّة، ويكرّر. كل ما تفعله أنت أن تلاحظ متى تتقارب الحلقة وتراجع الإصلاح.

كل جزء من هذا الدرس جزء من تلك الحلقة. ملف الفشل هو نقطة الدخول. والتتبّع هو الدليل. وأمر إعادة الإنتاج هو الفعل. ولقطة الشاشة هي فحص المعقولية.

## الشيء الوحيد الذي يجب تذكّره

الاختبار الفاشل موجّه. والموجّه الجيد محمّل بالأدلّة. التتبّعات، ولقطات الشاشة، وسجلات الطرفية، وأوامر إعادة الإنتاج — كلها تنتمي إلى ملف الفشل، لأن الوكيل لا يستطيع التصرّف إلا بناءً على ما ترفقه. فعّلها مرّة واحدة فتصبح الحلقة أشدّ إحكامًا بدرجة هائلة.

## قراءات إضافية

- [كتابة غلاف MCP مخصّص](https://stevekinney.com/courses/self-testing-ai-agents/writing-a-custom-mcp-wrapper)
- [مختبر: ابنِ ملف فشل من أجل Shelf](https://stevekinney.com/courses/self-testing-ai-agents/lab-build-a-failure-dossier-for-shelf)
