---
title: "سكربتات أمثلة MySQL لـ«الترتيب والتجميع»"
lang: ar
source: https://use-the-index-luke.com/sql/example-schema/mysql/sorting-grouping
---

يحتوي هذا القسم على الشيفرة وخطط التنفيذ الخاصة بـ[الفصل 6*الترتيب والتجميع*](/book/use-the-index-luke/sql-sorting-grouping/index) في قاعدة بيانات MySQL.

## `order by` المفهرس

```sql
ALTER TABLE sales
 DROP INDEX sales_date;

ALTER TABLE sales
  ADD INDEX sales_dt_pr (sale_date, product_id);

EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date = CURDATE() - INTERVAL 1 DAY
  ORDER BY sale_date, product_id;
```

لا توجد عبارة «Extra: Using filesort»:

```
+-------------+------+-------------+------+-------------+
| select_type | type | key         | rows | Extra       |
+-------------+------+-------------+------+-------------+
| SIMPLE      | ref  | sales_dt_pr |    1 | Using where |
+-------------+------+-------------+------+-------------+
```

وتُستخدم خطة التنفيذ نفسها عند الترتيب حسب `PRODUCT_ID` وحده:

```
EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date = CURDATE() - INTERVAL 1 DAY
  ORDER BY product_id;
```

ويستلزم استخدام «أكبر من أو يساوي» فرزاً صريحاً:

```
EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date >= CURDATE() - INTERVAL 1 DAY
  ORDER BY product_id;
```

أُعيد تنسيق خطة التنفيذ لتلائم الصفحة على نحو أفضل:

```
+-------------+------+-------------+------+----------------+
| select_type | type | key         | rows | Extra          |
+-------------+------+-------------+------+----------------+
| SIMPLE      | ref  | sales_dt_pr |  117 | Using where;   |
|             |      |             |      | Using filesort |
+-------------+------+-------------+------+----------------+
```

## Order By ASC/DESC وNULLS FIRST/LAST

يستخدم MySQL الفهرس بالاتجاه المعاكس، لكنه لا يذكر ذلك في خطة التنفيذ:

```
EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date >= CURDATE() - INTERVAL 1 DAY
  ORDER BY sale_date DESC, product_id DESC;
```

ويتطلب خلط `ASC` و`DESC` فرزاً صريحاً:

```
EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date >= CURDATE() - INTERVAL 1 DAY
  ORDER BY sale_date ASC, product_id DESC;
```

يقبل MySQL تحديد `ASC` و`DESC` في تعريف الفهرس، لكنه يتجاهله.

```sql
ALTER TABLE sales
 DROP INDEX sales_dt_pr;

ALTER TABLE sales
  ADD INDEX sales_dt_pr (sale_date ASC, product_id DESC);

EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date >= CURDATE() - INTERVAL 1 DAY
  ORDER BY sale_date ASC, product_id DESC;
```

ولإثبات ذلك، لا يزال يتجنّب الفرز عندما يكون العمودان مرتَّبين تصاعدياً.

```
EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date >= CURDATE() - INTERVAL 1 DAY
  ORDER BY sale_date ASC, product_id ASC;
```

## فهرسة `group by`

لا تُظهر `group by` المفهرسة أي عملية فرز في خطة التنفيذ:

```
EXPLAIN
 SELECT product_id, sum(eur_value)
   FROM sales
  WHERE sale_date = CURDATE() - INTERVAL 1 DAY
  GROUP BY product_id;
```

وتُنفَّذ `group by` العادية بخوارزمية الفرز/التجميع، لأن MySQL لا تطبّق التجميع بالتجزئة (Hash-Group) حتى الإصدار 5.6.

```
EXPLAIN
 SELECT product_id, sum(eur_value)
   FROM sales
  WHERE sale_date >= CURDATE() - INTERVAL 1 DAY
  GROUP BY product_id;
```
