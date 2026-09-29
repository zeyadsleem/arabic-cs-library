---
title: "التجميع"
lang: ar
source: https://pgexercises.com/questions/aggregates/
---

يُعد التجميع (aggregation) من القدرات التي تجعلك تقدّر حقًا قوة نظم قواعد البيانات العلائقية. فهو يتيح لك أن تتجاوز مجرد حفظ بياناتك إلى عالم طرح أسئلة مثيرة للاهتمام فعلًا يمكن استخدامها في اتخاذ القرارات. ويتناول هذا القسم التجميع بإسهاب، مستخدمًا التجميع المعياري (grouping) وكذلك دوال النافذة (window functions) الأحدث.

إن واجهت صعوبة في هذه الأسئلة، فأنصح بشدة بكتاب [Learning SQL](http://shop.oreilly.com/product/9780596007270.do) لـ Alan Beaulieu و[SQL Cookbook](http://shop.oreilly.com/product/9780596009762.do) لـ Anthony Molinaro. بل احصل على الأخير على أي حال — فسيأخذك إلى ما هو أبعد من أي شيء تجده في هذا الموقع، وعلى أنظمة قواعد بيانات مختلفة متعددة أيضًا.

## 1. عدّ عدد المرافق

**السؤال**

في أول جولة لنا في التجميعات، سنكتفي بشيء بسيط. نريد معرفة عدد المرافق الموجودة — أنتج ببساطة عددًا إجماليًا.

**النتائج المتوقعة**

| count |
| --- |
| 9 |

**الإجابة**

```sql
select count(*) from cd.facilities;
```

يبدأ التجميع ببساطة إلى حد كبير! فـ SQL أعلاه يختار كل شيء من جدول facilities، ثم يعُدّ عدد الصفوف في مجموعة النتائج. ولدالة count استخدامات متنوعة: COUNT(*) تُعيد ببساطة عدد الصفوف، وCOUNT(address) تعُدّ عدد العناوين غير الفارغة (non-null) في مجموعة النتائج. وأخيرًا، COUNT(DISTINCT address) تعُدّ عدد العناوين *المختلفة* في جدول facilities.

الفكرة الأساسية للدالة التجميعية (aggregate function) أنها تأخذ عمودًا من البيانات، وتجري عليه عملية ما، وتُخرج قيمة *قياسية* (واحدة). وهناك مجموعة أخرى كثيرة من دوال التجميع، منها MAX وMIN وSUM وAVG. وكلها تفعل إلى حد كبير ما تتوقعه من أسمائها :-).

ومن جوانب الدوال التجميعية التي يجدها الناس غالبًا مربكةً الاستعلامات مثل ما يلي:

```sql
select facid, count(*) from cd.facilities
```

جرّبه، وستجد أنه لا يعمل. والسبب أن count(*) تريد طيّ جدول facilities في قيمة واحدة — لكنها للأسف لا تستطيع ذلك، لأن في cd.facilities كثيرًا من قيم facid المختلفة — ولا يعرف Postgres أي facid ينبغي أن يقترن به العدد.

وبدلًا من ذلك، إن أردت استعلامًا يُعيد كل قيم facid مع عدد في كل صف، يمكنك إخراج التجميع إلى استعلام فرعي كما يلي:

```sql
select facid, 
	(select count(*) from cd.facilities)
	from cd.facilities
```

وعندما يكون لدينا استعلام فرعي يُعيد قيمة قياسية كهذه، يعرف Postgres أن يكرّر القيمة ببساطة لكل صف في cd.facilities.

**تلميح:** جرّب البحث في دالة COUNT في SQL

## 2. عدّ عدد المرافق المكلفة

**السؤال**

أنتج عدد المرافق التي تكون تكلفتها للضيوف 10 أو أكثر.

**النتائج المتوقعة**

| count |
| --- |
| 6 |

**الإجابة**

```sql
select count(*) from cd.facilities where guestcost >= 10;
```

هذا السؤال مجرد تعديل بسيط على السؤال السابق: نحتاج إلى استبعاد المرافق غير المكلفة. ويسهل فعل ذلك بعبارة WHERE. فلم يبقَ تجميعنا يرى سوى المرافق المكلفة.

**تلميح:** ستحتاج إلى إضافة عبارة WHERE إلى إجابة السؤال السابق.

## 3. عدّ عدد التوصيات التي يقدّمها كل عضو

**السؤال**

أنتج عدد التوصيات التي قدّمها كل عضو. ورتّب بحسب معرّف العضو.

**النتائج المتوقعة**

| recommendedby | count |
| --- | --- |
| 1 | 5 |
| 2 | 3 |
| 3 | 1 |
| 4 | 2 |
| 5 | 1 |
| 6 | 1 |
| 9 | 2 |
| 11 | 1 |
| 13 | 2 |
| 15 | 1 |
| 16 | 1 |
| 20 | 1 |
| 30 | 1 |

**الإجابة**

```sql
select recommendedby, count(*) 
	from cd.members
	where recommendedby is not null
	group by recommendedby
order by recommendedby;
```

رأينا سابقًا أن دوال التجميع تُطبَّق على عمود من القيم، وتحوّله إلى قيمة قياسية مجمّعة. وهذا مفيد، لكننا كثيرًا ما نجد أننا لا نريد نتيجة مجمّعة واحدة فقط: فمثلًا، بدلًا من معرفة إجمالي المال الذي جناه النادي هذا الشهر، قد أريد معرفة مقدار المال الذي جناه كل مرفق، أو أي أوقات اليوم كانت الأكثر ربحًا.

لدعم هذا النوع من السلوك، توفّر SQL تركيبة GROUP BY. وهي تجمع البيانات في مجموعات، وتشغّل دالة التجميع بصورة منفصلة لكل مجموعة. وعندما تحدد GROUP BY، تنتج قاعدة البيانات قيمة مجمّعة لكل قيمة مميزة في الأعمدة المقدّمة. وفي هذه الحالة، نقول: 'لكل قيمة مميزة من recommendedby، أعطني عدد مرات ظهور تلك القيمة'.

**تلميح:** جرّب هذه المرة البحث في GROUP BY مع count. ولا تنسَ تصفية الموصين الفارغين!

## 4. عرض إجمالي الشرائح المحجوزة لكل مرفق

**السؤال**

أنتج قائمة بالعدد الإجمالي للشرائح المحجوزة لكل مرفق. ويكفي في الوقت الحالي إنتاج جدول إخراج يتكوّن من معرّف المرفق والشرائح، مرتّبًا بحسب معرّف المرفق.

**النتائج المتوقعة**

| facid | Total Slots |
| --- | --- |
| 0 | 1320 |
| 1 | 1278 |
| 2 | 1209 |
| 3 | 830 |
| 4 | 1404 |
| 5 | 228 |
| 6 | 1104 |
| 7 | 908 |
| 8 | 911 |

**الإجابة**

```sql
select facid, sum(slots) as "Total Slots"
	from cd.bookings
	group by facid
order by facid;
```

إلى جانب تقديمنا الدالة التجميعية SUM، لا يوجد الكثير مما يُقال عن هذا التمرين. فلكل معرّف مرفق مميز، تجمع دالة SUM كل القيم في عمود slots.

**تلميح:** في هذا السؤال ستحتاج إلى الاطلاع على الدالة التجميعية SUM.

## 5. عرض إجمالي الشرائح المحجوزة لكل مرفق في شهر معيّن

**السؤال**

أنتج قائمة بالعدد الإجمالي للشرائح المحجوزة لكل مرفق في شهر سبتمبر 2012. وأنتج جدول إخراج يتكوّن من معرّف المرفق والشرائح، مرتّبًا بحسب عدد الشرائح.

**النتائج المتوقعة**

| facid | Total Slots |
| --- | --- |
| 5 | 122 |
| 3 | 422 |
| 7 | 426 |
| 8 | 471 |
| 6 | 540 |
| 2 | 570 |
| 1 | 588 |
| 0 | 591 |
| 4 | 648 |

**الإجابة**

```sql
select facid, sum(slots) as "Total Slots"
	from cd.bookings
	where
		starttime >= '2012-09-01'
		and starttime < '2012-10-01'
	group by facid
order by sum(slots);
```

هذا تعديل طفيف على مثالنا السابق. وتذكّر أن التجميع يحدث بعد تقييم عبارة WHERE: لذا نستخدم WHERE لتقييد البيانات التي نجمّعها، فلا يرى تجميعنا إلا بيانات شهر واحد.

**تلميح:** يمكنك تقييد البيانات التي تدخل في دوالك التجميعية باستخدام عبارة WHERE.

## 6. عرض إجمالي الشرائح المحجوزة لكل مرفق في كل شهر

**السؤال**

أنتج قائمة بالعدد الإجمالي للشرائح المحجوزة لكل مرفق في كل شهر من سنة 2012. وأنتج جدول إخراج يتكوّن من معرّف المرفق والشرائح، مرتّبًا بحسب المعرّف والشهر.

**النتائج المتوقعة**

| facid | month | Total Slots |
| --- | --- | --- |
| 0 | 7 | 270 |
| 0 | 8 | 459 |
| 0 | 9 | 591 |
| 1 | 7 | 207 |
| 1 | 8 | 483 |
| 1 | 9 | 588 |
| 2 | 7 | 180 |
| 2 | 8 | 459 |
| 2 | 9 | 570 |
| 3 | 7 | 104 |
| 3 | 8 | 304 |
| 3 | 9 | 422 |
| 4 | 7 | 264 |
| 4 | 8 | 492 |
| 4 | 9 | 648 |
| 5 | 7 | 24 |
| 5 | 8 | 82 |
| 5 | 9 | 122 |
| 6 | 7 | 164 |
| 6 | 8 | 400 |
| 6 | 9 | 540 |
| 7 | 7 | 156 |
| 7 | 8 | 326 |
| 7 | 9 | 426 |
| 8 | 7 | 117 |
| 8 | 8 | 322 |
| 8 | 9 | 471 |

**الإجابة**

```sql
select facid, extract(month from starttime) as month, sum(slots) as "Total Slots"
	from cd.bookings
	where extract(year from starttime) = 2012
	group by facid, month
order by facid, month;
```

الجزء الأساسي الجديد في هذا السؤال هو دالة EXTRACT. فهي تتيح لك الحصول على مكونات فردية من طابع زمني، مثل اليوم والشهر والسنة، إلخ. ونجمّع بحسب ناتج هذه الدالة لتوفير قيم لكل شهر. وبديل ذلك، إن احتجنا إلى التمييز بين الشهر نفسه في سنوات مختلفة، استخدام دالة DATE_TRUNC التي تقتطع تاريخًا عند درجة تفصيل معيّنة. ومن الجدير بالذكر أيضًا أن هذه أول مرة نستخدم فيها حقًا القدرة على التجميع بحسب أكثر من عمود واحد.

ومن الأمور التي يجدر مراعاتها في هذه الإجابة أن استخدام دالة EXTRACT في عبارة WHERE قد يسبب مشكلات أداء حادة في الجداول الكبيرة. فإذا كان على عمود الطابع الزمني فهرس عادي، فلن يفهم Postgres أنه يستطيع استخدام الفهرس لتسريع الاستعلام، وسيضطر بدلًا من ذلك إلى مسح الجدول كله. ولديك خياران هنا:

فكّر في إنشاء [فهرس قائم على تعبير](https://www.postgresql.org/docs/current/indexes-expressional.html) على عمود الطابع الزمني. فمع فهارس محددة على نحو مناسب، يستطيع Postgres استخدام الفهارس لتسريع عبارات WHERE التي تحتوي نداءات دوال. أو عدّل الاستعلام ليكون أكثر إسهابًا قليلًا، لكن باستخدام مقارنات أكثر معيارية، على سبيل المثال:

```sql
 select facid, extract(month from starttime) as month, sum(slots) as "Total Slots"
	from cd.bookings
	where
		starttime >= '2012-01-01'
		and starttime < '2013-01-01'
	group by facid, month
order by facid, month;
```

يستطيع Postgres استخدام فهرس مع هذه المقارنات المعيارية دون أي مساعدة إضافية.

**تلميح:** ألقِ نظرة على دالة EXTRACT.

## 7. إيجاد عدد الأعضاء الذين أجروا حجزًا واحدًا على الأقل

**السؤال**

أوجد العدد الإجمالي للأعضاء (بمن فيهم الضيوف) الذين أجروا حجزًا واحدًا على الأقل.

**النتائج المتوقعة**

| count |
| --- |
| 30 |

**الإجابة**

```sql
select count(distinct memid) from cd.bookings
```

قد يكون حدسك الأول استخدام استعلام فرعي هنا. على شيء مثل ما يلي:

```sql
select count(*) from 
	(select distinct memid from cd.bookings) as mems
```

وهذا يعمل على أحسن وجه، لكن يمكننا تبسيطه قليلًا بمساعدة معرفة إضافية صغيرة في صورة COUNT DISTINCT. وهي تفعل ما قد تتوقعه، إذ تعُدّ القيم المميزة في العمود الممرَّر.

**تلميح:** ألقِ نظرة على COUNT DISTINCT

## 8. عرض المرافق التي حُجز فيها أكثر من 1000 شريحة

**السؤال**

أنتج قائمة بالمرافق التي حُجز فيها أكثر من 1000 شريحة. وأنتج جدول إخراج يتكوّن من معرّف المرفق والشرائح، مرتّبًا بحسب معرّف المرفق.

**النتائج المتوقعة**

| facid | Total Slots |
| --- | --- |
| 0 | 1320 |
| 1 | 1278 |
| 2 | 1209 |
| 4 | 1404 |
| 6 | 1104 |

**الإجابة**

```sql
select facid, sum(slots) as "Total Slots"
        from cd.bookings
        group by facid
        having sum(slots) > 1000
        order by facid
```

يتبيّن أن هناك في الواقع كلمة مفتاحية في SQL مصمّمة للمساعدة في تصفية ناتج دوال التجميع. وهذه الكلمة هي HAVING.

يسهل الخلط بين سلوك HAVING وسلوك WHERE. وأفضل طريقة للتفكير في الأمر أنه في سياق استعلام فيه دالة تجميعية، تُستخدم WHERE لتصفية البيانات التي تدخل إلى الدالة التجميعية، بينما تُستخدم HAVING لتصفية البيانات بعد خروجها من الدالة. جرّب أن تجرّب لتستكشف هذا الفرق!

**تلميح:** جرّب البحث في عبارة HAVING.

## 9. إيجاد الإيراد الإجمالي لكل مرفق

**السؤال**

أنتج قائمة بالمرافق مع إيرادها الإجمالي. وينبغي أن يتكوّن جدول الإخراج من اسم المرفق والإيراد، مرتّبًا بحسب الإيراد. وتذكّر أن التكلفة مختلفة للضيوف والأعضاء!

**النتائج المتوقعة**

| name | revenue |
| --- | --- |
| Table Tennis | 180 |
| Snooker Table | 240 |
| Pool Table | 270 |
| Badminton Court | 1906.5 |
| Squash Court | 13468.0 |
| Tennis Court 1 | 13860 |
| Tennis Court 2 | 14310 |
| Massage Room 2 | 15810 |
| Massage Room 1 | 72540 |

**الإجابة**

```sql
select facs.name, sum(slots * case
			when memid = 0 then facs.guestcost
			else facs.membercost
		end) as revenue
	from cd.bookings bks
	inner join cd.facilities facs
		on bks.facid = facs.facid
	group by facs.name
order by revenue;
```

التعقيد الحقيقي الوحيد في هذا الاستعلام أن الضيوف (معرّف العضو 0) لهم تكلفة مختلفة عن الجميع. فنستخدم عبارة case لإنتاج تكلفة كل جلسة، ثم نجمع تلك الجلسات، مجمّعة بحسب المرفق.

**تلميح:** تذكّر عبارة CASE!

## 10. إيجاد المرافق التي يقل إيرادها الإجمالي عن 1000

**السؤال**

أنتج قائمة بالمرافق التي يقل إيرادها الإجمالي عن 1000. وأنتج جدول إخراج يتكوّن من اسم المرفق والإيراد، مرتّبًا بحسب الإيراد. وتذكّر أن التكلفة مختلفة للضيوف والأعضاء!

**النتائج المتوقعة**

| name | revenue |
| --- | --- |
| Table Tennis | 180 |
| Snooker Table | 240 |
| Pool Table | 270 |

**الإجابة**

```sql
select name, revenue from (
	select facs.name, sum(case 
				when memid = 0 then slots * facs.guestcost
				else slots * membercost
			end) as revenue
		from cd.bookings bks
		inner join cd.facilities facs
			on bks.facid = facs.facid
		group by facs.name
	) as agg where revenue < 1000
order by revenue;
```

ربما حاولت استخدام الكلمة المفتاحية HAVING التي قدّمناها في تمرين سابق، فأنتجت شيئًا مثل ما يلي:

```sql
select facs.name, sum(case 
		when memid = 0 then slots * facs.guestcost
		else slots * membercost
	end) as revenue
	from cd.bookings bks
	inner join cd.facilities facs
		on bks.facid = facs.facid
	group by facs.name
	having revenue < 1000
order by revenue;
```

للأسف، هذا لا يعمل! وستحصل على خطأ من قبيل ERROR: column "revenue" does not exist. فـ Postgres، بخلاف بعض نظم إدارة قواعد البيانات العلائقية الأخرى مثل SQL Server وMySQL، لا يدعم وضع أسماء الأعمدة في عبارة HAVING. وهذا يعني أنه لكي يعمل هذا الاستعلام، سيتعيّن عليك إنتاج شيء مثل ما يلي:

```sql
select facs.name, sum(case 
		when memid = 0 then slots * facs.guestcost
		else slots * membercost
	end) as revenue
	from cd.bookings bks
	inner join cd.facilities facs
		on bks.facid = facs.facid
	group by facs.name
	having sum(case 
		when memid = 0 then slots * facs.guestcost
		else slots * membercost
	end) < 1000
order by revenue;
```

تكرار شيفرة حسابية كبيرة كهذه أمر غير مرتب، لذا يكتفي حلّنا المعتمد بلفّ جسم الاستعلام الرئيسي كاستعلام فرعي، والاختيار منه بعبارة WHERE. وبوجه عام، أنصح باستخدام HAVING في الاستعلامات البسيطة، لأنه يزيد الوضوح. وإلا فإن مقاربة الاستعلام الفرعي هذه غالبًا أسهل استخدامًا.

**تلميح:** قد تجد HAVING صعبة الاستخدام هنا. جرّب استعلامًا فرعيًا بدلًا منها. وستحتاج على الأرجح إلى عبارة CASE أيضًا.

## 11. إخراج معرّف المرفق الذي حُجز فيه أكبر عدد من الشرائح

**السؤال**

أخرج معرّف المرفق الذي حُجز فيه أكبر عدد من الشرائح. ولنقاط إضافية، جرّب نسخة دون عبارة LIMIT. وستبدو هذه النسخة غير مرتبة على الأرجح!

**النتائج المتوقعة**

| facid | Total Slots |
| --- | --- |
| 4 | 1404 |

**الإجابة**

```sql
select facid, sum(slots) as "Total Slots"
	from cd.bookings
	group by facid
order by sum(slots) desc
LIMIT 1;
```

لنبدأ بما يمكن اعتباره أبسط طريقة لفعل ذلك: أنتج قائمة بمعرّفات المرافق وإجمالي عدد الشرائح المستخدمة، ورتّبها بحسب إجمالي عدد الشرائح المستخدمة، واختر النتيجة الأولى فقط.

لكن يجدر إدراك أن لهذه الطريقة ضعفًا كبيرًا. ففي حال التعادل، سنحصل مع ذلك على نتيجة واحدة فقط! وللحصول على كل النتائج ذات الصلة، قد نجرّب استخدام الدالة التجميعية MAX، على شيء مثل ما يلي:

```sql
select facid, max(totalslots) from (
	select facid, sum(slots) as totalslots    
		from cd.bookings    
		group by facid
	) as sub group by facid
```

المقصود من هذا الاستعلام الحصول على أكبر قيمة totalslots ومعرّف المرفق (أو المعرّفات) المرتبط بها. لكن هذا للأسف لن يعمل! ففي حال وجود عدة قيم facid لها عدد الشرائح المحجوزة نفسه، سيصبح من الملتبس أي facid ينبغي إقرانه بالقيمة الواحدة (أو *القياسية*) الخارجة من دالة MAX. وهذا يعني أن Postgres سيخبرك بأن facid ينبغي أن يكون في قسم GROUP BY، وهو ما لن ينتج النتائج التي نبحث عنها.

ولنحاول محاولة أولى في استعلام يعمل:

```sql
select facid, sum(slots) as totalslots
	from cd.bookings
	group by facid
	having sum(slots) = (select max(sum2.totalslots) from
		(select sum(slots) as totalslots
		from cd.bookings
		group by facid
		) as sum2);
```

ينتج الاستعلام قائمة بمعرّفات المرافق وعدد الشرائح المستخدمة، ثم يستخدم عبارة HAVING تحسب أكبر قيمة totalslots. ونحن نقول في جوهر الأمر: 'أنتج قائمة بقيم facid وعدد الشرائح المحجوزة لكل منها، واستبعد كل ما ليس عدد شرائحه المحجوزة مساويًا للأقصى.'

لكن رغم فائدة HAVING، فإن استعلامنا قبيح إلى حد كبير. ولتحسينه، لنُقدّم مفهومًا جديدًا آخر: [التعبيرات الجدولية الشائعة](http://www.postgresql.org/docs/current/static/queries-with.html) (Common Table Expressions، أو CTEs). ويمكن اعتبار تعبيرات CTE تتيح لك تعريف عرض لقاعدة البيانات ضمن استعلامك. وهي مفيدة حقًا في حالات كهذه، حيث تضطر إلى تكرار نفسك كثيرًا.

وتُعرّف تعبيرات CTE بالصورة WITH CTEName as (SQL-Expression). ويمكنك أن ترى استعلامنا معادًا تعريفه باستخدام تعبير CTE أدناه:

```sql
with sum as (select facid, sum(slots) as totalslots
	from cd.bookings
	group by facid
)
select facid, totalslots 
	from sum
	where totalslots = (select max(totalslots) from sum);
```

ويمكنك أن ترى أننا أخرجنا اختياراتنا المتكررة من cd.bookings إلى تعبير CTE واحد، وجعلنا الاستعلام أسهل قراءةً كثيرًا في أثناء ذلك!

لكن انتظر. هناك المزيد. فمن الممكن أيضًا حلّ هذه المسألة باستخدام دوال النافذة. وسنؤجلها إلى وقت لاحق، لكن هناك حلول أفضل لمسائل كهذه.

هذه معلومات كثيرة لتمرين واحد. فلا تقلق كثيرًا إن لم تفهمها كلها الآن — سنعيد استخدام هذه المفاهيم في تمارين لاحقة.

**تلميح:** ضع في اعتبارك استخدام الكلمة المفتاحية LIMIT مع ORDER BY. وفي النسخة الخالية من LIMIT، ستحتاج على الأرجح إلى البحث في الكلمة المفتاحية HAVING. واعلم أن النسخة الأخيرة صعبة!

## 12. عرض إجمالي الشرائح المحجوزة لكل مرفق في كل شهر — الجزء 2

**السؤال**

أنتج قائمة بالعدد الإجمالي للشرائح المحجوزة لكل مرفق في كل شهر من سنة 2012. وفي هذه النسخة، أدرج صفوف إخراج تحتوي إجماليات لكل الأشهر لكل مرفق، وإجماليًا لكل الأشهر لكل المرافق. وينبغي أن يتكوّن جدول الإخراج من معرّف المرفق والشهر والشرائح، مرتّبًا بحسب المعرّف والشهر. وعند حساب القيم المجمّعة لكل الأشهر وكل قيم facid، أرجع قيم null في عمودَي month وfacid.

**النتائج المتوقعة**

| facid | month | slots |
| --- | --- | --- |
| 0 | 7 | 270 |
| 0 | 8 | 459 |
| 0 | 9 | 591 |
| 0 |  | 1320 |
| 1 | 7 | 207 |
| 1 | 8 | 483 |
| 1 | 9 | 588 |
| 1 |  | 1278 |
| 2 | 7 | 180 |
| 2 | 8 | 459 |
| 2 | 9 | 570 |
| 2 |  | 1209 |
| 3 | 7 | 104 |
| 3 | 8 | 304 |
| 3 | 9 | 422 |
| 3 |  | 830 |
| 4 | 7 | 264 |
| 4 | 8 | 492 |
| 4 | 9 | 648 |
| 4 |  | 1404 |
| 5 | 7 | 24 |
| 5 | 8 | 82 |
| 5 | 9 | 122 |
| 5 |  | 228 |
| 6 | 7 | 164 |
| 6 | 8 | 400 |
| 6 | 9 | 540 |
| 6 |  | 1104 |
| 7 | 7 | 156 |
| 7 | 8 | 326 |
| 7 | 9 | 426 |
| 7 |  | 908 |
| 8 | 7 | 117 |
| 8 | 8 | 322 |
| 8 | 9 | 471 |
| 8 |  | 910 |
|  |  | 9191 |

**الإجابة**

```sql
select facid, extract(month from starttime) as month, sum(slots) as slots
	from cd.bookings
	where
		starttime >= '2012-01-01'
		and starttime < '2013-01-01'
	group by rollup(facid, month)
order by facid, month;
```

عندما نجري تحليل بيانات، نريد أحيانًا تنفيذ مستويات متعددة من التجميع لنتمكن من 'التقريب والتبعيد' إلى أعماق مختلفة. وفي هذه الحالة، قد ننظر إلى الاستخدام الإجمالي لكل مرفق، ثم نريد الغوص لرؤية أدائه على أساس شهري. وباستخدام SQL التي نعرفها حتى الآن، يصبح إنتاج استعلام واحد يفعل ما نريد مرهقًا إلى حد كبير — إذ نضطر فعليًا إلى دمج عدة استعلامات باستخدام UNION ALL:

```sql
select facid, extract(month from starttime) as month, sum(slots) as slots
    from cd.bookings
    where
        starttime >= '2012-01-01'
        and starttime = '2012-01-01'
        and starttime = '2012-01-01'
        and starttime < '2013-01-01'
order by facid, month;
```

وكما ترى، ينفّذ كل استعلام فرعي مستوى مختلفًا من التجميع، ونحن نجمع النتائج فقط. ويمكننا تنظيف ذلك كثيرًا بإخراج القواسم المشتركة إلى تعبير CTE:

```sql
with bookings as (
	select facid, extract(month from starttime) as month, slots
	from cd.bookings
	where
		starttime >= '2012-01-01'
		and starttime < '2013-01-01'
)
select facid, month, sum(slots) from bookings group by facid, month
union all
select facid, null, sum(slots) from bookings group by facid
union all
select null, null, sum(slots) from bookings
order by facid, month;
```

هذه النسخة ليست مؤذية للنظر أكثر من اللازم، لكنها تصبح مرهقة مع تزايد عدد أعمدة التجميع. ولحسن الحظ، أدخل PostgreSQL 9.5 دعمًا لمُعامل ROLLUP، وقد استخدمناه لتبسيط إجابتنا المعتمدة.

ينتج ROLLUP تسلسلًا هرميًا من التجميعات بالترتيب الممرَّر إليه: فمثلًا، يُخرج ROLLUP(facid, month) تجميعات على (facid, month) و(facid) و(). ولو أردنا تجميعًا لكل المرافق لشهر معيّن (بدلًا من كل الأشهر لمرفق معيّن)، لوجب علينا عكس الترتيب باستخدام ROLLUP(month, facid). وبديلًا، إن أردنا كل التبديلات الممكنة للأعمدة التي نمرّرها، يمكننا استخدام CUBE بدلًا من ROLLUP. وسينتج ذلك (facid, month) و(month) و(facid) و().

وROLLUP وCUBE حالتان خاصتان من GROUPING SETS. وتتيح لك GROUPING SETS تحديد تبديلات التجميع التي تريدها بالضبط: فيمكنك، مثلًا، طلب (facid, month) و(facid) فقط، مع تخطّي التجميع في المستوى الأعلى.

**تلميح:** ابحث عن مُعامل ROLLUP في Postgres.

## 13. عرض إجمالي الساعات المحجوزة لكل مرفق مسمّى

**السؤال**

أنتج قائمة بالعدد الإجمالي للساعات المحجوزة لكل مرفق، مع تذكّر أن الشريحة الواحدة مدتها نصف ساعة. وينبغي أن يتكوّن جدول الإخراج من معرّف المرفق واسمه والساعات المحجوزة، مرتّبًا بحسب معرّف المرفق. وحاول تنسيق الساعات إلى منزلتين عشريتين.

**النتائج المتوقعة**

| facid | name | Total Hours |
| --- | --- | --- |
| 0 | Tennis Court 1 | 660.00 |
| 1 | Tennis Court 2 | 639.00 |
| 2 | Badminton Court | 604.50 |
| 3 | Table Tennis | 415.00 |
| 4 | Massage Room 1 | 702.00 |
| 5 | Massage Room 2 | 114.00 |
| 6 | Squash Court | 552.00 |
| 7 | Snooker Table | 454.00 |
| 8 | Pool Table | 455.50 |

**الإجابة**

```sql
select facs.facid, facs.name,
	trim(to_char(sum(bks.slots)/2.0, '9999999999999999D99')) as "Total Hours"

	from cd.bookings bks
	inner join cd.facilities facs
		on facs.facid = bks.facid
	group by facs.facid, facs.name
order by facs.facid;
```

هناك بضعة أمور صغيرة مثيرة للاهتمام في هذا السؤال. أولًا، ترى أن تجميعنا يعمل على أحسن وجه حين نربط جدولًا آخر بعلاقة 1:1. ولاحظ أيضًا أننا نجمّع بحسب facs.facid وfacs.name معًا. وقد يبدو هذا غريبًا: فبعد كل شيء، بما أن facid هو المفتاح الأساسي لجدول facilities، فلكل facid اسم واحد بالضبط، والتجميع بحسب الحقلين كليهما مماثل للتجميع بحسب facid وحده. بل إنك ستجد أن الاستعلام يعمل على أحسن وجه إن أزلت facs.name من عبارة GROUP BY: إذ يستنتج Postgres وجود هذه العلاقة 1:1، ولا يصرّ على أن نجمّع بحسب العمودين كليهما.

لكن للأسف، بحسب نظام قواعد البيانات الذي نستخدمه، قد لا يكون التحقق بهذا الذكاء، وقد لا يدرك أن العلاقة 1:1 قطعًا. وفي هذه الحالة، لو كانت هناك أسماء متعددة لكل facid ولم نكن جمّعنا بحسب الاسم، لاضطر نظام إدارة قواعد البيانات إلى الاختيار بين عدة خيارات (متساوية الصحة) للاسم. ولأن هذا غير صالح، سيصرّ نظام قاعدة البيانات على أن نجمّع بحسب الحقلين كليهما. وبوجه عام، أنصح بالتجميع بحسب كل الأعمدة التي ليست داخل دالة تجميعية: فهذا يضمن توافقية أفضل بين المنصات.

ثم تأتي القسمة. وقد يعرف من بينكم من هم على دراية بـ MySQL أن القسمات الصحيحة تُحوَّل تلقائيًا إلى أعداد عشرية. أما Postgres فأكثر تقليدية قليلًا في هذا الشأن، ويتوقع منك أن تخبره إن أردت قسمة عشرية. ويمكنك فعل ذلك بسهولة هنا بالقسمة على 2.0 بدلًا من 2.

وأخيرًا، لننظر إلى التنسيق. تحوّل دالة TO_CHAR القيم إلى سلاسل محارف. وهي تأخذ نص تنسيق نحدده كـ(عدد كبير من الأرقام) قبل العلامة العشرية، فالعلامة العشرية، فرقمين بعدها. وقد يُضاف فراغ في مقدمة ناتج هذه الدالة، ولهذا نضمّ دالة TRIM الخارجية.

**تلميح:** تذكّر أنه في Postgres تؤدي قسمة عددين صحيحين إلى قسمة صحيحة. وأنت تريد هنا قسمة عشرية. ولتنسيق الساعات، ألقِ نظرة على دالة to_char، مع تذكّر إزالة أي مسافات بيضاء متبقية

## 14. عرض أول حجز لكل عضو بعد 1 سبتمبر 2012

**السؤال**

أنتج قائمة باسم كل عضو ومعرّفه وأول حجز له بعد 1 سبتمبر 2012. ورتّب بحسب معرّف العضو.

**النتائج المتوقعة**

| surname | firstname | memid | starttime |
| --- | --- | --- | --- |
| GUEST | GUEST | 0 | 2012-09-01 08:00:00 |
| Smith | Darren | 1 | 2012-09-01 09:00:00 |
| Smith | Tracy | 2 | 2012-09-01 11:30:00 |
| Rownam | Tim | 3 | 2012-09-01 16:00:00 |
| Joplette | Janice | 4 | 2012-09-01 15:00:00 |
| Butters | Gerald | 5 | 2012-09-02 12:30:00 |
| Tracy | Burton | 6 | 2012-09-01 15:00:00 |
| Dare | Nancy | 7 | 2012-09-01 12:30:00 |
| Boothe | Tim | 8 | 2012-09-01 08:30:00 |
| Stibbons | Ponder | 9 | 2012-09-01 11:00:00 |
| Owen | Charles | 10 | 2012-09-01 11:00:00 |
| Jones | David | 11 | 2012-09-01 09:30:00 |
| Baker | Anne | 12 | 2012-09-01 14:30:00 |
| Farrell | Jemima | 13 | 2012-09-01 09:30:00 |
| Smith | Jack | 14 | 2012-09-01 11:00:00 |
| Bader | Florence | 15 | 2012-09-01 10:30:00 |
| Baker | Timothy | 16 | 2012-09-01 15:00:00 |
| Pinker | David | 17 | 2012-09-01 08:30:00 |
| Genting | Matthew | 20 | 2012-09-01 18:00:00 |
| Mackenzie | Anna | 21 | 2012-09-01 08:30:00 |
| Coplin | Joan | 22 | 2012-09-02 11:30:00 |
| Sarwin | Ramnaresh | 24 | 2012-09-04 11:00:00 |
| Jones | Douglas | 26 | 2012-09-08 13:00:00 |
| Rumney | Henrietta | 27 | 2012-09-16 13:30:00 |
| Farrell | David | 28 | 2012-09-18 09:00:00 |
| Worthington-Smyth | Henry | 29 | 2012-09-19 09:30:00 |
| Purview | Millicent | 30 | 2012-09-19 11:30:00 |
| Tupperware | Hyacinth | 33 | 2012-09-20 08:00:00 |
| Hunt | John | 35 | 2012-09-23 14:00:00 |
| Crumpet | Erica | 36 | 2012-09-27 11:30:00 |

**الإجابة**

```sql
select mems.surname, mems.firstname, mems.memid, min(bks.starttime) as starttime
	from cd.bookings bks
	inner join cd.members mems on
		mems.memid = bks.memid
	where starttime >= '2012-09-01'
	group by mems.surname, mems.firstname, mems.memid
order by mems.memid;
```

توضح هذه الإجابة استخدام دوال التجميع على التواريخ. وتعمل MIN تمامًا كما تتوقع، إذ تستخرج أقل تاريخ ممكن في مجموعة النتائج. ولكي يعمل ذلك، نحتاج إلى ضمان ألا تحتوي مجموعة النتائج إلا تواريخ من سبتمبر فصاعدًا. ونفعل ذلك بعبارة WHERE.

وقد تستخدم استعلامًا كهذا عادةً لإيجاد الحجز التالي لأحد العملاء. ويمكنك استخدامه باستبدال التاريخ '2012-09-01' بالدالة now()

**تلميح:** ألقِ نظرة على الدالة التجميعية MIN

## 15. إنتاج قائمة بأسماء الأعضاء، بحيث يحتوي كل صف على العدد الإجمالي للأعضاء

**السؤال**

أنتج قائمة بأسماء الأعضاء، بحيث يحتوي كل صف على العدد الإجمالي للأعضاء. ورتّب بحسب تاريخ الانضمام، وأدرج الأعضاء الضيوف.

**النتائج المتوقعة**

| count | firstname | surname |
| --- | --- | --- |
| 31 | GUEST | GUEST |
| 31 | Darren | Smith |
| 31 | Tracy | Smith |
| 31 | Tim | Rownam |
| 31 | Janice | Joplette |
| 31 | Gerald | Butters |
| 31 | Burton | Tracy |
| 31 | Nancy | Dare |
| 31 | Tim | Boothe |
| 31 | Ponder | Stibbons |
| 31 | Charles | Owen |
| 31 | David | Jones |
| 31 | Anne | Baker |
| 31 | Jemima | Farrell |
| 31 | Jack | Smith |
| 31 | Florence | Bader |
| 31 | Timothy | Baker |
| 31 | David | Pinker |
| 31 | Matthew | Genting |
| 31 | Anna | Mackenzie |
| 31 | Joan | Coplin |
| 31 | Ramnaresh | Sarwin |
| 31 | Douglas | Jones |
| 31 | Henrietta | Rumney |
| 31 | David | Farrell |
| 31 | Henry | Worthington-Smyth |
| 31 | Millicent | Purview |
| 31 | Hyacinth | Tupperware |
| 31 | John | Hunt |
| 31 | Erica | Crumpet |
| 31 | Darren | Smith |

**الإجابة**

```sql
select count(*) over(), firstname, surname
	from cd.members
order by joindate
```

باستخدام المعرفة التي بنيناها حتى الآن، تكون الإجابة الأكثر بداهة كما يلي. ونستخدم استعلامًا فرعيًا لأن SQL ستطلب منا خلاف ذلك التجميع بحسب firstname وsurname، ما ينتج نتيجة مختلفة عمّا نبحث عنه.

```sql
select (select count(*) from cd.members) as count, firstname, surname
	from cd.members
order by joindate
```

لا شيء على الإطلاق خطأ في هذه الإجابة، لكننا اخترنا مقاربة مختلفة لتقديم مفهوم جديد يُسمى دوال النافذة. وتوفّر دوال النافذة قدرات هائلة القوة، بصورة غالبًا ما تكون أكثر ملاءمة من دوال التجميع المعيارية. ورغم أن هذا التمرين مجرد تمرين بسيط، فسنعمل على أمثلة أكثر تعقيدًا في المستقبل القريب.

تعمل دوال النافذة على مجموعة نتائج استعلامك (أو استعلامك الفرعي)، بعد عبارة WHERE وكل التجميع المعياري. وهي تعمل على *نافذة* من البيانات. وهذه النافذة افتراضيًا غير مقيّدة: أي مجموعة النتائج كلها، لكن يمكن تقييدها لتقديم نتائج أكثر فائدة. فمثلًا، لنفترض أننا نريد، بدلًا من عدد كل الأعضاء، عدد كل الأعضاء الذين انضموا في الشهر نفسه الذي انضم فيه ذلك العضو:

```sql
select count(*) over(partition by date_trunc('month',joindate)),
	firstname, surname
	from cd.members
order by joindate
```

في هذا المثال، نقسّم البيانات بحسب الشهر. ولكل صف تعمل عليه دالة النافذة، تكون النافذة كل الصفوف التي لها joindate في الشهر نفسه. وهكذا تنتج دالة النافذة عدد الأعضاء الذين انضموا في ذلك الشهر.

ويمكنك أن تذهب أبعد من ذلك. تخيّل أنك تريد، بدلًا من العدد الإجمالي للأعضاء الذين انضموا ذلك الشهر، معرفة ترتيب العضو بين المنضمين في ذلك الشهر. ويمكنك فعل ذلك بإضافة ORDER BY إلى دالة النافذة:

```sql
select count(*) over(partition by date_trunc('month',joindate) order by joindate),
	firstname, surname
	from cd.members
order by joindate
```

وتغيّر ORDER BY النافذة مرة أخرى. فبدلًا من أن تكون نافذة كل صف هي القسم كله، تمتد النافذة من بداية القسم إلى الصف الحالي، دون تجاوزه. وهكذا، بالنسبة لأول عضو ينضم في شهر معيّن، يكون العدد 1. وللثاني يكون 2، وهكذا.

وأمر أخير يجدر ذكره عن دوال النافذة: يمكن أن يكون لديك عدة دوال نافذة غير مترابطة في الاستعلام نفسه. وجرّب الاستعلام أدناه كمثال — سترى الأرقام الخاصة بالأعضاء تسير في اتجاهين متعاكسين! وهذه المرونة قد تؤدي إلى استعلامات أكثر إيجازًا ووضوحًا وسهولة في الصيانة.

```sql
select count(*) over(partition by date_trunc('month',joindate) order by joindate asc), 
	count(*) over(partition by date_trunc('month',joindate) order by joindate desc), 
	firstname, surname
	from cd.members
order by joindate
```

دوال النافذة قوية بشكل استثنائي، وستغيّر طريقة كتابتك لـ SQL وتفكيرك فيها. أحسن استخدامها!

**تلميح:** اقرأ عن دالة النافذة COUNT.

## 16. إنتاج قائمة مرقّمة بالأعضاء

**السؤال**

أنتج قائمة مرقّمة متزايدة باطراد بالأعضاء (بمن فيهم الضيوف)، مرتّبة بحسب تاريخ انضمامهم. وتذكّر أن معرّفات الأعضاء لا يُضمن تسلسلها.

**النتائج المتوقعة**

| row_number | firstname | surname |
| --- | --- | --- |
| 1 | GUEST | GUEST |
| 2 | Darren | Smith |
| 3 | Tracy | Smith |
| 4 | Tim | Rownam |
| 5 | Janice | Joplette |
| 6 | Gerald | Butters |
| 7 | Burton | Tracy |
| 8 | Nancy | Dare |
| 9 | Tim | Boothe |
| 10 | Ponder | Stibbons |
| 11 | Charles | Owen |
| 12 | David | Jones |
| 13 | Anne | Baker |
| 14 | Jemima | Farrell |
| 15 | Jack | Smith |
| 16 | Florence | Bader |
| 17 | Timothy | Baker |
| 18 | David | Pinker |
| 19 | Matthew | Genting |
| 20 | Anna | Mackenzie |
| 21 | Joan | Coplin |
| 22 | Ramnaresh | Sarwin |
| 23 | Douglas | Jones |
| 24 | Henrietta | Rumney |
| 25 | David | Farrell |
| 26 | Henry | Worthington-Smyth |
| 27 | Millicent | Purview |
| 28 | Hyacinth | Tupperware |
| 29 | John | Hunt |
| 30 | Erica | Crumpet |
| 31 | Darren | Smith |

**الإجابة**

```sql
select row_number() over(order by joindate), firstname, surname
	from cd.members
order by joindate
```

هذا التمرين تدريب بسيط على دوال النافذة! ويمكنك بسهولة مماثلة استخدام count(*) over(order by joindate) هنا، فلا تقلق إن استخدمت ذلك بدلًا منه.

في هذا الاستعلام لا نعرّف قسمًا، ما يعني أن القسم هو مجموعة البيانات كلها. ولأننا نعرّف ترتيبًا لدالة النافذة، فإن النافذة لأي صف معطى هي: من بداية مجموعة البيانات -> الصف الحالي.

**تلميح:** اقرأ عن دالة النافذة ROW_NUMBER.

## 17. إخراج معرّف المرفق الذي حُجز فيه أكبر عدد من الشرائح، مرة أخرى

**السؤال**

أخرج معرّف المرفق الذي حُجز فيه أكبر عدد من الشرائح. وتأكد في حال التعادل من إخراج كل النتائج المتعادلة.

**النتائج المتوقعة**

| facid | total |
| --- | --- |
| 4 | 1404 |

**الإجابة**

```sql
select facid, total from (
	select facid, sum(slots) total, rank() over (order by sum(slots) desc) rank
        	from cd.bookings
		group by facid
	) as ranked
	where rank = 1
```

قد تتذكر أن هذه مسألة حللناها بالفعل في تمرين سابق. وقد توصّلنا إلى إجابة مثل ما يلي، ثم اختصرناها باستخدام تعبيرات CTE:

```sql
select facid, sum(slots) as totalslots
	from cd.bookings
	group by facid
	having sum(slots) = (select max(sum2.totalslots) from
		(select sum(slots) as totalslots
		from cd.bookings
		group by facid
		) as sum2);
```

وبعد أن نظّفناها، يصبح هذا الحل ملائمًا تمامًا. لكن شرح كيفية عمل الاستعلام يجعله يبدو غريبًا قليلًا — 'أوجد عدد الشرائح التي حجزها أفضل مرفق. احسب إجمالي الشرائح المحجوزة لكل مرفق، وأعد فقط الصفوف التي يساوي فيها عدد الشرائح المحجوزة عددها لدى الأفضل'. ألن يكون أجمل لو أمكن القول 'احسب عدد الشرائح المحجوزة لكل مرفق، ورتّبها، واختر أي مرفق في المرتبة 1'؟

ولحسن الحظ، تتيح لنا دوال النافذة فعل ذلك — وإن كان من الإنصاف القول إن ذلك ليس بديهيًا للعين غير المدرّبة. وأول معلومة أساسية هي وجود دالة RANK. فهي ترتّب القيم بناءً على ORDER BY الممرَّرة إليها. وإن كان هناك تعادل على (مثلًا) المركز الثاني، فسيأخذ التالي المرتبة 4. إذن، ما نحتاج إلى فعله هو الحصول على عدد الشرائح لكل مرفق، وترتيبها، وانتقاء تلك في المرتبة الأولى. وقد تبدو المحاولة الأولى لذلك على شيء مثل ما يلي:

```sql
select facid, total from (
	select facid, total, rank() over (order by total desc) rank from (
		select facid, sum(slots) total
			from cd.bookings
			group by facid
		) as sumslots
	) as ranked
where rank = 1
```

يحسب الاستعلام الداخلي إجمالي الشرائح المحجوزة، ويرتّبها الأوسط، وينتقي الخارجي الأعلى مرتبة. ويمكننا في الحقيقة ترتيب ذلك قليلًا: تذكّر أن دوال النافذة تُطبَّق متأخرة إلى حد كبير في دالة select، أي بعد التجميع. وهذا يعني أنه يمكننا نقل التجميع إلى جزء ORDER BY من الدالة، كما هو معروض في الإجابة المعتمدة.

ورغم أن مقاربة دالة النافذة ليست أبسط كثيرًا من حيث عدد أسطر الشيفرة، فهي على الأرجح أكثر منطقية دلاليًا.

**تلميح:** هذا التمرين صعب قليلًا. ستحتاج إلى دالة النافذة RANK، ومن الجدير بالذكر أنه يمكن استخدام دالة تجميعية داخل عبارة ORDER BY في دالة نافذة.

## 18. ترتيب الأعضاء بحسب الساعات (المقرّبة) المستخدمة

**السؤال**

أنتج قائمة بالأعضاء (بمن فيهم الضيوف)، مع عدد الساعات التي حجزوها في المرافق، مقرّبة إلى أقرب عشر ساعات. ورتّبهم بحسب هذا الرقم المقرّب، مع إخراج الاسم الأول والاسم العائلي والساعات المقرّبة والمرتبة. ورتّب النتائج بحسب المرتبة ثم الاسم العائلي ثم الاسم الأول.

**النتائج المتوقعة**

| firstname | surname | hours | rank |
| --- | --- | --- | --- |
| GUEST | GUEST | 1200 | 1 |
| Darren | Smith | 340 | 2 |
| Tim | Rownam | 330 | 3 |
| Tim | Boothe | 220 | 4 |
| Tracy | Smith | 220 | 4 |
| Gerald | Butters | 210 | 6 |
| Burton | Tracy | 180 | 7 |
| Charles | Owen | 170 | 8 |
| Janice | Joplette | 160 | 9 |
| Anne | Baker | 150 | 10 |
| Timothy | Baker | 150 | 10 |
| David | Jones | 150 | 10 |
| Nancy | Dare | 130 | 13 |
| Florence | Bader | 120 | 14 |
| Anna | Mackenzie | 120 | 14 |
| Ponder | Stibbons | 120 | 14 |
| Jack | Smith | 110 | 17 |
| Jemima | Farrell | 90 | 18 |
| David | Pinker | 80 | 19 |
| Ramnaresh | Sarwin | 80 | 19 |
| Matthew | Genting | 70 | 21 |
| Joan | Coplin | 50 | 22 |
| David | Farrell | 30 | 23 |
| Henry | Worthington-Smyth | 30 | 23 |
| John | Hunt | 20 | 25 |
| Douglas | Jones | 20 | 25 |
| Millicent | Purview | 20 | 25 |
| Henrietta | Rumney | 20 | 25 |
| Erica | Crumpet | 10 | 29 |
| Hyacinth | Tupperware | 10 | 29 |

**الإجابة**

```sql
select firstname, surname,
	((sum(bks.slots)+10)/20)*10 as hours,
	rank() over (order by ((sum(bks.slots)+10)/20)*10 desc) as rank

	from cd.bookings bks
	inner join cd.members mems
		on bks.memid = mems.memid
	group by mems.memid
order by rank, surname, firstname;
```

لا تشكّل هذه الإجابة زيادة كبيرة على تمريننا السابق، وإن كانت توضح وظيفة RANK على نحو أفضل. ويمكنك أن ترى أن بعض مرتادي النادي لهم عدد مقرّب متساوٍ من الساعات المحجوزة، ومرتبتهم هي نفسها. وإذا تقاسم عضوان المركز الثاني، فالذي يليهما يأخذ المركز 4. وهناك دالة أخرى، هي DENSE_RANK، كانت ستعطي ذلك العضو المركز 3 بدلًا من ذلك.

ومن الجدير بالذكر التقنية التي نستخدمها للتقريب هنا. فإضافة 5 ثم القسمة على 10 ثم الضرب في 10 لها أثر (بفضل قطع الحساب الصحيح للكسور) تقريب الرقم إلى أقرب 10. وفي حالتنا، لأن الشرائح مدتها نصف ساعة، نحتاج إلى إضافة 10 ثم القسمة على 20 ثم الضرب في 10. ويمكن للمرء بالتأكيد أن يحتج بأن علينا إجراء التحويل من الشرائح إلى الساعات بصورة مستقلة عن التقريب، وهو ما يزيد الوضوح.

وبحديثنا عن الوضوح، بدأ هذا التقريب يُدخل قدرًا ملحوظًا من تكرار الشيفرة. والأمر عند هذه النقطة موكول إلى التقدير، لكن قد ترغب في إخراجه إلى استعلام فرعي كما يلي:

```sql
select firstname, surname, hours, rank() over (order by hours desc) from
	(select firstname, surname,
		((sum(bks.slots)+10)/20)*10 as hours

		from cd.bookings bks
		inner join cd.members mems
			on bks.memid = mems.memid
		group by mems.memid
	) as subq
order by rank, surname, firstname;
```

**تلميح:** ستحتاج إلى دالة النافذة RANK مرة أخرى. ويمكنك استخدام الحساب الصحيح لإنجاز التقريب.

## 19. إيجاد أفضل ثلاثة مرافق من حيث توليد الإيراد

**السؤال**

أنتج قائمة بأفضل ثلاثة مرافق من حيث توليد الإيراد (مع التعادلات). وأخرج اسم المرفق والمرتبة، مرتّبين بحسب المرتبة ثم اسم المرفق.

**النتائج المتوقعة**

| name | rank |
| --- | --- |
| Massage Room 1 | 1 |
| Massage Room 2 | 2 |
| Tennis Court 2 | 3 |

**الإجابة**

```sql
select name, rank from (
	select facs.name as name, rank() over (order by sum(case
				when memid = 0 then slots * facs.guestcost
				else slots * membercost
			end) desc) as rank
		from cd.bookings bks
		inner join cd.facilities facs
			on bks.facid = facs.facid
		group by facs.name
	) as subq
	where rank <= 3
order by rank;
```

لا يقدّم هذا السؤال أي مفاهيم جديدة، وهو مقصود فقط لمنحك فرصة التدرب على ما تعرفه بالفعل. فنستخدم عبارة CASE لحساب إيراد كل شريحة، ونجمّع ذلك لكل مرفق باستخدام SUM. ثم نستخدم دالة النافذة RANK لإنتاج ترتيب، ونلفّ الأمر كله في استعلام فرعي، ونستخرج كل ما مرتبته أقل من أو تساوي 3.

**تلميح:** سؤال آخر قائم على دالة النافذة RANK! تذكّر التعقيد النسبي في حساب إيراد مرفق، إذ يلزمك مراعاة التكاليف المختلفة لمستخدم الضيوف..

## 20. تصنيف المرافق بحسب القيمة

**السؤال**

صنّف المرافق إلى مجموعات متساوية الحجم: مرتفعة ومتوسطة ومنخفضة، بناءً على إيرادها. ورتّب بحسب التصنيف ثم اسم المرفق.

**النتائج المتوقعة**

| name | revenue |
| --- | --- |
| Massage Room 1 | high |
| Massage Room 2 | high |
| Tennis Court 2 | high |
| Badminton Court | average |
| Squash Court | average |
| Tennis Court 1 | average |
| Pool Table | low |
| Snooker Table | low |
| Table Tennis | low |

**الإجابة**

```sql
select name, case when class=1 then 'high'
		when class=2 then 'average'
		else 'low'
		end revenue
	from (
		select facs.name as name, ntile(3) over (order by sum(case
				when memid = 0 then slots * facs.guestcost
				else slots * membercost
			end) desc) as class
		from cd.bookings bks
		inner join cd.facilities facs
			on bks.facid = facs.facid
		group by facs.name
	) as subq
order by class, name;
```

ينبغي أن يستخدم هذا التمرين في معظمه مفاهيم مألوفة، وإن كنا نقدّم دالة النافذة NTILE. تجمع NTILE القيم في عدد من المجموعات ممرَّر إليها، بأكبر تساوٍ ممكن. وتُخرج رقمًا من 1 إلى عدد المجموعات. ثم نستخدم عبارة CASE لتحويل ذلك الرقم إلى تصنيف!

**تلميح:** ابحث في دالة النافذة NTILE.

## 21. حساب زمن استرداد التكلفة لكل مرفق

**السؤال**

بناءً على الأشهر الثلاثة الكاملة من البيانات حتى الآن، احسب مقدار الوقت الذي سيستغرقه كل مرفق لاسترداد تكلفة تملكه. وتذكّر أن تراعي الصيانة الشهرية المستمرة. وأخرج اسم المرفق وزمن الاسترداد بالأشهر، مرتّبًا بحسب اسم المرفق. ولا تقلق من اختلاف أطوال الأشهر، فنحن نبحث هنا عن قيمة تقريبية فقط!

**النتائج المتوقعة**

| name | months |
| --- | --- |
| Badminton Court | 6.8317677198975235 |
| Massage Room 1 | 0.18885741265344664778 |
| Massage Room 2 | 1.7621145374449339 |
| Pool Table | 5.3333333333333333 |
| Snooker Table | 6.9230769230769231 |
| Squash Court | 1.1339582703356516 |
| Table Tennis | 6.4000000000000000 |
| Tennis Court 1 | 2.2624434389140271 |
| Tennis Court 2 | 1.7505470459518600 |

**الإجابة**

```sql
select 	facs.name as name,
	facs.initialoutlay/((sum(case
			when memid = 0 then slots * facs.guestcost
			else slots * membercost
		end)/3) - facs.monthlymaintenance) as months
	from cd.bookings bks
	inner join cd.facilities facs
		on bks.facid = facs.facid
	group by facs.facid
order by name;
```

على النقيض من كل تماريننا الأخيرة، لا حاجة هنا إلى استخدام دوال النافذة لحلّ هذه المسألة: فالأمر مجرد قليل من الحساب يشمل الإيراد الشهري والنفقة الأولية والصيانة الشهرية. ومرة أخرى، في شيفرة الإنتاج قد تريد توضيح ما يجري هنا قليلًا باستخدام استعلام فرعي (وإن كان إدخال ذلك في الإنتاج غير مرجّح، لأننا ثبّتنا عدد الأشهر في الشيفرة!). وقد تبدو نسخة منظّفة كما يلي:

```sql
select 	name, 
	initialoutlay / (monthlyrevenue - monthlymaintenance) as repaytime 
	from 
		(select facs.name as name, 
			facs.initialoutlay as initialoutlay,
			facs.monthlymaintenance as monthlymaintenance,
			sum(case
				when memid = 0 then slots * facs.guestcost
				else slots * membercost
			end)/3 as monthlyrevenue
		from cd.bookings bks
		inner join cd.facilities facs
			on bks.facid = facs.facid
		group by facs.facid
	) as subq
order by name;
```

لكن، أسمعك تسأل: كيف ستبدو نسخة تلقائية من هذا؟ نسخة لا تحتاج إلى عدد أشهر مثبّت في الشيفرة؟ هذا أكثر تعقيدًا قليلًا، ويتضمن بعض الحساب على التواريخ. وقد أخرجته إلى تعبير CTE ليكون أوضح قليلًا.

```sql
with monthdata as (
	select 	mincompletemonth,
		maxcompletemonth,
		(extract(year from maxcompletemonth)*12) +
			extract(month from maxcompletemonth) -
			(extract(year from mincompletemonth)*12) -
			extract(month from mincompletemonth) as nummonths 
	from (
		select 	date_trunc('month', 
				(select max(starttime) from cd.bookings)) as maxcompletemonth,
			date_trunc('month', 
				(select min(starttime) from cd.bookings)) as mincompletemonth
	) as subq
)
select 	name, 
	initialoutlay / (monthlyrevenue - monthlymaintenance) as repaytime 
	
	from
		(select facs.name as name,
			facs.initialoutlay as initialoutlay,
			facs.monthlymaintenance as monthlymaintenance,
			sum(case
				when memid = 0 then slots * facs.guestcost
				else slots * membercost
			end)/(select nummonths from monthdata) as monthlyrevenue
			
			from cd.bookings bks
			inner join cd.facilities facs
				on bks.facid = facs.facid
			where bks.starttime < (select maxcompletemonth from monthdata)
			group by facs.facid
		) as subq
order by name;
```

تقيّد هذه الشيفرة البيانات الداخلة بالأشهر الكاملة. وتفعل ذلك باختيار أكبر تاريخ، وتقريبه نزولًا إلى الشهر، وإزالة كل التواريخ الأكبر من ذلك. وحتى هذه الشيفرة ليست كاملة تمامًا. فهي لا تتعامل مع حالة تكبّد مرفق خسارة. وإصلاح ذلك ليس صعبًا كثيرًا، وقد تُرك (كتمرين آخر) للقارئ!

**تلميح:** لا حاجة إلى استخدام دوال النافذة لحلّ هذه المسألة. ثبّت عدد الأشهر في الشيفرة ليسهل الأمر، أو احسبه لتصعبه.

## 22. حساب متوسط متحرك للإيراد الإجمالي

**السؤال**

لكل يوم في أغسطس 2012، احسب متوسطًا متحركًا للإيراد الإجمالي على مدى الأيام الخمسة عشر السابقة. وينبغي أن يحتوي الإخراج على عمودَي date وrevenue، مرتّبين بحسب التاريخ. وتذكّر أن تراعي احتمال أن يكون إيراد يوم ما صفرًا. هذا التمرين صعب قليلًا، فلا تخف من الاطلاع على التلميح!

**النتائج المتوقعة**

| date | revenue |
| --- | --- |
| 2012-08-01 | 1126.8333333333333333 |
| 2012-08-02 | 1153.0000000000000000 |
| 2012-08-03 | 1162.9000000000000000 |
| 2012-08-04 | 1177.3666666666666667 |
| 2012-08-05 | 1160.9333333333333333 |
| 2012-08-06 | 1185.4000000000000000 |
| 2012-08-07 | 1182.8666666666666667 |
| 2012-08-08 | 1172.6000000000000000 |
| 2012-08-09 | 1152.4666666666666667 |
| 2012-08-10 | 1175.0333333333333333 |
| 2012-08-11 | 1176.6333333333333333 |
| 2012-08-12 | 1195.6666666666666667 |
| 2012-08-13 | 1218.0000000000000000 |
| 2012-08-14 | 1247.4666666666666667 |
| 2012-08-15 | 1274.1000000000000000 |
| 2012-08-16 | 1281.2333333333333333 |
| 2012-08-17 | 1324.4666666666666667 |
| 2012-08-18 | 1373.7333333333333333 |
| 2012-08-19 | 1406.0666666666666667 |
| 2012-08-20 | 1427.0666666666666667 |
| 2012-08-21 | 1450.3333333333333333 |
| 2012-08-22 | 1539.7000000000000000 |
| 2012-08-23 | 1567.3000000000000000 |
| 2012-08-24 | 1592.3333333333333333 |
| 2012-08-25 | 1615.0333333333333333 |
| 2012-08-26 | 1631.2000000000000000 |
| 2012-08-27 | 1659.4333333333333333 |
| 2012-08-28 | 1687.0000000000000000 |
| 2012-08-29 | 1684.6333333333333333 |
| 2012-08-30 | 1657.9333333333333333 |
| 2012-08-31 | 1703.4000000000000000 |

**الإجابة**

```sql
select 	dategen.date,
	(
		-- correlated subquery that, for each day fed into it,
		-- finds the average revenue for the last 15 days
		select sum(case
			when memid = 0 then slots * facs.guestcost
			else slots * membercost
		end) as rev

		from cd.bookings bks
		inner join cd.facilities facs
			on bks.facid = facs.facid
		where bks.starttime > dategen.date - interval '14 days'
			and bks.starttime < dategen.date + interval '1 day'
	)/15 as revenue
	from
	(
		-- generates a list of days in august
		select 	cast(generate_series(timestamp '2012-08-01',
			'2012-08-31','1 day') as date) as date
	)  as dategen
order by dategen.date;
```

هناك على الأقل حلّان جيدان بالقدر نفسه لهذا السؤال. وقد وضعت أبسطهما كتابةً كإجابة، لكن هناك أيضًا حلًا أكثر مرونة يستخدم دوال النافذة.

لننظر إلى الإجابة المختارة أولًا. حين أقرأ استعلامات SQL، أميل إلى قراءة جزء SELECT أخيرًا — فجزآ FROM وWHERE يميلان إلى مزيد من الإثارة. فما لدينا في FROM؟ نداء لدالة GENERATE_SERIES. وهي تفعل إلى حد كبير ما تقوله حرفيًا — تولّد سلسلة قيم. ويمكنك تحديد قيمة بداية وقيمة توقف وقيمة زيادة. وهي تعمل مع الأنواع الصحيحة والتواريخ — وإن كنا، كما ترى، نحتاج إلى أن نكون صريحين بشأن الأنواع الداخلة إلى الدالة والخارجة منها. حاول إزالة التحويلات وترى النتيجة!

إذن، ولّدنا طابعًا زمنيًا لكل يوم في أغسطس. والآن، نحتاج لكل يوم إلى توليد متوسطنا. ويمكننا فعل ذلك باستخدام *استعلام فرعي مترابط*. فإن كنت تتذكر، الاستعلام الفرعي المترابط استعلام فرعي يستخدم قيمًا من الاستعلام الخارجي. وهذا يعني أنه يُنفَّذ مرة واحدة لكل صف نتيجة في الاستعلام الخارجي. ويقابله الاستعلام الفرعي غير المترابط، الذي لا يلزم تنفيذه إلا مرة واحدة.

وإذا نظرنا إلى استعلامنا الفرعي المترابط، نرى أنه مترابط على حقل dategen.date. فهو ينتج مجموع الإيراد لهذا اليوم والأيام الأربعة عشر السابقة له، ثم يقسم ذلك المجموع على 15. وهذا ينتج الإخراج الذي نبحث عنه!

ذكرت أن هناك حلًا قائمًا على دوال النافذة لهذه المسألة أيضًا — وتراه أدناه. والمقاربة التي نستخدمها لذلك توليد قائمة بالإيراد لكل يوم، ثم استخدام تجميع دوال النافذة على تلك القائمة. والجميل في هذه الطريقة أنه متى كانت لديك الإيرادات اليومية، أمكنك إنتاج مجموعة واسعة من النتائج بسهولة تامة — فقد تريد، مثلًا، متوسطات متحركة للشهر السابق و15 يومًا و5 أيام. ويسهل فعل ذلك بهذه الطريقة، ويصعب نسبيًا بالتجميع التقليدي.

```sql
select date, avgrev from (
	-- AVG over this row and the 14 rows before it.
	select 	dategen.date as date,
		avg(revdata.rev) over(order by dategen.date rows 14 preceding) as avgrev
	from
		-- generate a list of days.  This ensures that a row gets generated
		-- even if the day has 0 revenue.  Note that we generate days before
		-- the start of october - this is because our window function needs
		-- to know the revenue for those days for its calculations.
		(select
			cast(generate_series(timestamp '2012-07-10', '2012-08-31','1 day') as date) as date
		)  as dategen
		left outer join
			-- left join to a table of per-day revenue
			(select cast(bks.starttime as date) as date,
				sum(case
					when memid = 0 then slots * facs.guestcost
					else slots * membercost
				end) as rev

				from cd.bookings bks
				inner join cd.facilities facs
					on bks.facid = facs.facid
				group by cast(bks.starttime as date)
			) as revdata
			on dategen.date = revdata.date
	) as subq
	where date >= '2012-08-01'
order by date;
```

ستلاحظ أننا كنا نريد حساب الإيراد اليومي كثيرًا. وبدلًا من إدراج ذلك الحساب في كل استعلاماتنا، وهو أمر غير مرتب إلى حد كبير (وسيسبب لنا صداعًا كبيرًا إن غيّرنا مخططنا يومًا)، نريد على الأرجح تخزين تلك المعلومة في مكان ما. وقد تكون فكرتك الأولى حساب المعلومة وتخزينها في مكان ما للاستخدام لاحقًا. وهذا تكتيك شائع لمستودعات البيانات الكبيرة، لكنه قد يسبب لنا بعض المشكلات — فإذا عدنا يومًا وحرّرنا بياناتنا، فعلينا أن نتذكر إعادة الحساب. وبالنسبة لبيانات ليست هائلة الحجم كالتي ننظر فيها هنا، يمكننا ببساطة إنشاء عرض (view) بدلًا من ذلك. والعرض في جوهره استعلام مخزّن يشبه جدولًا تمامًا. وفي الخفاء، يستبدل نظام إدارة قواعد البيانات الجزء ذا الصلة من تعريف العرض عند اختيارك بيانات منه. وإنشاء العروض سهل جدًا، كما ترى أدناه:

```sql
create or replace view cd.dailyrevenue as
	select 	cast(bks.starttime as date) as date,
		sum(case
			when memid = 0 then slots * facs.guestcost
			else slots * membercost
		end) as rev

		from cd.bookings bks
		inner join cd.facilities facs
			on bks.facid = facs.facid
		group by cast(bks.starttime as date);
```

ويمكنك أن ترى أن هذا يجعل استعلامنا أبسط كثيرًا!

```sql
select date, avgrev from (
	select  dategen.date as date,
		avg(revdata.rev) over(order by dategen.date rows 14 preceding) as avgrev
	from		
		(select
			cast(generate_series(timestamp '2012-07-10', '2012-08-31','1 day') as date) as date
		)  as dategen
		left outer join
			cd.dailyrevenue as revdata on dategen.date = revdata.date
		) as subq
	where date >= '2012-08-01'
order by date;
```

وإلى جانب تخزين أجزاء الاستعلامات كثيرة الاستخدام، يمكن استخدام العروض لأغراض متنوعة، منها تقييد الوصول إلى أعمدة معيّنة من جدول.

**تلميح:** ستحتاج إلى توليد قائمة أيام: راجع GENERATE_SERIES لذلك. وبعدها يمكنك حلّ هذه المسألة باستخدام دوال التجميع أو دوال النافذة.
