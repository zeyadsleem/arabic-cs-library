const s="hono",e="api",n="مرجع الواجهة",a="context",l="السياق",p=[{depth:2,id:"req",text:"req"},{depth:2,id:"status",text:"status()"},{depth:2,id:"header",text:"header()"},{depth:2,id:"body",text:"body()"},{depth:2,id:"text",text:"text()"},{depth:2,id:"json",text:"json()"},{depth:2,id:"html",text:"html()"},{depth:2,id:"notfound",text:"notFound()"},{depth:2,id:"redirect",text:"redirect()"},{depth:2,id:"res",text:"res"},{depth:2,id:"set-get",text:"set() / get()"},{depth:2,id:"var",text:"var"},{depth:2,id:"render-setrenderer",text:"render() / setRenderer()"},{depth:2,id:"executionctx",text:"executionCtx"},{depth:2,id:"event",text:"event"},{depth:2,id:"env",text:"env"},{depth:2,id:"error",text:"error"},{depth:2,id:"contextvariablemap",text:"ContextVariableMap"}],t=`<p>الـ <code>Context</code> يتم إنشاء مثيل للكائن لكل طلب والاحتفاظ به حتى يتم إرجاع الاستجابة. يمكنك وضع قيم فيه، وتعيين ترويسات ورمز حالة تريد إرجاعه، والوصول إلى كائنات HonoRequest و Response.</p>
<h2 id="req">req</h2>
<p><code>req</code> نسخة من HonoRequest. لمزيد من التفاصيل، راجع <a href="https://hono.dev/docs/api/request"><code>HonoRequest</code></a>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/hello&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> userAgent = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">header</span>(<span class="hljs-string">&#x27;User-Agent&#x27;</span>)
  <span class="hljs-comment">// ...</span>
  <span class="hljs-comment">// ---cut-start---</span>
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">\`Hello, <span class="hljs-subst">\${userAgent}</span>\`</span>)
  <span class="hljs-comment">// ---cut-end---</span>
})
</code></pre>
<h2 id="status">status()</h2>
<p>يمكنك ضبط رمز حالة HTTP بـ <code>c.status()</code>. القيمة الافتراضية هي <code>200</code>. لست مضطرًا لاستخدام <code>c.status()</code> إذا كان الكود هو <code>200</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/posts&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-comment">// Set HTTP status code</span>
  c.<span class="hljs-title function_">status</span>(<span class="hljs-number">201</span>)
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Your post is created!&#x27;</span>)
})
</code></pre>
<h2 id="header">header()</h2>
<p>يمكنك تعيين ترويسات HTTP للاستجابة.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-comment">// Set headers</span>
  c.<span class="hljs-title function_">header</span>(<span class="hljs-string">&#x27;X-Message&#x27;</span>, <span class="hljs-string">&#x27;My custom message&#x27;</span>)
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Hello!&#x27;</span>)
})
</code></pre>
<h2 id="body">body()</h2>
<p>أعِد استجابة HTTP.</p>
<p><strong>ملاحظة</strong>: عند إرجاع نص أو HTML، يُنصح باستخدام <code>c.text()</code> أو <code>c.html()</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/welcome&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  c.<span class="hljs-title function_">header</span>(<span class="hljs-string">&#x27;Content-Type&#x27;</span>, <span class="hljs-string">&#x27;text/plain&#x27;</span>)
  <span class="hljs-comment">// Return the response body</span>
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">body</span>(<span class="hljs-string">&#x27;Thank you for coming&#x27;</span>)
})
</code></pre>
<p>يمكنك أيضًا كتابة ما يلي.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/welcome&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">body</span>(<span class="hljs-string">&#x27;Thank you for coming&#x27;</span>, <span class="hljs-number">201</span>, {
    <span class="hljs-string">&#x27;X-Message&#x27;</span>: <span class="hljs-string">&#x27;Hello!&#x27;</span>,
    <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;text/plain&#x27;</span>,
  })
})
</code></pre>
<p>الاستجابة هي نفسها <code>Response</code> كائن كما أدناه.</p>
<pre><code class="language-ts"><span class="hljs-keyword">new</span> <span class="hljs-title class_">Response</span>(<span class="hljs-string">&#x27;Thank you for coming&#x27;</span>, {
  <span class="hljs-attr">status</span>: <span class="hljs-number">201</span>,
  <span class="hljs-attr">headers</span>: {
    <span class="hljs-string">&#x27;X-Message&#x27;</span>: <span class="hljs-string">&#x27;Hello!&#x27;</span>,
    <span class="hljs-string">&#x27;Content-Type&#x27;</span>: <span class="hljs-string">&#x27;text/plain&#x27;</span>,
  },
})
</code></pre>
<h2 id="text">text()</h2>
<p>تقديم النص كـ <code>Content-Type: text/plain</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/say&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Hello!&#x27;</span>)
})
</code></pre>
<h2 id="json">json()</h2>
<p>تقديم JSON كـ <code>Content-Type: application/json</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Hello!&#x27;</span> })
})
</code></pre>
<h2 id="html">html()</h2>
<p>تقديم HTML كـ <code>Content-Type: text/html</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">html</span>(<span class="hljs-string">&#x27;&lt;h1&gt;Hello! Hono!&lt;/h1&gt;&#x27;</span>)
})
</code></pre>
<h2 id="notfound">notFound()</h2>
<p>أعِد <code>Not Found</code> Response. يمكنك تخصيصها بـ <a href="https://hono.dev/docs/api/hono#not-found"><code>app.notFound()</code></a>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/notfound&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">notFound</span>()
})
</code></pre>
<h2 id="redirect">redirect()</h2>
<p>Redirect، رمز الحالة الافتراضي هو <code>302</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/redirect&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">redirect</span>(<span class="hljs-string">&#x27;/&#x27;</span>)
})
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/redirect-permanently&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">redirect</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-number">301</span>)
})
</code></pre>
<h2 id="res">res</h2>
<p>يمكنك الوصول إلى كائن <a href="https://developer.mozilla.org/en-US/docs/Web/API/Response">Response</a> الذي سيُعاد.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
<span class="hljs-comment">// Response object</span>
app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-title function_">async</span> (c, next) =&gt; {
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>()
  c.<span class="hljs-property">res</span>.<span class="hljs-property">headers</span>.<span class="hljs-title function_">append</span>(<span class="hljs-string">&#x27;X-Debug&#x27;</span>, <span class="hljs-string">&#x27;Debug message&#x27;</span>)
})
</code></pre>
<h2 id="set-get">set() / get()</h2>
<p>احصل على أزواج مفاتيح-قيم عشوائية وعيّنها، بعمر يساوي عمر الطلب الحالي. يتيح هذا تمرير قيم محددة بين الوسائط أو من الوسائط إلى معالجات المسارات.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>&lt;{ <span class="hljs-title class_">Variables</span>: { <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span> } }&gt;()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">async</span> (c, next) =&gt; {
  c.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;message&#x27;</span>, <span class="hljs-string">&#x27;Hono is cool!!&#x27;</span>)
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>()
})

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> message = c.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;message&#x27;</span>)
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">\`The message is &quot;<span class="hljs-subst">\${message}</span>&quot;\`</span>)
})
</code></pre>
<p>مرِّر <code>Variables</code> كأنواع عامة (Generics) إلى مُنشئ <code>Hono</code> لجعله آمنًا من حيث الأنواع.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-comment">// ---cut---</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Variables</span> = {
  <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span>
}

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>&lt;{ <span class="hljs-title class_">Variables</span>: <span class="hljs-title class_">Variables</span> }&gt;()
</code></pre>
<p>قيمة <code>c.set</code> / <code>c.get</code> تبقى محفوظة فقط داخل نفس الطلب. لا يمكن مشاركتها أو استمرارها عبر طلبات مختلفة.</p>
<h2 id="var">var</h2>
<p>يمكنك أيضًا الوصول إلى قيمة متغيّر عبر <code>c.var</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">Context</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">declare</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">c</span>: <span class="hljs-title class_">Context</span>
<span class="hljs-comment">// ---cut---</span>
<span class="hljs-keyword">const</span> result = c.<span class="hljs-property">var</span>.<span class="hljs-property">client</span>.<span class="hljs-title function_">oneMethod</span>()
</code></pre>
<p>إذا أردت إنشاء وسيط (middleware) يوفر طريقة (method) مخصصة،
اكتب كما يلي:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { createMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/factory&#x27;</span>
<span class="hljs-comment">// ---cut---</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Env</span> = {
  <span class="hljs-title class_">Variables</span>: {
    <span class="hljs-attr">echo</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">str</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">string</span>
  }
}

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

<span class="hljs-keyword">const</span> echoMiddleware = createMiddleware&lt;<span class="hljs-title class_">Env</span>&gt;(<span class="hljs-title function_">async</span> (c, next) =&gt; {
  c.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;echo&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">str</span>) =&gt;</span> str)
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>()
})

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/echo&#x27;</span>, echoMiddleware, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(c.<span class="hljs-property">var</span>.<span class="hljs-title function_">echo</span>(<span class="hljs-string">&#x27;Hello!&#x27;</span>))
})
</code></pre>
<p>إذا أردت استخدام الوسيط (middleware) في عدة معالجات (handlers)، يمكنك استخدام <code>app.use()</code>.
بعد ذلك، عليك تمرير <code>Env</code> كأنواع عامة (Generics) إلى مُنشئ <code>Hono</code> لجعله آمنًا من حيث الأنواع.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">MiddlewareHandler</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/types&#x27;</span>
<span class="hljs-keyword">declare</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">echoMiddleware</span>: <span class="hljs-title class_">MiddlewareHandler</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Env</span> = {
  <span class="hljs-title class_">Variables</span>: {
    <span class="hljs-attr">echo</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">str</span>: <span class="hljs-built_in">string</span></span>) =&gt;</span> <span class="hljs-built_in">string</span>
  }
}
<span class="hljs-comment">// ---cut---</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>&lt;<span class="hljs-title class_">Env</span>&gt;()

app.<span class="hljs-title function_">use</span>(echoMiddleware)

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/echo&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(c.<span class="hljs-property">var</span>.<span class="hljs-title function_">echo</span>(<span class="hljs-string">&#x27;Hello!&#x27;</span>))
})
</code></pre>
<h2 id="render-setrenderer">render() / setRenderer()</h2>
<p>يمكنك تعيين تخطيط باستخدام <code>c.setRenderer()</code> داخل وسيط مخصص.</p>
<pre><code class="language-tsx"><span class="hljs-comment">/** <span class="hljs-doctag">@jsx</span> jsx */</span>
<span class="hljs-comment">/** <span class="hljs-doctag">@jsxImportSource</span> hono/jsx */</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">async</span> (c, next) =&gt; {
  c.<span class="hljs-title function_">setRenderer</span>(<span class="hljs-function">(<span class="hljs-params">content</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">html</span>(
      
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{content}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></span>
      
    )
  })
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>()
})
</code></pre>
<p>بعد ذلك، يمكنك الاستفادة من <code>c.render()</code> لإنشاء استجابات داخل هذا التخطيط (layout).</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">render</span>(<span class="hljs-string">&#x27;Hello!&#x27;</span>)
})
</code></pre>
<p>ستكون المخرجات كالتالي:</p>
<pre><code class="language-html">
  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Hello!<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

</code></pre>
<p>بالإضافة إلى ذلك، توفر هذه الميزة مرونةً في تخصيص الوسائط (arguments).
لضمان أمان الأنواع، يمكن تعريف الأنواع كما يلي:</p>
<pre><code class="language-ts"><span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;hono&#x27;</span> {
  <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ContextRenderer</span> {
    (
      <span class="hljs-attr">content</span>: <span class="hljs-built_in">string</span> | <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">string</span>&gt;,
      <span class="hljs-attr">head</span>: { <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span> }
    ): <span class="hljs-title class_">Response</span> | <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Response</span>&gt;
  }
}
</code></pre>
<p>إليك مثالًا على كيفية استخدام هذا:</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&#x27;/pages/*&#x27;</span>, <span class="hljs-title function_">async</span> (c, next) =&gt; {
  c.<span class="hljs-title function_">setRenderer</span>(<span class="hljs-function">(<span class="hljs-params">content, head</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">html</span>(
      
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>{head.title}<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span></span>
        <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">header</span>&gt;</span>{head.title}<span class="hljs-tag">&lt;/<span class="hljs-name">header</span>&gt;</span>
          <span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>{content}<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>
        <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></span>
      
    )
  })
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>()
})

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/pages/my-favorite&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Ramen and Sushi<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>, {
    <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;My favorite&#x27;</span>,
  })
})

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/pages/my-hobbies&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>Watching baseball<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span></span>, {
    <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;My hobbies&#x27;</span>,
  })
})
</code></pre>
<h2 id="executionctx">executionCtx</h2>
<p>يمكنك الوصول إلى الميزات الخاصة بـ Cloudflare Workers <a href="https://developers.cloudflare.com/workers/runtime-apis/context/">ExecutionContext</a>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>&lt;{
  <span class="hljs-title class_">Bindings</span>: {
    <span class="hljs-attr">KV</span>: <span class="hljs-built_in">any</span>
  }
}&gt;()
<span class="hljs-keyword">declare</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>
<span class="hljs-keyword">declare</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">data</span>: <span class="hljs-built_in">string</span>
<span class="hljs-comment">// ---cut---</span>
<span class="hljs-comment">// ExecutionContext object</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/foo&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  c.<span class="hljs-property">executionCtx</span>.<span class="hljs-title function_">waitUntil</span>(c.<span class="hljs-property">env</span>.<span class="hljs-property">KV</span>.<span class="hljs-title function_">put</span>(key, data))
  <span class="hljs-comment">// ...</span>
})
</code></pre>
<p>الـ <code>ExecutionContext</code> يمتلك أيضًا <a href="https://developers.cloudflare.com/workers/runtime-apis/context/#exports"><code>exports</code></a> حقل. للحصول على الإكمال التلقائي مع الأنواع التي يولّدها Wrangler، يمكنك استخدام توسيع الوحدة (module augmentation):</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> <span class="hljs-string">&#x27;hono&#x27;</span>

<span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;hono&#x27;</span> {
  <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ExecutionContext</span> {
    <span class="hljs-keyword">readonly</span> <span class="hljs-attr">exports</span>: <span class="hljs-title class_">Cloudflare</span>.<span class="hljs-property">Exports</span>
  }
}
</code></pre>
<h2 id="event">event</h2>
<p>يمكنك الوصول إلى الميزات الخاصة بـ Cloudflare Workers <code>FetchEvent</code>. كان هذا مستخدمًا في صيغة &quot;Service Worker&quot;. لكنه غير موصى به الآن.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">declare</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>
<span class="hljs-keyword">declare</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">data</span>: <span class="hljs-built_in">string</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">KVNamespace</span> = <span class="hljs-built_in">any</span>
<span class="hljs-comment">// ---cut---</span>
<span class="hljs-comment">// Type definition to make type inference</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Bindings</span> = {
  <span class="hljs-attr">MY_KV</span>: <span class="hljs-title class_">KVNamespace</span>
}

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>&lt;{ <span class="hljs-title class_">Bindings</span>: <span class="hljs-title class_">Bindings</span> }&gt;()

<span class="hljs-comment">// FetchEvent object (only set when using Service Worker syntax)</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/foo&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  c.<span class="hljs-property">event</span>.<span class="hljs-title function_">waitUntil</span>(c.<span class="hljs-property">env</span>.<span class="hljs-property">MY_KV</span>.<span class="hljs-title function_">put</span>(key, data))
  <span class="hljs-comment">// ...</span>
})
</code></pre>
<h2 id="env">env</h2>
<p>في Cloudflare Workers، تُعرف متغيرات البيئة والأسرار ومساحات أسماء KV وقاعدة بيانات D1 وحاوية R2 bucket وما إلى ذلك المرتبطة بالعامل (worker) باسم الارتباطات (bindings).
بغض النظر عن النوع، تتوفر الارتباطات (bindings) دائمًا كمتغيرات عامة ويمكن الوصول إليها عبر السياق <code>c.env.BINDING_KEY</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">KVNamespace</span> = <span class="hljs-built_in">any</span>
<span class="hljs-comment">// ---cut---</span>
<span class="hljs-comment">// Type definition to make type inference</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Bindings</span> = {
  <span class="hljs-attr">MY_KV</span>: <span class="hljs-title class_">KVNamespace</span>
}

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>&lt;{ <span class="hljs-title class_">Bindings</span>: <span class="hljs-title class_">Bindings</span> }&gt;()

<span class="hljs-comment">// Environment object for Cloudflare Workers</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  c.<span class="hljs-property">env</span>.<span class="hljs-property">MY_KV</span>.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;my-key&#x27;</span>)
  <span class="hljs-comment">// ...</span>
})
</code></pre>
<h2 id="error">error</h2>
<p>إذا رمى المعالج (Handler) خطأً، يوضع كائن الخطأ (error object) في <code>c.error</code>.
يمكنك الوصول إليه في برمجيتك الوسيطة.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">async</span> (c, next) =&gt; {
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>()
  <span class="hljs-keyword">if</span> (c.<span class="hljs-property">error</span>) {
    <span class="hljs-comment">// do something...</span>
  }
})
</code></pre>
<h2 id="contextvariablemap">ContextVariableMap</h2>
<p><code>ContextVariableMap</code> يضيف الأنواع <strong>عمومًا</strong> إلى جميع السياقات، بغض النظر عما إذا كان الوسيط الذي يعيّن المتغير قد تم تشغيله فعليًا. هذا يعني <code>c.get('result')</code> ستبدو آمنة من ناحية الأنواع حتى في المعالجات التي لم تُسجَّل فيها وسيطتك مطلقًا، مما قد يخفي <code>undefined</code> أخطاء أثناء التنفيذ.</p>
<p>ألقِ نظرة على المثال التالي:</p>
<pre><code class="language-ts"><span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;hono&#x27;</span> {
  <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ContextVariableMap</span> {
    <span class="hljs-attr">result</span>: <span class="hljs-built_in">string</span>
  }
}

<span class="hljs-keyword">const</span> mw = <span class="hljs-title function_">createMiddleware</span>(<span class="hljs-title function_">async</span> (c, next) =&gt; {
  c.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;result&#x27;</span>, <span class="hljs-string">&#x27;some values&#x27;</span>)
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>()
})

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

<span class="hljs-comment">// handler uses the middleware</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/foo&#x27;</span>, mw, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> val = c.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;result&#x27;</span>) <span class="hljs-comment">// ✅ val is a string and typed as such, as expected</span>
})

<span class="hljs-comment">// handler doesn&#x27;t use the middleware</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/bar&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> val = c.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;result&#x27;</span>) <span class="hljs-comment">// ❌ val is undefined but typed as a string, which can lead to runtime errors</span>
})
</code></pre>
<p>يمكنك توسيع <code>ContextVariableMap</code> واجهة لتحديد أنواع متغيرات السياق عمومًا عبر تطبيقك بالكامل. هذا مناسب عندما يتم تعيين متغير بواسطة وسيط يُطبق على مستوى التطبيق ويكون مضمون الوجود في السياق.</p>
<p>على سبيل المثال:</p>
<pre><code class="language-ts"><span class="hljs-keyword">declare</span> <span class="hljs-variable language_">module</span> <span class="hljs-string">&#x27;hono&#x27;</span> {
  <span class="hljs-keyword">interface</span> <span class="hljs-title class_">ContextVariableMap</span> {
    <span class="hljs-attr">result</span>: <span class="hljs-built_in">string</span>
  }
}
</code></pre>
<p>يمكنك بعد ذلك الاستفادة من هذا في وسيطك:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { createMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/factory&#x27;</span>
<span class="hljs-comment">// ---cut---</span>
<span class="hljs-keyword">const</span> mw = <span class="hljs-title function_">createMiddleware</span>(<span class="hljs-title function_">async</span> (c, next) =&gt; {
  c.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;result&#x27;</span>, <span class="hljs-string">&#x27;some values&#x27;</span>) <span class="hljs-comment">// result is a string</span>
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>()
})
</code></pre>
<p>في معالج (handler)، يُستنتَج المتغيّر بالنوع المناسب:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>&lt;{ <span class="hljs-title class_">Variables</span>: { <span class="hljs-attr">result</span>: <span class="hljs-built_in">string</span> } }&gt;()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> val = c.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;result&#x27;</span>) <span class="hljs-comment">// val is a string</span>
  <span class="hljs-comment">// ...</span>
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">result</span>: val })
})
</code></pre>
`,c={book:s,chapter:"api",chapterTitle:n,slug:a,title:l,headings:p,html:t};export{s as book,e as chapter,n as chapterTitle,c as default,p as headings,t as html,a as slug,l as title};
