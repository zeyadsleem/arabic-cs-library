---
title: "سكربتات أمثلة Db2 (LUW) لـ«الاختبار وقابلية التوسع»"
lang: ar
source: https://use-the-index-luke.com/sql/example-schema/db2/performance-testing-scalability
---

يحتوي هذا القسم على شيفرة `create` و`insert` وPL/SQL لتشغيل اختبار قابلية التوسع من [الفصل 3*الأداء وقابلية التوسع*](/book/use-the-index-luke/sql-testing-scalability/index) في قاعدة بيانات Db2 (LUW).

#### تحذير

ستنشئ هذه السكربتات كائنات كبيرة في قاعدة البيانات وتنتج كمية هائلة من سجلات الإعادة (redo logs).

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

ملاحظة:

- الإيداع التلقائي معطَّل لتعطيل التسجيل لهذا الجدول. ويُنفَّذ الإيداع في الخطوة التالية.
- لا يوجد مفتاح أساسي (لإبقاء توليد البيانات بسيطاً)
- لا يوجد فهرس (بعد). ويُنشأ ذلك بعد ملء الجدول
- لا يوجد عمود «نفايات» (junk) لأن الجدول لا يُوصَل إليه فعلاً أثناء الاختبار

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

ملاحظة:

- تولّد هذه الشيفرة 300 قسم، وقد تحتاج إلى تعديل العدد ليناسب بيئتك. وإذا زدت عدد الأقسام، فيجب أن تزيد المولّد الثاني أيضاً؛ إذ يجب أن يولّد `3000 x ` سجل على الأقل.
- سيحتاج الجدول إلى بضعة غيغابايتات

```sql
--#SET TERMINATOR ;

-- Disable autocommit
UPDATE COMMAND OPTIONS USING C OFF;

ALTER TABLE scale_data ACTIVATE NOT LOGGED INITIALLY;

CREATE INDEX scale_slow ON scale_data (section, id1, id2);

COMMIT;

RUNSTATS ON TABLE scale_data;
```

ملاحظة:

سيحتاج الفهرس أيضاً إلى بضعة غيغابايتات

[قبل الإصدار 10](https://www.ibm.com/docs/en/db2/11.5.x?topic=commands-runstats) تحتاج Db2 إلى اسم جدول مؤهَّل بالكامل (بما في ذلك المخطط) من أجل `RUNSTATS`. وإذا ظهرت لك رسالة خطأ، فجرّب إضافة اسم المخطط. ويمكنك الاستعلام عن CURRENT_SCHEMA هكذا:

```sql
SELECT current_schema FROM sysibm.sysdummy1;
```
