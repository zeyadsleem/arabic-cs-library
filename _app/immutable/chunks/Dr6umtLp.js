const n="mit-6100l",s="recitations",e="الجلسات التطبيقية",l="rec9",a="الجلسة التطبيقية 9: البرمجة الكائنية والوراثة",i=[{depth:2,id:"المصادر-والنسبة-والترخيص",text:"المصادر والنسبة والترخيص"},{depth:2,id:"المحاضرة-المرتبطة",text:"المحاضرة المرتبطة"},{depth:2,id:"تذكيرات-reminders",text:"تذكيرات (Reminders)"},{depth:2,id:"مراجعة-الأسبوعين-الماضيين",text:"مراجعة الأسبوعين الماضيين"},{depth:2,id:"البرمجة-الكينونية-الموجهة-بالكائنات-object-oriented-programming",text:"البرمجة الكينونية الموجّهة بالكائنات (Object Oriented Programming)"},{depth:3,id:"الأصناف-classes",text:"الأصناف (Classes)"},{depth:3,id:"استعمال-صنف-using-a-class",text:"استعمال صنف (Using a class)"},{depth:3,id:"دوال-الإسناد-getter-and-setter-methods",text:"دوال الإسناد (Getter and Setter Methods)"},{depth:3,id:"الوراثة-والتسلسلات-inheritance-amp-hierarchies",text:"الوراثة والتسلسلات (Inheritance &amp; Hierarchies)"}],t=`<h1>الجلسة التطبيقية 9 (Recitation 9)</h1>
<h2 id="المصادر-والنسبة-والترخيص">المصادر والنسبة والترخيص</h2>
<p>المادة الأصلية: <strong>آنا بيل (Ana Bell)</strong>، <strong>MIT OpenCourseWare (MIT OCW)</strong>، معهد ماساتشوستس للتكنولوجيا، مقرر <strong>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python</strong>، <strong>خريف 2022 (Fall 2022)</strong>.</p>
<ul>
<li><a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_rec09_zip/">صفحة الجلسة الرسمية على OCW</a>.</li>
</ul>
<p>هذه ترجمة وتكييف عربي غير رسمي وفق <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">رخصة CC BY-NC-SA 4.0: النسبة–غير التجاري–المشاركة بالمثل</a>، ولا تعني اعتمادًا أو تأييدًا من MIT أو MIT OCW. <a href="https://ocw.mit.edu/terms/">شروط الاستخدام والاستشهاد</a>.</p>
<p><strong>منهج الترجمة:</strong> لكل عنوان في الملخّص الأصلي عنوان مستقل، وحُفظ ترتيب العناوين والمحاور والتذكيرات والأمثلة كما في الأصل. الشيفرة محفوظة بالإنجليزية، ولم تُترجَم أسماء الدوال ولا الكلمات المفتاحية ولا أسماء المتغيّرات. لم تُضمَّن صور.</p>
<p><strong>ملاحظة المترجم:</strong> المصدر ملف Word. يعرض المستند أربعة مقاطع على شكل صور لشيفرة مع تعليقات توضيحية بالأحمر، فنُقلت الشيفرة نفسها نصًّا في مواضعها، وذُكرت التعليقات التوضيحية لكلّ صورة عند موضعها.</p>
<h2 id="المحاضرة-المرتبطة">المحاضرة المرتبطة</h2>
<p>تُرافق هذه الجلسة التطبيقية <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-20-fitness-tracker-object-oriented-programming-example/">المحاضرة 20: مثال البرمجة الكينونية الموجّهة بالكائنات — متتبّع اللياقة البدنية (Fitness Tracker Object-Oriented Programming Example)</a>. وهي مراجعة للأسبوعين الماضيين، وتغطّي البرمجة الكينونية الموجّهة بالكائنات (OOP) والأصناف (Classes) ودوال الإسناد (Getter and Setter) والوراثة (Inheritance).</p>
<h2 id="تذكيرات-reminders">تذكيرات (Reminders)</h2>
<p>6.100L، الجلسة التطبيقية 9.</p>
<ul>
<li>مسابقة MQ9 يوم الاثنين 11/21.</li>
</ul>
<h2 id="مراجعة-الأسبوعين-الماضيين">مراجعة الأسبوعين الماضيين</h2>
<h2 id="البرمجة-الكينونية-الموجهة-بالكائنات-object-oriented-programming">البرمجة الكينونية الموجّهة بالكائنات (Object Oriented Programming)</h2>
<ul>
<li>تتيح لك الكائنات (objects) تخزين البيانات في بايثون.</li>
<li>كلّ شيء في بايثون كائن.</li>
<li>يعرّف الصنف (class) نوعًا من الكائنات.
<ul>
<li>حتى الآن رأينا في الصفّ أصناف البناء المدمجة التالية: <code>int</code> و<code>float</code> و<code>string</code> و<code>list</code> و<code>tuples</code> و<code>dictionaries</code>.</li>
</ul>
</li>
<li>الكائن نسخة (instance) من صنفه.
<ul>
<li>مثلًا: 3 و&quot;hello&quot; و<code>[1,2,3]</code> كلها نسخ من أصناف.</li>
</ul>
</li>
<li>مزايا البرمجة الكينونية الموجّهة بالكائنات:
<ul>
<li>تتيح لك تجميع البيانات في حزم (packages).</li>
<li>تخفّض تعقيد شيفرتك، فتصير إعادة استخدام الشيفرة سهلة.</li>
<li>تتيح لك تنفيذ سلوك كلّ صنف واختباره على حدة.</li>
</ul>
</li>
</ul>
<h3 id="الأصناف-classes">الأصناف (Classes)</h3>
<ul>
<li>طريقة لإنشاء نوع بيانات خاصّ بك باستخدام أنواع البيانات المدمجة كم لبنات.
<ul>
<li>أمثلة من الحياة الواقعية: مصعد، موظف، طابور في محلّ، كعكة فطور…</li>
</ul>
</li>
<li>السمات (attributes) هي البيانات والإجراءات التي تنتمي إلى الصنف.
<ul>
<li>سمات البيانات (Data attributes): الكائنات التي يتكوّن منها الصنف.</li>
<li>سمات الإجراء (Methods/procedural attributes): دوال لا تعمل إلا مع هذا الصنف.</li>
</ul>
</li>
<li><code>self</code>:
<ul>
<li>تشير إلى النسخة التي استُدعيت عليها الدالة.</li>
<li>وهي دائمًا المعامل الأوّل عند تعريف دالة.</li>
<li>ولا تُستعمل خارج تعريف الصنف.</li>
</ul>
</li>
<li>إنشاء صنف:
<ul>
<li>
<p>عرّف اسم الصنف.</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Coordinate</span>(<span class="hljs-title class_ inherited__">object</span>):
    <span class="hljs-comment">#define attributes here</span>
</code></pre>
<p><strong>ملاحظة المترجم:</strong> هذا المقطع صورة في الأصل. وتعليقات الصورة بالأحمر: على <code>class</code> التعليق «تعريف الصنف»، وعلى <code>Coordinate</code> التعليق «الاسم/النوع»، وعلى <code>object</code> التعليق «الصنف الأب».</p>
</li>
<li>
<p>عرّف سمات الصنف، وعرّف كيف تنشئ نسخة من الصنف باستخدام الدالة <code>__init__</code>.</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Coordinate</span>(<span class="hljs-title class_ inherited__">object</span>):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, x, y</span>):
        <span class="hljs-variable language_">self</span>.x = x
        <span class="hljs-variable language_">self</span>.y = y
</code></pre>
<p><strong>ملاحظة المترجم:</strong> هذا المقطع صورة في الأصل. وتعليقات الصورة بالأحمر: على <code>__init__</code> التعليق «دالة خاصة لإنشاء نسخة، وتحمل شرطتين سفليّتين»، وعلى <code>x, y</code> التعليق «البيانات التي تهيّئ كائن Coordinate»، وعلى <code>self</code> التعليق «معامل للإشارة إلى نسخة من الصنف»، وعلى <code>self.x</code> و<code>self.y</code> التعليق «سمتا بيانات لكلّ كائن Coordinate».</p>
</li>
<li>
<p>عرّف دوال أخرى، ولا يلزم أن تبدأ هذه الدوال بـ <code>__</code>.</p>
<ul>
<li>هذه الدوال لا تعمل إلا مع هذا الصنف.</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Coordinate</span>(<span class="hljs-title class_ inherited__">object</span>):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, x, y</span>):
        <span class="hljs-variable language_">self</span>.x = x
        <span class="hljs-variable language_">self</span>.y = y
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">distance</span>(<span class="hljs-params">self, other</span>):
        x_diff_sq = (<span class="hljs-variable language_">self</span>.x-other.x)**<span class="hljs-number">2</span>
        y_diff_sq = (<span class="hljs-variable language_">self</span>.y-other.y)**<span class="hljs-number">2</span>
        <span class="hljs-keyword">return</span> (x_diff_sq + y_diff_sq)**<span class="hljs-number">0.5</span>
</code></pre>
<p><strong>ملاحظة المترجم:</strong> هذا المقطع صورة في الأصل. وتعليقات الصورة بالأحمر: على <code>self</code> التعليق «تستعمله للإشارة إلى أيّ نسخة»، وعلى <code>other</code> التعليق «معامل آخر للدالة»، وعلى <code>self.x</code> التعليق «التدوين بالنقطة للوصول إلى البيانات».</p>
</li>
</ul>
</li>
</ul>
<h3 id="استعمال-صنف-using-a-class">استعمال صنف (Using a class)</h3>
<ul>
<li>أولًا أنشئ نسخة جديدة من الصنف:</li>
</ul>
<pre><code class="language-python"><span class="hljs-comment"># Using the example Coordinate class above</span>
c1 = Coordinate(<span class="hljs-number">1</span>,<span class="hljs-number">1</span>)
c2 = Coordinate(<span class="hljs-number">2</span>,<span class="hljs-number">1</span>)
</code></pre>
<ul>
<li>ثم نفّذ عمليات على النسخ باستعمال دوال الصنف:</li>
</ul>
<pre><code class="language-python">c1.distance(c2)
</code></pre>
<ul>
<li>لكي تستطيع استدعاء <code>print</code> على نسخة من صنفك، عليك تعريف الدالة <code>__str__</code>.
<ul>
<li>وهناك معاملات خاصّة أخرى (<code>__len__</code> و<code>__eq__</code> إلخ… ← راجع شرائح المحاضرة للتفصيل).</li>
</ul>
</li>
<li>يمكنك استعمال <code>isinstance()</code> للتحقّق ممّا إذا كانت النسخة كائنًا من صنف معيّن.</li>
<li>على العموم، يعرّف الصنف التمثيل (representation) والدوال المشتركة بين كلّ نسخ الصنف، في حين الكائن نسخة محدّدة (SPECIFIC instance) من الصنف.</li>
<li>على العموم، تريد إبقاء التمثيل الداخلي (internal representation) لصنفك مخفيًّا، لمنع الهجمات العدائية (adversarial attacks) والأخطاء.
<ul>
<li>التمثيل الداخلي يعني ما هو مكتوب في دالة <code>__init__</code>.</li>
</ul>
</li>
<li>متغيّرات الصنف (class variables): مشتركة بين كلّ أعضاء الصنف.
<ul>
<li>تُعرَّف خارج دالة <code>__init__</code>.</li>
</ul>
</li>
</ul>
<h3 id="دوال-الإسناد-getter-and-setter-methods">دوال الإسناد (Getter and Setter Methods)</h3>
<ul>
<li>ينبغي استعمال دوال الإسناد (Getter and Setter) خارج الأصناف للوصول إلى سمات البيانات.</li>
<li>الوصول إلى السمات بهذه الطريقة هو أسلوب أفضل، ويجعل الشيفرة أسهل في الصيانة ويساعد في منع الأخطاء.</li>
</ul>
<h3 id="الوراثة-والتسلسلات-inheritance-amp-hierarchies">الوراثة والتسلسلات (Inheritance &amp; Hierarchies)</h3>
<p><strong>لماذا نستعمل الوراثة؟</strong></p>
<ul>
<li>تتيح لك توسيع صنف بقدرات جديدة أو مختلفة.</li>
<li>تعيد استخدام الشيفرة.</li>
<li>المشتركات صريحة في الصنف الأب، والفروق صريحة في الصنف الابن.</li>
</ul>
<p><strong>البنية وكيف تعمل:</strong></p>
<ul>
<li>تنشئ علاقة وراثة بين صنفين بأن تعرّف ما يوضع في المعامل ضمن تعريف الصنف.</li>
</ul>
<pre><code class="language-python"><span class="hljs-comment"># Define parent class</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">CreditCard</span>(<span class="hljs-title class_ inherited__">object</span>):

<span class="hljs-comment"># Define child class:</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">RewardCard</span>(<span class="hljs-title class_ inherited__">CreditCard</span>):
</code></pre>
<p><strong>ملاحظة المترجم:</strong> هذا المقطع صورة في الأصل، وهي تعرّف الصنف الأب <code>CreditCard</code> ثم الصنف الابن <code>RewardCard</code>.</p>
<ul>
<li>الصنف الابن يرث كلّ دوال الصنف الأب.
<ul>
<li>يمكننا تعريف دوال جديدة في الصنف الابن لتوسيع السلوك.</li>
<li>يمكننا إعادة تعريف دوال معرَّفة في الصنف الأب لتعديل السلوك.</li>
<li>عند استدعاء دالة على نسخة من صنف، يحاول المفسر (interpreter) أن يجد الدالة على مستوى الصنف ثم يفحص الصنف الأب.
<ul>
<li>وهذا يعني أنّه إذا عُرِّفت دالتان بالاسم نفسه، فإنّ الدالة في الصنف الابن هي السائدة.</li>
</ul>
</li>
</ul>
</li>
</ul>
`,c={book:n,chapter:s,chapterTitle:e,slug:l,title:a,headings:i,html:t};export{n as book,s as chapter,e as chapterTitle,c as default,i as headings,t as html,l as slug,a as title};
