const e="use-the-index-luke",r="sql-where-clause-searching-for-ranges",a="Searching for Ranges",n="index",s="البحث عن النطاقات",c=[{depth:2,id:"المحتويات",text:"المحتويات"}],o=`<p>يمكن لمعاملات عدم التساوي مثل <code>&lt;</code> و<code>&gt;</code> و<code>between</code> أن تستخدم الفهارس تماماً كما يفعل معامل التساوي <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-the-equals-operator/index">الموضَّح أعلاه</a>. وحتى مرشّح <code>LIKE</code> يمكنه—في ظروف معينة—استخدام فهرس كما تفعل شروط النطاق.</p>
<p>ويحدّ استخدام هذه العمليات من اختيار ترتيب الأعمدة في الفهارس متعددة الأعمدة. وقد يستبعد هذا القيد كل خيارات الفهرسة المثلى—فهناك استعلامات لا يمكنك فيها ببساطة تعريف ترتيب أعمدة «صحيح» على الإطلاق.</p>
<h2 id="المحتويات">المحتويات</h2>
<ol>
<li><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-searching-for-ranges-greater-less-between-tuning-sql-access-filter-predicates/index">أكبر وأصغر و<code>BETWEEN</code></a></em> — ترتيب الأعمدة مرة أخرى</li>
<li><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-searching-for-ranges-like-performance-tuning/index">فهرسة مرشّحات <code>LIKE</code> في SQL</a></em> — <code>LIKE</code> ليس للبحث النصي الكامل</li>
<li><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-searching-for-ranges-index-merge-performance/index">دمج الفهارس</a></em> — لماذا لا نستخدم فهرساً لكل عمود؟</li>
</ol>
`,i={book:e,chapter:r,chapterTitle:a,slug:n,title:s,headings:c,html:o};export{e as book,r as chapter,a as chapterTitle,i as default,c as headings,o as html,n as slug,s as title};
