---
title: "Emulating Partial Indexes in the Oracle Database"
lang: en
---

The strange way the Oracle database handles `NULL` in indexes can be used to emulate partial indexes. For that, we just have to use `NULL` for rows that should not be indexed.

To demonstrate, we emulate the following partial index:

```sql
CREATE INDEX messages_todo
          ON messages (receiver)
       WHERE processed = 'N'
```

First, we need a function that returns the `RECEIVER` value only if the `PROCESSED` value is `'N'`.

```sql
CREATE OR REPLACE
FUNCTION pi_processed(processed CHAR, receiver NUMBER)
RETURN NUMBER
DETERMINISTIC
AS BEGIN
   IF processed IN ('N') THEN
      RETURN receiver;
   ELSE
      RETURN NULL;
   END IF;
END
```

The function must be [deterministic so it can be used in an index definition](/sql/where-clause/functions/user-defined-functions).

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-partial-indexes-oracle&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

Now we can create an index that contains only the rows having `PROCESSED='N'`.

```sql
CREATE INDEX messages_todo
          ON messages (pi_processed(processed, receiver))
```

To use the index, you must use the indexed expression in the query:

```sql
SELECT message
  FROM messages
 WHERE pi_processed(processed, receiver) = ?
```

```
----------------------------------------------------------
|Id | Operation                   | Name          | Cost |
----------------------------------------------------------
| 0 | SELECT STATEMENT            |               | 5330 |
| 1 |  TABLE ACCESS BY INDEX ROWID| MESSAGES      | 5330 |
|*2 |   INDEX RANGE SCAN          | MESSAGES_TODO | 5303 |
----------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
   2 - access("PI_PROCESSED"("PROCESSED","RECEIVER")=:X)
```

## Partial Indexes, Part II

As of release 11*g*, there is a second—equally scary—approach to emulating partial indexes in the Oracle database by using an intentionally broken index partition and the [`SKIP_UNUSABLE_INDEXES`](https://docs.oracle.com/en/database/oracle/oracle-database/19/refrn/SKIP_UNUSABLE_INDEXES.html) parameter.
