---
title: "Index-Only Scan: Avoiding Table Access"
lang: en
---

The index-only scan is one of the most powerful tuning methods of all. It not only avoids accessing the table to evaluate the `where` clause, but avoids accessing the table completely if the database can find the selected columns in the index itself.

To cover an entire query, an index must contain *all* columns from the SQL statement—in particular also the columns from the `select` clause as shown in the following example:

```sql
CREATE INDEX sales_sub_eur
    ON sales
     ( subsidiary_id, eur_value )
```

```sql
SELECT SUM(eur_value)
  FROM sales
 WHERE subsidiary_id = ?
```

Of course indexing the `where` clause takes precedence over the other clauses. The column `SUBSIDIARY_ID` is therefore in the first position so it qualifies as an [access predicate](/sql/glossary/index-filter-predicates).

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-index-only-scan&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

The execution plan shows the index scan without a subsequent table access (`TABLE ACCESS BY INDEX ROWID`).

Db2 (LUW)

```
Explain Plan
---------------------------------------------------------------
ID | Operation              |                       Rows | Cost
 1 | RETURN                 |                            |   21
 2 |  GRPBY (COMPLETE)      |       1 of 34804 (   .00%) |   21
 3 |   IXSCAN SALES_SUB_EUR | 34804 of 1009326 (  3.45%) |   19

Predicate Information
 3 - START (Q1.SUBSIDIARY_ID = ?)
      STOP (Q1.SUBSIDIARY_ID = ?)
```

Oracle

```
----------------------------------------------------------
| Id  | Operation         | Name          |  Rows | Cost |
----------------------------------------------------------
|   0 | SELECT STATEMENT  |               |     1 |  104 |
|   1 |  SORT AGGREGATE   |               |     1 |      |
|*  2 |   INDEX RANGE SCAN| SALES_SUB_EUR | 40388 |  104 |
----------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
   2 - access("SUBSIDIARY_ID"=TO_NUMBER(:A))
```

The index covers the entire query so it is also called a *covering index*.

#### Note

If an index prevents a table access it is also called a *covering index*.

The term is misleading, however, because it sounds like an index property. The phrase index-only scan correctly suggests that it is an execution plan operation.

The index has a copy of the `EUR_VALUE` column so the database can use the value stored in the index. Accessing the table is not required because the index has all of the information to satisfy the query.

An index-only scan can improve performance enormously. Just look at the row count estimate in the execution plan: the optimizer expects to aggregate more than 40,000 rows. That means that the index-only scan prevents 40,000 table fetches—if each row is in a different table block. If the index has a good [clustering factor](/sql/clustering/index-filter-predicates#sb-clustering-factor)—that is, if the respective rows are well clustered in a few table blocks—the advantage may be significantly lower.

Besides the clustering factor, the number of selected rows limits the potential performance gain of an index-only scan. If you select a single row, for example, you can only save a single table access. Considering that the [tree traversal](/sql/anatomy/the-tree) needs to fetch a few blocks as well, the saved table access might become negligible.

#### Important

The performance advantage of an index-only scans depends on the number of accessed rows and the index clustering factor.

The index-only scan is an aggressive indexing strategy. Do not design an index for an index-only scan on suspicion only because it unnecessarily uses memory and increases the maintenance effort needed for `update` statements. See [Chapter 8, “*Modifying Data*”](/sql/dml). In practice, you should first index without considering the `select` clause and only extend the index if needed.

Index-only scans can also cause unpleasant surprises, for example if we limit the query to recent sales:

```sql
SELECT SUM(eur_value)
  FROM sales
 WHERE subsidiary_id = ?
   AND sale_date > ?
```

Without looking at the execution plan, one could expect the query to run faster because it selects fewer rows. The `where` clause, however, refers to a column that is not in the index so that the database must access the table to load this column.

Db2 (LUW)

```
Explain Plan
-------------------------------------------------------------------
ID | Operation                 |                       Rows |  Cost
 1 | RETURN                    |                            | 13547
 2 |  GRPBY (COMPLETE)         |        1 of 1223 (   .08%) | 13547
 3 |   FETCH SALES             |    1223 of 34804 (  3.51%) | 13547
 4 |    RIDSCN                 |   34804 of 34804 (100.00%) |    32
 5 |     SORT (UNIQUE)         |   34804 of 34804 (100.00%) |    32
 6 |      IXSCAN SALES_SUB_EUR | 34804 of 1009326 (  3.45%) |    19

Predicate Information
 3 - SARG (? < Q1.SALE_DATE)
     SARG (Q1.SUBSIDIARY_ID = ?)
 6 - START (Q1.SUBSIDIARY_ID = ?)
      STOP (Q1.SUBSIDIARY_ID = ?)
```

Oracle

```
--------------------------------------------------------------
|Id | Operation                    | Name      | Rows  |Cost |
--------------------------------------------------------------
| 0 | SELECT STATEMENT             |           |     1 | 371 |
| 1 |  SORT AGGREGATE              |           |     1 |     |
|*2 |   TABLE ACCESS BY INDEX ROWID| SALES     |  2019 | 371 |
|*3 |    INDEX RANGE SCAN          | SALES_DATE| 10541 |  30 |
--------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
   2 - filter("SUBSIDIARY_ID"=TO_NUMBER(:A))
   3 - access("SALE_DATE">:B)
```

The table access increases the response time although the query selects fewer rows. The relevant factor is not how many rows the query delivers but how many rows the database must inspect to find them.

#### Warning

Extending the `where` clause can cause “illogical” performance behavior. Check the execution plan before extending queries.

If an index can no longer be used for an index-only scan, the optimizer will choose the next best execution plan. That means the optimizer might select an entirely different execution plan or, as above, a similar execution plan with another index. In this case it uses an index on `SALE_DATE`, which is a leftover from the [previous chapter](/sql/join/hash-join-partial-objects).

From the optimizer’s perspective, this index has two advantages over `SALES_SUB_EUR`. The optimizer believes that the filter on `SALE_DATE` is more selective than the one on `SUBSIDIARY_ID`. You can see that in the respective “Rows” column of the last two execution plans (about 10,000 versus 40,000). These estimations are, however, purely arbitrary because the query uses [bind parameters](/sql/where-clause/bind-parameters). The `SALE_DATE` condition could, for example, select the entire table when providing the date of the first sale.

The second advantage of the `SALES_DATE` index is that is has a better clustering factor. This is a valid reason because the `SALES` table only grows chronologically. New rows are always appended to the end of the table as long as there are no rows deleted. The table order therefore corresponds to the index order because both are roughly sorted chronologically—the index has a good clustering factor.

When using an index with a good clustering factor, the selected tables rows are stored closely together so that the database only needs to read a few table blocks to get all the rows. Using this index, the query might be fast enough without an index-only scan. In this case we should remove the unneeded columns from the other index again.

#### Note

Some indexes have a good clustering factor automatically so that the performance advantage of an index-only scan is minimal.

In this particular example, there was a happy coincidence. The new filter on `SALE_DATE` not only prevented an index-only scan but also opened a new access path at the same time. The optimizer was therefore able to limit the performance impact of this change. It is, however, also possible to prevent an index only scan by adding columns to other clauses. However adding a column to the `select` clause can never open a new access path which could limit the impact of losing the index-only scan.

#### Tip

Maintain your index-only scans.

Add comments that remind you about an index-only scan and refer to that page so anyone can read about it.

[Function-based indexes](/sql/where-clause/functions/case-insensitive-search) can also cause unpleasant surprises in connection with index-only scans. An index on `UPPER(last_name)` cannot be used for an index-only scan when selecting the `LAST_NAME` column. In the [previous section](/sql/clustering/index-filter-predicates) we should have indexed the `LAST_NAME` column itself to support the `LIKE` filter and allow it to be used for an index-only scan when selecting the `LAST_NAME` column.

#### Tip

Always aim to index the original data as that is often the most useful information you can put into an index.

Avoid function-based indexing for expressions that cannot be used as access predicates.

Aggregating queries like the one shown above make good candidates for index-only scans. They query many rows but only a few columns, making a slim index sufficient for supporting an index-only scan. The more columns you query, the more columns you have to add to the indexed to support an index-only scan. As a developer you should therefore only select the columns you really need.

#### Tip

Avoid `select *` and fetch only the columns you need.

Regardless of the fact that indexing many rows needs a lot of space, you can also reach the limits of your database. Most databases impose rather rigid limits on the number of columns per index and the total size of an index entry. That means you cannot index an arbitrary number of columns nor arbitrarily long columns. The following overview lists the most important limitations. Nevertheless there are indexes that cover an entire table as we see in the next section.

## `INCLUDE`: Non-key Columns

SQL Server and PostgreSQL 11+ support so-called non-key columns in B-tree indexes. They are—other than the key columns, which we discussed so far—only stored in the leaf nodes and can thus not be used for access predicates.

Non-key columns are specified in the `include` clause:

```sql
 CREATE INDEX empsubupnam
     ON employees
       (subsidiary_id, last_name)
INCLUDE(phone_number, first_name)
```

Db2 (LUW)Db2 (LUW) [limits an index to 64 column with a maximum key length of 25% of the page size.](https://www.ibm.com/docs/en/db2/11.5.x?topic=indexes-designing)

Db2 also supports the [`INCLUDE` clause](https://www.ibm.com/docs/en/db2-for-zos/12.0.0?topic=SSEPEK_12.0.0/sqlref/src/tpc/db2z_sql_createindex.htm:/www.ibm.com/support/knowledgecenter/en/SSEPGG_11.1.0/com.ibm.db2.luw.admin.dbobj.doc/doc/t0020190.htm) to add non-key columns to *unique* indexes. This allows you to extend an unique index with additional columns so that the index can be used for an index-only scan without changing semantics of the uniqueness.

MySQL

MySQL with InnoDB limits the total key length (all columns) to 3072 bytes. Further, the length of each columns is [limited to 767 bytes if `innodb_large_prefix` is not enabled or row formats other than `DYNAMIC` or `COMPRESSED` are used](https://dev.mysql.com/doc/refman/9.7/en/innodb-parameters.html#sysvar_innodb_large_prefix). This was default up to and including MySQL 5.6. MyISAM indexes are limited to [16 columns and a maximum key length of 1000 bytes](https://dev.mysql.com/doc/refman/8.0/en/myisam-storage-engine.html).

MySQL has a unique feature called “prefix indexing” (sometimes also called “partial indexing”). This means indexing only the first few characters of a column—so it has nothing to do with the partial indexes described in [Chapter 2](/sql/where-clause). If you index a column that exceeds the allowed column length (767, 1000 or 3072 bytes as described above), MySQL might—depending on the [SQL mode](https://dev.mysql.com/doc/refman/8.0/en/sql-mode.html#sql-mode-strict) and [row format](https://dev.mysql.com/doc/refman/9.7/en/innodb-parameters.html#sysvar_innodb_large_prefix)—truncate the column accordingly. In this case, the `create index` statement succeeds with the warning “Specified key was too long; max key length is … bytes”. That means that the index doesn’t have a full copy of this column anymore—selecting the column prevents an index-only scan (similar to function-based indexes).

You can use MySQL’s prefix indexing explicitly to prevent exceeding the total key length limit if you get the error message “Specified key was too long; max key length is … bytes.” The following example only indexes the first ten characters of the `LAST_NAME` column.

```sql
CREATE INDEX .. ON employees (last_name(10))
```

Oracle

The maximum index key length depends on the block size and the index storage parameters ([75% of the database block size minus some overhead](https://docs.oracle.com/en/database/oracle/oracle-database/19/refrn/logical-database-limits.html)). A B-tree index is limited to 32 columns.

When using Oracle 11*g* with all defaults in place (8k blocks), the maximum index key length is 6398 bytes. Exceeding this limit causes the error message “ORA-01450: maximum key length (6398) exceeded.”

PostgreSQL

The PostgreSQL database supports index-only scans since [release 9.2](https://www.depesz.com/2011/10/08/waiting-for-9-2-index-only-scans/).

The length of B-tree entries is limited to 2713 bytes (hardcoded, approx. `BLCKSZ/3`). The respective error message “*index row size ... exceeds btree maximum, 2713*” appears only when executing an `insert` or `update` that exceeds the limit. B-tree indexes can contain up to [32 columns](https://www.postgresql.org/docs/current/indexes-multicolumn.html).

SQL Server

[Since version 2016, SQL Server supports up to 32 key columns with up to 1700 Bytes (900 Bytes for clustered indexes).](https://learn.microsoft.com/en-us/sql/sql-server/maximum-capacity-specifications-for-sql-server)[0](#footnote-0) Non-key columns do not account towards this limit.

#### Think About It

Queries that do not select any table columns are often executed with index-only scans.

Can you think of a meaningful example?
