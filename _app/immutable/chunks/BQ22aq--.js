const s="hono",c="api",n="مرجع الواجهة",a="routing",p="التوجيه",l=[{depth:2,id:"أساسي",text:"أساسي"},{depth:2,id:"معامل-المسار",text:"معامل المسار"},{depth:2,id:"معامل-اختياري",text:"معامل اختياري"},{depth:2,id:"regexp",text:"Regexp"},{depth:2,id:"تضمين-الشرطات-المائلة",text:"تضمين الشرطات المائلة"},{depth:2,id:"مسار-متسلسل",text:"مسار متسلسل"},{depth:2,id:"التجميع",text:"التجميع"},{depth:2,id:"التجميع-دون-تغيير-المسار-الأساسي",text:"التجميع دون تغيير المسار الأساسي"},{depth:2,id:"المسار-الأساسي",text:"المسار الأساسي"},{depth:2,id:"التوجيه-باستخدام-اسم-المضيف",text:"التوجيه باستخدام اسم المضيف"},{depth:2,id:"التوجيه-باستخدام-host-قيمة-الترويسة",text:"التوجيه باستخدام host قيمة الترويسة"},{depth:2,id:"أولوية-التوجيه",text:"أولوية التوجيه"},{depth:2,id:"ترتيب-التجميع",text:"ترتيب التجميع"}],t=`<p>توجيه Hono مرن وبديهي.
لنلقِ نظرة.</p>
<h2 id="أساسي">أساسي</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
<span class="hljs-comment">// HTTP Methods</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;GET /&#x27;</span>))
app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;POST /&#x27;</span>))
app.<span class="hljs-title function_">put</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;PUT /&#x27;</span>))
app.<span class="hljs-title function_">delete</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;DELETE /&#x27;</span>))
app.<span class="hljs-title function_">query</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;QUERY /&#x27;</span>))

<span class="hljs-comment">// Wildcard</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/wild/*/card&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;GET /wild/*/card&#x27;</span>)
})

<span class="hljs-comment">// Any HTTP methods</span>
app.<span class="hljs-title function_">all</span>(<span class="hljs-string">&#x27;/hello&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Any Method /hello&#x27;</span>))

<span class="hljs-comment">// Custom HTTP method</span>
app.<span class="hljs-title function_">on</span>(<span class="hljs-string">&#x27;PURGE&#x27;</span>, <span class="hljs-string">&#x27;/cache&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;PURGE Method /cache&#x27;</span>))

<span class="hljs-comment">// Multiple Method</span>
app.<span class="hljs-title function_">on</span>([<span class="hljs-string">&#x27;PUT&#x27;</span>, <span class="hljs-string">&#x27;DELETE&#x27;</span>], <span class="hljs-string">&#x27;/post&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span>
  c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;PUT or DELETE /post&#x27;</span>)
)

<span class="hljs-comment">// Multiple Paths</span>
app.<span class="hljs-title function_">on</span>(<span class="hljs-string">&#x27;GET&#x27;</span>, [<span class="hljs-string">&#x27;/hello&#x27;</span>, <span class="hljs-string">&#x27;/ja/hello&#x27;</span>, <span class="hljs-string">&#x27;/en/hello&#x27;</span>], <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span>
  c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Hello&#x27;</span>)
)
</code></pre>
<h2 id="معامل-المسار">معامل المسار</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/user/:name&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  <span class="hljs-keyword">const</span> name = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">param</span>(<span class="hljs-string">&#x27;name&#x27;</span>)
  <span class="hljs-comment">//       ^?</span>
  <span class="hljs-comment">// ...</span>
})
</code></pre>
<p>أو جميع المعاملات دفعة واحدة:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/posts/:id/comment/:comment_id&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  <span class="hljs-keyword">const</span> { id, comment_id } = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">param</span>()
  <span class="hljs-comment">//       ^?</span>
  <span class="hljs-comment">// ...</span>
})
</code></pre>
<h2 id="معامل-اختياري">معامل اختياري</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
<span class="hljs-comment">// Will match \`/api/animal\` and \`/api/animal/:type\`</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api/animal/:type?&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Animal!&#x27;</span>))
</code></pre>
<h2 id="regexp">Regexp</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/post/:date{[0-9]+}/:title{[a-z]+}&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  <span class="hljs-keyword">const</span> { date, title } = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">param</span>()
  <span class="hljs-comment">//       ^?</span>
  <span class="hljs-comment">// ...</span>
})
</code></pre>
<h2 id="تضمين-الشرطات-المائلة">تضمين الشرطات المائلة</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/posts/:filename{.+\\\\.png}&#x27;</span>, <span class="hljs-title function_">async</span> (c) =&gt; {
  <span class="hljs-comment">//...</span>
})
</code></pre>
<h2 id="مسار-متسلسل">مسار متسلسل</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app
  .<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/endpoint&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;GET /endpoint&#x27;</span>)
  })
  .<span class="hljs-title function_">post</span>(<span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;POST /endpoint&#x27;</span>)
  })
  .<span class="hljs-title function_">delete</span>(<span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
    <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;DELETE /endpoint&#x27;</span>)
  })
</code></pre>
<h2 id="التجميع">التجميع</h2>
<p>يمكنك تجميع المسارات مع نسخة Hono وإضافتها إلى التطبيق الرئيسي باستخدام طريقة route.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-comment">// ---cut---</span>
<span class="hljs-keyword">const</span> book = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

book.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;List Books&#x27;</span>)) <span class="hljs-comment">// GET /book</span>
book.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/:id&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-comment">// GET /book/:id</span>
  <span class="hljs-keyword">const</span> id = c.<span class="hljs-property">req</span>.<span class="hljs-title function_">param</span>(<span class="hljs-string">&#x27;id&#x27;</span>)
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Get Book: &#x27;</span> + id)
})
book.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Create Book&#x27;</span>)) <span class="hljs-comment">// POST /book</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
app.<span class="hljs-title function_">route</span>(<span class="hljs-string">&#x27;/book&#x27;</span>, book)
</code></pre>
<h2 id="التجميع-دون-تغيير-المسار-الأساسي">التجميع دون تغيير المسار الأساسي</h2>
<p>يمكنك أيضاً تجميع عدة نسخ (instances) مع الحفاظ على الأساس (base).</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-comment">// ---cut---</span>
<span class="hljs-keyword">const</span> book = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
book.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/book&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;List Books&#x27;</span>)) <span class="hljs-comment">// GET /book</span>
book.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/book&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Create Book&#x27;</span>)) <span class="hljs-comment">// POST /book</span>

<span class="hljs-keyword">const</span> user = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>().<span class="hljs-title function_">basePath</span>(<span class="hljs-string">&#x27;/user&#x27;</span>)
user.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;List Users&#x27;</span>)) <span class="hljs-comment">// GET /user</span>
user.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;Create User&#x27;</span>)) <span class="hljs-comment">// POST /user</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
app.<span class="hljs-title function_">route</span>(<span class="hljs-string">&#x27;/&#x27;</span>, book) <span class="hljs-comment">// Handle /book</span>
app.<span class="hljs-title function_">route</span>(<span class="hljs-string">&#x27;/&#x27;</span>, user) <span class="hljs-comment">// Handle /user</span>
</code></pre>
<h2 id="المسار-الأساسي">المسار الأساسي</h2>
<p>يمكنك تحديد المسار الأساسي.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-comment">// ---cut---</span>
<span class="hljs-keyword">const</span> api = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>().<span class="hljs-title function_">basePath</span>(<span class="hljs-string">&#x27;/api&#x27;</span>)
api.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/book&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;List Books&#x27;</span>)) <span class="hljs-comment">// GET /api/book</span>
</code></pre>
<h2 id="التوجيه-باستخدام-اسم-المضيف">التوجيه باستخدام اسم المضيف</h2>
<p>يعمل بشكل جيد إذا تضمّن اسم مضيف.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-comment">// ---cut---</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>({
  <span class="hljs-attr">getPath</span>: <span class="hljs-function">(<span class="hljs-params">req</span>) =&gt;</span> req.<span class="hljs-property">url</span>.<span class="hljs-title function_">replace</span>(<span class="hljs-regexp">/^https?:\\/([^?]+).*$/</span>, <span class="hljs-string">&#x27;$1&#x27;</span>),
})

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/www1.example.com/hello&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;hello www1&#x27;</span>))
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/www2.example.com/hello&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;hello www2&#x27;</span>))
</code></pre>
<h2 id="التوجيه-باستخدام-host-قيمة-الترويسة">التوجيه باستخدام <code>host</code> قيمة الترويسة</h2>
<p>يمكن لـ Hono التعامل مع <code>host</code> قيمة الترويسة إذا عيّنت <code>getPath()</code> الدالة في مُنشئ Hono.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-comment">// ---cut---</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>({
  <span class="hljs-attr">getPath</span>: <span class="hljs-function">(<span class="hljs-params">req</span>) =&gt;</span>
    <span class="hljs-string">&#x27;/&#x27;</span> +
    req.<span class="hljs-property">headers</span>.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;host&#x27;</span>) +
    req.<span class="hljs-property">url</span>.<span class="hljs-title function_">replace</span>(<span class="hljs-regexp">/^https?:\\/\\/[^/]+(\\/[^?]*).*/</span>, <span class="hljs-string">&#x27;$1&#x27;</span>),
})

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/www1.example.com/hello&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;hello www1&#x27;</span>))

<span class="hljs-comment">// A following request will match the route:</span>
<span class="hljs-comment">// new Request(&#x27;http://www1.example.com/hello&#x27;, {</span>
<span class="hljs-comment">//  headers: { host: &#x27;www1.example.com&#x27; },</span>
<span class="hljs-comment">// })</span>
</code></pre>
<p>من خلال تطبيق هذا، على سبيل المثال، يمكنك تغيير التوجيه عبر <code>User-Agent</code> الترويسة.</p>
<h2 id="أولوية-التوجيه">أولوية التوجيه</h2>
<p>تُنفَّذ المعالجات (Handlers) أو الوسيطات (middleware) بترتيب التسجيل.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/book/a&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;a&#x27;</span>)) <span class="hljs-comment">// a</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/book/:slug&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;common&#x27;</span>)) <span class="hljs-comment">// common</span>
</code></pre>
<pre><code>GET /book/a ---&gt; \`a\`
GET /book/b ---&gt; \`common\`
</code></pre>
<p>عند تنفيذ معالج (handler)، ستتوقف العملية.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;*&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;common&#x27;</span>)) <span class="hljs-comment">// common</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/foo&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;foo&#x27;</span>)) <span class="hljs-comment">// foo</span>
</code></pre>
<pre><code>GET /foo ---&gt; \`common\` // foo will not be dispatched
</code></pre>
<p>إذا كان لديك وسيطة تريد تنفيذها، فاكتب الكود أعلى المعالج.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { logger } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/logger&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">logger</span>())
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/foo&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;foo&#x27;</span>))
</code></pre>
<p>إذا كنت تريد معالج &quot;<em>fallback</em>&quot;، فاكتب الكود أسفل المعالج الآخر.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/bar&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;bar&#x27;</span>)) <span class="hljs-comment">// bar</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;*&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;fallback&#x27;</span>)) <span class="hljs-comment">// fallback</span>
</code></pre>
<pre><code>GET /bar ---&gt; \`bar\`
GET /foo ---&gt; \`fallback\`
</code></pre>
<h2 id="ترتيب-التجميع">ترتيب التجميع</h2>
<p>لاحظ أن خطأ تجميع المسارات (routings) يصعب ملاحظته.
الـ <code>route()</code> تأخذ الدالة التوجيه (routing) المخزَّن من الوسيطة الثانية (مثل <code>three</code> أو <code>two</code>) ويضيفه إلى الخاص به (<code>two</code> أو <code>app</code>) التوجيه.</p>
<pre><code class="language-ts">three.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/hi&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;hi&#x27;</span>))
two.<span class="hljs-title function_">route</span>(<span class="hljs-string">&#x27;/three&#x27;</span>, three)
app.<span class="hljs-title function_">route</span>(<span class="hljs-string">&#x27;/two&#x27;</span>, two)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> app
</code></pre>
<p>ستُعيد استجابة 200.</p>
<pre><code>GET /two/three/hi ---&gt; \`hi\`
</code></pre>
<p>ومع ذلك، إذا كانت بترتيب خاطئ، فستُعيد 404.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-keyword">const</span> two = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-keyword">const</span> three = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
<span class="hljs-comment">// ---cut---</span>
three.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/hi&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;hi&#x27;</span>))
app.<span class="hljs-title function_">route</span>(<span class="hljs-string">&#x27;/two&#x27;</span>, two) <span class="hljs-comment">// \`two\` does not have routes</span>
two.<span class="hljs-title function_">route</span>(<span class="hljs-string">&#x27;/three&#x27;</span>, three)

<span class="hljs-keyword">export</span> <span class="hljs-keyword">default</span> app
</code></pre>
<pre><code>GET /two/three/hi ---&gt; 404 Not Found
</code></pre>
`,o={book:s,chapter:"api",chapterTitle:n,slug:a,title:p,headings:l,html:t};export{s as book,c as chapter,n as chapterTitle,o as default,l as headings,t as html,a as slug,p as title};
