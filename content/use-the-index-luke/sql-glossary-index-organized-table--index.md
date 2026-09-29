---
title: "جدول منظَّم بالفهرس"
lang: ar
source: https://use-the-index-luke.com/sql/glossary/index-organized-table
---

الجدول المنظَّم بالفهرس في Oracle جدول مخزّن في بنية شجرة B للفهرس، ولا توجد بنية بيانات ثانية ([جدول كومة](/book/use-the-index-luke/sql-glossary-heap-table/index)) للجدول. وتستخدم قاعدة بيانات Oracle المفتاح الأساسي دائماً مفتاحاً للعنقدة. ويُنشأ الجدول المنظَّم بالفهرس بجملة `ORGANIZATION INDEX`:

```sql
CREATE TABLE (
   id    NUMBER NOT NULL PRIMARY KEY,
   [...]
) ORGANIZATION INDEX
```

والوصول إلى بيانات الجدول عبر [فهرس ثانوي](/book/use-the-index-luke/sql-glossary-secondary-index/index) أبطأ من استعلام مشابه على [جدول كومة](/book/use-the-index-luke/sql-glossary-heap-table/index).

وتدعم SQL Server الجداول المنظَّمة بالفهرس أيضاً، لكنها تستخدم مصطلح [الفهرس العنقودي](/book/use-the-index-luke/sql-glossary-clustered-index/index).

#### روابط

- قسم في الكتاب: [الجداول المنظَّمة بالفهرس](/book/use-the-index-luke/sql-clustering-index-organized-clustered-index/index)
- المسرد: [جدول كومة](/book/use-the-index-luke/sql-glossary-heap-table/index) — جداول مخزّنة بترتيب غير منظم.
- المسرد: [فهرس ثانوي](/book/use-the-index-luke/sql-glossary-secondary-index/index) — فهارس أخرى على فهرس عنقودي
