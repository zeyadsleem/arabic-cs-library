const s="mit-6100l",n="lecture-06",a="المحاضرة 6: البحث بالتنصيف (Bisection Search)",e="exercises",t="المحاضرة ٦: تمرين الأصابع وحلّه الرسمي",p=[{depth:2,id:"صفحة-المصدر-1-تمارين-الأصابع-للمحاضرة-٦",text:"صفحة المصدر 1: تمارين الأصابع للمحاضرة ٦"},{depth:3,id:"1-السؤال-1-من-1",text:"1) السؤال 1 من 1"},{depth:2,id:"صفحة-المصدر-2-الإسناد",text:"صفحة المصدر 2: الإسناد"}],l=`<h1>المحاضرة ٦: تمرين الأصابع وحلّه الرسمي</h1>
<p>المصدر: آنا بيل (Ana Bell)، معهد ماساتشوستس للتكنولوجيا، MIT OpenCourseWare، مقرر <strong>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام بايثون</strong>، خريف 2022 (Fall 2022). هذه ترجمة وتكييف عربيان غير رسميان بموجب <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>، ولا تعنيان اعتماد MIT أو تأييده. لا تُعاد طباعة صور الأطراف الثالثة المستثناة أو ملفات PDF؛ يرد المحتوى نصيًا. <a href="https://ocw.mit.edu/terms/">شروط الاستخدام والإسناد</a>.</p>
<p>المصادر الدقيقة: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-6-bisection-search/">السؤال في صفحة المحاضرة</a>، <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_ex06_sol_pdf/">صفحة مورد الحل</a>، <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex06_sol.pdf">PDF الحل الرسمي</a>.</p>
<div class="exercises"><h2 id="صفحة-المصدر-1-تمارين-الأصابع-للمحاضرة-٦">صفحة المصدر 1: تمارين الأصابع للمحاضرة ٦</h2>
<p>موعد تسليم الأسئلة أدناه: الأربعاء 28 سبتمبر 2022، الساعة 03:00:00 مساءً. هذا هو موعد المقرر الأصلي، وليس موعدًا جديدًا لهذه الترجمة.</p>
<h3 id="1-السؤال-1-من-1">1) السؤال 1 من 1</h3>
<p>افترض أنك أُعطيت عددًا صحيحًا بحيث <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>0</mn><mo>≤</mo><mi>N</mi><mo>≤</mo><mn>1000</mn></mrow><annotation encoding="application/x-tex">0 \\le N \\le 1000</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7804em;vertical-align:-0.136em;"></span><span class="mord">0</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">≤</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.8193em;vertical-align:-0.136em;"></span><span class="mord mathnormal" style="margin-right:0.109em;">N</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">≤</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1000</span></span></span></span>. اكتب قطعة من شيفرة بايثون تستخدم البحث بالتنصيف (bisection search) للتخمين على <code>N</code>. تطبع الشيفرة سطرين: <code>count:</code> مع عدد التخمينات التي استغرقها إيجاد <code>N</code>، و<code>answer:</code> مع قيمة <code>N</code>.</p>
<p>تلميحات: إذا كانت قيمة المنتصف (halfway value) تقع في المنتصف بالضبط بين عددين صحيحين، فاختر الأصغر.</p>
<p>محرر الإجابة في الأصل، السطر 1:</p>
<pre><code class="language-python"><span class="hljs-comment"># Write your code here</span>
</code></pre>
<p>تبقّى لك عدد لا نهائي من مرات التسليم.</p>
<p>هذا هو الحل الذي كتبناه:</p>
<pre><code class="language-python">low = <span class="hljs-number">0</span>
high = <span class="hljs-number">1001</span>
guess = (high+low)//<span class="hljs-number">2</span>
count = <span class="hljs-number">1</span>
<span class="hljs-keyword">while</span> guess != N:
    <span class="hljs-keyword">if</span> guess &lt; N:
        low = guess
    <span class="hljs-keyword">elif</span> guess &gt; N:
        high = guess
    guess = (high+low)//<span class="hljs-number">2</span>
    count += <span class="hljs-number">1</span>

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;count:&quot;</span>,count)
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;answer:&quot;</span>,guess)
</code></pre>
<p>ملاحظة تحريرية: نُسخت الشفرة من ملف PDF الرسمي مع الحفاظ على أسماء المتغيّرات وعلامات الاقتباس والمسافات البادئة والتعليق. ملف PDF لا يملك تسلسل بايتات لملف Python يمكن ادعاء مطابقته بايتًا ببايت.</p>
<h2 id="صفحة-المصدر-2-الإسناد">صفحة المصدر 2: الإسناد</h2>
<p>MIT OpenCourseWare — https://ocw.mit.edu</p>
<p>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام بايثون.</p>
<p>خريف 2022.</p>
<p>للمعلومات المتعلقة بالاستشهاد بهذه المواد أو بشروط الاستخدام، زُر: https://ocw.mit.edu/terms</p>
</div>`,c={book:s,chapter:n,chapterTitle:a,slug:e,title:t,headings:p,html:l};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,l as html,e as slug,t as title};
