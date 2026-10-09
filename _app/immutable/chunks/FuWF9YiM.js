const e="use-the-index-luke",a="sql-glossary-index-organized-table",s="جدول منظّم بفهرسه",l="index",n="جدول منظَّم بالفهرس",r=[],i=`<p>الجدول المنظَّم بالفهرس في Oracle جدول مخزّن في بنية شجرة B للفهرس، ولا توجد بنية بيانات ثانية (<a href="/arabic-cs-library/book/use-the-index-luke/sql-glossary-heap-table/index">جدول كومة</a>) للجدول. وتستخدم قاعدة بيانات Oracle المفتاح الأساسي دائماً مفتاحاً للعنقدة. ويُنشأ الجدول المنظَّم بالفهرس بجملة <code>ORGANIZATION INDEX</code>:</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> (
   id    NUMBER <span class="hljs-keyword">NOT NULL</span> <span class="hljs-keyword">PRIMARY KEY</span>,
   [...]
) ORGANIZATION INDEX
</code></pre>
<p>والوصول إلى بيانات الجدول عبر <a href="/arabic-cs-library/book/use-the-index-luke/sql-glossary-secondary-index/index">فهرس ثانوي</a> أبطأ من استعلام مشابه على <a href="/arabic-cs-library/book/use-the-index-luke/sql-glossary-heap-table/index">جدول كومة</a>.</p>
<p>وتدعم SQL Server الجداول المنظَّمة بالفهرس أيضاً، لكنها تستخدم مصطلح <a href="/arabic-cs-library/book/use-the-index-luke/sql-glossary-clustered-index/index">الفهرس العنقودي</a>.</p>
<h4>روابط</h4>
<ul>
<li>قسم في الكتاب: <a href="/arabic-cs-library/book/use-the-index-luke/sql-clustering-index-organized-clustered-index/index">الجداول المنظَّمة بالفهرس</a></li>
<li>المسرد: <a href="/arabic-cs-library/book/use-the-index-luke/sql-glossary-heap-table/index">جدول كومة</a> — جداول مخزّنة بترتيب غير منظم.</li>
<li>المسرد: <a href="/arabic-cs-library/book/use-the-index-luke/sql-glossary-secondary-index/index">فهرس ثانوي</a> — فهارس أخرى على فهرس عنقودي</li>
</ul>
`,o={book:e,chapter:a,chapterTitle:s,slug:l,title:n,headings:r,html:i};export{e as book,a as chapter,s as chapterTitle,o as default,r as headings,i as html,l as slug,n as title};
