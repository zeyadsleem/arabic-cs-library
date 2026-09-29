---
title: "Db2 (LUW) Execution Plan Operations"
lang: en
---

A short reference of the most common Db2 (LUW) execution plan operations. Find the full list in the [IBM documentation](https://www.ibm.com/docs/en/db2/11.5.x?topic=tool-operators).

## Index and Table Access

[IXSCAN](https://www.ibm.com/docs/en/db2/11.5.x?topic=SSEPGG_11.5.0/com.ibm.db2.luw.admin.explain.doc/doc/r0021330.htm)

The `IXSCAN` performs the B-tree traversal *and* follows the leaf node chain to find all matching entries. See also [Chapter 1, “*Anatomy of an SQL Index*”](/sql/anatomy).

The so-called index filter predicates (“`SARG`” predicates) often cause performance problems for an `IXSCAN`. The [next section](/sql/explain-plan/oracle/filter-predicates) explains how to identify them. Similar to Oracle’s family of `INDEX ... SCAN` operations.

The absence of `START` and `STOP` predicates indicates a full index scan.

The [`last_explained` view](/sql/explain-plan/db2/getting-an-execution-plan#apa-db2-last_explained) indicates a reverse scan in brackets (e.g., `IXSCAN (REVERSE)`).

[FETCH](https://www.ibm.com/docs/en/db2/11.5.x?topic=SSEPGG_11.5.0/com.ibm.db2.luw.admin.explain.doc/doc/r0021323.htm)

Retrieves a row from the table using the `RID` retrieved from the preceding index lookup. See also [Chapter 1, “*Anatomy of an SQL Index*”](/sql/anatomy). Similar to Oracle’s `TABLE ACCESS BY INDEX ROWID`.

[TBSCAN](https://www.ibm.com/docs/en/db2/11.5.x?topic=SSEPGG_11.5.0/com.ibm.db2.luw.admin.explain.doc/doc/r0021339.htm)

This is also known as full table scan. Reads the entire table—all rows and columns—as stored on the disk. Although multi-block read operations improve the speed of a full table scan considerably, it is still one of the most expensive operations. Besides high IO rates, a full table scan must inspect all table rows so it can also consume a considerable amount of CPU time. See also [“*Full Table Scan*”](/sql/where-clause/the-equals-operator/concatenated-keys#sb-full-table-scan).

[RIDSCN](https://www.ibm.com/docs/en/db2/11.5.x?topic=SSEPGG_11.5.0/com.ibm.db2.luw.admin.explain.doc/doc/r0021335.htm)

This operation is used for [index merge](/sql/where-clause/searching-for-ranges/index-merge-performance) and, possibly even more often, to prefetch data pages after they have been sorted.

## Joins

Generally join operations process only two tables at a time. In case a query has more joins, they are executed sequentially: first two tables, then the intermediate result with the next table. In the context of joins, the term “table” could therefore also mean “intermediate result”.

[NLJOIN](https://www.ibm.com/docs/en/db2/11.5.x?topic=SSEPGG_11.5.0/com.ibm.db2.luw.admin.explain.doc/doc/r0021332.htm)

Joins two tables by fetching the result from one table and querying the other table for each row from the first. See also [“*Nested Loops*”](/sql/join/nested-loops-join-n1-problem).

[HSJOIN](https://www.ibm.com/docs/en/db2/11.5.x?topic=SSEPGG_11.5.0/com.ibm.db2.luw.admin.explain.doc/doc/r0021327.htm)

The hash join loads the candidate records from one side of the join into a hash table that is then probed for each row from the other side of the join. See also [“*Hash Join*”](/sql/join/hash-join-partial-objects).

[MSJOIN](https://www.ibm.com/docs/en/db2/11.5.x?topic=SSEPGG_11.5.0/com.ibm.db2.luw.admin.explain.doc/doc/r0021331.htm)

The merge join combines two sorted lists like a zipper. Both sides of the join must be presorted. See also [“*Sort Merge*”](/sql/join/sort-merge-join).

[ZZJOIN](https://www.ibm.com/docs/en/db2/11.5.x?topic=SSEPGG_11.5.0/com.ibm.db2.luw.admin.explain.doc/doc/r0058568.htm)

A multi-table join (more than two) specifically for data warehouses using a star schema.

## Sorting and Grouping

[SORT](https://www.ibm.com/docs/en/db2/11.5.x?topic=SSEPGG_11.5.0/com.ibm.db2.luw.admin.explain.doc/doc/r0021338.htm)

Sorts the result according to the `order by` clause. This operation needs large amounts of memory to materialize the intermediate result (not pipelined). This operation is also used to establish a required order for `[MSJOIN](#apa-db2-ops-msjoin)` or [`GRPBY`](#apa-db2-ops-grpby) operations. Additionally, `SORT` might remove duplicate rows for a `distinct` operation. See also [“*Indexing Order By*”](/sql/sorting-grouping/indexed-order-by).

The [`last_explained` view](/sql/explain-plan/db2/getting-an-execution-plan#apa-db2-last_explained) indicates whether a unique is performed in brackets (e.g. `SORT (UNIQUE)`). Top-N sorts are labeled with `TOP-N` (e.g., because of `fetch first ... rows only`).

[UNIQUE](https://www.ibm.com/docs/en/db2/11.5.x?topic=SSEPGG_11.5.0/com.ibm.db2.luw.admin.explain.doc/doc/r0021338.htm)

De-duplicates rows in a pre-sorted set. Used for `distinct` when the required order can be established without a `SORT` operation (e.g., because the `IXSCAN` delivers them in the required order). When a `SORT` operation is necessary, the `SORT` operation itself performs the de-duplication.

[GRPBY](https://www.ibm.com/docs/en/db2/11.5.x?topic=SSEPGG_11.5.0/com.ibm.db2.luw.admin.explain.doc/doc/r0021326.htm)

Aggregates a set according the `group by` clause. This operation may be executed using a sort/group-by algorithm or a hash based approach (since v10.1). See also [“*Indexing Group By*”](/sql/sorting-grouping/indexed-group-by).

The [`last_explained` view](/sql/explain-plan/db2/getting-an-execution-plan#apa-db2-last_explained) indicates the aggregation mode in brackets (e.g. `GRPBY (HASH COMPLETE)`).

## Top-N Queries

Db2 (LUW) does not have execution plan operations that directly relate to top-N clauses such as `fetch first ... rows only`. However, if a `SORT` is performed, [`last_explained` view](/sql/explain-plan/db2/getting-an-execution-plan#apa-db2-last_explained) indicates the top-N optimization in brackets (e.g., `SORT (TOP-N)`).

In case there is no `SORT` operation required, there is no visible mark of the top-n behaviour in the execution plan. However, a sudden drop of the cost value or drop in row count estimates in absence of predicates might give you an idea that there must be a Top-N clause at work.
