const s="hello-algo",a="chapter_tree",n="الأشجار",t="binary_tree",p="الشجرة الثنائية",e=[{depth:2,id:"المصطلحات-الشائعة-للأشجار-الثنائية",text:"المصطلحات الشائعة للأشجار الثنائية"},{depth:2,id:"العمليات-الأساسية-على-الأشجار-الثنائية",text:"العمليات الأساسية على الأشجار الثنائية"},{depth:3,id:"تهيئة-شجرة-ثنائية",text:"تهيئة شجرة ثنائية"},{depth:3,id:"إدراج-العقد-وحذفها",text:"إدراج العقد وحذفها"},{depth:2,id:"الأنواع-الشائعة-للأشجار-الثنائية",text:"الأنواع الشائعة للأشجار الثنائية"},{depth:3,id:"الشجرة-الثنائية-التامة",text:"الشجرة الثنائية التامة"},{depth:3,id:"الشجرة-الثنائية-الكاملة",text:"الشجرة الثنائية الكاملة"},{depth:3,id:"الشجرة-الثنائية-الممتلئة",text:"الشجرة الثنائية الممتلئة"},{depth:3,id:"الشجرة-الثنائية-المتوازنة",text:"الشجرة الثنائية المتوازنة"},{depth:2,id:"تدهور-الأشجار-الثنائية",text:"تدهور الأشجار الثنائية"}],l=`<p><u>الشجرة الثنائية</u> (binary tree) بنية بيانات غير خطية تصوّر العلاقة الهرمية بين «الأسلاف» و«الأحفاد»، وتتجسد فيها فكرة التقسيم والتغلب التي يتفرع فيها كل انقسام إلى اثنين. وعلى غرار القائمة المترابطة، فإن الوحدة الأساسية في الشجرة الثنائية هي العقدة، وتحتوي كل عقدة على قيمة، ومرجع إلى عقدة ابنها الأيسر، ومرجع إلى عقدة ابنها الأيمن.</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* عقدة الشجرة الثنائية */</span>
<span class="hljs-keyword">type</span> TreeNode <span class="hljs-keyword">struct</span> {
    Val   <span class="hljs-type">int</span>
    Left  *TreeNode
    Right *TreeNode
}
<span class="hljs-comment">/* دالة البناء */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">NewTreeNode</span><span class="hljs-params">(v <span class="hljs-type">int</span>)</span></span> *TreeNode {
    <span class="hljs-keyword">return</span> &amp;TreeNode{
        Left:  <span class="hljs-literal">nil</span>, <span class="hljs-comment">// مؤشر إلى عقدة الابن الأيسر</span>
        Right: <span class="hljs-literal">nil</span>, <span class="hljs-comment">// مؤشر إلى عقدة الابن الأيمن</span>
        Val:   v,   <span class="hljs-comment">// قيمة العقدة</span>
    }
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-typescript"><span class="hljs-comment">/* عقدة الشجرة الثنائية */</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">TreeNode</span> {
    <span class="hljs-attr">val</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">left</span>: <span class="hljs-title class_">TreeNode</span> | <span class="hljs-literal">null</span>;
    <span class="hljs-attr">right</span>: <span class="hljs-title class_">TreeNode</span> | <span class="hljs-literal">null</span>;

    <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">val</span>?: <span class="hljs-built_in">number</span>, <span class="hljs-attr">left</span>?: <span class="hljs-title class_">TreeNode</span> | <span class="hljs-literal">null</span>, <span class="hljs-attr">right</span>?: <span class="hljs-title class_">TreeNode</span> | <span class="hljs-literal">null</span></span>) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">val</span> = val === <span class="hljs-literal">undefined</span> ? <span class="hljs-number">0</span> : val; <span class="hljs-comment">// قيمة العقدة</span>
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">left</span> = left === <span class="hljs-literal">undefined</span> ? <span class="hljs-literal">null</span> : left; <span class="hljs-comment">// مرجع إلى عقدة الابن الأيسر</span>
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">right</span> = right === <span class="hljs-literal">undefined</span> ? <span class="hljs-literal">null</span> : right; <span class="hljs-comment">// مرجع إلى عقدة الابن الأيمن</span>
    }
}
</code></pre>
</div>
<p>تحتوي كل عقدة على مرجعين (مؤشرين) يشيران على التوالي إلى <u>عقدة الابن الأيسر</u> و<u>عقدة الابن الأيمن</u>. وتُسمى هذه العقدة <u>العقدة الأب</u> لهاتين العقدتين الابنتين. وعند إعطائنا عقدة من شجرة ثنائية، نسمي الشجرة المكوَّنة من ابن هذه العقدة الأيسر وجميع العقد الواقعة تحته <u>الشجرة الفرعية اليسرى</u> لهذه العقدة. وبالمثل، يمكن تعريف <u>الشجرة الفرعية اليمنى</u>.</p>
<p><strong>في الشجرة الثنائية، تمتلك كل عقدة غير ورقية عقداً ابنة، ومن ثم أشجاراً فرعية غير فارغة.</strong> وكما يوضح الشكل أدناه، إذا اعتُبرت «العقدة 2» عقدة أب، فإن عقدتي ابنيها الأيسر والأيمن هما «العقدة 4» و«العقدة 5» على التوالي. وتتكون الشجرة الفرعية اليسرى من «العقدة 4» وجميع العقد الواقعة تحتها، بينما تتكون الشجرة الفرعية اليمنى من «العقدة 5» وجميع العقد الواقعة تحتها.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_tree--binary_tree_definition.png" alt="العقدة الأب وعقدة الابن والشجرة الفرعية"></p>
<h2 id="المصطلحات-الشائعة-للأشجار-الثنائية">المصطلحات الشائعة للأشجار الثنائية</h2>
<p>تظهر المصطلحات الشائعة للأشجار الثنائية في الشكل أدناه.</p>
<ul>
<li><u>عقدة الجذر</u> (root node): العقدة في المستوى الأعلى من الشجرة الثنائية، وهي لا تمتلك عقدة أب.</li>
<li><u>العقدة الورقية</u> (leaf node): عقدة لا تمتلك أي عقد ابنة، ويشير مؤشراها معاً إلى <code>None</code>.</li>
<li><u>الضلع</u> (edge): قطعة مستقيمة تربط عقدتين، وتمثل مرجعاً (مؤشراً) بين العقدتين.</li>
<li><u>مستوى</u> العقدة: يزداد من الأعلى إلى الأسفل، وتكون عقدة الجذر في المستوى 1.</li>
<li><u>درجة</u> العقدة: عدد عقد الابن التي تمتلكها العقدة. وفي الشجرة الثنائية، يمكن أن تكون الدرجة 0 أو 1 أو 2.</li>
<li><u>ارتفاع</u> الشجرة الثنائية: عدد الأضلاع من عقدة الجذر إلى أبعد عقدة ورقية.</li>
<li><u>عمق</u> العقدة: عدد الأضلاع من عقدة الجذر إلى العقدة.</li>
<li><u>ارتفاع</u> العقدة: عدد الأضلاع من أبعد عقدة ورقية إلى العقدة.</li>
</ul>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_tree--binary_tree_terminology.png" alt="المصطلحات الشائعة للأشجار الثنائية"></p>
<div class="note">
<p>نُعرِّف عادةً «الارتفاع» و«العمق» بعدد الأضلاع المجتازة، لكن بعض الكتب المدرسية ونصوص المسائل تعرّفهما بعدد العقد على المسار. وفي هذه الحالة تكون القيمتان أكبر بمقدار 1.</p>
</div>
<h2 id="العمليات-الأساسية-على-الأشجار-الثنائية">العمليات الأساسية على الأشجار الثنائية</h2>
<h3 id="تهيئة-شجرة-ثنائية">تهيئة شجرة ثنائية</h3>
<p>على غرار القائمة المترابطة، تتضمن تهيئة الشجرة الثنائية أولاً إنشاء العقد ثم إقامة المراجع (المؤشرات) بينها.</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* تهيئة شجرة ثنائية */</span>
<span class="hljs-comment">// تهيئة العقد</span>
n1 := NewTreeNode(<span class="hljs-number">1</span>)
n2 := NewTreeNode(<span class="hljs-number">2</span>)
n3 := NewTreeNode(<span class="hljs-number">3</span>)
n4 := NewTreeNode(<span class="hljs-number">4</span>)
n5 := NewTreeNode(<span class="hljs-number">5</span>)
<span class="hljs-comment">// ربط المراجع (المؤشرات) بين العقد</span>
n1.Left = n2
n1.Right = n3
n2.Left = n4
n2.Right = n5
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-typescript"><span class="hljs-comment">/* تهيئة شجرة ثنائية */</span>
<span class="hljs-comment">// تهيئة العقد</span>
<span class="hljs-keyword">let</span> n1 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TreeNode</span>(<span class="hljs-number">1</span>),
    n2 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TreeNode</span>(<span class="hljs-number">2</span>),
    n3 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TreeNode</span>(<span class="hljs-number">3</span>),
    n4 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TreeNode</span>(<span class="hljs-number">4</span>),
    n5 = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TreeNode</span>(<span class="hljs-number">5</span>);
<span class="hljs-comment">// ربط المراجع (المؤشرات) بين العقد</span>
n1.<span class="hljs-property">left</span> = n2;
n1.<span class="hljs-property">right</span> = n3;
n2.<span class="hljs-property">left</span> = n4;
n2.<span class="hljs-property">right</span> = n5;
</code></pre>
</div>
<h3 id="إدراج-العقد-وحذفها">إدراج العقد وحذفها</h3>
<p>على غرار القائمة المترابطة، يمكن تحقيق إدراج العقد وحذفها في الشجرة الثنائية بتعديل المؤشرات. ويقدم الشكل أدناه مثالاً على ذلك.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_tree--binary_tree_add_remove.png" alt="إدراج العقد وحذفها في شجرة ثنائية"></p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* إدراج العقد وحذفها */</span>
<span class="hljs-comment">// إدراج العقدة P بين n1 وn2</span>
p := NewTreeNode(<span class="hljs-number">0</span>)
n1.Left = p
p.Left = n2
<span class="hljs-comment">// حذف العقدة P</span>
n1.Left = n2
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-typescript"><span class="hljs-comment">/* إدراج العقد وحذفها */</span>
<span class="hljs-keyword">const</span> P = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TreeNode</span>(<span class="hljs-number">0</span>);
<span class="hljs-comment">// إدراج العقدة P بين n1 وn2</span>
n1.<span class="hljs-property">left</span> = P;
P.<span class="hljs-property">left</span> = n2;
<span class="hljs-comment">// حذف العقدة P</span>
n1.<span class="hljs-property">left</span> = n2;
</code></pre>
</div>
<div class="note">
<p>ضع في ذهنك أن إدراج عقدة قد يغيّر البنية المنطقية الأصلية للشجرة الثنائية، بينما يستلزم حذف عقدة عادةً إزالتها مع شجرتها الفرعية بأكملها. لذلك يُنفَّذ الإدراج والحذف في الأشجار الثنائية عملياً عادةً كسلسلة منسقة من العمليات لتحقيق نتيجة ذات معنى.</p>
</div>
<h2 id="الأنواع-الشائعة-للأشجار-الثنائية">الأنواع الشائعة للأشجار الثنائية</h2>
<h3 id="الشجرة-الثنائية-التامة">الشجرة الثنائية التامة</h3>
<p>كما يوضح الشكل أدناه، تكون جميع المستويات في <u>الشجرة الثنائية التامة</u> (perfect binary tree) ممتلئة بالكامل. وفي الشجرة الثنائية التامة، تكون درجة العقد الورقية <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>0</mn></mrow><annotation encoding="application/x-tex">0</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span>، بينما تكون درجة جميع العقد الأخرى <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>2</mn></mrow><annotation encoding="application/x-tex">2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">2</span></span></span></span>. وإذا كان ارتفاع الشجرة <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>h</mi></mrow><annotation encoding="application/x-tex">h</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal">h</span></span></span></span>، فإن العدد الإجمالي للعقد هو <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2</mn><mrow><mi>h</mi><mo>+</mo><mn>1</mn></mrow></msup><mo>−</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">2^{h+1} - 1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.9324em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">h</span><span class="mbin mtight">+</span><span class="mord mtight">1</span></span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span>، وفق نمط أسي معياري يحاكي ظاهرة انقسام الخلايا الشائعة في الطبيعة.</p>
<div class="note">
<p>يرجى ملاحظة أنه في المجتمع الصيني، يُشار غالباً إلى الشجرة الثنائية التامة باسم <u>الشجرة الثنائية الممتلئة</u>.</p>
</div>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_tree--perfect_binary_tree.png" alt="الشجرة الثنائية التامة"></p>
<h3 id="الشجرة-الثنائية-الكاملة">الشجرة الثنائية الكاملة</h3>
<p>كما يوضح الشكل أدناه، لا تسمح <u>الشجرة الثنائية الكاملة</u> (complete binary tree) إلا بأن يكون المستوى السفلي غير ممتلئ امتلاءً كاملاً، ويجب ملء عقد المستوى السفلي باستمرار من اليسار إلى اليمين. ولاحظ أن الشجرة الثنائية التامة هي أيضاً شجرة ثنائية كاملة.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_tree--complete_binary_tree.png" alt="الشجرة الثنائية الكاملة"></p>
<h3 id="الشجرة-الثنائية-الممتلئة">الشجرة الثنائية الممتلئة</h3>
<p>كما يوضح الشكل أدناه، في <u>الشجرة الثنائية الممتلئة</u> (full binary tree)، تمتلك جميع العقد باستثناء العقد الورقية عقدتي ابن.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_tree--full_binary_tree.png" alt="الشجرة الثنائية الممتلئة"></p>
<h3 id="الشجرة-الثنائية-المتوازنة">الشجرة الثنائية المتوازنة</h3>
<p>كما يوضح الشكل أدناه، في <u>الشجرة الثنائية المتوازنة</u> (balanced binary tree)، لا يتجاوز الفرق المطلق بين ارتفاع الشجرتين الفرعيتين اليسرى واليمنى لأي عقدة 1.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_tree--balanced_binary_tree.png" alt="الشجرة الثنائية المتوازنة"></p>
<h2 id="تدهور-الأشجار-الثنائية">تدهور الأشجار الثنائية</h2>
<p>يقابل الشكل أدناه البنى المثالية والبنى المتدهورة للأشجار الثنائية. فعندما يمتلئ كل مستوى، تصبح الشجرة «شجرة ثنائية تامة»؛ وعندما تنحرف جميع العقد إلى جهة واحدة، تتدهور الشجرة الثنائية إلى «قائمة مترابطة».</p>
<ul>
<li>الشجرة الثنائية التامة هي الحالة المثالية، إذ تستفيد استفادة كاملة من مزايا التقسيم والتغلب في الأشجار الثنائية.</li>
<li>تمثل القائمة المترابطة الطرف الآخر، حيث تصبح جميع العمليات عمليات خطية يتدهور تعقيدها الزمني إلى <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>.</li>
</ul>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_tree--binary_tree_best_worst_cases.png" alt="أفضل بنى الأشجار الثنائية وأسوأها"></p>
<p>وكما يوضح الجدول أدناه، تحقق الشجرة الثنائية في أفضل البنى وأسوأها إما قيماً عظمى أو قيماً دنيا لعدد العقد الورقية والعدد الإجمالي للعقد والارتفاع.</p>
<p align="center"> جدول <id> &nbsp; أفضل بنى الأشجار الثنائية وأسوأها </p>
<table>
<thead>
<tr>
<th></th>
<th>شجرة ثنائية تامة</th>
<th>قائمة مترابطة</th>
</tr>
</thead>
<tbody>
<tr>
<td>عدد العقد في المستوى <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>i</mi></mrow><annotation encoding="application/x-tex">i</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6595em;"></span><span class="mord mathnormal">i</span></span></span></span></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2</mn><mrow><mi>i</mi><mo>−</mo><mn>1</mn></mrow></msup></mrow><annotation encoding="application/x-tex">2^{i-1}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8247em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8247em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">i</span><span class="mbin mtight">−</span><span class="mord mtight">1</span></span></span></span></span></span></span></span></span></span></span></span></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>1</mn></mrow><annotation encoding="application/x-tex">1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span></td>
</tr>
<tr>
<td>عدد العقد الورقية في شجرة ارتفاعها <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>h</mi></mrow><annotation encoding="application/x-tex">h</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal">h</span></span></span></span></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2</mn><mi>h</mi></msup></mrow><annotation encoding="application/x-tex">2^h</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8491em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">h</span></span></span></span></span></span></span></span></span></span></span></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>1</mn></mrow><annotation encoding="application/x-tex">1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span></td>
</tr>
<tr>
<td>العدد الإجمالي للعقد في شجرة ارتفاعها <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>h</mi></mrow><annotation encoding="application/x-tex">h</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal">h</span></span></span></span></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msup><mn>2</mn><mrow><mi>h</mi><mo>+</mo><mn>1</mn></mrow></msup><mo>−</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">2^{h+1} - 1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.9324em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8491em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">h</span><span class="mbin mtight">+</span><span class="mord mtight">1</span></span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>h</mi><mo>+</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">h + 1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7778em;vertical-align:-0.0833em;"></span><span class="mord mathnormal">h</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span></td>
</tr>
<tr>
<td>ارتفاع شجرة عدد عقدها الإجمالي <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mrow><mi>log</mi><mo>⁡</mo></mrow><mn>2</mn></msub><mo stretchy="false">(</mo><mi>n</mi><mo>+</mo><mn>1</mn><mo stretchy="false">)</mo><mo>−</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">\\log_2 (n+1) - 1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mop"><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.207em;"><span style="top:-2.4559em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2441em;"><span></span></span></span></span></span></span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">1</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi><mo>−</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">n - 1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6667em;vertical-align:-0.0833em;"></span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span></td>
</tr>
</tbody>
</table>
`,m={book:s,chapter:a,chapterTitle:n,slug:t,title:p,headings:e,html:l};export{s as book,a as chapter,n as chapterTitle,m as default,e as headings,l as html,t as slug,p as title};
