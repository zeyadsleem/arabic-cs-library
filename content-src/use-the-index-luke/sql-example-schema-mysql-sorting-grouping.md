---
title: "MySQL Example Scripts for “Sorting and Grouping”"
lang: en
---

This section contains the code and execution plans for [Chapter 6*Sorting and Grouping*](/sql/sorting-grouping) in a MySQL database.

## Indexed Order By

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

There is no “Extra: Using filesort”:

```
+-------------+------+-------------+------+-------------+
| select_type | type | key         | rows | Extra       |
+-------------+------+-------------+------+-------------+
| SIMPLE      | ref  | sales_dt_pr |    1 | Using where |
+-------------+------+-------------+------+-------------+
```

The same execution plan is used when sorting for `PRODUCT_ID` only:

```
EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date = CURDATE() - INTERVAL 1 DAY
  ORDER BY product_id;
```

Using greater or equals requires an explicit sort:

```
EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date >= CURDATE() - INTERVAL 1 DAY
  ORDER BY product_id;
```

Execution plan re-formatted for a better fit on the page:

```
+-------------+------+-------------+------+----------------+
| select_type | type | key         | rows | Extra          |
+-------------+------+-------------+------+----------------+
| SIMPLE      | ref  | sales_dt_pr |  117 | Using where;   |
|             |      |             |      | Using filesort |
+-------------+------+-------------+------+----------------+
```

## Order By ASC/DESC and NULLS FIRST/LAST

MySQL uses the index backwards, but doesn’t mention it in the execution plan:

```
EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date >= CURDATE() - INTERVAL 1 DAY
  ORDER BY sale_date DESC, product_id DESC;
```

Mixing `ASC` and `DESC` requires explicit sorting:

```
EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date >= CURDATE() - INTERVAL 1 DAY
  ORDER BY sale_date ASC, product_id DESC;
```

MySQL Accepts `ASC` and `DESC` specification in the index definition, but ignores it.

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

To proof that, it is still avoiding the sort when both columns are sorted ascending.

```
EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date >= CURDATE() - INTERVAL 1 DAY
  ORDER BY sale_date ASC, product_id ASC;
```

## Indexing Group By

An indexed `group by` show now sort operation in the execution plan:

```
EXPLAIN
 SELECT product_id, sum(eur_value)
   FROM sales
  WHERE sale_date = CURDATE() - INTERVAL 1 DAY
  GROUP BY product_id;
```

A regular `group by` is executed with the sort/group algorithm, because MySQL does not implement Hash-Group as of release 5.6.

```
EXPLAIN
 SELECT product_id, sum(eur_value)
   FROM sales
  WHERE sale_date >= CURDATE() - INTERVAL 1 DAY
  GROUP BY product_id;
```
