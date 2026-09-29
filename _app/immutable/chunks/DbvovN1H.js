const e="use-the-index-luke",d="sql-dml",n="Modifying Data",t="index",a="تعديل البيانات",l=[{depth:2,id:"المحتويات",text:"المحتويات"}],o=`<p>حتى الآن لم نناقش سوى أداء الاستعلامات، لكن SQL ليست محصورة في الاستعلامات؛ فهي تدعم تعديل البيانات (data manipulation) أيضاً. وتشكّل الأوامر الخاصة بذلك — <code>insert</code> و<code>delete</code> و<code>update</code> — ما يُسمى «لغة تعديل البيانات» (data manipulation language — DML)، وهي قسم من معيار SQL. ويتأثر أداء هذه الأوامر في معظمه سلباً بالفهارس.</p>
<p>الفهرس تكرار محض (redundancy)؛ فهو لا يحتوي إلا على بيانات مخزّنة في الجدول أيضاً. وأثناء عمليات الكتابة، يجب على قاعدة البيانات أن تحافظ على اتساق هذه التكرارات. وبشكل محدد، يعني ذلك أن <code>insert</code> و<code>delete</code> و<code>update</code> لا تؤثر في الجدول فحسب، بل تؤثر أيضاً في الفهارس التي تحتفظ بنسخة من البيانات المتأثرة.</p>
<h2 id="المحتويات">المحتويات</h2>
<ol>
<li><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-dml-insert/index">الإدراج</a></em> — لا يستفيد استفادة مباشرة من الفهارس</li>
<li><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-dml-delete/index">الحذف</a></em> — يستخدم الفهارس من أجل جملة <code>where</code></li>
<li><em><a href="/arabic-cs-library/book/use-the-index-luke/sql-dml-update/index">التحديث</a></em> — لا يؤثر في جميع فهارس الجدول</li>
</ol>
`,i={book:e,chapter:d,chapterTitle:n,slug:t,title:a,headings:l,html:o};export{e as book,d as chapter,n as chapterTitle,i as default,l as headings,o as html,t as slug,a as title};
