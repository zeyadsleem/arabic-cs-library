const s="use-the-index-luke",a="sql-example-schema-mysql-where-clause",n="MySQL سكربتات المثال لـ «بَند WHERE»",p="index",l="سكربتات أمثلة MySQL لـ«جملة WHERE»",e=[{depth:2,id:"معامل-المساواة",text:"معامل المساواة"},{depth:3,id:"المفاتيح-البديلة",text:"المفاتيح البديلة"},{depth:3,id:"المفاتيح-المدمجة",text:"المفاتيح المُدمجة"},{depth:2,id:"الدوال",text:"الدوال"}],r=`<h2 id="معامل-المساواة">معامل المساواة</h2>
<h3 id="المفاتيح-البديلة">المفاتيح البديلة</h3>
<p>إنشاء جدول <code>EMPLOYEES</code> بألف صف.</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> employees (
   employee_id   <span class="hljs-type">NUMERIC</span>      <span class="hljs-keyword">NOT NULL</span>,
   first_name    <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">255</span>) <span class="hljs-keyword">NOT NULL</span>,
   last_name     <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">255</span>) <span class="hljs-keyword">NOT NULL</span>,
   date_of_birth <span class="hljs-type">DATE</span>                 ,
   phone_number  <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">255</span>) <span class="hljs-keyword">NOT NULL</span>,
   junk          <span class="hljs-type">CHAR</span>(<span class="hljs-number">255</span>)            ,
   <span class="hljs-keyword">CONSTRAINT</span> employees_pk <span class="hljs-keyword">PRIMARY KEY</span> (employee_id)
);
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">OR</span> REPLACE <span class="hljs-keyword">VIEW</span> generator_16
<span class="hljs-keyword">AS</span> <span class="hljs-keyword">SELECT</span> <span class="hljs-number">0</span> n <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span> <span class="hljs-keyword">SELECT</span> <span class="hljs-number">1</span>  <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span> <span class="hljs-keyword">SELECT</span> <span class="hljs-number">2</span>  <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span>
   <span class="hljs-keyword">SELECT</span> <span class="hljs-number">3</span>   <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span> <span class="hljs-keyword">SELECT</span> <span class="hljs-number">4</span>  <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span> <span class="hljs-keyword">SELECT</span> <span class="hljs-number">5</span>  <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span>
   <span class="hljs-keyword">SELECT</span> <span class="hljs-number">6</span>   <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span> <span class="hljs-keyword">SELECT</span> <span class="hljs-number">7</span>  <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span> <span class="hljs-keyword">SELECT</span> <span class="hljs-number">8</span>  <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span>
   <span class="hljs-keyword">SELECT</span> <span class="hljs-number">9</span>   <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span> <span class="hljs-keyword">SELECT</span> <span class="hljs-number">10</span> <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span> <span class="hljs-keyword">SELECT</span> <span class="hljs-number">11</span> <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span>
   <span class="hljs-keyword">SELECT</span> <span class="hljs-number">12</span>  <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span> <span class="hljs-keyword">SELECT</span> <span class="hljs-number">13</span> <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span> <span class="hljs-keyword">SELECT</span> <span class="hljs-number">14</span> <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span>
   <span class="hljs-keyword">SELECT</span> <span class="hljs-number">15</span>;
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">OR</span> REPLACE <span class="hljs-keyword">VIEW</span> generator_256
<span class="hljs-keyword">AS</span> <span class="hljs-keyword">SELECT</span> ( ( hi.n <span class="hljs-operator">&lt;&lt;</span> <span class="hljs-number">4</span> ) <span class="hljs-operator">|</span> lo.n ) <span class="hljs-keyword">AS</span> n
     <span class="hljs-keyword">FROM</span> generator_16 lo, generator_16 hi;
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">OR</span> REPLACE <span class="hljs-keyword">VIEW</span> generator_4k
<span class="hljs-keyword">AS</span> <span class="hljs-keyword">SELECT</span> ( ( hi.n <span class="hljs-operator">&lt;&lt;</span> <span class="hljs-number">8</span> ) <span class="hljs-operator">|</span> lo.n ) <span class="hljs-keyword">AS</span> n
     <span class="hljs-keyword">FROM</span> generator_256 lo, generator_16 hi;
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">OR</span> REPLACE <span class="hljs-keyword">VIEW</span> generator_64k
<span class="hljs-keyword">AS</span> <span class="hljs-keyword">SELECT</span> ( ( hi.n <span class="hljs-operator">&lt;&lt;</span> <span class="hljs-number">8</span> ) <span class="hljs-operator">|</span> lo.n ) <span class="hljs-keyword">AS</span> n
     <span class="hljs-keyword">FROM</span> generator_256 lo, generator_256 hi;
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">INSERT INTO</span> employees (employee_id,  first_name,
                       last_name,    date_of_birth, 
                       phone_number, junk)
<span class="hljs-keyword">SELECT</span> gen.n <span class="hljs-operator">+</span><span class="hljs-number">1</span>,
       GROUP_CONCAT(<span class="hljs-type">CHAR</span>((RAND() <span class="hljs-operator">*</span> <span class="hljs-number">25</span>)<span class="hljs-operator">+</span><span class="hljs-number">97</span>) SEPARATOR <span class="hljs-string">&#x27;&#x27;</span>),
       GROUP_CONCAT(<span class="hljs-type">CHAR</span>((RAND() <span class="hljs-operator">*</span> <span class="hljs-number">25</span>)<span class="hljs-operator">+</span><span class="hljs-number">97</span>) SEPARATOR <span class="hljs-string">&#x27;&#x27;</span>),
       SUBDATE(CURDATE(), <span class="hljs-type">INTERVAL</span> (RAND()<span class="hljs-operator">*</span><span class="hljs-number">3650</span> <span class="hljs-operator">+</span> <span class="hljs-number">40</span><span class="hljs-operator">*</span><span class="hljs-number">365</span>) <span class="hljs-keyword">DAY</span>),
       <span class="hljs-built_in">FLOOR</span>(RAND()<span class="hljs-operator">*</span><span class="hljs-number">9000</span><span class="hljs-operator">+</span><span class="hljs-number">1000</span>),
       <span class="hljs-string">&#x27;junk&#x27;</span>
  <span class="hljs-keyword">FROM</span> generator_4k gen, generator_16 rand
 <span class="hljs-keyword">WHERE</span> gen.n <span class="hljs-operator">&lt;</span> <span class="hljs-number">1000</span>
 <span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> gen.n;
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">UPDATE</span> employees 
   <span class="hljs-keyword">SET</span> first_name<span class="hljs-operator">=</span><span class="hljs-string">&#x27;MARKUS&#x27;</span>, 
       last_name<span class="hljs-operator">=</span><span class="hljs-string">&#x27;WINAND&#x27;</span>
 <span class="hljs-keyword">WHERE</span> employee_id<span class="hljs-operator">=</span><span class="hljs-number">123</span>;
</code></pre>
<pre><code>ANALYZE TABLE employees;
</code></pre>
<p>ملاحظة:</p>
<ul>
<li>عرضا <code>GENERATOR_X</code> مولّدان للصفوف كما هو موصوف في مقال <a href="https://use-the-index-luke.com/blog/2011-07-30/mysql-row-generator">مولّد صفوف MySQL</a>.</li>
<li>يُستخدم العمود <code>JUNK</code> للحصول على طول صف واقعي. ولأن نوع بياناته <code>CHAR</code> لا <code>VARCHAR</code>، فهو يخزّن دائماً 255 محرفاً. ولولا هذا العمود لصار الجدول صغيراً بصورة غير واقعية ولما نجح بعض العروض.</li>
<li>تُملأ بيانات عشوائية في الجدول، باستثناء مدخلي أنا، الذي يُحدَّث بعد الإدراج.</li>
<li>تُجمع <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-the-equals-operator-slow-indexes-part-ii/index#sb-statistics">إحصاءات</a> الجدول والفهرس ليعرف <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-the-equals-operator-slow-indexes-part-ii/index#sb-optimizer">المُحسِّن</a> شيئاً عن محتوى الجدول.</li>
</ul>
<h3 id="المفاتيح-المدمجة">المفاتيح المُدمجة</h3>
<pre><code class="language-sql"><span class="hljs-comment">-- add subsidiary_id and update existing records</span>
<span class="hljs-keyword">ALTER TABLE</span> employees <span class="hljs-keyword">ADD</span> subsidiary_id <span class="hljs-type">NUMERIC</span>;
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">UPDATE</span>      employees <span class="hljs-keyword">SET</span> subsidiary_id <span class="hljs-operator">=</span> <span class="hljs-number">30</span>;
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">ALTER TABLE</span> employees MODIFY subsidiary_id <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>;
</code></pre>
<pre><code class="language-sql"><span class="hljs-comment">-- change the PK</span>
<span class="hljs-keyword">ALTER TABLE</span> employees <span class="hljs-keyword">DROP</span> <span class="hljs-keyword">PRIMARY KEY</span>;
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">ALTER TABLE</span> employees <span class="hljs-keyword">ADD CONSTRAINT</span> employees_pk 
      <span class="hljs-keyword">PRIMARY KEY</span> (employee_id, subsidiary_id);
</code></pre>
<pre><code class="language-sql"><span class="hljs-comment">-- generate more records (Very Big Company)</span>
<span class="hljs-keyword">INSERT INTO</span> employees (employee_id,  first_name, 
                       last_name,    date_of_birth, 
                       phone_number, subsidiary_id, junk)
<span class="hljs-keyword">SELECT</span> gen.n <span class="hljs-operator">+</span> <span class="hljs-number">1</span>
     , GROUP_CONCAT(<span class="hljs-type">CHAR</span>( RAND()<span class="hljs-operator">*</span><span class="hljs-number">25</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>) SEPARATOR <span class="hljs-string">&#x27;&#x27;</span>)
     , GROUP_CONCAT(<span class="hljs-type">CHAR</span>( RAND()<span class="hljs-operator">*</span><span class="hljs-number">25</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>) SEPARATOR <span class="hljs-string">&#x27;&#x27;</span>)
     , CURDATE() <span class="hljs-operator">-</span> <span class="hljs-type">INTERVAL</span> (RAND(<span class="hljs-number">0</span>)<span class="hljs-operator">*</span><span class="hljs-number">365</span><span class="hljs-operator">*</span><span class="hljs-number">10</span> <span class="hljs-operator">+</span> <span class="hljs-number">40</span><span class="hljs-operator">*</span><span class="hljs-number">365</span>) <span class="hljs-keyword">DAY</span>
     , <span class="hljs-built_in">FLOOR</span>(RAND()<span class="hljs-operator">*</span><span class="hljs-number">9000</span> <span class="hljs-operator">+</span> <span class="hljs-number">1000</span>)
     , <span class="hljs-built_in">FLOOR</span>(RAND()<span class="hljs-operator">*</span>(gen.n<span class="hljs-operator">/</span><span class="hljs-number">9000</span>)<span class="hljs-operator">*</span><span class="hljs-number">29</span> <span class="hljs-operator">+</span> <span class="hljs-number">1</span>)
     , <span class="hljs-string">&#x27;junk&#x27;</span>
  <span class="hljs-keyword">FROM</span> generator_64k gen, generator_16 rand
 <span class="hljs-keyword">WHERE</span> gen.n <span class="hljs-operator">&lt;</span> <span class="hljs-number">9000</span>
 <span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> gen.n;
</code></pre>
<pre><code>ANALYZE TABLE employees;
</code></pre>
<p>ملاحظات:</p>
<ul>
<li>المفتاح الأساسي الجديد يشمل <code>SUBSIDIARY_ID</code>؛ أي إن <code>EMPLOYEE_ID</code> يبقى في الموضع الأول.</li>
<li>تُوزَّع السجلات الجديدة عشوائياً على الفروع من 1 إلى 29.</li>
<li>يُحلَّل الجدول والفهرس مرة أخرى ليعي المُحسِّن حجم البيانات المتنامي.</li>
</ul>
<p>ويقدّم السكربت التالي الفهرس على <code>SUBSIDIARY_ID</code> لدعم الاستعلام عن جميع موظفي فرع معيّن:</p>
<pre><code class="language-sql"><span class="hljs-keyword">ALTER TABLE</span> employees <span class="hljs-keyword">ADD</span> INDEX emp_sub_id (subsidiary_id)
</code></pre>
<p>ومع أن ذلك يعطي أداءً جيداً، فالأفضل استخدام الفهرس الذي يدعم المفتاح الأساسي:</p>
<pre><code class="language-sql"><span class="hljs-comment">-- use tmp index to support the PK</span>
<span class="hljs-keyword">ALTER TABLE</span> employees
  <span class="hljs-keyword">ADD</span> <span class="hljs-keyword">UNIQUE</span> INDEX tmp (employee_id, subsidiary_id);
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">ALTER TABLE</span> employees
 <span class="hljs-keyword">DROP</span> <span class="hljs-keyword">PRIMARY KEY</span>;
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">ALTER TABLE</span> employees
  <span class="hljs-keyword">ADD</span> <span class="hljs-keyword">PRIMARY KEY</span> (subsidiary_id, employee_id);
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">ALTER TABLE</span> employees
 <span class="hljs-keyword">DROP</span> INDEX tmp;
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">ALTER TABLE</span> employees
 <span class="hljs-keyword">DROP</span> INDEX emp_sub_id;
</code></pre>
<pre><code>ANALYZE TABLE employees;
</code></pre>
<p>ملاحظات:</p>
<ul>
<li>يُنشأ فهرس فريد جديد ويُستخدم ليكون بديلاً عن المفتاح الأساسي.</li>
<li>يُسقط المفتاح الأساسي ويُعاد إنشاؤه بترتيب الأعمدة الجديد.</li>
<li>يُسقط الفهرس المؤقت، وكذلك الفهرس على معرّف الفرع الذي لم يعد لازماً.</li>
</ul>
<h2 id="الدوال">الدوال</h2>
<p>يستخدم MySQL ترتيباً محرّفياً غير حسّاس لحالة الأحرف افتراضياً. علاوة على ذلك، لم تكن MySQL تدعم الفهارس القائمة على الدوال قبل الإصدار 5.7. وفي تلك الحالة لا تحتاج إلى فهرس قائم على الدوال؛ فالفهرس العادي يكفي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX emp_name <span class="hljs-keyword">ON</span> employees (last_name)
</code></pre>
<p>وبدءاً من الإصدار 5.7، يمكن فهرسة الأعمدة المحسوبة في MySQL:</p>
<p>لا يمكن استخدام الدوال المعرّفة من المستخدم في الأعمدة المولّدة — ولا حتى إذا كانت حتمية ومُعلَنة كذلك.</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">FUNCTION</span> get_age(date_of_birth <span class="hljs-type">DATE</span>)
<span class="hljs-keyword">RETURNS</span> <span class="hljs-type">INTEGER</span> <span class="hljs-keyword">NO</span> <span class="hljs-keyword">SQL</span>
<span class="hljs-keyword">RETURN</span> TIMESTAMPDIFF(<span class="hljs-keyword">YEAR</span>,date_of_birth,CURDATE());
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">ALTER TABLE</span> employees
  <span class="hljs-keyword">ADD</span> <span class="hljs-keyword">COLUMN</span> last_name_up <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">255</span>) <span class="hljs-keyword">AS</span> (<span class="hljs-built_in">UPPER</span>(last_name));
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX emp_up_name <span class="hljs-keyword">ON</span> employees (last_name_up);
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:p,title:l,headings:e,html:r};export{s as book,a as chapter,n as chapterTitle,c as default,e as headings,r as html,p as slug,l as title};
