const e="use-the-index-luke",n="sql-myth-directory-null-cannot-be-indexed",s="The Oracle Database Cannot Index NULL",l="index",c="لا تستطيع قاعدة بيانات Oracle فهرسة NULL",o=[],t=`<p>يسهل فهم مصدر هذه الخرافة حين تنظر إلى العبارة المصوغة صوغاً صحيحاً:</p>
<blockquote>
<p>لا تُدرج قاعدة بيانات Oracle الصفوف في الفهرس إذا كانت جميع الأعمدة المفهرسة <code>NULL</code>.</p>
</blockquote>
<p>والفرق بين الخرافة والحقيقة صغير؛ فيبدو أن الخرافة صيغة ركيكة من الحقيقة.</p>
<p>والحقيقة أن <code>NULL</code> يمكن فهرسته بإضافة عمود آخر غير قابل لأن يكون <code>NULL</code> إلى الفهرس:</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX with_null <span class="hljs-keyword">ON</span> table_name (nullable_column, <span class="hljs-string">&#x27;X&#x27;</span>);
</code></pre>
`,a={book:e,chapter:n,chapterTitle:s,slug:l,title:c,headings:o,html:t};export{e as book,n as chapter,s as chapterTitle,a as default,o as headings,t as html,l as slug,c as title};
