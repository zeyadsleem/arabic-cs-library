const s="mit-6100l",n="lecture-09",t="المحاضرة 9: دوال Lambda، والصفوف (Tuples)، والقوائم (Lists)",e="exercises",a="المحاضرة 9: تمرين الإصبع وحلّه الرسمي — حاصل الضرب النقطي",p=[{depth:2,id:"صفحة-المصدر-1-تمارين-الأصابع-للمحاضرة-9",text:"صفحة المصدر 1: تمارين الأصابع للمحاضرة 9"},{depth:3,id:"1-السؤال-1-من-1",text:"1) السؤال 1 من 1"},{depth:2,id:"صفحة-المصدر-2-الإسناد",text:"صفحة المصدر 2: الإسناد"}],l=`<h1>المحاضرة 9: تمرين الإصبع وحلّه الرسمي — حاصل الضرب النقطي (Dot Product)</h1>
<p>المصدر: آنا بيل (Ana Bell)، معهد ماساتشوستس للتكنولوجيا، MIT OpenCourseWare، مقرر <strong>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام بايثون</strong>، خريف 2022 (Fall 2022). هذه ترجمة وتكييف عربيان غير رسميان بموجب <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>، ولا تعنيان اعتماد MIT أو تأييده. <a href="https://ocw.mit.edu/terms/">شروط الاستخدام والإسناد</a>.</p>
<p>المصادر الدقيقة: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-9-lambda-functions-tuples-and-lists/">السؤال في صفحة المحاضرة</a>، <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_ex09_sol_pdf/">صفحة مورد الحل</a>، <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex09_sol.pdf">PDF الحل الرسمي</a>.</p>
<div class="exercises"><h2 id="صفحة-المصدر-1-تمارين-الأصابع-للمحاضرة-9">صفحة المصدر 1: تمارين الأصابع للمحاضرة 9</h2>
<p>موعد تسليم الأسئلة أدناه: الأربعاء 12 أكتوبر 2022، الساعة 03:00:00 مساءً. هذا هو موعد المقرر الأصلي، وليس موعدًا جديدًا لهذه الترجمة.</p>
<h3 id="1-السؤال-1-من-1">1) السؤال 1 من 1</h3>
<p>نفّذ الدالة التي تستوفي المواصفة التالية:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">dot_product</span>(<span class="hljs-params">tA, tB</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    tA: a tuple of numbers
    tB: a tuple of numbers of the same length as tA
    Assumes tA and tB are the same length.
    Returns a tuple where the:
    * first element is the length of one of the tuples
    * second element is the sum of the pairwise products of tA and tB
    &quot;&quot;&quot;</span>
    <span class="hljs-comment"># Your code here</span>
</code></pre>
<p>أمثلة:</p>
<pre><code class="language-python">tA = (<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>)
tB = (<span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>)
<span class="hljs-built_in">print</span>(dot_product(tA, tB)) <span class="hljs-comment"># prints (3,32)</span>
</code></pre>
<p>دالتك هنا:</p>
<pre><code class="language-python"><span class="hljs-comment"># your function here</span>
</code></pre>
<p>تبقّى لك عدد لا نهائي من مرات التسليم.</p>
<p>هذا هو الحل الذي كتبناه:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">dot_product</span>(<span class="hljs-params">tA, tB</span>):
    tot = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(tA)):
        tot += tA[i]*tB[i]
    <span class="hljs-keyword">return</span> (<span class="hljs-built_in">len</span>(tA), tot)
</code></pre>
<p>ملاحظة تحريرية: نُسخت الشفرة من ملف PDF الرسمي مع الحفاظ على أسماء المتغيّرات وعلامات الاقتباس والمسافات البادئة. ملف PDF الاستخراجي لا يملك تسلسل بايتات لملف Python يمكن ادّعاء مطابقته بايتًا ببايت.</p>
<h2 id="صفحة-المصدر-2-الإسناد">صفحة المصدر 2: الإسناد</h2>
<p>MIT OpenCourseWare — https://ocw.mit.edu</p>
<p>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام بايثون.</p>
<p>خريف 2022.</p>
<p>للمعلومات المتعلقة بالاستشهاد بهذه المواد أو بشروط الاستخدام، زُر: https://ocw.mit.edu/terms</p>
</div>`,o={book:s,chapter:n,chapterTitle:t,slug:e,title:a,headings:p,html:l};export{s as book,n as chapter,t as chapterTitle,o as default,p as headings,l as html,e as slug,a as title};
