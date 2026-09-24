const s="hello-algo",n="chapter_heap",a="الأكوام (Heaps)",p="heap",l="الكومة",t=[{depth:2,id:"عمليات-الكومة-الشائعة",text:"عمليات الكومة الشائعة"},{depth:2,id:"تنفيذ-الكومة",text:"تنفيذ الكومة"},{depth:3,id:"تخزين-الكومة-وتمثيلها",text:"تخزين الكومة وتمثيلها"},{depth:3,id:"الوصول-إلى-العنصر-الأعلى-في-الكومة",text:"الوصول إلى العنصر الأعلى في الكومة"},{depth:3,id:"إدراج-عنصر-في-الكومة",text:"إدراج عنصر في الكومة"},{depth:3,id:"حذف-العنصر-الأعلى-في-الكومة",text:"حذف العنصر الأعلى في الكومة"},{depth:2,id:"التطبيقات-الشائعة-للأكوام",text:"التطبيقات الشائعة للأكوام"}],e=`<p><u>الكومة (heap)</u> شجرة ثنائية كاملة تحقق شروطاً محددة، ويمكن تصنيفها أساساً إلى نوعين، كما هو موضح في الشكل أدناه.</p>
<ul>
<li><u>الكومة الصغرى (min heap)</u>: قيمة أي عقدة $\\leq$ قيم عقدها الفرعية.</li>
<li><u>الكومة العظمى (max heap)</u>: قيمة أي عقدة $\\geq$ قيم عقدها الفرعية.</li>
</ul>
<p><img src="/images/hello-algo/chapter_heap--min_heap_and_max_heap.png" alt="الكومة الصغرى والكومة العظمى"></p>
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
<td>$O(\\log n)$</td>
</tr>
<tr>
<td><code>pop()</code></td>
<td>حذف العنصر الأعلى في الكومة</td>
<td>$O(\\log n)$</td>
</tr>
<tr>
<td><code>peek()</code></td>
<td>الوصول إلى العنصر الأعلى في الكومة (القيمة العظمى/الصغرى في الكومة العظمى/الصغرى)</td>
<td>$O(1)$</td>
</tr>
<tr>
<td><code>size()</code></td>
<td>الحصول على عدد عناصر الكومة</td>
<td>$O(1)$</td>
</tr>
<tr>
<td><code>isEmpty()</code></td>
<td>فحص ما إذا كانت الكومة فارغة</td>
<td>$O(1)$</td>
</tr>
</tbody>
</table>
<p>في التطبيقات العملية، يمكننا استخدام فئة الكومة (أو فئة طابور الأولوية) التي توفرها لغات البرمجة مباشرةً.</p>
<p>وعلى غرار «الترتيب التصاعدي» و«الترتيب التنازلي» في خوارزميات الترتيب، يمكننا تنفيذ التحويل بين «الكومة الصغرى» و«الكومة العظمى» عبر ضبط <code>flag</code> أو تعديل <code>Comparator</code>. والكود كما يلي:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">// في Go، يمكننا إنشاء كومة عظمى من الأعداد الصحيحة عبر تنفيذ heap.Interface</span>
<span class="hljs-comment">// يتطلب تنفيذ heap.Interface أيضاً تنفيذ sort.Interface</span>
<span class="hljs-keyword">type</span> intHeap []any

<span class="hljs-comment">// تنفّذ Push دالة الواجهة heap.Interface لإدراج عنصر في الكومة</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(h *intHeap)</span></span> Push(x any) {
    <span class="hljs-comment">// تستخدم Push و Pop مستقبِل المؤشر كمعامل</span>
    <span class="hljs-comment">// لأنهما لا يعدّلان محتوى slice فحسب، بل يعدّلان طوله أيضاً</span>
    *h = <span class="hljs-built_in">append</span>(*h, x.(<span class="hljs-type">int</span>))
}

<span class="hljs-comment">// تنفّذ Pop دالة الواجهة heap.Interface لإخراج العنصر الأعلى في الكومة</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(h *intHeap)</span></span> Pop() any {
    <span class="hljs-comment">// يُخزَّن العنصر المطلوب حذفه في النهاية</span>
    last := (*h)[<span class="hljs-built_in">len</span>(*h)<span class="hljs-number">-1</span>]
    *h = (*h)[:<span class="hljs-built_in">len</span>(*h)<span class="hljs-number">-1</span>]
    <span class="hljs-keyword">return</span> last
}

<span class="hljs-comment">// Len دالة من واجهة sort.Interface</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(h *intHeap)</span></span> Len() <span class="hljs-type">int</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">len</span>(*h)
}

<span class="hljs-comment">// Less دالة من واجهة sort.Interface</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(h *intHeap)</span></span> Less(i, j <span class="hljs-type">int</span>) <span class="hljs-type">bool</span> {
    <span class="hljs-comment">// لتنفيذ كومة صغرى، غيّر هذا إلى علامة أصغر من</span>
    <span class="hljs-keyword">return</span> (*h)[i].(<span class="hljs-type">int</span>) &gt; (*h)[j].(<span class="hljs-type">int</span>)
}

<span class="hljs-comment">// Swap دالة من واجهة sort.Interface</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(h *intHeap)</span></span> Swap(i, j <span class="hljs-type">int</span>) {
    (*h)[i], (*h)[j] = (*h)[j], (*h)[i]
}

<span class="hljs-comment">// Top تحصل على العنصر الأعلى في الكومة</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(h *intHeap)</span></span> Top() any {
    <span class="hljs-keyword">return</span> (*h)[<span class="hljs-number">0</span>]
}

<span class="hljs-comment">/* شيفرة الاختبار */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">TestHeap</span><span class="hljs-params">(t *testing.T)</span></span> {
    <span class="hljs-comment">/* تهيئة كومة */</span>
    <span class="hljs-comment">// هيّئ كومة عظمى</span>
    maxHeap := &amp;intHeap{}
    heap.Init(maxHeap)
    <span class="hljs-comment">/* إدراج العناصر في الكومة */</span>
    <span class="hljs-comment">// استدعِ دوال heap.Interface لإضافة العناصر</span>
    heap.Push(maxHeap, <span class="hljs-number">1</span>)
    heap.Push(maxHeap, <span class="hljs-number">3</span>)
    heap.Push(maxHeap, <span class="hljs-number">2</span>)
    heap.Push(maxHeap, <span class="hljs-number">4</span>)
    heap.Push(maxHeap, <span class="hljs-number">5</span>)

    <span class="hljs-comment">/* الحصول على العنصر الأعلى في الكومة */</span>
    top := maxHeap.Top()
    fmt.Printf(<span class="hljs-string">&quot;Heap top element is %d\\n&quot;</span>, top)

    <span class="hljs-comment">/* حذف العنصر الأعلى في الكومة */</span>
    <span class="hljs-comment">// استدعِ دوال heap.Interface لإزالة العناصر</span>
    heap.Pop(maxHeap) <span class="hljs-comment">// 5</span>
    heap.Pop(maxHeap) <span class="hljs-comment">// 4</span>
    heap.Pop(maxHeap) <span class="hljs-comment">// 3</span>
    heap.Pop(maxHeap) <span class="hljs-comment">// 2</span>
    heap.Pop(maxHeap) <span class="hljs-comment">// 1</span>

    <span class="hljs-comment">/* الحصول على حجم الكومة */</span>
    size := <span class="hljs-built_in">len</span>(*maxHeap)
    fmt.Printf(<span class="hljs-string">&quot;Number of heap elements is %d\\n&quot;</span>, size)

    <span class="hljs-comment">/* فحص ما إذا كانت الكومة فارغة */</span>
    isEmpty := <span class="hljs-built_in">len</span>(*maxHeap) == <span class="hljs-number">0</span>
    fmt.Printf(<span class="hljs-string">&quot;Is the heap empty? %t\\n&quot;</span>, isEmpty)
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-typescript"><span class="hljs-comment">// لا يوفّر TypeScript فئة Heap مدمجة</span>
</code></pre>
</div>
<h2 id="تنفيذ-الكومة">تنفيذ الكومة</h2>
<p>التنفيذ التالي خاص بالكومة العظمى. ولتحويله إلى كومة صغرى، ما عليك سوى عكس كل منطق المقارنة المتعلق بالترتيب (على سبيل المثال، استبدال $\\geq$ بـ $\\leq$). ونشجّع القرّاء المهتمين على تنفيذ ذلك بأنفسهم.</p>
<h3 id="تخزين-الكومة-وتمثيلها">تخزين الكومة وتمثيلها</h3>
<p>كما ذُكر في فصل «الشجرة الثنائية»، تلائم الأشجار الثنائية الكاملة التمثيل بالمصفوفات. ولأن الأكوام نوع من الأشجار الثنائية الكاملة، <strong>فإننا سنستخدم المصفوفات لتخزين الأكوام</strong>.</p>
<p>عند تمثيل شجرة ثنائية بمصفوفة، تمثل العناصر قيم العقد، وتمثل الفهارس مواضع العقد في الشجرة الثنائية. <strong>وتُمثَّل علاقات الأب-الابن عبر صيغ ربط الفهارس</strong>.</p>
<p>وكما هو موضح في الشكل أدناه، بمعطى فهرس $i$، يكون فهرس الابن الأيسر $2i + 1$، وفهرس الابن الأيمن $2i + 2$، وفهرس الأب $(i - 1) / 2$ (قسمة أرضية). وعندما يخرج الفهرس عن الحدود، فهذا يشير إلى عقدة فارغة أو إلى أن العقدة غير موجودة.</p>
<p><img src="/images/hello-algo/chapter_heap--representation_of_heap.png" alt="تمثيل الأكوام وتخزينها"></p>
<p>يمكننا تغليف صيغة ربط الفهارس في دوال لتسهيل استخدامها لاحقاً:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* الحصول على فهرس العقدة الأب */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(h *maxHeap)</span></span> parent(i <span class="hljs-type">int</span>) <span class="hljs-type">int</span> {
	<span class="hljs-comment">// قسمة أرضية</span>
	<span class="hljs-keyword">return</span> (i - <span class="hljs-number">1</span>) / <span class="hljs-number">2</span>
}
</code></pre>
</div>
<h3 id="الوصول-إلى-العنصر-الأعلى-في-الكومة">الوصول إلى العنصر الأعلى في الكومة</h3>
<p>العنصر الأعلى في الكومة هو العقدة الجذرية للشجرة الثنائية، وهو أيضاً العنصر الأول في القائمة:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* الوصول إلى العنصر الأعلى */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(h *maxHeap)</span></span> peek() any {
	<span class="hljs-keyword">return</span> h.data[<span class="hljs-number">0</span>]
}
</code></pre>
</div>
<h3 id="إدراج-عنصر-في-الكومة">إدراج عنصر في الكومة</h3>
<p>بمعطى عنصر <code>val</code>، نضيفه أولاً إلى قاع الكومة. وبعد الإدراج، قد تُنتهك خاصية الكومة لأن <code>val</code> قد يكون أكبر من عناصر أخرى في الكومة. <strong>لذلك نحتاج إلى استعادة خاصية الكومة على طول المسار من العقدة المُدرجة إلى الجذر</strong>. وتسمى هذه العملية <u>تعديل الكومة (heapify)</u>.</p>
<p>بدءاً من العقدة المُدرجة، <strong>ننفّذ تعديل الكومة من الأسفل إلى الأعلى</strong>. وكما هو موضح في الشكل أدناه، نقارن العقدة المُدرجة بالعقدة الأب، وإذا كانت العقدة المُدرجة أكبر نبادلهما. ونواصل هذه العملية من الأسفل إلى الأعلى حتى نتجاوز الجذر أو نصل إلى عقدة لم تعد بحاجة إلى تبادل.</p>
<p>بالمجموع $n$ من العقد، يكون ارتفاع الشجرة $O(\\log n)$. ومن ثم، فإن عدد تكرارات الحلقة في عملية تعديل الكومة لا يزيد عن $O(\\log n)$، <strong>وهو ما يجعل التعقيد الزمني لعملية إدراج العنصر $O(\\log n)$</strong>. والكود كما يلي:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* بدءاً من العقدة i، نفّذ تعديل الكومة من الأسفل إلى الأعلى */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(h *maxHeap)</span></span> siftUp(i <span class="hljs-type">int</span>) {
	<span class="hljs-keyword">for</span> <span class="hljs-literal">true</span> {
		<span class="hljs-comment">// احصل على العقدة الأب للعقدة i</span>
		p := h.parent(i)
		<span class="hljs-comment">// عندما «نتجاوز العقدة الجذرية» أو «لا تحتاج العقدة إلى إصلاح»، أنهِ تعديل الكومة</span>
		<span class="hljs-keyword">if</span> p &lt; <span class="hljs-number">0</span> || h.data[i].(<span class="hljs-type">int</span>) &lt;= h.data[p].(<span class="hljs-type">int</span>) {
			<span class="hljs-keyword">break</span>
		}
		<span class="hljs-comment">// بادل العقدتين</span>
		h.swap(i, p)
		<span class="hljs-comment">// كرّر تعديل الكومة صعوداً</span>
		i = p
	}
}
</code></pre>
</div>
<h3 id="حذف-العنصر-الأعلى-في-الكومة">حذف العنصر الأعلى في الكومة</h3>
<p>العنصر الأعلى في الكومة هو العقدة الجذرية للشجرة الثنائية، وهو العنصر الأول في القائمة. وإذا حذفنا العنصر الأول من القائمة مباشرةً، فستتغير جميع فهارس العقد في الشجرة الثنائية، مما يصعّب الإصلاح اللاحق بتعديل الكومة. ولتقليل تغيّرات فهارس العناصر إلى أدنى حد، نتبع الخطوات التالية.</p>
<ol>
<li>بادل العنصر الأعلى في الكومة بعنصر قاع الكومة (بادل العقدة الجذرية بالعقدة الورقية الأقصى يميناً).</li>
<li>بعد التبادل، احذف قاع الكومة من القائمة (لاحظ أننا في الواقع نحذف العنصر الأعلى الأصلي في الكومة لأننا بادلناه).</li>
<li>بدءاً من العقدة الجذرية، <strong>نفّذ تعديل الكومة من الأعلى إلى الأسفل</strong>.</li>
</ol>
<p>وكما هو موضح في الشكل أدناه، <strong>يكون اتجاه «تعديل الكومة من الأعلى إلى الأسفل» معاكساً لاتجاه «تعديل الكومة من الأسفل إلى الأعلى»</strong>. نقارن قيمة العقدة الجذرية بقيم ابنيها ونبادلها مع الابن الأكبر. ثم نكرّر هذه العملية حتى نتجاوز عقدة ورقية أو نصادف عقدة لا تحتاج إلى تبادل.</p>
<p>وعلى غرار عملية إدراج العنصر، يكون التعقيد الزمني لعملية حذف العنصر الأعلى في الكومة أيضاً $O(\\log n)$. والكود كما يلي:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* بدءاً من العقدة i، نفّذ تعديل الكومة من الأعلى إلى الأسفل */</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(h *maxHeap)</span></span> siftDown(i <span class="hljs-type">int</span>) {
	<span class="hljs-keyword">for</span> <span class="hljs-literal">true</span> {
		<span class="hljs-comment">// ابحث عن العقدة ذات القيمة العظمى بين العقد i و l و r، وسمّها max</span>
		l, r, max := h.left(i), h.right(i), i
		<span class="hljs-keyword">if</span> l &lt; h.size() &amp;&amp; h.data[l].(<span class="hljs-type">int</span>) &gt; h.data[max].(<span class="hljs-type">int</span>) {
			max = l
		}
		<span class="hljs-keyword">if</span> r &lt; h.size() &amp;&amp; h.data[r].(<span class="hljs-type">int</span>) &gt; h.data[max].(<span class="hljs-type">int</span>) {
			max = r
		}
		<span class="hljs-comment">// بادل العقدتين</span>
		<span class="hljs-keyword">if</span> max == i {
			<span class="hljs-keyword">break</span>
		}
		<span class="hljs-comment">// بادل العقدتين</span>
		h.swap(i, max)
		<span class="hljs-comment">// كرّر تعديل الكومة نزولاً</span>
		i = max
	}
}
</code></pre>
</div>
<h2 id="التطبيقات-الشائعة-للأكوام">التطبيقات الشائعة للأكوام</h2>
<ul>
<li><strong>طابور الأولوية</strong>: الأكوام عادةً هي بنية البيانات المفضلة لتنفيذ طوابير الأولوية. فالتعقيد الزمني لكل من عمليتي الإدخال والإخراج هو $O(\\log n)$، وبناء الكومة له تعقيد زمني $O(n)$، مما يجعل هذه العمليات عالية الكفاءة.</li>
<li><strong>ترتيب الكومة</strong>: بمعطى مجموعة من البيانات، يمكننا بناء كومة منها ثم تنفيذ عمليات حذف العناصر باستمرار للحصول على بيانات مرتبة. غير أننا نستخدم عادةً أسلوباً أكثر أناقة لتنفيذ ترتيب الكومة، كما هو مفصل في فصل «ترتيب الكومة».</li>
<li><strong>الحصول على أكبر $k$ من العناصر</strong>: هذه مسألة خوارزمية كلاسيكية وتطبيق نموذجي أيضاً، مثل اختيار الأخبار العشرة الأكثر رواجاً في «بحث ويبو الساخن» أو المنتجات العشرة الأكثر مبيعاً.</li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:p,title:l,headings:t,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,t as headings,e as html,p as slug,l as title};
