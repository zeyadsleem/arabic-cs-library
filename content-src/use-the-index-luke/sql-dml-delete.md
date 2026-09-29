---
title: "Delete"
lang: en
---

Unlike the `insert` statement, the `delete` statement has a `where` clause that can use all the methods described in [Chapter 2, “*The Where Clause*”](/sql/where-clause), to benefit directly from indexes. In fact, the `delete` statement works like a `select` that is followed by an extra step to delete the identified rows.

The actual deletion of a row is a similar process to inserting a new one—especially the removal of the references from the indexes and the activities to keep the index trees in balance. The performance chart shown in [Figure 8.2](#fig_delete) is therefore very similar to the one [shown for `insert`](/sql/dml/insert).

Figure 8.2 Delete Performance by Number of Indexes

In theory, we would expect the best `delete` performance for a table without any indexes—as it is for `insert`. If there is no index, however, the database must read the full table to find the rows to be deleted. That means deleting the row would be fast but finding would be very slow. This case is therefore not shown in [Figure 8.2](#fig_delete).

Nevertheless it can make sense to execute a `delete` statement without an index just as it can make sense to execute a `select` statement without an index if it returns a large part of the table.

#### Tip

Even `delete` and `update` statements have an [execution plan](/sql/explain-plan).

A `delete` statement without `where` clause is an obvious example in which the database cannot use an index, although this is a special case that has its own SQL command: `truncate table`. This command has the same effect as `delete` without `where` except that it deletes all rows in one shot. It is very fast but has two important side effects: (1) it does an implicit `commit` (exceptions: [PostgreSQL](https://www.postgresql.org/docs/current/sql-truncate.html) and SQL Server); (2) it does not execute any triggers.

## Side Effects of MVCC

Multiversion concurrency control (MVCC) is a database mechanism that enables non-blocking concurrent data access and a consistent transaction view. The implementations, however, differ from database to database and might even have considerable effects on performance.

The PostgreSQL database, for example, only keeps the version information (=visibility information) on the table level: deleting a row just sets the “deleted” flag in the table block. PostgreSQL’s delete performance therefore *does not* depend on the number of indexes on the table. The physical deletion of the table row and the related index maintenance is carried out only during the [VACUUM](https://www.postgresql.org/docs/current/sql-vacuum.html) process.
