---
title: "The Join Operation"
lang: en
---

```
An SQL query walks into a bar and sees two tables.
He walks up to them and asks “Can I join you?”
```

— Source: Unknown

The join operation transforms data from a normalized model into a denormalized form that suits a specific processing purpose. Joining is particularly sensitive to disk seek latencies because it combines scattered data fragments. Proper indexing is again the best solution to reduce response times. The correct index however depends on which of the three common join algorithms is used for the query.

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=ch-join&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

There is, however, one thing that is common to all join algorithms: they process only two tables at a time. A SQL query with more tables requires multiple steps: first building an intermediate result set by joining two tables, then joining the result with the next table and so forth.

## Pipelining Intermediate Results

Although intermediate results explain the algorithm very well, it does not mean that the database has to materialize it. That would mean storing the intermediate result of the first join before starting the next one. Instead, databases use [pipelining](https://en.wikipedia.org/wiki/Pipeline_%28computing%29) to reduce memory usage. That means that each row from the intermediate result is immediately *pipelined* to the next join operation—avoiding the need to store the intermediate result set.

Even though the join order has no impact on the final result, it still affects performance. The optimizer will therefore evaluate all possible join order permutations and select the best one. That means that just optimizing a complex statement might become a performance problem. The more tables to join, the more execution plan variants to evaluate—mathematically speaking: n! ([factorial growth](https://en.wikipedia.org/wiki/Factorial)), though this is not a problem when using [bind parameters](/sql/where-clause/bind-parameters).

#### Important

The more complex the statement the more important using [bind parameters](/sql/where-clause/bind-parameters) becomes.

Not using bind parameters is like recompiling a program every time.

## Contents

1. *[Nested Loops](/sql/join/nested-loops-join-n1-problem)* — About the N+1 selects problem in ORM
2. *[Hash Join](/sql/join/hash-join-partial-objects)* — Requires an entirely different indexing approach
3. *[Sort-Merge Join](/sql/join/sort-merge-join)* ‌— Like a zipper on two sorted sets
