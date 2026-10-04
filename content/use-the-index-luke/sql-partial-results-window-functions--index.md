---
title: "استخدام دوال النوافذ لترقيم فعّال"
lang: ar
source: https://use-the-index-luke.com/sql/partial-results/window-functions
---

تقدّم دوال النوافذ طريقة أخرى لتنفيذ الترقيم (pagination) في SQL، وهي طريقة مرنة ومتوافقة مع المعيار قبل كل شيء. غير أن SQL Server وقاعدة بيانات Oracle وPostgreSQL 15+ فقط تستطيع استخدامها في استعلام Top-N متدفق، بينما لا توقف MySQL وMariaDB[^0] وDb2 (LUW) مسح الفهرس بعد جلب صفوف كافية، ومن ثمّ تنفّذ هذه الاستعلامات بكفاءة شديدة الانخفاض.

يستخدم المثال التالي دالة النافذة `ROW_NUMBER` في استعلام ترقيم:

```sql
SELECT *
  FROM ( SELECT sales.*
              , ROW_NUMBER() OVER (ORDER BY sale_date DESC
                                          , sale_id   DESC) rn
           FROM sales
       ) tmp
 WHERE rn between 11 and 20
 ORDER BY sale_date DESC, sale_id DESC
```

تعدّد دالة `ROW_NUMBER` الصفوف وفق ترتيب الفرز المحدد في جملة `over`. وتستخدم جملة `where` الخارجية هذا الترقيم لقصر النتيجة على الصفحة الثانية (الصفوف 11 إلى 20).

#### إن أعجبك هذا الموضوع، قد يعجبك أيضاً…

… أن [تشترك في **القوائم البريدية**](https://winand.at/lists)، و[تحصل على **ملصقات مجانية**](https://use-the-index-luke.com/shop)، و[تشتري **كتابي**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-window-functions&utm_medium=web)، أو [تنضم إلى **دورة تدريبية**](https://winand.at/sql-training/open-online-class).

تتعرف قاعدة بيانات Oracle على شرط الإيقاف وتستخدم الفهرس على `SALE_DATE` و`SALE_ID` لإنتاج سلوك Top-N متدفق:

Db2 (LUW)

```
Explain Plan
-------------------------------------------------------------
ID | Operation                   |               Rows |  Cost
 1 | RETURN                      |                    | 65658
 2 |  FILTER                     |  100933 of 1009326 | 65658
 3 |   FETCH SALES               | 1009326 of 1009326 | 65295
 4 |    IXSCAN (REVERSE) SL_DTID | 1009326 of 1009326 |  5679

Predicate Information
 2 - RESID (11 <= Q3.$C8)
     RESID (Q3.$C8 <= 20)
```

لاحظ أن Db2 (LUW) 10.5 لا تنفّذ هذا الاستعلام كاستعلام top-n؛ فهي وإن كانت تمنع عملية الفرز، فإنها ما زالت تقرأ الفهرس بأكمله — إذ لا توقف التنفيذ بعد جلب 20 صفاً.

للحصول على إيقاف top-n سليم بعد قراءة 20 صفاً، يجب تغليف الاستعلام مرتين: تطبيق شرط الإيقاف top-n أولاً ثم ترشيح أول 10 صفوف:

```sql
SELECT *
  FROM (SELECT *
          FROM (SELECT sales.*
                     , ROW_NUMBER() OVER (ORDER BY sale_date DESC
                                                 , sale_id   DESC) rn
                 FROM sales
               ) tmp
         WHERE rn <= 20
       ) tmp2
 WHERE rn > 10
 ORDER BY sale_date DESC, sale_id DESC;
```

```
Explain Plan
-----------------------------------------------------------------
ID | Operation                       |               Rows |  Cost
 1 | RETURN                          |                    |    21
 2 |  FILTER                         |            7 of 20 |    21
 3 |   FETCH SALES                   |      20 of 1009326 | 65352
 4 |    IXSCAN (REVERSE) SALES_DT_ID | 1009326 of 1009326 |  5736

Predicate Information
 2 - RESID (10 < Q3.$C8)
```

لاحظ أن المرشّح `rn <= 20` لا يظهر في قسم Predicate Information، لكن تقدير عدد الصفوف يعكسه.

Oracle

```
---------------------------------------------------------------
|Id | Operation                      | Name    | Rows |  Cost |
---------------------------------------------------------------
| 0 | SELECT STATEMENT               |         | 1004K| 36877 |
|*1 |  VIEW                          |         | 1004K| 36877 |
|*2 |   WINDOW NOSORT STOPKEY        |         | 1004K| 36877 |
| 3 |    TABLE ACCESS BY INDEX ROWID | SALES   | 1004K| 36877 |
| 4 |     INDEX FULL SCAN DESCENDING | SL_DTID | 1004K|  2955 |
---------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
1 - filter("RN">=11 AND "RN"<=20)
2 - filter(ROW_NUMBER() OVER (
           ORDER BY "SALE_DATE" DESC, "SALE_ID" DESC )<=20)
```

PostgreSQL

منذ الإصدار 15، تعرض خطة التنفيذ «Run Condition» التي قد توقف التنفيذ اللاحق.

```
                     QUERY PLAN
-------------------------------------------------------
 Subquery Scan on tmp
    (cost=0.42..141724.98 rows=334751 width=249)
    (actual time=0.040..0.052 rows=10 loops=1)
 Filter: (tmp.rn >= 11)
 Rows Removed by Filter: 10
 Buffers: shared hit=5
 -> WindowAgg
       (cost=0.42..129171.80 rows=1004254 width=249)
       (actual time=0.028..0.049 rows=20 loops=1)
    Run Condition: (row_number() OVER (?) <= 20)
    Buffers: shared hit=5
    -> Index Scan Backward using sl_dtid on sales
           (cost=0.42..111597.36 rows=1004254 width=241)
           (actual time=0.018..0.025 rows=22 loops=1)
       Buffers: shared hit=5
```

تشير عملية `WINDOW NOSORT STOPKEY` إلى عدم وجود عملية فرز (`NOSORT`)، وإلى أن قاعدة البيانات توقف التنفيذ عند بلوغ الحد الأعلى (`STOPKEY`). وبالنظر إلى أن العمليات الموقوفة تُنفَّذ على نحو متدفق، فهذا يعني أن هذا الاستعلام بالقدر نفسه من الكفاءة الذي تتمتع به طريقة الإزاحة المشروحة في [القسم السابق](/book/use-the-index-luke/sql-partial-results-fetch-next-page/index).

دعم هذا التحسين ليس شائعاً بأي حال بين منتجات SQL.

1. aفقط مع `row_number()`
2. bليس مع جملة `partition by` (انظر [أدناه](#partition-by))

ومع أن هذا التحسين قد يعمل نظرياً مع أي دالة رتيبة، فهناك تركيز واضح على دالة `ROW_NUMBER` بين التطبيقات التي حللناها.

1. aفقط مع جملة `where`: `OVER(ORDER BY…)` + `WHERE x=?`

يجب توخي الحذر عند استخدام `partition by`: فحتى لو قصرت جملة `where` الصفوف على قسم واحد، فإن مجرد وجود `partition by` يعطّل هذا التحسين في بعض المنتجات. وقد يحدث ذلك إذا كانت دالة النافذة المقسمة جزءاً من عرض (view) بينما تقصر الاستعلامات الخارجية العرض على قسم واحد.

1. aليست جميع الدوال التي تعمل في وجود جملة `where`

غير أن قوة دوال النوافذ ليست في الترقيم، بل في الحسابات التحليلية. وإذا لم تكن قد استخدمت دوال النوافذ من قبل، فأنت بحاجة بالتأكيد إلى قضاء بضع ساعات في دراسة الوثائق المعنية.

#### روابط

Oracle: [الدوال التحليلية في الإصدار 19](https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Analytic-Functions.html)

PostgreSQL: [دوال النوافذ](https://www.postgresql.org/docs/current/tutorial-window.html)

SQL Server: [جملة OVER في SQL Server](https://learn.microsoft.com/en-us/sql/t-sql/queries/select-over-clause-transact-sql?view=sql-server-ver16)

[^0]: MySQL supports window functions since version 8.0, MariaDB since 10.2.
