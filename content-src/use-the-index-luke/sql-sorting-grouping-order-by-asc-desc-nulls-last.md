---
title: "Indexing `ASC`, `DESC` and `NULLS FIRST`/`LAST`"
lang: en
---

Databases can read indexes in both directions. That means that a pipelined `order by` is also possible if the scanned index range is in the exact opposite order as specified by the `order by` clause. Although `ASC` and `DESC` modifiers in the `order by` clause can prevent a pipelined execution, most databases offer a simple way to change the index order so an index becomes usable for a pipelined `order by`.

The following example uses an index in reverse order. It delivers the sales since yesterday ordered by descending date and descending `PRODUCT_ID.`

```sql
SELECT sale_date, product_id, quantity
  FROM sales
 WHERE sale_date >= TRUNC(sysdate) - INTERVAL '1' DAY
 ORDER BY sale_date DESC, product_id DESC
```

The execution plan shows that the database reads the index in a descending direction.

Db2 (LUW)

```
Explain Plan
---------------------------------------------------------------------
ID | Operation                      |                     Rows | Cost
 1 | RETURN                         |                          |  688
 2 |  FETCH SALES                   |     394 of 394 (100.00%) |  688
 3 |   IXSCAN (REVERSE) SALES_DT_PR | 394 of 1009326 (   .04%) |   24

Predicate Information
 3 - STOP ((CURRENT DATE - 1 DAYS) <= Q1.SALE_DATE)
```

In Db2 reverse scans can be prevented by using the [`DISALLOW REVERSE SCAN`](https://www.ibm.com/docs/en/db2/11.5.x?topic=statements-create-index) clause during index creation.

Oracle

```
---------------------------------------------------------------
|Id |Operation                    | Name        | Rows | Cost |
---------------------------------------------------------------
| 0 |SELECT STATEMENT             |             |  320 |  300 |
| 1 | TABLE ACCESS BY INDEX ROWID | SALES       |  320 |  300 |
|*2 |  INDEX RANGE SCAN DESCENDING| SALES_DT_PR |  320 |    4 |
---------------------------------------------------------------
```

In this case, the database uses the [index tree](/sql/anatomy/the-tree) to find the *last* matching entry. From there on, it follows the leaf node chain “upwards” as shown in [Figure 6.2](#fig-ascdesc-reverse). After all, this is why the database uses a [*doubly* linked list](/sql/anatomy/the-leaf-nodes) to build the leaf node chain.

Figure 6.2 Reverse Index Scan

Of course it is crucial that the scanned index range is in the exact opposite order as needed for the `order by` clause.

#### Important

Databases can read indexes in both directions.

The following example does not fulfill this prerequisite because it mixes `ASC` and `DESC` modifiers in the `order by` clause:

```sql
SELECT sale_date, product_id, quantity
  FROM sales
 WHERE sale_date >= TRUNC(sysdate) - INTERVAL '1' DAY
 ORDER BY sale_date ASC, product_id DESC
```

The query must first deliver yesterday’s sales ordered by descending `PRODUCT_ID` and then today’s sales, again by descending `PRODUCT_ID`. [Figure 6.3](#fig-ascdesc-jump) illustrates this process. To get the sales in the required order, the database would have to “jump” during the index scan.

Figure 6.3 Impossible Pipelined `order by`

However, the index has no link from yesterday’s sale with the smallest `PRODUCT_ID` to today’s sale with the greatest. The database can therefore not use this index to avoid an explicit sort operation.

For cases like this, most databases offer a simple method to adjust the index order to the `order by` clause. Concretely, this means that you can use `ASC` and `DESC` modifiers in the index declaration:

```
  DROP INDEX sales_dt_pr
```

```sql
CREATE INDEX sales_dt_pr
    ON sales (sale_date ASC, product_id DESC)
```

#### Warning

Prior to version 8.0, the MySQL database [ignores `ASC` and `DESC` modifiers in the index definition](https://dev.mysql.com/doc/refman/9.7/en/create-index.html). MariaDB honors `DESC` in indexes [only since version 10.8.](https://mariadb.com/docs/release-notes/community-server/old-releases/10.8/what-is-mariadb-108)

Now the index order corresponds to the `order by` clause so the database can omit the sort operation:

Db2 (LUW)

```
Explain Plan
-----------------------------------------------------------
ID | Operation            |                     Rows | Cost
 1 | RETURN               |                          |  675
 2 |  FETCH SALES         |     387 of 387 (100.00%) |  675
 3 |   IXSCAN SALES_DT_PR | 387 of 1009326 (   .04%) |   24

Predicate Information
 3 - START ((CURRENT DATE - 1 DAYS) <= Q1.SALE_DATE)
```

Oracle

```
---------------------------------------------------------------
|Id | Operation                   | Name        | Rows | Cost |
---------------------------------------------------------------
| 0 | SELECT STATEMENT            |             |  320 |  301 |
| 1 |  TABLE ACCESS BY INDEX ROWID| SALES       |  320 |  301 |
|*2 |   INDEX RANGE SCAN          | SALES_DT_PR |  320 |    4 |
---------------------------------------------------------------
```

[Figure 6.4](#fig-ascdesc-mix) shows the new index order. The change in the sort direction for the second column in a way swaps the direction of the arrows from the previous figure. That makes the first arrow end where the second arrow starts so that index has the rows in the desired order.

#### Important

When using mixed `ASC` and `DESC` modifiers in the `order by` clause, you must define the index likewise in order to use it for a pipelined `order by`.

This does not affect the index’s usability for the `where` clause.

Figure 6.4 Mixed-Order Index

`ASC`/`DESC` indexing is only needed for sorting individual columns in opposite direction. It is not needed to reverse the order of all columns because the database could still read the index in descending order if needed—[secondary indexes](/sql/glossary/secondary-index) on [index organized tables](/sql/clustering/index-organized-clustered-index) being the only exception. Secondary indexes implicitly add the clustering key to the index without providing any possibility for specifying the sort order. If you need to sort the clustering key in descending order, you have no other option than sorting all other columns in descending order. The database can then read the index in reverse direction to get the desired order.

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-asc-desc-null&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

Besides `ASC` and `DESC`, the SQL standard defines two hardly known modifiers for the `order by` clause: `NULLS FIRST` and `NULLS LAST`. Explicit control over `NULL` sorting was “recently” introduced as an *optional* extension with SQL:2003. As a consequence, database support is sparse. This is particularly worrying because the standard does not exactly define the sort order of `NULL`. It only states that all `NULL`s must appear together after sorting, but it does not specify if they should appear before or after the other entries. Strictly speaking, you would actually need to specify `NULL` sorting for all columns that can be null in the `order by` clause to get a well-defined behavior.

The fact is, however, that the optional extension is neither implemented by SQL Server 2019 nor by MySQL 8.0. The Oracle database, on the contrary, supported `NULLS` sorting even before it was introduced to the standard, but it does not accept it in index definitions as of release 19*c*. The Oracle database can therefore not do a pipelined `order by` when sorting with `NULLS FIRST`. Only the PostgreSQL database (since release 8.3) supports the `NULLS` modifier in both the `order by` clause and the index definition.

The following overview summarizes the features provided by different databases.

Figure 6.5 Database/Feature Matrix
