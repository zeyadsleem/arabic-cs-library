const s="hello-algo",a="chapter_stack_and_queue",n="Stacks and Queues",l="deque",e="الطابور المزدوج",p=[{depth:2,id:"العمليات-الشائعة-على-الطابور-المزدوج",text:"العمليات الشائعة على الطابور المزدوج"},{depth:3,id:"التنفيذ-بقائمة-مترابطة-مزدوجة",text:"التنفيذ بقائمة مترابطة مزدوجة"}],t=`<p>في الطابور، لا يمكننا سوى إزالة العناصر من المقدمة أو إضافة العناصر في المؤخرة. وكما هو موضح في الشكل أدناه، يوفّر <u>الطابور المزدوج (deque)</u> مرونة أكبر، إذ يتيح إضافة العناصر وإزالتها من المقدمة والمؤخرة معاً.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_stack_and_queue--deque_operations.png" alt="عمليات الطابور المزدوج"></p>
<h2 id="العمليات-الشائعة-على-الطابور-المزدوج">العمليات الشائعة على الطابور المزدوج</h2>
<p>يوضح الجدول أدناه العمليات الشائعة على الطابور المزدوج. وتتحدد أسماء الدوال المحددة بلغة البرمجة المستخدمة.</p>
<p align="center"> جدول <id> &nbsp; كفاءة عمليات الطابور المزدوج </p>
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
<td><code>push_first()</code></td>
<td>إضافة عنصر إلى المقدمة</td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>push_last()</code></td>
<td>إضافة عنصر إلى المؤخرة</td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>pop_first()</code></td>
<td>إزالة العنصر الأمامي</td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>pop_last()</code></td>
<td>إزالة العنصر الخلفي</td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>peek_first()</code></td>
<td>الوصول إلى العنصر الأمامي</td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>peek_last()</code></td>
<td>الوصول إلى العنصر الخلفي</td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
</tbody>
</table>
<p>وبالمثل، يمكننا استخدام فئات الطابور المزدوج التي توفّرها لغة البرمجة مباشرةً:</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> collections <span class="hljs-keyword">import</span> deque

<span class="hljs-comment"># Initialize deque</span>
deq: deque[<span class="hljs-built_in">int</span>] = deque()

<span class="hljs-comment"># Enqueue elements</span>
deq.append(<span class="hljs-number">2</span>)      <span class="hljs-comment"># Add to rear</span>
deq.append(<span class="hljs-number">5</span>)
deq.append(<span class="hljs-number">4</span>)
deq.appendleft(<span class="hljs-number">3</span>)  <span class="hljs-comment"># Add to front</span>
deq.appendleft(<span class="hljs-number">1</span>)

<span class="hljs-comment"># Access elements</span>
front: <span class="hljs-built_in">int</span> = deq[<span class="hljs-number">0</span>]  <span class="hljs-comment"># Front element</span>
rear: <span class="hljs-built_in">int</span> = deq[-<span class="hljs-number">1</span>]  <span class="hljs-comment"># Rear element</span>

<span class="hljs-comment"># Dequeue elements</span>
pop_front: <span class="hljs-built_in">int</span> = deq.popleft()  <span class="hljs-comment"># Front element dequeue</span>
pop_rear: <span class="hljs-built_in">int</span> = deq.pop()       <span class="hljs-comment"># Rear element dequeue</span>

<span class="hljs-comment"># Get deque length</span>
size: <span class="hljs-built_in">int</span> = <span class="hljs-built_in">len</span>(deq)

<span class="hljs-comment"># Check if deque is empty</span>
is_empty: <span class="hljs-built_in">bool</span> = <span class="hljs-built_in">len</span>(deq) == <span class="hljs-number">0</span>
</code></pre>
</div>## تنفيذ الطابور المزدوج *
<p>تنفيذ الطابور المزدوج مشابه لتنفيذ الطابور. ويمكنك اختيار قائمة مترابطة أو مصفوفة كبنية بيانات أساسية.</p>
<h3 id="التنفيذ-بقائمة-مترابطة-مزدوجة">التنفيذ بقائمة مترابطة مزدوجة</h3>
<p>وبمراجعة القسم السابق، استخدمنا قائمة مترابطة أحادية عادية لتنفيذ طابور، لأنها تتيح بسهولة حذف العقدة الرأسية (المقابلة للإخراج من الطابور) وإضافة عقد جديدة بعد العقدة الذيلية (المقابلة للإدخال إلى الطابور).</p>
<p>أما الطابور المزدوج، فيمكن للمقدمة والمؤخرة فيه إجراء عمليتي الإدخال والإخراج معاً. وبعبارة أخرى، يحتاج الطابور المزدوج إلى تنفيذ عمليات في الاتجاه المعاكس أيضاً. لهذا السبب، نستخدم «قائمة مترابطة مزدوجة» كبنية بيانات أساسية للطابور المزدوج.</p>
<p>وكما هو موضح في الشكل أدناه، نتعامل مع العقدة الرأسية والعقدة الذيلية في القائمة المترابطة المزدوجة على أنهما مقدمة الطابور المزدوج ومؤخرته، منفّذين وظيفة إضافة العقد وحذفها من كلا الطرفين.</p>
<p>وتظهر شيفرة التنفيذ أدناه:</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py"><span class="hljs-keyword">class</span> <span class="hljs-title class_">LinkedListDeque</span>:
    <span class="hljs-string">&quot;&quot;&quot;Deque implemented with a doubly linked list&quot;&quot;&quot;</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot;Constructor&quot;&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>._front: ListNode | <span class="hljs-literal">None</span> = <span class="hljs-literal">None</span>  <span class="hljs-comment"># عقدة الرأس front</span>
        <span class="hljs-variable language_">self</span>._rear: ListNode | <span class="hljs-literal">None</span> = <span class="hljs-literal">None</span>  <span class="hljs-comment"># عقدة الذيل rear</span>
        <span class="hljs-variable language_">self</span>._size: <span class="hljs-built_in">int</span> = <span class="hljs-number">0</span>  <span class="hljs-comment"># حجم الطابور المزدوج</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">size</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Get the deque size&quot;&quot;&quot;</span>
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>._size

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">is_empty</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">bool</span>:
        <span class="hljs-string">&quot;&quot;&quot;Check whether the deque is empty&quot;&quot;&quot;</span>
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>._size == <span class="hljs-number">0</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">push</span>(<span class="hljs-params">self, num: <span class="hljs-built_in">int</span>, is_front: <span class="hljs-built_in">bool</span></span>):
        <span class="hljs-string">&quot;&quot;&quot;Enqueue operation&quot;&quot;&quot;</span>
        node = ListNode(num)
        <span class="hljs-comment"># إذا كانت القائمة المترابطة فارغة، اجعل front و rear يشيران إلى العقدة معًا</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.is_empty():
            <span class="hljs-variable language_">self</span>._front = <span class="hljs-variable language_">self</span>._rear = node
        <span class="hljs-comment"># إدخال من المقدمة</span>
        <span class="hljs-keyword">elif</span> is_front:
            <span class="hljs-comment"># أضف العقدة إلى رأس القائمة المترابطة</span>
            <span class="hljs-variable language_">self</span>._front.prev = node
            node.<span class="hljs-built_in">next</span> = <span class="hljs-variable language_">self</span>._front
            <span class="hljs-variable language_">self</span>._front = node  <span class="hljs-comment"># حدّث عقدة الرأس</span>
        <span class="hljs-comment"># إدخال من المؤخرة</span>
        <span class="hljs-keyword">else</span>:
            <span class="hljs-comment"># أضف العقدة إلى ذيل القائمة المترابطة</span>
            <span class="hljs-variable language_">self</span>._rear.<span class="hljs-built_in">next</span> = node
            node.prev = <span class="hljs-variable language_">self</span>._rear
            <span class="hljs-variable language_">self</span>._rear = node  <span class="hljs-comment"># حدّث عقدة الذيل</span>
        <span class="hljs-variable language_">self</span>._size += <span class="hljs-number">1</span>  <span class="hljs-comment"># حدّث حجم الطابور المزدوج</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">push_first</span>(<span class="hljs-params">self, num: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-string">&quot;&quot;&quot;Enqueue at the front&quot;&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>.push(num, <span class="hljs-literal">True</span>)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">push_last</span>(<span class="hljs-params">self, num: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-string">&quot;&quot;&quot;Enqueue at the rear&quot;&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>.push(num, <span class="hljs-literal">False</span>)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">pop</span>(<span class="hljs-params">self, is_front: <span class="hljs-built_in">bool</span></span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Dequeue operation&quot;&quot;&quot;</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.is_empty():
            <span class="hljs-keyword">raise</span> IndexError(<span class="hljs-string">&quot;Deque is empty&quot;</span>)
        <span class="hljs-comment"># عندما يكون حجم الطابور المزدوج 1، يشير الرأس والذيل إلى العقدة نفسها</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>._size == <span class="hljs-number">1</span>:
            val: <span class="hljs-built_in">int</span> = <span class="hljs-variable language_">self</span>._front.val
            <span class="hljs-variable language_">self</span>._front = <span class="hljs-literal">None</span>
            <span class="hljs-variable language_">self</span>._rear = <span class="hljs-literal">None</span>
        <span class="hljs-comment"># إخراج من المقدمة</span>
        <span class="hljs-keyword">elif</span> is_front:
            val: <span class="hljs-built_in">int</span> = <span class="hljs-variable language_">self</span>._front.val  <span class="hljs-comment"># احفظ قيمة عقدة الرأس</span>
            <span class="hljs-comment"># احذف العقدة الرأس</span>
            fnext: ListNode | <span class="hljs-literal">None</span> = <span class="hljs-variable language_">self</span>._front.<span class="hljs-built_in">next</span>
            fnext.prev = <span class="hljs-literal">None</span>
            <span class="hljs-variable language_">self</span>._front.<span class="hljs-built_in">next</span> = <span class="hljs-literal">None</span>
            <span class="hljs-variable language_">self</span>._front = fnext  <span class="hljs-comment"># حدّث عقدة الرأس</span>
        <span class="hljs-comment"># إخراج من المؤخرة</span>
        <span class="hljs-keyword">else</span>:
            val: <span class="hljs-built_in">int</span> = <span class="hljs-variable language_">self</span>._rear.val  <span class="hljs-comment"># احفظ قيمة عقدة الذيل</span>
            <span class="hljs-comment"># احذف عقدة الذيل</span>
            rprev: ListNode | <span class="hljs-literal">None</span> = <span class="hljs-variable language_">self</span>._rear.prev
            rprev.<span class="hljs-built_in">next</span> = <span class="hljs-literal">None</span>
            <span class="hljs-variable language_">self</span>._rear.prev = <span class="hljs-literal">None</span>
            <span class="hljs-variable language_">self</span>._rear = rprev  <span class="hljs-comment"># حدّث عقدة الذيل</span>
        <span class="hljs-variable language_">self</span>._size -= <span class="hljs-number">1</span>  <span class="hljs-comment"># حدّث حجم الطابور المزدوج</span>
        <span class="hljs-keyword">return</span> val

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">pop_first</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Dequeue from the front&quot;&quot;&quot;</span>
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.pop(<span class="hljs-literal">True</span>)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">pop_last</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Dequeue from the rear&quot;&quot;&quot;</span>
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.pop(<span class="hljs-literal">False</span>)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">peek_first</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Access the front element&quot;&quot;&quot;</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.is_empty():
            <span class="hljs-keyword">raise</span> IndexError(<span class="hljs-string">&quot;Deque is empty&quot;</span>)
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>._front.val

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">peek_last</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Access the rear element&quot;&quot;&quot;</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.is_empty():
            <span class="hljs-keyword">raise</span> IndexError(<span class="hljs-string">&quot;Deque is empty&quot;</span>)
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>._rear.val

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">to_array</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>]:
        <span class="hljs-string">&quot;&quot;&quot;Return an array for printing&quot;&quot;&quot;</span>
        node = <span class="hljs-variable language_">self</span>._front
        res = [<span class="hljs-number">0</span>] * <span class="hljs-variable language_">self</span>.size()
        <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-variable language_">self</span>.size()):
            res[i] = node.val
            node = node.<span class="hljs-built_in">next</span>
        <span class="hljs-keyword">return</span> res
</code></pre>
</div>### التنفيذ بالمصفوفة
<p>وكما هو موضح في الشكل أدناه، على غرار تنفيذ طابور باستخدام مصفوفة، يمكننا أيضاً استخدام مصفوفة دائرية لتنفيذ طابور مزدوج.</p>
<p>واستناداً إلى تنفيذ الطابور، لا نحتاج إلا إلى إضافة دالتين: «الإدخال في المقدمة» و«الإخراج من المؤخرة»:</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py"><span class="hljs-keyword">class</span> <span class="hljs-title class_">ArrayDeque</span>:
    <span class="hljs-string">&quot;&quot;&quot;Deque implemented with a circular array&quot;&quot;&quot;</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, capacity: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-string">&quot;&quot;&quot;Constructor&quot;&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>._nums: <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>] = [<span class="hljs-number">0</span>] * capacity
        <span class="hljs-variable language_">self</span>._front: <span class="hljs-built_in">int</span> = <span class="hljs-number">0</span>
        <span class="hljs-variable language_">self</span>._size: <span class="hljs-built_in">int</span> = <span class="hljs-number">0</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">capacity</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Get the deque capacity&quot;&quot;&quot;</span>
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">len</span>(<span class="hljs-variable language_">self</span>._nums)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">size</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Get the deque size&quot;&quot;&quot;</span>
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>._size

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">is_empty</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">bool</span>:
        <span class="hljs-string">&quot;&quot;&quot;Check whether the deque is empty&quot;&quot;&quot;</span>
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>._size == <span class="hljs-number">0</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">index</span>(<span class="hljs-params">self, i: <span class="hljs-built_in">int</span></span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Calculate an index in the circular array&quot;&quot;&quot;</span>
        <span class="hljs-comment"># استخدم باقي القسمة لربط نهاية المصفوفة ببدايتها</span>
        <span class="hljs-comment"># عندما يتجاوز i نهاية المصفوفة، التفّ إلى البداية</span>
        <span class="hljs-comment"># عندما يتجاوز i بداية المصفوفة، التفّ إلى النهاية</span>
        <span class="hljs-keyword">return</span> (i + <span class="hljs-variable language_">self</span>.capacity()) % <span class="hljs-variable language_">self</span>.capacity()

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">push_first</span>(<span class="hljs-params">self, num: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-string">&quot;&quot;&quot;Enqueue at the front&quot;&quot;&quot;</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>._size == <span class="hljs-variable language_">self</span>.capacity():
            <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Deque is full&quot;</span>)
            <span class="hljs-keyword">return</span>
        <span class="hljs-comment"># حرّك مؤشر المقدمة موضعًا واحدًا إلى اليسار</span>
        <span class="hljs-comment"># استخدم باقي القسمة لالتفاف front إلى النهاية عندما يتجاوز بداية المصفوفة</span>
        <span class="hljs-variable language_">self</span>._front = <span class="hljs-variable language_">self</span>.index(<span class="hljs-variable language_">self</span>._front - <span class="hljs-number">1</span>)
        <span class="hljs-comment"># أضف num إلى المقدمة</span>
        <span class="hljs-variable language_">self</span>._nums[<span class="hljs-variable language_">self</span>._front] = num
        <span class="hljs-variable language_">self</span>._size += <span class="hljs-number">1</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">push_last</span>(<span class="hljs-params">self, num: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-string">&quot;&quot;&quot;Enqueue at the rear&quot;&quot;&quot;</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>._size == <span class="hljs-variable language_">self</span>.capacity():
            <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;Deque is full&quot;</span>)
            <span class="hljs-keyword">return</span>
        <span class="hljs-comment"># احسب مؤشر المؤخرة، وهو يشير إلى موضع واحد بعد آخر عنصر</span>
        rear = <span class="hljs-variable language_">self</span>.index(<span class="hljs-variable language_">self</span>._front + <span class="hljs-variable language_">self</span>._size)
        <span class="hljs-comment"># أضف num إلى المؤخرة</span>
        <span class="hljs-variable language_">self</span>._nums[rear] = num
        <span class="hljs-variable language_">self</span>._size += <span class="hljs-number">1</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">pop_first</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Dequeue from the front&quot;&quot;&quot;</span>
        num = <span class="hljs-variable language_">self</span>.peek_first()
        <span class="hljs-comment"># ورّر مؤشر المقدمة موضعًا واحدًا</span>
        <span class="hljs-variable language_">self</span>._front = <span class="hljs-variable language_">self</span>.index(<span class="hljs-variable language_">self</span>._front + <span class="hljs-number">1</span>)
        <span class="hljs-variable language_">self</span>._size -= <span class="hljs-number">1</span>
        <span class="hljs-keyword">return</span> num

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">pop_last</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Dequeue from the rear&quot;&quot;&quot;</span>
        num = <span class="hljs-variable language_">self</span>.peek_last()
        <span class="hljs-variable language_">self</span>._size -= <span class="hljs-number">1</span>
        <span class="hljs-keyword">return</span> num

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">peek_first</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Access the front element&quot;&quot;&quot;</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.is_empty():
            <span class="hljs-keyword">raise</span> IndexError(<span class="hljs-string">&quot;Deque is empty&quot;</span>)
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>._nums[<span class="hljs-variable language_">self</span>._front]

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">peek_last</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Access the rear element&quot;&quot;&quot;</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.is_empty():
            <span class="hljs-keyword">raise</span> IndexError(<span class="hljs-string">&quot;Deque is empty&quot;</span>)
        <span class="hljs-comment"># احسب فهرس آخر عنصر</span>
        last = <span class="hljs-variable language_">self</span>.index(<span class="hljs-variable language_">self</span>._front + <span class="hljs-variable language_">self</span>._size - <span class="hljs-number">1</span>)
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>._nums[last]

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">to_array</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>]:
        <span class="hljs-string">&quot;&quot;&quot;Return an array for printing&quot;&quot;&quot;</span>
        <span class="hljs-comment"># حوّل عناصر القائمة في النطاق المشغول فقط</span>
        res = []
        <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-variable language_">self</span>._size):
            res.append(<span class="hljs-variable language_">self</span>._nums[<span class="hljs-variable language_">self</span>.index(<span class="hljs-variable language_">self</span>._front + i)])
        <span class="hljs-keyword">return</span> res
</code></pre>
</div>## تطبيقات الطابور المزدوج
<p>يجمع الطابور المزدوج منطق المكدسات والطوابير معاً. <strong>لذلك يمكنه تنفيذ جميع حالات التطبيق لكليهما، مع توفير مرونة أكبر</strong>.</p>
<p>نعلم أن وظيفة «التراجع» في البرمجيات تُنفَّذ عادةً باستخدام مكدس: إذ يدفع النظام كل عملية تغيير إلى المكدس ثم ينفّذ التراجع عبر الإخراج. غير أن البرمجيات تحدّ عادةً عدد خطوات التراجع مراعاةً لقيود موارد النظام (فمثلاً يُسمح بحفظ 50 خطوة فقط). وعندما يتجاوز طول المكدس 50، تحتاج البرمجية إلى إجراء عملية حذف في قاعدة المكدس (مقدمة الطابور). <strong>لكن المكدس لا يستطيع تنفيذ هذه الوظيفة، لذا نحتاج إلى طابور مزدوج ليحل محل المكدس</strong>. ولاحظ أن المنطق الجوهري لـ«التراجع» ما زال يتبع مبدأ آخر ما يدخل يخرج أولاً في المكدس؛ غير أن الطابور المزدوج يستطيع تنفيذ بعض المنطق الإضافي بمرونة أكبر.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:e,headings:p,html:t};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,t as html,l as slug,e as title};
