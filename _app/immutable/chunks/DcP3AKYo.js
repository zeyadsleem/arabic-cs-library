const s="hono",t="api",n="مرجع الواجهة",a="exception",e="`HTTPException`",p=[{depth:2,id:"رمي-httpexceptions",text:"رمي HTTPExceptions"},{depth:3,id:"رسالة-مخصصة",text:"رسالة مخصصة"},{depth:3,id:"استجابة-مخصصة",text:"استجابة مخصصة"},{depth:3,id:"السبب",text:"السبب"},{depth:2,id:"معالجة-httpexceptions",text:"معالجة HTTPExceptions"}],l=`<p>عند حدوث خطأ فادح (fatal error)، قد يُلقي Hono (والعديد من وسائط النظام البيئي) خطأً <code>HTTPException</code>. هذه برمجية Hono وسيطة مخصصة <code>Error</code> الذي يبسِّط <a href="#handling-httpexceptions">إرجاع استجابات الأخطاء</a>.</p>
<h2 id="رمي-httpexceptions">رمي HTTPExceptions</h2>
<p>يمكنك إلقاء استثناءات HTTP الخاصة بك (HTTPExceptions) عن طريق تحديد رمز حالة، وإما رسالة أو استجابة مخصصة.</p>
<h3 id="رسالة-مخصصة">رسالة مخصصة</h3>
<p>للاستخدام الأساسي <code>text</code> الاستجابات، ما عليك سوى تعيين الخطأ <code>message</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">HTTPException</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/http-exception&#x27;</span>

<span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">HTTPException</span>(<span class="hljs-number">401</span>, { <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Unauthorized&#x27;</span> })
</code></pre>
<h3 id="استجابة-مخصصة">استجابة مخصصة</h3>
<p>لأنواع استجابات أخرى، أو لضبط ترويسات الاستجابة (response headers)، استخدم <code>res</code> خيار. <em>لاحظ أن الحالة التي يتم تمريرها إلى المُنشئ (constructor) هي المستخدمة لإنشاء الاستجابات.</em></p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">HTTPException</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/http-exception&#x27;</span>

<span class="hljs-keyword">const</span> errorResponse = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Response</span>(<span class="hljs-string">&#x27;Unauthorized&#x27;</span>, {
  <span class="hljs-attr">status</span>: <span class="hljs-number">401</span>, <span class="hljs-comment">// this gets ignored</span>
  <span class="hljs-attr">headers</span>: {
    <span class="hljs-title class_">Authenticate</span>: <span class="hljs-string">&#x27;error=&quot;invalid_token&quot;&#x27;</span>,
  },
})

<span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">HTTPException</span>(<span class="hljs-number">401</span>, { <span class="hljs-attr">res</span>: errorResponse })
</code></pre>
<h3 id="السبب">السبب</h3>
<p>في كلتا الحالتين، يمكنك استخدام <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/cause"><code>cause</code></a> الخيار لإضافة بيانات عشوائية إلى HTTPException.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span>, <span class="hljs-title class_">Context</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">HTTPException</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/http-exception&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-keyword">declare</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">message</span>: <span class="hljs-built_in">string</span>
<span class="hljs-keyword">declare</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">authorize</span>: <span class="hljs-function">(<span class="hljs-params"><span class="hljs-attr">c</span>: <span class="hljs-title class_">Context</span></span>) =&gt;</span> <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">void</span>&gt;
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/login&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  <span class="hljs-keyword">try</span> {
    <span class="hljs-keyword">await</span> <span class="hljs-title function_">authorize</span>(c)
  } <span class="hljs-keyword">catch</span> (cause) {
    <span class="hljs-keyword">throw</span> <span class="hljs-keyword">new</span> <span class="hljs-title class_">HTTPException</span>(<span class="hljs-number">401</span>, { message, cause })
  }
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">redirect</span>(<span class="hljs-string">&#x27;/&#x27;</span>)
})
</code></pre>
<h2 id="معالجة-httpexceptions">معالجة HTTPExceptions</h2>
<p>يمكنك معالجة HTTPExceptions غير المُلتقَطة باستخدام <a href="https://hono.dev/docs/api/hono#error-handling"><code>app.onError</code></a>. تتضمن <code>getResponse</code> دالة تُعيد <code>Response</code> المُنشأة من الخطأ <code>status</code>، وإما الخطأ <code>message</code>، أو <a href="#custom-response">استجابة مخصصة</a> المعيّن عند رفع الخطأ.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">HTTPException</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/http-exception&#x27;</span>

<span class="hljs-comment">// ...</span>

app.<span class="hljs-title function_">onError</span>(<span class="hljs-function">(<span class="hljs-params">err, c</span>) =&gt;</span> {
  <span class="hljs-keyword">if</span> (err <span class="hljs-keyword">instanceof</span> <span class="hljs-title class_">HTTPException</span>) {
    <span class="hljs-comment">// Return the error response generated by HTTPException</span>
    <span class="hljs-keyword">return</span> err.<span class="hljs-title function_">getResponse</span>()
  }
  <span class="hljs-comment">// For any other unexpected errors, log and return a generic 500 response</span>
  <span class="hljs-variable language_">console</span>.<span class="hljs-title function_">error</span>(err)
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Internal Server Error&#x27;</span>, <span class="hljs-number">500</span>)
})
</code></pre>
<p><strong><code>HTTPException.getResponse</code> لا يعلم بـ <code>Context</code></strong>. لتضمين الترويسات المعيّنة مسبقًا في <code>Context</code>، يجب عليك تطبيقها على <code>Response</code>.</p>
`,c={book:s,chapter:"api",chapterTitle:n,slug:a,title:e,headings:p,html:l};export{s as book,t as chapter,n as chapterTitle,c as default,p as headings,l as html,a as slug,e as title};
