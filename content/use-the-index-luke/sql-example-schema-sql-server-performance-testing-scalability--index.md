---
title: "سكربتات SQL Server لـ«الاختبار وقابلية التوسع»"
lang: ar
source: https://use-the-index-luke.com/sql/example-schema/sql-server/performance-testing-scalability
---

يحتوي هذا القسم على شيفرة `create` و`insert` وT-SQL لتشغيل اختبار قابلية التوسع من [الفصل 3*الأداء وقابلية التوسع*](/book/use-the-index-luke/sql-testing-scalability/index) في قاعدة بيانات SQL Server.

#### تحذير

ستنشئ هذه السكربتات كائنات كبيرة في قاعدة البيانات وتنتج كمية هائلة من سجلات المعاملات.

ومن اللازم تشغيل الاختبار على مجموعة بيانات ضخمة جداً لضمان ألا يؤثر التخزين المؤقت في القياس. وتبعاً لبيئتك، قد تحتاج إلى إنشاء جداول أكبر حتى تحصل على نتيجة خطية كما في الكتاب.

```sql
CREATE TABLE scale_data (
   section NUMERIC NOT NULL,
   id1     NUMERIC NOT NULL,
   id2     NUMERIC NOT NULL,
   UNIQUE  (section, id1)
);
```

ملاحظة:

- لا يوجد مفتاح أساسي (لإبقاء توليد البيانات بسيطاً).
- لا يوجد فهرس (بعد). ويُنشأ ذلك بعد ملء الجدول.
- لا يوجد عمود «نفايات» (junk) لإبقاء الجدول صغيراً.

```
DECLARE @section INT
SET @section = 300

WHILE (@section >= 0) BEGIN

   WITH generate_series (n) AS (
      SELECT 1
      UNION ALL
      SELECT n + 1
        FROM generate_series
       WHERE N < 3000
   ), generate_series2 (n) AS (
      SELECT ROW_NUMBER() OVER(ORDER BY g1.n, g2.n)
        FROM generate_series g1
       CROSS JOIN generate_series g2
       WHERE g2.n <= @section
   )
   INSERT INTO scale_data
   SELECT @section, gen.*
        , CEILING(ABS(CAST(NEWID() AS BINARY(6)) %100))
     FROM generate_series2 gen
    WHERE gen.n <= @section * 3000
   OPTION(MAXRECURSION 32767);

   SET @section = @section -1
END;
GO
```

ملاحظة: تولّد هذه الشيفرة 300 قسم (المظلَّلة). وقد تحتاج إلى تعديل العدد ليناسب بيئتك.

سيحتاج الجدول إلى بضعة غيغابايتات.

```sql
CREATE INDEX scale_slow ON scale_data(section, id1, id2);
GO
```

ملاحظة:

سيحتاج الفهرس أيضاً إلى بضعة غيغابايتات.

وقد يستغرق ذلك وقتاً طويلاً جداً.

```sql
CREATE VIEW rand_helper AS SELECT rnd=RAND();
GO 

CREATE FUNCTION [dbo].test_scalability (@n int)
   RETURNS @table TABLE
( section  NUMERIC NOT NULL PRIMARY KEY,
  duration NUMERIC NOT NULL,
  rows     NUMERIC NOT NULL)
AS BEGIN
   DECLARE @strt DATETIME2
   DECLARE @iter INT
   DECLARE @xsec INT
   DECLARE @xcnt INT
   DECLARE @xrnd INT

   SET @iter = 0
   WHILE (@iter < @n) BEGIN
      SET @xsec = 0
      WHILE (@xsec < 300) BEGIN
         SELECT @xrnd=CEILING(rnd * 100) FROM rand_helper;
         SET @strt = SYSDATETIME()

         SELECT @xcnt = COUNT(*)
           FROM (SELECT *
                   FROM scale_data
                  WHERE section=@xsec
                    AND id2=@xrnd) tlb; 

         IF @iter = 0 BEGIN
           INSERT INTO @table
           VALUES ( @xsec
                  , datediff(microsecond, @strt, SYSDATETIME())
                  , @xcnt);
         END; ELSE BEGIN
           UPDATE @table
              SET duration = duration 
                  + datediff(microsecond, @strt, SYSDATETIME())
                , rows = rows + @xcnt
            WHERE section = @xsec
         END;
         SET @xsec = @xsec + 1
      END;
      SET @iter = @iter + 1
   END;

   RETURN;
END;

GO
```

ملاحظة:

تعيد الدالة `SCALABILITY_SCALABILITY` جدولاً.

وهي مثبتة في الشيفرة لتشغيل الاختبار على 300 قسم (المظلَّلة).

وعدد التكرارات قابل للضبط

ويلزم عرض `RAND_HELPER` لتجاوز استخدام `RAND()` داخل دالة.

```sql
SELECT * FROM [dbo].[test_scalability] (10);
```

ويمكن إجراء الاختبار المقابل بفهرس أفضل هكذا:

```sql
CREATE INDEX scale_fast ON scale_data(section, id2, id1);
GO

SELECT * FROM [dbo].[test_scalability] (10);
GO
```
