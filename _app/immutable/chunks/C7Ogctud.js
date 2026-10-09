const s="use-the-index-luke",a="sql-where-clause-obfuscation-dates",n="أنواع التاريخ",e="index",p="أنواع التاريخ",l=[{depth:2,id:"like-على-أنواع-التاريخ",text:"LIKE على أنواع التاريخ"}],c=`<p>تتعلق معظم حالات التشويش (obfuscation) بأنواع <code>DATE</code>. وقاعدة بيانات Oracle معرّضة لذلك بوجه خاص لأن لديها نوع <code>DATE</code> واحداً فقط يتضمن دائماً مكوّن وقت أيضاً.</p>
<p>وقد صار من الممارسات الشائعة استخدام الدالة <code>TRUNC</code> لإزالة مكوّن الوقت. وفي الحقيقة لا يزيل هذا مكوّن الوقت بل يضبطه على منتصف الليل، لأن قاعدة بيانات Oracle ليس لديها نوع <code>DATE</code> خالص. ولتجاهل مكوّن الوقت في بحث ما، يمكنك استخدام الدالة <code>TRUNC</code> على طرفَي المقارنة — مثلاً للبحث عن مبيعات الأمس:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> ...
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">WHERE</span> TRUNC(sale_date) <span class="hljs-operator">=</span> TRUNC(sysdate <span class="hljs-operator">-</span> <span class="hljs-type">INTERVAL</span> <span class="hljs-string">&#x27;1&#x27;</span> <span class="hljs-keyword">DAY</span>)
</code></pre>
<p>إنها عبارة سليمة وصحيحة تماماً، لكنها لا تستطيع استخدام فهرس على <code>SALE_DATE</code> استخداماً سليماً. والأمر كما شُرح في <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-functions-case-insensitive-search/index">«<em>البحث غير الحسّاس لحالة الأحرف باستخدام <code>UPPER</code> أو <code>LOWER</code></em>»</a>؛ فـ<code>TRUNC(sale_date)</code> شيء مختلف تماماً عن <code>SALE_DATE</code> — فالدوال بالنسبة إلى قاعدة البيانات صناديق سوداء.</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=sec-obfuscated-dates&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<p>وهناك حل بسيط إلى حد ما لهذه المشكلة: <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-functions/index">فهرس قائم على الدوال</a>.</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX index_name
          <span class="hljs-keyword">ON</span> sales (TRUNC(sale_date))
</code></pre>
<p>لكن يجب عليك حينها استخدام <code>TRUNC(sale_date)</code> دائماً في جملة <code>where</code>. وإذا استخدمته على نحو غير متسق — تارةً مع <code>TRUNC</code> وتارةً بدونه — فستحتاج إلى فهرسين!</p>
<p>وتحدث المشكلة أيضاً مع قواعد البيانات التي لديها نوع تاريخ خالص إذا بحثت عن فترة أطول كما في استعلام MySQL التالي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> ...
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">WHERE</span> DATE_FORMAT(sale_date, &quot;%Y-%M&quot;)
     <span class="hljs-operator">=</span> DATE_FORMAT(now()    , &quot;%Y-%M&quot;)
</code></pre>
<p>يستخدم الاستعلام صيغة تاريخ تحتوي السنة والشهر فقط؛ ومرة أخرى، هذا استعلام صحيح تماماً لكنه يعاني المشكلة نفسها السابقة. غير أن الحل أعلاه لا ينطبق على MySQL قبل الإصدار 5.7، لأن MySQL لم تكن تدعم الفهرسة القائمة على الدوال قبل ذلك.</p>
<p>والبديل هو استخدام شرط نطاق صريح. وهذا حل عام يعمل مع جميع قواعد البيانات:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> ...
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">WHERE</span> sale_date <span class="hljs-keyword">BETWEEN</span> quarter_begin(?) 
                     <span class="hljs-keyword">AND</span> quarter_end(?)
</code></pre>
<p>وإذا كنت قد أدّيت واجباتك، فستتعرف على النمط من <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-functions-user-defined-functions/index#think-age-index">تمرين جميع الموظفين الذين أعمارهم 42 سنة</a>.</p>
<p>ويكفي فهرس مباشر على <code>SALE_DATE</code> لتحسين هذا الاستعلام؛ إذ تحسب الدالتان <code>QUARTER_BEGIN</code> و<code>QUARTER_END</code> تاريخَي الحدّين. وقد يصبح الحساب معقداً بعض الشيء لأن <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-searching-for-ranges-greater-less-between-tuning-sql-access-filter-predicates/index#para-between">المعامل <code>between</code> يتضمن دائماً قيمتَي الحدّين</a>. ولذلك يجب أن تعيد الدالة <code>QUARTER_END</code> طابعاً زمنياً قبل اليوم الأول من الربع التالي مباشرةً إذا كان <code>SALE_DATE</code> يحتوي مكوّن وقت. ويمكن إخفاء هذا المنطق داخل الدالة.</p>
<p>وتعرض الأمثلة التالية تطبيقات الدالتين <code>QUARTER_BEGIN</code> و<code>QUARTER_END</code> في قواعد بيانات مختلفة.</p>
<p>Db2 (LUW)</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">FUNCTION</span> quarter_begin(dt <span class="hljs-type">TIMESTAMP</span>)
<span class="hljs-keyword">RETURNS</span> <span class="hljs-type">TIMESTAMP</span>
<span class="hljs-keyword">RETURN</span> TRUNC(dt, <span class="hljs-string">&#x27;Q&#x27;</span>)
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">FUNCTION</span> quarter_end(dt <span class="hljs-type">TIMESTAMP</span>)
<span class="hljs-keyword">RETURNS</span> <span class="hljs-type">TIMESTAMP</span>
<span class="hljs-keyword">RETURN</span> TRUNC(dt, <span class="hljs-string">&#x27;Q&#x27;</span>) <span class="hljs-operator">+</span> <span class="hljs-number">3</span> MONTHS <span class="hljs-operator">-</span> <span class="hljs-number">1</span> <span class="hljs-keyword">SECOND</span>
</code></pre>
<p>MySQL</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">FUNCTION</span> quarter_begin(dt DATETIME)
<span class="hljs-keyword">RETURNS</span> DATETIME <span class="hljs-keyword">DETERMINISTIC</span>
<span class="hljs-keyword">RETURN</span> <span class="hljs-keyword">CONVERT</span>
       (
         CONCAT
         ( <span class="hljs-keyword">CONVERT</span>(<span class="hljs-keyword">YEAR</span>(dt),<span class="hljs-type">CHAR</span>(<span class="hljs-number">4</span>))
         , <span class="hljs-string">&#x27;-&#x27;</span>
         , <span class="hljs-keyword">CONVERT</span>(QUARTER(dt)<span class="hljs-operator">*</span><span class="hljs-number">3</span><span class="hljs-number">-2</span>,<span class="hljs-type">CHAR</span>(<span class="hljs-number">2</span>))
         , <span class="hljs-string">&#x27;-01&#x27;</span>
         )
       , datetime
       )
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">FUNCTION</span> quarter_end(dt DATETIME)
<span class="hljs-keyword">RETURNS</span> DATETIME <span class="hljs-keyword">DETERMINISTIC</span>
<span class="hljs-keyword">RETURN</span> DATE_ADD
       ( DATE_ADD ( quarter_begin(dt), <span class="hljs-type">INTERVAL</span> <span class="hljs-number">3</span> <span class="hljs-keyword">MONTH</span> )
       , <span class="hljs-type">INTERVAL</span> <span class="hljs-number">-1</span> MICROSECOND)
</code></pre>
<p>Oracle</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">FUNCTION</span> quarter_begin(dt <span class="hljs-keyword">IN</span> <span class="hljs-type">DATE</span>) 
<span class="hljs-keyword">RETURN</span> <span class="hljs-type">DATE</span>
<span class="hljs-keyword">AS</span>
<span class="hljs-keyword">BEGIN</span>
   <span class="hljs-keyword">RETURN</span> TRUNC(dt, <span class="hljs-string">&#x27;Q&#x27;</span>);
<span class="hljs-keyword">END</span>
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">FUNCTION</span> quarter_end(dt <span class="hljs-keyword">IN</span> <span class="hljs-type">DATE</span>) 
<span class="hljs-keyword">RETURN</span> <span class="hljs-type">DATE</span>
<span class="hljs-keyword">AS</span>
<span class="hljs-keyword">BEGIN</span>
   <span class="hljs-comment">-- the Oracle DATE type has seconds resolution</span>
   <span class="hljs-comment">-- subtract one second from the first </span>
   <span class="hljs-comment">-- day of the following quarter</span>
   <span class="hljs-keyword">RETURN</span> TRUNC(ADD_MONTHS(dt, <span class="hljs-operator">+</span><span class="hljs-number">3</span>), <span class="hljs-string">&#x27;Q&#x27;</span>) 
        <span class="hljs-operator">-</span> (<span class="hljs-number">1</span><span class="hljs-operator">/</span>(<span class="hljs-number">24</span><span class="hljs-operator">*</span><span class="hljs-number">60</span><span class="hljs-operator">*</span><span class="hljs-number">60</span>));
<span class="hljs-keyword">END</span>
</code></pre>
<p>PostgreSQL</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">FUNCTION</span> quarter_begin(dt <span class="hljs-type">timestamp</span> <span class="hljs-keyword">with</span> <span class="hljs-type">time</span> zone)
<span class="hljs-keyword">RETURNS</span> <span class="hljs-type">timestamp</span> <span class="hljs-keyword">with</span> <span class="hljs-type">time</span> zone <span class="hljs-keyword">AS</span> $$
<span class="hljs-keyword">BEGIN</span>
    <span class="hljs-keyword">RETURN</span> date_trunc(<span class="hljs-string">&#x27;quarter&#x27;</span>, dt);
<span class="hljs-keyword">END</span>;
$$ <span class="hljs-keyword">LANGUAGE</span> plpgsql
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">FUNCTION</span> quarter_end(dt <span class="hljs-type">timestamp</span> <span class="hljs-keyword">with</span> <span class="hljs-type">time</span> zone)
<span class="hljs-keyword">RETURNS</span> <span class="hljs-type">timestamp</span> <span class="hljs-keyword">with</span> <span class="hljs-type">time</span> zone <span class="hljs-keyword">AS</span> $$
<span class="hljs-keyword">BEGIN</span>
   <span class="hljs-keyword">RETURN</span>   date_trunc(<span class="hljs-string">&#x27;quarter&#x27;</span>, dt) 
          <span class="hljs-operator">+</span> <span class="hljs-type">interval</span> <span class="hljs-string">&#x27;3 month&#x27;</span>
          <span class="hljs-operator">-</span> <span class="hljs-type">interval</span> <span class="hljs-string">&#x27;1 microsecond&#x27;</span>;
<span class="hljs-keyword">END</span>;
$$ <span class="hljs-keyword">LANGUAGE</span> plpgsql
</code></pre>
<p>SQL Server</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">FUNCTION</span> quarter_begin (<span class="hljs-variable">@dt</span> DATETIME )
<span class="hljs-keyword">RETURNS</span> DATETIME
<span class="hljs-keyword">BEGIN</span>
  <span class="hljs-keyword">RETURN</span> DATEADD (qq, DATEDIFF (qq, <span class="hljs-number">0</span>, <span class="hljs-variable">@dt</span>), <span class="hljs-number">0</span>)  
<span class="hljs-keyword">END</span>
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">FUNCTION</span> quarter_end (<span class="hljs-variable">@dt</span> DATETIME )
<span class="hljs-keyword">RETURNS</span> DATETIME
<span class="hljs-keyword">BEGIN</span>
  <span class="hljs-keyword">RETURN</span> DATEADD
         ( ms
         , <span class="hljs-number">-3</span> 
         , DATEADD(mm, <span class="hljs-number">3</span>, dbo.quarter_begin(<span class="hljs-variable">@dt</span>))
         );
<span class="hljs-keyword">END</span>
</code></pre>
<p>ويمكنك استخدام دوال مساعدة مماثلة لفترات أخرى — وسيكون معظمها أقل تعقيداً من الأمثلة أعلاه، خصوصاً عند استخدام شرطَي أكبر من أو يساوي (<code>&gt;=</code>) وأصغر من (<code>&lt;</code>) بدلاً من المعامل <code>between</code>. ويمكنك طبعاً حساب تاريخَي الحدّين في تطبيقك إن شئت.</p>
<h4>نصيحة</h4>
<p>اكتب استعلامات الفترات المتصلة كشرط نطاق صريح. وافعل ذلك حتى ليوم واحد — مثلاً في قاعدة بيانات Oracle:</p>
<pre><code>    sale_date &gt;= TRUNC(sysdate)
AND sale_date &lt;  TRUNC(sysdate + INTERVAL '1' DAY)
</code></pre>
<p>ومن حالات التشويش الشائعة الأخرى مقارنة التواريخ كسلاسل نصية كما في مثال PostgreSQL التالي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> ...
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">WHERE</span> TO_CHAR(sale_date, <span class="hljs-string">&#x27;YYYY-MM-DD&#x27;</span>) <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;1970-01-01&#x27;</span>
</code></pre>
<p>والمشكلة، مرة أخرى، تحويل <code>SALE_DATE</code>. وغالباً ما تُنشأ مثل هذه الشروط اعتقاداً بأنك لا تستطيع تمرير أنواع مختلفة عن الأعداد والسلاسل النصية إلى قاعدة البيانات. غير أن <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-bind-parameters/index">وسائط الربط</a> تدعم جميع أنواع البيانات؛ أي يمكنك مثلاً استخدام كائن <code>java.util.Date</code> كوسيط ربط. وهذه فائدة أخرى من فوائد وسائط الربط.</p>
<p>وإذا لم تستطع فعل ذلك، فعليك فقط تحويل قيمة البحث بدلاً من عمود الجدول:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> ...
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">WHERE</span> sale_date <span class="hljs-operator">=</span> TO_DATE(<span class="hljs-string">&#x27;1970-01-01&#x27;</span>, <span class="hljs-string">&#x27;YYYY-MM-DD&#x27;</span>)
</code></pre>
<p>يستطيع هذا الاستعلام استخدام فهرس مباشر على <code>SALE_DATE</code>، علاوة على أنه يحوّل السلسلة المدخلة مرة واحدة فقط، بينما يجب على العبارة السابقة تحويل جميع التواريخ المخزنة في الجدول قبل مقارنتها بقيمة البحث.</p>
<p>وأياً كان التغيير الذي تُجريه — استخدام وسيط ربط أو تحويل الطرف الآخر من المقارنة — فقد تُدخل خطأً بسهولة إذا كان <code>SALE_DATE</code> يحتوي مكوّن وقت. ويجب عليك في تلك الحالة استخدام شرط نطاق صريح:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> ...
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">WHERE</span> sale_date <span class="hljs-operator">&gt;=</span> TO_DATE(<span class="hljs-string">&#x27;1970-01-01&#x27;</span>, <span class="hljs-string">&#x27;YYYY-MM-DD&#x27;</span>) 
   <span class="hljs-keyword">AND</span> sale_date <span class="hljs-operator">&lt;</span>  TO_DATE(<span class="hljs-string">&#x27;1970-01-01&#x27;</span>, <span class="hljs-string">&#x27;YYYY-MM-DD&#x27;</span>) 
                  <span class="hljs-operator">+</span> <span class="hljs-type">INTERVAL</span> <span class="hljs-string">&#x27;1&#x27;</span> <span class="hljs-keyword">DAY</span>
</code></pre>
<p>فكّر دائماً في استخدام شرط نطاق صريح عند مقارنة التواريخ.</p>
<h2 id="like-على-أنواع-التاريخ"><code>LIKE</code> على أنواع التاريخ</h2>
<p>حالة التشويش التالية خادعة بوجه خاص:</p>
<pre><code>sale_date LIKE SYSDATE
</code></pre>
<p>لا تبدو تشويشاً للوهلة الأولى لأنها لا تستخدم أي دوال.</p>
<p>غير أن المعامل <code>LIKE</code> يفرض مقارنة نصية. وتبعاً لقاعدة البيانات، قد يؤدي ذلك إلى خطأ أو إلى تحويل نوع ضمني على الطرفين. ويعرض قسم «Predicate Information» في خطة التنفيذ ما تفعله قاعدة بيانات Oracle:</p>
<pre><code>filter( INTERNAL_FUNCTION(SALE_DATE)
   LIKE TO_CHAR(SYSDATE@!))
</code></pre>
<p>تحوّل الدالة <a href="https://tanelpoder.com/2013/01/16/what-the-heck-is-the-internal_function-in-execution-plan-predicate-section/"><code>INTERNAL_FUNCTION</code></a> نوع العمود <code>SALE_DATE</code>. وكأثر جانبي، تمنع أيضاً استخدام فهرس مباشر على <code>DATE_COLUMN</code> <em>تماماً كما تفعل أي دالة أخرى</em>.</p>
`,r={book:s,chapter:a,chapterTitle:n,slug:e,title:p,headings:l,html:c};export{s as book,a as chapter,n as chapterTitle,r as default,l as headings,c as html,e as slug,p as title};
