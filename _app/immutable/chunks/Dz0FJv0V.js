const s="use-the-index-luke",a="sql-example-schema-sqlbase-where-clause",n="SQLBase سكربتات المثال لـ «بَند WHERE»",p="index",l="سكربتات أمثلة SQLBase لـ«جملة WHERE»",e=[{depth:2,id:"معامل-المساواة",text:"معامل المساواة"},{depth:3,id:"المفاتيح-البديلة",text:"المفاتيح البديلة"},{depth:3,id:"المفاتيح-المدمجة",text:"المفاتيح المُدمجة"},{depth:2,id:"الدوال",text:"الدوال"}],r=`<h2 id="معامل-المساواة">معامل المساواة</h2>
<h3 id="المفاتيح-البديلة">المفاتيح البديلة</h3>
<p>إنشاء جدول <code>EMPLOYEES</code> بألف صف.</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> employees (
   employee_id   <span class="hljs-type">INTEGER</span>       <span class="hljs-keyword">NOT NULL</span>,
   first_name    <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">200</span>) <span class="hljs-keyword">NOT NULL</span>,
   last_name     <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">200</span>) <span class="hljs-keyword">NOT NULL</span>,
   date_of_birth <span class="hljs-type">DATE</span>                  ,
   phone_number  <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">200</span>) <span class="hljs-keyword">NOT NULL</span>,
   junk          <span class="hljs-type">CHAR</span>(<span class="hljs-number">254</span>)             ,
   <span class="hljs-keyword">PRIMARY KEY</span> (employee_id)
);

<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">UNIQUE</span> INDEX employees_pk <span class="hljs-keyword">ON</span> employees(employee_id);

<span class="hljs-keyword">CREATE TABLE</span> generator_16 (
   n NUMBER <span class="hljs-keyword">NOT NULL</span>,
   <span class="hljs-keyword">PRIMARY KEY</span> (n)
);

<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">UNIQUE</span> INDEX generator_16_pk <span class="hljs-keyword">ON</span> generator_16 (n);

<span class="hljs-keyword">INSERT INTO</span> generator_16 <span class="hljs-keyword">VALUES</span> (<span class="hljs-number">0</span>);
<span class="hljs-keyword">INSERT INTO</span> generator_16 <span class="hljs-keyword">VALUES</span> (<span class="hljs-number">1</span>);
<span class="hljs-keyword">INSERT INTO</span> generator_16 <span class="hljs-keyword">VALUES</span> (<span class="hljs-number">2</span>);
<span class="hljs-keyword">INSERT INTO</span> generator_16 <span class="hljs-keyword">VALUES</span> (<span class="hljs-number">3</span>);
<span class="hljs-keyword">INSERT INTO</span> generator_16 <span class="hljs-keyword">VALUES</span> (<span class="hljs-number">4</span>);
<span class="hljs-keyword">INSERT INTO</span> generator_16 <span class="hljs-keyword">VALUES</span> (<span class="hljs-number">5</span>);
<span class="hljs-keyword">INSERT INTO</span> generator_16 <span class="hljs-keyword">VALUES</span> (<span class="hljs-number">6</span>);
<span class="hljs-keyword">INSERT INTO</span> generator_16 <span class="hljs-keyword">VALUES</span> (<span class="hljs-number">7</span>);
<span class="hljs-keyword">INSERT INTO</span> generator_16 <span class="hljs-keyword">VALUES</span> (<span class="hljs-number">8</span>);
<span class="hljs-keyword">INSERT INTO</span> generator_16 <span class="hljs-keyword">VALUES</span> (<span class="hljs-number">9</span>);
<span class="hljs-keyword">INSERT INTO</span> generator_16 <span class="hljs-keyword">VALUES</span> (<span class="hljs-number">10</span>);
<span class="hljs-keyword">INSERT INTO</span> generator_16 <span class="hljs-keyword">VALUES</span> (<span class="hljs-number">11</span>);
<span class="hljs-keyword">INSERT INTO</span> generator_16 <span class="hljs-keyword">VALUES</span> (<span class="hljs-number">12</span>);
<span class="hljs-keyword">INSERT INTO</span> generator_16 <span class="hljs-keyword">VALUES</span> (<span class="hljs-number">13</span>);
<span class="hljs-keyword">INSERT INTO</span> generator_16 <span class="hljs-keyword">VALUES</span> (<span class="hljs-number">14</span>);
<span class="hljs-keyword">INSERT INTO</span> generator_16 <span class="hljs-keyword">VALUES</span> (<span class="hljs-number">15</span>);

<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">VIEW</span> generator_256 (n)
<span class="hljs-keyword">AS</span> <span class="hljs-keyword">SELECT</span> ( ( hi.n <span class="hljs-operator">*</span> <span class="hljs-number">16</span> ) <span class="hljs-operator">+</span> lo.n ) <span class="hljs-keyword">AS</span> n
     <span class="hljs-keyword">FROM</span> generator_16 lo, generator_16 hi;

<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">VIEW</span> generator_4k (n)
<span class="hljs-keyword">AS</span> <span class="hljs-keyword">SELECT</span> ( ( hi.n <span class="hljs-operator">*</span> <span class="hljs-number">256</span> ) <span class="hljs-operator">+</span> lo.n ) <span class="hljs-keyword">AS</span> n
     <span class="hljs-keyword">FROM</span> generator_256 lo, generator_16 hi;

<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">VIEW</span> generator_64k (n)
<span class="hljs-keyword">AS</span> <span class="hljs-keyword">SELECT</span> ( ( hi.n <span class="hljs-operator">*</span> <span class="hljs-number">256</span> ) <span class="hljs-operator">+</span> lo.n ) <span class="hljs-keyword">AS</span> n
     <span class="hljs-keyword">FROM</span> generator_256 lo, generator_256 hi;

<span class="hljs-keyword">INSERT INTO</span> employees (employee_id,  first_name,
                       last_name,    date_of_birth, 
                       phone_number, junk)
<span class="hljs-keyword">SELECT</span> n <span class="hljs-operator">+</span><span class="hljs-number">1</span>,
       <span class="hljs-variable">@CHAR</span>(<span class="hljs-variable">@mod</span>(n, <span class="hljs-number">26</span>)<span class="hljs-operator">+</span><span class="hljs-number">65</span>)    <span class="hljs-operator">||</span>  <span class="hljs-variable">@CHAR</span>(<span class="hljs-variable">@mod</span>(<span class="hljs-variable">@microsecond</span>(<span class="hljs-variable">@NOW</span>), <span class="hljs-number">26</span>)<span class="hljs-operator">+</span><span class="hljs-number">97</span>)   <span class="hljs-operator">||</span> <span class="hljs-variable">@CHAR</span>(<span class="hljs-variable">@mod</span>(<span class="hljs-variable">@minute</span>(<span class="hljs-variable">@NOW</span>)<span class="hljs-operator">+</span>n, <span class="hljs-number">26</span>)<span class="hljs-operator">+</span><span class="hljs-number">97</span>),
       <span class="hljs-variable">@CHAR</span>(<span class="hljs-variable">@mod</span>(<span class="hljs-number">13</span><span class="hljs-operator">+</span>n, <span class="hljs-number">26</span>)<span class="hljs-operator">+</span><span class="hljs-number">65</span>) <span class="hljs-operator">||</span>  <span class="hljs-variable">@CHAR</span>(<span class="hljs-variable">@mod</span>(<span class="hljs-variable">@microsecond</span>(<span class="hljs-variable">@NOW</span>)<span class="hljs-operator">+</span><span class="hljs-number">7</span>, <span class="hljs-number">26</span>)<span class="hljs-operator">+</span><span class="hljs-number">97</span>) <span class="hljs-operator">||</span> <span class="hljs-variable">@CHAR</span>(<span class="hljs-variable">@mod</span>(<span class="hljs-variable">@minute</span>(<span class="hljs-variable">@NOW</span>)<span class="hljs-operator">+</span>n<span class="hljs-operator">+</span><span class="hljs-number">17</span>, <span class="hljs-number">26</span>)<span class="hljs-operator">+</span><span class="hljs-number">97</span>),
       SYSDATE <span class="hljs-operator">-</span> <span class="hljs-variable">@mod</span>(n<span class="hljs-operator">+</span><span class="hljs-variable">@MICROSECOND</span>(<span class="hljs-variable">@NOW</span>), <span class="hljs-number">40</span><span class="hljs-operator">*</span><span class="hljs-number">365</span>) <span class="hljs-operator">-</span> <span class="hljs-number">3650</span>,
       <span class="hljs-variable">@MOD</span>(<span class="hljs-variable">@MICROSECOND</span>(<span class="hljs-variable">@NOW</span>)<span class="hljs-operator">+</span>n, <span class="hljs-number">9000</span>) <span class="hljs-operator">+</span> <span class="hljs-number">1000</span>,
       <span class="hljs-string">&#x27;junk&#x27;</span>
  <span class="hljs-keyword">FROM</span> generator_4k
<span class="hljs-keyword">WHERE</span> n <span class="hljs-operator">&lt;</span> <span class="hljs-number">1000</span>;

<span class="hljs-keyword">UPDATE</span> employees 
   <span class="hljs-keyword">SET</span> first_name<span class="hljs-operator">=</span><span class="hljs-string">&#x27;MARKUS&#x27;</span>, 
       last_name<span class="hljs-operator">=</span><span class="hljs-string">&#x27;WINAND&#x27;</span>
 <span class="hljs-keyword">WHERE</span> employee_id<span class="hljs-operator">=</span><span class="hljs-number">123</span>;

<span class="hljs-keyword">UPDATE</span> STATISTICS <span class="hljs-keyword">ON</span> <span class="hljs-keyword">TABLE</span> employees;
<span class="hljs-keyword">UPDATE</span> STATISTICS <span class="hljs-keyword">ON</span> INDEX employees_pk;
</code></pre>
<p>ملاحظة:</p>
<ul>
<li>نستخدم 200 محرف لنكون في الجانب الآمن فيما يخص حد SQLBase لطول المفتاح (المجموع &lt; 255، بما في ذلك الكلفة الإضافية).</li>
</ul>
<h3 id="المفاتيح-المدمجة">المفاتيح المُدمجة</h3>
<pre><code class="language-sql"><span class="hljs-comment">-- add subsidiary_id and update existing records</span>
<span class="hljs-keyword">ALTER TABLE</span> employees <span class="hljs-keyword">ADD</span> subsidiary_id <span class="hljs-type">INTEGER</span>;
<span class="hljs-keyword">UPDATE</span>      employees <span class="hljs-keyword">SET</span> subsidiary_id <span class="hljs-operator">=</span> <span class="hljs-number">30</span>;
<span class="hljs-keyword">ALTER TABLE</span> employees MODIFY subsidiary_id <span class="hljs-keyword">NOT NULL</span>;

<span class="hljs-comment">-- change the PK</span>
\uFEFF<span class="hljs-keyword">ALTER TABLE</span> employees <span class="hljs-keyword">DROP</span> <span class="hljs-keyword">PRIMARY KEY</span>;
<span class="hljs-keyword">DROP</span> INDEX employees_pk;

<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">UNIQUE</span> INDEX employees_pk <span class="hljs-keyword">ON</span> employees (employee_id, subsidiary_id);
<span class="hljs-keyword">ALTER TABLE</span> employees <span class="hljs-keyword">PRIMARY KEY</span> (employee_id, subsidiary_id);

<span class="hljs-comment">-- generate more records (Very Big Company)</span>
<span class="hljs-keyword">INSERT INTO</span> employees (employee_id,  first_name,
                       last_name,    date_of_birth, 
                       phone_number, subsidiary_id, junk)
<span class="hljs-keyword">SELECT</span> n <span class="hljs-operator">+</span><span class="hljs-number">1</span>,
       <span class="hljs-variable">@CHAR</span>(<span class="hljs-variable">@mod</span>(n, <span class="hljs-number">26</span>)<span class="hljs-operator">+</span><span class="hljs-number">65</span>)    <span class="hljs-operator">||</span>  <span class="hljs-variable">@CHAR</span>(<span class="hljs-variable">@mod</span>(<span class="hljs-variable">@microsecond</span>(<span class="hljs-variable">@NOW</span>), <span class="hljs-number">26</span>)<span class="hljs-operator">+</span><span class="hljs-number">97</span>)   <span class="hljs-operator">||</span> <span class="hljs-variable">@CHAR</span>(<span class="hljs-variable">@mod</span>(<span class="hljs-variable">@minute</span>(<span class="hljs-variable">@NOW</span>)<span class="hljs-operator">+</span>n, <span class="hljs-number">26</span>)<span class="hljs-operator">+</span><span class="hljs-number">97</span>),
       <span class="hljs-variable">@CHAR</span>(<span class="hljs-variable">@mod</span>(<span class="hljs-number">13</span><span class="hljs-operator">+</span>n, <span class="hljs-number">26</span>)<span class="hljs-operator">+</span><span class="hljs-number">65</span>) <span class="hljs-operator">||</span>  <span class="hljs-variable">@CHAR</span>(<span class="hljs-variable">@mod</span>(<span class="hljs-variable">@microsecond</span>(<span class="hljs-variable">@NOW</span>)<span class="hljs-operator">+</span><span class="hljs-number">7</span>, <span class="hljs-number">26</span>)<span class="hljs-operator">+</span><span class="hljs-number">97</span>) <span class="hljs-operator">||</span> <span class="hljs-variable">@CHAR</span>(<span class="hljs-variable">@mod</span>(<span class="hljs-variable">@minute</span>(<span class="hljs-variable">@NOW</span>)<span class="hljs-operator">+</span>n<span class="hljs-operator">+</span><span class="hljs-number">17</span>, <span class="hljs-number">26</span>)<span class="hljs-operator">+</span><span class="hljs-number">97</span>),
       SYSDATE <span class="hljs-operator">-</span> <span class="hljs-variable">@mod</span>(n<span class="hljs-operator">+</span><span class="hljs-variable">@MICROSECOND</span>(<span class="hljs-variable">@NOW</span>), <span class="hljs-number">40</span><span class="hljs-operator">*</span><span class="hljs-number">365</span>) <span class="hljs-operator">-</span> <span class="hljs-number">3650</span>,
       <span class="hljs-variable">@MOD</span>(<span class="hljs-variable">@MICROSECOND</span>(<span class="hljs-variable">@NOW</span>)<span class="hljs-operator">+</span>n, <span class="hljs-number">9000</span>) <span class="hljs-operator">+</span> <span class="hljs-number">1000</span>,
       <span class="hljs-variable">@MOD</span>(<span class="hljs-variable">@SECOND</span>(<span class="hljs-variable">@NOW</span>)<span class="hljs-operator">+</span>n<span class="hljs-operator">/</span><span class="hljs-number">9000</span><span class="hljs-operator">*</span><span class="hljs-number">29</span>,<span class="hljs-number">29</span>),
       <span class="hljs-string">&#x27;junk&#x27;</span>
  <span class="hljs-keyword">FROM</span> generator_64k
<span class="hljs-keyword">WHERE</span> n <span class="hljs-operator">&lt;</span> <span class="hljs-number">9000</span>;

<span class="hljs-keyword">UPDATE</span> STATISTICS <span class="hljs-keyword">ON</span> <span class="hljs-keyword">TABLE</span> employees;
<span class="hljs-keyword">UPDATE</span> STATISTICS <span class="hljs-keyword">ON</span> INDEX employees_pk;
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX emp_sub_id <span class="hljs-keyword">ON</span> employees (subsidiary_id);
</code></pre>
<p>ومع أن ذلك يعطي أداءً جيداً، فالأفضل استخدام الفهرس الذي يدعم المفتاح الأساسي:</p>
<pre><code class="language-sql"><span class="hljs-comment">-- use tmp index to support the PK</span>
<span class="hljs-keyword">ALTER TABLE</span> employees <span class="hljs-keyword">DROP</span> <span class="hljs-keyword">PRIMARY KEY</span>;
<span class="hljs-keyword">DROP</span> INDEX employees_pk;

<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">UNIQUE</span> INDEX employees_pk <span class="hljs-keyword">ON</span> employees (subsidiary_id, employee_id);
<span class="hljs-keyword">ALTER TABLE</span> employees <span class="hljs-keyword">PRIMARY KEY</span> (subsidiary_id, employee_id);

<span class="hljs-keyword">DROP</span> INDEX emp_sub_id;

<span class="hljs-keyword">UPDATE</span> STATISTICS <span class="hljs-keyword">ON</span> INDEX employees_pk;
</code></pre>
<h2 id="الدوال">الدوال</h2>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX emp_name_up <span class="hljs-keyword">ON</span> employees (<span class="hljs-variable">@upper</span>(last_name));
</code></pre>
`,o={book:s,chapter:a,chapterTitle:n,slug:p,title:l,headings:e,html:r};export{s as book,a as chapter,n as chapterTitle,o as default,e as headings,r as html,p as slug,l as title};
