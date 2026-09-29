const s="use-the-index-luke",a="sql-example-schema-sql-server-partial-results",n="SQL Server Scripts for “Partial Results”",l="index",p="سكربتات SQL Server لـ«النتائج الجزئية»",e=[{depth:2,id:"الاستعلام-عن-صفوف-top-n",text:"الاستعلام عن صفوف Top-N"},{depth:2,id:"التنقل-عبر-الصفحات-في-النتائج",text:"التنقّل عبر الصفحات في النتائج"},{depth:2,id:"دوال-النوافذ",text:"دوال النوافذ"}],c=`<p>يحتوي هذا القسم على عبارتَي <code>create</code> و<code>insert</code> لتشغيل أمثلة <a href="/arabic-cs-library/book/use-the-index-luke/sql-partial-results/index">الفصل 7<em>النتائج الجزئية</em></a> في قاعدة بيانات SQL Server.</p>
<h2 id="الاستعلام-عن-صفوف-top-n">الاستعلام عن صفوف Top-N</h2>
<p>نَهج اختبار قابلية التوسع في استعلامات Top-N هو نفسه المستخدم في فصل «<a href="/arabic-cs-library/book/use-the-index-luke/sql-example-schema-sql-server-performance-testing-scalability/index">الاختبار وقابلية التوسع</a>».</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">FUNCTION</span> [dbo].test_top_n_scalability (<span class="hljs-variable">@n</span> <span class="hljs-type">int</span>)
   <span class="hljs-keyword">RETURNS</span> <span class="hljs-variable">@table</span> <span class="hljs-keyword">TABLE</span>
( section  <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span> <span class="hljs-keyword">PRIMARY KEY</span>,
  duration <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>,
  <span class="hljs-keyword">rows</span>     <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>)
<span class="hljs-keyword">AS</span> <span class="hljs-keyword">BEGIN</span>
   <span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@strt</span> DATETIME2
   <span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@iter</span> <span class="hljs-type">INT</span>
   <span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@xsec</span> <span class="hljs-type">INT</span>
   <span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@xcnt</span> <span class="hljs-type">INT</span>
   <span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@xrnd</span> <span class="hljs-type">INT</span>

   <span class="hljs-keyword">SET</span> <span class="hljs-variable">@iter</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>
   WHILE (<span class="hljs-variable">@iter</span> <span class="hljs-operator">&lt;</span> <span class="hljs-variable">@n</span>) <span class="hljs-keyword">BEGIN</span>
      <span class="hljs-keyword">SET</span> <span class="hljs-variable">@xsec</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>
      WHILE (<span class="hljs-variable">@xsec</span> <span class="hljs-operator">&lt;</span> <span class="hljs-number">300</span>) <span class="hljs-keyword">BEGIN</span>
         <span class="hljs-keyword">SET</span> <span class="hljs-variable">@strt</span> <span class="hljs-operator">=</span> SYSDATETIME()

         <span class="hljs-keyword">SELECT</span> <span class="hljs-variable">@xcnt</span> <span class="hljs-operator">=</span> <span class="hljs-built_in">COUNT</span>(<span class="hljs-operator">*</span>)
           <span class="hljs-keyword">FROM</span> (<span class="hljs-keyword">SELECT</span> TOP <span class="hljs-number">100</span> <span class="hljs-operator">*</span>
                   <span class="hljs-keyword">FROM</span> scale_data
                  <span class="hljs-keyword">WHERE</span> section<span class="hljs-operator">=</span><span class="hljs-variable">@xsec</span>
                  <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> id2) tlb; 

         IF <span class="hljs-variable">@iter</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span> <span class="hljs-keyword">BEGIN</span>
           <span class="hljs-keyword">INSERT INTO</span> <span class="hljs-variable">@table</span>
           <span class="hljs-keyword">VALUES</span> ( <span class="hljs-variable">@xsec</span>
                  , datediff(microsecond, <span class="hljs-variable">@strt</span>, SYSDATETIME())
                  , <span class="hljs-variable">@xcnt</span>);
         <span class="hljs-keyword">END</span>; <span class="hljs-keyword">ELSE</span> <span class="hljs-keyword">BEGIN</span>
           <span class="hljs-keyword">UPDATE</span> <span class="hljs-variable">@table</span>
              <span class="hljs-keyword">SET</span> duration <span class="hljs-operator">=</span> duration 
                  <span class="hljs-operator">+</span> datediff(microsecond, <span class="hljs-variable">@strt</span>, SYSDATETIME())
                , <span class="hljs-keyword">rows</span> <span class="hljs-operator">=</span> <span class="hljs-keyword">rows</span> <span class="hljs-operator">+</span> <span class="hljs-variable">@xcnt</span>
            <span class="hljs-keyword">WHERE</span> section <span class="hljs-operator">=</span> <span class="hljs-variable">@xsec</span>
         <span class="hljs-keyword">END</span>;
         <span class="hljs-keyword">SET</span> <span class="hljs-variable">@xsec</span> <span class="hljs-operator">=</span> <span class="hljs-variable">@xsec</span> <span class="hljs-operator">+</span> <span class="hljs-number">1</span>
      <span class="hljs-keyword">END</span>;
      <span class="hljs-keyword">SET</span> <span class="hljs-variable">@iter</span> <span class="hljs-operator">=</span> <span class="hljs-variable">@iter</span> <span class="hljs-operator">+</span> <span class="hljs-number">1</span>
   <span class="hljs-keyword">END</span>;

   <span class="hljs-keyword">RETURN</span>;
<span class="hljs-keyword">END</span>;

GO
</code></pre>
<p>أولاً، باستخدام Top-N متدفق مع فهرس يغطي جملة <code>order by</code>:</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX scale_fast <span class="hljs-keyword">ON</span> scale_data(section, id2, id1);
GO

<span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">FROM</span> [dbo].[test_top_n_scalability] (<span class="hljs-number">10</span>);
GO
</code></pre>
<p>ثم باستخدام فهرس لجملة <code>where</code> فقط. غير أن SQL Server يرفض استخدام الفهرس ما لم يشمل العمود ID2؛ لذا فهي ليست حالة الاختبار نفسها تماماً كما في قواعد البيانات الأخرى، لكنها تُظهر قابلية التوسع مع ذلك.</p>
<pre><code class="language-sql"><span class="hljs-keyword">DROP</span> INDEX scale_fast <span class="hljs-keyword">ON</span> scale_data;
GO

<span class="hljs-keyword">CREATE</span> INDEX scale_slow <span class="hljs-keyword">ON</span> scale_data(section, id1, id2);
GO

<span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">FROM</span> [dbo].[test_top_n_scalability] (<span class="hljs-number">10</span>);
GO
</code></pre>
<h2 id="التنقل-عبر-الصفحات-في-النتائج">التنقّل عبر الصفحات في النتائج</h2>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">FUNCTION</span> [dbo].test_topn_scalability (<span class="hljs-variable">@n</span> <span class="hljs-type">int</span>)
   <span class="hljs-keyword">RETURNS</span> <span class="hljs-variable">@table</span> <span class="hljs-keyword">TABLE</span>
( section <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>,
  mode    <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>,
  page    <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>,
  seconds <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>)
<span class="hljs-keyword">AS</span> <span class="hljs-keyword">BEGIN</span>
  <span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@strt</span> DATETIME2
  <span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@iter</span> <span class="hljs-type">INT</span>
  <span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@xmde</span> <span class="hljs-type">INT</span>
  <span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@page</span> <span class="hljs-type">INT</span>
  <span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@xsec</span> <span class="hljs-type">INT</span>
  <span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@c1</span> <span class="hljs-type">INT</span>, <span class="hljs-variable">@c2</span> <span class="hljs-type">INT</span>;
  <span class="hljs-keyword">DECLARE</span> <span class="hljs-variable">@cont</span> <span class="hljs-keyword">TABLE</span> (
    section <span class="hljs-type">int</span> <span class="hljs-keyword">NOT NULL</span>,
    c1      <span class="hljs-type">int</span> <span class="hljs-keyword">NOT NULL</span>, 
    c2      <span class="hljs-type">int</span> <span class="hljs-keyword">NOT NULL</span>
  );

  <span class="hljs-keyword">SET</span> <span class="hljs-variable">@iter</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>
  WHILE (<span class="hljs-variable">@iter</span> <span class="hljs-operator">&lt;</span> <span class="hljs-variable">@n</span>) <span class="hljs-keyword">BEGIN</span>
    <span class="hljs-keyword">SET</span> <span class="hljs-variable">@xmde</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>
    WHILE (<span class="hljs-variable">@xmde</span> <span class="hljs-operator">&lt;=</span> <span class="hljs-number">1</span>) <span class="hljs-keyword">BEGIN</span>
      <span class="hljs-keyword">SET</span> <span class="hljs-variable">@page</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>
      WHILE (<span class="hljs-variable">@page</span> <span class="hljs-operator">&lt;=</span> <span class="hljs-number">100</span>) <span class="hljs-keyword">BEGIN</span>
        <span class="hljs-keyword">SET</span> <span class="hljs-variable">@xsec</span> <span class="hljs-operator">=</span> <span class="hljs-number">5</span>
        WHILE (<span class="hljs-variable">@xsec</span> <span class="hljs-operator">&lt;</span> <span class="hljs-number">300</span>) <span class="hljs-keyword">BEGIN</span>
          <span class="hljs-keyword">SET</span> <span class="hljs-variable">@strt</span> <span class="hljs-operator">=</span> SYSDATETIME()

          IF <span class="hljs-variable">@xmde</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span> <span class="hljs-keyword">OR</span> <span class="hljs-variable">@page</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span> <span class="hljs-keyword">BEGIN</span>
            <span class="hljs-keyword">DECLARE</span> <span class="hljs-keyword">sql</span> <span class="hljs-keyword">CURSOR</span> FAST_FORWARD <span class="hljs-keyword">FOR</span>
             <span class="hljs-keyword">SELECT</span> id2, id1
               <span class="hljs-keyword">FROM</span> (<span class="hljs-keyword">SELECT</span> id2, id1
                          , <span class="hljs-built_in">ROW_NUMBER</span>() <span class="hljs-keyword">OVER</span> (<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> id2, id1) rn
                       <span class="hljs-keyword">FROM</span> scale_data
                      <span class="hljs-keyword">WHERE</span> section <span class="hljs-operator">=</span> <span class="hljs-variable">@xsec</span>
                    ) <span class="hljs-keyword">result</span>
              <span class="hljs-keyword">WHERE</span> rn <span class="hljs-operator">&gt;</span>  <span class="hljs-number">100</span> <span class="hljs-operator">*</span> (<span class="hljs-variable">@page</span>  )
                <span class="hljs-keyword">AND</span> rn <span class="hljs-operator">&lt;=</span> <span class="hljs-number">100</span> <span class="hljs-operator">*</span> (<span class="hljs-variable">@page</span><span class="hljs-operator">+</span><span class="hljs-number">1</span>);
         
          <span class="hljs-keyword">END</span>; <span class="hljs-keyword">ELSE</span> <span class="hljs-keyword">BEGIN</span>
            <span class="hljs-keyword">SELECT</span> <span class="hljs-variable">@c2</span> <span class="hljs-operator">=</span> c2, <span class="hljs-variable">@c1</span> <span class="hljs-operator">=</span> c1 <span class="hljs-keyword">FROM</span> <span class="hljs-variable">@cont</span> <span class="hljs-keyword">WHERE</span> section <span class="hljs-operator">=</span> <span class="hljs-variable">@xsec</span>;
            <span class="hljs-keyword">DECLARE</span> <span class="hljs-keyword">sql</span> <span class="hljs-keyword">CURSOR</span> FAST_FORWARD <span class="hljs-keyword">FOR</span>
             <span class="hljs-keyword">SELECT</span> TOP <span class="hljs-number">100</span> id2, id1
               <span class="hljs-keyword">FROM</span> scale_data
              <span class="hljs-keyword">WHERE</span> section <span class="hljs-operator">=</span> <span class="hljs-variable">@xsec</span>
                <span class="hljs-keyword">AND</span> id2 <span class="hljs-operator">&gt;=</span> <span class="hljs-variable">@c2</span>
                <span class="hljs-keyword">AND</span> ( 
                       (id2 <span class="hljs-operator">=</span> <span class="hljs-variable">@c2</span> <span class="hljs-keyword">AND</span> id1 <span class="hljs-operator">&gt;</span> <span class="hljs-variable">@c1</span>)
                    <span class="hljs-keyword">OR</span> 
                       (id2 <span class="hljs-operator">&gt;</span> <span class="hljs-variable">@c2</span>)
                    )
              <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> id2, id1
          <span class="hljs-keyword">END</span>;

          <span class="hljs-keyword">OPEN</span> <span class="hljs-keyword">sql</span>; <span class="hljs-keyword">FETCH</span> NEXT <span class="hljs-keyword">FROM</span> <span class="hljs-keyword">sql</span> <span class="hljs-keyword">INTO</span> <span class="hljs-variable">@c2</span>, <span class="hljs-variable">@c1</span>;
          WHILE @<span class="hljs-variable">@FETCH_STATUS</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span> <span class="hljs-keyword">BEGIN</span>
            <span class="hljs-keyword">FETCH</span> NEXT <span class="hljs-keyword">FROM</span> <span class="hljs-keyword">sql</span> <span class="hljs-keyword">INTO</span> <span class="hljs-variable">@c2</span>, <span class="hljs-variable">@c1</span>;
          <span class="hljs-keyword">END</span>
          <span class="hljs-keyword">CLOSE</span> <span class="hljs-keyword">sql</span>; <span class="hljs-keyword">DEALLOCATE</span> <span class="hljs-keyword">sql</span>;

          <span class="hljs-keyword">INSERT INTO</span> <span class="hljs-variable">@table</span>
          <span class="hljs-keyword">VALUES</span> ( <span class="hljs-variable">@xsec</span>
                 , <span class="hljs-variable">@xmde</span>
                 , <span class="hljs-variable">@page</span>
                 , datediff(microsecond, <span class="hljs-variable">@strt</span>, SYSDATETIME())
                 );
          <span class="hljs-keyword">UPDATE</span> <span class="hljs-variable">@cont</span> <span class="hljs-keyword">set</span> c1 <span class="hljs-operator">=</span> <span class="hljs-variable">@c1</span>, c2 <span class="hljs-operator">=</span> <span class="hljs-variable">@c2</span>
           <span class="hljs-keyword">WHERE</span> section <span class="hljs-operator">=</span> <span class="hljs-variable">@xsec</span>;
          IF @<span class="hljs-variable">@ROWCOUNT</span> <span class="hljs-operator">=</span> <span class="hljs-number">0</span>
           <span class="hljs-keyword">INSERT INTO</span> <span class="hljs-variable">@cont</span> <span class="hljs-keyword">VALUES</span>(<span class="hljs-variable">@xsec</span>, <span class="hljs-variable">@c1</span>, <span class="hljs-variable">@c2</span>);
          <span class="hljs-keyword">SET</span> <span class="hljs-variable">@xsec</span> <span class="hljs-operator">=</span> <span class="hljs-variable">@xsec</span> <span class="hljs-operator">+</span> <span class="hljs-number">1</span>
        <span class="hljs-keyword">END</span>;
        <span class="hljs-keyword">SET</span> <span class="hljs-variable">@page</span> <span class="hljs-operator">=</span> <span class="hljs-variable">@page</span> <span class="hljs-operator">+</span> <span class="hljs-number">1</span>
      <span class="hljs-keyword">END</span>;
      <span class="hljs-keyword">SET</span> <span class="hljs-variable">@xmde</span> <span class="hljs-operator">=</span> <span class="hljs-variable">@xmde</span> <span class="hljs-operator">+</span> <span class="hljs-number">1</span>
    <span class="hljs-keyword">END</span>;
    <span class="hljs-keyword">SET</span> <span class="hljs-variable">@iter</span> <span class="hljs-operator">=</span> <span class="hljs-variable">@iter</span> <span class="hljs-operator">+</span> <span class="hljs-number">1</span>
  <span class="hljs-keyword">END</span>;

  <span class="hljs-keyword">RETURN</span>;
<span class="hljs-keyword">END</span>;
GO

<span class="hljs-keyword">SELECT</span> section, mode, page, <span class="hljs-built_in">sum</span>(seconds)
  <span class="hljs-keyword">FROM</span> [dbo].[test_topn_scalability] (<span class="hljs-number">10</span>)
 <span class="hljs-keyword">WHERE</span> section<span class="hljs-operator">=</span><span class="hljs-number">10</span>
 <span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> section, mode, page
 <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> section, mode, page;
GO
</code></pre>
<h2 id="دوال-النوافذ">دوال النوافذ</h2>
<p>يستفيد SQL Server 2008R2 من الفهرس لتنفيذ استعلام Top-N متدفق عند استخدام دالة النافذة <code>ROW_NUMBER</code>:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
  <span class="hljs-keyword">FROM</span> ( <span class="hljs-keyword">SELECT</span> sales.<span class="hljs-operator">*</span>
              , <span class="hljs-built_in">ROW_NUMBER</span>() <span class="hljs-keyword">OVER</span> (<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date <span class="hljs-keyword">DESC</span>
                                          , sale_id   <span class="hljs-keyword">DESC</span>) rn
           <span class="hljs-keyword">FROM</span> sales
       ) tmp
 <span class="hljs-keyword">WHERE</span> rn <span class="hljs-keyword">between</span> <span class="hljs-number">11</span> <span class="hljs-keyword">and</span> <span class="hljs-number">20</span>
 <span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> sale_date <span class="hljs-keyword">DESC</span>, sale_id <span class="hljs-keyword">DESC</span>
</code></pre>
<pre><code>|-Sort(ORDER BY:([sale_date] DESC, [sale_id] DESC))
  |-Filter(WHERE:([Expr1004]&gt;=(11) AND [Expr1004]&lt;=(20)))
    |-Top(TOP EXPRESSION:(20))
      |-Sequence Project(DEFINE:([Expr1004]=row_number))
        |-Segment
          |-Nested Loops(Inner Join, WITH ORDERED PREFETCH)
            |-Index Scan([sales].[sl_dtid], ORDERED BACKWARD)
            |-RID Lookup([sales],
               SEEK:([Bmk1000]=[Bmk1000])
               LOOKUP ORDERED FORWARD)
</code></pre>
<p>يقرأ SQL Server الفهرس بالاتجاه المعاكس فلا يحتاج إلى عملية فرز لدالة النافذة. وتوقف خطوة Top العمليات الواقعة تحتها فور وصول 20 صفاً. وتقوم الخطوتان الأخيرتان، المعروضتان أولاً في خطة التنفيذ، بترشيح الصفوف العشرة الأولى وفرز النتيجة المتبقية. وسيفرز هذا الفرز عشرة صفوف فقط، فلن يكون مشكلة أداء.</p>
`,r={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:e,html:c};export{s as book,a as chapter,n as chapterTitle,r as default,e as headings,c as html,l as slug,p as title};
