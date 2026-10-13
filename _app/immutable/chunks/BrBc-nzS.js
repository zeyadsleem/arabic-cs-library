const s="hono",n="getting-started",a="مقدمات",e="netlify",p="Netlify",l=[{depth:2,id:"1-الإعداد",text:"1. الإعداد"},{depth:2,id:"2-مرحبا-بالعالم",text:"2. مرحبًا بالعالم"},{depth:2,id:"3-تشغيل",text:"3. تشغيل"},{depth:2,id:"4-النشر",text:"4. النشر"},{depth:2,id:"context",text:"Context"}],t=`<p>توفر Netlify استضافة للمواقع الثابتة وخدمات خلفية (backend) بدون خادم (serverless). <a href="https://docs.netlify.com/edge-functions/overview/"><code>Edge Functions</code></a> يمكّننا من جعل صفحات الويب ديناميكية.</p>
<p>تدعم Edge Functions الكتابة بلغتي Deno و TypeScript، ويتم تسهيل النشر من خلال <a href="https://docs.netlify.com/cli/get-started/"><code>Netlify CLI</code></a>. باستخدام Hono، يمكنك إنشاء التطبيق لدوال Netlify Edge Functions.</p>
<h2 id="1-الإعداد">1. الإعداد</h2>
<p>يتوفر قالب بداية لـ Netlify.
ابدأ مشروعك باستخدام الأمر &quot;create-hono&quot;.
اختر <code>netlify</code> قالب لهذا المثال.</p>
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
<p>انتقل إلى <code>my-app</code>.</p>
<h2 id="2-مرحبا-بالعالم">2. مرحبًا بالعالم</h2>
<p>تعديل <code>netlify/edge-functions/index.ts</code>:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;jsr:@hono/hono&#x27;</span>
<span class="hljs-keyword">import</span> { handle } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;jsr:@hono/netlify&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Hello Hono!&#x27;</span>)
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">handle</span>(app)
</code></pre>
<h2 id="3-تشغيل">3. تشغيل</h2>
<p>شغِّل خادم التطوير باستخدام Netlify CLI. ثم، ادخل إلى <code>http://localhost:8888</code> في متصفح الويب الخاص بك.</p>
<pre><code class="language-sh">netlify dev
</code></pre>
<h2 id="4-النشر">4. النشر</h2>
<p>يمكنك النشر باستخدام <code>netlify deploy</code> الأمر.</p>
<pre><code class="language-sh">netlify deploy --prod
</code></pre>
<h2 id="context"><code>Context</code></h2>
<p>يمكنك الوصول إلى خاصية Netlify <code>Context</code> عبر <code>c.env</code>:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;jsr:@hono/hono&#x27;</span>
<span class="hljs-keyword">import</span> { handle } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;jsr:@hono/netlify&#x27;</span>

<span class="hljs-comment">// Import the type definition</span>
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">Context</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;https://edge.netlify.com/&#x27;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">Env</span> = {
  <span class="hljs-title class_">Bindings</span>: {
    <span class="hljs-attr">context</span>: <span class="hljs-title class_">Context</span>
  }
}

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>&lt;<span class="hljs-title class_">Env</span>&gt;()

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/country&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span>
  c.<span class="hljs-title function_">json</span>({
    <span class="hljs-string">&#x27;You are in&#x27;</span>: c.<span class="hljs-property">env</span>.<span class="hljs-property">context</span>.<span class="hljs-property">geo</span>.<span class="hljs-property">country</span>?.<span class="hljs-property">name</span>,
  })
)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">handle</span>(app)
</code></pre>
`,o={book:s,chapter:n,chapterTitle:a,slug:e,title:p,headings:l,html:t};export{s as book,n as chapter,a as chapterTitle,o as default,l as headings,t as html,e as slug,p as title};
