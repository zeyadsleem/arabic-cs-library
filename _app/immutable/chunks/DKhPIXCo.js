const s="hono",n="middleware-builtin",o="الوسائط المدمجة",t="method-not-allowed",l="وسيط Method Not Allowed",e=[{depth:2,id:"import",text:"Import"},{depth:2,id:"الاستخدام",text:"الاستخدام"},{depth:2,id:"الخيارات",text:"الخيارات"},{depth:3,id:"app-hono",text:"app: Hono"},{depth:3,id:"onmethodnotallowed-c-context-allowedmethods-string-gt-response-promiseltresponsegt",text:"onMethodNotAllowed: (c: Context, allowedMethods: string[]) =&gt; Response | Promise&lt;Response&gt;"}],a=`<p>يُعيد وسيط الطريقة غير المسموح بها (Method Not Allowed) <code>405 Method Not Allowed</code> استجابة بـ <code>Allow</code> الترويسة عندما يطابق مسار الطلب مسارًا مسجلًا لكن طريقة الطلب غير مدعومة. بدون هذا الوسيط، يُرجع Hono <code>404 Not Found</code> في هذه الحالة.</p>
<h2 id="import">Import</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { methodNotAllowed } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/method-not-allowed&#x27;</span>
</code></pre>
<h2 id="الاستخدام">الاستخدام</h2>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">methodNotAllowed</span>({ app }))

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/hello&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Hello!&#x27;</span>))
app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/hello&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Posted!&#x27;</span>))

<span class="hljs-comment">// PUT /hello -&gt; 405 Method Not Allowed</span>
<span class="hljs-comment">// Allow: GET, HEAD, POST</span>
</code></pre>
<p>يمكنك تخصيص الاستجابة بـ <code>onMethodNotAllowed</code> option:</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">use</span>(
  <span class="hljs-title function_">methodNotAllowed</span>({
    app,
    <span class="hljs-attr">onMethodNotAllowed</span>: <span class="hljs-function">(<span class="hljs-params">c, methods</span>) =&gt;</span>
      c.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">error</span>: <span class="hljs-string">&#x27;Method Not Allowed&#x27;</span> }, <span class="hljs-number">405</span>, {
        <span class="hljs-title class_">Allow</span>: methods.<span class="hljs-title function_">join</span>(<span class="hljs-string">&#x27;, &#x27;</span>),
      }),
  })
)
</code></pre>
<h2 id="الخيارات">الخيارات</h2>
<h3 id="app-hono"><Badge type="danger" text="required" /> app: <code>Hono</code></h3>
<p>مثيل Hono المستخدم من قبل التطبيق. يجمع الوسيط الطرق المسموحة لكل مسار من مساراته المسجلة.</p>
<h3 id="onmethodnotallowed-c-context-allowedmethods-string-gt-response-promiseltresponsegt"><Badge type="info" text="optional" /> onMethodNotAllowed: <code>(c: Context, allowedMethods: string[]) =&gt; Response | Promise&lt;Response&gt;</code></h3>
<p>يولّد الاستجابة، بما في ذلك <code>Allow</code> ترويسة. افتراضيًا، يُعيد الوسيط <code>405 Method Not Allowed</code> استجابة بـ <code>Allow</code> الترويسة مضبوطة على الطرق المسموح بها.</p>
`,p={book:s,chapter:n,chapterTitle:o,slug:t,title:l,headings:e,html:a};export{s as book,n as chapter,o as chapterTitle,p as default,e as headings,a as html,t as slug,l as title};
