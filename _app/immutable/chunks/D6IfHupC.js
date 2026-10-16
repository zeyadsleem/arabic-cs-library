const s="mooc",n="part-7",e="الجزء 7: الوحدات",o="4-data-processing",a="معالجة البيانات",t=[{depth:2,id:"قراءة-ملفات-csv",text:"قراءة ملفات CSV"},{depth:2,id:"قراءة-ملفات-json",text:"قراءة ملفات JSON"},{depth:2,id:"جلب-ملف-من-الإنترنت",text:"جلب ملف من الإنترنت"},{depth:2,id:"البحث-عن-الوحدات",text:"البحث عن الوحدات"}],p=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستكون قادرًا على استخدام وحدة لمعالجة ملفات CSV</li>
<li>ستكون قادرًا على استخدام وحدة لمعالجة ملفات JSON</li>
<li>ستكون قادرًا على جلب الملفات من الإنترنت وقراءتها</li>
</ul>
</blockquote>
<h2 id="قراءة-ملفات-csv">قراءة ملفات CSV <span class="content-anchor" id="reading-csv-files"></span></h2>
<p>صيغة CSV بسيطة إلى حدّ أننا حتى الآن تعاملنا معها بشيفرة مكتوبة يدويًا. غير أنّ هناك وحدة جاهزة في مكتبة Python القياسية للعمل مع ملفات CSV، وهي <a href="https://docs.python.org/3/library/csv.html">csv</a>. وهي تعمل هكذا:</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> csv

<span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(<span class="hljs-string">&quot;test.csv&quot;</span>) <span class="hljs-keyword">as</span> my_file:
    <span class="hljs-keyword">for</span> line <span class="hljs-keyword">in</span> csv.reader(my_file, delimiter=<span class="hljs-string">&quot;;&quot;</span>):
        <span class="hljs-built_in">print</span>(line)
</code></pre>
<p>تقرأ الشيفرة أعلاه كل الأسطر في ملف CSV المسمّى <code>test.csv</code>، وتفصل محتوى كل سطر إلى قائمة باستخدام الفاصل <code>;</code>، وتطبع كل قائمة. لذا، بافتراض أن محتوى الأسطر كالتالي:</p>
<pre><code class="language-x">012121212;5
012345678;2
015151515;4
</code></pre>
<p>ستطبع الشيفرة ما يلي:</p>
<pre><code>['012121212', '5']
['012345678', '2']
['015151515', '4']
</code></pre>
<p>ما دامت صيغة CSV بسيطة إلى هذا الحد، فما الفائدة من وجود وحدة منفصلة ما دمنا نستطيع استخدام الدالة <code>split</code> بالمثل؟ حسنًا، أوّلًا، بسبب طريقة بناء الوحدة، فإنها تعمل بشكل صحيح أيضًا إذا كانت القيم في الملف سلاسل نصية قد تحتوي هي نفسها على محرف الفاصل. فإذا بدا بعض الأسطر في الملف هكذا</p>
<pre><code class="language-x">&quot;aaa;bbb&quot;;&quot;ccc;ddd&quot;
</code></pre>
<p>فستنتج الشيفرة أعلاه ما يلي:</p>
<pre><code>['aaa;bbb', 'ccc;ddd']
</code></pre>
<p>واستخدام الدالة <code>split</code> سيفصل أيضًا داخل السلاسل النصية، وهو ما يُرجَّح أن يُفسد البيانات، ويُفسد برنامجنا في أثناء ذلك.</p>
<h2 id="قراءة-ملفات-json">قراءة ملفات JSON <span class="content-anchor" id="reading-json-files"></span></h2>
<p>ليست CSV سوى واحدة من صيغ كثيرة للبيانات القابلة للقراءة آليًا. و<a href="https://www.json.org/json-en.html">JSON</a> صيغة أخرى، وتُستخدم كثيرًا حين يلزم نقل البيانات بين التطبيقات.</p>
<p>ملفات JSON هي ملفات نصية ذات صيغة صارمة، وربما تكون أقلّ ألفة للعين البشرية من صيغة CSV. ويستخدم المثال التالي الملف <code>courses.json</code>، الذي يحتوي على معلومات عن بعض المقررات:</p>
<pre><code class="language-x">[
    {
        &quot;name&quot;: &quot;Introduction to Programming&quot;,
        &quot;abbreviation&quot;: &quot;ItP&quot;,
        &quot;periods&quot;: [1, 3]
    },
    {
        &quot;name&quot;: &quot;Advanced Course in Programming&quot;,
        &quot;abbreviation&quot;: &quot;ACiP&quot;,
        &quot;periods&quot;: [2, 4]
    },
    {
        &quot;name&quot;: &quot;Database Application&quot;,
        &quot;abbreviation&quot;: &quot;DbApp&quot;,
        &quot;periods&quot;: [1, 2, 3, 4]
    }
]
</code></pre>
<p>قد تبدو بنية ملف JSON مألوفة لك تمامًا الآن. فملف JSON أعلاه يشبه تمامًا قائمة في Python تحتوي على ثلاثة قواميس Python.</p>
<p>وتحتوي المكتبة القياسية على وحدة للعمل مع ملفات JSON، وهي <a href="https://docs.python.org/3/library/json.html">json</a>. وتأخذ الدالة <code>loads</code> أي وسيط يُمرَّر بصيغة JSON وتحوّله إلى بنية بيانات في Python. لذا، فإن معالجة ملف <code>courses.json</code> بالشيفرة أدناه</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> json

<span class="hljs-keyword">with</span> <span class="hljs-built_in">open</span>(<span class="hljs-string">&quot;courses.json&quot;</span>) <span class="hljs-keyword">as</span> my_file:
    data = my_file.read()

courses = json.loads(data)
<span class="hljs-built_in">print</span>(courses)
</code></pre>
<p>ستطبع ما يلي:</p>
<pre><code>[{'name': 'Introduction to Programming', 'abbreviation': 'ItP', 'periods': [1, 3]}, {'name': 'Advanced Course in Programming', 'abbreviation': 'ACiP', 'periods': [2, 4]}, {'name': 'Database Application', 'abbreviation': 'DbApp', 'periods': [1, 2, 3, 4]}]
</code></pre>
<p>وإذا أردنا أيضًا طباعة اسم كل مقرر، فيمكننا توسيع برنامجنا بحلقة <code>for</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">for</span> course <span class="hljs-keyword">in</span> courses:
    <span class="hljs-built_in">print</span>(course[<span class="hljs-string">&quot;name&quot;</span>])
</code></pre>
<pre><code>Introduction to Programming
Advanced Course in Programming
Database Application
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: التعامل مع ملفات JSON</strong></p>
<p>لننظر إلى ملف JSON يحتوي على بعض المعلومات عن الطلاب بالصيغة التالية:</p>
</blockquote>
<pre><code class="language-json"><span class="hljs-punctuation">[</span>
    <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Peter Pythons&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;age&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">27</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;hobbies&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
            <span class="hljs-string">&quot;coding&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-string">&quot;knitting&quot;</span>
        <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Jean Javanese&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;age&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">24</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;hobbies&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
            <span class="hljs-string">&quot;coding&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-string">&quot;rock climbing&quot;</span><span class="hljs-punctuation">,</span>
            <span class="hljs-string">&quot;reading&quot;</span>
        <span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">]</span>
</code></pre>
<p>يُرجى كتابة دالة اسمها <code>print_persons(filename: str)</code>، تقرأ ملف JSON بالصيغة أعلاه، وتطبع المحتوى كما هو موضّح أدناه. وقد يحتوي الملف على أي عدد من المدخلات.</p>
<pre><code>Peter Pythons 27 years (coding, knitting)
Jean Javanese 24 years (coding, rock climbing, reading)
</code></pre>
<p>ينبغي إدراج الهوايات بالترتيب نفسه الذي تظهر به في ملف JSON.</p>
<h2 id="جلب-ملف-من-الإنترنت">جلب ملف من الإنترنت</h2>
<p>تحتوي مكتبة Python القياسية أيضًا على وحدات للتعامل مع المحتوى المتوفّر على الإنترنت، ومن الدوال المفيدة دالة <a href="https://docs.python.org/3/library/urllib.request.html#urllib.request.urlopen">urllib.request.urlopen</a>. ونشجّعك على الاطّلاع على الوحدة كاملة، لكن المثال التالي ينبغي أن يكون كافيًا لتتقن عمل هذه الدالة. ويمكن استخدامها لجلب محتوى من الإنترنت، لتعالجه في برامجك.</p>
<p>ستطبع الشيفرة التالية محتوى الصفحة الرئيسية لجامعة هلسنكي:</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> urllib.request

my_request = urllib.request.urlopen(<span class="hljs-string">&quot;https://helsinki.fi&quot;</span>)
<span class="hljs-built_in">print</span>(my_request.read())
</code></pre>
<p>لا تبدو الصفحات الموجّهة إلى عيون البشر جميلة عادةً عند طباعة شيفرتها. غير أننا في الأمثلة التالية سنتعامل مع <em>بيانات</em> قابلة للقراءة آليًا من مصدر على الإنترنت. وكثير من البيانات القابلة للقراءة آليًا والمتاحة على الإنترنت يكون بصيغة JSON.</p>
<blockquote>
<p><strong>تمرين برمجي: إحصاءات الدورة</strong></p>
<h4>جلب قائمة المقررات النشطة</h4>
</blockquote>
<p>ستجد على العنوان <a href="https://studies.cs.helsinki.fi/stats-mock/api/courses">https://studies.cs.helsinki.fi/stats-mock/api/courses</a> معلومات أساسية عن بعض المقررات التي يقدّمها قسم علوم الحاسوب في جامعة هلسنكي، بصيغة JSON.</p>
<p>يُرجى كتابة دالة اسمها <code>retrieve_all()</code> تجلب بيانات كل المقررات النشطة حاليًا (الحقل <code>enabled</code> له القيمة <code>true</code>). وينبغي إرجاع هذه البيانات في قائمة من الصفوف (tuples) بالصيغة التالية:</p>
<pre><code>[
    ('Full Stack Open 2020', 'ofs2019', 2020, 201),
    ('DevOps with Docker 2019', 'docker2019', 2019, 36),
    ('DevOps with Docker 2020', 'docker2020', 2020, 36),
    ('Beta DevOps with Kubernetes', 'beta-dwk-20', 2020, 28)
]
</code></pre>
<p>يحتوي كل صف على الحقول التالية من البيانات الأصلية:</p>
<ul>
<li>اسم المقرر: <code>fullName</code></li>
<li><code>name</code></li>
<li><code>year</code></li>
<li>مجموع القيم المدرجة في <code>exercises</code></li>
</ul>
<p><strong>ملاحظة</strong>: من الضروري أن تجلب البيانات بالدالة <code>urllib.request.urlopen</code>، وإلا فقد لا تعمل الاختبارات الآلية بشكل صحيح.</p>
<p><strong>ملاحظة 2:</strong> صُمّمت الاختبارات بحيث تُعدّل قليلًا البيانات المجلوبة من الإنترنت، للتأكّد من أنك لا تُرمّز قيم الإرجاع ترميزًا ثابتًا.</p>
<p><strong>ملاحظة 3:</strong> صادف بعض مستخدمي Mac المشكلة التالية:</p>
<pre><code class="language-sh">File <span class="hljs-string">&quot;/Library/Frameworks/Python.framework/Versions/3.8/lib/python3.8/urllib/request.py&quot;</span>, line 1353, <span class="hljs-keyword">in</span> do_open
    raise URLError(err)
urllib.error.URLError: &lt;urlopen error [SSL: CERTIFICATE_VERIFY_FAILED] certificate verify failed: unable to get <span class="hljs-built_in">local</span> issuer certificate (_ssl.c:1124)&gt;
</code></pre>
<p>يعتمد الحل على طريقة تثبيت Python على جهازك. وفي بعض الحالات يساعد تنفيذ ما يلي في الطرفية:</p>
<pre><code class="language-sh"><span class="hljs-built_in">cd</span> <span class="hljs-string">&quot;/Applications/Python 3.8/&quot;</span>
<span class="hljs-built_in">sudo</span> <span class="hljs-string">&quot;./Install Certificates.command
</span></code></pre>
<p>يعتمد المسار المستخدَم في الأمر <code>cd</code> أعلاه على إصدار Python المثبَّت لديك. وقد يكون المسار أيضًا، على سبيل المثال، <code>&quot;/Applications/Python 3.9/&quot;</code>.</p>
<p>اقتُرحت <a href="https://stackoverflow.com/questions/27835619/urllib-and-ssl-certificate-verify-failed-error">حلول متنوّعة</a> لهذه المشكلة.</p>
<p>وهناك حيلة وجدها بعضهم مفيدة:</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> urllib.request
<span class="hljs-keyword">import</span> json
<span class="hljs-keyword">import</span> ssl <span class="hljs-comment"># add this library to your import section</span>

<span class="hljs-keyword">def</span> <span class="hljs-title function_">retrieve_all</span>():
    <span class="hljs-comment"># add the following line to the beginning of all your functions</span>
    context = ssl._create_unverified_context()
    <span class="hljs-comment"># the rest of your function</span>
</code></pre>
<p>وحلّ بديل محتمل:</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> urllib.request
<span class="hljs-keyword">import</span> certifi <span class="hljs-comment"># add this library to your import section</span>
<span class="hljs-keyword">import</span> json

<span class="hljs-keyword">def</span> <span class="hljs-title function_">retrieve_all</span>():
   address = <span class="hljs-string">&quot;https://studies.cs.helsinki.fi/stats-mock/api/courses&quot;</span>
   <span class="hljs-comment"># add a second argument to the function call</span>
   request = urllib.request.urlopen(address, cafile=certifi.where())
   <span class="hljs-comment"># the rest of your function</span>
</code></pre>
<h4>جلب بيانات مقرر واحد</h4>
<p>لكل مقرر أيضًا عنوان URL خاص به، تتوفّر فيه بيانات أسبوعية أكثر تحديدًا عن المقرر. وتتبع عناوين URL الصيغة <a href="https://studies.cs.helsinki.fi/stats-mock/api/courses/****/stats">https://studies.cs.helsinki.fi/stats-mock/api/courses/****/stats</a>، حيث تستبدل النجوم بمحتوى الحقل <code>name</code> للمقرر الذي تريد الوصول إليه.</p>
<p>فمثلًا، توجد بيانات المقرر <code>docker2019</code> على العنوان <a href="https://studies.cs.helsinki.fi/stats-mock/api/courses/docker2019/stats">https://studies.cs.helsinki.fi/stats-mock/api/courses/docker2019/stats</a>.</p>
<p>يُرجى كتابة دالة اسمها <code>retrieve_course(course_name: str)</code> تُعيد إحصاءات المقرر المحدّد بصيغة قاموس.</p>
<p>فمثلًا، سيُعيد استدعاء الدالة <code>retrieve_course(&quot;docker2019&quot;)</code> قاموسًا بالمحتوى التالي:</p>
<pre><code>{
    'weeks': 4,
    'students': 220,
    'hours': 5966,
    'hours_average': 27,
    'exercises': 4988,
    'exercises_average': 22
}
</code></pre>
<p>وتُحدَّد القيم في القاموس كما يلي:</p>
<ul>
<li><code>weeks</code>: عدد كائنات JSON المُسترجَعة</li>
<li><code>students</code>: أكبر عدد من الطلاب في كل الأسابيع</li>
<li><code>hours</code>: مجموع كل قيم <code>hour_total</code> في الأسابيع المختلفة</li>
<li><code>hours_average</code>: قيمة <code>hours</code> مقسومة على قيمة <code>students</code> (مقرّبة للأسفل إلى أقرب عدد صحيح)</li>
<li><code>exercises</code>: مجموع كل قيم <code>exercise_total</code> في الأسابيع المختلفة</li>
<li><code>exercises_average</code>: قيمة <code>exercises</code> مقسومة على قيمة <code>students</code> (مقرّبة للأسفل إلى أقرب عدد صحيح)</li>
</ul>
<p><strong>ملاحظة</strong>: راجع التنبيهات في الجزء 1 من التمرين، فهي تنطبق هنا أيضًا.</p>
<p><strong>ملاحظة 2</strong>: تحتوي وحدة <a href="https://docs.python.org/3/library/math.html">math</a> في Python على دالة مفيدة لتقريب الأعداد الصحيحة للأسفل.</p>
<blockquote>
<p><strong>تمرين برمجي: من غشّ</strong></p>
<p>يحتوي الملف <code>start_times.csv</code> على أوقات بدء فردية لامتحان برمجة، بالصيغة <code>name;hh:mm</code>. ومثال على ذلك:</p>
</blockquote>
<pre><code class="language-csv">jarmo;09:00
timo;18:42
kalle;13:23
</code></pre>
<p>وبالإضافة إلى ذلك، يحتوي الملف <code>submissions.csv</code> على النقاط وأوقات التسليم للتمارين الفردية. والصيغة هنا هي <code>name;task;points;hh:mm</code>. ومثال على ذلك:</p>
<pre><code class="language-csv">jarmo;1;8;16:05
timo;2;10;21:22
jarmo;2;10;19:15
jne...
</code></pre>
<p>مهمّتك أن تجد الطلاب الذين أمضوا أكثر من 3 ساعات في تمارين الامتحان. أي أن كل طالب سُلِّم <em>أيٌّ</em> من تمارينه بعد أكثر من 3 ساعات من وقت بدء امتحانه يُصنَّف غشّاشًا. وقد يكون هناك أكثر من تسليم واحد للمهمة نفسها لكل طالب. ويمكنك أن تفترض أن كل الأوقات في اليوم نفسه.</p>
<p>يُرجى كتابة دالة اسمها <code>cheaters()</code> تُعيد قائمة تحتوي على أسماء الطلاب الذين غشّوا</p>
<blockquote>
<p><strong>تمرين برمجي: من غشّ، الإصدار 2</strong></p>
<p>لديك مرة أخرى ملفات CSV من التمرين السابق تحت تصرّفك. يُرجى كتابة دالة اسمها <code>final_points()</code> تُعيد نقاط الامتحان النهائية التي حصل عليها الطلاب بصيغة قاموس، وفق المعايير التالية:</p>
</blockquote>
<ul>
<li>إذا كان هناك عدة تسليمات للمهمة نفسها، فيُؤخذ بالحسبان التسليم الحاصل على أكبر عدد من النقاط.</li>
<li>إذا قُدِّم التسليم بعد أكثر من 3 ساعات من وقت البدء، فيُتجاهل التسليم.</li>
</ul>
<p>تُرقَّم المهام من 1 إلى 8، ويُقيَّم كل تسليم من 0 إلى 6 نقاط.</p>
<p>في القاموس المُعاد ينبغي أن يكون المفتاح اسم الطالب، والقيمة مجموع النقاط التي حصل عليها الطالب.</p>
<p>تلميح: قد تكون القواميس المتداخلة منهجًا جيدًا عند معالجة مهام كل طالب وأوقات تسليمه.</p>
<h2 id="البحث-عن-الوحدات">البحث عن الوحدات</h2>
<p>تحتوي وثائق Python الرسمية على معلومات عن كل الوحدات المتاحة في المكتبة القياسية:</p>
<ul>
<li>https://docs.python.org/3/library/</li>
</ul>
<p>وبالإضافة إلى المكتبة القياسية، يفيض الإنترنت بوحدات Python متاحة مجانًا لأغراض مختلفة. وهذه بعض الوحدات الشائعة الاستخدام:</p>
<ul>
<li>https://wiki.python.org/moin/UsefulModules</li>
</ul>
<blockquote>
<p><strong>تمرين برمجي: المدقّق الإملائي، الإصدار 2</strong></p>
<p>ستكتب في هذا التمرين نسخة محسّنة من مدقّق الإملاء (Spell checker) من <a href="/arabic-cs-library/book/mooc/part-6/1-reading-files">الجزء السابق</a>.</p>
</blockquote>
<p>كما في النسخة السابقة، ينبغي أن يطلب البرنامج من المستخدم كتابة سطر من النص. ثم ينبغي أن يجري برنامجك تدقيقًا إملائيًا ويطبع ملاحظات للمستخدم، بحيث تُحاط كل الكلمات المكتوبة خطأً بنجوم. وإضافةً إلى ذلك، <em>ينبغي أن يطبع البرنامج قائمة اقتراحات للكلمات المكتوبة خطأً</em>.</p>
<p>يُرجى الاطلاع على المثالين التاليين.</p>
<pre><code>We use *ptython* to make a spell checker
suggestions:
ptython: python, pythons, typhon
</code></pre>
<pre><code>this is *acually* a good and *usefull* program
suggestions:
acually: actually, tactually, factually
usefull: usefully, useful, museful
</code></pre>
<p>ينبغي تحديد الاقتراحات بالدالة <a href="https://docs.python.org/3/library/difflib.html#difflib.get_close_matches">get_close_matches</a> من وحدة المكتبة القياسية في Python <a href="https://docs.python.org/3/library/difflib.html">difflib</a>.</p>
<p><strong>ملاحظة</strong>: لكي تعمل الاختبارات الآلية بشكل صحيح، يُرجى استخدام الدالة بـ«الإعدادات الافتراضية». أي يُرجى تمرير وسيطين فقط إلى الدالة: الكلمة المكتوبة خطأً، وقائمة الكلمات.</p>
<!---
> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 311e3116-a763-50b5-b79e-056fdccb3394)

-->
`,c={book:s,chapter:n,chapterTitle:e,slug:o,title:a,headings:t,html:p};export{s as book,n as chapter,e as chapterTitle,c as default,t as headings,p as html,o as slug,a as title};
