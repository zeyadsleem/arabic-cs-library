---
title: "نمط الطلب: خطّط → نفّذ → تحقّق"
lang: ar
source: "https://stevekinney.com/courses/ai-development/plan-implement-verify"
---

لا يزال أبسط سير عمل موثوق للوكيل هو:

1. خطّط.
2. نفّذ.
3. تحقّق.

والمقصود ليس الشكليات، بل جعل الوكيل يُظهر فهمه قبل أن يغيّر الملفات، وجعل النجاح قابلًا للفحص آليًا بعد ذلك.

## النمط

```
Goal:
Add validation for expired invite tokens.

Plan:
First inspect the token validation path and the closest tests. Summarize the
smallest implementation path before editing.

Implement:
Write the failing regression test first. Then make the smallest production
change that passes it.

Verify:
Run bun test:unit -- src/lib/server/invitations.test.ts and bun run lint.

Stop:
If a command fails for an unrelated reason, stop and report the command, output,
and likely cause instead of changing unrelated files.
```

وهذا يعمل في وضع الوكيل في [Cursor](https://cursor.com/) ووكلاء Cursor السحابيين و[Claude Code](https://code.claude.com/docs/en/overview) ومعظم سير عمل وكلاء سطر الأوامر.

## لماذا ينجح

يَكتشف التخطيط سوء الفهم بينما تكون الكلفة منخفضة. ويُبقي التنفيذ الوكيل داخل المهمة. ويحوّل التحقق عبارة «يبدو جيدًا» إلى فحص ثنائي.

وشرط التوقف لا يقل أهمية عن شرط النجاح. فبدونه، كثيرًا ما يلتفّ الوكلاء حول الإخفاقات بتعديل شيفرة مجاورة، أو إضعاف الاختبارات، أو ادّعاء نجاح جزئي.

## متى تتجاوز النمط الكامل

في التعديل المضمّن الصغير جدًا، تكون الخطة الكاملة مبالغة. استخدم النمط عندما تكون المهمة:

- تمسّ أكثر من ملف واحد.
- تحمل خطرًا أمنيًا أو متعلّقًا بالبيانات أو مواجهًا للمستخدم.
- تتطلّب اختبارات أو مخرجات مولَّدة.
- يمكن حلّها بأكثر من طريقة معقولة.
- ستُشغَّل في سياق سحابي أو في سطر الأوامر أو سياق مؤتمت.

وإذا لم تستطع تسمية أمر التحقق، فالأرجح أنك لا تملك مهمة مكتملة بعد.
