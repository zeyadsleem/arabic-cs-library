const s="hono",n="helpers",a="المساعدات",l="websocket",p="مُساعد WebSocket",e=[{depth:2,id:"import",text:"Import"},{depth:2,id:"upgradewebsocket",text:"upgradeWebSocket()"},{depth:2,id:"rpc-mode",text:"RPC-mode"},{depth:2,id:"أمثلة",text:"أمثلة"},{depth:3,id:"الخادم-والعميل",text:"الخادم والعميل"},{depth:3,id:"bun-مع-jsx",text:"Bun مع JSX"},{depth:3,id:"nodejs",text:"Node.js"}],t=`<p>مساعد WebSocket (WebSocket Helper) هو أداة مساعدة لـ WebSockets من جانب الخادم في تطبيقات Hono.
تتوفر حاليًا محولات (adapters) لـ Cloudflare Workers / Pages و Deno و Bun و Node.js.</p>
<h2 id="import">Import</h2>
<p>محوّل كل بيئة تشغيل حزمة منفصلة (<code>@hono/cloudflare-workers</code>, <code>@hono/deno</code>, <code>@hono/bun</code>، ...). ثبّت الواحد المناسب لبيئة تشغيلك.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { upgradeWebSocket } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/cloudflare-workers&#x27;</span>
</code></pre>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { upgradeWebSocket } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/deno&#x27;</span>
</code></pre>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { upgradeWebSocket, websocket } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/bun&#x27;</span>

<span class="hljs-comment">// ...</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">fetch</span>: app.<span class="hljs-property">fetch</span>,
  websocket,
}
</code></pre>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { serve, upgradeWebSocket } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/node-server&#x27;</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">WebSocketServer</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;ws&#x27;</span>
</code></pre>
<p>على Node.js، دعم WebSocket مدمج في <code>@hono/node-server</code>. لتفعيله، ثبّت <code>ws</code> وإذا كنت تستخدم TypeScript، <code>@types/ws</code>. ثم أنشئ <code>WebSocketServer</code> مع <code>{ noServer: true }</code> وتمريره إلى <code>serve()</code> عبر <code>websocket</code> خيار.</p>
<p><code>@hono/node-ws</code> مهمَل.</p>
<h2 id="upgradewebsocket"><code>upgradeWebSocket()</code></h2>
<p><code>upgradeWebSocket()</code> يُعيد معالجًا لمعالجة WebSocket.</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/ws&#x27;</span>,
  <span class="hljs-title function_">upgradeWebSocket</span>(<span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-title function_">onMessage</span>(<span class="hljs-params">event, ws</span>) {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Message from client: <span class="hljs-subst">\${event.data}</span>\`</span>)
        ws.<span class="hljs-title function_">send</span>(<span class="hljs-string">&#x27;Hello from server!&#x27;</span>)
      },
      <span class="hljs-attr">onClose</span>: <span class="hljs-function">() =&gt;</span> {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Connection closed&#x27;</span>)
      },
    }
  })
)
</code></pre>
<p>الأحداث المتاحة:</p>
<ul>
<li><code>onOpen</code> - حاليًا، لا يدعمه Cloudflare Workers.</li>
<li><code>onMessage</code></li>
<li><code>onClose</code></li>
<li><code>onError</code></li>
</ul>
<p>إذا استخدمت وسيطًا يعدل الترويسات (مثل تطبيق CORS) على مسار يستخدم WebSocket Helper، فقد تواجه خطأً يفيد بأنه لا يمكنك تعديل الترويسات غير القابلة للتغيير (immutable headers). هذا لأن <code>upgradeWebSocket()</code> يغيّر أيضًا الترويسات داخليًا.</p>
<p>لذلك، يرجى توخي الحذر إذا كنت تستخدم أداة WebSocket المساعدة والوسائط في الوقت نفسه.</p>
<h2 id="rpc-mode">RPC-mode</h2>
<p>المعالجات (Handlers) المعرَّفة باستخدام WebSocket Helper تدعم وضع RPC.</p>
<pre><code class="language-ts"><span class="hljs-comment">// server.ts</span>
<span class="hljs-keyword">const</span> wsApp = app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/ws&#x27;</span>,
  <span class="hljs-title function_">upgradeWebSocket</span>(<span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
    <span class="hljs-comment">//...</span>
  })
)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">WebSocketApp</span> = <span class="hljs-keyword">typeof</span> wsApp

<span class="hljs-comment">// client.ts</span>
<span class="hljs-keyword">const</span> client = hc&lt;<span class="hljs-title class_">WebSocketApp</span>&gt;(<span class="hljs-string">&#x27;http://localhost:8787&#x27;</span>)
<span class="hljs-keyword">const</span> socket = client.<span class="hljs-property">ws</span>.$ws() <span class="hljs-comment">// A WebSocket object for a client</span>
</code></pre>
<h2 id="أمثلة">أمثلة</h2>
<p>اطّلع على الأمثلة التي تستخدم WebSocket Helper.</p>
<h3 id="الخادم-والعميل">الخادم والعميل</h3>
<pre><code class="language-ts"><span class="hljs-comment">// server.ts</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { upgradeWebSocket } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/cloudflare-workers&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>().<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/ws&#x27;</span>,
  <span class="hljs-title function_">upgradeWebSocket</span>(<span class="hljs-function">() =&gt;</span> {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">onMessage</span>: <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(event.<span class="hljs-property">data</span>)
      },
    }
  })
)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> app
</code></pre>
<pre><code class="language-ts"><span class="hljs-comment">// client.ts</span>
<span class="hljs-keyword">import</span> { hc } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/client&#x27;</span>
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> app <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./server&#x27;</span>

<span class="hljs-keyword">const</span> client = hc&lt;<span class="hljs-keyword">typeof</span> app&gt;(<span class="hljs-string">&#x27;http://localhost:8787&#x27;</span>)
<span class="hljs-keyword">const</span> ws = client.<span class="hljs-property">ws</span>.$ws(<span class="hljs-number">0</span>)

ws.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;open&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-built_in">setInterval</span>(<span class="hljs-function">() =&gt;</span> {
    ws.<span class="hljs-title function_">send</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>().<span class="hljs-title function_">toString</span>())
  }, <span class="hljs-number">1000</span>)
})
</code></pre>
<h3 id="bun-مع-jsx">Bun مع JSX</h3>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { upgradeWebSocket, websocket } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/bun&#x27;</span>
<span class="hljs-keyword">import</span> { html } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/html&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">html</span>(
    
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&#x27;UTF-8&#x27;</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span></span>
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">div</span> <span class="hljs-attr">id</span>=<span class="hljs-string">&#x27;now-time&#x27;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">div</span>&gt;</span>
        {html\`
          <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
            <span class="hljs-keyword">const</span> ws = <span class="hljs-keyword">new</span> <span class="hljs-title class_">WebSocket</span>(<span class="hljs-string">&#x27;ws://localhost:3000/ws&#x27;</span>)
            <span class="hljs-keyword">const</span> $nowTime = <span class="hljs-variable language_">document</span>.<span class="hljs-title function_">getElementById</span>(<span class="hljs-string">&#x27;now-time&#x27;</span>)
            ws.<span class="hljs-property">onmessage</span> = <span class="hljs-function">(<span class="hljs-params">event</span>) =&gt;</span> {
              $nowTime.<span class="hljs-property">textContent</span> = event.<span class="hljs-property">data</span>
            }
          </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        \`}
      <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></span>
    
  )
})

<span class="hljs-keyword">const</span> ws = app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/ws&#x27;</span>,
  <span class="hljs-title function_">upgradeWebSocket</span>(<span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
    <span class="hljs-keyword">let</span> intervalId
    <span class="hljs-keyword">return</span> {
      <span class="hljs-title function_">onOpen</span>(<span class="hljs-params">_event, ws</span>) {
        intervalId = <span class="hljs-built_in">setInterval</span>(<span class="hljs-function">() =&gt;</span> {
          ws.<span class="hljs-title function_">send</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>().<span class="hljs-title function_">toString</span>())
        }, <span class="hljs-number">200</span>)
      },
      <span class="hljs-title function_">onClose</span>(<span class="hljs-params"></span>) {
        <span class="hljs-built_in">clearInterval</span>(intervalId)
      },
    }
  })
)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">fetch</span>: app.<span class="hljs-property">fetch</span>,
  websocket,
}
</code></pre>
<h3 id="nodejs">Node.js</h3>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { serve, upgradeWebSocket } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/node-server&#x27;</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">WebSocketServer</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;ws&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/ws&#x27;</span>,
  <span class="hljs-title function_">upgradeWebSocket</span>(<span class="hljs-function">() =&gt;</span> ({
    <span class="hljs-title function_">onMessage</span>(<span class="hljs-params">event, ws</span>) {
      ws.<span class="hljs-title function_">send</span>(event.<span class="hljs-property">data</span>)
    },
  }))
)

<span class="hljs-keyword">const</span> wss = <span class="hljs-keyword">new</span> <span class="hljs-title class_">WebSocketServer</span>({ <span class="hljs-attr">noServer</span>: <span class="hljs-literal">true</span> })

<span class="hljs-title function_">serve</span>({
  <span class="hljs-attr">fetch</span>: app.<span class="hljs-property">fetch</span>,
  <span class="hljs-attr">websocket</span>: { <span class="hljs-attr">server</span>: wss },
})
</code></pre>
`,c={book:s,chapter:n,chapterTitle:a,slug:l,title:p,headings:e,html:t};export{s as book,n as chapter,a as chapterTitle,c as default,e as headings,t as html,l as slug,p as title};
