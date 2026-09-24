const s="hello-algo",n="chapter_sorting",a="الترتيب",l="heap_sort",p="الترتيب بالكومة",t=[{depth:2,id:"سير-الخوارزمية",text:"سير الخوارزمية"},{depth:2,id:"خصائص-الخوارزمية",text:"خصائص الخوارزمية"}],c=`<div class="note">
<p>قبل قراءة هذا القسم، يرجى التأكد من إتمام فصل «الكومة».</p>
</div>
<p><u>الترتيب بالكومة</u> (heap sort) خوارزمية ترتيب فعّالة قائمة على بنية بيانات الكومة. ويمكننا تنفيذ الترتيب بالكومة باستخدام عمليتي بناء الكومة وإزالة العناصر اللتين قدّمناهما سابقاً.</p>
<ol>
<li>أدخل المصفوفة وابنِ كومة صغرى (min-heap)، وعندها يكون أصغر عنصر في قمة الكومة.</li>
<li>نفّذ عمليات إزالة العناصر باستمرار وسجّل العناصر المُزالة بالترتيب للحصول على تسلسل مرتّب تصاعدياً.</li>
</ol>
<p>ورغم أن الطريقة السابقة قابلة للتنفيذ، فإنها تتطلب مصفوفة إضافية لحفظ العناصر المستخرجة، وهو إهدار كبير للمساحة. ومن الناحية العملية، نستخدم عادةً طريقة تنفيذ أكثر أناقة.</p>
<h2 id="سير-الخوارزمية">سير الخوارزمية</h2>
<p>لنفترض أن طول المصفوفة $n$. يوضح الشكل أدناه سير الترتيب بالكومة.</p>
<ol>
<li>أدخل المصفوفة وابنِ كومة عظمى (max-heap). وبعد اكتمال البناء، يكون أكبر عنصر في قمة الكومة.</li>
<li>بادل عنصر قمة الكومة (العنصر الأول) بعنصر قاعدة الكومة (العنصر الأخير). وبعد اكتمال المبادلة، قلّل طول الكومة بمقدار $1$ وزد عدد العناصر المرتّبة بمقدار $1$.</li>
<li>بدءاً من عنصر قمة الكومة، نفّذ عملية إعادة بناء الكومة من الأعلى إلى الأسفل (sift down). وبعد اكتمالها، تُستعاد خصائص الكومة.</li>
<li>كرر الخطوتين <code>2.</code> و<code>3.</code>. وبعد $n - 1$ من الجولات، تكتمل عملية ترتيب المصفوفة.</li>
</ol>
<div class="note">
<p>في الواقع، تتضمن عملية إزالة العناصر أيضاً الخطوتين <code>2.</code> و<code>3.</code>، مع خطوة إضافية هي إزالة العنصر.</p>
</div>
<p>في الشيفرة أدناه، نستخدم الدالة <code>sift_down()</code> نفسها لإعادة بناء الكومة من الأعلى إلى الأسفل كما في فصل «الكومة». ومن الجدير بالذكر أنه بما أن طول الكومة يتناقص مع استخراج أكبر عنصر، فإننا نحتاج إلى إضافة معامل طول $n$ إلى <code>sift_down()</code> لتحديد الطول الفعلي الحالي للكومة. والشيفرة كما يلي:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* الترتيب بالكومة */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">heapSort</span><span class="hljs-params">(nums *[]<span class="hljs-type">int</span>)</span></span> {
	<span class="hljs-comment">// عملية بناء الكومة: أعد بناء جميع العقد عدا الأوراق</span>
	<span class="hljs-keyword">for</span> i := <span class="hljs-built_in">len</span>(*nums)/<span class="hljs-number">2</span> - <span class="hljs-number">1</span>; i &gt;= <span class="hljs-number">0</span>; i-- {
		siftDown(nums, <span class="hljs-built_in">len</span>(*nums), i)
	}
	<span class="hljs-comment">// استخرج أكبر عنصر من الكومة وكرّر ذلك n-1 مرة</span>
	<span class="hljs-keyword">for</span> i := <span class="hljs-built_in">len</span>(*nums) - <span class="hljs-number">1</span>; i &gt; <span class="hljs-number">0</span>; i-- {
		<span class="hljs-comment">// حذف العقدة</span>
		(*nums)[<span class="hljs-number">0</span>], (*nums)[i] = (*nums)[i], (*nums)[<span class="hljs-number">0</span>]
		<span class="hljs-comment">// ابدأ إعادة بناء الكومة من العقدة الجذرية، من الأعلى إلى الأسفل</span>
		siftDown(nums, i, <span class="hljs-number">0</span>)
	}
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* الترتيب بالكومة */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">heapSort</span>(<span class="hljs-params"><span class="hljs-attr">nums</span>: <span class="hljs-built_in">number</span>[]</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-comment">// عملية بناء الكومة: أعد بناء جميع العقد عدا الأوراق</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(nums.<span class="hljs-property">length</span> / <span class="hljs-number">2</span>) - <span class="hljs-number">1</span>; i &gt;= <span class="hljs-number">0</span>; i--) {
        <span class="hljs-title function_">siftDown</span>(nums, nums.<span class="hljs-property">length</span>, i);
    }
    <span class="hljs-comment">// استخرج أكبر عنصر من الكومة وكرّر ذلك n-1 مرة</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = nums.<span class="hljs-property">length</span> - <span class="hljs-number">1</span>; i &gt; <span class="hljs-number">0</span>; i--) {
        <span class="hljs-comment">// حذف العقدة</span>
        [nums[<span class="hljs-number">0</span>], nums[i]] = [nums[i], nums[<span class="hljs-number">0</span>]];
        <span class="hljs-comment">// ابدأ إعادة بناء الكومة من العقدة الجذرية، من الأعلى إلى الأسفل</span>
        <span class="hljs-title function_">siftDown</span>(nums, i, <span class="hljs-number">0</span>);
    }
}
</code></pre>
</div>
<h2 id="خصائص-الخوارزمية">خصائص الخوارزمية</h2>
<ul>
<li><strong>التعقيد الزمني $O(n \\log n)$؛ الترتيب بالكومة غير تكيّفي (non-adaptive)</strong>: يستغرق بناء الكومة زمن $O(n)$. ويستغرق استخراج أكبر عنصر من الكومة زمن $O(\\log n)$، ويتكرر ذلك $n - 1$ من الجولات.</li>
<li><strong>التعقيد المكاني $O(1)$؛ الترتيب بالكومة في المكان (in-place)</strong>: تستهلك بضع متغيرات من نوع المؤشر مساحة $O(1)$. وتُنفَّذ مبادلة العناصر وإعادة بناء الكومة على المصفوفة الأصلية.</li>
<li><strong>ترتيب غير مستقر</strong>: عند مبادلة عنصر قمة الكومة بعنصر قاعدة الكومة، قد تتغير المواضع النسبية للعناصر المتساوية.</li>
</ul>
`,e={book:s,chapter:n,chapterTitle:a,slug:l,title:p,headings:t,html:c};export{s as book,n as chapter,a as chapterTitle,e as default,t as headings,c as html,l as slug,p as title};
