const s="use-the-index-luke",a="sql-explain-plan-db2-getting-an-execution-plan",n="الحصول على خطة تنفيذ",p="index",l="الحصول على خطة تنفيذ",e=[{depth:2,id:"إنشاء-الجداول-المطلوبة-مرة-واحدة",text:"إنشاء الجداول المطلوبة (مرة واحدة)"},{depth:2,id:"شرح-العبارة",text:"شرح العبارة"},{depth:2,id:"عرض-خطة-التنفيذ-المخزنة",text:"عرض خطة التنفيذ المخزنة"}],r=`<p>الحصول على خطة تنفيذ من Db2 (LUW) إجراء من ثلاث خطوات، أولها إعداد يُنفَّذ مرة واحدة.</p>
<h2 id="إنشاء-الجداول-المطلوبة-مرة-واحدة">إنشاء الجداول المطلوبة (مرة واحدة)</h2>
<p>الطريقة الموصى بها لإنشاء جداول الشرح المطلوبة هي استدعاء هذا الإجراء:</p>
<pre><code>CALL SYSPROC.SYSINSTALLOBJECTS('EXPLAIN', 'C', 
CAST (NULL AS VARCHAR(128)), CAST (NULL AS VARCHAR(128)))
</code></pre>
<p>وسيثبّت هذا الجداول المطلوبة في المخطط <code>SYSTOOLS</code> (مثل <code>SYSTOOLS.EXPLAIN_STREAM</code>).</p>
<p>وتُشرح إجراءات التثبيت البديلة والتخصيصات في <a href="https://www.ibm.com/docs/en/db2/11.5.x?topic=sql-explain-tables">الوثائق</a>.</p>
<h2 id="شرح-العبارة">شرح العبارة</h2>
<p>سبق أي عبارة SQL بـ<code>explain plan for</code> لتخزين تفاصيل خطة التنفيذ في جداول الشرح.</p>
<p>ولا تُظهر هذه الخطوة خطة التنفيذ بعد؛ وإنما تخزّنها في قاعدة البيانات فقط.</p>
<pre><code>EXPLAIN PLAN FOR SELECT 1 FROM sysibm.sysdummy1
</code></pre>
<h2 id="عرض-خطة-التنفيذ-المخزنة">عرض خطة التنفيذ المخزنة</h2>
<p>تقدّم IBM بعض <a href="https://www.ibm.com/docs/en/db2/11.5.x?topic=facility-tools-collecting-analyzing-explain-information">الأدوات لعرض البيانات المخزنة في جداول الشرح</a>. غير أن صيغة الخرج ليست بالجدوى الممكنة، لذا أستخدم استعلام SQL خاصاً بي لعرض المعلومات التي تهمني عادةً. ووثائق Db2 توصي بذلك فعلاً.</p>
<p>تجد أدناه تعريف العرض <code>last_explained</code> الذي يعيد خطة شرح منسَّقة لآخر عبارة شُرحت للمستخدم الحالي في قاعدة البيانات هذه. يرجى ملاحظة أن نطاقه لا يقتصر على الجلسة الحالية. ويمكن استخدام العرض ببساطة هكذا:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">FROM</span> last_explained
</code></pre>
<p>وقد تبدو النتيجة هكذا. ويحتوي <a href="/arabic-cs-library/book/use-the-index-luke/sql-explain-plan-db2-operations/index">القسم التالي</a> تفاصيل كيفية تفسيرها.</p>
<pre><code>Explain Plan                                                                                        
----------------------------------------------
ID | Operation      |             Rows | Cost                                                       
 1 | RETURN         |                  |    0                                                       
 2 |  TBSCAN GENROW | 1 of 1 (100.00%) |    0                                                       
                                                                                                    
Predicate Information                                                                               
                                                                                                    
Explain plan by Markus Winand - NO WARRANTY                                                         
http://use-the-index-luke.com/s/last_explained
</code></pre>
<h4>تحذير</h4>
<p>هذا العرض تجريبي للغاية، ويُقدَّم كما هو دون أي ضمان. وقد وسّعته Ember Crooks ليشمل ActualRows إن توفرت. اقرأ <a href="https://datageek.blog/2014/11/18/db2-explain-output-similar-to-other-rdbmses/">مقالها</a> لتعرف كيفية جمعها.</p>
<p>يفترض العرض أن جداول الشرح في المخطط <code>SYSTOOLS</code>. وإذا كنت تستخدم مخططاً مختلفاً، فيجب تعديل العرض أدناه يدوياً.</p>
<p>الحد الأدنى للمتطلبات: Db2 (LUW) 9.7 FixPack 4</p>
<h4>نصيحة</h4>
<p>العرض متاح على <a href="https://github.com/fatalmind/DB2-last-explained">GitHub</a> (<a href="https://raw.githubusercontent.com/fatalmind/DB2-last-explained/master/last_explained.sql">تنزيل مباشر</a>).</p>
<pre><code class="language-sql"><span class="hljs-comment">-- Copyright (c) 2014-2017, Markus Winand - NO WARRANTY</span>
<span class="hljs-comment">-- Modifications by Ember Crooks - NO WARRANTY</span>
<span class="hljs-comment">-- Info &amp; license: http://use-the-index-luke.com/s/last_explained</span>
<span class="hljs-comment">--</span>
<span class="hljs-comment">--#SET TERMINATOR ;</span>

<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">OR</span> REPLACE <span class="hljs-keyword">VIEW</span> last_explained <span class="hljs-keyword">AS</span>
<span class="hljs-keyword">WITH</span> tree(operator_ID, level, path, explain_time, <span class="hljs-keyword">cycle</span>)
<span class="hljs-keyword">AS</span>
(
<span class="hljs-keyword">SELECT</span> <span class="hljs-number">1</span> operator_id 
     , <span class="hljs-number">0</span> level
     , <span class="hljs-built_in">CAST</span>(<span class="hljs-string">&#x27;001&#x27;</span> <span class="hljs-keyword">AS</span> <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">1000</span>)) path
     , <span class="hljs-built_in">max</span>(explain_time) explain_time
     , <span class="hljs-number">0</span>
  <span class="hljs-keyword">FROM</span> SYSTOOLS.EXPLAIN_OPERATOR O
 <span class="hljs-keyword">WHERE</span> O.EXPLAIN_REQUESTER <span class="hljs-operator">=</span> <span class="hljs-built_in">SESSION_USER</span>

<span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span>

<span class="hljs-keyword">SELECT</span> s.source_id
     , level <span class="hljs-operator">+</span> <span class="hljs-number">1</span>
     , tree.path <span class="hljs-operator">||</span> <span class="hljs-string">&#x27;/&#x27;</span> <span class="hljs-operator">||</span> LPAD(<span class="hljs-built_in">CAST</span>(s.source_id <span class="hljs-keyword">AS</span> <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">3</span>)), <span class="hljs-number">3</span>, <span class="hljs-string">&#x27;0&#x27;</span>)  path
     , tree.explain_time
     , <span class="hljs-built_in">POSITION</span>(<span class="hljs-string">&#x27;/&#x27;</span> <span class="hljs-operator">||</span> LPAD(<span class="hljs-built_in">CAST</span>(s.source_id <span class="hljs-keyword">AS</span> <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">3</span>)), <span class="hljs-number">3</span>, <span class="hljs-string">&#x27;0&#x27;</span>)  <span class="hljs-operator">||</span> <span class="hljs-string">&#x27;/&#x27;</span> <span class="hljs-keyword">IN</span> path <span class="hljs-keyword">USING</span> OCTETS)
  <span class="hljs-keyword">FROM</span> tree
     , SYSTOOLS.EXPLAIN_STREAM S
 <span class="hljs-keyword">WHERE</span> s.target_id    <span class="hljs-operator">=</span> tree.operator_id
   <span class="hljs-keyword">AND</span> s.explain_time <span class="hljs-operator">=</span> tree.explain_time
   <span class="hljs-keyword">AND</span> S.Object_Name <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NULL</span>
   <span class="hljs-keyword">AND</span> S.explain_requester <span class="hljs-operator">=</span> <span class="hljs-built_in">SESSION_USER</span>
   <span class="hljs-keyword">AND</span> tree.cycle <span class="hljs-operator">=</span> <span class="hljs-number">0</span>
   <span class="hljs-keyword">AND</span> level <span class="hljs-operator">&lt;</span> <span class="hljs-number">100</span>
)
<span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> 
  <span class="hljs-keyword">FROM</span> (
<span class="hljs-keyword">SELECT</span> &quot;Explain Plan&quot;
  <span class="hljs-keyword">FROM</span> (
<span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">CAST</span>(   LPAD(id,        <span class="hljs-built_in">MAX</span>(LENGTH(id))        <span class="hljs-keyword">OVER</span>(), <span class="hljs-string">&#x27; &#x27;</span>)
            <span class="hljs-operator">||</span> <span class="hljs-string">&#x27; | &#x27;</span> 
            <span class="hljs-operator">||</span> RPAD(operation, <span class="hljs-built_in">MAX</span>(LENGTH(operation)) <span class="hljs-keyword">OVER</span>(), <span class="hljs-string">&#x27; &#x27;</span>)
            <span class="hljs-operator">||</span> <span class="hljs-string">&#x27; | &#x27;</span> 
            <span class="hljs-operator">||</span> LPAD(<span class="hljs-keyword">rows</span>,      <span class="hljs-built_in">MAX</span>(LENGTH(<span class="hljs-keyword">rows</span>))      <span class="hljs-keyword">OVER</span>(), <span class="hljs-string">&#x27; &#x27;</span>)
            <span class="hljs-operator">||</span> <span class="hljs-string">&#x27; | &#x27;</span> 
            <span class="hljs-comment">-- Don&#x27;t show ActualRows columns if there are no actuals available at all </span>
            <span class="hljs-operator">||</span> <span class="hljs-keyword">CASE</span> <span class="hljs-keyword">WHEN</span> <span class="hljs-built_in">COUNT</span>(ActualRows) <span class="hljs-keyword">OVER</span> () <span class="hljs-operator">&gt;</span> <span class="hljs-number">1</span> <span class="hljs-comment">-- the heading &#x27;ActualRows&#x27; is always present, so &quot;1&quot; means no OTHER values</span>
                    <span class="hljs-keyword">THEN</span> LPAD(ActualRows, <span class="hljs-built_in">MAX</span>(LENGTH(ActualRows)) <span class="hljs-keyword">OVER</span>(), <span class="hljs-string">&#x27; &#x27;</span>) <span class="hljs-operator">||</span> <span class="hljs-string">&#x27; | &#x27;</span> 
                    <span class="hljs-keyword">ELSE</span> <span class="hljs-string">&#x27;&#x27;</span>
               <span class="hljs-keyword">END</span>
            <span class="hljs-operator">||</span> LPAD(cost,      <span class="hljs-built_in">MAX</span>(LENGTH(cost))      <span class="hljs-keyword">OVER</span>(), <span class="hljs-string">&#x27; &#x27;</span>)
         <span class="hljs-keyword">AS</span> <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">100</span>)) &quot;Explain Plan&quot;
     , path
  <span class="hljs-keyword">FROM</span> (
<span class="hljs-keyword">SELECT</span> <span class="hljs-string">&#x27;ID&#x27;</span> ID
     , <span class="hljs-string">&#x27;Operation&#x27;</span> Operation
     , <span class="hljs-string">&#x27;Rows&#x27;</span> <span class="hljs-keyword">Rows</span>
     , <span class="hljs-string">&#x27;ActualRows&#x27;</span> ActualRows
     , <span class="hljs-string">&#x27;Cost&#x27;</span> Cost
     , <span class="hljs-string">&#x27;0&#x27;</span> Path
  <span class="hljs-keyword">FROM</span> SYSIBM.SYSDUMMY1
<span class="hljs-comment">-- <span class="hljs-doctag">TODO:</span> UNION ALL yields duplicate. where do they come from?</span>
<span class="hljs-keyword">UNION</span>
<span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">CAST</span>(tree.operator_id <span class="hljs-keyword">as</span> <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">254</span>)) ID
     , <span class="hljs-built_in">CAST</span>(LPAD(<span class="hljs-string">&#x27; &#x27;</span>, tree.level, <span class="hljs-string">&#x27; &#x27;</span>)
       <span class="hljs-operator">||</span> <span class="hljs-keyword">CASE</span> <span class="hljs-keyword">WHEN</span> tree.cycle <span class="hljs-operator">=</span> <span class="hljs-number">1</span>
               <span class="hljs-keyword">THEN</span> <span class="hljs-string">&#x27;(cycle) &#x27;</span>
               <span class="hljs-keyword">ELSE</span> <span class="hljs-string">&#x27;&#x27;</span>
          <span class="hljs-keyword">END</span>     
       <span class="hljs-operator">||</span> <span class="hljs-built_in">COALESCE</span> (
             <span class="hljs-built_in">TRIM</span>(O.Operator_Type)
          <span class="hljs-operator">||</span> <span class="hljs-built_in">COALESCE</span>(<span class="hljs-string">&#x27; (&#x27;</span> <span class="hljs-operator">||</span> argument <span class="hljs-operator">||</span> <span class="hljs-string">&#x27;)&#x27;</span>, <span class="hljs-string">&#x27;&#x27;</span>) 
          <span class="hljs-operator">||</span> <span class="hljs-string">&#x27; &#x27;</span>
          <span class="hljs-operator">||</span> <span class="hljs-built_in">COALESCE</span>(S.Object_Name,<span class="hljs-string">&#x27;&#x27;</span>)
          , <span class="hljs-string">&#x27;&#x27;</span>
          )
       <span class="hljs-keyword">AS</span> <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">254</span>)) <span class="hljs-keyword">AS</span> OPERATION
     , <span class="hljs-built_in">COALESCE</span>(<span class="hljs-built_in">CAST</span>(<span class="hljs-keyword">rows</span> <span class="hljs-keyword">AS</span> <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">254</span>)), <span class="hljs-string">&#x27;&#x27;</span>) <span class="hljs-keyword">Rows</span>
     , <span class="hljs-built_in">CAST</span>(ActualRows <span class="hljs-keyword">as</span> <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">254</span>)) ActualRows <span class="hljs-comment">-- <span class="hljs-doctag">note:</span> no coalesce</span>
     , <span class="hljs-built_in">COALESCE</span>(<span class="hljs-built_in">CAST</span>(<span class="hljs-built_in">CAST</span>(O.Total_Cost <span class="hljs-keyword">AS</span> <span class="hljs-type">BIGINT</span>) <span class="hljs-keyword">AS</span> <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">254</span>)), <span class="hljs-string">&#x27;&#x27;</span>) Cost
     , path
  <span class="hljs-keyword">FROM</span> tree
  <span class="hljs-keyword">LEFT</span> <span class="hljs-keyword">JOIN</span> ( <span class="hljs-keyword">SELECT</span> i.source_id
              , i.target_id
              , <span class="hljs-built_in">CAST</span>(<span class="hljs-built_in">CAST</span>(ROUND(o.stream_count) <span class="hljs-keyword">AS</span> <span class="hljs-type">BIGINT</span>) <span class="hljs-keyword">AS</span> <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">12</span>))
                <span class="hljs-operator">||</span> <span class="hljs-string">&#x27; of &#x27;</span>
                <span class="hljs-operator">||</span> <span class="hljs-built_in">CAST</span> (total_rows <span class="hljs-keyword">AS</span> <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">12</span>))
                <span class="hljs-operator">||</span> <span class="hljs-keyword">CASE</span> <span class="hljs-keyword">WHEN</span> total_rows <span class="hljs-operator">&gt;</span> <span class="hljs-number">0</span>
                         <span class="hljs-keyword">AND</span> ROUND(o.stream_count) <span class="hljs-operator">&lt;=</span> total_rows <span class="hljs-keyword">THEN</span>
                   <span class="hljs-string">&#x27; (&#x27;</span>
                   <span class="hljs-operator">||</span> LPAD(<span class="hljs-built_in">CAST</span> (ROUND(ROUND(o.stream_count)<span class="hljs-operator">/</span>total_rows<span class="hljs-operator">*</span><span class="hljs-number">100</span>,<span class="hljs-number">2</span>)
                          <span class="hljs-keyword">AS</span> <span class="hljs-type">NUMERIC</span>(<span class="hljs-number">5</span>,<span class="hljs-number">2</span>)), <span class="hljs-number">6</span>, <span class="hljs-string">&#x27; &#x27;</span>)
                   <span class="hljs-operator">||</span> <span class="hljs-string">&#x27;%)&#x27;</span>
                   <span class="hljs-keyword">ELSE</span> <span class="hljs-string">&#x27;&#x27;</span>
                   <span class="hljs-keyword">END</span> <span class="hljs-keyword">rows</span>
              , <span class="hljs-keyword">CASE</span> <span class="hljs-keyword">WHEN</span> act.actual_value <span class="hljs-keyword">is</span> <span class="hljs-keyword">not null</span> <span class="hljs-keyword">then</span>
                <span class="hljs-built_in">CAST</span>(<span class="hljs-built_in">CAST</span>(ROUND(act.actual_value) <span class="hljs-keyword">AS</span> <span class="hljs-type">BIGINT</span>) <span class="hljs-keyword">AS</span> <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">12</span>))
                <span class="hljs-operator">||</span> <span class="hljs-string">&#x27; of &#x27;</span>
                <span class="hljs-operator">||</span> <span class="hljs-built_in">CAST</span> (total_rows <span class="hljs-keyword">AS</span> <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">12</span>))
                <span class="hljs-operator">||</span> <span class="hljs-keyword">CASE</span> <span class="hljs-keyword">WHEN</span> total_rows <span class="hljs-operator">&gt;</span> <span class="hljs-number">0</span> <span class="hljs-keyword">THEN</span>
                   <span class="hljs-string">&#x27; (&#x27;</span>
                   <span class="hljs-operator">||</span> LPAD(<span class="hljs-built_in">CAST</span> (ROUND(ROUND(act.actual_value)<span class="hljs-operator">/</span>total_rows<span class="hljs-operator">*</span><span class="hljs-number">100</span>,<span class="hljs-number">2</span>)
                          <span class="hljs-keyword">AS</span> <span class="hljs-type">NUMERIC</span>(<span class="hljs-number">5</span>,<span class="hljs-number">2</span>)), <span class="hljs-number">6</span>, <span class="hljs-string">&#x27; &#x27;</span>)
                   <span class="hljs-operator">||</span> <span class="hljs-string">&#x27;%)&#x27;</span>
                   <span class="hljs-keyword">ELSE</span> <span class="hljs-keyword">NULL</span>
                   <span class="hljs-keyword">END</span> <span class="hljs-keyword">END</span> ActualRows
              , i.object_name
              , i.explain_time
         <span class="hljs-keyword">FROM</span> (<span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">MAX</span>(source_id) source_id
                    , target_id
                    , <span class="hljs-built_in">MIN</span>(<span class="hljs-built_in">CAST</span>(ROUND(stream_count,<span class="hljs-number">0</span>) <span class="hljs-keyword">AS</span> <span class="hljs-type">BIGINT</span>)) total_rows
                    , <span class="hljs-built_in">CAST</span>(<span class="hljs-built_in">LISTAGG</span>(object_name) <span class="hljs-keyword">AS</span> <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">50</span>)) object_name
                    , explain_time
                 <span class="hljs-keyword">FROM</span> SYSTOOLS.EXPLAIN_STREAM
                <span class="hljs-keyword">WHERE</span> explain_time <span class="hljs-operator">=</span> (<span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">MAX</span>(explain_time)
                                        <span class="hljs-keyword">FROM</span> SYSTOOLS.EXPLAIN_OPERATOR
                                       <span class="hljs-keyword">WHERE</span> EXPLAIN_REQUESTER <span class="hljs-operator">=</span> <span class="hljs-built_in">SESSION_USER</span>
                                     )
                <span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> target_id, explain_time
              ) I
         <span class="hljs-keyword">LEFT</span> <span class="hljs-keyword">JOIN</span> SYSTOOLS.EXPLAIN_STREAM O
           <span class="hljs-keyword">ON</span> (    I.target_id<span class="hljs-operator">=</span>o.source_id
               <span class="hljs-keyword">AND</span> I.explain_time <span class="hljs-operator">=</span> o.explain_time
               <span class="hljs-keyword">AND</span> O.EXPLAIN_REQUESTER <span class="hljs-operator">=</span> <span class="hljs-built_in">SESSION_USER</span>
              )
         <span class="hljs-keyword">LEFT</span> <span class="hljs-keyword">JOIN</span> SYSTOOLS.EXPLAIN_ACTUALS act
           <span class="hljs-keyword">ON</span> (    act.operator_id  <span class="hljs-operator">=</span> i.target_id
               <span class="hljs-keyword">AND</span> act.explain_time <span class="hljs-operator">=</span> i.explain_time
               <span class="hljs-keyword">AND</span> act.explain_requester <span class="hljs-operator">=</span> <span class="hljs-built_in">SESSION_USER</span>
               <span class="hljs-keyword">AND</span> act.ACTUAL_TYPE  <span class="hljs-keyword">like</span> <span class="hljs-string">&#x27;CARDINALITY%&#x27;</span>
              )
       ) s
    <span class="hljs-keyword">ON</span> (    s.target_id    <span class="hljs-operator">=</span> tree.operator_id
        <span class="hljs-keyword">AND</span> s.explain_time <span class="hljs-operator">=</span> tree.explain_time
       )
  <span class="hljs-keyword">LEFT</span> <span class="hljs-keyword">JOIN</span> SYSTOOLS.EXPLAIN_OPERATOR O
    <span class="hljs-keyword">ON</span> (    o.operator_id  <span class="hljs-operator">=</span> tree.operator_id
        <span class="hljs-keyword">AND</span> o.explain_time <span class="hljs-operator">=</span> tree.explain_time
        <span class="hljs-keyword">AND</span> o.explain_requester <span class="hljs-operator">=</span> <span class="hljs-built_in">SESSION_USER</span>
       ) 
  <span class="hljs-keyword">LEFT</span> <span class="hljs-keyword">JOIN</span> (<span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">LISTAGG</span> (<span class="hljs-keyword">CASE</span> argument_type
                             <span class="hljs-keyword">WHEN</span> <span class="hljs-string">&#x27;UNIQUE&#x27;</span> <span class="hljs-keyword">THEN</span>
                                  <span class="hljs-keyword">CASE</span> <span class="hljs-keyword">WHEN</span> argument_value <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;TRUE&#x27;</span>
                                       <span class="hljs-keyword">THEN</span> <span class="hljs-string">&#x27;UNIQUE&#x27;</span>
                                  <span class="hljs-keyword">ELSE</span> <span class="hljs-keyword">NULL</span>
                                  <span class="hljs-keyword">END</span>
                             <span class="hljs-keyword">WHEN</span> <span class="hljs-string">&#x27;TRUNCSRT&#x27;</span> <span class="hljs-keyword">THEN</span>
                                  <span class="hljs-keyword">CASE</span> <span class="hljs-keyword">WHEN</span> argument_value <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;TRUE&#x27;</span>
                                       <span class="hljs-keyword">THEN</span> <span class="hljs-string">&#x27;TOP-N&#x27;</span>
                                  <span class="hljs-keyword">ELSE</span> <span class="hljs-keyword">NULL</span>
                                  <span class="hljs-keyword">END</span>   
                             <span class="hljs-keyword">WHEN</span> <span class="hljs-string">&#x27;SCANDIR&#x27;</span> <span class="hljs-keyword">THEN</span>
                                  <span class="hljs-keyword">CASE</span> <span class="hljs-keyword">WHEN</span> argument_value <span class="hljs-operator">!=</span> <span class="hljs-string">&#x27;FORWARD&#x27;</span>
                                       <span class="hljs-keyword">THEN</span> argument_value
                                  <span class="hljs-keyword">ELSE</span> <span class="hljs-keyword">NULL</span>
                                  <span class="hljs-keyword">END</span>                     
                             <span class="hljs-keyword">ELSE</span> argument_value     
                             <span class="hljs-keyword">END</span>
                           , <span class="hljs-string">&#x27; &#x27;</span>) argument
                  , operator_id
                  , explain_time
               <span class="hljs-keyword">FROM</span> SYSTOOLS.EXPLAIN_ARGUMENT EA
              <span class="hljs-keyword">WHERE</span> argument_type <span class="hljs-keyword">IN</span> (<span class="hljs-string">&#x27;AGGMODE&#x27;</span>   <span class="hljs-comment">-- GRPBY</span>
                                     , <span class="hljs-string">&#x27;UNIQUE&#x27;</span>, <span class="hljs-string">&#x27;TRUNCSRT&#x27;</span> <span class="hljs-comment">-- SORT</span>
                                     , <span class="hljs-string">&#x27;SCANDIR&#x27;</span> <span class="hljs-comment">-- IXSCAN, TBSCAN</span>
                                     , <span class="hljs-string">&#x27;OUTERJN&#x27;</span> <span class="hljs-comment">-- JOINs</span>
                                     )
                <span class="hljs-keyword">AND</span> explain_requester <span class="hljs-operator">=</span> <span class="hljs-built_in">SESSION_USER</span>
              <span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> explain_time, operator_id

            ) A
    <span class="hljs-keyword">ON</span> (    a.operator_id  <span class="hljs-operator">=</span> tree.operator_id
        <span class="hljs-keyword">AND</span> a.explain_time <span class="hljs-operator">=</span> tree.explain_time
       )
     ) O
<span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span>
<span class="hljs-keyword">VALUES</span> (<span class="hljs-string">&#x27;Explain plan (c) 2014-2017 by Markus Winand - NO WARRANTY - V20171102&#x27;</span>,<span class="hljs-string">&#x27;Z0&#x27;</span>)
    ,  (<span class="hljs-string">&#x27;Modifications by Ember Crooks - NO WARRANTY&#x27;</span>,<span class="hljs-string">&#x27;Z1&#x27;</span>)
    ,  (<span class="hljs-string">&#x27;http://use-the-index-luke.com/s/last_explained&#x27;</span>,<span class="hljs-string">&#x27;Z2&#x27;</span>)
    ,  (<span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;A&#x27;</span>)
    ,  (<span class="hljs-string">&#x27;&#x27;</span>, <span class="hljs-string">&#x27;Y&#x27;</span>)
    ,  (<span class="hljs-string">&#x27;Predicate Information&#x27;</span>, <span class="hljs-string">&#x27;AA&#x27;</span>)
<span class="hljs-keyword">UNION</span> <span class="hljs-keyword">ALL</span>
<span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">CAST</span> (LPAD(<span class="hljs-keyword">CASE</span> <span class="hljs-keyword">WHEN</span> operator_id <span class="hljs-operator">=</span> <span class="hljs-built_in">LAG</span>  (operator_id)
                                          <span class="hljs-keyword">OVER</span> (<span class="hljs-keyword">PARTITION</span> <span class="hljs-keyword">BY</span> operator_id
                                                    <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> pred_order
                                               )
                       <span class="hljs-keyword">THEN</span> <span class="hljs-string">&#x27;&#x27;</span>
                       <span class="hljs-keyword">ELSE</span> operator_id <span class="hljs-operator">||</span> <span class="hljs-string">&#x27; - &#x27;</span>
                  <span class="hljs-keyword">END</span>
                , <span class="hljs-built_in">MAX</span>(LENGTH(operator_id )<span class="hljs-operator">+</span><span class="hljs-number">4</span>) <span class="hljs-keyword">OVER</span>()
                , <span class="hljs-string">&#x27; &#x27;</span>)
             <span class="hljs-operator">||</span> how_applied
             <span class="hljs-operator">||</span> <span class="hljs-string">&#x27; &#x27;</span> 
             <span class="hljs-operator">||</span> predicate_text
          <span class="hljs-keyword">AS</span> <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">100</span>)) &quot;Predicate Information&quot;
     , <span class="hljs-string">&#x27;P&#x27;</span> <span class="hljs-operator">||</span> LPAD(id_order, <span class="hljs-number">5</span>, <span class="hljs-string">&#x27;0&#x27;</span>) <span class="hljs-operator">||</span> pred_order path
  <span class="hljs-keyword">FROM</span> (<span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">CAST</span>(operator_id <span class="hljs-keyword">AS</span> <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">254</span>)) operator_id
             , LPAD(<span class="hljs-built_in">trim</span>(how_applied)
                  ,  <span class="hljs-built_in">MAX</span> (LENGTH(<span class="hljs-built_in">TRIM</span>(how_applied)))
                    <span class="hljs-keyword">OVER</span> (<span class="hljs-keyword">PARTITION</span> <span class="hljs-keyword">BY</span> operator_id)
                  , <span class="hljs-string">&#x27; &#x27;</span>
               ) how_applied
               <span class="hljs-comment">-- next: capped to length 80 to avoid</span>
               <span class="hljs-comment">-- SQL0445W  Value &quot;...&quot; has been truncated.  SQLSTATE=01004</span>
               <span class="hljs-comment">-- error when long literal values may appear (space padded!)</span>
             , <span class="hljs-built_in">CAST</span>(substr(predicate_text, <span class="hljs-number">1</span>, <span class="hljs-number">80</span>) <span class="hljs-keyword">AS</span> <span class="hljs-type">VARCHAR</span>(<span class="hljs-number">80</span>)) predicate_text
             , <span class="hljs-keyword">CASE</span> how_applied <span class="hljs-keyword">WHEN</span> <span class="hljs-string">&#x27;START&#x27;</span> <span class="hljs-keyword">THEN</span> <span class="hljs-string">&#x27;1&#x27;</span>
                                <span class="hljs-keyword">WHEN</span> <span class="hljs-string">&#x27;STOP&#x27;</span>  <span class="hljs-keyword">THEN</span> <span class="hljs-string">&#x27;2&#x27;</span>
                                <span class="hljs-keyword">WHEN</span> <span class="hljs-string">&#x27;SARG&#x27;</span>  <span class="hljs-keyword">THEN</span> <span class="hljs-string">&#x27;3&#x27;</span>
                                <span class="hljs-keyword">ELSE</span> <span class="hljs-string">&#x27;9&#x27;</span>
               <span class="hljs-keyword">END</span> pred_order
             , operator_id id_order
          <span class="hljs-keyword">FROM</span> systools.explain_predicate p
         <span class="hljs-keyword">WHERE</span> explain_time <span class="hljs-operator">=</span> (<span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">MAX</span>(explain_time)
                                 <span class="hljs-keyword">FROM</span> systools.explain_operator)
       )
)
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> path
);
</code></pre>
<p>مهام يجب إنجازها:</p>
<ul>
<li>معرّف المعامل يعطي حالياً معرّف المعامل الفيزيائي كما هو مخزّن في جداول الشرح. وقد يكون الأنسب عرض رقم سطر كما تفعل Oracle DBMS_XPLAN ليكون العثور على معرّف معيّن أسهل.</li>
<li>الإشارة إلى وجود المُسندات بنجمة بجانب معرّف العملية كما تفعل DBMS_PLAN في Oracle. وقد يكون جيداً أيضاً الإشارة إلى وجود مُسندات ترشيح باستخدام محرف آخر (مثل !). وستكون ميزات أكثر تطوراً ممكنة: *وجود مُسندَي START وSTOP &gt;وجود START دون مُسند STOP &lt;وجود STOP دون مُسند START !وجود مُسند SARG (إضافةً إلى !).</li>
<li>دالة استدلالية للإشارة إلى جمل Top-N: إذا انخفض عدد الصفوف لعملية TBSCAN أو IXSCAN دون وجود مُسندات، فلا بد أن يكون حد Top-N. وهذا المنطق ناقص بالطبع.</li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:p,title:l,headings:e,html:r};export{s as book,a as chapter,n as chapterTitle,c as default,e as headings,r as html,p as slug,l as title};
