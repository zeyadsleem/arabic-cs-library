const e="use-the-index-luke",n="sql-explain-plan-sqlite-operations",o="SQLite Execution Plan Operations",t="index",d="عمليات خطة التنفيذ في SQLite",p=[{depth:2,id:"الوصول-إلى-الفهرس-والجدول",text:"الوصول إلى الفهرس والجدول"},{depth:2,id:"عمليات-الربط",text:"عمليات الربط"},{depth:2,id:"الترتيب-والتجميع",text:"الترتيب والتجميع"},{depth:2,id:"استعلامات-top-n",text:"استعلامات Top-N"}],i=`<p>مرجع قصير لأشهر عمليات خطة التنفيذ في SQLite. و<a href="https://sqlite.org/eqp.html">وثائق المنتج الخاصة بها هنا</a>.</p>
<h2 id="الوصول-إلى-الفهرس-والجدول">الوصول إلى الفهرس والجدول</h2>
<p><code>SCAN TABLE …</code>تقرأ الجدول بأكمله.</p>
<p><code>SEARCH TABLE … USING INDEX</code></p>
<p>تجتاز شجرة فهرس، وتتبع قائمة العقد الورقية، وتجلب البيانات المقابلة من الجدول.</p>
<p><code>SEARCH TABLE … USING COVERING INDEX</code></p>
<p>تجتاز شجرة فهرس وتتبع قائمة العقد الورقية لجلب جميع الصفوف المطابقة (وتُعرف بـ<a href="/arabic-cs-library/book/use-the-index-luke/sql-clustering-index-only-scan-covering-index/index">مسح الفهرس فقط</a>).</p>
<h2 id="عمليات-الربط">عمليات الربط</h2>
<p>تعالج عمليات الربط عموماً جدولين في المرة الواحدة. وإذا كان للاستعلام عمليات ربط أكثر، نُفِّذت تتابعياً: الجدولان الأولان أولاً، ثم النتيجة الوسيطة مع الجدول التالي. وفي سياق الربط، قد يعني مصطلح «جدول» أيضاً «نتيجة وسيطة».</p>
<p>يدعم SQLite <a href="/arabic-cs-library/book/use-the-index-luke/sql-join-nested-loops-join-n1-problem/index">عمليات الربط بالحلقات المتداخلة</a> فقط. وتبدأ خطة الاستعلام بعرض الوصول إلى الجدول الأقصى خارجياً، ثم كل وصول متداخل بعده (على غرار MySQL/MariaDB).</p>
<p>ولا تشير التداخلات في خرج خطة الاستعلام إلى عمليات ربط بل إلى استعلامات متداخلة (بما فيها <code>union</code> و<code>except</code> و<code>intersect</code>).</p>
<h2 id="الترتيب-والتجميع">الترتيب والتجميع</h2>
<p>يحتاج SQLite دائماً إلى فهرس من أجل <code>order by</code> و<code>group by</code> و<code>distinct</code>. وإذا لم يوجد فهرس مناسب في النظام قبل تقييم الاستعلام، يُنشأ فهرس مؤقت.</p>
<p><code>USE TEMP B-TREE FOR …</code></p>
<p>يشير إلى إنشاء فهرس مؤقت لتنفيذ العملية المحددة.</p>
<h2 id="استعلامات-top-n">استعلامات Top-N</h2>
<p>لا يظهر أثر جملة limit في خرج <code>explain query plan</code>. أما في خرج <code>explain</code> الخام، فيمكنك رؤية <code>LIMIT counter</code>.</p>
`,c={book:e,chapter:n,chapterTitle:o,slug:t,title:d,headings:p,html:i};export{e as book,n as chapter,o as chapterTitle,c as default,p as headings,i as html,t as slug,d as title};
