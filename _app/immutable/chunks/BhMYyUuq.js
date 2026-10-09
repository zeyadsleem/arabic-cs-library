const e="use-the-index-luke",s="sql-explain-plan-sql-server-filter-predicates",a="التمييز بين مُحدِّدات الوصول والترشيح",n="index",l="التمييز بين مُسندات الوصول والترشيح",p=[{depth:2,id:"في-خطط-التنفيذ-الرسومية",text:"في خطط التنفيذ الرسومية"},{depth:2,id:"في-خطط-التنفيذ-الجدولية",text:"في خطط التنفيذ الجدولية"}],r=`<p>تستخدم قاعدة بيانات SQL Server ثلاث طرق مختلفة لتطبيق جمل <code>where</code> (المُسندات):</p>
<p>مُسند وصول («Seek Predicates»)</p>
<p>تعبّر مُسندات الوصول عن شرطَي البدء والتوقف لـ<a href="/arabic-cs-library/book/use-the-index-luke/sql-anatomy-the-leaf-nodes/index">اجتياز العقد الورقية</a>.</p>
<p>مُسند ترشيح الفهرس («Predicates» أو «where» لعمليات الفهرس)</p>
<p>تُطبَّق مُسندات ترشيح الفهرس أثناء اجتياز العقد الورقية فقط، ولا تساهم في شرطَي البدء والتوقف ولا تضيّق النطاق الممسوح.</p>
<p>مُسند ترشيح على مستوى الجدول («where» لعمليات الجدول)</p>
<p>تُقيَّم المُسندات على الأعمدة غير الموجودة في الفهرس على مستوى الجدول. ولحدوث ذلك، يجب على قاعدة البيانات تحميل الصف من جدول الكومة أولاً.</p>
<p>ويشرح القسم التالي كيفية تحديد مُسندات الترشيح في <a href="/arabic-cs-library/book/use-the-index-luke/sql-explain-plan-sql-server-getting-an-execution-plan/index">خطط تنفيذ SQL Server</a>. وهو مبني على العينة المستخدمة في <a href="/arabic-cs-library/book/use-the-index-luke/sql-testing-scalability-data-volume/index">بيان أثر مُسندات ترشيح الفهرس</a> في <a href="/arabic-cs-library/book/use-the-index-luke/sql-testing-scalability/index">الفصل 3</a>. ويحتوي الملحق على <a href="/arabic-cs-library/book/use-the-index-luke/sql-example-schema-sql-server-performance-testing-scalability/index">السكربتات الكاملة</a> لملء الجدول.</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> scale_data (
   section <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>,
   id1     <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>,
   id2     <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>
)
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX scale_slow <span class="hljs-keyword">ON</span> scale_data(section, id1, id2)
</code></pre>
<p>وتختار العبارة العينية حسب <code>SECTION</code> و<code>ID2</code>:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">count</span>(<span class="hljs-operator">*</span>)
  <span class="hljs-keyword">FROM</span> scale_data
 <span class="hljs-keyword">WHERE</span> section <span class="hljs-operator">=</span> <span class="hljs-variable">@sec</span>
   <span class="hljs-keyword">AND</span> id2 <span class="hljs-operator">=</span> <span class="hljs-variable">@id2</span>
</code></pre>
<h2 id="في-خطط-التنفيذ-الرسومية">في خطط التنفيذ الرسومية</h2>
<p>تخفي خطة التنفيذ الرسومية معلومات المُسندات في تلميح لا يظهر إلا عند تمرير المؤشر فوق عملية <code>Index Seek</code>. مرّر المؤشر فوق رمز <code>Index Seek</code> لترى معلومات المُسندات — فعلاً، على هذه الصفحة.</p>
<p><img src="/arabic-cs-library/images/use-the-index-luke/sql-explain-plan-sql-server-filter-predicates-0-mssql_ssms_filter.ZrTov2hZ.webp" alt="" id="article"></p>
<p>وتقابل <em>Seek Predicates</em> في SQL Server مُسندات الوصول في Oracle — فهي تضيّق اجتياز العقد الورقية. أما مُسندات الترشيح فتُوسم ببساطة <em>Predicates</em> في خطة التنفيذ الرسومية في SQL Server.</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=ap-explain-mssql-filter&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<h2 id="في-خطط-التنفيذ-الجدولية">في خطط التنفيذ الجدولية</h2>
<p>تحتوي خطط التنفيذ الجدولية على معلومات المُسندات في العمود نفسه الذي تظهر فيه العمليات؛ ولذلك يسهل جداً نسخ جميع المعلومات ذات الصلة ولصقها دفعة واحدة.</p>
<pre><code>DECLARE @sec numeric
</code></pre>
<pre><code>DECLARE @id2 numeric
</code></pre>
<pre><code>SET STATISTICS PROFILE ON
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-built_in">count</span>(<span class="hljs-operator">*</span>)
  <span class="hljs-keyword">FROM</span> scale_data
 <span class="hljs-keyword">WHERE</span> section <span class="hljs-operator">=</span> <span class="hljs-variable">@sec</span>
   <span class="hljs-keyword">AND</span> id2 <span class="hljs-operator">=</span> <span class="hljs-variable">@id2</span>
</code></pre>
<pre><code>SET STATISTICS PROFILE OFF
</code></pre>
<p>وتُعرض خطة التنفيذ كمجموعة نتائج ثانية في لوحة النتائج. وفيما يلي عمود <code>StmtText</code> — مع بعض إعادة التنسيق لقراءة أفضل:</p>
<pre><code>|--Compute Scalar(DEFINE:([Expr1004]=CONVERT_IMPLICIT(...))
     |--Stream Aggregate(DEFINE:([Expr1008]=Count(*)))
          |--Index Seek(OBJECT:([scale_data].[scale_slow]),
             SEEK: ([scale_data].[section]=[@sec])
                    ORDERED FORWARD
             WHERE:([scale_data].[id2]=[@id2]))
</code></pre>
<p>تُدخل وسمة <code>SEEK</code> مُسندات الوصول، وتشير وسمة <code>WHERE</code> إلى مُسندات الترشيح.</p>
<h4>نصيحة</h4>
<ul>
<li>يشرح قسم <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-searching-for-ranges-greater-less-between-tuning-sql-access-filter-predicates/index">«<em>أكبر من، وأصغر من، و<code>BETWEEN</code></em>»</a> الفرق بين مُسندات الوصول ومُسندات ترشيح الفهرس بمثال.</li>
<li>ويبيّن <a href="/arabic-cs-library/book/use-the-index-luke/sql-testing-scalability/index">الفصل 3، «<em>الأداء وقابلية التوسع</em>»</a> فرق الأداء الذي تُحدثه مُسندات الوصول والترشيح.</li>
</ul>
`,c={book:e,chapter:s,chapterTitle:a,slug:n,title:l,headings:p,html:r};export{e as book,s as chapter,a as chapterTitle,c as default,p as headings,r as html,n as slug,l as title};
