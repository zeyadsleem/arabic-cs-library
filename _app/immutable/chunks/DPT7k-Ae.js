const s="use-the-index-luke",a="sql-example-schema-sql-server-sorting-grouping",n="SQL Server Scripts for “Sorting and Grouping”",e="index",l="سكربتات SQL Server لـ«الترتيب والتجميع»",p=[{depth:2,id:"order-by-المفهرس",text:"order by المفهرس"},{depth:2,id:"فهرسة-asc-وdesc-وnulls-firstlast",text:"فهرسة ASC وDESC وNULLS FIRST/LAST"},{depth:2,id:"group-by-المفهرس",text:"group by المفهرس"}],d=`<p>يحتوي هذا القسم على الشيفرة وخطط التنفيذ الخاصة بـ<a href="/arabic-cs-library/book/use-the-index-luke/sql-sorting-grouping/index">الفصل 6<em>الترتيب والتجميع</em></a> في قاعدة بيانات SQL Server.</p>
<h2 id="order-by-المفهرس"><code>order by</code> المفهرس</h2>
<pre><code class="language-sql"><span class="hljs-keyword">DROP</span> INDEX sales_date <span class="hljs-keyword">ON</span> sales;
GO

<span class="hljs-keyword">CREATE</span> INDEX sales_dt_pr <span class="hljs-keyword">ON</span> sales (sale_date, product_id);
GO

<span class="hljs-keyword">EXEC</span> sp_updatestats;
GO

<span class="hljs-keyword">SET</span> STATISTICS PROFILE <span class="hljs-keyword">ON</span>;

<span class="hljs-keyword">SELECT</span> sale_date, product_id, quantity
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">WHERE</span> sale_date <span class="hljs-operator">=</span> DATEADD(<span class="hljs-keyword">day</span>, <span class="hljs-number">-1</span>, GETDATE())
 <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span>  sale_date, product_id;
</code></pre>
<p>لا ينفّذ التنفيذ عملية فرز:</p>
<pre><code>Nested Loops(Inner Join, OUTER REFERENCES:[Bmk1000])
 |--Index Seek(OBJECT:([sales].[sales_dt_pr]),
 |  SEEK:[sales].[sale_date]=dateadd(day,(-1),getdate())
 |  ORDERED FORWARD)
 |--RID Lookup(OBJECT:([sales]),
    SEEK:[Bmk1000]=[Bmk1000]) LOOKUP ORDERED FORWARD
</code></pre>
<p>ويستخدم SQL Server خطة التنفيذ نفسها عند الترتيب حسب <code>PRODUCT_ID</code> وحده.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> sale_date, product_id, quantity
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">WHERE</span> sale_date <span class="hljs-operator">=</span> DATEADD(<span class="hljs-keyword">day</span>, <span class="hljs-number">-1</span>, GETDATE())
 <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> product_id;
</code></pre>
<p>ويستلزم استخدام شرط «أكبر من أو يساوي» عملية <code>Sort</code>:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> sale_date, product_id, quantity
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">WHERE</span> sale_date <span class="hljs-operator">&gt;=</span> DATEADD(<span class="hljs-keyword">day</span>, <span class="hljs-number">-1</span>, GETDATE())
 <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> product_id;
</code></pre>
<p>مع أن تقدير عدد الصفوف انخفض، ما جعل التكلفة أقل أيضاً:</p>
<pre><code>Sort(ORDER BY:([test].[dbo].[sales].[product_id] ASC))
 |--Nested Loops(Inner Join, OPTIMIZED WITH UNORDERED PREFETCH)
    |--Compute Scalar(DEFINE:([Expr1009]=BmkToPage([Bmk1000])))
    |  |--Nested Loops(Inner Join)
    |     |--Compute Scalar([...])
    |     |  |--Constant Scan
    |     |--Index Seek(OBJECT:([sales].[sales_dt_pr]),
    |        SEEK:([sales].[sale_date] &gt; [Expr1007]
    |         AND  [sales].[sale_date] &lt; NULL) ORDERED FORWARD)
    |--RID Lookup(OBJECT:([sales]),
       SEEK:([Bmk1000]=[Bmk1000]) LOOKUP ORDERED FORWARD)
</code></pre>
<h2 id="فهرسة-asc-وdesc-وnulls-firstlast">فهرسة ASC وDESC وNULLS FIRST/LAST</h2>
<p>مسح الفهرس بالاتجاه المعاكس:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> sale_date, product_id, quantity
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">WHERE</span> sale_date <span class="hljs-operator">&gt;=</span> DATEADD(<span class="hljs-keyword">day</span>, <span class="hljs-number">-1</span>, GETDATE())
 <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date <span class="hljs-keyword">DESC</span>, product_id <span class="hljs-keyword">DESC</span>;
</code></pre>
<p>ويسبّب خلط <code>ASC</code> و<code>DESC</code> فرزاً صريحاً:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> sale_date, product_id, quantity
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">WHERE</span> sale_date <span class="hljs-operator">&gt;=</span> DATEADD(<span class="hljs-keyword">day</span>, <span class="hljs-number">-1</span>, GETDATE())
 <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date <span class="hljs-keyword">ASC</span>, product_id <span class="hljs-keyword">DESC</span>;
</code></pre>
<p>ترتيب الفهرس بمُعدِّلات <code>ASC</code>/<code>DESC</code> مختلطة:</p>
<pre><code class="language-sql"><span class="hljs-keyword">DROP</span> INDEX sales_dt_pr <span class="hljs-keyword">ON</span> sales;
GO

<span class="hljs-keyword">CREATE</span> INDEX sales_dt_pr
    <span class="hljs-keyword">ON</span> sales (sale_date <span class="hljs-keyword">ASC</span>, product_id <span class="hljs-keyword">DESC</span>);
GO

<span class="hljs-keyword">SELECT</span> sale_date, product_id, quantity
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">WHERE</span> sale_date <span class="hljs-operator">&gt;=</span> DATEADD(<span class="hljs-keyword">day</span>, <span class="hljs-number">-1</span>, GETDATE())
 <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date <span class="hljs-keyword">ASC</span>, product_id <span class="hljs-keyword">DESC</span>;
</code></pre>
<p>لا يطبّق SQL Server 2008R2 امتداد <code>NULLS</code> في <code>order by</code>.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> sale_date, product_id, quantity
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">WHERE</span> sale_date <span class="hljs-operator">&gt;=</span> DATEADD(<span class="hljs-keyword">day</span>, <span class="hljs-number">-1</span>, GETDATE())
 <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date <span class="hljs-keyword">ASC</span>, product_id <span class="hljs-keyword">DESC</span> <span class="hljs-keyword">NULLS LAST</span>;
</code></pre>
<h2 id="group-by-المفهرس"><code>group by</code> المفهرس</h2>
<p>تنفيذ <code>group by</code> متدفق:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> product_id, <span class="hljs-built_in">SUM</span>(eur_value)
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">WHERE</span> sale_date <span class="hljs-operator">=</span> DATEADD(<span class="hljs-keyword">day</span>, <span class="hljs-number">-1</span>, GETDATE())
 <span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> product_id;
</code></pre>
<p>فرز/تجميع صريح عند استرجاع الإحصاءات ليومين (التوازي معطَّل لقراءة الخطة بوضوح):</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> product_id, <span class="hljs-built_in">SUM</span>(eur_value)
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">WHERE</span> sale_date <span class="hljs-operator">&gt;=</span> DATEADD(<span class="hljs-keyword">day</span>, <span class="hljs-number">-1</span>, GETDATE())
 <span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> product_id
OPTION (MAXDOP <span class="hljs-number">1</span>);
</code></pre>
<p>وتُستخدم خوارزمية التجزئة عند تجميع مجموعة أكبر:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> product_id, <span class="hljs-built_in">SUM</span>(eur_value)
  <span class="hljs-keyword">FROM</span> sales
 <span class="hljs-keyword">WHERE</span> sale_date <span class="hljs-operator">&gt;=</span> DATEADD(<span class="hljs-keyword">day</span>, <span class="hljs-number">-100</span>, GETDATE())
 <span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> product_id
OPTION (MAXDOP <span class="hljs-number">1</span>);
</code></pre>
`,r={book:s,chapter:a,chapterTitle:n,slug:e,title:l,headings:p,html:d};export{s as book,a as chapter,n as chapterTitle,r as default,p as headings,d as html,e as slug,l as title};
