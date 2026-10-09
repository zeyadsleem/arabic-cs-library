---
title: "جملتا GROUP BY وHAVING بالتفصيل"
lang: ar
source: https://df.webontwerp.ucll.be/EN/SQL_groupby_having/
---

> الالتباس جزء من البرمجة. &mdash;Felienne Hermans، The Programmer's Brain

## تجميع الصفوف

في [فصل استيراد ملف CSV](/book/database-foundations/sql-csv/index#Grouping-data-with-GROUP-BY) تعرّفت لأول مرة على تجميع الصفوف. وكثيرًا ما يتضمن ذلك سؤالًا يحتوي الكلمتين "لكل". مثال: "أدخل *لكل محاضر* عدد المقررات التي يكون هذا المحاضر منسّقًا لها". "يرجى تقديم **العدد الإجمالي للنقاط لجميع المقررات التي تُدرَّس الآن أو دُرِّست سابقًا بتلك اللغة". حسنًا، هذه الجملة الأخيرة لا تحتوي الكلمتين "لكل"، لكن يمكنك إعادة صياغتها هكذا: "قدّم *لكل لغة* العدد الإجمالي لنقاط جميع المقررات التي تُدرَّس أو دُرِّست بتلك اللغة."."

والصورة التي نستخدمها هي: *جمّع الصفوف التي لها القيمة نفسها لحقل معين (أو حقول معينة) في صندوق*. ومن ذلك الصندوق، لم تعد تستطيع عرض الصفوف الفردية (فلا يُسمح لك بفتح الصندوق). وعليك أن تقتصر *على معلومات ملخّصة*.

وكمثال، لنأخذ السؤال أعلاه: "لكل محاضر، يرجى تقديم عدد المقررات التي يكون هذا المحاضر (أو كان) منسّقًا لها.".

يمكنك اختبار أمثلة الشيفرة في جدول "course" في المخطط "ucllcatalogue" (أو في نسختك الخاصة من هذا الجدول في مخططك الشخصي).

في خطوة أولى، كتمرين، اكتب الاستعلام الذي يولّد الشكل التالي، أي قائمة بجميع المنسّقين مع الرمز والاسم والفصل الدراسي، مرتبة حسب رمز المحاضر (رقم u، تصاعديًا):

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-groupby-having-0-sortbycoord.webp)

ليس استعلامًا صعبًا إلى هذا الحد، أليس كذلك؟

#### الحل

```sql
SELECT coordinator, code, name, semester
FROM course
ORDER BY coordinator;
```

يمكنك أن تقرأ في هذا الشكل أن المحاضر 'u0012047' (هو أو كان) منسّقًا لـ 'Probleemoplossend denken' و'Web Development 1' و'Front-end Development'. والآن إذا جمّعت حسب المحاضر فستوضع جميع الصفوف ذات القيمة نفسها للعمود 'coordinator' معًا في صندوق واحد. وبذلك يحتوي الصندوق الأول على ثلاثة صفوف. وعلى الصندوق اسم الحقل المشترك بين جميع هذه الصفوف، أي 'u0012047'.

ويحتوي الصندوق الثاني المسمّى 'u0015529' على صفين. أما الصندوق الثالث ('u0032987') فيحتوي على صف واحد فقط، وهكذا.

وبما أن هذه الصفوف معًا في صندوق (ولا يُسمح لك بفتح الصناديق للنظر في صفوف محددة)، لم تعد تستطيع استرجاع بيانات فردية في جملة `SELECT`. وإذا حاولت فعل ذلك فستحصل على رسالة خطأ نمطية، كما توضح قطعة الشيفرة التالية:

```sql
SELECT coordinator, code, name, semester
FROM course
GROUP BY coordinator;

-- the result of this query is this error:
ERROR: column "course.code" must appear in the GROUP BY clause
  or be used in an aggregate function
LINE 2: select coordinator, code, name, semester
                            ^
SQL state: 42803
Character: 50
```

أما هذا الاستعلام فيعرض فقط ملخصًا لجميع "تسميات" الصناديق ويُنفَّذ دون أي مشكلات:

```sql
SELECT coordinator
FROM course
GROUP BY coordinator;
```

ولا يجوز لك النظر داخل الصندوق وتقديم سوى معلومات ملخّصة معينة في `SELECT`، مثل عدد الصفوف، ومجموع جميع الصفوف بالنسبة إلى عمود معين. *ونسمي دوال الملخّص هذه "دوال التجميع" ونتحدث عن "تجميع" البيانات*. وفي القسم التالي سننظر في عدة من هذه الدوال.

## دوال التجميع

### عدّ عدد الصفوف

السؤال الذي لا نزال نحاول الإجابة عنه هو "لكل محاضر، يرجى تقديم عدد المقررات التي يكون هذا المحاضر (أو كان) منسّقًا لها.". وأنت تعرف الآن في هذه الجملة أن جزء "لكل محاضر" يعني أنه عليك تجميع الصفوف التي لها القيمة نفسها للمنسّق. *ويتم عدّ عدد الصفوف الموجودة في صندوق واحد* بالدالة `COUNT()` ([التوثيق](https://www.postgresql.org/docs/current/functions-aggregate.html)). وإذا أردت عدّ الصفوف كاملة، فاستخدم `COUNT(*)`.

والاستعلام النهائي الذي يعيد إجابة السؤال هو:

```sql
SELECT coordinator, COUNT(*)
FROM course
GROUP BY coordinator
ORDER BY coordinator;
```

### مجموع بيانات معينة في مجموعة

دالة التجميع الثانية هي `SUM()`. *وتستخدمها لجمع القيم في عمود معين*. تنبيه: نرى بانتظام طلابًا يخلطون بين `COUNT()` و`SUM()`! أنجز الآن التمرين التالي.

اكتب استعلام SQL يولّد ملخصًا لمجموع عدد النقاط التي يكون محاضر ما منسّقًا لها. ونظّم النتيجة حسب مجموع عدد النقاط المتناقص. وينبغي أن تحصل على الشكل أدناه. وكالعادة: انتبه أيضًا إلى الترويسة الصحيحة لكل عمود.

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-groupby-having-1-sumSP.webp)

#### الحل

```sql
SELECT coordinator, SUM(credits) AS "total number of credits"
FROM course
GROUP BY coordinator
ORDER BY 2 DESC;
```

### الحد الأدنى والحد الأعلى والمتوسط

ودوال التجميع الثلاث الأخيرة هي `MIN()` و`MAX()` و`AVG()`، على التوالي للحد الأدنى والحد الأعلى أو المتوسط الحسابي *للقيم في عمود معين*. أنجز التمارين التالية.

أنشئ قائمة تعرض متوسط عدد النقاط لكل فصل دراسي. ورتّب صفوف الإجابة حسب الفصل من الصغير إلى الكبير. وينبغي أن تحصل على الشكل أدناه. وهل يمكنك إدراج اسم المقرر أيضًا؟

![مجمّع حسب الفصل الدراسي](https://df.webontwerp.ucll.be/images/database-foundations/sql-groupby-having-2-groupavgsemester.webp)

#### الحل

لن تحتوي كل مهمة على الكلمتين "لكل". فاللغة فيها بدائل كثيرة لطلب الشيء نفسه. لذا هنا سيتعيّن عليك التجميع حسب الفصل الدراسي وسيتعيّن عليك استخدام دالة التجميع `AVG()`. ومن الواضح أنك لا تستطيع استرجاع معلومات من مقررات فردية (مثل الاسم) لأنها "معلومات داخل الصندوق". والاستعلام التالي حل ممكن:

```sql
SELECT semester, AVG(credits) AS "average number of credits"
FROM course
GROUP BY semester
ORDER BY 1;
```

أصعب قليلًا... اسرد حسب اللغة عدد المقررات ذات 4 نقاط على الأقل المدرَّسة بتلك اللغة. ولا يلزمك الترتيب.

#### الحل

```sql
SELECT language, COUNT(*) AS number
FROM course
WHERE credits >= 4
GROUP BY language;
```

## التجميع حسب تعبير

تجمع عادةً حسب عمود معين، لكن من الممكن أيضًا التجميع حسب "عمود محسوب" (تعبير). ولكل مقرر تاريخ بداية. ومن تاريخ البداية هذا يمكنك استخراج السنة بسهولة بواسطة [`EXTRACT`](https://df.webontwerp.ucll.be/NL/SQL_select/index.html#Extract-%E2%80%A6-from). وكمثال، نقدّم الاستعلام الذي يجيب عن السؤال التالي: "اسرد لكل سنة عدد المقررات التي دخلت المنهج في تلك السنة.".

```sql
SELECT EXTRACT(year FROM start_date), COUNT(*) AS "number of courses"
FROM course
GROUP BY EXTRACT(year FROM start_date)
ORDER BY 1;
```

## التجميع حسب عدة أعمدة

يجمع الاستعلام التالي حسب عمودين: الفصل الدراسي والنقاط:

```sql
SELECT semester, credits, COUNT(*)
FROM course
GROUP BY semester, credits
ORDER BY 1, 2;
```

ينشئ هذا الاستعلام 15 صندوقًا (انظر الشكل). ويظهر الصندوق الأول (بإطار برتقالي) على التسمية "الفصل الأول، مقررات ذات 3 نقاط". ويوجد أربعة صفوف في هذا الصندوق. أما الصندوق الثاني (بإطار أزرق) فهو "الفصل الأول، مقررات ذات 4 نقاط". وفي هذا الصندوق مقرر واحد فقط. وهكذا.

![يمكن التجميع على أعمدة متعددة](https://df.webontwerp.ucll.be/images/database-foundations/sql-groupby-having-3-grouptweekol.webp)

## HAVING

سبق أن غُطّيت جملة `HAVING` [في فصل ملفات CSV](/book/database-foundations/sql-csv/index#HAVING). ويجد الطلاب غالبًا صعوبة في تمييزها عن جملة `WHERE`، وهو أمر مفهوم لأنها تفعل شيئًا مشابهًا. فـ `WHERE` تأتي مباشرة بعد تنفيذ المكوّن `FROM` وتختار *أي الصفوف يجوز أن تبقى وأيّها سيختفي*.

أما المكوّن `HAVING` فلا يُنفَّذ إلا بعد إنشاء "الصناديق" عند التجميع. *ويقرر هذا الشرط أي الصناديق يجوز أن تبقى وأيّها سيختفي من النتيجة*.

## تمارين

أنجز الآن التمارين التالية.

بالنسبة إلى الفصول الفردية (أي 1 و3 و5...)، اسرد عدد النقاط وعدد المقررات في ذلك الفصل. ورتّب حسب عدد النقاط المتناقص. وينبغي أن تحصل على الشكل التالي.

ونصيحة لإيجاد الفصول الفردية: انظر لهذا الغرض في إمكانات *باقي القسمة الصحيحة* (عملية "المودولو")، وابحث عن "Modulo" في صفحة [https://www.postgresql.org/docs/current/functions-math.html](https://www.postgresql.org/docs/current/functions-math.html).

![تجميع على فصول دراسية فردية](https://df.webontwerp.ucll.be/images/database-foundations/sql-groupby-having-4-grouponevensem.webp)

#### الحل

```sql
SELECT semester, SUM(credits) AS "total number of credits", COUNT(*) AS "number of courses"
FROM course
WHERE semester %2 != 0
GROUP BY semester
ORDER BY 2 DESC;
```

كم عدد المنسّقين المختلفين في كل فصل دراسي؟

#### الحل

```sql
SELECT SEMESTER, COUNT(DISTINCT(coordinator)) AS number_of_different_coordinators
FROM course
GROUP BY semester;
```

أعطِ جميع الفصول الدراسية التي فيها مقرران "لاحقان" أو أكثر (مقررات تنتهي بـ '2') في كل فصل.

#### الحل

```sql
SELECT semester, COUNT(name) AS number_of_follow_up_courses
FROM course
WHERE name LIKE'%2'
GROUP BY semester
HAVING COUNT(name) >= 2;
```

يعطي هذا نتيجة "خاطئة" لأن مقرر 'Communication in French 2 (sem 2)' لا يتبع الاصطلاح (غير المكتوب؟) في التسمية. وقد تعطي هذه النسخة نتيجة أفضل:

```sql
SELECT semester, COUNT(name) AS number_of_follow_up_courses
FROM course
WHERE name LIKE '%2' OR name LIKE '%2 (%'
GROUP BY semester
HAVING COUNT(name) >= 2;
```

## تمارين SQLzoo

أنجز [سلسلة التمارين 5 على دوال التجميع](https://sqlzoo.net/wiki/SUM_and_COUNT) (جدول 'world').
