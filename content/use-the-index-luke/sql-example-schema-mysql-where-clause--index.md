---
title: "سكربتات أمثلة MySQL لـ«جملة WHERE»"
lang: ar
source: https://use-the-index-luke.com/sql/example-schema/mysql/where-clause
---

## معامل المساواة

### المفاتيح البديلة

إنشاء جدول `EMPLOYEES` بألف صف.

```sql
CREATE TABLE employees (
   employee_id   NUMERIC      NOT NULL,
   first_name    VARCHAR(255) NOT NULL,
   last_name     VARCHAR(255) NOT NULL,
   date_of_birth DATE                 ,
   phone_number  VARCHAR(255) NOT NULL,
   junk          CHAR(255)            ,
   CONSTRAINT employees_pk PRIMARY KEY (employee_id)
);
```

```sql
CREATE OR REPLACE VIEW generator_16
AS SELECT 0 n UNION ALL SELECT 1  UNION ALL SELECT 2  UNION ALL
   SELECT 3   UNION ALL SELECT 4  UNION ALL SELECT 5  UNION ALL
   SELECT 6   UNION ALL SELECT 7  UNION ALL SELECT 8  UNION ALL
   SELECT 9   UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL
   SELECT 12  UNION ALL SELECT 13 UNION ALL SELECT 14 UNION ALL
   SELECT 15;
```

```sql
CREATE OR REPLACE VIEW generator_256
AS SELECT ( ( hi.n << 4 ) | lo.n ) AS n
     FROM generator_16 lo, generator_16 hi;
```

```sql
CREATE OR REPLACE VIEW generator_4k
AS SELECT ( ( hi.n << 8 ) | lo.n ) AS n
     FROM generator_256 lo, generator_16 hi;
```

```sql
CREATE OR REPLACE VIEW generator_64k
AS SELECT ( ( hi.n << 8 ) | lo.n ) AS n
     FROM generator_256 lo, generator_256 hi;
```

```sql
INSERT INTO employees (employee_id,  first_name,
                       last_name,    date_of_birth, 
                       phone_number, junk)
SELECT gen.n +1,
       GROUP_CONCAT(CHAR((RAND() * 25)+97) SEPARATOR ''),
       GROUP_CONCAT(CHAR((RAND() * 25)+97) SEPARATOR ''),
       SUBDATE(CURDATE(), INTERVAL (RAND()*3650 + 40*365) DAY),
       FLOOR(RAND()*9000+1000),
       'junk'
  FROM generator_4k gen, generator_16 rand
 WHERE gen.n < 1000
 GROUP BY gen.n;
```

```sql
UPDATE employees 
   SET first_name='MARKUS', 
       last_name='WINAND'
 WHERE employee_id=123;
```

```
ANALYZE TABLE employees;
```

ملاحظة:

- عرضا `GENERATOR_X` مولّدان للصفوف كما هو موصوف في مقال [مولّد صفوف MySQL](https://use-the-index-luke.com/blog/2011-07-30/mysql-row-generator).
- يُستخدم العمود `JUNK` للحصول على طول صف واقعي. ولأن نوع بياناته `CHAR` لا `VARCHAR`، فهو يخزّن دائماً 255 محرفاً. ولولا هذا العمود لصار الجدول صغيراً بصورة غير واقعية ولما نجح بعض العروض.
- تُملأ بيانات عشوائية في الجدول، باستثناء مدخلي أنا، الذي يُحدَّث بعد الإدراج.
- تُجمع [إحصاءات](/book/use-the-index-luke/sql-where-clause-the-equals-operator-slow-indexes-part-ii/index#sb-statistics) الجدول والفهرس ليعرف [المُحسِّن](/book/use-the-index-luke/sql-where-clause-the-equals-operator-slow-indexes-part-ii/index#sb-optimizer) شيئاً عن محتوى الجدول.

### المفاتيح المُدمجة

```sql
-- add subsidiary_id and update existing records
ALTER TABLE employees ADD subsidiary_id NUMERIC;
```

```sql
UPDATE      employees SET subsidiary_id = 30;
```

```sql
ALTER TABLE employees MODIFY subsidiary_id NUMERIC NOT NULL;
```

```sql
-- change the PK
ALTER TABLE employees DROP PRIMARY KEY;
```

```sql
ALTER TABLE employees ADD CONSTRAINT employees_pk 
      PRIMARY KEY (employee_id, subsidiary_id);
```

```sql
-- generate more records (Very Big Company)
INSERT INTO employees (employee_id,  first_name, 
                       last_name,    date_of_birth, 
                       phone_number, subsidiary_id, junk)
SELECT gen.n + 1
     , GROUP_CONCAT(CHAR( RAND()*25 + 97) SEPARATOR '')
     , GROUP_CONCAT(CHAR( RAND()*25 + 97) SEPARATOR '')
     , CURDATE() - INTERVAL (RAND(0)*365*10 + 40*365) DAY
     , FLOOR(RAND()*9000 + 1000)
     , FLOOR(RAND()*(gen.n/9000)*29 + 1)
     , 'junk'
  FROM generator_64k gen, generator_16 rand
 WHERE gen.n < 9000
 GROUP BY gen.n;
```

```
ANALYZE TABLE employees;
```

ملاحظات:

- المفتاح الأساسي الجديد يشمل `SUBSIDIARY_ID`؛ أي إن `EMPLOYEE_ID` يبقى في الموضع الأول.
- تُوزَّع السجلات الجديدة عشوائياً على الفروع من 1 إلى 29.
- يُحلَّل الجدول والفهرس مرة أخرى ليعي المُحسِّن حجم البيانات المتنامي.

ويقدّم السكربت التالي الفهرس على `SUBSIDIARY_ID` لدعم الاستعلام عن جميع موظفي فرع معيّن:

```sql
ALTER TABLE employees ADD INDEX emp_sub_id (subsidiary_id)
```

ومع أن ذلك يعطي أداءً جيداً، فالأفضل استخدام الفهرس الذي يدعم المفتاح الأساسي:

```sql
-- use tmp index to support the PK
ALTER TABLE employees
  ADD UNIQUE INDEX tmp (employee_id, subsidiary_id);
```

```sql
ALTER TABLE employees
 DROP PRIMARY KEY;
```

```sql
ALTER TABLE employees
  ADD PRIMARY KEY (subsidiary_id, employee_id);
```

```sql
ALTER TABLE employees
 DROP INDEX tmp;
```

```sql
ALTER TABLE employees
 DROP INDEX emp_sub_id;
```

```
ANALYZE TABLE employees;
```

ملاحظات:

- يُنشأ فهرس فريد جديد ويُستخدم ليكون بديلاً عن المفتاح الأساسي.
- يُسقط المفتاح الأساسي ويُعاد إنشاؤه بترتيب الأعمدة الجديد.
- يُسقط الفهرس المؤقت، وكذلك الفهرس على معرّف الفرع الذي لم يعد لازماً.

## الدوال

يستخدم MySQL ترتيباً محرّفياً غير حسّاس لحالة الأحرف افتراضياً. علاوة على ذلك، لم تكن MySQL تدعم الفهارس القائمة على الدوال قبل الإصدار 5.7. وفي تلك الحالة لا تحتاج إلى فهرس قائم على الدوال؛ فالفهرس العادي يكفي:

```sql
CREATE INDEX emp_name ON employees (last_name)
```

وبدءاً من الإصدار 5.7، يمكن فهرسة الأعمدة المحسوبة في MySQL:

لا يمكن استخدام الدوال المعرّفة من المستخدم في الأعمدة المولّدة — ولا حتى إذا كانت حتمية ومُعلَنة كذلك.

```sql
CREATE FUNCTION get_age(date_of_birth DATE)
RETURNS INTEGER NO SQL
RETURN TIMESTAMPDIFF(YEAR,date_of_birth,CURDATE());
```

```sql
ALTER TABLE employees
  ADD COLUMN last_name_up VARCHAR(255) AS (UPPER(last_name));
```

```sql
CREATE INDEX emp_up_name ON employees (last_name_up);
```
