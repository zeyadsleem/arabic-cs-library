const s="hello-algo",n="chapter_sorting",a="الترتيب",l="selection_sort",t="ترتيب الاختيار",p=[{depth:2,id:"خصائص-الخوارزمية",text:"خصائص الخوارزمية"}],c=`<p><u>ترتيب الاختيار</u> (selection sort) بسيط جداً في عمله: في كل جولة يختار أصغر عنصر من المجال غير المرتب ويضعه في نهاية المجال المرتب.</p>
<p>افترض أن طول المصفوفة $n$. ويوضح الشكل أدناه سير ترتيب الاختيار.</p>
<ol>
<li>في البداية تكون جميع العناصر غير مرتبة، أي إن مجال الفهارس غير المرتب هو $[0, n-1]$.</li>
<li>اختر أصغر عنصر في المجال $[0, n-1]$ وبدّله مع العنصر عند الفهرس $0$. وبعد الانتهاء يصبح العنصر الأول من المصفوفة مرتباً.</li>
<li>اختر أصغر عنصر في المجال $[1, n-1]$ وبدّله مع العنصر عند الفهرس $1$. وبعد الانتهاء يصبح العنصران الأولان من المصفوفة مرتبين.</li>
<li>وهكذا دواليك. بعد $n - 1$ جولة من الاختيار والتبديل، تصبح العناصر $n - 1$ الأولى من المصفوفة مرتبة.</li>
<li>ولا بد أن يكون العنصر الوحيد المتبقي هو الأكبر، لذا لا حاجة إلى مزيد من الترتيب وتصبح المصفوفة مرتبة.</li>
</ol>
<p>في الشيفرة نستخدم $k$ لتتبع أصغر عنصر داخل المجال غير المرتب:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* ترتيب الاختيار */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">selectionSort</span><span class="hljs-params">(nums []<span class="hljs-type">int</span>)</span></span> {
	n := <span class="hljs-built_in">len</span>(nums)
	<span class="hljs-comment">// الحلقة الخارجية: المجال غير المرتب هو [i, n-1]</span>
	<span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; n<span class="hljs-number">-1</span>; i++ {
		<span class="hljs-comment">// الحلقة الداخلية: ابحث عن أصغر عنصر داخل المجال غير المرتب</span>
		k := i
		<span class="hljs-keyword">for</span> j := i + <span class="hljs-number">1</span>; j &lt; n; j++ {
			<span class="hljs-keyword">if</span> nums[j] &lt; nums[k] {
				<span class="hljs-comment">// سجّل فهرس أصغر عنصر</span>
				k = j
			}
		}
		<span class="hljs-comment">// بدّل أصغر عنصر مع العنصر الأول من المجال غير المرتب</span>
		nums[i], nums[k] = nums[k], nums[i]

	}
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* ترتيب الاختيار */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">selectionSort</span>(<span class="hljs-params"><span class="hljs-attr">nums</span>: <span class="hljs-built_in">number</span>[]</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">let</span> n = nums.<span class="hljs-property">length</span>;
    <span class="hljs-comment">// الحلقة الخارجية: المجال غير المرتب هو [i, n-1]</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; n - <span class="hljs-number">1</span>; i++) {
        <span class="hljs-comment">// الحلقة الداخلية: ابحث عن أصغر عنصر داخل المجال غير المرتب</span>
        <span class="hljs-keyword">let</span> k = i;
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = i + <span class="hljs-number">1</span>; j &lt; n; j++) {
            <span class="hljs-keyword">if</span> (nums[j] &lt; nums[k]) {
                k = j; <span class="hljs-comment">// سجّل فهرس أصغر عنصر</span>
            }
        }
        <span class="hljs-comment">// بدّل أصغر عنصر مع العنصر الأول من المجال غير المرتب</span>
        [nums[i], nums[k]] = [nums[k], nums[i]];
    }
}
</code></pre>
</div>
<h2 id="خصائص-الخوارزمية">خصائص الخوارزمية</h2>
<ul>
<li><strong>التعقيد الزمني $O(n^2)$؛ ترتيب غير تكيّفي (non-adaptive)</strong>: تضم الحلقة الخارجية $n - 1$ جولة إجمالاً. وتُنفَّذ الحلقة الداخلية $n - 1$ مرة في الجولة الأولى ومرة واحدة في الجولة الأخيرة. وبذلك تُنفَّذ $n - 1$ و$n - 2$ و$\\dots$ و$2$ و$1$ مرة على التوالي، ومجموعها $\\frac{n(n - 1)}{2}$.</li>
<li><strong>التعقيد المكاني $O(1)$؛ ترتيب في المكان (in-place)</strong>: يستخدم المؤشران $i$ و$j$ مقداراً ثابتاً من المساحة الإضافية.</li>
<li><strong>ترتيب غير مستقر</strong>: كما يوضح الشكل أدناه، قد يُبدَّل العنصر <code>nums[i]</code> إلى يمين عنصر مساوٍ له، مما يغيّر ترتيبهما النسبي.</li>
</ul>
<p><img src="/images/hello-algo/chapter_sorting--selection_sort_instability.png" alt="مثال على عدم استقرار ترتيب الاختيار"></p>
`,e={book:s,chapter:n,chapterTitle:a,slug:l,title:t,headings:p,html:c};export{s as book,n as chapter,a as chapterTitle,e as default,p as headings,c as html,l as slug,t as title};
