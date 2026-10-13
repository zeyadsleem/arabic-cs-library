const s="hono",a="helpers",n="المساعدات",l="html",p="مساعد `html`",t=[{depth:2,id:"import",text:"Import"},{depth:2,id:"html",text:"html"},{depth:3,id:"إدراج-المقتطفات-في-jsx",text:"إدراج المقتطفات في JSX"},{depth:3,id:"العمل-كمكون-وظيفي",text:"العمل كمكوّن وظيفي"},{depth:3,id:"يستقبل-الخصائص-ويضمن-القيم",text:"يستقبل الخصائص ويضمّن القيم"},{depth:2,id:"raw",text:"raw()"},{depth:2,id:"نصائح",text:"نصائح"}],c=`<p>تتيح لك الأداة المساعدة html كتابة HTML داخل قالب نصي JavaScript (template literal) باستخدام وسم باسم <code>html</code>. باستخدام <code>raw()</code>، سيتم عرض المحتوى كما هو. عليك تهريب (escape) هذه السلاسل النصية بنفسك.</p>
<h2 id="import">Import</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { html, raw } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/html&#x27;</span>
</code></pre>
<h2 id="html"><code>html</code></h2>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/:username&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> { username } = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">param</span>()
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">html</span>(
    html\`<span class="language-xml"><span class="hljs-meta">&lt;!doctype <span class="hljs-keyword">html</span>&gt;</span>
      <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello! </span><span class="hljs-subst">\${username}</span><span class="language-xml">!<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>\`</span>
  )
})
</code></pre>
<h3 id="إدراج-المقتطفات-في-jsx">إدراج المقتطفات في JSX</h3>
<p>أدرِج السكربت المضمّن (inline script) في JSX:</p>
<pre><code class="language-tsx">app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">html</span>(
    
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
        <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span>Test Site<span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
        {html\`
          <span class="hljs-tag">&lt;<span class="hljs-name">script</span>&gt;</span><span class="language-javascript">
            <span class="hljs-comment">// No need to use dangerouslySetInnerHTML.</span>
            <span class="hljs-comment">// If you write it here, it will not be escaped.</span>
          </span><span class="hljs-tag">&lt;/<span class="hljs-name">script</span>&gt;</span>
        \`}
      <span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span></span>
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>Hello!<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span></span>
    
  )
})
</code></pre>
<h3 id="العمل-كمكون-وظيفي">العمل كمكوّن وظيفي</h3>
<p>منذ <code>html</code> يعيد HtmlEscapedString، ويمكنه العمل كمكوّن كامل الوظائف دون استخدام JSX.</p>
<h4>استخدم <code>html</code> لتسريع العملية بدلًا من <code>memo</code></h4>
<pre><code class="language-typescript"><span class="hljs-keyword">const</span> <span class="hljs-title function_">Footer</span> = (<span class="hljs-params"></span>) =&gt; html\`<span class="language-xml">
  <span class="hljs-tag">&lt;<span class="hljs-name">footer</span>&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">address</span>&gt;</span>My Address...<span class="hljs-tag">&lt;/<span class="hljs-name">address</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">footer</span>&gt;</span>
\`</span>
</code></pre>
<h3 id="يستقبل-الخصائص-ويضمن-القيم">يستقبل الخصائص ويضمّن القيم</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">interface</span> <span class="hljs-title class_">SiteData</span> {
  <span class="hljs-attr">title</span>: <span class="hljs-built_in">string</span>
  <span class="hljs-attr">description</span>: <span class="hljs-built_in">string</span>
  <span class="hljs-attr">image</span>: <span class="hljs-built_in">string</span>
  <span class="hljs-attr">children</span>?: <span class="hljs-built_in">any</span>
}
<span class="hljs-keyword">const</span> <span class="hljs-title function_">Layout</span> = (<span class="hljs-params"><span class="hljs-attr">props</span>: <span class="hljs-title class_">SiteData</span></span>) =&gt; html\`<span class="language-xml">

<span class="hljs-tag">&lt;<span class="hljs-name">head</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">charset</span>=<span class="hljs-string">&quot;UTF-8&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">title</span>&gt;</span></span><span class="hljs-subst">\${props.title}</span><span class="language-xml"><span class="hljs-tag">&lt;/<span class="hljs-name">title</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;description&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;</span></span></span><span class="hljs-subst">\${props.description}</span><span class="language-xml"><span class="hljs-tag"><span class="hljs-string">&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">head</span> <span class="hljs-attr">prefix</span>=<span class="hljs-string">&quot;og: http://ogp.me/ns#&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">property</span>=<span class="hljs-string">&quot;og:type&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;article&quot;</span>&gt;</span>
  <span class="hljs-comment">&lt;!-- More elements slow down JSX, but not template literals. --&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">property</span>=<span class="hljs-string">&quot;og:title&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;</span></span></span><span class="hljs-subst">\${props.title}</span><span class="language-xml"><span class="hljs-tag"><span class="hljs-string">&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">meta</span> <span class="hljs-attr">property</span>=<span class="hljs-string">&quot;og:image&quot;</span> <span class="hljs-attr">content</span>=<span class="hljs-string">&quot;</span></span></span><span class="hljs-subst">\${props.image}</span><span class="language-xml"><span class="hljs-tag"><span class="hljs-string">&quot;</span>&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">head</span>&gt;</span>
<span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
  </span><span class="hljs-subst">\${props.children}</span><span class="language-xml">
<span class="hljs-tag">&lt;/<span class="hljs-name">body</span>&gt;</span>

\`</span>

<span class="hljs-keyword">const</span> <span class="hljs-title function_">Content</span> = (<span class="hljs-params"><span class="hljs-attr">props</span>: { siteData: SiteData; name: <span class="hljs-built_in">string</span> }</span>) =&gt; (
  <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Layout</span> {<span class="hljs-attr">...props.siteData</span>}&gt;</span>
    <span class="hljs-tag">&lt;<span class="hljs-name">h1</span>&gt;</span>Hello {props.name}<span class="hljs-tag">&lt;/<span class="hljs-name">h1</span>&gt;</span>
  <span class="hljs-tag">&lt;/<span class="hljs-name">Layout</span>&gt;</span></span>
)

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> props = {
    <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;World&#x27;</span>,
    <span class="hljs-attr">siteData</span>: {
      <span class="hljs-attr">title</span>: <span class="hljs-string">&#x27;Hello &lt;&gt; World&#x27;</span>,
      <span class="hljs-attr">description</span>: <span class="hljs-string">&#x27;This is a description&#x27;</span>,
      <span class="hljs-attr">image</span>: <span class="hljs-string">&#x27;https://example.com/image.png&#x27;</span>,
    },
  }
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">html</span>(<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">Content</span> {<span class="hljs-attr">...props</span>} /&gt;</span></span>)
})
</code></pre>
<h2 id="raw"><code>raw()</code></h2>
<pre><code class="language-ts">app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> name = <span class="hljs-string">&#x27;John &amp;quot;Johnny&amp;quot; Smith&#x27;</span>
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">html</span>(html\`<span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">p</span>&gt;</span>I&#x27;m </span><span class="hljs-subst">\${raw(name)}</span><span class="language-xml">.<span class="hljs-tag">&lt;/<span class="hljs-name">p</span>&gt;</span>\`</span>)
})
</code></pre>
<h2 id="نصائح">نصائح</h2>
<p>بفضل هذه المكتبات، يفسر Visual Studio Code و vim أيضًا القوالب الحرفية (template literals) كـ HTML، مما يسمح بتطبيق تلوين بناء الجملة (syntax highlighting) والتنسيق.</p>
<ul>
<li><a href="https://marketplace.visualstudio.com/items?itemName=bierner.lit-html">https://marketplace.visualstudio.com/items?itemName=bierner.lit-html</a></li>
<li><a href="https://github.com/MaxMEllon/vim-jsx-pretty">https://github.com/MaxMEllon/vim-jsx-pretty</a></li>
</ul>
`,e={book:s,chapter:a,chapterTitle:n,slug:l,title:p,headings:t,html:c};export{s as book,a as chapter,n as chapterTitle,e as default,t as headings,c as html,l as slug,p as title};
