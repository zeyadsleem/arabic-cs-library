const s="mit-6100l",a="lecture-18",n="المحاضرة 18: المزيد من طرائق الأصناف في بايثون",e="exercises",l="تمرين المحاضرة 18 وحلّه: جمع الدوائر وتمثيلها النصي",t=[{depth:2,id:"1-السؤال-1-من-1",text:"1) السؤال 1 من 1"},{depth:2,id:"إليك-الحل-الذي-كتبناه",text:"إليك الحل الذي كتبناه"},{depth:2,id:"إشعار-المصدر-الختامي",text:"إشعار المصدر الختامي"}],c=`<div class="exercises"><h1>التمرين القصير للمحاضرة 18 (Finger Exercises Lecture 18)</h1>
<p>المصادر: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-18-more-python-class-methods/">السؤال في صفحة المحاضرة</a>، و<a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex18_sol.pdf">ملف الحل الرسمي</a>.</p>
<p>إعداد الأصل: <strong>Ana Bell / MIT OpenCourseWare، معهد ماساتشوستس للتكنولوجيا</strong>، مقرر 6.100L، خريف 2022. ترجمة وتكييف عربيان غير رسميين للاستخدام غير التجاري، ولا يعنيان اعتماد MIT. الترخيص: <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>، مع احترام استثناءات الأطراف الثالثة في الأصل.</p>
<p>كانت الأسئلة أدناه مستحقة يوم الاثنين 14 نوفمبر 2022، الساعة 03:00:00 مساءً.</p>
<h2 id="1-السؤال-1-من-1">1) السؤال 1 من 1</h2>
<p>اكتب الصنف (Class) وفق المواصفات أدناه:</p>
<ul>
<li><code>__init__</code>: يهيّئ <code>self</code> بنصف القطر <code>radius</code>.</li>
<li><code>get_radius</code>: يُرجع نصف قطر <code>self</code>.</li>
<li><code>__add__</code>: المعامل <code>c</code> كائن (Object) من الصنف <code>Circle</code>؛ يُرجع كائن <code>Circle</code> جديدًا نصف قطره هو مجموع نصفي قطر <code>self</code> و<code>c</code>.</li>
<li><code>__str__</code>: التمثيل النصي (String representation) للدائرة هو نصف قطرها.</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Circle</span>():
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, radius</span>):
        <span class="hljs-string">&quot;&quot;&quot; Initializes self with radius &quot;&quot;&quot;</span>
        <span class="hljs-comment"># your code here</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">get_radius</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot; Returns the radius of self &quot;&quot;&quot;</span>
        <span class="hljs-comment"># your code here</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__add__</span>(<span class="hljs-params">self, c</span>):
        <span class="hljs-string">&quot;&quot;&quot; c is a Circle object
        Returns a new Circle object whose radius is
        the sum of self and c&#x27;s radius &quot;&quot;&quot;</span>
        <span class="hljs-comment"># your code here</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__str__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot; A Circle&#x27;s string representation is the radius &quot;&quot;&quot;</span>
        <span class="hljs-comment"># your code here</span>
</code></pre>
<p>حقل الإجابة في الأصل:</p>
<pre><code class="language-python"><span class="hljs-comment"># your class here</span>
</code></pre>
<p>لديك عدد غير محدود من محاولات التسليم المتبقية.</p>
<h2 id="إليك-الحل-الذي-كتبناه">إليك الحل الذي كتبناه</h2>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Circle</span>():
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, radius</span>):
        <span class="hljs-variable language_">self</span>.r = radius
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">get_radius</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.r
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__add__</span>(<span class="hljs-params">self, c</span>):
        <span class="hljs-keyword">return</span> Circle(<span class="hljs-variable language_">self</span>.r + c.r)
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__str__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">str</span>(<span class="hljs-variable language_">self</span>.r)
</code></pre>
<h2 id="إشعار-المصدر-الختامي">إشعار المصدر الختامي</h2>
<p>MIT OpenCourseWare — <a href="https://ocw.mit.edu">https://ocw.mit.edu</a>. مقرر 6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python، خريف 2022. لمعلومات الاستشهاد بهذه المواد وشروط الاستخدام: <a href="https://ocw.mit.edu/terms">https://ocw.mit.edu/terms</a>.</p>
</div>`,p={book:s,chapter:a,chapterTitle:n,slug:e,title:l,headings:t,html:c};export{s as book,a as chapter,n as chapterTitle,p as default,t as headings,c as html,e as slug,l as title};
