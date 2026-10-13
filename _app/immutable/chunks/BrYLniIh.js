const s="hono",n="guides",a="الأدلة",l="middleware",p="الوسيط",e=[{depth:2,id:"تعريف-البرمجيات-الوسيطة",text:"تعريف البرمجيات الوسيطة"},{depth:2,id:"ترتيب-التنفيذ",text:"ترتيب التنفيذ"},{depth:2,id:"البرمجيات-الوسيطة-المدمجة",text:"البرمجيات الوسيطة المدمجة"},{depth:2,id:"برمجيات-وسيطة-مخصصة",text:"برمجيات وسيطة مخصصة"},{depth:3,id:"تعديل-الاستجابة-بعد-التالي",text:"تعديل الاستجابة بعد التالي"},{depth:2,id:"الوصول-إلى-السياق-داخل-وسائط-البرمجيات-الوسيطة",text:"الوصول إلى السياق داخل وسائط البرمجيات الوسيطة"},{depth:3,id:"توسيع-السياق-في-البرمجيات-الوسيطة",text:"توسيع السياق في البرمجيات الوسيطة"},{depth:3,id:"استنتاج-الأنواع-عبر-البرمجيات-الوسيطة-المتسلسلة",text:"استنتاج الأنواع عبر البرمجيات الوسيطة المتسلسلة"},{depth:2,id:"برمجيات-وسيطة-من-طرف-ثالث",text:"برمجيات وسيطة من طرف ثالث"}],t=`<p>يعمل الوسيط قبل/بعد نقطة النهاية <code>Handler</code>. يمكننا الحصول على <code>Request</code> قبل الإرسال أو التلاعب بـ <code>Response</code> بعد الإرسال.</p>
<h2 id="تعريف-البرمجيات-الوسيطة">تعريف البرمجيات الوسيطة</h2>
<ul>
<li>المعالج - ينبغي أن يعيد <code>Response</code> كائن. سيُستدعى معالج واحد فقط.</li>
<li>البرمجيات الوسيطة - ينبغي <code>await next()</code> وعدم إرجاع أي شيء لاستدعاء الوسيط (Middleware) التالي، <strong>أو</strong> إرجاع <code>Response</code> للخروج المبكر.</li>
</ul>
<p>يمكن للمستخدم تسجيل البرمجيات الوسيطة باستخدام <code>app.use</code> أو باستخدام <code>app.HTTP_METHOD</code> بالإضافة إلى المعالجات. في هذه الميزة، من السهل تحديد المسار والأسلوب (method).</p>
<pre><code class="language-ts"><span class="hljs-comment">// match any method, all routes</span>
app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">logger</span>())

<span class="hljs-comment">// specify path</span>
app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&#x27;/posts/*&#x27;</span>, <span class="hljs-title function_">cors</span>())

<span class="hljs-comment">// specify method and path</span>
app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/posts/*&#x27;</span>, <span class="hljs-title function_">basicAuth</span>())
</code></pre>
<p>إذا أعاد المعالج <code>Response</code>، فسيُستخدم للمستخدم النهائي وسيتوقف عن المعالجة.</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/posts&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Created!&#x27;</span>, <span class="hljs-number">201</span>))
</code></pre>
<p>في هذه الحالة، تتم معالجة أربعة وسائط (middleware) قبل الإرسال (dispatch) على النحو التالي:</p>
<pre><code class="language-ts"><span class="hljs-title function_">logger</span>() -&gt; <span class="hljs-title function_">cors</span>() -&gt; <span class="hljs-title function_">basicAuth</span>() -&gt; *handler*
</code></pre>
<h2 id="ترتيب-التنفيذ">ترتيب التنفيذ</h2>
<p>يتم تحديد الترتيب الذي تُنفَّذ به الوسائط حسب الترتيب الذي سُجّلت به.
العملية قبل <code>next</code> من الوسيطة (Middleware) المسجَّلة أولاً يُنفَّذ أولاً،
والعملية بعد <code>next</code> يُنفَّذ أخيرًا.
انظر أدناه.</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">async</span> (_, next) =&gt; {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;middleware 1 start&#x27;</span>)
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>()
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;middleware 1 end&#x27;</span>)
})
app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">async</span> (_, next) =&gt; {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;middleware 2 start&#x27;</span>)
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>()
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;middleware 2 end&#x27;</span>)
})
app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">async</span> (_, next) =&gt; {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;middleware 3 start&#x27;</span>)
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>()
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;middleware 3 end&#x27;</span>)
})

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;handler&#x27;</span>)
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Hello!&#x27;</span>)
})
</code></pre>
<p>النتيجة كما يلي.</p>
<pre><code>middleware 1 start
  middleware 2 start
    middleware 3 start
      handler
    middleware 3 end
  middleware 2 end
middleware 1 end
</code></pre>
<p>لاحظ أنه إذا ألقى المعالج أو أي وسيطة استثناءً (throws)، فسيلتقطه hono ويمرره إما إلى <a href="https://hono.dev/docs/api/hono#error-handling">دالة الاستدعاء app.onError() الخاصة بك</a> أو تحويله تلقائيًا إلى استجابة 500 قبل إرجاعه لأعلى سلسلة الوسائط. هذا يعني أن next() لن يرمي خطأً أبدًا، لذا لا حاجة لالتفافه في try/catch/finally.</p>
<h2 id="البرمجيات-الوسيطة-المدمجة">البرمجيات الوسيطة المدمجة</h2>
<p>يمتلك Hono وسيطات مدمجة.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { poweredBy } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/powered-by&#x27;</span>
<span class="hljs-keyword">import</span> { logger } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/logger&#x27;</span>
<span class="hljs-keyword">import</span> { basicAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/basic-auth&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">poweredBy</span>())
app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">logger</span>())

app.<span class="hljs-title function_">use</span>(
  <span class="hljs-string">&#x27;/auth/*&#x27;</span>,
  <span class="hljs-title function_">basicAuth</span>({
    <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;hono&#x27;</span>,
    <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;acoolproject&#x27;</span>,
  })
)
</code></pre>
<p>في Deno، من الممكن استخدام إصدار مختلف من الوسيط عن إصدار Hono، لكن هذا يمكن أن يؤدي إلى أخطاء.
على سبيل المثال، هذا الكود لا يعمل لأن الإصدار مختلف.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;jsr:@hono/hono@4.4.0&#x27;</span>
<span class="hljs-keyword">import</span> { upgradeWebSocket } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;jsr:@hono/hono@4.4.5/deno&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/ws&#x27;</span>,
  <span class="hljs-title function_">upgradeWebSocket</span>(<span class="hljs-function">() =&gt;</span> ({
    <span class="hljs-comment">// ...</span>
  }))
)
</code></pre>
<h2 id="برمجيات-وسيطة-مخصصة">برمجيات وسيطة مخصصة</h2>
<p>يمكنك كتابة وسيطك الخاص مباشرةً داخل <code>app.use()</code>:</p>
<pre><code class="language-ts"><span class="hljs-comment">// Custom logger</span>
app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">async</span> (c, next) =&gt; {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`[<span class="hljs-subst">\${c.req.method}</span>] <span class="hljs-subst">\${c.req.url}</span>\`</span>)
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>()
})

<span class="hljs-comment">// Add a custom header</span>
app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&#x27;/message/*&#x27;</span>, <span class="hljs-title function_">async</span> (c, next) =&gt; {
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>()
  c.<span class="hljs-title function_">header</span>(<span class="hljs-string">&#x27;x-message&#x27;</span>, <span class="hljs-string">&#x27;This is middleware!&#x27;</span>)
})

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/message/hello&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Hello Middleware!&#x27;</span>))
</code></pre>
<p>ومع ذلك، تضمين الوسيط مباشرةً داخل <code>app.use()</code> قد يحد من قابلية إعادة استخدامه. لذلك، يمكننا فصل الوسائط الخاصة بنا إلى ملفات مختلفة.</p>
<p>لضمان عدم فقدان تعريفات الأنواع لـ <code>context</code> و <code>next</code>، عند فصل الوسيط (middleware)، يمكننا استخدام <a href="https://hono.dev/docs/helpers/factory#createmiddleware"><code>createMiddleware()</code></a> من مصنع (factory) Hono. يسمح لنا هذا أيضاً بأمان الأنواع <a href="https://hono.dev/docs/api/context#set-get">الوصول إلى البيانات التي <code>set</code> في <code>Context</code></a> من المعالجات اللاحقة (downstream).</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { createMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/factory&#x27;</span>

<span class="hljs-keyword">const</span> logger = <span class="hljs-title function_">createMiddleware</span>(<span class="hljs-title function_">async</span> (c, next) =&gt; {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`[<span class="hljs-subst">\${c.req.method}</span>] <span class="hljs-subst">\${c.req.url}</span>\`</span>)
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>()
})
</code></pre>
<p>يمكن استخدام الأنواع العامة (generics) مع <code>createMiddleware</code>:</p>
<pre><code class="language-ts">createMiddleware&lt;{<span class="hljs-title class_">Bindings</span>: <span class="hljs-title class_">Bindings</span>}&gt;(<span class="hljs-title function_">async</span> (c, next) =&gt;
</code></pre>
<h3 id="تعديل-الاستجابة-بعد-التالي">تعديل الاستجابة بعد التالي</h3>
<p>بالإضافة إلى ذلك، يمكن تصميم الوسائط (middleware) لتعديل الاستجابات عند الحاجة:</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> stripRes = <span class="hljs-title function_">createMiddleware</span>(<span class="hljs-title function_">async</span> (c, next) =&gt; {
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>()
  c.<span class="hljs-property">res</span> = <span class="hljs-literal">undefined</span>
  c.<span class="hljs-property">res</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Response</span>(<span class="hljs-string">&#x27;New Response&#x27;</span>)
})
</code></pre>
<h2 id="الوصول-إلى-السياق-داخل-وسائط-البرمجيات-الوسيطة">الوصول إلى السياق داخل وسائط البرمجيات الوسيطة</h2>
<p>للوصول إلى السياق (context) داخل وسائط الوسيطة، استخدم مباشرة معامل السياق المقدم من <code>app.use</code>. راجع المثال أدناه للتوضيح.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { cors } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/cors&#x27;</span>

app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&#x27;*&#x27;</span>, <span class="hljs-title function_">async</span> (c, next) =&gt; {
  <span class="hljs-keyword">const</span> middleware = <span class="hljs-title function_">cors</span>({
    <span class="hljs-attr">origin</span>: c.<span class="hljs-property">env</span>.<span class="hljs-property">CORS_ORIGIN</span>,
  })
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">middleware</span>(c, next)
})
</code></pre>
<h3 id="توسيع-السياق-في-البرمجيات-الوسيطة">توسيع السياق في البرمجيات الوسيطة</h3>
<p>لتوسيع السياق داخل الوسيط، استخدم <code>c.set</code>. يمكنك جعل هذا آمن الأنواع (type-safe) بتمرير <code>{ Variables: { yourVariable: YourVariableType } }</code> وسيط generic إلى <code>createMiddleware</code> الدالة.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { createMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/factory&#x27;</span>

<span class="hljs-keyword">const</span> echoMiddleware = createMiddleware&lt;{
  <span class="hljs-title class_">Variables</span>: {
    <span class="hljs-attr">echo</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">str</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">string</span>
  }
}&gt;(<span class="hljs-title function_">async</span> (c, next) =&gt; {
  c.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;echo&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">str</span>) =&gt;</span> str)
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>()
})

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/echo&#x27;</span>, echoMiddleware, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(c.<span class="hljs-property">var</span>.<span class="hljs-title function_">echo</span>(<span class="hljs-string">&#x27;Hello!&#x27;</span>))
})
</code></pre>
<h3 id="استنتاج-الأنواع-عبر-البرمجيات-الوسيطة-المتسلسلة">استنتاج الأنواع عبر البرمجيات الوسيطة المتسلسلة</h3>
<p>عندما تُسلسِل عدة وسيطات باستخدام <code>.use()</code>، يجمّع Hono تلقائيًا الـ <code>Variables</code> الأنواع. يمكن لمعالجات المسارات التي تتبع سلسلة الوسائط الوصول إلى جميع المتغيرات من كل وسيط سابق بطريقة آمنة من حيث الأنواع (type-safe):</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { createMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/factory&#x27;</span>

<span class="hljs-keyword">const</span> authMiddleware = createMiddleware&lt;{
  <span class="hljs-title class_">Variables</span>: { <span class="hljs-attr">user</span>: { <span class="hljs-attr">id</span>: <span class="hljs-built_in">string</span>; <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span> } }
}&gt;(<span class="hljs-title function_">async</span> (c, next) =&gt; {
  c.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;user&#x27;</span>, { <span class="hljs-attr">id</span>: <span class="hljs-string">&#x27;123&#x27;</span>, <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;Alice&#x27;</span> })
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>()
})

<span class="hljs-keyword">const</span> dbMiddleware = createMiddleware&lt;{
  <span class="hljs-title class_">Variables</span>: { <span class="hljs-attr">db</span>: { <span class="hljs-attr">query</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">sql</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">unknown</span>&gt; } }
}&gt;(<span class="hljs-title function_">async</span> (c, next) =&gt; {
  c.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;db&#x27;</span>, {
    <span class="hljs-attr">query</span>: <span class="hljs-title function_">async</span> (sql) =&gt; {
      <span class="hljs-comment">/* ... */</span>
    },
  })
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>()
})

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
  .<span class="hljs-title function_">use</span>(authMiddleware)
  .<span class="hljs-title function_">use</span>(dbMiddleware)
  .<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
    <span class="hljs-comment">// Both \`user\` and \`db\` are available and type-safe</span>
    <span class="hljs-keyword">const</span> user = c.<span class="hljs-property">var</span>.<span class="hljs-property">user</span> <span class="hljs-comment">// { id: string; name: string }</span>
    <span class="hljs-keyword">const</span> db = c.<span class="hljs-property">var</span>.<span class="hljs-property">db</span> <span class="hljs-comment">// { query: (sql: string) =&gt; Promise&lt;unknown&gt; }</span>
    <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({ user })
  })
</code></pre>
<p>يعمل هذا لأن كل <code>.use()</code> يُرجع الاستدعاء مثيل Hono جديدًا بالنوع المدمج، لذا ينمو النوع مع تسلسل الوسائط. هذا يلغي الحاجة إلى التصريح يدويًا بنوع مدمج <code>Env</code> النوع مسبقًا لمعظم حالات الاستخدام.</p>
<h2 id="برمجيات-وسيطة-من-طرف-ثالث">برمجيات وسيطة من طرف ثالث</h2>
<p>لا تعتمد الوسائط المدمجة على وحدات خارجية، لكن وسائط الطرف الثالث يمكن أن تعتمد على مكتبات خارجية. لذا معها، قد نصنع تطبيقًا أكثر تعقيدًا.</p>
<p>يمكننا استكشاف مجموعة متنوعة من <a href="https://hono.dev/docs/middleware/third-party">برمجيات وسيطة من طرف ثالث</a>.
على سبيل المثال، لدينا وسيطة خادم GraphQL ووسيطة Sentry ووسيطة مصادقة Firebase وغيرها.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:l,title:p,headings:e,html:t};export{s as book,n as chapter,a as chapterTitle,c as default,e as headings,t as html,l as slug,p as title};
