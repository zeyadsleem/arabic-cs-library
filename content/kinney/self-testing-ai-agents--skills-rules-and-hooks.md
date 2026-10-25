---
title: "المهارات والقواعد والخطّافات"
lang: ar
source: "https://stevekinney.com/courses/self-testing-ai-agents/skills-rules-and-hooks"
---

في هذه المرحلة تعرف كيف يبدو ملف `CLAUDE.md` الجيد. ذلك الملف واحد من ثلاث طبقات يمنحك إياها Claude Code لتشكيل سلوك الوكيل. والطبقتان الأخريان هما **المهارات** و**الخطّافات**، وأكثر خطأ أراه هو اختيار الطبقة الخطأ للمشكلة.

قبل أن يُنزلك الدرس التالي في خطّافات Git، لنضبط التصنيف. فالطبقات الثلاث كلها قد تشير إلى النتيجة نفسها. والسؤال هو مَن يسحب الزناد: الوكيل نفسه (قاعدة)، أم الوكيل حين يتعرّف على إشارة (مهارة)، أم النظام (خطّاف).

## الطبقات الثلاث في لمحة

| الطبقة | الصيغة | الإنفاذ | متى تعمل | الأنسب لـ |
| --- | --- | --- | --- | --- |
| القواعد | Markdown (`CLAUDE.md`، الذاكرة) | إرشادية | بداية الجلسة | الأعراف التي يتبعها الوكيل افتراضيًا |
| المهارات | `.claude/skills/<name>/SKILL.md` | عند الطلب | حين يستدعيها الوكيل | سير عمل مسماة متعددة الخطوات تستحق التغليف |
| الخطّافات | `.claude/settings.json` + سكربت | مفروضة | كل نداء أداة مطابق | حدود صارمة وسياق تلقائي عند أحداث محددة |

## القواعد: «اقرأ هذا قبل أن تتصرّف»

`CLAUDE.md` هو العلم الرائد. أي شيء تضعه فيه يصبح جزءًا من سياق المحادثة قبل أن يفعل الوكيل أي شيء آخر. وقد غطّينا ما يفصل القاعدة المفيدة عن عديمة الفائدة في [درس التعليمات](https://stevekinney.com/courses/self-testing-ai-agents/instructions-that-wire-the-agent-in): كل سطر يجب أن يكون شيئًا يستطيع الوكيل التصرّف فيه آليًا.

المقايضات:

- *رخيصة الكتابة.* تستطيع إضافة سطر في ثلاثين ثانية.
- *بلا إنفاذ إطلاقًا.* يمكن للوكيل أن يمرّ عليها سريعًا أو ينساها أو يعيد تفسيرها.
- *تتراكم مع الطول.* كلما طال الملف، قلّ اتباع كل قاعدة بثبات.

استخدم القواعد حين يكون السلوك متكررًا وسهل الوصف وتثق بأن الوكيل سيمتثل في معظم الأوقات. معظم الأعراف تنتمي إلى هنا. وتجاوز القواعد حين يجب أن يكون الامتثال 100% — حدّ أمني، أو متطلّب التزام يحمل العلامة، أو ملف يجب ألا يُعدَّل. ارفع تلك إلى خطّاف.

## المهارات: «هذا سير عمل مغلّف»

تعيش المهارات كمجلدات مسماة تحت `.claude/skills/<name>/`، ولكل منها ملف `SKILL.md` إضافة إلى سكربتات ووثائق اختيارية. ويستدعي الوكيل المهارة (أو مستخدم يكتب `/skill-name`) حين يطابق السياق.

أصغر مهارة قابلة للعمل ملف markdown فيه frontmatter:

```markdown
---
name: triage-failing-test
description: Invoke when a Playwright test fails. Classify the flake into one of four buckets and propose the matching fix.
---

Run `npm run dossier`. Read `playwright-report/dossier.md`.

For each failing test, classify the failure into one bucket:

1. **Timing race** — fix with `page.waitForResponse`, never by bumping timeouts.
2. **Shared state leak** — fix with a fixture teardown, not `beforeEach` discipline.
3. **Locator ambiguity** — fix with a region-scoped locator.
4. **Config / auth mismatch** — fix the project, storage state, or `dependencies: ['setup']`.

Name the bucket, cite the line, and propose the minimal fix.
```

المقايضات:

- *قابلة للتغليف.* قابلة لإعادة الاستخدام بين المشاريع، وللمشاركة، وللإصدارات.
- *الاستدعاء يعتمد على السياق.* إن لم يتعرّف الوكيل على وقت الوصول إلى المهارة، بقيت في مجلدها بلا لمس.
- *سطح تأليف أكبر.* أنت تكتب مطالبة صغيرة، لا نقطة واحدة.

استخدم المهارات حين تتكرّر المهمة، وتكون لها خطوات متميزة، وتستفيد من مطالبة مخصصة. حلقة قراءة ملف التشخيص، وإجراء فرز الأثر، ومسبار «التحقّق من صفحة الرف» كلها مرشحات جيدة لمهارة. وتجاوز المهارات حين يكون سير العمل لمرة واحدة، أو حين تحتاج فعليًا أن يشغّله الوكيل *كل* مرة — فذاك خطّاف.

## الخطّافات: «النظام سيفرض هذا»

تُسجَّل الخطّافات مقابل نداءات الأدوات. وقد غطّى الدرس السابق الميكانيكا (`PreToolUse`، `PostToolUseFailure`، `$CLAUDE_PROJECT_DIR`، عقد JSON). والنسخة القصيرة: الخطّاف تسجيل JSON زائد سكربت قابل للتنفيذ يعمل قبل نداء أداة أو بعده، ويستطيع رفضه أو السماح به أو حقن سياق.

المقايضات:

- *حتمية.* لا يستطيع الوكيل تجاوز خطّاف.
- *كلفة تشغيلية.* كسر خطّاف يكسر حلقة الوكيل. وإن كانت عدوانية أكثر من اللازم، صنعت لنفسك تذاكر.
- *تعمل كل مرة.* إن كان الفحص بطيئًا، كانت حلقة الوكيل بطيئة.

استخدم الخطّافات حين يكون التجاوز مكلفًا، أو حين تريد أن يتلقّى الوكيل *دائمًا* سياقًا معينًا عند حدث محدد. حظر `--no-verify`، ومنع تعديل `eslint.config.js`، وإرفاق ملف التشخيص تلقائيًا بعد تشغيل اختبار، كلها حالات استخدام طبيعية للخطّافات. وتجاوز الخطّافات حين تؤدي قاعدة زائد قاعدة lint المهمة نفسها — فالطبقة الثابتة التي تبنيها لاحقًا في الدورة هي الجواب الصحيح غالبًا، والخطّافات هي المستوى التالي بعدها.

## مقارنة ملموسة

لنأخذ سيناريو واحدًا — *ينبغي للوكيل أن يراجع ملف التشخيص حين يفشل اختبار Playwright* — ونعرض الطبقات الثلاث كلها وهي تحلّه.

### كقاعدة

```markdown
## When a test fails

- Run `npm run dossier` first. Read `playwright-report/dossier.md` before proposing a fix.
- Do not modify the assertion to make the test pass.
```

سهلة الكتابة. تعمل معظم الوقت. وتفشل حين يجرّب الوكيل الإصلاح «البديهي» أولًا ولا يمدّ يده إلى ملف التشخيص إلا بعد المحاولة الثانية أو الثالثة.

### كمهارة

`.claude/skills/test-failure-dossier/SKILL.md`:

```markdown
---
name: test-failure-dossier
description: Invoke after a Playwright test fails. Produces a structured dossier and names likely root causes.
---

Run `npm run dossier`. Read `playwright-report/dossier.md`. For each failing test, output:

- the failing assertion,
- the most recent non-test file in the stack,
- the three most likely root causes with file paths,
- the bucket from the flaky-triage framework (timing, state, locator, or config).
```

صار لدى الوكيل الآن نقطة دخول مسماة. حين يرى «فشل اختبار Playwright»، تكون المهارة خطوة تالية معقولة، وتكون الخطوات مشفّرة مرة واحدة. أفضل من قاعدة لأن سير العمل مغلّف. لكنها ما زالت تعتمد على أن يتعرّف الوكيل على الإشارة ويمدّ يده إليها.

### كخطّاف

`.claude/settings.json`:

```json
{
  "hooks": {
    "PostToolUseFailure": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": "node \"$CLAUDE_PROJECT_DIR/.claude/hooks/dossier-on-failure.mjs\""
          }
        ]
      }
    ]
  }
}
```

و`.claude/hooks/dossier-on-failure.mjs`:

```javascript
import fs from 'node:fs';
import { execSync } from 'node:child_process';

const input = JSON.parse(fs.readFileSync(0, 'utf8'));
const command = input.tool_input?.command ?? '';

if (!/playwright|npm run test|pnpm test/.test(command)) {
  process.exit(0);
}

try {
  execSync('npm run dossier', { stdio: 'ignore' });
} catch {
  // Dossier generation is best-effort; fall through and let the agent see
  // whatever the test runner already produced.
}

if (fs.existsSync('playwright-report/dossier.md')) {
  const dossier = fs.readFileSync('playwright-report/dossier.md', 'utf8');
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: {
        hookEventName: 'PostToolUseFailure',
        additionalContext: dossier.slice(0, 8000),
      },
    }),
  );
}

process.exit(0);
```

تنطلق كل مرة يفشل فيها تشغيل Playwright. فيصل ملف التشخيص إلى دور الوكيل التالي سواء طلبه الوكيل أم لا. لا نسيان، ولا «سأفحص الأثر لاحقًا».

لاحظ أن أيا من النسخ الثلاث لا يستبدل الأخرى. فالخطّاف يضمن ظهور السياق. والمهارة تمنح الوكيل (أو إياك) نقطة دخول مسماة للاستدعاء اليدوي حين لا ينطلق الخطّاف — مثل نسخة محلية أعدتها خارج مسار نداء الأداة. والقاعدة توفّر لغة الاحتياط حين لا يتوفر أي منهما، وهي ما يقرأه زميل في الفريق حين يريد فهم الحلقة دون الحفر في `.claude/`. وأنا أستخدم الثلاث معًا في وقت واحد أكثر مما أستخدم أي واحدة منها منفردة.

## كيف تختار

قاعدتي الاستدلالية، بالترتيب:

1. **إن كان lint أو الأنواع أو الاختبارات قادرة على فرضه، فافعل ذلك.** فالطبقة الثابتة أرخص إنفاذ، وتلتقط البشر والوكلاء بالتساوي. وكل شيء في درس [Lint والأنواع كقضبان حماية](https://stevekinney.com/courses/self-testing-ai-agents/lint-and-types-as-guardrails) يفوز قبل أي ضابط خاص بالوكيل.
2. **إن كان السلوك يجب أن ينطلق كل مرة، فاستخدم خطّافًا.** كلفة التجاوز تحدد مدى عدوانيته.
3. **إن كان السلوك سير عمل متكررًا متعدد الخطوات، فاكتب مهارة.** فالمهارات تستحق وزنها حين تُستدعى أكثر من مرتين في الأسبوع.
4. **وإلا فاكتب قاعدة.** وتوقّع أن يتحلّل الامتثال بمرور الوقت. وأعِد زيارة الملف كل ربع سنة.

## أين تعتمد هذه الدورة على كل طبقة

الآن وقد صار لديك التصنيف، إليك خريطة لمكان ظهور كل طبقة بالفعل في الورشة — وأين كنت سأمدّ يدي إلى طبقة مختلفة لو بدأت من جديد.

- **القواعد — مستخدمة بكثافة، وبشكل مناسب.** فـ[مختبر إعادة الكتابة](https://stevekinney.com/courses/self-testing-ai-agents/lab-rewrite-the-bad-claude-md) يدور بالكامل حول طبقة القواعد. تسلسل المحددات، وقائمة «ما معنى الإنجاز»، وحظر «لا تستخدم `--no-verify` أبدًا»، وقاعدة «تبقى النصوص الموجّهة للمستخدم عن الكتب»، كلها تعيش في `CLAUDE.md`. وهذا هو البيت الصحيح لكل منها.
- **الخطّافات — مستخدمة حيث يكون التجاوز مكلفًا.** [الدرس التالي](https://stevekinney.com/courses/self-testing-ai-agents/git-hooks-with-lefthook) يربط خطّاف `PreToolUse` في Claude Code الذي يحظر `--no-verify`، و[جعل خداع قضبان الحماية صعبًا](https://stevekinney.com/courses/self-testing-ai-agents/making-it-hard-to-cheat-the-guardrails) يمدّ ذلك النمط إلى `HUSKY=0` و`LEFTHOOK=0`. و[درس الانحدار البصري](https://stevekinney.com/courses/self-testing-ai-agents/visual-regression-as-a-feedback-loop) يستخدم خطّاف `PostToolUseFailure` لإظهار فروق لقطات الشاشة تلقائيًا. كلها حالات يكون فيها «قد ينسى الوكيل» مكلفًا.
- **المهارات — الفجوة الحالية.** هذه هي الطبقة التي تعتمد عليها الدورة أقل من غيرها، وهي التي كنت سأستثمر فيها تاليًا. ثلاثة مرشحات ملموسة: **`/dossier`** — حلقة قراءة ملف التشخيص في [ملفات التشخيص](https://stevekinney.com/courses/self-testing-ai-agents/failure-dossiers-what-agents-actually-need-from-a-red-build) موثّقة حاليًا كإجراء في CLAUDE.md وسكربت. والمهارة المسماة تجعلها قابلة للاستدعاء من أي وكيل يقرأ مجلد المهارات، وتحمل معها قاعدة «اقرأ الأثر قبل أن تقترح إصلاحًا». **`/triage-flake`** — إطار الدلاء الأربع في [فرز الاختبارات المتذبذبة](https://stevekinney.com/courses/self-testing-ai-agents/flaky-test-triage) منظّم بما يكفي لأن يستفيد الوكيل من مطالبة مخصصة. والمهارة تشفّر خطوة التصنيف وقاعدة «لا تزد المحاولات أبدًا» معًا. **`/verify-shelf`** — MCP المخصص من [كتابة غلاف MCP مخصص](https://stevekinney.com/courses/self-testing-ai-agents/writing-a-custom-mcp-wrapper) أداة حقيقية، لكن السقالة النصية حول *متى* تستدعيها («بعد أي تغيير في `/shelf/*`، شغّل هذا واقرأ JSON») نثر حاليًا. والمهارة تجعل شروط الانطلاق صريحة.
  - **`/dossier`** — حلقة قراءة ملف التشخيص في [ملفات التشخيص](https://stevekinney.com/courses/self-testing-ai-agents/failure-dossiers-what-agents-actually-need-from-a-red-build) موثّقة حاليًا كإجراء في CLAUDE.md وسكربت. والمهارة المسماة تجعلها قابلة للاستدعاء من أي وكيل يقرأ مجلد المهارات، وتحمل معها قاعدة «اقرأ الأثر قبل أن تقترح إصلاحًا».
  - **`/triage-flake`** — إطار الدلاء الأربع في [فرز الاختبارات المتذبذبة](https://stevekinney.com/courses/self-testing-ai-agents/flaky-test-triage) منظّم بما يكفي لأن يستفيد الوكيل من مطالبة مخصصة. والمهارة تشفّر خطوة التصنيف وقاعدة «لا تزد المحاولات أبدًا» معًا.
  - **`/verify-shelf`** — MCP المخصص من [كتابة غلاف MCP مخصص](https://stevekinney.com/courses/self-testing-ai-agents/writing-a-custom-mcp-wrapper) أداة حقيقية، لكن السقالة النصية حول *متى* تستدعيها («بعد أي تغيير في `/shelf/*`، شغّل هذا واقرأ JSON») نثر حاليًا. والمهارة تجعل شروط الانطلاق صريحة.

إن لم تتذكّر من هذا الدرس إلا سطرًا واحدًا: **القواعد إرشادية، والمهارات مغلّفة، والخطّافات مفروضة**. اختر الطبقة التي تطابق بنية إنفاذها كلفة التجاوز. وسيظل بقية الورشة يعرض عليك النمط في الممارسة.

## قراءات إضافية

- [تعليمات تربط الوكيل في الدورة](https://stevekinney.com/courses/self-testing-ai-agents/instructions-that-wire-the-agent-in)
- [خطّافات Git مع Lefthook](https://stevekinney.com/courses/self-testing-ai-agents/git-hooks-with-lefthook)
- [جعل خداع قضبان الحماية صعبًا](https://stevekinney.com/courses/self-testing-ai-agents/making-it-hard-to-cheat-the-guardrails)
- [كتابة غلاف MCP مخصص](https://stevekinney.com/courses/self-testing-ai-agents/writing-a-custom-mcp-wrapper)
