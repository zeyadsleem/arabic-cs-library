---
title: "Oracle Example Scripts for “The Join Operation”"
lang: en
---

This section contains the `create`, `insert` and PL/SQL code to run the examples from [Chapter 4*The Join Operation*](/sql/join) in an Oracle 11gR2 database.

```sql
CREATE TABLE sales (
  sale_id       NUMBER NOT NULL,
  employee_id   NUMBER NOT NULL,
  subsidiary_id NUMBER NOT NULL,
  sale_date     DATE   NOT NULL,
  eur_value     NUMBER(17,2) NOT NULL,
  product_id    NUMBER NOT NULL,
  quantity      number NOT NULL,
  junk          CHAR(200),
  CONSTRAINT sales_pk     
     PRIMARY KEY (sale_id),
  CONSTRAINT sales_emp_fk 
     FOREIGN KEY          (subsidiary_id, employee_id)
      REFERENCES employees(subsidiary_id, employee_id)
);

EXEC DBMS_RANDOM.SEED(0);

INSERT INTO sales (sale_id
                 , subsidiary_id, employee_id
                 , sale_date, eur_value
                 , product_id, quantity
                 , junk)
SELECT rownum, data.*
  FROM (
       SELECT e.subsidiary_id, e.employee_id
            , TRUNC(SYSDATE
                  - DBMS_RANDOM.VALUE(0, 3650)) sale_date
            , DBMS_RANDOM.VALUE(10,10000)/100 eur_value
            , TRUNC(DBMS_RANDOM.VALUE(1,25)) product_id
            , TRUNC(DBMS_RANDOM.VALUE(1,5)) quantity
            , 'junk'
         FROM employees e
            , ( SELECT level n
                  FROM dual
               CONNECT BY level < 1800
              ) gen
        WHERE MOD(employee_id, 7) = 4
          AND gen.n < employee_id / 5
        ORDER BY sale_date
       ) data
 WHERE TO_CHAR(sale_date, 'D') 
    != TO_CHAR(TO_DATE('2012-01-01', 'YYYY-MM-DD'), 'D');

BEGIN
     DBMS_STATS.GATHER_TABLE_STATS(null, 'SALES', 
     METHOD_OPT=>'for all indexed columns', CASCADE => true);
END;
/
```

Notes:

- The rows are inserted chronologically to reflect a natural table growth.
- Only a small fraction of employees have sales at all.
- No sales on Sundays. This is, however, hard to accomplish because [Oracle’s `TO_CHAR` is sensitive to `NLS_TERRITORY`](https://renenyffenegger.ch/notes/development/databases/Oracle/SQL/functions/type-conversion/to/char/index) settings. Using `TO_CHAR` on both sides cancels that effect—so, it is implemented by a comparison of the weekday for a known Sunday (1st Jan 2012).
