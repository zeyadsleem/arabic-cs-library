const s="mit-6100l",n="lecture-02",e="المحاضرة 2: النصوص، والإدخال/الإخراج، والتفرّع",t="exercises",a="المحاضرة ٢: تمرين الأصابع وحلّه الرسمي",p=[{depth:2,id:"صفحة-المصدر-1-تمارين-الأصابع-للمحاضرة-٢",text:"صفحة المصدر 1: تمارين الأصابع للمحاضرة ٢"},{depth:3,id:"1-السؤال-1-من-1",text:"1) السؤال 1 من 1"},{depth:2,id:"صفحة-المصدر-2-الإسناد",text:"صفحة المصدر 2: الإسناد"}],o=`<h1>المحاضرة ٢: تمرين الأصابع وحلّه الرسمي</h1>
<p>المصدر: آنا بيل (Ana Bell)، معهد ماساتشوستس للتكنولوجيا، MIT OpenCourseWare، مقرر <strong>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام بايثون</strong>، خريف 2022 (Fall 2022). هذه ترجمة وتكييف عربيان غير رسميين بموجب <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>، ولا تعنيان اعتماد MIT أو تأييده. لا تُعاد طباعة صور الأطراف الثالثة المستثناة أو ملفات PDF؛ يرد المحتوى نصيًا. <a href="https://ocw.mit.edu/terms/">شروط الاستخدام والإسناد</a>.</p>
<p>المصادر الدقيقة: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-2-strings-inputoutput-branching/">السؤال في صفحة المحاضرة</a>، <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_ex02_sol_pdf/">صفحة مورد الحل</a>، <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex02_sol.pdf">PDF الحل الرسمي</a>.</p>
<div class="exercises"><h2 id="صفحة-المصدر-1-تمارين-الأصابع-للمحاضرة-٢">صفحة المصدر 1: تمارين الأصابع للمحاضرة ٢</h2>
<p>موعد تسليم الأسئلة أدناه: الأربعاء 14 سبتمبر 2022، الساعة 03:00:00 مساءً. هذا موعد المقرر الأصلي، وليس موعدًا جديدًا لهذه الترجمة.</p>
<h3 id="1-السؤال-1-من-1">1) السؤال 1 من 1</h3>
<p>افترض أنك أُعطيت متغيرًا (variable) اسمه <code>number</code> وله قيمة عددية (numerical value). اكتب قطعة من شفرة بايثون تطبع إحدى السلاسل النصية (strings) الآتية:</p>
<ul>
<li><code>positive</code> إذا كان المتغير <code>number</code> موجبًا.</li>
<li><code>negative</code> إذا كان المتغير <code>number</code> سالبًا.</li>
<li><code>zero</code> إذا كان المتغير <code>number</code> يساوي صفرًا.</li>
</ul>
<p>محرر الإجابة في الأصل، السطر 1:</p>
<pre><code class="language-python"><span class="hljs-comment"># Write your code here</span>
</code></pre>
<p>تبقّى لك عدد لا نهائي من مرات التسليم.</p>
<p>هذا هو الحل الذي كتبناه:</p>
<pre><code class="language-python"><span class="hljs-keyword">if</span> number &gt; <span class="hljs-number">0</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;positive&#x27;</span>)
<span class="hljs-keyword">elif</span> number &lt; <span class="hljs-number">0</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;negative&#x27;</span>)
<span class="hljs-keyword">else</span>:
    <span class="hljs-built_in">print</span>(<span class="hljs-string">&#x27;zero&#x27;</span>)
</code></pre>
<p>ملاحظة تحريرية: لا يوجد ملف شفرة مستقل لهذا الحل في ارتباطات المحاضرة. نُسخت الشفرة من PDF مع الحفاظ على التعليق وأسماء المتغيرات وعلامات الاقتباس والمسافة البادئة الظاهرة. لا يملك PDF تسلسل بايتات لملف Python يمكن ادعاء مطابقته؛ أما ملف شفرة المحاضرة المستقل فيرد في <a href="/arabic-cs-library/book/mit-6100l/lecture-02/notes">الملاحظات</a> للتحقق البايتي.</p>
<h2 id="صفحة-المصدر-2-الإسناد">صفحة المصدر 2: الإسناد</h2>
<p>MIT OpenCourseWare — https://ocw.mit.edu</p>
<p>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام بايثون.</p>
<p>خريف 2022.</p>
<p>للمعلومات المتعلقة بالاستشهاد بهذه المواد أو بشروط الاستخدام، زُر: https://ocw.mit.edu/terms</p>
</div>`,l={book:s,chapter:n,chapterTitle:e,slug:t,title:a,headings:p,html:o};export{s as book,n as chapter,e as chapterTitle,l as default,p as headings,o as html,t as slug,a as title};
