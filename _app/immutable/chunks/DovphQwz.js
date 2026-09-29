const e="use-the-index-luke",i="sql-glossary-index-filter-predicates",a="Index Filter Predicates",l="index",r="مُسندات ترشيح الفهرس",s=[],n=`<p>هناك طريقتان مختلفتان تستخدم بهما قواعد البيانات الفهارس لتطبيق جمل <code>where</code> (المُسندات):</p>
<ul>
<li>كـ<em>مُسندات وصول (access predicates)</em>: تعبّر مُسندات الوصول عن شرطَي البدء والتوقف لـ<a href="/arabic-cs-library/book/use-the-index-luke/sql-anatomy-the-leaf-nodes/index">اجتياز العقد الورقية</a>.</li>
<li>كـ<em>مُسندات ترشيح (filter predicates)</em>: تُطبَّق مُسندات الترشيح أثناء اجتياز العقد الورقية فقط، ولا تساهم في شرطَي البدء والتوقف ولا تضيّق النطاق الممسوح.</li>
</ul>
<h4>مهم</h4>
<p>مُسندات الوصول والترشيح سمات لعمليات خطة الشرح — لا سمات للفهرس.</p>
<p>ويعني ذلك أن جمل <code>where</code> مختلفة يمكن أن تستخدم مُسندات وصول وترشيح مختلفة على الفهرس نفسه.</p>
<h4>روابط</h4>
<ul>
<li><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-searching-for-ranges-greater-less-between-tuning-sql-access-filter-predicates/index">مُسندات الوصول والترشيح في الفهرس مشروحة بمثال</a></li>
<li><a href="/arabic-cs-library/book/use-the-index-luke/sql-testing-scalability-data-volume/index">بيان أثر مُسندات ترشيح الفهرس العَرَضية</a></li>
<li><a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-searching-for-ranges-like-performance-tuning/index">لماذا لا تُعدّ عمليات بحث <code>LIKE</code> في أي موضع مُسندات وصول</a></li>
<li><a href="/arabic-cs-library/book/use-the-index-luke/sql-clustering-index-filter-predicates/index">مُسندات ترشيح الفهرس المستخدمة عمداً</a></li>
<li>كيف تكتشف مُسندات ترشيح الفهرس في خطط التنفيذ لدى <a href="/arabic-cs-library/book/use-the-index-luke/sql-explain-plan-oracle-filter-predicates/index">Oracle</a> و<a href="/arabic-cs-library/book/use-the-index-luke/sql-explain-plan-postgresql-filter-predicates/index">PostgreSQL</a> و<a href="/arabic-cs-library/book/use-the-index-luke/sql-explain-plan-oracle-filter-predicates/index">SQL Server</a>.</li>
</ul>
`,t={book:e,chapter:i,chapterTitle:a,slug:l,title:r,headings:s,html:n};export{e as book,i as chapter,a as chapterTitle,t as default,s as headings,n as html,l as slug,r as title};
