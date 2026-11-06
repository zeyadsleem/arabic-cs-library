const s="hello-algo",a="chapter_stack_and_queue",n="Stacks and Queues",l="stack",t="المكدس",p=[{depth:2,id:"عمليات-المكدس-الشائعة",text:"عمليات المكدس الشائعة"},{depth:3,id:"التنفيذ-بقائمة-مترابطة",text:"التنفيذ بقائمة مترابطة"},{depth:2,id:"التطبيقات-النموذجية-للمكدس",text:"التطبيقات النموذجية للمكدس"}],e=`<p><u>المكدس</u> (stack) بنية بيانات خطية تتبع مبدأ آخر ما يدخل يخرج أولاً (LIFO).</p>
<p>يمكننا تشبيه المكدس بكومة من الأطباق على طاولة. فإذا اشترطنا أنه لا يمكن تحريك سوى طبق واحد في كل مرة، فعندئذٍ للحصول على الطبق السفلي يجب أولاً إزالة الأطباق التي فوقه واحداً تلو الآخر. وإذا استبدلنا الأطباق بأنواع مختلفة من العناصر (مثل الأعداد الصحيحة والمحارف والكائنات وغيرها)، نحصل على بنية بيانات المكدس.</p>
<p>كما يظهر في الشكل التالي، نسمي أعلى العناصر المكدسة &quot;القمة&quot; وأدناها &quot;القاع&quot;. وتسمى عملية إضافة عنصر إلى القمة &quot;الدفع&quot; (push)، وتسمى عملية إزالة العنصر العلوي &quot;السحب&quot; (pop).</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_stack_and_queue--stack_operations.png" alt="قاعدة LIFO في المكدس"></p>
<h2 id="عمليات-المكدس-الشائعة">عمليات المكدس الشائعة</h2>
<p>تظهر العمليات الشائعة على المكدس في الجدول التالي. وتعتمد أسماء الدوال المحددة على لغة البرمجة المستخدمة. وهنا نستخدم التسمية الشائعة <code>push()</code> و<code>pop()</code> و<code>peek()</code>.</p>
<p align="center"> جدول <id> &nbsp; كفاءة عمليات المكدس </p>
<table>
<thead>
<tr>
<th>الدالة</th>
<th>الوصف</th>
<th>التعقيد الزمني</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>push()</code></td>
<td>دفع عنصر إلى المكدس (إضافته إلى القمة)</td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>pop()</code></td>
<td>سحب العنصر العلوي من المكدس</td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>peek()</code></td>
<td>الاطّلاع على العنصر العلوي</td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
</tbody>
</table>
<p>عادةً يمكننا استخدام فئة المكدس المدمجة التي توفرها لغة البرمجة مباشرة. ومع ذلك، قد لا توفر بعض اللغات فئة مكدس مخصصة. في هذه الحالات، يمكننا استخدام &quot;المصفوفة&quot; أو &quot;القائمة المترابطة&quot; في اللغة كمكدس، بشرط تجنّب استخدام العمليات غير المتعلقة بسلوك المكدس.</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-python"><span class="hljs-comment"># Initialize stack</span>
<span class="hljs-comment"># Python does not have a built-in stack class, can use list as a stack</span>
stack: <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>] = []

<span class="hljs-comment"># Push elements</span>
stack.append(<span class="hljs-number">1</span>)
stack.append(<span class="hljs-number">3</span>)
stack.append(<span class="hljs-number">2</span>)
stack.append(<span class="hljs-number">5</span>)
stack.append(<span class="hljs-number">4</span>)

<span class="hljs-comment"># Access top element</span>
peek: <span class="hljs-built_in">int</span> = stack[-<span class="hljs-number">1</span>]

<span class="hljs-comment"># Pop element</span>
pop: <span class="hljs-built_in">int</span> = stack.pop()

<span class="hljs-comment"># Get stack length</span>
size: <span class="hljs-built_in">int</span> = <span class="hljs-built_in">len</span>(stack)

<span class="hljs-comment"># Check if empty</span>
is_empty: <span class="hljs-built_in">bool</span> = <span class="hljs-built_in">len</span>(stack) == <span class="hljs-number">0</span>
</code></pre>
</div>
## تنفيذ المكدس
<p>لفهم كيفية عمل المكدس فهماً أعمق، دعنا نحاول تنفيذ فئة مكدس بأنفسنا.</p>
<p>يتبع المكدس مبدأ LIFO، لذا يمكننا فقط إضافة العناصر أو إزالتها عند القمة. غير أن المصفوفات والقوائم المترابطة معاً تسمحان بإضافة العناصر وإزالتها في أي موضع. <strong>لذلك، يمكن النظر إلى المكدس كمصفوفة أو قائمة مترابطة مقيّدة</strong>. بعبارة أخرى، يمكننا &quot;حجب&quot; بعض العمليات غير ذات الصلة في المصفوفات أو القوائم المترابطة بحيث يتوافق منطقها الخارجي مع خصائص المكدس.</p>
<h3 id="التنفيذ-بقائمة-مترابطة">التنفيذ بقائمة مترابطة</h3>
<p>عند تنفيذ مكدس باستخدام قائمة مترابطة، يمكننا اعتبار العقدة الرأسية للقائمة المترابطة قمةَ المكدس والعقدة الذيلية قاعَه.</p>
<p>كما يظهر في الشكل التالي، في عملية الدفع نكتفي بإدراج عنصر عند رأس القائمة المترابطة. وتسمى طريقة إدراج العقد هذه &quot;طريقة الإدراج الرأسي&quot;. وفي عملية السحب، نحتاج فقط إلى إزالة العقدة الرأسية من القائمة المترابطة.</p>
<p>فيما يلي شيفرة نموذجية لتنفيذ مكدس قائم على قائمة مترابطة:</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py"><span class="hljs-keyword">class</span> <span class="hljs-title class_">LinkedListStack</span>:
    <span class="hljs-string">&quot;&quot;&quot;Stack implemented with a linked list&quot;&quot;&quot;</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot;Constructor&quot;&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>._peek: ListNode | <span class="hljs-literal">None</span> = <span class="hljs-literal">None</span>
        <span class="hljs-variable language_">self</span>._size: <span class="hljs-built_in">int</span> = <span class="hljs-number">0</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">size</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Get the stack size&quot;&quot;&quot;</span>
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>._size

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">is_empty</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">bool</span>:
        <span class="hljs-string">&quot;&quot;&quot;Check whether the stack is empty&quot;&quot;&quot;</span>
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>._size == <span class="hljs-number">0</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">push</span>(<span class="hljs-params">self, val: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-string">&quot;&quot;&quot;Push&quot;&quot;&quot;</span>
        node = ListNode(val)
        node.<span class="hljs-built_in">next</span> = <span class="hljs-variable language_">self</span>._peek
        <span class="hljs-variable language_">self</span>._peek = node
        <span class="hljs-variable language_">self</span>._size += <span class="hljs-number">1</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">pop</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Pop&quot;&quot;&quot;</span>
        num = <span class="hljs-variable language_">self</span>.peek()
        <span class="hljs-variable language_">self</span>._peek = <span class="hljs-variable language_">self</span>._peek.<span class="hljs-built_in">next</span>
        <span class="hljs-variable language_">self</span>._size -= <span class="hljs-number">1</span>
        <span class="hljs-keyword">return</span> num

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">peek</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Access the top element&quot;&quot;&quot;</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.is_empty():
            <span class="hljs-keyword">raise</span> IndexError(<span class="hljs-string">&quot;Stack is empty&quot;</span>)
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>._peek.val

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">to_list</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>]:
        <span class="hljs-string">&quot;&quot;&quot;Convert to a list for printing&quot;&quot;&quot;</span>
        arr = []
        node = <span class="hljs-variable language_">self</span>._peek
        <span class="hljs-keyword">while</span> node:
            arr.append(node.val)
            node = node.<span class="hljs-built_in">next</span>
        arr.reverse()
        <span class="hljs-keyword">return</span> arr
</code></pre>
</div>
### التنفيذ بمصفوفة
<p>عند تنفيذ مكدس باستخدام مصفوفة، يمكننا اعتبار نهاية المصفوفة قمةَ المكدس. وكما يظهر في الشكل التالي، تقابل عمليتا الدفع والسحب إضافة عناصر وحذفها عند نهاية المصفوفة، وكلتاهما بتعقيد زمني <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span>.</p>
<p>بما أن العناصر المدفوعة إلى المكدس قد تزداد باستمرار، يمكننا استخدام مصفوفة ديناميكية، مما يلغي الحاجة إلى معالجة توسيع المصفوفة بأنفسنا. وإليك الشيفرة النموذجية:</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py"><span class="hljs-keyword">class</span> <span class="hljs-title class_">ArrayStack</span>:
    <span class="hljs-string">&quot;&quot;&quot;Stack implemented with an array&quot;&quot;&quot;</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot;Constructor&quot;&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>._stack: <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>] = []

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">size</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Get the stack size&quot;&quot;&quot;</span>
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">len</span>(<span class="hljs-variable language_">self</span>._stack)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">is_empty</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">bool</span>:
        <span class="hljs-string">&quot;&quot;&quot;Check whether the stack is empty&quot;&quot;&quot;</span>
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.size() == <span class="hljs-number">0</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">push</span>(<span class="hljs-params">self, item: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-string">&quot;&quot;&quot;Push&quot;&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>._stack.append(item)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">pop</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Pop&quot;&quot;&quot;</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.is_empty():
            <span class="hljs-keyword">raise</span> IndexError(<span class="hljs-string">&quot;Stack is empty&quot;</span>)
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>._stack.pop()

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">peek</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Access the top element&quot;&quot;&quot;</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.is_empty():
            <span class="hljs-keyword">raise</span> IndexError(<span class="hljs-string">&quot;Stack is empty&quot;</span>)
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>._stack[-<span class="hljs-number">1</span>]

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">to_list</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>]:
        <span class="hljs-string">&quot;&quot;&quot;Return a list for printing&quot;&quot;&quot;</span>
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>._stack
</code></pre>
</div>
## مقارنة بين التنفيذين
<p><strong>العمليات المدعومة</strong></p>
<p>يدعم التنفيذان جميع العمليات التي يعرّفها المكدس. ويتميز التنفيذ بالمصفوفة بأنه يدعم إضافةً إلى ذلك الوصول العشوائي، لكن هذا يخرج عن تعريف المكدس ولا يُستخدم عادةً.</p>
<p><strong>الكفاءة الزمنية</strong></p>
<p>في التنفيذ القائم على المصفوفة، تحدث عمليتا الدفع والسحب معاً في ذاكرة متجاورة مخصصة مسبقاً، وهو ما يتمتع بمحلية جيدة لذاكرة التخزين المؤقت (cache locality)، وبالتالي يكون أكثر كفاءة. غير أنه إذا تجاوز الدفع سعة المصفوفة، فسيُفعِّل آلية توسيع، مما يجعل التعقيد الزمني لعملية الدفع تلك تحديداً <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>.</p>
<p>في التنفيذ القائم على القائمة المترابطة، يكون توسيع القائمة مرناً جداً، ولا توجد مشكلة انخفاض الكفاءة بسبب توسيع المصفوفة. غير أن عملية الدفع تتطلب تهيئة كائن عقدة وتعديل المؤشرات، لذا فهي أقل كفاءة نسبياً. ومع ذلك، إذا كانت العناصر المدفوعة كائنات عقد بالفعل، فيمكن حذف خطوة التهيئة، مما يحسّن الكفاءة.</p>
<p>خلاصةً، عندما تكون العناصر المدفوعة والمسحوبة من أنواع بيانات أساسية مثل <code>int</code> أو <code>double</code>، يمكننا استخلاص الاستنتاجين التاليين:</p>
<ul>
<li>ينخفض أداء التنفيذ القائم على المصفوفة عند تفعيل التوسيع، لكن بما أن التوسيع عملية نادرة، فإن متوسط الكفاءة أعلى.</li>
<li>يمكن للتنفيذ القائم على القائمة المترابطة تقديم أداء كفاءة أكثر استقراراً.</li>
</ul>
<p><strong>الكفاءة المكانية</strong></p>
<p>عند تهيئة قائمة، يخصص النظام &quot;سعة أولية&quot; قد تتجاوز الحاجة الفعلية. وإضافة إلى ذلك، توسّع آلية التوسيع عادةً بنسبة محددة (مثل الضعف)، وقد تتجاوز السعة بعد التوسيع الحاجة الفعلية أيضاً. لذلك، <strong>قد يسبب التنفيذ القائم على المصفوفة بعض التبذير في المساحة</strong>.</p>
<p>غير أن عقد القائمة المترابطة تحتاج إلى تخزين مؤشرات إضافية، لذا <strong>تكون المساحة التي تشغلها عقد القائمة المترابطة كبيرة نسبياً</strong>.</p>
<p>خلاصةً، لا يمكننا الجزم ببساطة أيهما أكثر كفاءة في استخدام الذاكرة، بل نحتاج إلى تحليل الحالة المحددة.</p>
<h2 id="التطبيقات-النموذجية-للمكدس">التطبيقات النموذجية للمكدس</h2>
<ul>
<li><strong>الرجوع والتقدم في المتصفحات، والتراجع والإعادة في البرمجيات</strong>. في كل مرة نفتح صفحة ويب جديدة، يدفع المتصفح الصفحة السابقة إلى المكدس، مما يتيح لنا العودة إلى الصفحة السابقة عبر عملية الرجوع. وعملية الرجوع هي في جوهرها تنفيذ لعملية سحب. ولدعم الرجوع والتقدم معاً، نحتاج إلى مكدسين يعملان معاً.</li>
<li><strong>إدارة ذاكرة البرنامج</strong>. في كل مرة تُستدعى دالة، يضيف النظام إطار مكدس (stack frame) إلى قمة المكدس لتسجيل معلومات سياق الدالة. وأثناء التعاود، تنفذ مرحلة التعاود النزولية عمليات دفع متواصلة، بينما تنفذ مرحلة التتبّع الرجعي الصعودية عمليات سحب متواصلة.</li>
</ul>
`,o={book:s,chapter:a,chapterTitle:n,slug:l,title:t,headings:p,html:e};export{s as book,a as chapter,n as chapterTitle,o as default,p as headings,e as html,l as slug,t as title};
