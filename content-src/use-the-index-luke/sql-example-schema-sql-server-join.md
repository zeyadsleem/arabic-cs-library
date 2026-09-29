---
title: "SQL Server Scripts for “The Join Operation”"
lang: en
---

This section contains the `create`, `insert` and T-SQL code to run the examples from [Chapter 4*The Join Operation*](/sql/join) in a SQL Server database. It requires the helper functions `RANDOM_DATE` and `RANDOM_INT` from the [where clause examples](/sql/example-schema/sql-server/where-clause).

```sql
CREATE TABLE sales (
  sale_id       NUMERIC NOT NULL,
  employee_id   NUMERIC NOT NULL,
  subsidiary_id NUMERIC NOT NULL,
  sale_date     DATE    NOT NULL,
  eur_value     NUMERIC(17,2) NOT NULL,
  product_id    NUMERIC NOT NULL,
  quantity      NUMERIC NOT NULL,
  junk          CHAR(200),
  CONSTRAINT sales_pk     
     PRIMARY KEY NONCLUSTERED (sale_id),
  CONSTRAINT sales_emp_fk 
     FOREIGN KEY          (subsidiary_id, employee_id)
      REFERENCES employees(subsidiary_id, employee_id)
);
GO

SELECT RAND(0);
GO

WITH generator (n)
  AS (
     SELECT 1
      UNION ALL
     SELECT n + 1
       FROM generator
      WHERE N < 1800
     )
INSERT INTO sales (sale_id
                 , subsidiary_id, employee_id
                 , sale_date, eur_value
                 , product_id, quantity
                 , junk)
SELECT row_number() OVER (ORDER BY sale_date), data.*
  FROM (
       SELECT e.subsidiary_id, e.employee_id
            , [dbo].random_date(0, 3650) sale_date
            , [dbo].random_int(1, 100000)/100 eur_value
            , [dbo].random_int(1, 25) product_id
            , [dbo].random_int(1, 5) quantity
            , 'junk' junk
         FROM employees e
            , generator gen
        WHERE employee_id % 7 = 4
          AND gen.n < employee_id / 5
       ) data
        WHERE DATEPART(weekday, sale_date)
           <> DATEPART(weekday, '2012-01-01')
        ORDER BY sale_date
OPTION(MAXRECURSION 2000);
GO

EXEC sp_updatestats;
GO
```

Notes:

- The rows are inserted chronologically to reflect a natural table growth.
- Only a small fraction of employees have sales at all.
