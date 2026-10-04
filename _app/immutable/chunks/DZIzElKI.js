const s="mit-6100l",e="lecture-15",n="المحاضرة 15: الاستدعاء الذاتي (Recursion)",a="exercises",t="تمرين المحاضرة 15 وحلّه: القوة بالاستدعاء الذاتي",o=[{depth:2,id:"1-السؤال-1-من-1",text:"1) السؤال 1 من 1"},{depth:2,id:"إليك-الحل-الذي-كتبناه",text:"إليك الحل الذي كتبناه"},{depth:2,id:"إشعار-المصدر-الختامي",text:"إشعار المصدر الختامي"}],p=`<div class="exercises"><h1>التمرين القصير للمحاضرة 15 (Finger Exercises Lecture 15)</h1>
<p>المصادر: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-15-recursion/">السؤال في صفحة المحاضرة</a>، و<a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex15_sol.pdf">ملف الحل الرسمي</a>.</p>
<p>إعداد الأصل: <strong>Ana Bell / MIT OpenCourseWare، معهد ماساتشوستس للتكنولوجيا</strong>، مقرر 6.100L، خريف 2022. ترجمة وتكييف عربيان غير رسميين للاستخدام غير التجاري، ولا يعنيان اعتماد MIT. الترخيص: <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>، مع احترام استثناءات الأطراف الثالثة في الأصل.</p>
<p>كانت الأسئلة أدناه مستحقة يوم الأربعاء 2 نوفمبر 2022، الساعة 03:00:00 مساءً.</p>
<h2 id="1-السؤال-1-من-1">1) السؤال 1 من 1</h2>
<p>نفّذ الدالة التي تستوفي المواصفات التالية:</p>
<ul>
<li><code>base</code>: عدد صحيح (Integer) أو عدد ذو فاصلة عائمة (Float).</li>
<li><code>exp</code>: عدد صحيح أكبر من أو يساوي صفرًا.</li>
<li>تُرجع <code>base</code> مرفوعًا إلى القوة <code>exp</code> باستخدام الاستدعاء الذاتي (Recursion).</li>
<li>تلميح: الحالة الأساسية (Base case) عندما <code>exp = 0</code>. وإلا، في الحالة العودية (Recursive case)، تُرجع حاصل ضرب <code>base</code> في <code>base</code> مرفوعًا إلى القوة <code>exp-1</code>.</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">recur_power</span>(<span class="hljs-params">base, exp</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    base: int or float.
    exp: int &gt;= 0

    Returns base to the power of exp using recursion.
    Hint: Base case is when exp = 0. Otherwise, in the recursive
    case you return base * base^(exp-1).
    &quot;&quot;&quot;</span>
    <span class="hljs-comment"># Your code here</span>

<span class="hljs-comment"># Examples:</span>
<span class="hljs-built_in">print</span>(recur_power(<span class="hljs-number">2</span>,<span class="hljs-number">5</span>)  <span class="hljs-comment"># prints 32</span>
</code></pre>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> ينقص سطر المثال قوس إغلاق في الأصل نفسه؛ أُبقي كما هو، وليس هذا خطأ في الترجمة. الرمز <code>^</code> في نص التلميح وصف رياضي للقوة، وليس معامل القوة في Python.</p>
</blockquote>
<p>حقل الإجابة في الأصل:</p>
<pre><code class="language-python"><span class="hljs-comment"># your function here</span>
</code></pre>
<p>لديك عدد غير محدود من محاولات التسليم المتبقية.</p>
<h2 id="إليك-الحل-الذي-كتبناه">إليك الحل الذي كتبناه</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">recur_power</span>(<span class="hljs-params">base, exp</span>):
    <span class="hljs-keyword">if</span> exp &lt;= <span class="hljs-number">0</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>
    <span class="hljs-keyword">return</span> base * recur_power(base, exp - <span class="hljs-number">1</span>)
</code></pre>
<h2 id="إشعار-المصدر-الختامي">إشعار المصدر الختامي</h2>
<p>MIT OpenCourseWare — <a href="https://ocw.mit.edu">https://ocw.mit.edu</a>. مقرر 6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python، خريف 2022. لمعلومات الاستشهاد بهذه المواد وشروط الاستخدام: <a href="https://ocw.mit.edu/terms">https://ocw.mit.edu/terms</a>.</p>
</div>`,c={book:s,chapter:e,chapterTitle:n,slug:a,title:t,headings:o,html:p};export{s as book,e as chapter,n as chapterTitle,c as default,o as headings,p as html,a as slug,t as title};
