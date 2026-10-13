const s="hono",n="getting-started",a="مقدمات",p="nodejs",e="Node.js",l=[{depth:2,id:"1-الإعداد",text:"1. الإعداد"},{depth:2,id:"2-مرحبا-بالعالم",text:"2. مرحبًا بالعالم"},{depth:2,id:"3-تشغيل",text:"3. تشغيل"},{depth:2,id:"تغيير-رقم-المنفذ",text:"تغيير رقم المنفذ"},{depth:2,id:"websocket",text:"WebSocket"},{depth:2,id:"الوصول-إلى-واجهات-nodejs-الخام",text:"الوصول إلى واجهات Node.js الخام"},{depth:2,id:"تقديم-الملفات-الثابتة",text:"تقديم الملفات الثابتة"},{depth:3,id:"rewriterequestpath",text:"rewriteRequestPath"},{depth:2,id:"http2",text:"http2"},{depth:3,id:"http2-غير-المشفر",text:"http2 غير المشفّر"},{depth:3,id:"http2-المشفر",text:"http2 المشفّر"},{depth:2,id:"البناء-والنشر",text:"البناء والنشر"},{depth:3,id:"dockerfile",text:"Dockerfile"}],t=`<p><a href="https://nodejs.org/">Node.js</a> هي بيئة تشغيل (runtime) JavaScript مفتوحة المصدر ومتعددة المنصات.</p>
<p>لم يُصمَّم Hono لـ Node.js في البداية، ولكن مع <a href="https://github.com/honojs/node-server">مُهايئ Node.js</a>، فيمكنه العمل على Node.js أيضًا.</p>
<p>يعمل على إصدارات Node.js الأكبر من 18.x. إصدارات Node.js المطلوبة تحديدًا هي كما يلي:</p>
<ul>
<li>18.x =&gt; 18.14.1+</li>
<li>19.x =&gt; 19.7.0+</li>
<li>20.x =&gt; 20.0.0+</li>
</ul>
<p>بشكل أساسي، يمكنك ببساطة استخدام أحدث إصدار من كل إصدار رئيسي (major release).</p>
<h2 id="1-الإعداد">1. الإعداد</h2>
<p>يتوفر قالب بداية لـ Node.js.
ابدأ مشروعك باستخدام الأمر &quot;create-hono&quot;.
اختر <code>nodejs</code> قالب لهذا المثال.</p>
<pre><code class="language-sh">npm create hono@latest my-app
</code></pre>
<pre><code class="language-sh">yarn create hono my-app
</code></pre>
<pre><code class="language-sh">pnpm create hono my-app
</code></pre>
<pre><code class="language-sh">bun create hono@latest my-app
</code></pre>
<pre><code class="language-sh">deno init --npm hono my-app
</code></pre>
<p>انتقل إلى <code>my-app</code> وثبّت التبعيات.</p>
<pre><code class="language-sh"><span class="hljs-built_in">cd</span> my-app
npm i
</code></pre>
<pre><code class="language-sh"><span class="hljs-built_in">cd</span> my-app
yarn
</code></pre>
<pre><code class="language-sh"><span class="hljs-built_in">cd</span> my-app
pnpm i
</code></pre>
<pre><code class="language-sh"><span class="hljs-built_in">cd</span> my-app
bun i
</code></pre>
<h2 id="2-مرحبا-بالعالم">2. مرحبًا بالعالم</h2>
<p>تعديل <code>src/index.ts</code>:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { serve } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/node-server&#x27;</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Hello Node.js!&#x27;</span>))

<span class="hljs-title function_">serve</span>(app)
</code></pre>
<p>إذا أردت إيقاف تشغيل الخادم بأناقة (gracefully)، فاكتبه على النحو التالي:</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> server = <span class="hljs-title function_">serve</span>(app)

<span class="hljs-comment">// graceful shutdown</span>
process.<span class="hljs-title function_">on</span>(<span class="hljs-string">&#x27;SIGINT&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  server.<span class="hljs-title function_">close</span>()
  process.<span class="hljs-title function_">exit</span>(<span class="hljs-number">0</span>)
})
process.<span class="hljs-title function_">on</span>(<span class="hljs-string">&#x27;SIGTERM&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  server.<span class="hljs-title function_">close</span>(<span class="hljs-function">(<span class="hljs-params">err</span>) =&gt;</span> {
    <span class="hljs-keyword">if</span> (err) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(err)
      process.<span class="hljs-title function_">exit</span>(<span class="hljs-number">1</span>)
    }
    process.<span class="hljs-title function_">exit</span>(<span class="hljs-number">0</span>)
  })
})
</code></pre>
<p>على <code>Node.js</code>، <code>serve()</code> يلفّ <code>node:http</code> الوحدة ويُرجع مثيل الخادم الأساسي، لذا فإن إغلاقه يعود إليك. يقدم Bun و Deno معالجات Fetch أصليًا (natively) ويديران الخادم بأنفسهما، ولهذا لا تتضمن أدلتهما هذه الخطوة.</p>
<h2 id="3-تشغيل">3. تشغيل</h2>
<p>شغّل خادم التطوير محليًا. ثم، ادخل إلى <code>http://localhost:3000</code> في متصفح الويب الخاص بك.</p>
<pre><code class="language-sh">npm run dev
</code></pre>
<pre><code class="language-sh">yarn dev
</code></pre>
<pre><code class="language-sh">pnpm dev
</code></pre>
<h2 id="تغيير-رقم-المنفذ">تغيير رقم المنفذ</h2>
<p>يمكنك تحديد رقم المنفذ باستخدام <code>port</code> خيار.</p>
<pre><code class="language-ts"><span class="hljs-title function_">serve</span>({
  <span class="hljs-attr">fetch</span>: app.<span class="hljs-property">fetch</span>,
  <span class="hljs-attr">port</span>: <span class="hljs-number">8787</span>,
})
</code></pre>
<h2 id="websocket">WebSocket</h2>
<p>دعم WebSocket مُدمج في <code>@hono/node-server</code>. ثبِّت <code>ws</code> وإذا كنت تستخدم TypeScript، <code>@types/ws</code>. ثم أنشئ <code>WebSocketServer</code> مع <code>{ noServer: true }</code> وتمريره إلى <code>serve()</code> مع <code>websocket</code> خيار.</p>
<p><code>@hono/node-ws</code> مهمَل.</p>
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
<h2 id="الوصول-إلى-واجهات-nodejs-الخام">الوصول إلى واجهات Node.js الخام</h2>
<p>يمكنك الوصول إلى واجهات Node.js من <code>c.env.incoming</code> و <code>c.env.outgoing</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { serve, <span class="hljs-keyword">type</span> <span class="hljs-title class_">HttpBindings</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/node-server&#x27;</span>
<span class="hljs-comment">// or \`Http2Bindings\` if you use HTTP2</span>

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Bindings</span> = <span class="hljs-title class_">HttpBindings</span> &amp; {
  <span class="hljs-comment">/* ... */</span>
}

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>&lt;{ <span class="hljs-title class_">Bindings</span>: <span class="hljs-title class_">Bindings</span> }&gt;()

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({
    <span class="hljs-attr">remoteAddress</span>: c.<span class="hljs-property">env</span>.<span class="hljs-property">incoming</span>.<span class="hljs-property">socket</span>.<span class="hljs-property">remoteAddress</span>,
  })
})

<span class="hljs-title function_">serve</span>(app)
</code></pre>
<h2 id="تقديم-الملفات-الثابتة">تقديم الملفات الثابتة</h2>
<p>يمكنك استخدام <code>serveStatic</code> لتقديم الملفات الثابتة من نظام الملفات المحلي. على سبيل المثال، افترض أن بنية الدليل هي كما يلي:</p>
<pre><code class="language-sh">./
├── favicon.ico
├── index.ts
└── static
    ├── hello.txt
    └── image.png
</code></pre>
<p>إذا كان الطلب إلى المسار <code>/static/*</code> يأتي وتريد إرجاع ملف ضمن <code>./static</code>، يمكنك كتابة ما يلي:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { serveStatic } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/node-server/serve-static&#x27;</span>

app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&#x27;/static/*&#x27;</span>, <span class="hljs-title function_">serveStatic</span>({ <span class="hljs-attr">root</span>: <span class="hljs-string">&#x27;./&#x27;</span> }))
</code></pre>
<p>الـ <code>root</code> يحلّ الخيار المسارات بشكل نسبي إلى دليل العمل الحالي (<code>process.cwd()</code>). هذا يعني أن السلوك يعتمد على <strong>المكان الذي تشغّل منه عملية Node.js الخاصة بك</strong>، وليس على مكان ملف المصدر. إذا بدأت خادمك من دليل مختلف، فقد يفشل تحليل الملفات (file resolution).</p>
<p>لحل موثوق للمسارات يشير دائمًا إلى نفس الدليل الذي يوجد به ملف المصدر، استخدم <code>import.meta.url</code>:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { fileURLToPath } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;node:url&#x27;</span>
<span class="hljs-keyword">import</span> { serveStatic } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/node-server/serve-static&#x27;</span>

app.<span class="hljs-title function_">use</span>(
  <span class="hljs-string">&#x27;/static/*&#x27;</span>,
  <span class="hljs-title function_">serveStatic</span>({ <span class="hljs-attr">root</span>: <span class="hljs-title function_">fileURLToPath</span>(<span class="hljs-keyword">new</span> <span class="hljs-title function_">URL</span>(<span class="hljs-string">&#x27;./&#x27;</span>, <span class="hljs-keyword">import</span>.<span class="hljs-property">meta</span>.<span class="hljs-property">url</span>)) })
)
</code></pre>
<p>استخدم <code>path</code> خيار لتقديم <code>favicon.ico</code> في جذر الدليل:</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&#x27;/favicon.ico&#x27;</span>, <span class="hljs-title function_">serveStatic</span>({ <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;./favicon.ico&#x27;</span> }))
</code></pre>
<p>إذا كان الطلب إلى المسار <code>/hello.txt</code> أو <code>/image.png</code> يأتي وتريد إرجاع ملف باسم <code>./static/hello.txt</code> أو <code>./static/image.png</code>، يمكنك استخدام ما يلي:</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&#x27;*&#x27;</span>, <span class="hljs-title function_">serveStatic</span>({ <span class="hljs-attr">root</span>: <span class="hljs-string">&#x27;./static&#x27;</span> }))
</code></pre>
<h3 id="rewriterequestpath"><code>rewriteRequestPath</code></h3>
<p>إذا كنت تريد تعيين <code>http://localhost:3000/static/*</code> إلى <code>./statics</code>، يمكنك استخدام <code>rewriteRequestPath</code> option:</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;/static/*&#x27;</span>,
  <span class="hljs-title function_">serveStatic</span>({
    <span class="hljs-attr">root</span>: <span class="hljs-string">&#x27;./&#x27;</span>,
    <span class="hljs-attr">rewriteRequestPath</span>: <span class="hljs-function">(<span class="hljs-params">path</span>) =&gt;</span>
      path.<span class="hljs-title function_">replace</span>(<span class="hljs-regexp">/^\\/static/</span>, <span class="hljs-string">&#x27;/statics&#x27;</span>),
  })
)
</code></pre>
<h2 id="http2">http2</h2>
<p>يمكنك تشغيل hono على <a href="https://nodejs.org/api/http2.html">خادم http2 في Node.js</a>.</p>
<h3 id="http2-غير-المشفر">http2 غير المشفّر</h3>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { createServer } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;node:http2&#x27;</span>

<span class="hljs-keyword">const</span> server = <span class="hljs-title function_">serve</span>({
  <span class="hljs-attr">fetch</span>: app.<span class="hljs-property">fetch</span>,
  createServer,
})
</code></pre>
<h3 id="http2-المشفر">http2 المشفّر</h3>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { createSecureServer } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;node:http2&#x27;</span>
<span class="hljs-keyword">import</span> { readFileSync } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;node:fs&#x27;</span>

<span class="hljs-keyword">const</span> server = <span class="hljs-title function_">serve</span>({
  <span class="hljs-attr">fetch</span>: app.<span class="hljs-property">fetch</span>,
  <span class="hljs-attr">createServer</span>: createSecureServer,
  <span class="hljs-attr">serverOptions</span>: {
    <span class="hljs-attr">key</span>: <span class="hljs-title function_">readFileSync</span>(<span class="hljs-string">&#x27;localhost-privkey.pem&#x27;</span>),
    <span class="hljs-attr">cert</span>: <span class="hljs-title function_">readFileSync</span>(<span class="hljs-string">&#x27;localhost-cert.pem&#x27;</span>),
  },
})
</code></pre>
<h2 id="البناء-والنشر">البناء والنشر</h2>
<pre><code class="language-sh">npm run build
</code></pre>
<pre><code class="language-sh">yarn run build
</code></pre>
<pre><code class="language-sh">pnpm run build
</code></pre>
<pre><code class="language-sh">bun run build
</code></pre>
<p>قد تحتاج التطبيقات التي تستخدم إطار عمل للواجهة الأمامية إلى استخدام <a href="https://github.com/honojs/vite-plugins">إضافات Vite الخاصة بـ Hono</a>.</p>
<h3 id="dockerfile">Dockerfile</h3>
<p>إليك مثالًا لـ Dockerfile الخاص بـ Node.js.</p>
<pre><code class="language-Dockerfile"><span class="hljs-keyword">FROM</span> node:<span class="hljs-number">22</span>-alpine AS base

<span class="hljs-keyword">FROM</span> base AS builder

<span class="hljs-keyword">RUN</span><span class="language-bash"> apk add --no-cache gcompat</span>
<span class="hljs-keyword">WORKDIR</span><span class="language-bash"> /app</span>

<span class="hljs-keyword">COPY</span><span class="language-bash"> package*json tsconfig.json src ./</span>

<span class="hljs-keyword">RUN</span><span class="language-bash"> npm ci &amp;&amp; \\
    npm run build &amp;&amp; \\
    npm prune --production</span>

<span class="hljs-keyword">FROM</span> base AS runner
<span class="hljs-keyword">WORKDIR</span><span class="language-bash"> /app</span>

<span class="hljs-keyword">RUN</span><span class="language-bash"> addgroup --system --gid 1001 nodejs</span>
<span class="hljs-keyword">RUN</span><span class="language-bash"> adduser --system --uid 1001 hono</span>

<span class="hljs-keyword">COPY</span><span class="language-bash"> --from=builder --<span class="hljs-built_in">chown</span>=hono:nodejs /app/node_modules /app/node_modules</span>
<span class="hljs-keyword">COPY</span><span class="language-bash"> --from=builder --<span class="hljs-built_in">chown</span>=hono:nodejs /app/dist /app/dist</span>
<span class="hljs-keyword">COPY</span><span class="language-bash"> --from=builder --<span class="hljs-built_in">chown</span>=hono:nodejs /app/package.json /app/package.json</span>

<span class="hljs-keyword">USER</span> hono
<span class="hljs-keyword">EXPOSE</span> <span class="hljs-number">3000</span>

<span class="hljs-keyword">CMD</span><span class="language-bash"> [<span class="hljs-string">&quot;node&quot;</span>, <span class="hljs-string">&quot;/app/dist/index.js&quot;</span>]</span>
</code></pre>
`,c={book:s,chapter:n,chapterTitle:a,slug:p,title:e,headings:l,html:t};export{s as book,n as chapter,a as chapterTitle,c as default,l as headings,t as html,p as slug,e as title};
