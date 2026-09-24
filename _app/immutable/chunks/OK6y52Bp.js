const s="hello-algo",n="chapter_sorting",a="الترتيب",l="radix_sort",p="الترتيب الجذري",t=[{depth:2,id:"سير-الخوارزمية",text:"سير الخوارزمية"},{depth:2,id:"خصائص-الخوارزمية",text:"خصائص الخوارزمية"}],c=`<p>قدّم القسم السابق الترتيب بالعد، وهو مناسب عندما يكون عدد العناصر $n$ كبيراً بينما يكون نطاق القيم $m$ صغيراً. لنفترض أننا نحتاج إلى ترتيب $n = 10^6$ من أرقام الطلاب، حيث يتكوّن كل رقم منها من 8 خانات. عندئذ يكون نطاق القيم $m = 10^8$ كبيراً جداً. فاستخدام الترتيب بالعد سيتطلب كمية كبيرة من الذاكرة، بينما يتجنّب الترتيب الجذري هذه المشكلة.</p>
<p><u>الترتيب الجذري</u> (radix sort) قائم على الفكرة الجوهرية نفسها التي يقوم عليها الترتيب بالعد: فهو أيضاً يرتّب عبر عدّ مرات الظهور. وبناءً على ذلك، يستغل الترتيب الجذري علاقة الخانات بعضها ببعض، ويرتّب خانة واحدة في كل مرة للحصول على النتيجة النهائية.</p>
<h2 id="سير-الخوارزمية">سير الخوارزمية</h2>
<p>باتخاذ بيانات أرقام الطلاب مثالاً، لنفترض أن أقل خانة هي الخانة $1$ وأعلى خانة هي الخانة $8$. ويوضح الشكل أدناه سير الترتيب الجذري.</p>
<ol>
<li>هيّئ الخانة $k = 1$.</li>
<li>نفّذ «الترتيب بالعد» على الخانة $k$ من أرقام الطلاب. وبعد اكتماله، ستكون البيانات مرتّبة من الأصغر إلى الأكبر وفقاً للخانة $k$.</li>
<li>زد $k$ بمقدار $1$، ثم ارجع إلى الخطوة <code>2.</code> وواصل التكرار حتى تُرتَّب جميع الخانات، وعندها تنتهي العملية.</li>
</ol>
<p><img src="/images/hello-algo/chapter_sorting--radix_sort_overview.png" alt="سير خوارزمية الترتيب الجذري"></p>
<p>لننظر الآن إلى الشيفرة. بالنسبة إلى عدد $x$ في الأساس $d$، يمكن الحصول على خانته $k$ ورمزها $x_k$ بالصيغة التالية:</p>
<p>$$
x_k = \\lfloor\\frac{x}{d^{k-1}}\\rfloor \\bmod d
$$</p>
<p>هنا، يشير الرمز $\\lfloor a \\rfloor$ إلى تقريب العدد العشري العائم $a$ نحو الأسفل، ويشير $\\bmod : d$ إلى أخذ الباقي بالقياس $d$. وبالنسبة إلى بيانات أرقام الطلاب، $d = 10$ و$k \\in [1, 8]$.</p>
<p>وبالإضافة إلى ذلك، نحتاج إلى تعديل شيفرة الترتيب بالعد تعديلاً طفيفاً لتجعلها ترتّب استناداً إلى الخانة $k$ من العدد:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* الترتيب الجذري */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">radixSort</span><span class="hljs-params">(nums []<span class="hljs-type">int</span>)</span></span> {
	<span class="hljs-comment">// احصل على أكبر عنصر في المصفوفة، لتحديد الحد الأقصى لعدد الخانات</span>
	max := math.MinInt
	<span class="hljs-keyword">for</span> _, num := <span class="hljs-keyword">range</span> nums {
		<span class="hljs-keyword">if</span> num &gt; max {
			max = num
		}
	}
	<span class="hljs-comment">// اجتز الخانات من الأقل إلى الأعلى</span>
	<span class="hljs-keyword">for</span> exp := <span class="hljs-number">1</span>; max &gt;= exp; exp *= <span class="hljs-number">10</span> {
		<span class="hljs-comment">// نفّذ الترتيب بالعد على الخانة k من عناصر المصفوفة</span>
		<span class="hljs-comment">// k = 1 -&gt; exp = 1</span>
		<span class="hljs-comment">// k = 2 -&gt; exp = 10</span>
		<span class="hljs-comment">// أي exp = 10^(k-1)</span>
		countingSortDigit(nums, exp)
	}
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* الترتيب الجذري */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">radixSort</span>(<span class="hljs-params"><span class="hljs-attr">nums</span>: <span class="hljs-built_in">number</span>[]</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-comment">// احصل على أكبر عنصر في المصفوفة، لتحديد الحد الأقصى لعدد الخانات</span>
    <span class="hljs-keyword">let</span> <span class="hljs-attr">m</span>: <span class="hljs-built_in">number</span> = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(... nums);
    <span class="hljs-comment">// اجتز الخانات من الأقل إلى الأعلى</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> exp = <span class="hljs-number">1</span>; exp &lt;= m; exp *= <span class="hljs-number">10</span>) {
        <span class="hljs-comment">// نفّذ الترتيب بالعد على الخانة k من عناصر المصفوفة</span>
        <span class="hljs-comment">// k = 1 -&gt; exp = 1</span>
        <span class="hljs-comment">// k = 2 -&gt; exp = 10</span>
        <span class="hljs-comment">// أي exp = 10^(k-1)</span>
        <span class="hljs-title function_">countingSortDigit</span>(nums, exp);
    }
}
</code></pre>
</div>
<div class="note">
<p class="note__title">لماذا نبدأ الترتيب من أقل خانة؟</p>
<p>في جولات الترتيب المتعاقبة، تتجاوز الجولة اللاحقة نتيجة الجولة السابقة. فمثلاً، إذا أسفرت الجولة الأولى عن $a &lt; b$ لكن أسفرت الجولة الثانية عن $a &gt; b$، فإن نتيجة الجولة الثانية هي التي تسود. ولأن الخانات العليا ذات أولوية أعلى من الخانات الدنيا، ينبغي أن نرتّب الخانات الدنيا أولاً ثم الخانات العليا.</p>
</div>
<h2 id="خصائص-الخوارزمية">خصائص الخوارزمية</h2>
<p>مقارنةً بالترتيب بالعد، يناسب الترتيب الجذري نطاقات قيم أكبر، <strong>لكنه لا يصلح إلا عندما يمكن تمثيل البيانات بعدد ثابت من الخانات ولا يكون عدد الخانات كبيراً جداً</strong>. فمثلاً، لا تناسب الأعداد العشرية العائمة الترتيب الجذري لأن عدد الخانات $k$ قد يكون كبيراً جداً، مما قد يؤدي إلى تعقيد زمني $O(nk) \\gg O(n^2)$.</p>
<ul>
<li><strong>التعقيد الزمني $O(nk)$، وترتيب غير تكيّفي (non-adaptive)</strong>: ليكن عدد العناصر $n$، ولتُمثَّل القيم في الأساس $d$، وليكن الحد الأقصى لعدد الخانات $k$. يستغرق الترتيب بالعد لخانة واحدة زمن $O(n + d)$، لذا يستغرق ترتيب الخانات $k$ كلها زمن $O((n + d)k)$. ومن الناحية العملية، يكون $d$ و$k$ صغيرين نسبياً عادةً، لذا يقترب التعقيد الزمني الإجمالي من $O(n)$.</li>
<li><strong>التعقيد المكاني $O(n + d)$، وترتيب ليس في المكان (non-in-place)</strong>: مثل الترتيب بالعد، يحتاج الترتيب الجذري إلى المصفوفتين المساعدتين <code>res</code> و<code>counter</code> بطولين $n$ و$d$.</li>
<li><strong>ترتيب مستقر</strong>: عندما يكون الترتيب بالعد مستقراً، يكون الترتيب الجذري مستقراً أيضاً؛ وعندما يكون الترتيب بالعد غير مستقر، لا يستطيع الترتيب الجذري ضمان نتائج ترتيب صحيحة.</li>
</ul>
`,o={book:s,chapter:n,chapterTitle:a,slug:l,title:p,headings:t,html:c};export{s as book,n as chapter,a as chapterTitle,o as default,t as headings,c as html,l as slug,p as title};
