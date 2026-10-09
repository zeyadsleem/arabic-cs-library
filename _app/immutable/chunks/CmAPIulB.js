const s="use-the-index-luke",a="sql-example-schema-sqlbase-join",n="SQLBase سكربتات المثال لـ «عملية الوصل»",l="index",p="سكربتات أمثلة SQLBase لـ«عملية الربط»",e=[],r=`<p>يحتوي هذا القسم على شيفرة <code>create</code> و<code>insert</code> لتشغيل أمثلة <a href="/arabic-cs-library/book/use-the-index-luke/sql-join/index">الفصل 4<em>عملية الربط</em></a> في قاعدة بيانات Gupta/Unify SQLBase.</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> sales (
  sale_id       <span class="hljs-type">INTEGER</span> <span class="hljs-keyword">NOT NULL</span>,
  employee_id   <span class="hljs-type">INTEGER</span> <span class="hljs-keyword">NOT NULL</span>,
  subsidiary_id <span class="hljs-type">INTEGER</span> <span class="hljs-keyword">NOT NULL</span>,
  sale_date     <span class="hljs-type">DATE</span>   <span class="hljs-keyword">NOT NULL</span>,
  eur_value     <span class="hljs-type">DECIMAL</span>(<span class="hljs-number">13</span>,<span class="hljs-number">2</span>) <span class="hljs-keyword">NOT NULL</span>,
  product_id    <span class="hljs-type">INTEGER</span> <span class="hljs-keyword">NOT NULL</span>,
  quantity      <span class="hljs-type">INTEGER</span> <span class="hljs-keyword">NOT NULL</span>,
  junk          <span class="hljs-type">CHAR</span>(<span class="hljs-number">200</span>),
  <span class="hljs-keyword">PRIMARY KEY</span> (sale_id),
  <span class="hljs-keyword">FOREIGN KEY</span> (subsidiary_id, employee_id)
   <span class="hljs-keyword">REFERENCES</span> employees
);

\uFEFF<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">UNIQUE</span> INDEX sales_pk <span class="hljs-keyword">ON</span> sales (sale_id);

<span class="hljs-keyword">INSERT INTO</span> sales (sale_id
                 , subsidiary_id, employee_id
                 , sale_date, eur_value
                 , product_id, quantity
                 , junk)
       <span class="hljs-keyword">SELECT</span> gen.n <span class="hljs-operator">*</span><span class="hljs-number">2000</span><span class="hljs-operator">*</span><span class="hljs-number">30</span> <span class="hljs-operator">+</span> e.employee_id <span class="hljs-operator">*</span> <span class="hljs-number">30</span> <span class="hljs-operator">+</span> e.subsidiary_id <span class="hljs-keyword">AS</span> sale_id
            , e.subsidiary_id, e.employee_id
            , SYSDATE <span class="hljs-operator">-</span> <span class="hljs-variable">@mod</span>(n<span class="hljs-operator">+</span><span class="hljs-variable">@MICROSECOND</span>(<span class="hljs-variable">@NOW</span>), <span class="hljs-number">10</span><span class="hljs-operator">*</span><span class="hljs-number">365</span>) <span class="hljs-keyword">AS</span>  sale_date
            , (<span class="hljs-variable">@MOD</span>(<span class="hljs-variable">@MICROSECOND</span>(<span class="hljs-variable">@NOW</span>)<span class="hljs-operator">+</span>n, <span class="hljs-number">9000</span>) <span class="hljs-operator">+</span> <span class="hljs-number">1000</span>)<span class="hljs-operator">/</span><span class="hljs-number">100</span> <span class="hljs-keyword">AS</span> eur_value
            , <span class="hljs-variable">@MOD</span>(<span class="hljs-variable">@SECOND</span>(<span class="hljs-variable">@NOW</span>)<span class="hljs-operator">+</span>n<span class="hljs-operator">/</span><span class="hljs-number">9000</span><span class="hljs-operator">*</span><span class="hljs-number">29</span>,<span class="hljs-number">29</span>) <span class="hljs-keyword">AS</span> product_id
            , <span class="hljs-variable">@MOD</span>(<span class="hljs-variable">@SECOND</span>(<span class="hljs-variable">@NOW</span>)<span class="hljs-operator">+</span>n<span class="hljs-operator">/</span><span class="hljs-number">9000</span><span class="hljs-operator">*</span><span class="hljs-number">26</span>,<span class="hljs-number">5</span>) <span class="hljs-keyword">AS</span> quantity
            , <span class="hljs-string">&#x27;junk&#x27;</span>
         <span class="hljs-keyword">FROM</span> employees e
          , generator_4k gen
        <span class="hljs-keyword">WHERE</span> <span class="hljs-variable">@MOD</span>(employee_id, <span class="hljs-number">7</span>) <span class="hljs-operator">=</span> <span class="hljs-number">4</span>
              <span class="hljs-keyword">AND</span> gen.n <span class="hljs-operator">&lt;</span> <span class="hljs-number">1800</span>
          <span class="hljs-keyword">AND</span> gen.n <span class="hljs-operator">&lt;</span> employee_id <span class="hljs-operator">/</span> <span class="hljs-number">5</span> ;
</code></pre>
<p>ملاحظات:</p>
<ul>
<li>الصفوف لا تُدرَج زمنياً</li>
<li>جزء صغير فقط من الموظفين لديهم مبيعات أصلاً.</li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:e,html:r};export{s as book,a as chapter,n as chapterTitle,c as default,e as headings,r as html,l as slug,p as title};
