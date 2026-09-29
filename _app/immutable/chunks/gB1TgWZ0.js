const e="use-the-index-luke",n="sql-glossary-parsing-query-planning-compiling",a="Parsing - Query Planning - Compiling",i="index",s="التحليل - تخطيط الاستعلام - الترجمة",l=[],r=`<p>تصف مصطلحات <em>التحليل</em> (Parsing) في Oracle و<em>تخطيط الاستعلام</em> (Query Planning) في PostgreSQL و<em>الترجمة</em> (Compiling) في SQL Server عملية تحويل عبارة SQL إلى <a href="/arabic-cs-library/book/use-the-index-luke/sql-glossary-execution-plan-explain-plan/index">خطة تنفيذ</a>.</p>
<p>ولقواعد البيانات التي تملك ذاكرة مؤقتة مشتركة لخطط التنفيذ مرحلتا تحليل:</p>
<p>التحليل الصلب (Hard Parsing): التحليل الصلب هو بناء خطة تنفيذ انطلاقاً من عبارة SQL؛ وهو جهد كبير: فحص جميع أجزاء SQL، والنظر في جميع الفهارس، والنظر في جميع ترتيبات الربط، وهكذا. والتحليل الصلب مستهلك للموارد بشدة.</p>
<p>التحليل اللين (Soft Parsing)</p>
<p>التحليل اللين هو البحث عن خطة تنفيذ مخزنة مؤقتاً والعثور عليها واستخدامها؛ وتُجرى بعض الفحوصات الطفيفة، مثل حقوق الوصول، لكن يمكن إعادة استخدام خطة التنفيذ كما هي. وهذه عملية سريعة إلى حد ما.</p>
<p>ومفتاح الذاكرة المؤقتة هو أساساً سلسلة SQL الحرفية — وعادةً تجزئتها (hash). وإذا لم يوجد تطابق تام، يُشغَّل تحليل صلب. ولهذا تؤدي القيم الحرفية المضمّنة — خلافاً لوسائط الربط — إلى تحليل صلب ما لم تُستخدم قيم البحث نفسها مرة أخرى. وحتى في تلك الحالة، هناك احتمالات جيدة أن تكون خطة التنفيذ السابقة قد انتهت صلاحيتها في الذاكرة المؤقتة لأن خططاً جديدة ترد باستمرار.</p>
<h4>روابط</h4>
<ul>
<li><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-bind-parameters/index">استخدام وسائط الربط لتقليل كلفة التحليل</a></li>
<li><a href="/arabic-cs-library/book/use-the-index-luke/sql-explain-plan/index">الملحق أ: الحصول على خطط التنفيذ وقراءتها</a></li>
<li>مقال: «<a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-searching-for-ranges-greater-less-between-tuning-sql-access-filter-predicates/index">التخطيط لإعادة الاستخدام</a>» حول تخزين خطط التنفيذ مؤقتاً</li>
</ul>
`,o={book:e,chapter:n,chapterTitle:a,slug:i,title:s,headings:l,html:r};export{e as book,n as chapter,a as chapterTitle,o as default,l as headings,r as html,i as slug,s as title};
