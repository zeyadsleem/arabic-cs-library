---
title: "Indexing Group By"
lang: en
---

SQL databases use two entirely different `group by` algorithms. The first one, the hash algorithm, aggregates the input records in a temporary hash table. Once all input records are processed, the hash table is returned as the result. The second algorithm, the sort/group algorithm, first sorts the input data by the grouping key so that the rows of each group follow each other in immediate succession. Afterwards, the database just needs to aggregate them. In general, both algorithms need to materialize an intermediate state, so they are not executed in a pipelined manner. Nevertheless the sort/group algorithm can use an index to avoid the sort operation, thus enabling a pipelined `group by`.

#### Note

MySQL 8.0 doesn’t use the hash algorithm. Nevertheless, the [optimization for the sort/group algorithm](https://dev.mysql.com/doc/refman/8.0/en/group-by-optimization.html) works as described below.

Consider the following query. It delivers yesterday’s revenue grouped by `PRODUCT_ID`:

```sql
SELECT product_id, sum(eur_value)
  FROM sales
 WHERE sale_date = TRUNC(sysdate) - INTERVAL '1' DAY
 GROUP BY product_id
```

Knowing the index on `SALE_DATE` and `PRODUCT_ID` from the [previous section](/sql/sorting-grouping/order-by-asc-desc-nulls-last), the sort/group algorithm is more appropriate because an `INDEX RANGE SCAN` automatically delivers the rows in the required order. That means the database avoids materialization because it does not need an explicit sort operation—the `group by` is executed in a pipelined manner.

Db2 (LUW)

```
Explain Plan
------------------------------------------------------------
ID | Operation             |                     Rows | Cost
 1 | RETURN                |                          |  675
 2 |  GRPBY (COMPLETE)     |      25 of 387 (  6.46%) |  675
 3 |   FETCH SALES         |     387 of 387 (100.00%) |  675
 4 |    IXSCAN SALES_DT_PR | 387 of 1009326 (   .04%) |   24

Predicate Information
 4 - START (Q1.SALE_DATE = (CURRENT DATE - 1 DAYS))
      STOP (Q1.SALE_DATE = (CURRENT DATE - 1 DAYS))
```

Oracle

```
---------------------------------------------------------------
|Id |Operation                    | Name        | Rows | Cost |
---------------------------------------------------------------
| 0 |SELECT STATEMENT             |             |   17 |  192 |
| 1 | SORT GROUP BY NOSORT        |             |   17 |  192 |
| 2 |  TABLE ACCESS BY INDEX ROWID| SALES       |  321 |  192 |
|*3 |   INDEX RANGE SCAN          | SALES_DT_PR |  321 |    3 |
---------------------------------------------------------------
```

The Oracle database’s execution plan marks a pipelined `SORT GROUP BY` operation with the `NOSORT` addendum. The execution plan of other databases does not mention any sort operation at all.

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-group&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

The pipelined `group by` has the same prerequisites as the pipelined `order by`, except there are no `ASC` and `DESC` modifiers. That means that defining an index with `ASC`/`DESC` modifiers should not affect pipelined `group by` execution. The same is true for `NULLS FIRST`/`LAST`. Nevertheless there are databases that cannot properly use an `ASC`/`DESC` index for a pipelined `group by`.

#### Warning

PostgreSQL does not automatically do a pipelined `group by` if the index treats the `NULL` value as the smallest possible value. Adding an `order by` clause with the index order bypasses this problem.

The Oracle database cannot read an index backwards in order to execute a pipelined `group by` that is followed by an `order by`.

More details are available in the respective appendices: [PostgreSQL](/sql/example-schema/postgresql/sorting-grouping#apc-pg-ord-group), [Oracle](/sql/example-schema/oracle/sorting-grouping#apc-ora-ord-group).

If we extend the query to consider all sales *since yesterday*, as we did in the example for the pipelined `order by`, it prevents the pipelined `group by` for the same reason as before: the `INDEX RANGE SCAN` does not deliver the rows ordered by the grouping key (compare [Figure 6.1](/sql/sorting-grouping/indexed-order-by#fig-order-concat)).

```sql
SELECT product_id, sum(eur_value)
  FROM sales
 WHERE sale_date >= TRUNC(sysdate) - INTERVAL '1' DAY
 GROUP BY product_id
```

Db2 (LUW)

```
Explain Plan
--------------------------------------------------------------------
ID | Operation                   |                      Rows |  Cost
 1 | RETURN                      |                           | 12527
 2 |  GRPBY (FINAL)              |        25 of 25 (100.00%) | 12527
 3 |   TBSCAN                    |        25 of 25 (100.00%) | 12527
 4 |    SORT (INTERMEDIATE)      |        25 of 25 (100.00%) | 12527
 5 |     GRPBY (HASHED PARTIAL)  |      25 of 8050 (   .31%) | 12527
 6 |      FETCH SALES            |    8050 of 8050 (100.00%) | 12526
 7 |       RIDSCN                |    8050 of 8050 (100.00%) |   375
 8 |        SORT (UNIQUE)        |    8050 of 8050 (100.00%) |   375
 9 |         IXSCAN SALES_DT_PR  | 8050 of 1009326 (   .80%) |   372
```

The following `where` clause was used to obtain this result: `WHERE sale_date >= CURRENT_DATE - 1 MONTH`.

Compared to the Oracle execution plan, this looks overly complex. This is due to two circumstances:

- Db2 explicitly shows a sort operation by physical storage location between the index access and the table access (operations 7 and 8).
- Db2 performs a two-phase aggregation: first it does a partial aggregate to reduce the amount of data to be sorted as early as possible (operation 5) then it does a regular `SORT` + `GRPBY`.

Oracle

```
---------------------------------------------------------------
|Id |Operation                    | Name        | Rows | Cost |
---------------------------------------------------------------
| 0 |SELECT STATEMENT             |             |   24 |  356 |
| 1 | HASH GROUP BY               |             |   24 |  356 |
| 2 |  TABLE ACCESS BY INDEX ROWID| SALES       |  596 |  355 |
|*3 |   INDEX RANGE SCAN          | SALES_DT_PR |  596 |    4 |
---------------------------------------------------------------
```

Instead, the Oracle database uses the hash algorithm. The advantage of the hash algorithm is that it only needs to buffer the *aggregated result*, whereas the sort/group algorithm materializes the *complete input set*. In other words: the hash algorithm needs less memory.

As with pipelined `order by`, a fast execution is not the most important aspect of the pipelined `group by` execution. It is more important that the database executes it in a pipelined manner and delivers the first result before reading the entire input. This is the prerequisite for the advanced optimization methods explained in the [next chapter](/sql/partial-results).

#### Think About It

Can you think of any other database operation—besides sorting and grouping—that could possibly use an index to avoid sorting?
