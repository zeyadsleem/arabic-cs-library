---
title: "Getting an Execution Plan"
lang: en
---

Viewing an execution plan, including actual measurements, in the Oracle database involves three steps:

1. Activation of the measurements (optional)
2. Executing the SQL statement
3. Fetching the execution plan

## Activation of the Measurements

To get all run-time statistics, such as the time for each operation, the collecting of these values must be activated first. This can be done in the respective statement by adding the hint `/*+ GATHER_PLAN_STATISTICS */` or once in the session so that it affects all following executions.

```sql
alter session set statistics_level = 'ALL'
```

## Executing the SQL Statement

Running the statement causes the execution plan to be cached (SQL area). If you activated the collection of run-time statistics, they will be added there as well.

```sql
select * from dual
```

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=ap-plan-ora-get&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

## Fetching the Execution Plan

The package `DBMS_XPLAN` can show execution plans from the SQL area. The following example shows how to display the last execution plan that was executed in the current database session:

```sql
select * from table(dbms_xplan.display_cursor(null, null,
                                  'LAST ALLSTATS +COST'))
```

The query will display the execution plan as shown in the book:

```
---------------------------------------------------------------
| Operation         | Name | E-Rows | Cost | A-Rows | A-Time |.
---------------------------------------------------------------
| SELECT STATEMENT  |      |        |    2 |      1 |  00.01 |.
|  TABLE ACCESS FULL| DUAL |      1 |    2 |      1 |  00.01 |.
---------------------------------------------------------------
```

The execution plans shown here were edited for brevity.
