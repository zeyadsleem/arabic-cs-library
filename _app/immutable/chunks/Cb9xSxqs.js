const s="use-the-index-luke",a="sql-example-schema-postgresql-sorting-grouping",n="PostgreSQL Example Scripts for “Sorting and Grouping”",e="index",d="سكربتات أمثلة PostgreSQL لـ«الترتيب والتجميع»",p=[{depth:2,id:"order-by-المفهرس",text:"order by المفهرس"},{depth:2,id:"فهرسة-asc-وdesc-وnulls-firstlast",text:"فهرسة ASC وDESC وNULLS FIRST/LAST"},{depth:2,id:"group-by-المفهرس",text:"group by المفهرس"}],o=`<p>يحتوي هذا القسم على الشيفرة وخطط التنفيذ الخاصة بـ<a href="/arabic-cs-library/book/use-the-index-luke/sql-sorting-grouping/index">الفصل 6<em>الترتيب والتجميع</em></a> في قاعدة بيانات PostgreSQL.</p>
<h2 id="order-by-المفهرس"><code>order by</code> المفهرس</h2>
<pre><code class="language-sql">  <span class="hljs-keyword">DROP</span> INDEX sales_date;
<span class="hljs-keyword">CREATE</span> INDEX sales_dt_pr <span class="hljs-keyword">ON</span> sales (sale_date, product_id);

EXPLAIN
 <span class="hljs-keyword">SELECT</span> sale_date, product_id, quantity
   <span class="hljs-keyword">FROM</span> sales
  <span class="hljs-keyword">WHERE</span> sale_date <span class="hljs-operator">=</span> now() <span class="hljs-operator">-</span> <span class="hljs-type">INTERVAL</span> <span class="hljs-string">&#x27;1&#x27;</span> <span class="hljs-keyword">DAY</span>
  <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date, product_id;
</code></pre>
<p>لا ينفّذ التنفيذ عملية فرز:</p>
<pre><code>                         QUERY PLAN
-----------------------------------------------------------
Index Scan using sales_dt_pr (cost=0.01..680.86 rows=376)
  Index Cond: (sale_date = (now() - '1 day'::interval day))
</code></pre>
<p>ويستخدم PostgreSQL خطة التنفيذ نفسها عند الترتيب حسب <code>PRODUCT_ID</code> وحده.</p>
<pre><code>EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date = now() - INTERVAL '1' DAY
  ORDER BY product_id;
</code></pre>
<p>ويستلزم استخدام شرط «أكبر من أو يساوي» عملية <code>Sort</code>:</p>
<pre><code>EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date &gt;= now() - INTERVAL '1' DAY
  ORDER BY product_id;
</code></pre>
<p>مع أن تقدير عدد الصفوف انخفض، ما جعل التكلفة أقل أيضاً:</p>
<pre><code>                         QUERY PLAN
--------------------------------------------------------------
Sort  (cost=8.50..8.50 rows=1 width=32)
 Sort Key: product_id
 -&gt; Index Scan using sales_dt_pr (cost=0.00..8.49 rows=1)
    Index Cond: (sale_date &gt;= (now() - '1 day'::interval day))
</code></pre>
<h2 id="فهرسة-asc-وdesc-وnulls-firstlast">فهرسة ASC وDESC وNULLS FIRST/LAST</h2>
<p>مسح الفهرس بالاتجاه المعاكس:</p>
<pre><code>EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date &gt;= now() - INTERVAL '1' DAY
  ORDER BY sale_date DESC, product_id DESC;
</code></pre>
<p>ويسبّب خلط <code>ASC</code> و<code>DESC</code> فرزاً صريحاً:</p>
<pre><code>EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date &gt;= now() - INTERVAL '1' DAY
  ORDER BY sale_date ASC, product_id DESC;
</code></pre>
<p>ترتيب الفهرس بمُعدِّلات <code>ASC</code>/<code>DESC</code> مختلطة:</p>
<pre><code class="language-sql">  <span class="hljs-keyword">DROP</span> INDEX sales_dt_pr;

<span class="hljs-keyword">CREATE</span> INDEX sales_dt_pr
    <span class="hljs-keyword">ON</span> sales (sale_date <span class="hljs-keyword">ASC</span>, product_id <span class="hljs-keyword">DESC</span>);

EXPLAIN
 <span class="hljs-keyword">SELECT</span> sale_date, product_id, quantity
   <span class="hljs-keyword">FROM</span> sales
  <span class="hljs-keyword">WHERE</span> sale_date <span class="hljs-operator">&gt;=</span> now() <span class="hljs-operator">-</span> <span class="hljs-type">INTERVAL</span> <span class="hljs-string">&#x27;1&#x27;</span> <span class="hljs-keyword">DAY</span>
  <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date <span class="hljs-keyword">ASC</span>, product_id <span class="hljs-keyword">DESC</span>;
</code></pre>
<p>يرتّب PostgreSQL بـ<code>NULLS LAST</code> افتراضياً. غير أن المُعدِّل <code>DESC</code> يضع القيم في المقدمة، لذا يجب أن يفرز <code>DESC NULLS LAST</code> فرزاً صريحاً:</p>
<pre><code>EXPLAIN
 SELECT sale_date, product_id, quantity
   FROM sales
  WHERE sale_date &gt;= now() - INTERVAL '1' DAY
  ORDER BY sale_date ASC, product_id DESC NULLS LAST;
</code></pre>
<p>ويسمح PostgreSQL بالفهرسة الصريحة بـ<code>NULLS LAST</code> أيضاً، فيصبح الأمر <code>order by</code> متدفقاً مرة أخرى:</p>
<pre><code class="language-sql">  <span class="hljs-keyword">DROP</span> INDEX sales_dt_pr;

<span class="hljs-keyword">CREATE</span> INDEX sales_dt_pr
    <span class="hljs-keyword">ON</span> sales (sale_date <span class="hljs-keyword">ASC</span>, product_id <span class="hljs-keyword">DESC</span> <span class="hljs-keyword">NULLS LAST</span>);

EXPLAIN
 <span class="hljs-keyword">SELECT</span> sale_date, product_id, quantity
   <span class="hljs-keyword">FROM</span> sales
  <span class="hljs-keyword">WHERE</span> sale_date <span class="hljs-operator">&gt;=</span> now() <span class="hljs-operator">-</span> <span class="hljs-type">INTERVAL</span> <span class="hljs-string">&#x27;1&#x27;</span> <span class="hljs-keyword">DAY</span>
  <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date <span class="hljs-keyword">ASC</span>, product_id <span class="hljs-keyword">DESC</span> <span class="hljs-keyword">NULLS LAST</span>;
</code></pre>
<h2 id="group-by-المفهرس"><code>group by</code> المفهرس</h2>
<p>يبدو أن قاعدة بيانات PostgreSQL (من 9.0 إلى 13 على الأقل) فيها خلل صغير يجعل ما يلي لا يعمل كـ<code>order by</code> متدفق عندما يكون الفهرس بـ<code>NULLS LAST</code> كما أُنشئ أعلاه:</p>
<pre><code>EXPLAIN
 SELECT product_id, SUM(eur_value)
   FROM sales
  WHERE sale_date = now() - INTERVAL '1' DAY
  GROUP BY product_id;
</code></pre>
<pre><code>                                     QUERY PLAN
------------------------------------------------------------------------------------
 HashAggregate  (cost=574.21..574.53 rows=26 width=40)
   Group Key: product_id
   -&gt;  Index Scan using sales_dt_pr on sales  (cost=0.43..572.62 rows=318 width=14)
         Index Cond: (sale_date = (now() - '1 day'::interval day))
</code></pre>
<p>ويكشف حذف جملة <code>NULLS LAST</code> من الفهرس أمراً مثيراً للاهتمام:</p>
<pre><code class="language-sql">  <span class="hljs-keyword">DROP</span> INDEX sales_dt_pr;

<span class="hljs-keyword">CREATE</span> INDEX sales_dt_pr
    <span class="hljs-keyword">ON</span> sales (sale_date <span class="hljs-keyword">ASC</span>, product_id <span class="hljs-keyword">DESC</span>);

EXPLAIN
 <span class="hljs-keyword">SELECT</span> product_id, <span class="hljs-built_in">SUM</span>(eur_value)
   <span class="hljs-keyword">FROM</span> sales
  <span class="hljs-keyword">WHERE</span> sale_date <span class="hljs-operator">=</span> now() <span class="hljs-operator">-</span> <span class="hljs-type">INTERVAL</span> <span class="hljs-string">&#x27;1&#x27;</span> <span class="hljs-keyword">DAY</span>
  <span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> product_id;
</code></pre>
<pre><code>                                         QUERY PLAN
---------------------------------------------------------------------------------------------
 GroupAggregate  (cost=0.43..574.53 rows=26 width=40)
   Group Key: product_id
   -&gt;  Index Scan Backward using sales_dt_pr on sales  (cost=0.43..572.62 rows=318 width=14)
         Index Cond: (sale_date = (now() - '1 day'::interval day))
</code></pre>
<p>يُقرأ الفهرس بالاتجاه المعاكس رغم أن عبارة SQL لا تتطلب ذلك. ويبدو أن PostgreSQL يستخدم <code>GROUP BY PRODUCT_ID</code> داخلياً لجلب النتيجة المرتَّبة مسبقاً. وتضيف الحالة التالية جملة <code>order by</code> بالترتيب المعاكس.</p>
<pre><code>EXPLAIN
 SELECT product_id, SUM(eur_value)
   FROM sales
  WHERE sale_date = now() - INTERVAL '1' DAY
  GROUP BY product_id
  ORDER BY product_id DESC;
</code></pre>
<pre><code>                                     QUERY PLAN
------------------------------------------------------------------------------------
 GroupAggregate  (cost=0.43..574.53 rows=26 width=40)
   Group Key: product_id
   -&gt;  Index Scan using sales_dt_pr on sales  (cost=0.43..572.62 rows=318 width=14)
         Index Cond: (sale_date = (now() - '1 day'::interval day))
</code></pre>
<p>إذن، يبدو أن <code>order by</code> الضمنية غير مثبتة في الشيفرة. ويبيّن اختبارنا التالي أن PostgreSQL يستطيع فعلاً استخدام مثل هذا الفهرس، لكن فقط إذا طلبت جملة <code>order by</code> صريحة الترتيب نفسه:</p>
<pre><code class="language-sql">  <span class="hljs-keyword">DROP</span> INDEX sales_dt_pr;

<span class="hljs-keyword">CREATE</span> INDEX sales_dt_pr
    <span class="hljs-keyword">ON</span> sales (sale_date <span class="hljs-keyword">ASC</span>, product_id <span class="hljs-keyword">DESC</span> <span class="hljs-keyword">NULLS LAST</span>);

EXPLAIN
 <span class="hljs-keyword">SELECT</span> product_id, <span class="hljs-built_in">SUM</span>(eur_value)
   <span class="hljs-keyword">FROM</span> sales
  <span class="hljs-keyword">WHERE</span> sale_date <span class="hljs-operator">=</span> now() <span class="hljs-operator">-</span> <span class="hljs-type">INTERVAL</span> <span class="hljs-string">&#x27;1&#x27;</span> <span class="hljs-keyword">DAY</span>
  <span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> product_id
  <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> product_id <span class="hljs-keyword">DESC</span> <span class="hljs-keyword">NULLS LAST</span>;
</code></pre>
<pre><code>                                     QUERY PLAN
------------------------------------------------------------------------------------
 GroupAggregate  (cost=0.43..574.53 rows=26 width=40)
   Group Key: product_id
   -&gt;  Index Scan using sales_dt_pr on sales  (cost=0.43..572.62 rows=318 width=14)
         Index Cond: (sale_date = (now() - '1 day'::interval day))
</code></pre>
<p>وهو ينفّذ <code>group by</code> متدفقة حتى عندما يكون الفهرس معرَّفاً بـ<code>NULLS LAST</code>، إذا كانت جملة <code>order by</code> ترتّب بالطريقة نفسها صراحةً. وإلا فإنه يستخدم جملة <code>order by</code> داخلية تتجاهل تحديد <code>NULLS</code> في الفهرس.</p>
<p>ويكشف اختبار إضافي أن المشكلة موجودة في فهارس <code>ASC</code> مع <code>NULLS FIRST</code>:</p>
<pre><code class="language-sql">  <span class="hljs-keyword">DROP</span> INDEX sales_dt_pr;

<span class="hljs-keyword">CREATE</span> INDEX sales_dt_pr
    <span class="hljs-keyword">ON</span> sales (sale_date <span class="hljs-keyword">ASC</span>, product_id <span class="hljs-keyword">ASC</span> <span class="hljs-keyword">NULLS FIRST</span>);

EXPLAIN
 <span class="hljs-keyword">SELECT</span> product_id, <span class="hljs-built_in">SUM</span>(eur_value)
   <span class="hljs-keyword">FROM</span> sales
  <span class="hljs-keyword">WHERE</span> sale_date <span class="hljs-operator">=</span> now() <span class="hljs-operator">-</span> <span class="hljs-type">INTERVAL</span> <span class="hljs-string">&#x27;1&#x27;</span> <span class="hljs-keyword">DAY</span>
  <span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> product_id
  <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> product_id <span class="hljs-keyword">ASC</span> <span class="hljs-keyword">NULLS FIRST</span>;
</code></pre>
<pre><code>                                     QUERY PLAN
------------------------------------------------------------------------------------
 GroupAggregate  (cost=0.43..574.53 rows=26 width=40)
   Group Key: product_id
   -&gt;  Index Scan using sales_dt_pr on sales  (cost=0.43..572.62 rows=318 width=14)
         Index Cond: (sale_date = (now() - '1 day'::interval day))
</code></pre>
<p>لكن بحذف جملة <code>order by</code>:</p>
<pre><code>EXPLAIN
 SELECT product_id, SUM(eur_value)
   FROM sales
  WHERE sale_date = now() - INTERVAL '1' DAY
  GROUP BY product_id;
</code></pre>
<pre><code>                                     QUERY PLAN
------------------------------------------------------------------------------------
 HashAggregate  (cost=574.21..574.53 rows=26 width=40)
   Group Key: product_id
   -&gt;  Index Scan using sales_dt_pr on sales  (cost=0.43..572.62 rows=318 width=14)
         Index Cond: (sale_date = (now() - '1 day'::interval day))
</code></pre>
`,l={book:s,chapter:a,chapterTitle:n,slug:e,title:d,headings:p,html:o};export{s as book,a as chapter,n as chapterTitle,l as default,p as headings,o as html,e as slug,d as title};
