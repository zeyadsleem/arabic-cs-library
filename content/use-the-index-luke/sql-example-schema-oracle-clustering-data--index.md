---
title: "سكربتات أمثلة Oracle لـ«تجميع البيانات»"
lang: ar
source: https://use-the-index-luke.com/sql/example-schema/oracle/clustering-data
---

يحتوي هذا القسم على عبارتَي `create` و`insert` لتشغيل أمثلة [الفصل 5*تجميع البيانات: القوة الثانية للفهرسة*](/book/use-the-index-luke/sql-clustering/index) في قاعدة بيانات Oracle 11gR2.

## الجدول المنظَّم بالفهرس

ينشئ ما يلي جدول مبيعات ثانياً كجدول منظَّم بالفهرس. ويُنشأ فهرس ثانوي على `SALE_DATE`.

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
