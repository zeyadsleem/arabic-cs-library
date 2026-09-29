const s="use-the-index-luke",a="sql-example-schema-db2-where-clause",n="Db2 (LUW) Example Scripts for “The Where Clause”",p="index",l="سكربتات أمثلة Db2 (LUW) لـ«جملة WHERE»",e=[{depth:2,id:"معامل-المساواة",text:"معامل المساواة"},{depth:3,id:"المفاتيح-البديلة",text:"المفاتيح البديلة"},{depth:3,id:"المفاتيح-المدمجة",text:"المفاتيح المُدمجة"},{depth:2,id:"الدوال-db2-105",text:"الدوال (Db2 10.5+)"},{depth:3,id:"البحث-غير-الحساس-لحالة-الأحرف",text:"البحث غير الحسّاس لحالة الأحرف"},{depth:3,id:"الدوال-المعرفة-من-المستخدم",text:"الدوال المعرّفة من المستخدم"},{depth:2,id:"محاكاة-الفهارس-الجزئية",text:"محاكاة الفهارس الجزئية"},{depth:3,id:"الإعداد",text:"الإعداد"},{depth:3,id:"محاولة-عادية",text:"محاولة عادية"},{depth:3,id:"محاولة-مشوشة",text:"محاولة مشوَّشة"}],r=`<h2 id="معامل-المساواة">معامل المساواة</h2>
<h3 id="المفاتيح-البديلة">المفاتيح البديلة</h3>
<p>ينشئ السكربت التالي جدول <code>EMPLOYEES</code> بألف مدخل.</p>
<p>والسكربت مخصص للتشغيل من سطر أوامر <code>db2</code>. ويستخدم الفاصلة المنقوطة (;) فاصلاً عادياً للعبارات، لكنه يستخدم فاصلتين منقوطتين (;;) لإنهاء شيفرة PL/SQL.</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> employees (
   employee_id   <span class="hljs-type">NUMERIC</span>       <span class="hljs-keyword">NOT NULL</span>,
   first_name    <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">1000</span>) <span class="hljs-keyword">NOT NULL</span>,
   last_name     <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">1000</span>) <span class="hljs-keyword">NOT NULL</span>,
   date_of_birth <span class="hljs-type">DATE</span>                  ,
   phone_number  <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">1000</span>) <span class="hljs-keyword">NOT NULL</span>,
   junk          <span class="hljs-type">CHAR</span>(<span class="hljs-number">254</span>)             ,
   <span class="hljs-keyword">CONSTRAINT</span> employees_pk <span class="hljs-keyword">PRIMARY KEY</span> (employee_id)
);
</code></pre>
<pre><code class="language-sql"><span class="hljs-comment">--#SET TERMINATOR ;;</span>
<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">FUNCTION</span> random_string(minlen <span class="hljs-type">NUMERIC</span>, maxlen <span class="hljs-type">NUMERIC</span>)
<span class="hljs-keyword">RETURNS</span> <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">1000</span>)
<span class="hljs-keyword">LANGUAGE</span> <span class="hljs-keyword">SQL</span>
<span class="hljs-keyword">NOT</span> <span class="hljs-keyword">DETERMINISTIC</span>
<span class="hljs-keyword">NO</span> <span class="hljs-keyword">EXTERNAL</span> ACTION
<span class="hljs-keyword">READS</span> <span class="hljs-keyword">SQL</span> DATA
<span class="hljs-keyword">BEGIN</span>
  <span class="hljs-keyword">DECLARE</span> rv  <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">1000</span>) <span class="hljs-keyword">DEFAULT</span> <span class="hljs-string">&#x27;&#x27;</span>;
  <span class="hljs-keyword">DECLARE</span> i   <span class="hljs-type">NUMERIC</span>       <span class="hljs-keyword">DEFAULT</span> <span class="hljs-number">0</span>;
  <span class="hljs-keyword">DECLARE</span> len <span class="hljs-type">NUMERIC</span>       <span class="hljs-keyword">DEFAULT</span> <span class="hljs-number">0</span>;

  IF maxlen <span class="hljs-operator">&lt;</span> <span class="hljs-number">1</span> <span class="hljs-keyword">OR</span> minlen <span class="hljs-operator">&lt;</span> <span class="hljs-number">1</span> <span class="hljs-keyword">OR</span> maxlen <span class="hljs-operator">&lt;</span> minlen <span class="hljs-keyword">THEN</span>
    <span class="hljs-keyword">RETURN</span> <span class="hljs-keyword">NULL</span>;
  <span class="hljs-keyword">END</span> IF;

  <span class="hljs-keyword">SET</span> i <span class="hljs-operator">=</span> <span class="hljs-built_in">floor</span>(rand()<span class="hljs-operator">*</span>(maxlen<span class="hljs-operator">-</span>minlen)) <span class="hljs-operator">+</span> minlen;
  WHILE (i <span class="hljs-operator">&gt;</span> <span class="hljs-number">0</span>)  DO
    <span class="hljs-keyword">SET</span> rv <span class="hljs-operator">=</span> rv <span class="hljs-operator">||</span> chr(<span class="hljs-number">97</span><span class="hljs-operator">+</span><span class="hljs-built_in">CAST</span>(rand() <span class="hljs-operator">*</span> <span class="hljs-number">25</span> <span class="hljs-keyword">AS</span> <span class="hljs-type">INTEGER</span>));
    <span class="hljs-keyword">SET</span> i  <span class="hljs-operator">=</span>  i <span class="hljs-operator">-</span> <span class="hljs-number">1</span>;
  <span class="hljs-keyword">END</span> WHILE;
  <span class="hljs-keyword">RETURN</span> rv;
<span class="hljs-keyword">END</span>
;;
<span class="hljs-comment">--#SET TERMINATOR ;</span>
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">INSERT INTO</span> employees (employee_id,  first_name,
                       last_name,    date_of_birth, 
                       phone_number, junk)
<span class="hljs-keyword">WITH</span> generator (n) <span class="hljs-keyword">AS</span>
( <span class="hljs-keyword">SELECT</span> <span class="hljs-number">1</span> n   <span class="hljs-keyword">FROM</span> sysibm.sysdummy1
   <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span>
  <span class="hljs-keyword">SELECT</span> n <span class="hljs-operator">+</span> <span class="hljs-number">1</span> <span class="hljs-keyword">FROM</span> generator
   <span class="hljs-keyword">WHERE</span> n <span class="hljs-operator">&lt;</span> <span class="hljs-number">1000</span>
)
<span class="hljs-keyword">SELECT</span> generator.n
     , initcap(<span class="hljs-built_in">lower</span>(random_string(<span class="hljs-number">2</span>, <span class="hljs-number">8</span>)))
     , initcap(<span class="hljs-built_in">lower</span>(random_string(<span class="hljs-number">2</span>, <span class="hljs-number">8</span>)))
     , <span class="hljs-built_in">CURRENT_DATE</span> <span class="hljs-operator">-</span> <span class="hljs-built_in">floor</span>(rand() <span class="hljs-operator">*</span> <span class="hljs-number">365</span> <span class="hljs-operator">*</span> <span class="hljs-number">10</span> <span class="hljs-operator">+</span> <span class="hljs-number">40</span> <span class="hljs-operator">*</span> <span class="hljs-number">365</span>) days
     , <span class="hljs-built_in">floor</span>(rand() <span class="hljs-operator">*</span> <span class="hljs-number">9000</span> <span class="hljs-operator">+</span> <span class="hljs-number">1000</span>)
     , <span class="hljs-string">&#x27;junk&#x27;</span>
  <span class="hljs-keyword">FROM</span> generator;
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">UPDATE</span> employees 
   <span class="hljs-keyword">SET</span> first_name<span class="hljs-operator">=</span><span class="hljs-string">&#x27;MARKUS&#x27;</span>, 
       last_name<span class="hljs-operator">=</span><span class="hljs-string">&#x27;WINAND&#x27;</span>
 <span class="hljs-keyword">WHERE</span> employee_id<span class="hljs-operator">=</span><span class="hljs-number">123</span>;
</code></pre>
<pre><code>RUNSTATS ON TABLE employees;
</code></pre>
<p>ملاحظات:</p>
<p>يُستخدم العمود <code>JUNK</code> للحصول على طول صف واقعي. ولأن نوع بياناته <code>CHAR</code> لا <code>VARCHAR</code>، فهو يحتاج دائماً إلى الـ254 بايت التي يتسع لها (و254 هو الحد في Db2 (LUW) Express-C 10.5). ولولا هذا العمود لصار الجدول صغيراً بصورة غير واقعية ولما نجحت عروض كثيرة.</p>
<p>تُملأ بيانات عشوائية في الجدول، باستثناء مدخلي أنا، الذي يُحدَّث بعد الإدراج.</p>
<p>وتُجمع <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-the-equals-operator-slow-indexes-part-ii/index#sb-statistics">إحصاءات</a> الجدول ليعرف <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-the-equals-operator-slow-indexes-part-ii/index#sb-optimizer">المُحسِّن</a> شيئاً عن محتوى الجدول.</p>
<p><a href="https://www.ibm.com/docs/en/db2/11.5.x?topic=commands-runstats">قبل الإصدار 10</a> تحتاج Db2 إلى اسم جدول مؤهَّل بالكامل (بما في ذلك المخطط) من أجل <code>RUNSTATS</code>. وإذا ظهرت لك رسالة خطأ، فجرّب إضافة اسم المخطط. ويمكنك الاستعلام عن CURRENT_SCHEMA هكذا:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">current_schema</span> <span class="hljs-keyword">FROM</span> sysibm.sysdummy1;
</code></pre>
<h3 id="المفاتيح-المدمجة">المفاتيح المُدمجة</h3>
<p>يغيّر هذا السكربت جدول <code>EMPLOYEES</code> ليعكس الحالة بعد الاندماج مع شركة Very Big Company:</p>
<pre><code class="language-sql"><span class="hljs-comment">--#SET TERMINATOR ;</span>

<span class="hljs-comment">-- add subsidiary_id and update existing records</span>
<span class="hljs-keyword">ALTER TABLE</span> employees <span class="hljs-keyword">ADD</span> subsidiary_id <span class="hljs-type">NUMERIC</span>;
<span class="hljs-keyword">UPDATE</span>      employees <span class="hljs-keyword">SET</span> subsidiary_id <span class="hljs-operator">=</span> <span class="hljs-number">30</span>;
<span class="hljs-keyword">ALTER TABLE</span> employees <span class="hljs-keyword">ALTER</span> <span class="hljs-keyword">COLUMN</span> subsidiary_id <span class="hljs-keyword">SET</span> <span class="hljs-keyword">NOT NULL</span>;

<span class="hljs-comment">-- change the PK</span>
<span class="hljs-keyword">ALTER TABLE</span> employees <span class="hljs-keyword">DROP</span> <span class="hljs-keyword">PRIMARY KEY</span>;
<span class="hljs-comment">-- to prevent failur for reason &quot;7&quot;</span>
REORG <span class="hljs-keyword">TABLE</span> employees;
<span class="hljs-keyword">ALTER TABLE</span> employees <span class="hljs-keyword">ADD CONSTRAINT</span> employees_pk 
      <span class="hljs-keyword">PRIMARY KEY</span> (employee_id, subsidiary_id);

<span class="hljs-comment">-- generate more records (Very Big Company)</span>
<span class="hljs-keyword">INSERT INTO</span> employees (employee_id,  first_name,
                       last_name,    date_of_birth, 
                       phone_number, subsidiary_id, junk)
<span class="hljs-keyword">WITH</span> generator (n) <span class="hljs-keyword">AS</span>
( <span class="hljs-keyword">SELECT</span> <span class="hljs-number">1001</span> n   <span class="hljs-keyword">FROM</span> sysibm.sysdummy1
   <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span>
  <span class="hljs-keyword">SELECT</span> n <span class="hljs-operator">+</span> <span class="hljs-number">1</span> <span class="hljs-keyword">FROM</span> generator
   <span class="hljs-keyword">WHERE</span> n <span class="hljs-operator">&lt;</span> <span class="hljs-number">10000</span>
)
<span class="hljs-keyword">SELECT</span> generator.n
     , initcap(<span class="hljs-built_in">lower</span>(random_string(<span class="hljs-number">2</span>, <span class="hljs-number">8</span>)))
     , initcap(<span class="hljs-built_in">lower</span>(random_string(<span class="hljs-number">2</span>, <span class="hljs-number">8</span>)))
     , <span class="hljs-built_in">CURRENT_DATE</span> <span class="hljs-operator">-</span> <span class="hljs-built_in">floor</span>(rand() <span class="hljs-operator">*</span> <span class="hljs-number">365</span> <span class="hljs-operator">*</span> <span class="hljs-number">10</span> <span class="hljs-operator">+</span> <span class="hljs-number">40</span> <span class="hljs-operator">*</span> <span class="hljs-number">365</span>) days
     , <span class="hljs-built_in">floor</span>(rand() <span class="hljs-operator">*</span> <span class="hljs-number">9000</span> <span class="hljs-operator">+</span> <span class="hljs-number">1000</span>)
     , <span class="hljs-built_in">floor</span>(rand() <span class="hljs-operator">*</span> least(<span class="hljs-built_in">mod</span>(generator.n, <span class="hljs-number">2</span>)<span class="hljs-operator">+</span><span class="hljs-number">0.2</span>,<span class="hljs-number">1</span>) <span class="hljs-operator">*</span> (generator.n<span class="hljs-number">-1000</span>)<span class="hljs-operator">/</span><span class="hljs-number">9000</span><span class="hljs-operator">*</span><span class="hljs-number">29</span>) 
     , <span class="hljs-string">&#x27;junk&#x27;</span>
  <span class="hljs-keyword">FROM</span> generator;

RUNSTATS <span class="hljs-keyword">ON</span> <span class="hljs-keyword">TABLE</span> employees;
</code></pre>
<p>ملاحظات:</p>
<ul>
<li>المفتاح الأساسي الجديد موسَّع فقط بـ<code>SUBSIDIARY_ID</code>؛ أي إن <code>EMPLOYEE_ID</code> يبقى في الموضع الأول.</li>
<li>تُوزَّع السجلات الجديدة عشوائياً على الفروع من 1 إلى 29.</li>
<li>يُحلَّل الجدول والفهرس مرة أخرى ليعي المُحسِّن حجم البيانات المتنامي.</li>
</ul>
<p>ويقدّم السكربت التالي الفهرس على <code>SUBSIDIARY_ID</code> لدعم الاستعلام عن جميع موظفي فرع معيّن:</p>
<pre><code class="language-sql"><span class="hljs-comment">--#SET TERMINATOR ;</span>
<span class="hljs-keyword">CREATE</span> INDEX emp_sub_id <span class="hljs-keyword">ON</span> employees (subsidiary_id);
</code></pre>
<p>ومع أن ذلك يعطي أداءً جيداً، فالأفضل استخدام الفهرس الذي يدعم المفتاح الأساسي:</p>
<pre><code class="language-sql"><span class="hljs-comment">--#SET TERMINATOR ;</span>

<span class="hljs-comment">-- index to support the new PK</span>
<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">UNIQUE</span> INDEX employees_pk_new
    <span class="hljs-keyword">ON</span> employees (subsidiary_id, employee_id);

<span class="hljs-keyword">ALTER TABLE</span> employees
 <span class="hljs-keyword">DROP</span> <span class="hljs-keyword">PRIMARY KEY</span>;

<span class="hljs-comment">-- this will automatically use the new index:</span>
<span class="hljs-comment">-- SQL0598W  Existing index &quot;EMPLOYEE_PK_NEW&quot; is used as the index for </span>
<span class="hljs-comment">-- the primary key or a unique key.  SQLSTATE=01550</span>
<span class="hljs-keyword">ALTER TABLE</span> employees
  <span class="hljs-keyword">ADD CONSTRAINT</span> employees_pk
      <span class="hljs-keyword">PRIMARY KEY</span> (subsidiary_id, employee_id);
<span class="hljs-comment">-- cleanup</span>
RENAME INDEX employees_pk_new <span class="hljs-keyword">TO</span> employees_pk;
<span class="hljs-keyword">DROP</span> INDEX emp_sub_id;
</code></pre>
<p>ملاحظات:</p>
<ul>
<li>يُنشأ فهرس جديد ويُستخدم لدعم المفتاح الأساسي (PK).</li>
<li>يؤدي إسقاط المفتاح الأساسي تلقائياً إلى إسقاط الفهرس المنشأ تلقائياً لدعمه.</li>
<li>وتستخدم إضافة المفتاح الأساسي الجديد الفهرس الجديد تلقائياً.</li>
</ul>
<h2 id="الدوال-db2-105">الدوال (Db2 10.5+)</h2>
<h3 id="البحث-غير-الحساس-لحالة-الأحرف">البحث غير الحسّاس لحالة الأحرف</h3>
<p>أُنشئت الأسماء العشوائية أصلاً بحالة الأحرف الصحيحة؛ حدّث سجل «ي» أنا فقط:</p>
<pre><code class="language-sql"><span class="hljs-comment">--#SET TERMINATOR ;</span>

<span class="hljs-keyword">UPDATE</span> employees 
   <span class="hljs-keyword">SET</span> first_name <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;Markus&#x27;</span>
     , last_name  <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;Winand&#x27;</span>
 <span class="hljs-keyword">WHERE</span> employee_id   <span class="hljs-operator">=</span> <span class="hljs-number">123</span>
   <span class="hljs-keyword">AND</span> subsidiary_id <span class="hljs-operator">=</span> <span class="hljs-number">30</span>;
</code></pre>
<p>العبارة اللازمة لإنشاء الفهرس القائم على الدوال:</p>
<pre><code class="language-sql"><span class="hljs-comment">--#SET TERMINATOR ;</span>
<span class="hljs-keyword">CREATE</span> INDEX emp_up_name
    <span class="hljs-keyword">ON</span> employees (<span class="hljs-built_in">UPPER</span>(last_name));
<span class="hljs-keyword">DROP</span> INDEX emp_name;
</code></pre>
<pre><code>RUNSTATS ON TABLE employees;
</code></pre>
<h3 id="الدوال-المعرفة-من-المستخدم">الدوال المعرّفة من المستخدم</h3>
<p>عرّف دالة تحسب العمر وحدّد محاولة استخدامها في فهرس:</p>
<pre><code class="language-sql"><span class="hljs-comment">--#SET TERMINATOR ;;</span>
<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">FUNCTION</span> get_age(date_of_birth <span class="hljs-type">DATE</span>) 
<span class="hljs-keyword">RETURNS</span> <span class="hljs-type">NUMERIC</span>
<span class="hljs-keyword">LANGUAGE</span> <span class="hljs-keyword">SQL</span>
<span class="hljs-keyword">BEGIN</span>
    <span class="hljs-keyword">RETURN</span> <span class="hljs-keyword">YEAR</span>(<span class="hljs-built_in">CURRENT_DATE</span> <span class="hljs-operator">-</span> date_of_birth);
<span class="hljs-keyword">END</span>
;;
<span class="hljs-comment">--#SET TERMINATOR ;</span>

<span class="hljs-keyword">CREATE</span> INDEX invalid <span class="hljs-keyword">ON</span> EMPLOYEES (get_age(date_of_birth));
</code></pre>
<p>ينبغي أن تحصل على الخطأ «<em>SQL0356N: The index was not created because a key expression was invalid. Key expression: &quot;1&quot;. Reason code: &quot;5”</em>». بينما <a href="https://www.ibm.com/docs/en/db2/11.5.x?topic=messages-sql0000-0999#sqlmsg__SQL0356N">رمز السبب 5 يعني</a>: «<em>اشتمل تعبير المفتاح على دالة معرّفة من المستخدم.</em>»</p>
<h2 id="محاكاة-الفهارس-الجزئية">محاكاة الفهارس الجزئية</h2>
<h3 id="الإعداد">الإعداد</h3>
<pre><code class="language-sql"><span class="hljs-comment">--#SET TERMINATOR ;</span>

<span class="hljs-keyword">CREATE TABLE</span> messages (
       id         <span class="hljs-type">NUMERIC</span>(<span class="hljs-number">10</span>,<span class="hljs-number">0</span>) <span class="hljs-keyword">NOT NULL</span>,
       processed  <span class="hljs-type">CHAR</span>(<span class="hljs-number">1</span>)       <span class="hljs-keyword">NOT NULL</span>,
       receiver   <span class="hljs-type">NUMERIC</span>(<span class="hljs-number">10</span>,<span class="hljs-number">0</span>) <span class="hljs-keyword">NOT NULL</span>,
       message    <span class="hljs-type">CHAR</span>(<span class="hljs-number">200</span>)     <span class="hljs-keyword">NOT NULL</span>,

       <span class="hljs-keyword">CONSTRAINT</span> messages_pk <span class="hljs-keyword">PRIMARY KEY</span> (id)
);

<span class="hljs-keyword">INSERT INTO</span> messages (id, processed, receiver, message)
<span class="hljs-keyword">WITH</span> generator(n) <span class="hljs-keyword">AS</span>
( <span class="hljs-keyword">SELECT</span> <span class="hljs-number">1</span> n   <span class="hljs-keyword">FROM</span> sysibm.sysdummy1
   <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span>
  <span class="hljs-keyword">SELECT</span> n <span class="hljs-operator">+</span> <span class="hljs-number">1</span> <span class="hljs-keyword">FROM</span> generator
   <span class="hljs-keyword">WHERE</span> n <span class="hljs-operator">&lt;</span> <span class="hljs-number">999999</span>
)
<span class="hljs-keyword">SELECT</span> n id
     , <span class="hljs-keyword">CASE</span> <span class="hljs-keyword">WHEN</span> rand() <span class="hljs-operator">&lt;</span> <span class="hljs-number">0.09</span> <span class="hljs-keyword">THEN</span> <span class="hljs-string">&#x27;N&#x27;</span> <span class="hljs-keyword">ELSE</span> <span class="hljs-string">&#x27;Y&#x27;</span> <span class="hljs-keyword">END</span> processed
     , <span class="hljs-built_in">floor</span>(rand() <span class="hljs-operator">*</span> <span class="hljs-number">100</span>) receiver
     , <span class="hljs-string">&#x27;junk&#x27;</span> message
  <span class="hljs-keyword">FROM</span> generator;

RUNSTATS <span class="hljs-keyword">ON</span> <span class="hljs-keyword">TABLE</span> messages;

<span class="hljs-keyword">DROP</span> INDEX messages_not_processed_pi;
<span class="hljs-keyword">CREATE</span> INDEX messages_not_processed_pi
    <span class="hljs-keyword">ON</span> messages (<span class="hljs-keyword">CASE</span> <span class="hljs-keyword">WHEN</span> processed <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;N&#x27;</span> <span class="hljs-keyword">THEN</span> receiver<span class="hljs-operator">+</span><span class="hljs-number">0</span>
                                           <span class="hljs-keyword">ELSE</span> <span class="hljs-keyword">NULL</span>
                 <span class="hljs-keyword">END</span>)
EXCLUDE <span class="hljs-keyword">NULL</span> KEYS;

<span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> messages
 <span class="hljs-keyword">WHERE</span> (<span class="hljs-keyword">CASE</span> <span class="hljs-keyword">WHEN</span> processed <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;N&#x27;</span> <span class="hljs-keyword">THEN</span> receiver<span class="hljs-operator">+</span><span class="hljs-number">0</span>
                                  <span class="hljs-keyword">ELSE</span> <span class="hljs-keyword">NULL</span>
         <span class="hljs-keyword">END</span>) <span class="hljs-operator">=</span> ?;
</code></pre>
<h3 id="محاولة-عادية">محاولة عادية</h3>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX messages_not_processed_pi
    <span class="hljs-keyword">ON</span> messages (<span class="hljs-keyword">CASE</span> <span class="hljs-keyword">WHEN</span> processed <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;N&#x27;</span> <span class="hljs-keyword">THEN</span> receiver
                                           <span class="hljs-keyword">ELSE</span> <span class="hljs-keyword">NULL</span>
                 <span class="hljs-keyword">END</span>)
EXCLUDE <span class="hljs-keyword">NULL</span> KEYS;

<span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> messages
 <span class="hljs-keyword">WHERE</span> (<span class="hljs-keyword">CASE</span> <span class="hljs-keyword">WHEN</span> processed <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;N&#x27;</span> <span class="hljs-keyword">THEN</span> receiver
                                  <span class="hljs-keyword">ELSE</span> <span class="hljs-keyword">NULL</span>
         <span class="hljs-keyword">END</span>) <span class="hljs-operator">=</span> ?;
</code></pre>
<pre><code>Explain Plan
-------------------------------------------------------
ID | Operation        |                    Rows |  Cost
 1 | RETURN           |                         | 49686
 2 |  TBSCAN MESSAGES | 900 of 999999 (   .09%) | 49686

Predicate Information
 2 - SARG (Q1.PROCESSED = 'N')
     SARG (Q1.RECEIVER = ?)
</code></pre>
<p>ويحدث الأمر نفسه عند استخدام تعبير مثل <code>CASE processed WHEN 'N'…</code>.</p>
<h3 id="محاولة-مشوشة">محاولة مشوَّشة</h3>
<pre><code class="language-sql"><span class="hljs-keyword">DROP</span> INDEX messages_not_processed_pi;
<span class="hljs-keyword">CREATE</span> INDEX messages_not_processed_pi
    <span class="hljs-keyword">ON</span> messages (<span class="hljs-keyword">CASE</span> <span class="hljs-keyword">WHEN</span> processed <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;N&#x27;</span> <span class="hljs-keyword">THEN</span> receiver<span class="hljs-operator">+</span><span class="hljs-number">0</span>
                                           <span class="hljs-keyword">ELSE</span> <span class="hljs-keyword">NULL</span>
                 <span class="hljs-keyword">END</span>)
EXCLUDE <span class="hljs-keyword">NULL</span> KEYS;

<span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> messages
 <span class="hljs-keyword">WHERE</span> (<span class="hljs-keyword">CASE</span> <span class="hljs-keyword">WHEN</span> processed <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;N&#x27;</span> <span class="hljs-keyword">THEN</span> receiver<span class="hljs-operator">+</span><span class="hljs-number">0</span>
                                  <span class="hljs-keyword">ELSE</span> <span class="hljs-keyword">NULL</span>
         <span class="hljs-keyword">END</span>) <span class="hljs-operator">=</span> ?;
</code></pre>
<pre><code>ID | Operation                            |                      Rows |  Cost
 1 | RETURN                               |                           | 13071
 2 |  FETCH MESSAGES                      |  40000 of 40000 (100.00%) | 13071
 3 |   RIDSCN                             |  40000 of 40000 (100.00%) |  1665
 4 |    SORT (UNQIUE)                     |  40000 of 40000 (100.00%) |  1665
 5 |     IXSCAN MESSAGES_NOT_PROCESSED_PI | 40000 of 999999 (  4.00%) |  1646

Predicate Information
 2 - SARG ( CASE WHEN (Q1.PROCESSED = 'N') THEN (Q1.RECEIVER + 0) ELSE NULL END = ?)
 5 - START ( CASE WHEN (Q1.PROCESSED = 'N') THEN (Q1.RECEIVER + 0) ELSE NULL END = ?)
      STOP ( CASE WHEN (Q1.PROCESSED = 'N') THEN (Q1.RECEIVER + 0) ELSE NULL END = ?)
</code></pre>
`,o={book:s,chapter:a,chapterTitle:n,slug:p,title:l,headings:e,html:r};export{s as book,a as chapter,n as chapterTitle,o as default,e as headings,r as html,p as slug,l as title};
