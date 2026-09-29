---
title: "تعديل البيانات"
lang: ar
source: https://pgexercises.com/questions/updates/
---

الاستعلام (query) عن البيانات أمر جيد ومفيد، لكنك سترغب في مرحلة ما على الأرجح في إدخال بيانات إلى قاعدة بياناتك! يتناول هذا القسم إدراج المعلومات وتحديثها وحذفها. وتُعرف العمليات التي تغيّر بياناتك كهذه مجتمعةً باسم لغة معالجة البيانات (Data Manipulation Language) أو DML.

في الأقسام السابقة، كنا نعيد إليك نتائج الاستعلام الذي نفّذته. ولأن التعديلات التي نجريها في هذا القسم لا تُعيد أي نتائج استعلام، فإننا نعرض لك بدلًا من ذلك المحتوى المحدَّث للجدول المفترض أن تعمل عليه. ويمكنك مقارنته بالجدول المعروض في "النتائج المتوقعة" لترى كيف أبليت.

إن واجهت صعوبة في هذه الأسئلة، فأنصح بشدة بكتاب [Learning SQL](http://shop.oreilly.com/product/9780596007270.do) لـ Alan Beaulieu.

## 1. إدراج بعض البيانات في جدول

**السؤال**

يضيف النادي مرفقًا جديدًا — وهو منتجع صحي (spa). نحتاج إلى إضافته إلى جدول facilities. استخدم القيم التالية:

**النتائج المتوقعة**

| facid | name | membercost | guestcost | initialoutlay | monthlymaintenance |
| --- | --- | --- | --- | --- | --- |
| 0 | Tennis Court 1 | 5 | 25 | 10000 | 200 |
| 1 | Tennis Court 2 | 5 | 25 | 8000 | 200 |
| 2 | Badminton Court | 0 | 15.5 | 4000 | 50 |
| 3 | Table Tennis | 0 | 5 | 320 | 10 |
| 4 | Massage Room 1 | 35 | 80 | 4000 | 3000 |
| 5 | Massage Room 2 | 35 | 80 | 4000 | 3000 |
| 6 | Squash Court | 3.5 | 17.5 | 5000 | 80 |
| 7 | Snooker Table | 0 | 5 | 450 | 15 |
| 8 | Pool Table | 0 | 5 | 400 | 15 |
| 9 | Spa | 20 | 30 | 100000 | 800 |

**الإجابة**

```sql
insert into cd.facilities
    (facid, name, membercost, guestcost, initialoutlay, monthlymaintenance)
    values (9, 'Spa', 20, 30, 100000, 800);
```

إن INSERT INTO ... VALUES هي أبسط طريقة لإدراج بيانات في جدول. ولا يوجد الكثير مما يُقال هنا: تُستخدم VALUES لبناء صف من البيانات، يُدرجه بيان INSERT في الجدول. الأمر بهذه البساطة.

ويمكنك أن ترى قسمين بين قوسين. الأول جزء من بيان INSERT، ويحدد الأعمدة التي نقدّم بيانات لها. والثاني جزء من VALUES، ويحدد البيانات الفعلية التي نريد إدراجها في كل عمود.

إذا كنا نُدرج بيانات في كل أعمدة الجدول، كما في هذا المثال، فتحديد أسماء الأعمدة صراحةً اختياري. فما دمت تملأ البيانات لكل أعمدة الجدول، بالترتيب الذي عُرّفت به عند إنشاء الجدول، يمكنك فعل شيء مثل ما يلي:

```sql
insert into cd.facilities values (9, 'Spa', 20, 30, 100000, 800);
```

وبوجه عام، في SQL التي ستُعاد استخدامها، أميل إلى تفضيل الصراحة وتحديد أسماء الأعمدة.

**تلميح:** يمكن استخدام INSERT لإدراج بيانات في جدول.

## 2. إدراج صفوف متعددة من البيانات في جدول

**السؤال**

في التمرين السابق، تعلمت كيف تضيف مرفقًا. والآن ستضيف عدة مرافق بأمر واحد. استخدم القيم التالية:

**النتائج المتوقعة**

| facid | name | membercost | guestcost | initialoutlay | monthlymaintenance |
| --- | --- | --- | --- | --- | --- |
| 0 | Tennis Court 1 | 5 | 25 | 10000 | 200 |
| 1 | Tennis Court 2 | 5 | 25 | 8000 | 200 |
| 2 | Badminton Court | 0 | 15.5 | 4000 | 50 |
| 3 | Table Tennis | 0 | 5 | 320 | 10 |
| 4 | Massage Room 1 | 35 | 80 | 4000 | 3000 |
| 5 | Massage Room 2 | 35 | 80 | 4000 | 3000 |
| 6 | Squash Court | 3.5 | 17.5 | 5000 | 80 |
| 7 | Snooker Table | 0 | 5 | 450 | 15 |
| 8 | Pool Table | 0 | 5 | 400 | 15 |
| 9 | Spa | 20 | 30 | 100000 | 800 |
| 10 | Squash Court 2 | 3.5 | 17.5 | 5000 | 80 |

**الإجابة**

```sql
insert into cd.facilities
    (facid, name, membercost, guestcost, initialoutlay, monthlymaintenance)
    values
        (9, 'Spa', 20, 30, 100000, 800),
        (10, 'Squash Court 2', 3.5, 17.5, 5000, 80);
```

يمكن استخدام VALUES لتوليد أكثر من صف واحد لإدراجه في جدول، كما ترى في هذا المثال. ونأمل أن يكون واضحًا ما يجري هنا: فناتج VALUES جدول، ويُنسخ ذلك الجدول إلى cd.facilities، الجدول المحدد في أمر INSERT.

ومع أنك سترى VALUES في أغلب الأحيان عند إدراج البيانات، فإن Postgres يتيح لك استخدام VALUES في أي موضع قد تستخدم فيه SELECT. وهذا منطقي: فناتج الأمرين جدول، غير أن VALUES أكثر راحة عند التعامل مع بيانات ثابتة.

وبالمثل، يمكن استخدام SELECT في أي موضع ترى فيه VALUES. وهذا يعني أنك تستطيع إدراج نتائج SELECT بـ INSERT. على سبيل المثال:

```sql
insert into cd.facilities
    (facid, name, membercost, guestcost, initialoutlay, monthlymaintenance)
    SELECT 9, 'Spa', 20, 30, 100000, 800
    UNION ALL
        SELECT 10, 'Squash Court 2', 3.5, 17.5, 5000, 80;
```

وسترى في تمارين لاحقة أننا نستخدم INSERT ... SELECT لتوليد بيانات تُدرج بناءً على المعلومات الموجودة أصلًا في قاعدة البيانات.

**تلميح:** يمكن استخدام VALUES لتوليد أكثر من صف واحد.

## 3. إدراج بيانات محسوبة في جدول

**السؤال**

لنحاول إضافة المنتجع الصحي إلى جدول facilities مرة أخرى. لكننا نريد هذه المرة توليد قيمة facid التالية تلقائيًا، بدلًا من تحديدها كثابت. استخدم القيم التالية لكل ما عدا ذلك:

**النتائج المتوقعة**

| facid | name | membercost | guestcost | initialoutlay | monthlymaintenance |
| --- | --- | --- | --- | --- | --- |
| 0 | Tennis Court 1 | 5 | 25 | 10000 | 200 |
| 1 | Tennis Court 2 | 5 | 25 | 8000 | 200 |
| 2 | Badminton Court | 0 | 15.5 | 4000 | 50 |
| 3 | Table Tennis | 0 | 5 | 320 | 10 |
| 4 | Massage Room 1 | 35 | 80 | 4000 | 3000 |
| 5 | Massage Room 2 | 35 | 80 | 4000 | 3000 |
| 6 | Squash Court | 3.5 | 17.5 | 5000 | 80 |
| 7 | Snooker Table | 0 | 5 | 450 | 15 |
| 8 | Pool Table | 0 | 5 | 400 | 15 |
| 9 | Spa | 20 | 30 | 100000 | 800 |

**الإجابة**

```sql
insert into cd.facilities
    (facid, name, membercost, guestcost, initialoutlay, monthlymaintenance)
    select (select max(facid) from cd.facilities)+1, 'Spa', 20, 30, 100000, 800;
```

استخدمنا في التمارين السابقة VALUES لإدراج بيانات ثابتة في جدول facilities. لكن لدينا هنا مطلبًا جديدًا: معرّف مولَّد ديناميكيًا. وهذا تحسين حقيقي في جودة الحياة، إذ لا يلزمنا أن نبذل الجهد يدويًا لمعرفة أكبر معرّف حالي: فأمر SQL يفعل ذلك لنا.

ولأن عبارة VALUES تُستخدم فقط لتقديم بيانات ثابتة، نحتاج إلى استبدالها باستعلام بدلًا من ذلك. وعبارة SELECT بسيطة إلى حد كبير: فهناك استعلام فرعي داخلي يحسب facid التالية بناءً على أكبر معرّف حالي، والباقي مجرد بيانات ثابتة. وناتج البيان صف نُدرجه في جدول facilities.

ومع أن هذا يعمل جيدًا في مثالنا البسيط، فليس هكذا تُنفَّذ عادةً معرّفات تتزايد في العالم الحقيقي. فيوفّر Postgres أنواع SERIAL التي تُملأ تلقائيًا بالمعرّف التالي عند إدراج صف. وإلى جانب توفير الجهد، فإن هذه الأنواع أكثر أمانًا أيضًا: فبخلاف الإجابة المعروضة في هذا التمرين، لا حاجة للقلق من أن تولّد عمليات متزامنة المعرّف نفسه.

**تلميح:** يمكنك حساب البيانات التي تريد إدراجها باستخدام الاستعلامات الفرعية.

## 4. تحديث بعض البيانات الموجودة

**السؤال**

وقعنا في خطأ عند إدخال بيانات ملعب التنس الثاني. فكانت النفقة الأولية 10000 وليس 8000: عليك تعديل البيانات لتصحيح الخطأ.

**النتائج المتوقعة**

| facid | name | membercost | guestcost | initialoutlay | monthlymaintenance |
| --- | --- | --- | --- | --- | --- |
| 0 | Tennis Court 1 | 5 | 25 | 10000 | 200 |
| 1 | Tennis Court 2 | 5 | 25 | 10000 | 200 |
| 2 | Badminton Court | 0 | 15.5 | 4000 | 50 |
| 3 | Table Tennis | 0 | 5 | 320 | 10 |
| 4 | Massage Room 1 | 35 | 80 | 4000 | 3000 |
| 5 | Massage Room 2 | 35 | 80 | 4000 | 3000 |
| 6 | Squash Court | 3.5 | 17.5 | 5000 | 80 |
| 7 | Snooker Table | 0 | 5 | 450 | 15 |
| 8 | Pool Table | 0 | 5 | 400 | 15 |

**الإجابة**

```sql
update cd.facilities
    set initialoutlay = 10000
    where facid = 1;
```

يُستخدم بيان UPDATE لتعديل البيانات الموجودة. وإن كنت على دراية باستعلامات SELECT، فقراءته سهلة إلى حد كبير: فعبارة WHERE تعمل بالطريقة نفسها تمامًا، وتتيح لنا تصفية مجموعة الصفوف التي نريد العمل عليها. ثم تُعدَّل هذه الصفوف وفق ما تحدده عبارة SET: في هذه الحالة، ضبط النفقة الأولية.

وعبارة WHERE مهمة للغاية. فمن السهل الخطأ فيها أو حتى إسقاطها، بنتائج كارثية. تأمل الأمر التالي:

```sql
update cd.facilities
    set initialoutlay = 10000;
```

لا توجد عبارة WHERE لتصفية الصفوف التي تهمنا. ونتيجة ذلك أن التحديث يجري على كل صف في الجدول! وهذا نادرًا ما يكون ما نريده.

**تلميح:** يمكنك تعديل البيانات الموجودة باستخدام بيان UPDATE.

## 5. تحديث صفوف وأعمدة متعددة في الوقت نفسه

**السؤال**

نريد زيادة سعر ملاعب التنس لكل من الأعضاء والضيوف. حدّث التكاليف لتكون 6 للأعضاء و30 للضيوف.

**النتائج المتوقعة**

| facid | name | membercost | guestcost | initialoutlay | monthlymaintenance |
| --- | --- | --- | --- | --- | --- |
| 0 | Tennis Court 1 | 6 | 30 | 10000 | 200 |
| 1 | Tennis Court 2 | 6 | 30 | 8000 | 200 |
| 2 | Badminton Court | 0 | 15.5 | 4000 | 50 |
| 3 | Table Tennis | 0 | 5 | 320 | 10 |
| 4 | Massage Room 1 | 35 | 80 | 4000 | 3000 |
| 5 | Massage Room 2 | 35 | 80 | 4000 | 3000 |
| 6 | Squash Court | 3.5 | 17.5 | 5000 | 80 |
| 7 | Snooker Table | 0 | 5 | 450 | 15 |
| 8 | Pool Table | 0 | 5 | 400 | 15 |

**الإجابة**

```sql
update cd.facilities
    set
        membercost = 6,
        guestcost = 30
    where facid in (0,1);
```

تقبل عبارة SET قائمة قيم مفصولة بفواصل تريد تحديثها.

**تلميح:** يمكن لعبارة SET تحديث أعمدة متعددة.

## 6. تحديث صف بناءً على محتوى صف آخر

**السؤال**

نريد تعديل سعر ملعب التنس الثاني بحيث يكون أعلى بنسبة 10% من الأول. حاول فعل ذلك دون استخدام قيم ثابتة للأسعار، حتى نتمكن من إعادة استخدام البيان إن أردنا.

**النتائج المتوقعة**

| facid | name | membercost | guestcost | initialoutlay | monthlymaintenance |
| --- | --- | --- | --- | --- | --- |
| 0 | Tennis Court 1 | 5 | 25 | 10000 | 200 |
| 1 | Tennis Court 2 | 5.5 | 27.5 | 8000 | 200 |
| 2 | Badminton Court | 0 | 15.5 | 4000 | 50 |
| 3 | Table Tennis | 0 | 5 | 320 | 10 |
| 4 | Massage Room 1 | 35 | 80 | 4000 | 3000 |
| 5 | Massage Room 2 | 35 | 80 | 4000 | 3000 |
| 6 | Squash Court | 3.5 | 17.5 | 5000 | 80 |
| 7 | Snooker Table | 0 | 5 | 450 | 15 |
| 8 | Pool Table | 0 | 5 | 400 | 15 |

**الإجابة**

```sql
update cd.facilities facs
    set
        membercost = (select membercost * 1.1 from cd.facilities where facid = 0),
        guestcost = (select guestcost * 1.1 from cd.facilities where facid = 0)
    where facs.facid = 1;
```

لا يمثّل تحديث الأعمدة بناءً على بيانات محسوبة صعوبة جوهرية كبيرة: فيمكننا فعل ذلك بسهولة إلى حد كبير باستخدام الاستعلامات الفرعية. ويمكنك أن ترى هذه المقاربة في إجابتنا المختارة. ومع تزايد عدد الأعمدة التي نريد تحديثها، قد تبدأ SQL القياسية تصبح مرهقة جدًا: فأنت لا تريد تحديد استعلام فرعي منفصل لكل تحديث من 15 تحديثًا مختلفًا للأعمدة. ويوفّر Postgres امتدادًا غير قياسي لـ SQL يُسمى UPDATE...FROM يعالج ذلك: فهو يتيح لك تقديم عبارة FROM لتوليد قيم تُستخدم في عبارة SET. والمثال أدناه:

```sql
update cd.facilities facs
    set
        membercost = facs2.membercost * 1.1,
        guestcost = facs2.guestcost * 1.1
    from (select * from cd.facilities where facid = 0) facs2
    where facs.facid = 1;
```

**تلميح:** ألقِ نظرة على UPDATE FROM في وثائق PostgreSQL.

## 7. حذف كل الحجوزات

**السؤال**

في إطار تنقية قاعدة بياناتنا، نريد حذف كل الحجوزات من جدول cd.bookings. فكيف نحقق ذلك؟

**الإجابة**

```sql
delete from cd.bookings;
```

يفعل بيان DELETE ما يقوله ببساطة: يحذف صفوفًا من الجدول. ونعرض هنا الأمر في أبسط صوره، دون أي قيود. وفي هذه الحالة، يحذف كل شيء من الجدول. ومن الواضح أنه ينبغي الحذر في عمليات الحذف والتأكد دائمًا من تقييدها — وسنرى كيف نفعل ذلك في التمرين التالي. وبديل عمليات DELETE غير المقيّدة هو ما يلي:

```
truncate cd.bookings;
```

يحذف TRUNCATE أيضًا كل شيء في الجدول، لكنه يفعل ذلك بآلية أساسية أسرع. وهو ليس [آمنًا تمامًا في كل الظروف](https://www.postgresql.org/docs/current/static/mvcc-caveats.html)، لذا استخدمه بحكمة. وعند الشك، استخدم DELETE.

**تلميح:** ألقِ نظرة على بيان DELETE في وثائق PostgreSQL.

## 8. حذف عضو من جدول cd.members

**السؤال**

نريد إزالة العضو 37، الذي لم يحجز قط، من قاعدة بياناتنا. فكيف نحقق ذلك؟

**النتائج المتوقعة**

| memid | surname | firstname | address | zipcode | telephone | recommendedby | joindate |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | GUEST | GUEST | GUEST | 0 | (000) 000-0000 |  | 2012-07-01 00:00:00 |
| 1 | Smith | Darren | 8 Bloomsbury Close, Boston | 4321 | 555-555-5555 |  | 2012-07-02 12:02:05 |
| 2 | Smith | Tracy | 8 Bloomsbury Close, New York | 4321 | 555-555-5555 |  | 2012-07-02 12:08:23 |
| 3 | Rownam | Tim | 23 Highway Way, Boston | 23423 | (844) 693-0723 |  | 2012-07-03 09:32:15 |
| 4 | Joplette | Janice | 20 Crossing Road, New York | 234 | (833) 942-4710 | 1 | 2012-07-03 10:25:05 |
| 5 | Butters | Gerald | 1065 Huntingdon Avenue, Boston | 56754 | (844) 078-4130 | 1 | 2012-07-09 10:44:09 |
| 6 | Tracy | Burton | 3 Tunisia Drive, Boston | 45678 | (822) 354-9973 |  | 2012-07-15 08:52:55 |
| 7 | Dare | Nancy | 6 Hunting Lodge Way, Boston | 10383 | (833) 776-4001 | 4 | 2012-07-25 08:59:12 |
| 8 | Boothe | Tim | 3 Bloomsbury Close, Reading, 00234 | 234 | (811) 433-2547 | 3 | 2012-07-25 16:02:35 |
| 9 | Stibbons | Ponder | 5 Dragons Way, Winchester | 87630 | (833) 160-3900 | 6 | 2012-07-25 17:09:05 |
| 10 | Owen | Charles | 52 Cheshire Grove, Winchester, 28563 | 28563 | (855) 542-5251 | 1 | 2012-08-03 19:42:37 |
| 11 | Jones | David | 976 Gnats Close, Reading | 33862 | (844) 536-8036 | 4 | 2012-08-06 16:32:55 |
| 12 | Baker | Anne | 55 Powdery Street, Boston | 80743 | 844-076-5141 | 9 | 2012-08-10 14:23:22 |
| 13 | Farrell | Jemima | 103 Firth Avenue, North Reading | 57392 | (855) 016-0163 |  | 2012-08-10 14:28:01 |
| 14 | Smith | Jack | 252 Binkington Way, Boston | 69302 | (822) 163-3254 | 1 | 2012-08-10 16:22:05 |
| 15 | Bader | Florence | 264 Ursula Drive, Westford | 84923 | (833) 499-3527 | 9 | 2012-08-10 17:52:03 |
| 16 | Baker | Timothy | 329 James Street, Reading | 58393 | 833-941-0824 | 13 | 2012-08-15 10:34:25 |
| 17 | Pinker | David | 5 Impreza Road, Boston | 65332 | 811 409-6734 | 13 | 2012-08-16 11:32:47 |
| 20 | Genting | Matthew | 4 Nunnington Place, Wingfield, Boston | 52365 | (811) 972-1377 | 5 | 2012-08-19 14:55:55 |
| 21 | Mackenzie | Anna | 64 Perkington Lane, Reading | 64577 | (822) 661-2898 | 1 | 2012-08-26 09:32:05 |
| 22 | Coplin | Joan | 85 Bard Street, Bloomington, Boston | 43533 | (822) 499-2232 | 16 | 2012-08-29 08:32:41 |
| 24 | Sarwin | Ramnaresh | 12 Bullington Lane, Boston | 65464 | (822) 413-1470 | 15 | 2012-09-01 08:44:42 |
| 26 | Jones | Douglas | 976 Gnats Close, Reading | 11986 | 844 536-8036 | 11 | 2012-09-02 18:43:05 |
| 27 | Rumney | Henrietta | 3 Burkington Plaza, Boston | 78533 | (822) 989-8876 | 20 | 2012-09-05 08:42:35 |
| 28 | Farrell | David | 437 Granite Farm Road, Westford | 43532 | (855) 755-9876 |  | 2012-09-15 08:22:05 |
| 29 | Worthington-Smyth | Henry | 55 Jagbi Way, North Reading | 97676 | (855) 894-3758 | 2 | 2012-09-17 12:27:15 |
| 30 | Purview | Millicent | 641 Drudgery Close, Burnington, Boston | 34232 | (855) 941-9786 | 2 | 2012-09-18 19:04:01 |
| 33 | Tupperware | Hyacinth | 33 Cheerful Plaza, Drake Road, Westford | 68666 | (822) 665-5327 |  | 2012-09-18 19:32:05 |
| 35 | Hunt | John | 5 Bullington Lane, Boston | 54333 | (899) 720-6978 | 30 | 2012-09-19 11:32:45 |
| 36 | Crumpet | Erica | Crimson Road, North Reading | 75655 | (811) 732-4816 | 2 | 2012-09-22 08:36:38 |

**الإجابة**

```sql
delete from cd.members where memid = 37;
```

هذا التمرين زيادة صغيرة على التمرين السابق. فبدلًا من حذف كل الحجوزات، نريد هذه المرة أن نكون أكثر تحديدًا، وأن نحذف عضوًا واحدًا لم يحجز قط. وللقيام بذلك، ما علينا سوى إضافة عبارة WHERE إلى أمرنا، نحدد فيها العضو الذي نريد حذفه. ويمكنك أن ترى أوجه الشبه مع بيانَي SELECT وUPDATE هنا. وهناك نقطة طريفة تستحق الانتباه. جرّب هذا الأمر، لكن باستبدال معرّف العضو 0. فقد أجرى هذا العضو حجوزات كثيرة، وستجد أن الحذف يفشل بخطأ يتعلق بانتهاك قيد مفتاح أجنبي (foreign key constraint). وهذا مفهوم مهم في قواعد البيانات العلائقية، فلنستكشفه قليلًا. المفاتيح الأجنبية آلية لتعريف علاقات بين أعمدة جداول مختلفة. وفي حالتنا نستخدمها لنحدد أن عمود memid في جدول bookings مرتبط بعمود memid في جدول members. وتحدد العلاقة (أو "القيد") أنه بالنسبة لحجز معيّن، يجب أن يكون العضو المحدد في الحجز **موجودًا** في جدول members. ومن المفيد أن تُنفّذ قاعدة البيانات هذا الضمان: فهو يعني أن الشيفرة التي تستخدم قاعدة البيانات يمكنها الاعتماد على وجود العضو. ويصعب (بل يستحيل) فرض ذلك في مستويات أعلى: فقد تتداخل عمليات متزامنة وتترك قاعدة بياناتك في حالة معطوبة. ويدعم PostgreSQL أنواعًا مختلفة من القيود التي تتيح لك فرض بنية على بياناتك. ولمزيد من المعلومات عن القيود، راجع وثائق PostgreSQL عن [المفاتيح الأجنبية](https://www.postgresql.org/docs/current/static/ddl-constraints.html)

**تلميح:** ألقِ نظرة على بيان DELETE في وثائق PostgreSQL.

## 9. الحذف بناءً على استعلام فرعي

**السؤال**

في تماريننا السابقة، حذفنا عضوًا معيّنًا لم يحجز قط. فكيف نجعل ذلك أعم، بحيث نحذف كل الأعضاء الذين لم يحجزوا قط؟

**النتائج المتوقعة**

| memid | surname | firstname | address | zipcode | telephone | recommendedby | joindate |
| --- | --- | --- | --- | --- | --- | --- | --- |
| 0 | GUEST | GUEST | GUEST | 0 | (000) 000-0000 |  | 2012-07-01 00:00:00 |
| 1 | Smith | Darren | 8 Bloomsbury Close, Boston | 4321 | 555-555-5555 |  | 2012-07-02 12:02:05 |
| 2 | Smith | Tracy | 8 Bloomsbury Close, New York | 4321 | 555-555-5555 |  | 2012-07-02 12:08:23 |
| 3 | Rownam | Tim | 23 Highway Way, Boston | 23423 | (844) 693-0723 |  | 2012-07-03 09:32:15 |
| 4 | Joplette | Janice | 20 Crossing Road, New York | 234 | (833) 942-4710 | 1 | 2012-07-03 10:25:05 |
| 5 | Butters | Gerald | 1065 Huntingdon Avenue, Boston | 56754 | (844) 078-4130 | 1 | 2012-07-09 10:44:09 |
| 6 | Tracy | Burton | 3 Tunisia Drive, Boston | 45678 | (822) 354-9973 |  | 2012-07-15 08:52:55 |
| 7 | Dare | Nancy | 6 Hunting Lodge Way, Boston | 10383 | (833) 776-4001 | 4 | 2012-07-25 08:59:12 |
| 8 | Boothe | Tim | 3 Bloomsbury Close, Reading, 00234 | 234 | (811) 433-2547 | 3 | 2012-07-25 16:02:35 |
| 9 | Stibbons | Ponder | 5 Dragons Way, Winchester | 87630 | (833) 160-3900 | 6 | 2012-07-25 17:09:05 |
| 10 | Owen | Charles | 52 Cheshire Grove, Winchester, 28563 | 28563 | (855) 542-5251 | 1 | 2012-08-03 19:42:37 |
| 11 | Jones | David | 976 Gnats Close, Reading | 33862 | (844) 536-8036 | 4 | 2012-08-06 16:32:55 |
| 12 | Baker | Anne | 55 Powdery Street, Boston | 80743 | 844-076-5141 | 9 | 2012-08-10 14:23:22 |
| 13 | Farrell | Jemima | 103 Firth Avenue, North Reading | 57392 | (855) 016-0163 |  | 2012-08-10 14:28:01 |
| 14 | Smith | Jack | 252 Binkington Way, Boston | 69302 | (822) 163-3254 | 1 | 2012-08-10 16:22:05 |
| 15 | Bader | Florence | 264 Ursula Drive, Westford | 84923 | (833) 499-3527 | 9 | 2012-08-10 17:52:03 |
| 16 | Baker | Timothy | 329 James Street, Reading | 58393 | 833-941-0824 | 13 | 2012-08-15 10:34:25 |
| 17 | Pinker | David | 5 Impreza Road, Boston | 65332 | 811 409-6734 | 13 | 2012-08-16 11:32:47 |
| 20 | Genting | Matthew | 4 Nunnington Place, Wingfield, Boston | 52365 | (811) 972-1377 | 5 | 2012-08-19 14:55:55 |
| 21 | Mackenzie | Anna | 64 Perkington Lane, Reading | 64577 | (822) 661-2898 | 1 | 2012-08-26 09:32:05 |
| 22 | Coplin | Joan | 85 Bard Street, Bloomington, Boston | 43533 | (822) 499-2232 | 16 | 2012-08-29 08:32:41 |
| 24 | Sarwin | Ramnaresh | 12 Bullington Lane, Boston | 65464 | (822) 413-1470 | 15 | 2012-09-01 08:44:42 |
| 26 | Jones | Douglas | 976 Gnats Close, Reading | 11986 | 844 536-8036 | 11 | 2012-09-02 18:43:05 |
| 27 | Rumney | Henrietta | 3 Burkington Plaza, Boston | 78533 | (822) 989-8876 | 20 | 2012-09-05 08:42:35 |
| 28 | Farrell | David | 437 Granite Farm Road, Westford | 43532 | (855) 755-9876 |  | 2012-09-15 08:22:05 |
| 29 | Worthington-Smyth | Henry | 55 Jagbi Way, North Reading | 97676 | (855) 894-3758 | 2 | 2012-09-17 12:27:15 |
| 30 | Purview | Millicent | 641 Drudgery Close, Burnington, Boston | 34232 | (855) 941-9786 | 2 | 2012-09-18 19:04:01 |
| 33 | Tupperware | Hyacinth | 33 Cheerful Plaza, Drake Road, Westford | 68666 | (822) 665-5327 |  | 2012-09-18 19:32:05 |
| 35 | Hunt | John | 5 Bullington Lane, Boston | 54333 | (899) 720-6978 | 30 | 2012-09-19 11:32:45 |
| 36 | Crumpet | Erica | Crimson Road, North Reading | 75655 | (811) 732-4816 | 2 | 2012-09-22 08:36:38 |

**الإجابة**

```sql
delete from cd.members where memid not in (select memid from cd.bookings);
```

يمكننا استخدام الاستعلامات الفرعية لتحديد ما إذا كان ينبغي حذف صف أم لا. وهناك طريقتان قياسيتان لفعل ذلك. في إجابتنا المميزة، يُنتج الاستعلام الفرعي قائمة بكل معرّفات الأعضاء المختلفة في جدول cd.bookings. وإن لم يكن الصف في الجدول ضمن القائمة التي يولّدها الاستعلام الفرعي، حُذف. وبديل ذلك استخدام *استعلام فرعي مترابط*. فحيث يشغّل مثالنا السابق استعلامًا فرعيًا كبيرًا مرة واحدة، تحدد المقاربة المترابطة بدلًا من ذلك استعلامًا فرعيًا أصغر يُشغَّل مقابل كل صف.

```sql
delete from cd.members mems where not exists (select 1 from cd.bookings where memid = mems.memid);
```

وقد يكون للصيغتين المختلفتين خصائص أداء مختلفة. غير أن محرّك قاعدة بياناتك حرّ في أن يحوّل استعلامك في الخفاء ليُنفّذه بأسلوب مترابط أو غير مترابط، لذا قد يكون التنبؤ بالأمر صعبًا بعض الشيء.

**تلميح:** يمكنك الحذف بناءً على ناتج استعلام فرعي
