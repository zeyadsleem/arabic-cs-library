const s="use-the-index-luke",n="sql-explain-plan-oracle-getting-an-execution-plan",e="الحصول على خطة تنفيذ",a="index",l="الحصول على خطة تنفيذ",p=[{depth:2,id:"تفعيل-القياسات",text:"تفعيل القياسات"},{depth:2,id:"تنفيذ-عبارة-sql",text:"تنفيذ عبارة SQL"},{depth:2,id:"جلب-خطة-التنفيذ",text:"جلب خطة التنفيذ"}],t=`<p>يتضمن عرض خطة تنفيذ، مع القياسات الفعلية، في قاعدة بيانات Oracle ثلاث خطوات:</p>
<ol>
<li>تفعيل القياسات (اختياري)</li>
<li>تنفيذ عبارة SQL</li>
<li>جلب خطة التنفيذ</li>
</ol>
<h2 id="تفعيل-القياسات">تفعيل القياسات</h2>
<p>للحصول على جميع إحصاءات زمن التشغيل، مثل زمن كل عملية، يجب تفعيل جمع هذه القيم أولاً. ويمكن فعل ذلك في العبارة المعنية بإضافة التلميح <code>/*+ GATHER_PLAN_STATISTICS */</code>، أو مرة واحدة في الجلسة بحيث يشمل جميع عمليات التنفيذ التالية.</p>
<pre><code class="language-sql"><span class="hljs-keyword">alter</span> session <span class="hljs-keyword">set</span> statistics_level <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;ALL&#x27;</span>
</code></pre>
<h2 id="تنفيذ-عبارة-sql">تنفيذ عبارة SQL</h2>
<p>يؤدي تشغيل العبارة إلى تخزين خطة التنفيذ مؤقتاً (منطقة SQL). وإذا كنت قد فعّلت جمع إحصاءات زمن التشغيل، فستُضاف هناك أيضاً.</p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">from</span> dual
</code></pre>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=ap-plan-ora-get&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<h2 id="جلب-خطة-التنفيذ">جلب خطة التنفيذ</h2>
<p>تستطيع الحزمة <code>DBMS_XPLAN</code> عرض خطط التنفيذ من منطقة SQL. ويوضح المثال التالي كيفية عرض آخر خطة تنفيذ نُفِّذت في جلسة قاعدة البيانات الحالية:</p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">from</span> <span class="hljs-keyword">table</span>(dbms_xplan.display_cursor(<span class="hljs-keyword">null</span>, <span class="hljs-keyword">null</span>,
                                  <span class="hljs-string">&#x27;LAST ALLSTATS +COST&#x27;</span>))
</code></pre>
<p>سيعرض الاستعلام خطة التنفيذ كما هي معروضة في الكتاب:</p>
<pre><code>---------------------------------------------------------------
| Operation         | Name | E-Rows | Cost | A-Rows | A-Time |.
---------------------------------------------------------------
| SELECT STATEMENT  |      |        |    2 |      1 |  00.01 |.
|  TABLE ACCESS FULL| DUAL |      1 |    2 |      1 |  00.01 |.
---------------------------------------------------------------
</code></pre>
<p>خطط التنفيذ المعروضة هنا حُرِّرت للإيجاز.</p>
`,o={book:s,chapter:n,chapterTitle:e,slug:a,title:l,headings:p,html:t};export{s as book,n as chapter,e as chapterTitle,o as default,p as headings,t as html,a as slug,l as title};
