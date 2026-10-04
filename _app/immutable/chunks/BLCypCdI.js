const s="mit-6100l",n="lecture-10",a="المحاضرة 10: القوائم وقابلية التغيير (Mutability)",e="exercises",t="المحاضرة 10: تمرين الإصبع وحلّه الرسمي — هل كلّ الدوال تُعيد True؟",p=[{depth:2,id:"صفحة-المصدر-1-تمارين-الأصابع-للمحاضرة-10",text:"صفحة المصدر 1: تمارين الأصابع للمحاضرة 10"},{depth:3,id:"1-السؤال-1-من-1",text:"1) السؤال 1 من 1"},{depth:2,id:"صفحة-المصدر-2-الإسناد",text:"صفحة المصدر 2: الإسناد"}],l=`<h1>المحاضرة 10: تمرين الإصبع وحلّه الرسمي — هل كلّ الدوال تُعيد True؟</h1>
<p>المصدر: آنا بيل (Ana Bell)، معهد ماساتشوستس للتكنولوجيا، MIT OpenCourseWare، مقرر <strong>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام بايثون</strong>، خريف 2022 (Fall 2022). هذه ترجمة وتكييف عربيان غير رسميان بموجب <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>، ولا تعنيان اعتماد MIT أو تأييده. <a href="https://ocw.mit.edu/terms/">شروط الاستخدام والإسناد</a>.</p>
<p>المصادر الدقيقة: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-10-lists-mutability/">السؤال في صفحة المحاضرة</a>، <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_ex10_sol_pdf/">صفحة مورد الحل</a>، <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex10_sol.pdf">PDF الحل الرسمي</a>.</p>
<div class="exercises"><h2 id="صفحة-المصدر-1-تمارين-الأصابع-للمحاضرة-10">صفحة المصدر 1: تمارين الأصابع للمحاضرة 10</h2>
<p>موعد تسليم الأسئلة أدناه: الاثنين 17 أكتوبر 2022، الساعة 03:00:00 مساءً. هذا هو موعد المقرر الأصلي، وليس موعدًا جديدًا لهذه الترجمة.</p>
<h3 id="1-السؤال-1-من-1">1) السؤال 1 من 1</h3>
<p>نفّذ الدالة التي تستوفي المواصفة التالية:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">all_true</span>(<span class="hljs-params">n, Lf</span>):
    <span class="hljs-string">&quot;&quot;&quot; n is an int
    Lf is a list of functions that take in an int and return a Boolean
    Returns True if each and every function in Lf returns True
    with n as a parameter. Otherwise returns False.
    &quot;&quot;&quot;</span>
    <span class="hljs-comment"># Your code here</span>
</code></pre>
<p>أمثلة:</p>
<pre><code class="language-python">all_true() <span class="hljs-comment"># prints 6</span>
</code></pre>
<p><strong>ملاحظة المترجم:</strong> سطر المثال في ملف الحل الأصلي يظهر ناقصًا في النسخة المنشورة على OCW (لا تظهر له وسائط ولا مُخرَج متوقَّع)، فنُقل كما هو دون تخمين.</p>
<p>دالتك هنا:</p>
<pre><code class="language-python"><span class="hljs-comment"># your function here</span>
</code></pre>
<p>تبقّى لك عدد لا نهائي من مرات التسليم.</p>
<p>هذا هو الحل الذي كتبناه:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">all_true</span>(<span class="hljs-params">n, Lf</span>):
    flag = <span class="hljs-literal">True</span>
    <span class="hljs-keyword">for</span> f <span class="hljs-keyword">in</span> Lf:
        <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> f(n):
            flag = <span class="hljs-literal">False</span>
            <span class="hljs-keyword">break</span>
    <span class="hljs-keyword">return</span> flag
</code></pre>
<h2 id="صفحة-المصدر-2-الإسناد">صفحة المصدر 2: الإسناد</h2>
<p>MIT OpenCourseWare — https://ocw.mit.edu</p>
<p>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام بايثون.</p>
<p>خريف 2022.</p>
<p>للمعلومات المتعلقة بالاستشهاد بهذه المواد أو بشروط الاستخدام، زُر: https://ocw.mit.edu/terms</p>
</div>`,o={book:s,chapter:n,chapterTitle:a,slug:e,title:t,headings:p,html:l};export{s as book,n as chapter,a as chapterTitle,o as default,p as headings,l as html,e as slug,t as title};
