const s="use-the-index-luke",a="sql-example-schema-sql-server-performance-testing-scalability",n="SQL Server Scripts for “Testing and Scalability”",l="index",p="سكربتات SQL Server لـ«الاختبار وقابلية التوسع»",e=[],c=`<p>يحتوي هذا القسم على شيفرة <code>create</code> و<code>insert</code> وT-SQL لتشغيل اختبار قابلية التوسع من <a href="/arabic-cs-library/book/use-the-index-luke/sql-testing-scalability/index">الفصل 3<em>الأداء وقابلية التوسع</em></a> في قاعدة بيانات SQL Server.</p>
<h4>تحذير</h4>
<p>ستنشئ هذه السكربتات كائنات كبيرة في قاعدة البيانات وتنتج كمية هائلة من سجلات المعاملات.</p>
<p>ومن اللازم تشغيل الاختبار على مجموعة بيانات ضخمة جداً لضمان ألا يؤثر التخزين المؤقت في القياس. وتبعاً لبيئتك، قد تحتاج إلى إنشاء جداول أكبر حتى تحصل على نتيجة خطية كما في الكتاب.</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> scale_data (
   section <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>,
   id1     <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>,
   id2     <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>,
   <span class="hljs-keyword">UNIQUE</span>  (section, id1)
);
</code></pre>
<p>ملاحظة:</p>
<ul>
<li>لا يوجد مفتاح أساسي (لإبقاء توليد البيانات بسيطاً).</li>
<li>لا يوجد فهرس (بعد). ويُنشأ ذلك بعد ملء الجدول.</li>
<li>لا يوجد عمود «نفايات» (junk) لإبقاء الجدول صغيراً.</li>
</ul>
<pre><code>DECLARE @section INT
SET @section = 300

WHILE (@section &gt;= 0) BEGIN

   WITH generate_series (n) AS (
      SELECT 1
      UNION ALL
      SELECT n + 1
        FROM generate_series
       WHERE N &lt; 3000
   ), generate_series2 (n) AS (
      SELECT ROW_NUMBER() OVER(ORDER BY g1.n, g2.n)
        FROM generate_series g1
       CROSS JOIN generate_series g2
       WHERE g2.n &lt;= @section
   )
   INSERT INTO scale_data
   SELECT @section, gen.*
        , CEILING(ABS(CAST(NEWID() AS BINARY(6)) %100))
     FROM generate_series2 gen
    WHERE gen.n &lt;= @section * 3000
   OPTION(MAXRECURSION 32767);

   SET @section = @section -1
END;
GO
</code></pre>
<p>ملاحظة: تولّد هذه الشيفرة 300 قسم (المظلَّلة). وقد تحتاج إلى تعديل العدد ليناسب بيئتك.</p>
<p>سيحتاج الجدول إلى بضعة غيغابايتات.</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX scale_slow <span class="hljs-keyword">ON</span> scale_data(section, id1, id2);
GO
</code></pre>
<p>ملاحظة:</p>
<p>سيحتاج الفهرس أيضاً إلى بضعة غيغابايتات.</p>
<p>وقد يستغرق ذلك وقتاً طويلاً جداً.</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">VIEW</span> rand_helper <span class="hljs-keyword">AS</span> <span class="hljs-keyword">SELECT</span> rnd<span class="hljs-operator">=</span>RAND();
GO 

<span class="hljs-keyword">CREATE</span> <span class="hljs-keyword">FUNCTION</span> [dbo].test_scalability (<span class="hljs-variable">@n</span> <span class="hljs-type">int</span>)
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
         <span class="hljs-keyword">SELECT</span> <span class="hljs-variable">@xrnd</span><span class="hljs-operator">=</span><span class="hljs-built_in">CEILING</span>(rnd <span class="hljs-operator">*</span> <span class="hljs-number">100</span>) <span class="hljs-keyword">FROM</span> rand_helper;
         <span class="hljs-keyword">SET</span> <span class="hljs-variable">@strt</span> <span class="hljs-operator">=</span> SYSDATETIME()

         <span class="hljs-keyword">SELECT</span> <span class="hljs-variable">@xcnt</span> <span class="hljs-operator">=</span> <span class="hljs-built_in">COUNT</span>(<span class="hljs-operator">*</span>)
           <span class="hljs-keyword">FROM</span> (<span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
                   <span class="hljs-keyword">FROM</span> scale_data
                  <span class="hljs-keyword">WHERE</span> section<span class="hljs-operator">=</span><span class="hljs-variable">@xsec</span>
                    <span class="hljs-keyword">AND</span> id2<span class="hljs-operator">=</span><span class="hljs-variable">@xrnd</span>) tlb; 

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
<p>ملاحظة:</p>
<p>تعيد الدالة <code>SCALABILITY_SCALABILITY</code> جدولاً.</p>
<p>وهي مثبتة في الشيفرة لتشغيل الاختبار على 300 قسم (المظلَّلة).</p>
<p>وعدد التكرارات قابل للضبط</p>
<p>ويلزم عرض <code>RAND_HELPER</code> لتجاوز استخدام <code>RAND()</code> داخل دالة.</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">FROM</span> [dbo].[test_scalability] (<span class="hljs-number">10</span>);
</code></pre>
<p>ويمكن إجراء الاختبار المقابل بفهرس أفضل هكذا:</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX scale_fast <span class="hljs-keyword">ON</span> scale_data(section, id2, id1);
GO

<span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span> <span class="hljs-keyword">FROM</span> [dbo].[test_scalability] (<span class="hljs-number">10</span>);
GO
</code></pre>
`,r={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:e,html:c};export{s as book,a as chapter,n as chapterTitle,r as default,e as headings,c as html,l as slug,p as title};
