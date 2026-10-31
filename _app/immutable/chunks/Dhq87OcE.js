const s="kinney",e="aws",n="نشر تطبيقات الويب على AWS",a="edge-function-use-cases",p="حالات الاستخدام الشائعة",t=[{depth:2,id:"إعادة-كتابة-url",text:"إعادة كتابة URL"},{depth:3,id:"دالة-cloudfront",text:"دالة CloudFront"},{depth:2,id:"إعادة-التوجيه",text:"إعادة التوجيه"},{depth:3,id:"دالة-cloudfront-1",text:"دالة CloudFront"},{depth:2,id:"ترويسات-الأمان",text:"ترويسات الأمان"},{depth:3,id:"دالة-cloudfront-استجابة-المشاهد",text:"دالة CloudFront (استجابة المشاهد)"},{depth:2,id:"التوجيه-الجغرافي",text:"التوجيه الجغرافي"},{depth:3,id:"lambdaedge-طلب-الأصل",text:"Lambda@Edge (طلب الأصل)"},{depth:2,id:"فحوصات-المصادقة-على-الحافة",text:"فحوصات المصادقة على الحافة"},{depth:3,id:"دالة-cloudfront-مصادقة-أساسية-لبيئة-الاختبار",text:"دالة CloudFront (مصادقة أساسية لبيئة الاختبار)"},{depth:3,id:"lambdaedge-التحقق-من-jwt",text:"Lambda@Edge (التحقق من JWT)"},{depth:2,id:"كشف-اللغة",text:"كشف اللغة"},{depth:3,id:"دالة-cloudfront-2",text:"دالة CloudFront"},{depth:2,id:"اختيار-المشغل-الصحيح",text:"اختيار المشغّل الصحيح"}],l=`<p>تحلّ دوال الحافة فئة محدّدة من المشكلات: أمورًا تحتاج إلى إنجازها في كل طلب (أو في كل استجابة) قبل أن يرى العميل أو الأصل حركة المرور. على منصات مثل Vercel أو Netlify، يعيش هذا المنطق في ملفات تهيئة أو وسيط أو دوال حافة بأسماء مشابهة. وعلى AWS، يعيش في CloudFront Functions أو Lambda@Edge، حسب التعقيد. ومن تجربتي، تتكرر حالتا إعادة كتابة URL وإعادة التوجيه باستمرار—أما البقية فظرفية لكنها تستحق المعرفة.</p>
<p>إن أردت نسخة AWS من سلوك وقت التشغيل أثناء قراءتك، فـ<a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/cloudfront-functions.html">دليل CloudFront Functions</a> هو المرجع الرسمي.</p>
<p>يغطّي هذا الدرس أكثر حالات الاستخدام شيوعًا عند مهندسي الواجهة الأمامية. وكل حالة تتضمن مقطع شيفرة قصيرًا يمكنك تكييفه. وللمقارنة الكاملة بين متى تستخدم CloudFront Functions ومتى تستخدم Lambda@Edge، ارجع إلى <a href="https://stevekinney.com/courses/aws/edge-compute-comparison">Lambda@Edge مقابل CloudFront Functions</a>.</p>
<h2 id="إعادة-كتابة-url">إعادة كتابة URL</h2>
<p>تغيّر إعادة كتابة URL مسار الطلب دون أن يعلم العميل. فما زال المتصفح يعرض URL الأصلي، لكن CloudFront (أو الأصل) يقدّم المحتوى من مسار مختلف.</p>
<p>أكثر إعادة كتابة شيوعًا عند مهندسي الواجهة الأمامية: ترجمة URLs النظيفة إلى مفاتيح كائنات S3 الفعلية.</p>
<h3 id="دالة-cloudfront">دالة CloudFront</h3>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">handler</span>(<span class="hljs-params">event</span>) {
  <span class="hljs-keyword">var</span> request = event.<span class="hljs-property">request</span>;
  <span class="hljs-keyword">var</span> uri = request.<span class="hljs-property">uri</span>;

  <span class="hljs-comment">// Rewrite /docs/getting-started to /docs/getting-started/index.html</span>
  <span class="hljs-keyword">if</span> (uri.<span class="hljs-title function_">endsWith</span>(<span class="hljs-string">&#x27;/&#x27;</span>)) {
    request.<span class="hljs-property">uri</span> += <span class="hljs-string">&#x27;index.html&#x27;</span>;
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (!uri.<span class="hljs-title function_">includes</span>(<span class="hljs-string">&#x27;.&#x27;</span>)) {
    request.<span class="hljs-property">uri</span> += <span class="hljs-string">&#x27;/index.html&#x27;</span>;
  }

  <span class="hljs-keyword">return</span> request;
}
</code></pre>
<p>هذه دالة <strong>طلب المشاهد</strong>. تعمل قبل فحص الذاكرة المؤقتة، لذا تخزّن CloudFront المحتوى مؤقتًا تحت URI المُعاد كتابته.</p>
<h2 id="إعادة-التوجيه">إعادة التوجيه</h2>
<p>تخبر إعادة التوجيه المتصفح بالذهاب إلى URL مختلف. وخلافًا لإعادة الكتابة، يرى العميل URL الجديد في شريط العنوان.</p>
<h3 id="دالة-cloudfront-1">دالة CloudFront</h3>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">handler</span>(<span class="hljs-params">event</span>) {
  <span class="hljs-keyword">var</span> request = event.<span class="hljs-property">request</span>;
  <span class="hljs-keyword">var</span> host = request.<span class="hljs-property">headers</span>.<span class="hljs-property">host</span>.<span class="hljs-property">value</span>;

  <span class="hljs-comment">// Redirect www to apex domain</span>
  <span class="hljs-keyword">if</span> (host === <span class="hljs-string">&#x27;www.example.com&#x27;</span>) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">statusCode</span>: <span class="hljs-number">301</span>,
      <span class="hljs-attr">statusDescription</span>: <span class="hljs-string">&#x27;Moved Permanently&#x27;</span>,
      <span class="hljs-attr">headers</span>: {
        <span class="hljs-attr">location</span>: { <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;https://example.com&#x27;</span> + request.<span class="hljs-property">uri</span> },
      },
    };
  }

  <span class="hljs-keyword">return</span> request;
}
</code></pre>
<p>يمكنك أيضًا بناء خريطة إعادة توجيه للصفحات المرحّلة:</p>
<pre><code class="language-javascript"><span class="hljs-keyword">var</span> redirects = {
  <span class="hljs-string">&#x27;/old-blog&#x27;</span>: <span class="hljs-string">&#x27;/blog&#x27;</span>,
  <span class="hljs-string">&#x27;/about-us&#x27;</span>: <span class="hljs-string">&#x27;/about&#x27;</span>,
  <span class="hljs-string">&#x27;/docs/v1&#x27;</span>: <span class="hljs-string">&#x27;/docs&#x27;</span>,
};

<span class="hljs-keyword">function</span> <span class="hljs-title function_">handler</span>(<span class="hljs-params">event</span>) {
  <span class="hljs-keyword">var</span> request = event.<span class="hljs-property">request</span>;
  <span class="hljs-keyword">var</span> target = redirects[request.<span class="hljs-property">uri</span>];

  <span class="hljs-keyword">if</span> (target) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">statusCode</span>: <span class="hljs-number">301</span>,
      <span class="hljs-attr">statusDescription</span>: <span class="hljs-string">&#x27;Moved Permanently&#x27;</span>,
      <span class="hljs-attr">headers</span>: {
        <span class="hljs-attr">location</span>: { <span class="hljs-attr">value</span>: target },
      },
    };
  }

  <span class="hljs-keyword">return</span> request;
}
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>أبقِ خريطة إعادة التوجيه صغيرة. فيجب أن تتّسع دالتك كاملة في 10 KB عند استخدام CloudFront Functions. فإن كانت لديك مئات من عمليات إعادة التوجيه، فالجواب الصحيح هو <strong>CloudFront KeyValueStore</strong> (KVS، متاح عمومًا منذ ديسمبر 2023): أبقِ الدالة نفسها صغيرة، وخزّن خريطة إعادة التوجيه في نسخة KVS، واقرأها في وقت التشغيل عبر واجهة <code>cf.kvs()</code>. فتبقى الدالة أقل بكثير من حد الحجم، وتُحدَّث البيانات باستقلال دون إعادة نشر الدالة. أما المنطق المعقّد حقًا الذي يحتاج إلى وصول شبكي، فاستخدم دالة Lambda@Edge مع مشغّل طلب الأصل.</p>
</blockquote>
<h2 id="ترويسات-الأمان">ترويسات الأمان</h2>
<p>يمكنك إضافة ترويسات أمان باستخدام سياسة ترويسات استجابة في CloudFront—وقد أعددت واحدة في <a href="https://stevekinney.com/courses/aws/cloudfront-headers-cors-and-security">ترويسات CloudFront وCORS والأمان</a>. لكن إن كنت تحتاج إلى منطق ترويسات شرطي أو ترويسات تعتمد على الطلب، فدالة الحافة تمنحك تحكمًا أكبر.</p>
<h3 id="دالة-cloudfront-استجابة-المشاهد">دالة CloudFront (استجابة المشاهد)</h3>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">handler</span>(<span class="hljs-params">event</span>) {
  <span class="hljs-keyword">var</span> response = event.<span class="hljs-property">response</span>;
  <span class="hljs-keyword">var</span> headers = response.<span class="hljs-property">headers</span>;

  headers[<span class="hljs-string">&#x27;strict-transport-security&#x27;</span>] = {
    <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;max-age=63072000; includeSubDomains; preload&#x27;</span>,
  };
  headers[<span class="hljs-string">&#x27;x-content-type-options&#x27;</span>] = { <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;nosniff&#x27;</span> };
  headers[<span class="hljs-string">&#x27;x-frame-options&#x27;</span>] = { <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;DENY&#x27;</span> };
  headers[<span class="hljs-string">&#x27;x-xss-protection&#x27;</span>] = { <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;1; mode=block&#x27;</span> };
  headers[<span class="hljs-string">&#x27;referrer-policy&#x27;</span>] = { <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;strict-origin-when-cross-origin&#x27;</span> };
  headers[<span class="hljs-string">&#x27;content-security-policy&#x27;</span>] = {
    <span class="hljs-attr">value</span>: <span class="hljs-string">&quot;default-src &#x27;self&#x27;; script-src &#x27;self&#x27;; style-src &#x27;self&#x27; &#x27;unsafe-inline&#x27;&quot;</span>,
  };

  <span class="hljs-keyword">return</span> response;
}
</code></pre>
<p><em>ملاحظة:</em> عدّل توجيه <code>Content-Security-Policy</code> ليطابق متطلبات تطبيقك.</p>
<p>هذه دالة <strong>استجابة المشاهد</strong>. تعمل بعد أن يحصل CloudFront على الاستجابة (من الذاكرة المؤقتة أو من الأصل) وقبل أن يرسلها إلى العميل.</p>
<h2 id="التوجيه-الجغرافي">التوجيه الجغرافي</h2>
<p>تضيف CloudFront ترويسات تحديد الموقع الجغرافي إلى الطلبات قبل أن تصل إلى دالة الحافة لديك. ويمكنك استخدام هذه الترويسات لتوجيه المستخدمين إلى محتوى خاص بمنطقة أو لتخصيص الاستجابة حسب الموقع.</p>
<h3 id="lambdaedge-طلب-الأصل">Lambda@Edge (طلب الأصل)</h3>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">CloudFrontRequestHandler</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-lambda&#x27;</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">handler</span>: <span class="hljs-title class_">CloudFrontRequestHandler</span> = <span class="hljs-title function_">async</span> (event) =&gt; {
  <span class="hljs-keyword">const</span> request = event.<span class="hljs-property">Records</span>[<span class="hljs-number">0</span>].<span class="hljs-property">cf</span>.<span class="hljs-property">request</span>;
  <span class="hljs-keyword">const</span> country = request.<span class="hljs-property">headers</span>[<span class="hljs-string">&#x27;cloudfront-viewer-country&#x27;</span>]?.[<span class="hljs-number">0</span>]?.<span class="hljs-property">value</span>;

  <span class="hljs-keyword">if</span> (country === <span class="hljs-string">&#x27;DE&#x27;</span> || country === <span class="hljs-string">&#x27;AT&#x27;</span> || country === <span class="hljs-string">&#x27;CH&#x27;</span>) {
    request.<span class="hljs-property">uri</span> = <span class="hljs-string">&#x27;/de&#x27;</span> + request.<span class="hljs-property">uri</span>;
  } <span class="hljs-keyword">else</span> <span class="hljs-keyword">if</span> (country === <span class="hljs-string">&#x27;FR&#x27;</span>) {
    request.<span class="hljs-property">uri</span> = <span class="hljs-string">&#x27;/fr&#x27;</span> + request.<span class="hljs-property">uri</span>;
  }

  <span class="hljs-keyword">return</span> request;
};
</code></pre>
<p><em>ملاحظة:</em> الافتراضي: تقديم النسخة الإنجليزية على URI الأصلي.</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>لا تتوفر ترويسة <code>cloudfront-viewer-country</code> إلا إذا كانت تهيئة سلوك الذاكرة المؤقتة لديك تمرّرها. في سياسة الذاكرة المؤقتة أو سياسة طلب الأصل في توزيعك، يجب أن تضع الترويسة <code>CloudFront-Viewer-Country</code> في القائمة المسموحة. فبدون ذلك، لن تظهر الترويسة في حدث دالتك.</p>
</blockquote>
<p>هذه دالة Lambda@Edge لأن التوجيه الجغرافي يحتاج عادةً إلى العمل على مستوى <strong>طلب الأصل</strong>—فأنت تريد أن يكون قرار التوجيه قابلًا للتخزين المؤقت لكل بلد، لا أن يُعاد تقييمه في كل طلب مشاهد.</p>
<h2 id="فحوصات-المصادقة-على-الحافة">فحوصات المصادقة على الحافة</h2>
<p>للمحتوى الخاص—صفحات الأعضاء فقط، ولوحات الإدارة، وبيئات الاختبار—يمكنك التحقق من المصادقة قبل أن يصل الطلب أصلًا إلى أصلك.</p>
<h3 id="دالة-cloudfront-مصادقة-أساسية-لبيئة-الاختبار">دالة CloudFront (مصادقة أساسية لبيئة الاختبار)</h3>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">handler</span>(<span class="hljs-params">event</span>) {
  <span class="hljs-keyword">var</span> request = event.<span class="hljs-property">request</span>;
  <span class="hljs-keyword">var</span> headers = request.<span class="hljs-property">headers</span>;
  <span class="hljs-keyword">var</span> expected = <span class="hljs-string">&#x27;Basic &#x27;</span> + <span class="hljs-string">&#x27;c3RhZ2luZzpwYXNzd29yZA==&#x27;</span>;

  <span class="hljs-keyword">if</span> (!headers.<span class="hljs-property">authorization</span> || headers.<span class="hljs-property">authorization</span>.<span class="hljs-property">value</span> !== expected) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">statusCode</span>: <span class="hljs-number">401</span>,
      <span class="hljs-attr">statusDescription</span>: <span class="hljs-string">&#x27;Unauthorized&#x27;</span>,
      <span class="hljs-attr">headers</span>: {
        <span class="hljs-string">&#x27;www-authenticate&#x27;</span>: { <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;Basic realm=&quot;Staging&quot;&#x27;</span> },
      },
    };
  }

  <span class="hljs-keyword">return</span> request;
}
</code></pre>
<p>هذا مثال أدنى لحماية بيئة اختبار بمصادقة HTTP الأساسية (اسم المستخدم: <code>staging</code>، وكلمة المرور: <code>password</code>). وهو ليس حل مصادقة للإنتاج—فبيانات الاعتماد مضمّنة في الشيفرة ومشفّرة بـ base64 داخل الدالة.</p>
<h3 id="lambdaedge-التحقق-من-jwt">Lambda@Edge (التحقق من JWT)</h3>
<p>من أجل مصادقة حقيقية، تحتاج إلى Lambda@Edge لأنك غالبًا تحتاج إلى التحقق من JWT، وهذا يتطلب إما مكتبة تشفير أو استدعاءً شبكيًا إلى نقطة نهاية JWKS.</p>
<pre><code class="language-typescript"><span class="hljs-keyword">import</span> <span class="hljs-keyword">type</span> { <span class="hljs-title class_">CloudFrontRequestHandler</span> } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;aws-lambda&#x27;</span>;
<span class="hljs-keyword">import</span> { verify } <span class="hljs-keyword">from</span> <span class="hljs-string">&#x27;jsonwebtoken&#x27;</span>;

<span class="hljs-keyword">const</span> <span class="hljs-variable constant_">PUBLIC_KEY</span> = <span class="hljs-string">\`-----BEGIN PUBLIC KEY-----
...your public key here...
-----END PUBLIC KEY-----\`</span>;

<span class="hljs-keyword">export</span> <span class="hljs-keyword">const</span> <span class="hljs-attr">handler</span>: <span class="hljs-title class_">CloudFrontRequestHandler</span> = <span class="hljs-title function_">async</span> (event) =&gt; {
  <span class="hljs-keyword">const</span> request = event.<span class="hljs-property">Records</span>[<span class="hljs-number">0</span>].<span class="hljs-property">cf</span>.<span class="hljs-property">request</span>;
  <span class="hljs-keyword">const</span> cookies = request.<span class="hljs-property">headers</span>.<span class="hljs-property">cookie</span>;

  <span class="hljs-keyword">const</span> token = <span class="hljs-title function_">parseCookie</span>(cookies, <span class="hljs-string">&#x27;auth_token&#x27;</span>);

  <span class="hljs-keyword">if</span> (!token) {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;401&#x27;</span>,
      <span class="hljs-attr">statusDescription</span>: <span class="hljs-string">&#x27;Unauthorized&#x27;</span>,
      <span class="hljs-attr">body</span>: <span class="hljs-string">&#x27;Missing authentication token&#x27;</span>,
    };
  }

  <span class="hljs-keyword">try</span> {
    <span class="hljs-title function_">verify</span>(token, <span class="hljs-variable constant_">PUBLIC_KEY</span>, { <span class="hljs-attr">algorithms</span>: [<span class="hljs-string">&#x27;RS256&#x27;</span>] });
    <span class="hljs-keyword">return</span> request;
  } <span class="hljs-keyword">catch</span> {
    <span class="hljs-keyword">return</span> {
      <span class="hljs-attr">status</span>: <span class="hljs-string">&#x27;403&#x27;</span>,
      <span class="hljs-attr">statusDescription</span>: <span class="hljs-string">&#x27;Forbidden&#x27;</span>,
      <span class="hljs-attr">body</span>: <span class="hljs-string">&#x27;Invalid authentication token&#x27;</span>,
    };
  }
};

<span class="hljs-keyword">function</span> <span class="hljs-title function_">parseCookie</span>(<span class="hljs-params">
  <span class="hljs-attr">cookieHeaders</span>: <span class="hljs-title class_">Array</span>&lt;{ key?: <span class="hljs-built_in">string</span>; value: <span class="hljs-built_in">string</span> }&gt; | <span class="hljs-literal">undefined</span>,
  <span class="hljs-attr">name</span>: <span class="hljs-built_in">string</span>,
</span>): <span class="hljs-built_in">string</span> | <span class="hljs-literal">undefined</span> {
  <span class="hljs-keyword">if</span> (!cookieHeaders) <span class="hljs-keyword">return</span> <span class="hljs-literal">undefined</span>;
  <span class="hljs-keyword">for</span> (<span class="hljs-keyword">const</span> header <span class="hljs-keyword">of</span> cookieHeaders) {
    <span class="hljs-keyword">const</span> match = header.<span class="hljs-property">value</span>.<span class="hljs-title function_">match</span>(<span class="hljs-keyword">new</span> <span class="hljs-title class_">RegExp</span>(<span class="hljs-string">\`<span class="hljs-subst">\${name}</span>=([^;]+)\`</span>));
    <span class="hljs-keyword">if</span> (match) <span class="hljs-keyword">return</span> match[<span class="hljs-number">1</span>];
  }
  <span class="hljs-keyword">return</span> <span class="hljs-literal">undefined</span>;
}
</code></pre>
<p>تتحقق هذه الدالة من JWT قادم من ملف تعريف ارتباط في كل طلب مشاهد. وهي تستخدم حزمة <code>jsonwebtoken</code> من npm—ولهذا يجب أن تكون Lambda@Edge لا CloudFront Function.</p>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>إن ضمّنت المفتاح العام مباشرة في الدالة (بدلًا من جلبه من نقطة نهاية JWKS)، فتتجنّب استدعاءً شبكيًا في كل طلب. والمقايضة أنك تحتاج إلى إعادة نشر الدالة عندما يُدوَّر المفتاح.</p>
</blockquote>
<h2 id="كشف-اللغة">كشف اللغة</h2>
<p>كشف اللغة المفضّلة للمستخدم من ترويسة <code>Accept-Language</code> وتقديم محتوى محلي نمط شائع آخر.</p>
<h3 id="دالة-cloudfront-2">دالة CloudFront</h3>
<pre><code class="language-javascript"><span class="hljs-keyword">function</span> <span class="hljs-title function_">handler</span>(<span class="hljs-params">event</span>) {
  <span class="hljs-keyword">var</span> request = event.<span class="hljs-property">request</span>;
  <span class="hljs-keyword">var</span> acceptLanguage = request.<span class="hljs-property">headers</span>[<span class="hljs-string">&#x27;accept-language&#x27;</span>];

  <span class="hljs-keyword">if</span> (acceptLanguage) {
    <span class="hljs-keyword">var</span> lang = acceptLanguage.<span class="hljs-property">value</span>.<span class="hljs-title function_">substring</span>(<span class="hljs-number">0</span>, <span class="hljs-number">2</span>).<span class="hljs-title function_">toLowerCase</span>();
    <span class="hljs-keyword">var</span> supported = [<span class="hljs-string">&#x27;en&#x27;</span>, <span class="hljs-string">&#x27;es&#x27;</span>, <span class="hljs-string">&#x27;fr&#x27;</span>, <span class="hljs-string">&#x27;de&#x27;</span>, <span class="hljs-string">&#x27;ja&#x27;</span>];

    <span class="hljs-keyword">if</span> (supported.<span class="hljs-title function_">indexOf</span>(lang) !== -<span class="hljs-number">1</span>) {
      request.<span class="hljs-property">headers</span>[<span class="hljs-string">&#x27;x-detected-language&#x27;</span>] = { <span class="hljs-attr">value</span>: lang };
    } <span class="hljs-keyword">else</span> {
      request.<span class="hljs-property">headers</span>[<span class="hljs-string">&#x27;x-detected-language&#x27;</span>] = { <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;en&#x27;</span> };
    }
  } <span class="hljs-keyword">else</span> {
    request.<span class="hljs-property">headers</span>[<span class="hljs-string">&#x27;x-detected-language&#x27;</span>] = { <span class="hljs-attr">value</span>: <span class="hljs-string">&#x27;en&#x27;</span> };
  }

  <span class="hljs-keyword">return</span> request;
}
</code></pre>
<p>يضبط هذا ترويسة مخصّصة يستطيع أصلك أو دالة حافة أخرى استخدامها لتقديم المحتوى الصحيح. وتعمل الدالة كدالة <strong>طلب مشاهد</strong> كي يحدث كشف اللغة قبل فحص الذاكرة المؤقتة.</p>
<h2 id="اختيار-المشغل-الصحيح">اختيار المشغّل الصحيح</h2>
<p>كل حالة استخدام أعلاه تقابل نوع حدث محدّدًا. إليك مرجعًا سريعًا:</p>
<table>
<thead>
<tr>
<th>حالة الاستخدام</th>
<th>نوع الحدث</th>
<th>الموصى به</th>
</tr>
</thead>
<tbody>
<tr>
<td>إعادة كتابة URL (URLs نظيفة)</td>
<td>طلب المشاهد</td>
<td>دالة CloudFront</td>
</tr>
<tr>
<td>إعادة التوجيه</td>
<td>طلب المشاهد</td>
<td>دالة CloudFront</td>
</tr>
<tr>
<td>ترويسات الأمان</td>
<td>استجابة المشاهد</td>
<td>دالة CloudFront</td>
</tr>
<tr>
<td>التوجيه الجغرافي</td>
<td>طلب الأصل</td>
<td>Lambda@Edge</td>
</tr>
<tr>
<td>المصادقة الأساسية لبيئة الاختبار</td>
<td>طلب المشاهد</td>
<td>دالة CloudFront</td>
</tr>
<tr>
<td>التحقق من JWT</td>
<td>طلب المشاهد</td>
<td>Lambda@Edge</td>
</tr>
<tr>
<td>كشف اللغة</td>
<td>طلب المشاهد</td>
<td>دالة CloudFront</td>
</tr>
<tr>
<td>اختبار A/B</td>
<td>طلب المشاهد</td>
<td>أيّهما (يعتمد على التعقيد)</td>
</tr>
</tbody>
</table>
<p>الدرس التالي، <a href="https://stevekinney.com/courses/aws/ab-testing-at-the-edge">اختبار A/B على الحافة</a>، يتعمّق في واحدة من أكثر حالات الاستخدام إثارة للاهتمام.</p>
`,r={book:s,chapter:"aws",chapterTitle:n,slug:a,title:p,headings:t,html:l};export{s as book,e as chapter,n as chapterTitle,r as default,t as headings,l as html,a as slug,p as title};
