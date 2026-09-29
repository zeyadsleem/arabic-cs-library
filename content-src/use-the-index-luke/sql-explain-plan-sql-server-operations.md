---
title: "Operations"
lang: en
---

This section explains the most common execution plan operations of Microsoft’s SQL Server database. You can also have a look at [Microsoft’s documentation](https://learn.microsoft.com/en-us/sql/relational-databases/showplan-logical-and-physical-operators-reference).

## Index and Table Access

SQL Server has a simple terminology: “Scan” operations read the entire index or table while “Seek” operations use the B-tree or a physical address (`RID`, like Oracle `ROWID`) to access a specific part of the index or table.

Index Seek, Clustered Index Seek

The `Index Seek` performs a B-tree traversal *and* walks through the leaf nodes to find all matching entries. See also [“*Anatomy of an SQL Index*”](/sql/anatomy).

Index Scan, Clustered Index Scan

Reads the entire index—all the rows—in the index order. Depending on various system statistics, the database might perform this operation if it needs all rows in index order—e.g., because of a corresponding `order by` clause.

Key Lookup (Clustered)

Retrieves a single row from a clustered index. This is similar to Oracle `INDEX UNIQUE SCAN` for an Index-Organized-Table (IOT). See also [“*Clustering Data: The Second Power of Indexing*”](/sql/clustering).

RID Lookup (Heap)

Retrieves a single row from a table—like Oracle `TABLE ACCESS BY INDEX ROWID`. See also [“*Anatomy of an SQL Index*”](/sql/anatomy).

Table Scan

This is also known as full table scan. Reads the entire table—all rows and columns—as stored on the disk. Although multi-block read operations can improve the speed of a `Table Scan` considerably, it is still one of the most expensive operations. Besides high IO rates, a `Table Scan` must also inspect all table rows so it can also consume a considerable amount of CPU time. See also [“*Full Table Scan*”](/sql/where-clause/the-equals-operator/concatenated-keys#sb-full-table-scan).

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=ap-plan-mssql-ops&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

## Join Operations

Generally join operations process only two tables at a time. In case a query has more joins, they are executed sequentially: first two tables, then the intermediate result with the next table. In the context of joins, the term “table” could therefore also mean “intermediate result”.

Nested LoopsJoins two tables by fetching the result from one table and querying the other table for each row from the first. SQL Server also uses the nested loops operation to retrieve table data after an index access. See also [“*Nested Loops*”](/sql/join/nested-loops-join-n1-problem).

Hash Match

The hash match join loads the candidate records from one side of the join into a hash table which is then probed for each row from the other side of the join. See also [“*Hash Join*”](/sql/join/hash-join-partial-objects).

Merge Join

The merge join combines two sorted lists like a zipper. Both sides of the join must be presorted. See also [“*Sort Merge*”](/sql/join/sort-merge-join).

## Sorting and Grouping

SortSorts the result according to the `order by` clause. This operation needs large amounts of memory to materialize the intermediate result (not pipelined). See also [“*Indexing Order By*”](/sql/sorting-grouping/indexed-order-by).

Sort (Top N Sort)

Sorts a subset of the result according to the `order by` clause. Used for top-N queries if pipelined execution is not possible. See also [“*Querying Top-N Rows*”](/sql/partial-results/top-n-queries).

Stream Aggregate

Aggregates a presorted set according the `group by` clause. This operation does not buffer the intermediate result—it is executed in a pipelined manner. See also [“*Indexing Group By*”](/sql/sorting-grouping/indexed-group-by).

Hash Match (Aggregate)

Groups the result using a hash table. This operation needs large amounts of memory to materialize the intermediate result (not pipelined). The output is not ordered in any meaningful way. See also [“*Indexing Group By*”](/sql/sorting-grouping/indexed-group-by).

## Top-N Queries

TopAborts the underlying operations when the desired number of rows has been fetched. See also [“*Querying Top-N Rows*”](/sql/partial-results/top-n-queries).

The efficiency of the top-N query depends on the execution mode of the underlying operations. It is very inefficient when aborting non-pipelined operations such as `Sort`.
