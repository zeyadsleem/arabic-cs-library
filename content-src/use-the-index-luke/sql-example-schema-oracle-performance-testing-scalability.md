---
title: "Oracle Example Scripts for “Testing and Scalability”"
lang: en
---

This section contains the `create`, `insert` and PL/SQL code to run the scalability test from [Chapter 3*Performance and Scalability*](/sql/testing-scalability) in an Oracle 11gR2 database.

#### Warning

These scripts will create large objects in the database and produce a huge amount of redo logs.

```sql
CREATE TABLE scale_data (
   section NUMBER NOT NULL,
   id1     NUMBER NOT NULL,
   id2     NUMBER NOT NULL
);
```

Note:

- There is no primary key (to keep the data generation simple)
- There is no index (yet). That’s done after filling the table
- There is no “junk” column because the table is actually not accessed during testing

```sql
INSERT INTO scale_data
SELECT sections.n, gen.x, CEIL(DBMS_RANDOM.VALUE(0, 100)) 
  FROM (
         SELECT level - 1 n
           FROM DUAL
        CONNECT BY level < 300) sections
       , (
         SELECT level x
           FROM DUAL
        CONNECT BY level < 900000) gen
 WHERE gen.x <= sections.n * 3000;
```

Note:

- This code generates 300 sections, you may need to adjust the number for your environment. If you increase the number of sections, you must also increase the second generator. It must generate at least `3000 x ` records.
- The table will need some gigabytes

```sql
CREATE INDEX scale_slow ON scale_data (section, id1, id2);

BEGIN
     DBMS_STATS.GATHER_TABLE_STATS(null, 'SCALE_DATA' 
                                       , CASCADE => true);
END;
/
```

Note:

- The index will also need some gigabytes

```sql
CREATE OR REPLACE PACKAGE test_scalability IS
  TYPE piped_output IS RECORD ( section  NUMBER
                              , seconds  NUMBER
                              , cnt_rows NUMBER);
  TYPE piped_output_table IS TABLE OF piped_output;

  FUNCTION run(sql_txt IN varchar2, n IN number)
    RETURN test_scalability.piped_output_table PIPELINED;
END;
/

CREATE OR REPLACE PACKAGE BODY test_scalability
IS
  TYPE tmp IS TABLE OF piped_output INDEX BY PLS_INTEGER;

  FUNCTION run(sql_txt IN VARCHAR2, n IN NUMBER)
    RETURN test_scalability.piped_output_table PIPELINED
  IS
    rec  test_scalability.tmp;
    r    test_scalability.piped_output;
    iter NUMBER;
    sec  NUMBER;
    strt NUMBER;
    exec_txt VARCHAR2(4000);
    cnt  NUMBER;
  BEGIN
    exec_txt := 'select count(*) from (' || sql_txt || ')';
    iter := 0;
    WHILE iter <= n LOOP
      sec := 0;
      WHILE sec < 300 LOOP
        IF iter = 0 THEN
           rec(sec).seconds  := 0;
           rec(sec).section  := sec;
           rec(sec).cnt_rows := 0;
        END IF;
        strt := DBMS_UTILITY.GET_TIME;
        EXECUTE IMMEDIATE exec_txt INTO cnt USING sec;
        rec(sec).seconds := rec(sec).seconds 
                          + (DBMS_UTILITY.GET_TIME - strt)/100;
        rec(sec).cnt_rows:= rec(sec).cnt_rows + cnt;
        IF iter = n THEN
          PIPE ROW(rec(sec));
        END IF;
        sec := sec +1;
      END LOOP;
      iter := iter +1;
    END LOOP;
    RETURN;
  END;
END test_scalability;
/
```

Note:

- The `TEST_SCALABILITY.RUN` function returns a table
- It’s hardcoded to run the test for 300 sections (highlighted).
- The number of iterations is configurable

The following `select` calls the function and passes the query as string:

```sql
SELECT *
  FROM TABLE(test_scalability.run(
       'SELECT * ' 
      || 'FROM scale_data '
      ||'WHERE section=:1 '
      ||  'AND id2=CEIL(DBMS_RANDOM.value(1,100))', 10));
```

The counter test, with a better index, can be done like that:

```sql
DROP INDEX scale_slow;
CREATE INDEX scale_fast ON scale_data (section, id2, id1);

BEGIN
     DBMS_STATS.GATHER_TABLE_STATS(null, 'SCALE_DATA' 
                                       , CASCADE => true);
END;
/

SELECT *
  FROM TABLE(test_scalability.run(
       'SELECT * ' 
      || 'FROM scale_data '
      ||'WHERE section=:1 '
      ||  'AND id2=CEIL(DBMS_RANDOM.value(1,10))', 10));
```

Note:

- The `SCALE_SLOW` index is dropped to prevent “ORA-01408: such column list already indexed”.
