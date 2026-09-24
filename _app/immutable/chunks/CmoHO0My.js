const s="hello-algo",n="chapter_tree",a="الأشجار",t="avl_tree",l="شجرة AVL *",e=[{depth:2,id:"المصطلحات-الشائعة-في-أشجار-avl",text:"المصطلحات الشائعة في أشجار AVL"},{depth:3,id:"ارتفاع-العقدة",text:"ارتفاع العقدة"},{depth:3,id:"معامل-توازن-العقدة",text:"معامل توازن العقدة"},{depth:2,id:"الدورانات-في-أشجار-avl",text:"الدورانات في أشجار AVL"},{depth:3,id:"الدوران-الأيمن",text:"الدوران الأيمن"},{depth:3,id:"الدوران-الأيسر",text:"الدوران الأيسر"},{depth:3,id:"الدوران-الأيسر-ثم-الدوران-الأيمن",text:"الدوران الأيسر ثم الدوران الأيمن"},{depth:3,id:"الدوران-الأيمن-ثم-الدوران-الأيسر",text:"الدوران الأيمن ثم الدوران الأيسر"},{depth:3,id:"اختيار-الدوران",text:"اختيار الدوران"},{depth:2,id:"العمليات-الشائعة-في-أشجار-avl",text:"العمليات الشائعة في أشجار AVL"},{depth:3,id:"إدراج-عقدة",text:"إدراج عقدة"},{depth:3,id:"حذف-العقدة",text:"حذف العقدة"},{depth:3,id:"البحث-عن-عقدة",text:"البحث عن عقدة"},{depth:2,id:"التطبيقات-النموذجية-لأشجار-avl",text:"التطبيقات النموذجية لأشجار AVL"}],p=`<p>ذكرنا في قسم &quot;شجرة البحث الثنائية&quot; أنه بعد عمليات إدراج وحذف متعددة قد تتدهور شجرة البحث الثنائية إلى قائمة مترابطة. وفي هذه الحالة يتدهور التعقيد الزمني لجميع العمليات من $O(\\log n)$ إلى $O(n)$.</p>
<p>وكما يوضح الشكل أدناه، بعد عمليتي حذف لعقدتين، تتدهور شجرة البحث الثنائية هذه إلى قائمة مترابطة.</p>
<p><img src="/images/hello-algo/chapter_tree--avltree_degradation_from_removing_node.png" alt="تدهور شجرة AVL بعد حذف عقد"></p>
<p>على سبيل المثال، في الشجرة الثنائية التامة الموضحة في الشكل أدناه، بعد إدراج عقدتين ستميل الشجرة ميلاً شديداً إلى اليسار، وسيتدهور التعقيد الزمني لعمليات البحث أيضاً.</p>
<p><img src="/images/hello-algo/chapter_tree--avltree_degradation_from_inserting_node.png" alt="تدهور شجرة AVL بعد إدراج عقد"></p>
<p>في عام 1962، اقترح G. M. Adelson-Velsky وE. M. Landis <u>شجرة AVL</u> في ورقيتهما &quot;An algorithm for the organization of information&quot;. وتصف الورقة سلسلة من العمليات التي تمنع شجرة AVL من التدهور عند إدراج العقد وحذفها، مما يحافظ على التعقيد الزمني لمختلف العمليات عند $O(\\log n)$. وبعبارة أخرى، في السيناريوهات التي تتطلب عمليات إدراج وحذف وبحث وتحديث متكررة، تستطيع أشجار AVL الحفاظ على أداء فعّال باستمرار، ولذلك لها قيمة عملية كبيرة.</p>
<h2 id="المصطلحات-الشائعة-في-أشجار-avl">المصطلحات الشائعة في أشجار AVL</h2>
<p>شجرة AVL هي في الوقت نفسه شجرة بحث ثنائية وشجرة ثنائية متوازنة، وتستوفي في آن واحد جميع خصائص هذين النوعين من الأشجار الثنائية، لذا فهي <u>شجرة بحث ثنائية متوازنة</u>.</p>
<h3 id="ارتفاع-العقدة">ارتفاع العقدة</h3>
<p>بما أن العمليات المتعلقة بأشجار AVL تتطلب الحصول على ارتفاعات العقد، نحتاج إلى إضافة متغير <code>height</code> إلى صنف العقدة:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* عقدة شجرة AVL */</span>
<span class="hljs-keyword">type</span> TreeNode <span class="hljs-keyword">struct</span> {
    Val    <span class="hljs-type">int</span>       <span class="hljs-comment">// قيمة العقدة</span>
    Height <span class="hljs-type">int</span>       <span class="hljs-comment">// ارتفاع العقدة</span>
    Left   *TreeNode <span class="hljs-comment">// مرجع الابن الأيسر</span>
    Right  *TreeNode <span class="hljs-comment">// مرجع الابن الأيمن</span>
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-typescript"><span class="hljs-comment">/* عقدة شجرة AVL */</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">TreeNode</span> {
    <span class="hljs-attr">val</span>: <span class="hljs-built_in">number</span>;            <span class="hljs-comment">// قيمة العقدة</span>
    <span class="hljs-attr">height</span>: <span class="hljs-built_in">number</span>;         <span class="hljs-comment">// ارتفاع العقدة</span>
    <span class="hljs-attr">left</span>: <span class="hljs-title class_">TreeNode</span> | <span class="hljs-literal">null</span>;  <span class="hljs-comment">// مؤشر الابن الأيسر</span>
    <span class="hljs-attr">right</span>: <span class="hljs-title class_">TreeNode</span> | <span class="hljs-literal">null</span>; <span class="hljs-comment">// مؤشر الابن الأيمن</span>
    <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">val</span>?: <span class="hljs-built_in">number</span>, <span class="hljs-attr">height</span>?: <span class="hljs-built_in">number</span>, <span class="hljs-attr">left</span>?: <span class="hljs-title class_">TreeNode</span> | <span class="hljs-literal">null</span>, <span class="hljs-attr">right</span>?: <span class="hljs-title class_">TreeNode</span> | <span class="hljs-literal">null</span></span>) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">val</span> = val === <span class="hljs-literal">undefined</span> ? <span class="hljs-number">0</span> : val;
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">height</span> = height === <span class="hljs-literal">undefined</span> ? <span class="hljs-number">0</span> : height;
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">left</span> = left === <span class="hljs-literal">undefined</span> ? <span class="hljs-literal">null</span> : left;
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">right</span> = right === <span class="hljs-literal">undefined</span> ? <span class="hljs-literal">null</span> : right;
    }
}
</code></pre>
</div>
<p>يشير &quot;ارتفاع العقدة&quot; إلى المسافة من تلك العقدة إلى أبعد عقدة ورقة عنها، أي عدد الأضلاع على المسار. ومن المهم ملاحظة أن ارتفاع عقدة الورقة هو $0$، وارتفاع العقدة الفارغة هو $-1$. سننشئ دالتين مساعدتين للحصول على ارتفاع العقدة وتحديثه:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* حدّث ارتفاع العقدة */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(t *aVLTree)</span></span> updateHeight(node *TreeNode) {
	lh := t.height(node.Left)
	rh := t.height(node.Right)
	<span class="hljs-comment">// ارتفاع العقدة يساوي ارتفاع أطول شجرة فرعية + 1</span>
	<span class="hljs-keyword">if</span> lh &gt; rh {
		node.Height = lh + <span class="hljs-number">1</span>
	} <span class="hljs-keyword">else</span> {
		node.Height = rh + <span class="hljs-number">1</span>
	}
}
</code></pre>
</div>
<h3 id="معامل-توازن-العقدة">معامل توازن العقدة</h3>
<p>يُعرَّف <u>معامل التوازن</u> للعقدة بأنه ارتفاع الشجرة الفرعية اليسرى للعقدة مطروحاً منه ارتفاع شجرتها الفرعية اليمنى، ويُعرَّف معامل توازن العقدة الفارغة بأنه $0$. كما نغلّف دالة الحصول على معامل توازن العقدة لتسهيل استخدامها لاحقاً:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* احصل على معامل التوازن */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(t *aVLTree)</span></span> balanceFactor(node *TreeNode) <span class="hljs-type">int</span> {
	<span class="hljs-comment">// معامل توازن العقدة الفارغة هو 0</span>
	<span class="hljs-keyword">if</span> node == <span class="hljs-literal">nil</span> {
		<span class="hljs-keyword">return</span> <span class="hljs-number">0</span>
	}
	<span class="hljs-comment">// معامل توازن العقدة = ارتفاع الشجرة الفرعية اليسرى - ارتفاع الشجرة الفرعية اليمنى</span>
	<span class="hljs-keyword">return</span> t.height(node.Left) - t.height(node.Right)
}
</code></pre>
</div>
<div class="note">
<p>ليكن معامل التوازن $f$، فيستوفي معامل توازن أي عقدة في شجرة AVL الشرط $-1 \\le f \\le 1$.</p>
</div>
<h2 id="الدورانات-في-أشجار-avl">الدورانات في أشجار AVL</h2>
<p>تكمن خصوصية أشجار AVL في عملية &quot;الدوران&quot;، التي تستطيع إعادة التوازن إلى العقد غير المتوازنة دون التأثير في تسلسل الاجتياز الوسطي للشجرة الثنائية. وبعبارة أخرى، <strong>تستطيع عمليات الدوران الحفاظ على خاصية &quot;شجرة البحث الثنائية&quot; وإعادة الشجرة إلى &quot;شجرة ثنائية متوازنة&quot; في آن واحد</strong>.</p>
<p>نسمي العقد التي تكون القيمة المطلقة لمعامل توازنها $&gt; 1$ &quot;عقداً غير متوازنة&quot;. وتبعاً لحالة عدم التوازن، تنقسم عمليات الدوران إلى أربعة أنواع: الدوران الأيمن، والدوران الأيسر، والدوران الأيمن ثم الأيسر، والدوران الأيسر ثم الأيمن. وفيما يلي نصف عمليات الدوران هذه بالتفصيل.</p>
<h3 id="الدوران-الأيمن">الدوران الأيمن</h3>
<p>وكما يوضح الشكل أدناه، القيمة الواقعة أسفل العقدة هي معامل التوازن. ومن الأسفل إلى الأعلى، تكون أول عقدة غير متوازنة في الشجرة الثنائية هي &quot;العقدة 3&quot;. نركّز على الشجرة الفرعية التي تكون هذه العقدة غير المتوازنة جذراً لها، ونرمز للعقدة بـ<code>node</code> ولابنها الأيسر بـ<code>child</code>، وننفّذ عملية &quot;الدوران الأيمن&quot;. بعد اكتمال الدوران الأيمن، تستعيد الشجرة الفرعية توازنها وتبقى محافظة على خصائص شجرة البحث الثنائية.</p>
<p>وكما يوضح الشكل أدناه، عندما تكون للعقدة <code>child</code> عقدة ابنة يمنى (نرمز لها بـ<code>grand_child</code>)، يلزم إضافة خطوة في الدوران الأيمن: عيّن <code>grand_child</code> ابناً أيسر للعقدة <code>node</code>.</p>
<p><img src="/images/hello-algo/chapter_tree--avltree_right_rotate_with_grandchild.png" alt="الدوران الأيمن مع وجود grand_child"></p>
<p>&quot;الدوران الأيمن&quot; تعبير مجازي؛ ومن الناحية العملية يُنفَّذ بتعديل مؤشرات العقد، كما في الشيفرة التالية:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* عملية الدوران الأيمن */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(t *aVLTree)</span></span> rightRotate(node *TreeNode) *TreeNode {
	child := node.Left
	grandChild := child.Right
	<span class="hljs-comment">// باستخدام child كمحور، أدر node إلى اليمين</span>
	child.Right = node
	node.Left = grandChild
	<span class="hljs-comment">// حدّث ارتفاع العقدة</span>
	t.updateHeight(node)
	t.updateHeight(child)
	<span class="hljs-comment">// أعد عقدة جذر الشجرة الفرعية بعد الدوران</span>
	<span class="hljs-keyword">return</span> child
}
</code></pre>
</div>
<h3 id="الدوران-الأيسر">الدوران الأيسر</h3>
<p>وبالمقابل، إذا نظرنا إلى &quot;المرآة&quot; المقابلة للشجرة الثنائية غير المتوازنة السابقة، فيلزم تنفيذ عملية &quot;الدوران الأيسر&quot; الموضحة في الشكل أدناه.</p>
<p><img src="/images/hello-algo/chapter_tree--avltree_left_rotate.png" alt="عملية الدوران الأيسر"></p>
<p>وبالمثل، وكما يوضح الشكل أدناه، عندما تكون للعقدة <code>child</code> عقدة ابنة يسرى (نرمز لها بـ<code>grand_child</code>)، يلزم إضافة خطوة في الدوران الأيسر: عيّن <code>grand_child</code> ابناً أيمن للعقدة <code>node</code>.</p>
<p><img src="/images/hello-algo/chapter_tree--avltree_left_rotate_with_grandchild.png" alt="الدوران الأيسر مع وجود grand_child"></p>
<p>يمكن ملاحظة أن <strong>عمليتي الدوران الأيمن والدوران الأيسر متماثلتان مرآتياً في المنطق، وأن حالتي عدم التوازن اللتين تعالجانهما متماثلتان أيضاً</strong>. واستناداً إلى هذا التماثل، يكفي أن نستبدل جميع <code>left</code> في شيفرة تنفيذ الدوران الأيمن بـ<code>right</code>، وجميع <code>right</code> بـ<code>left</code>، لنحصل على شيفرة تنفيذ الدوران الأيسر:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* عملية الدوران الأيسر */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(t *aVLTree)</span></span> leftRotate(node *TreeNode) *TreeNode {
	child := node.Right
	grandChild := child.Left
	<span class="hljs-comment">// باستخدام child كمحور، أدر node إلى اليسار</span>
	child.Left = node
	node.Right = grandChild
	<span class="hljs-comment">// حدّث ارتفاع العقدة</span>
	t.updateHeight(node)
	t.updateHeight(child)
	<span class="hljs-comment">// أعد عقدة جذر الشجرة الفرعية بعد الدوران</span>
	<span class="hljs-keyword">return</span> child
}
</code></pre>
</div>
<h3 id="الدوران-الأيسر-ثم-الدوران-الأيمن">الدوران الأيسر ثم الدوران الأيمن</h3>
<p>بالنسبة إلى العقدة غير المتوازنة 3 في الشكل أدناه، لا يمكن باستخدام الدوران الأيسر أو الدوران الأيمن وحده إعادة الشجرة الفرعية إلى التوازن. وفي هذه الحالة، يجب تنفيذ &quot;دوران أيسر&quot; على <code>child</code> أولاً، ثم &quot;دوران أيمن&quot; على <code>node</code>.</p>
<p><img src="/images/hello-algo/chapter_tree--avltree_left_right_rotate.png" alt="الدوران الأيسر ثم الأيمن"></p>
<h3 id="الدوران-الأيمن-ثم-الدوران-الأيسر">الدوران الأيمن ثم الدوران الأيسر</h3>
<p>وكما يوضح الشكل أدناه، في الحالة المرآتية للشجرة الثنائية غير المتوازنة السابقة، يجب تنفيذ &quot;دوران أيمن&quot; على <code>child</code> أولاً، ثم &quot;دوران أيسر&quot; على <code>node</code>.</p>
<p><img src="/images/hello-algo/chapter_tree--avltree_right_left_rotate.png" alt="الدوران الأيمن ثم الأيسر"></p>
<h3 id="اختيار-الدوران">اختيار الدوران</h3>
<p>تتوافق حالات عدم التوازن الأربع الموضحة في الشكل أدناه توافقاً واحداً لواحد مع الحالات السابقة، وتتطلب على التوالي عمليات: الدوران الأيمن، والدوران الأيسر ثم الأيمن، والدوران الأيمن ثم الأيسر، والدوران الأيسر.</p>
<p><img src="/images/hello-algo/chapter_tree--avltree_rotation_cases.png" alt="حالات الدوران الأربع في شجرة AVL"></p>
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
<td>$&gt; 1$ (شجرة مائلة لليسار)</td>
<td>$\\geq 0$</td>
<td>دوران أيمن</td>
</tr>
<tr>
<td>$&gt; 1$ (شجرة مائلة لليسار)</td>
<td>$&lt;0$</td>
<td>دوران أيسر ثم دوران أيمن</td>
</tr>
<tr>
<td>$&lt; -1$ (شجرة مائلة لليمين)</td>
<td>$\\leq 0$</td>
<td>دوران أيسر</td>
</tr>
<tr>
<td>$&lt; -1$ (شجرة مائلة لليمين)</td>
<td>$&gt;0$</td>
<td>دوران أيمن ثم دوران أيسر</td>
</tr>
</tbody>
</table>
<p>لتسهيل الاستخدام، نغلّف عمليات الدوران في دالة واحدة. <strong>وبهذه الدالة يمكننا تنفيذ الدورانات لمختلف حالات عدم التوازن، وإعادة التوازن إلى العقد غير المتوازنة</strong>. والشيفرة كما يلي:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* نفّذ عملية الدوران لاستعادة توازن هذه الشجرة الفرعية */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(t *aVLTree)</span></span> rotate(node *TreeNode) *TreeNode {
	<span class="hljs-comment">// احصل على معامل توازن العقدة</span>
	<span class="hljs-comment">// توصي Go بأسماء متغيرات قصيرة، وهنا يشير bf إلى t.balanceFactor</span>
	bf := t.balanceFactor(node)
	<span class="hljs-comment">// شجرة مائلة لليسار</span>
	<span class="hljs-keyword">if</span> bf &gt; <span class="hljs-number">1</span> {
		<span class="hljs-keyword">if</span> t.balanceFactor(node.Left) &gt;= <span class="hljs-number">0</span> {
			<span class="hljs-comment">// دوران أيمن</span>
			<span class="hljs-keyword">return</span> t.rightRotate(node)
		} <span class="hljs-keyword">else</span> {
			<span class="hljs-comment">// دوران أيسر ثم دوران أيمن</span>
			node.Left = t.leftRotate(node.Left)
			<span class="hljs-keyword">return</span> t.rightRotate(node)
		}
	}
	<span class="hljs-comment">// شجرة مائلة لليمين</span>
	<span class="hljs-keyword">if</span> bf &lt; <span class="hljs-number">-1</span> {
		<span class="hljs-keyword">if</span> t.balanceFactor(node.Right) &lt;= <span class="hljs-number">0</span> {
			<span class="hljs-comment">// دوران أيسر</span>
			<span class="hljs-keyword">return</span> t.leftRotate(node)
		} <span class="hljs-keyword">else</span> {
			<span class="hljs-comment">// دوران أيمن ثم دوران أيسر</span>
			node.Right = t.rightRotate(node.Right)
			<span class="hljs-keyword">return</span> t.leftRotate(node)
		}
	}
	<span class="hljs-comment">// شجرة متوازنة، لا حاجة إلى دوران، أعد مباشرة</span>
	<span class="hljs-keyword">return</span> node
}
</code></pre>
</div>
<h2 id="العمليات-الشائعة-في-أشجار-avl">العمليات الشائعة في أشجار AVL</h2>
<h3 id="إدراج-عقدة">إدراج عقدة</h3>
<p>تتشابه عملية إدراج العقد في أشجار AVL من حيث المبدأ مع نظيرتها في أشجار البحث الثنائية. والفرق الوحيد هو أنه بعد إدراج عقدة في شجرة AVL، قد تظهر سلسلة من العقد غير المتوازنة على المسار من تلك العقدة إلى الجذر. لذلك <strong>نحتاج إلى البدء من هذه العقدة وتنفيذ عمليات الدوران من الأسفل إلى الأعلى، لإعادة التوازن إلى جميع العقد غير المتوازنة</strong>. والشيفرة كما يلي:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* أدرج عقدة تعاودياً (دالة مساعدة) */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(t *aVLTree)</span></span> insertHelper(node *TreeNode, val <span class="hljs-type">int</span>) *TreeNode {
	<span class="hljs-keyword">if</span> node == <span class="hljs-literal">nil</span> {
		<span class="hljs-keyword">return</span> NewTreeNode(val)
	}
	<span class="hljs-comment">/* 1. ابحث عن موضع الإدراج وأدرج العقدة */</span>
	<span class="hljs-keyword">if</span> val &lt; node.Val.(<span class="hljs-type">int</span>) {
		node.Left = t.insertHelper(node.Left, val)
	} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> val &gt; node.Val.(<span class="hljs-type">int</span>) {
		node.Right = t.insertHelper(node.Right, val)
	} <span class="hljs-keyword">else</span> {
		<span class="hljs-comment">// عقدة مكررة لم تُدرَج، أعد مباشرة</span>
		<span class="hljs-keyword">return</span> node
	}
	<span class="hljs-comment">// حدّث ارتفاع العقدة</span>
	t.updateHeight(node)
	<span class="hljs-comment">/* 2. نفّذ عملية الدوران لاستعادة توازن هذه الشجرة الفرعية */</span>
	node = t.rotate(node)
	<span class="hljs-comment">// أعد عقدة جذر الشجرة الفرعية</span>
	<span class="hljs-keyword">return</span> node
}
</code></pre>
</div>
<h3 id="حذف-العقدة">حذف العقدة</h3>
<p>وبالمثل، واستناداً إلى طريقة حذف العقد في شجرة البحث الثنائية، يجب تنفيذ عمليات الدوران من الأسفل إلى الأعلى لإعادة التوازن إلى جميع العقد غير المتوازنة. والشيفرة كما يلي:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* احذف عقدة تعاودياً (دالة مساعدة) */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(t *aVLTree)</span></span> removeHelper(node *TreeNode, val <span class="hljs-type">int</span>) *TreeNode {
	<span class="hljs-keyword">if</span> node == <span class="hljs-literal">nil</span> {
		<span class="hljs-keyword">return</span> <span class="hljs-literal">nil</span>
	}
	<span class="hljs-comment">/* 1. ابحث عن العقدة واحذفها */</span>
	<span class="hljs-keyword">if</span> val &lt; node.Val.(<span class="hljs-type">int</span>) {
		node.Left = t.removeHelper(node.Left, val)
	} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> val &gt; node.Val.(<span class="hljs-type">int</span>) {
		node.Right = t.removeHelper(node.Right, val)
	} <span class="hljs-keyword">else</span> {
		<span class="hljs-keyword">if</span> node.Left == <span class="hljs-literal">nil</span> || node.Right == <span class="hljs-literal">nil</span> {
			child := node.Left
			<span class="hljs-keyword">if</span> node.Right != <span class="hljs-literal">nil</span> {
				child = node.Right
			}
			<span class="hljs-keyword">if</span> child == <span class="hljs-literal">nil</span> {
				<span class="hljs-comment">// عدد العقد الابنة = 0، احذف العقدة مباشرة وأعد</span>
				<span class="hljs-keyword">return</span> <span class="hljs-literal">nil</span>
			} <span class="hljs-keyword">else</span> {
				<span class="hljs-comment">// عدد العقد الابنة = 1، احذف العقدة مباشرة</span>
				node = child
			}
		} <span class="hljs-keyword">else</span> {
			<span class="hljs-comment">// عدد العقد الابنة = 2، احذف العقدة التالية في الاجتياز الوسطي واستبدل العقدة الحالية بها</span>
			temp := node.Right
			<span class="hljs-keyword">for</span> temp.Left != <span class="hljs-literal">nil</span> {
				temp = temp.Left
			}
			node.Right = t.removeHelper(node.Right, temp.Val.(<span class="hljs-type">int</span>))
			node.Val = temp.Val
		}
	}
	<span class="hljs-comment">// حدّث ارتفاع العقدة</span>
	t.updateHeight(node)
	<span class="hljs-comment">/* 2. نفّذ عملية الدوران لاستعادة توازن هذه الشجرة الفرعية */</span>
	node = t.rotate(node)
	<span class="hljs-comment">// أعد عقدة جذر الشجرة الفرعية</span>
	<span class="hljs-keyword">return</span> node
}
</code></pre>
</div>
<h3 id="البحث-عن-عقدة">البحث عن عقدة</h3>
<p>تتوافق عملية البحث عن عقدة في أشجار AVL مع نظيرتها في أشجار البحث الثنائية، ولن نتوسع فيها هنا.</p>
<h2 id="التطبيقات-النموذجية-لأشجار-avl">التطبيقات النموذجية لأشجار AVL</h2>
<ul>
<li>تنظيم البيانات واسعة النطاق وتخزينها، وتلائم السيناريوهات التي تكثر فيها عمليات البحث وتقلّ فيها عمليات الإدراج والحذف.</li>
<li>تُستخدم لبناء أنظمة الفهارس في قواعد البيانات.</li>
<li>الأشجار الحمراء السوداء أيضاً نوع شائع من أشجار البحث الثنائية المتوازنة. فمقارنة بأشجار AVL، تتمتع الأشجار الحمراء السوداء بشروط توازن أكثر تسامحاً، وتتطلب عمليات دوران أقل عند إدراج العقد وحذفها، كما أن كفاءتها المتوسطة في عمليات إضافة العقد وحذفها أعلى.</li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:l,headings:e,html:p};export{s as book,n as chapter,a as chapterTitle,c as default,e as headings,p as html,t as slug,l as title};
