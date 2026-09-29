---
title: "سكربتات أمثلة MySQL لـ«النتائج الجزئية»"
lang: ar
source: https://use-the-index-luke.com/sql/example-schema/mysql/partial-results
---

يحتوي هذا القسم على عبارتَي `create` و`insert` لتشغيل أمثلة [الفصل 7*النتائج الجزئية*](/book/use-the-index-luke/sql-partial-results/index) في قاعدة بيانات MySQL.

## الاستعلام عن صفوف Top-N

لا يُظهر استعلام Top-N المفهرس عملية «filesort» في عمود Extras:

```sql
SELECT *
  FROM sales
 ORDER BY sale_date DESC
 LIMIT 10
```

```
+----+-------+-------+-------------+--------+-------+
| id | table | type  | key         | rows   | Extra |
+----+-------+-------+-------------+--------+-------+
|  1 | sales | index | sales_dt_pr | 836092 |       | 
+----+-------+-------+-------------+--------+-------+
```
