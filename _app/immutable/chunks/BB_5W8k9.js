const s="use-the-index-luke",a="sql-example-schema-postgresql-performance-testing-scalability",n="PostgreSQL سكربتات المثال لـ «الأداء وقابلية التوسّع»",l="index",p="سكربتات أمثلة PostgreSQL لـ«الاختبار وقابلية التوسع»",e=[],c=`<p>يحتوي هذا القسم على شيفرة <code>CREATE</code> و<code>INSERT</code> وPL/pgSQL لتشغيل اختبار قابلية التوسع من <a href="/arabic-cs-library/book/use-the-index-luke/sql-testing-scalability/index">فصل الاختبار وقابلية التوسع</a> في قاعدة بيانات PostgreSQL.</p>
<h4>تحذير</h4>
<p>ستنشئ هذه السكربتات كائنات كبيرة في قاعدة البيانات وتنتج كمية هائلة من سجلات المعاملات.</p>
<p>ومن اللازم تشغيل الاختبار على مجموعة بيانات ضخمة جداً لضمان ألا يؤثر التخزين المؤقت في القياس. وتبعاً لبيئتك، قد تحتاج إلى إنشاء جداول أكبر حتى تحصل على نتيجة خطية كما في الكتاب.</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> scale_data (
   section <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>,
   id1     <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>,
   id2     <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>
);
</code></pre>
<p>ملاحظة:</p>
<ul>
<li>لا يوجد مفتاح أساسي (لإبقاء توليد البيانات بسيطاً).</li>
<li>لا يوجد فهرس (بعد). ويُنشأ ذلك بعد ملء الجدول.</li>
<li>لا يوجد عمود «نفايات» (junk) لإبقاء الجدول صغيراً.</li>
</ul>
<pre><code class="language-sql"><span class="hljs-keyword">INSERT INTO</span> scale_data
<span class="hljs-keyword">SELECT</span> sections.<span class="hljs-operator">*</span>, gen.<span class="hljs-operator">*</span>
     , <span class="hljs-built_in">CEIL</span>(RANDOM()<span class="hljs-operator">*</span><span class="hljs-number">100</span>) 
  <span class="hljs-keyword">FROM</span> GENERATE_SERIES(<span class="hljs-number">1</span>, <span class="hljs-number">300</span>)     sections,
       GENERATE_SERIES(<span class="hljs-number">1</span>, <span class="hljs-number">900000</span>) gen
 <span class="hljs-keyword">WHERE</span> gen <span class="hljs-operator">&lt;=</span> sections <span class="hljs-operator">*</span> <span class="hljs-number">3000</span>;
</code></pre>
<p>ملاحظة:</p>
<ul>
<li>تولّد هذه الشيفرة 300 قسم، وقد تحتاج إلى تعديل العدد ليناسب بيئتك. وإذا زدت عدد الأقسام، فقد تحتاج أيضاً إلى زيادة استدعاء <code>GENERATE_SERIES</code> الثاني؛ إذ يجب أن يولّد <code>3000 x </code> سجل على الأقل.</li>
<li>سيحتاج الجدول إلى بضعة غيغابايتات.</li>
</ul>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX scale_slow <span class="hljs-keyword">ON</span> scale_data (section, id1, id2);

<span class="hljs-keyword">ALTER TABLE</span> scale_data CLUSTER <span class="hljs-keyword">ON</span> scale_slow;
CLUSTER scale_data;
</code></pre>
<p>ملاحظة:</p>
<ul>
<li>سيحتاج الفهرس أيضاً إلى بضعة غيغابايتات.</li>
<li>لا يدعم PostgreSQL الفهارس المُغطّية حتى الإصدار 9.0.3؛ أي لا يمكن الاستعلام من الفهرس وحده دون الوصول المقابل إلى الجدول. ولذلك سنعنقد الجدول وفق الفهرس لإبقاء الأثر في حده الأدنى.</li>
<li>وقد يستغرق ذلك وقتاً طويلاً جداً.</li>
</ul>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">OR</span> REPLACE <span class="hljs-keyword">FUNCTION</span> test_scalability
   (sql_txt <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">2000</span>), n <span class="hljs-type">INT</span>)
   <span class="hljs-keyword">RETURNS</span> SETOF RECORD <span class="hljs-keyword">AS</span>
$$
<span class="hljs-keyword">DECLARE</span>
   tim   <span class="hljs-type">INTERVAL</span>[<span class="hljs-number">300</span>];
   rec   <span class="hljs-type">INT</span>[<span class="hljs-number">300</span>];
   strt  <span class="hljs-type">TIMESTAMP</span>;
   v_rec RECORD;
   iter  <span class="hljs-type">INT</span>;
   sec   <span class="hljs-type">INT</span>;
   cnt   <span class="hljs-type">INT</span>;
   rnd   <span class="hljs-type">INT</span>;
<span class="hljs-keyword">BEGIN</span>
   <span class="hljs-keyword">FOR</span> iter  <span class="hljs-keyword">IN</span> <span class="hljs-number">0.</span>.n LOOP
      <span class="hljs-keyword">FOR</span> sec <span class="hljs-keyword">IN</span> <span class="hljs-number">0.</span><span class="hljs-number">.300</span> LOOP
         IF iter <span class="hljs-operator">=</span> <span class="hljs-number">0</span> <span class="hljs-keyword">THEN</span>
           tim[sec] :<span class="hljs-operator">=</span> <span class="hljs-number">0</span>;
           rec[sec] :<span class="hljs-operator">=</span> <span class="hljs-number">0</span>;
         <span class="hljs-keyword">END</span> IF;
         rnd  :<span class="hljs-operator">=</span> <span class="hljs-built_in">CEIL</span>(RANDOM() <span class="hljs-operator">*</span> <span class="hljs-number">100</span>);
         strt :<span class="hljs-operator">=</span> CLOCK_TIMESTAMP();

         <span class="hljs-keyword">EXECUTE</span> <span class="hljs-string">&#x27;select count(*) from (&#x27;</span> <span class="hljs-operator">||</span> sql_txt <span class="hljs-operator">||</span> <span class="hljs-string">&#x27;) tbl&#x27;</span>
            <span class="hljs-keyword">INTO</span> cnt
           <span class="hljs-keyword">USING</span> sec, rnd;

         tim[sec] :<span class="hljs-operator">=</span> tim[sec] <span class="hljs-operator">+</span> CLOCK_TIMESTAMP() <span class="hljs-operator">-</span> strt;
         rec[sec] :<span class="hljs-operator">=</span> rec[sec] <span class="hljs-operator">+</span> cnt;

         IF iter <span class="hljs-operator">=</span> n <span class="hljs-keyword">THEN</span>
            <span class="hljs-keyword">SELECT</span> <span class="hljs-keyword">INTO</span> v_rec sec, tim[sec], rec[sec];
            <span class="hljs-keyword">RETURN</span> NEXT v_rec;
         <span class="hljs-keyword">END</span> IF;
      <span class="hljs-keyword">END</span> LOOP;
   <span class="hljs-keyword">END</span> LOOP;

   <span class="hljs-keyword">RETURN</span>;
<span class="hljs-keyword">END</span>;
$$ <span class="hljs-keyword">LANGUAGE</span> plpgsql;
</code></pre>
<p>ملاحظة:</p>
<ul>
<li>تعيد الدالة <code>TEST_SCALABILITY</code> جدولاً.</li>
<li>وهي مثبتة في الشيفرة لتشغيل الاختبار على 300 قسم</li>
<li>وعدد التكرارات قابل للضبط</li>
</ul>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> test_scalability(<span class="hljs-string">&#x27;SELECT * &#x27;</span>
                      <span class="hljs-operator">||</span>  <span class="hljs-string">&#x27;FROM scale_data &#x27;</span>
                      <span class="hljs-operator">||</span> <span class="hljs-string">&#x27;WHERE section=$1 &#x27;</span>
                      <span class="hljs-operator">||</span>   <span class="hljs-string">&#x27;AND id2=$2&#x27;</span>, <span class="hljs-number">10</span>)
       <span class="hljs-keyword">AS</span> (sec <span class="hljs-type">INT</span>, seconds <span class="hljs-type">INTERVAL</span>, cnt_rows <span class="hljs-type">INT</span>);
</code></pre>
<p>ويمكن إجراء الاختبار المقابل بفهرس أفضل هكذا:</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX scale_fast <span class="hljs-keyword">ON</span> scale_data (section, id2, id1);

<span class="hljs-keyword">ALTER TABLE</span> scale_data CLUSTER <span class="hljs-keyword">ON</span> scale_fast;
CLUSTER scale_data;

<span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> test_scalability(<span class="hljs-string">&#x27;SELECT * &#x27;</span>
                      <span class="hljs-operator">||</span>  <span class="hljs-string">&#x27;FROM scale_data &#x27;</span>
                      <span class="hljs-operator">||</span> <span class="hljs-string">&#x27;WHERE section=$1 &#x27;</span>
                      <span class="hljs-operator">||</span>   <span class="hljs-string">&#x27;AND id2=$2&#x27;</span>, <span class="hljs-number">10</span>)
       <span class="hljs-keyword">AS</span> (sec <span class="hljs-type">INT</span>, seconds <span class="hljs-type">INTERVAL</span>, cnt_rows <span class="hljs-type">INT</span>);
</code></pre>
<p>ملاحظة:</p>
<ul>
<li>من اللازم عنقدة الجدول على الفهرس الجديد. وقد يستغرق ذلك وقتاً طويلاً جداً.</li>
</ul>
`,r={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:e,html:c};export{s as book,a as chapter,n as chapterTitle,r as default,e as headings,c as html,l as slug,p as title};
