---
title: "الحصول على خطة تنفيذ"
lang: ar
source: https://use-the-index-luke.com/sql/explain-plan/sqlite/getting-an-execution-plan
---

يقدّم SQLite مستويين مختلفين لخطط التنفيذ: (1) شيفرة الآلة للآلة الافتراضية؛ (2) خطة الاستعلام عالية المستوى.

يعرض هذا الدرس الصيغة الثانية فقط.

## EXPLAIN QUERY PLAN

يمكنك أن تسبق أي أمر SQL اعتباطي بـ`explain query plan` لاسترجاع خطة الاستعلام (بدلاً من تشغيل الاستعلام).

```sql
EXPLAIN QUERY PLAN
SELECT RANDOM()
```

ويعيد هذا المثال البسيط خطة التنفيذ التالية:

```
QUERY PLAN
`--SCAN CONSTANT ROW
```
