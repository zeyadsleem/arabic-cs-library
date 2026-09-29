const s="use-the-index-luke",e="sql-where-clause-bind-parameters",n="Parameterized Queries",a="index",t="الاستعلامات ذات المعاملات",p=[{depth:2,id:"مشاركة-المؤشرات-والمعاملة-القسرية",text:"مشاركة المؤشرات والمعاملة القسرية"}],o=`<p>يغطي هذا القسم موضوعاً تُغفله معظم كتب SQL: <em>الاستعلامات ذات المعاملات</em> (parameterized queries) و<em>معاملات الربط</em> (bind parameters).</p>
<p>معاملات الربط—وتسمى أيضاً المعاملات الديناميكية أو متغيّرات الربط—هي طريقة بديلة لتمرير البيانات إلى قاعدة البيانات (database). فبدلاً من وضع القيم مباشرة في عبارة SQL، تستخدم مجرد عنصر نائب مثل <code>?</code> أو <code>:name</code> أو <code>@name</code> وتقدّم القيم الفعلية عبر نداء API منفصل.</p>
<p>لا عيب في كتابة القيم مباشرة في عبارات مخصّصة؛ غير أن هناك سببين وجيهين لاستخدام معاملات الربط في البرامج:</p>
<p>الأمان</p>
<p>متغيّرات الربط هي أفضل طريقة لمنع <a href="https://en.wikipedia.org/wiki/SQL_injection">حقن SQL</a> (SQL injection).</p>
<p>الأداء</p>
<p>يمكن لقواعد البيانات التي تملك ذاكرة مؤقتة لخطط التنفيذ (execution plan cache)، مثل SQL Server وقاعدة بيانات Oracle، أن تعيد استخدام خطة تنفيذ عند تنفيذ العبارة نفسها مرات متعددة. وهذا يوفّر جهد إعادة بناء خطة التنفيذ، لكنه لا يعمل إلا إذا كانت عبارة SQL <em>مطابقة تماماً</em>. وإذا وضعت قيماً مختلفة في عبارة SQL، تعاملها قاعدة البيانات كعبارة مختلفة وتعيد إنشاء خطة التنفيذ.</p>
<p>وعند استخدام معاملات الربط، لا تكتب القيم الفعلية بل تُدرج عناصر نائبة في عبارة SQL. وبذلك لا تتغير العبارات عند تنفيذها بقيم مختلفة.</p>
<h4>إن أعجبك هذا الموضوع، قد يعجبك أيضاً…</h4>
<p>… أن <a href="https://winand.at/lists">تشترك في <strong>القوائم البريدية</strong></a>، و<a href="https://use-the-index-luke.com/shop">تحصل على <strong>ملصقات مجانية</strong></a>، و<a href="https://sql-performance-explained.com/?utm_source=use-the-index-luke.com&amp;utm_campaign=sec-bind&amp;utm_medium=web">تشتري <strong>كتابي</strong></a>، أو <a href="https://winand.at/sql-training/open-online-class">تنضم إلى <strong>دورة تدريبية</strong></a>.</p>
<p>وبطبيعة الحال توجد استثناءات، مثلاً إذا كان حجم البيانات المتأثرة يعتمد على القيم الفعلية:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> first_name, last_name
  <span class="hljs-keyword">FROM</span> employees
 <span class="hljs-keyword">WHERE</span> subsidiary_id <span class="hljs-operator">=</span> <span class="hljs-number">20</span>
</code></pre>
<pre><code>99 rows selected.

----------------------------------------------------------------
|Id | Operation                   | Name         | Rows | Cost |
----------------------------------------------------------------
| 0 | SELECT STATEMENT            |              |   99 |   70 |
| 1 |  TABLE ACCESS BY INDEX ROWID| EMPLOYEES    |   99 |   70 |
|*2 |   INDEX RANGE SCAN          | EMPLOYEES_PK |   99 |    2 |
----------------------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------

   2 - access(&quot;SUBSIDIARY_ID&quot;=20)
</code></pre>
<p>يقدّم البحث بالفهرس أفضل أداء للشركات الفرعية الصغيرة، لكن <code>TABLE ACCESS FULL</code> قد يتفوق على الفهرس للشركات الفرعية الكبيرة:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> first_name, last_name
  <span class="hljs-keyword">FROM</span> employees
 <span class="hljs-keyword">WHERE</span> subsidiary_id <span class="hljs-operator">=</span> <span class="hljs-number">30</span>
</code></pre>
<pre><code>1000 rows selected.

----------------------------------------------------
| Id | Operation         | Name      | Rows | Cost |
----------------------------------------------------
|  0 | SELECT STATEMENT  |           | 1000 |  478 |
|* 1 |  TABLE ACCESS FULL| EMPLOYEES | 1000 |  478 |
----------------------------------------------------

Predicate Information (identified by operation id):
---------------------------------------------------

   1 - filter(&quot;SUBSIDIARY_ID&quot;=30)
</code></pre>
<p>في هذه الحالة، يؤدي المدرج التكراري على <code>SUBSIDIARY_ID</code> غرضه. ويستخدمه المُحسِّن (optimizer) لتحديد تكرار معرّف الشركة الفرعية المذكور في استعلام SQL. وبالتالي يحصل على تقديرين مختلفين لعدد الصفوف لكلا الاستعلامين.</p>
<p>لذا سيؤدي حساب التكلفة اللاحق إلى قيمتي تكلفة مختلفتين. وعندما يختار المُحسِّن خطة تنفيذ في النهاية، يأخذ الخطة ذات قيمة التكلفة الأدنى. وبالنسبة للشركة الفرعية الأصغر، تكون هي الخطة التي تستخدم الفهرس.</p>
<p>وتتأثر تكلفة عملية <code>TABLE ACCESS BY INDEX ROWID</code> بشدة بتقدير عدد الصفوف. فاختيار عشرة أضعاف عدد الصفوف سيرفع قيمة التكلفة بهذا العامل. وبذلك تصبح التكلفة الإجمالية باستخدام الفهرس أعلى حتى من مسح كامل للجدول. لذا سيختار المُحسِّن خطة التنفيذ الأخرى للشركة الفرعية الأكبر.</p>
<p>وعند استخدام معاملات الربط، لا تتوفر للمُحسِّن قيم محددة لتحديد تكرارها. فيفترض حينها توزيعاً متساوياً ويحصل دائماً على تقديرات عدد الصفوف وقيم التكلفة نفسها. وفي النهاية سيختار دائماً خطة التنفيذ نفسها.</p>
<h4>نصيحة</h4>
<p>تكون المدرجات التكرارية للأعمدة أكثر فائدة إذا لم تكن القيم موزّعة توزيعاً منتظماً.</p>
<p>وبالنسبة للأعمدة ذات التوزيع المنتظم، يكفي غالباً قسمة عدد القيم المتمايزة على عدد صفوف الجدول. وتعمل هذه الطريقة أيضاً عند استخدام معاملات الربط.</p>
<p>وإذا قارنّا المُحسِّن بالمترجم (compiler)، فمعاملات الربط تشبه متغيّرات البرنامج، أما إذا كتبت القيم مباشرة في العبارة فهي أشبه بالثوابت. وتستطيع قاعدة البيانات استخدام القيم من عبارة SQL أثناء التحسين كما يستطيع المترجم تقييم التعبيرات الثابتة أثناء الترجمة. وببساطة، لا تكون معاملات الربط مرئية للمُحسِّن، كما أن قيم المتغيّرات في زمن التشغيل غير معروفة للمترجم.</p>
<p>ومن هذا المنظور، من المفارقات قليلاً أن معاملات الربط قد تحسّن الأداء، مع أن عدم استخدامها يمكّن المُحسِّن من اختيار أفضل خطة تنفيذ دائماً. لكن السؤال: بأي ثمن؟ إن توليد جميع صور خطة التنفيذ وتقييمها جهد هائل لا يستحق التكلفة إذا كنت ستحصل على النتيجة نفسها في النهاية على أي حال.</p>
<h4>نصيحة</h4>
<p>عدم استخدام معاملات الربط يشبه إعادة ترجمة البرنامج في كل مرة.</p>
<p>يمثّل قرار بناء خطة تنفيذ متخصصة أو عامة معضلة لقاعدة البيانات. فإما أن يُبذل الجهد لتقييم جميع صور الخطة الممكنة لكل تنفيذ للحصول دائماً على أفضل خطة تنفيذ، وإما أن يُوفَّر عبء التحسين وتُستخدم خطة تنفيذ مخزّنة مؤقتاً كلما أمكن—مع قبول خطر استخدام خطة تنفيذ دون المستوى الأمثل. والمأزق أن قاعدة البيانات لا تعرف إن كانت دورة التحسين الكاملة ستنتج خطة تنفيذ مختلفة دون أن تنفّذ التحسين الكامل فعلاً. ويحاول موردو قواعد البيانات حل هذه المعضلة بطرق استكشافية—لكن بنجاح محدود جداً.</p>
<p>وبوصفك مطوّراً، يمكنك استخدام معاملات الربط عن قصد للمساعدة في حل هذه المعضلة. أي ينبغي أن تستخدم معاملات الربط دائماً باستثناء القيم التي <em>يُفترض</em> أن تؤثر في خطة التنفيذ.</p>
<p>ورموز الحالة الموزّعة توزيعاً غير منتظم مثل «todo» و«done» مثال جيد. فعدد مدخلات «done» يتجاوز غالباً سجلات «todo» بمرتبة قدر. ولا معنى لاستخدام فهرس إلا عند البحث عن مدخلات «todo» في هذه الحالة. والتقسيم (partitioning) مثال آخر—أي إذا قسّمت الجداول والفهارس على عدة مناطق تخزين. ويمكن للقيم الفعلية حينها أن تؤثر في الأقسام التي يجب مسحها. وقد يعاني أداء استعلامات <code>LIKE</code> من معاملات الربط أيضاً كما سنرى في <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-searching-for-ranges-like-performance-tuning/index">القسم التالي</a>.</p>
<h4>نصيحة</h4>
<p>في الواقع، ليست إلا حالات قليلة تؤثر فيها القيم الفعلية في خطة التنفيذ. لذا ينبغي أن تستخدم معاملات الربط عند الشك—فقط لمنع حقن SQL.</p>
<p>تعرض مقتطفات الشيفرة التالية كيفية استخدام معاملات الربط في لغات برمجة مختلفة.</p>
<p>C#</p>
<p>بدون معاملات الربط:</p>
<pre><code class="language-python"><span class="hljs-built_in">int</span> subsidiary_id;
SqlCommand cmd = new SqlCommand(
                   <span class="hljs-string">&quot;select first_name, last_name&quot;</span> 
                 + <span class="hljs-string">&quot;  from employees&quot;</span>
                 + <span class="hljs-string">&quot; where subsidiary_id = &quot;</span> + subsidiary_id
                 , connection);
</code></pre>
<p>باستخدام معامل ربط:</p>
<pre><code class="language-python"><span class="hljs-built_in">int</span> subsidiary_id;
SqlCommand cmd =
       new SqlCommand(
                      <span class="hljs-string">&quot;select first_name, last_name&quot;</span> 
                    + <span class="hljs-string">&quot;  from employees&quot;</span>
                    + <span class="hljs-string">&quot; where subsidiary_id = @subsidiary_id
                    , connection);
cmd.Parameters.AddWithValue(&quot;</span>@subsidiary_id<span class="hljs-string">&quot;, subsidiary_id);
</span></code></pre>
<p>انظر أيضاً: توثيق فئة <a href="https://learn.microsoft.com/en-us/dotnet/api/system.data.sqlclient.sqlparametercollection?view=netframework-4.8.1&amp;viewFallbackFrom=dotnet-plat-ext-5.0"><code>SqlParameterCollection</code></a>.</p>
<p>Java</p>
<p>بدون معاملات الربط:</p>
<pre><code class="language-python"><span class="hljs-built_in">int</span> subsidiary_id;
Statement command = connection.createStatement(
                    <span class="hljs-string">&quot;select first_name, last_name&quot;</span> 
                  + <span class="hljs-string">&quot;  from employees&quot;</span>
                  + <span class="hljs-string">&quot; where subsidiary_id = &quot;</span> + subsidiary_id
                  );
</code></pre>
<p>باستخدام معامل ربط:</p>
<pre><code class="language-python"><span class="hljs-built_in">int</span> subsidiary_id;
PreparedStatement command = connection.prepareStatement(
                    <span class="hljs-string">&quot;select first_name, last_name&quot;</span> 
                  + <span class="hljs-string">&quot;  from employees&quot;</span>
                  + <span class="hljs-string">&quot; where subsidiary_id = ?&quot;</span>
                  );
command.setInt(<span class="hljs-number">1</span>, subsidiary_id);
</code></pre>
<p>انظر أيضاً: توثيق فئة <a href="https://docs.oracle.com/javase/8/docs/api/java/sql/PreparedStatement.html"><code>PreparedStatement</code></a>.</p>
<p>Perl</p>
<p>بدون معاملات الربط:</p>
<pre><code class="language-python">my $subsidiary_id;
my $sth = $dbh-&gt;prepare(
                  <span class="hljs-string">&quot;select first_name, last_name&quot;</span> 
                . <span class="hljs-string">&quot;  from employees&quot;</span>
                . <span class="hljs-string">&quot; where subsidiary_id = $subsidiary_id&quot;</span>
                );
$sth-&gt;execute();
</code></pre>
<p>باستخدام معامل ربط:</p>
<pre><code class="language-python">my $subsidiary_id;
my $sth = $dbh-&gt;prepare(
                  <span class="hljs-string">&quot;select first_name, last_name&quot;</span> 
                . <span class="hljs-string">&quot;  from employees&quot;</span>
                . <span class="hljs-string">&quot; where subsidiary_id = ?&quot;</span>
                );
$sth-&gt;execute($subsidiary_id);
</code></pre>
<p>انظر: <a href="https://docstore.mik.ua/orelly/linux/dbi/ch05_03.htm">Programming the Perl DBI</a>.</p>
<p>PHP</p>
<p>باستخدام MySQL، بدون معاملات الربط:</p>
<pre><code class="language-python">$mysqli-&gt;query(<span class="hljs-string">&quot;select first_name, last_name&quot;</span> 
             . <span class="hljs-string">&quot;  from employees&quot;</span>
             . <span class="hljs-string">&quot; where subsidiary_id = &quot;</span> . $subsidiary_id);
</code></pre>
<p>باستخدام معامل ربط:</p>
<pre><code class="language-python"><span class="hljs-keyword">if</span> ($stmt = $mysqli-&gt;prepare(<span class="hljs-string">&quot;select first_name, last_name&quot;</span> 
                           . <span class="hljs-string">&quot;  from employees&quot;</span>
                           . <span class="hljs-string">&quot; where subsidiary_id = ?&quot;</span>)) 
{
   $stmt-&gt;bind_param(<span class="hljs-string">&quot;i&quot;</span>, $subsidiary_id);
   $stmt-&gt;execute();
} <span class="hljs-keyword">else</span> {
  /* handle SQL error */
}
</code></pre>
<p>انظر أيضاً: توثيق فئة <a href="https://www.php.net/manual/en/mysqli-stmt.bind-param.php"><code>mysqli_stmt::bind_param</code></a> و<a href="https://www.php.net/manual/en/pdo.prepared-statements.php">«العبارات المُعدّة والإجراءات المخزّنة» في توثيق PDO</a>.</p>
<p>Ruby</p>
<p>بدون معاملات الربط:</p>
<pre><code class="language-python">dbh.execute(<span class="hljs-string">&quot;select first_name, last_name&quot;</span> 
          + <span class="hljs-string">&quot;  from employees&quot;</span>
          + <span class="hljs-string">&quot; where subsidiary_id = #{subsidiary_id}&quot;</span>);
</code></pre>
<p>باستخدام معامل ربط:</p>
<pre><code class="language-python">dbh.prepare(<span class="hljs-string">&quot;select first_name, last_name&quot;</span> 
          + <span class="hljs-string">&quot;  from employees&quot;</span>
          + <span class="hljs-string">&quot; where subsidiary_id = ?&quot;</span>);
dbh.execute(subsidiary_id);
</code></pre>
<p>انظر أيضاً: <a href="https://web.archive.org/web/20190228233411/http://www.kitebird.com/articles/ruby-dbi.html#TOC_8">«الاقتباس والعناصر النائبة وربط المعاملات» في درس Ruby DBI</a>.</p>
<h4>انظر أيضاً</h4>
<p><a href="/arabic-cs-library/book/use-the-index-luke/sql-myth-directory-dynamic-sql-is-slow/index#myth-dynamic-sql-sample">أمثلة باستخدام أدوات ORM</a></p>
<p>علامة الاستفهام (<code>?</code>) هي محرف العنصر النائب الوحيد الذي يعرّفه معيار SQL. وعلامات الاستفهام معاملات موضعية؛ أي أنها ترقَّم من اليسار إلى اليمين. ولربط قيمة بعلامة استفهام معينة، عليك تحديد رقمها. وقد يكون ذلك غير عملي جداً لأن الترقيم يتغير عند إضافة عناصر نائبة أو حذفها. وتقدّم قواعد بيانات كثيرة امتداداً خاصاً للمعاملات المسمّاة لحل هذه المشكلة—مثلاً باستخدام رمز «at» (<code>@name</code>) أو النقطتين (<code>:name</code>).</p>
<h4>ملاحظة</h4>
<p>لا تستطيع معاملات الربط تغيير بنية عبارة SQL.</p>
<p>ويعني ذلك أنك لا تستطيع استخدام معاملات الربط لأسماء الجداول أو الأعمدة. ومعاملات الربط التالية لا تعمل:</p>
<pre><code>String sql = prepare(&quot;SELECT * FROM ? WHERE ?&quot;);

sql.execute('employees', 'employee_id = 1');
</code></pre>
<p>وإذا احتجت إلى تغيير بنية عبارة SQL أثناء التشغيل، فاستخدم <a href="/arabic-cs-library/book/use-the-index-luke/sql-myth-directory-dynamic-sql-is-slow/index">SQL الديناميكي</a>.</p>
<h2 id="مشاركة-المؤشرات-والمعاملة-القسرية">مشاركة المؤشرات والمعاملة القسرية</h2>
<p>كلما زاد تعقيد المُحسِّن واستعلام SQL، زادت أهمية التخزين المؤقت لخطط التنفيذ. وتملك قاعدتا بيانات SQL Server وOracle ميزات لاستبدال القيم الحرفية في سلسلة SQL بمعاملات ربط تلقائياً. وتسمى هذه الميزات <code>CURSOR_SHARING</code> (في Oracle) أو <em>المعاملة القسرية</em> (forced parameterization) (في SQL Server).</p>
<p>وكلتا الميزتين حلّان بديلان للتطبيقات التي لا تستخدم معاملات الربط إطلاقاً. وتمكين هاتين الميزتين يمنع المطوّرين من استخدام القيم الحرفية عن قصد.</p>
<h4>انظر أيضاً</h4>
<ul>
<li>يضم <a href="/arabic-cs-library/book/use-the-index-luke/sql-where-clause-obfuscation-smart-logic/index#smart_logic_affected"><em>المنطق الذكي</em></a> مزيداً من المعلومات عن قدرات التخزين المؤقت لخطط التنفيذ في مختلف قواعد البيانات.</li>
<li>مقال: <a href="https://use-the-index-luke.com/blog/2011-07-16/planning-for-reuse">Planning for Execution Plan Reuse</a></li>
</ul>
`,r={book:s,chapter:e,chapterTitle:n,slug:a,title:t,headings:p,html:o};export{s as book,e as chapter,n as chapterTitle,r as default,p as headings,o as html,a as slug,t as title};
