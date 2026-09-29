const s="use-the-index-luke",e="sql-example-schema-mysql-partial-results",a="MySQL Example Scripts for “Partial Results”",n="index",l="سكربتات أمثلة MySQL لـ«النتائج الجزئية»",t=[{depth:2,id:"الاستعلام-عن-صفوف-top-n",text:"الاستعلام عن صفوف Top-N"}],p=`<p>يحتوي هذا القسم على عبارتَي <code>create</code> و<code>insert</code> لتشغيل أمثلة <a href="/arabic-cs-library/book/use-the-index-luke/sql-partial-results/index">الفصل 7<em>النتائج الجزئية</em></a> في قاعدة بيانات MySQL.</p>
<h2 id="الاستعلام-عن-صفوف-top-n">الاستعلام عن صفوف Top-N</h2>
<p>لا يُظهر استعلام Top-N المفهرس عملية «filesort» في عمود Extras:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date <span class="hljs-keyword">DESC</span>
 LIMIT <span class="hljs-number">10</span>
</code></pre>
<pre><code>+----+-------+-------+-------------+--------+-------+
| id | table | type  | key         | rows   | Extra |
+----+-------+-------+-------------+--------+-------+
|  1 | sales | index | sales_dt_pr | 836092 |       | 
+----+-------+-------+-------------+--------+-------+
</code></pre>
`,o={book:s,chapter:e,chapterTitle:a,slug:n,title:l,headings:t,html:p};export{s as book,e as chapter,a as chapterTitle,o as default,t as headings,p as html,n as slug,l as title};
