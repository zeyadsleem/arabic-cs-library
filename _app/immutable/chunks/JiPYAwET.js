const s="hello-algo",a="chapter_array_and_linkedlist",n="المصفوفات والقوائم المترابطة",l="list",p="القائمة",c=[{depth:2,id:"عمليات-القائمة-الشائعة",text:"عمليات القائمة الشائعة"},{depth:3,id:"تهيئة-قائمة",text:"تهيئة قائمة"},{depth:3,id:"الوصول-إلى-العناصر",text:"الوصول إلى العناصر"},{depth:3,id:"إدراج-العناصر-وحذفها",text:"إدراج العناصر وحذفها"},{depth:3,id:"اجتياز-القائمة",text:"اجتياز القائمة"},{depth:3,id:"دمج-القوائم",text:"دمج القوائم"},{depth:3,id:"ترتيب-القائمة",text:"ترتيب القائمة"},{depth:2,id:"تنفيذ-القائمة",text:"تنفيذ القائمة"}],e=`<p><u>القائمة</u> (list) مفهوم مجرد في بنى البيانات يمثل مجموعة مرتَّبة من العناصر، ويدعم عمليات مثل الوصول إلى العناصر وتعديلها وإدراجها وحذفها واجتيازها، دون أن يقتضي من المستخدم مراعاة حدود السعة. ويمكن تنفيذ القوائم استناداً إلى قوائم مترابطة أو مصفوفات.</p>
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
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* تهيئة قائمة */</span>
<span class="hljs-comment">// دون قيم أولية</span>
nums1 := []<span class="hljs-type">int</span>{}
<span class="hljs-comment">// مع قيم أولية</span>
nums := []<span class="hljs-type">int</span>{<span class="hljs-number">1</span>, <span class="hljs-number">3</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-typescript"><span class="hljs-comment">/* تهيئة قائمة */</span>
<span class="hljs-comment">// دون قيم أولية</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">nums1</span>: <span class="hljs-built_in">number</span>[] = [];
<span class="hljs-comment">// مع قيم أولية</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">nums</span>: <span class="hljs-built_in">number</span>[] = [<span class="hljs-number">1</span>, <span class="hljs-number">3</span>, <span class="hljs-number">2</span>, <span class="hljs-number">5</span>, <span class="hljs-number">4</span>];
</code></pre>
</div>
<h3 id="الوصول-إلى-العناصر">الوصول إلى العناصر</h3>
<p>بما أن القائمة هي في جوهرها مصفوفة، يمكننا الوصول إلى العناصر وتحديثها بتعقيد زمني $O(1)$، وهو أمر بالغ الكفاءة.</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* الوصول إلى عنصر */</span>
num := nums[<span class="hljs-number">1</span>]  <span class="hljs-comment">// الوصول إلى العنصر عند الفهرس 1</span>

<span class="hljs-comment">/* تحديث عنصر */</span>
nums[<span class="hljs-number">1</span>] = <span class="hljs-number">0</span>     <span class="hljs-comment">// تحديث العنصر عند الفهرس 1 إلى 0</span>
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-typescript"><span class="hljs-comment">/* الوصول إلى عنصر */</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">num</span>: <span class="hljs-built_in">number</span> = nums[<span class="hljs-number">1</span>];  <span class="hljs-comment">// الوصول إلى العنصر عند الفهرس 1</span>

<span class="hljs-comment">/* تحديث عنصر */</span>
nums[<span class="hljs-number">1</span>] = <span class="hljs-number">0</span>;  <span class="hljs-comment">// تحديث العنصر عند الفهرس 1 إلى 0</span>
</code></pre>
</div>
<h3 id="إدراج-العناصر-وحذفها">إدراج العناصر وحذفها</h3>
<p>بالمقارنة مع المصفوفات، تستطيع القوائم إضافة العناصر وحذفها بحرية. وإضافة عنصر في نهاية القائمة لها تعقيد زمني $O(1)$، أما إدراج العناصر وحذفها فتبقى بكفاءة المصفوفات نفسها، بتعقيد زمني $O(n)$.</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* تفريغ القائمة */</span>
nums = <span class="hljs-literal">nil</span>

<span class="hljs-comment">/* إضافة عناصر في النهاية */</span>
nums = <span class="hljs-built_in">append</span>(nums, <span class="hljs-number">1</span>)
nums = <span class="hljs-built_in">append</span>(nums, <span class="hljs-number">3</span>)
nums = <span class="hljs-built_in">append</span>(nums, <span class="hljs-number">2</span>)
nums = <span class="hljs-built_in">append</span>(nums, <span class="hljs-number">5</span>)
nums = <span class="hljs-built_in">append</span>(nums, <span class="hljs-number">4</span>)

<span class="hljs-comment">/* إدراج عنصر في الوسط */</span>
nums = <span class="hljs-built_in">append</span>(nums[:<span class="hljs-number">3</span>], <span class="hljs-built_in">append</span>([]<span class="hljs-type">int</span>{<span class="hljs-number">6</span>}, nums[<span class="hljs-number">3</span>:]...)...) <span class="hljs-comment">// إدراج العدد 6 عند الفهرس 3</span>

<span class="hljs-comment">/* حذف عنصر */</span>
nums = <span class="hljs-built_in">append</span>(nums[:<span class="hljs-number">3</span>], nums[<span class="hljs-number">4</span>:]...) <span class="hljs-comment">// حذف العنصر عند الفهرس 3</span>
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-typescript"><span class="hljs-comment">/* تفريغ القائمة */</span>
nums.<span class="hljs-property">length</span> = <span class="hljs-number">0</span>;

<span class="hljs-comment">/* إضافة عناصر في النهاية */</span>
nums.<span class="hljs-title function_">push</span>(<span class="hljs-number">1</span>);
nums.<span class="hljs-title function_">push</span>(<span class="hljs-number">3</span>);
nums.<span class="hljs-title function_">push</span>(<span class="hljs-number">2</span>);
nums.<span class="hljs-title function_">push</span>(<span class="hljs-number">5</span>);
nums.<span class="hljs-title function_">push</span>(<span class="hljs-number">4</span>);

<span class="hljs-comment">/* إدراج عنصر في الوسط */</span>
nums.<span class="hljs-title function_">splice</span>(<span class="hljs-number">3</span>, <span class="hljs-number">0</span>, <span class="hljs-number">6</span>); <span class="hljs-comment">// إدراج العدد 6 عند الفهرس 3</span>

<span class="hljs-comment">/* حذف عنصر */</span>
nums.<span class="hljs-title function_">splice</span>(<span class="hljs-number">3</span>, <span class="hljs-number">1</span>);  <span class="hljs-comment">// حذف العنصر عند الفهرس 3</span>
</code></pre>
</div>
<h3 id="اجتياز-القائمة">اجتياز القائمة</h3>
<p>على غرار المصفوفات، يمكن اجتياز القوائم بالفهرس أو بالتكرار المباشر عبر العناصر.</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* اجتياز القائمة بالفهرس */</span>
count := <span class="hljs-number">0</span>
<span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">len</span>(nums); i++ {
    count += nums[i]
}

<span class="hljs-comment">/* اجتياز عناصر القائمة مباشرة */</span>
count = <span class="hljs-number">0</span>
<span class="hljs-keyword">for</span> _, num := <span class="hljs-keyword">range</span> nums {
    count += num
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-typescript"><span class="hljs-comment">/* اجتياز القائمة بالفهرس */</span>
<span class="hljs-keyword">let</span> count = <span class="hljs-number">0</span>;
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; nums.<span class="hljs-property">length</span>; i++) {
    count += nums[i];
}

<span class="hljs-comment">/* اجتياز عناصر القائمة مباشرة */</span>
count = <span class="hljs-number">0</span>;
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> num <span class="hljs-keyword">of</span> nums) {
    count += num;
}
</code></pre>
</div>
<h3 id="دمج-القوائم">دمج القوائم</h3>
<p>بمعطى قائمة جديدة <code>nums1</code>، يمكننا دمجها في نهاية القائمة الأصلية.</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* دمج قائمتين */</span>
nums1 := []<span class="hljs-type">int</span>{<span class="hljs-number">6</span>, <span class="hljs-number">8</span>, <span class="hljs-number">7</span>, <span class="hljs-number">10</span>, <span class="hljs-number">9</span>}
nums = <span class="hljs-built_in">append</span>(nums, nums1...)  <span class="hljs-comment">// دمج القائمة nums1 في نهاية nums</span>
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-typescript"><span class="hljs-comment">/* دمج قائمتين */</span>
<span class="hljs-keyword">const</span> <span class="hljs-attr">nums1</span>: <span class="hljs-built_in">number</span>[] = [<span class="hljs-number">6</span>, <span class="hljs-number">8</span>, <span class="hljs-number">7</span>, <span class="hljs-number">10</span>, <span class="hljs-number">9</span>];
nums.<span class="hljs-title function_">push</span>(...nums1);  <span class="hljs-comment">// دمج القائمة nums1 في نهاية nums</span>
</code></pre>
</div>
<h3 id="ترتيب-القائمة">ترتيب القائمة</h3>
<p>بعد ترتيب القائمة، يمكننا استخدام خوارزميتَي «البحث الثنائي» و«المؤشرين»، وهما كثيراً ما يُختبران في مسائل خوارزميات المصفوفات.</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* ترتيب القائمة */</span>
sort.Ints(nums)  <span class="hljs-comment">// بعد الترتيب، تُرتَّب عناصر القائمة من الأصغر إلى الأكبر</span>
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-typescript"><span class="hljs-comment">/* ترتيب القائمة */</span>
nums.<span class="hljs-title function_">sort</span>(<span class="hljs-function">(<span class="hljs-params">a, b</span>) =&gt;</span> a - b);  <span class="hljs-comment">// بعد الترتيب، تُرتَّب عناصر القائمة من الأصغر إلى الأكبر</span>
</code></pre>
</div>
<h2 id="تنفيذ-القائمة">تنفيذ القائمة</h2>
<p>تحتوي كثير من لغات البرمجة على قوائم مدمجة، مثل Java وC++ وPython. وتطبيقاتها معقدة إلى حد ما، ومعاملاتها مدروسة بعناية، مثل السعة الأولية ومضاعفات التوسيع وغيرها. ويمكن للقارئ المهتم الرجوع إلى الشيفرة المصدرية لمعرفة المزيد.</p>
<p>لتعميق فهمنا لطريقة عمل القوائم، نحاول تنفيذ قائمة بسيطة مع ثلاثة اعتبارات تصميمية رئيسية:</p>
<ul>
<li><strong>السعة الأولية</strong>: اختر سعة أولية معقولة للمصفوفة الأساسية. وفي هذا المثال، نختار 10 سعةً أولية.</li>
<li><strong>تتبع الحجم</strong>: صرّح بمتغير <code>size</code> لتسجيل العدد الحالي لعناصر القائمة وتحديثه لحظياً عند إدراج العناصر وحذفها. واستناداً إلى هذا المتغير، يمكننا تحديد نهاية القائمة ومعرفة ما إذا كان التوسيع مطلوباً.</li>
<li><strong>آلية التوسيع</strong>: عندما تمتلئ سعة القائمة عند إدراج عنصر، نحتاج إلى التوسيع. ننشئ مصفوفة أكبر استناداً إلى مضاعف التوسيع ثم ننقل جميع العناصر من المصفوفة الحالية إلى المصفوفة الجديدة بالترتيب. وفي هذا المثال، نحدد أن تُوسَّع المصفوفة إلى ضعف حجمها السابق في كل مرة.</li>
</ul>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* صنف القائمة */</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">MyList</span> {
    <span class="hljs-keyword">private</span> <span class="hljs-attr">arr</span>: <span class="hljs-title class_">Array</span>&lt;<span class="hljs-built_in">number</span>&gt;; <span class="hljs-comment">// مصفوفة (تخزّن عناصر القائمة)</span>
    <span class="hljs-keyword">private</span> <span class="hljs-attr">_capacity</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">10</span>; <span class="hljs-comment">// سعة القائمة</span>
    <span class="hljs-keyword">private</span> <span class="hljs-attr">_size</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">0</span>; <span class="hljs-comment">// طول القائمة (عدد العناصر الحالي)</span>
    <span class="hljs-keyword">private</span> <span class="hljs-attr">extendRatio</span>: <span class="hljs-built_in">number</span> = <span class="hljs-number">2</span>; <span class="hljs-comment">// المضاعف الذي تُوسَّع به سعة القائمة في كل مرة</span>

    <span class="hljs-comment">/* دالة البناء */</span>
    <span class="hljs-title function_">constructor</span>(<span class="hljs-params"></span>) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">arr</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Array</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">_capacity</span>);
    }

    <span class="hljs-comment">/* احصل على طول القائمة (عدد العناصر الحالي) */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-title function_">size</span>(): <span class="hljs-built_in">number</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">_size</span>;
    }

    <span class="hljs-comment">/* احصل على سعة القائمة */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-title function_">capacity</span>(): <span class="hljs-built_in">number</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">_capacity</span>;
    }

    <span class="hljs-comment">/* تحديث عنصر */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-title function_">get</span>(<span class="hljs-attr">index</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">number</span> {
        <span class="hljs-comment">// إذا كان الفهرس خارج الحدود، ارمِ استثناءً كما يلي</span>
        <span class="hljs-keyword">if</span> (index &lt; <span class="hljs-number">0</span> || index &gt;= <span class="hljs-variable language_">this</span>.<span class="hljs-property">_size</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Index out of bounds&#x27;</span>);
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">arr</span>[index];
    }

    <span class="hljs-comment">/* إضافة عناصر في النهاية */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-title function_">set</span>(<span class="hljs-attr">index</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">num</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">void</span> {
        <span class="hljs-keyword">if</span> (index &lt; <span class="hljs-number">0</span> || index &gt;= <span class="hljs-variable language_">this</span>.<span class="hljs-property">_size</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Index out of bounds&#x27;</span>);
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">arr</span>[index] = num;
    }

    <span class="hljs-comment">/* الاجتياز المباشر لعناصر القائمة */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-title function_">add</span>(<span class="hljs-attr">num</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">void</span> {
        <span class="hljs-comment">// إذا ساوى الطول السعة، يلزم التوسيع</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">_size</span> === <span class="hljs-variable language_">this</span>.<span class="hljs-property">_capacity</span>) <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">extendCapacity</span>();
        <span class="hljs-comment">// أضف عنصراً جديداً إلى نهاية القائمة</span>
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">arr</span>[<span class="hljs-variable language_">this</span>.<span class="hljs-property">_size</span>] = num;
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">_size</span>++;
    }

    <span class="hljs-comment">/* ترتيب القائمة */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-title function_">insert</span>(<span class="hljs-attr">index</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">num</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">void</span> {
        <span class="hljs-keyword">if</span> (index &lt; <span class="hljs-number">0</span> || index &gt;= <span class="hljs-variable language_">this</span>.<span class="hljs-property">_size</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Index out of bounds&#x27;</span>);
        <span class="hljs-comment">// عندما يتجاوز عدد العناصر السعة، فعّل آلية التوسيع</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">_size</span> === <span class="hljs-variable language_">this</span>.<span class="hljs-property">_capacity</span>) {
            <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">extendCapacity</span>();
        }
        <span class="hljs-comment">// حرّك جميع العناصر بعد الفهرس index موضعاً واحداً إلى الأمام</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = <span class="hljs-variable language_">this</span>.<span class="hljs-property">_size</span> - <span class="hljs-number">1</span>; j &gt;= index; j--) {
            <span class="hljs-variable language_">this</span>.<span class="hljs-property">arr</span>[j + <span class="hljs-number">1</span>] = <span class="hljs-variable language_">this</span>.<span class="hljs-property">arr</span>[j];
        }
        <span class="hljs-comment">// حدّث عدد العناصر</span>
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">arr</span>[index] = num;
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">_size</span>++;
    }

    <span class="hljs-comment">/* إزالة عنصر */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-title function_">remove</span>(<span class="hljs-attr">index</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">number</span> {
        <span class="hljs-keyword">if</span> (index &lt; <span class="hljs-number">0</span> || index &gt;= <span class="hljs-variable language_">this</span>.<span class="hljs-property">_size</span>) <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">&#x27;Index out of bounds&#x27;</span>);
        <span class="hljs-keyword">let</span> num = <span class="hljs-variable language_">this</span>.<span class="hljs-property">arr</span>[index];
        <span class="hljs-comment">// حرّك جميع العناصر بعد الفهرس موضعاً واحداً إلى الأمام</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> j = index; j &lt; <span class="hljs-variable language_">this</span>.<span class="hljs-property">_size</span> - <span class="hljs-number">1</span>; j++) {
            <span class="hljs-variable language_">this</span>.<span class="hljs-property">arr</span>[j] = <span class="hljs-variable language_">this</span>.<span class="hljs-property">arr</span>[j + <span class="hljs-number">1</span>];
        }
        <span class="hljs-comment">// حدّث عدد العناصر</span>
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">_size</span>--;
        <span class="hljs-comment">// أعد العنصر المُزال</span>
        <span class="hljs-keyword">return</span> num;
    }

    <span class="hljs-comment">/* شيفرة التشغيل */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-title function_">extendCapacity</span>(): <span class="hljs-built_in">void</span> {
        <span class="hljs-comment">// أنشئ مصفوفة جديدة بطول size وانسخ المصفوفة الأصلية إلى المصفوفة الجديدة</span>
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">arr</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">arr</span>.<span class="hljs-title function_">concat</span>(
            <span class="hljs-keyword">new</span> <span class="hljs-title class_">Array</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">capacity</span>() * (<span class="hljs-variable language_">this</span>.<span class="hljs-property">extendRatio</span> - <span class="hljs-number">1</span>))
        );
        <span class="hljs-comment">// أضف عناصر في النهاية</span>
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">_capacity</span> = <span class="hljs-variable language_">this</span>.<span class="hljs-property">arr</span>.<span class="hljs-property">length</span>;
    }

    <span class="hljs-comment">/* حوّل القائمة إلى مصفوفة */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-title function_">toArray</span>(): <span class="hljs-built_in">number</span>[] {
        <span class="hljs-keyword">let</span> size = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">size</span>();
        <span class="hljs-comment">// العناصر تدخل الطابور</span>
        <span class="hljs-keyword">const</span> arr = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Array</span>(size);
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; size; i++) {
            arr[i] = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">get</span>(i);
        }
        <span class="hljs-keyword">return</span> arr;
    }
}
</code></pre>
</div>
`,t={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:c,html:e};export{s as book,a as chapter,n as chapterTitle,t as default,c as headings,e as html,l as slug,p as title};
