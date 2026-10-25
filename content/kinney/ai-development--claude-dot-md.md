---
title: "ملف CLAUDE.md"
lang: ar
source: "https://stevekinney.com/courses/ai-development/claude-dot-md"
---

لدى [Claude Code](https://code.claude.com/docs/en/memory) نظاما ذاكرة واسعان: ذاكرة يكتبها الإنسان، وذاكرة تلقائية يكتبها Claude. وكلتاهما سياق لا فرض. وإذا وجب فرض شيء، فشفّره في الاختبارات أو الفحص أو الصلاحيات أو الخطّافات أو التكامل المستمر.

## CLAUDE.md

`CLAUDE.md` هو ملف تعليمات المشروع الرئيسي الذي يكتبه الإنسان. ويمكن أن يسكن في جذر المستودع أو تحت `.claude/`. ويمكن أن تسكن التعليمات على مستوى المستخدم في `~/.claude/CLAUDE.md`.

استخدم `CLAUDE.md` للإرشاد الدائم بالمشروع:

```markdown
# Project Instructions

- Use Bun for package management.
- Run `bun run lint` and the closest test before reporting completion.
- Do not edit generated files directly.
```

أبقِه قصيرًا. واربط بتوثيق أعمق بدلًا من تحويل الملف إلى دليل.

لا تعتمد على ذاكرة محلية فقط لسياسة مشروع مشتركة. وإذا احتاج الشخص التالي إلى التعليمة، فضعها في ملف مُصدَّر بإصدارات.

## الاستيراد و AGENTS.md

يدعم Claude Code الاستيراد بمراجع `@path`. واعتبارًا من التوثيق الحالي، لا يقرأ Claude Code ملف [`AGENTS.md`](https://agents.md/) مباشرةً. وإذا استخدم مستودع `AGENTS.md`، فأنشئ `CLAUDE.md` يستورده:

```markdown
@AGENTS.md
```

يحافظ ذلك على مصدر تعليمات مشترك واحد دون التظاهر بأن كل وكيل يكتشف الملفات بالطريقة نفسها.

## .claude/rules

القواعد في `.claude/rules/*.md` مفيدة للسياق المُنطَّق. ويمكن أن تتضمن ترويسة مثل `paths` كي ترتبط القاعدة بالملفات ذات الصلة.

استخدم القواعد للقيود:

```markdown
---
paths:
  - 'src/routes/api/**/*.ts'
---

API routes must validate input at the boundary and return the shared error
shape.
```

## المهارات مقابل القواعد

استخدم المهارات لسير العمل الخاص بمهمة. وإذا كانت التعليمة لها مراحل وسكربتات ومراجع وموجودات، فالأرجح أن موضعها `.claude/skills/<name>/SKILL.md` لا قاعدة.

القواعد تُشكّل الجلسة. والمهارات تشغّل سير عمل.

## الذاكرة التلقائية

الذاكرة التلقائية يكتبها Claude وقد تساعد في نقل التفضيلات إلى الأمام، لكن ينبغي ألا تصير المكان الوحيد الذي يسكن فيه سلوك مشروع مهم. وإذا التقطت ذاكرة تلقائية قرارًا حقيقيًا للفريق، فانقل ذلك القرار إلى ملف مُصدَّر بإصدارات.
