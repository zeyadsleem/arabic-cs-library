const a="hello-algo",s="chapter_heap",n="Heap",t="heap",p="الكومة",e=[{depth:2,id:"عمليات-الكومة-الشائعة",text:"عمليات الكومة الشائعة"},{depth:3,id:"تخزين-الكومة-وتمثيلها",text:"تخزين الكومة وتمثيلها"}],l=`<p><u>الكومة (heap)</u> شجرة ثنائية كاملة تحقق شروطاً محددة، ويمكن تصنيفها أساساً إلى نوعين، كما هو موضح في الشكل أدناه.</p>
<ul>
<li><u>الكومة الصغرى (min heap)</u>: قيمة أي عقدة <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>≤</mo></mrow><annotation encoding="application/x-tex">\\leq</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7719em;vertical-align:-0.136em;"></span><span class="mrel">≤</span></span></span></span> قيم عقدها الفرعية.</li>
<li><u>الكومة العظمى (max heap)</u>: قيمة أي عقدة <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>≥</mo></mrow><annotation encoding="application/x-tex">\\geq</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7719em;vertical-align:-0.136em;"></span><span class="mrel">≥</span></span></span></span> قيم عقدها الفرعية.</li>
</ul>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_heap--min_heap_and_max_heap.png" alt="الكومة الصغرى والكومة العظمى"></p>
<p>وباعتبارها حالة خاصة من الشجرة الثنائية الكاملة، تتمتع الأكوام بالخصائص التالية.</p>
<ul>
<li>تُملأ عقد الطبقة السفلى من اليسار إلى اليمين، وتكون عقد الطبقات الأخرى ممتلئة بالكامل.</li>
<li>نسمي العقدة الجذرية للشجرة الثنائية «قمة الكومة»، ونسمي العقدة السفلى في أقصى اليمين «قاع الكومة».</li>
<li>في الكومة العظمى (الصغرى)، تكون قيمة العنصر الأعلى في الكومة (العقدة الجذرية) هي الأكبر (الأصغر).</li>
</ul>
<h2 id="عمليات-الكومة-الشائعة">عمليات الكومة الشائعة</h2>
<p>يجدر بالذكر أن كثيراً من لغات البرمجة توفر <u>طابور الأولوية (priority queue)</u>، وهي بنية بيانات مجردة تُعرّف بأنها طابور تُرتَّب عناصره حسب الأولوية.</p>
<p>وفي الواقع، <strong>تُستخدم الأكوام عادةً لتنفيذ طوابير الأولوية، حيث تقابل الكومة العظمى طابور أولوية تُسحب عناصره بترتيب تنازلي</strong>. ومن منظور الاستخدام، يمكننا اعتبار «طابور الأولوية» و«الكومة» بنيتي بيانات متكافئتين. لذلك لا يميّز هذا الكتاب بينهما تمييزاً خاصاً، بل يشير إليهما بصفة موحدة باسم «الكومة».</p>
<p>عمليات الكومة الشائعة موضحة في الجدول أدناه، وتتحدد أسماء الدوال وفقاً للغة البرمجة.</p>
<p align="center"> جدول <id> &nbsp; كفاءة عمليات الكومة </p>
<table>
<thead>
<tr>
<th>اسم الدالة</th>
<th>الوصف</th>
<th>التعقيد الزمني</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>push()</code></td>
<td>إدراج عنصر في الكومة</td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(\\log n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>pop()</code></td>
<td>حذف العنصر الأعلى في الكومة</td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(\\log n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>peek()</code></td>
<td>الوصول إلى العنصر الأعلى في الكومة (القيمة العظمى/الصغرى في الكومة العظمى/الصغرى)</td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>size()</code></td>
<td>الحصول على عدد عناصر الكومة</td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>isEmpty()</code></td>
<td>فحص ما إذا كانت الكومة فارغة</td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
</tbody>
</table>
<p>في التطبيقات العملية، يمكننا استخدام فئة الكومة (أو فئة طابور الأولوية) التي توفرها لغات البرمجة مباشرةً.</p>
<p>وعلى غرار «الترتيب التصاعدي» و«الترتيب التنازلي» في خوارزميات الترتيب، يمكننا تنفيذ التحويل بين «الكومة الصغرى» و«الكومة العظمى» عبر ضبط <code>flag</code> أو تعديل <code>Comparator</code>. والكود كما يلي:</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-python"><span class="hljs-comment"># Initialize a min heap</span>
min_heap, flag = [], <span class="hljs-number">1</span>
<span class="hljs-comment"># Initialize a max heap</span>
max_heap, flag = [], -<span class="hljs-number">1</span>

<span class="hljs-comment"># Python&#x27;s heapq module implements a min heap by default</span>
<span class="hljs-comment"># Consider negating elements before pushing them to the heap, which inverts the size relationship and thus implements a max heap</span>
<span class="hljs-comment"># In this example, flag = 1 corresponds to a min heap, flag = -1 corresponds to a max heap</span>

<span class="hljs-comment"># Push elements into the heap</span>
heapq.heappush(max_heap, flag * <span class="hljs-number">1</span>)
heapq.heappush(max_heap, flag * <span class="hljs-number">3</span>)
heapq.heappush(max_heap, flag * <span class="hljs-number">2</span>)
heapq.heappush(max_heap, flag * <span class="hljs-number">5</span>)
heapq.heappush(max_heap, flag * <span class="hljs-number">4</span>)

<span class="hljs-comment"># Get the heap top element</span>
peek: <span class="hljs-built_in">int</span> = flag * max_heap[<span class="hljs-number">0</span>] <span class="hljs-comment"># 5</span>

<span class="hljs-comment"># Remove the heap top element</span>
<span class="hljs-comment"># The removed elements will form a descending sequence</span>
val = flag * heapq.heappop(max_heap) <span class="hljs-comment"># 5</span>
val = flag * heapq.heappop(max_heap) <span class="hljs-comment"># 4</span>
val = flag * heapq.heappop(max_heap) <span class="hljs-comment"># 3</span>
val = flag * heapq.heappop(max_heap) <span class="hljs-comment"># 2</span>
val = flag * heapq.heappop(max_heap) <span class="hljs-comment"># 1</span>

<span class="hljs-comment"># Get the heap size</span>
size: <span class="hljs-built_in">int</span> = <span class="hljs-built_in">len</span>(max_heap)

<span class="hljs-comment"># Check if the heap is empty</span>
is_empty: <span class="hljs-built_in">bool</span> = <span class="hljs-keyword">not</span> max_heap

<span class="hljs-comment"># Build a heap from an input list</span>
min_heap: <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>] = [<span class="hljs-number">1</span>, <span class="hljs-number">3</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>]
heapq.heapify(min_heap)
</code></pre>
</div>## تنفيذ الكومة
<p>التنفيذ التالي خاص بالكومة العظمى. ولتحويله إلى كومة صغرى، ما عليك سوى عكس كل منطق المقارنة المتعلق بالترتيب (على سبيل المثال، استبدال <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>≥</mo></mrow><annotation encoding="application/x-tex">\\geq</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7719em;vertical-align:-0.136em;"></span><span class="mrel">≥</span></span></span></span> بـ <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>≤</mo></mrow><annotation encoding="application/x-tex">\\leq</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7719em;vertical-align:-0.136em;"></span><span class="mrel">≤</span></span></span></span>). ونشجّع القرّاء المهتمين على تنفيذ ذلك بأنفسهم.</p>
<h3 id="تخزين-الكومة-وتمثيلها">تخزين الكومة وتمثيلها</h3>
<p>كما ذُكر في فصل «الشجرة الثنائية»، تلائم الأشجار الثنائية الكاملة التمثيل بالمصفوفات. ولأن الأكوام نوع من الأشجار الثنائية الكاملة، <strong>فإننا سنستخدم المصفوفات لتخزين الأكوام</strong>.</p>
<p>عند تمثيل شجرة ثنائية بمصفوفة، تمثل العناصر قيم العقد، وتمثل الفهارس مواضع العقد في الشجرة الثنائية. <strong>وتُمثَّل علاقات الأب-الابن عبر صيغ ربط الفهارس</strong>.</p>
<p>وكما هو موضح في الشكل أدناه، بمعطى فهرس <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>i</mi></mrow><annotation encoding="application/x-tex">i</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6595em;"></span><span class="mord mathnormal">i</span></span></span></span>، يكون فهرس الابن الأيسر <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>2</mn><mi>i</mi><mo>+</mo><mn>1</mn></mrow><annotation encoding="application/x-tex">2i + 1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7429em;vertical-align:-0.0833em;"></span><span class="mord">2</span><span class="mord mathnormal">i</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span>، وفهرس الابن الأيمن <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>2</mn><mi>i</mi><mo>+</mo><mn>2</mn></mrow><annotation encoding="application/x-tex">2i + 2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.7429em;vertical-align:-0.0833em;"></span><span class="mord">2</span><span class="mord mathnormal">i</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">+</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">2</span></span></span></span>، وفهرس الأب <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo stretchy="false">(</mo><mi>i</mi><mo>−</mo><mn>1</mn><mo stretchy="false">)</mo><mi mathvariant="normal">/</mi><mn>2</mn></mrow><annotation encoding="application/x-tex">(i - 1) / 2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mopen">(</span><span class="mord mathnormal">i</span><span class="mspace" style="margin-right:0.2222em;"></span><span class="mbin">−</span><span class="mspace" style="margin-right:0.2222em;"></span></span><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord">1</span><span class="mclose">)</span><span class="mord">/2</span></span></span></span> (قسمة أرضية). وعندما يخرج الفهرس عن الحدود، فهذا يشير إلى عقدة فارغة أو إلى أن العقدة غير موجودة.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_heap--representation_of_heap.png" alt="تمثيل الأكوام وتخزينها"></p>
<p>يمكننا تغليف صيغة ربط الفهارس في دوال لتسهيل استخدامها لاحقاً:</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">parent</span>(<span class="hljs-params">self, i: <span class="hljs-built_in">int</span></span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Get the parent index&quot;&quot;&quot;</span>
        <span class="hljs-keyword">return</span> (i - <span class="hljs-number">1</span>) // <span class="hljs-number">2</span>  <span class="hljs-comment"># قسمة مقربة نزولًا</span>
</code></pre>
</div>### الوصول إلى العنصر الأعلى في الكومة
<p>العنصر الأعلى في الكومة هو العقدة الجذرية للشجرة الثنائية، وهو أيضاً العنصر الأول في القائمة:</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">peek</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Access the top element of the heap&quot;&quot;&quot;</span>
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.max_heap[<span class="hljs-number">0</span>]
</code></pre>
</div>### إدراج عنصر في الكومة
<p>بمعطى عنصر <code>val</code>، نضيفه أولاً إلى قاع الكومة. وبعد الإدراج، قد تُنتهك خاصية الكومة لأن <code>val</code> قد يكون أكبر من عناصر أخرى في الكومة. <strong>لذلك نحتاج إلى استعادة خاصية الكومة على طول المسار من العقدة المُدرجة إلى الجذر</strong>. وتسمى هذه العملية <u>تعديل الكومة (heapify)</u>.</p>
<p>بدءاً من العقدة المُدرجة، <strong>ننفّذ تعديل الكومة من الأسفل إلى الأعلى</strong>. وكما هو موضح في الشكل أدناه، نقارن العقدة المُدرجة بالعقدة الأب، وإذا كانت العقدة المُدرجة أكبر نبادلهما. ونواصل هذه العملية من الأسفل إلى الأعلى حتى نتجاوز الجذر أو نصل إلى عقدة لم تعد بحاجة إلى تبادل.</p>
<p>بالمجموع <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> من العقد، يكون ارتفاع الشجرة <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(\\log n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>. ومن ثم، فإن عدد تكرارات الحلقة في عملية تعديل الكومة لا يزيد عن <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(\\log n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>، <strong>وهو ما يجعل التعقيد الزمني لعملية إدراج العنصر <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(\\log n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></strong>. والكود كما يلي:</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">sift_up</span>(<span class="hljs-params">self, i: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-string">&quot;&quot;&quot;Sift up starting from node i&quot;&quot;&quot;</span>
        <span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
            <span class="hljs-comment"># احصل على أصل العقدة i</span>
            p = <span class="hljs-variable language_">self</span>.parent(i)
            <span class="hljs-comment"># توقف عن الرشّ عند تجاوز الجذر أو عدم حاجة العقدة إلى إصلاح</span>
            <span class="hljs-keyword">if</span> p &lt; <span class="hljs-number">0</span> <span class="hljs-keyword">or</span> <span class="hljs-variable language_">self</span>.max_heap[i] &lt;= <span class="hljs-variable language_">self</span>.max_heap[p]:
                <span class="hljs-keyword">break</span>
            <span class="hljs-comment"># بدّل العقدتين</span>
            <span class="hljs-variable language_">self</span>.swap(i, p)
            <span class="hljs-comment"># واصل الرشّ صعودًا</span>
            i = p
</code></pre>
</div>### حذف العنصر الأعلى في الكومة
<p>العنصر الأعلى في الكومة هو العقدة الجذرية للشجرة الثنائية، وهو العنصر الأول في القائمة. وإذا حذفنا العنصر الأول من القائمة مباشرةً، فستتغير جميع فهارس العقد في الشجرة الثنائية، مما يصعّب الإصلاح اللاحق بتعديل الكومة. ولتقليل تغيّرات فهارس العناصر إلى أدنى حد، نتبع الخطوات التالية.</p>
<ol>
<li>بادل العنصر الأعلى في الكومة بعنصر قاع الكومة (بادل العقدة الجذرية بالعقدة الورقية الأقصى يميناً).</li>
<li>بعد التبادل، احذف قاع الكومة من القائمة (لاحظ أننا في الواقع نحذف العنصر الأعلى الأصلي في الكومة لأننا بادلناه).</li>
<li>بدءاً من العقدة الجذرية، <strong>نفّذ تعديل الكومة من الأعلى إلى الأسفل</strong>.</li>
</ol>
<p>وكما هو موضح في الشكل أدناه، <strong>يكون اتجاه «تعديل الكومة من الأعلى إلى الأسفل» معاكساً لاتجاه «تعديل الكومة من الأسفل إلى الأعلى»</strong>. نقارن قيمة العقدة الجذرية بقيم ابنيها ونبادلها مع الابن الأكبر. ثم نكرّر هذه العملية حتى نتجاوز عقدة ورقية أو نصادف عقدة لا تحتاج إلى تبادل.</p>
<p>وعلى غرار عملية إدراج العنصر، يكون التعقيد الزمني لعملية حذف العنصر الأعلى في الكومة أيضاً <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(\\log n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>. والكود كما يلي:</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py">    <span class="hljs-keyword">def</span> <span class="hljs-title function_">sift_down</span>(<span class="hljs-params">self, i: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-string">&quot;&quot;&quot;Sift down starting from node i&quot;&quot;&quot;</span>
        <span class="hljs-keyword">while</span> <span class="hljs-literal">True</span>:
            <span class="hljs-comment"># أوجد العقدة ذات القيمة الأكبر بين i و l و r، وخزّن فهرسها في ma</span>
            l, r, ma = <span class="hljs-variable language_">self</span>.left(i), <span class="hljs-variable language_">self</span>.right(i), i
            <span class="hljs-keyword">if</span> l &lt; <span class="hljs-variable language_">self</span>.size() <span class="hljs-keyword">and</span> <span class="hljs-variable language_">self</span>.max_heap[l] &gt; <span class="hljs-variable language_">self</span>.max_heap[ma]:
                ma = l
            <span class="hljs-keyword">if</span> r &lt; <span class="hljs-variable language_">self</span>.size() <span class="hljs-keyword">and</span> <span class="hljs-variable language_">self</span>.max_heap[r] &gt; <span class="hljs-variable language_">self</span>.max_heap[ma]:
                ma = r
            <span class="hljs-comment"># توقف إذا كانت العقدة i هي الأكبر أو خرج فهرسا الابنين l و r كلاهما عن الحدود</span>
            <span class="hljs-keyword">if</span> ma == i:
                <span class="hljs-keyword">break</span>
            <span class="hljs-comment"># بدّل العقدتين</span>
            <span class="hljs-variable language_">self</span>.swap(i, ma)
            <span class="hljs-comment"># واصل الرشّ نزولًا</span>
            i = ma
</code></pre>
</div>## التطبيقات الشائعة للأكوام
<ul>
<li><strong>طابور الأولوية</strong>: الأكوام عادةً هي بنية البيانات المفضلة لتنفيذ طوابير الأولوية. فالتعقيد الزمني لكل من عمليتي الإدخال والإخراج هو <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>log</mi><mo>⁡</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(\\log n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mop">lo<span style="margin-right:0.0139em;">g</span></span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>، وبناء الكومة له تعقيد زمني <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>، مما يجعل هذه العمليات عالية الكفاءة.</li>
<li><strong>ترتيب الكومة</strong>: بمعطى مجموعة من البيانات، يمكننا بناء كومة منها ثم تنفيذ عمليات حذف العناصر باستمرار للحصول على بيانات مرتبة. غير أننا نستخدم عادةً أسلوباً أكثر أناقة لتنفيذ ترتيب الكومة، كما هو مفصل في فصل «ترتيب الكومة».</li>
<li><strong>الحصول على أكبر <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>k</mi></mrow><annotation encoding="application/x-tex">k</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6944em;"></span><span class="mord mathnormal" style="margin-right:0.0315em;">k</span></span></span></span> من العناصر</strong>: هذه مسألة خوارزمية كلاسيكية وتطبيق نموذجي أيضاً، مثل اختيار الأخبار العشرة الأكثر رواجاً في «بحث ويبو الساخن» أو المنتجات العشرة الأكثر مبيعاً.</li>
</ul>
`,m={book:a,chapter:s,chapterTitle:n,slug:t,title:p,headings:e,html:l};export{a as book,s as chapter,n as chapterTitle,m as default,e as headings,l as html,t as slug,p as title};
