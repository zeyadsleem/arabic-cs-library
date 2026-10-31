const s="kinney",n="enterprise-ui",t="واجهات المؤسسات",a="ai-integration-patterns",l="أنماط تكامل الذكاء الاصطناعي والنماذج اللغوية (AI and LLM Integration Patterns)",e=[{depth:2,id:"أين-يعيش-الاستدلال",text:"أين يعيش الاستدلال"},{depth:3,id:"الاستدلال-على-الجهاز",text:"الاستدلال على الجهاز"},{depth:2,id:"أنماط-بث-الواجهة",text:"أنماط بثّ الواجهة"},{depth:3,id:"طبقة-النقل",text:"طبقة النقل"},{depth:3,id:"إدارة-الحالة-للبث",text:"إدارة الحالة للبثّ"},{depth:3,id:"أداء-التصيير",text:"أداء التصيير"},{depth:2,id:"إدارة-التوجيهات-prompts",text:"إدارة التوجيهات (Prompts)"},{depth:3,id:"التوجيهات-كتهيئة",text:"التوجيهات كتهيئة"},{depth:3,id:"حقن-التوجيهات-prompt-injection",text:"حقن التوجيهات (Prompt injection)"},{depth:2,id:"استخدام-الأدوات-والأنماط-الوكيلية",text:"استخدام الأدوات والأنماط الوكيلية"},{depth:3,id:"مسارات-عمل-وكلاء-متعددة-الخطوات",text:"مسارات عمل وكلاء متعددة الخطوات"},{depth:2,id:"rag-في-الواجهة-الأمامية",text:"RAG في الواجهة الأمامية"},{depth:3,id:"الاستشهاد-ونسبة-المصدر",text:"الاستشهاد ونسبة المصدر"},{depth:3,id:"إدارة-نافذة-السياق",text:"إدارة نافذة السياق"},{depth:2,id:"المراقبة-لميزات-الذكاء-الاصطناعي",text:"المراقبة لميزات الذكاء الاصطناعي"},{depth:3,id:"مقاييس-خاصة-بالذكاء-الاصطناعي",text:"مقاييس خاصة بالذكاء الاصطناعي"},{depth:3,id:"تتبع-التكلفة",text:"تتبّع التكلفة"},{depth:3,id:"التخزين-المؤقت-للتوجيهات",text:"التخزين المؤقت للتوجيهات"},{depth:2,id:"معالجة-الأخطاء-للأنظمة-غير-الحتمية",text:"معالجة الأخطاء للأنظمة غير الحتمية"},{depth:2,id:"أنماط-تجربة-مستخدم-خاصة-بالذكاء-الاصطناعي",text:"أنماط تجربة مستخدم خاصة بالذكاء الاصطناعي"},{depth:3,id:"الشفافية-والثقة",text:"الشفافية والثقة"},{depth:3,id:"حالات-التحميل",text:"حالات التحميل"},{depth:3,id:"سياق-المحادثة",text:"سياق المحادثة"},{depth:2,id:"اختبار-ميزات-الذكاء-الاصطناعي",text:"اختبار ميزات الذكاء الاصطناعي"},{depth:2,id:"إمكانية-الوصول-لواجهات-الذكاء-الاصطناعي",text:"إمكانية الوصول لواجهات الذكاء الاصطناعي"},{depth:2,id:"خصوصية-البيانات-والامتثال",text:"خصوصية البيانات والامتثال"},{depth:2,id:"الملخص-المعماري",text:"الملخّص المعماري"},{depth:2,id:"الخلاصة-السريعة-tldr",text:"الخلاصة السريعة (TL;DR)"},{depth:3,id:"أين-يعيش-الاستدلال-1",text:"أين يعيش الاستدلال"},{depth:3,id:"أنماط-بث-الواجهة-1",text:"أنماط بثّ الواجهة"},{depth:3,id:"إدارة-التوجيهات",text:"إدارة التوجيهات"},{depth:3,id:"استخدام-الأدوات-والأنماط-الوكيلية-1",text:"استخدام الأدوات والأنماط الوكيلية"},{depth:3,id:"rag-وواجهة-الاستشهاد",text:"RAG وواجهة الاستشهاد"},{depth:3,id:"التدهور-الرشيق-للذكاء-الاصطناعي",text:"التدهور الرشيق للذكاء الاصطناعي"},{depth:3,id:"مراقبة-خاصة-بالذكاء-الاصطناعي",text:"مراقبة خاصة بالذكاء الاصطناعي"}],p=`<p>إضافة ميزة مدعومة بنموذج لغوي كبير (LLM) إلى تطبيق واجهة أمامية ليست مثل إضافة تكامل API جديد. فحين تستدعي نقطة نهاية REST، ترسل طلبًا، وتنتظر مقدارًا متوقّعًا من الوقت، ثم تعود إليك استجابة حتمية. أما حين تستدعي نموذجًا لغويًا، فترسل توجيهًا (prompt)، وتنتظر <em>ثوانٍ</em> (لا أجزاء من الثانية)، ثم تعود إليك سلسلة من الرموز (tokens) تكون مختلفة في كل مرة — حتى مع الإدخال نفسه. قد تكون الاستجابة رائعة. وقد تكون خاطئة. وقد تُرشَّح من نظام أمان في منتصف التوليد. وستكلّفك مالًا حقيقيًا عن كل رمز.</p>
<p>وهذه التوليفة — التسليم بالبثّ، والمخرجات غير الحتمية، والكمون المرتفع، والتكلفة لكل استخدام — تكسر افتراضات مبنيّة في النموذج الذهني للطلب/الاستجابة الذي يقوم عليه معظم جلب البيانات في الواجهة الأمامية. وهذه ليست شكوى. بل واقع معماري يحتاج أنماطًا مختلفة.</p>
<h2 id="أين-يعيش-الاستدلال">أين يعيش الاستدلال</h2>
<p>القرار الأول هو أين تحدث معالجة الذكاء الاصطناعي بالنسبة إلى واجهتك الأمامية. وهذا يحدّد ملفّ الكمون لديك وضمانات الخصوصية ونموذج التكلفة.</p>
<pre><code>flowchart TB
  Client[&quot;Browser / Client&quot;]

  subgraph cloud[&quot;Cloud&quot;]
    API[&quot;LLM API\\n(Anthropic, OpenAI)&quot;]
    BFF[&quot;BFF / AI Gateway&quot;]
    Self[&quot;Self-Hosted\\n(vLLM, TGI)&quot;]
  end

  subgraph edge[&quot;Edge&quot;]
    Edge_AI[&quot;Edge Inference\\n(Cloudflare AI, Vercel)&quot;]
  end

  subgraph device[&quot;On-Device&quot;]
    WebLLM[&quot;WebLLM / ONNX\\n(runs in browser)&quot;]
  end

  Client --&gt;|&quot;API key exposed ✗&quot;| API
  Client --&gt;|&quot;key server-side ✓&quot;| BFF
  BFF --&gt; API
  BFF --&gt; Self
  Client --&gt; Edge_AI
  Client --&gt; WebLLM

  style BFF fill:#4ade80,color:#000
  style API fill:#f87171,color:#000
  style WebLLM fill:#2563eb,color:#fff
</code></pre>
<table>
<thead>
<tr>
<th>النهج</th>
<th>الكمون</th>
<th>خصوصية البيانات</th>
<th>نموذج التكلفة</th>
<th>جيد لـ</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>API سحابي مباشر</strong></td>
<td>مرتفع</td>
<td>البيانات تغادر العميل</td>
<td>لكل رمز (token)</td>
<td>لا تفعل هذا أبدًا — يكشف مفاتيح API</td>
</tr>
<tr>
<td><strong>API عبر وسيط BFF</strong></td>
<td>مرتفع (+ قفزة واحدة)</td>
<td>الخادم يتحكّم بالتدفق</td>
<td>لكل رمز + الخادم</td>
<td>معظم تطبيقات المؤسسات</td>
</tr>
<tr>
<td><strong>نموذج مستضاف ذاتيًا</strong></td>
<td>متوسط</td>
<td>تحكّم كامل</td>
<td>البنية التحتية</td>
<td>القطاعات المنظّمة، البيانات الحساسة</td>
</tr>
<tr>
<td><strong>استدلال طرفي</strong></td>
<td>متوسط-منخفض</td>
<td>حسب المزوّد</td>
<td>لكل طلب</td>
<td>الإشراف على المحتوى، التضمينات (embeddings)</td>
</tr>
<tr>
<td><strong>على الجهاز (WebLLM)</strong></td>
<td>منخفض بعد تحميل النموذج</td>
<td>كامل</td>
<td>صفر هامشي</td>
<td>الإكمال التلقائي، التصنيف، دون اتصال</td>
</tr>
</tbody>
</table>
<p>بالنسبة إلى معظم تطبيقات المؤسسات، <strong>النمط عبر وسيط BFF</strong> هو الافتراضي الصحيح. فهو يمدّ معمارية <a href="https://stevekinney.com/courses/enterprise-ui/backends-for-frontends">خوادم الواجهات</a> إلى نطاق الذكاء الاصطناعي — طبقة من جهة الخادم تحمل مفاتيح API، وتفرض حدود المعدّل، وترشّح المعلومات الشخصية، وتسجّل الاستخدام لأغراض الامتثال، وتبثّ الاستجابات راجعة إلى العميل. لا ترى الواجهة الأمامية مفتاح الـ API قط. ويتحكّم الخادم بما يدخل وبما يخرج.</p>
<pre><code class="language-typescript"><span class="hljs-comment">// Server-side BFF route — the frontend calls this, not the LLM API directly</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">POST</span>(<span class="hljs-params"><span class="hljs-attr">request</span>: <span class="hljs-title class_">Request</span></span>) {
  <span class="hljs-keyword">const</span> { prompt, context } = <span class="hljs-keyword">await</span> request.<span class="hljs-title function_">json</span>();
  <span class="hljs-keyword">const</span> userId = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getAuthenticatedUser</span>(request);

  <span class="hljs-comment">// Server-side guardrails: PII filtering, rate limiting, prompt injection defense</span>
  <span class="hljs-keyword">const</span> sanitizedPrompt = <span class="hljs-keyword">await</span> <span class="hljs-title function_">sanitizePrompt</span>(prompt, userId);

  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> anthropic.<span class="hljs-property">messages</span>.<span class="hljs-title function_">create</span>({
    <span class="hljs-attr">model</span>: <span class="hljs-string">&#x27;claude-sonnet-4-5-20250929&#x27;</span>,
    <span class="hljs-attr">max_tokens</span>: <span class="hljs-number">1024</span>,
    <span class="hljs-attr">messages</span>: [{ <span class="hljs-attr">role</span>: <span class="hljs-string">&#x27;user&#x27;</span>, <span class="hljs-attr">content</span>: sanitizedPrompt }],
    <span class="hljs-attr">stream</span>: <span class="hljs-literal">true</span>,
  });

  <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Response</span>(response.<span class="hljs-title function_">toReadableStream</span>(), {
    <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;text/event-stream&#x27;</span> },
  });
}
</code></pre>
<p>الـ BFF ليس مجرد وسيط. إنه حيث تفرض كل ما لا يمكن الوثوق بالعميل فيه: فحوص المصادقة، وحدود المعدّل لكل مستخدم، وميزانيات التكلفة، وتسجيل التدقيق، والضوابط التي تمنع أحدهم من استخدام ميزة الذكاء الاصطناعي في منتجك لتوليد محتوى تفضّل ألّا تولّده.</p>
<h3 id="الاستدلال-على-الجهاز">الاستدلال على الجهاز</h3>
<p>جعل WebGPU وWebAssembly تشغيل نماذج لغوية صغيرة مباشرةً في المتصفح أمرًا ممكنًا. يستخدم <a href="https://webllm.mlc.ai/">WebLLM</a> مُصرِّفات تعلّم الآلة (MLC-LLM وApache TVM) لتشغيل أنوية استدلال محسّنة على وحدة معالجة الرسوم، محافظًا على <a href="https://arxiv.org/abs/2412.15803">حتى 80% من أداء التشغيل الأصلي</a> على العتاد نفسه. ومع إطلاق Firefox لـ WebGPU على Windows واستعداد Safari لدعمه، تكون الفترة 2025–2026 أول نافذة يمكنك فيها استهداف حساب وحدة معالجة الرسوم عبر كل المتصفحات الرئيسية.</p>
<p>لكن المقايضات حقيقية. فتراوح أحجام تنزيل النماذج بين مئات الميجابايتات وبضعة جيجابايتات. والفجوة في الجودة بين نموذج على الجهاز بمعامل مليار واحد وClaude أو GPT-4 هائلة. وما زال دعم WebGPU غير متساوٍ بما يكفي لتحتاج مسارًا بديلًا.</p>
<p>الاستدلال على الجهاز <em>مُكمّل</em> للاستدلال السحابي، لا بديل عنه. استخدمه للمهام الحساسة للكمون حيث متطلبات الجودة متواضعة — الإكمال التلقائي، أو التصنيف المحلي، أو قرارات التوجيه التي تحدّد ما إذا كان الاستعلام يحتاج نداء LLM سحابيًا كاملًا.</p>
<h2 id="أنماط-بث-الواجهة">أنماط بثّ الواجهة</h2>
<p>أكثر تحدٍّ مميّز في الواجهة الأمامية هو التعامل مع الاستجابات المبثوثة. يصل النص رمزًا رمزًا على مدى ثوانٍ. وهذا لا يناسب نموذج «اجلب البيانات، صيّر النتيجة» الذي تفترضه React Query وSWR وكل مكتبة أخرى لجلب البيانات.</p>
<h3 id="طبقة-النقل">طبقة النقل</h3>
<p>النقل المعياري لبثّ الـ LLM هو <strong>أحداث مُرسَلة من الخادم</strong> (SSE) — تدفق أحادي الاتجاه من الخادم إلى العميل عبر HTTP. يرسل الخادم أجزاءً كأسطر <code>data:</code>، ويعالجها العميل تدريجيًا:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">streamCompletion</span>(<span class="hljs-params"><span class="hljs-attr">prompt</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">onToken</span>: (token: <span class="hljs-built_in">string</span>) =&gt; <span class="hljs-built_in">void</span></span>) {
  <span class="hljs-keyword">const</span> response = <span class="hljs-keyword">await</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-string">&#x27;/api/ai/complete&#x27;</span>, {
    <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;POST&#x27;</span>,
    <span class="hljs-attr">headers</span>: { <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;application/json&#x27;</span> },
    <span class="hljs-attr">body</span>: <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">stringify</span>({ prompt }),
  });

  <span class="hljs-keyword">const</span> reader = response.<span class="hljs-property">body</span>!.<span class="hljs-title function_">getReader</span>();
  <span class="hljs-keyword">const</span> decoder = <span class="hljs-keyword">new</span> <span class="hljs-title class_">TextDecoder</span>();

  <span class="hljs-keyword">while</span> (<span class="hljs-literal">true</span>) {
    <span class="hljs-keyword">const</span> { done, value } = <span class="hljs-keyword">await</span> reader.<span class="hljs-title function_">read</span>();
    <span class="hljs-keyword">if</span> (done) <span class="hljs-keyword">break</span>;

    <span class="hljs-keyword">const</span> chunk = decoder.<span class="hljs-title function_">decode</span>(value);
    <span class="hljs-keyword">const</span> lines = chunk.<span class="hljs-title function_">split</span>(<span class="hljs-string">&#x27;\\n&#x27;</span>).<span class="hljs-title function_">filter</span>(<span class="hljs-function">(<span class="hljs-params">line</span>) =&gt;</span> line.<span class="hljs-title function_">startsWith</span>(<span class="hljs-string">&#x27;data: &#x27;</span>));

    <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> line <span class="hljs-keyword">of</span> lines) {
      <span class="hljs-keyword">const</span> data = <span class="hljs-title class_">JSON</span>.<span class="hljs-title function_">parse</span>(line.<span class="hljs-title function_">slice</span>(<span class="hljs-number">6</span>));
      <span class="hljs-keyword">if</span> (data.<span class="hljs-property">type</span> === <span class="hljs-string">&#x27;content_block_delta&#x27;</span>) {
        <span class="hljs-title function_">onToken</span>(data.<span class="hljs-property">delta</span>.<span class="hljs-property">text</span>);
      }
    }
  }
}
</code></pre>
<p>يمكنك <em>أن</em> تكتب هذا بنفسك، لكن يحتمل ألّا ينبغي لك ذلك. أنشأ <a href="https://ai-sdk.dev/docs/introduction">Vercel AI SDK</a> معيارًا فعليًا لبثّ الـ LLM في تطبيقات React. ويتولّى خُطّاف <code>useChat</code> فيه تحليل SSE، وإدارة حالة الرسائل، وحالات التحميل، ومعالجة الأخطاء، والإلغاء:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> { useChat } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;ai/react&#x27;</span>;

<span class="hljs-keyword">function</span> <span class="hljs-title function_">ChatInterface</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> { messages, input, handleInputChange, handleSubmit, isLoading, error } = <span class="hljs-title function_">useChat</span>({
    <span class="hljs-attr">api</span>: <span class="hljs-string">&#x27;/api/chat&#x27;</span>,
    <span class="hljs-attr">onError</span>: <span class="hljs-function">(<span class="hljs-params">error</span>) =&gt;</span> {
      <span class="hljs-title function_">reportToObservability</span>(<span class="hljs-string">&#x27;ai_chat_error&#x27;</span>, { <span class="hljs-attr">error</span>: error.<span class="hljs-property">message</span> });
    },
  });

  <span class="hljs-keyword">return</span> (
    <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">div</span>&gt;</span>
      {messages.map((m) =&gt; (
        <span class="hljs-tag">&lt;<span class="hljs-name">Message</span> <span class="hljs-attr">key</span>=<span class="hljs-string">{m.id}</span> <span class="hljs-attr">role</span>=<span class="hljs-string">{m.role}</span> <span class="hljs-attr">content</span>=<span class="hljs-string">{m.content}</span> /&gt;</span>
      ))}
      {isLoading &amp;&amp; <span class="hljs-tag">&lt;<span class="hljs-name">StreamingIndicator</span> /&gt;</span>}
      <span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">onSubmit</span>=<span class="hljs-string">{handleSubmit}</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">value</span>=<span class="hljs-string">{input}</span> <span class="hljs-attr">onChange</span>=<span class="hljs-string">{handleInputChange}</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
    <span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span></span>
  );
}
</code></pre>
<p>يتبع معمار AI SDK مسارًا نظيفًا:</p>
<pre><code>sequenceDiagram
  participant User
  participant React as React (useChat)
  participant BFF as API Route (streamText)
  participant LLM as LLM Provider

  User-&gt;&gt;React: Types message, submits
  React-&gt;&gt;BFF: POST /api/chat
  BFF-&gt;&gt;LLM: Stream request
  LLM--&gt;&gt;BFF: Token stream (SSE)
  BFF--&gt;&gt;React: Forward SSE chunks
  React--&gt;&gt;User: Render tokens incrementally
  Note over React: Message state updates per chunk
  LLM--&gt;&gt;BFF: [DONE]
  BFF--&gt;&gt;React: Stream complete
  React--&gt;&gt;User: Final rendered message
</code></pre>
<h3 id="إدارة-الحالة-للبث">إدارة الحالة للبثّ</h3>
<p>يُدخل البثّ تحديات في إدارة الحالة لا وجود لها في أنظمة الطلب/الاستجابة:</p>
<ul>
<li><strong>حالة جزئية.</strong> تكون الاستجابة غير مكتملة أثناء البثّ. ويجب أن تُصيّر المكوّنات محتوى جزئيًا دون إزاحة في التخطيط أو وميض حاويات فارغة.</li>
<li><strong>تصيير تفاؤلي.</strong> تظهر رسالة المستخدم فورًا. وتُبثّ استجابة الذكاء الاصطناعي. وهذا نوع مختلف من التحديثات التفاؤلية، لكن «التأكيد» يصل رمزًا رمزًا.</li>
<li><strong>الإلغاء.</strong> يحتاج المستخدمون إلى إلغاء التوليد في منتصف البثّ. وهذا يعني إحباط الطلب (fetch)، وتنظيف الحالة الجزئية، وإشعار الخادم بالتوقّف (حتى تتوقف عن الدفع مقابل رموز لن يقرأها أحد).</li>
<li><strong>إعادة المحاولة مقابل إعادة التوليد.</strong> «إعادة المحاولة» مع API حتمي تعني «جرّب مرة أخرى وستحصل على الإجابة نفسها». ومع LLM، تعني إعادة المحاولة إعادة توليد — فالاستجابة <em>ستكون</em> مختلفة. وينبغي أن توضّح الواجهة هذا التمييز.</li>
<li><strong>سجل المحادثة.</strong> تجمع واجهات المحادثة سجلًا للرسائل قد يحتاج إلى البقاء عبر التنقّلات أو الجلسات. وهذه حالة مدفوعة بالعنوان (URL) أو استمرارية من جهة الخادم، لا حالة مكوّن عابرة.</li>
</ul>
<p>تلتقط آلة حالة هذه الحالات بوضوح:</p>
<pre><code class="language-typescript"><span class="hljs-keyword">type</span> <span class="hljs-title class_">AIResponseState</span> =
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;idle&#x27;</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;pending&#x27;</span>; <span class="hljs-attr">abortController</span>: <span class="hljs-title class_">AbortController</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;streaming&#x27;</span>; <span class="hljs-attr">content</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">abortController</span>: <span class="hljs-title class_">AbortController</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;complete&#x27;</span>; <span class="hljs-attr">content</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">metadata</span>: <span class="hljs-title class_">ResponseMetadata</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;error&#x27;</span>; <span class="hljs-attr">error</span>: <span class="hljs-title class_">AIError</span>; <span class="hljs-attr">partialContent</span>?: <span class="hljs-built_in">string</span> }
  | { <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;cancelled&#x27;</span>; <span class="hljs-attr">partialContent</span>: <span class="hljs-built_in">string</span> };
</code></pre>
<h3 id="أداء-التصيير">أداء التصيير</h3>
<p>يمكن أن يؤدي تحديث DOM عند كل رمز (على فترات نحو 50 مللي ثانية) إلى تقطيع (jank)، خاصةً مع تصيير Markdown. وهذه أمور قليلة ينبغي تذكّرها:</p>
<ul>
<li><strong>تجميع التحديثات.</strong> اجمع الرموز وافرغها إلى DOM عند حدود <code>requestAnimationFrame</code> بدل فعل ذلك عند كل حدث SSE.</li>
<li><strong>Markdown تدريجي.</strong> تُعيد مكتبات مثل <code>react-markdown</code> تحليل سلسلة المحتوى كاملةً عند كل تحديث. ومع الاستجابات الطويلة يصبح هذا مكلفًا. أخّر تصيير Markdown (debounce) أو وهمّن (virtualize) الاستجابات الطويلة.</li>
<li><strong>استقرار التخطيط.</strong> احجز مساحة للاستجابة المبثوثة بـ <code>min-height</code> أو بعنصر نائب متنامٍ. فتجرِبة «النص المبثوث يدفع كل شيء تحته إلى أسفل الصفحة» بائسة.</li>
</ul>
<h2 id="إدارة-التوجيهات-prompts">إدارة التوجيهات (Prompts)</h2>
<p>في تطبيقات المؤسسات، ليست التوجيهات سلاسل عشوائية تُدمَج في مكوّن. إنها آثار مُصدَّرة بنسخ ومُختبَرة ومُراجَعة تؤثر مباشرةً في سلوك المنتج — بقدر أي عقد API أو مخطط قاعدة بيانات.</p>
<h3 id="التوجيهات-كتهيئة">التوجيهات كتهيئة</h3>
<p>تعامل مع التوجيهات بالصرامة نفسها التي تتعامل بها مع تهيئة التطبيق. افصل القالب عن شيفرة التطبيق. أصدِر القوالب بنسخ. واختبرها مقابل مُدخَلات معروفة.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">PromptTemplate</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">version</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">template</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">variables</span>: <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-title class_">PromptVariable</span>&gt;;
  <span class="hljs-attr">model</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">maxTokens</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">temperature</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">systemMessage</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">guardrails</span>: <span class="hljs-title class_">GuardrailConfig</span>;
}

<span class="hljs-comment">// Fetched from a prompt registry, not hardcoded in a component</span>
<span class="hljs-keyword">const</span> summaryPrompt = <span class="hljs-keyword">await</span> promptRegistry.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;document-summary&#x27;</span>, {
  <span class="hljs-attr">version</span>: <span class="hljs-string">&#x27;latest&#x27;</span>,
  <span class="hljs-attr">variables</span>: {
    <span class="hljs-attr">document</span>: documentText,
    <span class="hljs-attr">audience</span>: userRole,
    <span class="hljs-attr">maxLength</span>: <span class="hljs-string">&#x27;500 words&#x27;</span>,
  },
});
</code></pre>
<p>يمنحك هذا الفصل ثلاثة أشياء. يمكنك <strong>اختبار A/B</strong> لنسخ التوجيه بتوجيه المستخدمين إلى قوالب مختلفة وقياس جودة المخرجات. ويمكنك <strong>التراجع</strong> عن تغيير توجيه يخفض الجودة عبر علامات الميزات (feature flags)، دون نشر شيفرة. ويمكنك تشغيل <strong>CI للتوجيهات</strong> — مجموعات تقييم آلية تختبر توجيهًا مقابل مُدخَلات مُنتقاة كلما عدّله أحدهم.</p>
<p>CI التوجيهات ليس اختبار وحدات تقليديًا. فالمخرجات غير حتمية، لذا تقيّمها بتحكيم LLM كنموذج، أو بتحقّقات بنيوية، أو بتقييم بشري — لا بمطابقة السلاسل الدقيقة. والمزيد عن الاختبار أدناه.</p>
<h3 id="حقن-التوجيهات-prompt-injection">حقن التوجيهات (Prompt injection) <span class="content-anchor" id="prompt-injection"></span></h3>
<p>حقن التوجيهات هو XSS عصر الذكاء الاصطناعي. يُوظِّف إدخال المستخدم سلوك النموذج بتجاوزه تعليمات النظام. وتصنّفه <a href="https://genai.owasp.org/llmrisk/llm01-prompt-injection/">أهم عشر مخاطر لتطبيقات LLM من OWASP</a> كثغرة رقم 1، ولسبب وجيه — فهو متأصّل في طريقة معالجة النماذج اللغوية للإدخال. لا يوجد دفاع كامل، بل طبقات من التخفيف.</p>
<pre><code>flowchart LR
  User[&quot;User Input&quot;] --&gt; Validate[&quot;Input Validation\\n(heuristic filters)&quot;]
  Validate --&gt; Separate[&quot;Role Separation\\n(system / user / assistant)&quot;]
  Separate --&gt; BFF_Guard[&quot;BFF Guardrails\\n(PII filter, injection detection)&quot;]
  BFF_Guard --&gt; Model[&quot;LLM&quot;]
  Model --&gt; Output[&quot;Output Validation\\n(sanitize HTML, URLs)&quot;]
  Output --&gt; Render[&quot;Render in UI&quot;]

  style Validate fill:#fbbf24,color:#000
  style Separate fill:#fbbf24,color:#000
  style BFF_Guard fill:#4ade80,color:#000
  style Output fill:#fbbf24,color:#000
</code></pre>
<p>تفرّق إرشادات OWASP بين <strong>الحقن المباشر</strong> (حيث يكتب المستخدم «تجاهل التعليمات السابقة») و<strong>الحقن غير المباشر</strong> (حيث يعالج النموذج مستندًا يحوي تعليمات مخفية). وكلاهما ناقل هجوم حقيقي.</p>
<p>تشمل دفاعات الواجهة الأمامية التحقّق من الإدخال (الإشارة إلى أنماط الحقن الشائعة)، والفصل الصارم بين الأدوار في صيغة الرسالة (نظام، مستخدم، مساعد)، وتنقية المخرجات قبل التصيير. لكن طبقة الفرض الحاسمة هي الـ BFF. ينبغي أن يفرض الخادم الضوابط بصرف النظر عمّا يرسله العميل. لا تثق أبدًا بتحقّق جهة العميل لأغراض الأمن — وهذا الدرس أقدم من النماذج اللغوية.</p>
<h2 id="استخدام-الأدوات-والأنماط-الوكيلية">استخدام الأدوات والأنماط الوكيلية</h2>
<p>تدعم واجهات LLM الحديثة <strong>استخدام الأدوات</strong> (المسمّى أحيانًا استدعاء الدوال)، حيث يمكن للنموذج أن يطلب من تطبيقك استدعاء دوال معرّفة مسبقًا بالنيابة عنه. وهكذا تبني واجهات لا <em>يقول</em> فيها الذكاء الاصطناعي أشياء فحسب — بل <em>يفعل</em> أشياء.</p>
<pre><code>sequenceDiagram
  participant User
  participant UI as Frontend
  participant LLM as LLM (via BFF)
  participant Tool as External System

  User-&gt;&gt;UI: &quot;Find documents about Q4 revenue&quot;
  UI-&gt;&gt;LLM: Send message + tool definitions
  LLM--&gt;&gt;UI: tool_use: search_documents({query: &quot;Q4 revenue&quot;})
  UI-&gt;&gt;UI: Show confirmation card
  User-&gt;&gt;UI: Approves action
  UI-&gt;&gt;Tool: Execute search
  Tool--&gt;&gt;UI: Search results
  UI-&gt;&gt;LLM: Return tool results
  LLM--&gt;&gt;UI: &quot;I found 3 documents about Q4 revenue...&quot;
  UI--&gt;&gt;User: Render response with citations
</code></pre>
<p>النمط الحاسم هنا هو <strong>تأكيد بمشاركة الإنسان</strong>. فحين يقرّر النموذج استخدام أداة لها آثار جانبية — إنشاء تذكرة، إرسال رسالة، تعديل بيانات — تصيّر الواجهة الأمامية بطاقة تأكيد تُظهر الإجراء الذي سيُتخذ وبأي معاملات. يوافق المستخدم أو يعدّل أو يرفض. ولا ينفّذ الإجراء إلا عند الموافقة.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> tools = [
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;search_documents&#x27;</span>,
    <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Search the knowledge base for relevant documents&#x27;</span>,
    <span class="hljs-attr">input_schema</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;object&#x27;</span>,
      <span class="hljs-attr">properties</span>: {
        <span class="hljs-attr">query</span>: { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;string&#x27;</span>, <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Search query&#x27;</span> },
        <span class="hljs-attr">filters</span>: {
          <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;object&#x27;</span>,
          <span class="hljs-attr">properties</span>: {
            <span class="hljs-attr">dateRange</span>: { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;string&#x27;</span> },
            <span class="hljs-attr">department</span>: { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;string&#x27;</span> },
          },
        },
      },
      <span class="hljs-attr">required</span>: [<span class="hljs-string">&#x27;query&#x27;</span>],
    },
  },
  {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;create_ticket&#x27;</span>,
    <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;Create a support ticket in the ticketing system&#x27;</span>,
    <span class="hljs-attr">input_schema</span>: {
      <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;object&#x27;</span>,
      <span class="hljs-attr">properties</span>: {
        <span class="hljs-attr">title</span>: { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;string&#x27;</span> },
        <span class="hljs-attr">description</span>: { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;string&#x27;</span> },
        <span class="hljs-attr">priority</span>: { <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;string&#x27;</span>, <span class="hljs-attr">enum</span>: [<span class="hljs-string">&#x27;low&#x27;</span>, <span class="hljs-string">&#x27;medium&#x27;</span>, <span class="hljs-string">&#x27;high&#x27;</span>, <span class="hljs-string">&#x27;critical&#x27;</span>] },
      },
      <span class="hljs-attr">required</span>: [<span class="hljs-string">&#x27;title&#x27;</span>, <span class="hljs-string">&#x27;description&#x27;</span>],
    },
  },
];
</code></pre>
<p>هذا ليس اختياريًا لتطبيقات المؤسسات. فالإجراءات غير المُراجَعة للذكاء الاصطناعي في نظام فواتير، أو سير عمل امتثال، أو أداة موارد بشرية، تخلق نوعًا من المسؤولية يمنع فرق الشؤون القانونية من النوم. وينبغي أن يمتد نموذج التخويل إلى الإجراءات التي يبدأها الذكاء الاصطناعي — فينبغي ألا يستطيع النموذج استدعاء إلا الأدوات المصرّح لـ <em>المستخدم الحالي</em> باستخدامها.</p>
<h3 id="مسارات-عمل-وكلاء-متعددة-الخطوات">مسارات عمل وكلاء متعددة الخطوات</h3>
<p>تشمل مسارات عمل الوكلاء المعقّدة نداءات أدوات متتابعة عدة، حيث تُعلِم مخرجات نداء ما النداء التالي. وينبغي أن تصيّر الواجهة الأمامية هذا كتسلسل شفّاف قابل للتدقيق:</p>
<pre><code>flowchart TB
  Start[&quot;User Request&quot;] --&gt; Think[&quot;Thinking...&quot;]
  Think --&gt; Tool1[&quot;Tool Call: search_documents&quot;]
  Tool1 --&gt; Confirm1[&quot;User Confirms&quot;]
  Confirm1 --&gt; Result1[&quot;Results: 3 documents found&quot;]
  Result1 --&gt; Think2[&quot;Analyzing results...&quot;]
  Think2 --&gt; Tool2[&quot;Tool Call: summarize_document&quot;]
  Tool2 --&gt; Auto2[&quot;Auto-approved (read-only)&quot;]
  Auto2 --&gt; Result2[&quot;Summary generated&quot;]
  Result2 --&gt; Response[&quot;Final Response&quot;]

  style Confirm1 fill:#fbbf24,color:#000
  style Auto2 fill:#4ade80,color:#000
</code></pre>
<p>يمكن غالبًا الموافقة التلقائية على الأدوات للقراءة فقط (البحث، التلخيص، التحليل). أما أدوات الكتابة (الإنشاء، التحديث، الحذف، الإرسال) فينبغي أن تتطلب التأكيد دائمًا. اعرض كل خطوة بمُدخَلاتها ومخرجاتها حتى يستطيع المستخدم تدقيق سلسلة التفكير — وتلك الشفافية هي الفرق بين «فعل الذكاء الاصطناعي شيئًا» و«فعل الذكاء الاصطناعي شيئًا أفهمه وأستطيع التحقّق منه».</p>
<h2 id="rag-في-الواجهة-الأمامية">RAG في الواجهة الأمامية</h2>
<p><strong>التوليد المعزّز بالاسترجاع (Retrieval-Augmented Generation)</strong> يُرسي استجابات الـ LLM في مستندات محدّدة بدل بيانات تدريب النموذج العامة. ويحدث الاسترجاع والتوليد من جهة الخادم، لكن على الواجهة الأمامية مسؤوليات كبيرة حول كيفية تقديم ذلك المحتوى المُرسى.</p>
<h3 id="الاستشهاد-ونسبة-المصدر">الاستشهاد ونسبة المصدر</h3>
<p>يجب أن يوفّر RAG المؤسسي نسبة المصدر. وفي القطاعات المنظّمة — القانون والرعاية الصحية والمال — ليس هذا ترفًا في تجربة المستخدم، بل شرط امتثال. يحتاج المستخدمون إلى التحقّق من <em>أين</em> جاءت إجابة الذكاء الاصطناعي.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">RAGResponse</span> {
  <span class="hljs-attr">content</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">citations</span>: <span class="hljs-title class_">Citation</span>[];
  <span class="hljs-attr">confidence</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">metadata</span>: {
    <span class="hljs-attr">model</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">promptVersion</span>: <span class="hljs-built_in">string</span>;
    <span class="hljs-attr">retrievedDocuments</span>: <span class="hljs-built_in">number</span>;
    <span class="hljs-attr">generationTimeMs</span>: <span class="hljs-built_in">number</span>;
  };
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">Citation</span> {
  <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">sourceDocument</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">sourceUrl</span>?: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">relevantPassage</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">pageNumber</span>?: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">confidence</span>: <span class="hljs-built_in">number</span>;
}
</code></pre>
<p>صيّر الاستشهادات سطرًا بسطر — مراجع مرقّمة تربط إلى لوحة مصادر يرى فيها المستخدمون المقطع الأصلي. وينبغي أن تُظهر لوحة المصادر المقتطف ذا الصلة مُبرَزًا داخل سياقه الأوسع، لا مجرد الشذرة المستخرجة. فذلك السياق هو ما يمكّن المستخدمين من الحكم على معقولية تفسير الذكاء الاصطناعي للمصدر.</p>
<h3 id="إدارة-نافذة-السياق">إدارة نافذة السياق</h3>
<p>نافذة سياق الـ LLM مورد محدود، ويمكن لأنظمة RAG المؤسسية أن تتجاوزها بسهولة. وينبغي أن تُبرز الواجهة الأمامية هذا القيد بدل إخفائه:</p>
<ul>
<li><strong>مؤشرات السياق.</strong> اعرض المستندات وسجل المحادثة المشمولة في سياق النموذج. وينبغي أن يعرف المستخدمون ما «يعرفه» الذكاء الاصطناعي لاستعلام معيّن.</li>
<li><strong>تقليم المحادثة.</strong> ستتجاوز المحادثات الطويلة حدود السياق. وحين تُسقَط الرسائل الأقدم أو تُلخَّص، أخبر المستخدم. لا تُفقِد السياق بصمت فتُنتج استجابة محيّرة.</li>
<li><strong>سياق يتحكّم به المستخدم.</strong> دع المستخدمين يضمّنوا أو يستثنوا مستندات صراحةً من مجموعة عمل الذكاء الاصطناعي لاستعلام معيّن.</li>
</ul>
<h2 id="المراقبة-لميزات-الذكاء-الاصطناعي">المراقبة لميزات الذكاء الاصطناعي</h2>
<p>تحتاج ميزات الذكاء الاصطناعي بنية تحتية للمراقبة تمدّ ما غطّيناه في <a href="https://stevekinney.com/courses/enterprise-ui/observability">المراقبة</a>، لأن أنماط الفشل وديناميكيات التكلفة مختلفة جوهريًا.</p>
<h3 id="مقاييس-خاصة-بالذكاء-الاصطناعي">مقاييس خاصة بالذكاء الاصطناعي</h3>
<table>
<thead>
<tr>
<th>المقياس</th>
<th>ما يخبرك به</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>الزمن حتى أول رمز</strong></td>
<td>الاستجابة المُدرَكة — كم ينتظر المستخدم حتى يرى <em>شيئًا</em></td>
</tr>
<tr>
<td><strong>الرموز في الثانية</strong></td>
<td>إنتاجية البثّ، تؤثر في تجربة القراءة</td>
</tr>
<tr>
<td><strong>زمن التوليد الكلي</strong></td>
<td>ما إذا كان المستخدمون ينتظرون طويلًا جدًا</td>
</tr>
<tr>
<td><strong>استخدام الرموز (إدخال + إخراج)</strong></td>
<td>تتبّع التكلفة وفرض الميزانية</td>
</tr>
<tr>
<td><strong>معدّل الأخطاء حسب النوع</strong></td>
<td>حدود المعدّل، المهلات، مرشّحات المحتوى، أخطاء النموذج</td>
</tr>
<tr>
<td><strong>معدّل إعادة التوليد</strong></td>
<td>كم مرة يطلب المستخدمون إجابة مختلفة (إشارة جودة)</td>
</tr>
<tr>
<td><strong>دقة الاستشهاد</strong></td>
<td>ما إذا كانت استشهادات RAG تشير إلى مصادر حقيقية (إشارة جودة RAG)</td>
</tr>
<tr>
<td><strong>تغذية راجعة من المستخدم</strong></td>
<td>إعجاب/عدم إعجاب، علامات، نص حر (إشارة جودة المنتج)</td>
</tr>
</tbody>
</table>
<h3 id="تتبع-التكلفة">تتبّع التكلفة</h3>
<p>تتدرّج تكاليف واجهات LLM مباشرةً مع الاستخدام. فإن لم تتتبّع التكاليف لكل طلب، ستعلم بمشكلة إنفاقك من فريق المالية، لا من لوحات معلوماتك.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">AIRequestMetrics</span> {
  <span class="hljs-attr">requestId</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">userId</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">feature</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">model</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">inputTokens</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">outputTokens</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">estimatedCost</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">latencyMs</span>: <span class="hljs-built_in">number</span>;
  <span class="hljs-attr">cached</span>: <span class="hljs-built_in">boolean</span>;
  <span class="hljs-attr">timestamp</span>: <span class="hljs-title class_">Date</span>;
}
</code></pre>
<p>تتبّع التكلفة لكل مستخدم (لتحديد المعدّل)، ولكل ميزة (للميزانية)، ولكل نموذج (لقرارات التحسين). وحين ترى أن ميزة واحدة تستهلك 60% من ميزانية الذكاء الاصطناعي لديك، تصبح محادثة «هل نستخدم نموذجًا أرخص لهذا؟» محدّدة سريعًا.</p>
<h3 id="التخزين-المؤقت-للتوجيهات">التخزين المؤقت للتوجيهات</h3>
<p>يعيد <a href="https://platform.claude.com/docs/en/build-with-claude/prompt-caching">التخزين المؤقت للتوجيهات من Anthropic</a> استخدام بادئات التوجيه المعالَجة سابقًا لتقليل التكلفة والكمون معًا. تكلّف القراءات المخزّنة مؤقتًا 90% أقل من رموز الإدخال الطازجة، ويمكن أن ينخفض الكمون حتى 85% للتوجيهات الطويلة — وتُظهر وثائق Anthropic توجيهًا بـ 100 ألف رمز يهبط من 11.5 ثانية إلى 2.4 ثانية مع التخزين المؤقت.</p>
<p>تبعات ذلك على الواجهة الأمامية: رتّب التوجيهات لتعظيم معدّلات إصابة الذاكرة المؤقتة. ضع المحتوى الثابت (توجيه النظام، والتعليمات، والمستندات المرجعية) <em>قبل</em> المحتوى المتغيّر (إدخال المستخدم، وأدوار المحادثة). فالتخزين المؤقت يطابق من بداية التوجيه، لذا يُعاد استخدام أي محتوى ثابت يأتي أولًا.</p>
<pre><code>flowchart LR
  subgraph cached[&quot;Cached (cheap, fast)&quot;]
    System[&quot;System Prompt\\n+ Instructions\\n+ Reference Docs&quot;]
  end

  subgraph variable[&quot;Variable (full price)&quot;]
    Conv[&quot;Conversation History\\n+ User Message&quot;]
  end

  cached --&gt; variable --&gt; Model[&quot;LLM&quot;]

  style cached fill:#4ade80,color:#000
  style variable fill:#fbbf24,color:#000
</code></pre>
<h2 id="معالجة-الأخطاء-للأنظمة-غير-الحتمية">معالجة الأخطاء للأنظمة غير الحتمية</h2>
<p>تفترض معالجة الأخطاء التقليدية الحتمية: مُدخَل واحد، مُخرَج واحد. وخطأ يعني أن شيئًا معطوب. وتنتهك أنظمة الذكاء الاصطناعي هذا الافتراض، فتختلف تصنيفات الأخطاء.</p>
<table>
<thead>
<tr>
<th>نوع الخطأ</th>
<th>ما ينبغي أن يراه المستخدم</th>
<th>استراتيجية التعافي</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>تجاوز حد المعدّل</strong></td>
<td>«يرجى الانتظار لحظة»</td>
<td>إعادة محاولة تلقائية مع تراجع تدريجي، ومؤشر موضع في الطابور</td>
</tr>
<tr>
<td><strong>السياق طويل جدًا</strong></td>
<td>«المحادثة تطول — نبدأ من جديد»</td>
<td>تلخيص تلقائي، وترك التقليم للمستخدم</td>
</tr>
<tr>
<td><strong>المحتوى مُرشَّح</strong></td>
<td>«لا أستطيع المساعدة في هذا الطلب»</td>
<td>اقتراح إعادة صياغة، وعرض مناهج بديلة</td>
</tr>
<tr>
<td><strong>مهلة النموذج</strong></td>
<td>«استغرقت الاستجابة وقتًا طويلًا»</td>
<td>إعادة محاولة بـ <code>max_tokens</code> أقصر أو نموذج أسرع</td>
</tr>
<tr>
<td><strong>فشل جزئي</strong></td>
<td>عرض المحتوى الجزئي + مؤشر خطأ</td>
<td>ترك المستخدم يواصل من النتيجة الجزئية</td>
</tr>
<tr>
<td><strong>الخدمة غير متاحة</strong></td>
<td>تدهور رشيق إلى بديل غير ذكاء اصطناعي</td>
<td>علامات ميزة لتعطيل ميزات الذكاء الاصطناعي كليًا</td>
</tr>
</tbody>
</table>
<p>الصف الأخير هو أهم مبدأ معماري: <strong>ينبغي أن يكون لكل ميزة مدعومة بالذكاء الاصطناعي بديل غير ذكاء اصطناعي.</strong> فإن تعطّل مزوّد الـ LLM، ينبغي أن يعود بحثك إلى البحث بالكلمات المفتاحية. وينبغي أن يتدهور مساعد الكتابة لديك إلى محرّر نص عادي. وينبغي أن يبقى نموذجك الذكي نموذجًا.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">SearchBar</span>(<span class="hljs-params"></span>) {
  <span class="hljs-keyword">const</span> aiEnabled = <span class="hljs-title function_">useFeatureFlag</span>(<span class="hljs-string">&#x27;ai-semantic-search&#x27;</span>);

  <span class="hljs-keyword">if</span> (aiEnabled) {
    <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">AISemanticSearch</span> <span class="hljs-attr">fallback</span>=<span class="hljs-string">{</span>&lt;<span class="hljs-attr">KeywordSearch</span> /&gt;</span>} /&gt;</span>;
  }
  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">KeywordSearch</span> /&gt;</span></span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">AISemanticSearch</span>(<span class="hljs-params">{ fallback }: { fallback: React.ReactNode }</span>) {
  <span class="hljs-keyword">const</span> { results, error, isLoading } = <span class="hljs-title function_">useAISearch</span>();

  <span class="hljs-keyword">if</span> (error?.<span class="hljs-property">type</span> === <span class="hljs-string">&#x27;service_unavailable&#x27;</span>) {
    <span class="hljs-title function_">reportDegradation</span>(<span class="hljs-string">&#x27;ai_search&#x27;</span>, error);
    <span class="hljs-keyword">return</span> fallback;
  }

  <span class="hljs-keyword">return</span> <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">SearchResults</span> <span class="hljs-attr">results</span>=<span class="hljs-string">{results}</span> <span class="hljs-attr">isLoading</span>=<span class="hljs-string">{isLoading}</span> /&gt;</span></span>;
}
</code></pre>
<h2 id="أنماط-تجربة-مستخدم-خاصة-بالذكاء-الاصطناعي">أنماط تجربة مستخدم خاصة بالذكاء الاصطناعي</h2>
<h3 id="الشفافية-والثقة">الشفافية والثقة</h3>
<p>يحتاج مستخدمو المؤسسات إلى فهم مخرجات الذكاء الاصطناعي قبل التصرّف بناءً عليها. وهذا هو الفرق بين روبوت محادثة للمستهلك وأداة مؤسسية — ففي منتج للمستهلك، قد تكون إجابة معقولة الظاهر مقبولة. أما في منتج مؤسسي، فقد تتسبّب إجابة معقولة الظاهر لكنها <em>خاطئة</em> في ضرر حقيقي.</p>
<ul>
<li><strong>مؤشرات الثقة.</strong> إشارات بصرية — لون، نسبة مئوية، لغة — تُبلِغ عن مدى ثقة النموذج. ولا تعرض كل مزوّدي الـ LLM درجات ثقة معايَرة، لكن حين يفعلون ذلك، أبرزها.</li>
<li><strong>ظهور التفكير.</strong> مفتاح «أرِنا عملك» يعرض سلسلة تفكير النموذج أو مصادره المسترجَعة. يبني هذا الثقة ويساعد المستخدمين على تقييم المخرجات.</li>
<li><strong>نسبة النموذج.</strong> وسم المحتوى المولَّد بالذكاء الاصطناعي بأنه كذلك. وتشترط بعض الجهات القضائية ذلك. وحتى حيث لا تشترطه، فإنه يضبط التوقعات الصحيحة.</li>
<li><strong>أدوات التحرير.</strong> قدّم مخرجات الذكاء الاصطناعي كمسوّدة، لا كحكم نهائي. واجعلها قابلة للتحرير افتراضيًا. فالذكاء الاصطناعي نقطة بداية، لا إجابة نهائية.</li>
</ul>
<h3 id="حالات-التحميل">حالات التحميل</h3>
<p>يُقاس كمون الذكاء الاصطناعي بالثواني، لا بأجزاء الثانية. ولا يكفي مؤشر انتظار عام.</p>
<ul>
<li><strong>مؤشرات التفكير.</strong> «نحلّل مستنداتك…» أو «نبحث في قاعدة المعرفة…» يُبلِغ عن <em>ما</em> يفعله النموذج، لا مجرد <em>أنه</em> يفعل شيئًا.</li>
<li><strong>هيكل عظمي للبثّ.</strong> قبل وصول أول رمز، اعرض هيكلًا عظميًا أو عنصرًا نائبًا يبيّن أين سيظهر المحتوى.</li>
<li><strong>الكشف التدريجي.</strong> صيّر المحتوى أثناء بثّه. لا تخزّن الاستجابة كاملة ثم تعرضها دفعة واحدة — فذلك يهدر معمار البثّ ويجعل المستخدم ينتظر بلا سبب.</li>
<li><strong>تقدير الوقت.</strong> بالنسبة إلى العمليات البطيئة المعروفة (تحليل مستند كبير، مسارات عمل وكلاء متعددة الخطوات)، اعرض الوقت المتبقي المقدّر.</li>
</ul>
<h3 id="سياق-المحادثة">سياق المحادثة</h3>
<p>في الواجهات على نمط المحادثة، يحتاج المستخدم إلى فهم ما «يعرفه» الذكاء الاصطناعي:</p>
<ul>
<li>اعرض المستندات أو السياق الذي يستطيع الذكاء الاصطناعي الوصول إليه لهذه المحادثة.</li>
<li>اجعل حدود الجلسة واضحة — هل هذه محادثة جديدة أم استكمال؟</li>
<li>إن كان الذكاء الاصطناعي مستخدمًا عبر ميزات عدة (محادثة، بحث، كتابة)، وضّح ما إذا كان السياق مشتركًا بينها.</li>
</ul>
<h2 id="اختبار-ميزات-الذكاء-الاصطناعي">اختبار ميزات الذكاء الاصطناعي</h2>
<p>تعني المخرجات غير الحتمية أنك لا تستطيع اختبار ميزات الذكاء الاصطناعي كما تختبر إرسال نموذج. تحتاج <a href="https://stevekinney.com/courses/enterprise-ui/testing-at-scale">استراتيجية الاختبار</a> إلى تكييف.</p>
<p>والمنهج العملي كومة من الطبقات:</p>
<pre><code>flowchart TB
  subgraph deterministic[&quot;Deterministic (standard tests)&quot;]
    Prompt[&quot;Prompt construction&quot;]
    Parse[&quot;Response parsing&quot;]
    State[&quot;State management&quot;]
    Error[&quot;Error handling&quot;]
    Render[&quot;UI rendering\\n(with fixture data)&quot;]
  end

  subgraph contract[&quot;Contract (schema tests)&quot;]
    API[&quot;API request/response schema&quot;]
    Mock[&quot;MSW handlers for AI endpoints&quot;]
  end

  subgraph structural[&quot;Structural (fuzzy assertions)&quot;]
    Shape[&quot;Response shape validation&quot;]
    Length[&quot;Length / bounds checks&quot;]
    Citation[&quot;Citation structure&quot;]
  end

  subgraph eval[&quot;Evaluation (non-deterministic)&quot;]
    Judge[&quot;LLM-as-judge scoring&quot;]
    Human[&quot;Human evaluation&quot;]
    Regression[&quot;Prompt regression suites&quot;]
  end

  deterministic --&gt; contract --&gt; structural --&gt; eval

  style deterministic fill:#4ade80,color:#000
  style contract fill:#4ade80,color:#000
  style structural fill:#fbbf24,color:#000
  style eval fill:#f87171,color:#000
</code></pre>
<p>اختبر كل شيء <em>حول</em> مخرجات النموذج اختبارًا حتميًا — بناء التوجيه، وتحليل الاستجابة، وانتقالات آلة الحالة، ومعالجة الأخطاء، وتصيير الواجهة ببيانات تجريبية معروفة. استخدم <a href="https://stevekinney.com/courses/enterprise-ui/mock-service-worker">MSW</a> لمحاكاة نقاط نهاية الذكاء الاصطناعي باستجابات مسجّلة لاختبارات التكامل. أما المخرجات غير الحتمية نفسها، فاستخدم معها تحقّقات بنيوية:</p>
<pre><code class="language-typescript"><span class="hljs-title function_">describe</span>(<span class="hljs-string">&#x27;AI Document Summary&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;returns a summary with expected structure&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
    <span class="hljs-keyword">const</span> result = <span class="hljs-keyword">await</span> <span class="hljs-title function_">generateSummary</span>(testDocument);

    <span class="hljs-comment">// Structural assertions — not exact content</span>
    <span class="hljs-title function_">expect</span>(result.<span class="hljs-property">summary</span>).<span class="hljs-title function_">toBeTruthy</span>();
    <span class="hljs-title function_">expect</span>(result.<span class="hljs-property">summary</span>.<span class="hljs-property">length</span>).<span class="hljs-title function_">toBeGreaterThan</span>(<span class="hljs-number">50</span>);
    <span class="hljs-title function_">expect</span>(result.<span class="hljs-property">summary</span>.<span class="hljs-property">length</span>).<span class="hljs-title function_">toBeLessThan</span>(<span class="hljs-number">1000</span>);
    <span class="hljs-title function_">expect</span>(result.<span class="hljs-property">citations</span>).<span class="hljs-title function_">toBeInstanceOf</span>(<span class="hljs-title class_">Array</span>);
    <span class="hljs-title function_">expect</span>(result.<span class="hljs-property">citations</span>.<span class="hljs-property">length</span>).<span class="hljs-title function_">toBeGreaterThan</span>(<span class="hljs-number">0</span>);
    <span class="hljs-title function_">expect</span>(result.<span class="hljs-property">citations</span>[<span class="hljs-number">0</span>]).<span class="hljs-title function_">toHaveProperty</span>(<span class="hljs-string">&#x27;sourceDocument&#x27;</span>);
    <span class="hljs-title function_">expect</span>(result.<span class="hljs-property">confidence</span>).<span class="hljs-title function_">toBeGreaterThan</span>(<span class="hljs-number">0</span>);
    <span class="hljs-title function_">expect</span>(result.<span class="hljs-property">confidence</span>).<span class="hljs-title function_">toBeLessThanOrEqual</span>(<span class="hljs-number">1</span>);
  });
});
</code></pre>
<p>لتقييم جودة التوجيه، شغّل مجموعات آلية تُقيّم المخرجات بتحكيم LLM أو بتقييم بشري كلما تغيّر قالب توجيه. وهذا أقرب إلى ضمان الجودة من الاختبار التقليدي، وينتمي إلى خط CI للتوجيهات، لا إلى مجموعة اختبارات الوحدات لديك.</p>
<h2 id="إمكانية-الوصول-لواجهات-الذكاء-الاصطناعي">إمكانية الوصول لواجهات الذكاء الاصطناعي</h2>
<p>تُدخل الواجهات المدعومة بالذكاء الاصطناعي همومًا محدّدة في إمكانية الوصول:</p>
<ul>
<li><strong>إعلانات قارئ الشاشة للمحتوى المبثوث.</strong> استخدم مناطق <code>aria-live=&quot;polite&quot;</code> للاستجابات المبثوثة. أما <code>aria-live=&quot;assertive&quot;</code> فسيقاطع المستخدم عند كل رمز — أي نحو مرة كل 50 مللي ثانية. هذه ليست تقنية مساعدة. بل هجوم حجب خدمة على قارئ شاشة أحدهم.</li>
<li><strong>التنقّل بلوحة المفاتيح.</strong> يجب أن تكون مُدخَلات المحادثة، وسجل الرسائل، وأزرار الإجراءات، وبطاقات التأكيد، ولوحات الاستشهاد قابلة للتنقّل بلوحة المفاتيح بالكامل.</li>
<li><strong>وسائل بديلة.</strong> إن ولّد الذكاء الاصطناعي تصوّرًا أو مخططًا، فينبغي أن يولّد نصًا بديلًا أيضًا. وإن ولّد كتلة شيفرة، فتأكد من أنها في منطقة مُسمّاة قابلة للتنقّل.</li>
<li><strong>الحمل المعرفي.</strong> قد تكون استجابات الذكاء الاصطناعي طويلة وكثيفة. وفّر آليات لطيّ الاستجابات أو تلخيصها أو تجزئتها. فاستجابة من 2000 كلمة ليست أنفع من استجابة من 200 كلمة إن لم يستطع المستخدم العثور على الجزء ذي الصلة.</li>
</ul>
<h2 id="خصوصية-البيانات-والامتثال">خصوصية البيانات والامتثال</h2>
<p>تحتاج تطبيقات المؤسسات سياسات صريحة حول أي بيانات مستخدم تمرّ عبر نماذج الذكاء الاصطناعي.</p>
<ul>
<li><strong>كشف المعلومات الشخصية وحجبها.</strong> قبل إرسال إدخال المستخدم إلى LLM، اكشف المعلومات المُعرِّفة للشخصية واحجبها ما لم تكن معالجة تلك المعلومات جزءًا صريحًا من الميزة. والـ BFF هو المكان الصحيح لهذا — لا العميل.</li>
<li><strong>إقامة البيانات.</strong> تعالج بعض المزوّدين البيانات في مناطق محدّدة. وقد يتطلب الامتثال المؤسسي بقاء البيانات ضمن ولايات قضائية معيّنة.</li>
<li><strong>الانسحاب من بيانات التدريب.</strong> تتيح معظم اتفاقيات API المؤسسية الانسحاب من استخدام بياناتك لتدريب النماذج. تحقّق من أن هذا مُهيّأ. ثم تحقّق من أنه مُهيّأ فعلًا، لأن «أظن أننا انسحبنا» ليس موقفًا امتثاليًا.</li>
<li><strong>تسجيل التدقيق.</strong> ينبغي تسجيل كل تفاعل مع الذكاء الاصطناعي — التوجيه، والاستجابة، والمستخدم، والطابع الزمني، ونسخة النموذج، والتكلفة — لمسارات تدقيق الامتثال. ويلتقط الـ BFF هذا طبيعيًا كجزء من دورة حياة الطلب.</li>
</ul>
<h2 id="الملخص-المعماري">الملخّص المعماري</h2>
<p>يمسّ تكامل الذكاء الاصطناعي كل طبقة تقريبًا من طبقات معمار الواجهة الأمامية. فيصير <a href="https://stevekinney.com/courses/enterprise-ui/backends-for-frontends">نمط BFF</a> بوابة الذكاء الاصطناعي. وتحتاج إدارة الحالة إلى التعامل مع البثّ والحالة الجزئية. وتحتاج <a href="https://stevekinney.com/courses/enterprise-ui/observability">المراقبة</a> إلى مقاييس خاصة بالذكاء الاصطناعي وتتبّع للتكلفة. وتحتاج <a href="https://stevekinney.com/courses/enterprise-ui/testing-at-scale">استراتيجية الاختبار</a> إلى تقييم غير حتمي. ويحتاج الأمن إلى دفاع ضد حقن التوجيهات. ويحتاج نظام التصميم إلى مكوّنات جديدة — فقاعات المحادثة، ومؤشرات الثقة، وبطاقات الاستشهاد، وحاويات البثّ، ونوافذ تأكيد استخدام الأدوات — لا وجود لها في معظم مكتبات المكوّنات بعد.</p>
<p>والمبادئ الموجِّهة:</p>
<ul>
<li><strong>بِثّ كل شيء.</strong> لا تجعل المستخدمين ينتظرون التوليد الكامل حين تستطيع عرض الرموز وهي تصل.</li>
<li><strong>مرّر عبر وسيط BFF.</strong> أبقِ مفاتيح API، والضوابط، وحدود المعدّل، وسجلات التدقيق من جهة الخادم.</li>
<li><strong>تدهور برشاقة.</strong> تحتاج كل ميزة ذكاء اصطناعي إلى بديل غير ذكاء اصطناعي.</li>
<li><strong>اجعل الذكاء الاصطناعي شفّافًا.</strong> يجب أن يفهم المستخدمون ما يعرفه الذكاء الاصطناعي، ومدى ثقته، ومن أين تأتي إجاباته.</li>
<li><strong>تعامل مع التوجيهات كتهيئة مُصدَّرة بنسخ.</strong> لا كسلاسل عشوائية مدموجة في شيفرة التطبيق.</li>
</ul>
<hr>
<h2 id="الخلاصة-السريعة-tldr">الخلاصة السريعة (TL;DR)</h2>
<h3 id="أين-يعيش-الاستدلال-1">أين يعيش الاستدلال</h3>
<blockquote>
<p>القرار الأول: أين تحدث معالجة الذكاء الاصطناعي؟</p>
</blockquote>
<table>
<thead>
<tr>
<th>النهج</th>
<th>الكمون</th>
<th>خصوصية البيانات</th>
<th>جيد لـ</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>API سحابي مباشر</strong></td>
<td>مرتفع</td>
<td>المفتاح مكشوف ✗</td>
<td>لا تفعل هذا أبدًا</td>
</tr>
<tr>
<td><strong>API عبر وسيط BFF</strong></td>
<td>مرتفع + قفزة واحدة</td>
<td>الخادم يتحكّم ✓</td>
<td>معظم تطبيقات المؤسسات</td>
</tr>
<tr>
<td><strong>نموذج مستضاف ذاتيًا</strong></td>
<td>متوسط</td>
<td>تحكّم كامل</td>
<td>القطاعات المنظّمة</td>
</tr>
<tr>
<td><strong>استدلال طرفي</strong></td>
<td>متوسط-منخفض</td>
<td>حسب المزوّد</td>
<td>الإشراف، التضمينات</td>
</tr>
<tr>
<td><strong>على الجهاز (WebLLM)</strong></td>
<td>منخفض بعد التحميل</td>
<td>كامل</td>
<td>الإكمال التلقائي، التصنيف</td>
</tr>
</tbody>
</table>
<p><strong>الافتراضي:</strong> عبر وسيط BFF. يحمل الـ BFF مفاتيح API، ويفرض حدود المعدّل، ويرشّح المعلومات الشخصية، ويسجّل للامتثال، ويبثّ الاستجابات إلى العميل.</p>
<hr>
<h3 id="أنماط-بث-الواجهة-1">أنماط بثّ الواجهة</h3>
<blockquote>
<p>تصل استجابات الـ LLM رمزًا رمزًا. وهذا يغيّر كل شيء.</p>
</blockquote>
<ul>
<li><strong>النقل:</strong> أحداث مُرسَلة من الخادم (SSE) — تدفق أحادي الاتجاه عبر HTTP.</li>
<li><strong>آلة الحالة:</strong> <code>idle → pending → streaming → complete | error | cancelled</code></li>
<li><strong>الحالة الجزئية:</strong> تكون الاستجابة غير مكتملة أثناء البثّ. صيّرها على أي حال.</li>
<li><strong>الإلغاء:</strong> يحتاج المستخدمون إلى إيقاف التوليد في منتصف البثّ. أحبِط الطلب، ونظّف الحالة، وتوقّف عن الدفع مقابل الرموز.</li>
</ul>
<p><strong>استخدم Vercel AI SDK</strong> (<code>useChat</code>، <code>useCompletion</code>) — فهو يتولّى تحليل SSE، وحالة الرسائل، والتحميل، والأخطاء، والإلغاء.</p>
<hr>
<h3 id="إدارة-التوجيهات">إدارة التوجيهات</h3>
<blockquote>
<p>التوجيهات آثار مُصدَّرة بنسخ ومُختبَرة ومُراجَعة — لا سلاسل عشوائية.</p>
</blockquote>
<ul>
<li>افصل قوالب التوجيه عن شيفرة التطبيق.</li>
<li>اجلبها من سجل توجيهات، لا من مكوّنات مضمّنة.</li>
<li><strong>اختبر A/B</strong> نسخ التوجيه بتوجيه المستخدمين إلى قوالب مختلفة.</li>
<li><strong>تراجع</strong> عن التوجيهات السيئة عبر علامات الميزات، دون نشر شيفرة.</li>
<li><strong>CI للتوجيهات</strong> — مجموعات تقييم آلية تختبر التوجيهات مقابل مُدخَلات مُنتقاة.</li>
</ul>
<p><strong>حقن التوجيهات هو XSS عصر الذكاء الاصطناعي.</strong></p>
<ul>
<li>التحقّق من الإدخال (الإشارة إلى أنماط الحقن)</li>
<li>الفصل بين الأدوار (نظام / مستخدم / مساعد)</li>
<li>تنقية المخرجات قبل التصيير</li>
<li>الـ BFF يفرض الضوابط بصرف النظر عن إدخال العميل</li>
</ul>
<hr>
<h3 id="استخدام-الأدوات-والأنماط-الوكيلية-1">استخدام الأدوات والأنماط الوكيلية</h3>
<blockquote>
<p>الذكاء الاصطناعي لا يقول أشياء فحسب — بل يفعل أشياء.</p>
</blockquote>
<pre><code>User → &quot;Find docs about Q4 revenue&quot;
LLM  → tool_use: search_documents({query: &quot;Q4 revenue&quot;})
UI   → Shows confirmation card
User → Approves
App  → Executes search, returns results to LLM
LLM  → &quot;I found 3 documents...&quot;
</code></pre>
<ul>
<li><strong>بمشاركة الإنسان:</strong> أدوات الكتابة (الإنشاء، التحديث، الحذف) تتطلب دائمًا تأكيد المستخدم.</li>
<li><strong>الأدوات للقراءة فقط</strong> (البحث، التلخيص) يمكن الموافقة التلقائية عليها.</li>
<li><strong>التخويل يمتد إلى إجراءات الذكاء الاصطناعي</strong> — لا يستطيع النموذج استدعاء إلا الأدوات المصرّح للمستخدم الحالي باستخدامها.</li>
<li>اعرض كل خطوة بمُدخَلاتها ومخرجاتها — الشفافية تبني الثقة.</li>
</ul>
<hr>
<h3 id="rag-وواجهة-الاستشهاد">RAG وواجهة الاستشهاد</h3>
<blockquote>
<p>التوليد المعزّز بالاسترجاع يُرسي الإجابات في مستنداتك.</p>
</blockquote>
<ul>
<li>صيّر الاستشهادات سطرًا بسطر — مراجع مرقّمة تربط إلى لوحة مصادر.</li>
<li>تُظهر لوحة المصادر المقتطف ذا الصلة مُبرَزًا في سياق أوسع.</li>
<li>RAG المؤسسي في القطاعات المنظّمة: الاستشهاد شرط امتثال، لا ترف في تجربة المستخدم.</li>
</ul>
<p><strong>إدارة نافذة السياق:</strong></p>
<ul>
<li>اعرض المستندات التي «يعرفها» الذكاء الاصطناعي لهذا الاستعلام.</li>
<li>حين يُقلَّم سجل المحادثة، أخبر المستخدم.</li>
<li>دع المستخدمين يضمّنون/يستثنون مستندات من مجموعة عمل الذكاء الاصطناعي.</li>
</ul>
<hr>
<h3 id="التدهور-الرشيق-للذكاء-الاصطناعي">التدهور الرشيق للذكاء الاصطناعي</h3>
<blockquote>
<p>تحتاج كل ميزة ذكاء اصطناعي إلى بديل غير ذكاء اصطناعي.</p>
</blockquote>
<table>
<thead>
<tr>
<th>نوع الخطأ</th>
<th>يرى المستخدم</th>
<th>التعافي</th>
</tr>
</thead>
<tbody>
<tr>
<td>تجاوز حد المعدّل</td>
<td>«يرجى الانتظار»</td>
<td>إعادة محاولة تلقائية مع تراجع تدريجي</td>
</tr>
<tr>
<td>السياق طويل جدًا</td>
<td>«نبدأ من جديد»</td>
<td>تلخيص السجل تلقائيًا</td>
</tr>
<tr>
<td>المحتوى مُرشَّح</td>
<td>«لا أستطيع المساعدة في ذلك»</td>
<td>اقتراح إعادة صياغة</td>
</tr>
<tr>
<td>الخدمة غير متاحة</td>
<td>بديل غير ذكاء اصطناعي</td>
<td>علامة ميزة للتعطيل</td>
</tr>
</tbody>
</table>
<ul>
<li>بحث الذكاء الاصطناعي يتدهور إلى البحث بالكلمات المفتاحية.</li>
<li>مساعد الكتابة يتدهور إلى محرّر نص عادي.</li>
<li>النموذج الذكي يبقى نموذجًا.</li>
<li><strong>علامات الميزة</strong> لتعطيل ميزات الذكاء الاصطناعي كليًا حين يكون المزوّد معطّلًا.</li>
</ul>
<hr>
<h3 id="مراقبة-خاصة-بالذكاء-الاصطناعي">مراقبة خاصة بالذكاء الاصطناعي</h3>
<blockquote>
<p>أنماط فشل مختلفة، مقاييس مختلفة.</p>
</blockquote>
<table>
<thead>
<tr>
<th>المقياس</th>
<th>لماذا يهم</th>
</tr>
</thead>
<tbody>
<tr>
<td>الزمن حتى أول رمز</td>
<td>الاستجابة المُدرَكة</td>
</tr>
<tr>
<td>الرموز في الثانية</td>
<td>إنتاجية البثّ</td>
</tr>
<tr>
<td>استخدام الرموز (إدخال + إخراج)</td>
<td><strong>تتبّع التكلفة</strong></td>
</tr>
<tr>
<td>معدّل إعادة التوليد</td>
<td>إشارة الجودة</td>
</tr>
<tr>
<td>دقة الاستشهاد</td>
<td>جودة RAG</td>
</tr>
</tbody>
</table>
<ul>
<li>تتبّع التكلفة لكل مستخدم، ولكل ميزة، ولكل نموذج.</li>
<li><strong>التخزين المؤقت للتوجيهات</strong> (Anthropic): تكلّف القراءات المخزّنة 90% أقل. ضع المحتوى الثابت قبل المحتوى المتغيّر في التوجيهات.</li>
<li>سجّل تدقيق كل تفاعل مع الذكاء الاصطناعي: التوجيه، والاستجابة، والمستخدم، ونسخة النموذج، والتكلفة.</li>
</ul>
`,r={book:s,chapter:n,chapterTitle:t,slug:a,title:l,headings:e,html:p};export{s as book,n as chapter,t as chapterTitle,r as default,e as headings,p as html,a as slug,l as title};
