---
title: "Index Filter Predicates"
lang: en
---

There are two different ways databases use indexes to apply the `where` clauses (predicates):

- As *access predicates*The access predicates express the start and stop conditions for the [leaf node traversal](/sql/anatomy/the-leaf-nodes).
- As *filter predicates*Filter predicates are applied during the leaf node traversal only. They don’t contribute to the start and stop conditions and do not narrow the scanned range.

#### Important

Access and filter predicates are attributes of explain plan operations—not index attributes.

That means that different `where` clauses can use different access and filter predicates on the same index.

#### Links

- [Index access and filter predicates explained by example](/sql/where-clause/searching-for-ranges/greater-less-between-tuning-sql-access-filter-predicates)
- [The impact of accidental index filter predicates demonstrated](/sql/testing-scalability/data-volume)
- [Why “anywhere” `LIKE` searches aren’t access predicates](/sql/where-clause/searching-for-ranges/like-performance-tuning)
- [Index filter predicates intentionally used](/sql/clustering/index-filter-predicates)
- Spotting index filter predicates in [Oracle](/sql/explain-plan/oracle/filter-predicates), [PostgreSQL](/sql/explain-plan/postgresql/filter-predicates) and [SQL Server](/sql/explain-plan/oracle/filter-predicates) execution plans.
