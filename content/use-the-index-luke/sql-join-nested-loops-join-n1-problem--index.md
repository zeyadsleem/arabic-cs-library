---
title: "الحلقات المتداخلة"
lang: ar
source: https://use-the-index-luke.com/sql/join/nested-loops-join-n1-problem
---

الربط بالحلقات المتداخلة هو خوارزمية الربط الأساسية الأكثر جوهرية. وهو يعمل كاستخدام استعلامين متداخلين: الاستعلام الخارجي أو القائد لجلب النتائج من جدول، واستعلام ثانٍ *مقابل كل صف* من الاستعلام القائد لجلب البيانات المقابلة من الجدول الآخر.

ويمكنك فعلاً استخدام «الاستعلامات المتداخلة» لتنفيذ خوارزمية الحلقات المتداخلة بنفسك. غير أن ذلك نهج مزعج لأن أزمنة استجابة الشبكة تُضاف فوق أزمنة استجابة القرص — ما يجعل زمن الاستجابة الكلي أسوأ. ومع ذلك تبقى «الاستعلامات المتداخلة» شائعة جداً لأنه يسهل تنفيذها دون إدراك ذلك. وتكون أدوات الربط الكائني-العلائقي (ORM) «متعاونة» في هذا الصدد إلى حد أن ما يسمى *مشكلة الاستعلامات N+1* نالت شهرة سيئة في هذا المجال.

#### إن أعجبك هذا الموضوع، قد يعجبك أيضاً…

… أن [تشترك في **القوائم البريدية**](https://winand.at/lists)، و[تحصل على **ملصقات مجانية**](https://use-the-index-luke.com/shop)، و[تشتري **كتابي**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-nested-loops&utm_medium=web)، أو [تنضم إلى **دورة تدريبية**](https://winand.at/sql-training/open-online-class).

تعرض الأمثلة التالية عمليات الربط هذه «بالاستعلامات المتداخلة العَرَضية» الناتجة عن أدوات ORM مختلفة. وتبحث الأمثلة عن موظفين يبدأ اسم عائلتهم بـ`'WIN'` وتجلب جميع `SALES` لهؤلاء الموظفين.

Javaيستخدم مثال JPA واجهة [CriteriaBuilder](https://docs.oracle.com/javaee/6/api/javax/persistence/criteria/CriteriaBuilder.html).

```
CriteriaBuilder queryBuilder = em.getCriteriaBuilder();
CriteriaQuery<Employees>
   query = queryBuilder.createQuery(Employees.class);
Root<Employees> r = query.from(Employees.class); 
query.where(
  queryBuilder.like(
    queryBuilder.upper(r.get(Employees_.lastName)),
    "WIN%"
  )
);

List<Employees> emp = em.createQuery(query).getResultList();

for (Employees e: emp) {
  // process Employee
  for (Sales s: e.getSales()) {
    // process sale for Employee
  }
}
```

ويولّد Hibernate JPA 3.6.0 استعلامات `select` بعدد N+1:

```sql
select employees0_.subsidiary_id as subsidiary1_0_
       -- MORE COLUMNS
  from employees employees0_ 
 where upper(employees0_.last_name) like ?
```

```sql
  select sales0_.subsidiary_id as subsidiary4_0_1_
         -- MORE COLUMNS
    from sales sales0_
   where sales0_.subsidiary_id=? 
     and sales0_.employee_id=?
```

```sql
  select sales0_.subsidiary_id as subsidiary4_0_1_
         -- MORE COLUMNS
    from sales sales0_
   where sales0_.subsidiary_id=? 
     and sales0_.employee_id=?
```

Perl

يوضح المثال التالي إطار [DBIx::Class](https://metacpan.org/dist/DBIx-Class) في Perl:

```javascript
my @employees = 
   $schema->resultset('Employees')
          ->search({'UPPER(last_name)' => {-like=>'WIN%'}});

foreach my $employee (@employees) {
   # process Employee
   foreach my $sale ($employee->sales) {
      # process Sale for Employee
   }
}
```

ويولّد DBIx::Class 0.08192 استعلامات `select` بعدد N+1:

```sql
SELECT me.employee_id, me.subsidiary_id
     , me.last_name, me.first_name, me.date_of_birth 
  FROM employees me 
 WHERE ( UPPER(last_name) LIKE ? )
```

```sql
   SELECT me.sale_id, me.employee_id, me.subsidiary_id
        , me.sale_date, me.eur_value
     FROM sales me
    WHERE ( ( me.employee_id = ? 
      AND me.subsidiary_id = ? ) )
```

```sql
   SELECT me.sale_id, me.employee_id, me.subsidiary_id
        , me.sale_date, me.eur_value
     FROM sales me
    WHERE ( ( me.employee_id = ? 
      AND me.subsidiary_id = ? ) )
```

PHP

يستخدم مثال [Doctrine](https://www.doctrine-project.org/) واجهة باني الاستعلامات:

```
$qb = $em->createQueryBuilder();
$qb->select('e')
   ->from('Employees', 'e')
   ->where("upper(e.last_name) like :last_name")
   ->setParameter('last_name', 'WIN%');
$r = $qb->getQuery()->getResult();
foreach ($r as $row) {
   // process Employee
   foreach ($row->getSales() as $sale) {
      // process Sale for Employee
   }
}
```

ويولّد Doctrine 2.0.5 استعلامات `select` بعدد N+1:

```sql
SELECT e0_.employee_id AS employee_id0 -- MORE COLUMNS
  FROM employees e0_
 WHERE UPPER(e0_.last_name) LIKE ?
```

```sql
   SELECT t0.sale_id AS SALE_ID1 -- MORE COLUMNS
     FROM sales t0 
    WHERE t0.subsidiary_id = ? 
      AND t0.employee_id = ?
```

```sql
   SELECT t0.sale_id AS SALE_ID1 -- MORE COLUMNS
     FROM sales t0 
    WHERE t0.subsidiary_id = ? 
      AND t0.employee_id = ?
```

لا تولّد أدوات ORM عمليات ربط SQL — بل تستعلم من جدول `SALES` باستعلامات متداخلة. ويُعرف هذا الأثر بـ«مشكلة الاستعلامات N+1» أو باختصار «مشكلة N+1»، لأنها تنفّذ N+1 استعلاماً في المجموع إذا أعاد الاستعلام القائد N صفاً.

#### تفعيل تسجيل SQL

فعّل تسجيل SQL أثناء التطوير وراجع عبارات SQL المولَّدة.

[DBIx::Class](https://metacpan.org/release/RIBASUSHI/DBIx-Class-0.082840/view/lib/DBIx/Class/Manual/FAQ.pod#misc)

`export DBIC_TRACE=1` في صدفة الأوامر لديك.

[Doctrine](https://www.doctrine-project.org/projects/doctrine-orm/en/latest/reference/advanced-configuration.html#sql-logger-optional)

على مستوى الشيفرة المصدرية فقط — ولا تنسَ تعطيل ذلك في بيئة الإنتاج. وفكّر في بناء مسجّل خاص بك قابل للضبط.

```
$logger = new \Doctrine\DBAL\Logging\EchoSqlLogger;
$config->setSQLLogger($logger);
```

Hibernate (الأصلي)

`true` في `[App.config](https://nhibernate.info/doc/howto/various/configure-log4net-for-use-with-nhibernate)` أو `hibernate.cfg.xml`

JPA

في `persistence.xml` لكن حسب مزوّد JPA — مثلاً لـ[eclipselink](https://wiki.eclipse.org/EclipseLink/Examples/JPA/Logging) و[Hibernate](https://docs.hibernate.org/orm/current/userguide/html_single/#_sql_statement_logging) و[OpenJPA](https://openjpa.apache.org/builds/3.2.2/apache-openjpa/docs/#ref_guide_logging):

```
<property name="eclipselink.logging.level" value="FINE"/>
<property name="hibernate.show_sql" value="TRUE"/>
<property name="openjpa.Log" value="SQL=TRACE"/>
```

وتقدّم معظم أدوات ORM طريقة برمجية لتفعيل تسجيل SQL أيضاً، لكن ذلك ينطوي على خطر نشر الإعداد في الإنتاج عن غير قصد.

ومع أن نهج «الاستعلامات المتداخلة» نمط مضاد، فإنه لا يزال يشرح ربط *الحلقات المتداخلة* شرحاً جيداً؛ فقاعدة البيانات تنفّذ الربط كما تفعله أدوات ORM أعلاه تماماً. ولذلك فإن الفهرسة من أجل ربط الحلقات المتداخلة تشبه الفهرسة من أجل عبارات `select` المعروضة أعلاه؛ أي [فهرس قائم على الدوال](/book/use-the-index-luke/sql-where-clause-functions/index) على جدول `EMPLOYEES` و[فهرس مُدمج](/book/use-the-index-luke/sql-where-clause-the-equals-operator-concatenated-keys/index) لمُسندات الربط على جدول `SALES`:

```sql
CREATE INDEX emp_up_name ON employees (UPPER(last_name))
```

```sql
CREATE INDEX sales_emp ON sales (subsidiary_id, employee_id)
```

وربط SQL لا يزال أكفأ من نهج الاستعلامات المتداخلة — حتى لو نفّذ عمليات البحث نفسها في الفهرس — لأنه يتجنّب كثيراً من اتصالات الشبكة. بل يصبح أسرع إذا كانت كمية البيانات المنقولة أكبر بسبب تكرار خصائص الموظف في كل عملية بيع. والسبب بعدا الأداء: [زمن الاستجابة والإنتاجية](/book/use-the-index-luke/sql-testing-scalability-response-time-throughput-scaling-horizontal/index)؛ ونسميهما في شبكات الحواسيب *زمن الاستجابة* و*عرض النطاق*. ولعرض النطاق أثر ضئيل في زمن الاستجابة، أما أزمنة الاستجابة فأثرها هائل. ويعني ذلك أن عدد رحلات الذهاب والإياب إلى قاعدة البيانات أهم لزمن الاستجابة من كمية البيانات المنقولة.

#### نصيحة

نفّذ عمليات الربط في قاعدة البيانات.

تقدّم معظم أدوات ORM طريقة ما لإنشاء عمليات ربط SQL. ونمط *الجلب الحريص (eager fetching)* هو الأهم على الأرجح، ويُضبط عادةً على مستوى الخصائص في تعيينات الكيانات — مثلاً لخاصية `employees` في الصنف `Sales`. وسيربط ORM حينها جدول `EMPLOYEES` دائماً عند الوصول إلى جدول `SALES`. ولا يكون ضبط الجلب الحريص في تعيينات الكيانات منطقياً إلا إذا كنت تحتاج تفاصيل الموظف مع بيانات المبيعات دائماً.

والجلب الحريص ضار إذا لم تكن تحتاج السجلات الابنة في كل مرة تصل فيها إلى الكائن الأب. وفي تطبيق دليل هاتف مثلاً، لا معنى لتحميل سجلات `SALES` عند عرض تفاصيل الموظف؛ وقد تحتاج بيانات المبيعات المرتبطة في حالات أخرى — لكن ليس دائماً. والضبط الساكن ليس حلاً.

وللأداء الأمثل، تحتاج إلى تحكم كامل في عمليات الربط. وتعرض الأمثلة التالية كيفية الحصول على أقصى مرونة بالتحكم في سلوك الربط في زمن التشغيل.

Javaتوفّر واجهة JPA ‏[`CriteriaBuilder`](https://docs.oracle.com/javaee/6/api/javax/persistence/criteria/CriteriaBuilder.html) الدالة `Root<>.fetch()` للتحكم في عمليات الربط، وتتيح تحديد متى وكيف تُربط الكائنات المشار إليها بالاستعلام الرئيسي. وفي هذا المثال نستخدم ربطاً أيسر لاسترجاع جميع الموظفين حتى لو لم يكن لبعضهم مبيعات.

#### تحذير

يعيد JPA وHibernate الموظفين *مقابل كل عملية بيع.*

ويعني ذلك أن موظفاً له 30 عملية بيع سيظهر 30 مرة. ومع أن ذلك مزعج جداً، فهو السلوك المحدد في ([EJB 3.0 persistency، الفقرة 4.4.5.3 «Fetch Joins»](https://download.oracle.com/otndocs/jcp/ejb-3_0-fr-eval-oth-JSpec/)). ويمكنك إما إزالة تكرار علاقة الأب يدوياً، مثلاً باستخدام [`LinkedHashSet`](https://developer.jboss.org/docs/DOC-15782#jive_content_id_Hibernate_does_not_return_distinct_results_for_a_query_with_outer_join_fetching_enabled_for_a_collection_even_if_I_use_the_distinct_keyword)، وإما استخدام الدالة `distinct()` كما في المثال.

```
CriteriaBuilder qb = em.getCriteriaBuilder();
CriteriaQuery<Employees> q = qb.createQuery(Employees.class);
Root<Employees> r = q.from(Employees.class); 
q.where(queryBuilder.like(
    queryBuilder.upper(r.get(Employees_.lastName)),
    "WIN%")
);

r.fetch("sales", JoinType.LEFT);
// needed to avoid duplication of Employee records
q.distinct(true);

List<Employees> emp = em.createQuery(q).getResultList();
```

ويولّد Hibernate 3.6.0 عبارة SQL التالية:

```sql
select distinct 
       employees0_.subsidiary_id as subsidiary1_0_0_
     , employees0_.employee_id as employee2_0_0_
       -- MORE COLUMNS
     , sales1_.sale_id as sale1_0__
  from employees employees0_
  left outer join sales sales1_ 
          on employees0_.subsidiary_id=sales1_.subsidiary_id
         and employees0_.employee_id=sales1_.employee_id 
 where upper(employees0_.last_name) like ?
```

يحتوي الاستعلام على الربط الأيسر المتوقع، لكنه يحتوي أيضاً على الكلمة المفتاحية `distinct` غير الضرورية. وللأسف لا يوفر JPA استدعاءات API منفصلة لترشيح مدخلات الأب المكرّرة دون إزالة تكرار السجلات الابنة أيضاً. والكلمة المفتاحية `distinct` في استعلام SQL مثيرة للقلق لأن معظم قواعد البيانات سترشّح السجلات المكرّرة فعلاً؛ وقليل من قواعد البيانات فقط تدرك أن المفاتيح الأساسية تضمن الفرادة في هذه الحالة على أي حال.

وتحل واجهة Hibernate الأصلية المشكلة من جهة العميل باستخدام محوّل مجموعة النتائج:

```
Criteria c = session.createCriteria(Employees.class);
c.add(Restrictions.ilike("lastName", 'Win%'));

c.setFetchMode("sales", FetchMode.JOIN);
c.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);

List<Employees> result = c.list();
```

وهو يولّد الاستعلام التالي:

```sql
select this_.subsidiary_id as subsidiary1_0_1_
     , this_.employee_id as employee2_0_1_
       -- MORE this_ columns on employees
     , sales2_.sale_id as sale1_3_
       -- MORE sales2_ columns on sales
  from employees this_ 
  left outer join sales sales2_ 
          on this_.subsidiary_id=sales2_.subsidiary_id 
         and this_.employee_id=sales2_.employee_id 
 where lower(this_.last_name) like ?
```

تنتج هذه الطريقة SQL مباشراً دون جمل غير مقصودة. لاحظ أن Hibernate يستخدم `lower()` للاستعلامات غير الحسّاسة لحالة الأحرف — وهي تفصيلة مهمة لـ[الفهرسة القائمة على الدوال](/book/use-the-index-luke/sql-where-clause-functions/index).

Perl

يستخدم المثال التالي إطار [DBIx::Class](https://metacpan.org/dist/DBIx-Class) في Perl:

```
my @employees = 
   $schema->resultset('Employees')
          ->search({ 'UPPER(last_name)' => {-like => 'WIN%'}
                   , {prefetch => ['sales']}
                   });
```

ويولّد DBIx::Class 0.08192 عبارة SQL التالية:

```sql
SELECT me.employee_id, me.subsidiary_id, me.last_name
       -- MORE COLUMNS
  FROM employees me 
  LEFT JOIN sales sales 
         ON (sales.employee_id   = me.employee_id 
        AND  sales.subsidiary_id = me.subsidiary_id) 
 WHERE ( UPPER(last_name) LIKE ? )
 ORDER BY sales.employee_id, sales.subsidiary_id
```

لاحظ جملة `order by` — فالتطبيق لم يطلبها. ويجب على قاعدة البيانات فرز مجموعة النتائج وفقها، وقد يستغرق ذلك وقتاً.

PHP

يستخدم المثال التالي إطار [Doctrine](https://www.doctrine-project.org/) في PHP:

```
$qb = $em->createQueryBuilder();
$qb->select('e,s')
   ->from('Employees', 'e')
   ->leftJoin('e.sales', 's')
   ->where("upper(e.last_name) like :last_name")
   ->setParameter('last_name', 'WIN%');
$r = $qb->getQuery()->getResult();
```

ويولّد Doctrine 2.0.5 عبارة SQL التالية:

```sql
SELECT e0_.employee_id AS employee_id0
       -- MORE COLUMNS
  FROM employees e0_ 
  LEFT JOIN sales s1_ 
         ON e0_.subsidiary_id = s1_.subsidiary_id 
        AND e0_.employee_id = s1_.employee_id 
 WHERE UPPER(e0_.last_name) LIKE ?
```

وتُظهر خطة التنفيذ عملية `NESTED LOOPS OUTER`:

Db2 (LUW)

```
Explain Plan
---------------------------------------------------------------
ID | Operation               |                     Rows |  Cost
 1 | RETURN                  |                          | 10501
 2 |  NLJOIN (LEFT)          |               5745 of 57 | 10501
 3 |   FETCH EMPLOYEES       |       57 of 57 (100.00%) |    49
 4 |    RIDSCN               |       57 of 57 (100.00%) |     6
 5 |     SORT (UNIQUE)       |       57 of 57 (100.00%) |     6
 6 |      IXSCAN EMP_NAME    |    57 of 10000 (   .57%) |     6
 7 |   FETCH SALES           |     101 of 101 (100.00%) |   183
 8 |    IXSCAN SALES_SUB_EMP | 101 of 1011118 (   .01%) |    13

Predicate Information
 2 - JOIN (Q2.EMPLOYEE_ID = Q3.EMPLOYEE_ID)
     JOIN (Q2.SUBSIDIARY_ID = Q3.SUBSIDIARY_ID)
 3 - SARG (Q1.LAST_NAME LIKE ?)
 6 - START ($INTERNAL_FUNC$() <= Q1.LAST_NAME)
      STOP (Q1.LAST_NAME <= $INTERNAL_FUNC$())
      SARG (Q1.LAST_NAME LIKE ?)
 8 - START (Q2.SUBSIDIARY_ID = Q3.SUBSIDIARY_ID)
     START (Q2.EMPLOYEE_ID = Q3.EMPLOYEE_ID)
      STOP (Q2.SUBSIDIARY_ID = Q3.SUBSIDIARY_ID)
      STOP (Q2.EMPLOYEE_ID = Q3.EMPLOYEE_ID)
```

أُزيل `UPPER` من جملة `where` للحصول على النتيجة المتوقعة.

Oracle

```
---------------------------------------------------------------
|Id |Operation                    | Name        | Rows | Cost |
---------------------------------------------------------------
| 0 |SELECT STATEMENT             |             |  822 |   38 |
| 1 | NESTED LOOPS OUTER          |             |  822 |   38 |
| 2 |  TABLE ACCESS BY INDEX ROWID| EMPLOYEES   |    1 |    4 |
|*3 |   INDEX RANGE SCAN          | EMP_UP_NAME |    1 |      |
| 4 |  TABLE ACCESS BY INDEX ROWID| SALES       |  821 |   34 |
|*5 |   INDEX RANGE SCAN          | SALES_EMP   |   31 |      |
---------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
  3 - access(UPPER("LAST_NAME") LIKE 'WIN%')
      filter(UPPER("LAST_NAME") LIKE 'WIN%')
  5 - access("E0_"."SUBSIDIARY_ID"="S1_"."SUBSIDIARY_ID"(+)
        AND  "E0_"."EMPLOYEE_ID"  ="S1_"."EMPLOYEE_ID"(+))
```

تسترجع قاعدة البيانات النتيجة من جدول `EMPLOYEES` عبر `EMP_UP_NAME` أولاً، ثم تجلب السجلات المقابلة من جدول `SALES` لكل موظف بعد ذلك.

#### نصيحة

تعرّف على ORM لديك وتحكّم في عمليات الربط.

تقدّم أدوات ORM المختلفة طرقاً مختلفة للتحكم في سلوك الربط. والجلب الحريص مثال واحد لا تقدّمه كل أداة ربط كائنية-علائقية حتى. ومن الممارسات الجيدة تنفيذ مجموعة صغيرة من العينات تستكشف قدرات ORM لديك؛ فهي ليست تمريناً جيداً فحسب، بل تصلح مرجعاً أثناء التطوير، وستُظهر لك سلوكاً غير متوقع — مثل تكرار سجلات الأب كأثر جانبي لاستخدام عمليات الربط. [نزّل العينات](https://use-the-index-luke.com/samples/use-the-index-luke-samples.zip) للبدء.

ويقدّم الربط بالحلقات المتداخلة أداءً جيداً إذا أعاد الاستعلام القائد مجموعة نتائج صغيرة. وإلا فقد يختار المُحسِّن خوارزمية ربط مختلفة تماماً — مثل الربط بالتجزئة الموصوف في القسم التالي — لكن ذلك ممكن فقط إذا استخدم التطبيق عملية ربط ليخبر قاعدة البيانات بالبيانات التي يحتاج إليها فعلاً.

#### روابط

- [عينات Java وPerl وPHP الكاملة [ZIP]](https://use-the-index-luke.com/samples/use-the-index-luke-samples.zip)
- [عبارات `CREATE` و`INSERT` الخاصة بالعينات](/book/use-the-index-luke/sql-example-schema/index)
- مقال: «[زمن الاستجابة: الأمان مقابل الأداء](https://blog.fatalmind.com/2009/12/22/latency-security-vs-performance/)» عن أزمنة استجابة الشبكة وتطبيقات SQL.
