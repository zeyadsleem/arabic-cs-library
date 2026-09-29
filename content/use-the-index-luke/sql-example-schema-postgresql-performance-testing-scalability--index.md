---
title: "سكربتات أمثلة PostgreSQL لـ«الاختبار وقابلية التوسع»"
lang: ar
source: https://use-the-index-luke.com/sql/example-schema/postgresql/performance-testing-scalability
---

يحتوي هذا القسم على شيفرة `CREATE` و`INSERT` وPL/pgSQL لتشغيل اختبار قابلية التوسع من [فصل الاختبار وقابلية التوسع](/book/use-the-index-luke/sql-testing-scalability/index) في قاعدة بيانات PostgreSQL.

#### تحذير

ستنشئ هذه السكربتات كائنات كبيرة في قاعدة البيانات وتنتج كمية هائلة من سجلات المعاملات.

ومن اللازم تشغيل الاختبار على مجموعة بيانات ضخمة جداً لضمان ألا يؤثر التخزين المؤقت في القياس. وتبعاً لبيئتك، قد تحتاج إلى إنشاء جداول أكبر حتى تحصل على نتيجة خطية كما في الكتاب.

```sql
CREATE TABLE scale_data (
   section NUMERIC NOT NULL,
   id1     NUMERIC NOT NULL,
   id2     NUMERIC NOT NULL
);
```

ملاحظة:

- لا يوجد مفتاح أساسي (لإبقاء توليد البيانات بسيطاً).
- لا يوجد فهرس (بعد). ويُنشأ ذلك بعد ملء الجدول.
- لا يوجد عمود «نفايات» (junk) لإبقاء الجدول صغيراً.

```sql
INSERT INTO scale_data
SELECT sections.*, gen.*
     , CEIL(RANDOM()*100) 
  FROM GENERATE_SERIES(1, 300)     sections,
       GENERATE_SERIES(1, 900000) gen
 WHERE gen <= sections * 3000;
```

ملاحظة:

- تولّد هذه الشيفرة 300 قسم، وقد تحتاج إلى تعديل العدد ليناسب بيئتك. وإذا زدت عدد الأقسام، فقد تحتاج أيضاً إلى زيادة استدعاء `GENERATE_SERIES` الثاني؛ إذ يجب أن يولّد `3000 x ` سجل على الأقل.
- سيحتاج الجدول إلى بضعة غيغابايتات.

```sql
CREATE INDEX scale_slow ON scale_data (section, id1, id2);

ALTER TABLE scale_data CLUSTER ON scale_slow;
CLUSTER scale_data;
```

ملاحظة:

- سيحتاج الفهرس أيضاً إلى بضعة غيغابايتات.
- لا يدعم PostgreSQL الفهارس المُغطّية حتى الإصدار 9.0.3؛ أي لا يمكن الاستعلام من الفهرس وحده دون الوصول المقابل إلى الجدول. ولذلك سنعنقد الجدول وفق الفهرس لإبقاء الأثر في حده الأدنى.
- وقد يستغرق ذلك وقتاً طويلاً جداً.

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

ملاحظة:

- تعيد الدالة `TEST_SCALABILITY` جدولاً.
- وهي مثبتة في الشيفرة لتشغيل الاختبار على 300 قسم
- وعدد التكرارات قابل للضبط

```sql
SELECT *
  FROM test_scalability('SELECT * '
                      ||  'FROM scale_data '
                      || 'WHERE section=$1 '
                      ||   'AND id2=$2', 10)
       AS (sec INT, seconds INTERVAL, cnt_rows INT);
```

ويمكن إجراء الاختبار المقابل بفهرس أفضل هكذا:

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

ملاحظة:

- من اللازم عنقدة الجدول على الفهرس الجديد. وقد يستغرق ذلك وقتاً طويلاً جداً.
