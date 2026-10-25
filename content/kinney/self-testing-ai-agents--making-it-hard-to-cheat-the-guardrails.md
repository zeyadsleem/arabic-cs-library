---
title: "جعل التلاعب بالقضبان صعبًا"
lang: ar
source: "https://stevekinney.com/courses/self-testing-ai-agents/making-it-hard-to-cheat-the-guardrails"
---

إن استطاع وكيل أن يتحايل على القضيب أول مرة يضيق بها، فذلك لم يكن قضيبًا. كان اقتراحًا بطباعة أنيقة.

خُطّافات [Git](https://git-scm.com/) المحلية ما زالت تستحق الوجود. أحبّ تهيئة سريعة لـ [`Lefthook`](https://github.com/evilmartians/lefthook) أو [`Husky`](https://typicode.github.io/husky/) لأنها تقصّر الحلقة وتُبقي الأخطاء الواضحة على الحاسوب. لكن الخُطّافات طبقة واحدة فقط. سيكتشف الوكلاء بالتأكيد `git commit --no-verify`، ومتغيّرات البيئة الخاصة بتخطي الأدوات، وملفات القواعد القابلة للتحرير، و«ماذا لو غيّرت سير العمل فحسب؟» إن تركت تلك الأبواب مفتوحة.

إذن السؤال الحقيقي ليس «كيف أقول للوكيل ألا يتلاعب؟» السؤال الحقيقي هو: *كم طبقة يجب أن تتفق قبل أن تصل الشيفرة السيئة إلى main؟*

## التحايلات الشائعة

لنسمِّ الواضحة منها، لأن أنماط الفشل غير المسماة تستمر في الظهور في تقارير ما بعد الحوادث.

- `git commit --no-verify`
- مفاتيح التخطي الخاصة بكل أداة مثل `HUSKY=0` أو `LEFTHOOK=0` أو `LEFTHOOK_EXCLUDE=...`
- تحرير `lefthook.yml` أو `.husky/*` أو سكربتات `package.json` أو ملفات القواعد لإضعاف الفحوص
- تغيير CI بحيث لا تعمل الفحوص المكلفة أو ذات المعنى بعد الآن
- الدفع مباشرة إلى فرع مسموح له بتجاوز المراجعة أو الفحوص المطلوبة
- الدفع القسري لإبعاد تاريخ غير مريح بعد خيار محلي سيئ

لا شيء من هذا نظري. هذه بالضبط ما سيجده وكيل سريع الحركة إن كان يحسّن من أجل «نجح الأمر» بدلًا من «التغيير موثوق».

## ابدأ بقاعدة صريحة في التعليمات

الطبقة الأولى ما زالت الأبسط: قل القاعدة بصوت عالٍ في `AGENTS.md` أو `CLAUDE.md` أو `.cursor/rules` أو ملف السياسة المكافئ.

تريد لغة صريحة، لا انطباعات:

```markdown
## Git and verification

- Never use `--no-verify`, `HUSKY=0`, `LEFTHOOK=0`, or other hook-skipping
  flags or environment variables.
- Never weaken hook, CI, or ruleset configuration to make a failing change
  pass. Fix the code or stop and explain the blocker.
- Changes to hook configuration, workflow files, or agent policy files
  require the same review standard as application code.
```

هل تكفي التعليمات وحدها؟ لا. لكنها تفعل أمرين مهمين:

- تجعل السياسة مقروءة
- تعطي طبقة الإنفاذ التالية شيئًا محددًا تُنفّذه

## امنع الأمر السيئ قبل تشغيله

هذا أنظف تحكّم تقني حين تدعمه بيئة تشغيل وكيلك. إن كانت الأداة تستطيع فحص أوامر الصدفة *قبل* التنفيذ، فامنع التحايلات هناك.

النمط أوسع من `--no-verify`. تعامل مع مفاتيح التخطي ومتغيّرات بيئة التخطي كصنف واحد من منافذ الهروب:

```javascript
import fs from 'node:fs';

const input = JSON.parse(fs.readFileSync(0, 'utf8'));
const command = input.tool_input?.command ?? '';

const bypassPattern = /(^|\s)(--no-verify|HUSKY=0|LEFTHOOK=0|LEFTHOOK=false|LEFTHOOK_EXCLUDE=)/;

if (!bypassPattern.test(command)) {
  process.exit(0);
}

process.stdout.write(
  JSON.stringify({
    hookSpecificOutput: {
      hookEventName: 'PreToolUse',
      permissionDecision: 'deny',
      permissionDecisionReason:
        'Do not bypass local verification. Fix the failing guardrail instead.',
    },
  }),
);

process.exit(0);
```

ذلك السكربت هو الجزء القابل للنقل. وصّله بأي بيئة تشغيل تستخدمها:

- [خُطّافات Claude Code](https://docs.claude.com/en/docs/claude-code/hooks) تستطيع منع أمر `Bash` قبل تشغيله.
- [خُطّافات Codex](https://developers.openai.com/codex/hooks) تستطيع فعل الشيء نفسه مع استخدام أداة `Bash`.
- [أذونات Cursor CLI](https://docs.cursor.com/cli/reference/permissions) أخشن، لذا قد تحتاج إلى موافقة على كل أوامر `git` ذات الطابع الكتابي، أو قاعدة منع لـ `Shell(git)` إن أردت حدًّا صلبًا فعلًا.

درس [خُطّافات Git مع Lefthook](https://stevekinney.com/courses/self-testing-ai-agents/git-hooks-with-lefthook) السابق يمشي في الشكل الخاص بكل أداة. الفكرة الأكبر هنا أنك ينبغي أن تحجب *صنف* التحايل، لا علمًا واحدًا فقط.

## اعكس الفحوص المحلية في CI

هذه هي الطبقة الأكثر أهمية.

إن لم تعمل فحوص التنسيق والنوع والوحدة ومن طرف إلى طرف وإمكانية الوصول والملف التعريفي نفسها في CI، فتجاوز خُطّاف محلي يصبح مهمًا فعلًا. أما إن أعاد CI تشغيل المجموعة المرجعية، فيصبح التجاوز المحلي إزعاجًا بدلًا من مشكلة في سلسلة التوريد.

تقسيمي الافتراضي يبدو هكذا:

- قبل الإيداع: تنسيق الملفات المُجهَّزة، والفحص، ومسح الأسرار
- قبل الدفع: فحوص محلية أبطأ لكنها تبقى في حدود دقيقتين
- CI: المجموعة المرجعية الشاملة، تعمل من بيئة نظيفة

جزء «البيئة النظيفة» مهم. ينبغي ألا يرث CI ذاكراتك المؤقتة المحلية، ولا الخوادم المعاد استخدامها، ولا الخدمات المُقلعة يدويًا. ينبغي أن يثبت الفرع من الصفر.

## احمِ طبقة الحماية

إن استطاع وكيل تغيير القواعد التي تقيّمه، فلديك مشكلة حوكمة.

ضع ملفات الحماية تحت ضغط المراجعة نفسه الذي تخضع له شيفرة الإنتاج:

- [`CODEOWNERS`](https://docs.github.com/en/repositories/managing-your-repositorys-settings-and-features/customizing-your-repository/about-code-owners) على `lefthook.yml` و`.husky/**` و`.github/workflows/**` و`.claude/**` و`.codex/**` و`.cursor/**` وملفات السياسة
- مراجعات مطلوبة لتلك المسارات
- تنبيهات في قوالب المراجعة أو أوصاف طلبات السحب حين تتغيّر ملفات البنية التحتية

أحبّ أيضًا أن تكون أسماء فحوص CI مستقرة وواضحة. «typecheck» و«unit» و«end-to-end» و«secret-scan» أصعب في التلاعب من مهمة واحدة مبهمة تُسمّى «verify».

## اجعل قواعد الدمج هي الإنفاذ الحقيقي

على [GitHub](https://github.com/)، حدّ الإنفاذ الذي يمكنك الاعتماد عليه ليس الخُطّاف المحلي. إنه [حماية الفروع](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-protected-branches/about-protected-branches) أو، أفضل من ذلك، [مجموعات القواعد](https://docs.github.com/en/repositories/configuring-branches-and-merges-in-your-repository/managing-rulesets/about-rulesets) مع فحوص الحالة المطلوبة.

مكدّس القضبان الذي أثق به يبدو هكذا:

- طلبات السحب مطلوبة للفروع المحمية
- فحوص الحالة المطلوبة للبوابات نفسها التي تعكسها الخُطّافات
- قيود الدفع القسري على الفروع المحمية
- قواعد إسقاط المراجعة أو متطلبات مراجعة توقف مسار «غيّر سير العمل ثم ادمجه بنفسك»

إن كنت تشغّل خادم Git خاصًا بك، فخُطّافات pre-receive على جانب الخادم أقوى. لكن معظم الفرق تعيش على منصات Git المستضافة، ما يعني أن مجموعات القواعد والفحوص المطلوبة هي الحدّ الذي يُحتسب فعلًا.

## تعامل مع تخطي الخُطّاف كحوادث، لا كميزات

بعض الأدوات توثّق مسارات التخطي لأن البشر يحتاجونها أحيانًا. [`Husky`](https://typicode.github.io/husky/how-to.html) توثّق `HUSKY=0` صراحةً. و[`Lefthook`](https://lefthook.dev/usage/env.html) توثّق `LEFTHOOK=0` و`LEFTHOOK_EXCLUDE` صراحةً. تلك التوثيق ليس إذنًا للوكلاء بالارتجال حول معاييرك. إنه تذكير بأن الخُطّافات المحلية شيفرة في فضاء المستخدم، وبالتالي قابلة للتجاوز.

هذا ينبغي أن يدفعك إلى قرارين:

- أبقِ الخُطّافات سريعة بما يكفي حتى لا يريد الناس تخطيها
- افترض أن التخطي ممكن وابنِ الطبقة التالية على أي حال

الخُطّافات السريعة تقلّل الإغراء. وCI وقواعد الدمج تقلّلان نطاق الضرر.

## راقب التحايل الأخفى

النسخة الأكثر خبثًا ليست `--no-verify`. النسخة الأكثر خبثًا هي إضعاف القاعدة نفسها:

- حذف مهمة من سير العمل
- تغيير اسم فحص مطلوب
- تضييق نمط ملف (glob) حتى تتوقف الخُطّافة عن رؤية ملفات مهمة
- نقل أمر من قبل الدفع إلى «سنفعله لاحقًا»

لهذا أحبّ حماية المسارات على ملفات البنية التحتية، ولهذا أذكرها بالاسم في المراجعة. المشكلة ليست فقط «الوكيل تخطّى الخُطّافة». المشكلة أيضًا «الوكيل جعل الخُطّافة بلا معنى ثم أطاعها تقنيًا».

## قواعد الوكيل

```markdown
## Guardrails

- Never bypass hooks with `--no-verify`, `HUSKY=0`, `LEFTHOOK=0`,
  `LEFTHOOK_EXCLUDE`, or similar escape hatches.
- Never modify hook, workflow, or policy configuration to make a failing
  change pass unless the task is explicitly about changing that
  configuration.
- Local hooks are convenience. CI and merge rules are authority. Keep the
  same critical checks in both places.
- Treat changes to infrastructure guardrails as high-risk edits that require
  explicit review.
```

## الشيء الذي يجب تذكّره

أنت لا تمنع تجاوز القضبان بالتشدد في ملف ماركداون. تمنعه بترصيف السياسة، والمنع قبل التنفيذ، والإعداد المحمي، ومرايا CI، وقواعد الدمج، بحيث لا يكفي أي اختصار منفرد. الخُطّافات المحلية تُبقي الحلقة سريعة. وبقية المكدّس تُبقي الحلقة أمينة.

## قراءة إضافية

- [خُطّافات Git مع Lefthook](https://stevekinney.com/courses/self-testing-ai-agents/git-hooks-with-lefthook)
- [مسح الأسرار مع Gitleaks](https://stevekinney.com/courses/self-testing-ai-agents/secret-scanning-with-gitleaks)
- [CI كحلقة الملاذ الأخير](https://stevekinney.com/courses/self-testing-ai-agents/ci-as-the-loop-of-last-resort)
- [التحقق بعد الدمج وبعد النشر](https://stevekinney.com/courses/self-testing-ai-agents/post-merge-and-post-deploy-validation)
