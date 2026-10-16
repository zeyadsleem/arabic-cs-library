const s="mooc",n="part-12",a="الجزء 12: البرمجة الدالية",e="3-functional-programming",p="البرمجة الدالية",l=[{depth:2,id:"map",text:"map"},{depth:2,id:"دالة-map-وأصنافك-الخاصة",text:"دالة map وأصنافك الخاصة"},{depth:2,id:"أسماء-الطلاب",text:"أسماء الطلاب"},{depth:2,id:"المساقات",text:"المساقات"},{depth:2,id:"filter",text:"filter"},{depth:2,id:"القيمة-التي-تعيدها-filter-هي-مكرر",text:"القيمة التي تعيدها filter هي مكرّر"},{depth:2,id:"المحاولات-المقبولة",text:"المحاولات المقبولة"},{depth:2,id:"المحاولات-ذات-درجة",text:"المحاولات ذات درجة"},{depth:2,id:"الطلاب-الذين-نجحوا-في-المساق",text:"الطلاب الذين نجحوا في المساق"},{depth:2,id:"reduce",text:"reduce"},{depth:2,id:"مجموع-كل-النقاط-الدراسية",text:"مجموع كل النقاط الدراسية"},{depth:2,id:"مجموع-النقاط-الدراسية-المجتازة",text:"مجموع النقاط الدراسية المُجتازة"},{depth:2,id:"متوسط-الدرجات-للمساقات-المجتازة",text:"متوسط الدرجات للمساقات المُجتازة"}],t=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستعرف ما تعنيه البرمجة الدالية</li>
<li>ستكون قادرًا على استخدام الدوال <code>map</code> و<code>reduce</code> و<code>filter</code> في برامجك الخاصة</li>
</ul>
</blockquote>
<p>تشير البرمجة الدالية إلى <em>نمط برمجي</em> يتجنّب التغييرات في حالة البرنامج قدر الإمكان. ويُتجنّب استخدام المتغيّرات عمومًا. وبدلًا من ذلك، تشكّل سلاسل استدعاءات الدوال العمود الفقري للبرنامج.</p>
<p>تُعدّ تعبيرات lambda وأنواع الإدراك المختلفة تقنيات شائعة في نمط البرمجة الدالية، إذ تتيح لك معالجة البيانات دون تخزينها في متغيّرات، بحيث لا تتغيّر حالة البرنامج. فمثلًا، تعبير lambda هو دالة من كل النواحي العملية، لكننا لا نحتاج إلى تخزين إشارة مسمّاة إليه في أي مكان.</p>
<p>وكما ذُكر أعلاه، فإن البرمجة الدالية نمط برمجي، أو أسلوب في البرمجة. وهناك أنماط برمجية كثيرة ومختلفة، وقد صادفنا بعضها بالفعل:</p>
<ul>
<li>البرمجة الأمرية، حيث يتكوّن البرنامج من سلسلة أوامر تُنفَّذ بالترتيب</li>
<li>البرمجة الإجرائية، حيث يُجمَّع البرنامج في إجراءات أو برامج فرعية</li>
<li>البرمجة الكائنية التوجّه، حيث يُخزَّن البرنامج وحالته في كائنات معرّفة في أصناف.</li>
</ul>
<p>وهناك آراء متباينة حول الفواصل بين الأنماط المختلفة؛ فمثلًا، يرى بعضهم أن البرمجة الأمرية والبرمجة الإجرائية تعنيان الشيء نفسه، بينما يضع آخرون البرمجة الأمرية مصطلحًا شاملًا يغطّي كلاًّ من البرمجة الإجرائية والبرمجة الكائنية التوجّه. ولا تُعدّ المصطلحات والفواصل مهمة إلى هذا الحد، ولا الالتزام الصارم بأحد النمطين دون الآخر، لكن من المهم أن تفهم أن مثل هذه المقاربات المختلفة موجودة، لأنها تؤثّر في الخيارات التي يتخذها المبرمجون.</p>
<p>صُمِّمت لغات برمجة كثيرة مع أخذ أحد النمطين البرمجيين أو الآخر في الاعتبار، لكن Python لغة برمجة متعددة الاستخدامات إلى حد كبير، وتتيح اتباع عدة أنماط برمجية مختلفة، حتى داخل برنامج واحد. وهذا يتيح لنا اختيار الطريقة الأكثر كفاءة ووضوحًا لحلّ كل مسألة.</p>
<p>لننظر إلى بعض أدوات البرمجة الدالية التي توفّرها Python.</p>
<h2 id="map">map</h2>
<p>تنفّذ دالة <code>map</code> عملية ما على كل عنصر في سلسلة قابلة للتكرار. ويبدو هذا أشبه كثيرًا بالأثر الذي يُحدثه الإدراك، لكن الصيغة مختلفة.</p>
<p>لنفترض أن لدينا قائمة سلاسل نصية نريد تحويلها إلى قائمة أعداد صحيحة:</p>
<pre><code class="language-python">str_list = [<span class="hljs-string">&quot;123&quot;</span>,<span class="hljs-string">&quot;-10&quot;</span>, <span class="hljs-string">&quot;23&quot;</span>, <span class="hljs-string">&quot;98&quot;</span>, <span class="hljs-string">&quot;0&quot;</span>, <span class="hljs-string">&quot;-110&quot;</span>]

integers = <span class="hljs-built_in">map</span>(<span class="hljs-keyword">lambda</span> x : <span class="hljs-built_in">int</span>(x), str_list)

<span class="hljs-built_in">print</span>(integers) <span class="hljs-comment"># this tells us the type of object we&#x27;re dealing with</span>

<span class="hljs-keyword">for</span> number <span class="hljs-keyword">in</span> integers:
    <span class="hljs-built_in">print</span>(number)
</code></pre>
<pre><code>&lt;map object at 0x0000021A4BFA9A90&gt;
123
-10
23
98
0
-110
</code></pre>
<p>الصيغة العامة لدالة <code>map</code> هي</p>
<p><code>map(&lt;function&gt;, &lt;series&gt;)</code></p>
<p>حيث <code>function</code> هي العملية التي نريد تنفيذها على كل عنصر في <code>series</code>.</p>
<p>تعيد دالة <code>map</code> كائنًا من النوع <code>map</code>، وهو قابل للتكرار، ويمكن تحويله إلى قائمة:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">capitalize</span>(<span class="hljs-params">my_string: <span class="hljs-built_in">str</span></span>):
    first = my_string[<span class="hljs-number">0</span>]
    first = first.upper()
    <span class="hljs-keyword">return</span> first + my_string[<span class="hljs-number">1</span>:]

test_list = [<span class="hljs-string">&quot;first&quot;</span>, <span class="hljs-string">&quot;second&quot;</span>, <span class="hljs-string">&quot;third&quot;</span>, <span class="hljs-string">&quot;fourth&quot;</span>]

capitalized = <span class="hljs-built_in">map</span>(capitalize, test_list)

capitalized_list = <span class="hljs-built_in">list</span>(capitalized)
<span class="hljs-built_in">print</span>(capitalized_list)
</code></pre>
<pre><code>['First', 'Second', 'Third', 'Fourth']
</code></pre>
<p>كما ترى من الأمثلة أعلاه، تقبل دالة <code>map</code> كلاًّ من دالة lambda المجهولة ودالة مسمّاة معرّفة بالكلمة المفتاحية <code>def</code>.</p>
<p>يمكننا تحقيق النتيجة نفسها بإدراك قائمة:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">capitalize</span>(<span class="hljs-params">my_string: <span class="hljs-built_in">str</span></span>):
    first = my_string[<span class="hljs-number">0</span>]
    first = first.upper()
    <span class="hljs-keyword">return</span> first + my_string[<span class="hljs-number">1</span>:]

test_list = [<span class="hljs-string">&quot;first&quot;</span>, <span class="hljs-string">&quot;second&quot;</span>, <span class="hljs-string">&quot;third&quot;</span>, <span class="hljs-string">&quot;fourth&quot;</span>]

capitalized_list = [capitalize(item) <span class="hljs-keyword">for</span> item <span class="hljs-keyword">in</span> test_list]
<span class="hljs-built_in">print</span>(capitalized_list)
</code></pre>
<p>...أو يمكننا المرور عبر القائمة الأصلية بحلقة <code>for</code> وحفظ العناصر المعالَجة في قائمة جديدة بالتابع <code>append</code>. وفي العادة تكون هناك حلول كثيرة ومختلفة لكل مسألة في البرمجة. ونادرًا ما توجد إجابات صحيحة أو خاطئة تمامًا. ومعرفة مقاربات كثيرة ومختلفة تساعدك على اختيار الأنسب لكل موقف، أو المقاربة التي تناسب ذوقك الخاص أكثر من غيرها.</p>
<p>يجدر الإشارة إلى أن دالة <code>map</code> لا تعيد قائمة، بل كائن <em>مكرّر</em> من النوع map. ويتصرّف المكرّر من نواحٍ كثيرة تصرّف القائمة، لكن هناك استثناءات، كما يظهر في المثال التالي:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">capitalize</span>(<span class="hljs-params">my_string: <span class="hljs-built_in">str</span></span>):
    first = my_string[<span class="hljs-number">0</span>]
    first = first.upper()
    <span class="hljs-keyword">return</span> first + my_string[<span class="hljs-number">1</span>:]

test_list = [<span class="hljs-string">&quot;first&quot;</span>, <span class="hljs-string">&quot;second&quot;</span>, <span class="hljs-string">&quot;third&quot;</span>, <span class="hljs-string">&quot;fourth&quot;</span>]

<span class="hljs-comment"># store the return value from the map function</span>
capitalized = <span class="hljs-built_in">map</span>(capitalize, test_list)

<span class="hljs-keyword">for</span> word <span class="hljs-keyword">in</span> capitalized:
  <span class="hljs-built_in">print</span>(word)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;print the same again:&quot;</span>)
<span class="hljs-keyword">for</span> word <span class="hljs-keyword">in</span> capitalized:
  <span class="hljs-built_in">print</span>(word)
</code></pre>
<p>سيطبع هذا ما يلي:</p>
<pre><code>First
Second
Third
Fourth
print the same again:
</code></pre>
<p>حاولنا أعلاه طباعة محتويات مكرّر <code>map</code> مرتين، لكن المحاولة الثانية لم تُنتج أي مخرجات. والسبب هو أن <code>map</code> مكرّر؛ فالمرور عبره بحلقة <code>for</code> &quot;يستنفده&quot;، تمامًا كما يُستنفد المولّد عند بلوغ قيمته القصوى. وبمجرد اجتياز العناصر في المكرّر بحلقة <code>for</code>، لا يبقى شيء للمرور عليه.</p>
<p>إذا كنت بحاجة إلى المرور عبر محتويات مكرّر <code>map</code> أكثر من مرة، فيمكنك مثلًا تحويل map إلى قائمة:</p>
<pre><code class="language-python">test_list = [<span class="hljs-string">&quot;first&quot;</span>, <span class="hljs-string">&quot;second&quot;</span>, <span class="hljs-string">&quot;third&quot;</span>, <span class="hljs-string">&quot;fourth&quot;</span>]

<span class="hljs-comment"># convert the return value of the map function into a list</span>
capitalized = <span class="hljs-built_in">list</span>(<span class="hljs-built_in">map</span>(capitalize, test_list))

<span class="hljs-keyword">for</span> word <span class="hljs-keyword">in</span> capitalized:
  <span class="hljs-built_in">print</span>(word)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;print the same again:&quot;</span>)
<span class="hljs-keyword">for</span> word <span class="hljs-keyword">in</span> capitalized:
  <span class="hljs-built_in">print</span>(word)
</code></pre>
<pre><code>First
Second
Third
Fourth
print the same again:
First
Second
Third
Fourth
</code></pre>
<h2 id="دالة-map-وأصنافك-الخاصة">دالة map وأصنافك الخاصة</h2>
<p>يمكنك بطبيعة الحال معالجة نسخ من أصنافك الخاصة بدالة <code>map</code> أيضًا. ولا توجد حِيَل خاصة في ذلك، كما ترى في المثال أدناه:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">BankAccount</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, account_number: <span class="hljs-built_in">str</span>, name: <span class="hljs-built_in">str</span>, balance: <span class="hljs-built_in">float</span></span>):
        <span class="hljs-variable language_">self</span>.__account_number = account_number
        <span class="hljs-variable language_">self</span>.name = name
        <span class="hljs-variable language_">self</span>.__balance = balance

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">deposit</span>(<span class="hljs-params">self, amount: <span class="hljs-built_in">float</span></span>):
        <span class="hljs-keyword">if</span> amount &gt; <span class="hljs-number">0</span>:
            <span class="hljs-variable language_">self</span>.__balance += amount

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">get_balance</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.__balance

a1 = BankAccount(<span class="hljs-string">&quot;123456&quot;</span>, <span class="hljs-string">&quot;Randy Riches&quot;</span>, <span class="hljs-number">5000</span>)
a2 = BankAccount(<span class="hljs-string">&quot;12321&quot;</span>, <span class="hljs-string">&quot;Paul Pauper&quot;</span>, <span class="hljs-number">1</span>)
a3 = BankAccount(<span class="hljs-string">&quot;223344&quot;</span>, <span class="hljs-string">&quot;Mary Millionaire &quot;</span>, <span class="hljs-number">1000000</span>)

accounts = [a1, a2, a3]

clients = <span class="hljs-built_in">map</span>(<span class="hljs-keyword">lambda</span> t: t.name, accounts)
<span class="hljs-keyword">for</span> name <span class="hljs-keyword">in</span> clients:
  <span class="hljs-built_in">print</span>(name)

balances = <span class="hljs-built_in">map</span>(<span class="hljs-keyword">lambda</span> t: t.get_balance(), accounts)
<span class="hljs-keyword">for</span> balance <span class="hljs-keyword">in</span> balances:
  <span class="hljs-built_in">print</span>(balance)
</code></pre>
<pre><code>Randy Riches
Paul Pauper
Mary Millionaire
5000
1
1000000
</code></pre>
<p>هنا نجمع أولًا أسماء أصحاب الحسابات بدالة <code>map</code>. وتُستخدم دالة lambda مجهولة لاسترجاع قيمة الخاصية <code>name</code> من كل كائن BankAccount:</p>
<pre><code class="language-python">clients = <span class="hljs-built_in">map</span>(<span class="hljs-keyword">lambda</span> t: t.name, accounts)
</code></pre>
<p>وبالمثل، يُجمع رصيد كل BankAccount. وتبدو دالة lambda مختلفة قليلًا، لأن الرصيد يُسترجع باستدعاء تابع، وليس من الخاصية مباشرةً:</p>
<pre><code class="language-python">balances = <span class="hljs-built_in">map</span>(<span class="hljs-keyword">lambda</span> t: t.get_balance(), accounts)
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: الدورات المُحاوَلة</strong></p>
<p>يحتوي قالب التمرين على تعريف صنف <code>CourseAttempt</code>. وهو يعمل هكذا:</p>
</blockquote>
<pre><code class="language-python">attempt = CourseAttempt(<span class="hljs-string">&quot;Peter Python&quot;</span>, <span class="hljs-string">&quot;Introduction to Programming&quot;</span>, <span class="hljs-number">5</span>)
<span class="hljs-built_in">print</span>(attempt.student_name)
<span class="hljs-built_in">print</span>(attempt.course_name)
<span class="hljs-built_in">print</span>(attempt.grade)
<span class="hljs-built_in">print</span>(attempt)
</code></pre>
<pre><code>Peter Python
Introduction to Programming
5
Peter Python, grade for the course Introduction to Programming 5
</code></pre>
<h2 id="أسماء-الطلاب">أسماء الطلاب</h2>
<p>يُرجى كتابة دالة اسمها <code>names_of_students(attempts: list)</code> تأخذ قائمة كائنات CourseAttempt كوسيط لها. وينبغي أن تعيد الدالة قائمة جديدة بأسماء الطلاب الذين حاولوا إتمام المساق.</p>
<pre><code class="language-python">s1 = CourseAttempt(<span class="hljs-string">&quot;Peter Python&quot;</span>, <span class="hljs-string">&quot;Introduction to Programming&quot;</span>, <span class="hljs-number">3</span>)
s2 = CourseAttempt(<span class="hljs-string">&quot;Olivia C. Objective&quot;</span>, <span class="hljs-string">&quot;Introduction to Programming&quot;</span>, <span class="hljs-number">5</span>)
s3 = CourseAttempt(<span class="hljs-string">&quot;Peter Python&quot;</span>, <span class="hljs-string">&quot;Advanced Course in Programming&quot;</span>, <span class="hljs-number">2</span>)

<span class="hljs-keyword">for</span> name <span class="hljs-keyword">in</span> names_of_students([s1, s2, s3]):
    <span class="hljs-built_in">print</span>(name)
</code></pre>
<pre><code>Peter Python
Olivia C. Objective
Peter Python
</code></pre>
<p>يُرجى تنفيذ الدالة باستخدام دالة <code>map</code>.</p>
<h2 id="المساقات">المساقات</h2>
<p>يُرجى كتابة دالة اسمها <code>course_names(attempts: list)</code> تأخذ قائمة كائنات CourseAttempt كوسيط لها. وينبغي أن تعيد الدالة قائمة جديدة تحتوي على أسماء المساقات الواردة في القائمة الأصلية بترتيب أبجدي. وينبغي أن يظهر كل اسم مساق مرة واحدة فقط في القائمة.</p>
<pre><code class="language-python">s1 = CourseAttempt(<span class="hljs-string">&quot;Peter Python&quot;</span>, <span class="hljs-string">&quot;Introduction to Programming&quot;</span>, <span class="hljs-number">3</span>)
s2 = CourseAttempt(<span class="hljs-string">&quot;Olivia C. Objective&quot;</span>, <span class="hljs-string">&quot;Introduction to Programming&quot;</span>, <span class="hljs-number">5</span>)
s3 = CourseAttempt(<span class="hljs-string">&quot;Peter Python&quot;</span>, <span class="hljs-string">&quot;Advanced Course in Programming&quot;</span>, <span class="hljs-number">2</span>)

<span class="hljs-keyword">for</span> name <span class="hljs-keyword">in</span> course_names([s1, s2, s3]):
    <span class="hljs-built_in">print</span>(name)
</code></pre>
<pre><code>Advanced Course in Programming
Introduction to Programming
</code></pre>
<p>يُرجى تنفيذ الدالة باستخدام دالة <code>map</code>. لكن هذا وحده لن يكفي على الأرجح. وستحتاج إلى شيء آخر أيضًا للتأكد من أن أسماء المساقات فريدة.</p>
<h2 id="filter">filter</h2>
<p>تشبه دالة <code>filter</code> المدمجة في Python دالة <code>map</code>، لكنها، كما يوحي الاسم، لا تأخذ كل العناصر من المصدر. بل تصفّيها بدالة معيار تُمرَّر كوسيط. وإذا أعادت دالة المعيار <code>True</code>، يُختار العنصر.</p>
<p>لننظر إلى مثال باستخدام <code>filter</code>:</p>
<pre><code class="language-python">integers = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">4</span>, <span class="hljs-number">9</span>, <span class="hljs-number">10</span>, <span class="hljs-number">14</span>, <span class="hljs-number">15</span>]

even_numbers = <span class="hljs-built_in">filter</span>(<span class="hljs-keyword">lambda</span> number: number % <span class="hljs-number">2</span> == <span class="hljs-number">0</span>, integers)

<span class="hljs-keyword">for</span> number <span class="hljs-keyword">in</span> even_numbers:
    <span class="hljs-built_in">print</span>(number)
</code></pre>
<pre><code>2
6
4
10
14
</code></pre>
<p>قد يجعل المثال أعلاه أوضح قليلًا إذا استخدمنا دالة مسمّاة بدلًا من ذلك:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">is_it_even</span>(<span class="hljs-params">number: <span class="hljs-built_in">int</span></span>):
    <span class="hljs-keyword">if</span> number % <span class="hljs-number">2</span> == <span class="hljs-number">0</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-literal">True</span>
    <span class="hljs-keyword">return</span> <span class="hljs-literal">False</span>

integers = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>, <span class="hljs-number">4</span>, <span class="hljs-number">9</span>, <span class="hljs-number">10</span>, <span class="hljs-number">14</span>, <span class="hljs-number">15</span>]

even_numbers = <span class="hljs-built_in">filter</span>(is_it_even, integers)

<span class="hljs-keyword">for</span> number <span class="hljs-keyword">in</span> even_numbers:
    <span class="hljs-built_in">print</span>(number)
</code></pre>
<p>هذان البرنامجان متطابقان تمامًا من الناحية الوظيفية. والمسألة مسألة رأي في الغالب أيّهما تعدّ المقاربة الأفضل.</p>
<p>لننظر إلى مثال آخر على التصفية. يحاكي هذا البرنامج أسماكًا، ويختار فقط تلك التي تزن 1000 غرام على الأقل:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Fish</span>:
    <span class="hljs-string">&quot;&quot;&quot; The class models a fish of a certain species and weight &quot;&quot;&quot;</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, species: <span class="hljs-built_in">str</span>, weight: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-variable language_">self</span>.species = species
        <span class="hljs-variable language_">self</span>.weight = weight

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__repr__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-string">f&quot;<span class="hljs-subst">{self.species}</span> (<span class="hljs-subst">{self.weight}</span> g.)&quot;</span>

<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    f1 = Fish(<span class="hljs-string">&quot;Pike&quot;</span>, <span class="hljs-number">1870</span>)
    f2 = Fish(<span class="hljs-string">&quot;Perch&quot;</span>, <span class="hljs-number">763</span>)
    f3 = Fish(<span class="hljs-string">&quot;Pike&quot;</span>, <span class="hljs-number">3410</span>)
    f4 = Fish(<span class="hljs-string">&quot;Cod&quot;</span>, <span class="hljs-number">2449</span>)
    f5 = Fish(<span class="hljs-string">&quot;Roach&quot;</span>, <span class="hljs-number">210</span>)

    fishes = [f1, f2, f3, f4, f5]

    over_a_kilo = <span class="hljs-built_in">filter</span>(<span class="hljs-keyword">lambda</span> fish : fish.weight &gt;= <span class="hljs-number">1000</span>, fishes)

    <span class="hljs-keyword">for</span> fish <span class="hljs-keyword">in</span> over_a_kilo:
        <span class="hljs-built_in">print</span>(fish)
</code></pre>
<pre><code>Pike (1870 g.)
Pike (3410 g.)
Cod (2449 g.)
</code></pre>
<p>يمكننا بالمثل استخدام إدراك قائمة وتحقيق النتيجة نفسها:</p>
<pre><code class="language-python">over_a_kilo = [fish <span class="hljs-keyword">for</span> fish <span class="hljs-keyword">in</span> fishes <span class="hljs-keyword">if</span> fish.weight &gt;= <span class="hljs-number">1000</span>]
</code></pre>
<h2 id="القيمة-التي-تعيدها-filter-هي-مكرر">القيمة التي تعيدها filter هي مكرّر <span class="content-anchor" id="the-return-value-of-filter-is-an-iterator"></span></h2>
<p>تشبه دالة <code>filter</code> دالة <code>map</code> أيضًا في أنها تعيد <em>مكرّرًا</em>. وهناك مواقف ينبغي أن تكون فيها حذرًا بشكل خاص مع <code>filter</code> لأن المكرّرات لا يمكن اجتيازها إلا مرة واحدة. لذا فإن محاولة طباعة مجموعة الأسماك الكبيرة مرتين لن تعمل بالبساطة التي قد تتوقّعها:</p>
<pre><code class="language-python">f1 = Fish(<span class="hljs-string">&quot;Pike&quot;</span>, <span class="hljs-number">1870</span>)
f2 = Fish(<span class="hljs-string">&quot;Perch&quot;</span>, <span class="hljs-number">763</span>)
f3 = Fish(<span class="hljs-string">&quot;Pike&quot;</span>, <span class="hljs-number">3410</span>)
f4 = Fish(<span class="hljs-string">&quot;Cod&quot;</span>, <span class="hljs-number">2449</span>)
f5 = Fish(<span class="hljs-string">&quot;Roach&quot;</span>, <span class="hljs-number">210</span>)

fishes = [f1, f2, f3, f4, f5]

over_a_kilo = <span class="hljs-built_in">filter</span>(<span class="hljs-keyword">lambda</span> fish : fish.weight &gt;= <span class="hljs-number">1000</span>, fishes)

<span class="hljs-keyword">for</span> fish <span class="hljs-keyword">in</span> over_a_kilo:
    <span class="hljs-built_in">print</span>(fish)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;print the same again:&quot;</span>)

<span class="hljs-keyword">for</span> Fish <span class="hljs-keyword">in</span> over_a_kilo:
    <span class="hljs-built_in">print</span>(Fish)
</code></pre>
<p>سيطبع هذا ما يلي:</p>
<pre><code>Pike (1870 g.)
Pike (3410 g.)
Cod (2449 g.)
print the same again:
</code></pre>
<p>إذا كنت بحاجة إلى المرور عبر محتويات مكرّر <code>filter</code> أكثر من مرة، فيمكنك تحويل النتيجة إلى قائمة:</p>
<pre><code class="language-python">fishes = [f1, f2, f3, f4, f5]

<span class="hljs-comment"># convert the return value of the filter function into a list</span>
over_a_kilo = <span class="hljs-built_in">list</span>(<span class="hljs-built_in">filter</span>(<span class="hljs-keyword">lambda</span> fish : fish.weight &gt;= <span class="hljs-number">1000</span>, fishes))
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: تصفية المحاولات</strong></p>
<p>في هذا التمرين سنواصل مع صنف <code>CourseAttempt</code>.</p>
</blockquote>
<h2 id="المحاولات-المقبولة">المحاولات المقبولة</h2>
<p>يُرجى كتابة دالة اسمها <code>accepted(attempts: list)</code> تأخذ قائمة كائنات CourseAttempt كوسيط لها. وينبغي أن تعيد الدالة قائمة جديدة من كائنات CourseAttempt، تتضمّن فقط العناصر من القائمة الأصلية التي تكون درجتها 1 على الأقل.</p>
<pre><code class="language-python">s1 = CourseAttempt(<span class="hljs-string">&quot;Peter Python&quot;</span>, <span class="hljs-string">&quot;Introduction to Programming&quot;</span>, <span class="hljs-number">3</span>)
s2 = CourseAttempt(<span class="hljs-string">&quot;Olivia C. Objective&quot;</span>, <span class="hljs-string">&quot;Introduction to Programming&quot;</span>, <span class="hljs-number">5</span>)
s3 = CourseAttempt(<span class="hljs-string">&quot;Peter Python&quot;</span>, <span class="hljs-string">&quot;Advanced Course in Programming&quot;</span>, <span class="hljs-number">0</span>)

<span class="hljs-keyword">for</span> attempt <span class="hljs-keyword">in</span> accepted([s1, s2, s3]):
    <span class="hljs-built_in">print</span>(attempt)
</code></pre>
<pre><code>Peter Python, grade for the course Introduction to Programming 3
Olivia C. Objective grade for the course Introduction to Programming 5
</code></pre>
<p>يُرجى تنفيذ الدالة باستخدام دالة <code>filter</code>.</p>
<h2 id="المحاولات-ذات-درجة">المحاولات ذات درجة</h2>
<p>يُرجى كتابة دالة اسمها <code>attempts_with_grade(attempts: list, grade: int)</code> تأخذ قائمة كائنات CourseAttempt وعددًا صحيحًا كوسيطين لها. وينبغي أن تعيد الدالة قائمة جديدة تحتوي فقط على كائنات CourseAttempt من القائمة الأصلية التي تطابق درجتها الوسيط الثاني.</p>
<pre><code class="language-python">s1 = CourseAttempt(<span class="hljs-string">&quot;Peter Python&quot;</span>, <span class="hljs-string">&quot;Introduction to Programming&quot;</span>, <span class="hljs-number">3</span>)
s2 = CourseAttempt(<span class="hljs-string">&quot;Olivia C. Objective&quot;</span>, <span class="hljs-string">&quot;Introduction to Programming&quot;</span>, <span class="hljs-number">5</span>)
s3 = CourseAttempt(<span class="hljs-string">&quot;Peter Python&quot;</span>, <span class="hljs-string">&quot;Introduction to AI&quot;</span>, <span class="hljs-number">3</span>)
s4 = CourseAttempt(<span class="hljs-string">&quot;Olivia C. Objective&quot;</span>, <span class="hljs-string">&quot;Data Structures and Algorithms&quot;</span>, <span class="hljs-number">3</span>)

<span class="hljs-keyword">for</span> attempt <span class="hljs-keyword">in</span> attempts_with_grade([s1, s2, s3, s4], <span class="hljs-number">3</span>):
    <span class="hljs-built_in">print</span>(attempt)
</code></pre>
<pre><code>Peter Python, grade for the course Introduction to Programming 3
Peter Python, grade for the course Introduction to AI 3
Olivia C. Objective, grade for the course Data Structures and Algorithms 3
</code></pre>
<p>يُرجى تنفيذ الدالة باستخدام دالة <code>filter</code>.</p>
<h2 id="الطلاب-الذين-نجحوا-في-المساق">الطلاب الذين نجحوا في المساق</h2>
<p>يُرجى كتابة دالة اسمها <code>passed_students(attempts: list, course: str)</code> تأخذ قائمة كائنات CourseAttempt واسم مساق كوسيطين لها. وينبغي أن تعيد الدالة قائمة <em>مرتّبة أبجديًا</em> بأسماء الطلاب الذين نجحوا في المساق، أي كانت درجتهم في المساق المعطى أعلى من 0.</p>
<pre><code class="language-python">s1 = CourseAttempt(<span class="hljs-string">&quot;Peter Python&quot;</span>, <span class="hljs-string">&quot;Introduction to Programming&quot;</span>, <span class="hljs-number">3</span>)
s2 = CourseAttempt(<span class="hljs-string">&quot;Olivia C. Objective&quot;</span>, <span class="hljs-string">&quot;Introduction to AI&quot;</span>, <span class="hljs-number">5</span>)
s3 = CourseAttempt(<span class="hljs-string">&quot;Peter Python&quot;</span>, <span class="hljs-string">&quot;Introduction to AI&quot;</span>, <span class="hljs-number">0</span>)
s4 = CourseAttempt(<span class="hljs-string">&quot;Jack Java&quot;</span>, <span class="hljs-string">&quot;Introduction to AI&quot;</span>, <span class="hljs-number">3</span>)

<span class="hljs-keyword">for</span> attempt <span class="hljs-keyword">in</span> passed_students([s1, s2, s3, s4], <span class="hljs-string">&quot;Introduction to AI&quot;</span>):
    <span class="hljs-built_in">print</span>(attempt)
</code></pre>
<pre><code>Jack Java
Olivia C. Objective
</code></pre>
<p>يُرجى تنفيذ الدالة باستخدام دالتي <code>filter</code> و<code>map</code>.</p>
<h2 id="reduce">reduce</h2>
<p>الدالة الأساسية الثالثة في هذه المقدمة إلى مبادئ البرمجة الدالية هي <code>reduce</code>، من وحدة <code>functools</code>. وكما يوحي الاسم، غرضها <em>تقليص</em> العناصر في سلسلة إلى قيمة واحدة.</p>
<p>تبدأ دالة <code>reduce</code> بعملية وقيمة ابتدائية. وتنفّذ العملية المعطاة على كل عنصر في السلسلة بالتناوب، بحيث تتغيّر القيمة في كل خطوة. وبمجرد معالجة كل العناصر، تُعاد القيمة الناتجة.</p>
<p>لقد قمنا بجمع قوائم الأعداد الصحيحة بطرق مختلفة من قبل، لكن لدينا هنا مثالًا بمساعدة دالة <code>reduce</code>. لاحظ أمر <code>import</code>؛ فهو ضروري في إصدارات Python 3 وما بعدها للوصول إلى دالة <code>reduce</code>. وفي إصدارات Python الأقدم لم يكن أمر <code>import</code> مطلوبًا، لذا قد تصادف أمثلة دونه على الإنترنت.</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> functools <span class="hljs-keyword">import</span> reduce

my_list = [<span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">1</span>, <span class="hljs-number">5</span>]

sum_of_numbers = reduce(<span class="hljs-keyword">lambda</span> reduced_sum, item: reduced_sum + item, my_list, <span class="hljs-number">0</span>)

<span class="hljs-built_in">print</span>(sum_of_numbers)
</code></pre>
<pre><code>11
</code></pre>
<p>لننظر عن قرب أكثر إلى ما يحدث هنا. تأخذ دالة <code>reduce</code> ثلاثة وسائط: دالة، وسلسلة عناصر، وقيمة ابتدائية. وفي هذه الحالة، السلسلة قائمة أعداد صحيحة، ولأننا نحسب مجموعًا، فإن القيمة الابتدائية المناسبة هي صفر.</p>
<p>الوسيط الأول دالة تمثّل العملية التي نريد تنفيذها على كل عنصر. وهنا الدالة هي دالة lambda مجهولة:</p>
<pre><code class="language-python"><span class="hljs-keyword">lambda</span> reduced_sum, item: reduced_sum + item
</code></pre>
<p>تأخذ هذه الدالة وسيطين: القيمة المقلَّصة الحالية، والعنصر الذي جاء دوره للمعالجة. ويُستخدمان لحساب قيمة جديدة للقيمة المقلَّصة. وفي هذه الحالة تكون القيمة الجديدة مجموع القيمة القديمة والعنصر الحالي.</p>
<p>قد يكون فهم ما تفعله دالة <code>reduce</code> فعليًا أسهل إذا استخدمنا دالة مسمّاة عادية بدلًا من دالة lambda. وبهذه الطريقة يمكننا أيضًا تضمين مطبوعات مفيدة:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> functools <span class="hljs-keyword">import</span> reduce

my_list = [<span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">1</span>, <span class="hljs-number">5</span>]

<span class="hljs-comment"># a helper function for reduce, adds one value to the current reduced sum</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">sum_helper</span>(<span class="hljs-params">reduced_sum, item</span>):
  <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;the reduced sum is now <span class="hljs-subst">{reduced_sum}</span>, next item is <span class="hljs-subst">{item}</span>&quot;</span>)
  <span class="hljs-comment"># the new reduced sum is the old sum + the next item</span>
  <span class="hljs-keyword">return</span> reduced_sum + item

sum_of_numbers = reduce(sum_helper, my_list, <span class="hljs-number">0</span>)

<span class="hljs-built_in">print</span>(sum_of_numbers)
</code></pre>
<p>يطبع البرنامج ما يلي:</p>
<pre><code>the reduced sum is now 0, next item is 2
the reduced sum is now 2, next item is 3
the reduced sum is now 5, next item is 1
the reduced sum is now 6, next item is 5
11
</code></pre>
<p>أولًا، تعالج الدالة العنصر ذا القيمة 2. في البداية، المجموع المقلَّص هو 0، وهي القيمة الابتدائية الممرَّرة إلى دالة <code>reduce</code>. وتحسب الدالة مجموع هذين وتعيده: <code>0 + 2 = 2</code>.</p>
<p>وهذه هي القيمة المخزّنة في <code>reduced_sum</code> عندما تعالج دالة <code>reduce</code> العنصر التالي في القائمة، ذا القيمة 3. وتحسب الدالة مجموع هذين وتعيده: <code>2 + 3 = 5</code>. ثم تُستخدم هذه النتيجة عند معالجة العنصر التالي، وهكذا دواليك.</p>
<p>الآن، الجمع بسيط، إذ توجد حتى الدالة المدمجة <code>sum</code> لهذا الغرض. لكن ماذا عن الضرب؟ لا حاجة إلا إلى تغييرات طفيفة لإنشاء جداء مقلَّص:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> functools <span class="hljs-keyword">import</span> reduce

my_list = [<span class="hljs-number">2</span>, <span class="hljs-number">2</span>, <span class="hljs-number">4</span>, <span class="hljs-number">3</span>, <span class="hljs-number">5</span>, <span class="hljs-number">2</span>]

product_of_list = reduce(<span class="hljs-keyword">lambda</span> product, item: product * item, my_list, <span class="hljs-number">1</span>)

<span class="hljs-built_in">print</span>(product_of_list)
</code></pre>
<pre><code>480
</code></pre>
<p>ولأننا نتعامل مع الضرب، فالقيمة الابتدائية ليست صفرًا. بل نستخدم 1. فماذا سيحدث لو استخدمنا 0 قيمةً ابتدائية؟</p>
<p>تعاملنا أعلاه في معظم الأحيان مع الأعداد الصحيحة، لكن <code>map</code> و<code>filter</code> و<code>reduce</code> يمكنها جميعًا التعامل مع مجموعة كائنات من أي نوع.</p>
<p>وكمثال، لنولّد مجموع أرصدة كل الحسابات في مصرف، بمساعدة <code>reduce</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">BankAccount</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, account_number: <span class="hljs-built_in">str</span>, name: <span class="hljs-built_in">str</span>, balance: <span class="hljs-built_in">float</span></span>):
        <span class="hljs-variable language_">self</span>.__account_number = account_number
        <span class="hljs-variable language_">self</span>.name = name
        <span class="hljs-variable language_">self</span>.__balance = balance

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">deposit</span>(<span class="hljs-params">self, amount: <span class="hljs-built_in">float</span></span>):
        <span class="hljs-keyword">if</span> amount &gt; <span class="hljs-number">0</span>:
            <span class="hljs-variable language_">self</span>.__balance += amount

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">get_balance</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.__balance

a1 = BankAccount(<span class="hljs-string">&quot;123456&quot;</span>, <span class="hljs-string">&quot;Randy Riches&quot;</span>, <span class="hljs-number">5000</span>)
a2 = BankAccount(<span class="hljs-string">&quot;12321&quot;</span>, <span class="hljs-string">&quot;Paul Pauper&quot;</span>, <span class="hljs-number">1</span>)
a3 = BankAccount(<span class="hljs-string">&quot;223344&quot;</span>, <span class="hljs-string">&quot;Mary Millionaire &quot;</span>, <span class="hljs-number">1000000</span>)

accounts = [a1, a2, a3]

<span class="hljs-keyword">from</span> functools <span class="hljs-keyword">import</span> reduce

<span class="hljs-keyword">def</span> <span class="hljs-title function_">balance_sum_helper</span>(<span class="hljs-params">balance_sum, account</span>):
  <span class="hljs-keyword">return</span> balance_sum + account.get_balance()

balances_total = reduce(balance_sum_helper, accounts, <span class="hljs-number">0</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The total of the bank&#x27;s balances:&quot;</span>)
<span class="hljs-built_in">print</span>(balances_total)
</code></pre>
<p>سيطبع هذا البرنامج ما يلي:</p>
<pre><code>The total of the bank's balances:
1005001
</code></pre>
<p>تلتقط دالة <code>balance_sum_helper</code> رصيد كل حساب مصرفي، بالتابع المخصّص لهذا الغرض في تعريف صنف <code>BankAccount</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">balance_sum_helper</span>(<span class="hljs-params">balance_sum, account</span>):
  <span class="hljs-keyword">return</span> balance_sum + account.get_balance()
</code></pre>
<blockquote>
<p><strong>reduce بدون قيمة ابتدائية</strong></p>
<p>لا تحتاج إلى تمرير وسيط ثالث إلى دالة <code>reduce</code> دائمًا. فمثلًا، سيعمل الجمع بشكل جيد تمامًا <em>بدون</em> القيمة الابتدائية:</p>
<pre><code class="language-python">my_list = [<span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">1</span>, <span class="hljs-number">5</span>]

sum_of_numbers = reduce(<span class="hljs-keyword">lambda</span> reduced_sum, item: reduced_sum + item, my_list)

<span class="hljs-built_in">print</span>(sum_of_numbers)
</code></pre>
<p>إذا حُذفت القيمة الابتدائية، فإن <code>reduce</code> تأخذ العنصر الأول في القائمة قيمةً ابتدائية وتبدأ التقليص من العنصر الثاني فصاعدًا.</p>
</blockquote>
<p><strong>ملاحظة:</strong> إذا كانت العناصر في السلسلة من نوع مختلف عن النتيجة المقلَّصة المقصودة، فإن الوسيط الثالث إلزامي. فلن يعمل المثال الخاص بالحسابات المصرفية بدون القيمة الابتدائية. أي أن محاولة هذا</p>
<pre><code class="language-python">balances_total = reduce(balance_sum_helper, accounts)
</code></pre>
<p>ستُنتج خطأً:</p>
<pre><code class="language-python">TypeError: unsupported operand <span class="hljs-built_in">type</span>(s) <span class="hljs-keyword">for</span> +: <span class="hljs-string">&#x27;BankAccount&#x27;</span> <span class="hljs-keyword">and</span> <span class="hljs-string">&#x27;int&#x27;</span>
</code></pre>
<p>في الحالة أعلاه، عندما تحاول <code>reduce</code> تنفيذ الدالة <code>balance_sum_helper</code> للمرة الأولى، تكون الوسائط التي تستخدمها هي <em>العنصران الأولان في القائمة</em>، وكلاهما من النوع BankAccount. وبشكل أكثر تحديدًا، القيمة المُسنَدة إلى المعامل <code>balance_sum</code> هي العنصر الأول في القائمة. وتحاول دالة <code>balance_sum_helper</code> إضافة قيمة صحيحة إليها، لكن إضافة عدد صحيح مباشرةً إلى كائن BankAccount عملية غير مدعومة.</p>
<blockquote>
<p><strong>تمرين برمجي: النقاط الدراسية</strong></p>
<p>في هذا التمرين سنعمل مع نسخة معدّلة قليلًا من صنف <code>CourseAttempt</code>. فقد حُذف اسم الطالب، لكن عدد النقاط الدراسية مُضمَّن. ويعمل الصنف هكذا:</p>
</blockquote>
<pre><code class="language-python">attempt = CourseAttempt(<span class="hljs-string">&quot;Data Structures and Algorithms&quot;</span>, <span class="hljs-number">3</span>, <span class="hljs-number">10</span>)
<span class="hljs-built_in">print</span>(attempt)
<span class="hljs-built_in">print</span>(attempt.course_name)
<span class="hljs-built_in">print</span>(attempt.credits)
<span class="hljs-built_in">print</span>(attempt.grade)
</code></pre>
<pre><code>Data Structures and Algorithms (10 cr) grade 3
Data Structures and Algorithms
10
3
</code></pre>
<h2 id="مجموع-كل-النقاط-الدراسية">مجموع كل النقاط الدراسية</h2>
<p>يُرجى تنفيذ دالة اسمها <code>sum_of_all_credits</code> تأخذ قائمة محاولات مساقات كوسيط لها. وتجمع الدالة العدد الإجمالي للنقاط الدراسية التي تغطّيها المساقات. وينبغي أن تعمل هكذا:</p>
<pre><code class="language-python">s1 = CourseAttempt(<span class="hljs-string">&quot;Introduction to Programming&quot;</span>, <span class="hljs-number">5</span>, <span class="hljs-number">5</span>)
s2 = CourseAttempt(<span class="hljs-string">&quot;Advanced Course in Programming&quot;</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>)
s3 = CourseAttempt(<span class="hljs-string">&quot;Data Structures and Algorithms&quot;</span>, <span class="hljs-number">3</span>, <span class="hljs-number">10</span>)
credit_sum = sum_of_all_credits([s1, s2, s3])
<span class="hljs-built_in">print</span>(credit_sum)
</code></pre>
<pre><code>20
</code></pre>
<p>يُرجى تنفيذ الدالة باستخدام دالة <code>reduce</code>.</p>
<h2 id="مجموع-النقاط-الدراسية-المجتازة">مجموع النقاط الدراسية المُجتازة</h2>
<p>يُرجى تنفيذ دالة اسمها <code>sum_of_passed_credits</code> تأخذ قائمة محاولات مساقات كوسيط لها. وتجمع الدالة النقاط الدراسية لمحاولات المساقات ذات الدرجة 1 أو أعلى. وينبغي أن تعمل هكذا:</p>
<pre><code class="language-python">s1 = CourseAttempt(<span class="hljs-string">&quot;Introduction to Programming&quot;</span>, <span class="hljs-number">5</span>, <span class="hljs-number">5</span>)
s2 = CourseAttempt(<span class="hljs-string">&quot;Advanced Course in Programming&quot;</span>, <span class="hljs-number">0</span>, <span class="hljs-number">4</span>)
s3 = CourseAttempt(<span class="hljs-string">&quot;Data Structures and Algorithms&quot;</span>, <span class="hljs-number">3</span>, <span class="hljs-number">10</span>)
credit_sum = sum_of_passed_credits([s1, s2, s3])
<span class="hljs-built_in">print</span>(credit_sum)
</code></pre>
<pre><code>15
</code></pre>
<p>يُرجى تنفيذ الدالة باستخدام دالتي <code>reduce</code> و<code>filter</code>.</p>
<h2 id="متوسط-الدرجات-للمساقات-المجتازة">متوسط الدرجات للمساقات المُجتازة</h2>
<p>يُرجى تنفيذ دالة اسمها <code>average</code> تأخذ قائمة محاولات مساقات كوسيط لها. وتحسب الدالة متوسط الدرجات لمحاولات المساقات ذات الدرجة 1 أو أعلى. وينبغي أن تعمل هكذا:</p>
<pre><code class="language-python">s1 = CourseAttempt(<span class="hljs-string">&quot;Introduction to Programming&quot;</span>, <span class="hljs-number">5</span>, <span class="hljs-number">5</span>)
s2 = CourseAttempt(<span class="hljs-string">&quot;Advanced Course in Programming&quot;</span>, <span class="hljs-number">0</span>, <span class="hljs-number">4</span>)
s3 = CourseAttempt(<span class="hljs-string">&quot;Data Structures and Algorithms&quot;</span>, <span class="hljs-number">3</span>, <span class="hljs-number">10</span>)
ag = average([s1, s2, s3])
<span class="hljs-built_in">print</span>(ag)
</code></pre>
<pre><code>4.0
</code></pre>
<p>يُرجى تنفيذ الدالة باستخدام دالتي <code>reduce</code> و<code>filter</code>. ملاحظة: يطلب التمرين متوسطًا حسابيًا بسيطًا، وليس متوسطًا مرجّحًا.</p>
<p>أثناء عملك على هذا التمرين، يجدر بك على الأرجح أن تتذكّر أن <a href="/arabic-cs-library/book/mooc/part-12/3-functional-programming#the-return-value-of-filter-is-an-iterator">القيمة التي تعيدها filter هي مكرّر</a>.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:e,title:p,headings:l,html:t};export{s as book,n as chapter,a as chapterTitle,c as default,l as headings,t as html,e as slug,p as title};
