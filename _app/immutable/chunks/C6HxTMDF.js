const s="mooc",n="part-5",a="الجزء 5: هياكل البيانات",p="4-tuple",e="الصف",t=[{depth:2,id:"ما-الغرض-من-الصف",text:"ما الغرض من الصف؟"},{depth:2,id:"الصفوف-دون-أقواس",text:"الصفوف دون أقواس"}],l=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستتعرّف على نوع البيانات الصف (tuple)</li>
<li>ستكون قادرًا على إنشاء صفوف من أنواع مختلفة من القيم</li>
<li>ستعرف الفرق بين الصف والقائمة</li>
<li>ستكون قادرًا على ذكر بعض حالات الاستخدام النموذجية للصفوف</li>
</ul>
</blockquote>
<p>الصف (tuple) هو بنية بيانات تشبه القائمة في جوانب كثيرة. وأهمّ الفروق بين الاثنين هي:</p>
<ul>
<li>تُحاط الصفوف بأقواس دائرية <code>()</code>، بينما تُحاط القوائم بأقواس مربّعة <code>[]</code></li>
<li>الصفوف <em>غير قابلة للتغيير</em>، في حين قد تتغيّر محتويات القائمة</li>
</ul>
<p>تنشئ الشيفرة التالية صفًّا يحتوي على إحداثيات نقطة:</p>
<pre><code class="language-python">point = (<span class="hljs-number">10</span>, <span class="hljs-number">20</span>)
</code></pre>
<p>يُنتَ الوصول إلى العناصر المخزّنة في الصف بالفهرس، تمامًا كما العناصر المخزّنة في القائمة:</p>
<pre><code class="language-python">point = (<span class="hljs-number">10</span>, <span class="hljs-number">20</span>)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;x coordinate:&quot;</span>, point[<span class="hljs-number">0</span>])
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;y coordinate:&quot;</span>, point[<span class="hljs-number">1</span>])
</code></pre>
<pre><code>x coordinate: 10
y coordinate: 20
</code></pre>
<p>لا يمكن تغيير القيم المخزّنة في الصف بعد تعريف الصف. والشيفرة التالية لن <em>تعمل</em>:</p>
<pre><code class="language-python">point = (<span class="hljs-number">10</span>, <span class="hljs-number">20</span>)
point[<span class="hljs-number">0</span>] = <span class="hljs-number">15</span>
</code></pre>
<pre><code>TypeError: 'tuple' object does not support item assignment
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: إنشاء صف</strong></p>
<p>اكتب دالة اسمها <code>create_tuple(x: int, y: int, z: int)</code>، تأخذ ثلاثة أعداد صحيحة كوسائط لها، وتنشئ صفًّا وتُرجعه بناءً على المعايير التالية:</p>
</blockquote>
<ol>
<li>العنصر الأول في الصف أصغر الوسائط</li>
<li>العنصر الثاني في الصف أكبر الوسائط</li>
<li>العنصر الثالث في الصف هو مجموع الوسائط</li>
</ol>
<p>مثال على استخدامها:</p>
<pre><code class="language-python">
<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    <span class="hljs-built_in">print</span>(create_tuple(<span class="hljs-number">5</span>, <span class="hljs-number">3</span>, -<span class="hljs-number">1</span>))

</code></pre>
<pre><code>(-1, 5, 7)
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: أكبر الأشخاص سنًّا</strong></p>
<p>اكتب دالة اسمها <code>oldest_person(people: list)</code>، تأخذ قائمة من الصفوف كوسيط لها. وفي كل صف يكون العنصر الأول اسم شخص، ويكون العنصر الثاني سنة ميلاده. وينبغي أن تجد الدالة أقدم شخص في القائمة وتُرجع اسمه.</p>
</blockquote>
<p>مثال على الدالة وهي تعمل:</p>
<pre><code class="language-python">p1 = (<span class="hljs-string">&quot;Adam&quot;</span>, <span class="hljs-number">1977</span>)
p2 = (<span class="hljs-string">&quot;Ellen&quot;</span>, <span class="hljs-number">1985</span>)
p3 = (<span class="hljs-string">&quot;Mary&quot;</span>, <span class="hljs-number">1953</span>)
p4 = (<span class="hljs-string">&quot;Ernest&quot;</span>, <span class="hljs-number">1997</span>)
people = [p1, p2, p3, p4]

<span class="hljs-built_in">print</span>(oldest_person(people))
</code></pre>
<pre><code>Mary
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: الأشخاص الأكبر سنًّا</strong></p>
<p>في هذا التمرين نتعامل مع الصفوف تمامًا كتلك الموصوفة في التمرين السابق.</p>
</blockquote>
<p>اكتب دالة اسمها <code>older_people(people: list, year: int)</code>، تختار كل الأشخاص في القائمة الذين وُلدوا <em>قبل</em> السنة المعطاة كوسيط. وينبغي أن تُرجع الدالة أسماء هؤلاء الأشخاص في قائمة جديدة.</p>
<p>مثال على استخدامها:</p>
<pre><code class="language-python">p1 = (<span class="hljs-string">&quot;Adam&quot;</span>, <span class="hljs-number">1977</span>)
p2 = (<span class="hljs-string">&quot;Ellen&quot;</span>, <span class="hljs-number">1985</span>)
p3 = (<span class="hljs-string">&quot;Mary&quot;</span>, <span class="hljs-number">1953</span>)
p4 = (<span class="hljs-string">&quot;Ernest&quot;</span>, <span class="hljs-number">1997</span>)
people = [p1, p2, p3, p4]

older = older_people(people, <span class="hljs-number">1979</span>)
<span class="hljs-built_in">print</span>(older)
</code></pre>
<pre><code>[ 'Adam', 'Mary' ]
</code></pre>
<h2 id="ما-الغرض-من-الصف">ما الغرض من الصف؟</h2>
<p>الصفوف مثالية حين تكون هناك مجموعة قيم مترابطة بطريقة ما. فمثلًا، حين نحتاج إلى التعامل مع إحداثيتي x وy لنقطة، يكون الصف خيارًا طبيعيًا، لأن الإحداثيات تتكون دائمًا من قيمتين:</p>
<pre><code class="language-python">point = (<span class="hljs-number">10</span>, <span class="hljs-number">20</span>)
</code></pre>
<p>تقنيًا، من الممكن بالطبع استخدام قائمة لتخزين هذه القيم أيضًا:</p>
<pre><code class="language-python">point = [<span class="hljs-number">10</span>, <span class="hljs-number">20</span>]
</code></pre>
<p>القائمة مجموعة عناصر متتالية بترتيب معيّن. كما أن حجم القائمة قد يتغيّر. وحين نخزّن إحداثيات نقطة، فإننا نريد تخزين إحداثيتي x وy تحديدًا، لا قائمة اعتباطية تحتوي على تلك القيم.</p>
<p>ولأن الصفوف غير قابلة للتغيير، بخلاف القوائم، يمكن استخدامها كمفاتيح في قاموس. وتنشئ الشيفرة التالية قاموسًا، تكون مفاتيحه نقاطًا إحداثية:</p>
<pre><code class="language-python">points = {}
points[(<span class="hljs-number">3</span>, <span class="hljs-number">5</span>)] = <span class="hljs-string">&quot;monkey&quot;</span>
points[(<span class="hljs-number">5</span>, <span class="hljs-number">0</span>)] = <span class="hljs-string">&quot;banana&quot;</span>
points[(<span class="hljs-number">1</span>, <span class="hljs-number">2</span>)] = <span class="hljs-string">&quot;harpsichord&quot;</span>
<span class="hljs-built_in">print</span>(points[(<span class="hljs-number">3</span>, <span class="hljs-number">5</span>)])
</code></pre>
<pre><code>monkey
</code></pre>
<p>لن <em>تعمل</em> محاولة تعريف قاموس مشابه باستخدام القوائم:</p>
<pre><code class="language-python">points = {}
points[[<span class="hljs-number">3</span>, <span class="hljs-number">5</span>]] = <span class="hljs-string">&quot;monkey&quot;</span>
points[[<span class="hljs-number">5</span>, <span class="hljs-number">0</span>]] = <span class="hljs-string">&quot;banana&quot;</span>
points[[<span class="hljs-number">1</span>, <span class="hljs-number">2</span>]] = <span class="hljs-string">&quot;harpsichord&quot;</span>
<span class="hljs-built_in">print</span>(points[[<span class="hljs-number">3</span>, <span class="hljs-number">5</span>]])
</code></pre>
<pre><code>TypeError: unhashable type: 'list'
</code></pre>
<h2 id="الصفوف-دون-أقواس">الصفوف دون أقواس</h2>
<p>الأقواس ليست ضرورية تمامًا عند تعريف الصفوف. وإسنادا المتغيّرين التاليان متطابقان في نتيجتيهما:</p>
<pre><code class="language-python">numbers = (<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>)
</code></pre>
<pre><code class="language-python">numbers = <span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>
</code></pre>
<p>وهذا يعني أننا نستطيع أيضًا إعادة عدة قيم بسهولة باستخدام الصفوف. ولنعُد إلى المثال التالي:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">minmax</span>(<span class="hljs-params">my_list</span>):
  <span class="hljs-keyword">return</span> <span class="hljs-built_in">min</span>(my_list), <span class="hljs-built_in">max</span>(my_list)

my_list = [<span class="hljs-number">33</span>, <span class="hljs-number">5</span>, <span class="hljs-number">21</span>, <span class="hljs-number">7</span>, <span class="hljs-number">88</span>, <span class="hljs-number">312</span>, <span class="hljs-number">5</span>]

min_value, max_value = minmax(my_list)
<span class="hljs-built_in">print</span>(<span class="hljs-string">f&quot;The smallest item is <span class="hljs-subst">{min_value}</span> and the greatest item is <span class="hljs-subst">{max_value}</span>&quot;</span>)
</code></pre>
<pre><code>The smallest item is 5 and the greatest item is 312
</code></pre>
<p>تُرجع هذه الدالة قيمتين في صف. وتُسنَد القيمة المُرجَعة إلى متغيّرين دفعة واحدة:</p>
<pre><code class="language-python">min_value, max_value = minmax(my_list)
</code></pre>
<p>قد تجعل استخدام الأقواس الصياغة أوضح. فعلى الجانب الأيسر من جملة الإسناد لدينا أيضًا صف يحتوي على اسمي متغيّرين. وتُسنَد القيم الموجودة داخل الصف الذي تُرجعه الدالة إلى هذين المتغيّرين.</p>
<pre><code class="language-python">(min_value, max_value) = minmax(my_list)
</code></pre>
<p>قد تذكر تابع القاموس <code>items</code> في القسم السابق. استخدمناه للوصول إلى جميع المفاتيح والقيم المخزّنة في القاموس:</p>
<pre><code class="language-python">my_dictionary = {}

my_dictionary[<span class="hljs-string">&quot;apina&quot;</span>] = <span class="hljs-string">&quot;monkey&quot;</span>
my_dictionary[<span class="hljs-string">&quot;banaani&quot;</span>] = <span class="hljs-string">&quot;banana&quot;</span>
my_dictionary[<span class="hljs-string">&quot;cembalo&quot;</span>] = <span class="hljs-string">&quot;harpsichord&quot;</span>

<span class="hljs-keyword">for</span> key, value <span class="hljs-keyword">in</span> my_dictionary.items():
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;key:&quot;</span>, key)
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;value:&quot;</span>, value)
</code></pre>
<p>الصفوف تعمل هنا أيضًا. فالتابع <code>my_dictionary.items()</code> يُرجع كل زوج من مفتاح وقيمة على هيئة صف، حيث يكون العنصر الأول هو المفتاح والعنصر الثاني هو القيمة.</p>
<p>ومن حالات الاستخدام الشائعة الأخرى للصفوف تبديل قيم متغيّرين:</p>
<pre><code class="language-python">number1, number2 = number2, number1
</code></pre>
<p>تبدل جملة الإسناد أعلاه القيم المخزّنة في المتغيّرين <code>number1</code> و<code>number2</code>. والنتيجة مطابقة تمامًا لما تتحقّق منه الشيفرة التالية باستخدام متغيّر مساعد:</p>
<pre><code class="language-python">helper_var = number1
number1 = number2
number2 = helper_var
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: قاعدة بيانات الطلاب</strong></p>
<p>في هذه السلسلة من التمارين ستُنشئ قاعدة بيانات طلاب بسيطة. وقبل أن تبدأ، يُرجى أن تقرأ التعليمات وتفكّر فيما إذا كانت هناك حاجة إلى أي هياكل بيانات لتنظيم البيانات التي يخزّنها برنامجك.</p>
</blockquote>
<h4>إضافة الطلاب</h4>
<p>اكتب أولًا دالة اسمها <code>add_student</code>، تضيف طالبًا جديدًا إلى قاعدة البيانات. واكتب أيضًا نسخة أوّلية من الدالة <code>print_student</code>، التي تطبع معلومات طالب واحد.</p>
<p>تُستخدم هاتان الدالتان على النحو التالي:</p>
<pre><code class="language-python">students = {}
add_student(students, <span class="hljs-string">&quot;Peter&quot;</span>)
add_student(students, <span class="hljs-string">&quot;Eliza&quot;</span>)
print_student(students, <span class="hljs-string">&quot;Peter&quot;</span>)
print_student(students, <span class="hljs-string">&quot;Eliza&quot;</span>)
print_student(students, <span class="hljs-string">&quot;Jack&quot;</span>)
</code></pre>
<p>ينبغي أن يطبع برنامجك الآن ما يلي</p>
<pre><code>Peter:
 no completed courses
Eliza:
 no completed courses
Jack: no such person in the database
</code></pre>
<h4>إضافة المواد المنجَزة</h4>
<p>اكتب دالة اسمها <code>add_course</code>، تضيف مادة منجَزة إلى معلومات طالب معيّن في قاعدة البيانات. وبيانات المادة صف يتكوّن من اسم المادة والدرجة:</p>
<pre><code class="language-python">students = {}
add_student(students, <span class="hljs-string">&quot;Peter&quot;</span>)
add_course(students, <span class="hljs-string">&quot;Peter&quot;</span>, (<span class="hljs-string">&quot;Introduction to Programming&quot;</span>, <span class="hljs-number">3</span>))
add_course(students, <span class="hljs-string">&quot;Peter&quot;</span>, (<span class="hljs-string">&quot;Advanced Course in Programming&quot;</span>, <span class="hljs-number">2</span>))
print_student(students, <span class="hljs-string">&quot;Peter&quot;</span>)
</code></pre>
<p>بعد إضافة بعض المواد، تتغيّر المعلومات المطبوعة:</p>
<pre><code>Peter:
 2 completed courses:
  Introduction to Programming 3
  Advanced Course in Programming 2
 average grade 2.5
</code></pre>
<h4>إعادة المواد</h4>
<p>ينبغي تجاهل المواد التي درجتها 0 عند إضافة بيانات مادة. وإضافةً إلى ذلك، إذا كانت المادة موجودة بالفعل في قاعدة البيانات ضمن معلومات ذلك الطالب المعيّن، فلا ينبغي أبدًا خفض الدرجة المسجّلة في قاعدة البيانات إذا أُعيدت المادة.</p>
<pre><code class="language-python">students = {}
add_student(students, <span class="hljs-string">&quot;Peter&quot;</span>)
add_course(students, <span class="hljs-string">&quot;Peter&quot;</span>, (<span class="hljs-string">&quot;Introduction to Programming&quot;</span>, <span class="hljs-number">3</span>))
add_course(students, <span class="hljs-string">&quot;Peter&quot;</span>, (<span class="hljs-string">&quot;Advanced Course in Programming&quot;</span>, <span class="hljs-number">2</span>))
add_course(students, <span class="hljs-string">&quot;Peter&quot;</span>, (<span class="hljs-string">&quot;Data Structures and Algorithms&quot;</span>, <span class="hljs-number">0</span>))
add_course(students, <span class="hljs-string">&quot;Peter&quot;</span>, (<span class="hljs-string">&quot;Introduction to Programming&quot;</span>, <span class="hljs-number">2</span>))
print_student(students, <span class="hljs-string">&quot;Peter&quot;</span>)
</code></pre>
<pre><code>Peter:
 2 completed courses:
  Introduction to Programming 3
  Advanced Course in Programming 2
 average grade 2.5
</code></pre>
<h4>ملخّص قاعدة البيانات</h4>
<p>اكتب دالة اسمها <code>summary</code>، تطبع ملخّصًا استنادًا إلى جميع المعلومات المخزّنة في قاعدة البيانات.</p>
<pre><code class="language-python">students = {}
add_student(students, <span class="hljs-string">&quot;Peter&quot;</span>)
add_student(students, <span class="hljs-string">&quot;Eliza&quot;</span>)
add_course(students, <span class="hljs-string">&quot;Peter&quot;</span>, (<span class="hljs-string">&quot;Data Structures and Algorithms&quot;</span>, <span class="hljs-number">1</span>))
add_course(students, <span class="hljs-string">&quot;Peter&quot;</span>, (<span class="hljs-string">&quot;Introduction to Programming&quot;</span>, <span class="hljs-number">1</span>))
add_course(students, <span class="hljs-string">&quot;Peter&quot;</span>, (<span class="hljs-string">&quot;Advanced Course in Programming&quot;</span>, <span class="hljs-number">1</span>))
add_course(students, <span class="hljs-string">&quot;Eliza&quot;</span>, (<span class="hljs-string">&quot;Introduction to Programming&quot;</span>, <span class="hljs-number">5</span>))
add_course(students, <span class="hljs-string">&quot;Eliza&quot;</span>, (<span class="hljs-string">&quot;Introduction to Computer Science&quot;</span>, <span class="hljs-number">4</span>))
summary(students)
</code></pre>
<p>ينبغي أن يطبع هذا ما يلي</p>
<pre><code>students 2
most courses completed 3 Peter
best average grade 4.5 Eliza
</code></pre>
<blockquote>
<p><strong>تمرين برمجي: مربع من الحروف</strong></p>
<p>هذا التمرين الأخير في هذا الجزء مسألة حلّ تطلبات متطلّبة نسبيًا. ويمكن حلّها بطرق مختلفة كثيرة. ورغم أن هذا القسم الحالي من المادة يتناول الصفوف، فالصفوف ليست بالضرورة أفضل طريقة للانطلاق في حلّها.</p>
</blockquote>
<p>اكتب برنامجًا يطبع مربعًا من الحروف على النحو المبيّن في الأمثلة أدناه. ويمكنك أن تفترض أن عدد الطبقات لن يتجاوز 26.</p>
<pre><code>CCCCC
CBBBC
CBABC
CBBBC
CCCCC
</code></pre>
<pre><code>DDDDDDD
DCCCCCD
DCBBBCD
DCBABCD
DCBBBCD
DCCCCCD
DDDDDDD
</code></pre>
<p><strong>ملحوظة:</strong> لا يطلب منك هذا التمرين كتابة أي دوال، لذا ينبغي <strong>ألّا</strong> تضع أي شيفرة داخل كتلة <code>if __name__ == &quot;__main__&quot;</code>.</p>
<!---
اختبار لمراجعة محتويات هذا القسم:

> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 69694e01-4c47-5b9d-8a00-b0d96a477dc7)

-->
<p>يُرجى الرد على استبيان سريع حول مادة هذا الأسبوع.</p>
<blockquote>
<p><strong>اختبار:</strong> (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 751a95a2-e308-58a0-8283-74fbef6259ed)</p>
</blockquote>
`,o={book:s,chapter:n,chapterTitle:a,slug:p,title:e,headings:t,html:l};export{s as book,n as chapter,a as chapterTitle,o as default,t as headings,l as html,p as slug,e as title};
