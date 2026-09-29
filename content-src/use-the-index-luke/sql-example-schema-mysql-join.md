---
title: "MySQL Example Scripts for “The Join Operation”"
lang: en
---

This section contains the `create` and `insert` code to run the examples from [Chapter 4*The Join Operation*](/sql/join) in an MySQL database.

```sql
CREATE TABLE sales (
  sale_id       NUMERIC NOT NULL,
  employee_id   NUMERIC NOT NULL,
  subsidiary_id NUMERIC NOT NULL,
  sale_date     DATE   NOT NULL,
  eur_value     NUMERIC(17,2) NOT NULL,
  product_id    NUMERIC NOT NULL,
  quantity      NUMERIC NOT NULL,
  junk          CHAR(200),
  CONSTRAINT sales_pk     
     PRIMARY KEY (sale_id),
  CONSTRAINT sales_emp_fk 
     FOREIGN KEY          (subsidiary_id, employee_id)
      REFERENCES employees(subsidiary_id, employee_id)
);

INSERT INTO sales (sale_id
                 , subsidiary_id, employee_id
                 , sale_date, eur_value
                 , product_id, quantity
                 , junk)
SELECT @row := @row + 1 sale_id
     , data.*
  FROM (
       SELECT e.subsidiary_id, e.employee_id
            , CURDATE() - INTERVAL (RAND(0)*3650) DAY sale_date
            , TRUNCATE(RAND(1)*99.90+0.1, 2) eur_value
            , TRUNCATE(RAND(2)*25+1, 0) product_id
            , TRUNCATE(RAND(3)*5+1, 0) quantity
            , 'junk'
         FROM employees e
            , ( SELECT generator_4k.n+1 n
                  FROM generator_4k
                 WHERE generator_4k.n < 1800
              ) gen
        WHERE MOD(employee_id, 7) = 4
          AND gen.n < employee_id / 5
        ORDER BY sale_date
       ) data, (SELECT @row := 0) init
  WHERE DAYOFWEEK(sale_date) NOT IN (1,7);
```

Notes:

- The rows are inserted chronologically to reflect a natural table growth.
- Only a small fraction of employees have sales at all.
