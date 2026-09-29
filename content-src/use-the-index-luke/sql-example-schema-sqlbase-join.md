---
title: "SQLBase Example Scripts for “The Join Operation”"
lang: en
---

This section contains the `create` and `insert` code to run the examples from [Chapter 4*The Join Operation*](/sql/join) in an Gupta/Unify SQLBase database.

```sql
CREATE TABLE sales (
  sale_id       INTEGER NOT NULL,
  employee_id   INTEGER NOT NULL,
  subsidiary_id INTEGER NOT NULL,
  sale_date     DATE   NOT NULL,
  eur_value     DECIMAL(13,2) NOT NULL,
  product_id    INTEGER NOT NULL,
  quantity      INTEGER NOT NULL,
  junk          CHAR(200),
  PRIMARY KEY (sale_id),
  FOREIGN KEY (subsidiary_id, employee_id)
   REFERENCES employees
);

﻿CREATE UNIQUE INDEX sales_pk ON sales (sale_id);

INSERT INTO sales (sale_id
                 , subsidiary_id, employee_id
                 , sale_date, eur_value
                 , product_id, quantity
                 , junk)
       SELECT gen.n *2000*30 + e.employee_id * 30 + e.subsidiary_id AS sale_id
            , e.subsidiary_id, e.employee_id
            , SYSDATE - @mod(n+@MICROSECOND(@NOW), 10*365) AS  sale_date
            , (@MOD(@MICROSECOND(@NOW)+n, 9000) + 1000)/100 AS eur_value
            , @MOD(@SECOND(@NOW)+n/9000*29,29) AS product_id
            , @MOD(@SECOND(@NOW)+n/9000*26,5) AS quantity
            , 'junk'
         FROM employees e
          , generator_4k gen
        WHERE @MOD(employee_id, 7) = 4
              AND gen.n < 1800
          AND gen.n < employee_id / 5 ;
```

Notes:

- The rows are NOT inserted chronologically
- Only a small fraction of employees have sales at all.
