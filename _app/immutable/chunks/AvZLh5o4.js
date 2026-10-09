const e="use-the-index-luke",n="sql-glossary-query-optimizer-query-planner",l="المُحسِّن - مُحسِّن الاستعلامات - مُخطِّط الاستعلامات",i="index",r="المُحسِّن - مُحسِّن الاستعلام - مخطِّط الاستعلام",a=[],s=`<p>يترجم <em>المُحسِّن</em> (Optimizer) في Oracle أو <em>مُحسِّن الاستعلام</em> (Query Optimizer) في SQL Server وMySQL أو <em>مخطِّط الاستعلام</em> (Query Planner) في PostgreSQL عبارة SQL إلى برنامج قابل للتنفيذ في صورة <a href="/arabic-cs-library/book/use-the-index-luke/sql-glossary-execution-plan-explain-plan/index">خطة تنفيذ</a>، تماماً كما يترجم المترجم الشيفرة المصدرية إلى برنامج قابل للتنفيذ.</p>
<p>وهناك عموماً نوعان من المُحسِّنات:</p>
<p>المُحسِّن القائم على القواعد (Rule Based Optimizer — RBO)</p>
<p>تتبع المُحسِّنات القائمة على القواعد مجموعة صارمة من القواعد لإنشاء خطة التنفيذ — مثل استخدام فهرس دائماً إذا أمكن.</p>
<p>المُحسِّن القائم على التكلفة (Cost Based Optimizer — CBO)</p>
<p>تولّد المُحسِّنات القائمة على التكلفة خطط تنفيذ مختلفة كثيرة، وتطبّق نموذج تكلفة عليها جميعاً، وتختار الخطة ذات أفضل قيمة تكلفة للتنفيذ.</p>
<p>وسيقارن المُحسِّن القائم على التكلفة، مثلاً، التكلفة المقدَّرة لاستعلام يستخدم فهرساً بتكلفة قراءة الجدول بأكمله. وقد يختار الوصول الكامل إلى الجدول إذا دلّت قيم التكلفة على أن الوصول الكامل أكثر كفاءة من البحث في الفهرس.</p>
<p>والمُحسِّنات القائمة على التكلفة هي التطبيق السائد.</p>
<p>وأهم القرارات التي تتخذها المُحسِّنات هي:</p>
<ul>
<li>اختيار خوارزمية الربط وترتيب الربط</li>
<li>استخدام الفهارس</li>
</ul>
<p>ولا تقوم المُحسِّنات بما يلي:</p>
<ul>
<li>تحسين الجداول أو الفهارس</li>
<li>تحسين SQL المشوَّش</li>
<li>إعادة تجميع البيانات (defragmentation)</li>
</ul>
<h4>روابط</h4>
<ul>
<li><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-bind-parameters/index">استخدام وسائط الربط لتقليل كلفة المُحسِّن</a></li>
<li>مقال: «<a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-searching-for-ranges-greater-less-between-tuning-sql-access-filter-predicates/index">التخطيط لإعادة الاستخدام</a>» حول تخزين خطط التنفيذ مؤقتاً</li>
<li>المسرد: <a href="/arabic-cs-library/book/use-the-index-luke/sql-glossary-execution-plan-explain-plan/index">خطة التنفيذ</a></li>
</ul>
`,t={book:e,chapter:n,chapterTitle:l,slug:i,title:r,headings:a,html:s};export{e as book,n as chapter,l as chapterTitle,t as default,a as headings,s as html,i as slug,r as title};
