const e="use-the-index-luke",n="sql-clustering-index-only-scan-covering-index",s="مسح الفهرس فقط: تجنّب الوصول إلى الجدول",a="index",o="مسح الفهرس فقط: تجنّب الوصول إلى الجدول",c=[{depth:2,id:"include-أعمدة-غير-مفتاحية",text:"INCLUDE: أعمدة غير مفتاحية"}],p=`<p>يُعدّ مسح الفهرس فقط (index-only scan) واحداً من أقوى أساليب الضبط على الإطلاق؛ فهو لا يتجنّب الوصول إلى الجدول لتقييم شرط <code>where</code> فحسب، بل يتجنّب الوصول إلى الجدول كلياً إذا استطاعت قاعدة البيانات العثور على الأعمدة المختارة في الفهرس نفسه.</p>
<p>ولتغطية استعلام كامل، يجب أن يحتوي الفهرس على <em>جميع</em> الأعمدة الواردة في عبارة SQL، وبخاصة أيضاً الأعمدة الموجودة في جملة <code>select</code> كما يوضح المثال التالي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX sales_sub_eur
    <span class="hljs-keyword">ON</span> sales
     ( subsidiary_id, eur_value )
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">SUM</span>(eur_value)
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">WHERE</span> subsidiary_id <span class="hljs-operator">=</span> ?
</code></pre>
<p>بالطبع تأتي فهرسة جملة <code>where</code> في المقدمة على غيرها من الجمل. ولذلك يقع العمود <code>SUBSIDIARY_ID</code> في الموضع الأول ليُعدّ <a href="/arabic-cs-library/book/use-the-index-luke/sql-glossary-index-filter-predicates/index">مُسند وصول</a>.</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=sec-index-only-scan&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<p>تُظهر خطة التنفيذ مسح الفهرس دون وصول لاحق إلى الجدول (<code>TABLE ACCESS BY INDEX ROWID</code>).</p>
<p>Db2 (LUW)</p>
<pre><code>Explain Plan
---------------------------------------------------------------
ID | Operation              |                       Rows | Cost
 1 | RETURN                 |                            |   21
 2 |  GRPBY (COMPLETE)      |       1 of 34804 (   .00%) |   21
 3 |   IXSCAN SALES_SUB_EUR | 34804 of 1009326 (  3.45%) |   19

Predicate Information
 3 - START (Q1.SUBSIDIARY_ID = ?)
      STOP (Q1.SUBSIDIARY_ID = ?)
</code></pre>
<p>Oracle</p>
<pre><code>----------------------------------------------------------
| Id  | Operation         | Name          |  Rows | Cost |
----------------------------------------------------------
|   0 | SELECT STATEMENT  |               |     1 |  104 |
|   1 |  SORT AGGREGATE   |               |     1 |      |
|*  2 |   INDEX RANGE SCAN| SALES_SUB_EUR | 40388 |  104 |
----------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
   2 - access(&quot;SUBSIDIARY_ID&quot;=TO_NUMBER(:A))
</code></pre>
<p>يغطي الفهرس الاستعلام بأكمله، ولذلك يسمى أيضاً <em>فهرساً مُغطّياً</em> (covering index).</p>
<h4>ملاحظة</h4>
<p>إذا منع الفهرس الوصول إلى الجدول، سُمّي أيضاً <em>فهرساً مُغطّياً</em>.</p>
<p>غير أن المصطلح مضلّل لأنه يوحي بأنه خاصية من خصائص الفهرس، بينما تشير عبارة «مسح الفهرس فقط» على نحو صحيح إلى أنه عملية من عمليات خطة التنفيذ.</p>
<p>يحتوي الفهرس على نسخة من العمود <code>EUR_VALUE</code>، لذا تستطيع قاعدة البيانات استخدام القيمة المخزنة في الفهرس. ولا يلزم الوصول إلى الجدول لأن الفهرس يملك كل المعلومات اللازمة لتلبية الاستعلام.</p>
<p>ويمكن لمسح الفهرس فقط أن يحسّن الأداء تحسّناً هائلاً. انظر فقط إلى تقدير عدد الصفوف في خطة التنفيذ: يتوقع المُحسِّن تجميع أكثر من 40,000 صف. ويعني ذلك أن مسح الفهرس فقط يمنع 40,000 عملية جلب من الجدول — إذا كان كل صف في كتلة جدول مختلفة. أما إذا كان للفهرس <a href="/arabic-cs-library/book/use-the-index-luke/sql-clustering-index-filter-predicates/index#sb-clustering-factor">عامل عنقدة</a> جيد، أي إذا كانت الصفوف المعنية مجمّعة جيداً في بضع كتل من الجدول، فقد تكون الميزة أقل بكثير.</p>
<p>وإلى جانب عامل العنقدة، يحدّ عدد الصفوف المختارة من المكسب المحتمل في الأداء لمسح الفهرس فقط. فإذا اخترت صفاً واحداً مثلاً، فلن توفّر سوى وصول واحد إلى الجدول. وبالنظر إلى أن <a href="/arabic-cs-library/book/use-the-index-luke/sql-anatomy-the-tree/index">اجتياز الشجرة</a> يحتاج إلى جلب بضع كتل أيضاً، فقد يصبح الوصول الموفَّر إلى الجدول مهملاً.</p>
<h4>مهم</h4>
<p>تعتمد الميزة الأدائية لمسح الفهرس فقط على عدد الصفوف التي يُوصَل إليها وعلى عامل العنقدة في الفهرس.</p>
<p>ومسح الفهرس فقط استراتيجية فهرسة عدوانية. فلا تصمّم فهرساً لأجل مسح الفهرس فقط بمجرد الشك، لأنه يستهلك الذاكرة بلا داع ويزيد جهد الصيانة اللازم لعبارات <code>update</code>. انظر <a href="/arabic-cs-library/book/use-the-index-luke/sql-dml/index">الفصل 8، «<em>تعديل البيانات</em>»</a>. عملياً، ينبغي أن تفهرس أولاً دون النظر إلى جملة <code>select</code>، وألا توسّع الفهرس إلا عند الحاجة.</p>
<p>وقد يسبّب مسح الفهرس فقط مفاجآت غير سارة أيضاً، كما لو قصرنا الاستعلام على المبيعات الحديثة:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">SUM</span>(eur_value)
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">WHERE</span> subsidiary_id <span class="hljs-operator">=</span> ?
   <span class="hljs-keyword">AND</span> sale_date <span class="hljs-operator">&gt;</span> ?
</code></pre>
<p>من دون النظر إلى خطة التنفيذ، قد يتوقع المرء أن يعمل الاستعلام أسرع لأنه يختار صفوفاً أقل. غير أن جملة <code>where</code> تشير إلى عمود غير موجود في الفهرس، لذا يجب على قاعدة البيانات أن تصل إلى الجدول لتحميل هذا العمود.</p>
<p>Db2 (LUW)</p>
<pre><code>Explain Plan
-------------------------------------------------------------------
ID | Operation                 |                       Rows |  Cost
 1 | RETURN                    |                            | 13547
 2 |  GRPBY (COMPLETE)         |        1 of 1223 (   .08%) | 13547
 3 |   FETCH SALES             |    1223 of 34804 (  3.51%) | 13547
 4 |    RIDSCN                 |   34804 of 34804 (100.00%) |    32
 5 |     SORT (UNIQUE)         |   34804 of 34804 (100.00%) |    32
 6 |      IXSCAN SALES_SUB_EUR | 34804 of 1009326 (  3.45%) |    19

Predicate Information
 3 - SARG (? &lt; Q1.SALE_DATE)
     SARG (Q1.SUBSIDIARY_ID = ?)
 6 - START (Q1.SUBSIDIARY_ID = ?)
      STOP (Q1.SUBSIDIARY_ID = ?)
</code></pre>
<p>Oracle</p>
<pre><code>--------------------------------------------------------------
|Id | Operation                    | Name      | Rows  |Cost |
--------------------------------------------------------------
| 0 | SELECT STATEMENT             |           |     1 | 371 |
| 1 |  SORT AGGREGATE              |           |     1 |     |
|*2 |   TABLE ACCESS BY INDEX ROWID| SALES     |  2019 | 371 |
|*3 |    INDEX RANGE SCAN          | SALES_DATE| 10541 |  30 |
--------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
   2 - filter(&quot;SUBSIDIARY_ID&quot;=TO_NUMBER(:A))
   3 - access(&quot;SALE_DATE&quot;&gt;:B)
</code></pre>
<p>يزيد الوصول إلى الجدول من زمن الاستجابة رغم أن الاستعلام يختار صفوفاً أقل. والعامل ذو الصلة ليس عدد الصفوف التي يعيدها الاستعلام، بل عدد الصفوف التي يجب على قاعدة البيانات فحصها للعثور عليها.</p>
<h4>تحذير</h4>
<p>قد يؤدي توسيع جملة <code>where</code> إلى سلوك أداء «غير منطقي». افحص خطة التنفيذ قبل توسيع الاستعلامات.</p>
<p>وإذا لم يعد بالإمكان استخدام الفهرس لمسح الفهرس فقط، اختار المُحسِّن ثاني أفضل خطة تنفيذ. ويعني ذلك أن المُحسِّن قد يختار خطة تنفيذ مختلفة تماماً أو، كما في الحالة أعلاه، خطة مشابهة بفهرس آخر. وهو هنا يستخدم فهرساً على <code>SALE_DATE</code>، وهو من بقايا <a href="/arabic-cs-library/book/use-the-index-luke/sql-join-hash-join-partial-objects/index">الفصل السابق</a>.</p>
<p>ومن منظور المُحسِّن، لهذا الفهرس ميزتان على <code>SALES_SUB_EUR</code>: إذ يعتقد المُحسِّن أن المرشّح على <code>SALE_DATE</code> أكثر انتقائية من المرشّح على <code>SUBSIDIARY_ID</code>، ويمكنك رؤية ذلك في عمود «Rows» في خطتي التنفيذ الأخيرتين (نحو 10,000 مقابل 40,000). غير أن هذه التقديرات اعتباطية محضة لأن الاستعلام يستخدم <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-bind-parameters/index">وسائط ربط</a>؛ فقد يختار شرط <code>SALE_DATE</code> الجدول بأكمله مثلاً عند تمرير تاريخ أول عملية بيع.</p>
<p>والميزة الثانية لفهرس <code>SALES_DATE</code> أنه يمتلك عامل عنقدة أفضل. وهذا سبب وجيه، لأن جدول <code>SALES</code> لا ينمو إلا زمنياً؛ فالصفوف الجديدة تُضاف دائماً إلى نهاية الجدول ما لم تُحذف صفوف. ولذلك يوافق ترتيب الجدول ترتيب الفهرس لأن كليهما مرتّب زمنياً إجمالاً، فيكون للفهرس عامل عنقدة جيد.</p>
<p>وعند استخدام فهرس بعامل عنقدة جيد، تُخزَّن صفوف الجدول المختارة قريبة بعضها من بعض، فلا تحتاج قاعدة البيانات إلا إلى قراءة بضع كتل جدول للحصول على جميع الصفوف. وبهذا الفهرس، قد يكون الاستعلام سريعاً بما يكفي دون مسح الفهرس فقط. وفي هذه الحالة ينبغي إزالة الأعمدة غير اللازمة من الفهرس الآخر.</p>
<h4>ملاحظة</h4>
<p>بعض الفهارس لها عامل عنقدة جيد تلقائياً، فيكون المكسب الأدائي لمسح الفهرس فقط ضئيلاً.</p>
<p>وفي هذا المثال تحديداً، وقعت مصادفة سعيدة: فالمرشّح الجديد على <code>SALE_DATE</code> لم يمنع مسح الفهرس فقط فحسب، بل فتح في الوقت نفسه مسار وصول جديداً. ولذلك استطاع المُحسِّن أن يحدّ من أثر هذا التغيير في الأداء. غير أنه من الممكن أيضاً منع مسح الفهرس فقط بإضافة أعمدة إلى جمل أخرى. لكن إضافة عمود إلى جملة <code>select</code> لا يمكن أن تفتح مسار وصول جديداً قط، وهو ما قد يحدّ من أثر فقدان مسح الفهرس فقط.</p>
<h4>نصيحة</h4>
<p>حافظ على عمليات مسح الفهرس فقط لديك.</p>
<p>أضف تعليقات تذكّرك بمسح الفهرس فقط وتشير إلى هذه الصفحة ليتمكن أي شخص من القراءة عنه.</p>
<p>ويمكن أن تسبّب <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-functions-case-insensitive-search/index">الفهارس القائمة على الدوال</a> مفاجآت غير سارة أيضاً فيما يتصل بمسح الفهرس فقط؛ فالفهرس على <code>UPPER(last_name)</code> لا يمكن استخدامه لمسح الفهرس فقط عند اختيار العمود <code>LAST_NAME</code>. وكان ينبغي في <a href="/arabic-cs-library/book/use-the-index-luke/sql-clustering-index-filter-predicates/index">القسم السابق</a> أن نفهرس العمود <code>LAST_NAME</code> نفسه لدعم مرشّح <code>LIKE</code> وإتاحة استخدامه في مسح الفهرس فقط عند اختيار العمود <code>LAST_NAME</code>.</p>
<h4>نصيحة</h4>
<p>احرص دائماً على فهرسة البيانات الأصلية، فهي غالباً أنفع معلومات يمكنك وضعها في فهرس.</p>
<p>تجنّب الفهرسة القائمة على الدوال للتعبيرات التي لا تصلح لتكون مُسندات وصول.</p>
<p>تُعدّ الاستعلامات التجميعية مثل الاستعلام أعلاه مرشّحة جيدة لمسح الفهرس فقط؛ فهي تستعلم عن صفوف كثيرة لكن عن أعمدة قليلة فقط، ما يجعل فهرساً نحيفاً كافياً لدعم مسح الفهرس فقط. وكلما زاد عدد الأعمدة التي تستعلم عنها، زاد عدد الأعمدة التي يجب إضافتها إلى الفهرس لدعم مسح الفهرس فقط. ولهذا ينبغي لك كمطوّر أن تختار الأعمدة التي تحتاج إليها فعلاً فقط.</p>
<h4>نصيحة</h4>
<p>تجنّب <code>select *</code> واجلب الأعمدة التي تحتاج إليها فقط.</p>
<p>وبصرف النظر عن أن فهرسة صفوف كثيرة تستهلك مساحة كبيرة، يمكنك أيضاً أن تصل إلى حدود قاعدة بياناتك؛ فمعظم قواعد البيانات تفرض حدوداً صارمة نوعاً ما على عدد الأعمدة في الفهرس وعلى الحجم الكلي لمدخل الفهرس. ويعني ذلك أنك لا تستطيع فهرسة عدد اعتباطي من الأعمدة ولا أعمدة طويلة اعتباطياً. وتسرد النظرة العامة التالية أهم القيود. ومع ذلك، توجد فهارس تغطي جدولاً بأكمله كما سنرى في القسم التالي.</p>
<h2 id="include-أعمدة-غير-مفتاحية"><code>INCLUDE</code>: أعمدة غير مفتاحية</h2>
<p>تدعم SQL Server وPostgreSQL 11+ ما يسمى الأعمدة غير المفتاحية في فهارس شجرة B. وهذه الأعمدة — بخلاف الأعمدة المفتاحية التي ناقشناها حتى الآن — تُخزَّن في العقد الورقية فقط، ولذلك لا يمكن استخدامها كمُسندات وصول.</p>
<p>وتُحدَّد الأعمدة غير المفتاحية في جملة <code>include</code>:</p>
<pre><code class="language-sql"> <span class="hljs-keyword">CREATE</span> INDEX empsubupnam
     <span class="hljs-keyword">ON</span> employees
       (subsidiary_id, last_name)
INCLUDE(phone_number, first_name)
</code></pre>
<p>Db2 (LUW) <a href="https://www.ibm.com/docs/en/db2/11.5.x?topic=indexes-designing">تحدّ من الفهرس بـ64 عموداً وبحد أقصى لطول المفتاح يساوي 25% من حجم الصفحة.</a></p>
<p>وتدعم Db2 أيضاً <a href="https://www.ibm.com/docs/en/db2-for-zos/12.0.0?topic=SSEPEK_12.0.0/sqlref/src/tpc/db2z_sql_createindex.htm:/www.ibm.com/support/knowledgecenter/en/SSEPGG_11.1.0/com.ibm.db2.luw.admin.dbobj.doc/doc/t0020190.htm">جملة <code>INCLUDE</code></a> لإضافة أعمدة غير مفتاحية إلى الفهارس <em>الفريدة</em>. ويتيح لك ذلك توسيع فهرس فريد بأعمدة إضافية ليُستخدم في مسح الفهرس فقط دون تغيير دلالات الفرادة.</p>
<p>MySQL</p>
<p>مع InnoDB، تحدّ MySQL الطول الكلي للمفتاح (جميع الأعمدة) بـ3072 بايت. كما أن طول كل عمود <a href="https://dev.mysql.com/doc/refman/9.7/en/innodb-parameters.html#sysvar_innodb_large_prefix">محدود بـ767 بايت إذا لم تُمكَّن <code>innodb_large_prefix</code> أو استُخدمت صيغ صفوف غير <code>DYNAMIC</code> أو <code>COMPRESSED</code></a>. وكان ذلك هو السلوك الافتراضي حتى MySQL 5.6 ضمناً. أما فهارس MyISAM فمحدودة بـ<a href="https://dev.mysql.com/doc/refman/8.0/en/myisam-storage-engine.html">16 عموداً وبحد أقصى لطول المفتاح يساوي 1000 بايت</a>.</p>
<p>ولـMySQL ميزة فريدة تسمى «فهرسة البادئة» (prefix indexing) وتسمى أحياناً أيضاً «الفهرسة الجزئية». وهي تعني فهرسة الأحرف القليلة الأولى من العمود فقط، فلا صلة لها إذن بالفهارس الجزئية الموصوفة في <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause/index">الفصل 2</a>. وإذا فهرست عموداً يتجاوز الطول المسموح للعمود (767 أو 1000 أو 3072 بايت كما وصفنا أعلاه)، فقد تقتطع MySQL العمود وفقاً لذلك — تبعاً لـ<a href="https://dev.mysql.com/doc/refman/8.0/en/sql-mode.html#sql-mode-strict">نمط SQL</a> و<a href="https://dev.mysql.com/doc/refman/9.7/en/innodb-parameters.html#sysvar_innodb_large_prefix">صيغة الصف</a>. وفي هذه الحالة تنجح عبارة <code>create index</code> مع التحذير «Specified key was too long; max key length is … bytes». ويعني ذلك أن الفهرس لم يعد يحتفظ بنسخة كاملة من هذا العمود، فاختيار العمود يمنع مسح الفهرس فقط (على غرار الفهارس القائمة على الدوال).</p>
<p>ويمكنك استخدام فهرسة البادئة في MySQL صراحةً لتجنّب تجاوز حد الطول الكلي للمفتاح إذا ظهرت لك رسالة الخطأ «Specified key was too long; max key length is … bytes». والمثال التالي يفهرس الأحرف العشرة الأولى من العمود <code>LAST_NAME</code> فقط.</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX .. <span class="hljs-keyword">ON</span> employees (last_name(<span class="hljs-number">10</span>))
</code></pre>
<p>Oracle</p>
<p>يعتمد الحد الأقصى لطول مفتاح الفهرس على حجم الكتلة ومعاملات تخزين الفهرس (<a href="https://docs.oracle.com/en/database/oracle/oracle-database/19/refrn/logical-database-limits.html">75% من حجم كتلة قاعدة البيانات ناقص بعض الكلفة الإضافية</a>). وفهرس شجرة B محدود بـ32 عموداً.</p>
<p>وعند استخدام Oracle 11<em>g</em> بجميع الإعدادات الافتراضية (كتل بحجم 8k)، يكون الحد الأقصى لطول مفتاح الفهرس 6398 بايت. ويؤدي تجاوز هذا الحد إلى رسالة الخطأ «ORA-01450: maximum key length (6398) exceeded.»</p>
<p>PostgreSQL</p>
<p>تدعم قاعدة بيانات PostgreSQL مسح الفهرس فقط منذ <a href="https://www.depesz.com/2011/10/08/waiting-for-9-2-index-only-scans/">الإصدار 9.2</a>.</p>
<p>ويُحدّ طول مدخلات شجرة B بـ2713 بايت (قيمة مثبتة في الشيفرة، نحو <code>BLCKSZ/3</code>). ولا تظهر رسالة الخطأ المقابلة «<em>index row size ... exceeds btree maximum, 2713</em>» إلا عند تنفيذ عملية <code>insert</code> أو <code>update</code> تتجاوز الحد. ويمكن أن تحتوي فهارس شجرة B ما يصل إلى <a href="https://www.postgresql.org/docs/current/indexes-multicolumn.html">32 عموداً</a>.</p>
<p>SQL Server</p>
<p><a href="https://learn.microsoft.com/en-us/sql/sql-server/maximum-capacity-specifications-for-sql-server">تدعم SQL Server منذ الإصدار 2016 ما يصل إلى 32 عموداً مفتاحياً بحجم أقصى 1700 بايت (900 بايت للفهارس العنقودية).</a><sup class="footnote-ref"><a href="#fn1" id="fnref1">[1]</a></sup> ولا تُحسب الأعمدة غير المفتاحية ضمن هذا الحد.</p>
<h4>فكّر في الأمر</h4>
<p>الاستعلامات التي لا تختار أي أعمدة من الجدول تُنفَّذ غالباً بمسح الفهرس فقط.</p>
<p>هل يمكنك التفكير في مثال ذي معنى؟</p>
<hr class="footnotes-sep">
<section class="footnotes">
<ol class="footnotes-list">
<li id="fn1" class="footnote-item"><p>قبل SQL Server 2016: 16 عمودًا و900 بايت. <a href="#fnref1" class="footnote-backref">↩︎</a></p>
</li>
</ol>
</section>
`,d={book:e,chapter:n,chapterTitle:s,slug:a,title:o,headings:c,html:p};export{e as book,n as chapter,s as chapterTitle,d as default,c as headings,p as html,a as slug,o as title};
