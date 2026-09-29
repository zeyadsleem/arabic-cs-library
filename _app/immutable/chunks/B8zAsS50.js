const s="use-the-index-luke",e="sql-partial-results-top-n-queries",n="Querying Top-N Rows",a="index",p="الاستعلام عن صفوف Top-N",o=[],l=`<p>استعلامات Top-N هي استعلامات تقصر النتيجة على عدد محدد من الصفوف، وهي غالباً استعلامات عن أحدث المدخلات أو «أفضلها» في مجموعة نتائج. وللتنفيذ بكفاءة، يجب أن يتم الترتيب بـ<a href="/arabic-cs-library/book/use-the-index-luke/sql-sorting-grouping-indexed-order-by/index"><code>order by</code> متدفق.</a></p>
<p>أبسط طريقة لجلب الصفوف الأولى فقط من استعلام هي جلب الصفوف المطلوبة ثم إغلاق العبارة. لكن المُحسِّن للأسف لا يستطيع التنبؤ بذلك عند تحضير خطة التنفيذ؛ فليختار أفضل خطة تنفيذ، يجب أن يعرف ما إذا كان التطبيق سيجلب جميع الصفوف في النهاية. وفي تلك الحالة، قد يكون مسح كامل للجدول بعملية فرز صريحة هو الأفضل أداءً، مع أن <code>order by</code> المتدفق قد يكون أفضل عند جلب عشرة صفوف فقط — حتى لو وجب على قاعدة البيانات جلب كل صف على حدة. ويعني ذلك أن المُحسِّن يجب أن يعرف أنك ستوقف العبارة قبل جلب جميع الصفوف ليختار أفضل خطة تنفيذ.</p>
<h4>نصيحة</h4>
<p>أبلغ قاعدة البيانات كلما لم تكن بحاجة إلى جميع الصفوف.</p>
<p>استبعد معيار SQL هذا الشرط زمناً طويلاً. وقد أُدخل الامتداد المقابل (<code>fetch first</code>) أخيراً مع SQL:2008، وهو متاح حالياً في IBM Db2 وPostgreSQL وSQL Server 2012 وOracle 12c. ويعود ذلك من جهة إلى أن الميزة امتداد غير جوهري، ومن جهة أخرى إلى أن كل قاعدة بيانات كانت تقدم حلها الخاص والمملوك لها منذ سنوات طويلة.</p>
<p>تعرض الأمثلة التالية استخدام هذه الامتدادات المعروفة عبر الاستعلام عن أحدث عشر عمليات بيع. والأساس واحد دائماً: جلب <em>جميع</em> المبيعات بدءاً من الأحدث. أما صيغة Top-N المعنية فتُوقف التنفيذ بعد جلب عشرة صفوف فقط.</p>
<p>Db2 (LUW)تدعم Db2 صيغة <code>fetch first</code> القياسية منذ الإصدار 9 على الأقل (في LUW وzOS).</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date <span class="hljs-keyword">DESC</span>
 <span class="hljs-keyword">FETCH</span> <span class="hljs-keyword">FIRST</span> <span class="hljs-number">10</span> <span class="hljs-keyword">ROWS</span> <span class="hljs-keyword">ONLY</span>
</code></pre>
<p>الكلمة المفتاحية <code>limit</code> المملوكة مدعومة منذ Db2 (LUW) 9.7 (وتتطلب <code>db2set DB2_COMPATIBILITY_VECTOR=MYS</code>).</p>
<p>MySQL</p>
<p>تستخدم MySQL وPostgreSQL جملة <code>limit</code> لتقييد عدد الصفوف المجلوبة.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date <span class="hljs-keyword">DESC</span>
 LIMIT <span class="hljs-number">10</span>
</code></pre>
<p>Oracle</p>
<p>أدخلت قاعدة بيانات Oracle امتداد <code>fetch first</code> مع الإصدار 12c. وفي الإصدارات الأقدم يجب استخدام العمود الزائف <code>ROWNUM</code> الذي يرقّم صفوف مجموعة النتائج تلقائياً. ولاستخدام هذا العمود في مرشّح، علينا تغليف الاستعلام:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> (
       <span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
         <span class="hljs-keyword">FROM</span> sales
        <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date <span class="hljs-keyword">DESC</span>
       )
 <span class="hljs-keyword">WHERE</span> rownum <span class="hljs-operator">&lt;=</span> <span class="hljs-number">10</span>
</code></pre>
<p>PostgreSQL</p>
<p>يدعم PostgreSQL امتداد <code>fetch first</code> منذ الإصدار 8.4. ولا تزال جملة <code>limit</code> المستخدمة سابقاً تعمل كما في مثال MySQL.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date <span class="hljs-keyword">DESC</span>
 <span class="hljs-keyword">FETCH</span> <span class="hljs-keyword">FIRST</span> <span class="hljs-number">10</span> <span class="hljs-keyword">ROWS</span> <span class="hljs-keyword">ONLY</span>
</code></pre>
<p>SQL Server</p>
<p>تقدّم SQL Server جملة <code>top</code> لتقييد عدد الصفوف المجلوبة.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> TOP <span class="hljs-number">10</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date <span class="hljs-keyword">DESC</span>
</code></pre>
<p><a href="https://learn.microsoft.com/en-us/previous-versions/sql/sql-server-2012/ms188385(v=sql.110)">بدءاً من الإصدار 2012، تدعم SQL Server امتداد <code>fetch first</code> أيضاً.</a></p>
<p>جميع استعلامات SQL المعروضة أعلاه خاصة لأن قواعد البيانات تتعرف عليها كاستعلامات Top-N.</p>
<h4>مهم</h4>
<p>لا تستطيع قاعدة البيانات تحسين استعلام للحصول على نتيجة جزئية إلا إذا علمت ذلك منذ البداية.</p>
<p>وإذا كان المُحسِّن على علم بأننا نحتاج عشرة صفوف فقط، فسيفضّل استخدام <code>order by</code> متدفق إذا أمكن:</p>
<p>Db2 (LUW)</p>
<pre><code>Explain Plan
-----------------------------------------------------------------
ID | Operation                      |               Rows |   Cost
 1 | RETURN                         |                    |     24
 2 |  FETCH SALES                   |      10 of 1009326 | 458452
 3 |   IXSCAN (REVERSE) SALES_DT_PR | 1009326 of 1009326 |   2624

Predicate Information
</code></pre>
<p>لا يظهر سلوك Top-N مباشرةً في خطة تنفيذ Db2 إلا إذا لزمت عملية <code>SORT</code> (وعندها يشير <a href="/arabic-cs-library/book/use-the-index-luke/sql-explain-plan-db2-getting-an-execution-plan/index#apa-db2-last_explained">عرض <code>last_explained</code></a> إليه بين قوسين: <code>SORT (TOP-N)</code>، انظر المثال التالي).</p>
<p>وفي هذا المثال تحديداً، قد يُشتبه في أن هذا لا بد أن يكون استعلام Top-N بسبب الانخفاض المفاجئ في تقدير عدد الصفوف الذي لا تفسّره أي مُسندات ترشيح (فقسم Predicate Information فارغ).</p>
<p>Oracle</p>
<pre><code>-------------------------------------------------------------
| Operation                     | Name        | Rows | Cost |
-------------------------------------------------------------
| SELECT STATEMENT              |             |   10 |    9 |
|  COUNT STOPKEY                |             |      |      |
|   VIEW                        |             |   10 |    9 |
|    TABLE ACCESS BY INDEX ROWID| SALES       | 1004K|    9 |
|     INDEX FULL SCAN DESCENDING| SALES_DT_PR |   10 |    3 |
-------------------------------------------------------------
</code></pre>
<p>تشير خطة تنفيذ Oracle إلى الإيقاف المخطَّط له بعملية <code>COUNT STOPKEY</code>، أي إن قاعدة البيانات تعرفت على صيغة Top-N.</p>
<h4>نصيحة</h4>
<p><a href="/arabic-cs-library/book/use-the-index-luke/sql-explain-plan/index">الملحق أ، «<em>خطط التنفيذ</em>»</a>، يلخّص العمليات المقابلة لـ<a href="/arabic-cs-library/book/use-the-index-luke/sql-explain-plan-db2-operations/index">Db2 (LUW)</a> و<a href="/arabic-cs-library/book/use-the-index-luke/sql-explain-plan-mysql-operations/index">MySQL</a> و<a href="/arabic-cs-library/book/use-the-index-luke/sql-explain-plan-oracle-operations/index">Oracle</a> و<a href="/arabic-cs-library/book/use-the-index-luke/sql-explain-plan-postgresql-operations/index">PostgreSQL</a> و<a href="/arabic-cs-library/book/use-the-index-luke/sql-explain-plan-sql-server-operations/index">SQL Server</a>.</p>
<h4>مهم</h4>
<p>لا يحتاج استعلام Top-N المتدفق إلى قراءة مجموعة النتائج كلها وفرزها.</p>
<p>وإذا لم يوجد فهرس مناسب على <code>SALE_DATE</code> من أجل <code>order by</code> متدفق، وجب على قاعدة البيانات قراءة الجدول بأكمله وفرزه. ولا يُسلَّم الصف الأول إلا بعد قراءة الصف الأخير من الجدول.</p>
<p>Db2 (LUW)</p>
<pre><code>Explain Plan
-----------------------------------------------------------
ID | Operation       |                         Rows |  Cost
 1 | RETURN          |                              | 59835
 2 |  TBSCAN         |           10 of 10 (100.00%) | 59835
 3 |   SORT (TOP-N)  |      10 of 1009326 (   .00%) | 59835
 4 |    TBSCAN SALES | 1009326 of 1009326 (100.00%) | 59739

Predicate Information
</code></pre>
<p>Oracle</p>
<pre><code>--------------------------------------------------
| Operation               | Name  | Rows |  Cost |
--------------------------------------------------
| SELECT STATEMENT        |       |   10 | 59558 |
|  COUNT STOPKEY          |       |      |       |
|   VIEW                  |       | 1004K| 59558 |
|    SORT ORDER BY STOPKEY|       | 1004K| 59558 |
|     TABLE ACCESS FULL   | SALES | 1004K|  9246 |
--------------------------------------------------
</code></pre>
<p>لا تحتوي خطة التنفيذ هذه على <code>order by</code> متدفق، وهي بطيئة تقريباً بقدر إيقاف التنفيذ من جهة العميل. ومع ذلك يبقى استخدام صيغة Top-N أفضل لأن قاعدة البيانات لا تحتاج إلى تجسيد النتيجة الكاملة بل أحدث عشرة صفوف فقط، وهو ما يتطلب ذاكرة أقل كثيراً. وتشير خطة تنفيذ Oracle إلى هذا التحسين بالمُعدِّل <code>STOPKEY</code> على عملية <code>SORT ORDER BY</code>.</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=sec-top-n&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<p>تشمل مزايا استعلام Top-N المتدفق مكاسب أداء فورية فحسب، بل تحسين قابلية التوسع أيضاً. فبدون التنفيذ المتدفق، ينمو زمن استجابة استعلام Top-N هذا مع حجم الجدول؛ أما زمن الاستجابة مع التنفيذ المتدفق فلا ينمو إلا مع عدد الصفوف المختارة. وبعبارة أخرى، يبقى زمن استجابة استعلام Top-N المتدفق ثابتاً دائماً تقريباً بصرف النظر عن حجم الجدول، ولا يصبح الاستعلام أبطأ قليلاً إلا عندما يزداد عمق شجرة B.</p>
<p>يعرض <a href="#fig07_01">الشكل 7.1</a> قابلية التوسع لكلا الصيغتين مع نمو حجم البيانات. ويظهر بوضوح النمو الخطي لزمن الاستجابة في التنفيذ بلا <code>order by</code> متدفق، بينما يبقى زمن الاستجابة في التنفيذ المتدفق ثابتاً.</p>
<p>الشكل 7.1 قابلية التوسع في استعلامات Top-N</p>
<p>ومع أن زمن استجابة استعلام Top-N المتدفق لا يعتمد على حجم الجدول، فإنه لا يزال ينمو مع عدد الصفوف المختارة؛ إذ يتضاعف زمن الاستجابة عند اختيار ضعف عدد الصفوف. وهذا مهم بوجه خاص في استعلامات «ترقيم الصفحات» التي تحمّل نتائج إضافية، لأن هذه الاستعلامات تبدأ غالباً من أول مدخل مجدداً؛ فتقرأ الصفوف المعروضة أصلاً في الصفحة السابقة وتستبعدها قبل أن تصل أخيراً إلى نتائج الصفحة الثانية. ومع ذلك، يوجد حل لهذه المشكلة أيضاً كما سنرى في القسم التالي.</p>
<h4>روابط</h4>
<p>مقال «<a href="https://blog.fatalmind.com/2010/09/29/finding-the-best-match-with-a-top-n-query/">إيجاد أفضل تطابق باستعلام Top-N</a>»</p>
`,r={book:s,chapter:e,chapterTitle:n,slug:a,title:p,headings:o,html:l};export{s as book,e as chapter,n as chapterTitle,r as default,o as headings,l as html,a as slug,p as title};
