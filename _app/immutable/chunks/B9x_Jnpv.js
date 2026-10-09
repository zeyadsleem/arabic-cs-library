const e="use-the-index-luke",s="sql-where-clause-functions",n="الدوال",t="index",o="الدوال",c=[{depth:2,id:"المحتويات",text:"المحتويات"}],i=`<p>حسّن الفهرس على <code>LAST_NAME</code> الأداء تحسناً كبيراً، لكنه يلزمك بالبحث بحالة الأحرف نفسها (كبيرة/صغيرة) المخزنة في قاعدة البيانات. ويشرح هذا القسم كيف ترفع هذا القيد دون انخفاض في الأداء.</p>
<p>Db2 (LUW)</p>
<p>تدعم Db2 الفهارس القائمة على الدوال على <a href="https://www.ibm.com/docs/en/db2-for-zos/13.0.0?topic=statements-create-index">zOS</a> منذ مدة، لكنها لا تدعمها <a href="https://www.ibm.com/docs/en/db2/11.5.x?topic=statements-create-index#sdx-synid_key-expression">على LUW إلا منذ الإصدار 10.5</a>. ولا يُسمح باستخدام الدوال المعرّفة من المستخدم في الفهارس.</p>
<p>والحل الاحتياطي هو إنشاء عمود حقيقي في الجدول يحمل نتيجة الدالة أو التعبير. ويجب صيانة هذا العمود بواسطة مُشغِّل (trigger) أو طبقة التطبيق — أيهما أنسب. ويمكن فهرسة العمود الجديد، ويجب أن تستخدم جملة <code>where</code> العمود الجديد (دون التعبير).</p>
<p>MySQL</p>
<p>MySQL غير حسّاس لحالة الأحرف افتراضياً، لكن ذلك <a href="https://dev.mysql.com/doc/refman/8.0/en/case-sensitivity.html">يمكن التحكم به على مستوى العمود</a>. وبدءاً من الإصدار 5.7، تستطيع MySQL إنشاء فهارس على <a href="https://dev.mysql.com/doc/refman/8.0/en/generated-column-index-optimizations.html">الأعمدة المولّدة</a>.</p>
<p>والحل الاحتياطي للإصدارات الأقدم هو إنشاء عمود حقيقي في الجدول يحمل نتيجة الدالة أو التعبير. ويجب صيانة هذا العمود بواسطة مُشغِّل أو طبقة التطبيق — أيهما أنسب. ويمكن فهرسة العمود الجديد، ويجب أن تستخدم جملة <code>where</code> العمود الجديد (دون التعبير).</p>
<p>Oracle</p>
<p>تدعم قاعدة بيانات Oracle الفهارس القائمة على الدوال منذ الإصدار 8<em>i</em>، وأُضيفت الأعمدة الافتراضية مع الإصدار 11<em>g</em>.</p>
<p>PostgreSQL</p>
<p>يدعم PostgreSQL دعماً كاملاً لـ<a href="https://www.postgresql.org/docs/current/indexes-expressional.html">الفهارس على التعبيرات</a> منذ الإصدار 7.4 (ودعماً جزئياً منذ 7.2).</p>
<p>SQL Server</p>
<p>تدعم SQL Server <a href="https://learn.microsoft.com/en-us/sql/relational-databases/tables/specify-computed-columns-in-a-table?view=sql-server-ver16">الأعمدة المحسوبة</a> التي يمكن فهرستها منذ الإصدار 2000.</p>
<h2 id="المحتويات">المحتويات</h2>
<ol>
<li><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-functions-case-insensitive-search/index">البحث غير الحسّاس لحالة الأحرف</a></em> — <code>UPPER</code> و<code>LOWER</code></li>
<li><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-functions-user-defined-functions/index">الدوال المعرّفة من المستخدم</a></em> — قيود الفهارس القائمة على الدوال</li>
<li><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-functions-over-indexing/index">الإفراط في الفهرسة</a></em> — تجنّب التكرار</li>
</ol>
`,a={book:e,chapter:s,chapterTitle:n,slug:t,title:o,headings:c,html:i};export{e as book,s as chapter,n as chapterTitle,a as default,c as headings,i as html,t as slug,o as title};
