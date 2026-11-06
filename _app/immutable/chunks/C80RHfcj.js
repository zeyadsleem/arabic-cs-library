const s="hello-algo",a="chapter_stack_and_queue",n="Stacks and Queues",l="queue",e="الطابور",p=[{depth:2,id:"العمليات-الشائعة-على-الطابور",text:"العمليات الشائعة على الطابور"},{depth:3,id:"التنفيذ-بقائمة-مترابطة",text:"التنفيذ بقائمة مترابطة"},{depth:2,id:"التطبيقات-النموذجية-للطابور",text:"التطبيقات النموذجية للطابور"}],t=`<p><u>الطابور (queue)</u> بنية بيانات خطية تتبع قاعدة «أول ما يدخل يخرج أولاً» (FIFO). وكما يوحي الاسم، فهو يحاكي اصطفاف الناس: يلتحق القادمون الجدد باستمرار بمؤخرة الطابور، بينما يغادر من في المقدمة واحداً تلو الآخر.</p>
<p>وكما هو موضح في الشكل أدناه، نسمي مقدمة الطابور «المقدمة» ونهايته «المؤخرة». وتسمى عملية إضافة عنصر إلى المؤخرة «الإدخال إلى الطابور»، بينما تسمى عملية إزالة العنصر الأمامي «الإخراج من الطابور».</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_stack_and_queue--queue_operations.png" alt="قاعدة أول ما يدخل يخرج أولاً في الطابور"></p>
<h2 id="العمليات-الشائعة-على-الطابور">العمليات الشائعة على الطابور</h2>
<p>يوضح الجدول أدناه العمليات الشائعة على الطابور. ولاحظ أن أسماء الدوال قد تختلف باختلاف لغات البرمجة. وسنستخدم هنا التسمية نفسها المتبعة مع المكدسات.</p>
<p align="center"> جدول <id> &nbsp; كفاءة عمليات الطابور </p>
<table>
<thead>
<tr>
<th>الطريقة</th>
<th>الوصف</th>
<th>التعقيد الزمني</th>
</tr>
</thead>
<tbody>
<tr>
<td><code>push()</code></td>
<td>إدخال عنصر، أي إضافة عنصر إلى المؤخرة</td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>pop()</code></td>
<td>إخراج العنصر الأمامي من الطابور</td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td><code>peek()</code></td>
<td>الوصول إلى العنصر الأمامي</td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
</tbody>
</table>
<p>يمكننا استخدام فئات الطابور التي توفرها لغة البرمجة مباشرةً:</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> collections <span class="hljs-keyword">import</span> deque

<span class="hljs-comment"># Initialize queue</span>
<span class="hljs-comment"># In Python, we generally use the deque class as a queue</span>
<span class="hljs-comment"># Although queue.Queue() is a pure queue class, it is not very user-friendly, so it is not recommended</span>
que: deque[<span class="hljs-built_in">int</span>] = deque()

<span class="hljs-comment"># Enqueue elements</span>
que.append(<span class="hljs-number">1</span>)
que.append(<span class="hljs-number">3</span>)
que.append(<span class="hljs-number">2</span>)
que.append(<span class="hljs-number">5</span>)
que.append(<span class="hljs-number">4</span>)

<span class="hljs-comment"># Access front element</span>
front: <span class="hljs-built_in">int</span> = que[<span class="hljs-number">0</span>]

<span class="hljs-comment"># Dequeue element</span>
pop: <span class="hljs-built_in">int</span> = que.popleft()

<span class="hljs-comment"># Get queue length</span>
size: <span class="hljs-built_in">int</span> = <span class="hljs-built_in">len</span>(que)

<span class="hljs-comment"># Check if queue is empty</span>
is_empty: <span class="hljs-built_in">bool</span> = <span class="hljs-built_in">len</span>(que) == <span class="hljs-number">0</span>
</code></pre>
</div>## تنفيذ الطابور
<p>لتنفيذ طابور، نحتاج إلى بنية بيانات تتيح إضافة العناصر من أحد الطرفين وإزالة العناصر من الطرف الآخر. وتلبي كل من القوائم المترابطة والمصفوفات هذا المطلب.</p>
<h3 id="التنفيذ-بقائمة-مترابطة">التنفيذ بقائمة مترابطة</h3>
<p>وكما هو موضح في الشكل أدناه، يمكننا اعتبار «العقدة الرأسية» و«العقدة الذيلية» في القائمة المترابطة مقدمة الطابور ومؤخرته على التوالي، مع قاعدة أنه لا يمكن إضافة العقد إلا في المؤخرة ولا حذفها إلا من المقدمة.</p>
<p>وفيما يلي الكود الخاص بتنفيذ طابور باستخدام قائمة مترابطة:</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py"><span class="hljs-keyword">class</span> <span class="hljs-title class_">LinkedListQueue</span>:
    <span class="hljs-string">&quot;&quot;&quot;Queue implemented with a linked list&quot;&quot;&quot;</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot;Constructor&quot;&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>._front: ListNode | <span class="hljs-literal">None</span> = <span class="hljs-literal">None</span>  <span class="hljs-comment"># عقدة الرأس front</span>
        <span class="hljs-variable language_">self</span>._rear: ListNode | <span class="hljs-literal">None</span> = <span class="hljs-literal">None</span>  <span class="hljs-comment"># عقدة الذيل rear</span>
        <span class="hljs-variable language_">self</span>._size: <span class="hljs-built_in">int</span> = <span class="hljs-number">0</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">size</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Get the queue size&quot;&quot;&quot;</span>
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>._size

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">is_empty</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">bool</span>:
        <span class="hljs-string">&quot;&quot;&quot;Check whether the queue is empty&quot;&quot;&quot;</span>
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>._size == <span class="hljs-number">0</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">push</span>(<span class="hljs-params">self, num: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-string">&quot;&quot;&quot;Enqueue&quot;&quot;&quot;</span>
        <span class="hljs-comment"># أضف num بعد عقدة الذيل</span>
        node = ListNode(num)
        <span class="hljs-comment"># إذا كان الطابور فارغًا، اجعل الرأس والذيل يشيران إلى هذه العقدة معًا</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>._front <span class="hljs-keyword">is</span> <span class="hljs-literal">None</span>:
            <span class="hljs-variable language_">self</span>._front = node
            <span class="hljs-variable language_">self</span>._rear = node
        <span class="hljs-comment"># إذا لم يكن الطابور فارغًا، أضف هذه العقدة بعد عقدة الذيل</span>
        <span class="hljs-keyword">else</span>:
            <span class="hljs-variable language_">self</span>._rear.<span class="hljs-built_in">next</span> = node
            <span class="hljs-variable language_">self</span>._rear = node
        <span class="hljs-variable language_">self</span>._size += <span class="hljs-number">1</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">pop</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Dequeue&quot;&quot;&quot;</span>
        num = <span class="hljs-variable language_">self</span>.peek()
        <span class="hljs-comment"># احذف العقدة الرأس</span>
        <span class="hljs-variable language_">self</span>._front = <span class="hljs-variable language_">self</span>._front.<span class="hljs-built_in">next</span>
        <span class="hljs-variable language_">self</span>._size -= <span class="hljs-number">1</span>
        <span class="hljs-keyword">return</span> num

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">peek</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Access the front element&quot;&quot;&quot;</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.is_empty():
            <span class="hljs-keyword">raise</span> IndexError(<span class="hljs-string">&quot;Queue is empty&quot;</span>)
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>._front.val

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">to_list</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>]:
        <span class="hljs-string">&quot;&quot;&quot;Convert to a list for printing&quot;&quot;&quot;</span>
        queue = []
        temp = <span class="hljs-variable language_">self</span>._front
        <span class="hljs-keyword">while</span> temp:
            queue.append(temp.val)
            temp = temp.<span class="hljs-built_in">next</span>
        <span class="hljs-keyword">return</span> queue
</code></pre>
</div>### التنفيذ بالمصفوفة
<p>حذف العنصر الأول في مصفوفة له تعقيد زمني <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>، وهو ما يجعل عملية الإخراج من الطابور غير فعّالة. غير أننا يمكننا استخدام الطريقة الذكية التالية لتجنب هذه المشكلة.</p>
<p>يمكننا استخدام متغير <code>front</code> للإشارة إلى فهرس العنصر الأمامي، والاحتفاظ بمتغير <code>size</code> لتسجيل طول الطابور. ونعرّف <code>rear = front + size</code>، وهو ما يحسب الموضع الذي يلي العنصر الأخير في الطابور مباشرةً.</p>
<p>واستناداً إلى هذا التصميم، <strong>يكون النطاق الصالح الذي يحتوي على عناصر المصفوفة هو <code>[front, rear - 1]</code></strong>. وتوضح الصورة أدناه طرق تنفيذ العمليات المختلفة:</p>
<ul>
<li>عملية الإدخال إلى الطابور: أسند العنصر المُدخل إلى الفهرس <code>rear</code> وزد <code>size</code> بمقدار 1.</li>
<li>عملية الإخراج من الطابور: ما عليك سوى زيادة <code>front</code> بمقدار 1 وإنقاص <code>size</code> بمقدار 1.</li>
</ul>
<p>وكما ترى، لا تتطلب كل من عمليتي الإدخال والإخراج سوى عملية واحدة، بتعقيد زمني <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span>.</p>
<p>وقد تلاحظ مشكلة: مع استمرارنا في الإدخال والإخراج، يتحرك كل من <code>front</code> و<code>rear</code> نحو اليمين. <strong>وعندما يصلان إلى نهاية المصفوفة، لا يمكنهما مواصلة التحرك</strong>. ولحل هذه المشكلة، يمكننا اعتبار المصفوفة «مصفوفة دائرية» يتصل رأسها بذيلها.</p>
<p>بالنسبة إلى المصفوفة الدائرية، نحتاج إلى إعادة <code>front</code> أو <code>rear</code> إلى بداية المصفوفة عند تجاوزهما النهاية. ويمكن تنفيذ هذا النمط الدوري باستخدام «عملية باقي القسمة» (modulo)، كما هو موضح في الكود أدناه:</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py"><span class="hljs-keyword">class</span> <span class="hljs-title class_">ArrayQueue</span>:
    <span class="hljs-string">&quot;&quot;&quot;Queue implemented with a circular array&quot;&quot;&quot;</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self, size: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-string">&quot;&quot;&quot;Constructor&quot;&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>._nums: <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>] = [<span class="hljs-number">0</span>] * size  <span class="hljs-comment"># المصفوفة التي تخزن عناصر الطابور</span>
        <span class="hljs-variable language_">self</span>._front: <span class="hljs-built_in">int</span> = <span class="hljs-number">0</span>  <span class="hljs-comment"># مؤشر المقدمة، يشير إلى أول عنصر</span>
        <span class="hljs-variable language_">self</span>._size: <span class="hljs-built_in">int</span> = <span class="hljs-number">0</span>  <span class="hljs-comment"># حجم الطابور</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">capacity</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Get the queue capacity&quot;&quot;&quot;</span>
        <span class="hljs-keyword">return</span> <span class="hljs-built_in">len</span>(<span class="hljs-variable language_">self</span>._nums)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">size</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Get the queue size&quot;&quot;&quot;</span>
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>._size

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">is_empty</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">bool</span>:
        <span class="hljs-string">&quot;&quot;&quot;Check whether the queue is empty&quot;&quot;&quot;</span>
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>._size == <span class="hljs-number">0</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">push</span>(<span class="hljs-params">self, num: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-string">&quot;&quot;&quot;Enqueue&quot;&quot;&quot;</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>._size == <span class="hljs-variable language_">self</span>.capacity():
            <span class="hljs-keyword">raise</span> IndexError(<span class="hljs-string">&quot;Queue is full&quot;</span>)
        <span class="hljs-comment"># احسب مؤشر المؤخرة، وهو يشير إلى موضع واحد بعد آخر عنصر</span>
        <span class="hljs-comment"># استخدم باقي القسمة لالتفاف rear إلى البداية عندما يتجاوز نهاية المصفوفة</span>
        rear: <span class="hljs-built_in">int</span> = (<span class="hljs-variable language_">self</span>._front + <span class="hljs-variable language_">self</span>._size) % <span class="hljs-variable language_">self</span>.capacity()
        <span class="hljs-comment"># أضف num إلى المؤخرة</span>
        <span class="hljs-variable language_">self</span>._nums[rear] = num
        <span class="hljs-variable language_">self</span>._size += <span class="hljs-number">1</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">pop</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Dequeue&quot;&quot;&quot;</span>
        num: <span class="hljs-built_in">int</span> = <span class="hljs-variable language_">self</span>.peek()
        <span class="hljs-comment"># ورّر مؤشر المقدمة موضعًا واحدًا، مع الالتفاف إلى البداية إن تجاوز النهاية</span>
        <span class="hljs-variable language_">self</span>._front = (<span class="hljs-variable language_">self</span>._front + <span class="hljs-number">1</span>) % <span class="hljs-variable language_">self</span>.capacity()
        <span class="hljs-variable language_">self</span>._size -= <span class="hljs-number">1</span>
        <span class="hljs-keyword">return</span> num

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">peek</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Access the front element&quot;&quot;&quot;</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.is_empty():
            <span class="hljs-keyword">raise</span> IndexError(<span class="hljs-string">&quot;Queue is empty&quot;</span>)
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>._nums[<span class="hljs-variable language_">self</span>._front]

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">to_list</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>]:
        <span class="hljs-string">&quot;&quot;&quot;Return a list for printing&quot;&quot;&quot;</span>
        res = [<span class="hljs-number">0</span>] * <span class="hljs-variable language_">self</span>.size()
        j: <span class="hljs-built_in">int</span> = <span class="hljs-variable language_">self</span>._front
        <span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-variable language_">self</span>.size()):
            res[i] = <span class="hljs-variable language_">self</span>._nums[(j % <span class="hljs-variable language_">self</span>.capacity())]
            j += <span class="hljs-number">1</span>
        <span class="hljs-keyword">return</span> res
</code></pre>
</div>لا يزال الطابور المنفّذ أعلاه محدوداً: فطوله غير قابل للتغيير. غير أن هذه المشكلة ليست صعبة الحل، إذ يمكننا استبدال المصفوفة بمصفوفة ديناميكية لإدخال آلية توسّع. ويمكن للقرّاء المهتمين محاولة تنفيذ ذلك بأنفسهم.
<p>وتتفق استنتاجات المقارنة بين التنفيذين مع نظيراتها الخاصة بالمكدسات، ولن نعيدها هنا.</p>
<h2 id="التطبيقات-النموذجية-للطابور">التطبيقات النموذجية للطابور</h2>
<ul>
<li><strong>طلبات تاوباو</strong>. بعد قيام المتسوقين بالطلب، تُضاف الطلبات إلى طابور، ثم يعالج النظام الطلبات الموجودة في الطابور وفق تسلسلها. وخلال «الدبل إيليفن»، تتولد أعداد هائلة من الطلبات في وقت قصير، ويصبح التزامن العالي تحدياً رئيسياً يتعين على المهندسين مواجهته.</li>
<li><strong>مهام قائمة الأعمال المتنوعة</strong>. أي سيناريو يحتاج إلى تنفيذ وظيفة «من سبق يُخدم أولاً»، مثل طابور مهام الطابعة أو طابور طلبات المطعم، يمكنه الحفاظ على ترتيب المعالجة بفعالية باستخدام الطوابير.</li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:e,headings:p,html:t};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,t as html,l as slug,e as title};
