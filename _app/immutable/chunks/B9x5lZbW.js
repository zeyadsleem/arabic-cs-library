const s="hono",c="api",a="مرجع الواجهة",n="request",p="`HonoRequest`",l=[{depth:2,id:"param",text:"param()"},{depth:2,id:"query",text:"query()"},{depth:2,id:"queries",text:"queries()"},{depth:2,id:"header",text:"header()"},{depth:2,id:"parsebody",text:"parseBody()"},{depth:3,id:"ملفات-متعددة",text:"ملفات متعددة"},{depth:3,id:"ملفات-أو-حقول-متعددة-بالاسم-نفسه",text:"ملفات أو حقول متعددة بالاسم نفسه"},{depth:3,id:"الترميز-النقطي",text:"الترميز النقطي"},{depth:2,id:"json",text:"json()"},{depth:2,id:"text",text:"text()"},{depth:2,id:"arraybuffer",text:"arrayBuffer()"},{depth:2,id:"blob",text:"blob()"},{depth:2,id:"formdata",text:"formData()"},{depth:2,id:"valid",text:"valid()"},{depth:2,id:"routepath",text:"routePath"},{depth:2,id:"matchedroutes",text:"matchedRoutes"},{depth:2,id:"path",text:"path"},{depth:2,id:"url",text:"url"},{depth:2,id:"method",text:"method"},{depth:2,id:"raw",text:"raw"},{depth:2,id:"clonerawrequest",text:"cloneRawRequest()"}],t=`<p>الـ <code>HonoRequest</code> كائن يمكن أخذُه من <code>c.req</code> الذي يغلّف <a href="https://developer.mozilla.org/en-US/docs/Web/API/Request">الطلب</a> كائن.</p>
<h2 id="param">param()</h2>
<p>احصل على قيم معاملات المسار.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
<span class="hljs-comment">// Captured params</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/entry/:id&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  <span class="hljs-keyword">const</span> id = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">param</span>(<span class="hljs-string">&#x27;id&#x27;</span>)
  <span class="hljs-comment">//    ^?</span>
  <span class="hljs-comment">// ...</span>
})

<span class="hljs-comment">// Get all params at once</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/entry/:id/comment/:commentId&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  <span class="hljs-keyword">const</span> { id, commentId } = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">param</span>()
  <span class="hljs-comment">//      ^?</span>
})
</code></pre>
<h2 id="query">query()</h2>
<p>الحصول على معاملات سلسلة الاستعلام.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
<span class="hljs-comment">// Query params</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/search&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  <span class="hljs-keyword">const</span> query = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">query</span>(<span class="hljs-string">&#x27;q&#x27;</span>)
  <span class="hljs-comment">//     ^?</span>
})

<span class="hljs-comment">// Get all params at once</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/search&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  <span class="hljs-keyword">const</span> { q, limit, offset } = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">query</span>()
  <span class="hljs-comment">//      ^?</span>
})
</code></pre>
<h2 id="queries">queries()</h2>
<p>الحصول على قيم متعددة لوسيط في سلسلة الاستعلام، مثل <code>/search?tags=A&amp;tags=B</code></p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/search&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  <span class="hljs-comment">// tags will be string[]</span>
  <span class="hljs-keyword">const</span> tags = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">queries</span>(<span class="hljs-string">&#x27;tags&#x27;</span>)
  <span class="hljs-comment">//     ^?</span>
  <span class="hljs-comment">// ...</span>
})
</code></pre>
<h2 id="header">header()</h2>
<p>الحصول على قيمة ترويسة الطلب.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> userAgent = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">header</span>(<span class="hljs-string">&#x27;User-Agent&#x27;</span>)
  <span class="hljs-comment">//      ^?</span>
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">\`Your user agent is <span class="hljs-subst">\${userAgent}</span>\`</span>)
})
</code></pre>
<p>عندما <code>c.req.header()</code> تُستدعى بدون وسائط، فإن جميع المفاتيح في السجل (record) المُرجَع تكون <strong>بأحرف صغيرة</strong> (lowercase).</p>
<p>إذا أردت الحصول على قيمة رأس (header) باسم بأحرف كبيرة (uppercase)،
استخدم <code>c.req.header(“X-Foo”)</code>.</p>
<pre><code class="language-ts"><span class="hljs-comment">// ❌ Will not work</span>
<span class="hljs-keyword">const</span> headerRecord = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">header</span>()
<span class="hljs-keyword">const</span> foo = headerRecord[<span class="hljs-string">&#x27;X-Foo&#x27;</span>]

<span class="hljs-comment">// ✅ Will work</span>
<span class="hljs-keyword">const</span> foo = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">header</span>(<span class="hljs-string">&#x27;X-Foo&#x27;</span>)
</code></pre>
<h2 id="parsebody">parseBody()</h2>
<p>تحليل جسم الطلب من نوع <code>multipart/form-data</code> أو <code>application/x-www-form-urlencoded</code></p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/entry&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  <span class="hljs-keyword">const</span> body = <span class="hljs-keyword">await</span> c.<span class="hljs-property">req</span>.<span class="hljs-title function_">parseBody</span>()
  <span class="hljs-comment">// ...</span>
})
</code></pre>
<p><code>parseBody()</code> يدعم السلوكيات التالية.</p>
<p><strong>ملف واحد</strong></p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Context</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">declare</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">c</span>: <span class="hljs-title class_">Context</span>
<span class="hljs-comment">// ---cut---</span>
<span class="hljs-keyword">const</span> body = <span class="hljs-keyword">await</span> c.<span class="hljs-property">req</span>.<span class="hljs-title function_">parseBody</span>()
<span class="hljs-keyword">const</span> data = body[<span class="hljs-string">&#x27;foo&#x27;</span>]
<span class="hljs-comment">//    ^?</span>
</code></pre>
<p><code>body['foo']</code> هو <code>(string | File)</code>.</p>
<p>إذا تم رفع عدة ملفات، فسيُستخدم الأخير.</p>
<h3 id="ملفات-متعددة">ملفات متعددة</h3>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Context</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">declare</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">c</span>: <span class="hljs-title class_">Context</span>
<span class="hljs-comment">// ---cut---</span>
<span class="hljs-keyword">const</span> body = <span class="hljs-keyword">await</span> c.<span class="hljs-property">req</span>.<span class="hljs-title function_">parseBody</span>()
body[<span class="hljs-string">&#x27;foo[]&#x27;</span>]
</code></pre>
<p><code>body['foo[]']</code> دائمًا <code>(string | File)[]</code>.</p>
<p><code>[]</code> اللاحقة مطلوبة.</p>
<h3 id="ملفات-أو-حقول-متعددة-بالاسم-نفسه">ملفات أو حقول متعددة بالاسم نفسه</h3>
<p>إذا كان لديك حقل إدخال يسمح بعدة <code>&lt;input type=&quot;file&quot; multiple /&gt;</code> أو عدة مربعات اختيار بنفس الاسم <code>&lt;input type=&quot;checkbox&quot; name=&quot;favorites&quot; value=&quot;Hono&quot;/&gt;</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Context</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">declare</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">c</span>: <span class="hljs-title class_">Context</span>
<span class="hljs-comment">// ---cut---</span>
<span class="hljs-keyword">const</span> body = <span class="hljs-keyword">await</span> c.<span class="hljs-property">req</span>.<span class="hljs-title function_">parseBody</span>({ <span class="hljs-attr">all</span>: <span class="hljs-literal">true</span> })
body[<span class="hljs-string">&#x27;foo&#x27;</span>]
</code></pre>
<p><code>all</code> الخيار معطّل افتراضيًا.</p>
<ul>
<li>إذا <code>body['foo']</code> ملفات متعددة، فستُحلَّل إلى <code>(string | File)[]</code>.</li>
<li>إذا <code>body['foo']</code> ملف واحد، فسيُحلَّل إلى <code>(string | File)</code>.</li>
</ul>
<h3 id="الترميز-النقطي">الترميز النقطي</h3>
<p>إذا قمت بضبط <code>dot</code> خيار <code>true</code>، تُبنى القيمة المُعادة بناءً على تدوين النقطة (dot notation).</p>
<p>تخيّل استلام البيانات التالية:</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> data = <span class="hljs-keyword">new</span> <span class="hljs-title class_">FormData</span>()
data.<span class="hljs-title function_">append</span>(<span class="hljs-string">&#x27;obj.key1&#x27;</span>, <span class="hljs-string">&#x27;value1&#x27;</span>)
data.<span class="hljs-title function_">append</span>(<span class="hljs-string">&#x27;obj.key2&#x27;</span>, <span class="hljs-string">&#x27;value2&#x27;</span>)
</code></pre>
<p>يمكنك الحصول على القيمة المُهيكَلة بتعيين <code>dot</code> خيار <code>true</code>:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Context</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">declare</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">c</span>: <span class="hljs-title class_">Context</span>
<span class="hljs-comment">// ---cut---</span>
<span class="hljs-keyword">const</span> body = <span class="hljs-keyword">await</span> c.<span class="hljs-property">req</span>.<span class="hljs-title function_">parseBody</span>({ <span class="hljs-attr">dot</span>: <span class="hljs-literal">true</span> })
<span class="hljs-comment">// body is \`{ obj: { key1: &#x27;value1&#x27;, key2: &#x27;value2&#x27; } }\`</span>
</code></pre>
<h2 id="json">json()</h2>
<p>يحلّل جسم الطلب من نوع <code>application/json</code></p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/entry&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  <span class="hljs-keyword">const</span> body = <span class="hljs-keyword">await</span> c.<span class="hljs-property">req</span>.<span class="hljs-title function_">json</span>()
  <span class="hljs-comment">// ...</span>
})
</code></pre>
<h2 id="text">text()</h2>
<p>يحلّل جسم الطلب من نوع <code>text/plain</code></p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/entry&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  <span class="hljs-keyword">const</span> body = <span class="hljs-keyword">await</span> c.<span class="hljs-property">req</span>.<span class="hljs-title function_">text</span>()
  <span class="hljs-comment">// ...</span>
})
</code></pre>
<h2 id="arraybuffer">arrayBuffer()</h2>
<p>يحلل جسم الطلب كـ <code>ArrayBuffer</code></p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/entry&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  <span class="hljs-keyword">const</span> body = <span class="hljs-keyword">await</span> c.<span class="hljs-property">req</span>.<span class="hljs-title function_">arrayBuffer</span>()
  <span class="hljs-comment">// ...</span>
})
</code></pre>
<h2 id="blob">blob()</h2>
<p>يحلل جسم الطلب كـ <code>Blob</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/entry&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  <span class="hljs-keyword">const</span> body = <span class="hljs-keyword">await</span> c.<span class="hljs-property">req</span>.<span class="hljs-title function_">blob</span>()
  <span class="hljs-comment">// ...</span>
})
</code></pre>
<h2 id="formdata">formData()</h2>
<p>يحلل جسم الطلب كـ <code>FormData</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/entry&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  <span class="hljs-keyword">const</span> body = <span class="hljs-keyword">await</span> c.<span class="hljs-property">req</span>.<span class="hljs-title function_">formData</span>()
  <span class="hljs-comment">// ...</span>
})
</code></pre>
<h2 id="valid">valid()</h2>
<p>احصل على البيانات المُتحقَّق منها.</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/posts&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  <span class="hljs-keyword">const</span> { title, body } = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">valid</span>(<span class="hljs-string">&#x27;form&#x27;</span>)
  <span class="hljs-comment">// ...</span>
})
</code></pre>
<p>الأهداف المتاحة أدناه.</p>
<ul>
<li><code>form</code></li>
<li><code>json</code></li>
<li><code>query</code></li>
<li><code>header</code></li>
<li><code>cookie</code></li>
<li><code>param</code></li>
</ul>
<p>انظر <a href="https://hono.dev/docs/guides/validation">قسم التحقق</a> للاطلاع على أمثلة الاستخدام.</p>
<h2 id="routepath">routePath</h2>
<p><strong>مهجور في v4.8.0</strong>: هذه الخاصية مهجورة. استخدم <code>routePath()</code> من <a href="https://hono.dev/docs/helpers/route">مساعد <code>Route</code></a> بدلاً من ذلك.</p>
<p>يمكنك استرجاع المسار المُسجَّل داخل المعالج (handler) على النحو التالي:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/posts/:id&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">path</span>: c.<span class="hljs-property">req</span>.<span class="hljs-property">routePath</span> })
})
</code></pre>
<p>إذا وصلت إلى <code>/posts/123</code>، سيعيد <code>/posts/:id</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span> <span class="hljs-attr">&quot;path&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;/posts/:id&quot;</span> <span class="hljs-punctuation">}</span>
</code></pre>
<h2 id="matchedroutes">matchedRoutes</h2>
<p><strong>مهجور في v4.8.0</strong>: هذه الخاصية مهجورة. استخدم <code>matchedRoutes()</code> من <a href="https://hono.dev/docs/helpers/route">مساعد <code>Route</code></a> بدلاً من ذلك.</p>
<p>يعيد المسارات المتطابقة داخل المعالج (handler)، وهو أمر مفيد لتصحيح الأخطاء (debugging).</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">use</span>(<span class="hljs-keyword">async</span> <span class="hljs-keyword">function</span> <span class="hljs-title function_">logger</span>(<span class="hljs-params">c, next</span>) {
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>()
  c.<span class="hljs-property">req</span>.<span class="hljs-property">matchedRoutes</span>.<span class="hljs-title function_">forEach</span>(<span class="hljs-function">(<span class="hljs-params">{ handler, method, path }, i</span>) =&gt;</span> {
    <span class="hljs-keyword">const</span> name =
      handler.<span class="hljs-property">name</span> ||
      (handler.<span class="hljs-property">length</span> &lt; <span class="hljs-number">2</span> ? <span class="hljs-string">&#x27;[handler]&#x27;</span> : <span class="hljs-string">&#x27;[middleware]&#x27;</span>)
    <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(
      method,
      <span class="hljs-string">&#x27; &#x27;</span>,
      path,
      <span class="hljs-string">&#x27; &#x27;</span>.<span class="hljs-title function_">repeat</span>(<span class="hljs-title class_">Math</span>.<span class="hljs-title function_">max</span>(<span class="hljs-number">10</span> - path.<span class="hljs-property">length</span>, <span class="hljs-number">0</span>)),
      name,
      i === c.<span class="hljs-property">req</span>.<span class="hljs-property">routeIndex</span> ? <span class="hljs-string">&#x27;&lt;- respond from here&#x27;</span> : <span class="hljs-string">&#x27;&#x27;</span>
    )
  })
})
</code></pre>
<h2 id="path">path</h2>
<p>مسار الطلب.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/about/me&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  <span class="hljs-keyword">const</span> pathname = c.<span class="hljs-property">req</span>.<span class="hljs-property">path</span> <span class="hljs-comment">// \`/about/me\`</span>
  <span class="hljs-comment">// ...</span>
})
</code></pre>
<h2 id="url">url</h2>
<p>سلاسل عنوان URL للطلب.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/about/me&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  <span class="hljs-keyword">const</span> url = c.<span class="hljs-property">req</span>.<span class="hljs-property">url</span> <span class="hljs-comment">// \`http://localhost:8787/about/me\`</span>
  <span class="hljs-comment">// ...</span>
})
</code></pre>
<h2 id="method">method</h2>
<p>اسم طريقة الطلب.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/about/me&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  <span class="hljs-keyword">const</span> method = c.<span class="hljs-property">req</span>.<span class="hljs-property">method</span> <span class="hljs-comment">// \`GET\`</span>
  <span class="hljs-comment">// ...</span>
})
</code></pre>
<h2 id="raw">raw</h2>
<p>الخام <a href="https://developer.mozilla.org/en-US/docs/Web/API/Request"><code>Request</code></a> كائن.</p>
<pre><code class="language-ts"><span class="hljs-comment">// For Cloudflare Workers</span>
app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  <span class="hljs-keyword">const</span> metadata = c.<span class="hljs-property">req</span>.<span class="hljs-property">raw</span>.<span class="hljs-property">cf</span>?.<span class="hljs-property">hostMetadata</span>?
  <span class="hljs-comment">// ...</span>
})
</code></pre>
<h2 id="clonerawrequest">cloneRawRequest()</h2>
<p>يستنسخ كائن Request الخام من HonoRequest. يعمل حتى بعد استهلاك نص الطلب بواسطة أدوات التحقق أو طرق HonoRequest.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

<span class="hljs-keyword">import</span> { cloneRawRequest } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/request&#x27;</span>
<span class="hljs-keyword">import</span> { validator } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/validator&#x27;</span>

app.<span class="hljs-title function_">post</span>(
  <span class="hljs-string">&#x27;/forward&#x27;</span>,
  <span class="hljs-title function_">validator</span>(<span class="hljs-string">&#x27;json&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">data</span>) =&gt;</span> data),
  <span class="hljs-title function_">async</span> (c) =&gt; {
    <span class="hljs-comment">// Clone after validation</span>
    <span class="hljs-keyword">const</span> clonedReq = <span class="hljs-keyword">await</span> <span class="hljs-title function_">cloneRawRequest</span>(c.<span class="hljs-property">req</span>)
    <span class="hljs-comment">// Does not throw the error</span>
    <span class="hljs-keyword">await</span> clonedReq.<span class="hljs-title function_">json</span>()
    <span class="hljs-comment">// ...</span>
  }
)
</code></pre>
`,e={book:s,chapter:"api",chapterTitle:a,slug:n,title:p,headings:l,html:t};export{s as book,c as chapter,a as chapterTitle,e as default,l as headings,t as html,n as slug,p as title};
