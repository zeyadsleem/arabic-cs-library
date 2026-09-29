---
title: "البحث عن النطاقات"
lang: ar
source: https://use-the-index-luke.com/sql/where-clause/searching-for-ranges
---

يمكن لمعاملات عدم التساوي مثل `<` و`>` و`between` أن تستخدم الفهارس تماماً كما يفعل معامل التساوي [الموضَّح أعلاه](/book/use-the-index-luke/sql-where-clause-the-equals-operator/index). وحتى مرشّح `LIKE` يمكنه—في ظروف معينة—استخدام فهرس كما تفعل شروط النطاق.

ويحدّ استخدام هذه العمليات من اختيار ترتيب الأعمدة في الفهارس متعددة الأعمدة. وقد يستبعد هذا القيد كل خيارات الفهرسة المثلى—فهناك استعلامات لا يمكنك فيها ببساطة تعريف ترتيب أعمدة «صحيح» على الإطلاق.

## المحتويات

1. *[أكبر وأصغر و`BETWEEN`](/book/use-the-index-luke/sql-where-clause-searching-for-ranges-greater-less-between-tuning-sql-access-filter-predicates/index)* — ترتيب الأعمدة مرة أخرى
2. *[فهرسة مرشّحات `LIKE` في SQL](/book/use-the-index-luke/sql-where-clause-searching-for-ranges-like-performance-tuning/index)* — `LIKE` ليس للبحث النصي الكامل
3. *[دمج الفهارس](/book/use-the-index-luke/sql-where-clause-searching-for-ranges-index-merge-performance/index)* — لماذا لا نستخدم فهرساً لكل عمود؟
