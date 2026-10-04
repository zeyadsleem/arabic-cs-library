const s="mit-6100l",n="lecture-05",e="المحاضرة 5: الأعداد العشرية العائمة وطرق التقريب",t="exercises",p="المحاضرة ٥: تمرين الأصابع وحلّه الرسمي",a=[{depth:2,id:"صفحة-المصدر-1-تمارين-الأصابع-للمحاضرة-٥",text:"صفحة المصدر 1: تمارين الأصابع للمحاضرة ٥"},{depth:3,id:"1-السؤال-1-من-1",text:"1) السؤال 1 من 1"},{depth:2,id:"صفحة-المصدر-2-الإسناد",text:"صفحة المصدر 2: الإسناد"}],o=`<h1>المحاضرة ٥: تمرين الأصابع وحلّه الرسمي</h1>
<p>المصدر: آنا بيل (Ana Bell)، معهد ماساتشوستس للتكنولوجيا، MIT OpenCourseWare، مقرر <strong>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام بايثون</strong>، خريف 2022 (Fall 2022). هذه ترجمة وتكييف عربيان غير رسميان بموجب <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>، ولا تعنيان اعتماد MIT أو تأييده. لا تُعاد طباعة صور الأطراف الثالثة المستثناة أو ملفات PDF؛ يرد المحتوى نصيًا. <a href="https://ocw.mit.edu/terms/">شروط الاستخدام والإسناد</a>.</p>
<p>المصادر الدقيقة: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-5-floats-and-approximation-methods/">السؤال في صفحة المحاضرة</a>، <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/resources/mit6_100l_f22_ex05_sol_pdf/">صفحة مورد الحل</a>، <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex05_sol.pdf">PDF الحل الرسمي</a>.</p>
<div class="exercises"><h2 id="صفحة-المصدر-1-تمارين-الأصابع-للمحاضرة-٥">صفحة المصدر 1: تمارين الأصابع للمحاضرة ٥</h2>
<p>موعد تسليم الأسئلة أدناه: الاثنين 26 سبتمبر 2022، الساعة 03:00:00 مساءً. هذا هو موعد المقرر الأصلي، وليس موعدًا جديدًا لهذه الترجمة.</p>
<h3 id="1-السؤال-1-من-1">1) السؤال 1 من 1</h3>
<p>افترض أنك أُعطيت متغيّر سلسلة نصية (string variable) اسمه <code>my_str</code>. اكتب قطعة من شيفرة بايثون تطبع سلسلة نصية جديدة تحتوي على المحارف ذات الفهارس الزوجية (even indexed) من <code>my_str</code>. على سبيل المثال، إذا كان <code>my_str = &quot;abcdefg&quot;</code> فيجب أن تطبع شيفرتك <code>aceg</code>.</p>
<p>محرر الإجابة في الأصل، السطر 1:</p>
<pre><code class="language-python"><span class="hljs-comment"># Write your code here</span>
</code></pre>
<p>تبقّى لك عدد لا نهائي من مرات التسليم.</p>
<p>هذا هو الحل الذي كتبناه:</p>
<pre><code class="language-python">s = <span class="hljs-string">&#x27;&#x27;</span>
<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-number">0</span>,<span class="hljs-built_in">len</span>(my_str),<span class="hljs-number">2</span>):
    s += my_str[i]
<span class="hljs-built_in">print</span>(s)
</code></pre>
<p>ملاحظة تحريرية: نُسخت الشفرة من ملف PDF الرسمي مع الحفاظ على أسماء المتغيّرات وعلامات الاقتباس والمسافات البادئة والتعليق. ملف PDF لا يملك تسلسل بايتات لملف Python يمكن ادعاء مطابقته بايتًا ببايت.</p>
<h2 id="صفحة-المصدر-2-الإسناد">صفحة المصدر 2: الإسناد</h2>
<p>MIT OpenCourseWare — https://ocw.mit.edu</p>
<p>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام بايثون.</p>
<p>خريف 2022.</p>
<p>للمعلومات المتعلقة بالاستشهاد بهذه المواد أو بشروط الاستخدام، زُر: https://ocw.mit.edu/terms</p>
</div>`,c={book:s,chapter:n,chapterTitle:e,slug:t,title:p,headings:a,html:o};export{s as book,n as chapter,e as chapterTitle,c as default,a as headings,o as html,t as slug,p as title};
