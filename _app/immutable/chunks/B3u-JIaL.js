const s="hono",n="helpers",e="المساعدات",o="jwt",a="مساعد مصادقة JWT",l=[{depth:2,id:"import",text:"Import"},{depth:2,id:"sign",text:"sign()"},{depth:3,id:"مثال",text:"مثال"},{depth:3,id:"الخيارات",text:"الخيارات"},{depth:2,id:"verify",text:"verify()"},{depth:3,id:"مثال",text:"مثال"},{depth:3,id:"الخيارات",text:"الخيارات"},{depth:2,id:"decode",text:"decode()"},{depth:3,id:"مثال",text:"مثال"},{depth:3,id:"الخيارات",text:"الخيارات"},{depth:2,id:"التحقق-من-الحمولة",text:"التحقق من الحمولة"},{depth:2,id:"أنواع-أخطاء-مخصصة",text:"أنواع أخطاء مخصصة"},{depth:2,id:"algorithmtypes-المدعومة",text:"AlgorithmTypes المدعومة"}],t=`<p>يوفر هذا المساعد دوالًا لترميز وفك ترميز وتوقيع والتحقق من رموز الويب JSON (JWTs). تُستخدم رموز JWT بشكل شائع لأغراض المصادقة والتفويض في تطبيقات الويب. يقدم هذا المساعد وظائف JWT قوية مع دعم لخوارزميات تشفير متنوعة.</p>
<h2 id="import">Import</h2>
<p>لاستخدام هذا المساعد، يمكنك استيراده كما يلي:</p>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { decode, sign, verify } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/jwt&#x27;</span>
</code></pre>
<p><a href="https://hono.dev/docs/middleware/builtin/jwt">وسيط <code>JWT</code></a> أيضًا استيراد <code>jwt</code> دالة من <code>hono/jwt</code>.</p>
<h2 id="sign"><code>sign()</code></h2>
<p>تولّد هذه الدالة رمز JWT عن طريق ترميز الحمولة (payload) وتوقيعها باستخدام الخوارزمية والسر (secret) المحددين.</p>
<pre><code class="language-ts"><span class="hljs-title function_">sign</span>(
  <span class="hljs-attr">payload</span>: <span class="hljs-built_in">unknown</span>,
  <span class="hljs-attr">secret</span>: <span class="hljs-built_in">string</span>,
  <span class="hljs-attr">alg</span>?: <span class="hljs-string">&#x27;HS256&#x27;</span>;

): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">string</span>&gt;;
</code></pre>
<h3 id="مثال">مثال</h3>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { sign } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/jwt&#x27;</span>

<span class="hljs-keyword">const</span> payload = {
  <span class="hljs-attr">sub</span>: <span class="hljs-string">&#x27;user123&#x27;</span>,
  <span class="hljs-attr">role</span>: <span class="hljs-string">&#x27;admin&#x27;</span>,
  <span class="hljs-attr">exp</span>: <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">floor</span>(<span class="hljs-title class_">Date</span>.<span class="hljs-title function_">now</span>() / <span class="hljs-number">1000</span>) + <span class="hljs-number">60</span> * <span class="hljs-number">5</span>, <span class="hljs-comment">// Token expires in 5 minutes</span>
}
<span class="hljs-keyword">const</span> secret = <span class="hljs-string">&#x27;mySecretKey&#x27;</span>
<span class="hljs-keyword">const</span> token = <span class="hljs-keyword">await</span> <span class="hljs-title function_">sign</span>(payload, secret)
</code></pre>
<h3 id="الخيارات">الخيارات</h3>
<br/>
<h4><Badge type="danger" text="required" /> payload: <code>unknown</code></h4>
<p>حمولة JWT (payload) التي سيتم توقيعها. يمكنك تضمين مُطالَبات (claims) أخرى كما في <a href="#payload-validation">تحقق الحمولة</a>.</p>
<h4><Badge type="danger" text="required" /> secret: <code>string</code></h4>
<p>المفتاح السرّي المستخدَم للتحقّق من JWT أو توقيعه.</p>
<h4><Badge type="info" text="optional" /> alg: <a href="#supported-algorithmtypes"><code>AlgorithmTypes</code></a></h4>
<p>الخوارزمية المستخدمة لتوقيع JWT أو التحقق منه. الافتراضي هو HS256.</p>
<h2 id="verify"><code>verify()</code></h2>
<p>تتحقق هذه الدالة مما إذا كان رمز JWT أصليًا ولا يزال صالحًا. تضمن عدم تغيير الرمز وتتحقق من الصلاحية فقط إذا أضفت <a href="#payload-validation">تحقق الحمولة</a>.</p>
<pre><code class="language-ts"><span class="hljs-title function_">verify</span>(
  <span class="hljs-attr">token</span>: <span class="hljs-built_in">string</span>,
  <span class="hljs-attr">secret</span>: <span class="hljs-built_in">string</span>,
  <span class="hljs-attr">alg</span>: <span class="hljs-string">&#x27;HS256&#x27;</span>;
  <span class="hljs-attr">issuer</span>?: <span class="hljs-built_in">string</span> | <span class="hljs-title class_">RegExp</span>;
  <span class="hljs-attr">aud</span>?: <span class="hljs-built_in">string</span> | <span class="hljs-built_in">string</span>[] | <span class="hljs-title class_">RegExp</span>;
): <span class="hljs-title class_">Promise</span>&lt;<span class="hljs-built_in">any</span>&gt;;

</code></pre>
<h3 id="مثال">مثال</h3>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { verify } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/jwt&#x27;</span>

<span class="hljs-keyword">const</span> tokenToVerify = <span class="hljs-string">&#x27;token&#x27;</span>
<span class="hljs-keyword">const</span> secretKey = <span class="hljs-string">&#x27;mySecretKey&#x27;</span>

<span class="hljs-keyword">const</span> decodedPayload = <span class="hljs-keyword">await</span> <span class="hljs-title function_">verify</span>(tokenToVerify, secretKey, <span class="hljs-string">&#x27;HS256&#x27;</span>)
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(decodedPayload)
</code></pre>
<h3 id="الخيارات">الخيارات</h3>
<br/>
<h4><Badge type="danger" text="required" /> token: <code>string</code></h4>
<p>رمز JWT المراد التحقق منه.</p>
<h4><Badge type="danger" text="required" /> secret: <code>string</code></h4>
<p>المفتاح السرّي المستخدَم للتحقّق من JWT أو توقيعه.</p>
<h4><Badge type="danger" text="required" /> alg: <a href="#supported-algorithmtypes"><code>AlgorithmTypes</code></a></h4>
<p>الخوارزمية المستخدَمة لتوقيع JWT أو التحقّق منه.</p>
<h4><Badge type="info" text="optional" /> issuer: <code>string | RegExp</code></h4>
<p>المُصدِر (issuer) المتوقّع المستخدَم للتحقّق من JWT.</p>
<h4><Badge type="info" text="optional" /> aud: <code>string | string[] | RegExp</code></h4>
<p>الجمهور المتوقع المستخدم للتحقق من JWT. إذا تم تعيين ذلك، يجب أن يتضمن الرمز المميز <code>aud</code> المطلوب، ويجب أن تطابق قيمة جمهور (audience) واحدة على الأقل.</p>
<h2 id="decode"><code>decode()</code></h2>
<p>تفك هذه الدالة ترميز رمز JWT دون إجراء التحقق من التوقيع. تستخرج وتُرجع الترويسة (header) والحمولة (payload) من الرمز.</p>
<pre><code class="language-ts"><span class="hljs-title function_">decode</span>(<span class="hljs-attr">token</span>: <span class="hljs-built_in">string</span>): { <span class="hljs-attr">header</span>: <span class="hljs-built_in">any</span>; <span class="hljs-attr">payload</span>: <span class="hljs-built_in">any</span> };
</code></pre>
<h3 id="مثال">مثال</h3>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { decode } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/jwt&#x27;</span>

<span class="hljs-comment">// Decode the JWT token</span>
<span class="hljs-keyword">const</span> tokenToDecode =
  <span class="hljs-string">&#x27;eyJhbGciOiAiSFMyNTYiLCAidHlwIjogIkpXVCJ9.eyJzdWIiOiAidXNlcjEyMyIsICJyb2xlIjogImFkbWluIn0.JxUwx6Ua1B0D1B0FtCrj72ok5cm1Pkmr_hL82sd7ELA&#x27;</span>

<span class="hljs-keyword">const</span> { header, payload } = <span class="hljs-title function_">decode</span>(tokenToDecode)

<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Decoded Header:&#x27;</span>, header)
<span class="hljs-variable language_">console</span>.<span class="hljs-title function_">log</span>(<span class="hljs-string">&#x27;Decoded Payload:&#x27;</span>, payload)
</code></pre>
<h3 id="الخيارات">الخيارات</h3>
<br/>
<h4><Badge type="danger" text="required" /> token: <code>string</code></h4>
<p>رمز JWT المراد فك ترميزه.</p>
<blockquote>
<p>ال <code>decode</code> تتيح لك الدالة فحص الترويسة (header) والحمولة (payload) لرمز JWT <em><strong>دون</strong></em> إجراء التحقق. يمكن أن يكون هذا مفيدًا لتصحيح الأخطاء أو استخراج المعلومات من رموز JWT.</p>
</blockquote>
<h2 id="التحقق-من-الحمولة">التحقق من الحمولة</h2>
<p>عند التحقق من رمز JWT المميز (token)، يتم تنفيذ عمليات التحقق التالية على الحمولة (payload):</p>
<ul>
<li><code>exp</code>: يُفحَص الرمز للتأكد من أنه لم تنتهِ صلاحيته.</li>
<li><code>nbf</code>: يتم التحقق من الرمز المميز (token) لضمان عدم استخدامه قبل وقت محدد.</li>
<li><code>iat</code>: يتم التحقق من الرمز المميز (token) لضمان عدم إصداره في المستقبل.</li>
<li><code>iss</code>: يتم التحقق من الرمز المميز (token) لضمان أنه صادر عن مُصدر موثوق.</li>
<li><code>aud</code>: يتم فحص الرمز المميز (token) للتأكد من أنه موجّه لجمهور مقبول عندما <code>aud</code> تم تعيين معامل التحقق.</li>
</ul>
<p>يرجى التأكد من أن حمولة JWT الخاصة بك تتضمن هذه الحقول، ككائن (object)، إذا كنت تنوي إجراء هذه الفحوصات أثناء التحقق.</p>
<h2 id="أنواع-أخطاء-مخصصة">أنواع أخطاء مخصصة</h2>
<p>يُعرّف هذا الوحدة أيضًا أنواع أخطاء مخصصة للتعامل مع الأخطاء المتعلقة بـ JWT.</p>
<ul>
<li><code>JwtAlgorithmNotImplemented</code>: يشير إلى أن خوارزمية JWT المطلوبة غير مُنفَّذة.</li>
<li><code>JwtTokenInvalid</code>: يشير إلى أن رمز JWT غير صالح.</li>
<li><code>JwtTokenNotBefore</code>: يشير إلى أن الرمز المميز (token) يُستخدم قبل تاريخ صلاحيته.</li>
<li><code>JwtTokenExpired</code>: يشير إلى أن الرمز (token) قد انتهت صلاحيته.</li>
<li><code>JwtTokenIssuedAt</code>: يشير إلى أن ادّعاء &quot;iat&quot; في الرمز (token) غير صحيح.</li>
<li><code>JwtTokenIssuer</code>: يشير إلى أن ادّعاء &quot;iss&quot; في الرمز (token) غير صحيح.</li>
<li><code>JwtPayloadRequiresAud</code>: يشير إلى أن <code>aud</code> المطالبة مطلوبة عندما <code>aud</code> تم تكوين التحقق.</li>
<li><code>JwtTokenAudience</code>: يشير إلى أن <code>aud</code> لا يطابق الجمهور (audience) المتوقّع.</li>
<li><code>JwtTokenSignatureMismatched</code>: يشير إلى عدم تطابق التوقيع في الرمز.</li>
</ul>
<h2 id="algorithmtypes-المدعومة">AlgorithmTypes المدعومة</h2>
<p>يدعم هذا الوحدة خوارزميات التشفير التالية الخاصة بـ JWT (JSON Web Token):</p>
<ul>
<li><code>HS256</code>: HMAC باستخدام SHA-256</li>
<li><code>HS384</code>: HMAC باستخدام SHA-384</li>
<li><code>HS512</code>: HMAC باستخدام SHA-512</li>
<li><code>RS256</code>: RSASSA-PKCS1-v1_5 باستخدام SHA-256</li>
<li><code>RS384</code>: RSASSA-PKCS1-v1_5 باستخدام SHA-384</li>
<li><code>RS512</code>: RSASSA-PKCS1-v1_5 باستخدام SHA-512</li>
<li><code>PS256</code>: RSASSA-PSS using SHA-256 and MGF1 with SHA-256</li>
<li><code>PS384</code>: RSASSA-PSS using SHA-386 and MGF1 with SHA-386</li>
<li><code>PS512</code>: RSASSA-PSS using SHA-512 and MGF1 with SHA-512</li>
<li><code>ES256</code>: ECDSA باستخدام P-256 وSHA-256</li>
<li><code>ES384</code>: ECDSA باستخدام P-384 وSHA-384</li>
<li><code>ES512</code>: ECDSA باستخدام P-521 وSHA-512</li>
<li><code>EdDSA</code>: EdDSA باستخدام Ed25519</li>
</ul>
`,p={book:s,chapter:n,chapterTitle:e,slug:"jwt",title:a,headings:l,html:t};export{s as book,n as chapter,e as chapterTitle,p as default,l as headings,t as html,o as slug,a as title};
