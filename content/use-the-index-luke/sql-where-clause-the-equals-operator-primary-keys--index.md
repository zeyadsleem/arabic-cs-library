---
title: "المفاتيح الأساسية"
lang: ar
source: https://use-the-index-luke.com/sql/where-clause/the-equals-operator/primary-keys
---

نبدأ بأبسط عبارات `where` وأكثرها شيوعاً: البحث بالمفتاح الأساسي (primary key lookup). وفي الأمثلة الواردة في هذا الفصل نستخدم جدول `EMPLOYEES` المعرَّف كما يلي:

```sql
CREATE TABLE employees (
   employee_id   NUMBER        NOT NULL,
   first_name    VARCHAR(1000) NOT NULL,
   last_name     VARCHAR(1000) NOT NULL,
   date_of_birth DATE          NOT NULL,
   phone_number  VARCHAR(1000) NOT NULL,
   CONSTRAINT employees_pk PRIMARY KEY (employee_id)
)
```

تُنشئ قاعدة البيانات تلقائياً فهرساً للمفتاح الأساسي. ويعني ذلك وجود فهرس على العمود `EMPLOYEE_ID`، رغم عدم وجود عبارة `create index`.

#### نصيحة

يحتوي [الملحق ج*المخطط المثال*](/book/use-the-index-luke/sql-example-schema/index) على نصوص برمجية لتعبئة جدول `EMPLOYEES` ببيانات نموذجية. ويمكنك استخدامه لاختبار الأمثلة في بيئتك الخاصة.

لمتابعة النص، يكفي أن تعرف أن الجدول يحتوي 1000 صف.

يستخدم الاستعلام التالي المفتاح الأساسي لاسترجاع اسم موظف:

```sql
SELECT first_name, last_name
  FROM employees
 WHERE employee_id = 123
```

لا يمكن لعبارة `where` أن تطابق عدة صفوف لأن قيد المفتاح الأساسي يضمن تفرّد قيم `EMPLOYEE_ID`. ولا تحتاج قاعدة البيانات (database) إلى تتبّع عقد أوراق الفهرس—يكفي اجتياز شجرة الفهرس. ويمكننا استخدام ما يسمى *خطة التنفيذ* (execution plan) للتحقق:

Db2 (LUW)

جُمعت خطة التنفيذ التالية باستخدام عرض [`last_explained`](/book/use-the-index-luke/sql-explain-plan-db2-getting-an-execution-plan/index#apa-db2-last_explained) المتاح من [الملحق](/book/use-the-index-luke/sql-explain-plan-db2-getting-an-execution-plan/index#apa-db2-last_explained).

```
Explain Plan
-------------------------------------------------------
ID | Operation             |                Rows | Cost
 1 | RETURN                |                     |   13
 2 |  FETCH EMPLOYEES      |    1 of 1 (100.00%) |   13
 3 |   IXSCAN EMPLOYEES_PK | 1 of 1000 (   .10%) |    6

Predicate Information
 3 - START (Q1.EMPLOYEE_ID = +00123.)
      STOP (Q1.EMPLOYEE_ID = +00123.)
```

عملية `IXSCAN` شبيهة بعملية `INDEX [RANGE|UNIQUE] SCAN` في Oracle. ومن هذا الناتج لا يمكننا أن نقرر إن كان مسحاً فريداً أم مسح نطاق. وتقابل عملية `FETCH` عملية `TABLE ACCESS BY INDEX ROWID` في Oracle.

MySQL

```javascript
+----+-----------+-------+---------+---------+------+-------+
| id | table     | type  | key     | key_len | rows | Extra |
+----+-----------+-------+---------+---------+------+-------+
|  1 | employees | const | PRIMARY | 5       |    1 |       |
+----+-----------+-------+---------+---------+------+-------+
```

النوع `const` هو مقابل MySQL لعملية `INDEX UNIQUE SCAN` في Oracle.

Oracle

```
---------------------------------------------------------------
|Id |Operation                   | Name         | Rows | Cost |
---------------------------------------------------------------
| 0 |SELECT STATEMENT            |              |    1 |    2 |
| 1 | TABLE ACCESS BY INDEX ROWID| EMPLOYEES    |    1 |    2 |
|*2 |  INDEX UNIQUE SCAN         | EMPLOYEES_PK |    1 |    1 |
---------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
   2 - access("EMPLOYEE_ID"=123)
```

PostgreSQL

```
                QUERY PLAN
-------------------------------------------
 Index Scan using employees_pk on employees 
   (cost=0.00..8.27 rows=1 width=14)
   Index Cond: (employee_id = 123::numeric)
```

تجمع عملية `Index Scan` في PostgreSQL بين عمليتي `INDEX [UNIQUE/RANGE] SCAN` و`TABLE ACCES BY INDEX ROWID` من قاعدة بيانات Oracle. ولا يظهر من خطة التنفيذ إن كان الوصول إلى الفهرس قد يعيد أكثر من صف.

SQL Server

```
|--Nested Loops(Inner Join)
   |--Index Seek(OBJECT:employees_pk,
   |               SEEK:employees.employee_id=@1
   |            ORDERED FORWARD)
   |--RID Lookup(OBJECT:employees,
                   SEEK:Bmk1000=Bmk1000
                 LOOKUP ORDERED FORWARD)
```

تقابل عمليتا `INDEX SEEK` و`RID Lookup` في SQL Server عمليتي `INDEX RANGE SCAN` و`TABLE ACCESS BY ROWID` في Oracle على التوالي. وخلافاً لقاعدة بيانات Oracle، يُظهر SQL Server صراحةً ضمّ `Nested Loops` لدمج بيانات الفهرس والجدول.

تُظهر خطة تنفيذ Oracle عملية `INDEX UNIQUE SCAN`—وهي العملية التي تجتاز شجرة الفهرس فقط. وتستفيد استفادة كاملة من قابلية التوسع اللوغاريتمي للفهرس للعثور على المدخل بسرعة كبيرة—شبه مستقلة عن حجم الجدول.

#### نصيحة

تُظهر *خطة التنفيذ* (وأحياناً *خطة الشرح* explain plan أو *خطة الاستعلام* query plan) الخطوات التي تتخذها قاعدة البيانات لتنفيذ عبارة SQL. ويشرح [الملحق أ](/book/use-the-index-luke/sql-explain-plan/index) كيفية استرجاع خطط التنفيذ وقراءتها في قواعد بيانات أخرى.

بعد الوصول إلى الفهرس، يجب على قاعدة البيانات أن تنفّذ خطوة إضافية لجلب البيانات المستعلَمة (`FIRST_NAME` و`LAST_NAME`) من مخزن الجدول: عملية `TABLE ACCESS BY INDEX ROWID`. وقد تصبح هذه العملية عنق زجاجة في الأداء—كما شُرح في [«*الفهارس البطيئة، الجزء الأول*»](/book/use-the-index-luke/sql-anatomy-slow-indexes/index)—لكن لا يوجد خطر من هذا القبيل مع `INDEX UNIQUE SCAN`. فهذه العملية لا يمكن أن تعيد أكثر من مدخل واحد، لذا لا يمكن أن تُطلق أكثر من وصول واحد إلى الجدول. ويعني ذلك أن مكوّنات الاستعلام البطيء غير موجودة مع `INDEX UNIQUE SCAN`.

## المفاتيح الأساسية بدون فهرس فريد

لا يحتاج المفتاح الأساسي بالضرورة إلى فهرس فريد—يمكنك استخدام فهرس غير فريد أيضاً. وفي هذه الحالة لا تستخدم قاعدة بيانات Oracle عملية `INDEX UNIQUE SCAN` بل عملية `INDEX RANGE SCAN` بدلاً منها. ومع ذلك، لا يزال القيد يحافظ على تفرّد المفاتيح، بحيث لا يعيد البحث بالفهرس أكثر من مدخل واحد.

ومن أسباب استخدام فهارس غير فريدة لمفتاح أساسي *القيود القابلة للتأجيل* (deferrable constraints). وخلافاً للقيود العادية، التي تُتحقق أثناء تنفيذ العبارة، تؤجّل قاعدة البيانات التحقق من القيود القابلة للتأجيل حتى إتمام المعاملة (transaction). وتُحتاج القيود المؤجَّلة لإدراج بيانات في جداول ذات تبعيات دائرية.

#### إن أعجبك هذا الموضوع، قد يعجبك أيضاً…

… أن [تشترك في **القوائم البريدية**](https://winand.at/lists)، و[تحصل على **ملصقات مجانية**](https://use-the-index-luke.com/shop)، و[تشتري **كتابي**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-surrogate&utm_medium=web)، أو [تنضم إلى **دورة تدريبية**](https://winand.at/sql-training/open-online-class).
