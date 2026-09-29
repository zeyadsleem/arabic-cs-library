---
title: "PostgreSQL Example Scripts for “The Where Clause”"
lang: en
---

The scripts provided in this appendix are ready to run and were tested on the PostgreSQL 9. Most of the examples will also work earlier releases.

## The Equals Operator

### Surrogate Keys

The following script creates the `EMPLOYEES` table with 1000 entries.

```sql
CREATE TABLE employees (
   employee_id   NUMERIC       NOT NULL,
   first_name    VARCHAR(1000) NOT NULL,
   last_name     VARCHAR(1000) NOT NULL,
   date_of_birth DATE                  ,
   phone_number  VARCHAR(1000) NOT NULL,
   junk          CHAR(1000)            ,
   CONSTRAINT employees_pk PRIMARY KEY (employee_id)
);
```

```sql
CREATE FUNCTION random_string(minlen NUMERIC, maxlen NUMERIC)
RETURNS VARCHAR(1000)
AS
$$
DECLARE
  rv VARCHAR(1000) := '';
  i  INTEGER := 0;
  len INTEGER := 0;
BEGIN
  IF maxlen < 1 OR minlen < 1 OR maxlen < minlen THEN
    RETURN rv;
  END IF;

  len := floor(random()*(maxlen-minlen)) + minlen;

  FOR i IN 1..floor(len) LOOP
    rv := rv || chr(97+CAST(random() * 25 AS INTEGER));
  END LOOP;
  RETURN rv;
END;
$$ LANGUAGE plpgsql;
```

```sql
INSERT INTO employees (employee_id,  first_name,
                       last_name,    date_of_birth, 
                       phone_number, junk)
SELECT GENERATE_SERIES
     , initcap(lower(random_string(2, 8)))
     , initcap(lower(random_string(2, 8)))
     , CURRENT_DATE - CAST(floor(random() * 365 * 10 + 40 * 365) AS NUMERIC) * INTERVAL '1 DAY'
     , CAST(floor(random() * 9000 + 1000) AS NUMERIC)
     , 'junk'
  FROM GENERATE_SERIES(1, 1000);
```

```sql
UPDATE employees 
   SET first_name='MARKUS', 
       last_name='WINAND'
 WHERE employee_id=123;
```

```
VACUUM ANALYZE employees;
```

Notes:

- The `JUNK` column is used to have a realistic row length. Because it’s data type is `CHAR`, as opposed to `VARCHAR`, it always needs the 1000 bytes it can hold. Without this column the table would become unrealistically small and many demonstrations would not work.
- Random data is filled into the table, with exception to my entry, that is updated after the insert.
- Table [statistics](/sql/where-clause/the-equals-operator/slow-indexes-part-ii#sb-statistics) are gathered so that the [optimizer](/sql/where-clause/the-equals-operator/slow-indexes-part-ii#sb-optimizer) knows a little bit about the table’s content.

### Concatenated Keys

This script changes the `EMPLOYEES` table so that it reflects the situation after the merger with Very Big Company:

```sql
-- add subsidiary_id and update existing records
ALTER TABLE employees ADD subsidiary_id NUMERIC;
UPDATE      employees SET subsidiary_id = 30;
ALTER TABLE employees ALTER COLUMN subsidiary_id SET NOT NULL;

-- change the PK
ALTER TABLE employees DROP CONSTRAINT employees_pk;
ALTER TABLE employees ADD CONSTRAINT employees_pk
      PRIMARY KEY (employee_id, subsidiary_id);

-- generate more records (Very Big Company)
INSERT INTO employees (employee_id,  first_name,
                       last_name,    date_of_birth, 
                       phone_number, subsidiary_id, junk)
SELECT GENERATE_SERIES
     , initcap(lower(random_string(2, 8)))
     , initcap(lower(random_string(2, 8)))
     , CURRENT_DATE - CAST(floor(random() * 365 * 10 + 40 * 365) AS NUMERIC) * INTERVAL '1 DAY'
     , CAST(floor(random() * 9000 + 1000) AS NUMERIC)
     , CAST(floor(random() * (generate_series)/9000*29) AS NUMERIC)
     , 'junk'
  FROM GENERATE_SERIES(1, 9000);

VACUUM ANALYZE employees;
```

Notes:

- The new primary key just extended by the `SUBSIDIARY_ID`; that is, the `EMPLOYEE_ID` remains in the first position.
- The new records are randomly assigned to the subsidiaries 1 through 29.
- The table and index are analyzed again to make the optimizer aware of the grown data volume.

The next script introduces the index on `SUBSIDIARY_ID` to support the query for all employees of one particular subsidiary:

```sql
CREATE INDEX emp_sub_id ON employees (subsidiary_id);
```

Although that gives decent performance, it’s better to use the index that supports the primary key:

```sql
-- use tmp index to support the PK
CREATE UNIQUE INDEX employee_pk_tmp 
    ON employees (subsidiary_id, employee_id);

 ALTER TABLE employees 
   ADD CONSTRAINT employees_pk_tmp
UNIQUE (subsidiary_id, employee_id);

ALTER TABLE employees
 DROP CONSTRAINT employees_pk;

ALTER TABLE employees
  ADD CONSTRAINT employees_pk
      PRIMARY KEY (subsidiary_id, employee_id);

ALTER TABLE employees
 DROP CONSTRAINT employees_pk_tmp;

-- drop old indexes
DROP INDEX employee_pk_tmp;
DROP INDEX emp_sub_id;
```

Notes:

- A new index is created and used to support the PK.
- Once the old PK index isn’t used by the constraint anymore, it can be dropped and recreated with its new column order.
- The constraint is changed again to use the new PK index and the temporary index can be dropped—as well as the index on the subsidiary id that isn’t required anymore.

## Functions

### Case-Insensitive Search

The randomized names were already created in correct case, just update “my” record:

```sql
UPDATE employees 
   SET first_name = 'Markus'
     , last_name  = 'Winand'
 WHERE employee_id   = 123
   AND subsidiary_id = 30;
```

The statement to create the function-based index:

```sql
CREATE INDEX emp_up_name
    ON employees (UPPER(last_name) varchar_pattern_ops);;
DROP INDEX emp_name;;
```

```
VACUUM ANALYZE employees;;
```

### User-Defined Functions

Define a PL/SQL function that calculates the age and attempts to use it in an index:

```sql
CREATE FUNCTION get_age(date_of_birth DATE) 
RETURNS NUMERIC
AS
$$
BEGIN
    RETURN DATE_PART('year', AGE(date_of_birth));
END;
$$ LANGUAGE plpgsql;

CREATE INDEX invalid ON EMPLOYEES (get_age(date_of_birth));
```

You should get the error “functions in index expression must be marked IMMUTABLE”.

## Partial Indexes

```sql
CREATE TABLE messages AS (
SELECT GENERATE_SERIES::numeric id
     , CASE WHEN random() < 0.01 THEN 'N' ELSE 'Y' END processed
     , CAST(trunc(random() * 100) AS NUMERIC) receiver
     , 'junk' message
  FROM GENERATE_SERIES(0, 999999)
);

CREATE INDEX messages_todo
          ON messages (receiver, processed);
```

```
PREPARE stmt(int) AS
 SELECT message
   FROM messages
  WHERE processed = 'N'
    AND receiver  = $1;

EXPLAIN EXECUTE stmt(1);
```

```sql
CREATE INDEX messages_only_todo
          ON messages (receiver)
       WHERE processed = 'N';

PREPARE stmt(int) AS
 SELECT message
   FROM messages
  WHERE processed = 'N'
    AND receiver  = $1;

EXPLAIN EXECUTE stmt(1);
```
