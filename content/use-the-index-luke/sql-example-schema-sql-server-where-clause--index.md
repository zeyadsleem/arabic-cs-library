---
title: "سكربتات SQL Server لـ«جملة WHERE»"
lang: ar
source: https://use-the-index-luke.com/sql/example-schema/sql-server/where-clause
---

## معامل المساواة

### المفاتيح البديلة

ينشئ السكربت التالي جدول `EMPLOYEES` بألف مدخل.

ولتوليد بيانات عشوائية، يُستخدم زوج عرض/دالة لتجاوز ميزة SQL Server القائلة «جميع الدوال المعرّفة من المستخدم حتمية».

```sql
CREATE TABLE employees (
    employee_id   NUMERIC       NOT NULL,
    first_name    VARCHAR(1000) NOT NULL,
    last_name     VARCHAR(900)  NOT NULL,
    date_of_birth DATE                   ,
    phone_number  VARCHAR(1000) NOT NULL,
    junk          CHAR(1000)             ,
    CONSTRAINT employees_pk
       PRIMARY KEY NONCLUSTERED (employee_id)
);
GO
```

```sql
IF OBJECT_ID('rand_helper') IS NOT NULL
   DROP VIEW rand_helper;
GO

CREATE VIEW rand_helper AS SELECT RND=RAND();
GO
```

```sql
IF OBJECT_ID('random_string') IS NOT NULL
   DROP FUNCTION random_string;
GO

CREATE FUNCTION random_string (@maxlen int)
   RETURNS VARCHAR(255)
AS BEGIN
   DECLARE @rv VARCHAR(255)
   DECLARE @loop int
   DECLARE @len int

   SET @len = (SELECT CAST(rnd * (@maxlen-3) AS INT) + 3
                 FROM rand_helper)
   SET @rv = ''
   SET @loop = 0

   WHILE @loop < @len BEGIN
      SET @rv = @rv 
              + CHAR(CAST((SELECT rnd * 26
                             FROM rand_helper) AS INT )+97)
      IF @loop = 0 BEGIN
          SET @rv = UPPER(@rv)
      END
      SET @loop = @loop +1;
   END

   RETURN @rv
END
GO
```

```sql
IF OBJECT_ID('random_date') IS NOT NULL
   DROP FUNCTION random_date;
GO

CREATE FUNCTION random_date (@mindays int, @maxdays int) 
   RETURNS VARCHAR(255)
AS BEGIN
   DECLARE @rv date
   SET @rv = (SELECT GetDate() 
                   - rnd * (@maxdays-@mindays)
                   - @mindays
                FROM rand_helper)
   RETURN @rv
END
GO
```

```sql
IF OBJECT_ID('random_int') IS NOT NULL
   DROP FUNCTION random_int;
GO

CREATE FUNCTION random_int (@min int, @max int)
   RETURNS INT
AS BEGIN
   DECLARE @rv INT
   SET @rv = (SELECT rnd * (@max) + @min
                FROM rand_helper)
   RETURN @rv
END
GO
```

```sql
WITH generator (n) AS
( SELECT 1
   UNION ALL
  SELECT n + 1 FROM generator
WHERE n < 1000
)
INSERT INTO employees (employee_id
                     , first_name, last_name
                     , date_of_birth, phone_number, junk)
select n employee_id
     , [dbo].random_string(11) first_name
     , [dbo].random_string(11) last_name  
     , [dbo].random_date(20*365, 60*365) dob
     , 'N/A' phone
     , 'junk' junk
  from generator
OPTION (MAXRECURSION 1000)
GO
```

```sql
UPDATE employees 
   SET first_name='Markus', 
       last_name='Winand'
 WHERE employee_id=123;

exec sp_updatestats;
GO
```

ملاحظات:

- يُستخدم العمود `JUNK` للحصول على طول صف واقعي. ولأن نوع بياناته `CHAR` لا `VARCHAR2`، فهو يحتاج دائماً إلى الـ1000 بايت التي يتسع لها. ولولا هذا العمود لصار الجدول صغيراً بصورة غير واقعية ولما نجحت عروض كثيرة.
- تُملأ بيانات عشوائية في الجدول، باستثناء مدخلي أنا، الذي يُحدَّث بعد الإدراج.
- تُجمع [إحصاءات](/book/use-the-index-luke/sql-where-clause-the-equals-operator-slow-indexes-part-ii/index#sb-statistics) الجدول والفهرس ليعرف [المُحسِّن](/book/use-the-index-luke/sql-where-clause-the-equals-operator-slow-indexes-part-ii/index#sb-optimizer) شيئاً عن محتوى الجدول.
- لـSQL Server 2008R2 [قيد مفتاح فهرس بحجم 900 بايت](https://learn.microsoft.com/en-us/previous-versions/sql/sql-server-2008-r2/ms191241(v=sql.105))؛ ولهذا خُفِّض `LAST_NAME` إلى 900.

### المفاتيح المُدمجة

يغيّر هذا السكربت جدول `EMPLOYEES` ليعكس الحالة بعد الاندماج مع شركة Very Big Company:

```sql
ALTER TABLE employees ADD subsidiary_id NUMERIC;
GO
UPDATE      employees SET subsidiary_id = 30;
GO
ALTER TABLE employees ALTER COLUMN subsidiary_id 
                                   NUMERIC NOT NULL;
GO

ALTER TABLE employees DROP CONSTRAINT employees_pk;
GO
ALTER TABLE employees ADD  CONSTRAINT employees_pk 
      PRIMARY KEY NONCLUSTERED (employee_id, subsidiary_id);
GO

WITH generator (n) as
( select 1
union all
select n + 1 from generator
where N < 9000
)
INSERT INTO employees (employee_id
                     , first_name, last_name
                     , date_of_birth, phone_number
                     , junk, subsidiary_id)
SELECT n employee_id
     , [dbo].random_string(11) first_name
     , [dbo].random_string(11) last_name  
     , [dbo].random_date(20*365, 60*365) dob
     , 'N/A' phone
     , 'junk' junk
     , [dbo].random_int(1, (n*29)/9000) subsidiary_id
  FROM generator
OPTION (MAXRECURSION 9000)
GO

CREATE UNIQUE NONCLUSTERED INDEX 
       employees_pk_tmp 
       on employees (employee_id, subsidiary_id);
GO
ALTER TABLE employees DROP CONSTRAINT employees_pk;
GO
ALTER TABLE employees ADD CONSTRAINT employees_pk
      PRIMARY KEY NONCLUSTERED (employee_id, subsidiary_id);
GO
DROP INDEX employees_pk_tmp ON employees;
GO

exec sp_updatestats;
GO
```

ملاحظات:

- المفتاح الأساسي الجديد موسَّع فقط بـ`SUBSIDIARY_ID`؛ أي إن `EMPLOYEE_ID` يبقى في الموضع الأول.
- تُوزَّع السجلات الجديدة عشوائياً على الفروع من 1 إلى 29.
- يُحلَّل الجدول والفهرس مرة أخرى ليعي المُحسِّن حجم البيانات المتنامي.

ويقدّم السكربت التالي الفهرس على `SUBSIDIARY_ID` لدعم الاستعلام عن جميع موظفي فرع معيّن:

```sql
CREATE NONCLUSTERED INDEX 
       emp_sub_id ON employees (subsidiary_id);

exec sp_updatestats;
```

ملاحظات:

- يُحلَّل الجدول وجميع الفهارس مرة أخرى.

ومع أن ذلك يعطي أداءً جيداً، فالأفضل استخدام الفهرس الذي يدعم المفتاح الأساسي:

```sql
ALTER TABLE employees DROP CONSTRAINT employees_pk;
GO
ALTER TABLE employees ADD  CONSTRAINT employees_pk 
      PRIMARY KEY NONCLUSTERED (subsidiary_id, employee_id);
GO

DROP INDEX emp_sub_id ON employees;

exec sp_updatestats;
```

ملاحظات:

- يترك الإجراء الجدول بلا مفتاح أساسي مدة. ويعني ذلك أن الإجراء غير مناسب للتشغيل المتصل. غير أن لا شيء يصل إلى مخطط الاختبار لدينا، فلا خطر.
- الفهرس على `SUBSIDIARY_ID` أصبح مكرّراً كلياً ويمكن إسقاطه.

## الدوال

يستخدم SQL Server ترتيباً محرّفياً غير حسّاس لحالة الأحرف افتراضياً. وفي تلك الحالة لا تحتاج إلى فهرس قائم على الدوال؛ فالفهرس العادي يكفي:

```sql
CREATE INDEX emp_name ON employees (last_name);
```

## الفهارس المُرشَّحة (الجزئية)

```sql
CREATE TABLE messages (
     id numeric not null,
     processed char(1) not null,
     receiver numeric not null,
     message varchar(255),
     primary key (id)
);

WITH generator (n) AS
( SELECT 1
   UNION ALL
  SELECT n + 1 FROM generator
WHERE n < 1000
)
INSERT INTO messages (id, processed, receiver, message)
select n id
     , case WHEN n % 5 =0 then 'N' else 'Y' end 
     , n/10 receiver
     , 'junk' message
  from generator
OPTION (MAXRECURSION 1000)

-- regular index
--CREATE INDEX messages_todo
--          ON messages (receiver, processed) INCLUDE (message);

-- filtered index
CREATE INDEX messages_only_todo
          ON messages (receiver) INCLUDE (message)
       WHERE processed = 'N';

declare @r numeric
set @r = 4

SELECT message
   FROM messages
  WHERE processed = 'N'
    AND receiver  = @r;
```

على [SQL Fiddle](https://sqlfiddle.com/#!6/3a717/2).
