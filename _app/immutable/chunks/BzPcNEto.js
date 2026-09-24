const s="hello-algo",n="chapter_sorting",a="الترتيب",l="bubble_sort",p="ترتيب الفقاعات",t=[{depth:2,id:"سير-الخوارزمية",text:"سير الخوارزمية"},{depth:2,id:"تحسين-الكفاءة",text:"تحسين الكفاءة"},{depth:2,id:"خصائص-الخوارزمية",text:"خصائص الخوارزمية"}],c=`<p><u>ترتيب الفقاعات</u> (bubble sort) خوارزمية ترتّب مصفوفة بمقارنة العناصر المتجاورة وتبديلها باستمرار. تشبه هذه العملية فقاعات تصعد من الأسفل إلى الأعلى، ومن هنا جاء اسم ترتيب الفقاعات.</p>
<p>وكما يوضح الشكل أدناه، يمكن محاكاة عملية التفقيع بتبديل العناصر: بدءاً من الطرف الأيسر للمصفوفة والاجتياز نحو اليمين، قارن كل زوج من العناصر المتجاورة، وإذا كان &quot;العنصر الأيسر &gt; العنصر الأيمن&quot; فبدّلهما. وبعد اكتمال الاجتياز، يكون أكبر عنصر قد انتقل إلى الطرف الأيمن للمصفوفة.</p>
<h2 id="سير-الخوارزمية">سير الخوارزمية</h2>
<p>لنفترض أن طول المصفوفة $n$. وتُعرض خطوات ترتيب الفقاعات في الشكل أدناه.</p>
<ol>
<li>أولاً، نفّذ &quot;التفقيع&quot; على $n$ عنصراً، <strong>فتبدّل أكبر عنصر في المصفوفة إلى موضعه الصحيح</strong>.</li>
<li>ثم نفّذ &quot;التفقيع&quot; على العناصر $n - 1$ المتبقية، <strong>فتبدّل ثاني أكبر عنصر إلى موضعه الصحيح</strong>.</li>
<li>وهكذا. بعد $n - 1$ جولة من &quot;التفقيع&quot;، <strong>تكون أكبر $n - 1$ عنصراً قد بدّلت جميعها إلى مواضعها الصحيحة</strong>.</li>
<li>العنصر الوحيد المتبقي لا بد أن يكون أصغر عنصر، ولا يحتاج إلى ترتيب، وبذلك يكتمل ترتيب المصفوفة.</li>
</ol>
<p><img src="/images/hello-algo/chapter_sorting--bubble_sort_overview.png" alt="سير ترتيب الفقاعات"></p>
<p>مثال الشيفرة كما يلي:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* ترتيب الفقاعات */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">bubbleSort</span><span class="hljs-params">(nums []<span class="hljs-type">int</span>)</span></span> {
	<span class="hljs-comment">// الحلقة الخارجية: المجال غير المرتب هو [0, i]</span>
	<span class="hljs-keyword">for</span> i := <span class="hljs-built_in">len</span>(nums) - <span class="hljs-number">1</span>; i &gt; <span class="hljs-number">0</span>; i-- {
		<span class="hljs-comment">// الحلقة الداخلية: بدّل أكبر عنصر في المجال غير المرتب [0, i] إلى الطرف الأيمن من ذلك المجال</span>
		<span class="hljs-keyword">for</span> j := <span class="hljs-number">0</span>; j &lt; i; j++ {
			<span class="hljs-keyword">if</span> nums[j] &gt; nums[j+<span class="hljs-number">1</span>] {
				<span class="hljs-comment">// بدّل nums[j] و nums[j + 1]</span>
				nums[j], nums[j+<span class="hljs-number">1</span>] = nums[j+<span class="hljs-number">1</span>], nums[j]
			}
		}
	}
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* ترتيب الفقاعات */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">bubbleSort</span>(<span class="hljs-params"><span class="hljs-attr">nums</span>: <span class="hljs-built_in">number</span>[]</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-comment">// الحلقة الخارجية: المجال غير المرتب هو [0, i]</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = nums.<span class="hljs-property">length</span> - <span class="hljs-number">1</span>; i &gt; <span class="hljs-number">0</span>; i--) {
        <span class="hljs-comment">// الحلقة الداخلية: بدّل أكبر عنصر في المجال غير المرتب [0, i] إلى الطرف الأيمن من ذلك المجال</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j &lt; i; j++) {
            <span class="hljs-keyword">if</span> (nums[j] &gt; nums[j + <span class="hljs-number">1</span>]) {
                <span class="hljs-comment">// بدّل nums[j] و nums[j + 1]</span>
                <span class="hljs-keyword">let</span> tmp = nums[j];
                nums[j] = nums[j + <span class="hljs-number">1</span>];
                nums[j + <span class="hljs-number">1</span>] = tmp;
            }
        }
    }
}
</code></pre>
</div>
<h2 id="تحسين-الكفاءة">تحسين الكفاءة</h2>
<p>يمكننا أن نلاحظ أنه إذا لم يحدث أي تبديل خلال جولة &quot;تفقيع&quot;، فالمصفوفة مرتبة بالفعل ويمكن للخوارزمية أن تعود فوراً. لذلك يمكننا إضافة علامة <code>flag</code> لكشف هذا الوضع والإنهاء بمجرد حدوثه.</p>
<p>بعد هذا التحسين، يبقى التعقيد الزمني لترتيب الفقاعات في أسوأ الحالات ومتوسطها $O(n^2)$؛ غير أنه عندما تكون مصفوفة الإدخال مرتبة بالفعل، يصبح التعقيد الزمني في أفضل الحالات $O(n)$.</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* ترتيب الفقاعات (تحسين العلامة) */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">bubbleSortWithFlag</span><span class="hljs-params">(nums []<span class="hljs-type">int</span>)</span></span> {
	<span class="hljs-comment">// الحلقة الخارجية: المجال غير المرتب هو [0, i]</span>
	<span class="hljs-keyword">for</span> i := <span class="hljs-built_in">len</span>(nums) - <span class="hljs-number">1</span>; i &gt; <span class="hljs-number">0</span>; i-- {
		flag := <span class="hljs-literal">false</span> <span class="hljs-comment">// هيّئ العلامة</span>
		<span class="hljs-comment">// الحلقة الداخلية: بدّل أكبر عنصر في المجال غير المرتب [0, i] إلى الطرف الأيمن من ذلك المجال</span>
		<span class="hljs-keyword">for</span> j := <span class="hljs-number">0</span>; j &lt; i; j++ {
			<span class="hljs-keyword">if</span> nums[j] &gt; nums[j+<span class="hljs-number">1</span>] {
				<span class="hljs-comment">// بدّل nums[j] و nums[j + 1]</span>
				nums[j], nums[j+<span class="hljs-number">1</span>] = nums[j+<span class="hljs-number">1</span>], nums[j]
				flag = <span class="hljs-literal">true</span> <span class="hljs-comment">// سجّل تبديل العنصر</span>
			}
		}
		<span class="hljs-keyword">if</span> flag == <span class="hljs-literal">false</span> { <span class="hljs-comment">// لم تُبدَّل أي عناصر في هذه الجولة من &quot;التفقيع&quot;، اخرج مباشرة</span>
			<span class="hljs-keyword">break</span>
		}
	}
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* ترتيب الفقاعات (تحسين العلامة) */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">bubbleSortWithFlag</span>(<span class="hljs-params"><span class="hljs-attr">nums</span>: <span class="hljs-built_in">number</span>[]</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-comment">// الحلقة الخارجية: المجال غير المرتب هو [0, i]</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = nums.<span class="hljs-property">length</span> - <span class="hljs-number">1</span>; i &gt; <span class="hljs-number">0</span>; i--) {
        <span class="hljs-keyword">let</span> flag = <span class="hljs-literal">false</span>; <span class="hljs-comment">// هيّئ العلامة</span>
        <span class="hljs-comment">// الحلقة الداخلية: بدّل أكبر عنصر في المجال غير المرتب [0, i] إلى الطرف الأيمن من ذلك المجال</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j &lt; i; j++) {
            <span class="hljs-keyword">if</span> (nums[j] &gt; nums[j + <span class="hljs-number">1</span>]) {
                <span class="hljs-comment">// بدّل nums[j] و nums[j + 1]</span>
                <span class="hljs-keyword">let</span> tmp = nums[j];
                nums[j] = nums[j + <span class="hljs-number">1</span>];
                nums[j + <span class="hljs-number">1</span>] = tmp;
                flag = <span class="hljs-literal">true</span>; <span class="hljs-comment">// سجّل تبديل العنصر</span>
            }
        }
        <span class="hljs-keyword">if</span> (!flag) <span class="hljs-keyword">break</span>; <span class="hljs-comment">// لم تُبدَّل أي عناصر في هذه الجولة من &quot;التفقيع&quot;، اخرج مباشرة</span>
    }
}
</code></pre>
</div>
<h2 id="خصائص-الخوارزمية">خصائص الخوارزمية</h2>
<ul>
<li><strong>التعقيد الزمني $O(n^2)$؛ ترتيب تكيّفي (adaptive)</strong>: في الجولات المتتالية من &quot;التفقيع&quot;، تبلغ أطوال الجزء المجتاز من المصفوفة $n - 1$ و$n - 2$ و$\\dots$ و$2$ و$1$، أي مجموع $(n - 1) n / 2$. وبعد إدخال تحسين <code>flag</code>، يمكن أن يصل التعقيد الزمني في أفضل الحالات إلى $O(n)$.</li>
<li><strong>التعقيد المكاني $O(1)$، ترتيب في المكان (in-place)</strong>: يستخدم المؤشران $i$ و$j$ مقداراً ثابتاً من المساحة الإضافية.</li>
<li><strong>ترتيب مستقر</strong>: لا تُبدَّل العناصر المتساوية أثناء &quot;التفقيع&quot;.</li>
</ul>
`,e={book:s,chapter:n,chapterTitle:a,slug:l,title:p,headings:t,html:c};export{s as book,n as chapter,a as chapterTitle,e as default,t as headings,c as html,l as slug,p as title};
