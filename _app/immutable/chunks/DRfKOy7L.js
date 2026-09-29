const e="use-the-index-luke",n="sql-explain-plan-sql-server-getting-an-execution-plan",s="Getting an Execution Plan",p="index",t="الحصول على خطة تنفيذ",a=[{depth:2,id:"رسوميا",text:"رسومياً"},{depth:2,id:"جدوليا",text:"جدولياً"}],l=`<p>مع SQL Server، توجد طرق عدة لجلب خطة تنفيذ. وأهم طريقتين هما:</p>
<p>رسومياً</p>
<p>يسهل الوصول إلى التمثيل الرسومي لخطط تنفيذ SQL Server في Management Studio، لكن يصعب مشاركته لأن معلومات المُسندات لا تظهر إلا عند تمرير الفأرة فوق العملية المعنية («hover»).</p>
<p>جدولياً</p>
<p>يصعب قراءة خطة التنفيذ الجدولية لكن يسهل نسخها، لأنها تعرض جميع المعلومات ذات الصلة دفعة واحدة.</p>
<h2 id="رسوميا">رسومياً</h2>
<p>تُنشأ خطة الشرح الرسومية بأحد الزرين المميزين أدناه.</p>
<p><img src="https://use-the-index-luke.com/images/use-the-index-luke/sql-explain-plan-sql-server-getting-an-execution-plan-0-mssql_ssms_explain_button.vqQzQh6C.webp" alt=""></p>
<p>يشرح الزر الأيسر العبارة المميزة مباشرةً، أما الأيمن فيلتقط الخطة في المرة التالية التي تُنفَّذ فيها عبارة SQL.</p>
<p>وفي الحالتين، يظهر التمثيل الرسومي لخطة التنفيذ في تبويب «Execution plan» في لوحة «Results».</p>
<p><img src="https://use-the-index-luke.com/images/use-the-index-luke/sql-explain-plan-sql-server-getting-an-execution-plan-1-mssql_ssms_explain.p0Ulm-iw.webp" alt=""></p>
<p>يسهل قراءة التمثيل الرسومي بقليل من التدريب. ومع ذلك، فهو يعرض المعلومات الأساسية فقط: العمليات والجدول أو الفهرس الذي تعمل عليه.</p>
<p>ويعرض Management Studio معلومات إضافية عند تمرير الفأرة فوق عملية (mouseover/hover). وهذا ما يجعل مشاركة خطة تنفيذ بكل تفاصيلها صعباً.</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=ap-explain-mssql&amp;utm_medium=web&amp;utm_content=ap-explain-mssql-gra">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<h2 id="جدوليا">جدولياً</h2>
<p>يُسترجَع التمثيل الجدولي لخطة تنفيذ SQL Server بتنميط تنفيذ عبارة. ويُمكّنه الأمر التالي:</p>
<pre><code>SET STATISTICS PROFILE ON
</code></pre>
<p>وبمجرد تمكينه، تنتج كل عبارة تُنفَّذ مجموعة نتائج إضافية. فعبارات <code>select</code> مثلاً تنتج مجموعتَي نتائج — نتيجة العبارة أولاً ثم خطة التنفيذ.</p>
<p>ويكاد التمثيل الجدولي لخطة التنفيذ يكون غير قابل للاستخدام في SQL Server Management Studio لأن <code>StmtText</code> أعرض من أن يتسع له أي شاشة.</p>
<p><img src="https://use-the-index-luke.com/images/use-the-index-luke/sql-explain-plan-sql-server-getting-an-execution-plan-2-mssql_ssms_explain_table.6KapJiT5.webp" alt=""></p>
<p>وميزة هذا التمثيل أنه يمكن نسخه دون فقدان أي معلومات ذات صلة. وهذا مفيد جداً إذا أردت نشر خطة تنفيذ SQL Server في منتدى أو منصة مشابهة. وفي هذه الحالة يكفي غالباً نسخ عمود <code>StmtText</code> وإعادة تنسيقه قليلاً:</p>
<pre><code class="language-sql"><span class="hljs-keyword">select</span> <span class="hljs-built_in">COUNT</span>(<span class="hljs-operator">*</span>) <span class="hljs-keyword">from</span> employees;
  <span class="hljs-operator">|</span><span class="hljs-comment">--Compute Scalar(DEFINE:([Expr1004]=CONVERT_IMPLICIT(...))</span>
       <span class="hljs-operator">|</span><span class="hljs-comment">--Stream Aggregate(DEFINE:([Expr1005]=Count(*)))</span>
            <span class="hljs-operator">|</span><span class="hljs-comment">--Index Scan(OBJECT:([employees].[employees_pk]))</span>
</code></pre>
<p>وأخيراً، يمكنك تعطيل التنميط مرة أخرى:</p>
<pre><code>SET STATISTICS PROFILE OFF
</code></pre>
`,o={book:e,chapter:n,chapterTitle:s,slug:p,title:t,headings:a,html:l};export{e as book,n as chapter,s as chapterTitle,o as default,a as headings,l as html,p as slug,t as title};
