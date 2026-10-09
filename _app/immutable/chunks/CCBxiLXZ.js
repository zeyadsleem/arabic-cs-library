const s="use-the-index-luke",a="sql-example-schema-sql-server-dml",n="SQL Server سكربتات المثال لـ «الإدخال والحذف والتحديث»",l="index",p="سكربتات SQL Server لـ«الإدراج والحذف والتحديث»",e=[],r=`<p>يحتوي هذا القسم على عبارتَي <code>create</code> و<code>insert</code> لتشغيل أمثلة <a href="/arabic-cs-library/book/use-the-index-luke/sql-dml/index">الفصل 8<em>تعديل البيانات</em></a> في قاعدة بيانات SQL Server. ولا يوجد سوى استعلام واحد يعرض جميع الأرقام الخاصة بأقسام الإدراج والحذف والتحديث.</p>
<pre><code class="language-sql"><span class="hljs-keyword">WITH</span> generate_series_1k(n) <span class="hljs-keyword">AS</span> (
   <span class="hljs-keyword">SELECT</span> <span class="hljs-number">0</span>
    <span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span>
   <span class="hljs-keyword">SELECT</span> n <span class="hljs-operator">+</span> <span class="hljs-number">1</span>
     <span class="hljs-keyword">FROM</span> generate_series_1k
    <span class="hljs-keyword">WHERE</span> N <span class="hljs-operator">+</span> <span class="hljs-number">1</span> <span class="hljs-operator">&lt;</span> <span class="hljs-number">10000</span>
), generate_series(n, n1, n2) <span class="hljs-keyword">AS</span> (
   <span class="hljs-keyword">SELECT</span> gs2.n <span class="hljs-operator">*</span> <span class="hljs-number">1000</span> <span class="hljs-operator">+</span> gs1.n, gs1.n, gs2.n
     <span class="hljs-keyword">FROM</span> generate_series_1k gs1, 
          generate_series_1k gs2
    <span class="hljs-keyword">WHERE</span> gs1.n <span class="hljs-operator">&lt;</span> <span class="hljs-number">1000</span>
)
<span class="hljs-keyword">SELECT</span> n id1
     , <span class="hljs-built_in">CAST</span>(<span class="hljs-built_in">CEILING</span>(<span class="hljs-built_in">ABS</span>(<span class="hljs-built_in">CAST</span>(NEWID() <span class="hljs-keyword">AS</span> <span class="hljs-type">BINARY</span>(<span class="hljs-number">6</span>)) <span class="hljs-operator">%</span> <span class="hljs-number">900000</span>))
       <span class="hljs-operator">+</span> <span class="hljs-number">100000</span> <span class="hljs-keyword">AS</span> <span class="hljs-type">numeric</span>) id2
     , <span class="hljs-built_in">CAST</span>(<span class="hljs-built_in">CEILING</span>(<span class="hljs-built_in">ABS</span>(<span class="hljs-built_in">CAST</span>(NEWID() <span class="hljs-keyword">AS</span> <span class="hljs-type">BINARY</span>(<span class="hljs-number">6</span>)) <span class="hljs-operator">%</span> <span class="hljs-number">900000</span>))
       <span class="hljs-operator">+</span> <span class="hljs-number">100000</span> <span class="hljs-keyword">AS</span> <span class="hljs-type">numeric</span>) id3
     , <span class="hljs-built_in">CAST</span>(<span class="hljs-built_in">CEILING</span>(<span class="hljs-built_in">ABS</span>(<span class="hljs-built_in">CAST</span>(NEWID() <span class="hljs-keyword">AS</span> <span class="hljs-type">BINARY</span>(<span class="hljs-number">6</span>)) <span class="hljs-operator">%</span> <span class="hljs-number">900000</span>))
       <span class="hljs-operator">+</span> <span class="hljs-number">100000</span> <span class="hljs-keyword">AS</span> <span class="hljs-type">numeric</span>) id4
     , <span class="hljs-built_in">CAST</span>(<span class="hljs-built_in">CEILING</span>(<span class="hljs-built_in">ABS</span>(<span class="hljs-built_in">CAST</span>(NEWID() <span class="hljs-keyword">AS</span> <span class="hljs-type">BINARY</span>(<span class="hljs-number">6</span>)) <span class="hljs-operator">%</span> <span class="hljs-number">900000</span>))
       <span class="hljs-operator">+</span> <span class="hljs-number">100000</span> <span class="hljs-keyword">AS</span> <span class="hljs-type">numeric</span>) id5
  <span class="hljs-keyword">INTO</span> scale_write_0
  <span class="hljs-keyword">FROM</span> generate_series
OPTION(MAXRECURSION <span class="hljs-number">32767</span>);
GO

<span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">INTO</span> scale_write_1
  <span class="hljs-keyword">FROM</span> scale_write_0;
GO

<span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">INTO</span> scale_write_2
  <span class="hljs-keyword">FROM</span> scale_write_0;
GO

<span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">INTO</span> scale_write_3
  <span class="hljs-keyword">FROM</span> scale_write_0;
GO

<span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">INTO</span> scale_write_4
  <span class="hljs-keyword">FROM</span> scale_write_0;
GO

<span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">INTO</span> scale_write_5
  <span class="hljs-keyword">FROM</span> scale_write_0;
GO

<span class="hljs-keyword">CREATE</span> INDEX scale_write_1_1 <span class="hljs-keyword">on</span> scale_write_1(id1);
GO

<span class="hljs-keyword">CREATE</span> INDEX scale_write_2_1 <span class="hljs-keyword">on</span> scale_write_2(id1);
GO
<span class="hljs-keyword">CREATE</span> INDEX scale_write_2_2 <span class="hljs-keyword">on</span> scale_write_2(id2, id1);
GO

<span class="hljs-keyword">CREATE</span> INDEX scale_write_3_1 <span class="hljs-keyword">on</span> scale_write_3(id1);
GO
<span class="hljs-keyword">CREATE</span> INDEX scale_write_3_2 <span class="hljs-keyword">on</span> scale_write_3(id2, id1);
GO
<span class="hljs-keyword">CREATE</span> INDEX scale_write_3_3 <span class="hljs-keyword">on</span> scale_write_3(id3, id2, id1);
GO

<span class="hljs-keyword">CREATE</span> INDEX scale_write_4_1 <span class="hljs-keyword">on</span> scale_write_4(id1);
GO
<span class="hljs-keyword">CREATE</span> INDEX scale_write_4_2 <span class="hljs-keyword">on</span> scale_write_4(id2, id1);
GO
<span class="hljs-keyword">CREATE</span> INDEX scale_write_4_3 <span class="hljs-keyword">on</span> scale_write_4(id3, id2, id1);
GO
<span class="hljs-keyword">CREATE</span> INDEX scale_write_4_4 <span class="hljs-keyword">on</span> scale_write_4(id4, id3, id2
                                             ,id1);
GO

<span class="hljs-keyword">CREATE</span> INDEX scale_write_5_1 <span class="hljs-keyword">on</span> scale_write_5(id1);
GO
<span class="hljs-keyword">CREATE</span> INDEX scale_write_5_2 <span class="hljs-keyword">on</span> scale_write_5(id2, id1);
GO
<span class="hljs-keyword">CREATE</span> INDEX scale_write_5_3 <span class="hljs-keyword">on</span> scale_write_5(id3, id2, id1);
GO
<span class="hljs-keyword">CREATE</span> INDEX scale_write_5_4 <span class="hljs-keyword">on</span> scale_write_5(id4, id3, id2
                                             ,id1);
GO
<span class="hljs-keyword">CREATE</span> INDEX scale_write_5_5 <span class="hljs-keyword">on</span> scale_write_5(id5, id4, id3
                                             ,id2, id1);
GO
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">PROCEDURE</span> 
run_insert(<span class="hljs-variable">@idxes</span> <span class="hljs-type">INT</span>, <span class="hljs-variable">@q</span> <span class="hljs-type">INT</span>, <span class="hljs-variable">@n</span> <span class="hljs-type">INT</span>, <span class="hljs-variable">@mode</span> <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">64</span>) <span class="hljs-keyword">OUT</span>)
<span class="hljs-keyword">AS</span> <span class="hljs-keyword">BEGIN</span>
<span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@r2</span>  <span class="hljs-type">INT</span> <span class="hljs-operator">=</span> <span class="hljs-built_in">CEILING</span>(rand() <span class="hljs-operator">*</span> <span class="hljs-number">9000000</span>)<span class="hljs-operator">+</span><span class="hljs-number">1000000</span>;
<span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@r3</span>  <span class="hljs-type">INT</span> <span class="hljs-operator">=</span> <span class="hljs-built_in">CEILING</span>(rand() <span class="hljs-operator">*</span> <span class="hljs-number">9000000</span>)<span class="hljs-operator">+</span><span class="hljs-number">1000000</span>;
<span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@r4</span>  <span class="hljs-type">INT</span> <span class="hljs-operator">=</span> <span class="hljs-built_in">CEILING</span>(rand() <span class="hljs-operator">*</span> <span class="hljs-number">9000000</span>)<span class="hljs-operator">+</span><span class="hljs-number">1000000</span>;
<span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@r5</span>  <span class="hljs-type">INT</span> <span class="hljs-operator">=</span> <span class="hljs-built_in">CEILING</span>(rand() <span class="hljs-operator">*</span> <span class="hljs-number">9000000</span>)<span class="hljs-operator">+</span><span class="hljs-number">1000000</span>;
<span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@d1</span>  <span class="hljs-type">INT</span>;
  WHILE (<span class="hljs-variable">@n</span> <span class="hljs-operator">&gt;</span> <span class="hljs-number">0</span>) <span class="hljs-keyword">BEGIN</span>
  <span class="hljs-keyword">SET</span> <span class="hljs-variable">@d1</span> <span class="hljs-operator">=</span> <span class="hljs-built_in">CEILING</span>(rand() <span class="hljs-operator">*</span> <span class="hljs-variable">@q</span>);
  IF <span class="hljs-variable">@idxes</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span> 
         <span class="hljs-keyword">INSERT INTO</span> scale_write_0 (id1, id2, id3, id4, id5)
                            <span class="hljs-keyword">VALUES</span> (<span class="hljs-variable">@d1</span>, <span class="hljs-variable">@r2</span>, <span class="hljs-variable">@r3</span>, <span class="hljs-variable">@r4</span>, <span class="hljs-variable">@r5</span>);
  <span class="hljs-keyword">ELSE</span> IF <span class="hljs-variable">@idxes</span> <span class="hljs-operator">=</span> <span class="hljs-number">1</span>
         <span class="hljs-keyword">INSERT INTO</span> scale_write_1 (id1, id2, id3, id4, id5)
                            <span class="hljs-keyword">VALUES</span> (<span class="hljs-variable">@d1</span>, <span class="hljs-variable">@r2</span>, <span class="hljs-variable">@r3</span>, <span class="hljs-variable">@r4</span>, <span class="hljs-variable">@r5</span>);
  <span class="hljs-keyword">ELSE</span> IF <span class="hljs-variable">@idxes</span> <span class="hljs-operator">=</span> <span class="hljs-number">2</span> 
         <span class="hljs-keyword">INSERT INTO</span> scale_write_2 (id1, id2, id3, id4, id5)
                            <span class="hljs-keyword">VALUES</span> (<span class="hljs-variable">@d1</span>, <span class="hljs-variable">@r2</span>, <span class="hljs-variable">@r3</span>, <span class="hljs-variable">@r4</span>, <span class="hljs-variable">@r5</span>);
  <span class="hljs-keyword">ELSE</span> IF <span class="hljs-variable">@idxes</span> <span class="hljs-operator">=</span> <span class="hljs-number">3</span>
         <span class="hljs-keyword">INSERT INTO</span> scale_write_3 (id1, id2, id3, id4, id5)
                            <span class="hljs-keyword">VALUES</span> (<span class="hljs-variable">@d1</span>, <span class="hljs-variable">@r2</span>, <span class="hljs-variable">@r3</span>, <span class="hljs-variable">@r4</span>, <span class="hljs-variable">@r5</span>);
  <span class="hljs-keyword">ELSE</span> IF <span class="hljs-variable">@idxes</span> <span class="hljs-operator">=</span> <span class="hljs-number">4</span>
         <span class="hljs-keyword">INSERT INTO</span> scale_write_4 (id1, id2, id3, id4, id5)
                            <span class="hljs-keyword">VALUES</span> (<span class="hljs-variable">@d1</span>, <span class="hljs-variable">@r2</span>, <span class="hljs-variable">@r3</span>, <span class="hljs-variable">@r4</span>, <span class="hljs-variable">@r5</span>);
  <span class="hljs-keyword">ELSE</span> IF <span class="hljs-variable">@idxes</span> <span class="hljs-operator">=</span> <span class="hljs-number">5</span> 
         <span class="hljs-keyword">INSERT INTO</span> scale_write_5 (id1, id2, id3, id4, id5)
                            <span class="hljs-keyword">VALUES</span> (<span class="hljs-variable">@d1</span>, <span class="hljs-variable">@r2</span>, <span class="hljs-variable">@r3</span>, <span class="hljs-variable">@r4</span>, <span class="hljs-variable">@r5</span>);
  <span class="hljs-keyword">SET</span> <span class="hljs-variable">@n</span> <span class="hljs-operator">=</span> <span class="hljs-variable">@n</span> <span class="hljs-operator">-</span> <span class="hljs-number">1</span>;
  <span class="hljs-keyword">END</span>;
  <span class="hljs-keyword">SET</span> <span class="hljs-variable">@mode</span> <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;insert&#x27;</span>;
<span class="hljs-keyword">END</span>;
go

<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">PROCEDURE</span>
run_delete(<span class="hljs-variable">@idxes</span> <span class="hljs-type">INT</span>, <span class="hljs-variable">@q</span> <span class="hljs-type">INT</span>, <span class="hljs-variable">@n</span> <span class="hljs-type">INT</span>, <span class="hljs-variable">@mode</span> <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">64</span>) <span class="hljs-keyword">OUT</span>)
<span class="hljs-keyword">AS</span> <span class="hljs-keyword">BEGIN</span>
<span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@cnt</span> <span class="hljs-type">INT</span> <span class="hljs-operator">=</span> <span class="hljs-variable">@n</span>;
<span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@aff</span> <span class="hljs-type">INT</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>;
<span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@d1</span>  <span class="hljs-type">INT</span>;
  WHILE (<span class="hljs-variable">@cnt</span> <span class="hljs-operator">&gt;</span><span class="hljs-number">0</span>) <span class="hljs-keyword">BEGIN</span>
  <span class="hljs-keyword">SET</span> <span class="hljs-variable">@d1</span> <span class="hljs-operator">=</span> <span class="hljs-built_in">CEILING</span>(rand() <span class="hljs-operator">*</span> <span class="hljs-variable">@q</span>) <span class="hljs-operator">+</span> <span class="hljs-variable">@q</span>;
  IF <span class="hljs-variable">@idxes</span> <span class="hljs-operator">=</span> <span class="hljs-number">1</span>  
         <span class="hljs-keyword">DELETE</span> <span class="hljs-keyword">FROM</span> scale_write_1 <span class="hljs-keyword">WHERE</span> id1 <span class="hljs-operator">=</span> <span class="hljs-variable">@d1</span>;
  <span class="hljs-keyword">ELSE</span> IF <span class="hljs-variable">@idxes</span> <span class="hljs-operator">=</span> <span class="hljs-number">2</span> 
         <span class="hljs-keyword">DELETE</span> <span class="hljs-keyword">FROM</span> scale_write_2 <span class="hljs-keyword">WHERE</span> id1 <span class="hljs-operator">=</span> <span class="hljs-variable">@d1</span>;
  <span class="hljs-keyword">ELSE</span> IF <span class="hljs-variable">@idxes</span> <span class="hljs-operator">=</span> <span class="hljs-number">3</span> 
         <span class="hljs-keyword">DELETE</span> <span class="hljs-keyword">FROM</span> scale_write_3 <span class="hljs-keyword">WHERE</span> id1 <span class="hljs-operator">=</span> <span class="hljs-variable">@d1</span>;
  <span class="hljs-keyword">ELSE</span> IF <span class="hljs-variable">@idxes</span> <span class="hljs-operator">=</span> <span class="hljs-number">4</span> 
         <span class="hljs-keyword">DELETE</span> <span class="hljs-keyword">FROM</span> scale_write_4 <span class="hljs-keyword">WHERE</span> id1 <span class="hljs-operator">=</span> <span class="hljs-variable">@d1</span>;
  <span class="hljs-keyword">ELSE</span> IF <span class="hljs-variable">@idxes</span> <span class="hljs-operator">=</span> <span class="hljs-number">5</span> 
         <span class="hljs-keyword">DELETE</span> <span class="hljs-keyword">FROM</span> scale_write_5 <span class="hljs-keyword">WHERE</span> id1 <span class="hljs-operator">=</span> <span class="hljs-variable">@d1</span>;
  <span class="hljs-keyword">SET</span> <span class="hljs-variable">@aff</span> <span class="hljs-operator">=</span> <span class="hljs-variable">@aff</span> <span class="hljs-operator">+</span> @<span class="hljs-variable">@ROWCOUNT</span>;
  <span class="hljs-keyword">SET</span> <span class="hljs-variable">@cnt</span> <span class="hljs-operator">=</span> <span class="hljs-variable">@cnt</span> <span class="hljs-operator">-</span> <span class="hljs-number">1</span>;
  <span class="hljs-keyword">END</span>;  
  <span class="hljs-keyword">SET</span> <span class="hljs-variable">@mode</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">CASE</span> <span class="hljs-keyword">WHEN</span> <span class="hljs-variable">@aff</span> <span class="hljs-operator">=</span> <span class="hljs-variable">@n</span> <span class="hljs-keyword">THEN</span> <span class="hljs-string">&#x27;delete&#x27;</span> <span class="hljs-keyword">ELSE</span> <span class="hljs-keyword">NULL</span> <span class="hljs-keyword">END</span>;
<span class="hljs-keyword">END</span>;

go

<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">PROCEDURE</span>
run_update_all(<span class="hljs-variable">@idxes</span> <span class="hljs-type">INT</span>, <span class="hljs-variable">@q</span> <span class="hljs-type">INT</span>, <span class="hljs-variable">@n</span> <span class="hljs-type">INT</span>, <span class="hljs-variable">@mode</span> <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">64</span>) <span class="hljs-keyword">OUT</span>)
<span class="hljs-keyword">AS</span> <span class="hljs-keyword">BEGIN</span>
<span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@r2</span>  <span class="hljs-type">INT</span> <span class="hljs-operator">=</span> <span class="hljs-built_in">CEILING</span>(rand() <span class="hljs-operator">*</span> <span class="hljs-number">9000000</span>)<span class="hljs-operator">+</span><span class="hljs-number">1000000</span>;
<span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@r3</span>  <span class="hljs-type">INT</span> <span class="hljs-operator">=</span> <span class="hljs-built_in">CEILING</span>(rand() <span class="hljs-operator">*</span> <span class="hljs-number">9000000</span>)<span class="hljs-operator">+</span><span class="hljs-number">1000000</span>;
<span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@r4</span>  <span class="hljs-type">INT</span> <span class="hljs-operator">=</span> <span class="hljs-built_in">CEILING</span>(rand() <span class="hljs-operator">*</span> <span class="hljs-number">9000000</span>)<span class="hljs-operator">+</span><span class="hljs-number">1000000</span>;
<span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@r5</span>  <span class="hljs-type">INT</span> <span class="hljs-operator">=</span> <span class="hljs-built_in">CEILING</span>(rand() <span class="hljs-operator">*</span> <span class="hljs-number">9000000</span>)<span class="hljs-operator">+</span><span class="hljs-number">1000000</span>;
<span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@cnt</span> <span class="hljs-type">INT</span> <span class="hljs-operator">=</span> <span class="hljs-variable">@n</span>;
<span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@aff</span> <span class="hljs-type">INT</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>;
<span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@d1</span>  <span class="hljs-type">INT</span>;
  WHILE (<span class="hljs-variable">@cnt</span> <span class="hljs-operator">&gt;</span><span class="hljs-number">0</span>) <span class="hljs-keyword">BEGIN</span>
    <span class="hljs-keyword">SET</span> <span class="hljs-variable">@d1</span> <span class="hljs-operator">=</span> <span class="hljs-built_in">CEILING</span>(rand() <span class="hljs-operator">*</span> <span class="hljs-variable">@q</span>) <span class="hljs-operator">+</span> <span class="hljs-number">2</span> <span class="hljs-operator">*</span> <span class="hljs-variable">@q</span>;
    IF <span class="hljs-variable">@idxes</span> <span class="hljs-operator">=</span> <span class="hljs-number">1</span> 
       <span class="hljs-keyword">UPDATE</span> scale_write_1
          <span class="hljs-keyword">SET</span> id2<span class="hljs-operator">=</span><span class="hljs-variable">@r2</span>, id3<span class="hljs-operator">=</span><span class="hljs-variable">@r3</span>, id4<span class="hljs-operator">=</span><span class="hljs-variable">@r4</span>, id5<span class="hljs-operator">=</span><span class="hljs-variable">@r5</span> <span class="hljs-keyword">WHERE</span> id1<span class="hljs-operator">=</span><span class="hljs-variable">@d1</span>;
    <span class="hljs-keyword">ELSE</span> IF <span class="hljs-variable">@idxes</span> <span class="hljs-operator">=</span> <span class="hljs-number">2</span> 
       <span class="hljs-keyword">UPDATE</span> scale_write_2
          <span class="hljs-keyword">SET</span> id2<span class="hljs-operator">=</span><span class="hljs-variable">@r2</span>, id3<span class="hljs-operator">=</span><span class="hljs-variable">@r3</span>, id4<span class="hljs-operator">=</span><span class="hljs-variable">@r4</span>, id5<span class="hljs-operator">=</span><span class="hljs-variable">@r5</span> <span class="hljs-keyword">WHERE</span> id1<span class="hljs-operator">=</span><span class="hljs-variable">@d1</span>;
    <span class="hljs-keyword">ELSE</span> IF <span class="hljs-variable">@idxes</span> <span class="hljs-operator">=</span> <span class="hljs-number">3</span> 
       <span class="hljs-keyword">UPDATE</span> scale_write_3
          <span class="hljs-keyword">SET</span> id2<span class="hljs-operator">=</span><span class="hljs-variable">@r2</span>, id3<span class="hljs-operator">=</span><span class="hljs-variable">@r3</span>, id4<span class="hljs-operator">=</span><span class="hljs-variable">@r4</span>, id5<span class="hljs-operator">=</span><span class="hljs-variable">@r5</span> <span class="hljs-keyword">WHERE</span> id1<span class="hljs-operator">=</span><span class="hljs-variable">@d1</span>;
    <span class="hljs-keyword">ELSE</span> IF <span class="hljs-variable">@idxes</span> <span class="hljs-operator">=</span> <span class="hljs-number">4</span> 
       <span class="hljs-keyword">UPDATE</span> scale_write_4
          <span class="hljs-keyword">SET</span> id2<span class="hljs-operator">=</span><span class="hljs-variable">@r2</span>, id3<span class="hljs-operator">=</span><span class="hljs-variable">@r3</span>, id4<span class="hljs-operator">=</span><span class="hljs-variable">@r4</span>, id5<span class="hljs-operator">=</span><span class="hljs-variable">@r5</span> <span class="hljs-keyword">WHERE</span> id1<span class="hljs-operator">=</span><span class="hljs-variable">@d1</span>;
    <span class="hljs-keyword">ELSE</span> IF <span class="hljs-variable">@idxes</span> <span class="hljs-operator">=</span> <span class="hljs-number">5</span> 
       <span class="hljs-keyword">UPDATE</span> scale_write_5
          <span class="hljs-keyword">SET</span> id2<span class="hljs-operator">=</span><span class="hljs-variable">@r2</span>, id3<span class="hljs-operator">=</span><span class="hljs-variable">@r3</span>, id4<span class="hljs-operator">=</span><span class="hljs-variable">@r4</span>, id5<span class="hljs-operator">=</span><span class="hljs-variable">@r5</span> <span class="hljs-keyword">WHERE</span> id1<span class="hljs-operator">=</span><span class="hljs-variable">@d1</span>;

    <span class="hljs-keyword">SET</span> <span class="hljs-variable">@aff</span> <span class="hljs-operator">=</span> <span class="hljs-variable">@aff</span> <span class="hljs-operator">+</span> @<span class="hljs-variable">@ROWCOUNT</span>;
    <span class="hljs-keyword">SET</span> <span class="hljs-variable">@cnt</span> <span class="hljs-operator">=</span> <span class="hljs-variable">@cnt</span> <span class="hljs-operator">-</span> <span class="hljs-number">1</span>;
  <span class="hljs-keyword">END</span>;  
  <span class="hljs-keyword">SET</span> <span class="hljs-variable">@mode</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">CASE</span> <span class="hljs-keyword">WHEN</span> <span class="hljs-variable">@aff</span> <span class="hljs-operator">=</span> <span class="hljs-variable">@n</span> <span class="hljs-keyword">THEN</span> <span class="hljs-string">&#x27;update all&#x27;</span>
                   <span class="hljs-keyword">ELSE</span> <span class="hljs-keyword">NULL</span> <span class="hljs-keyword">END</span>;
<span class="hljs-keyword">END</span>;
go

<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">PROCEDURE</span>
run_update_one(<span class="hljs-variable">@idxes</span> <span class="hljs-type">INT</span>, <span class="hljs-variable">@q</span> <span class="hljs-type">INT</span>, <span class="hljs-variable">@n</span> <span class="hljs-type">INT</span>, <span class="hljs-variable">@mode</span> <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">64</span>) <span class="hljs-keyword">OUT</span>)
<span class="hljs-keyword">AS</span> <span class="hljs-keyword">BEGIN</span>
<span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@r2</span> <span class="hljs-type">INT</span> <span class="hljs-operator">=</span> <span class="hljs-built_in">CEILING</span>(rand() <span class="hljs-operator">*</span> <span class="hljs-number">9000000</span>)<span class="hljs-operator">+</span><span class="hljs-number">1000000</span>;
<span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@cnt</span> <span class="hljs-type">INT</span> <span class="hljs-operator">=</span> <span class="hljs-variable">@n</span>;
<span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@aff</span> <span class="hljs-type">INT</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>;
<span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@d1</span>  <span class="hljs-type">INT</span>;
  WHILE (<span class="hljs-variable">@cnt</span> <span class="hljs-operator">&gt;</span><span class="hljs-number">0</span>) <span class="hljs-keyword">BEGIN</span>
    <span class="hljs-keyword">SET</span> <span class="hljs-variable">@d1</span> <span class="hljs-operator">=</span> <span class="hljs-built_in">CEILING</span>(rand() <span class="hljs-operator">*</span> <span class="hljs-variable">@q</span>) <span class="hljs-operator">+</span> <span class="hljs-number">3</span> <span class="hljs-operator">*</span> <span class="hljs-variable">@q</span>;
    IF <span class="hljs-variable">@idxes</span> <span class="hljs-operator">=</span> <span class="hljs-number">1</span> <span class="hljs-comment">-- no index updated</span>
           <span class="hljs-keyword">UPDATE</span> scale_write_1 <span class="hljs-keyword">SET</span> id2 <span class="hljs-operator">=</span> <span class="hljs-variable">@r2</span> <span class="hljs-keyword">WHERE</span> id1<span class="hljs-operator">=</span><span class="hljs-variable">@d1</span>;
    <span class="hljs-keyword">ELSE</span> IF <span class="hljs-variable">@idxes</span> <span class="hljs-operator">=</span> <span class="hljs-number">2</span> <span class="hljs-comment">-- one index updated</span>
           <span class="hljs-keyword">UPDATE</span> scale_write_2 <span class="hljs-keyword">SET</span> id2 <span class="hljs-operator">=</span> <span class="hljs-variable">@r2</span> <span class="hljs-keyword">WHERE</span> id1<span class="hljs-operator">=</span><span class="hljs-variable">@d1</span>;  
    <span class="hljs-keyword">ELSE</span> IF <span class="hljs-variable">@idxes</span> <span class="hljs-operator">=</span> <span class="hljs-number">3</span> <span class="hljs-comment">-- one index updated</span>
           <span class="hljs-keyword">UPDATE</span> scale_write_3 <span class="hljs-keyword">SET</span> id3 <span class="hljs-operator">=</span> <span class="hljs-variable">@r2</span> <span class="hljs-keyword">WHERE</span> id1<span class="hljs-operator">=</span><span class="hljs-variable">@d1</span>;
    <span class="hljs-keyword">ELSE</span> IF <span class="hljs-variable">@idxes</span> <span class="hljs-operator">=</span> <span class="hljs-number">4</span> <span class="hljs-comment">-- one index updated</span>
         <span class="hljs-keyword">UPDATE</span> scale_write_4 <span class="hljs-keyword">SET</span> id4 <span class="hljs-operator">=</span> <span class="hljs-variable">@r2</span> <span class="hljs-keyword">WHERE</span> id1<span class="hljs-operator">=</span><span class="hljs-variable">@d1</span>; 
    <span class="hljs-keyword">ELSE</span> IF <span class="hljs-variable">@idxes</span> <span class="hljs-operator">=</span> <span class="hljs-number">5</span> <span class="hljs-comment">-- one index updated</span>
         <span class="hljs-keyword">UPDATE</span> scale_write_5 <span class="hljs-keyword">SET</span> id5 <span class="hljs-operator">=</span> <span class="hljs-variable">@r2</span> <span class="hljs-keyword">WHERE</span> id1<span class="hljs-operator">=</span><span class="hljs-variable">@d1</span>;
    <span class="hljs-keyword">ELSE</span> <span class="hljs-keyword">SET</span> <span class="hljs-variable">@aff</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>;
    <span class="hljs-keyword">SET</span> <span class="hljs-variable">@mode</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">CASE</span> <span class="hljs-keyword">WHEN</span> @<span class="hljs-variable">@ROWCOUNT</span> <span class="hljs-operator">=</span> <span class="hljs-number">1</span> <span class="hljs-keyword">THEN</span> <span class="hljs-string">&#x27;update one&#x27;</span>
                     <span class="hljs-keyword">ELSE</span> <span class="hljs-keyword">NULL</span> <span class="hljs-keyword">END</span>;
    <span class="hljs-keyword">SET</span> <span class="hljs-variable">@aff</span> <span class="hljs-operator">=</span> <span class="hljs-variable">@aff</span> <span class="hljs-operator">+</span> @<span class="hljs-variable">@ROWCOUNT</span>;
    <span class="hljs-keyword">SET</span> <span class="hljs-variable">@cnt</span> <span class="hljs-operator">=</span> <span class="hljs-variable">@cnt</span> <span class="hljs-operator">-</span> <span class="hljs-number">1</span>;
  <span class="hljs-keyword">END</span>;  
  <span class="hljs-keyword">SET</span> <span class="hljs-variable">@mode</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">CASE</span> <span class="hljs-keyword">WHEN</span> <span class="hljs-variable">@aff</span> <span class="hljs-operator">=</span> <span class="hljs-variable">@n</span> <span class="hljs-keyword">THEN</span> <span class="hljs-string">&#x27;update one&#x27;</span>
                   <span class="hljs-keyword">ELSE</span> <span class="hljs-keyword">NULL</span> <span class="hljs-keyword">END</span>;
<span class="hljs-keyword">END</span>;
go

<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">PROCEDURE</span>
test_write_scalability (<span class="hljs-variable">@n</span> <span class="hljs-type">int</span>, <span class="hljs-variable">@inner</span> <span class="hljs-type">int</span>)
<span class="hljs-keyword">AS</span> <span class="hljs-keyword">BEGIN</span>
<span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@iter</span> <span class="hljs-type">INT</span>;
<span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@indxs</span>  <span class="hljs-type">INT</span>;
<span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@strt</span> DATETIME2;
<span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@dur</span>  <span class="hljs-type">NUMERIC</span>;
<span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@cmnd</span> <span class="hljs-type">INT</span>;
<span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@q</span>    <span class="hljs-type">INT</span>;
<span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@c1</span>   <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">64</span>);
<span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@table</span> <span class="hljs-keyword">TABLE</span>
( indxes  <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>,
  mode    <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">64</span>) <span class="hljs-keyword">NOT NULL</span>,
  seconds <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>,
  cnt     <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>);

  <span class="hljs-keyword">SELECT</span> <span class="hljs-variable">@q</span> <span class="hljs-operator">=</span> (<span class="hljs-built_in">max</span>(id1) <span class="hljs-operator">-</span> <span class="hljs-built_in">min</span>(id1))<span class="hljs-operator">/</span><span class="hljs-number">4</span> <span class="hljs-keyword">FROM</span> scale_write_1;
  <span class="hljs-keyword">SET</span> <span class="hljs-variable">@iter</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>;
  WHILE (<span class="hljs-variable">@iter</span> <span class="hljs-operator">&lt;</span> <span class="hljs-variable">@n</span>) <span class="hljs-keyword">BEGIN</span>
    <span class="hljs-keyword">SET</span> <span class="hljs-variable">@cmnd</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>;
    WHILE (<span class="hljs-variable">@cmnd</span> <span class="hljs-operator">&lt;=</span> <span class="hljs-number">3</span>) <span class="hljs-keyword">BEGIN</span>
      <span class="hljs-keyword">SET</span> <span class="hljs-variable">@indxs</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>;
      WHILE (<span class="hljs-variable">@indxs</span> <span class="hljs-operator">&lt;=</span> <span class="hljs-number">5</span>) <span class="hljs-keyword">BEGIN</span>
        <span class="hljs-keyword">SET</span> <span class="hljs-variable">@strt</span> <span class="hljs-operator">=</span> SYSDATETIME();
        IF (<span class="hljs-variable">@cmnd</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>)
           <span class="hljs-keyword">exec</span> [dbo].run_insert     <span class="hljs-variable">@indxs</span>, <span class="hljs-variable">@q</span>, <span class="hljs-variable">@inner</span>
                                   , <span class="hljs-variable">@mode</span><span class="hljs-operator">=</span><span class="hljs-variable">@c1</span> OUTPUT;
        <span class="hljs-keyword">ELSE</span> IF (<span class="hljs-variable">@cmnd</span> <span class="hljs-operator">=</span> <span class="hljs-number">1</span>) 
           <span class="hljs-keyword">exec</span> [dbo].run_update_all <span class="hljs-variable">@indxs</span>, <span class="hljs-variable">@q</span>, <span class="hljs-variable">@inner</span>
                                   , <span class="hljs-variable">@mode</span><span class="hljs-operator">=</span><span class="hljs-variable">@c1</span> OUTPUT;
        <span class="hljs-keyword">ELSE</span> IF (<span class="hljs-variable">@cmnd</span> <span class="hljs-operator">=</span> <span class="hljs-number">2</span>) 
           <span class="hljs-keyword">exec</span> [dbo].run_update_one <span class="hljs-variable">@indxs</span>, <span class="hljs-variable">@q</span>, <span class="hljs-variable">@inner</span>
                                   , <span class="hljs-variable">@mode</span><span class="hljs-operator">=</span><span class="hljs-variable">@c1</span> OUTPUT;
        <span class="hljs-keyword">ELSE</span> IF (<span class="hljs-variable">@cmnd</span> <span class="hljs-operator">=</span> <span class="hljs-number">3</span>) <span class="hljs-keyword">BEGIN</span>
           <span class="hljs-keyword">exec</span> [dbo].run_delete     <span class="hljs-variable">@indxs</span>, <span class="hljs-variable">@q</span>, <span class="hljs-variable">@inner</span>
                                   , <span class="hljs-variable">@mode</span><span class="hljs-operator">=</span><span class="hljs-variable">@c1</span> OUTPUT;
        <span class="hljs-keyword">END</span>;

        <span class="hljs-keyword">SET</span> <span class="hljs-variable">@dur</span> <span class="hljs-operator">=</span> datediff(microsecond, <span class="hljs-variable">@strt</span>, SYSDATETIME());
        IF <span class="hljs-variable">@c1</span> <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NOT NULL</span>
        <span class="hljs-keyword">BEGIN</span>
          <span class="hljs-keyword">INSERT INTO</span> <span class="hljs-variable">@table</span>
          <span class="hljs-keyword">VALUES</span> (<span class="hljs-variable">@indxs</span>, <span class="hljs-variable">@c1</span>, <span class="hljs-variable">@dur</span>, <span class="hljs-number">1</span>);
        <span class="hljs-keyword">END</span>;
        <span class="hljs-keyword">SET</span> <span class="hljs-variable">@indxs</span> <span class="hljs-operator">=</span> <span class="hljs-variable">@indxs</span> <span class="hljs-operator">+</span><span class="hljs-number">1</span>;
      <span class="hljs-keyword">END</span>;
      <span class="hljs-keyword">SET</span> <span class="hljs-variable">@cmnd</span> <span class="hljs-operator">=</span> <span class="hljs-variable">@cmnd</span> <span class="hljs-operator">+</span><span class="hljs-number">1</span>;
    <span class="hljs-keyword">END</span>;
    <span class="hljs-keyword">SET</span> <span class="hljs-variable">@iter</span> <span class="hljs-operator">=</span> <span class="hljs-variable">@iter</span> <span class="hljs-operator">+</span> <span class="hljs-number">1</span>;
  <span class="hljs-keyword">END</span>;
  <span class="hljs-keyword">SELECT</span> indxes, mode, seconds, cnt <span class="hljs-keyword">from</span> <span class="hljs-variable">@table</span>;
<span class="hljs-keyword">END</span>;
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">SET</span> NOCOUNT <span class="hljs-keyword">ON</span>;

<span class="hljs-keyword">CREATE TABLE</span> #res (
  indxes  <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>,
  mode    <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">64</span>) <span class="hljs-keyword">NOT NULL</span>,
  seconds <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>,
  cnt     <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>); 
GO

<span class="hljs-keyword">INSERT INTO</span> #res
<span class="hljs-keyword">EXEC</span> test_write_scalability <span class="hljs-number">1000</span>;
go

<span class="hljs-keyword">SELECT</span> indxes, [<span class="hljs-keyword">insert</span>], [<span class="hljs-keyword">delete</span>], [<span class="hljs-keyword">update</span> <span class="hljs-keyword">all</span>], [<span class="hljs-keyword">update</span> <span class="hljs-keyword">one</span>]
  <span class="hljs-keyword">FROM</span> (<span class="hljs-keyword">SELECT</span> indxes, mode, seconds<span class="hljs-operator">/</span><span class="hljs-number">1000000</span> seconds
          <span class="hljs-keyword">FROM</span> #res
       ) x
         PIVOT (<span class="hljs-built_in">AVG</span>(seconds)
           <span class="hljs-keyword">FOR</span> mode
            <span class="hljs-keyword">IN</span> ([<span class="hljs-keyword">insert</span>],[<span class="hljs-keyword">delete</span>],[<span class="hljs-keyword">update</span> <span class="hljs-keyword">all</span>],[<span class="hljs-keyword">update</span> <span class="hljs-keyword">one</span>]))
            <span class="hljs-keyword">AS</span> AvgExecTime
 <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> indxes;
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:e,html:r};export{s as book,a as chapter,n as chapterTitle,c as default,e as headings,r as html,l as slug,p as title};
