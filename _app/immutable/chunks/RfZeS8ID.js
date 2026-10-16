const s="mooc",n="part-7",a="الجزء 7: الوحدات",p="5-creating-modules",t="إنشاء وحداتك الخاصة",l=[{depth:2,id:"الاستفادة-من-تلميحات-النوع",text:"الاستفادة من تلميحات النوع"},{depth:2,id:"شيفرة-الدالة-الرئيسية-داخل-وحدة",text:"شيفرة الدالة الرئيسية داخل وحدة"}],r=`<blockquote>
<p><strong>أهداف التعلّم</strong></p>
<p>بعد إتمام هذا القسم</p>
<ul>
<li>ستكون قادرًا على كتابة وحداتك الخاصة</li>
<li>ستعرف ما الذي يعنيه المتغيّر <code>__name__</code> في Python والقيمة <code>__main__</code></li>
</ul>
</blockquote>
<p>كتابة وحدات Python الخاصة بك أمر سهل. فأي ملف يحتوي على شيفرة Python صحيحة يمكن استيراده كوحدة. ولنفترض أن لدينا ملفًا اسمه <code>words.py</code> بالمحتوى التالي:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">first_word</span>(<span class="hljs-params">my_string: <span class="hljs-built_in">str</span></span>):
    parts = my_string.split(<span class="hljs-string">&quot; &quot;</span>)
    <span class="hljs-keyword">return</span> parts[<span class="hljs-number">0</span>]

<span class="hljs-keyword">def</span> <span class="hljs-title function_">last_word</span>(<span class="hljs-params">my_string: <span class="hljs-built_in">str</span></span>):
    parts = my_string.split(<span class="hljs-string">&quot; &quot;</span>)
    <span class="hljs-keyword">return</span> parts[-<span class="hljs-number">1</span>]

<span class="hljs-keyword">def</span> <span class="hljs-title function_">number_of_words</span>(<span class="hljs-params">my_string: <span class="hljs-built_in">str</span></span>):
    parts = my_string.split(<span class="hljs-string">&quot; &quot;</span>)
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">len</span>(parts)
</code></pre>
<p>يمكن الوصول إلى الدوال المعرّفة في الملف باستيراد الملف:</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> words

my_string = <span class="hljs-string">&quot;Sheila sells seashells by the seashore&quot;</span>

<span class="hljs-built_in">print</span>(words.first_word(my_string))
<span class="hljs-built_in">print</span>(words.last_word(my_string))
<span class="hljs-built_in">print</span>(words.number_of_words(my_string))
</code></pre>
<pre><code>Sheila
seashore
6
</code></pre>
<p>ملاحظة: يجب أن يكون الملف الذي يحتوي على وحدة Python موجودًا إما في الدليل نفسه مع البرنامج الذي يستوردها، وإما في أحد أدلة Python الافتراضية، وإلا فلن يعثر عليه مفسّر Python عند تنفيذ عبارة <code>import</code>.</p>
<p>يمكننا استخدام وحداتنا الخاصة تمامًا كما تعلّمنا استخدام الوحدات من مكتبة Python القياسية:</p>
<pre><code class="language-python"><span class="hljs-keyword">from</span> words <span class="hljs-keyword">import</span> first_word, last_word

sentence = <span class="hljs-built_in">input</span>(<span class="hljs-string">&quot;Please type in a sentence: &quot;</span>)

<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The first word was: &quot;</span> + first_word(sentence))
<span class="hljs-built_in">print</span>(<span class="hljs-string">&quot;The last word was: &quot;</span> + last_word(sentence))
</code></pre>
<pre><code>Please type in a sentence: **Python is a swell programming language**
The first word was: Python
The last word was: language
</code></pre>
<h2 id="الاستفادة-من-تلميحات-النوع">الاستفادة من تلميحات النوع</h2>
<p>عند استخدام الوحدات تصبح تلميحات النوع مفيدة بشكل خاص. وإذا كنت تستخدم محرّرًا يدعم تلميحات النوع مدمجًا، فيصبح استخدام الوحدات المختلفة أسهل بكثير.</p>
<p>فمثلًا، يعرض Visual Studio Code تلميحات النوع أثناء كتابتك للشيفرة:</p>
<p><img src="/arabic-cs-library/images/mooc/part-7/7_vihje.png" alt="7_vihje.png"></p>
<h2 id="شيفرة-الدالة-الرئيسية-داخل-وحدة">شيفرة الدالة الرئيسية داخل وحدة</h2>
<p>إذا احتوت وحدة على أي شيفرة غير موجودة داخل تعريف دالة (أي إذا احتوت الوحدة على شيفرة في الدالة الرئيسية لها)، فإن هذه الشيفرة تُنفَّذ تلقائيًا كلما استُوردت الوحدة.</p>
<p>ولنفترض أن ملف <code>words.py</code> لدينا احتوى أيضًا على بعض حالات الاختبار:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">first_word</span>(<span class="hljs-params">my_string: <span class="hljs-built_in">str</span></span>):
    parts = my_string.split(<span class="hljs-string">&quot; &quot;</span>)
    <span class="hljs-keyword">return</span> parts[<span class="hljs-number">0</span>]

<span class="hljs-keyword">def</span> <span class="hljs-title function_">last_word</span>(<span class="hljs-params">my_string: <span class="hljs-built_in">str</span></span>):
    parts = my_string.split(<span class="hljs-string">&quot; &quot;</span>)
    <span class="hljs-keyword">return</span> parts[-<span class="hljs-number">1</span>]

<span class="hljs-keyword">def</span> <span class="hljs-title function_">number_of_words</span>(<span class="hljs-params">my_string: <span class="hljs-built_in">str</span></span>):
    parts = my_string.split(<span class="hljs-string">&quot; &quot;</span>)
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">len</span>(parts)

<span class="hljs-built_in">print</span>(first_word(<span class="hljs-string">&quot;This is a test&quot;</span>))
<span class="hljs-built_in">print</span>(last_word(<span class="hljs-string">&quot;Here we are still testing&quot;</span>))
<span class="hljs-built_in">print</span>(number_of_words(<span class="hljs-string">&quot;One two three four five&quot;</span>))
</code></pre>
<p>الآن، إذا استوردنا الوحدة بعبارة <code>import</code>، فستُنفَّذ تلقائيًا كل الشيفرة في الوحدة الموجودة خارج الدوال المعرّفة:</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> words

my_string = <span class="hljs-string">&quot;Sheila sells seashells by the seashore&quot;</span>

<span class="hljs-built_in">print</span>(words.first_word(my_string))
<span class="hljs-built_in">print</span>(words.last_word(my_string))
<span class="hljs-built_in">print</span>(words.number_of_words(my_string))
</code></pre>
<pre><code>This
testing
5
Sheila
seashore
6
</code></pre>
<p>وكما ترى أعلاه، ليست هذه نتيجة جيدة، لأن البرنامج الذي نحاول كتابته يتشوّش بسبب حالات الاختبار من الوحدة نفسها.</p>
<p>لحسن الحظ، هناك حل، وهو حل استخدمته مرات عديدة من قبل في تمارين هذه الدورة. كل ما نحتاجه هو اختبار ما إذا كان البرنامج قيد التنفيذ بمفرده، أو ما إذا كانت الشيفرة قد استُوردت بعبارة <code>import</code>. فللـ Python متغيّر مدمج هو <code>__name__</code>، يحتوي على اسم البرنامج قيد التنفيذ. وإذا كان البرنامج قيد التنفيذ بمفرده، فإن قيمة المتغيّر هي <code>__main__</code>. أما إذا كان البرنامج قد استُورد، فإن قيمة المتغيّر هي اسم الوحدة المستورَدة (في هذه الحالة <code>words</code>).</p>
<p>وبمعرفة ذلك، يمكننا إضافة جملة شرطية تتيح لنا تنفيذ حالات الاختبار فقط إذا نُفِّذ البرنامج بمفرده. وكما ترى أدناه، تبدو البنية مألوفة:</p>
<pre><code class="language-python"><span class="hljs-keyword">def</span> <span class="hljs-title function_">first_word</span>(<span class="hljs-params">my_string: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-built_in">str</span>:
    parts = my_string.split(<span class="hljs-string">&quot; &quot;</span>)
    <span class="hljs-keyword">return</span> parts[<span class="hljs-number">0</span>]

<span class="hljs-keyword">def</span> <span class="hljs-title function_">last_word</span>(<span class="hljs-params">my_string: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-built_in">str</span>:
    parts = my_string.split(<span class="hljs-string">&quot; &quot;</span>)
    <span class="hljs-keyword">return</span> parts[-<span class="hljs-number">1</span>]

<span class="hljs-keyword">def</span> <span class="hljs-title function_">number_of_words</span>(<span class="hljs-params">my_string: <span class="hljs-built_in">str</span></span>) -&gt; <span class="hljs-built_in">int</span>:
    parts = my_string.split(<span class="hljs-string">&quot; &quot;</span>)
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">len</span>(parts)

<span class="hljs-keyword">if</span> __name__ == <span class="hljs-string">&quot;__main__&quot;</span>:
    <span class="hljs-comment"># testing functionality</span>
    <span class="hljs-built_in">print</span>(first_word(<span class="hljs-string">&quot;This is a test&quot;</span>))
    <span class="hljs-built_in">print</span>(last_word(<span class="hljs-string">&quot;Here we are still testing&quot;</span>))
    <span class="hljs-built_in">print</span>(number_of_words(<span class="hljs-string">&quot;One two three four five&quot;</span>))
</code></pre>
<p>وإذا نفّذت الوحدة بمفردها، فستُطبع حالات الاختبار:</p>
<pre><code>This
testing
5
</code></pre>
<p>وعند استيراد الوحدة في برنامج آخر، لا تُنفَّذ حالات الاختبار:</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> words

my_string = <span class="hljs-string">&quot;Sheila sells seashells by the seashore&quot;</span>

<span class="hljs-built_in">print</span>(words.first_word(my_string))
<span class="hljs-built_in">print</span>(words.last_word(my_string))
<span class="hljs-built_in">print</span>(words.number_of_words(my_string))
</code></pre>
<pre><code>Sheila
seashore
6
</code></pre>
<p>في تمارين هذه الدورة، كلما طُلب منك كتابة دوال، كان يُتوقَّع منك عادةً أيضًا أن تلفّ حالات الاختبار في كتلة <code>if __name__ == &quot;__main__&quot;</code> تمامًا مثل الكتلة أعلاه. والآن تعرف السبب.</p>
<blockquote>
<p><strong>تمرين برمجي: مساعد السلاسل</strong></p>
<p>يُرجى كتابة وحدة اسمها <code>string_helper</code> تحتوي على الدوال التالية:</p>
</blockquote>
<p>تُنشئ الدالة <code>change_case(orig_string: str)</code> نسخة جديدة من السلسلة النصية المُمرَّرة كمعامل وتُعيدها. وينبغي أن تصبح الأحرف الصغيرة في الأصل أحرفًا كبيرة، والأحرف الكبيرة أحرفًا صغيرة.</p>
<p>تقسم الدالة <code>split_in_half(orig_string: str)</code> السلسلة النصية المُمرَّرة كمعامل إلى نصفين، وتُعيد النتيجتين في صف (tuple). وإذا كان عدد محارف الأصل فرديًا، ينبغي أن يكون النصف الأول أقصر.</p>
<p>تُعيد الدالة <code>remove_special_characters(orig_string: str)</code> نسخة جديدة من السلسلة النصية المُمرَّرة كمعامل، بعد إزالة كل المحارف الخاصة. ولا يُسمح في السلسلة النصية المُعادة إلا بالأحرف الصغيرة والكبيرة والأرقام والمسافات.</p>
<p>وفيما يلي بعض الأمثلة على كيفية استخدام الوحدة:</p>
<pre><code class="language-python"><span class="hljs-keyword">import</span> string_helper

my_string = <span class="hljs-string">&quot;Well hello there!&quot;</span>

<span class="hljs-built_in">print</span>(string_helper.change_case(my_string))

p1, p2 = string_helper.split_in_half(my_string)

<span class="hljs-built_in">print</span>(p1)
<span class="hljs-built_in">print</span>(p2)

m2 = string_helper.remove_special_characters(<span class="hljs-string">&quot;This is a test, lets see how it goes!!!11!&quot;</span>)
<span class="hljs-built_in">print</span>(m2)
</code></pre>
<pre><code>wELL HELLO THERE!
Well hel
lo there!
This is a test lets see how it goes11
</code></pre>
<!---
> **اختبار:** (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 2203412c-628c-54a3-bd77-edebd5ce4f67)

-->
<p>يُرجى الإجابة عن استبيان سريع عن مواد هذا الأسبوع.</p>
<blockquote>
<p><strong>اختبار:</strong> (مكون تفاعلي غير متاح في النسخة الثابتة - ID: 953a13c1-b365-557e-b3f5-da39f8814f3e)</p>
</blockquote>
`,e={book:s,chapter:n,chapterTitle:a,slug:p,title:t,headings:l,html:r};export{s as book,n as chapter,a as chapterTitle,e as default,l as headings,r as html,p as slug,t as title};
