---
title: "فهرسة Group By"
lang: ar
source: https://use-the-index-luke.com/sql/sorting-grouping/indexed-group-by
---

تستخدم قواعد بيانات SQL خوارزميتين مختلفتين تماماً لـ`group by`. الأولى، وهي خوارزمية التجزئة، تجمّع سجلات المدخلات في جدول تجزئة مؤقت، وبعد معالجة جميع سجلات المدخلات يُعاد جدول التجزئة كنتيجة. أما الثانية، وهي خوارزمية الفرز/التجميع، فترتّب بيانات المدخلات أولاً بمفتاح التجميع بحيث تتبع صفوف كل مجموعة بعضها بعضاً مباشرةً، ثم تحتاج قاعدة البيانات بعد ذلك إلى تجميعها فقط. وعموماً تحتاج الخوارزميتان إلى تجسيد حالة وسيطة، فلا تُنفَّذان على نحو متدفق. ومع ذلك تستطيع خوارزمية الفرز/التجميع استخدام فهرس لتجنّب عملية الفرز، فيصبح `group by` متدفقاً بذلك.

#### ملاحظة

لا تستخدم MySQL 8.0 خوارزمية التجزئة. ومع ذلك فإن [تحسين خوارزمية الفرز/التجميع](https://dev.mysql.com/doc/refman/8.0/en/group-by-optimization.html) يعمل كما هو موصوف أدناه.

تأمّل الاستعلام التالي: فهو يعرض إيرادات الأمس مجموعةً حسب `PRODUCT_ID`:

```sql
SELECT product_id, sum(eur_value)
  FROM sales
 WHERE sale_date = TRUNC(sysdate) - INTERVAL '1' DAY
 GROUP BY product_id
```

وبمعرفة الفهرس على `SALE_DATE` و`PRODUCT_ID` من [القسم السابق](/book/use-the-index-luke/sql-sorting-grouping-order-by-asc-desc-nulls-last/index)، تكون خوارزمية الفرز/التجميع أنسب لأن `INDEX RANGE SCAN` يعيد الصفوف تلقائياً بالترتيب المطلوب. ويعني ذلك أن قاعدة البيانات تتجنّب التجسيد لأنها لا تحتاج إلى عملية فرز صريحة — فيُنفَّذ `group by` على نحو متدفق.

Db2 (LUW)

```
Explain Plan
------------------------------------------------------------
ID | Operation             |                     Rows | Cost
 1 | RETURN                |                          |  675
 2 |  GRPBY (COMPLETE)     |      25 of 387 (  6.46%) |  675
 3 |   FETCH SALES         |     387 of 387 (100.00%) |  675
 4 |    IXSCAN SALES_DT_PR | 387 of 1009326 (   .04%) |   24

Predicate Information
 4 - START (Q1.SALE_DATE = (CURRENT DATE - 1 DAYS))
      STOP (Q1.SALE_DATE = (CURRENT DATE - 1 DAYS))
```

Oracle

```
---------------------------------------------------------------
|Id |Operation                    | Name        | Rows | Cost |
---------------------------------------------------------------
| 0 |SELECT STATEMENT             |             |   17 |  192 |
| 1 | SORT GROUP BY NOSORT        |             |   17 |  192 |
| 2 |  TABLE ACCESS BY INDEX ROWID| SALES       |  321 |  192 |
|*3 |   INDEX RANGE SCAN          | SALES_DT_PR |  321 |    3 |
---------------------------------------------------------------
```

ووسمت خطة تنفيذ قاعدة بيانات Oracle عملية `SORT GROUP BY` المتدفقة بالإضافة `NOSORT`. أما خطط تنفيذ قواعد البيانات الأخرى فلا تذكر أي عملية فرز إطلاقاً.

#### إن أعجبك هذا الموضوع، قد يعجبك أيضاً…

… أن [تشترك في **القوائم البريدية**](https://winand.at/lists)، و[تحصل على **ملصقات مجانية**](https://use-the-index-luke.com/shop)، و[تشتري **كتابي**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-group&utm_medium=web)، أو [تنضم إلى **دورة تدريبية**](https://winand.at/sql-training/open-online-class).

وللـ`group by` المتدفق المتطلبات المسبقة نفسها التي لـ`order by` المتدفق، باستثناء عدم وجود مُعدِّلَي `ASC` و`DESC`. ويعني ذلك أن تعريف فهرس بمُعدِّلَي `ASC`/`DESC` لا ينبغي أن يؤثر في تنفيذ `group by` المتدفق. وينطبق الأمر نفسه على `NULLS FIRST`/`LAST`. ومع ذلك توجد قواعد بيانات لا تستطيع استخدام فهرس `ASC`/`DESC` استخداماً سليماً من أجل `group by` متدفق.

#### تحذير

لا ينفّذ PostgreSQL تلقائياً `group by` متدفقاً إذا كان الفهرس يعالج قيمة `NULL` كأصغر قيمة ممكنة. وإضافة جملة `order by` بترتيب الفهرس تتجاوز هذه المشكلة.

ولا تستطيع قاعدة بيانات Oracle قراءة فهرس بالاتجاه المعاكس لتنفيذ `group by` متدفق يتبعه `order by`.

وتتوفر مزيد من التفاصيل في الملحقين المعنيين: [PostgreSQL](/book/use-the-index-luke/sql-example-schema-postgresql-sorting-grouping/index#apc-pg-ord-group) و[Oracle](/book/use-the-index-luke/sql-example-schema-oracle-sorting-grouping/index#apc-ora-ord-group).

وإذا وسّعنا الاستعلام ليشمل جميع المبيعات *منذ الأمس*، كما فعلنا في مثال `order by` المتدفق، فسيُمنع `group by` المتدفق للسبب نفسه السابق: إذ لا يعيد `INDEX RANGE SCAN` الصفوف مرتَّبة بمفتاح التجميع (قارن [الشكل 6.1](/book/use-the-index-luke/sql-sorting-grouping-indexed-order-by/index#fig-order-concat)).

```sql
SELECT product_id, sum(eur_value)
  FROM sales
 WHERE sale_date >= TRUNC(sysdate) - INTERVAL '1' DAY
 GROUP BY product_id
```

Db2 (LUW)

```
Explain Plan
--------------------------------------------------------------------
ID | Operation                   |                      Rows |  Cost
 1 | RETURN                      |                           | 12527
 2 |  GRPBY (FINAL)              |        25 of 25 (100.00%) | 12527
 3 |   TBSCAN                    |        25 of 25 (100.00%) | 12527
 4 |    SORT (INTERMEDIATE)      |        25 of 25 (100.00%) | 12527
 5 |     GRPBY (HASHED PARTIAL)  |      25 of 8050 (   .31%) | 12527
 6 |      FETCH SALES            |    8050 of 8050 (100.00%) | 12526
 7 |       RIDSCN                |    8050 of 8050 (100.00%) |   375
 8 |        SORT (UNIQUE)        |    8050 of 8050 (100.00%) |   375
 9 |         IXSCAN SALES_DT_PR  | 8050 of 1009326 (   .80%) |   372
```

واستُخدم شرط `where` التالي للحصول على هذه النتيجة: `WHERE sale_date >= CURRENT_DATE - 1 MONTH`.

وبالمقارنة مع خطة تنفيذ Oracle، تبدو هذه معقدة أكثر من اللازم. ويرجع ذلك إلى أمرين:

- تُظهر Db2 صراحةً عملية فرز حسب موقع التخزين الفيزيائي بين الوصول إلى الفهرس والوصول إلى الجدول (العمليتان 7 و8).
- تنفّذ Db2 تجميعاً على مرحلتين: فهي تجري أولاً تجميعاً جزئياً لتقليل كمية البيانات المطلوب فرزها في أبكر وقت ممكن (العملية 5)، ثم تنفّذ `SORT` + `GRPBY` عاديين.

Oracle

```
---------------------------------------------------------------
|Id |Operation                    | Name        | Rows | Cost |
---------------------------------------------------------------
| 0 |SELECT STATEMENT             |             |   24 |  356 |
| 1 | HASH GROUP BY               |             |   24 |  356 |
| 2 |  TABLE ACCESS BY INDEX ROWID| SALES       |  596 |  355 |
|*3 |   INDEX RANGE SCAN          | SALES_DT_PR |  596 |    4 |
---------------------------------------------------------------
```

لكن قاعدة بيانات Oracle تستخدم خوارزمية التجزئة بدلاً من ذلك. وميزة خوارزمية التجزئة أنها تحتاج إلى تخزين *النتيجة المجمَّعة* مؤقتاً فقط، بينما تجسّد خوارزمية الفرز/التجميع *مجموعة المدخلات كاملة*. وبعبارة أخرى: تحتاج خوارزمية التجزئة ذاكرة أقل.

وكما في `order by` المتدفق، ليس التنفيذ السريع أهم جانب في تنفيذ `group by` المتدفق؛ فالأهم أن تنفّذه قاعدة البيانات على نحو متدفق وتسلّم النتيجة الأولى قبل قراءة المدخلات كلها. وهذا شرط مسبق لأساليب التحسين المتقدمة المشروحة في [الفصل التالي](/book/use-the-index-luke/sql-partial-results/index).

#### فكّر في الأمر

هل يمكنك التفكير في عملية قاعدة بيانات أخرى — غير الفرز والتجميع — قد تستخدم فهرساً لتجنّب الفرز؟
