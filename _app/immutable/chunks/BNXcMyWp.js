const s="use-the-index-luke",a="sql-example-schema-sqlite-join",n="SQLite Example Scripts for “The Join Operation”",l="index",p="سكربتات أمثلة SQLite لـ«عملية الربط»",e=[],r=`<p>يحتوي هذا القسم على شيفرة <code>create</code> و<code>insert</code> لتشغيل أمثلة <a href="/arabic-cs-library/book/use-the-index-luke/sql-join/index">الفصل 4<em>عملية الربط</em></a> في قاعدة بيانات MySQL.</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> sales (
  sale_id       <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>,
  employee_id   <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>,
  subsidiary_id <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>,
  sale_date     <span class="hljs-type">DATE</span>   <span class="hljs-keyword">NOT NULL</span>,
  eur_value     <span class="hljs-type">NUMERIC</span>(<span class="hljs-number">17</span>,<span class="hljs-number">2</span>) <span class="hljs-keyword">NOT NULL</span>,
  product_id    <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>,
  quantity      <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>,
  junk          <span class="hljs-type">CHAR</span>(<span class="hljs-number">200</span>),
  <span class="hljs-keyword">CONSTRAINT</span> sales_pk     
     <span class="hljs-keyword">PRIMARY KEY</span> (sale_id),
  <span class="hljs-keyword">CONSTRAINT</span> sales_emp_fk 
     <span class="hljs-keyword">FOREIGN KEY</span>          (subsidiary_id, employee_id)
      <span class="hljs-keyword">REFERENCES</span> employees(subsidiary_id, employee_id)
);
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">INSERT INTO</span> sales (sale_id
                 , subsidiary_id, employee_id
                 , sale_date, eur_value
                 , product_id, quantity
                 , junk)
<span class="hljs-keyword">SELECT</span> data.<span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> (
       <span class="hljs-keyword">SELECT</span> ((e.subsidiary_id <span class="hljs-operator">*</span> <span class="hljs-number">10001</span> <span class="hljs-operator">+</span> e.employee_id) <span class="hljs-operator">*</span> <span class="hljs-number">1801</span>) <span class="hljs-operator">+</span> gen.n <span class="hljs-keyword">AS</span> sale_id
            , e.subsidiary_id, e.employee_id
            , <span class="hljs-type">DATE</span>(<span class="hljs-string">&#x27;now&#x27;</span>, <span class="hljs-string">&#x27;-&#x27;</span> <span class="hljs-operator">||</span> (<span class="hljs-built_in">abs</span>(random()) <span class="hljs-operator">%</span> <span class="hljs-number">3650</span>) <span class="hljs-operator">||</span> <span class="hljs-string">&#x27; day&#x27;</span>) sale_date
            , (<span class="hljs-built_in">ABS</span>(RANDOM())<span class="hljs-operator">%</span><span class="hljs-number">9990</span>)<span class="hljs-operator">/</span><span class="hljs-number">100</span> <span class="hljs-keyword">AS</span> eur_value

            , <span class="hljs-built_in">ABS</span>(RANDOM())<span class="hljs-operator">%</span><span class="hljs-number">25</span><span class="hljs-operator">+</span><span class="hljs-number">1</span> product_id
            , <span class="hljs-built_in">ABS</span>(RANDOM())<span class="hljs-operator">%</span><span class="hljs-number">15</span><span class="hljs-operator">+</span><span class="hljs-number">1</span> quantity
            , <span class="hljs-string">&#x27;junk&#x27;</span>
         <span class="hljs-keyword">FROM</span> employees e
         <span class="hljs-keyword">JOIN</span> ( <span class="hljs-keyword">SELECT</span> generator_4k.n<span class="hljs-operator">+</span><span class="hljs-number">1</span> n
                  <span class="hljs-keyword">FROM</span> generator_4k
                 <span class="hljs-keyword">WHERE</span> generator_4k.n <span class="hljs-operator">&lt;</span> <span class="hljs-number">1800</span>
              ) gen
           <span class="hljs-keyword">ON</span> gen.n <span class="hljs-operator">&lt;</span> employee_id <span class="hljs-operator">/</span> <span class="hljs-number">5</span>
        <span class="hljs-keyword">WHERE</span> employee_id <span class="hljs-operator">%</span> <span class="hljs-number">7</span> <span class="hljs-operator">=</span> <span class="hljs-number">4</span>
       ) data
  <span class="hljs-keyword">WHERE</span> strftime(<span class="hljs-string">&#x27;%w&#x27;</span>, sale_date) <span class="hljs-keyword">NOT</span> <span class="hljs-keyword">IN</span> (<span class="hljs-number">0</span>,<span class="hljs-number">6</span>)
  <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date;
</code></pre>
<p>ملاحظات:</p>
<ul>
<li>تُدرَج الصفوف زمنياً لتعكس نمواً طبيعياً للجدول.</li>
<li>جزء صغير فقط من الموظفين لديهم مبيعات أصلاً.</li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:e,html:r};export{s as book,a as chapter,n as chapterTitle,c as default,e as headings,r as html,l as slug,p as title};
