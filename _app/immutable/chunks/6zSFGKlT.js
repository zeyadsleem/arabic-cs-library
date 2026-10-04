const e="use-the-index-luke",n="sql-clustering-index-filter-predicates",a="Index Filter Predicates Used Intentionally",s="index",o="مُسندات ترشيح الفهرس المستخدمة عمداً",r=[{depth:2,id:"عامل-العنقدة-في-الفهرس",text:"عامل العنقدة في الفهرس"}],i=`<p>كثيراً ما تشير <a href="/arabic-cs-library/book/use-the-index-luke/sql-glossary-index-filter-predicates/index">مُسندات ترشيح</a> الفهرس إلى استخدام غير سليم للفهرس سببه ترتيب خاطئ للأعمدة في فهرس مُدمج. ومع ذلك، يمكن استخدام مُسندات ترشيح الفهرس لسبب وجيه أيضاً، لا لتحسين أداء مسح النطاق بل لتجميع البيانات التي يُوصَل إليها تتابعياً معاً.</p>
<p>عبارات شرط <code>Where</code> التي لا تصلح لتكون مُسند وصول مرشّح جيد لهذه التقنية:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> first_name, last_name, subsidiary_id, phone_number
  <span class="hljs-keyword">FROM</span> employees
 <span class="hljs-keyword">WHERE</span> subsidiary_id <span class="hljs-operator">=</span> ?
   <span class="hljs-keyword">AND</span> <span class="hljs-built_in">UPPER</span>(last_name) <span class="hljs-keyword">LIKE</span> <span class="hljs-string">&#x27;%INA%&#x27;</span>
</code></pre>
<p>تذكّر أن تعبيرات <code>LIKE</code> ذات المحارف البديلة في البداية <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-searching-for-ranges-like-performance-tuning/index">لا يمكنها استخدام شجرة الفهرس</a>. ويعني ذلك أن فهرسة <code>LAST_NAME</code> لا تضيّق نطاق الفهرس الممسوح، سواء فهرست <code>LAST_NAME</code> أو <code>UPPER(last_name)</code>. لذلك لا تُعدّ هذه الحالة مرشّحاً جيداً للفهرسة.</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=sec-intentional-index-filter&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<p>لكن الشرط على <code>SUBSIDIARY_ID</code> مناسب جداً للفهرسة. بل لا نحتاج حتى إلى إضافة فهرس جديد، لأن <code>SUBSIDIARY_ID</code> هو بالفعل العمود الأول في فهرس المفتاح الأساسي.</p>
<p>Db2 (LUW)</p>
<pre><code>Explain Plan
------------------------------------------------------------
ID | Operation               |                   Rows | Cost
 1 | RETURN                  |                        |   40
 2 |  FETCH EMPLOYEES        |    33 of 333 (  9.91%) |   40
 3 |   RIDSCN                |   333 of 333 (100.00%) |   12
 4 |    SORT (UNIQUE)        |   333 of 333 (100.00%) |   12
 5 |     IXSCAN EMPLOYEES_PK | 333 of 10000 (  3.33%) |   12

Predicate Information
 2 - SARG (Q1.SUBSIDIARY_ID = ?)
     SARG ( UPPER(Q1.LAST_NAME) LIKE '%INA%')
 5 - START (Q1.SUBSIDIARY_ID = ?)
      STOP (Q1.SUBSIDIARY_ID = ?)
</code></pre>
<p>Oracle</p>
<pre><code>---------------------------------------------------------------
|Id | Operation                   | Name        | Rows | Cost |
---------------------------------------------------------------
| 0 | SELECT STATEMENT            |             |   17 |  230 |
|*1 |  TABLE ACCESS BY INDEX ROWID| EMPLOYEES   |   17 |  230 |
|*2 |   INDEX RANGE SCAN          | EMPLOYEEs_PK|  333 |    2 |
---------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
   1 - filter(UPPER(&quot;LAST_NAME&quot;) LIKE '%INA%')
   2 - access(&quot;SUBSIDIARY_ID&quot;=TO_NUMBER(:A))
</code></pre>
<p>في خطة التنفيذ أعلاه، ترتفع قيمة التكلفة مئة مرة من <code>INDEX RANGE SCAN</code> إلى عملية <code>TABLE ACCESS BY INDEX ROWID</code> التالية لها. وبعبارة أخرى: الوصول إلى الجدول هو ما يسبّب معظم العمل. وهو في الواقع نمط شائع وليس مشكلة بحد ذاته، لكنه المساهم الأكبر في زمن التنفيذ الكلي لهذا الاستعلام.</p>
<p>ولا يُعدّ الوصول إلى الجدول عنق زجاجة بالضرورة إذا كانت الصفوف التي يُوصَل إليها مخزنة في كتلة جدول واحدة، لأن قاعدة البيانات تستطيع جلب جميع الصفوف بعملية قراءة واحدة. أما إذا كانت الصفوف نفسها موزعة على كتل مختلفة كثيرة، فقد يصبح الوصول إلى الجدول مشكلة أداء خطيرة، لأن قاعدة البيانات يجب أن تجلب كتلاً كثيرة لاسترجاع جميع الصفوف. ويعني ذلك أن الأداء يعتمد على التوزيع الفيزيائي للصفوف التي يُوصَل إليها، أي أنه يعتمد على عنقدة الصفوف (clustering of rows).</p>
<h4>ملاحظة</h4>
<p>العلاقة بين ترتيب الفهرس وترتيب الجدول معيار للأداء، وهو ما يسمى <a href="#sb-clustering-factor"><em>عامل العنقدة في الفهرس</em></a>.</p>
<p>بل من الممكن فعلاً تحسين أداء الاستعلام بإعادة ترتيب صفوف الجدول بحيث توافق ترتيب الفهرس. لكن هذه الطريقة نادراً ما تكون قابلة للتطبيق، لأنك تستطيع تخزين صفوف الجدول في تسلسل واحد فقط. ويعني ذلك أنك لا تستطيع تحسين الجدول إلا لفهرس واحد. وحتى إذا استطعت اختيار فهرس واحد تحب تحسين الجدول له، فستبقى المهمة صعبة لأن معظم قواعد البيانات لا تقدم سوى أدوات بدائية لهذه المهمة. وما يسمى <em>تسلسل الصفوف</em> (row sequencing) في نهاية المطاف نهج غير عملي.</p>
<h2 id="عامل-العنقدة-في-الفهرس">عامل العنقدة في الفهرس</h2>
<p>عامل العنقدة في الفهرس مقياس غير مباشر لاحتمال أن يشير مدخلان متتاليان في الفهرس إلى كتلة الجدول نفسها. ويأخذ المُحسِّن هذا الاحتمال في الحسبان عند حساب قيمة تكلفة عملية <code>TABLE ACCESS BY INDEX ROWID</code>.</p>
<p>وهنا بالضبط يأتي دور <em>القوة الثانية للفهرسة</em>: عنقدة البيانات. فيمكنك إضافة أعمدة كثيرة إلى فهرس بحيث تُخزَّن تلقائياً بترتيب محدد جيداً، ما يجعل الفهرس أداة قوية وبسيطة في الوقت نفسه لعنقدة البيانات.</p>
<p>ولتطبيق هذا المفهوم على الاستعلام أعلاه، يجب أن نوسّع الفهرس ليغطي جميع الأعمدة الواردة في شرط <code>where</code>، حتى لو لم تضيّق نطاق الفهرس الممسوح:</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX empsubupnam <span class="hljs-keyword">ON</span> employees
       (subsidiary_id, <span class="hljs-built_in">UPPER</span>(last_name))
</code></pre>
<p>العمود <code>SUBSIDIARY_ID</code> هو أول عمود في الفهرس، لذا يمكن استخدامه كمُسند وصول. أما التعبير <code>UPPER(last_name)</code> فيغطي مرشّح <code>LIKE</code> بوصفه <em>مُسند ترشيح في الفهرس</em>. وتوفّر فهرسة التمثيل بأحرف كبيرة بعض دورات المعالج أثناء التنفيذ، لكن فهرساً مباشراً على <code>LAST_NAME</code> سيعمل أيضاً. وستجد المزيد عن ذلك في القسم التالي.</p>
<p>Db2 (LUW)</p>
<pre><code>Explain Plan
--------------------------------------------------------
ID | Operation             |                 Rows | Cost
 1 | RETURN                |                      |   15
 2 |  FETCH EMPLOYEES      |               0 of 0 |   15
 3 |   IXSCAN EMPSUBUPNAM2 | 0 of 10000 (   .00%) |   15

Predicate Information
 3 - START (Q1.SUBSIDIARY_ID = ?)
      STOP (Q1.SUBSIDIARY_ID = ?)
      SARG (Q1.LAST_NAME LIKE '%INA%')
</code></pre>
<p>للحصول على خطة التنفيذ المطلوبة، اضطررت إلى إزالة <code>UPPER</code> من الفهرس ومن شرط <code>where</code>. فبدءاً من Db2 (LUW) 10.5، تُعدّ الفهرسة القائمة على الدوال ميزة حديثة نسبياً، ويبدو أن المُحسِّن لم يستوعبها تماماً بعد. علاوة على ذلك، فإن استخدام ترتيبات محرّفية (collations) مناسبة للحصول على سلوك غير حسّاس لحالة الأحرف هو الخيار الأفضل في Db2 على أي حال.</p>
<p>Oracle</p>
<pre><code>--------------------------------------------------------------
|Id | Operation                   | Name       | Rows | Cost |
--------------------------------------------------------------
| 0 | SELECT STATEMENT            |            |   17 |   20 |
| 1 |  TABLE ACCESS BY INDEX ROWID| EMPLOYEES  |   17 |   20 |
|*2 |   INDEX RANGE SCAN          | EMPSUBUPNAM|   17 |    3 |
--------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
   2 - access(&quot;SUBSIDIARY_ID&quot;=TO_NUMBER(:A))
       filter(UPPER(&quot;LAST_NAME&quot;) LIKE '%INA%')
</code></pre>
<p>تُظهر خطة التنفيذ الجديدة العمليات نفسها تماماً كما في السابق، لكن قيمة التكلفة انخفضت انخفاضاً كبيراً رغم ذلك. وفي معلومات المُسندات نرى أن مرشّح <code>LIKE</code> يُطبَّق بالفعل أثناء <code>INDEX RANGE SCAN</code>؛ إذ تُستبعَد فوراً الصفوف التي لا تستوفي مرشّح <code>LIKE</code>. ولم يعد للوصول إلى الجدول أي مُسندات ترشيح، أي أنه لا يحمّل صفوفاً لا تستوفي شرط <code>where</code>.</p>
<p>الفرق بين خطتي التنفيذ ظاهر بوضوح في عمود «Rows». فحسب تقدير المُحسِّن، يطابق الاستعلام في النهاية 17 سجلاً، لكن مسح الفهرس في خطة التنفيذ الأولى يعيد 333 صفاً. ثم يجب على قاعدة البيانات أن تحمّل هذه الصفوف الـ333 من الجدول لتطبيق مرشّح <code>LIKE</code> الذي يقلّص النتيجة إلى 17 صفاً. أما في خطة التنفيذ الثانية، فلا يعيد الوصول إلى الفهرس تلك الصفوف أصلاً، لذا لا تحتاج قاعدة البيانات إلى تنفيذ عملية <code>TABLE ACCESS BY INDEX ROWID</code> سوى 17 مرة.</p>
<p>ويلزمك أيضاً أن تلاحظ أن قيمة تكلفة عملية <code>INDEX RANGE SCAN</code> ارتفعت من اثنين إلى ثلاثة لأن العمود الإضافي يكبّر الفهرس. وبالنظر إلى المكسب في الأداء، فهو تنازل مقبول.</p>
<h4>تحذير</h4>
<p>لا تُدخِل فهرساً جديداً لغرض مُسندات الترشيح وحده؛ وسّع فهرساً قائماً بدلاً من ذلك وأبقِ <a href="/arabic-cs-library/book/use-the-index-luke/sql-dml/index">جهد الصيانة</a> منخفضاً. ومع بعض قواعد البيانات، يمكنك حتى إضافة أعمدة إلى فهرس المفتاح الأساسي ليست جزءاً من المفتاح الأساسي.</p>
<p>يوضّح الرسم المتحرك التالي الفرق بين خطتي التنفيذ:</p>
<p>الشكل 5.1 مُسندات ترشيح الفهرس المستخدمة عمداً <img src="/arabic-cs-library/images/use-the-index-luke/sql-clustering-index-filter-predicates-0-intentional-filter-predicate.en.N5J1kRR3.webp" alt=""></p>
<p>يبدو هذا المثال البسيط مؤكداً للحكمة الشائعة القائلة بفهرسة كل عمود في شرط <code>where</code>. لكن هذه «الحكمة» تتجاهل أهمية ترتيب الأعمدة، وهو ما يحدد الشروط التي يمكن استخدامها كمُسندات وصول، وبالتالي له أثر هائل في الأداء. لذلك لا ينبغي أبداً ترك قرار ترتيب الأعمدة للصدفة.</p>
<p>يكبر حجم الفهرس أيضاً مع عدد الأعمدة، خصوصاً عند إضافة أعمدة نصية. وبالطبع لا يتحسن الأداء بسبب كبر الفهرس، وإن كانت <a href="/arabic-cs-library/book/use-the-index-luke/sql-anatomy-the-tree/index#sb-log">قابلية التوسع اللوغاريتمية</a> تحدّ من الأثر كثيراً. ولا ينبغي لك بأي حال إضافة كل الأعمدة المذكورة في شرط <code>where</code> إلى الفهرس، بل استخدم مُسندات ترشيح الفهرس عن عمد فقط لتقليل حجم البيانات في خطوة تنفيذ أبكر.</p>
<h4>نصيحة</h4>
<ul>
<li>المسرد: <a href="/arabic-cs-library/book/use-the-index-luke/sql-glossary-index-filter-predicates/index">مُسندات ترشيح الفهرس</a></li>
<li><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-searching-for-ranges-greater-less-between-tuning-sql-access-filter-predicates/index">مُسندات الوصول والترشيح في الفهرس مشروحة بمثال</a></li>
<li><a href="/arabic-cs-library/book/use-the-index-luke/sql-testing-scalability-data-volume/index">بيان أثر مُسندات ترشيح الفهرس العَرَضية</a></li>
<li><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-searching-for-ranges-like-performance-tuning/index">لماذا لا تُعدّ عمليات بحث <code>LIKE</code> في أي موضع مُسندات وصول</a></li>
<li>كيف تكتشف مُسندات ترشيح الفهرس في خطط التنفيذ لدى <a href="/arabic-cs-library/book/use-the-index-luke/sql-explain-plan-oracle-filter-predicates/index">Oracle</a> و<a href="/arabic-cs-library/book/use-the-index-luke/sql-explain-plan-postgresql-filter-predicates/index">PostgreSQL</a> و<a href="/arabic-cs-library/book/use-the-index-luke/sql-explain-plan-oracle-filter-predicates/index">SQL Server</a>.</li>
</ul>
`,c={book:e,chapter:n,chapterTitle:a,slug:s,title:o,headings:r,html:i};export{e as book,n as chapter,a as chapterTitle,c as default,r as headings,i as html,s as slug,o as title};
