---
title: "تمارين SQL على قاعدة بيانات نادٍ للطبخ"
lang: ar
source: https://df.webontwerp.ucll.be/EN/SQL_kookclub/
---

> كل ما أردت فعله يومًا هو جعل الطعام في متناول الجميع؛ وأن أُظهر أنك تستطيع ارتكاب الأخطاء &ndash; وأنا أفعل ذلك طوال الوقت &ndash; لكن ذلك لا يهم. &mdash;Jamie Oliver

## تقديم النموذج

في هذا الفصل الأخير نريد أن نعطيك فكرة عن صعوبة تمارين الامتحان. ولهذا نعيد استخدام نموذج استُخدم في امتحان سابق لنادٍ للطبخ.

يمكنك إيجاد هذا النموذج ("cooking_club") في قاعدة البيانات "df". ولديك صلاحيات `SELECT` فقط، وبالتالي لا يمكنك اختبار `INSERT` و`CREATE` ونحو ذلك.

ولهذا الامتحان، سنستخدم نموذجًا بسيطًا لمنظمة تنظّم ورش عمل للطبخ. وهذا هو النموذج الفيزيائي:

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-kookclub-0-ERD_kookclub.webp)

نريد أتمتة تنظيم ورش عمل الطبخ. وتدور ورشة طبخ دائمًا حول موضوع معين توجد داخله أطباق معينة. ويمكن للأعضاء التسجيل للمشاركة في ورشة، ويمكنهم أيضًا منح تقييم وبعض الملاحظات. وكلا الخاصيتين غير إلزامية.

وعند تنظيم ورشة طبخ، يُحدَّد الموضوع كما ذُكر أعلاه. وداخل كل موضوع تُعرف عدة أطباق. ويمكن لورشة الطبخ اختيار أطباق من المعروضات داخل ذلك الموضوع، لكن يمكن أيضًا إضافة طبق جديد. وبالطبع سيُربط هذا الطبق الجديد بذلك الموضوع. ولكل طبق تُسجَّل المكوّنات والكميات المستخدمة لكل طبق في قاعدة البيانات.

ملاحظة عن المكوّنات: تشير الوحدة إلى ما إذا كان ذلك المكوّن يُستخدم بالغرام أو بالمليلتر أو بملعقة الطعام أو بالقطعة أو غير ذلك. ويعرض مستوى الطاقة عدد الكيلوكالوري. ولاحظ أنه إذا كانت الوحدة معبَّر عنها بالغرام أو المليلتر، فإن الطاقة تُعطى دائمًا لكل 100 غرام أو 100 مليلتر. وفي الحالات الأخرى تكون لكل وحدة مشار إليها.

فمثلًا، تحقق في قاعدة البيانات من أن الفراولة فيها 32 كيلوكالوري من الطاقة لكل 100 غرام، وأن المشمشة الواحدة فيها محتوى طاقة 27 كيلوكالوري.

#### الحل

```sql
SELECT *
FROM cooking_club.ingredient -- or use the search_path …
WHERE name IN ('Strawberry','Apricot');
```

لا تنسَ ضبط `search_path` بشكل صحيح أو استخدام اسم المخطط قبل اسم الجدول...

نصيحة: ادرس الآن النموذج قبل النظر في الأسئلة. راجع محتويات جميع الجداول لتأخذ فكرة عن أين تجد المعلومات ومدى ضخامة بعض الجداول. فجزء من قاعدة البيانات مولَّد تلقائيًا (مثل "member" و"participation")، لكن جداول كثيرة لا تزال مملوءة يدويًا ولذا تبدو البيانات واقعية إلى حد كبير.

ستجد أدناه تمارين كثيرة كما طُلبت مرة في امتحان. وهناك أنواع كثيرة ومختلفة:

- أعطِ الجواب عن سؤال، دون طلب شيفرة SQL.
- أعطِ شيفرة SQL التي تجيب عن سؤال.
- عدّل قاعدة البيانات: أضف بيانات، غيّر أشياء (لكن لا يمكنك اختبار ذلك لأنك لا تملك الأذونات المناسبة).
- ماذا تفعل شيفرة SQL التالية؟
- وسّع النموذج بوظيفة جديدة.

## أسئلة عليك فيها إعطاء الجواب فقط

في هذه التمارين لا يلزمك سوى تقديم إجابة قصيرة (اسم، مكوّن، بلدية...). فلا يلزمك تقديم الاستعلام الذي وجدت به هذه الإجابة. وستجد في الحلول عادةً الاستعلام لتتحقق مما أخطأت فيه.

يتضمن المخطط قائمة شاملة بالمكوّنات. وبعضها بالغرام، وآخر بالمليلتر، وآخر بملعقة الطعام، وغيره بالقطعة، وهكذا. افترض أنك تأكل واحدًا من كل مكوّن يُعدّ *بالقطعة*، فكم كمية الطاقة (كيلوكالوري) التي استهلكتها؟

#### الحل

الجواب: 7071 كيلوكالوري. والاستعلام الممكن لذلك:

```sql
SELECT sum(energy)
FROM ingredient
WHERE unit = 'piece';
```

مُلئ هذا المخطط جزئيًا بتوليد بيانات تلقائي. ولم يُفعل ذلك بذكاء شديد. فمثلًا، من الواضح أنه لا يمكن أن يقع تاريخ تسجيل *بعد* ورشة الطبخ نفسها. لذا يجب تصحيح هذا الخطأ يدويًا. فكم عدد التسجيلات الخاطئة كهذه؟

#### الحل

الجواب: 57، والاستعلام الممكن:

```sql
SELECT COUNT(*)
FROM participation D INNER JOIN cooking_workshop K ON D.workshop = K.workshop_id
WHERE D.registration_date > K.start_time;
```

تحقق من جميع الأطباق *الرئيسية* التي صُنعت يومًا في ورشة طبخ. وقد تطلب ذلك مكوّنات كثيرة. وإذا حذفتها من القائمة الطويلة لجميع المكوّنات ورتّبت القائمة المتبقية أبجديًا، فما المكوّن الذي لم يُستخدم لأي طبق رئيسي ويقع في الصف 81؟

#### الحل

الجواب: Meatball، ويمكن إيجاد الحل مثلًا عبر:

```sql
SELECT name, IG.dish
FROM dish_in_workshop GW
  INNER JOIN ingredient_in_dish IG on GW.dish = IG.dish AND role_in_menu = 'Main Dish'
  RIGHT OUTER JOIN ingredient I ON IG.ingredient = I.name
WHERE IG.dish is NULL
ORDER BY 1;
```

من أصغر مشارك في ورشة طبخ استخدم كلمة "awesome" أو "fantastic" في ملاحظاته؟ وقدّم الاسم الأول ثم الاسم.

#### الحل

الجواب: Ramiro Bell، مثلًا بالاستعلام التالي:

```sql
SELECT first_name, name, birth_date, feedback
FROM participation D INNER JOIN member L ON D.member = L.member_number
WHERE feedback LIKE '%awesome%' OR feedback LIKE '%fantastic%'
ORDER BY 3 DESC;
```

## سؤال النموذج

في هذا السؤال، عليك إضافة شيء إلى النموذج. ولا يمكنك اختبار ذلك لأنك تملك صلاحيات `SELECT` فقط على المخطط. وترسم شيئًا على الورق لهذا السؤال على مخطط الكيانات والعلاقات (النموذج الفيزيائي) للمخطط وتصدر استعلامات SQL اللازمة.

نريد تتبّع كمية المكوّنات التي نحتاج إلى طلبها لورشة معينة. وللقيام بذلك، نحتاج إلى تتبّع كمية كل مكوّن مطلوب في تاريخ محدد.

1. ارسم الإضافة اللازمة إلى المخطط.
2. اكتب التغييرات اللازمة في نص `CREATE`. واحرص أيضًا على أن تكون الأعداد المطلوبة موجبة تمامًا دائمًا. وأدرج جميع قواعد السلامة.
3. بالنسبة إلى ورشة الطبخ 7، ينبغي طلب المكوّنات التالية: 600 غرام زنجبيل (80 كيلوكالوري لكل 100 غرام)، و180 غرام واسابي (241 كيلوكالوري لكل 100 غرام)، و6 كيلوغرام سلمون (137 كيلوكالوري لكل 100 غرام)، و7 قطع بروكلي (35 كيلوكالوري لكل قطعة). واكتب جمل `INSERT` اللازمة لذلك.

#### الحل

تحتاج إلى إنشاء جدول:

```sql
CREATE  TABLE cooking_club.order (
  ingredient_name          varchar(30)  NOT NULL ,
  workshop_id              smallint  NOT NULL ,
  order_date               date NOT NULL ,
  number                   smallint  NOT NULL ,
  CONSTRAINT pk_order PRIMARY KEY ( ingredient_name, workshop_id, order_date ),
  CONSTRAINT fk_order_ingredient FOREIGN KEY ( ingredient_name )
      REFERENCES cooking_club.ingredient( name )   ,
  CONSTRAINT fk_order_cooking_workshop FOREIGN KEY ( workshop_id )
       REFERENCES cooking_club.cooking_workshop( workshop_id )   ,
  CONSTRAINT cns_order CHECK ( number > 0 )
);
```

وتتم إضافة المعلومات الإضافية كما يلي: اطلب 0.6 كيلوغرام من الزنجبيل (80 كيلوكالوري لكل 100 غرام)، و180 غرامًا من الواسابي (241 كيلوكالوري لكل 100 غرام)، و6 كيلوغرامات من السلمون (137 كيلوكالوري لكل 100 غرام)، و7 حبات بروكلي (35 كيلوكالوري لكل واحدة) لاستخدامها في ورشة الطبخ 7 لأننا سنعدّ فيها سمكًا على الطريقة الشرقية. والزنجبيل والسلمون والبروكلي موجودة بالفعل في جدول المكوّنات. أما الواسابي فليس موجودًا فيه بعد، لذا عليك أولًا إضافة ذلك المكوّن:

```sql
INSERT INTO ingredient VALUES ('Wasabi', 'g', 241);
```

ويمكننا الآن إدراج الطلب في جدول order:

```sql
INSERT INTO order VALUES ('Ginger', 7, '2020-08-18', 600);
INSERT INTO order VALUES ('Wasabi', 7, '2020-08-18', 180);
INSERT INTO order VALUES ('Salmon', 7, '2020-08-18', 6000);
INSERT INTO order VALUES ('Broccoli', 7, '2020-08-18', 7);
```

## بالنظر إلى استعلام SQL، فما كان السؤال؟

في هذا التمرين، يُعطى لك استعلام هو جواب عن سؤال معين. فما كان السؤال؟ وقدّم إجابتك بأكبر قدر ممكن من الاكتمال. ولا تتردد في استخدام عدة جمل.

```sql
SELECT distinct municipality
FROM municipality LEFT OUTER JOIN member using(postal_code)
  INNER JOIN participation ON member.member_number = participation.member
  INNER JOIN dish_in_workshop using(workshop)
  INNER JOIN ingredient_in_dish using(dish)
GROUP BY municipality, participation.member
HAVING COUNT(distinct ingredient) > 30
ORDER BY 1 ASC;
```

#### الحل

قدّم قائمة أبجدية بجميع البلديات التي شارك سكانها في ورشة طبخ واحدة أو أكثر بمجموع يزيد على 30 مكوّنًا مختلفًا (عبر جميع ورش طبخ هذا العضو). وإذا وُجد عدة سكان كهؤلاء، فينبغي إدراج البلدية مرة واحدة فقط. و`OUTER JOIN` ليس له أثر ولا يُترجم إلى السؤال.

## استعلامات SQL

يتطلب النوع التالي من التمارين إعادة *استعلام SQL الكامل* جوابًا لك.

قدّم نظرة عامة تبيّن لكل مكوّن في أي موضوعات يُستخدم ذلك المكوّن. وهناك عمود إضافي يعرض طاقة المكوّن بكلمة واحدة: أقل من 100 (كيلوكالوري) هو "low"، وبين 100 و300 هو "medium"، وأعلى من 300 هو "high". وتجنّب تكرار الصفوف. ورتّب المكوّنات أبجديًا. اكتب الاستعلام.

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-kookclub-1-kcal.webp)

#### الحل

```sql
SELECT distinct I.name AS ingredient, GT.theme AS "name theme", 
  CASE
    WHEN energy < 100 THEN 'low'
    WHEN energy > 300 THEN 'high'
    ELSE 'medium'
  END AS energy
FROM ingredient I
    INNER JOIN ingredient_in_dish IG ON (I.name = IG.ingredient)
    INNER JOIN dish_fits_in_theme GT using(dish)
ORDER BY 1;
```

لكل موضوع، اسرد (انظر الشكل) حسب البلدية عدد المشاركين من تلك البلدية. ورتّب أبجديًا حسب الموضوع وداخل الموضوع الواحد حسب عدد الأعضاء المتناقص. اكتب الاستعلام.

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-kookclub-2-ledenperthema.webp)

#### الحل

```sql
SELECT theme, municipality, COUNT (member_number) AS "number of members per municipality"
FROM member
  INNER JOIN municipality USING (postal_code)
  INNER JOIN participation ON (member = member_number)
  INNER JOIN cooking_workshop ON (workshop = workshop_id)
GROUP BY theme, postal_code, municipality
ORDER BY theme, COUNT(member_number) DESC;
```

وصيغة بديلة يمكن فيها إغفال municipality في `GROUP BY` بسبب عدم استخدام `USING`:

```sql
SELECT theme, municipality, COUNT (member_number) AS "number of members per municipality"
FROM member
  INNER JOIN municipality ON municipality.postal_code = member.postal_code
  INNER JOIN participation ON (member = member_number)
  INNER JOIN cooking_workshop ON (workshop = workshop_id)
GROUP BY theme, municipality.postal_code
ORDER BY theme, COUNT(member_number) DESC;
```

كم كيلوكالوري في طبق "Tiramisu with chocolate and banana" لكل مكوّن؟ ولاحظ أنه عندما تكون الوحدة "g" أو "ml"، فإن محتوى الطاقة هو عدد الكيلوكالوري لكل 100 غرام أو 100 مليلتر. أما بالنسبة إلى جميع الوحدات الأخرى، فالعدد بالكيلوكالوري هو ببساطة الطاقة لكل وحدة (قطعة، ملعقة طعام...). لذا ضع الوحدات في اعتبارك. والمكوّن الذي يقدّم أكبر إسهام في طاقة هذا الطبق في الأعلى، ثم الثاني، وهكذا. انظر الشكل. اكتب الاستعلام.

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-kookclub-3-tiramisu-energie.webp)

#### الحل

```sql
SELECT IG.ingredient, quantity, unit,energy,
  CASE
    WHEN unit in ('g','ml') THEN energy * quantity / 100
    ELSE energy * quantity
  END AS titak
FROM ingredient_in_dish IG INNER JOIN ingredient I ON IG.ingredient = I.name
WHERE dish = 'Tiramisu with chocolate and banana'
ORDER BY 5 DESC;
```

## أسئلة عليك فيها إعطاء الجواب فقط، الجزء 2

اسرد أبجديًا جميع المكوّنات التي *لم تُستخدم بعد* في طبق. فأي مكوّن يقع في المرتبة 100 وما قيمة طاقة هذا المكوّن؟ إذن تحتوي إجابتك على جزأين مثل: "Cauliflower with 25 kcal".

#### الحل

الجواب: "Red Whine" بـ 82 كيلوكالوري. والاستعلام الممكن:

```sql
SELECT ingredient.name, ingredient.energy
FROM ingredient LEFT OUTER JOIN ingredient_in_dish ON (ingredient.name = ingredient_in_dish.ingredient)
WHERE ingredient_in_dish.dish IS NULL
ORDER BY ingredient.name;
```

اعرض جميع المشاركات في ورش الطبخ لأشخاص من بلدية تبدأ بحرف "N" أو تنتهي بحرف "n". فكم مشاركًا من هذه البلديات منح تقييمًا لا يقل عن 7؟

#### الحل

الجواب: 10. والاستعلام الممكن:

```sql
SELECT score, member_number, municipality, postal_code
FROM participation D
    INNER JOIN member L ON D.member = L.member_number
    INNER JOIN municipality using(postal_code)
WHERE (municipality LIKE 'N%' OR municipality LIKE '%n') AND score >= 7;
```

راجع القائمة الطويلة للمكوّنات، لكن اقتصر على المكوّنات المقيسة بالغرام ("g"). واحسب متوسط طاقة هذه المكوّنات (وهي مقيسة لكل 100 غرام، لكن ذلك لا يهم هنا). فأي مكوّن مقيس بالغرام محتوى طاقته أقرب إلى هذا المتوسط؟

#### الحل

الجواب: Advocaat (240 كيلوكالوري لكل 100 غرام، وهو الأقرب إلى المتوسط 226.5). ويمكنك الحصول على ذلك بسهولة بأصغر استعلامين، لكن يستطيع بالطبع فعل ذلك بصورة أكثر أناقة باستعلام واحد (يحتوي استعلامًا فرعيًا).

```sql
SELECT name,energy -- but first you ask avg(energy)
FROM ingredient
WHERE unit = 'g'
ORDER BY 2;
```

قدّم الاسم الأول واسم العضو صاحب أكبر عدد من المشاركات. وإذا وُجد عدة أعضاء بالعدد الأقصى نفسه من المشاركات، فأعطِ جميع الأسماء (الاسم الأول ثم الاسم الأخير).

#### الحل

الجواب: Benny Nielsenn وCasey Valentine وShelley Vincent

```sql
SELECT name, first_name, COUNT(*)
FROM participation D INNER JOIN member L ON D.member = L.member_number
GROUP BY member_number
ORDER BY 3 DESC, 1;
```

## بالنظر إلى استعلام SQL، فما كان السؤال؟ الجزء 2

في هذا التمرين تحصل على استعلام هو جواب عن سؤال معين. فما كان هذا السؤال؟ وقدّم إجابتك بأكبر قدر ممكن من الاكتمال. ولا تتردد في استخدام عدة جمل لوصف ذلك السؤال بوضوح.

```sql
SELECT G.name
FROM theme T
    INNER JOIN dish_fits_in_theme GT ON T.name = GT.theme
    RIGHT OUTER JOIN dish G ON GT.dish = G.name AND
        T.name IN ('mediterranean','italian','fish')
WHERE T.name is NULL AND G.description NOT LIKE '%summer%'
ORDER BY preparation_time DESC;
```

#### الحل

هذا تمرين صعب، [انظر أيضًا عنوان "تحديد الصفوف التي لا تحقق شرطًا معينًا في الجزء الخاص بـ OUTER JOIN](/book/database-foundations/sql-outerjoin/index#Select-rows-that-do-NOT-meet-a-certain-condition). اسرد جميع الأطباق في قاعدة البيانات التي *ليس* موضوعها Mediterranean أو Italian أو Fish ولا يتضمن وصف الطبق كلمة summer، مرتبة حسب مدة تحضير الطبق المتناقصة.

## استعلامات SQL، الجزء 2

اكتب استعلامًا يحسب، لجميع الأطباق التي لها قائمة مكوّنات، محتوى الطاقة الإجمالي بالكيلوكالوري. تنبيه: بالنسبة إلى المكوّنات التي وحدتها "g" أو "ml"، يُعطى محتوى الطاقة لكل 100 غرام أو 100 مليلتر. وبالنسبة إلى جميع الوحدات الأخرى يُعطى محتوى الطاقة لكل وحدة ("piece" و"dl" و"teaspoon"...). ونريد استخدام هذه النظرة العامة للحصول على قائمة بالأطباق "الخفيفة" فقط التي تحتوي إجمالًا أقل من 4000 كيلوكالوري. والطبق ذو أقل عدد من الكيلوكالوري في الأعلى، ثم الثاني، وهكذا. ولا تُظهر اللقطة سوى الصفين الأولين.

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-kookclub-4-weinigkcal.webp)

#### الحل

```sql
SELECT IG.dish,
  sum(CASE
    WHEN unit in ('g','ml') THEN energy * quantity / 100
    ELSE energy * quantity
  END) AS "total kcal"
FROM ingredient_in_dish IG INNER JOIN ingredient I ON IG.ingredient = I.name
GROUP BY IG.dish
HAVING sum(CASE
    WHEN unit in ('g','ml') THEN energy * quantity / 100
    ELSE energy * quantity
  END) < 4000
ORDER BY 2;
```

عند التسجيل لم نأخذ في الاعتبار الحد الأقصى لعدد المشاركين في كل ورشة طبخ. وهذا غبي بالطبع، لأن الأشخاص الذين سجّلوا بعد بلوغ الحد الأقصى للمشاركين ينبغي إخطارهم بأن الورشة ممتلئة بالفعل. اكتب استعلامًا يولّد قائمة بجميع الورش المفرطة في الحجز. والورشة الأكثر حجزًا زائدًا في الأعلى، وتحتها صاحبة ثاني أكبر حجز زائد، وهكذا. ولا تُظهر اللقطة في الشكل أدناه سوى الصفوف الثلاثة الأولى.

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-kookclub-5-overboekt.webp)

#### الحل

```sql
SELECT workshop_id, max_participants, COUNT(*) AS "number of participants"
FROM cooking_workshop KW INNER JOIN participation D ON D.workshop = KW.workshop_id
GROUP BY workshop_id
HAVING COUNT(*) > max_participants
ORDER BY (COUNT(*) - max_participants) DESC;
```

## أسئلة عليك فيها إعطاء الجواب فقط، الجزء 3 (+ فيديو)

أنشئ قائمة بجميع الأعضاء الذين لم يشاركوا بعد في أي ورشة ويسكنون في شارع ينتهي بـ "pad". ورتّب هذه القائمة من الأكبر سنًا إلى الأصغر. فما الاسم الأول للشخص الذي يقع في المرتبة 7 في هذه القائمة؟

#### الحل

الجواب: Angelica. والاستعلام الممكن:

```sql
SELECT *
FROM member M LEFT OUTER JOIN participation P ON M.member_number = P.member
WHERE street LIKE '%pad' AND workshop IS NULL
ORDER BY birth_date;
```

اسرد حسب البلدية متوسط التقييم الذي منحه أهل تلك البلدية لورشة طبخ. ورتّب هذه القائمة بحيث تكون أعلى المتوسطات في الأعلى. وداخل المتوسط نفسه رتّب أبجديًا. والبلديات التي لم يمنح فيها أحد تقييمًا لا تُدرج في هذه القائمة. فأي بلدية (اسمها) في الأعلى؟

#### الحل

الجواب: Barvaux-Condrox. والاستعلام الممكن:

```sql
SELECT avg(score), municipality
FROM participation P
  INNER JOIN member M ON P.member = M.member_number
  INNER JOIN municipality G ON G.postal_code = M.postal_code
WHERE score IS NOT NULL
GROUP BY municipality
ORDER BY avg(score) DESC, municipality ASC;
```

احسب النسبة المئوية للمشاركين الذين تلقوا تقييمًا إيجابيًا. ونعني بـ"إيجابي" أن يحتوي التقييم كلمة واحدة على الأقل من الكلمات التالية: "good" أو "great" أو "fantastic". نصيحة: يمكنك كتابة استعلامين قصيرين إلى حد ما يعيد كل منهما عددًا ثم استخدام الآلة الحاسبة لحساب النسبة بنفسك. ويمكن بالطبع فعل ذلك باستعلام واحد أيضًا.

#### الحل

الجواب: 23.5%. وهناك 94 مشاركة جيدة:

```sql
SELECT COUNT(*)
FROM participation
WHERE feedback LIKE '%good%' or feedback LIKE '%great%' or feedback LIKE '%fantastic%';
```

وإجمالًا هناك 400 مشاركة:

```sql
SELECT COUNT(*)
FROM participation;
```

أنشئ قائمة بجميع المكوّنات التي تحتوي حرف "a" *مرتين بالضبط*. ولا نأخذ حالة الأحرف في الاعتبار. ورتّب حسب محتوى الطاقة المتناقص. فأي مكوّن يقع في المرتبة 21؟

#### الحل

الجواب: Low-fat cottage cheese. والاستعلام الممكن:

```sql
SELECT *
FROM ingredient
WHERE (lower(name) LIKE '%a%a%') AND NOT(lower(name) LIKE '%a%a%a%')
ORDER BY 3 DESC;
```

أنشئ نظرة عامة على جميع التسجيلات في ورش كتب المشارك فيها ملاحظات وكان تاريخ التسجيل قبل 1 يناير 2019. ورتّب هذه القائمة أبجديًا حسب الاسم. واذكر الاسم الأول والاسم الأخير للشخص المدرج في المرتبة 100.

#### الحل

الجواب: Sonya Osborne. والاستعلام:

```sql
SELECT name, first_name, member, registration_date, feedback
FROM participation P INNER JOIN member M ON P.member = M.member_number
WHERE feedback IS NOT NULL AND registration_date < '2019-01-01'
ORDER BY 1;
```

رتّب جميع الموضوعات حسب عدد التسجيلات المتناقص بحيث يكون الموضوع الذي اشترك فيه أكبر عدد من الأشخاص في الأعلى. فكم تسجيلًا حصل عليه الموضوع الذي يقع في المرتبة الخامسة في هذه القائمة؟

#### الحل

الجواب: 41

```sql
SELECT theme, COUNT(*)
FROM participation INNER JOIN cooking_workshop ON workshop = workshop_id
GROUP BY theme
ORDER BY 2 DESC;
```

## تعديل بيانات قاعدة البيانات (+ فيديو)

اندمجت بلديتا "Overpelt" و"Neerpelt" مؤخرًا. وتشكّلان معًا الآن بلدية "Pelt". ويذكر موقع بلدية Pelt: "تصبح 3900 Overpelt هي 3900 Pelt، وتصبح 3910 Neerpelt هي 3910 Pelt". وعليك، بصفتك مسؤول قاعدة البيانات للنادي، التأكد من تحديث هذه المعلومة تحديثًا صحيحًا في قاعدة البيانات. اكتب استعلامًا واحدًا يفعل ذلك. تنبيه: بما أنك تملك صلاحية `SELECT` فقط على قاعدة البيانات، فلن تستطيع اختبار الاستعلام.

#### الحل

```sql
UPDATE cooking_club.municipality
SET municipality = 'Pelt'
WHERE postal_code = '3900' OR postal_code = '3910';
```

## بالنظر إلى الاستعلام، فما كان السؤال؟ الجزء 3 (+ فيديو)

بالنظر إلى الاستعلام التالي. صِف بدقة واختصار (جملة واحدة) ما السؤال الذي يقدّم الاستعلام جوابه. وابدأ إجابتك بـ "اسرد جميع ...". وهذا التمرين أصعب مما تتوقع من النظرة الأولى.

```sql
SELECT name
FROM theme T LEFT OUTER JOIN cooking_workshop CW ON T.name = CW.theme AND max_participants > 35
WHERE theme IS null;
```

#### الحل

"يرجى سرد جميع الموضوعات (ويكفي الاسم) التي *لا* تُعالج في ورشة طبخ بطاقة استيعابية قصوى تزيد على 35 مشاركًا." وبديل: "يرجى سرد جميع الموضوعات التي لم تُعالج بعد في ورشة طبخ أو عولجت فقط في ورشة طبخ بـ 35 مشاركًا على الأكثر."

## إضافة معلومات إلى قاعدة البيانات (+ فيديو)

أعدّ Jeroen Meus مؤخرًا في برنامجه للطبخ ["dagelijkse kost"](https://dagelijksekost.vrt.be) (وبالإنجليزية: "daily food") طبق "Cheese Croquette with ham and asparagus". وبدا ذلك لذيذًا بشكل خاص. وتريد بشدة إضافة هذا الطبق إلى قاعدة البيانات. ونعطي أدناه الوصف الكامل. وعليك إضافة الأسطر المناسبة. *والمعلومات الموجودة في قاعدة البيانات بالفعل لا ينبغي إضافتها مرة أخرى*، لأن خادم قاعدة البيانات سيردّ حينئذ برسالة خطأ. وإذا كانت هناك معلومات ناقصة مطلوبة، فاخترع شيئًا مناسبًا. واحترس: بما أنك تملك صلاحية `SELECT` فقط على قاعدة البيانات، فلن تستطيع اختبار الاستعلامات.

نضيف "Cheese Croquette with ham and asparagus". ويُوصف هذا الطبق بأنه "الهليون في كروكيت، مع اللحم والجبن الفلمنكي". ويستغرق تحضير هذا الطبق ساعة. وستحتاج إلى المكوّنات التالية:

- 10 أعواد هليون (كل واحدة تقدّم طاقة 18 كيلوكالوري)
- 150 غرامًا زبدة (100 غرام زبدة تقدّم 737 كيلوكالوري)
- ليمونة واحدة (لليمونة الواحدة طاقة 35 كيلوكالوري)
- 200 غرام من اللحم (100 غرام من اللحم تقدّم 335 كيلوكالوري)
- 0.3 كيلوغرام من الجبن الفلمنكي (100 غرام تقدّم طاقة 365 كيلوكالوري)

ويندرج هذا الطبق ضمن موضوع "belgian". اكتب جميع الاستعلامات اللازمة لإضافة كل هذه المعلومات إلى قاعدة البيانات.

#### الحل

من حيث المكوّنات، لا يلزمك سوى إضافة الجبن الفلمنكي:

```sql
INSERT INTO cooking_club.ingredient VALUES ('Flandrien Cheese', 'g', 365);
```

ثم أضف الطبق الجديد:

```sql
INSERT INTO cooking_club.dish VALUES 
  ('Cheese Croquette with ham and asparagus','Asparagus in a croquette, together with ham and Flandrien cheese', 60);
```

وبعد ذلك، الجدول الوسيط بينهما:

```sql
INSERT INTO cooking_club.ingredient_in_dish VALUES ('Cheese Croquette with ham and asparagus','Asparagus',10);
INSERT INTO cooking_club.ingredient_in_dish VALUES ('Cheese Croquette with ham and asparagus','Butter',150);
INSERT INTO cooking_club.ingredient_in_dish VALUES ('Cheese Croquette with ham and asparagus','Lemon',1);
INSERT INTO cooking_club.ingredient_in_dish VALUES ('Cheese Croquette with ham and asparagus','Ham',200);
INSERT INTO cooking_club.ingredient_in_dish VALUES ('Cheese Croquette with ham and asparagus','Flandrien Cheese',300);
```

وأخيرًا اقرن الطبق بموضوع belgian:

```sql
INSERT INTO cooking_club.dish_fits_in_theme VALUES ('Cheese Croquette with ham and asparagus','belgian');
```

## استعلامات SQL، الجزء 3 (+ فيديو)

اكتب استعلام SQL الذي يولّد الملخص التالي: قائمة بجميع البلديات التي لديها ما مجموعه ثلاثة تسجيلات في ورش الطبخ. ولا نريد إلا البلديات التي يحتوي اسمها على حرف "e" الصغير ثلاث مرات على الأقل. ورتّب النتائج بترتيب أبجدي عكسي.

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-kookclub-6-3deelnames.webp)

#### الحل

بديل: التجميع حسب البلدية والرمز البريدي مسموح أيضًا، والرمز البريدي أكثر تحديدًا.

```sql
SELECT G.postal_code, COUNT(*) AS "number of participations", G.municipality
FROM municipality G
  INNER JOIN member M ON G.postal_code = M.postal_code
  INNER JOIN participation P ON M.member_number = P.member
WHERE municipality LIKE '%e%e%e%'
GROUP BY G.postal_code
HAVING COUNT(*) = 3
ORDER BY 3 DESC;
```

افترض أنك تعدّ جميع الأطباق التي موضوعها "italian" أو "BBQ" (أو كلاهما معًا). أنشئ الآن نظرة عامة لكل مكوّن يتضمن كل سطر الاسم ومقدار الطاقة (بالكيلوكالوري لكل قطعة أو 100 غرام أو 100 مليلتر...)، والوحدة التي يُعدّ بها، والكمية الإجمالية من هذا المكوّن التي تحتاجها لتحضير كل هذه الأطباق، ومقدار الطاقة بالكيلوكالوري الذي يمثله ذلك. ورتّب بحيث يكون المكوّن ذو أكبر مقدار من الكيلوكالوري في الأعلى. اكتب الاستعلام.

#### الحل

```sql
SELECT ingredient, energy, unit, sum(quantity) AS "total quantity",
  CASE
    WHEN unit = 'g' or unit = 'ml' THEN energy*sum(quantity)/100
    ELSE energy*sum(quantity)
  END AS "total energy"
FROM ingredient_in_dish IG
  INNER JOIN dish_fits_in_theme GT ON IG.dish = GT.dish
  INNER JOIN ingredient I ON I.name = IG.ingredient
WHERE theme IN ('italian','BBQ')
GROUP BY ingredient, energy, unit
ORDER BY 5 DESC;
```
