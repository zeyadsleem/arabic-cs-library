const s="hono",n="helpers",a="المساعدات",p="proxy",l="مساعد `Proxy`",t=[{depth:2,id:"import",text:"Import"},{depth:2,id:"proxy",text:"proxy()"},{depth:3,id:"أمثلة",text:"أمثلة"},{depth:3,id:"معالجة-ترويسة-الاتصال",text:"معالجة ترويسة الاتصال"},{depth:3,id:"proxyfetch",text:"ProxyFetch"}],e=`<p>توفر الأداة المساعدة Proxy (Proxy Helper) دوالًا مفيدة عند استخدام تطبيق Hono كوكيل (بروكسي عكسي).</p>
<h2 id="import">Import</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { proxy } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/proxy&#x27;</span>
</code></pre>
<h2 id="proxy"><code>proxy()</code></h2>
<p><code>proxy()</code> هو <code>fetch()</code> غلاف API (wrapper) للوكيل (proxy). المعاملات وقيمة الإرجاع هي نفسها كما في <code>fetch()</code> (باستثناء الخيارات الخاصة بالوكيل (proxy)).</p>
<p>الـ <code>Accept-Encoding</code> يتم استبدال الترويسة بترميز يمكن لوقت التشغيل الحالي التعامل معه. تتم إزالة ترويسات الاستجابة غير الضرورية، ويتم <code>Response</code> يُعاد كائن (object) يمكن إرساله من المعالج (handler).</p>
<h3 id="أمثلة">أمثلة</h3>
<p>استخدام بسيط:</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/proxy/:path&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">proxy</span>(<span class="hljs-string">\`http://<span class="hljs-subst">\${originServer}</span>/<span class="hljs-subst">\${c.req.param(<span class="hljs-string">&#x27;path&#x27;</span>)}</span>\`</span>)
})
</code></pre>
<p>استخدام معقَّد:</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/proxy/:path&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  <span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> <span class="hljs-title function_">proxy</span>(
    <span class="hljs-string">\`http://<span class="hljs-subst">\${originServer}</span>/<span class="hljs-subst">\${c.req.param(<span class="hljs-string">&#x27;path&#x27;</span>)}</span>\`</span>,
    {
      <span class="hljs-attr">headers</span>: {
        ...c.<span class="hljs-property">req</span>.<span class="hljs-title function_">header</span>(), <span class="hljs-comment">// optional, specify only when forwarding all the request data (including credentials) is necessary.</span>
        <span class="hljs-string">&#x27;X-Forwarded-For&#x27;</span>: <span class="hljs-string">&#x27;127.0.0.1&#x27;</span>,
        <span class="hljs-string">&#x27;X-Forwarded-Host&#x27;</span>: c.<span class="hljs-property">req</span>.<span class="hljs-title function_">header</span>(<span class="hljs-string">&#x27;host&#x27;</span>),
        <span class="hljs-title class_">Authorization</span>: <span class="hljs-literal">undefined</span>, <span class="hljs-comment">// do not propagate request headers contained in c.req.header(&#x27;Authorization&#x27;)</span>
      },
    }
  )
  res.<span class="hljs-property">headers</span>.<span class="hljs-title function_">delete</span>(<span class="hljs-string">&#x27;Set-Cookie&#x27;</span>)
  <span class="hljs-keyword">return</span> res
})
</code></pre>
<p>أو يمكنك تمرير <code>c.req</code> كمعامل.</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">all</span>(<span class="hljs-string">&#x27;/proxy/:path&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">proxy</span>(<span class="hljs-string">\`http://<span class="hljs-subst">\${originServer}</span>/<span class="hljs-subst">\${c.req.param(<span class="hljs-string">&#x27;path&#x27;</span>)}</span>\`</span>, {
    ...c.<span class="hljs-property">req</span>, <span class="hljs-comment">// optional, specify only when forwarding all the request data (including credentials) is necessary.</span>
    <span class="hljs-attr">headers</span>: {
      ...c.<span class="hljs-property">req</span>.<span class="hljs-title function_">header</span>(),
      <span class="hljs-string">&#x27;X-Forwarded-For&#x27;</span>: <span class="hljs-string">&#x27;127.0.0.1&#x27;</span>,
      <span class="hljs-string">&#x27;X-Forwarded-Host&#x27;</span>: c.<span class="hljs-property">req</span>.<span class="hljs-title function_">header</span>(<span class="hljs-string">&#x27;host&#x27;</span>),
      <span class="hljs-title class_">Authorization</span>: <span class="hljs-literal">undefined</span>, <span class="hljs-comment">// do not propagate request headers contained in c.req.header(&#x27;Authorization&#x27;)</span>
    },
  })
})
</code></pre>
<p>يمكنك تجاوز الافتراضي العام <code>fetch</code> دالة بـ <code>customFetch</code> option:</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/proxy&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">proxy</span>(<span class="hljs-string">&#x27;https://example.com/&#x27;</span>, {
    customFetch,
  })
})
</code></pre>
<h3 id="معالجة-ترويسة-الاتصال">معالجة ترويسة الاتصال</h3>
<p>بشكل افتراضي، <code>proxy()</code> يتجاهل <code>Connection</code> ترويسة لمنع هجمات حقن الترويسات المتتابعة (Hop-by-Hop Header Injection). يمكنك تفعيل الامتثال الصارم لمعيار RFC 9110 باستخدام <code>strictConnectionProcessing</code> option:</p>
<pre><code class="language-ts"><span class="hljs-comment">// Default behavior (recommended for untrusted clients)</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/proxy/:path&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">proxy</span>(<span class="hljs-string">\`http://<span class="hljs-subst">\${originServer}</span>/<span class="hljs-subst">\${c.req.param(<span class="hljs-string">&#x27;path&#x27;</span>)}</span>\`</span>, c.<span class="hljs-property">req</span>)
})

<span class="hljs-comment">// Strict RFC 9110 compliance (use only in trusted environments)</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/internal-proxy/:path&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">proxy</span>(<span class="hljs-string">\`http://<span class="hljs-subst">\${internalServer}</span>/<span class="hljs-subst">\${c.req.param(<span class="hljs-string">&#x27;path&#x27;</span>)}</span>\`</span>, {
    ...c.<span class="hljs-property">req</span>,
    <span class="hljs-attr">strictConnectionProcessing</span>: <span class="hljs-literal">true</span>,
  })
})
</code></pre>
<h3 id="proxyfetch"><code>ProxyFetch</code></h3>
<p>نوع <code>proxy()</code> معرّف كـ <code>ProxyFetch</code> وكما يلي</p>
<pre><code class="language-ts"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">ProxyRequestInit</span> <span class="hljs-keyword">extends</span> <span class="hljs-title class_">Omit</span>&lt;<span class="hljs-title class_">RequestInit</span>, &#x27;headers&#x27;&gt; {
  <span class="hljs-attr">raw</span>?: <span class="hljs-title class_">Request</span>
  <span class="hljs-attr">customFetch</span>?: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">request</span>: <span class="hljs-title class_">Request</span></span>) =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Response</span>&gt;
  <span class="hljs-attr">strictConnectionProcessing</span>?: <span class="hljs-built_in">boolean</span>
  <span class="hljs-attr">headers</span>?:
    | <span class="hljs-title class_">HeadersInit</span>
    | [<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span>][]
    | <span class="hljs-title class_">Record</span>&lt;<span class="hljs-title class_">RequestHeader</span>, <span class="hljs-built_in">string</span> | <span class="hljs-literal">undefined</span>&gt;
    | <span class="hljs-title class_">Record</span>&lt;<span class="hljs-built_in">string</span>, <span class="hljs-built_in">string</span> | <span class="hljs-literal">undefined</span>&gt;
}

<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ProxyFetch</span> {
  (
    <span class="hljs-attr">input</span>: <span class="hljs-built_in">string</span> | <span class="hljs-variable constant_">URL</span> | <span class="hljs-title class_">Request</span>,
    <span class="hljs-attr">init</span>?: <span class="hljs-title class_">ProxyRequestInit</span>
  ): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-title class_">Response</span>&gt;
}
</code></pre>
`,c={book:s,chapter:n,chapterTitle:a,slug:p,title:l,headings:t,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,t as headings,e as html,p as slug,l as title};
