const s="database-foundations",n="sql-where",a="The WHERE clause in detail",e="index",o="جملة WHERE بالتفصيل",p=[{depth:2,id:"معاملات-المقارنة-القياسية",text:"معاملات المقارنة القياسية"},{depth:2,id:"is-not-null",text:"IS (NOT) NULL"},{depth:2,id:"أنماط-السلاسل-بواسطة-like",text:"أنماط السلاسل بواسطة LIKE"},{depth:2,id:"الاحتفاظ-بالصفوف-التي-لا-تحقق-شرطا",text:"الاحتفاظ بالصفوف التي لا تحقق شرطًا"},{depth:2,id:"ربط-الشروط-بـ-and-وor",text:"ربط الشروط بـ AND وOR"},{depth:2,id:"between",text:"BETWEEN"},{depth:2,id:"in",text:"IN"},{depth:2,id:"نظرة-عامة-على-المعاملات",text:"نظرة عامة على المعاملات"},{depth:2,id:"تمارين-sqlzoo",text:"تمارين SQLzoo"},{depth:3,id:"جدول-world",text:"جدول 'world'"}],l=`<blockquote>
<p>الشيفرة موجودة لتشرح التعليقات للحاسوب. —Andy Harris</p>
</blockquote>
<p>في جملة <code>SELECT</code> مثل:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> code, coordinator
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">WHERE</span> coordinator <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;u0012047&#x27;</span>;
</code></pre>
<p>تُنفَّذ جملة <code>FROM</code> أولًا على يد خادم قاعدة البيانات. ويُحمَّل جدول &quot;course&quot; بأكمله في ذاكرة العمل. ونحن نعلم: نحن نكرر أنفسنا، لكن هذه معرفة أساسية حقًا إن كنت تريد أن تكون قادرًا على كتابة استعلامات جيدة.</p>
<p>ثم تُنفَّذ جملة <code>WHERE</code> (إن وُجدت). وتُبقى فقط الصفوف <em>التي تحقق الشرط</em> في <code>WHERE</code>. وتختفي جميع الصفوف الأخرى من الذاكرة. وبعد ذلك يُنفَّذ <code>SELECT</code>. وفي هذا الفصل، سننظر عن قرب في بعض إمكانات <code>WHERE</code>.</p>
<p>يمكنك اختبار أمثلة الشيفرة في جدول &quot;course&quot; في المخطط &quot;ucllcatalogue&quot; (أو في نسختك الخاصة من هذا الجدول في مخططك الشخصي).</p>
<h2 id="معاملات-المقارنة-القياسية">معاملات المقارنة القياسية</h2>
<p>توفّر SQL معاملات المقارنة القياسية: <code>=</code> (يساوي)، و<code>&lt;&gt;</code> أو <code>!=</code> (لا يساوي)، و<code>&gt;</code> (أكبر من)، و<code>=</code> (أكبر من أو يساوي) و<code>&lt;=</code> (أصغر من أو يساوي). ويمكنك مقارنة الأعداد والسلاسل والتواريخ أو الطوابع الزمنية. ويعرض الاستعلام التالي جميع المقررات التي تاريخ بدايتها قبل 5 أبريل 2017:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">WHERE</span> start_date <span class="hljs-operator">&lt;</span> <span class="hljs-string">&#x27;2017-04-05&#x27;</span>; <span class="hljs-comment">--input date in ISO-format with single quotes</span>
</code></pre>
<p>والتاريخ <em>الأبعد في الماضي</em> <em>أصغر</em> من التاريخ اللاحق، كما تتوقع منطقيًا.</p>
<p>ومقارنة السلاسل أعقد قليلًا. وللأسف فالنتيجة <em>خاصة بكل قاعدة بيانات</em>. فأن 'a' &lt; 'b' أمر بديهي، ولكن ماذا عن مقارنة 'a' و'A'؟ أتدري؟ لنجربه ببساطة في PostgreSQL:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-string">&#x27;a&#x27;</span> <span class="hljs-operator">&lt;</span> <span class="hljs-string">&#x27;A&#x27;</span>;
</code></pre>
<p>والنتيجة <code>true</code>. ونستنتج: <em>في PostgreSQL</em> تأتي الحروف الصغيرة قبل الحروف الكبيرة. وقد يكون الأمر بالعكس في نظام إدارة قواعد بيانات آخر.</p>
<p>وماذا عن المقارنة بين 'magic' و'monkey' وبين 'cent' و'century'؟ لنجرّب هذا:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-string">&#x27;magic&#x27;</span> <span class="hljs-operator">&gt;</span> <span class="hljs-string">&#x27;monkey&#x27;</span>;
<span class="hljs-keyword">SELECT</span> <span class="hljs-string">&#x27;cent&#x27;</span> <span class="hljs-operator">&gt;</span> <span class="hljs-string">&#x27;century&#x27;</span>;
</code></pre>
<p>والنتيجة <code>false</code> مرتين. فالمقارنة بين سلسلتين تجري في الواقع <em>حرفًا حرفًا من اليسار إلى اليمين</em>. وفي 'magic' و'monkey' الحرف الأول واحد، لكن الثاني لا. فـ 'a' الثانية في 'magic' أصغر (أبجديًا) من 'o' في 'monkey'، وبالتالي <code>'magic' &lt; 'monkey'</code>.</p>
<p>وكلمة 'cent' أصغر من 'century'. فتُقارن الحروف واحدًا واحدًا. وبعد أربعة حروف متطابقة، لا يوجد حرف خامس في سلسلة 'cent'، وبالتالي فهذه الكلمة أصغر (<em>أقصر</em>) من الكلمة الأطول 'century'.</p>
<h2 id="is-not-null">IS (NOT) NULL</h2>
<p>تعني القيمة <code>NULL</code> في حقل ما &quot;غير معروف&quot;: فلا توجد قيمة لهذا الحقل. ومن الممكن الاختبار على قيمة <code>NULL</code> الخاصة هذه. لكن عليك فقط أن تتذكر ألا تستخدم <code>=</code> بل <code>IS</code>. ويعرض الاستعلام التالي قائمة بجميع المقررات التي لا نعرف بعد متى ستتوقف:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">WHERE</span> end_date <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NULL</span>; <span class="hljs-comment">-- so don&#x27;t write = NULL</span>
</code></pre>
<p>وبالعكس، يعيد الاستعلام التالي قائمة بجميع المقررات التي لها تاريخ انتهاء فعلًا (وبالتالي لم تعد تُدرَّس أو يُعرف بالفعل إلى متى ستبقى هذه المقررات في المنهج):</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">WHERE</span> end_date <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NOT NULL</span>;
</code></pre>
<h2 id="أنماط-السلاسل-بواسطة-like">أنماط السلاسل بواسطة LIKE</h2>
<p>أحيانًا لا تريد البحث عن القيمة الكاملة لسلسلة، بل عن جزء منها فقط. افترض أنك تريد قائمة بجميع المقررات التي توجد فيها كلمة 'web' في مكان ما من الاسم (لا يهم إن كانت 'web' بحروف كبيرة أم صغيرة). ونعرف بالفعل <a href="/arabic-cs-library/book/database-foundations/sql-select/index#String-functions">من فصل سابق</a> أن الدالة <code>lower()</code> ستكون مفيدة بالتأكيد في هذا الاستعلام لتحويل جميع الحروف الكبيرة إلى صغيرة. لكن كيف نختبر وجود 'web' في أي مكان من الاسم؟</p>
<p>ويمكن فعل ذلك بطرق مختلفة (مثلًا بـ<a href="https://www.postgresql.org/docs/current/functions-matching.html">التعابير النمطية</a>). وهنا ننظر في <em>أبسط طريقة</em> باستخدام <code>LIKE</code> ونمط. وفي ذلك النمط يمكنك استخدام محرفين خاصين:</p>
<ul>
<li><code>%</code>: صفر أو أكثر من المحارف؛</li>
<li><code>_</code> (شرطة سفلية): محرف واحد بالضبط.</li>
</ul>
<p>ويبحث الاستعلام التالي في جميع الأسماء التي تحتوي السلسلة الفرعية 'web' (لا تهمّ حالة الأحرف):</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> code, name, semester
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">WHERE</span> <span class="hljs-built_in">lower</span>(name) <span class="hljs-keyword">LIKE</span> <span class="hljs-string">&#x27;%web%&#x27;</span>;
</code></pre>
<p>جرّب الآن التمارين التالية.</p>
<p>صِف بالكلمات عمّا تبحث أنماط LIKE التالية:</p>
<pre><code>... LIKE 'B%'
... LIKE '_e%'
... LIKE '%e%e%e%'
... LIKE '__a_b%'
</code></pre>
<h4>الحل</h4>
<pre><code>... LIKE 'B%' --all strings beginning with capital B
... LIKE '_e%' --all strings with an e as second letter
... LIKE '%e%e%e%' --all strings with at least 3 times the letter e
... LIKE '__a_b%' --all strings with a as third and b as fifth letter
</code></pre>
<p>اكتب استعلام SQL يولّد قائمة بجميع المحاضرين الذين ينتهي رمز محاضرهم بالرقم 4. وأضف أيضًا عمودًا باسم المقرر المسؤولين عنه.</p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> coordinator, name
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">WHERE</span> coordinator <span class="hljs-keyword">like</span> <span class="hljs-string">&#x27;%4&#x27;</span>;
<span class="hljs-comment">-- It&#x27;s also possible to use substring(), please try this version as well</span>
</code></pre>
<h2 id="الاحتفاظ-بالصفوف-التي-لا-تحقق-شرطا">الاحتفاظ بالصفوف التي لا تحقق شرطًا</h2>
<p>بشرط في جملة <code>WHERE</code>، نُبقي فقط الصفوف التي تحقق ذلك الشرط. فماذا لو أردت جميع الصفوف الأخرى، أي فقط تلك التي <em>لا</em> تحقق الشرط؟ لهذا الغرض يمكنك استخدام الكلمة المفتاحية <code>NOT</code>. ويعيد الاستعلام التالي جميع المقررات التي لا تحقق الشرط، أي تلك التي لا تبدأ بالحروف 'Web':</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> code, name, semester
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">WHERE</span> <span class="hljs-keyword">NOT</span> name <span class="hljs-keyword">LIKE</span> <span class="hljs-string">&#x27;Web%&#x27;</span>;
</code></pre>
<p>اسرد جميع المقررات (الرمز والاسم وعدد النقاط) التي لا يحتوي اسمها على حرف 'a' واحد (الحروف الصغيرة فقط، ويجوز أن يظهر الحرف الكبير 'A'). اكتب الاستعلام. فماذا تعدّل في حلك إذا كان الحرف الكبير 'A' ممنوعًا أيضًا؟</p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> code, name, credits
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">WHERE</span> <span class="hljs-keyword">NOT</span> name <span class="hljs-keyword">like</span> <span class="hljs-string">&#x27;%a%&#x27;</span>; <span class="hljs-comment">-- adaptation: NOT lower(name) like &#x27;%a%&#x27;</span>
</code></pre>
<h2 id="ربط-الشروط-بـ-and-وor">ربط الشروط بـ AND وOR</h2>
<p>يمكننا ربط عدة شروط بـ <code>AND</code> و<code>OR</code>:</p>
<ul>
<li><code>A AND B</code>: <code>TRUE</code> فقط إذا كان A وB معًا <code>TRUE</code>؛</li>
<li><code>A OR B</code>: <code>TRUE</code> إذا كان A أو B أو كلاهما <code>TRUE</code>.</li>
</ul>
<p>ويمكن بالطبع استخدام <code>AND</code> و<code>OR</code> أيضًا مع <code>NOT</code>.</p>
<p>فماذا يفعل الاستعلام التالي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">WHERE</span> <span class="hljs-keyword">language</span> <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;nl&#x27;</span> <span class="hljs-keyword">AND</span> <span class="hljs-built_in">lower</span>(name) <span class="hljs-keyword">LIKE</span> <span class="hljs-string">&#x27;%prog%&#x27;</span>;
</code></pre>
<h4>الحل</h4>
<p>يعرض هذا الاستعلام جميع أعمدة المقررات المدرَّسة بالهولندية <em>و</em>التي يحتوي اسمها (المحوَّل إلى حروف صغيرة) على السلسلة 'prog'. ويجب أن يتحقق الشرطان معًا في الوقت نفسه!</p>
<p>اكتب الاستعلام الذي يولّد قائمة بجميع المقررات المدرَّسة بالهولندية أو الفرنسية.</p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">WHERE</span> <span class="hljs-keyword">language</span> <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;nl&#x27;</span> <span class="hljs-keyword">OR</span> <span class="hljs-keyword">language</span> <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;fr&#x27;</span>; <span class="hljs-comment">-- we will see how to write this query more concisely later</span>
</code></pre>
<p>ويمكنك <em>ربط</em> أكثر من شرطين. وعليك أن تكون حذرًا كما يوضح المثال التالي. اسرد جميع المقررات المدرَّسة بالهولندية أو الفرنسية والتي لا تزال تُدرَّس. نجرّب الاستعلام التالي:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">WHERE</span> <span class="hljs-keyword">language</span> <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;nl&#x27;</span> <span class="hljs-keyword">OR</span> <span class="hljs-keyword">language</span> <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;fr&#x27;</span> <span class="hljs-keyword">AND</span> end_date <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NULL</span>;
</code></pre>
<p>يعيد هذا الاستعلام نتيجة خاطئة. نفّذ الاستعلام واشرح لماذا هذه النتيجة غير صحيحة.</p>
<h4>الحل</h4>
<p>السبب متعلق بترتيب العمليات. فكما تعلمت منذ زمن طويل أن 3 + 4 * 2 ينبغي أن تُقرأ 3 + (4 * 2) لأن الضرب يسبق الجمع، يوجد أيضًا ترتيب للمعاملات في <code>WHERE</code>.</p>
<p>وترتيب المعاملات، من الأولوية العليا إلى الدنيا:</p>
<ol>
<li>أولًا معاملات المقارنة مثل <code>=</code> و\`\` و<code>&lt;=</code>...,</li>
<li>ثم <code>NOT</code>,</li>
<li>ثم <code>AND</code>,</li>
<li>وأخيرًا وليس آخرًا <code>OR</code>.</li>
</ol>
<p>وهذا يعني أن الشرط أعلاه لا يُقيَّم ببساطة من اليسار إلى اليمين بل على النحو <code>language = 'nl' OR (language = 'fr' AND end_date IS NULL)</code>. ويمكنك ترجمة هذا الشرط إلى &quot;جميع المقررات الهولندية (حالية كانت أم سابقة، لا يهم) أو جميع المقررات الفرنسية التي لا تزال تُدرَّس&quot;. وهذا ليس ما أردناه.</p>
<p>والحل بسيط: استخدم الأقواس. ويصبح الاستعلام كما قصدناه:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> <span class="hljs-operator">*</span>
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">WHERE</span> (<span class="hljs-keyword">language</span> <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;nl&#x27;</span> <span class="hljs-keyword">OR</span> <span class="hljs-keyword">language</span> <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;fr&#x27;</span>) <span class="hljs-keyword">AND</span> end_date <span class="hljs-keyword">IS</span> <span class="hljs-keyword">NULL</span>;
</code></pre>
<p>وبالنسبة إلى الشروط المركّبة المعقدة، فإن الأقواس فكرة جيدة دائمًا لأنها <em>تزيد قابلية قراءة</em> الشرط.</p>
<h2 id="between">BETWEEN</h2>
<p>نبدأ بتمرين بسيط:</p>
<p>أعطِ جميع المقررات (الرمز والاسم والنقاط) التي لها من 3 إلى 8 نقاط.</p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> code, name, credits
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">WHERE</span> credits <span class="hljs-operator">&gt;=</span><span class="hljs-number">3</span> <span class="hljs-keyword">AND</span> credits <span class="hljs-operator">&lt;=</span><span class="hljs-number">8</span>;
</code></pre>
<p>وتوفّر SQL تدوينًا أقصر قليلًا لهذا النوع من الاستعلامات (وأكثر اتساقًا مع اللغة العادية):</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> code, name, credits
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">WHERE</span> credits <span class="hljs-keyword">BETWEEN</span> <span class="hljs-number">3</span> <span class="hljs-keyword">AND</span> <span class="hljs-number">8</span>; <span class="hljs-comment">-- both boundaries are included</span>
</code></pre>
<p>وإذا كان عليك كتابة استعلامات SQL في امتحان، فيجوز لك دائمًا أن تختار بين تدوين <code>BETWEEN</code> أو النسخة الأطول قليلًا. ويجب أن تفهم التدوينين معًا، بوضوح.</p>
<h2 id="in">IN</h2>
<p>تتيح لك الكلمة المفتاحية IN <em>اختصار</em> بعض الشروط. ومرة أخرى، تمرين صغير للبداية:</p>
<p>اكتب الاستعلام الذي يعرض جميع المقررات التي يكون منسّقها أحد الأشخاص التالية أسماؤهم: u0012047 وu0015584 وu0024689 وu0031447.</p>
<h4>الحل</h4>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> code, name, coordinator
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">WHERE</span> coordinator <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;u0012047&#x27;</span> <span class="hljs-keyword">OR</span> coordinator <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;u0015584&#x27;</span> <span class="hljs-keyword">OR</span>
 coordinator <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;u0024689&#x27;</span> <span class="hljs-keyword">OR</span> coordinator <span class="hljs-operator">=</span> <span class="hljs-string">&#x27;u0031447&#x27;</span>;
</code></pre>
<p>مرهق بعض الشيء، أليس كذلك؟ يمكن اختصار هذا الاستعلام بـ <code>IN</code>:</p>
<pre><code class="language-sql"><span class="hljs-keyword">SELECT</span> code, name, coordinator
<span class="hljs-keyword">FROM</span> course
<span class="hljs-keyword">WHERE</span> coordinator <span class="hljs-keyword">IN</span> (<span class="hljs-string">&#x27;u0012047&#x27;</span>,<span class="hljs-string">&#x27;u0015584&#x27;</span>,<span class="hljs-string">&#x27;u0024689&#x27;</span>,<span class="hljs-string">&#x27;u0031447&#x27;</span>);
</code></pre>
<h2 id="نظرة-عامة-على-المعاملات">نظرة عامة على المعاملات</h2>
<p>يعطي الجدول التالي نظرة عامة على المعاملات التي يمكنك استخدامها في جملة <code>WHERE</code>.</p>
<table>
<thead>
<tr>
<th>العامل</th>
<th>الوظيفة</th>
<th>المثال</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>=</code></td>
<td>يساوي</td>
<td><code>WHERE name = 'Jan Van Hee'</code></td>
</tr>
<tr>
<td><code>&lt;&gt;</code> أو <code>!=</code></td>
<td>لا يساوي</td>
<td><code>WHERE year &lt;&gt; 2023</code></td>
</tr>
<tr>
<td><code>&gt;</code></td>
<td>أكبر من</td>
<td><code>WHERE amount &gt; 250</code></td>
</tr>
<tr>
<td><code>&lt;</code></td>
<td>أصغر من</td>
<td><code>WHERE amount &lt; 400</code></td>
</tr>
<tr>
<td><code>&gt;=</code></td>
<td>أكبر من أو يساوي</td>
<td><code>WHERE amount &gt;= 250</code></td>
</tr>
<tr>
<td><code>&lt;=</code></td>
<td>أصغر من أو يساوي</td>
<td><code>WHERE amount &lt;= 400</code></td>
</tr>
<tr>
<td><code>BETWEEN</code></td>
<td>ضمن نطاق</td>
<td><code>WHERE amount BETWEEN 250 AND 400</code></td>
</tr>
<tr>
<td><code>IN</code></td>
<td>يساوي واحدة من مجموعة قيم</td>
<td><code>WHERE city IN ('Leuven', 'Brussel', 'Gent')</code></td>
</tr>
<tr>
<td><code>LIKE</code></td>
<td>يطابق نمطًا (بـ '%' من '_'، حساس لحالة الأحرف)</td>
<td><code>WHERE name LIKE 'Jan%'</code></td>
</tr>
<tr>
<td><code>ILIKE</code></td>
<td>يطابق نمطًا (غير حساس لحالة الأحرف)</td>
<td><code>WHERE name ILIKE 'jan%'</code></td>
</tr>
<tr>
<td><code>NOT</code></td>
<td>ينفي شرطًا</td>
<td><code>WHERE name NOT LIKE 'Jan%'</code></td>
</tr>
</tbody>
</table>
<div class="exercises"><h2 id="تمارين-sqlzoo">تمارين SQLzoo</h2>
<p>SQLzoo منصة تدريب تفاعلية. تُدخل شيفرة SQL يراجعها النظام لك. ومن الجيد تجربة هذه التمارين. وبهذه الطريقة ستتعلم العمل بجداول غير التي نستخدمها في نص هذه الدورة.</p>
<h3 id="جدول-world">جدول 'world'</h3>
<p>يحتوي هذا الجدول البيانات التالية عن البلدان:</p>
<ul>
<li>name</li>
<li>continent</li>
<li>area</li>
<li>population</li>
<li><a href="https://en.wikipedia.org/wiki/Gross_domestic_product">gdp</a></li>
</ul>
<p>وكمقدمة إلى هذا الجدول، أنجز <a href="https://sqlzoo.net/wiki/SELECT_basics">سلسلة التمارين 1</a> بثلاثة تمارين صغيرة. وهنا تستخدم <code>WHERE</code> و<code>IN</code> و<code>BETWEEN</code> (وبالطبع <code>SELECT</code> و<code>FROM</code>).</p>
<p>أنجز <a href="https://sqlzoo.net/wiki/SELECT_Quiz">الاختبار 1</a> بسبعة أسئلة تركز على <code>WHERE</code>.</p>
<p><a href="https://sqlzoo.net/wiki/SELECT_from_WORLD_Tutorial">سلسلة التمارين 2</a> على جدول 'world' تحتوي 13 تمرينًا على غرار السابق، لكن مع دوال حسابية إضافية مثل <code>ROUND</code> وبعض معالجة السلاسل.</p>
<p><a href="https://sqlzoo.net/wiki/BBC_QUIZ">الاختبار 2</a> يحتوي مرة أخرى 7 أسئلة. انتبه إلى التفاصيل!</p>
</div>`,c={book:s,chapter:n,chapterTitle:a,slug:e,title:o,headings:p,html:l};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,l as html,e as slug,o as title};
