const s="hello-algo",n="chapter_greedy",a="الخوارزميات الجشعة",l="max_product_cutting_problem",p="مسألة القطع بأقصى حاصل ضرب",t=[{depth:3,id:"تحديد-الاستراتيجية-الجشعة",text:"تحديد الاستراتيجية الجشعة"},{depth:3,id:"تنفيذ-الشيفرة",text:"تنفيذ الشيفرة"},{depth:3,id:"إثبات-الصحة",text:"إثبات الصحة"}],e=`<div class="note">
<p>بمعطى عدد صحيح موجب $n$، قطّعه إلى مجموع عددين صحيحين موجبين على الأقل، وأوجد أكبر حاصل ضرب للأعداد الناتجة، كما يوضح الشكل أدناه.</p>
</div>
<p><img src="/images/hello-algo/chapter_greedy--max_product_cutting_definition.png" alt="تعريف مسألة القطع بأقصى حاصل ضرب"></p>
<p>لنفترض أننا قطّعنا $n$ إلى $m$ من العوامل الصحيحة، حيث يُرمز إلى العامل رقم $i$ بـ$n_i$، أي</p>
<p>$$
n = \\sum_{i=1}^{m}n_i
$$</p>
<p>هدف هذه المسألة هو إيجاد أكبر حاصل ضرب لجميع العوامل الصحيحة، أي</p>
<p>$$
\\max(\\prod_{i=1}^{m}n_i)
$$</p>
<p>نحتاج إلى تحديد عدد الأجزاء $m$ وما ينبغي أن تكون عليه كل $n_i$.</p>
<h3 id="تحديد-الاستراتيجية-الجشعة">تحديد الاستراتيجية الجشعة</h3>
<p>كقاعدة عامة، كثيراً ما يكون حاصل ضرب عددين أكبر من مجموعهما. لنفترض أننا قطعنا عاملاً قدره $2$ من $n$؛ فيكون حاصل الضرب الناتج $2(n-2)$. ولنقارن هذا الحاصل مع $n$:</p>
<p>$$
\\begin{aligned}
2(n-2) &amp; \\geq n \\newline
2n - n - 4 &amp; \\geq 0 \\newline
n &amp; \\geq 4
\\end{aligned}
$$</p>
<p>كما يوضح الشكل أدناه، عندما $n \\geq 4$، فإن اقتطاع $2$ سيزيد حاصل الضرب، <strong>وهذا يدل على أن الأعداد الصحيحة الأكبر من أو التي تساوي $4$ ينبغي أن تُقطَّع جميعها</strong>.</p>
<p><strong>الاستراتيجية الجشعة الأولى</strong>: إذا احتوى مخطط القطع على عامل $\\geq 4$، فينبغي تقطيعه أكثر. ويجب ألا يحتوي مخطط القطع النهائي إلا على العوامل $1$ و$2$ و$3$.</p>
<p><img src="/images/hello-algo/chapter_greedy--max_product_cutting_greedy_infer1.png" alt="القطع يؤدي إلى زيادة حاصل الضرب"></p>
<p>بعد ذلك، لننظر في أي عامل هو الأفضل. بين العوامل الثلاثة $1$ و$2$ و$3$، من الواضح أن $1$ هو الأسوأ، لأن $1 \\times (n-1) &lt; n$ يظل صحيحاً دائماً، أي أن اقتطاع $1$ سيقلل حاصل الضرب فعلاً.</p>
<p>كما يوضح الشكل أدناه، عندما $n = 6$، لدينا $3 \\times 3 &gt; 2 \\times 2 \\times 2$. <strong>وهذا يعني أن اقتطاع $3$ أفضل من اقتطاع $2$</strong>.</p>
<p><strong>الاستراتيجية الجشعة الثانية</strong>: ينبغي ألا يحتوي مخطط القطع على أكثر من عاملي $2$، لأن ثلاثة عوامل من $2$ يمكن دائماً استبدالها بعاملين من $3$ للحصول على حاصل ضرب أكبر.</p>
<p><img src="/images/hello-algo/chapter_greedy--max_product_cutting_greedy_infer2.png" alt="عامل القطع الأمثل"></p>
<p>وخلاصة القول، يمكن اشتقاق الاستراتيجيات الجشعة التالية.</p>
<ol>
<li>بمعطى عدد صحيح $n$، اقطع العامل $3$ باستمرار حتى يصبح الباقي $0$ أو $1$ أو $2$.</li>
<li>عندما يكون الباقي $0$، فهذا يعني أن $n$ مضاعف للعدد $3$، فلا حاجة إلى أي إجراء آخر.</li>
<li>عندما يكون الباقي $2$، لا تقطعه أكثر؛ اتركه كما هو.</li>
<li>عندما يكون الباقي $1$، بما أن $2 \\times 2 &gt; 1 \\times 3$، استبدل آخر $3$ والباقي $1$ بعاملين من $2$.</li>
</ol>
<h3 id="تنفيذ-الشيفرة">تنفيذ الشيفرة</h3>
<p>كما يوضح الشكل أدناه، لا نحتاج إلى حلقات لتقطيع العدد. بل نستخدم القسمة الصحيحة للحصول على عدد العوامل $3$، ويُرمز إليه بـ$a$، ونستخدم عملية باقي القسمة للحصول على الباقي $b$، فنحصل على:</p>
<p>$$
n = 3 a + b
$$</p>
<p>يرجى ملاحظة أنه في الحالة الحدية $n \\leq 3$، يجب اقتطاع $1$، ليكون حاصل الضرب $1 \\times (n - 1)$.</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* مسألة القطع بأقصى حاصل ضرب: خوارزمية جشعة */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">maxProductCutting</span><span class="hljs-params">(n <span class="hljs-type">int</span>)</span></span> <span class="hljs-type">int</span> {
	<span class="hljs-comment">// عندما n &lt;= 3، يجب قطع 1</span>
	<span class="hljs-keyword">if</span> n &lt;= <span class="hljs-number">3</span> {
		<span class="hljs-keyword">return</span> <span class="hljs-number">1</span> * (n - <span class="hljs-number">1</span>)
	}
	<span class="hljs-comment">// اقطع 3 جشعاً، a هو عدد العوامل 3 وb هو الباقي</span>
	a := n / <span class="hljs-number">3</span>
	b := n % <span class="hljs-number">3</span>
	<span class="hljs-keyword">if</span> b == <span class="hljs-number">1</span> {
		<span class="hljs-comment">// عندما يكون الباقي 1، حوّل الزوج 1 * 3 إلى 2 * 2</span>
		<span class="hljs-keyword">return</span> <span class="hljs-type">int</span>(math.Pow(<span class="hljs-number">3</span>, <span class="hljs-type">float64</span>(a<span class="hljs-number">-1</span>))) * <span class="hljs-number">2</span> * <span class="hljs-number">2</span>
	}
	<span class="hljs-keyword">if</span> b == <span class="hljs-number">2</span> {
		<span class="hljs-comment">// عندما يكون الباقي 2، لا تفعل شيئاً</span>
		<span class="hljs-keyword">return</span> <span class="hljs-type">int</span>(math.Pow(<span class="hljs-number">3</span>, <span class="hljs-type">float64</span>(a))) * <span class="hljs-number">2</span>
	}
	<span class="hljs-comment">// عندما يكون الباقي 0، لا تفعل شيئاً</span>
	<span class="hljs-keyword">return</span> <span class="hljs-type">int</span>(math.Pow(<span class="hljs-number">3</span>, <span class="hljs-type">float64</span>(a)))
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* مسألة القطع بأقصى حاصل ضرب: خوارزمية جشعة */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">maxProductCutting</span>(<span class="hljs-params"><span class="hljs-attr">n</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">number</span> {
    <span class="hljs-comment">// عندما n &lt;= 3، يجب قطع 1</span>
    <span class="hljs-keyword">if</span> (n &lt;= <span class="hljs-number">3</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span> * (n - <span class="hljs-number">1</span>);
    }
    <span class="hljs-comment">// اقطع 3 جشعاً، a هو عدد العوامل 3 وb هو الباقي</span>
    <span class="hljs-keyword">let</span> <span class="hljs-attr">a</span>: <span class="hljs-built_in">number</span> = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(n / <span class="hljs-number">3</span>);
    <span class="hljs-keyword">let</span> <span class="hljs-attr">b</span>: <span class="hljs-built_in">number</span> = n % <span class="hljs-number">3</span>;
    <span class="hljs-keyword">if</span> (b === <span class="hljs-number">1</span>) {
        <span class="hljs-comment">// عندما يكون الباقي 1، حوّل الزوج 1 * 3 إلى 2 * 2</span>
        <span class="hljs-keyword">return</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">pow</span>(<span class="hljs-number">3</span>, a - <span class="hljs-number">1</span>) * <span class="hljs-number">2</span> * <span class="hljs-number">2</span>;
    }
    <span class="hljs-keyword">if</span> (b === <span class="hljs-number">2</span>) {
        <span class="hljs-comment">// عندما يكون الباقي 2، لا تفعل شيئاً</span>
        <span class="hljs-keyword">return</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">pow</span>(<span class="hljs-number">3</span>, a) * <span class="hljs-number">2</span>;
    }
    <span class="hljs-comment">// عندما يكون الباقي 0، لا تفعل شيئاً</span>
    <span class="hljs-keyword">return</span> <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">pow</span>(<span class="hljs-number">3</span>, a);
}
</code></pre>
</div>
<p><img src="/images/hello-algo/chapter_greedy--max_product_cutting_greedy_calculation.png" alt="طريقة حساب مسألة القطع بأقصى حاصل ضرب"></p>
<p><strong>يعتمد التعقيد الزمني على كيفية تنفيذ الرفع إلى قوة في لغة البرمجة</strong>. وباتخاذ Python مثالاً، توجد ثلاث طرق شائعة لحساب القوى.</p>
<ul>
<li>لكل من المعامل <code>**</code> والدالة <code>pow()</code> تعقيد زمني $O(\\log⁡ a)$.</li>
<li>تستدعي الدالة <code>math.pow()</code> داخلياً الدالة <code>pow()</code> من مكتبة C، وهي تنفذ الرفع إلى قوة للأعداد العائمة، بتعقيد زمني $O(1)$.</li>
</ul>
<p>يستخدم المتغيران $a$ و$b$ مقداراً ثابتاً من المساحة الإضافية، <strong>لذا يكون التعقيد المكاني $O(1)$</strong>.</p>
<h3 id="إثبات-الصحة">إثبات الصحة</h3>
<p>نستخدم البرهان بالتناقض، وننظر في الحالة $n \\geq 4$ فقط.</p>
<ol>
<li><strong>جميع العوامل $\\leq 3$</strong>: لنفترض أن مخطط القطع الأمثل يتضمن عاملاً $x \\geq 4$. فيمكن تقطيعه أكثر إلى $2(x-2)$ للحصول على حاصل ضرب أكبر (أو مساوٍ). وهذا يناقض الافتراض.</li>
<li><strong>مخطط القطع لا يحتوي على $1$</strong>: لنفترض أن مخطط القطع الأمثل يتضمن عاملاً قدره $1$. فيمكن دمجه في عامل آخر للحصول على حاصل ضرب أكبر. وهذا يناقض الافتراض.</li>
<li><strong>مخطط القطع يحتوي على عاملي $2$ على الأكثر</strong>: لنفترض أن مخطط القطع الأمثل يتضمن ثلاثة عوامل من $2$. فيمكن استبدالها بعاملين من $3$، للحصول على حاصل ضرب أكبر. وهذا يناقض الافتراض.</li>
</ol>
`,c={book:s,chapter:n,chapterTitle:a,slug:l,title:p,headings:t,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
