const s="hono",n="middleware-builtin",a="الوسائط المدمجة",e="body-limit",p="البرمجية الوسيطة Body Limit",l=[{depth:2,id:"import",text:"Import"},{depth:2,id:"الاستخدام",text:"الاستخدام"},{depth:2,id:"الخيارات",text:"الخيارات"},{depth:3,id:"maxsize-number",text:"maxSize: number"},{depth:3,id:"onerror-onerror",text:"onError: OnError"},{depth:2,id:"الاستخدام-مع-bun-للطلبات-الكبيرة",text:"الاستخدام مع Bun للطلبات الكبيرة"}],t=`<p>يمكن لوسيط حد النص (Body Limit Middleware) تقييد حجم ملف نص الطلب (request body).</p>
<p>يستخدم هذا الوسيط أولًا قيمة <code>Content-Length</code> الترويسة في الطلب، إن وُجدت.
إذا لم يتم تعيينه، فإنه يقرأ النص (body) في الدفق وينفذ معالج أخطاء إذا كان أكبر من حجم الملف المحدد.</p>
<h2 id="import">Import</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { bodyLimit } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/body-limit&#x27;</span>
</code></pre>
<h2 id="الاستخدام">الاستخدام</h2>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">post</span>(
  <span class="hljs-string">&#x27;/upload&#x27;</span>,
  <span class="hljs-title function_">bodyLimit</span>({
    <span class="hljs-attr">maxSize</span>: <span class="hljs-number">50</span> * <span class="hljs-number">1024</span>, <span class="hljs-comment">// 50kb</span>
    <span class="hljs-attr">onError</span>: <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
      <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;overflow :(&#x27;</span>, <span class="hljs-number">413</span>)
    },
  }),
  <span class="hljs-title function_">async</span> (c) =&gt; {
    <span class="hljs-keyword">const</span> body = <span class="hljs-keyword">await</span> c.<span class="hljs-property">req</span>.<span class="hljs-title function_">parseBody</span>()
    <span class="hljs-keyword">if</span> (body[<span class="hljs-string">&#x27;file&#x27;</span>] <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">File</span>) {
      <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">\`Got file sized: <span class="hljs-subst">\${body[<span class="hljs-string">&#x27;file&#x27;</span>].size}</span>\`</span>)
    }
    <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;pass :)&#x27;</span>)
  }
)
</code></pre>
<h2 id="الخيارات">الخيارات</h2>
<h3 id="maxsize-number"><Badge type="danger" text="required" /> maxSize: <code>number</code></h3>
<p>الحد الأقصى لحجم الملف الذي تريد تقييده. الافتراضي هو <code>100 * 1024</code> - <code>100kb</code>.</p>
<h3 id="onerror-onerror"><Badge type="info" text="optional" /> onError: <code>OnError</code></h3>
<p>معالج الأخطاء (error handler) الذي سيتم استدعاؤه إذا تم تجاوز حجم الملف المحدد.</p>
<h2 id="الاستخدام-مع-bun-للطلبات-الكبيرة">الاستخدام مع Bun للطلبات الكبيرة</h2>
<p>إذا تم استخدام وسيط حد النص (Body Limit Middleware) صراحةً للسماح بنص طلب أكبر من الافتراضي، فقد يكون من الضروري إجراء تغييرات على <code>Bun.serve</code> الإعدادات وفقًا لذلك. <a href="https://github.com/oven-sh/bun/blob/f2cfa15e4ef9d730fc6842ad8b79fb7ab4c71cb9/packages/bun-types/bun.d.ts#L2191">وقت كتابة هذا</a>, <code>Bun.serve</code>الحد الافتراضي لنص الطلب هو 128MiB. إذا قمت بتعيين وسيط حد النص (Body Limit Middleware) الخاص بـ Hono إلى قيمة أكبر من ذلك، ستظل طلباتك تفشل، بالإضافة إلى أن <code>onError</code> لن يتم استدعاء المعالج (handler) المحدد في الوسيط (middleware). وذلك لأن <code>Bun.serve()</code> سيضبط رمز الحالة إلى <code>413</code> وإنهاء الاتصال قبل تمرير الطلب إلى Hono.</p>
<p>إذا كنت تريد قبول طلبات أكبر من 128MiB باستخدام Hono و Bun، فستحتاج إلى تعيين الحد الأقصى لـ Bun أيضًا:</p>
<pre><code class="language-ts"><span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> {
  <span class="hljs-attr">port</span>: process.<span class="hljs-property">env</span>[<span class="hljs-string">&#x27;PORT&#x27;</span>] || <span class="hljs-number">3000</span>,
  <span class="hljs-attr">fetch</span>: app.<span class="hljs-property">fetch</span>,
  <span class="hljs-attr">maxRequestBodySize</span>: <span class="hljs-number">1024</span> * <span class="hljs-number">1024</span> * <span class="hljs-number">200</span>, <span class="hljs-comment">// your value here</span>
}
</code></pre>
<p>أو، حسب إعدادك:</p>
<pre><code class="language-ts"><span class="hljs-title class_">Bun</span>.<span class="hljs-title function_">serve</span>({
  <span class="hljs-title function_">fetch</span>(<span class="hljs-params">req, server</span>) {
    <span class="hljs-keyword">return</span> app.<span class="hljs-title function_">fetch</span>(req, { <span class="hljs-attr">ip</span>: server.<span class="hljs-title function_">requestIP</span>(req) })
  },
  <span class="hljs-attr">maxRequestBodySize</span>: <span class="hljs-number">1024</span> * <span class="hljs-number">1024</span> * <span class="hljs-number">200</span>, <span class="hljs-comment">// your value here</span>
})
</code></pre>
`,o={book:s,chapter:n,chapterTitle:a,slug:e,title:p,headings:l,html:t};export{s as book,n as chapter,a as chapterTitle,o as default,l as headings,t as html,e as slug,p as title};
