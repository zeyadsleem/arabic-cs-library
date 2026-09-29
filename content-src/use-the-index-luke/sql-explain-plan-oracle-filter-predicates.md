---
title: "Distinguishing Access and Filter-Predicates"
lang: en
---

The Oracle database uses three different methods to apply `where` clauses (predicates):

Access predicate (“access”)

The access predicates express the start and stop conditions of the [leaf node traversal](/sql/anatomy/the-leaf-nodes).

Index filter predicate (“filter” for index operations)

Index filter predicates are applied during the leaf node traversal only. They do not contribute to the start and stop conditions and do not narrow the scanned range.

Table level filter predicate (“filter” for table operations)

Predicates on columns that are not part of the index are evaluated on table level. For that to happen, the database must load the row from the table first.

#### Note

Index filter predicates give a false sense of safety; even though an index is used, the performance degrades rapidly on a growing data volume or system load.

Execution plans that were created using the `DBMS_XPLAN` utility (see [“*Getting an Execution Plan*”](/sql/explain-plan/oracle/getting-an-execution-plan)), show the index usage in the “Predicate Information” section below the tabular execution plan:

```
------------------------------------------------------
| Id | Operation         | Name       | Rows  | Cost |
------------------------------------------------------
|  0 | SELECT STATEMENT  |            |     1 | 1445 |
|  1 |  SORT AGGREGATE   |            |     1 |      |
|* 2 |   INDEX RANGE SCAN| SCALE_SLOW |  4485 | 1445 |
------------------------------------------------------

Predicate Information (identified by operation id):
   2 - access("SECTION"=:A AND "ID2"=:B)
       filter("ID2"=:B)
```

The numbering of the predicate information refers to the “Id” column of the execution plan. There, the database also shows an asterisk to mark operations that have predicate information.

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=ap-explain-oracle-filter&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

This example, taken from the chapter “[Performance and Scalability](/sql/testing-scalability/data-volume)”, shows an `INDEX RANGE SCAN` that has access and filter predicates. The Oracle database has the peculiarity of also showing some filter predicate as access predicates—e.g., `ID2=:B` in the execution plan above.

#### Important

If a condition shows up as filter predicate, it is a filter predicate—it does not matter if it is also shown as access predicate.

This means that the `INDEX RANGE SCAN` scans the entire range for the condition `"SECTION"=:A` and applies the filter `"ID2"=:B` on each row.

Filter predicates on table level are shown for the respective table access such as `TABLE ACCESS BY INDEX ROWID` or `TABLE ACCESS FULL`.

Please note that different tools display the predicate information differently. Oracle SQL Developer, for example, shows the predicate information below the respective operation.

Figure A.1 Access and Filter Predicates in Oracle SQL Developer ![](/images/use-the-index-luke/sql-explain-plan-oracle-filter-predicates-0-sqldeveloper_access_filter_predicates.6GQmGBUE.webp)

Some tools don’t show the predicate information at all. Remember that you can always fall back to `DBMS_XPLAN` as explained in “[Getting an Execution Plan](/sql/explain-plan/oracle/getting-an-execution-plan)”.

#### Tip

- The section [“*Greater, Less and `BETWEEN`*”](/sql/where-clause/searching-for-ranges/greater-less-between-tuning-sql-access-filter-predicates) explains the difference between access and index filter predicates by example.
- [Chapter 3, “*Performance and Scalability*”](/sql/testing-scalability), demonstrates the performance difference access and index filter predicates make.
