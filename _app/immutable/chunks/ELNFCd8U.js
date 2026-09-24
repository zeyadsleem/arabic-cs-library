const n="hello-algo",s="chapter_divide_and_conquer",l="التقسيم والتغلب",a="exercises",e="تمارين",o=[{depth:2,id:"مراجعة-المفاهيم",text:"مراجعة المفاهيم"},{depth:3,id:"أي-المهام-تصلح-للتقسيم-والتغلب",text:"أي المهام تصلح للتقسيم والتغلب؟"},{depth:3,id:"كيف-يقلل-الرفع-إلى-قوة-بالتربيع-من-الحسابات",text:"كيف يقلل الرفع إلى قوة بالتربيع من الحسابات"},{depth:3,id:"تقسيم-متتاليات-الاجتياز-إلى-شجرة-فرعية-يسرى-ويمنى",text:"تقسيم متتاليات الاجتياز إلى شجرة فرعية يسرى ويمنى"},{depth:2,id:"تمارين-برمجية",text:"تمارين برمجية"},{depth:3,id:"الرفع-إلى-قوة-بالتربيع",text:"الرفع إلى قوة بالتربيع"}],p=`<h2 id="مراجعة-المفاهيم">مراجعة المفاهيم</h2>
<h3 id="أي-المهام-تصلح-للتقسيم-والتغلب">أي المهام تصلح للتقسيم والتغلب؟</h3>
<p>يريد طالب حل كل مهمة من المهام التالية عبر &quot;تقسيمها إلى نصفين، وحل كل نصف على حدة، ثم دمج النتائج&quot;.
صنّف كل مهمة إلى &quot;مناسبة للتقسيم والتغلب&quot;، أو &quot;يمكن استخدام التقسيم والتغلب لكنه لن يقلل إجمالي العمل&quot;، أو &quot;لا يمكن حل النصفين باستقلالية&quot;، مع تفسير السبب.</p>
<!-- numbered-subquestions -->
<ol>
<li>ترتيب مصفوفة غير مرتبة.</li>
<li>إيجاد القيمة العظمى في مصفوفة.</li>
<li>تنفيذ سلسلة من عمليات المكدس <code>push(x)</code> و<code>pop()</code> بالترتيب، وإخراج العنصر الذي تُرجعه كل عملية <code>pop()</code>.</li>
</ol>
<div class="note">
<p class="note__title">الإجابة</p>
<ol>
<li>مناسبة: قسّم المصفوفة إلى نصفين، ورتّب كل نصف باستقلالية، ثم ادمجهما في زمن $O(n)$. هذا هو بالضبط الترتيب بالدمج.</li>
<li>يمكن استخدام التقسيم والتغلب، لكنه لا يقلل إجمالي العمل. فالنصفان لا يزالان يتطلبان فحص جميع العناصر $n$ إجمالاً،
لذا يبقى التعقيد الزمني $O(n)$، تماماً مثل المسح المباشر.</li>
<li>لا يمكن حل النصفين باستقلالية. فمحتوى المكدس في بداية النصف الثاني يعتمد على نتيجة تنفيذ النصف الأول،
لذا لا يمكن إكمال النصفين دون معرفة نتائج كل منهما.</li>
</ol>
</div>
<h3 id="كيف-يقلل-الرفع-إلى-قوة-بالتربيع-من-الحسابات">كيف يقلل الرفع إلى قوة بالتربيع من الحسابات</h3>
<p>تستخدم الدالة التعاودية التالية التقسيم والتغلب لحساب $x^n$:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* الرفع إلى قوة بالتربيع */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">fastPow</span><span class="hljs-params">(x, n <span class="hljs-type">int</span>)</span></span> <span class="hljs-type">int</span> {
	<span class="hljs-keyword">if</span> n == <span class="hljs-number">0</span> {
		<span class="hljs-keyword">return</span> <span class="hljs-number">1</span>
	}
	half := fastPow(x, n/<span class="hljs-number">2</span>)
	<span class="hljs-keyword">if</span> n%<span class="hljs-number">2</span> == <span class="hljs-number">0</span> {
		<span class="hljs-keyword">return</span> half * half
	}
	<span class="hljs-keyword">return</span> half * half * x
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* الرفع إلى قوة بالتربيع */</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">fastPow</span>(<span class="hljs-params"><span class="hljs-attr">x</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">n</span>: <span class="hljs-built_in">number</span></span>): <span class="hljs-built_in">number</span> {
    <span class="hljs-keyword">if</span> (n === <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>;
    }
    <span class="hljs-keyword">const</span> half = <span class="hljs-title function_">fastPow</span>(x, <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(n / <span class="hljs-number">2</span>));
    <span class="hljs-keyword">if</span> (n % <span class="hljs-number">2</span> === <span class="hljs-number">0</span>) {
        <span class="hljs-keyword">return</span> half * half;
    }
    <span class="hljs-keyword">return</span> half * half * x;
}
</code></pre>
</div>
<p>اضبط <code>x = 3</code> و<code>n = 5</code>، واستخدم هذه الدالة لحساب النتيجة:</p>
<!-- numbered-subquestions -->
<ol>
<li>مع تقدّم الاستدعاءات التعاودية، ما القيم التي تأخذها الوسيطة <code>n</code> بالترتيب؟</li>
<li>بدءاً من أعمق استدعاء، ما القيمة التي يعيدها كل مستوى؟</li>
<li>لماذا ينبغي تخزين النتيجة التعاودية في <code>half</code> بدلاً من استدعاء المسألة الجزئية نفسها مرة على كل جانب من جانبي الضرب؟</li>
</ol>
<div class="note">
<p class="note__title">الإجابة</p>
<ol>
<li>
<p>تأخذ الوسيطة القيم <code>5 → 2 → 1 → 0</code>. فالأُس يُنصَّف في كل خطوة حتى الوصول إلى الحالة الأساسية.</p>
</li>
<li>
<p>عندما <code>n = 0</code>، تعيد الدالة 1. وعندما <code>n = 1</code>، تعيد $1×1×3=3$.
وعندما <code>n = 2</code>، تعيد $3×3=9$. وعندما <code>n = 5</code>، تعيد $9×9×3=243$.</p>
</li>
<li>
<p>إذا استُدعيت المسألة الجزئية نفسها مرة على كل جانب من جانبي الضرب، فسيؤدي الاستدعاءان التعاوديان الحساب نفسه بالضبط.
أما تخزين النتيجة في <code>half</code> فيعني أن كل مستوى يقوم باستدعاء تعاودي واحد فقط، لذا يكون عمق التعاود نحو $\\log n$.
أما إجراء استدعاءين فسيسبب قدراً كبيراً من الحساب المتكرر.</p>
</li>
</ol>
</div>
<h3 id="تقسيم-متتاليات-الاجتياز-إلى-شجرة-فرعية-يسرى-ويمنى">تقسيم متتاليات الاجتياز إلى شجرة فرعية يسرى ويمنى</h3>
<p>تحتوي شجرة ثنائية على عقد غير مكررة. واجتيازاها بالطلب المسبق وبالطلب الداخلي هما:</p>
<ul>
<li>الطلب المسبق: <code>[A, B, D, E, C]</code></li>
<li>الطلب الداخلي: <code>[D, B, E, A, C]</code></li>
</ul>
<p>قسّم المتتاليتين مرة واحدة فقط عند الجذر. لا تحتاج إلى المتابعة تعاودياً أو رسم الشجرة كاملة:</p>
<!-- numbered-subquestions -->
<ol>
<li>ما العقدة الجذر؟</li>
<li>أي المتتاليات الجزئية من الاجتياز بالطلب الداخلي تقابل الشجرة الفرعية اليسرى واليمنى؟</li>
<li>أي المتتاليات الجزئية من الاجتياز بالطلب المسبق تقابل الشجرة الفرعية اليسرى واليمنى؟ وما العقد التي تعد أبناءً مباشرين للجذر؟</li>
</ol>
<div class="note">
<p class="note__title">الإجابة</p>
<ol>
<li>
<p>أول عقدة في الاجتياز بالطلب المسبق هي الجذر، لذا الجذر هو <code>A</code>.</p>
</li>
<li>
<p>يقسم <code>A</code> الاجتياز بالطلب الداخلي إلى جزأين: <code>[D, B, E]</code> للشجرة الفرعية اليسرى و<code>[C]</code> للشجرة الفرعية اليمنى.</p>
</li>
<li>
<p>تحتوي الشجرة الفرعية اليسرى على 3 عقد، لذا تنتمي العناصر الثلاثة التالية للجذر <code>A</code> في الطلب المسبق إلى الشجرة الفرعية اليسرى،
وهي <code>[B, D, E]</code>. أما <code>[C]</code> المتبقية فتنتمي إلى الشجرة الفرعية اليمنى.
لذلك، الابن الأيسر للجذر هو <code>B</code>، والابن الأيمن هو <code>C</code>.</p>
</li>
</ol>
</div>
<h2 id="تمارين-برمجية">تمارين برمجية</h2>
<h3 id="الرفع-إلى-قوة-بالتربيع">الرفع إلى قوة بالتربيع</h3>
<p>بالنظر إلى عدد حقيقي <code>x</code> وعدد صحيح <code>n</code>، احسب $x^n$ دون استدعاء دالة الرفع إلى قوة المدمجة في اللغة.
استخدم التقسيم والتغلب التعاودي: نصّف الأُس في كل خطوة وأعد استخدام نتيجة المسألة الجزئية المحسوبة سابقاً.
يعرّف هذا التمرين $x^0=1$، بما في ذلك عندما <code>x = 0</code>. وعندما <code>n &lt; 0</code> يكون <code>x != 0</code> مضموناً، ويمكن تحويل الإجابة إلى $(1/x)^{-n}$.</p>
<div class="note">
<p class="note__title">تلميحات</p>
<ol>
<li>عندما يكون n مساوياً 0، تكون الإجابة 1</li>
<li>بعد حساب x مرفوعاً إلى القوة n // 2، خزّن النتيجة في half بدلاً من إجراء الاستدعاء التعاودي مرة ثانية</li>
<li>عندما n &lt; 0، غيّر x أولاً إلى 1 / x ثم غيّر n إلى -n؛ في C++ أو Java، حوّل n أولاً إلى عدد صحيح 64 بت لتجنب الفائض عند نفي أصغر عدد صحيح 32 بت</li>
</ol>
</div>
<p><a href="https://leetcode.com/problems/powx-n/">LeetCode</a>{ .rounded-button .exercise-button target=&quot;_blank&quot; rel=&quot;noopener noreferrer&quot; }</p>
`,c={book:n,chapter:s,chapterTitle:l,slug:a,title:e,headings:o,html:p};export{n as book,s as chapter,l as chapterTitle,c as default,o as headings,p as html,a as slug,e as title};
