---
title: "سكربتات أمثلة MySQL لـ«تجميع البيانات»"
lang: ar
source: https://use-the-index-luke.com/sql/example-schema/mysql/clustering-data
---

يحتوي هذا القسم على شيفرة `create` و`insert` لتشغيل أمثلة [الفصل 5*تجميع البيانات: القوة الثانية للفهرسة*](/book/use-the-index-luke/sql-clustering/index) في قاعدة بيانات MySQL.

## الجداول المنظَّمة بالفهرس (الفهارس العنقودية)

ينشئ ما يلي جدول `SALES` ثانياً باستخدام محرّك InnoDB بحيث يُنشأ كفهرس عنقودي. ويُضاف فهرس ثانوي على العمود `SALE_DATE`.

```sql
CREATE TABLE sales_inno (
  sale_id       NUMERIC NOT NULL,
  employee_id   NUMERIC NOT NULL,
  subsidiary_id NUMERIC NOT NULL,
  sale_date     DATE   NOT NULL,
  eur_value     NUMERIC(17,2) NOT NULL,
  junk          CHAR(200),
  CONSTRAINT sales_pk     
     PRIMARY KEY (sale_id)
) Engine=InnoDB;

INSERT INTO sales_inno (sale_id
                      , subsidiary_id, employee_id
                      , sale_date, eur_value, junk)
SELECT @row := @row + 1 sale_id
     , data.*
  FROM (
       SELECT e.subsidiary_id, e.employee_id
            , CURDATE() - INTERVAL (RAND(0)*3650) DAY sale_date
            , TRUNCATE(RAND(1)*99.90+0.1,2) eur_value
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

CREATE INDEX sales_inno_dt ON sales_inno (sale_date);
```

لاحظ عبارة «Using Index» الدالة على مسح الفهرس فقط:

```
EXPLAIN
 SELECT sale_id 
   FROM sales_inno
  WHERE sale_date = ?;

+----+------------+------+---------------+------+-------------+
| id | table      | type | key           | rows | Extra       |
+----+------------+------+---------------+------+-------------+
|  1 | sales_inno | ref  | sales_inno_dt |  301 | Using index |
+----+------------+------+---------------+------+-------------+
```
