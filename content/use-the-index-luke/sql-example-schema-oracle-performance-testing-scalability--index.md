---
title: "سكربتات أمثلة Oracle لـ«الاختبار وقابلية التوسع»"
lang: ar
source: https://use-the-index-luke.com/sql/example-schema/oracle/performance-testing-scalability
---

يحتوي هذا القسم على شيفرة `create` و`insert` وPL/SQL لتشغيل اختبار قابلية التوسع من [الفصل 3*الأداء وقابلية التوسع*](/book/use-the-index-luke/sql-testing-scalability/index) في قاعدة بيانات Oracle 11gR2.

#### تحذير

ستنشئ هذه السكربتات كائنات كبيرة في قاعدة البيانات وتنتج كمية هائلة من سجلات الإعادة (redo logs).

```sql
CREATE TABLE scale_data (
   section NUMBER NOT NULL,
   id1     NUMBER NOT NULL,
   id2     NUMBER NOT NULL
);
```

ملاحظة:

- لا يوجد مفتاح أساسي (لإبقاء توليد البيانات بسيطاً)
- لا يوجد فهرس (بعد). ويُنشأ ذلك بعد ملء الجدول
- لا يوجد عمود «نفايات» (junk) لأن الجدول لا يُوصَل إليه فعلاً أثناء الاختبار

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

ملاحظة:

- تولّد هذه الشيفرة 300 قسم، وقد تحتاج إلى تعديل العدد ليناسب بيئتك. وإذا زدت عدد الأقسام، فيجب أن تزيد المولّد الثاني أيضاً؛ إذ يجب أن يولّد `3000 x ` سجل على الأقل.
- سيحتاج الجدول إلى بضعة غيغابايتات

```sql
CREATE INDEX scale_slow ON scale_data (section, id1, id2);

BEGIN
     DBMS_STATS.GATHER_TABLE_STATS(null, 'SCALE_DATA' 
                                       , CASCADE => true);
END;
/
```

ملاحظة:

- سيحتاج الفهرس أيضاً إلى بضعة غيغابايتات

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

ملاحظة:

- تعيد الدالة `TEST_SCALABILITY.RUN` جدولاً
- وهي مثبتة في الشيفرة لتشغيل الاختبار على 300 قسم (المظلَّل).
- وعدد التكرارات قابل للضبط

ويستدعي `select` التالي الدالة ويمرّر الاستعلام كسلسلة نصية:

```sql
SELECT *
  FROM TABLE(test_scalability.run(
       'SELECT * ' 
      || 'FROM scale_data '
      ||'WHERE section=:1 '
      ||  'AND id2=CEIL(DBMS_RANDOM.value(1,100))', 10));
```

ويمكن إجراء الاختبار المقابل بفهرس أفضل هكذا:

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

ملاحظة:

- يُسقط الفهرس `SCALE_SLOW` لمنع الخطأ «ORA-01408: such column list already indexed».
