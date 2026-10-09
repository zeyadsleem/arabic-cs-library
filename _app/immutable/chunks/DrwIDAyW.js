const s="use-the-index-luke",a="sql-example-schema-postgresql-join",n="PostgreSQL سكربتات المثال لـ «عملية الوصل»",l="index",p="سكربتات أمثلة PostgreSQL لـ«عملية الربط»",e=[],c=`<p>يحتوي هذا القسم على شيفرة <code>CREATE</code> و<code>INSERT</code> لتشغيل أمثلة «<a href="/arabic-cs-library/book/use-the-index-luke/sql-join/index">معامل الربط</a>» في قاعدة بيانات PostgreSQL.</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> sales (
  sale_id       <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>,
  employee_id   <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>,
  subsidiary_id <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>,
  sale_date     <span class="hljs-type">DATE</span>    <span class="hljs-keyword">NOT NULL</span>,
  eur_value     <span class="hljs-type">NUMERIC</span>(<span class="hljs-number">17</span>,<span class="hljs-number">2</span>) <span class="hljs-keyword">NOT NULL</span>,
  product_id    <span class="hljs-type">BIGINT</span>  <span class="hljs-keyword">NOT NULL</span>,
  quantity      <span class="hljs-type">INTEGER</span> <span class="hljs-keyword">NOT NULL</span>,
  junk          <span class="hljs-type">CHAR</span>(<span class="hljs-number">200</span>),
  <span class="hljs-keyword">CONSTRAINT</span> sales_pk     
     <span class="hljs-keyword">PRIMARY KEY</span> (sale_id),
  <span class="hljs-keyword">CONSTRAINT</span> sales_emp_fk 
     <span class="hljs-keyword">FOREIGN KEY</span>          (subsidiary_id, employee_id)
      <span class="hljs-keyword">REFERENCES</span> employees(subsidiary_id, employee_id)
);

<span class="hljs-keyword">SELECT</span> SETSEED(<span class="hljs-number">0</span>);

<span class="hljs-keyword">INSERT INTO</span> sales (sale_id
                 , subsidiary_id, employee_id
                 , sale_date, eur_value
                 , product_id, quantity
                 , junk)
<span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">row_number</span>() <span class="hljs-keyword">OVER</span> (), data.<span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> (
       <span class="hljs-keyword">SELECT</span> e.subsidiary_id, e.employee_id
            , (<span class="hljs-built_in">CURRENT_DATE</span> <span class="hljs-operator">-</span> <span class="hljs-built_in">CAST</span>(RANDOM()<span class="hljs-operator">*</span><span class="hljs-number">3650</span> <span class="hljs-keyword">AS</span> <span class="hljs-type">NUMERIC</span>) <span class="hljs-operator">*</span> <span class="hljs-type">INTERVAL</span> <span class="hljs-string">&#x27;1 DAY&#x27;</span>) sale_date
            , <span class="hljs-built_in">CAST</span>(RANDOM()<span class="hljs-operator">*</span><span class="hljs-number">100000</span> <span class="hljs-keyword">AS</span> <span class="hljs-type">NUMERIC</span>)<span class="hljs-operator">/</span><span class="hljs-number">100</span> eur_value
            , <span class="hljs-built_in">CAST</span>(RANDOM()<span class="hljs-operator">*</span><span class="hljs-number">25</span> <span class="hljs-keyword">AS</span> <span class="hljs-type">NUMERIC</span>) <span class="hljs-operator">+</span> <span class="hljs-number">1</span> product_id
            , <span class="hljs-built_in">CAST</span>(RANDOM()<span class="hljs-operator">*</span><span class="hljs-number">5</span> <span class="hljs-keyword">AS</span> <span class="hljs-type">NUMERIC</span>) <span class="hljs-operator">+</span> <span class="hljs-number">1</span> quantity
            , <span class="hljs-string">&#x27;junk&#x27;</span>
         <span class="hljs-keyword">FROM</span> employees e
            , GENERATE_SERIES(<span class="hljs-number">1</span>, <span class="hljs-number">1800</span>) gen
        <span class="hljs-keyword">WHERE</span> <span class="hljs-built_in">MOD</span>(employee_id, <span class="hljs-number">7</span>) <span class="hljs-operator">=</span> <span class="hljs-number">4</span>
          <span class="hljs-keyword">AND</span> gen <span class="hljs-operator">&lt;</span> employee_id <span class="hljs-operator">/</span> <span class="hljs-number">5</span>
        <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date
       ) data
 <span class="hljs-keyword">WHERE</span> TO_CHAR(sale_date, <span class="hljs-string">&#x27;D&#x27;</span>) <span class="hljs-operator">&lt;&gt;</span> <span class="hljs-string">&#x27;1&#x27;</span>;

VACUUM ANALYZE sales;
</code></pre>
<p>ملاحظات:</p>
<ul>
<li>تُدرَج الصفوف زمنياً لتعكس نمواً طبيعياً للجدول.</li>
<li>جزء صغير فقط من الموظفين لديهم مبيعات أصلاً.</li>
</ul>
`,r={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:e,html:c};export{s as book,a as chapter,n as chapterTitle,r as default,e as headings,c as html,l as slug,p as title};
