---
title: "مسح الفهرس فقط"
lang: ar
source: https://use-the-index-luke.com/sql/glossary/index-only-scan
---

مسح الفهرس فقط (Index-Only Scan) هو مسح فهرس بلا وصول لاحق إلى الجدول — أي الوصول إلى الفهرس وحده.

وتدعم جميع الإصدارات الحديثة من Oracle وSQL Server وMySQL عمليات مسح الفهرس فقط. أما قاعدة بيانات PostgreSQL فتدعمها منذ [الإصدار 9.2](https://www.depesz.com/2011/10/08/waiting-for-9-2-index-only-scans/).

ويمكن تنفيذ استعلام بمسح الفهرس فقط إذا كانت جميع البيانات المستعلَم عنها متاحة في الفهرس؛ أي يجب تضمين حتى الأعمدة التي تظهر في جملة `select` وحدها في الفهرس.

وتعتمد الميزة الأدائية لمسح الفهرس فقط على عدد الصفوف التي يُوصَل إليها وعلى عامل العنقدة في الفهرس.

#### روابط

- قسم في الكتاب: [مسح الفهرس فقط: تجنّب الوصول إلى الجدول](/book/use-the-index-luke/sql-clustering-index-only-scan-covering-index/index)
- المسرد: [فهرس مُغطٍّ](/book/use-the-index-luke/sql-glossary-covering-index/index) — اسم بديل لمسح الفهرس فقط
