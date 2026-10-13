const s="hono",a="helpers",n="المساعدات",c="index",e="مساعد `Accepts`",t=[{depth:2,id:"import",text:"Import"},{depth:2,id:"accepts",text:"accepts()"},{depth:3,id:"acceptheader-نوع",text:"AcceptHeader نوع"},{depth:2,id:"الخيارات",text:"الخيارات"},{depth:3,id:"header-acceptheader",text:"header: AcceptHeader"},{depth:3,id:"يدعم-string",text:"يدعم: string[]"},{depth:3,id:"default-string",text:"default: string"},{depth:3,id:"match-accepts-accept-config-acceptsconfig-gt-string",text:"match: (accepts: Accept[], config: acceptsConfig) =&gt; string"}],p=`<p>يساعد Accepts Helper في التعامل مع ترويسات Accept في الطلبات.</p>
<h2 id="import">Import</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { accepts } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/accepts&#x27;</span>
</code></pre>
<h2 id="accepts"><code>accepts()</code></h2>
<p>الـ <code>accepts()</code> تنظر الدالة إلى ترويسة Accept، مثل Accept-Encoding و Accept-Language، وتعيد القيمة المناسبة.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { accepts } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/accepts&#x27;</span>

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> accept = <span class="hljs-title function_">accepts</span>(c, {
    <span class="hljs-attr">header</span>: <span class="hljs-string">&#x27;Accept-Language&#x27;</span>,
    <span class="hljs-attr">supports</span>: [<span class="hljs-string">&#x27;en&#x27;</span>, <span class="hljs-string">&#x27;ja&#x27;</span>, <span class="hljs-string">&#x27;zh&#x27;</span>],
    <span class="hljs-attr">default</span>: <span class="hljs-string">&#x27;en&#x27;</span>,
  })
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">lang</span>: accept })
})
</code></pre>
<h3 id="acceptheader-نوع"><code>AcceptHeader</code> نوع</h3>
<p>تعريف <code>AcceptHeader</code> النوع كما يلي.</p>
<pre><code class="language-ts"><span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">AcceptHeader</span> =
  | <span class="hljs-string">&#x27;Accept&#x27;</span>
  | <span class="hljs-string">&#x27;Accept-Charset&#x27;</span>
  | <span class="hljs-string">&#x27;Accept-Encoding&#x27;</span>
  | <span class="hljs-string">&#x27;Accept-Language&#x27;</span>
  | <span class="hljs-string">&#x27;Accept-Patch&#x27;</span>
  | <span class="hljs-string">&#x27;Accept-Post&#x27;</span>
  | <span class="hljs-string">&#x27;Accept-Ranges&#x27;</span>
</code></pre>
<h2 id="الخيارات">الخيارات</h2>
<h3 id="header-acceptheader"><Badge type="danger" text="required" /> header: <code>AcceptHeader</code></h3>
<p>ترويسة accept الهدف.</p>
<h3 id="يدعم-string"><Badge type="danger" text="required" /> يدعم: <code>string[]</code></h3>
<p>قيم الترويسة التي يدعمها تطبيقك.</p>
<h3 id="default-string"><Badge type="danger" text="required" /> default: <code>string</code></h3>
<p>القيم الافتراضية.</p>
<h3 id="match-accepts-accept-config-acceptsconfig-gt-string"><Badge type="info" text="optional" /> match: <code>(accepts: Accept[], config: acceptsConfig) =&gt; string</code></h3>
<p>دالة المطابقة المخصصة.</p>
`,l={book:s,chapter:a,chapterTitle:n,slug:c,title:e,headings:t,html:p};export{s as book,a as chapter,n as chapterTitle,l as default,t as headings,p as html,c as slug,e as title};
