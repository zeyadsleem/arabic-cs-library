const s="hono",n="getting-started",a="مقدمات",p="service-worker",l="`Service Worker`",t=[{depth:2,id:"1-الإعداد",text:"1. الإعداد"},{depth:2,id:"2-مرحبا-بالعالم",text:"2. مرحبًا بالعالم"},{depth:3,id:"استخدام-fire",text:"استخدام fire()"},{depth:2,id:"3-تشغيل",text:"3. تشغيل"}],e=`<p><a href="https://developer.mozilla.org/en-US/docs/Web/API/Service_Worker_API"><code>Service Worker</code></a> هو برنامج نصي يعمل في خلفية المتصفح للتعامل مع مهام مثل التخزين المؤقت والإشعارات الفورية (push notifications). باستخدام محول Service Worker، يمكنك تشغيل تطبيقات مبنية بـ Hono كـ <a href="https://developer.mozilla.org/en-US/docs/Web/API/FetchEvent">FetchEvent</a> المعالج داخل المتصفح.</p>
<p>توضّح هذه الصفحة مثالاً على إنشاء مشروع باستخدام <a href="https://vitejs.dev/">Vite</a>.</p>
<h2 id="1-الإعداد">1. الإعداد</h2>
<p>أولًا، أنشئ دليل مشروعك وانتقل إليه:</p>
<pre><code class="language-sh"><span class="hljs-built_in">mkdir</span> my-app
<span class="hljs-built_in">cd</span> my-app
</code></pre>
<p>أنشئ الملفات اللازمة للمشروع. أنشئ ملف <code>package.json</code> ملف كما يلي:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;my-app&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;private&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;dev&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;vite dev&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;type&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;module&quot;</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>وبالمثل، أنشئ <code>tsconfig.json</code> ملف كما يلي:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;compilerOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;target&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ES2020&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;module&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;ESNext&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;lib&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;ES2020&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;DOM&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;WebWorker&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;moduleResolution&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;bundler&quot;</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;include&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;./&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;exclude&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;node_modules&quot;</span><span class="hljs-punctuation">]</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>بعد ذلك، ثبّت الوحدات اللازمة.</p>
<pre><code class="language-sh">npm i hono @hono/service-worker
npm i -D vite
</code></pre>
<pre><code class="language-sh">yarn add hono @hono/service-worker
yarn add -D vite
</code></pre>
<pre><code class="language-sh">pnpm add hono @hono/service-worker
pnpm add -D vite
</code></pre>
<pre><code class="language-sh">bun add hono @hono/service-worker
bun add -D vite
</code></pre>
<h2 id="2-مرحبا-بالعالم">2. مرحبًا بالعالم</h2>
<p>تعديل <code>index.html</code>:</p>
<pre><code class="language-html"><span class="hljs-meta">&lt;!doctype <span class="hljs-keyword">html</span>&gt;</span>

  <span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">a</span> <span class="hljs-attr">href</span>=<span class="hljs-string">&quot;/sw&quot;</span>&gt;</span>Hello World by Service Worker<span class="hljs-tag">&lt;/<span class="hljs-name">a</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;module&quot;</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&quot;/main.ts&quot;</span>&gt;</span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

</code></pre>
<p><code>main.ts</code> سكربت لتسجيل Service Worker:</p>
<pre><code class="language-ts"><span class="hljs-keyword">function</span> <span class="hljs-title function_">register</span>(<span class="hljs-params"></span>) {
  navigator.<span class="hljs-property">serviceWorker</span>
    .<span class="hljs-title function_">register</span>(<span class="hljs-string">&#x27;/sw.ts&#x27;</span>, { <span class="hljs-attr">scope</span>: <span class="hljs-string">&#x27;/sw&#x27;</span>, <span class="hljs-attr">type</span>: <span class="hljs-string">&#x27;module&#x27;</span> })
    .<span class="hljs-title function_">then</span>(
      <span class="hljs-keyword">function</span> (<span class="hljs-params">_registration</span>) {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Register Service Worker: Success&#x27;</span>)
      },
      <span class="hljs-keyword">function</span> (<span class="hljs-params">_error</span>) {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Register Service Worker: Error&#x27;</span>)
      }
    )
}
<span class="hljs-keyword">function</span> <span class="hljs-title function_">start</span>(<span class="hljs-params"></span>) {
  navigator.<span class="hljs-property">serviceWorker</span>
    .<span class="hljs-title function_">getRegistrations</span>()
    .<span class="hljs-title function_">then</span>(<span class="hljs-keyword">function</span> (<span class="hljs-params">registrations</span>) {
      <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> registration <span class="hljs-keyword">of</span> registrations) {
        <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Unregister Service Worker&#x27;</span>)
        registration.<span class="hljs-title function_">unregister</span>()
      }
      <span class="hljs-title function_">register</span>()
    })
}
<span class="hljs-title function_">start</span>()
</code></pre>
<p>في <code>sw.ts</code>، أنشئ تطبيقاً باستخدام Hono وسجِّله في <code>fetch</code> الحدث باستخدام محوّل Service Worker <code>handle</code> دالة. وهذا يسمح لتطبيق Hono باعتراض الوصول إلى <code>/sw</code>.</p>
<pre><code class="language-ts"><span class="hljs-comment">// To support types</span>
<span class="hljs-comment">// https://github.com/microsoft/TypeScript/issues/14877</span>
<span class="hljs-keyword">declare</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">self</span>: <span class="hljs-title class_">ServiceWorkerGlobalScope</span>

<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { handle } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/service-worker&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>().<span class="hljs-title function_">basePath</span>(<span class="hljs-string">&#x27;/sw&#x27;</span>)
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Hello World&#x27;</span>))

<span class="hljs-variable language_">self</span>.<span class="hljs-title function_">addEventListener</span>(<span class="hljs-string">&#x27;fetch&#x27;</span>, <span class="hljs-title function_">handle</span>(app))
</code></pre>
<h3 id="استخدام-fire">استخدام <code>fire()</code></h3>
<p>الـ <code>fire()</code> الدالة تستدعي تلقائيًا <code>addEventListener('fetch', handle(app))</code> نيابةً عنك، مما يجعل الكود أكثر إيجازًا.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { fire } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/service-worker&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>().<span class="hljs-title function_">basePath</span>(<span class="hljs-string">&#x27;/sw&#x27;</span>)
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Hello World&#x27;</span>))

<span class="hljs-title function_">fire</span>(app)
</code></pre>
<h2 id="3-تشغيل">3. تشغيل</h2>
<p>شغّل خادم التطوير.</p>
<pre><code class="language-sh">npm run dev
</code></pre>
<pre><code class="language-sh">yarn dev
</code></pre>
<pre><code class="language-sh">pnpm run dev
</code></pre>
<pre><code class="language-sh">bun run dev
</code></pre>
<p>افتراضيًا، سيعمل خادم التطوير على المنفذ <code>5173</code>. الوصول <code>http://localhost:5173/</code> في متصفحك لإكمال تسجيل عامل الخدمة (Service Worker). ثم، قم بالوصول إلى <code>/sw</code> لرؤية الاستجابة من تطبيق Hono.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:p,title:l,headings:t,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,t as headings,e as html,p as slug,l as title};
