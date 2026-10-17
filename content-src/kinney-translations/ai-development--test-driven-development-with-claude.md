---
title: "التطوير الموجَّه بالاختبارات"
---

يكون [Claude Code](https://code.claude.com/docs/en/overview) في أقوى حالاته عندما يكون تعريف الإنجاز قابلًا للتنفيذ. ويمنح التطوير الموجَّه بالاختبارات الوكيل حلقة محكمة: أعِد إنتاج العلّة، واجعل الاختبار ينجح، ثم أعد الهيكلة فقط عند الحاجة.

## طلب جيد للتطوير الموجَّه بالاختبارات

```
Bug:
Expired invite tokens are accepted.

Task:
Write the failing regression test first in the closest test file. Then implement
the smallest production change that makes it pass.

Verification:
Run bun test:unit -- src/lib/server/invitations.test.ts and bun run lint.

Stop:
If either command fails for an unrelated reason, stop and report the failure
instead of editing unrelated files.
```

يمنح هذا الطلب Claude سلوكًا لإعادة إنتاجه، وحدًّا للنطاق، وخط نهاية.

## راقب الاختبار الأول

لا تدع الوكيل يكتب اختبارًا ينجح بالفعل. اطلب منه الإبلاغ عن التحقّق الفاشل قبل التنفيذ:

```
After writing the regression test, run it and show the failing assertion before
changing production code.
```

تلك الجملة الواحدة تمنع كثيرًا من التغطية الزائفة.

## أبقِ إعادة الهيكلة منفصلة

بعد نجاح الاختبار، اسأل هل إعادة الهيكلة ضرورية. كثير من الإصلاحات أفضل أن تبقى صغيرة. وإذا كان التنفيذ واضحًا والاختبارات تنجح، فتوقّف.

وعندما تكون إعادة الهيكلة مبرَّرة، شغّل أمر التحقق نفسه بعدها. فالاختبار الأخضر قبل إعادة الهيكلة لا يثبت أن إعادة الهيكلة آمنة.
