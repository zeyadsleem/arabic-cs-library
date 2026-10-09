---
title: "دمج الجداول بواسطة OUTER JOIN"
lang: ar
source: https://df.webontwerp.ucll.be/EN/SQL_outerjoin/
---

> لا يمكنك الشكوى من البحر إذا غرقت للمرة الثانية. &mdash;مثل آيسلندي

ومرة أخرى نبدأ بفيلم: تكملة الفيلم من الفصل السابق عن INNER JOIN.

## الحاجة إلى OUTER JOIN

أنجز التمرين التالي كمقدمة.

يريد مدير برنامجنا نظرة عامة على جميع المحاضرين مع معرّف المحاضر والاسم الأول والاسم الأخير واسم المقرر الذي يكونون منسّقين له. ورتّب أبجديًا حسب الاسم الأخير. وينبغي أن تحصل على الشكل أدناه.

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-outerjoin-0-outerjoin_1.webp)

#### الحل

ليس بهذه الصعوبة:

```sql
SELECT lecturer_id, L.first_name, L.last_name, c.name
FROM lecturer L INNER JOIN course c ON L.lecturer_id = c.coordinator
ORDER BY 3;
```

وهذه هي الخطوات التي يتخذها نظام إدارة قواعد البيانات العلائقية عند تنفيذ هذا الاستعلام:

1. أولًا يُنفَّذ `FROM`. وهذا `INNER JOIN` لجدولين، وبذلك يُنشأ *الضرب الديكارتي*: يُدمج كل صف من جدول المحاضرين مع كل صف من جدول المقررات.
2. وليس كل التركيبات في هذا الضرب الديكارتي *منطقية*: تُبقى فقط تلك التي يتطابق فيها معرّف المحاضر (المسمّى في أحد الجدولين "lecturer_id" وفي الآخر "coordinator")، لأنها تحقق شرط الدمج ON L.lecturer_id = c.coordinator.
3. ولا يوجد مكوّن `WHERE`، لذا لا تُسقط أي صفوف من النتيجة.
4. ويغيب أيضًا `GROUP BY` (و`HAVING`).
5. وأخيرًا تُرتَّب صفوف النتيجة أبجديًا حسب الاسم الأخير عبر مكوّن `ORDER BY`.

تعرض القائمة المطلوبة على المدير، لكنه للأسف غير راضٍ تمامًا عن النتيجة. "كنت في الواقع أريد أن يكون *جميع* المحاضرين في القائمة، بمن فيهم الذين لا ينسّقون أي مقرر" تسمعه يقول. غير أن `INNER JOIN` في استعلام SQL الخاص بك يُظهر *فقط* المحاضرين الذين يظهرون في الجدولين معًا، أي فقط منسّقي المقررات.

وإذا أردت تضمين *جميع* المحاضرين في القائمة، فيجب *إضافة* المحاضرين الناقصين إلى نتيجة `INNER JOIN`. وهذا بالضبط ما يفعله `OUTER JOIN`. ما عليك سوى استبدال كلمة `INNER` بـ `LEFT OUTER` أو `RIGHT OUTER` (أو ربما `FULL OUTER`):

```sql
SELECT lecturer_id, L.first_name, L.last_name, c.name
FROM lecturer L LEFT OUTER JOIN course c ON L.lecturer_id = c.coordinator
ORDER BY 3;
```

لماذا `LEFT`؟ يحتوي هذا الدمج جدولين: أحدهما *يسار* كلمة `JOIN` (أي "lecturer") والآخر *يمين* كلمة JOIN (أي "course"). وبعد `INNER JOIN` العادي لا يزال بعض المحاضرين ناقصين من جدول المحاضرين. وبما أن ذلك الجدول يقع يسار كلمة `JOIN`، يصبح هذا `LEFT OUTER JOIN`.

وهذه الشيفرة مكافئة تمامًا لهذه الصيغة:

```sql
SELECT lecturer_id, L.first_name, L.last_name, c.name
FROM course c RIGHT OUTER JOIN lecturer L ON L.lecturer_id = c.coordinator
ORDER BY 3;
```

فقد بدّلنا ببساطة ترتيب كتابة الجدولين. ولا يؤثر ذلك في `INNER JOIN` الذي يحدث أولًا، لكننا استبدلنا كلمة `LEFT` بـ `RIGHT` لمراعاة الترتيب المختلف. ويوضح الشكل التالي النتيجة. وبالمقارنة مع الشكل السابق، *تُضاف عدد من الصفوف*. فمثلًا، هناك المحاضرة Elke Crabbé التي لا تنسّق أي مقرر. وبما أنها لا تظهر في جدول "courses"، فلا توجد أيضًا معلومات عن اسم المقرر. *ولهذا يوجد null (لا قيمة) في العمود الأخير* (السطر البرتقالي).

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-outerjoin-1-outerjoin_2.webp) اشرح لماذا يعيد الاستعلامان التاليان النتيجة نفسها بالضبط:

```sql
-- query 1
SELECT lecturer_id, L.first_name, L.last_name, c.name
FROM course c LEFT OUTER JOIN lecturer L ON L.lecturer_id = c.coordinator
ORDER BY 3;

-- query 2
SELECT lecturer_id, L.first_name, L.last_name, c.name
FROM course c INNER JOIN lecturer L ON L.lecturer_id = c.coordinator
ORDER BY 3;
```

#### الحل

بالنسبة إلى الاستعلام 2 مع `INNER JOIN` تعرف النتيجة بالفعل. والاستعلام 1 هو `LEFT OUTER JOIN`. **ويبدأ كل `OUTER JOIN` أولًا كـ `INNER JOIN` عادي**. وبمجرد الانتهاء من ذلك، ينظر في الصفوف الناقصة من الجدول الأيسر. ثم تُضاف تلك الصفوف. غير أن الجدول الأيسر هنا هو جدول "courses". و*كل* صف من هذا الجدول ممثل بالفعل في `INNER JOIN` (لماذا؟)، لذا لا تُضاف صفوف أخرى. ولذلك يعيد الاستعلامان النتيجة نفسها.

## JOIN وGROUP BY

يمكن دمج `JOIN` مع مكوّنات أخرى دون أي مشكلة، وكذلك مع `GROUP BY` و`HAVING`.

وسنعمل على المثال التالي. جرّب جميع الخطوات بنفسك. وسترتكب أخطاء — كثيرًا ما نستفزّك إليها — لكن هذه أفضل طريقة للتعلّم.

اسرد جميع المحاضرين مع عدد المقررات التي ينسّقونها. وينبغي أن تُضمَّن القائمة حتى المحاضرين الذين ليسوا منسّقي أي مقرر. ورتّب القائمة أبجديًا حسب الاسم.

حلّل المهمة:

- تحتاج إلى دمج معلومات من جدول المحاضرين وجدول المقررات، لذا نحتاج إلى `(INNER) JOIN`.
- وعبارة "أيضًا المحاضرون الذين ليسوا منسّقي أي مقرر..." تشير إلى `OUTER JOIN`.
- *لكل محاضر* ينبغي تقديم معلومات ملخّصة، لذا نحتاج إلى `GROUP BY`.
- وعدّ الأعداد يتم بـ `COUNT()`.

وللتوقع ما ينبغي أن نحصل عليه، نبدأ من الشيفرة المعروفة التي ولّدت الشكل في القسم أعلاه:

```sql
SELECT lecturer_id, L.first_name, L.last_name, c.name
FROM course c RIGHT OUTER JOIN lecturer L ON L.lecturer_id = c.coordinator
ORDER BY 3;
```

انظر إلى القائمة في ذلك الشكل (أعلاه). فالمحاضر "Gerben Adriaens" منسّق لمقرر واحد، و"Goedele Bogers" لمقررين، و"Elke Crabbé" لا شيء، وهكذا.

وسّع هذه الشيفرة بـ `GROUP BY`:

```sql
SELECT lecturer_id, L.first_name, L.last_name, c.name
FROM course c RIGHT OUTER JOIN lecturer L ON L.lecturer_id = c.coordinator
GROUP BY lecturer_id
ORDER BY 3;
```

تحصل على رسالة خطأ (فكّر لحظة لماذا):

```
ERROR: column "c.name" must appear in the GROUP BY clause or be used
in an aggregate function
LINE 2: SELECT lecturer_id, L.first_name, L.last_name, c.name;
```

لماذا توجد رسالة خطأ عن "c.name"؟ إذا درست [فصل GROUP BY](/book/database-foundations/sql-groupby-having/index)، ينبغي أن تكون قادرًا على تقديم الجواب عن هذا السؤال. *فتجميع المعلومات في صناديق لكل محاضر يُفقد المعلومة التفصيلية عن المقررات*. والشيء الوحيد الذي لا يزال بإمكانك استرجاعه هو المعلومات من "دوال التجميع" `MIN()` و`MAX()` و`AVG()` و`COUNT()` و`SUM()`.

غير أن هناك أمرًا غريبًا. فلماذا لا توجد رسالة خطأ عن L.first_name وL.last_name؟ كنا قد شرحنا أن `SELECT` لا يمكنه سرد سوى الأعمدة الموجودة في `GROUP BY` ودوال التجميع. فلماذا إذن لا تحصل على *أي* رسالة خطأ عن L.first_name وL.last_name؟

السبب أنك هنا *تجمّع حسب المفتاح الأساسي* لجدول المحاضرين. لذا أنت متأكد من أن صندوقًا واحدًا سيُنشأ لكل محاضر. وفي ذلك الصندوق يوجد اسم محاضر واحد واسم أول واحد ونحو ذلك، لكن عدة مقررات. لذلك يمكنك استرجاع العمودين L.name وL.first name، لكن ليس c.name.

لذا عليك استخدام دالة تجميع في الشيفرة. وفي هذه الحالة نحتاج إلى عدّ عدد مرات حدوث شيء ما، لذا تلزم دالة `COUNT()`. عدّل الشيفرة إلى:

```sql
SELECT lecturer_id, L.first_name, L.last_name, COUNT(*)
FROM course c RIGHT OUTER JOIN lecturer L ON L.lecturer_id = c.coordinator
GROUP BY lecturer_id
ORDER BY 3;
```

فتحصل على هذه النتيجة *(الخاطئة!)*:

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-outerjoin-2-outerjoin_3.webp)

توجد مشكلة في هذا الشكل (وبالتالي في شيفرتنا). قارن لحظة بالشكل السابق. فـ Gerben لديه مقرر واحد، وGoedele منسّقة لمقررين، *لكن Elke Crabbé ليست منسّقة أي مقرر*. غير أن نتيجة شيفرتنا أن Elke Crabbé منسّقة لمقرر واحد (انظر السهم البرتقالي في الشكل). فما الذي يسير خطأ؟

الخطأ في دالة التجميع `COUNT(*)`. فهذه الدالة (مع `*`) *تعدّ جميع الصفوف، بما فيها التي تحتوي قيمة `NULL` واحدة أو أكثر*. لذا يُعدّ الصف الذي يحتوي معلومات Elke Crabbé. ولحسن الحظ، هذه المشكلة سهلة الحل. فبدلًا من `*` أدخل *العمود الذي يهمك عدّه*. وبشكل محدد، نحن نتحدث هنا عن "c.name". ولن تُعدّ قيمة `NULL` في هذا الحقل. فتنهي `SELECT` بـ `COUNT(c.name)`:

```sql
SELECT lecturer_id, L.first_name, L.last_name, COUNT(c.name)
FROM course c RIGHT OUTER JOIN lecturer L ON L.lecturer_id = c.coordinator
GROUP BY lecturer_id
ORDER BY 3;
```

## تحديد صفوف لا تحقق شرطًا معينًا

ملاحظة: هذا **موضوع صعب إلى حد بعيد**. والتمارين التي تعتمد على هذا المبدأ صعبة جدًا!

يأتيك طلب جديد من مديرك: "أريد قائمة بجميع المحاضرين الذين ليسوا منسّقي مقرر واحد أو عدة مقررات.".

أمر سهل بالطبع! فمع `OUTER JOIN` من القسم السابق حصلت على قائمة بجميع المنسّقين، مضافًا إليها المحاضرون الذين لا يظهرون في جدول المقررات وبالتالي ليسوا منسّقين. ويسهل تمييز "هؤلاء المحاضرين المضافين" بغياب قيمة للعمود الذي يحمل اسم المقرر. ويتم ترشيح الصفوف بعد تنفيذ `FROM` بمكوّن `WHERE`. وبذلك يصبح الاستعلام:

```sql
SELECT lecturer_id, L.first_name, L.last_name, c.name
FROM lecturer L LEFT OUTER JOIN course c ON L.lecturer_id = c.coordinator
WHERE name = NULL -- idea is OK, code not! See assignment below
ORDER BY 3;
```

لقد وضعنا عن قصد خطأ في مكوّن `WHERE` في الاستعلام أعلاه. صحّحه بحيث يُنفَّذ الاستعلام تنفيذًا صحيحًا فتحصل على قائمة بأربعة محاضرين: Elke وMaarten وPatrick وLut.

#### الحل

لا ينبغي أبدًا إجراء المقارنة مع `NULL` بـ '=' بل بكلمة 'IS'. ومكوّن `WHERE` الصحيح هو: `WHERE c.name IS NULL`.

### تمرين

اسرد جميع المعلمين الذين ليسوا منسّقي مقرر له 6 نقاط. ورتّب أبجديًا حسب الاسم ثم حسب الاسم الأول. وينبغي أن تحصل على النتيجة في هذا الشكل:

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-outerjoin-3-outerjoin_4.webp)

#### الحل

تلميح 1: ابدأ هذا التمرين بعمودين أكثر من الاسم الأول والاسم الأخير (وربما بجميع الأعمدة!).

تلميح 2: نريد جميع المحاضرين الذين *لا* ينسّقون مقررًا بـ 6 نقاط. فكيف تختار كل الذين *ينسّقون* مقررًا بـ 6 نقاط؟ فكّر في كيفية عكس ذلك. وقد يساعدك التمرين السابق، حيث اخترنا المحاضرين الذين لم ينسّقوا مقررًا، في إيجاد حل.

تلميح 3: إذا كنت لا تزال عالقًا، فحاول تصوّر ما تحاول فعله: ارسم جدولًا بـ "last_name" و"first_name" و"lecturer_id"، واملأ بعض القيم. ثم ارسم جدولًا بـ "coordinator" و"credits" يحتوي المقررات ذات 6 نقاط. فأي السجلات ستندمج إذا دمجت الجدولين؟ وأيّها لن يندمج؟ حاول تنفيذ تلك الخطوة في SQL.

![تلميح لتمرين الربط الخارجي (outer join)](https://df.webontwerp.ucll.be/images/database-foundations/sql-outerjoin-4-outerjoin_hint.webp)

الحل:

```sql
SELECT L.last_name, l.first_name
FROM course o RIGHT OUTER JOIN lecturer l ON
  o.coordinator = l.lecturer_id AND o.credits = 6
WHERE o.credits IS NULL
ORDER BY 1, 2;
```

## FULL OUTER JOIN

`OUTER JOIN` هو `INNER JOIN` تُضاف إليه جميع العناصر الناقصة من أحد الجدولين (تلك الملحقة بالجانب `LEFT` أو `RIGHT`). وهناك أيضًا `FULL OUTER JOIN` الذي يعني أساسًا *إضافة العناصر الناقصة من الجدولين معًا الأيمن والأيسر*. وفي مثالنا بجدولين فقط (المحاضرون والمقررات)، لا يمكننا إنشاء `FULL OUTER JOIN` ذي معنى. وسنغطّي `FULL OUTER JOIN` لاحقًا في التمارين. أما الفيديو في بداية هذا الفصل فيشرحه بوضوح.

## نظرة موجزة عن JOIN

فيما يلي نظرة عامة على جميع أنواع `JOIN` المختلفة التي رأيناها. ولكل نوع نسرد كيف تُبنى مجموعة الصفوف التي يُنفَّذ بها بقية الاستعلام.

- `Implicit JOIN A,B`: يُدمج كل صف من جدول A مع كل صف من جدول B. وتُبقى جميع الصفوف المدمجة.
- `A INNER JOIN B`: يُدمج كل صف من جدول A مع كل صف من جدول B. وتُبقى فقط الصفوف المدمجة التي تحقق شرط الدمج.
- `A LEFT OUTER JOIN B`: يُدمج كل صف من جدول A مع كل صف من جدول B. وتُبقى فقط الصفوف المدمجة التي تحقق شرط الدمج. وتُضاف جميع صفوف جدول A التي لا تحقق شرط الدمج، مع حشوها بقيم null لجميع أعمدة جدول B.
- `A RIGHT OUTER JOIN B`: يُدمج كل صف من جدول A مع كل صف من جدول B. وتُبقى فقط الصفوف المدمجة التي تحقق شرط الدمج. وتُضاف جميع صفوف جدول B التي لا تحقق شرط الدمج، مع حشوها بقيم null لجميع أعمدة جدول A.
- `A FULL OUTER JOIN B`: يُدمج كل صف من جدول A مع كل صف من جدول B. وتُبقى فقط الصفوف المدمجة التي تحقق شرط الدمج. وتُضاف جميع صفوف جدول A التي لا تحقق شرط الدمج، مع حشوها بقيم null لجميع أعمدة جدول B. وكذلك تُضاف جميع صفوف جدول B التي لا تحقق شرط الدمج، مع حشوها بقيم null لجميع أعمدة جدول A.
