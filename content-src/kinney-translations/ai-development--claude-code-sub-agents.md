---
title: "الوكلاء الفرعيون"
---

[وكلاء Claude Code الفرعيون](https://code.claude.com/docs/en/sub-agents) وكلاء لهم سياقهم وأدواتهم ونموذجهم وصلاحياتهم وذاكرتهم الاختيارية الخاصة. وهم مفيدون عندما يمكن عزل جزء من المهمة عن المحادثة الرئيسية.

أستخدمهم عندما يجعل العزل الخيط الرئيسي أبسط، لا عندما أريد أن تبدو المهمة أكثر تقدّمًا مما هي عليه.

## الوكلاء المدمجون

يتضمن Claude Code وكلاء مدمجين مثل Explore و Plan و general-purpose. و Explore مفيد للتحقيق للقراءة فقط. و Plan مفيد للتصميم. ويستطيع وكيل general-purpose تولّي عمل أوسع عندما تحتاج مساعدًا له وصول إلى الأدوات.

اختر الوكيل حسب المهمة لا حسب الجِدّة.

## الوكلاء المخصّصون

يمكن أن يسكن وكلاء المشروع في `.claude/agents/`:

```markdown
---
name: regression-finder
description: Find the closest missing regression test for a described bug.
tools:
  - Read
  - Grep
  - Glob
model: sonnet
permissionMode: plan
---

Inspect the changed files and closest tests. Return missing coverage with file
references. Do not edit files.
```

ويمكن أن تتحكم ترويسة الوكيل أيضًا بالأدوات الممنوعة وخوادم MCP والخطّافات والحد الأقصى للأدوار والمهارات والجهد والسلوك في الخلفية والعزل.

## الوكلاء الفرعيون في الخلفية

الوكلاء الفرعيون في الخلفية مفيدون للبحث المستقل. ويعرض Claude Code الحالي طلبات صلاحيات الوكلاء الفرعيين في الخلفية في الجلسة الرئيسية، ما يجعل أفعالهم أسهل في التدقيق.

أعطِ وكلاء الخلفية عقد إعادة صارمًا:

```
Return only confirmed findings, file references, and whether the main task
should stop.
```

## ذاكرة الوكيل

يستطيع الوكلاء الفرعيون الاحتفاظ بذاكرة. استخدم ذلك للسلوك المتخصص المتكرر، لا للحقائق التي ينبغي إيداعها في المستودع. وإذا أثّرت الذاكرة في الصحة مستقبلًا، فانقلها إلى قاعدة أو مهارة أو اختبار أو ملف توثيق.
