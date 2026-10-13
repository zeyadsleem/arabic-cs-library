const s="hono",n="middleware-builtin",a="الوسائط المدمجة",l="combine",p="دمج البرمجيات الوسيطة",e=[{depth:2,id:"import",text:"Import"},{depth:2,id:"الاستخدام",text:"الاستخدام"},{depth:3,id:"بعض",text:"بعض"},{depth:3,id:"every",text:"every"},{depth:3,id:"except",text:"except"}],t=`<p>يجمع وسيط Combine الدوال الوسيطة المتعددة في وسيط واحد. يوفر ثلاث دوال:</p>
<ul>
<li><code>some</code> - يشغّل واحدة فقط من البرمجيات الوسيطة المُعطاة.</li>
<li><code>every</code> - تشغيل كل الوسيطات المعطاة.</li>
<li><code>except</code> - يشغِّل كل الوسيطات (middleware) المعطاة فقط إذا لم يتحقق شرط.</li>
</ul>
<h2 id="import">Import</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { some, every, except } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/combine&#x27;</span>
</code></pre>
<h2 id="الاستخدام">الاستخدام</h2>
<p>فيما يلي مثال على قواعد معقدة للتحكم في الوصول باستخدام وسيط الدمج (Combine Middleware).</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { bearerAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/bearer-auth&#x27;</span>
<span class="hljs-keyword">import</span> { getConnInfo } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/cloudflare-workers&#x27;</span>
<span class="hljs-keyword">import</span> { every, some } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/combine&#x27;</span>
<span class="hljs-keyword">import</span> { ipRestriction } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/ip-restriction&#x27;</span>
<span class="hljs-keyword">import</span> { rateLimit } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@/my-rate-limit&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">use</span>(
  <span class="hljs-string">&#x27;*&#x27;</span>,
  <span class="hljs-title function_">some</span>(
    <span class="hljs-title function_">every</span>(
      <span class="hljs-title function_">ipRestriction</span>(getConnInfo, { <span class="hljs-attr">allowList</span>: [<span class="hljs-string">&#x27;192.168.0.2&#x27;</span>] }),
      <span class="hljs-title function_">bearerAuth</span>({ token })
    ),
    <span class="hljs-comment">// If both conditions are met, rateLimit will not execute.</span>
    <span class="hljs-title function_">rateLimit</span>()
  )
)

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Hello Hono!&#x27;</span>))
</code></pre>
<h3 id="بعض">بعض</h3>
<p>يشغّل أول وسيط يُرجع true. تُطبق الوسائط بالترتيب، وإذا نجح أي وسيط، فلن تعمل الوسائط اللاحقة.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { some } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/combine&#x27;</span>
<span class="hljs-keyword">import</span> { bearerAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/bearer-auth&#x27;</span>
<span class="hljs-keyword">import</span> { myRateLimit } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@/rate-limit&#x27;</span>

<span class="hljs-comment">// If client has a valid token, skip rate limiting.</span>
<span class="hljs-comment">// Otherwise, apply rate limiting.</span>
app.<span class="hljs-title function_">use</span>(
  <span class="hljs-string">&#x27;/api/*&#x27;</span>,
  <span class="hljs-title function_">some</span>(<span class="hljs-title function_">bearerAuth</span>({ token }), <span class="hljs-title function_">myRateLimit</span>({ <span class="hljs-attr">limit</span>: <span class="hljs-number">100</span> }))
)
</code></pre>
<h3 id="every">every</h3>
<p>يشغّل جميع الوسائط ويتوقف إذا فشل أي منها. تُطبق الوسائط بالترتيب، وإذا رمى أي وسيط خطأً، فلن تعمل الوسائط اللاحقة.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { some, every } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/combine&#x27;</span>
<span class="hljs-keyword">import</span> { bearerAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/bearer-auth&#x27;</span>
<span class="hljs-keyword">import</span> { myCheckLocalNetwork } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@/check-local-network&#x27;</span>
<span class="hljs-keyword">import</span> { myRateLimit } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@/rate-limit&#x27;</span>

<span class="hljs-comment">// If client is in local network, skip authentication and rate limiting.</span>
<span class="hljs-comment">// Otherwise, apply authentication and rate limiting.</span>
app.<span class="hljs-title function_">use</span>(
  <span class="hljs-string">&#x27;/api/*&#x27;</span>,
  <span class="hljs-title function_">some</span>(
    <span class="hljs-title function_">myCheckLocalNetwork</span>(),
    <span class="hljs-title function_">every</span>(<span class="hljs-title function_">bearerAuth</span>({ token }), <span class="hljs-title function_">myRateLimit</span>({ <span class="hljs-attr">limit</span>: <span class="hljs-number">100</span> }))
  )
)
</code></pre>
<h3 id="except">except</h3>
<p>يشغّل جميع الوسائط إلا عند تحقق الشرط. يمكنك تمرير سلسلة (string) أو دالة كشرط. إذا كانت هناك حاجة لمطابقة أهداف متعددة، مررها كمصفوفة (array).</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { except } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/combine&#x27;</span>
<span class="hljs-keyword">import</span> { bearerAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/bearer-auth&#x27;</span>

<span class="hljs-comment">// If client is accessing public API, skip authentication.</span>
<span class="hljs-comment">// Otherwise, require a valid token.</span>
app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&#x27;/api/*&#x27;</span>, <span class="hljs-title function_">except</span>(<span class="hljs-string">&#x27;/api/public/*&#x27;</span>, <span class="hljs-title function_">bearerAuth</span>({ token })))
</code></pre>
`,o={book:s,chapter:n,chapterTitle:a,slug:l,title:p,headings:e,html:t};export{s as book,n as chapter,a as chapterTitle,o as default,e as headings,t as html,l as slug,p as title};
