const s="hono",a="getting-started",n="مقدمات",p="ali-function-compute",l="Alibaba Cloud Function Compute",e=[{depth:2,id:"1-الإعداد",text:"1. الإعداد"},{depth:2,id:"2-مرحبا-بالعالم",text:"2. مرحبًا بالعالم"},{depth:2,id:"3-إعداد-serverless-devs",text:"3. إعداد serverless-devs"},{depth:2,id:"4-النشر",text:"4. النشر"}],t=`<p><a href="https://www.alibabacloud.com/en/product/function-compute">Alibaba Cloud Function Compute</a> هي خدمة حوسبة مدارة بالكامل ومحركة بالأحداث (event-driven). يتيح لك Function Compute التركيز على كتابة ورفع الكود دون الحاجة إلى إدارة البنية التحتية مثل الخوادم.</p>
<p>يستخدم هذا الدليل محوّلًا (adapter) من طرف ثالث <a href="https://github.com/rwv/hono-alibaba-cloud-fc3-adapter">rwv/hono-alibaba-cloud-fc3-adapter</a> لتشغيل Hono على Alibaba Cloud Function Compute.</p>
<h2 id="1-الإعداد">1. الإعداد</h2>
<pre><code class="language-sh"><span class="hljs-built_in">mkdir</span> my-app
<span class="hljs-built_in">cd</span> my-app
npm i hono hono-alibaba-cloud-fc3-adapter
npm i -D @serverless-devs/s esbuild
<span class="hljs-built_in">mkdir</span> src
<span class="hljs-built_in">touch</span> src/index.ts
</code></pre>
<pre><code class="language-sh"><span class="hljs-built_in">mkdir</span> my-app
<span class="hljs-built_in">cd</span> my-app
yarn add hono hono-alibaba-cloud-fc3-adapter
yarn add -D @serverless-devs/s esbuild
<span class="hljs-built_in">mkdir</span> src
<span class="hljs-built_in">touch</span> src/index.ts
</code></pre>
<pre><code class="language-sh"><span class="hljs-built_in">mkdir</span> my-app
<span class="hljs-built_in">cd</span> my-app
pnpm add hono hono-alibaba-cloud-fc3-adapter
pnpm add -D @serverless-devs/s esbuild
<span class="hljs-built_in">mkdir</span> src
<span class="hljs-built_in">touch</span> src/index.ts
</code></pre>
<pre><code class="language-sh"><span class="hljs-built_in">mkdir</span> my-app
<span class="hljs-built_in">cd</span> my-app
bun add hono hono-alibaba-cloud-fc3-adapter
bun add -D esbuild @serverless-devs/s
<span class="hljs-built_in">mkdir</span> src
<span class="hljs-built_in">touch</span> src/index.ts
</code></pre>
<h2 id="2-مرحبا-بالعالم">2. مرحبًا بالعالم</h2>
<p>تعديل <code>src/index.ts</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { handle } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono-alibaba-cloud-fc3-adapter&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Hello Hono!&#x27;</span>))

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> handler = <span class="hljs-title function_">handle</span>(app)
</code></pre>
<h2 id="3-إعداد-serverless-devs">3. إعداد serverless-devs</h2>
<blockquote>
<p><a href="https://github.com/Serverless-Devs/Serverless-Devs">serverless-devs</a> هي منصة تطوير بدون خادم (serverless) مفتوحة المصدر ومفتوحة، مخصصة لتزويد المطورين بنظام سلسلة أدوات (tool chain) قوي. من خلال هذه المنصة، لا يمكن للمطورين تجربة منتجات serverless متعددة السحابات بنقرة واحدة ونشر مشاريع serverless بسرعة فحسب، بل يمكنهم أيضًا إدارة المشاريع في دورة الحياة الكاملة لتطبيقات serverless، والجمع بين مطوري serverless والأدوات/المنصات الأخرى ببساطة وسرعة لزيادة كفاءة البحث والتطوير (R &amp; D) والتشغيل والصيانة.</p>
</blockquote>
<p>أضف AccessKeyID و AccessKeySecret الخاصين بـ Alibaba Cloud</p>
<pre><code class="language-sh">npx s config add
<span class="hljs-comment"># Please select a provider: Alibaba Cloud (alibaba)</span>
<span class="hljs-comment"># Input your AccessKeyID &amp; AccessKeySecret</span>
</code></pre>
<p>تعديل <code>s.yaml</code></p>
<pre><code class="language-yaml"><span class="hljs-attr">edition:</span> <span class="hljs-number">3.0</span><span class="hljs-number">.0</span>
<span class="hljs-attr">name:</span> <span class="hljs-string">my-app</span>
<span class="hljs-attr">access:</span> <span class="hljs-string">&#x27;default&#x27;</span>

<span class="hljs-attr">vars:</span>
  <span class="hljs-attr">region:</span> <span class="hljs-string">&#x27;us-west-1&#x27;</span>

<span class="hljs-attr">resources:</span>
  <span class="hljs-attr">my-app:</span>
    <span class="hljs-attr">component:</span> <span class="hljs-string">fc3</span>
    <span class="hljs-attr">props:</span>
      <span class="hljs-attr">region:</span> <span class="hljs-string">\${vars.region}</span>
      <span class="hljs-attr">functionName:</span> <span class="hljs-string">&#x27;my-app&#x27;</span>
      <span class="hljs-attr">description:</span> <span class="hljs-string">&#x27;Hello World by Hono&#x27;</span>
      <span class="hljs-attr">runtime:</span> <span class="hljs-string">&#x27;nodejs20&#x27;</span>
      <span class="hljs-attr">code:</span> <span class="hljs-string">./dist</span>
      <span class="hljs-attr">handler:</span> <span class="hljs-string">index.handler</span>
      <span class="hljs-attr">memorySize:</span> <span class="hljs-number">1024</span>
      <span class="hljs-attr">timeout:</span> <span class="hljs-number">300</span>
</code></pre>
<p>تعديل <code>scripts</code> القسم في <code>package.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;scripts&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;build&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;esbuild --bundle --outfile=./dist/index.js --platform=node --target=node20 ./src/index.ts&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;deploy&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;s deploy -y&quot;</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="4-النشر">4. النشر</h2>
<p>أخيرًا، شغّل الأمر للنشر:</p>
<pre><code class="language-sh">npm run build <span class="hljs-comment"># Compile the TypeScript code to JavaScript</span>
npm run deploy <span class="hljs-comment"># Deploy the function to Alibaba Cloud Function Compute</span>
</code></pre>
`,c={book:s,chapter:a,chapterTitle:n,slug:p,title:l,headings:e,html:t};export{s as book,a as chapter,n as chapterTitle,c as default,e as headings,t as html,p as slug,l as title};
