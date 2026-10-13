const s="hono",n="middleware-builtin",a="الوسائط المدمجة",p="method-override",t="وسيط تجاوز الطريقة (Method Override)",e=[{depth:2,id:"import",text:"Import"},{depth:2,id:"الاستخدام",text:"الاستخدام"},{depth:2,id:"على-سبيل-المثال",text:"على سبيل المثال"},{depth:2,id:"الخيارات",text:"الخيارات"},{depth:3,id:"app-hono",text:"app: Hono"},{depth:3,id:"form-string",text:"form: string"},{depth:3,id:"header-boolean",text:"header: boolean"},{depth:3,id:"query-boolean",text:"query: boolean"}],l=`<p>ينفذ هذا الوسيط معالج الطريقة المحددة، التي تختلف عن الطريقة الفعلية للطلب، اعتمادًا على قيمة النموذج (form) أو الترويسة أو الاستعلام (query)، ويُرجع استجابته.</p>
<h2 id="import">Import</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { methodOverride } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/method-override&#x27;</span>
</code></pre>
<h2 id="الاستخدام">الاستخدام</h2>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

<span class="hljs-comment">// If no options are specified, the value of \`_method\` in the form,</span>
<span class="hljs-comment">// e.g. DELETE, is used as the method.</span>
app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&#x27;/posts&#x27;</span>, <span class="hljs-title function_">methodOverride</span>({ app }))

app.<span class="hljs-title function_">delete</span>(<span class="hljs-string">&#x27;/posts&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-comment">// ....</span>
})
</code></pre>
<h2 id="على-سبيل-المثال">على سبيل المثال</h2>
<p>نظرًا لأن نماذج HTML لا يمكنها إرسال طريقة DELETE، يمكنك وضع القيمة <code>DELETE</code> في الخاصية المسماة <code>_method</code> وأرسله. والمعالج الخاص بـ <code>app.delete()</code> سيتم تنفيذها.</p>
<p>نموذج <code>HTML</code>:</p>
<pre><code class="language-html"><span class="hljs-tag">&lt;<span class="hljs-name">form</span> <span class="hljs-attr">action</span>=<span class="hljs-string">&quot;/posts&quot;</span> <span class="hljs-attr">method</span>=<span class="hljs-string">&quot;POST&quot;</span>&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;hidden&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;_method&quot;</span> <span class="hljs-attr">value</span>=<span class="hljs-string">&quot;DELETE&quot;</span> /&gt;</span>
  <span class="hljs-tag">&lt;<span class="hljs-name">input</span> <span class="hljs-attr">type</span>=<span class="hljs-string">&quot;text&quot;</span> <span class="hljs-attr">name</span>=<span class="hljs-string">&quot;id&quot;</span> /&gt;</span>
<span class="hljs-tag">&lt;/<span class="hljs-name">form</span>&gt;</span>
</code></pre>
<p>التطبيق:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { methodOverride } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/method-override&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&#x27;/posts&#x27;</span>, <span class="hljs-title function_">methodOverride</span>({ app }))

app.<span class="hljs-title function_">delete</span>(<span class="hljs-string">&#x27;/posts&#x27;</span>, <span class="hljs-function">() =&gt;</span> {
  <span class="hljs-comment">// ...</span>
})
</code></pre>
<p>يمكنك تغيير القيم الافتراضية أو استخدام قيمة الرأس (header) وقيمة الاستعلام (query):</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&#x27;/posts&#x27;</span>, <span class="hljs-title function_">methodOverride</span>({ app, <span class="hljs-attr">form</span>: <span class="hljs-string">&#x27;_custom_name&#x27;</span> }))
app.<span class="hljs-title function_">use</span>(
  <span class="hljs-string">&#x27;/posts&#x27;</span>,
  <span class="hljs-title function_">methodOverride</span>({ app, <span class="hljs-attr">header</span>: <span class="hljs-string">&#x27;X-METHOD-OVERRIDE&#x27;</span> })
)
app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&#x27;/posts&#x27;</span>, <span class="hljs-title function_">methodOverride</span>({ app, <span class="hljs-attr">query</span>: <span class="hljs-string">&#x27;_method&#x27;</span> }))
</code></pre>
<h2 id="الخيارات">الخيارات</h2>
<h3 id="app-hono"><Badge type="danger" text="required" /> app: <code>Hono</code></h3>
<p>نسخة من <code>Hono</code> مستخدم في تطبيقك.</p>
<h3 id="form-string"><Badge type="info" text="optional" /> form: <code>string</code></h3>
<p>مفتاح النموذج بقيمة تحتوي على اسم الطريقة.
القيمة الافتراضية هي <code>_method</code>.</p>
<h3 id="header-boolean"><Badge type="info" text="optional" /> header: <code>boolean</code></h3>
<p>اسم ترويسة بقيمة تحتوي على اسم الطريقة.</p>
<h3 id="query-boolean"><Badge type="info" text="optional" /> query: <code>boolean</code></h3>
<p>مفتاح معامل الاستعلام (query parameter) بقيمة تحتوي على اسم الطريقة.</p>
`,o={book:s,chapter:n,chapterTitle:a,slug:p,title:t,headings:e,html:l};export{s as book,n as chapter,a as chapterTitle,o as default,e as headings,l as html,p as slug,t as title};
