---
title: "Searching for Ranges"
lang: en
---

Inequality operators such as `` and `between` can use indexes just like the equals operator [explained above](/sql/where-clause/the-equals-operator). Even a `LIKE` filter can—under certain circumstances—use an index just like range conditions do.

Using these operations limits the choice of the column order in multi-column indexes. This limitation can even rule out all optimal indexing options—there are queries where you simply cannot define a “correct” column order at all.

## Contents

1. *[Greater, Less and `BETWEEN`](/sql/where-clause/searching-for-ranges/greater-less-between-tuning-sql-access-filter-predicates)* — The column order revisited
2. *[Indexing SQL `LIKE` Filters](/sql/where-clause/searching-for-ranges/like-performance-tuning)* — `LIKE` is not for full-text search
3. *[Index Combine](/sql/where-clause/searching-for-ranges/index-merge-performance)* — Why not using one index for every column?
