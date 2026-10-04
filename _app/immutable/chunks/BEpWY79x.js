const s="mit-6100l",a="lecture-17",n="المحاضرة 17: الأصناف في بايثون (Python Classes)",e="exercises",l="تمرين المحاضرة 17 وحلّه: صنف الدائرة",c=[{depth:2,id:"1-السؤال-1-من-1",text:"1) السؤال 1 من 1"},{depth:2,id:"إليك-الحل-الذي-كتبناه",text:"إليك الحل الذي كتبناه"},{depth:2,id:"إشعار-المصدر-الختامي",text:"إشعار المصدر الختامي"}],o=`<div class="exercises"><h1>التمرين القصير للمحاضرة 17 (Finger Exercises Lecture 17)</h1>
<p>المصادر: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-17-python-classes/">السؤال في صفحة المحاضرة</a>، و<a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex17_sol.pdf">ملف الحل الرسمي</a>.</p>
<p>إعداد الأصل: <strong>Ana Bell / MIT OpenCourseWare، معهد ماساتشوستس للتكنولوجيا</strong>، مقرر 6.100L، خريف 2022. ترجمة وتكييف عربيان غير رسميين للاستخدام غير التجاري، ولا يعنيان اعتماد MIT. الترخيص: <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>، مع احترام استثناءات الأطراف الثالثة في الأصل.</p>
<p>كانت الأسئلة أدناه مستحقة يوم الأربعاء 9 نوفمبر 2022، الساعة 03:00:00 مساءً.</p>
<h2 id="1-السؤال-1-من-1">1) السؤال 1 من 1</h2>
<p>اكتب الصنف (Class) وفق المواصفات أدناه:</p>
<ul>
<li><code>__init__</code>: يهيّئ <code>self</code> بنصف القطر <code>radius</code>.</li>
<li><code>get_radius</code>: يُرجع نصف قطر <code>self</code>.</li>
<li><code>set_radius</code>: المعامل <code>radius</code> عدد؛ يغيّر نصف قطر <code>self</code> إلى <code>radius</code>.</li>
<li><code>get_area</code>: يُرجع مساحة <code>self</code> باستخدام <code>pi = 3.14</code>.</li>
<li><code>equal</code>: المعامل <code>c</code> كائن (Object) من الصنف <code>Circle</code>؛ يُرجع <code>True</code> إذا كانت قيمة نصف القطر متساوية في <code>self</code> و<code>c</code>.</li>
<li><code>bigger</code>: المعامل <code>c</code> كائن <code>Circle</code>؛ يُرجع <code>self</code> أو <code>c</code>، أي كائن الدائرة ذي نصف القطر الأكبر.</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Circle</span>():
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, radius</span>):
        <span class="hljs-string">&quot;&quot;&quot; Initializes self with radius &quot;&quot;&quot;</span>
        <span class="hljs-comment"># your code here</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">get_radius</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot; Returns the radius of self &quot;&quot;&quot;</span>
        <span class="hljs-comment"># your code here</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">set_radius</span>(<span class="hljs-params">self, radius</span>):
        <span class="hljs-string">&quot;&quot;&quot; radius is a number
        Changes the radius of self to radius &quot;&quot;&quot;</span>
        <span class="hljs-comment"># your code here</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">get_area</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot; Returns the area of self using pi = 3.14 &quot;&quot;&quot;</span>
        <span class="hljs-comment"># your code here</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">equal</span>(<span class="hljs-params">self, c</span>):
        <span class="hljs-string">&quot;&quot;&quot; c is a Circle object
        Returns True if self and c have the same radius value &quot;&quot;&quot;</span>
        <span class="hljs-comment"># your code here</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">bigger</span>(<span class="hljs-params">self, c</span>):
        <span class="hljs-string">&quot;&quot;&quot; c is a Circle object
        Returns self or c, the Circle object with the bigger radius &quot;&quot;&quot;</span>
        <span class="hljs-comment"># your code here</span>
</code></pre>
<p>حقل الإجابة في الأصل:</p>
<pre><code class="language-python"><span class="hljs-comment"># your class here</span>
</code></pre>
<h2 id="إليك-الحل-الذي-كتبناه">إليك الحل الذي كتبناه</h2>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Circle</span>():
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, radius</span>):
        <span class="hljs-variable language_">self</span>.r = radius
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">get_radius</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.r
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">set_radius</span>(<span class="hljs-params">self, radius</span>):
        <span class="hljs-variable language_">self</span>.r = radius
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">get_area</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-number">3.14</span>*<span class="hljs-variable language_">self</span>.r*<span class="hljs-variable language_">self</span>.r
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">equal</span>(<span class="hljs-params">self, c</span>):
        <span class="hljs-keyword">return</span> (c.r == <span class="hljs-variable language_">self</span>.r)
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">bigger</span>(<span class="hljs-params">self, c</span>):
        <span class="hljs-keyword">if</span> c.r &gt; <span class="hljs-variable language_">self</span>.r:
            <span class="hljs-keyword">return</span> c
        <span class="hljs-keyword">elif</span> c.r &lt; <span class="hljs-variable language_">self</span>.r:
            <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>
</code></pre>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> لا يعالج الحل المنشور تساوي نصفي القطر داخل <code>bigger</code>؛ في هذه الحالة يُرجع Python القيمة <code>None</code> ضمنيًا. أُبقي الحل الرسمي دون إضافة فرع جديد. استُعيدت المسافات البادئة من الأصل بدل ترتيب النص المستخرج المشوّه.</p>
</blockquote>
<h2 id="إشعار-المصدر-الختامي">إشعار المصدر الختامي</h2>
<p>MIT OpenCourseWare — <a href="https://ocw.mit.edu">https://ocw.mit.edu</a>. مقرر 6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python، خريف 2022. لمعلومات الاستشهاد بهذه المواد وشروط الاستخدام: <a href="https://ocw.mit.edu/terms">https://ocw.mit.edu/terms</a>.</p>
</div>`,t={book:s,chapter:a,chapterTitle:n,slug:e,title:l,headings:c,html:o};export{s as book,a as chapter,n as chapterTitle,t as default,c as headings,o as html,e as slug,l as title};
