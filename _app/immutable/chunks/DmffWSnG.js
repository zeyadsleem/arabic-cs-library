const s="use-the-index-luke",a="sql-example-schema-oracle-where-clause",n="Oracle Example Scripts for “The Where Clause”",l="index",p="سكربتات أمثلة Oracle لـ«جملة WHERE»",e=[{depth:2,id:"معامل-المساواة",text:"معامل المساواة"},{depth:3,id:"المفاتيح-البديلة",text:"المفاتيح البديلة"},{depth:3,id:"المفاتيح-المدمجة",text:"المفاتيح المُدمجة"},{depth:3,id:"الفهارس-البطيئة-الجزء-الثاني",text:"الفهارس البطيئة، الجزء الثاني"},{depth:2,id:"الدوال",text:"الدوال"},{depth:3,id:"البحث-غير-الحساس-لحالة-الأحرف",text:"البحث غير الحسّاس لحالة الأحرف"},{depth:3,id:"الدوال-المعرفة-من-المستخدم",text:"الدوال المعرّفة من المستخدم"},{depth:2,id:"البحث-عن-النطاقات",text:"البحث عن النطاقات"},{depth:2,id:"فهرسة-null",text:"فهرسة NULL"},{depth:2,id:"محاكاة-الفهارس-الجزئية",text:"محاكاة الفهارس الجزئية"}],c=`<h2 id="معامل-المساواة">معامل المساواة</h2>
<h3 id="المفاتيح-البديلة">المفاتيح البديلة</h3>
<p>ينشئ السكربت التالي جدول <code>EMPLOYEES</code> بألف مدخل.</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> employees (
   employee_id   NUMBER         <span class="hljs-keyword">NOT NULL</span>,
   first_name    VARCHAR2(<span class="hljs-number">1000</span>) <span class="hljs-keyword">NOT NULL</span>,
   last_name     VARCHAR2(<span class="hljs-number">1000</span>) <span class="hljs-keyword">NOT NULL</span>,
   date_of_birth <span class="hljs-type">DATE</span>           <span class="hljs-keyword">NOT NULL</span>,
   phone_number  VARCHAR2(<span class="hljs-number">1000</span>) <span class="hljs-keyword">NOT NULL</span>,
   junk          <span class="hljs-type">CHAR</span>(<span class="hljs-number">1000</span>)     <span class="hljs-keyword">DEFAULT</span> <span class="hljs-string">&#x27;JUNK&#x27;</span>,
   <span class="hljs-keyword">CONSTRAINT</span> employees_pk <span class="hljs-keyword">PRIMARY KEY</span> (employee_id)
);
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">INSERT INTO</span> employees (employee_id,  first_name,
                       last_name,    date_of_birth, 
                       phone_number)
<span class="hljs-keyword">SELECT</span> level, 
       DBMS_RANDOM.STRING(<span class="hljs-string">&#x27;u&#x27;</span>, <span class="hljs-number">1</span>) <span class="hljs-operator">||</span> 
            DBMS_RANDOM.STRING(<span class="hljs-string">&#x27;l&#x27;</span>, DBMS_RANDOM.value(<span class="hljs-number">2</span>,<span class="hljs-number">10</span>)),
       DBMS_RANDOM.STRING(<span class="hljs-string">&#x27;u&#x27;</span>, <span class="hljs-number">1</span>) <span class="hljs-operator">||</span> 
            DBMS_RANDOM.STRING(<span class="hljs-string">&#x27;l&#x27;</span>, DBMS_RANDOM.value(<span class="hljs-number">2</span>,<span class="hljs-number">10</span>)),
       SYSDATE <span class="hljs-operator">-</span> (DBMS_RANDOM.normal() <span class="hljs-operator">*</span> <span class="hljs-number">365</span> <span class="hljs-operator">*</span> <span class="hljs-number">10</span>) <span class="hljs-operator">-</span> <span class="hljs-number">40</span> <span class="hljs-operator">*</span> <span class="hljs-number">365</span>,
       TRUNC(DBMS_RANDOM.VALUE(<span class="hljs-number">1000</span>,<span class="hljs-number">10000</span>))
  <span class="hljs-keyword">FROM</span> DUAL 
  <span class="hljs-keyword">CONNECT</span> <span class="hljs-keyword">BY</span> level <span class="hljs-operator">&lt;=</span> <span class="hljs-number">1000</span>;
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">UPDATE</span> employees 
   <span class="hljs-keyword">SET</span> first_name<span class="hljs-operator">=</span><span class="hljs-string">&#x27;MARKUS&#x27;</span>, 
       last_name<span class="hljs-operator">=</span><span class="hljs-string">&#x27;WINAND&#x27;</span>
 <span class="hljs-keyword">WHERE</span> employee_id<span class="hljs-operator">=</span><span class="hljs-number">123</span>;
</code></pre>
<pre><code class="language-javascript"><span class="hljs-variable constant_">BEGIN</span>
     <span class="hljs-variable constant_">DBMS_STATS</span>.<span class="hljs-title function_">GATHER_TABLE_STATS</span>(<span class="hljs-literal">null</span>, <span class="hljs-string">&#x27;EMPLOYEES&#x27;</span>, 
     <span class="hljs-function"><span class="hljs-params">METHOD_OPT</span>=&gt;</span><span class="hljs-string">&#x27;for all indexed columns&#x27;</span>, <span class="hljs-function"><span class="hljs-params">CASCADE</span> =&gt;</span> <span class="hljs-literal">true</span>);
<span class="hljs-variable constant_">END</span>;
</code></pre>
<p>ملاحظات:</p>
<ul>
<li>يُستخدم العمود <code>JUNK</code> للحصول على طول صف واقعي. ولأن نوع بياناته <code>CHAR</code> لا <code>VARCHAR2</code>، فهو يحتاج دائماً إلى الـ1000 بايت التي يتسع لها. ولولا هذا العمود لصار الجدول صغيراً بصورة غير واقعية ولما نجحت عروض كثيرة.</li>
<li>تُملأ بيانات عشوائية في الجدول، باستثناء مدخلي أنا، الذي يُحدَّث بعد الإدراج.</li>
<li>تُجمع <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-the-equals-operator-slow-indexes-part-ii/index#sb-statistics">إحصاءات</a> الجدول والفهرس ليعرف <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-the-equals-operator-slow-indexes-part-ii/index#sb-optimizer">المُحسِّن</a> شيئاً عن محتوى الجدول.</li>
</ul>
<h3 id="المفاتيح-المدمجة">المفاتيح المُدمجة</h3>
<p>يغيّر هذا السكربت جدول <code>EMPLOYEES</code> ليعكس الحالة بعد الاندماج مع شركة Very Big Company:</p>
<pre><code class="language-sql"><span class="hljs-comment">-- add subsidiary_id and update existing records</span>
<span class="hljs-keyword">ALTER TABLE</span> employees <span class="hljs-keyword">ADD</span> subsidiary_id NUMBER;
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">UPDATE</span>      employees <span class="hljs-keyword">SET</span> subsidiary_id <span class="hljs-operator">=</span> <span class="hljs-number">30</span>;
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">ALTER TABLE</span> employees MODIFY subsidiary_id <span class="hljs-keyword">NOT NULL</span>;
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
                       phone_number, subsidiary_id)
<span class="hljs-keyword">SELECT</span> level, 
       DBMS_RANDOM.STRING(<span class="hljs-string">&#x27;u&#x27;</span>, <span class="hljs-number">1</span>) <span class="hljs-operator">||</span> 
            DBMS_RANDOM.STRING(<span class="hljs-string">&#x27;l&#x27;</span>, DBMS_RANDOM.value(<span class="hljs-number">2</span>,<span class="hljs-number">10</span>)),
       DBMS_RANDOM.STRING(<span class="hljs-string">&#x27;u&#x27;</span>, <span class="hljs-number">1</span>) <span class="hljs-operator">||</span> 
            DBMS_RANDOM.STRING(<span class="hljs-string">&#x27;l&#x27;</span>, DBMS_RANDOM.value(<span class="hljs-number">2</span>,<span class="hljs-number">10</span>)),
       SYSDATE <span class="hljs-operator">-</span> (DBMS_RANDOM.normal() <span class="hljs-operator">*</span> <span class="hljs-number">365</span> <span class="hljs-operator">*</span> <span class="hljs-number">10</span>) <span class="hljs-operator">-</span> <span class="hljs-number">40</span> <span class="hljs-operator">*</span> <span class="hljs-number">365</span>,
       TRUNC(DBMS_RANDOM.VALUE(<span class="hljs-number">1000</span>,<span class="hljs-number">10000</span>)), 
       TRUNC(DBMS_RANDOM.VALUE(<span class="hljs-number">1</span>,level<span class="hljs-operator">/</span><span class="hljs-number">9000</span><span class="hljs-operator">*</span><span class="hljs-number">29</span>))
<span class="hljs-keyword">FROM</span> DUAL <span class="hljs-keyword">CONNECT</span> <span class="hljs-keyword">BY</span> level <span class="hljs-operator">&lt;=</span> <span class="hljs-number">9000</span>;
</code></pre>
<pre><code class="language-javascript"><span class="hljs-variable constant_">BEGIN</span>
     <span class="hljs-variable constant_">DBMS_STATS</span>.<span class="hljs-title function_">GATHER_TABLE_STATS</span>(<span class="hljs-literal">null</span>, <span class="hljs-string">&#x27;EMPLOYEES&#x27;</span>, 
     <span class="hljs-function"><span class="hljs-params">METHOD_OPT</span>=&gt;</span><span class="hljs-string">&#x27;for all indexed columns&#x27;</span>, <span class="hljs-function"><span class="hljs-params">CASCADE</span> =&gt;</span> <span class="hljs-literal">true</span>);
<span class="hljs-variable constant_">END</span>;
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
<pre><code class="language-javascript"><span class="hljs-variable constant_">BEGIN</span>
     <span class="hljs-variable constant_">DBMS_STATS</span>.<span class="hljs-title function_">GATHER_TABLE_STATS</span>(<span class="hljs-literal">null</span>, <span class="hljs-string">&#x27;EMPLOYEES&#x27;</span>, 
     <span class="hljs-function"><span class="hljs-params">METHOD_OPT</span>=&gt;</span><span class="hljs-string">&#x27;for all indexed columns&#x27;</span>, <span class="hljs-function"><span class="hljs-params">CASCADE</span> =&gt;</span> <span class="hljs-literal">true</span>);
<span class="hljs-variable constant_">END</span>;
</code></pre>
<p>ملاحظات:</p>
<ul>
<li>يُحلَّل الجدول وجميع الفهارس مرة أخرى. وفي هذه الحالة تحديداً كان يكفي تحليل الفهرس الجديد فقط.</li>
</ul>
<p>ومع أن ذلك يعطي أداءً جيداً، فالأفضل استخدام الفهرس الذي يدعم المفتاح الأساسي:</p>
<p>Oracle 11g</p>
<pre><code class="language-sql"><span class="hljs-comment">-- use tmp index to support the PK</span>
<span class="hljs-keyword">CREATE</span> INDEX employee_pk_tmp 
    <span class="hljs-keyword">ON</span> employees (subsidiary_id, employee_id, <span class="hljs-number">1</span>);
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">ALTER TABLE</span> employees 
      MODIFY <span class="hljs-keyword">CONSTRAINT</span> employees_pk 
      <span class="hljs-keyword">USING</span> INDEX employee_pk_tmp;
</code></pre>
<pre><code>-- recreate the pk index as needed (automatically done)
--DROP   INDEX employee_pk;
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">UNIQUE</span> INDEX employee_pk 
    <span class="hljs-keyword">ON</span> employees (subsidiary_id, employee_id);
</code></pre>
<pre><code class="language-sql"><span class="hljs-comment">-- change the constraint to use the new index</span>
<span class="hljs-keyword">ALTER TABLE</span> employees 
      MODIFY <span class="hljs-keyword">CONSTRAINT</span> employees_pk 
      <span class="hljs-keyword">USING</span> INDEX employee_pk;
</code></pre>
<pre><code>-- drop old indexes
DROP INDEX employee_pk_tmp;
</code></pre>
<pre><code>DROP INDEX emp_sub_id;
</code></pre>
<pre><code class="language-javascript"><span class="hljs-variable constant_">BEGIN</span>
     <span class="hljs-variable constant_">DBMS_STATS</span>.<span class="hljs-title function_">GATHER_TABLE_STATS</span>(<span class="hljs-literal">null</span>, <span class="hljs-string">&#x27;EMPLOYEES&#x27;</span>, 
     <span class="hljs-function"><span class="hljs-params">METHOD_OPT</span>=&gt;</span><span class="hljs-string">&#x27;for all indexed columns&#x27;</span>, <span class="hljs-function"><span class="hljs-params">CASCADE</span> =&gt;</span> <span class="hljs-literal">true</span>);
<span class="hljs-variable constant_">END</span>;
</code></pre>
<p>Oracle 12c</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">UNIQUE</span> INDEX employee_pk_new 
    <span class="hljs-keyword">ON</span> employees (subsidiary_id, employee_id);
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">ALTER TABLE</span> employees 
      MODIFY <span class="hljs-keyword">CONSTRAINT</span> employees_pk 
      <span class="hljs-keyword">USING</span> INDEX employee_pk_new;
</code></pre>
<pre><code>-- drop old indexes
DROP INDEX emp_sub_id;
</code></pre>
<pre><code class="language-sql"><span class="hljs-comment">-- <span class="hljs-doctag">note:</span> employee_pk is automatically dropped</span>

<span class="hljs-comment">-- rename new PK index</span>
<span class="hljs-keyword">ALTER</span> INDEX employee_pk_new RENAME <span class="hljs-keyword">TO</span> employee_pk;
</code></pre>
<pre><code class="language-javascript"><span class="hljs-variable constant_">BEGIN</span>
     <span class="hljs-variable constant_">DBMS_STATS</span>.<span class="hljs-title function_">GATHER_TABLE_STATS</span>(<span class="hljs-literal">null</span>, <span class="hljs-string">&#x27;EMPLOYEES&#x27;</span>, 
     <span class="hljs-function"><span class="hljs-params">METHOD_OPT</span>=&gt;</span><span class="hljs-string">&#x27;for all indexed columns&#x27;</span>, <span class="hljs-function"><span class="hljs-params">CASCADE</span> =&gt;</span> <span class="hljs-literal">true</span>);
<span class="hljs-variable constant_">END</span>;
</code></pre>
<p>ملاحظات:</p>
<ul>
<li>في الإصدارات السابقة لـ12c، ننشئ فهرساً جديداً بعمود صوري ونستخدمه لدعم المفتاح الأساسي مؤقتاً. وهذا مطلوب لأن قاعدة بيانات Oracle حتى 11g لا تسمح بفهرسين يشملان الأعمدة نفسها.</li>
<li>وما إن يتوقف استخدام فهرس المفتاح الأساسي القديم بواسطة القيد، حتى يمكن إسقاطه وإعادة إنشائه بترتيب أعمدته الجديد.</li>
<li>ويُغيَّر القيد مرة أخرى لاستخدام فهرس المفتاح الأساسي الجديد، ويمكن إسقاط الفهرس المؤقت — وكذلك الفهرس على معرّف الفرع الذي لم يعد لازماً.</li>
</ul>
<h3 id="الفهارس-البطيئة-الجزء-الثاني">الفهارس البطيئة، الجزء الثاني</h3>
<p>تحذف العبارة التالية بعض الإحصاءات ليعمل مثالي.</p>
<pre><code>BEGIN
      DBMS_STATS.DELETE_COLUMN_STATS
       (null, 'EMPLOYEES', 'SUBSIDIARY_ID');
END
</code></pre>
<p>ولإعادة إنشائها، استخدم الإجراء نفسه كما في السابق:</p>
<pre><code class="language-javascript"><span class="hljs-variable constant_">BEGIN</span>
     <span class="hljs-variable constant_">DBMS_STATS</span>.<span class="hljs-title function_">GATHER_TABLE_STATS</span>(<span class="hljs-literal">null</span>, <span class="hljs-string">&#x27;EMPLOYEES&#x27;</span>, 
     <span class="hljs-function"><span class="hljs-params">METHOD_OPT</span>=&gt;</span><span class="hljs-string">&#x27;for all indexed columns&#x27;</span>, <span class="hljs-function"><span class="hljs-params">CASCADE</span> =&gt;</span> <span class="hljs-literal">true</span>);
<span class="hljs-variable constant_">END</span>
</code></pre>
<p>والعبارة الأخيرة لإنشاء الفهرس على العمود <code>LAST_NAME</code> وتحليله:</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX emp_name <span class="hljs-keyword">ON</span> employees (last_name)
</code></pre>
<pre><code class="language-javascript"><span class="hljs-variable constant_">BEGIN</span>
     <span class="hljs-variable constant_">DBMS_STATS</span>.<span class="hljs-title function_">GATHER_TABLE_STATS</span>(<span class="hljs-literal">null</span>, <span class="hljs-string">&#x27;EMPLOYEES&#x27;</span>, 
     <span class="hljs-function"><span class="hljs-params">METHOD_OPT</span>=&gt;</span><span class="hljs-string">&#x27;for all indexed columns&#x27;</span>, <span class="hljs-function"><span class="hljs-params">CASCADE</span> =&gt;</span> <span class="hljs-literal">true</span>);
<span class="hljs-variable constant_">END</span>
</code></pre>
<h2 id="الدوال">الدوال</h2>
<h3 id="البحث-غير-الحساس-لحالة-الأحرف">البحث غير الحسّاس لحالة الأحرف</h3>
<p>أُنشئت الأسماء العشوائية أصلاً بحالة الأحرف الصحيحة؛ حدّث سجل «ي» أنا فقط:</p>
<pre><code class="language-sql"><span class="hljs-keyword">UPDATE</span> employees 
   <span class="hljs-keyword">SET</span> first_name <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;Markus&#x27;</span>
     , last_name  <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;Winand&#x27;</span>
 <span class="hljs-keyword">WHERE</span> employee_id   <span class="hljs-operator">=</span> <span class="hljs-number">123</span>
   <span class="hljs-keyword">AND</span> subsidiary_id <span class="hljs-operator">=</span> <span class="hljs-number">30</span>;;
</code></pre>
<p>العبارة اللازمة لإنشاء الفهرس القائم على الدوال:</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX emp_up_name <span class="hljs-keyword">ON</span> employees (<span class="hljs-built_in">UPPER</span>(last_name));;
<span class="hljs-keyword">DROP</span> INDEX emp_name;;
</code></pre>
<p>ملاحظات:</p>
<ul>
<li>أخرق أفضل ممارساتي عمداً بعدم إعادة تحليل الجدول وجميع الفهارس؛ إذ يُحلَّل الفهرس الجديد فقط (تلقائياً منذ 10g).</li>
</ul>
<p>وستجمع العبارة التالية تلقائياً، بدءاً من الإصدار 11g، الإحصاءات الموسّعة للفهرس القائم على الدوال.</p>
<pre><code class="language-javascript"><span class="hljs-variable constant_">BEGIN</span>
     <span class="hljs-variable constant_">DBMS_STATS</span>.<span class="hljs-title function_">GATHER_TABLE_STATS</span>(<span class="hljs-literal">null</span>, <span class="hljs-string">&#x27;EMPLOYEES&#x27;</span>, 
     <span class="hljs-function"><span class="hljs-params">METHOD_OPT</span>=&gt;</span><span class="hljs-string">&#x27;for all indexed columns&#x27;</span>, <span class="hljs-function"><span class="hljs-params">CASCADE</span> =&gt;</span> <span class="hljs-literal">true</span>);
<span class="hljs-variable constant_">END</span>;
/
</code></pre>
<h3 id="الدوال-المعرفة-من-المستخدم">الدوال المعرّفة من المستخدم</h3>
<p>عرّف دالة PL/SQL تحسب العمر وحدّد محاولة استخدامها في فهرس:</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">FUNCTION</span> get_age(date_of_birth <span class="hljs-type">DATE</span>) 
<span class="hljs-keyword">RETURN</span> NUMBER
<span class="hljs-keyword">AS</span>
<span class="hljs-keyword">BEGIN</span>
    <span class="hljs-keyword">RETURN</span> TRUNC(MONTHS_BETWEEN(SYSDATE, DATE_OF_BIRTH)<span class="hljs-operator">/</span><span class="hljs-number">12</span>);
<span class="hljs-keyword">END</span>;
<span class="hljs-operator">/</span>

<span class="hljs-keyword">CREATE</span> INDEX invalid <span class="hljs-keyword">ON</span> EMPLOYEES (get_age(date_of_birth));
</code></pre>
<p>ينبغي أن تحصل على الخطأ «ORA-30553: The function is not deterministic».</p>
<h2 id="البحث-عن-النطاقات">البحث عن النطاقات</h2>
<p>إنشاء الفهرس <code>EMP_TEST</code>:</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX emp_test
     <span class="hljs-keyword">ON</span> employees (date_of_birth, subsidiary_id);;
</code></pre>
<p>وبترتيب الأعمدة المعاكس:</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX emp_test
     <span class="hljs-keyword">ON</span> employees (subsidiary_id, date_of_birth);;
</code></pre>
<h2 id="فهرسة-null">فهرسة NULL</h2>
<p>يعيد ما يلي إنشاء الفهارس القياسية بعد تشغيل أمثلة الكتاب:</p>
<pre><code class="language-sql"><span class="hljs-comment">-- for demo purpose we drop the NOT NULL constraint</span>
<span class="hljs-keyword">ALTER TABLE</span> employees MODIFY date_of_birth <span class="hljs-keyword">NULL</span>;;
<span class="hljs-keyword">CREATE</span> INDEX emp_dob <span class="hljs-keyword">ON</span> employees (date_of_birth);;
</code></pre>
<pre><code>DROP INDEX emp_dob_upname;;
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX emp_dob <span class="hljs-keyword">ON</span> employees (date_of_birth, <span class="hljs-string">&#x27;1&#x27;</span>);;
</code></pre>
<h2 id="محاكاة-الفهارس-الجزئية">محاكاة الفهارس الجزئية</h2>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> messages <span class="hljs-keyword">AS</span>
<span class="hljs-keyword">SELECT</span> level id
     , <span class="hljs-keyword">CASE</span> <span class="hljs-keyword">WHEN</span> DBMS_RANDOM.NORMAL() <span class="hljs-operator">&lt;</span> <span class="hljs-number">0.09</span> <span class="hljs-keyword">THEN</span> <span class="hljs-string">&#x27;N&#x27;</span> <span class="hljs-keyword">ELSE</span> <span class="hljs-string">&#x27;Y&#x27;</span> <span class="hljs-keyword">END</span> processed
     , trunc(DBMS_RANDOM.VALUE(<span class="hljs-number">0</span>,<span class="hljs-number">100</span>)) receiver
     , RPAD(<span class="hljs-string">&#x27;junk&#x27;</span>, <span class="hljs-number">200</span>) message
  <span class="hljs-keyword">FROM</span> dual 
<span class="hljs-keyword">CONNECT</span> <span class="hljs-keyword">BY</span> level <span class="hljs-operator">&lt;</span> <span class="hljs-number">999999</span>;;
</code></pre>
<p>يجب تحديث الإحصاءات بعد إنشاء الفهرس القائم على الدوال. فلا إحصاءات، فلا مُحسِّن قائم على التكلفة، فلا فهرس قائم على الدوال.</p>
<pre><code class="language-javascript">begin
   <span class="hljs-variable constant_">DBMS_STATS</span>.<span class="hljs-title function_">GATHER_TABLE_STATS</span>( user
                                ,<span class="hljs-string">&#x27;MESSAGES&#x27;</span>
                                , <span class="hljs-function"><span class="hljs-params">cascade</span>=&gt;</span><span class="hljs-literal">true</span>);
end;
/
</code></pre>
`,r={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:e,html:c};export{s as book,a as chapter,n as chapterTitle,r as default,e as headings,c as html,l as slug,p as title};
