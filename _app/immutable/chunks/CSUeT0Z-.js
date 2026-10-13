const s="hono",n="helpers",a="المساعدات",t="streaming",e="مُساعد البث",l=[{depth:2,id:"import",text:"Import"},{depth:2,id:"stream",text:"stream()"},{depth:2,id:"streamtext",text:"streamText()"},{depth:2,id:"streamsse",text:"streamSSE()"},{depth:2,id:"معالجة-الأخطاء",text:"معالجة الأخطاء"}],p=`<p>يوفّر Streaming Helper طرقاً لبث الاستجابات (streaming).</p>
<h2 id="import">Import</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { stream, streamText, streamSSE } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/streaming&#x27;</span>
</code></pre>
<h2 id="stream"><code>stream()</code></h2>
<p>يُعيد استجابة تدفّق بسيطة كـ <code>Response</code> كائن.</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/stream&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">stream</span>(c, <span class="hljs-title function_">async</span> (stream) =&gt; {
    <span class="hljs-comment">// Write a process to be executed when aborted.</span>
    stream.<span class="hljs-title function_">onAbort</span>(<span class="hljs-function">() =&gt;</span> {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Aborted!&#x27;</span>)
    })
    <span class="hljs-comment">// Write a Uint8Array.</span>
    <span class="hljs-keyword">await</span> stream.<span class="hljs-title function_">write</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Uint8Array</span>([<span class="hljs-number">0x48</span>, <span class="hljs-number">0x65</span>, <span class="hljs-number">0x6c</span>, <span class="hljs-number">0x6c</span>, <span class="hljs-number">0x6f</span>]))
    <span class="hljs-comment">// Pipe a readable stream.</span>
    <span class="hljs-keyword">await</span> stream.<span class="hljs-title function_">pipe</span>(anotherReadableStream)
  })
})
</code></pre>
<h2 id="streamtext"><code>streamText()</code></h2>
<p>يُرجع استجابة متدفقة (streaming) بـ <code>Content-Type: text/plain</code>, <code>Transfer-Encoding: chunked</code>، و <code>X-Content-Type-Options: nosniff</code> الترويسات.</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/streamText&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">streamText</span>(c, <span class="hljs-title function_">async</span> (stream) =&gt; {
    <span class="hljs-comment">// Write a text with a new line (&#x27;\\n&#x27;).</span>
    <span class="hljs-keyword">await</span> stream.<span class="hljs-title function_">writeln</span>(<span class="hljs-string">&#x27;Hello&#x27;</span>)
    <span class="hljs-comment">// Wait 1 second.</span>
    <span class="hljs-keyword">await</span> stream.<span class="hljs-title function_">sleep</span>(<span class="hljs-number">1000</span>)
    <span class="hljs-comment">// Write a text without a new line.</span>
    <span class="hljs-keyword">await</span> stream.<span class="hljs-title function_">write</span>(<span class="hljs-string">\`Hono!\`</span>)
  })
})
</code></pre>
<p>إذا كنت تطور تطبيقًا لـ Cloudflare Workers، فقد لا يعمل البث (streaming) جيدًا على Wrangler. إذا كان الأمر كذلك، أضف <code>Identity</code> لـ <code>Content-Encoding</code> الترويسة.</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/streamText&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  c.<span class="hljs-title function_">header</span>(<span class="hljs-string">&#x27;Content-Encoding&#x27;</span>, <span class="hljs-string">&#x27;Identity&#x27;</span>)
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">streamText</span>(c, <span class="hljs-title function_">async</span> (stream) =&gt; {
    <span class="hljs-comment">// ...</span>
  })
})
</code></pre>
<h2 id="streamsse"><code>streamSSE()</code></h2>
<p>يتيح لك بث أحداث الخادم المُرسَلة (Server-Sent Events - SSE) بسلاسة.</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-keyword">let</span> id = <span class="hljs-number">0</span>

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/sse&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">streamSSE</span>(c, <span class="hljs-title function_">async</span> (stream) =&gt; {
    <span class="hljs-keyword">while</span> (!stream.<span class="hljs-property">aborted</span>) {
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
<h2 id="معالجة-الأخطاء">معالجة الأخطاء</h2>
<p>الوسيطة الثالثة لمساعد البث (streaming helper) هي معالج الأخطاء (error handler).
هذه الوسيطة اختيارية؛ إذا لم تحددها، فسيتم إخراج الخطأ كخطأ في وحدة التحكم (console).</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/stream&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">stream</span>(
    c,
    <span class="hljs-title function_">async</span> (stream) =&gt; {
      <span class="hljs-comment">// Write a process to be executed when aborted.</span>
      stream.<span class="hljs-title function_">onAbort</span>(<span class="hljs-function">() =&gt;</span> {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Aborted!&#x27;</span>)
      })
      <span class="hljs-comment">// Write a Uint8Array.</span>
      <span class="hljs-keyword">await</span> stream.<span class="hljs-title function_">write</span>(
        <span class="hljs-keyword">new</span> <span class="hljs-title class_">Uint8Array</span>([<span class="hljs-number">0x48</span>, <span class="hljs-number">0x65</span>, <span class="hljs-number">0x6c</span>, <span class="hljs-number">0x6c</span>, <span class="hljs-number">0x6f</span>])
      )
      <span class="hljs-comment">// Pipe a readable stream.</span>
      <span class="hljs-keyword">await</span> stream.<span class="hljs-title function_">pipe</span>(anotherReadableStream)
    },
    <span class="hljs-function">(<span class="hljs-params">err, stream</span>) =&gt;</span> {
      stream.<span class="hljs-title function_">writeln</span>(<span class="hljs-string">&#x27;An error occurred!&#x27;</span>)
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(err)
    }
  )
})
</code></pre>
<p>سيتم إغلاق التدفق (stream) تلقائيًا بعد تنفيذ دوال الاستدعاء (callbacks).</p>
<p>إذا ألقت دالة الاستدعاء (callback) الخاصة بمساعد البث (streaming helper) خطأً، فإن <code>onError</code> حدث Hono لن يُطلَق.</p>
<p><code>onError</code> هو خطاف (hook) للتعامل مع الأخطاء قبل إرسال الاستجابة وإعادة كتابتها. ومع ذلك، عند تنفيذ دالة الاستدعاء، يكون الدفق قد بدأ بالفعل، لذا لا يمكن إعادة كتابته.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:e,headings:l,html:p};export{s as book,n as chapter,a as chapterTitle,c as default,l as headings,p as html,t as slug,e as title};
