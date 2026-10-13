const s="hono",n="helpers",a="المساعدات",t="dev",e="مساعد التطوير",o=[{depth:2,id:"getroutername",text:"getRouterName()"},{depth:2,id:"showroutes",text:"showRoutes()"},{depth:2,id:"الخيارات",text:"الخيارات"},{depth:3,id:"verbose-boolean",text:"verbose: boolean"},{depth:3,id:"colorize-boolean",text:"colorize: boolean"}],p=`<p>يوفّر Dev Helper طرقاً مفيدة يمكنك استخدامها أثناء التطوير.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { getRouterName, showRoutes } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/dev&#x27;</span>
</code></pre>
<h2 id="getroutername"><code>getRouterName()</code></h2>
<p>يمكنك الحصول على اسم الموجِّه (router) المستخدَم حالياً عبر <code>getRouterName()</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

<span class="hljs-comment">// ...</span>

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-title function_">getRouterName</span>(app))
</code></pre>
<h2 id="showroutes"><code>showRoutes()</code></h2>
<p><code>showRoutes()</code> تعرض الدالة المسارات المسجَّلة في وحدة التحكم (console) لديك.</p>
<p>تأمّل تطبيقًا كالتالي:</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>().<span class="hljs-title function_">basePath</span>(<span class="hljs-string">&#x27;/v1&#x27;</span>)

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/posts&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-comment">// ...</span>
})

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/posts/:id&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-comment">// ...</span>
})

app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/posts&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-comment">// ...</span>
})

<span class="hljs-title function_">showRoutes</span>(app, {
  <span class="hljs-attr">verbose</span>: <span class="hljs-literal">true</span>,
})
</code></pre>
<p>عند بدء تشغيل هذا التطبيق، ستظهر المسارات في وحدة التحكم الخاصة بك على النحو التالي:</p>
<pre><code class="language-txt">GET   /v1/posts
GET   /v1/posts/:id
POST  /v1/posts
</code></pre>
<h2 id="الخيارات">الخيارات</h2>
<h3 id="verbose-boolean"><Badge type="info" text="optional" /> verbose: <code>boolean</code></h3>
<p>عند الضبط على <code>true</code>، فإنه يعرض معلومات مفصّلة.</p>
<h3 id="colorize-boolean"><Badge type="info" text="optional" /> colorize: <code>boolean</code></h3>
<p>عند الضبط على <code>false</code>، فلن يكون الناتج ملوّنًا.</p>
`,l={book:s,chapter:n,chapterTitle:a,slug:"dev",title:e,headings:o,html:p};export{s as book,n as chapter,a as chapterTitle,l as default,o as headings,p as html,t as slug,e as title};
