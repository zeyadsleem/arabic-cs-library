const s="use-the-index-luke",a="sql-example-schema-oracle-clustering-data",n="Oracle سكربتات المثال لـ «تجميع البيانات»",l="index",e="سكربتات أمثلة Oracle لـ«تجميع البيانات»",p=[{depth:2,id:"الجدول-المنظم-بالفهرس",text:"الجدول المنظَّم بالفهرس"}],r=`<p>يحتوي هذا القسم على عبارتَي <code>create</code> و<code>insert</code> لتشغيل أمثلة <a href="/arabic-cs-library/book/use-the-index-luke/sql-clustering/index">الفصل 5<em>تجميع البيانات: القوة الثانية للفهرسة</em></a> في قاعدة بيانات Oracle 11gR2.</p>
<h2 id="الجدول-المنظم-بالفهرس">الجدول المنظَّم بالفهرس</h2>
<p>ينشئ ما يلي جدول مبيعات ثانياً كجدول منظَّم بالفهرس. ويُنشأ فهرس ثانوي على <code>SALE_DATE</code>.</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> sales_iot (
  sale_id       NUMBER <span class="hljs-keyword">NOT NULL</span>,
  employee_id   NUMBER <span class="hljs-keyword">NOT NULL</span>,
  subsidiary_id NUMBER <span class="hljs-keyword">NOT NULL</span>,
  sale_date     <span class="hljs-type">DATE</span>   <span class="hljs-keyword">NOT NULL</span>,
  eur_value     NUMBER(<span class="hljs-number">17</span>,<span class="hljs-number">2</span>) <span class="hljs-keyword">NOT NULL</span>,
  junk          <span class="hljs-type">CHAR</span>(<span class="hljs-number">200</span>),
  <span class="hljs-keyword">CONSTRAINT</span> sales_iot_pk     
     <span class="hljs-keyword">PRIMARY KEY</span> (sale_id),
  <span class="hljs-keyword">CONSTRAINT</span> sales_iot_emp_fk 
     <span class="hljs-keyword">FOREIGN KEY</span>          (subsidiary_id, employee_id)
      <span class="hljs-keyword">REFERENCES</span> employees(subsidiary_id, employee_id)
) ORGANIZATION INDEX;

<span class="hljs-keyword">EXEC</span> DBMS_RANDOM.SEED(<span class="hljs-number">0</span>);

<span class="hljs-keyword">INSERT INTO</span> sales_iot (sale_id
                     , subsidiary_id, employee_id
                     , sale_date, eur_value, junk)
<span class="hljs-keyword">SELECT</span> rownum, data.<span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> (
       <span class="hljs-keyword">SELECT</span> e.subsidiary_id, e.employee_id
            , TRUNC (SYSDATE 
                   <span class="hljs-operator">-</span> DBMS_RANDOM.VALUE(<span class="hljs-number">0</span>, <span class="hljs-number">3650</span>)) sale_date
            , DBMS_RANDOM.VALUE(<span class="hljs-number">10</span>,<span class="hljs-number">10000</span>)<span class="hljs-operator">/</span><span class="hljs-number">100</span> eur_value
            , <span class="hljs-string">&#x27;junk&#x27;</span>
         <span class="hljs-keyword">FROM</span> employees e
            , ( <span class="hljs-keyword">SELECT</span> level n
                  <span class="hljs-keyword">FROM</span> dual
               <span class="hljs-keyword">CONNECT</span> <span class="hljs-keyword">BY</span> level <span class="hljs-operator">&lt;</span> <span class="hljs-number">1800</span>
              ) gen
        <span class="hljs-keyword">WHERE</span> <span class="hljs-built_in">MOD</span>(employee_id, <span class="hljs-number">7</span>) <span class="hljs-operator">=</span> <span class="hljs-number">4</span>
          <span class="hljs-keyword">AND</span> gen.n <span class="hljs-operator">&lt;</span> employee_id <span class="hljs-operator">/</span> <span class="hljs-number">5</span>
        <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date
       ) data;

<span class="hljs-keyword">CREATE</span> INDEX sales_iot_date <span class="hljs-keyword">ON</span> sales_iot (sale_date);

<span class="hljs-keyword">BEGIN</span>
     DBMS_STATS.GATHER_TABLE_STATS(<span class="hljs-keyword">null</span>, <span class="hljs-string">&#x27;SALES_IOT&#x27;</span>, 
     METHOD_OPT<span class="hljs-operator">=</span><span class="hljs-operator">&gt;</span><span class="hljs-string">&#x27;for all indexed columns&#x27;</span>, CASCADE <span class="hljs-operator">=</span><span class="hljs-operator">&gt;</span> <span class="hljs-literal">true</span>);
<span class="hljs-keyword">END</span>;
<span class="hljs-operator">/</span>
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:e,headings:p,html:r};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,r as html,l as slug,e as title};
