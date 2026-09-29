---
title: "MySQL Example Scripts for “The Where Clause”"
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
CREATE OR REPLACE VIEW generator_16
AS SELECT 0 n UNION ALL SELECT 1  UNION ALL SELECT 2  UNION ALL
   SELECT 3   UNION ALL SELECT 4  UNION ALL SELECT 5  UNION ALL
   SELECT 6   UNION ALL SELECT 7  UNION ALL SELECT 8  UNION ALL
   SELECT 9   UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL
   SELECT 12  UNION ALL SELECT 13 UNION ALL SELECT 14 UNION ALL
   SELECT 15;
```

```sql
CREATE OR REPLACE VIEW generator_256
AS SELECT ( ( hi.n << 4 ) | lo.n ) AS n
     FROM generator_16 lo, generator_16 hi;
```

```sql
CREATE OR REPLACE VIEW generator_4k
AS SELECT ( ( hi.n << 8 ) | lo.n ) AS n
     FROM generator_256 lo, generator_16 hi;
```

```sql
CREATE OR REPLACE VIEW generator_64k
AS SELECT ( ( hi.n << 8 ) | lo.n ) AS n
     FROM generator_256 lo, generator_256 hi;
```

```sql
INSERT INTO employees (employee_id,  first_name,
                       last_name,    date_of_birth, 
                       phone_number, junk)
SELECT gen.n +1,
       GROUP_CONCAT(CHAR((RAND() * 25)+97) SEPARATOR ''),
       GROUP_CONCAT(CHAR((RAND() * 25)+97) SEPARATOR ''),
       SUBDATE(CURDATE(), INTERVAL (RAND()*3650 + 40*365) DAY),
       FLOOR(RAND()*9000+1000),
       'junk'
  FROM generator_4k gen, generator_16 rand
 WHERE gen.n < 1000
 GROUP BY gen.n;
```

```sql
UPDATE employees 
   SET first_name='MARKUS', 
       last_name='WINAND'
 WHERE employee_id=123;
```

```
ANALYZE TABLE employees;
```

Note:

- The `GENERATOR_X` views are row generators as described in the [MySQL Row Generator](/blog/2011-07-30/mysql-row-generator) article.
- The `JUNK` column is used to have a realistic row length. Because it’s data type is `CHAR`, as opposed to `VARCHAR`, it always stores 255 characters. Without this column the table would become unrealistically small and some demonstrations would not work.
- Random data is filled into the table, with exception to my entry, that is updated after the insert.
- Table and index [statistics](/sql/where-clause/the-equals-operator/slow-indexes-part-ii#sb-statistics) are gathered so that the [optimizer](/sql/where-clause/the-equals-operator/slow-indexes-part-ii#sb-optimizer) knows a little bit about the table’s content.

### Concatenated Keys

```sql
-- add subsidiary_id and update existing records
ALTER TABLE employees ADD subsidiary_id NUMERIC;
```

```sql
UPDATE      employees SET subsidiary_id = 30;
```

```sql
ALTER TABLE employees MODIFY subsidiary_id NUMERIC NOT NULL;
```

```sql
-- change the PK
ALTER TABLE employees DROP PRIMARY KEY;
```

```sql
ALTER TABLE employees ADD CONSTRAINT employees_pk 
      PRIMARY KEY (employee_id, subsidiary_id);
```

```sql
-- generate more records (Very Big Company)
INSERT INTO employees (employee_id,  first_name, 
                       last_name,    date_of_birth, 
                       phone_number, subsidiary_id, junk)
SELECT gen.n + 1
     , GROUP_CONCAT(CHAR( RAND()*25 + 97) SEPARATOR '')
     , GROUP_CONCAT(CHAR( RAND()*25 + 97) SEPARATOR '')
     , CURDATE() - INTERVAL (RAND(0)*365*10 + 40*365) DAY
     , FLOOR(RAND()*9000 + 1000)
     , FLOOR(RAND()*(gen.n/9000)*29 + 1)
     , 'junk'
  FROM generator_64k gen, generator_16 rand
 WHERE gen.n < 9000
 GROUP BY gen.n;
```

```
ANALYZE TABLE employees;
```

Notes:

- The new primary key includes by the `SUBSIDIARY_ID`; that is, the `EMPLOYEE_ID` remains in the first position.
- The new records are randomly assigned to the subsidiaries 1 through 29.
- The table and index are analyzed again to make the optimizer aware of the grown data volume.

The next script introduces the index on `SUBSIDIARY_ID` to support the query for all employees of one particular subsidiary:

```sql
ALTER TABLE employees ADD INDEX emp_sub_id (subsidiary_id)
```

Although that gives decent performance, it’s better to use the index that supports the primary key:

```sql
-- use tmp index to support the PK
ALTER TABLE employees
  ADD UNIQUE INDEX tmp (employee_id, subsidiary_id);
```

```sql
ALTER TABLE employees
 DROP PRIMARY KEY;
```

```sql
ALTER TABLE employees
  ADD PRIMARY KEY (subsidiary_id, employee_id);
```

```sql
ALTER TABLE employees
 DROP INDEX tmp;
```

```sql
ALTER TABLE employees
 DROP INDEX emp_sub_id;
```

```
ANALYZE TABLE employees;
```

Notes:

- A new unique index is created and used to substitute the PK.
- The primary key is dropped and re-created with the new column order.
- The temporary index is dropped, as well as the index on the subsidiary id that isn’t required anymore.

## Functions

MySQL uses a case-insensitive collation per default. Further, MySQL did not support function-based indexes prior version 5.7. In that case, you don’t need a function-based index, a regular one will do as well:

```sql
CREATE INDEX emp_name ON employees (last_name)
```

Starting with 5.7, computed columns can be indexed in MySQL:

User-defined functions cannot be used in generated columns—not even when they are deterministic and declared deterministic.

```sql
CREATE FUNCTION get_age(date_of_birth DATE)
RETURNS INTEGER NO SQL
RETURN TIMESTAMPDIFF(YEAR,date_of_birth,CURDATE());
```

```sql
ALTER TABLE employees
  ADD COLUMN last_name_up VARCHAR(255) AS (UPPER(last_name));
```

```sql
CREATE INDEX emp_up_name ON employees (last_name_up);
```
