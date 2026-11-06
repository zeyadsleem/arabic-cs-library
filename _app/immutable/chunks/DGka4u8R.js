const s="hello-algo",a="chapter_hashing",n="Hashing",l="hash_collision",p="تصادم التجزئة",e=[{depth:2,id:"السلسلة-المنفصلة",text:"السلسلة المنفصلة"},{depth:2,id:"العنونة-المفتوحة",text:"العنونة المفتوحة"},{depth:3,id:"الفحص-الخطي",text:"الفحص الخطي"},{depth:3,id:"التجزئة-المتعددة",text:"التجزئة المتعددة"},{depth:2,id:"اختيار-لغات-البرمجة",text:"اختيار لغات البرمجة"}],t=`<p>ذكر القسم السابق أنه، <strong>في معظم الحالات، تكون مساحة إدخال دالة التجزئة أكبر بكثير من مساحة إخراجها</strong>، لذا فإن تصادمات التجزئة حتمية نظرياً. فمثلاً، إذا كانت مساحة الإدخال جميع الأعداد الصحيحة وكانت مساحة الإخراج بحجم سعة المصفوفة، فستُعيَّن حتماً عدة أعداد صحيحة إلى فهرس الدلو نفسه.</p>
<p>وقد تؤدي تصادمات التجزئة إلى نتائج استعلام غير صحيحة، مما يؤثر تأثيراً شديداً في قابلية استخدام جدول التجزئة. ولمعالجة هذه المشكلة، يمكننا عند حدوث تصادم تجزئة إجراء توسيع لجدول التجزئة حتى يزول التصادم. وهذا النهج بسيط ومباشر وفعّال، لكنه غير فعّال إلى حد كبير لأن توسيع جدول التجزئة يتضمن قدراً كبيراً من نقل البيانات وإعادة حساب قيم التجزئة. ولتحسين الكفاءة، يمكننا اتباع الاستراتيجيات التالية:</p>
<ol>
<li>تحسين بنية بيانات جدول التجزئة بحيث <strong>يعمل جدول التجزئة بشكل طبيعي عند حدوث تصادمات تجزئة</strong>.</li>
<li>التوسيع عند الضرورة فقط، أي فقط عندما تكون تصادمات التجزئة شديدة.</li>
</ol>
<p>والطريقتان الرئيسيتان لتحسين بنية جدول التجزئة هما السلسلة المنفصلة والعنونة المفتوحة.</p>
<h2 id="السلسلة-المنفصلة">السلسلة المنفصلة</h2>
<p>في جدول التجزئة الأصلي، يمكن لكل دلو تخزين زوج مفتاح-قيمة واحد فقط. وتستبدل <u>السلسلة المنفصلة</u> العنصر الواحد في كل دلو بقائمة مترابطة، بمعالجة كل زوج مفتاح-قيمة كعقدة وتخزين جميع أزواج المفتاح-القيمة المتصادمة في القائمة نفسها. ويوضح الشكل أدناه مثالاً على جدول تجزئة بالسلسلة المنفصلة.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_hashing--hash_table_chaining.png" alt="جدول تجزئة بالسلسلة المنفصلة"></p>
<p>وفي جدول التجزئة المنفّذ بالسلسلة المنفصلة، تعمل العمليات الأساسية كما يلي:</p>
<ul>
<li><strong>الاستعلام عن العناصر</strong>: أدخِل <code>key</code>، واحسب فهرس الدلو باستخدام دالة التجزئة، وادخل إلى رأس القائمة المترابطة المقابلة، واجتز القائمة مقارناً المفاتيح حتى يُعثر على زوج المفتاح-القيمة الهدف.</li>
<li><strong>إضافة العناصر</strong>: استخدم دالة التجزئة أولاً لتحديد موقع القائمة المترابطة المقابلة، ثم أدرِج العقدة (زوج المفتاح-القيمة) في القائمة.</li>
<li><strong>حذف العناصر</strong>: استخدم دالة التجزئة لتحديد موقع القائمة المترابطة المقابلة، ثم اجتزها لإيجاد العقدة الهدف وحذفها.</li>
</ul>
<p>وللسلسلة المنفصلة القيود التالية:</p>
<ul>
<li><strong>زيادة استخدام المساحة</strong>: تحتوي القائمة المترابطة على مؤشرات عقد، تستهلك مساحة ذاكرة أكبر من المصفوفات.</li>
<li><strong>انخفاض كفاءة الاستعلام</strong>: لأن العثور على العنصر المقابل يتطلب اجتيازاً خطياً للقائمة المترابطة.</li>
</ul>
<p>وتوفّر الشيفرة أدناه تنفيذاً بسيطاً لجدول تجزئة بالسلسلة المنفصلة، مع ملاحظتين:</p>
<ul>
<li>تُستخدم القوائم (المصفوفات الديناميكية) بدلاً من القوائم المترابطة لتبسيط الشيفرة. وفي هذا الإعداد، يحتوي جدول التجزئة (المصفوفة) على عدة دلاء، كل منها قائمة.</li>
<li>يتضمن هذا التنفيذ دالة لتوسيع جدول التجزئة. فعندما يتجاوز معامل الحمولة <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mfrac><mn>2</mn><mn>3</mn></mfrac></mrow><annotation encoding="application/x-tex">\\frac{2}{3}</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1.1901em;vertical-align:-0.345em;"></span><span class="mord"><span class="mopen nulldelimiter"></span><span class="mfrac"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.8451em;"><span style="top:-2.655em;"><span class="pstrut" style="height:3em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">3</span></span></span></span><span style="top:-3.23em;"><span class="pstrut" style="height:3em;"></span><span class="frac-line" style="border-bottom-width:0.04em;"></span></span><span style="top:-3.394em;"><span class="pstrut" style="height:3em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight"><span class="mord mtight">2</span></span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.345em;"><span></span></span></span></span></span><span class="mclose nulldelimiter"></span></span></span></span></span>، نوسّع جدول التجزئة إلى <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>2</mn></mrow><annotation encoding="application/x-tex">2</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">2</span></span></span></span> ضعف حجمه الأصلي.</li>
</ul>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py"><span class="hljs-keyword">class</span> <span class="hljs-title class_">HashMapChaining</span>:
    <span class="hljs-string">&quot;&quot;&quot;Hash table with separate chaining&quot;&quot;&quot;</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot;Constructor&quot;&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>.size = <span class="hljs-number">0</span>  <span class="hljs-comment"># عدد ثنائيات المفتاح-القيمة</span>
        <span class="hljs-variable language_">self</span>.capacity = <span class="hljs-number">4</span>  <span class="hljs-comment"># سعة جدول التجزئة</span>
        <span class="hljs-variable language_">self</span>.load_thres = <span class="hljs-number">2.0</span> / <span class="hljs-number">3.0</span>  <span class="hljs-comment"># عتبة عامل التحميل التي تطلق نموّ السعة</span>
        <span class="hljs-variable language_">self</span>.extend_ratio = <span class="hljs-number">2</span>  <span class="hljs-comment"># معامل نموّ السعة</span>
        <span class="hljs-variable language_">self</span>.buckets = [[] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-variable language_">self</span>.capacity)]  <span class="hljs-comment"># مصفوفة السلال</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">hash_func</span>(<span class="hljs-params">self, key: <span class="hljs-built_in">int</span></span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Hash function&quot;&quot;&quot;</span>
        <span class="hljs-keyword">return</span> key % <span class="hljs-variable language_">self</span>.capacity

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">load_factor</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">float</span>:
        <span class="hljs-string">&quot;&quot;&quot;Load factor&quot;&quot;&quot;</span>
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.size / <span class="hljs-variable language_">self</span>.capacity

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">get</span>(<span class="hljs-params">self, key: <span class="hljs-built_in">int</span></span>) -&gt; <span class="hljs-built_in">str</span> | <span class="hljs-literal">None</span>:
        <span class="hljs-string">&quot;&quot;&quot;Lookup operation&quot;&quot;&quot;</span>
        index = <span class="hljs-variable language_">self</span>.hash_func(key)
        bucket = <span class="hljs-variable language_">self</span>.buckets[index]
        <span class="hljs-comment"># اجتز السلة؛ إذا وُجد key فأعد val المقابل له</span>
        <span class="hljs-keyword">for</span> pair <span class="hljs-keyword">in</span> bucket:
            <span class="hljs-keyword">if</span> pair.key == key:
                <span class="hljs-keyword">return</span> pair.val
        <span class="hljs-comment"># أعد None إذا لم يُوجد key</span>
        <span class="hljs-keyword">return</span> <span class="hljs-literal">None</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">put</span>(<span class="hljs-params">self, key: <span class="hljs-built_in">int</span>, val: <span class="hljs-built_in">str</span></span>):
        <span class="hljs-string">&quot;&quot;&quot;Insert operation&quot;&quot;&quot;</span>
        <span class="hljs-comment"># زِد السعة عندما يتجاوز عامل التحميل العتبة</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.load_factor() &gt; <span class="hljs-variable language_">self</span>.load_thres:
            <span class="hljs-variable language_">self</span>.extend()
        index = <span class="hljs-variable language_">self</span>.hash_func(key)
        bucket = <span class="hljs-variable language_">self</span>.buckets[index]
        <span class="hljs-comment"># اجتز السلة؛ إذا وُجد المفتاح المحدد فحدّث val وأعد</span>
        <span class="hljs-keyword">for</span> pair <span class="hljs-keyword">in</span> bucket:
            <span class="hljs-keyword">if</span> pair.key == key:
                pair.val = val
                <span class="hljs-keyword">return</span>
        <span class="hljs-comment"># إذا كان key غائبًا فألحق الثنائية في النهاية</span>
        pair = Pair(key, val)
        bucket.append(pair)
        <span class="hljs-variable language_">self</span>.size += <span class="hljs-number">1</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">remove</span>(<span class="hljs-params">self, key: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-string">&quot;&quot;&quot;Remove operation&quot;&quot;&quot;</span>
        index = <span class="hljs-variable language_">self</span>.hash_func(key)
        bucket = <span class="hljs-variable language_">self</span>.buckets[index]
        <span class="hljs-comment"># اجتز السلة واحذف الثنائية</span>
        <span class="hljs-keyword">for</span> pair <span class="hljs-keyword">in</span> bucket:
            <span class="hljs-keyword">if</span> pair.key == key:
                bucket.remove(pair)
                <span class="hljs-variable language_">self</span>.size -= <span class="hljs-number">1</span>
                <span class="hljs-keyword">break</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">extend</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot;Grow the hash table capacity&quot;&quot;&quot;</span>
        <span class="hljs-comment"># احتفظ بإشارة إلى جدول التجزئة الأصلي</span>
        buckets = <span class="hljs-variable language_">self</span>.buckets
        <span class="hljs-comment"># مهّد جدول تجزئة جديدًا بالسعة الموسعة</span>
        <span class="hljs-variable language_">self</span>.capacity *= <span class="hljs-variable language_">self</span>.extend_ratio
        <span class="hljs-variable language_">self</span>.buckets = [[] <span class="hljs-keyword">for</span> _ <span class="hljs-keyword">in</span> <span class="hljs-built_in">range</span>(<span class="hljs-variable language_">self</span>.capacity)]
        <span class="hljs-variable language_">self</span>.size = <span class="hljs-number">0</span>
        <span class="hljs-comment"># انقل الثنائيات من جدول التجزئة الأصلي إلى الجديد</span>
        <span class="hljs-keyword">for</span> bucket <span class="hljs-keyword">in</span> buckets:
            <span class="hljs-keyword">for</span> pair <span class="hljs-keyword">in</span> bucket:
                <span class="hljs-variable language_">self</span>.put(pair.key, pair.val)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">print</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot;Print the hash table&quot;&quot;&quot;</span>
        <span class="hljs-keyword">for</span> bucket <span class="hljs-keyword">in</span> <span class="hljs-variable language_">self</span>.buckets:
            res = []
            <span class="hljs-keyword">for</span> pair <span class="hljs-keyword">in</span> bucket:
                res.append(<span class="hljs-built_in">str</span>(pair.key) + <span class="hljs-string">&quot; -&gt; &quot;</span> + pair.val)
            <span class="hljs-built_in">print</span>(res)
</code></pre>
</div>وتجدر الإشارة إلى أنه عندما تصبح القائمة المترابطة طويلة جداً، يكون زمن الاستعلام $O(n)$ ضعيفاً. **وفي هذه الحالة يمكن تحويل القائمة المترابطة إلى شجرة AVL أو شجرة حمراء-سوداء**، مما يقلل التعقيد الزمني لعمليات البحث إلى $O(\\log n)$.
<h2 id="العنونة-المفتوحة">العنونة المفتوحة</h2>
<p>لا تُدخل <u>العنونة المفتوحة</u> بنى بيانات إضافية. بل تعالج تصادمات التجزئة عبر الفحص المتكرر. وتشمل استراتيجيات الفحص الشائعة الفحص الخطي والفحص التربيعي والتجزئة المتعددة.</p>
<p>ولنأخذ الفحص الخطي مثالاً لتوضيح آلية جداول التجزئة بالعنونة المفتوحة.</p>
<h3 id="الفحص-الخطي">الفحص الخطي</h3>
<p>يستخدم الفحص الخطي خطوة ثابتة للفحص بالتتابع، لذا تختلف عملياته بعض الشيء عن عمليات جدول التجزئة العادي.</p>
<ul>
<li><strong>إدراج العناصر</strong>: احسب فهرس الدلو باستخدام دالة التجزئة. وإذا كان الدلو مشغولاً، فواصل الفحص إلى الأمام من موضع التصادم بخطوة ثابتة (عادةً <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>1</mn></mrow><annotation encoding="application/x-tex">1</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">1</span></span></span></span>) حتى تجد دلواً فارغاً، ثم أدرِج العنصر فيه.</li>
<li><strong>البحث عن العناصر</strong>: إذا حدث تصادم، فواصل الفحص إلى الأمام بالخطوة نفسها حتى تجد العنصر المقابل وأعِد <code>value</code> الخاص به؛ وإذا صادفت دلواً فارغاً، فالعنصر الهدف ليس في جدول التجزئة، لذا أعِد <code>None</code>.</li>
</ul>
<p>ويوضح الشكل أدناه توزيع أزواج المفتاح-القيمة في جدول تجزئة بالعنونة المفتوحة يستخدم الفحص الخطي. وفي ظل دالة التجزئة هذه، تُعيَّن المفاتيح ذات الرقمين الأخيرين المتشابهين إلى الدلو نفسه. ثم يضعها الفحص الخطي في ذلك الدلو والدلاء التالية له.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_hashing--hash_table_linear_probing.png" alt="توزيع أزواج المفتاح-القيمة في جدول تجزئة بالعنونة المفتوحة (الفحص الخطي)"></p>
<p>غير أن <strong>الفحص الخطي عرضة للتكتّل</strong>. وبشكل أدق، كلما طالت منطقة مشغولة متصلة في المصفوفة، زاد احتمال حدوث تصادمات جديدة داخل تلك المنطقة. ويؤدي ذلك بدوره إلى نمو التكتل أكثر فأكثر، ما يخلق حلقة مفرغة تُدهور تدريجياً كفاءة عمليات الإدراج والحذف والبحث والتحديث.</p>
<p>ومن المهم ملاحظة أنه <strong>لا يمكننا حذف العناصر مباشرةً من جدول تجزئة بالعنونة المفتوحة</strong>. فحذف عنصر ينشئ دلواً فارغاً <code>None</code> في المصفوفة. وأثناء البحث، بمجرد وصول الفحص الخطي إلى ذلك الدلو الفارغ فإنه يتوقف، ما يعني أن أي عناصر مخزّنة أبعد على مسار الفحص تصبح غير قابلة للوصول. ونتيجة لذلك، قد يستنتج البرنامج خطأً أن تلك العناصر غير موجودة، كما هو موضح في الشكل أدناه.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_hashing--hash_table_open_addressing_deletion.png" alt="مشكلات الاستعلام الناتجة عن الحذف في العنونة المفتوحة"></p>
<p>ولحل هذه المشكلة، يمكننا اعتماد <u>الحذف الكسول</u>: فبدلاً من إزالة عنصر من جدول التجزئة مباشرةً، <strong>نستخدم ثابتاً <code>TOMBSTONE</code> لوسم الدلو</strong>. وفي ظل هذه الآلية، يشير كل من <code>None</code> و<code>TOMBSTONE</code> إلى دلاء يمكنها استقبال أزواج المفتاح-القيمة. والفرق أن الفحص الخطي، عند مصادفته <code>TOMBSTONE</code>، يجب أن يواصل الفحص، لأن أزواج المفتاح-القيمة قد توجد أبعد على المسار.</p>
<p>غير أن <strong>الحذف الكسول قد يسرّع تدهور أداء جدول التجزئة</strong>. فكل عملية حذف تترك علامة خلفها، ومع نمو عدد مدخلات <code>TOMBSTONE</code>، يزداد زمن البحث أيضاً، لأن الفحص الخطي قد يحتاج إلى تجاوز عدة علامات حذف قبل إيجاد العنصر الهدف.</p>
<p>ولمعالجة ذلك، يمكننا تسجيل فهرس أول <code>TOMBSTONE</code> نصادفه أثناء الفحص الخطي وتبديل العنصر الهدف الذي عُثر عليه إلى ذلك الموضع. وتكمن الفائدة في أن كل استعلام أو إدراج يمكنه نقل العناصر أقرب إلى مواضعها المثالية، أي أقرب إلى نقطة بداية الفحص، مما يحسّن كفاءة البحث.</p>
<p>وتنفّذ الشيفرة أدناه جدول تجزئة بالعنونة المفتوحة (فحص خطي) مع الحذف الكسول. وللانتفاع بشكل أفضل بمساحة جدول التجزئة، نتعامل مع جدول التجزئة باعتباره «مصفوفة دائرية». وعند تجاوز نهاية المصفوفة، نعود إلى البداية ونواصل الاجتياز.</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py"><span class="hljs-keyword">class</span> <span class="hljs-title class_">HashMapOpenAddressing</span>:
    <span class="hljs-string">&quot;&quot;&quot;Hash table with open addressing&quot;&quot;&quot;</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot;Constructor&quot;&quot;&quot;</span>
        <span class="hljs-variable language_">self</span>.size = <span class="hljs-number">0</span>  <span class="hljs-comment"># عدد ثنائيات المفتاح-القيمة</span>
        <span class="hljs-variable language_">self</span>.capacity = <span class="hljs-number">4</span>  <span class="hljs-comment"># سعة جدول التجزئة</span>
        <span class="hljs-variable language_">self</span>.load_thres = <span class="hljs-number">2.0</span> / <span class="hljs-number">3.0</span>  <span class="hljs-comment"># عتبة عامل التحميل التي تطلق نموّ السعة</span>
        <span class="hljs-variable language_">self</span>.extend_ratio = <span class="hljs-number">2</span>  <span class="hljs-comment"># معامل نموّ السعة</span>
        <span class="hljs-variable language_">self</span>.buckets: <span class="hljs-built_in">list</span>[Pair | <span class="hljs-literal">None</span>] = [<span class="hljs-literal">None</span>] * <span class="hljs-variable language_">self</span>.capacity  <span class="hljs-comment"># مصفوفة السلال</span>
        <span class="hljs-variable language_">self</span>.TOMBSTONE = Pair(-<span class="hljs-number">1</span>, <span class="hljs-string">&quot;-1&quot;</span>)  <span class="hljs-comment"># علامة شاهد القبر</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">hash_func</span>(<span class="hljs-params">self, key: <span class="hljs-built_in">int</span></span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Hash function&quot;&quot;&quot;</span>
        <span class="hljs-keyword">return</span> key % <span class="hljs-variable language_">self</span>.capacity

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">load_factor</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">float</span>:
        <span class="hljs-string">&quot;&quot;&quot;Load factor&quot;&quot;&quot;</span>
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.size / <span class="hljs-variable language_">self</span>.capacity

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">find_bucket</span>(<span class="hljs-params">self, key: <span class="hljs-built_in">int</span></span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;Find the bucket index for key&quot;&quot;&quot;</span>
        index = <span class="hljs-variable language_">self</span>.hash_func(key)
        first_tombstone = -<span class="hljs-number">1</span>
        <span class="hljs-comment"># تتبّع خطيًا حتى تصل إلى سلة فارغة</span>
        <span class="hljs-keyword">while</span> <span class="hljs-variable language_">self</span>.buckets[index] <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> <span class="hljs-literal">None</span>:
            <span class="hljs-comment"># إذا وُجد key فأعد فهرس سلته</span>
            <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.buckets[index].key == key:
                <span class="hljs-comment"># إذا وُقفت في السابق على شاهد قبر، فانقل الثنائية إلى ذلك الفهرس</span>
                <span class="hljs-keyword">if</span> first_tombstone != -<span class="hljs-number">1</span>:
                    <span class="hljs-variable language_">self</span>.buckets[first_tombstone] = <span class="hljs-variable language_">self</span>.buckets[index]
                    <span class="hljs-variable language_">self</span>.buckets[index] = <span class="hljs-variable language_">self</span>.TOMBSTONE
                    <span class="hljs-keyword">return</span> first_tombstone  <span class="hljs-comment"># أعد فهرس السلة بعد النقل</span>
                <span class="hljs-keyword">return</span> index  <span class="hljs-comment"># أعد فهرس السلة</span>
            <span class="hljs-comment"># سجّل أول شاهد قبر تقابله</span>
            <span class="hljs-keyword">if</span> first_tombstone == -<span class="hljs-number">1</span> <span class="hljs-keyword">and</span> <span class="hljs-variable language_">self</span>.buckets[index] <span class="hljs-keyword">is</span> <span class="hljs-variable language_">self</span>.TOMBSTONE:
                first_tombstone = index
            <span class="hljs-comment"># احسب فهرس السلة مع الالتفاف إلى البداية بعد النهاية</span>
            index = (index + <span class="hljs-number">1</span>) % <span class="hljs-variable language_">self</span>.capacity
        <span class="hljs-comment"># إذا كان key غائبًا فأعد الفهرس المخصصة للإدراج</span>
        <span class="hljs-keyword">return</span> index <span class="hljs-keyword">if</span> first_tombstone == -<span class="hljs-number">1</span> <span class="hljs-keyword">else</span> first_tombstone

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">get</span>(<span class="hljs-params">self, key: <span class="hljs-built_in">int</span></span>) -&gt; <span class="hljs-built_in">str</span>:
        <span class="hljs-string">&quot;&quot;&quot;Lookup operation&quot;&quot;&quot;</span>
        <span class="hljs-comment"># أوجد فهرس سلة key</span>
        index = <span class="hljs-variable language_">self</span>.find_bucket(key)
        <span class="hljs-comment"># إذا وُجدت الثنائية فأعد val الخاص بها</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.buckets[index] <span class="hljs-keyword">not</span> <span class="hljs-keyword">in</span> [<span class="hljs-literal">None</span>, <span class="hljs-variable language_">self</span>.TOMBSTONE]:
            <span class="hljs-keyword">return</span> <span class="hljs-variable language_">self</span>.buckets[index].val
        <span class="hljs-comment"># أعد None إذا كانت الثنائية غائبة</span>
        <span class="hljs-keyword">return</span> <span class="hljs-literal">None</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">put</span>(<span class="hljs-params">self, key: <span class="hljs-built_in">int</span>, val: <span class="hljs-built_in">str</span></span>):
        <span class="hljs-string">&quot;&quot;&quot;Insert operation&quot;&quot;&quot;</span>
        <span class="hljs-comment"># زِد السعة عندما يتجاوز عامل التحميل العتبة</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.load_factor() &gt; <span class="hljs-variable language_">self</span>.load_thres:
            <span class="hljs-variable language_">self</span>.extend()
        <span class="hljs-comment"># أوجد فهرس سلة key</span>
        index = <span class="hljs-variable language_">self</span>.find_bucket(key)
        <span class="hljs-comment"># إذا وُجدت الثنائية فاكتب val فوقها وأعد</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.buckets[index] <span class="hljs-keyword">not</span> <span class="hljs-keyword">in</span> [<span class="hljs-literal">None</span>, <span class="hljs-variable language_">self</span>.TOMBSTONE]:
            <span class="hljs-variable language_">self</span>.buckets[index].val = val
            <span class="hljs-keyword">return</span>
        <span class="hljs-comment"># إذا كانت الثنائية غائبة فأدخلها</span>
        <span class="hljs-variable language_">self</span>.buckets[index] = Pair(key, val)
        <span class="hljs-variable language_">self</span>.size += <span class="hljs-number">1</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">remove</span>(<span class="hljs-params">self, key: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-string">&quot;&quot;&quot;Remove operation&quot;&quot;&quot;</span>
        <span class="hljs-comment"># أوجد فهرس سلة key</span>
        index = <span class="hljs-variable language_">self</span>.find_bucket(key)
        <span class="hljs-comment"># إذا وُجدت الثنائية فاستبدلها بشاهد قبر</span>
        <span class="hljs-keyword">if</span> <span class="hljs-variable language_">self</span>.buckets[index] <span class="hljs-keyword">not</span> <span class="hljs-keyword">in</span> [<span class="hljs-literal">None</span>, <span class="hljs-variable language_">self</span>.TOMBSTONE]:
            <span class="hljs-variable language_">self</span>.buckets[index] = <span class="hljs-variable language_">self</span>.TOMBSTONE
            <span class="hljs-variable language_">self</span>.size -= <span class="hljs-number">1</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">extend</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot;Grow the hash table capacity&quot;&quot;&quot;</span>
        <span class="hljs-comment"># احتفظ بإشارة إلى جدول التجزئة الأصلي</span>
        buckets_tmp = <span class="hljs-variable language_">self</span>.buckets
        <span class="hljs-comment"># مهّد جدول تجزئة جديدًا بالسعة الموسعة</span>
        <span class="hljs-variable language_">self</span>.capacity *= <span class="hljs-variable language_">self</span>.extend_ratio
        <span class="hljs-variable language_">self</span>.buckets = [<span class="hljs-literal">None</span>] * <span class="hljs-variable language_">self</span>.capacity
        <span class="hljs-variable language_">self</span>.size = <span class="hljs-number">0</span>
        <span class="hljs-comment"># انقل الثنائيات من جدول التجزئة الأصلي إلى الجديد</span>
        <span class="hljs-keyword">for</span> pair <span class="hljs-keyword">in</span> buckets_tmp:
            <span class="hljs-keyword">if</span> pair <span class="hljs-keyword">not</span> <span class="hljs-keyword">in</span> [<span class="hljs-literal">None</span>, <span class="hljs-variable language_">self</span>.TOMBSTONE]:
                <span class="hljs-variable language_">self</span>.put(pair.key, pair.val)

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">print</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot;Print the hash table&quot;&quot;&quot;</span>
        <span class="hljs-keyword">for</span> pair <span class="hljs-keyword">in</span> <span class="hljs-variable language_">self</span>.buckets:
            <span class="hljs-keyword">if</span> pair <span class="hljs-keyword">is</span> <span class="hljs-literal">None</span>:
                <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;None&quot;</span>)
            <span class="hljs-keyword">elif</span> pair <span class="hljs-keyword">is</span> <span class="hljs-variable language_">self</span>.TOMBSTONE:
                <span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;TOMBSTONE&quot;</span>)
            <span class="hljs-keyword">else</span>:
                <span class="hljs-built_in">print</span>(pair.key, <span class="hljs-string">&quot;-&gt;&quot;</span>, pair.val)
</code></pre>
</div>### الفحص التربيعي
<p>الفحص التربيعي مشابه للفحص الخطي، وهو إحدى الاستراتيجيات الشائعة للعنونة المفتوحة. فعند حدوث تصادم، لا يتخطى الفحص التربيعي ببساطة عدداً ثابتاً من الخطوات، بل يتخطى عدداً من الخطوات يساوي «مربع عدد عمليات الفحص»، أي <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>1</mn><mo separator="true">,</mo><mn>4</mn><mo separator="true">,</mo><mn>9</mn><mo separator="true">,</mo><mo>…</mo></mrow><annotation encoding="application/x-tex">1, 4, 9, \\dots</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.8389em;vertical-align:-0.1944em;"></span><span class="mord">1</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">4</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="mord">9</span><span class="mpunct">,</span><span class="mspace" style="margin-right:0.1667em;"></span><span class="minner">…</span></span></span></span> خطوة.</p>
<p>وللفحص التربيعي المزايا التالية:</p>
<ul>
<li>يحاول الفحص التربيعي تخفيف أثر التكتّل في الفحص الخطي عبر تخطي مسافات تساوي مربع عدد عمليات الفحص.</li>
<li>يتخطى الفحص التربيعي مسافات أكبر للعثور على مواضع فارغة، مما يساعد على توزيع البيانات بشكل أكثر توازناً.</li>
</ul>
<p>غير أن الفحص التربيعي ليس مثالياً:</p>
<ul>
<li>لا يزال التكتّل موجوداً، أي إن بعض المواضع أكثر عرضة للشغل من غيرها.</li>
<li>نظراً لنمو المربعات، قد لا يفحص الفحص التربيعي جدول التجزئة بأكمله، أي إنه قد لا يتمكن من الوصول إلى دلاء فارغة في جدول التجزئة حتى لو وُجدت.</li>
</ul>
<h3 id="التجزئة-المتعددة">التجزئة المتعددة</h3>
<p>كما يوحي الاسم، تستخدم التجزئة المتعددة دوال تجزئة متعددة <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>f</mi><mn>1</mn></msub><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">f_1(x)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.1076em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mopen">(</span><span class="mord mathnormal">x</span><span class="mclose">)</span></span></span></span>، <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>f</mi><mn>2</mn></msub><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">f_2(x)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.1076em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mopen">(</span><span class="mord mathnormal">x</span><span class="mclose">)</span></span></span></span>، <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>f</mi><mn>3</mn></msub><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">f_3(x)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.1076em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">3</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mopen">(</span><span class="mord mathnormal">x</span><span class="mclose">)</span></span></span></span>، <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mo>…</mo></mrow><annotation encoding="application/x-tex">\\dots</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.123em;"></span><span class="minner">…</span></span></span></span> للفحص.</p>
<ul>
<li><strong>إدراج العناصر</strong>: إذا صادفت دالة التجزئة <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>f</mi><mn>1</mn></msub><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">f_1(x)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.1076em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">1</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mopen">(</span><span class="mord mathnormal">x</span><span class="mclose">)</span></span></span></span> تعارضاً، فجرّب <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><msub><mi>f</mi><mn>2</mn></msub><mo stretchy="false">(</mo><mi>x</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">f_2(x)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord"><span class="mord mathnormal" style="margin-right:0.1076em;">f</span><span class="msupsub"><span class="vlist-t vlist-t2"><span class="vlist-r"><span class="vlist" style="height:0.3011em;"><span style="top:-2.55em;margin-left:-0.1076em;margin-right:0.05em;"><span class="pstrut" style="height:2.7em;"></span><span class="katex-sizing reset-size6 size3 mtight"><span class="mord mtight">2</span></span></span></span><span class="vlist-s">​</span></span><span class="vlist-r"><span class="vlist" style="height:0.15em;"><span></span></span></span></span></span></span><span class="mopen">(</span><span class="mord mathnormal">x</span><span class="mclose">)</span></span></span></span>، وهكذا، حتى يُعثر على موضع فارغ ويُدرَج العنصر.</li>
<li><strong>البحث عن العناصر</strong>: ابحث بالترتيب نفسه لدوال التجزئة حتى يُعثر على العنصر الهدف وتُعيده؛ وإذا صادفت موضعاً فارغاً أو استُنفدت جميع دوال التجزئة، فهذا يشير إلى أن العنصر ليس في جدول التجزئة، فأعِد <code>None</code>.</li>
</ul>
<p>وبالمقارنة مع الفحص الخطي، تقلّ احتمالية التكتّل في التجزئة المتعددة، لكن استخدام دوال تجزئة متعددة يضيف تكاليف حسابية إضافية.</p>
<div class="note">
<p>يرجى ملاحظة أن جداول التجزئة القائمة على العنونة المفتوحة، بما في ذلك الفحص الخطي والفحص التربيعي والتجزئة المتعددة، تواجه جميعاً مشكلة عدم إمكانية حذف العناصر مباشرةً.</p>
</div>
<h2 id="اختيار-لغات-البرمجة">اختيار لغات البرمجة</h2>
<p>تعتمد لغات البرمجة المختلفة استراتيجيات مختلفة لتنفيذ جداول التجزئة. وفيما يلي بعض الأمثلة:</p>
<ul>
<li>تستخدم Python العنونة المفتوحة. ويستخدم قاموس <code>dict</code> أعداداً شبه عشوائية للفحص.</li>
<li>تستخدم Java السلسلة المنفصلة. ومنذ JDK 1.8، عندما يبلغ طول المصفوفة في <code>HashMap</code> القيمة 64 ويبلغ طول قائمة مترابطة القيمة 8، تُحوَّل القائمة المترابطة إلى شجرة حمراء-سوداء لتحسين أداء البحث.</li>
<li>تستخدم Go السلسلة المنفصلة. وتنصّ Go على أن كل دلو يمكنه تخزين 8 أزواج مفتاح-قيمة على الأكثر، وإذا تجاوزت السعة ذلك، يُربط دلو فائض؛ وعندما تكثر الدلاء الفائضة، تُجرى عملية توسيع خاصة متساوية السعة لضمان الأداء.</li>
</ul>
`,c={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:e,html:t};export{s as book,a as chapter,n as chapterTitle,c as default,e as headings,t as html,l as slug,p as title};
