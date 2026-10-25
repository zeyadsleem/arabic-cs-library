---
title: "تشجيع التفكير"
lang: ar
source: "https://stevekinney.com/courses/ai-development/claude-code-thinking"
---

الهدف ليس أن «يفكّر [Claude Code](https://code.claude.com/docs/en/overview) أعمق» بشكل مجرّد. الهدف أن يُظهر الاستدلال الذي يؤثر في الإجراء التالي.

## استخدم وضع الخطة للقرارات الحقيقية

عندما يكون للمهمة عدة تصاميم معقولة، ابدأ في وضع الخطة:

```
Plan the smallest change that adds account-level rate limits.
Compare middleware and service-layer implementations. Name the files each path
would touch. Do not edit files.
```

يدفع هذا الطلب القرار إلى العلن قبل بدء التعديلات.

## استخدم ضوابط الجهد

يدعم Claude Code ضوابط الجهد مثل `/effort`. ارفع الجهد عندما تكون للمهمة كلفة استدلال عالية: المعمارية، أو الأمان، أو تخطيط الترحيل، أو المراجعة. واخفض الجهد للتعديلات الروتينية حيث تكون الكمون أهم من التحليل العميق.

الجهد ليس بديلًا عن السياق. فالنموذج عالي الجهد مع الملفات الخاطئة سيحلّ المشكلة الخاطئة رغم ذلك.

## استخدم تخطيط Opus عن قصد

يستخدم الاسم المستعار `opusplan` نموذج Opus للتخطيط و Sonnet للتنفيذ. وهو إعداد افتراضي مفيد للتغييرات الأكبر لأنه يصرف الاستدلال المكلف حيث يهمّ أكثر.

راجع الخطة قبل التنفيذ:

```
Use opusplan. Produce the plan first and wait for approval before editing.
```

## اطرح أسئلة مقايضة أفضل

ضعيف:

```
Think carefully and make this better.
```

أفضل:

```
List the two smallest implementation paths, the failure modes of each, and the
verification command that would prove the chosen path works.
```

الطلب الثاني يمنح التفكير مهمة.
