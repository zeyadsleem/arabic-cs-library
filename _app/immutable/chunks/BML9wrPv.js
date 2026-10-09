const s="use-the-index-luke",a="sql-example-schema-db2-join",n="Db2 (LUW) سكربتات المثال لـ «عملية الوصل»",p="index",l="سكربتات أمثلة Db2 (LUW) لـ«عملية الربط»",e=[],c=`<p>يحتوي هذا القسم على عبارتَي <code>create</code> و<code>insert</code> لتشغيل أمثلة <a href="/arabic-cs-library/book/use-the-index-luke/sql-join/index">الفصل 4<em>عملية الربط</em></a> في قاعدة بيانات IBM Db2 (LUW).</p>
<pre><code class="language-sql"><span class="hljs-comment">--#SET TERMINATOR ;</span>

<span class="hljs-comment">-- Disable autocommit</span>
<span class="hljs-keyword">UPDATE</span> COMMAND OPTIONS <span class="hljs-keyword">USING</span> C OFF;

<span class="hljs-keyword">CREATE TABLE</span> sales (
  sale_id       <span class="hljs-type">NUMERIC</span>(<span class="hljs-number">10</span>,<span class="hljs-number">0</span>) <span class="hljs-keyword">NOT NULL</span>,
  employee_id   <span class="hljs-type">NUMERIC</span>(<span class="hljs-number">10</span>,<span class="hljs-number">0</span>) <span class="hljs-keyword">NOT NULL</span>,
  subsidiary_id <span class="hljs-type">NUMERIC</span>(<span class="hljs-number">10</span>,<span class="hljs-number">0</span>) <span class="hljs-keyword">NOT NULL</span>,
  sale_date     <span class="hljs-type">DATE</span>          <span class="hljs-keyword">NOT NULL</span>,
  eur_value     <span class="hljs-type">NUMERIC</span>(<span class="hljs-number">17</span>,<span class="hljs-number">2</span>) <span class="hljs-keyword">NOT NULL</span>,
  product_id    <span class="hljs-type">NUMERIC</span>(<span class="hljs-number">10</span>,<span class="hljs-number">0</span>) <span class="hljs-keyword">NOT NULL</span>,
  quantity      <span class="hljs-type">NUMERIC</span>(<span class="hljs-number">10</span>,<span class="hljs-number">0</span>) <span class="hljs-keyword">NOT NULL</span>,
  junk          <span class="hljs-type">CHAR</span>(<span class="hljs-number">200</span>),
  <span class="hljs-keyword">CONSTRAINT</span> sales_pk     
     <span class="hljs-keyword">PRIMARY KEY</span> (sale_id),
  <span class="hljs-keyword">CONSTRAINT</span> sales_emp_fk 
     <span class="hljs-keyword">FOREIGN KEY</span>          (subsidiary_id, employee_id)
      <span class="hljs-keyword">REFERENCES</span> employees(subsidiary_id, employee_id)
) <span class="hljs-keyword">NOT</span> LOGGED INITIALLY;

<span class="hljs-keyword">INSERT INTO</span> sales (sale_id
                 , subsidiary_id, employee_id
                 , sale_date, eur_value
                 , product_id, quantity
                 , junk)
<span class="hljs-keyword">WITH</span> generator (n) <span class="hljs-keyword">AS</span>
( <span class="hljs-keyword">SELECT</span> <span class="hljs-number">1</span> n   <span class="hljs-keyword">FROM</span> sysibm.sysdummy1
   <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span>
  <span class="hljs-keyword">SELECT</span> n <span class="hljs-operator">+</span> <span class="hljs-number">1</span> <span class="hljs-keyword">FROM</span> generator
   <span class="hljs-keyword">WHERE</span> n <span class="hljs-operator">&lt;</span> <span class="hljs-number">1800</span>
)
<span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">row_number</span>() <span class="hljs-keyword">OVER</span> (), data.<span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> (
       <span class="hljs-keyword">SELECT</span> e.subsidiary_id, e.employee_id
            , <span class="hljs-built_in">CURRENT_DATE</span> <span class="hljs-operator">-</span> <span class="hljs-built_in">floor</span>(rand() <span class="hljs-operator">*</span> <span class="hljs-number">365</span> <span class="hljs-operator">*</span> <span class="hljs-number">10</span> ) days sale_date
            , <span class="hljs-built_in">CAST</span>(rand()<span class="hljs-operator">*</span><span class="hljs-number">1000</span> <span class="hljs-keyword">AS</span> <span class="hljs-type">NUMERIC</span>(<span class="hljs-number">17</span>,<span class="hljs-number">2</span>)) eur_value
            , <span class="hljs-built_in">CAST</span>(rand()<span class="hljs-operator">*</span><span class="hljs-number">25</span> <span class="hljs-keyword">AS</span> <span class="hljs-type">NUMERIC</span>(<span class="hljs-number">2</span>,<span class="hljs-number">0</span>)) <span class="hljs-operator">+</span> <span class="hljs-number">1</span> product_id
            , <span class="hljs-built_in">CAST</span>(rand()<span class="hljs-operator">*</span><span class="hljs-number">5</span> <span class="hljs-keyword">AS</span> <span class="hljs-type">NUMERIC</span>(<span class="hljs-number">1</span>,<span class="hljs-number">0</span>)) <span class="hljs-operator">+</span> <span class="hljs-number">1</span> quantity
            , <span class="hljs-string">&#x27;junk&#x27;</span>
         <span class="hljs-keyword">FROM</span> employees e
            , generator gen
        <span class="hljs-keyword">WHERE</span> <span class="hljs-built_in">MOD</span>(employee_id, <span class="hljs-number">7</span>) <span class="hljs-operator">=</span> <span class="hljs-number">4</span>
          <span class="hljs-keyword">AND</span> gen.n <span class="hljs-operator">&lt;</span> employee_id <span class="hljs-operator">/</span> <span class="hljs-number">5</span>
        <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date
       ) data
 <span class="hljs-keyword">WHERE</span> dayofweek(sale_date) <span class="hljs-keyword">NOT</span> <span class="hljs-keyword">IN</span> (<span class="hljs-number">1</span>,<span class="hljs-number">7</span>);

<span class="hljs-keyword">COMMIT</span>;

<span class="hljs-keyword">CREATE</span> INDEX sales_sub_emp <span class="hljs-keyword">ON</span> sales (subsidiary_id, employee_id);

RUNSTATS <span class="hljs-keyword">ON</span> <span class="hljs-keyword">TABLE</span> sales;
</code></pre>
<p>ملاحظات:</p>
<p>التسجيل (logging) معطَّل (وهو ما تطلب تعطيل الإيداع التلقائي) للحفاظ على المساحة والوقت.</p>
<p>تُدرَج الصفوف زمنياً لتعكس نمواً طبيعياً للجدول.</p>
<p>جزء صغير فقط من الموظفين لديهم مبيعات أصلاً.</p>
<p>لا مبيعات أيام الأحد.</p>
<p><a href="https://www.ibm.com/docs/en/db2/11.5.x?topic=commands-runstats">قبل الإصدار 10</a> تحتاج Db2 إلى اسم جدول مؤهَّل بالكامل (بما في ذلك المخطط) من أجل <code>RUNSTATS</code>. وإذا ظهرت لك رسالة خطأ، فجرّب إضافة اسم المخطط. ويمكنك الاستعلام عن CURRENT_SCHEMA هكذا:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">current_schema</span> <span class="hljs-keyword">FROM</span> sysibm.sysdummy1;
</code></pre>
`,r={book:s,chapter:a,chapterTitle:n,slug:p,title:l,headings:e,html:c};export{s as book,a as chapter,n as chapterTitle,r as default,e as headings,c as html,p as slug,l as title};
