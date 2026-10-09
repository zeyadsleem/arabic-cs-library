const s="use-the-index-luke",a="sql-example-schema-oracle-sorting-grouping",n="Oracle سكربتات المثال لـ «الترتيب والتجميع»",l="index",p="سكربتات أمثلة Oracle لـ«الترتيب والتجميع»",e=[{depth:2,id:"order-by-المفهرس",text:"order by المفهرس"},{depth:2,id:"group-by-المفهرس",text:"group by المفهرس"}],c=`<p>يحتوي هذا القسم على شيفرة <code>create</code> و<code>insert</code> وPL/SQL لتشغيل أمثلة <a href="/arabic-cs-library/book/use-the-index-luke/sql-sorting-grouping/index">الفصل 6<em>الترتيب والتجميع</em></a> في قاعدة بيانات Oracle 11gR2.</p>
<h2 id="order-by-المفهرس"><code>order by</code> المفهرس</h2>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> sale_date, product_id, quantity
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">WHERE</span> sale_date <span class="hljs-operator">&gt;=</span> TRUNC(sysdate) <span class="hljs-operator">-</span> <span class="hljs-type">INTERVAL</span> <span class="hljs-string">&#x27;1&#x27;</span> <span class="hljs-keyword">DAY</span>
 <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> product_id
</code></pre>
<p>وجمع إحصاءات جديدة ممارسة جيدة بعد تغيير الفهارس:</p>
<pre><code class="language-javascript"><span class="hljs-variable constant_">BEGIN</span>
     <span class="hljs-variable constant_">DBMS_STATS</span>.<span class="hljs-title function_">GATHER_TABLE_STATS</span>(<span class="hljs-literal">null</span>, <span class="hljs-string">&#x27;SALES&#x27;</span>, 
     <span class="hljs-function"><span class="hljs-params">METHOD_OPT</span>=&gt;</span><span class="hljs-string">&#x27;for all indexed columns&#x27;</span>, <span class="hljs-function"><span class="hljs-params">CASCADE</span> =&gt;</span> <span class="hljs-literal">true</span>);
<span class="hljs-variable constant_">END</span>;
/
</code></pre>
<h2 id="group-by-المفهرس"><code>group by</code> المفهرس</h2>
<p>توجد مشكلة خاصة في قاعدة بيانات Oracle (من 11g إلى 19c على الأقل) تظهر عند ترتيب النتيجة المجمَّعة بترتيب الفهرس المعاكس:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> product_id, <span class="hljs-built_in">sum</span>(eur_value)
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">WHERE</span> sale_date <span class="hljs-operator">=</span> TRUNC(sysdate) <span class="hljs-operator">-</span> <span class="hljs-type">INTERVAL</span> <span class="hljs-string">&#x27;1&#x27;</span> <span class="hljs-keyword">DAY</span>
 <span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> product_id
 <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> product_id <span class="hljs-keyword">DESC</span>;
</code></pre>
<p>مع أنها تستطيع استخدام الفهرس عند الترتيب بترتيب الفهرس:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> product_id, <span class="hljs-built_in">sum</span>(eur_value)
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">WHERE</span> sale_date <span class="hljs-operator">=</span> TRUNC(sysdate) <span class="hljs-operator">-</span> <span class="hljs-type">INTERVAL</span> <span class="hljs-string">&#x27;1&#x27;</span> <span class="hljs-keyword">DAY</span>
 <span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> product_id
 <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> product_id <span class="hljs-keyword">ASC</span>;
</code></pre>
<p>ولا يوجد حل معروف لهذه المشكلة.</p>
`,r={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:e,html:c};export{s as book,a as chapter,n as chapterTitle,r as default,e as headings,c as html,l as slug,p as title};
