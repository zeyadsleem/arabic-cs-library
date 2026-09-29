---
title: "Distinguishing Access and Filter-Predicates"
lang: en
---

The PostgreSQL database uses three different methods to apply `where` clauses (predicates):

Access Predicate (“Index Cond”)

The access predicates express the start and stop conditions of the [leaf node traversal](/sql/anatomy/the-leaf-nodes).

Index Filter Predicate (“Index Cond”)

Index filter predicates are applied during the leaf node traversal only. They do not contribute to the start and stop conditions and do not narrow the scanned range.

Table level filter predicate (“Filter”)

Predicates on columns that are not part of the index are evaluated on the table level. For that to happen, the database must load the row from the heap table first.

#### Note

Index filter predicates give a false sense of safety; even though an index is used, the performance degrades rapidly on a growing data volume or system load.

PostgreSQL execution plans do not show index access and filter predicates separately—both show up as “Index Cond”. That means the execution plan must be compared to the index definition to differentiate access predicates from index filter predicates.

#### Note

The PostgreSQL explain plan does not provide enough information for finding index filter predicates.

The predicates shown as “Filter” are always table level filter predicates—even when shown for an `Index Scan` operation.

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=ap-explain-pg-filter&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

Consider the following example, which originally appeared in the “[Performance and Scalability”](/sql/testing-scalability/data-volume) chapter([`create` & `insert` script](/sql/example-schema/postgresql/performance-testing-scalability)):

```sql
CREATE TABLE scale_data (
   section NUMERIC NOT NULL,
   id1     NUMERIC NOT NULL,
   id2     NUMERIC NOT NULL
)
```

```sql
CREATE INDEX scale_data_key ON scale_data(section, id1)
```

The following `select` filters on the `ID2` column, which is not included in the index:

```
PREPARE stmt(int) AS SELECT count(*) 
                       FROM scale_data
                      WHERE section = 1
                        AND id2 = $1
```

```
EXPLAIN EXECUTE stmt(1)
```

The `ID2` predicate shows up as “`Filter`” below the `Index Scan` operation. This is because PostgreSQL performs the table access as part of the `Index Scan` operation. In other words, the `TABLE ACCESS BY INDEX ROWID` operation of the Oracle database is hidden within PostgreSQL’s `Index Scan` operation. It is therefore possible that a `Index Scan` filters on columns that are not included in the index.

#### Important

The PostgreSQL `Filter` predicates are table level filter predicates—even when shown for an `Index Scan`.

When we add the index from the “[Performance and Scalability”](/sql/testing-scalability/data-volume) chapter, we can see that all columns show up as “Index Cond”—regardless of whether they are access or filter predicates.

```sql
CREATE INDEX scale_slow ON scale_data (section, id1, id2)
```

The execution plan with the new index does not show any filter conditions:

```
                      QUERY PLAN
------------------------------------------------------
Aggregate  (cost=14215.98..14215.99 rows=1 width=0)
  Output: count(*)
  -> Index Scan using scale_slow on scale_data 
     (cost=0.00..14208.51 rows=2989 width=0)
     Index Cond: (section = 1::numeric AND id2 = ($1)::numeric)
```

Please note that the condition on `ID2` cannot narrow the leaf node traversal because the index has the `ID1` column before `ID2`. That means, the `Index Scan` will scan the entire range for the condition `SECTION=1::numeric` and apply the filter `ID2=($1)::numeric` on each row that fulfills the clause on `SECTION`.

#### Tip

- The section [“*Greater, Less and `BETWEEN`*”](/sql/where-clause/searching-for-ranges/greater-less-between-tuning-sql-access-filter-predicates) explains the difference between access and index filter predicates by example.
- [Chapter 3, “*Performance and Scalability*”](/sql/testing-scalability), demonstrates the performance difference access and index filter predicates make.
