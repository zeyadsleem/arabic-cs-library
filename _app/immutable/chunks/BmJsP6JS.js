const s="hello-algo",a="chapter_tree",n="Tree",e="avl_tree",t="شجرة AVL *",l=[{depth:2,id:"المصطلحات-الشائعة-في-أشجار-avl",text:"المصطلحات الشائعة في أشجار AVL"},{depth:3,id:"ارتفاع-العقدة",text:"ارتفاع العقدة"},{depth:2,id:"الدورانات-في-أشجار-avl",text:"الدورانات في أشجار AVL"},{depth:3,id:"الدوران-الأيمن",text:"الدوران الأيمن"},{depth:3,id:"الدوران-الأيمن-ثم-الدوران-الأيسر",text:"الدوران الأيمن ثم الدوران الأيسر"},{depth:3,id:"اختيار-الدوران",text:"اختيار الدوران"},{depth:3,id:"إدراج-عقدة",text:"إدراج عقدة"},{depth:2,id:"التطبيقات-النموذجية-لأشجار-avl",text:"التطبيقات النموذجية لأشجار AVL"}],p=`<p>ذكرنا في قسم &quot;شجرة البحث الثنائية&quot; أنه بعد عمليات إدراج وحذف متعددة قد تتدهور شجرة البحث الثنائية إلى قائمة مترابطة. وفي هذه الحالة يتدهور التعقيد الزمني لجميع العمليات من <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(\\log n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span> إلى <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>.</p>
<p>وكما يوضح الشكل أدناه، بعد عمليتي حذف لعقدتين، تتدهور شجرة البحث الثنائية هذه إلى قائمة مترابطة.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_tree--avltree_degradation_from_removing_node.png" alt="تدهور شجرة AVL بعد حذف عقد"></p>
<p>على سبيل المثال، في الشجرة الثنائية التامة الموضحة في الشكل أدناه، بعد إدراج عقدتين ستميل الشجرة ميلاً شديداً إلى اليسار، وسيتدهور التعقيد الزمني لعمليات البحث أيضاً.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_tree--avltree_degradation_from_inserting_node.png" alt="تدهور شجرة AVL بعد إدراج عقد"></p>
<p>في عام 1962، اقترح G. M. Adelson-Velsky وE. M. Landis <u>شجرة AVL</u> في ورقيتهما &quot;An algorithm for the organization of information&quot;. وتصف الورقة سلسلة من العمليات التي تمنع شجرة AVL من التدهور عند إدراج العقد وحذفها، مما يحافظ على التعقيد الزمني لمختلف العمليات عند <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(\\log n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>. وبعبارة أخرى، في السيناريوهات التي تتطلب عمليات إدراج وحذف وبحث وتحديث متكررة، تستطيع أشجار AVL الحفاظ على أداء فعّال باستمرار، ولذلك لها قيمة عملية كبيرة.</p>
<h2 id="المصطلحات-الشائعة-في-أشجار-avl">المصطلحات الشائعة في أشجار AVL</h2>
<p>شجرة AVL هي في الوقت نفسه شجرة بحث ثنائية وشجرة ثنائية متوازنة، وتستوفي في آن واحد جميع خصائص هذين النوعين من الأشجار الثنائية، لذا فهي <u>شجرة بحث ثنائية متوازنة</u>.</p>
<h3 id="ارتفاع-العقدة">ارتفاع العقدة</h3>
<p>بما أن العمليات المتعلقة بأشجار AVL تتطلب الحصول على ارتفاعات العقد، نحتاج إلى إضافة متغير <code>height</code> إلى صنف العقدة:</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">TreeNode</span>:
    <span class="hljs-string">&quot;&quot;&quot;AVL tree node&quot;&quot;&quot;</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, val: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-variable language_">self</span>.val: <span class="hljs-built_in">int</span> = val                 <span class="hljs-comment"># Node value</span>
        <span class="hljs-variable language_">self</span>.height: <span class="hljs-built_in">int</span> = <span class="hljs-number">0</span>                <span class="hljs-comment"># Node height</span>
        <span class="hljs-variable language_">self</span>.left: TreeNode | <span class="hljs-literal">None</span> = <span class="hljs-literal">None</span>   <span class="hljs-comment"># Left child reference</span>
        <span class="hljs-variable language_">self</span>.right: TreeNode | <span class="hljs-literal">None</span> = <span class="hljs-literal">None</span>  <span class="hljs-comment"># Right child reference</span>
</code></pre>
</div>
يشير "ارتفاع العقدة" إلى المسافة من تلك العقدة إلى أبعد عقدة ورقة عنها، أي عدد الأضلاع على المسار. ومن المهم ملاحظة أن ارتفاع عقدة الورقة هو $0$، وارتفاع العقدة الفارغة هو $-1$. سننشئ دالتين مساعدتين للحصول على ارتفاع العقدة وتحديثه:
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">update_height</span>(<span class="hljs-params">self, node: TreeNode | <span class="hljs-literal">None</span></span>):
        <span class="hljs-string">&quot;&quot;&quot;Update the node height&quot;&quot;&quot;</span>
        <span class="hljs-comment"># The node height equals the height of its taller subtree + 1</span>
        node.height = <span class="hljs-built_in">max</span>([<span class="hljs-variable language_">self</span>.height(node.left), <span class="hljs-variable language_">self</span>.height(node.right)]) + <span class="hljs-number">1</span>
</code></pre>
</div>
### معامل توازن العقدة
<p>يُعرَّف <u>معامل التوازن</u> للعقدة بأنه ارتفاع الشجرة الفرعية اليسرى للعقدة مطروحاً منه ارتفاع شجرتها الفرعية اليمنى، ويُعرَّف معامل توازن العقدة الفارغة بأنه <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>0</mn></mrow><annotation encoding="application/x-tex">0</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span>. كما نغلّف دالة الحصول على معامل توازن العقدة لتسهيل استخدامها لاحقاً:</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">balance_factor</span>(<span class="hljs-params">self, node: TreeNode | <span class="hljs-literal">None</span></span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Get the balance factor&quot;&quot;&quot;</span>
        <span class="hljs-comment"># An empty subtree has balance factor 0</span>
        <span class="hljs-keyword">if</span> node <span class="hljs-keyword">is</span> <span class="hljs-literal">None</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>
        <span class="hljs-comment"># Node balance factor = left subtree height - right subtree height</span>
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.height(node.left) - <span class="hljs-variable language_">self</span>.height(node.right)
</code></pre>
</div>
<div class="note">
<p>ليكن معامل التوازن <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>f</mi></mrow><annotation encoding="application/x-tex">f</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.1076em;">f</span></span></span></span>، فيستوفي معامل توازن أي عقدة في شجرة AVL الشرط <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>−</mo><mn>1</mn><mo>≤</mo><mi>f</mi><mo>≤</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">-1 \\le f \\le 1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7804em;vertical-align:-0.136em;"></span><span class="mord">−</span><span class="mord">1</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">≤</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">≤</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span>.</p>
</div>
<h2 id="الدورانات-في-أشجار-avl">الدورانات في أشجار AVL</h2>
<p>تكمن خصوصية أشجار AVL في عملية &quot;الدوران&quot;، التي تستطيع إعادة التوازن إلى العقد غير المتوازنة دون التأثير في تسلسل الاجتياز الوسطي للشجرة الثنائية. وبعبارة أخرى، <strong>تستطيع عمليات الدوران الحفاظ على خاصية &quot;شجرة البحث الثنائية&quot; وإعادة الشجرة إلى &quot;شجرة ثنائية متوازنة&quot; في آن واحد</strong>.</p>
<p>نسمي العقد التي تكون القيمة المطلقة لمعامل توازنها <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>&gt;</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">&gt; 1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5782em;vertical-align:-0.0391em;"></span><span class="mrel">&gt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span> &quot;عقداً غير متوازنة&quot;. وتبعاً لحالة عدم التوازن، تنقسم عمليات الدوران إلى أربعة أنواع: الدوران الأيمن، والدوران الأيسر، والدوران الأيمن ثم الأيسر، والدوران الأيسر ثم الأيمن. وفيما يلي نصف عمليات الدوران هذه بالتفصيل.</p>
<h3 id="الدوران-الأيمن">الدوران الأيمن</h3>
<p>وكما يوضح الشكل أدناه، القيمة الواقعة أسفل العقدة هي معامل التوازن. ومن الأسفل إلى الأعلى، تكون أول عقدة غير متوازنة في الشجرة الثنائية هي &quot;العقدة 3&quot;. نركّز على الشجرة الفرعية التي تكون هذه العقدة غير المتوازنة جذراً لها، ونرمز للعقدة بـ<code>node</code> ولابنها الأيسر بـ<code>child</code>، وننفّذ عملية &quot;الدوران الأيمن&quot;. بعد اكتمال الدوران الأيمن، تستعيد الشجرة الفرعية توازنها وتبقى محافظة على خصائص شجرة البحث الثنائية.</p>
<p>وكما يوضح الشكل أدناه، عندما تكون للعقدة <code>child</code> عقدة ابنة يمنى (نرمز لها بـ<code>grand_child</code>)، يلزم إضافة خطوة في الدوران الأيمن: عيّن <code>grand_child</code> ابناً أيسر للعقدة <code>node</code>.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_tree--avltree_right_rotate_with_grandchild.png" alt="الدوران الأيمن مع وجود grand_child"></p>
<p>&quot;الدوران الأيمن&quot; تعبير مجازي؛ ومن الناحية العملية يُنفَّذ بتعديل مؤشرات العقد، كما في الشيفرة التالية:</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">right_rotate</span>(<span class="hljs-params">self, node: TreeNode | <span class="hljs-literal">None</span></span>) -&gt; TreeNode | <span class="hljs-literal">None</span>:
        <span class="hljs-string">&quot;&quot;&quot;Right rotation&quot;&quot;&quot;</span>
        child = node.left
        grand_child = child.right
        <span class="hljs-comment"># Rotate node to the right around child</span>
        child.right = node
        node.left = grand_child
        <span class="hljs-comment"># Update the node height</span>
        <span class="hljs-variable language_">self</span>.update_height(node)
        <span class="hljs-variable language_">self</span>.update_height(child)
        <span class="hljs-comment"># Return the root of the rotated subtree</span>
        <span class="hljs-keyword">return</span> child
</code></pre>
</div>
### الدوران الأيسر
<p>وبالمقابل، إذا نظرنا إلى &quot;المرآة&quot; المقابلة للشجرة الثنائية غير المتوازنة السابقة، فيلزم تنفيذ عملية &quot;الدوران الأيسر&quot; الموضحة في الشكل أدناه.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_tree--avltree_left_rotate.png" alt="عملية الدوران الأيسر"></p>
<p>وبالمثل، وكما يوضح الشكل أدناه، عندما تكون للعقدة <code>child</code> عقدة ابنة يسرى (نرمز لها بـ<code>grand_child</code>)، يلزم إضافة خطوة في الدوران الأيسر: عيّن <code>grand_child</code> ابناً أيمن للعقدة <code>node</code>.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_tree--avltree_left_rotate_with_grandchild.png" alt="الدوران الأيسر مع وجود grand_child"></p>
<p>يمكن ملاحظة أن <strong>عمليتي الدوران الأيمن والدوران الأيسر متماثلتان مرآتياً في المنطق، وأن حالتي عدم التوازن اللتين تعالجانهما متماثلتان أيضاً</strong>. واستناداً إلى هذا التماثل، يكفي أن نستبدل جميع <code>left</code> في شيفرة تنفيذ الدوران الأيمن بـ<code>right</code>، وجميع <code>right</code> بـ<code>left</code>، لنحصل على شيفرة تنفيذ الدوران الأيسر:</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">left_rotate</span>(<span class="hljs-params">self, node: TreeNode | <span class="hljs-literal">None</span></span>) -&gt; TreeNode | <span class="hljs-literal">None</span>:
        <span class="hljs-string">&quot;&quot;&quot;Left rotation&quot;&quot;&quot;</span>
        child = node.right
        grand_child = child.left
        <span class="hljs-comment"># Rotate node to the left around child</span>
        child.left = node
        node.right = grand_child
        <span class="hljs-comment"># Update the node height</span>
        <span class="hljs-variable language_">self</span>.update_height(node)
        <span class="hljs-variable language_">self</span>.update_height(child)
        <span class="hljs-comment"># Return the root of the rotated subtree</span>
        <span class="hljs-keyword">return</span> child
</code></pre>
</div>
### الدوران الأيسر ثم الدوران الأيمن
<p>بالنسبة إلى العقدة غير المتوازنة 3 في الشكل أدناه، لا يمكن باستخدام الدوران الأيسر أو الدوران الأيمن وحده إعادة الشجرة الفرعية إلى التوازن. وفي هذه الحالة، يجب تنفيذ &quot;دوران أيسر&quot; على <code>child</code> أولاً، ثم &quot;دوران أيمن&quot; على <code>node</code>.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_tree--avltree_left_right_rotate.png" alt="الدوران الأيسر ثم الأيمن"></p>
<h3 id="الدوران-الأيمن-ثم-الدوران-الأيسر">الدوران الأيمن ثم الدوران الأيسر</h3>
<p>وكما يوضح الشكل أدناه، في الحالة المرآتية للشجرة الثنائية غير المتوازنة السابقة، يجب تنفيذ &quot;دوران أيمن&quot; على <code>child</code> أولاً، ثم &quot;دوران أيسر&quot; على <code>node</code>.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_tree--avltree_right_left_rotate.png" alt="الدوران الأيمن ثم الأيسر"></p>
<h3 id="اختيار-الدوران">اختيار الدوران</h3>
<p>تتوافق حالات عدم التوازن الأربع الموضحة في الشكل أدناه توافقاً واحداً لواحد مع الحالات السابقة، وتتطلب على التوالي عمليات: الدوران الأيمن، والدوران الأيسر ثم الأيمن، والدوران الأيمن ثم الأيسر، والدوران الأيسر.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_tree--avltree_rotation_cases.png" alt="حالات الدوران الأربع في شجرة AVL"></p>
<p>وكما يوضح الجدول أدناه، نحدّد الحالة التي تنتمي إليها العقدة غير المتوازنة من خلال الحكم على إشارتي معامل توازن العقدة غير المتوازنة ومعامل توازن عقدتها الابنة في الجهة الأطول.</p>
<p align="center"> الجدول <id> &nbsp; شروط الاختيار بين حالات الدوران الأربع </p>
<table>
<thead>
<tr>
<th>معامل توازن العقدة غير المتوازنة</th>
<th>معامل توازن العقدة الابنة</th>
<th>طريقة الدوران المطبَّقة</th>
</tr>
</thead>
<tbody>
<tr>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>&gt;</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">&gt; 1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5782em;vertical-align:-0.0391em;"></span><span class="mrel">&gt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span> (شجرة مائلة لليسار)</td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>≥</mo><mn>0</mn></mrow><annotation encoding="application/x-tex">\\geq 0</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7719em;vertical-align:-0.136em;"></span><span class="mrel">≥</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span></td>
<td>دوران أيمن</td>
</tr>
<tr>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>&gt;</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">&gt; 1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5782em;vertical-align:-0.0391em;"></span><span class="mrel">&gt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span> (شجرة مائلة لليسار)</td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>&lt;</mo><mn>0</mn></mrow><annotation encoding="application/x-tex">&lt;0</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5782em;vertical-align:-0.0391em;"></span><span class="mrel">&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span></td>
<td>دوران أيسر ثم دوران أيمن</td>
</tr>
<tr>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>&lt;</mo><mo>−</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">&lt; -1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5782em;vertical-align:-0.0391em;"></span><span class="mrel">&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">−</span><span class="mord">1</span></span></span></span> (شجرة مائلة لليمين)</td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>≤</mo><mn>0</mn></mrow><annotation encoding="application/x-tex">\\leq 0</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7719em;vertical-align:-0.136em;"></span><span class="mrel">≤</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span></td>
<td>دوران أيسر</td>
</tr>
<tr>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>&lt;</mo><mo>−</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">&lt; -1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5782em;vertical-align:-0.0391em;"></span><span class="mrel">&lt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">−</span><span class="mord">1</span></span></span></span> (شجرة مائلة لليمين)</td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>&gt;</mo><mn>0</mn></mrow><annotation encoding="application/x-tex">&gt;0</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5782em;vertical-align:-0.0391em;"></span><span class="mrel">&gt;</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span></td>
<td>دوران أيمن ثم دوران أيسر</td>
</tr>
</tbody>
</table>
<p>لتسهيل الاستخدام، نغلّف عمليات الدوران في دالة واحدة. <strong>وبهذه الدالة يمكننا تنفيذ الدورانات لمختلف حالات عدم التوازن، وإعادة التوازن إلى العقد غير المتوازنة</strong>. والشيفرة كما يلي:</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">rotate</span>(<span class="hljs-params">self, node: TreeNode | <span class="hljs-literal">None</span></span>) -&gt; TreeNode | <span class="hljs-literal">None</span>:
        <span class="hljs-string">&quot;&quot;&quot;Perform rotations to restore balance in this subtree&quot;&quot;&quot;</span>
        <span class="hljs-comment"># Get the balance factor of node</span>
        balance_factor = <span class="hljs-variable language_">self</span>.balance_factor(node)
        <span class="hljs-comment"># Left-heavy tree</span>
        <span class="hljs-keyword">if</span> balance_factor &gt; <span class="hljs-number">1</span>:
            <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.balance_factor(node.left) &gt;= <span class="hljs-number">0</span>:
                <span class="hljs-comment"># Rotate right</span>
                <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.right_rotate(node)
            <span class="hljs-keyword">else</span>:
                <span class="hljs-comment"># Rotate left, then right</span>
                node.left = <span class="hljs-variable language_">self</span>.left_rotate(node.left)
                <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.right_rotate(node)
        <span class="hljs-comment"># Right-heavy tree</span>
        <span class="hljs-keyword">elif</span> balance_factor &lt; -<span class="hljs-number">1</span>:
            <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.balance_factor(node.right) &lt;= <span class="hljs-number">0</span>:
                <span class="hljs-comment"># Rotate left</span>
                <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.left_rotate(node)
            <span class="hljs-keyword">else</span>:
                <span class="hljs-comment"># Rotate right, then left</span>
                node.right = <span class="hljs-variable language_">self</span>.right_rotate(node.right)
                <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.left_rotate(node)
        <span class="hljs-comment"># The tree is balanced; return without rotating</span>
        <span class="hljs-keyword">return</span> node
</code></pre>
</div>
## العمليات الشائعة في أشجار AVL
<h3 id="إدراج-عقدة">إدراج عقدة</h3>
<p>تتشابه عملية إدراج العقد في أشجار AVL من حيث المبدأ مع نظيرتها في أشجار البحث الثنائية. والفرق الوحيد هو أنه بعد إدراج عقدة في شجرة AVL، قد تظهر سلسلة من العقد غير المتوازنة على المسار من تلك العقدة إلى الجذر. لذلك <strong>نحتاج إلى البدء من هذه العقدة وتنفيذ عمليات الدوران من الأسفل إلى الأعلى، لإعادة التوازن إلى جميع العقد غير المتوازنة</strong>. والشيفرة كما يلي:</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">insert_helper</span>(<span class="hljs-params">self, node: TreeNode | <span class="hljs-literal">None</span>, val: <span class="hljs-built_in">int</span></span>) -&gt; TreeNode:
        <span class="hljs-string">&quot;&quot;&quot;Insert a node recursively (helper method)&quot;&quot;&quot;</span>
        <span class="hljs-keyword">if</span> node <span class="hljs-keyword">is</span> <span class="hljs-literal">None</span>:
            <span class="hljs-keyword">return</span> TreeNode(val)
        <span class="hljs-comment"># 1. Find the insertion position and insert the node</span>
        <span class="hljs-keyword">if</span> val &lt; node.val:
            node.left = <span class="hljs-variable language_">self</span>.insert_helper(node.left, val)
        <span class="hljs-keyword">elif</span> val &gt; node.val:
            node.right = <span class="hljs-variable language_">self</span>.insert_helper(node.right, val)
        <span class="hljs-keyword">else</span>:
            <span class="hljs-comment"># Return without inserting a duplicate node</span>
            <span class="hljs-keyword">return</span> node
        <span class="hljs-comment"># Update the node height</span>
        <span class="hljs-variable language_">self</span>.update_height(node)
        <span class="hljs-comment"># 2. Perform rotations to restore balance in this subtree</span>
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.rotate(node)
</code></pre>
</div>
### حذف العقدة
<p>وبالمثل، واستناداً إلى طريقة حذف العقد في شجرة البحث الثنائية، يجب تنفيذ عمليات الدوران من الأسفل إلى الأعلى لإعادة التوازن إلى جميع العقد غير المتوازنة. والشيفرة كما يلي:</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">remove_helper</span>(<span class="hljs-params">self, node: TreeNode | <span class="hljs-literal">None</span>, val: <span class="hljs-built_in">int</span></span>) -&gt; TreeNode | <span class="hljs-literal">None</span>:
        <span class="hljs-string">&quot;&quot;&quot;Remove a node recursively (helper method)&quot;&quot;&quot;</span>
        <span class="hljs-keyword">if</span> node <span class="hljs-keyword">is</span> <span class="hljs-literal">None</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-literal">None</span>
        <span class="hljs-comment"># 1. Find and remove the node</span>
        <span class="hljs-keyword">if</span> val &lt; node.val:
            node.left = <span class="hljs-variable language_">self</span>.remove_helper(node.left, val)
        <span class="hljs-keyword">elif</span> val &gt; node.val:
            node.right = <span class="hljs-variable language_">self</span>.remove_helper(node.right, val)
        <span class="hljs-keyword">else</span>:
            <span class="hljs-keyword">if</span> node.left <span class="hljs-keyword">is</span> <span class="hljs-literal">None</span> <span class="hljs-keyword">or</span> node.right <span class="hljs-keyword">is</span> <span class="hljs-literal">None</span>:
                child = node.left <span class="hljs-keyword">or</span> node.right
                <span class="hljs-comment"># Number of children = 0: remove node and return</span>
                <span class="hljs-keyword">if</span> child <span class="hljs-keyword">is</span> <span class="hljs-literal">None</span>:
                    <span class="hljs-keyword">return</span> <span class="hljs-literal">None</span>
                <span class="hljs-comment"># Number of children = 1: remove node directly</span>
                <span class="hljs-keyword">else</span>:
                    node = child
            <span class="hljs-keyword">else</span>:
                <span class="hljs-comment"># Number of children = 2: remove the inorder successor and use its value to replace the current node value</span>
                temp = node.right
                <span class="hljs-keyword">while</span> temp.left <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> <span class="hljs-literal">None</span>:
                    temp = temp.left
                node.right = <span class="hljs-variable language_">self</span>.remove_helper(node.right, temp.val)
                node.val = temp.val
        <span class="hljs-comment"># Update the node height</span>
        <span class="hljs-variable language_">self</span>.update_height(node)
        <span class="hljs-comment"># 2. Perform rotations to restore balance in this subtree</span>
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.rotate(node)
</code></pre>
</div>
### البحث عن عقدة
<p>تتوافق عملية البحث عن عقدة في أشجار AVL مع نظيرتها في أشجار البحث الثنائية، ولن نتوسع فيها هنا.</p>
<h2 id="التطبيقات-النموذجية-لأشجار-avl">التطبيقات النموذجية لأشجار AVL</h2>
<ul>
<li>تنظيم البيانات واسعة النطاق وتخزينها، وتلائم السيناريوهات التي تكثر فيها عمليات البحث وتقلّ فيها عمليات الإدراج والحذف.</li>
<li>تُستخدم لبناء أنظمة الفهارس في قواعد البيانات.</li>
<li>الأشجار الحمراء السوداء أيضاً نوع شائع من أشجار البحث الثنائية المتوازنة. فمقارنة بأشجار AVL، تتمتع الأشجار الحمراء السوداء بشروط توازن أكثر تسامحاً، وتتطلب عمليات دوران أقل عند إدراج العقد وحذفها، كما أن كفاءتها المتوسطة في عمليات إضافة العقد وحذفها أعلى.</li>
</ul>
`,o={book:s,chapter:a,chapterTitle:n,slug:e,title:t,headings:l,html:p};export{s as book,a as chapter,n as chapterTitle,o as default,l as headings,p as html,e as slug,t as title};
