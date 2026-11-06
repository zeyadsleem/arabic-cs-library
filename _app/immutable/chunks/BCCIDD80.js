const s="hello-algo",a="chapter_array_and_linkedlist",n="Arrays and Linked Lists",t="linked_list",l="القائمة المترابطة",e=[{depth:3,id:"تهيئة-قائمة-مترابطة",text:"تهيئة قائمة مترابطة"},{depth:3,id:"إدراج-عقدة",text:"إدراج عقدة"},{depth:2,id:"الأنواع-الشائعة-للقوائم-المترابطة",text:"الأنواع الشائعة للقوائم المترابطة"},{depth:2,id:"التطبيقات-النموذجية-للقوائم-المترابطة",text:"التطبيقات النموذجية للقوائم المترابطة"}],p=`<p>الذاكرة مورد مشترك بين جميع البرامج. وفي بيئة تشغيل معقدة، قد تكون الذاكرة الحرة موزعة في أنحاء فضاء العناوين. ونعلم أن المصفوفات تتطلب ذاكرة متجاورة، وعندما تكون المصفوفة كبيرة جداً، قد لا يتمكن النظام من توفير كتلة متجاورة بهذا الحجم. وهنا تبرز مرونة القوائم المترابطة.</p>
<p><u>القائمة المترابطة</u> (linked list) بنية بيانات خطية يكون فيها كل عنصر كائن عقدة، وتُربط العقد عبر «المراجع». ويسجّل المرجع عنوان الذاكرة للعقدة التالية، ويمكن من خلاله الوصول من العقدة الحالية إلى العقدة التالية.</p>
<p>ويسمح هذا التصميم بتخزين عقد القائمة المترابطة في مواضع مختلفة من الذاكرة، دون حاجة عناوينها إلى أن تكون متجاورة.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_array_and_linkedlist--linkedlist_definition.png" alt="تعريف القائمة المترابطة وطريقة تخزينها"></p>
<p>وبمراقبة الشكل أعلاه، نجد أن الوحدة الأساسية للقائمة المترابطة هي كائن <u>عقدة</u> (node). وتحتوي كل عقدة على معلومتين: «قيمة» العقدة و«مرجع» إلى العقدة التالية.</p>
<ul>
<li>تسمى العقدة الأولى في القائمة المترابطة «العقدة الرأسية»، وتسمى العقدة الأخيرة «العقدة الذيلية».</li>
<li>وتشير العقدة الذيلية إلى «null»، ويُرمز إليها بـ <code>null</code> و<code>nullptr</code> و<code>None</code> في Java وC++ وPython على التوالي.</li>
<li>وفي اللغات التي تدعم المؤشرات، مثل C وC++ وGo وRust، ينبغي استبدال «المرجع» المذكور آنفاً بـ«المؤشر».</li>
</ul>
<p>وكما توضح الشيفرة التالية، لا تحتوي عقدة القائمة المترابطة <code>ListNode</code> على قيمة فحسب، بل على مرجع (مؤشر) إضافي أيضاً. لذلك <strong>تشغل القوائم المترابطة مساحة ذاكرة أكبر من المصفوفات عند تخزين الكمية نفسها من البيانات</strong>.</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">ListNode</span>:
    <span class="hljs-string">&quot;&quot;&quot;Linked list node class&quot;&quot;&quot;</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, val: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-variable language_">self</span>.val: <span class="hljs-built_in">int</span> = val               <span class="hljs-comment"># Node value</span>
        <span class="hljs-variable language_">self</span>.<span class="hljs-built_in">next</span>: ListNode | <span class="hljs-literal">None</span> = <span class="hljs-literal">None</span> <span class="hljs-comment"># Reference to the next node</span>
</code></pre>
</div>
## العمليات الشائعة على القوائم المترابطة
<h3 id="تهيئة-قائمة-مترابطة">تهيئة قائمة مترابطة</h3>
<p>يتضمن بناء قائمة مترابطة خطوتين: أولاً تهيئة كل كائن عقدة؛ وثانياً إنشاء علاقات المرجع بين العقد. وبعد اكتمال التهيئة، يمكننا اجتياز جميع العقد بدءاً من العقدة الرأسية للقائمة المترابطة عبر المرجع <code>next</code>.</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-python"><span class="hljs-comment"># Initialize linked list 1 -&gt; 3 -&gt; 2 -&gt; 5 -&gt; 4</span>
<span class="hljs-comment"># Initialize each node</span>
n0 = ListNode(<span class="hljs-number">1</span>)
n1 = ListNode(<span class="hljs-number">3</span>)
n2 = ListNode(<span class="hljs-number">2</span>)
n3 = ListNode(<span class="hljs-number">5</span>)
n4 = ListNode(<span class="hljs-number">4</span>)
<span class="hljs-comment"># Build references between nodes</span>
n0.<span class="hljs-built_in">next</span> = n1
n1.<span class="hljs-built_in">next</span> = n2
n2.<span class="hljs-built_in">next</span> = n3
n3.<span class="hljs-built_in">next</span> = n4
</code></pre>
</div>
المصفوفة متغير واحد؛ فمثلاً تحتوي المصفوفة \`nums\` على العناصر \`nums[0]\` و\`nums[1]\` وهكذا. أما القائمة المترابطة فتتكوّن من كائنات عقد مستقلة متعددة. **ونستخدم عادةً العقدة الرأسية ممثلاً للقائمة المترابطة بأكملها**؛ على سبيل المثال، يمكن الإشارة إلى القائمة المترابطة في الشيفرة أعلاه بالقائمة المترابطة \`n0\`.
<h3 id="إدراج-عقدة">إدراج عقدة</h3>
<p>إدراج عقدة في قائمة مترابطة سهل جداً. وكما يوضح الشكل أدناه، لنفترض أننا نريد إدراج عقدة جديدة <code>P</code> بين عقدتين متجاورتين <code>n0</code> و<code>n1</code>. <strong>لا نحتاج إلا إلى تغيير مرجعَي عقدتين (مؤشرين)</strong>، بتعقيد زمني <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span>.</p>
<p>وفي المقابل، فإن التعقيد الزمني لإدراج عنصر في مصفوفة هو <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>، وهو غير فعّال عند التعامل مع كميات كبيرة من البيانات.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_array_and_linkedlist--linkedlist_insert_node.png" alt="مثال على إدراج عقدة في قائمة مترابطة"></p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py"><span class="hljs-keyword">def</span> <span class="hljs-title function_">insert</span>(<span class="hljs-params">n0: ListNode, P: ListNode</span>):
    <span class="hljs-string">&quot;&quot;&quot;Insert node P after node n0 in the linked list&quot;&quot;&quot;</span>
    n1 = n0.<span class="hljs-built_in">next</span>
    P.<span class="hljs-built_in">next</span> = n1
    n0.<span class="hljs-built_in">next</span> = P
</code></pre>
</div>
### حذف عقدة
<p>وكما يوضح الشكل أدناه، فإن حذف عقدة في قائمة مترابطة مريح جداً أيضاً. <strong>لا نحتاج إلا إلى تغيير مرجع عقدة واحدة (مؤشرها)</strong>.</p>
<p>لاحظ أنه رغم أن العقدة <code>P</code> ما زالت تشير إلى <code>n1</code> بعد اكتمال عملية الحذف، فإن القائمة المترابطة لم تعد تستطيع الوصول إلى <code>P</code> عند الاجتياز، أي إن <code>P</code> لم تعد تنتمي إلى هذه القائمة المترابطة.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_array_and_linkedlist--linkedlist_remove_node.png" alt="حذف عقدة من قائمة مترابطة"></p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py"><span class="hljs-keyword">def</span> <span class="hljs-title function_">remove</span>(<span class="hljs-params">n0: ListNode</span>):
    <span class="hljs-string">&quot;&quot;&quot;Remove the first node after node n0 in the linked list&quot;&quot;&quot;</span>
    <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> n0.<span class="hljs-built_in">next</span>:
        <span class="hljs-keyword">return</span>
    <span class="hljs-comment"># n0 -&gt; P -&gt; n1</span>
    P = n0.<span class="hljs-built_in">next</span>
    n1 = P.<span class="hljs-built_in">next</span>
    n0.<span class="hljs-built_in">next</span> = n1
</code></pre>
</div>
### الوصول إلى عقدة
<p><strong>الوصول إلى العقد في القائمة المترابطة أقل كفاءة</strong>. وكما ذُكر في القسم السابق، يمكننا الوصول إلى أي عنصر في مصفوفة في زمن <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span>. أما القوائم المترابطة فليس الأمر كذلك فيها. إذ يحتاج البرنامج إلى البدء من العقدة الرأسية والاجتياز واحداً واحداً حتى العثور على العقدة الهدف. أي إن الوصول إلى العقدة رقم <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>i</mi></mrow><annotation encoding="application/x-tex">i</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6595em;"></span><span class="mord mathnormal">i</span></span></span></span> في قائمة مترابطة يتطلب <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>i</mi><mo>−</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">i - 1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7429em;vertical-align:-0.0833em;"></span><span class="mord mathnormal">i</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span> تكرار، بتعقيد زمني <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>.</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py"><span class="hljs-keyword">def</span> <span class="hljs-title function_">access</span>(<span class="hljs-params">head: ListNode, index: <span class="hljs-built_in">int</span></span>) -&gt; ListNode | <span class="hljs-literal">None</span>:
    <span class="hljs-string">&quot;&quot;&quot;Access the node at index \`index\` in the linked list&quot;&quot;&quot;</span>
    <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(index):
        <span class="hljs-keyword">if</span> <span class="hljs-keyword">not</span> head:
            <span class="hljs-keyword">return</span> <span class="hljs-literal">None</span>
        head = head.<span class="hljs-built_in">next</span>
    <span class="hljs-keyword">return</span> head
</code></pre>
</div>
### البحث عن عقدة
<p>اجتَز القائمة المترابطة للعثور على عقدة قيمتها <code>target</code>، وأخرج فهرس تلك العقدة في القائمة المترابطة. وهذه العملية بحث خطي أيضاً. وتُعرض الشيفرة أدناه:</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py"><span class="hljs-keyword">def</span> <span class="hljs-title function_">find</span>(<span class="hljs-params">head: ListNode, target: <span class="hljs-built_in">int</span></span>) -&gt; <span class="hljs-built_in">int</span>:
    <span class="hljs-string">&quot;&quot;&quot;Find the first node with value target in the linked list&quot;&quot;&quot;</span>
    index = <span class="hljs-number">0</span>
    <span class="hljs-keyword">while</span> head:
        <span class="hljs-keyword">if</span> head.val == target:
            <span class="hljs-keyword">return</span> index
        head = head.<span class="hljs-built_in">next</span>
        index += <span class="hljs-number">1</span>
    <span class="hljs-keyword">return</span> -<span class="hljs-number">1</span>
</code></pre>
</div>
## المصفوفات مقابل القوائم المترابطة
<p>يلخص الجدول أدناه خصائص المصفوفات والقوائم المترابطة ويقارن كفاءة عملياتهما. ولأنهما يستخدمان استراتيجيتي تخزين متعاكستين، فإن خصائصهما المختلفة وكفاءة عملياتهما تظهر أيضاً سمات متباينة.</p>
<p align="center"> جدول <id> &nbsp; مقارنة كفاءة المصفوفة والقائمة المترابطة </p>
<table>
<thead>
<tr>
<th></th>
<th>المصفوفة</th>
<th>القائمة المترابطة</th>
</tr>
</thead>
<tbody>
<tr>
<td>طريقة التخزين</td>
<td>مساحة ذاكرة متجاورة</td>
<td>مساحة ذاكرة متفرقة</td>
</tr>
<tr>
<td>توسيع السعة</td>
<td>طول غير قابل للتغيير</td>
<td>توسيع مرن</td>
</tr>
<tr>
<td>كفاءة الذاكرة</td>
<td>تشغل العناصر ذاكرة أقل، لكن قد تُهدر المساحة</td>
<td>تشغل العناصر ذاكرة أكبر</td>
</tr>
<tr>
<td>الوصول إلى عنصر</td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td>إضافة عنصر</td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td>حذف عنصر</td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
</tbody>
</table>
<h2 id="الأنواع-الشائعة-للقوائم-المترابطة">الأنواع الشائعة للقوائم المترابطة</h2>
<p>وكما يوضح الشكل أدناه، هناك ثلاثة أنواع شائعة للقوائم المترابطة:</p>
<ul>
<li><strong>القائمة المترابطة الأحادية</strong>: هذه هي القائمة المترابطة العادية التي قُدِّمت سابقاً. وتحتوي عقد القائمة المترابطة الأحادية على قيمة ومرجع إلى العقدة التالية. ونسمي العقدة الأولى العقدة الرأسية والعقدة الأخيرة العقدة الذيلية؛ وتشير العقدة الذيلية إلى <code>None</code>.</li>
<li><strong>القائمة المترابطة الدائرية</strong>: إذا جعلنا العقدة الذيلية لقائمة مترابطة أحادية تشير إلى العقدة الرأسية (وصل الذيل بالرأس)، حصلنا على قائمة مترابطة دائرية. وفي القائمة المترابطة الدائرية، يمكن اعتبار أي عقدة عقدةً رأسية.</li>
<li><strong>القائمة المترابطة المزدوجة</strong>: بالمقارنة مع القائمة المترابطة الأحادية، تسجّل القائمة المترابطة المزدوجة المراجع في الاتجاهين. ويتضمن تعريف عقدة القائمة المترابطة المزدوجة مرجعاً إلى العقدة اللاحقة (العقدة التالية) ومرجعاً إلى العقدة السابقة. وبالمقارنة مع القائمة المترابطة الأحادية، فإن القائمة المترابطة المزدوجة أكثر مرونة ويمكنها اجتياز القائمة المترابطة في الاتجاهين، لكنها تتطلب مساحة ذاكرة أكبر أيضاً.</li>
</ul>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-python"><span class="hljs-keyword">class</span> <span class="hljs-title class_">ListNode</span>:
    <span class="hljs-string">&quot;&quot;&quot;Doubly linked list node class&quot;&quot;&quot;</span>
    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, val: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-variable language_">self</span>.val: <span class="hljs-built_in">int</span> = val                <span class="hljs-comment"># Node value</span>
        <span class="hljs-variable language_">self</span>.<span class="hljs-built_in">next</span>: ListNode | <span class="hljs-literal">None</span> = <span class="hljs-literal">None</span>  <span class="hljs-comment"># Reference to the successor node</span>
        <span class="hljs-variable language_">self</span>.prev: ListNode | <span class="hljs-literal">None</span> = <span class="hljs-literal">None</span>  <span class="hljs-comment"># Reference to the predecessor node</span>
</code></pre>
</div>
![الأنواع الشائعة للقوائم المترابطة](/images/hello-algo/chapter_array_and_linkedlist--linkedlist_common_types.png)
<h2 id="التطبيقات-النموذجية-للقوائم-المترابطة">التطبيقات النموذجية للقوائم المترابطة</h2>
<p>تُستخدم القوائم المترابطة الأحادية عادةً في تنفيذ المكدسات والطوابير وجداول التجزئة والرسوم البيانية.</p>
<ul>
<li><strong>المكدسات والطوابير</strong>: عندما تحدث عمليتا الإدراج والحذف معاً عند أحد طرفي القائمة المترابطة، تظهر خاصية آخر ما يدخل يخرج أولاً، وهو ما يقابل المكدس. وعندما تحدث عمليات الإدراج عند أحد طرفي القائمة المترابطة وعمليات الحذف عند الطرف الآخر، تظهر خاصية أول ما يدخل يخرج أولاً، وهو ما يقابل الطابور.</li>
<li><strong>جداول التجزئة</strong>: السلسلة المنفصلة أحد الحلول السائدة لحل تصادمات التجزئة. وفي هذا الأسلوب تُوضع جميع العناصر المتصادمة في قائمة مترابطة.</li>
<li><strong>الرسوم البيانية</strong>: قائمة الجوار طريقة شائعة لتمثيل رسم بياني، حيث يرتبط كل رأس في الرسم البياني بقائمة مترابطة، ويمثل كل عنصر في القائمة المترابطة رأساً آخر متصلاً بذلك الرأس.</li>
</ul>
<p>تُستخدم القوائم المترابطة المزدوجة عادةً في الحالات التي يلزم فيها الوصول السريع إلى العنصرين السابق والتالي.</p>
<ul>
<li><strong>بنى البيانات المتقدمة</strong>: على سبيل المثال، في الأشجار الحمراء-السوداء وأشجار B، نحتاج إلى الوصول إلى العقدة الأب لعقدة ما، ويمكن تحقيق ذلك بحفظ مرجع إلى العقدة الأب في العقدة، على غرار القائمة المترابطة المزدوجة.</li>
<li><strong>سجل المتصفح</strong>: في متصفحات الويب، عندما ينقر المستخدم على زر التقدم أو الرجوع، يحتاج المتصفح إلى معرفة صفحتي الويب السابقة والتالية التي زارها المستخدم. وخصائص القوائم المترابطة المزدوجة تجعل هذه العملية بسيطة.</li>
<li><strong>خوارزمية LRU</strong>: في خوارزميات إخلاء ذاكرة التخزين المؤقت (LRU)، نحتاج إلى العثور بسرعة على البيانات الأقل استخداماً حديثاً ودعم الإضافة والحذف السريعين للعقد. واستخدام قائمة مترابطة مزدوجة مناسب جداً لذلك.</li>
</ul>
<p>تُستخدم القوائم المترابطة الدائرية عادةً في الحالات التي تتطلب عمليات دورية، مثل جدولة موارد نظام التشغيل.</p>
<ul>
<li><strong>خوارزمية الجدولة الدورانية</strong>: في أنظمة التشغيل، الجدولة الدورانية خوارزمية شائعة لجدولة المعالج (CPU) تحتاج إلى الدوران على مجموعة من العمليات. وتُخصَّص لكل عملية شريحة زمنية، وعندما تنتهي الشريحة الزمنية ينتقل المعالج إلى العملية التالية. ويمكن تنفيذ هذه العملية الدورية باستخدام قائمة مترابطة دائرية.</li>
<li><strong>مخازن البيانات المؤقتة</strong>: في بعض تطبيقات مخازن البيانات المؤقتة، قد تُستخدم القوائم المترابطة الدائرية أيضاً. فمثلاً في مشغلات الصوت والفيديو، قد يُقسَّم تدفق البيانات إلى عدة كتل مخزنة وتُوضع في قائمة مترابطة دائرية لتحقيق تشغيل سلس متواصل.</li>
</ul>
`,i={book:s,chapter:a,chapterTitle:n,slug:t,title:l,headings:e,html:p};export{s as book,a as chapter,n as chapterTitle,i as default,e as headings,p as html,t as slug,l as title};
