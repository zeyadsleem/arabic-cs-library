---
title: "The Oracle Database Cannot Index NULL"
lang: en
---

The source of this myth is rather easy to understand when you look at the correctly expressed statement:

> The Oracle database does not include rows into an index if all indexed columns are `NULL`.

The difference between the myth and the reality is small—it seems that the myth is a sloppy form of the truth.

The truth is that `NULL` can be indexed by adding another not nullable column to the index:

```sql
CREATE INDEX with_null ON table_name (nullable_column, 'X');
```
