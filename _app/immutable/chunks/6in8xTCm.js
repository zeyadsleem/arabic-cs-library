const s="effective-go",n="concurrency",a="التزامن",e="index",p="التزامن",l=[{depth:2,id:"الخيوط-المتوازية-goroutines",text:"الخيوط المتوازية (goroutines)"},{depth:2,id:"القنوات",text:"القنوات"},{depth:2,id:"قنوات-القنوات",text:"قنوات القنوات"},{depth:2,id:"التوازي",text:"التوازي"},{depth:2,id:"مخزن-متسرب",text:"مخزن متسرّب"}],c=`<p>البرمجة المتزامنة موضوع واسع، ولا متسع هنا إلا لعدد من النقاط الخاصة بـ Go.</p>
<p>البرمجة المتزامنة في بيئات كثيرة يصعّبها ما تتطلّبه من دقّة في الوصول الصحيح إلى المتغيّرات المشتركة. أما Go فتشجّع منهجًا مختلفًا تُمرَّر فيه القيم المشتركة على القنوات، بل لا تُشارَك أبدًا بقصد من خيوط تنفيذ منفصلة. فلا يسمح الوصول إلى القيمة في لحظة معطاة إلا لـ goroutine واحدة. ولا يمكن أن تحدث مسابقات بيانات (data races) بالتصميم.</p>
<p>ولتشجيع هذه الطريقة في التفكير، اخترنا لها شعارًا:</p>
<blockquote>
<p>لا تتواصل لمشاركة الذاكرة؛ بل شارك الذاكرة بالتواصل.</p>
</blockquote>
<p>ويمكن أن يُؤخذ هذا المنهج إلى حدّ أبعد مما ينبغي. فعُدّادات المراجع، مثلًا، يُفضَّل أن تُنفَّذ بوضع قفل (mutex) حول متغيّر عددي. لكن على المستوى العام، فإن استعمال القنوات للتحكّم في الوصول يجعل كتابة برامج واضحة وصحيحة أسهل.</p>
<p>وإليك طريقة للتفكير في هذا النموذج: تأمّل برنامجًا أحاديّ الخيط نموذجيًا يعمل على معالج واحد (CPU). فهو لا يحتاج إلى أي أدوات تزامن (synchronization primitives). الآن شغّل نسخة أخرى من هذا البرنامج؛ فهي أيضًا لا تحتاج إلى تزامن. والآن دع النسختين تتواصلان؛ فإذا كان التواصل هو أداة التزامن، فلا حاجة إلى تزامن آخر. فأنابيب Unix، مثلًا، تناسب هذا النموذج تمامًا. ورغم أن منهج Go في التزامن ينشأ عن «العمليات التسلسلية المتواصل» (CSP) لـ Tony Hoare، فيمكن أيضًا رؤيته تعميمًا آمن النوع لأنابيب Unix.</p>
<h2 id="الخيوط-المتوازية-goroutines">الخيوط المتوازية (goroutines)</h2>
<p>تُسمّى بهذه الاسم لأن المصطلحات القائمة — الخيوط (threads) والـ coroutines والعمليات (processes) وما شابه — تحمل دلالات مضلِّلة. فـ goroutine له نموذج بسيط: هي دالة تُنفَّذ بالتزامن مع goroutines أخرى في نطاق العناوين نفسه. وهي خفيفة الوزن، فلا تكلّف أكثر قليلًا من تخصيص مساحة مكدّس. والمكدّسات تبدأ صغيرة، فهي رخيصة، وتنمو بتخصيص (وتحرير) تخزين الـ heap عند الحاجة.</p>
<p>تُوزَّع الـ goroutines على عدّة خيوط نظام تشغيل، فإن اعترت إحداها حجب — مثلًا أثناء انتظار إدخال/إخراج (I/O) — واصلت غيرها العمل. ويخفي تصميمها كثيرًا من تعقيدات إنشاء الخيوط وإدارتها.</p>
<p>بادأ نداء دالة أو طريقة بالكلمة المفتاحية <code>go</code> لتشغيل النداء في goroutine جديدة. وحين يكتمل النداء، تنتهي الـ goroutine في صمت. (الأثر مشابه لِرمز <code>&amp;</code> في صدفة Unix الذي يشغّل أمرًا في الخلفية.)</p>
<pre><code class="language-go"><span class="hljs-keyword">go</span> list.Sort()  <span class="hljs-comment">// run list.Sort concurrently; don&#x27;t wait for it.</span>
</code></pre>
<p>ويمكن أن يكون الدالة الحرفية (function literal) مفيدة في نداء goroutine:</p>
<pre><code class="language-go"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">Announce</span><span class="hljs-params">(message <span class="hljs-type">string</span>, delay time.Duration)</span></span> {
    <span class="hljs-keyword">go</span> <span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">()</span></span> {
        time.Sleep(delay)
        fmt.Println(message)
    }()  <span class="hljs-comment">// Note the parentheses - must call the function.</span>
}
</code></pre>
<p>وفي Go، الدوال الحرفية هي إغلاقيات (closures): فالتنفيذ يضمن بقاء المتغيّرات التي تشير إليها الدالة حيّة ما دامت نشطة.</p>
<p>وهذه الأمثلة ليست عملية جدًّا لأن الدوال لا تملك وسيلة للإشارة إلى اكتمالها. ونتاجًا لذلك نحتاج إلى القنوات.</p>
<h2 id="القنوات">القنوات</h2>
<p>مثل الخرائط تمامًا، تُخصَّص القنوات بـ <code>make</code>، وتتصرّف القيمة الناتجة كمرجع إلى بنية بيانات تقف خلفها. وإن قُدّم وسيط صحيح اختياري، فإنها تحدّد حجم مخزن القناة. والقيمة الافتراضية صفر، أي قناة غير مخزَّنة أو متزامنة:</p>
<pre><code class="language-go">ci := <span class="hljs-built_in">make</span>(<span class="hljs-keyword">chan</span> <span class="hljs-type">int</span>)            <span class="hljs-comment">// unbuffered channel of integers</span>
cj := <span class="hljs-built_in">make</span>(<span class="hljs-keyword">chan</span> <span class="hljs-type">int</span>, <span class="hljs-number">0</span>)         <span class="hljs-comment">// unbuffered channel of integers</span>
cs := <span class="hljs-built_in">make</span>(<span class="hljs-keyword">chan</span> *os.File, <span class="hljs-number">100</span>)  <span class="hljs-comment">// buffered channel of pointers to Files</span>
</code></pre>
<p>وتدمج القنوات غير المخزَّنة بين التواصل — أي تبادل قيمة — والتزامن، فيضمن أن حسابين (goroutines) في حالة معروفة.</p>
<p>وتوجد أعراف جميلة كثيرة تستعمل القنوات. وإليك واحدًا لنبدأ به. في القسم السابق أطلقنا عملية ترتيب في الخلفية. وتستطيع القناة أن تجعل الـ goroutine المُطلِقة تنتظر اكتمال الترتيب:</p>
<pre><code class="language-go">c := <span class="hljs-built_in">make</span>(<span class="hljs-keyword">chan</span> <span class="hljs-type">int</span>)  <span class="hljs-comment">// Allocate a channel.</span>
<span class="hljs-comment">// Start the sort in a goroutine; when it completes, signal on the channel.</span>
<span class="hljs-keyword">go</span> <span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">()</span></span> {
    list.Sort()
    c &lt;- <span class="hljs-number">1</span>  <span class="hljs-comment">// Send a signal; value does not matter.</span>
}()
doSomethingForAWhile()
&lt;-c   <span class="hljs-comment">// Wait for sort to finish; discard sent value.</span>
</code></pre>
<p>يحظر المستقبِل دائمًا حتى تتوفّر بيانات للاستلام. فإن كانت القناة غير مخزَّنة، فإن المرسِل يحظر حتى يستلم المستقبِل القيمة. أمّا إذا كان للقناة مخزن، فإن المرسِل لا يحظر إلا حتى تُنسخ القيمة إلى المخزن؛ وإذا كان المخزن ممتلئًا، فهذا يعني الانتظار حتى يستخرج أحد المستقبِلين قيمة.</p>
<p>ويمكن، مثلًا، استعمال القناة المخزَّنة كـ semaphore للحدّ من معدّل العمل. ففي هذا المثال تُمرَّر الطلبات الواردة إلى <code>handle</code>، التي ترسل قيمة في القناة، وتُعالج الطلب، ثم تستقبل قيمة من القناة لتُهيّئ «الـ semaphore» للمستهلك التالي. وسعة مخزن القناة تحدّ عدد النداءات المتزامنة لـ <code>process</code>:</p>
<pre><code class="language-go"><span class="hljs-keyword">var</span> sem = <span class="hljs-built_in">make</span>(<span class="hljs-keyword">chan</span> <span class="hljs-type">int</span>, MaxOutstanding)

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">handle</span><span class="hljs-params">(r *Request)</span></span> {
    sem &lt;- <span class="hljs-number">1</span>    <span class="hljs-comment">// Wait for active queue to drain.</span>
    process(r)  <span class="hljs-comment">// May take a long time.</span>
    &lt;-sem       <span class="hljs-comment">// Done; enable next request to run.</span>
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">Serve</span><span class="hljs-params">(queue <span class="hljs-keyword">chan</span> *Request)</span></span> {
    <span class="hljs-keyword">for</span> {
        req := &lt;-queue
        <span class="hljs-keyword">go</span> handle(req)  <span class="hljs-comment">// Don&#x27;t wait for handle to finish.</span>
    }
}
</code></pre>
<p>ومتى أصبح هناك <code>MaxOutstanding</code> معالجات تنفّذ <code>process</code>، فإن أي معالج إضافي سيحظر محاولًا الإرسال في مخزن القناة الممتلئ، حتى ينتهي أحد المعالجات القائمة ويستقبل من المخزن.</p>
<p>ولهذا التصميم مشكلة: فـ <code>Serve</code> تنشئ goroutine جديدة لكل طلب وارد، مع أن <code>MaxOutstanding</code> منها فقط هي التي تستطيع العمل في أي لحظة. ونتيجة لذلك، يستطيع البرنامج استهلاك موارد بلا حدّ إذا وردت الطلبات بسرعة زائدة. يمكننا معالجة هذا النقص بتغيير <code>Serve</code> بحيث تقيّد إنشاء الـ goroutines:</p>
<pre><code class="language-go"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">Serve</span><span class="hljs-params">(queue <span class="hljs-keyword">chan</span> *Request)</span></span> {
    <span class="hljs-keyword">for</span> req := <span class="hljs-keyword">range</span> queue {
        sem &lt;- <span class="hljs-number">1</span>
        <span class="hljs-keyword">go</span> <span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">()</span></span> {
            process(req)
            &lt;-sem
        }()
    }
}
</code></pre>
<p>(لاحظ أن في إصدارات Go التي تسبق 1.22 خللًا في هذه الشيفرة: فمتغيّر الحلقة مشترك بين كل الـ goroutines. راجع Go wiki للتفاصيل.)</p>
<p>وهناك نهج آخر يدير الموارد جيدًا، وهو تشغيل عدد ثابت من goroutines <code>handle</code> تقرأ جميعها من قناة الطلبات. ويحدّ عدد الـ goroutines عدد النداءات المتزامنة لـ <code>process</code>. كما أن دالة <code>Serve</code> هذه تقبل أيضًا قناة تُبلَّغ فيها للخروج؛ فبعد إطلاق الـ goroutines تحظر مستقبِلةً من تلك القناة:</p>
<pre><code class="language-go"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">handle</span><span class="hljs-params">(queue <span class="hljs-keyword">chan</span> *Request)</span></span> {
    <span class="hljs-keyword">for</span> r := <span class="hljs-keyword">range</span> queue {
        process(r)
    }
}

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">Serve</span><span class="hljs-params">(clientRequests <span class="hljs-keyword">chan</span> *Request, quit <span class="hljs-keyword">chan</span> <span class="hljs-type">bool</span>)</span></span> {
    <span class="hljs-comment">// Start handlers</span>
    <span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; MaxOutstanding; i++ {
        <span class="hljs-keyword">go</span> handle(clientRequests)
    }
    &lt;-quit  <span class="hljs-comment">// Wait to be told to exit.</span>
}
</code></pre>
<h2 id="قنوات-القنوات">قنوات القنوات</h2>
<p>من أهم خصائص Go أن القناة قيمة من الدرجة الأولى، يمكن تخصيصها وتمريرها كأي قيمة أخرى. ومن الاستعمالات الشائعة لهذه الخاصية تنفيذ فصل إشاري (demultiplexing) متوازٍ وآمن.</p>
<p>وفي المثال في القسم السابق، كانت <code>handle</code> معالجًا مثاليًا لطلب، لكننا لم نعرّف النوع الذي يعالجه. فإذا تضمّن ذلك النوع قناة يُردّ عليها، يستطيع كل عميل أن يوفّر له مساره الخاص للإجابة. وإليك تعريفًا مخطّطيًا للنوع <code>Request</code>:</p>
<pre><code class="language-go"><span class="hljs-keyword">type</span> Request <span class="hljs-keyword">struct</span> {
    args        []<span class="hljs-type">int</span>
    f           <span class="hljs-function"><span class="hljs-keyword">func</span><span class="hljs-params">([]<span class="hljs-type">int</span>)</span></span> <span class="hljs-type">int</span>
    resultChan  <span class="hljs-keyword">chan</span> <span class="hljs-type">int</span>
}
</code></pre>
<p>يوفّر العميل دالةً ووسائطها، إضافةً إلى قناة داخل كائن الطلب ليستقبل عليها الإجابة:</p>
<pre><code class="language-go"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">sum</span><span class="hljs-params">(a []<span class="hljs-type">int</span>)</span></span> (s <span class="hljs-type">int</span>) {
    <span class="hljs-keyword">for</span> _, v := <span class="hljs-keyword">range</span> a {
        s += v
    }
    <span class="hljs-keyword">return</span>
}

request := &amp;Request{[]<span class="hljs-type">int</span>{<span class="hljs-number">3</span>, <span class="hljs-number">4</span>, <span class="hljs-number">5</span>}, sum, <span class="hljs-built_in">make</span>(<span class="hljs-keyword">chan</span> <span class="hljs-type">int</span>)}
<span class="hljs-comment">// Send request</span>
clientRequests &lt;- request
<span class="hljs-comment">// Wait for response.</span>
fmt.Printf(<span class="hljs-string">&quot;answer: %d\\n&quot;</span>, &lt;-request.resultChan)
</code></pre>
<p>وعلى جانب الخادم، لا يتغيّر شيء سوى دالة المعالجة:</p>
<pre><code class="language-go"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">handle</span><span class="hljs-params">(queue <span class="hljs-keyword">chan</span> *Request)</span></span> {
    <span class="hljs-keyword">for</span> req := <span class="hljs-keyword">range</span> queue {
        req.resultChan &lt;- req.f(req.args)
    }
}
</code></pre>
<p>وهناك بطبيعة الحال الكثير ممّا يلزم لجعل هذا واقعيًا، لكن هذه الشيفرة إطار لنظام RPC متوازٍ غير حاجب ومحدود المعدّل، ولا ترى في الأفق قفلًا واحدًا (mutex).</p>
<h2 id="التوازي">التوازي</h2>
<p>تطبيق آخر لهذه الأفكار هو موازنة حساب عبر عدّة أنوية معالج (CPU). فإذا أمكن تفكيك الحساب إلى أجزاء منفصلة تستطيع التنفيذ باستقلال، فيمكن موازنته، مع قناة تشير إلى اكتمال كل جزء.</p>
<p>ولنفترض لدينا عملية مكلفة نريد تنفيذها على متجّهة من العناصر، وأن تكون قيمة العملية على كل عنصر مستقلة عن غيرها، كما في هذا المثال المثالي:</p>
<pre><code class="language-go"><span class="hljs-keyword">type</span> Vector []<span class="hljs-type">float64</span>

<span class="hljs-comment">// Apply the operation to v[i], v[i+1] ... up to v[n-1].</span>
<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(v Vector)</span></span> DoSome(i, n <span class="hljs-type">int</span>, u Vector, c <span class="hljs-keyword">chan</span> <span class="hljs-type">int</span>) {
    <span class="hljs-keyword">for</span> ; i &lt; n; i++ {
        v[i] += u.Op(v[i])
    }
    c &lt;- <span class="hljs-number">1</span>    <span class="hljs-comment">// signal that this piece is done</span>
}
</code></pre>
<p>ونطلق الأجزاء باستقلال في حلقة، جزءًا لكل معالج. والجزء قد تنتهي بأي ترتيب ولا يهمّ ذلك؛ فنكتفي بعدّ إشارات الاكتشاف بتفريغ القناة بعد إطلاق كل الـ goroutines:</p>
<pre><code class="language-go"><span class="hljs-keyword">const</span> numCPU = <span class="hljs-number">4</span> <span class="hljs-comment">// number of CPU cores</span>

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(v Vector)</span></span> DoAll(u Vector) {
    c := <span class="hljs-built_in">make</span>(<span class="hljs-keyword">chan</span> <span class="hljs-type">int</span>, numCPU)  <span class="hljs-comment">// Buffering optional but sensible.</span>
    <span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; numCPU; i++ {
        <span class="hljs-keyword">go</span> v.DoSome(i*<span class="hljs-built_in">len</span>(v)/numCPU, (i+<span class="hljs-number">1</span>)*<span class="hljs-built_in">len</span>(v)/numCPU, u, c)
    }
    <span class="hljs-comment">// Drain the channel.</span>
    <span class="hljs-keyword">for</span> i := <span class="hljs-number">0</span>; i &lt; numCPU; i++ {
        &lt;-c    <span class="hljs-comment">// wait for one task to complete</span>
    }
    <span class="hljs-comment">// All done.</span>
}
</code></pre>
<p>وبدلًا من إنشاء قيمة ثابتة لـ numCPU، يمكننا أن نسأل بيئة التشغيل عن القيمة المناسبة. فالدالة <code>runtime.NumCPU</code> تُرجع عدد أنوية المعالج في الآلة، ومن ثمّ يمكننا أن نكتب:</p>
<pre><code class="language-go"><span class="hljs-keyword">var</span> numCPU = runtime.NumCPU()
</code></pre>
<p>وتوجد أيضًا دالة <code>runtime.GOMAXPROCS</code> التي تُبلّغ عن عدد الأنوية الذي حدده المستخدم لبرنامج Go — أو تضبطه — والتي يستطيع البرنامج تشغيلها في آن واحد. وقيمتها الافتراضية هي قيمة <code>runtime.NumCPU</code>، لكن يمكن تجاوزها بضبط متغيّر البيئة بالاسم نفسه في الصدفة، أو بنداء الدالة برقم موجب. أما نداءها بصفر فيكتفي بالاستعلام عن القيمة. فإذا أردنا احترام طلب المستخدم للموارد، فينبغي أن نكتب:</p>
<pre><code class="language-go"><span class="hljs-keyword">var</span> numCPU = runtime.GOMAXPROCS(<span class="hljs-number">0</span>)
</code></pre>
<p>واحذر أن تخلط بين فكرتَي التزامن — وهو تنظيم البرنامج كمكوّنات تُنفَّذ باستقلال — والتوازي — وهو تنفيذ الحسابات بالتوازي لتحقيق الكفاءة على عدّة معالجات. فرغم أن مزايا التزامن في Go تجعل بعض المسائل سهلة التنظيم كحسابات متوازية، فإن Go لغة متزامنة لا متوازية، وليس كل مشكلات التوازي يناسبها نموذج Go. ولمزيد من النقاش حول هذا التمييز، راجع المحادثة المُحالة في مشاركة المدونة هذه.</p>
<h2 id="مخزن-متسرب">مخزن متسرّب</h2>
<p>حتى أدوات البرمجة المتزامنة تجعل التعبير عن أفكار غير متزامنة أسهل. وإليك مثالًا مُجرَّدًا من حزمة RPC. فـ goroutine الخاص بالعميل يدور في حلقة يستقبل فيها البيانات من مصدر ما، ربما شبكة. ولتفادي تخصيص المخازن وتحريرها، يحتفظ بقائمة مخازن متاحة، ويمثّلها بقناة مخزَّنة. فإذا كانت القناة فارغة، خُصِّص مخزن جديد. وحين يجهز مخزن الرسالة، يُرسَل إلى الخادم على <code>serverChan</code>:</p>
<pre><code class="language-go"><span class="hljs-keyword">var</span> freeList = <span class="hljs-built_in">make</span>(<span class="hljs-keyword">chan</span> *Buffer, <span class="hljs-number">100</span>)
<span class="hljs-keyword">var</span> serverChan = <span class="hljs-built_in">make</span>(<span class="hljs-keyword">chan</span> *Buffer)

<span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">client</span><span class="hljs-params">()</span></span> {
    <span class="hljs-keyword">for</span> {
        <span class="hljs-keyword">var</span> b *Buffer
        <span class="hljs-comment">// Grab a buffer if available; allocate if not.</span>
        <span class="hljs-keyword">select</span> {
        <span class="hljs-keyword">case</span> b = &lt;-freeList:
            <span class="hljs-comment">// Got one; nothing more to do.</span>
        <span class="hljs-keyword">default</span>:
            <span class="hljs-comment">// None free, so allocate a new one.</span>
            b = <span class="hljs-built_in">new</span>(Buffer)
        }
        load(b)              <span class="hljs-comment">// Read next message from the net.</span>
        serverChan &lt;- b      <span class="hljs-comment">// Send to server.</span>
    }
}
</code></pre>
<p>حلقة الخادم تستقبل كل رسالة من العميل، وتُعالجها، ثم تُعيد المخزن إلى القائمة المتاحة:</p>
<pre><code class="language-go"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">server</span><span class="hljs-params">()</span></span> {
    <span class="hljs-keyword">for</span> {
        b := &lt;-serverChan    <span class="hljs-comment">// Wait for work.</span>
        process(b)
        <span class="hljs-comment">// Reuse buffer if there&#x27;s room.</span>
        <span class="hljs-keyword">select</span> {
        <span class="hljs-keyword">case</span> freeList &lt;- b:
            <span class="hljs-comment">// Buffer on free list; nothing more to do.</span>
        <span class="hljs-keyword">default</span>:
            <span class="hljs-comment">// Free list full, just carry on.</span>
        }
    }
}
</code></pre>
<p>ويحاول العميل استرجاع مخزن من <code>freeList</code>؛ فإن لم يتوفّر أحد خُصِّص مخزن جديد. أما إرسال الخادم إلى <code>freeList</code> فيُعيد <code>b</code> إلى القائمة المتاحة ما لم تكن القائمة ممتلئة، وعندئذٍ يُترك المخزن على الأرض ليستعيده جامع القمامة. (وتُنفَّذ بنود <code>default</code> في جمل <code>select</code> حين لا تكون أي حالة أخرى جاهزة، أي أن <code>selects</code> لا تحجب أبدًا.) وهذا التنفيذ يبني قائمة مخازن بدلوّة متسرّبة (leaky bucket) في بضعة أسطر فقط، بالاعتماد على القناة المخزَّنة وجامع القمامة في مسك الدفاتر.</p>
`,o={book:s,chapter:n,chapterTitle:a,slug:e,title:p,headings:l,html:c};export{s as book,n as chapter,a as chapterTitle,o as default,l as headings,c as html,e as slug,p as title};
