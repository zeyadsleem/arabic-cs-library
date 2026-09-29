---
title: "Db2 (LUW) Example Scripts for “The Where Clause”"
lang: en
---

## The Equals Operator

### Surrogate Keys

The following script creates the `EMPLOYEES` table with 1000 entries.

The script is intended to be run from the `db2` command line. It uses the semicolon (;) as the regular statement terminator, but two semicolons (;;) to terminate PL/SQL code.

```sql
CREATE TABLE employees (
   employee_id   NUMERIC       NOT NULL,
   first_name    VARCHAR(1000) NOT NULL,
   last_name     VARCHAR(1000) NOT NULL,
   date_of_birth DATE                  ,
   phone_number  VARCHAR(1000) NOT NULL,
   junk          CHAR(254)             ,
   CONSTRAINT employees_pk PRIMARY KEY (employee_id)
);
```

```sql
--#SET TERMINATOR ;;
CREATE FUNCTION random_string(minlen NUMERIC, maxlen NUMERIC)
RETURNS VARCHAR(1000)
LANGUAGE SQL
NOT DETERMINISTIC
NO EXTERNAL ACTION
READS SQL DATA
BEGIN
  DECLARE rv  VARCHAR(1000) DEFAULT '';
  DECLARE i   NUMERIC       DEFAULT 0;
  DECLARE len NUMERIC       DEFAULT 0;

  IF maxlen < 1 OR minlen < 1 OR maxlen < minlen THEN
    RETURN NULL;
  END IF;

  SET i = floor(rand()*(maxlen-minlen)) + minlen;
  WHILE (i > 0)  DO
    SET rv = rv || chr(97+CAST(rand() * 25 AS INTEGER));
    SET i  =  i - 1;
  END WHILE;
  RETURN rv;
END
;;
--#SET TERMINATOR ;
```

```sql
INSERT INTO employees (employee_id,  first_name,
                       last_name,    date_of_birth, 
                       phone_number, junk)
WITH generator (n) AS
( SELECT 1 n   FROM sysibm.sysdummy1
   UNION ALL
  SELECT n + 1 FROM generator
   WHERE n < 1000
)
SELECT generator.n
     , initcap(lower(random_string(2, 8)))
     , initcap(lower(random_string(2, 8)))
     , CURRENT_DATE - floor(rand() * 365 * 10 + 40 * 365) days
     , floor(rand() * 9000 + 1000)
     , 'junk'
  FROM generator;
```

```sql
UPDATE employees 
   SET first_name='MARKUS', 
       last_name='WINAND'
 WHERE employee_id=123;
```

```
RUNSTATS ON TABLE employees;
```

Notes:

The `JUNK` column is used to have a realistic row length. Because it’s data type is `CHAR`, as opposed to `VARCHAR`, it always needs the 254 bytes it can hold (254 is the limit on Db2 (LUW) Express-C 10.5). Without this column the table would become unrealistically small and many demonstrations would not work.

Random data is filled into the table, with exception to my entry, that is updated after the insert.

Table [statistics](/sql/where-clause/the-equals-operator/slow-indexes-part-ii#sb-statistics) are gathered so that the [optimizer](/sql/where-clause/the-equals-operator/slow-indexes-part-ii#sb-optimizer) knows a little bit about the table’s content.

[Before version 10](https://www.ibm.com/docs/en/db2/11.5.x?topic=commands-runstats) Db2 needs a fully qualified table name (including schema) for `RUNSTATS`. If you are getting an error, try adding the schema name. You can query for the CURRENT_SCHEMA like this:

```sql
SELECT current_schema FROM sysibm.sysdummy1;
```

### Concatenated Keys

This script changes the `EMPLOYEES` table so that it reflects the situation after the merger with Very Big Company:

```sql
--#SET TERMINATOR ;

-- add subsidiary_id and update existing records
ALTER TABLE employees ADD subsidiary_id NUMERIC;
UPDATE      employees SET subsidiary_id = 30;
ALTER TABLE employees ALTER COLUMN subsidiary_id SET NOT NULL;

-- change the PK
ALTER TABLE employees DROP PRIMARY KEY;
-- to prevent failur for reason "7"
REORG TABLE employees;
ALTER TABLE employees ADD CONSTRAINT employees_pk 
      PRIMARY KEY (employee_id, subsidiary_id);

-- generate more records (Very Big Company)
INSERT INTO employees (employee_id,  first_name,
                       last_name,    date_of_birth, 
                       phone_number, subsidiary_id, junk)
WITH generator (n) AS
( SELECT 1001 n   FROM sysibm.sysdummy1
   UNION ALL
  SELECT n + 1 FROM generator
   WHERE n < 10000
)
SELECT generator.n
     , initcap(lower(random_string(2, 8)))
     , initcap(lower(random_string(2, 8)))
     , CURRENT_DATE - floor(rand() * 365 * 10 + 40 * 365) days
     , floor(rand() * 9000 + 1000)
     , floor(rand() * least(mod(generator.n, 2)+0.2,1) * (generator.n-1000)/9000*29) 
     , 'junk'
  FROM generator;

RUNSTATS ON TABLE employees;
```

Notes:

- The new primary key just extended by the `SUBSIDIARY_ID`; that is, the `EMPLOYEE_ID` remains in the first position.
- The new records are randomly assigned to the subsidiaries 1 through 29.
- The table and index are analyzed again to make the optimizer aware of the grown data volume.

The next script introduces the index on `SUBSIDIARY_ID` to support the query for all employees of one particular subsidiary:

```sql
--#SET TERMINATOR ;
CREATE INDEX emp_sub_id ON employees (subsidiary_id);
```

Although that gives decent performance, it’s better to use the index that supports the primary key:

```sql
--#SET TERMINATOR ;

-- index to support the new PK
CREATE UNIQUE INDEX employees_pk_new
    ON employees (subsidiary_id, employee_id);

ALTER TABLE employees
 DROP PRIMARY KEY;

-- this will automatically use the new index:
-- SQL0598W  Existing index "EMPLOYEE_PK_NEW" is used as the index for 
-- the primary key or a unique key.  SQLSTATE=01550
ALTER TABLE employees
  ADD CONSTRAINT employees_pk
      PRIMARY KEY (subsidiary_id, employee_id);
-- cleanup
RENAME INDEX employees_pk_new TO employees_pk;
DROP INDEX emp_sub_id;
```

Notes:

- A new index is created and used to support the PK.
- Dropping the primary key automatically drops the automatically created index supporting it.
- Adding the new primary key makes use of the new index automatically.

## Functions (Db2 10.5+)

### Case-Insensitive Search

The randomized names were already created in correct case, just update “my” record:

```sql
--#SET TERMINATOR ;

UPDATE employees 
   SET first_name = 'Markus'
     , last_name  = 'Winand'
 WHERE employee_id   = 123
   AND subsidiary_id = 30;
```

The statement to create the function-based index:

```sql
--#SET TERMINATOR ;
CREATE INDEX emp_up_name
    ON employees (UPPER(last_name));
DROP INDEX emp_name;
```

```
RUNSTATS ON TABLE employees;
```

### User-Defined Functions

Define a function that calculates the age and attempts to use it in an index:

```sql
--#SET TERMINATOR ;;
CREATE FUNCTION get_age(date_of_birth DATE) 
RETURNS NUMERIC
LANGUAGE SQL
BEGIN
    RETURN YEAR(CURRENT_DATE - date_of_birth);
END
;;
--#SET TERMINATOR ;

CREATE INDEX invalid ON EMPLOYEES (get_age(date_of_birth));
```

You should get the error “*SQL0356N: The index was not created because a key expression was invalid. Key expression: "1". Reason code: "5”*". Whereas [reason code 5 means](https://www.ibm.com/docs/en/db2/11.5.x?topic=messages-sql0000-0999#sqlmsg__SQL0356N): "*The key expression included a user-defined function.*"

## Emulating Partial Indexes

### Setup

```sql
--#SET TERMINATOR ;

CREATE TABLE messages (
       id         NUMERIC(10,0) NOT NULL,
       processed  CHAR(1)       NOT NULL,
       receiver   NUMERIC(10,0) NOT NULL,
       message    CHAR(200)     NOT NULL,

       CONSTRAINT messages_pk PRIMARY KEY (id)
);

INSERT INTO messages (id, processed, receiver, message)
WITH generator(n) AS
( SELECT 1 n   FROM sysibm.sysdummy1
   UNION ALL
  SELECT n + 1 FROM generator
   WHERE n < 999999
)
SELECT n id
     , CASE WHEN rand() < 0.09 THEN 'N' ELSE 'Y' END processed
     , floor(rand() * 100) receiver
     , 'junk' message
  FROM generator;

RUNSTATS ON TABLE messages;

DROP INDEX messages_not_processed_pi;
CREATE INDEX messages_not_processed_pi
    ON messages (CASE WHEN processed = 'N' THEN receiver+0
                                           ELSE NULL
                 END)
EXCLUDE NULL KEYS;

SELECT *
  FROM messages
 WHERE (CASE WHEN processed = 'N' THEN receiver+0
                                  ELSE NULL
         END) = ?;
```

### Regular Attempt

```sql
CREATE INDEX messages_not_processed_pi
    ON messages (CASE WHEN processed = 'N' THEN receiver
                                           ELSE NULL
                 END)
EXCLUDE NULL KEYS;

SELECT *
  FROM messages
 WHERE (CASE WHEN processed = 'N' THEN receiver
                                  ELSE NULL
         END) = ?;
```

```
Explain Plan
-------------------------------------------------------
ID | Operation        |                    Rows |  Cost
 1 | RETURN           |                         | 49686
 2 |  TBSCAN MESSAGES | 900 of 999999 (   .09%) | 49686

Predicate Information
 2 - SARG (Q1.PROCESSED = 'N')
     SARG (Q1.RECEIVER = ?)
```

Same happens when using an expression like `CASE processed WHEN 'N'…`.

### Obfuscated Attempt

```sql
DROP INDEX messages_not_processed_pi;
CREATE INDEX messages_not_processed_pi
    ON messages (CASE WHEN processed = 'N' THEN receiver+0
                                           ELSE NULL
                 END)
EXCLUDE NULL KEYS;

SELECT *
  FROM messages
 WHERE (CASE WHEN processed = 'N' THEN receiver+0
                                  ELSE NULL
         END) = ?;
```

```
ID | Operation                            |                      Rows |  Cost
 1 | RETURN                               |                           | 13071
 2 |  FETCH MESSAGES                      |  40000 of 40000 (100.00%) | 13071
 3 |   RIDSCN                             |  40000 of 40000 (100.00%) |  1665
 4 |    SORT (UNQIUE)                     |  40000 of 40000 (100.00%) |  1665
 5 |     IXSCAN MESSAGES_NOT_PROCESSED_PI | 40000 of 999999 (  4.00%) |  1646

Predicate Information
 2 - SARG ( CASE WHEN (Q1.PROCESSED = 'N') THEN (Q1.RECEIVER + 0) ELSE NULL END = ?)
 5 - START ( CASE WHEN (Q1.PROCESSED = 'N') THEN (Q1.RECEIVER + 0) ELSE NULL END = ?)
      STOP ( CASE WHEN (Q1.PROCESSED = 'N') THEN (Q1.RECEIVER + 0) ELSE NULL END = ?)
```
