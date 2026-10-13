const s="hono",a="middleware-builtin",e="الوسائط المدمجة",n="etag",t="برمجية وسيطة ETag",o=[{depth:2,id:"import",text:"Import"},{depth:2,id:"الاستخدام",text:"الاستخدام"},{depth:2,id:"الترويسات-المحتفظ-بها",text:"الترويسات المحتفظ بها"},{depth:2,id:"الخيارات",text:"الخيارات"},{depth:3,id:"weak-boolean",text:"weak: boolean"},{depth:3,id:"retainedheaders-string",text:"retainedHeaders: string[]"},{depth:3,id:"generatedigest-body-uint8array-gt-arraybuffer-promiseltarraybuffergt",text:"generateDigest: (body: Uint8Array) =&gt; ArrayBuffer | Promise&lt;ArrayBuffer&gt;"}],r=`<p>باستخدام هذه الوسيطة (middleware)، يمكنك إضافة ترويسات ETag بسهولة.</p>
<h2 id="import">Import</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { etag } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/etag&#x27;</span>
</code></pre>
<h2 id="الاستخدام">الاستخدام</h2>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&#x27;/etag/*&#x27;</span>, <span class="hljs-title function_">etag</span>())
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/etag/abc&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Hono is cool&#x27;</span>)
})
</code></pre>
<h2 id="الترويسات-المحتفظ-بها">الترويسات المحتفظ بها</h2>
<p>يجب أن تتضمن استجابة 304 الترويسات التي كان سيتم إرسالها في استجابة 200 OK مكافئة. الترويسات الافتراضية هي Cache-Control و Content-Location و Date و ETag و Expires و Vary.</p>
<p>إذا أردت إضافة الترويسة (header) التي تُرسَل، يمكنك استخدام <code>retainedHeaders</code> الخيار و <code>RETAINED_304_HEADERS</code> متغيّر مصفوفة النصوص الذي يتضمن الترويسات (headers) الافتراضية:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { etag, <span class="hljs-variable constant_">RETAINED_304_HEADERS</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/etag&#x27;</span>

<span class="hljs-comment">// ...</span>

app.<span class="hljs-title function_">use</span>(
  <span class="hljs-string">&#x27;/etag/*&#x27;</span>,
  <span class="hljs-title function_">etag</span>({
    <span class="hljs-attr">retainedHeaders</span>: [<span class="hljs-string">&#x27;x-message&#x27;</span>, ...<span class="hljs-variable constant_">RETAINED_304_HEADERS</span>],
  })
)
</code></pre>
<h2 id="الخيارات">الخيارات</h2>
<h3 id="weak-boolean"><Badge type="info" text="optional" /> weak: <code>boolean</code></h3>
<p>حدّد باستخدام أو دون استخدام <a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Conditional_requests#weak_validation">تحقق ضعيف</a>. إذا <code>true</code> مُضبط، فإن <code>w/</code> يُضاف إلى بادئة القيمة. الافتراضي هو <code>false</code>.</p>
<h3 id="retainedheaders-string"><Badge type="info" text="optional" /> retainedHeaders: <code>string[]</code></h3>
<p>الترويسات (headers) التي تريد الاحتفاظ بها في استجابة 304.</p>
<h3 id="generatedigest-body-uint8array-gt-arraybuffer-promiseltarraybuffergt"><Badge type="info" text="optional" /> generateDigest: <code>(body: Uint8Array) =&gt; ArrayBuffer | Promise&lt;ArrayBuffer&gt;</code></h3>
<p>دالة مخصّصة لتوليد البصمة (digest). افتراضياً، تستخدم <code>SHA-1</code>. تُستدعى هذه الدالة مع جسم الاستجابة (response body) كـ <code>Uint8Array</code> ويجب أن تُعيد قيمة تجزئة (hash) كـ <code>ArrayBuffer</code> أو Promise خاص بها.</p>
`,p={book:s,chapter:a,chapterTitle:e,slug:n,title:t,headings:o,html:r};export{s as book,a as chapter,e as chapterTitle,p as default,o as headings,r as html,n as slug,t as title};
