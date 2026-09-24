const s="hello-algo",n="chapter_searching",a="البحث",l="replace_linear_by_hashing",p="استراتيجية التحسين بالتجزئة",t=[{depth:2,id:"البحث-الخطي-مقايضة-الزمن-بالمكان",text:"البحث الخطي: مقايضة الزمن بالمكان"},{depth:2,id:"البحث-القائم-على-التجزئة-مقايضة-المكان-بالزمن",text:"البحث القائم على التجزئة: مقايضة المكان بالزمن"}],e=`<p>في مسائل الخوارزميات، <strong>كثيراً ما نقلل التعقيد الزمني للخوارزميات عبر استبدال البحث الخطي بالبحث القائم على التجزئة</strong>. ولنستخدم إحدى مسائل الخوارزميات لتعميق فهمنا.</p>
<div class="note">
<p>بمعطى مصفوفة أعداد صحيحة <code>nums</code> وقيمة مستهدفة <code>target</code>، ابحث عن عنصرين في المصفوفة يكون مجموعهما <code>target</code>، ثم أعد فهرسيهما. تكفي أي إجابة.</p>
</div>
<h2 id="البحث-الخطي-مقايضة-الزمن-بالمكان">البحث الخطي: مقايضة الزمن بالمكان</h2>
<p>فكّر في اجتياز جميع التركيبات الممكنة مباشرة. وكما هو موضح في الشكل أدناه، نستخدم حلقات متداخلة ونتحقق في كل تكرار مما إذا كان مجموع عددين صحيحين يساوي <code>target</code>. فإن كان كذلك، نعيد فهرسيهما.</p>
<p><img src="/images/hello-algo/chapter_searching--two_sum_brute_force.png" alt="حل البحث الخطي لمسألة المجموع الثنائي"></p>
<p>الكود موضح أدناه:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* الطريقة 1: التعداد بالقوة الغاشمة */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">twoSumBruteForce</span><span class="hljs-params">(nums []<span class="hljs-type">int</span>, target <span class="hljs-type">int</span>)</span></span> []<span class="hljs-type">int</span> {
	size := <span class="hljs-built_in">len</span>(nums)
	<span class="hljs-comment">// حلقتان متداخلتان، التعقيد الزمني هو O(n^2)</span>
	<span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; size<span class="hljs-number">-1</span>; i++ {
		<span class="hljs-keyword">for</span> j := i + <span class="hljs-number">1</span>; j &lt; size; j++ {
			<span class="hljs-keyword">if</span> nums[i]+nums[j] == target {
				<span class="hljs-keyword">return</span> []<span class="hljs-type">int</span>{i, j}
			}
		}
	}
	<span class="hljs-keyword">return</span> <span class="hljs-literal">nil</span>
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* الطريقة 1: التعداد بالقوة الغاشمة */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">twoSumBruteForce</span>(<span class="hljs-params"><span class="hljs-attr">nums</span>: <span class="hljs-built_in">number</span>[], <span class="hljs-attr">target</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">number</span>[] {
    <span class="hljs-keyword">const</span> n = nums.<span class="hljs-property">length</span>;
    <span class="hljs-comment">// حلقتان متداخلتان، التعقيد الزمني هو O(n^2)</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; n; i++) {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = i + <span class="hljs-number">1</span>; j &lt; n; j++) {
            <span class="hljs-keyword">if</span> (nums[i] + nums[j] === target) {
                <span class="hljs-keyword">return</span> [i, j];
            }
        }
    }
    <span class="hljs-keyword">return</span> [];
}
</code></pre>
</div>
<p>التعقيد الزمني لهذه الطريقة هو $O(n^2)$ والتعقيد المكاني هو $O(1)$، مما يجعلها مستهلكة للوقت للغاية عند المدخلات الكبيرة.</p>
<h2 id="البحث-القائم-على-التجزئة-مقايضة-المكان-بالزمن">البحث القائم على التجزئة: مقايضة المكان بالزمن</h2>
<p>فكّر في استخدام جدول تجزئة تكون مفاتيحه عناصر المصفوفة وقيمه فهارسها. اجتز المصفوفة ونفّذ الخطوات الموضحة في الشكل أدناه في كل تكرار:</p>
<ol>
<li>تحقق مما إذا كان العدد <code>target - nums[i]</code> موجوداً في جدول التجزئة. فإن كان موجوداً، أعد فوريًا فهرسي هذين العنصرين.</li>
<li>أضف زوج المفتاح والقيمة المكوّن من <code>nums[i]</code> والفهرس <code>i</code> إلى جدول التجزئة.</li>
</ol>
<p>التنفيذ موضح أدناه ولا يتطلب سوى حلقة واحدة:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* الطريقة 2: جدول تجزئة مساعد */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">twoSumHashTable</span><span class="hljs-params">(nums []<span class="hljs-type">int</span>, target <span class="hljs-type">int</span>)</span></span> []<span class="hljs-type">int</span> {
	<span class="hljs-comment">// جدول تجزئة مساعد، التعقيد المكاني هو O(n)</span>
	hashTable := <span class="hljs-keyword">map</span>[<span class="hljs-type">int</span>]<span class="hljs-type">int</span>{}
	<span class="hljs-comment">// حلقة واحدة، التعقيد الزمني هو O(n)</span>
	<span class="hljs-keyword">for</span> idx, val := <span class="hljs-keyword">range</span> nums {
		<span class="hljs-keyword">if</span> preIdx, ok := hashTable[target-val]; ok {
			<span class="hljs-keyword">return</span> []<span class="hljs-type">int</span>{preIdx, idx}
		}
		hashTable[val] = idx
	}
	<span class="hljs-keyword">return</span> <span class="hljs-literal">nil</span>
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* الطريقة 2: جدول تجزئة مساعد */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">twoSumHashTable</span>(<span class="hljs-params"><span class="hljs-attr">nums</span>: <span class="hljs-built_in">number</span>[], <span class="hljs-attr">target</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">number</span>[] {
    <span class="hljs-comment">// جدول تجزئة مساعد، التعقيد المكاني هو O(n)</span>
    <span class="hljs-keyword">let</span> <span class="hljs-attr">m</span>: <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">number</span>, <span class="hljs-built_in">number</span>&gt; = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();
    <span class="hljs-comment">// حلقة واحدة، التعقيد الزمني هو O(n)</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; nums.<span class="hljs-property">length</span>; i++) {
        <span class="hljs-keyword">let</span> index = m.<span class="hljs-title function_">get</span>(target - nums[i]);
        <span class="hljs-keyword">if</span> (index !== <span class="hljs-literal">undefined</span>) {
            <span class="hljs-keyword">return</span> [index, i];
        } <span class="hljs-keyword">else</span> {
            m.<span class="hljs-title function_">set</span>(nums[i], i);
        }
    }
    <span class="hljs-keyword">return</span> [];
}
</code></pre>
</div>
<p>تقلل هذه الطريقة التعقيد الزمني من $O(n^2)$ إلى $O(n)$ عبر البحث القائم على التجزئة، مما يحسّن كفاءة زمن التشغيل تحسيناً كبيراً.</p>
<p>وبما أنه يلزم الاحتفاظ بجدول تجزئة إضافي، فإن التعقيد المكاني هو $O(n)$. <strong>ومع ذلك، تقدم هذه الطريقة مقايضة زمنية-مكانية إجمالية أكثر توازناً، مما يجعلها الحل الأمثل لهذه المسألة</strong>.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:l,title:p,headings:t,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,t as headings,e as html,l as slug,p as title};
