const a="hello-algo",s="chapter_tree",n="الأشجار",t="binary_search_tree",e="شجرة البحث الثنائية",l=[{depth:2,id:"العمليات-على-شجرة-البحث-الثنائية",text:"العمليات على شجرة البحث الثنائية"},{depth:3,id:"البحث-عن-عقدة",text:"البحث عن عقدة"},{depth:3,id:"إدراج-عقدة",text:"إدراج عقدة"},{depth:3,id:"حذف-عقدة",text:"حذف عقدة"},{depth:3,id:"الاجتياز-الوسطي-مرتب",text:"الاجتياز الوسطي مرتّب"},{depth:2,id:"كفاءة-أشجار-البحث-الثنائية",text:"كفاءة أشجار البحث الثنائية"},{depth:2,id:"التطبيقات-الشائعة-لأشجار-البحث-الثنائية",text:"التطبيقات الشائعة لأشجار البحث الثنائية"}],p=`<p>كما يوضح الشكل أدناه، تستوفي <u>شجرة البحث الثنائية</u> الشروط التالية.</p>
<ol>
<li>بالنسبة إلى العقدة الجذرية، تكون قيمة جميع العقد في الشجرة الفرعية اليسرى <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>&lt;</mo></mrow><annotation encoding="application/x-tex">&lt;</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5782em;vertical-align:-0.0391em;"></span><span class="mrel">&lt;</span></span></span></span> قيمة العقدة الجذرية <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>&lt;</mo></mrow><annotation encoding="application/x-tex">&lt;</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5782em;vertical-align:-0.0391em;"></span><span class="mrel">&lt;</span></span></span></span> قيمة جميع العقد في الشجرة الفرعية اليمنى.</li>
<li>الشجرتان الفرعيتان اليسرى واليمنى لأي عقدة هما أيضاً شجرتا بحث ثنائيتان، أي أنهما تستوفيان الشرط <code>1.</code> أيضاً.</li>
</ol>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_tree--binary_search_tree.png" alt="شجرة البحث الثنائية"></p>
<h2 id="العمليات-على-شجرة-البحث-الثنائية">العمليات على شجرة البحث الثنائية</h2>
<p>نغلّف شجرة البحث الثنائية في صنف <code>BinarySearchTree</code> ونعلن متغيراً عضواً <code>root</code> يشير إلى العقدة الجذرية للشجرة.</p>
<h3 id="البحث-عن-عقدة">البحث عن عقدة</h3>
<p>بمعطى قيمة عقدة مستهدفة <code>num</code>، يمكننا البحث وفق خصائص شجرة البحث الثنائية. وكما يوضح الشكل أدناه، نعلن عقدة <code>cur</code> ونبدأ من العقدة الجذرية لشجرة البحث الثنائية <code>root</code>، ونكرّر مقارنة <code>cur.val</code> بـ<code>num</code>.</p>
<ul>
<li>إذا كان <code>cur.val &lt; num</code>، فالعقدة المستهدفة في الشجرة الفرعية اليمنى لـ<code>cur</code>، فننفّذ <code>cur = cur.right</code>.</li>
<li>إذا كان <code>cur.val &gt; num</code>، فالعقدة المستهدفة في الشجرة الفرعية اليسرى لـ<code>cur</code>، فننفّذ <code>cur = cur.left</code>.</li>
<li>إذا كان <code>cur.val = num</code>، فقد وُجدت العقدة المستهدفة، فنخرج من الحلقة ونعيد العقدة.</li>
</ul>
<p>تتبع عملية البحث في شجرة البحث الثنائية المبدأ نفسه الذي يتبعه البحث الثنائي: كل جولة تستبعد نصف الحالات المتبقية. وعدد تكرارات الحلقة لا يزيد على ارتفاع الشجرة. وعندما تكون الشجرة متوازنة، يستغرق البحث زمن <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(\\log n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>. وشيفرة المثال كما يلي:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* ابحث عن عقدة */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(bst *binarySearchTree)</span></span> search(num <span class="hljs-type">int</span>) *TreeNode {
	node := bst.root
	<span class="hljs-comment">// البحث بحلقة، واخرج بعد تجاوز عقدة ورقة</span>
	<span class="hljs-keyword">for</span> node != <span class="hljs-literal">nil</span> {
		<span class="hljs-keyword">if</span> node.Val.(<span class="hljs-type">int</span>) &lt; num {
			<span class="hljs-comment">// العقدة المستهدفة في الشجرة الفرعية اليمنى لـcur</span>
			node = node.Right
		} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> node.Val.(<span class="hljs-type">int</span>) &gt; num {
			<span class="hljs-comment">// العقدة المستهدفة في الشجرة الفرعية اليسرى لـcur</span>
			node = node.Left
		} <span class="hljs-keyword">else</span> {
			<span class="hljs-comment">// وُجدت العقدة المستهدفة، اخرج من الحلقة</span>
			<span class="hljs-keyword">break</span>
		}
	}
	<span class="hljs-comment">// أعد العقدة المستهدفة</span>
	<span class="hljs-keyword">return</span> node
}
</code></pre>
</div>
<h3 id="إدراج-عقدة">إدراج عقدة</h3>
<p>بمعطى عنصر <code>num</code> مطلوب إدراجه، ومن أجل الحفاظ على خاصية شجرة البحث الثنائية «الشجرة الفرعية اليسرى &lt; العقدة الجذرية &lt; الشجرة الفرعية اليمنى»، تكون عملية الإدراج كما يوضح الشكل أدناه.</p>
<ol>
<li><strong>إيجاد موضع الإدراج</strong>: على غرار عملية البحث، ابدأ من العقدة الجذرية وابحث بحلقة نزولاً وفق علاقة الحجم بين قيمة العقدة الحالية و<code>num</code>، حتى تتجاوز عقدة ورقة (يصل الاجتياز إلى <code>None</code>) ثم اخرج من الحلقة.</li>
<li><strong>أدرج العقدة عند ذلك الموضع</strong>: أنشئ عقدة لـ<code>num</code> وضعها عند موضع <code>None</code>.</li>
</ol>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_tree--bst_insert.png" alt="إدراج عقدة في شجرة البحث الثنائية"></p>
<p>وفي تنفيذ الشيفرة، لاحظ النقطتين التاليتين:</p>
<ul>
<li>لا تسمح أشجار البحث الثنائية بعقد مكررة؛ وإلا لما عادت الشجرة تستوفي تعريفها. لذلك، إذا كانت العقدة المطلوب إدراجها موجودة بالفعل في الشجرة، يُتخطى الإدراج وتعود الدالة مباشرة.</li>
<li>لتنفيذ إدراج العقدة، يلزمنا استخدام العقدة <code>pre</code> لحفظ العقدة من الجولة السابقة. وبهذه الطريقة، عندما نصل في الاجتياز إلى <code>None</code>، يمكننا الحصول على عقدتها الأب، وبذلك نكمل عملية إدراج العقدة.</li>
</ul>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* أدرج عقدة */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(bst *binarySearchTree)</span></span> insert(num <span class="hljs-type">int</span>) {
	cur := bst.root
	<span class="hljs-comment">// إذا كانت الشجرة فارغة، هيّئ العقدة الجذرية</span>
	<span class="hljs-keyword">if</span> cur == <span class="hljs-literal">nil</span> {
		bst.root = NewTreeNode(num)
		<span class="hljs-keyword">return</span>
	}
	<span class="hljs-comment">// موضع العقدة السابقة للعقدة المطلوب إدراجها</span>
	<span class="hljs-keyword">var</span> pre *TreeNode = <span class="hljs-literal">nil</span>
	<span class="hljs-comment">// البحث بحلقة، واخرج بعد تجاوز عقدة ورقة</span>
	<span class="hljs-keyword">for</span> cur != <span class="hljs-literal">nil</span> {
		<span class="hljs-keyword">if</span> cur.Val == num {
			<span class="hljs-keyword">return</span>
		}
		pre = cur
		<span class="hljs-keyword">if</span> cur.Val.(<span class="hljs-type">int</span>) &lt; num {
			cur = cur.Right
		} <span class="hljs-keyword">else</span> {
			cur = cur.Left
		}
	}
	<span class="hljs-comment">// أدرج العقدة</span>
	node := NewTreeNode(num)
	<span class="hljs-keyword">if</span> pre.Val.(<span class="hljs-type">int</span>) &lt; num {
		pre.Right = node
	} <span class="hljs-keyword">else</span> {
		pre.Left = node
	}
}
</code></pre>
</div>
<p>وعلى غرار البحث عن عقدة، يستغرق إدراج عقدة زمن <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(\\log n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>.</p>
<h3 id="حذف-عقدة">حذف عقدة</h3>
<p>أولاً، اعثر على العقدة المستهدفة في شجرة البحث الثنائية ثم احذفها. وعلى غرار إدراج العقدة، يلزمنا ضمان بقاء خاصية شجرة البحث الثنائية «الشجرة الفرعية اليسرى <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>&lt;</mo></mrow><annotation encoding="application/x-tex">&lt;</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5782em;vertical-align:-0.0391em;"></span><span class="mrel">&lt;</span></span></span></span> العقدة الجذرية <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>&lt;</mo></mrow><annotation encoding="application/x-tex">&lt;</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5782em;vertical-align:-0.0391em;"></span><span class="mrel">&lt;</span></span></span></span> الشجرة الفرعية اليمنى» بعد اكتمال عملية الحذف. لذلك، وبحسب عدد العقد الابنة التي تمتلكها العقدة المستهدفة، ننظر في ثلاث حالات: الدرجة <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>0</mn></mrow><annotation encoding="application/x-tex">0</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span>، والدرجة <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>1</mn></mrow><annotation encoding="application/x-tex">1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span>، والدرجة <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>2</mn></mrow><annotation encoding="application/x-tex">2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">2</span></span></span></span>، وننفّذ عملية الحذف المقابلة.</p>
<p>وكما يوضح الشكل أدناه، عندما تكون درجة العقدة المطلوب حذفها <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>0</mn></mrow><annotation encoding="application/x-tex">0</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0</span></span></span></span>، فهذا يعني أنها عقدة ورقة ويمكن حذفها مباشرة.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_tree--bst_remove_case1.png" alt="حذف عقدة في شجرة البحث الثنائية (الدرجة 0)"></p>
<p>وكما يوضح الشكل أدناه، عندما تكون درجة العقدة المطلوب حذفها <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>1</mn></mrow><annotation encoding="application/x-tex">1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span>، يكفي استبدال العقدة المطلوب حذفها بعقدتها الابنة.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_tree--bst_remove_case2.png" alt="حذف عقدة في شجرة البحث الثنائية (الدرجة 1)"></p>
<p>وعندما تكون درجة العقدة المطلوب حذفها <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>2</mn></mrow><annotation encoding="application/x-tex">2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">2</span></span></span></span>، لا يمكن حذفها مباشرة؛ بل يلزمنا استخدام عقدة لاستبدالها. وللحفاظ على خاصية شجرة البحث الثنائية «الشجرة الفرعية اليسرى <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>&lt;</mo></mrow><annotation encoding="application/x-tex">&lt;</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5782em;vertical-align:-0.0391em;"></span><span class="mrel">&lt;</span></span></span></span> العقدة الجذرية <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>&lt;</mo></mrow><annotation encoding="application/x-tex">&lt;</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5782em;vertical-align:-0.0391em;"></span><span class="mrel">&lt;</span></span></span></span> الشجرة الفرعية اليمنى»، <strong>يمكن أن تكون هذه العقدة إما أصغر عقدة في الشجرة الفرعية اليمنى وإما أكبر عقدة في الشجرة الفرعية اليسرى</strong>.</p>
<p>وبافتراض أننا نختار أصغر عقدة في الشجرة الفرعية اليمنى، أي خَلَفها في الاجتياز الوسطي، تكون عملية الحذف كما يوضح الشكل أدناه.</p>
<ol>
<li>اعثر على العقدة التالية للعقدة المطلوب حذفها في «متتالية الاجتياز الوسطي»، وارمز إليها بـ<code>tmp</code>.</li>
<li>استبدل قيمة العقدة المطلوب حذفها بقيمة <code>tmp</code>، واحذف العقدة <code>tmp</code> تعاودياً في الشجرة.</li>
</ol>
<p>وتستغرق عملية حذف العقدة أيضاً زمن <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(\\log n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>، حيث يتطلب العثور على العقدة المطلوب حذفها زمن <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(\\log n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>، ويتطلب الحصول على عقدة الخَلَف في الاجتياز الوسطي زمن <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(\\log n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>. وشيفرة المثال كما يلي:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* احذف عقدة */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(bst *binarySearchTree)</span></span> remove(num <span class="hljs-type">int</span>) {
	cur := bst.root
	<span class="hljs-comment">// إذا كانت الشجرة فارغة، عُد مباشرة</span>
	<span class="hljs-keyword">if</span> cur == <span class="hljs-literal">nil</span> {
		<span class="hljs-keyword">return</span>
	}
	<span class="hljs-comment">// موضع العقدة السابقة للعقدة المطلوب حذفها</span>
	<span class="hljs-keyword">var</span> pre *TreeNode = <span class="hljs-literal">nil</span>
	<span class="hljs-comment">// البحث بحلقة، واخرج بعد تجاوز عقدة ورقة</span>
	<span class="hljs-keyword">for</span> cur != <span class="hljs-literal">nil</span> {
		<span class="hljs-keyword">if</span> cur.Val == num {
			<span class="hljs-keyword">break</span>
		}
		pre = cur
		<span class="hljs-keyword">if</span> cur.Val.(<span class="hljs-type">int</span>) &lt; num {
			<span class="hljs-comment">// العقدة المطلوب حذفها في الشجرة الفرعية اليمنى</span>
			cur = cur.Right
		} <span class="hljs-keyword">else</span> {
			<span class="hljs-comment">// العقدة المطلوب حذفها في الشجرة الفرعية اليسرى</span>
			cur = cur.Left
		}
	}
	<span class="hljs-comment">// إذا لم توجد عقدة للحذف، عُد مباشرة</span>
	<span class="hljs-keyword">if</span> cur == <span class="hljs-literal">nil</span> {
		<span class="hljs-keyword">return</span>
	}
	<span class="hljs-comment">// عدد العقد الابنة 0 أو 1</span>
	<span class="hljs-keyword">if</span> cur.Left == <span class="hljs-literal">nil</span> || cur.Right == <span class="hljs-literal">nil</span> {
		<span class="hljs-keyword">var</span> child *TreeNode = <span class="hljs-literal">nil</span>
		<span class="hljs-comment">// احصل على العقدة الابنة للعقدة المطلوب حذفها</span>
		<span class="hljs-keyword">if</span> cur.Left != <span class="hljs-literal">nil</span> {
			child = cur.Left
		} <span class="hljs-keyword">else</span> {
			child = cur.Right
		}
		<span class="hljs-comment">// احذف العقدة cur</span>
		<span class="hljs-keyword">if</span> cur != bst.root {
			<span class="hljs-keyword">if</span> pre.Left == cur {
				pre.Left = child
			} <span class="hljs-keyword">else</span> {
				pre.Right = child
			}
		} <span class="hljs-keyword">else</span> {
			<span class="hljs-comment">// إذا كانت العقدة المحذوفة هي العقدة الجذرية، أعد إسناد العقدة الجذرية</span>
			bst.root = child
		}
		<span class="hljs-comment">// عدد العقد الابنة 2</span>
	} <span class="hljs-keyword">else</span> {
		<span class="hljs-comment">// احصل على العقدة التالية للعقدة cur المطلوب حذفها في الاجتياز الوسطي</span>
		tmp := cur.Right
		<span class="hljs-keyword">for</span> tmp.Left != <span class="hljs-literal">nil</span> {
			tmp = tmp.Left
		}
		<span class="hljs-comment">// احذف العقدة tmp تعاودياً</span>
		bst.remove(tmp.Val.(<span class="hljs-type">int</span>))
		<span class="hljs-comment">// استبدل cur بـtmp</span>
		cur.Val = tmp.Val
	}
}
</code></pre>
</div>
<h3 id="الاجتياز-الوسطي-مرتب">الاجتياز الوسطي مرتّب</h3>
<p>كما يوضح الشكل أدناه، يتبع الاجتياز الوسطي للشجرة الثنائية ترتيب الاجتياز «يسار <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>→</mo></mrow><annotation encoding="application/x-tex">\\rightarrow</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.3669em;"></span><span class="mrel">→</span></span></span></span> جذر <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>→</mo></mrow><annotation encoding="application/x-tex">\\rightarrow</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.3669em;"></span><span class="mrel">→</span></span></span></span> يمين»، بينما تستوفي شجرة البحث الثنائية علاقة الحجم «العقدة الابنة اليسرى <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>&lt;</mo></mrow><annotation encoding="application/x-tex">&lt;</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5782em;vertical-align:-0.0391em;"></span><span class="mrel">&lt;</span></span></span></span> العقدة الجذرية <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>&lt;</mo></mrow><annotation encoding="application/x-tex">&lt;</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.5782em;vertical-align:-0.0391em;"></span><span class="mrel">&lt;</span></span></span></span> العقدة الابنة اليمنى».</p>
<p>وهذا يعني أنه عند إجراء اجتياز وسطي في شجرة بحث ثنائية، تُجتاز العقدة الأصغر التالية دائماً أولاً، لنحصل من ذلك على خاصية مهمة: <strong>متتالية الاجتياز الوسطي لشجرة البحث الثنائية تصاعدية</strong>.</p>
<p>وباستخدام خاصية أن الاجتياز الوسطي تصاعدي، يمكننا الحصول على بيانات مرتبة في شجرة بحث ثنائية في زمن <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span> فقط، دون الحاجة إلى عمليات ترتيب إضافية، وهو أمر عالي الكفاءة.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_tree--bst_inorder_traversal.png" alt="متتالية الاجتياز الوسطي لشجرة البحث الثنائية"></p>
<h2 id="كفاءة-أشجار-البحث-الثنائية">كفاءة أشجار البحث الثنائية</h2>
<p>بمعطى مجموعة بيانات، ننظر في استخدام مصفوفة أو شجرة بحث ثنائية لتخزينها. وبمراقبة الجدول أدناه، فإن جميع العمليات في شجرة البحث الثنائية ذات تعقيد زمني لوغاريتمي، مما يوفر أداءً مستقراً وفعّالاً. ولا تكون المصفوفات أكثر كفاءة من أشجار البحث الثنائية إلا في السيناريوهات التي تكثر فيها الإضافة وتقلّ فيها عمليات البحث والحذف.</p>
<p align="center"> جدول <id> &nbsp; مقارنة الكفاءة بين المصفوفات وأشجار البحث </p>
<table>
<thead>
<tr>
<th></th>
<th>المصفوفة غير المرتبة</th>
<th>شجرة البحث الثنائية</th>
</tr>
</thead>
<tbody>
<tr>
<td>البحث عن عنصر</td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(\\log n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td>إدراج عنصر</td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(\\log n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td>حذف عنصر</td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(\\log n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
</tbody>
</table>
<p>في الحالة المثالية، تكون شجرة البحث الثنائية متوازنة، لذا يمكن العثور على أي عقدة خلال <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(\\log n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span> من تكرارات الحلقة.</p>
<p>غير أننا إذا أدرجنا العقد وحذفناها باستمرار في شجرة بحث ثنائية، فقد تتدهور إلى قائمة مترابطة كما يوضح الشكل أدناه، حيث يتدهور التعقيد الزمني لمختلف العمليات أيضاً إلى <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_tree--bst_degradation.png" alt="تدهور شجرة البحث الثنائية"></p>
<h2 id="التطبيقات-الشائعة-لأشجار-البحث-الثنائية">التطبيقات الشائعة لأشجار البحث الثنائية</h2>
<ul>
<li>تُستخدم كفهارس متعددة المستويات في الأنظمة لتنفيذ عمليات بحث وإدراج وحذف فعّالة.</li>
<li>تعمل كبنية بيانات أساسية لبعض خوارزميات البحث.</li>
<li>تُستخدم لتخزين تدفقات البيانات للحفاظ على حالتها المرتّبة.</li>
</ul>
`,m={book:a,chapter:s,chapterTitle:n,slug:t,title:e,headings:l,html:p};export{a as book,s as chapter,n as chapterTitle,m as default,l as headings,p as html,t as slug,e as title};
