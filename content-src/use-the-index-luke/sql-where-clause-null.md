---
title: "`NULL` in the Oracle Database"
lang: en
---

SQL’s `NULL` frequently causes confusion. Although the basic idea of `NULL`—[to represent missing data](https://en.wikipedia.org/wiki/Null_%28SQL%29)—is rather simple, there are some peculiarities. You have to use `IS NULL` instead of `= NULL`, for example. Moreover the Oracle database has additional `NULL` oddities, on the one hand because it does not always handle `NULL` as required by the standard and on the other hand because it has a very “special” handling of `NULL` in indexes.

The SQL standard does not define `NULL` as a value but rather as a placeholder for a missing or unknown value. Consequently, no value can be `NULL`. Instead the Oracle database treats an empty string as `NULL`:

```sql
   SELECT     '0 IS NULL???' AS "what is NULL?" FROM dual
    WHERE      0 IS NULL
UNION ALL
   SELECT    '0 is not null' FROM dual
    WHERE     0 IS NOT NULL
UNION ALL
   SELECT ''''' IS NULL???'  FROM dual
    WHERE    '' IS NULL
UNION ALL
   SELECT ''''' is not null' FROM dual 
    WHERE    '' IS NOT NULL
```

To add to the confusion, there is even a case when the Oracle database treats `NULL` as empty string:

```sql
SELECT dummy
     , dummy || ''
     , dummy || NULL
  FROM dual
```

Concatenating the `DUMMY` column (always containing `'X'`) with `NULL` should return `NULL`.

The concept of `NULL` is used in many programming languages. No matter where you look, an empty string is never `NULL`…except in the Oracle database. It is, in fact, impossible to store an empty string in a `VARCHAR2` field. If you try, the Oracle database just stores `NULL`.

This peculiarity is not only strange; it is also dangerous. Additionally the Oracle database’s `NULL` oddity does not stop here—it continues with indexing.

## Contents

1. *[`NULL` in Indexes](/sql/where-clause/null/index)* — Every index is a partial index
2. *[`NOT NULL` Constraints](/sql/where-clause/null/not-null-constraint)* — affect index usage
3. *[Emulating Partial Indexes](/sql/where-clause/null/partial-index)* — using function-based indexing
