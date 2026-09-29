---
title: "Performance Impacts of Data Volume"
lang: en
---

The amount of data stored in a database has a great impact on its performance. It is usually accepted that a query becomes slower with additional data in the database. But how great is the performance impact if the data volume doubles? And how can we improve this ratio? These are the key questions when discussing database scalability.

As an example we analyze the response time of the following query when using two different indexes. The index definitions will remain unknown for the time being—they will be revealed during the course of the discussion.

```sql
SELECT count(*)
  FROM scale_data
 WHERE section = ?
   AND id2 = ?
```

The column `SECTION` has a special purpose in this query: it controls the data volume. The bigger the `SECTION` number becomes, the more rows the query selects. [Figure 3.1](#fig-scale-resptime) shows the response time for a small `SECTION`.

Figure 3.1 Performance Comparison

There is a considerable performance difference between the two indexing variants. Both response times are still well below a tenth of a second so even the slower query is probably fast enough in most cases. However the performance chart shows only one test point. Discussing scalability means to look at the performance impact when changing environmental parameters—such as the data volume.

#### Important

Scalability shows the dependency of performance on factors like the data volume.

A performance value is just a single data point on a scalability chart.

[Figure 3.2](#fig-scale-data) shows the response time over the `SECTION` number—that means for a growing data volume.

## Figure 3.2 Scalability by Data Volume

The chart shows a growing response time for both indexes. On the right hand side of the chart, when the data volume is a hundred times as high, the faster query needs more than twice as long as it originally did while the response time of the slower query increased by a factor of 20 to more than one second.

#### Tip

[Appendix C, “*Example Schema*”](/sql/example-schema) has the scripts to repeat this test in an [Oracle](/sql/example-schema/oracle/performance-testing-scalability), [PostgreSQL](/sql/example-schema/postgresql/performance-testing-scalability) or [SQL Server](/sql/example-schema/sql-server/performance-testing-scalability) database.

The response time of an SQL query depends on many factors. The data volume is one of them. If a query is fast enough under certain testing conditions, it does not mean it will be fast enough in production. That is especially the case in development environments that have only a fraction of the data of the production system.

It is, however, no surprise that the queries get slower when the data volume grows. But the striking gap between the two indexes is somewhat unexpected. What is the reason for the different growth rates?

It should be easy to find the reason by comparing both execution plans.

Db2 (LUW)

```
-------------------------------------------------------------
ID | Operation           |                        Rows | Cost
 1 | RETURN              |                             |  208
 2 |  GRPBY (COMPLETE)   |         1 of 4456 (   .02%) |  208
 3 |   IXSCAN SCALE_SLOW | 4456 of 135449700 (   .00%) |  208
```

```
Explain Plan
-------------------------------------------------------------
ID | Operation           |                        Rows | Cost
 1 | RETURN              |                             |  296
 2 |  GRPBY (COMPLETE)   |         1 of 4456 (   .02%) |  296
 3 |   IXSCAN SCALE_FAST | 4456 of 135449700 (   .00%) |  296
```

MySQL

```javascript
+------+------------+---------+-------+------+-----------------------+
| type | key        | key_len | ref   | rows | Extra                 |
+------+------------+---------+-------+------+-----------------------+
| ref  | scale_slow | 6       | const |    1 | Using index condition |
+------+------------+---------+-------+------+-----------------------+
```

```javascript
+------+------------+---------+-------------+------+-------+
| type | key        | key_len | ref         | rows | Extra |
+------+------------+---------+-------------+------+-------+
| ref  | scale_fast | 12      | const,const |    1 |       |
+------+------------+---------+-------------+------+-------+
```

Oracle

```
------------------------------------------------------
| Id | Operation         | Name       | Rows  | Cost |
------------------------------------------------------
|  0 | SELECT STATEMENT  |            |     1 |  972 |
|  1 |  SORT AGGREGATE   |            |     1 |      |
|* 2 |   INDEX RANGE SCAN| SCALE_SLOW |  3000 |  972 |
------------------------------------------------------
```

```
------------------------------------------------------
| Id   Operation         | Name       | Rows  | Cost |
------------------------------------------------------
|  0 | SELECT STATEMENT  |            |     1 |   13 |
|  1 |  SORT AGGREGATE   |            |     1 |      |
|* 2 |   INDEX RANGE SCAN| SCALE_FAST |  3000 |   13 |
------------------------------------------------------
```

SQL Server ![](/images/use-the-index-luke/sql-testing-scalability-data-volume-0-fig03_mssql_slow.930uegsd.webp)

The execution plan above uses the `scale_slow` index whereas the next plan uses `scale_fast`. Please note that both use an Index Seek operation—thus not giving any hint why the one is slower than the other one.

![](/images/use-the-index-luke/sql-testing-scalability-data-volume-1-fig03_mssql_fast.9FT2aI9e.webp)

With `STATISTICS PROFILE ON` we can see a difference, however:

```
﻿|--Compute Scalar
   |--Stream Aggregate(Count(*))
      |--Index Seek(OBJECT:scale_slow),
         SEEK:(scale_data.section=2),
         WHERE:(scale_data.id2=1234) ORDERED FORWARD)
```

```
﻿|--Compute Scalar
   |--Stream Aggregate(Count(*))
      |--Index Seek(OBJECT:(scale_data.scale_fast),
         SEEK:(scale_data.section=1)
          AND  scale_data.id2=1234) ORDERED FORWARD)
```

The execution plans are almost identical—they just use a different index. Even though the cost values reflect the speed difference, the reason is not visible in the execution plan.

It seems like we are facing a “[slow index experience](/sql/anatomy/slow-indexes)”; the query is slow although it uses an index. Nevertheless we do not believe in the myth of the “[broken index](/sql/myth-directory/indexes-can-degenerate)” anymore. Instead, we remember the two ingredients that make an index lookup slow: (1) the table access, and (2) scanning a wide index range.

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-scale-data&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

Neither execution plan shows a `TABLE ACCESS BY INDEX ROWID` operation so one execution plan must scan a wider index range than the other. So where does an execution plan show the scanned index range? In the predicate information of course!

#### Tip

Pay attention to the predicate information.

The predicate information is by no means an unnecessary detail you can omit as was done above. An execution plan without predicate information is incomplete. That means you cannot see the reason for the performance difference in the plans shown above. If we look at the complete execution plans, we can see the difference.

Db2 (LUW)

```
Explain Plan
-------------------------------------------------------------
ID | Operation           |                        Rows | Cost
 1 | RETURN              |                             |  208
 2 |  GRPBY (COMPLETE)   |         1 of 4456 (   .02%) |  208
 3 |   IXSCAN SCALE_SLOW | 4456 of 135449700 (   .00%) |  208

Predicate Information
 3 - START (Q1.SECTION = ?)
      STOP (Q1.SECTION = ?)
      SARG (Q1.ID2 = ?)
```

```
Explain Plan
-------------------------------------------------------------
ID | Operation           |                        Rows | Cost
 1 | RETURN              |                             |  296
 2 |  GRPBY (COMPLETE)   |         1 of 4456 (   .02%) |  296
 3 |   IXSCAN SCALE_FAST | 4456 of 135449700 (   .00%) |  296

Predicate Information
 3 - START (Q1.SECTION = ?)
     START (Q1.ID2 = ?)
      STOP (Q1.SECTION = ?)
      STOP (Q1.ID2 = ?)
```

Also note the cost values: Although the second index is more efficient, the first one has the lower cost causing the optimizer to chose the worse in case both are present.

MySQL

```javascript
+------+------------+---------+-------+------+-----------------------+
| type | key        | key_len | ref   | rows | Extra                 |
+------+------------+---------+-------+------+-----------------------+
| ref  | scale_slow | 6       | const |    1 | Using index condition |
+------+------------+---------+-------+------+-----------------------+
```

```javascript
+------+------------+---------+-------------+------+-------+
| type | key        | key_len | ref         | rows | Extra |
+------+------------+---------+-------------+------+-------+
| ref  | scale_fast | 12      | const,const |    1 |       |
+------+------------+---------+-------------+------+-------+
```

Oracle

```
------------------------------------------------------
| Id | Operation         | Name       | Rows  | Cost |
------------------------------------------------------
|  0 | SELECT STATEMENT  |            |     1 |  972 |
|  1 |  SORT AGGREGATE   |            |     1 |      |
|* 2 |   INDEX RANGE SCAN| SCALE_SLOW |  3000 |  972 |
------------------------------------------------------

Predicate Information (identified by operation id):
   2 - access("SECTION"=TO_NUMBER(:A))
       filter("ID2"=TO_NUMBER(:B))
```

```
------------------------------------------------------
| Id   Operation         | Name       | Rows  | Cost |
------------------------------------------------------
|  0 | SELECT STATEMENT  |            |     1 |   13 |
|  1 |  SORT AGGREGATE   |            |     1 |      |
|* 2 |   INDEX RANGE SCAN| SCALE_FAST |  3000 |   13 |
------------------------------------------------------

Predicate Information (identified by operation id):
   2 - access("SECTION"=TO_NUMBER(:A) AND "ID2"=TO_NUMBER(:B))
```

SQL Server ![](/images/use-the-index-luke/sql-testing-scalability-data-volume-2-fig03_mssql_slow.930uegsd.webp) ![](/images/use-the-index-luke/sql-testing-scalability-data-volume-3-fig03_mssql_fast.9FT2aI9e.webp)

To see the difference in the graphical execution plan, you need to move the mouse over the `Index Seek` operation and check for “*Predicate*” versus “*Seek Perdicates*”.

```
﻿|--Compute Scalar
   |--Stream Aggregate(Count(*))
      |--Index Seek(OBJECT:scale_slow),
         SEEK:(scale_data.section=2),
         WHERE:(scale_data.id2=1234) ORDERED FORWARD)
```

```
﻿|--Compute Scalar
   |--Stream Aggregate(Count(*))
      |--Index Seek(OBJECT:(scale_data.scale_fast),
         SEEK:(scale_data.section=1)
          AND  scale_data.id2=1234) ORDERED FORWARD)
```

The `WHERE` predicates in the first execution plan mark index-filter predicates—it doesn’t narrow the scanned index range. The second execution plan shows both predicates under `SEEK`, which is the SQL Server term for access predicates.

#### Note

The execution plan was simplified for clarity. [The appendix](/sql/explain-plan/oracle/filter-predicates) explains the details of the “Predicate Information” section in an Oracle execution plan.

The difference is obvious now: only the condition on `SECTION` is an access predicate when using the `SCALE_SLOW` index. The database reads all rows from the section and discards those not matching the filter predicate on `ID2`. The response time grows with the number of rows in the section. With the `SCALE_FAST` index, the database uses all conditions as access predicates. The response time grows with the number of selected rows.

#### Important

Filter predicates are like unexploded ordnance devices. They can explode at any time.

The last missing pieces in our puzzle are the index definitions. Can we reconstruct the index definitions from the execution plans?

The definition of the `SCALE_SLOW` index must start with the column `SECTION`—otherwise it could not be used as access predicate. The condition on `ID2` is not an access predicate—so it cannot follow `SECTION` in the index definition. That means the `SCALE_SLOW` index must have minimally three columns where `SECTION` is the first and `ID2` not the second. That is exactly how it is in the index definition used for this test:

```sql
CREATE INDEX scale_slow ON scale_data (section, id1, id2)
```

The database cannot use `ID2` as access predicate due to column `ID1` in the second position.

The definition of the `SCALE_FAST` index must have columns `SECTION` and `ID2` in the first two positions because both are used for access predicates. We can nonetheless not say anything about their order. The index that was used for the test starts with the `SECTION` column and has the extra column `ID1` in the third position:

```sql
CREATE INDEX scale_fast ON scale_data (section, id2, id1)
```

The column `ID1` was just added so this index has the same size as `SCALE_SLOW`—otherwise you might get the impression the size causes the difference.

#### Links

- Index filter predicates explained: [Greater, Lesser and Between Conditions](/sql/where-clause/searching-for-ranges/greater-less-between-tuning-sql-access-filter-predicates)
- Finding index filter predicates in the [Oracle database](/sql/explain-plan/oracle/filter-predicates), [PostgreSQL](/sql/explain-plan/postgresql/filter-predicates) and [SQL Server](/sql/explain-plan/sql-server/filter-predicates).
- [Indexing LIKE Filters](/sql/where-clause/searching-for-ranges/like-performance-tuning): index access and filter predicates in one expression.

- [Big-O notation](https://en.wikipedia.org/wiki/Big_O_notation): The mathematical approach to scalability.
