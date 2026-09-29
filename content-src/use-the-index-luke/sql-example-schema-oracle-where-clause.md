---
title: "Oracle Example Scripts for “The Where Clause”"
lang: en
---

## The Equals Operator

### Surrogate Keys

The following script creates the `EMPLOYEES` table with 1000 entries.

```sql
CREATE TABLE employees (
   employee_id   NUMBER         NOT NULL,
   first_name    VARCHAR2(1000) NOT NULL,
   last_name     VARCHAR2(1000) NOT NULL,
   date_of_birth DATE           NOT NULL,
   phone_number  VARCHAR2(1000) NOT NULL,
   junk          CHAR(1000)     DEFAULT 'JUNK',
   CONSTRAINT employees_pk PRIMARY KEY (employee_id)
);
```

```sql
INSERT INTO employees (employee_id,  first_name,
                       last_name,    date_of_birth, 
                       phone_number)
SELECT level, 
       DBMS_RANDOM.STRING('u', 1) || 
            DBMS_RANDOM.STRING('l', DBMS_RANDOM.value(2,10)),
       DBMS_RANDOM.STRING('u', 1) || 
            DBMS_RANDOM.STRING('l', DBMS_RANDOM.value(2,10)),
       SYSDATE - (DBMS_RANDOM.normal() * 365 * 10) - 40 * 365,
       TRUNC(DBMS_RANDOM.VALUE(1000,10000))
  FROM DUAL 
  CONNECT BY level <= 1000;
```

```sql
UPDATE employees 
   SET first_name='MARKUS', 
       last_name='WINAND'
 WHERE employee_id=123;
```

```javascript
BEGIN
     DBMS_STATS.GATHER_TABLE_STATS(null, 'EMPLOYEES', 
     METHOD_OPT=>'for all indexed columns', CASCADE => true);
END;
```

Notes:

- The `JUNK` column is used to have a realistic row length. Because it’s data type is `CHAR`, as opposed to `VARCHAR2`, it always needs the 1000 bytes it can hold. Without this column the table would become unrealistically small and many demonstrations would not work.
- Random data is filled into the table, with exception to my entry, that is updated after the insert.
- Table and index [statistics](/sql/where-clause/the-equals-operator/slow-indexes-part-ii#sb-statistics) are gathered so that the [optimizer](/sql/where-clause/the-equals-operator/slow-indexes-part-ii#sb-optimizer) knows a little bit about the table’s content.

### Concatenated Keys

This script changes the `EMPLOYEES` table so that it reflects the situation after the merger with Very Big Company:

```sql
-- add subsidiary_id and update existing records
ALTER TABLE employees ADD subsidiary_id NUMBER;
```

```sql
UPDATE      employees SET subsidiary_id = 30;
```

```sql
ALTER TABLE employees MODIFY subsidiary_id NOT NULL;
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
                       phone_number, subsidiary_id)
SELECT level, 
       DBMS_RANDOM.STRING('u', 1) || 
            DBMS_RANDOM.STRING('l', DBMS_RANDOM.value(2,10)),
       DBMS_RANDOM.STRING('u', 1) || 
            DBMS_RANDOM.STRING('l', DBMS_RANDOM.value(2,10)),
       SYSDATE - (DBMS_RANDOM.normal() * 365 * 10) - 40 * 365,
       TRUNC(DBMS_RANDOM.VALUE(1000,10000)), 
       TRUNC(DBMS_RANDOM.VALUE(1,level/9000*29))
FROM DUAL CONNECT BY level <= 9000;
```

```javascript
BEGIN
     DBMS_STATS.GATHER_TABLE_STATS(null, 'EMPLOYEES', 
     METHOD_OPT=>'for all indexed columns', CASCADE => true);
END;
```

Notes:

- The new primary key just extended by the `SUBSIDIARY_ID`; that is, the `EMPLOYEE_ID` remains in the first position.
- The new records are randomly assigned to the subsidiaries 1 through 29.
- The table and index are analyzed again to make the optimizer aware of the grown data volume.

The next script introduces the index on `SUBSIDIARY_ID` to support the query for all employees of one particular subsidiary:

```sql
CREATE INDEX emp_sub_id ON employees (subsidiary_id);
```

```javascript
BEGIN
     DBMS_STATS.GATHER_TABLE_STATS(null, 'EMPLOYEES', 
     METHOD_OPT=>'for all indexed columns', CASCADE => true);
END;
```

Notes:

- The table and all indexes are analyzed again. In that particular case it would be sufficient to analyse only the new index.

Although that gives decent performance, it’s better to use the index that supports the primary key:

Oracle 11g

```sql
-- use tmp index to support the PK
CREATE INDEX employee_pk_tmp 
    ON employees (subsidiary_id, employee_id, 1);
```

```sql
ALTER TABLE employees 
      MODIFY CONSTRAINT employees_pk 
      USING INDEX employee_pk_tmp;
```

```
-- recreate the pk index as needed (automatically done)
--DROP   INDEX employee_pk;
```

```sql
CREATE UNIQUE INDEX employee_pk 
    ON employees (subsidiary_id, employee_id);
```

```sql
-- change the constraint to use the new index
ALTER TABLE employees 
      MODIFY CONSTRAINT employees_pk 
      USING INDEX employee_pk;
```

```
-- drop old indexes
DROP INDEX employee_pk_tmp;
```

```
DROP INDEX emp_sub_id;
```

```javascript
BEGIN
     DBMS_STATS.GATHER_TABLE_STATS(null, 'EMPLOYEES', 
     METHOD_OPT=>'for all indexed columns', CASCADE => true);
END;
```

Oracle 12c

```sql
CREATE UNIQUE INDEX employee_pk_new 
    ON employees (subsidiary_id, employee_id);
```

```sql
ALTER TABLE employees 
      MODIFY CONSTRAINT employees_pk 
      USING INDEX employee_pk_new;
```

```
-- drop old indexes
DROP INDEX emp_sub_id;
```

```sql
-- note: employee_pk is automatically dropped

-- rename new PK index
ALTER INDEX employee_pk_new RENAME TO employee_pk;
```

```javascript
BEGIN
     DBMS_STATS.GATHER_TABLE_STATS(null, 'EMPLOYEES', 
     METHOD_OPT=>'for all indexed columns', CASCADE => true);
END;
```

Notes:

- In versions prior 12c, we create a new index with a dummy column and use it to temporarily support the PK.This is required because the Oracle database till 11g doesn’t allow two indexes that include the same columns.
- Once the old PK index isn’t used by the constraint anymore, it can be dropped and recreated with its new column order.
- The constraint is changed again to use the new PK index and the temporary index can be dropped—as well as the index on the subsidiary id that isn’t required anymore.

### Slow Indexes, Part II

The following statement removes some statistics to make my example work.

```
BEGIN
      DBMS_STATS.DELETE_COLUMN_STATS
       (null, 'EMPLOYEES', 'SUBSIDIARY_ID');
END
```

To re-create them, use the same procedure as before:

```javascript
BEGIN
     DBMS_STATS.GATHER_TABLE_STATS(null, 'EMPLOYEES', 
     METHOD_OPT=>'for all indexed columns', CASCADE => true);
END
```

The final statement to create, and analyze, the index on the `LAST_NAME` column:

```sql
CREATE INDEX emp_name ON employees (last_name)
```

```javascript
BEGIN
     DBMS_STATS.GATHER_TABLE_STATS(null, 'EMPLOYEES', 
     METHOD_OPT=>'for all indexed columns', CASCADE => true);
END
```

## Functions

### Case-Insensitive Search

The randomized names were already created in correct case, just update “my” record:

```sql
UPDATE employees 
   SET first_name = 'Markus'
     , last_name  = 'Winand'
 WHERE employee_id   = 123
   AND subsidiary_id = 30;;
```

The statement to create the function-based index:

```sql
CREATE INDEX emp_up_name ON employees (UPPER(last_name));;
DROP INDEX emp_name;;
```

Notes:

- I intentionally break my own best practice to re-analyze the table and all indexes. Just the new index is analyzed (automatically as of 10g).

The next statement will, as of release 11g, automatically collect the extended statistics for the function-based index.

```javascript
BEGIN
     DBMS_STATS.GATHER_TABLE_STATS(null, 'EMPLOYEES', 
     METHOD_OPT=>'for all indexed columns', CASCADE => true);
END;
/
```

### User-Defined Functions

Define a PL/SQL function that calculates the age and attempts to use it in an index:

```sql
CREATE FUNCTION get_age(date_of_birth DATE) 
RETURN NUMBER
AS
BEGIN
    RETURN TRUNC(MONTHS_BETWEEN(SYSDATE, DATE_OF_BIRTH)/12);
END;
/

CREATE INDEX invalid ON EMPLOYEES (get_age(date_of_birth));
```

You should get the error “ORA-30553: The function is not deterministic”.

## Searching for Ranges

Creating the `EMP_TEST` index:

```sql
CREATE INDEX emp_test
     ON employees (date_of_birth, subsidiary_id);;
```

And the reverse column order:

```sql
CREATE INDEX emp_test
     ON employees (subsidiary_id, date_of_birth);;
```

## Indexing NULL

The following re-creates the standard indexes after you have run the examples from the book:

```sql
-- for demo purpose we drop the NOT NULL constraint
ALTER TABLE employees MODIFY date_of_birth NULL;;
CREATE INDEX emp_dob ON employees (date_of_birth);;
```

```
DROP INDEX emp_dob_upname;;
```

```sql
CREATE INDEX emp_dob ON employees (date_of_birth, '1');;
```

## Emulating Partial Indexes

```sql
CREATE TABLE messages AS
SELECT level id
     , CASE WHEN DBMS_RANDOM.NORMAL() < 0.09 THEN 'N' ELSE 'Y' END processed
     , trunc(DBMS_RANDOM.VALUE(0,100)) receiver
     , RPAD('junk', 200) message
  FROM dual 
CONNECT BY level < 999999;;
```

You have to update the statistics after creating the function-based index. No statistics, no CBO, no FBI.

```javascript
begin
   DBMS_STATS.GATHER_TABLE_STATS( user
                                ,'MESSAGES'
                                , cascade=>true);
end;
/
```
