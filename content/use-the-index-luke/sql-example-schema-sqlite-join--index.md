---
title: "سكربتات أمثلة SQLite لـ«عملية الربط»"
lang: ar
source: https://use-the-index-luke.com/sql/example-schema/sqlite/join
---

يحتوي هذا القسم على شيفرة `create` و`insert` لتشغيل أمثلة [الفصل 4*عملية الربط*](/book/use-the-index-luke/sql-join/index) في قاعدة بيانات MySQL.

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
```

```sql
INSERT INTO sales (sale_id
                 , subsidiary_id, employee_id
                 , sale_date, eur_value
                 , product_id, quantity
                 , junk)
SELECT data.*
  FROM (
       SELECT ((e.subsidiary_id * 10001 + e.employee_id) * 1801) + gen.n AS sale_id
            , e.subsidiary_id, e.employee_id
            , DATE('now', '-' || (abs(random()) % 3650) || ' day') sale_date
            , (ABS(RANDOM())%9990)/100 AS eur_value

            , ABS(RANDOM())%25+1 product_id
            , ABS(RANDOM())%15+1 quantity
            , 'junk'
         FROM employees e
         JOIN ( SELECT generator_4k.n+1 n
                  FROM generator_4k
                 WHERE generator_4k.n < 1800
              ) gen
           ON gen.n < employee_id / 5
        WHERE employee_id % 7 = 4
       ) data
  WHERE strftime('%w', sale_date) NOT IN (0,6)
  ORDER BY sale_date;
```

ملاحظات:

- تُدرَج الصفوف زمنياً لتعكس نمواً طبيعياً للجدول.
- جزء صغير فقط من الموظفين لديهم مبيعات أصلاً.
