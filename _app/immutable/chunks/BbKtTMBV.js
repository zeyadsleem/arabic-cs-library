const s="use-the-index-luke",e="sql-where-clause-obfuscation-smart-logic",a="Smart Logic",n="index",p="المنطق الذكي",r=[],l=`<p>من الميزات الأساسية لقواعد بيانات SQL (databases) دعمها للاستعلامات المخصّصة: فيمكن تنفيذ استعلامات جديدة في أي وقت. وهذا ممكن فقط لأن <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-the-equals-operator-slow-indexes-part-ii/index#sb-optimizer">مُحسِّن الاستعلام</a> (query optimizer) (مخطِّط الاستعلام) يعمل في زمن التشغيل؛ فهو يحلّل كل عبارة عند استلامها ويولّد خطة تنفيذ معقولة فوراً. ويمكن تقليل العبء الناتج عن التحسين في زمن التشغيل باستخدام <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-bind-parameters/index">معاملات الربط</a>.</p>
<p>وخلاصة هذا التذكير أن قواعد البيانات مُحسَّنة لـSQL الديناميكي—فاستخدمه إذا احتجت إليه.</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=sec-smart-logic&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<p>ومع ذلك هناك ممارسة شائعة تتجنّب SQL الديناميكي لصالح SQL الثابت—غالباً بسبب خرافة «<a href="/arabic-cs-library/book/use-the-index-luke/sql-myth-directory-dynamic-sql-is-slow/index">SQL الديناميكي بطيء</a>». وهذه الممارسة تضر أكثر مما تنفع إذا كانت قاعدة البيانات تستخدم ذاكرة مؤقتة مشتركة لخطط التنفيذ مثل Db2 (LUW) أو قاعدة بيانات Oracle أو SQL Server.</p>
<p>على سبيل التوضيح، تخيّل تطبيقاً يستعلم جدول <code>EMPLOYEES</code>. ويتيح التطبيق البحث بمعرّف الشركة الفرعية ومعرّف الموظف واسم العائلة (دون حساسية لحالة الأحرف) بأي تركيبة. ولا يزال ممكناً كتابة استعلام واحد يغطي جميع الحالات باستخدام منطق «ذكي».</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> first_name, last_name, subsidiary_id, employee_id
  <span class="hljs-keyword">FROM</span> employees
 <span class="hljs-keyword">WHERE</span> ( subsidiary_id    <span class="hljs-operator">=</span> :sub_id <span class="hljs-keyword">OR</span> :sub_id <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NULL</span> )
   <span class="hljs-keyword">AND</span> ( employee_id      <span class="hljs-operator">=</span> :emp_id <span class="hljs-keyword">OR</span> :emp_id <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NULL</span> )
   <span class="hljs-keyword">AND</span> ( <span class="hljs-built_in">UPPER</span>(last_name) <span class="hljs-operator">=</span> :name   <span class="hljs-keyword">OR</span> :name   <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NULL</span> )
</code></pre>
<p>يستخدم الاستعلام <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-bind-parameters/index">متغيّرات ربط مسمّاة</a> لقراءة أفضل. وجميع تعبيرات الترشيح الممكنة مكتوبة كتابة ثابتة في العبارة. وكلما لم تكن هناك حاجة إلى مرشّح، تستخدم <code>NULL</code> بدلاً من مصطلح بحث: فيعطّل الشرط عبر منطق <code>OR</code>.</p>
<p>إنها عبارة SQL معقولة تماماً. بل إن استخدام <code>NULL</code> يتوافق مع <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-null/index">تعريفه وفق المنطق الثلاثي القيمي في SQL</a>. ومع ذلك فهو أحد <em>أسوأ الأنماط المضادة للأداء</em> على الإطلاق.</p>
<p>لا تستطيع قاعدة البيانات تحسين خطة التنفيذ لمرشّح معين لأن أي مرشّح منها قد يُلغى في زمن التشغيل. فقاعدة البيانات تحتاج إلى الاستعداد لأسوأ الحالات—إذا عُطّلت جميع المرشّحات:</p>
<pre><code>----------------------------------------------------
| Id | Operation         | Name      | Rows | Cost |
----------------------------------------------------
|  0 | SELECT STATEMENT  |           |    2 |  478 |
|* 1 |  TABLE ACCESS FULL| EMPLOYEES |    2 |  478 |
----------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
1 - filter((:NAME   IS NULL OR UPPER(&quot;LAST_NAME&quot;)=:NAME) 
       AND (:EMP_ID IS NULL OR &quot;EMPLOYEE_ID&quot;=:EMP_ID) 
       AND (:SUB_ID IS NULL OR &quot;SUBSIDIARY_ID&quot;=:SUB_ID))
</code></pre>
<p>ونتيجة لذلك، تستخدم قاعدة البيانات مسحاً كاملاً للجدول <em>حتى لو وُجد فهرس لكل عمود</em>.</p>
<p>ليس أن قاعدة البيانات لا تستطيع حل المنطق «الذكي». إنها تنشئ خطة التنفيذ العامة بسبب استخدام معاملات الربط حتى يمكن تخزينها مؤقتاً وإعادة استخدامها بقيم أخرى لاحقاً. وإذا لم نستخدم <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-bind-parameters/index">معاملات الربط</a> بل كتبنا القيم الفعلية في عبارة SQL، يختار المُحسِّن الفهرس المناسب للمرشّح النشط:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> first_name, last_name, subsidiary_id, employee_id
  <span class="hljs-keyword">FROM</span> employees
 <span class="hljs-keyword">WHERE</span>( subsidiary_id    <span class="hljs-operator">=</span> <span class="hljs-keyword">NULL</span>     <span class="hljs-keyword">OR</span> <span class="hljs-keyword">NULL</span> <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NULL</span> )
   <span class="hljs-keyword">AND</span>( employee_id      <span class="hljs-operator">=</span> <span class="hljs-keyword">NULL</span>     <span class="hljs-keyword">OR</span> <span class="hljs-keyword">NULL</span> <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NULL</span> )
   <span class="hljs-keyword">AND</span>( <span class="hljs-built_in">UPPER</span>(last_name) <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;WINAND&#x27;</span> <span class="hljs-keyword">OR</span> <span class="hljs-string">&#x27;WINAND&#x27;</span> <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NULL</span> )
</code></pre>
<pre><code>---------------------------------------------------------------
|Id | Operation                   | Name        | Rows | Cost |
---------------------------------------------------------------
| 0 | SELECT STATEMENT            |             |    1 |    2 |
| 1 |  TABLE ACCESS BY INDEX ROWID| EMPLOYEES   |    1 |    2 |
|*2 |   INDEX RANGE SCAN          | EMP_UP_NAME |    1 |    1 |
---------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
  2 - access(UPPER(&quot;LAST_NAME&quot;)='WINAND')
</code></pre>
<p>غير أن هذا ليس حلاً. إنه يثبت فقط أن قاعدة البيانات تستطيع حل هذه الشروط.</p>
<h4>تحذير</h4>
<p>استخدام القيم الحرفية يجعل تطبيقك عرضة لهجمات <a href="https://en.wikipedia.org/wiki/SQL_injection">حقن SQL</a> (SQL injection) وقد يسبب مشكلات أداء بسبب زيادة عبء التحسين.</p>
<p>الحل الواضح للاستعلامات الديناميكية هو SQL الديناميكي. ووفق <a href="https://en.wikipedia.org/wiki/KISS_principle">مبدأ KISS</a>، أخبر قاعدة البيانات بما تحتاجه الآن فقط—ولا شيء آخر.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> first_name, last_name, subsidiary_id, employee_id
  <span class="hljs-keyword">FROM</span> employees
 <span class="hljs-keyword">WHERE</span> <span class="hljs-built_in">UPPER</span>(last_name) <span class="hljs-operator">=</span> :name
</code></pre>
<p>لاحظ أن الاستعلام يستخدم معامل ربط.</p>
<h4>نصيحة</h4>
<p>استخدم SQL الديناميكي إذا احتجت إلى عبارات <code>where</code> ديناميكية.</p>
<p>ولا تزل تستخدم معاملات الربط عند توليد SQL الديناميكي—وإلا تحققت خرافة «<a href="/arabic-cs-library/book/use-the-index-luke/sql-myth-directory-dynamic-sql-is-slow/index">SQL الديناميكي بطيء</a>».</p>
<p>المشكلة الموصوفة في هذا القسم واسعة الانتشار. ولجميع قواعد البيانات التي تستخدم ذاكرة مؤقتة مشتركة لخطط التنفيذ ميزة للتعامل معها—غالباً ما تُدخل مشكلات وأخطاء جديدة.</p>
<p>Db2 (LUW) يستخدم Db2 ذاكرة مؤقتة مشتركة لخطط التنفيذ وهو معرّض تماماً للمشكلة الموصوفة في هذا القسم.</p>
<p>يتيح Db2 تحديد <a href="https://www.ibm.com/docs/en/db2/11.5.x?topic=commands-bind">نهج إعادة التحسين</a> باستخدام تلميح <code>REOPT</code>. والقيمة الافتراضية هي <code>NONE</code> التي تنتج خطة تنفيذ عامة وتعاني المشكلة الموصوفة أعلاه. وتطلب <code>REOPT(ALWAYS)</code> من المُحسِّن أن يطّلع دائماً على متغيّرات الربط الفعلية لإنشاء أفضل خطة لكل تنفيذ. وهذا فعلياً إيقاف للتخزين المؤقت لخطط التنفيذ لتلك العبارة.</p>
<p>والخيار الأخير هو <code>REOPT(ONCE)</code> الذي يطّلع على معاملات الربط للتنفيذ الأول فقط. ومشكلة هذا النهج سلوكه غير الحتمي: فالقيم من التنفيذ الأول تؤثر في جميع التنفيذات. وقد تتغير خطة التنفيذ كلما أُعيد تشغيل قاعدة البيانات، أو—بشكل أقل قابلية للتنبؤ—تنتهي صلاحية الخطة المخزّنة مؤقتاً فيعيد المُحسِّن إنشاءها بقيم مختلفة في المرة التالية التي تُنفَّذ فيها العبارة.</p>
<p>MySQL</p>
<p>لا يعاني MySQL من هذه المشكلة تحديداً لأنه لا يملك ذاكرة مؤقتة لخطط التنفيذ إطلاقاً. وتناقش <a href="https://bugs.mysql.com/bug.php?id=42808">طلب ميزة من 2009</a> أثر التخزين المؤقت لخطط التنفيذ. ويبدو أن مُحسِّن MySQL بسيط بما يكفي بحيث لا يستحق التخزين المؤقت لخطط التنفيذ.</p>
<p>Oracle</p>
<p>تستخدم قاعدة بيانات Oracle ذاكرة مؤقتة مشتركة لخطط التنفيذ («SQL area») وهي معرّضة تماماً للمشكلة الموصوفة في هذا القسم.</p>
<p>أدخلت Oracle ما يسمى <em>التطلّع إلى معاملات الربط</em> (bind peeking) مع الإصدار 9<em>i</em>. ويتيح التطلّع إلى معاملات الربط للمُحسِّن استخدام قيم الربط الفعلية من التنفيذ الأول عند إعداد خطة التنفيذ. ومشكلة هذا النهج سلوكه غير الحتمي: فالقيم من التنفيذ الأول تؤثر في جميع التنفيذات. وقد تتغير خطة التنفيذ كلما أُعيد تشغيل قاعدة البيانات، أو—بشكل أقل قابلية للتنبؤ—تنتهي صلاحية الخطة المخزّنة مؤقتاً فيعيد المُحسِّن إنشاءها بقيم مختلفة في المرة التالية التي تُنفَّذ فيها العبارة.</p>
<p>أدخل الإصدار 11<em>g</em> <em>مشاركة المؤشرات التكيّفية</em> (adaptive cursor sharing) لتحسين الوضع أكثر. وتتيح هذه الميزة لقاعدة البيانات تخزين عدة خطط تنفيذ مؤقتاً لعبارة SQL نفسها. علاوة على ذلك، يطّلع المُحسِّن على معاملات الربط ويخزّن انتقائيتها المقدّرة مع خطة التنفيذ. وعند الوصول إلى الذاكرة المؤقتة لاحقاً، يجب أن تقع انتقائية قيم الربط الحالية ضمن نطاقات انتقائية خطة تنفيذ مخزّنة لتُعاد استخدامها. وإلا ينشئ المُحسِّن خطة تنفيذ جديدة ويقارنها بخطط التنفيذ المخزّنة مسبقاً لهذا الاستعلام. وإذا وُجدت خطة تنفيذ كهذه بالفعل، تستبدلها قاعدة البيانات بخطة تنفيذ جديدة تغطي أيضاً تقديرات انتقائية قيم الربط الحالية. وإن لم توجد، تخزّن نسخة خطة تنفيذ جديدة لهذا الاستعلام—مع تقديرات الانتقائية بالطبع.</p>
<p>PostgreSQL</p>
<p>تعمل ذاكرة PostgreSQL المؤقتة لخطط الاستعلام للعبارات المفتوحة فقط—أي ما دمت تُبقي <code>PreparedStatement</code> مفتوحاً. ولا تحدث المشكلة الموصوفة أعلاه إلا عند إعادة استخدام مقبض عبارة. لاحظ أن مشغّل JDBC في PostgreSQL يفعّل الذاكرة المؤقتة بعد التنفيذ الخامس فقط. انظر أيضاً: <a href="/arabic-cs-library/book/use-the-index-luke/sql-explain-plan-postgres-concrete-planning/index">التخطيط بقيم الربط الفعلية</a>.</p>
<p>SQL Server</p>
<p>يستخدم SQL Server ما يسمى <em>استنشاق المعاملات</em> (parameter sniffing). ويتيح استنشاق المعاملات للمُحسِّن استخدام قيم الربط الفعلية من التنفيذ الأول أثناء التحليل. ومشكلة هذا النهج سلوكه غير الحتمي: فالقيم من التنفيذ الأول تؤثر في جميع التنفيذات. وقد تتغير خطة التنفيذ كلما أُعيد تشغيل قاعدة البيانات، أو—بشكل أقل قابلية للتنبؤ—تنتهي صلاحية الخطة المخزّنة مؤقتاً فيعيد المُحسِّن إنشاءها بقيم مختلفة في المرة التالية التي تُنفَّذ فيها العبارة.</p>
<p>يوفر SQL Server تلميحات استعلام لمزيد من التحكم في استنشاق المعاملات وإعادة الترجمة. ويتجاوز <a href="https://learn.microsoft.com/en-us/sql/t-sql/queries/hints-transact-sql-query?view=sql-server-ver16">تلميح الاستعلام</a> <code>RECOMPILE</code> ذاكرة الخطط المؤقتة لعبارة مختارة. وتتيح <code>OPTIMIZE FOR</code> تحديد قيم معاملات فعلية تُستخدم للتحسين فقط. وأخيراً، يمكنك تقديم خطة تنفيذ كاملة بتلميح <code>USE PLAN</code>.</p>
<p>غير أن هذه الميزات قطعت شوطاً طويلاً إذ وُجدت عدة أخطاء وسلوكيات مفاجئة في حالات خاصة. ووصفها يتجاوز نطاق هذا الكتاب بكثير، لكن لحسن الحظ <a href="https://www.sommarskog.se/dyn-search-2008.html">يحتفظ Erland Sommarskog بجميع المعلومات ذات الصلة حتى SQL Server 2022</a>.</p>
<p>ورغم أن الطرق الاستكشافية يمكن أن تحسّن مشكلة «المنطق الذكي» إلى حد ما، فقد بُنيت في الواقع للتعامل مع مشكلات معامل الربط فيما يتصل بالمدرجات التكرارية للأعمدة وتعبيرات <code>LIKE</code>.</p>
<p>وأكثر الطرق موثوقية للوصول إلى أفضل خطة تنفيذ هي تجنّب المرشّحات غير الضرورية في عبارة SQL.</p>
<h4>انظر أيضاً</h4>
<p><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-bind-parameters/index#samples_bind_parameters">استخدام متغيّرات الربط - أمثلة</a></p>
<p><a href="/arabic-cs-library/book/use-the-index-luke/sql-myth-directory-dynamic-sql-is-slow/index#myth-dynamic-sql-sample">بناء SQL الديناميكي باستخدام أدوات ORM - أمثلة</a></p>
`,o={book:s,chapter:e,chapterTitle:a,slug:n,title:p,headings:r,html:l};export{s as book,e as chapter,a as chapterTitle,o as default,r as headings,l as html,n as slug,p as title};
