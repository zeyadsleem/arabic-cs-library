const s="use-the-index-luke",e="sql-example-schema-mysql-sorting-grouping",a="MySQL Example Scripts for “Sorting and Grouping”",n="index",p="سكربتات أمثلة MySQL لـ«الترتيب والتجميع»",d=[{depth:2,id:"order-by-المفهرس",text:"order by المفهرس"},{depth:2,id:"order-by-ascdesc-وnulls-firstlast",text:"Order By ASC/DESC وNULLS FIRST/LAST"},{depth:2,id:"فهرسة-group-by",text:"فهرسة group by"}],l=`<p>يحتوي هذا القسم على الشيفرة وخطط التنفيذ الخاصة بـ<a href="/arabic-cs-library/book/use-the-index-luke/sql-sorting-grouping/index">الفصل 6<em>الترتيب والتجميع</em></a> في قاعدة بيانات MySQL.</p>
<h2 id="order-by-المفهرس"><code>order by</code> المفهرس</h2>
<pre><code class="language-sql"><span class="hljs-keyword">ALTER TABLE</span> sales
 <span class="hljs-keyword">DROP</span> INDEX sales_date;

<span class="hljs-keyword">ALTER TABLE</span> sales
  <span class="hljs-keyword">ADD</span> INDEX sales_dt_pr (sale_date, product_id);

EXPLAIN
 <span class="hljs-keyword">SELECT</span> sale_date, product_id, quantity
   <span class="hljs-keyword">FROM</span> sales
  <span class="hljs-keyword">WHERE</span> sale_date <span class="hljs-operator">=</span> CURDATE() <span class="hljs-operator">-</span> <span class="hljs-type">INTERVAL</span> <span class="hljs-number">1</span> <span class="hljs-keyword">DAY</span>
  <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date, product_id;
</code></pre>
<p>لا توجد عبارة «Extra: Using filesort»:</p>
<pre><code>+-------------+------+-------------+------+-------------+
| select_type | type | key         | rows | Extra       |
+-------------+------+-------------+------+-------------+
| SIMPLE      | ref  | sales_dt_pr |    1 | Using where |
+-------------+------+-------------+------+-------------+
</code></pre>
<p>وتُستخدم خطة التنفيذ نفسها عند الترتيب حسب <code>PRODUCT_ID</code> وحده:</p>
<pre><code>EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date = CURDATE() - INTERVAL 1 DAY
  ORDER BY product_id;
</code></pre>
<p>ويستلزم استخدام «أكبر من أو يساوي» فرزاً صريحاً:</p>
<pre><code>EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date &gt;= CURDATE() - INTERVAL 1 DAY
  ORDER BY product_id;
</code></pre>
<p>أُعيد تنسيق خطة التنفيذ لتلائم الصفحة على نحو أفضل:</p>
<pre><code>+-------------+------+-------------+------+----------------+
| select_type | type | key         | rows | Extra          |
+-------------+------+-------------+------+----------------+
| SIMPLE      | ref  | sales_dt_pr |  117 | Using where;   |
|             |      |             |      | Using filesort |
+-------------+------+-------------+------+----------------+
</code></pre>
<h2 id="order-by-ascdesc-وnulls-firstlast">Order By ASC/DESC وNULLS FIRST/LAST</h2>
<p>يستخدم MySQL الفهرس بالاتجاه المعاكس، لكنه لا يذكر ذلك في خطة التنفيذ:</p>
<pre><code>EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date &gt;= CURDATE() - INTERVAL 1 DAY
  ORDER BY sale_date DESC, product_id DESC;
</code></pre>
<p>ويتطلب خلط <code>ASC</code> و<code>DESC</code> فرزاً صريحاً:</p>
<pre><code>EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date &gt;= CURDATE() - INTERVAL 1 DAY
  ORDER BY sale_date ASC, product_id DESC;
</code></pre>
<p>يقبل MySQL تحديد <code>ASC</code> و<code>DESC</code> في تعريف الفهرس، لكنه يتجاهله.</p>
<pre><code class="language-sql"><span class="hljs-keyword">ALTER TABLE</span> sales
 <span class="hljs-keyword">DROP</span> INDEX sales_dt_pr;

<span class="hljs-keyword">ALTER TABLE</span> sales
  <span class="hljs-keyword">ADD</span> INDEX sales_dt_pr (sale_date <span class="hljs-keyword">ASC</span>, product_id <span class="hljs-keyword">DESC</span>);

EXPLAIN
 <span class="hljs-keyword">SELECT</span> sale_date, product_id, quantity
   <span class="hljs-keyword">FROM</span> sales
  <span class="hljs-keyword">WHERE</span> sale_date <span class="hljs-operator">&gt;=</span> CURDATE() <span class="hljs-operator">-</span> <span class="hljs-type">INTERVAL</span> <span class="hljs-number">1</span> <span class="hljs-keyword">DAY</span>
  <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date <span class="hljs-keyword">ASC</span>, product_id <span class="hljs-keyword">DESC</span>;
</code></pre>
<p>ولإثبات ذلك، لا يزال يتجنّب الفرز عندما يكون العمودان مرتَّبين تصاعدياً.</p>
<pre><code>EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date &gt;= CURDATE() - INTERVAL 1 DAY
  ORDER BY sale_date ASC, product_id ASC;
</code></pre>
<h2 id="فهرسة-group-by">فهرسة <code>group by</code></h2>
<p>لا تُظهر <code>group by</code> المفهرسة أي عملية فرز في خطة التنفيذ:</p>
<pre><code>EXPLAIN
 SELECT product_id, sum(eur_value)
   FROM sales
  WHERE sale_date = CURDATE() - INTERVAL 1 DAY
  GROUP BY product_id;
</code></pre>
<p>وتُنفَّذ <code>group by</code> العادية بخوارزمية الفرز/التجميع، لأن MySQL لا تطبّق التجميع بالتجزئة (Hash-Group) حتى الإصدار 5.6.</p>
<pre><code>EXPLAIN
 SELECT product_id, sum(eur_value)
   FROM sales
  WHERE sale_date &gt;= CURDATE() - INTERVAL 1 DAY
  GROUP BY product_id;
</code></pre>
`,r={book:s,chapter:e,chapterTitle:a,slug:n,title:p,headings:d,html:l};export{s as book,e as chapter,a as chapterTitle,r as default,d as headings,l as html,n as slug,p as title};
