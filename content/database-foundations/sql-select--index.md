---
title: "جملة SELECT بالتفصيل"
lang: ar
source: https://df.webontwerp.ucll.be/EN/SQL_select/
---

> من أسهل الطرق للفت الانتباه أو للتوظيف كمطور مبتدئ في صناعة التقنية توثيق كل ما تتعلمه. ابنِ مشاريع رائعة، لكن لا تنسَ توثيق رحلتك في الطريق. &mdash;Olawale Daniel

هذا الفصل والفصول الأربعة التالية موضوع واحد كبير في الواقع. ننظر في مكوّنات الاستعلام المختلفة بمزيد من التفصيل. وقد قدّم فصلا SQL الأولان بالفعل `SELECT` و`FROM` و`WHERE` و`GROUP BY` و`HAVING` و`ORDER BY`. وحان الآن وقت التعمق قليلًا في هذه الجمل.

في هذا الفصل، سننظر في بعض ميزات `SELECT`. وكمثال، سنستخدم نسخة موسّعة من جدول "course" المستخدم في [فصل SQL التمهيدي](/book/database-foundations/sql-intro/index). *هذا نص عملي. القراءة جيدة، والفعل أجود. جرّب الأشياء وأنجز التمارين.*

في هذا الفصل نستخدم مخططًا بسيطًا بجدول واحد فقط. ويقابل هذا المخطط النموذج المفاهيمي (conceptual model) التالي:

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-select-0-opo_conceptueel.webp)

ولنوع الكيان "Course" ثماني خواص. والخاصية "Code" هي الخاصية المفتاحية.

يمكنك إيجاد جدول "course" في المخطط "ucllcatalogue" في قاعدة البيانات "df". ولإعداد هذا الجدول لك، اتخذنا الخطوات التالية (وسنعود إليها لاحقًا). وهذه الخطوات للتوضيح فقط. ولا يمكنك تنفيذها بنفسك لأنك لا تملك صلاحيات الكتابة في قاعدة البيانات "df".

أفتح أداة استعلامات في قاعدة البيانات "df" وأنفّذ هذه الشيفرة:

```sql
CREATE SCHEMA ucllcatalogue;
```

وينبغي أن يتمكن جميع الزملاء والطلاب من الوصول إلى هذا المخطط:

```
GRANT USAGE on schema ucllcatalogue to student;
GRANT USAGE on schema ucllcatalogue to lector;
```

وبعد ذلك، أنشئ جدول "course":

```sql
CREATE TABLE ucllcatalogue.course (
  code char(6) NOT NULL ,
  credits smallint NOT NULL ,
  name varchar(100) NOT NULL ,
  start_date date NOT NULL ,
  end_date date ,
  language char(2) NOT NULL ,
  semester smallint NOT NULL ,
  coordinator char(8) NOT NULL ,
  CONSTRAINT pk_course_code PRIMARY KEY ( code )
);
```

وينبغي منح الجميع صلاحيات SELECT. ولا ينبغي أن يتمكن الطلاب من تعديل هذا الجدول أو حذف صفوفه أو تحديثها ونحو ذلك. لذا تقتصر الأذونات على SELECT فقط:

```
grant select on all tables in schema ucllcatalogue to student;
grant select on all tables in schema ucllcatalogue to lector;
```

وأخيرًا، أُضيف 21 صفًا عبر استيراد ملف .CSV. وكان يمكن فعل ذلك بـ `INSERT INTO` أيضًا بالطبع.

## طلب شيء ما

بـ `SELECT` يمكنك طلب شيء من خادم قاعدة بيانات. وقد يكون ذلك حتى حسابًا صغيرًا:

```sql
SELECT 3*4; -- gives 12
SELECT sqrt(200); -- returns the root of 200, i.e., 14,142....
SELECT TRUE AND FALSE; -- result is FALSE
```

من السخف قليلًا استخدام خادم قاعدة بيانات كآلة حاسبة، لكن يمكن فعل ذلك.

يمكنك استخدام دوال رياضية في SQL (فكّر في دوال آلتك الحاسبة مثل sin وcos...). وفوق مثال واحد: `SELECT sqrt(200)` يعيد الجذر التربيعي لـ 200. وابحث عن دالة SQL التي تستخدمها لتقريب عدد إلى أعلى. ومن المصادر الجيدة لذلك [https://www.postgresql.org/docs/current/functions-math.html](https://www.postgresql.org/docs/current/functions-math.html).

#### الحل

```sql
SELECT ceil(2.1) -- gives: 3
SELECT ceiling(2.1) -- alternative, does exactly the same thing
SELECT ceil(-2.1) -- gives: -2 (careful with negative numbers: -2 > -2.1)
```

## تحديد الأعمدة

ما يهمنا أكثر هو استخراج المعلومات من البيانات المخزّنة في قاعدة بيانات. وقد فعلنا ذلك بالفعل في الأمثلة التمهيدية، لذا يمكننا الإيجاز هنا.

باستخدام `*` يمكنك تحديد *جميع* أعمدة الجدول:

```sql
SELECT *
FROM course;
```

يبدأ خادم قاعدة البيانات العمل من جملة `FROM`. ويُحمَّل جدول "course" بأكمله في ذاكرة عمل الخادم. ثم ينظر الخادم في جملة `SELECT`. وتشير النجمة `*` إلى أنه ينبغي عرض جميع الأعمدة.

افترض أننا نريد رؤية العمودين الخاصين بالاسم والفصل الدراسي الذي دُرِّس فيه فقط. ويمكن فعل ذلك كما يلي:

```sql
SELECT name, semester
FROM course;
```

## اسم مستعار لاسم عمود

أحيانًا تريد *ترويسات أخرى* لعمود معروض. افترض أننا نشغّل الاستعلام التالي للحصول على ملخص لتاريخ البداية عندما دُرِّس كل مقرر أول مرة:

```sql
SELECT name, start_date
FROM course;
```

ستكون ترويسة العمود الثاني "start_date". وربما تفضّل كلمة "start" عنوانًا للعمود؟ ويمكن فعل ذلك بسهولة بالغة بـ*اسم مستعار*. وتمنحه باستخدام كلمة `AS`.

```sql
SELECT name, start_date AS start
FROM course;
```

واحترس إذا استخدمت عدة *كلمات بينها مسافة*. فعندئذ يجب أن تُحيط هذا الاسم المستعار بـ*علامات اقتباس مزدوجة* هكذا:

```sql
SELECT name, start_date AS "start date"
FROM course;
```

ومن الأمور المثيرة للاهتمام والمصادر المشكلات في SQL استخدام علامات الاقتباس المفردة والمزدوجة:

- تُستخدم علامات الاقتباس المفردة ('...') في SQL للسلاسل أو التواريخ.
- وتُحجز علامات الاقتباس المزدوجة ("...") لأسماء (وتُسمّى المعرّفات) الجداول والمخططات والأسماء المستعارة التي تحتوي محارف خاصة (مثل مسافة أو شرطة...). وهناك أدوات (مثل DBSchema، [انظر لاحقًا](/book/database-foundations/sql-dbschema/index)) تُحيط في الشيفرة التي تولّدها أسماء الجداول والمخططات دائمًا بعلامات اقتباس مزدوجة.

مزيد من المعلومات مثلًا في [https://www.prisma.io/dataguide/postgresql/short-guides/quoting-rules](https://www.prisma.io/dataguide/postgresql/short-guides/quoting-rules)

## إنشاء أعمدة جديدة

لا يلزمك الاقتصار على الأعمدة الموجودة بالفعل في الجداول عند كتابة الاستعلامات. فمن الممكن تحديد أعمدة جديدة في `SELECT` غير موجودة في جدول.

### نص أو عدد ثابت

إذا وضعت سلسلة أو عددًا كعمود، فسيتكرر ذلك لكل صف في الناتج.

صِف نتيجة الاستعلام التالي:

```sql
SELECT code, name, 'Applied Computer Science'
FROM course;
```

#### الحل

تحصل على نظرة عامة على جميع صفوف الجدول مع رمز المقرر واسمه، وعمود جديد "Applied Computer Science" يتكرر لكل صف.

عدّل الشيفرة من التمرين السابق بحيث تُستخدم كلمة "course" فوق العمود ذي النص المتكرر "Applied Computer Science" كترويسة للعمود. ثم عدّل الاستعلام بحيث تُظهر ترويسة العمود "Course Proximus".

#### الحل

```sql
SELECT code, name, 'Applied Computer Science' AS course
FROM course
 
-- version 2 with spaces in the header
SELECT code, name, 'Applied Computer Science' AS "Course Proximus"
FROM course;
```

### الحساب

تقابل النقطة الواحدة نحو 25 ساعة عمل، بما في ذلك كل شيء (حضور الصفوف والدراسة وإنجاز الواجبات والاستعداد للامتحانات وأداء الامتحان...). وينشئ الاستعلام التالي عمودًا جديدًا "work hours" بناءً على عمود نقاط الدراسة الحالي:

```sql
SELECT code, name, credits * 25 AS "work hours"
FROM course;
```

احذف `AS work hours` من الاستعلام أعلاه لترى ما تصبح عليه ترويسة العمود الافتراضية (القبيحة).

### دمج السلاسل

يمكنك دمج عدة أعمدة في عمود واحد. ومن المفيد لمرشدي الطلاب أن يتبع اسم المقرر دائمًا عدد النقاط بين قوسين، مثل "Database Foundations (6)".

ويتيح لك محرف الأنبوب المزدوج (`||`) وضع أعمدة نصية بعضها بجانب بعض. ويمكن تحقيق التركيبة المطلوبة من الاسم والنقاط بالاستعلام التالي. وانتبه إلى الفرق بين علامات الاقتباس المفردة والمزدوجة.

```sql
SELECT code, name || ' (' || credits || ')' AS "Course Name (credits)"
FROM course;
```

### دوال السلاسل

لنلقِ نظرة سريعة على توثيق PostgreSQL الرائع. فهو شامل جدًا. وفي بعض الأسئلة عن دوال SQL، سيقترح المحاضرون عليك البحث عن الإجابة في التوثيق بنفسك. فـ[اقرأ الدليل الملعون](https://en.wikipedia.org/wiki/RTFM) إذن!

أبدأ عادةً من صفحة الفهرس [https://www.postgresql.org/docs/current/bookindex.html](https://www.postgresql.org/docs/current/bookindex.html). وعند حرف S في string أجد عددًا من الإحالات إلى [https://www.postgresql.org/docs/current/functions-string.html](https://www.postgresql.org/docs/current/functions-string.html). تصفّح القائمة الطويلة من الميزات. ونعطي أدناه مثالين على دوال السلاسل.

#### التبديل بين الحروف الكبيرة والصغيرة

تتيح لك الدالتان `lower()` و`upper()` التبديل بين الحروف الصغيرة والكبيرة (انظر الصورة أدناه لمعرفة [أصل](https://en.wikipedia.org/wiki/Letter_case) هذين التعيينين). وخصوصًا إذا أردنا البحث في الفصل التالي عن سلاسل (في جملة `WHERE`)، فغالبًا ما يكون الخيار الآمن تحويل كل شيء إلى حروف صغيرة أولًا لأن *السلاسل في SQL حساسة لحالة الأحرف*. فالسلسلة 'Van Hee' ليست نفسها 'Van hee'.

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-select-1-letterkast.webp) صورة: الحروف الأكثر استخدامًا (أي الحروف الصغيرة) في الدرج السفلي، والأقل استخدامًا (الحروف الكبيرة) في الدرج العلوي. ويعرض الاستعلام التالي جميع أسماء المقررات بحروف صغيرة:

```sql
SELECT code, lower(name)
FROM course;
```

#### السلسلة الفرعية

عملية أساسية ثانية مع السلاسل هي *تحديد جزء من السلسلة*. ويمكن فعل ذلك بالدالة `substring()`. ويعيد الاستعلام التالي الجزء الرقمي فقط من رمز المحاضر (العمود 'coordinator')، أي دون حرف 'u':

```sql
SELECT code, substring(coordinator from 2) -- start at letter 2 to the end
FROM course;
```

ربما لاحظت بالفعل أن جميع رموز المقررات تبدأ بـ 'MBI' (في برنامج BCS على أي حال). وجميع المحاضرين لهم رقم يبدأ بـ 'u'. اكتب استعلامًا يعرض رمز المقرر والمنسّق، لكن دون الحرف (أو الحروف) الأولية التي تتكرر دائمًا. وانتبه إلى ترويسات الأعمدة!

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-select-2-zonderbeginletters.webp)

#### الحل

```sql
SELECT substring(code from 4) AS "short code",
  substring(coordinator from 2) AS "coordinator(shortened)"
FROM course;
```

### CASE

افترض: بدلًا من عمود النقاط، نريد فقط عرض عمود يُظهر القيم 'small' (للمقررات ذات 4 نقاط أو أقل)، و'medium' (للمقررات ذات 5 أو 6 نقاط)، و'large' للمقررات ذات أكثر من 6 نقاط. وسيُبنى ذلك العمود على عمود 'credits' وسيُنشأ ببنية `CASE`.

ونرجع إلى التوثيق. وعبر صفحة الفهرس نجد 'CASE: conditional expressions' في الصفحة [https://www.postgresql.org/docs/current/functions-conditional.html](https://www.postgresql.org/docs/current/functions-conditional.html). وستجد البنية التالية (وأمثلة عليها) هنا:

```
CASE
  WHEN condition THEN result
  [WHEN ...]
  [ELSE result]
END
```

وبتطبيق ذلك على الاستعلام المطلوب، نحصل على الاستعلام الممكن التالي:

```sql
SELECT name,
  CASE
    WHEN credits <= 4 THEN 'small'
    WHEN credits <= 6 THEN 'medium' -- checking > 4 not necessary
    ELSE 'large'
  END AS size
FROM course;
```

فأول شرط يتحقق يؤدي إلى إسناد قيمة في العمود. وتُتخطى بقية السطور في `CASE` حينئذ. ولاحظ أيضًا أننا نستخدم اسمًا مستعارًا (`AS`) لأنه لولا ذلك لأظهرت ترويسة العمود 'case' فقط.

*المسافات البيضاء* (الإزاحة بعلامات الجدولة أو المسافات) ليست مهمة لخادم قاعدة البيانات، لكنها *مهمة للأشخاص الذين عليهم قراءة شيفرتك* (مثل المحاضرين الذين يصححون واجباتك).

المقررات التي ليس لها تاريخ انتهاء تُسمّى مقررات 'new' في مقابل المقررات 'old' التي لم تعد تُدرَّس ولها تاريخ انتهاء في جدولنا. اكتب الاستعلام الذي يولّد نتيجة الشكل أدناه. هل نحتاج إلى قول المزيد؟ لاحظ ترويسات الأعمدة...

![new column with the text old or new](https://df.webontwerp.ucll.be/images/database-foundations/sql-select-3-oudnieuw.webp)

#### الحل

```sql
SELECT name, code,
  CASE
    WHEN end_date is null THEN 'new'
    ELSE 'old'
  END AS "old or new"
FROM course;
```

## DISTINCT

اسرد جميع اللغات الممكنة المستخدمة في المقررات. والاستعلام لذلك ليس صعبًا:

```sql
SELECT language
FROM course;
```

يحتوي الناتج على عدد من الصفوف بعدد صفوف الجدول. وهذا ليس ما نريده فعلًا. ولتجنّب *التكرار* استخدم `DISTINCT` بعد كلمة `SELECT`:

```sql
SELECT DISTINCT language
FROM course;
```

تنبيه: يجب أن يكون *كامل* تركيب جميع الأعمدة التي تأتي بعد كلمة `DISTINCT` مختلفًا. عدّل الاستعلام إلى:

```sql
SELECT DISTINCT language, coordinator
FROM course;
```

نحصل الآن على صفوف أكثر مما قبل، لكن أقل من العدد الكامل للصفوف لأن بعض المنسّقين لهم عدة مقررات باللغة نفسها. فمثلًا، تحقق في الجدول الأصلي من أن المنسّق 'u0012047' يظهر ثلاث مرات باللغة الهولندية. فتركيب اللغة والمنسّق هو نفسه ثلاث مرات. وباستخدام الكلمة المفتاحية `DISTINCT` سيُعرض هذا الصف مرة واحدة فقط.

أنشئ قائمة بكل محاضر وعدد نقاط كل مقرر لكل مقرر. وأحصِ كم صفًا يوجد فيها. ثم تأكد من عدم وجود مكررات في هذه القائمة، أي إذا كان المحاضر 'u0012047' يدرّس مقررين بـ 6 نقاط، فينبغي أن يظهر هذا الصف في القائمة مرة واحدة فقط.

#### الحل

```sql
-- the list without duplicates (for the full list remove distinct)
SELECT distinct coordinator, credits
FROM course;
```

## العمل بالتواريخ

نوع البيانات `date` مهم جدًا في قاعدة بيانات. وهناك عشرات الدوال التي يمكنها معالجة تاريخ. وسننظر في بعضها فقط هنا. علاوة على ذلك، لا يوجد نوع بيانات `date` فقط، بل أيضًا `timestamp` و`time` و`interval` (انظر التوثيق في [https://www.postgresql.org/docs/current/datatype-datetime.html](https://www.postgresql.org/docs/current/datatype-datetime.html)).

وفي الوقت الحالي، نقتصر على نوع البيانات `date`. ويقدّم [التوثيق](https://www.postgresql.org/docs/current/functions-datetime.html) نظرة عامة على دوال `date/time` التي توفّرها PostgreSQL.

### Extract … from

يحتوي التاريخ على السنة والشهر واليوم. ويضم الوقت إضافة إلى ذلك الساعات والدقائق والثواني... وبالدالة [`EXTRACT`](https://www.postgresql.org/docs/current/functions-datetime.html#FUNCTIONS-DATETIME-EXTRACT) يمكنك استخراج جزء من تاريخ (أو وقت). ومثال صغير من قائمة المقررات لتوضيح ذلك:

```sql
SELECT code, EXTRACT(year FROM start_date) AS "start academic year"
FROM course;
```

يعرض هذا الاستعلام قائمة بجميع المقررات مع الرمز والسنة التي دُرِّس فيها المقرر أول مرة. وقائمة الاحتمالات واسعة جدًا: month وweek وday وhour... (انظر [التوثيق](https://www.postgresql.org/docs/current/functions-datetime.html#FUNCTIONS-DATETIME-EXTRACT)).

### الحساب بالتواريخ

يمكنك زيادة تاريخ أو إنقاصه بعدد صحيح، وطرح التواريخ بعضها من بعض، ونحو ذلك ([التوثيق](https://www.postgresql.org/docs/current/functions-datetime.html)).

#### مثال 1: طرح التواريخ بعضها من بعض

يحسب الاستعلام التالي لكل مقرر عدد الأيام التي سيدوم فيها أو دام. وبالطبع، إذا لم نعرف تاريخ الانتهاء، فلا يمكن حساب النتيجة وتحصل على القيمة `NULL`:

```sql
SELECT code, end_date - start_date AS "number of days"
FROM course;
```

ويبدو أن المقرر ذا الرمز 'MBI68A' هو المقرر الأطول مدة: 5477 يومًا.

#### مثال 2: الدالتان age() وnow()

يعرض مثال ثانٍ دالتين: `age()` و`now()`. كم عمري اليوم إذا وُلدت في 7 مايو 1967؟

```sql
SELECT age(now(),'1967-05-07');
-- alternative is: SELECT age(CURRENT_DATE, '1967-05-07');
-- second alternative: SELECT age(timestamp '1967-05-07');
```

## تغيير نوع البيانات

من المشكلات الكلاسيكية في لغات البرمجة ذات الأنواع *تحويل قيمة إلى نوع بيانات آخر*. فأنت تريد جمع عدد صحيح مع عدد عشري، أو تحويل عدد إلى سلسلة... وفي الإنجليزية يُسمّى هذا الإجراء 'to cast'.

كان المثال الأخير في القسم السابق، الذي حُسب فيه العمر، مثالًا على *تحويل تلقائي*. ووفق التوثيق الذي أشرنا إليه بضع مرات، تعمل الدالة `age()` في النسخة الأولى من الاستعلام على `timestamp`ين اثنين. غير أننا كتبنا `age(now(),‘1967-05-07’)`. فالدالة `now()` تعيد `timestamp`، لكن الوسيط الثاني ('1967-05-07') هو `date` وليس `timestamp`. غير أن PostgreSQL سيحوّل هذا الـ `date` بصمت إلى `timestamp` (باتخاذ منتصف الليل وقتًا).

### CAST … AS

لكن كثيرًا ما يتعيّن عليك إجراء التحويل بنفسك. ويمكن فعل ذلك بنوعين من الصيغة: إما بالدالة `CAST(... AS ...)`، وإما بالتدوين `::`. ونعطي بعض الأمثلة البسيطة:

```sql
-- cast a string to an integer
SELECT CAST('123' AS integer);
SELECT '123'::integer; -- different notation, but does the same thing as the CAST

-- cast an integer to a numeric
SELECT CAST(1234 AS numeric(8,3));
SELECT 1234::numeric(8,3); -- different notation, but does the same thing

-- a number to a string
SELECT CAST(1234 AS char(6)); -- generates the string '1234  '
```

### TO_CHAR

المثال الأخير أعلاه (عدد إلى سلسلة) غريب بعض الشيء. فعادةً تريد تحويل القيم في عمود إلى سلسلة *بصيغة معينة*، مثل تاريخ بالتدوين الأوروبي بشرطات مائلة بين اليوم والشهر والسنة. ولهذا توجد الدالة `TO_CHAR()` ([التوثيق](https://www.postgresql.org/docs/current/functions-formatting.html)). وبعض الأمثلة:

```sql
SELECT TO_CHAR(date '1967-05-07', 'dd/mm/yyyy'); -- results: '07/05/1967'
SELECT TO_CHAR(date '1967-05-07', 'day dd month yyyy'); -- results: 'sunday 07 may 1967'
SELECT TO_CHAR(148.5, '9999.9999'); -- returns the string ' 148.5000'
```
