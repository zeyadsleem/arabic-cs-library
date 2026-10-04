const s="mit-6100l",n="lecture-16",e="المحاضرة 16: الاستدعاء الذاتي على غير الأعداد",a="exercises",t="تمرين المحاضرة 16 وحلّه: تسطيح قائمة",p=[{depth:2,id:"1-السؤال-1-من-1",text:"1) السؤال 1 من 1"},{depth:2,id:"إليك-الحل-الذي-كتبناه",text:"إليك الحل الذي كتبناه"},{depth:2,id:"إشعار-المصدر-الختامي",text:"إشعار المصدر الختامي"}],l=`<div class="exercises"><h1>التمرين القصير للمحاضرة 16 (Finger Exercises Lecture 16)</h1>
<p>المصادر: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-16-recursion-on-non-numerics/">السؤال في صفحة المحاضرة</a>، و<a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex16_sol.pdf">ملف الحل الرسمي</a>.</p>
<p>إعداد الأصل: <strong>Ana Bell / MIT OpenCourseWare، معهد ماساتشوستس للتكنولوجيا</strong>، مقرر 6.100L، خريف 2022. ترجمة وتكييف عربيان غير رسميين للاستخدام غير التجاري، ولا يعنيان اعتماد MIT. الترخيص: <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>، مع احترام استثناءات الأطراف الثالثة في الأصل.</p>
<p>كانت الأسئلة أدناه مستحقة يوم الاثنين 7 نوفمبر 2022، الساعة 03:00:00 مساءً.</p>
<h2 id="1-السؤال-1-من-1">1) السؤال 1 من 1</h2>
<p>نفّذ الدالة التي تستوفي المواصفات التالية:</p>
<ul>
<li><code>L</code>: قائمة (List).</li>
<li>تُرجع نسخة من <code>L</code> تكون نسخة مسطّحة (Flattened version) منها.</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">flatten</span>(<span class="hljs-params">L</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    L: a list
    Returns a copy of L, which is a flattened version of L
    &quot;&quot;&quot;</span>
    <span class="hljs-comment"># Your code here</span>

<span class="hljs-comment"># Examples:</span>
L = [[<span class="hljs-number">1</span>,<span class="hljs-number">4</span>,[<span class="hljs-number">6</span>],<span class="hljs-number">2</span>],[[[<span class="hljs-number">3</span>]],<span class="hljs-number">2</span>],<span class="hljs-number">4</span>,<span class="hljs-number">5</span>]
<span class="hljs-built_in">print</span>(flatten(L)) <span class="hljs-comment"># prints the list [1,4,6,2,3,2,4,5]</span>
</code></pre>
<p>المثال يطبع القائمة <code>[1,4,6,2,3,2,4,5]</code>.</p>
<p>حقل الإجابة في الأصل:</p>
<pre><code class="language-python"><span class="hljs-comment"># your function here</span>
</code></pre>
<p>لديك عدد غير محدود من محاولات التسليم المتبقية.</p>
<h2 id="إليك-الحل-الذي-كتبناه">إليك الحل الذي كتبناه</h2>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">flatten</span>(<span class="hljs-params">L</span>):
    result = []
    <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> L:
        <span class="hljs-keyword">if</span> <span class="hljs-built_in">type</span>(i) == <span class="hljs-built_in">list</span>:
            result.extend(flatten(i))
        <span class="hljs-keyword">else</span>:
            result.append(i)
    <span class="hljs-keyword">return</span> result
</code></pre>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> استُعيدت المسافات البادئة من ترتيب الكود في PDF، لا من الأعمدة المشوّهة في النص المستخرج؛ لم يُغيَّر منطق الحل.</p>
</blockquote>
<h2 id="إشعار-المصدر-الختامي">إشعار المصدر الختامي</h2>
<p>MIT OpenCourseWare — <a href="https://ocw.mit.edu">https://ocw.mit.edu</a>. مقرر 6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python، خريف 2022. لمعلومات الاستشهاد بهذه المواد وشروط الاستخدام: <a href="https://ocw.mit.edu/terms">https://ocw.mit.edu/terms</a>.</p>
</div>`,c={book:s,chapter:n,chapterTitle:e,slug:a,title:t,headings:p,html:l};export{s as book,n as chapter,e as chapterTitle,c as default,p as headings,l as html,a as slug,t as title};
