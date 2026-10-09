const e="use-the-index-luke",n="sql-where-clause-the-equals-operator-primary-keys",s="المفاتيح الأساسية",a="index",o="المفاتيح الأساسية",p=[{depth:2,id:"المفاتيح-الأساسية-بدون-فهرس-فريد",text:"المفاتيح الأساسية بدون فهرس فريد"}],c=`<p>نبدأ بأبسط عبارات <code>where</code> وأكثرها شيوعاً: البحث بالمفتاح الأساسي (primary key lookup). وفي الأمثلة الواردة في هذا الفصل نستخدم جدول <code>EMPLOYEES</code> المعرَّف كما يلي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> employees (
   employee_id   NUMBER        <span class="hljs-keyword">NOT NULL</span>,
   first_name    <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">1000</span>) <span class="hljs-keyword">NOT NULL</span>,
   last_name     <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">1000</span>) <span class="hljs-keyword">NOT NULL</span>,
   date_of_birth <span class="hljs-type">DATE</span>          <span class="hljs-keyword">NOT NULL</span>,
   phone_number  <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">1000</span>) <span class="hljs-keyword">NOT NULL</span>,
   <span class="hljs-keyword">CONSTRAINT</span> employees_pk <span class="hljs-keyword">PRIMARY KEY</span> (employee_id)
)
</code></pre>
<p>تُنشئ قاعدة البيانات تلقائياً فهرساً للمفتاح الأساسي. ويعني ذلك وجود فهرس على العمود <code>EMPLOYEE_ID</code>، رغم عدم وجود عبارة <code>create index</code>.</p>
<h4>نصيحة</h4>
<p>يحتوي <a href="/arabic-cs-library/book/use-the-index-luke/sql-example-schema/index">الملحق ج<em>المخطط المثال</em></a> على نصوص برمجية لتعبئة جدول <code>EMPLOYEES</code> ببيانات نموذجية. ويمكنك استخدامه لاختبار الأمثلة في بيئتك الخاصة.</p>
<p>لمتابعة النص، يكفي أن تعرف أن الجدول يحتوي 1000 صف.</p>
<p>يستخدم الاستعلام التالي المفتاح الأساسي لاسترجاع اسم موظف:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> first_name, last_name
  <span class="hljs-keyword">FROM</span> employees
 <span class="hljs-keyword">WHERE</span> employee_id <span class="hljs-operator">=</span> <span class="hljs-number">123</span>
</code></pre>
<p>لا يمكن لعبارة <code>where</code> أن تطابق عدة صفوف لأن قيد المفتاح الأساسي يضمن تفرّد قيم <code>EMPLOYEE_ID</code>. ولا تحتاج قاعدة البيانات (database) إلى تتبّع عقد أوراق الفهرس—يكفي اجتياز شجرة الفهرس. ويمكننا استخدام ما يسمى <em>خطة التنفيذ</em> (execution plan) للتحقق:</p>
<p>Db2 (LUW)</p>
<p>جُمعت خطة التنفيذ التالية باستخدام عرض <a href="/arabic-cs-library/book/use-the-index-luke/sql-explain-plan-db2-getting-an-execution-plan/index#apa-db2-last_explained"><code>last_explained</code></a> المتاح من <a href="/arabic-cs-library/book/use-the-index-luke/sql-explain-plan-db2-getting-an-execution-plan/index#apa-db2-last_explained">الملحق</a>.</p>
<pre><code>Explain Plan
-------------------------------------------------------
ID | Operation             |                Rows | Cost
 1 | RETURN                |                     |   13
 2 |  FETCH EMPLOYEES      |    1 of 1 (100.00%) |   13
 3 |   IXSCAN EMPLOYEES_PK | 1 of 1000 (   .10%) |    6

Predicate Information
 3 - START (Q1.EMPLOYEE_ID = +00123.)
      STOP (Q1.EMPLOYEE_ID = +00123.)
</code></pre>
<p>عملية <code>IXSCAN</code> شبيهة بعملية <code>INDEX [RANGE|UNIQUE] SCAN</code> في Oracle. ومن هذا الناتج لا يمكننا أن نقرر إن كان مسحاً فريداً أم مسح نطاق. وتقابل عملية <code>FETCH</code> عملية <code>TABLE ACCESS BY INDEX ROWID</code> في Oracle.</p>
<p>MySQL</p>
<pre><code class="language-javascript">+----+-----------+-------+---------+---------+------+-------+
| id | table     | type  | key     | key_len | rows | <span class="hljs-title class_">Extra</span> |
+----+-----------+-------+---------+---------+------+-------+
|  <span class="hljs-number">1</span> | employees | <span class="hljs-keyword">const</span> | <span class="hljs-variable constant_">PRIMARY</span> | <span class="hljs-number">5</span>       |    <span class="hljs-number">1</span> |       |
+----+-----------+-------+---------+---------+------+-------+
</code></pre>
<p>النوع <code>const</code> هو مقابل MySQL لعملية <code>INDEX UNIQUE SCAN</code> في Oracle.</p>
<p>Oracle</p>
<pre><code>---------------------------------------------------------------
|Id |Operation                   | Name         | Rows | Cost |
---------------------------------------------------------------
| 0 |SELECT STATEMENT            |              |    1 |    2 |
| 1 | TABLE ACCESS BY INDEX ROWID| EMPLOYEES    |    1 |    2 |
|*2 |  INDEX UNIQUE SCAN         | EMPLOYEES_PK |    1 |    1 |
---------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
   2 - access(&quot;EMPLOYEE_ID&quot;=123)
</code></pre>
<p>PostgreSQL</p>
<pre><code>                QUERY PLAN
-------------------------------------------
 Index Scan using employees_pk on employees 
   (cost=0.00..8.27 rows=1 width=14)
   Index Cond: (employee_id = 123::numeric)
</code></pre>
<p>تجمع عملية <code>Index Scan</code> في PostgreSQL بين عمليتي <code>INDEX [UNIQUE/RANGE] SCAN</code> و<code>TABLE ACCES BY INDEX ROWID</code> من قاعدة بيانات Oracle. ولا يظهر من خطة التنفيذ إن كان الوصول إلى الفهرس قد يعيد أكثر من صف.</p>
<p>SQL Server</p>
<pre><code>|--Nested Loops(Inner Join)
   |--Index Seek(OBJECT:employees_pk,
   |               SEEK:employees.employee_id=@1
   |            ORDERED FORWARD)
   |--RID Lookup(OBJECT:employees,
                   SEEK:Bmk1000=Bmk1000
                 LOOKUP ORDERED FORWARD)
</code></pre>
<p>تقابل عمليتا <code>INDEX SEEK</code> و<code>RID Lookup</code> في SQL Server عمليتي <code>INDEX RANGE SCAN</code> و<code>TABLE ACCESS BY ROWID</code> في Oracle على التوالي. وخلافاً لقاعدة بيانات Oracle، يُظهر SQL Server صراحةً ضمّ <code>Nested Loops</code> لدمج بيانات الفهرس والجدول.</p>
<p>تُظهر خطة تنفيذ Oracle عملية <code>INDEX UNIQUE SCAN</code>—وهي العملية التي تجتاز شجرة الفهرس فقط. وتستفيد استفادة كاملة من قابلية التوسع اللوغاريتمي للفهرس للعثور على المدخل بسرعة كبيرة—شبه مستقلة عن حجم الجدول.</p>
<h4>نصيحة</h4>
<p>تُظهر <em>خطة التنفيذ</em> (وأحياناً <em>خطة الشرح</em> explain plan أو <em>خطة الاستعلام</em> query plan) الخطوات التي تتخذها قاعدة البيانات لتنفيذ عبارة SQL. ويشرح <a href="/arabic-cs-library/book/use-the-index-luke/sql-explain-plan/index">الملحق أ</a> كيفية استرجاع خطط التنفيذ وقراءتها في قواعد بيانات أخرى.</p>
<p>بعد الوصول إلى الفهرس، يجب على قاعدة البيانات أن تنفّذ خطوة إضافية لجلب البيانات المستعلَمة (<code>FIRST_NAME</code> و<code>LAST_NAME</code>) من مخزن الجدول: عملية <code>TABLE ACCESS BY INDEX ROWID</code>. وقد تصبح هذه العملية عنق زجاجة في الأداء—كما شُرح في <a href="/arabic-cs-library/book/use-the-index-luke/sql-anatomy-slow-indexes/index">«<em>الفهارس البطيئة، الجزء الأول</em>»</a>—لكن لا يوجد خطر من هذا القبيل مع <code>INDEX UNIQUE SCAN</code>. فهذه العملية لا يمكن أن تعيد أكثر من مدخل واحد، لذا لا يمكن أن تُطلق أكثر من وصول واحد إلى الجدول. ويعني ذلك أن مكوّنات الاستعلام البطيء غير موجودة مع <code>INDEX UNIQUE SCAN</code>.</p>
<h2 id="المفاتيح-الأساسية-بدون-فهرس-فريد">المفاتيح الأساسية بدون فهرس فريد</h2>
<p>لا يحتاج المفتاح الأساسي بالضرورة إلى فهرس فريد—يمكنك استخدام فهرس غير فريد أيضاً. وفي هذه الحالة لا تستخدم قاعدة بيانات Oracle عملية <code>INDEX UNIQUE SCAN</code> بل عملية <code>INDEX RANGE SCAN</code> بدلاً منها. ومع ذلك، لا يزال القيد يحافظ على تفرّد المفاتيح، بحيث لا يعيد البحث بالفهرس أكثر من مدخل واحد.</p>
<p>ومن أسباب استخدام فهارس غير فريدة لمفتاح أساسي <em>القيود القابلة للتأجيل</em> (deferrable constraints). وخلافاً للقيود العادية، التي تُتحقق أثناء تنفيذ العبارة، تؤجّل قاعدة البيانات التحقق من القيود القابلة للتأجيل حتى إتمام المعاملة (transaction). وتُحتاج القيود المؤجَّلة لإدراج بيانات في جداول ذات تبعيات دائرية.</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=sec-surrogate&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
`,l={book:e,chapter:n,chapterTitle:s,slug:a,title:o,headings:p,html:c};export{e as book,n as chapter,s as chapterTitle,l as default,p as headings,c as html,a as slug,o as title};
