---
title: "SQL Server Scripts for “Sorting and Grouping”"
lang: en
---

This section contains the code and execution plans for [Chapter 6*Sorting and Grouping*](/sql/sorting-grouping) in a SQL Server database.

## Indexed Order By

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

The execution does not perform a sort operation:

```
Nested Loops(Inner Join, OUTER REFERENCES:[Bmk1000])
 |--Index Seek(OBJECT:([sales].[sales_dt_pr]),
 |  SEEK:[sales].[sale_date]=dateadd(day,(-1),getdate())
 |  ORDERED FORWARD)
 |--RID Lookup(OBJECT:([sales]),
    SEEK:[Bmk1000]=[Bmk1000]) LOOKUP ORDERED FORWARD
```

SQL Server uses the same execution plan, when sorting by `PRODUCT_ID` only.

```sql
SELECT sale_date, product_id, quantity
  FROM sales
 WHERE sale_date = DATEADD(day, -1, GETDATE())
 ORDER BY product_id;
```

Using an greater or equals condition requires an Sort operation:

```sql
SELECT sale_date, product_id, quantity
  FROM sales
 WHERE sale_date >= DATEADD(day, -1, GETDATE())
 ORDER BY product_id;
```

Although the row estimate got lower, causing the cost also to be lower:

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

## Indexing ASC, DESC and NULLS FIRST/LAST

Scanning an index backwards:

```sql
SELECT sale_date, product_id, quantity
  FROM sales
 WHERE sale_date >= DATEADD(day, -1, GETDATE())
 ORDER BY sale_date DESC, product_id DESC;
```

Mixing `ASC` and `DESC` causes an explicit sort:

```sql
SELECT sale_date, product_id, quantity
  FROM sales
 WHERE sale_date >= DATEADD(day, -1, GETDATE())
 ORDER BY sale_date ASC, product_id DESC;
```

Ordering the index with mixed `ASC`/`DESC` modifiers:

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

SQL Server 2008R2 does not implement the `order by` `NULLS` extension.

```sql
SELECT sale_date, product_id, quantity
  FROM sales
 WHERE sale_date >= DATEADD(day, -1, GETDATE())
 ORDER BY sale_date ASC, product_id DESC NULLS LAST;
```

## Indexed Group By

Pipelined `group by` execution:

```sql
SELECT product_id, SUM(eur_value)
  FROM sales
 WHERE sale_date = DATEADD(day, -1, GETDATE())
 GROUP BY product_id;
```

Explicit Sort/Group when retrieving the stats for two days (parallelism disable for plan readability):

```sql
SELECT product_id, SUM(eur_value)
  FROM sales
 WHERE sale_date >= DATEADD(day, -1, GETDATE())
 GROUP BY product_id
OPTION (MAXDOP 1);
```

The Hash-Algorithm is used when aggregating a larger set:

```sql
SELECT product_id, SUM(eur_value)
  FROM sales
 WHERE sale_date >= DATEADD(day, -100, GETDATE())
 GROUP BY product_id
OPTION (MAXDOP 1);
```
