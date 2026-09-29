---
title: "Indexing `NULL`"
lang: en
---

The Oracle database does not include rows in an index if all indexed columns are `NULL`. That means that every index is a [partial index](/sql/where-clause/partial-and-filtered-indexes)—like having a `where` clause:

```sql
CREATE INDEX idx
          ON tbl (A, B, C, ...)
       WHERE A IS NOT NULL
          OR B IS NOT NULL
          OR C IS NOT NULL
             ...
```

Consider the `EMP_DOB` index. It has only one column: the `DATE_OF_BIRTH`. A row that does not have a `DATE_OF_BIRTH` value is not added to this index.

```sql
INSERT INTO employees ( subsidiary_id, employee_id
                      , first_name   , last_name
                      , phone_number)
               VALUES ( ?, ?, ?, ?, ? )
```

The `insert` statement does not set the `DATE_OF_BIRTH` so it defaults to `NULL`—hence, the record is not added to the `EMP_DOB` index. As a consequence, the index cannot support a query for records where `DATE_OF_BIRTH` `IS NULL`:

```sql
SELECT first_name, last_name
  FROM employees
 WHERE date_of_birth IS NULL
```

Nevertheless, the record is inserted into a concatenated index if at least one index column is not `NULL`:

```sql
CREATE INDEX demo_null
          ON employees (subsidiary_id, date_of_birth)
```

The above created row is added to the index because the `SUBSIDIARY_ID` is not `NULL`. This index can thus support a query for all employees of a specific subsidiary that have no `DATE_OF_BIRTH` value:

```sql
SELECT first_name, last_name
  FROM employees
 WHERE subsidiary_id = ?
   AND date_of_birth IS NULL
```

Please note that the index covers the entire `where` clause; all filters are used as access predicates during the `INDEX RANGE SCAN`.

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-indexingnull&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

We can extend this concept for the original query to find all records where `DATE_OF_BIRTH` `IS NULL`. For that, the `DATE_OF_BIRTH` column has to be the leftmost column in the index so that it can be used as access predicate. Although we do not need a second index column for the query itself, we add another column that can never be `NULL` to make sure the index has all rows. We can use any column that has a `NOT NULL` constraint, like `SUBSIDIARY_ID`, for that purpose.

Alternatively, we can use a constant expression that can never be `NULL`. That makes sure the index has all rows—even if `DATE_OF_BIRTH` is `NULL`.

```
DROP   INDEX emp_dob
```

```sql
CREATE INDEX emp_dob ON employees (date_of_birth, 'X')
```

Technically, this index is a [function-based index](/sql/where-clause/functions/case-insensitive-search). This example also dis­proves the myth that the Oracle database cannot index `NULL`.

#### Tip

Add a column that cannot be `NULL` to index `NULL` like any value.
