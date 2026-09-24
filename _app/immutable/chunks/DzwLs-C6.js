const s="hello-algo",n="chapter_sorting",l="الترتيب",a="merge_sort",t="ترتيب الدمج",e=[{depth:2,id:"سير-الخوارزمية",text:"سير الخوارزمية"},{depth:2,id:"خصائص-الخوارزمية",text:"خصائص الخوارزمية"},{depth:2,id:"ترتيب-القوائم-المترابطة",text:"ترتيب القوائم المترابطة"}],p=`<p><u>ترتيب الدمج</u> (merge sort) خوارزمية ترتيب قائمة على استراتيجية تقسيم وتغلب، وتتألف من مرحلتي &quot;التقسيم&quot; و&quot;الدمج&quot; الموضحتين في الشكل أدناه.</p>
<ol>
<li><strong>مرحلة التقسيم</strong>: قسّم المصفوفة تعاودياً عند نقطة المنتصف، مما يختزل مسألة ترتيب مصفوفة طويلة إلى مسألة ترتيب مصفوفات أقصر.</li>
<li><strong>مرحلة الدمج</strong>: عندما يصبح طول المصفوفة الفرعية 1، توقف عن التقسيم وابدأ الدمج، بدمج المصفوفات الفرعية المرتبة الأقصر على اليسار واليمين باستمرار في مصفوفة مرتبة أطول حتى تكتمل العملية.</li>
</ol>
<p><img src="/images/hello-algo/chapter_sorting--merge_sort_overview.png" alt="مرحلتا التقسيم والدمج في ترتيب الدمج"></p>
<h2 id="سير-الخوارزمية">سير الخوارزمية</h2>
<p>كما يوضح الشكل أدناه، تقسم &quot;مرحلة التقسيم&quot; المصفوفة تعاودياً من نقطة المنتصف إلى مصفوفتين فرعيتين من الأعلى إلى الأسفل.</p>
<ol>
<li>احسب منتصف المصفوفة <code>mid</code>، وقسّم تعاودياً المصفوفة الفرعية اليسرى (المجال <code>[left, mid]</code>) والمصفوفة الفرعية اليمنى (المجال <code>[mid + 1, right]</code>).</li>
<li>كرر الخطوة <code>1.</code> تعاودياً حتى يصبح طول المصفوفة الفرعية 1.</li>
</ol>
<p>تدمج &quot;مرحلة الدمج&quot; المصفوفتين الفرعيتين اليسرى واليمنى في مصفوفة مرتبة من الأسفل إلى الأعلى. لاحظ أن الدمج يبدأ من المصفوفات الفرعية ذات الطول 1، لذا فإن كل مصفوفة فرعية تشارك في هذه المرحلة مرتبة بالفعل.</p>
<p>يتوافق الترتيب التعاودي لترتيب الدمج مع الاجتياز اللاحق لشجرة ثنائية.</p>
<ul>
<li><strong>الاجتياز اللاحق</strong>: اجتَز الشجرة الفرعية اليسرى تعاودياً أولاً، ثم اجتَز الشجرة الفرعية اليمنى تعاودياً، وأخيراً عالج العقدة الجذرية.</li>
<li><strong>ترتيب الدمج</strong>: عالج المصفوفة الفرعية اليسرى تعاودياً أولاً، ثم عالج المصفوفة الفرعية اليمنى تعاودياً، وأخيراً نفّذ الدمج.</li>
</ul>
<p>يُعرض تنفيذ ترتيب الدمج في الشيفرة أدناه. لاحظ أن المجال المراد دمجه في <code>nums</code> هو <code>[left, right]</code>، بينما المجال المقابل في <code>tmp</code> هو <code>[0, right - left]</code>.</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* ترتيب الدمج */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">mergeSort</span><span class="hljs-params">(nums []<span class="hljs-type">int</span>, left, right <span class="hljs-type">int</span>)</span></span> {
	<span class="hljs-comment">// شرط الإنهاء</span>
	<span class="hljs-keyword">if</span> left &gt;= right {
		<span class="hljs-keyword">return</span>
	}
	<span class="hljs-comment">// مرحلة التقسيم والدمج</span>
	mid := left + (right - left) / <span class="hljs-number">2</span>
	mergeSort(nums, left, mid)
	mergeSort(nums, mid+<span class="hljs-number">1</span>, right)
	<span class="hljs-comment">// مرحلة الدمج</span>
	merge(nums, left, mid, right)
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* ترتيب الدمج */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">mergeSort</span>(<span class="hljs-params"><span class="hljs-attr">nums</span>: <span class="hljs-built_in">number</span>[], <span class="hljs-attr">left</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">right</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-comment">// شرط الإنهاء</span>
    <span class="hljs-keyword">if</span> (left &gt;= right) <span class="hljs-keyword">return</span>; <span class="hljs-comment">// أنهِ التعاود عندما يصبح طول المصفوفة الفرعية 1</span>
    <span class="hljs-comment">// مرحلة التقسيم والدمج</span>
    <span class="hljs-keyword">let</span> mid = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(left + (right - left) / <span class="hljs-number">2</span>); <span class="hljs-comment">// احسب نقطة المنتصف</span>
    <span class="hljs-title function_">mergeSort</span>(nums, left, mid); <span class="hljs-comment">// عالج المصفوفة الفرعية اليسرى تعاودياً</span>
    <span class="hljs-title function_">mergeSort</span>(nums, mid + <span class="hljs-number">1</span>, right); <span class="hljs-comment">// عالج المصفوفة الفرعية اليمنى تعاودياً</span>
    <span class="hljs-comment">// مرحلة الدمج</span>
    <span class="hljs-title function_">merge</span>(nums, left, mid, right);
}
</code></pre>
</div>
<h2 id="خصائص-الخوارزمية">خصائص الخوارزمية</h2>
<ul>
<li><strong>التعقيد الزمني $O(n \\log n)$؛ ترتيب الدمج غير تكيّفي (non-adaptive)</strong>: تنتج مرحلة التقسيم شجرة تعاود بارتفاع $\\log n$، ويبلغ إجمالي عدد العمليات المنفذة أثناء الدمج في كل مستوى $n$، لذا فإن التعقيد الزمني الكلي هو $O(n \\log n)$.</li>
<li><strong>التعقيد المكاني $O(n)$؛ ترتيب الدمج ليس في المكان (in-place)</strong>: عمق التعاود $\\log n$، وهو ما يستهلك مساحة إطارات المكدس $O(\\log n)$. وتتطلب عملية الدمج مصفوفة مساعدة تستهلك مساحة إضافية $O(n)$.</li>
<li><strong>ترتيب مستقر</strong>: أثناء الدمج، يبقى الترتيب النسبي للعناصر المتساوية دون تغيير.</li>
</ul>
<h2 id="ترتيب-القوائم-المترابطة">ترتيب القوائم المترابطة</h2>
<p>بالنسبة إلى القوائم المترابطة، يتمتع ترتيب الدمج بمزايا كبيرة على خوارزميات الترتيب الأخرى، <strong>كما يمكنه تقليل التعقيد المكاني لمهمة الترتيب إلى $O(1)$</strong>.</p>
<ul>
<li><strong>مرحلة التقسيم</strong>: يمكن استخدام التكرار بدلاً من التعاود لتقسيم القائمة المترابطة، وبذلك تُلغى مساحة إطارات المكدس التي يستهلكها التعاود.</li>
<li><strong>مرحلة الدمج</strong>: في القوائم المترابطة، لا يتطلب إدراج العقد وحذفها سوى تحديث المؤشرات، لذا لا تحتاج مرحلة الدمج (دمج قائمتين مترابطتين مرتبتين قصيرتين في قائمة مترابطة مرتبة أطول) إلى إنشاء قائمة مترابطة إضافية.</li>
</ul>
<p>تفاصيل التنفيذ المحددة معقدة إلى حد كبير، ويمكن للقارئ المهتم الرجوع إلى المواد ذات الصلة للتعلّم.</p>
`,o={book:s,chapter:n,chapterTitle:l,slug:a,title:t,headings:e,html:p};export{s as book,n as chapter,l as chapterTitle,o as default,e as headings,p as html,a as slug,t as title};
