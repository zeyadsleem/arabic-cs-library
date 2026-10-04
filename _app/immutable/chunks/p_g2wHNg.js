const s="mit-6100l",n="lecture-11",e="المحاضرة 11: الأسماء المستعارة (Aliasing) والاستنساخ (Cloning)",a="exercises",t="المحاضرة 11: تمرين الإصبع وحلّه الرسمي — الحذف ثم الترتيب",p=[{depth:2,id:"صفحة-المصدر-1-تمارين-الأصابع-للمحاضرة-11",text:"صفحة المصدر 1: تمارين الأصابع للمحاضرة 11"},{depth:3,id:"1-السؤال-1-من-1",text:"1) السؤال 1 من 1"},{depth:2,id:"صفحة-المصدر-2-الإسناد",text:"صفحة المصدر 2: الإسناد"}],o=`<h1>المحاضرة 11: تمرين الإصبع وحلّه الرسمي — الحذف ثم الترتيب (Remove and Sort)</h1>
<p>المصدر: آنا بيل (Ana Bell)، معهد ماساتشوستس للتكنولوجيا، MIT OpenCourseWare، مقرر <strong>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام بايثون</strong>، خريف 2022 (Fall 2022). هذه ترجمة وتكييف عربيان غير رسميان بموجب <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>، ولا تعنيان اعتماد MIT أو تأييده. <a href="https://ocw.mit.edu/terms/">شروط الاستخدام والإسناد</a>.</p>
<p>المصادر الدقيقة: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-11-aliasing-cloning/">السؤال في صفحة المحاضرة</a>، <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_ex11_sol_pdf/">صفحة مورد الحل</a>، <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex11_sol.pdf">PDF الحل الرسمي</a>.</p>
<div class="exercises"><h2 id="صفحة-المصدر-1-تمارين-الأصابع-للمحاضرة-11">صفحة المصدر 1: تمارين الأصابع للمحاضرة 11</h2>
<p>موعد تسليم الأسئلة أدناه: الأربعاء 19 أكتوبر 2022، الساعة 03:00:00 مساءً. هذا هو موعد المقرر الأصلي، وليس موعدًا جديدًا لهذه الترجمة.</p>
<h3 id="1-السؤال-1-من-1">1) السؤال 1 من 1</h3>
<p>نفّذ الدالة التي تستوفي المواصفة التالية:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">remove_and_sort</span>(<span class="hljs-params">Lin, k</span>):
    <span class="hljs-string">&quot;&quot;&quot; Lin is a list of ints
    k is an int &gt;= 0
    Mutates Lin to remove the first k elements in Lin and
    then sorts the remaining elements in ascending order.
    If you run out of items to remove, Lin is mutated to an empty list.
    Does not return anything.
    &quot;&quot;&quot;</span>
    <span class="hljs-comment"># Your code here</span>
</code></pre>
<p>أمثلة:</p>
<pre><code class="language-python">L = [<span class="hljs-number">1</span>,<span class="hljs-number">6</span>,<span class="hljs-number">3</span>]
k = <span class="hljs-number">1</span>
remove_and_sort(L, k)
<span class="hljs-built_in">print</span>(L)
<span class="hljs-comment"># prints the list [3, 6]</span>
</code></pre>
<p>دالتك هنا:</p>
<pre><code class="language-python"><span class="hljs-comment"># your function here</span>
</code></pre>
<p>تبقّى لك عدد لا نهائي من مرات التسليم.</p>
<p>هذا هو الحل الذي كتبناه:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">remove_and_sort</span>(<span class="hljs-params">Lin, k</span>):
    <span class="hljs-keyword">if</span> <span class="hljs-built_in">len</span>(Lin) &lt;= k:
        Lin.clear()
        <span class="hljs-keyword">return</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(k):
        <span class="hljs-keyword">del</span>(Lin[<span class="hljs-number">0</span>])
    Lin.sort()
</code></pre>
<p>ملاحظة تحريرية: نُسخت الشفرة من ملف PDF الرسمي مع الحفاظ على أسماء المتغيّرات وعلامات الاقتباس والمسافات البادئة.</p>
<h2 id="صفحة-المصدر-2-الإسناد">صفحة المصدر 2: الإسناد</h2>
<p>MIT OpenCourseWare — https://ocw.mit.edu</p>
<p>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام بايثون.</p>
<p>خريف 2022.</p>
<p>للمعلومات المتعلقة بالاستشهاد بهذه المواد أو بشروط الاستخدام، زُر: https://ocw.mit.edu/terms</p>
</div>`,l={book:s,chapter:n,chapterTitle:e,slug:a,title:t,headings:p,html:o};export{s as book,n as chapter,e as chapterTitle,l as default,p as headings,o as html,a as slug,t as title};
