---
title: "Db2 (LUW) Example Scripts for “Testing and Scalability”"
lang: en
---

This section contains the `create`, `insert` and PL/SQL code to run the scalability test from [Chapter 3*Performance and Scalability*](/sql/testing-scalability) in an Db2 (LUW) database.

#### Warning

These scripts will create large objects in the database and produce a huge amount of redo logs.

```sql
--#SET TERMINATOR ;

-- Disable autocommit
UPDATE COMMAND OPTIONS USING C OFF;

CREATE TABLE scale_data (
   section NUMERIC(10,0) NOT NULL,
   id1     NUMERIC(10,0) NOT NULL,
   id2     NUMERIC(10,0) NOT NULL
) NOT LOGGED INITIALLY;
```

Note:

- Auto commit is disabled to disable logging for this table. The commit is done in the next step.
- There is no primary key (to keep the data generation simple)
- There is no index (yet). That’s done after filling the table
- There is no “junk” column because the table is actually not accessed during testing

```sql
--#SET TERMINATOR ;

INSERT INTO scale_data (section, id1, id2)
WITH sections (n) AS
( SELECT 1 n   FROM sysibm.sysdummy1
   UNION ALL
  SELECT n + 1 FROM sections
   WHERE n < 300
)
, gen (n) AS
( SELECT 1 n   FROM sysibm.sysdummy1
   UNION ALL
  SELECT n + 1 FROM gen
   WHERE n < 900000
)
SELECT sections.n, gen.n, FLOOR(rand() * 100) 
  FROM sections
     , gen
 WHERE gen.n < sections.n * 3000;

COMMIT;
```

Note:

- This code generates 300 sections, you may need to adjust the number for your environment. If you increase the number of sections, you must also increase the second generator. It must generate at least `3000 x ` records.
- The table will need some gigabytes

```sql
--#SET TERMINATOR ;

-- Disable autocommit
UPDATE COMMAND OPTIONS USING C OFF;

ALTER TABLE scale_data ACTIVATE NOT LOGGED INITIALLY;

CREATE INDEX scale_slow ON scale_data (section, id1, id2);

COMMIT;

RUNSTATS ON TABLE scale_data;
```

Note:

The index will also need some gigabytes

[Before version 10](https://www.ibm.com/docs/en/db2/11.5.x?topic=commands-runstats) Db2 needs a fully qualified table name (including schema) for `RUNSTATS`. If you are getting an error, try adding the schema name. You can query for the CURRENT_SCHEMA like this:

```sql
SELECT current_schema FROM sysibm.sysdummy1;
```
