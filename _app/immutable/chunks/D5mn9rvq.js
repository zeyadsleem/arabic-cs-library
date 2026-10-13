const s="hono",n="middleware-builtin",e="الوسائط المدمجة",a="request-id",t="البرمجية الوسيطة Request ID",l=[{depth:2,id:"import",text:"Import"},{depth:2,id:"الاستخدام",text:"الاستخدام"},{depth:3,id:"تعيين-معرف-الطلب",text:"تعيين معرّف الطلب"},{depth:2,id:"الخيارات",text:"الخيارات"},{depth:3,id:"limitlength-number",text:"limitLength: number"},{depth:3,id:"headername-string",text:"headerName: string"},{depth:3,id:"generator-c-context-gt-string",text:"generator: (c: Context) =&gt; string"},{depth:2,id:"معرفات-الطلبات-الخاصة-بكل-منصة",text:"معرّفات الطلبات الخاصة بكل منصة"},{depth:3,id:"روابط-خاصة-بالمنصة",text:"روابط خاصة بالمنصّة"}],p=`<p>تولّد وسيطة معرف الطلب (Request ID Middleware) معرفًا فريدًا لكل طلب، يمكنك استخدامه في معالجاتك.</p>
<p><strong>Node.js</strong>: تستخدم هذه البرمجية الوسيطة <code>crypto.randomUUID()</code> لتوليد المعرّفات (IDs). أما العام <code>crypto</code> تم تقديمه في Node.js الإصدار 20 أو أحدث. لذلك، قد تحدث أخطاء في الإصدارات الأقدم من ذلك. في هذه الحالة، يرجى تحديد <code>generator</code>. ومع ذلك، إذا كنت تستخدم <a href="https://github.com/honojs/node-server">مُهايئ Node.js</a>، فإنه يضبط تلقائيًا <code>crypto</code> عالميًا، لذا هذا ليس ضروريًا.</p>
<h2 id="import">Import</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { requestId } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/request-id&#x27;</span>
</code></pre>
<h2 id="الاستخدام">الاستخدام</h2>
<p>يمكنك الوصول إلى معرّف الطلب (Request ID) عبر <code>requestId</code> متغير داخل المعالجات والوسائط التي تُطبَّق عليها وسيطة معرف الطلب (Request ID Middleware).</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&#x27;*&#x27;</span>, <span class="hljs-title function_">requestId</span>())

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">\`Your request id is <span class="hljs-subst">\${c.get(<span class="hljs-string">&#x27;requestId&#x27;</span>)}</span>\`</span>)
})
</code></pre>
<p>إذا أردت تحديد النوع صراحةً، فاستورد <code>RequestIdVariables</code> ومرّرها في الأنواع العامة (generics) الخاصة بـ <code>new Hono()</code>.</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">RequestIdVariables</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/request-id&#x27;</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>&lt;{
  <span class="hljs-title class_">Variables</span>: <span class="hljs-title class_">RequestIdVariables</span>
}&gt;()
</code></pre>
<h3 id="تعيين-معرف-الطلب">تعيين معرّف الطلب</h3>
<p>تعيّن معرّف طلب مخصّصًا في الترويسة (الافتراضي: <code>X-Request-Id</code>)، سيستخدم الوسيط (middleware) تلك القيمة بدلًا من توليد قيمة جديدة:</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&#x27;*&#x27;</span>, <span class="hljs-title function_">requestId</span>())

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">\`<span class="hljs-subst">\${c.get(<span class="hljs-string">&#x27;requestId&#x27;</span>)}</span>\`</span>)
})

<span class="hljs-keyword">const</span> res = <span class="hljs-keyword">await</span> app.<span class="hljs-title function_">request</span>(<span class="hljs-string">&#x27;/&#x27;</span>, {
  <span class="hljs-attr">headers</span>: {
    <span class="hljs-string">&#x27;X-Request-Id&#x27;</span>: <span class="hljs-string">&#x27;your-custom-id&#x27;</span>,
  },
})
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-keyword">await</span> res.<span class="hljs-title function_">text</span>()) <span class="hljs-comment">// your-custom-id</span>
</code></pre>
<p>إذا كنت تريد تعطيل هذه الميزة، اضبط <a href="#headername-string"><code>headerName</code> خيار</a> إلى سلسلة نصية فارغة.</p>
<h2 id="الخيارات">الخيارات</h2>
<h3 id="limitlength-number"><Badge type="info" text="optional" /> <code>limitLength</code>: <code>number</code></h3>
<p>الحد الأقصى لطول معرّف الطلب. الافتراضي هو <code>255</code>.</p>
<h3 id="headername-string"><Badge type="info" text="optional" /> <code>headerName</code>: <code>string</code></h3>
<p>اسم الترويسة (header) المستخدَم لمعرّف الطلب (request ID). الافتراضي هو <code>X-Request-Id</code>.</p>
<h3 id="generator-c-context-gt-string"><Badge type="info" text="optional" /> generator: <code>(c: Context) =&gt; string</code></h3>
<p>دالة توليد معرّف الطلب (request ID). افتراضياً، تستخدم <code>crypto.randomUUID()</code>.</p>
<h2 id="معرفات-الطلبات-الخاصة-بكل-منصة">معرّفات الطلبات الخاصة بكل منصة</h2>
<p>بعض المنصات (مثل AWS Lambda) تولّد بالفعل معرفات الطلبات الخاصة بها لكل طلب.
بدون أي إعداد إضافي، لا تدرك هذه الوسيطة معرفات الطلبات المحددة هذه
وتولّد معرف طلب جديدًا. قد يؤدي هذا إلى الارتباك عند الاطلاع على سجلات تطبيقك.</p>
<p>توحيد هذه المعرّفات، استخدم <code>generator</code> دالة لالتقاط معرف الطلب الخاص بالمنصة واستخدامه في هذه الوسيطة.</p>
<h3 id="روابط-خاصة-بالمنصة">روابط خاصة بالمنصّة</h3>
<ul>
<li>AWS Lambda
<ul>
<li><a href="https://docs.aws.amazon.com/lambda/latest/dg/nodejs-context.html">وثائق AWS: كائن Context</a></li>
<li><a href="https://hono.dev/docs/getting-started/aws-lambda#access-aws-lambda-object">Hono: الوصول إلى كائن AWS Lambda</a></li>
</ul>
</li>
<li>Cloudflare
<ul>
<li><a href="https://developers.cloudflare.com/fundamentals/reference/cloudflare-ray-id/">Cloudflare Ray ID
</a></li>
</ul>
</li>
<li>Deno
<ul>
<li><a href="https://deno.com/blog/zero-config-debugging-deno-opentelemetry#:~:text=s%20automatically%20have-,unique%20request%20IDs,-associated%20with%20them">معرّف الطلب على مدونة Deno</a></li>
</ul>
</li>
<li>Fastly
<ul>
<li><a href="https://www.fastly.com/documentation/reference/vcl/variables/client-request/req-xid/">توثيق Fastly: req.xid</a></li>
</ul>
</li>
</ul>
`,o={book:s,chapter:n,chapterTitle:e,slug:a,title:t,headings:l,html:p};export{s as book,n as chapter,e as chapterTitle,o as default,l as headings,p as html,a as slug,t as title};
