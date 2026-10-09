const s="use-the-index-luke",a="sql-example-schema-oracle-performance-testing-scalability",n="Oracle سكربتات المثال لـ «الأداء وقابلية التوسّع»",l="index",p="سكربتات أمثلة Oracle لـ«الاختبار وقابلية التوسع»",e=[],c=`<p>يحتوي هذا القسم على شيفرة <code>create</code> و<code>insert</code> وPL/SQL لتشغيل اختبار قابلية التوسع من <a href="/arabic-cs-library/book/use-the-index-luke/sql-testing-scalability/index">الفصل 3<em>الأداء وقابلية التوسع</em></a> في قاعدة بيانات Oracle 11gR2.</p>
<h4>تحذير</h4>
<p>ستنشئ هذه السكربتات كائنات كبيرة في قاعدة البيانات وتنتج كمية هائلة من سجلات الإعادة (redo logs).</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> scale_data (
   section NUMBER <span class="hljs-keyword">NOT NULL</span>,
   id1     NUMBER <span class="hljs-keyword">NOT NULL</span>,
   id2     NUMBER <span class="hljs-keyword">NOT NULL</span>
);
</code></pre>
<p>ملاحظة:</p>
<ul>
<li>لا يوجد مفتاح أساسي (لإبقاء توليد البيانات بسيطاً)</li>
<li>لا يوجد فهرس (بعد). ويُنشأ ذلك بعد ملء الجدول</li>
<li>لا يوجد عمود «نفايات» (junk) لأن الجدول لا يُوصَل إليه فعلاً أثناء الاختبار</li>
</ul>
<pre><code class="language-sql"><span class="hljs-keyword">INSERT INTO</span> scale_data
<span class="hljs-keyword">SELECT</span> sections.n, gen.x, <span class="hljs-built_in">CEIL</span>(DBMS_RANDOM.VALUE(<span class="hljs-number">0</span>, <span class="hljs-number">100</span>)) 
  <span class="hljs-keyword">FROM</span> (
         <span class="hljs-keyword">SELECT</span> level <span class="hljs-operator">-</span> <span class="hljs-number">1</span> n
           <span class="hljs-keyword">FROM</span> DUAL
        <span class="hljs-keyword">CONNECT</span> <span class="hljs-keyword">BY</span> level <span class="hljs-operator">&lt;</span> <span class="hljs-number">300</span>) sections
       , (
         <span class="hljs-keyword">SELECT</span> level x
           <span class="hljs-keyword">FROM</span> DUAL
        <span class="hljs-keyword">CONNECT</span> <span class="hljs-keyword">BY</span> level <span class="hljs-operator">&lt;</span> <span class="hljs-number">900000</span>) gen
 <span class="hljs-keyword">WHERE</span> gen.x <span class="hljs-operator">&lt;=</span> sections.n <span class="hljs-operator">*</span> <span class="hljs-number">3000</span>;
</code></pre>
<p>ملاحظة:</p>
<ul>
<li>تولّد هذه الشيفرة 300 قسم، وقد تحتاج إلى تعديل العدد ليناسب بيئتك. وإذا زدت عدد الأقسام، فيجب أن تزيد المولّد الثاني أيضاً؛ إذ يجب أن يولّد <code>3000 x </code> سجل على الأقل.</li>
<li>سيحتاج الجدول إلى بضعة غيغابايتات</li>
</ul>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX scale_slow <span class="hljs-keyword">ON</span> scale_data (section, id1, id2);

<span class="hljs-keyword">BEGIN</span>
     DBMS_STATS.GATHER_TABLE_STATS(<span class="hljs-keyword">null</span>, <span class="hljs-string">&#x27;SCALE_DATA&#x27;</span> 
                                       , CASCADE <span class="hljs-operator">=</span><span class="hljs-operator">&gt;</span> <span class="hljs-literal">true</span>);
<span class="hljs-keyword">END</span>;
<span class="hljs-operator">/</span>
</code></pre>
<p>ملاحظة:</p>
<ul>
<li>سيحتاج الفهرس أيضاً إلى بضعة غيغابايتات</li>
</ul>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">OR</span> REPLACE PACKAGE test_scalability <span class="hljs-keyword">IS</span>
  TYPE piped_output <span class="hljs-keyword">IS</span> RECORD ( section  NUMBER
                              , seconds  NUMBER
                              , cnt_rows NUMBER);
  TYPE piped_output_table <span class="hljs-keyword">IS</span> <span class="hljs-keyword">TABLE</span> <span class="hljs-keyword">OF</span> piped_output;

  <span class="hljs-keyword">FUNCTION</span> run(sql_txt <span class="hljs-keyword">IN</span> varchar2, n <span class="hljs-keyword">IN</span> number)
    <span class="hljs-keyword">RETURN</span> test_scalability.piped_output_table PIPELINED;
<span class="hljs-keyword">END</span>;
<span class="hljs-operator">/</span>

<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">OR</span> REPLACE PACKAGE BODY test_scalability
<span class="hljs-keyword">IS</span>
  TYPE tmp <span class="hljs-keyword">IS</span> <span class="hljs-keyword">TABLE</span> <span class="hljs-keyword">OF</span> piped_output INDEX <span class="hljs-keyword">BY</span> PLS_INTEGER;

  <span class="hljs-keyword">FUNCTION</span> run(sql_txt <span class="hljs-keyword">IN</span> VARCHAR2, n <span class="hljs-keyword">IN</span> NUMBER)
    <span class="hljs-keyword">RETURN</span> test_scalability.piped_output_table PIPELINED
  <span class="hljs-keyword">IS</span>
    rec  test_scalability.tmp;
    r    test_scalability.piped_output;
    iter NUMBER;
    sec  NUMBER;
    strt NUMBER;
    exec_txt VARCHAR2(<span class="hljs-number">4000</span>);
    cnt  NUMBER;
  <span class="hljs-keyword">BEGIN</span>
    exec_txt :<span class="hljs-operator">=</span> <span class="hljs-string">&#x27;select count(*) from (&#x27;</span> <span class="hljs-operator">||</span> sql_txt <span class="hljs-operator">||</span> <span class="hljs-string">&#x27;)&#x27;</span>;
    iter :<span class="hljs-operator">=</span> <span class="hljs-number">0</span>;
    WHILE iter <span class="hljs-operator">&lt;=</span> n LOOP
      sec :<span class="hljs-operator">=</span> <span class="hljs-number">0</span>;
      WHILE sec <span class="hljs-operator">&lt;</span> <span class="hljs-number">300</span> LOOP
        IF iter <span class="hljs-operator">=</span> <span class="hljs-number">0</span> <span class="hljs-keyword">THEN</span>
           rec(sec).seconds  :<span class="hljs-operator">=</span> <span class="hljs-number">0</span>;
           rec(sec).section  :<span class="hljs-operator">=</span> sec;
           rec(sec).cnt_rows :<span class="hljs-operator">=</span> <span class="hljs-number">0</span>;
        <span class="hljs-keyword">END</span> IF;
        strt :<span class="hljs-operator">=</span> DBMS_UTILITY.GET_TIME;
        <span class="hljs-keyword">EXECUTE</span> IMMEDIATE exec_txt <span class="hljs-keyword">INTO</span> cnt <span class="hljs-keyword">USING</span> sec;
        rec(sec).seconds :<span class="hljs-operator">=</span> rec(sec).seconds 
                          <span class="hljs-operator">+</span> (DBMS_UTILITY.GET_TIME <span class="hljs-operator">-</span> strt)<span class="hljs-operator">/</span><span class="hljs-number">100</span>;
        rec(sec).cnt_rows:<span class="hljs-operator">=</span> rec(sec).cnt_rows <span class="hljs-operator">+</span> cnt;
        IF iter <span class="hljs-operator">=</span> n <span class="hljs-keyword">THEN</span>
          PIPE <span class="hljs-type">ROW</span>(rec(sec));
        <span class="hljs-keyword">END</span> IF;
        sec :<span class="hljs-operator">=</span> sec <span class="hljs-operator">+</span><span class="hljs-number">1</span>;
      <span class="hljs-keyword">END</span> LOOP;
      iter :<span class="hljs-operator">=</span> iter <span class="hljs-operator">+</span><span class="hljs-number">1</span>;
    <span class="hljs-keyword">END</span> LOOP;
    <span class="hljs-keyword">RETURN</span>;
  <span class="hljs-keyword">END</span>;
<span class="hljs-keyword">END</span> test_scalability;
<span class="hljs-operator">/</span>
</code></pre>
<p>ملاحظة:</p>
<ul>
<li>تعيد الدالة <code>TEST_SCALABILITY.RUN</code> جدولاً</li>
<li>وهي مثبتة في الشيفرة لتشغيل الاختبار على 300 قسم (المظلَّل).</li>
<li>وعدد التكرارات قابل للضبط</li>
</ul>
<p>ويستدعي <code>select</code> التالي الدالة ويمرّر الاستعلام كسلسلة نصية:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> <span class="hljs-keyword">TABLE</span>(test_scalability.run(
       <span class="hljs-string">&#x27;SELECT * &#x27;</span> 
      <span class="hljs-operator">||</span> <span class="hljs-string">&#x27;FROM scale_data &#x27;</span>
      <span class="hljs-operator">||</span><span class="hljs-string">&#x27;WHERE section=:1 &#x27;</span>
      <span class="hljs-operator">||</span>  <span class="hljs-string">&#x27;AND id2=CEIL(DBMS_RANDOM.value(1,100))&#x27;</span>, <span class="hljs-number">10</span>));
</code></pre>
<p>ويمكن إجراء الاختبار المقابل بفهرس أفضل هكذا:</p>
<pre><code class="language-sql"><span class="hljs-keyword">DROP</span> INDEX scale_slow;
<span class="hljs-keyword">CREATE</span> INDEX scale_fast <span class="hljs-keyword">ON</span> scale_data (section, id2, id1);

<span class="hljs-keyword">BEGIN</span>
     DBMS_STATS.GATHER_TABLE_STATS(<span class="hljs-keyword">null</span>, <span class="hljs-string">&#x27;SCALE_DATA&#x27;</span> 
                                       , CASCADE <span class="hljs-operator">=</span><span class="hljs-operator">&gt;</span> <span class="hljs-literal">true</span>);
<span class="hljs-keyword">END</span>;
<span class="hljs-operator">/</span>

<span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> <span class="hljs-keyword">TABLE</span>(test_scalability.run(
       <span class="hljs-string">&#x27;SELECT * &#x27;</span> 
      <span class="hljs-operator">||</span> <span class="hljs-string">&#x27;FROM scale_data &#x27;</span>
      <span class="hljs-operator">||</span><span class="hljs-string">&#x27;WHERE section=:1 &#x27;</span>
      <span class="hljs-operator">||</span>  <span class="hljs-string">&#x27;AND id2=CEIL(DBMS_RANDOM.value(1,10))&#x27;</span>, <span class="hljs-number">10</span>));
</code></pre>
<p>ملاحظة:</p>
<ul>
<li>يُسقط الفهرس <code>SCALE_SLOW</code> لمنع الخطأ «ORA-01408: such column list already indexed».</li>
</ul>
`,r={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:e,html:c};export{s as book,a as chapter,n as chapterTitle,r as default,e as headings,c as html,l as slug,p as title};
