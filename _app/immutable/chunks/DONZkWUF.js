const s="hono",n="middleware-builtin",a="الوسائط المدمجة",o="jwt",e="البرمجية الوسيطة JWT Auth",t=[{depth:2,id:"import",text:"Import"},{depth:2,id:"الاستخدام",text:"الاستخدام"},{depth:2,id:"الخيارات",text:"الخيارات"},{depth:3,id:"secret-string",text:"secret: string"},{depth:3,id:"alg-string",text:"alg: string"},{depth:3,id:"cookie-string",text:"cookie: string"},{depth:3,id:"headername-string",text:"headerName: string"},{depth:3,id:"realm-string",text:"realm: string"},{depth:3,id:"verification-verifyoptions",text:"verification: VerifyOptions"}],p=`<p>يوفر وسيط مصادقة JWT (JWT Auth Middleware) المصادقة عبر التحقق من الرمز المميز (token) باستخدام JWT.
ستتحقق البرمجية الوسيطة من <code>Authorization</code> الترويسة إذا <code>cookie</code> لم يُضبط الخيار. يمكنك تخصيص اسم الترويسة (header) باستخدام <code>headerName</code> خيار.</p>
<p>يجب أن يحتوي رأس التخويل (Authorization) المُرسل من العميل على مخطط (scheme) محدد.</p>
<p>مثال: <code>Bearer my.token.value</code> أو <code>Basic my.token.value</code></p>
<h2 id="import">Import</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { jwt } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/jwt&#x27;</span>
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">JwtVariables</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/jwt&#x27;</span>
</code></pre>
<h2 id="الاستخدام">الاستخدام</h2>
<pre><code class="language-ts"><span class="hljs-comment">// Specify the variable types to infer the \`c.get(&#x27;jwtPayload&#x27;)\`:</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Variables</span> = <span class="hljs-title class_">JwtVariables</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>&lt;{ <span class="hljs-title class_">Variables</span>: <span class="hljs-title class_">Variables</span> }&gt;()

app.<span class="hljs-title function_">use</span>(
  <span class="hljs-string">&#x27;/auth/*&#x27;</span>,
  <span class="hljs-title function_">jwt</span>({
    <span class="hljs-attr">secret</span>: <span class="hljs-string">&#x27;it-is-very-secret&#x27;</span>,
    <span class="hljs-attr">alg</span>: <span class="hljs-string">&#x27;HS256&#x27;</span>,
  })
)

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/auth/page&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">text</span>(<span class="hljs-string">&#x27;You are authorized&#x27;</span>)
})
</code></pre>
<p>احصل على الحمولة:</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">use</span>(
  <span class="hljs-string">&#x27;/auth/*&#x27;</span>,
  <span class="hljs-title function_">jwt</span>({
    <span class="hljs-attr">secret</span>: <span class="hljs-string">&#x27;it-is-very-secret&#x27;</span>,
    <span class="hljs-attr">alg</span>: <span class="hljs-string">&#x27;HS256&#x27;</span>,
    <span class="hljs-attr">verification</span>: {
      <span class="hljs-attr">iss</span>: <span class="hljs-string">&#x27;my-trusted-issuer&#x27;</span>,
      <span class="hljs-attr">aud</span>: <span class="hljs-string">&#x27;my-api&#x27;</span>,
    },
  })
)

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/auth/page&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> payload = c.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;jwtPayload&#x27;</span>)
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>(payload) <span class="hljs-comment">// eg: { &quot;sub&quot;: &quot;1234567890&quot;, &quot;name&quot;: &quot;John Doe&quot;, &quot;iat&quot;: 1516239022, &quot;iss&quot;: &quot;my-trusted-issuer&quot; }</span>
})
</code></pre>
<p><code>jwt()</code> هي مجرد دالة وسيط (middleware). إذا أردت استخدام متغير بيئة (مثل: <code>c.env.JWT_SECRET</code>)، يمكنك استخدامه كما يلي:</p>
<pre><code class="language-js">app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&#x27;/auth/*&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c, next</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> jwtMiddleware = <span class="hljs-title function_">jwt</span>({
    <span class="hljs-attr">secret</span>: c.<span class="hljs-property">env</span>.<span class="hljs-property">JWT_SECRET</span>,
    <span class="hljs-attr">alg</span>: <span class="hljs-string">&#x27;HS256&#x27;</span>,
  })
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">jwtMiddleware</span>(c, next)
})
</code></pre>
<h2 id="الخيارات">الخيارات</h2>
<h3 id="secret-string"><Badge type="danger" text="required" /> secret: <code>string</code></h3>
<p>قيمة مفتاحك السري.</p>
<h3 id="alg-string"><Badge type="danger" text="required" /> alg: <code>string</code></h3>
<p>نوع خوارزمية يُستخدم للتحقّق.</p>
<p>الأنواع المتاحة هي <code>HS256</code> | <code>HS384</code> | <code>HS512</code> | <code>RS256</code> | <code>RS384</code> | <code>RS512</code> | <code>PS256</code> | <code>PS384</code> | <code>PS512</code> | <code>ES256</code> | <code>ES384</code> | <code>ES512</code> | <code>EdDSA</code>.</p>
<h3 id="cookie-string"><Badge type="info" text="optional" /> cookie: <code>string</code></h3>
<p>إذا تم تعيين هذه القيمة، يتم استرجاع القيمة من ترويسة ملفات تعريف الارتباط باستخدام تلك القيمة كمفتاح، ثم يتم التحقق منها كرمز (token).</p>
<h3 id="headername-string"><Badge type="info" text="optional" /> <code>headerName</code>: <code>string</code></h3>
<p>اسم الرأس (header) الذي يُبحث فيه عن الرمز المميز (token) الخاص بـ JWT. الافتراضي هو <code>Authorization</code>.</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">use</span>(
  <span class="hljs-string">&#x27;/auth/*&#x27;</span>,
  <span class="hljs-title function_">jwt</span>({
    <span class="hljs-attr">secret</span>: <span class="hljs-string">&#x27;it-is-very-secret&#x27;</span>,
    <span class="hljs-attr">alg</span>: <span class="hljs-string">&#x27;HS256&#x27;</span>,
    <span class="hljs-attr">headerName</span>: <span class="hljs-string">&#x27;x-custom-auth-header&#x27;</span>,
  })
)
</code></pre>
<h3 id="realm-string"><Badge type="info" text="optional" /> realm: <code>string</code></h3>
<p>نطاق الحماية الموصوف بواسطة <code>realm</code> معامل <code>WWW-Authenticate</code> ترويسة التحدي (challenge) المُعادة عند <code>401</code> الاستجابات. القيمة الافتراضية هي عنوان URL للطلب.</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">use</span>(
  <span class="hljs-string">&#x27;/auth/*&#x27;</span>,
  <span class="hljs-title function_">jwt</span>({
    <span class="hljs-attr">secret</span>: <span class="hljs-string">&#x27;it-is-very-secret&#x27;</span>,
    <span class="hljs-attr">realm</span>: <span class="hljs-string">&#x27;my-protected-api&#x27;</span>,
  })
)
</code></pre>
<h3 id="verification-verifyoptions"><Badge type="info" text="optional" /> <code>verification</code>: <code>VerifyOptions</code></h3>
<p>خيارات تتحكّم في التحقّق من الرمز.</p>
<h4><Badge type="info" text="optional" /> VerifyOptions.iss: <code>string | RegExp</code></h4>
<p>المُصدِر المتوقّع المستخدَم للتحقّق من الرمز. الـ <code>iss</code> <strong>لن</strong> يتم التحقق من المطالبة إذا لم يتم تعيين هذا.</p>
<h4><Badge type="info" text="optional" /> VerifyOptions.aud: <code>string | string[] | RegExp</code></h4>
<p>الجمهور المتوقع المستخدم للتحقق من الرمز المميز. إذا تم تعيين ذلك، يجب أن يتضمن الرمز المميز <code>aud</code> المطلوب، ويجب أن تطابق قيمة جمهور (audience) واحدة على الأقل.</p>
<h4><Badge type="info" text="optional" /> VerifyOptions.nbf: <code>boolean</code></h4>
<p>الـ <code>nbf</code> سيتم التحقق من مُطالَبة (claim) &quot;عدم الاستخدام قبل&quot; (not before) إذا كانت موجودة وكان هذا مضبوطًا على <code>true</code>. القيمة الافتراضية هي <code>true</code>.</p>
<h4><Badge type="info" text="optional" /> VerifyOptions.iat: <code>boolean</code></h4>
<p>الـ <code>iat</code> سيتم التحقق من مُطالَبة (claim) وقت الإصدار (issued at) إذا كانت موجودة وكان هذا مضبوطًا على <code>true</code>. القيمة الافتراضية هي <code>true</code>.</p>
<h4><Badge type="info" text="optional" /> VerifyOptions.exp: <code>boolean</code></h4>
<p>الـ <code>exp</code> سيتم التحقق من مُطالَبة (claim) وقت الانتهاء (expiration time) إذا كانت موجودة وكان هذا مضبوطًا على <code>true</code>. القيمة الافتراضية هي <code>true</code>.</p>
`,c={book:s,chapter:n,chapterTitle:a,slug:"jwt",title:e,headings:t,html:p};export{s as book,n as chapter,a as chapterTitle,c as default,t as headings,p as html,o as slug,e as title};
