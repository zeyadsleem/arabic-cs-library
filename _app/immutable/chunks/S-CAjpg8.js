const s="hello-algo",a="chapter_stack_and_queue",n="الأكوام والطوابير",l="deque",p="الطابور المزدوج",e=[{depth:2,id:"العمليات-الشائعة-على-الطابور-المزدوج",text:"العمليات الشائعة على الطابور المزدوج"},{depth:2,id:"تنفيذ-الطابور-المزدوج",text:"تنفيذ الطابور المزدوج *"},{depth:3,id:"التنفيذ-بقائمة-مترابطة-مزدوجة",text:"التنفيذ بقائمة مترابطة مزدوجة"},{depth:3,id:"التنفيذ-بالمصفوفة",text:"التنفيذ بالمصفوفة"},{depth:2,id:"تطبيقات-الطابور-المزدوج",text:"تطبيقات الطابور المزدوج"}],t=`<p>في الطابور، لا يمكننا سوى إزالة العناصر من المقدمة أو إضافة العناصر في المؤخرة. وكما هو موضح في الشكل أدناه، يوفّر <u>الطابور المزدوج (deque)</u> مرونة أكبر، إذ يتيح إضافة العناصر وإزالتها من المقدمة والمؤخرة معاً.</p>
<p><img src="/images/hello-algo/chapter_stack_and_queue--deque_operations.png" alt="عمليات الطابور المزدوج"></p>
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
<td>$O(1)$</td>
</tr>
<tr>
<td><code>push_last()</code></td>
<td>إضافة عنصر إلى المؤخرة</td>
<td>$O(1)$</td>
</tr>
<tr>
<td><code>pop_first()</code></td>
<td>إزالة العنصر الأمامي</td>
<td>$O(1)$</td>
</tr>
<tr>
<td><code>pop_last()</code></td>
<td>إزالة العنصر الخلفي</td>
<td>$O(1)$</td>
</tr>
<tr>
<td><code>peek_first()</code></td>
<td>الوصول إلى العنصر الأمامي</td>
<td>$O(1)$</td>
</tr>
<tr>
<td><code>peek_last()</code></td>
<td>الوصول إلى العنصر الخلفي</td>
<td>$O(1)$</td>
</tr>
</tbody>
</table>
<p>وبالمثل، يمكننا استخدام فئات الطابور المزدوج التي توفّرها لغة البرمجة مباشرةً:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* تهيئة الطابور المزدوج */</span>
<span class="hljs-comment">// في Go، استخدم list كطابور مزدوج</span>
deque := list.New()

<span class="hljs-comment">/* إدخال العناصر إلى الطابور */</span>
deque.PushBack(<span class="hljs-number">2</span>)      <span class="hljs-comment">// أضف إلى المؤخرة</span>
deque.PushBack(<span class="hljs-number">5</span>)
deque.PushBack(<span class="hljs-number">4</span>)
deque.PushFront(<span class="hljs-number">3</span>)     <span class="hljs-comment">// أضف إلى المقدمة</span>
deque.PushFront(<span class="hljs-number">1</span>)

<span class="hljs-comment">/* الوصول إلى العناصر */</span>
front := deque.Front() <span class="hljs-comment">// العنصر الأمامي</span>
rear := deque.Back()   <span class="hljs-comment">// العنصر الخلفي</span>

<span class="hljs-comment">/* إخراج العناصر من الطابور */</span>
deque.Remove(front)    <span class="hljs-comment">// إخراج العنصر الأمامي</span>
deque.Remove(rear)     <span class="hljs-comment">// إخراج العنصر الخلفي</span>

<span class="hljs-comment">/* الحصول على طول الطابور المزدوج */</span>
size := deque.Len()

<span class="hljs-comment">/* فحص ما إذا كان الطابور المزدوج فارغاً */</span>
isEmpty := deque.Len() == <span class="hljs-number">0</span>
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-typescript"><span class="hljs-comment">/* تهيئة الطابور المزدوج */</span>
<span class="hljs-comment">// لا يوفّر TypeScript طابوراً مزدوجاً مدمجاً، ولا يمكن استخدام Array إلا كطابور مزدوج</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">deque</span>: <span class="hljs-built_in">number</span>[] = [];

<span class="hljs-comment">/* إدخال العناصر إلى الطابور */</span>
deque.<span class="hljs-title function_">push</span>(<span class="hljs-number">2</span>);
deque.<span class="hljs-title function_">push</span>(<span class="hljs-number">5</span>);
deque.<span class="hljs-title function_">push</span>(<span class="hljs-number">4</span>);
<span class="hljs-comment">// يرجى ملاحظة أن unshift() له تعقيد زمني O(n) لأنه يعمل على مصفوفة</span>
deque.<span class="hljs-title function_">unshift</span>(<span class="hljs-number">3</span>);
deque.<span class="hljs-title function_">unshift</span>(<span class="hljs-number">1</span>);

<span class="hljs-comment">/* الوصول إلى العناصر */</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">peekFirst</span>: <span class="hljs-built_in">number</span> = deque[<span class="hljs-number">0</span>];
<span class="hljs-keyword">const</span> <span class="hljs-attr">peekLast</span>: <span class="hljs-built_in">number</span> = deque[deque.<span class="hljs-property">length</span> - <span class="hljs-number">1</span>];

<span class="hljs-comment">/* إخراج العناصر من الطابور */</span>
<span class="hljs-comment">// يرجى ملاحظة أن shift() له تعقيد زمني O(n) لأنه يعمل على مصفوفة</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">popFront</span>: <span class="hljs-built_in">number</span> = deque.<span class="hljs-title function_">shift</span>() <span class="hljs-keyword">as</span> <span class="hljs-built_in">number</span>;
<span class="hljs-keyword">const</span> <span class="hljs-attr">popBack</span>: <span class="hljs-built_in">number</span> = deque.<span class="hljs-title function_">pop</span>() <span class="hljs-keyword">as</span> <span class="hljs-built_in">number</span>;

<span class="hljs-comment">/* الحصول على طول الطابور المزدوج */</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">size</span>: <span class="hljs-built_in">number</span> = deque.<span class="hljs-property">length</span>;

<span class="hljs-comment">/* فحص ما إذا كان الطابور المزدوج فارغاً */</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">isEmpty</span>: <span class="hljs-built_in">boolean</span> = size === <span class="hljs-number">0</span>;
</code></pre>
</div>
<h2 id="تنفيذ-الطابور-المزدوج">تنفيذ الطابور المزدوج *</h2>
<p>تنفيذ الطابور المزدوج مشابه لتنفيذ الطابور. ويمكنك اختيار قائمة مترابطة أو مصفوفة كبنية بيانات أساسية.</p>
<h3 id="التنفيذ-بقائمة-مترابطة-مزدوجة">التنفيذ بقائمة مترابطة مزدوجة</h3>
<p>وبمراجعة القسم السابق، استخدمنا قائمة مترابطة أحادية عادية لتنفيذ طابور، لأنها تتيح بسهولة حذف العقدة الرأسية (المقابلة للإخراج من الطابور) وإضافة عقد جديدة بعد العقدة الذيلية (المقابلة للإدخال إلى الطابور).</p>
<p>أما الطابور المزدوج، فيمكن للمقدمة والمؤخرة فيه إجراء عمليتي الإدخال والإخراج معاً. وبعبارة أخرى، يحتاج الطابور المزدوج إلى تنفيذ عمليات في الاتجاه المعاكس أيضاً. لهذا السبب، نستخدم «قائمة مترابطة مزدوجة» كبنية بيانات أساسية للطابور المزدوج.</p>
<p>وكما هو موضح في الشكل أدناه، نتعامل مع العقدة الرأسية والعقدة الذيلية في القائمة المترابطة المزدوجة على أنهما مقدمة الطابور المزدوج ومؤخرته، منفّذين وظيفة إضافة العقد وحذفها من كلا الطرفين.</p>
<p>وتظهر شيفرة التنفيذ أدناه:</p>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* طابور مزدوج منفّذ بقائمة مترابطة مزدوجة */</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">LinkedListDeque</span> {
    <span class="hljs-keyword">private</span> <span class="hljs-attr">front</span>: <span class="hljs-title class_">ListNode</span>; <span class="hljs-comment">// العقدة الرأسية: المقدمة</span>
    <span class="hljs-keyword">private</span> <span class="hljs-attr">rear</span>: <span class="hljs-title class_">ListNode</span>; <span class="hljs-comment">// العقدة الذيلية: المؤخرة</span>
    <span class="hljs-keyword">private</span> <span class="hljs-attr">queSize</span>: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// طول الطابور المزدوج</span>

    <span class="hljs-title function_">constructor</span>(<span class="hljs-params"></span>) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">front</span> = <span class="hljs-literal">null</span>;
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">rear</span> = <span class="hljs-literal">null</span>;
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">queSize</span> = <span class="hljs-number">0</span>;
    }

    <span class="hljs-comment">/* عملية الإدخال في مؤخرة الطابور */</span>
    <span class="hljs-title function_">pushLast</span>(<span class="hljs-attr">val</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">void</span> {
        <span class="hljs-keyword">const</span> <span class="hljs-attr">node</span>: <span class="hljs-title class_">ListNode</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ListNode</span>(val);
        <span class="hljs-comment">// إذا كانت القائمة المترابطة فارغة، اجعل المقدمة والمؤخرة معاً تشيران إلى node</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">queSize</span> === <span class="hljs-number">0</span>) {
            <span class="hljs-variable language_">this</span>.<span class="hljs-property">front</span> = node;
            <span class="hljs-variable language_">this</span>.<span class="hljs-property">rear</span> = node;
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// أضف node إلى ذيل القائمة المترابطة</span>
            <span class="hljs-variable language_">this</span>.<span class="hljs-property">rear</span>.<span class="hljs-property">next</span> = node;
            node.<span class="hljs-property">prev</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">rear</span>;
            <span class="hljs-variable language_">this</span>.<span class="hljs-property">rear</span> = node; <span class="hljs-comment">// حدّث العقدة الذيلية</span>
        }
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">queSize</span>++;
    }

    <span class="hljs-comment">/* عملية الإدخال في مقدمة الطابور */</span>
    <span class="hljs-title function_">pushFirst</span>(<span class="hljs-attr">val</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">void</span> {
        <span class="hljs-keyword">const</span> <span class="hljs-attr">node</span>: <span class="hljs-title class_">ListNode</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ListNode</span>(val);
        <span class="hljs-comment">// إذا كانت القائمة المترابطة فارغة، اجعل المقدمة والمؤخرة معاً تشيران إلى node</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">queSize</span> === <span class="hljs-number">0</span>) {
            <span class="hljs-variable language_">this</span>.<span class="hljs-property">front</span> = node;
            <span class="hljs-variable language_">this</span>.<span class="hljs-property">rear</span> = node;
        } <span class="hljs-keyword">else</span> {
            <span class="hljs-comment">// أضف node إلى رأس القائمة المترابطة</span>
            <span class="hljs-variable language_">this</span>.<span class="hljs-property">front</span>.<span class="hljs-property">prev</span> = node;
            node.<span class="hljs-property">next</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">front</span>;
            <span class="hljs-variable language_">this</span>.<span class="hljs-property">front</span> = node; <span class="hljs-comment">// حدّث العقدة الرأسية</span>
        }
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">queSize</span>++;
    }

    <span class="hljs-comment">/* تخزين قيمة العقدة الذيلية مؤقتاً */</span>
    <span class="hljs-title function_">popLast</span>(): <span class="hljs-built_in">number</span> {
        <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">queSize</span> === <span class="hljs-number">0</span>) {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
        }
        <span class="hljs-keyword">const</span> <span class="hljs-attr">value</span>: <span class="hljs-built_in">number</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">rear</span>.<span class="hljs-property">val</span>; <span class="hljs-comment">// خزّن قيمة العقدة الذيلية</span>
        <span class="hljs-comment">// حدّث العقدة الذيلية</span>
        <span class="hljs-keyword">let</span> <span class="hljs-attr">temp</span>: <span class="hljs-title class_">ListNode</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">rear</span>.<span class="hljs-property">prev</span>;
        <span class="hljs-keyword">if</span> (temp !== <span class="hljs-literal">null</span>) {
            temp.<span class="hljs-property">next</span> = <span class="hljs-literal">null</span>;
            <span class="hljs-variable language_">this</span>.<span class="hljs-property">rear</span>.<span class="hljs-property">prev</span> = <span class="hljs-literal">null</span>;
        }
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">rear</span> = temp; <span class="hljs-comment">// حدّث العقدة الذيلية</span>
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">queSize</span>--;
        <span class="hljs-keyword">return</span> value;
    }

    <span class="hljs-comment">/* تخزين قيمة العقدة الرأسية مؤقتاً */</span>
    <span class="hljs-title function_">popFirst</span>(): <span class="hljs-built_in">number</span> {
        <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">queSize</span> === <span class="hljs-number">0</span>) {
            <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
        }
        <span class="hljs-keyword">const</span> <span class="hljs-attr">value</span>: <span class="hljs-built_in">number</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">front</span>.<span class="hljs-property">val</span>; <span class="hljs-comment">// خزّن قيمة العقدة الذيلية</span>
        <span class="hljs-comment">// احذف العقدة الرأسية</span>
        <span class="hljs-keyword">let</span> <span class="hljs-attr">temp</span>: <span class="hljs-title class_">ListNode</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">front</span>.<span class="hljs-property">next</span>;
        <span class="hljs-keyword">if</span> (temp !== <span class="hljs-literal">null</span>) {
            temp.<span class="hljs-property">prev</span> = <span class="hljs-literal">null</span>;
            <span class="hljs-variable language_">this</span>.<span class="hljs-property">front</span>.<span class="hljs-property">next</span> = <span class="hljs-literal">null</span>;
        }
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">front</span> = temp; <span class="hljs-comment">// حدّث العقدة الرأسية</span>
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">queSize</span>--;
        <span class="hljs-keyword">return</span> value;
    }

    <span class="hljs-comment">/* شيفرة الاختبار */</span>
    <span class="hljs-title function_">peekLast</span>(): <span class="hljs-built_in">number</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">queSize</span> === <span class="hljs-number">0</span> ? <span class="hljs-literal">null</span> : <span class="hljs-variable language_">this</span>.<span class="hljs-property">rear</span>.<span class="hljs-property">val</span>;
    }

    <span class="hljs-comment">/* إعادة قائمة للطباعة */</span>
    <span class="hljs-title function_">peekFirst</span>(): <span class="hljs-built_in">number</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">queSize</span> === <span class="hljs-number">0</span> ? <span class="hljs-literal">null</span> : <span class="hljs-variable language_">this</span>.<span class="hljs-property">front</span>.<span class="hljs-property">val</span>;
    }

    <span class="hljs-comment">/* الحصول على طول الطابور المزدوج */</span>
    <span class="hljs-title function_">size</span>(): <span class="hljs-built_in">number</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">queSize</span>;
    }

    <span class="hljs-comment">/* فحص ما إذا كان الطابور المزدوج فارغاً */</span>
    <span class="hljs-title function_">isEmpty</span>(): <span class="hljs-built_in">boolean</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">queSize</span> === <span class="hljs-number">0</span>;
    }

    <span class="hljs-comment">/* طباعة الطابور المزدوج */</span>
    <span class="hljs-title function_">print</span>(): <span class="hljs-built_in">void</span> {
        <span class="hljs-keyword">const</span> <span class="hljs-attr">arr</span>: <span class="hljs-built_in">number</span>[] = [];
        <span class="hljs-keyword">let</span> <span class="hljs-attr">temp</span>: <span class="hljs-title class_">ListNode</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">front</span>;
        <span class="hljs-keyword">while</span> (temp !== <span class="hljs-literal">null</span>) {
            arr.<span class="hljs-title function_">push</span>(temp.<span class="hljs-property">val</span>);
            temp = temp.<span class="hljs-property">next</span>;
        }
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;[&#x27;</span> + arr.<span class="hljs-title function_">join</span>(<span class="hljs-string">&#x27;, &#x27;</span>) + <span class="hljs-string">&#x27;]&#x27;</span>);
    }
}
</code></pre>
</div>
<h3 id="التنفيذ-بالمصفوفة">التنفيذ بالمصفوفة</h3>
<p>وكما هو موضح في الشكل أدناه، على غرار تنفيذ طابور باستخدام مصفوفة، يمكننا أيضاً استخدام مصفوفة دائرية لتنفيذ طابور مزدوج.</p>
<p>واستناداً إلى تنفيذ الطابور، لا نحتاج إلا إلى إضافة دالتين: «الإدخال في المقدمة» و«الإخراج من المؤخرة»:</p>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* طابور مزدوج منفّذ بمصفوفة دائرية */</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">ArrayDeque</span> {
    <span class="hljs-keyword">private</span> <span class="hljs-attr">nums</span>: <span class="hljs-built_in">number</span>[]; <span class="hljs-comment">// مصفوفة لتخزين عناصر الطابور المزدوج</span>
    <span class="hljs-keyword">private</span> <span class="hljs-attr">front</span>: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// مؤشر المقدمة، يشير إلى مقدمة عنصر الطابور</span>
    <span class="hljs-keyword">private</span> <span class="hljs-attr">queSize</span>: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// طول الطابور المزدوج</span>

    <span class="hljs-comment">/* البانية */</span>
    <span class="hljs-title function_">constructor</span>(<span class="hljs-params"><span class="hljs-attr">capacity</span>: <span class="hljs-built_in">number</span></span>) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">nums</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Array</span>(capacity);
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">front</span> = <span class="hljs-number">0</span>;
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">queSize</span> = <span class="hljs-number">0</span>;
    }

    <span class="hljs-comment">/* الحصول على سعة الطابور المزدوج */</span>
    <span class="hljs-title function_">capacity</span>(): <span class="hljs-built_in">number</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">nums</span>.<span class="hljs-property">length</span>;
    }

    <span class="hljs-comment">/* الحصول على طول الطابور المزدوج */</span>
    <span class="hljs-title function_">size</span>(): <span class="hljs-built_in">number</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">queSize</span>;
    }

    <span class="hljs-comment">/* فحص ما إذا كان الطابور المزدوج فارغاً */</span>
    <span class="hljs-title function_">isEmpty</span>(): <span class="hljs-built_in">boolean</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">queSize</span> === <span class="hljs-number">0</span>;
    }

    <span class="hljs-comment">/* حساب فهرس المصفوفة الدائرية */</span>
    <span class="hljs-title function_">index</span>(<span class="hljs-attr">i</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">number</span> {
        <span class="hljs-comment">// استخدم عملية باقي القسمة لوصل رأس المصفوفة بذيلها</span>
        <span class="hljs-comment">// عندما يتجاوز i ذيل المصفوفة، أعِده إلى الرأس</span>
        <span class="hljs-comment">// عندما يتجاوز i رأس المصفوفة، أعِده إلى الذيل</span>
        <span class="hljs-keyword">return</span> (i + <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">capacity</span>()) % <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">capacity</span>();
    }

    <span class="hljs-comment">/* الإدخال في مقدمة الطابور */</span>
    <span class="hljs-title function_">pushFirst</span>(<span class="hljs-attr">num</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">void</span> {
        <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">queSize</span> === <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">capacity</span>()) {
            <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Double-ended queue is full&#x27;</span>);
            <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-comment">// استخدم عملية باقي القسمة لالتفاف front إلى الذيل بعد تجاوز رأس المصفوفة</span>
        <span class="hljs-comment">// أضف num إلى مقدمة الطابور</span>
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">front</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">index</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">front</span> - <span class="hljs-number">1</span>);
        <span class="hljs-comment">// أضف num إلى مقدمة الطابور</span>
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">nums</span>[<span class="hljs-variable language_">this</span>.<span class="hljs-property">front</span>] = num;
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">queSize</span>++;
    }

    <span class="hljs-comment">/* الإدخال في مؤخرة الطابور */</span>
    <span class="hljs-title function_">pushLast</span>(<span class="hljs-attr">num</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">void</span> {
        <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">queSize</span> === <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">capacity</span>()) {
            <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Double-ended queue is full&#x27;</span>);
            <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-comment">// استخدم عملية باقي القسمة لالتفاف rear إلى الرأس بعد تجاوز ذيل المصفوفة</span>
        <span class="hljs-keyword">const</span> <span class="hljs-attr">rear</span>: <span class="hljs-built_in">number</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">index</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">front</span> + <span class="hljs-variable language_">this</span>.<span class="hljs-property">queSize</span>);
        <span class="hljs-comment">// يتحرك مؤشر المقدمة خطوة واحدة إلى الخلف</span>
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">nums</span>[rear] = num;
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">queSize</span>++;
    }

    <span class="hljs-comment">/* الإخراج من مقدمة الطابور */</span>
    <span class="hljs-title function_">popFirst</span>(): <span class="hljs-built_in">number</span> {
        <span class="hljs-keyword">const</span> <span class="hljs-attr">num</span>: <span class="hljs-built_in">number</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">peekFirst</span>();
        <span class="hljs-comment">// حرّك مؤشر المقدمة خطوة واحدة إلى الخلف</span>
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">front</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">index</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">front</span> + <span class="hljs-number">1</span>);
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">queSize</span>--;
        <span class="hljs-keyword">return</span> num;
    }

    <span class="hljs-comment">/* الوصول إلى العنصر الخلفي في الطابور */</span>
    <span class="hljs-title function_">popLast</span>(): <span class="hljs-built_in">number</span> {
        <span class="hljs-keyword">const</span> <span class="hljs-attr">num</span>: <span class="hljs-built_in">number</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">peekLast</span>();
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">queSize</span>--;
        <span class="hljs-keyword">return</span> num;
    }

    <span class="hljs-comment">/* إعادة قائمة للطباعة */</span>
    <span class="hljs-title function_">peekFirst</span>(): <span class="hljs-built_in">number</span> {
        <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">isEmpty</span>()) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;The Deque Is Empty.&#x27;</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">nums</span>[<span class="hljs-variable language_">this</span>.<span class="hljs-property">front</span>];
    }

    <span class="hljs-comment">/* شيفرة الاختبار */</span>
    <span class="hljs-title function_">peekLast</span>(): <span class="hljs-built_in">number</span> {
        <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">isEmpty</span>()) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;The Deque Is Empty.&#x27;</span>);
        <span class="hljs-comment">// تهيئة الطابور المزدوج</span>
        <span class="hljs-keyword">const</span> last = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">index</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">front</span> + <span class="hljs-variable language_">this</span>.<span class="hljs-property">queSize</span> - <span class="hljs-number">1</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">nums</span>[last];
    }

    <span class="hljs-comment">/* إعادة مصفوفة للطباعة */</span>
    <span class="hljs-title function_">toArray</span>(): <span class="hljs-built_in">number</span>[] {
        <span class="hljs-comment">// إدخال العناصر إلى الطابور</span>
        <span class="hljs-keyword">const</span> <span class="hljs-attr">res</span>: <span class="hljs-built_in">number</span>[] = [];
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>, j = <span class="hljs-variable language_">this</span>.<span class="hljs-property">front</span>; i &lt; <span class="hljs-variable language_">this</span>.<span class="hljs-property">queSize</span>; i++, j++) {
            res[i] = <span class="hljs-variable language_">this</span>.<span class="hljs-property">nums</span>[<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">index</span>(j)];
        }
        <span class="hljs-keyword">return</span> res;
    }
}
</code></pre>
</div>
<h2 id="تطبيقات-الطابور-المزدوج">تطبيقات الطابور المزدوج</h2>
<p>يجمع الطابور المزدوج منطق المكدسات والطوابير معاً. <strong>لذلك يمكنه تنفيذ جميع حالات التطبيق لكليهما، مع توفير مرونة أكبر</strong>.</p>
<p>نعلم أن وظيفة «التراجع» في البرمجيات تُنفَّذ عادةً باستخدام مكدس: إذ يدفع النظام كل عملية تغيير إلى المكدس ثم ينفّذ التراجع عبر الإخراج. غير أن البرمجيات تحدّ عادةً عدد خطوات التراجع مراعاةً لقيود موارد النظام (فمثلاً يُسمح بحفظ 50 خطوة فقط). وعندما يتجاوز طول المكدس 50، تحتاج البرمجية إلى إجراء عملية حذف في قاعدة المكدس (مقدمة الطابور). <strong>لكن المكدس لا يستطيع تنفيذ هذه الوظيفة، لذا نحتاج إلى طابور مزدوج ليحل محل المكدس</strong>. ولاحظ أن المنطق الجوهري لـ«التراجع» ما زال يتبع مبدأ آخر ما يدخل يخرج أولاً في المكدس؛ غير أن الطابور المزدوج يستطيع تنفيذ بعض المنطق الإضافي بمرونة أكبر.</p>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:e,html:t};export{s as book,a as chapter,n as chapterTitle,c as default,e as headings,t as html,l as slug,p as title};
