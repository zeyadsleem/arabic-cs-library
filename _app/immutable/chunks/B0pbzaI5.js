const s="hono",n="middleware-builtin",e="الوسائط المدمجة",a="bearer-auth",t="البرمجية الوسيطة Bearer Auth",o=[{depth:2,id:"import",text:"Import"},{depth:2,id:"الاستخدام",text:"الاستخدام"},{depth:2,id:"الخيارات",text:"الخيارات"},{depth:3,id:"token-string-string",text:"token: string | string[]"},{depth:3,id:"realm-string",text:"realm: string"},{depth:3,id:"prefix-string",text:"prefix: string"},{depth:3,id:"headername-string",text:"headerName: string"},{depth:3,id:"hashfunction-function",text:"hashFunction: Function"},{depth:3,id:"verifytoken-token-string-c-context-gt-boolean-promiseltbooleangt",text:"verifyToken: (token: string, c: Context) =&gt; boolean | Promise&lt;boolean&gt;"},{depth:3,id:"noauthenticationheader-object",text:"noAuthenticationHeader: object"},{depth:3,id:"invalidauthenticationheader-object",text:"invalidAuthenticationHeader: object"},{depth:3,id:"invalidtoken-object",text:"invalidToken: object"}],c=`<p>توفر وسيطة مصادقة Bearer (Bearer Auth Middleware) المصادقة عن طريق التحقق من رمز API مميز في ترويسة الطلب.
سيضيف عملاء HTTP الذين يصلون إلى نقطة النهاية <code>Authorization</code> ترويسة مع <code>Bearer {token}</code> كقيمة للترويسة.</p>
<p>باستخدام <code>curl</code> من الطرفية، فسيبدو هكذا:</p>
<pre><code class="language-sh">curl -H <span class="hljs-string">&#x27;Authorization: Bearer honoiscool&#x27;</span> http://localhost:8787/auth/page
</code></pre>
<h2 id="import">Import</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { bearerAuth } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/bearer-auth&#x27;</span>
</code></pre>
<h2 id="الاستخدام">الاستخدام</h2>
<blockquote>
<p>[!NOTE]
الخاص بك <code>token</code> يجب أن يطابق التعبير النمطي <code>/[A-Za-z0-9._~+/-]+=*/</code>، وإلا سيتم إرجاع خطأ 400. ومن الجدير بالذكر أن هذا التعبير النمطي (regex) يستوعب رموز JWT المرمزة بـ Base64 الآمنة لعناوين URL ورموز Base64 القياسية معًا. لا يتطلب هذا الوسيط أن يكون رمز الحامل (bearer token) JWT، فقط أن يطابق التعبير النمطي أعلاه.</p>
</blockquote>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

<span class="hljs-keyword">const</span> token = <span class="hljs-string">&#x27;honoiscool&#x27;</span>

app.<span class="hljs-title function_">use</span>(<span class="hljs-string">&#x27;/api/*&#x27;</span>, <span class="hljs-title function_">bearerAuth</span>({ token }))

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api/page&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;You are authorized&#x27;</span> })
})
</code></pre>
<p>للاقتصار على مسار + طريقة محددة:</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

<span class="hljs-keyword">const</span> token = <span class="hljs-string">&#x27;honoiscool&#x27;</span>

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/api/page&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Read posts&#x27;</span> })
})

app.<span class="hljs-title function_">post</span>(<span class="hljs-string">&#x27;/api/page&#x27;</span>, <span class="hljs-title function_">bearerAuth</span>({ token }), <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>({ <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;Created post!&#x27;</span> }, <span class="hljs-number">201</span>)
})
</code></pre>
<p>لتنفيذ رموز متعددة (مثلًا: يمكن لأي رمز صالح القراءة، لكن إنشاء/تحديث/حذف تقتصر على رمز مميز (privileged token)):</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

<span class="hljs-keyword">const</span> readToken = <span class="hljs-string">&#x27;read&#x27;</span>
<span class="hljs-keyword">const</span> privilegedToken = <span class="hljs-string">&#x27;read+write&#x27;</span>
<span class="hljs-keyword">const</span> privilegedMethods = [<span class="hljs-string">&#x27;POST&#x27;</span>, <span class="hljs-string">&#x27;PUT&#x27;</span>, <span class="hljs-string">&#x27;PATCH&#x27;</span>, <span class="hljs-string">&#x27;DELETE&#x27;</span>]

app.<span class="hljs-title function_">on</span>(<span class="hljs-string">&#x27;GET&#x27;</span>, <span class="hljs-string">&#x27;/api/page/*&#x27;</span>, <span class="hljs-title function_">async</span> (c, next) =&gt; {
  <span class="hljs-comment">// List of valid tokens</span>
  <span class="hljs-keyword">const</span> bearer = <span class="hljs-title function_">bearerAuth</span>({ <span class="hljs-attr">token</span>: [readToken, privilegedToken] })
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">bearer</span>(c, next)
})
app.<span class="hljs-title function_">on</span>(privilegedMethods, <span class="hljs-string">&#x27;/api/page/*&#x27;</span>, <span class="hljs-title function_">async</span> (c, next) =&gt; {
  <span class="hljs-comment">// Single valid privileged token</span>
  <span class="hljs-keyword">const</span> bearer = <span class="hljs-title function_">bearerAuth</span>({ <span class="hljs-attr">token</span>: privilegedToken })
  <span class="hljs-keyword">return</span> <span class="hljs-title function_">bearer</span>(c, next)
})

<span class="hljs-comment">// Define handlers for GET, POST, etc.</span>
</code></pre>
<p>إذا أردت التحقق من قيمة الرمز المميز (token) بنفسك، فحدد <code>verifyToken</code> خيار؛ إرجاع <code>true</code> يعني أنه مقبول.</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">use</span>(
  <span class="hljs-string">&#x27;/auth-verify-token/*&#x27;</span>,
  <span class="hljs-title function_">bearerAuth</span>({
    <span class="hljs-attr">verifyToken</span>: <span class="hljs-title function_">async</span> (token, c) =&gt; {
      <span class="hljs-keyword">return</span> token === <span class="hljs-string">&#x27;dynamic-token&#x27;</span>
    },
  })
)
</code></pre>
<h2 id="الخيارات">الخيارات</h2>
<h3 id="token-string-string"><Badge type="danger" text="required" /> token: <code>string</code> | <code>string[]</code></h3>
<p>النص الذي يُتحقَّق به من الرمز المميز (bearer token) الوارد.</p>
<h3 id="realm-string"><Badge type="info" text="optional" /> realm: <code>string</code></h3>
<p>اسم نطاق المجال (realm)، كجزء من ترويسة التحدي WWW-Authenticate المرتجعة. الافتراضي هو <code>&quot;&quot;</code>.
اعرف المزيد: https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/WWW-Authenticate#directives</p>
<h3 id="prefix-string"><Badge type="info" text="optional" /> prefix: <code>string</code></h3>
<p>البادئة (أو المعروفة بـ <code>schema</code>) لقيمة ترويسة Authorization. الافتراضي هو <code>&quot;Bearer&quot;</code>.</p>
<h3 id="headername-string"><Badge type="info" text="optional" /> <code>headerName</code>: <code>string</code></h3>
<p>اسم الترويسة. القيمة الافتراضية هي <code>Authorization</code>.</p>
<h3 id="hashfunction-function"><Badge type="info" text="optional" /> <code>hashFunction</code>: <code>Function</code></h3>
<p>دالة لمعالجة التجزئة (hashing) للمقارنة الآمنة بين رموز (tokens) المصادقة.</p>
<h3 id="verifytoken-token-string-c-context-gt-boolean-promiseltbooleangt"><Badge type="info" text="optional" /> <code>verifyToken</code>: <code>(token: string, c: Context) =&gt; boolean | Promise&lt;boolean&gt;</code></h3>
<p>الدالة للتحقق من الرمز (token).</p>
<h3 id="noauthenticationheader-object"><Badge type="info" text="optional" /> noAuthenticationHeader: <code>object</code></h3>
<p>يخصص استجابة الخطأ عندما لا يحتوي الطلب على ترويسة مصادقة.</p>
<ul>
<li><code>wwwAuthenticateHeader</code>: <code>string | object | MessageFunction</code> - يخصّص قيمة ترويسة WWW-Authenticate.</li>
<li><code>message</code>: <code>string | object | MessageFunction</code> - الرسالة المخصّصة لجسم الاستجابة.</li>
</ul>
<p><code>MessageFunction</code> هو <code>(c: Context) =&gt; string | object | Promise&lt;string | object&gt;</code>.</p>
<h3 id="invalidauthenticationheader-object"><Badge type="info" text="optional" /> invalidAuthenticationHeader: <code>object</code></h3>
<p>يخصص استجابة الخطأ عندما يكون تنسيق رأس المصادقة (authentication header) غير صالح.</p>
<ul>
<li><code>wwwAuthenticateHeader</code>: <code>string | object | MessageFunction</code> - يخصّص قيمة ترويسة WWW-Authenticate.</li>
<li><code>message</code>: <code>string | object | MessageFunction</code> - الرسالة المخصّصة لجسم الاستجابة.</li>
</ul>
<h3 id="invalidtoken-object"><Badge type="info" text="optional" /> <code>invalidToken</code>: <code>object</code></h3>
<p>يخصّص استجابة الخطأ عندما يكون الرمز (token) غير صالح.</p>
<ul>
<li><code>wwwAuthenticateHeader</code>: <code>string | object | MessageFunction</code> - يخصّص قيمة ترويسة WWW-Authenticate.</li>
<li><code>message</code>: <code>string | object | MessageFunction</code> - الرسالة المخصّصة لجسم الاستجابة.</li>
</ul>
`,p={book:s,chapter:n,chapterTitle:e,slug:a,title:t,headings:o,html:c};export{s as book,n as chapter,e as chapterTitle,p as default,o as headings,c as html,a as slug,t as title};
