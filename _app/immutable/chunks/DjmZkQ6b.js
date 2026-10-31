const s="mooc",n="part-9",a="الجزء 9: المزيد عن الكائنات",e="2-objects-as-attributes",l="الكائنات كخصائص",p=[{depth:2,id:"متى-يكون-الاستيراد-ضروريا",text:"متى يكون الاستيراد ضروريًا؟"},{depth:2,id:"قائمة-من-الكائنات-كخاصية-لكائن",text:"قائمة من الكائنات كخاصية لكائن"},{depth:2,id:"صنف-present",text:"صنف Present"},{depth:2,id:"صنف-box",text:"صنف Box"},{depth:2,id:"none-مرجع-إلى-لا-شيء",text:"None: مرجع إلى لا شيء"},{depth:2,id:"صنف-room",text:"صنف Room"},{depth:2,id:"أقصر-شخص",text:"أقصر شخص"},{depth:2,id:"إزالة-شخص-من-الغرفة",text:"إزالة شخص من الغرفة"}],o=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستعرف كيفية استخدام الكائنات كخصائص في كائنات أخرى</li>
<li>ستكون على دراية بالكلمة المفتاحية <code>None</code></li>
</ul>
</blockquote>
<p>لقد رأينا سابقًا أمثلة على أصناف تحتوي على قوائم كخصائص. وبما أنه لا يوجد ما يمنعنا من تضمين كائنات قابلة للتغيير كخصائص في أصنافنا، فمن الحسن كذلك استخدام نماذج من أصنافنا الخاصة كخصائص في أصناف أخرى عرّفناها بأنفسنا. وفي الأمثلة التالية سنعرّف الأصناف <code>Course</code> و<code>Student</code> و<code>CompletedCourse</code>. ويستعمل المقرر المُنجَز الصنفين الأوّلين. تعريفات الأصناف قصيرة جدًا وبسيطة حتى نركّز بشكل أفضل على تقنية استخدام نماذج أصنافنا الخاصة كخصائص.</p>
<p>نفترض أن كل صنف معرّف في ملف مستقل.</p>
<p>أولًا نعرّف الصنف <code>Course</code> في ملف يسمى <code>course.py</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Course</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, code: <span class="hljs-built_in">str</span>, credits: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-variable language_">self</span>.name = name
        <span class="hljs-variable language_">self</span>.code = code
        <span class="hljs-variable language_">self</span>.credits = credits
</code></pre>
<p>ثم الصنف <code>Student</code> في ملف يسمى <code>student.py</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Student</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, student_number: <span class="hljs-built_in">str</span>, credits: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-variable language_">self</span>.name = name
        <span class="hljs-variable language_">self</span>.student_number = student_number
        <span class="hljs-variable language_">self</span>.credits = credits
</code></pre>
<p>أخيرًا، يُعرَّف الصنف <code>CompletedCourse</code> في ملف يسمى <code>completedcourse.py</code>. وبما أنه يستخدم الصنفين الآخرين، فإنه يجب استيرادهما قبل أن يمكن استخدامهما:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> course <span class="hljs-keyword">import</span> Course
<span class="hljs-keyword">from</span> student <span class="hljs-keyword">import</span> Student

<span class="hljs-keyword">class</span> <span class="hljs-title class_">CompletedCourse</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, student: Student, course: Course, grade: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-variable language_">self</span>.student = student
        <span class="hljs-variable language_">self</span>.course = course
        <span class="hljs-variable language_">self</span>.grade = grade
</code></pre>
<p>إليكم مثال على دالة رئيسية تضيف بعض المقررات المنجزة إلى قائمة:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> completedcourse <span class="hljs-keyword">import</span> CompletedCourse
<span class="hljs-keyword">from</span> course <span class="hljs-keyword">import</span> Course
<span class="hljs-keyword">from</span> student <span class="hljs-keyword">import</span> Student

<span class="hljs-comment"># Create a list of students</span>
students = []
students.append(Student(<span class="hljs-string">&quot;Ollie&quot;</span>, <span class="hljs-string">&quot;1234&quot;</span>, <span class="hljs-number">10</span>))
students.append(Student(<span class="hljs-string">&quot;Peter&quot;</span>, <span class="hljs-string">&quot;3210&quot;</span>, <span class="hljs-number">23</span>))
students.append(Student(<span class="hljs-string">&quot;Lena&quot;</span>, <span class="hljs-string">&quot;9999&quot;</span>, <span class="hljs-number">43</span>))
students.append(Student(<span class="hljs-string">&quot;Tina&quot;</span>, <span class="hljs-string">&quot;3333&quot;</span>, <span class="hljs-number">8</span>))

<span class="hljs-comment"># Create a course named Introduction to Programming</span>
itp = Course(<span class="hljs-string">&quot;Introduction to Programming&quot;</span>, <span class="hljs-string">&quot;itp1&quot;</span>, <span class="hljs-number">5</span>)

<span class="hljs-comment"># Add completed courses for each student, with grade 3 for all</span>
completed = []
<span class="hljs-keyword">for</span> student <span class="hljs-keyword">in</span> students:
    completed.append(CompletedCourse(student, itp, <span class="hljs-number">3</span>))

<span class="hljs-comment"># Print out the name of the student for each completed course</span>
<span class="hljs-keyword">for</span> course <span class="hljs-keyword">in</span> completed:
    <span class="hljs-built_in">print</span>(course.student.name)
</code></pre>
<pre><code>Ollie
Peter
Lena
Tina
</code></pre>
<p>ما الذي يحدث بالضبط مع كل تلك النقاط في السطر <code>print(course.student.name)</code>؟</p>
<ul>
<li><code>course</code> نموذج من الصنف <code>CompletedCourse</code></li>
<li><code>student</code> يشير إلى خاصية من خصائص الكائن <code>CompletedCourse</code>، وهو كائن من النوع <code>Student</code></li>
<li>تحتوي الخاصية <code>name</code> في الكائن <code>Student</code> على اسم الطالب</li>
</ul>
<h2 id="متى-يكون-الاستيراد-ضروريا">متى يكون الاستيراد ضروريًا؟</h2>
<p>في الأمثلة السابقة ظهرت جملة <code>import</code> عدة مرات:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> completedcourse <span class="hljs-keyword">import</span> CompletedCourse
<span class="hljs-keyword">from</span> course <span class="hljs-keyword">import</span> Course
<span class="hljs-keyword">from</span> student <span class="hljs-keyword">import</span> Student

<span class="hljs-comment"># rest of the main function</span>
</code></pre>
<p>جملة <code>import</code> لا تكون ضرورية إلا عند استخدام شيفرة معرّفة في مكان ما خارج الملف الحالي (أو جلسة مفسّر Python). ويشمل ذلك الحالات التي نريد فيها استخدام شيء معرّف في مكتبة Python القياسية. فمثلًا، تحتوي الوحدة <code>math</code> على بعض العمليات الرياضية:</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> math

x = <span class="hljs-number">10</span>
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;the square root of <span class="hljs-subst">{x}</span> is <span class="hljs-subst">{math.sqrt(x)}</span>&quot;</span>)
</code></pre>
<p>في المثال السابق افترضنا أن الأصناف الثلاثة معرّفة كلٌّ منها في ملف مستقل، وأن الدالة الرئيسية تُشغَّل من ملف آخر. ولهذا كانت جمل <code>import</code> ضرورية.</p>
<p>إذا كُتبت كل شيفرة البرنامج في الملف نفسه، كما تُنصحك به معظم تمارين هذه الدورة، <strong>فلن تحتاج</strong> إلى جمل <code>import</code> لاستخدام الأصناف التي عرّفتها.</p>
<p>إذا وجدتَ نفسك تكتب شيئًا على النحو التالي</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> person <span class="hljs-keyword">import</span> Person

<span class="hljs-comment"># more code goes here</span>
</code></pre>
<p>فمن المحتمل أن تكون قد أخطأت في شيء ما. وإذا كنت بحاجة إلى تذكير، فقد وردت جملة <code>import</code> لأول مرة في <a href="/arabic-cs-library/book/mooc/part-7/1-modules">الجزء 7</a> من مادة هذه الدورة.</p>
<blockquote>
<p><strong>تمرين برمجي: الحيوانات الأليفة</strong></p>
<p>يحتوي قالب التمرين على مخطط صنفين: <code>Person</code> و<code>Pet</code>. لكل شخص حيوان أليف واحد. يُرجى تعديل التابع <code>__str__</code> في الصنف <code>Person</code> بحيث يطبع أيضًا معلومات عن الحيوان الأليف للشخص كما في المثال أدناه.</p>
</blockquote>
<p>يجب أن تتبع السلسلة النصية التي يُرجعها التابع <em>التنسيق المحدّد أدناه بالضبط</em>.</p>
<pre><code class="language-python">hulda = Pet(<span class="hljs-string">&quot;Hulda&quot;</span>, <span class="hljs-string">&quot;mixed-breed dog&quot;</span>)
levi = Person(<span class="hljs-string">&quot;Levi&quot;</span>, hulda)

<span class="hljs-built_in">print</span>(levi)
</code></pre>
<pre><code>Levi, whose pal is Hulda, a mixed-breed dog
</code></pre>
<p><strong>ملاحظة:</strong> جميع تعريفات الأصناف في ملف نصي واحد. لا ينبغي أن تحتاج إلى عمل <code>import</code> لأي شيء.</p>
<h2 id="قائمة-من-الكائنات-كخاصية-لكائن">قائمة من الكائنات كخاصية لكائن</h2>
<p>في الأمثلة السابقة استخدمنا نماذج مفردة من أصناف أخرى كخصائص: فالشخص يملك حيوانًا أليفًا واحدًا كخاصية، والمقرر المُنجَز يملك طالبًا واحدًا ومقررًا واحدًا كخصائصه.</p>
<p>في البرمجة الكائنية كثيرًا ما نريد أن يكون لدينا <em>مجموعة</em> من الكائنات كخاصية. فمثلًا، العلاقة بين فريق رياضي ولاعبيه تتبع هذا النمط:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Player</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, goals: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-variable language_">self</span>.name = name
        <span class="hljs-variable language_">self</span>.goals = goals

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__str__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-string">f&quot;<span class="hljs-subst">{self.name}</span> (<span class="hljs-subst">{self.goals}</span> goals)&quot;</span>

<span class="hljs-keyword">class</span> <span class="hljs-title class_">Team</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span></span>):
        <span class="hljs-variable language_">self</span>.name = name
        <span class="hljs-variable language_">self</span>.players = []

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">add_player</span>(<span class="hljs-params">self, player: Player</span>):
        <span class="hljs-variable language_">self</span>.players.append(player)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">summary</span>(<span class="hljs-params">self</span>):
        goals = []
        <span class="hljs-keyword">for</span> player <span class="hljs-keyword">in</span> <span class="hljs-variable language_">self</span>.players:
            goals.append(player.goals)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Team:&quot;</span>, <span class="hljs-variable language_">self</span>.name)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Players:&quot;</span>, <span class="hljs-built_in">len</span>(<span class="hljs-variable language_">self</span>.players))
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Goals scored by each player:&quot;</span>, goals)
</code></pre>
<p>مثال على صنفنا أثناء العمل:</p>
<pre><code class="language-python">ca = Team(<span class="hljs-string">&quot;Campus Allstars&quot;</span>)
ca.add_player(Player(<span class="hljs-string">&quot;Eric&quot;</span>, <span class="hljs-number">10</span>))
ca.add_player(Player(<span class="hljs-string">&quot;Emily&quot;</span>, <span class="hljs-number">22</span>))
ca.add_player(Player(<span class="hljs-string">&quot;Andy&quot;</span>, <span class="hljs-number">1</span>))
ca.summary()
</code></pre>
<pre><code>Team: Campus Allstars
Players: 3
Goals scored by each player: [10, 22, 1]
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: صندوق هدايا</strong> <span class="content-anchor" id="programming-exercise-a-box-of-presents"></span></p>
<p>في هذا التمرين ستتدرّب على تغليف الهدايا. ستكتب صنفين: <code>Present</code> و<code>Box</code>. الهدية لها اسم ووزن، والصندوق يحتوي على هدايا.</p>
</blockquote>
<h2 id="صنف-present">صنف Present</h2>
<p>يُرجى تعريف الصنف <code>Present</code> الذي يمكن استخدامه للتمثيل بأنواع مختلفة من الهدايا. يجب أن يحتوي تعريف الصنف على خاصية لاسم الهدية وخاصية لوزنها (بالكيلوغرام). وينبغي أن تعمل نماذج الصنف كما يلي:</p>
<pre><code class="language-python">book = Present(<span class="hljs-string">&quot;ABC Book&quot;</span>, <span class="hljs-number">2</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The name of the present:&quot;</span>, book.name)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The weight of the present:&quot;</span>, book.weight)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Present:&quot;</span>, book)
</code></pre>
<p>ينبغي أن يطبع هذا ما يلي</p>
<pre><code>The name of the present: ABC Book
The weight of the present: 2
Present: ABC Book (2 kg)
</code></pre>
<h2 id="صنف-box">صنف Box</h2>
<p>يُرجى تعريف الصنف <code>Box</code>. ينبغي أن تتمكن من إضافة هدايا إلى الصندوق، وأن يتعقّب الصندوق الوزن الإجمالي للهدايا الموجودة داخله. يجب أن يحتوي تعريف الصنف على التابعين التاليين:</p>
<ul>
<li><code>add_present(self, present: Present)</code> الذي يضيف الهدية المُعطاة كوساط إلى الصندوق. لا يُرجع هذا التابع قيمة.</li>
<li><code>total_weight(self)</code> الذي يُرجع الوزن الإجمالي للهدايا في الصندوق.</li>
</ul>
<p>يمكنك استخدام الشيفرة التالية لاختبار صنفك:</p>
<pre><code class="language-python">book = Present(<span class="hljs-string">&quot;ABC Book&quot;</span>, <span class="hljs-number">2</span>)

box = Box()
box.add_present(book)
<span class="hljs-built_in">print</span>(box.total_weight())

cd = Present(<span class="hljs-string">&quot;Pink Floyd: Dark Side of the Moon&quot;</span>, <span class="hljs-number">1</span>)
box.add_present(cd)
<span class="hljs-built_in">print</span>(box.total_weight())
</code></pre>
<pre><code>2
3
</code></pre>
<h2 id="none-مرجع-إلى-لا-شيء"><code>None</code>: مرجع إلى لا شيء</h2>
<p>في برمجة Python تشير كل المتغيّرات المُهيّأة إلى كائن. غير أنه توجد بالضرورة حالات نحتاج فيها إلى الإشارة إلى شيء غير موجود، دون أن نُسبّب أخطاء. والكلمة المفتاحية <code>None</code> تمثّل تمامًا كائنًا &quot;فارغًا&quot; كهذا.</p>
<p>معتمدًا على مثال الصنفين Team وPlayer أعلاه، لنفترض أننا نريد إضافة تابع للبحث عن لاعبي الفريق باسم اللاعب. وإذا لم يُعثر على أي لاعب بهذا الاسم، فقد يكون من المعقول إرجاع <code>None</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Player</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, goals: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-variable language_">self</span>.name = name
        <span class="hljs-variable language_">self</span>.goals = goals

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__str__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-string">f&quot;<span class="hljs-subst">{self.name}</span> (<span class="hljs-subst">{self.goals}</span> goals)&quot;</span>

<span class="hljs-keyword">class</span> <span class="hljs-title class_">Team</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span></span>):
        <span class="hljs-variable language_">self</span>.name = name
        <span class="hljs-variable language_">self</span>.players = []

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">add_player</span>(<span class="hljs-params">self, player: Player</span>):
        <span class="hljs-variable language_">self</span>.players.append(player)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">find_player</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span></span>):
        <span class="hljs-keyword">for</span> player <span class="hljs-keyword">in</span> <span class="hljs-variable language_">self</span>.players:
            <span class="hljs-keyword">if</span> player.name == name:
                <span class="hljs-keyword">return</span> player
        <span class="hljs-keyword">return</span> <span class="hljs-literal">None</span>
</code></pre>
<p>لنختبر دالتنا:</p>
<pre><code class="language-python">ca = Team(<span class="hljs-string">&quot;Campus Allstars&quot;</span>)
ca.add_player(Player(<span class="hljs-string">&quot;Eric&quot;</span>, <span class="hljs-number">10</span>))
ca.add_player(Player(<span class="hljs-string">&quot;Amily&quot;</span>, <span class="hljs-number">22</span>))
ca.add_player(Player(<span class="hljs-string">&quot;Andy&quot;</span>, <span class="hljs-number">1</span>))

player1 = ca.find_player(<span class="hljs-string">&quot;Andy&quot;</span>)
<span class="hljs-built_in">print</span>(player1)
player2 = ca.find_player(<span class="hljs-string">&quot;Charlie&quot;</span>)
<span class="hljs-built_in">print</span>(player2)
</code></pre>
<pre><code>Andy (1 goals)
None
</code></pre>
<p>لكن كُن حذرًا مع <code>None</code>. فقد يسبّب في بعض الأحيان متاعب أكثر مما يحلّها. ومن الأخطاء البرمجية الشائعة محاولة الوصول إلى تابع أو خاصية من خلال مرجع تُقيَّم قيمته إلى <code>None</code>:</p>
<pre><code class="language-python">ca = Team(<span class="hljs-string">&quot;Campus Allstars&quot;</span>)
ca.add_player(Player(<span class="hljs-string">&quot;Eric&quot;</span>, <span class="hljs-number">10</span>))

player = ca.find_player(<span class="hljs-string">&quot;Charlie&quot;</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Goals by Charlie: <span class="hljs-subst">{player.goals}</span>&quot;</span>)
</code></pre>
<p>سيؤدي تنفيذ ما سبق إلى خطأ:</p>
<pre><code>Traceback (most recent call last):
  File &quot;&lt;stdin&gt;&quot;, line 1, in &lt;module&gt;
AttributeError: 'NoneType' object has no attribute 'goals'
</code></pre>
<p>من الجيد التحقق من <code>None</code> قبل محاولة الوصول إلى أي خصائص أو توابع لقيم الإرجاع:</p>
<pre><code class="language-python">ca = Team(<span class="hljs-string">&quot;Campus Allstars&quot;</span>)
ca.add_player(Player(<span class="hljs-string">&quot;Eric&quot;</span>, <span class="hljs-number">10</span>))

player = ca.find_player(<span class="hljs-string">&quot;Charlie&quot;</span>)
<span class="hljs-keyword">if</span> player <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> <span class="hljs-literal">None</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Goals by Charlie: <span class="hljs-subst">{player.goals}</span>&quot;</span>)
<span class="hljs-keyword">else</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Charlie doesn&#x27;t play in Campus Allstars :(&quot;</span>)
</code></pre>
<pre><code>Charlie doesn't play in Campus Allstars :(
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: أقصر شخص في الغرفة</strong> <span class="content-anchor" id="programming-exercise-the-shortest-person-in-the-room"></span></p>
<p>يحتوي قالب التمرين على الصنف <code>Person</code>. للشخص اسم وطول. في هذا التمرين ستنفّذ الصنف <code>Room</code>. يمكنك إضافة أي عدد من الأشخاص إلى الغرفة، ويمكنك أيضًا البحث عن أقصر شخص في الغرفة وإزالته.</p>
</blockquote>
<h2 id="صنف-room">صنف Room</h2>
<p>يُرجى تعريف الصنف <code>Room</code>. ينبغي أن يكون لديه قائمة من الأشخاص كخاصية، وأن يحتوي أيضًا على التابعين التاليين:</p>
<ul>
<li><code>add(person: Person)</code> يضيف الشخص المُعطى كوساط إلى الغرفة.</li>
<li><code>is_empty()</code> يُرجع <code>True</code> أو <code>False</code> بحسب ما إذا كانت الغرفة فارغة.</li>
<li><code>print_contents()</code> يطبع محتويات قائمة الأشخاص في الغرفة.</li>
</ul>
<p>يُرجى الاطلاع على مثال الاستخدام التالي:</p>
<pre><code class="language-python">room = Room()
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Is the room empty?&quot;</span>, room.is_empty())
room.add(Person(<span class="hljs-string">&quot;Lea&quot;</span>, <span class="hljs-number">183</span>))
room.add(Person(<span class="hljs-string">&quot;Kenya&quot;</span>, <span class="hljs-number">172</span>))
room.add(Person(<span class="hljs-string">&quot;Ally&quot;</span>, <span class="hljs-number">166</span>))
room.add(Person(<span class="hljs-string">&quot;Nina&quot;</span>, <span class="hljs-number">162</span>))
room.add(Person(<span class="hljs-string">&quot;Dorothy&quot;</span>, <span class="hljs-number">155</span>))
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Is the room empty?&quot;</span>, room.is_empty())
room.print_contents()
</code></pre>
<pre><code>Is the room empty? True
Is the room empty? False
There are 5 persons in the room, and their combined height is 838 cm
Lea (183 cm)
Kenya (172 cm)
Ally (166 cm)
Nina (162 cm)
Dorothy (155 cm)
</code></pre>
<h2 id="أقصر-شخص">أقصر شخص</h2>
<p>يُرجى تعريف التابع <code>shortest()</code> داخل تعريف الصنف <code>Room</code>. يجب أن يُرجع التابع أقصر شخص في الغرفة التي استُدعي عليها. وإذا كانت الغرفة فارغة، يجب أن يُرجع <code>None</code>. كما يجب ألّا يُزيل التابع الشخص من الغرفة.</p>
<pre><code class="language-python">room = Room()

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Is the room empty?&quot;</span>, room.is_empty())
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Shortest:&quot;</span>, room.shortest())

room.add(Person(<span class="hljs-string">&quot;Lea&quot;</span>, <span class="hljs-number">183</span>))
room.add(Person(<span class="hljs-string">&quot;Kenya&quot;</span>, <span class="hljs-number">172</span>))
room.add(Person(<span class="hljs-string">&quot;Nina&quot;</span>, <span class="hljs-number">162</span>))
room.add(Person(<span class="hljs-string">&quot;Ally&quot;</span>, <span class="hljs-number">166</span>))

<span class="hljs-built_in">print</span>()

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Is the room empty?&quot;</span>, room.is_empty())
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Shortest:&quot;</span>, room.shortest())

<span class="hljs-built_in">print</span>()

room.print_contents()
</code></pre>
<pre><code>Is the room empty? True
Shortest: None

Is the room empty? False
Shortest: Nina

There are 4 persons in the room, and their combined height is 683 cm
Lea (183 cm)
Kenya (172 cm)
Nina (162 cm)
Ally (166 cm)
</code></pre>
<h2 id="إزالة-شخص-من-الغرفة">إزالة شخص من الغرفة</h2>
<p>يُرجى تعريف التابع <code>remove_shortest()</code> داخل تعريف الصنف <code>Room</code>. يجب أن يزيل التابع أقصر كائن <code>Person</code> من الغرفة وأن يُرجع المرجع إلى الكائن. وإذا كانت الغرفة فارغة، يجب أن يُرجع <code>None</code>.</p>
<pre><code class="language-python">room = Room()

room.add(Person(<span class="hljs-string">&quot;Lea&quot;</span>, <span class="hljs-number">183</span>))
room.add(Person(<span class="hljs-string">&quot;Kenya&quot;</span>, <span class="hljs-number">172</span>))
room.add(Person(<span class="hljs-string">&quot;Nina&quot;</span>, <span class="hljs-number">162</span>))
room.add(Person(<span class="hljs-string">&quot;Ally&quot;</span>, <span class="hljs-number">166</span>))
room.print_contents()

<span class="hljs-built_in">print</span>()

removed = room.remove_shortest()
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Removed from room: <span class="hljs-subst">{removed.name}</span>&quot;</span>)

<span class="hljs-built_in">print</span>()

room.print_contents()
</code></pre>
<pre><code>There are 4 persons in the room, and their combined height is 683 cm
Lea (183 cm)
Kenya (172 cm)
Nina (162 cm)
Ally (166 cm)

Removed from room: Nina

There are 3 persons in the room, and their combined height is 521 cm
Lea (183 cm)
Kenya (172 cm)
Ally (166 cm)
</code></pre>
<p><strong>تلميح</strong>: في <a href="/arabic-cs-library/book/mooc/part-4/3-lists#removing-items-from-a-list">الجزء 4</a> ستجد تعليمات لإزالة عناصر من قائمة.</p>
<p><strong>تلميح 2</strong>: من الممكن دائمًا استدعاء تابع آخر من الصنف نفسه من داخل تابع. والشيفرة التالية ينبغي أن تعمل كما ينبغي:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Room</span>:
    <span class="hljs-comment"># ...</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">shortest</span>(<span class="hljs-params">self</span>):
        <span class="hljs-comment"># your code goes here</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">remove_shortest</span>(<span class="hljs-params">self</span>):
        shortest_person = <span class="hljs-variable language_">self</span>.shortest()
        <span class="hljs-comment"># ...</span>
</code></pre>
`,t={book:s,chapter:n,chapterTitle:a,slug:e,title:l,headings:p,html:o};export{s as book,n as chapter,a as chapterTitle,t as default,p as headings,o as html,e as slug,l as title};
