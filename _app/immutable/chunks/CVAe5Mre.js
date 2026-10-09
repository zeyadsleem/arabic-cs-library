const e="use-the-index-luke",n="sql-where-clause-searching-for-ranges-greater-less-between-tuning-sql-access-filter-predicates",s="أكبر وأصغر وBETWEEN",o="index",a="أكبر وأصغر و`BETWEEN`",d=[],r=`<p>أكبر مخاطر الأداء في <code>INDEX RANGE SCAN</code> هي <a href="/arabic-cs-library/book/use-the-index-luke/sql-anatomy-the-leaf-nodes/index">تتبّع عقد الأوراق</a>. لذا فالقاعدة الذهبية في الفهرسة هي إبقاء نطاق الفهرس الممسوح أصغر ما يمكن. ويمكنك التحقق من ذلك بسؤال نفسك: من أين يبدأ مسح الفهرس وأين ينتهي؟</p>
<p>السؤال سهل الإجابة إذا ذكرت عبارة SQL شرطي البداية والتوقف صراحةً:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> first_name, last_name, date_of_birth
  <span class="hljs-keyword">FROM</span> employees
 <span class="hljs-keyword">WHERE</span> date_of_birth <span class="hljs-operator">&gt;=</span> TO_DATE(?, <span class="hljs-string">&#x27;YYYY-MM-DD&#x27;</span>)
   <span class="hljs-keyword">AND</span> date_of_birth <span class="hljs-operator">&lt;=</span> TO_DATE(?, <span class="hljs-string">&#x27;YYYY-MM-DD&#x27;</span>)
</code></pre>
<p>لا يُمسح فهرس على <code>DATE_OF_BIRTH</code> إلا في النطاق المحدَّد. فيبدأ المسح عند التاريخ الأول وينتهي عند الثاني. ولا يمكننا تضييق نطاق الفهرس الممسوح أكثر من ذلك.</p>
<p>ويقلّ وضوح شرطي البداية والتوقف إذا شارك عمود ثانٍ:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> first_name, last_name, date_of_birth
  <span class="hljs-keyword">FROM</span> employees
 <span class="hljs-keyword">WHERE</span> date_of_birth <span class="hljs-operator">&gt;=</span> TO_DATE(?, <span class="hljs-string">&#x27;YYYY-MM-DD&#x27;</span>)
   <span class="hljs-keyword">AND</span> date_of_birth <span class="hljs-operator">&lt;=</span> TO_DATE(?, <span class="hljs-string">&#x27;YYYY-MM-DD&#x27;</span>)
   <span class="hljs-keyword">AND</span> subsidiary_id  <span class="hljs-operator">=</span> ?
</code></pre>
<p>بالطبع يجب أن يغطي الفهرس المثالي العمودين معاً، لكن السؤال: بأي ترتيب؟</p>
<p>تعرض الأشكال التالية أثر ترتيب الأعمدة في نطاق الفهرس الممسوح. وللتوضيح نبحث عن جميع موظفي الشركة الفرعية 27 الذين وُلدوا بين 1 يناير و9 يناير 1971.</p>
<p>يوضّح <a href="#fig-range-bad">الشكل 2.2</a> تفصيلاً من الفهرس على <code>DATE_OF_BIRTH</code> و<code>SUBSIDIARY_ID</code>—بهذا الترتيب. فأين ستبدأ قاعدة البيانات في تتبّع سلسلة عقد الأوراق، أو بعبارة أخرى: أين سينتهي <a href="/arabic-cs-library/book/use-the-index-luke/sql-anatomy-the-tree/index">اجتياز الشجرة</a>؟</p>
<p>الشكل 2.2 مسح نطاق في فهرس <code>DATE_OF_BIRTH</code>، <code>SUBSIDIARY_ID</code></p>
<p>الفهرس مرتّب بتواريخ الميلاد أولاً. ولا يُستخدم <code>SUBSIDIARY_ID</code> لترتيب هذه السجلات إلا إذا وُلد موظفان في اليوم نفسه. لكن الاستعلام يغطي <em>نطاقاً</em> من التواريخ. لذا فترتيب <code>SUBSIDIARY_ID</code> عديم الفائدة أثناء اجتياز الشجرة. ويتّضح ذلك إذا أدركت أنه لا يوجد مدخل للشركة الفرعية 27 في العقد الفرعية—رغم وجوده في عقد الأوراق. لذا فمرشّح <code>DATE_OF_BIRTH</code> هو الشرط الوحيد الذي يحدّ نطاق الفهرس الممسوح. فيبدأ عند أول مدخل يطابق نطاق التاريخ وينتهي عند الأخير—جميع عقد الأوراق الخمس الظاهرة في <a href="#fig-range-bad">الشكل 2.2</a>.</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=sec-greater-less-between&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<p>تبدو الصورة مختلفة تماماً عند عكس ترتيب الأعمدة. ويوضّح <a href="#fig-range-good">الشكل 2.3</a> المسح إذا بدأ الفهرس بالعمود <code>SUBSIDIARY_ID</code>.</p>
<p>الشكل 2.3 مسح نطاق في فهرس <code>SUBSIDIARY_ID</code>، <code>DATE_OF_BIRTH</code></p>
<p>والفرق أن معامل التساوي يحدّ العمود الأول في الفهرس بقيمة واحدة. وضمن نطاق هذه القيمة (<code>SUBSIDIARY_ID</code> 27) يكون الفهرس مرتّباً وفق العمود الثاني—تاريخ الميلاد—فلا حاجة لزيارة عقدة الورقة الأولى لأن العقدة الفرعية تشير بالفعل إلى أنه لا يوجد موظف للشركة الفرعية 27 وُلد بعد 25 يونيو 1969 في عقدة الورقة الأولى.</p>
<p>يقود اجتياز الشجرة مباشرةً إلى عقدة الورقة الثانية. وفي هذه الحالة، تحدّ جميع شروط عبارة <code>where</code> نطاق الفهرس الممسوح، بحيث ينتهي المسح عند عقدة الورقة نفسها.</p>
<h4>نصيحة</h4>
<p>قاعدة عملية: الفهرس للتساوي أولاً—ثم للنطاقات.</p>
<p>يعتمد فرق الأداء الفعلي على البيانات ومعايير البحث. وقد يكون الفرق ضئيلاً إذا كان المرشّح على <code>DATE_OF_BIRTH</code> انتقائياً جداً بذاته. وكلما كبر نطاق التاريخ، كبر فرق الأداء.</p>
<p>وبهذا المثال يمكننا أيضاً دحض خرافة أن العمود الأكثر انتقائية ينبغي أن يكون في الموضع الأيسر من الفهرس. فإذا نظرنا إلى الأشكال واعتبرنا انتقائية العمود الأول وحده، نرى أن كلا الشرطين يطابق 13 سجلاً. وهذا صحيح سواء رشّحنا بـ<code>DATE_OF_BIRTH</code> وحده أو بـ<code>SUBSIDIARY_ID</code> وحده. فالانتقائية عديمة الفائدة هنا، ومع ذلك يظل أحد ترتيبي الأعمدة أفضل من الآخر.</p>
<p>لتحسين الأداء، من المهم جداً معرفة نطاق الفهرس الممسوح. ومعظم قواعد البيانات يتيح لك رؤية ذلك في خطة التنفيذ—كل ما عليك معرفته هو ما تبحث عنه. وخطة التنفيذ التالية من قاعدة بيانات Oracle تشير إشارة لا لبس فيها إلى أن فهرس <code>EMP_TEST</code> يبدأ بالعمود <code>DATE_OF_BIRTH</code>.</p>
<p>Db2 (LUW)</p>
<pre><code>Explain Plan
----------------------------------------------------
ID | Operation         |                 Rows | Cost
 1 | RETURN            |                      |   26
 2 |  FETCH EMPLOYEES  |     3 of 3 (100.00%) |   26
 3 |   IXSCAN EMP_TEST | 3 of 10000 (   .03%) |    6

Predicate Information
 3 - START ( TO_DATE(?, 'YYYY-MM-DD') &lt;= Q1.DATE_OF_BIRTH)
     START (Q1.SUBSIDIARY_ID = ?)
      STOP (Q1.DATE_OF_BIRTH &lt;= TO_DATE(?, 'YYYY-MM-DD'))
      STOP (Q1.SUBSIDIARY_ID = ?)
      SARG (Q1.SUBSIDIARY_ID = ?)
</code></pre>
<p>في Db2 تُسمّى مُسندات الوصول <code>START</code> و/أو <code>STOP</code>، بينما تظهر مُسندات الترشيح كـ<code>SARG</code>.</p>
<p>Oracle</p>
<pre><code>--------------------------------------------------------------
|Id | Operation                    | Name      | Rows | Cost |
--------------------------------------------------------------
| 0 | SELECT STATEMENT             |           |    1 |    4 |
|*1 |  FILTER                      |           |      |      |
| 2 |   TABLE ACCESS BY INDEX ROWID| EMPLOYEES |    1 |    4 |
|*3 |    INDEX RANGE SCAN          | EMP_TEST  |    2 |    2 |
--------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
1 - filter(:END_DT &gt;= :START_DT)
3 - access(DATE_OF_BIRTH &gt;= :START_DT 
       AND DATE_OF_BIRTH &lt;= :END_DT)
    filter(SUBSIDIARY_ID  = :SUBS_ID)
</code></pre>
<p>PostgreSQL</p>
<pre><code>                            QUERY PLAN
-------------------------------------------------------------------
Index Scan using emp_test on employees
  (cost=0.01..8.59 rows=1 width=16)
  Index Cond: (date_of_birth &gt;= to_date('1971-01-01','YYYY-MM-DD'))
          AND (date_of_birth &lt;= to_date('1971-01-10','YYYY-MM-DD'))
          AND (subsidiary_id = 27::numeric)
</code></pre>
<p>لا تشير قاعدة بيانات PostgreSQL إلى مُسندات وصول الفهرس ومُسندات الترشيح في خطة التنفيذ. غير أن قسم <code>Index Cond</code> يسرد الأعمدة بترتيب تعريف الفهرس. وفي هذه الحالة نرى مُسندَي <code>DATE_OF_BIRTH</code> أولاً، ثم <code>SUBSIDIARY_ID</code>. وبمعرفة أن أي مُسندات تلي شرط نطاق لا يمكن أن تكون مُسند وصول، فلا بد أن يكون <code>SUBSIDIARY_ID</code> مُسند ترشيح. انظر <a href="/arabic-cs-library/book/use-the-index-luke/sql-explain-plan-postgresql-filter-predicates/index"><em>التمييز بين مُسندات الوصول والترشيح</em></a> لمزيد من التفاصيل.</p>
<p>SQL Server</p>
<pre><code>|--Nested Loops(Inner Join)
   |--Index Seek(OBJECT:emp_test,
   |               SEEK:       (date_of_birth, subsidiary_id)
   |                        &gt;= ('1971-01-01', 27)
   |                    AND    (date_of_birth, subsidiary_id)
   |                        &lt;= ('1971-01-10', 27),
   |              WHERE:subsidiary_id=27
   |            ORDERED FORWARD)
   |--RID Lookup(OBJECT:employees,
                   SEEK:Bmk1000=Bmk1000
                 LOOKUP ORDERED FORWARD)
</code></pre>
<p>يعرض SQL Server 2012 مُسندات البحث (=مُسندات الوصول) باستخدام <a href="/arabic-cs-library/book/use-the-index-luke/sql-partial-results-fetch-next-page/index#sb-row-values">صيغة قيم الصف</a>.</p>
<p>تعطي <em>معلومات المُسندات</em> الخاصة بـ<code>INDEX RANGE SCAN</code> التلميح الحاسم. فهي تحدّد شروط عبارة <code>where</code> إما كـ<em>مُسندات وصول</em> أو كـ<em>مُسندات ترشيح</em>. وهكذا تخبرنا قاعدة البيانات كيف تستخدم كل شرط.</p>
<h4>ملاحظة</h4>
<p>بُسّطت خطة التنفيذ للوضوح. ويشرح <a href="/arabic-cs-library/book/use-the-index-luke/sql-explain-plan-oracle-filter-predicates/index">الملحق</a> تفاصيل قسم «معلومات المُسندات» في خطة تنفيذ Oracle.</p>
<p>الشروط على العمود <code>DATE_OF_BIRTH</code> هي الوحيدة المدرجة كمُسندات وصول؛ وهي تحدّ نطاق الفهرس الممسوح. لذا فـ<code>DATE_OF_BIRTH</code> هو العمود الأول في فهرس <code>EMP_TEST</code>. أما العمود <code>SUBSIDIARY_ID</code> فيُستخدم كمُسند ترشيح فقط.</p>
<h4>مهم</h4>
<p><em>مُسندات الوصول</em> هي شرطا البداية والتوقف للبحث بالفهرس. وهي تحدّد نطاق الفهرس الممسوح.</p>
<p>أما <em>مُسندات ترشيح الفهرس</em> فتُطبَّق أثناء <a href="/arabic-cs-library/book/use-the-index-luke/sql-anatomy-the-leaf-nodes/index">تتبّع عقد الأوراق</a> فقط. وهي لا تضيّق نطاق الفهرس الممسوح.</p>
<p>ويشرح الملحق كيفية التعرّف على مُسندات الوصول في <a href="/arabic-cs-library/book/use-the-index-luke/sql-explain-plan-mysql-access-filter-predicates/index">MySQL</a> و<a href="/arabic-cs-library/book/use-the-index-luke/sql-explain-plan-sql-server-filter-predicates/index">SQL Server</a> و<a href="/arabic-cs-library/book/use-the-index-luke/sql-explain-plan-postgresql-filter-predicates/index">PostgreSQL</a>.</p>
<p>يمكن لقاعدة البيانات استخدام جميع الشروط كمُسندات وصول إذا عكسنا تعريف الفهرس:</p>
<p>Db2 (LUW)</p>
<pre><code>-----------------------------------------------------
ID | Operation          |                 Rows | Cost
 1 | RETURN             |                      |   13
 2 |  FETCH EMPLOYEES   |     3 of 3 (100.00%) |   13
 3 |   IXSCAN EMP_TEST2 | 3 of 10000 (   .03%) |    6

Predicate Information
 3 - START (Q1.SUBSIDIARY_ID = ?)
     START ( TO_DATE(?, 'YYYY-MM-DD') &lt;= Q1.DATE_OF_BIRTH)
      STOP (Q1.SUBSIDIARY_ID = ?)
      STOP (Q1.DATE_OF_BIRTH &lt;= TO_DATE(?, 'YYYY-MM-DD'))
</code></pre>
<p>Oracle</p>
<pre><code>---------------------------------------------------------------
| Id | Operation                    | Name      | Rows | Cost |
---------------------------------------------------------------
|  0 | SELECT STATEMENT             |           |    1 |    3 |
|* 1 |  FILTER                      |           |      |      |
|  2 |   TABLE ACCESS BY INDEX ROWID| EMPLOYEES |    1 |    3 |
|* 3 |    INDEX RANGE SCAN          | EMP_TEST2 |    1 |    2 |
---------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------
1 - filter(:END_DT &gt;= :START_DT)
3 - access(SUBSIDIARY_ID  = :SUBS_ID
       AND DATE_OF_BIRTH &gt;= :START_DT
       AND DATE_OF_BIRTH &lt;= :END_T)
</code></pre>
<p>PostgreSQL</p>
<pre><code>                            QUERY PLAN
-------------------------------------------------------------------
Index Scan using emp_test on employees
   (cost=0.01..8.29 rows=1 width=17)
   Index Cond: (subsidiary_id = 27::numeric)
           AND (date_of_birth &gt;= to_date('1971-01-01', 'YYYY-MM-DD'))
           AND (date_of_birth &lt;= to_date('1971-01-10', 'YYYY-MM-DD'))
</code></pre>
<p>لا تشير قاعدة بيانات PostgreSQL إلى مُسندات وصول الفهرس ومُسندات الترشيح في خطة التنفيذ. غير أن قسم <code>Index Cond</code> يسرد الأعمدة بترتيب تعريف الفهرس. وفي هذه الحالة نرى مُسند <code>SUBSIDIARY_ID</code> أولاً، ثم المُسندين على <code>DATE_OF_BIRTH</code>. وبما أنه لا يوجد عمود آخر مرشَّح بعد شرط النطاق على <code>DATE_OF_BIRTH</code>، نعلم أن جميع المُسندات يمكن استخدامها كمُسندات وصول. انظر <a href="/arabic-cs-library/book/use-the-index-luke/sql-explain-plan-postgresql-filter-predicates/index"><em>التمييز بين مُسندات الوصول والترشيح</em></a> لمزيد من التفاصيل.</p>
<p>SQL Server</p>
<pre><code>|--Nested Loops(Inner Join)
   |--Index Seek(OBJECT:emp_test,
   |               SEEK: subsidiary_id=27
   |                 AND date_of_birth &gt;= '1971-01-01'
   |                 AND date_of_birth &lt;= '1971-01-10'
   |            ORDERED FORWARD)
   |--RID Lookup(OBJECT:employees),
                   SEEK:Bmk1000=Bmk1000
                 LOOKUP ORDERED FORWARD)
</code></pre>
<p>أخيراً، هناك معامل <code>between</code>. فهو يتيح لك تحديد الحدين الأعلى والأدنى في شرط واحد:</p>
<pre><code>DATE_OF_BIRTH BETWEEN '01-JAN-71'
                  AND '10-JAN-71'
</code></pre>
<p>لاحظ أن <code>between</code> يضم القيم المحدَّدة دائماً، تماماً كاستخدام معاملي أصغر من أو يساوي (<code>&lt;=</code>):</p>
<pre><code>    DATE_OF_BIRTH &gt;= '01-JAN-71' 
AND DATE_OF_BIRTH &lt;= '10-JAN-71'
</code></pre>
`,t={book:e,chapter:n,chapterTitle:s,slug:o,title:a,headings:d,html:r};export{e as book,n as chapter,s as chapterTitle,t as default,d as headings,r as html,o as slug,a as title};
