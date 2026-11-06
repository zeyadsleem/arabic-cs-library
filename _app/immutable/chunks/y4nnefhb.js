const s="hello-algo",a="chapter_hashing",n="Hashing",t="hash_map",l="جدول التجزئة",e=[{depth:2,id:"العمليات-الشائعة-على-جدول-التجزئة",text:"العمليات الشائعة على جدول التجزئة"}],p=`<p><u>جدول التجزئة</u> (hash table)، المعروف أيضاً بـ<u>خريطة التجزئة</u> (hash map)، يخزّن ارتباطات من المفاتيح <code>key</code> إلى القيم <code>value</code>، مما يتيح عمليات بحث فعّالة. وتحديداً، عند إعطاء مفتاح <code>key</code>، يمكننا استرجاع القيمة المقابلة <code>value</code> من جدول التجزئة في زمن <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span>.</p>
<p>وكما يوضح الشكل أدناه، لنفترض أن لدينا <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span> طالباً، ولكل طالب معلومتان: الاسم ورقم الهوية. وإذا أردنا دعم الاستعلام «أعطِ رقم الهوية وأعد الاسم المقابل»، فيمكننا استخدام جدول التجزئة الموضح أدناه.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_hashing--hash_table_lookup.png" alt="تمثيل مجرد لجدول التجزئة"></p>
<p>إلى جانب جداول التجزئة، يمكن للمصفوفات والقوائم المترابطة أيضاً تنفيذ وظيفة الاستعلام. وتُعرض مقارنة كفاءتها في الجدول التالي.</p>
<ul>
<li><strong>إضافة العناصر</strong>: ما عليك سوى إضافة العناصر إلى نهاية المصفوفة (القائمة المترابطة)، وهو ما يستغرق زمن <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span>.</li>
<li><strong>الاستعلام عن العناصر</strong>: بما أن المصفوفة (القائمة المترابطة) غير مرتبة، يلزم اجتياز جميع العناصر، وهو ما يستغرق زمن <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>.</li>
<li><strong>حذف العناصر</strong>: يجب أولاً تحديد موقع العنصر، ثم حذفه من المصفوفة (القائمة المترابطة)، وهو ما يستغرق زمن <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span>.</li>
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
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td>إضافة عنصر</td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
<tr>
<td>حذف عنصر</td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mi>n</mi><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(n)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord mathnormal">n</span><span class="mclose">)</span></span></span></span></td>
<td><span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></td>
</tr>
</tbody>
</table>
<p>وكما نرى، <strong>فإن عمليات الإدراج والحذف والبحث والتحديث في جدول التجزئة جميعها بتعقيد زمني <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>O</mi><mo stretchy="false">(</mo><mn>1</mn><mo stretchy="false">)</mo></mrow><annotation encoding="application/x-tex">O(1)</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:1em;vertical-align:-0.25em;"></span><span class="mord mathnormal" style="margin-right:0.0278em;">O</span><span class="mopen">(</span><span class="mord">1</span><span class="mclose">)</span></span></span></span></strong>، مما يجعل جداول التجزئة عالية الكفاءة.</p>
<h2 id="العمليات-الشائعة-على-جدول-التجزئة">العمليات الشائعة على جدول التجزئة</h2>
<p>تشمل العمليات الشائعة على جداول التجزئة: التهيئة، وعمليات الاستعلام، وإضافة أزواج المفتاح-القيمة، وحذف أزواج المفتاح-القيمة. وتظهر الشيفرة المثالية أدناه:</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-python"><span class="hljs-comment"># Initialize hash table</span>
hmap: <span class="hljs-built_in">dict</span> = {}

<span class="hljs-comment"># Add operation</span>
<span class="hljs-comment"># Add key-value pair (key, value) to hash table</span>
hmap[<span class="hljs-number">12836</span>] = <span class="hljs-string">&quot;XiaoHa&quot;</span>
hmap[<span class="hljs-number">15937</span>] = <span class="hljs-string">&quot;XiaoLuo&quot;</span>
hmap[<span class="hljs-number">16750</span>] = <span class="hljs-string">&quot;XiaoSuan&quot;</span>
hmap[<span class="hljs-number">13276</span>] = <span class="hljs-string">&quot;XiaoFa&quot;</span>
hmap[<span class="hljs-number">10583</span>] = <span class="hljs-string">&quot;XiaoYa&quot;</span>

<span class="hljs-comment"># Query operation</span>
<span class="hljs-comment"># Input key into hash table to get value</span>
name: <span class="hljs-built_in">str</span> = hmap[<span class="hljs-number">15937</span>]

<span class="hljs-comment"># Delete operation</span>
<span class="hljs-comment"># Delete key-value pair (key, value) from hash table</span>
hmap.pop(<span class="hljs-number">10583</span>)
</code></pre>
</div>
هناك ثلاث طرق شائعة لاجتياز جدول التجزئة: اجتياز أزواج المفتاح-القيمة، واجتياز المفاتيح، واجتياز القيم. وتظهر الشيفرة المثالية أدناه:
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-python"><span class="hljs-comment"># Traverse hash table</span>
<span class="hljs-comment"># Traverse key-value pairs key-&gt;value</span>
<span class="hljs-keyword">for</span> key, value <span class="hljs-keyword">in</span> hmap.items():
    <span class="hljs-built_in">print</span>(key, <span class="hljs-string">&quot;-&gt;&quot;</span>, value)
<span class="hljs-comment"># Traverse keys only</span>
<span class="hljs-keyword">for</span> key <span class="hljs-keyword">in</span> hmap.keys():
    <span class="hljs-built_in">print</span>(key)
<span class="hljs-comment"># Traverse values only</span>
<span class="hljs-keyword">for</span> value <span class="hljs-keyword">in</span> hmap.values():
    <span class="hljs-built_in">print</span>(value)
</code></pre>
</div>
## تنفيذ بسيط لجدول التجزئة
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
<p><img src="/arabic-cs-library/images/hello-algo/chapter_hashing--hash_function.png" alt="مبدأ عمل دالة التجزئة"></p>
<p>تنفّذ الشيفرة التالية جدول تجزئة بسيطاً. وهنا نغلّف <code>key</code> و<code>value</code> في فئة <code>Pair</code> لتمثيل زوج مفتاح-قيمة.</p>
<div class="lang-tab">
<p class="lang-tab__label">Python</p>
<pre><code class="language-py"><span class="hljs-keyword">class</span> <span class="hljs-title class_">ArrayHashMap</span>:
    <span class="hljs-string">&quot;&quot;&quot;جدول تجزئة منفذ بمصفوفة&quot;&quot;&quot;</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">__init__</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot;المنشئ&quot;&quot;&quot;</span>
        <span class="hljs-comment"># مهّد مصفوفة تحوي 100 سلة</span>
        <span class="hljs-variable language_">self</span>.buckets: <span class="hljs-built_in">list</span>[Pair | <span class="hljs-literal">None</span>] = [<span class="hljs-literal">None</span>] * <span class="hljs-number">100</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">hash_func</span>(<span class="hljs-params">self, key: <span class="hljs-built_in">int</span></span>) -&gt; <span class="hljs-built_in">int</span>:
        <span class="hljs-string">&quot;&quot;&quot;دالة التجزئة&quot;&quot;&quot;</span>
        index = key % <span class="hljs-number">100</span>
        <span class="hljs-keyword">return</span> index

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">get</span>(<span class="hljs-params">self, key: <span class="hljs-built_in">int</span></span>) -&gt; <span class="hljs-built_in">str</span> | <span class="hljs-literal">None</span>:
        <span class="hljs-string">&quot;&quot;&quot;عملية البحث&quot;&quot;&quot;</span>
        index: <span class="hljs-built_in">int</span> = <span class="hljs-variable language_">self</span>.hash_func(key)
        pair: Pair = <span class="hljs-variable language_">self</span>.buckets[index]
        <span class="hljs-keyword">if</span> pair <span class="hljs-keyword">is</span> <span class="hljs-literal">None</span>:
            <span class="hljs-keyword">return</span> <span class="hljs-literal">None</span>
        <span class="hljs-keyword">return</span> pair.val

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">put</span>(<span class="hljs-params">self, key: <span class="hljs-built_in">int</span>, val: <span class="hljs-built_in">str</span></span>):
        <span class="hljs-string">&quot;&quot;&quot;عمليات الإدراج والتحديث&quot;&quot;&quot;</span>
        pair = Pair(key, val)
        index: <span class="hljs-built_in">int</span> = <span class="hljs-variable language_">self</span>.hash_func(key)
        <span class="hljs-variable language_">self</span>.buckets[index] = pair

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">remove</span>(<span class="hljs-params">self, key: <span class="hljs-built_in">int</span></span>):
        <span class="hljs-string">&quot;&quot;&quot;عملية الحذف&quot;&quot;&quot;</span>
        index: <span class="hljs-built_in">int</span> = <span class="hljs-variable language_">self</span>.hash_func(key)
        <span class="hljs-comment"># اجعلها None لتمييز الحذف</span>
        <span class="hljs-variable language_">self</span>.buckets[index] = <span class="hljs-literal">None</span>

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">entry_set</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">list</span>[Pair]:
        <span class="hljs-string">&quot;&quot;&quot;الحصول على كل ثنائيات المفتاح-القيمة&quot;&quot;&quot;</span>
        result: <span class="hljs-built_in">list</span>[Pair] = []
        <span class="hljs-keyword">for</span> pair <span class="hljs-keyword">in</span> <span class="hljs-variable language_">self</span>.buckets:
            <span class="hljs-keyword">if</span> pair <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> <span class="hljs-literal">None</span>:
                result.append(pair)
        <span class="hljs-keyword">return</span> result

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">key_set</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">list</span>[<span class="hljs-built_in">int</span>]:
        <span class="hljs-string">&quot;&quot;&quot;الحصول على كل المفاتيح&quot;&quot;&quot;</span>
        result = []
        <span class="hljs-keyword">for</span> pair <span class="hljs-keyword">in</span> <span class="hljs-variable language_">self</span>.buckets:
            <span class="hljs-keyword">if</span> pair <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> <span class="hljs-literal">None</span>:
                result.append(pair.key)
        <span class="hljs-keyword">return</span> result

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">value_set</span>(<span class="hljs-params">self</span>) -&gt; <span class="hljs-built_in">list</span>[<span class="hljs-built_in">str</span>]:
        <span class="hljs-string">&quot;&quot;&quot;الحصول على كل القيم&quot;&quot;&quot;</span>
        result = []
        <span class="hljs-keyword">for</span> pair <span class="hljs-keyword">in</span> <span class="hljs-variable language_">self</span>.buckets:
            <span class="hljs-keyword">if</span> pair <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> <span class="hljs-literal">None</span>:
                result.append(pair.val)
        <span class="hljs-keyword">return</span> result

    <span class="hljs-keyword">def</span> <span class="hljs-title function_">print</span>(<span class="hljs-params">self</span>):
        <span class="hljs-string">&quot;&quot;&quot;طباعة جدول التجزئة&quot;&quot;&quot;</span>
        <span class="hljs-keyword">for</span> pair <span class="hljs-keyword">in</span> <span class="hljs-variable language_">self</span>.buckets:
            <span class="hljs-keyword">if</span> pair <span class="hljs-keyword">is</span> <span class="hljs-keyword">not</span> <span class="hljs-literal">None</span>:
                <span class="hljs-built_in">print</span>(pair.key, <span class="hljs-string">&quot;-&gt;&quot;</span>, pair.val)
</code></pre>
</div>
## تصادم التجزئة وإعادة التحجيم
<p>في جوهر الأمر، تربط دالة التجزئة فضاء الإدخال المكوّن من جميع المفاتيح <code>key</code> بفضاء الإخراج المكوّن من جميع فهارس المصفوفة، وغالباً ما يكون فضاء الإدخال أكبر بكثير من فضاء الإخراج. لذلك <strong>يجب نظرياً أن تُسند مدخلات مختلفة أحياناً إلى الإخراج نفسه</strong>.</p>
<p>وبالنسبة إلى دالة التجزئة في المثال أعلاه، عندما يكون للمفاتيح <code>key</code> المدخلة الرقمان الأخيران نفسهما، تنتج دالة التجزئة الإخراج نفسه. على سبيل المثال، عند الاستعلام عن طالبين برقمي هوية 12836 و20336، نحصل على:</p>
<pre><code class="language-shell">12836 % 100 = 36
20336 % 100 = 36
</code></pre>
<p>وكما يوضح الشكل أدناه، يشير رقما هوية الآن إلى الاسم نفسه، وهو ما لا يصح قطعاً. ونسمي هذه الحالة، التي تُسند فيها مدخلات متعددة إلى الإخراج نفسه، <u>تصادم تجزئة</u> (hash collision).</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_hashing--hash_collision.png" alt="مثال على تصادم التجزئة"></p>
<p>من السهل أن نرى أنه كلما زادت سعة جدول التجزئة <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mi>n</mi></mrow><annotation encoding="application/x-tex">n</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.4306em;"></span><span class="mord mathnormal">n</span></span></span></span>، قلّ احتمال إسناد مفاتيح <code>key</code> متعددة إلى الدلو نفسه، وقلّت التصادمات. لذلك <strong>يمكننا تقليل تصادمات التجزئة بتوسيع جدول التجزئة</strong>.</p>
<p>وكما يوضح الشكل أدناه، قبل التوسيع تصادم الزوجان <code>(136, A)</code> و<code>(236, D)</code>، أما بعد التوسيع فيزول التصادم.</p>
<p><img src="/arabic-cs-library/images/hello-algo/chapter_hashing--hash_table_reshash.png" alt="إعادة تحجيم جدول التجزئة"></p>
<p>ومثل إعادة تحجيم مصفوفة، تتطلب إعادة تحجيم جدول التجزئة ترحيل جميع أزواج المفتاح-القيمة من الجدول الأصلي إلى الجدول الجديد، وهو أمر مكلف. وإضافة إلى ذلك، ولأن سعة جدول التجزئة <code>capacity</code> تتغير، يجب علينا إعادة حساب موضع تخزين كل زوج مفتاح-قيمة باستخدام دالة التجزئة، وهو ما يزيد تكلفة إعادة التحجيم أكثر. ولهذا السبب، تحجز لغات البرمجة عادةً سعة كافية لجدول التجزئة لتجنّب إعادة التحجيم المتكررة.</p>
<p><u>عامل الحِمل</u> (load factor) مفهوم مهم في جداول التجزئة. ويُعرَّف بأنه عدد العناصر في جدول التجزئة مقسوماً على عدد الدلاء، ويُستخدم لقياس شدة تصادمات التجزئة. <strong>ويُستخدم أيضاً عادةً عتبةً لتفعيل إعادة تحجيم جدول التجزئة</strong>. على سبيل المثال، في Java، عندما يتجاوز عامل الحِمل <span class="katex"><span class="katex-mathml"><math xmlns="http://www.w3.org/1998/Math/MathML"><semantics><mrow><mn>0.75</mn></mrow><annotation encoding="application/x-tex">0.75</annotation></semantics></math></span><span class="katex-html" aria-hidden="true"><span class="katex-base"><span class="katex-strut" style="height:0.6444em;"></span><span class="mord">0.75</span></span></span></span>، يوسّع النظام جدول التجزئة إلى ضعف حجمه الأصلي.</p>
`,o={book:s,chapter:a,chapterTitle:n,slug:t,title:l,headings:e,html:p};export{s as book,a as chapter,n as chapterTitle,o as default,e as headings,p as html,t as slug,l as title};
