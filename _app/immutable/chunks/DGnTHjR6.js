const s="hello-algo",a="chapter_hashing",n="التجزئة",l="hash_map",p="جدول التجزئة",e=[{depth:2,id:"العمليات-الشائعة-على-جدول-التجزئة",text:"العمليات الشائعة على جدول التجزئة"},{depth:2,id:"تنفيذ-بسيط-لجدول-التجزئة",text:"تنفيذ بسيط لجدول التجزئة"},{depth:2,id:"تصادم-التجزئة-وإعادة-التحجيم",text:"تصادم التجزئة وإعادة التحجيم"}],c=`<p><u>جدول التجزئة</u> (hash table)، المعروف أيضاً بـ<u>خريطة التجزئة</u> (hash map)، يخزّن ارتباطات من المفاتيح <code>key</code> إلى القيم <code>value</code>، مما يتيح عمليات بحث فعّالة. وتحديداً، عند إعطاء مفتاح <code>key</code>، يمكننا استرجاع القيمة المقابلة <code>value</code> من جدول التجزئة في زمن $O(1)$.</p>
<p>وكما يوضح الشكل أدناه، لنفترض أن لدينا $n$ طالباً، ولكل طالب معلومتان: الاسم ورقم الهوية. وإذا أردنا دعم الاستعلام «أعطِ رقم الهوية وأعد الاسم المقابل»، فيمكننا استخدام جدول التجزئة الموضح أدناه.</p>
<p><img src="/images/hello-algo/chapter_hashing--hash_table_lookup.png" alt="تمثيل مجرد لجدول التجزئة"></p>
<p>إلى جانب جداول التجزئة، يمكن للمصفوفات والقوائم المترابطة أيضاً تنفيذ وظيفة الاستعلام. وتُعرض مقارنة كفاءتها في الجدول التالي.</p>
<ul>
<li><strong>إضافة العناصر</strong>: ما عليك سوى إضافة العناصر إلى نهاية المصفوفة (القائمة المترابطة)، وهو ما يستغرق زمن $O(1)$.</li>
<li><strong>الاستعلام عن العناصر</strong>: بما أن المصفوفة (القائمة المترابطة) غير مرتبة، يلزم اجتياز جميع العناصر، وهو ما يستغرق زمن $O(n)$.</li>
<li><strong>حذف العناصر</strong>: يجب أولاً تحديد موقع العنصر، ثم حذفه من المصفوفة (القائمة المترابطة)، وهو ما يستغرق زمن $O(n)$.</li>
</ul>
<p align="center"> جدول <id> &nbsp; مقارنة كفاءة الاستعلام عن العناصر </p>
<table>
<thead>
<tr>
<th></th>
<th>المصفوفة</th>
<th>القائمة المترابطة</th>
<th>جدول التجزئة</th>
</tr>
</thead>
<tbody>
<tr>
<td>العثور على عنصر</td>
<td>$O(n)$</td>
<td>$O(n)$</td>
<td>$O(1)$</td>
</tr>
<tr>
<td>إضافة عنصر</td>
<td>$O(1)$</td>
<td>$O(1)$</td>
<td>$O(1)$</td>
</tr>
<tr>
<td>حذف عنصر</td>
<td>$O(n)$</td>
<td>$O(n)$</td>
<td>$O(1)$</td>
</tr>
</tbody>
</table>
<p>وكما نرى، <strong>فإن عمليات الإدراج والحذف والبحث والتحديث في جدول التجزئة جميعها بتعقيد زمني $O(1)$</strong>، مما يجعل جداول التجزئة عالية الكفاءة.</p>
<h2 id="العمليات-الشائعة-على-جدول-التجزئة">العمليات الشائعة على جدول التجزئة</h2>
<p>تشمل العمليات الشائعة على جداول التجزئة: التهيئة، وعمليات الاستعلام، وإضافة أزواج المفتاح-القيمة، وحذف أزواج المفتاح-القيمة. وتظهر الشيفرة المثالية أدناه:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* تهيئة جدول التجزئة */</span>
hmap := <span class="hljs-built_in">make</span>(<span class="hljs-keyword">map</span>[<span class="hljs-type">int</span>]<span class="hljs-type">string</span>)

<span class="hljs-comment">/* عملية الإضافة */</span>
<span class="hljs-comment">// أضف زوج المفتاح-القيمة (key, value) إلى جدول التجزئة</span>
hmap[<span class="hljs-number">12836</span>] = <span class="hljs-string">&quot;XiaoHa&quot;</span>
hmap[<span class="hljs-number">15937</span>] = <span class="hljs-string">&quot;XiaoLuo&quot;</span>
hmap[<span class="hljs-number">16750</span>] = <span class="hljs-string">&quot;XiaoSuan&quot;</span>
hmap[<span class="hljs-number">13276</span>] = <span class="hljs-string">&quot;XiaoFa&quot;</span>
hmap[<span class="hljs-number">10583</span>] = <span class="hljs-string">&quot;XiaoYa&quot;</span>

<span class="hljs-comment">/* عملية الاستعلام */</span>
<span class="hljs-comment">// أدخل المفتاح إلى جدول التجزئة للحصول على القيمة</span>
name := hmap[<span class="hljs-number">15937</span>]

<span class="hljs-comment">/* عملية الحذف */</span>
<span class="hljs-comment">// احذف زوج المفتاح-القيمة (key, value) من جدول التجزئة</span>
<span class="hljs-built_in">delete</span>(hmap, <span class="hljs-number">10583</span>)
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-typescript"><span class="hljs-comment">/* تهيئة جدول التجزئة */</span>
<span class="hljs-keyword">const</span> map = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Map</span>&lt;<span class="hljs-built_in">number</span>, <span class="hljs-built_in">string</span>&gt;();
<span class="hljs-comment">/* عملية الإضافة */</span>
<span class="hljs-comment">// أضف زوج المفتاح-القيمة (key, value) إلى جدول التجزئة</span>
map.<span class="hljs-title function_">set</span>(<span class="hljs-number">12836</span>, <span class="hljs-string">&#x27;XiaoHa&#x27;</span>);
map.<span class="hljs-title function_">set</span>(<span class="hljs-number">15937</span>, <span class="hljs-string">&#x27;XiaoLuo&#x27;</span>);
map.<span class="hljs-title function_">set</span>(<span class="hljs-number">16750</span>, <span class="hljs-string">&#x27;XiaoSuan&#x27;</span>);
map.<span class="hljs-title function_">set</span>(<span class="hljs-number">13276</span>, <span class="hljs-string">&#x27;XiaoFa&#x27;</span>);
map.<span class="hljs-title function_">set</span>(<span class="hljs-number">10583</span>, <span class="hljs-string">&#x27;XiaoYa&#x27;</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">info</span>(<span class="hljs-string">&#x27;\\nAfter adding, hash table is\\nKey -&gt; Value&#x27;</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">info</span>(map);

<span class="hljs-comment">/* عملية الاستعلام */</span>
<span class="hljs-comment">// أدخل المفتاح إلى جدول التجزئة للحصول على القيمة</span>
<span class="hljs-keyword">let</span> name = map.<span class="hljs-title function_">get</span>(<span class="hljs-number">15937</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">info</span>(<span class="hljs-string">&#x27;\\nInput student ID 15937, queried name &#x27;</span> + name);

<span class="hljs-comment">/* عملية الحذف */</span>
<span class="hljs-comment">// احذف زوج المفتاح-القيمة (key, value) من جدول التجزئة</span>
map.<span class="hljs-title function_">delete</span>(<span class="hljs-number">10583</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">info</span>(<span class="hljs-string">&#x27;\\nAfter deleting 10583, hash table is\\nKey -&gt; Value&#x27;</span>);
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">info</span>(map);
</code></pre>
</div>
<p>هناك ثلاث طرق شائعة لاجتياز جدول التجزئة: اجتياز أزواج المفتاح-القيمة، واجتياز المفاتيح، واجتياز القيم. وتظهر الشيفرة المثالية أدناه:</p>
<div class="lang-tab">
<p class="lang-tab__label">Go</p>
<pre><code class="language-go"><span class="hljs-comment">/* اجتياز جدول التجزئة */</span>
<span class="hljs-comment">// اجتَز أزواج المفتاح-القيمة key-&gt;value</span>
<span class="hljs-keyword">for</span> key, value := <span class="hljs-keyword">range</span> hmap {
    fmt.Println(key, <span class="hljs-string">&quot;-&gt;&quot;</span>, value)
}
<span class="hljs-comment">// اجتَز المفاتيح فقط</span>
<span class="hljs-keyword">for</span> key := <span class="hljs-keyword">range</span> hmap {
    fmt.Println(key)
}
<span class="hljs-comment">// اجتَز القيم فقط</span>
<span class="hljs-keyword">for</span> _, value := <span class="hljs-keyword">range</span> hmap {
    fmt.Println(value)
}
</code></pre>
</div>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-typescript"><span class="hljs-comment">/* اجتياز جدول التجزئة */</span>
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">info</span>(<span class="hljs-string">&#x27;\\nTraverse key-value pairs Key-&gt;Value&#x27;</span>);
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> [k, v] <span class="hljs-keyword">of</span> map.<span class="hljs-title function_">entries</span>()) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">info</span>(k + <span class="hljs-string">&#x27; -&gt; &#x27;</span> + v);
}
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">info</span>(<span class="hljs-string">&#x27;\\nTraverse keys only Key&#x27;</span>);
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> k <span class="hljs-keyword">of</span> map.<span class="hljs-title function_">keys</span>()) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">info</span>(k);
}
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">info</span>(<span class="hljs-string">&#x27;\\nTraverse values only Value&#x27;</span>);
<span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> v <span class="hljs-keyword">of</span> map.<span class="hljs-title function_">values</span>()) {
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">info</span>(v);
}
</code></pre>
</div>
<h2 id="تنفيذ-بسيط-لجدول-التجزئة">تنفيذ بسيط لجدول التجزئة</h2>
<p>لنبدأ بأبسط حالة: <strong>تنفيذ جدول تجزئة بمصفوفة فقط</strong>. في جدول التجزئة، تسمى كل خانة فارغة في المصفوفة <u>دلواً</u> (bucket)، ويمكن لكل دلو تخزين زوج مفتاح-قيمة واحد. لذا يتلخّص البحث في إيجاد الدلو الخاص بالمفتاح <code>key</code> وقراءة القيمة <code>value</code> المخزنة فيه.</p>
<p>فكيف نجد الدلو الصحيح لمفتاح <code>key</code> معطى؟ نفعل ذلك باستخدام <u>دالة التجزئة</u> (hash function). فدالة التجزئة تربط فضاء إدخال أكبر بفضاء إخراج أصغر. وفي جدول التجزئة، يكون فضاء الإدخال هو مجموعة جميع المفاتيح <code>key</code>، وفضاء الإخراج هو مجموعة جميع الدلاء (فهارس المصفوفة). بعبارة أخرى، عند إعطاء <code>key</code>، <strong>تخبرنا دالة التجزئة بمكان تخزين زوج المفتاح-القيمة المقابل في المصفوفة</strong>.</p>
<p>وبالنسبة إلى <code>key</code> معطى، يتضمن حساب فهرس الدلو الخطوتين التاليتين:</p>
<ol>
<li>استخدم خوارزمية تجزئة <code>hash()</code> لحساب قيمة تجزئة.</li>
<li>خذ باقي قسمة قيمة التجزئة على عدد الدلاء (طول المصفوفة) <code>capacity</code> للحصول على الدلو (فهرس المصفوفة) <code>index</code> المقابل للمفتاح <code>key</code>.</li>
</ol>
<pre><code class="language-shell">index = hash(key) % capacity
</code></pre>
<p>وبعد ذلك يمكننا استخدام <code>index</code> للوصول إلى الدلو المقابل في جدول التجزئة واسترجاع القيمة <code>value</code>.</p>
<p>لنفترض أن طول المصفوفة هو <code>capacity = 100</code> وأن خوارزمية التجزئة هي <code>hash(key) = key</code>. فحينئذٍ تكون دالة التجزئة هي <code>key % 100</code>. ويوضح الشكل أدناه كيفية عمل دالة التجزئة هذه، باستخدام رقم الهوية مفتاحاً <code>key</code> والاسم قيمةً <code>value</code>.</p>
<p><img src="/images/hello-algo/chapter_hashing--hash_function.png" alt="مبدأ عمل دالة التجزئة"></p>
<p>تنفّذ الشيفرة التالية جدول تجزئة بسيطاً. وهنا نغلّف <code>key</code> و<code>value</code> في فئة <code>Pair</code> لتمثيل زوج مفتاح-قيمة.</p>
<div class="lang-tab">
<p class="lang-tab__label">TypeScript</p>
<pre><code class="language-ts"><span class="hljs-comment">/* جدول تجزئة بتنفيذ قائم على مصفوفة */</span>
<span class="hljs-keyword">class</span> <span class="hljs-title class_">ArrayHashMap</span> {
    <span class="hljs-keyword">private</span> <span class="hljs-keyword">readonly</span> <span class="hljs-attr">buckets</span>: (<span class="hljs-title class_">Pair</span> | <span class="hljs-literal">null</span>)[];

    <span class="hljs-title function_">constructor</span>(<span class="hljs-params"></span>) {
        <span class="hljs-comment">// هيّئ مصفوفة بـ 100 دلو</span>
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Array</span>(<span class="hljs-number">100</span>).<span class="hljs-title function_">fill</span>(<span class="hljs-literal">null</span>);
    }

    <span class="hljs-comment">/* دالة التجزئة */</span>
    <span class="hljs-keyword">private</span> <span class="hljs-title function_">hashFunc</span>(<span class="hljs-attr">key</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">number</span> {
        <span class="hljs-keyword">return</span> key % <span class="hljs-number">100</span>;
    }

    <span class="hljs-comment">/* عملية الاستعلام */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-title function_">get</span>(<span class="hljs-attr">key</span>: <span class="hljs-built_in">number</span>): <span class="hljs-built_in">string</span> | <span class="hljs-literal">null</span> {
        <span class="hljs-keyword">let</span> index = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">hashFunc</span>(key);
        <span class="hljs-keyword">let</span> pair = <span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>[index];
        <span class="hljs-keyword">if</span> (pair === <span class="hljs-literal">null</span>) <span class="hljs-keyword">return</span> <span class="hljs-literal">null</span>;
        <span class="hljs-keyword">return</span> pair.<span class="hljs-property">val</span>;
    }

    <span class="hljs-comment">/* عملية الإضافة */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-title function_">set</span>(<span class="hljs-params"><span class="hljs-attr">key</span>: <span class="hljs-built_in">number</span>, <span class="hljs-attr">val</span>: <span class="hljs-built_in">string</span></span>) {
        <span class="hljs-keyword">let</span> index = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">hashFunc</span>(key);
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>[index] = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Pair</span>(key, val);
    }

    <span class="hljs-comment">/* عملية الحذف */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-title function_">delete</span>(<span class="hljs-params"><span class="hljs-attr">key</span>: <span class="hljs-built_in">number</span></span>) {
        <span class="hljs-keyword">let</span> index = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">hashFunc</span>(key);
        <span class="hljs-comment">// اضبط على null لتمثيل الحذف</span>
        <span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>[index] = <span class="hljs-literal">null</span>;
    }

    <span class="hljs-comment">/* احصل على جميع أزواج المفتاح-القيمة */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-title function_">entries</span>(): (<span class="hljs-title class_">Pair</span> | <span class="hljs-literal">null</span>)[] {
        <span class="hljs-keyword">let</span> <span class="hljs-attr">arr</span>: (<span class="hljs-title class_">Pair</span> | <span class="hljs-literal">null</span>)[] = [];
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>.<span class="hljs-property">length</span>; i++) {
            <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>[i]) {
                arr.<span class="hljs-title function_">push</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>[i]);
            }
        }
        <span class="hljs-keyword">return</span> arr;
    }

    <span class="hljs-comment">/* احصل على جميع المفاتيح */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-title function_">keys</span>(): (<span class="hljs-built_in">number</span> | <span class="hljs-literal">undefined</span>)[] {
        <span class="hljs-keyword">let</span> <span class="hljs-attr">arr</span>: (<span class="hljs-built_in">number</span> | <span class="hljs-literal">undefined</span>)[] = [];
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>.<span class="hljs-property">length</span>; i++) {
            <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>[i]) {
                arr.<span class="hljs-title function_">push</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>[i].<span class="hljs-property">key</span>);
            }
        }
        <span class="hljs-keyword">return</span> arr;
    }

    <span class="hljs-comment">/* احصل على جميع القيم */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-title function_">values</span>(): (<span class="hljs-built_in">string</span> | <span class="hljs-literal">undefined</span>)[] {
        <span class="hljs-keyword">let</span> <span class="hljs-attr">arr</span>: (<span class="hljs-built_in">string</span> | <span class="hljs-literal">undefined</span>)[] = [];
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">let</span> i = <span class="hljs-number">0</span>; i &lt; <span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>.<span class="hljs-property">length</span>; i++) {
            <span class="hljs-keyword">if</span> (<span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>[i]) {
                arr.<span class="hljs-title function_">push</span>(<span class="hljs-variable language_">this</span>.<span class="hljs-property">buckets</span>[i].<span class="hljs-property">val</span>);
            }
        }
        <span class="hljs-keyword">return</span> arr;
    }

    <span class="hljs-comment">/* اطبع جدول التجزئة */</span>
    <span class="hljs-keyword">public</span> <span class="hljs-title function_">print</span>(<span class="hljs-params"></span>) {
        <span class="hljs-keyword">let</span> pairSet = <span class="hljs-variable language_">this</span>.<span class="hljs-title function_">entries</span>();
        <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> pair <span class="hljs-keyword">of</span> pairSet) {
            <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">info</span>(<span class="hljs-string">\`<span class="hljs-subst">\${pair.key}</span> -&gt; <span class="hljs-subst">\${pair.val}</span>\`</span>);
        }
    }
}
</code></pre>
</div>
<h2 id="تصادم-التجزئة-وإعادة-التحجيم">تصادم التجزئة وإعادة التحجيم</h2>
<p>في جوهر الأمر، تربط دالة التجزئة فضاء الإدخال المكوّن من جميع المفاتيح <code>key</code> بفضاء الإخراج المكوّن من جميع فهارس المصفوفة، وغالباً ما يكون فضاء الإدخال أكبر بكثير من فضاء الإخراج. لذلك <strong>يجب نظرياً أن تُسند مدخلات مختلفة أحياناً إلى الإخراج نفسه</strong>.</p>
<p>وبالنسبة إلى دالة التجزئة في المثال أعلاه، عندما يكون للمفاتيح <code>key</code> المدخلة الرقمان الأخيران نفسهما، تنتج دالة التجزئة الإخراج نفسه. على سبيل المثال، عند الاستعلام عن طالبين برقمي هوية 12836 و20336، نحصل على:</p>
<pre><code class="language-shell">12836 % 100 = 36
20336 % 100 = 36
</code></pre>
<p>وكما يوضح الشكل أدناه، يشير رقما هوية الآن إلى الاسم نفسه، وهو ما لا يصح قطعاً. ونسمي هذه الحالة، التي تُسند فيها مدخلات متعددة إلى الإخراج نفسه، <u>تصادم تجزئة</u> (hash collision).</p>
<p><img src="/images/hello-algo/chapter_hashing--hash_collision.png" alt="مثال على تصادم التجزئة"></p>
<p>من السهل أن نرى أنه كلما زادت سعة جدول التجزئة $n$، قلّ احتمال إسناد مفاتيح <code>key</code> متعددة إلى الدلو نفسه، وقلّت التصادمات. لذلك <strong>يمكننا تقليل تصادمات التجزئة بتوسيع جدول التجزئة</strong>.</p>
<p>وكما يوضح الشكل أدناه، قبل التوسيع تصادم الزوجان <code>(136, A)</code> و<code>(236, D)</code>، أما بعد التوسيع فيزول التصادم.</p>
<p><img src="/images/hello-algo/chapter_hashing--hash_table_reshash.png" alt="إعادة تحجيم جدول التجزئة"></p>
<p>ومثل إعادة تحجيم مصفوفة، تتطلب إعادة تحجيم جدول التجزئة ترحيل جميع أزواج المفتاح-القيمة من الجدول الأصلي إلى الجدول الجديد، وهو أمر مكلف. وإضافة إلى ذلك، ولأن سعة جدول التجزئة <code>capacity</code> تتغير، يجب علينا إعادة حساب موضع تخزين كل زوج مفتاح-قيمة باستخدام دالة التجزئة، وهو ما يزيد تكلفة إعادة التحجيم أكثر. ولهذا السبب، تحجز لغات البرمجة عادةً سعة كافية لجدول التجزئة لتجنّب إعادة التحجيم المتكررة.</p>
<p><u>عامل الحِمل</u> (load factor) مفهوم مهم في جداول التجزئة. ويُعرَّف بأنه عدد العناصر في جدول التجزئة مقسوماً على عدد الدلاء، ويُستخدم لقياس شدة تصادمات التجزئة. <strong>ويُستخدم أيضاً عادةً عتبةً لتفعيل إعادة تحجيم جدول التجزئة</strong>. على سبيل المثال، في Java، عندما يتجاوز عامل الحِمل $0.75$، يوسّع النظام جدول التجزئة إلى ضعف حجمه الأصلي.</p>
`,t={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:e,html:c};export{s as book,a as chapter,n as chapterTitle,t as default,e as headings,c as html,l as slug,p as title};
