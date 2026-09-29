const s="hello-algo",a="chapter_searching",n="البحث",t="binary_search_edge",e="حدود البحث الثنائي",l=[{depth:2,id:"إيجاد-الحد-الأيسر",text:"إيجاد الحد الأيسر"},{depth:2,id:"إيجاد-الحد-الأيمن",text:"إيجاد الحد الأيمن"},{depth:3,id:"إعادة-استخدام-بحث-الحد-الأيسر",text:"إعادة استخدام بحث الحد الأيسر"},{depth:3,id:"التحويل-إلى-بحث-عنصر",text:"التحويل إلى بحث عنصر"}],p=`<h2 id="إيجاد-الحد-الأيسر">إيجاد الحد الأيسر</h2>
<div class="note">
<p>بمعطى مصفوفة مرتبة <code>nums</code> طولها <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> قد تحتوي على عناصر مكررة، أعد فهرس أول ظهور لـ<code>target</code> من جهة اليسار. وإذا لم تحتوِ المصفوفة على <code>target</code>، فأعد <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">−</span><span class="mord">1</span></span></span></span>.</p>
</div>
<p>تذكّر طريقة إيجاد نقطة الإدراج بالبحث الثنائي. بعد انتهاء البحث، يشير <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6595em;"></span><span class="mord mathnormal">i</span></span></span></span> إلى <code>target</code> الأقرب إلى أقصى اليسار، <strong>لذا فإن إيجاد نقطة الإدراج هو في جوهره إيجاد فهرس <code>target</code> الأقرب إلى أقصى اليسار</strong>.</p>
<p>فكّر في تنفيذ بحث الحد الأيسر باستخدام دالة إيجاد نقطة الإدراج. لاحظ أن المصفوفة قد لا تحتوي على <code>target</code>، وهو ما قد يؤدي إلى الحالتين التاليتين:</p>
<ul>
<li>فهرس نقطة الإدراج <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6595em;"></span><span class="mord mathnormal">i</span></span></span></span> يتجاوز حدود المصفوفة.</li>
<li>العنصر <code>nums[i]</code> لا يساوي <code>target</code>.</li>
</ul>
<p>عند حدوث أي من هاتين الحالتين، يكفي إعادة <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7278em;vertical-align:-0.0833em;"></span><span class="mord">−</span><span class="mord">1</span></span></span></span>. وتظهر الشيفرة أدناه:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* البحث الثنائي عن target الأقرب إلى أقصى اليسار */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">binarySearchLeftEdge</span><span class="hljs-params">(nums []<span class="hljs-type">int</span>, target <span class="hljs-type">int</span>)</span></span> <span class="hljs-type">int</span> {
	<span class="hljs-comment">// يكافئ إيجاد نقطة إدراج target</span>
	i := binarySearchInsertion(nums, target)
	<span class="hljs-comment">// لم يُعثر على target، أعد -1</span>
	<span class="hljs-keyword">if</span> i == <span class="hljs-built_in">len</span>(nums) || nums[i] != target {
		<span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>
	}
	<span class="hljs-comment">// عُثر على target، أعد الفهرس i</span>
	<span class="hljs-keyword">return</span> i
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* البحث الثنائي عن target الأقرب إلى أقصى اليسار */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">binarySearchLeftEdge</span>(<span class="hljs-params"><span class="hljs-attr">nums</span>: <span class="hljs-title class_">Array</span>&lt;<span class="hljs-built_in">number</span>&gt;, <span class="hljs-attr">target</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">number</span> {
    <span class="hljs-comment">// يكافئ إيجاد نقطة إدراج target</span>
    <span class="hljs-keyword">const</span> i = <span class="hljs-title function_">binarySearchInsertion</span>(nums, target);
    <span class="hljs-comment">// لم يُعثر على target، أعد -1</span>
    <span class="hljs-keyword">if</span> (i === nums.<span class="hljs-property">length</span> || nums[i] !== target) {
        <span class="hljs-keyword">return</span> -<span class="hljs-number">1</span>;
    }
    <span class="hljs-comment">// عُثر على target، أعد الفهرس i</span>
    <span class="hljs-keyword">return</span> i;
}
</code></pre>
</div>
<h2 id="إيجاد-الحد-الأيمن">إيجاد الحد الأيمن</h2>
<p>فكيف نجد <code>target</code> الأقرب إلى أقصى اليمين؟ الطريقة الأكثر مباشرة هي تعديل الشيفرة واستبدال عملية تقليص المؤشر في حالة <code>nums[m] == target</code>. ونحذف الشيفرة هنا؛ ويمكن للقارئ المهتم تنفيذها بنفسه.</p>
<p>نستعرض أدناه طريقتين أكثر براعة.</p>
<h3 id="إعادة-استخدام-بحث-الحد-الأيسر">إعادة استخدام بحث الحد الأيسر</h3>
<p>في الواقع، يمكننا استخدام دالة إيجاد <code>target</code> الأقرب إلى أقصى اليسار لإيجاد <code>target</code> الأقرب إلى أقصى اليمين. والطريقة المحددة هي: <strong>تحويل إيجاد <code>target</code> الأقرب إلى أقصى اليمين إلى إيجاد <code>target + 1</code> الأقرب إلى أقصى اليسار</strong>.</p>
<p>كما يوضح الشكل أدناه، بعد انتهاء البحث يشير المؤشر <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6595em;"></span><span class="mord mathnormal">i</span></span></span></span> إلى <code>target + 1</code> الأقرب إلى أقصى اليسار (إن وُجد)، بينما يشير <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.854em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.0572em;">j</span></span></span></span> إلى <code>target</code> الأقرب إلى أقصى اليمين، <strong>لذا يمكننا إعادة <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.854em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.0572em;">j</span></span></span></span></strong>.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_searching--binary_search_right_edge_by_left_edge.png" alt="تحويل بحث الحد الأيمن إلى بحث الحد الأيسر"></p>
<p>لاحظ أن نقطة الإدراج المُعادة هي <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6595em;"></span><span class="mord mathnormal">i</span></span></span></span>، لذا يلزم إنقاص <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span> منها للحصول على <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.854em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.0572em;">j</span></span></span></span>:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* البحث الثنائي عن target الأقرب إلى أقصى اليمين */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">binarySearchRightEdge</span><span class="hljs-params">(nums []<span class="hljs-type">int</span>, target <span class="hljs-type">int</span>)</span></span> <span class="hljs-type">int</span> {
	<span class="hljs-comment">// حوّل المسألة إلى إيجاد target + 1 الأقرب إلى أقصى اليسار</span>
	i := binarySearchInsertion(nums, target+<span class="hljs-number">1</span>)
	<span class="hljs-comment">// يشير j إلى target الأقرب إلى أقصى اليمين، ويشير i إلى أول عنصر أكبر من target</span>
	j := i - <span class="hljs-number">1</span>
	<span class="hljs-comment">// لم يُعثر على target، أعد -1</span>
	<span class="hljs-keyword">if</span> j == <span class="hljs-number">-1</span> || nums[j] != target {
		<span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>
	}
	<span class="hljs-comment">// عُثر على target، أعد الفهرس j</span>
	<span class="hljs-keyword">return</span> j
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* البحث الثنائي عن target الأقرب إلى أقصى اليمين */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">binarySearchRightEdge</span>(<span class="hljs-params"><span class="hljs-attr">nums</span>: <span class="hljs-title class_">Array</span>&lt;<span class="hljs-built_in">number</span>&gt;, <span class="hljs-attr">target</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">number</span> {
    <span class="hljs-comment">// حوّل المسألة إلى إيجاد target + 1 الأقرب إلى أقصى اليسار</span>
    <span class="hljs-keyword">const</span> i = <span class="hljs-title function_">binarySearchInsertion</span>(nums, target + <span class="hljs-number">1</span>);
    <span class="hljs-comment">// يشير j إلى target الأقرب إلى أقصى اليمين، ويشير i إلى أول عنصر أكبر من target</span>
    <span class="hljs-keyword">const</span> j = i - <span class="hljs-number">1</span>;
    <span class="hljs-comment">// لم يُعثر على target، أعد -1</span>
    <span class="hljs-keyword">if</span> (j === -<span class="hljs-number">1</span> || nums[j] !== target) {
        <span class="hljs-keyword">return</span> -<span class="hljs-number">1</span>;
    }
    <span class="hljs-comment">// عُثر على target، أعد الفهرس j</span>
    <span class="hljs-keyword">return</span> j;
}
</code></pre>
</div>
<h3 id="التحويل-إلى-بحث-عنصر">التحويل إلى بحث عنصر</h3>
<p>نعلم أنه عندما لا تحتوي المصفوفة على <code>target</code>، سيشير <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6595em;"></span><span class="mord mathnormal">i</span></span></span></span> و<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.854em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.0572em;">j</span></span></span></span> في النهاية إلى أول عنصر أكبر من <code>target</code> والعنصر الأقصى يميناً الأصغر من <code>target</code> على الترتيب.</p>
<p>لذلك، وكما يوضح الشكل أدناه، يمكننا إنشاء عنصر غير موجود في المصفوفة لإيجاد الحدين الأيسر والأيمن.</p>
<ul>
<li>إيجاد <code>target</code> الأقرب إلى أقصى اليسار: يمكن تحويله إلى إيجاد <code>target - 0.5</code> وإعادة المؤشر <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6595em;"></span><span class="mord mathnormal">i</span></span></span></span>.</li>
<li>إيجاد <code>target</code> الأقرب إلى أقصى اليمين: يمكن تحويله إلى إيجاد <code>target + 0.5</code> وإعادة المؤشر <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.854em;vertical-align:-0.1944em;"></span><span class="mord mathnormal" style="margin-right:0.0572em;">j</span></span></span></span>.</li>
</ul>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_searching--binary_search_edge_by_element.png" alt="تحويل بحث الحدود إلى بحث عنصر"></p>
<p>نحذف الشيفرة هنا، لكن تجدر الإشارة إلى النقطتين التاليتين:</p>
<ul>
<li>بما أن المصفوفة المعطاة لا تحتوي على قيم عشرية، فلا حاجة إلى القلق بشأن كيفية التعامل مع التساوي.</li>
<li>لأن هذه الطريقة تُدخل أعداداً عشرية، يلزم تغيير المتغير <code>target</code> في الدالة إلى نوع الفاصلة العائمة (ولا يحتاج Python إلى هذا التغيير).</li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:t,title:e,headings:l,html:p};export{s as book,a as chapter,n as chapterTitle,c as default,l as headings,p as html,t as slug,e as title};
