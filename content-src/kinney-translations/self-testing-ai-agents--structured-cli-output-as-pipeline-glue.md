---
title: "مخرجات سطر الأوامر المُهيكلة كغراء للخطوط الأنابيب"
---

علّمك درس MCP اتجاهًا واحدًا من فكرة العقد المُهيكل: تُغلّف منطق التحقّق لديك في أداة، فيستدعيها الوكيل. ويحصل الوكيل على نتيجة مُنمّطة يستطيع الاستدلال عليها. تلك شيفرتك تخدم الوكيل.

هذا الدرس هو الاتجاه الآخر. *سكربتاتك* تستدعي الوكيل وتحصل على JSON مُنمّط في المقابل. فيصير حكم الوكيل — «هل هذا الفشل تقلّب عابر أم خلل حقيقي»، «هل يُدخل هذا الفرق مشكلة أمنية»، «أي هذه الأخطاء الخمسة هو السبب الجذري» — خطوة في خط أنابيب تستطيع أن تمرّرها على `jq`، وتتفرّع عليها، وتغذّي بها المرحلة التالية. الفرضية نفسها كدرس MCP: عقود مُهيكلة بين الشيفرة والنماذج اللغوية الكبيرة. لكن الاتجاه مختلف.

## الميكانيكا

الأداة الأساسية هي [Claude Code](https://docs.claude.com/en/docs/claude-code/overview) في وضع الطباعة مع قيد مخطّط JSON. والاستدعاء هو:

```bash
SCHEMA=$(jq -c . schema.json)

claude -p --bare \
  --output-format json \
  --json-schema "$SCHEMA" \
  "Analyze the following test output and classify each failure." \
  < playwright-report/dossier.md
```

وثمّة أمور قليلة تحتاج إلى تفكيك.

`--bare` يجعل الاستدعاء محكم الإغلاق (hermetic). فهو يتخطّى اكتشاف `CLAUDE.md`، والخطّافات المحلية، وخوادم MCP، والذاكرة التلقائية. فحين تشغّل Claude كخطوة في خط أنابيب، لا تريد حالة محيطة تتسرّب إلى النتيجة. وينبغي أن يُنتج الأمر المخرجات نفسها على حاسوبك، وفي CI، وعلى جهاز زميل.

`--output-format json` يطلب من Claude أن يُعيد JSON بدلًا من نص عادي. ويحمل المغلّف الخارجي بيانات وصفية عن التشغيل، وبياناتك المُهيكلة تعيش في الحقل `structured_output` على المستوى الأعلى.

`--json-schema "$SCHEMA"` يقيّد الاستجابة لتطابق مخطّطك. ويظلّ Claude قادرًا على استخدام الأدوات والاستدلال للوصول إلى هناك، لكن المخرجات النهائية JSON مُتحقَّق منه ومطابق للشكل الذي عرّفته.

ولاستخراج بياناتك وحدها:

```bash
claude -p --bare \
  --output-format json \
  --json-schema "$SCHEMA" \
  "Classify these failures." \
  < dossier.md \
  | jq '.structured_output'
```

هذه هي المصافحة كلها. أنت تعرّف الشكل، وClaude يملؤه، وسكربتك يقرأه.

> **قابلية النقل**
>
> يستخدم الوضع غير التفاعلي في [Codex](https://openai.com/index/codex/) مسار ملف بدلًا من نص مضمّن: `codex exec --output-schema ./schema.json -o ./result.json "Classify these failures." < dossier.md`. وملف المخطّط هو نفسه — `schema.json` واحد مُودَع، وأداتا سطر أوامر. يقرأه Claude عبر متغيّر صدفة، ويقرأه Codex عبر علم. وإن كنت تعمل عبر عائلات نماذج مختلفة، فالمخطّط هو العقد القابل للنقل.

## المخطّط هو العقد

هذا ما أعنيه بـ«العقد». مخطّط كهذا:

```json
{
  "type": "object",
  "properties": {
    "failures": {
      "type": "array",
      "items": {
        "type": "object",
        "properties": {
          "test_name": { "type": "string" },
          "root_cause": { "type": "string" },
          "suggested_fix": { "type": "string" },
          "confidence": { "type": "string", "enum": ["high", "medium", "low"] },
          "related_files": { "type": "array", "items": { "type": "string" } }
        },
        "required": ["test_name", "root_cause", "suggested_fix", "confidence"]
      }
    }
  },
  "required": ["failures"]
}
```

هذا المخطّط يؤدي الوظيفة نفسها التي يؤديها `outputSchema` في أداة `verify_shelf_page` من درس غلاف MCP. فهو يحبس مرونة النموذج اللغوي الكبير داخل شكل يستطيع سكربتك استهلاكه. فالنموذج يقرّر *ما* السبب الجذري. والمخطّط يقرّر *كيف* يُشكَّل الجواب. وسكربتك اللاحق لا يضطرّ أبدًا إلى تحليل نص حرّ.

أودِع المخطّط في المستودع إلى جانب السكربت الذي يستخدمه. فحين يسأل أحدهم «ماذا تُنتج خطوة الفرز؟»، يكون الجواب `schema.json`.

## فرز ملفّات الفشل

هذا هو النمط الذي أعود إليه أكثر من غيره. علّمك [درس ملفّات الفشل](https://stevekinney.com/courses/self-testing-ai-agents/failure-dossiers-what-agents-actually-need-from-a-red-build) أن تُولّد `dossier.md` — ملخّص ماركداون مُهيكل لكل اختبار فاشل، مع رسائل الأخطاء ومسارات لقطات الشاشة وأوامر إعادة الإنتاج. وذلك الملفّ جيّد بما يكفي ليقرأه الوكيل تفاعليًا.

لكنك تريد أحيانًا أن يقوم سكربت بالقراءة. ربما تُفرز عشرة إخفاقات دفعة واحدة وتريدها مرتّبة بحسب الثقة. وربما تريد فتح مسائل GitHub للإخفاقات منخفضة الثقة وتسليم مرتفعة الثقة إلى الوكيل في خطوة منفصلة ومُتحقَّق منها. وربما تكون الساعة الثانية صباحًا وقد فشل التشغيل الليلي وتريد ملخّصًا مقروءًا آليًا ينتظرك في الصباح.

```bash
#!/usr/bin/env bash
set -euo pipefail

SCHEMA=$(jq -c . scripts/triage-schema.json)

claude -p --bare \
  --output-format json \
  --json-schema "$SCHEMA" \
  --append-system-prompt-file prompts/triage-system.md \
  "Triage every failure in this dossier." \
  < playwright-report/dossier.md \
  | jq '.structured_output.failures[] | select(.confidence == "low")' \
  > needs-human-review.json

echo "$(jq length needs-human-review.json) failures flagged for human review"
```

لاحظ `--append-system-prompt-file`. فبما أن `--bare` يتخطّى `CLAUDE.md`، فملف طلب النظام هو المكان الذي يذهب إليه سياق مستودعك: أي فئات تستخدم، وما معنى «الثقة» في مشروعك، وأي أسماء اختبارات معروفة بالتقلّب. وهو يُضاف فوق طلب النظام الافتراضي في Claude بدلًا من أن يستبدله. أما طلب المستخدم — ملفّ الفشل نفسه — فيأتي عبر المدخل القياسي. أودِع الملفّين في التحكّم بالإصدارات. وهذا هو المكافئ المحكم لـ`CLAUDE.md` في استدعاءات خطوط الأنابيب.

يتوقّف السكربت عند التصنيف. ولا يطبّق الإصلاحات تلقائيًا. فالثقة التي يبلّغ عنها النموذج نافعة للتوجيه، لا لتغييرات شيفرة بلا إشراف. ودرس [ملفّات الفشل](https://stevekinney.com/courses/self-testing-ai-agents/failure-dossiers-what-agents-actually-need-from-a-red-build) يمنح الوكيل أمر إعادة إنتاج لكل فشل — *هناك* تحدث حلقة الإصلاح، فشلًا واحدًا في كل مرة، والاختبارات تحرس كل خطوة.

## توليد تعليقات CI

نمط أقصر بعائد كبير. تدعم GitHub Actions تعليقات من نوع `::error file=...,line=...::message` تُعرض سطريًا على فروق طلبات السحب. وخطوة مخرجات مُهيكلة تستطيع أن تحوّل مراجعة نموذج لغوي إلى تعليقات أصلية:

```bash
SCHEMA=$(jq -c . scripts/annotation-schema.json)

claude -p --bare \
  --output-format json \
  --json-schema "$SCHEMA" \
  "Review this diff for correctness issues. Be specific about file and line." \
  < <(git diff HEAD~1) \
  | jq -r '.structured_output.annotations[] | "::\(.level) file=\(.file),line=\(.line)::\(.message)"'
```

حيث يفرض `annotation-schema.json` الشكل `{ annotations: [{ file, line, level, message }] }` مع `level` مقيّدًا بـ`"error" | "warning" | "notice"`. وسطر `jq` الواحد يُنسّق كل نتيجة كتعليق GitHub. أضِف هذا في خطوة CI فتظهر مراجعة النموذج اللغوي كتعليقات سطريّة على طلب السحب، كما يفعل أي أداة تدقيق.

وهذا يتناسب جيدًا مع [درس CI](https://stevekinney.com/courses/self-testing-ai-agents/ci-as-the-loop-of-last-resort). فالمخطّط المُهيكل هو ما يجعل الخطوة قابلة للتركيب مع بقية سير العمل.

## نمطان آخران، باختصار

**فحوص الصحة الليلية.** يعلّم [درس التحقّق الليلي](https://stevekinney.com/courses/self-testing-ai-agents/nightly-verification-loops) فحوصًا مجدولة تعمل بلا إشراف. والمخرجات المُهيكلة تحوّل نتائجها إلى تقارير حالة مقروءة آليًا: `{ status: "healthy" | "degraded" | "broken", checks: [...], action_required: boolean }`. فيقرأ مغلّف cron قيمة `action_required`، ويفتح مسألة GitHub إن كانت صحيحة، ويعود إلى النوم. خمسة أسطر من `jq`، لا محلّل مخصّص.

**بوابة مراجعة دلالية.** الشكل نفسه كنمط تعليقات CI، لكنها تُستخدم كخطّاف قبل الدفع أو كخطوة في CI فقط — لا قبل الإيداع. فـ[قاعدة العشر ثوانٍ لخطّافات ما قبل الإيداع](https://stevekinney.com/courses/self-testing-ai-agents/git-hooks-with-lefthook) في الدورة تستبعد استدعاءات النماذج اللغوية عبر الشبكة. وقبل الدفع أو في CI توجد ميزانية زمن الاستجابة. والمخطّط يمنحك `{ pass: boolean, issues: [...] }`، ويخرج السكربت بقيمة غير صفرية إن كانت `pass` خاطئة، فتكون قد بنيت تمريرة تدقيق دلالي تلتقط أشياء لا تستطيع أي قاعدة AST التعبير عنها.

## عندما تكون المخرجات المُهيكلة الأداة الخاطئة

الاستدلال الاستكشافي نفسه كالذي في درس [MCP](https://stevekinney.com/courses/self-testing-ai-agents/writing-a-custom-mcp-wrapper) تحت عنوان «ما الذي تُغلّفه وما الذي تتركه».

**أداة خاطئة حين:** تكون المهمة توليدًا مفتوح النهاية (لا تحقّقًا)، أو يصير المخطّط أعقد من المحلّل الذي يستبدله، أو لا يكون حكم النموذج اللغوي موثوقًا بما يكفي في هذا النطاق، أو تحتاج زمن استجابة أقل من ثانية. فخطّافات git التي تعمل عند كل حفظ، وتكاملات المحرّرات التي تحتاج تغذية راجعة فورية — تلك لا تستطيع انتظار رحلة ذهاب وعودة عبر الشبكة.

**أداة صحيحة حين:** التحقّق، والفرز، والتصنيف — أي مكان كنت ستُحلّل فيه نصًّا حرًّا وتستطيع تحمّل بضع ثوانٍ من زمن الاستجابة. والنقطة المثلى هي «أحتاج حكم النموذج اللغوي، وأحتاج أيضًا النتيجة في شكل يستطيع سكربتي التفرّع عليه».

## الشيء الوحيد الذي يجب تذكّره

مخطّط JSON يحوّل «اسأل نموذجًا لغويًا كبيرًا» إلى خطوة في خط أنابيب. فالمخطّط هو العقد: مرونة النموذج تبقى داخل الشكل، وحاجة سكربتك إلى القدرة على التنبّؤ يشبعها الشكل. أودِع المخطّط، وأودِع ملف الطلب، وشغّل بـ`--bare`، فيصير الأمر كله محكم الإغلاق، ومُتحكَّمًا بإصداراته، وقابلًا للتركيب مع كل حلقة أخرى في المكدّس.

## قراءات إضافية

- [كتابة غلاف MCP مخصّص](https://stevekinney.com/courses/self-testing-ai-agents/writing-a-custom-mcp-wrapper)
- [ملفّات الفشل: ما يحتاجه الوكلاء فعلًا من بناء أحمر](https://stevekinney.com/courses/self-testing-ai-agents/failure-dossiers-what-agents-actually-need-from-a-red-build)
- [حلقات التحقّق الليلية](https://stevekinney.com/courses/self-testing-ai-agents/nightly-verification-loops)
