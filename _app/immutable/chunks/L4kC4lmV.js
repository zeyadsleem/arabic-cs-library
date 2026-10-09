const e="use-the-index-luke",s="sql-join-hash-join-partial-objects",a="الوصل بالتجزئة (Hash Join)",n="index",o="الربط بالتجزئة",p=[],l=`<p>تستهدف خوارزمية الربط بالتجزئة نقطة الضعف في <a href="/arabic-cs-library/book/use-the-index-luke/sql-join-nested-loops-join-n1-problem/index">الربط بالحلقات المتداخلة</a>: كثرة عمليات اجتياز شجرة B عند تنفيذ الاستعلام الداخلي. وهي بدلاً من ذلك تحمّل السجلات المرشحة من أحد طرفَي الربط إلى <a href="https://en.wikipedia.org/wiki/Hash_table">جدول تجزئة</a> يمكن فحصه بسرعة كبيرة مقابل كل صف من الطرف الآخر للربط. وضبط الربط بالتجزئة يتطلب نهج فهرسة مختلفاً تماماً عن الربط بالحلقات المتداخلة. وإلى جانب ذلك، يمكن أيضاً تحسين أداء الربط بالتجزئة باختيار <em>أعمدة</em> أقل — وهو تحدٍّ لمعظم أدوات ORM.</p>
<p>واستراتيجية الفهرسة للربط بالتجزئة مختلفة جداً لأنه لا حاجة إلى فهرسة أعمدة الربط؛ فالفهارس الخاصة بـ<em>المُسندات المستقلة</em> في <code>where</code> وحدها هي التي تحسّن أداء الربط بالتجزئة.</p>
<h4>نصيحة</h4>
<p>افهرس <em>المُسندات المستقلة</em> في <code>where</code> لتحسين أداء الربط بالتجزئة.</p>
<p>تأمّل المثال التالي: فهو يختار جميع المبيعات في الأشهر الستة الماضية مع تفاصيل الموظف المقابل:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> sales s
  <span class="hljs-keyword">JOIN</span> employees e <span class="hljs-keyword">ON</span> (s.subsidiary_id <span class="hljs-operator">=</span> e.subsidiary_id
                  <span class="hljs-keyword">AND</span>  s.employee_id   <span class="hljs-operator">=</span> e.employee_id  )
 <span class="hljs-keyword">WHERE</span> s.sale_date <span class="hljs-operator">&gt;</span> trunc(sysdate) <span class="hljs-operator">-</span> <span class="hljs-type">INTERVAL</span> <span class="hljs-string">&#x27;6&#x27;</span> <span class="hljs-keyword">MONTH</span>
</code></pre>
<p>مرشّح <code>SALE_DATE</code> هو جملة <code>where</code> المستقلة الوحيدة — أي إنه يشير إلى جدول واحد فقط ولا ينتمي إلى مُسندات الربط.</p>
<p>Db2 (LUW)</p>
<pre><code>Explain Plan
------------------------------------------------------------
ID | Operation          |                       Rows |  Cost
 1 | RETURN             |                            | 60750
 2 |  HSJOIN            |             50795 of 10000 | 60750
 3 |   TBSCAN SALES     | 50795 of 1011118 (  5.02%) | 60053
 4 |   TBSCAN EMPLOYEES |   10000 of 10000 (100.00%) |   688

Predicate Information
 2 - JOIN (Q2.SUBSIDIARY_ID = DECIMAL(Q1.SUBSIDIARY_ID, 10, 0))
     JOIN (Q2.EMPLOYEE_ID = DECIMAL(Q1.EMPLOYEE_ID, 10, 0))
 3 - SARG ((CURRENT DATE - 6 MONTHS) &lt; Q2.SALE_DATE)
</code></pre>
<p>وغُيِّر شرط <code>where</code> هكذا للحصول على النتيجة المطلوبة: <code>WHERE s.sale_date &gt; current_date - 6 MONTH</code>.</p>
<p>Oracle</p>
<pre><code>--------------------------------------------------------------
| Id | Operation          | Name      | Rows  | Bytes | Cost |
--------------------------------------------------------------
|  0 | SELECT STATEMENT   |           | 49244 |    59M| 12049|
|* 1 |  HASH JOIN         |           | 49244 |    59M| 12049|
|  2 |   TABLE ACCESS FULL| EMPLOYEES | 10000 |     9M|   478|
|* 3 |   TABLE ACCESS FULL| SALES     | 49244 |    10M| 10521|
--------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
   1 - access(&quot;S&quot;.&quot;SUBSIDIARY_ID&quot;=&quot;E&quot;.&quot;SUBSIDIARY_ID&quot;
          AND &quot;S&quot;.&quot;EMPLOYEE_ID&quot;  =&quot;E&quot;.&quot;EMPLOYEE_ID&quot;)
   3 - filter(&quot;S&quot;.&quot;SALE_DATE&quot;&gt;TRUNC(SYSDATE@!)
                           -INTERVAL'+00-06' YEAR(2) TO MONTH)
</code></pre>
<p>الخطوة الأولى في التنفيذ مسح كامل للجدول لتحميل جميع الموظفين إلى جدول تجزئة (معرّف الخطة 2). ويستخدم جدول التجزئة مُسندات الربط مفتاحاً له. وفي الخطوة التالية، تنفّذ قاعدة البيانات مسحاً كاملاً آخر للجدول على جدول <code>SALES</code> وتستبعد جميع المبيعات التي لا تستوفي الشرط على <code>SALE_DATE</code> (معرّف الخطة 3). وبالنسبة إلى سجلات <code>SALES</code> المتبقية، تصل قاعدة البيانات إلى جدول التجزئة لتحميل تفاصيل الموظف المقابل.</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=sec-hash-join&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<p>والغرض الوحيد من جدول التجزئة هو العمل كبنية مؤقتة في الذاكرة لتجنّب الوصول إلى جدول <code>EMPLOYEE</code> مرات كثيرة. ويُحمَّل جدول التجزئة أول مرة دفعة واحدة فلا حاجة إلى فهرس لجلب سجلات فردية بكفاءة. وتؤكد معلومات المُسندات أنه لا يُطبَّق أي مرشّح على جدول <code>EMPLOYEES</code> (معرّف الخطة 2)؛ فالاستعلام ليس له أي مُسندات مستقلة على هذا الجدول.</p>
<h4>مهم</h4>
<p>فهرسة مُسندات الربط لا تحسّن أداء الربط بالتجزئة.</p>
<p>ولا يعني ذلك استحالة فهرسة الربط بالتجزئة؛ فالمُسندات المستقلة يمكن فهرستها، وهي الشروط المطبَّقة أثناء إحدى عمليتَي الوصول إلى الجدول — وفي المثال أعلاه، هو المرشّح على <code>SALE_DATE</code>.</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX sales_date <span class="hljs-keyword">ON</span> sales (sale_date)
</code></pre>
<p>تستخدم خطة التنفيذ التالية هذا الفهرس. ومع ذلك تستخدم مسحاً كاملاً للجدول على <code>EMPLOYEES</code> لأن الاستعلام ليس له أي مُسند <code>where</code> مستقل على <code>EMPLOYEES</code>.</p>
<p>Db2 (LUW)</p>
<pre><code>Explain Plan
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
 3 - SARG ((CURRENT DATE - 6 MONTHS) &lt; Q2.SALE_DATE)
 6 - START ((CURRENT DATE - 6 MONTHS) &lt; Q2.SALE_DATE)
</code></pre>
<p>وغُيِّر شرط <code>where</code> هكذا للحصول على النتيجة المطلوبة: <code>WHERE s.sale_date &gt; current_date - 6 MONTH</code>.</p>
<p>Oracle</p>
<pre><code>--------------------------------------------------------------
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
   1 - access(&quot;S&quot;.&quot;SUBSIDIARY_ID&quot;=&quot;E&quot;.&quot;SUBSIDIARY_ID&quot;
          AND &quot;S&quot;.&quot;EMPLOYEE_ID&quot;  =&quot;E&quot;.&quot;EMPLOYEE_ID&quot;  )
   4 - access(&quot;S&quot;.&quot;SALE_DATE&quot; &gt; TRUNC(SYSDATE@!)
                           -INTERVAL'+00-06' YEAR(2) TO MONTH)
</code></pre>
<p>وفهرسة الربط بالتجزئة — خلافاً لـ<a href="/arabic-cs-library/book/use-the-index-luke/sql-join-nested-loops-join-n1-problem/index">الربط بالحلقات المتداخلة</a> — متناظرة؛ أي إن ترتيب الربط لا يؤثر في الفهرسة. ويمكن استخدام الفهرس <code>SALES_DATE</code> لتحميل جدول التجزئة إذا عُكس ترتيب الربط.</p>
<h4>ملاحظة</h4>
<p>فهرسة الربط بالتجزئة مستقلة عن ترتيب الربط.</p>
<p>وثمة نهج مختلف تماماً لتحسين أداء الربط بالتجزئة وهو تقليل حجم جدول التجزئة. وتعمل هذه الطريقة لأن الربط بالتجزئة لا يكون مثالياً إلا إذا اتسع جدول التجزئة بأكمله للذاكرة. ولذلك سيستخدم المُحسِّن تلقائياً الطرف الأصغر من الربط لجدول التجزئة. وتُظهر خطة تنفيذ Oracle متطلبات الذاكرة المقدَّرة في عمود «Bytes». وفي خطة التنفيذ أعلاه، يحتاج جدول <code>EMPLOYEES</code> تسعة ميغابايتات فهو الطرف الأصغر.</p>
<p>ويمكن أيضاً تقليل حجم جدول التجزئة بتغيير استعلام SQL، مثلاً بإضافة شروط إضافية بحيث تحمّل قاعدة البيانات سجلات مرشحة أقل إلى جدول التجزئة. وبمتابعة المثال أعلاه، يعني ذلك إضافة مرشّح على الخاصية <code>DEPARTMENT</code> بحيث يُنظر في موظفي المبيعات فقط. وهذا يحسّن أداء الربط بالتجزئة حتى لو لم يكن هناك فهرس على الخاصية <code>DEPARTMENT</code>، لأن قاعدة البيانات لا تحتاج إلى تخزين موظفين لا يمكن أن تكون لهم مبيعات في جدول التجزئة. وعند فعل ذلك يجب أن تتأكد من عدم وجود سجلات <code>SALES</code> لموظفين لا يعملون في القسم المعني. استخدم القيود لحماية افتراضاتك.</p>
<p>وعند تصغير حجم جدول التجزئة، فإن العامل ذا الصلة ليس عدد الصفوف بل البصمة الذاكرية. بل من الممكن فعلاً تقليل حجم جدول التجزئة باختيار <em>أعمدة</em> أقل — فقط الخصائص التي تحتاج إليها حقاً:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> s.sale_date, s.eur_value
     , e.last_name, e.first_name
  <span class="hljs-keyword">FROM</span> sales s
  <span class="hljs-keyword">JOIN</span> employees e <span class="hljs-keyword">ON</span> (s.subsidiary_id <span class="hljs-operator">=</span> e.subsidiary_id
                  <span class="hljs-keyword">AND</span>  s.employee_id   <span class="hljs-operator">=</span> e.employee_id  )
 <span class="hljs-keyword">WHERE</span> s.sale_date <span class="hljs-operator">&gt;</span> trunc(sysdate) <span class="hljs-operator">-</span> <span class="hljs-type">INTERVAL</span> <span class="hljs-string">&#x27;6&#x27;</span> <span class="hljs-keyword">MONTH</span>
</code></pre>
<p>ونادراً ما تُدخل هذه الطريقة أخطاءً لأن إسقاط العمود الخطأ سيؤدي على الأرجح سريعاً إلى رسالة خطأ. ومع ذلك يمكن تقليص حجم جدول التجزئة تقليصاً كبيراً، وفي هذه الحالة تحديداً من 9 ميغابايتات إلى 234 كيلوبايت — أي انخفاض بنسبة 97%.</p>
<pre><code>--------------------------------------------------------------
| Id | Operation                    | Name      | Bytes| Cost|
--------------------------------------------------------------
|  0 | SELECT STATEMENT             |           | 2067K| 2202|
|* 1 |  HASH JOIN                   |           | 2067K| 2202|
|  2 |   TABLE ACCESS FULL          | EMPLOYEES |  234K|  478|
|  3 |   TABLE ACCESS BY INDEX ROWID| SALES     |  913K| 1724|
|* 4 |    INDEX RANGE SCAN          | SALES_DATE|      |  133|
--------------------------------------------------------------
</code></pre>
<h4>نصيحة</h4>
<p>اختر أعمدة أقل لتحسين أداء الربط بالتجزئة.</p>
<p>ومع أن إزالة بضعة أعمدة من عبارة SQL تبدو بسيطة للوهلة الأولى، فهي تحدٍّ حقيقي عند استخدام أداة ربط كائنية-علائقية (ORM). فدعم ما يسمى <em>الكائنات الجزئية</em> نادر جداً. وتعرض الأمثلة التالية بعض الإمكانات.Javaيعرّف JPA النمط <code>FetchType.LAZY</code> في تعليمة <code>@Basic</code>، ويمكن تطبيقه على مستوى الخاصية:</p>
<pre><code>@Column(name=&quot;junk&quot;)
@Basic(fetch=FetchType.LAZY)
private String junk;
</code></pre>
<p>ولمزوّدي JPA حرية تجاهله:</p>
<p>إن استراتيجية LAZY تلميح لبيئة مزوّد الاستمرارية بأن البيانات ينبغي أن تُجلب كسولاً عند أول وصول إليها. ويُسمح للتطبيق بجلب البيانات التي حُددت لها استراتيجية LAZY تلميحاً جلباً حريصاً.</p>
<p>— <a href="https://download.oracle.com/otndocs/jcp/ejb-3_0-fr-eval-oth-JSpec/">EJB 3.0 JPA، الفقرة 9.1.18</a></p>
<p>ويطبّق Hibernate 3.6 الجلب الكسول للخصائص عبر <a href="https://docs.hibernate.org/orm/6.2/userguide/html_single/#BytecodeEnhancement-lazy-loading">تجهيز شيفرة البايت في زمن الترجمة</a>. ويضيف التجهيز شيفرة إضافية إلى الأصناف المترجمة لا تجلب خصائص <code>LAZY</code> إلا عند الوصول إليها. والنهج شفاف تماماً للتطبيق لكنه يفتح الباب لبُعد جديد من <a href="/arabic-cs-library/book/use-the-index-luke/sql-join-nested-loops-join-n1-problem/index">مشكلات N+1</a>: استعلام <code>select</code> واحد لكل سجل <em>وخاصية</em>. وهذا خطير بوجه خاص لأن JPA لا يقدم تحكماً في زمن التشغيل للجلب الحريص عند الحاجة.</p>
<p>وتحل لغة الاستعلام الأصلية لـHibernate، أي HQL، المشكلة بجملة <code>FETCH ALL PROPERTIES</code> (انظر <a href="https://use-the-index-luke.com/samples/use-the-index-luke-samples.zip"><code>FewerColumnsInstrumentedHibernate.java</code></a>):</p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> s <span class="hljs-keyword">from</span> Sales s <span class="hljs-keyword">FETCH</span> <span class="hljs-keyword">ALL</span> PROPERTIES
 <span class="hljs-keyword">inner</span> <span class="hljs-keyword">join</span> <span class="hljs-keyword">fetch</span> s.employee e <span class="hljs-keyword">FETCH</span> <span class="hljs-keyword">ALL</span> PROPERTIES
 <span class="hljs-keyword">where</span> s.saleDate <span class="hljs-operator">&gt;</span>:dt
</code></pre>
<p>تُجبر جملة <code>FETCH ALL PROPERTIES</code> Hibernate على جلب الكيان جلباً حريصاً — حتى عند استخدام شيفرة مجهَّزة وتعليمة <code>LAZY</code>.</p>
<p>وثمة خيار آخر لتحميل أعمدة مختارة فقط وهو استخدام كائنات نقل البيانات (DTOs) بدلاً من الكيانات. وتعمل هذه الطريقة بالطريقة نفسها في HQL وJPQL؛ أي تهيئ كائناً في الاستعلام (عينة <a href="https://use-the-index-luke.com/samples/use-the-index-luke-samples.zip"><code>FewerColumnsJPA.java</code></a>):</p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> <span class="hljs-keyword">new</span> SalesHeadDTO(s.saleDate , s.eurValue
                       ,e.firstName, e.lastName)
  <span class="hljs-keyword">from</span> Sales s
  <span class="hljs-keyword">join</span> s.employee e
 <span class="hljs-keyword">where</span> s.saleDate <span class="hljs-operator">&gt;</span> :dt
</code></pre>
<p>يختار الاستعلام البيانات المطلوبة فقط ويعيد كائن <code>SalesHeadDTO</code> — كائن Java بسيط (<a href="https://en.wikipedia.org/wiki/Plain_Old_Java_Object">POJO</a>) لا كياناً.</p>
<p>وغالباً ما يتضمن حل مشكلة أداء واقعية الكثير من الشيفرة القائمة، وقد يكون ترحيل تلك الشيفرة إلى أصناف جديدة غير معقول. لكن تجهيز شيفرة البايت يسبّب مشكلات N+1، وهي على الأرجح أسوأ من مشكلة الأداء الأصلية. ويستخدم مثال <a href="https://use-the-index-luke.com/samples/use-the-index-luke-samples.zip"><code>FewerColumnsJPA.java</code></a> واجهة مشتركة للكيان وللـDTO لحل المشكلة. وتعرّف الواجهة دوال الجلب فقط بحيث يمكن تغيير مستهلك للقراءة فقط بسهولة ليقبل الـDTO مدخلاً. ويكفي ذلك غالباً لأن عمليات الربط بالتجزئة الكبيرة تُثار عادةً بإجراءات تقارير لا تحدّث شيئاً.</p>
<p>وإذا كنت تبني تقريراً جديداً، فقد تفكر في جلب البيانات عبر DTOs أو عبر <code>Map</code> بسيط، كما هو موضح في عينة <a href="https://use-the-index-luke.com/samples/use-the-index-luke-samples.zip"><code>FewerColumnsHibernate.java</code></a>.</p>
<p>Perl</p>
<p>لا يعمل إطار DBIx::Class كمدير كيانات، فلا يسبّب الوراثة <a href="https://en.wikipedia.org/wiki/Aliasing_%28computing%29">مشكلات التسمية المتعددة (aliasing)</a>. ويدعم <a href="https://metacpan.org/release/RIBASUSHI/DBIx-Class-0.082840/view/lib/DBIx/Class/Manual/Cookbook.pod#Static_sub-classing_DBIx::Class_result_classes">كتاب الوصفات</a> هذا النهج. ويعرّف تعريف المخطط التالي صنف <code>Sales</code> على مستويين:</p>
<pre><code>package UseTheIndexLuke::Schema::Result::SalesHead;
use base qw/DBIx::Class::Core/;

__PACKAGE__-&gt;table('sales');
__PACKAGE__-&gt;add_columns(qw/sale_id employee_id subsidiary_id
                            sale_date eur_value/);
__PACKAGE__-&gt;set_primary_key(qw/sale_id/);
__PACKAGE__-&gt;belongs_to('employee', 'Employees', 
           {'foreign.employee_id'   =&gt; 'self.employee_id'
           ,'foreign.subsidiary_id' =&gt; 'self.subsidiary_id'});

package UseTheIndexLuke::Schema::Result::Sales;
use base qw/UseTheIndexLuke::Schema::Result::SalesHead/;

__PACKAGE__-&gt;table('sales');
__PACKAGE__-&gt;add_columns(qw/junk/);
</code></pre>
<p>الصنف <code>Sales</code> مشتق من الصنف <code>SalesHead</code> ويضيف الخاصية الناقصة. ويمكنك استخدام الصنفين حسب حاجتك. يرجى ملاحظة أن إعداد الجدول مطلوب في الصنف المشتق أيضاً.</p>
<p>ويمكنك جلب جميع تفاصيل الموظف عبر <a href="/arabic-cs-library/book/use-the-index-luke/sql-join-nested-loops-join-n1-problem/index#orm-join">prefetch</a> أو جلب أعمدة مختارة فقط كما هو موضح أدناه:</p>
<pre><code>my @sales =
   $schema-&gt;resultset('SalesHead')
          -&gt;search($cond
                  ,{      join =&gt; 'employee'
                   ,'+columns' =&gt; ['employee.first_name'
                                  ,'employee.last_name']
                   }
                  );
</code></pre>
<p>ولا يمكن تحميل أعمدة مختارة فقط من الجدول الجذري — <code>SalesHead</code> في هذه الحالة.</p>
<p>ويولّد DBIx::Class 0.08192 عبارة SQL التالية: فهو يجلب جميع الأعمدة من جدول <code>SALES</code> والخصائص المختارة من <code>EMPLOYEES</code>:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> me.sale_id,
       me.employee_id,
       me.subsidiary_id,
       me.sale_date,
       me.eur_value,
       employee.first_name,
       employee.last_name
  <span class="hljs-keyword">FROM</span> sales me
  <span class="hljs-keyword">JOIN</span> employees employee
        <span class="hljs-keyword">ON</span>( employee.employee_id   <span class="hljs-operator">=</span> me.employee_id
       <span class="hljs-keyword">AND</span>  employee.subsidiary_id <span class="hljs-operator">=</span> me.subsidiary_id)
 <span class="hljs-keyword">WHERE</span>(sale_date <span class="hljs-operator">&gt;</span> ?)
</code></pre>
<p>PHP</p>
<p>يدعم الإصدار 2 من إطار Doctrine اختيار الخصائص في زمن التشغيل. وتذكر الوثائق أن <a href="https://www.doctrine-project.org/projects/doctrine-orm/en/latest/reference/partial-objects.html">الكائنات المحمَّلة جزئياً</a> قد تسلك سلوكاً غريباً، وتشترط الكلمة المفتاحية <code>partial</code> للإقرار بالمخاطر. علاوة على ذلك، يجب اختيار أعمدة المفتاح الأساسي صراحةً:</p>
<pre><code>$qb = $em-&gt;createQueryBuilder();
$qb-&gt;select('partial s.{sale_id, sale_date, eur_value},'
          . 'partial e.{employee_id, subsidiary_id, '
                     . 'first_name , last_name}')
   -&gt;from('Sales', 's')
   -&gt;join('s.employee', 'e')
   -&gt;where(&quot;s.sale_date &gt; :dt&quot;)
   -&gt;setParameter('dt', $dt, Type::DATETIME);
</code></pre>
<p>تحتوي عبارة SQL المولَّدة الأعمدة المطلوبة، ومرة أخرى <code>SUBSIDIARY_ID</code> و<code>EMPLOYEE_ID</code> من جدول <code>SALES</code>.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> s0_.sale_id       <span class="hljs-keyword">AS</span> sale_id0,
       s0_.sale_date     <span class="hljs-keyword">AS</span> sale_date1,
       s0_.eur_value     <span class="hljs-keyword">AS</span> eur_value2,
       e1_.employee_id   <span class="hljs-keyword">AS</span> employee_id3,
       e1_.subsidiary_id <span class="hljs-keyword">AS</span> subsidiary_id4,
       e1_.first_name    <span class="hljs-keyword">AS</span> first_name5,
       e1_.last_name     <span class="hljs-keyword">AS</span> last_name6,
       s0_.subsidiary_id <span class="hljs-keyword">AS</span> subsidiary_id7,
       s0_.employee_id   <span class="hljs-keyword">AS</span> employee_id8
  <span class="hljs-keyword">FROM</span> sales s0_
 <span class="hljs-keyword">INNER</span> <span class="hljs-keyword">JOIN</span> employees e1_
         <span class="hljs-keyword">ON</span> s0_.subsidiary_id <span class="hljs-operator">=</span> e1_.subsidiary_id
        <span class="hljs-keyword">AND</span> s0_.employee_id   <span class="hljs-operator">=</span> e1_.employee_id
 <span class="hljs-keyword">WHERE</span> s0_.sale_date <span class="hljs-operator">&gt;</span> ?
</code></pre>
<p>والكائنات المعادة متوافقة مع الكائنات المحمَّلة كاملةً، لكن الأعمدة الناقصة تبقى غير مهيأة. والوصول إليها <em>لا</em> يثير استثناءً.</p>
<h4>ملاحظة</h4>
<p>أدخلت MySQL الربط بالتجزئة في الإصدار 8.0.18 عام 2019.</p>
<h4>مربع حقائق</h4>
<ul>
<li>لا تحتاج عمليات الربط بالتجزئة فهارس على مُسندات الربط؛ فهي تستخدم جدول التجزئة بدلاً منها.</li>
<li>لا يستخدم الربط بالتجزئة الفهارس إلا إذا كان الفهرس يدعم المُسندات المستقلة.</li>
<li>قلّل حجم جدول التجزئة لتحسين الأداء؛ إما أفقياً (صفوف أقل) وإما عمودياً (أعمدة أقل).</li>
<li>لا تستطيع عمليات الربط بالتجزئة تنفيذ عمليات ربط فيها شروط نطاق في مُسندات الربط (<a href="https://en.wikipedia.org/wiki/Join_(relational_algebra)#%CE%B8-join_and_equijoin">عمليات ربط ثيتا (theta joins)</a>).</li>
</ul>
<h4>روابط</h4>
<ul>
<li><a href="https://use-the-index-luke.com/samples/use-the-index-luke-samples.zip">عينات Java وPerl وPHP الكاملة [ZIP]</a></li>
<li><a href="/arabic-cs-library/book/use-the-index-luke/sql-example-schema/index">عبارات <code>CREATE</code> و<code>INSERT</code> الخاصة بالعينات</a></li>
</ul>
`,d={book:e,chapter:s,chapterTitle:a,slug:n,title:o,headings:p,html:l};export{e as book,s as chapter,a as chapterTitle,d as default,p as headings,l as html,n as slug,o as title};
