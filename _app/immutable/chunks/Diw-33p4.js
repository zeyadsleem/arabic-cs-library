const s="mooc",n="part-9",a="الجزء 9: المزيد عن الكائنات",e="6-more-examples-with-classes",t="مزيد من الأمثلة على الأصناف",l=[{depth:2,id:"القيم-الافتراضية-للمعاملات",text:"القيم الافتراضية للمعاملات"},{depth:2,id:"الخاتمة-الكبرى",text:"الخاتمة الكبرى"},{depth:2,id:"العنصر",text:"العنصر"},{depth:2,id:"الحقيبة",text:"الحقيبة"},{depth:2,id:"انتبه-إلى-لغتك",text:"انتبه إلى لغتك"},{depth:2,id:"كل-العناصر",text:"كل العناصر"},{depth:2,id:"العنصر-الأثقل",text:"العنصر الأثقل"},{depth:2,id:"صندوق-الشحن",text:"صندوق الشحن"},{depth:2,id:"محتويات-صندوق-الشحن",text:"محتويات صندوق الشحن"}],p=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستألف أمثلة إضافية على الأصناف والكائنات</li>
<li>ستكون قادرًا على استخدام قيم افتراضية للمعاملات في توابعك</li>
</ul>
</blockquote>
<p>يتكوّن المثال التالي من صنفين. الصنف <code>Point</code> يمثّل نقطة في فضاء ثنائي الأبعاد. والصنف <code>Line</code> يمثّل مقطعًا بين نقطتين. والشيفرة أدناه تحتوي تعليقات؛ يُرجى قراءة التعليقات لتفهم كيف يعمل هذان الصنفان.</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> math

<span class="hljs-keyword">class</span> <span class="hljs-title class_">Point</span>:
    <span class="hljs-string">&quot;&quot;&quot; The class represents a point in two-dimensional space &quot;&quot;&quot;</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, x: <span class="hljs-built_in">float</span>, y: <span class="hljs-built_in">float</span></span>):
        <span class="hljs-comment"># These attributes are public because any value is acceptable for x and y</span>
        <span class="hljs-variable language_">self</span>.x = x
        <span class="hljs-variable language_">self</span>.y = y

    <span class="hljs-comment"># This class method returns a new Point at origo (0, 0)</span>
    <span class="hljs-comment"># It is possible to return a new instance of the class from within the class</span>
<span class="hljs-meta">    @classmethod</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">origo</span>(<span class="hljs-params">cls</span>):
        <span class="hljs-keyword">return</span> Point(<span class="hljs-number">0</span>, <span class="hljs-number">0</span>)

    <span class="hljs-comment"># This class method creates a new Point based on an existing Point</span>
    <span class="hljs-comment"># The original Point can be mirrored on either or both of the x and y axes</span>
    <span class="hljs-comment"># For example, the Point (1, 3) mirrored on the x-axis is (1, -3)</span>
<span class="hljs-meta">    @classmethod</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">mirrored</span>(<span class="hljs-params">cls, point: <span class="hljs-string">&quot;Point&quot;</span>, mirror_x: <span class="hljs-built_in">bool</span>, mirror_y: <span class="hljs-built_in">bool</span></span>):
        x = point.x
        y = point.y
        <span class="hljs-keyword">if</span> mirror_x:
            y = -y
        <span class="hljs-keyword">if</span> mirror_y:
            x = -x

        <span class="hljs-keyword">return</span> Point(x, y)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__str__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-string">f&quot;(<span class="hljs-subst">{self.x}</span>, <span class="hljs-subst">{self.y}</span>)&quot;</span>


<span class="hljs-keyword">class</span> <span class="hljs-title class_">Line</span>:
    <span class="hljs-string">&quot;&quot;&quot; The class represents a line segment in two-dimensional space &quot;&quot;&quot;</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, beginning: Point, end: Point</span>):
        <span class="hljs-comment"># These attributes are public because any two Points are acceptable</span>
        <span class="hljs-variable language_">self</span>.beginning = beginning
        <span class="hljs-variable language_">self</span>.end = end

    <span class="hljs-comment"># This method uses the Pythagorean theorem to calculate the length of the line segment</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">length</span>(<span class="hljs-params">self</span>):
        sum_of_squares = (<span class="hljs-variable language_">self</span>.end.x - <span class="hljs-variable language_">self</span>.beginning.x) ** <span class="hljs-number">2</span> + (<span class="hljs-variable language_">self</span>.end.y - <span class="hljs-variable language_">self</span>.beginning.y) ** <span class="hljs-number">2</span>
        <span class="hljs-keyword">return</span> math.sqrt(sum_of_squares)

    <span class="hljs-comment"># This method returns the Point in the middle of the line segment</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">centre_point</span>(<span class="hljs-params">self</span>):
        centre_x = (<span class="hljs-variable language_">self</span>.beginning.x + <span class="hljs-variable language_">self</span>.end.x) / <span class="hljs-number">2</span>
        centre_y = (<span class="hljs-variable language_">self</span>.beginning.y + <span class="hljs-variable language_">self</span>.end.y) / <span class="hljs-number">2</span>
        <span class="hljs-keyword">return</span> Point(centre_x, centre_y)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__str__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-string">f&quot;<span class="hljs-subst">{self.beginning}</span> ... <span class="hljs-subst">{self.end}</span>&quot;</span>
</code></pre>
<pre><code class="language-python">point = Point(<span class="hljs-number">1</span>,<span class="hljs-number">3</span>)
<span class="hljs-built_in">print</span>(point)

origo = Point.origo()
<span class="hljs-built_in">print</span>(origo)

point2 = Point.mirrored(point, <span class="hljs-literal">True</span>, <span class="hljs-literal">True</span>)
<span class="hljs-built_in">print</span>(point2)

line = Line(point, point2)
<span class="hljs-built_in">print</span>(line.length())
<span class="hljs-built_in">print</span>(line.centre_point())
<span class="hljs-built_in">print</span>(line)
</code></pre>
<pre><code>(1, 3)
(0, 0)
(-1, -3)
6.324555320336759
(0.0, 0.0)
(1, 3) ... (-1, -3)
</code></pre>
<h2 id="القيم-الافتراضية-للمعاملات">القيم الافتراضية للمعاملات</h2>
<p>في برمجة Python يمكنك عمومًا تعيين قيمة افتراضية لأي معامل. ويمكن استخدام القيم الافتراضية في كلٍّ من الدوال والتوابع.</p>
<p>إذا كان لمعامل قيمة افتراضية، فلا حاجة إلى إدراج قيمة كوسيط عند استدعاء الدالة. وإذا أُعطي الوسيط، تُهمَل القيمة الافتراضية. وإذا لم يُعطَ، تُستخدم القيمة الافتراضية.</p>
<p>تُستخدم القيم الافتراضية كثيرًا في البانيات. فإذا كان من المتوقع ألّا تكون كل المعلومات متاحة عند إنشاء كائن، فمن الأفضل إدراج قيمة افتراضية في تعريف تابع الباني من إجبار العميل على التعرّض لهذه المسألة. وهذا يسهّل استخدام الصنف من منظور العميل، لكنه يضمن أيضًا تماسك الكائن. فمثلًا، بفضل قيمة افتراضية مُعيَّنة يمكننا أن نكون واثقين من أن القيمة «الفارغة» تكون دائمًا نفسها، ما لم يرغب العميل تزويدها بشيء مختلف. وإذا لم تُحدَّد قيمة افتراضية، فمسؤولية توفير «قيمة فارغة» تقع على العميل. وقد تكون هذه، مثلًا، سلسلة نصية فارغة <code>&quot;&quot;</code>، أو الكائن الفارغ الخاص <code>None</code>، أو السلسلة النصية <code>&quot;not set&quot;</code>.</p>
<p>لننظر إلى صنف آخر يمثّل طالبًا. وعند إنشاء كائن <code>Student</code> جديد يجب على العميل تزويده باسم ورقم طالب. ورقم الطالب خاص ولا ينبغي تغييره لاحقًا. وبالإضافة إلى ذلك، يمتلك كائن <code>Student</code> خصائص لرصيد الدراسة والملاحظات، لهما قيم افتراضية مُعيَّنة في الباني. ويمكن تمرير قيم جديدة كوسيطات إلى الباني، ويمكن أيضًا حذفها لتُستخدم القيم الافتراضية بدلًا منها. يُرجى الاطلاع على التعليقات في الشيفرة لتفهم بدقة ما يفعله كل تابع.</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Student</span>:
    <span class="hljs-string">&quot;&quot;&quot; This class models a student &quot;&quot;&quot;</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name: <span class="hljs-built_in">str</span>, student_number: <span class="hljs-built_in">str</span>, credits: <span class="hljs-built_in">int</span> = <span class="hljs-number">0</span>, notes: <span class="hljs-built_in">str</span> = <span class="hljs-string">&quot;&quot;</span></span>):
        <span class="hljs-comment"># calling the setter method for the name attribute</span>
        <span class="hljs-variable language_">self</span>.name = name

        <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(student_number) &lt; <span class="hljs-number">5</span>:
            <span class="hljs-keyword">raise</span> ValueError(<span class="hljs-string">&quot;A student number should have at least five characters&quot;</span>)

        <span class="hljs-variable language_">self</span>.__student_number = student_number

        <span class="hljs-comment"># calling the setter method for the credits attribute</span>
        <span class="hljs-variable language_">self</span>.credits = credits

        <span class="hljs-variable language_">self</span>.__notes = notes

<span class="hljs-meta">    @property</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">name</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.__name

<span class="hljs-meta">    @name.setter</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">name</span>(<span class="hljs-params">self, name</span>):
        <span class="hljs-keyword">if</span> name != <span class="hljs-string">&quot;&quot;</span>:
            <span class="hljs-variable language_">self</span>.__name = name
        <span class="hljs-keyword">else</span>:
            <span class="hljs-keyword">raise</span> ValueError(<span class="hljs-string">&quot;The name cannot be an empty string&quot;</span>)

<span class="hljs-meta">    @property</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">student_number</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.__student_number

<span class="hljs-meta">    @property</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">credits</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.__credits

<span class="hljs-meta">    @credits.setter</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">credits</span>(<span class="hljs-params">self, op</span>):
        <span class="hljs-keyword">if</span> op &gt;= <span class="hljs-number">0</span>:
            <span class="hljs-variable language_">self</span>.__credits = op
        <span class="hljs-keyword">else</span>:
            <span class="hljs-keyword">raise</span> ValueError(<span class="hljs-string">&quot;The number of study credits cannot be below zero&quot;</span>)

<span class="hljs-meta">    @property</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">notes</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.__notes

<span class="hljs-meta">    @notes.setter</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">notes</span>(<span class="hljs-params">self, notes</span>):
        <span class="hljs-variable language_">self</span>.__notes = notes

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">summary</span>(<span class="hljs-params">self</span>):
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Student <span class="hljs-subst">{self.__name}</span> (<span class="hljs-subst">{self.student_number}</span>):&quot;</span>)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;- credits: <span class="hljs-subst">{self.__credits}</span>&quot;</span>)
        <span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;- notes: <span class="hljs-subst">{self.notes}</span>&quot;</span>)
</code></pre>
<pre><code class="language-python"><span class="hljs-comment"># Passing only the name and the student number as arguments to the constructor</span>
student1 = Student(<span class="hljs-string">&quot;Sally Student&quot;</span>, <span class="hljs-string">&quot;12345&quot;</span>)
student1.summary()

<span class="hljs-comment"># Passing the name, the student number and the number of study credits</span>
student2 = Student(<span class="hljs-string">&quot;Sassy Student&quot;</span>, <span class="hljs-string">&quot;54321&quot;</span>, <span class="hljs-number">25</span>)
student2.summary()

<span class="hljs-comment"># Passing values for all the parameters</span>
student3 = Student(<span class="hljs-string">&quot;Saul Student&quot;</span>, <span class="hljs-string">&quot;99999&quot;</span>, <span class="hljs-number">140</span>, <span class="hljs-string">&quot;extra time in exam&quot;</span>)
student3.summary()

<span class="hljs-comment"># Passing a value for notes, but not for study credits</span>
<span class="hljs-comment"># NB: the parameter must be named now that the arguments are not in order</span>
student4 = Student(<span class="hljs-string">&quot;Sandy Student&quot;</span>, <span class="hljs-string">&quot;98765&quot;</span>, notes=<span class="hljs-string">&quot;absent in academic year 20-21&quot;</span>)
student4.summary()
</code></pre>
<pre><code>Student Sally Student (12345):
- credits: 0
- notes:
Student Sassy Student (54321):
- credits: 25
- notes:
Student Saul Student (99999):
- credits: 140
- notes: extra time in exam
Student Sandy Student (98765):
- credits: 0
- notes: absent in academic year 20-21
</code></pre>
<p>لاحظ ألّا يوجد تابع كتابة للخاصية <code>student_number</code> لأن رقم الطالب لا يُفترض أن يتغيّر.</p>
<p>وهناك عثرة جديرة بالاهتمام عند استخدام القيم الافتراضية للمعاملات. والمثال التالي الذي ينمذج نوعًا آخر من الطلاب سيُضيء على هذا الأمر ضوءًا أوضح:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Student</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name, completed_courses=[]</span>):
        <span class="hljs-variable language_">self</span>.name = name
        <span class="hljs-variable language_">self</span>.completed_courses = completed_courses

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">add_course</span>(<span class="hljs-params">self, course</span>):
        <span class="hljs-variable language_">self</span>.completed_courses.append(course)
</code></pre>
<pre><code class="language-python">student1 = Student(<span class="hljs-string">&quot;Sally Student&quot;</span>)
student2 = Student(<span class="hljs-string">&quot;Sassy Student&quot;</span>)

student1.add_course(<span class="hljs-string">&quot;ItP&quot;</span>)
student1.add_course(<span class="hljs-string">&quot;ACiP&quot;</span>)

<span class="hljs-built_in">print</span>(student1.completed_courses)
<span class="hljs-built_in">print</span>(student2.completed_courses)
</code></pre>
<pre><code>['ItP', 'ACiP']
['ItP', 'ACiP']
</code></pre>
<p>إضافة المساقات المكتملة إلى قائمة Sally تضيف تلك المساقات أيضًا إلى قائمة Sassy. وفي الحقيقة، هاتان القائمتان هما القائمة نفسها تمامًا، لأن Python تُعيد استخدام المرجع المخزَّن في القيمة الافتراضية. وإنشاء الكائنين الجديدين من <code>Student</code> في المثال أعلاه يعادل ما يلي:</p>
<pre><code class="language-python">courses = []
student1 = Student(<span class="hljs-string">&quot;Sally Student&quot;</span>, courses)
student2 = Student(<span class="hljs-string">&quot;Sassy Student&quot;</span>, courses)
</code></pre>
<p>لا ينبغي أبدًا أن تكون القيم الافتراضية للمعاملات نسخًا من هياكل بيانات أكثر تعقيدًا وقابلة للتغيير، مثل القوائم. ويمكن الالتفاف على هذه المشكلة بإجراء التغييرات التالية على باني الصنف <code>Student</code>:</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Student</span>:
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name, completed_courses=<span class="hljs-literal">None</span></span>):
        <span class="hljs-variable language_">self</span>.name = name
        <span class="hljs-keyword">if</span> completed_courses <span class="hljs-keyword">is</span> <span class="hljs-literal">None</span>:
            <span class="hljs-variable language_">self</span>.completed_courses = []
        <span class="hljs-keyword">else</span>:
            <span class="hljs-variable language_">self</span>.completed_courses = completed_courses

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">add_course</span>(<span class="hljs-params">self, course</span>):
        <span class="hljs-variable language_">self</span>.completed_courses.append(course)
</code></pre>
<pre><code class="language-python">student1 = Student(<span class="hljs-string">&quot;Sally Student&quot;</span>)
student2 = Student(<span class="hljs-string">&quot;Sassy Student&quot;</span>)

student1.add_course(<span class="hljs-string">&quot;ItP&quot;</span>)
student1.add_course(<span class="hljs-string">&quot;ACiP&quot;</span>)

<span class="hljs-built_in">print</span>(student1.completed_courses)
<span class="hljs-built_in">print</span>(student2.completed_courses)
</code></pre>
<pre><code>['ItP', 'ACiP']
[]
</code></pre>
<h2 id="الخاتمة-الكبرى">الخاتمة الكبرى</h2>
<p>وإذا كان التمرين التالي يختم هذا الجزء من المادّة، فإن التقنيات اللازمة لحلّه كانت كلها مُتضمَّنة سابقًا في القسم المعنون <a href="/arabic-cs-library/book/mooc/part-9/2-objects-as-attributes">الكائنات كخصائص</a>. وبالتحديد، لا يُطلب منك في هذا التمرين استخدام زينة <code>@property</code> أو القيم الافتراضية للمعاملات. وهذا التمرين مشابه جدًّا للتمرينَين <a href="/arabic-cs-library/book/mooc/part-9/2-objects-as-attributes#programming-exercise-a-box-of-presents">صندوق الهدايا</a> و<a href="/arabic-cs-library/book/mooc/part-9/2-objects-as-attributes#programming-exercise-the-shortest-person-in-the-room">أقصر شخص في الغرفة</a>.</p>
<h4>معلومات هامة بخصوص التمرين التالي</h4>
<p>يُرجى ملاحظة أن هناك مشكلة ناجمة عن تحديث في Python تتعارض مع المكتبة المدمجة واسم الملف الأصلي لهذا التمرين. وإذا واجهت أي مشكلة، فنوصي بإعادة تنزيل مجلد التمرين. وبمجرد الحصول على ملفات الاختبار المحلية الجديدة، يمكنك استخدام <code>code.py</code> أو <code>code_1.py</code> كاسم للملف. وعند استخدام Visual Studio Code قد تتلقى إشعارات عن مشكلات في ملف الاختبار. غير أن هذه الإشعارات يمكن تجاهلها بأمان، لأنها ناتجة عن عجز الاختبار عن الاستيراد من ملفَي <code>code.py</code> أو <code>code_1.py</code>.</p>
<blockquote>
<p><strong>تمرين برمجي: العنصر والحقيبة وعنبر الشحن</strong></p>
<p>في هذه السلسلة من التمارين ستنشئ الأصناف <code>Item</code> و<code>Suitcase</code> و<code>Cargo Hold</code>، التي ستتيح لك مزيدًا من التدريب على العمل بكائنات تحتوي مراجع إلى كائنات أخرى.</p>
</blockquote>
<h2 id="العنصر">العنصر</h2>
<p>يُرجى إنشاء صنف اسمه <code>Item</code> يُستخدم لإنشاء عناصر من أنواع مختلفة. ولكل عنصر اسم ووزن (بالكيلوغرام).</p>
<p>يمكنك استخدام الشيفرة التالية لاختبار صنفك:</p>
<pre><code class="language-python">book = Item(<span class="hljs-string">&quot;ABC Book&quot;</span>, <span class="hljs-number">2</span>)
phone = Item(<span class="hljs-string">&quot;Nokia 3210&quot;</span>, <span class="hljs-number">1</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Name of the book:&quot;</span>, book.name())
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Weight of the book:&quot;</span>, book.weight())

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Book:&quot;</span>, book)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Phone:&quot;</span>, phone)
</code></pre>
<p>ينبغي لبرنامجك أن يطبع ما يلي:</p>
<pre><code>Name of the book: ABC Book
Weight of the book: 2
Book: ABC Book (2 kg)
Phone: Nokia 3210 (1 kg)
</code></pre>
<p>وينبغي أن يوفّر الصنف <code>Item</code> التابعين <code>weight</code> و<code>name</code>، اللذين يُرجعان القيمتين المخزَّنتين في هاتين الخصائص.</p>
<p>وينبغي تغليف الاسم والوزن داخل الصنف. وينبغي ألّا تعمل الشيفرة التالية:</p>
<pre><code class="language-python">book = Item(<span class="hljs-string">&quot;ABC Book&quot;</span>, <span class="hljs-number">2</span>)
book.weight = <span class="hljs-number">10</span>
</code></pre>
<h2 id="الحقيبة">الحقيبة</h2>
<p>يُرجى كتابة صنف اسمه <code>Suitcase</code>. ينبغي أن تتمكن من وضع العناصر داخل الحقيبة. وللحقيبة أيضًا وزن أقصى مجموع للعناصر المخزَّنة فيها.</p>
<p>وينبغي أن يحوي صنفك الأعضاء التالية:</p>
<ul>
<li>بانيًا يأخذ الوزن الأقصى كوسيط</li>
<li>تابعًا اسمه <code>add_item</code> يضيف العنصر المُعطى كوسيط إلى الحقيبة. ولا يُرجع هذا التابع أي قيمة</li>
<li>تابع <code>__str__</code> يُرجع سلسلة نصية بصيغة &quot;x items (y kg)&quot;</li>
</ul>
<p>وينبغي للصنف أن يضمن ألّا يتجاوز الوزن المجموع للعناصر المخزَّنة في أي <code>Suitcase</code> الوزن الأقصى المُعيَّن لتلك النسخة. وإذا كان من المفروض أن يُتجاوز الوزن الأقصى عند استدعاء التابع <code>add_item</code>، فلا يُضَف العنصر الجديد إلى الحقيبة.</p>
<p>وينبغي أن يعمل صنفك كالتالي:</p>
<pre><code class="language-python">book = Item(<span class="hljs-string">&quot;ABC Book&quot;</span>, <span class="hljs-number">2</span>)
phone = Item(<span class="hljs-string">&quot;Nokia 3210&quot;</span>, <span class="hljs-number">1</span>)
brick = Item(<span class="hljs-string">&quot;Brick&quot;</span>, <span class="hljs-number">4</span>)

suitcase = Suitcase(<span class="hljs-number">5</span>)
<span class="hljs-built_in">print</span>(suitcase)

suitcase.add_item(book)
<span class="hljs-built_in">print</span>(suitcase)

suitcase.add_item(phone)
<span class="hljs-built_in">print</span>(suitcase)

suitcase.add_item(brick)
<span class="hljs-built_in">print</span>(suitcase)
</code></pre>
<p>يجب أن يؤدي تنفيذ ما سبق إلى طباعة ما يلي:</p>
<pre><code>0 items (0 kg)
1 items (2 kg)
2 items (3 kg)
2 items (3 kg)
</code></pre>
<h2 id="انتبه-إلى-لغتك">انتبه إلى لغتك</h2>
<p>العبارة &quot;1 items&quot; ليست سليمة نحويًّا على نحو يُذكر. وبدلًا منها، ينبغي أن تقول &quot;1 item&quot;. يُرجى إجراء التغييرات المطلوبة في تابعك <code>__str__</code>.</p>
<p>وينبغي للمثال السابق أن يطبع الآن ما يلي:</p>
<pre><code>0 items (0 kg)
1 item (2 kg)
2 items (3 kg)
2 items (3 kg)
</code></pre>
<h2 id="كل-العناصر">كل العناصر</h2>
<p>يُرجى إضافة التوابع التالية إلى تعريف صنفك <code>Suitcase</code>:</p>
<ul>
<li><code>print_items</code> يطبع كل العناصر المخزَّنة في الحقيبة</li>
<li><code>weight</code> يُرجع عددًا صحيحًا يمثّل الوزن المجموع لكل العناصر المخزَّنة في الحقيبة</li>
</ul>
<p>وينبغي أن يعمل صنفك الآن مع البرنامج التالي:</p>
<pre><code class="language-python">book = Item(<span class="hljs-string">&quot;ABC Book&quot;</span>, <span class="hljs-number">2</span>)
phone = Item(<span class="hljs-string">&quot;Nokia 3210&quot;</span>, <span class="hljs-number">1</span>)
brick = Item(<span class="hljs-string">&quot;Brick&quot;</span>, <span class="hljs-number">4</span>)

suitcase = Suitcase(<span class="hljs-number">10</span>)
suitcase.add_item(book)
suitcase.add_item(phone)
suitcase.add_item(brick)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The suitcase contains the following items:&quot;</span>)
suitcase.print_items()
combined_weight = suitcase.weight()
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;Combined weight: <span class="hljs-subst">{combined_weight}</span> kg&quot;</span>)
</code></pre>
<p>ينبغي أن يؤدي تنفيذ البرنامج أعلاه إلى طباعة ما يلي:</p>
<pre><code>The suitcase contains the following items:
ABC Book (2 kg)
Nokia 3210 (1 kg)
Brick (4 kg)
Combined weight: 7 kg
</code></pre>
<p>إذا نفّذت صنفك <code>Suitcase</code> بأكثر من متغيّرَي نسخة، يُرجى إجراء التغييرات المطلوبة بحيث تكون لكل نسخة خاصيتان بياناتيان فقط: الوزن الأقصى وقائمة العناصر الموجودة فيها.</p>
<h2 id="العنصر-الأثقل">العنصر الأثقل</h2>
<p>يُرجى إضافة تابع جديد إلى صنفك <code>Suitcase</code>: ينبغي أن يُرجع التابع <code>heaviest_item</code> العنصر <code>Item</code> الأثقل. وإذا كان هناك عنصران أو أكثر بالوزن الأثقل نفسه، فيمكن للتابع أن يُرجع أيًّا منها. وينبغي للتابع أن يُرجع مرجعًا إلى كائن. وإذا كانت الحقيبة فارغة، فيجب على التابع أن يُرجع <code>None</code>.</p>
<p>وينبغي أن يعمل صنفك الآن مع البرنامج التالي:</p>
<pre><code class="language-python">book = Item(<span class="hljs-string">&quot;ABC Book&quot;</span>, <span class="hljs-number">2</span>)
phone = Item(<span class="hljs-string">&quot;Nokia 3210&quot;</span>, <span class="hljs-number">1</span>)
brick = Item(<span class="hljs-string">&quot;Brick&quot;</span>, <span class="hljs-number">4</span>)

suitcase = Suitcase(<span class="hljs-number">10</span>)
suitcase.add_item(book)
suitcase.add_item(phone)
suitcase.add_item(brick)

heaviest = suitcase.heaviest_item()
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;The heaviest item: <span class="hljs-subst">{heaviest}</span>&quot;</span>)
</code></pre>
<p>ينبغي أن يؤدي تنفيذ البرنامج أعلاه إلى طباعة ما يلي:</p>
<pre><code>The heaviest item: Brick (4 kg)
</code></pre>
<h2 id="صندوق-الشحن">صندوق الشحن</h2>
<p>يُرجى كتابة صنف اسمه <code>CargoHold</code> بالأعضاء التالية:</p>
<ul>
<li>بانيًا يأخذ الوزن الأقصى كوسيط</li>
<li>تابعًا اسمه <code>add_suitcase</code> يضيف الحقيبة المُعطاة كوسيط إلى صندوق الشحن</li>
<li>تابع <code>__str__</code> يُرجع سلسلة نصية بصيغة &quot;x suitcases, space for y kg&quot;</li>
</ul>
<p>وينبغي للصنف أن يضمن ألّا يتجاوز الوزن المجموع للعناصر المخزَّنة في أي <code>CargoHold</code> الوزن الأقصى المُعيَّن لتلك النسخة. وإذا كان من المفروض أن يُتجاوز الوزن الأقصى عند استدعاء التابع <code>add_suitcase</code>، فلا تُضَف الحقيبة الجديدة إلى صندوق الشحن.</p>
<p>وينبغي أن يعمل صنفك الآن مع البرنامج التالي:</p>
<pre><code class="language-python">cargo_hold = CargoHold(<span class="hljs-number">1000</span>)
<span class="hljs-built_in">print</span>(cargo_hold)

book = Item(<span class="hljs-string">&quot;ABC Book&quot;</span>, <span class="hljs-number">2</span>)
phone = Item(<span class="hljs-string">&quot;Nokia 3210&quot;</span>, <span class="hljs-number">1</span>)
brick = Item(<span class="hljs-string">&quot;Brick&quot;</span>, <span class="hljs-number">4</span>)

adas_suitcase = Suitcase(<span class="hljs-number">10</span>)
adas_suitcase.add_item(book)
adas_suitcase.add_item(phone)

peters_suitcase = Suitcase(<span class="hljs-number">10</span>)
peters_suitcase.add_item(brick)

cargo_hold.add_suitcase(adas_suitcase)
<span class="hljs-built_in">print</span>(cargo_hold)

cargo_hold.add_suitcase(peters_suitcase)
<span class="hljs-built_in">print</span>(cargo_hold)
</code></pre>
<pre><code>0 suitcases, space for 1000 kg
1 suitcase, space for 997 kg
2 suitcases, space for 993 kg
</code></pre>
<h2 id="محتويات-صندوق-الشحن">محتويات صندوق الشحن</h2>
<p>يُرجى إضافة تابع اسمه <code>print_items</code> إلى صنفك <code>CargoHold</code>. وينبغي أن يطبع كل العناصر في كل الحقائب الموجودة داخل صندوق الشحن.</p>
<p>وينبغي أن يعمل صنفك الآن مع البرنامج التالي:</p>
<pre><code class="language-python">book = Item(<span class="hljs-string">&quot;ABC Book&quot;</span>, <span class="hljs-number">2</span>)
phone = Item(<span class="hljs-string">&quot;Nokia 3210&quot;</span>, <span class="hljs-number">1</span>)
brick = Item(<span class="hljs-string">&quot;Brick&quot;</span>, <span class="hljs-number">4</span>)

adas_suitcase = Suitcase(<span class="hljs-number">10</span>)
adas_suitcase.add_item(book)
adas_suitcase.add_item(phone)

peters_suitcase = Suitcase(<span class="hljs-number">10</span>)
peters_suitcase.add_item(brick)

cargo_hold = CargoHold(<span class="hljs-number">1000</span>)
cargo_hold.add_suitcase(adas_suitcase)
cargo_hold.add_suitcase(peters_suitcase)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The suitcases in the cargo hold contain the following items:&quot;</span>)
cargo_hold.print_items()
</code></pre>
<p>ينبغي أن يؤدي تنفيذ البرنامج أعلاه إلى طباعة ما يلي:</p>
<pre><code>The suitcases in the cargo hold contain the following items:
ABC Book (2 kg)
Nokia 3210 (1 kg)
Brick (4 kg)
</code></pre>
<p>يُرجى الإجابة على استبيان سريع حول مادّات هذا الأسبوع.</p>
<blockquote>
<p><strong>اختبار:</strong> (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 42accf05-8328-5277-bf26-259a59852362)</p>
</blockquote>
`,o={book:s,chapter:n,chapterTitle:a,slug:e,title:t,headings:l,html:p};export{s as book,n as chapter,a as chapterTitle,o as default,l as headings,p as html,e as slug,t as title};
