---
title: "`NOT NULL` Constraints"
lang: en
---

To index an `IS NULL` condition in the Oracle database, the index must have a column that can never be `NULL`.

That said, it is not enough that there are no `NULL` entries. The database has to be sure there can never be a `NULL` entry, otherwise the database must assume that the table has rows that are not in the index.

#### If you like this page, you might also like …

… to [subscribe my **mailing lists**](https://winand.at/lists), [get **free stickers**](https://use-the-index-luke.com/shop), [buy **my book**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-knowingnotnull&utm_medium=web) or [join a **training**](https://winand.at/sql-training/open-online-class).

The following index supports the query only if the column `LAST_NAME` has a `NOT NULL` constraint:

```
DROP INDEX emp_dob
```

```sql
CREATE INDEX emp_dob_name
          ON employees (date_of_birth, last_name)
```

```sql
SELECT *
  FROM employees
 WHERE date_of_birth IS NULL
```

Removing the `NOT NULL` constraint renders the index unusable for this query:

```sql
ALTER TABLE employees MODIFY last_name NULL
```

```sql
SELECT *
  FROM employees
 WHERE date_of_birth IS NULL
```

#### Tip

A missing `NOT NULL` constraint can prevent index usage in an Oracle database—especially for `count(*)` queries.

Besides `NOT NULL` constraints, the database also knows that constant expressions like in the [previous section](/sql/where-clause/null/index) cannot become `NULL`.

An index on a user-defined function, however, does not impose a `NOT NULL` constraint on the index expression:

```sql
CREATE OR REPLACE FUNCTION blackbox(id IN NUMBER) RETURN NUMBER
DETERMINISTIC
IS BEGIN
   RETURN id;
END
```

```
DROP INDEX emp_dob_name
```

```sql
CREATE INDEX emp_dob_bb 
    ON employees (date_of_birth, blackbox(employee_id))
```

```sql
SELECT *
  FROM employees
 WHERE date_of_birth IS NULL
```

```
----------------------------------------------------
| Id | Operation         | Name      | Rows | Cost |
----------------------------------------------------
|  0 | SELECT STATEMENT  |           |    1 |  477 |
|* 1 |  TABLE ACCESS FULL| EMPLOYEES |    1 |  477 |
----------------------------------------------------
```

The function name `BLACKBOX` emphasizes the fact that the optimizer has no idea what the function does (see [“*Case-Insensitive Search Using `UPPER` or `LOWER`*”](/sql/where-clause/functions/case-insensitive-search)). We can see that the function passes the input value straight through, but for the database it is just a function that returns a number. The `NOT NULL` property of the parameter is lost. Although the index must have all rows, the database does not know that so it cannot use the index for the query.

If *you know* that the function never returns `NULL`, as in this example, you can change the query to reflect that:

```sql
SELECT *
  FROM employees
 WHERE date_of_birth IS NULL
   AND blackbox(employee_id) IS NOT NULL
```

```
-------------------------------------------------------------
|Id |Operation                   | Name       | Rows | Cost |
-------------------------------------------------------------
| 0 |SELECT STATEMENT            |            |    1 |    3 |
| 1 | TABLE ACCESS BY INDEX ROWID| EMPLOYEES  |    1 |    3 |
|*2 |  INDEX RANGE SCAN          | EMP_DOB_BB |    1 |    2 |
-------------------------------------------------------------
```

The extra condition in the `where` clause is always true and therefore does not change the result. Nevertheless the Oracle database recognizes that you only query rows that must be in the index per definition.

There is, unfortunately, no way to tag a function that never returns `NULL` but you can move the function call to a [virtual column](https://modern-sql.com/caniuse/generated-always-as) (since 11*g*) and put a `NOT NULL` constraint on this column.

```sql
ALTER TABLE employees ADD bb_expression
      GENERATED ALWAYS AS (blackbox(employee_id)) NOT NULL
```

```
DROP   INDEX emp_dob_bb
```

```sql
CREATE INDEX emp_dob_bb 
    ON employees (date_of_birth, bb_expression)
```

```sql
SELECT *
  FROM employees
 WHERE date_of_birth IS NULL
   AND blackbox(employee_id) IS NOT NULL
```

```
-------------------------------------------------------------
|Id |Operation                   | Name       | Rows | Cost |
-------------------------------------------------------------
| 0 |SELECT STATEMENT            |            |    1 |    3 |
| 1 | TABLE ACCESS BY INDEX ROWID| EMPLOYEES  |    1 |    3 |
|*2 |  INDEX RANGE SCAN          | EMP_DOB_BB |    1 |    2 |
-------------------------------------------------------------
```

The Oracle database knows that some internal functions only return `NULL` if `NULL` is provided as input.

```
DROP INDEX emp_dob_bb
```

```sql
CREATE INDEX emp_dob_upname 
    ON employees (date_of_birth, upper(last_name))
```

```sql
SELECT *
  FROM employees
 WHERE date_of_birth IS NULL
```

```
----------------------------------------------------------
|Id |Operation                   | Name           | Cost |
----------------------------------------------------------
| 0 |SELECT STATEMENT            |                |    3 |
| 1 | TABLE ACCESS BY INDEX ROWID| EMPLOYEES      |    3 |
|*2 |  INDEX RANGE SCAN          | EMP_DOB_UPNAME |    2 |
----------------------------------------------------------
```

The `UPPER` function preserves the `NOT NULL` property of the `LAST_NAME` column. Removing the constraint, however, renders the index unusable:

```sql
ALTER TABLE employees MODIFY last_name NULL
```

```sql
SELECT *
  FROM employees
 WHERE date_of_birth IS NULL
```

```
----------------------------------------------------
| Id | Operation         | Name      | Rows | Cost |
----------------------------------------------------
|  0 | SELECT STATEMENT  |           |    1 |  477 |
|* 1 |  TABLE ACCESS FULL| EMPLOYEES |    1 |  477 |
----------------------------------------------------
```
