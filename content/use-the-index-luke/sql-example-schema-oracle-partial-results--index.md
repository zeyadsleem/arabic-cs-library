---
title: "سكربتات أمثلة Oracle لـ«النتائج الجزئية»"
lang: ar
source: https://use-the-index-luke.com/sql/example-schema/oracle/partial-results
---

يحتوي هذا القسم على عبارتَي `create` و`insert` لتشغيل أمثلة [الفصل 7*النتائج الجزئية*](/book/use-the-index-luke/sql-partial-results/index) في قاعدة بيانات Oracle.

ونَهج اختبار قابلية التوسع في استعلامات Top-N هو نفسه المستخدم في فصل «[الاختبار وقابلية التوسع](/book/use-the-index-luke/sql-example-schema-oracle-performance-testing-scalability/index)».

## الاستعلام عن صفوف Top-N

أولاً، باستخدام Top-N متدفق مع فهرس يغطي جملة `order by`:

```sql
CREATE INDEX scale_slow ON scale_data (section, id1, id2);

SELECT *
  FROM TABLE(test_scalability.run(
       'SELECT * FROM (SELECT id2, id1 '
                    ||  'FROM scale_data '
                    || 'WHERE section=:1 '
                    || 'ORDER BY id2, id1) '
    || ' WHERE rownum <= 100', 10));
```

ثم باستخدام فهرس لجملة `where` فقط:

```sql
  DROP INDEX scale_slow;
CREATE INDEX scale_fast ON scale_data (SECTION, id2, id1);

SELECT *
  FROM TABLE(test_scalability.run(
       'SELECT * FROM (SELECT id2, id1 '
                    ||  'FROM scale_data '
                    || 'WHERE section=:1 '
                    || 'ORDER BY id2, id1) '
    || ' WHERE rownum <= 100', 10));
```

## التنقّل عبر الصفحات في النتائج

تستخدم الدالة التالية الطريقتين لجلب النتيجة صفحةً صفحة. أما عبارة `select` في النهاية فتحضّر الإحصاءات على الشاشة.

```sql
CREATE OR REPLACE
PACKAGE test_topn_scalability IS
  TYPE piped_output IS
             RECORD ( section  NUMBER
                    , mde      NUMBER
                    , page     NUMBER
                    , seconds  INTERVAL DAY TO SECOND);
  TYPE piped_output_table IS TABLE OF piped_output;

  FUNCTION run(n IN number)
    RETURN test_topn_scalability.piped_output_table PIPELINED;
END;
/

CREATE OR REPLACE
PACKAGE BODY test_topn_scalability
IS
  TYPE tmp IS TABLE OF piped_output INDEX BY PLS_INTEGER;

FUNCTION run(n IN NUMBER)
  RETURN test_topn_scalability.piped_output_table PIPELINED
IS
  TYPE last_fetched IS RECORD (id2 NUMBER, id1 NUMBER);
  last last_fetched;
  rec  test_topn_scalability.piped_output;
  TYPE sec_array IS TABLE OF last_fetched INDEX BY PLS_INTEGER;

  iter NUMBER;
  sec  NUMBER;
  strt TIMESTAMP(9);
  mde  NUMBER;
  page NUMBER;
  cont sec_array;

  CURSOR s_restart (sec IN NUMBER, page IN NUMBER) 
      IS SELECT id2, id1
           FROM (SELECT id2, id1, rownum rn
                   FROM scale_data
                  WHERE section = sec
                  ORDER BY id2, id1)
          WHERE rownum <= 100
            AND rn > page*100;        

  CURSOR s_continue (sec IN NUMBER, c IN last_fetched)
      IS SELECT *
           FROM (SELECT id2, id1
                   FROM scale_data
                  WHERE section = sec
                    AND id2 >= c.id2
                    AND (   
                            (id2 = c.id2 AND id1 > c.id1)
                         OR 
                            (id2 > c.id2)
                        )
                  ORDER BY id2, id1)
          WHERE rownum <= 100;
BEGIN
  iter := 0;
  WHILE iter <= n LOOP
    FOR mde IN 0 .. 1 LOOP
      FOR page IN 0 .. 100 LOOP
        FOR sec IN 0 .. 300 LOOP
          strt := systimestamp;
          IF (mde = 0 OR page = 0) THEN
            FOR r IN s_restart (sec, page) LOOP
              last := r;
            END LOOP;
          ELSE
            FOR r IN s_continue (sec, cont(sec)) LOOP
              last := r;
            END LOOP;
          END IF;
         
          rec.seconds := (systimestamp - strt);
          rec.section := sec;
          rec.page    := page;
          rec.mde     := mde;
          PIPE ROW(rec);

          cont(sec) := last;

        END LOOP;
      END LOOP;
    END LOOP;
    iter := iter +1;
  END LOOP;
  RETURN;
END run;
END test_topn_scalability;
/

SELECT section, mde, page, sum(extract(second from seconds))
  FROM TABLE(test_topn_scalability.run(10))
 WHERE section = 10
 GROUP BY section, mde, page
 ORDER BY section, mde, page;
```
