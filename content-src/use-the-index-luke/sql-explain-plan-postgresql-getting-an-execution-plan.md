---
title: "Getting an Execution Plan"
lang: en
---

A PostgreSQL execution plan is fetched by putting the `explain` command in front of an SQL statement. There is, however, one important limitation: SQL statements with [bind parameters](/sql/where-clause/bind-parameters) (e.g., `$1`, `$2, etc.)` cannot be explained this way—they need to be prepared first:

```
PREPARE stmt(int) AS SELECT $1
```

Note that PostgreSQL uses “`$n`” for bind parameters. Your database abstraction layer might hide this so you can use question marks as defined by the SQL standard.

The execution of the prepared statement can be explained:

```
EXPLAIN EXECUTE stmt(1)
```

Since PostgreSQL 9.2 the creation of the execution plan is postponed until execution and thus considers the actual values for the bind parameters. To obtain an execution plan that does not consider the actual values of the bind parameters, PostgreSQL 16 introduced [the `generic_plan` option of `explain`](https://www.postgresql.org/docs/current/sql-explain.html#id-1.9.3.148.8).

#### Note

Statements without bind parameters can be explained directly:

```
EXPLAIN SELECT 1
```

In this case, the optimizer has always considered the actual values during query planning.

The explain plan output is as follows:

```
                QUERY PLAN                
------------------------------------------
 Result  (cost=0.00..0.01 rows=1 width=0)
```

The output has similar information as the Oracle execution plans shown throughout the book: the operation name (“Result”), the related cost, the row count estimate, and the expected row width.

Note that PostgreSQL shows two cost values. The first is the cost for the startup, the second is the total cost for the execution if all rows are retrieved. The Oracle database’s execution plan only shows the second value.

The PostgreSQL `explain` command has many options of which `analyze`, `buffers` and `settings` are the most helpful ones.

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=ap-plan-pg-get&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

Enabling the `analyze` option means that the execution plan is not only created, but also executed. That implies that the side effects of running the statement being explained will take place. Such as deleting rows when explain a `delete` statement. You can enclose `explain` in a transaction and perform a rollback afterwards if you don’t want such side effects to persist.

#### Warning

`explain analyze` executes the explained statement, even if the statement is an `insert`, `update` or `delete`.

Running the statement allows collecting run time benchmarks like the time and the actual number of rows produced by each operation. The option `buffers` also counts the number of database blocks being accessed.

Finally, the `settings` option also shows settings that differ from their default.

```
BEGIN
```

```
EXPLAIN (ANALYZE, BUFFERS, SETTINGS)
EXECUTE stmt(1)
```

```
                   QUERY PLAN
--------------------------------------------------
 Result  (cost=0.00..0.01 rows=1 width=4)
         (actual time=0.001..0.002 rows=1 loops=1)
 Settings: random_page_cost = '1.1'
 Planning Time: 0.032 ms
 Execution Time: 0.078 ms
```

```
ROLLBACK
```

Note that the plan is formatted for a better fit on the page. PostgreSQL prints the “actual” values on the same line as the estimated values.

The row count is the only value that is shown in both parts—in the estimated and in the actual figures. That allows you to quickly find erroneous cardinality estimates.

Last but not least, prepared statements must be closed again:

```
DEALLOCATE stmt
```

#### Tip

[Bind-Variables](/sql/where-clause/bind-parameters)

[Avoid Smart Logic for Conditional `WHERE` clauses](/sql/where-clause/obfuscation/smart-logic)

Article “[Planning for Re-Use](/blog/2011-07-16/planning-for-reuse)“
