const s="hello-algo",a="chapter_hashing",n="التجزئة",l="hash_collision",p="تصادم التجزئة",e=[{depth:2,id:"السلسلة-المنفصلة",text:"السلسلة المنفصلة"},{depth:2,id:"العنونة-المفتوحة",text:"العنونة المفتوحة"},{depth:3,id:"الفحص-الخطي",text:"الفحص الخطي"},{depth:3,id:"الفحص-التربيعي",text:"الفحص التربيعي"},{depth:3,id:"التجزئة-المتعددة",text:"التجزئة المتعددة"},{depth:2,id:"اختيار-لغات-البرمجة",text:"اختيار لغات البرمجة"}],c=`<p>ذكر القسم السابق أنه، <strong>في معظم الحالات، تكون مساحة إدخال دالة التجزئة أكبر بكثير من مساحة إخراجها</strong>، لذا فإن تصادمات التجزئة حتمية نظرياً. فمثلاً، إذا كانت مساحة الإدخال جميع الأعداد الصحيحة وكانت مساحة الإخراج بحجم سعة المصفوفة، فستُعيَّن حتماً عدة أعداد صحيحة إلى فهرس الدلو نفسه.</p>
<p>وقد تؤدي تصادمات التجزئة إلى نتائج استعلام غير صحيحة، مما يؤثر تأثيراً شديداً في قابلية استخدام جدول التجزئة. ولمعالجة هذه المشكلة، يمكننا عند حدوث تصادم تجزئة إجراء توسيع لجدول التجزئة حتى يزول التصادم. وهذا النهج بسيط ومباشر وفعّال، لكنه غير فعّال إلى حد كبير لأن توسيع جدول التجزئة يتضمن قدراً كبيراً من نقل البيانات وإعادة حساب قيم التجزئة. ولتحسين الكفاءة، يمكننا اتباع الاستراتيجيات التالية:</p>
<ol>
<li>تحسين بنية بيانات جدول التجزئة بحيث <strong>يعمل جدول التجزئة بشكل طبيعي عند حدوث تصادمات تجزئة</strong>.</li>
<li>التوسيع عند الضرورة فقط، أي فقط عندما تكون تصادمات التجزئة شديدة.</li>
</ol>
<p>والطريقتان الرئيسيتان لتحسين بنية جدول التجزئة هما السلسلة المنفصلة والعنونة المفتوحة.</p>
<h2 id="السلسلة-المنفصلة">السلسلة المنفصلة</h2>
<p>في جدول التجزئة الأصلي، يمكن لكل دلو تخزين زوج مفتاح-قيمة واحد فقط. وتستبدل <u>السلسلة المنفصلة</u> العنصر الواحد في كل دلو بقائمة مترابطة، بمعالجة كل زوج مفتاح-قيمة كعقدة وتخزين جميع أزواج المفتاح-القيمة المتصادمة في القائمة نفسها. ويوضح الشكل أدناه مثالاً على جدول تجزئة بالسلسلة المنفصلة.</p>
<p><img src="/images/hello-algo/chapter_hashing--hash_table_chaining.png" alt="جدول تجزئة بالسلسلة المنفصلة"></p>
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
<li>يتضمن هذا التنفيذ دالة لتوسيع جدول التجزئة. فعندما يتجاوز معامل الحمولة $\\frac{2}{3}$، نوسّع جدول التجزئة إلى $2$ ضعف حجمه الأصلي.</li>
</ul>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* جدول تجزئة بالسلسلة المنفصلة */</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">HashMapChaining</span> {
    #<span class="hljs-attr">size</span>: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// عدد أزواج المفتاح-القيمة</span>
    #<span class="hljs-attr">capacity</span>: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// سعة جدول التجزئة</span>
    #<span class="hljs-attr">loadThres</span>: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// عتبة معامل الحمولة لتفعيل التوسيع</span>
    #<span class="hljs-attr">extendRatio</span>: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// مضاعف التوسيع</span>
    #<span class="hljs-attr">buckets</span>: <span class="hljs-title class_">Pair</span>[][]; <span class="hljs-comment">// مصفوفة الدلاء</span>

    <span class="hljs-comment">/* البانية */</span>
    <span class="hljs-title function_">constructor</span>(<span class="hljs-params"></span>) {
        <span class="hljs-variable language_">this</span>.#size = <span class="hljs-number">0</span>;
        <span class="hljs-variable language_">this</span>.#capacity = <span class="hljs-number">4</span>;
        <span class="hljs-variable language_">this</span>.#loadThres = <span class="hljs-number">2.0</span> / <span class="hljs-number">3.0</span>;
        <span class="hljs-variable language_">this</span>.#extendRatio = <span class="hljs-number">2</span>;
        <span class="hljs-variable language_">this</span>.#buckets = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Array</span>(<span class="hljs-variable language_">this</span>.#capacity).<span class="hljs-title function_">fill</span>(<span class="hljs-literal">null</span>).<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">x</span>) =&gt;</span> []);
    }

    <span class="hljs-comment">/* دالة التجزئة */</span>
    #<span class="hljs-title function_">hashFunc</span>(<span class="hljs-attr">key</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">number</span> {
        <span class="hljs-keyword">return</span> key % <span class="hljs-variable language_">this</span>.#capacity;
    }

    <span class="hljs-comment">/* معامل الحمولة */</span>
    #<span class="hljs-title function_">loadFactor</span>(): <span class="hljs-built_in">number</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.#size / <span class="hljs-variable language_">this</span>.#capacity;
    }

    <span class="hljs-comment">/* عملية الاستعلام */</span>
    <span class="hljs-title function_">get</span>(<span class="hljs-attr">key</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span> {
        <span class="hljs-keyword">const</span> index = <span class="hljs-variable language_">this</span>.#<span class="hljs-title function_">hashFunc</span>(key);
        <span class="hljs-keyword">const</span> bucket = <span class="hljs-variable language_">this</span>.#buckets[index];
        <span class="hljs-comment">// اجتز الدلو، وإذا وُجد key فأعِد val المقابل</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> pair <span class="hljs-keyword">of</span> bucket) {
            <span class="hljs-keyword">if</span> (pair.<span class="hljs-property">key</span> === key) {
                <span class="hljs-keyword">return</span> pair.<span class="hljs-property">val</span>;
            }
        }
        <span class="hljs-comment">// إذا لم يُعثر على key، أعِد null</span>
        <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
    }

    <span class="hljs-comment">/* عملية الإضافة */</span>
    <span class="hljs-title function_">put</span>(<span class="hljs-attr">key</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">val</span>: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">void</span> {
        <span class="hljs-comment">// عندما يتجاوز معامل الحمولة العتبة، نفّذ التوسيع</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.#<span class="hljs-title function_">loadFactor</span>() &gt; <span class="hljs-variable language_">this</span>.#loadThres) {
            <span class="hljs-variable language_">this</span>.#<span class="hljs-title function_">extend</span>();
        }
        <span class="hljs-keyword">const</span> index = <span class="hljs-variable language_">this</span>.#<span class="hljs-title function_">hashFunc</span>(key);
        <span class="hljs-keyword">const</span> bucket = <span class="hljs-variable language_">this</span>.#buckets[index];
        <span class="hljs-comment">// اجتز الدلو، وإذا صادفت key المحدد، فحدّث val المقابل وأعِد</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> pair <span class="hljs-keyword">of</span> bucket) {
            <span class="hljs-keyword">if</span> (pair.<span class="hljs-property">key</span> === key) {
                pair.<span class="hljs-property">val</span> = val;
                <span class="hljs-keyword">return</span>;
            }
        }
        <span class="hljs-comment">// إذا لم يكن key موجوداً، ألحق زوج المفتاح-القيمة بالنهاية</span>
        <span class="hljs-keyword">const</span> pair = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Pair</span>(key, val);
        bucket.<span class="hljs-title function_">push</span>(pair);
        <span class="hljs-variable language_">this</span>.#size++;
    }

    <span class="hljs-comment">/* عملية الحذف */</span>
    <span class="hljs-title function_">remove</span>(<span class="hljs-attr">key</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">void</span> {
        <span class="hljs-keyword">const</span> index = <span class="hljs-variable language_">this</span>.#<span class="hljs-title function_">hashFunc</span>(key);
        <span class="hljs-keyword">let</span> bucket = <span class="hljs-variable language_">this</span>.#buckets[index];
        <span class="hljs-comment">// اجتز الدلو واحذف زوج المفتاح-القيمة منه</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; bucket.<span class="hljs-property">length</span>; i++) {
            <span class="hljs-keyword">if</span> (bucket[i].<span class="hljs-property">key</span> === key) {
                bucket.<span class="hljs-title function_">splice</span>(i, <span class="hljs-number">1</span>);
                <span class="hljs-variable language_">this</span>.#size--;
                <span class="hljs-keyword">break</span>;
            }
        }
    }

    <span class="hljs-comment">/* توسيع جدول التجزئة */</span>
    #<span class="hljs-title function_">extend</span>(): <span class="hljs-built_in">void</span> {
        <span class="hljs-comment">// خزّن جدول التجزئة الأصلي مؤقتاً</span>
        <span class="hljs-keyword">const</span> bucketsTmp = <span class="hljs-variable language_">this</span>.#buckets;
        <span class="hljs-comment">// هيّئ جدول التجزئة الجديد الموسّع</span>
        <span class="hljs-variable language_">this</span>.#capacity *= <span class="hljs-variable language_">this</span>.#extendRatio;
        <span class="hljs-variable language_">this</span>.#buckets = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Array</span>(<span class="hljs-variable language_">this</span>.#capacity).<span class="hljs-title function_">fill</span>(<span class="hljs-literal">null</span>).<span class="hljs-title function_">map</span>(<span class="hljs-function">(<span class="hljs-params">x</span>) =&gt;</span> []);
        <span class="hljs-variable language_">this</span>.#size = <span class="hljs-number">0</span>;
        <span class="hljs-comment">// انقل أزواج المفتاح-القيمة من جدول التجزئة الأصلي إلى الجديد</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> bucket <span class="hljs-keyword">of</span> bucketsTmp) {
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> pair <span class="hljs-keyword">of</span> bucket) {
                <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">put</span>(pair.<span class="hljs-property">key</span>, pair.<span class="hljs-property">val</span>);
            }
        }
    }

    <span class="hljs-comment">/* طباعة جدول التجزئة */</span>
    <span class="hljs-title function_">print</span>(): <span class="hljs-built_in">void</span> {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> bucket <span class="hljs-keyword">of</span> <span class="hljs-variable language_">this</span>.#buckets) {
            <span class="hljs-keyword">let</span> res = [];
            <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> pair <span class="hljs-keyword">of</span> bucket) {
                res.<span class="hljs-title function_">push</span>(pair.<span class="hljs-property">key</span> + <span class="hljs-string">&#x27; -&gt; &#x27;</span> + pair.<span class="hljs-property">val</span>);
            }
            <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(res);
        }
    }
}
</code></pre>
</div>
<p>وتجدر الإشارة إلى أنه عندما تصبح القائمة المترابطة طويلة جداً، يكون زمن الاستعلام $O(n)$ ضعيفاً. <strong>وفي هذه الحالة يمكن تحويل القائمة المترابطة إلى شجرة AVL أو شجرة حمراء-سوداء</strong>، مما يقلل التعقيد الزمني لعمليات البحث إلى $O(\\log n)$.</p>
<h2 id="العنونة-المفتوحة">العنونة المفتوحة</h2>
<p>لا تُدخل <u>العنونة المفتوحة</u> بنى بيانات إضافية. بل تعالج تصادمات التجزئة عبر الفحص المتكرر. وتشمل استراتيجيات الفحص الشائعة الفحص الخطي والفحص التربيعي والتجزئة المتعددة.</p>
<p>ولنأخذ الفحص الخطي مثالاً لتوضيح آلية جداول التجزئة بالعنونة المفتوحة.</p>
<h3 id="الفحص-الخطي">الفحص الخطي</h3>
<p>يستخدم الفحص الخطي خطوة ثابتة للفحص بالتتابع، لذا تختلف عملياته بعض الشيء عن عمليات جدول التجزئة العادي.</p>
<ul>
<li><strong>إدراج العناصر</strong>: احسب فهرس الدلو باستخدام دالة التجزئة. وإذا كان الدلو مشغولاً، فواصل الفحص إلى الأمام من موضع التصادم بخطوة ثابتة (عادةً $1$) حتى تجد دلواً فارغاً، ثم أدرِج العنصر فيه.</li>
<li><strong>البحث عن العناصر</strong>: إذا حدث تصادم، فواصل الفحص إلى الأمام بالخطوة نفسها حتى تجد العنصر المقابل وأعِد <code>value</code> الخاص به؛ وإذا صادفت دلواً فارغاً، فالعنصر الهدف ليس في جدول التجزئة، لذا أعِد <code>None</code>.</li>
</ul>
<p>ويوضح الشكل أدناه توزيع أزواج المفتاح-القيمة في جدول تجزئة بالعنونة المفتوحة يستخدم الفحص الخطي. وفي ظل دالة التجزئة هذه، تُعيَّن المفاتيح ذات الرقمين الأخيرين المتشابهين إلى الدلو نفسه. ثم يضعها الفحص الخطي في ذلك الدلو والدلاء التالية له.</p>
<p><img src="/images/hello-algo/chapter_hashing--hash_table_linear_probing.png" alt="توزيع أزواج المفتاح-القيمة في جدول تجزئة بالعنونة المفتوحة (الفحص الخطي)"></p>
<p>غير أن <strong>الفحص الخطي عرضة للتكتّل</strong>. وبشكل أدق، كلما طالت منطقة مشغولة متصلة في المصفوفة، زاد احتمال حدوث تصادمات جديدة داخل تلك المنطقة. ويؤدي ذلك بدوره إلى نمو التكتل أكثر فأكثر، ما يخلق حلقة مفرغة تُدهور تدريجياً كفاءة عمليات الإدراج والحذف والبحث والتحديث.</p>
<p>ومن المهم ملاحظة أنه <strong>لا يمكننا حذف العناصر مباشرةً من جدول تجزئة بالعنونة المفتوحة</strong>. فحذف عنصر ينشئ دلواً فارغاً <code>None</code> في المصفوفة. وأثناء البحث، بمجرد وصول الفحص الخطي إلى ذلك الدلو الفارغ فإنه يتوقف، ما يعني أن أي عناصر مخزّنة أبعد على مسار الفحص تصبح غير قابلة للوصول. ونتيجة لذلك، قد يستنتج البرنامج خطأً أن تلك العناصر غير موجودة، كما هو موضح في الشكل أدناه.</p>
<p><img src="/images/hello-algo/chapter_hashing--hash_table_open_addressing_deletion.png" alt="مشكلات الاستعلام الناتجة عن الحذف في العنونة المفتوحة"></p>
<p>ولحل هذه المشكلة، يمكننا اعتماد <u>الحذف الكسول</u>: فبدلاً من إزالة عنصر من جدول التجزئة مباشرةً، <strong>نستخدم ثابتاً <code>TOMBSTONE</code> لوسم الدلو</strong>. وفي ظل هذه الآلية، يشير كل من <code>None</code> و<code>TOMBSTONE</code> إلى دلاء يمكنها استقبال أزواج المفتاح-القيمة. والفرق أن الفحص الخطي، عند مصادفته <code>TOMBSTONE</code>، يجب أن يواصل الفحص، لأن أزواج المفتاح-القيمة قد توجد أبعد على المسار.</p>
<p>غير أن <strong>الحذف الكسول قد يسرّع تدهور أداء جدول التجزئة</strong>. فكل عملية حذف تترك علامة خلفها، ومع نمو عدد مدخلات <code>TOMBSTONE</code>، يزداد زمن البحث أيضاً، لأن الفحص الخطي قد يحتاج إلى تجاوز عدة علامات حذف قبل إيجاد العنصر الهدف.</p>
<p>ولمعالجة ذلك، يمكننا تسجيل فهرس أول <code>TOMBSTONE</code> نصادفه أثناء الفحص الخطي وتبديل العنصر الهدف الذي عُثر عليه إلى ذلك الموضع. وتكمن الفائدة في أن كل استعلام أو إدراج يمكنه نقل العناصر أقرب إلى مواضعها المثالية، أي أقرب إلى نقطة بداية الفحص، مما يحسّن كفاءة البحث.</p>
<p>وتنفّذ الشيفرة أدناه جدول تجزئة بالعنونة المفتوحة (فحص خطي) مع الحذف الكسول. وللانتفاع بشكل أفضل بمساحة جدول التجزئة، نتعامل مع جدول التجزئة باعتباره «مصفوفة دائرية». وعند تجاوز نهاية المصفوفة، نعود إلى البداية ونواصل الاجتياز.</p>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* جدول تجزئة بالعنونة المفتوحة */</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">HashMapOpenAddressing</span> {
    <span class="hljs-keyword">private</span> <span class="hljs-attr">size</span>: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// عدد أزواج المفتاح-القيمة</span>
    <span class="hljs-keyword">private</span> <span class="hljs-attr">capacity</span>: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// سعة جدول التجزئة</span>
    <span class="hljs-keyword">private</span> <span class="hljs-attr">loadThres</span>: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// عتبة معامل الحمولة لتفعيل التوسيع</span>
    <span class="hljs-keyword">private</span> <span class="hljs-attr">extendRatio</span>: <span class="hljs-built_in">number</span>; <span class="hljs-comment">// مضاعف التوسيع</span>
    <span class="hljs-keyword">private</span> <span class="hljs-attr">buckets</span>: <span class="hljs-title class_">Array</span>&lt;<span class="hljs-title class_">Pair</span> | <span class="hljs-literal">null</span>&gt;; <span class="hljs-comment">// مصفوفة الدلاء</span>
    <span class="hljs-keyword">private</span> <span class="hljs-attr">TOMBSTONE</span>: <span class="hljs-title class_">Pair</span>; <span class="hljs-comment">// علامة الحذف</span>

    <span class="hljs-comment">/* البانية */</span>
    <span class="hljs-title function_">constructor</span>(<span class="hljs-params"></span>) {
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">size</span> = <span class="hljs-number">0</span>; <span class="hljs-comment">// عدد أزواج المفتاح-القيمة</span>
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">capacity</span> = <span class="hljs-number">4</span>; <span class="hljs-comment">// سعة جدول التجزئة</span>
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">loadThres</span> = <span class="hljs-number">2.0</span> / <span class="hljs-number">3.0</span>; <span class="hljs-comment">// عتبة معامل الحمولة لتفعيل التوسيع</span>
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">extendRatio</span> = <span class="hljs-number">2</span>; <span class="hljs-comment">// مضاعف التوسيع</span>
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span> = <span class="hljs-title class_">Array</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">capacity</span>).<span class="hljs-title function_">fill</span>(<span class="hljs-literal">null</span>); <span class="hljs-comment">// مصفوفة الدلاء</span>
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">TOMBSTONE</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Pair</span>(-<span class="hljs-number">1</span>, <span class="hljs-string">&#x27;-1&#x27;</span>); <span class="hljs-comment">// علامة الحذف</span>
    }

    <span class="hljs-comment">/* دالة التجزئة */</span>
    <span class="hljs-keyword">private</span> <span class="hljs-title function_">hashFunc</span>(<span class="hljs-attr">key</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">number</span> {
        <span class="hljs-keyword">return</span> key % <span class="hljs-variable language_">this</span>.<span class="hljs-property">capacity</span>;
    }

    <span class="hljs-comment">/* معامل الحمولة */</span>
    <span class="hljs-keyword">private</span> <span class="hljs-title function_">loadFactor</span>(): <span class="hljs-built_in">number</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">size</span> / <span class="hljs-variable language_">this</span>.<span class="hljs-property">capacity</span>;
    }

    <span class="hljs-comment">/* ابحث عن فهرس الدلو المقابل لـ key */</span>
    <span class="hljs-keyword">private</span> <span class="hljs-title function_">findBucket</span>(<span class="hljs-attr">key</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">number</span> {
        <span class="hljs-keyword">let</span> index = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">hashFunc</span>(key);
        <span class="hljs-keyword">let</span> firstTombstone = -<span class="hljs-number">1</span>;
        <span class="hljs-comment">// فحص خطي، توقف عند مصادفة دلو فارغ</span>
        <span class="hljs-keyword">while</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>[index] !== <span class="hljs-literal">null</span>) {
            <span class="hljs-comment">// إذا صادفت key، فأعِد فهرس الدلو المقابل</span>
            <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>[index]!.<span class="hljs-property">key</span> === key) {
                <span class="hljs-comment">// إذا صادفت علامة حذف سابقاً، فانقل زوج المفتاح-القيمة إلى ذلك الفهرس</span>
                <span class="hljs-keyword">if</span> (firstTombstone !== -<span class="hljs-number">1</span>) {
                    <span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>[firstTombstone] = <span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>[index];
                    <span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>[index] = <span class="hljs-variable language_">this</span>.<span class="hljs-property">TOMBSTONE</span>;
                    <span class="hljs-keyword">return</span> firstTombstone; <span class="hljs-comment">// أعِد فهرس الدلو المنقول</span>
                }
                <span class="hljs-keyword">return</span> index; <span class="hljs-comment">// أعِد فهرس الدلو</span>
            }
            <span class="hljs-comment">// سجّل أول علامة حذف تُصادفها</span>
            <span class="hljs-keyword">if</span> (
                firstTombstone === -<span class="hljs-number">1</span> &amp;&amp;
                <span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>[index] === <span class="hljs-variable language_">this</span>.<span class="hljs-property">TOMBSTONE</span>
            ) {
                firstTombstone = index;
            }
            <span class="hljs-comment">// احسب فهرس الدلو، وعُد إلى الرأس إذا تجاوزت الذيل</span>
            index = (index + <span class="hljs-number">1</span>) % <span class="hljs-variable language_">this</span>.<span class="hljs-property">capacity</span>;
        }
        <span class="hljs-comment">// إذا لم يكن key موجوداً، فأعِد فهرس الإدراج</span>
        <span class="hljs-keyword">return</span> firstTombstone === -<span class="hljs-number">1</span> ? index : firstTombstone;
    }

    <span class="hljs-comment">/* عملية الاستعلام */</span>
    <span class="hljs-title function_">get</span>(<span class="hljs-attr">key</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span> {
        <span class="hljs-comment">// ابحث عن فهرس الدلو المقابل لـ key</span>
        <span class="hljs-keyword">const</span> index = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">findBucket</span>(key);
        <span class="hljs-comment">// إذا وُجد زوج المفتاح-القيمة، فأعِد val المقابل</span>
        <span class="hljs-keyword">if</span> (
            <span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>[index] !== <span class="hljs-literal">null</span> &amp;&amp;
            <span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>[index] !== <span class="hljs-variable language_">this</span>.<span class="hljs-property">TOMBSTONE</span>
        ) {
            <span class="hljs-keyword">return</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>[index]!.<span class="hljs-property">val</span>;
        }
        <span class="hljs-comment">// إذا لم يكن زوج المفتاح-القيمة موجوداً، فأعِد null</span>
        <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
    }

    <span class="hljs-comment">/* عملية الإضافة */</span>
    <span class="hljs-title function_">put</span>(<span class="hljs-attr">key</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">val</span>: <span class="hljs-built_in">string</span>): <span class="hljs-built_in">void</span> {
        <span class="hljs-comment">// عندما يتجاوز معامل الحمولة العتبة، نفّذ التوسيع</span>
        <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-title function_">loadFactor</span>() &gt; <span class="hljs-variable language_">this</span>.<span class="hljs-property">loadThres</span>) {
            <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">extend</span>();
        }
        <span class="hljs-comment">// ابحث عن فهرس الدلو المقابل لـ key</span>
        <span class="hljs-keyword">const</span> index = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">findBucket</span>(key);
        <span class="hljs-comment">// إذا وُجد زوج المفتاح-القيمة، فاكتب فوق val وأعِد</span>
        <span class="hljs-keyword">if</span> (
            <span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>[index] !== <span class="hljs-literal">null</span> &amp;&amp;
            <span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>[index] !== <span class="hljs-variable language_">this</span>.<span class="hljs-property">TOMBSTONE</span>
        ) {
            <span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>[index]!.<span class="hljs-property">val</span> = val;
            <span class="hljs-keyword">return</span>;
        }
        <span class="hljs-comment">// إذا لم يكن زوج المفتاح-القيمة موجوداً، فأضف زوج المفتاح-القيمة</span>
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>[index] = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Pair</span>(key, val);
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">size</span>++;
    }

    <span class="hljs-comment">/* عملية الحذف */</span>
    <span class="hljs-title function_">remove</span>(<span class="hljs-attr">key</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">void</span> {
        <span class="hljs-comment">// ابحث عن فهرس الدلو المقابل لـ key</span>
        <span class="hljs-keyword">const</span> index = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">findBucket</span>(key);
        <span class="hljs-comment">// إذا وُجد زوج المفتاح-القيمة، فاكتب فوقه علامة الحذف</span>
        <span class="hljs-keyword">if</span> (
            <span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>[index] !== <span class="hljs-literal">null</span> &amp;&amp;
            <span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>[index] !== <span class="hljs-variable language_">this</span>.<span class="hljs-property">TOMBSTONE</span>
        ) {
            <span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>[index] = <span class="hljs-variable language_">this</span>.<span class="hljs-property">TOMBSTONE</span>;
            <span class="hljs-variable language_">this</span>.<span class="hljs-property">size</span>--;
        }
    }

    <span class="hljs-comment">/* توسيع جدول التجزئة */</span>
    <span class="hljs-keyword">private</span> <span class="hljs-title function_">extend</span>(): <span class="hljs-built_in">void</span> {
        <span class="hljs-comment">// خزّن جدول التجزئة الأصلي مؤقتاً</span>
        <span class="hljs-keyword">const</span> bucketsTmp = <span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>;
        <span class="hljs-comment">// هيّئ جدول التجزئة الجديد الموسّع</span>
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">capacity</span> *= <span class="hljs-variable language_">this</span>.<span class="hljs-property">extendRatio</span>;
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span> = <span class="hljs-title class_">Array</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">capacity</span>).<span class="hljs-title function_">fill</span>(<span class="hljs-literal">null</span>);
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">size</span> = <span class="hljs-number">0</span>;
        <span class="hljs-comment">// انقل أزواج المفتاح-القيمة من جدول التجزئة الأصلي إلى الجديد</span>
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> pair <span class="hljs-keyword">of</span> bucketsTmp) {
            <span class="hljs-keyword">if</span> (pair !== <span class="hljs-literal">null</span> &amp;&amp; pair !== <span class="hljs-variable language_">this</span>.<span class="hljs-property">TOMBSTONE</span>) {
                <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">put</span>(pair.<span class="hljs-property">key</span>, pair.<span class="hljs-property">val</span>);
            }
        }
    }

    <span class="hljs-comment">/* طباعة جدول التجزئة */</span>
    <span class="hljs-title function_">print</span>(): <span class="hljs-built_in">void</span> {
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> pair <span class="hljs-keyword">of</span> <span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>) {
            <span class="hljs-keyword">if</span> (pair === <span class="hljs-literal">null</span>) {
                <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;null&#x27;</span>);
            } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (pair === <span class="hljs-variable language_">this</span>.<span class="hljs-property">TOMBSTONE</span>) {
                <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;TOMBSTONE&#x27;</span>);
            } <span class="hljs-keyword">else</span> {
                <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(pair.<span class="hljs-property">key</span> + <span class="hljs-string">&#x27; -&gt; &#x27;</span> + pair.<span class="hljs-property">val</span>);
            }
        }
    }
}
</code></pre>
</div>
<h3 id="الفحص-التربيعي">الفحص التربيعي</h3>
<p>الفحص التربيعي مشابه للفحص الخطي، وهو إحدى الاستراتيجيات الشائعة للعنونة المفتوحة. فعند حدوث تصادم، لا يتخطى الفحص التربيعي ببساطة عدداً ثابتاً من الخطوات، بل يتخطى عدداً من الخطوات يساوي «مربع عدد عمليات الفحص»، أي $1, 4, 9, \\dots$ خطوة.</p>
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
<p>كما يوحي الاسم، تستخدم التجزئة المتعددة دوال تجزئة متعددة $f_1(x)$، $f_2(x)$، $f_3(x)$، $\\dots$ للفحص.</p>
<ul>
<li><strong>إدراج العناصر</strong>: إذا صادفت دالة التجزئة $f_1(x)$ تعارضاً، فجرّب $f_2(x)$، وهكذا، حتى يُعثر على موضع فارغ ويُدرَج العنصر.</li>
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
`,t={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:e,html:c};export{s as book,a as chapter,n as chapterTitle,t as default,e as headings,c as html,l as slug,p as title};
