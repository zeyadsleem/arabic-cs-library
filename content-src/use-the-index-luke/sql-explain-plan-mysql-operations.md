---
title: "Operations"
lang: en
---

MySQL reference: [http://dev.mysql.com/doc/refman/5.6/en/explain-output.html](https://dev.mysql.com/doc/refman/8.0/en/explain-output.html)

## Index and Table Access

MySQL’s explain plan tends to give a false sense of safety because it says so much about indexes being used. Although technically correct, it does not mean that it is using the index efficiently. The most important information is in the `TYPE` column of the MySQL’s `explain` output—but even there, the keyword `INDEX` doesn’t indicate proper indexing.

eq_ref, constPerforms a B-tree traversal to find *one* row (like `INDEX UNIQUE SCAN`) and fetches additional columns from the table if needed (`TABLE ACCESS BY INDEX ROWID`). The database uses this operation if a primary key or unique constraint ensures that the search criteria will match no more than one entry. See “[Using Index](#index-only-scan)” to check whether the table access happens or not.

ref, range

Performs a B-tree traversal, walks through the leaf nodes to find all matching index entries (similar to `INDEX RANGE SCAN`) and fetches additional columns from the primary table store if needed (`TABLE ACCESS BY INDEX ROWID`). See “[Using Index](#index-only-scan)” to check whether the table access happens or not.

index

Reads the entire index—all rows—in the index order (similar to `INDEX FULL SCAN`).

ALL

Reads the entire table—all rows and columns—as stored on the disk. Besides high IO rates, a table scan must also inspect all rows from the table so that it can also put a considerable load on the CPU. See also [“*Full Table Scan*”](/sql/where-clause/the-equals-operator/concatenated-keys#sb-full-table-scan).

Using Index (in the “Extra” column)

When the “Extra” column shows “Using Index”, it means that the table is not accessed because the index has all the required data. Think of “using index ONLY”. However, if a clustered index is used (e.g., the `PRIMARY` index when using InnoDB) “Using Index” does not appear in the Extra column although it is technically an Index-Only Scan. See also [“*Clustering Data: The Second Power of Indexing*”](/sql/clustering).

PRIMARY (in the “key” or “possible_keys” column)

`PRIMARY` is the name of the automatically created index for the primary key.

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=ap-plan-mysql-op&utm_medium=web&utm_content=ap-plan-mysql-op-idx-tbl) or [join a **training**](https://winand.at/sql-training/open-online-class).

## Sorting and Grouping

using filesort (in the “Extra” column)“using filesort” in the Extra column indicates an explicit sort operation—no matter where the sort takes place (main memory or on disk). “Using filesort” needs large amounts of memory to materialize the intermediate result (not pipelined). See also [“*Indexing Order By*”](/sql/sorting-grouping/indexed-order-by).

## Top-N Queries

implicit: no “using filesort” in the “Extra” columnA MySQL execution plan does not show a top-N query explicitly. If you are using the `limit` syntax and don’t see “using filesort” in the extra column, it is executed in a pipelined manner. See also [“*Querying Top-N Rows*”](/sql/partial-results/top-n-queries).
