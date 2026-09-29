---
title: "PostgreSQL Example Scripts for “Testing and Scalability”"
lang: en
---

This section contains the `CREATE`, `INSERT` and PL/pgSQL code to run the scalability test from the [Testing and Scalability Chapter](/sql/testing-scalability) in a PostgreSQL database.

#### Warning

These scripts will create large objects in the database and produce a huge amount of transaction logs.

It’s required to run the test against a very large data set to make sure caching does not affect the measurement. Depending on your environment, you might need to create even larger tables to reproduce a linear result as shown in the book.

```sql
CREATE TABLE scale_data (
   section NUMERIC NOT NULL,
   id1     NUMERIC NOT NULL,
   id2     NUMERIC NOT NULL
);
```

Note:

- There is no primary key (to keep the data generation simple).
- There is no index (yet). That’s done after filling the table.
- There is no “junk” column to keep the table small.

```sql
INSERT INTO scale_data
SELECT sections.*, gen.*
     , CEIL(RANDOM()*100) 
  FROM GENERATE_SERIES(1, 300)     sections,
       GENERATE_SERIES(1, 900000) gen
 WHERE gen <= sections * 3000;
```

Note:

- This code generates 300 sections, you may need to adjust the number for your environment. If you increase the number of sections, you might also need to increase second `GENERATE_SERIES` call. It must generate at least `3000 x ` records.
- The table will need some gigabytes.

```sql
CREATE INDEX scale_slow ON scale_data (section, id1, id2);

ALTER TABLE scale_data CLUSTER ON scale_slow;
CLUSTER scale_data;
```

Note:

- The index will also need some gigabytes.
- PostgreSQL doesn’t support covering indexes as of release 9.0.3. That means, it’s not possible to select from an index only, without the corresponding table access. We will therefore cluster the table according to the index, to keep the impact at a minimum.
- That might take ages.

```sql
CREATE OR REPLACE FUNCTION test_scalability
   (sql_txt VARCHAR(2000), n INT)
   RETURNS SETOF RECORD AS
$$
DECLARE
   tim   INTERVAL[300];
   rec   INT[300];
   strt  TIMESTAMP;
   v_rec RECORD;
   iter  INT;
   sec   INT;
   cnt   INT;
   rnd   INT;
BEGIN
   FOR iter  IN 0..n LOOP
      FOR sec IN 0..300 LOOP
         IF iter = 0 THEN
           tim[sec] := 0;
           rec[sec] := 0;
         END IF;
         rnd  := CEIL(RANDOM() * 100);
         strt := CLOCK_TIMESTAMP();

         EXECUTE 'select count(*) from (' || sql_txt || ') tbl'
            INTO cnt
           USING sec, rnd;

         tim[sec] := tim[sec] + CLOCK_TIMESTAMP() - strt;
         rec[sec] := rec[sec] + cnt;

         IF iter = n THEN
            SELECT INTO v_rec sec, tim[sec], rec[sec];
            RETURN NEXT v_rec;
         END IF;
      END LOOP;
   END LOOP;

   RETURN;
END;
$$ LANGUAGE plpgsql;
```

Note:

- The `TEST_SCALABILITY` function returns a table.
- It’s hardcoded to run the test 300 sections
- The number of iterations is configurable

```sql
SELECT *
  FROM test_scalability('SELECT * '
                      ||  'FROM scale_data '
                      || 'WHERE section=$1 '
                      ||   'AND id2=$2', 10)
       AS (sec INT, seconds INTERVAL, cnt_rows INT);
```

The counter test, with a better index, can be done like that:

```sql
CREATE INDEX scale_fast ON scale_data (section, id2, id1);

ALTER TABLE scale_data CLUSTER ON scale_fast;
CLUSTER scale_data;

SELECT *
  FROM test_scalability('SELECT * '
                      ||  'FROM scale_data '
                      || 'WHERE section=$1 '
                      ||   'AND id2=$2', 10)
       AS (sec INT, seconds INTERVAL, cnt_rows INT);
```

Note:

- It’s required to cluster the table on the new index. That might take ages.
