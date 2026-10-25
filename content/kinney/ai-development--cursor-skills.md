---
title: "مهارات Cursor"
lang: ar
source: "https://stevekinney.com/courses/ai-development/cursor-skills"
---

تُغلّف [مهارات Cursor](https://cursor.com/docs/skills) سلوك الوكيل القابل لإعادة الاستخدام. استخدم مهارة عندما يحتاج سير عمل إلى أكثر من قاعدة قصيرة: خطوات، وأمثلة، وسكربتات، ومراجع، وموجودات.

## شكل الدليل

يمكن لمهارة مشروع أن تسكن تحت `.cursor/skills`:

```
.cursor/
  skills/
    release-check/
      SKILL.md
      scripts/
      references/
      assets/
```

يفهم Cursor أيضًا المهارات في `.agents/skills` و`.claude/skills` و`.codex/skills`. وهذه التوافقية مهمة عندما يستخدم مستودع أكثر من وكيل.

## مهارة دنيا

```markdown
---
name: release-check
description: Verify package release readiness before publishing.
---

Read the package manifest, changelog, generated exports, and test commands.
Run the documented verification commands. Stop and report the exact blocker if a
command fails.
```

أبقِ نقطة الدخول قصيرة. ضع الأمثلة الطويلة في `references/`، والأوامر القابلة لإعادة الاستخدام في `scripts/`، والمدخلات المرئية أو الثنائية في `assets/`.

## القواعد مقابل المهارات

استخدم القواعد للقيود:

```
Always add regression tests for bug fixes.
```

استخدم المهارات للإجراءات:

```
Run the release readiness process and produce the shipping checklist.
```

إذا كانت التعليمة لها مراحل وملفات لفحصها وإشارة إتمام، فالأرجح أنها مهارة.

## نظافة المهارات

المهارات سياق قابل للتنفيذ. عاملها كشيفرة مصدر:

- أبقِها مُصدَّرة بإصدارات.
- أبقِها صغيرة بما يكفي للمراجعة.
- احذف الأوامر البائدة عندما يتغيّر المستودع.
- اجعل أوامر التحقق صريحة.
- تجنّب نسخ توثيق المورّد الذي سينحرف.

ينبغي أن يستطيع الوكيل تشغيل سير العمل من نظام الملفات، لا من ذاكرة محادثة سابقة.
