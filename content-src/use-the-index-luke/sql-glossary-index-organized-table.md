---
title: "Index-Organized Table"
lang: en
---

An Oracle index-organized Table is a table stored in an index B-Tree structure. There is no second data structure ([heap-table](/sql/glossary/heap-table)) for the table. The Oracle database always uses the primary key as clustering key. An Index-Organized Table is created with the `ORGANIZATION INDEX` clause:

```sql
CREATE TABLE (
   id    NUMBER NOT NULL PRIMARY KEY,
   [...]
) ORGANIZATION INDEX
```

Accessing table data via a [secondary index](/sql/glossary/secondary-index) is slower than a similar query on a [heap-table](/sql/glossary/heap-table).

SQL Server supports index-organized tables as well, but uses the term [clustered index](/sql/glossary/clustered-index).

#### Links

- Book-Section: [Index-Organized Tables](/sql/clustering/index-organized-clustered-index)
- Glossary: [Heap-Table](/sql/glossary/heap-table) — Tables stored in an unordered fashion.
- Glossary: [Secondary Index](/sql/glossary/secondary-index) — Other indexes on a clustered index
