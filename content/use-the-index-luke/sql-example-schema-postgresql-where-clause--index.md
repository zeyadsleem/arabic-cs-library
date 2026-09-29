---
title: "سكربتات أمثلة PostgreSQL لـ«جملة WHERE»"
lang: ar
source: https://use-the-index-luke.com/sql/example-schema/postgresql/where-clause
---

السكربتات الواردة في هذا الملحق جاهزة للتشغيل وقد اختُبرت على PostgreSQL 9. وستعمل معظم الأمثلة على إصدارات أقدم أيضاً.

## معامل المساواة

### المفاتيح البديلة

ينشئ السكربت التالي جدول `EMPLOYEES` بألف مدخل.

```sql
CREATE TABLE employees (
   employee_id   NUMERIC       NOT NULL,
   first_name    VARCHAR(1000) NOT NULL,
   last_name     VARCHAR(1000) NOT NULL,
   date_of_birth DATE                  ,
   phone_number  VARCHAR(1000) NOT NULL,
   junk          CHAR(1000)            ,
   CONSTRAINT employees_pk PRIMARY KEY (employee_id)
);
```

```sql
CREATE FUNCTION random_string(minlen NUMERIC, maxlen NUMERIC)
RETURNS VARCHAR(1000)
AS
$$
DECLARE
  rv VARCHAR(1000) := '';
  i  INTEGER := 0;
  len INTEGER := 0;
BEGIN
  IF maxlen < 1 OR minlen < 1 OR maxlen < minlen THEN
    RETURN rv;
  END IF;

  len := floor(random()*(maxlen-minlen)) + minlen;

  FOR i IN 1..floor(len) LOOP
    rv := rv || chr(97+CAST(random() * 25 AS INTEGER));
  END LOOP;
  RETURN rv;
END;
$$ LANGUAGE plpgsql;
```

```sql
INSERT INTO employees (employee_id,  first_name,
                       last_name,    date_of_birth, 
                       phone_number, junk)
SELECT GENERATE_SERIES
     , initcap(lower(random_string(2, 8)))
     , initcap(lower(random_string(2, 8)))
     , CURRENT_DATE - CAST(floor(random() * 365 * 10 + 40 * 365) AS NUMERIC) * INTERVAL '1 DAY'
     , CAST(floor(random() * 9000 + 1000) AS NUMERIC)
     , 'junk'
  FROM GENERATE_SERIES(1, 1000);
```

```sql
UPDATE employees 
   SET first_name='MARKUS', 
       last_name='WINAND'
 WHERE employee_id=123;
```

```
VACUUM ANALYZE employees;
```

ملاحظات:

- يُستخدم العمود `JUNK` للحصول على طول صف واقعي. ولأن نوع بياناته `CHAR` لا `VARCHAR`، فهو يحتاج دائماً إلى الـ1000 بايت التي يتسع لها. ولولا هذا العمود لصار الجدول صغيراً بصورة غير واقعية ولما نجحت عروض كثيرة.
- تُملأ بيانات عشوائية في الجدول، باستثناء مدخلي أنا، الذي يُحدَّث بعد الإدراج.
- تُجمع [إحصاءات](/book/use-the-index-luke/sql-where-clause-the-equals-operator-slow-indexes-part-ii/index#sb-statistics) الجدول ليعرف [المُحسِّن](/book/use-the-index-luke/sql-where-clause-the-equals-operator-slow-indexes-part-ii/index#sb-optimizer) شيئاً عن محتوى الجدول.

### المفاتيح المُدمجة

يغيّر هذا السكربت جدول `EMPLOYEES` ليعكس الحالة بعد الاندماج مع شركة Very Big Company:

```sql
-- add subsidiary_id and update existing records
ALTER TABLE employees ADD subsidiary_id NUMERIC;
UPDATE      employees SET subsidiary_id = 30;
ALTER TABLE employees ALTER COLUMN subsidiary_id SET NOT NULL;

-- change the PK
ALTER TABLE employees DROP CONSTRAINT employees_pk;
ALTER TABLE employees ADD CONSTRAINT employees_pk
      PRIMARY KEY (employee_id, subsidiary_id);

-- generate more records (Very Big Company)
INSERT INTO employees (employee_id,  first_name,
                       last_name,    date_of_birth, 
                       phone_number, subsidiary_id, junk)
SELECT GENERATE_SERIES
     , initcap(lower(random_string(2, 8)))
     , initcap(lower(random_string(2, 8)))
     , CURRENT_DATE - CAST(floor(random() * 365 * 10 + 40 * 365) AS NUMERIC) * INTERVAL '1 DAY'
     , CAST(floor(random() * 9000 + 1000) AS NUMERIC)
     , CAST(floor(random() * (generate_series)/9000*29) AS NUMERIC)
     , 'junk'
  FROM GENERATE_SERIES(1, 9000);

VACUUM ANALYZE employees;
```

ملاحظات:

- المفتاح الأساسي الجديد موسَّع فقط بـ`SUBSIDIARY_ID`؛ أي إن `EMPLOYEE_ID` يبقى في الموضع الأول.
- تُوزَّع السجلات الجديدة عشوائياً على الفروع من 1 إلى 29.
- يُحلَّل الجدول والفهرس مرة أخرى ليعي المُحسِّن حجم البيانات المتنامي.

ويقدّم السكربت التالي الفهرس على `SUBSIDIARY_ID` لدعم الاستعلام عن جميع موظفي فرع معيّن:

```sql
CREATE INDEX emp_sub_id ON employees (subsidiary_id);
```

ومع أن ذلك يعطي أداءً جيداً، فالأفضل استخدام الفهرس الذي يدعم المفتاح الأساسي:

```sql
-- use tmp index to support the PK
CREATE UNIQUE INDEX employee_pk_tmp 
    ON employees (subsidiary_id, employee_id);

 ALTER TABLE employees 
   ADD CONSTRAINT employees_pk_tmp
UNIQUE (subsidiary_id, employee_id);

ALTER TABLE employees
 DROP CONSTRAINT employees_pk;

ALTER TABLE employees
  ADD CONSTRAINT employees_pk
      PRIMARY KEY (subsidiary_id, employee_id);

ALTER TABLE employees
 DROP CONSTRAINT employees_pk_tmp;

-- drop old indexes
DROP INDEX employee_pk_tmp;
DROP INDEX emp_sub_id;
```

ملاحظات:

- يُنشأ فهرس جديد ويُستخدم لدعم المفتاح الأساسي (PK).
- وما إن يتوقف استخدام فهرس المفتاح الأساسي القديم بواسطة القيد، حتى يمكن إسقاطه وإعادة إنشائه بترتيب أعمدته الجديد.
- ويُغيَّر القيد مرة أخرى لاستخدام فهرس المفتاح الأساسي الجديد، ويمكن إسقاط الفهرس المؤقت — وكذلك الفهرس على معرّف الفرع الذي لم يعد لازماً.

## الدوال

### البحث غير الحسّاس لحالة الأحرف

أُنشئت الأسماء العشوائية أصلاً بحالة الأحرف الصحيحة؛ حدّث سجل «ي» أنا فقط:

```sql
UPDATE employees 
   SET first_name = 'Markus'
     , last_name  = 'Winand'
 WHERE employee_id   = 123
   AND subsidiary_id = 30;
```

العبارة اللازمة لإنشاء الفهرس القائم على الدوال:

```sql
CREATE INDEX emp_up_name
    ON employees (UPPER(last_name) varchar_pattern_ops);;
DROP INDEX emp_name;;
```

```
VACUUM ANALYZE employees;;
```

### الدوال المعرّفة من المستخدم

عرّف دالة PL/SQL تحسب العمر وحدّد محاولة استخدامها في فهرس:

```sql
CREATE FUNCTION get_age(date_of_birth DATE) 
RETURNS NUMERIC
AS
$$
BEGIN
    RETURN DATE_PART('year', AGE(date_of_birth));
END;
$$ LANGUAGE plpgsql;

CREATE INDEX invalid ON EMPLOYEES (get_age(date_of_birth));
```

ينبغي أن تحصل على الخطأ «functions in index expression must be marked IMMUTABLE».

## الفهارس الجزئية

```sql
CREATE TABLE messages AS (
SELECT GENERATE_SERIES::numeric id
     , CASE WHEN random() < 0.01 THEN 'N' ELSE 'Y' END processed
     , CAST(trunc(random() * 100) AS NUMERIC) receiver
     , 'junk' message
  FROM GENERATE_SERIES(0, 999999)
);

CREATE INDEX messages_todo
          ON messages (receiver, processed);
```

```
PREPARE stmt(int) AS
 SELECT message
   FROM messages
  WHERE processed = 'N'
    AND receiver  = $1;

EXPLAIN EXECUTE stmt(1);
```

```sql
CREATE INDEX messages_only_todo
          ON messages (receiver)
       WHERE processed = 'N';

PREPARE stmt(int) AS
 SELECT message
   FROM messages
  WHERE processed = 'N'
    AND receiver  = $1;

EXPLAIN EXECUTE stmt(1);
```
