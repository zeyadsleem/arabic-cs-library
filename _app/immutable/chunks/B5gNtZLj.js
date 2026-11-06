const s="hello-algo",a="chapter_tree",n="Tree",l="array_representation_of_tree",e="التمثيل المصفوفي للأشجار الثنائية",p=[{depth:2,id:"تمثيل-الأشجار-الثنائية-التامة",text:"تمثيل الأشجار الثنائية التامة"},{depth:2,id:"تمثيل-أي-شجرة-ثنائية",text:"تمثيل أي شجرة ثنائية"}],t=`<p>في تمثيل القوائم المترابطة، وحدة تخزين الشجرة الثنائية هي عقدة <code>TreeNode</code>، وتُربَط العقد بمؤشرات. وقد قدّم القسم السابق العمليات الأساسية للأشجار الثنائية في هذا التمثيل.</p>
<p>فهل يمكننا استخدام مصفوفة لتمثيل شجرة ثنائية؟ الجواب نعم.</p>
<h2 id="تمثيل-الأشجار-الثنائية-التامة">تمثيل الأشجار الثنائية التامة</h2>
<p>لنحلّل أولاً حالة بسيطة. بمعطى شجرة ثنائية تامة (perfect binary tree)، نخزّن جميع العقد في مصفوفة وفق ترتيب الاجتياز بالمستويات، حيث يقابل كل عقدة فهرس فريد في المصفوفة.</p>
<p>واستناداً إلى خصائص الاجتياز بالمستويات، يمكننا استنتاج &quot;صيغة تعيين&quot; بين فهرس العقدة الأب وفهرسي العقدتين الابنتين: <strong>إذا كان فهرس عقدة ما <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>i</mi></mrow><annotation encoding="application/x-tex">i</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6595em;"></span><span class="mord mathnormal">i</span></span></span></span>، فإن فهرس ابنها الأيسر هو <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>2</mn><mi>i</mi><mo>+</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">2i + 1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7429em;vertical-align:-0.0833em;"></span><span class="mord">2</span><span class="mord mathnormal">i</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span> وفهرس ابنها الأيمن هو <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>2</mn><mi>i</mi><mo>+</mo><mn>2</mn></mrow><annotation encoding="application/x-tex">2i + 2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7429em;vertical-align:-0.0833em;"></span><span class="mord">2</span><span class="mord mathnormal">i</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">2</span></span></span></span></strong>. ويوضح الشكل أدناه علاقات التعيين بين فهارس العقد المختلفة.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_tree--array_representation_binary_tree.png" alt="التمثيل المصفوفي لشجرة ثنائية تامة"></p>
<p><strong>تؤدي صيغة التعيين دوراً مشابهاً لدور مراجع العقد (المؤشرات) في القوائم المترابطة</strong>. فبمعطى أي عقدة في المصفوفة، يمكننا الوصول إلى عقدة ابنها الأيسر (الأيمن) باستخدام صيغة التعيين.</p>
<h2 id="تمثيل-أي-شجرة-ثنائية">تمثيل أي شجرة ثنائية</h2>
<p>الأشجار الثنائية التامة حالة خاصة؛ إذ توجد عادةً في المستويات الوسطى من الشجرة الثنائية قيم <code>None</code> كثيرة. ولأن تسلسل الاجتياز بالمستويات لا يتضمن قيم <code>None</code> هذه، لا يمكننا استنتاج عدد قيم <code>None</code> وتوزيعها اعتماداً على هذا التسلسل وحده. <strong>وهذا يعني أن بنى أشجار ثنائية متعددة يمكن أن تقابل تسلسل الاجتياز بالمستويات نفسه</strong>.</p>
<p>وكما يوضح الشكل أدناه، بمعطى شجرة ثنائية غير تامة، تفشل طريقة التمثيل المصفوفي أعلاه.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_tree--array_representation_without_empty.png" alt="تسلسل الاجتياز بالمستويات يقابل احتمالات متعددة للشجرة الثنائية"></p>
<p>لحل هذه المشكلة، <strong>يمكننا كتابة جميع قيم <code>None</code> صراحةً في تسلسل الاجتياز بالمستويات</strong>. وكما يوضح الشكل أدناه، بمجرد فعل ذلك، يستطيع تسلسل الاجتياز بالمستويات تمثيل شجرة ثنائية تمثيلاً فريداً. والشيفرة المثالية كما يلي:</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-python"><span class="hljs-comment"># Array representation of a binary tree</span>
<span class="hljs-comment"># Using None to represent empty slots</span>
tree = [<span class="hljs-number">1</span>, <span class="hljs-number">2</span>, <span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-literal">None</span>, <span class="hljs-number">6</span>, <span class="hljs-number">7</span>, <span class="hljs-number">8</span>, <span class="hljs-number">9</span>, <span class="hljs-literal">None</span>, <span class="hljs-literal">None</span>, <span class="hljs-number">12</span>, <span class="hljs-literal">None</span>, <span class="hljs-literal">None</span>, <span class="hljs-number">15</span>]
</code></pre>
</div>![التمثيل المصفوفي لشجرة ثنائية عشوائية](/images/hello-algo/chapter_tree--array_representation_with_empty.png)
<p>جدير بالذكر أن <strong>الأشجار الثنائية الكاملة ملائمة جداً للتمثيل المصفوفي</strong>. وباستذكار تعريف الشجرة الثنائية الكاملة، لا تظهر <code>None</code> إلا في المستوى السفلي وفي الجهة اليمنى، <strong>ما يعني أن جميع قيم <code>None</code> يجب أن تظهر في نهاية تسلسل الاجتياز بالمستويات</strong>.</p>
<p>وهذا يعني أنه عند استخدام مصفوفة لتمثيل شجرة ثنائية كاملة، يمكن إغفال تخزين جميع قيم <code>None</code>، وهو أمر مريح للغاية. ويقدّم الشكل أدناه مثالاً على ذلك.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_tree--array_representation_complete_binary_tree.png" alt="التمثيل المصفوفي لشجرة ثنائية كاملة"></p>
<p>تُنفِّذ الشيفرة التالية شجرة ثنائية باستخدام التمثيل المصفوفي، وتشمل العمليات التالية:</p>
<ul>
<li>بمعطى عقدة، الحصول على قيمتها، وعلى عقدة ابنها الأيسر (الأيمن)، وعلى العقدة الأب.</li>
<li>الحصول على تسلسلات الاجتياز المسبق والوسطي واللاحق وبالمستويات.</li>
</ul>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py"><span class="hljs-keyword">class</span> <span class="hljs-title class_">ArrayBinaryTree</span>:
    <span class="hljs-string">&quot;&quot;&quot;Binary tree class using an array representation&quot;&quot;&quot;</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, arr: <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span> | <span class="hljs-literal">None</span>]</span>):
        <span class="hljs-string">&quot;&quot;&quot;Constructor&quot;&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>._tree = <span class="hljs-built_in">list</span>(arr)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">size</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot;Length of the backing list&quot;&quot;&quot;</span>
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">len</span>(<span class="hljs-variable language_">self</span>._tree)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">val</span>(<span class="hljs-params">self, i: <span class="hljs-built_in">int</span></span>) -&gt; <span class="hljs-built_in">int</span> | <span class="hljs-literal">None</span>:
        <span class="hljs-string">&quot;&quot;&quot;Get the value of the node at index i&quot;&quot;&quot;</span>
        <span class="hljs-comment"># إذا خرج الفهرس عن الحدود، أعد None لتمثيل موضع فارغ</span>
        <span class="hljs-keyword">if</span> i &lt; <span class="hljs-number">0</span> <span class="hljs-keyword">or</span> i &gt;= <span class="hljs-variable language_">self</span>.size():
            <span class="hljs-keyword">return</span> <span class="hljs-literal">None</span>
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>._tree[i]

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">left</span>(<span class="hljs-params">self, i: <span class="hljs-built_in">int</span></span>) -&gt; <span class="hljs-built_in">int</span> | <span class="hljs-literal">None</span>:
        <span class="hljs-string">&quot;&quot;&quot;Get the left child index of the node at index i&quot;&quot;&quot;</span>
        <span class="hljs-keyword">return</span> <span class="hljs-number">2</span> * i + <span class="hljs-number">1</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">right</span>(<span class="hljs-params">self, i: <span class="hljs-built_in">int</span></span>) -&gt; <span class="hljs-built_in">int</span> | <span class="hljs-literal">None</span>:
        <span class="hljs-string">&quot;&quot;&quot;Get the right child index of the node at index i&quot;&quot;&quot;</span>
        <span class="hljs-keyword">return</span> <span class="hljs-number">2</span> * i + <span class="hljs-number">2</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">parent</span>(<span class="hljs-params">self, i: <span class="hljs-built_in">int</span></span>) -&gt; <span class="hljs-built_in">int</span> | <span class="hljs-literal">None</span>:
        <span class="hljs-string">&quot;&quot;&quot;Get the parent index of the node at index i&quot;&quot;&quot;</span>
        <span class="hljs-keyword">return</span> (i - <span class="hljs-number">1</span>) // <span class="hljs-number">2</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">level_order</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>]:
        <span class="hljs-string">&quot;&quot;&quot;Level-order traversal&quot;&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>.res = []
        <span class="hljs-comment"># اجتز المصفوفة مباشرةً</span>
        <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-variable language_">self</span>.size()):
            <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.val(i) <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> <span class="hljs-literal">None</span>:
                <span class="hljs-variable language_">self</span>.res.append(<span class="hljs-variable language_">self</span>.val(i))
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.res

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">dfs</span>(<span class="hljs-params">self, i: <span class="hljs-built_in">int</span>, order: <span class="hljs-built_in">str</span></span>):
        <span class="hljs-string">&quot;&quot;&quot;Depth-first traversal&quot;&quot;&quot;</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.val(i) <span class="hljs-keyword">is</span> <span class="hljs-literal">None</span>:
            <span class="hljs-keyword">return</span>
        <span class="hljs-comment"># اجتياز الطلب المسبق</span>
        <span class="hljs-keyword">if</span> order == <span class="hljs-string">&quot;pre&quot;</span>:
            <span class="hljs-variable language_">self</span>.res.append(<span class="hljs-variable language_">self</span>.val(i))
        <span class="hljs-variable language_">self</span>.dfs(<span class="hljs-variable language_">self</span>.left(i), order)
        <span class="hljs-comment"># الاجتياز الداخلي</span>
        <span class="hljs-keyword">if</span> order == <span class="hljs-string">&quot;in&quot;</span>:
            <span class="hljs-variable language_">self</span>.res.append(<span class="hljs-variable language_">self</span>.val(i))
        <span class="hljs-variable language_">self</span>.dfs(<span class="hljs-variable language_">self</span>.right(i), order)
        <span class="hljs-comment"># اجتياز الطلب اللاحق</span>
        <span class="hljs-keyword">if</span> order == <span class="hljs-string">&quot;post&quot;</span>:
            <span class="hljs-variable language_">self</span>.res.append(<span class="hljs-variable language_">self</span>.val(i))

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">pre_order</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>]:
        <span class="hljs-string">&quot;&quot;&quot;Preorder traversal&quot;&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>.res = []
        <span class="hljs-variable language_">self</span>.dfs(<span class="hljs-number">0</span>, order=<span class="hljs-string">&quot;pre&quot;</span>)
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.res

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">in_order</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>]:
        <span class="hljs-string">&quot;&quot;&quot;Inorder traversal&quot;&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>.res = []
        <span class="hljs-variable language_">self</span>.dfs(<span class="hljs-number">0</span>, order=<span class="hljs-string">&quot;in&quot;</span>)
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.res

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">post_order</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>]:
        <span class="hljs-string">&quot;&quot;&quot;Postorder traversal&quot;&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>.res = []
        <span class="hljs-variable language_">self</span>.dfs(<span class="hljs-number">0</span>, order=<span class="hljs-string">&quot;post&quot;</span>)
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.res
</code></pre>
</div>## المزايا والقيود
<p>يتمتع التمثيل المصفوفي للأشجار الثنائية بالمزايا التالية:</p>
<ul>
<li>تُخزَّن المصفوفات في مساحة ذاكرة متجاورة، وهو ما يلائم ذاكرة التخزين المؤقت (cache) ويتيح وصولاً واجتيازاً أسرع.</li>
<li>لا يتطلب تخزين مؤشرات، وهو ما يوفّر المساحة.</li>
<li>يتيح الوصول العشوائي إلى العقد.</li>
</ul>
<p>ومع ذلك، فإن التمثيل المصفوفي له أيضاً بعض القيود:</p>
<ul>
<li>يتطلب التخزين المصفوفي مساحة ذاكرة متجاورة، لذا فهو غير مناسب لتخزين أشجار ذات كمية كبيرة من البيانات.</li>
<li>تتطلب إضافة العقد أو إزالتها عمليات إدراج وحذف في المصفوفة، وهي عمليات أقل كفاءة.</li>
<li>عندما تكثر قيم <code>None</code> في الشجرة الثنائية، تنخفض نسبة بيانات العقد التي تحتويها المصفوفة، مما يؤدي إلى انخفاض استخدام المساحة.</li>
</ul>
`,r={book:s,chapter:a,chapterTitle:n,slug:l,title:e,headings:p,html:t};export{s as book,a as chapter,n as chapterTitle,r as default,p as headings,t as html,l as slug,e as title};
