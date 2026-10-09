const s="use-the-index-luke",a="sql-example-schema-sql-server-clustering-data",n="SQL Server سكربتات المثال لـ «تجميع البيانات»",e="index",l="سكربتات SQL Server لـ«تجميع البيانات»",p=[{depth:2,id:"الجدول-المنظم-بالفهرس-الفهرس-العنقودي",text:"الجدول المنظَّم بالفهرس (الفهرس العنقودي)"}],r=`<p>يحتوي هذا القسم على شيفرة <code>create</code> و<code>insert</code> وT-SQL لتشغيل أمثلة <a href="/arabic-cs-library/book/use-the-index-luke/sql-clustering/index">الفصل 5<em>تجميع البيانات: القوة الثانية للفهرسة</em></a> في قاعدة بيانات SQL Server. وهو يتطلب الدالتين المساعدتين <code>RANDOM_DATE</code> و<code>RANDOM_INT</code> من <a href="/arabic-cs-library/book/use-the-index-luke/sql-example-schema-sql-server-where-clause/index">أمثلة جملة where</a>.</p>
<h2 id="الجدول-المنظم-بالفهرس-الفهرس-العنقودي">الجدول المنظَّم بالفهرس (الفهرس العنقودي)</h2>
<p>ينشئ ما يلي جدول مبيعات ثانياً بفهرس عنقودي وفهرس ثانوي على <code>SALE_DATE</code>.</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> sales_clst (
  sale_id       <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>,
  employee_id   <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>,
  subsidiary_id <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>,
  sale_date     <span class="hljs-type">DATE</span>    <span class="hljs-keyword">NOT NULL</span>,
  eur_value     <span class="hljs-type">NUMERIC</span>(<span class="hljs-number">17</span>,<span class="hljs-number">2</span>) <span class="hljs-keyword">NOT NULL</span>,
  junk          <span class="hljs-type">CHAR</span>(<span class="hljs-number">200</span>),
  <span class="hljs-keyword">CONSTRAINT</span> sales_pk     
     <span class="hljs-keyword">PRIMARY KEY</span> (sale_id),
  <span class="hljs-keyword">CONSTRAINT</span> sales_emp_fk 
     <span class="hljs-keyword">FOREIGN KEY</span>          (subsidiary_id, employee_id)
      <span class="hljs-keyword">REFERENCES</span> employees(subsidiary_id, employee_id)
);
GO

<span class="hljs-keyword">SELECT</span> RAND(<span class="hljs-number">0</span>);
GO

<span class="hljs-keyword">WITH</span> generator (n)
  <span class="hljs-keyword">AS</span> (
     <span class="hljs-keyword">SELECT</span> <span class="hljs-number">1</span>
      <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span>
     <span class="hljs-keyword">SELECT</span> n <span class="hljs-operator">+</span> <span class="hljs-number">1</span>
       <span class="hljs-keyword">FROM</span> generator
      <span class="hljs-keyword">WHERE</span> N <span class="hljs-operator">&lt;</span> <span class="hljs-number">1800</span>
     )
<span class="hljs-keyword">INSERT INTO</span> sales_clst (sale_id
                      , subsidiary_id, employee_id
                      , sale_date, eur_value, junk)
<span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">row_number</span>() <span class="hljs-keyword">OVER</span> (<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date), data.<span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> (
       <span class="hljs-keyword">SELECT</span> e.subsidiary_id, e.employee_id
            , [dbo].random_date(<span class="hljs-number">0</span>, <span class="hljs-number">3650</span>) sale_date
            , [dbo].random_int(<span class="hljs-number">1</span>, <span class="hljs-number">100000</span>)<span class="hljs-operator">/</span><span class="hljs-number">100</span> eur_value
            , <span class="hljs-string">&#x27;junk&#x27;</span> junk
         <span class="hljs-keyword">FROM</span> employees e
            , generator gen
        <span class="hljs-keyword">WHERE</span> employee_id <span class="hljs-operator">%</span> <span class="hljs-number">7</span> <span class="hljs-operator">=</span> <span class="hljs-number">4</span>
          <span class="hljs-keyword">AND</span> gen.n <span class="hljs-operator">&lt;</span> employee_id <span class="hljs-operator">/</span> <span class="hljs-number">5</span>
       ) data
        <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date
OPTION(MAXRECURSION <span class="hljs-number">2000</span>);
GO

<span class="hljs-keyword">EXEC</span> sp_updatestats;
GO
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:e,title:l,headings:p,html:r};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,r as html,e as slug,l as title};
