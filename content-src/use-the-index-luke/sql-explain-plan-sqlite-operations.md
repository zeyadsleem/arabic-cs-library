---
title: "SQLite Execution Plan Operations"
lang: en
---

A short reference of the most common SQLite execution plan operations. The respective [product documentation is here](https://sqlite.org/eqp.html).

## Index and Table Access

`SCAN TABLE …`Reads the entire table.

`SEARCH TABLE … USING INDEX`

Traverses an index tree, follows the leaf node list and fetches the corresponding data from the table.

`SEARCH TABLE … USING COVERING INDEX`

Traverses an index tree and follows the leaf node list to fetch all matching rows (aka. [Index Only Scan](/sql/clustering/index-only-scan-covering-index)).

## Joins

Generally join operations process only two tables at a time. In case a query has more joins, they are executed sequentially: first two tables, then the intermediate result with the next table. In the context of joins, the term “table” could therefore also mean “intermediate result”.

SQLite supports only [nested loops joins](/sql/join/nested-loops-join-n1-problem). The query plan starts by showing the outermost table access, followed by each nested access (similar to MySQL/MariaDB).

Nesting in the query plan output doesn’t indicated joins but nested queries (including `union`, `except`, `intersect`).

## Sorting and Grouping

SQLite always needs an index for `order by`, `group by` and `distinct`. If no suitable index exists in the system prior to query evaluation, a temporary index is created.

`USE TEMP B-TREE FOR …`

Indicates that a temporary index was created to perform the specified operation.

## Top-N Queries

The effect of a limit clause is not visible in the `explain query plan` output. In the raw `explain` output, you can see a `LIMIT counter`.
