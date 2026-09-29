---
title: "Distinguishing Access and Filter-Predicates"
lang: en
---

The SQL Server database uses three different methods for applying `where` clauses (predicates):

Access Predicate (“Seek Predicates”)

The access predicates express the start and stop conditions of the [leaf node traversal](/sql/anatomy/the-leaf-nodes).

Index Filter Predicate (“Predicates” or “where” for index operations)

Index filter predicates are applied during the leaf node traversal only. They do not contribute to the start and stop conditions and do not narrow the scanned range.

Table level filter predicate (“where” for table operations)

Predicates on columns which are not part of the index are evaluated on the table level. For that to happen, the database must load the row from the heap table first.

The following section explains how to identify filter predicates in [SQL Server execution plans](/sql/explain-plan/sql-server/getting-an-execution-plan). It is based on the sample used to [demonstrate the impact of index filter predicates](/sql/testing-scalability/data-volume) in [Chapter 3](/sql/testing-scalability). The appendix has the [full scripts](/sql/example-schema/sql-server/performance-testing-scalability) to populate the table.

```sql
CREATE TABLE scale_data (
   section NUMERIC NOT NULL,
   id1     NUMERIC NOT NULL,
   id2     NUMERIC NOT NULL
)
```

```sql
CREATE INDEX scale_slow ON scale_data(section, id1, id2)
```

The sample statement selects by `SECTION` and `ID2`:

```sql
SELECT count(*)
  FROM scale_data
 WHERE section = @sec
   AND id2 = @id2
```

## In Graphical Execution Plans

The graphical execution plan hides the predicate information in a tooltip that is only shown when moving the mouse over the `Index Seek` operation. Hover over the `Index Seek` icon to see the predicate information—really, on this web-page.

![](/images/use-the-index-luke/sql-explain-plan-sql-server-filter-predicates-0-mssql_ssms_filter.ZrTov2hZ.webp)

The SQL Server’s *Seek Predicates* correspond to Oracle’s access predicates—they narrow the leaf node traversal. Filter predicates are just labeled *Predicates* in SQL Server’s graphical execution plan.

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=ap-explain-mssql-filter&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

## In Tabular Execution Plans

Tabular execution plans have the predicate information in the same column in which the operations appear. It is therefore very easy to copy and past all the relevant information in one go.

```
DECLARE @sec numeric
```

```
DECLARE @id2 numeric
```

```
SET STATISTICS PROFILE ON
```

```sql
SELECT count(*)
  FROM scale_data
 WHERE section = @sec
   AND id2 = @id2
```

```
SET STATISTICS PROFILE OFF
```

The execution plan is shown as a second result set in the results pane. The following is the `StmtText` column—with a little reformatting for better reading:

```
|--Compute Scalar(DEFINE:([Expr1004]=CONVERT_IMPLICIT(...))
     |--Stream Aggregate(DEFINE:([Expr1008]=Count(*)))
          |--Index Seek(OBJECT:([scale_data].[scale_slow]),
             SEEK: ([scale_data].[section]=[@sec])
                    ORDERED FORWARD
             WHERE:([scale_data].[id2]=[@id2]))
```

The `SEEK` label introduces access predicates, the `WHERE` label marks filter predicates.

#### Tip

- The section [“*Greater, Less and `BETWEEN`*”](/sql/where-clause/searching-for-ranges/greater-less-between-tuning-sql-access-filter-predicates) explains the difference between access and index filter predicates by example.
- [Chapter 3, “*Performance and Scalability*”](/sql/testing-scalability), demonstrates the performance difference access and index filter predicates make.
