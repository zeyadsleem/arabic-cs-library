const s="kinney",n="testing",a="مدخل إلى الاختبارات",t="mocking-dependencies",l="محاكاة الاعتماديات (Mocking Dependencies)",e=[{depth:2,id:"لماذا-نحاكي-الاعتماديات",text:"لماذا نحاكي الاعتماديات؟"},{depth:2,id:"كيف-تحاكي-الاعتماديات-في-vitest",text:"كيف تحاكي الاعتماديات في Vitest"},{depth:3,id:"المحاكاة-التلقائية-auto-mocking",text:"المحاكاة التلقائية (Auto-Mocking)"},{depth:2,id:"محاكاة-دوال-فردية",text:"محاكاة دوال فردية"},{depth:2,id:"محاكاة-وحدات-كاملة",text:"محاكاة وحدات كاملة"},{depth:2,id:"محاكاة-وحدات-nodejs-المدمجة",text:"محاكاة وحدات Node.js المدمجة"},{depth:2,id:"مثال-محاكاة-واجهة-برمجة-تطبيقات-خارجية",text:"مثال: محاكاة واجهة برمجة تطبيقات خارجية"},{depth:2,id:"vidomock",text:"vi.doMock"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],p=`<p>عند كتابة اختبارات الوحدات، من <em>بالغ الأهمية</em> عزل الشيفرة قيد الاختبار عن اعتمادياتها الخارجية. قد تشمل الاعتماديات خدمات مثل قواعد البيانات، وواجهات برمجة التطبيقات الخارجية، وأنظمة الملفات، أو مكتبات خارجية لا تريد التفاعل معها مباشرة في اختباراتك. بمحاكاة هذه الاعتماديات، يمكنك محاكاة سلوكها والتحكم في مخرجاتها وضمان بقاء اختباراتك سريعة وموثوقة ومركّزة على المنطق الذي تختبره.</p>
<h2 id="لماذا-نحاكي-الاعتماديات">لماذا نحاكي الاعتماديات؟</h2>
<ul>
<li><strong>العزل</strong>: بمحاكاة الاعتماديات، يمكنك اختبار شيفرتك بمعزل عن الخدمات أو الأنظمة الخارجية.</li>
<li><strong>التحكم</strong>: يمكنك التحكم في سلوك الاعتماديات، مثل محاكاة الأخطاء أو إرجاع بيانات محددة أو اختبار سيناريوهات مختلفة.</li>
<li><strong>الأداء</strong>: تتيح لك المحاكاة تجنب عبء التفاعل مع خدمات بطيئة أو غير متاحة مثل قواعد البيانات أو نداءات الشبكة.</li>
<li><strong>قابلية التكرار</strong>: تضمن البدائل المُحاكاة سلوكًا متسقًا، ما يجعل الاختبارات أكثر قابلية للتوقع وأسهل في تصحيح الأخطاء عند فشلها.</li>
</ul>
<h2 id="كيف-تحاكي-الاعتماديات-في-vitest">كيف تحاكي الاعتماديات في Vitest</h2>
<p>يوفر Vitest توابع قوية مثل <code>vi.fn()</code> و<code>vi.mock()</code> لمحاكاة الدوال والوحدات والخدمات التي تعتمد عليها شيفرتك. يمكنك محاكاة دوال فردية، أو محاكاة وحدات كاملة لاستبدال تنفيذاتها الحقيقية أثناء الاختبار.</p>
<p>إذا عدنا إلى دالتنا <code>log</code> في <code>examples/logjam</code> — سترى أننا في الإنتاج نرسل السجل إلى «الخادم» إذا كنا في وضع الإنتاج. إن <code>sendToServer</code> دالة فارغة (no-op) لأنني في مثال سابق لم أرد أن ينفجر اختبارنا، لكن يمكنك تخيل أنها تستدعي <code>fetch</code> أو شيئًا مشابهًا. وأنت لا تريد تحديدًا أن يحدث ذلك في كل مرة تشغّل فيها اختباراتك. لذا يمكننا اختيار محاكاة تلك الدالة بدلًا من ذلك.</p>
<pre><code class="language-javascript">vi.<span class="hljs-title function_">mock</span>(<span class="hljs-string">&#x27;./send-to-server&#x27;</span>, {
  <span class="hljs-attr">sendToServer</span>: vi.<span class="hljs-title function_">fn</span>(),
});
</code></pre>
<p>يأخذ <code>vi.mock()</code> مسارًا لاعتمادية ويتيح لك استبدال تلك الوظيفة ببديل مُحاكى.</p>
<p>الآن، يمكننا تشغيل اختباراتنا مع محاكاة تلك الدالة.</p>
<pre><code class="language-javascript"><span class="hljs-title function_">beforeEach</span>(<span class="hljs-function">() =&gt;</span> {
  vi.<span class="hljs-title function_">stubEnv</span>(<span class="hljs-string">&#x27;MODE&#x27;</span>, <span class="hljs-string">&#x27;production&#x27;</span>);
});

<span class="hljs-title function_">afterEach</span>(<span class="hljs-function">() =&gt;</span> {
  vi.<span class="hljs-title function_">unstubAllEnvs</span>();
  vi.<span class="hljs-title function_">resetAllMocks</span>();
});

<span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;sends messages to the server in production mode&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Hello, world!&#x27;</span>);

  <span class="hljs-title function_">expect</span>(sendToServer).<span class="hljs-title function_">toHaveBeenCalledWith</span>(<span class="hljs-string">&#x27;info&#x27;</span>, <span class="hljs-string">&#x27;Hello, world!&#x27;</span>);
});
</code></pre>
<h3 id="المحاكاة-التلقائية-auto-mocking">المحاكاة التلقائية (Auto-Mocking)</h3>
<p>إذا كان كل ما تفعله هو محاكاة كل دالة في وحدة ما، فيمكنك ببساطة استخدام ميزة <a href="https://stevekinney.com/courses/testing/auto-mocking">المحاكاة التلقائية</a> في Vite.</p>
<pre><code class="language-javascript">vi.<span class="hljs-title function_">mock</span>(<span class="hljs-string">&#x27;./send-to-server&#x27;</span>);
</code></pre>
<p>سيفعل هذا الشيء نفسه كما في المثال أعلاه. تعمل خوارزمية المحاكاة التلقائية على نحو كهذا:</p>
<ul>
<li>ستُفرَّغ كل المصفوفات.</li>
<li>ستبقى كل القيم الأولية (primitives) والمجموعات كما هي.</li>
<li>ستُستنسخ كل الكائنات استنساخًا عميقًا.</li>
<li>ستُستنسخ كل نسخ الأصناف ونماذجها الأولية استنساخًا عميقًا.</li>
</ul>
<h2 id="محاكاة-دوال-فردية">محاكاة دوال فردية</h2>
<p>إذا كانت شيفرتك تعتمد على دوال فردية من خدمة أو وحدة، يمكنك محاكاة تلك الدوال المحددة باستخدام <code>vi.fn()</code> لمحاكاة سلوكها.</p>
<p>إليك مثالًا على محاكاة دالة خدمة قاعدة بيانات:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Database service that will be mocked</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">fetchBandData</span>(<span class="hljs-params">bandName</span>) {
  <span class="hljs-comment">// Normally this would fetch from a database</span>
  <span class="hljs-keyword">return</span> database.<span class="hljs-title function_">query</span>(<span class="hljs-string">\`SELECT * FROM bands WHERE name = &#x27;<span class="hljs-subst">\${bandName}</span>&#x27;\`</span>);
}

<span class="hljs-comment">// Code under test</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">getBandDetails</span>(<span class="hljs-params">bandName</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetchBandData</span>(bandName);
}

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;getBandDetails&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return mocked band data&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-comment">// Mock fetchBandData to simulate database response</span>
    <span class="hljs-keyword">const</span> mockFetchBandData = vi.<span class="hljs-title function_">fn</span>(<span class="hljs-function">() =&gt;</span>
      <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">resolve</span>({ <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Green Day&#x27;</span>, <span class="hljs-attr">genre</span>: <span class="hljs-string">&#x27;Punk Rock&#x27;</span> }),
    );

    <span class="hljs-comment">// Call the function with the mocked dependency</span>
    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-title function_">mockFetchBandData</span>(<span class="hljs-string">&#x27;Green Day&#x27;</span>);

    <span class="hljs-comment">// Check that the function was called with the correct argument</span>
    <span class="hljs-title function_">expect</span>(mockFetchBandData).<span class="hljs-title function_">toHaveBeenCalledWith</span>(<span class="hljs-string">&#x27;Green Day&#x27;</span>);

    <span class="hljs-comment">// Assert the return value</span>
    <span class="hljs-title function_">expect</span>(result).<span class="hljs-title function_">toEqual</span>({ <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Green Day&#x27;</span>, <span class="hljs-attr">genre</span>: <span class="hljs-string">&#x27;Punk Rock&#x27;</span> });
  });
});
</code></pre>
<p>في هذا المثال، نستبدل الدالة الحقيقية <code>fetchBandData</code> بتنفيذ بديل مُحاكى يحاكي نداء قاعدة بيانات. يضمن ذلك أن يعمل اختبارنا بسرعة وبمعزل.</p>
<h2 id="محاكاة-وحدات-كاملة">محاكاة وحدات كاملة</h2>
<p>في الحالات التي تعتمد فيها شيفرتك على دوال متعددة من وحدة أو خدمة، يمكنك محاكاة الوحدة بأكملها باستخدام <code>vi.mock()</code>. هذا مفيد بشكل خاص لمحاكاة المكتبات أو الخدمات الخارجية التي توفر وظائف متعددة.</p>
<p>إليك كيفية محاكاة وحدة كاملة:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Imagine you have a module called &#x27;api&#x27; with various functions</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> api <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./api&#x27;</span>;

<span class="hljs-comment">// Code under test</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">getConcertDetails</span>(<span class="hljs-params">bandName</span>) {
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> api.<span class="hljs-title function_">fetchConcerts</span>(bandName);
}

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;getConcertDetails&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// Mock the entire api module</span>
  vi.<span class="hljs-title function_">mock</span>(<span class="hljs-string">&#x27;./api&#x27;</span>, <span class="hljs-function">() =&gt;</span> ({
    <span class="hljs-attr">fetchConcerts</span>: vi.<span class="hljs-title function_">fn</span>(<span class="hljs-function">() =&gt;</span>
      <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">resolve</span>([{ <span class="hljs-attr">venue</span>: <span class="hljs-string">&#x27;Madison Square Garden&#x27;</span>, <span class="hljs-attr">date</span>: <span class="hljs-string">&#x27;2024-09-01&#x27;</span> }]),
    ),
  }));

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should return mocked concert details&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-comment">// Call the function with the mocked module</span>
    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getConcertDetails</span>(<span class="hljs-string">&#x27;Green Day&#x27;</span>);

    <span class="hljs-comment">// Check that the fetchConcerts mock was called</span>
    <span class="hljs-title function_">expect</span>(api.<span class="hljs-property">fetchConcerts</span>).<span class="hljs-title function_">toHaveBeenCalledWith</span>(<span class="hljs-string">&#x27;Green Day&#x27;</span>);

    <span class="hljs-comment">// Assert the return value</span>
    <span class="hljs-title function_">expect</span>(result).<span class="hljs-title function_">toEqual</span>([{ <span class="hljs-attr">venue</span>: <span class="hljs-string">&#x27;Madison Square Garden&#x27;</span>, <span class="hljs-attr">date</span>: <span class="hljs-string">&#x27;2024-09-01&#x27;</span> }]);
  });
});
</code></pre>
<p>في هذا المثال، تُحاكى الوحدة <code>api</code> بأكملها، وتُستبدل الدالة <code>fetchConcerts</code> ببديل مُحاكى يعيد بيانات حفلات محددة مسبقًا. يتيح ذلك للاختبار العمل دون إجراء نداءات حقيقية إلى واجهة برمجة التطبيقات.</p>
<h2 id="محاكاة-وحدات-nodejs-المدمجة">محاكاة وحدات Node.js المدمجة</h2>
<p>يمكنك أيضًا محاكاة وحدات Node.js المدمجة مثل <code>fs</code> أو <code>http</code> إذا كانت شيفرتك تتفاعل مع نظام الملفات أو تجري طلبات شبكة.</p>
<p>إليك مثالًا على محاكاة وحدة <code>fs</code>:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> fs <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;fs&#x27;</span>;

<span class="hljs-comment">// Code under test</span>
<span class="hljs-keyword">function</span> <span class="hljs-title function_">readConfigFile</span>(<span class="hljs-params">filePath</span>) {
  <span class="hljs-keyword">return</span> fs.<span class="hljs-title function_">readFileSync</span>(filePath, <span class="hljs-string">&#x27;utf-8&#x27;</span>);
}

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;readConfigFile&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// Mock the fs module</span>
  vi.<span class="hljs-title function_">mock</span>(<span class="hljs-string">&#x27;fs&#x27;</span>);

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should read the mocked config file&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
    <span class="hljs-comment">// Mock the fs.readFileSync method</span>
    vi.<span class="hljs-title function_">spyOn</span>(fs, <span class="hljs-string">&#x27;readFileSync&#x27;</span>).<span class="hljs-title function_">mockReturnValue</span>(<span class="hljs-string">&#x27;mocked file content&#x27;</span>);

    <span class="hljs-comment">// Call the function under test</span>
    <span class="hljs-keyword">const</span> result = <span class="hljs-title function_">readConfigFile</span>(<span class="hljs-string">&#x27;/path/to/config&#x27;</span>);

    <span class="hljs-comment">// Assert the returned file content</span>
    <span class="hljs-title function_">expect</span>(result).<span class="hljs-title function_">toBe</span>(<span class="hljs-string">&#x27;mocked file content&#x27;</span>);
  });
});
</code></pre>
<p>في هذا الاختبار، تُحاكى الدالة <code>fs.readFileSync</code> لإرجاع محتوى محدد مسبقًا، ما يتيح لك اختبار دالتك دون الحاجة إلى ملف فعلي على نظام الملفات.</p>
<h2 id="مثال-محاكاة-واجهة-برمجة-تطبيقات-خارجية">مثال: محاكاة واجهة برمجة تطبيقات خارجية</h2>
<p>إليك مثالًا كاملًا على محاكاة اعتمادية واجهة برمجة تطبيقات خارجية باستخدام Vitest:</p>
<pre><code class="language-javascript"><span class="hljs-comment">// Assume you have an API module</span>
<span class="hljs-keyword">import</span> * <span class="hljs-keyword">as</span> api <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./api&#x27;</span>;

<span class="hljs-comment">// Code under test</span>
<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">fetchConcertData</span>(<span class="hljs-params">bandName</span>) {
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> api.<span class="hljs-title function_">getConcerts</span>(bandName);
  <span class="hljs-keyword">return</span> response.<span class="hljs-property">data</span>;
}

<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;fetchConcertData&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// Mock the API module</span>
  vi.<span class="hljs-title function_">mock</span>(<span class="hljs-string">&#x27;./api&#x27;</span>, <span class="hljs-function">() =&gt;</span> ({
    <span class="hljs-attr">getConcerts</span>: vi.<span class="hljs-title function_">fn</span>(<span class="hljs-function">() =&gt;</span> <span class="hljs-title class_">Promise</span>.<span class="hljs-title function_">resolve</span>({ <span class="hljs-attr">data</span>: [{ <span class="hljs-attr">venue</span>: <span class="hljs-string">&#x27;Wembley&#x27;</span>, <span class="hljs-attr">date</span>: <span class="hljs-string">&#x27;2024-10-05&#x27;</span> }] })),
  }));

  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;should fetch concert data using the mocked API&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-comment">// Call the function under test</span>
    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetchConcertData</span>(<span class="hljs-string">&#x27;Green Day&#x27;</span>);

    <span class="hljs-comment">// Assert that the API was called with the correct argument</span>
    <span class="hljs-title function_">expect</span>(api.<span class="hljs-property">getConcerts</span>).<span class="hljs-title function_">toHaveBeenCalledWith</span>(<span class="hljs-string">&#x27;Green Day&#x27;</span>);

    <span class="hljs-comment">// Check the returned data</span>
    <span class="hljs-title function_">expect</span>(result).<span class="hljs-title function_">toEqual</span>([{ <span class="hljs-attr">venue</span>: <span class="hljs-string">&#x27;Wembley&#x27;</span>, <span class="hljs-attr">date</span>: <span class="hljs-string">&#x27;2024-10-05&#x27;</span> }]);
  });
});
</code></pre>
<p>في هذا المثال، نحاكي وحدة واجهة برمجة التطبيقات بأكملها، بما يضمن ألا يجري الاختبار أي طلبات حقيقية إليها. يعيد البديل المُحاكى بيانات محددة مسبقًا، ما يتيح لك التحكم في سيناريو الاختبار بالكامل.</p>
<p>سواء كنت تحاكي واجهات برمجة التطبيقات أو قواعد البيانات أو أنظمة الملفات، فإن المحاكاة تضمن بقاء اختباراتك قابلة للتوقع وسريعة ومركّزة على المنطق قيد الاختبار. تذكّر دائمًا ودائمًا ودائمًا بإعادة تعيين البدائل المُحاكاة أو استعادتها بعد الاختبارات للحفاظ على بيئة اختبار نظيفة ومتسقة.</p>
<h2 id="vidomock"><code>vi.doMock</code></h2>
<p><a href="https://vitest.dev/api/vi.html#vi-domock"><code>vi.doMock</code></a> هو في الأساس نفس <code>vi.mock</code> باستثناء أنه <em>غير</em> مرفوع إلى الأعلى (hoisted)، مما يعني أن لديك وصولًا إلى المتغيرات. سيُحاكى الاستيراد <em>التالي</em> لتلك الوحدة.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/testing/mocking-the-file-system">محاكاة نظام الملفات</a></li>
</ul>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:l,headings:e,html:p};export{s as book,n as chapter,a as chapterTitle,c as default,e as headings,p as html,t as slug,l as title};
