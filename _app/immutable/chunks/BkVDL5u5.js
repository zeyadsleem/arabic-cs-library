const s="use-the-index-luke",a="sql-example-schema-postgresql-where-clause",n="PostgreSQL Example Scripts for “The Where Clause”",p="index",l="سكربتات أمثلة PostgreSQL لـ«جملة WHERE»",e=[{depth:2,id:"معامل-المساواة",text:"معامل المساواة"},{depth:3,id:"المفاتيح-البديلة",text:"المفاتيح البديلة"},{depth:3,id:"المفاتيح-المدمجة",text:"المفاتيح المُدمجة"},{depth:2,id:"الدوال",text:"الدوال"},{depth:3,id:"البحث-غير-الحساس-لحالة-الأحرف",text:"البحث غير الحسّاس لحالة الأحرف"},{depth:3,id:"الدوال-المعرفة-من-المستخدم",text:"الدوال المعرّفة من المستخدم"},{depth:2,id:"الفهارس-الجزئية",text:"الفهارس الجزئية"}],r=`<p>السكربتات الواردة في هذا الملحق جاهزة للتشغيل وقد اختُبرت على PostgreSQL 9. وستعمل معظم الأمثلة على إصدارات أقدم أيضاً.</p>
<h2 id="معامل-المساواة">معامل المساواة</h2>
<h3 id="المفاتيح-البديلة">المفاتيح البديلة</h3>
<p>ينشئ السكربت التالي جدول <code>EMPLOYEES</code> بألف مدخل.</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> employees (
   employee_id   <span class="hljs-type">NUMERIC</span>       <span class="hljs-keyword">NOT NULL</span>,
   first_name    <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">1000</span>) <span class="hljs-keyword">NOT NULL</span>,
   last_name     <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">1000</span>) <span class="hljs-keyword">NOT NULL</span>,
   date_of_birth <span class="hljs-type">DATE</span>                  ,
   phone_number  <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">1000</span>) <span class="hljs-keyword">NOT NULL</span>,
   junk          <span class="hljs-type">CHAR</span>(<span class="hljs-number">1000</span>)            ,
   <span class="hljs-keyword">CONSTRAINT</span> employees_pk <span class="hljs-keyword">PRIMARY KEY</span> (employee_id)
);
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">FUNCTION</span> random_string(minlen <span class="hljs-type">NUMERIC</span>, maxlen <span class="hljs-type">NUMERIC</span>)
<span class="hljs-keyword">RETURNS</span> <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">1000</span>)
<span class="hljs-keyword">AS</span>
$$
<span class="hljs-keyword">DECLARE</span>
  rv <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">1000</span>) :<span class="hljs-operator">=</span> <span class="hljs-string">&#x27;&#x27;</span>;
  i  <span class="hljs-type">INTEGER</span> :<span class="hljs-operator">=</span> <span class="hljs-number">0</span>;
  len <span class="hljs-type">INTEGER</span> :<span class="hljs-operator">=</span> <span class="hljs-number">0</span>;
<span class="hljs-keyword">BEGIN</span>
  IF maxlen <span class="hljs-operator">&lt;</span> <span class="hljs-number">1</span> <span class="hljs-keyword">OR</span> minlen <span class="hljs-operator">&lt;</span> <span class="hljs-number">1</span> <span class="hljs-keyword">OR</span> maxlen <span class="hljs-operator">&lt;</span> minlen <span class="hljs-keyword">THEN</span>
    <span class="hljs-keyword">RETURN</span> rv;
  <span class="hljs-keyword">END</span> IF;

  len :<span class="hljs-operator">=</span> <span class="hljs-built_in">floor</span>(random()<span class="hljs-operator">*</span>(maxlen<span class="hljs-operator">-</span>minlen)) <span class="hljs-operator">+</span> minlen;

  <span class="hljs-keyword">FOR</span> i <span class="hljs-keyword">IN</span> <span class="hljs-number">1.</span>.<span class="hljs-built_in">floor</span>(len) LOOP
    rv :<span class="hljs-operator">=</span> rv <span class="hljs-operator">||</span> chr(<span class="hljs-number">97</span><span class="hljs-operator">+</span><span class="hljs-built_in">CAST</span>(random() <span class="hljs-operator">*</span> <span class="hljs-number">25</span> <span class="hljs-keyword">AS</span> <span class="hljs-type">INTEGER</span>));
  <span class="hljs-keyword">END</span> LOOP;
  <span class="hljs-keyword">RETURN</span> rv;
<span class="hljs-keyword">END</span>;
$$ <span class="hljs-keyword">LANGUAGE</span> plpgsql;
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">INSERT INTO</span> employees (employee_id,  first_name,
                       last_name,    date_of_birth, 
                       phone_number, junk)
<span class="hljs-keyword">SELECT</span> GENERATE_SERIES
     , initcap(<span class="hljs-built_in">lower</span>(random_string(<span class="hljs-number">2</span>, <span class="hljs-number">8</span>)))
     , initcap(<span class="hljs-built_in">lower</span>(random_string(<span class="hljs-number">2</span>, <span class="hljs-number">8</span>)))
     , <span class="hljs-built_in">CURRENT_DATE</span> <span class="hljs-operator">-</span> <span class="hljs-built_in">CAST</span>(<span class="hljs-built_in">floor</span>(random() <span class="hljs-operator">*</span> <span class="hljs-number">365</span> <span class="hljs-operator">*</span> <span class="hljs-number">10</span> <span class="hljs-operator">+</span> <span class="hljs-number">40</span> <span class="hljs-operator">*</span> <span class="hljs-number">365</span>) <span class="hljs-keyword">AS</span> <span class="hljs-type">NUMERIC</span>) <span class="hljs-operator">*</span> <span class="hljs-type">INTERVAL</span> <span class="hljs-string">&#x27;1 DAY&#x27;</span>
     , <span class="hljs-built_in">CAST</span>(<span class="hljs-built_in">floor</span>(random() <span class="hljs-operator">*</span> <span class="hljs-number">9000</span> <span class="hljs-operator">+</span> <span class="hljs-number">1000</span>) <span class="hljs-keyword">AS</span> <span class="hljs-type">NUMERIC</span>)
     , <span class="hljs-string">&#x27;junk&#x27;</span>
  <span class="hljs-keyword">FROM</span> GENERATE_SERIES(<span class="hljs-number">1</span>, <span class="hljs-number">1000</span>);
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">UPDATE</span> employees 
   <span class="hljs-keyword">SET</span> first_name<span class="hljs-operator">=</span><span class="hljs-string">&#x27;MARKUS&#x27;</span>, 
       last_name<span class="hljs-operator">=</span><span class="hljs-string">&#x27;WINAND&#x27;</span>
 <span class="hljs-keyword">WHERE</span> employee_id<span class="hljs-operator">=</span><span class="hljs-number">123</span>;
</code></pre>
<pre><code>VACUUM ANALYZE employees;
</code></pre>
<p>ملاحظات:</p>
<ul>
<li>يُستخدم العمود <code>JUNK</code> للحصول على طول صف واقعي. ولأن نوع بياناته <code>CHAR</code> لا <code>VARCHAR</code>، فهو يحتاج دائماً إلى الـ1000 بايت التي يتسع لها. ولولا هذا العمود لصار الجدول صغيراً بصورة غير واقعية ولما نجحت عروض كثيرة.</li>
<li>تُملأ بيانات عشوائية في الجدول، باستثناء مدخلي أنا، الذي يُحدَّث بعد الإدراج.</li>
<li>تُجمع <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-the-equals-operator-slow-indexes-part-ii/index#sb-statistics">إحصاءات</a> الجدول ليعرف <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-the-equals-operator-slow-indexes-part-ii/index#sb-optimizer">المُحسِّن</a> شيئاً عن محتوى الجدول.</li>
</ul>
<h3 id="المفاتيح-المدمجة">المفاتيح المُدمجة</h3>
<p>يغيّر هذا السكربت جدول <code>EMPLOYEES</code> ليعكس الحالة بعد الاندماج مع شركة Very Big Company:</p>
<pre><code class="language-sql"><span class="hljs-comment">-- add subsidiary_id and update existing records</span>
<span class="hljs-keyword">ALTER TABLE</span> employees <span class="hljs-keyword">ADD</span> subsidiary_id <span class="hljs-type">NUMERIC</span>;
<span class="hljs-keyword">UPDATE</span>      employees <span class="hljs-keyword">SET</span> subsidiary_id <span class="hljs-operator">=</span> <span class="hljs-number">30</span>;
<span class="hljs-keyword">ALTER TABLE</span> employees <span class="hljs-keyword">ALTER</span> <span class="hljs-keyword">COLUMN</span> subsidiary_id <span class="hljs-keyword">SET</span> <span class="hljs-keyword">NOT NULL</span>;

<span class="hljs-comment">-- change the PK</span>
<span class="hljs-keyword">ALTER TABLE</span> employees <span class="hljs-keyword">DROP</span> <span class="hljs-keyword">CONSTRAINT</span> employees_pk;
<span class="hljs-keyword">ALTER TABLE</span> employees <span class="hljs-keyword">ADD CONSTRAINT</span> employees_pk
      <span class="hljs-keyword">PRIMARY KEY</span> (employee_id, subsidiary_id);

<span class="hljs-comment">-- generate more records (Very Big Company)</span>
<span class="hljs-keyword">INSERT INTO</span> employees (employee_id,  first_name,
                       last_name,    date_of_birth, 
                       phone_number, subsidiary_id, junk)
<span class="hljs-keyword">SELECT</span> GENERATE_SERIES
     , initcap(<span class="hljs-built_in">lower</span>(random_string(<span class="hljs-number">2</span>, <span class="hljs-number">8</span>)))
     , initcap(<span class="hljs-built_in">lower</span>(random_string(<span class="hljs-number">2</span>, <span class="hljs-number">8</span>)))
     , <span class="hljs-built_in">CURRENT_DATE</span> <span class="hljs-operator">-</span> <span class="hljs-built_in">CAST</span>(<span class="hljs-built_in">floor</span>(random() <span class="hljs-operator">*</span> <span class="hljs-number">365</span> <span class="hljs-operator">*</span> <span class="hljs-number">10</span> <span class="hljs-operator">+</span> <span class="hljs-number">40</span> <span class="hljs-operator">*</span> <span class="hljs-number">365</span>) <span class="hljs-keyword">AS</span> <span class="hljs-type">NUMERIC</span>) <span class="hljs-operator">*</span> <span class="hljs-type">INTERVAL</span> <span class="hljs-string">&#x27;1 DAY&#x27;</span>
     , <span class="hljs-built_in">CAST</span>(<span class="hljs-built_in">floor</span>(random() <span class="hljs-operator">*</span> <span class="hljs-number">9000</span> <span class="hljs-operator">+</span> <span class="hljs-number">1000</span>) <span class="hljs-keyword">AS</span> <span class="hljs-type">NUMERIC</span>)
     , <span class="hljs-built_in">CAST</span>(<span class="hljs-built_in">floor</span>(random() <span class="hljs-operator">*</span> (generate_series)<span class="hljs-operator">/</span><span class="hljs-number">9000</span><span class="hljs-operator">*</span><span class="hljs-number">29</span>) <span class="hljs-keyword">AS</span> <span class="hljs-type">NUMERIC</span>)
     , <span class="hljs-string">&#x27;junk&#x27;</span>
  <span class="hljs-keyword">FROM</span> GENERATE_SERIES(<span class="hljs-number">1</span>, <span class="hljs-number">9000</span>);

VACUUM ANALYZE employees;
</code></pre>
<p>ملاحظات:</p>
<ul>
<li>المفتاح الأساسي الجديد موسَّع فقط بـ<code>SUBSIDIARY_ID</code>؛ أي إن <code>EMPLOYEE_ID</code> يبقى في الموضع الأول.</li>
<li>تُوزَّع السجلات الجديدة عشوائياً على الفروع من 1 إلى 29.</li>
<li>يُحلَّل الجدول والفهرس مرة أخرى ليعي المُحسِّن حجم البيانات المتنامي.</li>
</ul>
<p>ويقدّم السكربت التالي الفهرس على <code>SUBSIDIARY_ID</code> لدعم الاستعلام عن جميع موظفي فرع معيّن:</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX emp_sub_id <span class="hljs-keyword">ON</span> employees (subsidiary_id);
</code></pre>
<p>ومع أن ذلك يعطي أداءً جيداً، فالأفضل استخدام الفهرس الذي يدعم المفتاح الأساسي:</p>
<pre><code class="language-sql"><span class="hljs-comment">-- use tmp index to support the PK</span>
<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">UNIQUE</span> INDEX employee_pk_tmp 
    <span class="hljs-keyword">ON</span> employees (subsidiary_id, employee_id);

 <span class="hljs-keyword">ALTER TABLE</span> employees 
   <span class="hljs-keyword">ADD CONSTRAINT</span> employees_pk_tmp
<span class="hljs-keyword">UNIQUE</span> (subsidiary_id, employee_id);

<span class="hljs-keyword">ALTER TABLE</span> employees
 <span class="hljs-keyword">DROP</span> <span class="hljs-keyword">CONSTRAINT</span> employees_pk;

<span class="hljs-keyword">ALTER TABLE</span> employees
  <span class="hljs-keyword">ADD CONSTRAINT</span> employees_pk
      <span class="hljs-keyword">PRIMARY KEY</span> (subsidiary_id, employee_id);

<span class="hljs-keyword">ALTER TABLE</span> employees
 <span class="hljs-keyword">DROP</span> <span class="hljs-keyword">CONSTRAINT</span> employees_pk_tmp;

<span class="hljs-comment">-- drop old indexes</span>
<span class="hljs-keyword">DROP</span> INDEX employee_pk_tmp;
<span class="hljs-keyword">DROP</span> INDEX emp_sub_id;
</code></pre>
<p>ملاحظات:</p>
<ul>
<li>يُنشأ فهرس جديد ويُستخدم لدعم المفتاح الأساسي (PK).</li>
<li>وما إن يتوقف استخدام فهرس المفتاح الأساسي القديم بواسطة القيد، حتى يمكن إسقاطه وإعادة إنشائه بترتيب أعمدته الجديد.</li>
<li>ويُغيَّر القيد مرة أخرى لاستخدام فهرس المفتاح الأساسي الجديد، ويمكن إسقاط الفهرس المؤقت — وكذلك الفهرس على معرّف الفرع الذي لم يعد لازماً.</li>
</ul>
<h2 id="الدوال">الدوال</h2>
<h3 id="البحث-غير-الحساس-لحالة-الأحرف">البحث غير الحسّاس لحالة الأحرف</h3>
<p>أُنشئت الأسماء العشوائية أصلاً بحالة الأحرف الصحيحة؛ حدّث سجل «ي» أنا فقط:</p>
<pre><code class="language-sql"><span class="hljs-keyword">UPDATE</span> employees 
   <span class="hljs-keyword">SET</span> first_name <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;Markus&#x27;</span>
     , last_name  <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;Winand&#x27;</span>
 <span class="hljs-keyword">WHERE</span> employee_id   <span class="hljs-operator">=</span> <span class="hljs-number">123</span>
   <span class="hljs-keyword">AND</span> subsidiary_id <span class="hljs-operator">=</span> <span class="hljs-number">30</span>;
</code></pre>
<p>العبارة اللازمة لإنشاء الفهرس القائم على الدوال:</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX emp_up_name
    <span class="hljs-keyword">ON</span> employees (<span class="hljs-built_in">UPPER</span>(last_name) varchar_pattern_ops);;
<span class="hljs-keyword">DROP</span> INDEX emp_name;;
</code></pre>
<pre><code>VACUUM ANALYZE employees;;
</code></pre>
<h3 id="الدوال-المعرفة-من-المستخدم">الدوال المعرّفة من المستخدم</h3>
<p>عرّف دالة PL/SQL تحسب العمر وحدّد محاولة استخدامها في فهرس:</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">FUNCTION</span> get_age(date_of_birth <span class="hljs-type">DATE</span>) 
<span class="hljs-keyword">RETURNS</span> <span class="hljs-type">NUMERIC</span>
<span class="hljs-keyword">AS</span>
$$
<span class="hljs-keyword">BEGIN</span>
    <span class="hljs-keyword">RETURN</span> DATE_PART(<span class="hljs-string">&#x27;year&#x27;</span>, AGE(date_of_birth));
<span class="hljs-keyword">END</span>;
$$ <span class="hljs-keyword">LANGUAGE</span> plpgsql;

<span class="hljs-keyword">CREATE</span> INDEX invalid <span class="hljs-keyword">ON</span> EMPLOYEES (get_age(date_of_birth));
</code></pre>
<p>ينبغي أن تحصل على الخطأ «functions in index expression must be marked IMMUTABLE».</p>
<h2 id="الفهارس-الجزئية">الفهارس الجزئية</h2>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> messages <span class="hljs-keyword">AS</span> (
<span class="hljs-keyword">SELECT</span> GENERATE_SERIES::<span class="hljs-type">numeric</span> id
     , <span class="hljs-keyword">CASE</span> <span class="hljs-keyword">WHEN</span> random() <span class="hljs-operator">&lt;</span> <span class="hljs-number">0.01</span> <span class="hljs-keyword">THEN</span> <span class="hljs-string">&#x27;N&#x27;</span> <span class="hljs-keyword">ELSE</span> <span class="hljs-string">&#x27;Y&#x27;</span> <span class="hljs-keyword">END</span> processed
     , <span class="hljs-built_in">CAST</span>(trunc(random() <span class="hljs-operator">*</span> <span class="hljs-number">100</span>) <span class="hljs-keyword">AS</span> <span class="hljs-type">NUMERIC</span>) receiver
     , <span class="hljs-string">&#x27;junk&#x27;</span> message
  <span class="hljs-keyword">FROM</span> GENERATE_SERIES(<span class="hljs-number">0</span>, <span class="hljs-number">999999</span>)
);

<span class="hljs-keyword">CREATE</span> INDEX messages_todo
          <span class="hljs-keyword">ON</span> messages (receiver, processed);
</code></pre>
<pre><code>PREPARE stmt(int) AS
 SELECT message
   FROM messages
  WHERE processed = 'N'
    AND receiver  = $1;

EXPLAIN EXECUTE stmt(1);
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX messages_only_todo
          <span class="hljs-keyword">ON</span> messages (receiver)
       <span class="hljs-keyword">WHERE</span> processed <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;N&#x27;</span>;

<span class="hljs-keyword">PREPARE</span> stmt(<span class="hljs-type">int</span>) <span class="hljs-keyword">AS</span>
 <span class="hljs-keyword">SELECT</span> message
   <span class="hljs-keyword">FROM</span> messages
  <span class="hljs-keyword">WHERE</span> processed <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;N&#x27;</span>
    <span class="hljs-keyword">AND</span> receiver  <span class="hljs-operator">=</span> $<span class="hljs-number">1</span>;

EXPLAIN <span class="hljs-keyword">EXECUTE</span> stmt(<span class="hljs-number">1</span>);
</code></pre>
`,o={book:s,chapter:a,chapterTitle:n,slug:p,title:l,headings:e,html:r};export{s as book,a as chapter,n as chapterTitle,o as default,e as headings,r as html,p as slug,l as title};
