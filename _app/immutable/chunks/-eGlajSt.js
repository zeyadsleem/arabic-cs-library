const s="effective-go",n="data",a="البيانات",e="index",p="البيانات",l=[{depth:2,id:"التخصيص-بـ-new",text:"التخصيص بـ new"},{depth:2,id:"المنشئات-والقيم-المركبة",text:"المُنشئات والقيم المركّبة"},{depth:2,id:"التخصيص-بـ-make",text:"التخصيص بـ make"},{depth:2,id:"المصفوفات",text:"المصفوفات"},{depth:2,id:"الشرائح",text:"الشرائح"},{depth:2,id:"الشرائح-ثنائية-البعد",text:"الشرائح ثنائية البُعد"},{depth:2,id:"الخرائط",text:"الخرائط"},{depth:2,id:"الطباعة",text:"الطباعة"},{depth:2,id:"الإلحاق-بـ-append",text:"الإلحاق بـ append"}],c=`<h2 id="التخصيص-بـ-new">التخصيص بـ <code>new</code></h2>
<p>في Go عمليّتا تخصيص مدمجتان هما <code>new</code> و<code>make</code>. وهما تفعلان أشياء مختلفة وتنطبقان على أنواع مختلفة، وقد يكون هذا مربكًا، لكن القواعد بسيطة. فلنتحدّث عن <code>new</code> أولًا. هي دالة مدمجة تخصّص ذاكرة، لكنها بخلاف نظائرها في بعض اللغات الأخرى لا تُهيّئ الذاكرة، بل تصفّرها فقط. أي أن <code>new(T)</code> تخصّص تخزينًا مصفّرًا لمتغيّر جديد من نوع <code>T</code> وتُرجع عنوانه، وهو قيمة من نوع <code>*T</code>. وبمصطلح Go، فإنها تُرجع مؤشرًا إلى قيمة صفرية مُخصَّصة حديثًا من نوع <code>T</code>.</p>
<p>اعتبارًا من Go 1.26 تقبل <code>new</code> أيضًا تعبيرًا (قيمة) كوسيط، يحدّد القيمة الابتدائية للمتغيّر. فمثلًا، <code>new(int64(300))</code> تخصّص متغيّرًا جديدًا من نوع <code>int64</code> مهيّأً على 300 وتُرجع عنوانه.</p>
<p>ولأن الذاكرة التي تُرجعها <code>new</code> مصفّرة، فمن المفيد — عند تصميم بنى بياناتك — أن ترتّب بحيث يمكن استعمال القيمة الصفرية لكل نوع من دون تهيئة إضافية. وهذا يعني أن من يستعمل بنية البيانات يستطيع إنشاؤها بـ <code>new</code> ثم ينتقل مباشرة إلى العمل. فمثلًا، ينصّ توثيق <code>bytes.Buffer</code> على أن «القيمة الصفرية لـ <code>Buffer</code> هي مخزن فارغ جاهز للاستعمال». وكمثال مماثل، لا تملك <code>sync.Mutex</code> طريقة <code>Init</code> ولا مُنشئًا صريحًا؛ إذ يُعرَّف أن القيمة الصفرية لـ <code>sync.Mutex</code> هي قفل غير مقفل.</p>
<p>وهذه الخاصية — أن القيمة الصفرية مفيدة — تنتقل بالضرورة (تنتقل بالمسار). وتأمل التصريح التالي:</p>
<pre><code class="language-go"><span class="hljs-keyword">type</span> SyncedBuffer <span class="hljs-keyword">struct</span> {
    lock    sync.Mutex
    buffer  bytes.Buffer
}
</code></pre>
<p>قيم النوع <code>SyncedBuffer</code> تكون كذلك جاهزة للاستعمال فور تخصيصها أو بمجرّد التصريح عنها. وفي المقطع التالي، سيعمل <code>p</code> و<code>v</code> كلاهما بصورة صحيحة من دون ترتيب إضافي:</p>
<pre><code class="language-go">p := <span class="hljs-built_in">new</span>(SyncedBuffer)  <span class="hljs-comment">// type *SyncedBuffer</span>
<span class="hljs-keyword">var</span> v SyncedBuffer      <span class="hljs-comment">// type  SyncedBuffer</span>
</code></pre>
<h2 id="المنشئات-والقيم-المركبة">المُنشئات والقيم المركّبة</h2>
<p>أحيانًا لا تكفي القيمة الصفرية، فيكون مُنشئ تهيئة ضروريًا، كما في هذا المثال المستمدّ من الحزمة <code>os</code>:</p>
<pre><code class="language-go"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">NewFile</span><span class="hljs-params">(fd <span class="hljs-type">int</span>, name <span class="hljs-type">string</span>)</span></span> *File {
    <span class="hljs-keyword">if</span> fd &lt; <span class="hljs-number">0</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">nil</span>
    }
    f := <span class="hljs-built_in">new</span>(File)
    f.fd = fd
    f.name = name
    f.dirinfo = <span class="hljs-literal">nil</span>
    f.nepipe = <span class="hljs-number">0</span>
    <span class="hljs-keyword">return</span> f
}
</code></pre>
<p>الكثير من العمل التكراري هنا. يمكننا تبسيطه باستعمال قيمة مركّبة ، وهي تعبير ينشئ نسخة جديدة في كل مرة يُقوَّم فيها:</p>
<pre><code class="language-go"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">NewFile</span><span class="hljs-params">(fd <span class="hljs-type">int</span>, name <span class="hljs-type">string</span>)</span></span> *File {
    <span class="hljs-keyword">if</span> fd &lt; <span class="hljs-number">0</span> {
        <span class="hljs-keyword">return</span> <span class="hljs-literal">nil</span>
    }
    f := File{fd, name, <span class="hljs-literal">nil</span>, <span class="hljs-number">0</span>}
    <span class="hljs-keyword">return</span> &amp;f
}
</code></pre>
<p>ولاحظ أنه، بخلاف C، لا مانع إطلاقًا من إرجاع عنوان متغيّر محلي؛ فالتخزين المرتبط بالمتغيّر يبقى حيًّا بعد عودة الدالة. بل إن أخذ عنوان قيمة مركّبة يخصّص نسخة جديدة في كل مرة يُقوَّم فيها، ومن ثمّ يمكننا جمع السطرين الأخيرين معًا:</p>
<pre><code class="language-go"><span class="hljs-keyword">return</span> &amp;File{fd, name, <span class="hljs-literal">nil</span>, <span class="hljs-number">0</span>}
</code></pre>
<p>وتُرتَّب حقول القيمة المركّبة بالترتيب ويجب أن تكون جميعها موجودة. لكن بتسمية العناصر صراحةً كأزواج <code>field:value</code> يمكن أن تظهر المهيّئات بأي ترتيب، ويُترك الناقص منها على قيمته الصفرية. فيمكننا القول:</p>
<pre><code class="language-go"><span class="hljs-keyword">return</span> &amp;File{fd: fd, name: name}
</code></pre>
<p>وكحالة حدّية، إذا لم تحتو قيمة مركّبة على أي حقول، فإنها تنشئ قيمة صفرية للنوع. وتعبيرا <code>new(File)</code> و<code>&amp;File{}</code> متكافئان.</p>
<p>ويمكن أيضًا إنشاء قيم مركّبة للمصفوفات والشرائح والخرائط، وتكون تسميات الحقول فيها فهارس أو مفاتيح خريطة بحسب الحال. وفي هذه الأمثلة يعمل التهيئة مهما كانت قيم <code>Enone</code> و<code>Eio</code> و<code>Einval</code>، ما دامت متمايزة:</p>
<pre><code class="language-go">a := [...]<span class="hljs-type">string</span>   {Enone: <span class="hljs-string">&quot;no error&quot;</span>, Eio: <span class="hljs-string">&quot;Eio&quot;</span>, Einval: <span class="hljs-string">&quot;invalid argument&quot;</span>}
s := []<span class="hljs-type">string</span>      {Enone: <span class="hljs-string">&quot;no error&quot;</span>, Eio: <span class="hljs-string">&quot;Eio&quot;</span>, Einval: <span class="hljs-string">&quot;invalid argument&quot;</span>}
m := <span class="hljs-keyword">map</span>[<span class="hljs-type">int</span>]<span class="hljs-type">string</span>{Enone: <span class="hljs-string">&quot;no error&quot;</span>, Eio: <span class="hljs-string">&quot;Eio&quot;</span>, Einval: <span class="hljs-string">&quot;invalid argument&quot;</span>}
</code></pre>
<h2 id="التخصيص-بـ-make">التخصيص بـ <code>make</code></h2>
<p>لنعد إلى التخصيص. الدالة المدمجة <code>make(T, args)</code> تخدم غرضًا مختلفًا عن <code>new(T)</code>. فهي تنشئ الشرائح والخرائط والقنوات فقط، وتُرجع قيمة مهيّأة (لا مصفّرة) من نوع <code>T</code> (لا <code>*T</code>). والسبب في هذا التمييز أن هذه الأنواع الثلاثة تمثّل، في باطنها، مراجع إلى بنى بيانات يجب تهيئتها قبل الاستعمال. فالشريحة مثلًا واصف من ثلاثة عناصر: مؤشر إلى البيانات (داخل مصفوفة)، والطول، والسعة؛ وإلى أن تُهيّأ هذه العناصر تبقى الشريحة <code>nil</code>. أمّا بالنسبة للشرائح والخرائط والقنوات، فإن <code>make</code> تهيّئ بنية البيانات الداخلية وتُهيّئ القيمة للاستعمال. فمثلًا:</p>
<pre><code class="language-go"><span class="hljs-built_in">make</span>([]<span class="hljs-type">int</span>, <span class="hljs-number">10</span>, <span class="hljs-number">100</span>)
</code></pre>
<p>يخصّص مصفوفة من مئة عدد صحيح، ثم ينشئ بنية شريحة طولها 10 وسعتها 100 تشير إلى أول عشرة عناصر من المصفوفة. (وعند إنشاء شريحة يمكن حذف السعة؛ انظر قسم الشرائح لمزيد من المعلومات.) وفي المقابل، تُرجع <code>new([]int)</code> مؤشرًا إلى بنية شريحة مُخصَّصة حديثًا ومصفّرة، أي مؤشرًا إلى قيمة شريحة <code>nil</code>.</p>
<p>وتوضّح هذه الأمثلة الفرق بين <code>new</code> و<code>make</code>:</p>
<pre><code class="language-go"><span class="hljs-keyword">var</span> p *[]<span class="hljs-type">int</span> = <span class="hljs-built_in">new</span>([]<span class="hljs-type">int</span>)       <span class="hljs-comment">// allocates slice structure; *p == nil; rarely useful</span>
<span class="hljs-keyword">var</span> v  []<span class="hljs-type">int</span> = <span class="hljs-built_in">make</span>([]<span class="hljs-type">int</span>, <span class="hljs-number">100</span>) <span class="hljs-comment">// the slice v now refers to a new array of 100 ints</span>

<span class="hljs-comment">// Unnecessarily complex:</span>
<span class="hljs-keyword">var</span> p *[]<span class="hljs-type">int</span> = <span class="hljs-built_in">new</span>([]<span class="hljs-type">int</span>)
*p = <span class="hljs-built_in">make</span>([]<span class="hljs-type">int</span>, <span class="hljs-number">100</span>, <span class="hljs-number">100</span>)

<span class="hljs-comment">// Idiomatic:</span>
v := <span class="hljs-built_in">make</span>([]<span class="hljs-type">int</span>, <span class="hljs-number">100</span>)
</code></pre>
<p>وتذكّر أن <code>make</code> تنطبق على الخرائط والشرائح والقنوات فقط، ولا تُرجع مؤشرًا. فإذا أردت مؤشرًا صريحًا، فخصّص بـ <code>new</code> أو خذ عنوان متغيّر صراحةً.</p>
<h2 id="المصفوفات">المصفوفات</h2>
<p>المصفوفات مفيدة عند التخطيط لتخطيط الذاكرة التفصيلي، وقد تساعد أحيانًا على تجنّب التخصيص، لكنها فوق ذلك لبنة بناء للشرائح، وهي موضوع القسم التالي. ولتهيئة الأرض لهذا الموضوع، إليك بضع كلمات عن المصفوفات.</p>
<p>هناك فروق جوهرية بين طريقة عمل المصفوفات في Go وفي C. ففي Go:</p>
<ul>
<li>
<p>المصفوفات قيم. فإسناد مصفوفة إلى أخرى ينسخ كل عناصرها.</p>
</li>
<li>
<p>وعلى وجه التحديد، إن مرّرت مصفوفة إلى دالة فستستقبل نسخة من المصفوفة، لا مؤشرًا إليها.</p>
</li>
</ul>
<p>وحجم المصفوفة جزء من نوعها. فالنوعان <code>[10]int</code> و<code>[20]int</code> مختلفان.</p>
<p>وقد تكون خاصية القيمة مفيدة، لكنها مكلفة أيضًا؛ فإذا أردت سلوك C وكفاءته، يمكنك تمرير مؤشر إلى المصفوفة:</p>
<pre><code class="language-go"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">Sum</span><span class="hljs-params">(a *[3]<span class="hljs-type">float64</span>)</span></span> (sum <span class="hljs-type">float64</span>) {
    <span class="hljs-keyword">for</span> _, v := <span class="hljs-keyword">range</span> *a {
        sum += v
    }
    <span class="hljs-keyword">return</span>
}

array := [...]<span class="hljs-type">float64</span>{<span class="hljs-number">7.0</span>, <span class="hljs-number">8.5</span>, <span class="hljs-number">9.1</span>}
x := Sum(&amp;array)  <span class="hljs-comment">// Note the explicit address-of operator</span>
</code></pre>
<p>لكن حتى هذا الأسلوب ليس من أعراف Go. استعمل الشرائح بدلًا منه.</p>
<h2 id="الشرائح">الشرائح</h2>
<p>تغلّف الشرائح المصفوفات لتقدّم واجهة أكثر عمومية وقوة وملاءمة لتسلسلات البيانات. فباستثناء العناصر ذات البُعد الصريح مثل مصفوفات التحويل (matrices)، فإن معظم البرمجة بالمصفوفات في Go تتم بالشرائح لا بالمصفوفات المجرّدة.</p>
<p>تحمل الشرائح مراجع إلى مصفوفة تقف خلفها، فإذا أسندت شريحة إلى أخرى فإن كلتيهما تشير إلى المصفوفة نفسها. فإذا أخذت دالة شريحة كوسيط، فإن ما تُحدثه فيها من تغيير على عناصر الشريحة سيكون مرئيًا لدى المنادي، على تشابه تمرير مؤشر إلى المصفوفة التي تقف خلفها. ومن ثمّ تستطيع دالة <code>Read</code> أن تقبل شريحة كوسيط بدل مؤشر وعدد؛ فالطول داخل الشريحة يحدّد أقصى مقدار بيانات يُقرأ. وإليك توقيع طريقة <code>Read</code> على النوع <code>File</code> في الحزمة <code>os</code>:</p>
<pre><code class="language-go"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(f *File)</span></span> Read(buf []<span class="hljs-type">byte</span>) (n <span class="hljs-type">int</span>, err <span class="hljs-type">error</span>)
</code></pre>
<p>وتُرجع الطريقة عدد البايتات المقروءة وقيمة خطأ إن وُجدت. ولقراءة أول 32 بايت في مخزن أكبر <code>buf</code>، شقّ المخزن (وهنا تُستعمل «الشق» كفعل):</p>
<pre><code class="language-go">n, err := f.Read(buf[<span class="hljs-number">0</span>:<span class="hljs-number">32</span>])
</code></pre>
<p>وهذا النوع من التشقيق شائع وفعّال. بل إننا لو تجاهلنا الكفاءة لحظة، لكان المقطع التالي يقرأ أيضًا أول 32 بايت من المخزن:</p>
<pre><code class="language-go"><span class="hljs-keyword">var</span> n <span class="hljs-type">int</span>
<span class="hljs-keyword">var</span> err <span class="hljs-type">error</span>
<span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; <span class="hljs-number">32</span>; i++ {
    nbytes, e := f.Read(buf[i:i+<span class="hljs-number">1</span>])  <span class="hljs-comment">// Read one byte.</span>
    n += nbytes
    <span class="hljs-keyword">if</span> nbytes == <span class="hljs-number">0</span> || e != <span class="hljs-literal">nil</span> {
        err = e
        <span class="hljs-keyword">break</span>
    }
}
</code></pre>
<p>يمكن تغيير طول الشريحة ما دام لا يزال ضمن حدود المصفوفة التي تقف خلفها؛ يكفي أن تسندها إلى شريحة من نفسها. أمّا سعة الشريحة، التي تُتاح بالدالة المدمجة <code>cap</code>، فتُخبرك بأقصى طول يمكن أن تبلغه الشريحة. وإليك دالة تُلحق بيانات بشريحة. فإذا تجاوزت البيانات السعة، تُعاد تخصيص الشريحة، وتُعاد الشريحة الناتجة. وتستعمل الدالة الحقيقة بأن <code>len</code> و<code>cap</code> قانونيتان عند تطبيقهما على الشريحة <code>nil</code>، وأنهما تُرجعان 0:</p>
<pre><code class="language-go"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">Append</span><span class="hljs-params">(slice, data []<span class="hljs-type">byte</span>)</span></span> []<span class="hljs-type">byte</span> {
    l := <span class="hljs-built_in">len</span>(slice)
    <span class="hljs-keyword">if</span> l + <span class="hljs-built_in">len</span>(data) &gt; <span class="hljs-built_in">cap</span>(slice) {  <span class="hljs-comment">// reallocate</span>
        <span class="hljs-comment">// Allocate double what&#x27;s needed, for future growth.</span>
        newSlice := <span class="hljs-built_in">make</span>([]<span class="hljs-type">byte</span>, (l+<span class="hljs-built_in">len</span>(data))*<span class="hljs-number">2</span>)
        <span class="hljs-comment">// The copy function is predeclared and works for any slice type.</span>
        <span class="hljs-built_in">copy</span>(newSlice, slice)
        slice = newSlice
    }
    slice = slice[<span class="hljs-number">0</span>:l+<span class="hljs-built_in">len</span>(data)]
    <span class="hljs-built_in">copy</span>(slice[l:], data)
    <span class="hljs-keyword">return</span> slice
}
</code></pre>
<p>ولازم أن نُرجع الشريحة بعد ذلك، لأن <code>Append</code> تستطيع تعديل عناصر <code>slice</code>، لكن الشريحة نفسها — وهي بنية بيانات وقت التشغيل التي تحمل المؤشر والطول والسعة — تُمرَّر بالقيمة.</p>
<p>وفكرة إلحاق البيانات بشريحة مفيدة إلى حدّ بعيد لدرجة أن <code>append</code> المدمجة التقطتها. لكن لفهم تصميم تلك الدالة نحتاج إلى معلومة إضافية قليلًا، لذا سنعود إليها لاحقًا.</p>
<h2 id="الشرائح-ثنائية-البعد">الشرائح ثنائية البُعد</h2>
<p>مصفوفات Go وشرائحها أحادية البُعد. ولإنشاء ما يماثل مصفوفة أو شريحة ثنائية البُعد، فلا بدّ من تعريف مصفوفة من المصفوفات أو شريحة من الشرائح، هكذا:</p>
<pre><code class="language-go"><span class="hljs-keyword">type</span> Transform [<span class="hljs-number">3</span>][<span class="hljs-number">3</span>]<span class="hljs-type">float64</span>  <span class="hljs-comment">// A 3x3 array, really an array of arrays.</span>
<span class="hljs-keyword">type</span> LinesOfText [][]<span class="hljs-type">byte</span>     <span class="hljs-comment">// A slice of byte slices.</span>
</code></pre>
<p>ولأن الشرائح متغيّرة الطول، فمن الممكن أن تكون كل شريحة داخلية بطول مختلف. وقد يكون ذلك موقفًا شائعًا، كما في مثال <code>LinesOfText</code> عندنا: فكل سطر له طول مستقل.</p>
<pre><code class="language-go">text := LinesOfText{
    []<span class="hljs-type">byte</span>(<span class="hljs-string">&quot;Now is the time&quot;</span>),
    []<span class="hljs-type">byte</span>(<span class="hljs-string">&quot;for all good gophers&quot;</span>),
    []<span class="hljs-type">byte</span>(<span class="hljs-string">&quot;to bring some fun to the party.&quot;</span>),
}
</code></pre>
<p>وأحيانًا لا بدّ من تخصيص شريحة ثنائية البُعد، وقد ينشأ هذا الموقف عند معالجة أسطر بكسلات ممسوحة ضوئيًا مثلًا. وهناك طريقتان لتحقيق ذلك. إحداهما تخصيص كل شريحة على حدة، والأخرى تخصيص مصفوفة واحدة وتوجيه الشرائح الفرعية إليها. أيّهما تستعمل يعتمد على تطبيقك. فإن كانت الشرائح قد تنمو أو تنكمش، فينبغي تخصيصها على حدة تفاديًا لمحو السطر التالي؛ وإن لم تكن كذلك، فقد يكون بناء الكائن بتخصيص واحد أكثر كفاءة. وللإرشاد، إليك مخطّط الطريقتين. أولًا، سطرًا سطرًا:</p>
<pre><code class="language-go"><span class="hljs-comment">// Allocate the top-level slice.</span>
picture := <span class="hljs-built_in">make</span>([][]<span class="hljs-type">uint8</span>, YSize) <span class="hljs-comment">// One row per unit of y.</span>
<span class="hljs-comment">// Loop over the rows, allocating the slice for each row.</span>
<span class="hljs-keyword">for</span> i := <span class="hljs-keyword">range</span> picture {
    picture[i] = <span class="hljs-built_in">make</span>([]<span class="hljs-type">uint8</span>, XSize)
}
</code></pre>
<p>والآن كخصيص واحد، مشقوقًا إلى أسطر:</p>
<pre><code class="language-go"><span class="hljs-comment">// Allocate the top-level slice, the same as before.</span>
picture := <span class="hljs-built_in">make</span>([][]<span class="hljs-type">uint8</span>, YSize) <span class="hljs-comment">// One row per unit of y.</span>
<span class="hljs-comment">// Allocate one large slice to hold all the pixels.</span>
pixels := <span class="hljs-built_in">make</span>([]<span class="hljs-type">uint8</span>, XSize*YSize) <span class="hljs-comment">// Has type []uint8 even though picture is [][]uint8.</span>
<span class="hljs-comment">// Loop over the rows, slicing each row from the front of the remaining pixels slice.</span>
<span class="hljs-keyword">for</span> i := <span class="hljs-keyword">range</span> picture {
    picture[i], pixels = pixels[:XSize], pixels[XSize:]
}
</code></pre>
<h2 id="الخرائط">الخرائط</h2>
<p>الخرائط بنية بيانات مدمجة مريحة وقوية تربط قيمًا من نوع (المفتاح) بقيم من نوع آخر (العنصر أو القيمة). ويمكن أن يكون المفتاح من أي نوع يُعرَّف له معامل المساواة، مثل الأعداد الصحيحة، والأعداد العشرية والمركّبة، والنصوص، والمؤشرات، والواجهات (ما دام النوع الديناميكي يدعم المساواة)، والبنيات، والمصفوفات. ولا يمكن استعمال الشرائح كمفاتيح خريطة، لأن المساواة غير معرَّفة عليها. وكالشرائح، تحمل الخرائط مراجع إلى بنية بيانات تقف خلفها. فإذا مرّرت خريطة إلى دالة تُغيّر محتواها، فإن التغييرات ستكون مرئية لدى المنادي.</p>
<p>ويمكن بناء الخرائط بالصيغة المعتادة للقيمة المركّبة، بأزواج مفتاح وقيمة مفصولة بنقطتين،فمن السهل بناؤها أثناء التهيئة:</p>
<pre><code class="language-go"><span class="hljs-keyword">var</span> timeZone = <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-type">int</span>{
    <span class="hljs-string">&quot;UTC&quot;</span>:  <span class="hljs-number">0</span>*<span class="hljs-number">60</span>*<span class="hljs-number">60</span>,
    <span class="hljs-string">&quot;EST&quot;</span>: <span class="hljs-number">-5</span>*<span class="hljs-number">60</span>*<span class="hljs-number">60</span>,
    <span class="hljs-string">&quot;CST&quot;</span>: <span class="hljs-number">-6</span>*<span class="hljs-number">60</span>*<span class="hljs-number">60</span>,
    <span class="hljs-string">&quot;MST&quot;</span>: <span class="hljs-number">-7</span>*<span class="hljs-number">60</span>*<span class="hljs-number">60</span>,
    <span class="hljs-string">&quot;PST&quot;</span>: <span class="hljs-number">-8</span>*<span class="hljs-number">60</span>*<span class="hljs-number">60</span>,
}
</code></pre>
<p>وإسناد قيم الخريطة وجلبها يبدو نحويًا كتمامه تمامًا مع المصفوفات والشرائح، إلا أن الفهرس لا يلزم أن يكون عددًا صحيحًا:</p>
<pre><code class="language-go">offset := timeZone[<span class="hljs-string">&quot;EST&quot;</span>]
</code></pre>
<p>ومحاولة جلب قيمة من الخريطة بمفتاح غير موجود فيها تُرجع القيمة الصفرية لنوع مدخلات الخريطة. فمثلًا، إذا كانت الخريطة تحتوي أعدادًا صحيحة، فإن البحث عن مفتاح غير موجود سيُرجع <code>0</code>. ويمكن تنفيذ مجموعة (set) في صورة خريطة من نوع قيمة <code>bool</code>: ضع مدخل الخريطة على <code>true</code> لإدراج القيمة في المجموعة، ثم اختبرها بفهرسة بسيطة:</p>
<pre><code class="language-go">attended := <span class="hljs-keyword">map</span>[<span class="hljs-type">string</span>]<span class="hljs-type">bool</span>{
    <span class="hljs-string">&quot;Ann&quot;</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-string">&quot;Joe&quot;</span>: <span class="hljs-literal">true</span>,
    ...
}

<span class="hljs-keyword">if</span> attended[person] { <span class="hljs-comment">// will be false if person is not in the map</span>
    fmt.Println(person, <span class="hljs-string">&quot;was at the meeting&quot;</span>)
}
</code></pre>
<p>وأحيانًا تحتاج أن تميّز بين مدخل غائب وقيمة صفرية. فهل يوجد مدخل لـ <code>&quot;UTC&quot;</code> أم أن هذا الصفر لأن المفتاح غير موجود أصلًا في الخريطة؟ يمكنك التمييز بصورة من صور الإسناد المتعدّد:</p>
<pre><code class="language-go"><span class="hljs-keyword">var</span> seconds <span class="hljs-type">int</span>
<span class="hljs-keyword">var</span> ok <span class="hljs-type">bool</span>
seconds, ok = timeZone[tz]
</code></pre>
<p>ولأسباب بديهية يُسمّى هذا «عرف الفاصلة-والـ ok». ففي هذا المثال، إن كان <code>tz</code> موجودًا، فإن <code>seconds</code> سيُضبط بصورة صحيحة ويكون <code>ok</code> صحيحًا؛ وإن لم يكن موجودًا، فإن <code>seconds</code> سيُضبط على صفر ويكون <code>ok</code> خاطئًا. وإليك دالة تجمع ذلك مع تقرير خطأ لائق:</p>
<pre><code class="language-go"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">offset</span><span class="hljs-params">(tz <span class="hljs-type">string</span>)</span></span> <span class="hljs-type">int</span> {
    <span class="hljs-keyword">if</span> seconds, ok := timeZone[tz]; ok {
        <span class="hljs-keyword">return</span> seconds
    }
    log.Println(<span class="hljs-string">&quot;unknown time zone:&quot;</span>, tz)
    <span class="hljs-keyword">return</span> <span class="hljs-number">0</span>
}
</code></pre>
<p>ولاختبار وجود المفتاح في الخريطة دون عناية بالقيمة الفعلية، يمكنك استعمال المُعرِّف الفارغ (<code>_</code>) مكان المتغيّر المعتاد للقيمة:</p>
<pre><code class="language-go">_, present := timeZone[tz]
</code></pre>
<p>ولحذف مدخل من خريطة، استعمل الدالة المدمجة <code>delete</code>، ووسائطها هي الخريطة والمفتاح المراد حذفه. والأمر آمن حتى لو كان المفتاح غائبًا من الخريطة أصلًا:</p>
<pre><code class="language-go"><span class="hljs-built_in">delete</span>(timeZone, <span class="hljs-string">&quot;PDT&quot;</span>)  <span class="hljs-comment">// Now on Standard Time</span>
</code></pre>
<h2 id="الطباعة">الطباعة</h2>
<p>الطباعة المنسّقة في Go تستعمل أسلوبًا شبيهًا بعائلة <code>printf</code> في C، لكنه أغنى وأعمّ. وتقع هذه الدوال في الحزمة <code>fmt</code> ولأسمائها حروف كبيرة: <code>fmt.Printf</code> و<code>fmt.Fprintf</code> و<code>fmt.Sprintf</code> وما شابه. أما دوال النصوص (<code>Sprintf</code> وغيرها) فتُرجع نصًّا بدل ملء مخزن مقدَّم.</p>
<p>ولا يلزمك أن تقدّم نصّ تنسيق. فلكل من <code>Printf</code> و<code>Fprintf</code> و<code>Sprintf</code> زوجٌ آخر من الدوال، مثل <code>Print</code> و<code>Println</code>. وهذه الدوال لا تأخذ نصّ تنسيق، بل تولّد تنسيقًا افتراضيًا لكل وسيط. ونسخ <code>Println</code> تُدرج أيضًا مسافة بين الوسائط وتُلحق سطرًا جديدًا بالمخرجات، بينما لا تضيف نسخ <code>Print</code> مسافات إلا إذا لم يكن أيٌّ من المعاملين على جانبيها نصًّا. وفي هذا المثال يُنتج كل سطر المخرجات نفسها:</p>
<pre><code class="language-go">fmt.Printf(<span class="hljs-string">&quot;Hello %d\\n&quot;</span>, <span class="hljs-number">23</span>)
fmt.Fprint(os.Stdout, <span class="hljs-string">&quot;Hello &quot;</span>, <span class="hljs-number">23</span>, <span class="hljs-string">&quot;\\n&quot;</span>)
fmt.Println(<span class="hljs-string">&quot;Hello&quot;</span>, <span class="hljs-number">23</span>)
fmt.Println(fmt.Sprint(<span class="hljs-string">&quot;Hello &quot;</span>, <span class="hljs-number">23</span>))
</code></pre>
<p>وتأخذ دوال <code>fmt.Fprint</code> المطبوعة وأخواتها كأول وسيط أي كائن ينفّذ واجهة <code>io.Writer</code>؛ والمتغيّران <code>os.Stdout</code> و<code>os.Stderr</code> مثالان مألوفان.</p>
<p>هنا تبدأ الأمور في الانفصال عن C. فأولًا، تنسيقات الأعداد مثل <code>%d</code> لا تأخذ رايات عن الإشارة أو الحجم؛ بل تستعمل دوال الطباعة نوع الوسيط لتقرّر هذه الخصائص:</p>
<pre><code class="language-go"><span class="hljs-keyword">var</span> x <span class="hljs-type">uint64</span> = <span class="hljs-number">1</span>&lt;&lt;<span class="hljs-number">64</span> - <span class="hljs-number">1</span>
fmt.Printf(<span class="hljs-string">&quot;%d %x; %d %x\\n&quot;</span>, x, x, <span class="hljs-type">int64</span>(x), <span class="hljs-type">int64</span>(x))
</code></pre>
<p>يُطبع</p>
<pre><code class="language-text">18446744073709551615 ffffffffffffffff; -1 -1
</code></pre>
<p>وإن كنت تريد التحويل الافتراضي فحسب، مثل النظام العشري للأعداد الصحيحة، فيمكنك استعمال تنسيق الالتقاط <code>%v</code> (أي «value»)، والنتيجة هي ما تنتجه <code>Print</code> و<code>Println</code> بالضبط. وفضلًا عن ذلك، يستطيع هذا التنسيق طباعة أي قيمة، حتى المصفوفات والشرائح والبنيات والخرائط. وإليك جملة طباعة لخريطة المناطق الزمنية المعرّفة في القسم السابق:</p>
<pre><code class="language-go">fmt.Printf(<span class="hljs-string">&quot;%v\\n&quot;</span>, timeZone)  <span class="hljs-comment">// or just fmt.Println(timeZone)</span>
</code></pre>
<p>فتُنتج المخرجات:</p>
<pre><code class="language-text">map[CST:-21600 EST:-18000 MST:-25200 PST:-28800 UTC:0]
</code></pre>
<p>أمّا في الخرائط، فإن <code>Printf</code> وأخواتها ترتّب المخرجات معجميًا حسب المفتاح.</p>
<p>وعند طباعة بنية، فإن التنسيق المعدّل <code>%+v</code> يُضيف أسماء الحقول إلى بنية الـ struct، وأي قيمة تُطبع بالتنسيق البديل <code>%#v</code> تُطبع بصيغة Go الكاملة:</p>
<pre><code class="language-go"><span class="hljs-keyword">type</span> T <span class="hljs-keyword">struct</span> {
    a <span class="hljs-type">int</span>
    b <span class="hljs-type">float64</span>
    c <span class="hljs-type">string</span>
}
t := &amp;T{ <span class="hljs-number">7</span>, <span class="hljs-number">-2.35</span>, <span class="hljs-string">&quot;abc\\tdef&quot;</span> }
fmt.Printf(<span class="hljs-string">&quot;%v\\n&quot;</span>, t)
fmt.Printf(<span class="hljs-string">&quot;%+v\\n&quot;</span>, t)
fmt.Printf(<span class="hljs-string">&quot;%#v\\n&quot;</span>, t)
fmt.Printf(<span class="hljs-string">&quot;%#v\\n&quot;</span>, timeZone)
</code></pre>
<p>يُطبع</p>
<pre><code class="language-text">&amp;{7 -2.35 abc   def}
&amp;{a:7 b:-2.35 c:abc     def}
&amp;main.T{a:7, b:-2.35, c:&quot;abc\\tdef&quot;}
map[string]int{&quot;CST&quot;:-21600, &quot;EST&quot;:-18000, &quot;MST&quot;:-25200, &quot;PST&quot;:-28800, &quot;UTC&quot;:0}
</code></pre>
<p>(لاحظ علامتَي &amp;.)</p>
<p>وتنسيق النص المقتبس هذا متاح أيضًا عبر <code>%q</code> عند تطبيقه على قيمة من نوع <code>string</code> أو <code>[]byte</code>. أما التنسيق البديل <code>%#q</code> فيستعمل علامتَي backquote إن أمكن. (وينطبق تنسيق <code>%q</code> أيضًا على الأعداد الصحيحة و<code>rune</code>، فيُنتج ثابت <code>rune</code> محاطًا بعلامة اقتباس مفردة.) كما يعمل <code>%x</code> على النصوص ومصفوفات البايت وشرائح البايت، إضافةً إلى الأعداد الصحيحة، فيُنتج نصًا سداسيًا طويلًا؛ ومع مسافة في التنسيق (<code>% x</code>) يضع مسافات بين البايتات.</p>
<p>وتنسيق مفيد آخر هو <code>%T</code>، الذي يطبع نوع القيمة:</p>
<pre><code class="language-go">fmt.Printf(<span class="hljs-string">&quot;%T\\n&quot;</span>, timeZone)
</code></pre>
<p>يُطبع</p>
<pre><code class="language-text">map[string]int
</code></pre>
<p>وإن أردت التحكّم في التنسيق الافتراضي لنوع مخصّص، فكل ما يلزم هو تعريف طريقة بتوقيع <code>String() string</code> على النوع. وبالنسبة إلى نوعنا البسيط <code>T</code>، قد يبدو هكذا:</p>
<pre><code class="language-go"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(t *T)</span></span> String() <span class="hljs-type">string</span> {
    <span class="hljs-keyword">return</span> fmt.Sprintf(<span class="hljs-string">&quot;%d/%g/%q&quot;</span>, t.a, t.b, t.c)
}
fmt.Printf(<span class="hljs-string">&quot;%v\\n&quot;</span>, t)
</code></pre>
<p>فيطبع بالتنسيق</p>
<pre><code class="language-text">7/-2.35/&quot;abc\\tdef&quot;
</code></pre>
<p>(وإن احتجت طباعة قيم من النوع <code>T</code> وكذلك مؤشرات إليه، فيجب أن يكون مُستقبِل <code>String</code> من نوع قيمة؛ استعمل هذا المثال مؤشرًا لأن ذلك أكثر كفاءة وأقرب لأعراف Go مع أنواع الـ struct. انظر القسم التالي عن المؤشرات مقابل مستقبِلات القيم.)</p>
<p>وتستطيع دالتنا <code>String</code> أن تنادي <code>Sprintf</code> لأن دوال الطباعة قابلة لإعادة الدخول تمامًا ويمكن تغليفها على هذا النحو. غير أن هناك تفصيلًا مهمًا يجب فهمه عن هذا الأسلوب: لا تبنِ دالة <code>String</code> بنداء <code>Sprintf</code> بطريقة تعود إلى دالتك <code>String</code> إلى ما لا نهاية. وقد يحدث هذا إذا حاول نداء <code>Sprintf</code> طباعة المُستقبِل مباشرةً كنص، فيستدعي الدالة من جديد. وهو خطأ شائع وسهل الوقوع، كما يبيّن هذا المثال:</p>
<pre><code class="language-go"><span class="hljs-keyword">type</span> MyString <span class="hljs-type">string</span>

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(m MyString)</span></span> String() <span class="hljs-type">string</span> {
    <span class="hljs-keyword">return</span> fmt.Sprintf(<span class="hljs-string">&quot;MyString=%s&quot;</span>, m) <span class="hljs-comment">// Error: will recur forever.</span>
}
</code></pre>
<p>وهو خطأ سهل الإصلاح أيضًا: حوّل الوسيط إلى نوع النص الأساسي، وهو نوع لا يملك الدالة:</p>
<pre><code class="language-go"><span class="hljs-keyword">type</span> MyString <span class="hljs-type">string</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(m MyString)</span></span> String() <span class="hljs-type">string</span> {
    <span class="hljs-keyword">return</span> fmt.Sprintf(<span class="hljs-string">&quot;MyString=%s&quot;</span>, <span class="hljs-type">string</span>(m)) <span class="hljs-comment">// OK: note conversion.</span>
}
</code></pre>
<p>وفي قسم التهيئة سنرى تقنية أخرى تتجنّب هذا العود.</p>
<p>وتقنية طباعة أخرى هي تمرير وسائط دالة طباعة مباشرةً إلى دالة طباعة مماثلة. فتوقيع <code>Printf</code> يستعمل النوع <code>...interface{}</code> لوسيطه الأخير ليبيّن أن عددًا اعتباطيًا من الوسائط (من أنواع اعتباطية) يمكن أن يأتي بعد نصّ التنسيق:</p>
<pre><code class="language-go"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">Printf</span><span class="hljs-params">(format <span class="hljs-type">string</span>, v ...<span class="hljs-keyword">interface</span>{})</span></span> (n <span class="hljs-type">int</span>, err <span class="hljs-type">error</span>) {
</code></pre>
<p>وداخل الدالة <code>Printf</code>، يتصرّف <code>v</code> كمتغيّر من نوع <code>[]interface{}</code>، لكن إن مُرّر إلى دالة أخرى تقبل وسائط اعتباطية، تصرّف كقائمة وسائط عادية. وإليك تنفيذ الدالة <code>log.Println</code> التي استعملناها أعلاه. فهي تمرّر وسائطها مباشرةً إلى <code>fmt.Sprintln</code> لإجراء التنسيق الفعلي:</p>
<pre><code class="language-go"><span class="hljs-comment">// Println prints to the standard logger in the manner of fmt.Println.</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">Println</span><span class="hljs-params">(v ...<span class="hljs-keyword">interface</span>{})</span></span> {
    std.Output(<span class="hljs-number">2</span>, fmt.Sprintln(v...))  <span class="hljs-comment">// Output takes parameters (int, string)</span>
}
</code></pre>
<p>ونكتب <code>...</code> بعد <code>v</code> في النداء المتداخل إلى <code>Sprintln</code> لنقول للمُصرِّف إنما عامِل <code>v</code> كقائمة وسائط؛ وإلا لتمرّر <code>v</code> كوسيط شريحة واحد.</p>
<p>وهناك المزيد مما لم نغطّه هنا عن الطباعة. راجع توثيق <code>godoc</code> للحزمة <code>fmt</code> للتفاصيل.</p>
<p>وبالمناسبة، يمكن أن يكون المعامل <code>...</code> من نوع محدّد، مثل <code>...int</code> في دالة <code>min</code> تختار الأصغر من قائمة أعداد صحيحة:</p>
<pre><code class="language-go"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">Min</span><span class="hljs-params">(a ...<span class="hljs-type">int</span>)</span></span> <span class="hljs-type">int</span> {
    min := <span class="hljs-type">int</span>(^<span class="hljs-type">uint</span>(<span class="hljs-number">0</span>) &gt;&gt; <span class="hljs-number">1</span>)  <span class="hljs-comment">// largest int</span>
    <span class="hljs-keyword">for</span> _, i := <span class="hljs-keyword">range</span> a {
        <span class="hljs-keyword">if</span> i &lt; min {
            min = i
        }
    }
    <span class="hljs-keyword">return</span> min
}
</code></pre>
<h2 id="الإلحاق-بـ-append">الإلحاق بـ <code>append</code></h2>
<p>لدينا الآن القطعة الناقصة التي احتجناها لشرح تصميم الدالة المدمجة <code>append</code>. وتوقيع <code>append</code> مختلف عن دالتنا <code>Append</code> المخصّصة أعلاه. ومخطّطه كالتالي:</p>
<pre><code class="language-go"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">append</span><span class="hljs-params">(slice []T, elements ...T)</span></span> []T
</code></pre>
<p>حيث <code>T</code> بديل لأي نوع معطى. ولا يمكنك فعليًا كتابة دالة في Go يكون فيها النوع <code>T</code> محدَّدًا من المنادي. ومن هنا كانت <code>append</code> مدمجة: فهي تحتاج دعمًا من المُصرِّف.</p>
<p>وتفعل <code>append</code> أن تُلحق العناصر بنهاية الشريحة وتُرجع النتيجة. ولازم إرجاع النتيجة، لأن المصفوفة التي تقف خلفها قد تتغيّر، كما في <code>Append</code> التي كتبناها بأيدينا. فالمثال البسيط هذا</p>
<pre><code class="language-go">x := []<span class="hljs-type">int</span>{<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>}
x = <span class="hljs-built_in">append</span>(x, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>, <span class="hljs-number">6</span>)
fmt.Println(x)
</code></pre>
<p>يطبع <code>[1 2 3 4 5 6]</code>. فـ <code>append</code> تعمل بعض الشيء مثل <code>Printf</code>: تجمع عددًا اعتباطيًا من الوسائط.</p>
<p>لكن ماذا لو أردنا أن نفعل ما تفعله <code>Append</code> وأن نلحق شريحة بشريحة؟ الأمر سهل: استعمل <code>...</code> عند موقع النداء، تمامًا كما فعلنا في نداء <code>Output</code> أعلاه. وينتج هذا المقطع مخرجات مطابقة لما سبق:</p>
<pre><code class="language-go">x := []<span class="hljs-type">int</span>{<span class="hljs-number">1</span>,<span class="hljs-number">2</span>,<span class="hljs-number">3</span>}
y := []<span class="hljs-type">int</span>{<span class="hljs-number">4</span>,<span class="hljs-number">5</span>,<span class="hljs-number">6</span>}
x = <span class="hljs-built_in">append</span>(x, y...)
fmt.Println(x)
</code></pre>
<p>ولولا هذا <code>...</code> لما كانت الشيفرة لتُصرَّف أصلًا، لأن الأنواع ستكون خاطئة؛ فـ <code>y</code> ليست من نوع <code>int</code>.</p>
`,o={book:s,chapter:n,chapterTitle:a,slug:e,title:p,headings:l,html:c};export{s as book,n as chapter,a as chapterTitle,o as default,l as headings,c as html,e as slug,p as title};
