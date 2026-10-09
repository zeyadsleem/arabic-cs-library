---
title: "جملة ORDER BY بالتفصيل"
lang: ar
source: https://df.webontwerp.ucll.be/EN/SQL_orderby/
---

> ينبغي أن يتعلم كل شخص في هذا البلد برمجة الحاسوب، لأنها تعلّمك كيف تفكر. &mdash;Steve Jobs

إذا أعطاك استعلام `SELECT` عددًا من الصفوف نتيجةً، فإن الترتيب الذي تُعرض به *غير متوقع*. والطريقة الوحيدة للحصول على ترتيب معين هي استخدام جملة `ORDER BY`.

يمكنك اختبار أمثلة الشيفرة في جدول "course" في المخطط "ucllcatalogue" (أو في نسختك الخاصة من هذا الجدول في مخططك الشخصي).

## الترتيب حسب الأعمدة

### حسب اسم العمود

يعرض الاستعلام التالي ثلاثة أعمدة لجميع المقررات التي لها أقل من 6 نقاط:

```sql
SELECT code, credits, name
FROM course
WHERE credits < 6;
```

كما ذُكر، لا يمكنك قول شيء مسبقًا عن الترتيب الذي تُعرض به هذه الصفوف. وإذا أردت ترتيب الصفوف بحيث تُرتَّب النقاط من الصغير إلى الكبير، فيمكنك فعل ذلك باستخدام ترويسة العمود في جملة `ORDER BY`:

```sql
SELECT code, credits, name
FROM course
WHERE credits < 6
ORDER BY credits ASC;
```

ويمكن إغفال الإضافة `ASC` ("تصاعدي")، لأن ذلك هو *الترتيب القياسي*.

ولأن الأمر مهم إلى هذا الحد، لنستعرض مرة أخرى الترتيب الذي يُنفَّذ به هذا الاستعلام:

1. أولًا `FROM`: ما الجداول التي ينبغي تحميلها في ذاكرة العمل؟
2. ثم `WHERE`: تُبقى فقط الصفوف التي تحقق هذا الشرط، وتُحذف البقية.
3. ثم `GROUP BY`، يتبعه مباشرة `HAVING`. وهاتان الجملتان غير موجودتين في هذا المثال.
4. وعندها فقط تأتي جملة `SELECT`: ما الأعمدة التي ينبغي عرضها؟
5. وأخيرًا `ORDER BY`: بأي ترتيب تُعرض الصفوف؟

وهذه نتيجة الاستعلام:

![الترتيب تصاعديًا حسب عدد الوحدات المعتمدة (credits)](https://df.webontwerp.ucll.be/images/database-foundations/sql-orderby-0-orderbySP.webp) المقررات ذات أقل عدد من النقاط في الأعلى. وداخل الصفوف ذات القيمة نفسها لعدد النقاط (مثل 3)، يبقى الترتيب غير متوقع. غير أنه يمكنك تحديد أكثر من عمود للترتيب حسبه. افترض أنك تريد الترتيب أولًا حسب عدد النقاط المتزايد ثم (داخل الصفوف ذات عدد النقاط نفسه) أبجديًا حسب الاسم، فيمكنك فعل ذلك كما يلي:

```sql
SELECT code, credits, name
FROM course
WHERE credits < 6
ORDER BY credits, name;
```

وهذه هي النتيجة:

![الترتيب تصاعديًا حسب عدد الوحدات المعتمدة (credits) ثم حسب الاسم](https://df.webontwerp.ucll.be/images/database-foundations/sql-orderby-1-orderbySPnaam.webp)

لاحظ أن الترتيب مهم: `ORDER BY credits, name` يعيد نتيجة مختلفة عن `ORDER BY name, credits`!

### حسب الرقم التسلسلي للعمود

كما يحدث كثيرًا في SQL، هناك طريقة أقصر لكتابة الأمور. خذ الاستعلام الأخير مثالًا:

```sql
SELECT code, credits, name
FROM course
WHERE credits < 6
ORDER BY credits, name;
```

والبديل الأقصر هو *كتابة أرقام الأعمدة* من `SELECT` بدلًا من استخدام الاسم:

```sql
SELECT code, credits, name
FROM course
WHERE credits < 6
ORDER BY 2, 3;
```

ثم تحتاج بالطبع إلى معرفة أرقام الأعمدة في `SELECT`. والعيب الصغير هو أنه يتعيّن عليك تغيير أرقام الأعمدة إذا قررت إضافة عمود إضافي في جملة `SELECT`، كما في هذا الاستعلام الموسّع مثلًا:

```sql
SELECT code, coordinator, credits, name -- extra second column
FROM course
WHERE credits < 6
ORDER BY 3, 4; -- add 1 to all column numbers
```

## الترتيب تصاعديًا وتنازليًا

بـ `ASC` ترتّب من الصغير إلى الكبير. وهذه أيضًا القيمة الافتراضية، لذا يمكنك إغفالها. ويُرتَّب من الكبير إلى الصغير بـ `DESC`. وخصوصًا إذا لم تكن الإنجليزية لغتك الأم، فقد يكون من الصعب استنتاج ترتيب الفرز الصحيح من السؤال الذي تحاول الإجابة عنه. ففي اللغة هناك طرق كثيرة مختلفة لقول الشيء نفسه تقريبًا. وهذه نظرة موجزة مع بعض الاحتمالات:

- `ASC`: من الصغير إلى الكبير، تصاعديًا، أبجديًا، زمنيًا، تزايديًا، متزايدًا، ناميًا...
- `DESC`: من الكبير إلى الصغير، تنازليًا، عكس الزمني، متناقصًا، متقلّصًا...

## الترتيب حسب التعبيرات

أنت تعرف بالفعل أنه يمكنك إضافة أعمدة جديدة بنفسك ([انظر فصل SELECT](/book/database-foundations/sql-select/index#Creating-new-columns)). ويمكنك فعل الشيء نفسه في جملة ORDER BY كما يوضح المثال التالي:

```sql
SELECT code, coordinator, credits, name
FROM course
ORDER BY
  CASE
    WHEN credits <= 6 THEN 'normal'
    ELSE 'special'
  END;
```

ويمكنك مقارنة ذلك بإضافة عمود جديد (ضع `CASE` في `SELECT` لتجربته) ثم الترتيب حسب هذا العمود الجديد. ويعطي هذا الاستعلام جميع المقررات ذات 6 نقاط أو أقل القيمة "normal" وجميع المقررات الأكبر القيمة "special". ثم تُرتَّب النتائج حسب هاتين القيمتين. وبما أن "special" يأتي لاحقًا في الترتيب الأبجدي بعد "normal"، فستكون جميع المقررات ذات 6 نقاط أو أقل في أعلى القائمة.

ومثال ثانٍ: غالبًا ما يكون للحرف الأخير من رمز المقرر معنى خاص. ويتيح الاستعلام التالي الترتيب حسب هذا الحرف الأخير ("A" و"H" وغيرها):

```sql
SELECT code, coordinator, credits, name
FROM course
ORDER BY substring(code FROM 6); -- all letters from the 6th, so only the last letter
```

## ماذا عن قيم NULL؟

كما شُرح بالفعل في [حل التمرين الأول على مجموعة بيانات CSV](/book/database-foundations/sql-csv/index#Ranking-based-on-Internet-speed)، لا يحدد معيار SQL ما ينبغي فعله بقيم `NULL` في عمود يُرتَّب. ويعتبر PostgreSQL قيمة `NULL` أكبر من جميع القيم الأخرى، وبالتالي ستظهر الصفوف التي تحتوي هذه القيمة في العمود المرتَّب حسبه في أسفل القائمة. وهناك أنظمة قواعد بيانات أخرى تفعل العكس...

## تمارين

اسرد جميع المقررات مرتبة أبجديًا حسب المنسّق، ولكل منسّق مرتبة تصاعديًا حسب الفصل الدراسي.

#### الحل

```sql
SELECT name, coordinator, semester
FROM course
ORDER BY coordinator ASC, semester ASC;
```

رتّب المقررات على أساس مدة تدريسها. والمقررات التي دُرِّست أطول مدة في الأعلى. وإذا كان تاريخ الانتهاء `NULL`، فيجوز لك تعيين عدد السنوات مساويًا 1.

#### الحل

```sql
SELECT name, start_date, end_date,
  CASE
    WHEN end_date IS NULL THEN 1
     ELSE(end_date - start_date) / 365.25     -- Every 4 years a leap year, not entirely correct, but good enough
  END AS number_of_years_given
FROM course
ORDER BY 4 DESC;
```

## تمارين SQLzoo

### جدول الفائزين بجائزة نوبل

جدول الفائزين بجائزة نوبل بالأعمدة التالية:

- yr: السنة،
- subject: مجال الدراسة، الموضوع،
- winner: اسم الفائز.

[سلسلة التمارين 3](https://sqlzoo.net/wiki/SELECT_from_Nobel_Tutorial) تحتوي أساسًا على تمارين على `WHERE`. وفي التمارين الأخيرة، ينبغي أن تستخدم أيضًا `ORDER BY`.

والآن أنجز [الاختبار 3](https://sqlzoo.net/wiki/Nobel_Quiz) على جدول الفائزين بنوبل.
