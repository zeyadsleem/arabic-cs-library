---
title: "SQLBase Example Scripts for “The Where Clause”"
lang: en
---

## The Equals Operator

### Surrogate Keys

Creating the `EMPLOYEES` table with 1000 rows.

```sql
CREATE TABLE employees (
   employee_id   INTEGER       NOT NULL,
   first_name    VARCHAR(200) NOT NULL,
   last_name     VARCHAR(200) NOT NULL,
   date_of_birth DATE                  ,
   phone_number  VARCHAR(200) NOT NULL,
   junk          CHAR(254)             ,
   PRIMARY KEY (employee_id)
);

CREATE UNIQUE INDEX employees_pk ON employees(employee_id);

CREATE TABLE generator_16 (
   n NUMBER NOT NULL,
   PRIMARY KEY (n)
);

CREATE UNIQUE INDEX generator_16_pk ON generator_16 (n);

INSERT INTO generator_16 VALUES (0);
INSERT INTO generator_16 VALUES (1);
INSERT INTO generator_16 VALUES (2);
INSERT INTO generator_16 VALUES (3);
INSERT INTO generator_16 VALUES (4);
INSERT INTO generator_16 VALUES (5);
INSERT INTO generator_16 VALUES (6);
INSERT INTO generator_16 VALUES (7);
INSERT INTO generator_16 VALUES (8);
INSERT INTO generator_16 VALUES (9);
INSERT INTO generator_16 VALUES (10);
INSERT INTO generator_16 VALUES (11);
INSERT INTO generator_16 VALUES (12);
INSERT INTO generator_16 VALUES (13);
INSERT INTO generator_16 VALUES (14);
INSERT INTO generator_16 VALUES (15);

CREATE VIEW generator_256 (n)
AS SELECT ( ( hi.n * 16 ) + lo.n ) AS n
     FROM generator_16 lo, generator_16 hi;

CREATE VIEW generator_4k (n)
AS SELECT ( ( hi.n * 256 ) + lo.n ) AS n
     FROM generator_256 lo, generator_16 hi;

CREATE VIEW generator_64k (n)
AS SELECT ( ( hi.n * 256 ) + lo.n ) AS n
     FROM generator_256 lo, generator_256 hi;

INSERT INTO employees (employee_id,  first_name,
                       last_name,    date_of_birth, 
                       phone_number, junk)
SELECT n +1,
       @CHAR(@mod(n, 26)+65)    ||  @CHAR(@mod(@microsecond(@NOW), 26)+97)   || @CHAR(@mod(@minute(@NOW)+n, 26)+97),
       @CHAR(@mod(13+n, 26)+65) ||  @CHAR(@mod(@microsecond(@NOW)+7, 26)+97) || @CHAR(@mod(@minute(@NOW)+n+17, 26)+97),
       SYSDATE - @mod(n+@MICROSECOND(@NOW), 40*365) - 3650,
       @MOD(@MICROSECOND(@NOW)+n, 9000) + 1000,
       'junk'
  FROM generator_4k
WHERE n < 1000;

UPDATE employees 
   SET first_name='MARKUS', 
       last_name='WINAND'
 WHERE employee_id=123;

UPDATE STATISTICS ON TABLE employees;
UPDATE STATISTICS ON INDEX employees_pk;
```

Note:

- We use 200 characters to be on the safe side regarding SQLBases limit on key lenght (total < 255, including overhead).

### Concatenated Keys

```sql
-- add subsidiary_id and update existing records
ALTER TABLE employees ADD subsidiary_id INTEGER;
UPDATE      employees SET subsidiary_id = 30;
ALTER TABLE employees MODIFY subsidiary_id NOT NULL;

-- change the PK
﻿ALTER TABLE employees DROP PRIMARY KEY;
DROP INDEX employees_pk;

CREATE UNIQUE INDEX employees_pk ON employees (employee_id, subsidiary_id);
ALTER TABLE employees PRIMARY KEY (employee_id, subsidiary_id);

-- generate more records (Very Big Company)
INSERT INTO employees (employee_id,  first_name,
                       last_name,    date_of_birth, 
                       phone_number, subsidiary_id, junk)
SELECT n +1,
       @CHAR(@mod(n, 26)+65)    ||  @CHAR(@mod(@microsecond(@NOW), 26)+97)   || @CHAR(@mod(@minute(@NOW)+n, 26)+97),
       @CHAR(@mod(13+n, 26)+65) ||  @CHAR(@mod(@microsecond(@NOW)+7, 26)+97) || @CHAR(@mod(@minute(@NOW)+n+17, 26)+97),
       SYSDATE - @mod(n+@MICROSECOND(@NOW), 40*365) - 3650,
       @MOD(@MICROSECOND(@NOW)+n, 9000) + 1000,
       @MOD(@SECOND(@NOW)+n/9000*29,29),
       'junk'
  FROM generator_64k
WHERE n < 9000;

UPDATE STATISTICS ON TABLE employees;
UPDATE STATISTICS ON INDEX employees_pk;
```

```sql
CREATE INDEX emp_sub_id ON employees (subsidiary_id);
```

Although that gives decent performance, it’s better to use the index that supports the primary key:

```sql
-- use tmp index to support the PK
ALTER TABLE employees DROP PRIMARY KEY;
DROP INDEX employees_pk;

CREATE UNIQUE INDEX employees_pk ON employees (subsidiary_id, employee_id);
ALTER TABLE employees PRIMARY KEY (subsidiary_id, employee_id);

DROP INDEX emp_sub_id;

UPDATE STATISTICS ON INDEX employees_pk;
```

## Functions

```sql
CREATE INDEX emp_name_up ON employees (@upper(last_name));
```
