---
title: "PostgreSQL Example Scripts for “Sorting and Grouping”"
lang: en
---

This section contains the code and execution plans for [Chapter 6*Sorting and Grouping*](/sql/sorting-grouping) in a PostgreSQL database.

## Indexed Order By

```sql
  DROP INDEX sales_date;
CREATE INDEX sales_dt_pr ON sales (sale_date, product_id);

EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date = now() - INTERVAL '1' DAY
  ORDER BY sale_date, product_id;
```

The execution does not perform a sort operation:

```
                         QUERY PLAN
-----------------------------------------------------------
Index Scan using sales_dt_pr (cost=0.01..680.86 rows=376)
  Index Cond: (sale_date = (now() - '1 day'::interval day))
```

PostgreSQL uses the same execution plan, when sorting by `PRODUCT_ID` only.

```
EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date = now() - INTERVAL '1' DAY
  ORDER BY product_id;
```

Using an greater or equals condition requires an Sort operation:

```
EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date >= now() - INTERVAL '1' DAY
  ORDER BY product_id;
```

Although the row estimate got lower, causing the cost also to be lower:

```
                         QUERY PLAN
--------------------------------------------------------------
Sort  (cost=8.50..8.50 rows=1 width=32)
 Sort Key: product_id
 -> Index Scan using sales_dt_pr (cost=0.00..8.49 rows=1)
    Index Cond: (sale_date >= (now() - '1 day'::interval day))
```

## Indexing ASC, DESC and NULLS FIRST/LAST

Scanning an index backwards:

```
EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date >= now() - INTERVAL '1' DAY
  ORDER BY sale_date DESC, product_id DESC;
```

Mixing `ASC` and `DESC` causes an explicit sort:

```
EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date >= now() - INTERVAL '1' DAY
  ORDER BY sale_date ASC, product_id DESC;
```

Ordering the index with mixed `ASC`/`DESC` modifiers:

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

PostgreSQL orders `NULLS LAST` per default. However, the `DESC` modifier puts them to the front, so that `DESC NULLS LAST` must sort explicitly:

```
EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date >= now() - INTERVAL '1' DAY
  ORDER BY sale_date ASC, product_id DESC NULLS LAST;
```

PostgreSQL allows explicit `NULLS LAST` indexing as well, so it becomes a pipelined `order by` again:

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

## Indexed Group By

The PostgreSQL (at least 9.0-13) database seems to have a little glitch, that makes the following not work as pipelined `order by`, when the index has `NULLS LAST`, as created above:

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

Removing the `NULLS LAST` clause from the index reveals something interesting:

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

The index is read backwards, although the SQL statement does not require it. It seems like PostgreSQL uses an `GROUP BY PRODUCT_ID` internally, to fetch the pre-sorted result. The next case adds an `order by` clause in opposite order.

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

So, it seems that the implicit `order by` is not hardcoded. Our next test show that PostgreSQL can actually use such an index, but only if an explicit `order by` clause asks for the same order:

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

It does a pipelined `group by`, even when the index is defined `NULLS LAST` when the order by clause explicitly sorts the same way. Otherwise, it uses an internal order by clause that disregards the indexes `NULLS` specification.

Further testing shows that the problem exists for `ASC` indexes with `NULLS FIRST`:

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

But skipping `order b`y clause:

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
