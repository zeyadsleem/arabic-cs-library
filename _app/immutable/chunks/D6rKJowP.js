const s="use-the-index-luke",e="sql-sorting-grouping-indexed-order-by",n="Indexing Order By",a="index",o="فهرسة Order By",p=[{depth:2,id:"عامل-العنقدة-المحسن-تلقائيا",text:"عامل العنقدة المُحسَّن تلقائياً"}],d=`<p>لا تحتاج استعلامات SQL التي فيها جملة <code>order by</code> إلى فرز النتيجة صراحةً إذا كان الفهرس المعني يعيد الصفوف بالترتيب المطلوب أصلاً. ويعني ذلك أن الفهرس نفسه المستخدم لجملة <code>where</code> يجب أن يغطي جملة <code>order by</code> أيضاً.</p>
<p>وكمثال، تأمّل الاستعلام التالي الذي يختار مبيعات الأمس مرتَّبةً بتاريخ البيع ومعرّف المنتج:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> sale_date, product_id, quantity
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">WHERE</span> sale_date <span class="hljs-operator">=</span> TRUNC(sysdate) <span class="hljs-operator">-</span> <span class="hljs-type">INTERVAL</span> <span class="hljs-string">&#x27;1&#x27;</span> <span class="hljs-keyword">DAY</span>
 <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date, product_id
</code></pre>
<p>يوجد بالفعل فهرس على <code>SALE_DATE</code> يمكن استخدامه لجملة <code>where</code>. غير أن قاعدة البيانات يجب أن تنفّذ عملية فرز صريحة لتلبية جملة <code>order by</code>:</p>
<p>Db2 (LUW)</p>
<pre><code>Explain Plan
------------------------------------------------------------
ID | Operation             |                     Rows | Cost
 1 | RETURN                |                          |  682
 2 |  TBSCAN               |     394 of 394 (100.00%) |  682
 3 |   SORT                |     394 of 394 (100.00%) |  682
 4 |    FETCH SALES        |     394 of 394 (100.00%) |  682
 5 |     IXSCAN SALES_DATE | 394 of 1009326 (   .04%) |   19

Predicate Information
 5 - START (Q1.SALE_DATE = (CURRENT DATE - 1 DAYS))
      STOP (Q1.SALE_DATE = (CURRENT DATE - 1 DAYS))
</code></pre>
<p>وغُيِّرت جملة <code>where</code> هكذا لتتوافق مع Db2: <code>WHERE sale_date &gt; CURRENT_DATE - 1 DAY</code>.</p>
<p>Oracle</p>
<pre><code>---------------------------------------------------------------
|Id | Operation                    | Name       | Rows | Cost |
---------------------------------------------------------------
| 0 | SELECT STATEMENT             |            |  320 |   18 |
| 1 |  SORT ORDER BY               |            |  320 |   18 |
| 2 |   TABLE ACCESS BY INDEX ROWID| SALES      |  320 |   17 |
|*3 |    INDEX RANGE SCAN          | SALES_DATE |  320 |    3 |
---------------------------------------------------------------
</code></pre>
<p>وعلى أي حال يعيد <code>INDEX RANGE SCAN</code> النتيجة بترتيب الفهرس. ولاستغلال هذه الحقيقة، علينا فقط توسيع تعريف الفهرس بحيث يوافق جملة <code>order by</code>:</p>
<pre><code>  DROP INDEX sales_date
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX sales_dt_pr <span class="hljs-keyword">ON</span> sales (sale_date, product_id)
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> sale_date, product_id, quantity
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">WHERE</span> sale_date <span class="hljs-operator">=</span> TRUNC(sysdate) <span class="hljs-operator">-</span> <span class="hljs-type">INTERVAL</span> <span class="hljs-string">&#x27;1&#x27;</span> <span class="hljs-keyword">DAY</span>
 <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date, product_id
</code></pre>
<p>Db2 (LUW)</p>
<pre><code>Explain Plan
-----------------------------------------------------------
ID | Operation            |                     Rows | Cost
 1 | RETURN               |                          |  688
 2 |  FETCH SALES         |     394 of 394 (100.00%) |  688
 3 |   IXSCAN SALES_DT_PR | 394 of 1009326 (   .04%) |   24

Predicate Information
 3 - START (Q1.SALE_DATE = (CURRENT DATE - 1 DAYS))
      STOP (Q1.SALE_DATE = (CURRENT DATE - 1 DAYS))
</code></pre>
<p>Oracle</p>
<pre><code>---------------------------------------------------------------
|Id | Operation                   | Name        | Rows | Cost |
---------------------------------------------------------------
| 0 | SELECT STATEMENT            |             |  320 |  300 |
| 1 |  TABLE ACCESS BY INDEX ROWID| SALES       |  320 |  300 |
|*2 |   INDEX RANGE SCAN          | SALES_DT_PR |  320 |    4 |
---------------------------------------------------------------
</code></pre>
<p>اختفت عملية الفرز <code>SORT ORDER BY</code> من خطة التنفيذ رغم أن الاستعلام لا يزال يحتوي جملة <code>order by</code>؛ إذ تستغل قاعدة البيانات ترتيب الفهرس وتتخطى عملية الفرز الصريحة.</p>
<h4>مهم</h4>
<p>إذا وافق ترتيب الفهرس جملة <code>order by</code>، استطاعت قاعدة البيانات إسقاط عملية الفرز الصريحة.</p>
<p>ومع أن خطة التنفيذ الجديدة فيها عمليات أقل، فقد ارتفعت قيمة التكلفة ارتفاعاً كبيراً لأن عامل العنقدة في الفهرس الجديد أسوأ (انظر <a href="#sb-order-by-clustering-factor">«<em>عامل العنقدة المُحسَّن تلقائياً</em>»</a>). ويكفي هنا أن نلاحظ أن قيمة التكلفة ليست دائماً مؤشراً جيداً على جهد التنفيذ.</p>
<h2 id="عامل-العنقدة-المحسن-تلقائيا">عامل العنقدة المُحسَّن تلقائياً <span class="content-anchor" id="sb-order-by-clustering-factor"></span></h2>
<p>تبقي قاعدة بيانات Oracle عامل العنقدة في حده الأدنى بمراعاة <code>ROWID</code> في ترتيب الفهرس؛ فكلما كان لمدخلَي فهرس قيمتا مفتاح متماثلتان، حسم <code>ROWID</code> ترتيبهما النهائي. ويكون الفهرس إذن مرتَّباً وفق ترتيب الجدول أيضاً، وله أصغر عامل عنقدة ممكن لأن <code>ROWID</code> يمثّل العنوان الفيزيائي لصف الجدول.</p>
<p>وبإضافة عمود آخر إلى فهرس، تُدخل معيار فرز جديداً <em>قبل</em> <code>ROWID</code>؛ فتقل حرية قاعدة البيانات في مواءمة مدخلات الفهرس مع ترتيب الجدول، فلا يمكن لعامل العنقدة إلا أن يسوء.</p>
<p>ومع ذلك، لا يزال ممكناً أن يوافق ترتيب الفهرس ترتيب الجدول إجمالاً؛ فمبيعات اليوم الواحد محتمل أن تبقى متجمّعة في الجدول كما في الفهرس — حتى لو لم يعد تسلسلها متماثلاً تماماً. ويجب على قاعدة البيانات قراءة كتل الجدول مرات عدة عند استخدام فهرس <code>SALE_DT_PR</code> — لكنها الكتل نفسها كما في السابق. وبفضل التخزين المؤقت للبيانات كثيرة الوصول، قد يكون أثر الأداء أقل بكثير مما تدل عليه قيم التكلفة.</p>
<p>ويكفي لهذا التحسين أن يكون نطاق الفهرس الممسوح مرتَّباً وفق جملة <code>order by</code>. ولذلك يعمل التحسين أيضاً في هذا المثال تحديداً عند الترتيب حسب <code>PRODUCT_ID</code> وحده:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> sale_date, product_id, quantity
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">WHERE</span> sale_date <span class="hljs-operator">=</span> TRUNC(sysdate) <span class="hljs-operator">-</span> <span class="hljs-type">INTERVAL</span> <span class="hljs-string">&#x27;1&#x27;</span> <span class="hljs-keyword">DAY</span>
 <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> product_id
</code></pre>
<p>في <a href="#fig-order-concat">الشكل 6.1</a> نرى أن <code>PRODUCT_ID</code> هو معيار الفرز الوحيد ذو الصلة في نطاق الفهرس الممسوح. ومن ثمّ يوافق ترتيب الفهرس جملة <code>order by</code> في <em>نطاق الفهرس هذا</em>، فتستطيع قاعدة البيانات إسقاط عملية الفرز.</p>
<p>الشكل 6.1 ترتيب الفرز في نطاق الفهرس ذي الصلة</p>
<p>وقد يسبّب هذا التحسين سلوكاً غير متوقع عند توسيع نطاق الفهرس الممسوح:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> sale_date, product_id, quantity
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">WHERE</span> sale_date <span class="hljs-operator">&gt;=</span> TRUNC(sysdate) <span class="hljs-operator">-</span> <span class="hljs-type">INTERVAL</span> <span class="hljs-string">&#x27;1&#x27;</span> <span class="hljs-keyword">DAY</span>
 <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> product_id
</code></pre>
<p>لا يسترجع هذا الاستعلام مبيعات <em>الأمس</em> بل جميع المبيعات <em>منذ الأمس</em>؛ أي إنه يغطي عدة أيام ويمسح نطاق فهرس غير مرتَّب حصراً بـ<code>PRODUCT_ID</code>. وإذا نظرنا إلى <a href="#fig-order-concat">الشكل 6.1</a> مرة أخرى ووسّعنا نطاق الفهرس الممسوح إلى الأسفل، نرى أن هناك قيم <code>PRODUCT_ID</code> أصغر مجدداً. ولذلك يجب على قاعدة البيانات استخدام عملية فرز صريحة لتلبية جملة <code>order by</code>.</p>
<p>Db2 (LUW)</p>
<pre><code>Explain Plan
-------------------------------------------------------------
ID | Operation              |                     Rows | Cost
 1 | RETURN                 |                          |  688
 2 |  TBSCAN                |     394 of 394 (100.00%) |  688
 3 |   SORT                 |     394 of 394 (100.00%) |  688
 4 |    FETCH SALES         |     394 of 394 (100.00%) |  688
 5 |     IXSCAN SALES_DT_PR | 394 of 1009326 (   .04%) |   24

Predicate Information
 5 - START ((CURRENT DATE - 1 DAYS) &lt;= Q1.SALE_DATE)
</code></pre>
<p>Oracle</p>
<pre><code>---------------------------------------------------------------
|Id |Operation                    | Name        | Rows | Cost |
---------------------------------------------------------------
| 0 |SELECT STATEMENT             |             |  320 |  301 |
| 1 | SORT ORDER BY               |             |  320 |  301 |
| 2 |  TABLE ACCESS BY INDEX ROWID| SALES       |  320 |  300 |
|*3 |   INDEX RANGE SCAN          | SALES_DT_PR |  320 |    4 |
---------------------------------------------------------------
</code></pre>
<p>وإذا استخدمت قاعدة البيانات عملية فرز رغم توقعك تنفيذاً متدفقاً، فقد يكون لذلك سببان: (1) خطة التنفيذ ذات عملية الفرز الصريحة لها قيمة تكلفة أفضل؛ (2) ترتيب الفهرس في نطاق الفهرس الممسوح لا يوافق جملة <code>order by</code>.</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=sec-order&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<p>وثمة طريقة بسيطة للتمييز بين الحالتين: استخدام تعريف الفهرس الكامل في جملة <code>order by</code> — أي تعديل الاستعلام ليوافق الفهرس بغية إزالة السبب الثاني. فإن استخدمت قاعدة البيانات عملية فرز صريحة بعد ذلك، فالمُحسِّن يفضّل هذه الخطة بسبب قيمة تكلفتها؛ وإلا فقاعدة البيانات لا تستطيع استخدام الفهرس لجملة <code>order by</code> الأصلية.</p>
<h4>نصيحة</h4>
<p>استخدم تعريف الفهرس الكامل في جملة <code>order by</code> لتعرف سبب عملية الفرز الصريحة.</p>
<p>وفي كلتا الحالتين، قد تتساءل إن كان ممكناً الوصول إلى تنفيذ <code>order by</code> متدفق، وكيف. ولذلك يمكنك تنفيذ الاستعلام بتعريف الفهرس الكامل في جملة <code>order by</code> وفحص النتيجة. وستدرك غالباً أن تصورك للفهرس خاطئ وأن ترتيب الفهرس بالفعل ليس كما تتطلبه جملة <code>order by</code> الأصلية، فلا تستطيع قاعدة البيانات استخدام الفهرس لتجنّب عملية الفرز.</p>
<p>وإذا فضّل المُحسِّن عملية فرز صريحة بسبب قيمة تكلفتها، فمردّ ذلك عادةً إلى أن المُحسِّن يأخذ أفضل خطة تنفيذ <em>للتنفيذ الكامل</em> للاستعلام؛ أي إنه يختار خطة التنفيذ الأسرع للوصول إلى السجل الأخير. أما إذا اكتشف أن التطبيق يجلب الصفوف الأولى فقط، فقد يفضّل بدوره <code>order by</code> مفهرساً. ويشرح <a href="/arabic-cs-library/book/use-the-index-luke/sql-partial-results/index">الفصل 7<em>النتائج الجزئية</em></a> أساليب التحسين المقابلة.</p>
`,r={book:s,chapter:e,chapterTitle:n,slug:a,title:o,headings:p,html:d};export{s as book,e as chapter,n as chapterTitle,r as default,p as headings,d as html,a as slug,o as title};
