---
title: "الإشارة إلى الملفات"
---

يستطيع [Claude Code](https://code.claude.com/docs/en/overview) البحث في المستودع، لكن الإشارات الصريحة إلى الملفات ما زالت مفيدة؛ فهي تخبر Claude أي الملفات تحدّد الصواب، لا مجرد أي الملفات تصادف وجودها قريبًا.

## استخدم إشارات @path

استخدم `@` للإشارة إلى الملفات والمجلدات:

```
Read @src/lib/server/invitations.ts and
@src/lib/server/invitations.test.ts. Add the missing expired-token regression
test before editing production code.
```

واستخدم المجلدات عندما يهمّ النمط:

```
Inspect @src/routes/api/ for existing error response conventions.
```

لا تُرفق المستودع بأكمله حين يكفي ملفان واختبار واحد لتحديد المهمة.

## الاستيرادات في ملفات الذاكرة

يستطيع `CLAUDE.md` استيراد ملفات أخرى بإشارات `@path`:

```markdown
@AGENTS.md
@docs/testing.md
```

استخدم الاستيرادات لإبقاء التعليمات المشتركة في مكان واحد. ولا تكرّر الإرشادات الطويلة عبر `CLAUDE.md` والقواعد والمهارات.

## الصور والسياق غير البرمجي

يستطيع Claude Code العمل بالصور وسياق آخر عندما يدعم سطح الأداة ذلك. استخدم ذلك لعلل واجهة المستخدم والمخططات وأعمال الانحدار البصري، لكن اربط الطلب دائمًا بالملفات والتحقق:

```
Compare this screenshot to @src/lib/components/checkout-form.svelte.
Fix the spacing regression and run the component test.
```

## اطلب الاستشهادات

في أعمال التحقيق، اشترط إشارات الملفات:

```
Explain where billing webhooks are handled. Cite the files and functions you
used. Do not edit files.
```

وإذا لم تستطع الإجابة الاستشهاد بالملفات المعنية، فالخطوة التالية هي مزيد من السياق لا التنفيذ.
