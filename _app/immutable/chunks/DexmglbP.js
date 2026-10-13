const s="hono",n="helpers",a="المساعدات",e="cookie",l="مساعد `Cookie`",o=[{depth:2,id:"import",text:"Import"},{depth:2,id:"الاستخدام",text:"الاستخدام"},{depth:3,id:"ملفات-تعريف-ارتباط-عادية",text:"ملفات تعريف ارتباط عادية"},{depth:3,id:"ملفات-تعريف-ارتباط-موقعة",text:"ملفات تعريف ارتباط موقّعة"},{depth:3,id:"إنشاء-ملفات-تعريف-الارتباط",text:"إنشاء ملفات تعريف الارتباط"},{depth:2,id:"الخيارات",text:"الخيارات"},{depth:3,id:"setcookie-amp-setsignedcookie",text:"setCookie &amp; setSignedCookie"},{depth:3,id:"deletecookie",text:"deleteCookie"},{depth:2,id:"secure-و-host-بادئة",text:"__Secure- و __Host- بادئة"},{depth:2,id:"اتباع-أفضل-الممارسات",text:"اتباع أفضل الممارسات"}],c=`<p>يوفر Cookie Helper واجهة سهلة لإدارة ملفات تعريف الارتباط، مما يتيح للمطورين تعيين وتحليل وحذف ملفات تعريف الارتباط بسلاسة.</p>
<h2 id="import">Import</h2>
<pre><code class="language-ts"><span class="hljs-keyword">import</span> { <span class="hljs-title class_">Hono</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono&#x27;</span>
<span class="hljs-keyword">import</span> {
  deleteCookie,
  getCookie,
  getSignedCookie,
  setCookie,
  setSignedCookie,
  generateCookie,
  generateSignedCookie,
} <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;hono/cookie&#x27;</span>
</code></pre>
<h2 id="الاستخدام">الاستخدام</h2>
<h3 id="ملفات-تعريف-ارتباط-عادية">ملفات تعريف ارتباط عادية</h3>
<pre><code class="language-ts">app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/cookie&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-title function_">setCookie</span>(c, <span class="hljs-string">&#x27;cookie_name&#x27;</span>, <span class="hljs-string">&#x27;cookie_value&#x27;</span>)
  <span class="hljs-keyword">const</span> yummyCookie = <span class="hljs-title function_">getCookie</span>(c, <span class="hljs-string">&#x27;cookie_name&#x27;</span>)
  <span class="hljs-title function_">deleteCookie</span>(c, <span class="hljs-string">&#x27;cookie_name&#x27;</span>)
  <span class="hljs-keyword">const</span> allCookies = <span class="hljs-title function_">getCookie</span>(c)
  <span class="hljs-comment">// ...</span>
})
</code></pre>
<h3 id="ملفات-تعريف-ارتباط-موقعة">ملفات تعريف ارتباط موقّعة</h3>
<p><strong>ملاحظة</strong>: تعيين واسترجاع ملفات تعريف الارتباط الموقعة يُرجع وعدًا (Promise) بسبب الطبيعة غير المتزامنة لـ WebCrypto API، المستخدمة لإنشاء توقيعات HMAC SHA-256.</p>
<pre><code class="language-ts">app.<span class="hljs-title function_">get</span>(<span class="hljs-string">&#x27;/signed-cookie&#x27;</span>, <span class="hljs-function">(<span class="hljs-params">c</span>) =&gt;</span> {
  <span class="hljs-keyword">const</span> secret = <span class="hljs-string">&#x27;secret&#x27;</span> <span class="hljs-comment">// make sure it&#x27;s a large enough string to be secure</span>

  <span class="hljs-keyword">await</span> <span class="hljs-title function_">setSignedCookie</span>(c, <span class="hljs-string">&#x27;cookie_name0&#x27;</span>, <span class="hljs-string">&#x27;cookie_value&#x27;</span>, secret)
  <span class="hljs-keyword">const</span> fortuneCookie = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getSignedCookie</span>(
    c,
    secret,
    <span class="hljs-string">&#x27;cookie_name0&#x27;</span>
  )
  <span class="hljs-title function_">deleteCookie</span>(c, <span class="hljs-string">&#x27;cookie_name0&#x27;</span>)
  <span class="hljs-comment">// \`getSignedCookie\` will return \`false\` for a specified cookie if its signature fails verification</span>
  <span class="hljs-keyword">const</span> allSignedCookies = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getSignedCookie</span>(c, secret)
  <span class="hljs-comment">// ...</span>
})
</code></pre>
<blockquote>
<p>[!NOTE]
<code>getSignedCookie</code> يميّز بين حالتين. ملف تعريف الارتباط (cookie) الذي يحمل توقيعًا لكنه يفشل في التحقق يعيد <code>false</code>. يتم التعامل مع ملف تعريف الارتباط (cookie) الذي لا يمتلك تنسيق توقيع صالحًا على أنه ليس ملف تعريف ارتباط موقّعًا أصلًا، ويُرجع <code>undefined</code> — تمامًا كما هو الحال عندما لا يكون ملف تعريف الارتباط موجودًا. تنطبق هذه القاعدة عند استرجاع ملف تعريف ارتباط واحد بالاسم وعند استرجاع جميع ملفات تعريف الارتباط الموقعة. نظرًا لأن كليهما <code>false</code> و <code>undefined</code> قيم falsy، <code>if (!value)</code> يتعامل مع كلتا الحالتين.</p>
</blockquote>
<h3 id="إنشاء-ملفات-تعريف-الارتباط">إنشاء ملفات تعريف الارتباط</h3>
<p><code>generateCookie</code> و <code>generateSignedCookie</code> تتيح لك الدوال إنشاء سلاسل ملفات تعريف الارتباط مباشرة دون تعيينها في ترويسات الاستجابة.</p>
<h4><code>generateCookie</code></h4>
<pre><code class="language-ts"><span class="hljs-comment">// Basic cookie generation</span>
<span class="hljs-keyword">const</span> cookie = <span class="hljs-title function_">generateCookie</span>(<span class="hljs-string">&#x27;delicious_cookie&#x27;</span>, <span class="hljs-string">&#x27;macha&#x27;</span>)
<span class="hljs-comment">// Returns: &#x27;delicious_cookie=macha; Path=/&#x27;</span>

<span class="hljs-comment">// Cookie with options</span>
<span class="hljs-keyword">const</span> cookie = <span class="hljs-title function_">generateCookie</span>(<span class="hljs-string">&#x27;delicious_cookie&#x27;</span>, <span class="hljs-string">&#x27;macha&#x27;</span>, {
  <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/&#x27;</span>,
  <span class="hljs-attr">secure</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">httpOnly</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">domain</span>: <span class="hljs-string">&#x27;example.com&#x27;</span>,
})
</code></pre>
<h4><code>generateSignedCookie</code></h4>
<pre><code class="language-ts"><span class="hljs-comment">// Basic signed cookie generation</span>
<span class="hljs-keyword">const</span> signedCookie = <span class="hljs-keyword">await</span> <span class="hljs-title function_">generateSignedCookie</span>(
  <span class="hljs-string">&#x27;delicious_cookie&#x27;</span>,
  <span class="hljs-string">&#x27;macha&#x27;</span>,
  <span class="hljs-string">&#x27;secret chocolate chips&#x27;</span>
)

<span class="hljs-comment">// Signed cookie with options</span>
<span class="hljs-keyword">const</span> signedCookie = <span class="hljs-keyword">await</span> <span class="hljs-title function_">generateSignedCookie</span>(
  <span class="hljs-string">&#x27;delicious_cookie&#x27;</span>,
  <span class="hljs-string">&#x27;macha&#x27;</span>,
  <span class="hljs-string">&#x27;secret chocolate chips&#x27;</span>,
  {
    <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/&#x27;</span>,
    <span class="hljs-attr">secure</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">httpOnly</span>: <span class="hljs-literal">true</span>,
  }
)
</code></pre>
<p><strong>ملاحظة</strong>: على عكس <code>setCookie</code> و <code>setSignedCookie</code>، تعمل هذه الدوال فقط على توليد سلاسل ملفات تعريف الارتباط. تحتاج إلى تعيينها يدويًا في الترويسات إذا لزم الأمر.</p>
<h2 id="الخيارات">الخيارات</h2>
<h3 id="setcookie-amp-setsignedcookie"><code>setCookie</code> &amp; <code>setSignedCookie</code></h3>
<ul>
<li>domain: <code>string</code></li>
<li>expires: <code>Date</code></li>
<li>httpOnly: <code>boolean</code></li>
<li>maxAge: <code>number</code></li>
<li>path: <code>string</code></li>
<li>secure: <code>boolean</code></li>
<li>sameSite: <code>'Strict'</code> | <code>'Lax'</code> | <code>'None'</code></li>
<li>priority: <code>'Low' | 'Medium' | 'High'</code></li>
<li>prefix: <code>secure</code> | <code>'host'</code></li>
<li>partitioned: <code>boolean</code></li>
</ul>
<p>مثال:</p>
<pre><code class="language-ts"><span class="hljs-comment">// Regular cookies</span>
<span class="hljs-title function_">setCookie</span>(c, <span class="hljs-string">&#x27;great_cookie&#x27;</span>, <span class="hljs-string">&#x27;banana&#x27;</span>, {
  <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/&#x27;</span>,
  <span class="hljs-attr">secure</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">domain</span>: <span class="hljs-string">&#x27;example.com&#x27;</span>,
  <span class="hljs-attr">httpOnly</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">maxAge</span>: <span class="hljs-number">1000</span>,
  <span class="hljs-attr">expires</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(<span class="hljs-title class_">Date</span>.<span class="hljs-title function_">UTC</span>(<span class="hljs-number">2000</span>, <span class="hljs-number">11</span>, <span class="hljs-number">24</span>, <span class="hljs-number">10</span>, <span class="hljs-number">30</span>, <span class="hljs-number">59</span>, <span class="hljs-number">900</span>)),
  <span class="hljs-attr">sameSite</span>: <span class="hljs-string">&#x27;Strict&#x27;</span>,
})

<span class="hljs-comment">// Signed cookies</span>
<span class="hljs-keyword">await</span> <span class="hljs-title function_">setSignedCookie</span>(
  c,
  <span class="hljs-string">&#x27;fortune_cookie&#x27;</span>,
  <span class="hljs-string">&#x27;lots-of-money&#x27;</span>,
  <span class="hljs-string">&#x27;secret ingredient&#x27;</span>,
  {
    <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/&#x27;</span>,
    <span class="hljs-attr">secure</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">domain</span>: <span class="hljs-string">&#x27;example.com&#x27;</span>,
    <span class="hljs-attr">httpOnly</span>: <span class="hljs-literal">true</span>,
    <span class="hljs-attr">maxAge</span>: <span class="hljs-number">1000</span>,
    <span class="hljs-attr">expires</span>: <span class="hljs-keyword">new</span> <span class="hljs-title class_">Date</span>(<span class="hljs-title class_">Date</span>.<span class="hljs-title function_">UTC</span>(<span class="hljs-number">2000</span>, <span class="hljs-number">11</span>, <span class="hljs-number">24</span>, <span class="hljs-number">10</span>, <span class="hljs-number">30</span>, <span class="hljs-number">59</span>, <span class="hljs-number">900</span>)),
    <span class="hljs-attr">sameSite</span>: <span class="hljs-string">&#x27;Strict&#x27;</span>,
  }
)
</code></pre>
<h3 id="deletecookie"><code>deleteCookie</code></h3>
<ul>
<li>path: <code>string</code></li>
<li>secure: <code>boolean</code></li>
<li>domain: <code>string</code></li>
</ul>
<p>مثال:</p>
<pre><code class="language-ts"><span class="hljs-title function_">deleteCookie</span>(c, <span class="hljs-string">&#x27;banana&#x27;</span>, {
  <span class="hljs-attr">path</span>: <span class="hljs-string">&#x27;/&#x27;</span>,
  <span class="hljs-attr">secure</span>: <span class="hljs-literal">true</span>,
  <span class="hljs-attr">domain</span>: <span class="hljs-string">&#x27;example.com&#x27;</span>,
})
</code></pre>
<p><code>deleteCookie</code> تُعيد القيمة المحذوفة:</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> deletedCookie = <span class="hljs-title function_">deleteCookie</span>(c, <span class="hljs-string">&#x27;delicious_cookie&#x27;</span>)
</code></pre>
<h2 id="secure-و-host-بادئة"><code>__Secure-</code> و <code>__Host-</code> بادئة</h2>
<p>يدعم مساعد الكوكيز (Cookie) <code>__Secure-</code> و <code>__Host-</code> بادئات لأسماء الكوكيز.</p>
<p>إذا كنت تريد التحقق مما إذا كان اسم ملف تعريف الارتباط (cookie) يحتوي على بادئة، فحدد خيار البادئة (prefix).</p>
<pre><code class="language-ts"><span class="hljs-keyword">const</span> securePrefixCookie = <span class="hljs-title function_">getCookie</span>(c, <span class="hljs-string">&#x27;yummy_cookie&#x27;</span>, <span class="hljs-string">&#x27;secure&#x27;</span>)
<span class="hljs-keyword">const</span> hostPrefixCookie = <span class="hljs-title function_">getCookie</span>(c, <span class="hljs-string">&#x27;yummy_cookie&#x27;</span>, <span class="hljs-string">&#x27;host&#x27;</span>)

<span class="hljs-keyword">const</span> securePrefixSignedCookie = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getSignedCookie</span>(
  c,
  secret,
  <span class="hljs-string">&#x27;fortune_cookie&#x27;</span>,
  <span class="hljs-string">&#x27;secure&#x27;</span>
)
<span class="hljs-keyword">const</span> hostPrefixSignedCookie = <span class="hljs-keyword">await</span> <span class="hljs-title function_">getSignedCookie</span>(
  c,
  secret,
  <span class="hljs-string">&#x27;fortune_cookie&#x27;</span>,
  <span class="hljs-string">&#x27;host&#x27;</span>
)
</code></pre>
<p>أيضًا، إذا كنت ترغب في تحديد بادئة عند تعيين ملف تعريف الارتباط، فحدد قيمة لخيار البادئة (prefix).</p>
<pre><code class="language-ts"><span class="hljs-title function_">setCookie</span>(c, <span class="hljs-string">&#x27;delicious_cookie&#x27;</span>, <span class="hljs-string">&#x27;macha&#x27;</span>, {
  <span class="hljs-attr">prefix</span>: <span class="hljs-string">&#x27;secure&#x27;</span>, <span class="hljs-comment">// or \`host\`</span>
})

<span class="hljs-keyword">await</span> <span class="hljs-title function_">setSignedCookie</span>(
  c,
  <span class="hljs-string">&#x27;delicious_cookie&#x27;</span>,
  <span class="hljs-string">&#x27;macha&#x27;</span>,
  <span class="hljs-string">&#x27;secret choco chips&#x27;</span>,
  {
    <span class="hljs-attr">prefix</span>: <span class="hljs-string">&#x27;secure&#x27;</span>, <span class="hljs-comment">// or \`host\`</span>
  }
)
</code></pre>
<h2 id="اتباع-أفضل-الممارسات">اتباع أفضل الممارسات</h2>
<p>تتضمن مواصفة RFC الجديدة لملفات تعريف الارتباط (المعروفة باسم cookie-bis) و CHIPS بعض أفضل الممارسات لإعدادات ملفات تعريف الارتباط (cookies) التي يجب على المطورين اتباعها.</p>
<ul>
<li><a href="https://datatracker.ietf.org/doc/html/draft-ietf-httpbis-rfc6265bis-13"><code>RFC6265bis-13</code></a>
<ul>
<li><code>Max-Age</code>/<code>Expires</code> قيد</li>
<li><code>__Host-</code>/<code>__Secure-</code> قيد البادئة</li>
</ul>
</li>
<li><a href="https://www.ietf.org/archive/id/draft-cutler-httpbis-partitioned-cookies-01.html">CHIPS-01</a>
<ul>
<li><code>Partitioned</code> قيد</li>
</ul>
</li>
</ul>
<p>يتبع Hono أفضل الممارسات.
سيرفع مساعد الكوكي <code>Error</code> عند تحليل الكوكيز تحت الشروط التالية:</p>
<ul>
<li>يبدأ اسم الكوكي بـ <code>__Secure-</code>، لكن <code>secure</code> لم يتم ضبط الخيار.</li>
<li>يبدأ اسم الكوكي بـ <code>__Host-</code>، لكن <code>secure</code> لم يتم ضبط الخيار.</li>
<li>يبدأ اسم الكوكي بـ <code>__Host-</code>، لكن <code>path</code> ليس <code>/</code>.</li>
<li>يبدأ اسم الكوكي بـ <code>__Host-</code>، لكن <code>domain</code> مُعيّن.</li>
<li>ال <code>maxAge</code> قيمة الخيار أكبر من 400 يوم.</li>
<li>ال <code>expires</code> قيمة الخيار تكون بعد 400 يوم من الوقت الحالي.</li>
</ul>
`,t={book:s,chapter:n,chapterTitle:a,slug:e,title:l,headings:o,html:c};export{s as book,n as chapter,a as chapterTitle,t as default,o as headings,c as html,e as slug,l as title};
