---
title: "Combining Columns"
lang: en
---

This section is about a popular obfuscation that affects [concatenated indexes](/sql/where-clause/the-equals-operator/concatenated-keys).

The first example is again about [date and time](/sql/where-clause/obfuscation/dates) types but the other way around. The following MySQL query combines a date and a time column to apply a range filter on both of them.

```sql
SELECT ...
  FROM ...
 WHERE ADDTIME(date_column, time_column)
     > DATE_ADD(now(), INTERVAL -1 DAY)
```

It selects all records from the last 24 hours. The query cannot use a concatenated index on (`DATE_COLUMN`, `TIME_COLUMN`) properly because the search is not done on the indexed columns but on derived data.

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-obf-concat&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

You can avoid this problem by using a data type that has both a date and time component (e.g., MySQL `DATETIME`). You can then use this column without a function call:

```sql
SELECT ...
  FROM ...
 WHERE datetime_column
     > DATE_ADD(now(), INTERVAL -1 DAY)
```

Unfortunately it is often not possible to change the table when facing this problem.

The next option is a [function-based index](/sql/where-clause/functions/case-insensitive-search) if the database supports it—although this has all the drawbacks [discussed before](/sql/where-clause/obfuscation/dates). When using MySQL, function-based indexes are not an option anyway.

It is still possible to write the query so that the database can use a concatenated index on `DATE_COLUMN`, `TIME_COLUMN` with an [access predicate](/sql/where-clause/searching-for-ranges/greater-less-between-tuning-sql-access-filter-predicates#imp-index-predicate-types)—at least partially. For that, we add an extra condition on the `DATE_COLUMN`.

```
 WHERE ADDTIME(date_column, time_column)
     > DATE_ADD(now(), INTERVAL -1 DAY)
   AND date_column
    >= DATE(DATE_ADD(now(), INTERVAL -1 DAY))
```

The new condition is absolutely redundant but it is a straight filter on `DATE_COLUMN` that can be used as access predicate. Even though this technique is not perfect, it is usually a good enough approximation.

#### Tip

Use a redundant condition on the most significant column when a range condition combines multiple columns.

For PostgreSQL, it’s preferable to use the [row values syntax](/sql/partial-results/fetch-next-page#ch07-paging-row-values-example).

You can also use this technique when storing date and time in text columns, but you have to use date and time formats that yields a chronological order when sorted lexically—e.g., as suggested by [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) (`YYYY-MM-DD HH:MM:SS`). The following example uses the Oracle database’s `TO_CHAR` function for that purpose:

```sql
SELECT ...
  FROM ...
 WHERE date_string || time_string
     > TO_CHAR(sysdate - 1, 'YYYY-MM-DD HH24:MI:SS')
   AND date_string
    >= TO_CHAR(sysdate - 1, 'YYYY-MM-DD')
```

We will face the problem of applying a range condition over multiple columns again in the section entitled [“*Paging Through Results*”](/sql/partial-results/fetch-next-page). We’ll also use the same approximation method to mitigate it.

Sometimes we have the reverse case and might want to obfuscate a condition intentionally so it cannot be used anymore as access predicate. We already looked at that problem when discussing the effects of [bind parameters](/sql/where-clause/bind-parameters) on `LIKE` conditions. Consider the following example:

```sql
SELECT last_name, first_name, employee_id
  FROM employees
 WHERE subsidiary_id = ?
   AND last_name LIKE ?
```

Assuming there is an index on `SUBSIDIARY_ID` and another one on `LAST_NAME`, which one is better for this query?

Without knowing the wildcard’s position in the search term, it is impossible to give a qualified answer. The optimizer has no other choice than to “guess”. If *you know* that there is always a leading wild card, you can obfuscate the `LIKE` condition intentionally so that the optimizer can no longer consider the index on `LAST_NAME`.

```sql
SELECT last_name, first_name, employee_id
  FROM employees
 WHERE subsidiary_id = ?
   AND last_name || '' LIKE ?
```

It is enough to append an empty string to the `LAST_NAME` column. This is, however, an option of last resort. Only do it when absolutely necessary.
