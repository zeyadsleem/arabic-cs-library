const s="mit-6100l",n="lecture-07",a="المحاضرة 7: التفكيك والتجريد والدوال",e="exercises",c="المحاضرة ٧: التمارين القصيرة وحلولها",t=[{depth:2,id:"صفحة-المصدر-١-السؤال-١-من-٢",text:"صفحة المصدر ١ — السؤال ١ من ٢"},{depth:2,id:"صفحة-المصدر-٢-السؤال-٢-من-٢",text:"صفحة المصدر ٢ — السؤال ٢ من ٢"},{depth:2,id:"صفحة-المصدر-٣-بيانات-النشر",text:"صفحة المصدر ٣ — بيانات النشر"},{depth:2,id:"النسبة-والترخيص",text:"النسبة والترخيص"}],p=`<div class="exercises"><h1>المحاضرة ٧: التمارين القصيرة وحلولها</h1>
<p>المصدران: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-7-decomposition-abstraction-functions/">مطالب التمارين في صفحة المحاضرة الرسمية</a>، و<a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex07_sol.pdf">حلول التمارين الرسمية</a> (<a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_ex07_sol_pdf/">صفحة المورد</a>).</p>
<p>تُترك الشيفرة والتعليقات الإنجليزية كما في المصدر، وتُترجم المواصفات خارج كتل الشيفرة. النص الموجود أصلًا مثل <code># Your code here</code> هو جزء من مطلب التمرين، وليس موضعًا ناقصًا في الترجمة.</p>
<h2 id="صفحة-المصدر-١-السؤال-١-من-٢">صفحة المصدر ١ — السؤال ١ من ٢</h2>
<p><strong>تمارين المحاضرة ٧ القصيرة (Finger Exercises Lecture 7).</strong> موعد تسليم الأسئلة أدناه، كما ورد في المصدر التاريخي: الاثنين ٣ أكتوبر ٢٠٢٢، الساعة 03:00:00 مساءً.</p>
<p>نفّذ الدالة التي تحقق المواصفات أدناه:</p>
<ul>
<li><code>a, b, c</code>: قيم عددية لمعاملات معادلة تربيعية (Quadratic Equation).</li>
<li><code>x</code>: القيمة العددية التي تُحسب عندها التربيعية.</li>
<li>تُرجع قيمة التربيعية <code>a×x² + b×x + c</code>.</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">eval_quadratic</span>(<span class="hljs-params">a, b, c, x</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    a, b, c: numerical values for the coefficients of a quadratic equation
    x: numerical value at which to evaluate the quadratic.
    Returns the value of the quadratic a×x² + b×x + c.
    &quot;&quot;&quot;</span>
    <span class="hljs-comment"># Your code here</span>

<span class="hljs-comment"># Examples:    </span>
<span class="hljs-built_in">print</span>(eval_quadratic(<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>)) <span class="hljs-comment"># prints 3</span>
</code></pre>
<p>المثال يطبع <code>3</code>. يظهر في محرر الإجابة بالسطر ١ التعليق التالي:</p>
<pre><code class="language-python"><span class="hljs-comment"># your function here</span>
</code></pre>
<p>بقي لك عدد غير محدود من محاولات التسليم.</p>
<p>هذا هو الحل الذي كتبناه:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">eval_quadratic</span>(<span class="hljs-params">a,b,c,x</span>):
    <span class="hljs-keyword">return</span> a*x*x + b*x + c
</code></pre>
<h2 id="صفحة-المصدر-٢-السؤال-٢-من-٢">صفحة المصدر ٢ — السؤال ٢ من ٢</h2>
<p>نفّذ الدالة التي تحقق المواصفات أدناه:</p>
<ul>
<li><code>a1, b1, c1</code>: مجموعة معاملات لمعادلة تربيعية.</li>
<li><code>a2, b2, c2</code>: مجموعة أخرى من معاملات معادلة تربيعية.</li>
<li><code>x1, x2</code>: القيمتان اللتان تُحسب عندهما التربيعيتان.</li>
<li>تحسب تربيعية بمعاملات <code>a1, b1, c1</code> عند <code>x1</code>.</li>
<li>تحسب تربيعية أخرى بمعاملات <code>a2, b2, c2</code> عند <code>x2</code>.</li>
<li>تطبع مجموع نتيجتي الحساب. لا تُرجع شيئًا.</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">two_quadratics</span>(<span class="hljs-params">a1, b1, c1, x1, a2, b2, c2, x2</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    a1, b1, c1: one set of coefficients of a quadratic equation
    a2, b2, c2: another set of coefficients of a quadratic equation
    x1, x2: values at which to evaluate the quadratics
    Evaluates one quadratic with coefficients a1, b1, c1, at x1.
    Evaluates another quadratic with coefficients a2, b2, c2, at x2.
    Prints the sum of the two evaluations. Does not return anything.
    &quot;&quot;&quot;</span>
    <span class="hljs-comment"># Your code here</span>

<span class="hljs-comment"># Examples:    </span>
two_quadratics(<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>) <span class="hljs-comment"># prints 6</span>
<span class="hljs-built_in">print</span>(two_quadratics(<span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>, <span class="hljs-number">1</span>)) <span class="hljs-comment"># prints 6 then None</span>
</code></pre>
<p>المثال الأول يطبع <code>6</code>. الثاني يطبع <code>6</code> ثم <code>None</code>. يظهر في محرر الإجابة بالسطر ١:</p>
<pre><code class="language-python"><span class="hljs-comment"># your function here</span>
</code></pre>
<p>بقي لك عدد غير محدود من محاولات التسليم.</p>
<p>هذا هو الحل الذي كتبناه:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">two_quadratics</span>(<span class="hljs-params">a1, b1, c1, x1, a2, b2, c2, x2</span>):
    <span class="hljs-built_in">print</span>(eval_quadratic(a1, b1, c1, x1) + eval_quadratic(a2, b2, c2, x2))
</code></pre>
<h2 id="صفحة-المصدر-٣-بيانات-النشر">صفحة المصدر ٣ — بيانات النشر</h2>
<p>MIT OpenCourseWare — https://ocw.mit.edu</p>
<p>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python، خريف ٢٠٢٢.</p>
<p>للحصول على معلومات عن الاستشهاد بهذه المواد أو شروط استخدامها، زر: https://ocw.mit.edu/terms</p>
<h2 id="النسبة-والترخيص">النسبة والترخيص</h2>
<p>آنا بيل (Ana Bell)، مقرر <strong>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python</strong>، خريف ٢٠٢٢ (Fall 2022)، معهد ماساتشوستس للتكنولوجيا، MIT OpenCourseWare. <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/">المقرر الأصلي</a>. الترخيص: <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0 — النسبة، غير تجاري، المشاركة بالمثل</a>.</p>
<p>هذه ترجمة وتكييف عربيان غير رسميين، ولا تعنيان تأييد MIT. الترجمة تحت الترخيص نفسه؛ الشيفرة الأصلية محفوظة دون ترجمة تعليقاتها. لا يُعاد نشر ملف PDF أو صور الأطراف الثالثة. <a href="https://ocw.mit.edu/pages/privacy-and-terms-of-use/">شروط الاستخدام</a>.</p>
</div>`,l={book:s,chapter:n,chapterTitle:a,slug:e,title:c,headings:t,html:p};export{s as book,n as chapter,a as chapterTitle,l as default,t as headings,p as html,e as slug,c as title};
