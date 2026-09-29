const e="use-the-index-luke",n="sql-where-clause-searching-for-ranges-like-performance-tuning",o="Indexing `LIKE` Filters",c="index",a="فهرسة مرشّحات `LIKE`",s=[{depth:2,id:"وسم-تعبيرات-like-للبحث-النصي-الكامل",text:"وسم تعبيرات LIKE للبحث النصي الكامل"}],t=`<p>كثيراً ما يسبّب المعامل <code>LIKE</code> في SQL سلوك أداء غير متوقع، لأن بعض قيم البحث تمنع الاستخدام الفعّال للفهرس؛ أي إن هناك قيم بحث يمكن فهرستها فهرسة جيدة جداً، وأخرى لا يمكن. وموضع المحارف البديلة (wildcards) هو ما يصنع الفرق كله.</p>
<p>يستخدم المثال التالي المحرف البديل <code>%</code> في وسط قيمة البحث:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> first_name, last_name, date_of_birth
  <span class="hljs-keyword">FROM</span> employees
 <span class="hljs-keyword">WHERE</span> <span class="hljs-built_in">UPPER</span>(last_name) <span class="hljs-keyword">LIKE</span> <span class="hljs-string">&#x27;WIN%D&#x27;</span>
</code></pre>
<p>Db2 (LUW)</p>
<pre><code>Explain Plan
----------------------------------------------------
ID | Operation         |                 Rows | Cost
 1 | RETURN            |                      |   13
 2 |  FETCH EMPLOYEES  |     1 of 1 (100.00%) |   13
 3 |   IXSCAN EMP_NAME | 1 of 10000 (   .01%) |    6

Predicate Information
 3 - START ('WIN....................................
      STOP (Q1.LAST_NAME &lt;= 'WIN....................
      SARG (Q1.LAST_NAME LIKE 'WIN%D')
</code></pre>
<p>في هذا المثال، غُيِّر الاستعلام ليصبح <code>WHERE last_name LIKE 'WIN%D'</code> (بلا <code>UPPER</code>). ويبدو أن Db2 (LUW) 10.5 لا تستطيع استخدام مُسند وصول من <code>LIKE</code> على فهرس قائم على الدوال (وهي تنفّذ مسح فهرس كاملاً في أفضل الأحوال).</p>
<p>وخلافاً لذلك، تتألق Db2 هنا: فهي تُظهر بوضوح شرطَي <code>START</code> و<code>STOP</code>، وهما الجزء الواقع قبل المحرف البديل الأول، لكنها تُظهر أيضاً أن النمط الكامل يُطبَّق كمُسند ترشيح.</p>
<p>MySQL</p>
<pre><code>+----+-----------+-------+----------+---------+------+-------------+
| id | table     | type  | key      | key_len | rows | Extra       |
+----+-----------+-------+----------+---------+------+-------------+
|  1 | employees | range | emp_name | 767     |    2 | Using where |
+----+-----------+-------+----------+---------+------+-------------+
</code></pre>
<p>Oracle</p>
<pre><code>---------------------------------------------------------------
|Id | Operation                   | Name        | Rows | Cost |
---------------------------------------------------------------
| 0 | SELECT STATEMENT            |             |    1 |    4 |
| 1 |  TABLE ACCESS BY INDEX ROWID| EMPLOYEES   |    1 |    4 |
|*2 |   INDEX RANGE SCAN          | EMP_UP_NAME |    1 |    2 |
---------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
   2 - access(UPPER(&quot;LAST_NAME&quot;) LIKE 'WIN%D')
       filter(UPPER(&quot;LAST_NAME&quot;) LIKE 'WIN%D')
</code></pre>
<p>PostgreSQL</p>
<pre><code>                       QUERY PLAN
----------------------------------------------------------
Index Scan using emp_up_name on employees
   (cost=0.01..8.29 rows=1 width=17)
   Index Cond: (upper((last_name)::text) ~&gt;=~ 'WIN'::text)
           AND (upper((last_name)::text) ~&lt;~  'WIO'::text)
       Filter: (upper((last_name)::text) ~~ 'WIN%D'::text)
</code></pre>
<p>لا يمكن لمرشّحات <code>LIKE</code> استخدام الأحرف <em>الواقعة قبل المحرف البديل الأول</em> إلا أثناء اجتياز الشجرة. أما الأحرف المتبقية فهي مجرد مُسندات ترشيح لا تضيّق نطاق الفهرس الممسوح. ولذلك يمكن أن يحتوي تعبير <code>LIKE</code> واحد على نوعَي مُسندات: (1) الجزء الواقع قبل المحرف البديل الأول كمُسند وصول؛ (2) والأحرف الأخرى كمُسند ترشيح.</p>
<h4>تنبيه</h4>
<p>يعمل المعامل <code>LIKE</code> على أساس محرف بمحرف، بينما يمكن للترتيبات المحرّفية أن تعالج محارف متعددة كعنصر فرز واحد. ولذلك تمنع بعض الترتيبات المحرّفية استخدام الفهارس مع <code>LIKE</code>. اقرأ <a href="https://www.cybertec-postgresql.com/en/indexing-like-postgresql-oracle/">فهرسة «LIKE» في PostgreSQL وOracle</a> لـLaurenz Albe لمزيد من التفاصيل.</p>
<p>وكلما زادت انتقائية البادئة الواقعة قبل المحرف البديل الأول، صغر نطاق الفهرس الممسوح، ما يجعل البحث في الفهرس أسرع بدوره. ويوضح <a href="#fig-like">الشكل 2.4</a> هذه العلاقة بثلاثة تعبيرات <code>LIKE</code> مختلفة. وجميعها تختار الصف نفسه، لكن نطاق الفهرس الممسوح — وبالتالي الأداء — مختلف اختلافاً كبيراً.</p>
<p>الشكل 2.4 عمليات بحث <code>LIKE</code> متنوعة</p>
<p>للتعبير الأول محرفان قبل المحرف البديل، ويقصران نطاق الفهرس الممسوح على 18 صفاً؛ ولا يطابق التعبير <code>LIKE</code> بكامله سوى واحد منها، بينما تُجلب الـ17 الأخرى ثم تُستبعد. وللتعبير الثاني بادئة أطول تضيّق نطاق الفهرس الممسوح إلى صفين، فلا تقرأ قاعدة البيانات سوى صف واحد إضافي غير ذي صلة بالنتيجة. أما التعبير الأخير فليس له مُسند ترشيح إطلاقاً؛ إذ تقرأ قاعدة البيانات المدخل المطابق لتعبير <code>LIKE</code> بأكمله فقط.</p>
<h4>مهم</h4>
<p>لا يعمل إلا الجزء الواقع قبل المحرف البديل الأول كمُسند وصول.</p>
<p>والأحرف المتبقية لا تضيّق نطاق الفهرس الممسوح؛ وإنما تُستبعد المدخلات غير المطابقة من النتيجة فقط.</p>
<p>والحالة المعاكسة ممكنة أيضاً: تعبير <code>LIKE</code> يبدأ بمحرف بديل. ومثل هذا التعبير لا يصلح كمُسند وصول، ويجب على قاعدة البيانات مسح الجدول بأكمله إذا لم توجد شروط أخرى توفر مُسندات وصول.</p>
<h4>نصيحة</h4>
<p>تجنّب تعبيرات <code>LIKE</code> ذات المحارف البديلة في البداية (مثل <code>'%TERM'</code>).</p>
<p>يؤثر موضع المحارف البديلة في استخدام الفهرس — نظرياً على الأقل. وفي الواقع، ينشئ المُحسِّن خطة تنفيذ عامة عندما تُمرَّر قيمة البحث عبر <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-bind-parameters/index">وسائط ربط</a>. وفي هذه الحالة يجب على المُحسِّن أن يخمّن ما إذا كانت غالبية عمليات التنفيذ ستحتوي محرفاً بديلاً في البداية.</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=sec-like&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<p>تفترض معظم قواعد البيانات عند تحسين شرط <code>LIKE</code> بوسيط ربط أنه لا يوجد محرف بديل في البداية، لكن هذا الافتراض خاطئ إذا كان تعبير <code>LIKE</code> مستخدماً للبحث النصي الكامل. ولا توجد، للأسف، طريقة مباشرة لوسم شرط <code>LIKE</code> بأنه بحث نصي كامل. ويعرض المربع <a href="#sb-static-like-prefix">«<em>وسم تعبيرات <code>LIKE</code> للبحث النصي الكامل</em>»</a> محاولة لا تنجح. وتحديد قيمة البحث دون وسيط ربط هو الحل الأوضح، لكنه يزيد كلفة التحسين ويفتح ثغرة حقن SQL (SQL injection). وهناك حل فعّال وآمن وقابل للنقل في الوقت نفسه: تشويش شرط <code>LIKE</code> عمداً. ويشرح <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-obfuscation-concatenation/index">«<em>دمج الأعمدة</em>»</a> ذلك بالتفصيل.</p>
<h2 id="وسم-تعبيرات-like-للبحث-النصي-الكامل">وسم تعبيرات <code>LIKE</code> للبحث النصي الكامل</h2>
<p>عند استخدام المعامل <code>LIKE</code> للبحث النصي الكامل، يمكننا فصل المحارف البديلة عن قيمة البحث:</p>
<pre><code>WHERE text_column LIKE '%' || ? || '%'
</code></pre>
<p>أما في قاعدة بيانات PostgreSQL فالمشكلة مختلفة، لأن PostgreSQL تفترض وجود محرف بديل في البداية عند استخدام وسائط ربط في تعبير <code>LIKE</code>؛ وهي ببساطة لا تستخدم فهرساً في تلك الحالة. والطريقة الوحيدة للحصول على وصول عبر فهرس لتعبير <code>LIKE</code> هي جعل قيمة البحث الفعلية مرئية للمُحسِّن. وإذا لم تستخدم وسيط ربط بل وضعت قيمة البحث مباشرة في عبارة SQL، فيجب عليك اتخاذ احتياطات أخرى ضد هجمات حقن SQL!</p>
<p>وحتى إذا حسّنت قاعدة البيانات خطة التنفيذ من أجل محرف بديل في البداية، فقد يبقى الأداء غير كافٍ. ويمكنك في هذه الحالة استخدام جزء آخر من جملة <code>where</code> للوصول إلى البيانات بكفاءة — انظر أيضاً <a href="/arabic-cs-library/book/use-the-index-luke/sql-clustering-index-filter-predicates/index">«<em>مُسندات ترشيح الفهرس المستخدمة عمداً</em>»</a>. وإذا لم يوجد مسار وصول آخر، فقد تستخدم أحد حلول الفهرس النصي الكامل الخاصة التالية.</p>
<p>Db2 (LUW)</p>
<p>تدعم Db2 الكلمة المفتاحية <code>contains</code>. انظر «<a href="https://www.ibm.com/docs/en/db2/11.5.x?topic=indexes-search-functions">دوال البحث في Db2 Text Search</a>».</p>
<p>MySQL</p>
<p>تقدّم MySQL الكلمتين المفتاحيتين <code>match</code> و<code>against</code> للبحث النصي الكامل. وبدءاً من MySQL 5.6، يمكنك إنشاء فهارس نصية كاملة لجداول InnoDB أيضاً، بينما كان ذلك ممكناً سابقاً مع جداول MyISAM فقط. انظر «<a href="https://dev.mysql.com/doc/refman/8.0/en/fulltext-search.html">دوال البحث النصي الكامل</a>» في وثائق MySQL.</p>
<p>Oracle</p>
<p>تقدّم قاعدة بيانات Oracle الكلمة المفتاحية <code>contains</code>. انظر «<a href="https://docs.oracle.com/en/database/oracle/oracle-database/19/ccapp/#Oracle%C2%AE-Text">دليل مطوّر تطبيقات Oracle Text</a>».</p>
<p>PostgreSQL</p>
<p>تقدّم PostgreSQL المعامل <code>@@</code> لتنفيذ عمليات البحث النصي الكامل. انظر «<a href="https://www.postgresql.org/docs/current/textsearch.html">البحث النصي الكامل</a>» في وثائق PostgreSQL.</p>
<p>وهناك خيار آخر هو استخدام امتداد <a href="http://www.sai.msu.su/~megera/wiki/wildspeed">WildSpeed</a> لتحسين تعبيرات <code>LIKE</code> مباشرة. ويخزّن الامتداد النص بجميع دوراته الممكنة بحيث يقع كل محرف في البداية مرة واحدة. ويعني ذلك أن النص المفهرس لا يُخزَّن مرة واحدة بل بعدد محارف السلسلة، ومن ثمّ يحتاج مساحة كبيرة.</p>
<p>SQL Server</p>
<p>تقدّم SQL Server الكلمة المفتاحية <code>contains</code>. انظر «<a href="https://learn.microsoft.com/en-us/sql/relational-databases/search/full-text-search?view=sql-server-ver16">البحث النصي الكامل</a>» في وثائق SQL Server.</p>
<h4>فكّر في الأمر</h4>
<p>كيف يمكنك فهرسة بحث <code>LIKE</code> له محرف بديل واحد فقط في بداية قيمة البحث (<code>'%TERM'</code>)؟</p>
`,p={book:e,chapter:n,chapterTitle:o,slug:c,title:a,headings:s,html:t};export{e as book,n as chapter,o as chapterTitle,p as default,s as headings,t as html,c as slug,a as title};
