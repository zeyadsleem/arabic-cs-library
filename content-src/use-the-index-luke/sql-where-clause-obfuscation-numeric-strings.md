---
title: "Numeric Strings"
lang: en
---

Numeric strings are numbers that are stored in text columns. Although it is a very bad practice, it does not automatically render an index useless if you consistently treat it as string:

```sql
SELECT ...
  FROM ...
 WHERE numeric_string = '42'
```

Of course this statement can use an index on `NUMERIC_STRING`. If you compare it using a number, however, the database can no longer use this condition as an [access predicate](/sql/where-clause/searching-for-ranges/greater-less-between-tuning-sql-access-filter-predicates#imp-index-predicate-types).

```sql
SELECT ...
  FROM ...
 WHERE numeric_string = 42
```

Note the missing quotes. Although some database yield an error (e.g. PostgreSQL) many databases just add an implicit type conversion.

```sql
SELECT ...
  FROM ...
 WHERE CAST(numeric_string AS INT) = 42
```

It is the same problem as before. An index on `NUMERIC_STRING` cannot be used due to the function call. The solution is also the same as before: do not convert the table column, instead convert the search term.

```sql
SELECT ...
  FROM ...
 WHERE numeric_string = CAST(42 AS VARCHAR(10))
```

You might wonder why the database does not do it this way automatically? I think it is because converting a string to a number always gives an unambiguous result. This is not true the other way around. A number, formatted as text, can contain spaces, punctation, and leading zeros. A single value can be written in many ways:

```
42
042
0042
00042
...
```

The database cannot know the number format used in the `NUMERIC_STRING` column so it does it the other way around: the database converts the strings to numbers—this is an unambiguous transformation.

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-numeric-strings&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

The `CAST AS VARCHAR` expression returns only one string representation of the number. It will therefore only match the first of above listed strings. If we use `CAST AS INT`, it matches all of them. That means there is not only a performance difference between the two variants but also a semantic difference!

Using numeric strings is generally troublesome: most importantly it causes performance problems due to the implicit conversion and also introduces a risk of running into conversion errors due to invalid numbers. Even the most trivial query that does not use any functions in the `where` clause can cause an abort with a conversion error if there is just one invalid number stored in the table.

#### Tip

Use numeric types to store numbers.

Note that the problem does not exist the other way around:

```sql
SELECT ...
  FROM ...
 WHERE numeric_number = '42'
```

The database will consistently transform the string into a number. It does not apply a function on the potentially indexed column: a regular index will therefore work. Nevertheless it is possible to do a manual conversion the wrong way:

```sql
SELECT ...
  FROM ...
 WHERE TO_CHAR(numeric_number) = '42'
```
