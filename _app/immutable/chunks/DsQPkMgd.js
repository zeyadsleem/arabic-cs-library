const s="mit-6100l",n="lecture-01",a="المحاضرة 1: مقدمة",p="exercises",l="المحاضرة 1: التمرين القصير والحل والشيفرة الأصلية",e=[{depth:2,id:"صفحة-المصدر-1-التمارين-القصيرة-للمحاضرة-1",text:"صفحة المصدر 1: التمارين القصيرة للمحاضرة 1"},{depth:3,id:"1-السؤال-1-من-1",text:"1) السؤال 1 من 1"},{depth:2,id:"صفحة-المصدر-2-بيانات-النشر",text:"صفحة المصدر 2: بيانات النشر"},{depth:2,id:"ملف-شيفرة-المحاضرة-1-كاملا-دون-تعديل",text:"ملف شيفرة المحاضرة 1 كاملًا دون تعديل"}],c=`<h1>المحاضرة 1: التمرين القصير (Finger Exercise)</h1>
<p>المصادر: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-1-introduction/">نص التمرين في صفحة المحاضرة الرسمية</a>، <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex01_sol.pdf">ملف الحل الرسمي، PDF</a>، <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_lec01_code.py">ملف شيفرة المحاضرة الأصلي، Python</a>.</p>
<p>إعداد الأصل: <strong>آنا بيل (Ana Bell)، MIT OpenCourseWare، معهد ماساتشوستس للتكنولوجيا</strong>؛ مقرر <strong>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python، خريف 2022 (Fall 2022)</strong>. هذه ترجمة وتكييف عربيان غير رسميين، ولا يعنيان اعتماد MIT أو تأييده لهما. الأصل وهذا التكييف متاحان للاستخدام غير التجاري بموجب <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0: نسب المصنف–غير تجاري–الترخيص بالمثل</a>، باستثناء مواد الأطراف الثالثة المستثناة صراحةً في الأصل.</p>
<div class="exercises"><h2 id="صفحة-المصدر-1-التمارين-القصيرة-للمحاضرة-1">صفحة المصدر 1: التمارين القصيرة للمحاضرة 1</h2>
<p>موعد تسليم الأسئلة أدناه هو الاثنين 12 سبتمبر 2022، الساعة 03:00:00 مساءً.</p>
<h3 id="1-السؤال-1-من-1">1) السؤال 1 من 1</h3>
<p>افترض أن ثلاثة متغيرات معرّفة لك مسبقًا: <code>a</code> و<code>b</code> و<code>c</code>. أنشئ متغيرًا اسمه <code>total</code> يجمع <code>a</code> و<code>b</code> ثم يضرب الناتج في <code>c</code>. أدرج سطرًا أخيرًا في شيفرتك لطباعة القيمة: <code>print(total)</code>.</p>
<p>يظهر في محرر الإجابة السطر رقم 1؛ التعليق الأصلي محفوظ كما هو:</p>
<pre><code class="language-python"><span class="hljs-comment"># Write your code here</span>
</code></pre>
<p>لديك عدد لا نهائي من محاولات التسليم المتبقية.</p>
<p>هذا هو الحل الذي كتبناه:</p>
<pre><code class="language-python">total = (a+b)*c
<span class="hljs-built_in">print</span>(total)
</code></pre>
<h2 id="صفحة-المصدر-2-بيانات-النشر">صفحة المصدر 2: بيانات النشر</h2>
<p>MIT OpenCourseWare — https://ocw.mit.edu</p>
<p>6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python.</p>
<p>خريف 2022.</p>
<p>للمعلومات المتعلقة بالاستشهاد بهذه المواد أو شروط الاستخدام، زُر: https://ocw.mit.edu/terms</p>
<h2 id="ملف-شيفرة-المحاضرة-1-كاملا-دون-تعديل">ملف شيفرة المحاضرة 1 كاملًا دون تعديل</h2>
<p><strong>ملاحظة المترجم:</strong> الكتلة التالية نسخة حرفية من ملف Python الرسمي، بما فيها التعليقات الإنجليزية والأسطر الفارغة والمسافات وعلامات الجدولة. المثال الموسوم بأنه معيب بقي كما هو لأنه تمرين لتصحيح الأخطاء (Debugging)، لا حل بديل من المترجم.</p>
<pre><code class="language-python"><span class="hljs-comment">## TYPE THIS IN THE CONSOLE - CHECK THE TYPE OF OBJECTS ##</span>
<span class="hljs-built_in">type</span>(<span class="hljs-number">5</span>)
<span class="hljs-built_in">type</span>(<span class="hljs-number">3.0</span>)

<span class="hljs-comment">## TYPE THIS IN THE CONSOLE - CONVERT TO ANOTHER TYPE ##</span>
<span class="hljs-built_in">float</span>(<span class="hljs-number">3</span>)
<span class="hljs-built_in">int</span>(<span class="hljs-number">3.9</span>)
<span class="hljs-built_in">round</span>(<span class="hljs-number">3.9</span>)

<span class="hljs-comment">## TYPE THIS IN THE CONSOLE - EXPRESSIONS ##</span>
<span class="hljs-number">3</span>+<span class="hljs-number">2</span>
(<span class="hljs-number">4</span>+<span class="hljs-number">2</span>)*<span class="hljs-number">6</span>-<span class="hljs-number">1</span>
<span class="hljs-built_in">type</span>((<span class="hljs-number">4</span>+<span class="hljs-number">2</span>)*<span class="hljs-number">6</span>-<span class="hljs-number">1</span>)
<span class="hljs-built_in">float</span>((<span class="hljs-number">4</span>+<span class="hljs-number">2</span>)*<span class="hljs-number">6</span>-<span class="hljs-number">1</span>)

<span class="hljs-comment">## TYPE THIS IN THE CONSOLE - VARIABLES ##</span>
pi = <span class="hljs-number">355</span>/<span class="hljs-number">113</span>

<span class="hljs-comment">#Compute approximate value for pi</span>
pi = <span class="hljs-number">355</span>/<span class="hljs-number">113</span>
radius = <span class="hljs-number">2.2</span>
area = pi*(radius**<span class="hljs-number">2</span>)
circumference = pi*(radius*<span class="hljs-number">2</span>)

<span class="hljs-comment">## CODE STYLE ##</span>

<span class="hljs-comment"># Example 1</span>
<span class="hljs-comment">#do calculations</span>
a = <span class="hljs-number">355</span>/<span class="hljs-number">113</span> *(<span class="hljs-number">2.2</span>**<span class="hljs-number">2</span>)
c = <span class="hljs-number">355</span>/<span class="hljs-number">113</span> *(<span class="hljs-number">2.2</span>*<span class="hljs-number">2</span>)

<span class="hljs-comment"># Example 2</span>
p = <span class="hljs-number">355</span>/<span class="hljs-number">113</span>
r = <span class="hljs-number">2.2</span>
<span class="hljs-comment">#multiply p with r squared</span>
a = p*(r**<span class="hljs-number">2</span>)
<span class="hljs-comment">#multiply p with r times 2</span>
c = p*(r*<span class="hljs-number">2</span>)

<span class="hljs-comment">#Example 3</span>
<span class="hljs-comment">#calculate area and circumference of a circle using an approximation for pi</span>
pi = <span class="hljs-number">355</span>/<span class="hljs-number">113</span>
radius = <span class="hljs-number">2.2</span>
area = pi*(radius**<span class="hljs-number">2</span>)
circumference = pi*(radius*<span class="hljs-number">2</span>)

<span class="hljs-comment">## CHANGING BINDINGS ##</span>
pi = <span class="hljs-number">3.14</span>
radius = <span class="hljs-number">2.2</span>
area = pi*(radius**<span class="hljs-number">2</span>)
radius = radius+<span class="hljs-number">1</span>


<span class="hljs-comment">## DEBUG THIS - SWAP VALUES ##</span>
<span class="hljs-comment"># Given x and y below, the code incorrectly swaps the values. Fix it!</span>
x = <span class="hljs-number">1</span>			
y = <span class="hljs-number">2</span>
<span class="hljs-comment">#Buggy example</span>
y = x
x = y
<span class="hljs-comment">#Fix it here!</span>



<span class="hljs-comment">###############################</span>
<span class="hljs-comment">###### COMMENTING LINES #######</span>
<span class="hljs-comment">###############################</span>
<span class="hljs-comment">## to comment MANY lines at a time, highlight all of them then CTRL+1</span>
<span class="hljs-comment">## do CTRL+1 again to uncomment them</span>
<span class="hljs-comment">## try it on the next few lines below!</span>

<span class="hljs-comment"># pi = 355/113</span>
<span class="hljs-comment"># radius = 2.2</span>
<span class="hljs-comment"># area = pi*(radius**2)</span>
<span class="hljs-comment"># circumference = pi*(radius*2)</span>

<span class="hljs-comment">###############################</span>
<span class="hljs-comment">###### AUTOCOMPLETE #######</span>
<span class="hljs-comment">###############################</span>
<span class="hljs-comment">## Spyder can autocomplete names for you (in console or the editor)</span>
<span class="hljs-comment">## start typing a variable name defined in your program and hit tab </span>
<span class="hljs-comment">## before you finish typing -- try it below</span>

<span class="hljs-comment">## define a variable</span>
<span class="hljs-comment">#a_very_long_variable_name_dont_name_them_this_long_pls = 0</span>

<span class="hljs-comment">## start typing a_ve then hit tab... cool, right!</span>
<span class="hljs-comment">## use autocomplete to change the value of that variable to 1</span>

<span class="hljs-comment">## use autocomplete to show the type of the value of that long variable</span>
<span class="hljs-comment">## notice that Spyder also automatically adds the closed parentheses for you!</span>
</code></pre>
<p>المقرر الأصلي: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/">6.100L، خريف 2022</a>.</p>
</div>`,t={book:s,chapter:n,chapterTitle:a,slug:p,title:l,headings:e,html:c};export{s as book,n as chapter,a as chapterTitle,t as default,e as headings,c as html,p as slug,l as title};
