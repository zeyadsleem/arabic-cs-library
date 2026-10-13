const s="hono",n="helpers",e="المساعدات",a="adapter",l="مساعد `Adapter`",t=[{depth:2,id:"import",text:"Import"},{depth:2,id:"env",text:"env()"},{depth:3,id:"تحديد-بيئة-التشغيل",text:"تحديد بيئة التشغيل"},{depth:2,id:"getruntimekey",text:"getRuntimeKey()"},{depth:3,id:"مفاتيح-بيئات-التشغيل-المتاحة",text:"مفاتيح بيئات التشغيل المتاحة"}],o=`<p>توفر الأداة المساعدة للمحول (Adapter Helper) طريقة سلسة للتفاعل مع المنصات المختلفة عبر واجهة موحدة.</p>
<h2 id="import">Import</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { env, getRuntimeKey } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/adapter&#x27;</span>
</code></pre>
<h2 id="env"><code>env()</code></h2>
<p>الـ <code>env()</code> تسهل الدالة استرجاع متغيرات البيئة عبر أوقات تشغيل مختلفة، متجاوزةً ارتباطات Cloudflare Workers فقط. القيمة التي يمكن استرجاعها باستخدام <code>env(c)</code> قد يختلف لكل بيئة تشغيل (runtime).</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { env } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/adapter&#x27;</span>

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/env&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-comment">// NAME is process.env.NAME on Node.js or Bun</span>
  <span class="hljs-comment">// NAME is the value written in \`wrangler.toml\` on Cloudflare</span>
  <span class="hljs-keyword">const</span> { <span class="hljs-variable constant_">NAME</span> } = env&lt;{ <span class="hljs-attr">NAME</span>: <span class="hljs-built_in">string</span> }&gt;(c)
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-variable constant_">NAME</span>)
})
</code></pre>
<p>بيئات التشغيل المدعومة والمنصات بلا خوادم (Serverless) والخدمات السحابية:</p>
<ul>
<li>Cloudflare Workers
<ul>
<li><code>wrangler.toml</code></li>
<li><code>wrangler.jsonc</code></li>
</ul>
</li>
<li>Deno
<ul>
<li><a href="https://docs.deno.com/runtime/manual/basics/env_variables"><code>Deno.env</code></a></li>
<li><code>.env</code> ملف</li>
</ul>
</li>
<li>Bun
<ul>
<li><a href="https://bun.com/guides/runtime/set-env"><code>Bun.env</code></a></li>
<li><code>process.env</code></li>
</ul>
</li>
<li>Node.js
<ul>
<li><code>process.env</code></li>
</ul>
</li>
<li>Vercel
<ul>
<li><a href="https://vercel.com/docs/projects/environment-variables">متغيرات البيئة على Vercel</a></li>
</ul>
</li>
<li>AWS Lambda
<ul>
<li><a href="https://docs.aws.amazon.com/lambda/latest/dg/samples-blank.html#samples-blank-architecture">متغيرات البيئة على AWS Lambda</a></li>
</ul>
</li>
<li>Lambda@Edge<br>
متغيرات البيئة على Lambda تكون <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/add-origin-custom-headers.html">غير مدعوم</a> بواسطة Lambda@Edge، تحتاج إلى استخدام <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/lambda-event-structure.html">حدث Lambda@Edge</a> كبديل.</li>
<li>Fastly Compute<br>
على Fastly Compute، يمكنك استخدام ConfigStore لإدارة البيانات المُعرَّفة من قبل المستخدم.</li>
<li>Netlify<br>
على Netlify، يمكنك استخدام <a href="https://docs.netlify.com/site-deploys/overview/#deploy-contexts">سياقات Netlify</a> لإدارة البيانات المعرّفة من المستخدم.</li>
</ul>
<h3 id="تحديد-بيئة-التشغيل">تحديد بيئة التشغيل</h3>
<p>يمكنك تحديد بيئة التشغيل للحصول على متغيرات البيئة بتمرير مفتاح بيئة التشغيل كوسيطة ثانية.</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/env&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> { <span class="hljs-variable constant_">NAME</span> } = env&lt;{ <span class="hljs-attr">NAME</span>: <span class="hljs-built_in">string</span> }&gt;(c, <span class="hljs-string">&#x27;workerd&#x27;</span>)
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-variable constant_">NAME</span>)
})
</code></pre>
<h2 id="getruntimekey"><code>getRuntimeKey()</code></h2>
<p>الـ <code>getRuntimeKey()</code> تُعيد الدالة معرّف بيئة التشغيل (runtime) الحالية.</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (<span class="hljs-title function_">getRuntimeKey</span>() === <span class="hljs-string">&#x27;workerd&#x27;</span>) {
    <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;You are on Cloudflare&#x27;</span>)
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (<span class="hljs-title function_">getRuntimeKey</span>() === <span class="hljs-string">&#x27;bun&#x27;</span>) {
    <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;You are on Bun&#x27;</span>)
  }
  ...
})
</code></pre>
<h3 id="مفاتيح-بيئات-التشغيل-المتاحة">مفاتيح بيئات التشغيل المتاحة</h3>
<p>فيما يلي مفاتيح بيئات التشغيل المتاحة؛ قد تكون بيئات التشغيل غير المدرجة مدعومة وتُوسم بأنها <code>other</code>، وبعضها مستوحى من <a href="https://runtime-keys.proposal.wintercg.org/">مفاتيح Runtime الخاصة بـ WinterCG</a>:</p>
<ul>
<li><code>workerd</code> - Cloudflare Workers</li>
<li><code>deno</code></li>
<li><code>bun</code></li>
<li><code>node</code></li>
<li><code>edge-light</code> - دوال Vercel Edge</li>
<li><code>fastly</code> - Fastly Compute</li>
<li><code>other</code> - مفاتيح بيئات تشغيل أخرى غير معروفة</li>
</ul>
`,p={book:s,chapter:n,chapterTitle:e,slug:a,title:l,headings:t,html:o};export{s as book,n as chapter,e as chapterTitle,p as default,t as headings,o as html,a as slug,l as title};
