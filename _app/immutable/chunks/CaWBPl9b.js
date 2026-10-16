const n="mooc",s="part-2",e="الجزء 2: الجمل الشرطية",a="4-simple-loops",p="الحلقات البسيطة",t=[{depth:2,id:"الحلقات-والمتغيرات-المساعدة",text:"الحلقات والمتغيّرات المساعدة"},{depth:2,id:"تنقيح-عبارات-الطباعة-داخل-الحلقات",text:"تنقيح عبارات الطباعة داخل الحلقات"},{depth:2,id:"دمج-السلاسل-النصية-بالمشغل",text:"دمج السلاسل النصية بالمشغّل +"},{depth:3,id:"الجزء-1",text:"الجزء 1"},{depth:3,id:"الجزء-2",text:"الجزء 2"},{depth:3,id:"ما-قبل-التمرين",text:"ما قبل التمرين"},{depth:3,id:"الجزء-1-العد",text:"الجزء 1: العدّ"},{depth:3,id:"الجزء-2-المجموع",text:"الجزء 2: المجموع"},{depth:3,id:"الجزء-3-المعدل",text:"الجزء 3: المعدّل"}],o=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستعرف ما معنى الحلقة في البرمجة</li>
<li>ستتمكّن من استخدام حلقة <code>while True</code> في برامجك</li>
<li>ستعرف كيف تستخدم الأمر <code>break</code> للخروج من حلقة</li>
</ul>
</blockquote>
<p>لقد غطّينا الآن البنى الشرطية بتفصيل. وهناك تقنية أساسية أخرى في البرمجة وهي <em>التكرار</em> (<em>iteration</em>). وهما معًا يشكّلان بنى التحكّم الأساسية التي يجب على كل مبرمج إتقانها. وتُسمّيان بنى التحكّم لأنهما يسمحان لك أساسًا بالتحكّم في أي سطور من الشيفرة ستُنفَّذ ومتى. فبينما تتيح لك البنى الشرطية <em>الاختيار بين</em> أجزاء من الشيفرة، تتيح لك بنى التكرار <em>تكرار</em> أجزاء من الشيفرة. وكثيرًا ما تُسمّى <em>حلقات</em> (<em>loops</em>)، لأنها تتيح للبرنامج أن &quot;يلتف&quot; إلى سطر سبق أن نُفِّذ. وتُسمّى عملية تنفيذ تكرار واحد من الحلقة أيضًا تكرارًا (<em>iteration</em>) للحلقة.</p>
<p>يُقدّم هذا القسم حلقة <code>while</code> بسيطة. بنيتها مشابهة للجمل الشرطية التي غطّيناها من قبل. وفي الجزء التالي سنغوص في بعض الأمثلة الأكثر تقدّمًا.</p>
<p>لننظر إلى برنامج يطلب من المستخدم إدخال عدد ثم يطبع مربّع هذا العدد. ويستمر ذلك حتى يكتب المستخدم -1.</p>
<pre><code class="language-python"><span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    number = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a number, -1 to quit: &quot;</span>))

    <span class="hljs-keyword">if</span> number == -<span class="hljs-number">1</span>:
        <span class="hljs-keyword">break</span>

    <span class="hljs-built_in">print</span>(number ** <span class="hljs-number">2</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Thanks and bye!&quot;</span>)
</code></pre>
<p>قد يبدو تشغيل البرنامج على النحو التالي:</p>
<pre><code>Please type in a number, -1 to quit: **2**
4
Please type in a number, -1 to quit: **4**
16
Please type in a number, -1 to quit: **10**
100
Please type in a number, -1 to quit: **-1**
Thanks and bye!
</code></pre>
<p>وكما ترى أعلاه، يطلب البرنامج عدة أعداد بفضل جملة <code>while</code> الموجودة فيه. وعندما يكتب المستخدم -1، يُنفَّذ الأمر <code>break</code>، الذي يخرج من الحلقة ويستأنف التنفيذ من أول سطر بعد كتلة <code>while</code>.</p>
<p>وفي الحلقات، من الضروري دائمًا أن تتوفّر طريقة للخروج من الحلقة عند نقطة ما في الشيفرة، وإلا فقد يستمر التكرار إلى ما لا نهاية. ولتوضيح ذلك، لنغيّر قليلًا المثال أعلاه:</p>
<pre><code class="language-python">number = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a number, -1 to quit: &quot;</span>))
<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    <span class="hljs-keyword">if</span> number == -<span class="hljs-number">1</span>:
        <span class="hljs-keyword">break</span>

    <span class="hljs-built_in">print</span>(number ** <span class="hljs-number">2</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Thanks and bye!&quot;</span>)
</code></pre>
<p>في هذه النسخة يطلب البرنامج من المستخدم كتابة عدد <em>خارج الحلقة</em>. وإذا كتب المستخدم أي عدد آخر غير -1، فلا يُخرَج من الحلقة أبدًا. وهذا يشكّل <em>حلقة لا نهائية</em> (<em>infinite loop</em>)، أي أن كتلة الشيفرة داخل الحلقة تتكرّر بلا نهاية:</p>
<pre><code>Please type in a number, -1 to quit: **2**
4
4
4
4
4
4
4
4
(continued ad infinitum...)
</code></pre>
<p>والبرنامج التالي له بنية مشابهة للمثال السابق على الحلقة اللانهائية، لكن تجربة المستخدم مختلفة كثيرًا. إذ يتيح هذا البرنامج للمستخدم المتابعة فقط إذا كتب الرمز السري الصحيح <em>1234</em>:</p>
<pre><code class="language-python"><span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    code = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in your PIN: &quot;</span>)
    <span class="hljs-keyword">if</span> code == <span class="hljs-string">&quot;1234&quot;</span>:
        <span class="hljs-keyword">break</span>
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Incorrect...try again&quot;</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Correct PIN entered!&quot;</span>)
</code></pre>
<pre><code>Please type in your PIN: **0000**
Incorrect...try again
Please type in your PIN: **9999**
Incorrect...try again
Please type in your PIN: **1234**
Correct PIN entered!
</code></pre>
<blockquote>
<p><strong>تمرين تفاعلي: هل نواصل؟</strong></p>
<p>لننشئ برنامجًا على غرار المثال أعلاه. ينبغي أن يطبع هذا البرنامج الرسالة &quot;hi&quot; ثم أن يسأل &quot;Shall we continue?&quot; حتى يُدخل المستخدم كلمة &quot;no&quot;. ثم ينبغي للبرنامج أن يطبع &quot;okay then&quot; وينتهي. يُرجى الاطلاع على المثال أدناه.</p>
</blockquote>
<pre><code>hi
Shall we continue? **yes**
hi
Shall we continue? **oui**
hi
Shall we continue? **jawohl**
hi
Shall we continue? **no**
okay then
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: التحقّق من صحّة المُدخَل</strong></p>
<p>يُرجى كتابة برنامج يطلب من المستخدم أعدادًا صحيحة.</p>
</blockquote>
<p>وإذا كان العدد أقل من صفر، فينبغي للبرنامج أن يطبع الرسالة &quot;Invalid number&quot;.</p>
<p>وإذا كان العدد أكبر من صفر، فينبغي للبرنامج أن يطبع الجذر التربيعي للعدد باستخدام دالة <code>sqrt</code> في Python.</p>
<p>وفي الحالتين، ينبغي للبرنامج بعد ذلك أن يطلب عددًا آخر.</p>
<p>وإذا أدخل المستخدم العدد صفر، فينبغي للبرنامج أن يتوقّف عن طلب الأعداد وأن يخرج من الحلقة.</p>
<p>تجد أدناه تذكيرًا بكيفية استخدام دالة <code>sqrt</code>. ولا تنسَ أن تستوردها بـ<code>import</code> في بداية البرنامج.</p>
<pre><code class="language-python"><span class="hljs-comment"># sqrt function will not work without this line in the beginning of the program</span>
<span class="hljs-keyword">from</span> math <span class="hljs-keyword">import</span> sqrt

<span class="hljs-built_in">print</span>(sqrt(<span class="hljs-number">9</span>))
</code></pre>
<pre><code>3.0
</code></pre>
<p>مثال على السلوك المتوقَّع لبرنامجك:</p>
<pre><code>Please type in a number: **16**
4.0
Please type in a number: **4**
2.0
Please type in a number: **-3**
Invalid number
Please type in a number: **1**
1.0
Please type in a number: **0**
Exiting...
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: إصلاح الشيفرة: العدّ التنازلي</strong></p>
<p>ينبغي أن يطبع هذا برنامج تنازليًا. والشيفرة على النحو التالي:</p>
</blockquote>
<pre><code class="language-python">number = <span class="hljs-number">5</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Countdown!&quot;</span>)
<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
  <span class="hljs-built_in">print</span>(number)
  number = number - <span class="hljs-number">1</span>
  <span class="hljs-keyword">if</span> number &gt; <span class="hljs-number">0</span>:
    <span class="hljs-keyword">break</span>

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Now!&quot;</span>)
</code></pre>
<p>وينبغي أن يطبع هذا</p>
<pre><code>Countdown!
5
4
3
2
1
Now!
</code></pre>
<p>لكن البرنامج لا يعمل تمامًا كما ينبغي. يُرجى إصلاحه.</p>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: تكرار كلمة المرور</strong></p>
<p>يُرجى كتابة برنامج يطلب من المستخدم كلمة مرور. ثم ينبغي للبرنامج أن يطلب من المستخدم كتابة كلمة المرور مرة أخرى. وإذا كتب المستخدم شيئًا غير كلمة المرور الأولى، فينبغي للبرنامج أن يواصل الطلب حتى يكتب المستخدم كلمة المرور الأولى مرة أخرى بشكل صحيح.</p>
</blockquote>
<p>اطّلع على السلوك المتوقَّع أدناه:</p>
<pre><code>Password: **sekred**
Repeat password: **secret**
They do not match!
Repeat password: **cantremember**
They do not match!
Repeat password: **sekred**
User account created!
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<h2 id="الحلقات-والمتغيرات-المساعدة">الحلقات والمتغيّرات المساعدة</h2>
<p>لنجعل مثال التحقّق من الرمز السري أكثر واقعية قليلًا. فهذه النسخة تتيح للمستخدم ثلاث محاولات فقط لكتابة الرمز السري.</p>
<p>يستخدم البرنامج متغيّرَي مساعدَين. فالمتغيّر <code>attempts</code> يتتبّع عدد المرات التي كتب فيها المستخدم رمزًا سريًا. والمتغيّر <code>success</code> يُعيَّن على <code>True</code> أو <code>False</code> بناءً على ما إذا كان المستخدم قد نجح في تسجيل الدخول.</p>
<pre><code class="language-python">attempts = <span class="hljs-number">0</span>

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    code = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in your PIN: &quot;</span>)
    attempts += <span class="hljs-number">1</span>

    <span class="hljs-keyword">if</span> code == <span class="hljs-string">&quot;1234&quot;</span>:
        success = <span class="hljs-literal">True</span>
        <span class="hljs-keyword">break</span>

    <span class="hljs-keyword">if</span> attempts == <span class="hljs-number">3</span>:
        success = <span class="hljs-literal">False</span>
        <span class="hljs-keyword">break</span>

    <span class="hljs-comment"># this is printed if the code was incorrect AND there have been less than three attempts</span>
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Incorrect...try again&quot;</span>)

<span class="hljs-keyword">if</span> success:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Correct PIN entered!&quot;</span>)
<span class="hljs-keyword">else</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Too many attempts...&quot;</span>)
</code></pre>
<pre><code>Please type in your PIN: **0000**
Incorrect...try again
Please type in your PIN: **1234**
Correct PIN entered!
</code></pre>
<pre><code>Please type in your PIN: **0000**
Incorrect...try again
Please type in your PIN: **9999**
Incorrect...try again
Please type in your PIN: **4321**
Too many attempts...
</code></pre>
<p>تُخرَج الحلقة <em>إما</em> عندما يكتب المستخدم الرمز السري الصحيح <em>أو</em> عندما تكون المحاولات قد تجاوزت الحد. وتتحقّق جملة <code>if</code> التالية للحلقة من قيمة المتغيّر <code>success</code> وتطبع رسالة وفق ذلك.</p>
<h2 id="تنقيح-عبارات-الطباعة-داخل-الحلقات">تنقيح عبارات الطباعة داخل الحلقات</h2>
<p>إن إضافة الحلقات إلى البرامج تضيف أيضًا مصادر محتملة للأخطاء. فيصبح إتقان استخدام عبارات الطباعة للتنقيح، كما عُرِّفت في <a href="/arabic-cs-library/book/mooc/part-2/1-programming_terminology">القسم الأول من هذا الجزء</a>، أكثر أهمية.</p>
<p>لننظر إلى برنامج يكاد يكون مطابقًا للمثال السابق، مع فارق وحيد مهم:</p>
<pre><code class="language-python">attempts = <span class="hljs-number">0</span>

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    code = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in your PIN: &quot;</span>)
    attempts += <span class="hljs-number">1</span>

    <span class="hljs-keyword">if</span> attempts == <span class="hljs-number">3</span>:
        success = <span class="hljs-literal">False</span>
        <span class="hljs-keyword">break</span>

    <span class="hljs-keyword">if</span> code == <span class="hljs-string">&quot;1234&quot;</span>:
        success = <span class="hljs-literal">True</span>
        <span class="hljs-keyword">break</span>

    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Incorrect...try again&quot;</span>)

<span class="hljs-keyword">if</span> success:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Correct PIN entered!&quot;</span>)
<span class="hljs-keyword">else</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Too many attempts...&quot;</span>)
</code></pre>
<p>تتصرّف هذه النسخة على نحو غريب عندما يكتب المستخدم الرمز الصحيح في المحاولة الثالثة:</p>
<pre><code>Please type in your PIN: **0000**
Incorrect...try again
Please type in your PIN: **9999**
Incorrect...try again
Please type in your PIN: **1234**
Too many attempts...
</code></pre>
<p>إذن، لنحاول أن نجد السبب بإضافة بعض عبارات الطباعة للتنقيح في مواقع مدروسة داخل الحلقة:</p>
<pre><code class="language-python"><span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;beginning of the while block:&quot;</span>)
    code = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in your PIN: &quot;</span>)
    attempts += <span class="hljs-number">1</span>

    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;attempts:&quot;</span>, attempts)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;condition1:&quot;</span>, attempts == <span class="hljs-number">3</span>)
    <span class="hljs-keyword">if</span> attempts == <span class="hljs-number">3</span>:
        success = <span class="hljs-literal">False</span>
        <span class="hljs-keyword">break</span>

    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;code:&quot;</span>, code)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;condition2:&quot;</span>, code == <span class="hljs-string">&quot;1234&quot;</span>)
    <span class="hljs-keyword">if</span> code == <span class="hljs-string">&quot;1234&quot;</span>:
        success = <span class="hljs-literal">True</span>
        <span class="hljs-keyword">break</span>

    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Incorrect...try again&quot;</span>)
</code></pre>
<pre><code>beginning of the while block:
Please type in your PIN: **2233**
attempts: 1
condition1: False
code: 2233
condition2: False
Incorrect...try again
beginning of the while block:
Please type in your PIN: **4545**
attempts: 2
condition1: False
code: 4545
condition2: False
Incorrect...try again
beginning of the while block:
Please type in your PIN: **1234**
attempts: 3
condition1: True
Too many attempts...
</code></pre>
<p>ومن المخرجات أعلاه نرى أن شرط جملة <code>if</code> الأولى يكون <code>True</code> أثناء التكرار الثالث للحلقة، فتُنهى الحلقة. ولا يصل هذا التكرار أبدًا إلى جملة <code>if</code> الثانية، التي تتحقّق مما إذا كانت الشيفرة قد كُتبت بشكل صحيح:</p>
<pre><code class="language-python">  <span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    <span class="hljs-comment"># ....</span>

    <span class="hljs-comment"># this block is executed too early</span>
    <span class="hljs-keyword">if</span> attempts == <span class="hljs-number">3</span>:
        success = <span class="hljs-literal">False</span>
        <span class="hljs-keyword">break</span>

    <span class="hljs-comment"># the third iteration never gets this far</span>
    <span class="hljs-keyword">if</span> code == <span class="hljs-string">&quot;1234&quot;</span>:
        success = <span class="hljs-literal">True</span>
        <span class="hljs-keyword">break</span>
</code></pre>
<p>إنّ ترتيب الجمل الشرطية، أو ترتيب الفروع المختلفة داخل جملة شرطية، سبب شائع للأخطاء، خاصةً في الحلقات. وعبارات الطباعة للتنقيح هي غالبًا أبسط طريقة للعثور على سببها.</p>
<blockquote>
<p><strong>تمرين تفاعلي: الرمز السري وعدد المحاولات</strong></p>
<p>يُرجى كتابة برنامج يواصل سؤال المستخدم عن رمز سري حتى يكتب الرمز الصحيح، وهو <em>4321</em>. وينبغي للبرنامج بعد ذلك أن يطبع عدد المرات التي جرّب فيها المستخدم رموزًا مختلفة.</p>
</blockquote>
<pre><code>PIN: **3245**
Wrong
PIN: **1234**
Wrong
PIN: **0000**
Wrong
PIN: **4321**
Correct! It took you 4 attempts
</code></pre>
<p>وإذا أصاب المستخدم في المحاولة الأولى، فينبغي للبرنامج أن يطبع شيئًا مختلفًا قليلًا:</p>
<pre><code>PIN: **4321**
Correct! It only took you one single attempt!
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: السنة الكبيسة التالية</strong></p>
<p>يُرجى كتابة برنامج يطلب من المستخدم سنة، ثم يطبع السنة الكبيسة التالية.</p>
</blockquote>
<pre><code>Year: **2023**
The next leap year after 2023 is 2024
</code></pre>
<p>وإذا أدخل المستخدم سنة كبيسة (مثل 2024)، فينبغي للبرنامج أن يطبع السنة الكبيسة التالية:</p>
<pre><code>Year: **2024**
The next leap year after 2024 is 2028
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<h2 id="دمج-السلاسل-النصية-بالمشغل">دمج السلاسل النصية بالمشغّل +</h2>
<p>استخدم مثال التحقّق من الرمز السري أعلاه متغيّرًا مساعدًا هو <code>attempts</code> لتتبّع عدد المرات التي حاول فيها المستخدم كتابة شيفرة:</p>
<pre><code class="language-python">attempts = <span class="hljs-number">0</span>

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    code = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in your PIN: &quot;</span>)
    attempts += <span class="hljs-number">1</span>
    <span class="hljs-comment"># ...</span>
</code></pre>
<p>يُعيَّن هذا المتغيّر على صفر خارج الحلقة، ويزيد كل تكرار قيمته بمقدار واحد.</p>
<p>وتنطبق فكرة الزيادة المشابهة على متغيّرات السلاسل النصية أيضًا. فمثلًا يمكن للبرنامج أن يتتبّع جميع الرموز السرّية التي كتبها المستخدم:</p>
<pre><code class="language-python">
codes = <span class="hljs-string">&quot;&quot;</span>
attempts = <span class="hljs-number">0</span>

<span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
    code = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in your PIN: &quot;</span>)
    attempts += <span class="hljs-number">1</span>
    codes += code + <span class="hljs-string">&quot;, &quot;</span>
    <span class="hljs-comment"># ...</span>
</code></pre>
<p>يُهيَّأ المتغيّر المساعد على <em>سلسلة نصية فارغة</em>، أي سلسلة نصية لا تحوي أي محارف:</p>
<pre><code class="language-python">codes = <span class="hljs-string">&quot;&quot;</span>
</code></pre>
<p>ومع كل تكرار تصير السلسلة النصية أطول، إذ تُضاف الشيفرة التي كتبها المستخدم مع فاصلة:</p>
<pre><code class="language-python">    code = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in your PIN: &quot;</span>)
    codes += code + <span class="hljs-string">&quot;, &quot;</span>
</code></pre>
<p>وإذا كتب المستخدم الرموز <em>1111 2222 1234</em>، فإن قيمة <code>codes</code> في نهاية تنفيذ البرنامج ستكون</p>
<pre><code>1111, 2222, 1234,
</code></pre>
<blockquote>
<p><strong>تمرين تفاعلي: القصّة</strong></p>
<h3 id="الجزء-1">الجزء 1</h3>
</blockquote>
<p>يُرجى كتابة برنامج يواصل سؤال المستخدم عن كلمات. وإذا كتب المستخدم <code>end</code>، فينبغي للبرنامج أن يطبع القصّة التي شكّلتها الكلمات، ثم ينتهي.</p>
<pre><code>Please type in a word: **Once**
Please type in a word: **upon**
Please type in a word: **a**
Please type in a word: **time**
Please type in a word: **there**
Please type in a word: **was**
Please type in a word: **a**
Please type in a word: **girl**
Please type in a word: **end**
Once upon a time there was a girl
</code></pre>
<h3 id="الجزء-2">الجزء 2</h3>
<p>غيّر البرنامج بحيث تنتهي الحلقة أيضًا إذا كتب المستخدم الكلمة نفسها مرتين متتاليتين.</p>
<pre><code>Please type in a word: **It**
Please type in a word: **was**
Please type in a word: **a**
Please type in a word: **dark**
Please type in a word: **and**
Please type in a word: **stormy**
Please type in a word: **night**
Please type in a word: **night**
It was a dark and stormy night
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<blockquote>
<p><strong>تمرين تفاعلي: العمل مع الأعداد</strong></p>
<h3 id="ما-قبل-التمرين">ما قبل التمرين</h3>
</blockquote>
<p>يُرجى كتابة برنامج يطلب من المستخدم أعدادًا صحيحة. وينبغي للبرنامج أن يواصل طلب الأعداد حتى يكتب المستخدم صفرًا.</p>
<pre><code>Please type in integer numbers. Type in 0 to finish.
Number: **5**
Number: **22**
Number: **9**
Number: **-2**
Number: **0**
</code></pre>
<h3 id="الجزء-1-العد">الجزء 1: العدّ</h3>
<p>بعد قراءة الأعداد، ينبغي للبرنامج أن يطبع عدد الأعداد التي كُتبت. ولا ينبغي أن يُحتسب الصفر في النهاية ضمن هذا العدد.</p>
<p>وستحتاج هنا إلى متغيّر جديد يتتبّع الأعداد المكتوبة.</p>
<pre><code>... the program asks for numbers
Numbers typed in 4
</code></pre>
<h3 id="الجزء-2-المجموع">الجزء 2: المجموع</h3>
<p>ينبغي للبرنامج أيضًا أن يطبع مجموع جميع الأعداد التي كُتبت. ولا ينبغي أن يُحتسب الصفر في النهاية ضمن هذه العملية الحسابية.</p>
<p>وينبغي للبرنامج الآن أن يطبع ما يلي:</p>
<pre><code>... the program asks for numbers
Numbers typed in 4
The sum of the numbers is 34
</code></pre>
<h3 id="الجزء-3-المعدل">الجزء 3: المعدّل</h3>
<p>ينبغي للبرنامج أيضًا أن يطبع معدّل الأعداد. ولا ينبغي أن يُحتسب الصفر في النهاية ضمن هذه العملية الحسابية. ويمكنك افتراض أن المستخدم سيكتب دائمًا عددًا صحيحًا صالحًا واحدًا على الأقل لا يساوي صفرًا.</p>
<pre><code>... the program asks for numbers
Numbers typed in 4
The sum of the numbers is 34
The mean of the numbers is 8.5
</code></pre>
<h4>الجزء 4: الموجب والسالب</h4>
<p>ينبغي للبرنامج أيضًا أن يطبع إحصاءات عن كم من الأعداد كانت موجبة وكم منها كانت سالبة. ولا ينبغي أن يُحتسب الصفر في النهاية ضمن هذه العملية الحسابية.</p>
<pre><code>... the program asks for numbers
Numbers typed in 4
The sum of the numbers is 34
The mean of the numbers is 8.5
Positive numbers 3
Negative numbers 1
</code></pre>
<blockquote>
<p><em>ملاحظة: هذا التمرين يتطلب بيئة TMC التفاعلية ولا يعمل في النسخة الثابتة.</em></p>
</blockquote>
<!--

اختبار لمراجعة محتويات هذا القسم:

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 63a51999-e525-5f1d-a333-b26392a5585b)


-->
<p>يُرجى الإجابة على استبيان سريع حول مواد هذا الأسبوع.</p>
<blockquote>
<p><strong>اختبار:</strong> (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 21a09240-92d7-5eb0-bae0-a5f89b5045c2)</p>
</blockquote>
`,l={book:n,chapter:s,chapterTitle:e,slug:a,title:p,headings:t,html:o};export{n as book,s as chapter,e as chapterTitle,l as default,t as headings,o as html,a as slug,p as title};
