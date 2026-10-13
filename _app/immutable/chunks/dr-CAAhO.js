const s="hono",n="guides",a="الأدلة",p="best-practices",l="أفضل الممارسات",t=[{depth:2,id:"لا-تنشئ-quotcontrollersquot-عندما-يكون-ذلك-ممكنا",text:"لا تُنشئ &quot;Controllers&quot; عندما يكون ذلك ممكنًا"},{depth:2,id:"factorycreatehandlers-في-honofactory",text:"factory.createHandlers() في hono/factory"},{depth:2,id:"بناء-تطبيق-أكبر",text:"بناء تطبيق أكبر"},{depth:3,id:"إذا-كنت-تريد-استخدام-ميزات-rpc",text:"إذا كنت تريد استخدام ميزات RPC"},{depth:2,id:"أفضل-ممارسات-طلبات-head",text:"أفضل ممارسات طلبات HEAD"},{depth:3,id:"فهم-معالجة-head-في-hono",text:"فهم معالجة HEAD في Hono"},{depth:3,id:"افعل-استخدم-مسارات-get-لطلبات-head",text:"✅ افعل: استخدم مسارات GET لطلبات HEAD"},{depth:3,id:"افعل-استخدم-برمجية-وسيطة-لمنطق-خاص-بـ-head",text:"✅ افعل: استخدم برمجية وسيطة لمنطق خاص بـ HEAD"},{depth:3,id:"لا-تفعل-محاولة-إنشاء-معالجات-head-مخصصة",text:"❌ لا تفعل: محاولة إنشاء معالجات HEAD مخصّصة"},{depth:3,id:"اعتبارات-الأداء",text:"اعتبارات الأداء"},{depth:3,id:"اختبار-طلبات-head",text:"اختبار طلبات HEAD"},{depth:3,id:"ملاحظات",text:"ملاحظات"}],c=`<p>Hono مرن جداً. يمكنك كتابة تطبيقك كما تشاء.
ومع ذلك، هناك أفضل الممارسات التي يُفضّل اتباعها.</p>
<h2 id="لا-تنشئ-quotcontrollersquot-عندما-يكون-ذلك-ممكنا">لا تُنشئ &quot;Controllers&quot; عندما يكون ذلك ممكنًا</h2>
<p>عند الإمكان، يجب ألا تنشئ &quot;وحدات تحكم (Controllers) شبيهة بـ Ruby on Rails&quot;.</p>
<pre><code class="language-ts"><span class="hljs-comment">// 🙁</span>
<span class="hljs-comment">// A RoR-like Controller</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">booksList</span> = (<span class="hljs-params"><span class="hljs-attr">c</span>: <span class="hljs-title class_">Context</span></span>) =&gt; {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>(<span class="hljs-string">&#x27;list books&#x27;</span>)
}

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/books&#x27;</span>, booksList)
</code></pre>
<p>المشكلة متعلقة بالأنواع. على سبيل المثال، لا يمكن استنتاج معامل المسار في وحدة التحكم (Controller) دون كتابة أنواع عامة (generics) معقدة.</p>
<pre><code class="language-ts"><span class="hljs-comment">// 🙁</span>
<span class="hljs-comment">// A RoR-like Controller</span>
<span class="hljs-keyword">const</span> <span class="hljs-title function_">bookPermalink</span> = (<span class="hljs-params"><span class="hljs-attr">c</span>: <span class="hljs-title class_">Context</span></span>) =&gt; {
  <span class="hljs-keyword">const</span> id = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">param</span>(<span class="hljs-string">&#x27;id&#x27;</span>) <span class="hljs-comment">// Can&#x27;t infer the path param</span>
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>(<span class="hljs-string">\`get <span class="hljs-subst">\${id}</span>\`</span>)
}
</code></pre>
<p>لذلك، لا تحتاج إلى إنشاء وحدات تحكم (controllers) بأسلوب RoR ويجب كتابة المعالجات (handlers) مباشرة بعد تعريفات المسار.</p>
<pre><code class="language-ts"><span class="hljs-comment">// 😃</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/books/:id&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> id = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">param</span>(<span class="hljs-string">&#x27;id&#x27;</span>) <span class="hljs-comment">// Can infer the path param</span>
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>(<span class="hljs-string">\`get <span class="hljs-subst">\${id}</span>\`</span>)
})
</code></pre>
<h2 id="factorycreatehandlers-في-honofactory"><code>factory.createHandlers()</code> في <code>hono/factory</code></h2>
<p>إذا كنت لا تزال تريد إنشاء متحكّم (Controller) شبيه بـ RoR، فاستخدم <code>factory.createHandlers()</code> في <a href="https://hono.dev/docs/helpers/factory"><code>hono/factory</code></a>. إذا استخدمت هذا، سيعمل استنتاج الأنواع (type inference) بشكل صحيح.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { createFactory } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/factory&#x27;</span>
<span class="hljs-keyword">import</span> { logger } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/logger&#x27;</span>

<span class="hljs-comment">// ...</span>

<span class="hljs-comment">// 😃</span>
<span class="hljs-keyword">const</span> factory = <span class="hljs-title function_">createFactory</span>()

<span class="hljs-keyword">const</span> middleware = factory.<span class="hljs-title function_">createMiddleware</span>(<span class="hljs-title function_">async</span> (c, next) =&gt; {
  c.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;foo&#x27;</span>, <span class="hljs-string">&#x27;bar&#x27;</span>)
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>()
})

<span class="hljs-keyword">const</span> handlers = factory.<span class="hljs-title function_">createHandlers</span>(<span class="hljs-title function_">logger</span>(), middleware, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>(c.<span class="hljs-property">var</span>.<span class="hljs-property">foo</span>)
})

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api&#x27;</span>, ...handlers)
</code></pre>
<h2 id="بناء-تطبيق-أكبر">بناء تطبيق أكبر</h2>
<p>استخدم <code>app.route()</code> لبناء تطبيق أكبر دون إنشاء &quot;وحدات تحكم بأسلوب Ruby on Rails&quot;.</p>
<p>إذا كان تطبيقك يحتوي على <code>/authors</code> و <code>/books</code> نقاط النهاية وأردت فصل الملفات عن <code>index.ts</code>، أنشئ <code>authors.ts</code> و <code>books.ts</code>.</p>
<pre><code class="language-ts"><span class="hljs-comment">// authors.ts</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">json</span>(<span class="hljs-string">&#x27;list authors&#x27;</span>))
app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">json</span>(<span class="hljs-string">&#x27;create an author&#x27;</span>, <span class="hljs-number">201</span>))
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/:id&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">json</span>(<span class="hljs-string">\`get <span class="hljs-subst">\${c.req.param(<span class="hljs-string">&#x27;id&#x27;</span>)}</span>\`</span>))

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> app
</code></pre>
<pre><code class="language-ts"><span class="hljs-comment">// books.ts</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">json</span>(<span class="hljs-string">&#x27;list books&#x27;</span>))
app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">json</span>(<span class="hljs-string">&#x27;create a book&#x27;</span>, <span class="hljs-number">201</span>))
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/:id&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">json</span>(<span class="hljs-string">\`get <span class="hljs-subst">\${c.req.param(<span class="hljs-string">&#x27;id&#x27;</span>)}</span>\`</span>))

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> app
</code></pre>
<p>ثم استوردها وثبّتها على المسارات <code>/authors</code> و <code>/books</code> مع <code>app.route()</code>.</p>
<pre><code class="language-ts"><span class="hljs-comment">// index.ts</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> authors <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./authors&#x27;</span>
<span class="hljs-keyword">import</span> books <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./books&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

<span class="hljs-comment">// 😃</span>
app.<span class="hljs-title function_">route</span>(<span class="hljs-string">&#x27;/authors&#x27;</span>, authors)
app.<span class="hljs-title function_">route</span>(<span class="hljs-string">&#x27;/books&#x27;</span>, books)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> app
</code></pre>
<h3 id="إذا-كنت-تريد-استخدام-ميزات-rpc">إذا كنت تريد استخدام ميزات RPC</h3>
<p>يعمل الكود أعلاه جيدًا لحالات الاستخدام العادية.
ومع ذلك، إذا كنت تريد استخدام <code>RPC</code> ميزة، يمكنك الحصول على النوع الصحيح عبر التسلسل (chaining) كما يلي.</p>
<pre><code class="language-ts"><span class="hljs-comment">// authors.ts</span>
<span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
  .<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">json</span>(<span class="hljs-string">&#x27;list authors&#x27;</span>))
  .<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">json</span>(<span class="hljs-string">&#x27;create an author&#x27;</span>, <span class="hljs-number">201</span>))
  .<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/:id&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">json</span>(<span class="hljs-string">\`get <span class="hljs-subst">\${c.req.param(<span class="hljs-string">&#x27;id&#x27;</span>)}</span>\`</span>))

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> app
<span class="hljs-keyword">export</span> <span class="hljs-keyword">type</span> <span class="hljs-title class_">AppType</span> = <span class="hljs-keyword">typeof</span> app
</code></pre>
<p>إذا مرّرتَ نوع <code>app</code> إلى <code>hc</code>، فسيحصل على النوع الصحيح.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">AppType</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;./authors&#x27;</span>
<span class="hljs-keyword">import</span> { hc } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/client&#x27;</span>

<span class="hljs-comment">// 😃</span>
<span class="hljs-keyword">const</span> client = hc&lt;<span class="hljs-title class_">AppType</span>&gt;(<span class="hljs-string">&#x27;http://localhost&#x27;</span>) <span class="hljs-comment">// Typed correctly</span>
</code></pre>
<p>لمزيد من المعلومات التفصيلية، راجع <a href="https://hono.dev/docs/guides/rpc#using-rpc-with-larger-applications">صفحة <code>RPC</code></a>.</p>
<h2 id="أفضل-ممارسات-طلبات-head">أفضل ممارسات طلبات HEAD</h2>
<h3 id="فهم-معالجة-head-في-hono">فهم معالجة HEAD في Hono</h3>
<p>يتعامل Hono تلقائيًا مع طلبات HEAD بتحويلها إلى طلبات GET وإزالة نص الاستجابة. هذا السلوك مدمج في طبقة التوزيع (dispatch) الخاصة بالإطار ويحدث قبل إجراء مطابقة المسار.</p>
<h3 id="افعل-استخدم-مسارات-get-لطلبات-head">✅ افعل: استخدم مسارات GET لطلبات HEAD</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// GOOD: This GET route automatically handles HEAD requests</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api/users&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  <span class="hljs-keyword">const</span> users = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getUsers</span>()
  c.<span class="hljs-title function_">header</span>(<span class="hljs-string">&#x27;X-Total-Count&#x27;</span>, users.<span class="hljs-property">length</span>.<span class="hljs-title function_">toString</span>())
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>(users)
})

<span class="hljs-comment">// HEAD /api/users will return:</span>
<span class="hljs-comment">// - Same headers as GET (including X-Total-Count)</span>
<span class="hljs-comment">// - Status 200</span>
<span class="hljs-comment">// - No body (null)</span>
</code></pre>
<h3 id="افعل-استخدم-برمجية-وسيطة-لمنطق-خاص-بـ-head">✅ افعل: استخدم برمجية وسيطة لمنطق خاص بـ HEAD</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// GOOD: Use middleware when HEAD needs different behavior</span>
app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&#x27;/api/resource&#x27;</span>, <span class="hljs-title function_">async</span> (c, next) =&gt; {
  <span class="hljs-keyword">await</span> <span class="hljs-title function_">next</span>()

  <span class="hljs-comment">// Add HEAD-specific headers after the handler</span>
  <span class="hljs-keyword">if</span> (c.<span class="hljs-property">req</span>.<span class="hljs-property">method</span> === <span class="hljs-string">&#x27;HEAD&#x27;</span>) {
    c.<span class="hljs-title function_">header</span>(<span class="hljs-string">&#x27;X-HEAD-Processed&#x27;</span>, <span class="hljs-string">&#x27;true&#x27;</span>)
    <span class="hljs-comment">// Don&#x27;t compute expensive body content for HEAD</span>
    c.<span class="hljs-property">res</span> = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Response</span>(<span class="hljs-literal">null</span>, c.<span class="hljs-property">res</span>)
  }
})
</code></pre>
<h3 id="لا-تفعل-محاولة-إنشاء-معالجات-head-مخصصة">❌ لا تفعل: محاولة إنشاء معالجات HEAD مخصّصة</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// BAD: This won&#x27;t work as expected</span>
app.<span class="hljs-title function_">head</span>(<span class="hljs-string">&#x27;/api/users&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-comment">// This handler will NEVER be called</span>
  c.<span class="hljs-title function_">header</span>(<span class="hljs-string">&#x27;X-Custom&#x27;</span>, <span class="hljs-string">&#x27;value&#x27;</span>)
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;ignored&#x27;</span>)
})

<span class="hljs-comment">// BAD: Using on() also won&#x27;t work</span>
app.<span class="hljs-title function_">on</span>(<span class="hljs-string">&#x27;HEAD&#x27;</span>, <span class="hljs-string">&#x27;/api/users&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-comment">// Still converted to GET before route matching</span>
})
</code></pre>
<h3 id="اعتبارات-الأداء">اعتبارات الأداء</h3>
<ul>
<li><strong>تجنب العمليات المكلفة في معالجات GET إذا كنت تتوقع العديد من طلبات HEAD</strong>: استخدم وسيطًا لاكتشاف HEAD وتخطي توليد النص (body)</li>
<li><strong>تعمل ترويسات التخزين المؤقت بشكل مماثل</strong>: تحترم استجابات HEAD نفس قواعد التخزين المؤقت مثل GET</li>
<li><strong>توافق الوسائط (Middleware compatibility)</strong>: تعمل معظم الوسائط مع HEAD، لكن وسائط معالجة النص (مثل الضغط) تتخطى طلبات HEAD تلقائيًا</li>
</ul>
<h3 id="اختبار-طلبات-head">اختبار طلبات HEAD</h3>
<pre><code class="language-typescript"><span class="hljs-comment">// Always test both GET and HEAD responses</span>
<span class="hljs-title function_">it</span>(<span class="hljs-string">&#x27;handles HEAD requests correctly&#x27;</span>, <span class="hljs-title function_">async</span> () =&gt; {
  <span class="hljs-keyword">const</span> getRes = <span class="hljs-keyword">await</span> app.<span class="hljs-title function_">request</span>(<span class="hljs-string">&#x27;/api/users&#x27;</span>)
  <span class="hljs-keyword">const</span> headRes = <span class="hljs-keyword">await</span> app.<span class="hljs-title function_">request</span>(<span class="hljs-string">&#x27;/api/users&#x27;</span>, { <span class="hljs-attr">method</span>: <span class="hljs-string">&#x27;HEAD&#x27;</span> })

  <span class="hljs-title function_">expect</span>(headRes.<span class="hljs-property">status</span>).<span class="hljs-title function_">toBe</span>(getRes.<span class="hljs-property">status</span>)
  <span class="hljs-title function_">expect</span>(headRes.<span class="hljs-property">headers</span>.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;X-Total-Count&#x27;</span>)).<span class="hljs-title function_">toBe</span>(
    getRes.<span class="hljs-property">headers</span>.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;X-Total-Count&#x27;</span>)
  )
  <span class="hljs-title function_">expect</span>(headRes.<span class="hljs-property">body</span>).<span class="hljs-title function_">toBe</span>(<span class="hljs-literal">null</span>)
})
</code></pre>
<h3 id="ملاحظات">ملاحظات</h3>
<ul>
<li>يضمن التحويل التلقائي إلى HEAD اتساق الترويسات بين استجابات GET و HEAD</li>
<li>هذا السلوك متسق عبر جميع بيئات تشغيل Hono (Cloudflare Workers و Deno و Bun و Node.js)</li>
<li>إذا كنت بحاجة إلى منطق مختلف تمامًا لـ HEAD مقابل GET، ففكر في استخدام نقاط نهاية (endpoints) مختلفة بدلًا من محاولة تجاوز معالجة HEAD الخاصة بالإطار (framework)</li>
</ul>
`,e={book:s,chapter:n,chapterTitle:a,slug:p,title:l,headings:t,html:c};export{s as book,n as chapter,a as chapterTitle,e as default,t as headings,c as html,p as slug,l as title};
