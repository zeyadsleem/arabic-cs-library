const s="hono",n="middleware-builtin",a="الوسائط المدمجة",t="secure-headers",e="وسيط الرؤوس الآمنة",l=[{depth:2,id:"import",text:"Import"},{depth:2,id:"الاستخدام",text:"الاستخدام"},{depth:2,id:"الخيارات-المدعومة",text:"الخيارات المدعومة"},{depth:2,id:"تعارض-البرمجيات-الوسيطة",text:"تعارض البرمجيات الوسيطة"},{depth:2,id:"ضبط-content-security-policy",text:"ضبط Content-Security-Policy"},{depth:3,id:"nonce-السمة",text:"nonce السمة"},{depth:2,id:"ضبط-permission-policy",text:"ضبط Permission-Policy"}],p=`<p>يبسّط وسيط الترويسات الآمنة (Secure Headers Middleware) إعداد ترويسات الأمان. مستوحى جزئيًا من قدرات Helmet، يتيح لك التحكم في تفعيل وتعطيل ترويسات الأمان المحددة.</p>
<h2 id="import">Import</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> { secureHeaders } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/secure-headers&#x27;</span>
</code></pre>
<h2 id="الاستخدام">الاستخدام</h2>
<p>يمكنك استخدام الإعدادات المثلى افتراضيًا.</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">secureHeaders</span>())
</code></pre>
<p>يمكنك كتم الترويسات (headers) غير الضرورية بضبطها على false.</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
app.<span class="hljs-title function_">use</span>(
  <span class="hljs-string">&#x27;*&#x27;</span>,
  <span class="hljs-title function_">secureHeaders</span>({
    <span class="hljs-attr">xFrameOptions</span>: <span class="hljs-literal">false</span>,
    <span class="hljs-attr">xXssProtection</span>: <span class="hljs-literal">false</span>,
  })
)
</code></pre>
<p>يمكنك تجاوز قيم الترويسات (headers) الافتراضية باستخدام نص.</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
app.<span class="hljs-title function_">use</span>(
  <span class="hljs-string">&#x27;*&#x27;</span>,
  <span class="hljs-title function_">secureHeaders</span>({
    <span class="hljs-attr">strictTransportSecurity</span>:
      <span class="hljs-string">&#x27;max-age=63072000; includeSubDomains; preload&#x27;</span>,
    <span class="hljs-attr">xFrameOptions</span>: <span class="hljs-string">&#x27;DENY&#x27;</span>,
    <span class="hljs-attr">xXssProtection</span>: <span class="hljs-string">&#x27;1&#x27;</span>,
  })
)
</code></pre>
<h2 id="الخيارات-المدعومة">الخيارات المدعومة</h2>
<p>يتوافق كل خيار مع أزواج المفتاح-القيمة (Key-Value) التالية للرؤوس (headers).</p>
<table>
<thead>
<tr>
<th>الخيار (Option)</th>
<th>الترويسة (Header)</th>
<th>القيمة (Value)</th>
<th>الافتراضي (Default)</th>
</tr>
</thead>
<tbody>
<tr>
<td>-</td>
<td>X-Powered-By</td>
<td>(حذف الترويسة)</td>
<td>True</td>
</tr>
<tr>
<td>contentSecurityPolicy</td>
<td><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP">Content-Security-Policy</a></td>
<td>الاستخدام: <a href="#setting-content-security-policy">ضبط Content-Security-Policy</a></td>
<td>بدون إعداد</td>
</tr>
<tr>
<td>contentSecurityPolicyReportOnly</td>
<td><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy-Report-Only">Content-Security-Policy-Report-Only</a></td>
<td>الاستخدام: <a href="#setting-content-security-policy">ضبط Content-Security-Policy</a></td>
<td>بدون إعداد</td>
</tr>
<tr>
<td>trustedTypes</td>
<td><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/trusted-types">الأنواع الموثوقة (<code>Trusted Types</code>)</a></td>
<td>الاستخدام: <a href="#setting-content-security-policy">ضبط Content-Security-Policy</a></td>
<td>بدون إعداد</td>
</tr>
<tr>
<td>requireTrustedTypesFor</td>
<td><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/require-trusted-types-for">طلب Trusted Types لـ</a></td>
<td>الاستخدام: <a href="#setting-content-security-policy">ضبط Content-Security-Policy</a></td>
<td>بدون إعداد</td>
</tr>
<tr>
<td>crossOriginEmbedderPolicy</td>
<td><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Embedder-Policy">Cross-Origin-Embedder-Policy</a></td>
<td>require-corp</td>
<td><strong>False</strong></td>
</tr>
<tr>
<td>crossOriginResourcePolicy</td>
<td><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Resource-Policy">Cross-Origin-Resource-Policy</a></td>
<td>same-origin</td>
<td>True</td>
</tr>
<tr>
<td>crossOriginOpenerPolicy</td>
<td><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cross-Origin-Opener-Policy">Cross-Origin-Opener-Policy</a></td>
<td>same-origin</td>
<td>True</td>
</tr>
<tr>
<td>originAgentCluster</td>
<td><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Origin-Agent-Cluster">Origin-Agent-Cluster</a></td>
<td>?1</td>
<td>True</td>
</tr>
<tr>
<td>referrerPolicy</td>
<td><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Referrer-Policy">Referrer-Policy</a></td>
<td>no-referrer</td>
<td>True</td>
</tr>
<tr>
<td>reportingEndpoints</td>
<td><a href="https://www.w3.org/TR/reporting-1/#header">Reporting-Endpoints</a></td>
<td>الاستخدام: <a href="#setting-content-security-policy">ضبط Content-Security-Policy</a></td>
<td>بدون إعداد</td>
</tr>
<tr>
<td>reportTo</td>
<td><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Content-Security-Policy/report-to">Report-To</a></td>
<td>الاستخدام: <a href="#setting-content-security-policy">ضبط Content-Security-Policy</a></td>
<td>بدون إعداد</td>
</tr>
<tr>
<td>strictTransportSecurity</td>
<td><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Strict-Transport-Security">Strict-Transport-Security</a></td>
<td>max-age=15552000; includeSubDomains</td>
<td>True</td>
</tr>
<tr>
<td>xContentTypeOptions</td>
<td><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Content-Type-Options">X-Content-Type-Options</a></td>
<td>nosniff</td>
<td>True</td>
</tr>
<tr>
<td>xDnsPrefetchControl</td>
<td><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-DNS-Prefetch-Control">X-DNS-Prefetch-Control</a></td>
<td>off</td>
<td>True</td>
</tr>
<tr>
<td>xDownloadOptions</td>
<td><a href="https://learn.microsoft.com/en-us/archive/blogs/ie/ie8-security-part-v-comprehensive-protection#mime-handling-force-save">X-Download-Options</a></td>
<td>noopen</td>
<td>True</td>
</tr>
<tr>
<td>xFrameOptions</td>
<td><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Frame-Options">X-Frame-Options</a></td>
<td>SAMEORIGIN</td>
<td>True</td>
</tr>
<tr>
<td>xPermittedCrossDomainPolicies</td>
<td><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-Permitted-Cross-Domain-Policies">X-Permitted-Cross-Domain-Policies</a></td>
<td>none</td>
<td>True</td>
</tr>
<tr>
<td>xXssProtection</td>
<td><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/X-XSS-Protection">X-XSS-Protection</a></td>
<td>0</td>
<td>True</td>
</tr>
<tr>
<td>permissionPolicy</td>
<td><a href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy">Permissions-Policy</a></td>
<td>الاستخدام: <a href="#setting-permission-policy">تعيين Permission-Policy</a></td>
<td>بدون إعداد</td>
</tr>
</tbody>
</table>
<h2 id="تعارض-البرمجيات-الوسيطة">تعارض البرمجيات الوسيطة</h2>
<p>يرجى توخي الحذر بشأن ترتيب المواصفة عند التعامل مع وسائط تتعامل مع نفس الترويسة (header).</p>
<p>في هذه الحالة، يعمل Secure-headers و <code>x-powered-by</code> يتم حذفه:</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">secureHeaders</span>())
app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">poweredBy</span>())
</code></pre>
<p>في هذه الحالة، يعمل Powered-By و <code>x-powered-by</code> يُضاف:</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">poweredBy</span>())
app.<span class="hljs-title function_">use</span>(<span class="hljs-title function_">secureHeaders</span>())
</code></pre>
<h2 id="ضبط-content-security-policy">ضبط Content-Security-Policy</h2>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
app.<span class="hljs-title function_">use</span>(
  <span class="hljs-string">&#x27;/test&#x27;</span>,
  <span class="hljs-title function_">secureHeaders</span>({
    <span class="hljs-attr">reportingEndpoints</span>: [
      {
        <span class="hljs-attr">name</span>: <span class="hljs-string">&#x27;endpoint-1&#x27;</span>,
        <span class="hljs-attr">url</span>: <span class="hljs-string">&#x27;https://example.com/reports&#x27;</span>,
      },
    ],
    <span class="hljs-comment">// -- or alternatively</span>
    <span class="hljs-comment">// reportTo: [</span>
    <span class="hljs-comment">//   {</span>
    <span class="hljs-comment">//     group: &#x27;endpoint-1&#x27;,</span>
    <span class="hljs-comment">//     max_age: 10886400,</span>
    <span class="hljs-comment">//     endpoints: [{ url: &#x27;https://example.com/reports&#x27; }],</span>
    <span class="hljs-comment">//   },</span>
    <span class="hljs-comment">// ],</span>
    <span class="hljs-attr">contentSecurityPolicy</span>: {
      <span class="hljs-attr">defaultSrc</span>: [<span class="hljs-string">&quot;&#x27;self&#x27;&quot;</span>],
      <span class="hljs-attr">baseUri</span>: [<span class="hljs-string">&quot;&#x27;self&#x27;&quot;</span>],
      <span class="hljs-attr">childSrc</span>: [<span class="hljs-string">&quot;&#x27;self&#x27;&quot;</span>],
      <span class="hljs-attr">connectSrc</span>: [<span class="hljs-string">&quot;&#x27;self&#x27;&quot;</span>],
      <span class="hljs-attr">fontSrc</span>: [<span class="hljs-string">&quot;&#x27;self&#x27;&quot;</span>, <span class="hljs-string">&#x27;https:&#x27;</span>, <span class="hljs-string">&#x27;data:&#x27;</span>],
      <span class="hljs-attr">formAction</span>: [<span class="hljs-string">&quot;&#x27;self&#x27;&quot;</span>],
      <span class="hljs-attr">frameAncestors</span>: [<span class="hljs-string">&quot;&#x27;self&#x27;&quot;</span>],
      <span class="hljs-attr">frameSrc</span>: [<span class="hljs-string">&quot;&#x27;self&#x27;&quot;</span>],
      <span class="hljs-attr">imgSrc</span>: [<span class="hljs-string">&quot;&#x27;self&#x27;&quot;</span>, <span class="hljs-string">&#x27;data:&#x27;</span>],
      <span class="hljs-attr">manifestSrc</span>: [<span class="hljs-string">&quot;&#x27;self&#x27;&quot;</span>],
      <span class="hljs-attr">mediaSrc</span>: [<span class="hljs-string">&quot;&#x27;self&#x27;&quot;</span>],
      <span class="hljs-attr">objectSrc</span>: [<span class="hljs-string">&quot;&#x27;none&#x27;&quot;</span>],
      <span class="hljs-attr">reportTo</span>: <span class="hljs-string">&#x27;endpoint-1&#x27;</span>,
      <span class="hljs-attr">reportUri</span>: <span class="hljs-string">&#x27;/csp-report&#x27;</span>,
      <span class="hljs-attr">sandbox</span>: [<span class="hljs-string">&#x27;allow-same-origin&#x27;</span>, <span class="hljs-string">&#x27;allow-scripts&#x27;</span>],
      <span class="hljs-attr">scriptSrc</span>: [<span class="hljs-string">&quot;&#x27;self&#x27;&quot;</span>],
      <span class="hljs-attr">scriptSrcAttr</span>: [<span class="hljs-string">&quot;&#x27;none&#x27;&quot;</span>],
      <span class="hljs-attr">scriptSrcElem</span>: [<span class="hljs-string">&quot;&#x27;self&#x27;&quot;</span>],
      <span class="hljs-attr">styleSrc</span>: [<span class="hljs-string">&quot;&#x27;self&#x27;&quot;</span>, <span class="hljs-string">&#x27;https:&#x27;</span>, <span class="hljs-string">&quot;&#x27;unsafe-inline&#x27;&quot;</span>],
      <span class="hljs-attr">styleSrcAttr</span>: [<span class="hljs-string">&#x27;none&#x27;</span>],
      <span class="hljs-attr">styleSrcElem</span>: [<span class="hljs-string">&quot;&#x27;self&#x27;&quot;</span>, <span class="hljs-string">&#x27;https:&#x27;</span>, <span class="hljs-string">&quot;&#x27;unsafe-inline&#x27;&quot;</span>],
      <span class="hljs-attr">upgradeInsecureRequests</span>: [],
      <span class="hljs-attr">workerSrc</span>: [<span class="hljs-string">&quot;&#x27;self&#x27;&quot;</span>],
    },
  })
)
</code></pre>
<h3 id="nonce-السمة"><code>nonce</code> السمة</h3>
<p>يمكنك إضافة <a href="https://developer.mozilla.org/en-US/docs/Web/HTML/Global_attributes/nonce"><code>nonce</code> السمة</a> إلى <code>script</code> أو <code>style</code> العنصر بإضافة <code>NONCE</code> مستوردة من <code>hono/secure-headers</code> إلى <code>scriptSrc</code> أو <code>styleSrc</code>:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">import</span> { secureHeaders, <span class="hljs-variable constant_">NONCE</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/secure-headers&#x27;</span>
<span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">SecureHeadersVariables</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/secure-headers&#x27;</span>

<span class="hljs-comment">// Specify the variable types to infer the \`c.get(&#x27;secureHeadersNonce&#x27;)\`:</span>
<span class="hljs-keyword">type</span> <span class="hljs-title class_">Variables</span> = <span class="hljs-title class_">SecureHeadersVariables</span>

<span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>&lt;{ <span class="hljs-title class_">Variables</span>: <span class="hljs-title class_">Variables</span> }&gt;()

<span class="hljs-comment">// Set the pre-defined nonce value to \`scriptSrc\`:</span>
app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;*&#x27;</span>,
  <span class="hljs-title function_">secureHeaders</span>({
    <span class="hljs-attr">contentSecurityPolicy</span>: {
      <span class="hljs-attr">scriptSrc</span>: [<span class="hljs-variable constant_">NONCE</span>, <span class="hljs-string">&#x27;https://allowed1.example.com&#x27;</span>],
    },
  })
)

<span class="hljs-comment">// Get the value from \`c.get(&#x27;secureHeadersNonce&#x27;)\`:</span>
app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">html</span>(
    
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        {/** contents */}
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span>
          <span class="hljs-attr">src</span>=<span class="hljs-string">&#x27;/js/client.js&#x27;</span>
          <span class="hljs-attr">nonce</span>=<span class="hljs-string">{c.get(</span>&#x27;<span class="hljs-attr">secureHeadersNonce</span>&#x27;)}
        /&gt;</span><span class="language-javascript">
      &lt;/body&gt;</span></span>
    
  )
})
</code></pre>
<p>إذا كنت تريد توليد قيمة nonce بنفسك، يمكنك أيضًا تحديد دالة كما يلي:</p>
<pre><code class="language-tsx"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>&lt;{
  <span class="hljs-title class_">Variables</span>: { <span class="hljs-attr">myNonce</span>: <span class="hljs-built_in">string</span> }
}&gt;()

<span class="hljs-keyword">const</span> <span class="hljs-attr">myNonceGenerator</span>: <span class="hljs-title class_">ContentSecurityPolicyOptionHandler</span> = <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-comment">// This function is called on every request.</span>
  <span class="hljs-keyword">const</span> nonce = <span class="hljs-title class_">Math</span>.<span class="hljs-title function_">random</span>().<span class="hljs-title function_">toString</span>(<span class="hljs-number">36</span>).<span class="hljs-title function_">slice</span>(<span class="hljs-number">2</span>)
  c.<span class="hljs-title function_">set</span>(<span class="hljs-string">&#x27;myNonce&#x27;</span>, nonce)
  <span class="hljs-keyword">return</span> <span class="hljs-string">\`&#x27;nonce-<span class="hljs-subst">\${nonce}</span>&#x27;\`</span>
}

app.<span class="hljs-title function_">get</span>(
  <span class="hljs-string">&#x27;*&#x27;</span>,
  <span class="hljs-title function_">secureHeaders</span>({
    <span class="hljs-attr">contentSecurityPolicy</span>: {
      <span class="hljs-attr">scriptSrc</span>: [myNonceGenerator, <span class="hljs-string">&#x27;https://allowed1.example.com&#x27;</span>],
    },
  })
)

app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">return</span> c.<span class="hljs-title function_">html</span>(
    
      <span class="language-xml"><span class="hljs-tag">&lt;<span class="hljs-name">body</span>&gt;</span>
        {/** contents */}
        <span class="hljs-tag">&lt;<span class="hljs-name">script</span> <span class="hljs-attr">src</span>=<span class="hljs-string">&#x27;/js/client.js&#x27;</span> <span class="hljs-attr">nonce</span>=<span class="hljs-string">{c.get(</span>&#x27;<span class="hljs-attr">myNonce</span>&#x27;)} /&gt;</span><span class="language-javascript">
      &lt;/body&gt;</span></span>
    
  )
})
</code></pre>
<h2 id="ضبط-permission-policy">ضبط Permission-Policy</h2>
<p>تسمح لك ترويسة Permission-Policy بالتحكم في الميزات وواجهات البرمجة (APIs) التي يمكن استخدامها في المتصفح. إليك مثالًا على كيفية تعيينها:</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> app = <span class="hljs-keyword">new</span> <span class="hljs-title class_">Hono</span>()
app.<span class="hljs-title function_">use</span>(
  <span class="hljs-string">&#x27;*&#x27;</span>,
  <span class="hljs-title function_">secureHeaders</span>({
    <span class="hljs-attr">permissionsPolicy</span>: {
      <span class="hljs-attr">fullscreen</span>: [<span class="hljs-string">&#x27;self&#x27;</span>], <span class="hljs-comment">// fullscreen=(self)</span>
      <span class="hljs-attr">bluetooth</span>: [<span class="hljs-string">&#x27;none&#x27;</span>], <span class="hljs-comment">// bluetooth=(none)</span>
      <span class="hljs-attr">payment</span>: [<span class="hljs-string">&#x27;self&#x27;</span>, <span class="hljs-string">&#x27;https://example.com&#x27;</span>], <span class="hljs-comment">// payment=(self &quot;https://example.com&quot;)</span>
      <span class="hljs-attr">syncXhr</span>: [], <span class="hljs-comment">// sync-xhr=()</span>
      <span class="hljs-attr">camera</span>: <span class="hljs-literal">false</span>, <span class="hljs-comment">// camera=none</span>
      <span class="hljs-attr">microphone</span>: <span class="hljs-literal">true</span>, <span class="hljs-comment">// microphone=*</span>
      <span class="hljs-attr">geolocation</span>: [<span class="hljs-string">&#x27;*&#x27;</span>], <span class="hljs-comment">// geolocation=*</span>
      <span class="hljs-attr">usb</span>: [<span class="hljs-string">&#x27;self&#x27;</span>, <span class="hljs-string">&#x27;https://a.example.com&#x27;</span>, <span class="hljs-string">&#x27;https://b.example.com&#x27;</span>], <span class="hljs-comment">// usb=(self &quot;https://a.example.com&quot; &quot;https://b.example.com&quot;)</span>
      <span class="hljs-attr">accelerometer</span>: [<span class="hljs-string">&#x27;https://*.example.com&#x27;</span>], <span class="hljs-comment">// accelerometer=(&quot;https://*.example.com&quot;)</span>
      <span class="hljs-attr">gyroscope</span>: [<span class="hljs-string">&#x27;src&#x27;</span>], <span class="hljs-comment">// gyroscope=(src)</span>
      <span class="hljs-attr">magnetometer</span>: [
        <span class="hljs-string">&#x27;https://a.example.com&#x27;</span>,
        <span class="hljs-string">&#x27;https://b.example.com&#x27;</span>,
      ], <span class="hljs-comment">// magnetometer=(&quot;https://a.example.com&quot; &quot;https://b.example.com&quot;)</span>
    },
  })
)
</code></pre>
`,c={book:s,chapter:n,chapterTitle:a,slug:t,title:e,headings:l,html:p};export{s as book,n as chapter,a as chapterTitle,c as default,l as headings,p as html,t as slug,e as title};
