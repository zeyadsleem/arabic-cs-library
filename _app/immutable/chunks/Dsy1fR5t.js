const s="effective-go",n="control-structures",a="بنى التحكم",e="index",p="بنى التحكم",l=[{depth:2,id:"if",text:"if"},{depth:2,id:"إعادة-التصريح-وإعادة-الإسناد",text:"إعادة التصريح وإعادة الإسناد"},{depth:2,id:"for",text:"for"},{depth:2,id:"switch",text:"switch"},{depth:2,id:"مبدل-الأنواع",text:"مُبدِّل الأنواع"}],c=`<p>بنى التحكم في Go صلة ببنى C، لكنها تختلف عنها في جوانب مهمة. فلا وجود لحلقة <code>do</code> ولا <code>while</code>، وإنما <code>for</code> تعميمًا طفيفًا؛ و<code>switch</code> أكثر مرونة؛ و<code>if</code> و<code>switch</code> يقبلان جملة تهيئة اختيارية على غرار <code>for</code>؛ و<code>break</code> و<code>continue</code> يأخذان تسمية (label) اختيارية تحدّد ما يُنهى أو يُتابَع؛ وهناك بنى تحكم جديدة منها مُبدِّل الأنواع (type switch) ومُبدِّل اتصالات متعدّد المسارات، وهو <code>select</code>. والصياغة تختلف أيضًا اختلافًا طفيفًا: لا أقواس، ويجب دائمًا محاطة الأجسام بأقواس معقوفة.</p>
<h2 id="if">if</h2>
<p>في Go تبدو <code>if</code> البسيطة هكذا:</p>
<pre><code class="language-go"><span class="hljs-keyword">if</span> x &gt; <span class="hljs-number">0</span> {
    <span class="hljs-keyword">return</span> y
}
</code></pre>
<p>الأقواس المعقوفة الإلزامية تشجّع على كتابة جمل <code>if</code> البسيطة في عدّة أسطر. وهو أسلوب جيّد على أي حال، ولا سيما حين يحتوي الجسم على جملة تحكم مثل <code>return</code> أو <code>break</code>.</p>
<p>ولأن <code>if</code> و<code>switch</code> تقبلان جملة تهيئة، فسنرى كثيرًا ما يُستعمل فيهما لتهيئة متغيّر محلي:</p>
<pre><code class="language-go"><span class="hljs-keyword">if</span> err := file.Chmod(<span class="hljs-number">0664</span>); err != <span class="hljs-literal">nil</span> {
    log.Print(err)
    <span class="hljs-keyword">return</span> err
}
</code></pre>
<p>وفي مكتبات Go ستجد أن <code>if</code> التي لا تنساب إلى الجملة التالية — أي أن الجسم ينتهي بـ <code>break</code> أو <code>continue</code> أو <code>goto</code> أو <code>return</code> — يُحذف منها <code>else</code> غير الضروري:</p>
<pre><code class="language-go">f, err := os.Open(name)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
codeUsing(f)
</code></pre>
<p>وهذا مثال على موقف شائع تفرض فيه الشيفرة التحسّس أمام سلسلة من حالات الخطأ. وتُقرأ الشيفرة قراءةً سليمة إن كان مسار النجاح يجري نزولًا في الصفحة، فتُلغى حالات الخطأ لحظة ظهورها. وبما أن حالات الخطأ تنتهي غالبًا بجمل <code>return</code>، لا تحتاج الشيفرة الناتجة إلى أي جمل <code>else</code>:</p>
<pre><code class="language-go">f, err := os.Open(name)
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    <span class="hljs-keyword">return</span> err
}
d, err := f.Stat()
<span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
    f.Close()
    <span class="hljs-keyword">return</span> err
}
codeUsing(f, d)
</code></pre>
<h2 id="إعادة-التصريح-وإعادة-الإسناد">إعادة التصريح وإعادة الإسناد</h2>
<p>على هامش الموضوع: المثال الأخير في القسم السابق يوضّح تفصيلًا في كيفية عمل صيغة التصريح القصير <code>:=</code>. فالتصريح الذي ينادي <code>os.Open</code> هو:</p>
<pre><code class="language-go">f, err := os.Open(name)
</code></pre>
<p>وتُعلن هذه الجملة متغيّرين: <code>f</code> و<code>err</code>. وبعد بضعة أسطر، يصبح نداء <code>f.Stat</code>:</p>
<pre><code class="language-go">d, err := f.Stat()
</code></pre>
<p>وهو يبدو وكأنه يُعلن <code>d</code> و<code>err</code>. لكن لاحظ أن <code>err</code> يظهر في الجملتين معًا. وهذا التكرار قانوني: فـ <code>err</code> مُعلَن في الجملة الأولى، ومُعاد إسناده في الثانية فحسب. أي أن نداء <code>f.Stat</code> يستعمل متغيّر <code>err</code> الموجود أصلًا، ويكتفي بإعطائه قيمة جديدة.</p>
<p>وفي تصريح بـ <code>:=</code> قد يظهر المتغيّر <code>v</code> حتى لو كان مُعلَنًا من قبل، شريطة:</p>
<ul>
<li>
<p>أن يقع هذا التصريح في النطاق نفسه الذي أُعلن فيه <code>v</code> (فإن كان <code>v</code> مُعلَنًا في نطاق خارجي، فإن التصريح سينشئ متغيّرًا جديدًا، انظر الحاشية)،</p>
</li>
<li>
<p>أن تكون القيمة المقابلة له في التهيئة قابلة للإسناد إلى <code>v</code>، و</p>
</li>
<li>
<p>أن يوجد متغيّر آخر واحد على الأقل ينشئه هذا التصريح.</p>
</li>
</ul>
<p>وهذه الخاصية غير المعتادة هي خالصة العمليّة: فهي تتيح مثلًا استعمال قيمة <code>err</code> واحدة في سلسلة طويلة من <code>if-else</code>. وستراها مستعملة في كل موضع تقريبًا.</p>
<blockquote>
<p>في Go، نطاق معاملات الدالة وقيم عودتها هو نفسه نطاق جسم الدالة، رغم أنها تظهر معجَميًا خارج الأقواس المعقوفة التي تحدّ الجسم.</p>
</blockquote>
<h2 id="for">for</h2>
<p>حلقة <code>for</code> في Go شبيهة بحلقة C، لكنها ليست هي. فهي توحّد <code>for</code> و<code>while</code>، ولا وجود لـ <code>do-while</code>. ولها ثلاثة أشكال، واحد منها فقط يتضمّن فواصل منقوطة:</p>
<pre><code class="language-go"><span class="hljs-comment">// Like a C for</span>
<span class="hljs-keyword">for</span> init; condition; post { }

<span class="hljs-comment">// Like a C while</span>
<span class="hljs-keyword">for</span> condition { }

<span class="hljs-comment">// Like a C for(;;)</span>
<span class="hljs-keyword">for</span> { }
</code></pre>
<p>وتجعل التصاريح القصيرة من السهل أن تُعلن متغيّر الفهرس في الحلقة نفسها:</p>
<pre><code class="language-go">sum := <span class="hljs-number">0</span>
<span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">10</span>; i++ {
    sum += i
}
</code></pre>
<p>وإن كنت تتصفّح مصفوفة (array) أو شريحة (slice) أو نصًّا (string) أو خريطة (map)، أو تقرأ من قناة (channel)، فبند <code>range</code> يستطيع أن يدير الحلقة عنك:</p>
<pre><code class="language-go"><span class="hljs-keyword">for</span> key, value := <span class="hljs-keyword">range</span> oldMap {
    newMap[key] = value
}
</code></pre>
<p>وإن كنت تحتاج العنصر الأول في النطاق فقط — المفتاح أو الفهرس — فاحذف الثاني:</p>
<pre><code class="language-go"><span class="hljs-keyword">for</span> key := <span class="hljs-keyword">range</span> m {
    <span class="hljs-keyword">if</span> key.expired() {
        <span class="hljs-built_in">delete</span>(m, key)
    }
}
</code></pre>
<p>وإن كنت تحتاج العنصر الثاني فقط — القيمة — فاستعمل المُعرِّف الفارغ، أي الشرطة السفلية، للتخلّص من الأول:</p>
<pre><code class="language-go">sum := <span class="hljs-number">0</span>
<span class="hljs-keyword">for</span> _, value := <span class="hljs-keyword">range</span> array {
    sum += value
}
</code></pre>
<p>وللمُعرِّف الفارغ استعمالات كثيرة، كما هو موضَّح في قسم لاحق.</p>
<p>أمّا في النصوص، فـ <code>range</code> يفعل عنك أكثر من ذلك: فهو يستخرج نقاط ترميز Unicode منفردة بتحليل UTF-8. أما الترميزات الخاطئة فتستهلك بايتًا واحدًا وتنتج محرف البديل U+FFFD. (واسم <code>rune</code> — مع نوعه المدمج المرتبط به — هو مصطلح Go للنقطة الواحدة من ترميز Unicode؛ راجع مواصفات اللغة للتفاصيل.)</p>
<p>فالحلقة</p>
<pre><code class="language-go"><span class="hljs-keyword">for</span> pos, char := <span class="hljs-keyword">range</span> <span class="hljs-string">&quot; \\x80 &quot;</span> { <span class="hljs-comment">// \\x80 is an illegal UTF-8 encoding</span>
    fmt.Printf(<span class="hljs-string">&quot;character %#U starts at byte position %d\\n&quot;</span>, char, pos)
}
</code></pre>
<p>تُطبع</p>
<pre><code class="language-text">character U+65E5 &#x27; &#x27; starts at byte position 0
character U+672C &#x27; &#x27; starts at byte position 3
character U+FFFD &#x27;�&#x27; starts at byte position 6
character U+8A9E &#x27; &#x27; starts at byte position 7
</code></pre>
<p>وأخيرًا، لا يوجد في Go معامل فاصلة (comma operator)، كما أن <code>++</code> و<code>--</code> جملتان لا تعبيران. فإن أردت تشغيل عدّة متغيّرات داخل <code>for</code> فينبغي أن تستعمل الإسناد المتوازي (مع العلم بأن ذلك يستبعد <code>++</code> و<code>--</code>):</p>
<pre><code class="language-go"><span class="hljs-comment">// Reverse a</span>
<span class="hljs-keyword">for</span> i, j := <span class="hljs-number">0</span>, <span class="hljs-built_in">len</span>(a)<span class="hljs-number">-1</span>; i &lt; j; i, j = i+<span class="hljs-number">1</span>, j<span class="hljs-number">-1</span> {
    a[i], a[j] = a[j], a[i]
}
</code></pre>
<h2 id="switch">switch</h2>
<p>إن <code>switch</code> في Go أكثر عمومية من نظيرتها في C. فالتعبيرات ليست بالضرورة ثوابت ولا أعدادًا صحيحة؛ وتُقاس الحالات من الأعلى إلى الأسفل حتى يُعثر على تطابق؛ وإذا لم يكن في <code>switch</code> تعبير، فإنه يتبدّل على <code>true</code>. ومن ثمّ فمن الممكن — بل من المتّبَع لأعراف Go — أن تكتب سلسلة <code>if</code>-<code>else</code>-<code>if</code>-<code>else</code> على هيئة <code>switch</code>:</p>
<pre><code class="language-go"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">unhex</span><span class="hljs-params">(c <span class="hljs-type">byte</span>)</span></span> <span class="hljs-type">byte</span> {
    <span class="hljs-keyword">switch</span> {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;0&#x27;</span> &lt;= c &amp;&amp; c &lt;= <span class="hljs-string">&#x27;9&#x27;</span>:
        <span class="hljs-keyword">return</span> c - <span class="hljs-string">&#x27;0&#x27;</span>
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;a&#x27;</span> &lt;= c &amp;&amp; c &lt;= <span class="hljs-string">&#x27;f&#x27;</span>:
        <span class="hljs-keyword">return</span> c - <span class="hljs-string">&#x27;a&#x27;</span> + <span class="hljs-number">10</span>
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27;A&#x27;</span> &lt;= c &amp;&amp; c &lt;= <span class="hljs-string">&#x27;F&#x27;</span>:
        <span class="hljs-keyword">return</span> c - <span class="hljs-string">&#x27;A&#x27;</span> + <span class="hljs-number">10</span>
    }
    <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>
}
</code></pre>
<p>ولا يوجد سقوط تلقائي إلى الحالة التالية، لكن يمكن تقديم الحالات في قوائم مفصولة بفواصل:</p>
<pre><code class="language-go"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">shouldEscape</span><span class="hljs-params">(c <span class="hljs-type">byte</span>)</span></span> <span class="hljs-type">bool</span> {
    <span class="hljs-keyword">switch</span> c {
    <span class="hljs-keyword">case</span> <span class="hljs-string">&#x27; &#x27;</span>, <span class="hljs-string">&#x27;?&#x27;</span>, <span class="hljs-string">&#x27;&amp;&#x27;</span>, <span class="hljs-string">&#x27;=&#x27;</span>, <span class="hljs-string">&#x27;#&#x27;</span>, <span class="hljs-string">&#x27;+&#x27;</span>, <span class="hljs-string">&#x27;%&#x27;</span>:
        <span class="hljs-keyword">return</span> <span class="hljs-literal">true</span>
    }
    <span class="hljs-keyword">return</span> <span class="hljs-literal">false</span>
}
</code></pre>
<p>ومع ذلك فجمل <code>break</code> أقل شيوعًا في Go بكثير مما هي في بعض اللغات الشبيهة بـ C، غير أنها تُستعمل لإنهاء <code>switch</code> مبكرًا. غير أنه أحيانًا يلزم الخروج من حلقة محيطة لا من الـ <code>switch</code>، وفي Go يتحقق ذلك بوضع تسمية (label) على الحلقة ثم «القفز» إليها. ويعرض المثال التالي الاستعمالين معًا:</p>
<pre><code class="language-go">Loop:
    <span class="hljs-keyword">for</span> n := <span class="hljs-number">0</span>; n &lt; <span class="hljs-built_in">len</span>(src); n += size {
        <span class="hljs-keyword">switch</span> {
        <span class="hljs-keyword">case</span> src[n] &lt; sizeOne:
            <span class="hljs-keyword">if</span> validateOnly {
                <span class="hljs-keyword">break</span>
            }
            size = <span class="hljs-number">1</span>
            update(src[n])

        <span class="hljs-keyword">case</span> src[n] &lt; sizeTwo:
            <span class="hljs-keyword">if</span> n+<span class="hljs-number">1</span> &gt;= <span class="hljs-built_in">len</span>(src) {
                err = errShortInput
                <span class="hljs-keyword">break</span> Loop
            }
            <span class="hljs-keyword">if</span> validateOnly {
                <span class="hljs-keyword">break</span>
            }
            size = <span class="hljs-number">2</span>
            update(src[n] + src[n+<span class="hljs-number">1</span>]&lt;&lt;shift)
        }
    }
</code></pre>
<p>ولأن <code>continue</code> تقبل أيضًا تسمية اختيارية، لكنها تنطبق على الحلقات فقط.</p>
<p>ولختم هذا القسم، إليك دالة مقارنة لشرائح البايت تستعمل جملتَي <code>switch</code>:</p>
<pre><code class="language-go"><span class="hljs-comment">// Compare returns an integer comparing the two byte slices,</span>
<span class="hljs-comment">// lexicographically.</span>
<span class="hljs-comment">// The result will be 0 if a == b, -1 if a &lt; b, and +1 if a &gt; b</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">Compare</span><span class="hljs-params">(a, b []<span class="hljs-type">byte</span>)</span></span> <span class="hljs-type">int</span> {
    <span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">len</span>(a) &amp;&amp; i &lt; <span class="hljs-built_in">len</span>(b); i++ {
        <span class="hljs-keyword">switch</span> {
        <span class="hljs-keyword">case</span> a[i] &gt; b[i]:
            <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>
        <span class="hljs-keyword">case</span> a[i] &lt; b[i]:
            <span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>
        }
    }
    <span class="hljs-keyword">switch</span> {
    <span class="hljs-keyword">case</span> <span class="hljs-built_in">len</span>(a) &gt; <span class="hljs-built_in">len</span>(b):
        <span class="hljs-keyword">return</span> <span class="hljs-number">1</span>
    <span class="hljs-keyword">case</span> <span class="hljs-built_in">len</span>(a) &lt; <span class="hljs-built_in">len</span>(b):
        <span class="hljs-keyword">return</span> <span class="hljs-number">-1</span>
    }
    <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>
}
</code></pre>
<h2 id="مبدل-الأنواع">مُبدِّل الأنواع</h2>
<p>يمكن أيضًا استعمال <code>switch</code> في اكتشاف النوع الديناميكي لمتغيّر من نوع واجهة (interface). ويستخدم هذا مُبدِّل الأنواع صيغة تأكيد النوع (type assertion) مع الكلمة المفتاحية <code>type</code> داخل الأقواس. وإذا أعلن الـ <code>switch</code> متغيّرًا في التعبير، فإن ذلك المتغيّر يأخذ النوع المقابل في كل بند. ومن المتّبَع لأعراف Go أيضًا أن تُعيد استعمال الاسم نفسه في هذه الحالات، فتُعلن فعليًا متغيّرًا جديدًا بالاسم نفسه لكن بنوع مختلف في كل حالة:</p>
<pre><code class="language-go"><span class="hljs-keyword">var</span> t <span class="hljs-keyword">interface</span>{}
t = functionOfSomeType()
<span class="hljs-keyword">switch</span> t := t.(<span class="hljs-keyword">type</span>) {
<span class="hljs-keyword">default</span>:
    fmt.Printf(<span class="hljs-string">&quot;unexpected type %T\\n&quot;</span>, t)     <span class="hljs-comment">// %T prints whatever type t has</span>
<span class="hljs-keyword">case</span> <span class="hljs-type">bool</span>:
    fmt.Printf(<span class="hljs-string">&quot;boolean %t\\n&quot;</span>, t)             <span class="hljs-comment">// t has type bool</span>
<span class="hljs-keyword">case</span> <span class="hljs-type">int</span>:
    fmt.Printf(<span class="hljs-string">&quot;integer %d\\n&quot;</span>, t)             <span class="hljs-comment">// t has type int</span>
<span class="hljs-keyword">case</span> *<span class="hljs-type">bool</span>:
    fmt.Printf(<span class="hljs-string">&quot;pointer to boolean %t\\n&quot;</span>, *t) <span class="hljs-comment">// t has type *bool</span>
<span class="hljs-keyword">case</span> *<span class="hljs-type">int</span>:
    fmt.Printf(<span class="hljs-string">&quot;pointer to integer %d\\n&quot;</span>, *t) <span class="hljs-comment">// t has type *int</span>
}
</code></pre>
`,o={book:s,chapter:n,chapterTitle:a,slug:e,title:p,headings:l,html:c};export{s as book,n as chapter,a as chapterTitle,o as default,l as headings,c as html,e as slug,p as title};
