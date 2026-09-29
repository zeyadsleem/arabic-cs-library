const s="database-foundations",a="sql-limit",n="The LIMIT clause",e="index",p="جملة LIMIT",l=[{depth:2,id:"limit",text:"LIMIT"},{depth:2,id:"offset",text:"OFFSET"},{depth:2,id:"sql-القياسية",text:"SQL القياسية"},{depth:2,id:"تمارين",text:"تمارين"}],o=`<blockquote>
<p>أهم شيء في لغة البرمجة هو الاسم. فلن تنجح لغة دون اسم جيد. وقد اخترعت حديثًا اسمًا جيدًا جدًا وأبحث الآن عن لغة مناسبة له. —Donald Knuth</p>
</blockquote>
<p>في هذا القسم، سننظر في كيفية تحديد عدد صفوف النتائج المعروضة. ومن قبيل المصادفة، يتيح هذا الموضوع الصغير فرصة جيدة للحديث بإيجاز عن معايير (SQL).</p>
<p>يمكنك اختبار أمثلة الشيفرة في جدول &quot;course&quot; في المخطط &quot;ucllcatalogue&quot; (أو في نسختك الخاصة من هذا الجدول في مخططك الشخصي).</p>
<h2 id="limit">LIMIT</h2>
<p>غالبًا ما تريد، نتيجةً لاستعلام، أن ترى النتائج الأولى فقط: 3 أو 5 أو 10... ويعرض الاستعلام التالي أعلى مقررين من حيث عدد النقاط:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> code, name, credits
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> credits <span class="hljs-keyword">DESC</span>
LIMIT <span class="hljs-number">2</span>;
</code></pre>
<p>من المنطقي أنك لا تستطيع فعل ذلك بشكل مفيد إلا إذا كانت جملة <code>ORDER BY</code> موجودة أيضًا. وهذه هي النتيجة:</p>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-limit-0-limit2.webp" alt="Limit the list to the upper two"></p>
<h2 id="offset">OFFSET</h2>
<p>افترض أنك لا تريد رؤية الرقمين 1 و2 كما أعلاه، بل تريد رؤية الرقمين التاليين (أي الرقمين 3 و4 في القائمة المرتبة). ويمكن فعل ذلك بسهولة كما يلي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> code, name, credits
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> credits <span class="hljs-keyword">DESC</span>
LIMIT <span class="hljs-number">2</span> <span class="hljs-keyword">OFFSET</span> <span class="hljs-number">2</span>;
</code></pre>
<h2 id="sql-القياسية">SQL القياسية</h2>
<p>ربما لاحظت في الاستعلام السابق أن هناك مقررات أخرى لها 6 نقاط. ويعرض النظام فعليًا — كما طُلب — اثنين فقط. ويمكننا تصوّر حالات نريد فيها رؤية المقررات الأخرى ذات النقاط الست أيضًا (وهي <em>&quot;المتعادلون&quot;</em> كما نسميهم غالبًا).</p>
<p>وبالمناسبة، هناك أمر آخر مثير للاهتمام: <code>LIMIT</code> و<code>OFFSET</code> ليستا في الواقع من SQL القياسية. فقد وُجدت منذ زمن طويل الحاجة إلى تحديد عدد الصفوف المعروضة بمقدار معين. ولم يكن لدى معيار SQL حل لذلك، فبدأ كل منشئ قواعد بيانات العمل على نسخته الخاصة. وقد جاء عدد من أنظمة إدارة قواعد البيانات (منها MySQL وPostgreSQL...) بصيغة <code>LIMIT</code>. ولم يلحق معيار SQL إلا في عام 2008 بـ: <code>FETCH FIRST ... ROWS</code> (<code>ONLY</code> أو <code>WITH TIES</code>). ويمكن أن يبدو الاستعلام السابق وفق SQL القياسية كما يلي (وهو مدعوم أيضًا في PostgreSQL):</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> code, name, credits
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> credits <span class="hljs-keyword">DESC</span>
<span class="hljs-keyword">OFFSET</span> <span class="hljs-number">2</span>
<span class="hljs-keyword">FETCH</span> <span class="hljs-keyword">FIRST</span> <span class="hljs-number">2</span> <span class="hljs-keyword">ROWS</span> <span class="hljs-keyword">ONLY</span>;
</code></pre>
<p>والنتيجة مطابقة لاستعلام <code>LIMIT / OFFSET</code>: يُعرض الناتجان 3 و4 من القائمة المرتبة (تنازليًا حسب عدد النقاط).</p>
<p>علاوة على ذلك، لهذه الصيغة حل أنيق لمشكلة &quot;المتعادلين&quot;: <code>WITH TIES</code>. ويعرض الاستعلام التالي الرقمين 3 و4 من القائمة، إلا إذا كانت هناك مقررات أخرى لها عدد النقاط نفسه للرقم 4. وفي هذه الحالة تستمر القائمة، كما يوضح الشكل أسفل الشيفرة:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> code, name, credits
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> credits <span class="hljs-keyword">DESC</span>
<span class="hljs-keyword">OFFSET</span> <span class="hljs-number">2</span>
<span class="hljs-keyword">FETCH</span> <span class="hljs-keyword">FIRST</span> <span class="hljs-number">2</span> <span class="hljs-keyword">ROWS</span> <span class="hljs-keyword">WITH</span> TIES;
</code></pre>
<p><img src="https://df.webontwerp.ucll.be/images/database-foundations/sql-limit-1-withties.webp" alt="extra rows with the same values are also shown"></p>
<div class="exercises"><h2 id="تمارين">تمارين</h2>
<p>كم عدد النقاط التي ينسّقها كل منسّق؟ اسرد جميع المنسّقين الذين ينسّقون رابع أكبر عدد من النقاط.</p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> coordinator, <span class="hljs-built_in">SUM</span>(credits) <span class="hljs-keyword">AS</span> number_of_credits_coordinated
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">GROUP</span> <span class="hljs-keyword">BY</span> coordinator
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> <span class="hljs-built_in">SUM</span>(credits) <span class="hljs-keyword">DESC</span>
<span class="hljs-keyword">OFFSET</span> <span class="hljs-number">3</span>
<span class="hljs-keyword">FETCH</span> <span class="hljs-keyword">FIRST</span> <span class="hljs-number">1</span> <span class="hljs-type">ROW</span> <span class="hljs-keyword">WITH</span> TIES;
</code></pre>
</div>`,c={book:s,chapter:a,chapterTitle:n,slug:e,title:p,headings:l,html:o};export{s as book,a as chapter,n as chapterTitle,c as default,l as headings,o as html,e as slug,p as title};
