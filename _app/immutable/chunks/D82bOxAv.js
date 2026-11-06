const s="hello-algo",a="chapter_array_and_linkedlist",n="Arrays and Linked Lists",l="list",e="القائمة",p=[{depth:2,id:"عمليات-القائمة-الشائعة",text:"عمليات القائمة الشائعة"},{depth:3,id:"تهيئة-قائمة",text:"تهيئة قائمة"}],t=`<p><u>القائمة</u> (list) مفهوم مجرد في بنى البيانات يمثل مجموعة مرتَّبة من العناصر، ويدعم عمليات مثل الوصول إلى العناصر وتعديلها وإدراجها وحذفها واجتيازها، دون أن يقتضي من المستخدم مراعاة حدود السعة. ويمكن تنفيذ القوائم استناداً إلى قوائم مترابطة أو مصفوفات.</p>
<ul>
<li>يمكن النظر إلى القائمة المترابطة بطبيعتها على أنها قائمة: فهي تدعم الإدراج والحذف والبحث والتحديث، ويمكنها النمو بمرونة حسب الحاجة.</li>
<li>تدعم المصفوفة أيضاً الإدراج والحذف والبحث والتحديث، لكن لأن طولها ثابت، لا يمكن اعتبارها إلا قائمة بسعة محدودة.</li>
</ul>
<p>عند تنفيذ القائمة بمصفوفة، <strong>يجعل طولها الثابت استخدامها العملي محدوداً</strong>. ذلك لأننا لا نستطيع عادةً تحديد كمية البيانات التي نحتاج إلى تخزينها مسبقاً، ما يجعل اختيار السعة المناسبة أمراً صعباً. فإذا كانت السعة صغيرة جداً، فقد لا تلبي احتياجاتنا؛ وإذا كانت كبيرة جداً، فستُهدر مساحة الذاكرة.</p>
<p>لحل هذه المشكلة، يمكننا استخدام <u>مصفوفة ديناميكية</u> (dynamic array) لتنفيذ قائمة. فهي ترث جميع مزايا المصفوفات مع دعم تغيير الحجم ديناميكياً أثناء تنفيذ البرنامج.</p>
<p>في الواقع، <strong>تُنفَّذ أنواع القوائم التي توفرها المكتبات القياسية في كثير من لغات البرمجة بمصفوفات ديناميكية</strong>، مثل <code>list</code> في Python و<code>ArrayList</code> في Java و<code>vector</code> في C++ و<code>List</code> في C#. وفي المناقشة التالية، سنتعامل مع «القائمة» و«المصفوفة الديناميكية» كمفهومين متكافئين.</p>
<h2 id="عمليات-القائمة-الشائعة">عمليات القائمة الشائعة</h2>
<h3 id="تهيئة-قائمة">تهيئة قائمة</h3>
<p>نهيّئ القائمة عادةً بإحدى طريقتين: فارغة أو بقيم محددة مسبقاً:</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-python"><span class="hljs-comment"># Initialize a list</span>
<span class="hljs-comment"># Without initial values</span>
nums1: <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>] = []
<span class="hljs-comment"># With initial values</span>
nums: <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>] = [<span class="hljs-number">1</span>, <span class="hljs-number">3</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>]
</code></pre>
</div>### الوصول إلى العناصر
<p>بما أن القائمة هي في جوهرها مصفوفة، يمكننا الوصول إلى العناصر وتحديثها بتعقيد زمني <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span>، وهو أمر بالغ الكفاءة.</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-python"><span class="hljs-comment"># Access an element</span>
num: <span class="hljs-built_in">int</span> = nums[<span class="hljs-number">1</span>]  <span class="hljs-comment"># Access element at index 1</span>

<span class="hljs-comment"># Update an element</span>
nums[<span class="hljs-number">1</span>] = <span class="hljs-number">0</span>    <span class="hljs-comment"># Update element at index 1 to 0</span>
</code></pre>
</div>### إدراج العناصر وحذفها
<p>بالمقارنة مع المصفوفات، تستطيع القوائم إضافة العناصر وحذفها بحرية. وإضافة عنصر في نهاية القائمة لها تعقيد زمني <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span>، أما إدراج العناصر وحذفها فتبقى بكفاءة المصفوفات نفسها، بتعقيد زمني <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>.</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-python"><span class="hljs-comment"># Clear the list</span>
nums.clear()

<span class="hljs-comment"># Add elements at the end</span>
nums.append(<span class="hljs-number">1</span>)
nums.append(<span class="hljs-number">3</span>)
nums.append(<span class="hljs-number">2</span>)
nums.append(<span class="hljs-number">5</span>)
nums.append(<span class="hljs-number">4</span>)

<span class="hljs-comment"># Insert an element in the middle</span>
nums.insert(<span class="hljs-number">3</span>, <span class="hljs-number">6</span>)  <span class="hljs-comment"># Insert number 6 at index 3</span>

<span class="hljs-comment"># Delete an element</span>
nums.pop(<span class="hljs-number">3</span>)        <span class="hljs-comment"># Delete element at index 3</span>
</code></pre>
</div>### اجتياز القائمة
<p>على غرار المصفوفات، يمكن اجتياز القوائم بالفهرس أو بالتكرار المباشر عبر العناصر.</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-python"><span class="hljs-comment"># Traverse the list by index</span>
count = <span class="hljs-number">0</span>
<span class="hljs-keyword">for</span> i <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-built_in">len</span>(nums)):
    count += nums[i]

<span class="hljs-comment"># Traverse list elements directly</span>
<span class="hljs-keyword">for</span> num <span class="hljs-keyword">in</span> nums:
    count += num
</code></pre>
</div>### دمج القوائم
<p>بمعطى قائمة جديدة <code>nums1</code>، يمكننا دمجها في نهاية القائمة الأصلية.</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-python"><span class="hljs-comment"># Concatenate two lists</span>
nums1: <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>] = [<span class="hljs-number">6</span>, <span class="hljs-number">8</span>, <span class="hljs-number">7</span>, <span class="hljs-number">10</span>, <span class="hljs-number">9</span>]
nums += nums1  <span class="hljs-comment"># Concatenate list nums1 to the end of nums</span>
</code></pre>
</div>### ترتيب القائمة
<p>بعد ترتيب القائمة، يمكننا استخدام خوارزميتَي «البحث الثنائي» و«المؤشرين»، وهما كثيراً ما يُختبران في مسائل خوارزميات المصفوفات.</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-python"><span class="hljs-comment"># Sort a list</span>
nums.sort()  <span class="hljs-comment"># After sorting, list elements are arranged from smallest to largest</span>
</code></pre>
</div>## تنفيذ القائمة
<p>تحتوي كثير من لغات البرمجة على قوائم مدمجة، مثل Java وC++ وPython. وتطبيقاتها معقدة إلى حد ما، ومعاملاتها مدروسة بعناية، مثل السعة الأولية ومضاعفات التوسيع وغيرها. ويمكن للقارئ المهتم الرجوع إلى الشيفرة المصدرية لمعرفة المزيد.</p>
<p>لتعميق فهمنا لطريقة عمل القوائم، نحاول تنفيذ قائمة بسيطة مع ثلاثة اعتبارات تصميمية رئيسية:</p>
<ul>
<li><strong>السعة الأولية</strong>: اختر سعة أولية معقولة للمصفوفة الأساسية. وفي هذا المثال، نختار 10 سعةً أولية.</li>
<li><strong>تتبع الحجم</strong>: صرّح بمتغير <code>size</code> لتسجيل العدد الحالي لعناصر القائمة وتحديثه لحظياً عند إدراج العناصر وحذفها. واستناداً إلى هذا المتغير، يمكننا تحديد نهاية القائمة ومعرفة ما إذا كان التوسيع مطلوباً.</li>
<li><strong>آلية التوسيع</strong>: عندما تمتلئ سعة القائمة عند إدراج عنصر، نحتاج إلى التوسيع. ننشئ مصفوفة أكبر استناداً إلى مضاعف التوسيع ثم ننقل جميع العناصر من المصفوفة الحالية إلى المصفوفة الجديدة بالترتيب. وفي هذا المثال، نحدد أن تُوسَّع المصفوفة إلى ضعف حجمها السابق في كل مرة.</li>
</ul>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py"><span class="hljs-keyword">class</span> <span class="hljs-title class_">MyList</span>:
    <span class="hljs-string">&quot;&quot;&quot;List class&quot;&quot;&quot;</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot;Constructor&quot;&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>._capacity: <span class="hljs-built_in">int</span> = <span class="hljs-number">10</span>  <span class="hljs-comment"># سعة القائمة</span>
        <span class="hljs-variable language_">self</span>._arr: <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>] = [<span class="hljs-number">0</span>] * <span class="hljs-variable language_">self</span>._capacity  <span class="hljs-comment"># المصفوفة (تخزن عناصر القائمة)</span>
        <span class="hljs-variable language_">self</span>._size: <span class="hljs-built_in">int</span> = <span class="hljs-number">0</span>  <span class="hljs-comment"># طول القائمة (عدد العناصر الحالي)</span>
        <span class="hljs-variable language_">self</span>._extend_ratio: <span class="hljs-built_in">int</span> = <span class="hljs-number">2</span>  <span class="hljs-comment"># معامل نمو سعة القائمة في كل مرة</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">size</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Get the list length (current number of elements)&quot;&quot;&quot;</span>
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>._size

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">capacity</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Get the list capacity&quot;&quot;&quot;</span>
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>._capacity

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">get</span>(<span class="hljs-params">self, index: <span class="hljs-built_in">int</span></span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Access an element&quot;&quot;&quot;</span>
        <span class="hljs-comment"># أطلق استثناء إذا خرج الفهرس عن الحدود؛ وينطبق الأمر نفسه فيما يلي</span>
        <span class="hljs-keyword">if</span> index &lt; <span class="hljs-number">0</span> <span class="hljs-keyword">or</span> index &gt;= <span class="hljs-variable language_">self</span>._size:
            <span class="hljs-keyword">raise</span> IndexError(<span class="hljs-string">&quot;Index out of bounds&quot;</span>)
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>._arr[index]

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">set</span>(<span class="hljs-params">self, num: <span class="hljs-built_in">int</span>, index: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-string">&quot;&quot;&quot;Update an element&quot;&quot;&quot;</span>
        <span class="hljs-keyword">if</span> index &lt; <span class="hljs-number">0</span> <span class="hljs-keyword">or</span> index &gt;= <span class="hljs-variable language_">self</span>._size:
            <span class="hljs-keyword">raise</span> IndexError(<span class="hljs-string">&quot;Index out of bounds&quot;</span>)
        <span class="hljs-variable language_">self</span>._arr[index] = num

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">add</span>(<span class="hljs-params">self, num: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-string">&quot;&quot;&quot;Append an element at the end&quot;&quot;&quot;</span>
        <span class="hljs-comment"># زِد السعة عندما يتجاوز إضافة عنصرٍ حدّها</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.size() == <span class="hljs-variable language_">self</span>.capacity():
            <span class="hljs-variable language_">self</span>.extend_capacity()
        <span class="hljs-variable language_">self</span>._arr[<span class="hljs-variable language_">self</span>._size] = num
        <span class="hljs-variable language_">self</span>._size += <span class="hljs-number">1</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">insert</span>(<span class="hljs-params">self, num: <span class="hljs-built_in">int</span>, index: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-string">&quot;&quot;&quot;Insert an element in the middle&quot;&quot;&quot;</span>
        <span class="hljs-keyword">if</span> index &lt; <span class="hljs-number">0</span> <span class="hljs-keyword">or</span> index &gt;= <span class="hljs-variable language_">self</span>._size:
            <span class="hljs-keyword">raise</span> IndexError(<span class="hljs-string">&quot;Index out of bounds&quot;</span>)
        <span class="hljs-comment"># زِد السعة عندما يتجاوز إضافة عنصرٍ حدّها</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>._size == <span class="hljs-variable language_">self</span>.capacity():
            <span class="hljs-variable language_">self</span>.extend_capacity()
        <span class="hljs-comment"># أزح كل العناصر من الفهرس \`index\` وما بعده موضعًا واحدًا إلى اليمين</span>
        <span class="hljs-keyword">for</span> j <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-variable language_">self</span>._size - <span class="hljs-number">1</span>, index - <span class="hljs-number">1</span>, -<span class="hljs-number">1</span>):
            <span class="hljs-variable language_">self</span>._arr[j + <span class="hljs-number">1</span>] = <span class="hljs-variable language_">self</span>._arr[j]
        <span class="hljs-variable language_">self</span>._arr[index] = num
        <span class="hljs-comment"># حدّث عدد العناصر</span>
        <span class="hljs-variable language_">self</span>._size += <span class="hljs-number">1</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">remove</span>(<span class="hljs-params">self, index: <span class="hljs-built_in">int</span></span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Remove an element&quot;&quot;&quot;</span>
        <span class="hljs-keyword">if</span> index &lt; <span class="hljs-number">0</span> <span class="hljs-keyword">or</span> index &gt;= <span class="hljs-variable language_">self</span>._size:
            <span class="hljs-keyword">raise</span> IndexError(<span class="hljs-string">&quot;Index out of bounds&quot;</span>)
        num = <span class="hljs-variable language_">self</span>._arr[index]
        <span class="hljs-comment"># أزح كل العناصر بعد الفهرس \`index\` موضعًا واحدًا إلى اليسار</span>
        <span class="hljs-keyword">for</span> j <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(index, <span class="hljs-variable language_">self</span>._size - <span class="hljs-number">1</span>):
            <span class="hljs-variable language_">self</span>._arr[j] = <span class="hljs-variable language_">self</span>._arr[j + <span class="hljs-number">1</span>]
        <span class="hljs-comment"># حدّث عدد العناصر</span>
        <span class="hljs-variable language_">self</span>._size -= <span class="hljs-number">1</span>
        <span class="hljs-comment"># أعد العنصر المحذوف</span>
        <span class="hljs-keyword">return</span> num

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">extend_capacity</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot;Grow the list capacity&quot;&quot;&quot;</span>
        <span class="hljs-comment"># أنشئ مصفوفة جديدة طولها _extend_ratio ضعف الطول الأصلي وانسخ الأصلية فيها</span>
        <span class="hljs-variable language_">self</span>._arr = <span class="hljs-variable language_">self</span>._arr + [<span class="hljs-number">0</span>] * <span class="hljs-variable language_">self</span>.capacity() * (<span class="hljs-variable language_">self</span>._extend_ratio - <span class="hljs-number">1</span>)
        <span class="hljs-comment"># حدّث سعة القائمة</span>
        <span class="hljs-variable language_">self</span>._capacity = <span class="hljs-built_in">len</span>(<span class="hljs-variable language_">self</span>._arr)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">to_array</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>]:
        <span class="hljs-string">&quot;&quot;&quot;Return the portion of the list that contains elements&quot;&quot;&quot;</span>
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>._arr[: <span class="hljs-variable language_">self</span>._size]
</code></pre>
</div>`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:e,headings:p,html:t};export{s as book,a as chapter,n as chapterTitle,c as default,p as headings,t as html,l as slug,e as title};
