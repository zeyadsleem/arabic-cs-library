const e="use-the-index-luke",n="sql-explain-plan-oracle-filter-predicates",a="Distinguishing Access and Filter-Predicates",t="index",i="التمييز بين مُسندات الوصول والترشيح",o=[],s=`<p>تستخدم قاعدة بيانات Oracle ثلاث طرق مختلفة لتطبيق جمل <code>where</code> (المُسندات):</p>
<p>مُسند وصول («access»)</p>
<p>تعبّر مُسندات الوصول عن شرطَي البدء والتوقف لـ<a href="/arabic-cs-library/book/use-the-index-luke/sql-anatomy-the-leaf-nodes/index">اجتياز العقد الورقية</a>.</p>
<p>مُسند ترشيح الفهرس («filter» لعمليات الفهرس)</p>
<p>تُطبَّق مُسندات ترشيح الفهرس أثناء اجتياز العقد الورقية فقط، ولا تساهم في شرطَي البدء والتوقف ولا تضيّق النطاق الممسوح.</p>
<p>مُسند ترشيح على مستوى الجدول («filter» لعمليات الجدول)</p>
<p>تُقيَّم المُسندات على الأعمدة غير الموجودة في الفهرس على مستوى الجدول. ولحدوث ذلك، يجب على قاعدة البيانات تحميل الصف من الجدول أولاً.</p>
<h4>ملاحظة</h4>
<p>تعطي مُسندات ترشيح الفهرس إحساساً زائفاً بالأمان؛ فرغم استخدام الفهرس، يتدهور الأداء سريعاً مع نمو حجم البيانات أو حِمل النظام.</p>
<p>تُظهر خطط التنفيذ التي أُنشئت بأداة <code>DBMS_XPLAN</code> (انظر <a href="/arabic-cs-library/book/use-the-index-luke/sql-explain-plan-oracle-getting-an-execution-plan/index">«<em>الحصول على خطة تنفيذ</em>»</a>) استخدام الفهرس في قسم «Predicate Information» أسفل خطة التنفيذ الجدولية:</p>
<pre><code>------------------------------------------------------
| Id | Operation         | Name       | Rows  | Cost |
------------------------------------------------------
|  0 | SELECT STATEMENT  |            |     1 | 1445 |
|  1 |  SORT AGGREGATE   |            |     1 |      |
|* 2 |   INDEX RANGE SCAN| SCALE_SLOW |  4485 | 1445 |
------------------------------------------------------

Predicate Information (identified by operation id):
   2 - access(&quot;SECTION&quot;=:A AND &quot;ID2&quot;=:B)
       filter(&quot;ID2&quot;=:B)
</code></pre>
<p>وتشير ترقيمات معلومات المُسندات إلى عمود «Id» في خطة التنفيذ. وهناك تُظهر قاعدة البيانات أيضاً نجمة لوسم العمليات التي لها معلومات مُسندات.</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=ap-explain-oracle-filter&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<p>يعرض هذا المثال، المأخوذ من فصل «<a href="/arabic-cs-library/book/use-the-index-luke/sql-testing-scalability-data-volume/index">الأداء وقابلية التوسع</a>»، عملية <code>INDEX RANGE SCAN</code> لها مُسندات وصول وترشيح. ولقاعدة بيانات Oracle خصوصية أنها تُظهر بعض مُسندات الترشيح كمُسندات وصول أيضاً — مثل <code>ID2=:B</code> في خطة التنفيذ أعلاه.</p>
<h4>مهم</h4>
<p>إذا ظهر شرط كمُسند ترشيح، فهو مُسند ترشيح — ولا يهم إن ظهر أيضاً كمُسند وصول.</p>
<p>ويعني ذلك أن <code>INDEX RANGE SCAN</code> يمسح النطاق بأكمله من أجل الشرط <code>&quot;SECTION&quot;=:A</code> ويطبّق المرشّح <code>&quot;ID2&quot;=:B</code> على كل صف.</p>
<p>وتُعرض مُسندات الترشيح على مستوى الجدول للوصول المقابل إلى الجدول مثل <code>TABLE ACCESS BY INDEX ROWID</code> أو <code>TABLE ACCESS FULL</code>.</p>
<p>يرجى ملاحظة أن الأدوات المختلفة تعرض معلومات المُسندات بطرق مختلفة؛ فمثلاً يعرض Oracle SQL Developer معلومات المُسندات أسفل العملية المعنية.</p>
<p>الشكل A.1 مُسندات الوصول والترشيح في Oracle SQL Developer <img src="/arabic-cs-library/images/use-the-index-luke/sql-explain-plan-oracle-filter-predicates-0-sqldeveloper_access_filter_predicates.6GQmGBUE.webp" alt="" id="scn-sqldeveloper-access-filter"></p>
<p>وبعض الأدوات لا تعرض معلومات المُسندات إطلاقاً. تذكّر أنك تستطيع دائماً العودة إلى <code>DBMS_XPLAN</code> كما شُرح في «<a href="/arabic-cs-library/book/use-the-index-luke/sql-explain-plan-oracle-getting-an-execution-plan/index">الحصول على خطة تنفيذ</a>».</p>
<h4>نصيحة</h4>
<ul>
<li>يشرح قسم <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-searching-for-ranges-greater-less-between-tuning-sql-access-filter-predicates/index">«<em>أكبر من، وأصغر من، و<code>BETWEEN</code></em>»</a> الفرق بين مُسندات الوصول ومُسندات ترشيح الفهرس بمثال.</li>
<li>ويبيّن <a href="/arabic-cs-library/book/use-the-index-luke/sql-testing-scalability/index">الفصل 3، «<em>الأداء وقابلية التوسع</em>»</a> فرق الأداء الذي تُحدثه مُسندات الوصول والترشيح.</li>
</ul>
`,c={book:e,chapter:n,chapterTitle:a,slug:t,title:i,headings:o,html:s};export{e as book,n as chapter,a as chapterTitle,c as default,o as headings,s as html,t as slug,i as title};
