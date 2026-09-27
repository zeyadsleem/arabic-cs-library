const s="effective-go",n="functions",a="الدوال",p="index",l="الدوال",e=[{depth:2,id:"عوائد-متعددة",text:"عوائد متعددة"},{depth:2,id:"معاملات-النتائج-المسماة",text:"معاملات النتائج المسمّاة"},{depth:2,id:"defer",text:"defer"}],c=`<h2 id="عوائد-متعددة">عوائد متعددة</h2>
<p>من الميزات غير المعتادة في Go أن الدوال والطرق تستطيع أن تُرجع عوائد متعددة. ويمكن استعمال هذه الصيغة لتحسين بعض الأعراف المتعثّرة في برامج C: مثل إرجاع الخطأ داخل قيمة الإرجاع نفسها، كإرجاع <code>-1</code> للدلالة على <code>EOF</code>، أو تعديل وسيط مُمرَّر بالعنوان.</p>
<p>في C، يُشير خطأ الكتابة بعدد سالب مع إخفاء رمز الخطأ في موضع متغيّر. أمّا في Go، تستطيع <code>Write</code> أن تُرجع عددًا وخطأً معًا: «نعم، لقد كتبت بعض البايتات لكن ليس كلّها لأنك ملأت الجهاز». وتوقيع طريقة <code>Write</code> على الملفات من الحزمة <code>os</code> هو:</p>
<pre><code class="language-go"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(file *File)</span></span> Write(b []<span class="hljs-type">byte</span>) (n <span class="hljs-type">int</span>, err <span class="hljs-type">error</span>)
</code></pre>
<p>وكما يقول التوثيق، فإنها تُرجع عدد البايتات المكتوبة، و<code>error</code> غير <code>nil</code> عندما يكون <code>n != len(b)</code>. وهذا أسلوب شائع؛ انظر قسم معالجة الأخطاء لمزيد من الأمثلة.</p>
<p>وينتج عن الأسلوب نفسه استغناء عن الحاجة إلى تمرير مؤشر إلى قيمة إرجاع لتقليد معامل مرجعي. إليك دالة بسيطة تلتقط عددًا من موضع في شريحة بايت، وتُرجع العدد والموضع التالي:</p>
<pre><code class="language-go"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">nextInt</span><span class="hljs-params">(b []<span class="hljs-type">byte</span>, i <span class="hljs-type">int</span>)</span></span> (<span class="hljs-type">int</span>, <span class="hljs-type">int</span>) {
    <span class="hljs-keyword">for</span> ; i &lt; <span class="hljs-built_in">len</span>(b) &amp;&amp; !isDigit(b[i]); i++ {
    }
    x := <span class="hljs-number">0</span>
    <span class="hljs-keyword">for</span> ; i &lt; <span class="hljs-built_in">len</span>(b) &amp;&amp; isDigit(b[i]); i++ {
        x = x*<span class="hljs-number">10</span> + <span class="hljs-type">int</span>(b[i]) - <span class="hljs-string">&#x27;0&#x27;</span>
    }
    <span class="hljs-keyword">return</span> x, i
}
</code></pre>
<p>ويمكنك استعمالها لمسح الأعداد في شريحة إدخال <code>b</code> على النحو الآتي:</p>
<pre><code class="language-go"><span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; <span class="hljs-built_in">len</span>(b); {
    x, i = nextInt(b, i)
    fmt.Println(x)
}
</code></pre>
<p>أما الطريقة البديلة التي يشير إليها الوصف — وهي تمرير <code>*x</code> كمعامل — فهي أقل وضوحًا، رغم استخدامها على نطاق واسع.</p>
<h2 id="معاملات-النتائج-المسماة">معاملات النتائج المسمّاة</h2>
<p>يمكن تسمية معاملات «الإرجاع» أو «النتائج» في دالة Go واستعمالها كمتغيّرات عادية، تمامًا كمعاملات الإدخال. وعندما تُسمّى، فإنها تُهيَّأ على القيم الصفرية لأنواعها عند بدء الدالة؛ وإذا نفّذت الدالة جملة <code>return</code> بلا وسائط، فإن القيم الحالية لمعاملات النتائج هي ما يُعاد.</p>
<p>الأسماء ليست إلزامية، لكنها تجعل الشيفرة أقصر وأوضح: فهي توثيق. فإذا سمّينا نتائج <code>nextInt</code>، صار واضحًا أيّ <code>int</code> مُعادة هي أيّها:</p>
<pre><code class="language-go"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">nextInt</span><span class="hljs-params">(b []<span class="hljs-type">byte</span>, pos <span class="hljs-type">int</span>)</span></span> (value, nextPos <span class="hljs-type">int</span>) {
</code></pre>
<p>ولأن النتائج المسمّاة تُهيَّأ وترتبط بعودية مجرّدة، فإنها تُبسّط الشيفرة وتوضّحها في آن واحد. إليك نسخة من <code>io.ReadFull</code> تستعملها استعمالًا جيدًا:</p>
<pre><code class="language-go"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">ReadFull</span><span class="hljs-params">(r Reader, buf []<span class="hljs-type">byte</span>)</span></span> (n <span class="hljs-type">int</span>, err <span class="hljs-type">error</span>) {
    <span class="hljs-keyword">for</span> <span class="hljs-built_in">len</span>(buf) &gt; <span class="hljs-number">0</span> &amp;&amp; err == <span class="hljs-literal">nil</span> {
        <span class="hljs-keyword">var</span> nr <span class="hljs-type">int</span>
        nr, err = r.Read(buf)
        n += nr
        buf = buf[nr:]
    }
    <span class="hljs-keyword">return</span>
}
</code></pre>
<h2 id="defer">defer</h2>
<p>تجعل جملة <code>defer</code> في Go جدولة نداء دالة — الدالة المؤجَّلة — بحيث يُنفَّذ فورًا قبل أن تعود الدالة التي نفّذت <code>defer</code>. وهذه طريقة غير معتادة لكنها فعّالة في التعامل مع مواقف مثل الموارد التي يجب تحريرها أيًّا كان المسار الذي تعود منه الدالة. والأمثلة النموذجية هي فتح قفل (mutex) أو إغلاق ملف.</p>
<pre><code class="language-go"><span class="hljs-comment">// Contents returns the file&#x27;s contents as a string.</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">Contents</span><span class="hljs-params">(filename <span class="hljs-type">string</span>)</span></span> (<span class="hljs-type">string</span>, <span class="hljs-type">error</span>) {
    f, err := os.Open(filename)
    <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;&quot;</span>, err
    }
    <span class="hljs-keyword">defer</span> f.Close()  <span class="hljs-comment">// f.Close will run when we&#x27;re finished.</span>

    <span class="hljs-keyword">var</span> result []<span class="hljs-type">byte</span>
    buf := <span class="hljs-built_in">make</span>([]<span class="hljs-type">byte</span>, <span class="hljs-number">100</span>)
    <span class="hljs-keyword">for</span> {
        n, err := f.Read(buf[<span class="hljs-number">0</span>:])
        result = <span class="hljs-built_in">append</span>(result, buf[<span class="hljs-number">0</span>:n]...) <span class="hljs-comment">// append is discussed later.</span>
        <span class="hljs-keyword">if</span> err != <span class="hljs-literal">nil</span> {
            <span class="hljs-keyword">if</span> err == io.EOF {
                <span class="hljs-keyword">break</span>
            }
            <span class="hljs-keyword">return</span> <span class="hljs-string">&quot;&quot;</span>, err  <span class="hljs-comment">// f will be closed if we return here.</span>
        }
    }
    <span class="hljs-keyword">return</span> <span class="hljs-type">string</span>(result), <span class="hljs-literal">nil</span> <span class="hljs-comment">// f will be closed if we return here.</span>
}
</code></pre>
<p>وتأجيل نداء دالة مثل <code>Close</code> له ميزتان. الأولى، أنه يضمن ألّا تنسى إغلاق الملف أبدًا، وهو خطأ يسهل الوقوع فيه إن حرّرت الدالة لاحقًا لإضافة مسار عودة جديد. الثانية، أن الإغلاق يجلس بجوار الفتح، وهو أوضح بكثير من وضعه في نهاية الدالة.</p>
<p>أما وسائط الدالة المؤجَّلة — وهي تشمل المُستقبِل إن كانت الدالة طريقة — فتُقوَّم لحظة تنفيذ <code>defer</code>، لا لحظة تنفيذ النداء. وبالإضافة إلى أنه يتفادى القلق من تغيّر قيم المتغيّرات أثناء تنفيذ الدالة، فإن هذا يعني أن موقع تأجيل واحد يمكنه تأجيل عدّة عمليات تنفيذ. إليك مثالًا ساذجًا:</p>
<pre><code class="language-go"><span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">5</span>; i++ {
    <span class="hljs-keyword">defer</span> fmt.Printf(<span class="hljs-string">&quot;%d &quot;</span>, i)
}
</code></pre>
<p>وتُنفَّذ الدوال المؤجَّلة بترتيب LIFO، أي أن آخر داخل أول خارج، فيطبع هذا الشيفرة <code>4 3 2 1 0</code> عند عودة الدالة. ومثال أكثر واقعية هو طريقة بسيطة لتتبّع تنفيذ الدوال عبر البرنامج. يمكننا كتابة دالّتَي تتبّع بسيطتين كالتاليتين:</p>
<pre><code class="language-go"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">trace</span><span class="hljs-params">(s <span class="hljs-type">string</span>)</span></span>   { fmt.Println(<span class="hljs-string">&quot;entering:&quot;</span>, s) }
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">untrace</span><span class="hljs-params">(s <span class="hljs-type">string</span>)</span></span> { fmt.Println(<span class="hljs-string">&quot;leaving:&quot;</span>, s) }

<span class="hljs-comment">// Use them like this:</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">a</span><span class="hljs-params">()</span></span> {
    trace(<span class="hljs-string">&quot;a&quot;</span>)
    <span class="hljs-keyword">defer</span> untrace(<span class="hljs-string">&quot;a&quot;</span>)
    <span class="hljs-comment">// do something....</span>
}
</code></pre>
<p>ويمكننا أن نفعل أفضل من ذلك باستغلال الحقيقة أن وسائط الدوال المؤجَّلة تُقوَّم لحظة تنفيذ <code>defer</code>. فيستطيع دالّة التتبّع أن تهيّئ وسيل دالّة إلغاء التتبّع. المثال الآتي:</p>
<pre><code class="language-go"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">trace</span><span class="hljs-params">(s <span class="hljs-type">string</span>)</span></span> <span class="hljs-type">string</span> {
    fmt.Println(<span class="hljs-string">&quot;entering:&quot;</span>, s)
    <span class="hljs-keyword">return</span> s
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">un</span><span class="hljs-params">(s <span class="hljs-type">string</span>)</span></span> {
    fmt.Println(<span class="hljs-string">&quot;leaving:&quot;</span>, s)
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">a</span><span class="hljs-params">()</span></span> {
    <span class="hljs-keyword">defer</span> un(trace(<span class="hljs-string">&quot;a&quot;</span>))
    fmt.Println(<span class="hljs-string">&quot;in a&quot;</span>)
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">b</span><span class="hljs-params">()</span></span> {
    <span class="hljs-keyword">defer</span> un(trace(<span class="hljs-string">&quot;b&quot;</span>))
    fmt.Println(<span class="hljs-string">&quot;in b&quot;</span>)
    a()
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">main</span><span class="hljs-params">()</span></span> {
    b()
}
</code></pre>
<p>يُطبع</p>
<pre><code class="language-text">entering: b
in b
entering: a
in a
leaving: a
leaving: b
</code></pre>
<p>وللمبرمجين المعتادين على إدارة الموارد على مستوى الكتلة في لغات أخرى، قد يبدو <code>defer</code> غريبًا، لكن أكثر تطبيقاته إثارةً وقوة تنبع تحديدًا من كونه غير قائم على الكتل بل على الدالة. وفي قسم <code>panic</code> و<code>recover</code> سنرى مثالًا آخر لإمكاناته.</p>
`,t={book:s,chapter:n,chapterTitle:a,slug:p,title:l,headings:e,html:c};export{s as book,n as chapter,a as chapterTitle,t as default,e as headings,c as html,p as slug,l as title};
