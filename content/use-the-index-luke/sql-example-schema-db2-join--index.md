---
title: "سكربتات أمثلة Db2 (LUW) لـ«عملية الربط»"
lang: ar
source: https://use-the-index-luke.com/sql/example-schema/db2/join
---

يحتوي هذا القسم على عبارتَي `create` و`insert` لتشغيل أمثلة [الفصل 4*عملية الربط*](/book/use-the-index-luke/sql-join/index) في قاعدة بيانات IBM Db2 (LUW).

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

ملاحظات:

التسجيل (logging) معطَّل (وهو ما تطلب تعطيل الإيداع التلقائي) للحفاظ على المساحة والوقت.

تُدرَج الصفوف زمنياً لتعكس نمواً طبيعياً للجدول.

جزء صغير فقط من الموظفين لديهم مبيعات أصلاً.

لا مبيعات أيام الأحد.

[قبل الإصدار 10](https://www.ibm.com/docs/en/db2/11.5.x?topic=commands-runstats) تحتاج Db2 إلى اسم جدول مؤهَّل بالكامل (بما في ذلك المخطط) من أجل `RUNSTATS`. وإذا ظهرت لك رسالة خطأ، فجرّب إضافة اسم المخطط. ويمكنك الاستعلام عن CURRENT_SCHEMA هكذا:

```sql
SELECT current_schema FROM sysibm.sysdummy1;
```
