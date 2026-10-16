const s="mooc",n="part-7",a="الجزء 7: الوحدات",p="2-randomness",l="العشوائية",e=[{depth:2,id:"توليد-عدد-عشوائي",text:"توليد عدد عشوائي"},{depth:2,id:"المزيد-من-دوال-العشوائية",text:"المزيد من دوال العشوائية"},{depth:2,id:"أعداد-اليانصيب",text:"أعداد اليانصيب"},{depth:2,id:"من-أين-تأتي-هذه-الأعداد-العشوائية",text:"من أين تأتي هذه الأعداد العشوائية؟"}],o=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستكون مألوفًا ببعض الدوال في وحدة <code>random</code></li>
<li>ستكون قادرًا على الاستفادة من الأعداد العشوائية في برامجك</li>
</ul>
</blockquote>
<p>يركّز هذا القسم على وحدة <a href="https://docs.python.org/3/library/random.html?highlight=random#module-random">random</a> من مكتبة Python القياسية. وهي تحتوي على أدوات لتوليد الأعداد العشوائية وغيرها من الوظائف العشوائية.</p>
<p>وتحتوي أقسام هذا الجزء من المادة على روابط كثيرة إلى <a href="https://docs.python.org/3/library/">وثائق</a> مكتبة Python القياسية. ونوصي بمتابعة الروابط للتعرّف على كيفية عمل الوثائق.</p>
<h2 id="توليد-عدد-عشوائي">توليد عدد عشوائي</h2>
<p>تُعيد الدالة <a href="https://docs.python.org/3/library/random.html?highlight=random#random.randint">randint(a, b)</a> قيمة عدد صحيح عشوائية بين <code>a</code> و<code>b</code> ضمنا. فمثلًا، يعمل البرنامج التالي عمل حجر نرد عادي:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> random <span class="hljs-keyword">import</span> randint

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The result of the throw:&quot;</span>, randint(<span class="hljs-number">1</span>, <span class="hljs-number">6</span>))
</code></pre>
<p>قد يطبع تنفيذ هذا ما يلي:</p>
<pre><code>The result of the throw: 4
</code></pre>
<p>البرنامج التالي يرمي حجر النرد عشر مرات:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> random <span class="hljs-keyword">import</span> randint

<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">10</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The result of the throw:&quot;</span>, randint(<span class="hljs-number">1</span>, <span class="hljs-number">6</span>))
</code></pre>
<p>قد يطبع تشغيل ما سبق</p>
<pre><code>The result of the throw: 5
The result of the throw: 4
The result of the throw: 3
The result of the throw: 2
The result of the throw: 3
The result of the throw: 4
The result of the throw: 6
The result of the throw: 4
The result of the throw: 4
The result of the throw: 3
</code></pre>
<p>ملاحظة: يجدر التذكير بأن الدالة <code>randint</code> تعمل بطريقة مختلفة قليلًا عند مقارنتها، مثلًا، بالشرائح، أو بالدالة <code>range</code> التي صادفناها سابقًا. فاستدعاء الدالة <code>randint(1, 6)</code> ينتج عددًا بين 1 و6 ضمنا، أما استدعاء الدالة <code>range(1, 6)</code> فينتج نطاقًا من الأعداد من 1 إلى 5.</p>
<h2 id="المزيد-من-دوال-العشوائية">المزيد من دوال العشوائية</h2>
<p>ستخلط الدالة <a href="https://docs.python.org/3/library/random.html?highlight=random#random.shuffle">shuffle</a> أي بنية بيانات تُمرَّر إليها كوسيط، في مكانها. فمثلًا، يخلط البرنامج التالي قائمة كلمات:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> random <span class="hljs-keyword">import</span> shuffle

words = [<span class="hljs-string">&quot;atlas&quot;</span>, <span class="hljs-string">&quot;banana&quot;</span>, <span class="hljs-string">&quot;carrot&quot;</span>]
shuffle(words)
<span class="hljs-built_in">print</span>(words)
</code></pre>
<pre><code>['banana', 'atlas', 'carrot']
</code></pre>
<p>تُعيد الدالة <code>choice</code> عنصرًا مختارًا عشوائيًّا من بنية بيانات:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> random <span class="hljs-keyword">import</span> choice

words = [<span class="hljs-string">&quot;atlas&quot;</span>, <span class="hljs-string">&quot;banana&quot;</span>, <span class="hljs-string">&quot;carrot&quot;</span>]
<span class="hljs-built_in">print</span>(choice(words))
</code></pre>
<pre><code>'carrot'
</code></pre>
<h2 id="أعداد-اليانصيب">أعداد اليانصيب</h2>
<p>من الأمثلة الشائعة لدراسة العشوائية حالة أعداد اليانصيب. ولنجرّب سحب بعض أعداد اليانصيب. في فنلندا يتكوّن اليانصيب الوطني من مجموعة من 40 عددًا، يُختار منها 7 لكل سحب أسبوعي.</p>
<p>قد تبدو المحاولة الأولى لسحب مجموعة أعداد هكذا:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> random <span class="hljs-keyword">import</span> randint

<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">7</span>):
    <span class="hljs-built_in">print</span>(randint(<span class="hljs-number">1</span>, <span class="hljs-number">40</span>))
</code></pre>
<p>لكن هذا لن ينجح على المدى الطويل، إذ قد يظهر العدد نفسه مرتين في سحب أسبوعي واحد من سبعة أعداد. ونحتاج إلى طريقة تضمن أن تكون جميع الأعداد المسحوبة فريدة.</p>
<p>وأحد الاحتمالات هو تخزين الأعداد المسحوبة في قائمة، وإضافة العدد فقط إذا لم يكن موجودًا فيها أصلًا. ويمكن تكرار ذلك حتى يصبح طول القائمة سبعة:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> random <span class="hljs-keyword">import</span> randint

weekly_draw = []
<span class="hljs-keyword">while</span> <span class="hljs-built_in">len</span>(weekly_draw) &lt; <span class="hljs-number">7</span>:
    new_rnd = randint(<span class="hljs-number">1</span>, <span class="hljs-number">40</span>)
    <span class="hljs-keyword">if</span> new_rnd <span class="hljs-keyword">not</span> <span class="hljs-keyword">in</span> weekly_draw:
        weekly_draw.append(new_rnd)

<span class="hljs-built_in">print</span>(weekly_draw)
</code></pre>
<p>ويكون النهج الأكثر إحكامًا استخدام الدالة <code>shuffle</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> random <span class="hljs-keyword">import</span> shuffle

number_pool = <span class="hljs-built_in">list</span>(<span class="hljs-built_in">range</span>(<span class="hljs-number">1</span>, <span class="hljs-number">41</span>))
shuffle(number_pool)
weekly_draw = number_pool[<span class="hljs-number">0</span>:<span class="hljs-number">7</span>]
<span class="hljs-built_in">print</span>(weekly_draw)
</code></pre>
<p>والفكرة هنا أننا ننشئ أولًا قائمة تحتوي على الأعداد المتاحة من 1 إلى 40، تمامًا مثل الكرات في آلة اليانصيب. ثم تُخلط مجموعة الأعداد، وتُختار الأعداد السبعة الأولى للسحب الأسبوعي. وهذا يوفّر علينا عناء كتابة حلقة.</p>
<p>في الواقع، تحتوي وحدة <code>random</code> على طريقة أسهل لاختيار أعداد اليانصيب: الدالة <a href="https://docs.python.org/3/library/random.html?highlight=random#random.sample">sample</a>. وهي تُعيد اختيارًا عشوائيًّا بحجم محدّد من بنية بيانات معطاة:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> random <span class="hljs-keyword">import</span> sample

number_pool = <span class="hljs-built_in">list</span>(<span class="hljs-built_in">range</span>(<span class="hljs-number">1</span>, <span class="hljs-number">41</span>))
weekly_draw = sample(number_pool, <span class="hljs-number">7</span>)
<span class="hljs-built_in">print</span>(weekly_draw)
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: أعداد اليانصيب</strong></p>
<p>يُرجى كتابة دالة اسمها <code>lottery_numbers(amount: int, lower: int, upper: int)</code>، تولّد عددًا من الأعداد العشوائية بقدر ما يحدّده الوسيط الأول. وينبغي أن تقع جميع الأعداد ضمن الحدّين <code>lower</code> و<code>upper</code>. وينبغي تخزين الأعداد في قائمة وإرجاعها. وينبغي أن تكون الأعداد مرتّبة تصاعديًّا في القائمة المُعادة.</p>
</blockquote>
<p>ولأن هذه أعداد يانصيب، فلا ينبغي أن يظهر أي عدد مرتين في القائمة.</p>
<p>ومثال على كيفية عمل الدالة:</p>
<pre><code class="language-python"><span class="hljs-keyword">for</span> number <span class="hljs-keyword">in</span> lottery_numbers(<span class="hljs-number">7</span>, <span class="hljs-number">1</span>, <span class="hljs-number">40</span>):
    <span class="hljs-built_in">print</span>(number)
</code></pre>
<pre><code>4
7
11
16
22
29
38
</code></pre>
<h2 id="من-أين-تأتي-هذه-الأعداد-العشوائية">من أين تأتي هذه الأعداد العشوائية؟</h2>
<p>تستند خصائص وحدة <a href="https://docs.python.org/3/library/random.html">random</a> إلى خوارزمية تولّد أعدادًا عشوائية بناءً على قيمة تهيئة معيّنة وبعض العمليات الحسابية. وتُسمّى قيمة التهيئة غالبًا <em>قيمة البذرة</em> (seed value).</p>
<p>ويمكن للمستخدم تزويد قيمة البذرة بالدالة <a href="https://docs.python.org/3/library/random.html?highlight=random#random.seed">seed</a>:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> random <span class="hljs-keyword">import</span> randint, seed

seed(<span class="hljs-number">1337</span>)
<span class="hljs-comment"># this will always produce the same &quot;random&quot; number</span>
<span class="hljs-built_in">print</span>(randint(<span class="hljs-number">1</span>, <span class="hljs-number">100</span>))
</code></pre>
<p>إذا كانت لدينا دوال تعتمد على العشوائية، وحدّدنا قيمة البذرة، فستُنتج الدالة النتيجة نفسها في كل مرة تُنفَّذ فيها. وقد تختلف النتيجة مع إصدارات Python المختلفة، لكن العشوائية في جوهرها تضيع بتحديد قيمة البذرة. ويمكن أن تكون هذه ميزة مفيدة عند اختبار برنامج، مثلًا.</p>
<blockquote>
<p><strong>العشوائية الحقيقية</strong></p>
<p>ولكي نكون دقيقين، فإن الأعداد التي توفّرها وحدة <code>random</code> ليست عشوائية حقًّا. بل هي <em>شبه عشوائية</em> (pseudorandom). فالحواسيب في جوهرها آلات حتمية. وفي الوضع المثالي، ينبغي أن يكون بالإمكان التنبؤ بطريقة عملها حتى آخر بِت. لذا يصعب جدًّا إنشاء أعداد عشوائية حقًّا بالحاسوب. ومع ذلك، تكفي الأعداد شبه العشوائية لكثير من التطبيقات. وعندما تُطلب أعداد عشوائية حقيقية، تُولَّد قيمة البذرة عادةً من مصدر خارج الحاسوب، مثل الإشعاع الخلفي أو مستويات الضوضاء أو <a href="https://blog.cloudflare.com/randomness-101-lavarand-in-production/">مصابيح الحمم</a>.</p>
<p>ولمزيد من المعلومات عن العشوائية، يُرجى الاطلاع على <a href="https://www.random.org/randomness/">random.org</a>.</p>
</blockquote>
<blockquote>
<p><strong>تمرين برمجي: مولّد كلمات المرور، الجزء 1</strong></p>
<p>يُرجى كتابة دالة تنشئ كلمات مرور بطول مرغوب، تتكوّن من المحارف الصغيرة a إلى z.</p>
</blockquote>
<p>ومثال على كيفية عمل الدالة:</p>
<pre><code class="language-python"><span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">10</span>):
    <span class="hljs-built_in">print</span>(generate_password(<span class="hljs-number">8</span>))
</code></pre>
<pre><code>lttehepy
olsxttjl
cbjncrzo
dwxqjdgu
gpfdcecs
jabyvgar
xnbbonbl
ktmsjyww
ejhprmel
rjkoacib
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: مولّد كلمات المرور، الجزء 2</strong></p>
<p>يُرجى كتابة نسخة محسّنة من مولّد كلمات المرور لديك. تأخذ الدالة الآن ثلاثة وسائط:</p>
</blockquote>
<ul>
<li>إذا كان الوسيط الثاني <code>True</code>، ينبغي أن تحتوي كلمة المرور المولَّدة أيضًا على عدد واحد أو أكثر.</li>
<li>إذا كان الوسيط الثالث <code>True</code>، ينبغي أن تحتوي كلمة المرور المولَّدة أيضًا على محرف واحد أو أكثر من هذه المحارف الخاصة: <code>!?=+-()#</code>.</li>
</ul>
<p>وعلى الرغم من هذين الوسيطين الإضافيين، ينبغي أن تحتوي كلمة المرور دائمًا على حرف أبجدي صغير واحد على الأقل. ويمكنك أن تفترض أن الدالة لن تُستدعى إلا بمجموعات وسائط يمكن صياغتها في كلمات مرور تتبع هذه القواعد. أي أن الوسائط لن تحدّد، مثلًا، كلمة مرور بطول 2 تحتوي على عدد ومحرف خاص معًا، إذ لن يكون هناك عندئذ مكان للحرف الصغير الإلزامي.</p>
<p>ومثال على كيفية عمل الدالة:</p>
<pre><code class="language-python"><span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">10</span>):
    <span class="hljs-built_in">print</span>(generate_strong_password(<span class="hljs-number">8</span>, <span class="hljs-literal">True</span>, <span class="hljs-literal">True</span>))
</code></pre>
<pre><code>2?0n+u31
u=m4nl94
n#=i6r#(
da9?zvm?
7h)!)g?!
a=59x2n5
(jr6n3b5
9n(4i+2!
32+qba#=
n?b0a7ey
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: رامي النرد</strong></p>
<p>في هذا التمرين ستكتب بعض الدوال التي يمكن استخدامها في الألعاب التي تشمل النرد.</p>
</blockquote>
<p>وعوضًا عن النرد العادي، يحدّد هذا التمرين <em>النرد غير المتعدّي</em> (non-transitive dice). ويمكنك القراءة عنه <a href="https://singingbanana.com/dice/article.htm">هنا</a> أو <a href="https://www.youtube.com/watch?v=LrIp6CKUlH8">مشاهدة هذا الفيديو</a>.</p>
<p>ستستخدم ثلاثة أحجار نرد:</p>
<ul>
<li>الحجر A أوجهه 3، 3، 3، 3، 3، 6</li>
<li>الحجر B أوجهه 2، 2، 2، 5، 5، 5</li>
<li>الحجر C أوجهه 1، 4، 4، 4، 4، 4</li>
</ul>
</pre>
<p>يُرجى كتابة دالة اسمها <code>roll(die: str)</code>، ترمي حجر النرد الذي يحدّده الوسيط. ومثال على كيفية عمل ذلك:</p>
<pre><code class="language-python"><span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">20</span>):
    <span class="hljs-built_in">print</span>(roll(<span class="hljs-string">&quot;A&quot;</span>), <span class="hljs-string">&quot; &quot;</span>, end=<span class="hljs-string">&quot;&quot;</span>)
<span class="hljs-built_in">print</span>()
<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">20</span>):
    <span class="hljs-built_in">print</span>(roll(<span class="hljs-string">&quot;B&quot;</span>), <span class="hljs-string">&quot; &quot;</span>, end=<span class="hljs-string">&quot;&quot;</span>)
<span class="hljs-built_in">print</span>()
<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">20</span>):
    <span class="hljs-built_in">print</span>(roll(<span class="hljs-string">&quot;C&quot;</span>), <span class="hljs-string">&quot; &quot;</span>, end=<span class="hljs-string">&quot;&quot;</span>)
</code></pre>
<pre><code>3  3  3  3  3  3  3  3  3  3  3  3  3  3  3  3  6  3  6  3
2  2  5  2  2  5  5  2  2  5  2  5  5  5  2  5  2  2  2  2
4  4  4  4  4  1  1  4  4  4  1  4  4  4  4  4  4  4  4  4
</code></pre>
<p>واكتب أيضًا دالة اسمها <code>play(die1: str, die2: str, times: int)</code>، ترمي حجري النرد معًا بعدد المرات التي يحدّدها الوسيط الثالث. وينبغي أن تُعيد الدالة صفًّا (tuple). وينبغي أن يكون العنصر الأول عدد المرات التي فاز فيها النرد الأول، والثاني عدد المرات التي فاز فيها النرد الثاني، والثالث عدد مرات التعادل.</p>
<pre><code class="language-python">result = play(<span class="hljs-string">&quot;A&quot;</span>, <span class="hljs-string">&quot;C&quot;</span>, <span class="hljs-number">1000</span>)
<span class="hljs-built_in">print</span>(result)
result = play(<span class="hljs-string">&quot;B&quot;</span>, <span class="hljs-string">&quot;B&quot;</span>, <span class="hljs-number">1000</span>)
<span class="hljs-built_in">print</span>(result)
</code></pre>
<pre><code>(292, 708, 0)
(249, 273, 478)
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: كلمات عشوائية</strong></p>
<p>يحتوي قالب التمرين على الملف <code>words.txt</code>، الذي يحوي بعض الكلمات الإنجليزية، كلمة في كل سطر.</p>
</blockquote>
<p>يُرجى كتابة دالة اسمها <code>words(n: int, beginning: str)</code>، تُعيد قائمة تحتوي على <code>n</code> كلمة عشوائية من الملف <code>words.txt</code>. وينبغي أن تبدأ جميع الكلمات بالسلسلة النصية التي يحدّدها الوسيط الثاني.</p>
<p>وينبغي ألّا تظهر الكلمة نفسها مرتين في القائمة. وإذا لم تكن هناك كلمات كافية تبدأ بالسلسلة النصية المحدّدة، ينبغي أن ترفع الدالة استثناء <code>ValueError</code>.</p>
<p>ومثال على عمل الدالة:</p>
<pre><code class="language-python">word_list = words(<span class="hljs-number">3</span>, <span class="hljs-string">&quot;ca&quot;</span>)
<span class="hljs-keyword">for</span> word <span class="hljs-keyword">in</span> word_list:
    <span class="hljs-built_in">print</span>(word)
</code></pre>
<pre><code>cat
car
carbon
</code></pre>
<!---
> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: d53a6898-f390-55ef-b266-95694bcbe704)

-->
`,r={book:s,chapter:n,chapterTitle:a,slug:p,title:l,headings:e,html:o};export{s as book,n as chapter,a as chapterTitle,r as default,e as headings,o as html,p as slug,l as title};
