const s="hono",n="getting-started",a="مقدمات",e="nextjs",p="Next.js",l=[{depth:2,id:"1-الإعداد",text:"1. الإعداد"},{depth:2,id:"2-مرحبا-بالعالم",text:"2. مرحبًا بالعالم"},{depth:2,id:"3-تشغيل",text:"3. تشغيل"},{depth:2,id:"4-النشر",text:"4. النشر"},{depth:2,id:"pages-router",text:"Pages Router"}],o=`<p>Next.js هو إطار عمل React مرن يمنحك اللبنات الأساسية لإنشاء تطبيقات ويب سريعة.</p>
<p>يمكنك تشغيل Hono على Next.js عند استخدام بيئة تشغيل Node.js.<br>
على Vercel، يعد نشر Hono مع Next.js أمرًا سهلًا باستخدام Vercel Functions.</p>
<h2 id="1-الإعداد">1. الإعداد</h2>
<p>يتوفر قالب بداية لـ Next.js.
ابدأ مشروعك باستخدام الأمر &quot;create-hono&quot;.
اختر <code>nextjs</code> قالب لهذا المثال.</p>
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
<p>إذا كنت تستخدم App Router، فحرّر <code>app/api/[[...route]]/route.ts</code>. راجع <a href="https://nextjs.org/docs/app/building-your-application/routing/route-handlers#supported-http-methods">طرق HTTP المدعومة</a> القسم لمزيد من الخيارات.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { handle } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/vercel&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>().<span class="hljs-title function_">basePath</span>(<span class="hljs-string">&#x27;/api&#x27;</span>)

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/hello&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({
    <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Hello Next.js!&#x27;</span>,
  })
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-variable constant_">GET</span> = <span class="hljs-title function_">handle</span>(app)

<span class="hljs-string">\`handle\`</span> comes <span class="hljs-keyword">from</span> the <span class="hljs-string">\`@hono/vercel\`</span> package, which the starter installs. <span class="hljs-title class_">On</span> an existing project, add it <span class="hljs-keyword">with</span> <span class="hljs-string">\`npm i @hono/vercel\`</span>.
<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-variable constant_">POST</span> = <span class="hljs-title function_">handle</span>(app)
</code></pre>
<h2 id="3-تشغيل">3. تشغيل</h2>
<p>شغّل خادم التطوير محليًا. ثم، ادخل إلى <code>http://localhost:3000</code> في متصفح الويب الخاص بك.</p>
<pre><code class="language-sh">npm run dev
</code></pre>
<pre><code class="language-sh">yarn dev
</code></pre>
<pre><code class="language-sh">pnpm dev
</code></pre>
<pre><code class="language-sh">bun run dev
</code></pre>
<p>الآن، <code>/api/hello</code> يعيد JSON فقط، لكن إذا كنت تبني واجهات React، يمكنك إنشاء تطبيق كامل المكدس (full-stack) باستخدام Hono.</p>
<h2 id="4-النشر">4. النشر</h2>
<p>إذا كان لديك حساب Vercel، يمكنك النشر عن طريق ربط مستودع Git.</p>
<h2 id="pages-router">Pages Router</h2>
<p>إذا كنت تستخدم Pages Router، فستحتاج إلى تثبيت محوّل (adapter) Node.js أولًا.</p>
<pre><code class="language-sh">npm i @hono/node-server
</code></pre>
<pre><code class="language-sh">yarn add @hono/node-server
</code></pre>
<pre><code class="language-sh">pnpm add @hono/node-server
</code></pre>
<pre><code class="language-sh">bun add @hono/node-server
</code></pre>
<p>بعد ذلك، يمكنك استخدام <code>getRequestListener</code> دالة مستوردة من <code>@hono/node-server</code> في <code>pages/api/[[...route]].ts</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { getRequestListener } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/node-server&#x27;</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">PageConfig</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;next&#x27;</span>

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">config</span>: <span class="hljs-title class_">PageConfig</span> = {
  <span class="hljs-attr">api</span>: {
    <span class="hljs-attr">bodyParser</span>: <span class="hljs-literal">false</span>,
  },
}

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>().<span class="hljs-title function_">basePath</span>(<span class="hljs-string">&#x27;/api&#x27;</span>)

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/hello&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({
    <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Hello Next.js!&#x27;</span>,
  })
})

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> <span class="hljs-title function_">getRequestListener</span>(app.<span class="hljs-property">fetch</span>)
</code></pre>
<p>لكي يعمل هذا مع Pages Router، من المهم تعطيل أدوات Vercel Node.js المساعدة عن طريق إعداد متغير بيئة في لوحة تحكم مشروعك أو في <code>.env</code> ملف.</p>
<pre><code class="language-text">NODEJS_HELPERS=0
</code></pre>
`,c={book:s,chapter:n,chapterTitle:a,slug:e,title:p,headings:l,html:o};export{s as book,n as chapter,a as chapterTitle,c as default,l as headings,o as html,e as slug,p as title};
