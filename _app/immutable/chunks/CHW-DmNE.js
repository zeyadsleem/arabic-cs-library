const s="mit-6100l",n="lecture-20",e="المحاضرة 20: مثال البرمجة كائنية التوجه: متتبّع اللياقة",a="exercises",l="تمرين المحاضرة 20 وحلّه: الحاوية والطابور",t=[{depth:2,id:"1-السؤال-1-من-1",text:"1) السؤال 1 من 1"},{depth:2,id:"إليك-الحل-الذي-كتبناه",text:"إليك الحل الذي كتبناه"},{depth:2,id:"إشعار-المصدر-الختامي",text:"إشعار المصدر الختامي"}],o=`<div class="exercises"><h1>التمرين القصير للمحاضرة 20 (Finger Exercises Lecture 20)</h1>
<p>المصادر: <a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/pages/lecture-20-fitness-tracker-object-oriented-programming-example/">السؤال في صفحة المحاضرة</a>، و<a href="https://ocw.mit.edu/courses/6-100l-introduction-to-cs-and-programming-using-python-fall-2022/mit6_100l_f22_ex20_sol.pdf">ملف الحل الرسمي</a>.</p>
<p>إعداد الأصل: <strong>Ana Bell / MIT OpenCourseWare، معهد ماساتشوستس للتكنولوجيا</strong>، مقرر 6.100L، خريف 2022. ترجمة وتكييف عربيان غير رسميين للاستخدام غير التجاري، ولا يعنيان اعتماد MIT. الترخيص: <a href="https://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY-NC-SA 4.0</a>، مع احترام استثناءات الأطراف الثالثة في الأصل.</p>
<p>كانت الأسئلة أدناه مستحقة يوم الاثنين 21 نوفمبر 2022، الساعة 03:00:00 مساءً.</p>
<h2 id="1-السؤال-1-من-1">1) السؤال 1 من 1</h2>
<p>في هذه المسألة، ستنفّذ صنفين وفق المواصفات أدناه: صنف الحاوية <code>Container</code> وصنف الطابور <code>Queue</code>، وهو صنف فرعي (Subclass) من <code>Container</code>.</p>
<p>سيهيّئ الصنف <code>Container</code> قائمة فارغة. سيكون لدينا تابعان (Methods): حساب حجم القائمة وإضافة عنصر. سيرث الصنف الفرعي التابع الثاني. نريد الآن إنشاء صنف فرعي لإضافة وظائف أخرى، وهي القدرة على حذف عناصر من القائمة. سيضيف <code>Queue</code> العناصر إلى القائمة بالطريقة نفسها، لكنه سيتصرف بصورة مختلفة عند حذف عنصر.</p>
<p>الطابور (Queue) بنية بيانات يعمل فيها مبدأ «أول داخل، أول خارج» (First-in, first-out). تخيّل طابور الدفع في متجر: يحصل الزبون الذي قضى أطول وقت في الطابور على موظف الدفع التالي المتاح. عند تنفيذ الصنف <code>Queue</code>، عليك التفكير في الطرف الذي يحتوي على العنصر الذي قضى أطول وقت في القائمة. هذا هو العنصر الذي تريد حذفه وإرجاعه.</p>
<p>مواصفات الكود:</p>
<ul>
<li>كائن <code>Container</code> قائمة يمكنها تخزين عناصر من أي نوع؛ يهيّئ <code>__init__</code> قائمة فارغة.</li>
<li>يُرجع <code>size</code> طول قائمة الحاوية.</li>
<li>يضيف <code>add</code> العنصر <code>elem</code> إلى أحد طرفي القائمة، مع الالتزام بالطرف نفسه في كل إضافة. لا يُرجع شيئًا.</li>
<li><code>Queue</code> صنف فرعي من <code>Container</code> له تابع إضافي لحذف العناصر.</li>
<li>يحذف <code>remove</code> أقدم عنصر من قائمة الحاوية، ويُرجع العنصر المحذوف، أو <code>None</code> إذا لم توجد عناصر.</li>
</ul>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Container</span>(<span class="hljs-title class_ inherited__">object</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    A container object is a list and can store elements of any type
    &quot;&quot;&quot;</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot;
        Initializes an empty list
        &quot;&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>.myList = []

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">size</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot;
        Returns the length of the container list
        &quot;&quot;&quot;</span>
        <span class="hljs-comment"># Your code here</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">add</span>(<span class="hljs-params">self, elem</span>):
        <span class="hljs-string">&quot;&quot;&quot;
        Adds the elem to one end of the container list, keeping the end
        you add to consistent. Does not return anything
        &quot;&quot;&quot;</span>
        <span class="hljs-comment"># Your code here</span>

<span class="hljs-keyword">class</span> <span class="hljs-title class_">Queue</span>(<span class="hljs-title class_ inherited__">Container</span>):
    <span class="hljs-string">&quot;&quot;&quot;
    A subclass of Container. Has an additional method to remove elements.
    &quot;&quot;&quot;</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">remove</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot;
        The oldest element in the container list is removed
        Returns the element removed or None if the stack contains no elements
        &quot;&quot;&quot;</span>
        <span class="hljs-comment"># Your code here</span>
</code></pre>
<blockquote>
<p><strong>ملاحظة المترجم:</strong> كلمة <code>stack</code> في توثيق <code>remove</code> خطأ لفظي في المصدر؛ المقصود هنا الطابور. حُفظ الكود كما نُشر.</p>
</blockquote>
<p>حقل الإجابة في الأصل:</p>
<pre><code class="language-python"><span class="hljs-comment"># your class here</span>
</code></pre>
<p>لديك عدد غير محدود من محاولات التسليم المتبقية.</p>
<h2 id="إليك-الحل-الذي-كتبناه">إليك الحل الذي كتبناه</h2>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">Container</span>(<span class="hljs-title class_ inherited__">object</span>):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-variable language_">self</span>.myList = []

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">size</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">len</span>(<span class="hljs-variable language_">self</span>.myList)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">add</span>(<span class="hljs-params">self, elem</span>):
        <span class="hljs-variable language_">self</span>.myList.append(elem)

<span class="hljs-keyword">class</span> <span class="hljs-title class_">Queue</span>(<span class="hljs-title class_ inherited__">Container</span>):
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">remove</span>(<span class="hljs-params">self</span>):
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.size() &gt; <span class="hljs-number">0</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.myList.pop(<span class="hljs-number">0</span>)
        <span class="hljs-keyword">return</span> <span class="hljs-literal">None</span>
</code></pre>
<h2 id="إشعار-المصدر-الختامي">إشعار المصدر الختامي</h2>
<p>MIT OpenCourseWare — <a href="https://ocw.mit.edu">https://ocw.mit.edu</a>. مقرر 6.100L: مقدمة في علوم الحاسوب والبرمجة باستخدام Python، خريف 2022. لمعلومات الاستشهاد بهذه المواد وشروط الاستخدام: <a href="https://ocw.mit.edu/terms">https://ocw.mit.edu/terms</a>.</p>
</div>`,p={book:s,chapter:n,chapterTitle:e,slug:a,title:l,headings:t,html:o};export{s as book,n as chapter,e as chapterTitle,p as default,t as headings,o as html,a as slug,l as title};
