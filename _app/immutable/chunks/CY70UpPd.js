const s="hono",n="middleware-builtin",e="الوسائط المدمجة",p="compress",t="البرمجية الوسيطة Compress",o=[{depth:2,id:"import",text:"Import"},{depth:2,id:"الاستخدام",text:"الاستخدام"},{depth:2,id:"الخيارات",text:"الخيارات"},{depth:3,id:"encoding-gzip-deflate",text:"encoding: 'gzip' | 'deflate'"},{depth:3,id:"threshold-number",text:"threshold: number"},{depth:3,id:"contenttypefilter-regexp-contenttype-string-gt-boolean",text:"contentTypeFilter: RegExp | (contentType: string) =&gt; boolean"}],a=`<p>تضغط هذه الوسيطة (middleware) جسم الاستجابة (response body)، وفقاً لـ <code>Accept-Encoding</code> ترويسة الطلب.</p>
<p><strong>ملاحظة</strong>: في Cloudflare Workers و Deno Deploy، سيتم ضغط نص الاستجابة تلقائيًا، لذا لا حاجة لاستخدام هذا الوسيط.</p>
<h2 id="import">Import</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { compress } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/compress&#x27;</span>
</code></pre>
<h2 id="الاستخدام">الاستخدام</h2>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">compress</span>())
</code></pre>
<h2 id="الخيارات">الخيارات</h2>
<h3 id="encoding-gzip-deflate"><Badge type="info" text="optional" /> encoding: <code>'gzip'</code> | <code>'deflate'</code></h3>
<p>مخطط الضغط (compression scheme) المسموح به لضغط الاستجابات. إما <code>gzip</code> أو <code>deflate</code>. إذا لم يُحدَّد، يُسمح بكليهما وسيُستخدمان بناءً على <code>Accept-Encoding</code> الترويسة. <code>gzip</code> تحظى بالأولوية إذا لم يتم توفير هذا الخيار وقدّم العميل كليهما في <code>Accept-Encoding</code> الترويسة.</p>
<h3 id="threshold-number"><Badge type="info" text="optional" /> threshold: <code>number</code></h3>
<p>أدنى حجم بالبايت للضغط. الافتراضي 1024 بايت.</p>
<h3 id="contenttypefilter-regexp-contenttype-string-gt-boolean"><Badge type="info" text="optional" /> contentTypeFilter: <code>RegExp</code> | <code>(contentType: string) =&gt; boolean</code></h3>
<p>A <code>RegExp</code> أو دالة لتحديد ما إذا كان يجب ضغط الاستجابة بناءً على <code>Content-Type</code>. افتراضيًا، تُستخدم قائمة مدمجة من أنواع المحتوى (Content-Types) القابلة للضغط.</p>
<p>يمكنك تمرير <code>RegExp</code> لضغط أنواع المحتوى (Content-Types) المطابقة فقط:</p>
<pre><code class="language-ts"><span class="hljs-comment">// Compress only JSON responses</span>
app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">compress</span>({ <span class="hljs-attr">contentTypeFilter</span>: <span class="hljs-regexp">/^application\\/json/</span> }))
</code></pre>
<p>أو مرّر دالة لمنطق مخصّص. المدمج <code>COMPRESSIBLE_CONTENT_TYPE_REGEX</code> يُصدَّر (exported) أيضاً حتى تتمكن من توسيع السلوك الافتراضي:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> {
  compress,
  <span class="hljs-variable constant_">COMPRESSIBLE_CONTENT_TYPE_REGEX</span>,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/compress&#x27;</span>

<span class="hljs-comment">// Compress the default Content-Types plus a custom one</span>
app.<span class="hljs-title function_">use</span>(
  <span class="hljs-title function_">compress</span>({
    <span class="hljs-attr">contentTypeFilter</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-keyword">type</span></span>) =&gt;</span>
      <span class="hljs-variable constant_">COMPRESSIBLE_CONTENT_TYPE_REGEX</span>.<span class="hljs-title function_">test</span>(<span class="hljs-keyword">type</span>) ||
      <span class="hljs-keyword">type</span> === <span class="hljs-string">&#x27;application/x-myformat&#x27;</span>,
  })
)
</code></pre>
`,c={book:s,chapter:n,chapterTitle:e,slug:p,title:t,headings:o,html:a};export{s as book,n as chapter,e as chapterTitle,c as default,o as headings,a as html,p as slug,t as title};
