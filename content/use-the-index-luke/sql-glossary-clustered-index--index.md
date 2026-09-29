---
title: "فهرس عنقودي / فهرس غير عنقودي"
lang: ar
source: https://use-the-index-luke.com/sql/glossary/clustered-index
---

الفهرس العنقودي (clustered index) في SQL Server وMySQL/InnoDB جدول مخزّن في بنية شجرة B للفهرس، ولا توجد بنية بيانات ثانية ([جدول كومة](/book/use-the-index-luke/sql-glossary-heap-table/index)) للجدول.

أما الفهرس غير العنقودي فهو فهرس يشير إلى بنية بيانات أخرى تحتوي أعمدة جدول إضافية.

الوصول إلى بيانات الجدول عبر [فهرس ثانوي](/book/use-the-index-luke/sql-glossary-secondary-index/index) (فهرس على فهرس عنقودي) أبطأ من استعلام مشابه على [جدول كومة](/book/use-the-index-luke/sql-glossary-heap-table/index).

تدعم SQL Server الفهارس العنقودية اختيارياً؛ فلديك حرية الاختيار بين الفهارس العنقودية وجداول الكومة. ويمكن أن يوجد فهرس عنقودي واحد على الأكثر لكل جدول. ويؤدي إسقاط فهرس عنقودي إلى تحويل الجدول إلى [جدول كومة](/book/use-the-index-luke/sql-glossary-heap-table/index). كما أن إضافة فهرس عنقودي إلى جدول كومة تُسقط بنية الكومة فعلاً. وتدعم SQL Server فهارس عنقودية غير فريدة على أعمدة اعتباطية. وإنشاء جدول SQL Server بلا فهرس عنقودي يتطلب استخدام جملة `NONCLUSTERED`:

```sql
CREATE TABLE (
   id    NUMBER NOT NULL,
   [...]
   CONSTRAINT pk PRIMARY KEY NONCLUSTERED (id)
)
```

يحتوي محرّك MySQL InnoDB على [فهارس عنقودية إلزامية](https://dev.mysql.com/doc/refman/8.0/en/innodb-index-types.html)؛ أي توجد دائماً فهرسة عنقودية، غالباً باستخدام المفتاح الأساسي. وإذا لم يوجد مفتاح فريد مناسب، تستخدم MySQL معرّف صف مولَّداً لهذا الغرض. ولا يدعم محرّك التخزين MyISAM الفهارس العنقودية ويستخدم جداول الكومة دائماً.

ولقاعدة بيانات Oracle فهارس عنقودية اختيارية تسمى [الجداول المنظَّمة بالفهرس](/book/use-the-index-luke/sql-glossary-index-organized-table/index)، وهي تعمل على المفتاح الأساسي فقط.

#### روابط

- قسم في الكتاب: [الجداول المنظَّمة بالفهرس](/book/use-the-index-luke/sql-clustering-index-organized-clustered-index/index)
- المسرد: [جدول كومة](/book/use-the-index-luke/sql-glossary-heap-table/index) — جداول مخزّنة بترتيب غير منظم.
- المسرد: [فهرس ثانوي](/book/use-the-index-luke/sql-glossary-secondary-index/index) — فهارس أخرى على فهرس عنقودي
