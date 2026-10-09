const e="use-the-index-luke",n="sql-explain-plan-oracle-operations",a="العمليات",o="index",r="العمليات",i=[{depth:2,id:"الوصول-إلى-الفهرس-والجدول",text:"الوصول إلى الفهرس والجدول"},{depth:2,id:"عمليات-الربط",text:"عمليات الربط"},{depth:2,id:"الترتيب-والتجميع",text:"الترتيب والتجميع"},{depth:2,id:"استعلامات-top-n",text:"استعلامات Top-N"}],p=`<p>موردي الشخصي المفضل لعمليات خطة التنفيذ هو <a href="http://www.juliandyke.com/Optimisation/Operations/Operations.php">قائمة Julian Dyke</a> — غير أنها من وجهة نظر مختلفة.</p>
<h2 id="الوصول-إلى-الفهرس-والجدول">الوصول إلى الفهرس والجدول</h2>
<p>INDEX UNIQUE SCANتنفّذ <code>INDEX UNIQUE SCAN</code> اجتياز شجرة B فحسب. وتستخدم قاعدة البيانات هذه العملية إذا ضمن قيد فريد أن معايير البحث لن تطابق أكثر من مدخل واحد. انظر أيضاً <a href="/arabic-cs-library/book/use-the-index-luke/sql-anatomy/index">الفصل 1، «<em>تشريح فهرس SQL</em>»</a>.</p>
<p>INDEX RANGE SCAN</p>
<p>تنفّذ <code>INDEX RANGE SCAN</code> اجتياز شجرة B <em>و</em> تتبع سلسلة العقد الورقية للعثور على جميع المدخلات المطابقة. انظر أيضاً <a href="/arabic-cs-library/book/use-the-index-luke/sql-anatomy/index">الفصل 1، «<em>تشريح فهرس SQL</em>»</a>.</p>
<p>وما يسمى مُسندات ترشيح الفهرس كثيراً ما يسبّب مشكلات أداء لعملية <code>INDEX RANGE SCAN</code>. ويشرح <a href="/arabic-cs-library/book/use-the-index-luke/sql-explain-plan-oracle-filter-predicates/index">القسم التالي</a> كيفية تحديدها.</p>
<p>INDEX FULL SCAN</p>
<p>تقرأ الفهرس بأكمله — جميع الصفوف — بترتيب الفهرس. وتبعاً لإحصاءات نظام متنوعة، قد تنفّذ قاعدة البيانات هذه العملية إذا احتاجت جميع الصفوف بترتيب الفهرس — مثلاً بسبب جملة <code>order by</code> مقابلة. وقد يستخدم المُحسِّن بدلاً من ذلك <code>INDEX FAST FULL SCAN</code> وينفّذ عملية فرز إضافية. انظر <a href="/arabic-cs-library/book/use-the-index-luke/sql-sorting-grouping/index">الفصل 6، «<em>الترتيب والتجميع</em>»</a>.</p>
<p>INDEX FAST FULL SCAN</p>
<p>تقرأ الفهرس بأكمله — جميع الصفوف — كما هو مخزّن على القرص. وتُنفَّذ هذه العملية عادةً بدلاً من المسح الكامل للجدول إذا كانت جميع الأعمدة المطلوبة متاحة في الفهرس. وعلى غرار <code>TABLE ACCESS FULL</code>، تستفيد <code>INDEX FAST FULL SCAN</code> من عمليات القراءة متعددة الكتل. انظر <a href="/arabic-cs-library/book/use-the-index-luke/sql-clustering/index">الفصل 5، «<em>تجميع البيانات: القوة الثانية للفهرسة</em>»</a>.</p>
<p>TABLE ACCESS BY INDEX ROWID</p>
<p>تسترجع صفاً من الجدول باستخدام <code>ROWID</code> المسترجع من بحث الفهرس السابق. انظر أيضاً <a href="/arabic-cs-library/book/use-the-index-luke/sql-anatomy/index">الفصل 1، «<em>تشريح فهرس SQL</em>»</a>.</p>
<p>TABLE ACCESS FULL</p>
<p>وتُعرف أيضاً بالمسح الكامل للجدول. تقرأ الجدول بأكمله — جميع الصفوف والأعمدة — كما هو مخزّن على القرص. ومع أن عمليات القراءة متعددة الكتل تحسّن سرعة المسح الكامل تحسناً كبيراً، فهو لا يزال من أغلى العمليات. فإلى جانب معدلات الإدخال/الإخراج العالية، يجب أن يفحص المسح الكامل جميع صفوف الجدول، لذا قد يستهلك أيضاً قدراً كبيراً من وقت المعالج. انظر أيضاً <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-the-equals-operator-concatenated-keys/index#sb-full-table-scan">«<em>المسح الكامل للجدول</em>»</a>.</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=ap-plan-ora-op&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<h2 id="عمليات-الربط">عمليات الربط</h2>
<p>تعالج عمليات الربط عموماً جدولين في المرة الواحدة. وإذا كان للاستعلام عمليات ربط أكثر، نُفِّذت تتابعياً: الجدولان الأولان أولاً، ثم النتيجة الوسيطة مع الجدول التالي. وفي سياق الربط، قد يعني مصطلح «جدول» أيضاً «نتيجة وسيطة».</p>
<p>NESTED LOOPS JOINتربط جدولين بجلب النتيجة من جدول والاستعلام من الجدول الآخر مقابل كل صف من الأول. انظر أيضاً <a href="/arabic-cs-library/book/use-the-index-luke/sql-join-nested-loops-join-n1-problem/index">«<em>الحلقات المتداخلة</em>»</a>.</p>
<p>HASH JOIN</p>
<p>يحمّل الربط بالتجزئة السجلات المرشحة من أحد طرفَي الربط إلى جدول تجزئة، ثم يُفحص مقابل كل صف من الطرف الآخر للربط. انظر أيضاً <a href="/arabic-cs-library/book/use-the-index-luke/sql-join-hash-join-partial-objects/index">«<em>الربط بالتجزئة</em>»</a>.</p>
<p>MERGE JOIN</p>
<p>يجمع ربط الدمج قائمتين مرتَّبتين كما يُغلق السحّاب. ويجب أن يكون طرفا الربط مرتَّبين مسبقاً. انظر أيضاً <a href="/arabic-cs-library/book/use-the-index-luke/sql-join-sort-merge-join/index">«<em>دمج الترتيب</em>»</a>.</p>
<h2 id="الترتيب-والتجميع">الترتيب والتجميع</h2>
<p>SORT ORDER BYترتّب النتيجة وفق جملة <code>order by</code>. وتحتاج هذه العملية إلى كميات كبيرة من الذاكرة لتجسيد النتيجة الوسيطة (غير متدفقة). انظر أيضاً <a href="/arabic-cs-library/book/use-the-index-luke/sql-sorting-grouping-indexed-order-by/index">«<em>فهرسة Order By</em>»</a>.</p>
<p>SORT ORDER BY STOPKEY</p>
<p>ترتّب مجموعة فرعية من النتيجة وفق جملة <code>order by</code>. وتُستخدم لاستعلامات Top-N إذا لم يكن التنفيذ المتدفق ممكناً. انظر أيضاً <a href="/arabic-cs-library/book/use-the-index-luke/sql-partial-results-top-n-queries/index">«<em>الاستعلام عن صفوف Top-N</em>»</a>.</p>
<p>SORT GROUP BY</p>
<p>ترتّب مجموعة النتائج على أعمدة <code>group by</code> وتجمّع النتيجة المرتَّبة في خطوة ثانية. وتحتاج هذه العملية إلى كميات كبيرة من الذاكرة لتجسيد مجموعة النتائج الوسيطة (غير متدفقة). انظر أيضاً <a href="/arabic-cs-library/book/use-the-index-luke/sql-sorting-grouping-indexed-group-by/index">«<em>فهرسة Group By</em>»</a>.</p>
<p>SORT GROUP BY NOSORT</p>
<p>تجمّع مجموعة مرتَّبة مسبقاً وفق جملة <code>group by</code>. ولا تخزّن هذه العملية النتيجة الوسيطة مؤقتاً؛ بل تُنفَّذ على نحو متدفق. انظر أيضاً <a href="/arabic-cs-library/book/use-the-index-luke/sql-sorting-grouping-indexed-group-by/index">«<em>فهرسة Group By</em>»</a>.</p>
<p>HASH GROUP BY</p>
<p>تجمّع النتيجة باستخدام جدول تجزئة. وتحتاج هذه العملية إلى كميات كبيرة من الذاكرة لتجسيد مجموعة النتائج الوسيطة (غير متدفقة). والخرج غير مرتَّب بأي طريقة ذات معنى. انظر أيضاً <a href="/arabic-cs-library/book/use-the-index-luke/sql-sorting-grouping-indexed-group-by/index">«<em>فهرسة Group By</em>»</a>.</p>
<h2 id="استعلامات-top-n">استعلامات Top-N</h2>
<p>تتوقف كفاءة استعلامات Top-N على نمط تنفيذ العمليات الأساسية. وهي غير فعّالة أبداً عند إيقاف عمليات غير متدفقة مثل <code>SORT ORDER BY</code>.</p>
<p>COUNT STOPKEYتوقف العمليات الأساسية عند جلب عدد الصفوف المطلوب. انظر أيضاً <a href="/arabic-cs-library/book/use-the-index-luke/sql-partial-results-top-n-queries/index"><em>الاستعلام عن صفوف Top-N</em></a>.</p>
<p>WINDOW NOSORT STOPKEY</p>
<p>تستخدم دالة نافذة (جملة <code>over</code>) لإيقاف التنفيذ عند جلب عدد الصفوف المطلوب. انظر أيضاً <a href="/arabic-cs-library/book/use-the-index-luke/sql-partial-results-window-functions/index">«<em>استخدام دوال النوافذ لترقيم فعّال</em>»</a>.</p>
`,s={book:e,chapter:n,chapterTitle:a,slug:o,title:r,headings:i,html:p};export{e as book,n as chapter,a as chapterTitle,s as default,i as headings,p as html,o as slug,r as title};
