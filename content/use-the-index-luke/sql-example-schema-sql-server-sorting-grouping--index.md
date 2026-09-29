---
title: "سكربتات SQL Server لـ«الترتيب والتجميع»"
lang: ar
source: https://use-the-index-luke.com/sql/example-schema/sql-server/sorting-grouping
---

يحتوي هذا القسم على الشيفرة وخطط التنفيذ الخاصة بـ[الفصل 6*الترتيب والتجميع*](/book/use-the-index-luke/sql-sorting-grouping/index) في قاعدة بيانات SQL Server.

## `order by` المفهرس

```sql
DROP INDEX sales_date ON sales;
GO

CREATE INDEX sales_dt_pr ON sales (sale_date, product_id);
GO

EXEC sp_updatestats;
GO

SET STATISTICS PROFILE ON;

SELECT sale_date, product_id, quantity
  FROM sales
 WHERE sale_date = DATEADD(day, -1, GETDATE())
 ORDER BY  sale_date, product_id;
```

لا ينفّذ التنفيذ عملية فرز:

```
Nested Loops(Inner Join, OUTER REFERENCES:[Bmk1000])
 |--Index Seek(OBJECT:([sales].[sales_dt_pr]),
 |  SEEK:[sales].[sale_date]=dateadd(day,(-1),getdate())
 |  ORDERED FORWARD)
 |--RID Lookup(OBJECT:([sales]),
    SEEK:[Bmk1000]=[Bmk1000]) LOOKUP ORDERED FORWARD
```

ويستخدم SQL Server خطة التنفيذ نفسها عند الترتيب حسب `PRODUCT_ID` وحده.

```sql
SELECT sale_date, product_id, quantity
  FROM sales
 WHERE sale_date = DATEADD(day, -1, GETDATE())
 ORDER BY product_id;
```

ويستلزم استخدام شرط «أكبر من أو يساوي» عملية `Sort`:

```sql
SELECT sale_date, product_id, quantity
  FROM sales
 WHERE sale_date >= DATEADD(day, -1, GETDATE())
 ORDER BY product_id;
```

مع أن تقدير عدد الصفوف انخفض، ما جعل التكلفة أقل أيضاً:

```
Sort(ORDER BY:([test].[dbo].[sales].[product_id] ASC))
 |--Nested Loops(Inner Join, OPTIMIZED WITH UNORDERED PREFETCH)
    |--Compute Scalar(DEFINE:([Expr1009]=BmkToPage([Bmk1000])))
    |  |--Nested Loops(Inner Join)
    |     |--Compute Scalar([...])
    |     |  |--Constant Scan
    |     |--Index Seek(OBJECT:([sales].[sales_dt_pr]),
    |        SEEK:([sales].[sale_date] > [Expr1007]
    |         AND  [sales].[sale_date] < NULL) ORDERED FORWARD)
    |--RID Lookup(OBJECT:([sales]),
       SEEK:([Bmk1000]=[Bmk1000]) LOOKUP ORDERED FORWARD)
```

## فهرسة ASC وDESC وNULLS FIRST/LAST

مسح الفهرس بالاتجاه المعاكس:

```sql
SELECT sale_date, product_id, quantity
  FROM sales
 WHERE sale_date >= DATEADD(day, -1, GETDATE())
 ORDER BY sale_date DESC, product_id DESC;
```

ويسبّب خلط `ASC` و`DESC` فرزاً صريحاً:

```sql
SELECT sale_date, product_id, quantity
  FROM sales
 WHERE sale_date >= DATEADD(day, -1, GETDATE())
 ORDER BY sale_date ASC, product_id DESC;
```

ترتيب الفهرس بمُعدِّلات `ASC`/`DESC` مختلطة:

```sql
DROP INDEX sales_dt_pr ON sales;
GO

CREATE INDEX sales_dt_pr
    ON sales (sale_date ASC, product_id DESC);
GO

SELECT sale_date, product_id, quantity
  FROM sales
 WHERE sale_date >= DATEADD(day, -1, GETDATE())
 ORDER BY sale_date ASC, product_id DESC;
```

لا يطبّق SQL Server 2008R2 امتداد `NULLS` في `order by`.

```sql
SELECT sale_date, product_id, quantity
  FROM sales
 WHERE sale_date >= DATEADD(day, -1, GETDATE())
 ORDER BY sale_date ASC, product_id DESC NULLS LAST;
```

## `group by` المفهرس

تنفيذ `group by` متدفق:

```sql
SELECT product_id, SUM(eur_value)
  FROM sales
 WHERE sale_date = DATEADD(day, -1, GETDATE())
 GROUP BY product_id;
```

فرز/تجميع صريح عند استرجاع الإحصاءات ليومين (التوازي معطَّل لقراءة الخطة بوضوح):

```sql
SELECT product_id, SUM(eur_value)
  FROM sales
 WHERE sale_date >= DATEADD(day, -1, GETDATE())
 GROUP BY product_id
OPTION (MAXDOP 1);
```

وتُستخدم خوارزمية التجزئة عند تجميع مجموعة أكبر:

```sql
SELECT product_id, SUM(eur_value)
  FROM sales
 WHERE sale_date >= DATEADD(day, -100, GETDATE())
 GROUP BY product_id
OPTION (MAXDOP 1);
```
