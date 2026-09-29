const s="hello-algo",a="chapter_computational_complexity",n="تحليل التعقيد",p="space_complexity",l="التعقيد المكاني",t=[{depth:2,id:"المساحة-المرتبطة-بالخوارزمية",text:"المساحة المرتبطة بالخوارزمية"},{depth:2,id:"طريقة-الحساب",text:"طريقة الحساب"},{depth:2,id:"الأنواع-الشائعة",text:"الأنواع الشائعة"},{depth:3,id:"الترتيب-الثابت-o1",text:"الترتيب الثابت O(1)"},{depth:3,id:"الترتيب-الخطي-on",text:"الترتيب الخطي O(n)"},{depth:3,id:"الترتيب-التربيعي-on2",text:"الترتيب التربيعي O(n2)"},{depth:3,id:"الترتيب-الأسي-o2n",text:"الترتيب الأسي O(2n)"},{depth:3,id:"الترتيب-اللوغاريتمي-ologn",text:"الترتيب اللوغاريتمي O(logn)"},{depth:2,id:"المقايضة-بين-الزمن-والمساحة",text:"المقايضة بين الزمن والمساحة"}],e=`<p><u>التعقيد المكاني</u> (space complexity) يقيس اتجاه نمو مساحة الذاكرة التي تشغلها خوارزمية مع تزايد حجم البيانات. وهذا المفهوم يشبه كثيراً التعقيد الزمني، إلا أنه يستبدل «زمن التشغيل» بـ«مساحة الذاكرة المشغولة».</p>
<h2 id="المساحة-المرتبطة-بالخوارزمية">المساحة المرتبطة بالخوارزمية</h2>
<p>تشمل مساحة الذاكرة التي تستخدمها الخوارزمية أثناء تنفيذها الأنواع التالية أساساً.</p>
<ul>
<li><strong>مساحة الإدخال</strong>: تُستخدم لتخزين بيانات الإدخال الخاصة بالخوارزمية.</li>
<li><strong>المساحة المؤقتة</strong>: تُستخدم لتخزين المتغيرات والكائنات وسياقات الدوال وغيرها من البيانات أثناء تنفيذ الخوارزمية.</li>
<li><strong>مساحة الإخراج</strong>: تُستخدم لتخزين بيانات الإخراج الخاصة بالخوارزمية.</li>
</ul>
<p>وبشكل عام، يشمل نطاق إحصاء التعقيد المكاني «المساحة المؤقتة» مضافاً إليها «مساحة الإخراج».</p>
<p>ويمكن تقسيم المساحة المؤقتة كذلك إلى ثلاثة أجزاء.</p>
<ul>
<li><strong>بيانات مؤقتة</strong>: تُستخدم لحفظ الثوابت والمتغيرات والكائنات المتنوعة أثناء تنفيذ الخوارزمية.</li>
<li><strong>مساحة إطار المكدس</strong>: تُستخدم لحفظ بيانات سياق الدوال المستدعاة. وينشئ النظام إطار مكدس في قمة المكدس في كل مرة تُستدعى فيها دالة، وتُحرَّر مساحة الإطار بعد عودة الدالة.</li>
<li><strong>مساحة التعليمات</strong>: تُستخدم لحفظ تعليمات البرنامج المترجمة، ويُتجاهلها عادةً في الإحصاء الفعلي.</li>
</ul>
<p>عند تحليل التعقيد المكاني لبرنامج ما، <strong>نأخذ عادةً ثلاثة أجزاء في الاعتبار: البيانات المؤقتة، ومساحة إطار المكدس، وبيانات الإخراج</strong>، كما يوضح الشكل التالي.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_computational_complexity--space_types.png" alt="المساحة المرتبطة بالخوارزمية"></p>
<p>والشيفرة ذات الصلة كما يلي:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* البنية */</span>
<span class="hljs-keyword">type</span> node <span class="hljs-keyword">struct</span> {
    val  <span class="hljs-type">int</span>
    next *node
}

<span class="hljs-comment">/* إنشاء بنية عقدة */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">newNode</span><span class="hljs-params">(val <span class="hljs-type">int</span>)</span></span> *node {
    <span class="hljs-keyword">return</span> &amp;node{val: val}
}

<span class="hljs-comment">/* دالة */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">function</span><span class="hljs-params">()</span></span> <span class="hljs-type">int</span> {
    <span class="hljs-comment">// نفّذ بعض العمليات...</span>
    <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">algorithm</span><span class="hljs-params">(n <span class="hljs-type">int</span>)</span></span> <span class="hljs-type">int</span> { <span class="hljs-comment">// بيانات الإدخال</span>
    <span class="hljs-keyword">const</span> a = <span class="hljs-number">0</span>             <span class="hljs-comment">// بيانات مؤقتة (ثابت)</span>
    b := <span class="hljs-number">0</span>                  <span class="hljs-comment">// بيانات مؤقتة (متغير)</span>
    newNode(<span class="hljs-number">0</span>)              <span class="hljs-comment">// بيانات مؤقتة (كائن)</span>
    c := function()         <span class="hljs-comment">// مساحة إطار المكدس (استدعاء دالة)</span>
    <span class="hljs-keyword">return</span> a + b + c        <span class="hljs-comment">// بيانات الإخراج</span>
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-typescript"><span class="hljs-comment">/* صنف */</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">Node</span> {
    <span class="hljs-attr">val</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">next</span>: <span class="hljs-title class_">Node</span> | <span class="hljs-literal">null</span>;
    <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">val</span>?: <span class="hljs-built_in">number</span></span>) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">val</span> = val === <span class="hljs-literal">undefined</span> ? <span class="hljs-number">0</span> : val; <span class="hljs-comment">// قيمة العقدة</span>
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">next</span> = <span class="hljs-literal">null</span>;                       <span class="hljs-comment">// مرجع إلى العقدة التالية</span>
    }
}

<span class="hljs-comment">/* دالة */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">constFunc</span>(<span class="hljs-params"></span>): <span class="hljs-built_in">number</span> {
    <span class="hljs-comment">// نفّذ بعض العمليات</span>
    <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">algorithm</span>(<span class="hljs-params"><span class="hljs-attr">n</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">number</span> { <span class="hljs-comment">// بيانات الإدخال</span>
    <span class="hljs-keyword">const</span> a = <span class="hljs-number">0</span>;                        <span class="hljs-comment">// بيانات مؤقتة (ثابت)</span>
    <span class="hljs-keyword">let</span> b = <span class="hljs-number">0</span>;                          <span class="hljs-comment">// بيانات مؤقتة (متغير)</span>
    <span class="hljs-keyword">const</span> node = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Node</span>(<span class="hljs-number">0</span>);           <span class="hljs-comment">// بيانات مؤقتة (كائن)</span>
    <span class="hljs-keyword">const</span> c = <span class="hljs-title function_">constFunc</span>();              <span class="hljs-comment">// مساحة إطار المكدس (استدعاء دالة)</span>
    <span class="hljs-keyword">return</span> a + b + c;                   <span class="hljs-comment">// بيانات الإخراج</span>
}
</code></pre>
</div>
<h2 id="طريقة-الحساب">طريقة الحساب</h2>
<p>طريقة حساب التعقيد المكاني مماثلة تقريباً لطريقة حساب التعقيد الزمني، إلا أن ما نقيسه يتغير من «عدد العمليات» إلى «مقدار المساحة المستخدمة».</p>
<p>وعلى عكس التعقيد الزمني، <strong>نهتم عادةً بالتعقيد المكاني في أسوأ حالة فقط</strong>. ويرجع ذلك إلى أن مساحة الذاكرة متطلب صارم، إذ يجب علينا ضمان حجز مساحة ذاكرة كافية لجميع بيانات الإدخال.</p>
<p>تأمل الشيفرة التالية. هنا، لـ«أسوأ حالة» في التعقيد المكاني في أسوأ حالة معنيان اثنان.</p>
<ol>
<li><strong>بناءً على أسوأ بيانات الإدخال</strong>: عندما $n &lt; 10$، يكون التعقيد المكاني <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span>؛ لكن عندما $n &gt; 10$، تشغل المصفوفة المهيّأة <code>nums</code> مساحة <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>، لذا يكون التعقيد المكاني في أسوأ حالة <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>.</li>
<li><strong>بناءً على ذروة الذاكرة أثناء تنفيذ الخوارزمية</strong>: فمثلاً، قبل تنفيذ السطر الأخير، يشغل البرنامج مساحة <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span>؛ وعند تهيئة المصفوفة <code>nums</code>، يشغل البرنامج مساحة <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>، لذا يكون التعقيد المكاني في أسوأ حالة <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>.</li>
</ol>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">algorithm</span><span class="hljs-params">(n <span class="hljs-type">int</span>)</span></span> {
    a := <span class="hljs-number">0</span>                      <span class="hljs-comment">// O(1)</span>
    b := <span class="hljs-built_in">make</span>([]<span class="hljs-type">int</span>, <span class="hljs-number">10000</span>)     <span class="hljs-comment">// O(1)</span>
    <span class="hljs-keyword">var</span> nums []<span class="hljs-type">int</span>
    <span class="hljs-keyword">if</span> n &gt; <span class="hljs-number">10</span> {
        nums := <span class="hljs-built_in">make</span>([]<span class="hljs-type">int</span>, n)  <span class="hljs-comment">// O(n)</span>
    }
    fmt.Println(a, b, nums)
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">algorithm</span>(<span class="hljs-params"><span class="hljs-attr">n</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">const</span> a = <span class="hljs-number">0</span>;                   <span class="hljs-comment">// O(1)</span>
    <span class="hljs-keyword">const</span> b = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Array</span>(<span class="hljs-number">10000</span>);    <span class="hljs-comment">// O(1)</span>
    <span class="hljs-keyword">if</span> (n &gt; <span class="hljs-number">10</span>) {
        <span class="hljs-keyword">const</span> nums = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Array</span>(n); <span class="hljs-comment">// O(n)</span>
    }
}
</code></pre>
</div>
<p><strong>وفي الدوال التعاودية، يلزم إحصاء مساحة إطار المكدس</strong>. تأمل الشيفرة التالية:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">function</span><span class="hljs-params">()</span></span> <span class="hljs-type">int</span> {
    <span class="hljs-comment">// نفّذ بعض العمليات</span>
    <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>
}

<span class="hljs-comment">/* يبلغ التعقيد المكاني للحلقة O(1) */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">loop</span><span class="hljs-params">(n <span class="hljs-type">int</span>)</span></span> {
    <span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; n; i++ {
        function()
    }
}

<span class="hljs-comment">/* يبلغ التعقيد المكاني للتعاود O(n) */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">recur</span><span class="hljs-params">(n <span class="hljs-type">int</span>)</span></span> {
    <span class="hljs-keyword">if</span> n == <span class="hljs-number">1</span> {
        <span class="hljs-keyword">return</span>
    }
    recur(n - <span class="hljs-number">1</span>)
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">constFunc</span>(<span class="hljs-params"></span>): <span class="hljs-built_in">number</span> {
    <span class="hljs-comment">// نفّذ بعض العمليات</span>
    <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
}
<span class="hljs-comment">/* يبلغ التعقيد المكاني للحلقة O(1) */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">loop</span>(<span class="hljs-params"><span class="hljs-attr">n</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; n; i++) {
        <span class="hljs-title function_">constFunc</span>();
    }
}
<span class="hljs-comment">/* يبلغ التعقيد المكاني للتعاود O(n) */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">recur</span>(<span class="hljs-params"><span class="hljs-attr">n</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-keyword">if</span> (n === <span class="hljs-number">1</span>) <span class="hljs-keyword">return</span>;
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">recur</span>(n - <span class="hljs-number">1</span>);
}
</code></pre>
</div>
<p>التعقيد الزمني لكل من الدالتين <code>loop()</code> و<code>recur()</code> هو <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>، لكن التعقيد المكاني لكل منهما مختلف.</p>
<ul>
<li>تستدعي الدالة <code>loop()</code> الدالة <code>function()</code> عدد <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> من المرات في حلقة. وفي كل تكرار، تعود <code>function()</code> وتحرّر مساحة إطار مكدسها، لذا يبقى التعقيد المكاني <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span>.</li>
<li>في الدالة التعاودية <code>recur()</code>، توجد <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> من نسخ <code>recur()</code> غير العائدة في الوقت نفسه أثناء التنفيذ، لذا تشغل مساحة إطارات مكدس <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>.</li>
</ul>
<h2 id="الأنواع-الشائعة">الأنواع الشائعة</h2>
<p>ليكن حجم بيانات الإدخال <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span>. يوضح الشكل التالي الأنواع الشائعة للتعقيد المكاني (مرتبة من الأدنى إلى الأعلى).</p>
<p><span class="katex-display"><span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:2.7241em;vertical-align:-1.1121em;"></span><span class="mord"><span class="mtable"><span class="col-align-r"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.6121em;"><span style="top:-3.6121em;"><span class="pstrut" style="height:2.8641em;"></span><span class="mord"></span></span><span style="top:-2.1121em;"><span class="pstrut" style="height:2.8641em;"></span><span class="mord"></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.1121em;"><span></span></span></span></span></span><span class="col-align-l"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.6121em;"><span style="top:-3.7479em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"></span><span class="mord mathnormal">am</span><span class="mord mathnormal">p</span><span class="mpunct">;</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span><span style="top:-2.2479em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"></span><span class="mord mathnormal">am</span><span class="mord mathnormal">p</span><span class="mpunct">;</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord text"><span class="mord">Constant</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.1121em;"><span></span></span></span></span></span><span class="arraycolsep" style="width:1em;"></span><span class="col-align-r"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.6121em;"><span style="top:-3.7479em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">t</span><span class="mpunct">;</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span><span style="top:-2.2479em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">t</span><span class="mpunct">;</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord text"><span class="mord">Logarithmic</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.1121em;"><span></span></span></span></span></span><span class="col-align-l"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.6121em;"><span style="top:-3.7479em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">t</span><span class="mpunct">;</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span><span style="top:-2.2479em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">t</span><span class="mpunct">;</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord text"><span class="mord">Linear</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.1121em;"><span></span></span></span></span></span><span class="arraycolsep" style="width:1em;"></span><span class="col-align-r"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.6121em;"><span style="top:-3.7479em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">t</span><span class="mpunct">;</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal">n</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8641em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mclose">)</span></span></span><span style="top:-2.2479em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">t</span><span class="mpunct">;</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord text"><span class="mord">Quadratic</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.1121em;"><span></span></span></span></span></span><span class="col-align-l"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:1.6121em;"><span style="top:-3.7479em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">t</span><span class="mpunct">;</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.7144em;"><span style="top:-3.113em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span></span></span></span><span class="mclose">)</span></span></span><span style="top:-2.2479em;"><span class="pstrut" style="height:3em;"></span><span class="mord"><span class="mord"></span><span class="mord mathnormal" style="margin-right:0.0197em;">l</span><span class="mord mathnormal">t</span><span class="mpunct">;</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord text"><span class="mord">Exponential</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:1.1121em;"><span></span></span></span></span></span></span></span></span></span></span></span></p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_computational_complexity--space_complexity_common_types.png" alt="الأنواع الشائعة للتعقيد المكاني"></p>
<h3 id="الترتيب-الثابت-o1">الترتيب الثابت <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></h3>
<p>الترتيب الثابت شائع في الثوابت والمتغيرات والكائنات التي لا يعتمد عددها على حجم بيانات الإدخال <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span>.</p>
<p>ويجدر التنبيه إلى أن الذاكرة التي تشغلها تهيئة المتغيرات أو استدعاء الدوال داخل حلقة تُحرَّر عند الانتقال إلى التكرار التالي، لذا لا تتراكم المساحة، ويبقى التعقيد المكاني <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span>:</p>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* الترتيب الثابت */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">constant</span>(<span class="hljs-params"><span class="hljs-attr">n</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-comment">// تشغل الثوابت والمتغيرات والكائنات مساحة O(1)</span>
    <span class="hljs-keyword">const</span> a = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">const</span> b = <span class="hljs-number">0</span>;
    <span class="hljs-keyword">const</span> nums = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Array</span>(<span class="hljs-number">10000</span>);
    <span class="hljs-keyword">const</span> node = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ListNode</span>(<span class="hljs-number">0</span>);
    <span class="hljs-comment">// تشغل المتغيرات في الحلقة مساحة O(1)</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; n; i++) {
        <span class="hljs-keyword">const</span> c = <span class="hljs-number">0</span>;
    }
    <span class="hljs-comment">// تشغل الدوال في الحلقة مساحة O(1)</span>
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; n; i++) {
        <span class="hljs-title function_">constFunc</span>();
    }
}
</code></pre>
</div>
<h3 id="الترتيب-الخطي-on">الترتيب الخطي <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></h3>
<p>الترتيب الخطي شائع في المصفوفات والقوائم المترابطة والمكدسات والطوابير وغيرها، حيث يتناسب عدد العناصر مع <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span>:</p>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* الترتيب الخطي */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">linear</span>(<span class="hljs-params"><span class="hljs-attr">n</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-comment">// مصفوفة طولها n تشغل مساحة O(n)</span>
    <span class="hljs-keyword">const</span> nums = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Array</span>(n);
    <span class="hljs-comment">// قائمة طولها n تشغل مساحة O(n)</span>
    <span class="hljs-keyword">const</span> <span class="hljs-attr">nodes</span>: <span class="hljs-title class_">ListNode</span>[] = [];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; n; i++) {
        nodes.<span class="hljs-title function_">push</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">ListNode</span>(i));
    }
    <span class="hljs-comment">// جدول تجزئة طوله n يشغل مساحة O(n)</span>
    <span class="hljs-keyword">const</span> map = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>();
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; n; i++) {
        map.<span class="hljs-title function_">set</span>(i, i.<span class="hljs-title function_">toString</span>());
    }
}
</code></pre>
</div>
<p>وكما يوضح الشكل التالي، فإن عمق التعاود لهذه الدالة هو <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span>، أي أن هناك <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> من دوال <code>linear_recur()</code> غير العائدة موجودة في الوقت نفسه، وتستخدم مساحة إطارات مكدس <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>:</p>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* الترتيب الخطي (تنفيذ تعاودي) */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">linearRecur</span>(<span class="hljs-params"><span class="hljs-attr">n</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Recursion n = <span class="hljs-subst">\${n}</span>\`</span>);
    <span class="hljs-keyword">if</span> (n === <span class="hljs-number">1</span>) <span class="hljs-keyword">return</span>;
    <span class="hljs-title function_">linearRecur</span>(n - <span class="hljs-number">1</span>);
}
</code></pre>
</div>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_computational_complexity--space_complexity_recursive_linear.png" alt="تعقيد مكاني من الترتيب الخطي ناتج عن دالة تعاودية"></p>
<h3 id="الترتيب-التربيعي-on2">الترتيب التربيعي <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.0641em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal">n</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span></h3>
<p>الترتيب التربيعي شائع في المصفوفات والرسوم البيانية، حيث يرتبط عدد العناصر بـ<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> ارتباطاً تربيعياً:</p>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* الترتيب الأسي */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">quadratic</span>(<span class="hljs-params"><span class="hljs-attr">n</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">void</span> {
    <span class="hljs-comment">// تشغل المصفوفة مساحة O(n^2)</span>
    <span class="hljs-keyword">const</span> numMatrix = <span class="hljs-title class_">Array</span>(n)
        .<span class="hljs-title function_">fill</span>(<span class="hljs-literal">null</span>)
        .<span class="hljs-title function_">map</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Array</span>(n).<span class="hljs-title function_">fill</span>(<span class="hljs-literal">null</span>));
    <span class="hljs-comment">// تشغل القائمة ثنائية الأبعاد مساحة O(n^2)</span>
    <span class="hljs-keyword">const</span> numList = [];
    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; n; i++) {
        <span class="hljs-keyword">const</span> tmp = [];
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-number">0</span>; j &lt; n; j++) {
            tmp.<span class="hljs-title function_">push</span>(<span class="hljs-number">0</span>);
        }
        numList.<span class="hljs-title function_">push</span>(tmp);
    }
}
</code></pre>
</div>
<p>وكما يوضح الشكل التالي، فإن عمق التعاود لهذه الدالة هو <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span>، وتُهيَّأ مصفوفة في كل دالة تعاودية بأطوال <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> و<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6667em;vertical-align:-0.0833em;"></span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span> و<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.123em;"></span><span class="minner">…</span></span></span></span> و<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">2</span></span></span></span> و<span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span>، بمتوسط طول $n / 2$، وبذلك تشغل في الإجمال مساحة <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.0641em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord"><span class="mord mathnormal">n</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.8141em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span>:</p>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* الترتيب التربيعي (تنفيذ تعاودي) */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">quadraticRecur</span>(<span class="hljs-params"><span class="hljs-attr">n</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">number</span> {
    <span class="hljs-keyword">if</span> (n &lt;= <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>;
    <span class="hljs-keyword">const</span> nums = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Array</span>(n);
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`In recursion n = <span class="hljs-subst">\${n}</span>, nums length = <span class="hljs-subst">\${nums.length}</span>\`</span>);
    <span class="hljs-keyword">return</span> <span class="hljs-title function_">quadraticRecur</span>(n - <span class="hljs-number">1</span>);
}
</code></pre>
</div>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_computational_complexity--space_complexity_recursive_quadratic.png" alt="تعقيد مكاني من الترتيب التربيعي ناتج عن دالة تعاودية"></p>
<h3 id="الترتيب-الأسي-o2n">الترتيب الأسي <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span></h3>
<p>الترتيب الأسي شائع في الأشجار الثنائية. تأمل الشكل التالي: شجرة ثنائية كاملة ذات <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> من المستويات تضم <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7477em;vertical-align:-0.0833em;"></span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span> عقدة، وتشغل مساحة <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord"><span class="mord">2</span><span class="msupsub"><span class="vlist-t"><span class="vlist-r"><span class="vlist" style="height:0.6644em;"><span style="top:-3.063em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mathnormal mtight">n</span></span></span></span></span></span></span></span><span class="mclose">)</span></span></span></span>:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* شيفرة التشغيل */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">buildTree</span><span class="hljs-params">(n <span class="hljs-type">int</span>)</span></span> *TreeNode {
	<span class="hljs-keyword">if</span> n == <span class="hljs-number">0</span> {
		<span class="hljs-keyword">return</span> <span class="hljs-literal">nil</span>
	}
	root := NewTreeNode(<span class="hljs-number">0</span>)
	root.Left = buildTree(n - <span class="hljs-number">1</span>)
	root.Right = buildTree(n - <span class="hljs-number">1</span>)
	<span class="hljs-keyword">return</span> root
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* شيفرة التشغيل */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">buildTree</span>(<span class="hljs-params"><span class="hljs-attr">n</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-title class_">TreeNode</span> | <span class="hljs-literal">null</span> {
    <span class="hljs-keyword">if</span> (n === <span class="hljs-number">0</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
    <span class="hljs-keyword">const</span> root = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TreeNode</span>(<span class="hljs-number">0</span>);
    root.<span class="hljs-property">left</span> = <span class="hljs-title function_">buildTree</span>(n - <span class="hljs-number">1</span>);
    root.<span class="hljs-property">right</span> = <span class="hljs-title function_">buildTree</span>(n - <span class="hljs-number">1</span>);
    <span class="hljs-keyword">return</span> root;
}
</code></pre>
</div>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_computational_complexity--space_complexity_exponential.png" alt="تعقيد مكاني من الترتيب الأسي ناتج عن شجرة ثنائية كاملة"></p>
<h3 id="الترتيب-اللوغاريتمي-ologn">الترتيب اللوغاريتمي <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></h3>
<p>الترتيب اللوغاريتمي شائع في خوارزميات التقسيم والتغلب. فمثلاً، في الترتيب بالدمج: بمعطى مصفوفة إدخال طولها <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span>، يقسم كل تعاود المصفوفة إلى نصفين من نقطة المنتصف، مكوّناً شجرة تعاود ارتفاعها <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8889em;vertical-align:-0.1944em;"></span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span></span></span></span>، وتستخدم مساحة إطارات مكدس <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>.</p>
<p>ومثال آخر هو تحويل عدد إلى نص. فبمعطى عدد صحيح موجب <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span>، يكون له <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">⌊</span><span class="mop"><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.207em;"><span style="top:-2.4559em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">10</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2441em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">⌋</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span> من الخانات، أي أن طول النص المقابل هو <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">⌊</span><span class="mop"><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.207em;"><span style="top:-2.4559em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">10</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2441em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">⌋</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span>، لذا يكون التعقيد المكاني <span class="katex"><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mop"><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.207em;"><span style="top:-2.4559em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">10</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.2441em;"><span></span></span></span></span></span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">1</span><span class="mclose">)</span><span class="mspace" style="margin-right:0.2778em;"></span><span class="mrel">=</span><span class="mspace" style="margin-right:0.2778em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>.</p>
<h2 id="المقايضة-بين-الزمن-والمساحة">المقايضة بين الزمن والمساحة</h2>
<p>من الناحية المثالية، نأمل أن يصل التعقيد الزمني والتعقيد المكاني للخوارزمية كليهما إلى المستوى الأمثل. غير أنه من الصعب عملياً عادةً تحسين التعقيدين الزمني والمكاني في الوقت نفسه.</p>
<p><strong>عادةً ما يأتي تقليل التعقيد الزمني على حساب زيادة التعقيد المكاني، والعكس صحيح</strong>. ويُسمى التضحية بمساحة الذاكرة مقابل تحسين سرعة التنفيذ «مقايضة المساحة بالزمن»؛ ويُسمى العكس «مقايضة الزمن بالمساحة».</p>
<p>ويعتمد اختيار أي من النهجين على الجانب الذي نوليه أهمية أكبر. وفي معظم الحالات، يكون الزمن أثمن من المساحة، لذا تكون «مقايضة المساحة بالزمن» هي الاستراتيجية الأكثر شيوعاً عادةً. وبالطبع، عندما يكون حجم البيانات ضخماً جداً، يكون التحكم في التعقيد المكاني مهماً أيضاً.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:p,title:l,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,e as html,p as slug,l as title};
