---
title: "دمج الجداول بواسطة INNER JOIN"
lang: ar
source: https://df.webontwerp.ucll.be/EN/SQL_innerjoin/
---

> لا يمكن لأي ليلة من الشراب أو المخدرات أو الجنس أن تضاهي أمسية طويلة من البرمجة المنتجة. &mdash;Lynn Voedisch

في الفصول السابقة، روجعت جميع مكوّنات استعلام `SELECT`، باستثناء واحد: المكوّن `FROM`. ولم يكن هناك الكثير ليُقال عنه أيضًا، إذ استعلمنا من جدول واحد فقط. وفي هذا القسم، نستخدم عدة جداول في الاستعلام، حتى نتمكن من دمج المعلومات في تلك الجداول.

ويشرح الفيديو مبادئ *الضرب الديكارتي* و*الدمج (join)*. شاهده أولًا، ثم اتبع النص أدناه وأنجز التمارين.

## JOIN الضمني

سنستخدم مثالًا بسيطًا لشرح المبدأ. افترض أنك تريد قائمة بعناوين بريد جميع منسّقي المقررات كما في الشكل أدناه. وبعد [الفصل السابق](/book/database-foundations/sql-eenopveel/index) ينبغي أن يكون لديك جدولان مترابطان في مخططك الخاص: "lecturer" و"course".

![جميع عناوين البريد لكل منسّقي جميع المقررات](https://df.webontwerp.ucll.be/images/database-foundations/sql-innerjoin-0-join_vb1.webp)

والآن اعمل على المثال التالي بتجربة شيفرة جميع الخطوات في مخططك الخاص. ولا تنسَ تحديد اسم مخططك لكل جدول، أو اضبط `search_path` بشكل صحيح. وفي أمثلة الشيفرة أدناه اخترنا الحل الأخير.

### الضرب الديكارتي لعدة جداول

يحتوي جدول المحاضرين على 18 صفًا، ويمكنك التحقق من ذلك بسهولة بـ `COUNT(*)`:

```sql
SELECT COUNT(*)
FROM lecturer;
```

كم صفًا يحتوي جدول "course"؟

#### الحل

يحتوي هذا الجدول على 21 صفًا.

جرّب الآن الشيفرة التالية وحاول أن تستنتج من الناتج ما الذي تفعله:

```sql
SELECT *
FROM lecturer, course;
```

#### الحل

بتحديد جدولين في المكوّن `FROM` (مفصولين بفاصلة) *يرتبط كل صف من جدول "lecturer" بكل صف من الجدول الثاني "course"*. فكل صف من صفوف المحاضرين الثمانية عشر يُدمج مع كل مقرر من المقررات الحادي والعشرين. ويعطي ذلك إجمالًا 18 × 21 = 378 صفًا في الناتج. وستحتاج إلى شريط التمرير الأفقي في حقل الناتج، لأن هذه الصفوف ستكون طويلة إلى حد ما إذ توجد جميع أعمدة الجدولين معًا في الناتج.

وهذا الناتج — مجموعة يظهر فيها كل صف من الجدول الأول مع كل صف من الجدول الثاني — يُسمّى *الضرب الديكارتي (cartesian product)*. وسرد جدولين بعد كلمة `FROM` دمج *ضمني*. وسنطلب لاحقًا استخدام الدمج *الصريح* دائمًا، لكننا سنفعل ذلك بهذه الطريقة الآن.

### تحديد الأعمدة في الضرب الديكارتي

أنت تعرف أن المكوّن `FROM` *يُنفَّذ دائمًا أولًا*. وفي هذه الحالة، يحمّل الضرب الديكارتي للجدولين في ذاكرة العمل. ويأتي `SELECT` لاحقًا. فيحدد أعمدة معينة.

جرّب هذه الشيفرة:

```sql
SELECT code, coordinator, lecturer_id, email
FROM lecturer, course;
```

افترض الآن أنك تريد، إضافة إلى هذه الأعمدة الأربعة، عرض تاريخ بداية المقرر أيضًا، بإضافة بسيطة لهذا العمود في `SELECT`...

```sql
SELECT code, coordinator, lecturer_id, email, start_date
FROM lecturer, course;
```

... كما قد تظن. غير أنك تحصل على رسالة خطأ:

```
ERROR: column reference "start_date" is ambiguous
LINE 3: SELECT code, coordinator, lecturer_id, email, start_date
```

ما الذي يسير خطأ؟ ثم عدّل `SELECT` بحيث ترى start_date أيضًا.

#### الحل

يخبرك خادم قاعدة البيانات أن العمود المطلوب "start_date" غامض. ففي الواقع هناك عمودان "start_date". ويمكنك إزالة هذا الغموض بوضع اسم الجدول قبل اسم العمود، أي شيء على غرار `SELECT table_name.column°name`. *وإذا لم يوجد غموض، فاسم العمود يكفي بالطبع!*

فيمكن أن يكون هذا حلًا ممكنًا:

```sql
SELECT code, coordinator, lecturer_id, email, course.start_date
FROM lecturer, course;
```

### اسم مستعار لأسماء الجداول

ستلاحظ أنك تضطر بانتظام إلى تحديد العمود بكتابة اسم الجدول قبله. وهذا قدر لا بأس به من الكتابة. والخيار الأقصر هو استخدام *اسم مستعار*. فأنت تستبدل مؤقتًا اسم الجدول بشيء أقصر (غالبًا حرف واحد أو بضعة أحرف). قارن النسخ التالية للاستعلام نفسه. أولًا النسخة الطويلة:

```sql
SELECT code, course.name, coordinator, lecturer_id, lecturer.last_name, email
FROM lecturer, course;
```

وهذه النسخة الأقصر، وبالتالي الأسهل قراءة على الأرجح، باسِمين مستعارين:

```sql
SELECT code, O.name, coordinator, lecturer_id, L.last_name, email
FROM lecturer AS L, course AS O;
```

ويمكنك إغفال كلمة `AS` فيصبح الاستعلام أقصر أيضًا:

```sql
SELECT code, O.name, coordinator, lecturer_id, L.last_name, email
FROM lecturer L, course O;
```

جرّب التركيبة التي تعرّف فيها *اسمًا مستعارًا*، لكنك لا تزال تستخدم الاسم الكامل للجدول في `SELECT`، بتجربة الشيفرة التالية:

```sql
SELECT code, course.name, coordinator, lecturer_id, L.last_name, email
FROM lecturer L, course O;
```

#### الحل

ستساعدك رسالة الخطأ أكثر:

```
ERROR:  invalid reference to FROM-clause entry for table "course"
LINE 2: SELECT code, course.name, coordinator, lectu...
                        ^
HINT:  Perhaps you meant to reference the table alias "o".
SQL state: 42P01
Character: 50
```

وبشكل محدد، يعني هذا أنك *بمجرد أن تعرّف اسمًا مستعارًا لاسم جدول، تصبح ملزمًا باستخدام ذلك الاسم المستعار*. فعندئذ يُستبدل اسم الجدول مؤقتًا بالاسم المستعار!

### شرط الدمج

بسبب الدمج الضمني في المكوّن `FROM`، أنشأت *الضرب الديكارتي*: تركيب كل صف من جدول مع كل صف من الجدول الثاني. أي إجمالًا 378 صفًا. ويجب الآن حصر تلك القائمة الطويلة في الصفوف "ذات المعنى". ويتم حذف الصفوف أو الإبقاء عليها بـ `WHERE`. وتُسمّى جملة `WHERE` هذه "شرط الدمج".

فما الصفوف *المعقولة* هنا؟ سيُقرن كل منسّق لكل مقرر بأي محاضر. غير أننا كنا نبحث فقط عن عنوان البريد الإلكتروني للمنسّق. *والصفوف الوحيدة ذات المعنى عندئذ هي التي يتساوى فيها المنسّق في جدول المقررات مع lecturer_id في جدول المحاضرين:*

```sql
SELECT code, email
FROM lecturer, course
WHERE coordinator = lecturer_id; -- join condition
```

ومن بين 378 صفًا في الضرب الديكارتي، لا يحقق هذا الشرط سوى 21 صفًا. وهذا منطقي: فهناك 21 مقررًا ولكل مقرر منسّق واحد بالضبط. ويوضح [الشكل في بداية هذا الفصل](#Implicit-JOIN) النتيجة في pgAdmin.

*يغطّي هذا التمرين أمورًا كثيرة من الفصول السابقة.* اكتب الاستعلام الذي يعيد، لكل مقرر له أقل من 6 نقاط، ما يلي: اسم المقرر، وعدد النقاط، والاسم الأول والاسم الأخير للمنسّق في عمود واحد، والسنة التي ظهر فيها ذلك المقرر أول مرة في البرنامج. ورتّب حسب عدد النقاط المتزايد. وعند تساوي عدد النقاط، واصل الترتيب حسب السنة (الأحدث أولًا). وينبغي أن تحصل على الشكل التالي بجدول من 13 صفًا.

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-innerjoin-1-join_vb2.webp)

#### الحل

```sql
SELECT O.name AS coursename, credits, L.first_name || ' ' || L.last_name AS coordinator,
  EXTRACT(YEAR FROM O.start_date) as starting_year
FROM lecturer L, course O
WHERE coordinator = lecturer_id AND credits < 6
ORDER BY 2 ASC, 4 DESC;
```

## JOIN الصريح

يكشف التمرين السابق *ضعفًا في الدمج الضمني* (جداول متعددة في FROM مفصولة بفاصلة). فشرط الدمج `(coordinator = lecturer_id)` والشرط "العادي" `(credits ثم يبدو حل التمرين السابق هكذا بدمج صريح `JOIN`:

```sql
SELECT O.name AS coursename, credits, L.first_name || ' ' || L.last_name AS coordinator,
  EXTRACT(YEAR FROM O.start_date) as starting_year
FROM lecturer L INNER JOIN course O ON coordinator = lecturer_id  -- more readable!
WHERE credits < 6
ORDER BY 2 ASC, 4 DESC;
```

ويوجد شرط الدمج الآن في `FROM` ونذكر صراحةً كلمة `JOIN`. وهذا التدوين أكثر منطقية ويقل احتمال أن تنسى شرط الدمج أو أن تخطئ في `WHERE`، لأن هذا المكوّن أصبح أبسط.

وليس مهمًا الترتيب الذي تكتب به الجداول. ويمكن إغفال كلمة `INNER`. *ونوصي بكتابتها على أي حال دائمًا*. بل يوجد أيضًا `OUTER JOIN`.

وهناك أيضًا تدوين بديل لشرط الدمج يمكنك استخدامه *إذا كان العمودان في ذلك الشرط يحملان الاسم نفسه تمامًا وإذا كنت تختبر تساويهما*. وهذا ليس الحال في هذا المثال، لكن افترض أن العمود "coordinator" كان اسمه "lecturer_id" أيضًا، فيمكننا حينئذ كتابة الشيفرة أعلاه هكذا:

```sql
SELECT O.name AS coursename, credits, L.first_name || ' ' || L.last_name AS coordinator,
  EXTRACT(YEAR FROM O.start_date) as starting_year
FROM lecturer L INNER JOIN course O ON O.lecturer_id = L.lecturer_id. -- alias necessary!
WHERE credits < 6
ORDER BY 2 ASC, 4 DESC;
```

ويمكن كتابة ذلك بطريقة أقصر قليلًا باستخدام `USING`:

```sql
SELECT O.name AS coursename, credits, L.first_name || ' ' || L.last_name AS coordinator,
  EXTRACT(YEAR FROM O.start_date) as starting_year
FROM lecturer L INNER JOIN course O USING(lecturer_id)
WHERE credits < 6
ORDER BY 2 ASC, 4 DESC;
```

وسنعود إلى ذلك لاحقًا في التمارين. فالتدوين بـ `ON` صالح للاستخدام دائمًا، أما `USING` ففي حالات معينة فقط.

## دمج جدول مع نفسه

في عملية `JOIN` تدمج جدولين (أو أكثر). ويمكنك أيضًا استخدام *الجدول نفسه مرتين*. ويصبح استخدام الأسماء المستعارة إلزاميًا في هذه الحالة. جرّب التمرين التالي مستعينًا بالنصائح.

في مسابقة، يشكّل المحاضرون فريقًا من شخصين. أحدهما قائد الفريق، والآخر مجرد عضو في الفريق. اكتب الاستعلام الذي يولّد قائمة بجميع الفرق الممكنة كما في الشكل المرفق. وتحتوي هذه القائمة على 306 صفوف. وبعض النصائح:

- عضو الفريق الأول في جدول "lecturer"، وكذلك عضو الفريق الثاني. لذا تُجري `INNER JOIN` لجدول "lecturer" مع نفسه.
- سيتعيّن عليك التمييز بين جدول "lecturer" الأول وجدول "lecturer" الثاني. واستخدم اسمين مستعارين مثل "L1" و"L2".
- فما سيكون شرط الدمج؟ لا يمكنك تشكيل فريق مع نفسك...
- لاحظ ترويسات الأعمدة في الشكل.

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-innerjoin-2-join_vb3.webp)

#### الحل

```sql
SELECT L1.first_name || ' ' || L1.last_name AS captain,
  L2.first_name || ' ' || L2.last_name AS "team_member 2"
FROM lecturer L1 INNER JOIN lecturer L2 on L1.lecturer_id != L2.lecturer_id;
```

نوسّع التمرين السابق قليلًا:

لا نزال نريد قائمة بالفرق الممكنة من المحاضرين، لكن بشرط إضافي هو أن يسكن عضوا الفريق في البلدية نفسها. ولن تستطيع الآن إنشاء سوى 6 فرق ممكنة. واعرض البلدية أيضًا.

#### الحل

```sql
SELECT L1.first_name || ' ' || L1.last_name AS "captain",
  L2.first_name || ' ' || L2.last_name AS "team_member 2", L1.municipality
FROM lecturer L1 INNER JOIN lecturer L2 on
  L1.lecturer_id != L2.lecturer_id AND L1.municipality = L2.municipality;
```

## تمارين

أي المقررات الموجودة حاليًا في البرنامج منسّقها يسكن في بلدية يبدأ رمزها البريدي بـ '3'. اكتب استعلام SQL الذي يولّد الشكل أدناه. ولا يلزم الترتيب.

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-innerjoin-3-join_vb5.webp)

#### الحل

```sql
SELECT code, O.name, lecturer_id, first_name, L.last_name, municipality
FROM course O INNER JOIN lecturer L on O.coordinator = L.lecturer_id
WHERE municipality LIKE '3%' AND O.end_date IS NULL;
```

اكتب استعلام SQL الذي يولّد القائمة (انظر الشكل) بجميع المحاضرين الأصغر من Gerben Adriaens. وهذه القائمة مرتبة بحيث يكون أصغر محاضر في الأعلى. ويمكنك أن تفترض وجود Gerben Adriaens واحد فقط. *ولا يجوز لك أولًا الاستعلام عن تاريخ ميلاد Gerben Adriaens*. ولا يُسمح بالاستعلامات الفرعية أيضًا، لأننا لم ندرسها (بعد). ويمكن فعل ذلك باستعلام واحد باستخدام `JOIN`. ولاحظ أيضًا ترويسة العمود (كالعادة).

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-innerjoin-4-join_vb4.webp)

#### الحل

يمكنك دمج جدول "lecturer" مع نفسه. ولاحظ الشرط الخاص في شرط الدمج. وإذا أردت أن ترى ما يحدث بشكل أفضل، فاطلب `SELECT *` حتى تفحص الصف *كاملًا*. ويختبر `WHERE` من هو الأصغر. وأنت أصغر إذا كان تاريخ ميلادك أكبر.

```sql
SELECT L1.first_name, L1.last_name, EXTRACT(YEAR FROM L1.birthdate) AS birthyear
FROM lecturer L1 INNER JOIN lecturer Adr ON Adr.last_name = 'Adriaens' AND Adr.first_name = 'Gerben'
WHERE L1.birthdate > Adr.birthdate
ORDER BY 3 DESC;
```

لا يزال طالب بحاجة إلى 8 نقاط للتخرج. أنشئ قائمة (انظر الشكل أدناه) بجميع التراكيب الممكنة لمقررين من البرنامج القديم (مقررات لم تعد تُدرَّس الآن) يمثلان معًا 8 نقاط. ومن المرجح أن تحصل على قائمة يظهر فيها كل تركيب مرتين (إذا كان A وB معًا 8 نقاط، فـ B وA أيضًا 8 نقاط، وحينئذ يوجد صفان بالمقررين نفسيهما بترتيب مختلف). وهل يمكنك إيجاد حيلة لتجنّب هذه المكررات؟ لا يلزم الترتيب.

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-innerjoin-5-join_vb6.webp)

#### الحل

```sql
SELECT O1.code, O1.name || ' (' || O1.credits ||')' AS course1,
  O2.code, O2.name || ' (' || O2.credits ||')' AS course2
FROM course O1 INNER JOIN course O2 on O1.code != O2.code
WHERE O1.credits + O2.credits = 8 AND
  O1.end_date IS NOT NULL AND
  O2.end_date IS NOT NULL AND
  O1.code < O2.code; -- trick to filter out the duplicates
```

## تمارين SQLzoo

### المخطط 'Euro2012'

تستخدم سلسلة تمارين مثيرة للاهتمام على SQLzoo بيانات من [بطولة أوروبا لكرة القدم 2012](https://en.wikipedia.org/wiki/UEFA_Euro_2012). والنموذج المنطقي على موقع SQLzoo المصاحب لهذا التمرين له تدوين مختلف قليلًا. لذا أعدنا إنشاءه وفق اصطلاحاتنا:

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-innerjoin-6-euro2012.webp)

وكلمة عن هذا النموذج:

- يحتوي المخطط على ثلاثة جداول: "game" (يحتوي معلومات عن كل مباراة، مثل الوقت والمرحلة وبين أي فريقين)، و"eteam" (اسم كل فريق ومدربه)، وأخيرًا جدول "goal" (من سجّل هدفًا وفي أي دقيقة ولأي فريق).
- لاحظ أن المفتاح الأساسي لجدول "goal" هو *مفتاح مركّب* (PK مرتين في الجدول): فبعد كل شيء، قد تكون هناك أهداف متعددة في المباراة الواحدة، وبالتالي لن يكفي matchid وحده لتحديد هدف تحديدًا فريدًا. وتركيب matchid وgtime (الدقيقة التي سُجّل فيها الهدف) فريد (إن افترضت أن الأهداف لا يمكن تسجيلها مرتين في الدقيقة نفسها).
- ولجدول "game" مفتاحان أجنبيان، مرقّمان FK1 وFK2. فبعد كل شيء، تُلعب المباراة بين فريقين، وبالتالي يشير كل حقل ("team1" و"team2") إلى فريق معين يمكنك العثور على مزيد من المعلومات عنه في جدول "eteam").
- علاوة على ذلك، يجب أن تكون قادرًا على قراءة *التعدديات* جيدًا في هذا المخطط المنطقي. فالشكل البيضاوي الأخضر الكبير يخبرك —إذا نظرت من "eteam" إلى "game"— أن كل فريق يلعب مباراة واحدة على الأقل. والشكل البيضاوي البرتقالي الأصغر

وبخصوص تعدديات العلاقة بين جدولي "goal" و"etam": يمكن للفريق أن يسجّل 0 أو أكثر من الأهداف في البطولة (الدائرة الحمراء)، وينتمي هدف معين دائمًا إلى فريق واحد (المعيّن الأزرق).

### تمارين على INNER JOIN

ملاحظة على هذه المجموعة من التمارين: على موقع SQLzoo يستخدمون `JOIN` دون كلمة `INNER` في كل مرة. ونفضّل نحن الاسم الكامل، لذا اكتب `INNER JOIN` دائمًا على الأرجح.

[أكمل سلسلة التمارين 6 على `JOIN`](https://sqlzoo.net/wiki/The_JOIN_operation). ملاحظة صغيرة: التمرين 13 غير قابل للحل بـ `INNER JOIN`، فهو يحتاج `OUTER JOIN`. ويمكنك تخطي هذا التمرين.
