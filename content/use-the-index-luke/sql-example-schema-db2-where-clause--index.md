---
title: "سكربتات أمثلة Db2 (LUW) لـ«جملة WHERE»"
lang: ar
source: https://use-the-index-luke.com/sql/example-schema/db2/where-clause
---

## معامل المساواة

### المفاتيح البديلة

ينشئ السكربت التالي جدول `EMPLOYEES` بألف مدخل.

والسكربت مخصص للتشغيل من سطر أوامر `db2`. ويستخدم الفاصلة المنقوطة (;) فاصلاً عادياً للعبارات، لكنه يستخدم فاصلتين منقوطتين (;;) لإنهاء شيفرة PL/SQL.

```sql
CREATE TABLE employees (
   employee_id   NUMERIC       NOT NULL,
   first_name    VARCHAR(1000) NOT NULL,
   last_name     VARCHAR(1000) NOT NULL,
   date_of_birth DATE                  ,
   phone_number  VARCHAR(1000) NOT NULL,
   junk          CHAR(254)             ,
   CONSTRAINT employees_pk PRIMARY KEY (employee_id)
);
```

```sql
--#SET TERMINATOR ;;
CREATE FUNCTION random_string(minlen NUMERIC, maxlen NUMERIC)
RETURNS VARCHAR(1000)
LANGUAGE SQL
NOT DETERMINISTIC
NO EXTERNAL ACTION
READS SQL DATA
BEGIN
  DECLARE rv  VARCHAR(1000) DEFAULT '';
  DECLARE i   NUMERIC       DEFAULT 0;
  DECLARE len NUMERIC       DEFAULT 0;

  IF maxlen < 1 OR minlen < 1 OR maxlen < minlen THEN
    RETURN NULL;
  END IF;

  SET i = floor(rand()*(maxlen-minlen)) + minlen;
  WHILE (i > 0)  DO
    SET rv = rv || chr(97+CAST(rand() * 25 AS INTEGER));
    SET i  =  i - 1;
  END WHILE;
  RETURN rv;
END
;;
--#SET TERMINATOR ;
```

```sql
INSERT INTO employees (employee_id,  first_name,
                       last_name,    date_of_birth, 
                       phone_number, junk)
WITH generator (n) AS
( SELECT 1 n   FROM sysibm.sysdummy1
   UNION ALL
  SELECT n + 1 FROM generator
   WHERE n < 1000
)
SELECT generator.n
     , initcap(lower(random_string(2, 8)))
     , initcap(lower(random_string(2, 8)))
     , CURRENT_DATE - floor(rand() * 365 * 10 + 40 * 365) days
     , floor(rand() * 9000 + 1000)
     , 'junk'
  FROM generator;
```

```sql
UPDATE employees 
   SET first_name='MARKUS', 
       last_name='WINAND'
 WHERE employee_id=123;
```

```
RUNSTATS ON TABLE employees;
```

ملاحظات:

يُستخدم العمود `JUNK` للحصول على طول صف واقعي. ولأن نوع بياناته `CHAR` لا `VARCHAR`، فهو يحتاج دائماً إلى الـ254 بايت التي يتسع لها (و254 هو الحد في Db2 (LUW) Express-C 10.5). ولولا هذا العمود لصار الجدول صغيراً بصورة غير واقعية ولما نجحت عروض كثيرة.

تُملأ بيانات عشوائية في الجدول، باستثناء مدخلي أنا، الذي يُحدَّث بعد الإدراج.

وتُجمع [إحصاءات](/book/use-the-index-luke/sql-where-clause-the-equals-operator-slow-indexes-part-ii/index#sb-statistics) الجدول ليعرف [المُحسِّن](/book/use-the-index-luke/sql-where-clause-the-equals-operator-slow-indexes-part-ii/index#sb-optimizer) شيئاً عن محتوى الجدول.

[قبل الإصدار 10](https://www.ibm.com/docs/en/db2/11.5.x?topic=commands-runstats) تحتاج Db2 إلى اسم جدول مؤهَّل بالكامل (بما في ذلك المخطط) من أجل `RUNSTATS`. وإذا ظهرت لك رسالة خطأ، فجرّب إضافة اسم المخطط. ويمكنك الاستعلام عن CURRENT_SCHEMA هكذا:

```sql
SELECT current_schema FROM sysibm.sysdummy1;
```

### المفاتيح المُدمجة

يغيّر هذا السكربت جدول `EMPLOYEES` ليعكس الحالة بعد الاندماج مع شركة Very Big Company:

```sql
--#SET TERMINATOR ;

-- add subsidiary_id and update existing records
ALTER TABLE employees ADD subsidiary_id NUMERIC;
UPDATE      employees SET subsidiary_id = 30;
ALTER TABLE employees ALTER COLUMN subsidiary_id SET NOT NULL;

-- change the PK
ALTER TABLE employees DROP PRIMARY KEY;
-- to prevent failur for reason "7"
REORG TABLE employees;
ALTER TABLE employees ADD CONSTRAINT employees_pk 
      PRIMARY KEY (employee_id, subsidiary_id);

-- generate more records (Very Big Company)
INSERT INTO employees (employee_id,  first_name,
                       last_name,    date_of_birth, 
                       phone_number, subsidiary_id, junk)
WITH generator (n) AS
( SELECT 1001 n   FROM sysibm.sysdummy1
   UNION ALL
  SELECT n + 1 FROM generator
   WHERE n < 10000
)
SELECT generator.n
     , initcap(lower(random_string(2, 8)))
     , initcap(lower(random_string(2, 8)))
     , CURRENT_DATE - floor(rand() * 365 * 10 + 40 * 365) days
     , floor(rand() * 9000 + 1000)
     , floor(rand() * least(mod(generator.n, 2)+0.2,1) * (generator.n-1000)/9000*29) 
     , 'junk'
  FROM generator;

RUNSTATS ON TABLE employees;
```

ملاحظات:

- المفتاح الأساسي الجديد موسَّع فقط بـ`SUBSIDIARY_ID`؛ أي إن `EMPLOYEE_ID` يبقى في الموضع الأول.
- تُوزَّع السجلات الجديدة عشوائياً على الفروع من 1 إلى 29.
- يُحلَّل الجدول والفهرس مرة أخرى ليعي المُحسِّن حجم البيانات المتنامي.

ويقدّم السكربت التالي الفهرس على `SUBSIDIARY_ID` لدعم الاستعلام عن جميع موظفي فرع معيّن:

```sql
--#SET TERMINATOR ;
CREATE INDEX emp_sub_id ON employees (subsidiary_id);
```

ومع أن ذلك يعطي أداءً جيداً، فالأفضل استخدام الفهرس الذي يدعم المفتاح الأساسي:

```sql
--#SET TERMINATOR ;

-- index to support the new PK
CREATE UNIQUE INDEX employees_pk_new
    ON employees (subsidiary_id, employee_id);

ALTER TABLE employees
 DROP PRIMARY KEY;

-- this will automatically use the new index:
-- SQL0598W  Existing index "EMPLOYEE_PK_NEW" is used as the index for 
-- the primary key or a unique key.  SQLSTATE=01550
ALTER TABLE employees
  ADD CONSTRAINT employees_pk
      PRIMARY KEY (subsidiary_id, employee_id);
-- cleanup
RENAME INDEX employees_pk_new TO employees_pk;
DROP INDEX emp_sub_id;
```

ملاحظات:

- يُنشأ فهرس جديد ويُستخدم لدعم المفتاح الأساسي (PK).
- يؤدي إسقاط المفتاح الأساسي تلقائياً إلى إسقاط الفهرس المنشأ تلقائياً لدعمه.
- وتستخدم إضافة المفتاح الأساسي الجديد الفهرس الجديد تلقائياً.

## الدوال (Db2 10.5+)

### البحث غير الحسّاس لحالة الأحرف

أُنشئت الأسماء العشوائية أصلاً بحالة الأحرف الصحيحة؛ حدّث سجل «ي» أنا فقط:

```sql
--#SET TERMINATOR ;

UPDATE employees 
   SET first_name = 'Markus'
     , last_name  = 'Winand'
 WHERE employee_id   = 123
   AND subsidiary_id = 30;
```

العبارة اللازمة لإنشاء الفهرس القائم على الدوال:

```sql
--#SET TERMINATOR ;
CREATE INDEX emp_up_name
    ON employees (UPPER(last_name));
DROP INDEX emp_name;
```

```
RUNSTATS ON TABLE employees;
```

### الدوال المعرّفة من المستخدم

عرّف دالة تحسب العمر وحدّد محاولة استخدامها في فهرس:

```sql
--#SET TERMINATOR ;;
CREATE FUNCTION get_age(date_of_birth DATE) 
RETURNS NUMERIC
LANGUAGE SQL
BEGIN
    RETURN YEAR(CURRENT_DATE - date_of_birth);
END
;;
--#SET TERMINATOR ;

CREATE INDEX invalid ON EMPLOYEES (get_age(date_of_birth));
```

ينبغي أن تحصل على الخطأ «*SQL0356N: The index was not created because a key expression was invalid. Key expression: "1". Reason code: "5”*». بينما [رمز السبب 5 يعني](https://www.ibm.com/docs/en/db2/11.5.x?topic=messages-sql0000-0999#sqlmsg__SQL0356N): «*اشتمل تعبير المفتاح على دالة معرّفة من المستخدم.*»

## محاكاة الفهارس الجزئية

### الإعداد

```sql
--#SET TERMINATOR ;

CREATE TABLE messages (
       id         NUMERIC(10,0) NOT NULL,
       processed  CHAR(1)       NOT NULL,
       receiver   NUMERIC(10,0) NOT NULL,
       message    CHAR(200)     NOT NULL,

       CONSTRAINT messages_pk PRIMARY KEY (id)
);

INSERT INTO messages (id, processed, receiver, message)
WITH generator(n) AS
( SELECT 1 n   FROM sysibm.sysdummy1
   UNION ALL
  SELECT n + 1 FROM generator
   WHERE n < 999999
)
SELECT n id
     , CASE WHEN rand() < 0.09 THEN 'N' ELSE 'Y' END processed
     , floor(rand() * 100) receiver
     , 'junk' message
  FROM generator;

RUNSTATS ON TABLE messages;

DROP INDEX messages_not_processed_pi;
CREATE INDEX messages_not_processed_pi
    ON messages (CASE WHEN processed = 'N' THEN receiver+0
                                           ELSE NULL
                 END)
EXCLUDE NULL KEYS;

SELECT *
  FROM messages
 WHERE (CASE WHEN processed = 'N' THEN receiver+0
                                  ELSE NULL
         END) = ?;
```

### محاولة عادية

```sql
CREATE INDEX messages_not_processed_pi
    ON messages (CASE WHEN processed = 'N' THEN receiver
                                           ELSE NULL
                 END)
EXCLUDE NULL KEYS;

SELECT *
  FROM messages
 WHERE (CASE WHEN processed = 'N' THEN receiver
                                  ELSE NULL
         END) = ?;
```

```
Explain Plan
-------------------------------------------------------
ID | Operation        |                    Rows |  Cost
 1 | RETURN           |                         | 49686
 2 |  TBSCAN MESSAGES | 900 of 999999 (   .09%) | 49686

Predicate Information
 2 - SARG (Q1.PROCESSED = 'N')
     SARG (Q1.RECEIVER = ?)
```

ويحدث الأمر نفسه عند استخدام تعبير مثل `CASE processed WHEN 'N'…`.

### محاولة مشوَّشة

```sql
DROP INDEX messages_not_processed_pi;
CREATE INDEX messages_not_processed_pi
    ON messages (CASE WHEN processed = 'N' THEN receiver+0
                                           ELSE NULL
                 END)
EXCLUDE NULL KEYS;

SELECT *
  FROM messages
 WHERE (CASE WHEN processed = 'N' THEN receiver+0
                                  ELSE NULL
         END) = ?;
```

```
ID | Operation                            |                      Rows |  Cost
 1 | RETURN                               |                           | 13071
 2 |  FETCH MESSAGES                      |  40000 of 40000 (100.00%) | 13071
 3 |   RIDSCN                             |  40000 of 40000 (100.00%) |  1665
 4 |    SORT (UNQIUE)                     |  40000 of 40000 (100.00%) |  1665
 5 |     IXSCAN MESSAGES_NOT_PROCESSED_PI | 40000 of 999999 (  4.00%) |  1646

Predicate Information
 2 - SARG ( CASE WHEN (Q1.PROCESSED = 'N') THEN (Q1.RECEIVER + 0) ELSE NULL END = ?)
 5 - START ( CASE WHEN (Q1.PROCESSED = 'N') THEN (Q1.RECEIVER + 0) ELSE NULL END = ?)
      STOP ( CASE WHEN (Q1.PROCESSED = 'N') THEN (Q1.RECEIVER + 0) ELSE NULL END = ?)
```
