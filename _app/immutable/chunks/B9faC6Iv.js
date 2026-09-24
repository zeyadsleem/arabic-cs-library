const s="hello-algo",n="chapter_tree",a="الأشجار",l="binary_tree",e="الشجرة الثنائية",p=[{depth:2,id:"المصطلحات-الشائعة-للأشجار-الثنائية",text:"المصطلحات الشائعة للأشجار الثنائية"},{depth:2,id:"العمليات-الأساسية-على-الأشجار-الثنائية",text:"العمليات الأساسية على الأشجار الثنائية"},{depth:3,id:"تهيئة-شجرة-ثنائية",text:"تهيئة شجرة ثنائية"},{depth:3,id:"إدراج-العقد-وحذفها",text:"إدراج العقد وحذفها"},{depth:2,id:"الأنواع-الشائعة-للأشجار-الثنائية",text:"الأنواع الشائعة للأشجار الثنائية"},{depth:3,id:"الشجرة-الثنائية-التامة",text:"الشجرة الثنائية التامة"},{depth:3,id:"الشجرة-الثنائية-الكاملة",text:"الشجرة الثنائية الكاملة"},{depth:3,id:"الشجرة-الثنائية-الممتلئة",text:"الشجرة الثنائية الممتلئة"},{depth:3,id:"الشجرة-الثنائية-المتوازنة",text:"الشجرة الثنائية المتوازنة"},{depth:2,id:"تدهور-الأشجار-الثنائية",text:"تدهور الأشجار الثنائية"}],t=`<p><u>الشجرة الثنائية</u> (binary tree) بنية بيانات غير خطية تصوّر العلاقة الهرمية بين «الأسلاف» و«الأحفاد»، وتتجسد فيها فكرة التقسيم والتغلب التي يتفرع فيها كل انقسام إلى اثنين. وعلى غرار القائمة المترابطة، فإن الوحدة الأساسية في الشجرة الثنائية هي العقدة، وتحتوي كل عقدة على قيمة، ومرجع إلى عقدة ابنها الأيسر، ومرجع إلى عقدة ابنها الأيمن.</p>
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
<p><img src="/images/hello-algo/chapter_tree--binary_tree_definition.png" alt="العقدة الأب وعقدة الابن والشجرة الفرعية"></p>
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
<p><img src="/images/hello-algo/chapter_tree--binary_tree_terminology.png" alt="المصطلحات الشائعة للأشجار الثنائية"></p>
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
<p><img src="/images/hello-algo/chapter_tree--binary_tree_add_remove.png" alt="إدراج العقد وحذفها في شجرة ثنائية"></p>
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
<p>كما يوضح الشكل أدناه، تكون جميع المستويات في <u>الشجرة الثنائية التامة</u> (perfect binary tree) ممتلئة بالكامل. وفي الشجرة الثنائية التامة، تكون درجة العقد الورقية $0$، بينما تكون درجة جميع العقد الأخرى $2$. وإذا كان ارتفاع الشجرة $h$، فإن العدد الإجمالي للعقد هو $2^{h+1} - 1$، وفق نمط أسي معياري يحاكي ظاهرة انقسام الخلايا الشائعة في الطبيعة.</p>
<div class="note">
<p>يرجى ملاحظة أنه في المجتمع الصيني، يُشار غالباً إلى الشجرة الثنائية التامة باسم <u>الشجرة الثنائية الممتلئة</u>.</p>
</div>
<p><img src="/images/hello-algo/chapter_tree--perfect_binary_tree.png" alt="الشجرة الثنائية التامة"></p>
<h3 id="الشجرة-الثنائية-الكاملة">الشجرة الثنائية الكاملة</h3>
<p>كما يوضح الشكل أدناه، لا تسمح <u>الشجرة الثنائية الكاملة</u> (complete binary tree) إلا بأن يكون المستوى السفلي غير ممتلئ امتلاءً كاملاً، ويجب ملء عقد المستوى السفلي باستمرار من اليسار إلى اليمين. ولاحظ أن الشجرة الثنائية التامة هي أيضاً شجرة ثنائية كاملة.</p>
<p><img src="/images/hello-algo/chapter_tree--complete_binary_tree.png" alt="الشجرة الثنائية الكاملة"></p>
<h3 id="الشجرة-الثنائية-الممتلئة">الشجرة الثنائية الممتلئة</h3>
<p>كما يوضح الشكل أدناه، في <u>الشجرة الثنائية الممتلئة</u> (full binary tree)، تمتلك جميع العقد باستثناء العقد الورقية عقدتي ابن.</p>
<p><img src="/images/hello-algo/chapter_tree--full_binary_tree.png" alt="الشجرة الثنائية الممتلئة"></p>
<h3 id="الشجرة-الثنائية-المتوازنة">الشجرة الثنائية المتوازنة</h3>
<p>كما يوضح الشكل أدناه، في <u>الشجرة الثنائية المتوازنة</u> (balanced binary tree)، لا يتجاوز الفرق المطلق بين ارتفاع الشجرتين الفرعيتين اليسرى واليمنى لأي عقدة 1.</p>
<p><img src="/images/hello-algo/chapter_tree--balanced_binary_tree.png" alt="الشجرة الثنائية المتوازنة"></p>
<h2 id="تدهور-الأشجار-الثنائية">تدهور الأشجار الثنائية</h2>
<p>يقابل الشكل أدناه البنى المثالية والبنى المتدهورة للأشجار الثنائية. فعندما يمتلئ كل مستوى، تصبح الشجرة «شجرة ثنائية تامة»؛ وعندما تنحرف جميع العقد إلى جهة واحدة، تتدهور الشجرة الثنائية إلى «قائمة مترابطة».</p>
<ul>
<li>الشجرة الثنائية التامة هي الحالة المثالية، إذ تستفيد استفادة كاملة من مزايا التقسيم والتغلب في الأشجار الثنائية.</li>
<li>تمثل القائمة المترابطة الطرف الآخر، حيث تصبح جميع العمليات عمليات خطية يتدهور تعقيدها الزمني إلى $O(n)$.</li>
</ul>
<p><img src="/images/hello-algo/chapter_tree--binary_tree_best_worst_cases.png" alt="أفضل بنى الأشجار الثنائية وأسوأها"></p>
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
<td>عدد العقد في المستوى $i$</td>
<td>$2^{i-1}$</td>
<td>$1$</td>
</tr>
<tr>
<td>عدد العقد الورقية في شجرة ارتفاعها $h$</td>
<td>$2^h$</td>
<td>$1$</td>
</tr>
<tr>
<td>العدد الإجمالي للعقد في شجرة ارتفاعها $h$</td>
<td>$2^{h+1} - 1$</td>
<td>$h + 1$</td>
</tr>
<tr>
<td>ارتفاع شجرة عدد عقدها الإجمالي $n$</td>
<td>$\\log_2 (n+1) - 1$</td>
<td>$n - 1$</td>
</tr>
</tbody>
</table>
`,c={book:s,chapter:n,chapterTitle:a,slug:l,title:e,headings:p,html:t};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,t as html,l as slug,e as title};
