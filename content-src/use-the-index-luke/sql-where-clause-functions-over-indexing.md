---
title: "Over-Indexing"
lang: en
---

If the concept of function-based indexing is new to you, you might be tempted to just index everything, but this is in fact the very last thing you should do. The reason is that every index causes ongoing maintenance. Function-based indexes are particularly troublesome because they make it very easy to create *redundant indexes*.

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-over-indexing&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

The [case-insensitive search from above](/sql/where-clause/functions/case-insensitive-search) could be implemented with the `LOWER` function as well:

```sql
SELECT first_name, last_name, phone_number
  FROM employees
 WHERE LOWER(last_name) = LOWER('winand')
```

A single index cannot support both methods of ignoring the case. We could, of course, create a second index on `LOWER(last_name)` for this query, but that would mean the database has to maintain two indexes for each `insert`, `update`, and `delete` statement (see also [Chapter 8, “*Modifying Data*”](/sql/dml)). To make one index suffice, you should consistently use the same function throughout your application.

#### Tip

Unify the access path so that one index can be used by several queries.

#### Warning

Sometimes ORM tools use `UPPER` and `LOWER` without the developer’s knowledge. Hibernate, for example, [injects an implicit `LOWER`](/sql/myth-directory/dynamic-sql-is-slow#myth-dynamic-sql-sample) for case-insensitive searches.

#### Tip

Always aim to index the original data as that is often the most useful information you can put into an index.
