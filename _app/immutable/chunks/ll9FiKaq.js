const s="hono",n="getting-started",a="مقدمات",e="cloudflare-pages",l="Cloudflare Pages",p=[{depth:2,id:"1-الإعداد",text:"1. الإعداد"},{depth:2,id:"2-مرحبا-بالعالم",text:"2. مرحبًا بالعالم"},{depth:2,id:"3-تشغيل",text:"3. تشغيل"},{depth:2,id:"4-النشر",text:"4. النشر"},{depth:3,id:"النشر-عبر-لوحة-تحكم-cloudflare-باستخدام-github",text:"النشر عبر لوحة تحكم Cloudflare باستخدام GitHub"},{depth:2,id:"الارتباطات",text:"الارتباطات"},{depth:3,id:"إنشاء-wranglertoml",text:"إنشاء wrangler.toml"},{depth:3,id:"إنشاء-kv",text:"إنشاء KV"},{depth:3,id:"تحرير-viteconfigts",text:"تحرير vite.config.ts"},{depth:3,id:"استخدام-الارتباطات-bindings-في-تطبيقك",text:"استخدام الارتباطات (Bindings) في تطبيقك"},{depth:3,id:"في-بيئة-الإنتاج",text:"في بيئة الإنتاج"},{depth:2,id:"من-جهة-العميل",text:"من جهة العميل"},{depth:2,id:"برمجية-وسيطة-لـ-cloudflare-pages",text:"برمجية وسيطة لـ Cloudflare Pages"},{depth:3,id:"الوصول-eventcontext",text:"الوصول EventContext"}],t=`<p>للمشاريع الجديدة، توصي Cloudflare الآن باستخدام <a href="https://hono.dev/docs/getting-started/cloudflare-workers">Cloudflare Workers</a> بدلًا من Cloudflare Pages. يدعم Workers الأصول الثابتة (static assets) ويقدم مجموعة أوسع من الميزات. إذا كنت تبدأ تطبيقًا جديدًا كامل المكدس (full-stack)، فراجع <a href="https://hono.dev/docs/getting-started/cloudflare-workers-vite">Cloudflare Workers + Vite</a>، وهو خليفة إعداد Pages هذا. الـ <code>hono/cloudflare-pages</code> المحوّل مهمل وسيُزال في Hono v5.</p>
<p><a href="https://pages.cloudflare.com">Cloudflare Pages</a> هي منصة طرفية لتطبيقات الويب متكاملة الحزمة.
يخدم الملفات الثابتة والمحتوى الديناميكي المقدَّم من Cloudflare Workers.</p>
<p>يدعم Hono Cloudflare Pages بالكامل.
إنها تقدم تجربة تطوير رائعة. خادم التطوير الخاص بـ Vite سريع، والنشر عبر Wrangler سريع للغاية.</p>
<h2 id="1-الإعداد">1. الإعداد</h2>
<p>يتوفر قالب بداية لـ Cloudflare Pages.
ابدأ مشروعك باستخدام الأمر &quot;create-hono&quot;.
اختر <code>cloudflare-pages</code> قالب لهذا المثال.</p>
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
<p>فيما يلي بنية دليل أساسية.</p>
<pre><code class="language-text">./
├── package.json
├── public
│   └── static // Put your static files.
│       └── style.css // You can refer to it as \`/static/style.css\`.
├── src
│   ├── index.tsx // The entry point for server-side.
│   └── renderer.tsx
├── tsconfig.json
└── vite.config.ts
</code></pre>
<h2 id="2-مرحبا-بالعالم">2. مرحبًا بالعالم</h2>
<p>تعديل <code>src/index.tsx</code> مثل ما يلي:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { renderer } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./renderer&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;*&#x27;</span>, renderer)

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, Cloudflare Pages!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>)
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> app
</code></pre>
<h2 id="3-تشغيل">3. تشغيل</h2>
<p>شغّل خادم التطوير محليًا. ثم، ادخل إلى <code>http://localhost:5173</code> في متصفح الويب الخاص بك.</p>
<pre><code class="language-sh">npm run dev
</code></pre>
<pre><code class="language-sh">yarn dev
</code></pre>
<pre><code class="language-sh">pnpm dev
</code></pre>
<pre><code class="language-sh">bun run dev
</code></pre>
<h2 id="4-النشر">4. النشر</h2>
<p>إذا كان لديك حساب Cloudflare، يمكنك النشر على Cloudflare. في <code>package.json</code>, <code>$npm_execpath</code> يجب تغييره إلى مدير الحزم (package manager) الذي تختاره.</p>
<pre><code class="language-sh">npm run deploy
</code></pre>
<pre><code class="language-sh">yarn deploy
</code></pre>
<pre><code class="language-sh">pnpm run deploy
</code></pre>
<pre><code class="language-sh">bun run deploy
</code></pre>
<h3 id="النشر-عبر-لوحة-تحكم-cloudflare-باستخدام-github">النشر عبر لوحة تحكم Cloudflare باستخدام GitHub</h3>
<ol>
<li>سجّل الدخول إلى <a href="https://dash.cloudflare.com">لوحة تحكم Cloudflare</a> واختر حسابك.</li>
<li>في الصفحة الرئيسية للحساب (Account Home)، اختر Workers &amp; Pages &gt; إنشاء تطبيق &gt; Pages &gt; الاتصال بـ Git.</li>
<li>أذِن لحسابك في GitHub، وحدد المستودع. في إعداد عمليات البناء والنشر (Set up builds and deployments)، قدّم المعلومات التالية:</li>
</ol>
<table>
<thead>
<tr>
<th>خيار التكوين</th>
<th>القيمة</th>
</tr>
</thead>
<tbody>
<tr>
<td>فرع الإنتاج</td>
<td><code>main</code></td>
</tr>
<tr>
<td>أمر البناء</td>
<td><code>npm run build</code></td>
</tr>
<tr>
<td>دليل البناء</td>
<td><code>dist</code></td>
</tr>
</tbody>
</table>
<h2 id="الارتباطات">الارتباطات</h2>
<p>يمكنك استخدام روابط (Bindings) Cloudflare مثل المتغيرات (Variables) و KV و D1 وغيرها.
في هذا القسم، لنستخدم المتغيرات و KV.</p>
<h3 id="إنشاء-wranglertoml">إنشاء <code>wrangler.toml</code></h3>
<p>أولاً، أنشئ <code>wrangler.toml</code> للارتباطات المحلية:</p>
<pre><code class="language-sh"><span class="hljs-built_in">touch</span> wrangler.toml
</code></pre>
<p>تعديل <code>wrangler.toml</code>. حدّد Variable بالاسم <code>MY_NAME</code>.</p>
<pre><code class="language-toml"><span class="hljs-section">[vars]</span>
<span class="hljs-attr">MY_NAME</span> = <span class="hljs-string">&quot;Hono&quot;</span>
</code></pre>
<h3 id="إنشاء-kv">إنشاء KV</h3>
<p>بعد ذلك، أنشئ KV. شغّل الأمر التالي <code>wrangler</code> الأمر:</p>
<pre><code class="language-sh">wrangler kv namespace create MY_KV --preview
</code></pre>
<p>دوّن <code>preview_id</code> كما في المخرجات التالية:</p>
<pre><code>{ binding = &quot;MY_KV&quot;, preview_id = &quot;abcdef&quot; }
</code></pre>
<p>حدِّد <code>preview_id</code> باسم Bindings، <code>MY_KV</code>:</p>
<pre><code class="language-toml"><span class="hljs-section">[[kv_namespaces]]</span>
<span class="hljs-attr">binding</span> = <span class="hljs-string">&quot;MY_KV&quot;</span>
<span class="hljs-attr">id</span> = <span class="hljs-string">&quot;abcdef&quot;</span>
</code></pre>
<h3 id="تحرير-viteconfigts">تحرير <code>vite.config.ts</code></h3>
<p>حرِّر <code>vite.config.ts</code>:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> devServer <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/vite-dev-server&#x27;</span>
<span class="hljs-keyword">import</span> adapter <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/vite-dev-server/cloudflare&#x27;</span>
<span class="hljs-keyword">import</span> build <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/vite-cloudflare-pages&#x27;</span>
<span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vite&#x27;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">plugins</span>: [
    <span class="hljs-title function_">devServer</span>({
      <span class="hljs-attr">entry</span>: <span class="hljs-string">&#x27;src/index.tsx&#x27;</span>,
      adapter, <span class="hljs-comment">// Cloudflare Adapter</span>
    }),
    <span class="hljs-title function_">build</span>(),
  ],
})
</code></pre>
<h3 id="استخدام-الارتباطات-bindings-في-تطبيقك">استخدام الارتباطات (Bindings) في تطبيقك</h3>
<p>استخدم Variable وKV في تطبيقك. حدِّد الأنواع.</p>
<pre><code class="language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Bindings</span> = {
  <span class="hljs-attr">MY_NAME</span>: <span class="hljs-built_in">string</span>
  <span class="hljs-attr">MY_KV</span>: <span class="hljs-title class_">KVNamespace</span>
}

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>&lt;{ <span class="hljs-title class_">Bindings</span>: <span class="hljs-title class_">Bindings</span> }&gt;()
</code></pre>
<p>استخدمها:</p>
<pre><code class="language-tsx">app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  <span class="hljs-keyword">await</span> c.<span class="hljs-property">env</span>.<span class="hljs-property">MY_KV</span>.<span class="hljs-title function_">put</span>(<span class="hljs-string">&#x27;name&#x27;</span>, c.<span class="hljs-property">env</span>.<span class="hljs-property">MY_NAME</span>)
  <span class="hljs-keyword">const</span> name = <span class="hljs-keyword">await</span> c.<span class="hljs-property">env</span>.<span class="hljs-property">MY_KV</span>.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;name&#x27;</span>)
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello! {name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>)
})
</code></pre>
<h3 id="في-بيئة-الإنتاج">في بيئة الإنتاج</h3>
<p>بالنسبة إلى Cloudflare Pages، ستستخدم <code>wrangler.toml</code> للتطوير المحلي، لكن في بيئة الإنتاج ستقوم بإعداد الارتباطات (Bindings) في لوحة التحكم.</p>
<h2 id="من-جهة-العميل">من جهة العميل</h2>
<p>يمكنك كتابة سكربتات من جانب العميل واستيرادها إلى تطبيقك باستخدام ميزات Vite.
إذا <code>/src/client.ts</code> هي نقطة الدخول (entry point) للعميل (client)، ببساطة اكتبها داخل وسم script.
بالإضافة إلى ذلك، <code>import.meta.env.PROD</code> مفيد لاكتشاف ما إذا كان التطبيق يعمل على خادم تطوير أو في مرحلة البناء.</p>
<pre><code class="language-tsx">app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">html</span>(
    
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        {import.meta.env.PROD ? (
          <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&#x27;module&#x27;</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&#x27;/static/client.js&#x27;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        ) : (
          <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&#x27;module&#x27;</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&#x27;/src/client.ts&#x27;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        )}
      <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span></span>
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></span>
    
  )
})
</code></pre>
<p>من أجل بناء السكربت بشكل صحيح، يمكنك استخدام ملف الإعداد (config) النموذجي <code>vite.config.ts</code> كما هو موضح أدناه.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> pages <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/vite-cloudflare-pages&#x27;</span>
<span class="hljs-keyword">import</span> devServer <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/vite-dev-server&#x27;</span>
<span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vite&#x27;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>(<span class="hljs-function">(<span class="hljs-params">{ mode }</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (mode === <span class="hljs-string">&#x27;client&#x27;</span>) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">build</span>: {
        <span class="hljs-attr">rollupOptions</span>: {
          <span class="hljs-attr">input</span>: <span class="hljs-string">&#x27;./src/client.ts&#x27;</span>,
          <span class="hljs-attr">output</span>: {
            <span class="hljs-attr">entryFileNames</span>: <span class="hljs-string">&#x27;static/client.js&#x27;</span>,
          },
        },
      },
    }
  } <span class="hljs-keyword">else</span> {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">plugins</span>: [
        <span class="hljs-title function_">pages</span>(),
        <span class="hljs-title function_">devServer</span>({
          <span class="hljs-attr">entry</span>: <span class="hljs-string">&#x27;src/index.tsx&#x27;</span>,
        }),
      ],
    }
  }
})
</code></pre>
<p>يمكنك تشغيل الأمر التالي لبناء سكربت الخادم والعميل.</p>
<pre><code class="language-sh">vite build --mode client &amp;&amp; vite build
</code></pre>
<h2 id="برمجية-وسيطة-لـ-cloudflare-pages">برمجية وسيطة لـ Cloudflare Pages</h2>
<p>تستخدم Cloudflare Pages <a href="https://developers.cloudflare.com/pages/functions/middleware/">الوسيط</a> نظام مختلف عن وسائط (middleware) Hono. يمكنك تفعيله عن طريق تصدير <code>onRequest</code> في ملف باسم <code>_middleware.ts</code> مثل هذا:</p>
<pre><code class="language-ts"><span class="hljs-comment">// functions/_middleware.ts</span>
<span class="hljs-keyword">export</span> <span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">onRequest</span>(<span class="hljs-params">pagesContext</span>) {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`You are accessing <span class="hljs-subst">\${pagesContext.request.url}</span>\`</span>)
  <span class="hljs-keyword">return</span> <span class="hljs-keyword">await</span> pagesContext.<span class="hljs-title function_">next</span>()
}
</code></pre>
<p>باستخدام <code>handleMiddleware</code>، يمكنك استخدام وسيطة Hono (middleware) كوسيطة Cloudflare Pages.</p>
<pre><code class="language-ts"><span class="hljs-comment">// functions/_middleware.ts</span>
<span class="hljs-keyword">import</span> { handleMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/cloudflare-pages&#x27;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> onRequest = <span class="hljs-title function_">handleMiddleware</span>(<span class="hljs-title function_">async</span> (c, next) =&gt; {
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`You are accessing <span class="hljs-subst">\${c.req.url}</span>\`</span>)
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>()
})
</code></pre>
<p>يمكنك أيضًا استخدام الوسائط المدمجة (built-in) والوسائط الخارجية (third-party) مع Hono. على سبيل المثال، لإضافة المصادقة الأساسية (Basic Authentication)، يمكنك استخدام <a href="https://hono.dev/docs/middleware/builtin/basic-auth">برمجية المصادقة الأساسية (Basic Authentication) في Hono</a>.</p>
<pre><code class="language-ts"><span class="hljs-comment">// functions/_middleware.ts</span>
<span class="hljs-keyword">import</span> { handleMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/cloudflare-pages&#x27;</span>
<span class="hljs-keyword">import</span> { basicAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/basic-auth&#x27;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> onRequest = <span class="hljs-title function_">handleMiddleware</span>(
  <span class="hljs-title function_">basicAuth</span>({
    <span class="hljs-attr">username</span>: <span class="hljs-string">&#x27;hono&#x27;</span>,
    <span class="hljs-attr">password</span>: <span class="hljs-string">&#x27;acoolproject&#x27;</span>,
  })
)
</code></pre>
<p>إذا أردت تطبيق عدة وسائط (middleware)، يمكنك كتابتها على النحو التالي:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { handleMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/cloudflare-pages&#x27;</span>

<span class="hljs-comment">// ...</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> onRequest = [
  <span class="hljs-title function_">handleMiddleware</span>(middleware1),
  <span class="hljs-title function_">handleMiddleware</span>(middleware2),
  <span class="hljs-title function_">handleMiddleware</span>(middleware3),
]
</code></pre>
<h3 id="الوصول-eventcontext">الوصول <code>EventContext</code></h3>
<p>يمكنك الوصول إلى <a href="https://developers.cloudflare.com/pages/functions/api-reference/#eventcontext"><code>EventContext</code></a> الكائن عبر <code>c.env</code> في <code>handleMiddleware</code>.</p>
<pre><code class="language-ts"><span class="hljs-comment">// functions/_middleware.ts</span>
<span class="hljs-keyword">import</span> { handleMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/cloudflare-pages&#x27;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> onRequest = [
  <span class="hljs-title function_">handleMiddleware</span>(<span class="hljs-title function_">async</span> (c, next) =&gt; {
    c.<span class="hljs-property">env</span>.<span class="hljs-property">eventContext</span>.<span class="hljs-property">data</span>.<span class="hljs-property">user</span> = <span class="hljs-string">&#x27;Joe&#x27;</span>
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>()
  }),
]
</code></pre>
<p>بعد ذلك، يمكنك الوصول إلى قيمة البيانات عبر <code>c.env.eventContext</code> في المعالج:</p>
<pre><code class="language-ts"><span class="hljs-comment">// functions/api/[[route]].ts</span>
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">EventContext</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/cloudflare-pages&#x27;</span>
<span class="hljs-keyword">import</span> { handle } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/cloudflare-pages&#x27;</span>

<span class="hljs-comment">// ...</span>

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Env</span> = {
  <span class="hljs-title class_">Bindings</span>: {
    <span class="hljs-attr">eventContext</span>: <span class="hljs-title class_">EventContext</span>
  }
}

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>&lt;<span class="hljs-title class_">Env</span>&gt;().<span class="hljs-title function_">basePath</span>(<span class="hljs-string">&#x27;/api&#x27;</span>)

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/hello&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({
    <span class="hljs-attr">message</span>: <span class="hljs-string">\`Hello, <span class="hljs-subst">\${c.env.eventContext.data.user}</span>!\`</span>, <span class="hljs-comment">// &#x27;Joe&#x27;</span>
  })
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> onRequest = <span class="hljs-title function_">handle</span>(app)
</code></pre>
`,c={book:s,chapter:n,chapterTitle:a,slug:e,title:l,headings:p,html:t};export{s as book,n as chapter,a as chapterTitle,c as default,p as headings,t as html,e as slug,l as title};
