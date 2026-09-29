---
title: "Querying Top-N Rows"
lang: en
---

Top-N queries are queries that limit the result to a specific number of rows. These are often queries for the most recent or the “best” entries of a result set. For efficient execution, the ranking must be done with a [pipelined `order by`.](/sql/sorting-grouping/indexed-order-by)

The simplest way to fetch only the first rows of a query is fetching the required rows and then closing the statement. Unfortunately, the optimizer cannot foresee that when preparing the execution plan. To select the best execution plan, the optimizer has to know if the application will ultimately fetch all rows. In that case, a full table scan with explicit sort operation might perform best, although a pipelined `order by` could be better when fetching only ten rows—even if the database has to fetch each row individually. That means that the optimizer has to know if you are going to abort the statement before fetching all rows so it can select the best execution plan.

#### Tip

Inform the database whenever you don’t need all rows.

The SQL standard excluded this requirement for a long time. The corresponding extension (`fetch first`) was finally introduced with SQL:2008 and is currently available in IBM Db2, PostgreSQL, SQL Server 2012 and Oracle 12c. On the one hand, this is because the feature is a non-core extension, and on the other hand it’s because each database has been offering its own proprietary solution for many years.

The following examples show the use of these well-known extensions by querying the ten most recent sales. The basis is always the same: fetching *all* sales, beginning with the most recent one. The respective top-N syntax just aborts the execution after fetching ten rows.

Db2 (LUW)Db2 supports the standard’s `fetch first` syntax since version 9 at least (LUW and zOS).

```sql
SELECT *
  FROM sales
 ORDER BY sale_date DESC
 FETCH FIRST 10 ROWS ONLY
```

The proprietary `limit` keyword is supported since Db2 (LUW) 9.7 (requires `db2set DB2_COMPATIBILITY_VECTOR=MYS`).

MySQL

MySQL and PostgreSQL use the `limit` clause to restrict the number of rows to be fetched.

```sql
SELECT *
  FROM sales
 ORDER BY sale_date DESC
 LIMIT 10
```

Oracle

The Oracle database introduced the `fetch first` extension with release 12c. With earlier releases you have to use the pseudo column `ROWNUM` that numbers the rows in the result set automatically. To use this column in a filter, we have to wrap the query:

```sql
SELECT *
  FROM (
       SELECT *
         FROM sales
        ORDER BY sale_date DESC
       )
 WHERE rownum <= 10
```

PostgreSQL

PostgreSQL supports the `fetch first` extension since version 8.4. The previously used `limit` clause still works as shown in the MySQL example.

```sql
SELECT *
  FROM sales
 ORDER BY sale_date DESC
 FETCH FIRST 10 ROWS ONLY
```

SQL Server

SQL Server provides the `top` clause to restrict the number of rows to be fetched.

```sql
SELECT TOP 10 *
  FROM sales
 ORDER BY sale_date DESC
```

[Starting with release 2012, SQL Server supports the `fetch first` extension as well.](https://learn.microsoft.com/en-us/previous-versions/sql/sql-server-2012/ms188385(v=sql.110))

All of the above shown SQL queries are special because the databases recognize them as top-N queries.

#### Important

The database can only optimize a query for a partial result if it knows this from the beginning.

If the optimizer is aware of the fact that we only need ten rows, it will prefer to use a pipelined `order by` if applicable:

Db2 (LUW)

```
Explain Plan
-----------------------------------------------------------------
ID | Operation                      |               Rows |   Cost
 1 | RETURN                         |                    |     24
 2 |  FETCH SALES                   |      10 of 1009326 | 458452
 3 |   IXSCAN (REVERSE) SALES_DT_PR | 1009326 of 1009326 |   2624

Predicate Information
```

The top-N behaviour is not directly visible in the Db2 execution plan unless there is a `SORT` operation required (then the [`last_explained` view](/sql/explain-plan/db2/getting-an-execution-plan#apa-db2-last_explained) indicates it in brackets: `SORT (TOP-N)`, see next example).

In this particular example, one might suspect that this must be a top-N query because of the sudden drop of the row count estimate that cannot explained by any filtering predicates (Predicate Information section is empty).

Oracle

```
-------------------------------------------------------------
| Operation                     | Name        | Rows | Cost |
-------------------------------------------------------------
| SELECT STATEMENT              |             |   10 |    9 |
|  COUNT STOPKEY                |             |      |      |
|   VIEW                        |             |   10 |    9 |
|    TABLE ACCESS BY INDEX ROWID| SALES       | 1004K|    9 |
|     INDEX FULL SCAN DESCENDING| SALES_DT_PR |   10 |    3 |
-------------------------------------------------------------
```

The Oracle execution plan indicates the planned termination with the `COUNT STOPKEY` operation. That means the database recognized the top-N syntax.

#### Tip

[Appendix A, “*Execution Plans*”](/sql/explain-plan), summarizes the corresponding operations for [Db2 (LUW)](/sql/explain-plan/db2/operations), [MySQL](/sql/explain-plan/mysql/operations), [Oracle](/sql/explain-plan/oracle/operations), [PostgreSQL](/sql/explain-plan/postgresql/operations) and [SQL Server](/sql/explain-plan/sql-server/operations).

#### Important

A pipelined top-N query doesn’t need to read and sort the entire result set.

If there is no suitable index on `SALE_DATE` for a pipelined `order by`, the database must read and sort the entire table. The first row is only delivered after reading the last row from the table.

Db2 (LUW)

```
Explain Plan
-----------------------------------------------------------
ID | Operation       |                         Rows |  Cost
 1 | RETURN          |                              | 59835
 2 |  TBSCAN         |           10 of 10 (100.00%) | 59835
 3 |   SORT (TOP-N)  |      10 of 1009326 (   .00%) | 59835
 4 |    TBSCAN SALES | 1009326 of 1009326 (100.00%) | 59739

Predicate Information
```

Oracle

```
--------------------------------------------------
| Operation               | Name  | Rows |  Cost |
--------------------------------------------------
| SELECT STATEMENT        |       |   10 | 59558 |
|  COUNT STOPKEY          |       |      |       |
|   VIEW                  |       | 1004K| 59558 |
|    SORT ORDER BY STOPKEY|       | 1004K| 59558 |
|     TABLE ACCESS FULL   | SALES | 1004K|  9246 |
--------------------------------------------------
```

This execution plan has no pipelined `order by` and is almost as slow as aborting the execution from the client side. Using the top-N syntax is still better because the database does not need to materialize the full result but only the ten most recent rows. This requires considerably less memory. The Oracle execution plan indicates this optimization with the `STOPKEY` modifier on the `SORT ORDER BY` operation.

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-top-n&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

The advantages of a pipelined top-N query include not only immediate performance gains but also improved scalability. Without using pipelined execution, the response time of this top-N query grows with the table size. The response time using a pipelined execution, however, only grows with the number of selected rows. In other words, the response time of a pipelined top-N query is always the same; this is almost independent of the table size. Only when the B-tree depth grows does the query become a little bit slower.

[Figure 7.1](#fig07_01) shows the scalability for both variants over a growing volume of data. The linear response time growth for an execution without a pipelined `order by` is clearly visible. The response time for the pipelined execution remains constant.

Figure 7.1 Scalability of Top-N Queries

Although the response time of a pipelined top-N query does not depend on the table size, it still grows with the number of selected rows. The response time will therefore double when selecting twice as many rows. This is particularly significant for “paging” queries that load additional results because these queries often start at the first entry again; they will read the rows already shown on the previous page and discard them before finally reaching the results for the second page. Nevertheless, there is a solution for this problem as well as we will see in the next section.

#### Links

Article “[Finding the Best Match With a Top-N Query](https://blog.fatalmind.com/2010/09/29/finding-the-best-match-with-a-top-n-query/)”
