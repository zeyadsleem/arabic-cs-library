const s="mit-6100l",n="lecture-19",a="المحاضرة 19: الوراثة (Inheritance)",l="notes",e="المحاضرة 19: الوراثة (Inheritance)",t=[{depth:2,id:"المصادر-والنسبة-والترخيص",text:"المصادر والنسبة والترخيص"},{depth:2,id:"الشريحة-1-عنوان-المحاضرة",text:"الشريحة 1: عنوان المحاضرة"},{depth:2,id:"الشريحة-2-لماذا-نستخدم-البرمجة-كائنية-التوجه-oop-وأصناف-الكائنات",text:"الشريحة 2: لماذا نستخدم البرمجة كائنية التوجه (OOP) وأصناف الكائنات؟"},{depth:2,id:"الشريحة-3-لماذا-نستخدم-البرمجة-كائنية-التوجه-oop-وأصناف-الكائنات-تكرار",text:"الشريحة 3: لماذا نستخدم البرمجة كائنية التوجه (OOP) وأصناف الكائنات؟ (تكرار)"},{depth:2,id:"الشريحة-4-مجموعات-الكائنات-لها-سمات-مراجعة",text:"الشريحة 4: مجموعات الكائنات لها سمات (مراجعة)"},{depth:2,id:"الشريحة-5-كيف-تعرف-صنفا-مراجعة",text:"الشريحة 5: كيف تُعرِّف صنفًا (مراجعة)"},{depth:2,id:"الشريحة-6-دوال-الجلب-getters-ودوال-التعيين-setters",text:"الشريحة 6: دوال الجلب (Getters) ودوال التعيين (Setters)"},{depth:2,id:"الشريحة-7-دوال-الجلب-ودوال-التعيين-تتمة",text:"الشريحة 7: دوال الجلب ودوال التعيين (تتمة)"},{depth:2,id:"الشريحة-8-النسخة-instance-وصيغة-النقطة-مراجعة",text:"الشريحة 8: النسخة (instance) وصيغة النقطة (مراجعة)"},{depth:2,id:"الشريحة-9-إخفاء-المعلومات-information-hiding",text:"الشريحة 9: إخفاء المعلومات (Information Hiding)"},{depth:2,id:"الشريحة-10-تغيير-التمثيل-الداخلي",text:"الشريحة 10: تغيير التمثيل الداخلي"},{depth:2,id:"الشريحة-11-بايثون-ليست-متقنة-في-إخفاء-المعلومات",text:"الشريحة 11: بايثون ليست متقنة في إخفاء المعلومات"},{depth:2,id:"الشريحة-12-استخدام-صنفنا-الجديد",text:"الشريحة 12: استخدام صنفنا الجديد"},{depth:2,id:"الشريحة-13-استخدام-صنفنا-الجديد-تتمة",text:"الشريحة 13: استخدام صنفنا الجديد (تتمة)"},{depth:2,id:"الشريحة-14-استخدام-صنفنا-الجديد-تتمة",text:"الشريحة 14: استخدام صنفنا الجديد (تتمة)"},{depth:2,id:"الشريحة-15-جرب-بنفسك",text:"الشريحة 15: جرّب بنفسك!"},{depth:2,id:"الشريحة-16-الفكرة-الكبرى-big-idea",text:"الشريحة 16: الفكرة الكبرى (BIG IDEA)"},{depth:2,id:"الشريحة-17-التسلسلات-الهرمية-hierarchies",text:"الشريحة 17: التسلسلات الهرمية (Hierarchies)"},{depth:2,id:"الشريحة-18-التسلسلات-الهرمية",text:"الشريحة 18: التسلسلات الهرمية"},{depth:2,id:"الشريحة-19-الوراثة-صنف-الأب",text:"الشريحة 19: الوراثة: صنف الأب"},{depth:2,id:"الشريحة-20-الصنف-الابن-cat",text:"الشريحة 20: الصنف الابن Cat"},{depth:2,id:"الشريحة-21-الوراثة-الصنف-الابن",text:"الشريحة 21: الوراثة: الصنف الابن"},{depth:2,id:"الشريحة-22-أي-دالة-تستخدم",text:"الشريحة 22: أي دالة تُستخدم؟"},{depth:2,id:"الشريحة-23-الصنف-الابن-person",text:"الشريحة 23: الصنف الابن Person"},{depth:2,id:"الشريحة-24-تعريف-person",text:"الشريحة 24: تعريف Person"},{depth:2,id:"الشريحة-25-جرب-بنفسك",text:"الشريحة 25: جرّب بنفسك!"},{depth:2,id:"الشريحة-26-الفكرة-الكبرى-big-idea",text:"الشريحة 26: الفكرة الكبرى (BIG IDEA)"},{depth:2,id:"الشريحة-27-الصنف-الابن-student",text:"الشريحة 27: الصنف الابن Student"},{depth:2,id:"الشريحة-28-تعريف-student",text:"الشريحة 28: تعريف Student"},{depth:2,id:"الشريحة-29-الصنف-الابن-rabbit",text:"الشريحة 29: الصنف الابن Rabbit"},{depth:2,id:"الشريحة-30-متغيرات-الصنف-class-variables-والصنف-الابن-rabbit",text:"الشريحة 30: متغيّرات الصنف (Class Variables) والصنف الابن Rabbit"},{depth:2,id:"الشريحة-31-مراجعة-لـ-init-في-rabbit",text:"الشريحة 31: مراجعة لـ __init__ في Rabbit"},{depth:2,id:"الشريحة-32-مراجعة-لـ-init-في-rabbit-تتمة",text:"الشريحة 32: مراجعة لـ __init__ في Rabbit (تتمة)"},{depth:2,id:"الشريحة-33-مراجعة-لـ-init-في-rabbit-تتمة",text:"الشريحة 33: مراجعة لـ __init__ في Rabbit (تتمة)"},{depth:2,id:"الشريحة-34-دوال-الجلب-في-rabbit",text:"الشريحة 34: دوال الجلب في Rabbit"},{depth:2,id:"الشريحة-35-العمل-مع-أنواعك-الخاصة",text:"الشريحة 35: العمل مع أنواعك الخاصة"},{depth:2,id:"الشريحة-36-مراجعة-لـ-init-في-rabbit-مع",text:"الشريحة 36: مراجعة لـ __init__ في Rabbit مع +"},{depth:2,id:"الشريحة-37-دالة-خاصة-لمقارنة-أرنبين",text:"الشريحة 37: دالة خاصة لمقارنة أرنبين"},{depth:2,id:"الشريحة-38-الفكرة-الكبرى-big-idea",text:"الشريحة 38: الفكرة الكبرى (BIG IDEA)"},{depth:2,id:"الشريحة-39-البرمجة-الكائنية-التوجه-object-oriented-programming",text:"الشريحة 39: البرمجة الكائنية التوجه (Object Oriented Programming)"},{depth:2,id:"الشريحة-40-mit-opencourseware",text:"الشريحة 40: MIT OpenCourseWare"}],p=`<h1>المحاضرة 19: الوراثة (Inheritance)</h1>
<h2 id="المصادر-والنسبة-والترخيص">المصادر والنسبة والترخيص</h2>
<p>هذه ترجمة عربية لمادة مقرّرة من MIT OpenCourseWare:</p>
<blockquote>
<p>Ana Bell. 6.100L Introduction to CS and Programming using Python, Fall 2022. Massachusetts Institute of Technology: MIT OpenCourseWare, https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/. License: CC BY-NC-SA 4.0.</p>
</blockquote>
<ul>
<li>صفحة المحاضرة الرسمية على OCW: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-19-inheritance/">https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-19-inheritance/</a></li>
<li>الشرائح (ملف PDF): <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec19_pdf/">https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec19_pdf/</a> — والملف المباشر: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec19.pdf">https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec19.pdf</a></li>
<li>ملفات الشيفرة للتمرين: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec19_code_py/">https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec19_code_py/</a></li>
<li>النص الكامل (Transcript) للمحاضرة على OCW: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec19/">https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_lec19/</a></li>
<li>رخصة CC BY-NC-SA 4.0: <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">https://creativecommons.org/licenses/by-nc-sa/4.0/</a></li>
<li>شروط الاستخدام في MIT OCW: <a href="https://ocw.mit.edu/terms/">https://ocw.mit.edu/terms/</a></li>
</ul>
<p><strong>منهج الترجمة:</strong> عنوان واحد وترجمة عربية لكل شريحة من شرائح الملف الأصلي (40 شريحة). المواضع التي يعرض فيها النص المستخرَج مخططًا هرميًا (Animal ← Person ← Student، وAnimal ← Rabbit) نُقلت إلى قوائم نصية. الشيفرة وعناوين وثائق الأصناف (docstrings) تُركت بالإنجليزية كما هي. الصور استُبعدت لأن تنويه حقوق النشر في ملف MIT نفسه يذكّر بأن مصادرها غير معروفة وأنها مستثناة من رخصة CC؛ انظر الشريحتين 2 و17.</p>
<h2 id="الشريحة-1-عنوان-المحاضرة">الشريحة 1: عنوان المحاضرة</h2>
<ul>
<li>INHERITANCE</li>
<li>(download slides and .py files to follow along)</li>
<li>6.100L Lecture 19 — Ana Bell</li>
</ul>
<h2 id="الشريحة-2-لماذا-نستخدم-البرمجة-كائنية-التوجه-oop-وأصناف-الكائنات">الشريحة 2: لماذا نستخدم البرمجة كائنية التوجه (OOP) وأصناف الكائنات؟</h2>
<ul>
<li>نحاكي الحياة الواقعية</li>
<li>نجمّع كائنات مختلفة تنتمي إلى النوع نفسه</li>
</ul>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> تحتوي هذه الشريحة على صور لمصادرها غير معروفة، وهي مستثناة من رخصة CC حسب تنويه حقوق النشر على شريحة MIT نفسها:
&quot;Images © sources unknown. All rights reserved. This content is excluded from our Creative Commons license.&quot;
لذلك لم تُنشر الصور، ونُقلت قائمة النقاط النصية فقط. للمزيد: <a href="https://ocw.mit.edu/help/faq-fair-use/">https://ocw.mit.edu/help/faq-fair-use/</a></p>
</blockquote>
<h2 id="الشريحة-3-لماذا-نستخدم-البرمجة-كائنية-التوجه-oop-وأصناف-الكائنات-تكرار">الشريحة 3: لماذا نستخدم البرمجة كائنية التوجه (OOP) وأصناف الكائنات؟ (تكرار)</h2>
<ul>
<li>نحاكي الحياة الواقعية</li>
<li>نجمّع كائنات مختلفة تنتمي إلى النوع نفسه</li>
</ul>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> الشريحة نفسها بالصور ذات المصادر غير المعروفة، وهي مستثناة من رخصة CC كما في الشريحة السابقة. لم تُنشر الصور.</p>
</blockquote>
<h2 id="الشريحة-4-مجموعات-الكائنات-لها-سمات-مراجعة">الشريحة 4: مجموعات الكائنات لها سمات (مراجعة)</h2>
<ul>
<li><strong>سمات بيانات (Data attributes)</strong>
<ul>
<li>كيف يمكن أن تمثّل كائنك ببيانات؟</li>
<li>ما هو الكائن:
<ul>
<li>لإحداثيَّي (coordinate): قيمتَي <code>x</code> و<code>y</code></li>
<li>لحيوان (animal): العمر (age)</li>
</ul>
</li>
</ul>
</li>
<li><strong>سمات إجرائية (Procedural attributes)</strong> — أي السلوك أو العمليات أو الدوال (methods):
<ul>
<li>كيف يمكن أن يتفاعل أحدهم مع الكائن؟</li>
<li>ماذا يفعل:
<ul>
<li>لإحداثيَّين: إيجاد المسافة بين إحداثيين</li>
<li>لحيوان: طباعة كم مضى على ولادته</li>
</ul>
</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-5-كيف-تعرف-صنفا-مراجعة">الشريحة 5: كيف تُعرِّف صنفًا (مراجعة)</h2>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Animal</span>(<span class="hljs-title class_ inherited__">object</span>):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, age</span>):
        <span class="hljs-variable language_">self</span>.age = age
        <span class="hljs-variable language_">self</span>.name = <span class="hljs-literal">None</span>

myanimal = Animal(<span class="hljs-number">3</span>)
</code></pre>
<h2 id="الشريحة-6-دوال-الجلب-getters-ودوال-التعيين-setters">الشريحة 6: دوال الجلب (Getters) ودوال التعيين (Setters)</h2>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Animal</span>(<span class="hljs-title class_ inherited__">object</span>):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, age</span>):
        <span class="hljs-variable language_">self</span>.age = age
        <span class="hljs-variable language_">self</span>.name = <span class="hljs-literal">None</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__str__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;animal:&quot;</span>+<span class="hljs-built_in">str</span>(<span class="hljs-variable language_">self</span>.name)+<span class="hljs-string">&quot;:&quot;</span>+<span class="hljs-built_in">str</span>(<span class="hljs-variable language_">self</span>.age)
</code></pre>
<ul>
<li>يجب استخدام دوال الجلب ودوال التعيين خارج الصنف للوصول إلى سمات البيانات</li>
</ul>
<h2 id="الشريحة-7-دوال-الجلب-ودوال-التعيين-تتمة">الشريحة 7: دوال الجلب ودوال التعيين (تتمة)</h2>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Animal</span>(<span class="hljs-title class_ inherited__">object</span>):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, age</span>):
        <span class="hljs-variable language_">self</span>.age = age
        <span class="hljs-variable language_">self</span>.name = <span class="hljs-literal">None</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__str__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;animal:&quot;</span>+<span class="hljs-built_in">str</span>(<span class="hljs-variable language_">self</span>.name)+<span class="hljs-string">&quot;:&quot;</span>+<span class="hljs-built_in">str</span>(<span class="hljs-variable language_">self</span>.age)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">get_age</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.age

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">get_name</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.name

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">set_age</span>(<span class="hljs-params">self, newage</span>):
        <span class="hljs-variable language_">self</span>.age = newage

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">set_name</span>(<span class="hljs-params">self, newname=<span class="hljs-string">&quot;&quot;</span></span>):
        <span class="hljs-variable language_">self</span>.name = newname
</code></pre>
<ul>
<li>يجب استخدام دوال الجلب ودوال التعيين خارج الصنف للوصول إلى سمات البيانات</li>
</ul>
<h2 id="الشريحة-8-النسخة-instance-وصيغة-النقطة-مراجعة">الشريحة 8: النسخة (instance) وصيغة النقطة (مراجعة)</h2>
<ul>
<li>إنشاء نسخة (instantiation) يُنشئ نسخة من كائن:</li>
</ul>
<pre><code class="language-python">a = Animal(<span class="hljs-number">3</span>)
</code></pre>
<ul>
<li>تُستخدم صيغة النقطة للوصول إلى السمات (بيانات ودوال)، مع أنه الأفضل استخدام دوال الجلب ودوال التعيين للوصول إلى سمات البيانات:</li>
</ul>
<pre><code class="language-python">a.age
a.get_age()
</code></pre>
<h2 id="الشريحة-9-إخفاء-المعلومات-information-hiding">الشريحة 9: إخفاء المعلومات (Information Hiding)</h2>
<ul>
<li>قد يغيّر كاتب تعريف الصنف أسماء متغيّرات سمات البيانات:</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Animal</span>(<span class="hljs-title class_ inherited__">object</span>):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, age</span>):
        <span class="hljs-variable language_">self</span>.years = age

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">get_age</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.years
</code></pre>
<ul>
<li>إذا كنت تصل إلى سمات البيانات خارج الصنف وتغيّر تعريف الصنف، فقد تحصل على أخطاء</li>
<li>خارج الصنف استخدم دوال الجلب ودوال التعيين بدلًا من ذلك</li>
<li>استخدم <code>a.get_age()</code> <strong>وليس</strong> <code>a.age</code>
<ul>
<li>أسلوب جيد</li>
<li>شيفرة سهلة الصيانة</li>
<li>يمنع الأخطاء</li>
</ul>
</li>
</ul>
<h2 id="الشريحة-10-تغيير-التمثيل-الداخلي">الشريحة 10: تغيير التمثيل الداخلي</h2>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Animal</span>(<span class="hljs-title class_ inherited__">object</span>):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, age</span>):
        <span class="hljs-variable language_">self</span>.years = age
        <span class="hljs-variable language_">self</span>.name = <span class="hljs-literal">None</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__str__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;animal:&quot;</span>+<span class="hljs-built_in">str</span>(<span class="hljs-variable language_">self</span>.name)+<span class="hljs-string">&quot;:&quot;</span>+<span class="hljs-built_in">str</span>(<span class="hljs-variable language_">self</span>.age)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">get_age</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.years

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">set_age</span>(<span class="hljs-params">self, newage</span>):
        <span class="hljs-variable language_">self</span>.years = newage

a.get_age()   <span class="hljs-comment"># works</span>
a.age         <span class="hljs-comment"># error</span>
</code></pre>
<ul>
<li>يجب استخدام دوال الجلب ودوال التعيين خارج الصنف للوصول إلى سمات البيانات</li>
</ul>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> السطر <code>return &quot;animal:&quot;+str(self.name)+&quot;:&quot;+str(self.age)</code> في <code>__str__</code> هو منقول حرفيًّا من الملف الأصلي، وهو يُشير إلى <code>self.age</code> رغم إعادة تسمية السمة إلى <code>years</code>. هذا تعارض موجود في مادة MIT نفسها، ونُقل كما هو دون تصحيح؛ أي أن <code>__str__</code> في هذه النسخة يرفع <code>AttributeError</code>. (انظر exercise 19 في ملف الشيفرة.)</p>
</blockquote>
<h2 id="الشريحة-11-بايثون-ليست-متقنة-في-إخفاء-المعلومات">الشريحة 11: بايثون ليست متقنة في إخفاء المعلومات</h2>
<ul>
<li>تتيح لك الوصول إلى البيانات من خارج تعريف الصنف:</li>
</ul>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(a.age)
</code></pre>
<ul>
<li>تتيح لك الكتابة في البيانات من خارج تعريف الصنف:</li>
</ul>
<pre><code class="language-python">a.age = <span class="hljs-string">&#x27;infinite&#x27;</span>
</code></pre>
<ul>
<li>تتيح لك إنشاء سمات بيانات لنسخة من خارج تعريف الصنف:</li>
</ul>
<pre><code class="language-python">a.size = <span class="hljs-string">&quot;tiny&quot;</span>
</code></pre>
<ul>
<li>ليس من الأسلوب الجيد أن تفعل أيًّا من هذه!</li>
</ul>
<h2 id="الشريحة-12-استخدام-صنفنا-الجديد">الشريحة 12: استخدام صنفنا الجديد</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">animal_dict</span>(<span class="hljs-params">L</span>):
    <span class="hljs-string">&quot;&quot;&quot; L is a list
    Returns a dict, d, mappping an int to an Animal object.
    A key in d is all non-negative ints, n, in L. A value
    corresponding to a key is an Animal object with n as its age. &quot;&quot;&quot;</span>
    d = {}
    <span class="hljs-keyword">for</span> n <span class="hljs-keyword">in</span> L:
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">type</span>(n) == <span class="hljs-built_in">int</span> <span class="hljs-keyword">and</span> n &gt;= <span class="hljs-number">0</span>:
            d[n] = Animal(n)
    <span class="hljs-keyword">return</span> d

L = [<span class="hljs-number">2</span>,<span class="hljs-number">5</span>,<span class="hljs-string">&#x27;a&#x27;</span>,-<span class="hljs-number">5</span>,<span class="hljs-number">0</span>]
</code></pre>
<h2 id="الشريحة-13-استخدام-صنفنا-الجديد-تتمة">الشريحة 13: استخدام صنفنا الجديد (تتمة)</h2>
<ul>
<li>بايثون لا تعرف كيف تنادي <code>print</code> على نحو استدعاء ذاتي (recursively)</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">animal_dict</span>(<span class="hljs-params">L</span>):
    <span class="hljs-string">&quot;&quot;&quot; L is a list
    Returns a dict, d, mappping an int to an Animal object.
    A key in d is all non-negative ints n L. A value corresponding
    to a key is an Animal object with n as its age. &quot;&quot;&quot;</span>
    d = {}
    <span class="hljs-keyword">for</span> n <span class="hljs-keyword">in</span> L:
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">type</span>(n) == <span class="hljs-built_in">int</span> <span class="hljs-keyword">and</span> n &gt;= <span class="hljs-number">0</span>:
            d[n] = Animal(n)
    <span class="hljs-keyword">return</span> d

L = [<span class="hljs-number">2</span>,<span class="hljs-number">5</span>,<span class="hljs-string">&#x27;a&#x27;</span>,-<span class="hljs-number">5</span>,<span class="hljs-number">0</span>]
animals = animal_dict(L)
<span class="hljs-built_in">print</span>(animals)
</code></pre>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> لتنسيق النص المستخرَج، ظهر في وثيق الصنف في هذه الشريحة «A key in d is all non-negative ints n L» بينما في الشريحة السابقة «in L.» — النقص الأول خطأ في الأصل المطبوع، وقد نُقل كما هو.</p>
</blockquote>
<h2 id="الشريحة-14-استخدام-صنفنا-الجديد-تتمة">الشريحة 14: استخدام صنفنا الجديد (تتمة)</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">animal_dict</span>(<span class="hljs-params">L</span>):
    <span class="hljs-string">&quot;&quot;&quot; L is a list
    Returns a dict, d, mappping an int to an Animal object.
    A key in d is all non-negative ints n L. A value corresponding
    to a key is an Animal object with n as its age. &quot;&quot;&quot;</span>
    d = {}
    <span class="hljs-keyword">for</span> n <span class="hljs-keyword">in</span> L:
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">type</span>(n) == <span class="hljs-built_in">int</span> <span class="hljs-keyword">and</span> n &gt;= <span class="hljs-number">0</span>:
            d[n] = Animal(n)
    <span class="hljs-keyword">return</span> d

L = [<span class="hljs-number">2</span>,<span class="hljs-number">5</span>,<span class="hljs-string">&#x27;a&#x27;</span>,-<span class="hljs-number">5</span>,<span class="hljs-number">0</span>]
animals = animal_dict(L)
<span class="hljs-keyword">for</span> n,a <span class="hljs-keyword">in</span> animals.items():
    <span class="hljs-built_in">print</span>(<span class="hljs-string">f&#x27;key <span class="hljs-subst">{n}</span> with val <span class="hljs-subst">{a}</span>&#x27;</span>)
</code></pre>
<h2 id="الشريحة-15-جرب-بنفسك">الشريحة 15: جرّب بنفسك!</h2>
<ul>
<li>اكتب دالة تفي بهذه المواصفة</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">make_animals</span>(<span class="hljs-params">L1, L2</span>):
    <span class="hljs-string">&quot;&quot;&quot; L1 is a list of ints and L2 is a list of str
    L1 and L2 have the same length

    Creates a list of Animals the same length as L1 and L2.
    An animal object at index i has the age and name

    corresponding to the same index in L1 and L2, respectively. &quot;&quot;&quot;</span>
</code></pre>
<p>للاستخدام:</p>
<pre><code class="language-python"><span class="hljs-comment">#For example:</span>
L1 = [<span class="hljs-number">2</span>,<span class="hljs-number">5</span>,<span class="hljs-number">1</span>]
L2 = [<span class="hljs-string">&quot;blobfish&quot;</span>, <span class="hljs-string">&quot;crazyant&quot;</span>, <span class="hljs-string">&quot;parafox&quot;</span>]
animals = make_animals(L1, L2)
<span class="hljs-built_in">print</span>(animals)
<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> animals:
    <span class="hljs-built_in">print</span>(i)
</code></pre>
<ul>
<li>لاحظ أن هذا يطبع قائمة من كائنات الحيوان (animal objects)</li>
<li>هذه الحلقة تطبع الحيوانات منفردة</li>
</ul>
<h2 id="الشريحة-16-الفكرة-الكبرى-big-idea">الشريحة 16: الفكرة الكبرى (BIG IDEA)</h2>
<ul>
<li>الوصول إلى سمات البيانات (الأشياء المعرَّفة بـ <code>self.xxx</code>) <strong>عن طريق الدوال</strong> — هذا أسلوب أفضل.</li>
</ul>
<h2 id="الشريحة-17-التسلسلات-الهرمية-hierarchies">الشريحة 17: التسلسلات الهرمية (Hierarchies)</h2>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> هذه الشريحة الخالصة رسم لمخطط هرمي، والمحتوى المرئي منها صور لمصادرها غير معروفة وهي مستثناة من رخصة CC حسب تنويه حقوق النشر:
&quot;Images © sources unknown. All rights reserved. This content is excluded from our Creative Commons license.&quot;
لذلك لم تُنشر الصور، ولا يمكنني وصف المخطط المرئي. المحتويات النصية للشرائح المجاورة (18) تعطي التسلسل الهرمي نفسه: <code>Animal</code> ← <code>Person</code> ← <code>Student</code>، و<code>Animal</code> ← <code>Cat</code>، و<code>Animal</code> ← <code>Rabbit</code>.</p>
</blockquote>
<h2 id="الشريحة-18-التسلسلات-الهرمية">الشريحة 18: التسلسلات الهرمية</h2>
<ul>
<li><strong>صنف الأب (Parent class)</strong> — أي الصنف الأعلى (superclass)</li>
<li><strong>صنف الابن (Child class)</strong> — أي الصنف الأدنى (subclass)
<ul>
<li>يرث كل البيانات والسلوكيات من صنف الأب</li>
<li>يضيف معلومات أكثر</li>
<li>يضيف سلوكيات أكثر</li>
<li>يتجاوز (override) سلوكًا</li>
</ul>
</li>
</ul>
<p>المخطط الهرمي كما يظهر في النص المستخرَج:</p>
<ul>
<li><code>Animal</code></li>
<li><code>Person</code> — ابن <code>Animal</code></li>
<li><code>Student</code> — ابن <code>Person</code></li>
<li><code>Cat</code> — ابن <code>Animal</code></li>
<li><code>Rabbit</code> — ابن <code>Animal</code></li>
</ul>
<h2 id="الشريحة-19-الوراثة-صنف-الأب">الشريحة 19: الوراثة: صنف الأب</h2>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Animal</span>(<span class="hljs-title class_ inherited__">object</span>):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, age</span>):
        <span class="hljs-variable language_">self</span>.age = age
        <span class="hljs-variable language_">self</span>.name = <span class="hljs-literal">None</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">get_age</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.age

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">get_name</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.name

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">set_age</span>(<span class="hljs-params">self, newage</span>):
        <span class="hljs-variable language_">self</span>.age = newage

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">set_name</span>(<span class="hljs-params">self, newname=<span class="hljs-string">&quot;&quot;</span></span>):
        <span class="hljs-variable language_">self</span>.name = newname

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__str__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;animal:&quot;</span>+<span class="hljs-built_in">str</span>(<span class="hljs-variable language_">self</span>.name)+<span class="hljs-string">&quot;:&quot;</span>+<span class="hljs-built_in">str</span>(<span class="hljs-variable language_">self</span>.age)
</code></pre>
<h2 id="الشريحة-20-الصنف-الابن-cat">الشريحة 20: الصنف الابن <code>Cat</code></h2>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> نص هذه الشريحة المستخرَج هو العنوان فقط: &quot;SUBCLASS CAT&quot;. الكود المعروض على الشريحة (تعريف <code>class Cat(Animal)</code> مع <code>speak</code> و<code>__str__</code>) يظهر كاملًا على الشريحة التالية، وكُتب هنا إحالةً إليها.</p>
</blockquote>
<h2 id="الشريحة-21-الوراثة-الصنف-الابن">الشريحة 21: الوراثة: الصنف الابن</h2>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Cat</span>(<span class="hljs-title class_ inherited__">Animal</span>):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">speak</span>(<span class="hljs-params">self</span>):
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;meow&quot;</span>)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__str__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;cat:&quot;</span>+<span class="hljs-built_in">str</span>(<span class="hljs-variable language_">self</span>.name)+<span class="hljs-string">&quot;:&quot;</span>+<span class="hljs-built_in">str</span>(<span class="hljs-variable language_">self</span>.age)
</code></pre>
<ul>
<li>نضيف وظيفة جديدة عبر <code>speak()</code></li>
<li>يمكن استدعاء نسخة من نوع <code>Cat</code> بالدوال الجديدة</li>
<li>نسخة من نوع <code>Animal</code> ترفع خطأ إذا استُدعيت بالدالة الجديدة في <code>Cat</code></li>
<li><code>__init__</code> ليست مفقودة، بل يستخدم نسخة <code>Animal</code></li>
</ul>
<h2 id="الشريحة-22-أي-دالة-تستخدم">الشريحة 22: أي دالة تُستخدم؟</h2>
<ul>
<li>يمكن أن يحتوي الصنف الابن على دوال لها نفس اسم دوال الصنف الأعلى</li>
<li>لنسخة من صنف ما، ابحث عن اسم الدالة في تعريف الصنف الحالي</li>
<li>إذا لم يُعثر عليه، ابحث عن اسم الدالة صعودًا في التسلسل الهرمي (في الصنف الأب، ثم الجد، وهكذا)</li>
<li>استخدم أول دالة تصعد في التسلسل الهرمي وتجدها بهذا الاسم</li>
</ul>
<h2 id="الشريحة-23-الصنف-الابن-person">الشريحة 23: الصنف الابن <code>Person</code></h2>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> نص هذه الشريحة المستخرَج هو العنوان فقط: &quot;SUBCLASS PERSON&quot;. التعريف الكامل يظهر على الشريحة التالية.</p>
</blockquote>
<h2 id="الشريحة-24-تعريف-person">الشريحة 24: تعريف <code>Person</code></h2>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Person</span>(<span class="hljs-title class_ inherited__">Animal</span>):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name, age</span>):
        Animal.__init__(<span class="hljs-variable language_">self</span>, age)
        <span class="hljs-variable language_">self</span>.set_name(name)
        <span class="hljs-variable language_">self</span>.friends = []

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">get_friends</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.friends.copy()

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">add_friend</span>(<span class="hljs-params">self, fname</span>):
        <span class="hljs-keyword">if</span> fname <span class="hljs-keyword">not</span> <span class="hljs-keyword">in</span> <span class="hljs-variable language_">self</span>.friends:
            <span class="hljs-variable language_">self</span>.friends.append(fname)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">speak</span>(<span class="hljs-params">self</span>):
        <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;hello&quot;</span>)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">age_diff</span>(<span class="hljs-params">self, other</span>):
        diff = <span class="hljs-variable language_">self</span>.age - other.age
        <span class="hljs-built_in">print</span>(<span class="hljs-built_in">abs</span>(diff), <span class="hljs-string">&quot;year difference&quot;</span>)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__str__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;person:&quot;</span>+<span class="hljs-built_in">str</span>(<span class="hljs-variable language_">self</span>.name)+<span class="hljs-string">&quot;:&quot;</span>+<span class="hljs-built_in">str</span>(<span class="hljs-variable language_">self</span>.age)
</code></pre>
<h2 id="الشريحة-25-جرب-بنفسك">الشريحة 25: جرّب بنفسك!</h2>
<ul>
<li>اكتب دالة وفق هذه المواصفة</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">make_pets</span>(<span class="hljs-params">d</span>):
    <span class="hljs-string">&quot;&quot;&quot; d is a dict mapping a Person obj to a Cat obj

    Prints, on each line, the name of a person, a colon, and the
    name of that person&#x27;s cat &quot;&quot;&quot;</span>
    <span class="hljs-keyword">pass</span>

p1 = Person(<span class="hljs-string">&quot;ana&quot;</span>, <span class="hljs-number">86</span>)
p2 = Person(<span class="hljs-string">&quot;james&quot;</span>, <span class="hljs-number">7</span>)
c1 = Cat(<span class="hljs-number">1</span>)
c1.set_name(<span class="hljs-string">&quot;furball&quot;</span>)
c2 = Cat(<span class="hljs-number">1</span>)
c2.set_name(<span class="hljs-string">&quot;fluffsphere&quot;</span>)
d = {p1:c1, p2:c2}
make_pets(d)

<span class="hljs-comment"># prints ana:furball</span>
<span class="hljs-comment">#</span>
james:fluffsphere
</code></pre>
<h2 id="الشريحة-26-الفكرة-الكبرى-big-idea">الشريحة 26: الفكرة الكبرى (BIG IDEA)</h2>
<ul>
<li>يمكن للصنف الابن أن يستخدم سمات الصنف الأب، أو يتجاوز سمات الصنف الأب، أو يعرّف سمات جديدة.</li>
<li>السمات إمّا بيانات وإمّا دوال.</li>
</ul>
<h2 id="الشريحة-27-الصنف-الابن-student">الشريحة 27: الصنف الابن <code>Student</code></h2>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> نص هذه الشريحة المستخرَج هو العنوان فقط: &quot;SUBCLASS STUDENT&quot;. التعريف الكامل يظهر على الشريحة التالية.</p>
</blockquote>
<h2 id="الشريحة-28-تعريف-student">الشريحة 28: تعريف <code>Student</code></h2>
<pre><code class="language-python"><span class="hljs-keyword">import</span> random

<span class="hljs-keyword">class</span> <span class="hljs-title class_">Student</span>(<span class="hljs-title class_ inherited__">Person</span>):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, name, age, major=<span class="hljs-literal">None</span></span>):
        Person.__init__(<span class="hljs-variable language_">self</span>, name, age)
        <span class="hljs-variable language_">self</span>.major = major

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">change_major</span>(<span class="hljs-params">self, major</span>):
        <span class="hljs-variable language_">self</span>.major = major

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">speak</span>(<span class="hljs-params">self</span>):
        r = random.random()
        <span class="hljs-keyword">if</span> r &lt; <span class="hljs-number">0.25</span>:
            <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;i have homework&quot;</span>)
        <span class="hljs-keyword">elif</span> <span class="hljs-number">0.25</span> &lt;= r &lt; <span class="hljs-number">0.5</span>:
            <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;i need sleep&quot;</span>)
        <span class="hljs-keyword">elif</span> <span class="hljs-number">0.5</span> &lt;= r &lt; <span class="hljs-number">0.75</span>:
            <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;i should eat&quot;</span>)
        <span class="hljs-keyword">else</span>:
            <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;i&#x27;m still zooming&quot;</span>)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__str__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;student:&quot;</span>+<span class="hljs-built_in">str</span>(<span class="hljs-variable language_">self</span>.name)+<span class="hljs-string">&quot;:&quot;</span>+<span class="hljs-built_in">str</span>(<span class="hljs-variable language_">self</span>.age)+<span class="hljs-string">&quot;:&quot;</span>+<span class="hljs-built_in">str</span>(<span class="hljs-variable language_">self</span>.major)
</code></pre>
<h2 id="الشريحة-29-الصنف-الابن-rabbit">الشريحة 29: الصنف الابن <code>Rabbit</code></h2>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> نص هذه الشريحة المستخرَج هو العنوان فقط: &quot;SUBCLASS RABBIT&quot;. التعريف الكامل يظهر على الشريحة التالية.</p>
</blockquote>
<h2 id="الشريحة-30-متغيرات-الصنف-class-variables-والصنف-الابن-rabbit">الشريحة 30: متغيّرات الصنف (Class Variables) والصنف الابن <code>Rabbit</code></h2>
<ul>
<li>متغيّرات الصنف (class variables) وقيمها مشتركة بين كل نسخ الصنف</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Rabbit</span>(<span class="hljs-title class_ inherited__">Animal</span>):
    tag = <span class="hljs-number">1</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, age, parent1=<span class="hljs-literal">None</span>,parent2=<span class="hljs-literal">None</span></span>):
        Animal.__init__(<span class="hljs-variable language_">self</span>, age)
        <span class="hljs-variable language_">self</span>.parent1 = parent1
        <span class="hljs-variable language_">self</span>.parent2 = parent2
        <span class="hljs-variable language_">self</span>.rid = Rabbit.tag
        Rabbit.tag += <span class="hljs-number">1</span>
</code></pre>
<ul>
<li>استُخدم <code>tag</code> لإعطاء معرّف (id) فريد لكل نسخة جديدة من <code>Rabbit</code></li>
</ul>
<h2 id="الشريحة-31-مراجعة-لـ-init-في-rabbit">الشريحة 31: مراجعة لـ <code>__init__</code> في <code>Rabbit</code></h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, age, parent1=<span class="hljs-literal">None</span>,parent2=<span class="hljs-literal">None</span></span>):
    Animal.__init__(<span class="hljs-variable language_">self</span>, age)
    <span class="hljs-variable language_">self</span>.parent1 = parent1
    <span class="hljs-variable language_">self</span>.parent2 = parent2
    <span class="hljs-variable language_">self</span>.rid = Rabbit.tag
    Rabbit.tag += <span class="hljs-number">1</span>
</code></pre>
<p>مثال:</p>
<pre><code class="language-python">r1 = Rabbit(<span class="hljs-number">8</span>)
</code></pre>
<p>حالة الذاكرة بعد التنفيذ:</p>
<table>
<thead>
<tr>
<th>العنصر</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>Rabbit.tag</code></td>
<td><code>2</code></td>
</tr>
<tr>
<td><code>r1</code> — Age</td>
<td><code>8</code></td>
</tr>
<tr>
<td><code>r1</code> — Parent1</td>
<td><code>None</code></td>
</tr>
<tr>
<td><code>r1</code> — Parent2</td>
<td><code>None</code></td>
</tr>
<tr>
<td><code>r1</code> — Rid</td>
<td><code>1</code></td>
</tr>
</tbody>
</table>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> القيم <code>2</code> و<code>1</code> في هذا الجدول هي حالة <code>Rabbit.tag</code> بعد الزيادة، والمُسجَّلة في الملف الأصلي خارج جدول الذاكرة. رتّبتُها هنا في جدول واحد لإبراز العلاقة بينها؛ القيم نفسها منقولة كما هي.</p>
</blockquote>
<h2 id="الشريحة-32-مراجعة-لـ-init-في-rabbit-تتمة">الشريحة 32: مراجعة لـ <code>__init__</code> في <code>Rabbit</code> (تتمة)</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, age, parent1=<span class="hljs-literal">None</span>,parent2=<span class="hljs-literal">None</span></span>):
    Animal.__init__(<span class="hljs-variable language_">self</span>, age)
    <span class="hljs-variable language_">self</span>.parent1 = parent1
    <span class="hljs-variable language_">self</span>.parent2 = parent2
    <span class="hljs-variable language_">self</span>.rid = Rabbit.tag
    Rabbit.tag += <span class="hljs-number">1</span>
</code></pre>
<p>مثال:</p>
<pre><code class="language-python">r1 = Rabbit(<span class="hljs-number">8</span>)
r2 = Rabbit(<span class="hljs-number">6</span>)
</code></pre>
<p>حالة الذاكرة بعد التنفيذ:</p>
<table>
<thead>
<tr>
<th>العنصر</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>Rabbit.tag</code></td>
<td><code>3</code></td>
</tr>
<tr>
<td><code>r1</code> — Age</td>
<td><code>8</code></td>
</tr>
<tr>
<td><code>r1</code> — Parent1</td>
<td><code>None</code></td>
</tr>
<tr>
<td><code>r1</code> — Parent2</td>
<td><code>None</code></td>
</tr>
<tr>
<td><code>r1</code> — Rid</td>
<td><code>1</code></td>
</tr>
<tr>
<td><code>r2</code> — Age</td>
<td><code>6</code></td>
</tr>
<tr>
<td><code>r2</code> — Parent1</td>
<td><code>None</code></td>
</tr>
<tr>
<td><code>r2</code> — Parent2</td>
<td><code>None</code></td>
</tr>
<tr>
<td><code>r2</code> — Rid</td>
<td><code>2</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-33-مراجعة-لـ-init-في-rabbit-تتمة">الشريحة 33: مراجعة لـ <code>__init__</code> في <code>Rabbit</code> (تتمة)</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, age, parent1=<span class="hljs-literal">None</span>,parent2=<span class="hljs-literal">None</span></span>):
    Animal.__init__(<span class="hljs-variable language_">self</span>, age)
    <span class="hljs-variable language_">self</span>.parent1 = parent1
    <span class="hljs-variable language_">self</span>.parent2 = parent2
    <span class="hljs-variable language_">self</span>.rid = Rabbit.tag
    Rabbit.tag += <span class="hljs-number">1</span>
</code></pre>
<p>مثال:</p>
<pre><code class="language-python">r1 = Rabbit(<span class="hljs-number">8</span>)
r2 = Rabbit(<span class="hljs-number">6</span>)
r3 = Rabbit(<span class="hljs-number">10</span>)
</code></pre>
<p>حالة الذاكرة بعد التنفيذ:</p>
<table>
<thead>
<tr>
<th>العنصر</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>Rabbit.tag</code></td>
<td><code>4</code></td>
</tr>
<tr>
<td><code>r1</code> — Age</td>
<td><code>8</code></td>
</tr>
<tr>
<td><code>r1</code> — Parent1</td>
<td><code>None</code></td>
</tr>
<tr>
<td><code>r1</code> — Parent2</td>
<td><code>None</code></td>
</tr>
<tr>
<td><code>r1</code> — Rid</td>
<td><code>1</code></td>
</tr>
<tr>
<td><code>r2</code> — Age</td>
<td><code>6</code></td>
</tr>
<tr>
<td><code>r2</code> — Parent1</td>
<td><code>None</code></td>
</tr>
<tr>
<td><code>r2</code> — Parent2</td>
<td><code>None</code></td>
</tr>
<tr>
<td><code>r2</code> — Rid</td>
<td><code>2</code></td>
</tr>
<tr>
<td><code>r3</code> — Age</td>
<td><code>10</code></td>
</tr>
<tr>
<td><code>r3</code> — Parent1</td>
<td><code>None</code></td>
</tr>
<tr>
<td><code>r3</code> — Parent2</td>
<td><code>None</code></td>
</tr>
<tr>
<td><code>r3</code> — Rid</td>
<td><code>3</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-34-دوال-الجلب-في-rabbit">الشريحة 34: دوال الجلب في <code>Rabbit</code></h2>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Rabbit</span>(<span class="hljs-title class_ inherited__">Animal</span>):
    tag = <span class="hljs-number">1</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, age, parent1=<span class="hljs-literal">None</span>,parent2=<span class="hljs-literal">None</span></span>):
        Animal.__init__(<span class="hljs-variable language_">self</span>, age)
        <span class="hljs-variable language_">self</span>.parent1 = parent1
        <span class="hljs-variable language_">self</span>.parent2 = parent2
        <span class="hljs-variable language_">self</span>.rid = Rabbit.tag
        Rabbit.tag += <span class="hljs-number">1</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">get_rid</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">str</span>(<span class="hljs-variable language_">self</span>.rid).zfill(<span class="hljs-number">5</span>)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">get_parent1</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.parent1

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">get_parent2</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.parent2
</code></pre>
<h2 id="الشريحة-35-العمل-مع-أنواعك-الخاصة">الشريحة 35: العمل مع أنواعك الخاصة</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">__add__</span>(<span class="hljs-params">self, other</span>):
    <span class="hljs-comment"># returning object of same type as this class</span>
    <span class="hljs-keyword">return</span> Rabbit(<span class="hljs-number">0</span>, <span class="hljs-variable language_">self</span>, other)
</code></pre>
<p>(تذكّر <code>__init__</code> في <code>Rabbit</code>: <code>__init__(self, age, parent1=None, parent2=None)</code>)</p>
<ul>
<li>عرّف معامل <code>+</code> بين نسختين من <code>Rabbit</code></li>
<li>عرّف ماذا يفعل شيء مثل:</li>
</ul>
<pre><code class="language-python">r4 = r1 + r2
</code></pre>
<p>حيث <code>r1</code> و<code>r2</code> نسختان من <code>Rabbit</code></p>
<ul>
<li><code>r4</code> هي نسخة جديدة من <code>Rabbit</code> بعمر <code>0</code></li>
<li>في <code>r4</code> تكون <code>self</code> أحد الوالدين و<code>other</code> هو الوالد الآخر</li>
<li>في <code>__init__</code>، يكون <code>parent1</code> و<code>parent2</code> من نوع <code>Rabbit</code></li>
</ul>
<h2 id="الشريحة-36-مراجعة-لـ-init-في-rabbit-مع">الشريحة 36: مراجعة لـ <code>__init__</code> في <code>Rabbit</code> مع <code>+</code></h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, age, parent1=<span class="hljs-literal">None</span>,parent2=<span class="hljs-literal">None</span></span>):
    Animal.__init__(<span class="hljs-variable language_">self</span>, age)
    <span class="hljs-variable language_">self</span>.parent1 = parent1
    <span class="hljs-variable language_">self</span>.parent2 = parent2
    <span class="hljs-variable language_">self</span>.rid = Rabbit.tag
    Rabbit.tag += <span class="hljs-number">1</span>
</code></pre>
<p>مثال:</p>
<pre><code class="language-python">r1 = Rabbit(<span class="hljs-number">8</span>)
r2 = Rabbit(<span class="hljs-number">6</span>)
r3 = Rabbit(<span class="hljs-number">10</span>)
r4 = r1 + r2
</code></pre>
<p>حالة الذاكرة بعد التنفيذ:</p>
<table>
<thead>
<tr>
<th>العنصر</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>Rabbit.tag</code></td>
<td><code>5</code></td>
</tr>
<tr>
<td><code>r1</code> — Age</td>
<td><code>8</code></td>
</tr>
<tr>
<td><code>r1</code> — Parent1</td>
<td><code>None</code></td>
</tr>
<tr>
<td><code>r1</code> — Parent2</td>
<td><code>None</code></td>
</tr>
<tr>
<td><code>r1</code> — Rid</td>
<td><code>1</code></td>
</tr>
<tr>
<td><code>r2</code> — Age</td>
<td><code>6</code></td>
</tr>
<tr>
<td><code>r2</code> — Parent1</td>
<td><code>None</code></td>
</tr>
<tr>
<td><code>r2</code> — Parent2</td>
<td><code>None</code></td>
</tr>
<tr>
<td><code>r2</code> — Rid</td>
<td><code>2</code></td>
</tr>
<tr>
<td><code>r3</code> — Age</td>
<td><code>10</code></td>
</tr>
<tr>
<td><code>r3</code> — Parent1</td>
<td><code>None</code></td>
</tr>
<tr>
<td><code>r3</code> — Parent2</td>
<td><code>None</code></td>
</tr>
<tr>
<td><code>r3</code> — Rid</td>
<td><code>3</code></td>
</tr>
<tr>
<td><code>r4</code> — Age</td>
<td><code>0</code></td>
</tr>
<tr>
<td><code>r4</code> — Parent1</td>
<td>obj bound to r1</td>
</tr>
<tr>
<td><code>r4</code> — Parent2</td>
<td>obj bound to r2</td>
</tr>
<tr>
<td><code>r4</code> — Rid</td>
<td><code>4</code></td>
</tr>
</tbody>
</table>
<h2 id="الشريحة-37-دالة-خاصة-لمقارنة-أرنبين">الشريحة 37: دالة خاصة لمقارنة أرنبين</h2>
<ul>
<li>قرر أن الأرنبَين متساويَان إذا كان لهما الوالدان نفسهما</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">__eq__</span>(<span class="hljs-params">self, other</span>):
    parents_same = (<span class="hljs-variable language_">self</span>.p1.rid == oth.p1.rid <span class="hljs-keyword">and</span> <span class="hljs-variable language_">self</span>.p2.rid == oth.p2.rid)
    parents_opp = (<span class="hljs-variable language_">self</span>.p2.rid == oth.p1.rid <span class="hljs-keyword">and</span> <span class="hljs-variable language_">self</span>.p1.rid == oth.p2.rid)
    <span class="hljs-keyword">return</span> parents_same <span class="hljs-keyword">or</span> parents_opp
</code></pre>
<ul>
<li>قارن معرّفات الوالدين لأن المعرّفات فريدة (بفضل متغيّر الصنف)</li>
<li>لاحظ أنه لا يمكنك مقارنة الكائنات مباشرة</li>
<li>على سبيل المثال بـ <code>self.parent1 == other.parent1</code></li>
<li>هذا ينادي دالة <code>__eq</code> مرارًا وتكرارًا حتى يناديها على <code>None</code> ويعطي <code>AttributeError</code> عندما يحاول تنفيذ <code>None.parent1</code></li>
</ul>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> في الكود أعلاه يستعمل النص الأصلي <code>self.p1</code> و<code>oth.p1</code> بينما تعريف الصنف يستعمل <code>self.parent1</code> و<code>other</code>؛ وقد نُقل الكود كما هو في الأصل مع الإبقاء على <code>oth</code> دون تصحيح. (وفي ملفات الشيفرة المرافقة لهذه المحاضرة أُعيدت صياغة هذا التباين إلى <code>self.parent1</code> و<code>other.parent1</code>.)</p>
</blockquote>
<h2 id="الشريحة-38-الفكرة-الكبرى-big-idea">الشريحة 38: الفكرة الكبرى (BIG IDEA)</h2>
<ul>
<li>متغيّرات الصنف (class variables) مشتركة بين كل النسخ.</li>
<li>إذا غيّرتها نسخة واحدة، فهي تتغيّر لكل النسخ.</li>
</ul>
<h2 id="الشريحة-39-البرمجة-الكائنية-التوجه-object-oriented-programming">الشريحة 39: البرمجة الكائنية التوجه (Object Oriented Programming)</h2>
<ul>
<li>أنشئ مجموعات بياناتك الخاصة</li>
<li>نظّم المعلومات</li>
<li>قسّم العمل</li>
<li>الوصول إلى المعلومات بطريقة متسقة</li>
<li>أضف طبقات من التعقيد
<ul>
<li><strong>التسلسلات الهرمية (Hierarchies)</strong></li>
<li>أصناف الأبناء ترث البيانات والدوال من أصناف الآباء</li>
</ul>
</li>
<li>مثل الدوال تمامًا، الأصناف آلية للتفكيك (decomposition) والتجريد (abstraction) في البرمجة</li>
</ul>
<h2 id="الشريحة-40-mit-opencourseware">الشريحة 40: MIT OpenCourseWare</h2>
<ul>
<li><a href="https://ocw.mit.edu">https://ocw.mit.edu</a></li>
<li>6.100L Introduction to Computer Science and Programming Using Python — Fall 2022</li>
<li>ولمعلومات كيفية الاستشهاد بهذه المواد أو شروط استخدامها، راجع: <a href="https://ocw.mit.edu/terms">https://ocw.mit.edu/terms</a></li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:l,title:e,headings:t,html:p};export{s as book,n as chapter,a as chapterTitle,c as default,t as headings,p as html,l as slug,e as title};
