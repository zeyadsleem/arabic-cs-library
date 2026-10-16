const s="mooc",n="part-9",a="الجزء 9: المزيد عن الكائنات",l="1-objects-and-references",e="الكائنات والمراجع",p=[{depth:2,id:"هل-نستخدم-self-أم-لا",text:"هل نستخدم self أم لا؟"},{depth:2,id:"الكائنات-بوصفها-أوسيطا-للدوال",text:"الكائنات بوصفها أوسيطًا للدوال"},{depth:2,id:"الكائنات-بوصفها-أوسيطا-للتوابع",text:"الكائنات بوصفها أوسيطًا للتوابع"},{depth:2,id:"وزن-الأشخاص",text:"وزن الأشخاص"},{depth:2,id:"الإطعام",text:"الإطعام"},{depth:2,id:"عد-عمليات-الوزن",text:"عدّ عمليات الوزن"},{depth:2,id:"نسخة-أبسط-من-lunchcard",text:"نسخة أبسط من LunchCard"},{depth:2,id:"طرفية-الدفع-والتعامل-مع-المدفوعات-النقدية",text:"طرفية الدفع والتعامل مع المدفوعات النقدية"},{depth:2,id:"التعامل-مع-معاملات-البطاقة",text:"التعامل مع معاملات البطاقة"},{depth:2,id:"إيداع-المال-في-البطاقة",text:"إيداع المال في البطاقة"},{depth:2,id:"نسخة-من-الصنف-نفسه-بوصفها-وسيطا-للتابع",text:"نسخة من الصنف نفسه بوصفها وسيطًا للتابع"},{depth:2,id:"هل-هو-أكبر",text:"هل هو أكبر؟"},{depth:2,id:"فرق-السعر",text:"فرق السعر"},{depth:2,id:"هل-هو-أغلى-ثمنا",text:"هل هو أغلى ثمنًا؟"}],t=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستكون قادرًا على استخدام هياكل بيانات مختلفة للتعامل مع الكائنات</li>
<li>ستعرف كيف يمكن تمرير الكائنات بوصفها أوسيطًا</li>
</ul>
</blockquote>
<p>كل قيمة في Python هي كائن. فأي كائن تنشئه بناءً على صنف (class) حدّدته بنفسك يعمل تمامًا مثل أي كائن «عادي» من Python. وعلى سبيل المثال، يمكن تخزين الكائنات في قائمة:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> datetime <span class="hljs-keyword">import</span> date

<span class="hljs-keyword">class</span> <span class="hljs-title class_">CompletedCourse</span>:

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, course_name: <span class="hljs-built_in">str</span>, credits: <span class="hljs-built_in">int</span>, completion_date: date</span>):
        <span class="hljs-variable language_">self</span>.name = course_name
        <span class="hljs-variable language_">self</span>.credits = credits
        <span class="hljs-variable language_">self</span>.completion_date = completion_date


<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    <span class="hljs-comment"># Here we create some completed courses and add these to a list </span>
    completed = []

    maths1 = CompletedCourse(<span class="hljs-string">&quot;Mathematics 1&quot;</span>, <span class="hljs-number">5</span>, date(<span class="hljs-number">2020</span>, <span class="hljs-number">3</span>, <span class="hljs-number">11</span>))
    prog1 = CompletedCourse(<span class="hljs-string">&quot;Programming 1&quot;</span>, <span class="hljs-number">6</span>, date(<span class="hljs-number">2019</span>, <span class="hljs-number">12</span>, <span class="hljs-number">17</span>))

    completed.append(maths1)
    completed.append(prog1)

    <span class="hljs-comment"># Let&#x27;s add a couple more straight to the list</span>
    completed.append(CompletedCourse(<span class="hljs-string">&quot;Physics 2&quot;</span>, <span class="hljs-number">4</span>, date(<span class="hljs-number">2019</span>, <span class="hljs-number">11</span>, <span class="hljs-number">10</span>)))
    completed.append(CompletedCourse(<span class="hljs-string">&quot;Programming 2&quot;</span>, <span class="hljs-number">5</span>, date(<span class="hljs-number">2020</span>, <span class="hljs-number">5</span>, <span class="hljs-number">19</span>)))

    <span class="hljs-comment"># Go through all the completed courses, print out their names </span>
    <span class="hljs-comment"># and sum up the credits received</span>
    credits = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> course <span class="hljs-keyword">in</span> completed:
        <span class="hljs-built_in">print</span>(course.name)
        credits += course.credits

    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Total credits received:&quot;</span>, credits)
</code></pre>
<pre><code>Mathematics 1
Programming 1
Physics 2
Programming 2
Total credits received: 20
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: أسرع سيارة</strong></p>
<p>يحتوي قالب التمرين على صنف اسمه <code>Car</code> يمثّل ملامح السيارة بوساطة خاصيتين: <code>make (str)</code> و<code>top_speed (int)</code>.</p>
</blockquote>
<p>يُرجى كتابة دالة اسمها <code>fastest_car(cars: list)</code> تأخذ قائمة من كائنات <code>Car</code> بوصفها وسيطًا لها.</p>
<p>يجب أن تُرجع الدالة العلامة المصنّعة للسيارة الأسرع. يمكنك افتراض أنه سيكون هناك دائمًا سيارة واحدة ذات أعلى سرعة قصوى. لا تغيّر القائمة المُعطاة بوصفها وسيطًا، ولا تُجرِ أي تعريف على تعريف الصنف <code>Car</code>.</p>
<p>يمكنك استخدام الشيفرة التالية لاختبار دالتك:</p>
<pre><code class="language-python"><span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    car1 = Car(<span class="hljs-string">&quot;Saab&quot;</span>, <span class="hljs-number">195</span>)
    car2 = Car(<span class="hljs-string">&quot;Lada&quot;</span>, <span class="hljs-number">110</span>)
    car3 = Car(<span class="hljs-string">&quot;Ferrari&quot;</span>, <span class="hljs-number">280</span>)
    car4 = Car(<span class="hljs-string">&quot;Trabant&quot;</span>, <span class="hljs-number">85</span>)

    cars = [car1, car2, car3, car4]
    <span class="hljs-built_in">print</span>(fastest_car(cars))
</code></pre>
<pre><code>Ferrari
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: الإرسالات الناجحة</strong></p>
<p>يحتوي قالب التمرين على صنف اسمه <code>ExamSubmission</code> الذي، كما يوحي اسمه، يمثّل تقديم مترشح في امتحان. وقد عُرِّفت في الصنف خاصيتان: <code>examinee (str)</code> و<code>points (int)</code>.</p>
</blockquote>
<p>يُرجى كتابة دالة اسمها <code>passed(submissions: list, lowest_passing: int)</code> تأخذ قائمة من متقدمات الامتحان وعددًا صحيحًا يمثّل أدنى درجة نجاح بوصفهما وسيطين لها.</p>
<p>يجب أن تنشئ الدالة قائمة جديدة وتُرجعها، تتضمّن فقط المتقدمين الناجحين من القائمة الأصلية. يُرجى عدم تغيير القائمة المُعطاة بوصفها وسيطًا، وعدم إجراء أي تعريف على تعريف الصنف <code>ExamSubmission</code>.</p>
<p>يمكنك استخدام الشيفرة التالية لاختبار دالتك:</p>
<pre><code class="language-python"><span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    s1 = ExamSubmission(<span class="hljs-string">&quot;Peter&quot;</span>, <span class="hljs-number">12</span>)
    s2 = ExamSubmission(<span class="hljs-string">&quot;Pippa&quot;</span>, <span class="hljs-number">19</span>)
    s3 = ExamSubmission(<span class="hljs-string">&quot;Paul&quot;</span>, <span class="hljs-number">15</span>)
    s4 = ExamSubmission(<span class="hljs-string">&quot;Phoebe&quot;</span>, <span class="hljs-number">9</span>)
    s5 = ExamSubmission(<span class="hljs-string">&quot;Persephone&quot;</span>, <span class="hljs-number">17</span>)

    passes = passed([s1, s2, s3, s4, s5], <span class="hljs-number">15</span>)
    <span class="hljs-keyword">for</span> passing <span class="hljs-keyword">in</span> passes:
        <span class="hljs-built_in">print</span>(passing)
</code></pre>
<pre><code>ExamSubmission (examinee: Pippa, points: 19)
ExamSubmission (examinee: Paul, points: 15)
ExamSubmission (examinee: Persephone, points: 17)
</code></pre>
<p>قد تتذكّر أن القوائم لا تحتوي على أي كائنات بحد ذاتها، بل تحتوي على <em>مراجع إلى الكائنات</em>. ويمكن أن يظهر الكائن نفسه مرات عديدة في قائمة واحدة، كما يمكن الإشارة إليه مرات عديدة داخل القائمة أو خارجها. لننظر إلى مثال:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Product</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, unit: <span class="hljs-built_in">str</span></span>):
        <span class="hljs-variable language_">self</span>.name = name
        <span class="hljs-variable language_">self</span>.unit = unit


<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    shopping_list = []
    milk = Product(<span class="hljs-string">&quot;Milk&quot;</span>, <span class="hljs-string">&quot;litre&quot;</span>)

    shopping_list.append(milk)
    shopping_list.append(milk)
    shopping_list.append(Product(<span class="hljs-string">&quot;Cucumber&quot;</span>, <span class="hljs-string">&quot;piece&quot;</span>))
</code></pre>
<p><img src="/arabic-cs-library/images/mooc/part-9/9_1_1.png" alt="9_1_1.png"></p>
<p>إذا كان هناك أكثر من مرجع واحد إلى الكائن نفسه، فلا يُحدث فرقًا أيّ المراجع يُستخدَم:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Dog</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name</span>):
        <span class="hljs-variable language_">self</span>.name = name

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__str__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.name

dogs = []
fluffy = Dog(<span class="hljs-string">&quot;Fluffy&quot;</span>)
dogs.append(fluffy)
dogs.append(fluffy)
dogs.append(Dog(<span class="hljs-string">&quot;Fluffy&quot;</span>))

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Dogs initially:&quot;</span>)
<span class="hljs-keyword">for</span> dog <span class="hljs-keyword">in</span> dogs:
    <span class="hljs-built_in">print</span>(dog)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The dog at index 0 is renamed:&quot;</span>)
dogs[<span class="hljs-number">0</span>].name = <span class="hljs-string">&quot;Pooch&quot;</span>
<span class="hljs-keyword">for</span> dog <span class="hljs-keyword">in</span> dogs:
    <span class="hljs-built_in">print</span>(dog)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The dog at index 2 is renamed:&quot;</span>)
dogs[<span class="hljs-number">2</span>].name = <span class="hljs-string">&quot;Fifi&quot;</span>
<span class="hljs-keyword">for</span> dog <span class="hljs-keyword">in</span> dogs:
    <span class="hljs-built_in">print</span>(dog)
</code></pre>
<pre><code>Dogs initially:
Fluffy
Fluffy
Fluffy
The dog at index 0 is renamed:
Pooch
Pooch
Fluffy
The dog at index 2 is renamed:
Pooch
Pooch
Fifi
</code></pre>
<p>تشير المراجع في الفهرسين 0 و1 في القائمة إلى الكائن نفسه. ويمكن استخدام أيّ من المراجع للوصول إلى الكائن. أما المرجع في الفهرس 2 فيشير إلى كائن مختلف، وإن كان محتواه يبدو مطابقًا. وتغيير محتويات هذا الكائن الأخير لا يؤثر في الآخر.</p>
<p>يُستخدَم المشغّل <code>is</code> للتحقق مما إذا كان المرجعان يشيران إلى الكائن نفسه تمامًا، بينما يخبرك المشغّل <code>==</code> بما إذا كانت محتويات الكائنين متطابقة. وليوضح المثال التالي الفرق:</p>
<pre><code class="language-python">list1 = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]
list2 = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>]
list3 = list1

<span class="hljs-built_in">print</span>(list1 <span class="hljs-keyword">is</span> list2)
<span class="hljs-built_in">print</span>(list1 <span class="hljs-keyword">is</span> list3)
<span class="hljs-built_in">print</span>(list2 <span class="hljs-keyword">is</span> list3)

<span class="hljs-built_in">print</span>()

<span class="hljs-built_in">print</span>(list1 == list2)
<span class="hljs-built_in">print</span>(list1 == list3)
<span class="hljs-built_in">print</span>(list2 == list3)
</code></pre>
<pre><code>False
True
False

True
True
True
</code></pre>
<p>يمكن أيضًا تخزين أي كائن من Python في قاموس أو أي هيكل بيانات آخر. وينطبق هذا أيضًا على الكائنات المنشأة بناءً على صنف حدّدته بنفسك.</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Student</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, cr: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-variable language_">self</span>.name = name
        <span class="hljs-variable language_">self</span>.cr = cr

<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    <span class="hljs-comment"># The key in this dictionary is the student number, </span>
    <span class="hljs-comment"># and the value is an object of type Student</span>
    students = {}
    students[<span class="hljs-string">&quot;12345&quot;</span>] = Student(<span class="hljs-string">&quot;Saul Student&quot;</span>, <span class="hljs-number">10</span>)
    students[<span class="hljs-string">&quot;54321&quot;</span>] = Student(<span class="hljs-string">&quot;Sally Student&quot;</span>, <span class="hljs-number">67</span>)
</code></pre>
<p>يمكن لأداة <a href="http://www.pythontutor.com/visualize.html#mode=edit">التصوّر</a> أن تساعدك على فهم المثال أعلاه:</p>
<p><img src="/arabic-cs-library/images/mooc/part-9/9_1_2.png" alt="9_1_2.png"></p>
<h2 id="هل-نستخدم-self-أم-لا">هل نستخدم self أم لا؟</h2>
<p>حتى الآن لم نمس سوى السطح من استخدام اسم المعامل <code>self</code>. لننظر مليًّا في متى ينبغي استخدامه ومتى لا ينبغي.</p>
<p>فيما يلي صنف بسيط يتيح لنا إنشاء كائن مفردات يحتوي على بعض الكلمات:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Vocabulary</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>.words = []

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">add_word</span>(<span class="hljs-params">self, word: <span class="hljs-built_in">str</span></span>):
        <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> word <span class="hljs-keyword">in</span> <span class="hljs-variable language_">self</span>.words:
            <span class="hljs-variable language_">self</span>.words.append(word)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">print_vocabulary</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">for</span> word <span class="hljs-keyword">in</span> <span class="hljs-built_in">sorted</span>(<span class="hljs-variable language_">self</span>.words):
            <span class="hljs-built_in">print</span>(word)

vocab = Vocabulary()
vocab.add_word(<span class="hljs-string">&quot;python&quot;</span>)
vocab.add_word(<span class="hljs-string">&quot;object&quot;</span>)
vocab.add_word(<span class="hljs-string">&quot;object-oriented programming&quot;</span>)
vocab.add_word(<span class="hljs-string">&quot;object&quot;</span>)
vocab.add_word(<span class="hljs-string">&quot;nerd&quot;</span>)

vocab.print_vocabulary()
</code></pre>
<pre><code>nerd
object
object-oriented programming
python
</code></pre>
<p>تُخزَّن قائمة الكلمات في خاصية اسمها <code>self.words</code>. وفي هذه الحالة يُعدّ اسم المعامل <code>self</code> إلزاميًا في تابع الإنشاء الخاص بالصنف وفي أي تابع آخر يصل إلى ذلك المتغيّر. وإذا حُذف <code>self</code>، فلن تصل التوابع المختلفة إلى قائمة الكلمات نفسها.</p>
<p>لنُضِف تابعًا جديدًا إلى تعريف صنفنا. يُرجع التابع <code>longest_word(self)</code> أطول الكلمات في المفردات (أو إحداها).</p>
<p>ما يلي إحدى طرق إنجاز هذه المهمّة، لكننا سنرى قريبًا أنها ليست طريقًا جيّدًا:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Vocabulary</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>.words = []

    <span class="hljs-comment"># ...</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">longest_word</span>(<span class="hljs-params">self</span>):
        <span class="hljs-comment"># define two helper variables</span>
        <span class="hljs-variable language_">self</span>.longest = <span class="hljs-string">&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>.length_of_longest = <span class="hljs-number">0</span>

        <span class="hljs-keyword">for</span> word <span class="hljs-keyword">in</span> <span class="hljs-variable language_">self</span>.words:
            <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(word) &gt; <span class="hljs-variable language_">self</span>.length_of_longest:
                <span class="hljs-variable language_">self</span>.length_of_longest = <span class="hljs-built_in">len</span>(word)
                <span class="hljs-variable language_">self</span>.longest = word

        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.longest
</code></pre>
<p>يستخدم هذا التابع متغيّرين مساعدين مُعلَنين باسم المعامل <code>self</code>. تذكّر أن أسماء المتغيّرات لا تهمّ من الناحية الوظيفية، لذا يمكن تسمية هذين المتغيّرين أيضًا تسمية أكثر إرباكًا، مثل <code>helper</code> و<code>helper2</code> مثلًا. وتصبح الشيفرة أشبه بالغامضة:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Vocabulary</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>.words = []

    <span class="hljs-comment"># ...</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">longest_word</span>(<span class="hljs-params">self</span>):
        <span class="hljs-comment"># define two helper variables</span>
        <span class="hljs-variable language_">self</span>.helper = <span class="hljs-string">&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>.helper2 = <span class="hljs-number">0</span>

        <span class="hljs-keyword">for</span> word <span class="hljs-keyword">in</span> <span class="hljs-variable language_">self</span>.words:
            <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(word) &gt; <span class="hljs-variable language_">self</span>.helper2:
                <span class="hljs-variable language_">self</span>.helper2 = <span class="hljs-built_in">len</span>(word)
                <span class="hljs-variable language_">self</span>.helper = word

        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.helper
</code></pre>
<p>عندما يُعلَن متغيّر باسم المعامل <code>self</code>، يصبح خاصية للكائن. وهذا يعني أن المتغيّر سيستمر في الوجود ما دام الكائن موجودًا. وتحديدًا، سيستمر المتغيّر في الوجود أيضًا بعد أن يُنهي التابع المعلِن له تنفيذه. وفي المثال أعلاه هذا غير ضروري إطلاقًا، لأن المتغيّرين المساعدين مخصّصان للاستخدام فقط داخل التابع <code>longest_word(self)</code>. وإذًا، فإن إعلان المتغيّرات المساعدة باسم المعامل <code>self</code> ليس فكرة جيّدة هنا.</p>
<p>إضافةً إلى إبقاء المتغيّرات في الوجود بعد «تاريخ انتهاء صلاحيتها»، فإن استخدام <code>self</code> لإنشاء خصائص جديدة حيث لا حاجة إليها قد يسبّب أخطاءً صعبة في شيفرتك. وخاصة الخصائص ذات الأسماء العامة مثل <code>self.helper</code>، التي تُستخدَم بعد ذلك في توابع مختلفة متنوعة، إذ قد تسبّب سلوكًا غير متوقّع يصعب تتبعه.</p>
<p>مثلًا، إذا أُعلِن متغيّر مساعد بوصفه خاصية وأُسندت إليه قيمة أوّلية في تابع الإنشاء، ثم استُخدَم ذلك المتغيّر في سياق غير متعلق به في تابع آخر، فتكون النتائج غالبًا غير متوقّعة:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Vocabulary</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>.words = []
        <span class="hljs-comment"># define helper variables</span>
        <span class="hljs-variable language_">self</span>.helper = <span class="hljs-string">&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>.helper2 = <span class="hljs-string">&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>.helper3 = <span class="hljs-string">&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>.helper4 = <span class="hljs-string">&quot;&quot;</span>

    <span class="hljs-comment"># ...</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">longest_word</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">for</span> word <span class="hljs-keyword">in</span> <span class="hljs-variable language_">self</span>.words:
            <span class="hljs-comment"># above the helper variables were all assigned string values</span>
            <span class="hljs-comment"># the following will not work because the type of helper2 is wrong</span>
            <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(word) &gt; <span class="hljs-variable language_">self</span>.helper2:
                <span class="hljs-variable language_">self</span>.helper2 = <span class="hljs-built_in">len</span>(word)
                <span class="hljs-variable language_">self</span>.helper = word

        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.helper
</code></pre>
<p>قد تظن أن هذه المسألة تُحلّ بمجرد إعلان الخصائص حيث تُستخدَم، <em>خارج</em> تابع الإنشاء، لكن ذلك يُفضي إلى حالة تكون فيها الخصائص المتاحة عبر الكائن معتمدة على <em>التوابع التي نُفِّذت</em>. وفي الجزء السابق رأينا أن ميزة إعلان الخصائص في تابع الإنشاء هي أن جميع نسخ الصنف (instances) ستملك الخصائص ذاتها تمامًا. وإذا لم يكن هذا هو الحال، فإن استخدام نسخ مختلفة من الصنف يمكن أن يُفضي بسهولة إلى أخطاء.</p>
<p>وخلاصةً، إذا احتجت إلى متغيّرات مساعدة لاستخدامها داخل تابع واحد، فالطريقة الصحيحة لذلك هي <em>بدون</em> <code>self</code>. ولكي تجعل شيفرتك أسهل على الفهم، استخدم أيضًا أسماء متغيّرات دلّالة:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Vocabulary</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>.words = []

    <span class="hljs-comment"># ...</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">longest_word</span>(<span class="hljs-params">self</span>):
        <span class="hljs-comment"># the correct way of declaring helper variables </span>
        <span class="hljs-comment"># for use within a single method</span>
        longest = <span class="hljs-string">&quot;&quot;</span>
        length_of_longest = <span class="hljs-number">0</span>

        <span class="hljs-keyword">for</span> word <span class="hljs-keyword">in</span> <span class="hljs-variable language_">self</span>.words:
            <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(word) &gt; length_of_longest:
                length_of_longest = <span class="hljs-built_in">len</span>(word)
                longest = word

        <span class="hljs-keyword">return</span> longest
</code></pre>
<p>في التنفيذ أعلاه لا يمكن الوصول إلى المتغيّرات المساعدة إلا أثناء تنفيذ التابع. والقيم المخزّنة فيها لا يمكن أن تسبّب تعقيدات في أجزاء أخرى من البرنامج.</p>
<h2 id="الكائنات-بوصفها-أوسيطا-للدوال">الكائنات بوصفها أوسيطًا للدوال</h2>
<p>الكائنات المنشأة بناءً على أصنافنا الخاصة قابلة للتغيير عادةً. قد تتذكّر أنه مثلًا قوائم Python قابلة للتغيير: فعند تمريرها بوصفها أوسيطًا إلى الدوال، يمكن أن يتغيّر محتواها نتيجة التنفيذ.</p>
<p>لننظر إلى مثال بسيط تتلقّى فيه دالة مرجعًا إلى كائن من نوع <code>Student</code> بوصفه وسيطًا لها. ثم تغيّر الدالة اسم الطالب. وتصل الدالة والدالة الرئيسية التي تستدعيها معًا إلى الكائن نفسه، فيظهر التغيير في الدالة الرئيسية أيضًا.</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Student</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, student_number: <span class="hljs-built_in">str</span></span>):
        <span class="hljs-variable language_">self</span>.name = name
        <span class="hljs-variable language_">self</span>.student_number = student_number

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__str__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-string">f&quot;<span class="hljs-subst">{self.name}</span> (<span class="hljs-subst">{self.student_number}</span>)&quot;</span>

<span class="hljs-comment"># the type hint here uses the name of the class defined above</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">change_name</span>(<span class="hljs-params">student: Student</span>):
    student.name = <span class="hljs-string">&quot;Saul Student&quot;</span>

<span class="hljs-comment"># create a Student object</span>
steve = Student(<span class="hljs-string">&quot;Steve Student&quot;</span>, <span class="hljs-string">&quot;12345&quot;</span>)

<span class="hljs-built_in">print</span>(steve)
change_name(steve)
<span class="hljs-built_in">print</span>(steve)
</code></pre>
<pre><code>Steve Student (12345)
Saul Student (12345)
</code></pre>
<p>من الممكن أيضًا إنشاء الكائنات داخل الدوال. وإذا أعادت دالة مرجعًا إلى الكائن المنشأ حديثًا، فإنه يصبح متاحًا أيضًا داخل الدالة الرئيسية:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> random <span class="hljs-keyword">import</span> randint, choice

<span class="hljs-keyword">class</span> <span class="hljs-title class_">Student</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, student_number: <span class="hljs-built_in">str</span></span>):
        <span class="hljs-variable language_">self</span>.name = name
        <span class="hljs-variable language_">self</span>.student_number = student_number

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__str__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-string">f&quot;<span class="hljs-subst">{self.name}</span> (<span class="hljs-subst">{self.student_number}</span>)&quot;</span>

<span class="hljs-comment"># This function creates and returns a new Student object.</span>
<span class="hljs-comment"># It randomly selects values for the name and the student number.</span>
<span class="hljs-keyword">def</span> <span class="hljs-title function_">new_student</span>():
    first_names = [<span class="hljs-string">&quot;Mark&quot;</span>,<span class="hljs-string">&quot;Mindy&quot;</span>,<span class="hljs-string">&quot;Mary&quot;</span>,<span class="hljs-string">&quot;Mike&quot;</span>]
    last_names = [<span class="hljs-string">&quot;Javanese&quot;</span>, <span class="hljs-string">&quot;Rusty&quot;</span>, <span class="hljs-string">&quot;Scriptor&quot;</span>, <span class="hljs-string">&quot;Pythons&quot;</span>]

    <span class="hljs-comment"># randomly determine the name</span>
    name = choice(first_names) + <span class="hljs-string">&quot; &quot;</span> + choice(last_names)

    <span class="hljs-comment"># randomly determine the student number</span>
    student_number = <span class="hljs-built_in">str</span>(randint(<span class="hljs-number">10000</span>,<span class="hljs-number">99999</span>))

    <span class="hljs-comment"># Create and return a Student object</span>
    <span class="hljs-keyword">return</span> Student(name, student_number)

<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    <span class="hljs-comment"># Call the function five times and store the results in a list</span>
    students = []
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">5</span>):
        students.append(new_student())

    <span class="hljs-comment"># Print out the results</span>
    <span class="hljs-keyword">for</span> student <span class="hljs-keyword">in</span> students :
        <span class="hljs-built_in">print</span>(student)
</code></pre>
<p>قد يؤدي تنفيذ الشيفرة أعلاه إلى المخرجات التالية (ملاحظة: بما أن العشوائية متضمّنة، فإنك إذا جرّبت الشيفرة بنفسك فستكون النتائج مختلفة على الأرجح).</p>
<pre><code>Mary Rusty (78218)
Mindy Rusty (80068)
Mike Pythons (70396)
Mark Javanese (83307)
Mary Pythons (45149)
</code></pre>
<h2 id="الكائنات-بوصفها-أوسيطا-للتوابع">الكائنات بوصفها أوسيطًا للتوابع</h2>
<p>وبالمثل، يمكن أن تعمل الكائنات بوصفها أوسيطًا للتوابع. لننظر إلى مثال من حديقة ملاهي:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Person</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, height: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-variable language_">self</span>.name = name
        <span class="hljs-variable language_">self</span>.height = height

<span class="hljs-keyword">class</span> <span class="hljs-title class_">Attraction</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, min_height: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-variable language_">self</span>.visitors = <span class="hljs-number">0</span>
        <span class="hljs-variable language_">self</span>.name = name
        <span class="hljs-variable language_">self</span>.min_height = min_height

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">admit_visitor</span>(<span class="hljs-params">self, person: Person</span>):
        <span class="hljs-keyword">if</span> person.height &gt;= <span class="hljs-variable language_">self</span>.min_height:
            <span class="hljs-variable language_">self</span>.visitors += <span class="hljs-number">1</span>
            <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{person.name}</span> got on board&quot;</span>)
        <span class="hljs-keyword">else</span>:
            <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{person.name}</span> was too short :(&quot;</span>)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__str__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-string">f&quot;<span class="hljs-subst">{self.name}</span> (<span class="hljs-subst">{self.visitors}</span> visitors)&quot;</span>
</code></pre>
<p>يحتوي الصنف Attraction على تابع <code>admit_visitor</code> يأخذ كائنًا من نوع <code>Person</code> بوصفه وسيطًا. وإذا كان الزائر طويلًا بما يكفي، فقد قُبل صعودًا وزيد عدد الزوار. ويمكن اختبار الأصناف كما يلي:</p>
<pre><code class="language-python">rollercoaster = Attraction(<span class="hljs-string">&quot;Rollercoaster&quot;</span>, <span class="hljs-number">120</span>)
jared = Person(<span class="hljs-string">&quot;Jared&quot;</span>, <span class="hljs-number">172</span>)
alice = Person(<span class="hljs-string">&quot;Alice&quot;</span>, <span class="hljs-number">105</span>)

rollercoaster.admit_visitor(jared)
rollercoaster.admit_visitor(alice)

<span class="hljs-built_in">print</span>(rollercoaster)
</code></pre>
<pre><code>Jared got on board
Alice was too short :(
Rollercoaster (1 visitors)
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: مركز الأطفال</strong></p>
<p>يحتوي قالب التمرين على صنف اسمه <code>Person</code> وهيكل عظمي من التنفيذ للصنف <code>BabyCentre</code>. ويؤدّي كائن <code>BabyCentre</code> إجراءات مختلفة على كائن <code>Person</code>؛ فهو قد يزن الشخص مثلًا أو يُطعمه. وفي هذا التمرين ستنفّذ بقية الصنف <code>BabyCentre</code>. يُرجى عدم تغيير تعريف الصنف <code>Person</code> بأي شكل من الأشكال.</p>
</blockquote>
<h2 id="وزن-الأشخاص">وزن الأشخاص</h2>
<p>يحتوي تعريف الصنف <code>BabyCentre</code> على مخطط للدالة <code>weigh</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">BabyCentre</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">weigh</span>(<span class="hljs-params">self, person: Person</span>):
        <span class="hljs-comment"># return the weight of the person passed as an argument</span>
        <span class="hljs-keyword">return</span> -<span class="hljs-number">1</span>
</code></pre>
<p>يأخذ التابع كائن <code>Person</code> بوصفه وسيطًا، وينبغي أن يُرجع وزن الشخص. ويمكنك الوصول إلى وزن الشخص عبر الخاصية المناسبة المعرّفة في الصنف <code>Person</code>. يُرجى ملء بقية تنفيذ التابع <code>weigh</code>.</p>
<p>فيما يلي مثال لدالة رئيسية يزن فيها <code>BabyCentre</code> كائني <code>Person</code> منفصلين:</p>
<pre><code class="language-python">baby_centre = BabyCentre()

eric = Person(<span class="hljs-string">&quot;Eric&quot;</span>, <span class="hljs-number">1</span>, <span class="hljs-number">110</span>, <span class="hljs-number">7</span>)
peter = Person(<span class="hljs-string">&quot;Peter&quot;</span>, <span class="hljs-number">33</span>, <span class="hljs-number">176</span>, <span class="hljs-number">85</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{eric.name}</span> weighs <span class="hljs-subst">{baby_centre.weigh(eric)}</span> kg&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{peter.name}</span> weighs <span class="hljs-subst">{baby_centre.weigh(peter)}</span> kg&quot;</span>)
</code></pre>
<pre><code>Eric weighs 7 kg
Peter weighs 85 kg
</code></pre>
<h2 id="الإطعام">الإطعام</h2>
<p>من الممكن تغيير حالة كائن مُمرَّر بوصفه وسيطًا. يُرجى تنفيذ التابع <code>feed(person: Person)</code> الذي يزيد وزن الشخص المُمرَّر بوصفه وسيطًا بمقدار واحد.</p>
<p>في المثال التالي يُوزَن شخصان، ثم يُطعَم أحدهما ثلاث مرات. ثم يُوزَن الشخصان مرة أخرى:</p>
<pre><code class="language-python">baby_centre = BabyCentre()

eric = Person(<span class="hljs-string">&quot;Eric&quot;</span>, <span class="hljs-number">1</span>, <span class="hljs-number">110</span>, <span class="hljs-number">7</span>)
peter = Person(<span class="hljs-string">&quot;Peter&quot;</span>, <span class="hljs-number">33</span>, <span class="hljs-number">176</span>, <span class="hljs-number">85</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{eric.name}</span> weighs <span class="hljs-subst">{baby_centre.weigh(eric)}</span> kg&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{peter.name}</span> weighs <span class="hljs-subst">{baby_centre.weigh(peter)}</span> kg&quot;</span>)
<span class="hljs-built_in">print</span>() 

baby_centre.feed(eric)
baby_centre.feed(eric)
baby_centre.feed(eric)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{eric.name}</span> weighs <span class="hljs-subst">{baby_centre.weigh(eric)}</span> kg&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{peter.name}</span> weighs <span class="hljs-subst">{baby_centre.weigh(peter)}</span> kg&quot;</span>)
</code></pre>
<p>يجب أن تكشف المخرجات عن أن وزن Eric قد زيد بمقدار ثلاثة:</p>
<pre><code>Eric weighs 7 kg
Peter weighs 85 kg

Eric weighs 10 kg
Peter weighs 85 kg
</code></pre>
<h2 id="عد-عمليات-الوزن">عدّ عمليات الوزن</h2>
<p>يُرجى تنفيذ التابع <code>weigh_ins()</code> الذي يُرجع العدد الإجمالي لعمليات الوزن التي نفّذها كائن <code>BabyCentre</code>. ملاحظة: ستحتاج إلى خاصية جديدة لتتبّع عدد عمليات الوزن. يمكنك استخدام الشيفرة التالية لاختبار تابعك:</p>
<pre><code class="language-python">baby_centre = BabyCentre()

eric = Person(<span class="hljs-string">&quot;Eric&quot;</span>, <span class="hljs-number">1</span>, <span class="hljs-number">110</span>, <span class="hljs-number">7</span>)
peter = Person(<span class="hljs-string">&quot;Peter&quot;</span>, <span class="hljs-number">33</span>, <span class="hljs-number">176</span>, <span class="hljs-number">85</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Total number of weigh-ins is <span class="hljs-subst">{baby_centre.weigh_ins()}</span>&quot;</span>)

baby_centre.weigh(eric)
baby_centre.weigh(eric)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Total number of weigh-ins is <span class="hljs-subst">{baby_centre.weigh_ins()}</span>&quot;</span>)

baby_centre.weigh(eric)
baby_centre.weigh(eric)
baby_centre.weigh(eric)
baby_centre.weigh(eric)

<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Total number of weigh-ins is <span class="hljs-subst">{baby_centre.weigh_ins()}</span>&quot;</span>)
</code></pre>
<pre><code>Total number of weigh-ins is 0
Total number of weigh-ins is 2
Total number of weigh-ins is 6
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: LunchCard وPaymentTerminal</strong></p>
<p>في الجزء السابق كان هناك <a href="/arabic-cs-library/book/mooc/part-8/5-more-examples-of-classes#programming-exercise-lunchcard">تمرين</a> نفّذتَ فيه الصنف <code>LunchCard</code>. وكانت البطاقة تملك توابع منفصلة لتناول غداء عادي وغداء خاص، إلى جانب تابع لإيداع المال في البطاقة.</p>
</blockquote>
<p>لكن الصنف <code>LunchCard</code> كما طُلب منك تنفيذه يحمل بعض المشاكل. فالبطاقة بحد ذاتها كانت تعرف أسعار خيارات الغداء المختلفة، وتعرف كيف تطرح المبلغ الصحيح من الرصيد بناءً على هذه الأسعار. لكن تخيّل أن الأسعار تغيّرت، أو أُضيفت عناصر جديدة إلى النظام، بينما كانت عدة بطاقات مسجّلة بالفعل في النظام. وهذا يعني أن كل البطاقات الموجودة يجب أن تُستبدل بإصدارات تعرف الأسعار الجديدة.</p>
<p>والحلّ الأفضل هو جعل البطاقات «غبيّة»، جاهلة بأسعار المنتجات المختلفة. ومهمّة البطاقة تكون ببساطة تتبّع الرصيد المتاح. وكل الميزات الأكثر تعقيدًا ينبغي أن تكون ضمن صنف آخر: طرفية الدفع.</p>
<h2 id="نسخة-أبسط-من-lunchcard">نسخة أبسط من LunchCard</h2>
<p>لنُنفّذ أولًا نسخة أبسط من الصنف <code>LunchCard</code>. ينبغي أن تتضمّن البطاقة وظائف فقط لمعرفة الرصيد الحالي، وإيداع المال في البطاقة، والطرح من الرصيد. يُرجى ملء التابع <code>subtract_from_balance(amount)</code> في قالب التمرين وفق التعليمات في التعليقات:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">LunchCard</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, balance: <span class="hljs-built_in">float</span></span>):
        <span class="hljs-variable language_">self</span>.balance = balance

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">deposit_money</span>(<span class="hljs-params">self, amount: <span class="hljs-built_in">float</span></span>):
        <span class="hljs-variable language_">self</span>.balance += amount

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">subtract_from_balance</span>(<span class="hljs-params">self, amount: <span class="hljs-built_in">float</span></span>):
        <span class="hljs-keyword">pass</span>
        <span class="hljs-comment"># The amount should be subtracted from the balance only if</span>
        <span class="hljs-comment"># there is enough money on the card.</span>
        <span class="hljs-comment"># If the payment is successful, the method returns True. </span>
        <span class="hljs-comment"># Otherwise it returns False.</span>
</code></pre>
<p>يمكنك استخدام الشيفرة التالية لاختبار دالتك:</p>
<pre><code class="language-python"><span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    card = LunchCard(<span class="hljs-number">10</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Balance&quot;</span>, card.balance)
    result = card.subtract_from_balance(<span class="hljs-number">8</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Payment successful:&quot;</span>, result)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Balance&quot;</span>, card.balance)
    result = card.subtract_from_balance(<span class="hljs-number">4</span>)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Payment successful:&quot;</span>, result)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Balance&quot;</span>, card.balance)
</code></pre>
<pre><code>Balance 10
Payment successful: True
Balance 2
Payment successful: False
Balance 2
</code></pre>
<h2 id="طرفية-الدفع-والتعامل-مع-المدفوعات-النقدية">طرفية الدفع والتعامل مع المدفوعات النقدية</h2>
<p>في مقهى الطلبة يمكن الدفع إما نقدًا أو ببطاقة LunchCard. وتُستخدَم طرفية الدفع للتعامل مع كلٍّ من المدفوعات النقدية ومدفوعات البطاقة. لنبدأ بالمدفوعات النقدية.</p>
<p>هنا لدينا هيكل عظمي من التنفيذ لصنف <code>PaymentTerminal</code>. يُرجى تنفيذ التوابع كما هو موصوف في التعليقات:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">PaymentTerminal</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-comment"># Initially there is 1000 euros in cash available at the terminal</span>
        <span class="hljs-variable language_">self</span>.funds = <span class="hljs-number">1000</span>
        <span class="hljs-variable language_">self</span>.lunches = <span class="hljs-number">0</span>
        <span class="hljs-variable language_">self</span>.specials = <span class="hljs-number">0</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">eat_lunch</span>(<span class="hljs-params">self, payment: <span class="hljs-built_in">float</span></span>):
        <span class="hljs-comment"># A regular lunch costs 2.50 euros.</span>
        <span class="hljs-comment"># Increase the value of the funds at the terminal by the </span>
        <span class="hljs-comment"># price of the lunch, increase the number of lunches sold, </span>
        <span class="hljs-comment"># and return the appropriate change.</span>
        <span class="hljs-comment"># If the payment passed as an argument is not large enough to cover</span>
        <span class="hljs-comment"># the price, the lunch is not sold, and the entire sum is returned.</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">eat_special</span>(<span class="hljs-params">self, payment: <span class="hljs-built_in">float</span></span>):
        <span class="hljs-comment"># A special lunch costs 4.30 euros.</span>
        <span class="hljs-comment"># Increase the value of the funds at the terminal by the </span>
        <span class="hljs-comment"># price of the lunch, increase the number of lunches sold, </span>
        <span class="hljs-comment"># and return the appropriate change.</span>
        <span class="hljs-comment"># If the payment passed as an argument is not large enough to cover</span>
        <span class="hljs-comment"># the price, the lunch is not sold, and the entire sum is returned.</span>
</code></pre>
<p>يمكنك استخدام الشيفرة التالية لاختبار صنفك:</p>
<pre><code class="language-python">exactum = PaymentTerminal()

change = exactum.eat_lunch(<span class="hljs-number">10</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The change returned was&quot;</span>, change)

change = exactum.eat_lunch(<span class="hljs-number">5</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The change returned was&quot;</span>, change)

change = exactum.eat_special(<span class="hljs-number">4.3</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The change returned was&quot;</span>, change)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Funds available at the terminal:&quot;</span>, exactum.funds)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Regular lunches sold:&quot;</span>, exactum.lunches)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Special lunches sold:&quot;</span>, exactum.specials)
</code></pre>
<pre><code>The change returned was 7.5
The change returned was 2.5
The change returned was 0.0
Funds available at the terminal: 1009.3
Regular lunches sold: 2
Special lunches sold: 1
</code></pre>
<h2 id="التعامل-مع-معاملات-البطاقة">التعامل مع معاملات البطاقة</h2>
<p>والآن لنُنفّذ معاملات البطاقة. سنحتاج إلى توابع تأخذ <code>LunchCard</code> بوصفها وسيطًا، وتُقلّل رصيد البطاقة بسعر الغداء. فيما يلي مخططات هذه التوابع. يُرجى ملء التوابع كما هو موصوف في التعليقات:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">PaymentTerminal</span>:
    <span class="hljs-comment"># ...</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">eat_lunch_lunchcard</span>(<span class="hljs-params">self, card: LunchCard</span>):
        <span class="hljs-comment"># A regular lunch costs 2.50 euros.</span>
        <span class="hljs-comment"># If there is enough money on the card, </span>
        <span class="hljs-comment"># subtract the price of the lunch from the balance</span>
        <span class="hljs-comment"># and return True. If not, return False.</span>


    <span class="hljs-keyword">def</span> <span class="hljs-title function_">eat_special_lunchcard</span>(<span class="hljs-params">self, card: LunchCard</span>):
        <span class="hljs-comment"># A special lunch costs 4.30 euros.</span>
        <span class="hljs-comment"># If there is enough money on the card, </span>
        <span class="hljs-comment"># subtract the price of the lunch from the balance</span>
        <span class="hljs-comment"># and return True. If not, return False.</span>
</code></pre>
<p><strong>ملاحظة مهمة:</strong> عند الدفع ببطاقة LunchCard لا يتغيّر المبلغ النقدي المتاح في الطرفية. ومع ذلك، تُباع وجبات الغداء دائمًا متى كان الرصيد المطلوب متاحًا، فتذكّر زيادة عدد الوجبات المباعة بما يناسب.</p>
<p>يمكنك استخدام الشيفرة التالية لاختبار صنفك:</p>
<pre><code class="language-python">exactum = PaymentTerminal()

change = exactum.eat_lunch(<span class="hljs-number">10</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The change returned was&quot;</span>, change)

card = LunchCard(<span class="hljs-number">7</span>)

result = exactum.eat_special_lunchcard(card)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Payment successful:&quot;</span>, result)
result = exactum.eat_special_lunchcard(card)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Payment successful:&quot;</span>, result)
result = exactum.eat_lunch_lunchcard(card)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Payment successful:&quot;</span>, result)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Funds available at the terminal:&quot;</span>, exactum.funds)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Regular lunches sold:&quot;</span>, exactum.lunches)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Special lunches sold:&quot;</span>, exactum.specials)
</code></pre>
<pre><code>The change returned was 7.5
Payment successful: True
Payment successful: False
Payment successful: True
Funds available at the terminal: 1002.5
Regular lunches sold: 2
Special lunches sold: 1
</code></pre>
<h2 id="إيداع-المال-في-البطاقة">إيداع المال في البطاقة</h2>
<p>أخيرًا، لنُضِف تابعًا يتيح لك إيداع المال في البطاقة. يدفع مالك البطاقة هذا نقدًا، فيُضاف المبلغ المودَع إلى الأموال المتاحة في الطرفية. وهذا مخطط للتابع:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">deposit_money_on_card</span>(<span class="hljs-params">self, card: LunchCard, amount: <span class="hljs-built_in">float</span></span>):
    <span class="hljs-keyword">pass</span>
</code></pre>
<p>يمكنك استخدام الشيفرة التالية لاختبار تابعك:</p>
<pre><code class="language-python">exactum = PaymentTerminal()

card = LunchCard(<span class="hljs-number">2</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Card balance is <span class="hljs-subst">{card.balance}</span> euros&quot;</span>)

result = exactum.eat_special_lunchcard(card)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Payment successful:&quot;</span>, result)

exactum.deposit_money_on_card(card, <span class="hljs-number">100</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Card balance is <span class="hljs-subst">{card.balance}</span> euros&quot;</span>)

result = exactum.eat_special_lunchcard(card)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Payment successful:&quot;</span>, result)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Card balance is <span class="hljs-subst">{card.balance}</span> euros&quot;</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Funds available at the terminal:&quot;</span>, exactum.funds)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Regular lunches sold:&quot;</span>, exactum.lunches)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Special lunches sold:&quot;</span>, exactum.specials)
</code></pre>
<pre><code>Card balance is 2 euros
Payment successful: False
Card balance is 102 euros
Payment successful: True
Card balance is 97.7 euros
Funds available at the terminal: 1100
Regular lunches sold: 0
Special lunches sold: 1
</code></pre>
<h2 id="نسخة-من-الصنف-نفسه-بوصفها-وسيطا-للتابع">نسخة من الصنف نفسه بوصفها وسيطًا للتابع</h2>
<p>فيما يلي نسخة أخرى من الصنف <code>Person</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Person</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, year_of_birth: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-variable language_">self</span>.name = name
        <span class="hljs-variable language_">self</span>.year_of_birth = year_of_birth
</code></pre>
<p>لنفترض أننا نريد كتابة برنامج يقارن أعمار كائنات من نوع Person. يمكننا كتابة دالة منفصلة لهذا الغرض:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">older_than</span>(<span class="hljs-params">person1: Person, person2: Person</span>):
    <span class="hljs-keyword">if</span> person1.year_of_birth &lt; person2.year_of_birth:
        <span class="hljs-keyword">return</span> <span class="hljs-literal">True</span>
    <span class="hljs-keyword">else</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-literal">False</span>

muhammad = Person(<span class="hljs-string">&quot;Muhammad ibn Musa al-Khwarizmi&quot;</span>, <span class="hljs-number">780</span>)
pascal = Person(<span class="hljs-string">&quot;Blaise Pascal&quot;</span>, <span class="hljs-number">1623</span>)
grace = Person(<span class="hljs-string">&quot;Grace Hopper&quot;</span>, <span class="hljs-number">1906</span>)

<span class="hljs-keyword">if</span> older_than(muhammad, pascal):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{muhammad.name}</span> is older than <span class="hljs-subst">{pascal.name}</span>&quot;</span>)
<span class="hljs-keyword">else</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{muhammad.name}</span> is not older than <span class="hljs-subst">{pascal.name}</span>&quot;</span>)

<span class="hljs-keyword">if</span> older_than(grace, pascal):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{grace.name}</span> is older than <span class="hljs-subst">{pascal.name}</span>&quot;</span>)
<span class="hljs-keyword">else</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{grace.name}</span> is not older than <span class="hljs-subst">{pascal.name}</span>&quot;</span>)
</code></pre>
<pre><code>Muhammad ibn Musa al-Khwarizmi is older than Blaise Pascal
Grace Hopper is not older than Blaise Pascal
</code></pre>
<p>إحدى مبادئ البرمجة الموجّهة بالكائنات (object oriented programming) هي تضمّن أي وظيفة تتعامل مع كائنات من نوع معين في تعريف الصنف، بوصفها توابع. وإذًا بدلًا من دالة يمكننا كتابة <em>تابع</em> يتيح لنا مقارنة عمر كائن Person مع كائن Person <em>آخر</em>:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Person</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, year_of_birth: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-variable language_">self</span>.name = name
        <span class="hljs-variable language_">self</span>.year_of_birth = year_of_birth

    <span class="hljs-comment"># NB: type hints must be enclosed in quotation marks if the parameter</span>
    <span class="hljs-comment"># is of the same type as the class itself!</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">older_than</span>(<span class="hljs-params">self, another: <span class="hljs-string">&quot;Person&quot;</span></span>):
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.year_of_birth &lt; another.year_of_birth:
            <span class="hljs-keyword">return</span> <span class="hljs-literal">True</span>
        <span class="hljs-keyword">else</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-literal">False</span>
</code></pre>
<p>هنا يُشار إلى الكائن الذي يُستدعى عليه التابع بـ <code>self</code>، بينما كائن Person الآخر هو <code>another</code>.</p>
<p>تذكّر أن استدعاء التابع يختلف عن استدعاء الدالة. ويُرفَق التابع بكائن باستخدام الترميز النقطي:</p>
<pre><code class="language-python">muhammad = Person(<span class="hljs-string">&quot;Muhammad ibn Musa al-Khwarizmi&quot;</span>, <span class="hljs-number">780</span>)
pascal = Person(<span class="hljs-string">&quot;Blaise Pascal&quot;</span>, <span class="hljs-number">1623</span>)
grace = Person(<span class="hljs-string">&quot;Grace Hopper&quot;</span>, <span class="hljs-number">1906</span>)

<span class="hljs-keyword">if</span> muhammad.older_than(pascal):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{muhammad.name}</span> is older than <span class="hljs-subst">{pascal.name}</span>&quot;</span>)
<span class="hljs-keyword">else</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{muhammad.name}</span> is not older than <span class="hljs-subst">{pascal.name}</span>&quot;</span>)

<span class="hljs-keyword">if</span> grace.older_than(pascal):
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{grace.name}</span> is older than <span class="hljs-subst">{pascal.name}</span>&quot;</span>)
<span class="hljs-keyword">else</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;<span class="hljs-subst">{grace.name}</span> is not older than <span class="hljs-subst">{pascal.name}</span>&quot;</span>)
</code></pre>
<p>إلى يسار النقطة الكائن نفسه، الذي يُشار إليه بـ <code>self</code> داخل تعريف التابع. وفي الأقواس وسيط التابع، أي الكائن الذي يُشار إليه بـ <code>another</code>.</p>
<p>مخرجات البرنامج مطابقة تمامًا لمخرجات تنفيذ الدالة أعلاه.</p>
<p>نقطة تجميلية لنُختم بها: بنية <code>if...else</code> في التابع <code>older_than</code> غير ضرورية في العموم. فالقيمة التي يمثّلها التعبير المنطقي في الشرط هي تمامًا قيمة الصدق التي تُعاد. وبالتالي يمكن تبسيط التابع:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Person</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, year_of_birth: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-variable language_">self</span>.name = name
        <span class="hljs-variable language_">self</span>.year_of_birth = year_of_birth

    <span class="hljs-comment"># NB: type hints must be enclosed in quotation marks if the parameter </span>
    <span class="hljs-comment"># is of the same type as the class itself!</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">older_than</span>(<span class="hljs-params">self, another: <span class="hljs-string">&quot;Person&quot;</span></span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.year_of_birth &lt; another.year_of_birth
</code></pre>
<p>كما ورد في التعليقات في الأمثلة أعلاه، إذا كان المعامل في تعريف تابع من النوع نفسه للصنف، فلا بدّ من إحاطة تلميح النوع (type hint) بعلامات تنصيص. وحذف علامات التنصيص يُسبّب خطأً، ستراه إذا جرّبت ما يلي:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Person</span>:
    <span class="hljs-comment"># ...</span>

    <span class="hljs-comment"># this would cause an error, as Person must be enclosed in quotation marks</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">older_than</span>(<span class="hljs-params">self, another: Person</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.year_of_birth &lt; another.year_of_birth:
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: مقارنة العقارات</strong></p>
<p>تحتوي قاعدة بيانات لوكالة عقارية على سجلات للعقارات المتاحة، مُمثَّلة بكائنات معرّفة بالصنف التالي:</p>
</blockquote>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">RealProperty</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, rooms: <span class="hljs-built_in">int</span>, square_metres: <span class="hljs-built_in">int</span>, price_per_sqm: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-variable language_">self</span>.rooms = rooms
        <span class="hljs-variable language_">self</span>.square_metres = square_metres
        <span class="hljs-variable language_">self</span>.price_per_sqm = price_per_sqm
</code></pre>
<p>مهمتك تنفيذ توابع تتيح المقارنة بين العقارات المتاحة.</p>
<h2 id="هل-هو-أكبر">هل هو أكبر؟</h2>
<p>يُرجى كتابة تابع اسمه <code>bigger(self, compared_to)</code> يُرجع <code>True</code> إذا كان كائن <code>RealProperty</code> نفسه أكبر من الكائن الذي يُقارَن به.</p>
<p>مثال على كيفية عمل الدالة:</p>
<pre><code class="language-python">central_studio = RealProperty(<span class="hljs-number">1</span>, <span class="hljs-number">16</span>, <span class="hljs-number">5500</span>)
downtown_two_bedroom = RealProperty(<span class="hljs-number">2</span>, <span class="hljs-number">38</span>, <span class="hljs-number">4200</span>)
suburbs_three_bedroom = RealProperty(<span class="hljs-number">3</span>, <span class="hljs-number">78</span>, <span class="hljs-number">2500</span>)

<span class="hljs-built_in">print</span>(central_studio.bigger(downtown_two_bedroom))
<span class="hljs-built_in">print</span>(suburbs_three_bedroom.bigger(downtown_two_bedroom))
</code></pre>
<pre><code>False
True
</code></pre>
<h2 id="فرق-السعر">فرق السعر</h2>
<p>يُرجى كتابة تابع اسمه <code>price_difference(self, compared_to)</code> يُرجع فرق السعر بين كائن <code>RealProperty</code> نفسه والكائن الذي يُقارَن به. وفرق السعر هو القيمة المطلقة للفرق بين السعرين الإجماليين للعقارين. والسعر الإجمالي للعقار هو سعر المتر المربّع فيه مضروبًا في عدد أمتاره المربّعة.</p>
<p>مثال على كيفية عمل الدالة:</p>
<pre><code class="language-python">central_studio = RealProperty(<span class="hljs-number">1</span>, <span class="hljs-number">16</span>, <span class="hljs-number">5500</span>)
downtown_two_bedroom = RealProperty(<span class="hljs-number">2</span>, <span class="hljs-number">38</span>, <span class="hljs-number">4200</span>)
suburbs_three_bedroom = RealProperty(<span class="hljs-number">3</span>, <span class="hljs-number">78</span>, <span class="hljs-number">2500</span>)

<span class="hljs-built_in">print</span>(central_studio.price_difference(downtown_two_bedroom))
<span class="hljs-built_in">print</span>(suburbs_three_bedroom.price_difference(downtown_two_bedroom))
</code></pre>
<pre><code>71600
35400
</code></pre>
<h2 id="هل-هو-أغلى-ثمنا">هل هو أغلى ثمنًا؟</h2>
<p>يُرجى كتابة تابع اسمه <code>more_expensive(self, compared_to)</code> يُرجع <code>True</code> إذا كان كائن <code>RealProperty</code> نفسه أغلى ثمنًا من الكائن الذي يُقارَن به.</p>
<p>مثال على كيفية عمل الدالة:</p>
<pre><code class="language-python">central_studio = RealProperty(<span class="hljs-number">1</span>, <span class="hljs-number">16</span>, <span class="hljs-number">5500</span>)
downtown_two_bedroom = RealProperty(<span class="hljs-number">2</span>, <span class="hljs-number">38</span>, <span class="hljs-number">4200</span>)
suburbs_three_bedroom = RealProperty(<span class="hljs-number">3</span>, <span class="hljs-number">78</span>, <span class="hljs-number">2500</span>)

<span class="hljs-built_in">print</span>(central_studio.more_expensive(downtown_two_bedroom))
<span class="hljs-built_in">print</span>(suburbs_three_bedroom.more_expensive(downtown_two_bedroom))
</code></pre>
<pre><code>False
True
</code></pre>
`,c={book:s,chapter:n,chapterTitle:a,slug:l,title:e,headings:p,html:t};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,t as html,l as slug,e as title};
