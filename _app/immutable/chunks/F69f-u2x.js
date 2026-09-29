const s="use-the-index-luke",a="sql-example-schema-postgresql-dml",n="PostgreSQL Example Scripts for “Insert, Delete and Update”",p="index",l="سكربتات أمثلة PostgreSQL لـ«الإدراج والحذف والتحديث»",e=[],r=`<p>يحتوي هذا القسم على عبارتَي <code>create</code> و<code>insert</code> لتشغيل أمثلة <a href="/arabic-cs-library/book/use-the-index-luke/sql-dml/index">الفصل 8<em>تعديل البيانات</em></a> في قاعدة بيانات PostgreSQL. ولا يوجد سوى استعلام واحد يعرض جميع الأرقام الخاصة بأقسام الإدراج والحذف والتحديث.</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> scale_write_0 <span class="hljs-keyword">AS</span> (
<span class="hljs-keyword">SELECT</span> GENERATE_SERIES::<span class="hljs-type">numeric</span> id1
     , (random() <span class="hljs-operator">*</span> <span class="hljs-number">9000000</span>)::<span class="hljs-type">numeric</span> <span class="hljs-operator">+</span> <span class="hljs-number">10000000</span> id2
     , (random() <span class="hljs-operator">*</span> <span class="hljs-number">9000000</span>)::<span class="hljs-type">numeric</span> <span class="hljs-operator">+</span> <span class="hljs-number">10000000</span> id3
     , (random() <span class="hljs-operator">*</span> <span class="hljs-number">9000000</span>)::<span class="hljs-type">numeric</span> <span class="hljs-operator">+</span> <span class="hljs-number">10000000</span> id4
     , (random() <span class="hljs-operator">*</span> <span class="hljs-number">9000000</span>)::<span class="hljs-type">numeric</span> <span class="hljs-operator">+</span> <span class="hljs-number">10000000</span> id5
  <span class="hljs-keyword">FROM</span> GENERATE_SERIES(<span class="hljs-number">10000000</span>, <span class="hljs-number">19999999</span>)
);

<span class="hljs-keyword">CREATE TABLE</span> scale_write_1
<span class="hljs-keyword">AS</span> (<span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">from</span> scale_write_0);

<span class="hljs-keyword">CREATE TABLE</span> scale_write_2
<span class="hljs-keyword">AS</span> (<span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">from</span> scale_write_0);

<span class="hljs-keyword">CREATE TABLE</span> scale_write_3
<span class="hljs-keyword">AS</span> (<span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">from</span> scale_write_0);

<span class="hljs-keyword">CREATE TABLE</span> scale_write_4
<span class="hljs-keyword">AS</span> (<span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">from</span> scale_write_0);

<span class="hljs-keyword">CREATE TABLE</span> scale_write_5
<span class="hljs-keyword">AS</span> <span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">from</span> scale_write_0;

<span class="hljs-keyword">CREATE</span> INDEX scale_write_1_1 <span class="hljs-keyword">on</span> scale_write_1(id1);

<span class="hljs-keyword">CREATE</span> INDEX scale_write_2_1 <span class="hljs-keyword">on</span> scale_write_2(id1);
<span class="hljs-keyword">CREATE</span> INDEX scale_write_2_2 <span class="hljs-keyword">on</span> scale_write_2(id2, id1);

<span class="hljs-keyword">CREATE</span> INDEX scale_write_3_1 <span class="hljs-keyword">on</span> scale_write_3(id1);
<span class="hljs-keyword">CREATE</span> INDEX scale_write_3_2 <span class="hljs-keyword">on</span> scale_write_3(id2, id1);
<span class="hljs-keyword">CREATE</span> INDEX scale_write_3_3 <span class="hljs-keyword">on</span> scale_write_3(id3, id2, id1);

<span class="hljs-keyword">CREATE</span> INDEX scale_write_4_1 <span class="hljs-keyword">on</span> scale_write_4(id1);
<span class="hljs-keyword">CREATE</span> INDEX scale_write_4_2 <span class="hljs-keyword">on</span> scale_write_4(id2, id1);
<span class="hljs-keyword">CREATE</span> INDEX scale_write_4_3 <span class="hljs-keyword">on</span> scale_write_4(id3, id2, id1);
<span class="hljs-keyword">CREATE</span> INDEX scale_write_4_4 <span class="hljs-keyword">on</span> scale_write_4(id4, id3, id2
                                             ,id1);

<span class="hljs-keyword">CREATE</span> INDEX scale_write_5_1 <span class="hljs-keyword">on</span> scale_write_5(id1);
<span class="hljs-keyword">CREATE</span> INDEX scale_write_5_2 <span class="hljs-keyword">on</span> scale_write_5(id2, id1);
<span class="hljs-keyword">CREATE</span> INDEX scale_write_5_3 <span class="hljs-keyword">on</span> scale_write_5(id3, id2, id1);
<span class="hljs-keyword">CREATE</span> INDEX scale_write_5_4 <span class="hljs-keyword">on</span> scale_write_5(id4, id3, id2
                                             ,id1);
<span class="hljs-keyword">CREATE</span> INDEX scale_write_5_5 <span class="hljs-keyword">on</span> scale_write_5(id5, id4, id3
                                             ,id2, id1);
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">OR</span> REPLACE
<span class="hljs-keyword">FUNCTION</span> run_insert(idxes <span class="hljs-type">INT</span>, lb <span class="hljs-type">INT</span>, ub <span class="hljs-type">INT</span>, n <span class="hljs-type">INT</span>)
 <span class="hljs-keyword">RETURNS</span> <span class="hljs-type">VARCHAR</span> <span class="hljs-keyword">AS</span>
$$
<span class="hljs-keyword">DECLARE</span>
  rows_affected <span class="hljs-type">INT</span>;
  r2 <span class="hljs-type">INT</span>;
  r3 <span class="hljs-type">INT</span>;
  r4 <span class="hljs-type">INT</span>;
  r5 <span class="hljs-type">INT</span>;
  d1 <span class="hljs-type">INT</span>;
<span class="hljs-keyword">BEGIN</span>
  WHILE n <span class="hljs-operator">&gt;</span> <span class="hljs-number">0</span> LOOP
    d1 :<span class="hljs-operator">=</span> (random() <span class="hljs-operator">*</span> (ub<span class="hljs-operator">-</span>lb))::<span class="hljs-type">INT</span> <span class="hljs-operator">+</span> lb;
    r2 :<span class="hljs-operator">=</span> (random() <span class="hljs-operator">*</span> <span class="hljs-number">9000000</span>)::<span class="hljs-type">INT</span>;
    r3 :<span class="hljs-operator">=</span> (random() <span class="hljs-operator">*</span> <span class="hljs-number">9000000</span>)::<span class="hljs-type">INT</span>;
    r4 :<span class="hljs-operator">=</span> (random() <span class="hljs-operator">*</span> <span class="hljs-number">9000000</span>)::<span class="hljs-type">INT</span>;
    r5 :<span class="hljs-operator">=</span> (random() <span class="hljs-operator">*</span> <span class="hljs-number">9000000</span>)::<span class="hljs-type">INT</span>;
    <span class="hljs-keyword">CASE</span> idxes
    <span class="hljs-keyword">WHEN</span> <span class="hljs-number">0</span> <span class="hljs-keyword">THEN</span> 
           <span class="hljs-keyword">INSERT INTO</span> scale_write_0 (id1, id2, id3, id4, id5)
                              <span class="hljs-keyword">VALUES</span> ( d1,  r2,  r3,  r4,  r5);
    <span class="hljs-keyword">WHEN</span> <span class="hljs-number">1</span> <span class="hljs-keyword">THEN</span> 
           <span class="hljs-keyword">INSERT INTO</span> scale_write_1 (id1, id2, id3, id4, id5)
                              <span class="hljs-keyword">VALUES</span> ( d1,  r2,  r3,  r4,  r5);
    <span class="hljs-keyword">WHEN</span> <span class="hljs-number">2</span> <span class="hljs-keyword">THEN</span> 
           <span class="hljs-keyword">INSERT INTO</span> scale_write_2 (id1, id2, id3, id4, id5)
                              <span class="hljs-keyword">VALUES</span> ( d1,  r2,  r3,  r4,  r5);
    <span class="hljs-keyword">WHEN</span> <span class="hljs-number">3</span> <span class="hljs-keyword">THEN</span> 
           <span class="hljs-keyword">INSERT INTO</span> scale_write_3 (id1, id2, id3, id4, id5)
                              <span class="hljs-keyword">VALUES</span> ( d1,  r2,  r3,  r4,  r5);
    <span class="hljs-keyword">WHEN</span> <span class="hljs-number">4</span> <span class="hljs-keyword">THEN</span> 
           <span class="hljs-keyword">INSERT INTO</span> scale_write_4 (id1, id2, id3, id4, id5)
                              <span class="hljs-keyword">VALUES</span> ( d1,  r2,  r3,  r4,  r5);
    <span class="hljs-keyword">WHEN</span> <span class="hljs-number">5</span> <span class="hljs-keyword">THEN</span> 
           <span class="hljs-keyword">INSERT INTO</span> scale_write_5 (id1, id2, id3, id4, id5)
                              <span class="hljs-keyword">VALUES</span> ( d1,  r2,  r3,  r4,  r5);
    <span class="hljs-keyword">END</span> <span class="hljs-keyword">CASE</span>;
    n :<span class="hljs-operator">=</span> n <span class="hljs-operator">-</span> <span class="hljs-number">1</span>;
  <span class="hljs-keyword">END</span> LOOP;
  <span class="hljs-keyword">RETURN</span> <span class="hljs-string">&#x27;insert&#x27;</span>;
<span class="hljs-keyword">END</span>;
$$ <span class="hljs-keyword">LANGUAGE</span> plpgsql;

<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">OR</span> REPLACE
<span class="hljs-keyword">FUNCTION</span> run_delete(tbl <span class="hljs-type">INT</span>, lb <span class="hljs-type">INT</span>, ub <span class="hljs-type">INT</span>, n <span class="hljs-type">INT</span>)
 <span class="hljs-keyword">RETURNS</span> <span class="hljs-type">VARCHAR</span> <span class="hljs-keyword">AS</span> 
$$
<span class="hljs-keyword">DECLARE</span>
  rows_affected <span class="hljs-type">INT</span>;
  aff  <span class="hljs-type">INT</span> :<span class="hljs-operator">=</span> <span class="hljs-number">0</span>;
  d1   <span class="hljs-type">INT</span>;
  iter <span class="hljs-type">INT</span> :<span class="hljs-operator">=</span> n;
<span class="hljs-keyword">BEGIN</span>
  WHILE iter <span class="hljs-operator">&gt;</span> <span class="hljs-number">0</span> LOOP
    d1 :<span class="hljs-operator">=</span> (random() <span class="hljs-operator">*</span> (ub<span class="hljs-operator">-</span>lb))::<span class="hljs-type">INT</span> <span class="hljs-operator">+</span> lb;
    <span class="hljs-keyword">CASE</span> tbl
    <span class="hljs-keyword">WHEN</span> <span class="hljs-number">1</span> <span class="hljs-keyword">THEN</span> 
           <span class="hljs-keyword">DELETE</span> <span class="hljs-keyword">FROM</span> scale_write_1 <span class="hljs-keyword">WHERE</span> id1 <span class="hljs-operator">=</span> d1;
    <span class="hljs-keyword">WHEN</span> <span class="hljs-number">2</span> <span class="hljs-keyword">THEN</span> 
           <span class="hljs-keyword">DELETE</span> <span class="hljs-keyword">FROM</span> scale_write_2 <span class="hljs-keyword">WHERE</span> id1 <span class="hljs-operator">=</span> d1;
    <span class="hljs-keyword">WHEN</span> <span class="hljs-number">3</span> <span class="hljs-keyword">THEN</span> 
           <span class="hljs-keyword">DELETE</span> <span class="hljs-keyword">FROM</span> scale_write_3 <span class="hljs-keyword">WHERE</span> id1 <span class="hljs-operator">=</span> d1;
    <span class="hljs-keyword">WHEN</span> <span class="hljs-number">4</span> <span class="hljs-keyword">THEN</span> 
           <span class="hljs-keyword">DELETE</span> <span class="hljs-keyword">FROM</span> scale_write_4 <span class="hljs-keyword">WHERE</span> id1 <span class="hljs-operator">=</span> d1;
    <span class="hljs-keyword">WHEN</span> <span class="hljs-number">5</span> <span class="hljs-keyword">THEN</span> 
           <span class="hljs-keyword">DELETE</span> <span class="hljs-keyword">FROM</span> scale_write_5 <span class="hljs-keyword">WHERE</span> id1 <span class="hljs-operator">=</span> d1;
    <span class="hljs-keyword">ELSE</span> <span class="hljs-keyword">NULL</span>;
    <span class="hljs-keyword">END</span> <span class="hljs-keyword">CASE</span>;
    iter :<span class="hljs-operator">=</span> iter <span class="hljs-operator">-</span> <span class="hljs-number">1</span>;
    <span class="hljs-keyword">GET</span> DIAGNOSTICS rows_affected <span class="hljs-operator">=</span> ROW_COUNT;
    aff :<span class="hljs-operator">=</span> aff <span class="hljs-operator">+</span> rows_affected;
  <span class="hljs-keyword">END</span> LOOP;
  <span class="hljs-keyword">RETURN</span> <span class="hljs-keyword">CASE</span> <span class="hljs-keyword">WHEN</span> aff <span class="hljs-operator">=</span> n <span class="hljs-keyword">THEN</span> <span class="hljs-string">&#x27;delete&#x27;</span>
         <span class="hljs-keyword">ELSE</span> <span class="hljs-keyword">NULL</span> <span class="hljs-keyword">END</span>;
<span class="hljs-keyword">END</span>;
$$ <span class="hljs-keyword">LANGUAGE</span> plpgsql;

<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">OR</span> REPLACE
<span class="hljs-keyword">FUNCTION</span> run_update_all(tbl <span class="hljs-type">INT</span>, lb <span class="hljs-type">INT</span>, ub <span class="hljs-type">INT</span>, n <span class="hljs-type">INT</span>)
<span class="hljs-keyword">RETURNS</span> <span class="hljs-type">VARCHAR</span> <span class="hljs-keyword">AS</span>
$$
<span class="hljs-keyword">DECLARE</span>
  rows_affected <span class="hljs-type">INT</span>;
  r2  <span class="hljs-type">INT</span>;
  r3  <span class="hljs-type">INT</span>;
  r4  <span class="hljs-type">INT</span>;
  r5  <span class="hljs-type">INT</span>;
  d1  <span class="hljs-type">INT</span>;
  iter <span class="hljs-type">INT</span> :<span class="hljs-operator">=</span> n;
  aff  <span class="hljs-type">INT</span> :<span class="hljs-operator">=</span> <span class="hljs-number">0</span>;
<span class="hljs-keyword">BEGIN</span>
  WHILE iter <span class="hljs-operator">&gt;</span> <span class="hljs-number">0</span> LOOP
    d1 :<span class="hljs-operator">=</span> (random() <span class="hljs-operator">*</span> (ub<span class="hljs-operator">-</span>lb))::<span class="hljs-type">INT</span> <span class="hljs-operator">+</span> lb;
    r2 :<span class="hljs-operator">=</span> (random() <span class="hljs-operator">*</span> <span class="hljs-number">9000000</span>)::<span class="hljs-type">INT</span>;
    r3 :<span class="hljs-operator">=</span> (random() <span class="hljs-operator">*</span> <span class="hljs-number">9000000</span>)::<span class="hljs-type">INT</span>;
    r4 :<span class="hljs-operator">=</span> (random() <span class="hljs-operator">*</span> <span class="hljs-number">9000000</span>)::<span class="hljs-type">INT</span>;
    r5 :<span class="hljs-operator">=</span> (random() <span class="hljs-operator">*</span> <span class="hljs-number">9000000</span>)::<span class="hljs-type">INT</span>;
    <span class="hljs-keyword">CASE</span> tbl
    <span class="hljs-keyword">WHEN</span> <span class="hljs-number">1</span> <span class="hljs-keyword">THEN</span> 
           <span class="hljs-keyword">UPDATE</span> scale_write_1
              <span class="hljs-keyword">SET</span> id2 <span class="hljs-operator">=</span> r2, id3<span class="hljs-operator">=</span>r3, id4<span class="hljs-operator">=</span>r4, id5<span class="hljs-operator">=</span>r5 <span class="hljs-keyword">WHERE</span> id1<span class="hljs-operator">=</span>d1;
    <span class="hljs-keyword">WHEN</span> <span class="hljs-number">2</span> <span class="hljs-keyword">THEN</span>
           <span class="hljs-keyword">UPDATE</span> scale_write_2
              <span class="hljs-keyword">SET</span> id2 <span class="hljs-operator">=</span> r2, id3<span class="hljs-operator">=</span>r3, id4<span class="hljs-operator">=</span>r4, id5<span class="hljs-operator">=</span>r5 <span class="hljs-keyword">WHERE</span> id1<span class="hljs-operator">=</span>d1;
    <span class="hljs-keyword">WHEN</span> <span class="hljs-number">3</span> <span class="hljs-keyword">THEN</span> 
           <span class="hljs-keyword">UPDATE</span> scale_write_3
              <span class="hljs-keyword">SET</span> id2 <span class="hljs-operator">=</span> r2, id3<span class="hljs-operator">=</span>r3, id4<span class="hljs-operator">=</span>r4, id5<span class="hljs-operator">=</span>r5 <span class="hljs-keyword">WHERE</span> id1<span class="hljs-operator">=</span>d1; 
    <span class="hljs-keyword">WHEN</span> <span class="hljs-number">4</span> <span class="hljs-keyword">THEN</span> 
           <span class="hljs-keyword">UPDATE</span> scale_write_4
              <span class="hljs-keyword">SET</span> id2 <span class="hljs-operator">=</span> r2, id3<span class="hljs-operator">=</span>r3, id4<span class="hljs-operator">=</span>r4, id5<span class="hljs-operator">=</span>r5 <span class="hljs-keyword">WHERE</span> id1<span class="hljs-operator">=</span>d1; 
    <span class="hljs-keyword">WHEN</span> <span class="hljs-number">5</span> <span class="hljs-keyword">THEN</span> 
           <span class="hljs-keyword">UPDATE</span> scale_write_5
              <span class="hljs-keyword">SET</span> id2 <span class="hljs-operator">=</span> r2, id3<span class="hljs-operator">=</span>r3, id4<span class="hljs-operator">=</span>r4, id5<span class="hljs-operator">=</span>r5 <span class="hljs-keyword">WHERE</span> id1<span class="hljs-operator">=</span>d1;
    <span class="hljs-keyword">ELSE</span> <span class="hljs-keyword">NULL</span>;
    <span class="hljs-keyword">END</span> <span class="hljs-keyword">CASE</span>; 
    iter :<span class="hljs-operator">=</span> iter <span class="hljs-operator">-</span> <span class="hljs-number">1</span>;
    <span class="hljs-keyword">GET</span> DIAGNOSTICS rows_affected <span class="hljs-operator">=</span> ROW_COUNT;
    aff :<span class="hljs-operator">=</span> aff <span class="hljs-operator">+</span> rows_affected;
  <span class="hljs-keyword">END</span> LOOP;
  <span class="hljs-keyword">RETURN</span> <span class="hljs-keyword">CASE</span> <span class="hljs-keyword">WHEN</span> aff <span class="hljs-operator">=</span> n <span class="hljs-keyword">THEN</span> <span class="hljs-string">&#x27;update all&#x27;</span>
         <span class="hljs-keyword">ELSE</span> <span class="hljs-keyword">NULL</span> <span class="hljs-keyword">END</span>;
<span class="hljs-keyword">END</span>;
$$ <span class="hljs-keyword">LANGUAGE</span> plpgsql;

<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">OR</span> REPLACE
<span class="hljs-keyword">FUNCTION</span> run_update_one(tbl <span class="hljs-type">INT</span>, lb <span class="hljs-type">INT</span>, ub <span class="hljs-type">INT</span>, n <span class="hljs-type">INT</span>)
<span class="hljs-keyword">RETURNS</span> <span class="hljs-type">VARCHAR</span> <span class="hljs-keyword">AS</span>
$$
<span class="hljs-keyword">DECLARE</span>
  rows_affected <span class="hljs-type">INT</span>;
  r  <span class="hljs-type">INT</span>;
  d1 <span class="hljs-type">INT</span>;
  aff  <span class="hljs-type">INT</span> :<span class="hljs-operator">=</span> <span class="hljs-number">0</span>;
  iter <span class="hljs-type">INT</span> :<span class="hljs-operator">=</span> n;
<span class="hljs-keyword">BEGIN</span>
  WHILE iter <span class="hljs-operator">&gt;</span> <span class="hljs-number">0</span> LOOP
    d1 :<span class="hljs-operator">=</span> (random() <span class="hljs-operator">*</span> (ub<span class="hljs-operator">-</span>lb))::<span class="hljs-type">INT</span> <span class="hljs-operator">+</span> lb;
    r  :<span class="hljs-operator">=</span> (random() <span class="hljs-operator">*</span> <span class="hljs-number">9000000</span>)::<span class="hljs-type">INT</span>;
    <span class="hljs-keyword">CASE</span> tbl
    <span class="hljs-keyword">WHEN</span> <span class="hljs-number">1</span> <span class="hljs-keyword">THEN</span> <span class="hljs-comment">-- no index updated</span>
           <span class="hljs-keyword">UPDATE</span> scale_write_1 <span class="hljs-keyword">SET</span> id2 <span class="hljs-operator">=</span> r <span class="hljs-keyword">WHERE</span> id1<span class="hljs-operator">=</span>d1;
    <span class="hljs-keyword">WHEN</span> <span class="hljs-number">2</span> <span class="hljs-keyword">THEN</span> <span class="hljs-comment">-- one index updated</span>
           <span class="hljs-keyword">UPDATE</span> scale_write_2 <span class="hljs-keyword">SET</span> id2 <span class="hljs-operator">=</span> r <span class="hljs-keyword">WHERE</span> id1<span class="hljs-operator">=</span>d1;
    <span class="hljs-keyword">WHEN</span> <span class="hljs-number">3</span> <span class="hljs-keyword">THEN</span> <span class="hljs-comment">-- one index updated</span>
           <span class="hljs-keyword">UPDATE</span> scale_write_3 <span class="hljs-keyword">SET</span> id3 <span class="hljs-operator">=</span> r <span class="hljs-keyword">WHERE</span> id1<span class="hljs-operator">=</span>d1;
    <span class="hljs-keyword">WHEN</span> <span class="hljs-number">4</span> <span class="hljs-keyword">THEN</span> <span class="hljs-comment">-- one index updated</span>
           <span class="hljs-keyword">UPDATE</span> scale_write_4 <span class="hljs-keyword">SET</span> id4 <span class="hljs-operator">=</span> r <span class="hljs-keyword">WHERE</span> id1<span class="hljs-operator">=</span>d1;
    <span class="hljs-keyword">WHEN</span> <span class="hljs-number">5</span> <span class="hljs-keyword">THEN</span> <span class="hljs-comment">-- one index updated</span>
           <span class="hljs-keyword">UPDATE</span> scale_write_5 <span class="hljs-keyword">SET</span> id5 <span class="hljs-operator">=</span> r <span class="hljs-keyword">WHERE</span> id1<span class="hljs-operator">=</span>d1;
    <span class="hljs-keyword">ELSE</span> <span class="hljs-keyword">NULL</span>;
    <span class="hljs-keyword">END</span> <span class="hljs-keyword">CASE</span>;
    iter :<span class="hljs-operator">=</span> iter <span class="hljs-operator">-</span> <span class="hljs-number">1</span>;
    <span class="hljs-keyword">GET</span> DIAGNOSTICS rows_affected <span class="hljs-operator">=</span> ROW_COUNT;
    aff :<span class="hljs-operator">=</span> aff <span class="hljs-operator">+</span> rows_affected;
  <span class="hljs-keyword">END</span> LOOP;
  <span class="hljs-keyword">RETURN</span> <span class="hljs-keyword">CASE</span> <span class="hljs-keyword">WHEN</span> aff <span class="hljs-operator">=</span> n <span class="hljs-keyword">THEN</span> <span class="hljs-string">&#x27;update one&#x27;</span>
         <span class="hljs-keyword">ELSE</span> <span class="hljs-keyword">NULL</span> <span class="hljs-keyword">END</span>;
<span class="hljs-keyword">END</span>;
$$ <span class="hljs-keyword">LANGUAGE</span> plpgsql;

<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">OR</span> REPLACE
<span class="hljs-keyword">FUNCTION</span> test_write_scalability (n <span class="hljs-type">INT</span>)
 <span class="hljs-keyword">RETURNS</span> SETOF RECORD <span class="hljs-keyword">AS</span>
$$
<span class="hljs-keyword">DECLARE</span>
  rec  RECORD;
  strt <span class="hljs-type">TIMESTAMP</span>;
  mode <span class="hljs-type">VARCHAR</span>;
  cmnd <span class="hljs-type">INT</span>;
  q    <span class="hljs-type">INT</span>;
  lb   <span class="hljs-type">INT</span>;
  alb  <span class="hljs-type">INT</span>;
  iter <span class="hljs-type">INT</span>;
  idxs <span class="hljs-type">INT</span>;
<span class="hljs-keyword">BEGIN</span>
  <span class="hljs-keyword">SELECT</span> ((<span class="hljs-built_in">max</span>(id1)<span class="hljs-operator">-</span><span class="hljs-built_in">min</span>(id1))<span class="hljs-operator">/</span><span class="hljs-number">4</span>)::<span class="hljs-type">INT</span>, <span class="hljs-built_in">min</span>(id1)::<span class="hljs-type">INT</span>
    <span class="hljs-keyword">INTO</span> q, alb
    <span class="hljs-keyword">FROM</span> scale_write_1;

  <span class="hljs-keyword">FOR</span> iter <span class="hljs-keyword">IN</span> <span class="hljs-number">1</span> .. n LOOP
    <span class="hljs-keyword">FOR</span> cmnd <span class="hljs-keyword">IN</span> <span class="hljs-number">0</span> .. <span class="hljs-number">3</span> LOOP
      <span class="hljs-keyword">FOR</span> idxs <span class="hljs-keyword">IN</span> <span class="hljs-number">0</span> .. <span class="hljs-number">5</span> LOOP
        lb   :<span class="hljs-operator">=</span> alb <span class="hljs-operator">+</span> cmnd<span class="hljs-operator">*</span>q;
        strt :<span class="hljs-operator">=</span> CLOCK_TIMESTAMP();
        mode :<span class="hljs-operator">=</span> 
          <span class="hljs-keyword">CASE</span> cmnd
          <span class="hljs-keyword">WHEN</span> <span class="hljs-number">0</span> <span class="hljs-keyword">THEN</span> run_insert    (idxs, lb, lb<span class="hljs-operator">+</span>q, <span class="hljs-number">1</span>)
          <span class="hljs-keyword">WHEN</span> <span class="hljs-number">1</span> <span class="hljs-keyword">THEN</span> run_update_one(idxs, lb, lb<span class="hljs-operator">+</span>q, <span class="hljs-number">1</span>)
          <span class="hljs-keyword">WHEN</span> <span class="hljs-number">2</span> <span class="hljs-keyword">THEN</span> run_delete    (idxs, lb, lb<span class="hljs-operator">+</span>q, <span class="hljs-number">1</span>)
          <span class="hljs-keyword">WHEN</span> <span class="hljs-number">3</span> <span class="hljs-keyword">THEN</span> run_update_all(idxs, lb, lb<span class="hljs-operator">+</span>q, <span class="hljs-number">1</span>)
          <span class="hljs-keyword">END</span>;

        IF mode <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NOT NULL</span> <span class="hljs-keyword">THEN</span>
           <span class="hljs-keyword">SELECT</span> <span class="hljs-keyword">INTO</span> rec
                  idxs, mode, (CLOCK_TIMESTAMP() <span class="hljs-operator">-</span> strt);
           <span class="hljs-keyword">RETURN</span> NEXT rec;
        <span class="hljs-keyword">END</span> IF;
      <span class="hljs-keyword">END</span> LOOP;
    <span class="hljs-keyword">END</span> LOOP;
  <span class="hljs-keyword">END</span> LOOP;
  <span class="hljs-keyword">RETURN</span>;
<span class="hljs-keyword">END</span>;
$$ <span class="hljs-keyword">LANGUAGE</span> plpgsql;
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> indxes
     , mode
     , <span class="hljs-built_in">AVG</span>(seconds)  seconds   
     , TO_CHAR (STDDEV(<span class="hljs-built_in">EXTRACT</span>(epoch <span class="hljs-keyword">FROM</span> seconds))
                <span class="hljs-operator">/</span> <span class="hljs-built_in">AVG</span>(<span class="hljs-built_in">EXTRACT</span>(epoch <span class="hljs-keyword">FROM</span> seconds))
                <span class="hljs-operator">*</span> <span class="hljs-number">100</span>
               , <span class="hljs-string">&#x27;999.9&#x27;</span>) std_dev_prc
  <span class="hljs-keyword">FROM</span> test_write_scalability(<span class="hljs-number">10</span>) 
    <span class="hljs-keyword">AS</span> (indxes <span class="hljs-type">INT</span>, mode <span class="hljs-type">VARCHAR</span>, seconds <span class="hljs-type">INTERVAL</span>)
 <span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> indxes, mode
 <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> mode, indxes;
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:p,title:l,headings:e,html:r};export{s as book,a as chapter,n as chapterTitle,c as default,e as headings,r as html,p as slug,l as title};
