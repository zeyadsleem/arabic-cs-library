---
title: "سكربتات أمثلة PostgreSQL لـ«الترتيب والتجميع»"
lang: ar
source: https://use-the-index-luke.com/sql/example-schema/postgresql/sorting-grouping
---

يحتوي هذا القسم على الشيفرة وخطط التنفيذ الخاصة بـ[الفصل 6*الترتيب والتجميع*](/book/use-the-index-luke/sql-sorting-grouping/index) في قاعدة بيانات PostgreSQL.

## `order by` المفهرس

```sql
  DROP INDEX sales_date;
CREATE INDEX sales_dt_pr ON sales (sale_date, product_id);

EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date = now() - INTERVAL '1' DAY
  ORDER BY sale_date, product_id;
```

لا ينفّذ التنفيذ عملية فرز:

```
                         QUERY PLAN
-----------------------------------------------------------
Index Scan using sales_dt_pr (cost=0.01..680.86 rows=376)
  Index Cond: (sale_date = (now() - '1 day'::interval day))
```

ويستخدم PostgreSQL خطة التنفيذ نفسها عند الترتيب حسب `PRODUCT_ID` وحده.

```
EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date = now() - INTERVAL '1' DAY
  ORDER BY product_id;
```

ويستلزم استخدام شرط «أكبر من أو يساوي» عملية `Sort`:

```
EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date >= now() - INTERVAL '1' DAY
  ORDER BY product_id;
```

مع أن تقدير عدد الصفوف انخفض، ما جعل التكلفة أقل أيضاً:

```
                         QUERY PLAN
--------------------------------------------------------------
Sort  (cost=8.50..8.50 rows=1 width=32)
 Sort Key: product_id
 -> Index Scan using sales_dt_pr (cost=0.00..8.49 rows=1)
    Index Cond: (sale_date >= (now() - '1 day'::interval day))
```

## فهرسة ASC وDESC وNULLS FIRST/LAST

مسح الفهرس بالاتجاه المعاكس:

```
EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date >= now() - INTERVAL '1' DAY
  ORDER BY sale_date DESC, product_id DESC;
```

ويسبّب خلط `ASC` و`DESC` فرزاً صريحاً:

```
EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date >= now() - INTERVAL '1' DAY
  ORDER BY sale_date ASC, product_id DESC;
```

ترتيب الفهرس بمُعدِّلات `ASC`/`DESC` مختلطة:

```sql
  DROP INDEX sales_dt_pr;

CREATE INDEX sales_dt_pr
    ON sales (sale_date ASC, product_id DESC);

EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date >= now() - INTERVAL '1' DAY
  ORDER BY sale_date ASC, product_id DESC;
```

يرتّب PostgreSQL بـ`NULLS LAST` افتراضياً. غير أن المُعدِّل `DESC` يضع القيم في المقدمة، لذا يجب أن يفرز `DESC NULLS LAST` فرزاً صريحاً:

```
EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date >= now() - INTERVAL '1' DAY
  ORDER BY sale_date ASC, product_id DESC NULLS LAST;
```

ويسمح PostgreSQL بالفهرسة الصريحة بـ`NULLS LAST` أيضاً، فيصبح الأمر `order by` متدفقاً مرة أخرى:

```sql
  DROP INDEX sales_dt_pr;

CREATE INDEX sales_dt_pr
    ON sales (sale_date ASC, product_id DESC NULLS LAST);

EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date >= now() - INTERVAL '1' DAY
  ORDER BY sale_date ASC, product_id DESC NULLS LAST;
```

## `group by` المفهرس

يبدو أن قاعدة بيانات PostgreSQL (من 9.0 إلى 13 على الأقل) فيها خلل صغير يجعل ما يلي لا يعمل كـ`order by` متدفق عندما يكون الفهرس بـ`NULLS LAST` كما أُنشئ أعلاه:

```
EXPLAIN
 SELECT product_id, SUM(eur_value)
   FROM sales
  WHERE sale_date = now() - INTERVAL '1' DAY
  GROUP BY product_id;
```

```
                                     QUERY PLAN
------------------------------------------------------------------------------------
 HashAggregate  (cost=574.21..574.53 rows=26 width=40)
   Group Key: product_id
   ->  Index Scan using sales_dt_pr on sales  (cost=0.43..572.62 rows=318 width=14)
         Index Cond: (sale_date = (now() - '1 day'::interval day))
```

ويكشف حذف جملة `NULLS LAST` من الفهرس أمراً مثيراً للاهتمام:

```sql
  DROP INDEX sales_dt_pr;

CREATE INDEX sales_dt_pr
    ON sales (sale_date ASC, product_id DESC);

EXPLAIN
 SELECT product_id, SUM(eur_value)
   FROM sales
  WHERE sale_date = now() - INTERVAL '1' DAY
  GROUP BY product_id;
```

```
                                         QUERY PLAN
---------------------------------------------------------------------------------------------
 GroupAggregate  (cost=0.43..574.53 rows=26 width=40)
   Group Key: product_id
   ->  Index Scan Backward using sales_dt_pr on sales  (cost=0.43..572.62 rows=318 width=14)
         Index Cond: (sale_date = (now() - '1 day'::interval day))
```

يُقرأ الفهرس بالاتجاه المعاكس رغم أن عبارة SQL لا تتطلب ذلك. ويبدو أن PostgreSQL يستخدم `GROUP BY PRODUCT_ID` داخلياً لجلب النتيجة المرتَّبة مسبقاً. وتضيف الحالة التالية جملة `order by` بالترتيب المعاكس.

```
EXPLAIN
 SELECT product_id, SUM(eur_value)
   FROM sales
  WHERE sale_date = now() - INTERVAL '1' DAY
  GROUP BY product_id
  ORDER BY product_id DESC;
```

```
                                     QUERY PLAN
------------------------------------------------------------------------------------
 GroupAggregate  (cost=0.43..574.53 rows=26 width=40)
   Group Key: product_id
   ->  Index Scan using sales_dt_pr on sales  (cost=0.43..572.62 rows=318 width=14)
         Index Cond: (sale_date = (now() - '1 day'::interval day))
```

إذن، يبدو أن `order by` الضمنية غير مثبتة في الشيفرة. ويبيّن اختبارنا التالي أن PostgreSQL يستطيع فعلاً استخدام مثل هذا الفهرس، لكن فقط إذا طلبت جملة `order by` صريحة الترتيب نفسه:

```sql
  DROP INDEX sales_dt_pr;

CREATE INDEX sales_dt_pr
    ON sales (sale_date ASC, product_id DESC NULLS LAST);

EXPLAIN
 SELECT product_id, SUM(eur_value)
   FROM sales
  WHERE sale_date = now() - INTERVAL '1' DAY
  GROUP BY product_id
  ORDER BY product_id DESC NULLS LAST;
```

```
                                     QUERY PLAN
------------------------------------------------------------------------------------
 GroupAggregate  (cost=0.43..574.53 rows=26 width=40)
   Group Key: product_id
   ->  Index Scan using sales_dt_pr on sales  (cost=0.43..572.62 rows=318 width=14)
         Index Cond: (sale_date = (now() - '1 day'::interval day))
```

وهو ينفّذ `group by` متدفقة حتى عندما يكون الفهرس معرَّفاً بـ`NULLS LAST`، إذا كانت جملة `order by` ترتّب بالطريقة نفسها صراحةً. وإلا فإنه يستخدم جملة `order by` داخلية تتجاهل تحديد `NULLS` في الفهرس.

ويكشف اختبار إضافي أن المشكلة موجودة في فهارس `ASC` مع `NULLS FIRST`:

```sql
  DROP INDEX sales_dt_pr;

CREATE INDEX sales_dt_pr
    ON sales (sale_date ASC, product_id ASC NULLS FIRST);

EXPLAIN
 SELECT product_id, SUM(eur_value)
   FROM sales
  WHERE sale_date = now() - INTERVAL '1' DAY
  GROUP BY product_id
  ORDER BY product_id ASC NULLS FIRST;
```

```
                                     QUERY PLAN
------------------------------------------------------------------------------------
 GroupAggregate  (cost=0.43..574.53 rows=26 width=40)
   Group Key: product_id
   ->  Index Scan using sales_dt_pr on sales  (cost=0.43..572.62 rows=318 width=14)
         Index Cond: (sale_date = (now() - '1 day'::interval day))
```

لكن بحذف جملة `order by`:

```
EXPLAIN
 SELECT product_id, SUM(eur_value)
   FROM sales
  WHERE sale_date = now() - INTERVAL '1' DAY
  GROUP BY product_id;
```

```
                                     QUERY PLAN
------------------------------------------------------------------------------------
 HashAggregate  (cost=574.21..574.53 rows=26 width=40)
   Group Key: product_id
   ->  Index Scan using sales_dt_pr on sales  (cost=0.43..572.62 rows=318 width=14)
         Index Cond: (sale_date = (now() - '1 day'::interval day))
```
