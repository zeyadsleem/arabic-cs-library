const n="mooc",s="part-6",e="الجزء 6: الملفات والأخطاء",a="3-errors",p="معالجة الأخطاء",l=[{depth:2,id:"التحقق-من-المدخل",text:"التحقق من المُدخَل"},{depth:2,id:"الاستثناءات",text:"الاستثناءات"},{depth:2,id:"الأخطاء-النموذجية",text:"الأخطاء النموذجية"},{depth:2,id:"التعامل-مع-عدة-استثناءات-دفعة-واحدة",text:"التعامل مع عدة استثناءات دفعة واحدة"},{depth:2,id:"تمرير-الاستثناءات",text:"تمرير الاستثناءات"},{depth:2,id:"رفع-الاستثناءات",text:"رفع الاستثناءات"}],t=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستعرف كيف تتعامل مع المُدخَلات غير الصالحة</li>
<li>ستفهم ما هي الاستثناءات في البرمجة</li>
<li>ستكون على دراية بأنواع الاستثناءات الشائعة في Python</li>
<li>ستكون قادرًا على التعامل مع الاستثناءات في برامجك الخاصة</li>
</ul>
</blockquote>
<p>هناك فئتان أساسيتان من الأخطاء تظهر في سياقات البرمجة:</p>
<ol>
<li>أخطاء الصياغة، التي تمنع تنفيذ البرنامج</li>
<li>أخطاء وقت التشغيل، التي توقف التنفيذ</li>
</ol>
<p>وأخطاء الفئة الأولى عادةً سهلة الإصلاح، لأن مفسِّر Python يحدّد موضع الخطأ عند محاولة تنفيذ البرنامج. ومن أخطاء الصياغة الشائعة نفيان نقطة رأسية في نهاية سطر عنوان، أو نفيان علامة تنصيص في نهاية سلسلة نصية.</p>
<p>أما أخطاء الفئة الثانية فقد يكون اكتشافها أصعب، إذ قد تظهر حصريًا في نقطة معيّنة من تنفيذ البرنامج، وفي ظروف معيّنة فقط. فقد يعمل البرنامج بشكل جيد في معظم المواقف، لكنه يتوقف بسبب خطأ في حالة حدّية بعينها. وسنركّز الآن على التعامل مع هذه الأنواع من الأخطاء.</p>
<h2 id="التحقق-من-المدخل">التحقق من المُدخَل</h2>
<p>كثير من الأخطاء التي تظهر أثناء تنفيذ البرنامج تتعلق بمُدخَل غير صالح. ومن أمثلة ذلك:</p>
<ul>
<li>قيم مُدخَل ناقصة أو فارغة في حقول إلزامية، مثل السلاسل النصية الفارغة حين يكون طول السلسلة النصية حاسمًا</li>
<li>قيم سالبة حيث تُقبَل القيم الموجبة فقط، مثل -15 بوصفها كمية مكوّن في وصفة</li>
<li>ملفات مفقودة أو أخطاء إملائية في أسماء الملفات</li>
<li>قيم صغيرة جدًّا أو كبيرة جدًّا، مثلًا عند التعامل مع التواريخ والأوقات</li>
<li>فهارس غير صالحة، مثل محاولة الوصول إلى الفهرس 3 في السلسلة النصية &quot;hey&quot;</li>
<li>قيم من نوع خاطئ، مثل سلاسل نصية حين يُتوقَّع أعداد صحيحة</li>
</ul>
<p>ولحسن الحظ، يمكننا نحن كمبرمجين الاستعداد لأغلب الأخطاء. فلننظر إلى برنامج يسأل المستخدم عن عمره، ويتأكّد أنه رقم مقبول (بين 0 و150 في هذه الحالة):</p>
<pre><code class="language-python">age = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in your age: &quot;</span>))
<span class="hljs-keyword">if</span> age &gt;= <span class="hljs-number">0</span> <span class="hljs-keyword">and</span> age &lt;= <span class="hljs-number">150</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;That is a fine age&quot;</span>)
<span class="hljs-keyword">else</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;This is not a valid age&quot;</span>)
</code></pre>
<pre><code>Please type in your age: **25**
That is a fine age
</code></pre>
<pre><code>Please type in your age: **-3**
This is not a valid age
</code></pre>
<p>ما دام المستخدم يكتب قيمة صحيحة، فيبدو التحقق من المُدخَل لدينا يعمل جيدًا. لكن ماذا لو كتب سلسلة نصية؟</p>
<pre><code>Please type in your age: **twenty-three**
ValueError: invalid literal for int() with base 10: 'twenty-three'
</code></pre>
<p>الدالة <code>int</code> عاجزة عن تحليل السلسلة النصية <code>twenty-three</code> كقيمة صحيحة صالحة. فيتوقف التنفيذ وتُطبع رسالة الخطأ أعلاه.</p>
<h2 id="الاستثناءات">الاستثناءات</h2>
<p>الأخطاء التي تحدث أثناء قيام البرنامج بالتشغيل بالفعل تُسمّى <em>استثناءات</em> (exceptions). ويمكن الاستعداد لهذه الاستثناءات والتعامل معها بحيث يستمر التنفيذ رغم وقوعها.</p>
<p>ويُنجَز التعامل مع الاستثناءات في Python بجملتَي <code>try</code> و<code>except</code>. والفكرة هي أنه إذا تسبّب شيء ما داخل كتلة <code>try</code> في استثناء، فتتحقق Python من وجود كتلة <code>except</code> مقابلة. وإذا وُجدت كتلة كتلك، فتُنفَّذ ثم يستمر البرنامج كأن شيئًا لم يكن.</p>
<p>لنعدّل المثال أعلاه بحيث يستعد البرنامج لاستثناء <code>ValueError</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">try</span>:
    age = <span class="hljs-built_in">int</span>(<span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in your age: &quot;</span>))
<span class="hljs-keyword">except</span> ValueError:
    age = -<span class="hljs-number">1</span>

<span class="hljs-keyword">if</span> age &gt;= <span class="hljs-number">0</span> <span class="hljs-keyword">and</span> age &lt;= <span class="hljs-number">150</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;That is a fine age&quot;</span>)
<span class="hljs-keyword">else</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;This is not a valid age&quot;</span>)
</code></pre>
<pre><code>Please type in your age: **twenty-three**
This is not a valid age
</code></pre>
<p>ويمكننا استخدام كتلة <code>try</code> للإشارة إلى أن الشيفرة داخلها قد تسبّب في خطأ. وفي جملة <code>except</code> مباشرة بعد الكتلة يُذكر الخطأ المعني. وفي المثال أعلاه اكتفينا بمعالجة استثناء <code>ValueError</code> وحده. ولو كان للاستثناء سبب آخر لتوقّف التنفيذ على أي حال، رغم كتلتَي <code>try</code> و<code>except</code>.</p>
<p>وفي المثال أعلاه، إذا التُقط الخطأ فتُضبط قيمة <code>age</code> إلى -1. وهذه قيمة مُدخَل غير صالحة قد برمجنا سلوكًا مسبقًا لها، لأن البرنامج يتوقّع أن يكون عمر المستخدم أكبر من 0.</p>
<p>وفي المثال التالي لدينا الدالة <code>read_integer</code>، التي تطلب من المستخدم كتابة قيمة صحيحة، لكن الدالة مستعدة أيضًا للمُدخَل غير الصالح. وتظل الدالة تطلب أعدادًا صحيحة حتى يكتب المستخدم قيمة مُدخَل صالحة.</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">read_integer</span>():
    <span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
        <span class="hljs-keyword">try</span>:
            input_str = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in an integer: &quot;</span>)
            <span class="hljs-keyword">return</span> <span class="hljs-built_in">int</span>(input_str)
        <span class="hljs-keyword">except</span> ValueError:
            <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;This input is invalid&quot;</span>)

number = read_integer()
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Thank you!&quot;</span>)
<span class="hljs-built_in">print</span>(number, <span class="hljs-string">&quot;to the power of three is&quot;</span>, number**<span class="hljs-number">3</span>)
</code></pre>
<pre><code>Please type in an integer: **three**
This input is invalid
Please type in an integer: **aybabtu**
This input is invalid
Please type in an integer: **5**
Thank you!
5 to the power of three is 125
</code></pre>
<p>وقد يكفي أحيانًا التقاط الاستثناءات ببنية المحاولة/الالتقاط (try-except) دون فعل أي شيء حيالها. أي يكفي أن نتجاهل الموقف في كتلة <code>except</code>.</p>
<p>ولو غيّرنا المثال أعلاه بحيث لا نقبل إلا الأعداد الصحيحة الأصغر من 100، لبَدَت النتائج هكذا:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">read_small_integer</span>():
    <span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
        <span class="hljs-keyword">try</span>:
            input_str = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in an integer: &quot;</span>)
            number = <span class="hljs-built_in">int</span>(input_str)
            <span class="hljs-keyword">if</span> number &lt; <span class="hljs-number">100</span>:
                <span class="hljs-keyword">return</span> number
        <span class="hljs-keyword">except</span> ValueError:
            <span class="hljs-keyword">pass</span> <span class="hljs-comment"># this command doesn&#x27;t actually do anything</span>

        <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;This input is invalid&quot;</span>)

number = read_small_integer()
<span class="hljs-built_in">print</span>(number, <span class="hljs-string">&quot;to the power of three is&quot;</span>, number**<span class="hljs-number">3</span>)
</code></pre>
<pre><code>Please type in an integer: **three**
This input is invalid
Please type in an integer: **1000**
This input is invalid
Please type in an integer: **5**
Thank you!
5 to the power of three is 125
</code></pre>
<p>والآن لا تحوي كتلة <code>except</code> سوى الأمر <code>pass</code>، الذي لا يفعل شيئًا. ولا تسمح Python بالكتل الفارغة، لذا يكون الأمر ضروريًا.</p>
<blockquote>
<p><strong>تمرين برمجي: قراءة المُدخَل</strong></p>
<p>يُرجى كتابة دالة اسمها <code>read_input</code>، تطلب من المستخدم المُدخَل حتى يكتب عددًا صحيحيًا واقعًا ضمن الحدود المُعطاة في وسائط الدالة. ويجب أن تُعيد الدالة القيمة الصحيحة الصالحة النهائية التي كتبها المستخدم.</p>
</blockquote>
<p>ومثال على عمل الدالة:</p>
<pre><code class="language-python">number = read_input(<span class="hljs-string">&quot;Please type in a number: &quot;</span>, <span class="hljs-number">5</span>, <span class="hljs-number">10</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;You typed in:&quot;</span>, number)
</code></pre>
<pre><code>Please type in a number: **seven**
You must type in an integer between 5 and 10
Please type in a number: **-3**
You must type in an integer between 5 and 10
Please type in a number: **8**
You typed in: 8
</code></pre>
<h2 id="الأخطاء-النموذجية">الأخطاء النموذجية</h2>
<p>فيما يلي مختارات من الأخطاء النموذجية التي ستصادفها على الأرجح، مع بعض المواقف التي قد تظهر فيها.</p>
<p><strong>ValueError</strong></p>
<p>وغالبًا ما يُرفع هذا الخطأ حين يكون الوسيط الممرَّر إلى الدالة غير صالح بطريقة ما. فمثلًا، استدعاء الدالة <code>float(&quot;1,23&quot;)</code> يسبّب خطأ، لأن الكسور العشرية تُفصل دائمًا بنقطة في Python، وهنا لدينا فاصلة.</p>
<p><strong>TypeError</strong></p>
<p>يحدث هذا الخطأ حين تكون القيمة من نوع خاطئ. فمثلًا، استدعاء الدالة <code>len(10)</code> يسبّب <code>TypeError</code>، لأن الدالة <code>len</code> تتطلب قيمة يمكن حساب طولها، مثل سلسلة نصية أو قائمة.</p>
<p><strong>IndexError</strong></p>
<p>يحدث هذا الخطأ الشائع عند محاولة الإشارة إلى فهرس غير موجود. فمثلًا، التعبير <code>&quot;abc&quot;[5]</code> يسبّب <code>IndexError</code>، لأن السلسلة النصية المعنية لا فهرس 5 لها.</p>
<p><strong>ZeroDivisionError</strong></p>
<p>وكما يوحي الاسم، يُرفع هذا الخطأ عند محاولة القسمة على صفر، وهو كما نعلم من الرياضيات فكرة سيئة دائمًا. فمثلًا، لو حاولنا تحديد المتوسط الحسابي لقيم في قائمة بالصيغة <code>sum(my_list) / len(my_list)</code>، لكن قائمتنا طولها صفر، فسيحدث هذا الخطأ.</p>
<p><strong>استثناءات في التعامل مع الملفات</strong></p>
<p>ومن الأخطاء الشائعة عند العمل مع الملفات <strong>FileNotFoundError</strong> (عند محاولة الوصول إلى ملف غير موجود)، و<strong>io.UnsupportedOperation</strong> (عند محاولة تنفيذ عملية على ملف لا يدعمها الوضع الذي فُتح به الملف)، أو <strong>PermissionError</strong> (ينقص البرنامج الأذونات اللازمة للوصول إلى الملف).</p>
<h2 id="التعامل-مع-عدة-استثناءات-دفعة-واحدة">التعامل مع عدة استثناءات دفعة واحدة</h2>
<p>قد تكون هناك أكثر من كتلة <code>except</code> مرفقة بكل كتلة <code>try</code>. فمثلًا، يستطيع البرنامج التالي التعامل مع كلا الخطأين <code>FileNotFoundException</code> و<code>PermissionError</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">try</span>:
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(<span class="hljs-string">&quot;example.txt&quot;</span>) <span class="hljs-keyword">as</span> my_file:
        <span class="hljs-keyword">for</span> line <span class="hljs-keyword">in</span> my_file:
            <span class="hljs-built_in">print</span>(line)
<span class="hljs-keyword">except</span> FileNotFoundError:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The file example.txt was not found&quot;</span>)
<span class="hljs-keyword">except</span> PermissionError:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;No permission to access the file example.txt&quot;</span>)
</code></pre>
<p>وقد لا يلزم أحيانًا تحديد الخطأ الذي يستعد له البرنامج. ولا سيما عند التعامل مع الملفات، فغالبًا ما يكفي معرفة أن خطأً قد حدث، ثم الخروج من البرنامج بأمان. وليس من الضروري دائمًا معرفة <em>سبب</em> حدوث الخطأ. وإذا احتجنا تغطية جميع الاستثناءات الممكنة، فيمكننا استخدام كتلة <code>except</code> دون تحديد الخطأ:</p>
<pre><code class="language-python">
<span class="hljs-keyword">try</span>:
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(<span class="hljs-string">&quot;example.txt&quot;</span>) <span class="hljs-keyword">as</span> my_file:
        <span class="hljs-keyword">for</span> line <span class="hljs-keyword">in</span> my_file:
            <span class="hljs-built_in">print</span>(line)
<span class="hljs-keyword">except</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;There was an error when reading the file.&quot;</span>)

</code></pre>
<p>ملاحظة: تغطي جملة <code>except</code> هنا جميع الأخطاء الممكنة، حتى تلك الناتجة عن أخطاء البرمجة نفسها. أما أخطاء الصياغة وحدها فلن تُلتقط بهذه الطريقة، لأنها تمنع الشيفرة من التنفيذ أصلًا.</p>
<p>فمثلًا، سيرفع البرنامج التالي خطأً دائمًا، لأن اسم المتغيّر <code>my_file</code> كُتب في السطر الثالث بوصفه <code>myfile</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">try</span>:
    <span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(<span class="hljs-string">&quot;example.txt&quot;</span>) <span class="hljs-keyword">as</span> my_file:
        <span class="hljs-keyword">for</span> line <span class="hljs-keyword">in</span> myfile:
            <span class="hljs-built_in">print</span>(line)
<span class="hljs-keyword">except</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;There was an error when reading the file.&quot;</span>)
</code></pre>
<p>وقد تخفي كتلة <code>except</code> الخطأ الحقيقي: فالمشكلة هنا لم تُسبَّب بالتعامل مع الملفات بحد ذاته، بل باسم المتغيّر المكتوب خطأً. ولو لا كتلة <code>except</code> لعرض الخطأ المُرفَع وصار من الأسهل العثور على سببه. ولهذا يكون من الجيد عادةً استخدام كتل <code>except</code> المُصرَّح بها خصيصًا لأنواع أخطاء معيّنة.</p>
<h2 id="تمرير-الاستثناءات">تمرير الاستثناءات</h2>
<p>وإذا تسبّب تنفيذ دالة في استثناء ولم يُتعامل معه، فإنه يُمرَّر إلى قسم الشيفرة الذي استدعى الدالة، ثم يصعد في سلسلة الاستدعاءات حتى يصل إلى مستوى الدالة الرئيسية. وإذا لم يُتعامل معه هناك أيضًا، توقف تنفيذ البرنامج، ويُطبع الاستثناء عادةً ليراه المستخدم.</p>
<p>وفي المثال التالي لدينا الدالة <code>testing</code>. وإذا تسبّبت في استثناء، فلم يُتعامل معه داخل الدالة ذاتها، بل في الدالة الرئيسية:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">testing</span>(<span class="hljs-params">x</span>):
    <span class="hljs-built_in">print</span>(<span class="hljs-built_in">int</span>(x) + <span class="hljs-number">1</span>)

<span class="hljs-keyword">try</span>:
    number = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a number: &quot;</span>)
    testing(number)
<span class="hljs-keyword">except</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Something went wrong&quot;</span>)
</code></pre>
<pre><code>Please type in a number: **three**
Something went wrong
</code></pre>
<h2 id="رفع-الاستثناءات">رفع الاستثناءات <span class="content-anchor" id="raising-exceptions"></span></h2>
<p>يمكنك أيضًا رفع الاستثناءات بالأمر <code>raise</code>. وقد تبدو فكرة غريبة تعمّد إحداث أخطاء في برامجك، لكنه قد يكون في الواقع آلية مفيدة جدًّا.</p>
<p>فمثلًا، قد يكون من الجيد أحيانًا رفع خطأ عند اكتشاف معاملات غير صالحة. وحتى الآن طبعنا رسائل عادةً عند التحقق من المُدخَل، لكن إذا كنا نكتب دالة تُنفَّذ من مكان آخر، فإن مجرد طباعة شيء ما قد يمرّ دون انتباه عند استدعاء الدالة. ورفع الخطأ يمكن أن يجعل اكتشاف الأخطاء (debugging) أسهل.</p>
<p>وفي المثال التالي لدينا دالة تحسب المضروب (factorial) (مثلًا، مضروب العدد 5 هو 1 * 2 * 3 * 4 * 5). وإذا كان الوسيط الممرَّر إلى الدالة سالبًا، فترفع الدالة خطأً:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">factorial</span>(<span class="hljs-params">n</span>):
    <span class="hljs-keyword">if</span> n &lt; <span class="hljs-number">0</span>:
        <span class="hljs-keyword">raise</span> ValueError(<span class="hljs-string">&quot;The input was negative: &quot;</span> + <span class="hljs-built_in">str</span>(n))
    k = <span class="hljs-number">1</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">2</span>, n + <span class="hljs-number">1</span>):
        k *= i
    <span class="hljs-keyword">return</span> k

<span class="hljs-built_in">print</span>(factorial(<span class="hljs-number">3</span>))
<span class="hljs-built_in">print</span>(factorial(<span class="hljs-number">6</span>))
<span class="hljs-built_in">print</span>(factorial(-<span class="hljs-number">1</span>))
</code></pre>
<pre><code>6
720
Traceback (most recent call last):
  File &quot;test.py&quot;, line 11, in &lt;module&gt;
    print(factorial(-1))
  File &quot;test.py&quot;, line 3, in factorial
    raise ValueError(&quot;The input was negative: &quot; + str(n))
ValueError: The input was negative: -1
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: التحقّق من المعاملات</strong></p>
<p>يُرجى كتابة دالة اسمها <code>new_person(name: str, age: int)</code>، تنشئ صفًّا يحوي البيانات في الوسائط وتعيده. ويجب أن يكون العنصر الأول هو الاسم والثاني هو العمر.</p>
</blockquote>
<p>وإذا كانت القيم المخزّنة في متغيّرات المعاملات غير صالحة، فترفع الدالة استثناء <code>ValueError</code>.</p>
<p>ومن المعاملات غير الصالحة في هذه الحالة:</p>
<ul>
<li>الاسم سلسلة نصية فارغة</li>
<li>الاسم يحوي أقل من كلمتين</li>
<li>الاسم أطول من 40 محرفًا</li>
<li>العمر رقم سالب</li>
<li>العمر أكبر من 150</li>
</ul>
<blockquote>
<p><strong>تمرين برمجي: أعداد يانصيب غير صحيحة</strong></p>
<p>يحتوي الملف <code>lottery_numbers.csv</code> على أرقام اليانصيب الفائزة بالصيغة التالية:</p>
</blockquote>
<pre><code>week 1;5,7,11,13,23,24,30
week 2;9,13,14,24,34,35,37
...etc...
</code></pre>
<p>ويجب أن يحوي كل سطر ترويسة <code>week x</code>، يتبعها سبعة أعداد صحيحة كلها بين 1 و39 شاملًا الطرفين.</p>
<p>لقد فسد الملف. وقد تحتوي سطور الملف على أنواع الأخطاء التالية (قد لا توجد هذه السطور بالضبط في الملف، لكن ستوجد أخطاء بصيغة مماثلة):</p>
<p>رقم الأسبوع غير صحيح:</p>
<pre><code>week zzc;1,5,13,22,24,25,26
</code></pre>
<p>واحد أو أكثر من الأرقام غير صحيحة:</p>
<pre><code>week 22;1,**,5,6,13,2b,34
</code></pre>
<p>الأرقام قليلة جدًّا:</p>
<pre><code>week 13;4,6,17,19,24,33
</code></pre>
<p>الأرقام صغيرة جدًّا أو كبيرة جدًّا:</p>
<pre><code>week 39;5,9,15,35,39,41,105
</code></pre>
<p>يظهر الرقم نفسه مرتين:</p>
<pre><code>week 41;5,12,3,35,12,14,36
</code></pre>
<p>يُرجى كتابة دالة اسمها <code>filter_incorrect()</code>، تنشئ ملفًا اسمه <code>correct_numbers.csv</code>. ويجب أن يحوي الملف تلك السطور فقط من الملف الأصلي التي تكون بصيغة صحيحة.</p>
<!---
اختبار لمراجعة محتويات هذا القسم:

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 69694e01-4c47-5b9d-8a00-b0d96a477dc7)

-->
`,o={book:n,chapter:s,chapterTitle:e,slug:a,title:p,headings:l,html:t};export{n as book,s as chapter,e as chapterTitle,o as default,l as headings,t as html,a as slug,p as title};
