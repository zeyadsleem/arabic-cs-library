---
title: "سكربتات أمثلة SQLite لـ«جملة WHERE»"
lang: ar
source: https://use-the-index-luke.com/sql/example-schema/sqlite/where-clause
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
CREATE VIEW generator_16
AS SELECT 0 n UNION ALL SELECT 1  UNION ALL SELECT 2  UNION ALL
   SELECT 3   UNION ALL SELECT 4  UNION ALL SELECT 5  UNION ALL
   SELECT 6   UNION ALL SELECT 7  UNION ALL SELECT 8  UNION ALL
   SELECT 9   UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL
   SELECT 12  UNION ALL SELECT 13 UNION ALL SELECT 14 UNION ALL
   SELECT 15;
```

```sql
CREATE VIEW generator_256
AS SELECT ( ( hi.n << 4 ) | lo.n ) AS n
     FROM generator_16 lo, generator_16 hi;
```

```sql
CREATE VIEW generator_4k
AS SELECT ( ( hi.n << 8 ) | lo.n ) AS n
     FROM generator_256 lo, generator_16 hi;
```

```sql
CREATE VIEW generator_64k
AS SELECT ( ( hi.n << 8 ) | lo.n ) AS n
     FROM generator_256 lo, generator_256 hi;
```

```sql
INSERT INTO employees (employee_id,  first_name,
                       last_name,    date_of_birth, 
                       phone_number, junk)
SELECT gen.n +1,
       CHAR( ABS(random()) % 26 + 65
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           ),
       CHAR( ABS(random()) % 26 + 65
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           ),
       DATE('now', '-' || (abs(random()) % 3650 + 40*365) || ' day'),
       ABS(RANDOM())%9000+1000,
       printf('%.1000c','x')
  FROM generator_4k gen
 WHERE gen.n < 1000;
```

```sql
UPDATE employees 
   SET first_name='MARKUS', 
       last_name='WINAND'
 WHERE employee_id=123;
```

```
ANALYZE employees;
```

ملاحظة:

- عرضا `GENERATOR_X` مولّدان للصفوف كما هو موصوف في مقال [مولّد صفوف MySQL](https://use-the-index-luke.com/blog/2011-07-30/mysql-row-generator). وفي الوقت نفسه، يدعم SQLite [جملة WITH التعاودية (منذ 3.8.3)](https://modern-sql.com/caniuse/with_recursive_(top_level)) لكن هذا النهج يعمل مع إصدارات أقدم من SQLite أيضاً.
- يُستخدم العمود `JUNK` للحصول على طول صف واقعي. ولولا هذا العمود لصار الجدول صغيراً بصورة غير واقعية ولما نجح بعض العروض.
- تُملأ بيانات عشوائية في الجدول، باستثناء مدخلي أنا، الذي يُحدَّث بعد الإدراج.
- تُجمع [إحصاءات](/book/use-the-index-luke/sql-where-clause-the-equals-operator-slow-indexes-part-ii/index#sb-statistics) الجدول والفهرس ليعرف [المُحسِّن](/book/use-the-index-luke/sql-where-clause-the-equals-operator-slow-indexes-part-ii/index#sb-optimizer) شيئاً عن محتوى الجدول.

### المفاتيح المُدمجة

```
DROP TABLE employees;
```

```sql
CREATE TABLE employees (
   employee_id   NUMERIC      NOT NULL,
   first_name    VARCHAR(255) NOT NULL,
   last_name     VARCHAR(255) NOT NULL,
   date_of_birth DATE                 ,
   phone_number  VARCHAR(255) NOT NULL,
   junk          CHAR(255)            ,
   subsidiary_id NUMERIC      NOT NULL,
   CONSTRAINT employees_pk PRIMARY KEY (employee_id, subsidiary_id)
);
```

```sql
INSERT INTO employees (employee_id,  first_name,
                       last_name,    date_of_birth, 
                       phone_number, junk, subsidiary_id)
SELECT gen.n +1,
       CHAR( ABS(random()) % 26 + 65
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           ),
       CHAR( ABS(random()) % 26 + 65
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           ),
       DATE('now', '-' || (abs(random()) % 3650 + 40*365) || ' day'),
       ABS(RANDOM())%9000+1000,
       printf('%.1000c','x'),
       30
  FROM generator_4k gen
 WHERE gen.n < 1000;
```

```sql
UPDATE employees 
   SET first_name='MARKUS', 
       last_name='WINAND'
 WHERE employee_id=123
   AND subsidiary_id=30;
```

```sql
-- generate more records (Very Big Company)
INSERT INTO employees (employee_id,  first_name, 
                       last_name,    date_of_birth, 
                       phone_number, subsidiary_id, junk)
SELECT gen.n + 1,
       CHAR( ABS(random()) % 26 + 65
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           ),
       CHAR( ABS(random()) % 26 + 65
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           ),
       DATE('now', '-' || (abs(random()) % 3650 + 40*365) || ' day'),
       ABS(RANDOM())%9000+1000,
       CAST(ABS(RANDOM())%(gen.n/9000.0 * 29 + 1) + 1 AS INTEGER),
       printf('%.10c','x')
  FROM generator_64k gen
 WHERE gen.n < 9000;
```

```
ANALYZE employees;
```

ملاحظات:

- بما أن SQLite لا يستطيع تغيير المفاتيح الأساسية بـ`ALTER TABLE`، يُسقط الجدول بأكمله ويعاد إنشاؤه.
- المفتاح الأساسي الجديد يشمل `SUBSIDIARY_ID`؛ أي إن `EMPLOYEE_ID` يبقى في الموضع الأول.
- تُوزَّع السجلات الجديدة عشوائياً على الفروع من 1 إلى 29.
- يُحلَّل الجدول والفهرس مرة أخرى ليعي المُحسِّن حجم البيانات المتنامي.

ويقدّم السكربت التالي الفهرس على `SUBSIDIARY_ID` لدعم الاستعلام عن جميع موظفي فرع معيّن:

```sql
CREATE INDEX emp_sub_id ON employees(subsidiary_id)
```

ومع أن ذلك يعطي أداءً جيداً، فالأفضل استخدام الفهرس الذي يدعم المفتاح الأساسي:

```
DROP TABLE employees;
```

```sql
CREATE TABLE employees (
   employee_id   NUMERIC      NOT NULL,
   first_name    VARCHAR(255) NOT NULL,
   last_name     VARCHAR(255) NOT NULL,
   date_of_birth DATE                 ,
   phone_number  VARCHAR(255) NOT NULL,
   junk          CHAR(255)            ,
   subsidiary_id NUMERIC      NOT NULL,
   CONSTRAINT employees_pk PRIMARY KEY (subsidiary_id, employee_id)
);
```

```sql
INSERT INTO employees (employee_id,  first_name,
                       last_name,    date_of_birth, 
                       phone_number, junk, subsidiary_id)
SELECT gen.n +1,
       CHAR( ABS(random()) % 26 + 65
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           ),
       CHAR( ABS(random()) % 26 + 65
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           ),
       DATE('now', '-' || (abs(random()) % 3650 + 40*365) || ' day'),
       ABS(RANDOM())%9000+1000,
       printf('%.1000c','x'),
       30
  FROM generator_4k gen
 WHERE gen.n < 1000;
```

```sql
UPDATE employees 
   SET first_name='MARKUS', 
       last_name='WINAND'
 WHERE employee_id=123
   AND subsidiary_id=30;
```

```sql
-- generate more records (Very Big Company)
INSERT INTO employees (employee_id,  first_name, 
                       last_name,    date_of_birth, 
                       phone_number, subsidiary_id, junk)
SELECT gen.n + 1,
       CHAR( ABS(random()) % 26 + 65
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           ),
       CHAR( ABS(random()) % 26 + 65
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           ),
       DATE('now', '-' || (abs(random()) % 3650 + 40*365) || ' day'),
       ABS(RANDOM())%9000+1000,
       CAST(ABS(RANDOM())%(gen.n/9000.0 * 29 + 1) + 1 AS INTEGER),
       printf('%.10c','x')
  FROM generator_64k gen
 WHERE gen.n < 9000;
```

```
ANALYZE employees;
```

ملاحظات:

- يُعاد إنشاء كل شيء مرة أخرى، لأن SQLite لا يدعم تعديل المفتاح الأساسي.

## الدوال

لا يدعم SQLite صيغة `create function`، ولذلك نحتاج إلى استخدام التعبير لحساب العمر الحالي مباشرةً في الاستعلام.

```sql
SELECT first_name, last_name
     , CAST(STRFTIME('%Y.%m%d', 'now') - STRFTIME('%Y.%m%d', date_of_birth) AS INT)
  FROM employees
 WHERE CAST(STRFTIME('%Y.%m%d', 'now') - STRFTIME('%Y.%m%d', date_of_birth) AS INT) = 42
```

لاحظ أن العمر يُحسب [بتنسيق التواريخ كسنوات كسرية](https://stackoverflow.com/questions/3123951/sqlite-how-to-calculate-age-from-birth-date/17501785#17501785).

ويمكن فهرسة التعبيرات إذا كانت حتمية.

```sql
CREATE INDEX emp_age ON employees
     ( CAST(STRFTIME('%Y.%m%d', 'now') - STRFTIME('%Y.%m%d', date_of_birth) AS INT) )
```

```
Error: non-deterministic use of strftime() in an index
```
