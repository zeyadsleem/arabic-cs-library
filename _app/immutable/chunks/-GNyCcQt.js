const s="kinney",c="aws",n="نشر تطبيقات الويب على AWS",a="cloudfront-headers-cors-and-security",t="الترويسات وCORS وسياسات الأمان",p=[{depth:2,id:"لماذا-تهم-ترويسات-الأمان",text:"لماذا تهم ترويسات الأمان"},{depth:2,id:"السياسات-المدارة-مقابل-سياسات-ترويسات-الاستجابة-المخصصة",text:"السياسات المُدارة مقابل سياسات ترويسات الاستجابة المخصّصة"},{depth:2,id:"إرفاق-سياسة-مدارة",text:"إرفاق سياسة مُدارة"},{depth:2,id:"إنشاء-سياسة-ترويسات-استجابة-مخصصة",text:"إنشاء سياسة ترويسات استجابة مخصّصة"},{depth:2,id:"تفكيك-السياسة-المخصصة",text:"تفكيك السياسة المخصّصة"},{depth:3,id:"securityheadersconfig",text:"SecurityHeadersConfig"},{depth:3,id:"corsconfig",text:"CorsConfig"},{depth:3,id:"customheadersconfig",text:"CustomHeadersConfig"},{depth:2,id:"cors-لاستدعاءات-api",text:"CORS لاستدعاءات API"},{depth:2,id:"التحقق-من-ترويساتك",text:"التحقق من ترويساتك"}],o=`<p>يقدّم توزيع CloudFront الخاص بك موقعك الثابت عبر HTTPS، ويوجّه مسارات SPA بشكل صحيح، ويحمي S3 عبر التحكم في الوصول إلى الأصل (Origin Access Control). لكن افتح أدوات مطوّري المتصفح (DevTools)، وافحص ترويسات الاستجابة على أي طلب، وستلاحظ شيئًا ناقصًا: لا توجد ترويسات أمان. لا <code>Strict-Transport-Security</code>. لا <code>X-Content-Type-Options</code>. لا <code>X-Frame-Options</code>. لا يضيف S3 هذه الترويسات، ولا يضيفها CloudFront افتراضيًا.</p>
<p>إذا أردت أن تطّلع على نسخة AWS من آليات ترويسات الاستجابة أثناء القراءة، فإن <a href="https://docs.aws.amazon.com/AmazonCloudFront/latest/DeveloperGuide/modifying-response-headers.html">دليل سياسة ترويسات استجابة CloudFront</a> هو المرجع الرسمي.</p>
<p>على Vercel، تضبط هذه الترويسات في <code>vercel.json</code> أو <code>next.config.js</code>. وعلى Netlify، تستخدم <code>_headers</code>. وعلى AWS، تستخدم <strong>سياسة ترويسات استجابة</strong> (response headers policy) في CloudFront.</p>
<h2 id="لماذا-تهم-ترويسات-الأمان">لماذا تهم ترويسات الأمان</h2>
<p>ترويسات الأمان هي ترويسات استجابة HTTP توجّه المتصفح إلى التصرف بطرق تحمي مستخدميك. وهي لا تحلّ محل الأمان على جانب الخادم، لكنها تسدّ نواقل هجوم شائعة:</p>
<ul>
<li><strong><code>Strict-Transport-Security</code> (HSTS)</strong>: تخبر المتصفح بأن يتصل بموقعك عبر HTTPS فقط، حتى لو كتب المستخدم <code>http://</code>. وتمنع هجمات تخفيض البروتوكول وتجريد SSL.</li>
<li><strong><code>X-Content-Type-Options: nosniff</code></strong>: تمنع المتصفح من استنتاج نوع استجابة يخالف <code>Content-Type</code> المعلن عبر استنشاق MIME. وتمنع المهاجم من خداع المتصفح لتنفيذ ملف بوصفه JavaScript بينما كان يُفترض أن يكون صورة.</li>
<li><strong><code>X-Frame-Options</code></strong>: تمنع تضمين موقعك داخل <code>&lt;iframe&gt;</code> في نطاق آخر. وتسدّ هجمات النقر المخادع (clickjacking). القيمة <code>DENY</code> تمنع كل تأطير؛ و<code>SAMEORIGIN</code> (وهي ما ترسله سياسة <code>SecurityHeadersPolicy</code> المُدارة) تسمح لنطاقك بتأطير نفسه. اختر <code>DENY</code> ما لم يكن لديك سبب محدّد لتأطير موقعك بنفسه.</li>
<li><strong><code>Referrer-Policy: strict-origin-when-cross-origin</code></strong>: تتحكم في مقدار معلومات المُحيل (referrer) التي تُضمّن في الطلبات إلى مواقع أخرى. وتمنع تسريب مسارات URL الحساسة.</li>
<li><strong><code>Content-Security-Policy</code></strong>: الترويسة الكبرى. تحدّد المصادر المسموح لها بتحميل السكربتات والأنماط والصور والموارد الأخرى. وسياسة CSP مضبوطة جيدًا هي أفضل دفاع فعّال ضد هجمات XSS.</li>
</ul>
<p>من دون هذه الترويسات، موقعك ليس خطرًا — لكنه ليس محصّنًا أيضًا. وأي تدقيق أمني سيسجّل غيابها.</p>
<h2 id="السياسات-المدارة-مقابل-سياسات-ترويسات-الاستجابة-المخصصة">السياسات المُدارة مقابل سياسات ترويسات الاستجابة المخصّصة</h2>
<p>تقدّم CloudFront <strong>سياسات ترويسات استجابة مُدارة</strong> تغطّي إعدادات شائعة، ويمكنك أيضًا إنشاء <strong>سياسات مخصّصة</strong> لمزيد من التحكم.</p>
<p>السياسات المُدارة الجديرة بالمعرفة:</p>
<table>
<thead>
<tr>
<th>اسم السياسة</th>
<th>المعرّف</th>
<th>ما تتضمنه</th>
</tr>
</thead>
<tbody>
<tr>
<td><strong>SecurityHeadersPolicy</strong></td>
<td><code>67f7725c-6f97-4210-82d7-5512b31e9d03</code></td>
<td>HSTS وX-Content-Type-Options وX-Frame-Options وX-XSS-Protection وReferrer-Policy</td>
</tr>
<tr>
<td><strong>SimpleCORS</strong></td>
<td><code>60669652-455b-4ae9-85a4-c4c02393f86c</code></td>
<td><code>Access-Control-Allow-Origin: *</code> على كل الاستجابات</td>
</tr>
<tr>
<td><strong>CORS-with-preflight</strong></td>
<td><code>5cc3b908-e619-4b99-88e5-2cf7f45965bd</code></td>
<td>CORS كامل مع دعم التحقق المسبق (<code>Access-Control-Allow-Origin</code> و<code>Access-Control-Allow-Methods</code> و<code>Access-Control-Allow-Headers</code>)</td>
</tr>
<tr>
<td><strong>CORS-with-preflight-and-SecurityHeadersPolicy</strong></td>
<td><code>eaab4381-ed33-4a86-88ca-d9558dc6cd63</code></td>
<td>كل ما في CORS-with-preflight إضافة إلى كل ترويسات الأمان</td>
</tr>
</tbody>
</table>
<p>لموقع ثابت لا يقدّم استجابات API ولا يحتاج CORS (فالواجهة الأمامية وأصولك على النطاق نفسه)، تعدّ <strong>SecurityHeadersPolicy</strong> نقطة البداية الصحيحة. وإذا كانت واجهتك الأمامية تستدعي واجهات API على نطاق مختلف وتُقدَّم تلك الواجهات عبر توزيع CloudFront نفسه، فاستخدم <strong>CORS-with-preflight-and-SecurityHeadersPolicy</strong>.</p>
<p>في لوحة التحكم، تسرد صفحة <strong>Policies</strong> ضمن <strong>Response headers</strong> كل السياسات المُدارة المتاحة مع أوصافها.</p>
<p><img src="/arabic-cs-library/images/kinney/7e90e9fcd5a89d90.webp" alt="صفحة CloudFront Policies وهي تعرض تبويب Response headers مع سياسات مُدارة تشمل SecurityHeadersPolicy وCORS-With-Preflight وCORS-and-SecurityHeadersPolicy."></p>
<h2 id="إرفاق-سياسة-مدارة">إرفاق سياسة مُدارة</h2>
<p>أسرع طريقة لإضافة ترويسات الأمان هي إرفاق سياسة مُدارة بسلوك التخزين المؤقت الافتراضي لديك. اجلب إعدادات التوزيع الحالية، وأضف <code>ResponseHeadersPolicyId</code>، ثم حدّث.</p>
<p>اجلب:</p>
<pre><code class="language-bash">aws cloudfront get-distribution-config \\
  --<span class="hljs-built_in">id</span> E1A2B3C4D5E6F7 \\
  --region us-east-1 \\
  --output json &gt; distribution-config-current.json
</code></pre>
<p>أضف <code>ResponseHeadersPolicyId</code> إلى <code>DefaultCacheBehavior</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;DefaultCacheBehavior&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;TargetOriginId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;S3-my-frontend-app-assets&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;ViewerProtocolPolicy&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;redirect-to-https&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;CachePolicyId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;658327ea-f89d-4fab-a63d-7e88639e58f6&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;ResponseHeadersPolicyId&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;67f7725c-6f97-4210-82d7-5512b31e9d03&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Compress&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;AllowedMethods&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Quantity&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Items&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;GET&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;HEAD&quot;</span><span class="hljs-punctuation">]</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;CachedMethods&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Quantity&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;Items&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;GET&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;HEAD&quot;</span><span class="hljs-punctuation">]</span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>حدّث:</p>
<pre><code class="language-bash">aws cloudfront update-distribution \\
  --<span class="hljs-built_in">id</span> E1A2B3C4D5E6F7 \\
  --if-match E2QWRUHEXAMPLE \\
  --distribution-config file://distribution-config-updated.json \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>في لوحة التحكم، ترفق السياسة بسلوك من نموذج <strong>Edit behavior</strong>. وتعرض قائمة <strong>Response headers policy</strong> المنسدلة السياسات المُدارة إلى جانب أي سياسات مخصّصة أنشأتها.</p>
<p><img src="/arabic-cs-library/images/kinney/e8d2f29f92c6e852.webp" alt="نموذج CloudFront Edit behavior وهو يعرض قسم Response headers policy مع اختيار SecurityHeadersPolicy من القائمة المنسدلة."></p>
<p>بعد نشر التوزيع، ستتضمن كل استجابة من CloudFront ترويسات الأمان:</p>
<pre><code>strict-transport-security: max-age=31536000
x-content-type-options: nosniff
x-frame-options: SAMEORIGIN
x-xss-protection: 1; mode=block
referrer-policy: strict-origin-when-cross-origin
</code></pre>
<blockquote>
<p><strong>نصيحة</strong></p>
<p>يمكنك التحقق من الترويسات باستخدام <code>curl -I https://d1234abcdef.cloudfront.net</code>. فإن لم ترَ ترويسات الأمان، فانتظر حتى يكتمل نشر التوزيع وحاول مرة أخرى. وقد تحتاج أيضًا إلى تفريغ ذاكرة الحافة المؤقتة بإنشاء إبطال (invalidation).</p>
</blockquote>
<h2 id="إنشاء-سياسة-ترويسات-استجابة-مخصصة">إنشاء سياسة ترويسات استجابة مخصّصة</h2>
<p>تغطّي السياسات المُدارة الحالات الشائعة، لكنك قد تحتاج إلى إعداد مخصّص — ربما تريد HSTS بـ <code>max-age</code> أطول، أو تحتاج ترويسة <code>Content-Security-Policy</code> مصمّمة لتطبيقك. لذلك أنشئ سياسة ترويسات استجابة مخصّصة.</p>
<p>احفظ هذا باسم <code>response-headers-policy.json</code>:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;Name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;my-frontend-app-headers&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;Comment&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Security and CORS headers for my-frontend-app&quot;</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;SecurityHeadersConfig&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;StrictTransportSecurity&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;AccessControlMaxAgeSec&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">63072000</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;IncludeSubdomains&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Preload&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Override&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;ContentTypeOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Override&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;FrameOptions&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;FrameOption&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;DENY&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Override&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;ReferrerPolicy&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;ReferrerPolicy&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;strict-origin-when-cross-origin&quot;</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Override&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;XSSProtection&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;ModeBlock&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Protection&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Override&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;CorsConfig&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;AccessControlAllowOrigins&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Quantity&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Items&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;https://example.com&quot;</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;AccessControlAllowMethods&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Quantity&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Items&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;GET&quot;</span><span class="hljs-punctuation">,</span> <span class="hljs-string">&quot;HEAD&quot;</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;AccessControlAllowHeaders&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Quantity&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">1</span><span class="hljs-punctuation">,</span>
      <span class="hljs-attr">&quot;Items&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span><span class="hljs-string">&quot;*&quot;</span><span class="hljs-punctuation">]</span>
    <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;AccessControlAllowCredentials&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">false</span></span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;AccessControlMaxAgeSec&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">86400</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;OriginOverride&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
  <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
  <span class="hljs-attr">&quot;CustomHeadersConfig&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Quantity&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-number">2</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;Items&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">[</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Header&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Permissions-Policy&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;Value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;camera=(), microphone=(), geolocation=()&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;Override&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
      <span class="hljs-punctuation">}</span><span class="hljs-punctuation">,</span>
      <span class="hljs-punctuation">{</span>
        <span class="hljs-attr">&quot;Header&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;Content-Security-Policy&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;Value&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;default-src &#x27;self&#x27;; img-src &#x27;self&#x27; data:; style-src &#x27;self&#x27; &#x27;unsafe-inline&#x27;; script-src &#x27;self&#x27;; connect-src &#x27;self&#x27; https://api.example.com; frame-ancestors &#x27;none&#x27;&quot;</span><span class="hljs-punctuation">,</span>
        <span class="hljs-attr">&quot;Override&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-literal"><span class="hljs-keyword">true</span></span>
      <span class="hljs-punctuation">}</span>
    <span class="hljs-punctuation">]</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>أنشئ السياسة:</p>
<pre><code class="language-bash">aws cloudfront create-response-headers-policy \\
  --response-headers-policy-config file://response-headers-policy.json \\
  --region us-east-1 \\
  --output json
</code></pre>
<p>تتضمن الاستجابة معرّف السياسة:</p>
<pre><code class="language-json"><span class="hljs-punctuation">{</span>
  <span class="hljs-attr">&quot;ResponseHeadersPolicy&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
    <span class="hljs-attr">&quot;Id&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;a1b2c3d4-e5f6-7890-abcd-ef1234567890&quot;</span><span class="hljs-punctuation">,</span>
    <span class="hljs-attr">&quot;ResponseHeadersPolicyConfig&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-punctuation">{</span>
      <span class="hljs-attr">&quot;Name&quot;</span><span class="hljs-punctuation">:</span> <span class="hljs-string">&quot;my-frontend-app-headers&quot;</span>
    <span class="hljs-punctuation">}</span>
  <span class="hljs-punctuation">}</span>
<span class="hljs-punctuation">}</span>
</code></pre>
<p>استخدم هذا المعرّف في حقل <code>ResponseHeadersPolicyId</code> في سلوك التخزين المؤقت لديك، بالطريقة نفسها التي أرفقت بها السياسة المُدارة.</p>
<h2 id="تفكيك-السياسة-المخصصة">تفكيك السياسة المخصّصة</h2>
<h3 id="securityheadersconfig">SecurityHeadersConfig</h3>
<p>يمنحك إعداد ترويسات الأمان تحكمًا في كل ترويسة على حدة:</p>
<ul>
<li><strong><code>StrictTransportSecurity</code></strong>: <code>max-age=63072000</code> (سنتان)، و<code>includeSubDomains</code>، و<code>preload</code>. ويجعل العلم <code>preload</code> نطاقك مؤهلًا لـ <a href="https://hstspreload.org/">قوائم التحميل المسبق لـ HSTS</a>، التي تثبّت سياسة HTTPS فقط داخل المتصفحات.</li>
<li><strong><code>ContentTypeOptions</code></strong>: تضيف <code>X-Content-Type-Options: nosniff</code>. ولا تحتاج إعدادًا يتجاوز تمكينها.</li>
<li><strong><code>FrameOptions</code></strong>: القيمة <code>DENY</code> تمنع تضمين موقعك في أي iframe. استخدم <code>SAMEORIGIN</code> إذا كان موقعك يستخدم iframes داخليًا (مثلًا لتضمين لوحات معاينة). أنا أختار <code>DENY</code> افتراضيًا ولا أرخيها إلا عندما يكون لدي سبب <em>مؤكد</em>.</li>
<li><strong><code>ReferrerPolicy</code></strong>: ترسل <code>strict-origin-when-cross-origin</code> عنوان URL الكامل للطلبات ذات الأصل نفسه، لكنها ترسل الأصل فقط (دون المسار) للطلبات عبر الأصول المختلفة.</li>
<li><strong><code>XSSProtection</code></strong>: تضيف <code>X-XSS-Protection: 1; mode=block</code>. وكل متصفح حالي إما يتجاهل هذه الترويسة أو أزال المرشّح الأساسي الذي كانت تتحكم فيه. فهي ميتة فعليًا — وCSP (أدناه) هي الدفاع الحقيقي. وتضمينها لا يكلّفك شيئًا ويعدّ دفاعًا رخيصًا متعدد الطبقات، لكن لا تحسبها ضمن حكايتك مع XSS.</li>
</ul>
<p>يحدّد حقل <strong><code>Override</code></strong> في كل ترويسة ما إذا كانت قيمة CloudFront تتجاوز قيمة يضبطها الأصل. عندما تكون <code>true</code>، تستبدل CloudFront أي ترويسة موجودة من S3 بالقيمة المعرّفة في السياسة. وعندما تكون <code>false</code>، لا تضيف CloudFront الترويسة إلا إذا لم يكن الأصل قد ضمّنها. وبالنسبة إلى ترويسات الأمان، تريد دائمًا تقريبًا <code>Override: true</code> — فأنت مصدر الحقيقة لسياسة الأمان، لا S3.</p>
<h3 id="corsconfig">CorsConfig</h3>
<p>إذا كانت واجهتك الأمامية تجري طلبات API عبر الأصول المختلفة تُوجَّه عبر CloudFront (مثلًا سلوك <code>/api/*</code> يشير إلى API Gateway)، فإن إعداد CORS يخبر CloudFront بتضمين ترويسات <code>Access-Control-Allow-*</code> المناسبة. ولموقع ثابت يُقدَّم بالكامل من نطاق واحد، تكون ترويسات CORS اختيارية لكنها غير ضارة.</p>
<h3 id="customheadersconfig">CustomHeadersConfig</h3>
<p>يمكن إضافة أي ترويسة لا يغطّيها قسم الأمان أو CORS هنا.</p>
<ul>
<li><strong><code>Permissions-Policy</code></strong> (المعروفة سابقًا باسم <code>Feature-Policy</code>) تتحكم في ميزات المتصفح التي يمكن لموقعك استخدامها — فتعطّل الوصول إلى الكاميرا والميكروفون والموقع الجغرافي إن لم يكن موقعك بحاجة إليها.</li>
<li><strong><code>Content-Security-Policy</code></strong> هي الدفاع الحقيقي ضد XSS. والمثال هنا نقطة بداية محكمة: السكربتات والأنماط من أصلك فقط، والصور من أصلك ومن عناوين <code>data:</code> المضمّنة، وXHR/fetch إلى <code>https://api.example.com</code> فقط. والقيمة <code>frame-ancestors 'none'</code> تكرّر <code>X-Frame-Options: DENY</code> للمتصفحات التي تحترم CSP بدلًا من الترويسة القديمة. ومن شبه المؤكد أنك ستحتاج إلى إرخائها بعد ربط تطبيق حقيقي — ابدأ صارمًا وأضف المصادر كلما اشتكت وحدة تحكم المتصفح.</li>
</ul>
<h2 id="cors-لاستدعاءات-api">CORS لاستدعاءات API</h2>
<p>إذا كانت واجهتك الأمامية تستدعي API على أصل مختلف (مثلًا تطبيق React على <code>example.com</code> يستدعي <code>api.example.com</code>)، فأنت تحتاج ترويسات CORS على استجابات API. وهناك سيناريوهان:</p>
<p><strong>API يُقدَّم عبر CloudFront</strong> (مثلًا سلوك <code>/api/*</code> يشير إلى API Gateway): اضبط CORS في سياسة ترويسات الاستجابة المرفقة بذلك السلوك. وستضيف CloudFront الترويسات نيابة عنك.</p>
<p><strong>API يُقدَّم بشكل منفصل</strong> (مثلًا API Gateway بنطاقه الخاص): اضبط CORS على API Gateway مباشرة. وهذا مشمول في قسم API Gateway.</p>
<p>لواجهة أمامية ثابتة نموذجية تُقدَّم بالكامل عبر توزيع CloudFront واحد على نطاق واحد، لن تحتاج عمومًا إلى ترويسات CORS على أصولك الثابتة. فالمتصفح لا يفرض CORS إلا على الطلبات عبر الأصول المختلفة، وأصولك من الأصل نفسه.</p>
<h2 id="التحقق-من-ترويساتك">التحقق من ترويساتك</h2>
<p>بعد تحديث التوزيع، افحص ترويسات الاستجابة:</p>
<pre><code class="language-bash">curl -I https://d1234abcdef.cloudfront.net/index.html
</code></pre>
<p>ينبغي أن ترى ترويسات الأمان في الاستجابة:</p>
<pre><code>HTTP/2 200
strict-transport-security: max-age=63072000; includeSubDomains; preload
x-content-type-options: nosniff
x-frame-options: DENY
referrer-policy: strict-origin-when-cross-origin
x-xss-protection: 1; mode=block
permissions-policy: camera=(), microphone=(), geolocation=()
</code></pre>
<p>إذا كانت أي ترويسة ناقصة، فتحقق من أن معرّف سياسة ترويسات الاستجابة مرفق بسلوك التخزين المؤقت الصحيح، وأن التوزيع أكمل النشر، وأنك لا ترى استجابة مخزّنة مؤقتًا من قبل التحديث (أبطل الذاكرة المؤقتة إن لزم).</p>
<blockquote>
<p><strong>تحذير</strong></p>
<p>تنطبق سياسات ترويسات الاستجابة على كل الاستجابات التي يقدّمها سلوك التخزين المؤقت المرفقة به — بما في ذلك الاستجابات المخزّنة مؤقتًا. فإذا أرفقت سياسة بعد تخزين المحتوى مؤقتًا، فقد تحتاج إلى إنشاء إبطال لضمان ظهور الترويسات فورًا. وإلا فستفتقر الاستجابات المخزّنة مؤقتًا إلى الترويسات الجديدة حتى تنتهي مدة صلاحيتها (TTL).</p>
</blockquote>
<p>أصبح لديك توزيع CloudFront مهيّأ بالكامل: أصل S3 مع OAC، وسلوكات تخزين مؤقت وعمليات إبطال للنشر، وتوجيه SPA عبر استجابات أخطاء مخصّصة، وHTTPS مع شهادة ACM، وترويسات أمان. والخطوة التالية هي ربط نطاق مخصّص في قسم توجيه النطاق المخصّص في Route 53. وقبل ذلك، سيطلب منك تمرين هذا القسم بناء كل هذا من الصفر.</p>
`,l={book:s,chapter:"aws",chapterTitle:n,slug:a,title:t,headings:p,html:o};export{s as book,c as chapter,n as chapterTitle,l as default,p as headings,o as html,a as slug,t as title};
