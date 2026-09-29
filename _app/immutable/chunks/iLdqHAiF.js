const s="use-the-index-luke",a="sql-example-schema-sqlite-where-clause",n="SQLite Example Scripts for “The Where Clause”",p="index",l="سكربتات أمثلة SQLite لـ«جملة WHERE»",r=[{depth:2,id:"معامل-المساواة",text:"معامل المساواة"},{depth:3,id:"المفاتيح-البديلة",text:"المفاتيح البديلة"},{depth:3,id:"المفاتيح-المدمجة",text:"المفاتيح المُدمجة"},{depth:2,id:"الدوال",text:"الدوال"}],e=`<h2 id="معامل-المساواة">معامل المساواة</h2>
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
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">VIEW</span> generator_16
<span class="hljs-keyword">AS</span> <span class="hljs-keyword">SELECT</span> <span class="hljs-number">0</span> n <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span> <span class="hljs-keyword">SELECT</span> <span class="hljs-number">1</span>  <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span> <span class="hljs-keyword">SELECT</span> <span class="hljs-number">2</span>  <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span>
   <span class="hljs-keyword">SELECT</span> <span class="hljs-number">3</span>   <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span> <span class="hljs-keyword">SELECT</span> <span class="hljs-number">4</span>  <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span> <span class="hljs-keyword">SELECT</span> <span class="hljs-number">5</span>  <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span>
   <span class="hljs-keyword">SELECT</span> <span class="hljs-number">6</span>   <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span> <span class="hljs-keyword">SELECT</span> <span class="hljs-number">7</span>  <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span> <span class="hljs-keyword">SELECT</span> <span class="hljs-number">8</span>  <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span>
   <span class="hljs-keyword">SELECT</span> <span class="hljs-number">9</span>   <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span> <span class="hljs-keyword">SELECT</span> <span class="hljs-number">10</span> <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span> <span class="hljs-keyword">SELECT</span> <span class="hljs-number">11</span> <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span>
   <span class="hljs-keyword">SELECT</span> <span class="hljs-number">12</span>  <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span> <span class="hljs-keyword">SELECT</span> <span class="hljs-number">13</span> <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span> <span class="hljs-keyword">SELECT</span> <span class="hljs-number">14</span> <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span>
   <span class="hljs-keyword">SELECT</span> <span class="hljs-number">15</span>;
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">VIEW</span> generator_256
<span class="hljs-keyword">AS</span> <span class="hljs-keyword">SELECT</span> ( ( hi.n <span class="hljs-operator">&lt;&lt;</span> <span class="hljs-number">4</span> ) <span class="hljs-operator">|</span> lo.n ) <span class="hljs-keyword">AS</span> n
     <span class="hljs-keyword">FROM</span> generator_16 lo, generator_16 hi;
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">VIEW</span> generator_4k
<span class="hljs-keyword">AS</span> <span class="hljs-keyword">SELECT</span> ( ( hi.n <span class="hljs-operator">&lt;&lt;</span> <span class="hljs-number">8</span> ) <span class="hljs-operator">|</span> lo.n ) <span class="hljs-keyword">AS</span> n
     <span class="hljs-keyword">FROM</span> generator_256 lo, generator_16 hi;
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">VIEW</span> generator_64k
<span class="hljs-keyword">AS</span> <span class="hljs-keyword">SELECT</span> ( ( hi.n <span class="hljs-operator">&lt;&lt;</span> <span class="hljs-number">8</span> ) <span class="hljs-operator">|</span> lo.n ) <span class="hljs-keyword">AS</span> n
     <span class="hljs-keyword">FROM</span> generator_256 lo, generator_256 hi;
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">INSERT INTO</span> employees (employee_id,  first_name,
                       last_name,    date_of_birth, 
                       phone_number, junk)
<span class="hljs-keyword">SELECT</span> gen.n <span class="hljs-operator">+</span><span class="hljs-number">1</span>,
       <span class="hljs-type">CHAR</span>( <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">65</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           ),
       <span class="hljs-type">CHAR</span>( <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">65</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           ),
       <span class="hljs-type">DATE</span>(<span class="hljs-string">&#x27;now&#x27;</span>, <span class="hljs-string">&#x27;-&#x27;</span> <span class="hljs-operator">||</span> (<span class="hljs-built_in">abs</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">3650</span> <span class="hljs-operator">+</span> <span class="hljs-number">40</span><span class="hljs-operator">*</span><span class="hljs-number">365</span>) <span class="hljs-operator">||</span> <span class="hljs-string">&#x27; day&#x27;</span>),
       <span class="hljs-built_in">ABS</span>(RANDOM())<span class="hljs-operator">%</span><span class="hljs-number">9000</span><span class="hljs-operator">+</span><span class="hljs-number">1000</span>,
       printf(<span class="hljs-string">&#x27;%.1000c&#x27;</span>,<span class="hljs-string">&#x27;x&#x27;</span>)
  <span class="hljs-keyword">FROM</span> generator_4k gen
 <span class="hljs-keyword">WHERE</span> gen.n <span class="hljs-operator">&lt;</span> <span class="hljs-number">1000</span>;
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">UPDATE</span> employees 
   <span class="hljs-keyword">SET</span> first_name<span class="hljs-operator">=</span><span class="hljs-string">&#x27;MARKUS&#x27;</span>, 
       last_name<span class="hljs-operator">=</span><span class="hljs-string">&#x27;WINAND&#x27;</span>
 <span class="hljs-keyword">WHERE</span> employee_id<span class="hljs-operator">=</span><span class="hljs-number">123</span>;
</code></pre>
<pre><code>ANALYZE employees;
</code></pre>
<p>ملاحظة:</p>
<ul>
<li>عرضا <code>GENERATOR_X</code> مولّدان للصفوف كما هو موصوف في مقال <a href="https://use-the-index-luke.com/blog/2011-07-30/mysql-row-generator">مولّد صفوف MySQL</a>. وفي الوقت نفسه، يدعم SQLite <a href="https://modern-sql.com/caniuse/with_recursive_(top_level)">جملة WITH التعاودية (منذ 3.8.3)</a> لكن هذا النهج يعمل مع إصدارات أقدم من SQLite أيضاً.</li>
<li>يُستخدم العمود <code>JUNK</code> للحصول على طول صف واقعي. ولولا هذا العمود لصار الجدول صغيراً بصورة غير واقعية ولما نجح بعض العروض.</li>
<li>تُملأ بيانات عشوائية في الجدول، باستثناء مدخلي أنا، الذي يُحدَّث بعد الإدراج.</li>
<li>تُجمع <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-the-equals-operator-slow-indexes-part-ii/index#sb-statistics">إحصاءات</a> الجدول والفهرس ليعرف <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-the-equals-operator-slow-indexes-part-ii/index#sb-optimizer">المُحسِّن</a> شيئاً عن محتوى الجدول.</li>
</ul>
<h3 id="المفاتيح-المدمجة">المفاتيح المُدمجة</h3>
<pre><code>DROP TABLE employees;
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> employees (
   employee_id   <span class="hljs-type">NUMERIC</span>      <span class="hljs-keyword">NOT NULL</span>,
   first_name    <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">255</span>) <span class="hljs-keyword">NOT NULL</span>,
   last_name     <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">255</span>) <span class="hljs-keyword">NOT NULL</span>,
   date_of_birth <span class="hljs-type">DATE</span>                 ,
   phone_number  <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">255</span>) <span class="hljs-keyword">NOT NULL</span>,
   junk          <span class="hljs-type">CHAR</span>(<span class="hljs-number">255</span>)            ,
   subsidiary_id <span class="hljs-type">NUMERIC</span>      <span class="hljs-keyword">NOT NULL</span>,
   <span class="hljs-keyword">CONSTRAINT</span> employees_pk <span class="hljs-keyword">PRIMARY KEY</span> (employee_id, subsidiary_id)
);
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">INSERT INTO</span> employees (employee_id,  first_name,
                       last_name,    date_of_birth, 
                       phone_number, junk, subsidiary_id)
<span class="hljs-keyword">SELECT</span> gen.n <span class="hljs-operator">+</span><span class="hljs-number">1</span>,
       <span class="hljs-type">CHAR</span>( <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">65</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           ),
       <span class="hljs-type">CHAR</span>( <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">65</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           ),
       <span class="hljs-type">DATE</span>(<span class="hljs-string">&#x27;now&#x27;</span>, <span class="hljs-string">&#x27;-&#x27;</span> <span class="hljs-operator">||</span> (<span class="hljs-built_in">abs</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">3650</span> <span class="hljs-operator">+</span> <span class="hljs-number">40</span><span class="hljs-operator">*</span><span class="hljs-number">365</span>) <span class="hljs-operator">||</span> <span class="hljs-string">&#x27; day&#x27;</span>),
       <span class="hljs-built_in">ABS</span>(RANDOM())<span class="hljs-operator">%</span><span class="hljs-number">9000</span><span class="hljs-operator">+</span><span class="hljs-number">1000</span>,
       printf(<span class="hljs-string">&#x27;%.1000c&#x27;</span>,<span class="hljs-string">&#x27;x&#x27;</span>),
       <span class="hljs-number">30</span>
  <span class="hljs-keyword">FROM</span> generator_4k gen
 <span class="hljs-keyword">WHERE</span> gen.n <span class="hljs-operator">&lt;</span> <span class="hljs-number">1000</span>;
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">UPDATE</span> employees 
   <span class="hljs-keyword">SET</span> first_name<span class="hljs-operator">=</span><span class="hljs-string">&#x27;MARKUS&#x27;</span>, 
       last_name<span class="hljs-operator">=</span><span class="hljs-string">&#x27;WINAND&#x27;</span>
 <span class="hljs-keyword">WHERE</span> employee_id<span class="hljs-operator">=</span><span class="hljs-number">123</span>
   <span class="hljs-keyword">AND</span> subsidiary_id<span class="hljs-operator">=</span><span class="hljs-number">30</span>;
</code></pre>
<pre><code class="language-sql"><span class="hljs-comment">-- generate more records (Very Big Company)</span>
<span class="hljs-keyword">INSERT INTO</span> employees (employee_id,  first_name, 
                       last_name,    date_of_birth, 
                       phone_number, subsidiary_id, junk)
<span class="hljs-keyword">SELECT</span> gen.n <span class="hljs-operator">+</span> <span class="hljs-number">1</span>,
       <span class="hljs-type">CHAR</span>( <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">65</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           ),
       <span class="hljs-type">CHAR</span>( <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">65</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           ),
       <span class="hljs-type">DATE</span>(<span class="hljs-string">&#x27;now&#x27;</span>, <span class="hljs-string">&#x27;-&#x27;</span> <span class="hljs-operator">||</span> (<span class="hljs-built_in">abs</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">3650</span> <span class="hljs-operator">+</span> <span class="hljs-number">40</span><span class="hljs-operator">*</span><span class="hljs-number">365</span>) <span class="hljs-operator">||</span> <span class="hljs-string">&#x27; day&#x27;</span>),
       <span class="hljs-built_in">ABS</span>(RANDOM())<span class="hljs-operator">%</span><span class="hljs-number">9000</span><span class="hljs-operator">+</span><span class="hljs-number">1000</span>,
       <span class="hljs-built_in">CAST</span>(<span class="hljs-built_in">ABS</span>(RANDOM())<span class="hljs-operator">%</span>(gen.n<span class="hljs-operator">/</span><span class="hljs-number">9000.0</span> <span class="hljs-operator">*</span> <span class="hljs-number">29</span> <span class="hljs-operator">+</span> <span class="hljs-number">1</span>) <span class="hljs-operator">+</span> <span class="hljs-number">1</span> <span class="hljs-keyword">AS</span> <span class="hljs-type">INTEGER</span>),
       printf(<span class="hljs-string">&#x27;%.10c&#x27;</span>,<span class="hljs-string">&#x27;x&#x27;</span>)
  <span class="hljs-keyword">FROM</span> generator_64k gen
 <span class="hljs-keyword">WHERE</span> gen.n <span class="hljs-operator">&lt;</span> <span class="hljs-number">9000</span>;
</code></pre>
<pre><code>ANALYZE employees;
</code></pre>
<p>ملاحظات:</p>
<ul>
<li>بما أن SQLite لا يستطيع تغيير المفاتيح الأساسية بـ<code>ALTER TABLE</code>، يُسقط الجدول بأكمله ويعاد إنشاؤه.</li>
<li>المفتاح الأساسي الجديد يشمل <code>SUBSIDIARY_ID</code>؛ أي إن <code>EMPLOYEE_ID</code> يبقى في الموضع الأول.</li>
<li>تُوزَّع السجلات الجديدة عشوائياً على الفروع من 1 إلى 29.</li>
<li>يُحلَّل الجدول والفهرس مرة أخرى ليعي المُحسِّن حجم البيانات المتنامي.</li>
</ul>
<p>ويقدّم السكربت التالي الفهرس على <code>SUBSIDIARY_ID</code> لدعم الاستعلام عن جميع موظفي فرع معيّن:</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX emp_sub_id <span class="hljs-keyword">ON</span> employees(subsidiary_id)
</code></pre>
<p>ومع أن ذلك يعطي أداءً جيداً، فالأفضل استخدام الفهرس الذي يدعم المفتاح الأساسي:</p>
<pre><code>DROP TABLE employees;
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> employees (
   employee_id   <span class="hljs-type">NUMERIC</span>      <span class="hljs-keyword">NOT NULL</span>,
   first_name    <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">255</span>) <span class="hljs-keyword">NOT NULL</span>,
   last_name     <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">255</span>) <span class="hljs-keyword">NOT NULL</span>,
   date_of_birth <span class="hljs-type">DATE</span>                 ,
   phone_number  <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">255</span>) <span class="hljs-keyword">NOT NULL</span>,
   junk          <span class="hljs-type">CHAR</span>(<span class="hljs-number">255</span>)            ,
   subsidiary_id <span class="hljs-type">NUMERIC</span>      <span class="hljs-keyword">NOT NULL</span>,
   <span class="hljs-keyword">CONSTRAINT</span> employees_pk <span class="hljs-keyword">PRIMARY KEY</span> (subsidiary_id, employee_id)
);
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">INSERT INTO</span> employees (employee_id,  first_name,
                       last_name,    date_of_birth, 
                       phone_number, junk, subsidiary_id)
<span class="hljs-keyword">SELECT</span> gen.n <span class="hljs-operator">+</span><span class="hljs-number">1</span>,
       <span class="hljs-type">CHAR</span>( <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">65</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           ),
       <span class="hljs-type">CHAR</span>( <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">65</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           ),
       <span class="hljs-type">DATE</span>(<span class="hljs-string">&#x27;now&#x27;</span>, <span class="hljs-string">&#x27;-&#x27;</span> <span class="hljs-operator">||</span> (<span class="hljs-built_in">abs</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">3650</span> <span class="hljs-operator">+</span> <span class="hljs-number">40</span><span class="hljs-operator">*</span><span class="hljs-number">365</span>) <span class="hljs-operator">||</span> <span class="hljs-string">&#x27; day&#x27;</span>),
       <span class="hljs-built_in">ABS</span>(RANDOM())<span class="hljs-operator">%</span><span class="hljs-number">9000</span><span class="hljs-operator">+</span><span class="hljs-number">1000</span>,
       printf(<span class="hljs-string">&#x27;%.1000c&#x27;</span>,<span class="hljs-string">&#x27;x&#x27;</span>),
       <span class="hljs-number">30</span>
  <span class="hljs-keyword">FROM</span> generator_4k gen
 <span class="hljs-keyword">WHERE</span> gen.n <span class="hljs-operator">&lt;</span> <span class="hljs-number">1000</span>;
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">UPDATE</span> employees 
   <span class="hljs-keyword">SET</span> first_name<span class="hljs-operator">=</span><span class="hljs-string">&#x27;MARKUS&#x27;</span>, 
       last_name<span class="hljs-operator">=</span><span class="hljs-string">&#x27;WINAND&#x27;</span>
 <span class="hljs-keyword">WHERE</span> employee_id<span class="hljs-operator">=</span><span class="hljs-number">123</span>
   <span class="hljs-keyword">AND</span> subsidiary_id<span class="hljs-operator">=</span><span class="hljs-number">30</span>;
</code></pre>
<pre><code class="language-sql"><span class="hljs-comment">-- generate more records (Very Big Company)</span>
<span class="hljs-keyword">INSERT INTO</span> employees (employee_id,  first_name, 
                       last_name,    date_of_birth, 
                       phone_number, subsidiary_id, junk)
<span class="hljs-keyword">SELECT</span> gen.n <span class="hljs-operator">+</span> <span class="hljs-number">1</span>,
       <span class="hljs-type">CHAR</span>( <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">65</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           ),
       <span class="hljs-type">CHAR</span>( <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">65</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           , <span class="hljs-built_in">ABS</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">26</span> <span class="hljs-operator">+</span> <span class="hljs-number">97</span>
           ),
       <span class="hljs-type">DATE</span>(<span class="hljs-string">&#x27;now&#x27;</span>, <span class="hljs-string">&#x27;-&#x27;</span> <span class="hljs-operator">||</span> (<span class="hljs-built_in">abs</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">3650</span> <span class="hljs-operator">+</span> <span class="hljs-number">40</span><span class="hljs-operator">*</span><span class="hljs-number">365</span>) <span class="hljs-operator">||</span> <span class="hljs-string">&#x27; day&#x27;</span>),
       <span class="hljs-built_in">ABS</span>(RANDOM())<span class="hljs-operator">%</span><span class="hljs-number">9000</span><span class="hljs-operator">+</span><span class="hljs-number">1000</span>,
       <span class="hljs-built_in">CAST</span>(<span class="hljs-built_in">ABS</span>(RANDOM())<span class="hljs-operator">%</span>(gen.n<span class="hljs-operator">/</span><span class="hljs-number">9000.0</span> <span class="hljs-operator">*</span> <span class="hljs-number">29</span> <span class="hljs-operator">+</span> <span class="hljs-number">1</span>) <span class="hljs-operator">+</span> <span class="hljs-number">1</span> <span class="hljs-keyword">AS</span> <span class="hljs-type">INTEGER</span>),
       printf(<span class="hljs-string">&#x27;%.10c&#x27;</span>,<span class="hljs-string">&#x27;x&#x27;</span>)
  <span class="hljs-keyword">FROM</span> generator_64k gen
 <span class="hljs-keyword">WHERE</span> gen.n <span class="hljs-operator">&lt;</span> <span class="hljs-number">9000</span>;
</code></pre>
<pre><code>ANALYZE employees;
</code></pre>
<p>ملاحظات:</p>
<ul>
<li>يُعاد إنشاء كل شيء مرة أخرى، لأن SQLite لا يدعم تعديل المفتاح الأساسي.</li>
</ul>
<h2 id="الدوال">الدوال</h2>
<p>لا يدعم SQLite صيغة <code>create function</code>، ولذلك نحتاج إلى استخدام التعبير لحساب العمر الحالي مباشرةً في الاستعلام.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> first_name, last_name
     , <span class="hljs-built_in">CAST</span>(STRFTIME(<span class="hljs-string">&#x27;%Y.%m%d&#x27;</span>, <span class="hljs-string">&#x27;now&#x27;</span>) <span class="hljs-operator">-</span> STRFTIME(<span class="hljs-string">&#x27;%Y.%m%d&#x27;</span>, date_of_birth) <span class="hljs-keyword">AS</span> <span class="hljs-type">INT</span>)
  <span class="hljs-keyword">FROM</span> employees
 <span class="hljs-keyword">WHERE</span> <span class="hljs-built_in">CAST</span>(STRFTIME(<span class="hljs-string">&#x27;%Y.%m%d&#x27;</span>, <span class="hljs-string">&#x27;now&#x27;</span>) <span class="hljs-operator">-</span> STRFTIME(<span class="hljs-string">&#x27;%Y.%m%d&#x27;</span>, date_of_birth) <span class="hljs-keyword">AS</span> <span class="hljs-type">INT</span>) <span class="hljs-operator">=</span> <span class="hljs-number">42</span>
</code></pre>
<p>لاحظ أن العمر يُحسب <a href="https://stackoverflow.com/questions/3123951/sqlite-how-to-calculate-age-from-birth-date/17501785#17501785">بتنسيق التواريخ كسنوات كسرية</a>.</p>
<p>ويمكن فهرسة التعبيرات إذا كانت حتمية.</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX emp_age <span class="hljs-keyword">ON</span> employees
     ( <span class="hljs-built_in">CAST</span>(STRFTIME(<span class="hljs-string">&#x27;%Y.%m%d&#x27;</span>, <span class="hljs-string">&#x27;now&#x27;</span>) <span class="hljs-operator">-</span> STRFTIME(<span class="hljs-string">&#x27;%Y.%m%d&#x27;</span>, date_of_birth) <span class="hljs-keyword">AS</span> <span class="hljs-type">INT</span>) )
</code></pre>
<pre><code>Error: non-deterministic use of strftime() in an index
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:p,title:l,headings:r,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,r as headings,e as html,p as slug,l as title};
