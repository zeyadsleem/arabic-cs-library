---
title: "Operations"
lang: en
---

## Index and Table Access

Seq Scan

The `Seq Scan` operation scans the entire relation (table) as stored on disk (like `TABLE ACCESS FULL`).

Index Scan

The `Index Scan` performs a B-tree traversal, walks through the leaf nodes to find all matching entries, and fetches the corresponding table data. It is like an `INDEX RANGE SCAN` followed by a `TABLE ACCESS BY INDEX ROWID` operation. See also [Chapter 1, “*Anatomy of an SQL Index*”](/sql/anatomy).

The so-called index filter predicates often cause performance problems for an `Index Scan`. The [next section](/sql/explain-plan/postgresql/filter-predicates) explains how to identify them.

Index Only Scan

The `Index Only Scan` performs a B-tree traversal and walks through the leaf nodes to find all matching entries. There is no table access needed because the index has all columns to satisfy the query (exception: MVCC visibility information). See also [“*Index-Only Scan: Avoiding Table Access*”](/sql/clustering/index-only-scan-covering-index).

Bitmap Index Scan / Bitmap Heap Scan / Recheck Cond

Tom Lane’s [post to the PostgreSQL performance mailing list](https://www.postgresql.org/message-id/12553.1135634231@sss.pgh.pa.us) is very clear and concise.

A plain `Index Scan` fetches one tuple-pointer at a time from the index, and immediately visits that tuple in the table. A bitmap scan fetches all the tuple-pointers from the index in one go, sorts them using an in-memory “bitmap” data structure, and then visits the table tuples in physical tuple-location order.

— [Tom Lane](https://www.postgresql.org/message-id/12553.1135634231@sss.pgh.pa.us)

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=ap-plan-pg-op&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

## Join Operations

Generally join operations process only two tables at a time. In case a query has more joins, they are executed sequentially: first two tables, then the intermediate result with the next table. In the context of joins, the term “table” could therefore also mean “intermediate result”.

Nested LoopsJoins two tables by fetching the result from one table and querying the other table for each row from the first. See also [“*Nested Loops*”](/sql/join/nested-loops-join-n1-problem).

Hash Join / Hash

The hash join loads the candidate records from one side of the join into a hash table (marked with `Hash` in the plan) which is then probed for each record from the other side of the join. See also [“*Hash Join*”](/sql/join/hash-join-partial-objects).

Merge Join

The (sort) merge join combines two sorted lists like a zipper. Both sides of the join must be presorted. See also [“*Sort Merge*”](/sql/join/sort-merge-join).

## Sorting and Grouping

Sort / Sort KeySorts the set on the columns mentioned in `Sort Key`. The `Sort` operation needs large amounts of memory to materialize the intermediate result (not pipelined). See also [“*Indexing Order By*”](/sql/sorting-grouping/indexed-order-by).

GroupAggregate

Aggregates a presorted set according to the `group by` clause. This operation does not buffer large amounts of data (pipelined). See also [“*Indexing Group By*”](/sql/sorting-grouping/indexed-group-by).

HashAggregate

Uses a temporary hash table to group records. The `HashAggregate` operation does not require a presorted data set, instead it uses large amounts of memory to materialize the intermediate result (not pipelined). The output is not ordered in any meaningful way. See also [“*Indexing Group By*”](/sql/sorting-grouping/indexed-group-by).

## Top-N Queries

LimitAborts the underlying operations when the desired number of rows has been fetched. See also [“*Querying Top-N Rows*”](/sql/partial-results/top-n-queries).

The efficiency of the top-N query depends on the execution mode of the underlying operations. It is very inefficient when aborting non-pipelined operations such as `Sort`.

WindowAgg

Indicates the use of window functions. From PostgreSQL 15 onwards “Run Condition” indicates a possible Top-N termination. See also [“*Using Window Functions for Efficient Pagination*”](/sql/partial-results/window-functions).
