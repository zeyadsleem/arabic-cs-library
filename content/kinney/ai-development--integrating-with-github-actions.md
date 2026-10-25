---
title: "التكامل مع GitHub Actions"
lang: ar
source: "https://stevekinney.com/courses/ai-development/integrating-with-github-actions"
---

يستطيع [Claude Code GitHub Actions](https://code.claude.com/docs/en/github-actions) و[Cursor](https://cursor.com/docs/integrations/github) إدخال الوكلاء في سير عمل [GitHub](https://github.com/). والنمط الشائع بسيط: يمنح حدث أو تعليق الوكيل مهمة محدودة النطاق، ثم يعود الوكيل بالتقرير عبر طلب سحب أو تعليق.

## إجراءات GitHub Actions في Claude Code

تُبنى إجراءات GitHub Actions في Claude Code على [Claude Agent SDK](https://code.claude.com/docs/en/agent-sdk/overview). ويستخدم سير العمل الحالي [`@anthropics/claude-code-action@v1`](https://github.com/anthropics/claude-code-action)، و`prompt`، و`claude_args` الاختياري. ولا ينبغي نسخ أنماط `mode` التجريبية القديمة إلى دروس جديدة.

استخدم `/install-github-app` للإعداد الموجّه عندما يكون ذلك ممكنًا. وفي الإعداد اليدوي، أبقِ مفتاح Anthropic API في GitHub Secrets وحدّد صلاحيات المستودع بضيق.

## مراجعة Cursor والأتمتة

يستطيع Cursor المشاركة في GitHub عبر الوكلاء السحابيين والأتمتات وBugbot ووكلاء الأمان. ويمكن أن تشمل محفّزات GitHub تعليقات القضايا، وتعليقات مراجعة طلبات السحب، والمراجعات المُرسَلة، وتحديثات خيوط المراجعة، واكتمال تشغيل سير العمل.

استخدم هذه التكاملات للأعمال محدودة النطاق:

```
When CI fails, inspect the failing job. Open a pull request only if the fix is
confined to test configuration. Otherwise, comment with the diagnosis and the
failing command.
```

## حدود الأمان

تحتاج سير عمل الوكلاء في GitHub إلى عناية خاصة:

- لا تعرّض أسرارًا واسعة لسير عمل طلبات السحب القادمة من التفريعات (forks).
- أبقِ صلاحيات الكتابة ضيقة.
- اشترط مراجعة بشرية لطلبات السحب المُولَّدة.
- عامل خوادم MCP والأدوات الخارجية كجزء من قاعدة الحوسبة الموثوقة لسير العمل.
- ثبّت إصدارات الإجراءات (actions) وفقًا لسياسة الأمان في المستودع.

## معايير الإكمال

لا يُعدّ طلب السحب المدعوم بالوكيل منتهيًا عندما ينشر الروبوت تعليقًا، بل يكون منتهيًا عندما يُراجَع الفرق، وتُحلّ التعليقات، ويصبح التكامل المستمر أخضر، ويظل الفرع يُدمج بسلاسة مع الفرع الأساسي.
