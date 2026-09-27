const s="effective-go",n="initialization",a="التهيئة",t="index",e="التهيئة",o=[{depth:2,id:"الثوابت",text:"الثوابت"},{depth:2,id:"المتغيرات",text:"المتغيّرات"},{depth:2,id:"دالة-init",text:"دالة init"}],p=`<p>رغم أن التهيئة في Go لا تبدو ظاهريًا مختلفة كثيرًا عن التهيئة في C أو C++‎، فإنها أقوى. فبإمكانك بناء البنى المعقّدة أثناء التهيئة، وتُعالَج مسائل الترتيب بين العناصر المُهيّأة — حتى في حزم مختلفة — على نحو صحيح.</p>
<h2 id="الثوابت">الثوابت</h2>
<p>ثوابت Go هي ثوابت فحسب. فهي تُنشأ وقت التصريف، حتى لو عُرِّفت كمتغيّرات محلية في دوال، ولا يمكن أن تكون إلا أعدادًا أو محارف (<code>rune</code>) أو نصوصًا أو قيمًا منطقية. وبفضل قيد وقت التصريف، فإن التعبيرات التي تعرّفها يجب أن تكون تعبيرات ثابتة يستطيع المُصرِّف حسابها. فمثلًا <code>1&lt;&lt;3</code> تعبير ثابت، بينما <code>math.Sin(math.Pi/4)</code> ليس كذلك، لأن نداء <code>math.Sin</code> يحتاج أن يحدث وقت التشغيل.</p>
<p>وفي Go تُنشأ الثوابت المُعدَّدة (enumerated) باستعمال المُعدِّد <code>iota</code>. وبما أن <code>iota</code> يمكن أن يكون جزءًا من تعبير، وأن التعبيرات يمكن أن تتكرر ضمنيًا، فمن السهل بناء مجموعات معقّدة من القيم:</p>
<pre><code class="language-go"><span class="hljs-keyword">type</span> ByteSize <span class="hljs-type">float64</span>

<span class="hljs-keyword">const</span> (
    _           = <span class="hljs-literal">iota</span> <span class="hljs-comment">// ignore first value by assigning to blank identifier</span>
    KB ByteSize = <span class="hljs-number">1</span> &lt;&lt; (<span class="hljs-number">10</span> * <span class="hljs-literal">iota</span>)
    MB
    GB
    TB
    PB
    EB
    ZB
    YB
)
</code></pre>
<p>والقدرة على ربط طريقة مثل <code>String</code> بأي نوع عرّفه المستخدم تجعل من الممكن أن تُنسِّق القيم الاعتباطية نفسها تلقائيًا للطباعة. ورغم أنك ستراها مستعملة أكثر من غيرها مع البنى <code>struct</code>، فإن هذه التقنية مفيدة أيضًا للأنواع العددية البسيطة مثل أنواع الفاصلة العائمة التي من حجم <code>ByteSize</code>:</p>
<pre><code class="language-go"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-params">(b ByteSize)</span></span> String() <span class="hljs-type">string</span> {
    <span class="hljs-keyword">switch</span> {
    <span class="hljs-keyword">case</span> b &gt;= YB:
        <span class="hljs-keyword">return</span> fmt.Sprintf(<span class="hljs-string">&quot;%.2fYB&quot;</span>, b/YB)
    <span class="hljs-keyword">case</span> b &gt;= ZB:
        <span class="hljs-keyword">return</span> fmt.Sprintf(<span class="hljs-string">&quot;%.2fZB&quot;</span>, b/ZB)
    <span class="hljs-keyword">case</span> b &gt;= EB:
        <span class="hljs-keyword">return</span> fmt.Sprintf(<span class="hljs-string">&quot;%.2fEB&quot;</span>, b/EB)
    <span class="hljs-keyword">case</span> b &gt;= PB:
        <span class="hljs-keyword">return</span> fmt.Sprintf(<span class="hljs-string">&quot;%.2fPB&quot;</span>, b/PB)
    <span class="hljs-keyword">case</span> b &gt;= TB:
        <span class="hljs-keyword">return</span> fmt.Sprintf(<span class="hljs-string">&quot;%.2fTB&quot;</span>, b/TB)
    <span class="hljs-keyword">case</span> b &gt;= GB:
        <span class="hljs-keyword">return</span> fmt.Sprintf(<span class="hljs-string">&quot;%.2fGB&quot;</span>, b/GB)
    <span class="hljs-keyword">case</span> b &gt;= MB:
        <span class="hljs-keyword">return</span> fmt.Sprintf(<span class="hljs-string">&quot;%.2fMB&quot;</span>, b/MB)
    <span class="hljs-keyword">case</span> b &gt;= KB:
        <span class="hljs-keyword">return</span> fmt.Sprintf(<span class="hljs-string">&quot;%.2fKB&quot;</span>, b/KB)
    }
    <span class="hljs-keyword">return</span> fmt.Sprintf(<span class="hljs-string">&quot;%.2fB&quot;</span>, b)
}
</code></pre>
<p>يُطبع التعبير <code>YB</code> على هيئة <code>1.00YB</code>، بينما يُطبع <code>ByteSize(1e13)</code> على هيئة <code>9.09TB</code>.</p>
<p>استعمال <code>Sprintf</code> هنا لتنفيذ دالة <code>String</code> لـ <code>ByteSize</code> آمن — أي أنه يتجنّب العود إلى ما لا نهاية — لا بسبب التحويل، بل لأنه ينادي <code>Sprintf</code> مع <code>%f</code>، وهو ليس تنسيق نصّي: فـ <code>Sprintf</code> لا تنادي دالة <code>String</code> إلا حين تريد نصًّا، و<code>%f</code> يريد قيمة فاصلة عائمة.</p>
<h2 id="المتغيرات">المتغيّرات</h2>
<p>يمكن تهيئة المتغيّرات تمامًا كما تُهيَّأ الثوابت، لكن المهيّئ يمكن أن يكون تعبيرًا عامًا يُحسب وقت التشغيل:</p>
<pre><code class="language-go"><span class="hljs-keyword">var</span> (
    home   = os.Getenv(<span class="hljs-string">&quot;HOME&quot;</span>)
    user   = os.Getenv(<span class="hljs-string">&quot;USER&quot;</span>)
    gopath = os.Getenv(<span class="hljs-string">&quot;GOPATH&quot;</span>)
)
</code></pre>
<h2 id="دالة-init">دالة init</h2>
<p>أخيرًا، يستطيع كل ملف مصدر أن عرّف دالة <code>init</code> خاصة به بلا وسائط، لتهيئة أي حالة يحتاجها. (ولكل ملف في الواقع عدّة دوال <code>init</code>.) وإلى معنى «أخيرًا» فإلى هذا الحد: تُنادى <code>init</code> بعد أن تكون كل التصاريحات المتغيّرة في الحزمة قد قيم مهيّئاتها، وتُقوَّم هذه القيم بدورها بعد أن تكون كل الحزم المستوردة قد هُيّئت.</p>
<p>وإلى جانب التهيئات التي يتعذّر التعبير عنها بتصريجات، فإن استعمال شائعًا لدوال <code>init</code> هو التحقّق من صحّة حالة البرنامج أو إصلاحها قبل بدء التنفيذ الحقيقي:</p>
<pre><code class="language-go"><span class="hljs-function"><span class="hljs-keyword">func</span> <span class="hljs-title">init</span><span class="hljs-params">()</span></span> {
    <span class="hljs-keyword">if</span> user == <span class="hljs-string">&quot;&quot;</span> {
        log.Fatal(<span class="hljs-string">&quot;$USER not set&quot;</span>)
    }
    <span class="hljs-keyword">if</span> home == <span class="hljs-string">&quot;&quot;</span> {
        home = <span class="hljs-string">&quot;/home/&quot;</span> + user
    }
    <span class="hljs-keyword">if</span> gopath == <span class="hljs-string">&quot;&quot;</span> {
        gopath = home + <span class="hljs-string">&quot;/go&quot;</span>
    }
    <span class="hljs-comment">// gopath may be overridden by --gopath flag on command line.</span>
    flag.StringVar(&amp;gopath, <span class="hljs-string">&quot;gopath&quot;</span>, gopath, <span class="hljs-string">&quot;override default GOPATH&quot;</span>)
}
</code></pre>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:e,headings:o,html:p};export{s as book,n as chapter,a as chapterTitle,c as default,o as headings,p as html,t as slug,e as title};
