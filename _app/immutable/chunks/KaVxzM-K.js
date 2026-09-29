const s="use-the-index-luke",e="sql-join-nested-loops-join-n1-problem",a="Nested Loops",n="index",l="الحلقات المتداخلة",p=[],o=`<p>الربط بالحلقات المتداخلة هو خوارزمية الربط الأساسية الأكثر جوهرية. وهو يعمل كاستخدام استعلامين متداخلين: الاستعلام الخارجي أو القائد لجلب النتائج من جدول، واستعلام ثانٍ <em>مقابل كل صف</em> من الاستعلام القائد لجلب البيانات المقابلة من الجدول الآخر.</p>
<p>ويمكنك فعلاً استخدام «الاستعلامات المتداخلة» لتنفيذ خوارزمية الحلقات المتداخلة بنفسك. غير أن ذلك نهج مزعج لأن أزمنة استجابة الشبكة تُضاف فوق أزمنة استجابة القرص — ما يجعل زمن الاستجابة الكلي أسوأ. ومع ذلك تبقى «الاستعلامات المتداخلة» شائعة جداً لأنه يسهل تنفيذها دون إدراك ذلك. وتكون أدوات الربط الكائني-العلائقي (ORM) «متعاونة» في هذا الصدد إلى حد أن ما يسمى <em>مشكلة الاستعلامات N+1</em> نالت شهرة سيئة في هذا المجال.</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=sec-nested-loops&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<p>تعرض الأمثلة التالية عمليات الربط هذه «بالاستعلامات المتداخلة العَرَضية» الناتجة عن أدوات ORM مختلفة. وتبحث الأمثلة عن موظفين يبدأ اسم عائلتهم بـ<code>'WIN'</code> وتجلب جميع <code>SALES</code> لهؤلاء الموظفين.</p>
<p>Javaيستخدم مثال JPA واجهة <a href="https://docs.oracle.com/javaee/6/api/javax/persistence/criteria/CriteriaBuilder.html">CriteriaBuilder</a>.</p>
<pre><code>CriteriaBuilder queryBuilder = em.getCriteriaBuilder();
CriteriaQuery&lt;Employees&gt;
   query = queryBuilder.createQuery(Employees.class);
Root&lt;Employees&gt; r = query.from(Employees.class); 
query.where(
  queryBuilder.like(
    queryBuilder.upper(r.get(Employees_.lastName)),
    &quot;WIN%&quot;
  )
);

List&lt;Employees&gt; emp = em.createQuery(query).getResultList();

for (Employees e: emp) {
  // process Employee
  for (Sales s: e.getSales()) {
    // process sale for Employee
  }
}
</code></pre>
<p>ويولّد Hibernate JPA 3.6.0 استعلامات <code>select</code> بعدد N+1:</p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> employees0_.subsidiary_id <span class="hljs-keyword">as</span> subsidiary1_0_
       <span class="hljs-comment">-- MORE COLUMNS</span>
  <span class="hljs-keyword">from</span> employees employees0_ 
 <span class="hljs-keyword">where</span> <span class="hljs-built_in">upper</span>(employees0_.last_name) <span class="hljs-keyword">like</span> ?
</code></pre>
<pre><code class="language-sql">  <span class="hljs-keyword">select</span> sales0_.subsidiary_id <span class="hljs-keyword">as</span> subsidiary4_0_1_
         <span class="hljs-comment">-- MORE COLUMNS</span>
    <span class="hljs-keyword">from</span> sales sales0_
   <span class="hljs-keyword">where</span> sales0_.subsidiary_id<span class="hljs-operator">=</span>? 
     <span class="hljs-keyword">and</span> sales0_.employee_id<span class="hljs-operator">=</span>?
</code></pre>
<pre><code class="language-sql">  <span class="hljs-keyword">select</span> sales0_.subsidiary_id <span class="hljs-keyword">as</span> subsidiary4_0_1_
         <span class="hljs-comment">-- MORE COLUMNS</span>
    <span class="hljs-keyword">from</span> sales sales0_
   <span class="hljs-keyword">where</span> sales0_.subsidiary_id<span class="hljs-operator">=</span>? 
     <span class="hljs-keyword">and</span> sales0_.employee_id<span class="hljs-operator">=</span>?
</code></pre>
<p>Perl</p>
<p>يوضح المثال التالي إطار <a href="https://metacpan.org/dist/DBIx-Class">DBIx::Class</a> في Perl:</p>
<pre><code class="language-javascript">my @employees = 
   $schema-&gt;<span class="hljs-title function_">resultset</span>(<span class="hljs-string">&#x27;Employees&#x27;</span>)
          -&gt;<span class="hljs-title function_">search</span>({<span class="hljs-string">&#x27;UPPER(last_name)&#x27;</span> =&gt; {-<span class="hljs-function"><span class="hljs-params">like</span>=&gt;</span><span class="hljs-string">&#x27;WIN%&#x27;</span>}});

foreach my $employee (@employees) {
   # process <span class="hljs-title class_">Employee</span>
   foreach my $sale ($employee-&gt;sales) {
      # process <span class="hljs-title class_">Sale</span> <span class="hljs-keyword">for</span> <span class="hljs-title class_">Employee</span>
   }
}
</code></pre>
<p>ويولّد DBIx::Class 0.08192 استعلامات <code>select</code> بعدد N+1:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> me.employee_id, me.subsidiary_id
     , me.last_name, me.first_name, me.date_of_birth 
  <span class="hljs-keyword">FROM</span> employees me 
 <span class="hljs-keyword">WHERE</span> ( <span class="hljs-built_in">UPPER</span>(last_name) <span class="hljs-keyword">LIKE</span> ? )
</code></pre>
<pre><code class="language-sql">   <span class="hljs-keyword">SELECT</span> me.sale_id, me.employee_id, me.subsidiary_id
        , me.sale_date, me.eur_value
     <span class="hljs-keyword">FROM</span> sales me
    <span class="hljs-keyword">WHERE</span> ( ( me.employee_id <span class="hljs-operator">=</span> ? 
      <span class="hljs-keyword">AND</span> me.subsidiary_id <span class="hljs-operator">=</span> ? ) )
</code></pre>
<pre><code class="language-sql">   <span class="hljs-keyword">SELECT</span> me.sale_id, me.employee_id, me.subsidiary_id
        , me.sale_date, me.eur_value
     <span class="hljs-keyword">FROM</span> sales me
    <span class="hljs-keyword">WHERE</span> ( ( me.employee_id <span class="hljs-operator">=</span> ? 
      <span class="hljs-keyword">AND</span> me.subsidiary_id <span class="hljs-operator">=</span> ? ) )
</code></pre>
<p>PHP</p>
<p>يستخدم مثال <a href="https://www.doctrine-project.org/">Doctrine</a> واجهة باني الاستعلامات:</p>
<pre><code>$qb = $em-&gt;createQueryBuilder();
$qb-&gt;select('e')
   -&gt;from('Employees', 'e')
   -&gt;where(&quot;upper(e.last_name) like :last_name&quot;)
   -&gt;setParameter('last_name', 'WIN%');
$r = $qb-&gt;getQuery()-&gt;getResult();
foreach ($r as $row) {
   // process Employee
   foreach ($row-&gt;getSales() as $sale) {
      // process Sale for Employee
   }
}
</code></pre>
<p>ويولّد Doctrine 2.0.5 استعلامات <code>select</code> بعدد N+1:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> e0_.employee_id <span class="hljs-keyword">AS</span> employee_id0 <span class="hljs-comment">-- MORE COLUMNS</span>
  <span class="hljs-keyword">FROM</span> employees e0_
 <span class="hljs-keyword">WHERE</span> <span class="hljs-built_in">UPPER</span>(e0_.last_name) <span class="hljs-keyword">LIKE</span> ?
</code></pre>
<pre><code class="language-sql">   <span class="hljs-keyword">SELECT</span> t0.sale_id <span class="hljs-keyword">AS</span> SALE_ID1 <span class="hljs-comment">-- MORE COLUMNS</span>
     <span class="hljs-keyword">FROM</span> sales t0 
    <span class="hljs-keyword">WHERE</span> t0.subsidiary_id <span class="hljs-operator">=</span> ? 
      <span class="hljs-keyword">AND</span> t0.employee_id <span class="hljs-operator">=</span> ?
</code></pre>
<pre><code class="language-sql">   <span class="hljs-keyword">SELECT</span> t0.sale_id <span class="hljs-keyword">AS</span> SALE_ID1 <span class="hljs-comment">-- MORE COLUMNS</span>
     <span class="hljs-keyword">FROM</span> sales t0 
    <span class="hljs-keyword">WHERE</span> t0.subsidiary_id <span class="hljs-operator">=</span> ? 
      <span class="hljs-keyword">AND</span> t0.employee_id <span class="hljs-operator">=</span> ?
</code></pre>
<p>لا تولّد أدوات ORM عمليات ربط SQL — بل تستعلم من جدول <code>SALES</code> باستعلامات متداخلة. ويُعرف هذا الأثر بـ«مشكلة الاستعلامات N+1» أو باختصار «مشكلة N+1»، لأنها تنفّذ N+1 استعلاماً في المجموع إذا أعاد الاستعلام القائد N صفاً.</p>
<h4>تفعيل تسجيل SQL</h4>
<p>فعّل تسجيل SQL أثناء التطوير وراجع عبارات SQL المولَّدة.</p>
<p><a href="https://metacpan.org/release/RIBASUSHI/DBIx-Class-0.082840/view/lib/DBIx/Class/Manual/FAQ.pod#misc">DBIx::Class</a></p>
<p><code>export DBIC_TRACE=1</code> في صدفة الأوامر لديك.</p>
<p><a href="https://www.doctrine-project.org/projects/doctrine-orm/en/latest/reference/advanced-configuration.html#sql-logger-optional">Doctrine</a></p>
<p>على مستوى الشيفرة المصدرية فقط — ولا تنسَ تعطيل ذلك في بيئة الإنتاج. وفكّر في بناء مسجّل خاص بك قابل للضبط.</p>
<pre><code>$logger = new \\Doctrine\\DBAL\\Logging\\EchoSqlLogger;
$config-&gt;setSQLLogger($logger);
</code></pre>
<p>Hibernate (الأصلي)</p>
<p><code>true</code> في <code>[App.config](https://nhibernate.info/doc/howto/various/configure-log4net-for-use-with-nhibernate)</code> أو <code>hibernate.cfg.xml</code></p>
<p>JPA</p>
<p>في <code>persistence.xml</code> لكن حسب مزوّد JPA — مثلاً لـ<a href="https://wiki.eclipse.org/EclipseLink/Examples/JPA/Logging">eclipselink</a> و<a href="https://docs.hibernate.org/orm/current/userguide/html_single/#_sql_statement_logging">Hibernate</a> و<a href="https://openjpa.apache.org/builds/3.2.2/apache-openjpa/docs/#ref_guide_logging">OpenJPA</a>:</p>
<pre><code>&lt;property name=&quot;eclipselink.logging.level&quot; value=&quot;FINE&quot;/&gt;
&lt;property name=&quot;hibernate.show_sql&quot; value=&quot;TRUE&quot;/&gt;
&lt;property name=&quot;openjpa.Log&quot; value=&quot;SQL=TRACE&quot;/&gt;
</code></pre>
<p>وتقدّم معظم أدوات ORM طريقة برمجية لتفعيل تسجيل SQL أيضاً، لكن ذلك ينطوي على خطر نشر الإعداد في الإنتاج عن غير قصد.</p>
<p>ومع أن نهج «الاستعلامات المتداخلة» نمط مضاد، فإنه لا يزال يشرح ربط <em>الحلقات المتداخلة</em> شرحاً جيداً؛ فقاعدة البيانات تنفّذ الربط كما تفعله أدوات ORM أعلاه تماماً. ولذلك فإن الفهرسة من أجل ربط الحلقات المتداخلة تشبه الفهرسة من أجل عبارات <code>select</code> المعروضة أعلاه؛ أي <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-functions/index">فهرس قائم على الدوال</a> على جدول <code>EMPLOYEES</code> و<a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-the-equals-operator-concatenated-keys/index">فهرس مُدمج</a> لمُسندات الربط على جدول <code>SALES</code>:</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX emp_up_name <span class="hljs-keyword">ON</span> employees (<span class="hljs-built_in">UPPER</span>(last_name))
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX sales_emp <span class="hljs-keyword">ON</span> sales (subsidiary_id, employee_id)
</code></pre>
<p>وربط SQL لا يزال أكفأ من نهج الاستعلامات المتداخلة — حتى لو نفّذ عمليات البحث نفسها في الفهرس — لأنه يتجنّب كثيراً من اتصالات الشبكة. بل يصبح أسرع إذا كانت كمية البيانات المنقولة أكبر بسبب تكرار خصائص الموظف في كل عملية بيع. والسبب بعدا الأداء: <a href="/arabic-cs-library/book/use-the-index-luke/sql-testing-scalability-response-time-throughput-scaling-horizontal/index">زمن الاستجابة والإنتاجية</a>؛ ونسميهما في شبكات الحواسيب <em>زمن الاستجابة</em> و<em>عرض النطاق</em>. ولعرض النطاق أثر ضئيل في زمن الاستجابة، أما أزمنة الاستجابة فأثرها هائل. ويعني ذلك أن عدد رحلات الذهاب والإياب إلى قاعدة البيانات أهم لزمن الاستجابة من كمية البيانات المنقولة.</p>
<h4>نصيحة</h4>
<p>نفّذ عمليات الربط في قاعدة البيانات.</p>
<p>تقدّم معظم أدوات ORM طريقة ما لإنشاء عمليات ربط SQL. ونمط <em>الجلب الحريص (eager fetching)</em> هو الأهم على الأرجح، ويُضبط عادةً على مستوى الخصائص في تعيينات الكيانات — مثلاً لخاصية <code>employees</code> في الصنف <code>Sales</code>. وسيربط ORM حينها جدول <code>EMPLOYEES</code> دائماً عند الوصول إلى جدول <code>SALES</code>. ولا يكون ضبط الجلب الحريص في تعيينات الكيانات منطقياً إلا إذا كنت تحتاج تفاصيل الموظف مع بيانات المبيعات دائماً.</p>
<p>والجلب الحريص ضار إذا لم تكن تحتاج السجلات الابنة في كل مرة تصل فيها إلى الكائن الأب. وفي تطبيق دليل هاتف مثلاً، لا معنى لتحميل سجلات <code>SALES</code> عند عرض تفاصيل الموظف؛ وقد تحتاج بيانات المبيعات المرتبطة في حالات أخرى — لكن ليس دائماً. والضبط الساكن ليس حلاً.</p>
<p>وللأداء الأمثل، تحتاج إلى تحكم كامل في عمليات الربط. وتعرض الأمثلة التالية كيفية الحصول على أقصى مرونة بالتحكم في سلوك الربط في زمن التشغيل.</p>
<p>Javaتوفّر واجهة JPA ‏<a href="https://docs.oracle.com/javaee/6/api/javax/persistence/criteria/CriteriaBuilder.html"><code>CriteriaBuilder</code></a> الدالة <code>Root&lt;&gt;.fetch()</code> للتحكم في عمليات الربط، وتتيح تحديد متى وكيف تُربط الكائنات المشار إليها بالاستعلام الرئيسي. وفي هذا المثال نستخدم ربطاً أيسر لاسترجاع جميع الموظفين حتى لو لم يكن لبعضهم مبيعات.</p>
<h4>تحذير</h4>
<p>يعيد JPA وHibernate الموظفين <em>مقابل كل عملية بيع.</em></p>
<p>ويعني ذلك أن موظفاً له 30 عملية بيع سيظهر 30 مرة. ومع أن ذلك مزعج جداً، فهو السلوك المحدد في (<a href="https://download.oracle.com/otndocs/jcp/ejb-3_0-fr-eval-oth-JSpec/">EJB 3.0 persistency، الفقرة 4.4.5.3 «Fetch Joins»</a>). ويمكنك إما إزالة تكرار علاقة الأب يدوياً، مثلاً باستخدام <a href="https://developer.jboss.org/docs/DOC-15782#jive_content_id_Hibernate_does_not_return_distinct_results_for_a_query_with_outer_join_fetching_enabled_for_a_collection_even_if_I_use_the_distinct_keyword"><code>LinkedHashSet</code></a>، وإما استخدام الدالة <code>distinct()</code> كما في المثال.</p>
<pre><code>CriteriaBuilder qb = em.getCriteriaBuilder();
CriteriaQuery&lt;Employees&gt; q = qb.createQuery(Employees.class);
Root&lt;Employees&gt; r = q.from(Employees.class); 
q.where(queryBuilder.like(
    queryBuilder.upper(r.get(Employees_.lastName)),
    &quot;WIN%&quot;)
);

r.fetch(&quot;sales&quot;, JoinType.LEFT);
// needed to avoid duplication of Employee records
q.distinct(true);

List&lt;Employees&gt; emp = em.createQuery(q).getResultList();
</code></pre>
<p>ويولّد Hibernate 3.6.0 عبارة SQL التالية:</p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> <span class="hljs-keyword">distinct</span> 
       employees0_.subsidiary_id <span class="hljs-keyword">as</span> subsidiary1_0_0_
     , employees0_.employee_id <span class="hljs-keyword">as</span> employee2_0_0_
       <span class="hljs-comment">-- MORE COLUMNS</span>
     , sales1_.sale_id <span class="hljs-keyword">as</span> sale1_0__
  <span class="hljs-keyword">from</span> employees employees0_
  <span class="hljs-keyword">left</span> <span class="hljs-keyword">outer</span> <span class="hljs-keyword">join</span> sales sales1_ 
          <span class="hljs-keyword">on</span> employees0_.subsidiary_id<span class="hljs-operator">=</span>sales1_.subsidiary_id
         <span class="hljs-keyword">and</span> employees0_.employee_id<span class="hljs-operator">=</span>sales1_.employee_id 
 <span class="hljs-keyword">where</span> <span class="hljs-built_in">upper</span>(employees0_.last_name) <span class="hljs-keyword">like</span> ?
</code></pre>
<p>يحتوي الاستعلام على الربط الأيسر المتوقع، لكنه يحتوي أيضاً على الكلمة المفتاحية <code>distinct</code> غير الضرورية. وللأسف لا يوفر JPA استدعاءات API منفصلة لترشيح مدخلات الأب المكرّرة دون إزالة تكرار السجلات الابنة أيضاً. والكلمة المفتاحية <code>distinct</code> في استعلام SQL مثيرة للقلق لأن معظم قواعد البيانات سترشّح السجلات المكرّرة فعلاً؛ وقليل من قواعد البيانات فقط تدرك أن المفاتيح الأساسية تضمن الفرادة في هذه الحالة على أي حال.</p>
<p>وتحل واجهة Hibernate الأصلية المشكلة من جهة العميل باستخدام محوّل مجموعة النتائج:</p>
<pre><code>Criteria c = session.createCriteria(Employees.class);
c.add(Restrictions.ilike(&quot;lastName&quot;, 'Win%'));

c.setFetchMode(&quot;sales&quot;, FetchMode.JOIN);
c.setResultTransformer(Criteria.DISTINCT_ROOT_ENTITY);

List&lt;Employees&gt; result = c.list();
</code></pre>
<p>وهو يولّد الاستعلام التالي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> this_.subsidiary_id <span class="hljs-keyword">as</span> subsidiary1_0_1_
     , this_.employee_id <span class="hljs-keyword">as</span> employee2_0_1_
       <span class="hljs-comment">-- MORE this_ columns on employees</span>
     , sales2_.sale_id <span class="hljs-keyword">as</span> sale1_3_
       <span class="hljs-comment">-- MORE sales2_ columns on sales</span>
  <span class="hljs-keyword">from</span> employees this_ 
  <span class="hljs-keyword">left</span> <span class="hljs-keyword">outer</span> <span class="hljs-keyword">join</span> sales sales2_ 
          <span class="hljs-keyword">on</span> this_.subsidiary_id<span class="hljs-operator">=</span>sales2_.subsidiary_id 
         <span class="hljs-keyword">and</span> this_.employee_id<span class="hljs-operator">=</span>sales2_.employee_id 
 <span class="hljs-keyword">where</span> <span class="hljs-built_in">lower</span>(this_.last_name) <span class="hljs-keyword">like</span> ?
</code></pre>
<p>تنتج هذه الطريقة SQL مباشراً دون جمل غير مقصودة. لاحظ أن Hibernate يستخدم <code>lower()</code> للاستعلامات غير الحسّاسة لحالة الأحرف — وهي تفصيلة مهمة لـ<a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-functions/index">الفهرسة القائمة على الدوال</a>.</p>
<p>Perl</p>
<p>يستخدم المثال التالي إطار <a href="https://metacpan.org/dist/DBIx-Class">DBIx::Class</a> في Perl:</p>
<pre><code>my @employees = 
   $schema-&gt;resultset('Employees')
          -&gt;search({ 'UPPER(last_name)' =&gt; {-like =&gt; 'WIN%'}
                   , {prefetch =&gt; ['sales']}
                   });
</code></pre>
<p>ويولّد DBIx::Class 0.08192 عبارة SQL التالية:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> me.employee_id, me.subsidiary_id, me.last_name
       <span class="hljs-comment">-- MORE COLUMNS</span>
  <span class="hljs-keyword">FROM</span> employees me 
  <span class="hljs-keyword">LEFT</span> <span class="hljs-keyword">JOIN</span> sales sales 
         <span class="hljs-keyword">ON</span> (sales.employee_id   <span class="hljs-operator">=</span> me.employee_id 
        <span class="hljs-keyword">AND</span>  sales.subsidiary_id <span class="hljs-operator">=</span> me.subsidiary_id) 
 <span class="hljs-keyword">WHERE</span> ( <span class="hljs-built_in">UPPER</span>(last_name) <span class="hljs-keyword">LIKE</span> ? )
 <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sales.employee_id, sales.subsidiary_id
</code></pre>
<p>لاحظ جملة <code>order by</code> — فالتطبيق لم يطلبها. ويجب على قاعدة البيانات فرز مجموعة النتائج وفقها، وقد يستغرق ذلك وقتاً.</p>
<p>PHP</p>
<p>يستخدم المثال التالي إطار <a href="https://www.doctrine-project.org/">Doctrine</a> في PHP:</p>
<pre><code>$qb = $em-&gt;createQueryBuilder();
$qb-&gt;select('e,s')
   -&gt;from('Employees', 'e')
   -&gt;leftJoin('e.sales', 's')
   -&gt;where(&quot;upper(e.last_name) like :last_name&quot;)
   -&gt;setParameter('last_name', 'WIN%');
$r = $qb-&gt;getQuery()-&gt;getResult();
</code></pre>
<p>ويولّد Doctrine 2.0.5 عبارة SQL التالية:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> e0_.employee_id <span class="hljs-keyword">AS</span> employee_id0
       <span class="hljs-comment">-- MORE COLUMNS</span>
  <span class="hljs-keyword">FROM</span> employees e0_ 
  <span class="hljs-keyword">LEFT</span> <span class="hljs-keyword">JOIN</span> sales s1_ 
         <span class="hljs-keyword">ON</span> e0_.subsidiary_id <span class="hljs-operator">=</span> s1_.subsidiary_id 
        <span class="hljs-keyword">AND</span> e0_.employee_id <span class="hljs-operator">=</span> s1_.employee_id 
 <span class="hljs-keyword">WHERE</span> <span class="hljs-built_in">UPPER</span>(e0_.last_name) <span class="hljs-keyword">LIKE</span> ?
</code></pre>
<p>وتُظهر خطة التنفيذ عملية <code>NESTED LOOPS OUTER</code>:</p>
<p>Db2 (LUW)</p>
<pre><code>Explain Plan
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
 6 - START ($INTERNAL_FUNC$() &lt;= Q1.LAST_NAME)
      STOP (Q1.LAST_NAME &lt;= $INTERNAL_FUNC$())
      SARG (Q1.LAST_NAME LIKE ?)
 8 - START (Q2.SUBSIDIARY_ID = Q3.SUBSIDIARY_ID)
     START (Q2.EMPLOYEE_ID = Q3.EMPLOYEE_ID)
      STOP (Q2.SUBSIDIARY_ID = Q3.SUBSIDIARY_ID)
      STOP (Q2.EMPLOYEE_ID = Q3.EMPLOYEE_ID)
</code></pre>
<p>أُزيل <code>UPPER</code> من جملة <code>where</code> للحصول على النتيجة المتوقعة.</p>
<p>Oracle</p>
<pre><code>---------------------------------------------------------------
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
  3 - access(UPPER(&quot;LAST_NAME&quot;) LIKE 'WIN%')
      filter(UPPER(&quot;LAST_NAME&quot;) LIKE 'WIN%')
  5 - access(&quot;E0_&quot;.&quot;SUBSIDIARY_ID&quot;=&quot;S1_&quot;.&quot;SUBSIDIARY_ID&quot;(+)
        AND  &quot;E0_&quot;.&quot;EMPLOYEE_ID&quot;  =&quot;S1_&quot;.&quot;EMPLOYEE_ID&quot;(+))
</code></pre>
<p>تسترجع قاعدة البيانات النتيجة من جدول <code>EMPLOYEES</code> عبر <code>EMP_UP_NAME</code> أولاً، ثم تجلب السجلات المقابلة من جدول <code>SALES</code> لكل موظف بعد ذلك.</p>
<h4>نصيحة</h4>
<p>تعرّف على ORM لديك وتحكّم في عمليات الربط.</p>
<p>تقدّم أدوات ORM المختلفة طرقاً مختلفة للتحكم في سلوك الربط. والجلب الحريص مثال واحد لا تقدّمه كل أداة ربط كائنية-علائقية حتى. ومن الممارسات الجيدة تنفيذ مجموعة صغيرة من العينات تستكشف قدرات ORM لديك؛ فهي ليست تمريناً جيداً فحسب، بل تصلح مرجعاً أثناء التطوير، وستُظهر لك سلوكاً غير متوقع — مثل تكرار سجلات الأب كأثر جانبي لاستخدام عمليات الربط. <a href="https://use-the-index-luke.com/samples/use-the-index-luke-samples.zip">نزّل العينات</a> للبدء.</p>
<p>ويقدّم الربط بالحلقات المتداخلة أداءً جيداً إذا أعاد الاستعلام القائد مجموعة نتائج صغيرة. وإلا فقد يختار المُحسِّن خوارزمية ربط مختلفة تماماً — مثل الربط بالتجزئة الموصوف في القسم التالي — لكن ذلك ممكن فقط إذا استخدم التطبيق عملية ربط ليخبر قاعدة البيانات بالبيانات التي يحتاج إليها فعلاً.</p>
<h4>روابط</h4>
<ul>
<li><a href="https://use-the-index-luke.com/samples/use-the-index-luke-samples.zip">عينات Java وPerl وPHP الكاملة [ZIP]</a></li>
<li><a href="/arabic-cs-library/book/use-the-index-luke/sql-example-schema/index">عبارات <code>CREATE</code> و<code>INSERT</code> الخاصة بالعينات</a></li>
<li>مقال: «<a href="https://blog.fatalmind.com/2009/12/22/latency-security-vs-performance/">زمن الاستجابة: الأمان مقابل الأداء</a>» عن أزمنة استجابة الشبكة وتطبيقات SQL.</li>
</ul>
`,r={book:s,chapter:e,chapterTitle:a,slug:n,title:l,headings:p,html:o};export{s as book,e as chapter,a as chapterTitle,r as default,p as headings,o as html,n as slug,l as title};
