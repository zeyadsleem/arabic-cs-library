const s="kinney",n="self-testing-ai-agents",a="وكلاء ذكاء اصطناعي يختبرون أنفسهم",l="writing-a-custom-mcp-wrapper",t="كتابة غلاف MCP مخصّص",p=[{depth:2,id:"ما-الذي-نبنيه",text:"ما الذي نبنيه"},{depth:2,id:"الهيكل-العظمي",text:"الهيكل العظمي"},{depth:2,id:"توصيله-بمضيف-mcp-المحلي-لديك",text:"توصيله بمضيف MCP المحلي لديك"},{depth:2,id:"لماذا-يتفوق-هذا-على-ركبه-بنفسك",text:"لماذا يتفوّق هذا على «ركّبه بنفسك»"},{depth:2,id:"ما-الذي-تغلفه-وما-الذي-تتركه",text:"ما الذي تُغلّفه وما الذي تتركه"},{depth:2,id:"تشخيص-أخطاء-mcp-المخصصة",text:"تشخيص أخطاء MCP المخصّصة"},{depth:2,id:"قواعد-الوكيل",text:"قواعد الوكيل"},{depth:2,id:"الشيء-الوحيد-الذي-يجب-تذكره",text:"الشيء الوحيد الذي يجب تذكّره"},{depth:2,id:"قراءات-إضافية",text:"قراءات إضافية"}],e=`<p>إن Playwright MCP عامّ بحكم التصميم. فهو يعرض واجهة Playwright البرمجية في صورة أدوات، ويتعيّن على الوكيل أن يستنتج أي توليفة من الأجزاء الأولية (primitives) يستدعيها لينجز ما تريد. هذا مقبول في معظم الأحيان — فالوكيل بارع في تركيب الأجزاء الأولية.</p>
<p>لكنه ليس مقبولًا دائمًا. أحيانًا تريد أن تكون لدى الوكيل أداة واحدة اسمها «تحقّق من أن صفحة الرفّ تُصيَّر بشكل صحيح» تفعل ستة أشياء في الخلف وتعيد نتيجة مُهيكلة. لا تريد أن يضطر الوكيل إلى استنتاج كيفية تركيب تلك الأشياء الستة من الصفر في كل مرة، لأنه سيخطئ خطأً طفيفًا مرة من كل خمس، وستبقى أنت عالقًا في تشخيص استدعاء MCP.</p>
<p>الحل هو أن تغلّف MCP خاصًا بك. الأمر ليس صعبًا. بل هو في الحقيقة سهل إلى حدّ محرج مع <a href="https://github.com/modelcontextprotocol/typescript-sdk">MCP TypeScript SDK</a>، والعائد — أداة تحقّق مخصّصة مفصّلة على مقاس قاعدة شيفرتك بالضبط — عائد ضخم.</p>
<p>وللمراجعة السريعة لما هو <a href="https://modelcontextprotocol.io/">بروتوكول سياق النموذج</a> (Model Context Protocol) وكيف يعمل، راجع المواصفة. في هذا الدرس يكفي أن تعرف أن خادم MCP عملية فرعية (subprocess) تعرض أدوات للوكيل.</p>
<h2 id="ما-الذي-نبنيه">ما الذي نبنيه</h2>
<p>خادم MCP صغير بأداة واحدة اسمها <code>verify_shelf_page</code>. وعند استدعائها فإنه:</p>
<ol>
<li>يشغّل Playwright على <code>http://127.0.0.1:4173/shelf/&lt;username&gt;</code> افتراضيًا. و<code>&lt;username&gt;</code> هو الجزء المكتوب بحروف صغيرة من بريد القارئ قبل <code>@</code>، لذا يصبح <a href="mailto:alice@example.com">alice@example.com</a> هو <code>alice</code>. ويمكن لـ <code>SHELF_BASE_URL</code> تجاوز المضيف عند الحاجة.</li>
<li>ينتظر حتى يصبح عنوان الرفّ من المستوى الأول مرئيًا.</li>
<li>يعدّ الكتب المُصيَّرة كعناصر <code>&lt;article&gt;</code>.</li>
<li>يلتقط أي أخطاء في وحدة التحكّم تُصدَر أثناء تحميل الصفحة.</li>
<li>يعيد كتلة JSON مُهيكلة: <code>{ ok: boolean, bookCount: number, consoleErrors: string[], url: string }</code>.</li>
</ol>
<p>يستطيع الوكيل الآن استدعاء <code>verify_shelf_page</code> والحصول على جواب مُهيكل بضربة واحدة على سؤال «هل هذه الصفحة في حالة جيدة؟». لا تركيب، ولا تخمين، ولا «هل تذكّرت أن تفحص وحدة التحكّم؟». كل ذلك داخل الأداة.</p>
<p>يسجّل Shelf الخادم في ملف <code>.mcp.json</code> محلي داخل المستودع، ويستخرج عنوان URL الهدف من <code>SHELF_BASE_URL</code>، ويكون الافتراضي <code>http://127.0.0.1:4173</code>. والمسار <code>/shelf/[username]</code> عام، لذا لا يحتاج الخادم إلى مصادقة بالمعنى الدقيق — لكنه يعيد استخدام حالة التخزين الموجودة في <code>playwright/.authentication/user.json</code> عندما تكون موجودة، حتى تبقى جلسة المتصفح متسقة مع بقية أدوات الورشة.</p>
<p>في النسخة الابتدائية الحالية، لا يزال ذلك المسار الهدف هو الملف الحقيقي <code>src/routes/shelf/[username]/+page.svelte</code>، لكن خادم التحقّق المخصّص نفسه شيء تضيفه لاحقًا في الدورة. وهذا هو النمط الذي يجب نسخه: مسار حقيقي، وتسجيل محلي في المستودع داخل <code>.mcp.json</code>، ومِسبار واحد محدّد الحواف.</p>
<h2 id="الهيكل-العظمي">الهيكل العظمي</h2>
<p>هذا هو الخادم كله، منزوعًا منه معالجة الأخطاء اختصارًا. إنه نحو خمسين سطرًا.</p>
<p>يستخدم <a href="https://playwright.dev/docs/api/class-browsertype">واجهة Playwright البرمجية</a> لتشغيل المتصفحات وقيادة الصفحات. وكل ما يأتي من <code>chromium.launch()</code> فصاعدًا هو Playwright قياسي.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// tools/shelf-verification-server/server.ts</span>
<span class="hljs-keyword">import</span> fs <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;node:fs&#x27;</span>;
<span class="hljs-keyword">import</span> path <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;node:path&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">McpServer</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@modelcontextprotocol/sdk/server/mcp.js&#x27;</span>;
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">StdioServerTransport</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@modelcontextprotocol/sdk/server/stdio.js&#x27;</span>;
<span class="hljs-keyword">import</span> { chromium } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;playwright&#x27;</span>;
<span class="hljs-keyword">import</span> { z } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;zod&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">STORAGE_STATE_PATH</span> = path.<span class="hljs-title function_">resolve</span>(<span class="hljs-string">&#x27;playwright/.authentication/user.json&#x27;</span>);
<span class="hljs-keyword">const</span> baseUrl = process.<span class="hljs-property">env</span>.<span class="hljs-property">SHELF_BASE_URL</span> ?? <span class="hljs-string">&#x27;http://127.0.0.1:4173&#x27;</span>;

<span class="hljs-keyword">const</span> server = <span class="hljs-keyword">new</span> <span class="hljs-title class_">McpServer</span>({ <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;shelf-verification&#x27;</span>, <span class="hljs-attr">version</span>: <span class="hljs-string">&#x27;0.1.0&#x27;</span> });

server.<span class="hljs-title function_">registerTool</span>(
  <span class="hljs-string">&#x27;verify_shelf_page&#x27;</span>,
  {
    <span class="hljs-attr">description</span>:
      <span class="hljs-string">&#x27;Open the Shelf app and verify the public /shelf/[username] route renders correctly.&#x27;</span>,
    <span class="hljs-attr">inputSchema</span>: {
      <span class="hljs-attr">username</span>: z.<span class="hljs-title function_">string</span>().<span class="hljs-title function_">min</span>(<span class="hljs-number">1</span>),
    },
    <span class="hljs-attr">outputSchema</span>: {
      <span class="hljs-attr">ok</span>: z.<span class="hljs-title function_">boolean</span>(),
      <span class="hljs-attr">bookCount</span>: z.<span class="hljs-title function_">number</span>().<span class="hljs-title function_">int</span>().<span class="hljs-title function_">nonnegative</span>(),
      <span class="hljs-attr">consoleErrors</span>: z.<span class="hljs-title function_">array</span>(z.<span class="hljs-title function_">string</span>()),
      <span class="hljs-attr">url</span>: z.<span class="hljs-title function_">string</span>(),
    },
  },
  <span class="hljs-title function_">async</span> ({ username }) =&gt; {
    <span class="hljs-keyword">const</span> targetUrl = <span class="hljs-string">\`<span class="hljs-subst">\${baseUrl}</span>/shelf/<span class="hljs-subst">\${<span class="hljs-built_in">encodeURIComponent</span>(username)}</span>\`</span>;
    <span class="hljs-keyword">const</span> browser = <span class="hljs-keyword">await</span> chromium.<span class="hljs-title function_">launch</span>();
    <span class="hljs-keyword">try</span> {
      <span class="hljs-keyword">const</span> contextOptions = fs.<span class="hljs-title function_">existsSync</span>(<span class="hljs-variable constant_">STORAGE_STATE_PATH</span>)
        ? { <span class="hljs-attr">storageState</span>: <span class="hljs-variable constant_">STORAGE_STATE_PATH</span> }
        : {};
      <span class="hljs-keyword">const</span> context = <span class="hljs-keyword">await</span> browser.<span class="hljs-title function_">newContext</span>(contextOptions);
      <span class="hljs-keyword">const</span> page = <span class="hljs-keyword">await</span> context.<span class="hljs-title function_">newPage</span>();

      <span class="hljs-keyword">const</span> <span class="hljs-attr">consoleErrors</span>: <span class="hljs-built_in">string</span>[] = [];
      page.<span class="hljs-title function_">on</span>(<span class="hljs-string">&#x27;console&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">message</span>) =&gt;</span> {
        <span class="hljs-keyword">if</span> (message.<span class="hljs-title function_">type</span>() === <span class="hljs-string">&#x27;error&#x27;</span>) consoleErrors.<span class="hljs-title function_">push</span>(message.<span class="hljs-title function_">text</span>());
      });

      <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">goto</span>(targetUrl);
      <span class="hljs-keyword">const</span> heading = page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;heading&#x27;</span>, { <span class="hljs-attr">level</span>: <span class="hljs-number">1</span>, <span class="hljs-attr">name</span>: <span class="hljs-regexp">/shelf/i</span> });
      <span class="hljs-keyword">await</span> heading.<span class="hljs-title function_">waitFor</span>();

      <span class="hljs-keyword">const</span> bookCount = <span class="hljs-keyword">await</span> page.<span class="hljs-title function_">getByRole</span>(<span class="hljs-string">&#x27;article&#x27;</span>).<span class="hljs-title function_">count</span>();
      <span class="hljs-keyword">const</span> status = response?.<span class="hljs-title function_">status</span>() ?? <span class="hljs-number">0</span>;
      <span class="hljs-keyword">const</span> headingVisible = <span class="hljs-keyword">await</span> heading.<span class="hljs-title function_">isVisible</span>();

      <span class="hljs-keyword">const</span> result = {
        <span class="hljs-attr">ok</span>: status &gt;= <span class="hljs-number">200</span> &amp;&amp; status &lt; <span class="hljs-number">300</span> &amp;&amp; headingVisible &amp;&amp; consoleErrors.<span class="hljs-property">length</span> === <span class="hljs-number">0</span>,
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
  },
);

<span class="hljs-keyword">const</span> transport = <span class="hljs-keyword">new</span> <span class="hljs-title class_">StdioServerTransport</span>();
<span class="hljs-keyword">await</span> server.<span class="hljs-title function_">connect</span>(transport);
</code></pre>
<p>هذا هو الخادم كله. وأجزاؤه الثلاثة هي:</p>
<ul>
<li><strong>قائمة الأدوات.</strong> أخبر الوكيل بالأدوات الموجودة وبشكل مدخلاتها. وهذا يناظر مباشرةً ما يراه الوكيل في لوحة أدواته.</li>
<li><strong>تنفيذ الأداة.</strong> عندما يستدعي الوكيل الأداة، تشغّل أنت أي شيفرة تريدها، بأي مكتبات تريد، وتعيد مخرجات مُهيكلة.</li>
<li><strong>النقل.</strong> نقل stdio يعني أن الخادم يتحدّث إلى الوكيل عبر المدخل والمخرج القياسيين. ويشغّل الوكيل الخادم كعملية فرعية. هذا أبسط من HTTP، وهو الافتراضي الصحيح للأدوات المحلية.</li>
</ul>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>لاحظ ما يغيب عن المثال: <code>waitUntil: 'networkidle'</code>. ينتظر الخادم عنوان الرفّ لأن ذلك هو إشارة النجاح الفعلية لهذا المسبار. وقواعد الانتظار نفسها من درس Playwright تنطبق داخل أدوات MCP المخصّصة التي تكتبها.</p>
</blockquote>
<h2 id="توصيله-بمضيف-mcp-المحلي-لديك">توصيله بمضيف MCP المحلي لديك</h2>
<p>في مستودع Shelf المحلي لهذه الدورة، تعيش تهيئة MCP في <code>.mcp.json</code> في جذر المستودع. أضف مُدخلًا:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;mcpServers&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
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
<p>أعد تشغيل مضيف MCP. ينبغي أن تظهر أداة <code>verify_shelf_page</code> الجديدة في قائمة الأدوات. اطلب من الوكيل أن «يتحقّق من صفحة الرفّ الخاصة بـ alice» فينبغي أن يختار الأداة الصحيحة تلقائيًا.</p>
<p>إذا كان محرّرك أو مضيف الوكيل يستخدم مسار تهيئة مختلفًا، فالمفهوم نفسه حتى لو انتقل الملف. والشيء الوحيد الذي يتغيّر هو موضع تسجيل العملية الفرعية.</p>
<h2 id="لماذا-يتفوق-هذا-على-ركبه-بنفسك">لماذا يتفوّق هذا على «ركّبه بنفسك»</h2>
<p>إليك جوهر الأمر في امتلاك أداة تحقّق مخصّصة. ليس أن الوكيل <em>لا يستطيع</em> فتح Playwright والتنقّل وعدّ الكتب وقراءة وحدة التحكّم بتركيب أدوات MCP أولية. بل يستطيع. المشكلة أن كل مرة يفعل فيها ذلك يتخذ قرارات صغيرة — أي محدّد (selector) يستخدم للعنوان، وهل ينتظر المقالات، وكم ينتظر، وهل يُطبّع نص وحدة التحكّم قبل المقارنة. وكل قرار من هذه قرار يُعرّض الجواب لأن يكون خاطئًا على نحو خفيّ.</p>
<p>الأداة المخصّصة تُرمّز الجواب <em>الصحيح</em> مرة واحدة، في الشيفرة، حيث تستطيع اختباره. فيتوقف الوكيل عن اتخاذ تلك القرارات ويبدأ في استهلاك نتيجة معروفة الجودة. ولأن النتيجة مُهيكلة (<code>bookCount: number</code>)، يستطيع الوكيل أن يستدلّ عليها بالموثوقية نفسها التي يتعامل بها مع أي JSON يصله من API. لا هلوسة حول معنى «تحقّق بنجاح» — فالأداة إمّا أعادت <code>{ ok: true }</code> أو لم تُعِد.</p>
<p>أنا أنظر إلى أدوات MCP المخصّصة بوصفها نقيض التلقين (prompting). فالتلقين يقول: «عزيزي النموذج اللغوي، من فضلك افعل هذا الشيء بشكل صحيح». أما الأداة المخصّصة فتقول: «لقد كتبت هذا الشيء بشكل صحيح بالفعل. وها هو في صورة دالة».</p>
<h2 id="ما-الذي-تغلفه-وما-الذي-تتركه">ما الذي تُغلّفه وما الذي تتركه</h2>
<p>ليست كل الأشياء تحتاج غلافًا مخصّصًا. وهذا هو دليلي الاستدلالي.</p>
<p><strong>غلّفه إذا:</strong> كان الفحص خاصًا بقاعدة شيفرتك، ويُشغَّل أكثر من بضع مرات في اليوم، وقد أخطأ فيه الوكيل مرة على الأقل. هذه هي الأشياء التي يكون فيها معدّل خطأ الوكيل الحدّي مضروبًا في معدّل إزعاجه لك مرتفعًا بما يكفي ليعود الغلاف المخصّص بنفعه سريعًا.</p>
<p><strong>ولا تغلّفه إذا:</strong> كانت أدوات MCP الجاهزة تؤدّيه جيدًا، وكان الفحص عامًّا («انقر زرًّا، واقرأ النتيجة»)، ولن تشغّله إلا بضع مرات. فالغلاف يستغرق ساعة. والمهمة العامة التي تُنفَّذ مرة واحدة لا تستحقّ تلك الساعة.</p>
<p>أمثلة غلّفتها:</p>
<ul>
<li><code>verify_shelf_page</code> (هذا الدرس)</li>
<li><code>check_accessibility</code> — يشغّل axe-core على عنوان URL ويعيد الانتهاكات بصيغة JSON، ليستطيع الوكيل التصرّف بناءً عليها دون تحليل تقارير HTML</li>
<li><code>database_snapshot</code> — يُفرّغ الحالة الراهنة لقاعدة بيانات الاختبار بصيغة JSON، ليستطيع الوكيل الاستدلال على الحالة بين استدعاءات API</li>
</ul>
<p>أمثلة لم أغلّفها:</p>
<ul>
<li>«انقر هذا الزر واقرأ الاستجابة». يتعامل Playwright MCP مع هذا جيدًا.</li>
<li>«خُذ لقطة شاشة». هذه أولية بالفعل.</li>
<li>«شغّل الاختبارات». أداة الصدفة هي الأداة الصحيحة؛ ولا شيء هنا يستدعي التغليف.</li>
</ul>
<h2 id="تشخيص-أخطاء-mcp-المخصصة">تشخيص أخطاء MCP المخصّصة</h2>
<p>أدوات MCP المخصّصة عمليات فرعية تتحدّث عبر stdio. وعندما تتعطّل، تتعطّل بصمت ويقول الوكيل فقط «فشل استدعاء الأداة». وفيما يلي أمور قليلة يجدر معرفتها:</p>
<ul>
<li>سجّل إلى stderr. فأي شيء تكتبه إلى stdout سيُفسَّر رسالة MCP وسيُسقِط البروتوكول. استخدم <code>console.error(...)</code> للتسجيل.</li>
<li>اكتب السجلات إلى ملف. و<code>fs.appendFileSync('./mcp-log.txt', ...)</code> عكّاز تصحيح مفيد. راقب نهاية الملف في طرفية أخرى أثناء تطويرك.</li>
<li>اختبر الخادم منفردًا بأداة MCP inspector قبل توصيله بوكيل. يستغرق ثلاثين ثانية ويوفّر ساعات.</li>
</ul>
<h2 id="قواعد-الوكيل">قواعد الوكيل</h2>
<p>أضف إلى الملف:</p>
<pre><code class="language-markdown"><span class="hljs-section">## Custom MCP tools</span>

When verifying UI changes, prefer custom tools over composing primitives.
Specifically:

<span class="hljs-bullet">-</span> Use <span class="hljs-code">\`verify_shelf_page\`</span> instead of hand-rolling a Playwright probe of
  <span class="hljs-code">\`/shelf\`</span>. It checks book count and console errors in one call.
<span class="hljs-bullet">-</span> Use <span class="hljs-code">\`check_accessibility\`</span> to run axe-core against a URL and get
  structured violations back.
<span class="hljs-bullet">-</span> If you find yourself composing the same three primitive tool calls
  more than twice in a conversation, flag it—it&#x27;s probably worth a
  new custom tool.
</code></pre>
<p>القاعدة الأخيرة هي المفضّلة عندي. فهي تدفع كلفة التغليف إلى حلقة عمل الوكيل — فإن لاحظ النمط، استطاع أن يطلب أداة جديدة، وتستطيع أنت كتابتها في الاستراحة التالية.</p>
<h2 id="الشيء-الوحيد-الذي-يجب-تذكره">الشيء الوحيد الذي يجب تذكّره</h2>
<p>أدوات MCP الجاهزة عامة. أما المخصّصة فتُرمّز منطق تحقّقك الخاص مرة واحدة، في الشيفرة، وتمنح الوكيل جوابًا موثوقًا مُهيكلًا. وكل ساعة تنفقها في كتابة واحدة منها توفّر على الوكيل ساعة من تركيب الأوليّات بشكل رديء. فغلّف الفحوص التي تهمّك أكثر من غيرها.</p>
<h2 id="قراءات-إضافية">قراءات إضافية</h2>
<ul>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/runtime-probes-in-the-development-loop">مسابر وقت التشغيل داخل حلقة التطوير</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/structured-cli-output-as-pipeline-glue">مخرجات سطر الأوامر المُهيكلة كغراء للخطوط الأنابيب</a></li>
<li><a href="https://stevekinney.com/courses/self-testing-ai-agents/lab-wrap-a-custom-verification-mcp">مختبر: غلّف MCP تحقّق مخصّصًا</a></li>
</ul>
`,o={book:s,chapter:n,chapterTitle:a,slug:l,title:t,headings:p,html:e};export{s as book,n as chapter,a as chapterTitle,o as default,p as headings,e as html,l as slug,t as title};
