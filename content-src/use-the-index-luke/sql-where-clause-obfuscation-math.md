---
title: "Math"
lang: en
---

There is one more class of obfuscations that is smart and prevents proper index usage. Instead of using logic expressions it is using a calculation.

Consider the following statement. Can it use an index on `NUMERIC_NUMBER`?

```sql
SELECT numeric_number
  FROM table_name
 WHERE numeric_number - 1000 > ?
```

Similarly, can the following statement use an index on `A` and `B`—you choose the order?

```sql
SELECT a, b
  FROM table_name
 WHERE 3*a + 5 = b
```

Let’s put these questions into a different perspective; if you were developing an SQL database, would you add an equation solver? Most database vendors just say “No!” and thus, neither of the two examples uses the index.

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-obf-math&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

You can even use math to obfuscate a condition intentionally—[as we did it previously for the full text `LIKE` search](/sql/where-clause/obfuscation/concatenation). It is enough to add zero, for example:

```sql
SELECT numeric_number
  FROM table_name
 WHERE numeric_number + 0 = ?
```

Nevertheless we can index these expressions with a [function-based index](/sql/where-clause/functions/case-insensitive-search) if we use calculations in a smart way and transform the `where` clause like an equation:

```sql
SELECT a, b
  FROM table_name
 WHERE 3*a - b = -5
```

We just moved the table references to the one side and the constants to the other. We can then create a function-based index for the left hand side of the equation:

```sql
CREATE INDEX math ON table_name (3*a - b)
```
