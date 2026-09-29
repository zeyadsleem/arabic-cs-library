---
title: "أكبر وأصغر و`BETWEEN`"
lang: ar
source: https://use-the-index-luke.com/sql/where-clause/searching-for-ranges/greater-less-between-tuning-sql-access-filter-predicates
---

أكبر مخاطر الأداء في `INDEX RANGE SCAN` هي [تتبّع عقد الأوراق](/book/use-the-index-luke/sql-anatomy-the-leaf-nodes/index). لذا فالقاعدة الذهبية في الفهرسة هي إبقاء نطاق الفهرس الممسوح أصغر ما يمكن. ويمكنك التحقق من ذلك بسؤال نفسك: من أين يبدأ مسح الفهرس وأين ينتهي؟

السؤال سهل الإجابة إذا ذكرت عبارة SQL شرطي البداية والتوقف صراحةً:

```sql
SELECT first_name, last_name, date_of_birth
  FROM employees
 WHERE date_of_birth >= TO_DATE(?, 'YYYY-MM-DD')
   AND date_of_birth <= TO_DATE(?, 'YYYY-MM-DD')
```

لا يُمسح فهرس على `DATE_OF_BIRTH` إلا في النطاق المحدَّد. فيبدأ المسح عند التاريخ الأول وينتهي عند الثاني. ولا يمكننا تضييق نطاق الفهرس الممسوح أكثر من ذلك.

ويقلّ وضوح شرطي البداية والتوقف إذا شارك عمود ثانٍ:

```sql
SELECT first_name, last_name, date_of_birth
  FROM employees
 WHERE date_of_birth >= TO_DATE(?, 'YYYY-MM-DD')
   AND date_of_birth <= TO_DATE(?, 'YYYY-MM-DD')
   AND subsidiary_id  = ?
```

بالطبع يجب أن يغطي الفهرس المثالي العمودين معاً، لكن السؤال: بأي ترتيب؟

تعرض الأشكال التالية أثر ترتيب الأعمدة في نطاق الفهرس الممسوح. وللتوضيح نبحث عن جميع موظفي الشركة الفرعية 27 الذين وُلدوا بين 1 يناير و9 يناير 1971.

يوضّح [الشكل 2.2](#fig-range-bad) تفصيلاً من الفهرس على `DATE_OF_BIRTH` و`SUBSIDIARY_ID`—بهذا الترتيب. فأين ستبدأ قاعدة البيانات في تتبّع سلسلة عقد الأوراق، أو بعبارة أخرى: أين سينتهي [اجتياز الشجرة](/book/use-the-index-luke/sql-anatomy-the-tree/index)؟

الشكل 2.2 مسح نطاق في فهرس `DATE_OF_BIRTH`، `SUBSIDIARY_ID`

الفهرس مرتّب بتواريخ الميلاد أولاً. ولا يُستخدم `SUBSIDIARY_ID` لترتيب هذه السجلات إلا إذا وُلد موظفان في اليوم نفسه. لكن الاستعلام يغطي *نطاقاً* من التواريخ. لذا فترتيب `SUBSIDIARY_ID` عديم الفائدة أثناء اجتياز الشجرة. ويتّضح ذلك إذا أدركت أنه لا يوجد مدخل للشركة الفرعية 27 في العقد الفرعية—رغم وجوده في عقد الأوراق. لذا فمرشّح `DATE_OF_BIRTH` هو الشرط الوحيد الذي يحدّ نطاق الفهرس الممسوح. فيبدأ عند أول مدخل يطابق نطاق التاريخ وينتهي عند الأخير—جميع عقد الأوراق الخمس الظاهرة في [الشكل 2.2](#fig-range-bad).

#### إن أعجبك هذا الموضوع، قد يعجبك أيضاً…

… أن [تشترك في **القوائم البريدية**](https://winand.at/lists)، و[تحصل على **ملصقات مجانية**](https://use-the-index-luke.com/shop)، و[تشتري **كتابي**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-greater-less-between&utm_medium=web)، أو [تنضم إلى **دورة تدريبية**](https://winand.at/sql-training/open-online-class).

تبدو الصورة مختلفة تماماً عند عكس ترتيب الأعمدة. ويوضّح [الشكل 2.3](#fig-range-good) المسح إذا بدأ الفهرس بالعمود `SUBSIDIARY_ID`.

الشكل 2.3 مسح نطاق في فهرس `SUBSIDIARY_ID`، `DATE_OF_BIRTH`

والفرق أن معامل التساوي يحدّ العمود الأول في الفهرس بقيمة واحدة. وضمن نطاق هذه القيمة (`SUBSIDIARY_ID` 27) يكون الفهرس مرتّباً وفق العمود الثاني—تاريخ الميلاد—فلا حاجة لزيارة عقدة الورقة الأولى لأن العقدة الفرعية تشير بالفعل إلى أنه لا يوجد موظف للشركة الفرعية 27 وُلد بعد 25 يونيو 1969 في عقدة الورقة الأولى.

يقود اجتياز الشجرة مباشرةً إلى عقدة الورقة الثانية. وفي هذه الحالة، تحدّ جميع شروط عبارة `where` نطاق الفهرس الممسوح، بحيث ينتهي المسح عند عقدة الورقة نفسها.

#### نصيحة

قاعدة عملية: الفهرس للتساوي أولاً—ثم للنطاقات.

يعتمد فرق الأداء الفعلي على البيانات ومعايير البحث. وقد يكون الفرق ضئيلاً إذا كان المرشّح على `DATE_OF_BIRTH` انتقائياً جداً بذاته. وكلما كبر نطاق التاريخ، كبر فرق الأداء.

وبهذا المثال يمكننا أيضاً دحض خرافة أن العمود الأكثر انتقائية ينبغي أن يكون في الموضع الأيسر من الفهرس. فإذا نظرنا إلى الأشكال واعتبرنا انتقائية العمود الأول وحده، نرى أن كلا الشرطين يطابق 13 سجلاً. وهذا صحيح سواء رشّحنا بـ`DATE_OF_BIRTH` وحده أو بـ`SUBSIDIARY_ID` وحده. فالانتقائية عديمة الفائدة هنا، ومع ذلك يظل أحد ترتيبي الأعمدة أفضل من الآخر.

لتحسين الأداء، من المهم جداً معرفة نطاق الفهرس الممسوح. ومعظم قواعد البيانات يتيح لك رؤية ذلك في خطة التنفيذ—كل ما عليك معرفته هو ما تبحث عنه. وخطة التنفيذ التالية من قاعدة بيانات Oracle تشير إشارة لا لبس فيها إلى أن فهرس `EMP_TEST` يبدأ بالعمود `DATE_OF_BIRTH`.

Db2 (LUW)

```
Explain Plan
----------------------------------------------------
ID | Operation         |                 Rows | Cost
 1 | RETURN            |                      |   26
 2 |  FETCH EMPLOYEES  |     3 of 3 (100.00%) |   26
 3 |   IXSCAN EMP_TEST | 3 of 10000 (   .03%) |    6

Predicate Information
 3 - START ( TO_DATE(?, 'YYYY-MM-DD') <= Q1.DATE_OF_BIRTH)
     START (Q1.SUBSIDIARY_ID = ?)
      STOP (Q1.DATE_OF_BIRTH <= TO_DATE(?, 'YYYY-MM-DD'))
      STOP (Q1.SUBSIDIARY_ID = ?)
      SARG (Q1.SUBSIDIARY_ID = ?)
```

في Db2 تُسمّى مُسندات الوصول `START` و/أو `STOP`، بينما تظهر مُسندات الترشيح كـ`SARG`.

Oracle

```
--------------------------------------------------------------
|Id | Operation                    | Name      | Rows | Cost |
--------------------------------------------------------------
| 0 | SELECT STATEMENT             |           |    1 |    4 |
|*1 |  FILTER                      |           |      |      |
| 2 |   TABLE ACCESS BY INDEX ROWID| EMPLOYEES |    1 |    4 |
|*3 |    INDEX RANGE SCAN          | EMP_TEST  |    2 |    2 |
--------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
1 - filter(:END_DT >= :START_DT)
3 - access(DATE_OF_BIRTH >= :START_DT 
       AND DATE_OF_BIRTH <= :END_DT)
    filter(SUBSIDIARY_ID  = :SUBS_ID)
```

PostgreSQL

```
                            QUERY PLAN
-------------------------------------------------------------------
Index Scan using emp_test on employees
  (cost=0.01..8.59 rows=1 width=16)
  Index Cond: (date_of_birth >= to_date('1971-01-01','YYYY-MM-DD'))
          AND (date_of_birth <= to_date('1971-01-10','YYYY-MM-DD'))
          AND (subsidiary_id = 27::numeric)
```

لا تشير قاعدة بيانات PostgreSQL إلى مُسندات وصول الفهرس ومُسندات الترشيح في خطة التنفيذ. غير أن قسم `Index Cond` يسرد الأعمدة بترتيب تعريف الفهرس. وفي هذه الحالة نرى مُسندَي `DATE_OF_BIRTH` أولاً، ثم `SUBSIDIARY_ID`. وبمعرفة أن أي مُسندات تلي شرط نطاق لا يمكن أن تكون مُسند وصول، فلا بد أن يكون `SUBSIDIARY_ID` مُسند ترشيح. انظر [*التمييز بين مُسندات الوصول والترشيح*](/book/use-the-index-luke/sql-explain-plan-postgresql-filter-predicates/index) لمزيد من التفاصيل.

SQL Server

```
|--Nested Loops(Inner Join)
   |--Index Seek(OBJECT:emp_test,
   |               SEEK:       (date_of_birth, subsidiary_id)
   |                        >= ('1971-01-01', 27)
   |                    AND    (date_of_birth, subsidiary_id)
   |                        <= ('1971-01-10', 27),
   |              WHERE:subsidiary_id=27
   |            ORDERED FORWARD)
   |--RID Lookup(OBJECT:employees,
                   SEEK:Bmk1000=Bmk1000
                 LOOKUP ORDERED FORWARD)
```

يعرض SQL Server 2012 مُسندات البحث (=مُسندات الوصول) باستخدام [صيغة قيم الصف](/book/use-the-index-luke/sql-partial-results-fetch-next-page/index#sb-row-values).

تعطي *معلومات المُسندات* الخاصة بـ`INDEX RANGE SCAN` التلميح الحاسم. فهي تحدّد شروط عبارة `where` إما كـ*مُسندات وصول* أو كـ*مُسندات ترشيح*. وهكذا تخبرنا قاعدة البيانات كيف تستخدم كل شرط.

#### ملاحظة

بُسّطت خطة التنفيذ للوضوح. ويشرح [الملحق](/book/use-the-index-luke/sql-explain-plan-oracle-filter-predicates/index) تفاصيل قسم «معلومات المُسندات» في خطة تنفيذ Oracle.

الشروط على العمود `DATE_OF_BIRTH` هي الوحيدة المدرجة كمُسندات وصول؛ وهي تحدّ نطاق الفهرس الممسوح. لذا فـ`DATE_OF_BIRTH` هو العمود الأول في فهرس `EMP_TEST`. أما العمود `SUBSIDIARY_ID` فيُستخدم كمُسند ترشيح فقط.

#### مهم

*مُسندات الوصول* هي شرطا البداية والتوقف للبحث بالفهرس. وهي تحدّد نطاق الفهرس الممسوح.

أما *مُسندات ترشيح الفهرس* فتُطبَّق أثناء [تتبّع عقد الأوراق](/book/use-the-index-luke/sql-anatomy-the-leaf-nodes/index) فقط. وهي لا تضيّق نطاق الفهرس الممسوح.

ويشرح الملحق كيفية التعرّف على مُسندات الوصول في [MySQL](/book/use-the-index-luke/sql-explain-plan-mysql-access-filter-predicates/index) و[SQL Server](/book/use-the-index-luke/sql-explain-plan-sql-server-filter-predicates/index) و[PostgreSQL](/book/use-the-index-luke/sql-explain-plan-postgresql-filter-predicates/index).

يمكن لقاعدة البيانات استخدام جميع الشروط كمُسندات وصول إذا عكسنا تعريف الفهرس:

Db2 (LUW)

```
-----------------------------------------------------
ID | Operation          |                 Rows | Cost
 1 | RETURN             |                      |   13
 2 |  FETCH EMPLOYEES   |     3 of 3 (100.00%) |   13
 3 |   IXSCAN EMP_TEST2 | 3 of 10000 (   .03%) |    6

Predicate Information
 3 - START (Q1.SUBSIDIARY_ID = ?)
     START ( TO_DATE(?, 'YYYY-MM-DD') <= Q1.DATE_OF_BIRTH)
      STOP (Q1.SUBSIDIARY_ID = ?)
      STOP (Q1.DATE_OF_BIRTH <= TO_DATE(?, 'YYYY-MM-DD'))
```

Oracle

```
---------------------------------------------------------------
| Id | Operation                    | Name      | Rows | Cost |
---------------------------------------------------------------
|  0 | SELECT STATEMENT             |           |    1 |    3 |
|* 1 |  FILTER                      |           |      |      |
|  2 |   TABLE ACCESS BY INDEX ROWID| EMPLOYEES |    1 |    3 |
|* 3 |    INDEX RANGE SCAN          | EMP_TEST2 |    1 |    2 |
---------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
1 - filter(:END_DT >= :START_DT)
3 - access(SUBSIDIARY_ID  = :SUBS_ID
       AND DATE_OF_BIRTH >= :START_DT
       AND DATE_OF_BIRTH <= :END_T)
```

PostgreSQL

```
                            QUERY PLAN
-------------------------------------------------------------------
Index Scan using emp_test on employees
   (cost=0.01..8.29 rows=1 width=17)
   Index Cond: (subsidiary_id = 27::numeric)
           AND (date_of_birth >= to_date('1971-01-01', 'YYYY-MM-DD'))
           AND (date_of_birth <= to_date('1971-01-10', 'YYYY-MM-DD'))
```

لا تشير قاعدة بيانات PostgreSQL إلى مُسندات وصول الفهرس ومُسندات الترشيح في خطة التنفيذ. غير أن قسم `Index Cond` يسرد الأعمدة بترتيب تعريف الفهرس. وفي هذه الحالة نرى مُسند `SUBSIDIARY_ID` أولاً، ثم المُسندين على `DATE_OF_BIRTH`. وبما أنه لا يوجد عمود آخر مرشَّح بعد شرط النطاق على `DATE_OF_BIRTH`، نعلم أن جميع المُسندات يمكن استخدامها كمُسندات وصول. انظر [*التمييز بين مُسندات الوصول والترشيح*](/book/use-the-index-luke/sql-explain-plan-postgresql-filter-predicates/index) لمزيد من التفاصيل.

SQL Server

```
|--Nested Loops(Inner Join)
   |--Index Seek(OBJECT:emp_test,
   |               SEEK: subsidiary_id=27
   |                 AND date_of_birth >= '1971-01-01'
   |                 AND date_of_birth <= '1971-01-10'
   |            ORDERED FORWARD)
   |--RID Lookup(OBJECT:employees),
                   SEEK:Bmk1000=Bmk1000
                 LOOKUP ORDERED FORWARD)
```

أخيراً، هناك معامل `between`. فهو يتيح لك تحديد الحدين الأعلى والأدنى في شرط واحد:

```
DATE_OF_BIRTH BETWEEN '01-JAN-71'
                  AND '10-JAN-71'
```

لاحظ أن `between` يضم القيم المحدَّدة دائماً، تماماً كاستخدام معاملي أصغر من أو يساوي (`<=`):

```
    DATE_OF_BIRTH >= '01-JAN-71' 
AND DATE_OF_BIRTH <= '10-JAN-71'
```
