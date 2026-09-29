---
title: "Oracle Example Scripts for “Sorting and Grouping”"
lang: en
---

This section contains the `create`, `insert` and PL/SQL code to run the examples from [Chapter 6*Sorting and Grouping*](/sql/sorting-grouping) in an Oracle 11gR2 database.

## Indexed Order By

```sql
SELECT sale_date, product_id, quantity
  FROM sales
 WHERE sale_date >= TRUNC(sysdate) - INTERVAL '1' DAY
 ORDER BY product_id
```

Gathering new statistics is good practice after changing indexes:

```javascript
BEGIN
     DBMS_STATS.GATHER_TABLE_STATS(null, 'SALES', 
     METHOD_OPT=>'for all indexed columns', CASCADE => true);
END;
/
```

## Indexed Group By

There is one particular problem in the Oracle database (at least 11g-19c) that appears when ordering the grouped result in reverse index order:

```sql
SELECT product_id, sum(eur_value)
  FROM sales
 WHERE sale_date = TRUNC(sysdate) - INTERVAL '1' DAY
 GROUP BY product_id
 ORDER BY product_id DESC;
```

Although it can use the index when ordering in index order:

```sql
SELECT product_id, sum(eur_value)
  FROM sales
 WHERE sale_date = TRUNC(sysdate) - INTERVAL '1' DAY
 GROUP BY product_id
 ORDER BY product_id ASC;
```

There is no known workaround for this problem.
