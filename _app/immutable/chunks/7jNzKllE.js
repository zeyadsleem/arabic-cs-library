const s="hello-algo",a="chapter_sorting",n="الترتيب",p="bucket_sort",t="ترتيب الدلاء",l=[{depth:2,id:"تدفق-الخوارزمية",text:"تدفق الخوارزمية"},{depth:2,id:"خصائص-الخوارزمية",text:"خصائص الخوارزمية"},{depth:2,id:"كيف-نحقق-توزيعا-متساويا",text:"كيف نحقق توزيعاً متساوياً"}],e=`<p>خوارزميات الترتيب التي ناقشناها سابقاً كلها خوارزميات ترتيب قائمة على المقارنة، وهي ترتّب عبر مقارنة الترتيب النسبي للعناصر. الحد الأدنى للتعقيد الزمني لهذه الخوارزميات في أسوأ الحالات هو <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">Ω</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>. بعد ذلك، سنستكشف عدة خوارزميات ترتيب لا تعتمد على المقارنة، يمكن أن يكون تعقيدها الزمني خطياً.</p>
<p><u>ترتيب الدلاء</u> تطبيق نموذجي لاستراتيجية التقسيم والتغلب. وهو يعمل عبر إنشاء سلسلة من الدلاء المرتبة، يقابل كل منها نطاقاً من البيانات، وتوزيع البيانات عليها بالتساوي. ثم تُرتَّب العناصر داخل كل دلو على حدة. وأخيراً تُدمج جميع الدلاء بالترتيب.</p>
<h2 id="تدفق-الخوارزمية">تدفق الخوارزمية</h2>
<p>لنأخذ مصفوفة طولها <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span>، عناصرها أعداد عشرية عائمة في النطاق $[0, 1)$. يظهر تدفق ترتيب الدلاء في الشكل التالي.</p>
<ol>
<li>هيّئ <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal" style="margin-right:0.0315em;">k</span></span></span></span> من الدلاء ووزّع العناصر <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> على الدلاء <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal" style="margin-right:0.0315em;">k</span></span></span></span>.</li>
<li>رتّب كل دلو على حدة (نستخدم هنا دالة الترتيب المدمجة في لغة البرمجة).</li>
<li>ادمج النتائج بالترتيب من أصغر دلو إلى أكبرها.</li>
</ol>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_sorting--bucket_sort_overview.png" alt="تدفق خوارزمية ترتيب الدلاء"></p>
<p>الشيفرة كما يلي:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* ترتيب الدلاء */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">bucketSort</span><span class="hljs-params">(nums []<span class="hljs-type">float64</span>)</span></span> {
	<span class="hljs-comment">// تهيئة k = n/2 دلو، ومن المتوقع تخصيص عنصرين لكل دلو</span>
	k := <span class="hljs-built_in">len</span>(nums) / <span class="hljs-number">2</span>
	buckets := <span class="hljs-built_in">make</span>([][]<span class="hljs-type">float64</span>, k)
	<span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; k; i++ {
		buckets[i] = <span class="hljs-built_in">make</span>([]<span class="hljs-type">float64</span>, <span class="hljs-number">0</span>)
	}
	<span class="hljs-comment">// 1. وزّع عناصر المصفوفة على الدلاء المختلفة</span>
	<span class="hljs-keyword">for</span> _, num := <span class="hljs-keyword">range</span> nums {
		<span class="hljs-comment">// نطاق بيانات الإدخال هو [0, 1)، استخدم num * k للتعيين إلى نطاق الفهارس [0, k-1]</span>
		i := <span class="hljs-type">int</span>(num * <span class="hljs-type">float64</span>(k))
		<span class="hljs-comment">// أضف num إلى الدلو i</span>
		buckets[i] = <span class="hljs-built_in">append</span>(buckets[i], num)
	}
	<span class="hljs-comment">// 2. رتّب كل دلو</span>
	<span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; k; i++ {
		<span class="hljs-comment">// استخدم دالة ترتيب الشرائح المدمجة، ويمكن استبدالها بخوارزميات ترتيب أخرى</span>
		sort.Float64s(buckets[i])
	}
	<span class="hljs-comment">// 3. اجتز الدلاء لدمج النتائج</span>
	i := <span class="hljs-number">0</span>
	<span class="hljs-keyword">for</span> _, bucket := <span class="hljs-keyword">range</span> buckets {
		<span class="hljs-keyword">for</span> _, num := <span class="hljs-keyword">range</span> bucket {
			nums[i] = num
			i++
		}
	}
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* ترتيب الدلاء */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">bucketSort</span>(<span class="hljs-params"><span class="hljs-attr">nums</span>: <span class="hljs-built_in">number</span>[]</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-comment">// تهيئة k = n/2 دلو، ومن المتوقع تخصيص عنصرين لكل دلو</span>
    <span class="hljs-keyword">const</span> k = nums.<span class="hljs-property">length</span> / <span class="hljs-number">2</span>;
    <span class="hljs-keyword">const</span> <span class="hljs-attr">buckets</span>: <span class="hljs-built_in">number</span>[][] = [];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; k; i++) {
        buckets.<span class="hljs-title function_">push</span>([]);
    }
    <span class="hljs-comment">// 1. وزّع عناصر المصفوفة على الدلاء المختلفة</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> num <span class="hljs-keyword">of</span> nums) {
        <span class="hljs-comment">// نطاق بيانات الإدخال هو [0, 1)، استخدم num * k للتعيين إلى نطاق الفهارس [0, k-1]</span>
        <span class="hljs-keyword">const</span> i = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(num * k);
        <span class="hljs-comment">// أضف num إلى الدلو i</span>
        buckets[i].<span class="hljs-title function_">push</span>(num);
    }
    <span class="hljs-comment">// 2. رتّب كل دلو</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> bucket <span class="hljs-keyword">of</span> buckets) {
        <span class="hljs-comment">// استخدم دالة الترتيب المدمجة، ويمكن استبدالها بخوارزميات ترتيب أخرى</span>
        bucket.<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a - b);
    }
    <span class="hljs-comment">// 3. اجتز الدلاء لدمج النتائج</span>
    <span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> bucket <span class="hljs-keyword">of</span> buckets) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> num <span class="hljs-keyword">of</span> bucket) {
            nums[i++] = num;
        }
    }
}
</code></pre>
</div>
<h2 id="خصائص-الخوارزمية">خصائص الخوارزمية</h2>
<p>يناسب ترتيب الدلاء معالجة مجموعات بيانات ضخمة جداً. على سبيل المثال، لنفترض أن الإدخال يحتوي على مليون عنصر، وتمنع محدودية الذاكرة النظام من تحميلها كلها دفعة واحدة. في هذه الحالة يمكن تقسيم البيانات على 1000 دلو، وترتيب كل دلو على حدة، ثم دمج النتائج.</p>
<ul>
<li><strong>التعقيد الزمني هو $O(n + k)$</strong>: بافتراض توزيع العناصر بالتساوي على الدلاء، يحتوي كل دلو على <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.0404em;vertical-align:-0.345em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.6954em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.0315em;">k</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.345em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span> عنصراً. وإذا استغرق ترتيب دلو واحد زمن <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.095em;vertical-align:-0.345em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.6954em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.0315em;">k</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.345em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.6954em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.0315em;">k</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.345em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mclose">)</span></span></span></span>، فإن ترتيب جميع الدلاء يستغرق زمن <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.095em;vertical-align:-0.345em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.6954em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight" style="margin-right:0.0315em;">k</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.345em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span><span class="mclose">)</span></span></span></span>. <strong>وعندما يكون عدد الدلاء <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal" style="margin-right:0.0315em;">k</span></span></span></span> كبيراً نسبياً، يقترب التعقيد الزمني من <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></strong>. ويتطلب دمج النتائج اجتياز جميع الدلاء والعناصر، وهو ما يستغرق زمن $O(n + k)$. وفي أسوأ الحالات، تُوضع كل البيانات في دلو واحد، ويستغرق ترتيبه زمن <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.0641em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal">n</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span>.</li>
<li><strong>التعقيد المكاني هو $O(n + k)$، وترتيب الدلاء ليس في المكان</strong>: فهو يتطلب مساحة إضافية لمقدار <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal" style="margin-right:0.0315em;">k</span></span></span></span> من الدلاء و<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> من العناصر إجمالاً.</li>
<li>يعتمد استقرار ترتيب الدلاء على ما إذا كانت الخوارزمية المستخدمة لترتيب العناصر داخل الدلاء مستقرة.</li>
</ul>
<h2 id="كيف-نحقق-توزيعا-متساويا">كيف نحقق توزيعاً متساوياً</h2>
<p>نظرياً، يمكن لترتيب الدلاء تحقيق تعقيد زمني <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>. <strong>المفتاح هو توزيع العناصر بالتساوي على الدلاء</strong>، لأن بيانات العالم الواقعي غالباً لا تكون موزعة بانتظام. على سبيل المثال، لنفترض أننا نريد تقسيم جميع المنتجات على Taobao بالتساوي إلى 10 دلاء حسب نطاق السعر، لكن توزيع الأسعار غير متساوٍ: فهناك منتجات كثيرة يقل سعرها عن 100 يوان، ومنتجات قليلة جداً يتجاوز سعرها 1000 يوان. وإذا قُسّم نطاق السعر بالتساوي إلى 10 فترات، فستتباين أعداد المنتجات في الدلاء تبايناً كبيراً.</p>
<p>لتحقيق توزيع أكثر تساوياً، يمكننا أولاً اختيار حد تقريبي وتقسيم البيانات إلى 3 دلاء. <strong>بعد ذلك، يمكن تقسيم الدلاء التي تحتوي على منتجات أكثر إلى 3 دلاء أخرى، حتى تصبح أعداد العناصر في جميع الدلاء متقاربة</strong>.</p>
<p>كما يظهر في الشكل التالي، تبني هذه الطريقة في جوهرها شجرة تعاودية هدفها جعل العقد الورقية متوازنة قدر الإمكان. وبالطبع، لا يلزم تقسيم البيانات إلى 3 دلاء في كل جولة؛ إذ يمكن اختيار استراتيجية التقسيم المحددة بمرونة بناءً على خصائص البيانات.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_sorting--scatter_in_buckets_recursively.png" alt="تقسيم الدلاء تعاودياً"></p>
<p>إذا عرفنا التوزيع الاحتمالي لأسعار المنتجات مسبقاً، <strong>يمكننا ضبط حدود الأسعار لكل دلو وفقاً لهذا التوزيع</strong>. ومن الجدير بالذكر أن توزيع البيانات لا يلزم قياسه بدقة؛ إذ يمكن أيضاً تقريبه بنموذج احتمالي يُختار ليلائم خصائص البيانات.</p>
<p>كما يظهر في الشكل التالي، نفترض أن أسعار المنتجات تتبع توزيعاً طبيعياً، مما يتيح لنا ضبط فترات الأسعار بشكل معقول لتوزيع المنتجات بالتساوي على كل دلو.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_sorting--scatter_in_buckets_distribution.png" alt="تقسيم الدلاء بناءً على التوزيع الاحتمالي"></p>
`,c={book:s,chapter:a,chapterTitle:n,slug:p,title:t,headings:l,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,l as headings,e as html,p as slug,t as title};
