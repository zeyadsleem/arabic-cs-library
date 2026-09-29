const e="use-the-index-luke",n="sql-glossary-index-only-scan",s="Index-Only Scan",l="index",a="مسح الفهرس فقط",c=[],o=`<p>مسح الفهرس فقط (Index-Only Scan) هو مسح فهرس بلا وصول لاحق إلى الجدول — أي الوصول إلى الفهرس وحده.</p>
<p>وتدعم جميع الإصدارات الحديثة من Oracle وSQL Server وMySQL عمليات مسح الفهرس فقط. أما قاعدة بيانات PostgreSQL فتدعمها منذ <a href="https://www.depesz.com/2011/10/08/waiting-for-9-2-index-only-scans/">الإصدار 9.2</a>.</p>
<p>ويمكن تنفيذ استعلام بمسح الفهرس فقط إذا كانت جميع البيانات المستعلَم عنها متاحة في الفهرس؛ أي يجب تضمين حتى الأعمدة التي تظهر في جملة <code>select</code> وحدها في الفهرس.</p>
<p>وتعتمد الميزة الأدائية لمسح الفهرس فقط على عدد الصفوف التي يُوصَل إليها وعلى عامل العنقدة في الفهرس.</p>
<h4>روابط</h4>
<ul>
<li>قسم في الكتاب: <a href="/arabic-cs-library/book/use-the-index-luke/sql-clustering-index-only-scan-covering-index/index">مسح الفهرس فقط: تجنّب الوصول إلى الجدول</a></li>
<li>المسرد: <a href="/arabic-cs-library/book/use-the-index-luke/sql-glossary-covering-index/index">فهرس مُغطٍّ</a> — اسم بديل لمسح الفهرس فقط</li>
</ul>
`,i={book:e,chapter:n,chapterTitle:s,slug:l,title:a,headings:c,html:o};export{e as book,n as chapter,s as chapterTitle,i as default,c as headings,o as html,l as slug,a as title};
