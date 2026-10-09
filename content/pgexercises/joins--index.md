---
title: "عمليات الربط والاستعلامات الفرعية"
lang: ar
source: https://pgexercises.com/questions/joins/
---

تتناول هذه الفئة بالدرجة الأولى مفهومًا أساسيًا في نظم قواعد البيانات العلائقية: الربط (joining). فالربط يتيح لك دمج معلومات مترابطة من جداول متعددة للإجابة عن سؤال. وهذا ليس مفيدًا لسهولة الاستعلام (query) فحسب: فغياب قدرة الربط يشجّع على تفكيك تسوية البيانات (denormalisation)، وهو ما يزيد تعقيد الحفاظ على اتساق بياناتك داخليًا. ويغطي هذا الموضوع الربط الداخلي والخارجي والذاتي، مع قضاء بعض الوقت في الاستعلامات الفرعية (subqueries) — أي الاستعلامات داخل الاستعلامات. وإن واجهت صعوبة في هذه الأسئلة، فأنصح بشدة بكتاب [Learning SQL](http://shop.oreilly.com/product/9780596007270.do) لـ Alan Beaulieu، فهو كتاب موجز وجيد الكتابة في الموضوع.

## 1. استرجاع أوقات بدء حجوزات الأعضاء

**السؤال**

كيف يمكنك إنتاج قائمة بأوقات البدء لحجوزات الأعضاء المسمّين 'David Farrell'؟

**النتائج المتوقعة**

| starttime |
| --- |
| 2012-09-18 09:00:00 |
| 2012-09-18 17:30:00 |
| 2012-09-18 13:30:00 |
| 2012-09-18 20:00:00 |
| 2012-09-19 09:30:00 |
| 2012-09-19 15:00:00 |
| 2012-09-19 12:00:00 |
| 2012-09-20 15:30:00 |
| 2012-09-20 11:30:00 |
| 2012-09-20 14:00:00 |
| 2012-09-21 10:30:00 |
| 2012-09-21 14:00:00 |
| 2012-09-22 08:30:00 |
| 2012-09-22 17:00:00 |
| 2012-09-23 08:30:00 |
| 2012-09-23 17:30:00 |
| 2012-09-23 19:00:00 |
| 2012-09-24 08:00:00 |
| 2012-09-24 16:30:00 |
| 2012-09-24 12:30:00 |
| 2012-09-25 15:30:00 |
| 2012-09-25 17:00:00 |
| 2012-09-26 13:00:00 |
| 2012-09-26 17:00:00 |
| 2012-09-27 08:00:00 |
| 2012-09-28 11:30:00 |
| 2012-09-28 09:30:00 |
| 2012-09-28 13:00:00 |
| 2012-09-29 16:00:00 |
| 2012-09-29 10:30:00 |
| 2012-09-29 13:30:00 |
| 2012-09-29 14:30:00 |
| 2012-09-29 17:30:00 |
| 2012-09-30 14:30:00 |

**الإجابة**

```sql
select bks.starttime 
	from 
		cd.bookings bks
		inner join cd.members mems
			on mems.memid = bks.memid
	where 
		mems.firstname='David' 
		and mems.surname='Farrell';
```

أكثر أنواع الربط استخدامًا هو INNER JOIN. وهو يدمج جدولين بناءً على تعبير ربط — في هذه الحالة، لكل معرّف عضو في جدول members، نبحث عن قيم مطابقة في جدول bookings. وحيث نجد تطابقًا، يُعاد صف يجمع قيم الجدولين. ولاحظ أننا أعطينا كل جدول *اسمًا مستعارًا* (bks وmems). ويُستخدم ذلك لسببين: أولًا لأنه ملائم، وثانيًا لأننا قد نربط الجدول نفسه عدة مرات، فيلزمنا التمييز بين الأعمدة الواردة من كل مرة رُبط فيها الجدول.

ولنتجاهل الآن عبارتي select وwhere، ونركّز على ما ينتجه بيان FROM. في كل أمثلتنا السابقة، كان FROM مجرد جدول بسيط. فما هو الآن؟ جدول آخر! وهذه المرة، ينتج كتركيب من bookings وmembers. ويمكنك أن ترى مجموعة فرعية من ناتج الربط أدناه:

![ناتج عبارة FROM لعملية ربط](https://pgexercises.com/images/pgexercises/joins-simplejoin-0-joinbefore.webp)

لكل عضو في جدول members، وجد الربط كل معرّفات الأعضاء المطابقة في جدول bookings. ولكل تطابق، أنتج صفًا يجمع الصف من جدول members والصف من جدول bookings.

من الواضح أن هذه معلومات أكثر ممّا يلزم في حد ذاتها، وأي سؤال مفيد سيريد تصفيتها. وفي استعلامنا، نستخدم بداية عبارة SELECT لاختيار الأعمدة، وعبارة WHERE لاختيار الصفوف، كما هو موضح أدناه:

![](https://pgexercises.com/images/pgexercises/joins-simplejoin-1-join1.webp)

هذا كل ما نحتاج إليه لإيجاد حجوزات David! وبوجه عام، أشجعك على تذكّر أن ناتج عبارة FROM هو في جوهره جدول كبير واحد تُصفّي منه المعلومات بعد ذلك. وقد يبدو هذا غير فعّال — لكن لا تقلق، فقاعدة البيانات (DB) ستتصرف في الخفاء بذكاء أكبر بكثير :-).

وملاحظة أخيرة: هناك صيغتان مختلفتان للربط الداخلي. وقد عرضت عليك الصيغة التي أفضّلها، والتي أجدها أكثر اتساقًا مع أنواع الربط الأخرى. وسترى كثيرًا صيغة مختلفة، معروضة أدناه:

```sql
select bks.starttime
        from
                cd.bookings bks,
                cd.members mems
        where
                mems.firstname='David'
                and mems.surname='Farrell'
                and mems.memid = bks.memid;
```

هذه مكافئة وظيفيًا تمامًا للإجابة المعتمدة. وإن كنت أكثر ارتياحًا لهذه الصيغة، فلا تتردد في استخدامها!

**تلميح:** ألقِ نظرة على الوثائق الخاصة بـ INNER JOIN.

## 2. تحديد أوقات بدء حجوزات ملاعب التنس

**السؤال**

كيف يمكنك إنتاج قائمة بأوقات البدء لحجوزات ملاعب التنس، في التاريخ '2012-09-21'؟ أرجع قائمة بأزواج من وقت البدء واسم المرفق، مرتّبة بحسب الوقت.

**النتائج المتوقعة**

| start | name |
| --- | --- |
| 2012-09-21 08:00:00 | Tennis Court 1 |
| 2012-09-21 08:00:00 | Tennis Court 2 |
| 2012-09-21 09:30:00 | Tennis Court 1 |
| 2012-09-21 10:00:00 | Tennis Court 2 |
| 2012-09-21 11:30:00 | Tennis Court 2 |
| 2012-09-21 12:00:00 | Tennis Court 1 |
| 2012-09-21 13:30:00 | Tennis Court 1 |
| 2012-09-21 14:00:00 | Tennis Court 2 |
| 2012-09-21 15:30:00 | Tennis Court 1 |
| 2012-09-21 16:00:00 | Tennis Court 2 |
| 2012-09-21 17:00:00 | Tennis Court 1 |
| 2012-09-21 18:00:00 | Tennis Court 2 |

**الإجابة**

```sql
select bks.starttime as start, facs.name as name
	from 
		cd.facilities facs
		inner join cd.bookings bks
			on facs.facid = bks.facid
	where 
		facs.name in ('Tennis Court 2','Tennis Court 1') and
		bks.starttime >= '2012-09-21' and
		bks.starttime < '2012-09-22'
order by bks.starttime;
```

هذا استعلام آخر بـ INNER JOIN، وإن كان فيه قدر أكبر بكثير من التعقيد! فجزء FROM من الاستعلام سهل — فنحن ببساطة نربط جدولَي facilities وbookings على facid. وينتج عن ذلك جدول أرفقنا فيه، لكل صف في bookings، معلومات مفصّلة عن المرفق المحجوز.

وننتقل إلى مكوّن WHERE في الاستعلام. والفحوص على starttime واضحة إلى حد كبير بذاتها — فنحن نتأكد من أن كل الحجوزات تبدأ بين التاريخين المحددين. ولأننا لا يهمّنا إلا ملاعب التنس، نستخدم أيضًا مُعامل IN لنخبر نظام قاعدة البيانات بأن يعيد لنا معرّفات المرافق 0 أو 1 فقط — وهما معرّفا الملعبين. وهناك طرق أخرى للتعبير عن ذلك: كان يمكننا استخدام where facs.facid = 0 or facs.facid = 1، أو حتى where facs.name like 'Tennis%'.

والباقي بسيط إلى حد كبير: نستخدم SELECT لاختيار الأعمدة التي تهمنا، وORDER BY لترتيب النتائج بحسب وقت البدء.

**تلميح:** هذا ربط داخلي (INNER JOIN) آخر. وقد تريد أيضًا التفكير في استخدام مُعاملَي IN أو LIKE لتحديد النتائج التي تحصل عليها.

## 3. إنتاج قائمة بكل الأعضاء الذين أوصوا بعضو آخر

**السؤال**

كيف يمكنك إخراج قائمة بكل الأعضاء الذين أوصوا بعضو آخر؟ تأكد من عدم وجود تكرارات في القائمة، ومن أن النتائج مرتّبة بحسب (surname، firstname).

**النتائج المتوقعة**

| firstname | surname |
| --- | --- |
| Florence | Bader |
| Timothy | Baker |
| Gerald | Butters |
| Jemima | Farrell |
| Matthew | Genting |
| David | Jones |
| Janice | Joplette |
| Millicent | Purview |
| Tim | Rownam |
| Darren | Smith |
| Tracy | Smith |
| Ponder | Stibbons |
| Burton | Tracy |

**الإجابة**

```sql
select distinct recs.firstname as firstname, recs.surname as surname
	from 
		cd.members mems
		inner join cd.members recs
			on recs.memid = mems.recommendedby
order by surname, firstname;
```

وهنا مفهوم يجد بعض الناس فيه لبسًا: يمكنك ربط جدول بنفسه! وهذا مفيد حقًا إذا كانت لديك أعمدة تشير إلى بيانات في الجدول نفسه، كما هي الحال مع recommendedby في cd.members.

وإن واجهت صعوبة في تصوّر ذلك، فتذكّر أن هذا يعمل تمامًا كأي ربط داخلي آخر. فيأخذ ربطنا كل صف في members له قيمة recommendedby، ويبحث في members مرة أخرى عن الصف الذي له معرّف عضو مطابق. ثم يولّد صف إخراج يجمع مُدخلَي العضوين. وهذا يشبه المخطط أدناه:

![](https://pgexercises.com/images/pgexercises/joins-self-0-innerjoin.webp)

لاحظ أنه قد يكون لدينا عمودا 'surname' في مجموعة الإخراج، لكن يمكن تمييزهما بالأسماء المستعارة للجدولين. وبعد أن نختار الأعمدة التي نريدها، نستخدم ببساطة DISTINCT لضمان عدم وجود تكرارات.

**تلميح:** هذا ربط داخلي (INNER JOIN)، تمامًا كما في التمارين السابقة.

## 4. إنتاج قائمة بكل الأعضاء مع من أوصى بهم

**السؤال**

كيف يمكنك إخراج قائمة بكل الأعضاء، مع الشخص الذي أوصى بهم (إن وُجد)؟ تأكد من أن النتائج مرتّبة بحسب (surname، firstname).

**النتائج المتوقعة**

| memfname | memsname | recfname | recsname |
| --- | --- | --- | --- |
| Florence | Bader | Ponder | Stibbons |
| Anne | Baker | Ponder | Stibbons |
| Timothy | Baker | Jemima | Farrell |
| Tim | Boothe | Tim | Rownam |
| Gerald | Butters | Darren | Smith |
| Joan | Coplin | Timothy | Baker |
| Erica | Crumpet | Tracy | Smith |
| Nancy | Dare | Janice | Joplette |
| David | Farrell |  |  |
| Jemima | Farrell |  |  |
| GUEST | GUEST |  |  |
| Matthew | Genting | Gerald | Butters |
| John | Hunt | Millicent | Purview |
| David | Jones | Janice | Joplette |
| Douglas | Jones | David | Jones |
| Janice | Joplette | Darren | Smith |
| Anna | Mackenzie | Darren | Smith |
| Charles | Owen | Darren | Smith |
| David | Pinker | Jemima | Farrell |
| Millicent | Purview | Tracy | Smith |
| Tim | Rownam |  |  |
| Henrietta | Rumney | Matthew | Genting |
| Ramnaresh | Sarwin | Florence | Bader |
| Darren | Smith |  |  |
| Darren | Smith |  |  |
| Jack | Smith | Darren | Smith |
| Tracy | Smith |  |  |
| Ponder | Stibbons | Burton | Tracy |
| Burton | Tracy |  |  |
| Hyacinth | Tupperware |  |  |
| Henry | Worthington-Smyth | Tracy | Smith |

**الإجابة**

```sql
select mems.firstname as memfname, mems.surname as memsname, recs.firstname as recfname, recs.surname as recsname
	from 
		cd.members mems
		left outer join cd.members recs
			on recs.memid = mems.recommendedby
order by memsname, memfname;
```

ولنُقدّم مفهومًا جديدًا آخر: LEFT OUTER JOIN. وأفضل تفسير له هو بيان كيف يختلف عن عمليات الربط الداخلي. فالربط الداخلي يأخذ جدولًا أيسر وجدولًا أيمن، ويبحث عن صفوف متطابقة بناءً على شرط ربط (ON). وعندما يتحقق الشرط، يُنتج صف مربوط. ويعمل LEFT OUTER JOIN على نحو مشابه، إلا أنه إذا لم يطابق صف معيّن في الجدول الأيسر أي شيء، فإنه يُنتج صف إخراج رغم ذلك. ويتكوّن صف الإخراج هذا من صف الجدول الأيسر، ومجموعة من قيم NULL مكان صف الجدول الأيمن.

وهذا مفيد في حالات كهذا السؤال، حيث نريد إنتاج مخرجات ببيانات اختيارية. فنريد أسماء كل الأعضاء، واسم من أوصى بكل منهم *إن وُجد ذلك الشخص*. ولا يمكن التعبير عن ذلك على نحو صحيح بربط داخلي.

وكما قد خمّنت، هناك عمليات ربط خارجي أخرى أيضًا. فـ RIGHT OUTER JOIN يشبه كثيرًا LEFT OUTER JOIN، إلا أن الجانب الأيسر من التعبير هو الذي يحتوي البيانات الاختيارية. أما FULL OUTER JOIN، قليل الاستخدام، فيتعامل مع جانبي التعبير كليهما كبيانات اختيارية.

**تلميح:** جرّب البحث في LEFT OUTER JOIN.

## 5. إنتاج قائمة بكل الأعضاء الذين استخدموا ملعب تنس

**السؤال**

كيف يمكنك إنتاج قائمة بكل الأعضاء الذين استخدموا ملعب تنس؟ أدرج في مخرجاتك اسم الملعب، واسم العضو منسّقًا في عمود واحد. تأكد من عدم تكرار البيانات، ورتّب النتائج بحسب اسم العضو ثم اسم المرفق.

**النتائج المتوقعة**

| member | facility |
| --- | --- |
| Anne Baker | Tennis Court 1 |
| Anne Baker | Tennis Court 2 |
| Burton Tracy | Tennis Court 1 |
| Burton Tracy | Tennis Court 2 |
| Charles Owen | Tennis Court 1 |
| Charles Owen | Tennis Court 2 |
| Darren Smith | Tennis Court 2 |
| David Farrell | Tennis Court 1 |
| David Farrell | Tennis Court 2 |
| David Jones | Tennis Court 1 |
| David Jones | Tennis Court 2 |
| David Pinker | Tennis Court 1 |
| Douglas Jones | Tennis Court 1 |
| Erica Crumpet | Tennis Court 1 |
| Florence Bader | Tennis Court 1 |
| Florence Bader | Tennis Court 2 |
| GUEST GUEST | Tennis Court 1 |
| GUEST GUEST | Tennis Court 2 |
| Gerald Butters | Tennis Court 1 |
| Gerald Butters | Tennis Court 2 |
| Henrietta Rumney | Tennis Court 2 |
| Jack Smith | Tennis Court 1 |
| Jack Smith | Tennis Court 2 |
| Janice Joplette | Tennis Court 1 |
| Janice Joplette | Tennis Court 2 |
| Jemima Farrell | Tennis Court 1 |
| Jemima Farrell | Tennis Court 2 |
| Joan Coplin | Tennis Court 1 |
| John Hunt | Tennis Court 1 |
| John Hunt | Tennis Court 2 |
| Matthew Genting | Tennis Court 1 |
| Millicent Purview | Tennis Court 2 |
| Nancy Dare | Tennis Court 1 |
| Nancy Dare | Tennis Court 2 |
| Ponder Stibbons | Tennis Court 1 |
| Ponder Stibbons | Tennis Court 2 |
| Ramnaresh Sarwin | Tennis Court 1 |
| Ramnaresh Sarwin | Tennis Court 2 |
| Tim Boothe | Tennis Court 1 |
| Tim Boothe | Tennis Court 2 |
| Tim Rownam | Tennis Court 1 |
| Tim Rownam | Tennis Court 2 |
| Timothy Baker | Tennis Court 1 |
| Timothy Baker | Tennis Court 2 |
| Tracy Smith | Tennis Court 1 |
| Tracy Smith | Tennis Court 2 |

**الإجابة**

```sql
select distinct mems.firstname || ' ' || mems.surname as member, facs.name as facility
	from 
		cd.members mems
		inner join cd.bookings bks
			on mems.memid = bks.memid
		inner join cd.facilities facs
			on bks.facid = facs.facid
	where
		facs.name in ('Tennis Court 2','Tennis Court 1')
order by member, facility
```

هذا التمرين في معظمه تطبيق أكثر تعقيدًا لما تعلمته في الأسئلة السابقة. وهو أيضًا المرة الأولى التي نستخدم فيها أكثر من عملية ربط واحدة، وقد يكون ذلك مربكًا قليلًا للبعض. وعند قراءة تعبيرات الربط، تذكّر أن الربط فعليًا دالة تأخذ جدولين، يُسمّى أحدهما الجدول الأيسر والآخر الأيمن. ويسهل تصوّر ذلك مع عملية ربط واحدة في الاستعلام، لكنه يصير أكثر إرباكًا قليلًا مع عمليتين.

عملية الربط الداخلي الثانية في هذا الاستعلام جانبها الأيمن هو cd.facilities. وهذا سهل الفهم. أما جانبه الأيسر فهو الجدول الذي يعيده ربط cd.members بـ cd.bookings. ومن المهم التأكيد على هذا: النموذج العلائقي كله يقوم على الجداول. فناتج أي عملية ربط هو جدول آخر. وناتج أي استعلام هو جدول. والقوائم ذات العمود الواحد جداول. ومتى استوعبت ذلك، فقد استوعبت الجمال الجوهري للنموذج.

وملاحظة أخيرة: نُقدّم هنا شيئًا جديدًا واحدًا فعلًا: يُستخدم المُعامل || لدمج النصوص (concatenate).

**تلميح:** تتطلب هذه الإجابة عمليات ربط متعددة. ولدمج النصوص يمكنك استخدام المُعامل ||.

## 6. إنتاج قائمة بالحجوزات المكلفة

**السؤال**

كيف يمكنك إنتاج قائمة بالحجوزات في يوم 2012-09-14 التي ستكلف العضو (أو الضيف) أكثر من 30 دولارًا؟ تذكّر أن تكاليف الضيوف تختلف عن تكاليف الأعضاء (والتكاليف المذكورة لكل "شريحة" مدتها نصف ساعة)، وأن مستخدم الضيوف معرّفه دائمًا 0. أدرج في مخرجاتك اسم المرفق، واسم العضو منسّقًا في عمود واحد، والتكلفة. ورتّب النتائج تنازليًا بحسب التكلفة، ولا تستخدم أي استعلامات فرعية.

**النتائج المتوقعة**

| member | facility | cost |
| --- | --- | --- |
| GUEST GUEST | Massage Room 2 | 320 |
| GUEST GUEST | Massage Room 1 | 160 |
| GUEST GUEST | Massage Room 1 | 160 |
| GUEST GUEST | Massage Room 1 | 160 |
| GUEST GUEST | Tennis Court 2 | 150 |
| Jemima Farrell | Massage Room 1 | 140 |
| GUEST GUEST | Tennis Court 1 | 75 |
| GUEST GUEST | Tennis Court 2 | 75 |
| GUEST GUEST | Tennis Court 1 | 75 |
| Matthew Genting | Massage Room 1 | 70 |
| Florence Bader | Massage Room 2 | 70 |
| GUEST GUEST | Squash Court | 70.0 |
| Jemima Farrell | Massage Room 1 | 70 |
| Ponder Stibbons | Massage Room 1 | 70 |
| Burton Tracy | Massage Room 1 | 70 |
| Jack Smith | Massage Room 1 | 70 |
| GUEST GUEST | Squash Court | 35.0 |
| GUEST GUEST | Squash Court | 35.0 |

**الإجابة**

```sql
select mems.firstname || ' ' || mems.surname as member, 
	facs.name as facility, 
	case 
		when mems.memid = 0 then
			bks.slots*facs.guestcost
		else
			bks.slots*facs.membercost
	end as cost
        from
                cd.members mems                
                inner join cd.bookings bks
                        on mems.memid = bks.memid
                inner join cd.facilities facs
                        on bks.facid = facs.facid
        where
		bks.starttime >= '2012-09-14' and 
		bks.starttime  30) or
			(mems.memid != 0 and bks.slots*facs.membercost > 30)
		)
order by cost desc;
```

هذا تمرين معقّد بعض الشيء! ورغم أن منطقه أكثر تعقيدًا ممّا استخدمناه سابقًا، فلا يوجد الكثير جدًا مما يستحق التعليق. فعبارة WHERE تحصر مخرجاتنا في الصفوف المكلفة بدرجة كافية في 2012-09-14، مع تذكّر التمييز بين الضيوف وغيرهم. ثم نستخدم عبارة CASE في اختيارات الأعمدة لإخراج التكلفة الصحيحة للعضو أو الضيف.

**تلميح:** كما في السابق، تتطلب هذه الإجابة عمليات ربط متعددة. ومنطق WHERE فيها أكثر تعقيدًا مما اعتدت عليه، وسيحتاج إلى عبارة CASE في اختيارات الأعمدة!

## 7. إنتاج قائمة بكل الأعضاء مع من أوصى بهم، دون استخدام أي عمليات ربط

**السؤال**

كيف يمكنك إخراج قائمة بكل الأعضاء، مع الشخص الذي أوصى بهم (إن وُجد)، دون استخدام أي عمليات ربط؟ تأكد من عدم وجود تكرارات في القائمة، ومن أن كل زوج من firstname + surname منسّق في عمود ومرتّب.

**النتائج المتوقعة**

| member | recommender |
| --- | --- |
| Anna Mackenzie | Darren Smith |
| Anne Baker | Ponder Stibbons |
| Burton Tracy |  |
| Charles Owen | Darren Smith |
| Darren Smith |  |
| David Farrell |  |
| David Jones | Janice Joplette |
| David Pinker | Jemima Farrell |
| Douglas Jones | David Jones |
| Erica Crumpet | Tracy Smith |
| Florence Bader | Ponder Stibbons |
| GUEST GUEST |  |
| Gerald Butters | Darren Smith |
| Henrietta Rumney | Matthew Genting |
| Henry Worthington-Smyth | Tracy Smith |
| Hyacinth Tupperware |  |
| Jack Smith | Darren Smith |
| Janice Joplette | Darren Smith |
| Jemima Farrell |  |
| Joan Coplin | Timothy Baker |
| John Hunt | Millicent Purview |
| Matthew Genting | Gerald Butters |
| Millicent Purview | Tracy Smith |
| Nancy Dare | Janice Joplette |
| Ponder Stibbons | Burton Tracy |
| Ramnaresh Sarwin | Florence Bader |
| Tim Boothe | Tim Rownam |
| Tim Rownam |  |
| Timothy Baker | Jemima Farrell |
| Tracy Smith |  |

**الإجابة**

```sql
select distinct mems.firstname || ' ' ||  mems.surname as member,
	(select recs.firstname || ' ' || recs.surname as recommender 
		from cd.members recs 
		where recs.memid = mems.recommendedby
	)
	from 
		cd.members mems
order by member;
```

يمثّل هذا التمرين تقديم الاستعلامات الفرعية. والاستعلام الفرعي، كما يوحي الاسم، استعلام داخل استعلام. ويُستخدم عادةً مع التجميعات للإجابة عن أسئلة مثل 'أحضر لي كل تفاصيل العضو الذي أمضى أكثر عدد من الساعات في Tennis Court 1'.

وفي هذه الحالة، نستخدم الاستعلام الفرعي ببساطة لمحاكاة ربط خارجي. فلكل قيمة من قيم member، يُشغَّل الاستعلام الفرعي مرة واحدة للعثور على اسم الشخص الذي أوصى به (إن وُجد). ويُعرف الاستعلام الفرعي الذي يستخدم معلومات من الاستعلام الخارجي بهذه الطريقة (ومن ثم يلزم تشغيله لكل صف في مجموعة النتائج) بأنه *استعلام فرعي مترابط* (correlated subquery).

**تلميح:** تتطلب الإجابة الصحيحة عن هذا السؤال استخدام استعلام فرعي

## 8. إنتاج قائمة بالحجوزات المكلفة باستخدام استعلام فرعي

**السؤال**

احتوى تمرين [إنتاج قائمة بالحجوزات المكلفة](https://pgexercises.com/questions/joins/threejoin2.html) على منطق غير مرتب: إذ اضطررنا إلى حساب تكلفة الحجز في كل من عبارة WHERE وعبارة CASE. حاول تبسيط هذا الحساب باستخدام الاستعلامات الفرعية. وللعلم، كان السؤال: *كيف يمكنك إنتاج قائمة بالحجوزات في يوم 2012-09-14 التي ستكلف العضو (أو الضيف) أكثر من 30 دولارًا؟ تذكّر أن تكاليف الضيوف تختلف عن تكاليف الأعضاء (والتكاليف المذكورة لكل "شريحة" مدتها نصف ساعة)، وأن مستخدم الضيوف معرّفه دائمًا 0. أدرج في مخرجاتك اسم المرفق، واسم العضو منسّقًا في عمود واحد، والتكلفة. ورتّب النتائج تنازليًا بحسب التكلفة.*

**النتائج المتوقعة**

| member | facility | cost |
| --- | --- | --- |
| GUEST GUEST | Massage Room 2 | 320 |
| GUEST GUEST | Massage Room 1 | 160 |
| GUEST GUEST | Massage Room 1 | 160 |
| GUEST GUEST | Massage Room 1 | 160 |
| GUEST GUEST | Tennis Court 2 | 150 |
| Jemima Farrell | Massage Room 1 | 140 |
| GUEST GUEST | Tennis Court 1 | 75 |
| GUEST GUEST | Tennis Court 2 | 75 |
| GUEST GUEST | Tennis Court 1 | 75 |
| Matthew Genting | Massage Room 1 | 70 |
| Florence Bader | Massage Room 2 | 70 |
| GUEST GUEST | Squash Court | 70.0 |
| Jemima Farrell | Massage Room 1 | 70 |
| Ponder Stibbons | Massage Room 1 | 70 |
| Burton Tracy | Massage Room 1 | 70 |
| Jack Smith | Massage Room 1 | 70 |
| GUEST GUEST | Squash Court | 35.0 |
| GUEST GUEST | Squash Court | 35.0 |

**الإجابة**

```sql
select member, facility, cost from (
	select 
		mems.firstname || ' ' || mems.surname as member,
		facs.name as facility,
		case
			when mems.memid = 0 then
				bks.slots*facs.guestcost
			else
				bks.slots*facs.membercost
		end as cost
		from
			cd.members mems
			inner join cd.bookings bks
				on mems.memid = bks.memid
			inner join cd.facilities facs
				on bks.facid = facs.facid
		where
			bks.starttime >= '2012-09-14' and
			bks.starttime  30
order by cost desc;
```

تقدّم هذه الإجابة تبسيطًا طفيفًا للنسخة السابقة: فقد كان علينا في نسخة دون استعلام فرعي حساب تكلفة العضو أو الضيف في كل من عبارة WHERE وعبارة CASE. وفي نسختنا الجديدة، ننتج استعلامًا مضمّنًا يحسب لنا التكلفة الإجمالية للحجز، ما يتيح للاستعلام الخارجي أن يختار ببساطة الحجوزات التي يبحث عنها. وللعلم، قد ترى أيضًا الاستعلامات الفرعية في عبارة FROM تُسمّى *عروضًا مضمّنة* (inline views).

**تلميح:** ستكون إجابتك مشابهة للتمرين المشار إليه. استخدم استعلامًا فرعيًا في عبارة FROM لتوليد مجموعة نتائج تحسب التكلفة الإجمالية لكل حجز. ثم يمكن للاستعلام الخارجي أن يختار الحجوزات التي تهمه.
