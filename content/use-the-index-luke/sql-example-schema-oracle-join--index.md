---
title: "سكربتات أمثلة Oracle لـ«عملية الربط»"
lang: ar
source: https://use-the-index-luke.com/sql/example-schema/oracle/join
---

يحتوي هذا القسم على شيفرة `create` و`insert` وPL/SQL لتشغيل أمثلة [الفصل 4*عملية الربط*](/book/use-the-index-luke/sql-join/index) في قاعدة بيانات Oracle 11gR2.

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

ملاحظات:

- تُدرَج الصفوف زمنياً لتعكس نمواً طبيعياً للجدول.
- جزء صغير فقط من الموظفين لديهم مبيعات أصلاً.
- لا مبيعات أيام الأحد. غير أن تحقيق ذلك صعب لأن [`TO_CHAR` في Oracle حسّاس لإعدادات `NLS_TERRITORY`](https://renenyffenegger.ch/notes/development/databases/Oracle/SQL/functions/type-conversion/to/char/index). واستخدام `TO_CHAR` على الطرفين يلغي ذلك الأثر — لذا نُفِّذ بمقارنة يوم الأسبوع بيوم أحد معلوم (1 يناير 2012).
