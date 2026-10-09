const s="use-the-index-luke",a="sql-example-schema-sql-server-where-clause",n="SQL Server سكربتات المثال لـ «بَند WHERE»",p="index",l="سكربتات SQL Server لـ«جملة WHERE»",e=[{depth:2,id:"معامل-المساواة",text:"معامل المساواة"},{depth:3,id:"المفاتيح-البديلة",text:"المفاتيح البديلة"},{depth:3,id:"المفاتيح-المدمجة",text:"المفاتيح المُدمجة"},{depth:2,id:"الدوال",text:"الدوال"},{depth:2,id:"الفهارس-المرشحة-الجزئية",text:"الفهارس المُرشَّحة (الجزئية)"}],r=`<h2 id="معامل-المساواة">معامل المساواة</h2>
<h3 id="المفاتيح-البديلة">المفاتيح البديلة</h3>
<p>ينشئ السكربت التالي جدول <code>EMPLOYEES</code> بألف مدخل.</p>
<p>ولتوليد بيانات عشوائية، يُستخدم زوج عرض/دالة لتجاوز ميزة SQL Server القائلة «جميع الدوال المعرّفة من المستخدم حتمية».</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> employees (
    employee_id   <span class="hljs-type">NUMERIC</span>       <span class="hljs-keyword">NOT NULL</span>,
    first_name    <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">1000</span>) <span class="hljs-keyword">NOT NULL</span>,
    last_name     <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">900</span>)  <span class="hljs-keyword">NOT NULL</span>,
    date_of_birth <span class="hljs-type">DATE</span>                   ,
    phone_number  <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">1000</span>) <span class="hljs-keyword">NOT NULL</span>,
    junk          <span class="hljs-type">CHAR</span>(<span class="hljs-number">1000</span>)             ,
    <span class="hljs-keyword">CONSTRAINT</span> employees_pk
       <span class="hljs-keyword">PRIMARY KEY</span> NONCLUSTERED (employee_id)
);
GO
</code></pre>
<pre><code class="language-sql">IF OBJECT_ID(<span class="hljs-string">&#x27;rand_helper&#x27;</span>) <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NOT NULL</span>
   <span class="hljs-keyword">DROP</span> <span class="hljs-keyword">VIEW</span> rand_helper;
GO

<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">VIEW</span> rand_helper <span class="hljs-keyword">AS</span> <span class="hljs-keyword">SELECT</span> RND<span class="hljs-operator">=</span>RAND();
GO
</code></pre>
<pre><code class="language-sql">IF OBJECT_ID(<span class="hljs-string">&#x27;random_string&#x27;</span>) <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NOT NULL</span>
   <span class="hljs-keyword">DROP</span> <span class="hljs-keyword">FUNCTION</span> random_string;
GO

<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">FUNCTION</span> random_string (<span class="hljs-variable">@maxlen</span> <span class="hljs-type">int</span>)
   <span class="hljs-keyword">RETURNS</span> <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">255</span>)
<span class="hljs-keyword">AS</span> <span class="hljs-keyword">BEGIN</span>
   <span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@rv</span> <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">255</span>)
   <span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@loop</span> <span class="hljs-type">int</span>
   <span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@len</span> <span class="hljs-type">int</span>

   <span class="hljs-keyword">SET</span> <span class="hljs-variable">@len</span> <span class="hljs-operator">=</span> (<span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">CAST</span>(rnd <span class="hljs-operator">*</span> (<span class="hljs-variable">@maxlen</span><span class="hljs-number">-3</span>) <span class="hljs-keyword">AS</span> <span class="hljs-type">INT</span>) <span class="hljs-operator">+</span> <span class="hljs-number">3</span>
                 <span class="hljs-keyword">FROM</span> rand_helper)
   <span class="hljs-keyword">SET</span> <span class="hljs-variable">@rv</span> <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;&#x27;</span>
   <span class="hljs-keyword">SET</span> <span class="hljs-variable">@loop</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>

   WHILE <span class="hljs-variable">@loop</span> <span class="hljs-operator">&lt;</span> <span class="hljs-variable">@len</span> <span class="hljs-keyword">BEGIN</span>
      <span class="hljs-keyword">SET</span> <span class="hljs-variable">@rv</span> <span class="hljs-operator">=</span> <span class="hljs-variable">@rv</span> 
              <span class="hljs-operator">+</span> <span class="hljs-type">CHAR</span>(<span class="hljs-built_in">CAST</span>((<span class="hljs-keyword">SELECT</span> rnd <span class="hljs-operator">*</span> <span class="hljs-number">26</span>
                             <span class="hljs-keyword">FROM</span> rand_helper) <span class="hljs-keyword">AS</span> <span class="hljs-type">INT</span> )<span class="hljs-operator">+</span><span class="hljs-number">97</span>)
      IF <span class="hljs-variable">@loop</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span> <span class="hljs-keyword">BEGIN</span>
          <span class="hljs-keyword">SET</span> <span class="hljs-variable">@rv</span> <span class="hljs-operator">=</span> <span class="hljs-built_in">UPPER</span>(<span class="hljs-variable">@rv</span>)
      <span class="hljs-keyword">END</span>
      <span class="hljs-keyword">SET</span> <span class="hljs-variable">@loop</span> <span class="hljs-operator">=</span> <span class="hljs-variable">@loop</span> <span class="hljs-operator">+</span><span class="hljs-number">1</span>;
   <span class="hljs-keyword">END</span>

   <span class="hljs-keyword">RETURN</span> <span class="hljs-variable">@rv</span>
<span class="hljs-keyword">END</span>
GO
</code></pre>
<pre><code class="language-sql">IF OBJECT_ID(<span class="hljs-string">&#x27;random_date&#x27;</span>) <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NOT NULL</span>
   <span class="hljs-keyword">DROP</span> <span class="hljs-keyword">FUNCTION</span> random_date;
GO

<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">FUNCTION</span> random_date (<span class="hljs-variable">@mindays</span> <span class="hljs-type">int</span>, <span class="hljs-variable">@maxdays</span> <span class="hljs-type">int</span>) 
   <span class="hljs-keyword">RETURNS</span> <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">255</span>)
<span class="hljs-keyword">AS</span> <span class="hljs-keyword">BEGIN</span>
   <span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@rv</span> <span class="hljs-type">date</span>
   <span class="hljs-keyword">SET</span> <span class="hljs-variable">@rv</span> <span class="hljs-operator">=</span> (<span class="hljs-keyword">SELECT</span> GetDate() 
                   <span class="hljs-operator">-</span> rnd <span class="hljs-operator">*</span> (<span class="hljs-variable">@maxdays</span><span class="hljs-operator">-</span><span class="hljs-variable">@mindays</span>)
                   <span class="hljs-operator">-</span> <span class="hljs-variable">@mindays</span>
                <span class="hljs-keyword">FROM</span> rand_helper)
   <span class="hljs-keyword">RETURN</span> <span class="hljs-variable">@rv</span>
<span class="hljs-keyword">END</span>
GO
</code></pre>
<pre><code class="language-sql">IF OBJECT_ID(<span class="hljs-string">&#x27;random_int&#x27;</span>) <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NOT NULL</span>
   <span class="hljs-keyword">DROP</span> <span class="hljs-keyword">FUNCTION</span> random_int;
GO

<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">FUNCTION</span> random_int (<span class="hljs-variable">@min</span> <span class="hljs-type">int</span>, <span class="hljs-variable">@max</span> <span class="hljs-type">int</span>)
   <span class="hljs-keyword">RETURNS</span> <span class="hljs-type">INT</span>
<span class="hljs-keyword">AS</span> <span class="hljs-keyword">BEGIN</span>
   <span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@rv</span> <span class="hljs-type">INT</span>
   <span class="hljs-keyword">SET</span> <span class="hljs-variable">@rv</span> <span class="hljs-operator">=</span> (<span class="hljs-keyword">SELECT</span> rnd <span class="hljs-operator">*</span> (<span class="hljs-variable">@max</span>) <span class="hljs-operator">+</span> <span class="hljs-variable">@min</span>
                <span class="hljs-keyword">FROM</span> rand_helper)
   <span class="hljs-keyword">RETURN</span> <span class="hljs-variable">@rv</span>
<span class="hljs-keyword">END</span>
GO
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">WITH</span> generator (n) <span class="hljs-keyword">AS</span>
( <span class="hljs-keyword">SELECT</span> <span class="hljs-number">1</span>
   <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span>
  <span class="hljs-keyword">SELECT</span> n <span class="hljs-operator">+</span> <span class="hljs-number">1</span> <span class="hljs-keyword">FROM</span> generator
<span class="hljs-keyword">WHERE</span> n <span class="hljs-operator">&lt;</span> <span class="hljs-number">1000</span>
)
<span class="hljs-keyword">INSERT INTO</span> employees (employee_id
                     , first_name, last_name
                     , date_of_birth, phone_number, junk)
<span class="hljs-keyword">select</span> n employee_id
     , [dbo].random_string(<span class="hljs-number">11</span>) first_name
     , [dbo].random_string(<span class="hljs-number">11</span>) last_name  
     , [dbo].random_date(<span class="hljs-number">20</span><span class="hljs-operator">*</span><span class="hljs-number">365</span>, <span class="hljs-number">60</span><span class="hljs-operator">*</span><span class="hljs-number">365</span>) dob
     , <span class="hljs-string">&#x27;N/A&#x27;</span> phone
     , <span class="hljs-string">&#x27;junk&#x27;</span> junk
  <span class="hljs-keyword">from</span> generator
OPTION (MAXRECURSION <span class="hljs-number">1000</span>)
GO
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">UPDATE</span> employees 
   <span class="hljs-keyword">SET</span> first_name<span class="hljs-operator">=</span><span class="hljs-string">&#x27;Markus&#x27;</span>, 
       last_name<span class="hljs-operator">=</span><span class="hljs-string">&#x27;Winand&#x27;</span>
 <span class="hljs-keyword">WHERE</span> employee_id<span class="hljs-operator">=</span><span class="hljs-number">123</span>;

<span class="hljs-keyword">exec</span> sp_updatestats;
GO
</code></pre>
<p>ملاحظات:</p>
<ul>
<li>يُستخدم العمود <code>JUNK</code> للحصول على طول صف واقعي. ولأن نوع بياناته <code>CHAR</code> لا <code>VARCHAR2</code>، فهو يحتاج دائماً إلى الـ1000 بايت التي يتسع لها. ولولا هذا العمود لصار الجدول صغيراً بصورة غير واقعية ولما نجحت عروض كثيرة.</li>
<li>تُملأ بيانات عشوائية في الجدول، باستثناء مدخلي أنا، الذي يُحدَّث بعد الإدراج.</li>
<li>تُجمع <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-the-equals-operator-slow-indexes-part-ii/index#sb-statistics">إحصاءات</a> الجدول والفهرس ليعرف <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-the-equals-operator-slow-indexes-part-ii/index#sb-optimizer">المُحسِّن</a> شيئاً عن محتوى الجدول.</li>
<li>لـSQL Server 2008R2 <a href="https://learn.microsoft.com/en-us/previous-versions/sql/sql-server-2008-r2/ms191241(v=sql.105)">قيد مفتاح فهرس بحجم 900 بايت</a>؛ ولهذا خُفِّض <code>LAST_NAME</code> إلى 900.</li>
</ul>
<h3 id="المفاتيح-المدمجة">المفاتيح المُدمجة</h3>
<p>يغيّر هذا السكربت جدول <code>EMPLOYEES</code> ليعكس الحالة بعد الاندماج مع شركة Very Big Company:</p>
<pre><code class="language-sql"><span class="hljs-keyword">ALTER TABLE</span> employees <span class="hljs-keyword">ADD</span> subsidiary_id <span class="hljs-type">NUMERIC</span>;
GO
<span class="hljs-keyword">UPDATE</span>      employees <span class="hljs-keyword">SET</span> subsidiary_id <span class="hljs-operator">=</span> <span class="hljs-number">30</span>;
GO
<span class="hljs-keyword">ALTER TABLE</span> employees <span class="hljs-keyword">ALTER</span> <span class="hljs-keyword">COLUMN</span> subsidiary_id 
                                   <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>;
GO

<span class="hljs-keyword">ALTER TABLE</span> employees <span class="hljs-keyword">DROP</span> <span class="hljs-keyword">CONSTRAINT</span> employees_pk;
GO
<span class="hljs-keyword">ALTER TABLE</span> employees <span class="hljs-keyword">ADD  CONSTRAINT</span> employees_pk 
      <span class="hljs-keyword">PRIMARY KEY</span> NONCLUSTERED (employee_id, subsidiary_id);
GO

<span class="hljs-keyword">WITH</span> generator (n) <span class="hljs-keyword">as</span>
( <span class="hljs-keyword">select</span> <span class="hljs-number">1</span>
<span class="hljs-keyword">union</span> <span class="hljs-keyword">all</span>
<span class="hljs-keyword">select</span> n <span class="hljs-operator">+</span> <span class="hljs-number">1</span> <span class="hljs-keyword">from</span> generator
<span class="hljs-keyword">where</span> N <span class="hljs-operator">&lt;</span> <span class="hljs-number">9000</span>
)
<span class="hljs-keyword">INSERT INTO</span> employees (employee_id
                     , first_name, last_name
                     , date_of_birth, phone_number
                     , junk, subsidiary_id)
<span class="hljs-keyword">SELECT</span> n employee_id
     , [dbo].random_string(<span class="hljs-number">11</span>) first_name
     , [dbo].random_string(<span class="hljs-number">11</span>) last_name  
     , [dbo].random_date(<span class="hljs-number">20</span><span class="hljs-operator">*</span><span class="hljs-number">365</span>, <span class="hljs-number">60</span><span class="hljs-operator">*</span><span class="hljs-number">365</span>) dob
     , <span class="hljs-string">&#x27;N/A&#x27;</span> phone
     , <span class="hljs-string">&#x27;junk&#x27;</span> junk
     , [dbo].random_int(<span class="hljs-number">1</span>, (n<span class="hljs-operator">*</span><span class="hljs-number">29</span>)<span class="hljs-operator">/</span><span class="hljs-number">9000</span>) subsidiary_id
  <span class="hljs-keyword">FROM</span> generator
OPTION (MAXRECURSION <span class="hljs-number">9000</span>)
GO

<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">UNIQUE</span> NONCLUSTERED INDEX 
       employees_pk_tmp 
       <span class="hljs-keyword">on</span> employees (employee_id, subsidiary_id);
GO
<span class="hljs-keyword">ALTER TABLE</span> employees <span class="hljs-keyword">DROP</span> <span class="hljs-keyword">CONSTRAINT</span> employees_pk;
GO
<span class="hljs-keyword">ALTER TABLE</span> employees <span class="hljs-keyword">ADD CONSTRAINT</span> employees_pk
      <span class="hljs-keyword">PRIMARY KEY</span> NONCLUSTERED (employee_id, subsidiary_id);
GO
<span class="hljs-keyword">DROP</span> INDEX employees_pk_tmp <span class="hljs-keyword">ON</span> employees;
GO

<span class="hljs-keyword">exec</span> sp_updatestats;
GO
</code></pre>
<p>ملاحظات:</p>
<ul>
<li>المفتاح الأساسي الجديد موسَّع فقط بـ<code>SUBSIDIARY_ID</code>؛ أي إن <code>EMPLOYEE_ID</code> يبقى في الموضع الأول.</li>
<li>تُوزَّع السجلات الجديدة عشوائياً على الفروع من 1 إلى 29.</li>
<li>يُحلَّل الجدول والفهرس مرة أخرى ليعي المُحسِّن حجم البيانات المتنامي.</li>
</ul>
<p>ويقدّم السكربت التالي الفهرس على <code>SUBSIDIARY_ID</code> لدعم الاستعلام عن جميع موظفي فرع معيّن:</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> NONCLUSTERED INDEX 
       emp_sub_id <span class="hljs-keyword">ON</span> employees (subsidiary_id);

<span class="hljs-keyword">exec</span> sp_updatestats;
</code></pre>
<p>ملاحظات:</p>
<ul>
<li>يُحلَّل الجدول وجميع الفهارس مرة أخرى.</li>
</ul>
<p>ومع أن ذلك يعطي أداءً جيداً، فالأفضل استخدام الفهرس الذي يدعم المفتاح الأساسي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">ALTER TABLE</span> employees <span class="hljs-keyword">DROP</span> <span class="hljs-keyword">CONSTRAINT</span> employees_pk;
GO
<span class="hljs-keyword">ALTER TABLE</span> employees <span class="hljs-keyword">ADD  CONSTRAINT</span> employees_pk 
      <span class="hljs-keyword">PRIMARY KEY</span> NONCLUSTERED (subsidiary_id, employee_id);
GO

<span class="hljs-keyword">DROP</span> INDEX emp_sub_id <span class="hljs-keyword">ON</span> employees;

<span class="hljs-keyword">exec</span> sp_updatestats;
</code></pre>
<p>ملاحظات:</p>
<ul>
<li>يترك الإجراء الجدول بلا مفتاح أساسي مدة. ويعني ذلك أن الإجراء غير مناسب للتشغيل المتصل. غير أن لا شيء يصل إلى مخطط الاختبار لدينا، فلا خطر.</li>
<li>الفهرس على <code>SUBSIDIARY_ID</code> أصبح مكرّراً كلياً ويمكن إسقاطه.</li>
</ul>
<h2 id="الدوال">الدوال</h2>
<p>يستخدم SQL Server ترتيباً محرّفياً غير حسّاس لحالة الأحرف افتراضياً. وفي تلك الحالة لا تحتاج إلى فهرس قائم على الدوال؛ فالفهرس العادي يكفي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX emp_name <span class="hljs-keyword">ON</span> employees (last_name);
</code></pre>
<h2 id="الفهارس-المرشحة-الجزئية">الفهارس المُرشَّحة (الجزئية)</h2>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> messages (
     id <span class="hljs-type">numeric</span> <span class="hljs-keyword">not null</span>,
     processed <span class="hljs-type">char</span>(<span class="hljs-number">1</span>) <span class="hljs-keyword">not null</span>,
     receiver <span class="hljs-type">numeric</span> <span class="hljs-keyword">not null</span>,
     message <span class="hljs-type">varchar</span>(<span class="hljs-number">255</span>),
     <span class="hljs-keyword">primary key</span> (id)
);

<span class="hljs-keyword">WITH</span> generator (n) <span class="hljs-keyword">AS</span>
( <span class="hljs-keyword">SELECT</span> <span class="hljs-number">1</span>
   <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span>
  <span class="hljs-keyword">SELECT</span> n <span class="hljs-operator">+</span> <span class="hljs-number">1</span> <span class="hljs-keyword">FROM</span> generator
<span class="hljs-keyword">WHERE</span> n <span class="hljs-operator">&lt;</span> <span class="hljs-number">1000</span>
)
<span class="hljs-keyword">INSERT INTO</span> messages (id, processed, receiver, message)
<span class="hljs-keyword">select</span> n id
     , <span class="hljs-keyword">case</span> <span class="hljs-keyword">WHEN</span> n <span class="hljs-operator">%</span> <span class="hljs-number">5</span> <span class="hljs-operator">=</span><span class="hljs-number">0</span> <span class="hljs-keyword">then</span> <span class="hljs-string">&#x27;N&#x27;</span> <span class="hljs-keyword">else</span> <span class="hljs-string">&#x27;Y&#x27;</span> <span class="hljs-keyword">end</span> 
     , n<span class="hljs-operator">/</span><span class="hljs-number">10</span> receiver
     , <span class="hljs-string">&#x27;junk&#x27;</span> message
  <span class="hljs-keyword">from</span> generator
OPTION (MAXRECURSION <span class="hljs-number">1000</span>)

<span class="hljs-comment">-- regular index</span>
<span class="hljs-comment">--CREATE INDEX messages_todo</span>
<span class="hljs-comment">--          ON messages (receiver, processed) INCLUDE (message);</span>

<span class="hljs-comment">-- filtered index</span>
<span class="hljs-keyword">CREATE</span> INDEX messages_only_todo
          <span class="hljs-keyword">ON</span> messages (receiver) INCLUDE (message)
       <span class="hljs-keyword">WHERE</span> processed <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;N&#x27;</span>;

<span class="hljs-keyword">declare</span> <span class="hljs-variable">@r</span> <span class="hljs-type">numeric</span>
<span class="hljs-keyword">set</span> <span class="hljs-variable">@r</span> <span class="hljs-operator">=</span> <span class="hljs-number">4</span>

<span class="hljs-keyword">SELECT</span> message
   <span class="hljs-keyword">FROM</span> messages
  <span class="hljs-keyword">WHERE</span> processed <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;N&#x27;</span>
    <span class="hljs-keyword">AND</span> receiver  <span class="hljs-operator">=</span> <span class="hljs-variable">@r</span>;
</code></pre>
<p>على <a href="https://sqlfiddle.com/#!6/3a717/2">SQL Fiddle</a>.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:p,title:l,headings:e,html:r};export{s as book,a as chapter,n as chapterTitle,c as default,e as headings,r as html,p as slug,l as title};
