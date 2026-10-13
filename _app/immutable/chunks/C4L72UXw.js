const s="hono",e="concepts",n="المفاهيم",o="web-standard",a="معايير الويب",l=[],t=`<p>يستخدم Hono فقط <strong>معايير الويب</strong> مثل Fetch.
كانت تُستخدم في الأصل في <code>fetch</code> دالة وتتكون من كائنات أساسية تتعامل مع طلبات HTTP واستجاباتها.
بالإضافة إلى <code>Requests</code> و <code>Responses</code>، هناك <code>URL</code>, <code>URLSearchParam</code>, <code>Headers</code> وغيرها.</p>
<p>Cloudflare Workers و Deno و Bun مبنية أيضًا على معايير الويب (Web Standards).
على سبيل المثال، يمكن كتابة خادم يُرجع &quot;Hello World&quot; كما يلي. يمكن تشغيل هذا على Cloudflare Workers و Bun.</p>
<pre><code class="language-ts"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-keyword">async</span> <span class="hljs-title function_">fetch</span>(<span class="hljs-params"></span>) {
    <span class="hljs-keyword">return</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Response</span>(<span class="hljs-string">&#x27;Hello World&#x27;</span>)
  },
}
</code></pre>
<p>يستخدم Hono معايير الويب فقط، مما يعني أن Hono يمكنه العمل على أي بيئة تشغيل تدعمها.
بالإضافة إلى ذلك، لدينا محوّل (adapter) خاص بـ Node.js. يعمل Hono على بيئات التشغيل (runtimes) التالية:</p>
<ul>
<li>Cloudflare Workers (<code>workerd</code>)</li>
<li>Deno</li>
<li>Bun</li>
<li>Fastly Compute</li>
<li>AWS Lambda</li>
<li>Node.js</li>
<li>Vercel (edge-light)</li>
<li>WebAssembly (مع <a href="https://github.com/WebAssembly/wasi">WebAssembly System Interface (WASI)</a> عبر <a href="https://github.com/WebAssembly/wasi-http"><code>wasi:http</code></a>)</li>
</ul>
<p>كما يعمل على Netlify ومنصات أخرى.
يعمل الكود نفسه على جميع المنصات.</p>
<p>أطلقت Cloudflare Workers وDeno وShopify وغيرها <a href="https://wintercg.org">WinterCG</a> لمناقشة إمكانية استخدام معايير الويب لتمكين &quot;التوافقية عبر الويب (web-interoperability)&quot;.
سيتبع Hono خطواتهم ويسير نحو <strong>معيار معايير الويب (Web Standards)</strong>.</p>
`,c={book:s,chapter:e,chapterTitle:n,slug:o,title:a,headings:l,html:t};export{s as book,e as chapter,n as chapterTitle,c as default,l as headings,t as html,o as slug,a as title};
