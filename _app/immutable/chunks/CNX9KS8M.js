const s="kinney",a="react-typescript",n="React مع TypeScript",l="typesafe-environment-variables",p="متغيّرات بيئة آمنة الأنواع",t=[{depth:2,id:"متغيرات-بيئة-آمنة-الأنواع-type-safe-environment-variables",text:"متغيّرات بيئة آمنة الأنواع (Type-Safe Environment Variables)"}],e=`<h2 id="متغيرات-بيئة-آمنة-الأنواع-type-safe-environment-variables">متغيّرات بيئة آمنة الأنواع (Type-Safe Environment Variables)</h2>
<p>إليك نمطًا للتعامل مع متغيّرات البيئة (environment variables) يجنّبك المفاجآت عند وقت التشغيل:</p>
<pre><code class="language-typescript"><span class="hljs-comment">// src/lib/env.ts</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">EnvConfig</span> {
  <span class="hljs-attr">API_BASE_URL</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">APP_NAME</span>: <span class="hljs-built_in">string</span>;
  <span class="hljs-attr">ENABLE_ANALYTICS</span>: <span class="hljs-built_in">boolean</span>;
}

<span class="hljs-keyword">function</span> <span class="hljs-title function_">getEnvVar</span>(<span class="hljs-params"><span class="hljs-attr">key</span>: <span class="hljs-built_in">string</span>, <span class="hljs-attr">defaultValue</span>?: <span class="hljs-built_in">string</span></span>): <span class="hljs-built_in">string</span> {
  <span class="hljs-keyword">const</span> value = <span class="hljs-keyword">import</span>.<span class="hljs-property">meta</span>.<span class="hljs-property">env</span>[<span class="hljs-string">\`VITE_<span class="hljs-subst">\${key}</span>\`</span>] ?? process.<span class="hljs-property">env</span>[key];

  <span class="hljs-keyword">if</span> (!value &amp;&amp; !defaultValue) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">Error</span>(<span class="hljs-string">\`Missing required environment variable: <span class="hljs-subst">\${key}</span>\`</span>);
  }

  <span class="hljs-keyword">return</span> value ?? defaultValue!;
}

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">env</span>: <span class="hljs-title class_">EnvConfig</span> = {
  <span class="hljs-attr">API_BASE_URL</span>: <span class="hljs-title function_">getEnvVar</span>(<span class="hljs-string">&#x27;API_BASE_URL&#x27;</span>),
  <span class="hljs-attr">APP_NAME</span>: <span class="hljs-title function_">getEnvVar</span>(<span class="hljs-string">&#x27;APP_NAME&#x27;</span>, <span class="hljs-string">&#x27;My App&#x27;</span>),
  <span class="hljs-attr">ENABLE_ANALYTICS</span>: <span class="hljs-title function_">getEnvVar</span>(<span class="hljs-string">&#x27;ENABLE_ANALYTICS&#x27;</span>, <span class="hljs-string">&#x27;false&#x27;</span>) === <span class="hljs-string">&#x27;true&#x27;</span>,
};
</code></pre>
`,r={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:e};export{s as book,a as chapter,n as chapterTitle,r as default,t as headings,e as html,l as slug,p as title};
