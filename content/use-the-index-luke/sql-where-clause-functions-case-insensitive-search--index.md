---
title: "البحث غير الحساس لحالة الأحرف باستخدام `UPPER` أو `LOWER`"
lang: ar
source: https://use-the-index-luke.com/sql/where-clause/functions/case-insensitive-search
---

تجاهل حالة الأحرف في عبارة `where` بسيط جداً. يمكنك مثلاً تحويل طرفي المقارنة إلى صيغة الأحرف الكبيرة:

```sql
SELECT first_name, last_name, phone_number
  FROM employees
 WHERE UPPER(last_name) = UPPER('winand')
```

بغض النظر عن حالة الأحرف المستخدمة في مصطلح البحث أو في العمود `LAST_NAME`، تجعل دالة `UPPER` الطرفين متطابقين كما هو مطلوب.

#### ملاحظة

طريقة أخرى للمطابقة غير الحساسة لحالة الأحرف هي استخدام «ترتيب أبجدي» (collation) مختلف. فالترتيبات الأبجدية الافتراضية التي تستخدمها SQL Server وMySQL لا تميّز بين الأحرف الكبيرة والصغيرة—فهي غير حساسة لحالة الأحرف افتراضياً.

منطق هذا الاستعلام معقول تماماً، لكن خطة التنفيذ ليست كذلك:

Db2 (LUW)

```
Explain Plan
------------------------------------------------------
ID | Operation         |                   Rows | Cost
 1 | RETURN            |                        |  690
 2 |  TBSCAN EMPLOYEES | 400 of 10000 (  4.00%) |  690

Predicate Information
 2 - SARG ( UPPER(Q1.LAST_NAME) = 'WINAND')
```

Oracle

```
----------------------------------------------------
| Id | Operation         | Name      | Rows | Cost |
----------------------------------------------------
|  0 | SELECT STATEMENT  |           |   10 |  477 |
|* 1 |  TABLE ACCESS FULL| EMPLOYEES |   10 |  477 |
----------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
   1 - filter(UPPER("LAST_NAME")='WINAND')
```

PostgreSQL

```
                     QUERY PLAN
------------------------------------------------------
 Seq Scan on employees
   (cost=0.00..1722.00 rows=50 width=17)
   Filter: (upper((last_name)::text) = 'WINAND'::text)
```

إنها عودة لصديقنا القديم: المسح الكامل للجدول. فرغم وجود فهرس على `LAST_NAME`، فإنه غير صالح للاستخدام—لأن البحث *ليس* على `LAST_NAME` بل على `UPPER(LAST_NAME)`. ومن منظور قاعدة البيانات، ذلك شيء *مختلف تماماً*.

#### إن أعجبك هذا الموضوع، قد يعجبك أيضاً…

… أن [تشترك في **القوائم البريدية**](https://winand.at/lists)، و[تحصل على **ملصقات مجانية**](https://use-the-index-luke.com/shop)، و[تشتري **كتابي**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-insensitive&utm_medium=web)، أو [تنضم إلى **دورة تدريبية**](https://winand.at/sql-training/open-online-class).

هذا فخ قد نقع فيه جميعاً. فنحن ندرك العلاقة بين `LAST_NAME` و`UPPER(LAST_NAME)` فوراً ونتوقع أن «تراها» قاعدة البيانات أيضاً. في الواقع، رؤية المُحسِّن (optimizer) أقرب إلى هذا:

```sql
SELECT first_name, last_name, phone_number
  FROM employees
 WHERE BLACKBOX(...) = 'WINAND'
```

دالة `UPPER` مجرد صندوق أسود. فمعاملات الدالة غير ذات صلة لأنه لا توجد علاقة عامة بين معاملات الدالة والنتيجة.

#### نصيحة

استبدل اسم الدالة بـ`BLACKBOX` لتفهم وجهة نظر المُحسِّن.

## التقييم في زمن الترجمة

يستطيع المُحسِّن تقييم التعبير في الطرف الأيمن أثناء «زمن الترجمة» (compile time) لأن لديه جميع معاملات الإدخال. لذا تُظهر خطة تنفيذ Oracle (قسم «معلومات المُسندات») صيغة الأحرف الكبيرة لمصطلح البحث فقط. وهذا السلوك شبيه جداً بمترجم يقيّم التعبيرات الثابتة في زمن الترجمة.

لدعم هذا الاستعلام، نحتاج إلى فهرس يغطي مصطلح البحث الفعلي. ويعني ذلك أننا لا نحتاج فهرساً على `LAST_NAME` بل على `UPPER(LAST_NAME)`:

```sql
CREATE INDEX emp_up_name 
    ON employees (UPPER(last_name))
```

الفهرس الذي يحتوي تعريفه على دوال أو تعبيرات هو ما يسمى *فهرساً قائماً على دالة* (function-based index — FBI). فبدلاً من نسخ بيانات العمود مباشرة إلى الفهرس، يطبّق الفهرس القائم على دالة الدالة أولاً ويضع النتيجة في الفهرس. ونتيجة لذلك، يخزّن الفهرس الأسماء بصيغة الأحرف الكبيرة.

يمكن لقاعدة البيانات استخدام فهرس قائم على دالة إذا ظهر *التعبير نفسه تماماً* من تعريف الفهرس في عبارة SQL—كما في المثال أعلاه. وتؤكد خطة التنفيذ ذلك:

Db2 (LUW)

```
Explain Plan
-------------------------------------------------------
ID | Operation            |                 Rows | Cost
 1 | RETURN               |                      |   13
 2 |  FETCH EMPLOYEES     |     1 of 1 (100.00%) |   13
 3 |   IXSCAN EMP_UP_NAME | 1 of 10000 (   .01%) |    6

Predicate Information
 3 - START ( UPPER(Q1.LAST_NAME) = 'WINAND')
      STOP ( UPPER(Q1.LAST_NAME) = 'WINAND')
```

غُيّر الاستعلام إلى `WHERE UPPER(last_name) = 'WINAND'` (بدون `UPPER` في الطرف الأيمن) للحصول على النتيجة المتوقعة. وعند استخدام `UPPER('winand')`، يخطئ المُحسِّن خطأً جسيماً في التقدير ويتوقع اختيار 4% من صفوف الجدول. وهذا يجعل المُحسِّن يتجاهل الفهرس وينفّذ `TBSCAN`. انظر [*مسح كامل للجدول*](/book/use-the-index-luke/sql-where-clause-the-equals-operator-concatenated-keys/index#sb-full-table-scan) لترى لماذا قد يكون ذلك منطقياً.

Oracle

```
--------------------------------------------------------------
|Id |Operation                   | Name        | Rows | Cost |
--------------------------------------------------------------
| 0 |SELECT STATEMENT            |             |  100 |   41 |
| 1 | TABLE ACCESS BY INDEX ROWID| EMPLOYEES   |  100 |   41 |
|*2 |  INDEX RANGE SCAN          | EMP_UP_NAME |   40 |    1 |
--------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
  2 - access(UPPER("LAST_NAME")='WINAND')
```

PostgreSQL

```
                       QUERY PLAN
------------------------------------------------------------
Bitmap Heap Scan on employees
  (cost=4.65..178.65 rows=50 width=17)
  Recheck Cond: (upper((last_name)::text) = 'WINAND'::text)
  -> Bitmap Index Scan on emp_up_name
     (cost=0.00..4.64 rows=50 width=0)
     Index Cond: (upper((last_name)::text) = 'WINAND'::text)
```

إنه `INDEX RANGE SCAN` عادي كما ورد في [الفصل الأول](/book/use-the-index-luke/sql-anatomy/index). فقاعدة البيانات تجتاز شجرة B (B-tree) وتتبّع سلسلة عقد الأوراق. ولا توجد عمليات أو كلمات مفتاحية مخصصة للفهارس القائمة على الدوال.

#### تحذير

تستخدم أدوات ORM أحياناً `UPPER` و`LOWER` دون علم المطوّر. فمثلاً، يحقن Hibernate [دالة `LOWER` ضمنية](/book/use-the-index-luke/sql-myth-directory-dynamic-sql-is-slow/index#myth-dynamic-sql-sample) للبحث غير الحساس لحالة الأحرف.

لا تزال خطة التنفيذ ليست نفسها كما كانت في القسم السابق بدون `UPPER`؛ فتقدير عدد الصفوف مرتفع جداً. ومن الغريب بشكل خاص أن يتوقع المُحسِّن جلب صفوف من الجدول أكثر مما يقدّمه `INDEX RANGE SCAN` في المقام الأول. فكيف يجلب 100 صف من الجدول إذا كان مسح الفهرس السابق أعاد 40 صفاً فقط؟ الجواب أنه لا يستطيع. والتقديرات المتناقضة كهذه غالباً ما تدل على مشكلات في الإحصاءات. وفي هذه الحالة بالتحديد يرجع ذلك إلى أن قاعدة بيانات Oracle لا تحدّث إحصاءات الجدول عند إنشاء فهرس جديد (انظر أيضاً [«*إحصاءات Oracle للفهارس القائمة على الدوال*»](#sb-collecting-statistics)).

## إحصاءات Oracle للفهارس القائمة على الدوال

تحفظ قاعدة بيانات Oracle المعلومات عن عدد قيم العمود المتمايزة ضمن إحصاءات الجدول. وتُعاد استخدام هذه الأرقام إذا كان العمود جزءاً من فهارس متعددة.

وتُحفظ إحصاءات الفهرس القائم على دالة (FBI) أيضاً على مستوى الجدول كـ*أعمدة افتراضية* (virtual columns). ورغم أن قاعدة بيانات Oracle تجمع *إحصاءات الفهرس* للفهارس الجديدة تلقائياً ([منذ الإصدار 10*g*](https://docs.oracle.com/cd/B14117_01/server.101/b10763/compat.htm#sthref320))، فإنها لا تحدّث *إحصاءات الجدول*. ولهذا السبب يوصي توثيق Oracle بتحديث إحصاءات الجدول بعد إنشاء فهرس قائم على دالة:

بعد إنشاء فهرس قائم على دالة، اجمع الإحصاءات على الفهرس وجدوله الأساسي معاً باستخدام حزمة `DBMS_STATS`. وستتيح هذه الإحصاءات لقاعدة بيانات Oracle أن تقرر على نحو صحيح متى تستخدم الفهرس.

— [Oracle Database SQL Language Reference](https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/CREATE-INDEX.html#GUID-1F89BBC0-825F-4215-AF71-7588E31D8BFE__I2100962)

وتوصيتي الشخصية تذهب أبعد من ذلك: بعد كل تغيير في الفهرس، حدّث إحصاءات الجدول الأساسي وجميع فهارسه. غير أن ذلك قد يؤدي أيضاً إلى آثار جانبية غير مرغوبة. نسّق هذا النشاط مع مديري قواعد البيانات (DBAs) وخذ نسخة احتياطية من الإحصاءات الأصلية.

بعد تحديث الإحصاءات، يحسب المُحسِّن تقديرات أدق:

Oracle

```
--------------------------------------------------------------
|Id |Operation                   | Name        | Rows | Cost |
--------------------------------------------------------------
| 0 |SELECT STATEMENT            |             |    1 |    3 |
| 1 | TABLE ACCESS BY INDEX ROWID| EMPLOYEES   |    1 |    3 |
|*2 |  INDEX RANGE SCAN          | EMP_UP_NAME |    1 |    1 |
--------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
  2 - access(UPPER("LAST_NAME")='WINAND')
```

PostgreSQL

```
                      QUERY PLAN
----------------------------------------------------------
 Index Scan using emp_up_name on employees
   (cost=0.00..8.28 rows=1 width=17)
   Index Cond: (upper((last_name)::text) = 'WINAND'::text)
```

وبما أن تقدير عدد الصفوف قد انخفض—من 50 في المثال أعلاه إلى 1 في خطة التنفيذ هذه—يفضّل مخطِّط الاستعلام (query planner) استخدام عملية `Index Scan` الأبسط.

#### ملاحظة

[ما يسمى «الإحصاءات الموسّعة» على التعبيرات ومجموعات الأعمدة](https://docs.oracle.com/en/database/oracle/oracle-database/19/tgsql/managing-extended-statistics.html#GUID-BD0F0B71-DD8B-44A0-888E-495830FC09A4) أُدخلت مع إصدار Oracle 11*g*.

ورغم أن الإحصاءات المحدَّثة لا تحسّن أداء التنفيذ في هذه الحالة—فقد كان الفهرس مستخدماً على نحو سليم على أي حال—فإن التحقق من تقديرات المُحسِّن فكرة جيدة دائماً. وعدد الصفوف المعالجة لكل عملية (تقدير العلاقة الأساسية cardinality estimate) رقم مهم بشكل خاص، ويظهر أيضاً في خطط تنفيذ SQL Server وPostgreSQL.

#### نصيحة

يصف [الملحق أ، «*خطط التنفيذ*»](/book/use-the-index-luke/sql-explain-plan/index) تقديرات عدد الصفوف في خطط تنفيذ قواعد البيانات الأخرى.

لا تدعم SQL Server وMySQL الفهارس القائمة على الدوال كما وُصفت، لكن كلتيهما تقدّم حلاً بديلاً عبر الأعمدة المحسوبة أو المولّدة. وللاستفادة من ذلك، عليك أولاً إضافة عمود مولّد إلى الجدول يمكن فهرسته بعد ذلك:

MySQL منذ MySQL 5.7 يمكنك [فهرسة عمود مولّد](https://dev.mysql.com/doc/refman/8.0/en/create-table.html#create-table-secondary-indexes-virtual-columns) كما يلي:

```sql
ALTER TABLE employees
  ADD COLUMN last_name_up VARCHAR(255) AS (UPPER(last_name));
```

```sql
CREATE INDEX emp_up_name ON employees (last_name_up);
```

SQL Server

```sql
ALTER TABLE employees ADD last_name_up AS UPPER(last_name)
```

```sql
CREATE INDEX emp_up_name ON employees (last_name_up)
```

تستطيع SQL Server وMySQL استخدام هذا الفهرس كلما ظهر التعبير المفهرس في العبارة. وفي بعض الحالات البسيطة، يمكن لـSQL Server و[MySQL](https://dev.mysql.com/doc/refman/8.0/en/generated-column-index-optimizations.html) استخدام هذا الفهرس حتى إذا بقي الاستعلام دون تغيير. لكن في بعض الأحيان يجب تغيير الاستعلام ليشير إلى اسم العمود الجديد من أجل استخدام الفهرس. تحقق دائماً من خطة التنفيذ عند الشك.
