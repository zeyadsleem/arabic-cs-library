---
title: "كتابة تعليمات جيدة"
lang: ar
source: "https://stevekinney.com/courses/self-testing-ai-agents/instructions-that-wire-the-agent-in"
---

> **لنتحدّث عمّا *لا* ينبغي فعله.**
>
> كتابة مجموعة تعليمات مثالية فنّ بحدّ ذاته. تركيزنا اليوم على ما تفعله حين لا تعطي تعليماتك *النتائج* التي تتوقّعها، وكيف تبني نظامًا يفرض تفضيلنا. ومع ذلك، من المنطقي أن ننظر في بعض الأنماط والأنماط المضادّة كي نكون على الصفحة نفسها، وكي نفهم *لماذا* نفعل ما نفعله.

إن كنت قد استخدمت [Claude Code](https://docs.claude.com/en/docs/claude-code/overview)، أو [Cursor](https://cursor.com/)، أو Codex أكثر من عصر واحد، فقد كتبت شكلًا من أشكال ملف التعليمات. [`CLAUDE.md`](https://docs.claude.com/en/docs/claude-code/memory)، `AGENTS.md` — كلها الفكرة نفسها بأسماء ملفات مختلفة. ملف markdown في جذر المستودع يقرأه الوكيل قبل أن يفعل أي شيء آخر.

كتبت الكثير من هذه، ومعظمها كان *سيئًا*. لا سيئًا بمعنى «المعلومة الخاطئة»، بل سيئًا بمعنى «لم يستطع الوكيل أن يفعل شيئًا بما كتبته».

هذا الدرس هو القاعدة الوحيدة التي أريدك أن تأخذها معك عن ملفات التعليمات. يمكن لدورات أخرى أن تعلّمك التصنيف الكامل لأنماط [`CLAUDE.md`](https://docs.claude.com/en/docs/claude-code/memory). سنركّز على شيء واحد: **كيف تستخدم ملف التعليمات لربط الوكيل بحلقة التغذية الراجعة التي سنقضي بقيّة اليوم في بنائها**.

## القاعدة

> أي شيء لا يستطيع الوكيل التصرّف فيه آليًا لا مكان له في ملف التعليمات.

هذه هي. هذه هي القاعدة كلها. إن لم تستطع تخيّل الوكيل يقرأ سطرًا ويفعل شيئًا محدّدًا في الثلاثين ثانية التالية بسببه، فالسطر يشغل مساحة.

## ما الذي تستبعده

معظم ما يكتبه الناس في ملفات التعليمات، بصراحة. فقد تبيّن أن التعليمات الغامضة لا تنفع البشر ولا وكلاء الذكاء الاصطناعي الذين يتظاهرون بأنهم بشر.

- **«اكتب شيفرة نظيفة».** نظيفة بمقياس مَن؟ لا يملك الوكيل أي معيار.
- **«اتّبع أفضل الممارسات».** ممارسات مَن؟ أفضل الممارسات لأي منظومة، وأي عصر، وأي فريق؟
- **«استخدم أسماء متغيّرات جيدة».** هذا تفضيل جمالي مُتنكّر في هيئة توجيه.
- **«كن موجزًا».** سيكون الوكيل موجزًا في ردّ واحد ومطنبًا في التالي.
- **«فكّر بعناية قبل إجراء التغييرات».** إنه نموذج لغوي كبير. ليس فيه رافعة «فكّر بعناية أكبر» يمكنك سحبها من ملف markdown.

لا أنقد هذه لأنها *خاطئة* — فهي ليست خاطئة تمامًا. إنها فقط غير قابلة للتنفيذ. لا يستطيع الوكيل أن يعرف هل اتّبعها. ولا تستطيع أنت أن تعرف هل اتّبعها. إنها انطباعات، والانطباعات لا تصمد إلى الجلسة التالية.

العلامة الأخرى أن تجد نفسك تكتب تعليمات هي في الحقيقة تعليمات *لنفسك* — أشياء كنت تتمنّى أنك تذكّرتها. مكانها قائمة تحقّق أو قالب مراجعة شيفرة، لا طلب الوكيل.

## ما الذي يتضمّنه

الخبر الجيد أن القاعدة مولّدة لا مقصورة على المنع. فحين تكتب فقط أشياء يستطيع الوكيل التصرّف فيها، ينفتح أمامك كثير من المفيد.

أشياء *يستطيع* الوكيل التصرّف فيها آليًا:

- «شغّل `npm run test` قبل أن تعلن انتهاء المهمة. وإن فشل شيء، فاقرأ مخرجات الفشل وأصلحه قبل أن تعود بالنتيجة.»
- «اكتب اختبارًا فاشلًا قبل أن تكتب التنفيذ. أول التزام في المهمة ينبغي أن يكون الاختبار.»
- «حين يفشل اختبار Playwright، اقرأ ملف التتبّع في `playwright-report/trace.zip` قبل أن تخمّن إصلاحًا.»
- «لا تستخدم `page.waitForTimeout` أبدًا. إن أغراك ذلك، فاستخدم `page.waitForResponse` أو `getByRole` مع `expect` بدلًا منه.»
- «حالة `green` في هذه الشيفرة تعني: أن تنتهي `npm run typecheck` و`npm run lint` و`npm run test` جميعًا بالرمز صفر. لا تقل إن مهمة انتهت حتى تخضرّ الثلاثة. وإن أضفت الطبقة الثابتة لاحقًا في الدورة، فمدّد القائمة بـ `npm run knip` و`npm run pre-push`.»

لاحظ القاسم المشترك. كل واحد منها يشير إلى أمر محدّد، أو مسار ملف محدّد، أو واجهة برمجية محدّدة. لا شيء يحتاج تفسيرًا. يقرأ الوكيل القاعدة فيمتثل أو لا يمتثل، ويمكنك أن تعرف أيّهما من الفرق.

في Shelf، تأتي هذه القواعد الملموسة من ملفات حقيقية مباشرة. فأوامر «النجاح يعني النجاح» تعيش في `package.json`، والقواعد الأقوى تشير إلى مواضع فعلية في الشجرة مثل `src/lib/components` أو `tests/` بدلًا من أفكار مبهمة مثل «مجلد المكوّنات». وإن لم تستطع قاعدة أن تسمّي الأمر أو المسار الذي تعتمد عليه، فهي على الأرجح ما زالت غامضة أكثر من اللازم.

## مرتكز «ما معنى النجاح»

إن كنت ستضع شيئًا واحدًا فقط في قواعد وكيلك بعد هذه الورشة، فليكن هذا: **تعريف لما يعنيه «النجاح» في هذه الشيفرة، مع الأوامر الدقيقة.**

نسخة تقوم بالعمل:

```markdown
# Shelf Starter Instructions

Shelf is the starter repository for the **Self-Testing AI Agents** course. It is a real SvelteKit + TypeScript book application, not a generated scaffold.

## What "done" means

A task is not done until all three exit zero, in this order:

1. `npm run typecheck`
2. `npm run lint`
3. `npm run test`

Do not report a task complete with any of these failing. If you later add the static layer, extend this list with `npm run knip` and `npm run pre-push`. If a failure looks unrelated, say so explicitly and link the failing test name in your summary.
```

هذا المقطع وحده يلتقط من مخرجات الوكيل السيئة أكثر من أي عدد من توجيهات «اكتب شيفرة نظيفة». إنه آلي. وقابل للفحص. ويُرمّز الحلقة.

## مثال غير ناجح، قبل وبعد

هذا ملف `CLAUDE.md` حقيقي كنت سأكتبه قبل عامين. ولست فخورًا به.

```markdown
# Project Guidelines

- Write clean, readable code
- Follow best practices for TypeScript
- Use descriptive variable names
- Add comments where appropriate
- Test your changes
- Consider edge cases
- Be mindful of performance
```

كل واحدة من تلك النقاط صحيحة. وكل واحدة منها أيضًا عديمة النفع للوكيل. لا أمر يُشغَّل، ولا ملف يُفتح، ولا قاعدة تفشل بصوت عالٍ حين تُخترق.

وهذا هو النصف الافتتاحي من ملف `CLAUDE.md` الحالي في Shelf:

```markdown
# Shelf Starter Instructions

Shelf is the starter repository for the **Self-Testing AI Agents** course. It is a real SvelteKit + TypeScript book application, not a generated scaffold.

## What "done" means

A task is not done until all three exit zero, in this order:

1. `npm run typecheck`
2. `npm run lint`
3. `npm run test`

Do not report a task complete with any of these failing. If you later add the static layer, extend this list with `npm run knip` and `npm run pre-push`. If a failure looks unrelated, say so explicitly and link the failing test name in your summary.

## Routes

- Public: `/`, `/login`, `/design-system`, `/playground`
- Protected: `/search`, `/shelf`, `/goals`, `/admin` — gate server-side on `locals.user`, never with client guards
- Do not reintroduce `src/routes/demo/` or any generated starter pages
- New routes must match the Shelf product domain (books, shelves, ratings)

## How tests get written

- Write a failing test before the implementation. Commit the test first.
- Unit tests live next to the file under test as `<name>.test.ts` and run with Vitest.
- End-to-end tests live in `tests/end-to-end/` and run with Playwright.
- Seed JSON lives in `tests/data/`. Later labs introduce `tests/fixtures/` for HARs and other artifacts. Share data from those paths instead of redefining it per spec.

## Playwright locator rules

- `getByRole` first. `getByLabel` or `getByText` second. `data-testid` only when semantics genuinely don't exist.
- Never use raw CSS or XPath selectors in specs.
- Never use `page.waitForTimeout` or `page.waitForLoadState('networkidle')`. Use `expect(locator).toBeVisible()`, `page.waitForResponse`, or `page.waitForRequest`.
- When a Playwright test fails, open `playwright-report/index.html` and its trace before proposing a fix.
```

يستمر الملف الانطلاقي المشحون بقواعد نصوص واجهة المستخدم وقائمة قصيرة «لا تفعل»، وستنمّي الدورة الملف عبر المختبرات اللاحقة بأقسام عن المصادقة، والتهيئة بالبيانات، وملفات HAR، وإتاحة الوصول، وفرز الأعطال، والتحليل الثابت، والخطّافات. المهم في هذا الدرس هو النمط: كل قسم يسمّي أوامر أو مسارات أو واجهات برمجية أو تعديلات محرّمة بعينها.

لاحظ عائلة القواعد الأخيرة في الملف الحقيقي. فملفات التعليمات يجب أن تُبقي الوكيل صادقًا في أكثر من الأوامر وقواعد التدقيق — يجب أيضًا أن تمنعه من تسريب السقالات إلى المنتج. فالوكيل الذي يكتب بلطف «Loading seeded fixtures…» في صفحة رفّ حقيقية ليس بارعًا؛ إنه ينزف طبقة الاختبار إلى سطح المنتج. وقاعدة واحدة قابلة للفحص آليًا تمنع ذلك («لا تذكر Playwright أو البيانات المزروعة أو معرّفات الاختبار أو ملفات HAR أو مواد الدورة في نصوص الصفحات المعروضة») بطريقة لا تستطيع «أبقِ الواجهة نظيفة» أن تمنعها.

هذا هو الشكل نفسه الذي عليه بقية القواعد في الملف. فهو يسمّي صنفًا محدّدًا من السلاسل النصية التي يجب ألّا ينتجها الوكيل، ويمكنك رصد المخالفة بقراءة الفرق. وهو أيضًا بالضبط نوع القاعدة التي سيطلب منك مختبر هذا القسم إضافتها إلى تعليمات وكيلك.

كل سطر في النسخة الثانية شيء يستطيع الوكيل *فعله*. النسخة الأولى عبارة عن انطباع. والنسخة الثانية حلقة.

## كيف ينطبق هذا على الوكلاء الآخرين

النمط نفسه يعمل في [Cursor](https://cursor.com/) (`.cursor/rules/*.mdc`)، وCodex ([`AGENTS.md`](https://developers.openai.com/codex/guides/agents-md) بالإضافة إلى [`.rules`](https://developers.openai.com/codex/rules))، وCopilot (`.github/copilot-instructions.md`). تتغيّر أسماء الملفات، ويتغيّر المجلد، ويتغيّر تركيب تحديد النطاق. أما القاعدة فلا تتغيّر. وإن كان ملف تعليماتك مليئًا بالصفات، فستعاني سوءًا أيًّا كان الوكيل الذي يقرأه.

يستحق Codex إشارة خاصة لأنه يقسّم المشكلة إلى قسمين:

- `AGENTS.md` هو حيث تعيش تعليمات المشروع
- ملفات `.rules` هي حيث تعيش سياسة الموافقة على الأوامر خارج العزل

هذا تمييز مهم. فـ `AGENTS.md` يخبر Codex *كيف يتصرّف داخل المستودع*. و`.rules` تخبر Codex *أي الأوامر المصعّدة يجوز له تشغيلها خارج العزل*.

سنعود إلى ملفات التعليمات في كل درس تقريبًا من هنا فصاعدًا. فـ[تسلسل المحدّدات الهرمي](https://stevekinney.com/courses/self-testing-ai-agents/locators-and-the-accessibility-hierarchy) ينتهي قاعدةً في هذا الملف. و[إعداد التدقيق](https://stevekinney.com/courses/self-testing-ai-agents/lint-and-types-as-guardrails) ينتهي قاعدةً في هذا الملف. و[أمر التكامل المستمر المعتمد](https://stevekinney.com/courses/self-testing-ai-agents/ci-as-the-loop-of-last-resort) ينتهي «معنى النجاح» في هذا الملف. فملف التعليمات هو حيث *تُسمّى* للوكيل بقية حلقة الورشة.

## ضبط الأذونات

الأذونات هي النقطة التي يتوقّف عندها «من فضلك لا تلمس هذا» عن كونه طلبًا مؤدّبًا ليصبح حدًّا فعليًا. فإن كان ملف محظورًا حقًا، فلا تخفِ القاعدة في النثر. ضعها في نموذج وصول الوكيل كي تفشل القراءة أو التعديل قبل أن يصيرا فرقًا.

استخدم الأذونات للحدود الثابتة:

- أسرار يجب ألّا يقرأها الوكيل أبدًا
- ملفات إعداد ينبغي أن يتعامل معها الوكيل كقراءة فقط
- مخرجات مولّدة يجب ألّا يعيد الوكيل كتابتها بالخطأ

### Claude

يمنحك Claude Code قواعد أذونات محدّدة النطاق بالمسار في `.claude/settings.json` أو `.claude/settings.local.json`.

إن أردت أن يبقى Claude بعيدًا عن الأسرار كليًا، فارفض استدعاءات `Read(...)` المعنية:

```json
{
  "permissions": {
    "deny": ["Read(./.env)", "Read(/content/private/**)", "Read(//Users/you/.ssh/**)"]
  }
}
```

وإن أردت أن *يرى* Claude ملفًا لكن لا يعيد كتابته أبدًا، فارفض أدوات جهة الكتابة بدلًا من ذلك:

```json
{
  "permissions": {
    "deny": [
      "Edit(/eslint.config.js)",
      "Edit(/eslint.config.ts)",
      "Edit(/.eslintrc*)",
      "Write(/src/generated/**)"
    ]
  }
}
```

هذا المثال الثاني هو النمط الشائع: اجعل المستودع قابلًا للقراءة على نطاق واسع، ثم اقتطع بضعة مسارات للقراءة فقط أو محظورة كليًا.

الفارق الدقيق المهم: قواعد `Read(...)` و`Edit(...)` و`Write(...)` في Claude تنطبق على أدوات Claude المدمجة. وهي *لا* تمنع عملية Bash فرعية من تنفيذ `cat .env` أو `sed -i eslint.config.js`. إن احتجت فرضًا على مستوى نظام التشغيل، فاقرن القواعد بالعزل.

### Codex

يقسّم Codex الأذونات بين آليتين:

- العزل يتحكّم فيما يستطيع الوكيل كتابته دون تصعيد
- `.rules` تتحكّم في الأوامر التي يجوز لـ Codex تشغيلها خارج ذلك العزل

بالنسبة لحدود نظام الملفات، نموذج العزل الموثّق قائم على مساحة العمل، وليس بقواعد منع لكل ملف كما يعرضها Claude. في نمط `workspace-write`، يكون دليل العمل الحالي قابلًا للكتابة افتراضيًا. و`writable_roots` *تضيف* أدلّة فوق ذلك — ولا تستبدل جذر مساحة العمل.

هذا يعني أن أضيق إعداد هو: ابدأ Codex من الدليل الذي تريد أن يكتب فيه.

```bash
codex --cd /Users/you/project/courses/self-testing-ai-agents
```

الآن جذر مساحة العمل *هو* دليل الدرس. وكل ما خارجه مرئي لكن غير قابل للكتابة. وإن احتجت إلى إضافة موضع ثانٍ قابل للكتابة (قل، دليل `tmp/` مشترك)، فاستخدم `writable_roots`:

```toml
sandbox_mode = "workspace-write"

[sandbox_workspace_write]
writable_roots = [
  "/Users/you/project/tmp"
]
```

هذا هو التمييز المهم الذي يجب فهمه: يتيح لك Claude أن تقول «لا تقرأ *هذا الملف*» مباشرة. أما ضوابط نظام الملفات في Codex فأخشن — تُصغّر مساحة العمل لتصغّر نطاق الأثر.

للموافقات خارج العزل، يستخدم Codex ملفات `.rules` مكتوبة بـ `Starlark`. هذا هو التركيب الصحيح لقواعد Codex. فهو ليس JSON ولا TOML ولا مقدّمة markdown.

```starlark
# ~/.codex/rules/default.rules
prefix_rule(
    pattern = ["gh", "pr", "view"],
    decision = "prompt",
    justification = "Viewing pull requests is allowed with approval",
    match = [
        "gh pr view 7888",
        "gh pr view --repo openai/codex",
        "gh pr view 7888 --json title,body,comments",
    ],
    not_match = [
        "gh pr --repo openai/codex view 7888",
    ],
)
```

هناك تفصيلان مهمّان هنا:

- `pattern` يطابق بادئة وسائط دقيقة، لا سلسلة فرعية
- `match` و`not_match` اختبارات مضمّنة يتحقّق منها Codex عند تحميل الملف

بعد أن تضيف ملف `.rules` أو تغيّره، أعد تشغيل Codex كي يعيد تحميل مجموعة القواعد. ثم اختبر القاعدة قبل أن تثق بها:

```bash
codex execpolicy check --pretty \
  --rules ~/.codex/rules/default.rules \
  -- gh pr view 7888 --json title,body,comments
```

إذن النموذج الذهني هو:

- `AGENTS.md`: تعليمات المشروع
- `sandbox_mode` مع `writable_roots`: حدود نظام الملفات القابل للكتابة
- `.rules`: سياسة الأوامر خارج العزل
- [أذونات Claude Code](https://code.claude.com/docs/en/permissions)
- [دليل AGENTS.md في Codex](https://developers.openai.com/codex/guides/agents-md)
- [قواعد Codex](https://developers.openai.com/codex/rules)
- [مرجع إعداد Codex](https://developers.openai.com/codex/config-reference)

## استخدام الخطّافات لفحوص السياسة وقت التشغيل

الأذونات تجيب عن **أي المسارات داخل الحدود**. والقواعد تجيب عن **أي الأوامر خارج العزل ينبغي السماح به أصلًا**. أما الخطّافات فتجيب عن **بالنظر إلى هذا الاستدعاء أو النتيجة بالضبط، هل نسمح به الآن**. تلك هي الطبقة التي تستخدمها حين تعتمد القاعدة على محتوى الملف لا على اسم مسار أو بادئة أمر فحسب.

في هذا المثال نريد فحصين وقت التشغيل:

1. ألّا ندع الوكيل يغيّر إعداد التدقيق أبدًا
2. ألّا ندع الوكيل يعدّل ملفًا يحتوي محتواه على كلمة `autogenerated`

### ميكانيكا الخطّافات التي ينبغي أن تعرفها قبل الأمثلة

قبل الغوص في أمثلة السياسة، ثمة ملاحظات تنطبق على كل خطّاف Claude Code ستكتبه:

- **أنواع الخطّافات.** يُطلق `PreToolUse` قبل تنفيذ استدعاء الأداة ويستطيع رفضه. ويُطلق `PostToolUse` بعد النجاح. ويُطلق `PostToolUseFailure` حين يفشل استدعاء الأداة، وهو المكان الصحيح لإثراء دور الوكيل التالي بسياق تشخيصي. استخدم `PreToolUse` للمنع، و`PostToolUseFailure` للتعافي.
- **`$CLAUDE_PROJECT_DIR`.** يضبط Claude Code هذا المتغيّر البيئي على جذر المستودع وقت التشغيل. استخدمه داخل أوامر الخطّاف كي يُحلّ الخطّاف على نحو صحيح أيًّا كان الدليل الفرعي الذي بدأ منه Claude Code.
- **لغة السكربت.** الخطّافات مجرّد أوامر. تعرض أمثلة هذه الورشة كليهما: `.mjs` يُشغَّل بـ `node` (أقصى قابلية للنقل) و`.ts` يُشغَّل بـ `bun` (موجز إن كان مشروعك يستخدم Bun أصلًا). اختر واحدة لكل مستودع والتزم بها — فخلط بيئات التشغيل داخل `.claude/hooks/` هو كيف تبدأ جلسات تنقيح «لماذا يفشل هذا؟».
- **أبقِ الخطّافات سريعة.** تعمل الخطّافات تزامنيًا في مسار استدعاء الأداة. قراءة ملفات إعداد صغيرة أمر مقبول. أما تشغيل عمليات فرعية، أو الاتصال بالشبكة، أو تشغيل تدقيق كامل، فسيُبطئ كل استدعاء أداة بشكل ملحوظ. إن كان الفحص بطيئًا، فانقله إلى التكامل المستمر أو إلى خطّاف `PostToolUseFailure` حيث يكون التأخير أقل كلفة.
- **التنقيح.** إن لم يُطلق الخطّاف كما هو متوقّع، فتحقّق من صلاحية `.claude/settings.json` كـ JSON، وتأكّد أن السكربت قابل للتنفيذ، وشغّله مباشرةً بحمولة نموذجية على المدخل القياسي: <code><span class="line"><span style="color:#C5E478;font-style:italic">echo</span><span style="color:#D9F5DD"> '</span><span style="color:#ECC48D">{"tool_input":{"command":"git commit --no-verify"}}</span><span style="color:#D9F5DD">'</span><span style="color:#F78C6C"> \</span></span>
<span class="line"><span style="color:#7FDBCA"> |</span><span style="color:#82AAFF;font-style:italic"> node</span><span style="color:#ECC48D"> .claude/hooks/block-no-verify.mjs</span></span></code> رمز الخروج `0` دون أي مخرجات قياسية يعني «اسمح». ورمز الخروج `0` مع حمولة JSON فيها `permissionDecision: "deny"` على المخرجات القياسية يعني «احجب». وأي رمز خروج آخر يظهر كخطأ في الخطّاف.

### Claude

يستطيع Claude فعل ذلك مباشرة لأن خطّافات `PreToolUse` يمكنها اعتراض `Edit` و`Write` قبل تنفيذهما.

سجّل الخطّاف في `.claude/settings.json`:

```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Edit|Write",
        "hooks": [
          {
            "type": "command",
            "command": "bun \"$CLAUDE_PROJECT_DIR/.claude/hooks/block-protected-edits.ts\""
          }
        ]
      }
    ]
  }
}
```

ثم نفّذ سكربت السياسة:

```typescript
#!/usr/bin/env bun

import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

type ClaudeHookInput = {
  tool_input?: {
    file_path?: string;
  };
};

const input = JSON.parse(readFileSync(0, 'utf8')) as ClaudeHookInput;
const filePath = input.tool_input?.file_path;

if (!filePath) {
  process.exit(0);
}

const lintRuleFiles = new Set([
  'eslint.config.js',
  'eslint.config.ts',
  '.eslintrc',
  '.eslintrc.js',
  '.eslintrc.cjs',
  '.eslintrc.json',
]);

function deny(reason: string): never {
  console.log(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PreToolUse',
        permissionDecision: 'deny',
        permissionDecisionReason: reason,
      },
    }),
  );
  process.exit(0);
}

if (lintRuleFiles.has(path.basename(filePath))) {
  deny('Editing lint rules is blocked by policy.');
}

if (existsSync(filePath)) {
  const currentContents = readFileSync(filePath, 'utf8');

  if (/autogenerated/i.test(currentContents)) {
    deny('Files marked as autogenerated must not be edited by the agent.');
  }
}
```

إن لم تطابق أي من القاعدتين، يخرج السكربت بالرمز `0` دون مخرجات ويكمل Claude. وإن طابقت إحداهما، يعيد الخطّاف `permissionDecision: "deny"` ولا يحدث التعديل أبدًا.

> **إن كنت تسمح بـ Bash أيضًا، فتذكّر أن Bash مسار منفصل. فالأمر الصدفي يمكنه إعادة كتابة الملفات ما لم تحجبه بأذونات Bash أو بالعزل.**

### Codex

خطّافات Codex ما زالت تجريبية، وهي ليست بديلًا عن العزل أو `.rules`. استخدم العزل لحدود نظام الملفات، و`.rules` لسياسة الأوامر البسيطة خارج العزل، والخطّافات حين يعتمد القرار على محتوى الأمر أو الفرق الناتج. واعتبارًا من كتابة هذه السطور، تحتاج إلى تفعيل الخطّافات صراحةً في `.codex/config.toml` قبل أن يعمل أي شيء في هذا القسم (راجع [وثائق خطّافات Codex](https://developers.openai.com/codex/hooks) للتركيب الحالي):

```toml
[features]
codex_hooks = true
```

أو مرّر العلم عند الإطلاق: `codex --enable codex_hooks`.

مع تفعيل الخطّافات، يعترض `PreToolUse` و`PostToolUse` استدعاءات `Bash` فقط، لا `Write` أو `Edit` المدمجتين. لذا نسخة Codex سلك تعثّر صدفي لا نموذج وصول كامل للملفات.

هذا يعني أن الحدّ الصارم ينبغي أن يبقى في العزل و`.rules`. فالخطّاف خطّ الدفاع الثاني: يفحص ما غيّره أمر Bash ويمنع Codex من المتابعة إن لمس الأمر ملفًا محميًا. وللخطّافات المحلّية في المستودع، فضّل الحلّ من جذر git بدلًا من مسار نسبي كي يعمل الخطّاف حتى حين يبدأ Codex في دليل فرعي.

سجّل الخطّاف في `.codex/hooks.json`:

```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "bun \"$(git rev-parse --show-toplevel)/.codex/hooks/review-protected-shell-edits.ts\"",
            "statusMessage": "Reviewing shell edits for protected files"
          }
        ]
      }
    ]
  }
}
```

ثم افحص الملفات المتغيّرة بعد كل أمر Bash:

```typescript
#!/usr/bin/env bun

import { execFileSync } from 'node:child_process';
import { existsSync, readFileSync } from 'node:fs';
import path from 'node:path';

type CodexHookInput = {
  cwd: string;
};

const lintRuleNames = new Set([
  'eslint.config.js',
  'eslint.config.ts',
  '.eslintrc',
  '.eslintrc.js',
  '.eslintrc.cjs',
  '.eslintrc.json',
]);

const input = JSON.parse(readFileSync(0, 'utf8')) as CodexHookInput;
const changedPaths = execFileSync('git', ['diff', '--name-only', '--relative'], {
  cwd: input.cwd,
  encoding: 'utf8',
})
  .split('\n')
  .filter(Boolean);

const violations: string[] = [];

for (const relativePath of changedPaths) {
  const absolutePath = path.join(input.cwd, relativePath);

  if (lintRuleNames.has(path.basename(relativePath))) {
    violations.push(`${relativePath} is a lint configuration file`);
    continue;
  }

  if (!existsSync(absolutePath)) {
    continue;
  }

  const contents = readFileSync(absolutePath, 'utf8');

  if (/autogenerated/i.test(contents)) {
    violations.push(`${relativePath} is marked autogenerated`);
  }
}

if (violations.length === 0) {
  process.exit(0);
}

console.log(
  JSON.stringify({
    decision: 'block',
    reason: 'Protected shell edits detected.',
    hookSpecificOutput: {
      hookEventName: 'PostToolUse',
      additionalContext: `Revert the protected changes and continue without editing those files: ${violations.join('; ')}`,
    },
  }),
);
```

هذا ليس تمامًا كما في Claude. فأمر Bash يكون قد نُفّذ بحلول إطلاق `PostToolUse`، لذا لا يستطيع الخطّاف التراجع عن الآثار الجانبية. وحين يُخرج السكربت `"decision": "block"`، يستبدل Codex نتيجة الأداة بملاحظاتك ويتيح للوكيل الردّ عليها — لكنه لا يتراجع عن الأمر. ما *يستطيعه* هو منع Codex من المضي قدمًا بلا اكتراث كأن شيئًا لم يحدث. وهذا غالبًا كافٍ لفرض حلقة تراجع وإعادة محاولة بدلًا من ترك الوكيل يهيم أبعد عن السياسة.

- [خطّافات Claude Code](https://code.claude.com/docs/en/hooks)
- [خطّافات Codex](https://developers.openai.com/codex/hooks)

## قراءات إضافية

- [الفرضية](https://stevekinney.com/courses/self-testing-ai-agents/the-hypothesis)
- [مختبر: أعد كتابة ملف CLAUDE.md السيئ](https://stevekinney.com/courses/self-testing-ai-agents/lab-rewrite-the-bad-claude-md)
