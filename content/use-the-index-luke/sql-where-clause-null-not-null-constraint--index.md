---
title: "قيود `NOT NULL`"
lang: ar
source: https://use-the-index-luke.com/sql/where-clause/null/not-null-constraint
---

لفهرسة شرط `IS NULL` في قاعدة بيانات Oracle، يجب أن يحتوي الفهرس على عمود لا يمكن أن يكون `NULL` أبداً.

ومع ذلك، لا يكفي ألا توجد مدخلات `NULL`؛ إذ يجب أن تتأكد قاعدة البيانات من أنه لا يمكن أن يوجد مدخل `NULL` أبداً، وإلا وجب عليها أن تفترض أن الجدول يحتوي صفوفاً غير موجودة في الفهرس.

#### إن أعجبك هذا الموضوع، قد يعجبك أيضاً…

… أن [تشترك في **القوائم البريدية**](https://winand.at/lists)، و[تحصل على **ملصقات مجانية**](https://use-the-index-luke.com/shop)، و[تشتري **كتابي**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-knowingnotnull&utm_medium=web)، أو [تنضم إلى **دورة تدريبية**](https://winand.at/sql-training/open-online-class).

يدعم الفهرس التالي الاستعلام فقط إذا كان العمود `LAST_NAME` يحمل قيد `NOT NULL`:

```
DROP INDEX emp_dob
```

```sql
CREATE INDEX emp_dob_name
          ON employees (date_of_birth, last_name)
```

```sql
SELECT *
  FROM employees
 WHERE date_of_birth IS NULL
```

وتؤدي إزالة قيد `NOT NULL` إلى جعل الفهرس غير قابل للاستخدام في هذا الاستعلام:

```sql
ALTER TABLE employees MODIFY last_name NULL
```

```sql
SELECT *
  FROM employees
 WHERE date_of_birth IS NULL
```

#### نصيحة

قد يمنع غياب قيد `NOT NULL` استخدام الفهرس في قاعدة بيانات Oracle — وبخاصة في استعلامات `count(*)`.

وإلى جانب قيود `NOT NULL`، تعلم قاعدة البيانات أيضاً أن التعبيرات الثابتة، كما في [القسم السابق](/book/use-the-index-luke/sql-where-clause-null-index/index)، لا يمكن أن تصبح `NULL`.

غير أن الفهرس على دالة معرّفة من المستخدم لا يفرض قيد `NOT NULL` على تعبير الفهرس:

```sql
CREATE OR REPLACE FUNCTION blackbox(id IN NUMBER) RETURN NUMBER
DETERMINISTIC
IS BEGIN
   RETURN id;
END
```

```
DROP INDEX emp_dob_name
```

```sql
CREATE INDEX emp_dob_bb 
    ON employees (date_of_birth, blackbox(employee_id))
```

```sql
SELECT *
  FROM employees
 WHERE date_of_birth IS NULL
```

```
----------------------------------------------------
| Id | Operation         | Name      | Rows | Cost |
----------------------------------------------------
|  0 | SELECT STATEMENT  |           |    1 |  477 |
|* 1 |  TABLE ACCESS FULL| EMPLOYEES |    1 |  477 |
----------------------------------------------------
```

ويؤكد اسم الدالة `BLACKBOX` أن المُحسِّن لا يعرف شيئاً عما تفعله الدالة (انظر [«*البحث غير الحسّاس لحالة الأحرف باستخدام `UPPER` أو `LOWER`*»](/book/use-the-index-luke/sql-where-clause-functions-case-insensitive-search/index)). ويمكننا أن نرى أن الدالة تمرّر قيمة الإدخال كما هي، لكنها بالنسبة إلى قاعدة البيانات مجرد دالة تعيد عدداً؛ وقد فُقدت خاصية `NOT NULL` الخاصة بالمعامل. ومع أن الفهرس يجب أن يحتوي جميع الصفوف، فقاعدة البيانات لا تعلم ذلك، ولذلك لا تستطيع استخدام الفهرس في الاستعلام.

وإذا *كنت تعلم* أن الدالة لا تعيد `NULL` أبداً، كما في هذا المثال، فيمكنك تغيير الاستعلام ليعكس ذلك:

```sql
SELECT *
  FROM employees
 WHERE date_of_birth IS NULL
   AND blackbox(employee_id) IS NOT NULL
```

```
-------------------------------------------------------------
|Id |Operation                   | Name       | Rows | Cost |
-------------------------------------------------------------
| 0 |SELECT STATEMENT            |            |    1 |    3 |
| 1 | TABLE ACCESS BY INDEX ROWID| EMPLOYEES  |    1 |    3 |
|*2 |  INDEX RANGE SCAN          | EMP_DOB_BB |    1 |    2 |
-------------------------------------------------------------
```

الشرط الإضافي في جملة `where` صحيح دائماً، ولذلك لا يغيّر النتيجة. ومع ذلك تدرك قاعدة بيانات Oracle أنك تستعلم فقط عن صفوف يجب أن تكون في الفهرس بحكم التعريف.

لا توجد، للأسف، طريقة لوسم دالة لا تعيد `NULL` أبداً، لكن يمكنك نقل استدعاء الدالة إلى [عمود محسوب](https://modern-sql.com/caniuse/generated-always-as) (منذ 11*g*) ووضع قيد `NOT NULL` على هذا العمود.

```sql
ALTER TABLE employees ADD bb_expression
      GENERATED ALWAYS AS (blackbox(employee_id)) NOT NULL
```

```
DROP   INDEX emp_dob_bb
```

```sql
CREATE INDEX emp_dob_bb 
    ON employees (date_of_birth, bb_expression)
```

```sql
SELECT *
  FROM employees
 WHERE date_of_birth IS NULL
   AND blackbox(employee_id) IS NOT NULL
```

```
-------------------------------------------------------------
|Id |Operation                   | Name       | Rows | Cost |
-------------------------------------------------------------
| 0 |SELECT STATEMENT            |            |    1 |    3 |
| 1 | TABLE ACCESS BY INDEX ROWID| EMPLOYEES  |    1 |    3 |
|*2 |  INDEX RANGE SCAN          | EMP_DOB_BB |    1 |    2 |
-------------------------------------------------------------
```

وتعلم قاعدة بيانات Oracle أن بعض الدوال الداخلية لا تعيد `NULL` إلا إذا مُرِّرت `NULL` كإدخال.

```
DROP INDEX emp_dob_bb
```

```sql
CREATE INDEX emp_dob_upname 
    ON employees (date_of_birth, upper(last_name))
```

```sql
SELECT *
  FROM employees
 WHERE date_of_birth IS NULL
```

```
----------------------------------------------------------
|Id |Operation                   | Name           | Cost |
----------------------------------------------------------
| 0 |SELECT STATEMENT            |                |    3 |
| 1 | TABLE ACCESS BY INDEX ROWID| EMPLOYEES      |    3 |
|*2 |  INDEX RANGE SCAN          | EMP_DOB_UPNAME |    2 |
----------------------------------------------------------
```

وتحافظ دالة `UPPER` على خاصية `NOT NULL` الخاصة بالعمود `LAST_NAME`. غير أن إزالة القيد تجعل الفهرس غير قابل للاستخدام:

```sql
ALTER TABLE employees MODIFY last_name NULL
```

```sql
SELECT *
  FROM employees
 WHERE date_of_birth IS NULL
```

```
----------------------------------------------------
| Id | Operation         | Name      | Rows | Cost |
----------------------------------------------------
|  0 | SELECT STATEMENT  |           |    1 |  477 |
|* 1 |  TABLE ACCESS FULL| EMPLOYEES |    1 |  477 |
----------------------------------------------------
```
