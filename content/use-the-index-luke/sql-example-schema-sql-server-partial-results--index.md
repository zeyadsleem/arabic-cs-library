---
title: "سكربتات SQL Server لـ«النتائج الجزئية»"
lang: ar
source: https://use-the-index-luke.com/sql/example-schema/sql-server/partial-results
---

يحتوي هذا القسم على عبارتَي `create` و`insert` لتشغيل أمثلة [الفصل 7*النتائج الجزئية*](/book/use-the-index-luke/sql-partial-results/index) في قاعدة بيانات SQL Server.

## الاستعلام عن صفوف Top-N

نَهج اختبار قابلية التوسع في استعلامات Top-N هو نفسه المستخدم في فصل «[الاختبار وقابلية التوسع](/book/use-the-index-luke/sql-example-schema-sql-server-performance-testing-scalability/index)».

```sql
CREATE FUNCTION [dbo].test_top_n_scalability (@n int)
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
         SET @strt = SYSDATETIME()

         SELECT @xcnt = COUNT(*)
           FROM (SELECT TOP 100 *
                   FROM scale_data
                  WHERE section=@xsec
                  ORDER BY id2) tlb; 

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

أولاً، باستخدام Top-N متدفق مع فهرس يغطي جملة `order by`:

```sql
CREATE INDEX scale_fast ON scale_data(section, id2, id1);
GO

SELECT * FROM [dbo].[test_top_n_scalability] (10);
GO
```

ثم باستخدام فهرس لجملة `where` فقط. غير أن SQL Server يرفض استخدام الفهرس ما لم يشمل العمود ID2؛ لذا فهي ليست حالة الاختبار نفسها تماماً كما في قواعد البيانات الأخرى، لكنها تُظهر قابلية التوسع مع ذلك.

```sql
DROP INDEX scale_fast ON scale_data;
GO

CREATE INDEX scale_slow ON scale_data(section, id1, id2);
GO

SELECT * FROM [dbo].[test_top_n_scalability] (10);
GO
```

## التنقّل عبر الصفحات في النتائج

```sql
CREATE FUNCTION [dbo].test_topn_scalability (@n int)
   RETURNS @table TABLE
( section NUMERIC NOT NULL,
  mode    NUMERIC NOT NULL,
  page    NUMERIC NOT NULL,
  seconds NUMERIC NOT NULL)
AS BEGIN
  DECLARE @strt DATETIME2
  DECLARE @iter INT
  DECLARE @xmde INT
  DECLARE @page INT
  DECLARE @xsec INT
  DECLARE @c1 INT, @c2 INT;
  DECLARE @cont TABLE (
    section int NOT NULL,
    c1      int NOT NULL, 
    c2      int NOT NULL
  );

  SET @iter = 0
  WHILE (@iter < @n) BEGIN
    SET @xmde = 0
    WHILE (@xmde <= 1) BEGIN
      SET @page = 0
      WHILE (@page <= 100) BEGIN
        SET @xsec = 5
        WHILE (@xsec < 300) BEGIN
          SET @strt = SYSDATETIME()

          IF @xmde = 0 OR @page = 0 BEGIN
            DECLARE sql CURSOR FAST_FORWARD FOR
             SELECT id2, id1
               FROM (SELECT id2, id1
                          , ROW_NUMBER() OVER (ORDER BY id2, id1) rn
                       FROM scale_data
                      WHERE section = @xsec
                    ) result
              WHERE rn >  100 * (@page  )
                AND rn <= 100 * (@page+1);
         
          END; ELSE BEGIN
            SELECT @c2 = c2, @c1 = c1 FROM @cont WHERE section = @xsec;
            DECLARE sql CURSOR FAST_FORWARD FOR
             SELECT TOP 100 id2, id1
               FROM scale_data
              WHERE section = @xsec
                AND id2 >= @c2
                AND ( 
                       (id2 = @c2 AND id1 > @c1)
                    OR 
                       (id2 > @c2)
                    )
              ORDER BY id2, id1
          END;

          OPEN sql; FETCH NEXT FROM sql INTO @c2, @c1;
          WHILE @@FETCH_STATUS = 0 BEGIN
            FETCH NEXT FROM sql INTO @c2, @c1;
          END
          CLOSE sql; DEALLOCATE sql;

          INSERT INTO @table
          VALUES ( @xsec
                 , @xmde
                 , @page
                 , datediff(microsecond, @strt, SYSDATETIME())
                 );
          UPDATE @cont set c1 = @c1, c2 = @c2
           WHERE section = @xsec;
          IF @@ROWCOUNT = 0
           INSERT INTO @cont VALUES(@xsec, @c1, @c2);
          SET @xsec = @xsec + 1
        END;
        SET @page = @page + 1
      END;
      SET @xmde = @xmde + 1
    END;
    SET @iter = @iter + 1
  END;

  RETURN;
END;
GO

SELECT section, mode, page, sum(seconds)
  FROM [dbo].[test_topn_scalability] (10)
 WHERE section=10
 GROUP BY section, mode, page
 ORDER BY section, mode, page;
GO
```

## دوال النوافذ

يستفيد SQL Server 2008R2 من الفهرس لتنفيذ استعلام Top-N متدفق عند استخدام دالة النافذة `ROW_NUMBER`:

```sql
SELECT *
  FROM ( SELECT sales.*
              , ROW_NUMBER() OVER (ORDER BY sale_date DESC
                                          , sale_id   DESC) rn
           FROM sales
       ) tmp
 WHERE rn between 11 and 20
 ORDER BY sale_date DESC, sale_id DESC
```

```
|-Sort(ORDER BY:([sale_date] DESC, [sale_id] DESC))
  |-Filter(WHERE:([Expr1004]>=(11) AND [Expr1004]<=(20)))
    |-Top(TOP EXPRESSION:(20))
      |-Sequence Project(DEFINE:([Expr1004]=row_number))
        |-Segment
          |-Nested Loops(Inner Join, WITH ORDERED PREFETCH)
            |-Index Scan([sales].[sl_dtid], ORDERED BACKWARD)
            |-RID Lookup([sales],
               SEEK:([Bmk1000]=[Bmk1000])
               LOOKUP ORDERED FORWARD)
```

يقرأ SQL Server الفهرس بالاتجاه المعاكس فلا يحتاج إلى عملية فرز لدالة النافذة. وتوقف خطوة Top العمليات الواقعة تحتها فور وصول 20 صفاً. وتقوم الخطوتان الأخيرتان، المعروضتان أولاً في خطة التنفيذ، بترشيح الصفوف العشرة الأولى وفرز النتيجة المتبقية. وسيفرز هذا الفرز عشرة صفوف فقط، فلن يكون مشكلة أداء.
