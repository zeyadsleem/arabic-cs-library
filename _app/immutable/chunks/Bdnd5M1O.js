const s="hello-algo",a="chapter_stack_and_queue",n="الأكوام والطوابير",p="stack",l="المكدس",t=[{depth:2,id:"عمليات-المكدس-الشائعة",text:"عمليات المكدس الشائعة"},{depth:2,id:"تنفيذ-المكدس",text:"تنفيذ المكدس"},{depth:3,id:"التنفيذ-بقائمة-مترابطة",text:"التنفيذ بقائمة مترابطة"},{depth:3,id:"التنفيذ-بمصفوفة",text:"التنفيذ بمصفوفة"},{depth:2,id:"مقارنة-بين-التنفيذين",text:"مقارنة بين التنفيذين"},{depth:2,id:"التطبيقات-النموذجية-للمكدس",text:"التطبيقات النموذجية للمكدس"}],c=`<p><u>المكدس</u> (stack) بنية بيانات خطية تتبع مبدأ آخر ما يدخل يخرج أولاً (LIFO).</p>
<p>يمكننا تشبيه المكدس بكومة من الأطباق على طاولة. فإذا اشترطنا أنه لا يمكن تحريك سوى طبق واحد في كل مرة، فعندئذٍ للحصول على الطبق السفلي يجب أولاً إزالة الأطباق التي فوقه واحداً تلو الآخر. وإذا استبدلنا الأطباق بأنواع مختلفة من العناصر (مثل الأعداد الصحيحة والمحارف والكائنات وغيرها)، نحصل على بنية بيانات المكدس.</p>
<p>كما يظهر في الشكل التالي، نسمي أعلى العناصر المكدسة &quot;القمة&quot; وأدناها &quot;القاع&quot;. وتسمى عملية إضافة عنصر إلى القمة &quot;الدفع&quot; (push)، وتسمى عملية إزالة العنصر العلوي &quot;السحب&quot; (pop).</p>
<p><img src="/images/hello-algo/chapter_stack_and_queue--stack_operations.png" alt="قاعدة LIFO في المكدس"></p>
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
<td>$O(1)$</td>
</tr>
<tr>
<td><code>pop()</code></td>
<td>سحب العنصر العلوي من المكدس</td>
<td>$O(1)$</td>
</tr>
<tr>
<td><code>peek()</code></td>
<td>الاطّلاع على العنصر العلوي</td>
<td>$O(1)$</td>
</tr>
</tbody>
</table>
<p>عادةً يمكننا استخدام فئة المكدس المدمجة التي توفرها لغة البرمجة مباشرة. ومع ذلك، قد لا توفر بعض اللغات فئة مكدس مخصصة. في هذه الحالات، يمكننا استخدام &quot;المصفوفة&quot; أو &quot;القائمة المترابطة&quot; في اللغة كمكدس، بشرط تجنّب استخدام العمليات غير المتعلقة بسلوك المكدس.</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* تهيئة المكدس */</span>
<span class="hljs-comment">// في Go، يُنصح باستخدام Slice كمكدس</span>
<span class="hljs-keyword">var</span> stack []<span class="hljs-type">int</span>

<span class="hljs-comment">/* دفع العناصر */</span>
stack = <span class="hljs-built_in">append</span>(stack, <span class="hljs-number">1</span>)
stack = <span class="hljs-built_in">append</span>(stack, <span class="hljs-number">3</span>)
stack = <span class="hljs-built_in">append</span>(stack, <span class="hljs-number">2</span>)
stack = <span class="hljs-built_in">append</span>(stack, <span class="hljs-number">5</span>)
stack = <span class="hljs-built_in">append</span>(stack, <span class="hljs-number">4</span>)

<span class="hljs-comment">/* الاطّلاع على العنصر العلوي */</span>
peek := stack[<span class="hljs-built_in">len</span>(stack)<span class="hljs-number">-1</span>]

<span class="hljs-comment">/* سحب العنصر */</span>
pop := stack[<span class="hljs-built_in">len</span>(stack)<span class="hljs-number">-1</span>]
stack = stack[:<span class="hljs-built_in">len</span>(stack)<span class="hljs-number">-1</span>]

<span class="hljs-comment">/* الحصول على طول المكدس */</span>
size := <span class="hljs-built_in">len</span>(stack)

<span class="hljs-comment">/* التحقق مما إذا كان فارغاً */</span>
isEmpty := <span class="hljs-built_in">len</span>(stack) == <span class="hljs-number">0</span>
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-typescript"><span class="hljs-comment">/* تهيئة المكدس */</span>
<span class="hljs-comment">// لا تحتوي TypeScript على فئة مكدس مدمجة، ويمكن استخدام Array كمكدس</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">stack</span>: <span class="hljs-built_in">number</span>[] = [];

<span class="hljs-comment">/* دفع العناصر */</span>
stack.<span class="hljs-title function_">push</span>(<span class="hljs-number">1</span>);
stack.<span class="hljs-title function_">push</span>(<span class="hljs-number">3</span>);
stack.<span class="hljs-title function_">push</span>(<span class="hljs-number">2</span>);
stack.<span class="hljs-title function_">push</span>(<span class="hljs-number">5</span>);
stack.<span class="hljs-title function_">push</span>(<span class="hljs-number">4</span>);

<span class="hljs-comment">/* الاطّلاع على العنصر العلوي */</span>
<span class="hljs-keyword">const</span> peek = stack[stack.<span class="hljs-property">length</span> - <span class="hljs-number">1</span>];

<span class="hljs-comment">/* سحب العنصر */</span>
<span class="hljs-keyword">const</span> pop = stack.<span class="hljs-title function_">pop</span>();

<span class="hljs-comment">/* الحصول على طول المكدس */</span>
<span class="hljs-keyword">const</span> size = stack.<span class="hljs-property">length</span>;

<span class="hljs-comment">/* التحقق مما إذا كان فارغاً */</span>
<span class="hljs-keyword">const</span> is_empty = stack.<span class="hljs-property">length</span> === <span class="hljs-number">0</span>;
</code></pre>
</div>
<h2 id="تنفيذ-المكدس">تنفيذ المكدس</h2>
<p>لفهم كيفية عمل المكدس فهماً أعمق، دعنا نحاول تنفيذ فئة مكدس بأنفسنا.</p>
<p>يتبع المكدس مبدأ LIFO، لذا يمكننا فقط إضافة العناصر أو إزالتها عند القمة. غير أن المصفوفات والقوائم المترابطة معاً تسمحان بإضافة العناصر وإزالتها في أي موضع. <strong>لذلك، يمكن النظر إلى المكدس كمصفوفة أو قائمة مترابطة مقيّدة</strong>. بعبارة أخرى، يمكننا &quot;حجب&quot; بعض العمليات غير ذات الصلة في المصفوفات أو القوائم المترابطة بحيث يتوافق منطقها الخارجي مع خصائص المكدس.</p>
<h3 id="التنفيذ-بقائمة-مترابطة">التنفيذ بقائمة مترابطة</h3>
<p>عند تنفيذ مكدس باستخدام قائمة مترابطة، يمكننا اعتبار العقدة الرأسية للقائمة المترابطة قمةَ المكدس والعقدة الذيلية قاعَه.</p>
<p>كما يظهر في الشكل التالي، في عملية الدفع نكتفي بإدراج عنصر عند رأس القائمة المترابطة. وتسمى طريقة إدراج العقد هذه &quot;طريقة الإدراج الرأسي&quot;. وفي عملية السحب، نحتاج فقط إلى إزالة العقدة الرأسية من القائمة المترابطة.</p>
<p>فيما يلي شيفرة نموذجية لتنفيذ مكدس قائم على قائمة مترابطة:</p>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* مكدس قائم على تنفيذ قائمة مترابطة */</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">LinkedListStack</span> {
    <span class="hljs-keyword">private</span> <span class="hljs-attr">stackPeek</span>: <span class="hljs-title class_">ListNode</span> | <span class="hljs-literal">null</span>; <span class="hljs-comment">// استخدم العقدة الرأسية كقمة للمكدس</span>
    <span class="hljs-keyword">private</span> <span class="hljs-attr">stkSize</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">0</span>; <span class="hljs-comment">// طول المكدس</span>

    <span class="hljs-title function_">constructor</span>(<span class="hljs-params"></span>) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">stackPeek</span> = <span class="hljs-literal">null</span>;
    }

    <span class="hljs-comment">/* الحصول على طول المكدس */</span>
    <span class="hljs-keyword">get</span> <span class="hljs-title function_">size</span>(): <span class="hljs-built_in">number</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">stkSize</span>;
    }

    <span class="hljs-comment">/* التحقق مما إذا كان المكدس فارغاً */</span>
    <span class="hljs-title function_">isEmpty</span>(): <span class="hljs-built_in">boolean</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">size</span> === <span class="hljs-number">0</span>;
    }

    <span class="hljs-comment">/* الدفع */</span>
    <span class="hljs-title function_">push</span>(<span class="hljs-attr">num</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">void</span> {
        <span class="hljs-keyword">const</span> node = <span class="hljs-keyword">new</span> <span class="hljs-title class_">ListNode</span>(num);
        node.<span class="hljs-property">next</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">stackPeek</span>;
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">stackPeek</span> = node;
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">stkSize</span>++;
    }

    <span class="hljs-comment">/* السحب */</span>
    <span class="hljs-title function_">pop</span>(): <span class="hljs-built_in">number</span> {
        <span class="hljs-keyword">const</span> num = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">peek</span>();
        <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">stackPeek</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Stack is empty&#x27;</span>);
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">stackPeek</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">stackPeek</span>.<span class="hljs-property">next</span>;
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">stkSize</span>--;
        <span class="hljs-keyword">return</span> num;
    }

    <span class="hljs-comment">/* إعادة القائمة للطباعة */</span>
    <span class="hljs-title function_">peek</span>(): <span class="hljs-built_in">number</span> {
        <span class="hljs-keyword">if</span> (!<span class="hljs-variable language_">this</span>.<span class="hljs-property">stackPeek</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Stack is empty&#x27;</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">stackPeek</span>.<span class="hljs-property">val</span>;
    }

    <span class="hljs-comment">/* تحويل القائمة المترابطة إلى Array وإعادتها */</span>
    <span class="hljs-title function_">toArray</span>(): <span class="hljs-built_in">number</span>[] {
        <span class="hljs-keyword">let</span> node = <span class="hljs-variable language_">this</span>.<span class="hljs-property">stackPeek</span>;
        <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Array</span>&lt;<span class="hljs-built_in">number</span>&gt;(<span class="hljs-variable language_">this</span>.<span class="hljs-property">size</span>);
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = res.<span class="hljs-property">length</span> - <span class="hljs-number">1</span>; i &gt;= <span class="hljs-number">0</span>; i--) {
            res[i] = node!.<span class="hljs-property">val</span>;
            node = node!.<span class="hljs-property">next</span>;
        }
        <span class="hljs-keyword">return</span> res;
    }
}
</code></pre>
</div>
<h3 id="التنفيذ-بمصفوفة">التنفيذ بمصفوفة</h3>
<p>عند تنفيذ مكدس باستخدام مصفوفة، يمكننا اعتبار نهاية المصفوفة قمةَ المكدس. وكما يظهر في الشكل التالي، تقابل عمليتا الدفع والسحب إضافة عناصر وحذفها عند نهاية المصفوفة، وكلتاهما بتعقيد زمني $O(1)$.</p>
<p>بما أن العناصر المدفوعة إلى المكدس قد تزداد باستمرار، يمكننا استخدام مصفوفة ديناميكية، مما يلغي الحاجة إلى معالجة توسيع المصفوفة بأنفسنا. وإليك الشيفرة النموذجية:</p>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* مكدس قائم على تنفيذ مصفوفة */</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">ArrayStack</span> {
    <span class="hljs-keyword">private</span> <span class="hljs-attr">stack</span>: <span class="hljs-built_in">number</span>[];
    <span class="hljs-title function_">constructor</span>(<span class="hljs-params"></span>) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">stack</span> = [];
    }

    <span class="hljs-comment">/* الحصول على طول المكدس */</span>
    <span class="hljs-keyword">get</span> <span class="hljs-title function_">size</span>(): <span class="hljs-built_in">number</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">stack</span>.<span class="hljs-property">length</span>;
    }

    <span class="hljs-comment">/* التحقق مما إذا كان المكدس فارغاً */</span>
    <span class="hljs-title function_">isEmpty</span>(): <span class="hljs-built_in">boolean</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">stack</span>.<span class="hljs-property">length</span> === <span class="hljs-number">0</span>;
    }

    <span class="hljs-comment">/* الدفع */</span>
    <span class="hljs-title function_">push</span>(<span class="hljs-attr">num</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">void</span> {
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">stack</span>.<span class="hljs-title function_">push</span>(num);
    }

    <span class="hljs-comment">/* السحب */</span>
    <span class="hljs-title function_">pop</span>(): <span class="hljs-built_in">number</span> | <span class="hljs-literal">undefined</span> {
        <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">isEmpty</span>()) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Stack is empty&#x27;</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">stack</span>.<span class="hljs-title function_">pop</span>();
    }

    <span class="hljs-comment">/* إعادة القائمة للطباعة */</span>
    <span class="hljs-title function_">top</span>(): <span class="hljs-built_in">number</span> | <span class="hljs-literal">undefined</span> {
        <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">isEmpty</span>()) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Stack is empty&#x27;</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">stack</span>[<span class="hljs-variable language_">this</span>.<span class="hljs-property">stack</span>.<span class="hljs-property">length</span> - <span class="hljs-number">1</span>];
    }

    <span class="hljs-comment">/* إعادة Array */</span>
    <span class="hljs-title function_">toArray</span>(<span class="hljs-params"></span>) {
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">stack</span>;
    }
}
</code></pre>
</div>
<h2 id="مقارنة-بين-التنفيذين">مقارنة بين التنفيذين</h2>
<p><strong>العمليات المدعومة</strong></p>
<p>يدعم التنفيذان جميع العمليات التي يعرّفها المكدس. ويتميز التنفيذ بالمصفوفة بأنه يدعم إضافةً إلى ذلك الوصول العشوائي، لكن هذا يخرج عن تعريف المكدس ولا يُستخدم عادةً.</p>
<p><strong>الكفاءة الزمنية</strong></p>
<p>في التنفيذ القائم على المصفوفة، تحدث عمليتا الدفع والسحب معاً في ذاكرة متجاورة مخصصة مسبقاً، وهو ما يتمتع بمحلية جيدة لذاكرة التخزين المؤقت (cache locality)، وبالتالي يكون أكثر كفاءة. غير أنه إذا تجاوز الدفع سعة المصفوفة، فسيُفعِّل آلية توسيع، مما يجعل التعقيد الزمني لعملية الدفع تلك تحديداً $O(n)$.</p>
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
`,e={book:s,chapter:a,chapterTitle:n,slug:p,title:l,headings:t,html:c};export{s as book,a as chapter,n as chapterTitle,e as default,t as headings,c as html,p as slug,l as title};
