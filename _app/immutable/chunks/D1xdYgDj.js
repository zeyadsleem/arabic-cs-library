const e="use-the-index-luke",s="sql-myth-directory-dynamic-sql-is-slow",n="Dynamic SQL is Slow",a="index",r="SQL الديناميكي بطيء",t=[],p=`<p>جوهر خرافة «<em>SQL الديناميكي بطيء</em>» بسيط إلى حد ما: يمكن أن يكون SQL الديناميكي بطيئاً — عند استخدامه استخداماً خاطئاً.</p>
<p>والمشكلة أن SQL الديناميكي كثيراً ما يُستخدم لسبب خاطئ، وأحياناً حتى دون علم. ولتوضيح الالتباس، سأستخدم المصطلحات التالية كما هي مشروحة:</p>
<p>SQL المضمّن (Embedded SQL)</p>
<p>يعد تضمين SQL مباشرةً في الشيفرة المصدرية للبرنامج شائعاً جداً في لغات قواعد البيانات الإجرائية مثل Oracle PL/SQL أو Microsoft Transact-SQL، ويمكن أيضاً تضمين SQL في لغات أخرى مثل C.</p>
<p>وتكمن فائدة SQL المضمّن في تكامله السلس مع لغة البرمجة المعنية. غير أن SQL المضمّن يُترجم إلى البرنامج، فلا يمكن تغييره في زمن التشغيل — إنه ساكن.</p>
<p>SQL الديناميكي (Dynamic SQL)</p>
<p>يُتعامل مع SQL الديناميكي كسلسلة نصية داخل التطبيق، ويمكن للتطبيق تغيير سلسلة SQL في زمن التشغيل قبل تمريرها إلى طبقة قاعدة البيانات. وهو في الواقع الطريقة الأكثر شيوعاً للوصول إلى قواعد البيانات.</p>
<p>SQL الساكن (Static SQL)</p>
<p>أستخدم مصطلح <em>SQL الساكن</em> لوصف عبارات SQL التي لا تتغير في زمن التشغيل، سواء كانت SQL مضمّناً لا يمكن تغييره في زمن التشغيل، أو SQL ديناميكياً يمكن تغييره لكنه لا يُغيَّر.</p>
<p>وجوهر هذه التعريفات أن العبارة يمكن أن تكون SQL ديناميكياً وساكناً في الوقت نفسه. وبعبارة أخرى، توجد مستويات مختلفة من SQL الديناميكي. تأمّل المثال التالي:</p>
<pre><code>String sql = &quot;SELECT first_name, last_name&quot;
           + &quot;  FROM employees&quot;
           + &quot; WHERE employee_id = &quot; + employeeId;

ResultSet rs = con.executeQuery(sql);
</code></pre>
<p>هل هذا SQL ديناميكي؟ بحسب التعريف أعلاه، نعم؛ فعبارة SQL تُحضَّر كسلسلة نصية وتُمرَّر إلى طبقة قاعدة البيانات. لكن هل هو SQL ساكن أيضاً؟ بافتراض أن قيمة المتغير <code>employeeId</code> تتغير، فهو ليس SQL ساكناً لأن سلسلة SQL تتغير في زمن التشغيل. وهو مثال على SQL ديناميكي سيضرّ بالأداء فعلاً. والمشكلة ليست أنه SQL ديناميكي بل أنه لا يستخدم <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-bind-parameters/index">وسائط ربط</a>. ووسائط الربط في SQL — مثل علامة الاستفهام <code>?</code> أو <code>:name</code> — عناصر نائبة عن قيم تتغير أثناء التنفيذ. ويعني ذلك أن المثال يمكن تحويله إلى SQL ساكن باستخدام وسيط ربط بدلاً من القيمة الفعلية للمتغير <code>employeeId</code>.</p>
<h4>مهم</h4>
<p>عدم استخدام <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-bind-parameters/index">وسائط الربط</a> هو SQL ديناميكي مساء استخدامه.</p>
<p>ووسائط الربط مهمة جداً للأمان والأداء.</p>
<p>ومن الاستخدامات المعقولة لـSQL الديناميكي تغيير <em>بنية</em> العبارة في زمن التشغيل، وهو أمر <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-bind-parameters/index#note-bind-not-dynamic-sql">لا يمكن تحقيقه بوسائط الربط</a>؛ مثل جملة <code>where</code> شرطية:</p>
<pre><code>String where = &quot;&quot;;
if (subsidiaryId != null) {
   where += (where == &quot;&quot;) ? &quot; WHERE &quot; : &quot; AND &quot; 
         +  &quot;subsidiary_id = &quot; + subsidiaryId;
}
if (employeeId != null) {
   where += (where == &quot;&quot;) ? &quot; WHERE &quot; : &quot; AND &quot; 
         +  &quot;employee_id = &quot; + employeeId;
}
if (lastName != null) {
   where += (where == &quot;&quot;) ? &quot; WHERE &quot; : &quot; AND &quot; 
         +  &quot;UPPER(last_name) = '&quot;+lastName.toUpperCase()+&quot;'&quot;;
}
String SQL = &quot;SELECT employee_id, first_name, last_name &quot;
           + &quot;  FROM employees&quot; 
           +   where;
// execute SQL
</code></pre>
<p>تبني الشيفرة عبارة SQL لجلب الموظفين بناءً على أي توليفة من معايير ترشيح ثلاثة. ومع أنها غير أنيقة إلى حد ما، يمكن تنفيذ SQL المبني باستخدام أفضل فهرس متاح. ومع ذلك، هذا النهج مزعج بسبب <a href="https://en.wikipedia.org/wiki/SQL_injection#Forms_of_vulnerability">ثغرة حقن SQL</a> المحتملة وبسبب كلفة التحسين المرتفعة: إذ يجب على قاعدة البيانات إعادة إنشاء خطة التنفيذ في كل مرة، لأن قيم البحث — التي قد تختلف في كل مرة — تمنع التخزين المؤقت. ويشرح <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-bind-parameters/index"><em>الاستعلامات ذات الوسائط</em></a> كلفة التحسين بالتفصيل. ومرة أخرى، ليست المشكلة في SQL الديناميكي نفسه بل في عدم استخدام وسائط الربط.</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=myth-dynamic-sql&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<p>حُذف مثال يبني جملة <code>where</code> ديناميكياً ويستخدم وسائط الربط لأنه أعقد من المثال أعلاه. غير أن معظم أطر ORM تقدّم طريقة مريحة بما يكفي لإنشاء SQL ديناميكياً باستخدام وسائط الربط. وتعرض النظرة العامة التالية بعض الأمثلة:</p>
<p>Java</p>
<p>يوضح المثال التالي أصناف <a href="https://docs.hibernate.org/orm/6.2/userguide/html_single/#criteria">Criteria</a> في Hibernate:</p>
<pre><code>Criteria criteria = session.createCriteria(Employees.class);

if (subsidiaryId != null) {
  criteria.add(Restrictions.eq(&quot;subsidiaryId&quot;, subsidiaryId));
}
if (employeeId != null) {
  criteria.add(Restrictions.eq(&quot;employeeId&quot;, employeeId));
}
if (lastName != null) {
  criteria.add(
    Restrictions.eq(&quot;lastName&quot;, lastName).ignoreCase()
  );
}
</code></pre>
<p>عند تمرير <code>LAST_NAME</code> فقط، يولّد Hibernate عبارة SQL التالية (Oracle):</p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> this_.subsidiary_id <span class="hljs-keyword">as</span> subsidiary1_0_0_,
       [... other columns ...]
  <span class="hljs-keyword">from</span> employees this_
 <span class="hljs-keyword">where</span> <span class="hljs-built_in">lower</span>(this_.last_name)<span class="hljs-operator">=</span>?
</code></pre>
<p>لاحظ أنه يُستخدم وسيط ربط ودالة <code>LOWER</code> لتنفيذ وظيفة <a href="https://docs.hibernate.org/core/3.6/javadocs/org/hibernate/criterion/SimpleExpression.html#ignoreCase%28%29">ignoreCase()</a>. وينطبق الأمر نفسه على <a href="https://docs.hibernate.org/orm/current/userguide/html_single/#hql-like-predicate">قيد ilike</a>. وهذه حقيقة مهمة جداً لـ<a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-functions-case-insensitive-search/index">الفهرسة القائمة على الدوال</a>.</p>
<p>وللواجهة Java Persistence API (JPA) وظيفة مشابهة:</p>
<p>لكنها أقل مباشرة، ولا تدعم بحثاً أصلياً غير حسّاس لحالة الأحرف، وهذا أمر جيد على الأرجح:</p>
<pre><code>List&lt;Predicate&gt; predicates = new ArrayList&lt;Predicate&gt;();

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
</code></pre>
<p>ترى أن المثال أقل مباشرة لصالح أمان الأنواع في زمن الترجمة. ومن الفروق الأخرى أن JPA لا تدعم معاملات أصلية غير حسّاسة لحالة الأحرف، فالتحويل الصريح لحالة الأحرف لازم. وربما يكون ذلك جيداً للوعي بذلك والتحكم فيه. وكملاحظة جانبية: واجهة Hibernate الأصلية تدعم التحويل الصريح لحالة الأحرف أيضاً.</p>
<p>Perl</p>
<p>يوضح المثال التالي إطار <a href="https://metacpan.org/dist/DBIx-Class">DBIx::Class</a> في Perl:</p>
<pre><code>my @search = ();

if (defined $employee_id) {
   push @search, {employee_id =&gt; $employee_id};
}
if (defined $subsidiary_id) {
   push @search, {subsidiary_id =&gt; $subsidiary_id};
}
if (defined $last_name) {
   push @search, {'UPPER(last_name)' =&gt; uc($last_name)};
}

my @employees = $schema-&gt;resultset('Employees')
              -&gt;search({-and =&gt; \\@search});
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> me.employee_id, me.subsidiary_id,
       me.last_name,   me.first_name,
       me.date_of_birth
  <span class="hljs-keyword">FROM</span> employees me
 <span class="hljs-keyword">WHERE</span> ( <span class="hljs-built_in">UPPER</span>(last_name) <span class="hljs-operator">=</span> :p1 )
</code></pre>
<p>PHP</p>
<p>يوضح المثال التالي إطار <a href="https://www.doctrine-project.org/">Doctrine</a> في PHP:</p>
<pre><code>$filter = $qb-&gt;expr()-&gt;andx();

if (isset($employee_id)) {
   $filter-&gt;add(
       $qb-&gt;expr()-&gt;eq('e.employee_id', ':employee_id'));
   $qb-&gt;setParameter('employee_id', $employee_id);
}
if (isset($subsidiary_id)) {
   $filter-&gt;add(
       $qb-&gt;expr()-&gt;eq('e.subsidiary_id', ':subsidiary_id'));
   $qb-&gt;setParameter('subsidiary_id', $subsidiary_id);
}
if (isset($last_name)) {
   $filter-&gt;add($qb-&gt;expr()-&gt;eq(
       $qb-&gt;expr()-&gt;upper('e.last_name'), ':last_name'));
   $qb-&gt;setParameter('last_name', strtoupper($last_name));
}

if ($filter-&gt;count() &gt; 0) {
   $qb-&gt;where($filter);
}
</code></pre>
<p>يولّد Doctrine عبارة SQL التالية للبحث باسم العائلة (MySQL):</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> e0_.employee_id <span class="hljs-keyword">AS</span> employee_id0, 
       [... other columns ...]
  <span class="hljs-keyword">FROM</span> employees e0_
 <span class="hljs-keyword">WHERE</span> <span class="hljs-built_in">UPPER</span>(e0_.last_name) <span class="hljs-operator">=</span> ?
</code></pre>
<h4>نصيحة</h4>
<p>نزّل <a href="https://use-the-index-luke.com/samples/use-the-index-luke-samples.zip">الشيفرة النموذجية الكاملة</a> وجرّب بنفسك.</p>
<p>يتيح استخدام SQL الديناميكي مع وسائط الربط للمُحسِّن اختيار أفضل خطة تنفيذ للتوليفة المعنية من جمل <code>where</code>، ما يحقق أداءً أفضل من إنشاءات مثل تلك الموصوفة في <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-obfuscation-smart-logic/index"><em>المنطق الذكي</em></a>:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> first_name, last_name
  <span class="hljs-keyword">FROM</span> employees
 <span class="hljs-keyword">WHERE</span> (     employee_id <span class="hljs-operator">=</span> ? <span class="hljs-keyword">OR</span> ? <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NULL</span>)
   <span class="hljs-keyword">AND</span> (   subsidiary_id <span class="hljs-operator">=</span> ? <span class="hljs-keyword">OR</span> ? <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NULL</span>)
   <span class="hljs-keyword">AND</span> (<span class="hljs-built_in">UPPER</span>(last_name) <span class="hljs-operator">=</span> ? <span class="hljs-keyword">OR</span> ? <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NULL</span>)
</code></pre>
<p>والسبب في ملاحظة أن SQL الديناميكي بطيء هو في الغالب عدم استخدام وسائط الربط — أي استخدام SQL الديناميكي لسبب خاطئ.</p>
<p>غير أن هناك بعض الحالات — أراها نادرة — يمكن أن يكون فيها SQL الديناميكي أبطأ من «المنطق الذكي» كما في المثال أعلاه؛ وذلك عندما تُنفَّذ عبارات SQL رخيصة (سريعة) جداً بتكرار عالٍ جداً. لكن أولاً، هناك مصطلحان آخران يجب شرحهما:</p>
<p>التحليل الصلب (Hard Parsing)</p>
<p>التحليل الصلب هو بناء خطة تنفيذ انطلاقاً من عبارة SQL؛ وهو جهد كبير: فحص جميع أجزاء SQL، والنظر في جميع الفهارس، والنظر في جميع ترتيبات الربط، وهكذا. والتحليل الصلب مستهلك للموارد بشدة.</p>
<p>التحليل اللين (Soft Parsing)</p>
<p>التحليل اللين هو البحث عن خطة تنفيذ مخزنة مؤقتاً والعثور عليها واستخدامها؛ وتُجرى بعض الفحوصات الطفيفة، مثل حقوق الوصول، لكن يمكن إعادة استخدام خطة التنفيذ كما هي. وهذه عملية سريعة إلى حد ما.</p>
<p>ومفتاح الذاكرة المؤقتة هو أساساً سلسلة SQL الحرفية — وعادةً تجزئتها (hash). وإذا لم يوجد تطابق تام، يُشغَّل تحليل صلب. ولهذا تؤدي القيم الحرفية المضمّنة — خلافاً لوسائط الربط — إلى تحليل صلب ما لم تُستخدم قيم البحث نفسها مرة أخرى. وحتى في تلك الحالة، هناك احتمالات جيدة أن تكون خطة التنفيذ السابقة قد انتهت صلاحيتها في الذاكرة المؤقتة لأن خططاً جديدة ترد باستمرار.</p>
<p>ومع ذلك، توجد طريقة لتنفيذ عبارة دون أي تحليل إطلاقاً — ولا حتى تحليل لين. والحيلة هي إبقاء العبارة المحلَّلة مفتوحة، كما في شيفرة Java الزائفة التالية:</p>
<pre><code>PreparedStatement pSQL = con.prepareStatement(&quot;select ...&quot;);
for (String last_name:last_names) {
    pSQL.setString(1, last_name.toUpperCase());
    ResultSet rs = pSQL.executeQuery();
    // process result
}
pSQL.close();
</code></pre>
<p>لاحظ أن <code>PreparedStatement</code> يُفتح ويُغلق مرة واحدة فقط — ومع ذلك يمكن تنفيذه مرات كثيرة. ويعني ذلك وجود عملية تحليل واحدة فقط — أثناء التحضير — ولا شيء داخل الحلقة.</p>
<p>والمزلق أن تحويل العبارة إلى SQL ديناميكي ينقل استدعاء <code>prepareStatement</code> إلى داخل الحلقة، فيسبّب تحليلاً ليناً في كل تنفيذ. وقد تتجاوز كلفة التحليل، التي قد تشمل أيضاً زمن استجابة الشبكة، التوفير الناتج عن خطة تنفيذ أفضل عندما تُنفَّذ العبارة كثيراً وتكون سريعة على أي حال. ويصحّ ذلك بوجه خاص إذا لم تختلف خطة التنفيذ الفعلية باختلاف جمل <code>where</code> — مثلاً لوجود جملة <code>where</code> مفهرسة جيداً دائماً.</p>
<p>ومع أن حيلة «التحضير قبل الحلقة» نادراً ما تُستخدم صراحةً، فهي شائعة جداً في الإجراءات المخزنة — لكنها ضمنية. فاللغات مثل PL/SQL — مع SQL الساكن الحقيقي — تحضّر SQL عند ترجمة الإجراء أو مرة واحدة لكل تنفيذ على الأكثر. وتحويل ذلك إلى SQL ديناميكي قد يقتل الأداء بسهولة.</p>
<h4>نصيحة</h4>
<ul>
<li><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-bind-parameters/index">الاستخدام الصحيح لوسائط الربط</a></li>
<li>مقال: «<a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-searching-for-ranges-greater-less-between-tuning-sql-access-filter-predicates/index">التخطيط لإعادة الاستخدام</a>» حول تخزين خطط التنفيذ مؤقتاً</li>
<li><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-obfuscation-smart-logic/index">تجنّب المنطق الذكي لجمل <code>where</code> الشرطية</a></li>
</ul>
`,l={book:e,chapter:s,chapterTitle:n,slug:a,title:r,headings:t,html:p};export{e as book,s as chapter,n as chapterTitle,l as default,t as headings,p as html,a as slug,r as title};
