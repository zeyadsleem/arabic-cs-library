const s="use-the-index-luke",a="sql-example-schema-oracle-dml",n="Oracle سكربتات المثال لـ «الإدخال والحذف والتحديث»",l="index",p="سكربتات أمثلة Oracle لـ«الإدراج والحذف والتحديث»",r=[],e=`<p>يحتوي هذا القسم على عبارتَي <code>create</code> و<code>insert</code> لتشغيل أمثلة <a href="/arabic-cs-library/book/use-the-index-luke/sql-dml/index">الفصل 8<em>تعديل البيانات</em></a> في قاعدة بيانات Oracle. ولا يوجد سوى استعلام واحد يعرض جميع الأرقام الخاصة بأقسام الإدراج والحذف والتحديث.</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> scale_write_0 <span class="hljs-keyword">AS</span>
  <span class="hljs-keyword">WITH</span> generator <span class="hljs-keyword">AS</span> (
                     <span class="hljs-keyword">SELECT</span> <span class="hljs-comment">--+ materialize</span>
                            level n
                       <span class="hljs-keyword">FROM</span> DUAL
                    <span class="hljs-keyword">CONNECT</span> <span class="hljs-keyword">BY</span> level <span class="hljs-operator">&lt;=</span> <span class="hljs-number">10000</span>
) 
 <span class="hljs-keyword">SELECT</span> rownum id1
      , <span class="hljs-built_in">CEIL</span>(DBMS_RANDOM.VALUE(<span class="hljs-number">1000000</span>,<span class="hljs-number">9999999</span>)) id2
      , <span class="hljs-built_in">CEIL</span>(DBMS_RANDOM.VALUE(<span class="hljs-number">1000000</span>,<span class="hljs-number">9999999</span>)) id3
      , <span class="hljs-built_in">CEIL</span>(DBMS_RANDOM.VALUE(<span class="hljs-number">1000000</span>,<span class="hljs-number">9999999</span>)) id4
      , <span class="hljs-built_in">CEIL</span>(DBMS_RANDOM.VALUE(<span class="hljs-number">1000000</span>,<span class="hljs-number">9999999</span>)) id5
   <span class="hljs-keyword">FROM</span> generator, generator
  <span class="hljs-keyword">WHERE</span> rownum <span class="hljs-operator">&lt;=</span> <span class="hljs-number">10000000</span>;

<span class="hljs-keyword">CREATE TABLE</span> scale_write_1 <span class="hljs-keyword">AS</span>
<span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">from</span> scale_write_0;

<span class="hljs-keyword">CREATE TABLE</span> scale_write_2 <span class="hljs-keyword">AS</span>
<span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">from</span> scale_write_0;

<span class="hljs-keyword">CREATE TABLE</span> scale_write_3 <span class="hljs-keyword">AS</span>
<span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">from</span> scale_write_0;

<span class="hljs-keyword">CREATE TABLE</span> scale_write_4 <span class="hljs-keyword">AS</span>
<span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">from</span> scale_write_0;

<span class="hljs-keyword">CREATE TABLE</span> scale_write_5 <span class="hljs-keyword">AS</span>
<span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">from</span> scale_write_0;

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
                                            , id1);

<span class="hljs-keyword">CREATE</span> INDEX scale_write_5_1 <span class="hljs-keyword">on</span> scale_write_5(id1);
<span class="hljs-keyword">CREATE</span> INDEX scale_write_5_2 <span class="hljs-keyword">on</span> scale_write_5(id2, id1);
<span class="hljs-keyword">CREATE</span> INDEX scale_write_5_3 <span class="hljs-keyword">on</span> scale_write_5(id3, id2, id1);
<span class="hljs-keyword">CREATE</span> INDEX scale_write_5_4 <span class="hljs-keyword">on</span> scale_write_5(id4, id3, id2
                                           , id1);
<span class="hljs-keyword">CREATE</span> INDEX scale_write_5_5 <span class="hljs-keyword">on</span> scale_write_5(id5, id4, id3
                                           , id2, id1);

<span class="hljs-keyword">begin</span>
 DBMS_STATS.GATHER_TABLE_STATS(<span class="hljs-keyword">user</span>
                             , <span class="hljs-string">&#x27;SCALE_WRITE_0&#x27;</span>, cascade<span class="hljs-operator">=</span><span class="hljs-operator">&gt;</span><span class="hljs-literal">true</span>);
 DBMS_STATS.GATHER_TABLE_STATS(<span class="hljs-keyword">user</span>
                             , <span class="hljs-string">&#x27;SCALE_WRITE_1&#x27;</span>, cascade<span class="hljs-operator">=</span><span class="hljs-operator">&gt;</span><span class="hljs-literal">true</span>);
 DBMS_STATS.GATHER_TABLE_STATS(<span class="hljs-keyword">user</span>
                             , <span class="hljs-string">&#x27;SCALE_WRITE_2&#x27;</span>, cascade<span class="hljs-operator">=</span><span class="hljs-operator">&gt;</span><span class="hljs-literal">true</span>);
 DBMS_STATS.GATHER_TABLE_STATS(<span class="hljs-keyword">user</span>
                             , <span class="hljs-string">&#x27;SCALE_WRITE_3&#x27;</span>, cascade<span class="hljs-operator">=</span><span class="hljs-operator">&gt;</span><span class="hljs-literal">true</span>);
 DBMS_STATS.GATHER_TABLE_STATS(<span class="hljs-keyword">user</span>
                             , <span class="hljs-string">&#x27;SCALE_WRITE_4&#x27;</span>, cascade<span class="hljs-operator">=</span><span class="hljs-operator">&gt;</span><span class="hljs-literal">true</span>);
 DBMS_STATS.GATHER_TABLE_STATS(<span class="hljs-keyword">user</span>
                             , <span class="hljs-string">&#x27;SCALE_WRITE_5&#x27;</span>, cascade<span class="hljs-operator">=</span><span class="hljs-operator">&gt;</span><span class="hljs-literal">true</span>);
<span class="hljs-keyword">end</span>;
<span class="hljs-operator">/</span>
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">create</span> <span class="hljs-keyword">or</span> replace
PACKAGE test_write_scalability <span class="hljs-keyword">IS</span>
  TYPE piped_output <span class="hljs-keyword">IS</span>
             RECORD ( idxes   NUMBER
                    , cmnd    VARCHAR2(<span class="hljs-number">255</span>)
                    , seconds NUMBER
                    , id1     NUMBER);
  TYPE piped_output_table <span class="hljs-keyword">IS</span> <span class="hljs-keyword">TABLE</span> <span class="hljs-keyword">OF</span> piped_output;

  <span class="hljs-keyword">FUNCTION</span> run(n <span class="hljs-keyword">IN</span> number)
    <span class="hljs-keyword">RETURN</span> test_write_scalability.piped_output_table PIPELINED;
<span class="hljs-keyword">END</span>;

<span class="hljs-keyword">create</span> <span class="hljs-keyword">or</span> replace
PACKAGE BODY test_write_scalability
<span class="hljs-keyword">IS</span>
  TYPE tmp <span class="hljs-keyword">IS</span> <span class="hljs-keyword">TABLE</span> <span class="hljs-keyword">OF</span> piped_output INDEX <span class="hljs-keyword">BY</span> PLS_INTEGER;

<span class="hljs-keyword">FUNCTION</span> run_insert(tbl <span class="hljs-keyword">IN</span> NUMBER, d1 <span class="hljs-keyword">IN</span> NUMBER)
                    <span class="hljs-keyword">RETURN</span> VARCHAR2
<span class="hljs-keyword">AS</span>
  r2 NUMBER :<span class="hljs-operator">=</span> <span class="hljs-built_in">CEIL</span>(DBMS_RANDOM.VALUE(<span class="hljs-number">1000000</span>,<span class="hljs-number">9999999</span>));
  r3 NUMBER :<span class="hljs-operator">=</span> <span class="hljs-built_in">CEIL</span>(DBMS_RANDOM.VALUE(<span class="hljs-number">1000000</span>,<span class="hljs-number">9999999</span>));
  r4 NUMBER :<span class="hljs-operator">=</span> <span class="hljs-built_in">CEIL</span>(DBMS_RANDOM.VALUE(<span class="hljs-number">1000000</span>,<span class="hljs-number">9999999</span>));
  r5 NUMBER :<span class="hljs-operator">=</span> <span class="hljs-built_in">CEIL</span>(DBMS_RANDOM.VALUE(<span class="hljs-number">1000000</span>,<span class="hljs-number">9999999</span>));
<span class="hljs-keyword">BEGIN</span>
  <span class="hljs-keyword">CASE</span> tbl
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
  <span class="hljs-keyword">RETURN</span> <span class="hljs-string">&#x27;insert&#x27;</span>;
<span class="hljs-keyword">END</span>;

<span class="hljs-keyword">FUNCTION</span> run_delete(tbl <span class="hljs-keyword">IN</span> NUMBER, d1 <span class="hljs-keyword">IN</span> NUMBER)
<span class="hljs-keyword">RETURN</span> VARCHAR2
<span class="hljs-keyword">AS</span>
<span class="hljs-keyword">BEGIN</span>
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
  IF <span class="hljs-keyword">SQL</span><span class="hljs-operator">%</span>ROWCOUNT <span class="hljs-operator">&gt;</span> <span class="hljs-number">0</span> <span class="hljs-keyword">THEN</span> <span class="hljs-keyword">RETURN</span> <span class="hljs-string">&#x27;delete&#x27;</span>;
  <span class="hljs-keyword">ELSE</span> <span class="hljs-keyword">RETURN</span> <span class="hljs-keyword">NULL</span>; <span class="hljs-keyword">END</span> IF;
<span class="hljs-keyword">END</span>;

<span class="hljs-keyword">FUNCTION</span> run_update_all(tbl <span class="hljs-keyword">IN</span> NUMBER, d1 <span class="hljs-keyword">IN</span> NUMBER)
<span class="hljs-keyword">RETURN</span> VARCHAR2
<span class="hljs-keyword">AS</span> 
  r2 NUMBER :<span class="hljs-operator">=</span> <span class="hljs-built_in">CEIL</span>(DBMS_RANDOM.VALUE(<span class="hljs-number">1000000</span>,<span class="hljs-number">9999999</span>));
  r3 NUMBER :<span class="hljs-operator">=</span> <span class="hljs-built_in">CEIL</span>(DBMS_RANDOM.VALUE(<span class="hljs-number">1000000</span>,<span class="hljs-number">9999999</span>));
  r4 NUMBER :<span class="hljs-operator">=</span> <span class="hljs-built_in">CEIL</span>(DBMS_RANDOM.VALUE(<span class="hljs-number">1000000</span>,<span class="hljs-number">9999999</span>));
  r5 NUMBER :<span class="hljs-operator">=</span> <span class="hljs-built_in">CEIL</span>(DBMS_RANDOM.VALUE(<span class="hljs-number">1000000</span>,<span class="hljs-number">9999999</span>));
<span class="hljs-keyword">BEGIN</span>
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
  IF <span class="hljs-keyword">SQL</span><span class="hljs-operator">%</span>ROWCOUNT <span class="hljs-operator">&gt;</span> <span class="hljs-number">0</span> <span class="hljs-keyword">THEN</span> <span class="hljs-keyword">RETURN</span> <span class="hljs-string">&#x27;update all&#x27;</span>;
  <span class="hljs-keyword">ELSE</span> <span class="hljs-keyword">RETURN</span> <span class="hljs-keyword">NULL</span>; <span class="hljs-keyword">END</span> IF;
<span class="hljs-keyword">END</span>;

<span class="hljs-keyword">FUNCTION</span> run_update_one(tbl <span class="hljs-keyword">IN</span> NUMBER, d1 <span class="hljs-keyword">IN</span> NUMBER)
<span class="hljs-keyword">RETURN</span> VARCHAR2
<span class="hljs-keyword">AS</span>
  r NUMBER :<span class="hljs-operator">=</span> <span class="hljs-built_in">CEIL</span>(DBMS_RANDOM.VALUE(<span class="hljs-number">1000000</span>,<span class="hljs-number">9999999</span>));
<span class="hljs-keyword">BEGIN</span>
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
  IF <span class="hljs-keyword">SQL</span><span class="hljs-operator">%</span>ROWCOUNT <span class="hljs-operator">&gt;</span> <span class="hljs-number">0</span> <span class="hljs-keyword">THEN</span> <span class="hljs-keyword">RETURN</span> <span class="hljs-string">&#x27;update one&#x27;</span>;
  <span class="hljs-keyword">ELSE</span> <span class="hljs-keyword">RETURN</span> <span class="hljs-keyword">NULL</span>; <span class="hljs-keyword">END</span> IF;
<span class="hljs-keyword">END</span>;

<span class="hljs-keyword">FUNCTION</span> run(n <span class="hljs-keyword">IN</span> NUMBER)
  <span class="hljs-keyword">RETURN</span> test_write_scalability.piped_output_table PIPELINED
<span class="hljs-keyword">IS</span>
  PRAGMA AUTONOMOUS_TRANSACTION;
  rec  test_write_scalability.piped_output;

  id1  NUMBER;
  tbl  NUMBER;
  strt <span class="hljs-type">TIMESTAMP</span>(<span class="hljs-number">9</span>);
  cmnd NUMBER;
  d1   NUMBER;
  q    NUMBER;
  begn NUMBER;
  iter NUMBER;
  r    NUMBER;
  tmp  <span class="hljs-type">DATE</span>;

<span class="hljs-keyword">BEGIN</span>
  <span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">CEIL</span>((<span class="hljs-built_in">max</span>(id1)<span class="hljs-operator">-</span><span class="hljs-built_in">min</span>(id1))<span class="hljs-operator">/</span><span class="hljs-number">4</span>) <span class="hljs-keyword">into</span> q <span class="hljs-keyword">FROM</span> scale_write_1;

  iter :<span class="hljs-operator">=</span> n;
  WHILE iter <span class="hljs-operator">&gt;</span> <span class="hljs-number">0</span> LOOP
    <span class="hljs-keyword">FOR</span> cmd <span class="hljs-keyword">IN</span> <span class="hljs-number">0</span> .. <span class="hljs-number">3</span> LOOP
      r :<span class="hljs-operator">=</span> TRUNC(DBMS_RANDOM.VALUE(<span class="hljs-number">0</span>, q));
      <span class="hljs-keyword">FOR</span> tbl <span class="hljs-keyword">IN</span> <span class="hljs-number">0</span> .. <span class="hljs-number">5</span> LOOP
        strt :<span class="hljs-operator">=</span> systimestamp;
        rec.cmnd :<span class="hljs-operator">=</span> 
        <span class="hljs-keyword">CASE</span> cmd
        <span class="hljs-keyword">WHEN</span> <span class="hljs-number">0</span> <span class="hljs-keyword">THEN</span> run_update_all(tbl, r <span class="hljs-operator">+</span> cmd<span class="hljs-operator">*</span>q)
        <span class="hljs-keyword">WHEN</span> <span class="hljs-number">1</span> <span class="hljs-keyword">THEN</span> run_insert    (tbl, r <span class="hljs-operator">+</span> cmd<span class="hljs-operator">*</span>q)
        <span class="hljs-keyword">WHEN</span> <span class="hljs-number">2</span> <span class="hljs-keyword">THEN</span> run_update_one(tbl, r <span class="hljs-operator">+</span> cmd<span class="hljs-operator">*</span>q)
        <span class="hljs-keyword">WHEN</span> <span class="hljs-number">3</span> <span class="hljs-keyword">THEN</span> run_delete    (tbl, r <span class="hljs-operator">+</span> cmd<span class="hljs-operator">*</span>q)
        <span class="hljs-keyword">END</span>;
        IF rec.cmnd <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NOT NULL</span> <span class="hljs-keyword">THEN</span>
          <span class="hljs-keyword">COMMIT</span>;
          <span class="hljs-comment">-- magic: convert INTERVAL DAYS TO SECONDS</span>
          <span class="hljs-comment">-- to NUMERIC (seconds)</span>
          tmp :<span class="hljs-operator">=</span> sysdate;
          rec.seconds :<span class="hljs-operator">=</span> tmp 
                       <span class="hljs-operator">+</span> (systimestamp <span class="hljs-operator">-</span> strt)<span class="hljs-operator">*</span><span class="hljs-number">86400</span>
                       <span class="hljs-operator">-</span> tmp;         
          rec.idxes   :<span class="hljs-operator">=</span> tbl;
          rec.id1     :<span class="hljs-operator">=</span> r <span class="hljs-operator">+</span> cmd<span class="hljs-operator">*</span>q;
          PIPE <span class="hljs-type">ROW</span>(rec);
        <span class="hljs-keyword">END</span> IF;
      <span class="hljs-keyword">END</span> LOOP;
    <span class="hljs-keyword">END</span> LOOP;
    iter :<span class="hljs-operator">=</span> iter <span class="hljs-operator">-</span> <span class="hljs-number">1</span>;
  <span class="hljs-keyword">END</span> LOOP;
  <span class="hljs-keyword">COMMIT</span>;
  <span class="hljs-keyword">RETURN</span>;
<span class="hljs-keyword">END</span> run;
<span class="hljs-keyword">END</span> test_write_scalability;
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> (<span class="hljs-keyword">SELECT</span> idxes, cmnd, seconds
          <span class="hljs-keyword">FROM</span> <span class="hljs-keyword">TABLE</span> (test_write_scalability.run(<span class="hljs-number">1000</span>)
       )
 PIVOT (<span class="hljs-built_in">AVG</span>(seconds)
   <span class="hljs-keyword">FOR</span> cmnd
    <span class="hljs-keyword">IN</span> (<span class="hljs-string">&#x27;insert&#x27;</span>, <span class="hljs-string">&#x27;delete&#x27;</span>, <span class="hljs-string">&#x27;update all&#x27;</span>, <span class="hljs-string">&#x27;update one&#x27;</span>)
       );
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:r,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,r as headings,e as html,l as slug,p as title};
