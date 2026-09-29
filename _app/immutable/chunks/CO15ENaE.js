const e="use-the-index-luke",s="sql-sorting-grouping-order-by-asc-desc-nulls-last",o="Indexing `ASC`, `DESC` and `NULLS FIRST`/`LAST`",n="index",a="فهرسة `ASC` و`DESC` و`NULLS FIRST`/`LAST`",d=[],c=`<p>تستطيع قواعد البيانات قراءة الفهارس في الاتجاهين. ويعني ذلك أن <code>order by</code> متدفقاً ممكن أيضاً إذا كان نطاق الفهرس الممسوح بالترتيب المعاكس تماماً لما تحدده جملة <code>order by</code>. ومع أن مُعدِّلَي <code>ASC</code> و<code>DESC</code> في جملة <code>order by</code> قد يمنعان التنفيذ المتدفق، تقدّم معظم قواعد البيانات طريقة بسيطة لتغيير ترتيب الفهرس ليصبح قابلاً للاستخدام في <code>order by</code> متدفق.</p>
<p>يستخدم المثال التالي فهرساً بترتيب معاكس، وهو يعرض المبيعات منذ الأمس مرتَّبة بتاريخ تنازلي و<code>PRODUCT_ID</code> تنازلي.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> sale_date, product_id, quantity
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">WHERE</span> sale_date <span class="hljs-operator">&gt;=</span> TRUNC(sysdate) <span class="hljs-operator">-</span> <span class="hljs-type">INTERVAL</span> <span class="hljs-string">&#x27;1&#x27;</span> <span class="hljs-keyword">DAY</span>
 <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date <span class="hljs-keyword">DESC</span>, product_id <span class="hljs-keyword">DESC</span>
</code></pre>
<p>وتُظهر خطة التنفيذ أن قاعدة البيانات تقرأ الفهرس في اتجاه تنازلي.</p>
<p>Db2 (LUW)</p>
<pre><code>Explain Plan
---------------------------------------------------------------------
ID | Operation                      |                     Rows | Cost
 1 | RETURN                         |                          |  688
 2 |  FETCH SALES                   |     394 of 394 (100.00%) |  688
 3 |   IXSCAN (REVERSE) SALES_DT_PR | 394 of 1009326 (   .04%) |   24

Predicate Information
 3 - STOP ((CURRENT DATE - 1 DAYS) &lt;= Q1.SALE_DATE)
</code></pre>
<p>وفي Db2 يمكن منع المسوحات المعاكسة باستخدام جملة <a href="https://www.ibm.com/docs/en/db2/11.5.x?topic=statements-create-index"><code>DISALLOW REVERSE SCAN</code></a> أثناء إنشاء الفهرس.</p>
<p>Oracle</p>
<pre><code>---------------------------------------------------------------
|Id |Operation                    | Name        | Rows | Cost |
---------------------------------------------------------------
| 0 |SELECT STATEMENT             |             |  320 |  300 |
| 1 | TABLE ACCESS BY INDEX ROWID | SALES       |  320 |  300 |
|*2 |  INDEX RANGE SCAN DESCENDING| SALES_DT_PR |  320 |    4 |
---------------------------------------------------------------
</code></pre>
<p>وفي هذه الحالة تستخدم قاعدة البيانات <a href="/arabic-cs-library/book/use-the-index-luke/sql-anatomy-the-tree/index">شجرة الفهرس</a> للعثور على المدخل المطابق <em>الأخير</em>، ثم تتبع سلسلة العقد الورقية «صعوداً» كما في <a href="#fig-ascdesc-reverse">الشكل 6.2</a>. وهذا في نهاية المطاف هو السبب في استخدام قاعدة البيانات قائمة <a href="/arabic-cs-library/book/use-the-index-luke/sql-anatomy-the-leaf-nodes/index"><em>مزدوجة</em> الترابط</a> لبناء سلسلة العقد الورقية.</p>
<p>الشكل 6.2 مسح الفهرس بالاتجاه المعاكس</p>
<p>ومن الجوهري طبعاً أن يكون نطاق الفهرس الممسوح بالترتيب المعاكس تماماً كما تحتاجه جملة <code>order by</code>.</p>
<h4>مهم</h4>
<p>تستطيع قواعد البيانات قراءة الفهارس في الاتجاهين.</p>
<p>ولا يحقق المثال التالي هذا الشرط المسبق لأنه يخلط مُعدِّلَي <code>ASC</code> و<code>DESC</code> في جملة <code>order by</code>:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> sale_date, product_id, quantity
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">WHERE</span> sale_date <span class="hljs-operator">&gt;=</span> TRUNC(sysdate) <span class="hljs-operator">-</span> <span class="hljs-type">INTERVAL</span> <span class="hljs-string">&#x27;1&#x27;</span> <span class="hljs-keyword">DAY</span>
 <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date <span class="hljs-keyword">ASC</span>, product_id <span class="hljs-keyword">DESC</span>
</code></pre>
<p>فيجب أن يعرض الاستعلام أولاً مبيعات الأمس مرتَّبة بـ<code>PRODUCT_ID</code> تنازلياً، ثم مبيعات اليوم، أيضاً بـ<code>PRODUCT_ID</code> تنازلياً. ويوضح <a href="#fig-ascdesc-jump">الشكل 6.3</a> هذه العملية. وللحصول على المبيعات بالترتيب المطلوب، يجب على قاعدة البيانات أن «تقفز» أثناء مسح الفهرس.</p>
<p>الشكل 6.3 <code>order by</code> متدفق مستحيل</p>
<p>غير أنه لا يوجد رابط في الفهرس من مبيعة الأمس ذات أصغر <code>PRODUCT_ID</code> إلى مبيعة اليوم ذات أكبر <code>PRODUCT_ID</code>. ولذلك لا تستطيع قاعدة البيانات استخدام هذا الفهرس لتجنّب عملية فرز صريحة.</p>
<p>وفي حالات كهذه، تقدّم معظم قواعد البيانات طريقة بسيطة لمواءمة ترتيب الفهرس مع جملة <code>order by</code>. وبشكل ملموس، يعني ذلك أنه يمكنك استخدام مُعدِّلَي <code>ASC</code> و<code>DESC</code> في تعريف الفهرس:</p>
<pre><code>  DROP INDEX sales_dt_pr
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX sales_dt_pr
    <span class="hljs-keyword">ON</span> sales (sale_date <span class="hljs-keyword">ASC</span>, product_id <span class="hljs-keyword">DESC</span>)
</code></pre>
<h4>تحذير</h4>
<p>قبل الإصدار 8.0، كانت قاعدة بيانات MySQL <a href="https://dev.mysql.com/doc/refman/9.7/en/create-index.html">تتجاهل مُعدِّلَي <code>ASC</code> و<code>DESC</code> في تعريف الفهرس</a>. ولا تحترم MariaDB <code>DESC</code> في الفهارس <a href="https://mariadb.com/docs/release-notes/community-server/old-releases/10.8/what-is-mariadb-108">إلا منذ الإصدار 10.8.</a></p>
<p>والآن يوافق ترتيب الفهرس جملة <code>order by</code> فتستطيع قاعدة البيانات إسقاط عملية الفرز:</p>
<p>Db2 (LUW)</p>
<pre><code>Explain Plan
-----------------------------------------------------------
ID | Operation            |                     Rows | Cost
 1 | RETURN               |                          |  675
 2 |  FETCH SALES         |     387 of 387 (100.00%) |  675
 3 |   IXSCAN SALES_DT_PR | 387 of 1009326 (   .04%) |   24

Predicate Information
 3 - START ((CURRENT DATE - 1 DAYS) &lt;= Q1.SALE_DATE)
</code></pre>
<p>Oracle</p>
<pre><code>---------------------------------------------------------------
|Id | Operation                   | Name        | Rows | Cost |
---------------------------------------------------------------
| 0 | SELECT STATEMENT            |             |  320 |  301 |
| 1 |  TABLE ACCESS BY INDEX ROWID| SALES       |  320 |  301 |
|*2 |   INDEX RANGE SCAN          | SALES_DT_PR |  320 |    4 |
---------------------------------------------------------------
</code></pre>
<p>ويعرض <a href="#fig-ascdesc-mix">الشكل 6.4</a> ترتيب الفهرس الجديد. وتغيير اتجاه الفرز للعمود الثاني يبادل بمعنى ما اتجاه الأسهم في الشكل السابق، فينتهي السهم الأول حيث يبدأ الثاني، ويكون للفهرس الصفوف بالترتيب المطلوب.</p>
<h4>مهم</h4>
<p>عند استخدام مُعدِّلَي <code>ASC</code> و<code>DESC</code> مختلطَين في جملة <code>order by</code>، يجب تعريف الفهرس بالطريقة نفسها لاستخدامه في <code>order by</code> متدفق.</p>
<p>ولا يؤثر ذلك في قابلية استخدام الفهرس لجملة <code>where</code>.</p>
<p>الشكل 6.4 فهرس بترتيب مختلط</p>
<p>ولا تلزم فهرسة <code>ASC</code>/<code>DESC</code> إلا لفرز أعمدة فردية بالاتجاه المعاكس، ولا تلزم لعكس ترتيب جميع الأعمدة لأن قاعدة البيانات تستطيع مع ذلك قراءة الفهرس بترتيب تنازلي عند الحاجة — والاستثناء الوحيد هو <a href="/arabic-cs-library/book/use-the-index-luke/sql-glossary-secondary-index/index">الفهارس الثانوية</a> على <a href="/arabic-cs-library/book/use-the-index-luke/sql-clustering-index-organized-clustered-index/index">الجداول المنظَّمة بالفهرس</a>. فالفهارس الثانوية تضيف ضمناً مفتاح العنقدة إلى الفهرس دون توفير أي إمكانية لتحديد ترتيب الفرز. وإذا احتجت إلى فرز مفتاح العنقدة بترتيب تنازلي، فليس لديك خيار سوى فرز جميع الأعمدة الأخرى بترتيب تنازلي، ثم تقرأ قاعدة البيانات الفهرس بالاتجاه المعاكس للحصول على الترتيب المطلوب.</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=sec-asc-desc-null&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<p>وإلى جانب <code>ASC</code> و<code>DESC</code>، يعرّف معيار SQL مُعدِّلَين لا يكادان يُعرفان لجملة <code>order by</code>: <code>NULLS FIRST</code> و<code>NULLS LAST</code>. وقد أُدخل التحكم الصريح في فرز <code>NULL</code> «حديثاً» كامتداد <em>اختياري</em> مع SQL:2003. ونتيجة لذلك، دعم قواعد البيانات ضعيف. وهذا مقلق بوجه خاص لأن المعيار لا يعرّف بدقة ترتيب فرز <code>NULL</code>؛ فهو يكتفي بأن جميع قيم <code>NULL</code> يجب أن تظهر معاً بعد الفرز، دون تحديد ما إذا كان ينبغي أن تظهر قبل المدخلات الأخرى أو بعدها. ومن الناحية الدقيقة، ستحتاج فعلاً إلى تحديد فرز <code>NULL</code> لجميع الأعمدة التي يمكن أن تكون <code>NULL</code> في جملة <code>order by</code> للحصول على سلوك محدد جيداً.</p>
<p>لكن الواقع أن هذا الامتداد الاختياري غير مطبَّق في SQL Server 2019 ولا في MySQL 8.0. أما قاعدة بيانات Oracle، على العكس، فقد كانت تدعم فرز <code>NULLS</code> قبل إدخاله إلى المعيار، لكنها لا تقبله في تعريفات الفهارس حتى الإصدار 19<em>c</em>. ولذلك لا تستطيع قاعدة بيانات Oracle تنفيذ <code>order by</code> متدفق عند الفرز بـ<code>NULLS FIRST</code>. ولا تدعم المُعدِّل <code>NULLS</code> في جملة <code>order by</code> وفي تعريف الفهرس معاً سوى قاعدة بيانات PostgreSQL (منذ الإصدار 8.3).</p>
<p>وتلخّص النظرة العامة التالية الميزات التي تقدّمها قواعد البيانات المختلفة.</p>
<p>الشكل 6.5 مصفوفة قواعد البيانات/الميزات</p>
`,p={book:e,chapter:s,chapterTitle:o,slug:n,title:a,headings:d,html:c};export{e as book,s as chapter,o as chapterTitle,p as default,d as headings,c as html,n as slug,a as title};
