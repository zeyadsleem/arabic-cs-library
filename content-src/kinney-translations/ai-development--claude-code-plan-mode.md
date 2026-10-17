---
title: "وضع الخطة"
---

وضع الخطة في [Claude Code](https://code.claude.com/docs/en/permissions) هو حدّ صلاحيات. فهو يتيح لـ Claude الفحص والاستدلال دون تعديل الملفات فورًا.

استخدمه عندما تكون المهمة غير واضحة أو محفوفة بالمخاطر أو واسعة.

## ما ينبغي أن ينتجه وضع الخطة

تتضمن الخطة المفيدة:

- الملفات التي فحصها Claude.
- خيارات التنفيذ.
- المسار المختار وسبب كونه الأصغر.
- الملفات المتوقع تغيّرها.
- أوامر التحقق.
- شروط التوقف.

الطلب:

```
Enter plan mode. Research the smallest safe way to add refresh-token rotation.
Compare at most two implementation paths. Do not edit files.
```

## الموافقة على الخطة

قبل الانتقال من التخطيط إلى التنفيذ، تحقّق من قائمة الملفات وأمر التحقق. وإذا كان أحدهما مفقودًا، فالخطة غير جاهزة.

تسليم جيد:

```
Implement option B only. Write the regression test first. Run the targeted test
and bun run lint. Stop on unrelated failures.
```

## وضع الخطة مقابل خطة Opus

يتحكم وضع الخطة بالصلاحيات. أما `opusplan` فيتحكم بتوجيه النموذج. وهما يجتمعان جيدًا للمهام المعقّدة، لكنهما يحلّان مشكلتين مختلفتين. فوضع الخطة يقول «لا تعدّل بعد». و`opusplan` يقول «استخدم نموذجًا أقوى للتخطيط».
