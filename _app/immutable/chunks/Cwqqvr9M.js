const s="hono",a="helpers",n="المساعدات",e="factory",p="مساعد `Factory`",t=[{depth:2,id:"import",text:"Import"},{depth:2,id:"createfactory",text:"createFactory()"},{depth:3,id:"الخيارات",text:"الخيارات"},{depth:3,id:"defaultappoptions-honooptions",text:"defaultAppOptions: HonoOptions"},{depth:2,id:"createmiddleware",text:"createMiddleware()"},{depth:2,id:"factorycreatehandlers",text:"factory.createHandlers()"},{depth:2,id:"factorycreateapp",text:"factory.createApp()"}],l=`<p>يوفر Factory Helper دوالًا مفيدة لإنشاء مكونات Hono مثل الوسائط (Middleware). في بعض الأحيان يصعب تعيين أنواع TypeScript الصحيحة، لكن هذا المساعد يسهل ذلك.</p>
<h2 id="import">Import</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { createFactory, createMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/factory&#x27;</span>
</code></pre>
<h2 id="createfactory"><code>createFactory()</code></h2>
<p><code>createFactory()</code> ستنشئ نسخة من صنف Factory.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { createFactory } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/factory&#x27;</span>

<span class="hljs-keyword">const</span> factory = <span class="hljs-title function_">createFactory</span>()
</code></pre>
<p>يمكنك تمرير أنواع Env الخاصة بك كأنواع عامة (Generics):</p>
<pre><code class="language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Env</span> = {
  <span class="hljs-title class_">Variables</span>: {
    <span class="hljs-attr">foo</span>: <span class="hljs-built_in">string</span>
  }
}

<span class="hljs-keyword">const</span> factory = createFactory&lt;<span class="hljs-title class_">Env</span>&gt;()
</code></pre>
<h3 id="الخيارات">الخيارات</h3>
<h3 id="defaultappoptions-honooptions"><Badge type="info" text="optional" /> defaultAppOptions: <code>HonoOptions</code></h3>
<p>الخيارات الافتراضية لتمريرها إلى تطبيق Hono المُنشأ بواسطة <code>createApp()</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> factory = <span class="hljs-title function_">createFactory</span>({
  <span class="hljs-attr">defaultAppOptions</span>: { <span class="hljs-attr">strict</span>: <span class="hljs-literal">false</span> },
})

<span class="hljs-keyword">const</span> app = factory.<span class="hljs-title function_">createApp</span>() <span class="hljs-comment">// \`strict: false\` is applied</span>
</code></pre>
<h2 id="createmiddleware"><code>createMiddleware()</code></h2>
<p><code>createMiddleware()</code> اختصار لـ <code>factory.createMiddleware()</code>.
ستنشئ هذه الدالة برمجيتك الوسيطة المخصّصة.</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> messageMiddleware = <span class="hljs-title function_">createMiddleware</span>(<span class="hljs-title function_">async</span> (c, next) =&gt; {
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>()
  c.<span class="hljs-property">res</span>.<span class="hljs-property">headers</span>.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;X-Message&#x27;</span>, <span class="hljs-string">&#x27;Good morning!&#x27;</span>)
})
</code></pre>
<p>نصيحة: إذا كنت تريد الحصول على وسيط (argument) مثل <code>message</code>، يمكنك إنشاؤه كدالة كما يلي.</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> <span class="hljs-title function_">messageMiddleware</span> = (<span class="hljs-params"><span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">createMiddleware</span>(<span class="hljs-title function_">async</span> (c, next) =&gt; {
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>()
    c.<span class="hljs-property">res</span>.<span class="hljs-property">headers</span>.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;X-Message&#x27;</span>, message)
  })
}

app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">messageMiddleware</span>(<span class="hljs-string">&#x27;Good evening!&#x27;</span>))
</code></pre>
<h2 id="factorycreatehandlers"><code>factory.createHandlers()</code></h2>
<p><code>createHandlers()</code> يساعد على تعريف المعالجات في مكان مختلف عن <code>app.get('/')</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { createFactory } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/factory&#x27;</span>
<span class="hljs-keyword">import</span> { logger } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/logger&#x27;</span>

<span class="hljs-comment">// ...</span>

<span class="hljs-keyword">const</span> factory = <span class="hljs-title function_">createFactory</span>()

<span class="hljs-keyword">const</span> middleware = factory.<span class="hljs-title function_">createMiddleware</span>(<span class="hljs-title function_">async</span> (c, next) =&gt; {
  c.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;foo&#x27;</span>, <span class="hljs-string">&#x27;bar&#x27;</span>)
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>()
})

<span class="hljs-keyword">const</span> handlers = factory.<span class="hljs-title function_">createHandlers</span>(<span class="hljs-title function_">logger</span>(), middleware, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>(c.<span class="hljs-property">var</span>.<span class="hljs-property">foo</span>)
})

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api&#x27;</span>, ...handlers)
</code></pre>
<h2 id="factorycreateapp"><code>factory.createApp()</code></h2>
<p><code>createApp()</code> يساعد في إنشاء نسخة (instance) من Hono بالأنواع المناسبة. إذا استخدمت هذه الطريقة مع <code>createFactory()</code>، يمكنك تجنّب التكرار في تعريف <code>Env</code> نوع.</p>
<p>إذا كان تطبيقك مثل هذا، فعليك ضبط <code>Env</code> في مكانين:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { createMiddleware } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/factory&#x27;</span>

<span class="hljs-keyword">type</span> <span class="hljs-title class_">Env</span> = {
  <span class="hljs-title class_">Variables</span>: {
    <span class="hljs-attr">myVar</span>: <span class="hljs-built_in">string</span>
  }
}

<span class="hljs-comment">// 1. Set the \`Env\` to \`new Hono()\`</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>&lt;<span class="hljs-title class_">Env</span>&gt;()

<span class="hljs-comment">// 2. Set the \`Env\` to \`createMiddleware()\`</span>
<span class="hljs-keyword">const</span> mw = createMiddleware&lt;<span class="hljs-title class_">Env</span>&gt;(<span class="hljs-title function_">async</span> (c, next) =&gt; {
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>()
})

app.<span class="hljs-title function_">use</span>(mw)
</code></pre>
<p>باستخدام <code>createFactory()</code> و <code>createApp()</code>، يمكنك ضبط <code>Env</code> في مكان واحد فقط.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { createFactory } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/factory&#x27;</span>

<span class="hljs-comment">// ...</span>

<span class="hljs-comment">// Set the \`Env\` to \`createFactory()\`</span>
<span class="hljs-keyword">const</span> factory = createFactory&lt;<span class="hljs-title class_">Env</span>&gt;()

<span class="hljs-keyword">const</span> app = factory.<span class="hljs-title function_">createApp</span>()

<span class="hljs-comment">// factory also has \`createMiddleware()\`</span>
<span class="hljs-keyword">const</span> mw = factory.<span class="hljs-title function_">createMiddleware</span>(<span class="hljs-title function_">async</span> (c, next) =&gt; {
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>()
})
</code></pre>
<p><code>createFactory()</code> يمكنه استقبال <code>initApp</code> خيار لتهيئة <code>app</code> أنشأه <code>createApp()</code>. فيما يلي مثال يستخدم الخيار.</p>
<pre><code class="language-ts"><span class="hljs-comment">// factory-with-db.ts</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Env</span> = {
  <span class="hljs-title class_">Bindings</span>: {
    <span class="hljs-attr">MY_DB</span>: D1Database
  }
  <span class="hljs-title class_">Variables</span>: {
    <span class="hljs-attr">db</span>: <span class="hljs-title class_">DrizzleD1Database</span>
  }
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> createFactory&lt;<span class="hljs-title class_">Env</span>&gt;({
  <span class="hljs-attr">initApp</span>: <span class="hljs-function">(<span class="hljs-params">app</span>) =&gt;</span> {
    app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">async</span> (c, next) =&gt; {
      <span class="hljs-keyword">const</span> db = <span class="hljs-title function_">drizzle</span>(c.<span class="hljs-property">env</span>.<span class="hljs-property">MY_DB</span>)
      c.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;db&#x27;</span>, db)
      <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>()
    })
  },
})
</code></pre>
<pre><code class="language-ts"><span class="hljs-comment">// crud.ts</span>
<span class="hljs-keyword">import</span> factoryWithDB <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./factory-with-db&#x27;</span>

<span class="hljs-keyword">const</span> app = factoryWithDB.<span class="hljs-title function_">createApp</span>()

app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/posts&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  c.<span class="hljs-property">var</span>.<span class="hljs-property">db</span>.<span class="hljs-title function_">insert</span>()
  <span class="hljs-comment">// ...</span>
})
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:e,title:p,headings:t,html:l};export{s as book,a as chapter,n as chapterTitle,c as default,t as headings,l as html,e as slug,p as title};
