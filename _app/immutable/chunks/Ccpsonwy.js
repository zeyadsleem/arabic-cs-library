const s="database-foundations",a="sql-orderby",n="بَند ORDER BY بالتفصيل",e="index",l="جملة ORDER BY بالتفصيل",p=[{depth:2,id:"الترتيب-حسب-الأعمدة",text:"الترتيب حسب الأعمدة"},{depth:3,id:"حسب-اسم-العمود",text:"حسب اسم العمود"},{depth:3,id:"حسب-الرقم-التسلسلي-للعمود",text:"حسب الرقم التسلسلي للعمود"},{depth:2,id:"الترتيب-تصاعديا-وتنازليا",text:"الترتيب تصاعديًا وتنازليًا"},{depth:2,id:"الترتيب-حسب-التعبيرات",text:"الترتيب حسب التعبيرات"},{depth:2,id:"ماذا-عن-قيم-null",text:"ماذا عن قيم NULL؟"},{depth:2,id:"تمارين",text:"تمارين"},{depth:2,id:"تمارين-sqlzoo",text:"تمارين SQLzoo"},{depth:3,id:"جدول-الفائزين-بجائزة-نوبل",text:"جدول الفائزين بجائزة نوبل"}],o=`<blockquote>
<p>ينبغي أن يتعلم كل شخص في هذا البلد برمجة الحاسوب، لأنها تعلّمك كيف تفكر. —Steve Jobs</p>
</blockquote>
<p>إذا أعطاك استعلام <code>SELECT</code> عددًا من الصفوف نتيجةً، فإن الترتيب الذي تُعرض به <em>غير متوقع</em>. والطريقة الوحيدة للحصول على ترتيب معين هي استخدام جملة <code>ORDER BY</code>.</p>
<p>يمكنك اختبار أمثلة الشيفرة في جدول &quot;course&quot; في المخطط &quot;ucllcatalogue&quot; (أو في نسختك الخاصة من هذا الجدول في مخططك الشخصي).</p>
<h2 id="الترتيب-حسب-الأعمدة">الترتيب حسب الأعمدة</h2>
<h3 id="حسب-اسم-العمود">حسب اسم العمود</h3>
<p>يعرض الاستعلام التالي ثلاثة أعمدة لجميع المقررات التي لها أقل من 6 نقاط:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> code, credits, name
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">WHERE</span> credits <span class="hljs-operator">&lt;</span> <span class="hljs-number">6</span>;
</code></pre>
<p>كما ذُكر، لا يمكنك قول شيء مسبقًا عن الترتيب الذي تُعرض به هذه الصفوف. وإذا أردت ترتيب الصفوف بحيث تُرتَّب النقاط من الصغير إلى الكبير، فيمكنك فعل ذلك باستخدام ترويسة العمود في جملة <code>ORDER BY</code>:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> code, credits, name
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">WHERE</span> credits <span class="hljs-operator">&lt;</span> <span class="hljs-number">6</span>
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> credits <span class="hljs-keyword">ASC</span>;
</code></pre>
<p>ويمكن إغفال الإضافة <code>ASC</code> (&quot;تصاعدي&quot;)، لأن ذلك هو <em>الترتيب القياسي</em>.</p>
<p>ولأن الأمر مهم إلى هذا الحد، لنستعرض مرة أخرى الترتيب الذي يُنفَّذ به هذا الاستعلام:</p>
<ol>
<li>أولًا <code>FROM</code>: ما الجداول التي ينبغي تحميلها في ذاكرة العمل؟</li>
<li>ثم <code>WHERE</code>: تُبقى فقط الصفوف التي تحقق هذا الشرط، وتُحذف البقية.</li>
<li>ثم <code>GROUP BY</code>، يتبعه مباشرة <code>HAVING</code>. وهاتان الجملتان غير موجودتين في هذا المثال.</li>
<li>وعندها فقط تأتي جملة <code>SELECT</code>: ما الأعمدة التي ينبغي عرضها؟</li>
<li>وأخيرًا <code>ORDER BY</code>: بأي ترتيب تُعرض الصفوف؟</li>
</ol>
<p>وهذه نتيجة الاستعلام:</p>
<p><img src="/arabic-cs-library/images/database-foundations/sql-orderby-0-orderbySP.webp" alt="الترتيب تصاعديًا حسب عدد الوحدات المعتمدة (credits)"> المقررات ذات أقل عدد من النقاط في الأعلى. وداخل الصفوف ذات القيمة نفسها لعدد النقاط (مثل 3)، يبقى الترتيب غير متوقع. غير أنه يمكنك تحديد أكثر من عمود للترتيب حسبه. افترض أنك تريد الترتيب أولًا حسب عدد النقاط المتزايد ثم (داخل الصفوف ذات عدد النقاط نفسه) أبجديًا حسب الاسم، فيمكنك فعل ذلك كما يلي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> code, credits, name
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">WHERE</span> credits <span class="hljs-operator">&lt;</span> <span class="hljs-number">6</span>
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> credits, name;
</code></pre>
<p>وهذه هي النتيجة:</p>
<p><img src="/arabic-cs-library/images/database-foundations/sql-orderby-1-orderbySPnaam.webp" alt="الترتيب تصاعديًا حسب عدد الوحدات المعتمدة (credits) ثم حسب الاسم"></p>
<p>لاحظ أن الترتيب مهم: <code>ORDER BY credits, name</code> يعيد نتيجة مختلفة عن <code>ORDER BY name, credits</code>!</p>
<h3 id="حسب-الرقم-التسلسلي-للعمود">حسب الرقم التسلسلي للعمود</h3>
<p>كما يحدث كثيرًا في SQL، هناك طريقة أقصر لكتابة الأمور. خذ الاستعلام الأخير مثالًا:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> code, credits, name
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">WHERE</span> credits <span class="hljs-operator">&lt;</span> <span class="hljs-number">6</span>
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> credits, name;
</code></pre>
<p>والبديل الأقصر هو <em>كتابة أرقام الأعمدة</em> من <code>SELECT</code> بدلًا من استخدام الاسم:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> code, credits, name
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">WHERE</span> credits <span class="hljs-operator">&lt;</span> <span class="hljs-number">6</span>
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> <span class="hljs-number">2</span>, <span class="hljs-number">3</span>;
</code></pre>
<p>ثم تحتاج بالطبع إلى معرفة أرقام الأعمدة في <code>SELECT</code>. والعيب الصغير هو أنه يتعيّن عليك تغيير أرقام الأعمدة إذا قررت إضافة عمود إضافي في جملة <code>SELECT</code>، كما في هذا الاستعلام الموسّع مثلًا:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> code, coordinator, credits, name <span class="hljs-comment">-- extra second column</span>
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">WHERE</span> credits <span class="hljs-operator">&lt;</span> <span class="hljs-number">6</span>
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> <span class="hljs-number">3</span>, <span class="hljs-number">4</span>; <span class="hljs-comment">-- add 1 to all column numbers</span>
</code></pre>
<h2 id="الترتيب-تصاعديا-وتنازليا">الترتيب تصاعديًا وتنازليًا</h2>
<p>بـ <code>ASC</code> ترتّب من الصغير إلى الكبير. وهذه أيضًا القيمة الافتراضية، لذا يمكنك إغفالها. ويُرتَّب من الكبير إلى الصغير بـ <code>DESC</code>. وخصوصًا إذا لم تكن الإنجليزية لغتك الأم، فقد يكون من الصعب استنتاج ترتيب الفرز الصحيح من السؤال الذي تحاول الإجابة عنه. ففي اللغة هناك طرق كثيرة مختلفة لقول الشيء نفسه تقريبًا. وهذه نظرة موجزة مع بعض الاحتمالات:</p>
<ul>
<li><code>ASC</code>: من الصغير إلى الكبير، تصاعديًا، أبجديًا، زمنيًا، تزايديًا، متزايدًا، ناميًا...</li>
<li><code>DESC</code>: من الكبير إلى الصغير، تنازليًا، عكس الزمني، متناقصًا، متقلّصًا...</li>
</ul>
<h2 id="الترتيب-حسب-التعبيرات">الترتيب حسب التعبيرات</h2>
<p>أنت تعرف بالفعل أنه يمكنك إضافة أعمدة جديدة بنفسك (<a href="/arabic-cs-library/book/database-foundations/sql-select/index#Creating-new-columns">انظر فصل SELECT</a>). ويمكنك فعل الشيء نفسه في جملة ORDER BY كما يوضح المثال التالي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> code, coordinator, credits, name
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span>
  <span class="hljs-keyword">CASE</span>
    <span class="hljs-keyword">WHEN</span> credits <span class="hljs-operator">&lt;=</span> <span class="hljs-number">6</span> <span class="hljs-keyword">THEN</span> <span class="hljs-string">&#x27;normal&#x27;</span>
    <span class="hljs-keyword">ELSE</span> <span class="hljs-string">&#x27;special&#x27;</span>
  <span class="hljs-keyword">END</span>;
</code></pre>
<p>ويمكنك مقارنة ذلك بإضافة عمود جديد (ضع <code>CASE</code> في <code>SELECT</code> لتجربته) ثم الترتيب حسب هذا العمود الجديد. ويعطي هذا الاستعلام جميع المقررات ذات 6 نقاط أو أقل القيمة &quot;normal&quot; وجميع المقررات الأكبر القيمة &quot;special&quot;. ثم تُرتَّب النتائج حسب هاتين القيمتين. وبما أن &quot;special&quot; يأتي لاحقًا في الترتيب الأبجدي بعد &quot;normal&quot;، فستكون جميع المقررات ذات 6 نقاط أو أقل في أعلى القائمة.</p>
<p>ومثال ثانٍ: غالبًا ما يكون للحرف الأخير من رمز المقرر معنى خاص. ويتيح الاستعلام التالي الترتيب حسب هذا الحرف الأخير (&quot;A&quot; و&quot;H&quot; وغيرها):</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> code, coordinator, credits, name
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> <span class="hljs-built_in">substring</span>(code <span class="hljs-keyword">FROM</span> <span class="hljs-number">6</span>); <span class="hljs-comment">-- all letters from the 6th, so only the last letter</span>
</code></pre>
<h2 id="ماذا-عن-قيم-null">ماذا عن قيم NULL؟</h2>
<p>كما شُرح بالفعل في <a href="/arabic-cs-library/book/database-foundations/sql-csv/index#Ranking-based-on-Internet-speed">حل التمرين الأول على مجموعة بيانات CSV</a>، لا يحدد معيار SQL ما ينبغي فعله بقيم <code>NULL</code> في عمود يُرتَّب. ويعتبر PostgreSQL قيمة <code>NULL</code> أكبر من جميع القيم الأخرى، وبالتالي ستظهر الصفوف التي تحتوي هذه القيمة في العمود المرتَّب حسبه في أسفل القائمة. وهناك أنظمة قواعد بيانات أخرى تفعل العكس...</p>
<div class="exercises"><h2 id="تمارين">تمارين</h2>
<p>اسرد جميع المقررات مرتبة أبجديًا حسب المنسّق، ولكل منسّق مرتبة تصاعديًا حسب الفصل الدراسي.</p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> name, coordinator, semester
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> coordinator <span class="hljs-keyword">ASC</span>, semester <span class="hljs-keyword">ASC</span>;
</code></pre>
<p>رتّب المقررات على أساس مدة تدريسها. والمقررات التي دُرِّست أطول مدة في الأعلى. وإذا كان تاريخ الانتهاء <code>NULL</code>، فيجوز لك تعيين عدد السنوات مساويًا 1.</p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> name, start_date, end_date,
  <span class="hljs-keyword">CASE</span>
    <span class="hljs-keyword">WHEN</span> end_date <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NULL</span> <span class="hljs-keyword">THEN</span> <span class="hljs-number">1</span>
     <span class="hljs-keyword">ELSE</span>(end_date <span class="hljs-operator">-</span> start_date) <span class="hljs-operator">/</span> <span class="hljs-number">365.25</span>     <span class="hljs-comment">-- Every 4 years a leap year, not entirely correct, but good enough</span>
  <span class="hljs-keyword">END</span> <span class="hljs-keyword">AS</span> number_of_years_given
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">ORDER</span> <span class="hljs-keyword">BY</span> <span class="hljs-number">4</span> <span class="hljs-keyword">DESC</span>;
</code></pre>
<h2 id="تمارين-sqlzoo">تمارين SQLzoo</h2>
<h3 id="جدول-الفائزين-بجائزة-نوبل">جدول الفائزين بجائزة نوبل</h3>
<p>جدول الفائزين بجائزة نوبل بالأعمدة التالية:</p>
<ul>
<li>yr: السنة،</li>
<li>subject: مجال الدراسة، الموضوع،</li>
<li>winner: اسم الفائز.</li>
</ul>
<p><a href="https://sqlzoo.net/wiki/SELECT_from_Nobel_Tutorial">سلسلة التمارين 3</a> تحتوي أساسًا على تمارين على <code>WHERE</code>. وفي التمارين الأخيرة، ينبغي أن تستخدم أيضًا <code>ORDER BY</code>.</p>
<p>والآن أنجز <a href="https://sqlzoo.net/wiki/Nobel_Quiz">الاختبار 3</a> على جدول الفائزين بنوبل.</p>
</div>`,c={book:s,chapter:a,chapterTitle:n,slug:e,title:l,headings:p,html:o};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,o as html,e as slug,l as title};
