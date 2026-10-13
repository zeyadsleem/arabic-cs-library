const s="hono",n="middleware-builtin",a="الوسائط المدمجة",t="context-storage",l="وسيط تخزين السياق",e=[{depth:2,id:"import",text:"Import"},{depth:2,id:"الاستخدام",text:"الاستخدام"},{depth:2,id:"trygetcontext",text:"tryGetContext"}],p=`<p>يخزّن وسيط تخزين السياق (Context Storage) <code>Context</code> في <code>AsyncLocalStorage</code>، لجعله متاحًا على الصعيد العالمي.</p>
<p><strong>ملاحظة</strong> تستخدم هذه البرمجية الوسيطة <code>AsyncLocalStorage</code>. يجب أن تدعمه بيئة التشغيل (runtime).</p>
<p><strong>Cloudflare Workers</strong>: لتفعيل <code>AsyncLocalStorage</code>، أضف <a href="https://developers.cloudflare.com/workers/configuration/compatibility-dates/#nodejs-compatibility-flag"><code>nodejs_compat</code> أو <code>nodejs_als</code> خيار</a> إلى <code>wrangler.toml</code> ملف.</p>
<h2 id="import">Import</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> {
  contextStorage,
  getContext,
  tryGetContext,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/context-storage&#x27;</span>
</code></pre>
<h2 id="الاستخدام">الاستخدام</h2>
<p>الـ <code>getContext()</code> سيُعيد كائن السياق الحالي إذا <code>contextStorage()</code> يُطبَّق كوسيط (middleware).</p>
<pre><code class="language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Env</span> = {
  <span class="hljs-title class_">Variables</span>: {
    <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span>
  }
}

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>&lt;<span class="hljs-title class_">Env</span>&gt;()

app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">contextStorage</span>())

app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">async</span> (c, next) =&gt; {
  c.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;message&#x27;</span>, <span class="hljs-string">&#x27;Hello!&#x27;</span>)
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>()
})

<span class="hljs-comment">// You can access the variable outside the handler.</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">getMessage</span> = (<span class="hljs-params"></span>) =&gt; {
  <span class="hljs-keyword">return</span> getContext&lt;<span class="hljs-title class_">Env</span>&gt;().<span class="hljs-property">var</span>.<span class="hljs-property">message</span>
}

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-title function_">getMessage</span>())
})
</code></pre>
<p>على Cloudflare Workers، يمكنك الوصول إلى الروابط (bindings) خارج المعالج (handler).</p>
<pre><code class="language-ts"><span class="hljs-keyword">type</span> <span class="hljs-title class_">Env</span> = {
  <span class="hljs-title class_">Bindings</span>: {
    <span class="hljs-attr">KV</span>: <span class="hljs-title class_">KVNamespace</span>
  }
}

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>&lt;<span class="hljs-title class_">Env</span>&gt;()

app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">contextStorage</span>())

<span class="hljs-keyword">const</span> <span class="hljs-title function_">setKV</span> = (<span class="hljs-params"><span class="hljs-attr">value</span>: <span class="hljs-built_in">string</span></span>) =&gt; {
  <span class="hljs-keyword">return</span> getContext&lt;<span class="hljs-title class_">Env</span>&gt;().<span class="hljs-property">env</span>.<span class="hljs-property">KV</span>.<span class="hljs-title function_">put</span>(<span class="hljs-string">&#x27;key&#x27;</span>, value)
}
</code></pre>
<h2 id="trygetcontext">tryGetContext</h2>
<p><code>tryGetContext()</code> يعمل مثل <code>getContext()</code>، ولكنه يُرجع <code>undefined</code> بدلاً من رمي خطأ عند عدم توفّر السياق (context):</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> context = tryGetContext&lt;<span class="hljs-title class_">Env</span>&gt;()
<span class="hljs-keyword">if</span> (context) {
  <span class="hljs-comment">// Context is available</span>
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(context.<span class="hljs-property">var</span>.<span class="hljs-property">message</span>)
}
</code></pre>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:l,headings:e,html:p};export{s as book,n as chapter,a as chapterTitle,c as default,e as headings,p as html,t as slug,l as title};
