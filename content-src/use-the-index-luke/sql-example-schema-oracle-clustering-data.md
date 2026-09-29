---
title: "Oracle Example Scripts for “Clustering Data”"
lang: en
---

This section contains the `create` and `insert` statements to run the examples from [Chapter 5*Clustering Data: The Second Power of Indexing*](/sql/clustering) in an Oracle 11gR2 database.

## Index-Organized Table

The following creates a second sales table as index-organized table. A secondary index on `SALE_DATE` is created.

```sql
CREATE TABLE sales_iot (
  sale_id       NUMBER NOT NULL,
  employee_id   NUMBER NOT NULL,
  subsidiary_id NUMBER NOT NULL,
  sale_date     DATE   NOT NULL,
  eur_value     NUMBER(17,2) NOT NULL,
  junk          CHAR(200),
  CONSTRAINT sales_iot_pk     
     PRIMARY KEY (sale_id),
  CONSTRAINT sales_iot_emp_fk 
     FOREIGN KEY          (subsidiary_id, employee_id)
      REFERENCES employees(subsidiary_id, employee_id)
) ORGANIZATION INDEX;

EXEC DBMS_RANDOM.SEED(0);

INSERT INTO sales_iot (sale_id
                     , subsidiary_id, employee_id
                     , sale_date, eur_value, junk)
SELECT rownum, data.*
  FROM (
       SELECT e.subsidiary_id, e.employee_id
            , TRUNC (SYSDATE 
                   - DBMS_RANDOM.VALUE(0, 3650)) sale_date
            , DBMS_RANDOM.VALUE(10,10000)/100 eur_value
            , 'junk'
         FROM employees e
            , ( SELECT level n
                  FROM dual
               CONNECT BY level < 1800
              ) gen
        WHERE MOD(employee_id, 7) = 4
          AND gen.n < employee_id / 5
        ORDER BY sale_date
       ) data;

CREATE INDEX sales_iot_date ON sales_iot (sale_date);

BEGIN
     DBMS_STATS.GATHER_TABLE_STATS(null, 'SALES_IOT', 
     METHOD_OPT=>'for all indexed columns', CASCADE => true);
END;
/
```
