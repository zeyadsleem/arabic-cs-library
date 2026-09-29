---
title: "`NULL` في قاعدة بيانات Oracle"
lang: ar
source: https://use-the-index-luke.com/sql/where-clause/null
---

غالباً ما يسبّب `NULL` في SQL الارتباك. فرغم أن الفكرة الأساسية لـ`NULL` — [تمثيل البيانات المفقودة](https://en.wikipedia.org/wiki/Null_%28SQL%29) — بسيطة إلى حد ما، فإن لها بعض الخصوصيات. فعلى سبيل المثال، يجب استخدام `IS NULL` بدلاً من `= NULL`. علاوة على ذلك، لدى قاعدة بيانات Oracle غرائب إضافية تتعلق بـ`NULL`، من جهة لأنها لا تتعامل دائماً مع `NULL` كما يقتضي المعيار، ومن جهة أخرى لأن لديها معالجة «خاصة» جداً لـ`NULL` في الفهارس.

لا يعرّف معيار SQL قيمة `NULL` بوصفها قيمة، بل بوصفها عنصراً نائباً عن قيمة مفقودة أو مجهولة. وبناءً على ذلك، لا يمكن لأي قيمة أن تكون `NULL`. لكن قاعدة بيانات Oracle تتعامل مع السلسلة الفارغة على أنها `NULL`:

```sql
   SELECT     '0 IS NULL???' AS "what is NULL?" FROM dual
    WHERE      0 IS NULL
UNION ALL
   SELECT    '0 is not null' FROM dual
    WHERE     0 IS NOT NULL
UNION ALL
   SELECT ''''' IS NULL???'  FROM dual
    WHERE    '' IS NULL
UNION ALL
   SELECT ''''' is not null' FROM dual 
    WHERE    '' IS NOT NULL
```

ولزيادة الارتباك، توجد حتى حالة تتعامل فيها قاعدة بيانات Oracle مع `NULL` على أنه سلسلة فارغة:

```sql
SELECT dummy
     , dummy || ''
     , dummy || NULL
  FROM dual
```

ينبغي أن يؤدي ربط العمود `DUMMY` (الذي يحتوي دائماً على `'X'`) بـ`NULL` إلى إرجاع `NULL`.

يُستخدم مفهوم `NULL` في كثير من لغات البرمجة. وأينما بحثت، لن تجد السلسلة الفارغة مساوية لـ`NULL` أبداً… إلا في قاعدة بيانات Oracle. بل إنه من المستحيل فعلاً تخزين سلسلة فارغة في حقل `VARCHAR2`؛ فإن حاولت، تخزّن قاعدة بيانات Oracle قيمة `NULL` فقط.

هذه الخصوصية ليست غريبة فحسب، بل خطيرة أيضاً. وإضافة إلى ذلك، لا تتوقف غرابة `NULL` في قاعدة بيانات Oracle عند هذا الحد، بل تمتد إلى الفهرسة.

## المحتويات

1. *[`NULL` في الفهارس](/book/use-the-index-luke/sql-where-clause-null-index/index)* — كل فهرس هو فهرس جزئي (partial index)
2. *[قيود `NOT NULL`](/book/use-the-index-luke/sql-where-clause-null-not-null-constraint/index)* — تؤثر في استخدام الفهارس
3. *[محاكاة الفهارس الجزئية](/book/use-the-index-luke/sql-where-clause-null-partial-index/index)* — باستخدام الفهرسة القائمة على الدوال (function-based indexing)
