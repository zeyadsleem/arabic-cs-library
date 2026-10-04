const s="mit-6100l",n="lecture-12",a="المحاضرة 12: فهم القوائم، والدوال ككائنات، والاختبار، وتصحيح الأخطاء",e="exercises",t="المحاضرة 12: تمرين الإصبع وحلّه الرسمي — عدّ الجذور التربيعية",p=[{depth:2,id:"صفحة-المصدر-1-تمارين-الأصابع-للمحاضرة-12",text:"صفحة المصدر 1: تمارين الأصابع للمحاضرة 12"},{depth:3,id:"1-السؤال-1-من-1",text:"1) السؤال 1 من 1"},{depth:2,id:"صفحة-المصدر-2-الإسناد",text:"صفحة المصدر 2: الإسناد"}],l=`<h1>المحاضرة 12: تمرين الإصبع وحلّه الرسمي — عدّ الجذور التربيعية (Count Square Roots)</h1>
<p>المصدر: آنا بيل (Ana Bell)، معهد ماساتشوستس للتكنولوجيا، MIT OpenCourseWare، مقرر <strong>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام بايثون</strong>، خريف 2022 (Fall 2022). هذه ترجمة وتكييف عربيان غير رسميان بموجب <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>، ولا تعنيان اعتماد MIT أو تأييده. <a href="https://ocw.mit.edu/terms/">شروط الاستخدام والإسناد</a>.</p>
<p>المصادر الدقيقة: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-12-list-comprehension-functions-as-objects-testing-debugging/">السؤال في صفحة المحاضرة</a>، <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_ex12_sol_pdf/">صفحة مورد الحل</a>، <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex12_sol.pdf">PDF الحل الرسمي</a>.</p>
<div class="exercises"><h2 id="صفحة-المصدر-1-تمارين-الأصابع-للمحاضرة-12">صفحة المصدر 1: تمارين الأصابع للمحاضرة 12</h2>
<p>موعد تسليم الأسئلة أدناه: الاثنين 24 أكتوبر 2022، الساعة 03:00:00 مساءً. هذا هو موعد المقرر الأصلي، وليس موعدًا جديدًا لهذه الترجمة.</p>
<h3 id="1-السؤال-1-من-1">1) السؤال 1 من 1</h3>
<p>نفّذ الدالة التي تستوفي المواصفة التالية:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">count_sqrts</span>(<span class="hljs-params">nums_list</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    nums_list: a list
    Assumes that nums_list only contains positive numbers and that there are no duplicates.
    Returns how many elements in nums_list are exact squares of
    elements in the same list, including
    &quot;&quot;&quot;</span>
    <span class="hljs-comment"># Your code here</span>
</code></pre>
<p><strong>ملاحظة المترجم:</strong> تنتهي جملة المواصفة في ملف الحل الأصلي عند كلمة <code>including</code> وهي ناقصة؛ يبدو أنّ هذا هو النصّ المنشور على OCW. نُقل بحذافيره ولم يُخمَّن تتمّة له.</p>
<p>أمثلة:</p>
<pre><code class="language-python"><span class="hljs-built_in">print</span>(count_sqrts([<span class="hljs-number">3</span>,<span class="hljs-number">4</span>,<span class="hljs-number">2</span>,<span class="hljs-number">1</span>,<span class="hljs-number">9</span>,<span class="hljs-number">25</span>])) <span class="hljs-comment"># prints 3</span>
</code></pre>
<p>دالتك هنا:</p>
<pre><code class="language-python"><span class="hljs-comment"># your function here</span>
</code></pre>
<p>تبقّى لك عدد لا نهائي من مرات التسليم.</p>
<p>هذا هو الحل الذي كتبناه:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">count_sqrts</span>(<span class="hljs-params">nums_list</span>):
    cnt = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> nums_list:
        <span class="hljs-keyword">if</span> i*i <span class="hljs-keyword">in</span> nums_list:
            cnt += <span class="hljs-number">1</span>
    <span class="hljs-keyword">return</span> cnt
</code></pre>
<p>ملاحظة تحريرية: نُسخت الشفرة من ملف PDF الرسمي مع الحفاظ على أسماء المتغيّرات وعلامات الاقتباس والمسافات البادئة.</p>
<h2 id="صفحة-المصدر-2-الإسناد">صفحة المصدر 2: الإسناد</h2>
<p>MIT OpenCourseWare — https://ocw.mit.edu</p>
<p>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام بايثون.</p>
<p>خريف 2022.</p>
<p>للمعلومات المتعلقة بالاستشهاد بهذه المواد أو بشروط الاستخدام، زُر: https://ocw.mit.edu/terms</p>
</div>`,o={book:s,chapter:n,chapterTitle:a,slug:e,title:t,headings:p,html:l};export{s as book,n as chapter,a as chapterTitle,o as default,p as headings,l as html,e as slug,t as title};
