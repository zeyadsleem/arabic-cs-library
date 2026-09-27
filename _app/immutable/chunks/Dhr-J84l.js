const s="effective-go",n="interfaces-and-types",e="الواجهات وأنواع أخرى",a="index",p="الواجهات وأنواع أخرى",c=[{depth:2,id:"الواجهات",text:"الواجهات"},{depth:2,id:"التحويلات",text:"التحويلات"},{depth:2,id:"تحويلات-الواجهات-وتأكيدات-الأنواع",text:"تحويلات الواجهات وتأكيدات الأنواع"},{depth:2,id:"العمومية",text:"العمومية"},{depth:2,id:"الواجهات-والدوال",text:"الواجهات والدوال"}],o=`<h2 id="الواجهات">الواجهات</h2>
<p>توفّر الواجهات في Go وسيلة لتحديد سلوك كائن ما: إن كان هناك ما يستطيع عمل هذا، فيمكن استعماله هنا. وقد رأينا أمثلة بسيطة بالفعل: يمكن تنفيذ طابعات مخصّصة بطريقة <code>String</code>، بينما تستطيع <code>Fprintf</code> توليد مخرجات إلى أي شيء لديه طريقة <code>Write</code>.</p>
<p>والواجهات ذات الدالة أو الدالتين شائعة في شيفرة Go، وتُسمّى عادةً باسم مشتقّ من الدالة، مثل <code>io.Writer</code> لشيء ينفّذ <code>Write</code>.</p>
<p>ويمكن لنوع أن ينفّذ عدّة واجهات. فمثلًا، يمكن ترتيب مجموعة (collection) بواسطة الدوال في الحزمة <code>sort</code> إذا كانت تنفّذ <code>sort.Interface</code> التي تحوي <code>Len()</code> و<code>Less(i, j int) bool</code> و<code>Swap(i, j int)</code>، كما يمكن أن تكون لها أيضًا دالة تنسيق مخصّصة. وفي هذا المثال المتكلَّف، يشبع <code>Sequence</code> الاثنتين:</p>
<pre><code class="language-go"><span class="hljs-keyword">type</span> Sequence []<span class="hljs-type">int</span>

<span class="hljs-comment">// Methods required by sort.Interface.</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(s Sequence)</span></span> Len() <span class="hljs-type">int</span> {
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">len</span>(s)
}
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(s Sequence)</span></span> Less(i, j <span class="hljs-type">int</span>) <span class="hljs-type">bool</span> {
    <span class="hljs-keyword">return</span> s[i] &lt; s[j]
}
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(s Sequence)</span></span> Swap(i, j <span class="hljs-type">int</span>) {
    s[i], s[j] = s[j], s[i]
}

<span class="hljs-comment">// Copy returns a copy of the Sequence.</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(s Sequence)</span></span> Copy() Sequence {
    <span class="hljs-built_in">copy</span> := <span class="hljs-built_in">make</span>(Sequence, <span class="hljs-number">0</span>, <span class="hljs-built_in">len</span>(s))
    <span class="hljs-keyword">return</span> <span class="hljs-built_in">append</span>(<span class="hljs-built_in">copy</span>, s...)
}

<span class="hljs-comment">// Method for printing - sorts the elements before printing.</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(s Sequence)</span></span> String() <span class="hljs-type">string</span> {
    s = s.Copy() <span class="hljs-comment">// Make a copy; don&#x27;t overwrite argument.</span>
    sort.Sort(s)
    str := <span class="hljs-string">&quot;[&quot;</span>
    <span class="hljs-keyword">for</span> i, elem := <span class="hljs-keyword">range</span> s { <span class="hljs-comment">// Loop is O(N²); will fix that in next example.</span>
        <span class="hljs-keyword">if</span> i &gt; <span class="hljs-number">0</span> {
            str += <span class="hljs-string">&quot; &quot;</span>
        }
        str += fmt.Sprint(elem)
    }
    <span class="hljs-keyword">return</span> str + <span class="hljs-string">&quot;]&quot;</span>
}
</code></pre>
<h2 id="التحويلات">التحويلات</h2>
<p>دالة <code>String</code> لـ <code>Sequence</code> تعيد ما تفعله <code>Sprint</code> أصلًا للشرائح. (ولها أيضًا تعقيد O(N²) وهو سيّئ.) يمكننا أن نتقاسم الجهد — وأن نسرّعه أيضًا — إن حوّلنا <code>Sequence</code> إلى <code>[]int</code> مجرّدة قبل نداء <code>Sprint</code>:</p>
<pre><code class="language-go"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(s Sequence)</span></span> String() <span class="hljs-type">string</span> {
    s = s.Copy()
    sort.Sort(s)
    <span class="hljs-keyword">return</span> fmt.Sprint([]<span class="hljs-type">int</span>(s))
}
</code></pre>
<p>وهذه الدالة مثال آخر على تقنية التحويل المستعملة لاستدعاء <code>Sprintf</code> بأمان من داخل دالة <code>String</code>. فلأن النوعين — <code>Sequence</code> و<code>[]int</code> — متطابقان إن تجاهلنا اسم النوع، فإن التحويل بينهما قانوني. والتحويل لا ينشئ قيمة جديدة، وإنما يتصرّف مؤقتًا وكأن القيمة القائمة لها نوع جديد. (وهناك تحويلات أخرى قانونية، مثل من عدد صحيح إلى فاصلة عائمة، تنشئ قيمة جديدة فعلًا.)</p>
<p>ومن أعراف برامج Go أن تحوّل نوع تعبير ما للوصول إلى مجموعة دوال مختلفة. فمثلًا، يمكننا استعمال النوع الموجود بالفعل <code>sort.IntSlice</code> لنختصر المثال كله إلى:</p>
<pre><code class="language-go"><span class="hljs-keyword">type</span> Sequence []<span class="hljs-type">int</span>

<span class="hljs-comment">// Method for printing - sorts the elements before printing</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(s Sequence)</span></span> String() <span class="hljs-type">string</span> {
    s = s.Copy()
    sort.IntSlice(s).Sort()
    <span class="hljs-keyword">return</span> fmt.Sprint([]<span class="hljs-type">int</span>(s))
}
</code></pre>
<p>فبدلًا من أن يكون <code>Sequence</code> مشبّعًا لعدّة واجهات (الترتيب والطباعة)، نستخدم القدرة على تحويل عنصر البيانات إلى عدّة أنواع — <code>Sequence</code> و<code>sort.IntSlice</code> و<code>[]int</code> — كل واحد منها يؤدّي جزءًا من العمل. وهذه الممارسة أقل شيوعًا، لكنها قد تكون فعّالة.</p>
<h2 id="تحويلات-الواجهات-وتأكيدات-الأنواع">تحويلات الواجهات وتأكيدات الأنواع</h2>
<p>مُبدِّلات الأنواع صورة من صور التحويل: فهي تأخذ واجهة، ثم تحوّلها — في كل حالة داخل المُبدِّل — إلى نوع تلك الحالة. وإليك نسخة مبسّطة من الشيفرة الموجودة تحت <code>fmt.Printf</code> التي تحوّل قيمة إلى نصّ باستعمال مُبدِّل أنواع. فإن كانت القيمة نصًّا بالفعل، نريد قيمة النصّ الفعلية المحمّلة في الواجهة؛ أمّا إن كانت لديها دالة <code>String</code> فنريد نتيجة نداء الدالة:</p>
<pre><code class="language-go"><span class="hljs-keyword">type</span> Stringer <span class="hljs-keyword">interface</span> {
    String() <span class="hljs-type">string</span>
}

<span class="hljs-keyword">var</span> value <span class="hljs-keyword">interface</span>{} <span class="hljs-comment">// Value provided by caller.</span>
<span class="hljs-keyword">switch</span> str := value.(<span class="hljs-keyword">type</span>) {
<span class="hljs-keyword">case</span> <span class="hljs-type">string</span>:
    <span class="hljs-keyword">return</span> str
<span class="hljs-keyword">case</span> Stringer:
    <span class="hljs-keyword">return</span> str.String()
}
</code></pre>
<p>الحالة الأولى تجد قيمة محدّدة (concrete)، والثانية تحوّل الواجهة إلى واجهة أخرى. ومن السليم تمامًا أن تخلط الأنواع بهذه الطريقة.</p>
<p>وماذا إن كان هناك نوع واحد نهمّ به فحسب؟ إن كنا نعرف أن القيمة تحوي <code>string</code> ونريد مجرّد استخراجه؟ يكفي أن نستعمل مُبدِّل أنواع ذو حالة واحدة، لكن تأكيد النوع يفي بالغرض أيضًا. فتأكيد النوع يأخذ قيمة واجهة ويستخرج منها قيمةً من النوع الصريح المحدّد. وصياغته مستعارة من بند مُبدِّل الأنواع، لكن بنوع صريح بدل الكلمة المفتاحية <code>type</code>:</p>
<pre><code class="language-go">value.(typeName)
</code></pre>
<p>وتكون النتيجة قيمةً جديدة من النوع الساكن <code>typeName</code>. ويجب أن يكون هذا النوع إمّا النوع المحدّد الذي تحمله الواجهة، وإمّا نوع واجهة ثانية يمكن تحويل القيمة إليه. ولاستخراج النصّ الذي نعرف أنه في القيمة، يمكننا أن نكتب:</p>
<pre><code class="language-go">str := value.(<span class="hljs-type">string</span>)
</code></pre>
<p>لكن إن ثبت أن القيمة لا تحوي نصًّا، فإن البرنامج سينهار بخطأ وقت تشغيل. ولحماية نفسك من ذلك، استعمل عرف «الفاصلة، ok» لتختبر بأمان ما إذا كانت القيمة نصًّا:</p>
<pre><code class="language-go">str, ok := value.(<span class="hljs-type">string</span>)
<span class="hljs-keyword">if</span> ok {
    fmt.Printf(<span class="hljs-string">&quot;string value is: %q\\n&quot;</span>, str)
} <span class="hljs-keyword">else</span> {
    fmt.Printf(<span class="hljs-string">&quot;value is not a string\\n&quot;</span>)
}
</code></pre>
<p>وإن فشل تأكيد النوع، فإن <code>str</code> سيظل موجودًا ومن نوع string، لكنه سيحمل القيمة الصفرية، أي نصًّا فارغًا.</p>
<p>ولتوضيح هذه القدرة، إليك جملة <code>if</code>-<code>else</code> تكافئ مُبدِّل الأنواع الذي بدأنا به هذا القسم:</p>
<pre><code class="language-go"><span class="hljs-keyword">if</span> str, ok := value.(<span class="hljs-type">string</span>); ok {
    <span class="hljs-keyword">return</span> str
} <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> str, ok := value.(Stringer); ok {
    <span class="hljs-keyword">return</span> str.String()
}
</code></pre>
<h2 id="العمومية">العمومية</h2>
<p>إن كان وجود نوع ليس إلا لتنفيذ واجهة، ولن تُصدَّر له دوال خارج تلك الواجهة، فلا حاجة لتصدير النوع نفسه. فتصدير الواجهة وحدها يوضّح أن القيمة لا تملك سلوكًا لافتًا خارج ما تصفه الواجهة. كما أنه يتفادى الحاجة إلى تكرار التوثيق في كل موضع من مواضع دالة شائعة.</p>
<p>وفي هذه الحالات، ينبغي أن يُرجع المُنشئ قيمة واجهة بدل النوع المنفّذ. فمثلًا، في مكتبات التجزئة (hash) تُرجع كلٌّ من <code>crc32.NewIEEE</code> و<code>adler32.New</code> نوع الواجهة <code>hash.Hash32</code>. واستبدال خوارزمية CRC-32 بـ Adler-32 في برنامج Go لا يتطلّب سوى تغيير نداء المُنشئ؛ فبقية الشيفرة لا تتأثّر بتغيّر الخوارزمية.</p>
<p>ويتيح نهج مشابه فصل خوارزميات التعمية المتدفّقة (streaming ciphers) في حزم <code>crypto</code> المختلفة عن تشفيرات الكتل التي تتسلسل فوق بعضها. فالواجهة <code>Block</code> في حزمة <code>crypto/cipher</code> تصف سلوك تشفير كتلة، الذي يوفّر تشفير كتلة بيانات واحدة. ثم، قياسًا على حزمة <code>bufio</code>، يمكن لحزم التعمير التي تنفّذ هذه الواجهة أن تُستعمل لبناء تعميرات متدفّقة ممثَّلة بالواجهة <code>Stream</code>، من دون معرفة تفاصيل تشفير الكتل.</p>
<p>وتبدو واجهتا <code>crypto/cipher</code> كالتالي:</p>
<pre><code class="language-go"><span class="hljs-keyword">type</span> Block <span class="hljs-keyword">interface</span> {
    BlockSize() <span class="hljs-type">int</span>
    Encrypt(dst, src []<span class="hljs-type">byte</span>)
    Decrypt(dst, src []<span class="hljs-type">byte</span>)
}

<span class="hljs-keyword">type</span> Stream <span class="hljs-keyword">interface</span> {
    XORKeyStream(dst, src []<span class="hljs-type">byte</span>)
}
</code></pre>
<p>وهذا تعريف تعمير نمط العدّاد (CTR)، الذي يحوّل تشفير كتلة إلى تعمير متدفّق؛ ولاحظ أن تفاصيل تشفير الكتلة مُجرَّدة تمامًا:</p>
<pre><code class="language-go"><span class="hljs-comment">// NewCTR returns a Stream that encrypts/decrypts using the given Block in</span>
<span class="hljs-comment">// counter mode. The length of iv must be the same as the Block&#x27;s block size.</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">NewCTR</span><span class="hljs-params">(block Block, iv []<span class="hljs-type">byte</span>)</span></span> Stream
</code></pre>
<p>و<code>NewCTR</code> لا تنطبق على خوارزمية تشفير واحدة محدّدة ومصدر بيانات واحد فحسب، بل على أي تنفيذ للواجهة <code>Block</code> وأي <code>Stream</code>. ولأنها تُرجع قيم واجهات، فإن استبدال تشفير CTR بأنماط تشفير أخرى يبقى تغييرًا موضعيًا. فنداءات المُنشئات يجب تعديلها، لكن بما أن الشيفرة المحيطة لا بدّ أن تعامل الناتج على أنه <code>Stream</code> فحسب، فلن تلاحظ الفرق.</p>
<h2 id="الواجهات-والدوال">الواجهات والدوال</h2>
<p>لأن كل شيء تقريبًا يمكن ربط دوال به، فكل شيء تقريبًا يستطيع إشباع واجهة. ومن الأمثلة التوضيحية الحزمة <code>http</code> التي تعرّف الواجهة <code>Handler</code>. وأي كائن ينفّذ <code>Handler</code> يستطيع خدمة طلبات HTTP:</p>
<pre><code class="language-go"><span class="hljs-keyword">type</span> Handler <span class="hljs-keyword">interface</span> {
    ServeHTTP(ResponseWriter, *Request)
}
</code></pre>
<p>و<code>ResponseWriter</code> هي نفسها واجهة توفّر الوصول إلى الدوال اللازمة لإرجاع الاستجابة إلى العميل. وتشمل هذه الدوال الدالة المعتادة <code>Write</code>، ومن ثمّ يمكن استعمال <code>http.ResponseWriter</code> في كل موضع يمكن فيه استعمال <code>io.Writer</code>. أمّا <code>Request</code> فهو بنية تحوي تمثيلًا محلَّلًا للطلب القادم من العميل.</p>
<p>ولتبسيط العرض، لنتجاهل طلبات POST ونفترض أن طلبات HTTP هي دائمًا GET؛ هذا التبسيط لا يؤثّر في طريقة إعداد المعالجات. وإليك تنفيذًا تافهًا لمعالج يعدّ عدد مرات زيارة الصفحة:</p>
<pre><code class="language-go"><span class="hljs-comment">// Simple counter server.</span>
<span class="hljs-keyword">type</span> Counter <span class="hljs-keyword">struct</span> {
    n <span class="hljs-type">int</span>
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(ctr *Counter)</span></span> ServeHTTP(w http.ResponseWriter, req *http.Request) {
    ctr.n++
    fmt.Fprintf(w, <span class="hljs-string">&quot;counter = %d\\n&quot;</span>, ctr.n)
}
</code></pre>
<p>(ومتماسًا مع ثيمتنا، لاحظ كيف تستطيع <code>Fprintf</code> أن تطبع إلى <code>http.ResponseWriter</code>.) وفي خادم حقيقي، ستحتاج الوصول إلى <code>ctr.n</code> إلى الحماية من الوصول المتزامن. راجع حزمتَي <code>sync</code> و<code>atomic</code> للاقتراحات.</p>
<p>وللتذكير، إليك كيف تربط مثل هذا الخادم بعقدة في شجرة الروابط:</p>
<pre><code class="language-go"><span class="hljs-keyword">import</span> <span class="hljs-string">&quot;net/http&quot;</span>
...
ctr := <span class="hljs-built_in">new</span>(Counter)
http.Handle(<span class="hljs-string">&quot;/counter&quot;</span>, ctr)
</code></pre>
<p>لكن لماذا نجعل <code>Counter</code> بنية؟ يكفي عدد صحيح. (ويحتاج المُستقبِل أن يكون مؤشرًا حتى يظهر الزيادة للمنادي.)</p>
<pre><code class="language-go"><span class="hljs-comment">// Simpler counter server.</span>
<span class="hljs-keyword">type</span> Counter <span class="hljs-type">int</span>

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(ctr *Counter)</span></span> ServeHTTP(w http.ResponseWriter, req *http.Request) {
    *ctr++
    fmt.Fprintf(w, <span class="hljs-string">&quot;counter = %d\\n&quot;</span>, *ctr)
}
</code></pre>
<p>وماذا لو كان برنامجك يملك حالة داخلية تحتاج أن تُبلَّغ بزيارة صفحة؟ اربط قناة بالصفحة:</p>
<pre><code class="language-go"><span class="hljs-comment">// A channel that sends a notification on each visit.</span>
<span class="hljs-comment">// (Probably want the channel to be buffered.)</span>
<span class="hljs-keyword">type</span> Chan <span class="hljs-keyword">chan</span> *http.Request

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(ch Chan)</span></span> ServeHTTP(w http.ResponseWriter, req *http.Request) {
    ch &lt;- req
    fmt.Fprint(w, <span class="hljs-string">&quot;notification sent&quot;</span>)
}
</code></pre>
<p>وأخيرًا، لنقل إن أردنا أن نعرض على <code>/args</code> الوسائط المستخدمة عند تشغيل الملف التنفيذي للخادم. فكتابة دالة تطبع الوسائط أمر سهل:</p>
<pre><code class="language-go"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">ArgServer</span><span class="hljs-params">()</span></span> {
    fmt.Println(os.Args)
}
</code></pre>
<p>فكيف نحوّلها إلى خادم HTTP؟ يمكننا أن نجعل <code>ArgServer</code> طريقةً لنوعٍ ما نهمل قيمته، لكن هناك طريق أنظف. فلأننا نستطيع تعريف دالة لأي نوع عدا المؤشرات والواجهات، يمكننا كتابة دالة لدالة. وتحوي حزمة <code>http</code> هذه الشيفرة:</p>
<pre><code class="language-go"><span class="hljs-comment">// The HandlerFunc type is an adapter to allow the use of</span>
<span class="hljs-comment">// ordinary functions as HTTP handlers.  If f is a function</span>
<span class="hljs-comment">// with the appropriate signature, HandlerFunc(f) is a</span>
<span class="hljs-comment">// Handler object that calls f.</span>
<span class="hljs-keyword">type</span> HandlerFunc <span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">(ResponseWriter, *Request)</span></span>

<span class="hljs-comment">// ServeHTTP calls f(w, req).</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(f HandlerFunc)</span></span> ServeHTTP(w ResponseWriter, req *Request) {
    f(w, req)
}
</code></pre>
<p>فـ <code>HandlerFunc</code> نوع له دالة هي <code>ServeHTTP</code>، ولذلك تستطيع قيم ذلك النوع خدمة طلبات HTTP. تأمّل تنفيذ الدالة: المُستقبِل هو دالة هي <code>f</code>، والدالة تنادي <code>f</code>. قد يبدو هذا غريبًا، لكنه ليس مختلفًا كثيرًا عن، مثلًا، أن يكون المُستقبِل قناةً والدالة ترسل على القناة.</p>
<p>ولتحويل <code>ArgServer</code> إلى خادم HTTP، نعدّله أولًا ليصبح ذا التوقيع الصحيح:</p>
<pre><code class="language-go"><span class="hljs-comment">// Argument server.</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">ArgServer</span><span class="hljs-params">(w http.ResponseWriter, req *http.Request)</span></span> {
    fmt.Fprintln(w, os.Args)
}
</code></pre>
<p>أصبح لـ <code>ArgServer</code> الآن التوقيع نفسه الذي لـ <code>HandlerFunc</code>، ولذلك يمكن تحويله إلى ذلك النوع للوصول إلى دواله، تمامًا كما حوّلنا <code>Sequence</code> إلى <code>IntSlice</code> للوصول إلى <code>IntSlice.Sort</code>. وشيفرة الإعداد موجزة:</p>
<pre><code class="language-go">http.Handle(<span class="hljs-string">&quot;/args&quot;</span>, http.HandlerFunc(ArgServer))
</code></pre>
<p>وحين يزور أحدهم الصفحة <code>/args</code>، يكون المعالج المركّب في تلك الصفحة قيمته <code>ArgServer</code> ونوعه <code>HandlerFunc</code>. وسيستدعي خادم HTTP دالة <code>ServeHTTP</code> من ذلك النوع، وبمُستقبِل هو <code>ArgServer</code>، ما يستدعي بدوره <code>ArgServer</code> (عبر الاستدعاء <code>f(w, req)</code> داخل <code>HandlerFunc.ServeHTTP</code>). وعندئذ تُعرض الوسائط.</p>
<p>وفي هذا القسم صنعنا خادم HTTP من بنية، ومن عدد صحيح، ومن قناة، ومن دالة — كل ذلك لأن الواجهات ليست إلا مجموعات دوال، ويمكن تعريفها لأي نوع تقريبًا.</p>
`,t={book:s,chapter:n,chapterTitle:e,slug:a,title:p,headings:c,html:o};export{s as book,n as chapter,e as chapterTitle,t as default,c as headings,o as html,a as slug,p as title};
