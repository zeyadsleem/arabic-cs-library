const s="hono",n="middleware-builtin",a="الوسائط المدمجة",l="timeout",t="برمجية وسيطة للمهلة",p=[{depth:2,id:"import",text:"Import"},{depth:2,id:"الاستخدام",text:"الاستخدام"},{depth:2,id:"ملاحظات",text:"ملاحظات"},{depth:2,id:"تعارضات-البرمجيات-الوسيطة",text:"تعارضات البرمجيات الوسيطة"}],e=`<p>يتيح لك وسيط المهلة (Timeout Middleware) إدارة مهلات الطلبات في تطبيقك بسهولة. يسمح لك بتعيين مدة قصوى للطلبات وتحديد استجابات خطأ مخصصة اختياريًا إذا تم تجاوز المهلة المحددة.</p>
<h2 id="import">Import</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { timeout } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/timeout&#x27;</span>
</code></pre>
<h2 id="الاستخدام">الاستخدام</h2>
<p>إليك كيفية استخدام وسيط المهلة (Timeout Middleware) مع كل من الإعدادات الافتراضية والمخصصة:</p>
<p>الإعدادات الافتراضية:</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

<span class="hljs-comment">// Applying a 5-second timeout</span>
app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&#x27;/api&#x27;</span>, <span class="hljs-title function_">timeout</span>(<span class="hljs-number">5000</span>))

<span class="hljs-comment">// Handling a route</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api/data&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  <span class="hljs-comment">// Your route handler logic</span>
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">data</span>: <span class="hljs-string">&#x27;Your data here&#x27;</span> })
})
</code></pre>
<p>إعدادات مخصصة:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">HTTPException</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/http-exception&#x27;</span>

<span class="hljs-comment">// Custom exception factory function</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">customTimeoutException</span> = (<span class="hljs-params">context</span>) =&gt;
  <span class="hljs-keyword">new</span> <span class="hljs-title class_">HTTPException</span>(<span class="hljs-number">408</span>, {
    <span class="hljs-attr">message</span>: <span class="hljs-string">\`Request timeout after waiting <span class="hljs-subst">\${context.req.headers.get(
      <span class="hljs-string">&#x27;Duration&#x27;</span>
    )}</span> seconds. Please try again later.\`</span>,
  })

<span class="hljs-comment">// for Static Exception Message</span>
<span class="hljs-comment">// const customTimeoutException = new HTTPException(408, {</span>
<span class="hljs-comment">//   message: &#x27;Operation timed out. Please try again later.&#x27;</span>
<span class="hljs-comment">// });</span>

<span class="hljs-comment">// Applying a 1-minute timeout with a custom exception</span>
app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&#x27;/api/long-process&#x27;</span>, <span class="hljs-title function_">timeout</span>(<span class="hljs-number">60000</span>, customTimeoutException))

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api/long-process&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  <span class="hljs-comment">// Simulate a long process</span>
  <span class="hljs-keyword">await</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Promise</span>(<span class="hljs-function">(<span class="hljs-params">resolve</span>) =&gt;</span> <span class="hljs-built_in">setTimeout</span>(resolve, <span class="hljs-number">61000</span>))
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">data</span>: <span class="hljs-string">&#x27;This usually takes longer&#x27;</span> })
})
</code></pre>
<h2 id="ملاحظات">ملاحظات</h2>
<ul>
<li>
<p>يمكن تحديد مدة المهلة (timeout) بالميلي ثانية. سيرفض الوسيط الوعد (promise) تلقائيًا وقد يرمي خطأً إذا تم تجاوز المدة المحددة.</p>
</li>
<li>
<p>لا يمكن استخدام وسيطة المهلة (timeout middleware) مع البث (stream)؛ لذا، استخدم <code>stream.close</code> و <code>setTimeout</code> معًا.</p>
</li>
</ul>
<pre><code class="language-ts">app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/sse&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  <span class="hljs-keyword">let</span> id = <span class="hljs-number">0</span>
  <span class="hljs-keyword">let</span> running = <span class="hljs-literal">true</span>
  <span class="hljs-keyword">let</span> <span class="hljs-attr">timer</span>: <span class="hljs-built_in">number</span> | <span class="hljs-literal">undefined</span>

  <span class="hljs-keyword">return</span> <span class="hljs-title function_">streamSSE</span>(c, <span class="hljs-title function_">async</span> (stream) =&gt; {
    timer = <span class="hljs-built_in">setTimeout</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Stream timeout reached, closing stream&#x27;</span>)
      stream.<span class="hljs-title function_">close</span>()
    }, <span class="hljs-number">3000</span>) <span class="hljs-keyword">as</span> <span class="hljs-built_in">unknown</span> <span class="hljs-keyword">as</span> <span class="hljs-built_in">number</span>

    stream.<span class="hljs-title function_">onAbort</span>(<span class="hljs-title function_">async</span> () =&gt; {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Client closed connection&#x27;</span>)
      running = <span class="hljs-literal">false</span>
      <span class="hljs-built_in">clearTimeout</span>(timer)
    })

    <span class="hljs-keyword">while</span> (running) {
      <span class="hljs-keyword">const</span> message = <span class="hljs-string">\`It is <span class="hljs-subst">\${<span class="hljs-keyword">new</span> <span class="hljs-built_in">Date</span>().toISOString()}</span>\`</span>
      <span class="hljs-keyword">await</span> stream.<span class="hljs-title function_">writeSSE</span>({
        <span class="hljs-attr">data</span>: message,
        <span class="hljs-attr">event</span>: <span class="hljs-string">&#x27;time-update&#x27;</span>,
        <span class="hljs-attr">id</span>: <span class="hljs-title class_">String</span>(id++),
      })
      <span class="hljs-keyword">await</span> stream.<span class="hljs-title function_">sleep</span>(<span class="hljs-number">1000</span>)
    }
  })
})
</code></pre>
<h2 id="تعارضات-البرمجيات-الوسيطة">تعارضات البرمجيات الوسيطة</h2>
<p>كن حذرًا بشأن ترتيب الوسائط، خاصةً عند استخدام وسائط معالجة الأخطاء أو الوسائط الأخرى المرتبطة بالتوقيت، لأنها قد تؤثر على سلوك وسيط المهلة (timeout) هذا.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:l,title:t,headings:p,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,e as html,l as slug,t as title};
