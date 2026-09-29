---
title: "الاستعلامات التعاودية"
lang: ar
source: https://pgexercises.com/questions/recursive/
---

تتيح لنا التعبيرات الجدولية الشائعة (Common Table Expressions، أو CTEs) أن ننشئ فعليًا جداول مؤقتة خاصة بنا طوال مدة الاستعلام (query) — وهي إلى حد كبير وسيلة للراحة تساعدنا على كتابة SQL أوضح قراءةً. لكن باستخدام المعدّل [WITH RECURSIVE](http://www.postgresql.org/docs/current/static/queries-with.html) يصبح في إمكاننا إنشاء استعلامات تعاودية (recursive queries). وهذا مفيد جدًا للعمل مع البيانات ذات البنية الشجرية والبيانات الرسومية (graph) — تخيّل، على سبيل المثال، استرجاع كل علاقات عقدة في رسم بياني حتى عمق معيّن.

تعرض لك هذه الفئة بعض الاستعلامات التعاودية الأساسية الممكنة باستخدام مجموعة بياناتنا.

## 1. إيجاد سلسلة التوصيات الصاعدة للعضو ذي المعرّف 27

**السؤال**

أوجد سلسلة التوصيات الصاعدة للعضو ذي المعرّف 27: أي العضو الذي أوصى به، ثم العضو الذي أوصى بذلك العضو، وهكذا. أرجع معرّف العضو والاسم الأول والاسم العائلي. ورتّب تنازليًا بحسب معرّف العضو.

**النتائج المتوقعة**

| recommender | firstname | surname |
| --- | --- | --- |
| 20 | Matthew | Genting |
| 5 | Gerald | Butters |
| 1 | Darren | Smith |

**الإجابة**

```sql
with recursive recommenders(recommender) as (
	select recommendedby from cd.members where memid = 27
	union all
	select mems.recommendedby
		from recommenders recs
		inner join cd.members mems
			on mems.memid = recs.recommender
)
select recs.recommender, mems.firstname, mems.surname
	from recommenders recs
	inner join cd.members mems
		on recs.recommender = mems.memid
order by memid desc
```

تمثّل WITH RECURSIVE وظيفة مفيدة بشكل مذهل ولا يعرفها كثير من المطوّرين. فهي تتيح لك تنفيذ استعلامات على تسلسلات هرمية من البيانات، وهو أمر يصعب جدًا بوسائل أخرى في SQL. وغالبًا ما تدفع هذه الحالات المطوّرين إلى اللجوء إلى رحلات ذهاب وإياب متعددة إلى نظام قاعدة البيانات.

لقد رأيت WITH من قبل. فالتعبيرات الجدولية الشائعة (CTEs) التي يعرّفها WITH تمنحك القدرة على إنتاج عروض مضمّنة على بياناتك. وهذا في العادة مجرد تسهيل نحوي، لكن المعدّل RECURSIVE يضيف القدرة على الربط مقابل نتائج أُنتجت بالفعل لإنتاج المزيد. ويتخذ WITH التعاودي الصورة الأساسية التالية:

```
WITH RECURSIVE NAME(columns) as (
	<initial statement>
	UNION ALL 
	<recursive statement>
)
```

يملأ البيان الأولي البيانات الأولية، ثم يُشغَّل البيان التعاودي مرارًا لإنتاج المزيد. ويستطيع كل خطوة من خطوات التعاود الوصول إلى تعبير CTE، لكنه لا يرى داخله إلا البيانات التي أنتجتها التكرارية السابقة. ويتكرر ذلك حتى لا تُنتج أي تكرارية بيانات إضافية. وقد يبدو أبسط مثال على WITH تعاودي على شيء مثل هذا:

```sql
with recursive increment(num) as (
	select 1
	union all
	select increment.num + 1 from increment where increment.num < 5
)
select * from increment;
```

يُنتج البيان الأولي '1'. وترى التكرارية الأولى للبيان التعاودي هذا محتوىً لـ increment، فتُنتج '2'. وترى التكرارية التالية محتوى increment على أنه '2'، وهكذا. وينتهي التنفيذ عندما لا يُنتج البيان التعاودي أي بيانات إضافية.

وبعد الانتهاء من الأساسيات، يسهّل إلى حد كبير شرح إجابتنا هنا. فيأتي البيان الأولي بمعرّف الشخص الذي أوصى بالعضو الذي يهمنا. ويأخذ البيان التعاودي نتائج البيان الأولي، ويجد معرّف الشخص الذي أوصى به. ثم تُمرَّر هذه القيمة إلى التكرارية التالية، وهكذا.

وبعد أن أنشأنا تعبير CTE المسمى recommenders، كل ما على بيان SELECT الرئيسي فعله هو جلب معرّفات الأعضاء من recommenders، وربطها بجدول members لمعرفة أسمائهم.

**تلميح:** اقرأ عن WITH RECURSIVE.

## 2. إيجاد سلسلة التوصيات النازلة للعضو ذي المعرّف 1

**السؤال**

أوجد سلسلة التوصيات النازلة للعضو ذي المعرّف 1: أي الأعضاء الذين أوصى بهم، ثم الأعضاء الذين أوصى بهم هؤلاء، وهكذا. أرجع معرّف العضو واسمه، ورتّب تصاعديًا بحسب معرّف العضو.

**النتائج المتوقعة**

| memid | firstname | surname |
| --- | --- | --- |
| 4 | Janice | Joplette |
| 5 | Gerald | Butters |
| 7 | Nancy | Dare |
| 10 | Charles | Owen |
| 11 | David | Jones |
| 14 | Jack | Smith |
| 20 | Matthew | Genting |
| 21 | Anna | Mackenzie |
| 26 | Douglas | Jones |
| 27 | Henrietta | Rumney |

**الإجابة**

```sql
with recursive recommendeds(memid) as (
	select memid from cd.members where recommendedby = 1
	union all
	select mems.memid
		from recommendeds recs
		inner join cd.members mems
			on mems.recommendedby = recs.memid
)
select recs.memid, mems.firstname, mems.surname
	from recommendeds recs
	inner join cd.members mems
		on recs.memid = mems.memid
order by memid
```

هذا تنويع طفيف جدًا على السؤال السابق. والفرق الجوهري أننا نتجه الآن في الاتجاه المعاكس. ومن النقاط المثيرة للانتباه أن هذا التعبير CTE، بخلاف المثال السابق، ينتج صفوفًا متعددة في كل تكرارية، بحكم أننا ننزل في شجرة التوصيات (باتباع كل الفروع) بدلًا من الصعود فيها.

**تلميح:** اقرأ عن WITH RECURSIVE.

## 3. إنتاج تعبير CTE يمكنه إرجاع سلسلة التوصيات الصاعدة لأي عضو

**السؤال**

أنتج تعبير CTE يمكنه إرجاع سلسلة التوصيات الصاعدة لأي عضو. وينبغي أن تستطيع تنفيذ select recommender from recommenders where member=x. وأثبت ذلك بجلب السلسلتين للعضوين 12 و22. وينبغي أن يحتوي جدول النتائج على member وrecommender، مرتّبين تصاعديًا بحسب member وتنازليًا بحسب recommender.

**النتائج المتوقعة**

| member | recommender | firstname | surname |
| --- | --- | --- | --- |
| 12 | 9 | Ponder | Stibbons |
| 12 | 6 | Burton | Tracy |
| 22 | 16 | Timothy | Baker |
| 22 | 13 | Jemima | Farrell |

**الإجابة**

```sql
with recursive recommenders(recommender, member) as (
	select recommendedby, memid
		from cd.members
	union all
	select mems.recommendedby, recs.member
		from recommenders recs
		inner join cd.members mems
			on mems.memid = recs.recommender
)
select recs.member member, recs.recommender, mems.firstname, mems.surname
	from recommenders recs
	inner join cd.members mems		
		on recs.recommender = mems.memid
	where recs.member = 22 or recs.member = 12
order by recs.member asc, recs.recommender desc
```

يتطلب هذا السؤال منا إنتاج تعبير CTE يمكنه حساب سلسلة التوصيات الصاعدة لأي مستخدم. ومعظم تعقيد الوصول إلى الجواب يكمن في إدراك أننا نحتاج الآن إلى أن ينتج تعبيرنا CTE عمودين: عمودًا يحتوي العضو الذي نسأل عنه، وآخر يحتوي الأعضاء في شجرة توصياته. وما نفعله في جوهره إنتاج جدول يبسّط التسلسل الهرمي للتوصيات ويسطّحه.

ولأننا نريد إنتاج السلسلة لكل مستخدم، يحتاج بياننا الأولي إلى اختيار بيانات كل مستخدم: معرّفه ومن أوصى به. وبعد ذلك، نريد تمرير حقل member عبر كل تكرارية دون تغييره، مع جلب المُوصي التالي. ويمكنك أن ترى أن الجزء التعاودي من بياننا لم يتغير فعليًا، إلا بتمرير حقل 'member'.

**تلميح:** ينبغي أن يُعيد بيانك الأولي كل حقول recommendedby وmemid في جدول members.
