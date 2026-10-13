const s="hono",n="helpers",a="المساعدات",p="conninfo",l="مُساعد ConnInfo",o=[{depth:2,id:"import",text:"Import"},{depth:2,id:"الاستخدام",text:"الاستخدام"},{depth:2,id:"تعريفات-الأنواع",text:"تعريفات الأنواع"}],e=`<p>يساعدك ConnInfo Helper في الحصول على معلومات الاتصال. على سبيل المثال، يمكنك الحصول على العنوان البعيد (remote address) للعميل بسهولة.</p>
<h2 id="import">Import</h2>
<p>محوّل كل بيئة تشغيل حزمة منفصلة (<code>@hono/cloudflare-workers</code>, <code>@hono/deno</code>, <code>@hono/bun</code>، ...). ثبّت الواحد المناسب لبيئة تشغيلك.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { getConnInfo } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/cloudflare-workers&#x27;</span>
</code></pre>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { getConnInfo } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/deno&#x27;</span>
</code></pre>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { getConnInfo } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/bun&#x27;</span>
</code></pre>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { getConnInfo } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/vercel&#x27;</span>
</code></pre>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { getConnInfo } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/aws-lambda&#x27;</span>
</code></pre>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { getConnInfo } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/netlify&#x27;</span>
</code></pre>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { getConnInfo } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/lambda-edge&#x27;</span>
</code></pre>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { getConnInfo } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;@hono/node-server/conninfo&#x27;</span>
</code></pre>
<h2 id="الاستخدام">الاستخدام</h2>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> info = <span class="hljs-title function_">getConnInfo</span>(c) <span class="hljs-comment">// info is \`ConnInfo\`</span>
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">\`Your remote address is <span class="hljs-subst">\${info.remote.address}</span>\`</span>)
})
</code></pre>
<h2 id="تعريفات-الأنواع">تعريفات الأنواع</h2>
<p>تعريفات أنواع القيم التي يمكنك الحصول عليها من <code>getConnInfo()</code> هي التالية:</p>
<pre><code class="language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_">AddressType</span> = <span class="hljs-string">&#x27;IPv6&#x27;</span> | <span class="hljs-string">&#x27;IPv4&#x27;</span> | <span class="hljs-literal">undefined</span>

<span class="hljs-keyword">type</span> <span class="hljs-title class_">NetAddrInfo</span> = {
  <span class="hljs-comment">/**
   * Transport protocol type
   */</span>
  <span class="hljs-attr">transport</span>?: <span class="hljs-string">&#x27;tcp&#x27;</span> | <span class="hljs-string">&#x27;udp&#x27;</span>
  <span class="hljs-comment">/**
   * Transport port number
   */</span>
  <span class="hljs-attr">port</span>?: <span class="hljs-built_in">number</span>

  <span class="hljs-attr">address</span>?: <span class="hljs-built_in">string</span>
  <span class="hljs-attr">addressType</span>?: <span class="hljs-title class_">AddressType</span>
} &amp; (
  | {
      <span class="hljs-comment">/**
       * Host name such as IP Addr
       */</span>
      <span class="hljs-attr">address</span>: <span class="hljs-built_in">string</span>

      <span class="hljs-comment">/**
       * Host name type
       */</span>
      <span class="hljs-attr">addressType</span>: <span class="hljs-title class_">AddressType</span>
    }
  | {}
)

<span class="hljs-comment">/**
 * HTTP Connection information
 */</span>
<span class="hljs-keyword">interface</span> <span class="hljs-title class_">ConnInfo</span> {
  <span class="hljs-comment">/**
   * Remote information
   */</span>
  <span class="hljs-attr">remote</span>: <span class="hljs-title class_">NetAddrInfo</span>
}
</code></pre>
`,c={book:s,chapter:n,chapterTitle:a,slug:p,title:l,headings:o,html:e};export{s as book,n as chapter,a as chapterTitle,c as default,o as headings,e as html,p as slug,l as title};
