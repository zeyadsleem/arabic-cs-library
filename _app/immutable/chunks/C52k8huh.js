const e="use-the-index-luke",s="sql-glossary-clustered-index",a="Clustered Index / Non-Clustered Index",n="index",l="فهرس عنقودي / فهرس غير عنقودي",r=[],i=`<p>الفهرس العنقودي (clustered index) في SQL Server وMySQL/InnoDB جدول مخزّن في بنية شجرة B للفهرس، ولا توجد بنية بيانات ثانية (<a href="/arabic-cs-library/book/use-the-index-luke/sql-glossary-heap-table/index">جدول كومة</a>) للجدول.</p>
<p>أما الفهرس غير العنقودي فهو فهرس يشير إلى بنية بيانات أخرى تحتوي أعمدة جدول إضافية.</p>
<p>الوصول إلى بيانات الجدول عبر <a href="/arabic-cs-library/book/use-the-index-luke/sql-glossary-secondary-index/index">فهرس ثانوي</a> (فهرس على فهرس عنقودي) أبطأ من استعلام مشابه على <a href="/arabic-cs-library/book/use-the-index-luke/sql-glossary-heap-table/index">جدول كومة</a>.</p>
<p>تدعم SQL Server الفهارس العنقودية اختيارياً؛ فلديك حرية الاختيار بين الفهارس العنقودية وجداول الكومة. ويمكن أن يوجد فهرس عنقودي واحد على الأكثر لكل جدول. ويؤدي إسقاط فهرس عنقودي إلى تحويل الجدول إلى <a href="/arabic-cs-library/book/use-the-index-luke/sql-glossary-heap-table/index">جدول كومة</a>. كما أن إضافة فهرس عنقودي إلى جدول كومة تُسقط بنية الكومة فعلاً. وتدعم SQL Server فهارس عنقودية غير فريدة على أعمدة اعتباطية. وإنشاء جدول SQL Server بلا فهرس عنقودي يتطلب استخدام جملة <code>NONCLUSTERED</code>:</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> (
   id    NUMBER <span class="hljs-keyword">NOT NULL</span>,
   [...]
   <span class="hljs-keyword">CONSTRAINT</span> pk <span class="hljs-keyword">PRIMARY KEY</span> NONCLUSTERED (id)
)
</code></pre>
<p>يحتوي محرّك MySQL InnoDB على <a href="https://dev.mysql.com/doc/refman/8.0/en/innodb-index-types.html">فهارس عنقودية إلزامية</a>؛ أي توجد دائماً فهرسة عنقودية، غالباً باستخدام المفتاح الأساسي. وإذا لم يوجد مفتاح فريد مناسب، تستخدم MySQL معرّف صف مولَّداً لهذا الغرض. ولا يدعم محرّك التخزين MyISAM الفهارس العنقودية ويستخدم جداول الكومة دائماً.</p>
<p>ولقاعدة بيانات Oracle فهارس عنقودية اختيارية تسمى <a href="/arabic-cs-library/book/use-the-index-luke/sql-glossary-index-organized-table/index">الجداول المنظَّمة بالفهرس</a>، وهي تعمل على المفتاح الأساسي فقط.</p>
<h4>روابط</h4>
<ul>
<li>قسم في الكتاب: <a href="/arabic-cs-library/book/use-the-index-luke/sql-clustering-index-organized-clustered-index/index">الجداول المنظَّمة بالفهرس</a></li>
<li>المسرد: <a href="/arabic-cs-library/book/use-the-index-luke/sql-glossary-heap-table/index">جدول كومة</a> — جداول مخزّنة بترتيب غير منظم.</li>
<li>المسرد: <a href="/arabic-cs-library/book/use-the-index-luke/sql-glossary-secondary-index/index">فهرس ثانوي</a> — فهارس أخرى على فهرس عنقودي</li>
</ul>
`,d={book:e,chapter:s,chapterTitle:a,slug:n,title:l,headings:r,html:i};export{e as book,s as chapter,a as chapterTitle,d as default,r as headings,i as html,n as slug,l as title};
