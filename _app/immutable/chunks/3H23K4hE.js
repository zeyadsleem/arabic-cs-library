const s="hello-algo",n="chapter_greedy",a="الخوارزميات الجشعة",p="max_capacity_problem",l="مسألة السعة القصوى",t=[{depth:3,id:"تحديد-الاستراتيجية-الجشعة",text:"تحديد الاستراتيجية الجشعة"},{depth:3,id:"تنفيذ-الشيفرة",text:"تنفيذ الشيفرة"},{depth:3,id:"برهان-الصحة",text:"برهان الصحة"}],c=`<div class="note">
<p>بمعطى مصفوفة $ht$، يمثّل كل عنصر فيها ارتفاع حاجز عمودي. ويمكن لأي حاجزين في المصفوفة، مع المساحة بينهما، أن يشكّلا حاوية.</p>
<p>تساوي سعة الحاوية حاصل ضرب ارتفاعها في عرضها (أي مساحتها)، حيث يتحدد الارتفاع بالحاجز الأقصر، ويكون العرض الفرق بين فهرسي الحاجزين في المصفوفة.</p>
<p>اختر حاجزين في المصفوفة بحيث تصبح سعة الحاوية الناتجة أقصى ما يمكن، وأعِد تلك السعة القصوى. ويوضح الشكل أدناه مثالاً على ذلك.</p>
</div>
<p><img src="/images/hello-algo/chapter_greedy--max_capacity_example.png" alt="بيانات مثال لمسألة السعة القصوى"></p>
<p>تتكوّن الحاوية من أي حاجزين، <strong>لذا فإن حالة هذه المسألة هي فهرسا الحاجزين، ويرمز إليهما بـ$[i, j]$</strong>.</p>
<p>وفقاً لنص المسألة، تساوي السعة الارتفاع مضروباً في العرض، حيث يتحدد الارتفاع بالحاجز الأقصر، ويكون العرض الفرق بين فهرسي الحاجزين في المصفوفة. ولتكن السعة $cap[i, j]$؛ فنحصل على الصيغة التالية:</p>
<p>$$
cap[i, j] = \\min(ht[i], ht[j]) \\times (j - i)
$$</p>
<p>وليكن طول المصفوفة $n$. عندئذٍ يكون عدد طرق اختيار حاجزين (أي العدد الإجمالي للحالات) $C_n^2 = \\frac{n(n - 1)}{2}$. والطريقة الأكثر مباشرة هي <strong>استنفاد جميع الحالات تعدداً</strong> للعثور على السعة القصوى، ويكون التعقيد الزمني لها $O(n^2)$.</p>
<h3 id="تحديد-الاستراتيجية-الجشعة">تحديد الاستراتيجية الجشعة</h3>
<p>لهذه المسألة حل أكثر كفاءة. وكما هو موضح في الشكل أدناه، خذ حالة $[i, j]$ يكون فيها $i &lt; j$ و$ht[i] &lt; ht[j]$. وفي هذه الحالة يكون $i$ هو الحاجز الأقصر و$j$ هو الحاجز الأطول.</p>
<p><img src="/images/hello-algo/chapter_greedy--max_capacity_initial_state.png" alt="الحالة الابتدائية"></p>
<p>وكما هو موضح في الشكل أدناه، <strong>إذا حرّكنا الآن الحاجز الأطول $j$ إلى الداخل نحو الحاجز الأقصر $i$، فستنقص السعة حتماً</strong>.</p>
<p>ويعود السبب إلى أنه بعد تحريك الحاجز الأطول $j$، ينقص العرض $j-i$ حتماً. وبما أن الارتفاع يتحدد بالحاجز الأقصر، فلا يمكن للارتفاع إلا أن يبقى كما هو ($i$ يظل الحاجز الأقصر) أو أن ينقص ($j$ يصبح الحاجز الأقصر بعد التحريك).</p>
<p><img src="/images/hello-algo/chapter_greedy--max_capacity_moving_long_board.png" alt="الحالة بعد تحريك الحاجز الطويل إلى الداخل"></p>
<p>وعلى العكس، <strong>لا يمكن للسعة أن تزداد إلا بتحريك الحاجز الأقصر $i$ إلى الداخل</strong>. فرغم أن العرض سينقص حتماً، فإن <strong>الارتفاع قد يزداد</strong> (قد يكون الحاجز المنقول عند $i$ أطول). فمثلاً في الشكل أدناه، تزداد المساحة بعد تحريك الحاجز الأقصر.</p>
<p><img src="/images/hello-algo/chapter_greedy--max_capacity_moving_short_board.png" alt="الحالة بعد تحريك الحاجز القصير إلى الداخل"></p>
<p>ومن هذا نستنتج الاستراتيجية الجشعة لهذه المسألة: هيّئ مؤشرين عند الطرفين، وحرّك في كل جولة المؤشر المقابل للحاجز الأقصر إلى الداخل حتى يلتقي المؤشران.</p>
<p>يوضح الشكل أدناه عملية تنفيذ الاستراتيجية الجشعة.</p>
<ol>
<li>في الحالة الابتدائية، يكون المؤشران $i$ و$j$ عند طرفي المصفوفة.</li>
<li>احسب سعة الحالة الحالية $cap[i, j]$، وحدّث السعة القصوى.</li>
<li>قارن ارتفاعي الحاجزين $i$ و$j$، وحرّك المؤشر المقابل للحاجز الأقصر إلى الداخل موضعاً واحداً.</li>
<li>كرّر الخطوتين <code>2.</code> و<code>3.</code> حتى يلتقي $i$ و$j$.</li>
</ol>
<h3 id="تنفيذ-الشيفرة">تنفيذ الشيفرة</h3>
<p>تعمل الشيفرة $n$ جولة على الأكثر، <strong>لذا فإن التعقيد الزمني هو $O(n)$</strong>.</p>
<p>لا تستخدم المتغيرات $i$ و$j$ و$res$ سوى مقدار ثابت من المساحة الإضافية، <strong>لذا فإن التعقيد المكاني هو $O(1)$</strong>.</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* السعة القصوى: الخوارزمية الجشعة */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">maxCapacity</span><span class="hljs-params">(ht []<span class="hljs-type">int</span>)</span></span> <span class="hljs-type">int</span> {
	<span class="hljs-comment">// هيّئ i وj عند طرفي المصفوفة</span>
	i, j := <span class="hljs-number">0</span>, <span class="hljs-built_in">len</span>(ht)<span class="hljs-number">-1</span>
	<span class="hljs-comment">// السعة القصوى الابتدائية هي 0</span>
	res := <span class="hljs-number">0</span>
	<span class="hljs-comment">// كرّر الاختيار الجشع حتى يلتقي الحاجزان</span>
	<span class="hljs-keyword">for</span> i &lt; j {
		<span class="hljs-comment">// حدّث السعة القصوى</span>
		capacity := <span class="hljs-type">int</span>(math.Min(<span class="hljs-type">float64</span>(ht[i]), <span class="hljs-type">float64</span>(ht[j]))) * (j - i)
		res = <span class="hljs-type">int</span>(math.Max(<span class="hljs-type">float64</span>(res), <span class="hljs-type">float64</span>(capacity)))
		<span class="hljs-comment">// حرّك الحاجز الأقصر إلى الداخل</span>
		<span class="hljs-keyword">if</span> ht[i] &lt; ht[j] {
			i++
		} <span class="hljs-keyword">else</span> {
			j--
		}
	}
	<span class="hljs-keyword">return</span> res
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* السعة القصوى: الخوارزمية الجشعة */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">maxCapacity</span>(<span class="hljs-params"><span class="hljs-attr">ht</span>: <span class="hljs-built_in">number</span>[]</span>): <span class="hljs-built_in">number</span> {
    <span class="hljs-comment">// هيّئ i وj عند طرفي المصفوفة</span>
    <span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>,
        j = ht.<span class="hljs-property">length</span> - <span class="hljs-number">1</span>;
    <span class="hljs-comment">// السعة القصوى الابتدائية هي 0</span>
    <span class="hljs-keyword">let</span> res = <span class="hljs-number">0</span>;
    <span class="hljs-comment">// كرّر الاختيار الجشع حتى يلتقي الحاجزان</span>
    <span class="hljs-keyword">while</span> (i &lt; j) {
        <span class="hljs-comment">// حدّث السعة القصوى</span>
        <span class="hljs-keyword">const</span> <span class="hljs-attr">cap</span>: <span class="hljs-built_in">number</span> = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">min</span>(ht[i], ht[j]) * (j - i);
        res = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(res, cap);
        <span class="hljs-comment">// حرّك الحاجز الأقصر إلى الداخل</span>
        <span class="hljs-keyword">if</span> (ht[i] &lt; ht[j]) {
            i += <span class="hljs-number">1</span>;
        } <span class="hljs-keyword">else</span> {
            j -= <span class="hljs-number">1</span>;
        }
    }
    <span class="hljs-keyword">return</span> res;
}
</code></pre>
</div>
<h3 id="برهان-الصحة">برهان الصحة</h3>
<p>سبب كون الجشع أسرع من التعداد الشامل هو أن كل جولة اختيار جشع «تتخطى» بعض الحالات.</p>
<p>فمثلاً، في الحالة $cap[i, j]$، افترض أن $i$ هو الحاجز الأقصر و$j$ هو الحاجز الأطول. فإذا حرّكنا الحاجز الأقصر $i$ جشعاً إلى الداخل موضعاً واحداً، ستُتخطى الحالات الموضحة في الشكل أدناه. <strong>وهذا يعني أنه لم يعد في الإمكان فحص سعاتها لاحقاً</strong>.</p>
<p>$$
cap[i, i+1], cap[i, i+2], \\dots, cap[i, j-2], cap[i, j-1]
$$</p>
<p><img src="/images/hello-algo/chapter_greedy--max_capacity_skipped_states.png" alt="الحالات المتخطّاة بتحريك الحاجز القصير"></p>
<p>وبنظرة أدق، نجد أن <strong>هذه الحالات المتخطّاة هي بالضبط الحالات الناتجة عن تحريك الحاجز الأطول $j$ إلى الداخل</strong>. وقد أثبتنا سابقاً أن تحريك الحاجز الأطول إلى الداخل ينقص السعة حتماً. لذلك لا يمكن أن تكون أي من الحالات المتخطّاة هي الحل الأمثل، <strong>فتخطيها لا يجعلنا نفوّت الحل الأمثل</strong>.</p>
<p>يبين التحليل أعلاه أن تحريك الحاجز الأقصر عملية «آمنة»، وأن الاستراتيجية الجشعة فعّالة.</p>
`,e={book:s,chapter:n,chapterTitle:a,slug:p,title:l,headings:t,html:c};export{s as book,n as chapter,a as chapterTitle,e as default,t as headings,c as html,p as slug,l as title};
