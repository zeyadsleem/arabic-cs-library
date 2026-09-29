---
title: "تمارين SQL على قاعدة بيانات نادي التنس"
lang: ar
source: https://df.webontwerp.ucll.be/EN/SQL_tennis/
---

> الخبرة ميزة كبيرة. المشكلة أنها عندما تكتسب الخبرة تكون قد شِخت جدًا لتفعل شيئًا حيالها. &mdash;Jimmy Connors

ننتقل إلى مخطط أكبر فيه خمسة جداول مترابطة. وهذا المخطط أساس كتاب "The SQL Textbook"، الطبعة السابعة، Rick van der Lans، Academic Service.

## قاعدة بيانات التنس

### النموذج الفيزيائي العلائقي

يوضح الشكل أدناه مخطط الكيانات والعلاقات (ERD) لهذا المخطط. ادرس هذا المخطط بتمعّن واقرأ التفسيرات في الأقسام التالية بعناية. وتتبع ذلك تمارين كثيرة على هذا المخطط.

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-0-tennis.webp)

### معلومات مهمة عن النادي/قاعدة البيانات

تأسّس نادي التنس في عام 1970، ومنذ البداية خُزّن عدد من السجلات الإدارية في قاعدة بيانات. وتتكوّن قاعدة البيانات هذه من الجداول التالية: players وteams وmatches وfines وboard members.

ويحتوي جدول اللاعبين على بيانات عن *اللاعبين* الأعضاء في نادي التنس، مثل الأسماء والعناوين وتواريخ الميلاد. ويجري الانضمام إلى الجمعية دائمًا في 1 يناير من سنة معينة. وبالتالي لا يمكن للاعبين أن يصبحوا أعضاء في منتصف السنة. ولا يحتوي جدول اللاعبين على بيانات تاريخية. فإذا ألغى اللاعب عضويته اختفى من الجدول. وكذلك عندما ينتقل اللاعب إلى عنوان آخر، يُستبدل العنوان القديم بالعنوان الجديد، فلا يُخزَّن العنوان القديم في أي مكان.

ولنادي التنس نوعان من الأعضاء: لاعبون ترفيهيون ولاعبون في المنافسات. والمجموعة الأولى تلعب مباريات فيما بينها فقط، فلا مباريات ضد لاعبي أندية أخرى. ولا تُسجَّل نتائج هذه المباريات المتبادلة. أما لاعبو المنافسات فيلعبون في فرق ضد لاعبي أندية أخرى. وتُتبَّع نتائج هذه المباريات. ولكل لاعب رقم فريد، سواء كان لاعب منافسات أم لا.

ويمنح الاتحاد، وهو مؤسسة وطنية، كل لاعب منافس رقمًا فريدًا. ويتكوّن رقم الاتحاد هذا عادةً من أرقام، لكنه قد يحتوي حروفًا أيضًا. وإذا لم يعد لاعب المنافسات يلعب مباريات وأصبح لاعبًا ترفيهيًا، انتهت صلاحية رقم الاتحاد. ولاحظ أن اللاعبين الترفيهيين ليس لديهم رقم اتحاد، لكن لديهم رقم لاعب.

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-1-tennisclub.webp)

ولنادي التنس عدد من *الفرق* التي تتنافس في الدوريات. ولكل فريق يُسجَّل القائد والقسم الذي يتنافس فيه الفريق حاليًا. ولا يلزم أن يكون القائد قد لعب للفريق. وقد يكون لاعب معين في وقت ما قائدًا لفريقين أو أكثر. ولا يُحتفظ في هذا الجدول بتاريخ أيضًا. فعندما يُرقَّى فريق أو يُهبط إلى قسم آخر، يُستبدل القسم المسجَّل ببساطة. وينطبق الأمر نفسه على قائد الفريق: فعند التغيير يُستبدل رقم القائد القديم.

ويتكوّن الفريق من عدد من اللاعبين. وإذا لعب فريق ضد فريق من جمعية أخرى، يلعب كل لاعب في ذلك الفريق مباراة ضد لاعب من الفريق الآخر (ونفترض للتبسيط أن المباريات التي يلعب فيها ثنائيات بعضها ضد بعض لا تحدث). والفريق الذي يفوز لاعبوه بأكبر عدد من المباريات هو الفائز.

ولا يتكوّن الفريق دائمًا من المجموعة نفسها من اللاعبين. وفي حالة المرض أو العطلات، يلزم أحيانًا بدلاء. لذا يمكن أن يكون اللاعب جزءًا من عدة فرق. وعندما نتحدث عن "لاعبي فريق"، يعني ذلك "اللاعبين الذين لعبوا مباراة واحدة على الأقل للفريق". ومرة أخرى، لا يجوز أن يلعب المباريات الرسمية إلا اللاعبون الذين لديهم رقم اتحاد.

وتتكوّن مباراة التنس من عدد من المجموعات. ومن يفوز بأكبر عدد من المجموعات هو الفائز. ولكل مباراة يُحدَّد مسبقًا عدد المجموعات التي تُحسم بها المباراة. وبشكل عام تتوقف المباراة عندما يفوز أحد اللاعبين بمجموعتين أو ثلاث. ومن ثمّ فإن النتائج النهائية الممكنة لمباراة تنس هي 2-1 أو 2-0 إذا لعبت حتى يفوز أحد اللاعبين بمجموعتين (أفضل من ثلاث)، أو 3-2 أو 3-1 أو 3-0 إذا لعبت حتى الفوز بثلاث مجموعات (أفضل من خمس). ويمكن للاعب أن يفوز بمباراته أو يخسر، ولا يمكن التعادل. ويُسجّل جدول المباريات كل لاعب لعب المباراة ولأي فريق. ويسجّل أيضًا عدد المجموعات التي فاز بها اللاعب وخسرها. ومن ذلك يمكننا استنتاج ما إذا كان قد فاز بالمباراة.

وبسبب سوء سلوك اللاعبين (التأخر أو السلوك العدواني أو عدم الحضور)، يفرض الاتحاد غرامات. ويدفع نادي التنس الغرامات. وبمجرد دفعها، يُسجَّل المبلغ والتاريخ في جدول الغرامات. وما دام اللاعب يلعب مباريات، تُحفظ جميع الغرامات في ملفه.

وعندما يترك لاعب النادي، تُدمَّر جميع بياناته في الجداول الخمسة. وإذا سحب النادي فريقًا، تُحذف جميع بيانات ذلك الفريق من جدولي الفرق والمباريات. وإذا توقف لاعب المباريات عن لعب المباريات وأصبح لاعبًا ترفيهيًا من جديد، تُحذف جميع بيانات المباريات والغرامات من الجدولين المعنيين.

ومنذ 1 يناير 1990، يتتبّع جدول عضوية المجلس من هم في المجلس. وتُميَّز أربعة مناصب: الرئيس وأمين الصندوق والأمين والعضو العام. ويُنتخب مجلس جديد كل عام في 1 يناير. وعندما يشغل لاعب منصبًا في المجلس، يُسجَّل تاريخا بداية هذا المنصب ونهايته. وإذا كان شخص ما لا يزال نشطًا، فلا يُدخل تاريخ نهاية.

### جمل CREATE

لا يلزمك بناء هذا المخطط بنفسك. *ويمكن الوصول إليه عبر اتصال التجميع، قاعدة البيانات df، المخطط "tennis_en".*

وفيما يلي نقدّم شيفرة SQL التي استخدمناها لإنشاء الجداول الخمسة. *ونتوقع أنك تفهم جميع الأسطر في هذه الشيفرة.* فقيود `CHECK` (`CONSTRAINTS`) جديدة، لكن من المفترض ألا يكون فكّ رموزها بهذه الصعوبة. ومن المهم حقًا دراسة المخطط بعناية.

```sql
CREATE  TABLE tennis_en.players (
  player_number         integer  NOT NULL ,
  name                  char(15)  NOT NULL ,
  initials              char(3)  NOT NULL ,
  birth_date            date   ,
  sex                   char(1)  NOT NULL ,
  year_of_entry         smallint  NOT NULL ,
  street                varchar(30)  NOT NULL ,
  house_number          char(4)   ,
  postal_code           char(6)   ,
  municipality          varchar(30)  NOT NULL ,
  telephone             char(13)   ,
  association_number    char(4)   ,
  CONSTRAINT players_pkey PRIMARY KEY ( player_number ) ,
  CONSTRAINT players_postal_code_check CHECK ( (postal_code LIKE '______' ) ) ,
  CONSTRAINT players_year_of_entry_check CHECK ( (year_of_entry > 1969) ) ,
  CONSTRAINT players_sex_check CHECK ( (sex IN ('M', 'F')) )
);

CREATE  TABLE tennis_en.teams (
  team_number           integer  NOT NULL ,
  player_number         integer  NOT NULL ,
  division              char(6)  NOT NULL ,
  CONSTRAINT teams_pkey PRIMARY KEY ( team_number ) ,
  CONSTRAINT teams_player_number_fkey FOREIGN KEY ( player_number ) REFERENCES tennis_en.players( player_number ) ,
  CONSTRAINT teams_division_check CHECK ( (division IN ('first', 'second')) )
);

CREATE  TABLE tennis_en.matches(
  match_number          integer  NOT NULL ,
  team_number           integer  NOT NULL ,
  player_number         integer  NOT NULL ,
  won                   smallint  NOT NULL ,
  lost                  smallint  NOT NULL ,
  CONSTRAINT matches_pkey PRIMARY KEY ( match_number ),
  CONSTRAINT matches_player_number_fkey FOREIGN KEY ( player_number ) REFERENCES
       tennis_en.players( player_number )   ,
  CONSTRAINT matches_team_number_fkey FOREIGN KEY ( team_number ) REFERENCES tennis_en.teams( team_number )  ,
  CONSTRAINT matches_lost_check CHECK ( ((lost >= 0) AND (lost <= 3)) ) ,
  CONSTRAINT matches_won_check CHECK ( ((won >= 0) AND (won <= 3)) )
);

CREATE  TABLE tennis_en.board_members(
  player_number         integer  NOT NULL ,
  start_date            date  NOT NULL ,
  end_date              date   ,
  function              char(20)   ,
  CONSTRAINT board_members_pkey PRIMARY KEY ( player_number, start_date ),
  CONSTRAINT board_members_player_number_fkey FOREIGN KEY ( player_number ) REFERENCES
      tennis_en.players( player_number ) ,
  CONSTRAINT board_members_check CHECK ( (start_date < end_date) ) ,
  CONSTRAINT board_members_start_date_check CHECK ( (start_date >= '1990-01-01'::date) )
);

CREATE  TABLE tennis_en.fines (
  payment_number        integer  NOT NULL ,
  player_number         integer  NOT NULL ,
  date                  date  NOT NULL ,
  amount                numeric(7,2)  NOT NULL ,
  CONSTRAINT fines_pkey PRIMARY KEY ( payment_number ),
  CONSTRAINT fines_player_number_fkey FOREIGN KEY ( player_number ) REFERENCES	tennis_en.players( player_number ) ,
  CONSTRAINT fines_date_check CHECK ( (date >= '1969-12-31'::date) ) ,
  CONSTRAINT fines_amount_check CHECK ( (amount > (0)::numeric) )
);
```

### بعض النقاط المثيرة للاهتمام

في مخطط الكيانات والعلاقات (وفي شيفرة `CREATE`) نريد فقط الإشارة إلى بضعة أمور:

- لاحظ أن "رقم اللاعب" له دور محوري في المخطط. فهو المفتاح الأساسي في جدول واحد، والمفتاح الأجنبي في الجداول الأربعة الأخرى.
- وجاء جدول أعضاء المجلس بمفتاح أساسي مركّب. ويمكنك رؤية ذلك في الشكل عبر رمزَي المفتاح، وفي الشيفرة يوجد عمودان في `PRIMARY KEY`.
- ومن الأخطاء الشائعة عدم أخذ حقيقة *أن رقم اللاعب في جدول الفرق هو رقم قائد ذلك الفريق* في الاعتبار. ولمعرفة من لعب المباريات فعليًا، عليك النظر في جدول *matches* واستخدام رقم اللاعب.

## تمارين بسيطة

نبدأ ببعض التمارين البسيطة المصمّمة أساسًا للتعرّف على هذا المخطط قليلًا. وكالعادة: أنجزها بنفسك ولا تنظر إلى الحل إلا بعد ذلك.

اعرض جميع اللاعبين من Zoetermeer الذين انضموا إلى النادي قبل 1984. ويجب أن تحصل على محتويات الأعمدة وترويساتها في الشكل.

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-2-oef1_4.webp)

#### الحل

```sql
SELECT player_number, name || ' ' || initials AS name, year_of_entry
FROM players
WHERE municipality = 'Zoetermeer' AND year_of_entry < 1984;
```

اسرد جميع الفرق التي رقم اللاعب 27 قائدها.

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-3-oef1_5.webp)

#### الحل

```sql
SELECT *
FROM teams
WHERE player_number = 27;
```

اسرد جميع مباريات التنس التي فُزيت.

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-4-oef1_6.webp)

#### الحل

تفوز بمباراة إذا فزت بمجموعات أكثر مما خسرت:

```sql
SELECT *
FROM matches
WHERE won > lost;
```

اسرد جميع المباريات التي لعبها اللاعب 112. ولحساب كل مباراة من هذه المباريات، احسب بكم مجموعة فاز هذا اللاعب أو خسر.

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-5-oef1_8.webp)

#### الحل

يوضح الشكل أنك تحتاج إلى إضافة عمود جديد ناتج عن حساب بسيط:

```sql
SELECT match_number, player_number, abs(won - lost) AS difference
FROM matches
WHERE player_number = 112;
```

أنشئ قائمة بجميع الغرامات المدفوعة.

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-6-oef1_9.webp)

#### الحل

```sql
SELECT *
FROM fines
```

في القائمة من التمرين السابق، أضف أيضًا اسم اللاعب (الاسم والأحرف الأولى في عمود واحد).

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-7-oef1_10.webp)

#### الحل

المعلومات التي تحتاجها موزّعة الآن على جدولين، لذا تحتاج إلى `JOIN`.

```sql
SELECT b.payment_number, b.player_number, s.name || ' ' || s.initials AS name, b.date, b.amount
FROM fines b INNER JOIN players s ON b.player_number = s.player_number;
```

أعطِ أصغر مبلغ غرامة وأكبَره.

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-8-oef1_11.webp)

#### الحل

```sql
SELECT min(amount) AS min, max(amount) AS max
FROM fines;
```

اسرد جميع أعضاء المجلس الذين يشغلون مناصبهم حاليًا. واعرض مناصبهم. وقدّم أيضًا أسماءهم (الاسم والأحرف الأولى في عمود واحد) كما في الشكل.

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-9-oef2_1.webp)

#### الحل

```sql
SELECT b.player_number, s.name || ' ' || s.initials AS name, b.start_date, b.function
FROM board_members b INNER JOIN players s ON b.player_number = s.player_number
WHERE end_date IS null;
```

أنشئ قائمة بجميع اللاعبات اللواتي *لا* يسكنّ في Leiden.

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-10-oef2_2.webp)

#### الحل

```sql
SELECT player_number, name, municipality, sex
FROM players
WHERE sex = 'F' AND municipality != 'Leiden';
```

## الغرامات

ما متوسط مبلغ الغرامة؟ وكم غرامة دُفعت بالفعل؟

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-11-oef2_3.webp)

#### الحل

```sql
SELECT round(avg(amount)) AS average, count(amount) AS "number of fines"
FROM fines;
```

اسرد جميع الغرامات الأكبر من 30 يورو. واعرض المبلغ بالسنتات الأوروبية. وقدّم أيضًا رقم اللاعب واسم اللاعب الذي تلقى الغرامة.

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-12-oef2_4.webp)

#### الحل

```sql
SELECT b.player_number, s.name, round(amount*100) AS "amount in cents"
FROM fines b INNER JOIN players s ON b.player_number = s.player_number AND amount > 30;
```

ابدأ من التمرين السابق: قائمة بجميع اللاعبين الذين تلقوا غرامة أكبر من 30 يورو. والفرق الآن أننا نريد *قائمة لاعبين* فقط لا قائمة غرامات. واللاعب الذي تلقى أكثر من غرامة (مثل Cools الذي عليه غرامة 75 يورو وغرامة 100 يورو) يجوز أن يظهر في هذه القائمة مرة واحدة فقط.

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-13-oef2_5.webp)

#### الحل

```sql
SELECT DISTINCT player_number
FROM fines
WHERE amount > 30;
```

## المباريات واللاعبون والقادة...

اسرد جميع المباريات التي فُزيت ولعبها أعضاء الفريق 2. واعرض رقم اللاعب الفائز ورقم قائد الفريق أيضًا.

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-14-oef2_6.webp)

#### الحل

```sql
SELECT w.match_number, w.player_number, w.team_number, t.player_number AS captain
FROM matches w INNER JOIN teams t ON w.team_number = t.team_number
WHERE w.team_number = 2 AND won-lost > 0;
```

أنشئ قائمة بجميع لاعبي المنافسات. فليس كل لاعبي نادينا يلعبون في دورة، لكن من يلعبون في منافسات رسمية يجب أن يكونوا أعضاء في الاتحاد الوطني (والشكل لا يُظهر القائمة الكاملة).

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-15-oef2_7.webp)

#### الحل

```sql
SELECT player_number, name
FROM players
WHERE association_number IS NOT null;
```

اعرض النظرة العامة من التمرين السابق، لكن للاعبات فقط.

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-16-oef2_8.webp)

#### الحل

```sql
SELECT player_number, name, sex
FROM players
WHERE association_number IS NOT null AND sex = 'F';
```

اعرض الاسم والأحرف الأولى والفريق والقسم لقائد كل فريق.

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-17-oef2_9.webp)

#### الحل

```sql
SELECT t.team_number,t.player_number, s.name || ' ' || s.initials AS captain, t.division
FROM teams t INNER JOIN players s ON t.player_number = s.player_number;
```

احصر القائمة السابقة في القائدات.

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-18-oef2_10.webp)

#### الحل

```sql
SELECT t.team_number,t.player_number, s.name || ' ' || s.initials AS captain, t.division
FROM teams t INNER JOIN players s ON t.player_number = s.player_number
WHERE s.sex = 'F';
```

## تمارين أصعب

اسرد رقم اللاعب واسمه وتاريخ الغرامة ومبلغها لجميع اللاعبين الذين غُرِّموا مبلغًا أكبر من 45.50 يورو ويسكنون في Rijswijk. ورتّب حسب رقم اللاعب ورقم الغرامة.

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-19-tennis_opg_1.webp)

#### الحل

```sql
SELECT players.player_number, players.name, fines.date, fines.amount
FROM players INNER JOIN fines ON players.player_number = fines.player_number
WHERE fines.amount > 45.50 AND players.municipality = 'Rijswijk'
ORDER BY players.player_number, fines.payment_number;
```

لكل مباراة، قدّم رقم المباراة والاسم الكامل لقائد الفريق الذي لعب المباراة. ورتّب نتيجتك حسب رقم المباراة تصاعديًا. نصيحة: ستضطر هنا إلى `JOIN` أكثر من جدولين.

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-20-tennis_opg_2.webp)

#### الحل

```sql
SELECT W.match_number, T.player_number, name, initials
FROM matches W INNER JOIN teams T on W.team_number = T.team_number
  INNER JOIN players S on T.player_number = S.player_number
ORDER BY 1;
```

أنشئ جدولًا تبيّن فيه لكل بلدية فيها حرف "o" واحد على الأقل (الكبير والصغير كلاهما مقبول) عدد اللاعبين الذين يسكنون في تلك البلدية. ورتّب حسب البلدية.

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-21-tennis_opg_3.webp)

#### الحل

```sql
SELECT municipality, COUNT(*) AS number
FROM players
GROUP BY municipality
HAVING LOWER(municipality) LIKE '%o%'
ORDER BY municipality;
```

أعطِ متوسط مبلغ الغرامة لكل لاعب، مقرّبًا إلى منزلتين عشريتين بعد الفاصلة العشرية. ويُعطى اللاعبون الذين ليس عليهم غرامات القيمة "no fines". ورتّب حسب اسم اللاعب.

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-22-tennis_opg_4.webp)

#### الحل

```sql
SELECT players.name,
  CASE
    WHEN AVG(fines.amount) IS NULL THEN 'no fines'
    ELSE CAST(ROUND(AVG(fines.amount), 2) AS varchar(8))
  END AS average
FROM players LEFT OUTER JOIN fines ON players.player_number = fines.player_number
GROUP BY players.player_number, players.name
ORDER BY 1;
```

أعطِ متوسط عدد المجموعات التي فُزيت وخُسرت حسب سنة الميلاد. وقرّب إلى منزلتين عشريتين في كل حالة. ورتّب حسب سنة الميلاد بحيث تكون بيانات أصغر اللاعبين في الأعلى.

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-23-tennis_opg_5.webp)

#### الحل

```sql
SELECT EXTRACT(YEAR FROM birth_date) AS birthyear, ROUND(AVG(won),2) AS won,
  ROUND(AVG(lost),2) AS lost
FROM matches W INNER JOIN players S ON W.player_number = S.player_number
GROUP BY EXTRACT(YEAR FROM birth_date)
ORDER BY birthyear DESC;
```

تمرين صعب... أعطِ لجميع أعضاء المجلس النشطين *بدون غرامة* آخر مباراة لعبوها (المباراة ذات الرقم الأكبر). ورتّب تنازليًا حسب رقم اللاعب.

![](https://df.webontwerp.ucll.be/images/database-foundations/sql-tennis-24-tennis_opg_6.webp)

#### الحل

```sql
SELECT board_members.player_number, MAX(matches.match_number) AS final_match
FROM board_members
  INNER JOIN matches ON board_members.player_number = matches.player_number AND
        board_members.end_date IS NULL
  LEFT OUTER JOIN fines ON board_members.player_number = fines.player_number
WHERE fines.player_number IS NULL
GROUP BY board_members.player_number
ORDER BY player_number DESC;
```
