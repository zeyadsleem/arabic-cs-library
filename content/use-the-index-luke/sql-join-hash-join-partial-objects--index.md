---
title: "الربط بالتجزئة"
lang: ar
source: https://use-the-index-luke.com/sql/join/hash-join-partial-objects
---

تستهدف خوارزمية الربط بالتجزئة نقطة الضعف في [الربط بالحلقات المتداخلة](/book/use-the-index-luke/sql-join-nested-loops-join-n1-problem/index): كثرة عمليات اجتياز شجرة B عند تنفيذ الاستعلام الداخلي. وهي بدلاً من ذلك تحمّل السجلات المرشحة من أحد طرفَي الربط إلى [جدول تجزئة](https://en.wikipedia.org/wiki/Hash_table) يمكن فحصه بسرعة كبيرة مقابل كل صف من الطرف الآخر للربط. وضبط الربط بالتجزئة يتطلب نهج فهرسة مختلفاً تماماً عن الربط بالحلقات المتداخلة. وإلى جانب ذلك، يمكن أيضاً تحسين أداء الربط بالتجزئة باختيار *أعمدة* أقل — وهو تحدٍّ لمعظم أدوات ORM.

واستراتيجية الفهرسة للربط بالتجزئة مختلفة جداً لأنه لا حاجة إلى فهرسة أعمدة الربط؛ فالفهارس الخاصة بـ*المُسندات المستقلة* في `where` وحدها هي التي تحسّن أداء الربط بالتجزئة.

#### نصيحة

افهرس *المُسندات المستقلة* في `where` لتحسين أداء الربط بالتجزئة.

تأمّل المثال التالي: فهو يختار جميع المبيعات في الأشهر الستة الماضية مع تفاصيل الموظف المقابل:

```sql
SELECT *
  FROM sales s
  JOIN employees e ON (s.subsidiary_id = e.subsidiary_id
                  AND  s.employee_id   = e.employee_id  )
 WHERE s.sale_date > trunc(sysdate) - INTERVAL '6' MONTH
```

مرشّح `SALE_DATE` هو جملة `where` المستقلة الوحيدة — أي إنه يشير إلى جدول واحد فقط ولا ينتمي إلى مُسندات الربط.

Db2 (LUW)

```
Explain Plan
------------------------------------------------------------
ID | Operation          |                       Rows |  Cost
 1 | RETURN             |                            | 60750
 2 |  HSJOIN            |             50795 of 10000 | 60750
 3 |   TBSCAN SALES     | 50795 of 1011118 (  5.02%) | 60053
 4 |   TBSCAN EMPLOYEES |   10000 of 10000 (100.00%) |   688

Predicate Information
 2 - JOIN (Q2.SUBSIDIARY_ID = DECIMAL(Q1.SUBSIDIARY_ID, 10, 0))
     JOIN (Q2.EMPLOYEE_ID = DECIMAL(Q1.EMPLOYEE_ID, 10, 0))
 3 - SARG ((CURRENT DATE - 6 MONTHS) < Q2.SALE_DATE)
```

وغُيِّر شرط `where` هكذا للحصول على النتيجة المطلوبة: `WHERE s.sale_date > current_date - 6 MONTH`.

Oracle

```
--------------------------------------------------------------
| Id | Operation          | Name      | Rows  | Bytes | Cost |
--------------------------------------------------------------
|  0 | SELECT STATEMENT   |           | 49244 |    59M| 12049|
|* 1 |  HASH JOIN         |           | 49244 |    59M| 12049|
|  2 |   TABLE ACCESS FULL| EMPLOYEES | 10000 |     9M|   478|
|* 3 |   TABLE ACCESS FULL| SALES     | 49244 |    10M| 10521|
--------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
   1 - access("S"."SUBSIDIARY_ID"="E"."SUBSIDIARY_ID"
          AND "S"."EMPLOYEE_ID"  ="E"."EMPLOYEE_ID")
   3 - filter("S"."SALE_DATE">TRUNC(SYSDATE@!)
                           -INTERVAL'+00-06' YEAR(2) TO MONTH)
```

الخطوة الأولى في التنفيذ مسح كامل للجدول لتحميل جميع الموظفين إلى جدول تجزئة (معرّف الخطة 2). ويستخدم جدول التجزئة مُسندات الربط مفتاحاً له. وفي الخطوة التالية، تنفّذ قاعدة البيانات مسحاً كاملاً آخر للجدول على جدول `SALES` وتستبعد جميع المبيعات التي لا تستوفي الشرط على `SALE_DATE` (معرّف الخطة 3). وبالنسبة إلى سجلات `SALES` المتبقية، تصل قاعدة البيانات إلى جدول التجزئة لتحميل تفاصيل الموظف المقابل.

#### إن أعجبك هذا الموضوع، قد يعجبك أيضاً…

… أن [تشترك في **القوائم البريدية**](https://winand.at/lists)، و[تحصل على **ملصقات مجانية**](https://use-the-index-luke.com/shop)، و[تشتري **كتابي**](https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&utm_campaign=sec-hash-join&utm_medium=web)، أو [تنضم إلى **دورة تدريبية**](https://winand.at/sql-training/open-online-class).

والغرض الوحيد من جدول التجزئة هو العمل كبنية مؤقتة في الذاكرة لتجنّب الوصول إلى جدول `EMPLOYEE` مرات كثيرة. ويُحمَّل جدول التجزئة أول مرة دفعة واحدة فلا حاجة إلى فهرس لجلب سجلات فردية بكفاءة. وتؤكد معلومات المُسندات أنه لا يُطبَّق أي مرشّح على جدول `EMPLOYEES` (معرّف الخطة 2)؛ فالاستعلام ليس له أي مُسندات مستقلة على هذا الجدول.

#### مهم

فهرسة مُسندات الربط لا تحسّن أداء الربط بالتجزئة.

ولا يعني ذلك استحالة فهرسة الربط بالتجزئة؛ فالمُسندات المستقلة يمكن فهرستها، وهي الشروط المطبَّقة أثناء إحدى عمليتَي الوصول إلى الجدول — وفي المثال أعلاه، هو المرشّح على `SALE_DATE`.

```sql
CREATE INDEX sales_date ON sales (sale_date)
```

تستخدم خطة التنفيذ التالية هذا الفهرس. ومع ذلك تستخدم مسحاً كاملاً للجدول على `EMPLOYEES` لأن الاستعلام ليس له أي مُسند `where` مستقل على `EMPLOYEES`.

Db2 (LUW)

```
Explain Plan
----------------------------------------------------------------
ID | Operation              |                       Rows |  Cost
 1 | RETURN                 |                            | 16655
 2 |  HSJOIN                |             50795 of 10000 | 16655
 3 |   FETCH SALES          |   50795 of 50795 (100.00%) | 15958
 4 |    RIDSCN              |   50795 of 50795 (100.00%) |  1655
 5 |     SORT (UNIQUE)      |   50795 of 50795 (100.00%) |  1655
 6 |      IXSCAN SALES_DATE | 50795 of 1011118 (  5.02%) |  1631
 7 |   TBSCAN EMPLOYEES     |   10000 of 10000 (100.00%) |   688

Predicate Information
 2 - JOIN (Q2.SUBSIDIARY_ID = DECIMAL(Q1.SUBSIDIARY_ID, 10, 0))
     JOIN (Q2.EMPLOYEE_ID = DECIMAL(Q1.EMPLOYEE_ID, 10, 0))
 3 - SARG ((CURRENT DATE - 6 MONTHS) < Q2.SALE_DATE)
 6 - START ((CURRENT DATE - 6 MONTHS) < Q2.SALE_DATE)
```

وغُيِّر شرط `where` هكذا للحصول على النتيجة المطلوبة: `WHERE s.sale_date > current_date - 6 MONTH`.

Oracle

```
--------------------------------------------------------------
| Id | Operation                    | Name      | Bytes| Cost|
--------------------------------------------------------------
|  0 | SELECT STATEMENT             |           |   59M| 3252|
|* 1 |  HASH JOIN                   |           |   59M| 3252|
|  2 |   TABLE ACCESS FULL          | EMPLOYEES |    9M|  478|
|  3 |   TABLE ACCESS BY INDEX ROWID| SALES     |   10M| 1724|
|* 4 |    INDEX RANGE SCAN          | SALES_DATE|      |     |
--------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
   1 - access("S"."SUBSIDIARY_ID"="E"."SUBSIDIARY_ID"
          AND "S"."EMPLOYEE_ID"  ="E"."EMPLOYEE_ID"  )
   4 - access("S"."SALE_DATE" > TRUNC(SYSDATE@!)
                           -INTERVAL'+00-06' YEAR(2) TO MONTH)
```

وفهرسة الربط بالتجزئة — خلافاً لـ[الربط بالحلقات المتداخلة](/book/use-the-index-luke/sql-join-nested-loops-join-n1-problem/index) — متناظرة؛ أي إن ترتيب الربط لا يؤثر في الفهرسة. ويمكن استخدام الفهرس `SALES_DATE` لتحميل جدول التجزئة إذا عُكس ترتيب الربط.

#### ملاحظة

فهرسة الربط بالتجزئة مستقلة عن ترتيب الربط.

وثمة نهج مختلف تماماً لتحسين أداء الربط بالتجزئة وهو تقليل حجم جدول التجزئة. وتعمل هذه الطريقة لأن الربط بالتجزئة لا يكون مثالياً إلا إذا اتسع جدول التجزئة بأكمله للذاكرة. ولذلك سيستخدم المُحسِّن تلقائياً الطرف الأصغر من الربط لجدول التجزئة. وتُظهر خطة تنفيذ Oracle متطلبات الذاكرة المقدَّرة في عمود «Bytes». وفي خطة التنفيذ أعلاه، يحتاج جدول `EMPLOYEES` تسعة ميغابايتات فهو الطرف الأصغر.

ويمكن أيضاً تقليل حجم جدول التجزئة بتغيير استعلام SQL، مثلاً بإضافة شروط إضافية بحيث تحمّل قاعدة البيانات سجلات مرشحة أقل إلى جدول التجزئة. وبمتابعة المثال أعلاه، يعني ذلك إضافة مرشّح على الخاصية `DEPARTMENT` بحيث يُنظر في موظفي المبيعات فقط. وهذا يحسّن أداء الربط بالتجزئة حتى لو لم يكن هناك فهرس على الخاصية `DEPARTMENT`، لأن قاعدة البيانات لا تحتاج إلى تخزين موظفين لا يمكن أن تكون لهم مبيعات في جدول التجزئة. وعند فعل ذلك يجب أن تتأكد من عدم وجود سجلات `SALES` لموظفين لا يعملون في القسم المعني. استخدم القيود لحماية افتراضاتك.

وعند تصغير حجم جدول التجزئة، فإن العامل ذا الصلة ليس عدد الصفوف بل البصمة الذاكرية. بل من الممكن فعلاً تقليل حجم جدول التجزئة باختيار *أعمدة* أقل — فقط الخصائص التي تحتاج إليها حقاً:

```sql
SELECT s.sale_date, s.eur_value
     , e.last_name, e.first_name
  FROM sales s
  JOIN employees e ON (s.subsidiary_id = e.subsidiary_id
                  AND  s.employee_id   = e.employee_id  )
 WHERE s.sale_date > trunc(sysdate) - INTERVAL '6' MONTH
```

ونادراً ما تُدخل هذه الطريقة أخطاءً لأن إسقاط العمود الخطأ سيؤدي على الأرجح سريعاً إلى رسالة خطأ. ومع ذلك يمكن تقليص حجم جدول التجزئة تقليصاً كبيراً، وفي هذه الحالة تحديداً من 9 ميغابايتات إلى 234 كيلوبايت — أي انخفاض بنسبة 97%.

```
--------------------------------------------------------------
| Id | Operation                    | Name      | Bytes| Cost|
--------------------------------------------------------------
|  0 | SELECT STATEMENT             |           | 2067K| 2202|
|* 1 |  HASH JOIN                   |           | 2067K| 2202|
|  2 |   TABLE ACCESS FULL          | EMPLOYEES |  234K|  478|
|  3 |   TABLE ACCESS BY INDEX ROWID| SALES     |  913K| 1724|
|* 4 |    INDEX RANGE SCAN          | SALES_DATE|      |  133|
--------------------------------------------------------------
```

#### نصيحة

اختر أعمدة أقل لتحسين أداء الربط بالتجزئة.

ومع أن إزالة بضعة أعمدة من عبارة SQL تبدو بسيطة للوهلة الأولى، فهي تحدٍّ حقيقي عند استخدام أداة ربط كائنية-علائقية (ORM). فدعم ما يسمى *الكائنات الجزئية* نادر جداً. وتعرض الأمثلة التالية بعض الإمكانات.Javaيعرّف JPA النمط `FetchType.LAZY` في تعليمة `@Basic`، ويمكن تطبيقه على مستوى الخاصية:

```
@Column(name="junk")
@Basic(fetch=FetchType.LAZY)
private String junk;
```

ولمزوّدي JPA حرية تجاهله:

إن استراتيجية LAZY تلميح لبيئة مزوّد الاستمرارية بأن البيانات ينبغي أن تُجلب كسولاً عند أول وصول إليها. ويُسمح للتطبيق بجلب البيانات التي حُددت لها استراتيجية LAZY تلميحاً جلباً حريصاً.

— [EJB 3.0 JPA، الفقرة 9.1.18](https://download.oracle.com/otndocs/jcp/ejb-3_0-fr-eval-oth-JSpec/)

ويطبّق Hibernate 3.6 الجلب الكسول للخصائص عبر [تجهيز شيفرة البايت في زمن الترجمة](https://docs.hibernate.org/orm/6.2/userguide/html_single/#BytecodeEnhancement-lazy-loading). ويضيف التجهيز شيفرة إضافية إلى الأصناف المترجمة لا تجلب خصائص `LAZY` إلا عند الوصول إليها. والنهج شفاف تماماً للتطبيق لكنه يفتح الباب لبُعد جديد من [مشكلات N+1](/book/use-the-index-luke/sql-join-nested-loops-join-n1-problem/index): استعلام `select` واحد لكل سجل *وخاصية*. وهذا خطير بوجه خاص لأن JPA لا يقدم تحكماً في زمن التشغيل للجلب الحريص عند الحاجة.

وتحل لغة الاستعلام الأصلية لـHibernate، أي HQL، المشكلة بجملة `FETCH ALL PROPERTIES` (انظر [`FewerColumnsInstrumentedHibernate.java`](https://use-the-index-luke.com/samples/use-the-index-luke-samples.zip)):

```sql
select s from Sales s FETCH ALL PROPERTIES
 inner join fetch s.employee e FETCH ALL PROPERTIES
 where s.saleDate >:dt
```

تُجبر جملة `FETCH ALL PROPERTIES` Hibernate على جلب الكيان جلباً حريصاً — حتى عند استخدام شيفرة مجهَّزة وتعليمة `LAZY`.

وثمة خيار آخر لتحميل أعمدة مختارة فقط وهو استخدام كائنات نقل البيانات (DTOs) بدلاً من الكيانات. وتعمل هذه الطريقة بالطريقة نفسها في HQL وJPQL؛ أي تهيئ كائناً في الاستعلام (عينة [`FewerColumnsJPA.java`](https://use-the-index-luke.com/samples/use-the-index-luke-samples.zip)):

```sql
select new SalesHeadDTO(s.saleDate , s.eurValue
                       ,e.firstName, e.lastName)
  from Sales s
  join s.employee e
 where s.saleDate > :dt
```

يختار الاستعلام البيانات المطلوبة فقط ويعيد كائن `SalesHeadDTO` — كائن Java بسيط ([POJO](https://en.wikipedia.org/wiki/Plain_Old_Java_Object)) لا كياناً.

وغالباً ما يتضمن حل مشكلة أداء واقعية الكثير من الشيفرة القائمة، وقد يكون ترحيل تلك الشيفرة إلى أصناف جديدة غير معقول. لكن تجهيز شيفرة البايت يسبّب مشكلات N+1، وهي على الأرجح أسوأ من مشكلة الأداء الأصلية. ويستخدم مثال [`FewerColumnsJPA.java`](https://use-the-index-luke.com/samples/use-the-index-luke-samples.zip) واجهة مشتركة للكيان وللـDTO لحل المشكلة. وتعرّف الواجهة دوال الجلب فقط بحيث يمكن تغيير مستهلك للقراءة فقط بسهولة ليقبل الـDTO مدخلاً. ويكفي ذلك غالباً لأن عمليات الربط بالتجزئة الكبيرة تُثار عادةً بإجراءات تقارير لا تحدّث شيئاً.

وإذا كنت تبني تقريراً جديداً، فقد تفكر في جلب البيانات عبر DTOs أو عبر `Map` بسيط، كما هو موضح في عينة [`FewerColumnsHibernate.java`](https://use-the-index-luke.com/samples/use-the-index-luke-samples.zip).

Perl

لا يعمل إطار DBIx::Class كمدير كيانات، فلا يسبّب الوراثة [مشكلات التسمية المتعددة (aliasing)](https://en.wikipedia.org/wiki/Aliasing_%28computing%29). ويدعم [كتاب الوصفات](https://metacpan.org/release/RIBASUSHI/DBIx-Class-0.082840/view/lib/DBIx/Class/Manual/Cookbook.pod#Static_sub-classing_DBIx::Class_result_classes) هذا النهج. ويعرّف تعريف المخطط التالي صنف `Sales` على مستويين:

```
package UseTheIndexLuke::Schema::Result::SalesHead;
use base qw/DBIx::Class::Core/;

__PACKAGE__->table('sales');
__PACKAGE__->add_columns(qw/sale_id employee_id subsidiary_id
                            sale_date eur_value/);
__PACKAGE__->set_primary_key(qw/sale_id/);
__PACKAGE__->belongs_to('employee', 'Employees', 
           {'foreign.employee_id'   => 'self.employee_id'
           ,'foreign.subsidiary_id' => 'self.subsidiary_id'});

package UseTheIndexLuke::Schema::Result::Sales;
use base qw/UseTheIndexLuke::Schema::Result::SalesHead/;

__PACKAGE__->table('sales');
__PACKAGE__->add_columns(qw/junk/);
```

الصنف `Sales` مشتق من الصنف `SalesHead` ويضيف الخاصية الناقصة. ويمكنك استخدام الصنفين حسب حاجتك. يرجى ملاحظة أن إعداد الجدول مطلوب في الصنف المشتق أيضاً.

ويمكنك جلب جميع تفاصيل الموظف عبر [prefetch](/book/use-the-index-luke/sql-join-nested-loops-join-n1-problem/index#orm-join) أو جلب أعمدة مختارة فقط كما هو موضح أدناه:

```
my @sales =
   $schema->resultset('SalesHead')
          ->search($cond
                  ,{      join => 'employee'
                   ,'+columns' => ['employee.first_name'
                                  ,'employee.last_name']
                   }
                  );
```

ولا يمكن تحميل أعمدة مختارة فقط من الجدول الجذري — `SalesHead` في هذه الحالة.

ويولّد DBIx::Class 0.08192 عبارة SQL التالية: فهو يجلب جميع الأعمدة من جدول `SALES` والخصائص المختارة من `EMPLOYEES`:

```sql
SELECT me.sale_id,
       me.employee_id,
       me.subsidiary_id,
       me.sale_date,
       me.eur_value,
       employee.first_name,
       employee.last_name
  FROM sales me
  JOIN employees employee
        ON( employee.employee_id   = me.employee_id
       AND  employee.subsidiary_id = me.subsidiary_id)
 WHERE(sale_date > ?)
```

PHP

يدعم الإصدار 2 من إطار Doctrine اختيار الخصائص في زمن التشغيل. وتذكر الوثائق أن [الكائنات المحمَّلة جزئياً](https://www.doctrine-project.org/projects/doctrine-orm/en/latest/reference/partial-objects.html) قد تسلك سلوكاً غريباً، وتشترط الكلمة المفتاحية `partial` للإقرار بالمخاطر. علاوة على ذلك، يجب اختيار أعمدة المفتاح الأساسي صراحةً:

```
$qb = $em->createQueryBuilder();
$qb->select('partial s.{sale_id, sale_date, eur_value},'
          . 'partial e.{employee_id, subsidiary_id, '
                     . 'first_name , last_name}')
   ->from('Sales', 's')
   ->join('s.employee', 'e')
   ->where("s.sale_date > :dt")
   ->setParameter('dt', $dt, Type::DATETIME);
```

تحتوي عبارة SQL المولَّدة الأعمدة المطلوبة، ومرة أخرى `SUBSIDIARY_ID` و`EMPLOYEE_ID` من جدول `SALES`.

```sql
SELECT s0_.sale_id       AS sale_id0,
       s0_.sale_date     AS sale_date1,
       s0_.eur_value     AS eur_value2,
       e1_.employee_id   AS employee_id3,
       e1_.subsidiary_id AS subsidiary_id4,
       e1_.first_name    AS first_name5,
       e1_.last_name     AS last_name6,
       s0_.subsidiary_id AS subsidiary_id7,
       s0_.employee_id   AS employee_id8
  FROM sales s0_
 INNER JOIN employees e1_
         ON s0_.subsidiary_id = e1_.subsidiary_id
        AND s0_.employee_id   = e1_.employee_id
 WHERE s0_.sale_date > ?
```

والكائنات المعادة متوافقة مع الكائنات المحمَّلة كاملةً، لكن الأعمدة الناقصة تبقى غير مهيأة. والوصول إليها *لا* يثير استثناءً.

#### ملاحظة

أدخلت MySQL الربط بالتجزئة في الإصدار 8.0.18 عام 2019.

#### مربع حقائق

- لا تحتاج عمليات الربط بالتجزئة فهارس على مُسندات الربط؛ فهي تستخدم جدول التجزئة بدلاً منها.
- لا يستخدم الربط بالتجزئة الفهارس إلا إذا كان الفهرس يدعم المُسندات المستقلة.
- قلّل حجم جدول التجزئة لتحسين الأداء؛ إما أفقياً (صفوف أقل) وإما عمودياً (أعمدة أقل).
- لا تستطيع عمليات الربط بالتجزئة تنفيذ عمليات ربط فيها شروط نطاق في مُسندات الربط ([عمليات ربط ثيتا (theta joins)](https://en.wikipedia.org/wiki/Join_(relational_algebra)#%CE%B8-join_and_equijoin)).

#### روابط

- [عينات Java وPerl وPHP الكاملة [ZIP]](https://use-the-index-luke.com/samples/use-the-index-luke-samples.zip)
- [عبارات `CREATE` و`INSERT` الخاصة بالعينات](/book/use-the-index-luke/sql-example-schema/index)
