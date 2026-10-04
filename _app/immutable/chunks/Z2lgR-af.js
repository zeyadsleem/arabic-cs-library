const s="mit-6100l",n="lecture-13",a="المحاضرة 13: الاستثناءات (Exceptions) والتأكيدات (Assertions)",t="exercises",e="المحاضرة 13: تمرين أطوال السلاسل النصية وحله",l=[{depth:2,id:"المصادر-والنسبة-والترخيص",text:"المصادر والنسبة والترخيص"},{depth:2,id:"الصفحة-1-السؤال-1-من-1",text:"الصفحة 1 — السؤال 1 من 1"},{depth:2,id:"الصفحة-2-هذا-هو-الحل-الذي-كتبناه",text:"الصفحة 2 — هذا هو الحل الذي كتبناه"},{depth:2,id:"الصفحة-3-بيانات-النشر-الأصلية",text:"الصفحة 3 — بيانات النشر الأصلية"}],o=`<div class="exercises"><h1>تمارين التطبيق القصيرة — المحاضرة 13</h1>
<h2 id="المصادر-والنسبة-والترخيص">المصادر والنسبة والترخيص</h2>
<p>المصادر الأصلية الدقيقة: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-13-exceptions-assertions/">صفحة المحاضرة ونص التمرين</a>، <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/finger-exercises/">صفحة التمارين</a>، <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_ex13_sol_pdf/">صفحة الحل الرسمي</a>، <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex13_sol.pdf">ملف الحل الأصلي PDF</a>.</p>
<p>المادة الأصلية: <strong>Ana Bell (آنا بيل)، MIT OpenCourseWare، Massachusetts Institute of Technology</strong>، <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/">6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python، خريف 2022 (Fall 2022)</a>، برخصة <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>. هذه ترجمة وتكييف عربي <strong>غير رسمي وغير تجاري</strong>، لا تأييد ولا اعتماد له من MIT؛ تُشارك الترجمة بالمثل بالرخصة نفسها مع النسبة. لا صور مستبعدة من البيان هنا.</p>
<h2 id="الصفحة-1-السؤال-1-من-1">الصفحة 1 — السؤال 1 من 1</h2>
<p>الموعد النهائي للأسئلة أدناه: <strong>الأربعاء 26 أكتوبر 2022، الساعة 03:00:00 مساءً</strong>. هذا موعد تاريخي كما في المصدر، وليس تكليفًا حاليًا.</p>
<p>نفّذ الدالة التي تحقق المواصفات الآتية:</p>
<ul>
<li><code>L</code> قائمة غير فارغة (Non-empty list) تتكون من أحد النوعين: عناصر سلسلة نصية (String)، أو قائمة فرعية غير فارغة من عناصر سلسلة نصية.</li>
<li>تُعيد مجموع أطوال جميع السلاسل النصية في <code>L</code> وأطوال السلاسل النصية في القوائم الفرعية لـ<code>L</code>.</li>
<li>إذا احتوت <code>L</code> عنصرًا ليس سلسلة نصية ولا قائمة، أو احتوت قوائم <code>L</code> الفرعية عنصرًا ليس سلسلة نصية، فأثِر استثناء خطأ القيمة (<code>ValueError</code>).</li>
</ul>
<p>الشفرة التالية محفوظة حرفيًا من نص التمرين في صفحة المحاضرة، بما في ذلك النص الإنجليزي داخل سلسلة التوثيق (Docstring) والتعليقات:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">sum_str_lengths</span>(<span class="hljs-params">L</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    L is a non-empty list containing either: 
    * string elements or 
    * a non-empty sublist of string elements
    Returns the sum of the length of all strings in L and 
    lengths of strings in the sublists of L. If L contains an 
    element that is not a string or a list, or L&#x27;s sublists 
    contain an element that is not a string, raise a ValueError.
    &quot;&quot;&quot;</span>
    <span class="hljs-comment"># Your code here  </span>

<span class="hljs-comment"># Examples:</span>
<span class="hljs-built_in">print</span>(sum_str_lengths([<span class="hljs-string">&quot;abcd&quot;</span>, [<span class="hljs-string">&quot;e&quot;</span>, <span class="hljs-string">&quot;fg&quot;</span>]]))  <span class="hljs-comment"># prints 7</span>
<span class="hljs-built_in">print</span>(sum_str_lengths([<span class="hljs-number">12</span>, [<span class="hljs-string">&quot;e&quot;</span>, <span class="hljs-string">&quot;fg&quot;</span>]]))      <span class="hljs-comment"># raises ValueError</span>
<span class="hljs-built_in">print</span>(sum_str_lengths([<span class="hljs-string">&quot;abcd&quot;</span>, [<span class="hljs-number">3</span>, <span class="hljs-string">&quot;fg&quot;</span>]]))    <span class="hljs-comment"># raises ValueError</span>
</code></pre>
<p>ترجمة التعليقات: «شفرتك هنا». الأمثلة: الأول يطبع <code>7</code>، والثاني يثير <code>ValueError</code> لوجود <code>12</code>، والثالث يثير <code>ValueError</code> لوجود <code>3</code> داخل القائمة الفرعية.</p>
<p>يعرض حقل الإجابة في PDF السطر الآتي؛ ترجمة التعليق: «دالتك هنا»:</p>
<pre><code class="language-python"><span class="hljs-comment"># your function here</span>
</code></pre>
<p><strong>بقي لديك عدد غير محدود من محاولات التسليم.</strong> هذه عبارة واجهة التسليم في الأصل.</p>
<h2 id="الصفحة-2-هذا-هو-الحل-الذي-كتبناه">الصفحة 2 — هذا هو الحل الذي كتبناه</h2>
<p>الحل الرسمي كاملًا، دون تغيير أسماء المتغيرات أو الاختبارات أو الاستثناءات. استُعيدت إزاحات الأسطر من تخطيط PDF؛ لأن المسافات في استخراج النص ليست ملف Python أصليًا، لا يُدّعى التطابق البايتّي مع PDF نفسه.</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">sum_str_lengths</span>(<span class="hljs-params">L</span>):
    total = <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> L:
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">type</span>(i) == <span class="hljs-built_in">str</span>:
            total += <span class="hljs-built_in">len</span>(i)
        <span class="hljs-keyword">elif</span> <span class="hljs-built_in">type</span>(i) == <span class="hljs-built_in">list</span>:
            <span class="hljs-keyword">for</span> e <span class="hljs-keyword">in</span> i:
                <span class="hljs-keyword">if</span> <span class="hljs-built_in">type</span>(e) == <span class="hljs-built_in">str</span>:
                    total += <span class="hljs-built_in">len</span>(e)
                <span class="hljs-keyword">else</span>:
                    <span class="hljs-keyword">raise</span> ValueError
        <span class="hljs-keyword">else</span>:
            <span class="hljs-keyword">raise</span> ValueError
    <span class="hljs-keyword">return</span> total
</code></pre>
<h2 id="الصفحة-3-بيانات-النشر-الأصلية">الصفحة 3 — بيانات النشر الأصلية</h2>
<p>MIT OpenCourseWare — <a href="https://ocw.mit.edu">https://ocw.mit.edu</a></p>
<p>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python. خريف 2022.</p>
<p>للمعلومات حول الاستشهاد بهذه المواد أو شروط الاستخدام، زُر: <a href="https://ocw.mit.edu/terms">https://ocw.mit.edu/terms</a>.</p>
</div>`,p={book:s,chapter:n,chapterTitle:a,slug:t,title:e,headings:l,html:o};export{s as book,n as chapter,a as chapterTitle,p as default,l as headings,o as html,t as slug,e as title};
