const s="hello-algo",n="chapter_sorting",a="الترتيب",l="insertion_sort",p="ترتيب الإدراج",t=[{depth:2,id:"سير-الخوارزمية",text:"سير الخوارزمية"},{depth:2,id:"خصائص-الخوارزمية",text:"خصائص الخوارزمية"},{depth:2,id:"مزايا-ترتيب-الإدراج",text:"مزايا ترتيب الإدراج"}],e=`<p><u>ترتيب الإدراج</u> (insertion sort) خوارزمية ترتيب بسيطة، ويعمل عملها على نحو شبيه جداً بعملية ترتيب مجموعة من البطاقات يدوياً.</p>
<p>وتحديداً، نختار عنصراً أساسياً من الجزء غير المرتب، ونقارنه واحداً واحداً بالعناصر في الجزء المرتب الواقع على يساره، ثم ندرجه في موضعه الصحيح.</p>
<p>ويوضح الشكل أدناه كيفية إدراج عنصر في مصفوفة. ولنكن العنصر الأساسي <code>base</code>. نحتاج إلى إزاحة جميع العناصر الواقعة بين الفهرس المستهدف و<code>base</code> موضعاً واحداً إلى اليمين، ثم إسناد <code>base</code> إلى الفهرس المستهدف.</p>
<p><img src="/images/hello-algo/chapter_sorting--insertion_operation.png" alt="عملية إدراج واحدة"></p>
<h2 id="سير-الخوارزمية">سير الخوارزمية</h2>
<p>يوضح الشكل أدناه السير العام لترتيب الإدراج.</p>
<ol>
<li>في البداية يكون العنصر الأول من المصفوفة مرتباً بالفعل.</li>
<li>اختر العنصر الثاني من المصفوفة عنصراً أساسياً <code>base</code>، وبعد إدراجه في موضعه الصحيح <strong>يصبح العنصران الأولان من المصفوفة مرتبين</strong>.</li>
<li>اختر العنصر الثالث عنصراً أساسياً <code>base</code>، وبعد إدراجه في موضعه الصحيح <strong>تصبح العناصر الثلاثة الأولى من المصفوفة مرتبة</strong>.</li>
<li>وهكذا دواليك. في الجولة الأخيرة، اختر العنصر الأخير عنصراً أساسياً <code>base</code>، وبعد إدراجه في موضعه الصحيح <strong>تصبح جميع العناصر مرتبة</strong>.</li>
</ol>
<p><img src="/images/hello-algo/chapter_sorting--insertion_sort_overview.png" alt="سير ترتيب الإدراج"></p>
<p>وتظهر الشيفرة المثالية أدناه:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* ترتيب الإدراج */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">insertionSort</span><span class="hljs-params">(nums []<span class="hljs-type">int</span>)</span></span> {
	<span class="hljs-comment">// الحلقة الخارجية: المجال المرتب هو [0, i-1]</span>
	<span class="hljs-keyword">for</span> i := <span class="hljs-number">1</span>; i &lt; <span class="hljs-built_in">len</span>(nums); i++ {
		base := nums[i]
		j := i - <span class="hljs-number">1</span>
		<span class="hljs-comment">// الحلقة الداخلية: أدرج base في موضعه الصحيح ضمن المجال المرتب [0, i-1]</span>
		<span class="hljs-keyword">for</span> j &gt;= <span class="hljs-number">0</span> &amp;&amp; nums[j] &gt; base {
			nums[j+<span class="hljs-number">1</span>] = nums[j] <span class="hljs-comment">// أزح nums[j] موضعاً واحداً إلى اليمين</span>
			j--
		}
		nums[j+<span class="hljs-number">1</span>] = base <span class="hljs-comment">// أسند base إلى الموضع الصحيح</span>
	}
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* ترتيب الإدراج */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">insertionSort</span>(<span class="hljs-params"><span class="hljs-attr">nums</span>: <span class="hljs-built_in">number</span>[]</span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-comment">// الحلقة الخارجية: المجال المرتب هو [0, i-1]</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">1</span>; i &lt; nums.<span class="hljs-property">length</span>; i++) {
        <span class="hljs-keyword">const</span> base = nums[i];
        <span class="hljs-keyword">let</span> j = i - <span class="hljs-number">1</span>;
        <span class="hljs-comment">// الحلقة الداخلية: أدرج base في موضعه الصحيح ضمن المجال المرتب [0, i-1]</span>
        <span class="hljs-keyword">while</span> (j &gt;= <span class="hljs-number">0</span> &amp;&amp; nums[j] &gt; base) {
            nums[j + <span class="hljs-number">1</span>] = nums[j]; <span class="hljs-comment">// أزح nums[j] موضعاً واحداً إلى اليمين</span>
            j--;
        }
        nums[j + <span class="hljs-number">1</span>] = base; <span class="hljs-comment">// أسند base إلى الموضع الصحيح</span>
    }
}
</code></pre>
</div>
<h2 id="خصائص-الخوارزمية">خصائص الخوارزمية</h2>
<ul>
<li><strong>التعقيد الزمني $O(n^2)$؛ ترتيب تكيّفي (adaptive)</strong>: في أسوأ حالة تتطلب عمليات الإدراج $n - 1$ و$n-2$ و$\\dots$ و$2$ و$1$ تكرار على التوالي، ومجموعها $(n - 1) n / 2$، لذا يكون التعقيد الزمني $O(n^2)$. وعندما تكون البيانات مرتبة بالفعل، تنتهي كل عملية إدراج مبكراً. وعندما تكون مصفوفة الإدخال مرتبة تماماً، يحقق ترتيب الإدراج أفضل تعقيد زمني له $O(n)$.</li>
<li><strong>التعقيد المكاني $O(1)$؛ ترتيب في المكان (in-place)</strong>: يستخدم المؤشران $i$ و$j$ مقداراً ثابتاً من المساحة الإضافية.</li>
<li><strong>ترتيب مستقر</strong>: أثناء الإدراج نضع العناصر على يمين العناصر المساوية لها، فيبقى ترتيبها النسبي دون تغيير.</li>
</ul>
<h2 id="مزايا-ترتيب-الإدراج">مزايا ترتيب الإدراج</h2>
<p>التعقيد الزمني لترتيب الإدراج هو $O(n^2)$، بينما التعقيد الزمني للترتيب السريع (quick sort)، الذي سنتعلّمه لاحقاً، هو $O(n \\log n)$. ورغم أن التعقيد الزمني لترتيب الإدراج أعلى، فإنه <strong>عادةً أسرع على مجموعات البيانات الصغيرة</strong>.</p>
<p>وهذا الاستنتاج شبيه بالاستنتاج المتعلق بالحالات التي يصلح فيها البحث الخطي والبحث الثنائي. فالخوارزميات مثل الترتيب السريع ذي التعقيد $O(n \\log n)$ هي خوارزميات ترتيب قائمة على تقسيم وتغلب، وغالباً ما تتضمن عمليات أولية أكثر. وعندما تكون مجموعة البيانات صغيرة، تكون قيمتا $n^2$ و$n \\log n$ متقاربتين نسبياً، فلا يهيمن التعقيد المقارب، بل يصبح عدد العمليات الأولية في كل جولة هو العامل الحاسم.</p>
<p>وفي الواقع، تستخدم دوال الترتيب المدمجة في كثير من لغات البرمجة (مثل Java) ترتيب الإدراج. والفكرة العامة هي: للمصفوفات الكبيرة استخدم خوارزميات ترتيب قائمة على تقسيم وتغلب مثل الترتيب السريع؛ وللمصفوفات القصيرة استخدم ترتيب الإدراج مباشرة.</p>
<p>ورغم أن ترتيب الفقاعات وترتيب الاختيار وترتيب الإدراج جميعها بتعقيد زمني $O(n^2)$، فإن ترتيب الإدراج <strong>يُستخدم فعلياً أكثر بكثير من ترتيب الفقاعات وترتيب الاختيار</strong>، للأسباب التالية أساساً.</p>
<ul>
<li>يُنفَّذ ترتيب الفقاعات عبر تبديل العناصر، وهو ما يتطلب متغيراً مؤقتاً ويتضمن $3$ عمليات أولية؛ أما ترتيب الإدراج فيُنفَّذ عبر إسناد العناصر ويتطلب عملية أولية واحدة فقط. لذلك <strong>تكون التكلفة الحسابية لترتيب الفقاعات عادةً أعلى من ترتيب الإدراج</strong>.</li>
<li>التعقيد الزمني لترتيب الاختيار هو $O(n^2)$ في جميع الحالات. <strong>وإذا أُعطيت مجموعة من البيانات المرتبة جزئياً، كان ترتيب الإدراج عادةً أكفأ من ترتيب الاختيار</strong>.</li>
<li>ترتيب الاختيار غير مستقر ولا يمكن تطبيقه على الترتيب متعدد المستويات.</li>
</ul>
`,o={book:s,chapter:n,chapterTitle:a,slug:l,title:p,headings:t,html:e};export{s as book,n as chapter,a as chapterTitle,o as default,t as headings,e as html,l as slug,p as title};
