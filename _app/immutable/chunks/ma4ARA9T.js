const s="use-the-index-luke",a="sql-example-schema-postgresql-partial-results",n="PostgreSQL سكربتات المثال لـ «النتائج الجزئية»",p="index",l="سكربتات أمثلة PostgreSQL لـ«النتائج الجزئية»",e=[{depth:2,id:"الاستعلام-عن-صفوف-top-n",text:"الاستعلام عن صفوف Top-N"},{depth:2,id:"التنقل-عبر-الصفحات-في-النتائج",text:"التنقّل عبر الصفحات في النتائج"},{depth:2,id:"دوال-النوافذ",text:"دوال النوافذ"}],c=`<p>يحتوي هذا القسم على عبارتَي <code>create</code> و<code>insert</code> لتشغيل أمثلة <a href="/arabic-cs-library/book/use-the-index-luke/sql-partial-results/index">الفصل 7<em>النتائج الجزئية</em></a> في قاعدة بيانات PostgreSQL.</p>
<p>ونَهج اختبار قابلية التوسع في استعلامات Top-N هو نفسه المستخدم في فصل «<a href="/arabic-cs-library/book/use-the-index-luke/sql-example-schema-postgresql-performance-testing-scalability/index">الاختبار وقابلية التوسع</a>».</p>
<h2 id="الاستعلام-عن-صفوف-top-n">الاستعلام عن صفوف Top-N</h2>
<p>أولاً، باستخدام فهرس لجملة <code>where</code> فقط:</p>
<pre><code class="language-sql"><span class="hljs-keyword">DROP</span> INDEX scale_fast;
<span class="hljs-keyword">CREATE</span> INDEX scale_slow <span class="hljs-keyword">ON</span> scale_data (SECTION, ID1, ID2);
<span class="hljs-keyword">ALTER TABLE</span> scale_data CLUSTER <span class="hljs-keyword">ON</span> scale_slow;
CLUSTER scale_data;

<span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> test_scalability(<span class="hljs-string">&#x27;SELECT * &#x27;</span>
                      <span class="hljs-operator">||</span>  <span class="hljs-string">&#x27;FROM scale_data &#x27;</span>
                      <span class="hljs-operator">||</span> <span class="hljs-string">&#x27;WHERE section=$1 &#x27;</span>
                      <span class="hljs-operator">||</span> <span class="hljs-string">&#x27;ORDER BY id2, id1 &#x27;</span>
                      <span class="hljs-operator">||</span> <span class="hljs-string">&#x27;FETCH FIRST 100 ROWS ONLY&#x27;</span>, <span class="hljs-number">10</span>)
       <span class="hljs-keyword">AS</span> (sec <span class="hljs-type">INT</span>, seconds <span class="hljs-type">INTERVAL</span>, cnt_rows <span class="hljs-type">INT</span>);
</code></pre>
<p>ثم باستخدام Top-N متدفق مع فهرس يغطي جملة <code>order by</code>:</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX scale_fast <span class="hljs-keyword">ON</span> scale_data (SECTION, ID2, ID1);
<span class="hljs-keyword">ALTER TABLE</span> scale_data CLUSTER <span class="hljs-keyword">ON</span> scale_fast;
CLUSTER scale_data;

<span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> test_scalability(<span class="hljs-string">&#x27;SELECT * &#x27;</span>
                      <span class="hljs-operator">||</span>  <span class="hljs-string">&#x27;FROM scale_data &#x27;</span>
                      <span class="hljs-operator">||</span> <span class="hljs-string">&#x27;WHERE section=$1 &#x27;</span>
                      <span class="hljs-operator">||</span> <span class="hljs-string">&#x27;ORDER BY id2, id1 &#x27;</span>
                      <span class="hljs-operator">||</span> <span class="hljs-string">&#x27;FETCH FIRST 100 ROWS ONLY&#x27;</span>, <span class="hljs-number">10</span>)
       <span class="hljs-keyword">AS</span> (sec <span class="hljs-type">INT</span>, seconds <span class="hljs-type">INTERVAL</span>, cnt_rows <span class="hljs-type">INT</span>);
</code></pre>
<h2 id="التنقل-عبر-الصفحات-في-النتائج">التنقّل عبر الصفحات في النتائج</h2>
<p>تستخدم الدالة التالية الطريقتين لجلب النتيجة صفحةً صفحة. أما عبارة <code>select</code> في النهاية فتحضّر الإحصاءات على الشاشة.</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">OR</span> REPLACE
<span class="hljs-keyword">FUNCTION</span> test_topn_scalability (n <span class="hljs-type">INT</span>)
 <span class="hljs-keyword">RETURNS</span> SETOF RECORD <span class="hljs-keyword">AS</span>
$$
<span class="hljs-keyword">DECLARE</span>
  strt  <span class="hljs-type">TIMESTAMP</span>;
  dur   <span class="hljs-type">INTERVAL</span>;
  v_rec RECORD;
  mode  <span class="hljs-type">INT</span>; iter  <span class="hljs-type">INT</span>; sec   <span class="hljs-type">INT</span>;
  lf    RECORD;
  c1    <span class="hljs-type">INT</span>[<span class="hljs-number">300</span>]; c2 <span class="hljs-type">INT</span>[<span class="hljs-number">300</span>];

  sql_restart <span class="hljs-keyword">CURSOR</span> (sec <span class="hljs-type">int</span>, page <span class="hljs-type">int</span>)
           <span class="hljs-keyword">IS</span> <span class="hljs-keyword">SELECT</span> id2, id1   
                <span class="hljs-keyword">FROM</span> scale_data
               <span class="hljs-keyword">WHERE</span> section <span class="hljs-operator">=</span> sec
               <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> id2,id1
              <span class="hljs-keyword">OFFSET</span> <span class="hljs-number">100</span><span class="hljs-operator">*</span>page
               <span class="hljs-keyword">FETCH</span> NEXT <span class="hljs-number">100</span> <span class="hljs-keyword">ROWS</span> <span class="hljs-keyword">ONLY</span>;

  sql_continue <span class="hljs-keyword">CURSOR</span> (sec <span class="hljs-type">int</span>, c2 <span class="hljs-type">int</span>, c1 <span class="hljs-type">int</span>) 
            <span class="hljs-keyword">IS</span> <span class="hljs-keyword">SELECT</span> id2, id1
                 <span class="hljs-keyword">FROM</span> scale_data
                <span class="hljs-keyword">WHERE</span> section <span class="hljs-operator">=</span> sec
              <span class="hljs-comment">--    AND (id2, id1) &gt; (c2, c1)</span>
                  <span class="hljs-keyword">AND</span> id2 <span class="hljs-operator">&gt;=</span> c2
                  <span class="hljs-keyword">AND</span> (
                         (id2 <span class="hljs-operator">=</span> c2 <span class="hljs-keyword">AND</span> id1 <span class="hljs-operator">&gt;</span> c1)
                       <span class="hljs-keyword">OR</span>
                         (id2 <span class="hljs-operator">&gt;</span> c2)
                      )
                <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> id2,id1
                <span class="hljs-keyword">FETCH</span> NEXT <span class="hljs-number">100</span> <span class="hljs-keyword">ROWS</span> <span class="hljs-keyword">ONLY</span>;
<span class="hljs-keyword">BEGIN</span>
  <span class="hljs-keyword">FOR</span> iter  <span class="hljs-keyword">IN</span> <span class="hljs-number">1.</span>.n LOOP
    <span class="hljs-keyword">FOR</span> mode  <span class="hljs-keyword">IN</span> <span class="hljs-number">0.</span><span class="hljs-number">.1</span> LOOP
      <span class="hljs-keyword">FOR</span> page <span class="hljs-keyword">IN</span> <span class="hljs-number">0.</span><span class="hljs-number">.100</span> LOOP
        <span class="hljs-keyword">FOR</span> sec <span class="hljs-keyword">IN</span> <span class="hljs-number">0.</span><span class="hljs-number">.300</span> LOOP
          strt :<span class="hljs-operator">=</span> CLOCK_TIMESTAMP();

          IF mode <span class="hljs-operator">=</span> <span class="hljs-number">0</span> <span class="hljs-keyword">or</span> page <span class="hljs-operator">=</span> <span class="hljs-number">0</span> <span class="hljs-keyword">THEN</span>
            <span class="hljs-keyword">FOR</span> lf <span class="hljs-keyword">IN</span> sql_restart(sec, page) LOOP
              c1[sec] :<span class="hljs-operator">=</span> lf.id1; c2[sec] :<span class="hljs-operator">=</span> lf.id2;
            <span class="hljs-keyword">END</span> LOOP;
          <span class="hljs-keyword">ELSE</span>
            <span class="hljs-keyword">FOR</span> lf <span class="hljs-keyword">IN</span> sql_continue(sec, c2[sec], c1[sec]) LOOP
              c1[sec] :<span class="hljs-operator">=</span> lf.id1; c2[sec] :<span class="hljs-operator">=</span> lf.id2;
            <span class="hljs-keyword">END</span> LOOP;
          <span class="hljs-keyword">END</span> IF;

          dur :<span class="hljs-operator">=</span> (CLOCK_TIMESTAMP() <span class="hljs-operator">-</span> strt);

          <span class="hljs-keyword">SELECT</span> <span class="hljs-keyword">INTO</span> v_rec mode, sec, page, dur;
          <span class="hljs-keyword">RETURN</span> NEXT v_rec;
        <span class="hljs-keyword">END</span> LOOP;
      <span class="hljs-keyword">END</span> LOOP;
    <span class="hljs-keyword">END</span> LOOP;
  <span class="hljs-keyword">END</span> LOOP;
  <span class="hljs-keyword">RETURN</span>;
<span class="hljs-keyword">END</span>;
$$ <span class="hljs-keyword">LANGUAGE</span> plpgsql;

<span class="hljs-keyword">SELECT</span> sec, mode, page, <span class="hljs-built_in">sum</span>(seconds)
  <span class="hljs-keyword">FROM</span> test_topn_scalability(<span class="hljs-number">10</span>) 
    <span class="hljs-keyword">AS</span> (mode <span class="hljs-type">INT</span>, sec <span class="hljs-type">INT</span>, page <span class="hljs-type">int</span>, seconds <span class="hljs-type">INTERVAL</span>)
 <span class="hljs-keyword">WHERE</span> sec<span class="hljs-operator">=</span><span class="hljs-number">10</span>
 <span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> sec, mode, page
 <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sec, mode, page;
</code></pre>
<h2 id="دوال-النوافذ">دوال النوافذ</h2>
<p>يدعم PostgreSQL دوال النوافذ، لكنه لا يستخدم، حتى الإصدار 9.1، الفهارس لأفضل استفادة منها.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> ( <span class="hljs-keyword">SELECT</span> sales.<span class="hljs-operator">*</span>
              , <span class="hljs-built_in">ROW_NUMBER</span>() <span class="hljs-keyword">OVER</span> (<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date <span class="hljs-keyword">DESC</span>
                                          , sale_id   <span class="hljs-keyword">DESC</span>) rn
           <span class="hljs-keyword">FROM</span> sales
       ) tmp
 <span class="hljs-keyword">WHERE</span> rn <span class="hljs-keyword">between</span> <span class="hljs-number">11</span> <span class="hljs-keyword">and</span> <span class="hljs-number">20</span>
 <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date <span class="hljs-keyword">DESC</span>, sale_id <span class="hljs-keyword">DESC</span>
</code></pre>
<pre><code>                          QUERY PLAN                                     
---------------------------------------------------------------
Subquery Scan on tmp  (cost=606750.08..649178.30 rows=6061)
 Filter: ((tmp.rn &gt;= 11) AND (tmp.rn &lt;= 20))
 -&gt; WindowAgg  (cost=606750.08..630994.78 rows=1212235)
    -&gt; Sort  (cost=606750.08..609780.67 rows=1212235)
       Sort Key: sales.sale_date, sales.sale_id
       -&gt; Seq Scan on sales  (cost=0.00..55417.35 rows=1212235)
</code></pre>
<p>تقرأ قاعدة البيانات الجدول بأكمله (<code>Seq Scan</code>) وترتّبه (<code>Sort</code>). ولا توجد عملية <code>Limit</code> تدل على إدراك الغرض من العبارة.</p>
`,r={book:s,chapter:a,chapterTitle:n,slug:p,title:l,headings:e,html:c};export{s as book,a as chapter,n as chapterTitle,r as default,e as headings,c as html,p as slug,l as title};
