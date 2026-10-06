const e="use-the-index-luke",n="sql-where-clause-functions-case-insensitive-search",s="Case-Insensitive Search Using `UPPER` or `LOWER`",a="index",o="البحث غير الحساس لحالة الأحرف باستخدام `UPPER` أو `LOWER`",p=[{depth:2,id:"التقييم-في-زمن-الترجمة",text:"التقييم في زمن الترجمة"},{depth:2,id:"إحصاءات-oracle-للفهارس-القائمة-على-الدوال",text:"إحصاءات Oracle للفهارس القائمة على الدوال"}],c=`<p>تجاهل حالة الأحرف في عبارة <code>where</code> بسيط جداً. يمكنك مثلاً تحويل طرفي المقارنة إلى صيغة الأحرف الكبيرة:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> first_name, last_name, phone_number
  <span class="hljs-keyword">FROM</span> employees
 <span class="hljs-keyword">WHERE</span> <span class="hljs-built_in">UPPER</span>(last_name) <span class="hljs-operator">=</span> <span class="hljs-built_in">UPPER</span>(<span class="hljs-string">&#x27;winand&#x27;</span>)
</code></pre>
<p>بغض النظر عن حالة الأحرف المستخدمة في مصطلح البحث أو في العمود <code>LAST_NAME</code>، تجعل دالة <code>UPPER</code> الطرفين متطابقين كما هو مطلوب.</p>
<h4>ملاحظة</h4>
<p>طريقة أخرى للمطابقة غير الحساسة لحالة الأحرف هي استخدام «ترتيب أبجدي» (collation) مختلف. فالترتيبات الأبجدية الافتراضية التي تستخدمها SQL Server وMySQL لا تميّز بين الأحرف الكبيرة والصغيرة—فهي غير حساسة لحالة الأحرف افتراضياً.</p>
<p>منطق هذا الاستعلام معقول تماماً، لكن خطة التنفيذ ليست كذلك:</p>
<p>Db2 (LUW)</p>
<pre><code>Explain Plan
------------------------------------------------------
ID | Operation         |                   Rows | Cost
 1 | RETURN            |                        |  690
 2 |  TBSCAN EMPLOYEES | 400 of 10000 (  4.00%) |  690

Predicate Information
 2 - SARG ( UPPER(Q1.LAST_NAME) = 'WINAND')
</code></pre>
<p>Oracle</p>
<pre><code>----------------------------------------------------
| Id | Operation         | Name      | Rows | Cost |
----------------------------------------------------
|  0 | SELECT STATEMENT  |           |   10 |  477 |
|* 1 |  TABLE ACCESS FULL| EMPLOYEES |   10 |  477 |
----------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
   1 - filter(UPPER(&quot;LAST_NAME&quot;)='WINAND')
</code></pre>
<p>PostgreSQL</p>
<pre><code>                     QUERY PLAN
------------------------------------------------------
 Seq Scan on employees
   (cost=0.00..1722.00 rows=50 width=17)
   Filter: (upper((last_name)::text) = 'WINAND'::text)
</code></pre>
<p>إنها عودة لصديقنا القديم: المسح الكامل للجدول. فرغم وجود فهرس على <code>LAST_NAME</code>، فإنه غير صالح للاستخدام—لأن البحث <em>ليس</em> على <code>LAST_NAME</code> بل على <code>UPPER(LAST_NAME)</code>. ومن منظور قاعدة البيانات، ذلك شيء <em>مختلف تماماً</em>.</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=sec-insensitive&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<p>هذا فخ قد نقع فيه جميعاً. فنحن ندرك العلاقة بين <code>LAST_NAME</code> و<code>UPPER(LAST_NAME)</code> فوراً ونتوقع أن «تراها» قاعدة البيانات أيضاً. في الواقع، رؤية المُحسِّن (optimizer) أقرب إلى هذا:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> first_name, last_name, phone_number
  <span class="hljs-keyword">FROM</span> employees
 <span class="hljs-keyword">WHERE</span> BLACKBOX(...) <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;WINAND&#x27;</span>
</code></pre>
<p>دالة <code>UPPER</code> مجرد صندوق أسود. فمعاملات الدالة غير ذات صلة لأنه لا توجد علاقة عامة بين معاملات الدالة والنتيجة.</p>
<h4>نصيحة</h4>
<p>استبدل اسم الدالة بـ<code>BLACKBOX</code> لتفهم وجهة نظر المُحسِّن.</p>
<h2 id="التقييم-في-زمن-الترجمة">التقييم في زمن الترجمة</h2>
<p>يستطيع المُحسِّن تقييم التعبير في الطرف الأيمن أثناء «زمن الترجمة» (compile time) لأن لديه جميع معاملات الإدخال. لذا تُظهر خطة تنفيذ Oracle (قسم «معلومات المُسندات») صيغة الأحرف الكبيرة لمصطلح البحث فقط. وهذا السلوك شبيه جداً بمترجم يقيّم التعبيرات الثابتة في زمن الترجمة.</p>
<p>لدعم هذا الاستعلام، نحتاج إلى فهرس يغطي مصطلح البحث الفعلي. ويعني ذلك أننا لا نحتاج فهرساً على <code>LAST_NAME</code> بل على <code>UPPER(LAST_NAME)</code>:</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX emp_up_name 
    <span class="hljs-keyword">ON</span> employees (<span class="hljs-built_in">UPPER</span>(last_name))
</code></pre>
<p>الفهرس الذي يحتوي تعريفه على دوال أو تعبيرات هو ما يسمى <em>فهرساً قائماً على دالة</em> (function-based index — FBI). فبدلاً من نسخ بيانات العمود مباشرة إلى الفهرس، يطبّق الفهرس القائم على دالة الدالة أولاً ويضع النتيجة في الفهرس. ونتيجة لذلك، يخزّن الفهرس الأسماء بصيغة الأحرف الكبيرة.</p>
<p>يمكن لقاعدة البيانات استخدام فهرس قائم على دالة إذا ظهر <em>التعبير نفسه تماماً</em> من تعريف الفهرس في عبارة SQL—كما في المثال أعلاه. وتؤكد خطة التنفيذ ذلك:</p>
<p>Db2 (LUW)</p>
<pre><code>Explain Plan
-------------------------------------------------------
ID | Operation            |                 Rows | Cost
 1 | RETURN               |                      |   13
 2 |  FETCH EMPLOYEES     |     1 of 1 (100.00%) |   13
 3 |   IXSCAN EMP_UP_NAME | 1 of 10000 (   .01%) |    6

Predicate Information
 3 - START ( UPPER(Q1.LAST_NAME) = 'WINAND')
      STOP ( UPPER(Q1.LAST_NAME) = 'WINAND')
</code></pre>
<p>غُيّر الاستعلام إلى <code>WHERE UPPER(last_name) = 'WINAND'</code> (بدون <code>UPPER</code> في الطرف الأيمن) للحصول على النتيجة المتوقعة. وعند استخدام <code>UPPER('winand')</code>، يخطئ المُحسِّن خطأً جسيماً في التقدير ويتوقع اختيار 4% من صفوف الجدول. وهذا يجعل المُحسِّن يتجاهل الفهرس وينفّذ <code>TBSCAN</code>. انظر <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-the-equals-operator-concatenated-keys/index#sb-full-table-scan"><em>مسح كامل للجدول</em></a> لترى لماذا قد يكون ذلك منطقياً.</p>
<p>Oracle</p>
<pre><code>--------------------------------------------------------------
|Id |Operation                   | Name        | Rows | Cost |
--------------------------------------------------------------
| 0 |SELECT STATEMENT            |             |  100 |   41 |
| 1 | TABLE ACCESS BY INDEX ROWID| EMPLOYEES   |  100 |   41 |
|*2 |  INDEX RANGE SCAN          | EMP_UP_NAME |   40 |    1 |
--------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
  2 - access(UPPER(&quot;LAST_NAME&quot;)='WINAND')
</code></pre>
<p>PostgreSQL</p>
<pre><code>                       QUERY PLAN
------------------------------------------------------------
Bitmap Heap Scan on employees
  (cost=4.65..178.65 rows=50 width=17)
  Recheck Cond: (upper((last_name)::text) = 'WINAND'::text)
  -&gt; Bitmap Index Scan on emp_up_name
     (cost=0.00..4.64 rows=50 width=0)
     Index Cond: (upper((last_name)::text) = 'WINAND'::text)
</code></pre>
<p>إنه <code>INDEX RANGE SCAN</code> عادي كما ورد في <a href="/arabic-cs-library/book/use-the-index-luke/sql-anatomy/index">الفصل الأول</a>. فقاعدة البيانات تجتاز شجرة B (B-tree) وتتبّع سلسلة عقد الأوراق. ولا توجد عمليات أو كلمات مفتاحية مخصصة للفهارس القائمة على الدوال.</p>
<h4>تحذير</h4>
<p>تستخدم أدوات ORM أحياناً <code>UPPER</code> و<code>LOWER</code> دون علم المطوّر. فمثلاً، يحقن Hibernate <a href="/arabic-cs-library/book/use-the-index-luke/sql-myth-directory-dynamic-sql-is-slow/index#myth-dynamic-sql-sample">دالة <code>LOWER</code> ضمنية</a> للبحث غير الحساس لحالة الأحرف.</p>
<p>لا تزال خطة التنفيذ ليست نفسها كما كانت في القسم السابق بدون <code>UPPER</code>؛ فتقدير عدد الصفوف مرتفع جداً. ومن الغريب بشكل خاص أن يتوقع المُحسِّن جلب صفوف من الجدول أكثر مما يقدّمه <code>INDEX RANGE SCAN</code> في المقام الأول. فكيف يجلب 100 صف من الجدول إذا كان مسح الفهرس السابق أعاد 40 صفاً فقط؟ الجواب أنه لا يستطيع. والتقديرات المتناقضة كهذه غالباً ما تدل على مشكلات في الإحصاءات. وفي هذه الحالة بالتحديد يرجع ذلك إلى أن قاعدة بيانات Oracle لا تحدّث إحصاءات الجدول عند إنشاء فهرس جديد (انظر أيضاً <a href="#sb-collecting-statistics">«<em>إحصاءات Oracle للفهارس القائمة على الدوال</em>»</a>).</p>
<h2 id="إحصاءات-oracle-للفهارس-القائمة-على-الدوال">إحصاءات Oracle للفهارس القائمة على الدوال <span class="content-anchor" id="sb-collecting-statistics"></span></h2>
<p>تحفظ قاعدة بيانات Oracle المعلومات عن عدد قيم العمود المتمايزة ضمن إحصاءات الجدول. وتُعاد استخدام هذه الأرقام إذا كان العمود جزءاً من فهارس متعددة.</p>
<p>وتُحفظ إحصاءات الفهرس القائم على دالة (FBI) أيضاً على مستوى الجدول كـ<em>أعمدة افتراضية</em> (virtual columns). ورغم أن قاعدة بيانات Oracle تجمع <em>إحصاءات الفهرس</em> للفهارس الجديدة تلقائياً (<a href="https://docs.oracle.com/cd/B14117_01/server.101/b10763/compat.htm#sthref320">منذ الإصدار 10<em>g</em></a>)، فإنها لا تحدّث <em>إحصاءات الجدول</em>. ولهذا السبب يوصي توثيق Oracle بتحديث إحصاءات الجدول بعد إنشاء فهرس قائم على دالة:</p>
<p>بعد إنشاء فهرس قائم على دالة، اجمع الإحصاءات على الفهرس وجدوله الأساسي معاً باستخدام حزمة <code>DBMS_STATS</code>. وستتيح هذه الإحصاءات لقاعدة بيانات Oracle أن تقرر على نحو صحيح متى تستخدم الفهرس.</p>
<p>— <a href="https://docs.oracle.com/en/database/oracle/oracle-database/19/sqlrf/CREATE-INDEX.html#GUID-1F89BBC0-825F-4215-AF71-7588E31D8BFE__I2100962">Oracle Database SQL Language Reference</a></p>
<p>وتوصيتي الشخصية تذهب أبعد من ذلك: بعد كل تغيير في الفهرس، حدّث إحصاءات الجدول الأساسي وجميع فهارسه. غير أن ذلك قد يؤدي أيضاً إلى آثار جانبية غير مرغوبة. نسّق هذا النشاط مع مديري قواعد البيانات (DBAs) وخذ نسخة احتياطية من الإحصاءات الأصلية.</p>
<p>بعد تحديث الإحصاءات، يحسب المُحسِّن تقديرات أدق:</p>
<p>Oracle</p>
<pre><code>--------------------------------------------------------------
|Id |Operation                   | Name        | Rows | Cost |
--------------------------------------------------------------
| 0 |SELECT STATEMENT            |             |    1 |    3 |
| 1 | TABLE ACCESS BY INDEX ROWID| EMPLOYEES   |    1 |    3 |
|*2 |  INDEX RANGE SCAN          | EMP_UP_NAME |    1 |    1 |
--------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
  2 - access(UPPER(&quot;LAST_NAME&quot;)='WINAND')
</code></pre>
<p>PostgreSQL</p>
<pre><code>                      QUERY PLAN
----------------------------------------------------------
 Index Scan using emp_up_name on employees
   (cost=0.00..8.28 rows=1 width=17)
   Index Cond: (upper((last_name)::text) = 'WINAND'::text)
</code></pre>
<p>وبما أن تقدير عدد الصفوف قد انخفض—من 50 في المثال أعلاه إلى 1 في خطة التنفيذ هذه—يفضّل مخطِّط الاستعلام (query planner) استخدام عملية <code>Index Scan</code> الأبسط.</p>
<h4>ملاحظة</h4>
<p><a href="https://docs.oracle.com/en/database/oracle/oracle-database/19/tgsql/managing-extended-statistics.html#GUID-BD0F0B71-DD8B-44A0-888E-495830FC09A4">ما يسمى «الإحصاءات الموسّعة» على التعبيرات ومجموعات الأعمدة</a> أُدخلت مع إصدار Oracle 11<em>g</em>.</p>
<p>ورغم أن الإحصاءات المحدَّثة لا تحسّن أداء التنفيذ في هذه الحالة—فقد كان الفهرس مستخدماً على نحو سليم على أي حال—فإن التحقق من تقديرات المُحسِّن فكرة جيدة دائماً. وعدد الصفوف المعالجة لكل عملية (تقدير العلاقة الأساسية cardinality estimate) رقم مهم بشكل خاص، ويظهر أيضاً في خطط تنفيذ SQL Server وPostgreSQL.</p>
<h4>نصيحة</h4>
<p>يصف <a href="/arabic-cs-library/book/use-the-index-luke/sql-explain-plan/index">الملحق أ، «<em>خطط التنفيذ</em>»</a> تقديرات عدد الصفوف في خطط تنفيذ قواعد البيانات الأخرى.</p>
<p>لا تدعم SQL Server وMySQL الفهارس القائمة على الدوال كما وُصفت، لكن كلتيهما تقدّم حلاً بديلاً عبر الأعمدة المحسوبة أو المولّدة. وللاستفادة من ذلك، عليك أولاً إضافة عمود مولّد إلى الجدول يمكن فهرسته بعد ذلك:</p>
<p>MySQL منذ MySQL 5.7 يمكنك <a href="https://dev.mysql.com/doc/refman/8.0/en/create-table.html#create-table-secondary-indexes-virtual-columns">فهرسة عمود مولّد</a> كما يلي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">ALTER TABLE</span> employees
  <span class="hljs-keyword">ADD</span> <span class="hljs-keyword">COLUMN</span> last_name_up <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">255</span>) <span class="hljs-keyword">AS</span> (<span class="hljs-built_in">UPPER</span>(last_name));
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX emp_up_name <span class="hljs-keyword">ON</span> employees (last_name_up);
</code></pre>
<p>SQL Server</p>
<pre><code class="language-sql"><span class="hljs-keyword">ALTER TABLE</span> employees <span class="hljs-keyword">ADD</span> last_name_up <span class="hljs-keyword">AS</span> <span class="hljs-built_in">UPPER</span>(last_name)
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX emp_up_name <span class="hljs-keyword">ON</span> employees (last_name_up)
</code></pre>
<p>تستطيع SQL Server وMySQL استخدام هذا الفهرس كلما ظهر التعبير المفهرس في العبارة. وفي بعض الحالات البسيطة، يمكن لـSQL Server و<a href="https://dev.mysql.com/doc/refman/8.0/en/generated-column-index-optimizations.html">MySQL</a> استخدام هذا الفهرس حتى إذا بقي الاستعلام دون تغيير. لكن في بعض الأحيان يجب تغيير الاستعلام ليشير إلى اسم العمود الجديد من أجل استخدام الفهرس. تحقق دائماً من خطة التنفيذ عند الشك.</p>
`,t={book:e,chapter:n,chapterTitle:s,slug:a,title:o,headings:p,html:c};export{e as book,n as chapter,s as chapterTitle,t as default,p as headings,c as html,a as slug,o as title};
