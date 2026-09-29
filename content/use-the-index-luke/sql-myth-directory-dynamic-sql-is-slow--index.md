---
title: "SQL الديناميكي بطيء"
lang: ar
source: https://use-the-index-luke.com/sql/myth-directory/dynamic-sql-is-slow
---

جوهر خرافة «*SQL الديناميكي بطيء*» بسيط إلى حد ما: يمكن أن يكون SQL الديناميكي بطيئاً — عند استخدامه استخداماً خاطئاً.

والمشكلة أن SQL الديناميكي كثيراً ما يُستخدم لسبب خاطئ، وأحياناً حتى دون علم. ولتوضيح الالتباس، سأستخدم المصطلحات التالية كما هي مشروحة:

SQL المضمّن (Embedded SQL)

يعد تضمين SQL مباشرةً في الشيفرة المصدرية للبرنامج شائعاً جداً في لغات قواعد البيانات الإجرائية مثل Oracle PL/SQL أو Microsoft Transact-SQL، ويمكن أيضاً تضمين SQL في لغات أخرى مثل C.

وتكمن فائدة SQL المضمّن في تكامله السلس مع لغة البرمجة المعنية. غير أن SQL المضمّن يُترجم إلى البرنامج، فلا يمكن تغييره في زمن التشغيل — إنه ساكن.

SQL الديناميكي (Dynamic SQL)

يُتعامل مع SQL الديناميكي كسلسلة نصية داخل التطبيق، ويمكن للتطبيق تغيير سلسلة SQL في زمن التشغيل قبل تمريرها إلى طبقة قاعدة البيانات. وهو في الواقع الطريقة الأكثر شيوعاً للوصول إلى قواعد البيانات.

SQL الساكن (Static SQL)

أستخدم مصطلح *SQL الساكن* لوصف عبارات SQL التي لا تتغير في زمن التشغيل، سواء كانت SQL مضمّناً لا يمكن تغييره في زمن التشغيل، أو SQL ديناميكياً يمكن تغييره لكنه لا يُغيَّر.

وجوهر هذه التعريفات أن العبارة يمكن أن تكون SQL ديناميكياً وساكناً في الوقت نفسه. وبعبارة أخرى، توجد مستويات مختلفة من SQL الديناميكي. تأمّل المثال التالي:

```
String sql = "SELECT first_name, last_name"
           + "  FROM employees"
           + " WHERE employee_id = " + employeeId;

ResultSet rs = con.executeQuery(sql);
```

هل هذا SQL ديناميكي؟ بحسب التعريف أعلاه، نعم؛ فعبارة SQL تُحضَّر كسلسلة نصية وتُمرَّر إلى طبقة قاعدة البيانات. لكن هل هو SQL ساكن أيضاً؟ بافتراض أن قيمة المتغير `employeeId` تتغير، فهو ليس SQL ساكناً لأن سلسلة SQL تتغير في زمن التشغيل. وهو مثال على SQL ديناميكي سيضرّ بالأداء فعلاً. والمشكلة ليست أنه SQL ديناميكي بل أنه لا يستخدم [وسائط ربط](/book/use-the-index-luke/sql-where-clause-bind-parameters/index). ووسائط الربط في SQL — مثل علامة الاستفهام `?` أو `:name` — عناصر نائبة عن قيم تتغير أثناء التنفيذ. ويعني ذلك أن المثال يمكن تحويله إلى SQL ساكن باستخدام وسيط ربط بدلاً من القيمة الفعلية للمتغير `employeeId`.

#### مهم

عدم استخدام [وسائط الربط](/book/use-the-index-luke/sql-where-clause-bind-parameters/index) هو SQL ديناميكي مساء استخدامه.

ووسائط الربط مهمة جداً للأمان والأداء.

ومن الاستخدامات المعقولة لـSQL الديناميكي تغيير *بنية* العبارة في زمن التشغيل، وهو أمر [لا يمكن تحقيقه بوسائط الربط](/book/use-the-index-luke/sql-where-clause-bind-parameters/index#note-bind-not-dynamic-sql)؛ مثل جملة `where` شرطية:

```
String where = "";
if (subsidiaryId != null) {
   where += (where == "") ? " WHERE " : " AND " 
         +  "subsidiary_id = " + subsidiaryId;
}
if (employeeId != null) {
   where += (where == "") ? " WHERE " : " AND " 
         +  "employee_id = " + employeeId;
}
if (lastName != null) {
   where += (where == "") ? " WHERE " : " AND " 
         +  "UPPER(last_name) = '"+lastName.toUpperCase()+"'";
}
String SQL = "SELECT employee_id, first_name, last_name "
           + "  FROM employees" 
           +   where;
// execute SQL
```

تبني الشيفرة عبارة SQL لجلب الموظفين بناءً على أي توليفة من معايير ترشيح ثلاثة. ومع أنها غير أنيقة إلى حد ما، يمكن تنفيذ SQL المبني باستخدام أفضل فهرس متاح. ومع ذلك، هذا النهج مزعج بسبب [ثغرة حقن SQL](https://en.wikipedia.org/wiki/SQL_injection#Forms_of_vulnerability) المحتملة وبسبب كلفة التحسين المرتفعة: إذ يجب على قاعدة البيانات إعادة إنشاء خطة التنفيذ في كل مرة، لأن قيم البحث — التي قد تختلف في كل مرة — تمنع التخزين المؤقت. ويشرح [*الاستعلامات ذات الوسائط*](/book/use-the-index-luke/sql-where-clause-bind-parameters/index) كلفة التحسين بالتفصيل. ومرة أخرى، ليست المشكلة في SQL الديناميكي نفسه بل في عدم استخدام وسائط الربط.

#### إن أعجبك هذا الموضوع، قد يعجبك أيضاً…

… أن [تشترك في **القوائم البريدية**](https://winand.at/lists)، و[تحصل على **ملصقات مجانية**](https://use-the-index-luke.com/shop)، و[تشتري **كتابي**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=myth-dynamic-sql&utm_medium=web)، أو [تنضم إلى **دورة تدريبية**](https://winand.at/sql-training/open-online-class).

حُذف مثال يبني جملة `where` ديناميكياً ويستخدم وسائط الربط لأنه أعقد من المثال أعلاه. غير أن معظم أطر ORM تقدّم طريقة مريحة بما يكفي لإنشاء SQL ديناميكياً باستخدام وسائط الربط. وتعرض النظرة العامة التالية بعض الأمثلة:

Java

يوضح المثال التالي أصناف [Criteria](https://docs.hibernate.org/orm/6.2/userguide/html_single/#criteria) في Hibernate:

```
Criteria criteria = session.createCriteria(Employees.class);

if (subsidiaryId != null) {
  criteria.add(Restrictions.eq("subsidiaryId", subsidiaryId));
}
if (employeeId != null) {
  criteria.add(Restrictions.eq("employeeId", employeeId));
}
if (lastName != null) {
  criteria.add(
    Restrictions.eq("lastName", lastName).ignoreCase()
  );
}
```

عند تمرير `LAST_NAME` فقط، يولّد Hibernate عبارة SQL التالية (Oracle):

```sql
select this_.subsidiary_id as subsidiary1_0_0_,
       [... other columns ...]
  from employees this_
 where lower(this_.last_name)=?
```

لاحظ أنه يُستخدم وسيط ربط ودالة `LOWER` لتنفيذ وظيفة [ignoreCase()](https://docs.hibernate.org/core/3.6/javadocs/org/hibernate/criterion/SimpleExpression.html#ignoreCase%28%29). وينطبق الأمر نفسه على [قيد ilike](https://docs.hibernate.org/orm/current/userguide/html_single/#hql-like-predicate). وهذه حقيقة مهمة جداً لـ[الفهرسة القائمة على الدوال](/book/use-the-index-luke/sql-where-clause-functions-case-insensitive-search/index).

وللواجهة Java Persistence API (JPA) وظيفة مشابهة:

لكنها أقل مباشرة، ولا تدعم بحثاً أصلياً غير حسّاس لحالة الأحرف، وهذا أمر جيد على الأرجح:

```
List<Predicate> predicates = new ArrayList<Predicate>();

if (lastName != null) {
   predicates.add(queryBuilder.equal(
         queryBuilder.upper(r.get(Employees_.lastName))
       , lastName.toUpperCase())
   );
}
if (employeeId != null) {
   predicates.add(queryBuilder.equal(
         r.get(Employees_.employeeId)
       , employeeId)
   );
}
if (subsidiaryId != null) {
   predicates.add(queryBuilder.equal(
         r.get(Employees_.subsidiaryId)
       , subsidiaryId)
   );
}

query.where(predicates.toArray(new Predicate[0]));
```

ترى أن المثال أقل مباشرة لصالح أمان الأنواع في زمن الترجمة. ومن الفروق الأخرى أن JPA لا تدعم معاملات أصلية غير حسّاسة لحالة الأحرف، فالتحويل الصريح لحالة الأحرف لازم. وربما يكون ذلك جيداً للوعي بذلك والتحكم فيه. وكملاحظة جانبية: واجهة Hibernate الأصلية تدعم التحويل الصريح لحالة الأحرف أيضاً.

Perl

يوضح المثال التالي إطار [DBIx::Class](https://metacpan.org/dist/DBIx-Class) في Perl:

```
my @search = ();

if (defined $employee_id) {
   push @search, {employee_id => $employee_id};
}
if (defined $subsidiary_id) {
   push @search, {subsidiary_id => $subsidiary_id};
}
if (defined $last_name) {
   push @search, {'UPPER(last_name)' => uc($last_name)};
}

my @employees = $schema->resultset('Employees')
              ->search({-and => \@search});
```

```sql
SELECT me.employee_id, me.subsidiary_id,
       me.last_name,   me.first_name,
       me.date_of_birth
  FROM employees me
 WHERE ( UPPER(last_name) = :p1 )
```

PHP

يوضح المثال التالي إطار [Doctrine](https://www.doctrine-project.org/) في PHP:

```
$filter = $qb->expr()->andx();

if (isset($employee_id)) {
   $filter->add(
       $qb->expr()->eq('e.employee_id', ':employee_id'));
   $qb->setParameter('employee_id', $employee_id);
}
if (isset($subsidiary_id)) {
   $filter->add(
       $qb->expr()->eq('e.subsidiary_id', ':subsidiary_id'));
   $qb->setParameter('subsidiary_id', $subsidiary_id);
}
if (isset($last_name)) {
   $filter->add($qb->expr()->eq(
       $qb->expr()->upper('e.last_name'), ':last_name'));
   $qb->setParameter('last_name', strtoupper($last_name));
}

if ($filter->count() > 0) {
   $qb->where($filter);
}
```

يولّد Doctrine عبارة SQL التالية للبحث باسم العائلة (MySQL):

```sql
SELECT e0_.employee_id AS employee_id0, 
       [... other columns ...]
  FROM employees e0_
 WHERE UPPER(e0_.last_name) = ?
```

#### نصيحة

نزّل [الشيفرة النموذجية الكاملة](https://use-the-index-luke.com/samples/use-the-index-luke-samples.zip) وجرّب بنفسك.

يتيح استخدام SQL الديناميكي مع وسائط الربط للمُحسِّن اختيار أفضل خطة تنفيذ للتوليفة المعنية من جمل `where`، ما يحقق أداءً أفضل من إنشاءات مثل تلك الموصوفة في [*المنطق الذكي*](/book/use-the-index-luke/sql-where-clause-obfuscation-smart-logic/index):

```sql
SELECT first_name, last_name
  FROM employees
 WHERE (     employee_id = ? OR ? IS NULL)
   AND (   subsidiary_id = ? OR ? IS NULL)
   AND (UPPER(last_name) = ? OR ? IS NULL)
```

والسبب في ملاحظة أن SQL الديناميكي بطيء هو في الغالب عدم استخدام وسائط الربط — أي استخدام SQL الديناميكي لسبب خاطئ.

غير أن هناك بعض الحالات — أراها نادرة — يمكن أن يكون فيها SQL الديناميكي أبطأ من «المنطق الذكي» كما في المثال أعلاه؛ وذلك عندما تُنفَّذ عبارات SQL رخيصة (سريعة) جداً بتكرار عالٍ جداً. لكن أولاً، هناك مصطلحان آخران يجب شرحهما:

التحليل الصلب (Hard Parsing)

التحليل الصلب هو بناء خطة تنفيذ انطلاقاً من عبارة SQL؛ وهو جهد كبير: فحص جميع أجزاء SQL، والنظر في جميع الفهارس، والنظر في جميع ترتيبات الربط، وهكذا. والتحليل الصلب مستهلك للموارد بشدة.

التحليل اللين (Soft Parsing)

التحليل اللين هو البحث عن خطة تنفيذ مخزنة مؤقتاً والعثور عليها واستخدامها؛ وتُجرى بعض الفحوصات الطفيفة، مثل حقوق الوصول، لكن يمكن إعادة استخدام خطة التنفيذ كما هي. وهذه عملية سريعة إلى حد ما.

ومفتاح الذاكرة المؤقتة هو أساساً سلسلة SQL الحرفية — وعادةً تجزئتها (hash). وإذا لم يوجد تطابق تام، يُشغَّل تحليل صلب. ولهذا تؤدي القيم الحرفية المضمّنة — خلافاً لوسائط الربط — إلى تحليل صلب ما لم تُستخدم قيم البحث نفسها مرة أخرى. وحتى في تلك الحالة، هناك احتمالات جيدة أن تكون خطة التنفيذ السابقة قد انتهت صلاحيتها في الذاكرة المؤقتة لأن خططاً جديدة ترد باستمرار.

ومع ذلك، توجد طريقة لتنفيذ عبارة دون أي تحليل إطلاقاً — ولا حتى تحليل لين. والحيلة هي إبقاء العبارة المحلَّلة مفتوحة، كما في شيفرة Java الزائفة التالية:

```
PreparedStatement pSQL = con.prepareStatement("select ...");
for (String last_name:last_names) {
    pSQL.setString(1, last_name.toUpperCase());
    ResultSet rs = pSQL.executeQuery();
    // process result
}
pSQL.close();
```

لاحظ أن `PreparedStatement` يُفتح ويُغلق مرة واحدة فقط — ومع ذلك يمكن تنفيذه مرات كثيرة. ويعني ذلك وجود عملية تحليل واحدة فقط — أثناء التحضير — ولا شيء داخل الحلقة.

والمزلق أن تحويل العبارة إلى SQL ديناميكي ينقل استدعاء `prepareStatement` إلى داخل الحلقة، فيسبّب تحليلاً ليناً في كل تنفيذ. وقد تتجاوز كلفة التحليل، التي قد تشمل أيضاً زمن استجابة الشبكة، التوفير الناتج عن خطة تنفيذ أفضل عندما تُنفَّذ العبارة كثيراً وتكون سريعة على أي حال. ويصحّ ذلك بوجه خاص إذا لم تختلف خطة التنفيذ الفعلية باختلاف جمل `where` — مثلاً لوجود جملة `where` مفهرسة جيداً دائماً.

ومع أن حيلة «التحضير قبل الحلقة» نادراً ما تُستخدم صراحةً، فهي شائعة جداً في الإجراءات المخزنة — لكنها ضمنية. فاللغات مثل PL/SQL — مع SQL الساكن الحقيقي — تحضّر SQL عند ترجمة الإجراء أو مرة واحدة لكل تنفيذ على الأكثر. وتحويل ذلك إلى SQL ديناميكي قد يقتل الأداء بسهولة.

#### نصيحة

- [الاستخدام الصحيح لوسائط الربط](/book/use-the-index-luke/sql-where-clause-bind-parameters/index)
- مقال: «[التخطيط لإعادة الاستخدام](/book/use-the-index-luke/sql-where-clause-searching-for-ranges-greater-less-between-tuning-sql-access-filter-predicates/index)» حول تخزين خطط التنفيذ مؤقتاً
- [تجنّب المنطق الذكي لجمل `where` الشرطية](/book/use-the-index-luke/sql-where-clause-obfuscation-smart-logic/index)
