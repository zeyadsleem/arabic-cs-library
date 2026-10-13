const s="hono",n="getting-started",a="مقدمات",e="cloudflare-workers-vite",p="Cloudflare Workers + Vite",l=[{depth:2,id:"1-الإعداد",text:"1. الإعداد"},{depth:2,id:"2-مرحبا-بالعالم",text:"2. مرحبًا بالعالم"},{depth:2,id:"3-تشغيل",text:"3. تشغيل"},{depth:2,id:"4-النشر",text:"4. النشر"},{depth:2,id:"الارتباطات",text:"الارتباطات"},{depth:2,id:"من-جهة-العميل",text:"من جهة العميل"}],c=`<p>يمكنك بناء تطبيق متكامل (full-stack) على <a href="https://workers.cloudflare.com">Cloudflare Workers</a> مع <a href="https://vite.dev">Vite</a> باستخدام <a href="https://developers.cloudflare.com/workers/vite-plugin/"><code>@cloudflare/vite-plugin</code></a>.
يمنحك هذا الإعداد خادم تطوير Vite سريعًا، وتصييرًا من جانب الخادم (SSR) باستخدام مُصيِّر JSX الخاص بـ Hono، ونصوصًا من جانب العميل تُدمج بواسطة Vite — كل ذلك يعمل على Cloudflare Workers.</p>
<p>هذه هي الطريقة الموصى بها لبدء مشروع كامل المكدس (full-stack) جديد على Cloudflare.</p>
<h2 id="1-الإعداد">1. الإعداد</h2>
<p>يتوفّر قالب بدء (starter) لـ Cloudflare Workers مع Vite.
ابدأ مشروعك باستخدام الأمر &quot;create-hono&quot;.
اختر <code>cloudflare-workers+vite</code> قالب لهذا المثال.</p>
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
├── public // Put your static files here.
├── src
│   ├── index.tsx // The entry point for server-side.
│   ├── renderer.tsx
│   └── style.css
├── tsconfig.json
├── vite.config.ts
└── wrangler.jsonc
</code></pre>
<p>الـ <code>vite.config.ts</code> يجمع إضافة Cloudflare مع <code>vite-ssr-components</code> من أجل SSR:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { cloudflare } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@cloudflare/vite-plugin&#x27;</span>
<span class="hljs-keyword">import</span> { defineConfig } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vite&#x27;</span>
<span class="hljs-keyword">import</span> ssrPlugin <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vite-ssr-components/plugin&#x27;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">defineConfig</span>({
  <span class="hljs-attr">plugins</span>: [<span class="hljs-title function_">cloudflare</span>(), <span class="hljs-title function_">ssrPlugin</span>()],
})
</code></pre>
<h2 id="2-مرحبا-بالعالم">2. مرحبًا بالعالم</h2>
<p>تعديل <code>src/index.tsx</code> مثل ما يلي:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { renderer } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./renderer&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">use</span>(renderer)

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello, Cloudflare Workers!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>)
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> app
</code></pre>
<p>الـ <code>renderer</code> معرّف في <code>src/renderer.tsx</code> باستخدام <code>Hono</code> <a href="https://hono.dev/docs/middleware/builtin/jsx-renderer">البرمجية الوسيطة JSX renderer</a> مع <code>vite-ssr-components</code>، الذي يربط عميل Vite وأصوله:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { jsxRenderer } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/jsx-renderer&#x27;</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Link</span>, <span class="hljs-title class_">ViteClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vite-ssr-components/hono&#x27;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> renderer = <span class="hljs-title function_">jsxRenderer</span>(<span class="hljs-function">(<span class="hljs-params">{ children }</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> (
    
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ViteClient</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Link</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&#x27;/src/style.css&#x27;</span> <span class="hljs-attr">rel</span>=<span class="hljs-string">&#x27;stylesheet&#x27;</span> /&gt;</span>
      <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span></span>
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>{children}<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></span>
    
  )
})
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
<p>إذا كان لديك حساب Cloudflare، يمكنك النشر على Cloudflare. حيث <code>deploy</code> يقوم السكربت بالبناء باستخدام Vite ثم النشر باستخدام Wrangler.</p>
<pre><code class="language-sh">npm run deploy
</code></pre>
<pre><code class="language-sh">yarn deploy
</code></pre>
<pre><code class="language-sh">pnpm run deploy
</code></pre>
<pre><code class="language-sh">bun run deploy
</code></pre>
<h2 id="الارتباطات">الارتباطات</h2>
<p>يمكنك استخدام روابط (Bindings) Cloudflare مثل المتغيرات (Variables) و KV و D1 وغيرها.
قم بتكوينها في <code>wrangler.jsonc</code>. على سبيل المثال، لإضافة Variable باسم <code>MY_NAME</code>:</p>
<pre><code class="language-jsonc"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;$schema&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;node_modules/wrangler/config-schema.json&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;my-app&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;compatibility_date&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;2025-08-03&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;main&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;./src/index.tsx&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;vars&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;MY_NAME&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Hono&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>لتوليد الأنواع لارتباطاتك (Bindings)، شغّل <code>cf-typegen</code> script:</p>
<pre><code class="language-sh">npm run cf-typegen
</code></pre>
<pre><code class="language-sh">yarn cf-typegen
</code></pre>
<pre><code class="language-sh">pnpm run cf-typegen
</code></pre>
<pre><code class="language-sh">bun run cf-typegen
</code></pre>
<p>يولِّد هذا <code>CloudflareBindings</code> الواجهة. مرّرها إلى <code>Hono</code> كأنواع عامة:</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>&lt;{ <span class="hljs-title class_">Bindings</span>: <span class="hljs-title class_">CloudflareBindings</span> }&gt;()
</code></pre>
<p>ثم وصل إلى Bindings عبر <code>c.env</code>:</p>
<pre><code class="language-tsx">app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">render</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello! {c.env.MY_NAME}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span></span>)
})
</code></pre>
<h2 id="من-جهة-العميل">من جهة العميل</h2>
<p><code>vite-ssr-components</code> يتيح لك تحميل سكربتات جانب العميل عبر Vite.
أضف <code>Script</code> مكوّن يشير إلى نقطة دخول عميلك، وتتولى Vite عملية التجميع (bundling) لكل من بيئتي التطوير والإنتاج:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { jsxRenderer } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/jsx-renderer&#x27;</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Script</span>, <span class="hljs-title class_">ViteClient</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;vite-ssr-components/hono&#x27;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> renderer = <span class="hljs-title function_">jsxRenderer</span>(<span class="hljs-function">(<span class="hljs-params">{ children }</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> (
    
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">ViteClient</span> /&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">Script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&#x27;/src/client.ts&#x27;</span> /&gt;</span><span class="language-javascript">
      &lt;/head&gt;</span></span>
      <span class="language-xml"><span class="language-javascript">&lt;body&gt;{children}&lt;/body&gt;</span></span>
    
  )
})
</code></pre>
<p>لمزيد من التفاصيل، راجع <a href="https://developers.cloudflare.com/workers/vite-plugin/"><code>@cloudflare/vite-plugin</code> التوثيق</a> و <a href="https://github.com/yusukebe/vite-ssr-components"><code>vite-ssr-components</code></a>.</p>
`,t={book:s,chapter:n,chapterTitle:a,slug:e,title:p,headings:l,html:c};export{s as book,n as chapter,a as chapterTitle,t as default,l as headings,c as html,e as slug,p as title};
