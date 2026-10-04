const s="mit-6100l",n="lecture-04",e="المحاضرة 4: التكرارات على النصوص، والتخمين والتحقّق، والأعداد الثنائية",t="exercises",p="المحاضرة ٤: تمرين الأصابع وحلّه الرسمي",o=[{depth:2,id:"صفحة-المصدر-1-تمارين-الأصابع-للمحاضرة-٤",text:"صفحة المصدر 1: تمارين الأصابع للمحاضرة ٤"},{depth:3,id:"1-السؤال-1-من-1",text:"1) السؤال 1 من 1"},{depth:2,id:"صفحة-المصدر-2-الإسناد",text:"صفحة المصدر 2: الإسناد"}],a=`<h1>المحاضرة ٤: تمرين الأصابع وحلّه الرسمي</h1>
<p>المصدر: آنا بيل (Ana Bell)، معهد ماساتشوستس للتكنولوجيا، MIT OpenCourseWare، مقرر <strong>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام بايثون</strong>، خريف 2022 (Fall 2022). هذه ترجمة وتكييف عربيان غير رسميان بموجب <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>، ولا تعنيان اعتماد MIT أو تأييده. لا تُعاد طباعة صور الأطراف الثالثة المستثناة أو ملفات PDF؛ يرد المحتوى نصيًا. <a href="https://ocw.mit.edu/terms/">شروط الاستخدام والإسناد</a>.</p>
<p>المصادر الدقيقة: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-4-loops-over-strings-guess-and-check-binary/">السؤال في صفحة المحاضرة</a>، <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_ex04_sol_pdf/">صفحة مورد الحل</a>، <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex04_sol.pdf">PDF الحل الرسمي</a>.</p>
<div class="exercises"><h2 id="صفحة-المصدر-1-تمارين-الأصابع-للمحاضرة-٤">صفحة المصدر 1: تمارين الأصابع للمحاضرة ٤</h2>
<p>موعد تسليم الأسئلة أدناه: الأربعاء 21 سبتمبر 2022، الساعة 03:00:00 مساءً. هذا هو موعد المقرر الأصلي، وليس موعدًا جديدًا لهذه الترجمة.</p>
<h3 id="1-السؤال-1-من-1">1) السؤال 1 من 1</h3>
<p>افترض أنك أُعطيت متغيّرًا صحيحًا موجبًا اسمه <code>N</code>. اكتب قطعة من شيفرة بايثون تجد الجذر التكعيبي (cube root) لـ<code>N</code>. تطبع الشيفرة الجذر التكعيبي إذا كان <code>N</code> مكعّبًا كاملًا (perfect cube)، أو تطبع <code>error</code> إذا لم يكن كذلك.</p>
<p>تلميح: استخدم حلقة (loop) تزيد عدّادًا (counter) — وأنت تقرّر متى يتوقف العدّاد.</p>
<p>محرر الإجابة في الأصل، السطر 1:</p>
<pre><code class="language-python"><span class="hljs-comment"># Write your code here</span>
</code></pre>
<p>تبقّى لك عدد لا نهائي من مرات التسليم.</p>
<p>هذا هو الحل الذي كتبناه:</p>
<pre><code class="language-python">i = <span class="hljs-number">1</span>
<span class="hljs-keyword">while</span> i**<span class="hljs-number">3</span> &lt; N:
    i += <span class="hljs-number">1</span>
<span class="hljs-keyword">if</span> i**<span class="hljs-number">3</span> == N:
    <span class="hljs-built_in">print</span>(i)
<span class="hljs-keyword">else</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;error&#x27;</span>)
</code></pre>
<p>ملاحظة تحريرية: نُسخت الشفرة من ملف PDF الرسمي مع الحفاظ على أسماء المتغيّرات وعلامات الاقتباس والمسافات البادئة والتعليق. ملف PDF لا يملك تسلسل بايتات لملف Python يمكن ادعاء مطابقته بايتًا ببايت.</p>
<h2 id="صفحة-المصدر-2-الإسناد">صفحة المصدر 2: الإسناد</h2>
<p>MIT OpenCourseWare — https://ocw.mit.edu</p>
<p>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام بايثون.</p>
<p>خريف 2022.</p>
<p>للمعلومات المتعلقة بالاستشهاد بهذه المواد أو بشروط الاستخدام، زُر: https://ocw.mit.edu/terms</p>
</div>`,c={book:s,chapter:n,chapterTitle:e,slug:t,title:p,headings:o,html:a};export{s as book,n as chapter,e as chapterTitle,c as default,o as headings,a as html,t as slug,p as title};
