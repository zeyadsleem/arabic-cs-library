const s="hello-algo",a="chapter_greedy",n="الخوارزميات الجشعة",l="fractional_knapsack_problem",p="مسألة الحقيبة الكسرية",t=[{depth:3,id:"تحديد-الاستراتيجية-الجشعة",text:"تحديد الاستراتيجية الجشعة"},{depth:3,id:"تنفيذ-الشيفرة",text:"تنفيذ الشيفرة"},{depth:3,id:"إثبات-الصحة",text:"إثبات الصحة"}],e=`<div class="note">
<p>بمعطى $n$ من العناصر، حيث وزن العنصر $i$ هو $wgt[i-1]$ وقيمته $val[i-1]$، وحقيبة سعتها $cap$. يمكن اختيار كل عنصر مرة واحدة فقط، <strong>لكن يجوز اختيار جزء من العنصر، وتكون قيمته متناسبة مع الوزن المختار</strong>. ما أقصى قيمة إجمالية يمكن وضعها في الحقيبة في حدود السعة؟ ويوضح الشكل أدناه مثالاً على ذلك.</p>
</div>
<p><img src="/images/hello-algo/chapter_greedy--fractional_knapsack_example.png" alt="بيانات مثال لمسألة الحقيبة الكسرية"></p>
<p>تتشابه مسألة الحقيبة الكسرية إجمالاً كثيراً مع مسألة حقيبة 0-1، حيث تتضمن الحالات العنصر الحالي $i$ والسعة $c$، والهدف هو تعظيم القيمة في حدود سعة الحقيبة المحدودة.</p>
<p>الفرق أن هذه المسألة تسمح باختيار جزء من العنصر فقط. وكما يوضح الشكل أدناه، <strong>يمكننا تجزئة العنصر كيفما شئنا وحساب قيمته بالتناسب مع الوزن المختار</strong>.</p>
<ol>
<li>بالنسبة إلى العنصر $i$، قيمته لكل وحدة وزن هي $val[i-1] / wgt[i-1]$، وتسمى القيمة الوحدية.</li>
<li>لنفترض أننا وضعنا في الحقيبة جزءاً من العنصر $i$ وزنه $w$، فإن القيمة المضافة إلى الحقيبة هي $w \\times val[i-1] / wgt[i-1]$.</li>
</ol>
<p><img src="/images/hello-algo/chapter_greedy--fractional_knapsack_unit_value.png" alt="قيمة العناصر لكل وحدة وزن"></p>
<h3 id="تحديد-الاستراتيجية-الجشعة">تحديد الاستراتيجية الجشعة</h3>
<p>إن تعظيم القيمة الإجمالية في الحقيبة <strong>يعني جوهرياً إعطاء الأولوية للعناصر ذات القيمة الأعلى لكل وحدة وزن</strong>. ومن هذه الملاحظة يمكننا استخلاص الاستراتيجية الجشعة الموضحة في الشكل أدناه.</p>
<ol>
<li>رتّب العناصر حسب القيمة الوحدية من الأعلى إلى الأدنى.</li>
<li>اجتَز جميع العناصر، <strong>واختر جشعاً في كل جولة العنصر ذا القيمة الوحدية الأعلى</strong>.</li>
<li>إذا لم تكفِ سعة الحقيبة المتبقية، فاستخدم جزءاً من العنصر الحالي لملء الحقيبة.</li>
</ol>
<p><img src="/images/hello-algo/chapter_greedy--fractional_knapsack_greedy_strategy.png" alt="الاستراتيجية الجشعة لمسألة الحقيبة الكسرية"></p>
<h3 id="تنفيذ-الشيفرة">تنفيذ الشيفرة</h3>
<p>نعرّف صنف <code>Item</code> بحيث يمكن ترتيب العناصر حسب القيمة الوحدية. ثم نجتاز العناصر المرتبة جشعاً، ونتوقف بمجرد امتلاء الحقيبة ونعيد النتيجة:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* الحقيبة الكسرية: خوارزمية جشعة */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">fractionalKnapsack</span><span class="hljs-params">(wgt []<span class="hljs-type">int</span>, val []<span class="hljs-type">int</span>, <span class="hljs-built_in">cap</span> <span class="hljs-type">int</span>)</span></span> <span class="hljs-type">float64</span> {
	<span class="hljs-comment">// أنشئ قائمة العناصر بسمتين: الوزن والقيمة</span>
	items := <span class="hljs-built_in">make</span>([]Item, <span class="hljs-built_in">len</span>(wgt))
	<span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">len</span>(wgt); i++ {
		items[i] = Item{wgt[i], val[i]}
	}
	<span class="hljs-comment">// رتّب حسب القيمة الوحدية item.v / item.w من الأعلى إلى الأدنى</span>
	sort.Slice(items, <span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">(i, j <span class="hljs-type">int</span>)</span></span> <span class="hljs-type">bool</span> {
		<span class="hljs-keyword">return</span> <span class="hljs-type">float64</span>(items[i].v)/<span class="hljs-type">float64</span>(items[i].w) &gt; <span class="hljs-type">float64</span>(items[j].v)/<span class="hljs-type">float64</span>(items[j].w)
	})
	<span class="hljs-comment">// حلقة الاختيار الجشع</span>
	res := <span class="hljs-number">0.0</span>
	<span class="hljs-keyword">for</span> _, item := <span class="hljs-keyword">range</span> items {
		<span class="hljs-keyword">if</span> item.w &lt;= <span class="hljs-built_in">cap</span> {
			<span class="hljs-comment">// إذا كانت السعة المتبقية كافية، ضع العنصر الحالي كاملاً في الحقيبة</span>
			res += <span class="hljs-type">float64</span>(item.v)
			<span class="hljs-built_in">cap</span> -= item.w
		} <span class="hljs-keyword">else</span> {
			<span class="hljs-comment">// إذا لم تكن السعة المتبقية كافية، ضع جزءاً من العنصر الحالي في الحقيبة</span>
			res += <span class="hljs-type">float64</span>(item.v) / <span class="hljs-type">float64</span>(item.w) * <span class="hljs-type">float64</span>(<span class="hljs-built_in">cap</span>)
			<span class="hljs-comment">// لا توجد سعة متبقية، لذا اخرج من الحلقة</span>
			<span class="hljs-keyword">break</span>
		}
	}
	<span class="hljs-keyword">return</span> res
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* الحقيبة الكسرية: خوارزمية جشعة */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">fractionalKnapsack</span>(<span class="hljs-params"><span class="hljs-attr">wgt</span>: <span class="hljs-built_in">number</span>[], <span class="hljs-attr">val</span>: <span class="hljs-built_in">number</span>[], <span class="hljs-attr">cap</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">number</span> {
    <span class="hljs-comment">// أنشئ قائمة العناصر بسمتين: الوزن والقيمة</span>
    <span class="hljs-keyword">const</span> <span class="hljs-attr">items</span>: <span class="hljs-title class_">Item</span>[] = wgt.<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">w, i</span>) =&gt;</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Item</span>(w, val[i]));
    <span class="hljs-comment">// رتّب حسب القيمة الوحدية item.v / item.w من الأعلى إلى الأدنى</span>
    items.<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> b.<span class="hljs-property">v</span> / b.<span class="hljs-property">w</span> - a.<span class="hljs-property">v</span> / a.<span class="hljs-property">w</span>);
    <span class="hljs-comment">// حلقة الاختيار الجشع</span>
    <span class="hljs-keyword">let</span> res = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> item <span class="hljs-keyword">of</span> items) {
        <span class="hljs-keyword">if</span> (item.<span class="hljs-property">w</span> &lt;= cap) {
            <span class="hljs-comment">// إذا كانت السعة المتبقية كافية، ضع العنصر الحالي كاملاً في الحقيبة</span>
            res += item.<span class="hljs-property">v</span>;
            cap -= item.<span class="hljs-property">w</span>;
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// إذا لم تكن السعة المتبقية كافية، ضع جزءاً من العنصر الحالي في الحقيبة</span>
            res += (item.<span class="hljs-property">v</span> / item.<span class="hljs-property">w</span>) * cap;
            <span class="hljs-comment">// لا توجد سعة متبقية، لذا اخرج من الحلقة</span>
            <span class="hljs-keyword">break</span>;
        }
    }
    <span class="hljs-keyword">return</span> res;
}
</code></pre>
</div>
<p>تستغرق خوارزميات الترتيب المدمجة عادةً زمن $O(n \\log n)$، ويكون تعقيدها المكاني عادةً $O(\\log n)$ أو $O(n)$، حسب التنفيذ المحدد للغة البرمجة.</p>
<p>وفيما عدا الترتيب، يجب في أسوأ الحالات اجتياز قائمة العناصر كاملة، <strong>لذا فإن التعقيد الزمني هو $O(n)$</strong>، حيث $n$ عدد العناصر.</p>
<p>وبما أنه تُهيَّأ قائمة من كائنات <code>Item</code>، <strong>فإن التعقيد المكاني هو $O(n)$</strong>.</p>
<h3 id="إثبات-الصحة">إثبات الصحة</h3>
<p>نستخدم البرهان بالتناقض. لنفترض أن العنصر $x$ ذو القيمة الوحدية الأعلى، وأن خوارزمية ما تنتج قيمة مثلى <code>res</code>، لكن الحل الناتج لا يتضمن العنصر $x$.</p>
<p>الآن أزل وحدة وزن واحدة من أي عنصر في الحقيبة، واستبدلها بوحدة وزن واحدة من العنصر $x$. وبما أن العنصر $x$ ذو القيمة الوحدية الأعلى، فلا بد أن تكون القيمة الإجمالية بعد الاستبدال أكبر من <code>res</code>. <strong>وهذا يناقض افتراض أن <code>res</code> مثلى، مما يثبت أن أي حل أمثل لا بد أن يتضمن العنصر $x$</strong>.</p>
<p>ويمكننا بناء التناقض نفسه للعناصر الأخرى في الحل أيضاً. وخلاصة القول، <strong>العناصر ذات القيمة الوحدية الأعلى هي دائماً الخيار الأفضل</strong>، مما يثبت فعالية الاستراتيجية الجشعة.</p>
<p>وكما يوضح الشكل أدناه، إذا اعتبرنا وزن العنصر وقيمته الوحدية المحورين الأفقي والعمودي لمخطط ثنائي الأبعاد، فيمكن النظر إلى مسألة الحقيبة الكسرية على أنها &quot;إيجاد أكبر مساحة محصورة ضمن مجال محدود على المحور الأفقي&quot;. وتساعد هذه المقارنة على تفسير فعالية الاستراتيجية الجشعة من منظور هندسي.</p>
<p><img src="/images/hello-algo/chapter_greedy--fractional_knapsack_area_chart.png" alt="تمثيل هندسي لمسألة الحقيبة الكسرية"></p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
