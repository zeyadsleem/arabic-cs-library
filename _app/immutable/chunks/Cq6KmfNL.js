const s="hono",n="middleware-builtin",a="الوسائط المدمجة",c="jwk",e="البرمجية الوسيطة JWK Auth",t=[{depth:2,id:"ما-تتحقق-منه-هذه-البرمجية-الوسيطة",text:"ما تتحقق منه هذه البرمجية الوسيطة"},{depth:2,id:"import",text:"Import"},{depth:2,id:"الاستخدام",text:"الاستخدام"},{depth:2,id:"استخدام-verifywithjwks-خارج-البرمجيات-الوسيطة",text:"استخدام verifyWithJwks خارج البرمجيات الوسيطة"},{depth:2,id:"ضبط-خيارات-طلب-جلب-jwks",text:"ضبط خيارات طلب جلب JWKS"},{depth:2,id:"الخيارات",text:"الخيارات"},{depth:3,id:"alg-asymmetricalgorithm",text:"alg: AsymmetricAlgorithm[]"},{depth:3,id:"keys-honojsonwebkey-c-context-gt-promiselthonojsonwebkeygt",text:"keys: HonoJsonWebKey[] | (c: Context) =&gt; Promise&lt;HonoJsonWebKey[]&gt;"},{depth:3,id:"jwksuri-string-c-context-gt-promiseltstringgt",text:"jwks_uri: string | (c: Context) =&gt; Promise&lt;string&gt;"},{depth:3,id:"allowanon-boolean",text:"allow_anon: boolean"},{depth:3,id:"cookie-string",text:"cookie: string"},{depth:3,id:"headername-string",text:"headerName: string"},{depth:3,id:"realm-string",text:"realm: string"},{depth:3,id:"verification-verifyoptions",text:"verification: VerifyOptions"}],o=`<p>تصادق وسيطة مصادقة JWK (JWK Auth Middleware) على الطلبات عن طريق التحقق من الرموز المميزة باستخدام JWK (JSON Web Key). تتحقق من وجود <code>Authorization</code> الترويسة ومصادر أخرى مهيأة، مثل ملفات تعريف الارتباط، إذا تم تحديدها. يتحقق من الرموز المميزة باستخدام القيم المقدمة <code>keys</code>، يسترجع المفاتيح من <code>jwks_uri</code> إذا حُدِّد، ويدعم استخراج الرمز (token) من ملفات تعريف الارتباط (cookies) إذا <code>cookie</code> الخيار مُضبط.</p>
<h2 id="ما-تتحقق-منه-هذه-البرمجية-الوسيطة">ما تتحقق منه هذه البرمجية الوسيطة</h2>
<p>لكل رمز، <code>jwk()</code>:</p>
<ul>
<li>يحلّل ويتحقق من صيغة ترويسة JWT.</li>
<li>يتطلب <code>kid</code> الترويسة ويجد مفتاحًا مطابقًا بواسطة <code>kid</code>.</li>
<li>يرفض الخوارزميات المتماثلة (<code>HS256</code>, <code>HS384</code>, <code>HS512</code>).</li>
<li>يتطلب الترويسة <code>alg</code> ليُضمَّن في المُهيَّأ <code>alg</code> قائمة السماح.</li>
<li>إذا كان JWK المطابق يحتوي على <code>alg</code> الحقل، فإنه يتطلّب مطابقته لترويسة JWT <code>alg</code>.</li>
<li>يتحقق من توقيع الرمز باستخدام المفتاح المطابق.</li>
<li>افتراضيًا، يتحقق من المطالبات الزمنية: <code>nbf</code>, <code>exp</code>، و <code>iat</code>.</li>
</ul>
<p>يمكن تهيئة التحقّق الاختياري من المطالبات (claims) عبر <code>verification</code> option:</p>
<ul>
<li><code>iss</code>: يتحقق من المُصدِر (issuer) عند توفيره.</li>
<li><code>aud</code>: يتحقق من الجمهور (audience) عند توفيره.</li>
</ul>
<p>إذا كنت بحاجة إلى فحوصات رموز إضافية تتجاوز ما سبق (على سبيل المثال، قواعد تفويض مخصصة على مستوى التطبيق)، أضفها في الوسيط الخاص بك بعد <code>jwk()</code>.</p>
<p>يجب أن يحتوي رأس التخويل (Authorization) المُرسل من العميل على مخطط (scheme) محدد.</p>
<p>مثال: <code>Bearer my.token.value</code> أو <code>Basic my.token.value</code></p>
<h2 id="import">Import</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { jwk } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/jwk&#x27;</span>
<span class="hljs-keyword">import</span> { verifyWithJwks } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/jwt&#x27;</span>
</code></pre>
<h2 id="الاستخدام">الاستخدام</h2>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">use</span>(
  <span class="hljs-string">&#x27;/auth/*&#x27;</span>,
  <span class="hljs-title function_">jwk</span>({
    <span class="hljs-attr">jwks_uri</span>: <span class="hljs-string">\`https://<span class="hljs-subst">\${backendServer}</span>/.well-known/jwks.json\`</span>,
    <span class="hljs-attr">alg</span>: [<span class="hljs-string">&#x27;RS256&#x27;</span>],
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
  <span class="hljs-title function_">jwk</span>({
    <span class="hljs-attr">jwks_uri</span>: <span class="hljs-string">\`https://<span class="hljs-subst">\${backendServer}</span>/.well-known/jwks.json\`</span>,
    <span class="hljs-attr">alg</span>: [<span class="hljs-string">&#x27;RS256&#x27;</span>],
  })
)

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/auth/page&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> payload = c.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;jwtPayload&#x27;</span>)
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>(payload) <span class="hljs-comment">// eg: { &quot;sub&quot;: &quot;1234567890&quot;, &quot;name&quot;: &quot;John Doe&quot;, &quot;iat&quot;: 1516239022 }</span>
})
</code></pre>
<p>وصول مجهول:</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">use</span>(
  <span class="hljs-string">&#x27;/auth/*&#x27;</span>,
  <span class="hljs-title function_">jwk</span>({
    <span class="hljs-attr">jwks_uri</span>: <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span>
      <span class="hljs-string">\`https://<span class="hljs-subst">\${c.env.authServer}</span>/.well-known/jwks.json\`</span>,
    <span class="hljs-attr">alg</span>: [<span class="hljs-string">&#x27;RS256&#x27;</span>],
    <span class="hljs-attr">allow_anon</span>: <span class="hljs-literal">true</span>,
  })
)

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/auth/page&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> payload = c.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;jwtPayload&#x27;</span>)
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">json</span>(payload ?? { <span class="hljs-attr">message</span>: <span class="hljs-string">&#x27;hello anon&#x27;</span> })
})
</code></pre>
<h2 id="استخدام-verifywithjwks-خارج-البرمجيات-الوسيطة">استخدام <code>verifyWithJwks</code> خارج البرمجيات الوسيطة</h2>
<p>الـ <code>verifyWithJwks</code> يمكن استخدام الدالة المساعدة للتحقق من رموز JWT خارج سياق وسائط Hono، مثل صفحات SvelteKit SSR أو بيئات جانب الخادم الأخرى:</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> id_payload = <span class="hljs-keyword">await</span> <span class="hljs-title function_">verifyWithJwks</span>(
  id_token,
  {
    <span class="hljs-attr">jwks_uri</span>: <span class="hljs-string">&#x27;https://your-auth-server/.well-known/jwks.json&#x27;</span>,
    <span class="hljs-attr">allowedAlgorithms</span>: [<span class="hljs-string">&#x27;RS256&#x27;</span>],
  },
  {
    <span class="hljs-attr">cf</span>: { <span class="hljs-attr">cacheEverything</span>: <span class="hljs-literal">true</span>, <span class="hljs-attr">cacheTtl</span>: <span class="hljs-number">3600</span> },
  }
)
</code></pre>
<h2 id="ضبط-خيارات-طلب-جلب-jwks">ضبط خيارات طلب جلب JWKS</h2>
<p>لتكوين كيفية استرجاع JWKS من <code>jwks_uri</code>، مرِّر خيارات طلب fetch كوسيط ثانٍ لـ <code>jwk()</code>.</p>
<p>هذه الوسيطة هي <code>RequestInit</code> ويُستخدم فقط لطلب جلب JWKS.</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()

app.<span class="hljs-title function_">use</span>(
  <span class="hljs-string">&#x27;/auth/*&#x27;</span>,
  <span class="hljs-title function_">jwk</span>(
    {
      <span class="hljs-attr">jwks_uri</span>: <span class="hljs-string">\`https://<span class="hljs-subst">\${backendServer}</span>/.well-known/jwks.json\`</span>,
      <span class="hljs-attr">alg</span>: [<span class="hljs-string">&#x27;RS256&#x27;</span>],
    },
    {
      <span class="hljs-attr">headers</span>: {
        <span class="hljs-title class_">Authorization</span>: <span class="hljs-string">&#x27;Bearer TOKEN&#x27;</span>,
      },
    }
  )
)
</code></pre>
<h2 id="الخيارات">الخيارات</h2>
<h3 id="alg-asymmetricalgorithm"><Badge type="danger" text="required" /> alg: <code>AsymmetricAlgorithm[]</code></h3>
<p>مصفوفة من الخوارزميات غير المتماثلة (asymmetric) المسموح بها والمستخدمة للتحقق من الرمز المميز (token).</p>
<p>الأنواع المتاحة هي <code>RS256</code> | <code>RS384</code> | <code>RS512</code> | <code>PS256</code> | <code>PS384</code> | <code>PS512</code> | <code>ES256</code> | <code>ES384</code> | <code>ES512</code> | <code>EdDSA</code>.</p>
<h3 id="keys-honojsonwebkey-c-context-gt-promiselthonojsonwebkeygt"><Badge type="info" text="optional" /> keys: <code>HonoJsonWebKey[] | (c: Context) =&gt; Promise&lt;HonoJsonWebKey[]&gt;</code></h3>
<p>قيم مفاتيحك العامة، أو دالة تعيدها. تستقبل الدالة كائن Context.</p>
<h3 id="jwksuri-string-c-context-gt-promiseltstringgt"><Badge type="info" text="optional" /> jwks_uri: <code>string</code> | <code>(c: Context) =&gt; Promise&lt;string&gt;</code></h3>
<p>إذا تم تعيين هذه القيمة، فحاول جلب مفاتيح JWK من هذا URI، متوقعًا استجابة JSON تحتوي على <code>keys</code>، والتي تُضاف إلى المُقدَّم <code>keys</code> خيار. يمكنك أيضًا تمرير دالة استدعاء لتحديد URI لمفاتيح JWKS ديناميكيًا باستخدام Context.</p>
<h3 id="allowanon-boolean"><Badge type="info" text="optional" /> <code>allow_anon</code>: <code>boolean</code></h3>
<p>إذا تم ضبط هذه القيمة على <code>true</code>، سيُسمح للطلبات التي لا تحتوي على رمز مميز (token) صالح بالمرور عبر الوسيطة. استخدم <code>c.get('jwtPayload')</code> للتحقق مما إذا كان الطلب موثَّقاً (authenticated). الافتراضي هو <code>false</code>.</p>
<h3 id="cookie-string"><Badge type="info" text="optional" /> cookie: <code>string</code></h3>
<p>إذا تم تعيين هذه القيمة، يتم استرجاع القيمة من ترويسة ملفات تعريف الارتباط باستخدام تلك القيمة كمفتاح، ثم يتم التحقق منها كرمز (token).</p>
<h3 id="headername-string"><Badge type="info" text="optional" /> <code>headerName</code>: <code>string</code></h3>
<p>اسم الرأس (header) الذي يُبحث فيه عن الرمز المميز (token) الخاص بـ JWT. الافتراضي هو <code>Authorization</code>.</p>
<h3 id="realm-string"><Badge type="info" text="optional" /> realm: <code>string</code></h3>
<p>نطاق الحماية الموصوف بواسطة <code>realm</code> معامل <code>WWW-Authenticate</code> ترويسة التحدي (challenge) المُعادة عند <code>401</code> الاستجابات. القيمة الافتراضية هي عنوان URL للطلب.</p>
<h3 id="verification-verifyoptions"><Badge type="info" text="optional" /> <code>verification</code>: <code>VerifyOptions</code></h3>
<p>قم بتكوين سلوك التحقق من المُطالَبات (claims) بالإضافة إلى التحقق من التوقيع (signature):</p>
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
`,l={book:s,chapter:n,chapterTitle:a,slug:"jwk",title:e,headings:t,html:o};export{s as book,n as chapter,a as chapterTitle,l as default,t as headings,o as html,c as slug,e as title};
