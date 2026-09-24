const s="hello-algo",n="chapter_backtracking",a="التتبّع الرجعي",t="subset_sum_problem",l="مسألة مجموع المجموعات الجزئية",p=[{depth:2,id:"بدون-عناصر-مكررة",text:"بدون عناصر مكررة"},{depth:3,id:"الاستعانة-بحل-التباديل-كمرجع",text:"الاستعانة بحل التباديل كمرجع"},{depth:3,id:"تشذيب-المجموعات-الجزئية-المكررة",text:"تشذيب المجموعات الجزئية المكررة"},{depth:3,id:"تنفيذ-الشيفرة",text:"تنفيذ الشيفرة"},{depth:2,id:"مع-وجود-عناصر-مكررة-في-المصفوفة",text:"مع وجود عناصر مكررة في المصفوفة"},{depth:3,id:"تشذيب-العناصر-المتساوية",text:"تشذيب العناصر المتساوية"},{depth:3,id:"تنفيذ-الشيفرة",text:"تنفيذ الشيفرة"}],e=`<h2 id="بدون-عناصر-مكررة">بدون عناصر مكررة</h2>
<div class="note">
<p>بمعطى مصفوفة أعداد صحيحة موجبة <code>nums</code> وعدد صحيح موجب مستهدف <code>target</code>، ابحث عن جميع التوليفات الممكنة التي يساوي مجموع عناصرها <code>target</code>. ولا تحتوي المصفوفة المعطاة على عناصر مكررة، ويمكن اختيار كل عنصر مراراً. وأعد هذه التوليفات على هيئة قائمة، على ألا تحتوي القائمة على توليفات مكررة.</p>
</div>
<p>على سبيل المثال، بمعطى المجموعة \${3, 4, 5}$ والعدد المستهدف $9$، تكون الحلول هي \${3, 3, 3}, {4, 5}$. ولاحظ النقطتين التاليتين:</p>
<ul>
<li>يمكن اختيار عناصر مجموعة الإدخال مراراً بلا حد.</li>
<li>لا تميّز المجموعات الجزئية ترتيب العناصر؛ فمثلاً \${4, 5}$ و\${5, 4}$ هما المجموعة الجزئية نفسها.</li>
</ul>
<h3 id="الاستعانة-بحل-التباديل-كمرجع">الاستعانة بحل التباديل كمرجع</h3>
<p>على غرار مسألة التباديل، يمكننا النظر إلى عملية توليد المجموعات الجزئية كنتيجة لسلسلة من الاختيارات، وتحديث المجموع الجاري أثناء عملية الاختيار. وعندما يساوي المجموع <code>target</code>، نسجّل المجموعة الجزئية في قائمة النتائج.</p>
<p>وبخلاف مسألة التباديل، <strong>يمكن اختيار العناصر في هذه المسألة أي عدد من المرات</strong>، لذا لا حاجة إلى استخدام قائمة منطقية <code>selected</code> لتتبّع ما إذا كان عنصر قد اختير بالفعل. وبتغييرات صغيرة على شيفرة التباديل نحصل على حل أولي:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* حل مجموع المجموعات الجزئية I (مع توليفات مكررة) */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">subsetSumINaive</span><span class="hljs-params">(nums []<span class="hljs-type">int</span>, target <span class="hljs-type">int</span>)</span></span> [][]<span class="hljs-type">int</span> {
	state := <span class="hljs-built_in">make</span>([]<span class="hljs-type">int</span>, <span class="hljs-number">0</span>) <span class="hljs-comment">// الحالة (المجموعة الجزئية)</span>
	total := <span class="hljs-number">0</span>              <span class="hljs-comment">// مجموع المجموعة الجزئية</span>
	res := <span class="hljs-built_in">make</span>([][]<span class="hljs-type">int</span>, <span class="hljs-number">0</span>) <span class="hljs-comment">// قائمة النتائج (قائمة المجموعات الجزئية)</span>
	backtrackSubsetSumINaive(total, target, &amp;state, &amp;nums, &amp;res)
	<span class="hljs-keyword">return</span> res
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* حل مجموع المجموعات الجزئية I (مع توليفات مكررة) */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">subsetSumINaive</span>(<span class="hljs-params"><span class="hljs-attr">nums</span>: <span class="hljs-built_in">number</span>[], <span class="hljs-attr">target</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">number</span>[][] {
    <span class="hljs-keyword">const</span> state = []; <span class="hljs-comment">// الحالة (المجموعة الجزئية)</span>
    <span class="hljs-keyword">const</span> total = <span class="hljs-number">0</span>; <span class="hljs-comment">// مجموع المجموعة الجزئية</span>
    <span class="hljs-keyword">const</span> res = []; <span class="hljs-comment">// قائمة النتائج (قائمة المجموعات الجزئية)</span>
    <span class="hljs-title function_">backtrack</span>(state, target, total, nums, res);
    <span class="hljs-keyword">return</span> res;
}
</code></pre>
</div>
<p>وبتشغيل الشيفرة أعلاه على المصفوفة $[3, 4, 5]$ بالقيمة المستهدفة $9$ نحصل على $[3, 3, 3], [4, 5], [5, 4]$. <strong>ورغم أننا نجحنا في العثور على جميع المجموعات الجزئية التي يساوي مجموعها $9$، فإن هناك مجموعتين جزئيتين مكررتين $[4, 5]$ و$[5, 4]$</strong>.</p>
<p>والسبب أن عملية البحث تميّز ترتيب الاختيارات، بينما لا تميّز المجموعات الجزئية ترتيب الاختيار. وكما يوضح الشكل أدناه، فاختيار 4 أولاً ثم 5 يختلف عن اختيار 5 أولاً ثم 4، وهما فرعان مختلفان لكنهما يقابلان المجموعة الجزئية نفسها.</p>
<p><img src="/images/hello-algo/chapter_backtracking--subset_sum_i_naive.png" alt="البحث في المجموعات الجزئية والتشذيب عند الحدود"></p>
<p>لإزالة المجموعات الجزئية المكررة، <strong>تُعَدّ إزالة التكرار من قائمة النتائج فكرة مباشرة</strong>. غير أن هذا النهج غير فعّال للغاية لسببين:</p>
<ul>
<li>عندما تكون عناصر المصفوفة كثيرة، خصوصاً عندما يكون <code>target</code> كبيراً، تولّد عملية البحث مجموعات جزئية مكررة كثيرة.</li>
<li>تستغرق مقارنة المجموعات الجزئية (المصفوفات) وقتاً طويلاً، إذ تتطلب ترتيب المصفوفات أولاً ثم مقارنة كل عنصر فيها.</li>
</ul>
<h3 id="تشذيب-المجموعات-الجزئية-المكررة">تشذيب المجموعات الجزئية المكررة</h3>
<p><strong>نفكّر في إزالة التكرار عبر التشذيب أثناء عملية البحث</strong>. وبمراقبة الشكل أدناه، تظهر المجموعات الجزئية المكررة عندما تُختار عناصر المصفوفة بترتيبات مختلفة، كما في الحالات التالية:</p>
<ol>
<li>عندما تختار الجولتان الأولى والثانية $3$ و$4$ على التوالي، تُولَّد جميع المجموعات الجزئية الحاوية هذين العنصرين، ويُرمز إليها بـ$[3, 4, \\dots]$.</li>
<li>بعد ذلك، عندما تختار الجولة الأولى $4$، <strong>ينبغي أن تتخطى الجولة الثانية $3$</strong>، لأن المجموعة الجزئية $[4, 3, \\dots]$ المولَّدة بهذا الاختيار نسخة مطابقة تماماً للمجموعة الجزئية المولَّدة في الخطوة <code>1.</code></li>
</ol>
<p>في عملية البحث تُجرَّب اختيارات كل مستوى من اليسار إلى اليمين، لذا تُشذَّب الفروع الواقعة في أقصى اليمين أكثر من غيرها.</p>
<ol>
<li>تختار الجولتان الأولى والثانية $3$ و$5$، فتتولّد المجموعة الجزئية $[3, 5, \\dots]$.</li>
<li>تختار الجولتان الأولى والثانية $4$ و$5$، فتتولّد المجموعة الجزئية $[4, 5, \\dots]$.</li>
<li>إذا اختارت الجولة الأولى $5$، <strong>ينبغي أن تتخطى الجولة الثانية $3$ و$4$</strong>، لأن المجموعتين الجزئيتين $[5, 3, \\dots]$ و$[5, 4, \\dots]$ نسختان مطابقتان تماماً للمجموعتين الجزئيتين الموصوفتين في الخطوتين <code>1.</code> و<code>2.</code></li>
</ol>
<p><img src="/images/hello-algo/chapter_backtracking--subset_sum_i_pruning.png" alt="ترتيبات اختيار مختلفة تؤدي إلى مجموعات جزئية مكررة"></p>
<p>وخلاصة القول، بمعطى مصفوفة إدخال $[x_1, x_2, \\dots, x_n]$، لتكن متتالية الاختيار في عملية البحث $[x_{i_1}, x_{i_2}, \\dots, x_{i_m}]$. ويجب أن تحقق متتالية الاختيار هذه $i_1 \\leq i_2 \\leq \\dots \\leq i_m$؛ <strong>وأي متتالية اختيار لا تحقق هذا الشرط ستؤدي إلى تكرارات وينبغي تشذيبها</strong>.</p>
<h3 id="تنفيذ-الشيفرة">تنفيذ الشيفرة</h3>
<p>لتنفيذ هذا التشذيب، نهيّئ متغيراً <code>start</code> للإشارة إلى نقطة بداية الاجتياز. <strong>وبعد اتخاذ الاختيار $x_{i}$، نجعل الجولة التالية تبدأ الاجتياز من الفهرس $i$</strong>. وهذا يضمن أن تحقق متتالية الاختيار $i_1 \\leq i_2 \\leq \\dots \\leq i_m$، بما يضمن تفرّد المجموعات الجزئية.</p>
<p>وإضافة إلى ذلك، أجرينا التحسينين التاليين على الشيفرة:</p>
<ul>
<li>قبل بدء البحث، رتّب المصفوفة <code>nums</code> أولاً. وعند اجتياز جميع الاختيارات، <strong>أنهِ الحلقة فوراً عندما يتجاوز مجموع المجموعة الجزئية <code>target</code></strong>، لأن العناصر اللاحقة أكبر، ومجموعها الجزئي سيتجاوز <code>target</code> حتماً.</li>
<li>احذف متغير مجموع العناصر <code>total</code> و<strong>استخدم الطرح من <code>target</code> لتتبّع مجموع العناصر</strong>. وسجّل الحل عندما يساوي <code>target</code> القيمة $0$.</li>
</ul>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* حل مجموع المجموعات الجزئية I */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">subsetSumI</span><span class="hljs-params">(nums []<span class="hljs-type">int</span>, target <span class="hljs-type">int</span>)</span></span> [][]<span class="hljs-type">int</span> {
	state := <span class="hljs-built_in">make</span>([]<span class="hljs-type">int</span>, <span class="hljs-number">0</span>) <span class="hljs-comment">// الحالة (المجموعة الجزئية)</span>
	sort.Ints(nums)         <span class="hljs-comment">// رتّب nums</span>
	start := <span class="hljs-number">0</span>              <span class="hljs-comment">// نقطة بداية الاجتياز</span>
	res := <span class="hljs-built_in">make</span>([][]<span class="hljs-type">int</span>, <span class="hljs-number">0</span>) <span class="hljs-comment">// قائمة النتائج (قائمة المجموعات الجزئية)</span>
	backtrackSubsetSumI(start, target, &amp;state, &amp;nums, &amp;res)
	<span class="hljs-keyword">return</span> res
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* حل مجموع المجموعات الجزئية I */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">subsetSumI</span>(<span class="hljs-params"><span class="hljs-attr">nums</span>: <span class="hljs-built_in">number</span>[], <span class="hljs-attr">target</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">number</span>[][] {
    <span class="hljs-keyword">const</span> state = []; <span class="hljs-comment">// الحالة (المجموعة الجزئية)</span>
    nums.<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a - b); <span class="hljs-comment">// رتّب nums</span>
    <span class="hljs-keyword">const</span> start = <span class="hljs-number">0</span>; <span class="hljs-comment">// نقطة بداية الاجتياز</span>
    <span class="hljs-keyword">const</span> res = []; <span class="hljs-comment">// قائمة النتائج (قائمة المجموعات الجزئية)</span>
    <span class="hljs-title function_">backtrack</span>(state, target, nums, start, res);
    <span class="hljs-keyword">return</span> res;
}
</code></pre>
</div>
<p>ويوضح الشكل أدناه عملية التتبّع الرجعي الكاملة الناتجة عن تشغيل الشيفرة أعلاه على المصفوفة $[3, 4, 5]$ بالقيمة المستهدفة $9$.</p>
<p><img src="/images/hello-algo/chapter_backtracking--subset_sum_i.png" alt="عملية التتبّع الرجعي لمجموع المجموعات الجزئية I"></p>
<h2 id="مع-وجود-عناصر-مكررة-في-المصفوفة">مع وجود عناصر مكررة في المصفوفة</h2>
<div class="note">
<p>بمعطى مصفوفة أعداد صحيحة موجبة <code>nums</code> وعدد صحيح موجب مستهدف <code>target</code>، ابحث عن جميع التوليفات الممكنة التي يساوي مجموع عناصرها <code>target</code>. <strong>وقد تحتوي المصفوفة المعطاة على عناصر مكررة، ويمكن اختيار كل عنصر مرة واحدة على الأكثر</strong>. وأعد هذه التوليفات على هيئة قائمة، على ألا تحتوي القائمة على توليفات مكررة.</p>
</div>
<p>وبالمقارنة بالمسألة السابقة، <strong>قد تحتوي مصفوفة الإدخال في هذه المسألة على عناصر مكررة</strong>، وهذا يطرح مشكلة جديدة. فمثلاً بمعطى المصفوفة $[4, \\hat{4}, 5]$ والقيمة المستهدفة $9$، يكون ناتج الشيفرة الحالية $[4, 5], [\\hat{4}, 5]$، وهو يحتوي على مجموعتين جزئيتين مكررتين.</p>
<p><strong>وسبب هذا التكرار هو اختيار عناصر متساوية مراراً في جولة معينة</strong>. وفي الشكل أدناه، تحتوي الجولة الأولى على ثلاثة اختيارات، اثنان منها $4$، مما ينشئ فرعي بحث مكررين يخرجان مجموعتين جزئيتين مكررتين. وبالمثل، ينتج العددان $4$ في الجولة الثانية أيضاً مجموعات جزئية مكررة.</p>
<p><img src="/images/hello-algo/chapter_backtracking--subset_sum_ii_repeat.png" alt="مجموعات جزئية مكررة ناتجة عن عناصر متساوية"></p>
<h3 id="تشذيب-العناصر-المتساوية">تشذيب العناصر المتساوية</h3>
<p>لحل هذه المشكلة، <strong>يلزمنا تقييد العناصر المتساوية بحيث تُختار مرة واحدة فقط في كل جولة</strong>. والتنفيذ بارع نوعاً ما: بما أن المصفوفة مرتبة بالفعل، فالعناصر المتساوية متجاورة. وهذا يعني أنه في جولة اختيار معينة، إذا ساوى العنصر الحالي العنصر الواقع على يساره، فقد اختيرت القيمة نفسها بالفعل في هذه الجولة، لذا نتخطى العنصر الحالي مباشرة.</p>
<p>وفي الوقت نفسه، <strong>تحدّد هذه المسألة أن كل عنصر من عناصر المصفوفة يمكن اختياره مرة واحدة فقط</strong>. ولحسن الحظ، يمكننا أيضاً استخدام المتغير <code>start</code> لتلبية هذا القيد: بعد اتخاذ الاختيار $x_{i}$، نجعل الجولة التالية تبدأ الاجتياز من الفهرس $i + 1$ فصاعداً. وهذا يزيل المجموعات الجزئية المكررة ويتجنّب اختيار العناصر مراراً في آن واحد.</p>
<h3 id="تنفيذ-الشيفرة">تنفيذ الشيفرة</h3>
<p>يوضح الشكل أدناه عملية التتبّع الرجعي للمصفوفة $[4, 4, 5]$ بالقيمة المستهدفة $9$، وتتضمن أربعة أنواع من عمليات التشذيب. اجمع بين الرسم وتعليقات الشيفرة لفهم عملية البحث بأكملها وكيفية عمل كل عملية تشذيب.</p>
<p><img src="/images/hello-algo/chapter_backtracking--subset_sum_ii.png" alt="عملية التتبّع الرجعي لمجموع المجموعات الجزئية II"></p>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:l,headings:p,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,e as html,t as slug,l as title};
