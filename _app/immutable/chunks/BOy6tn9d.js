const s="hono",n="middleware-builtin",a="الوسائط المدمجة",t="cors",e="برمجية وسيطة CORS",l=[{depth:2,id:"import",text:"Import"},{depth:2,id:"الاستخدام",text:"الاستخدام"},{depth:2,id:"الخيارات",text:"الخيارات"},{depth:3,id:"origin-string-string-originstring-ccontext-gt-string",text:"origin: string | string[] | (origin:string, c:Context) =&gt; string"},{depth:3,id:"allowmethods-string-originstring-ccontext-gt-string",text:"allowMethods: string[] | (origin:string, c:Context) =&gt; string[]"},{depth:3,id:"allowheaders-string",text:"allowHeaders: string[]"},{depth:3,id:"maxage-number",text:"maxAge: number"},{depth:3,id:"credentials-boolean",text:"credentials: boolean"},{depth:3,id:"exposeheaders-string",text:"exposeHeaders: string[]"},{depth:2,id:"تكوين-cors-المعتمد-على-البيئة",text:"تكوين CORS المعتمد على البيئة"},{depth:2,id:"الاستخدام-مع-vite",text:"الاستخدام مع Vite"}],p=`<p>هناك العديد من حالات الاستخدام لـ Cloudflare Workers كواجهات برمجة تطبيقات ويب (Web APIs) واستدعائها من تطبيقات الواجهة الأمامية الخارجية.
لهذا، علينا تنفيذ CORS، فلنفعل ذلك باستخدام وسيط (middleware) أيضًا.</p>
<h2 id="import">Import</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { cors } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/cors&#x27;</span>
</code></pre>
<h2 id="الاستخدام">الاستخدام</h2>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

<span class="hljs-comment">// CORS should be called before the route</span>
app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&#x27;/api/*&#x27;</span>, <span class="hljs-title function_">cors</span>())
app.<span class="hljs-title function_">use</span>(
  <span class="hljs-string">&#x27;/api2/*&#x27;</span>,
  <span class="hljs-title function_">cors</span>({
    <span class="hljs-attr">origin</span>: <span class="hljs-string">&#x27;http://example.com&#x27;</span>,
    <span class="hljs-attr">allowHeaders</span>: [<span class="hljs-string">&#x27;X-Custom-Header&#x27;</span>, <span class="hljs-string">&#x27;Upgrade-Insecure-Requests&#x27;</span>],
    <span class="hljs-attr">allowMethods</span>: [<span class="hljs-string">&#x27;POST&#x27;</span>, <span class="hljs-string">&#x27;GET&#x27;</span>, <span class="hljs-string">&#x27;OPTIONS&#x27;</span>],
    <span class="hljs-attr">exposeHeaders</span>: [<span class="hljs-string">&#x27;Content-Length&#x27;</span>, <span class="hljs-string">&#x27;X-Kuma-Revision&#x27;</span>],
    <span class="hljs-attr">maxAge</span>: <span class="hljs-number">600</span>,
    <span class="hljs-attr">credentials</span>: <span class="hljs-literal">true</span>,
  })
)

app.<span class="hljs-title function_">all</span>(<span class="hljs-string">&#x27;/api/abc&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span> })
})
app.<span class="hljs-title function_">all</span>(<span class="hljs-string">&#x27;/api2/abc&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">success</span>: <span class="hljs-literal">true</span> })
})
</code></pre>
<p>أصول متعددة:</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">use</span>(
  <span class="hljs-string">&#x27;/api3/*&#x27;</span>,
  <span class="hljs-title function_">cors</span>({
    <span class="hljs-attr">origin</span>: [<span class="hljs-string">&#x27;https://example.com&#x27;</span>, <span class="hljs-string">&#x27;https://example.org&#x27;</span>],
  })
)

<span class="hljs-comment">// Or you can use &quot;function&quot;</span>
app.<span class="hljs-title function_">use</span>(
  <span class="hljs-string">&#x27;/api4/*&#x27;</span>,
  <span class="hljs-title function_">cors</span>({
    <span class="hljs-comment">// \`c\` is a \`Context\` object</span>
    <span class="hljs-attr">origin</span>: <span class="hljs-function">(<span class="hljs-params">origin, c</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> origin.<span class="hljs-title function_">endsWith</span>(<span class="hljs-string">&#x27;.example.com&#x27;</span>)
        ? origin
        : <span class="hljs-string">&#x27;http://example.com&#x27;</span>
    },
  })
)
</code></pre>
<p>طرق مسموح بها ديناميكيًا بناءً على الأصل (origin):</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">use</span>(
  <span class="hljs-string">&#x27;/api5/*&#x27;</span>,
  <span class="hljs-title function_">cors</span>({
    <span class="hljs-attr">origin</span>: <span class="hljs-function">(<span class="hljs-params">origin</span>) =&gt;</span>
      origin === <span class="hljs-string">&#x27;https://example.com&#x27;</span> ? origin : <span class="hljs-string">&#x27;*&#x27;</span>,
    <span class="hljs-comment">// \`c\` is a \`Context\` object</span>
    <span class="hljs-attr">allowMethods</span>: <span class="hljs-function">(<span class="hljs-params">origin, c</span>) =&gt;</span>
      origin === <span class="hljs-string">&#x27;https://example.com&#x27;</span>
        ? [<span class="hljs-string">&#x27;GET&#x27;</span>, <span class="hljs-string">&#x27;HEAD&#x27;</span>, <span class="hljs-string">&#x27;POST&#x27;</span>, <span class="hljs-string">&#x27;PATCH&#x27;</span>, <span class="hljs-string">&#x27;DELETE&#x27;</span>]
        : [<span class="hljs-string">&#x27;GET&#x27;</span>, <span class="hljs-string">&#x27;HEAD&#x27;</span>],
  })
)
</code></pre>
<h2 id="الخيارات">الخيارات</h2>
<h3 id="origin-string-string-originstring-ccontext-gt-string"><Badge type="info" text="optional" /> origin: <code>string</code> | <code>string[]</code> | <code>(origin:string, c:Context) =&gt; string</code></h3>
<p>قيمة ترويسة CORS &quot;<em>Access-Control-Allow-Origin</em>&quot;. يمكنك أيضًا تمرير دالة استدعاء مثل <code>origin: (origin) =&gt; (origin.endsWith('.example.com') ? origin : 'http://example.com')</code>. القيمة الافتراضية هي <code>*</code>.</p>
<h3 id="allowmethods-string-originstring-ccontext-gt-string"><Badge type="info" text="optional" /> <code>allowMethods</code>: <code>string[]</code> | <code>(origin:string, c:Context) =&gt; string[]</code></h3>
<p>قيمة ترويسة CORS &quot;<em>Access-Control-Allow-Methods</em>&quot;. يمكنك أيضًا تمرير دالة استدعاء لتحديد الطرق المسموحة ديناميكيًا بناءً على الأصل (origin). الافتراضي هو <code>['GET', 'HEAD', 'PUT', 'POST', 'DELETE', 'PATCH', 'QUERY']</code>.</p>
<h3 id="allowheaders-string"><Badge type="info" text="optional" /> <code>allowHeaders</code>: <code>string[]</code></h3>
<p>قيمة رأس CORS &quot;<em>Access-Control-Allow-Headers</em>&quot;. الافتراضي هو <code>[]</code>.</p>
<h3 id="maxage-number"><Badge type="info" text="optional" /> maxAge: <code>number</code></h3>
<p>قيمة ترويسة CORS المسماة &quot;<em>Access-Control-Max-Age</em>&quot;.</p>
<h3 id="credentials-boolean"><Badge type="info" text="optional" /> <code>credentials</code>: <code>boolean</code></h3>
<p>قيمة ترويسة (header) CORS &quot;<em>Access-Control-Allow-Credentials</em>&quot;.</p>
<h3 id="exposeheaders-string"><Badge type="info" text="optional" /> <code>exposeHeaders</code>: <code>string[]</code></h3>
<p>قيمة رأس CORS &quot;<em>Access-Control-Expose-Headers</em>&quot;. الافتراضي هو <code>[]</code>.</p>
<h2 id="تكوين-cors-المعتمد-على-البيئة">تكوين CORS المعتمد على البيئة</h2>
<p>إذا كنت تريد ضبط إعداد CORS وفقًا لبيئة التنفيذ، مثل بيئة التطوير أو الإنتاج، فحقن القيم من متغيرات البيئة أمر مريح لأنه يلغي حاجة التطبيق إلى معرفة بيئة التنفيذ الخاصة به. راجع المثال أدناه للتوضيح.</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&#x27;*&#x27;</span>, <span class="hljs-title function_">async</span> (c, next) =&gt; {
  <span class="hljs-keyword">const</span> corsMiddlewareHandler = <span class="hljs-title function_">cors</span>({
    <span class="hljs-attr">origin</span>: c.<span class="hljs-property">env</span>.<span class="hljs-property">CORS_ORIGIN</span>,
  })
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">corsMiddlewareHandler</span>(c, next)
})
</code></pre>
<h2 id="الاستخدام-مع-vite">الاستخدام مع Vite</h2>
<p>عند استخدام Hono مع Vite، يجب عليك تعطيل ميزة CORS المدمجة في Vite عن طريق ضبط <code>server.cors</code> إلى <code>false</code> في <code>vite.config.ts</code>. يمنع هذا التعارضات مع وسيطة CORS الخاصة بـ Hono.</p>
<pre><code class="language-ts"><span class="hljs-comment">// vite.config.ts</span>
<span class="hljs-keyword">import</span> { cloudflare } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@cloudflare/vite-plugin&#x27;</span>
<span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vite&#x27;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">server</span>: {
    <span class="hljs-attr">cors</span>: <span class="hljs-literal">false</span>, <span class="hljs-comment">// disable Vite&#x27;s built-in CORS setting</span>
  },
  <span class="hljs-attr">plugins</span>: [<span class="hljs-title function_">cloudflare</span>()],
})
</code></pre>
`,o={book:s,chapter:n,chapterTitle:a,slug:t,title:e,headings:l,html:p};export{s as book,n as chapter,a as chapterTitle,o as default,l as headings,p as html,t as slug,e as title};
