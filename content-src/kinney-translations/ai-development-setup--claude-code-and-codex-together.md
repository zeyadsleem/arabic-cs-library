---
title: "Claude Code و Codex معًا (Claude Code and Codex, Together)"
---

اقتران وكيلين يبدو كترقية مجانية. وهو ليس كذلك، إلا إن كنت واضحًا في سبب فعلك ذلك. مدّ يدك إلى الوكيل الآخر لأنه *مختلف*، لا لأنه أفضل. فالنموذج من مختبر آخر يفشل في مواضع أخرى، فأنت تشتري أخطاءً غير مترابطة، لا ذكاءً إضافيًا.

النسخة المختصرة: كل مسار تقريبًا يستدعي الوضع بلا واجهة للوكيل الآخر—`claude -p "…"` أو `codex exec`، وكل منهما يشغّل جلسة واحدة غير تفاعلية ثم يخرج. وحتى الإضافات تغلّف ذلك النداء. والاستثناء الحقيقي الوحيد هو `claude mcp serve`، المشروح أدناه. والعمل الحقيقي هو احتواء مخرجات الوكيل الآخر، وصندوق رماله (sandbox)، وفاتورته.

## نداء Codex من Claude Code

هناك مساران.

- **الطريقة السهلة**: [إضافة Codex الرسمية لـ Claude Code](https://github.com/openai/codex-plugin-cc) من OpenAI. و `/codex:review` و `/codex:adversarial-review` مراجعتان للقراءة فقط. و `/codex:rescue` يسلّم Codex مهمة عبر وكيل فرعي. وتأخذ المهام الطويلة `--background`، ثم `/codex:status` و `/codex:result`. وهي تقود تثبيتك المحلي لـ Codex وتسجيل دخولك.
- **طريقة افعلها بنفسك**: `codex exec --sandbox read-only`. و `codex exec` هو الوضع بلا واجهة في Codex: يشغّل جلسة واحدة غير تفاعلية ثم يخرج. ثبّت صندوق الرمل صراحةً: فتهيئة المستخدم المحمّلة قد تستبدل الافتراضي.

```bash
verdict_file=$(mktemp) || exit 1
trap 'rm -f "$verdict_file"' EXIT
if ! codex exec --sandbox read-only --ephemeral -o "$verdict_file" "Is the retry path in src/queue.ts safe?" < /dev/null; then
  echo "Review process failed" >&2
  exit 1
fi
if [ ! -s "$verdict_file" ]; then
  echo "Review produced no verdict" >&2
  exit 1
fi
cat "$verdict_file"
```

ذلك يثبّت صندوق رمل صدفةً للقراءة فقط (`--sandbox read-only`)، ويشغّل سؤالًا واحدًا بلا جلسة محفوظة (`--ephemeral`)، ويكتب الإجابة النهائية فقط إلى ملف (`-o`)، ويغلق المدخل القياسي. وبعض العادات تجعله موثوقًا:

- **اقرأ ملف `-o`، لا التدفّق**: فهو يحوي الرسالة النهائية فقط. أضِف `--output-schema schema.json` حين تحتاج الشيفرة إلى التصرّف بناءً على الإجابة.
- **أغلق المدخل القياسي وتحقق من الملف**: يُلحق `codex exec` أي شيء على المدخل القياسي بطلبك. وحين يشغّله وكيل آخر أو سكربت، قد لا يُغلق المدخل القياسي أبدًا، فينتظر Codex إلى الأبد أو يخرج بالرمز `0` دون أن يفعل شيئًا، مطبوعًا فقط `Reading additional input from stdin...` ([وثائق `codex exec`](https://developers.openai.com/codex/noninteractive) تغطّي سلوك المدخل القياسي). أعِد توجيه المدخل القياسي من `/dev/null`، واكتب إلى مسار `mktemp` جديد في كل مرة كي لا يعيد نداء فاشل استخدام حكم سابق، واطلب نجاح الخروج وملفًا غير فارغ معًا. فالمراجع الذي لم ينتج شيئًا لم يوافق على شيء. ويغطّي [مراجعو الوكلاء](https://stevekinney.com/courses/ai-development-setup/verification-and-evidence#agent-reviewers) استخدام الوكلاء كمراجعين.
- **تحكّم في التهيئة**: يعطّل `--ephemeral` استمرارية الجلسة فقط. أضِف `--ignore-user-config` حين يجب أن تستبعد المراجعة تهيئة المستخدم وخوادم MCP الخاصة بها أيضًا، كما يصف [مرجع الوضع غير التفاعلي](https://learn.chatgpt.com/docs/non-interactive-mode#permissions-and-safety). راجع أي تهيئة مشروع متبقية والأدوات الممكّنة بشكل منفصل؛ فصندوق رمل الصدفة لا يقيّد خدمة MCP خارجية.
- **احتوِه**: استدعِه من [وكيل فرعي](https://stevekinney.com/courses/ai-development-setup/subagents) (وكيل مساعد بسياقه الجديد الخاص) أو من [مهارة](https://stevekinney.com/courses/ai-development-setup/skills) تعمل بـ `context: fork`، فيبقى ناتج Codex خارج سياقك الرئيسي. والمهارة العادية تُحمَّل في محادثتك الحالية، فلا تفعل ذلك.

## نداء Claude Code من Codex

- **لرأي ثانٍ**: شغّل `claude -p "…" --permission-mode plan --output-format json --max-turns 5 --max-budget-usd 1`. وضع الخطة يمنعه من التحرير. والحدود تمنعه من التشعّب: يحسب `--max-turns` دورات الوكيل (كل طلب نموذج ونداءات الأدوات التي يجريها)، ويحدّ `--max-budget-usd` الإنفاق. أضِف `--json-schema` للحصول على إجابة متحقَّق منها، وتعود في `.structured_output`.
- **لأدوات Claude Code، لا لحكمه**: `codex mcp add claude-code -- claude mcp serve`، وهذا يشغّل Claude Code كخادم MCP (برنامج يضيف أدوات إلى إطار). فيحصل Codex على أدوات Claude Code، بما فيها Bash و Edit و Write، لكن لا على حكمه. وهذه قوة كبيرة تُعرّضها، فحدّد نطاقها عن قصد.
- **كإضافة**: لا توجد إضافة رسمية وجدتها. وإضافة المجتمع [`cc-plugin-codex`](https://github.com/sendbird/cc-plugin-codex) من Sendbird تحاكي إضافة OpenAI (`$cc:review`, `$cc:rescue`) وتبدأ `claude -p` جديدًا لكل نداء.

## أمور ستُزعجك

- **صناديق الرمل لا تتعشّش**: صندوق الرمل عزل على مستوى نظام التشغيل لما تستطيع أوامر صدفة الوكيل الوصول إليه. على macOS، لا يستطيع Codex بدء صندوق رماله الخاص داخل صندوق Claude Code (`sandbox_apply: Operation not permitted`). أخرِج نداء Codex بـ `sandbox.excludedCommands` ودع Codex يصنع صندوق رمل نفسه.
- **إعادة التوجيه تُبقي النداء داخل صندوق الرمل**: استبعاد أمر من صندوق رمل Claude Code لا ينجح إن كان الأمر يحوي إعادة توجيه، حتى `< /dev/null`. لذا مثال `codex exec … < /dev/null` أعلاه ينجح من الطرفية أو سكربت، لكنه يبقى داخل صندوق الرمل ويفشل حين يشغّله Claude Code مباشرة. ضع إعادة التوجيه في سكربت غلاف صغير خارج المستودع، فلا يغيّر شيء يحرّره الوكيل ما يُشغَّل بلا قيود، واستبعد الغلاف.
- **صندوق رمل Codex بلا شبكة افتراضيًا**: على `claude -p` أن يصل إلى Anthropic. فوافق على التصعيد، أو اضبط `network_access = true` تحت `[sandbox_workspace_write]`، وهذا يفتح الشبكة لكل ما يشغّله Codex.
- **فاتورتان**: وجود `ANTHROPIC_API_KEY` في بيئة Codex ينقل `claude -p` بهدوء إلى فوترة API حسب الرموز.
- **زمن الاستجابة**: قد تستغرق الاستشارة دقائق. أعطِ الغلاف مهلة زمنية، وقرّر ما يحدث عند انقضائها.
- **بوّابات المراجعة تتكرّر**: كلتا الإضافتين (إضافة OpenAI لـ Claude Code وإضافة Sendbird لـ Codex) تقدّمان بوّابة مراجعة اختيارية، وهي خُطّاف يشغّل مراجعة كل مرة يحاول الوكيل التوقّف، وكلتاهما تحذّر من أنها قد تستنزف حدود استخدامك بسرعة.
- **ثبّت واختبر**: ثبّت النموذج (`-m`, `--model`)، وأعِد تشغيل أول استدعاء لك يدويًا بعد ترقية أي من الـ CLI.

قضايا صندوق الرمل وبيانات الاعتماد هنا هي نفسها التي تجعل [نطاق الانفجار](https://stevekinney.com/courses/ai-development-setup/the-enforcement-ladder#blast-radius) يستحق التخطيط. امنح الوكيل الثاني أضيق أذونات تتيح له الإجابة مع ذلك.
