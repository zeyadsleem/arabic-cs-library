---
title: "Sorting and Grouping"
lang: en
---

Sorting is a very resource intensive operation. It needs a fair amount of CPU time, but the main problem is that the database must temporarily buffer the results. After all, a sort operation must read the complete input before it can produce the first output. Sort operations cannot be executed in a pipelined manner—this can become a problem for large data sets.

An index provides an ordered representation of the indexed data: this principle was already described in [Chapter 1](/sql/anatomy). We could also say that an index stores the data in a presorted fashion. The index is, in fact, sorted just like when using the index definition in an `order by` clause. It is therefore no surprise that we can use indexes to avoid the sort operation to satisfy an `order by` clause.

Ironically, an `INDEX RANGE SCAN` also becomes inefficient for large data sets—especially when followed by a table access. This can nullify the savings from avoiding the sort operation. A [`FULL TABLE SCAN`](/sql/where-clause/the-equals-operator/concatenated-keys#sb-full-table-scan) with an explicit sort operation might be even faster in this case. Again, it is the optimizer’s job to evaluate the different execution plans and select the best one.

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=ch-order&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

An indexed `order by` execution not only saves the sorting effort, however; it is also able to return the first results without processing all input data. The `order by` is thus executed in a *pipelined* manner. [Chapter 7*Partial Results*](/sql/partial-results), explains how to exploit the pipelined execution to implement efficient pagination queries. This makes the pipelined `order by` so important that I refer to it as the *third power of indexing*.

#### Note

The [B-Tree traversal](/sql/anatomy/the-tree) is the first power of indexing.

[Clustering](/sql/clustering) is the second power of indexing.

Pipelined `order by` is the third power of indexing.

This chapter explains how to use an index for a pipelined `order by` execution. To this end we have to pay special attention to the interactions with the `where` clause and also to `ASC` and `DESC` modifiers. The chapter concludes by applying these techniques to `group by` clauses as well.

## Contents

1. *[Indexed Order By](/sql/sorting-grouping/indexed-order-by)* — `where` clause interactions
2. *[`ASC`/`DESC` and `NULL FIRST`/`LAST`](/sql/sorting-grouping/order-by-asc-desc-nulls-last)* — changing index order
3. *[Indexed Group By](/sql/sorting-grouping/indexed-group-by)* — Pipelining `group by`
