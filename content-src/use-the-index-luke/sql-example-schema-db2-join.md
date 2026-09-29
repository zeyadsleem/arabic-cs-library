---
title: "Db2 (LUW) Example Scripts for “The Join Operation”"
lang: en
---

This section contains the `create` and `insert` statements to run the examples from [Chapter 4*The Join Operation*](/sql/join) in an IBM Db2 (LUW) database.

```sql
--#SET TERMINATOR ;

-- Disable autocommit
UPDATE COMMAND OPTIONS USING C OFF;

CREATE TABLE sales (
  sale_id       NUMERIC(10,0) NOT NULL,
  employee_id   NUMERIC(10,0) NOT NULL,
  subsidiary_id NUMERIC(10,0) NOT NULL,
  sale_date     DATE          NOT NULL,
  eur_value     NUMERIC(17,2) NOT NULL,
  product_id    NUMERIC(10,0) NOT NULL,
  quantity      NUMERIC(10,0) NOT NULL,
  junk          CHAR(200),
  CONSTRAINT sales_pk     
     PRIMARY KEY (sale_id),
  CONSTRAINT sales_emp_fk 
     FOREIGN KEY          (subsidiary_id, employee_id)
      REFERENCES employees(subsidiary_id, employee_id)
) NOT LOGGED INITIALLY;

INSERT INTO sales (sale_id
                 , subsidiary_id, employee_id
                 , sale_date, eur_value
                 , product_id, quantity
                 , junk)
WITH generator (n) AS
( SELECT 1 n   FROM sysibm.sysdummy1
   UNION ALL
  SELECT n + 1 FROM generator
   WHERE n < 1800
)
SELECT row_number() OVER (), data.*
  FROM (
       SELECT e.subsidiary_id, e.employee_id
            , CURRENT_DATE - floor(rand() * 365 * 10 ) days sale_date
            , CAST(rand()*1000 AS NUMERIC(17,2)) eur_value
            , CAST(rand()*25 AS NUMERIC(2,0)) + 1 product_id
            , CAST(rand()*5 AS NUMERIC(1,0)) + 1 quantity
            , 'junk'
         FROM employees e
            , generator gen
        WHERE MOD(employee_id, 7) = 4
          AND gen.n < employee_id / 5
        ORDER BY sale_date
       ) data
 WHERE dayofweek(sale_date) NOT IN (1,7);

COMMIT;

CREATE INDEX sales_sub_emp ON sales (subsidiary_id, employee_id);

RUNSTATS ON TABLE sales;
```

Notes:

Logging is disabled (which required disabling auto commit) to preserve space and time.

The rows are inserted chronologically to reflect a natural table growth.

Only a small fraction of employees have sales at all.

No sales on Sundays.

[Before version 10](https://www.ibm.com/docs/en/db2/11.5.x?topic=commands-runstats) Db2 needs a fully qualified table name (including schema) for `RUNSTATS`. If you are getting an error, try adding the schema name. You can query for the CURRENT_SCHEMA like this:

```sql
SELECT current_schema FROM sysibm.sysdummy1;
```
