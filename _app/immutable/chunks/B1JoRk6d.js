const s="kinney",n="self-testing-ai-agents",a="وكلاء ذكاء اصطناعي يختبرون أنفسهم",t="wrap-a-custom-verification-mcp-solution",p="الحل",l=[{depth:2,id:"ما-الذي-تضيفه",text:"ما الذي تضيفه"},{depth:3,id:"toolsshelf-verification-serverserverts",text:"tools/shelf-verification-server/server.ts"},{depth:3,id:"mcpjson",text:".mcp.json"},{depth:2,id:"ما-الذي-ما-زال-عليك-تشغيله",text:"ما الذي ما زال عليك تشغيله"},{depth:3,id:"ابدأ-خادم-المعاينة",text:"ابدأ خادم المعاينة"},{depth:3,id:"تحقق-من-أن-الخادم-يبدأ",text:"تحقّق من أن الخادم يبدأ"},{depth:3,id:"اختبره-عبر-الوكيل",text:"اختبره عبر الوكيل"},{depth:3,id:"اختبر-مسار-الفشل",text:"اختبر مسار الفشل"},{depth:3,id:"تحقق-من-عدم-وجود-عمليات-زومبي",text:"تحقّق من عدم وجود عمليات زومبي"},{depth:2,id:"أنماط-تأخذها-معك",text:"أنماط تأخذها معك"},{depth:2,id:"قراءة-إضافية",text:"قراءة إضافية"}],e=`<p>مقدّمة هذا المخبر كلها هي: ماذا لو استطاع وكيلك <em>أن ينظر إلى التطبيق العامل</em> بدلًا من قراءة مخرجات الاختبارات فقط؟ لا بمعنى «الرؤية بالذكاء الاصطناعي» الغامض، بل ملموسًا — أطلق متصفحًا، وانتقل إلى صفحة، وعُدّ العناصر، واجمع الأخطاء، وأعد JSON مهيكلًا. المشروع الأولي Shelf الحالي لا يشحن هذه المساعدة، لذا هذا الحل هو الشيفرة التي تضيفها أثناء المخبر.</p>
<h2 id="ما-الذي-تضيفه">ما الذي تضيفه</h2>
<p>ركّب الحزم الناقصة أولًا:</p>
<pre><code class="language-bash">npm install -D @modelcontextprotocol/sdk zod
</code></pre>
<h3 id="toolsshelf-verification-serverserverts"><code>tools/shelf-verification-server/server.ts</code></h3>
<p>هذا خادم MCP قائم بذاته. يسجّل أداة واحدة، <code>verify_shelf_page</code>، تأخذ اسم مستخدم وتعيد تقريرًا مهيكلًا عن حالة صفحة رفّ ذلك المستخدم.</p>
<p>تهيئة الخادم بسيطة:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> fs <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;node:fs&#x27;</span>;
<span class="hljs-keyword">import</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;node:path&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">McpServer</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@modelcontextprotocol/sdk/server/mcp.js&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">StdioServerTransport</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@modelcontextprotocol/sdk/server/stdio.js&#x27;</span>;
<span class="hljs-keyword">import</span> { chromium } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;playwright&#x27;</span>;
<span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">STORAGE_STATE_PATH</span> = path.<span class="hljs-title function_">resolve</span>(<span class="hljs-string">&#x27;playwright/.authentication/user.json&#x27;</span>);
<span class="hljs-keyword">const</span> baseUrl = process.<span class="hljs-property">env</span>.<span class="hljs-property">SHELF_BASE_URL</span> ?? <span class="hljs-string">&#x27;http://127.0.0.1:4173&#x27;</span>;

<span class="hljs-keyword">const</span> server = <span class="hljs-keyword">new</span> <span class="hljs-title class_">McpServer</span>({
  <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;shelf-verification&#x27;</span>,
  <span class="hljs-attr">version</span>: <span class="hljs-string">&#x27;0.1.0&#x27;</span>,
});
</code></pre>
<p><code>McpServer</code> من حزمة SDK تتولى تأطير JSON-RPC. أما <code>StdioServerTransport</code> فتعني أن الخادم يتواصل عبر stdin/stdout — عملية الوكيل تُطلقه كطفل وتُمرّر الرسائل ذهابًا وإيابًا. لا HTTP، ولا منافذ، ولا صداع CORS.</p>
<p>تسجيل الأداة هو حيث يحدث العمل الحقيقي:</p>
<pre><code class="language-typescript">server.<span class="hljs-title function_">registerTool</span>(
  <span class="hljs-string">&#x27;verify_shelf_page&#x27;</span>,
  {
    <span class="hljs-attr">description</span>:
      <span class="hljs-string">&#x27;Open the Shelf app and verify the public /shelf/[username] route renders correctly.&#x27;</span>,
    <span class="hljs-attr">inputSchema</span>: {
      <span class="hljs-attr">username</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">1</span>).<span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;The reader handle, e.g. &quot;alice&quot; for alice@example.com&#x27;</span>),
    },
    <span class="hljs-attr">outputSchema</span>: {
      <span class="hljs-attr">ok</span>: z.<span class="hljs-title function_">boolean</span>(),
      <span class="hljs-attr">bookCount</span>: z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">int</span>().<span class="hljs-title function_">nonnegative</span>(),
      <span class="hljs-attr">consoleErrors</span>: z.<span class="hljs-title function_">array</span>(z.<span class="hljs-title function_">string</span>()),
      <span class="hljs-attr">url</span>: z.<span class="hljs-title function_">string</span>(),
    },
  },
  <span class="hljs-title function_">async</span> ({ username }) =&gt; {
    <span class="hljs-comment">// ...</span>
  },
);
</code></pre>
<p>يستخدم كلٌّ من <code>inputSchema</code> و<code>outputSchema</code> مكتبة Zod. وتُسلسلها SDK إلى JSON Schema لقائمة أدوات الوكيل، فيعرف الوكيل بالضبط ما سيعود إليه قبل أن يستدعي الأداة. هذا هو العقد المهيكل الذي يجعل أدوات MCP قابلة للتركيب — لا يضطر الوكيل إلى تحليل نثر من وصف أداة ليفهم شكل الاستجابة.</p>
<p>داخل المعالج، تُطلق الأداة Chromium، وتنتقل، وتجمع البيانات:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> targetUrl = <span class="hljs-string">\`<span class="hljs-subst">\${baseUrl}</span>/shelf/<span class="hljs-subst">\${<span class="hljs-built_in">encodeURIComponent</span>(username)}</span>\`</span>;
<span class="hljs-keyword">const</span> browser = <span class="hljs-keyword">await</span> chromium.<span class="hljs-title function_">launch</span>();
<span class="hljs-keyword">try</span> {
  <span class="hljs-keyword">const</span> contextOptions = fs.<span class="hljs-title function_">existsSync</span>(<span class="hljs-variable constant_">STORAGE_STATE_PATH</span>)
    ? { <span class="hljs-attr">storageState</span>: <span class="hljs-variable constant_">STORAGE_STATE_PATH</span> }
    : {};
  <span class="hljs-keyword">const</span> context = <span class="hljs-keyword">await</span> browser.<span class="hljs-title function_">newContext</span>(contextOptions);
  <span class="hljs-keyword">const</span> page = <span class="hljs-keyword">await</span> context.<span class="hljs-title function_">newPage</span>();

  <span class="hljs-keyword">const</span> <span class="hljs-attr">consoleErrors</span>: <span class="hljs-built_in">string</span>[] = [];
  page.<span class="hljs-title function_">on</span>(<span class="hljs-string">&#x27;console&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">message</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (message.<span class="hljs-title function_">type</span>() === <span class="hljs-string">&#x27;error&#x27;</span>) {
      consoleErrors.<span class="hljs-title function_">push</span>(message.<span class="hljs-title function_">text</span>());
    }
  });

  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(targetUrl);
  <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;heading&#x27;</span>, { <span class="hljs-attr">level</span>: <span class="hljs-number">1</span> }).<span class="hljs-title function_">waitFor</span>();

  <span class="hljs-keyword">const</span> bookCount = <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;article&#x27;</span>).<span class="hljs-title function_">count</span>();

  <span class="hljs-keyword">const</span> <span class="hljs-attr">result</span>: <span class="hljs-title class_">VerifyShelfPageResult</span> = {
    <span class="hljs-attr">ok</span>: consoleErrors.<span class="hljs-property">length</span> === <span class="hljs-number">0</span> &amp;&amp; bookCount &gt;= <span class="hljs-number">0</span>,
    bookCount,
    consoleErrors,
    <span class="hljs-attr">url</span>: targetUrl,
  };

  <span class="hljs-keyword">return</span> {
    <span class="hljs-attr">content</span>: [{ <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;text&#x27;</span>, <span class="hljs-attr">text</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>(result, <span class="hljs-literal">null</span>, <span class="hljs-number">2</span>) }],
    <span class="hljs-attr">structuredContent</span>: result,
  };
} <span class="hljs-keyword">finally</span> {
  <span class="hljs-keyword">await</span> browser.<span class="hljs-title function_">close</span>();
}
</code></pre>
<p>بضعة أمور تستحق الملاحظة:</p>
<ul>
<li><strong>إعادة استخدام حالة التخزين.</strong> إن وُجد ملف حالة مصادقة Playwright (من تشغيل اختبارات سابق)، تعيد الأداة استخدامه. مسار <code>/shelf/[username]</code> عام، لذا هذا ليس ضروريًا تمامًا — لكنه يُبقي جلسة الأداة متسقة مع بقية أدوات الورشة.</li>
<li><strong>جمع أخطاء الطرفية.</strong> مستمع <code>page.on('console')</code> يلتقط كل استدعاء <code>console.error</code> من التطبيق العامل. هذا هو فحص «هل انفجر شيء لم تُظهره الصفحة بصريًا؟». وتُبلغ الأداة بـ <code>ok: false</code> عند وجود أخطاء طرفية، حتى لو صُيّرت الصفحة صحيحًا.</li>
<li><strong><code>finally</code> يغلق المتصفح.</strong> هذا هو منع العمليات الزومبي. إن رمى الانتقال استثناءً، أو انتهت مهلة الصفحة، أو فشل العدّ — يُغلق المتصفح على أي حال. بدونه كنت ستُسرّب عمليات Chromium مع كل خطأ.</li>
<li><strong>عائد مهيكل.</strong> تدعم SDK الخاصة بـ MCP كلا الأمرين: <code>content</code> (لوكلاء يقرأون النص) و<code>structuredContent</code> (لوكلاء يحلّلون JSON). إعادة الاثنين تعني أن الأداة تعمل مع أي عميل MCP.</li>
</ul>
<h3 id="mcpjson"><code>.mcp.json</code></h3>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;svelte&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;stdio&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;npx&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;env&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span><span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;args&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;-y&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;@sveltejs/mcp&quot;</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;shelf-verification&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;stdio&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;command&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;npx&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;args&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;tsx&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;./tools/shelf-verification-server/server.ts&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;env&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;SHELF_BASE_URL&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;http://127.0.0.1:4173&quot;</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>يعيش ملف <code>.mcp.json</code> في جذر المستودع ويخبر Claude Code (أو أي وكيل يفهم MCP) كيف يبدأ الخادم. مدخل <code>type: &quot;stdio&quot;</code> يعني أن الوكيل يُطلق <code>npx tsx ./tools/shelf-verification-server/server.ts</code> كعملية طفل ويتواصل عبر الأنابيب. ويشير <code>SHELF_BASE_URL</code> إلى خادم المعاينة — الخادم نفسه الذي يستهدفه Playwright.</p>
<p>مدخل <code>svelte</code> كان موجودًا بالفعل. ومدخل <code>shelf-verification</code> هو ما يضيفه هذا المخبر.</p>
<h2 id="ما-الذي-ما-زال-عليك-تشغيله">ما الذي ما زال عليك تشغيله</h2>
<h3 id="ابدأ-خادم-المعاينة">ابدأ خادم المعاينة</h3>
<p>تحتاج أداة التحقق إلى تطبيق عامل تضربه. ابنِ ثم اعرض:</p>
<pre><code class="language-bash">npm run build &amp;&amp; npm run preview -- --host 127.0.0.1 --port 4173
</code></pre>
<p>اتركه يعمل في طرفية منفصلة.</p>
<h3 id="تحقق-من-أن-الخادم-يبدأ">تحقّق من أن الخادم يبدأ</h3>
<p>في طرفية أخرى، تأكّد من أن خادم MCP يُقلع دون أن ينهار:</p>
<pre><code class="language-bash">npx tsx ./tools/shelf-verification-server/server.ts
</code></pre>
<p>ينبغي أن تراه يتوقّف منتظرًا stdin (هذا صحيح — إنه ينتظر رسائل JSON-RPC من عميل MCP). أنهِه بـ Ctrl+C.</p>
<h3 id="اختبره-عبر-الوكيل">اختبره عبر الوكيل</h3>
<p>أعد تشغيل Claude Code في مجلد مستودع Shelf. بعد إعادة التشغيل، ينبغي أن ترى <code>shelf-verification</code> مدرجًا في خوادم MCP المتاحة. وينبغي أن تظهر أداة <code>verify_shelf_page</code> في قائمة أدوات الوكيل.</p>
<p>اطلب من الوكيل:</p>
<blockquote>
<p>تحقّق من صفحة الرفّ الخاصة بالمستخدم «alice».</p>
</blockquote>
<p>ينبغي أن يستدعي الوكيل <code>verify_shelf_page</code> مع <code>username: &quot;alice&quot;</code> ويعيد شيئًا مثل:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;ok&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;bookCount&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">5</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;consoleErrors&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;url&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;http://127.0.0.1:4173/shelf/alice&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h3 id="اختبر-مسار-الفشل">اختبر مسار الفشل</h3>
<p>لتأكيد أن الأداة تلتقط الأخطاء، أضف <code>console.error</code> متعمدًا إلى أحد مسارات Shelf. مثلًا، في <code>src/routes/shelf/[username]/+page.svelte</code>، أضف:</p>
<pre><code class="language-svelte">&lt;script&gt;
  console.error('Deliberate error for MCP verification test');
&lt;/script&gt;
</code></pre>
<p>أعد البناء، وأعد تشغيل المعاينة، واطلب من الوكيل التحقق مرة أخرى. هذه المرة ينبغي أن تُظهر النتيجة <code>ok: false</code> مع رسالة الخطأ في <code>consoleErrors</code>.</p>
<p>أزل الخطأ المتعمد حين تنتهي.</p>
<h3 id="تحقق-من-عدم-وجود-عمليات-زومبي">تحقّق من عدم وجود عمليات زومبي</h3>
<p>بعد تشغيل الأداة بضع مرات، تأكّد من عدم بقاء عمليات Chromium معلّقة:</p>
<pre><code class="language-bash">ps aux | grep -i chromium | grep -v grep
</code></pre>
<p>ينبغي أن تمنع كتلة <code>finally</code> في المعالج التسريبات، لكن التأكيد يستحق العناء. إن رأيت عمليات يتيمة، فشيء ما في مسار الخطأ لا ينظّف.</p>
<h2 id="أنماط-تأخذها-معك">أنماط تأخذها معك</h2>
<ul>
<li><strong>مهيكل داخلًا، مهيكل خارجًا.</strong> مخططات Zod على المدخل والمخرج معًا تعني أن الوكيل لا يضطر أبدًا إلى تخمين صيغة الاستجابة. هذا ما يفصل أداة MCP عن «شغّل سكربتًا وحلّل stdout».</li>
<li><strong>Stdio أبسط ناقل.</strong> لا خادم تُهيّئه، ولا منافذ تديرها، ولا مصادقة توصّلها. الوكيل يُطلق العملية، ويرسل JSON-RPC عبر الأنابيب، ويستقبل JSON-RPC. لأدوات التطوير المحلية، هذا هو الخيار الصحيح دائمًا تقريبًا.</li>
<li><strong>أتمتة المتصفح داخل أداة أمر قوي.</strong> الأداة لا تلتقط صورة شاشة ولا تشغّل OCR. إنها تنتقل بـ Playwright، وتعدّ عناصر DOM بحسب الدور، وتجمع أخطاء الطرفية. يحصل الوكيل على بيانات دقيقة ومهيكلة عن التطبيق العامل فعلًا.</li>
<li><strong><code>finally</code> عنصر حامل.</strong> تنظيف المتصفح في كتلة <code>finally</code> ليس برمجة دفاعية — إنه الفرق بين أداة تعمل مرة وأداة تعمل بموثوقية. عمليات Chromium المتسرّبة ستأكل ذاكرة جهازك وتسبب في النهاية إخفاقات غامضة.</li>
<li><strong>أداة واحدة، سؤال واحد.</strong> تجيب <code>verify_shelf_page</code> عن «هل تُصيَّر صفحة رفّ هذا المستخدم صحيحًا؟». إنها لا تفحص الأداء أيضًا، ولا تشغّل تدقيقات إمكانية الوصول، ولا تتحقق من طبقة API. الإبقاء على الأدوات ضيقة يجعلها قابلة للتركيب.</li>
</ul>
<h2 id="قراءة-إضافية">قراءة إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/lab-wrap-a-custom-verification-mcp">مخبر: غلّف تحققًا مخصصًا في MCP</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/writing-a-custom-mcp-wrapper">كتابة غلاف MCP مخصص</a></li>
</ul>
`,o={book:s,chapter:n,chapterTitle:a,slug:t,title:p,headings:l,html:e};export{s as book,n as chapter,a as chapterTitle,o as default,l as headings,e as html,t as slug,p as title};
