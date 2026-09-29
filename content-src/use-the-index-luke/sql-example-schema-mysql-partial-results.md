---
title: "MySQL Example Scripts for “Partial Results”"
lang: en
---

This section contains the `create` and `insert` statements to run the examples from [Chapter 7*Partial Results*](/sql/partial-results) in a MySQL database.

## Querying Top-N Rows

An indexed Top-N query doesn’t show a “filesort” operation in the Extras column:

```sql
SELECT *
  FROM sales
 ORDER BY sale_date DESC
 LIMIT 10
```

```
+----+-------+-------+-------------+--------+-------+
| id | table | type  | key         | rows   | Extra |
+----+-------+-------+-------------+--------+-------+
|  1 | sales | index | sales_dt_pr | 836092 |       | 
+----+-------+-------+-------------+--------+-------+
```
