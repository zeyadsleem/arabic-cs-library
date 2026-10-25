---
title: "الانحدار البصري كحلقة تغذية راجعة"
---

أمضيت سنوات أعتبر فيها اختبار الانحدار البصري شأنًا يخصّ CI وحده. تُودِع لقطة شاشة، ثم يقارنها CI باللقطة في التشغيل التالي، ويفشل البناء إن وُجد اختلاف. ميزة لطيفة إن توفّرت، ومزعجة بعض الشيء في صيانتها، فتتجاهلها إن كان وقتك ضيقًا.

ثم بدأت أستخدم الوكلاء بجدّية، فانقلب الأمر رأسًا على عقب. لم يعد الانحدار البصري بالنسبة لي بوابة CI بالدرجة الأولى. بل صار أضيق حلقة تغذية راجعة أملكها لأخبر الوكيل أن تغييره *يبدو* خاطئًا بطرق لن يلتقطها أي تأكيد.

دعني أشرح إعادة التأطير هذه، ثم ننظر في كيفية ربطها فعليًا.

## لماذا يفوّت تأطير CI وحده الفكرة

تسير رواية CI وحدها هكذا: أنت قلق من أن يغيّر أحدهم حشوة زرّ عن غير قصد، أو يقلب لونًا، أو يكسر تخطيطًا، ولن يلتقط ذلك أي اختبار آخر. يلتقطه الانحدار البصري بلقطة شاشة يقارنها بالأساس المُودَع.

هذا صحيح، ولا بأس به. لكن إن كان هذا تأطيرك الوحيد، فأنت تعامل الانحدار البصري كتأمين—تدفع ثمنه مرة واحدة، وتأمل ألّا تحتاجه أبدًا، وتتذمّر عندما يحتاج أساسٌ إلى تحديث.

تأطير الوكيل مختلف. عندما يلمس وكيل واجهة المستخدم، يوجد نوعان من «الخطأ». الأول خطأ في السلوك: زرّ لا يُرسل، أو نموذج لا يتحقّق، أو رابط يقود إلى المكان الخطأ. تلتقط اختبارات Playwright هذه الأخطاء. والثاني خطأ في المظهر: الزرّ موجود ويُرسل فعلًا، لكنه أطول بثلاثة بكسلات مما كان فأصبحت البطاقة تفيض، أو صار النص أبيض على أبيض بسبب مشكلة في التتالي. لا شيء في مجموعة اختباراتك يلتقط ذلك، لأن لا اختبار يؤكّد على المظهر البصري.

إلى أن تضيف فرق لقطة شاشة.

الآن صار لدى الوكيل إشارة. «لقد غيّرت مكوّن الزر. لقطة شاشة صفحة Shelf مختلفة. هذا هو الفرق. هل كان ذلك مقصودًا؟» في معظم الأحيان يكون الجواب «لا، أصلحه من فضلك». وأحيانًا يكون «نعم، حدّث الأساس». في الحالتين، يعرف الوكيل أن شيئًا قد حدث لن تشير إليه أي اختبارات وظيفية.

وهنا الجزء الذي لم أتوقّعه: **الفرق مقروء بالنسبة للوكيل.** يمكنك تمرير فرق انحدار بصري إلى وكيل يستطيع قراءة الصور، وسيخبرك بلغة واضحة بما تغيّر. «الزر في أعلى اليمين أصبح أطول ولم يعد محاذيًا لشريط البحث.» هذه تغذية راجعة حقيقية قابلة للتنفيذ يمكن للوكيل أن يتصرف بناءً عليها دون وجود إنسان في الحلقة.

## الأداة المدمجة في Playwright: `toHaveScreenshot`

يملك Playwright تأكيدًا على لقطات الشاشة يكفي لبناء مجموعة انحدار بصري حقيقية عليه. ليس بلمعان [Chromatic](https://www.chromatic.com/) أو [Percy](https://www.browserstack.com/percy)، لكنه مجاني، ويعمل محليًا، ويُودِع اللقطات في git إلى جانب الشيفرة، ويفعل بالضبط ما نحتاجه لحلقة التغذية الراجعة أثناء التطوير.

[أداة `toHaveScreenshot` في Playwright](https://playwright.dev/docs/test-snapshots) هي الأداة التي سنستخدمها لكل الانحدار البصري في هذه الورشة.

```typescript
test('shelf page matches visual baseline', async ({ page }) => {
  await page.goto('/shelf');
  await expect(page).toHaveScreenshot('shelf-page.png');
});
```

بعد أن تنتهي من المختبر المرافق، سيشغّل Shelf اختبارات بصرية موثّقة داخل مشروع Playwright نفسه المسمّى `authenticated` الذي تستخدمه بقية المجموعة، مع `beforeEach` ينادي `resetShelfContent` كي يبدأ كل فرق من حالة رفّ مزروعة واحدة. إن كان لمشروعك سبب لفصل القراءات البصرية عن الاختبارات الكثيفة الكتابة (مثلًا لأن المجموعتين تتسابقان على بيانات المستخدم نفسه)، فيمكنك توجيه مشروع Playwright ثانٍ إلى ملف حالة تخزين مختلف، لكن لا تلجأ إلى هذا التعقيد قبل أن يفرضه تعارض ملموس.

في التشغيل الأول: يأخذ Playwright لقطة شاشة ويكتبها تحت `tests/visual-authenticated.spec.ts-snapshots/`. يحمل اسم الملف افتراضيًا لاحقة المشروع والمنصّة أيضًا (مثلًا `shelf-page-authenticated-darwin.png`)، لأن `snapshotPathTemplate` الافتراضي في Playwright يضيف `{-projectName}{-snapshotSuffix}` إلى الوسيط الذي مرّرته. يمكنك الإبقاء على تلك اللاحقة أو تجاوز القالب في `playwright.config.ts` إن أردت اسم ملف أقصر. يبقى مجلد اللقطات مسمّى باسم ملف الاختبار، لذا فإن ملفًا مختلفًا باسم `<test-file>.spec.ts` سينتج مجلد `<test-file>.spec.ts-snapshots/` مختلفًا. الاختبار «ينجح» لعدم وجود ما يُقارن به.

في كل تشغيل لاحق: يأخذ Playwright لقطة جديدة ويقارنها بالأساس المُودَع. إن تطابقتا بكسلًا ببكسل (مع هامش تفاوت صغير)، ينجح الاختبار. وإن لم تتطابقا، يفشل الاختبار، ويكتب Playwright ثلاثة ملفات في مجلد التقارير: الأساس، والفعلي، وصورة فرق تُبرز البكسلات المتغيّرة.

أنت تُودِع الأساس في git. وعندما تُجري تغييرًا بصريًا مقصودًا، تعيد توليد الأساس (`--update-snapshots`) في الالتزام نفسه. يرى المراجعون الأساس القديم يُستبدل بالأساس الجديد في الفرق، ويستطيعون الحكم بالنظر إن كان التغيير مقصودًا.

بعد إكمال المختبر المرافق، سيصبح لدى Shelf الملف `tests/visual-authenticated.spec.ts` مستخدمًا `expect.toHaveScreenshot(...)`، مع الأساسات المُودَعة تحت `tests/visual-authenticated.spec.ts-snapshots/`. الطريق المعتاد عبر الحلقة هو `npm run test`، والطريق المركّز هو `npm run test -- --grep visual`، ومسار تحديث الأساس المقصود هو `npm run test -- --update-snapshots`.

## جعل اختبارات لقطات الشاشة موثوقة

الشكوى الأكثر شيوعًا بشأن الانحدار البصري هي «الأساسات دائمًا متقلّبة». وهذا قابل للإصلاح في كل الحالات تقريبًا. ينبع التقلّب في لقطات الشاشة من مصادر محدّدة قليلة، ولكل واحد منها مِقبض محدّد.

**اختلافات رسم الخطوط.** الخط نفسه، ونظام تشغيل مختلف، وتنعيم حواف مختلف. تختبر على جهاز Mac، وتُودِع الأساس، ثم ينتج CI (على Linux) نصًا مختلفًا اختلافًا دقيقًا. الإصلاح هو تشغيل اللقطات في بيئة متّسقة. استخدم صورة Docker الخاصة بـ Playwright في كل مكان، أو شغّل اختبارات اللقطات على CI فقط بصورة Linux مثبّتة. تفضيلي: إجراء التشغيلين في Docker حتى يطابق الأساس على حاسوبك الأساس على CI.

**الحركات والانتقالات.** زرّ بحركة عند التحويم، أو مؤشّر تحميل دوّار، أو انتقال بتلاشٍ تدريجي—أي شيء يتحرّك سيصنع لقطة متقلّبة. يدعم `toHaveScreenshot` في Playwright الخيار `animations: 'disabled'` في الإعداد، وهو يحقن CSS يعطّل الحركات. استخدمه.

```typescript
// playwright.config.ts
export default defineConfig({
  expect: {
    toHaveScreenshot: {
      animations: 'disabled',
      caret: 'hide',
      scale: 'css',
      maxDiffPixelRatio: 0.01,
    },
  },
});
```

`animations: 'disabled'` يُنهي انتقالات CSS. و`caret: 'hide'` يخفي مؤشّر الكتابة الوامض في الحقول (وهو يتغيّر كل نصف ثانية ويُفسد اللقطات). و`scale: 'css'` يضمن أن تستخدم اللقطة بكسلات CSS بصرف النظر عن كثافة بكسلات الجهاز.

**المحتوى الديناميكي.** طابع زمني يقول «قبل دقيقتين» سيصبح «قبل ثلاث دقائق» في التشغيل التالي. صورة رمزية يولّدها المستخدم، أو اقتباس عشوائي لليوم، أو تاريخ ظاهر—أي من هذه سيكسر الفرق. أمامك خياران: محاكاة المحتوى الديناميكي (مثلًا تثبيت `page.clock` وضبط وقت ثابت، أو زرع قاعدة البيانات بمحتوى ثابت)، أو حجب المناطق الديناميكية بخيار `mask`:

```typescript
await expect(page).toHaveScreenshot('shelf-page.png', {
  mask: [page.getByTestId('current-time'), page.getByTestId('user-avatar')],
});
```

تُطلَى المناطق المحجوبة بلون صلب في الأساس والفعلي معًا، لذا لا تؤثر في الفرق أبدًا.

من المقابض قليلة الاستخدام في [واجهة تأكيدات الصفحة](https://playwright.dev/docs/api/class-pageassertions) اثنان: `maskColor` و`stylePath`.

- `maskColor` يغيّر لون الحجب الوردي الصارخ الافتراضي إلى لون أقل تشتيتًا في الفروق.
- `stylePath` يطبّق ورقة أنماط مؤقتة أثناء التقاط اللقطة فقط. استخدمه لإنهاء حركات النبض، أو إخفاء شارة متقلّبة، أو تحييد تضمين مزعج دون تغيير التطبيق نفسه.

```typescript
await expect(page).toHaveScreenshot('shelf-page.png', {
  mask: [page.getByTestId('current-time'), page.getByTestId('user-avatar')],
  maskColor: '#1f2937',
  stylePath: 'tests/fixtures/visual-stabilize.css',
});
```

الجزء الخفي النافع هو `stylePath`. يطبّق Playwright تلك الورقة عبر Shadow DOM والإطارات الداخلية أيضًا، وهو بالضبط نوع الغش المنضبط الذي تحتاجه اختبارات اللقطات أحيانًا. إن نزلت إلى `page.screenshot()` بدلًا من `toHaveScreenshot()`، فالنسخة الأدنى من ذلك المِقبض هي `style` المضمّنة بدلًا من `stylePath`.

**أشرطة التمرير.** تختلف باختلاف نظام التشغيل. تتجاهلها لقطات Playwright افتراضيًا في معظم الإعدادات، لكن تحقّق مرتين إن كان تخطيطك يتضمّن مناطق قابلة للتمرير.

أصلح هذه الأمور الأربعة، تصبح اختبارات اللقطات مملّة وموثوقة. تجاهلها، تصبح أكثر اختبارات مجموعتك تقلّبًا. لا يوجد حلّ وسط.

## لقطات على مستوى المكوّن مقابل لقطات على مستوى الصفحة

اللقطات على مستوى الصفحة هي ما عرضته أعلاه: `expect(page).toHaveScreenshot`. وهي ما تريده لالتقاط انحدارات التخطيط والتغييرات البصرية الكبيرة.

اللقطات على مستوى المكوّن هي ما تريده لالتقاط انحراف نظام التصميم. إن كان لديك مكوّن `<Button>` يُستخدم في كل مكان، فخذ لقطة له في كل حالة (الافتراضية، والتحويم، والتعطيل، والتحميل) وأكّد عليها. الآن إن غيّر أحدهم أنماط الزر الأساسية، تفشل لقطات المكوّن *قبل* أن تسنح لأي لقطة صفحة فرصة الفشل، ويكون الفشل أكثر تحديدًا بكثير.

يتيح لك اختبار المكوّنات في Playwright فعل ذلك، لكن بصراحة، النمط الأبسط في SvelteKit هو أن يكون لديك مسار `/design-system` (أو [Storybook](https://storybook.js.org/) إن كنت تستخدمه بالفعل) يعرض كل مكوّن في كل حالة، ثم تأخذ لقطة صفحة *له*. إنه أقل سحرًا ويستخدم الأدوات نفسها التي تستخدمها بقية مجموعة اختباراتك من طرف إلى طرف.

سيأتي Shelf بمسار `/design-system` لهذا الغرض تحديدًا. اختبار لقطة واحد يغطّيه. نظام التصميم كله تحت الانحدار البصري بسطر شيفرة واحد.

## Chromatic وPercy والأدوات السحابية

اللقطات المدمجة رائعة لحلقة التطوير. لكنها أكثر محدودية من الأدوات السحابية في أمرين:

- **مصفوفة المتصفحات المتعددة.** يشغّل Chromatic لقطاتك عبر Chrome وSafari وFirefox وعدد من أحجام العرض بالتوازي. يستطيع Playwright فعل ذلك أيضًا، لكن كل متصفح مشروع منفصل والتنسيق عليك.
- **سير عمل المراجعة.** واجهة Chromatic على الويب لمراجعة الفروق البصرية (الموافقة، والرفض، ومقارنة الفروع) أفضل بكثير من التحديق في ملفات PNG داخل طلب سحب. لفريق يشحن تغييرات بصرية كثيرًا، تجربة المراجعة تستحق الثمن.

توصيتي: ابدأ بالمدمج. إن وجدت فريقك يغرق في مراجعة الفروق يدويًا، أو احتجت تغطية متعددة المتصفحات، فأضف Chromatic فوقه. لا تمدّ يدك إلى الأداة السحابية أولًا لمجرد أنها أكثر لمعانًا. اللقطات المدمجة تمنح الوكيل التغذية الراجعة التي يحتاجها أثناء التطوير، وهذه هي المشكلة الأصعب.

## تغذية الفروق إلى الوكيل

وهنا الجزء الذي كان جديدًا عليّ.

عندما يفشل اختبار لقطة، يتضمّن تقرير الفشل صورة الفرق. يستطيع Claude Code ووكلاء آخرون يستطيعون قراءة الصور استخدام ذلك الفرق مباشرة.

لكن ثمة تصحيح مهم: هذا **ليس** خطّاف Git.

خطّافات Git مثل تلك الموجودة في [خطّافات Git مع Lefthook](https://stevekinney.com/courses/self-testing-ai-agents/git-hooks-with-lefthook) تعمل عند الالتزام أو الدفع. وهي جيدة لإجبار اختبار اللقطة على العمل قبل أن يغادر الكود جهازك. لكنها ليست المكان المناسب لإثراء دورة الوكيل التالية بالأثر الفاشل.

إن أردت أن يتفاعل الوكيل فورًا بعد فشل اختبار اللقطة، فالتجريد الصحيح هو **خطّاف وكيل**:

- في Claude Code، [خطّاف `PostToolUseFailure`](https://code.claude.com/docs/en/hooks)
- في Codex، [خطّاف Bash من نوع `PostToolUse` أو `PreToolUse`](https://developers.openai.com/codex/hooks)

حتى **14 أبريل 2026**، ما تزال خطّافات Codex مصنّفة تجريبية، وما يزال اعتراض Bash فيها جزئيًا، لذا يستخدم المثال الملموس أدناه Claude Code. والفكرة نفسها تنتقل: افحص أمر الاختبار الفاشل، واعثر على أحدث فرق لقطة على القرص، ثم أعِد ذلك المسار إلى حلقة الوكيل.

كذلك: الخطّاف لا يرفع بايتات PNG حرفيًا إلى سياق النموذج. واجهات الخطّافات الموثّقة تضيف **سياقًا نصيًا**. عمليًا، هذا يعني أن على الخطّاف أن يخبر الوكيل بالضبط أي ملف فرق يفتحه تاليًا.

إليك خطّاف Claude Code أدنى يفعل ذلك:

```json
// .claude/settings.json
{
  "hooks": {
    "PostToolUseFailure": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/visual-diff-feedback.mjs\""
          }
        ]
      }
    ]
  }
}
```

```javascript
// .claude/hooks/visual-diff-feedback.mjs
import fs from 'node:fs';
import path from 'node:path';

const input = JSON.parse(fs.readFileSync(0, 'utf8'));
const command = input.tool_input?.command ?? '';
const cwd = input.cwd ?? process.cwd();

if (!/(playwright|npm run test|pnpm test|bun test)/.test(command)) {
  process.exit(0);
}

const matches = [];

const walk = (dir) => {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (!entry.isFile()) continue;

    if (/(^|[-/])(diff|.*-diff)\.png$/i.test(entry.name)) {
      matches.push({
        file: fullPath,
        mtimeMs: fs.statSync(fullPath).mtimeMs,
      });
    }
  }
};

for (const root of ['playwright-report', 'test-results']) {
  const fullRoot = path.join(cwd, root);
  if (fs.existsSync(fullRoot)) walk(fullRoot);
}

if (matches.length === 0) {
  process.exit(0);
}

const latest = matches.sort((a, b) => b.mtimeMs - a.mtimeMs)[0];
const relativePath = path.relative(cwd, latest.file);

process.stdout.write(
  JSON.stringify({
    decision: 'block',
    reason: 'Playwright screenshot diff detected. Review the diff before changing the baseline.',
    hookSpecificOutput: {
      hookEventName: 'PostToolUseFailure',
      additionalContext: [
        `A screenshot diff was written to ${relativePath}.`,
        'Open that image before touching the snapshot.',
        'If the UI change was intentional, update the baseline deliberately.',
        'If it was not intentional, fix the UI and rerun the test.',
      ].join(' '),
    },
  }),
);
```

ما يمنحك إياه هذا الخطّاف بسيط:

- اختبار اللقطة الفاشل يبقى مصدر الحقيقة
- يحوّل الخطّاف «يوجد فرق في مكان ما داخل `playwright-report/`» إلى «افتح هذا الملف تحديدًا تاليًا»
- يحصل الوكيل على الخطوة التالية كتغذية راجعة منظمة بدلًا من الارتجال انطلاقًا من سطر اختبار أحمر

سيقول الوكيل أشياء مثل: «زر «Rate» أصبح أطول بـ4 بكسلات لأن مكوّن الأيقونة الجديد يحمل حشوة إضافية. مكوّن `ShelfCard` أصبح يفيض الآن. إمّا أن تقلّل الحشوة أو أن تزيد ارتفاع البطاقة.» هذا هو الفرق مقروءًا باللغة الطبيعية، كتوجيه للتعديل التالي.

هذا هو الوكيل يصحّح نفسه بناءً على تغذية راجعة بصرية. لم يكن هذا بعيدًا جدًا من الخيال العلمي. والآن صار خطّافًا صغيرًا في بيئة تشغيل وكيلك.

وثمة سؤال تالٍ طبيعي بعد «هل تغيّرت الواجهة بصريًا؟»: «هل جعل التغيير نفسه التطبيق أبطأ أو أثقل؟» لا تجيب فروق اللقطات عن ذلك. أما [ميزانيات الأداء كحلقة تغذية راجعة](https://stevekinney.com/courses/self-testing-ai-agents/performance-budgets-as-a-feedback-loop) فتفعل.

## قواعد الوكيل

```markdown
## Visual regression

- Page screenshots live in `tests/visual.spec.ts` and use
  `expect(page).toHaveScreenshot(name)`. Baselines are committed.
- Before regenerating a baseline, check that the change is intentional.
  Do not update baselines to "make the test pass."
- When a screenshot test fails, read the diff image in
  `playwright-report/` before proposing a fix.
- Dynamic regions (timestamps, user-generated content, loading
  indicators) must be masked via the `mask` option or mocked via seed
  data. Do not disable the screenshot test to work around flakiness.
- Animations are disabled globally via `playwright.config.ts`. Do not
  re-enable them per test.
```

## الشيء الوحيد الذي يجب تذكّره

الانحدار البصري ليس تأمينًا. إنه قناة تواصل بينك (أو بين وكيلك) وبين الواجهة. كل لقطة فاشلة هي الواجهة تخبرك: «شيء ما تغيّر لم تلاحظه أي من اختباراتك الأخرى.» وبالنسبة للوكيل، إنها حلقة التغذية الراجعة الوحيدة التي تفحص *المظهر*، وتبيّن أن هذا هو بالضبط صنف الأخطاء الذي يُدخله الوكلاء في أغلب الأحيان.

## قراءات إضافية

- [ميزانيات الأداء كحلقة تغذية راجعة](https://stevekinney.com/courses/self-testing-ai-agents/performance-budgets-as-a-feedback-loop)
- [حكاية الانتظار](https://stevekinney.com/courses/self-testing-ai-agents/the-waiting-story)
- [مختبر: ربط الانحدار البصري بحلقة التطوير](https://stevekinney.com/courses/self-testing-ai-agents/lab-wire-visual-regression-into-the-dev-loop)
