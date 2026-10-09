const e="use-the-index-luke",n="sql-explain-plan-sqlite-getting-an-execution-plan",t="الحصول على خطة تنفيذ",p="index",l="الحصول على خطة تنفيذ",a=[{depth:2,id:"explain-query-plan",text:"EXPLAIN QUERY PLAN"}],s=`<p>يقدّم SQLite مستويين مختلفين لخطط التنفيذ: (1) شيفرة الآلة للآلة الافتراضية؛ (2) خطة الاستعلام عالية المستوى.</p>
<p>يعرض هذا الدرس الصيغة الثانية فقط.</p>
<h2 id="explain-query-plan">EXPLAIN QUERY PLAN</h2>
<p>يمكنك أن تسبق أي أمر SQL اعتباطي بـ<code>explain query plan</code> لاسترجاع خطة الاستعلام (بدلاً من تشغيل الاستعلام).</p>
<pre><code class="language-sql">EXPLAIN QUERY PLAN
<span class="hljs-keyword">SELECT</span> RANDOM()
</code></pre>
<p>ويعيد هذا المثال البسيط خطة التنفيذ التالية:</p>
<pre><code>QUERY PLAN
\`--SCAN CONSTANT ROW
</code></pre>
`,c={book:e,chapter:n,chapterTitle:t,slug:p,title:l,headings:a,html:s};export{e as book,n as chapter,t as chapterTitle,c as default,a as headings,s as html,p as slug,l as title};
