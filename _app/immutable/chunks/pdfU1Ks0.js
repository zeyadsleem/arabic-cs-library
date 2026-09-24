const s="hello-algo",n="chapter_searching",a="البحث",t="binary_search_insertion",l="نقطة الإدراج في البحث الثنائي",e=[{depth:2,id:"حالة-عدم-وجود-عناصر-مكررة",text:"حالة عدم وجود عناصر مكررة"},{depth:2,id:"حالة-وجود-عناصر-مكررة",text:"حالة وجود عناصر مكررة"}],p=`<p>لا يقتصر استخدام البحث الثنائي على البحث عن العناصر المستهدفة، بل يمكنه أيضاً حل كثير من المسائل المتغيّرة، مثل إيجاد موضع إدراج عنصر مستهدف.</p>
<h2 id="حالة-عدم-وجود-عناصر-مكررة">حالة عدم وجود عناصر مكررة</h2>
<div class="note">
<p>بمعطى مصفوفة مرتّبة <code>nums</code> طولها $n$ وعنصر <code>target</code>، حيث لا تحتوي المصفوفة على عناصر مكررة، أدرج <code>target</code> في <code>nums</code> مع الحفاظ على ترتيبها المرتّب. وإذا كان <code>target</code> موجوداً في المصفوفة، فأدرجه على يسار العناصر المتساوية معه. وأعد فهرس <code>target</code> بعد الإدراج. ويوضح الشكل أدناه مثالاً على ذلك.</p>
</div>
<p><img src="/images/hello-algo/chapter_searching--binary_search_insertion_example.png" alt="بيانات مثال لنقطة الإدراج في البحث الثنائي"></p>
<p>إذا أردنا إعادة استخدام شيفرة البحث الثنائي من القسم السابق، فعلينا الإجابة عن السؤالين التاليين.</p>
<p><strong>السؤال 1</strong>: عندما تحتوي المصفوفة على <code>target</code>، هل فهرس نقطة الإدراج هو نفسه فهرس ذلك العنصر؟</p>
<p>تتطلب المسألة إدراج <code>target</code> على يسار العناصر المتساوية، أي أن <code>target</code> المُدرج حديثاً يحلّ محل موضع <code>target</code> الأصلي. بعبارة أخرى، <strong>عندما تحتوي المصفوفة على <code>target</code>، يكون فهرس نقطة الإدراج هو فهرس ذلك <code>target</code></strong>.</p>
<p><strong>السؤال 2</strong>: عندما لا تحتوي المصفوفة على <code>target</code>، فما فهرس نقطة الإدراج؟</p>
<p>لتحليل ذلك أكثر، لنتأمل عملية البحث الثنائي: عندما يكون <code>nums[m] &lt; target</code>، يتحرك $i$، أي أن المؤشر $i$ يقترب من العناصر الأكبر من <code>target</code> أو المساوية له. وبالمثل، يقترب المؤشر $j$ دائماً من العناصر الأصغر من <code>target</code> أو المساوية له.</p>
<p>لذلك، عند انتهاء البحث الثنائي، لا بد أن يشير $i$ إلى أول عنصر أكبر من <code>target</code>، وأن يشير $j$ إلى العنصر الأقصى يميناً الأصغر من <code>target</code>. <strong>ومن ثمّ، عندما لا تحتوي المصفوفة على <code>target</code>، يكون فهرس الإدراج $i$</strong>. والشيفرة كما يلي:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* البحث الثنائي عن نقطة الإدراج (دون عناصر مكررة) */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">binarySearchInsertionSimple</span><span class="hljs-params">(nums []<span class="hljs-type">int</span>, target <span class="hljs-type">int</span>)</span></span> <span class="hljs-type">int</span> {
	<span class="hljs-comment">// تهيئة المجال المغلق [0, n-1]</span>
	i, j := <span class="hljs-number">0</span>, <span class="hljs-built_in">len</span>(nums)<span class="hljs-number">-1</span>
	<span class="hljs-keyword">for</span> i &lt;= j {
		<span class="hljs-comment">// حساب فهرس المنتصف m</span>
		m := i + (j-i)/<span class="hljs-number">2</span>
		<span class="hljs-keyword">if</span> nums[m] &lt; target {
			<span class="hljs-comment">// يقع target في الفترة [m+1, j]</span>
			i = m + <span class="hljs-number">1</span>
		} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> nums[m] &gt; target {
			<span class="hljs-comment">// يقع target في الفترة [i, m-1]</span>
			j = m - <span class="hljs-number">1</span>
		} <span class="hljs-keyword">else</span> {
			<span class="hljs-comment">// العثور على target، إعادة نقطة الإدراج m</span>
			<span class="hljs-keyword">return</span> m
		}
	}
	<span class="hljs-comment">// لم يُعثر على target، إعادة نقطة الإدراج i</span>
	<span class="hljs-keyword">return</span> i
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* البحث الثنائي عن نقطة الإدراج (دون عناصر مكررة) */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">binarySearchInsertionSimple</span>(<span class="hljs-params">
    <span class="hljs-attr">nums</span>: <span class="hljs-title class_">Array</span>&lt;<span class="hljs-built_in">number</span>&gt;,
    <span class="hljs-attr">target</span>: <span class="hljs-built_in">number</span>
</span>): <span class="hljs-built_in">number</span> {
    <span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>,
        j = nums.<span class="hljs-property">length</span> - <span class="hljs-number">1</span>; <span class="hljs-comment">// تهيئة المجال المغلق [0, n-1]</span>
    <span class="hljs-keyword">while</span> (i &lt;= j) {
        <span class="hljs-keyword">const</span> m = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(i + (j - i) / <span class="hljs-number">2</span>); <span class="hljs-comment">// حساب فهرس المنتصف m، واستخدام Math.floor() للتقريب نحو الأسفل</span>
        <span class="hljs-keyword">if</span> (nums[m] &lt; target) {
            i = m + <span class="hljs-number">1</span>; <span class="hljs-comment">// يقع target في الفترة [m+1, j]</span>
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (nums[m] &gt; target) {
            j = m - <span class="hljs-number">1</span>; <span class="hljs-comment">// يقع target في الفترة [i, m-1]</span>
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-keyword">return</span> m; <span class="hljs-comment">// العثور على target، إعادة نقطة الإدراج m</span>
        }
    }
    <span class="hljs-comment">// لم يُعثر على target، إعادة نقطة الإدراج i</span>
    <span class="hljs-keyword">return</span> i;
}
</code></pre>
</div>
<h2 id="حالة-وجود-عناصر-مكررة">حالة وجود عناصر مكررة</h2>
<div class="note">
<p>بناءً على المسألة السابقة، افترض أن المصفوفة قد تحتوي على عناصر مكررة، مع بقاء كل ما عدا ذلك على حاله.</p>
</div>
<p>لنفترض وجود عدة عناصر <code>target</code> في المصفوفة. لا يستطيع البحث الثنائي العادي إلا إعادة فهرس واحد من <code>target</code>، <strong>ولا يمكنه تحديد عدد عناصر <code>target</code> الواقعة على يسار ذلك العنصر ويمينه</strong>.</p>
<p>تتطلب المسألة إدراج العنصر المستهدف في أقصى الموضع يساراً، <strong>لذا علينا إيجاد فهرس <code>target</code> الأقرب إلى أقصى اليسار في المصفوفة</strong>. والنهج الأولي المباشر هو اتباع الخطوات الموضحة في الشكل أدناه:</p>
<ol>
<li>نفّذ البحث الثنائي للحصول على فهرس أي <code>target</code>، ويُرمز إليه بـ$k$.</li>
<li>بدءاً من الفهرس $k$، نفّذ اجتيازاً خطياً نحو اليسار، وأعد النتيجة عند العثور على <code>target</code> الأقرب إلى أقصى اليسار.</li>
</ol>
<p><img src="/images/hello-algo/chapter_searching--binary_search_insertion_naive.png" alt="البحث الخطي عن نقطة إدراج العناصر المكررة"></p>
<p>ورغم أن هذه الطريقة تنجح، فهي تتضمن بحثاً خطياً، مما يجعل التعقيد الزمني $O(n)$. وعندما تحتوي المصفوفة على عناصر <code>target</code> مكررة كثيرة، تصبح هذه الطريقة شديدة الانخفاض في الكفاءة.</p>
<p>لنفكّر الآن في توسيع شيفرة البحث الثنائي. وكما يوضح الشكل أدناه، تبقى العملية الكلية دون تغيير: في كل تكرار، نحسب أولاً فهرس المنتصف $m$، ثم نقارن <code>target</code> بـ<code>nums[m]</code>، مما يؤدي إلى الحالات التالية:</p>
<ul>
<li>عندما يكون <code>nums[m] &lt; target</code> أو <code>nums[m] &gt; target</code>، فذلك يعني أن <code>target</code> لم يُعثر عليه بعد، لذا استخدم عملية تقليص المجال المعتادة في البحث الثنائي <strong>لتقريب المؤشرين $i$ و$j$ من <code>target</code></strong>.</li>
<li>وعندما يكون <code>nums[m] == target</code>، فذلك يعني أن العناصر الأصغر من <code>target</code> تقع في الفترة $[i, m - 1]$، لذا استخدم $j = m - 1$ لتقليص المجال، وبذلك <strong>يقترب المؤشر $j$ من العناصر الأصغر من <code>target</code></strong>.</li>
</ul>
<p>بعد انتهاء الحلقة، يشير $i$ إلى <code>target</code> الأقرب إلى أقصى اليسار، ويشير $j$ إلى العنصر الأقصى يميناً الأصغر من <code>target</code>، <strong>وبالتالي يكون الفهرس $i$ هو نقطة الإدراج</strong>.</p>
<p>ولاحظ الشيفرة التالية: الفرعان <code>nums[m] &gt; target</code> و<code>nums[m] == target</code> ينفذان العملية نفسها، لذا يمكن دمجهما.</p>
<p>ومع ذلك، يمكننا إبقاء الشروط متفرعة كما هي، لأن المنطق أوضح وأكثر قابلية للقراءة.</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* البحث الثنائي عن نقطة الإدراج (مع عناصر مكررة) */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">binarySearchInsertion</span><span class="hljs-params">(nums []<span class="hljs-type">int</span>, target <span class="hljs-type">int</span>)</span></span> <span class="hljs-type">int</span> {
	<span class="hljs-comment">// تهيئة المجال المغلق [0, n-1]</span>
	i, j := <span class="hljs-number">0</span>, <span class="hljs-built_in">len</span>(nums)<span class="hljs-number">-1</span>
	<span class="hljs-keyword">for</span> i &lt;= j {
		<span class="hljs-comment">// حساب فهرس المنتصف m</span>
		m := i + (j-i)/<span class="hljs-number">2</span>
		<span class="hljs-keyword">if</span> nums[m] &lt; target {
			<span class="hljs-comment">// يقع target في الفترة [m+1, j]</span>
			i = m + <span class="hljs-number">1</span>
		} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> nums[m] &gt; target {
			<span class="hljs-comment">// يقع target في الفترة [i, m-1]</span>
			j = m - <span class="hljs-number">1</span>
		} <span class="hljs-keyword">else</span> {
			<span class="hljs-comment">// العنصر الأقصى يميناً الأصغر من target يقع في الفترة [i, m-1]</span>
			j = m - <span class="hljs-number">1</span>
		}
	}
	<span class="hljs-comment">// إعادة نقطة الإدراج i</span>
	<span class="hljs-keyword">return</span> i
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* البحث الثنائي عن نقطة الإدراج (مع عناصر مكررة) */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">binarySearchInsertion</span>(<span class="hljs-params"><span class="hljs-attr">nums</span>: <span class="hljs-title class_">Array</span>&lt;<span class="hljs-built_in">number</span>&gt;, <span class="hljs-attr">target</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">number</span> {
    <span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>,
        j = nums.<span class="hljs-property">length</span> - <span class="hljs-number">1</span>; <span class="hljs-comment">// تهيئة المجال المغلق [0, n-1]</span>
    <span class="hljs-keyword">while</span> (i &lt;= j) {
        <span class="hljs-keyword">const</span> m = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(i + (j - i) / <span class="hljs-number">2</span>); <span class="hljs-comment">// حساب فهرس المنتصف m، واستخدام Math.floor() للتقريب نحو الأسفل</span>
        <span class="hljs-keyword">if</span> (nums[m] &lt; target) {
            i = m + <span class="hljs-number">1</span>; <span class="hljs-comment">// يقع target في الفترة [m+1, j]</span>
        } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (nums[m] &gt; target) {
            j = m - <span class="hljs-number">1</span>; <span class="hljs-comment">// يقع target في الفترة [i, m-1]</span>
        } <span class="hljs-keyword">else</span> {
            j = m - <span class="hljs-number">1</span>; <span class="hljs-comment">// العنصر الأقصى يميناً الأصغر من target يقع في الفترة [i, m-1]</span>
        }
    }
    <span class="hljs-comment">// إعادة نقطة الإدراج i</span>
    <span class="hljs-keyword">return</span> i;
}
</code></pre>
</div>
<div class="note">
<p>تستخدم شيفرة هذا القسم نهج «المجال المغلق» في كل مواضعها. ويمكن للقارئ المهتم تنفيذ نهج «مغلق من اليسار، مفتوح من اليمين» بنفسه.</p>
</div>
<p>إجمالاً، البحث الثنائي ليس سوى تحديد هدف بحث منفصل لكل من المؤشرين $i$ و$j$. وقد يكون الهدف عنصراً محدداً (مثل <code>target</code>) أو نطاقاً من العناصر (مثل العناصر الأصغر من <code>target</code>).</p>
<p>ومع كل تكرار في البحث الثنائي، يقترب المؤشران $i$ و$j$ تدريجياً من هدفيهما المحددين سلفاً. وفي النهاية، إما أن يعثرا على الجواب وإما أن يتوقفا بعد تجاوز الحدود.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:l,headings:e,html:p};export{s as book,n as chapter,a as chapterTitle,c as default,e as headings,p as html,t as slug,l as title};
