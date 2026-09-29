---
title: "SQLite Example Scripts for “The Where Clause”"
lang: en
---

## The Equals Operator

### Surrogate Keys

Creating the `EMPLOYEES` table with 1000 rows.

```sql
CREATE TABLE employees (
   employee_id   NUMERIC      NOT NULL,
   first_name    VARCHAR(255) NOT NULL,
   last_name     VARCHAR(255) NOT NULL,
   date_of_birth DATE                 ,
   phone_number  VARCHAR(255) NOT NULL,
   junk          CHAR(255)            ,
   CONSTRAINT employees_pk PRIMARY KEY (employee_id)
);
```

```sql
CREATE VIEW generator_16
AS SELECT 0 n UNION ALL SELECT 1  UNION ALL SELECT 2  UNION ALL
   SELECT 3   UNION ALL SELECT 4  UNION ALL SELECT 5  UNION ALL
   SELECT 6   UNION ALL SELECT 7  UNION ALL SELECT 8  UNION ALL
   SELECT 9   UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL
   SELECT 12  UNION ALL SELECT 13 UNION ALL SELECT 14 UNION ALL
   SELECT 15;
```

```sql
CREATE VIEW generator_256
AS SELECT ( ( hi.n << 4 ) | lo.n ) AS n
     FROM generator_16 lo, generator_16 hi;
```

```sql
CREATE VIEW generator_4k
AS SELECT ( ( hi.n << 8 ) | lo.n ) AS n
     FROM generator_256 lo, generator_16 hi;
```

```sql
CREATE VIEW generator_64k
AS SELECT ( ( hi.n << 8 ) | lo.n ) AS n
     FROM generator_256 lo, generator_256 hi;
```

```sql
INSERT INTO employees (employee_id,  first_name,
                       last_name,    date_of_birth, 
                       phone_number, junk)
SELECT gen.n +1,
       CHAR( ABS(random()) % 26 + 65
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           ),
       CHAR( ABS(random()) % 26 + 65
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           ),
       DATE('now', '-' || (abs(random()) % 3650 + 40*365) || ' day'),
       ABS(RANDOM())%9000+1000,
       printf('%.1000c','x')
  FROM generator_4k gen
 WHERE gen.n < 1000;
```

```sql
UPDATE employees 
   SET first_name='MARKUS', 
       last_name='WINAND'
 WHERE employee_id=123;
```

```
ANALYZE employees;
```

Note:

- The `GENERATOR_X` views are row generators as described in the [MySQL Row Generator](/blog/2011-07-30/mysql-row-generator) article. In the meanwhile, SQLite supports the [recursive WITH clause (since 3.8.3)](https://modern-sql.com/caniuse/with_recursive_(top_level)) but this approach works with even older versions of SQLite.
- The `JUNK` column is used to have a realistic row length. Without this column the table would become unrealistically small and some demonstrations would not work.
- Random data is filled into the table, with exception to my entry, that is updated after the insert.
- Table and index [statistics](/sql/where-clause/the-equals-operator/slow-indexes-part-ii#sb-statistics) are gathered so that the [optimizer](/sql/where-clause/the-equals-operator/slow-indexes-part-ii#sb-optimizer) knows a little bit about the table’s content.

### Concatenated Keys

```
DROP TABLE employees;
```

```sql
CREATE TABLE employees (
   employee_id   NUMERIC      NOT NULL,
   first_name    VARCHAR(255) NOT NULL,
   last_name     VARCHAR(255) NOT NULL,
   date_of_birth DATE                 ,
   phone_number  VARCHAR(255) NOT NULL,
   junk          CHAR(255)            ,
   subsidiary_id NUMERIC      NOT NULL,
   CONSTRAINT employees_pk PRIMARY KEY (employee_id, subsidiary_id)
);
```

```sql
INSERT INTO employees (employee_id,  first_name,
                       last_name,    date_of_birth, 
                       phone_number, junk, subsidiary_id)
SELECT gen.n +1,
       CHAR( ABS(random()) % 26 + 65
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           ),
       CHAR( ABS(random()) % 26 + 65
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           ),
       DATE('now', '-' || (abs(random()) % 3650 + 40*365) || ' day'),
       ABS(RANDOM())%9000+1000,
       printf('%.1000c','x'),
       30
  FROM generator_4k gen
 WHERE gen.n < 1000;
```

```sql
UPDATE employees 
   SET first_name='MARKUS', 
       last_name='WINAND'
 WHERE employee_id=123
   AND subsidiary_id=30;
```

```sql
-- generate more records (Very Big Company)
INSERT INTO employees (employee_id,  first_name, 
                       last_name,    date_of_birth, 
                       phone_number, subsidiary_id, junk)
SELECT gen.n + 1,
       CHAR( ABS(random()) % 26 + 65
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           ),
       CHAR( ABS(random()) % 26 + 65
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           ),
       DATE('now', '-' || (abs(random()) % 3650 + 40*365) || ' day'),
       ABS(RANDOM())%9000+1000,
       CAST(ABS(RANDOM())%(gen.n/9000.0 * 29 + 1) + 1 AS INTEGER),
       printf('%.10c','x')
  FROM generator_64k gen
 WHERE gen.n < 9000;
```

```
ANALYZE employees;
```

Notes:

- As SQLite cannot change primary keys using ALTER TABLE, the entire table is dropped and recreated.
- The new primary key includes by the `SUBSIDIARY_ID`; that is, the `EMPLOYEE_ID` remains in the first position.
- The new records are randomly assigned to the subsidiaries 1 through 29.
- The table and index are analyzed again to make the optimizer aware of the grown data volume.

The next script introduces the index on `SUBSIDIARY_ID` to support the query for all employees of one particular subsidiary:

```sql
CREATE INDEX emp_sub_id ON employees(subsidiary_id)
```

Although that gives decent performance, it’s better to use the index that supports the primary key:

```
DROP TABLE employees;
```

```sql
CREATE TABLE employees (
   employee_id   NUMERIC      NOT NULL,
   first_name    VARCHAR(255) NOT NULL,
   last_name     VARCHAR(255) NOT NULL,
   date_of_birth DATE                 ,
   phone_number  VARCHAR(255) NOT NULL,
   junk          CHAR(255)            ,
   subsidiary_id NUMERIC      NOT NULL,
   CONSTRAINT employees_pk PRIMARY KEY (subsidiary_id, employee_id)
);
```

```sql
INSERT INTO employees (employee_id,  first_name,
                       last_name,    date_of_birth, 
                       phone_number, junk, subsidiary_id)
SELECT gen.n +1,
       CHAR( ABS(random()) % 26 + 65
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           ),
       CHAR( ABS(random()) % 26 + 65
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           ),
       DATE('now', '-' || (abs(random()) % 3650 + 40*365) || ' day'),
       ABS(RANDOM())%9000+1000,
       printf('%.1000c','x'),
       30
  FROM generator_4k gen
 WHERE gen.n < 1000;
```

```sql
UPDATE employees 
   SET first_name='MARKUS', 
       last_name='WINAND'
 WHERE employee_id=123
   AND subsidiary_id=30;
```

```sql
-- generate more records (Very Big Company)
INSERT INTO employees (employee_id,  first_name, 
                       last_name,    date_of_birth, 
                       phone_number, subsidiary_id, junk)
SELECT gen.n + 1,
       CHAR( ABS(random()) % 26 + 65
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           ),
       CHAR( ABS(random()) % 26 + 65
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           , ABS(random()) % 26 + 97
           ),
       DATE('now', '-' || (abs(random()) % 3650 + 40*365) || ' day'),
       ABS(RANDOM())%9000+1000,
       CAST(ABS(RANDOM())%(gen.n/9000.0 * 29 + 1) + 1 AS INTEGER),
       printf('%.10c','x')
  FROM generator_64k gen
 WHERE gen.n < 9000;
```

```
ANALYZE employees;
```

Notes:

- Everything is recreated again, as SQLite doesn’t support modifying the primary key.

## Functions

SQLite doesn’t support `create function` syntax, thus we need to use the expression to calculate the current age directly into the query.

```sql
SELECT first_name, last_name
     , CAST(STRFTIME('%Y.%m%d', 'now') - STRFTIME('%Y.%m%d', date_of_birth) AS INT)
  FROM employees
 WHERE CAST(STRFTIME('%Y.%m%d', 'now') - STRFTIME('%Y.%m%d', date_of_birth) AS INT) = 42
```

Note that the age is calculated by [formatting the dates as fractional years](https://stackoverflow.com/questions/3123951/sqlite-how-to-calculate-age-from-birth-date/17501785#17501785).

Expressions can be indexed if they are deterministic.

```sql
CREATE INDEX emp_age ON employees
     ( CAST(STRFTIME('%Y.%m%d', 'now') - STRFTIME('%Y.%m%d', date_of_birth) AS INT) )
```

```
Error: non-deterministic use of strftime() in an index
```
