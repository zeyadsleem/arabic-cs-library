---
title: "سكربتات أمثلة Oracle لـ«جملة WHERE»"
lang: ar
source: https://use-the-index-luke.com/sql/example-schema/oracle/where-clause
---

## معامل المساواة

### المفاتيح البديلة

ينشئ السكربت التالي جدول `EMPLOYEES` بألف مدخل.

```sql
CREATE TABLE employees (
   employee_id   NUMBER         NOT NULL,
   first_name    VARCHAR2(1000) NOT NULL,
   last_name     VARCHAR2(1000) NOT NULL,
   date_of_birth DATE           NOT NULL,
   phone_number  VARCHAR2(1000) NOT NULL,
   junk          CHAR(1000)     DEFAULT 'JUNK',
   CONSTRAINT employees_pk PRIMARY KEY (employee_id)
);
```

```sql
INSERT INTO employees (employee_id,  first_name,
                       last_name,    date_of_birth, 
                       phone_number)
SELECT level, 
       DBMS_RANDOM.STRING('u', 1) || 
            DBMS_RANDOM.STRING('l', DBMS_RANDOM.value(2,10)),
       DBMS_RANDOM.STRING('u', 1) || 
            DBMS_RANDOM.STRING('l', DBMS_RANDOM.value(2,10)),
       SYSDATE - (DBMS_RANDOM.normal() * 365 * 10) - 40 * 365,
       TRUNC(DBMS_RANDOM.VALUE(1000,10000))
  FROM DUAL 
  CONNECT BY level <= 1000;
```

```sql
UPDATE employees 
   SET first_name='MARKUS', 
       last_name='WINAND'
 WHERE employee_id=123;
```

```javascript
BEGIN
     DBMS_STATS.GATHER_TABLE_STATS(null, 'EMPLOYEES', 
     METHOD_OPT=>'for all indexed columns', CASCADE => true);
END;
```

ملاحظات:

- يُستخدم العمود `JUNK` للحصول على طول صف واقعي. ولأن نوع بياناته `CHAR` لا `VARCHAR2`، فهو يحتاج دائماً إلى الـ1000 بايت التي يتسع لها. ولولا هذا العمود لصار الجدول صغيراً بصورة غير واقعية ولما نجحت عروض كثيرة.
- تُملأ بيانات عشوائية في الجدول، باستثناء مدخلي أنا، الذي يُحدَّث بعد الإدراج.
- تُجمع [إحصاءات](/book/use-the-index-luke/sql-where-clause-the-equals-operator-slow-indexes-part-ii/index#sb-statistics) الجدول والفهرس ليعرف [المُحسِّن](/book/use-the-index-luke/sql-where-clause-the-equals-operator-slow-indexes-part-ii/index#sb-optimizer) شيئاً عن محتوى الجدول.

### المفاتيح المُدمجة

يغيّر هذا السكربت جدول `EMPLOYEES` ليعكس الحالة بعد الاندماج مع شركة Very Big Company:

```sql
-- add subsidiary_id and update existing records
ALTER TABLE employees ADD subsidiary_id NUMBER;
```

```sql
UPDATE      employees SET subsidiary_id = 30;
```

```sql
ALTER TABLE employees MODIFY subsidiary_id NOT NULL;
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
                       phone_number, subsidiary_id)
SELECT level, 
       DBMS_RANDOM.STRING('u', 1) || 
            DBMS_RANDOM.STRING('l', DBMS_RANDOM.value(2,10)),
       DBMS_RANDOM.STRING('u', 1) || 
            DBMS_RANDOM.STRING('l', DBMS_RANDOM.value(2,10)),
       SYSDATE - (DBMS_RANDOM.normal() * 365 * 10) - 40 * 365,
       TRUNC(DBMS_RANDOM.VALUE(1000,10000)), 
       TRUNC(DBMS_RANDOM.VALUE(1,level/9000*29))
FROM DUAL CONNECT BY level <= 9000;
```

```javascript
BEGIN
     DBMS_STATS.GATHER_TABLE_STATS(null, 'EMPLOYEES', 
     METHOD_OPT=>'for all indexed columns', CASCADE => true);
END;
```

ملاحظات:

- المفتاح الأساسي الجديد موسَّع فقط بـ`SUBSIDIARY_ID`؛ أي إن `EMPLOYEE_ID` يبقى في الموضع الأول.
- تُوزَّع السجلات الجديدة عشوائياً على الفروع من 1 إلى 29.
- يُحلَّل الجدول والفهرس مرة أخرى ليعي المُحسِّن حجم البيانات المتنامي.

ويقدّم السكربت التالي الفهرس على `SUBSIDIARY_ID` لدعم الاستعلام عن جميع موظفي فرع معيّن:

```sql
CREATE INDEX emp_sub_id ON employees (subsidiary_id);
```

```javascript
BEGIN
     DBMS_STATS.GATHER_TABLE_STATS(null, 'EMPLOYEES', 
     METHOD_OPT=>'for all indexed columns', CASCADE => true);
END;
```

ملاحظات:

- يُحلَّل الجدول وجميع الفهارس مرة أخرى. وفي هذه الحالة تحديداً كان يكفي تحليل الفهرس الجديد فقط.

ومع أن ذلك يعطي أداءً جيداً، فالأفضل استخدام الفهرس الذي يدعم المفتاح الأساسي:

Oracle 11g

```sql
-- use tmp index to support the PK
CREATE INDEX employee_pk_tmp 
    ON employees (subsidiary_id, employee_id, 1);
```

```sql
ALTER TABLE employees 
      MODIFY CONSTRAINT employees_pk 
      USING INDEX employee_pk_tmp;
```

```
-- recreate the pk index as needed (automatically done)
--DROP   INDEX employee_pk;
```

```sql
CREATE UNIQUE INDEX employee_pk 
    ON employees (subsidiary_id, employee_id);
```

```sql
-- change the constraint to use the new index
ALTER TABLE employees 
      MODIFY CONSTRAINT employees_pk 
      USING INDEX employee_pk;
```

```
-- drop old indexes
DROP INDEX employee_pk_tmp;
```

```
DROP INDEX emp_sub_id;
```

```javascript
BEGIN
     DBMS_STATS.GATHER_TABLE_STATS(null, 'EMPLOYEES', 
     METHOD_OPT=>'for all indexed columns', CASCADE => true);
END;
```

Oracle 12c

```sql
CREATE UNIQUE INDEX employee_pk_new 
    ON employees (subsidiary_id, employee_id);
```

```sql
ALTER TABLE employees 
      MODIFY CONSTRAINT employees_pk 
      USING INDEX employee_pk_new;
```

```
-- drop old indexes
DROP INDEX emp_sub_id;
```

```sql
-- note: employee_pk is automatically dropped

-- rename new PK index
ALTER INDEX employee_pk_new RENAME TO employee_pk;
```

```javascript
BEGIN
     DBMS_STATS.GATHER_TABLE_STATS(null, 'EMPLOYEES', 
     METHOD_OPT=>'for all indexed columns', CASCADE => true);
END;
```

ملاحظات:

- في الإصدارات السابقة لـ12c، ننشئ فهرساً جديداً بعمود صوري ونستخدمه لدعم المفتاح الأساسي مؤقتاً. وهذا مطلوب لأن قاعدة بيانات Oracle حتى 11g لا تسمح بفهرسين يشملان الأعمدة نفسها.
- وما إن يتوقف استخدام فهرس المفتاح الأساسي القديم بواسطة القيد، حتى يمكن إسقاطه وإعادة إنشائه بترتيب أعمدته الجديد.
- ويُغيَّر القيد مرة أخرى لاستخدام فهرس المفتاح الأساسي الجديد، ويمكن إسقاط الفهرس المؤقت — وكذلك الفهرس على معرّف الفرع الذي لم يعد لازماً.

### الفهارس البطيئة، الجزء الثاني

تحذف العبارة التالية بعض الإحصاءات ليعمل مثالي.

```
BEGIN
      DBMS_STATS.DELETE_COLUMN_STATS
       (null, 'EMPLOYEES', 'SUBSIDIARY_ID');
END
```

ولإعادة إنشائها، استخدم الإجراء نفسه كما في السابق:

```javascript
BEGIN
     DBMS_STATS.GATHER_TABLE_STATS(null, 'EMPLOYEES', 
     METHOD_OPT=>'for all indexed columns', CASCADE => true);
END
```

والعبارة الأخيرة لإنشاء الفهرس على العمود `LAST_NAME` وتحليله:

```sql
CREATE INDEX emp_name ON employees (last_name)
```

```javascript
BEGIN
     DBMS_STATS.GATHER_TABLE_STATS(null, 'EMPLOYEES', 
     METHOD_OPT=>'for all indexed columns', CASCADE => true);
END
```

## الدوال

### البحث غير الحسّاس لحالة الأحرف

أُنشئت الأسماء العشوائية أصلاً بحالة الأحرف الصحيحة؛ حدّث سجل «ي» أنا فقط:

```sql
UPDATE employees 
   SET first_name = 'Markus'
     , last_name  = 'Winand'
 WHERE employee_id   = 123
   AND subsidiary_id = 30;;
```

العبارة اللازمة لإنشاء الفهرس القائم على الدوال:

```sql
CREATE INDEX emp_up_name ON employees (UPPER(last_name));;
DROP INDEX emp_name;;
```

ملاحظات:

- أخرق أفضل ممارساتي عمداً بعدم إعادة تحليل الجدول وجميع الفهارس؛ إذ يُحلَّل الفهرس الجديد فقط (تلقائياً منذ 10g).

وستجمع العبارة التالية تلقائياً، بدءاً من الإصدار 11g، الإحصاءات الموسّعة للفهرس القائم على الدوال.

```javascript
BEGIN
     DBMS_STATS.GATHER_TABLE_STATS(null, 'EMPLOYEES', 
     METHOD_OPT=>'for all indexed columns', CASCADE => true);
END;
/
```

### الدوال المعرّفة من المستخدم

عرّف دالة PL/SQL تحسب العمر وحدّد محاولة استخدامها في فهرس:

```sql
CREATE FUNCTION get_age(date_of_birth DATE) 
RETURN NUMBER
AS
BEGIN
    RETURN TRUNC(MONTHS_BETWEEN(SYSDATE, DATE_OF_BIRTH)/12);
END;
/

CREATE INDEX invalid ON EMPLOYEES (get_age(date_of_birth));
```

ينبغي أن تحصل على الخطأ «ORA-30553: The function is not deterministic».

## البحث عن النطاقات

إنشاء الفهرس `EMP_TEST`:

```sql
CREATE INDEX emp_test
     ON employees (date_of_birth, subsidiary_id);;
```

وبترتيب الأعمدة المعاكس:

```sql
CREATE INDEX emp_test
     ON employees (subsidiary_id, date_of_birth);;
```

## فهرسة NULL

يعيد ما يلي إنشاء الفهارس القياسية بعد تشغيل أمثلة الكتاب:

```sql
-- for demo purpose we drop the NOT NULL constraint
ALTER TABLE employees MODIFY date_of_birth NULL;;
CREATE INDEX emp_dob ON employees (date_of_birth);;
```

```
DROP INDEX emp_dob_upname;;
```

```sql
CREATE INDEX emp_dob ON employees (date_of_birth, '1');;
```

## محاكاة الفهارس الجزئية

```sql
CREATE TABLE messages AS
SELECT level id
     , CASE WHEN DBMS_RANDOM.NORMAL() < 0.09 THEN 'N' ELSE 'Y' END processed
     , trunc(DBMS_RANDOM.VALUE(0,100)) receiver
     , RPAD('junk', 200) message
  FROM dual 
CONNECT BY level < 999999;;
```

يجب تحديث الإحصاءات بعد إنشاء الفهرس القائم على الدوال. فلا إحصاءات، فلا مُحسِّن قائم على التكلفة، فلا فهرس قائم على الدوال.

```javascript
begin
   DBMS_STATS.GATHER_TABLE_STATS( user
                                ,'MESSAGES'
                                , cascade=>true);
end;
/
```
