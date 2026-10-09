const e="use-the-index-luke",o="sql-explain-plan-sql-server-operations",a="العمليات",n="index",r="العمليات",s=[{depth:2,id:"الوصول-إلى-الفهرس-والجدول",text:"الوصول إلى الفهرس والجدول"},{depth:2,id:"عمليات-الربط",text:"عمليات الربط"},{depth:2,id:"الترتيب-والتجميع",text:"الترتيب والتجميع"},{depth:2,id:"استعلامات-top-n",text:"استعلامات Top-N"}],p=`<p>يشرح هذا القسم أشهر عمليات خطة التنفيذ في قاعدة بيانات SQL Server من Microsoft. ويمكنك أيضاً الاطلاع على <a href="https://learn.microsoft.com/en-us/sql/relational-databases/showplan-logical-and-physical-operators-reference">وثائق Microsoft</a>.</p>
<h2 id="الوصول-إلى-الفهرس-والجدول">الوصول إلى الفهرس والجدول</h2>
<p>لمصطلحات SQL Server بساطة: عمليات «Scan» تقرأ الفهرس أو الجدول بأكمله، بينما تستخدم عمليات «Seek» شجرة B أو عنواناً فيزيائياً (<code>RID</code>، مثل <code>ROWID</code> في Oracle) للوصول إلى جزء محدد من الفهرس أو الجدول.</p>
<p>Index Seek, Clustered Index Seek</p>
<p>تنفّذ <code>Index Seek</code> اجتياز شجرة B <em>و</em> تمشي عبر العقد الورقية للعثور على جميع المدخلات المطابقة. انظر أيضاً <a href="/arabic-cs-library/book/use-the-index-luke/sql-anatomy/index">«<em>تشريح فهرس SQL</em>»</a>.</p>
<p>Index Scan, Clustered Index Scan</p>
<p>تقرأ الفهرس بأكمله — جميع الصفوف — بترتيب الفهرس. وتبعاً لإحصاءات نظام متنوعة، قد تنفّذ قاعدة البيانات هذه العملية إذا احتاجت جميع الصفوف بترتيب الفهرس — مثلاً بسبب جملة <code>order by</code> مقابلة.</p>
<p>Key Lookup (Clustered)</p>
<p>تسترجع صفاً واحداً من فهرس عنقودي. وهي شبيهة بـ<code>INDEX UNIQUE SCAN</code> في Oracle بالنسبة لجدول منظَّم بالفهرس (IOT). انظر أيضاً <a href="/arabic-cs-library/book/use-the-index-luke/sql-clustering/index">«<em>تجميع البيانات: القوة الثانية للفهرسة</em>»</a>.</p>
<p>RID Lookup (Heap)</p>
<p>تسترجع صفاً واحداً من جدول — مثل <code>TABLE ACCESS BY INDEX ROWID</code> في Oracle. انظر أيضاً <a href="/arabic-cs-library/book/use-the-index-luke/sql-anatomy/index">«<em>تشريح فهرس SQL</em>»</a>.</p>
<p>Table Scan</p>
<p>وتُعرف أيضاً بالمسح الكامل للجدول. تقرأ الجدول بأكمله — جميع الصفوف والأعمدة — كما هو مخزّن على القرص. ومع أن عمليات القراءة متعددة الكتل قد تحسّن سرعة <code>Table Scan</code> تحسناً كبيراً، فهي لا تزال من أغلى العمليات. فإلى جانب معدلات الإدخال/الإخراج العالية، يجب أن تفحص <code>Table Scan</code> جميع صفوف الجدول، لذا قد تستهلك أيضاً قدراً كبيراً من وقت المعالج. انظر أيضاً <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-the-equals-operator-concatenated-keys/index#sb-full-table-scan">«<em>المسح الكامل للجدول</em>»</a>.</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=ap-plan-mssql-ops&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<h2 id="عمليات-الربط">عمليات الربط</h2>
<p>تعالج عمليات الربط عموماً جدولين في المرة الواحدة. وإذا كان للاستعلام عمليات ربط أكثر، نُفِّذت تتابعياً: الجدولان الأولان أولاً، ثم النتيجة الوسيطة مع الجدول التالي. وفي سياق الربط، قد يعني مصطلح «جدول» أيضاً «نتيجة وسيطة».</p>
<p>Nested Loopsتربط جدولين بجلب النتيجة من جدول والاستعلام من الجدول الآخر مقابل كل صف من الأول. ويستخدم SQL Server عملية الحلقات المتداخلة أيضاً لاسترجاع بيانات الجدول بعد الوصول إلى الفهرس. انظر أيضاً <a href="/arabic-cs-library/book/use-the-index-luke/sql-join-nested-loops-join-n1-problem/index">«<em>الحلقات المتداخلة</em>»</a>.</p>
<p>Hash Match</p>
<p>يحمّل ربط المطابقة بالتجزئة السجلات المرشحة من أحد طرفَي الربط إلى جدول تجزئة، ثم يُفحص مقابل كل صف من الطرف الآخر للربط. انظر أيضاً <a href="/arabic-cs-library/book/use-the-index-luke/sql-join-hash-join-partial-objects/index">«<em>الربط بالتجزئة</em>»</a>.</p>
<p>Merge Join</p>
<p>يجمع ربط الدمج قائمتين مرتَّبتين كما يُغلق السحّاب. ويجب أن يكون طرفا الربط مرتَّبين مسبقاً. انظر أيضاً <a href="/arabic-cs-library/book/use-the-index-luke/sql-join-sort-merge-join/index">«<em>دمج الترتيب</em>»</a>.</p>
<h2 id="الترتيب-والتجميع">الترتيب والتجميع</h2>
<p>Sortترتّب النتيجة وفق جملة <code>order by</code>. وتحتاج هذه العملية إلى كميات كبيرة من الذاكرة لتجسيد النتيجة الوسيطة (غير متدفقة). انظر أيضاً <a href="/arabic-cs-library/book/use-the-index-luke/sql-sorting-grouping-indexed-order-by/index">«<em>فهرسة Order By</em>»</a>.</p>
<p>Sort (Top N Sort)</p>
<p>ترتّب مجموعة فرعية من النتيجة وفق جملة <code>order by</code>. وتُستخدم لاستعلامات Top-N إذا لم يكن التنفيذ المتدفق ممكناً. انظر أيضاً <a href="/arabic-cs-library/book/use-the-index-luke/sql-partial-results-top-n-queries/index">«<em>الاستعلام عن صفوف Top-N</em>»</a>.</p>
<p>Stream Aggregate</p>
<p>تجمّع مجموعة مرتَّبة مسبقاً وفق جملة <code>group by</code>. ولا تخزّن هذه العملية النتيجة الوسيطة مؤقتاً — بل تُنفَّذ على نحو متدفق. انظر أيضاً <a href="/arabic-cs-library/book/use-the-index-luke/sql-sorting-grouping-indexed-group-by/index">«<em>فهرسة Group By</em>»</a>.</p>
<p>Hash Match (Aggregate)</p>
<p>تجمّع النتيجة باستخدام جدول تجزئة. وتحتاج هذه العملية إلى كميات كبيرة من الذاكرة لتجسيد النتيجة الوسيطة (غير متدفقة). والخرج غير مرتَّب بأي طريقة ذات معنى. انظر أيضاً <a href="/arabic-cs-library/book/use-the-index-luke/sql-sorting-grouping-indexed-group-by/index">«<em>فهرسة Group By</em>»</a>.</p>
<h2 id="استعلامات-top-n">استعلامات Top-N</h2>
<p>Topتوقف العمليات الأساسية عند جلب عدد الصفوف المطلوب. انظر أيضاً <a href="/arabic-cs-library/book/use-the-index-luke/sql-partial-results-top-n-queries/index">«<em>الاستعلام عن صفوف Top-N</em>»</a>.</p>
<p>وتتوقف كفاءة استعلام Top-N على نمط تنفيذ العمليات الأساسية؛ وهو غير فعّال أبداً عند إيقاف عمليات غير متدفقة مثل <code>Sort</code>.</p>
`,t={book:e,chapter:o,chapterTitle:a,slug:n,title:r,headings:s,html:p};export{e as book,o as chapter,a as chapterTitle,t as default,s as headings,p as html,n as slug,r as title};
