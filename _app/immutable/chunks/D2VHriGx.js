const s="use-the-index-luke",a="sql-example-schema-oracle-partial-results",n="Oracle سكربتات المثال لـ «النتائج الجزئية»",p="index",l="سكربتات أمثلة Oracle لـ«النتائج الجزئية»",e=[{depth:2,id:"الاستعلام-عن-صفوف-top-n",text:"الاستعلام عن صفوف Top-N"},{depth:2,id:"التنقل-عبر-الصفحات-في-النتائج",text:"التنقّل عبر الصفحات في النتائج"}],c=`<p>يحتوي هذا القسم على عبارتَي <code>create</code> و<code>insert</code> لتشغيل أمثلة <a href="/arabic-cs-library/book/use-the-index-luke/sql-partial-results/index">الفصل 7<em>النتائج الجزئية</em></a> في قاعدة بيانات Oracle.</p>
<p>ونَهج اختبار قابلية التوسع في استعلامات Top-N هو نفسه المستخدم في فصل «<a href="/arabic-cs-library/book/use-the-index-luke/sql-example-schema-oracle-performance-testing-scalability/index">الاختبار وقابلية التوسع</a>».</p>
<h2 id="الاستعلام-عن-صفوف-top-n">الاستعلام عن صفوف Top-N</h2>
<p>أولاً، باستخدام Top-N متدفق مع فهرس يغطي جملة <code>order by</code>:</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX scale_slow <span class="hljs-keyword">ON</span> scale_data (section, id1, id2);

<span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> <span class="hljs-keyword">TABLE</span>(test_scalability.run(
       <span class="hljs-string">&#x27;SELECT * FROM (SELECT id2, id1 &#x27;</span>
                    <span class="hljs-operator">||</span>  <span class="hljs-string">&#x27;FROM scale_data &#x27;</span>
                    <span class="hljs-operator">||</span> <span class="hljs-string">&#x27;WHERE section=:1 &#x27;</span>
                    <span class="hljs-operator">||</span> <span class="hljs-string">&#x27;ORDER BY id2, id1) &#x27;</span>
    <span class="hljs-operator">||</span> <span class="hljs-string">&#x27; WHERE rownum &lt;= 100&#x27;</span>, <span class="hljs-number">10</span>));
</code></pre>
<p>ثم باستخدام فهرس لجملة <code>where</code> فقط:</p>
<pre><code class="language-sql">  <span class="hljs-keyword">DROP</span> INDEX scale_slow;
<span class="hljs-keyword">CREATE</span> INDEX scale_fast <span class="hljs-keyword">ON</span> scale_data (SECTION, id2, id1);

<span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> <span class="hljs-keyword">TABLE</span>(test_scalability.run(
       <span class="hljs-string">&#x27;SELECT * FROM (SELECT id2, id1 &#x27;</span>
                    <span class="hljs-operator">||</span>  <span class="hljs-string">&#x27;FROM scale_data &#x27;</span>
                    <span class="hljs-operator">||</span> <span class="hljs-string">&#x27;WHERE section=:1 &#x27;</span>
                    <span class="hljs-operator">||</span> <span class="hljs-string">&#x27;ORDER BY id2, id1) &#x27;</span>
    <span class="hljs-operator">||</span> <span class="hljs-string">&#x27; WHERE rownum &lt;= 100&#x27;</span>, <span class="hljs-number">10</span>));
</code></pre>
<h2 id="التنقل-عبر-الصفحات-في-النتائج">التنقّل عبر الصفحات في النتائج</h2>
<p>تستخدم الدالة التالية الطريقتين لجلب النتيجة صفحةً صفحة. أما عبارة <code>select</code> في النهاية فتحضّر الإحصاءات على الشاشة.</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">OR</span> REPLACE
PACKAGE test_topn_scalability <span class="hljs-keyword">IS</span>
  TYPE piped_output <span class="hljs-keyword">IS</span>
             RECORD ( section  NUMBER
                    , mde      NUMBER
                    , page     NUMBER
                    , seconds  <span class="hljs-type">INTERVAL</span> <span class="hljs-keyword">DAY</span> <span class="hljs-keyword">TO</span> <span class="hljs-keyword">SECOND</span>);
  TYPE piped_output_table <span class="hljs-keyword">IS</span> <span class="hljs-keyword">TABLE</span> <span class="hljs-keyword">OF</span> piped_output;

  <span class="hljs-keyword">FUNCTION</span> run(n <span class="hljs-keyword">IN</span> number)
    <span class="hljs-keyword">RETURN</span> test_topn_scalability.piped_output_table PIPELINED;
<span class="hljs-keyword">END</span>;
<span class="hljs-operator">/</span>

<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">OR</span> REPLACE
PACKAGE BODY test_topn_scalability
<span class="hljs-keyword">IS</span>
  TYPE tmp <span class="hljs-keyword">IS</span> <span class="hljs-keyword">TABLE</span> <span class="hljs-keyword">OF</span> piped_output INDEX <span class="hljs-keyword">BY</span> PLS_INTEGER;

<span class="hljs-keyword">FUNCTION</span> run(n <span class="hljs-keyword">IN</span> NUMBER)
  <span class="hljs-keyword">RETURN</span> test_topn_scalability.piped_output_table PIPELINED
<span class="hljs-keyword">IS</span>
  TYPE last_fetched <span class="hljs-keyword">IS</span> RECORD (id2 NUMBER, id1 NUMBER);
  <span class="hljs-keyword">last</span> last_fetched;
  rec  test_topn_scalability.piped_output;
  TYPE sec_array <span class="hljs-keyword">IS</span> <span class="hljs-keyword">TABLE</span> <span class="hljs-keyword">OF</span> last_fetched INDEX <span class="hljs-keyword">BY</span> PLS_INTEGER;

  iter NUMBER;
  sec  NUMBER;
  strt <span class="hljs-type">TIMESTAMP</span>(<span class="hljs-number">9</span>);
  mde  NUMBER;
  page NUMBER;
  cont sec_array;

  <span class="hljs-keyword">CURSOR</span> s_restart (sec <span class="hljs-keyword">IN</span> NUMBER, page <span class="hljs-keyword">IN</span> NUMBER) 
      <span class="hljs-keyword">IS</span> <span class="hljs-keyword">SELECT</span> id2, id1
           <span class="hljs-keyword">FROM</span> (<span class="hljs-keyword">SELECT</span> id2, id1, rownum rn
                   <span class="hljs-keyword">FROM</span> scale_data
                  <span class="hljs-keyword">WHERE</span> section <span class="hljs-operator">=</span> sec
                  <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> id2, id1)
          <span class="hljs-keyword">WHERE</span> rownum <span class="hljs-operator">&lt;=</span> <span class="hljs-number">100</span>
            <span class="hljs-keyword">AND</span> rn <span class="hljs-operator">&gt;</span> page<span class="hljs-operator">*</span><span class="hljs-number">100</span>;        

  <span class="hljs-keyword">CURSOR</span> s_continue (sec <span class="hljs-keyword">IN</span> NUMBER, c <span class="hljs-keyword">IN</span> last_fetched)
      <span class="hljs-keyword">IS</span> <span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
           <span class="hljs-keyword">FROM</span> (<span class="hljs-keyword">SELECT</span> id2, id1
                   <span class="hljs-keyword">FROM</span> scale_data
                  <span class="hljs-keyword">WHERE</span> section <span class="hljs-operator">=</span> sec
                    <span class="hljs-keyword">AND</span> id2 <span class="hljs-operator">&gt;=</span> c.id2
                    <span class="hljs-keyword">AND</span> (   
                            (id2 <span class="hljs-operator">=</span> c.id2 <span class="hljs-keyword">AND</span> id1 <span class="hljs-operator">&gt;</span> c.id1)
                         <span class="hljs-keyword">OR</span> 
                            (id2 <span class="hljs-operator">&gt;</span> c.id2)
                        )
                  <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> id2, id1)
          <span class="hljs-keyword">WHERE</span> rownum <span class="hljs-operator">&lt;=</span> <span class="hljs-number">100</span>;
<span class="hljs-keyword">BEGIN</span>
  iter :<span class="hljs-operator">=</span> <span class="hljs-number">0</span>;
  WHILE iter <span class="hljs-operator">&lt;=</span> n LOOP
    <span class="hljs-keyword">FOR</span> mde <span class="hljs-keyword">IN</span> <span class="hljs-number">0</span> .. <span class="hljs-number">1</span> LOOP
      <span class="hljs-keyword">FOR</span> page <span class="hljs-keyword">IN</span> <span class="hljs-number">0</span> .. <span class="hljs-number">100</span> LOOP
        <span class="hljs-keyword">FOR</span> sec <span class="hljs-keyword">IN</span> <span class="hljs-number">0</span> .. <span class="hljs-number">300</span> LOOP
          strt :<span class="hljs-operator">=</span> systimestamp;
          IF (mde <span class="hljs-operator">=</span> <span class="hljs-number">0</span> <span class="hljs-keyword">OR</span> page <span class="hljs-operator">=</span> <span class="hljs-number">0</span>) <span class="hljs-keyword">THEN</span>
            <span class="hljs-keyword">FOR</span> r <span class="hljs-keyword">IN</span> s_restart (sec, page) LOOP
              <span class="hljs-keyword">last</span> :<span class="hljs-operator">=</span> r;
            <span class="hljs-keyword">END</span> LOOP;
          <span class="hljs-keyword">ELSE</span>
            <span class="hljs-keyword">FOR</span> r <span class="hljs-keyword">IN</span> s_continue (sec, cont(sec)) LOOP
              <span class="hljs-keyword">last</span> :<span class="hljs-operator">=</span> r;
            <span class="hljs-keyword">END</span> LOOP;
          <span class="hljs-keyword">END</span> IF;
         
          rec.seconds :<span class="hljs-operator">=</span> (systimestamp <span class="hljs-operator">-</span> strt);
          rec.section :<span class="hljs-operator">=</span> sec;
          rec.page    :<span class="hljs-operator">=</span> page;
          rec.mde     :<span class="hljs-operator">=</span> mde;
          PIPE <span class="hljs-type">ROW</span>(rec);

          cont(sec) :<span class="hljs-operator">=</span> <span class="hljs-keyword">last</span>;

        <span class="hljs-keyword">END</span> LOOP;
      <span class="hljs-keyword">END</span> LOOP;
    <span class="hljs-keyword">END</span> LOOP;
    iter :<span class="hljs-operator">=</span> iter <span class="hljs-operator">+</span><span class="hljs-number">1</span>;
  <span class="hljs-keyword">END</span> LOOP;
  <span class="hljs-keyword">RETURN</span>;
<span class="hljs-keyword">END</span> run;
<span class="hljs-keyword">END</span> test_topn_scalability;
<span class="hljs-operator">/</span>

<span class="hljs-keyword">SELECT</span> section, mde, page, <span class="hljs-built_in">sum</span>(<span class="hljs-built_in">extract</span>(<span class="hljs-keyword">second</span> <span class="hljs-keyword">from</span> seconds))
  <span class="hljs-keyword">FROM</span> <span class="hljs-keyword">TABLE</span>(test_topn_scalability.run(<span class="hljs-number">10</span>))
 <span class="hljs-keyword">WHERE</span> section <span class="hljs-operator">=</span> <span class="hljs-number">10</span>
 <span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> section, mde, page
 <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> section, mde, page;
</code></pre>
`,r={book:s,chapter:a,chapterTitle:n,slug:p,title:l,headings:e,html:c};export{s as book,a as chapter,n as chapterTitle,r as default,e as headings,c as html,p as slug,l as title};
