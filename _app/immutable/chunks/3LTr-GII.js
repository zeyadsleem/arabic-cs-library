const s="hello-algo",a="chapter_tree",n="الأشجار",t="binary_tree_traversal",l="اجتياز الشجرة الثنائية",e=[{depth:2,id:"الاجتياز-بالمستويات",text:"الاجتياز بالمستويات"},{depth:3,id:"تنفيذ-الشيفرة",text:"تنفيذ الشيفرة"},{depth:3,id:"تحليل-التعقيد",text:"تحليل التعقيد"},{depth:2,id:"الاجتياز-المسبق-والوسطي-واللاحق",text:"الاجتياز المسبق والوسطي واللاحق"},{depth:3,id:"تنفيذ-الشيفرة",text:"تنفيذ الشيفرة"},{depth:3,id:"تحليل-التعقيد",text:"تحليل التعقيد"}],p=`<p>من منظور البنية الفيزيائية، الشجرة بنية بيانات قائمة على القوائم المترابطة. ومن ثم فإن أسلوب اجتيازها يتضمن الوصول إلى العقد واحدة تلو الأخرى عبر المؤشرات. غير أن الشجرة بنية بيانات غير خطية، وهذا يجعل اجتياز الشجرة أكثر تعقيداً من اجتياز قائمة مترابطة، ويتطلب الاستعانة بخوارزميات البحث.</p>
<p>تشمل أساليب الاجتياز الشائعة للأشجار الثنائية: الاجتياز بالمستويات، والاجتياز المسبق، والاجتياز الوسطي، والاجتياز اللاحق.</p>
<h2 id="الاجتياز-بالمستويات">الاجتياز بالمستويات</h2>
<p>كما يوضح الشكل أدناه، فإن <u>الاجتياز بالمستويات</u> (level-order traversal) يجتاز الشجرة الثنائية من الأعلى إلى الأسفل، طبقةً طبقة. وفي كل مستوى، يزور العقد من اليسار إلى اليمين.</p>
<p>الاجتياز بالمستويات هو في جوهره <u>الاجتياز بالعرض أولاً</u> (breadth-first traversal)، ويُعرف أيضاً باسم <u>البحث بالعرض أولاً (BFS)</u>، حيث يتقدم نحو الخارج مستوى تلو الآخر.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_tree--binary_tree_bfs.png" alt="الاجتياز بالمستويات لشجرة ثنائية"></p>
<h3 id="تنفيذ-الشيفرة">تنفيذ الشيفرة</h3>
<p>يُنفَّذ الاجتياز بالعرض أولاً عادةً بمساعدة «الطابور». فالطابور يتبع قاعدة «أول ما يدخل يخرج أولاً»، بينما يتبع الاجتياز بالعرض أولاً قاعدة «التقدم طبقةً طبقة»؛ والفكرتان الكامنتان وراءهما متطابقتان. وشيفرة التنفيذ كما يلي:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* الاجتياز بالمستويات */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">levelOrder</span><span class="hljs-params">(root *TreeNode)</span></span> []any {
	<span class="hljs-comment">// هيّئ الطابور، وأضف عقدة الجذر</span>
	queue := list.New()
	queue.PushBack(root)
	<span class="hljs-comment">// هيّئ slice لحفظ تسلسل الاجتياز</span>
	nums := <span class="hljs-built_in">make</span>([]any, <span class="hljs-number">0</span>)
	<span class="hljs-keyword">for</span> queue.Len() &gt; <span class="hljs-number">0</span> {
		<span class="hljs-comment">// أخرج من الطابور</span>
		node := queue.Remove(queue.Front()).(*TreeNode)
		<span class="hljs-comment">// احفظ قيمة العقدة</span>
		nums = <span class="hljs-built_in">append</span>(nums, node.Val)
		<span class="hljs-keyword">if</span> node.Left != <span class="hljs-literal">nil</span> {
			<span class="hljs-comment">// أدخل عقدة الابن الأيسر إلى الطابور</span>
			queue.PushBack(node.Left)
		}
		<span class="hljs-keyword">if</span> node.Right != <span class="hljs-literal">nil</span> {
			<span class="hljs-comment">// أدخل عقدة الابن الأيمن إلى الطابور</span>
			queue.PushBack(node.Right)
		}
	}
	<span class="hljs-keyword">return</span> nums
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* الاجتياز بالمستويات */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">levelOrder</span>(<span class="hljs-params"><span class="hljs-attr">root</span>: <span class="hljs-title class_">TreeNode</span> | <span class="hljs-literal">null</span></span>): <span class="hljs-built_in">number</span>[] {
    <span class="hljs-comment">// هيّئ الطابور، وأضف عقدة الجذر</span>
    <span class="hljs-keyword">const</span> queue = [root];
    <span class="hljs-comment">// هيّئ قائمة لحفظ تسلسل الاجتياز</span>
    <span class="hljs-keyword">const</span> <span class="hljs-attr">list</span>: <span class="hljs-built_in">number</span>[] = [];
    <span class="hljs-keyword">while</span> (queue.<span class="hljs-property">length</span>) {
        <span class="hljs-keyword">let</span> node = queue.<span class="hljs-title function_">shift</span>() <span class="hljs-keyword">as</span> <span class="hljs-title class_">TreeNode</span>; <span class="hljs-comment">// أخرج من الطابور</span>
        list.<span class="hljs-title function_">push</span>(node.<span class="hljs-property">val</span>); <span class="hljs-comment">// احفظ قيمة العقدة</span>
        <span class="hljs-keyword">if</span> (node.<span class="hljs-property">left</span>) {
            queue.<span class="hljs-title function_">push</span>(node.<span class="hljs-property">left</span>); <span class="hljs-comment">// أدخل عقدة الابن الأيسر إلى الطابور</span>
        }
        <span class="hljs-keyword">if</span> (node.<span class="hljs-property">right</span>) {
            queue.<span class="hljs-title function_">push</span>(node.<span class="hljs-property">right</span>); <span class="hljs-comment">// أدخل عقدة الابن الأيمن إلى الطابور</span>
        }
    }
    <span class="hljs-keyword">return</span> list;
}
</code></pre>
</div>
<h3 id="تحليل-التعقيد">تحليل التعقيد</h3>
<ul>
<li><strong>التعقيد الزمني هو <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></strong>: تُزار جميع العقد مرة واحدة، مستخدماً زمن <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>، حيث <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> هو عدد العقد.</li>
<li><strong>التعقيد المكاني هو <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></strong>: في أسوأ الحالات، أي في شجرة ثنائية تامة، وقبل الاجتياز إلى المستوى السفلي، يحتوي الطابور في الوقت نفسه على <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">(</mo><mi>n</mi><mo>+</mo><mn>1</mn><mo stretchy="false">)</mo><mi mathvariant="normal">/</mi><mn>2</mn></mrow><annotation encoding="application/x-tex">(n + 1) / 2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">1</span><span class="mclose">)</span><span class="mord">/2</span></span></span></span> عقدة على الأكثر، شاغلاً مساحة <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>.</li>
</ul>
<h2 id="الاجتياز-المسبق-والوسطي-واللاحق">الاجتياز المسبق والوسطي واللاحق</h2>
<p>وبالمقابل، تنتمي الاجتيازات المسبق والوسطي واللاحق جميعها إلى <u>الاجتياز بالعمق أولاً</u> (depth-first traversal)، ويُعرف أيضاً باسم <u>البحث بالعمق أولاً (DFS)</u>، حيث يتعمق قدر الإمكان ثم يتراجع.</p>
<p>ويوضح الشكل أدناه كيفية عمل الاجتياز بالعمق أولاً على شجرة ثنائية. <strong>الاجتياز بالعمق أولاً أشبه بـ«المشي» حول محيط الشجرة الثنائية بأكملها</strong>، حيث نصادف عند كل عقدة ثلاثة مواضع تقابل الاجتياز المسبق والوسطي واللاحق.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_tree--binary_tree_dfs.png" alt="الاجتياز المسبق والوسطي واللاحق لشجرة ثنائية"></p>
<h3 id="تنفيذ-الشيفرة">تنفيذ الشيفرة</h3>
<p>يُنفَّذ البحث بالعمق أولاً عادةً استناداً إلى التعاود:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* الاجتياز اللاحق */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">postOrder</span><span class="hljs-params">(node *TreeNode)</span></span> {
	<span class="hljs-keyword">if</span> node == <span class="hljs-literal">nil</span> {
		<span class="hljs-keyword">return</span>
	}
	<span class="hljs-comment">// أولوية الزيارة: الشجرة الفرعية اليسرى -&gt; الشجرة الفرعية اليمنى -&gt; عقدة الجذر</span>
	postOrder(node.Left)
	postOrder(node.Right)
	nums = <span class="hljs-built_in">append</span>(nums, node.Val)
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* الاجتياز اللاحق */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">postOrder</span>(<span class="hljs-params"><span class="hljs-attr">root</span>: <span class="hljs-title class_">TreeNode</span> | <span class="hljs-literal">null</span></span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">if</span> (root === <span class="hljs-literal">null</span>) {
        <span class="hljs-keyword">return</span>;
    }
    <span class="hljs-comment">// أولوية الزيارة: الشجرة الفرعية اليسرى -&gt; الشجرة الفرعية اليمنى -&gt; عقدة الجذر</span>
    <span class="hljs-title function_">postOrder</span>(root.<span class="hljs-property">left</span>);
    <span class="hljs-title function_">postOrder</span>(root.<span class="hljs-property">right</span>);
    list.<span class="hljs-title function_">push</span>(root.<span class="hljs-property">val</span>);
}
</code></pre>
</div>
<div class="note">
<p>يمكن أيضاً تنفيذ البحث بالعمق أولاً تكرارياً، ويمكن للقارئ المهتم أن يستكشف ذلك بنفسه.</p>
</div>
<p>يوضح الشكل أدناه العملية التعاودية للاجتياز المسبق لشجرة ثنائية، ويمكن تقسيمها إلى مرحلتين متعاكستين: «النزول» و«العودة».</p>
<ol>
<li>«النزول» يعني إجراء استدعاء تعاودي جديد، يزور البرنامج خلاله العقدة التالية.</li>
<li>«العودة» تعني عودة استدعاء الدالة، ما يشير إلى أن العقدة الحالية قد اكتملت معالجتها.</li>
</ol>
<h3 id="تحليل-التعقيد">تحليل التعقيد</h3>
<ul>
<li><strong>التعقيد الزمني هو <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></strong>: تُزار جميع العقد مرة واحدة، مستخدماً زمن <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>.</li>
<li><strong>التعقيد المكاني هو <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></strong>: في أسوأ الحالات، أي عندما تتدهور الشجرة إلى قائمة مترابطة، يبلغ عمق التعاود <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span>، ويشغل النظام مساحة إطار مكدس <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>.</li>
</ul>
`,m={book:s,chapter:a,chapterTitle:n,slug:t,title:l,headings:e,html:p};export{s as book,a as chapter,n as chapterTitle,m as default,e as headings,p as html,t as slug,l as title};
