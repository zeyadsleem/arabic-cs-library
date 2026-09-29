---
title: "Clustered Index / Non-Clustered Index"
lang: en
---

A clustered index (SQL Server, MySQL/InnoDB) is a table stored in an index B-Tree structure. There is no second data structure ([heap-table](/sql/glossary/heap-table)) for the table.

A non-clustered index is an index that refers to another data structure containing further table columns.

Accessing table data via a [secondary index](/sql/glossary/secondary-index) (index on a clustered index) is slower than a similar query on a [heap-table](/sql/glossary/heap-table).

SQL Server supports clustered index optionally. You have a free choice between clustered indexes and heap-tables. There can be at most one clustered index per table. Dropping a clustered index transforms the table into a [heap-table](/sql/glossary/heap-table). Adding a clustered index to a heap table actually drops the heap structure. SQL Server supports non-unique clustered indexes on arbitrary columns. Creating an SQL Server table without clustering index requires the use of the `NONCLUSTERED` clause:

```sql
CREATE TABLE (
   id    NUMBER NOT NULL,
   [...]
   CONSTRAINT pk PRIMARY KEY NONCLUSTERED (id)
)
```

The MySQL InnoDB engine has [mandatory clustered indexes](https://dev.mysql.com/doc/refman/8.0/en/innodb-index-types.html). That means there is always a clustered index, often using the primary key. If there is no suitable unique key available, MySQL will use a generated row ID for that purpose. The MyISAM storage engine doesn’t support clustered indexes and uses heap-tables all the time.

The Oracle database has optional clustered indexes called [Index-Organized Tables](/sql/glossary/index-organized-table). They work on the primary key only.

#### Links

- Book-Section: [Index-Organized Tables](/sql/clustering/index-organized-clustered-index)
- Glossary: [Heap-Table](/sql/glossary/heap-table) — Tables stored in an unordered fashion.
- Glossary: [Secondary Index](/sql/glossary/secondary-index) — Other indexes on a clustered index
