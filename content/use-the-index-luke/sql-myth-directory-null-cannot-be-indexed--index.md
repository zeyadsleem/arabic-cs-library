---
title: "لا تستطيع قاعدة بيانات Oracle فهرسة NULL"
lang: ar
source: https://use-the-index-luke.com/sql/myth-directory/null-cannot-be-indexed
---

يسهل فهم مصدر هذه الخرافة حين تنظر إلى العبارة المصوغة صوغاً صحيحاً:

> لا تُدرج قاعدة بيانات Oracle الصفوف في الفهرس إذا كانت جميع الأعمدة المفهرسة `NULL`.

والفرق بين الخرافة والحقيقة صغير؛ فيبدو أن الخرافة صيغة ركيكة من الحقيقة.

والحقيقة أن `NULL` يمكن فهرسته بإضافة عمود آخر غير قابل لأن يكون `NULL` إلى الفهرس:

```sql
CREATE INDEX with_null ON table_name (nullable_column, 'X');
```
