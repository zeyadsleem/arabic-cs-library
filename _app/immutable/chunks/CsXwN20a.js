const e="use-the-index-luke",n="sql-explain-plan-postgresql-filter-predicates",s="Distinguishing Access and Filter-Predicates",a="index",c="التمييز بين مُسندات الوصول والترشيح",o=[],d=`<p>تستخدم قاعدة بيانات PostgreSQL ثلاث طرق مختلفة لتطبيق جمل <code>where</code> (المُسندات):</p>
<p>مُسند وصول («Index Cond»)</p>
<p>تعبّر مُسندات الوصول عن شرطَي البدء والتوقف لـ<a href="/arabic-cs-library/book/use-the-index-luke/sql-anatomy-the-leaf-nodes/index">اجتياز العقد الورقية</a>.</p>
<p>مُسند ترشيح الفهرس («Index Cond»)</p>
<p>تُطبَّق مُسندات ترشيح الفهرس أثناء اجتياز العقد الورقية فقط، ولا تساهم في شرطَي البدء والتوقف ولا تضيّق النطاق الممسوح.</p>
<p>مُسند ترشيح على مستوى الجدول («Filter»)</p>
<p>تُقيَّم المُسندات على الأعمدة غير الموجودة في الفهرس على مستوى الجدول. ولحدوث ذلك، يجب على قاعدة البيانات تحميل الصف من جدول الكومة أولاً.</p>
<h4>ملاحظة</h4>
<p>تعطي مُسندات ترشيح الفهرس إحساساً زائفاً بالأمان؛ فرغم استخدام الفهرس، يتدهور الأداء سريعاً مع نمو حجم البيانات أو حِمل النظام.</p>
<p>لا تعرض خطط تنفيذ PostgreSQL مُسندات وصول الفهرس وترشيحه منفصلةً — بل يظهر كلاهما كـ«Index Cond». ويعني ذلك أنه يجب مقارنة خطة التنفيذ بتعريف الفهرس للتمييز بين مُسندات الوصول ومُسندات ترشيح الفهرس.</p>
<h4>ملاحظة</h4>
<p>لا تقدّم خطة شرح PostgreSQL معلومات كافية للعثور على مُسندات ترشيح الفهرس.</p>
<p>والمُسندات المعروضة كـ«Filter» هي دائماً مُسندات ترشيح على مستوى الجدول — حتى عند عرضها لعملية <code>Index Scan</code>.</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=ap-explain-pg-filter&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<p>تأمّل المثال التالي، الذي ظهر أصلاً في فصل «<a href="/arabic-cs-library/book/use-the-index-luke/sql-testing-scalability-data-volume/index">الأداء وقابلية التوسع</a>» (<a href="/arabic-cs-library/book/use-the-index-luke/sql-example-schema-postgresql-performance-testing-scalability/index">سكربت <code>create</code> و<code>insert</code></a>):</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE TABLE</span> scale_data (
   section <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>,
   id1     <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>,
   id2     <span class="hljs-type">NUMERIC</span> <span class="hljs-keyword">NOT NULL</span>
)
</code></pre>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX scale_data_key <span class="hljs-keyword">ON</span> scale_data(section, id1)
</code></pre>
<p>ويفلتر <code>select</code> التالي على العمود <code>ID2</code> غير المشمول في الفهرس:</p>
<pre><code>PREPARE stmt(int) AS SELECT count(*) 
                       FROM scale_data
                      WHERE section = 1
                        AND id2 = $1
</code></pre>
<pre><code>EXPLAIN EXECUTE stmt(1)
</code></pre>
<p>يظهر مُسند <code>ID2</code> كـ«<code>Filter</code>» أسفل عملية <code>Index Scan</code>. والسبب أن PostgreSQL ينفّذ الوصول إلى الجدول كجزء من عملية <code>Index Scan</code>؛ وبعبارة أخرى، عملية <code>TABLE ACCESS BY INDEX ROWID</code> في قاعدة بيانات Oracle مخفية داخل عملية <code>Index Scan</code> في PostgreSQL. ولذلك من الممكن أن يفلتر <code>Index Scan</code> على أعمدة غير مشمولة في الفهرس.</p>
<h4>مهم</h4>
<p>مُسندات <code>Filter</code> في PostgreSQL هي مُسندات ترشيح على مستوى الجدول — حتى عند عرضها لعملية <code>Index Scan</code>.</p>
<p>وعندما نضيف الفهرس من فصل «<a href="/arabic-cs-library/book/use-the-index-luke/sql-testing-scalability-data-volume/index">الأداء وقابلية التوسع</a>»، نرى أن جميع الأعمدة تظهر كـ«Index Cond» — بصرف النظر عما إذا كانت مُسندات وصول أو ترشيح.</p>
<pre><code class="language-sql"><span class="hljs-keyword">CREATE</span> INDEX scale_slow <span class="hljs-keyword">ON</span> scale_data (section, id1, id2)
</code></pre>
<p>وخطة التنفيذ بالفهرس الجديد لا تعرض أي شروط ترشيح:</p>
<pre><code>                      QUERY PLAN
------------------------------------------------------
Aggregate  (cost=14215.98..14215.99 rows=1 width=0)
  Output: count(*)
  -&gt; Index Scan using scale_slow on scale_data 
     (cost=0.00..14208.51 rows=2989 width=0)
     Index Cond: (section = 1::numeric AND id2 = ($1)::numeric)
</code></pre>
<p>يرجى ملاحظة أن الشرط على <code>ID2</code> لا يستطيع تضييق اجتياز العقد الورقية لأن الفهرس يضع العمود <code>ID1</code> قبل <code>ID2</code>. ويعني ذلك أن <code>Index Scan</code> سيمسح النطاق بأكمله من أجل الشرط <code>SECTION=1::numeric</code> ويطبّق المرشّح <code>ID2=($1)::numeric</code> على كل صف يحقق الشرط على <code>SECTION</code>.</p>
<h4>نصيحة</h4>
<ul>
<li>يشرح قسم <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-searching-for-ranges-greater-less-between-tuning-sql-access-filter-predicates/index">«<em>أكبر من، وأصغر من، و<code>BETWEEN</code></em>»</a> الفرق بين مُسندات الوصول ومُسندات ترشيح الفهرس بمثال.</li>
<li>ويبيّن <a href="/arabic-cs-library/book/use-the-index-luke/sql-testing-scalability/index">الفصل 3، «<em>الأداء وقابلية التوسع</em>»</a> فرق الأداء الذي تُحدثه مُسندات الوصول والترشيح.</li>
</ul>
`,t={book:e,chapter:n,chapterTitle:s,slug:a,title:c,headings:o,html:d};export{e as book,n as chapter,s as chapterTitle,t as default,o as headings,d as html,a as slug,c as title};
