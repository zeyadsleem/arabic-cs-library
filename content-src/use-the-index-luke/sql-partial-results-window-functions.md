---
title: "Using Window Functions for Efficient Pagination"
lang: en
---

Window functions offer yet another way to implement pagination in SQL. This is a flexible, and above all, standards-compliant method. However, only SQL Server, the Oracle database and PostgreSQL 15+ can use them for a pipelined top-N query. MySQL, MariaDB[0](#footnote-0)and Db2 (LUW) do not abort the index scan after fetching enough rows and therefore execute these queries very inefficiently.

The following example uses the window function `ROW_NUMBER` for a pagination query:

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

The `ROW_NUMBER` function enumerates the rows according to the sort order defined in the `over` clause. The outer `where` clause uses this enumeration to limit the result to the second page (rows 11 through 20).

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-window-functions&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

The Oracle database recognizes the abort condition and uses the index on `SALE_DATE` and `SALE_ID` to produce a pipelined top-N behavior:

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

Please note that Db2 (LUW) 10.5 does not execute this query as top-n query. Although it prevents the sort operation it still reads through the entire index—it does not abort execution after fetching 20 rows.

To get a proper top-n abort after reading 20 rows, you must double-wrap the query to first apply the top-n abort condition and then filtering away the first 10 rows:

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

Note that the filter `rn <= 20` does not appear in the Predicate Information section, yet the row count estimate reflects it.

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

Since version 15 the execution plan shows the “Run Condition”, which may abort the downstream execution.

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

The `WINDOW NOSORT STOPKEY` operation indicates that there is no sort operation (`NOSORT`) and that the database aborts the execution when reaching the upper threshold (`STOPKEY`). Considering that the aborted operations are executed in a pipelined manner, it means that this query is as efficient as the offset method explained in the [previous section](/sql/partial-results/fetch-next-page).

Support of this optimization is by no means common among SQL products.

1. aOnly with `row_number()`
2. bNot with `partition by` clause (see [below](#partition-by))

While this optimization could conceptually work with any monotonic function, there is a clear focus on the `ROW_NUMBER` function among the analyzed implementations.

1. aOnly with `where` clause: `OVER(ORDER BY…)` + `WHERE x=?`

Caution needs to be taken when using `partition by`: Even if the `where` clause limits the rows to a single partition, the pure presence of `partition by` disables this optimization in some products. This might happen if the partitioned window function is part of a view, but the outer query limits the view to a single partition.

1. aNot all functions that work in presence of a `where` clause

The strength of window functions is not pagination, however, but analytical calculations. If you have never used window functions before, you should definitely spend a few hours studying the respective documentation.

#### Links

Oracle: [Analytic Functions in 19](https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/Analytic-Functions.html)

PostgreSQL: [Window Functions](https://www.postgresql.org/docs/current/tutorial-window.html)

SQL Server: [OVER Clause in SQL Server](https://learn.microsoft.com/en-us/sql/t-sql/queries/select-over-clause-transact-sql?view=sql-server-ver16)
