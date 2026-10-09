const s="use-the-index-luke",a="sql-example-schema-mysql-clustering-data",n="MySQL سكربتات المثال لـ «تجميع البيانات»",l="index",e="سكربتات أمثلة MySQL لـ«تجميع البيانات»",p=[{depth:2,id:"الجداول-المنظمة-بالفهرس-الفهارس-العنقودية",text:"الجداول المنظَّمة بالفهرس (الفهارس العنقودية)"}],r=`<p>يحتوي هذا القسم على شيفرة <code>create</code> و<code>insert</code> لتشغيل أمثلة <a href="/arabic-cs-library/book/use-the-index-luke/sql-clustering/index">الفصل 5<em>تجميع البيانات: القوة الثانية للفهرسة</em></a> في قاعدة بيانات MySQL.</p>
<h2 id="الجداول-المنظمة-بالفهرس-الفهارس-العنقودية">الجداول المنظَّمة بالفهرس (الفهارس العنقودية)</h2>
<p>ينشئ ما يلي جدول <code>SALES</code> ثانياً باستخدام محرّك InnoDB بحيث يُنشأ كفهرس عنقودي. ويُضاف فهرس ثانوي على العمود <code>SALE_DATE</code>.</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> sales_inno (
  sale_id       <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>,
  employee_id   <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>,
  subsidiary_id <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>,
  sale_date     <span class="hljs-type">DATE</span>   <span class="hljs-keyword">NOT NULL</span>,
  eur_value     <span class="hljs-type">NUMERIC</span>(<span class="hljs-number">17</span>,<span class="hljs-number">2</span>) <span class="hljs-keyword">NOT NULL</span>,
  junk          <span class="hljs-type">CHAR</span>(<span class="hljs-number">200</span>),
  <span class="hljs-keyword">CONSTRAINT</span> sales_pk     
     <span class="hljs-keyword">PRIMARY KEY</span> (sale_id)
) Engine<span class="hljs-operator">=</span>InnoDB;

<span class="hljs-keyword">INSERT INTO</span> sales_inno (sale_id
                      , subsidiary_id, employee_id
                      , sale_date, eur_value, junk)
<span class="hljs-keyword">SELECT</span> <span class="hljs-variable">@row</span> :<span class="hljs-operator">=</span> <span class="hljs-variable">@row</span> <span class="hljs-operator">+</span> <span class="hljs-number">1</span> sale_id
     , data.<span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> (
       <span class="hljs-keyword">SELECT</span> e.subsidiary_id, e.employee_id
            , CURDATE() <span class="hljs-operator">-</span> <span class="hljs-type">INTERVAL</span> (RAND(<span class="hljs-number">0</span>)<span class="hljs-operator">*</span><span class="hljs-number">3650</span>) <span class="hljs-keyword">DAY</span> sale_date
            , <span class="hljs-keyword">TRUNCATE</span>(RAND(<span class="hljs-number">1</span>)<span class="hljs-operator">*</span><span class="hljs-number">99.90</span><span class="hljs-operator">+</span><span class="hljs-number">0.1</span>,<span class="hljs-number">2</span>) eur_value
            , <span class="hljs-string">&#x27;junk&#x27;</span>
         <span class="hljs-keyword">FROM</span> employees e
            , ( <span class="hljs-keyword">SELECT</span> generator_4k.n<span class="hljs-operator">+</span><span class="hljs-number">1</span> n
                  <span class="hljs-keyword">FROM</span> generator_4k
                 <span class="hljs-keyword">WHERE</span> generator_4k.n <span class="hljs-operator">&lt;</span> <span class="hljs-number">1800</span>
              ) gen
        <span class="hljs-keyword">WHERE</span> <span class="hljs-built_in">MOD</span>(employee_id, <span class="hljs-number">7</span>) <span class="hljs-operator">=</span> <span class="hljs-number">4</span>
          <span class="hljs-keyword">AND</span> gen.n <span class="hljs-operator">&lt;</span> employee_id <span class="hljs-operator">/</span> <span class="hljs-number">5</span>
        <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date
       ) data, (<span class="hljs-keyword">SELECT</span> <span class="hljs-variable">@row</span> :<span class="hljs-operator">=</span> <span class="hljs-number">0</span>) init
  <span class="hljs-keyword">WHERE</span> DAYOFWEEK(sale_date) <span class="hljs-keyword">NOT</span> <span class="hljs-keyword">IN</span> (<span class="hljs-number">1</span>,<span class="hljs-number">7</span>);

<span class="hljs-keyword">CREATE</span> INDEX sales_inno_dt <span class="hljs-keyword">ON</span> sales_inno (sale_date);
</code></pre>
<p>لاحظ عبارة «Using Index» الدالة على مسح الفهرس فقط:</p>
<pre><code>EXPLAIN
 SELECT sale_id 
   FROM sales_inno
  WHERE sale_date = ?;

+----+------------+------+---------------+------+-------------+
| id | table      | type | key           | rows | Extra       |
+----+------------+------+---------------+------+-------------+
|  1 | sales_inno | ref  | sales_inno_dt |  301 | Using index |
+----+------------+------+---------------+------+-------------+
</code></pre>
`,o={book:s,chapter:a,chapterTitle:n,slug:l,title:e,headings:p,html:r};export{s as book,a as chapter,n as chapterTitle,o as default,p as headings,r as html,l as slug,e as title};
